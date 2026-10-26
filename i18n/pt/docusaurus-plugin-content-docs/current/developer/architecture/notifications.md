---
title: "Arquitetura de notificações e lembretes"
---

# Arquitetura de notificações e lembretes

<div class="article-intro">

Toda mensagem que um membro da igreja vê fora da página em que está — um contador de não lidas, uma notificação push, um resumo por e-mail — passa por uma de duas portas no MessagingApi. Esta página documenta o funil, o mecanismo de lembretes que o alimenta em horários programados e o modelo de preferências que decide o que realmente chega a uma pessoa.

</div>

## Visão geral — duas portas

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualquer coisa que informe algo a uma pessoa** passa por `NotificationHelper.createNotifications()` no módulo de mensagens. Ele grava uma linha em `notifications` e escalona socket → push → e-mail, avaliando `PreferenceGateHelper` por canal — inclusive `in_app` no nível 0.
2. **Qualquer coisa agendada** é uma `reminderDefinition` (no nível da entidade ou do escopo), expandida em `reminderOccurrences` e despachada por `ReminderEngine.scan()` em um temporizador recorrente. Um expansor, um despachante, um único registro de envios (`reminderSentLog`).
3. **E-mail direto** existe somente por trás de `TransactionalEmailHelper.sendTransactional()`. Uma regra do ESLint impõe isso em tempo de compilação — veja abaixo.

:::tip A porta de e-mail é imposta pelo lint, não apenas por convenção
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: qualquer chamada a `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` fora de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` falha no lint. Se você precisar enviar um e-mail, faça-o pelo funil (`createNotifications` com `emailImmediate`) ou por `TransactionalEmailHelper.sendTransactional()` — não existe um terceiro caminho que passe no CI.
:::

## O funil de notificações

`NotificationHelper.createNotifications()` é o único ponto de entrada para tudo o que não é agendado nem transacional:

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

Para cada destinatário, ele salva uma linha em `notifications` e chama `attemptDeliveryWithEscalation`, que percorre a escada de canais abaixo. Uma linha ainda não lida para o mesmo `(contentType, contentId)` impede a recriação — essa proteção contra duplicatas é ignorada para envios com `emailImmediate` (antecedências de lembretes, o "enviar e-mail para todos" da equipe, etapas de fluxo de trabalho que têm sua própria deduplicação) e para mensagens diretas, que sempre disparam o socket.

`shared/helpers/NotificationService.ts` espelha a mesma assinatura (`NotificationServiceOptions`) para chamadores fora do módulo de mensagens e é registrado no módulo de mensagens na inicialização.

## Escada de escalonamento de canais

A entrega começa em um nível (0 por padrão, ou mais alto para lembretes e envios explícitos) e só passa para o próximo canal se o anterior não tiver tido sucesso. Cada nível é controlado por `PreferenceGateHelper` antes de qualquer tentativa.

| Nível | Canal | Comportamento |
|-------|-------|---------------|
| 0 | **in_app / socket** | O controle `in_app` é verificado primeiro. Se suprimido (silenciado), a linha é persistida com `isNew=false` e a entrega para por completo — sem disparo de socket, sem contador, sem novo escalonamento. Caso contrário, o servidor procura conexões de socket abertas para a sala `alerts` da pessoa e envia um frame `notification` (ou `privateMessage`). Para notificações comuns, uma entrega bem-sucedida por socket interrompe a cadeia aqui — o temporizador de 30 minutos verifica novamente os itens não lidos e os escalona depois. Mensagens diretas nunca param no socket: um PWA instalado pode manter o socket de alertas aberto em segundo plano, o que de outra forma suprimiria a notificação push do sistema operacional. |
| 1 | **push** | Condicionado a `allowPush` / desativação por categoria / horário de silêncio. Envia para tokens push do Expo e assinaturas Web Push encontrados nas linhas `devices` da pessoa, deduplicando por endpoint e removendo tokens obsoletos no caminho. |
| 2 | **email** | Condicionado a `emailFrequency` e à desativação por categoria. Envios imediatos (`emailImmediate`) são renderizados na hora e gravam uma linha em `deliveryLogs`; caso contrário, a notificação fica pendente para o resumo em lote descrito abaixo. |
| — | **sms** | Não é um nível da escada de escalonamento. O único produtor de SMS controlado é o mecanismo de lembretes: quando os `channels` de uma definição incluem `sms`, `ReminderEngine.sendSms()` envia uma mensagem de texto a cada destinatário **além** da notificação push/e-mail (veja [Lembretes por SMS](#text-reminders)). O envio de texto em massa (`TextingController` / `@churchapps/texting`), o envio **Enviar texto aos voluntários** do panorama de escalas (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) e a ação de etapa de fluxo de trabalho **Enviar texto** (`StepActionHelper.sendText` → `sendPersonText`) enviam textos diretamente pelo provedor da igreja; por isso as preferências de notificação e o horário de silêncio não se aplicam a eles — somente o sinalizador `optedOut` da pessoa é respeitado. |

Notificações não lidas que ficaram no socket ou no push são escalonadas pelo temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). O e-mail em lote é enviado por `NotificationHelper.sendEmailNotifications(frequency)`, acionado pela preferência `emailFrequency` de cada pessoa: `individual` roda no temporizador de 30 minutos, `daily` roda no temporizador noturno. (`weekly` é um valor de preferência válido, mas ainda não tem uma execução em lote dedicada.)

## Mecanismo de lembretes

Lembretes agendados — lembretes de eventos, datas de vencimento de tarefas, lembretes de escalas e atribuições de planos — passam todos por um único mecanismo generalizado, e não por lógica cron específica de cada recurso.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definições** (`reminderDefinitions`) são no nível da entidade (`entityId` definido — um evento, tarefa ou plano específico) ou no nível do escopo (`entityId` nulo, `scopeId` definido — por exemplo, todo plano de um tipo de plano de escala). Uma definição tem uma lista CSV de antecedências em minutos (`offsets`, por exemplo `"1440,60"` para um dia e uma hora antes), um horário local de envio (`sendLocalTime`), uma lista CSV de canais (`channels` — incluindo `email`, que dispara um e-mail rico imediato no momento do envio), um `recipientMode` e uma `message` personalizada opcional.

**A expansão** materializa linhas de disparo para o horizonte à frente (uma janela contínua de vários dias). Ela roda no temporizador noturno e também de forma síncrona sempre que uma definição é salva, para que um lembrete de um evento de última hora ainda dispare. Definições de escopo se espalham pelo `loadScopeEntities` do adaptador, produzindo um conjunto de ocorrências por entidade concreta; ocorrências no nível da entidade usam a chave `definitionId:occurrenceISO:offset`, enquanto ocorrências de escopo usam o id da entidade como namespace, para nunca colidirem. Gravar (upsert) uma ocorrência **ressuscita** uma linha previamente cancelada — cancelar e reexpandir é a forma padrão de ressincronizar um lembrete depois que a entidade subjacente muda; linhas já `sent`, `failed` ou `processing` ficam intactas.

**O despacho** (`ReminderEngine.scan()`) roda no temporizador de 30 minutos. Ele reivindica ocorrências vencidas (uma concessão de bloqueio — lease — impede o processamento duplo), carrega os destinatários pelo adaptador da entidade, filtra quem já está registrado em `reminderSentLog` para aquela ocorrência e chama `createNotifications` com `deliveryStartLevel: 1` (pula direto para o push), mais `emailImmediate`/`emailByPerson` quando os canais da definição incluem e-mail.

### Lembretes por SMS {#text-reminders}

Quando os `channels` de uma definição incluem `sms`, `scan()` chama `ReminderEngine.sendSms()` depois que as notificações push/e-mail são criadas, para os mesmos destinatários novos. O envio de mensagens de texto é opt-in por membro:

- Cada destinatário passa por `PreferenceGateHelper.evaluate(..., "sms", ...)`, então `allowSms` precisa estar ativo (vem desativado por padrão e é definido pelo botão **Mensagens de texto** do B1App), e o canal `sms` da categoria não pode estar desativado por substituição. `event_reminders`, `serving_schedule` e `tasks` listam `sms` tanto em `defaultChannels` quanto em `allowedChannels`.
- Pessoas sem `mobilePhone` ou com `optedOut` definido são suprimidas. Se a igreja não tiver um provedor de texto, o restante do lote é suprimido com o motivo `no_provider`.
- O corpo é montado por `ReminderEngine.smsBody()`: `"<Nome da igreja>: <mensagem> Responda STOP para cancelar."`, reduzido a um único segmento de 160 caracteres.
- Cada destinatário recebe sua própria linha em `reminderSentLog` com `channel: "sms"` e status `sent` / `suppressed` / `failed`, registrada separadamente da linha de push/e-mail; assim, um texto que falhou nunca reenvia o push ou o e-mail.

Os editores só oferecem **Texto** quando `GET /messaging/texting/status` retorna `{ enabled: true }` (o primeiro provedor de texto da igreja está ativo).

**Cancelamento com STOP.** `POST /messaging/texting/inbound/:churchId/:token` é um webhook anônimo que a igreja cola no seu provedor (o B1Admin mostra a URL obtida de `GET /messaging/texting/inboundUrl` nas configurações de texto). O token é um HMAC do id da igreja (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` aceita campos de formulário no estilo Twilio e JSON no estilo Clearstream/TextInChurch; se a resposta for exatamente uma palavra de parada da operadora (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), toda pessoa não removida da igreja cujo número de celular corresponder recebe `people.optedOut = true` e `allowSms = false`. Outras respostas recebem confirmação e são ignoradas.

Um barramento de eventos interno reage a mutações de entidades sem esperar pela expansão noturna: eventos de conteúdo (pelo despachante de webhooks) e eventos de atualização de plano ou tarefa disparam uma reexpansão ou cancelamento imediato para a entidade afetada, e uma atualização de plano também reexpande quaisquer definições de escopo ligadas ao seu tipo de plano.

### Adaptadores

O mecanismo não depende do tipo de entidade; cada tipo de entidade suportado se conecta por meio de um adaptador (`helpers/adapters/`):

| Tipo de entidade | Adaptador | Observações |
|------------------|-----------|-------------|
| `event` | `EventReminderAdapter` | Destinatários limitados a inscritos ou membros de grupos, conforme o evento e o `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Os destinatários são as atribuições Aceitas + Não confirmadas em planos publicados (não rascunhos). Atribuições não confirmadas emitidas por um fluxo de confirmação de escala são excluídas até serem aceitas (veja abaixo). `buildEmails` chama `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posições, observações e uma mensagem personalizada via `doing/helpers/PlanReminderEmailHelper`, incluindo botões Aceitar/Recusar assinados por `ReminderTokenHelper` que enviam para um endpoint público de resposta de atribuição. |
| `task` | `TaskReminderAdapter` | Os destinatários são o(s) responsável(is) pela tarefa. |

### Endpoints

| Método | Caminho | Finalidade |
|--------|---------|------------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carregar ou salvar a definição de lembrete de uma entidade. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carregar ou salvar uma definição de lembrete no nível de escopo (herdada). |
| `DELETE` | `/messaging/reminders/:defId` | Excluir uma definição e cancelar suas ocorrências pendentes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Pré-visualizar o número de destinatários e os próximos horários de disparo de um lembrete de evento antes de salvar. |
| `GET` | `/messaging/reminders/log` | Histórico recente de ocorrências de lembretes de uma igreja. |
| `POST` | `/messaging/reminders/mute` | Silenciar lembretes de uma entidade específica. |

Salvar uma definição dispara uma reexpansão síncrona para aquela entidade ou escopo, para que os editores vejam os "próximos disparos" atualizados sem esperar pelo job noturno.

## Mensagens diretas

As mensagens diretas usam o mesmo funil que todo o resto, em vez de um caminho de escalonamento separado. Cada conversa não lida recebe uma **linha-sombra** em `notifications` (`contentType='privateMessage'`, `contentId` = o id da mensagem privada, `category='direct_messages'`) que controla todo o estado de entrega — escalonamento socket/push/e-mail, rastreamento de leitura, tudo. A tabela `privateMessages` em si mantém o conteúdo da mensagem e uma coluna `notifyPersonId`, que é a fonte do contador de não lidas e é limpa quando o destinatário lê a conversa.

As linhas-sombra são invisíveis para o sino de notificações: são excluídas da consulta de contagem de não lidas, da consulta da lista de notificações e das consultas de marcar como lida/excluir, todas filtrando `contentType <> 'privateMessage'`. Cada aviso de mensagem direta chega ao socket independentemente do estado de leitura (semântica de chat ao vivo — sem deduplicação), e as mensagens diretas nunca param no socket como as notificações comuns, já que um PWA em segundo plano pode manter um socket aberto e ainda precisar de uma notificação push do sistema operacional. Se uma pessoa silenciar as notificações de mensagens diretas, a linha-sombra é estacionada (`isNew=false`, `notifyPersonId` limpo) — ela continua visível dentro da própria conversa, só que sem contadores ou alertas.

## Preferências e controle

Todo envio passa por `PreferenceGateHelper.evaluate()`, uma função pura (todo o estado é passado como argumento, sem chamadas ao banco de dados no caminho crítico) que retorna `allow`, `suppress` ou `defer`. As camadas são executadas em ordem, e a primeira que decidir prevalece:

1. **Categoria bloqueada** — algumas categorias são obrigatórias (nível 0) e ignoram todas as outras camadas.
2. **Silenciamento geral / bloqueio de canal** — `masterMute`, `allowPush`, `allowSms` (desligado por padrão — os membros optam por ativar) ou `emailFrequency='never'` suprimem diretamente.
3. **Horário de silêncio** — apenas push e SMS (o e-mail é considerado não intrusivo). Se a hora atual no fuso horário da pessoa cair na janela de silêncio dela, uma categoria transacional ainda passa; uma não transacional é adiada para o fim da janela de silêncio, calculado como um instante UTC correto em relação ao horário de verão via `TimezoneHelper.wallClockToUtc`.
4. **Substituição de preferência por categoria** — uma desativação explícita para um par categoria × canal; a ausência significa o padrão da categoria.
5. **Silenciamento por entidade** — um silenciamento registrado para uma entidade específica (por exemplo, um evento ou um plano) restringe mais do que a configuração no nível da categoria, mas só se aplica quando quem chama fornece um id/tipo de entidade junto com a notificação.

Tabelas envolvidas: `notificationPreferences` (global — `masterMute`, `emailFrequency` com `individual|daily|weekly|never`, `allowPush`, janela de horário de silêncio e fuso horário, `allowSms`), `notificationPreferenceOverrides` (por categoria × canal) e `notificationEntityMutes` (por entidade).

Este controle é aplicado para in-app (nível 0), push (nível 1) e e-mail (nível 2) dentro do funil — incluindo os e-mails imediatos de lembrete e de resumo — e para os textos de lembrete em `ReminderEngine.sendSms()`. O e-mail transacional (códigos de acesso, redefinições de senha, convites, recibos de doação) ignora o controle por projeto; esse é o sentido da segunda porta.

### Fluxos de confirmação de escala

Um plano pode optar por um fluxo de trabalho `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publicar/Notificar então chama `POST /doing/plans/:id/issueRequests` em vez da notificação por atribuição: cada nova atribuição Não confirmada recebe `notified` + `confirmationWorkflowId` e um cartão de fluxo de trabalho (`tasks.assignmentId`, `followupKey` única). O cartão envia um alerta somente para o app (`appOnly: true` — sem escalonamento para push/e-mail) e depois executa as ações `sendAssignmentRequest` do fluxo, que passam por `MessagingModuleGateway.sendServingWorkflowMessage`: e-mail via `NotificationHelper.sendWorkflowEmail` (controle de preferências + `ChurchEmailLimiter`, medido como `workflowEmail`), SMS via `sendPersonText` somente com `allowSms` e o controle da categoria `serving_schedule`. Aceitar/Recusar (`assignment.updated` no barramento de eventos) fecha o cartão; o temporizador de 30 minutos (`AssignmentWorkflowHelper.processPending`) recupera inícios e eventos perdidos e transforma uma solicitação sem resposta, no prazo de acompanhamento, em uma tarefa de revisão para o líder. Ciclo de vida completo: `Api/docs/assignment-confirmation-workflows.md`.

## Limites de e-mail escritos pela igreja

Os e-mails cujo conteúdo foi escrito por uma igreja saem a partir da identidade SES compartilhada da ChurchApps, por isso são medidos por igreja por `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quatro caminhos o chamam: envios para grupos/modelos (`EmailTemplateController`, tipo de conteúdo `email`), e-mails de acompanhamento de formulários (`FormSubmissionController`, `formFollowUp`), ações **Enviar e-mail** de fluxos de trabalho (`NotificationHelper` com `churchAuthored`, `workflowEmail`) e e-mails de solicitação de confirmação de escala (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). E-mails do sistema (códigos de acesso, recibos, lembretes) e convites de funções e grupos (`UserController.sendInviteEmail`, um modelo fixo) não são medidos.

- **Gate de aprovação.** Uma igreja não envia nada até que um administrador do servidor defina `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Administrador do Servidor → Igrejas → selo **Group Email**). Igrejas arquivadas são sempre bloqueadas. A caixa de diálogo Enviar E-mail do B1Admin lê `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, quando não aprovada, mostra um cartão **Solicitar revisão** no lugar do editor. O editor de etapas do fluxo lê o mesmo endpoint (acessível a `tasks.admin` além de `groupMembers.edit`) para alertar sobre ações **Enviar e-mail** quando a igreja não está aprovada ou está pausada. No momento do envio, `MessagingModuleGateway.sendTemplatedEmail` retorna `false` sem criar uma notificação quando `ChurchEmailLimiter.remaining()` é menor que 1, para que o histórico do cartão nunca afirme **E-mail enviado** para um e-mail que foi descartado. `POST /messaging/emailTemplates/requestApproval` envia um e-mail ao suporte, no máximo uma vez por igreja por semana.
- **Cota conquistada.** Uma igreja aprovada recebe `max(150, 2 × seu melhor dia de e-mails escritos pela igreja nos 30 dias anteriores)`, limitado a 2.000 em cada janela contínua de 24 horas. As 24 horas atuais são excluídas do "melhor dia", para que uma rajada não eleve o próprio limite.
- **Reservar, depois liquidar.** `reserve()` grava uma linha em `deliveryLogs` por destinatário antes de enviar, verifica novamente a cota com essas linhas contadas e recua se duas requisições ultrapassarem o limite ao mesmo tempo (o envio retorna 429). `settle()` marca cada linha como enviada ou com falha.
- **Pausa por reclamações.** A Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentada por SES → SNS) vincula cada rejeição permanente ou reclamação à igreja cujo e-mail escrito pela igreja chegou àquele endereço por volta daquele momento, armazenado como `deliveryMethod` `sesBounce` / `sesComplaint`. Uma igreja é pausada com 2 ou mais reclamações (≥ 0,3% dos envios) ou 10 ou mais rejeições definitivas (≥ 5%) em 7 dias.

## Agendamento

Tanto o mecanismo de lembretes quanto o resumo de notificações usam os temporizadores agendados já existentes, em vez de introduzir nova infraestrutura:

| Temporizador | Agenda | Executa |
|--------------|--------|---------|
| Temporizador de 30 minutos | a cada 30 minutos | Escalonar notificações não lidas; enviar e-mails de resumo com frequência `individual`; disparar ocorrências de lembretes vencidas (`ReminderEngine.scan`); resumos de aprovação; execuções de automação vencidas |
| Temporizador noturno | 05:00 UTC | Lembretes de presença de grupos; avançar cultos de transmissão recorrentes; atualizar listas de atualização automática; expandir ocorrências de lembretes para o próximo horizonte (`ReminderEngine.expandAll`); enviar e-mails de resumo com frequência `daily` |

Localmente, a mesma lógica pode ser acionada sob demanda com `npm run timer:30min` e `npm run timer:midnight` a partir do projeto `Api`.

## Inventário de arquivos

| Área | Arquivos |
|------|----------|
| Funil | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartilhada | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transacional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regra de lint `Api/tools/eslint-rules/email-door.cjs` |
| Limites de e-mail da igreja | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Mecanismo de lembretes | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Mensagens de texto / cancelamento com STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (panorama de escalas, **Enviar texto aos voluntários**) |
| Repositórios de lembretes | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-mail de escalas/planos | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de lembretes (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor de lembretes / preferências (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas relacionadas

- [Arquitetura em tempo real](../realtime) — o protocolo WebSocket e as primitivas do cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sobre as quais o nível de entrega no app se apoia
- [Notificações Web Push](../web-push) — configuração do VAPID e o caminho da Push API do navegador usado pelo nível de escalonamento push
- [Endpoints de mensagens](../api/endpoints/messaging) — a superfície REST completa de mensagens, conversas, conexões e rotas de notificações/lembretes
