---
title: "Log de Auditoria e Lotes Reversíveis"
description: "Descreve o log de auditoria da API, que registra alterações de usuários em todos os módulos, e como desfazer importações linha a linha no B1 Admin."
---

# Log de Auditoria e Lotes Reversíveis

<div class="article-intro">

Toda mutação iniciada por usuário na Api é registrada — quem, o quê, quando e de onde — em todos os módulos, sem nenhuma configuração específica em cada controller. Sobre esse registro existe uma camada de lotes: uma importação ou ação em massa pode ser marcada como lote e depois **desfeita** linha a linha, no estilo do Planning Center. Ambos ficam em uma única tabela `auditLogs` no banco de dados de membros e são controlados inteiramente por um único ponto de entrada, `BaseController.actionWrapper`. Esta página mostra o que é auditado, onde os dados ficam, os compromissos de desempenho que moldam a solução e como a reversão de um lote acontece com segurança, sem transações entre bancos de dados.

</div>

## Visão geral

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

Dois fatos estruturais sustentam tudo o que vem a seguir:

1. **A camada de controllers é o único lugar que conhece o autor da ação.** Os repositórios nunca recebem `AuthenticatedUser`; somente os controllers têm `au`. Todos os controllers de cada módulo já passam por `BaseController.actionWrapper`, por isso é ali que a auditoria é acoplada — nenhuma assinatura de repositório precisa mudar.
2. **Uma única tabela atende todos os módulos.** Os registros de auditoria de doações, presenças, conteúdo etc. são gravados na tabela `auditLogs` do banco de membros por meio de `RepoManager.getRepos("membership")`, mesmo quando partem de um controller que não é de membros. Assim, "tudo o que a Jane alterou hoje" continua sendo uma única consulta.

## O que é auditado

A auditoria fica **ativada por padrão para todos os verbos de escrita em todas as rotas**. O `actionWrapper` deriva os campos de auditoria da requisição, sem nenhuma configuração por rota:

| Campo | Derivado de |
|-------|-------------|
| `module` | `this.moduleName` (o módulo proprietário) |
| `entityType` | último segmento de `req.baseUrl` no singular (ex.: `/membership/people` → `person`) |
| `category` | assume o valor de `entityType` por padrão |
| `action` | `${entityType}_saved` para `POST /`, `${entityType}_deleted` para `DELETE /:id`, caso contrário `${entityType}_${method}:${routePath}`, de modo que sub-rotas que não são CRUD (ex.: `task_post:/:id/move`) sejam capturadas automaticamente |

`BaseController.AUDIT_REGISTRY` serve **apenas para substituições e exclusões** — não é uma lista de permissões. Uma rota aparece ali para renomear sua categoria ou entityType, para declarar `{ dbModule, table }` (o que a torna capaz de operar em lote e de ser desfeita), para marcá-la como `sensitive` (auditar mutações anônimas) ou para desativá-la com `optOut: true`.

**Lista de exclusões** (caminhos de escrita de alto volume que sobrecarregariam o registro): `visits` / `visitsessions` / `sessions` / `checkin` de attendance (a enxurrada de check-ins do domingo) e `messages` / `connections` / `devices` de messaging (chat e presença). Todo o restante é registrado.

**Endpoints em massa** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) estão registrados em `BULK_ROUTES` e geram **um registro de auditoria por ID afetado**; assim, uma importação de 10 mil pessoas produz 10 mil registros. Essa granularidade por entidade é exatamente o que torna o lote reversível.

**Mutações anônimas** (`actionWrapperAnon` — doações de visitantes, cadastros de visitantes, envios de formulários) são auditadas apenas nas rotas marcadas como `sensitive` no registro. Elas são gravadas com `userId="anonymous"` e o IP do cliente. As doações lideram essa lista, e esse caminho já teve regressões reais.

### Redação de segredos e limites de tamanho

Antes de qualquer payload de `details` ser armazenado, `AuditLogHelper.capDetails()` executa `sanitizeValue()` sobre ele:

- **Chaves secretas são redigidas.** Qualquer campo cujo nome em minúsculas esteja em `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) é substituído por `"[redacted]"`.
- **Valores escalares grandes são removidos.** Qualquer URI `data:` ou string com mais de 4 KB (fotos em base64, blobs) vira `"[stripped]"`.
- **Linhas excessivas são limitadas.** Se o JSON serializado ultrapassar cerca de 64 KB, todo o payload é substituído por `{ truncated: true }`. Linhas truncadas continuam visíveis, mas **não podem ser desfeitas** (não há imagem anterior/posterior para restaurar).

## Onde os dados ficam

Uma única tabela `auditLogs` no banco de dados de **membros** atende a todos os módulos. Colunas: `id, churchId, userId, category, action, entityType, entityId, details (JSON em MEDIUMTEXT), ipAddress, module, batchId, created`. A migração `tools/migrations/membership/2026-07-04_audit_universal.ts` adiciona `module` e `batchId`, troca o tipo de `details` de `TEXT` para `MEDIUMTEXT`, cria os índices `ix_auditLogs_batch (batchId)` e `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` e cria a tabela `batches`. A coluna `module` existe justamente para que colisões de `entityType` entre módulos (`note` e `setting` existem em vários) continuem filtráveis, e o índice por entidade é o que sustenta tanto o histórico por entidade quanto a verificação de conflitos na reversão.

As gravações entre módulos passam por `RepoManager.getRepos("membership")` de dentro do wrapper. A ordem é intencional: **a gravação principal é confirmada primeiro no banco do módulo; a inserção de auditoria vem depois.** No modo normal, uma falha na inserção de auditoria é engolida (`console.error`, e o Sentry a captura), pois a auditoria é consultiva e nunca pode fazer falhar a requisição de um usuário. No **modo de lote** ela é estrita (veja abaixo).

:::info Por que não triggers, CDC ou tabelas de auditoria por módulo?
- **Triggers do MySQL** não conhecem o usuário que executa a ação (a conexão não tem `au`) e exigiriam manter conjuntos de triggers em todos os schemas.
- **binlog / CDC** é um projeto de infraestrutura completo com o mesmo problema de identificação do autor.
- **Propagar `userId` por todos os repositórios** exigiria alterar centenas de arquivos para transmitir uma informação que a camada de controllers já possui.
- **Tabelas de auditoria por módulo** significariam 7 vezes mais encanamento e consultas distribuídas para qualquer pergunta entre módulos. Uma única tabela no ponto de entrada dos controllers é o design com menos código que ainda captura o autor.
:::

## Compromissos de desempenho

O caminho crítico é deliberadamente barato; o custo só é pago onde traz algum benefício.

- **Nenhuma leitura antes da escrita em atualizações comuns.** Um salvamento normal **não** carrega o registro antigo. Os **valores posteriores enviados** são armazenados em `details.after`; a interface reconstrói o valor antigo → novo no momento da *visualização*, comparando com o registro de auditoria anterior da entidade. Uma consulta na visualização, custo zero na escrita. Campos que nunca foram alterados desde o lançamento simplesmente não mostram um valor "antigo" — aceitável.
- **Exclusões guardam uma imagem anterior.** `DELETE /:id` em uma rota do registro com `{ dbModule, table }` carrega primeiro a linha de forma genérica e a armazena em `details.before`. Exclusões são raras e a imagem anterior é todo o valor forense.
- **O modo de lote é a única leitura sistemática antes da escrita**, e é opt-in — uma operação em massa ou de importação já é cara, então N leituras de snapshot são o preço da reversibilidade.
- **As inserções de auditoria são aguardadas.** O `actionWrapper` coleta as promessas de log e executa `await Promise.allSettled(...)` antes de retornar. Esta é a invariante mais importante: no Lambda, o contêiner **é congelado no instante em que a resposta é devolvida**, então uma inserção não aguardada é descartada silenciosamente. "Disparar e esquecer" aqui significa *erros nunca fazem a requisição falhar*, não *não aguardar* — uma única inserção no pool de membros já aquecido leva cerca de 1–3 ms.

## Lotes e desfazer

Um **lote** agrupa um conjunto de mutações para que possam ser revisadas e revertidas em conjunto. Há duas formas de abrir um lote:

- **Explícita:** `POST /membership/batches { label, source }` retorna um `batchId`. O cliente (B1Transfer, uma interface de importação do B1Admin) então envia `X-Batch-Id: <id>` em todos os salvamentos e exclusões seguintes. `POST /membership/batches/:id/complete` fecha o lote e grava `itemCount`.
- **Implícita:** os quatro endpoints em massa abrem, preenchem e concluem o próprio lote dentro de uma única requisição, retornando o `batchId` na resposta.

A tabela `batches` (banco de membros): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### O modo de lote é estrito

Quando `X-Batch-Id` está presente, o `actionWrapper` reforça todas as validações (`writeBatchAuditRows`):

1. O lote deve existir, estar `open` e pertencer a `au.churchId` — caso contrário, **403**.
2. A rota deve ser capaz de operar em lote (`{ dbModule, table }` no registro) — caso contrário, **400**.
3. Antes de a ação ser executada, as imagens anteriores de todos os IDs afetados são carregadas em uma **única** consulta `WHERE id IN (...) AND churchId = ?`. Se essa leitura de snapshot falhar, a requisição **falha com 500 e a ação não é executada** — o modo de lote nunca pode produzir silenciosamente um registro que não pode ser desfeito. (Já o modo normal é de melhor esforço e ignora falhas de snapshot.)
4. Após a ação ser concluída com sucesso, um registro de auditoria por entidade é gravado com `batchId`, `details.before` e `details.after`, além de um **marcador de criação** explícito para as linhas criadas pelo lote.

### Desfazer

`POST /membership/batches/:id/undo` (permissão: quem criou o lote ou `Permissions.server.admin`). A operação é recusada se o lote não estiver `completed` ou se for mais antigo que a **janela de desfazer de 30 dias**. Em seguida, `BatchUndoHelper.undo()`:

1. Carrega os registros de auditoria do lote e os **agrupa por `(module, entityType, entityId)`**. Uma entidade modificada várias vezes dentro de um mesmo lote é revertida **uma única vez**, ao seu verdadeiro estado anterior ao lote — a imagem anterior mais antiga, ou uma exclusão caso o lote a tenha criado. É por isso que a reversão não reexecuta cada linha ingenuamente: restaurar um snapshot intermediário no meio do lote estaria errado.
2. Para cada entidade, executa primeiro a **verificação de conflitos**: `auditLog.hasLaterModification()` pergunta se existe algum registro de auditoria *posterior* para essa mesma `(module, entityType, entityId)` fora deste lote. Se existir, a entidade foi editada depois da importação — ela é **ignorada e relatada**, nunca sobrescrita. Isso reaproveita o próprio log de auditoria como detector de modificações; não são necessárias colunas `modifiedAt` em nenhuma tabela.
3. Reverte conforme a operação registrada, resolvendo `{ dbModule, table }` a partir do registro e usando escritas genéricas com Kysely:
   - **criado** → exclui permanentemente a linha.
   - **atualizado** → regrava `details.before`.
   - **excluído** → reinsere `details.before` (atualiza ou insere, caso uma linha com aquele ID tenha reaparecido).
4. Cada reversão também é auditada (`action: "<entityType>_undone"`, sem `batchId` — desfazer um desfazer está fora do escopo).

A operação é escolhida pelo **marcador de criação** explícito, e não inferida pela ausência de imagem anterior — uma imagem anterior legitimamente vazia ou uma linha truncada não pode ser confundida com uma criação.

O payload de resultado é `{ restored, skippedConflicts: [...], failed: [...], status }`; o lote passa para `undone` (sem problemas) ou `partial`. **Não existe transação entre bancos** — a reversão é de melhor esforço, linha a linha, a mesma limitação que o Planning Center documenta para perfis mesclados.

:::warning Entidades com efeitos colaterais precisam de um hook `onUndo`
Reverter a criação de um `groupMember` também precisa gravar `groupMemberHistory` ("left"); caso contrário, as análises de rotatividade quebram silenciosamente — uma invariante permanente do workspace. Essas entidades registram um callback `onUndo` em `AUDIT_REGISTRY` que retorna `true` quando tratou totalmente a reversão, contornando o caminho genérico. `groupMembers` é o caso canônico (identificado pelo ID da linha no caminho explícito, mas por `personId` nos endpoints em massa, e com histórico rastreado em toda adição e remoção).
:::

## Superfícies de consumo

As duas interfaces administrativas estão **em andamento**; a intenção é:

| Superfície | Repositório | Finalidade |
|------------|-------------|------------|
| **Página de Log de Auditoria** | B1Admin (ManageChurch → Audit Log) | Filtrar por módulo, categoria, usuário ou entidade e exibir diferenças antigo → novo — para edições, comparando com o registro anterior da entidade; para exclusões, a partir de `details.before`. Alimentada por `GET /membership/auditlogs`, restrita a `Permissions.server.admin`. |
| **Página de Lotes** | B1Admin (mesmo hub de Configurações) | Listar lotes com status e contagens, **Ver resultados** (os registros de auditoria do lote via `GET /membership/batches/:id/results`) e um botão **Desfazer** que exibe o relatório de conflitos ignorados e falhas. |
| **Lotes de importação** | B1Transfer | Abrir um lote, enviar `X-Batch-Id` nas chamadas normais de salvamento e concluí-lo ao final — as importações passam a ser reversíveis sem novos endpoints de importação. O `importKey` legado permanece como marcador de linhagem apenas para criações, substituído para fins de reversão. |

## Armadilhas que uma mudança futura não deve regredir

- **As inserções de auditoria devem continuar aguardadas.** Um `AuditLogHelper.log(...)` não aguardado é descartado pelo congelamento do Lambda. Colete as promessas e execute `await Promise.allSettled` antes de retornar.
- **O Kysely descarta `undefined` em `.set()`/`.values()`.** Na restauração, uma coluna limpa sobreviveria intacta. O `BatchUndoHelper` converte todo campo ausente em `null` explícito (`nullify`) — nunca contorne isso em uma escrita direta "mais rápida".
- **A retenção deve permanecer bem acima da janela de desfazer.** `AuditLogRepo.deleteOld()` roda no timer noturno (retenção padrão de 365 dias); a janela de desfazer é de 30 dias. Se a retenção algum dia se aproximar dessa janela, os registros para desfazer podem ser apagados enquanto lotes ainda estão abertos.
- **Linhas truncadas não podem ser desfeitas.** Um payload `{ truncated: true }` não tem imagem anterior/posterior; a reversão o informa como `failed` e nunca tenta adivinhar.
- **A ordem é escrita no módulo e depois auditoria.** Nunca mova a inserção de auditoria para antes da escrita real, e mantenha o modo estrito em lotes e consultivo no modo normal.

## Inventário de arquivos

| Área | Arquivos |
|------|----------|
| Wrapper / registro | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + escrita das linhas de auditoria) |
| Motor de reversão | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Helper de auditoria | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllers | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modelos / repositórios | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migração | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Interface administrativa (em andamento) | Páginas Audit Log e Batches do B1Admin; cabeçalho de lote de importação do B1Transfer |

## Páginas relacionadas

- [Estrutura de módulos](../api/module-structure.md) — como um controller que não é de membros acessa os repositórios de membros por meio do `RepoManager`
- [Doações](./giving.md) — os caminhos de escrita de doações que são auditados como `sensitive` mesmo quando anônimos
- [Endpoints de membros](../api/endpoints/membership.md) — a superfície REST que carrega `X-Batch-Id` e expõe `/auditlogs` e `/batches`
