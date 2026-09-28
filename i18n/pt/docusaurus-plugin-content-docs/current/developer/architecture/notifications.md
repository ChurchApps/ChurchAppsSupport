---
title: "Arquitetura de Notificações e Lembretes"
---

# Arquitetura de Notificações e Lembretes

<div class="article-intro">

Toda mensagem que um membro da igreja vê fora da página que está olhando — uma contagem de badge, uma notificação push, um email digest — passa por uma de duas portas em MessagingApi. Esta página documenta o funil, o mecanismo de lembrete que o alimenta em um cronograma, e o modelo de preferência que decide o que realmente chega a uma pessoa.

</div>

## Visão Geral — duas portas

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualquer coisa que diz algo a uma pessoa** passa por `NotificationHelper.createNotifications()` no módulo de mensagens. Ela persiste uma linha `notifications` e escala socket → push → email, avaliando `PreferenceGateHelper` por canal — incluindo `in_app` no nível 0.
2. **Qualquer coisa agendada** é um `reminderDefinition` (nível de entidade ou escopo) expandido em `reminderOccurrences` e despachado por `ReminderEngine.scan()` em um timer recorrente. Um expansor, um despachador, um ledger de envio (`reminderSentLog`).
3. **Email direto** existe apenas atrás de `TransactionalEmailHelper.sendTransactional()`. Uma regra ESLint reforça isso em tempo de compilação — veja abaixo.

:::tip A porta de email é reforçada por lint, não apenas convenção
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: qualquer chamada para `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` fora de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` falha lint. Se você precisar enviar um email, roteia-o através do funil (`createNotifications` com `emailImmediate`) ou através de `TransactionalEmailHelper.sendTransactional()` — não há terceira forma que passa CI.
:::

## O funil de notificações

`NotificationHelper.createNotifications()` é o ponto de entrada único para qualquer coisa que não seja agendada ou transacional:

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

Para cada destinatário, ele salva uma linha em `notifications` e chama `attemptDeliveryWithEscalation`, que caminha pela escada de canal abaixo. Uma linha não lida ainda para o mesmo `(contentType, contentId)` suprime a recriação — esse protetor de dedup é pulado para envios `emailImmediate` (offsets de lembrete, "enviar a todos" do pessoal, etapas de fluxo de trabalho próprio seu dedup) e para mensagens diretas, que sempre tocam o socket.

`shared/helpers/NotificationService.ts` espelha a mesma assinatura (`NotificationServiceOptions`) para chamadores fora do módulo de mensagens e é registrado com o módulo de mensagens na inicialização.

## Cadeia de escalação de canal

A entrega começa em um nível (0 por padrão, ou superior para lembretes/envios explícitos) e só prossegue para o próximo canal se o anterior não tiver sucesso. Cada nível é controlado por `PreferenceGateHelper` antes de qualquer coisa ser tentada.

| Nível | Canal | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | O portão `in_app` é verificado primeiro. Se suprimido (silenciado), a linha é persistida com `isNew=false` e a entrega para completamente — nenhum ping de socket, nenhum badge, nenhuma escalação adicional. Caso contrário, o servidor procura conexões de socket abertas para a sala `alerts` da pessoa e empurra um frame `notification` (ou `privateMessage`). Para notificações ordinárias, uma entrega de socket bem-sucedida para a cadeia aqui — o timer de 30 minutos verifica novamente itens não lidos e os escala mais tarde. Mensagens diretas nunca param no socket: um PWA instalado pode manter o socket de alertas aberto em segundo plano, o que de outra forma suprimiria o push de nível SO. |
| 1 | **push** | Controlado em `allowPush` / categoria opt-out / horas tranquilas. Envia para tokens Expo push e subscrições Web Push encontradas nas linhas `devices` da pessoa, deduplicando por endpoint e podando tokens obsoletos no caminho. |
| 2 | **email** | Controlado em `emailFrequency` e categoria opt-out. Os envios imediatos (`emailImmediate`) são renderizados imediatamente e escrevem uma linha `deliveryLogs`; caso contrário, a notificação é deixada pendente para o digest de lote, descrito abaixo. |
| — | **sms** | O encanamento de preferência (`allowSms`, listas de canal por categoria) já conta com um canal SMS, mas nenhum produtor envia através dele hoje — permanece reservado para o produto SMS de volume, que roda como um fluxo separado e isolado via `TextingController` / `@churchapps/texting`. |

Notificações não lidas deixadas no socket ou push são escaladas pelo timer de 30 minutos (`NotificationHelper.escalateDelivery`). O email de lote é enviado por `NotificationHelper.sendEmailNotifications(frequency)`, orientado pela preferência `emailFrequency` de cada pessoa: `individual` roda no timer de 30 minutos, `daily` roda no timer da meia-noite. (`weekly` é um valor de preferência válido, mas não tem execução de lote dedicada ainda.)

## Mecanismo de Lembrete

Lembretes agendados — lembretes de evento, datas de vencimento de tarefa, lembretes de atribuição de serviço/plano — todos passam por um mecanismo generalizado em vez de lógica de cron per-feature bespoke.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definições** (`reminderDefinitions`) são ou nível de entidade (`entityId` definido — um evento, tarefa ou plano específico) ou nível de escopo (`entityId` nulo, `scopeId` definido — por exemplo, cada plano sob um tipo de plano de serviço). Uma definição carrega um CSV de offsets de minuto (`offsets`, por exemplo `"1440,60"` para um dia e uma hora antes), um horário de envio local (`sendLocalTime`), um CSV de canais (`channels` — incluindo `email` desencadeia um rich email imediato no horário de envio), um `recipientMode` e uma `message` customizada opcional.

**Expansão** materializa linhas de fogo para o horizonte à frente (uma janela de vários dias em movimento). Ele roda no timer da meia-noite e sincronamente sempre que uma definição é salva, então um lembrete para um evento de última hora ainda dispara. Definições de escopo se ramificam via `loadScopeEntities` do adaptador, produzindo um conjunto de ocorrência por entidade concreta; ocorrências de nível de entidade usam a chave `definitionId:occurrenceISO:offset`, enquanto ocorrências com escopo usam namespace por id de entidade, então nunca colidem. Fazer upsert de uma ocorrência **ressuscita** uma linha previamente cancelada — cancelar-então-re-expandir é a forma padrão de re-sincronizar um lembrete após a entidade subjacente mudar; linhas já `sent`, `failed` ou `processing` são deixadas intocadas.

**Despacho** (`ReminderEngine.scan()`) roda no timer de 30 minutos. Ele reclama ocorrências vencidas (um arrendamento previne processamento duplo), carrega destinatários através do adaptador da entidade, filtra qualquer um já registrado em `reminderSentLog` para essa ocorrência e chama `createNotifications` com `deliveryStartLevel: 1` (pule direto para push) mais `emailImmediate`/`emailByPerson` quando os canais da definição incluem email.

Um barramento de evento interno reage às mutações de entidade sem esperar pela expansão da meia-noite: eventos de conteúdo (via o despachador de webhook) e eventos de atualização de plano/tarefa desencadeiam re-expansão imediata ou cancelamento para a entidade afetada, e uma atualização de plano também re-expande qualquer definição de escopo vinculada ao seu tipo de plano.

### Adaptadores

O mecanismo é agnóstico de entidade; cada tipo de entidade suportada se conecta através de um adaptador (`helpers/adapters/`):

| Tipo de entidade | Adaptador | Notas |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatários scoped para inscritos ou membros do grupo dependendo do evento e `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Destinatários são atribuições de plano Aceitas + Não Confirmadas. `buildEmails` chama `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posições, notas e uma mensagem customizada via `doing/helpers/PlanReminderEmailHelper`, incluindo botões Aceitar/Recusar assinados por `ReminderTokenHelper` que enviam para um ponto de extremidade de resposta de atribuição público. |
| `task` | `TaskReminderAdapter` | Destinatários são o(s) responsável(is) da tarefa. |

### Pontos de extremidade

| Método | Caminho | Propósito |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carregar ou salvar a definição de lembrete para uma entidade. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carregar ou salvar uma definição de lembrete de nível de escopo (herdada). |
| `DELETE` | `/messaging/reminders/:defId` | Excluir uma definição e cancelar suas ocorrências pendentes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Visualizar contagem de destinatário e próximas vezes de acionamento para um lembrete de evento antes de salvar. |
| `GET` | `/messaging/reminders/log` | Histórico recente de ocorrência de lembrete para uma igreja. |
| `POST` | `/messaging/reminders/mute` | Silenciar lembretes para uma entidade específica. |

Salvar uma definição desencadeia uma re-expansão síncrona para essa entidade ou escopo, para que editores vejam "próximos acionamentos" atualizados sem esperar pela tarefa da meia-noite.

## Mensagens Diretas

Mensagens diretas andam pelo mesmo funil que tudo mais em vez de um caminho de escalação separado. Cada conversa não lida recebe uma **linha de sombra** em `notifications` (`contentType='privateMessage'`, `contentId` = o id de mensagem privada, `category='direct_messages'`) que possui todo estado de entrega — escalação socket/push/email, rastreamento de leitura, tudo. A própria tabela `privateMessages` mantém a carga de mensagem e uma coluna `notifyPersonId`, que é a fonte do badge não lido e fica clara quando o destinatário lê a conversa.

Linhas de sombra são invisíveis para o sino de notificações: são excluídas da consulta de contagem não lida, da consulta de lista de notificação e das consultas de marcar-como-lido/excluir, todas as quais filtram `contentType <> 'privateMessage'`. Cada ping de DM atinge o socket independentemente do estado não lido (semântica de bate-papo ao vivo — sem dedup), e DMs nunca param na entrega de socket como notificações ordinárias fazem, pois um PWA backgrounded pode manter um socket aberto enquanto ainda precisa de um push de nível SO. Se uma pessoa silencia notificações de DM, a linha de sombra é estacionada (`isNew=false`, `notifyPersonId` clara) — ainda visível dentro da conversa em si, apenas sem badges ou alertas.

## Preferências e controle

Cada envio passa por `PreferenceGateHelper.evaluate()`, uma função pura (todo estado passou, nenhuma chamada DB no caminho quente) que retorna `allow`, `suppress` ou `defer`. As camadas rodam em ordem, e a primeira que decide ganha:

1. **Categoria bloqueada** — algumas categorias são obrigatórias (tier 0) e contornam todas as outras camadas.
2. **Mute master / channel kill** — `masterMute`, `allowPush`, `allowSms` ou `emailFrequency='never'` suprimem abertamente.
3. **Horas tranquilas** — push e SMS apenas (email é considerado não intrusivo). Se o horário do relógio de parede atual no fuso horário da pessoa cai em sua janela tranquila, uma categoria transacional ainda passa; uma não-transacional é adiada para o final da janela tranquila, calculada como um instante UTC correto para DST via `TimezoneHelper.wallClockToUtc`.
4. **Override de preferência por categoria** — um opt-out explícito para um par categoria × canal; a ausência significa o padrão da categoria.
5. **Mute por entidade** — um mute registrado contra uma entidade específica (por exemplo, um evento, um plano) restringe além da configuração de nível de categoria, mas só se aplica quando o chamador fornece um id/tipo de entidade junto com a notificação.

Tabelas envolvidas: `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, janela de horas tranquilas + fuso horário, `allowSms`), `notificationPreferenceOverrides` (por categoria × canal) e `notificationEntityMutes` (por entidade).

Este portão é reforçado para in-app (nível 0), push (nível 1) e email (nível 2) dentro do funil — incluindo lembretes imediatos/emails de digest. Email transacional (códigos de auth, redefinições de senha, convites, recibos de doação) o contorna por design; esse é o ponto inteiro da segunda porta.

## Limites de email criados por igreja

Email cuja conteúdo uma igreja escreveu sai da identidade SES compartilhada ChurchApps, portanto é medido por igreja por `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quatro caminhos o chamam: envios de grupo/template (`EmailTemplateController`, tipo de conteúdo `email`), emails de acompanhamento de formulário (`FormSubmissionController`, `formFollowUp`), ações de fluxo de trabalho **Enviar email** (`NotificationHelper` com `churchAuthored`, `workflowEmail`) e convites de conta B1 (`UserController.sendInviteEmail`, `invite`). Email do sistema (códigos de auth, recibos, lembretes) não é medido.

- **Portão de aprovação.** Uma igreja não envia nada até que um admin do servidor defina `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Admin do Servidor → Igrejas → chip **Grupo Email**). Igrejas arquivadas são sempre bloqueadas. O diálogo Enviar Email de B1Admin lê `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, quando não aprovado, mostra um cartão **Solicitar revisão** em vez do editor. `POST /messaging/emailTemplates/requestApproval` envia email de suporte, no máximo uma vez por igreja por semana.
- **Permissão ganha.** Uma igreja aprovada recebe `max(150, 2 × seu melhor dia criado por igreja nos últimos 30 dias)`, limitado a 2.000 por período de 24 horas. As 24 horas atuais são excluídas de "melhor dia" para que um pico não possa aumentar seu próprio limite.
- **Reserva, depois liquidar.** `reserve()` escreve uma linha `deliveryLogs` por destinatário antes de enviar, verifica novamente a permissão com essas linhas contadas e recua se duas solicitações correram além do limite (o envio retorna 429). `settle()` marca cada linha enviada ou falhada.
- **Pausa de reclamação.** O Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentado por SES → SNS) alfineta cada devolução permanente ou reclamação à igreja cujo email criado por igreja atingiu esse endereço ao redor dessa hora, armazenado como `deliveryMethod` `sesBounce` / `sesComplaint`. Uma igreja é pausada em 2+ reclamações (≥ 0,3% de envios) ou 10+ devoluções permanentes (≥ 5%) nos últimos 7 dias.

## Agendamento

Tanto o mecanismo de lembrete quanto o digest de notificação andam em timers agendados existentes em vez de introduzir nova infraestrutura:

| Timer | Cronograma | Roda |
|-------|----------|------|
| Timer de 30 minutos | a cada 30 minutos | Escalar notificações não lidas; enviar emails digest com frequência `individual`; despachar ocorrências de lembrete vencidas (`ReminderEngine.scan`); digests de aprovação; execuções de automação devidas |
| Timer noturno | 05:00 UTC | Lembretes de participação em grupo; avançar serviços de streaming recorrente; atualizar listas de atualização automática; expandir ocorrências de lembrete para o próximo horizonte (`ReminderEngine.expandAll`); enviar emails digest com frequência `daily` |

Localmente, a mesma lógica pode ser acionada sob demanda com `npm run timer:30min` e `npm run timer:midnight` do projeto `Api`.

## Inventário de arquivo

| Área | Arquivos |
|------|-------|
| Funil | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartilhada | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transacional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regra lint `Api/tools/eslint-rules/email-door.cjs` |
| Limites de email de igreja | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Mecanismo de lembrete | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repositórios de lembrete | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email de serviço/plano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de lembrete (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor de lembrete / preferências (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas Relacionadas

- [Arquitetura em Tempo Real](../realtime) — o protocolo WebSocket e primitivos de cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) que o nível de entrega in-app anda
- [Notificações de Push Web](../web-push) — configuração VAPID e o caminho de API Push de navegador usado pelo nível de escalação de push
- [Pontos de extremidade de mensagens](../api/endpoints/messaging) — superfície REST completa para mensagens, conversas, conexões e rotas de notificação/lembrete
