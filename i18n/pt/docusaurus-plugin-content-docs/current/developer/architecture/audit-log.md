---
title: "Registro de Auditoria e Lotes Reversíveis"
---

# Registro de Auditoria e Lotes Reversíveis

<div class="article-intro">

Cada mutação iniciada pelo usuário no Api é registrada — quem, o quê, quando e de onde — em todos os módulos, sem nenhuma fiação por controlador. No topo desse livro fica uma camada de lotes: uma importação ou ação em massa pode ser marcada como um lote e depois **desfeita** linha por linha, estilo Planning Center. Ambas vivem em uma única tabela `auditLogs` no banco de dados de associação e são acionadas inteiramente de um ponto de estrangulamento, `BaseController.actionWrapper`. Esta página mapeia o que é auditado, onde os dados vivem, os trade-offs de desempenho que os formam, e como desfazer reverte um lote com segurança sem transações entre bancos.

</div>

## Visão Geral

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Dois fatos estruturais impulsionam tudo abaixo:

1. **A camada do controlador é o único lugar que conhece o ator.** Repositórios nunca veem `AuthenticatedUser`; apenas controladores mantêm `au`. Os controladores de cada módulo já passam através de `BaseController.actionWrapper`, então é aí que a auditoria se conecta — nenhuma assinatura de repositório muda em lugar nenhum.
2. **Uma tabela serve todos os módulos.** Linhas de auditoria para doação, presença, conteúdo, etc. são todas escritas no `auditLogs` do banco de dados de associação via `RepoManager.getRepos("membership")`, mesmo de um controlador não-associação. "Tudo que Jane mudou hoje" permanece uma única consulta.

## O que é auditado

A auditoria é **ativada por padrão para cada verbo mutante em cada rota**. `actionWrapper` deriva os campos de auditoria da solicitação com zero configuração por rota:

| Campo | Derivado de |
|-------|--------------|
| `module` | `this.moduleName` (o módulo possuidor) |
| `entityType` | último segmento singularizado de `req.baseUrl` (ex: `/membership/people` → `person`) |
| `category` | padrão para `entityType` |
| `action` | `${entityType}_saved` para `POST /`, `${entityType}_deleted` para `DELETE /:id`, else `${entityType}_${method}:${routePath}` para que sub-rotas não-CRUD (ex: `task_post:/:id/move`) sejam capturadas automaticamente |

`BaseController.AUDIT_REGISTRY` é **apenas para substituições e exclusões** — não é uma lista de permissões. Uma rota aparece lá para renomear sua categoria/entityType, para declarar `{ dbModule, table }` (o que a torna capaz de lote e desfazer), para marcá-la `sensitive` (mutuações de auditoria anônimas), ou para desativá-la com `optOut: true`.

**Lista de exclusão** (caminhos de escrita de mangueira de incêndio que afogariam o livro): presença `visits` / `visitsessions` / `sessions` / `checkin` (a tempestade de check-in de domingo) e mensagens `messages` / `connections` / `devices` (chat e presença). Tudo mais registra.

**Pontos de extremidade em massa** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) são registrados em `BULK_ROUTES` e emitem **uma linha de auditoria por id tocado**, então uma importação de 10k pessoas produz 10k linhas — essa granularidade por entidade é exatamente o que torna o lote reversível.

**Mutuações anônimas** (`actionWrapperAnon` — doações de convidados, registro de convidados, envios de formulário) são auditadas apenas para rotas sinalizadas como `sensitive` no registro, escritas com `userId="anonymous"` mais o IP do cliente. Doações lideram a lista; esse caminho tem um histórico real de regressão.

### Redação secreta e limites de tamanho

Antes de qualquer payload `details` ser armazenado, `AuditLogHelper.capDetails()` executa `sanitizeValue()` sobre ele:

- **Chaves secretas são redacted.** Qualquer campo cujo nome em minúsculas está em `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) é substituído por `"[redacted]"`.
- **Escalares enormes são removidos.** Qualquer `data:` URI ou string acima de 4 KB (fotos base64, blobs) se torna `"[stripped]"`.
- **Linhas muito grandes são limitadas.** Se o JSON serializado exceder ~64 KB, o payload inteiro é substituído por `{ truncated: true }`. Linhas truncadas ainda são visualizáveis — mas **não são reversíveis** (não há imagem de antes/depois para restaurar).

## Onde os dados vivem

Uma única tabela `auditLogs` no banco de dados **membership** respalda cada módulo. Colunas: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. A migração `tools/migrations/membership/2026-07-04_audit_universal.ts` adiciona `module` + `batchId`, amplia `details` de `TEXT` para `MEDIUMTEXT`, adiciona índices `ix_auditLogs_batch (batchId)` e `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, e cria a tabela `batches`. A coluna `module` existe precisamente para que colisões `entityType` entre módulos (`note`, `setting` existem em vários) permaneçam filtráveis, e o índice de entidade é o que capacita histórico por entidade e o guarda de conflitos de desfazer.

Escritas entre módulos vão através de `RepoManager.getRepos("membership")` dentro do wrapper. A ordenação é deliberada: **a escrita principal se confirma no banco de módulos primeiro, a inserção de auditoria em segundo.** Em modo normal uma falha de inserção de auditoria é silenciada (`console.error`, Sentry a detecta) — auditoria é consultivo e nunca deve falhar uma solicitação de usuário. Em **modo de lote é rigorosa** (veja abaixo).

:::info Por que não triggers, CDC ou tabelas por módulo?
- **MySQL triggers** não conhecem o usuário agindo (a conexão não tem `au`), e significariam manter conjuntos de trigger em cada schema.
- **binlog / CDC** é um projeto de infraestrutura inteiro com o mesmo problema de identidade do ator.
- **Threading `userId` através de cada repositório** tocaria centenas de arquivos para mover informações que a camada do controlador já tem.
- **Tabelas de auditoria por módulo** significariam 7× a fiação e consultas de fan-out para qualquer pergunta entre módulos. Uma tabela no ponto de estrangulamento do controlador é o design de menos código que ainda captura o ator.
:::

## Postura de Desempenho

O caminho quente é deliberadamente barato; o custo é pago apenas onde compra algo.

- **Nenhuma leitura-antes-escrita em atualizações normais.** Uma economia normal **não** carrega o registro antigo. Os **valores de pós-envio** são armazenados em `details.after`; a UI reconstrói velho→novo no tempo *view* diferenciando contra a linha de auditoria anterior da entidade. Uma consulta no tempo de view, custo zero no tempo de escrita. Campos nunca tocados desde o lançamento simplesmente mostram nenhum valor "antigo" — aceitável.
- **As exclusões ganham uma imagem anterior.** `DELETE /:id` em uma rota do registro com `{ dbModule, table }` carrega a linha genericamente primeiro e a armazena em `details.before`. Exclusões são raras e a imagem anterior é o valor forense inteiro.
- **O modo de lote é a única leitura-antes-escrita sistemática**, e é opt-in — uma operação em massa/importação já é cara, então N leituras de snapshot são o preço da desfazer.
- **Inserções de auditoria são aguardadas.** `actionWrapper` coleta as promessas de log e `await Promise.allSettled(...)` antes de retornar. Este é o invariante mais importante: no Lambda o contêiner **congela o instante em que a resposta retorna**, então uma inserção não aguardada é silenciosamente descartada. "Fire and forget" aqui significa *erros nunca falham a solicitação*, não *não aguarde* — uma única inserção no pool de associação já aquecido é ~1–3 ms.

## Lotes e desfazer

Um **lote** agrupa um conjunto de mutações para que possam ser revisadas e revertidas juntas. Existem duas maneiras de abrir um:

- **Explícito:** `POST /membership/batches { label, source }` retorna um `batchId`. O cliente (B1Transfer, uma UI de importação B1Admin) então envia `X-Batch-Id: <id>` em cada save/delete subsequente. `POST /membership/batches/:id/complete` o fecha e carimba `itemCount`.
- **Implícito:** os quatro pontos de extremidade em massa abrem, preenchem e completam seu próprio lote dentro da única solicitação, retornando o `batchId` na resposta.

A tabela `batches` (banco de dados de associação): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### O modo de lote é rigoroso

Quando `X-Batch-Id` está presente, `actionWrapper` aperta cada guarda (`writeBatchAuditRows`):

1. O lote deve existir, estar `open` e pertencer a `au.churchId` — caso contrário **403**.
2. A rota deve ser capaz de lote (`{ dbModule, table }` no registro) — caso contrário **400**.
3. Antes da ação ser executada, imagens anteriores para todos os ids afetados são carregadas em **uma** consulta `WHERE id IN (...) AND churchId = ?`. Se essa leitura de snapshot falhar, a solicitação **falha 500 e a ação não é executada** — o modo de lote nunca deve produzir um livro-não-reversível silenciosamente. (O modo normal, em contraste, é do melhor esforço e silencia falhas de snapshot.)
4. Após a ação ter sucesso, uma linha de auditoria por entidade é escrita com `batchId`, `details.before` e `details.after`, mais um **marcador de criação** explícito para linhas que o lote criou.

### Desfazer

`POST /membership/batches/:id/undo` (permissão: criador do lote ou `Permissions.server.admin`). Recusa se o lote não é `completed` ou é mais velho que a **janela de desfazer de 30 dias**. `BatchUndoHelper.undo()` então:

1. Carrega as linhas de auditoria do lote e **as agrupa por `(module, entityType, entityId)`.** Uma entidade tocada várias vezes dentro de um lote é revertida **uma vez**, de volta ao seu verdadeiro estado de pré-lote — a imagem anterior mais antiga, ou uma exclusão se o lote a criou. É por isso que desfazer não ingenuamente reproduz cada linha: restaurar um snapshot do meio-lote intermediário seria errado.
2. Para cada entidade, executa o **guarda de conflitos primeiro**: `auditLog.hasLaterModification()` pergunta se alguma entrada de auditoria *posterior* existe para o mesmo `(module, entityType, entityId)` fora deste lote. Se sim, a entidade foi editada após a importação — é **pulada e relatada**, nunca sobrescrita. Isto reutiliza o log de auditoria em si como o detector de modificação; nenhuma coluna `modifiedAt` é necessária em qualquer tabela.
3. Reverte por op registrado, resolvendo `{ dbModule, table }` do registro e usando escritas Kysely genéricas:
   - **created** → exclusão permanente da linha.
   - **updated** → escrever `details.before` de volta.
   - **deleted** → reinserir `details.before` (atualizar-ou-inserir se uma linha com esse id ressurgisse).
4. Cada reversão é em si auditada (`action: "<entityType>_undone"`, nenhum `batchId` — desfazer-de-desfazer está fora de escopo).

O op é escolhido do **marcador de criação** explícito, não inferido de uma imagem anterior ausente — uma imagem anterior legitimamente vazia ou uma linha truncada não deve ser confundida com uma criação.

O payload resultante é `{ restored, skippedConflicts: [...], failed: [...], status }`; o lote se move para `undone` (limpo) ou `partial`. **Não há transação entre bancos** — desfazer é do melhor esforço por linha, a mesma limitação que Planning Center documenta para perfis mesclados.

:::warning Entidades com efeito colateral precisam de um hook `onUndo`
Reverter uma criação `groupMember` também deve escrever `groupMemberHistory` ("left"), ou análise de churn silenciosamente quebra — um invariante de espaço de trabalho permanente. Tais entidades registram um callback `onUndo` em `AUDIT_REGISTRY` que retorna `true` quando completamente tratou a reversão, contornando o caminho genérico. `groupMembers` é o caso canônico (com chave por row id no caminho explícito mas por `personId` em pontos de extremidade em massa, e rastreado por histórico em cada adição/remoção).
:::

## Superfícies de Consumidor

Ambas as superfícies de admin estão **em progresso**; a intenção:

| Superfície | Repo | Propósito |
|---------|------|---------|
| **Página de Registro de Auditoria** | B1Admin (ManageChurch → Audit Log) | Filtrar por módulo/categoria/usuário/entidade e renderizar diffs antigo→novo — para edições diferenciando contra a entrada anterior da entidade, para exclusões de `details.before`. Apoiado por `GET /membership/auditlogs`, controlado por `Permissions.server.admin`. |
| **Página de Lotes** | B1Admin (mesmo hub Settings) | Listar lotes com status e contagens, **View Results** (linhas de auditoria do lote via `GET /membership/batches/:id/results`), e um botão **Undo** que superfícies o relatório de conflito-pulado / falhou. |
| **Lotes de importação** | B1Transfer | Abrir um lote, enviar `X-Batch-Id` em suas chamadas de economia normal, completar no final — importações se tornam reversíveis com nenhum novo ponto de extremidade de importação. A `importKey` herdada permanece como um marcador de linhagem apenas-cria, superseded para desfazer. |

## Gotchas uma futura mudança não deve regredir

- **Inserções de auditoria devem permanecer aguardadas.** Un-awaited `AuditLogHelper.log(...)` é descartado pelo congelamento Lambda. Coleta promessas e `await Promise.allSettled` antes de retornar.
- **Kysely elimina `undefined` de `.set()`/`.values()`.** Na restauração, uma coluna apagada sobreviveria intocada. `BatchUndoHelper` converte cada campo ausente para `null` explícito (`nullify`) — nunca ignore por uma escrita "mais rápida" direta.
- **A retenção deve permanecer bem acima da janela de desfazer.** `AuditLogRepo.deleteOld()` executa no temporizador noturno (retenção de 365 dias padrão); a janela de desfazer é de 30 dias. Se a retenção ever cair perto da janela, ledgers de desfazer ficam purgados de debaixo de lotes abertos.
- **Linhas truncadas não são reversíveis.** Um payload `{ truncated: true }` não tem imagem antes/depois; desfazer a relata como `failed`, nunca adivinha.
- **Ordenação é módulo-escrita-então-auditoria.** Nunca mova a inserção de auditoria à frente da escrita real, e mantenha-a rigorosa-em-lote / consultiva-em-normal.

## Inventário de Arquivos

| Área | Arquivos |
|------|-------|
| Wrapper / registro | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Motor de desfazer | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Auxiliar de auditoria | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controladores | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modelos / repositórios | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migração | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| UI de Admin (em progresso) | Páginas B1Admin Audit Log + Batches; cabeçalho de lote de importação B1Transfer |

## Páginas Relacionadas

- [Estrutura de Módulo](../api/module-structure) — como um controlador não-associação alcança os repositórios de associação através de `RepoManager`
- [Doações](./giving) — os caminhos de escrita de doação que são auditados como `sensitive` mesmo quando anônimos
- [Pontos de Extremidade de Associação](../api/endpoints/membership) — a superfície REST que carrega `X-Batch-Id` e expõe `/auditlogs` e `/batches`
