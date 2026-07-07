---
title: "Arquitetura de Notificações e Lembretes"
---

# Arquitetura de Notificações e Lembretes

<div class="article-intro">

Toda mensagem que um membro da chiesa vê fora da página que está olhando — uma contagem de badge, uma notificação push, um email resumido — passa por uma das duas portas no MessagingApi. Esta página documenta o funil, o mecanismo de lembrete que o alimenta em um cronograma e o modelo de preferência que decide o que realmente alcança uma pessoa.

</div>

## Visão Geral — duas portas

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualquer coisa que diga a uma pessoa algo** passa por `NotificationHelper.createNotifications()` no módulo de mensagens. Persiste uma linha `notifications` e escala socket → push → email, avaliando `PreferenceGateHelper` por canal — incluindo `in_app` no nível 0.
2. **Qualquer coisa agendada** é uma `reminderDefinition` (no nível da entidade ou escopo) expandida em `reminderOccurrences` e despachada por `ReminderEngine.scan()` em um timer recorrente. Um expansor, um despachador, um livro de envio de lembrete (`reminderSentLog`).
3. **Email direto** existe apenas atrás de `TransactionalEmailHelper.sendTransactional()`. Uma regra ESLint aplica isto no tempo de compilação — veja abaixo.

:::tip A porta de email é lint-enforce, não apenas convenção
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: qualquer chamada a `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` fora de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` falha lint. Se você precisa enviar um email, roteie-o através do funil (`createNotifications` com `emailImmediate`) ou através de `TransactionalEmailHelper.sendTransactional()` — não há terceira maneira que passe CI.
:::

## O funil de notificação

`NotificationHelper.createNotifications()` é o único ponto de entrada para qualquer coisa que não seja agendada ou transacional:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Para cada destinatário salva uma linha em `notifications` e chama `attemptDeliveryWithEscalation`, que percorre a escada de canal abaixo. Uma linha ainda não lida para o mesmo `(contentType, contentId)` suprime re-criação — este guarda de dedup é pulado para envios de `emailImmediate` (compensações de lembrete, equipe "email all", etapas de fluxo de trabalho possuem seu próprio dedup) e para mensagens diretas, que sempre pingam o socket.

`shared/helpers/NotificationService.ts` espelha a mesma assinatura (`NotificationServiceOptions`) para chamadores fora do módulo de mensagens e é registrado com o módulo de mensagens na inicialização.

## Cadeia de Escalação de Canal

A entrega começa em um nível (0 por padrão, ou superior para lembretes/envios explícitos) e procede apenas para o próximo canal se o anterior não tiver sucesso. Cada nível é controlado por `PreferenceGateHelper` antes que qualquer coisa seja tentada.

| Nível | Canal | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | O portão `in_app` é verificado primeiro. Se suprimido (silenciado), a linha é persistida com `isNew=false` e a entrega para completamente — nenhum ping de socket, nenhum badge, nenhuma escalação adicional. Caso contrário, o servidor procura conexões de socket abertas para a sala `alerts` da pessoa e envia um frame `notification` (ou `privateMessage`). Para notificações comuns, uma entrega de socket bem-sucedida para a cadeia aqui — o timer de 30 minutos re-verifica itens não lidos e os escala depois. Mensagens diretas nunca param no socket: uma PWA instalada pode manter o socket de alertas aberto no fundo, o que caso contrário suprimiria o push no nível do SO. |
| 1 | **push** | Controlado em `allowPush` / categoria opt-out / horas silenciosas. Envia para tokens de push Expo e assinaturas Web Push encontradas nas linhas `devices` da pessoa, deduplicando por ponto de extremidade e podando tokens antigos ao longo do caminho. |
| 2 | **email** | Controlado em `emailFrequency` e categoria opt-out. Envios imediatos (`emailImmediate`) renderizam certo agora e escrevem uma linha `deliveryLogs`; caso contrário a notificação fica pendente para o resumo de lote, descrito abaixo. |
| — | **sms** | Encanamento de preferência (`allowSms`, listas de canal por categoria) já leva em conta um canal SMS, mas nenhum produtor envia através dele hoje — fica reservado para o produto SMS em massa, que funciona como um fluxo separado e isolado via `TextingController` / `@churchapps/texting`. |

Notificações não lidas deixadas no socket ou push são escaladas pelo timer de 30 minutos (`NotificationHelper.escalateDelivery`). Email em lote é enviado por `NotificationHelper.sendEmailNotifications(frequency)`, acionado pela preferência `emailFrequency` de cada pessoa: `individual` funciona no timer de 30 minutos, `daily` funciona no timer noturno. (`weekly` é um valor de preferência válido mas ainda não possui uma execução em lote dedicada.)

## Mecanismo de Lembrete

Lembretes agendados — lembretes de evento, datas de vencimento de tarefa, lembretes de atribuição de serviço/plano — todos passam por um mecanismo generalizado em vez de lógica cron bespoke por recurso.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definições** (`reminderDefinitions`) são ou no nível da entidade (`entityId` definido — um evento específico, tarefa ou plano) ou no nível do escopo (`entityId` null, `scopeId` definido — ex: cada plano sob um tipo de plano de serviço). Uma definição carrega um CSV de compensações de minuto (`offsets`, ex: `"1440,60"` para um dia e uma hora antes), uma hora de envio local (`sendLocalTime`), um CSV de canais (`channels` — incluindo `email` dispara um email rico imediato no tempo de envio), um `recipientMode` e uma mensagem `message` personalizada opcional.

**Expansão** materializa linhas de fogo para o horizonte adiante (uma janela móvel de vários dias). Funciona no timer noturno e sincronamente sempre que uma definição é salva para que um lembrete para um evento de último minuto ainda dispare. Definições de escopo se expandem via `loadScopeEntities` do adaptador, produzindo um conjunto de ocorrência por entidade concreta; ocorrências no nível de entidade usam a chave `definitionId:occurrenceISO:offset`, enquanto ocorrências com escopo se vinculam por id de entidade para que nunca colidam. Fazer upsert de uma ocorrência **ressuscita** uma linha previamente cancelada — cancelar-e-re-expandir é a forma padrão de re-sincronizar um lembrete após a mudança da entidade subjacente; linhas já `sent`, `failed` ou `processing` são deixadas intocadas.

**Despacho** (`ReminderEngine.scan()`) funciona no timer de 30 minutos. Ele reclama ocorrências vencidas (um arrendamento impede processamento duplo), carrega destinatários através do adaptador da entidade, filtra qualquer um já registrado em `reminderSentLog` para essa ocorrência e chama `createNotifications` com `deliveryStartLevel: 1` (pule direto para push) mais `emailImmediate`/`emailByPerson` quando os canais da definição incluem email.

Um barramento de evento interno reage a mutações de entidade sem esperar pela expansão noturna: eventos de conteúdo (via despachador de webhook) e eventos de atualização de plano/tarefa disparam re-expansão imediata ou cancelamento para a entidade afetada, e uma atualização de plano também re-expande qualquer definição de escopo vinculada ao seu tipo de plano.

### Adaptadores

O mecanismo é agnóstico de entidade; cada tipo de entidade suportado se conecta através de um adaptador (`helpers/adapters/`):

| Tipo de Entidade | Adaptador | Notas |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatários com escopo para registrantes ou membros do grupo dependendo do evento e `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Destinatários são atribuições de plano Aceitas + Não Confirmadas. `buildEmails` chama em `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posições, notas e uma mensagem personalizada via `doing/helpers/PlanReminderEmailHelper`, incluindo botões Aceitar/Recusar assinados por `ReminderTokenHelper` que postam para um ponto de extremidade público de resposta de atribuição. |
| `task` | `TaskReminderAdapter` | Destinatários são o(s) designado(s) da tarefa. |

### Pontos de Extremidade

| Método | Caminho | Propósito |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carregar ou salvar a definição de lembrete para uma entidade. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carregar ou salvar uma definição de lembrete no nível do escopo (herdada). |
| `DELETE` | `/messaging/reminders/:defId` | Excluir uma definição e cancelar suas ocorrências pendentes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Visualizar contagem de destinatário e próximos tempos de disparo para um lembrete de evento antes de salvar. |
| `GET` | `/messaging/reminders/log` | Histórico recente de ocorrência de lembrete para uma chiesa. |
| `POST` | `/messaging/reminders/mute` | Mute lembretes para uma entidade específica. |

Salvar uma definição dispara uma re-expansão sincronizada para essa entidade ou escopo, portanto os editores veem "próximos disparos" atualizados sem esperar pelo trabalho noturno.

## Mensagens Diretas

Mensagens diretas andam no mesmo funil que tudo o mais em vez de um caminho de escalação separado. Cada conversação não lida recebe uma **linha shadow** em `notifications` (`contentType='privateMessage'`, `contentId` = o id da mensagem privada, `category='direct_messages'`) que possui todo estado de entrega — escalação socket/push/email, rastreamento de leitura, tudo. A tabela `privateMessages` em si mantém a carga útil da mensagem e uma coluna `notifyPersonId`, que é a fonte do badge não lido e fica limpa quando o destinatário lê a conversa.

Linhas shadow são invisíveis para a sino de notificações: elas são excluídas da consulta de contagem não lida, da consulta de lista de notificação e da marca-lida/exclusão consultas, todas as quais filtram `contentType <> 'privateMessage'`. Cada ping DM atinge o socket independentemente do estado não lido (semântica de chat ao vivo — sem dedup) e DMs nunca param na entrega de socket da forma como notificações comuns fazem, já que uma PWA backgrounded pode manter um socket aberto enquanto ainda precisa de um push no nível do SO. Se uma pessoa silencia notificações de DM, a linha shadow é estacionada (`isNew=false`, `notifyPersonId` limpo) — ainda visível dentro da conversa em si, apenas sem badges ou alertas.

## Preferências e Gating

Cada envio passa por `PreferenceGateHelper.evaluate()`, uma função pura (todo estado passado, nenhuma chamada de DB no caminho quente) que retorna `allow`, `suppress` ou `defer`. As camadas executam em ordem e a primeira que decide vence:

1. **Categoria bloqueada** — algumas categorias são obrigatórias (nível 0) e contornam todas as outras camadas.
2. **Silenciar mestre / matar canal** — `masterMute`, `allowPush`, `allowSms` ou `emailFrequency='never'` suprimem completamente.
3. **Horas silenciosas** — apenas push e SMS (email é considerado não intrusivo). Se a hora atual da parede de relógio no fuso horário da pessoa se enquadrar em sua janela silenciosa, uma categoria transacional ainda passa; uma não transacional fica adiada até o final da janela silenciosa, computada como um instante UTC correto para DST via `TimezoneHelper.wallClockToUtc`.
4. **Substituição de preferência por categoria** — uma exclusão explícita para um par categoria × canal; ausência significa o padrão da categoria.
5. **Silenciamento por entidade** — um silenciamento registrado contra uma entidade específica (ex: um evento, um plano) restringe mais do que a configuração no nível da categoria, mas apenas se aplica quando o chamador fornece uma id/tipo de entidade ao lado da notificação.

Tabelas envolvidas: `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, janela de horas silenciosas + fuso horário, `allowSms`), `notificationPreferenceOverrides` (por categoria × canal) e `notificationEntityMutes` (por entidade).

Este portão é aplicado para in-app (nível 0), push (nível 1) e email (nível 2) dentro do funil — incluindo email de lembrete/resumo imediato. Email transacional (códigos de autenticação, resets de senha, convites, recibos de doação) ignora por design; é todo o ponto da segunda porta.

## Agendamento

Tanto o mecanismo de lembrete quanto o resumo de notificação funcionam em timers agendados existentes em vez de introduzir nova infraestrutura:

| Timer | Cronograma | Funciona |
|-------|----------|------|
| Timer de 30 minutos | a cada 30 minutos | Escalar notificações não lidas; enviar emails resumidos com frequência `individual`; despachar ocorrências de lembrete vencidas (`ReminderEngine.scan`); resumos de aprovação; execuções de automação vencidas |
| Timer Noturno | 05:00 UTC | Lembretes de presença em grupo; avançar serviços de streaming recorrentes; atualizar listas de auto-atualização; expandir ocorrências de lembrete para o próximo horizonte (`ReminderEngine.expandAll`); enviar emails resumidos com frequência `daily` |

Localmente, a mesma lógica pode ser acionada sob demanda com `npm run timer:30min` e `npm run timer:midnight` do projeto `Api`.

## Inventário de Arquivos

| Área | Arquivos |
|------|-------|
| Funil | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada Compartilhada | `Api/src/shared/helpers/NotificationService.ts` |
| Porta Transacional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regra lint `Api/tools/eslint-rules/email-door.cjs` |
| Mecanismo de Lembrete | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repositórios de Lembrete | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email de Serviço/Plano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de Lembrete (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor de Lembrete / Preferências (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas Relacionadas

- [Arquitetura em Tempo Real](../realtime) — o protocolo WebSocket e primitivos de cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) em que o nível de entrega no aplicativo funciona
- [Notificações de Push da Web](../web-push) — configuração de VAPID e o caminho API Push do navegador usado pelo nível de escalação de push
- [Pontos de Extremidade de Mensagens](../api/endpoints/messaging) — superfície REST completa para mensagens, conversas, conexões e rotas de notificação/lembrete
