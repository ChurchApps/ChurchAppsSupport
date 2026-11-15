---
title: "Arquitetura de notificações e lembretes"
description: "Como a API do B1 Admin encaminha notificações, lembretes agendados, limites de e-mail da igreja e opt-outs de texto por um único funil de entrega e um portão de preferências."
---

# Arquitetura de notificações e lembretes

<div class="article-intro">

Toda mensagem que um membro vê fora da página em que está — um contador no sino, uma notificação push, um resumo por e-mail — passa por uma de duas portas no MessagingApi. Esta página documenta o funil, o motor de lembretes que o alimenta em um cronograma e o modelo de preferências que decide o que realmente chega a uma pessoa.

</div>

## Visão geral — duas portas {#overview--two-doors}

```
qualquer coisa agendada ──▶ ReminderEngine (definições → ocorrências → scan) ─┐
push de equipe agendado ─▶ scheduledNotifications (temporizador de 1 minuto) ─┤
chat / pedidos / fluxo de trabalho / envios em massa ─────────────────────────┼─▶ createNotifications()
                                                                              │    portão in_app → socket → push → e-mail
     (canais de lembrete incluem sms) ──▶ ReminderEngine.sendSms() ──▶ portão sms → sendPersonText() pelo provedor da igreja
resposta STOP do provedor ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
e-mail de conta/legal ──▶ TransactionalEmailHelper.sendTransactional()  [lista de permissões, imposta por lint]
```

1. **Qualquer coisa que informe algo a uma pessoa** passa por `NotificationHelper.createNotifications()` no módulo de mensagens. Ele persiste uma linha em `notifications` e escala socket → push → e-mail, avaliando `PreferenceGateHelper` por canal — incluindo `in_app` no nível 0.
2. **Qualquer coisa agendada** é uma `reminderDefinition` (em nível de entidade ou de escopo), expandida em `reminderOccurrences` e despachada por `ReminderEngine.scan()` em um temporizador recorrente. Um expansor, um despachante, um livro-razão de envios (`reminderSentLog`). A única exceção é um push de equipe agendado pela página **Mobile > Notificações push** do B1Admin ou pelo diálogo **Notificar** de um grupo: é uma linha de `scheduledNotifications` (público `church` ou `group`), enviada por `ScheduledNotificationHelper.dispatchDue()` no temporizador de 1 minuto. Uma linha com mais de 30 minutos de atraso em relação ao seu `sendAt` na primeira tentativa é marcada como falha com `missed send window`, em vez de ser enviada atrasada, e um envio que falha é repetido até 3 vezes. Os destinatários são resolvidos no momento do envio por `PushAudienceHelper`, o mesmo helper usado pelo envio imediato para grupos, e entregues por `createNotifications()` como `churchPushNotification` (categoria de preferência `announcements`) ou `groupPushNotification`.
3. **E-mail direto** existe somente por trás de `TransactionalEmailHelper.sendTransactional()`. Uma regra do ESLint impõe isso em tempo de compilação — veja abaixo.

:::tip A porta de e-mail é imposta por lint, não apenas por convenção
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: qualquer chamada a `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` fora de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` falha no lint. Se você precisar enviar um e-mail, roteie-o pelo funil (`createNotifications` com `emailImmediate`) ou por `TransactionalEmailHelper.sendTransactional()` — não há um terceiro caminho que passe no CI.
:::

## O funil de notificações {#the-notification-funnel}

`NotificationHelper.createNotifications()` é o ponto de entrada único para tudo o que não é agendado nem transacional:

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
    deliveryStartLevel?: number;      // 0 socket (padrão), 1 push, 2 somente e-mail
    category?: string;                // eixo de preferência; derivado de contentType se omitido
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // envia o e-mail agora, em vez de aguardar o resumo
  }
)
```

Para cada destinatário, ele salva uma linha em `notifications` e chama `attemptDeliveryWithEscalation`, que percorre a escada de canais abaixo. Uma linha ainda não lida para o mesmo `(contentType, contentId)` impede a recriação — essa proteção de deduplicação é ignorada para envios com `emailImmediate` (lembretes de antecedência, envios de "e-mail para todos" da equipe, etapas de fluxo de trabalho que cuidam da própria deduplicação) e para mensagens diretas, que sempre disparam o socket.

`shared/helpers/NotificationService.ts` espelha a mesma assinatura (`NotificationServiceOptions`) para chamadores fora do módulo de mensagens, e é registrado no módulo de mensagens na inicialização.

## Escada de escalonamento de canais {#channel-escalation-chain}

A entrega começa em um nível (0 por padrão, ou mais alto para lembretes e envios explícitos) e só avança para o canal seguinte se o anterior não tiver sido bem-sucedido. Cada nível é controlado por `PreferenceGateHelper` antes de qualquer tentativa.

| Nível | Canal | Comportamento |
|-------|-------|---------------|
| 0 | **in_app / socket** | O portão `in_app` é verificado primeiro. Se suprimido (silenciado), a linha é persistida com `isNew=false` e a entrega para completamente — sem disparo de socket, sem selo, sem mais escalonamento. Caso contrário, o servidor procura conexões de socket abertas na sala `alerts` da pessoa e envia um quadro `notification` (ou `privateMessage`). Para notificações comuns, uma entrega bem-sucedida pelo socket para a cadeia aqui — o temporizador de 30 minutos verifica novamente os itens não lidos e os escalona depois. Mensagens diretas nunca param no socket: um PWA instalado pode manter o socket de alertas aberto em segundo plano, o que de outra forma suprimiria a push em nível de sistema operacional. |
| 1 | **push** | Controlado por `allowPush` / opt-out de categoria / horário de silêncio. Envia para tokens Expo push e para assinaturas Web Push encontradas nas linhas `devices` da pessoa, deduplicando por endpoint e removendo tokens obsoletos no caminho. |
| 2 | **e-mail** | Controlado por `emailFrequency` e opt-out de categoria. Envios imediatos (`emailImmediate`) são renderizados na hora e gravam uma linha em `deliveryLogs`; caso contrário, a notificação fica pendente para o resumo em lote, descrito abaixo. |
| — | **sms** | Não é um nível na escada de escalonamento. O único produtor de SMS controlado é o motor de lembretes: quando os `channels` de uma definição incluem `sms`, `ReminderEngine.sendSms()` envia texto a cada destinatário **além** da notificação push/e-mail (veja [Lembretes por texto](#text-reminders)). O envio de textos em massa (`TextingController` / `@churchapps/texting`), o envio **Enviar texto aos voluntários** da visão geral de escalas (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) e a ação de fluxo de trabalho **Enviar texto** (`StepActionHelper.sendText` → `sendPersonText`) enviam textos diretamente pelo provedor da igreja, então as preferências de notificação e os horários de silêncio não se aplicam a eles — apenas o flag `optedOut` da pessoa é respeitado. |

Notificações não lidas que ficaram no socket ou no push são escalonadas pelo temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). O e-mail em lote é enviado por `NotificationHelper.sendEmailNotifications(frequency)`, acionado pela preferência `emailFrequency` de cada pessoa: `individual` roda no temporizador de 30 minutos, `daily` roda no temporizador noturno. (`weekly` é um valor de preferência válido, mas ainda não tem uma execução em lote dedicada.)

## Motor de lembretes {#reminder-engine}

Lembretes agendados — lembretes de eventos, datas de vencimento de tarefas, lembretes de escalas e atribuições de planos — passam por um único motor generalizado, em vez de lógica de cron específica para cada recurso.

```
reminderDefinitions ──expandir──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 nível de entidade ou escopo      uma linha por (definição,            deliveryStartLevel: 1
 deslocamentos/canais/mensagem    entidade, ocorrência, deslocamento)  + livro-razão reminderSentLog
```

**Definições** (`reminderDefinitions`) são de nível de entidade (`entityId` preenchido — um evento, tarefa ou plano específico) ou de nível de escopo (`entityId` nulo, `scopeId` preenchido — por exemplo, todos os planos de um tipo de plano de escala). Uma definição tem uma lista separada por vírgulas de deslocamentos em minutos (`offsets`, por exemplo `"1440,60"` para um dia e uma hora antes), um horário local de envio (`sendLocalTime`), uma lista separada por vírgulas de canais (`channels` — incluindo `email`, que dispara um e-mail rico imediato no momento do envio), um `recipientMode` e uma `message` personalizada opcional.

A **expansão** materializa as linhas de disparo para o horizonte à frente (uma janela contínua de vários dias). Ela roda no temporizador noturno e, de forma síncrona, sempre que uma definição é salva, para que um lembrete de um evento de última hora também seja disparado. Definições de escopo se espalham pelo `loadScopeEntities` do adaptador, produzindo um conjunto de ocorrências por entidade concreta; ocorrências de nível de entidade usam a chave `definitionId:occurrenceISO:offset`, enquanto as de escopo são separadas pelo ID da entidade, para nunca colidirem. Inserir uma ocorrência **ressuscita** uma linha cancelada anteriormente — cancelar e reexpandir é a forma padrão de ressincronizar um lembrete depois que a entidade subjacente muda; linhas já `sent`, `failed` ou `processing` não são alteradas.

**Despacho** (`ReminderEngine.scan()`) roda no temporizador de 30 minutos. Ele reivindica as ocorrências vencidas (um lease impede o processamento duplicado), carrega os destinatários pelo adaptador da entidade, filtra quem já está registrado em `reminderSentLog` para aquela ocorrência e chama `createNotifications` com `deliveryStartLevel: 1` (pular direto para o push), além de `emailImmediate`/`emailByPerson` quando os canais da definição incluem e-mail.

### Lembretes por texto {#text-reminders}

Quando os `channels` de uma definição incluem `sms`, `scan()` chama `ReminderEngine.sendSms()` depois que as notificações push/e-mail são criadas, para os mesmos destinatários novos. O envio de texto é opt-in por membro:

- Cada destinatário passa por `PreferenceGateHelper.evaluate(..., "sms", ...)`, então `allowSms` precisa estar ativado (ele vem desativado por padrão e é definido pelo botão **Mensagens de texto** do B1App), e o canal `sms` da categoria não pode estar desativado por uma sobreposição. `event_reminders`, `serving_schedule` e `tasks` listam `sms` tanto em `defaultChannels` quanto em `allowedChannels`.
- Pessoas sem `mobilePhone` ou com `optedOut` definido são suprimidas. Se a igreja não tiver um provedor de texto, o restante do lote é suprimido com o motivo `no_provider`.
- O corpo é montado por `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, cortado em um segmento de 160 caracteres.
- Cada destinatário recebe sua própria linha em `reminderSentLog` com `channel: "sms"` e status `sent` / `suppressed` / `failed`, separada da linha de push/e-mail, para que um texto que falhou nunca reenvie o push ou o e-mail.

Os editores só oferecem **Texto** quando `GET /messaging/texting/status` retorna `{ enabled: true }` (o primeiro provedor de texto da igreja está habilitado).

**Opt-out por STOP.** `POST /messaging/texting/inbound/:churchId/:token` é um webhook anônimo que a igreja cola no seu provedor (o B1Admin mostra a URL obtida de `GET /messaging/texting/inboundUrl` nas configurações de texto). O token é um HMAC do ID da igreja (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` aceita campos de formulário no estilo Twilio e JSON no estilo Clearstream/TextInChurch; se a resposta for exatamente uma palavra de parada da operadora (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), cada pessoa não removida da igreja cujo celular corresponda recebe `people.optedOut = true` e `allowSms = false`. Outras respostas são confirmadas e ignoradas.

Um barramento de eventos interno reage a mutações de entidades sem esperar pela expansão noturna: eventos de conteúdo (pelo despachante de webhooks) e eventos de atualização de plano/tarefa disparam a reexpansão ou o cancelamento imediato da entidade afetada, e uma atualização de plano também reexpande as definições de escopo ligadas ao tipo daquele plano.

### Adaptadores {#adapters}

O motor não depende de entidade; cada tipo de entidade suportado se conecta por meio de um adaptador (`helpers/adapters/`):

| Tipo de entidade | Adaptador | Observações |
|------------------|-----------|-------------|
| `event` | `EventReminderAdapter` | Destinatários limitados a inscritos ou membros do grupo, conforme o evento e o `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Destinatários são as atribuições Aceitas + Não confirmadas em planos publicados (não rascunhos). Atribuições não confirmadas emitidas por um fluxo de confirmação de escala ficam de fora até serem aceitas (veja abaixo). `buildEmails` chama `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posições, observações e uma mensagem personalizada via `doing/helpers/PlanReminderEmailHelper`, incluindo botões Aceitar/Recusar assinados por `ReminderTokenHelper` que enviam para um endpoint público de resposta à atribuição. |
| `task` | `TaskReminderAdapter` | Destinatários são o(s) responsável(is) pela tarefa. |

### Endpoints {#endpoints}

| Método | Caminho | Finalidade |
|--------|---------|------------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carrega ou salva a definição de lembrete de uma entidade. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carrega ou salva uma definição de lembrete de escopo (herdada). |
| `DELETE` | `/messaging/reminders/:defId` | Exclui uma definição e cancela suas ocorrências pendentes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Prévia da quantidade de destinatários e das próximas datas de disparo de um lembrete de evento, antes de salvar. |
| `GET` | `/messaging/reminders/log` | Histórico recente de ocorrências de lembretes de uma igreja. |
| `POST` | `/messaging/reminders/mute` | Silencia lembretes de uma entidade específica. |

Salvar uma definição dispara uma reexpansão síncrona para aquela entidade ou escopo, para que os editores vejam os "próximos disparos" atualizados sem esperar pelo job noturno.

## Mensagens diretas {#direct-messages}

As mensagens diretas seguem o mesmo funil que todo o resto, em vez de um caminho de escalonamento separado. Cada conversa não lida recebe uma **linha sombra** em `notifications` (`contentType='privateMessage'`, `contentId` = o ID da mensagem privada, `category='direct_messages'`), que é dona de todo o estado de entrega — escalonamento por socket/push/e-mail, rastreamento de leitura, tudo. A própria tabela `privateMessages` guarda o conteúdo da mensagem e uma coluna `notifyPersonId`, que é a fonte do selo de não lidas e é limpa quando o destinatário lê a conversa.

As linhas sombra são invisíveis para o sino de notificações: ficam fora da consulta de contagem de não lidas, da consulta da lista de notificações e das consultas de marcar como lido/excluir, todas filtradas por `contentType <> 'privateMessage'`. Cada aviso de DM passa pelo socket independentemente do estado de leitura (semântica de chat ao vivo — sem deduplicação), e DMs nunca param na entrega por socket como as notificações comuns, já que um PWA em segundo plano pode manter um socket aberto e ainda precisar de um push em nível de sistema operacional. Se uma pessoa silenciar as notificações de DM, a linha sombra é estacionada (`isNew=false`, `notifyPersonId` limpo) — continua visível dentro da própria conversa, só que sem selos nem alertas.

## Preferências e controle {#preferences--gating}

Todo envio passa por `PreferenceGateHelper.evaluate()`, uma função pura (todo o estado é passado como parâmetro, sem chamadas ao banco no caminho quente) que retorna `allow`, `suppress` ou `defer`. As camadas são executadas em ordem, e a primeira que decidir vence:

1. **Categoria bloqueada** — algumas categorias são obrigatórias (nível 0) e ignoram todas as outras camadas.
2. **Silenciar tudo / desligar canal** — `masterMute`, `allowPush`, `allowSms` (desligado por padrão — os membros optam por entrar) ou `emailFrequency='never'` suprimem diretamente.
3. **Horário de silêncio** — apenas push e SMS (o e-mail é considerado não intrusivo). Se a hora atual no fuso horário da pessoa cair na janela de silêncio dela, uma categoria transacional ainda passa; uma não transacional é adiada até o fim da janela, calculado como um instante UTC correto em relação ao horário de verão por `TimezoneHelper.wallClockToUtc`.
4. **Sobreposição de preferência por categoria** — um opt-out explícito para um par categoria × canal; a ausência significa o padrão da categoria.
5. **Silêncio por entidade** — um silêncio registrado para uma entidade específica (por exemplo, um evento ou um plano) restringe ainda mais do que a configuração no nível da categoria, mas só se aplica quando quem chama informa um ID/tipo de entidade junto com a notificação.

Tabelas envolvidas: `notificationPreferences` (globais — `masterMute`, `emailFrequency` com `individual|daily|weekly|never`, `allowPush`, janela de horário de silêncio + fuso horário, `allowSms`), `notificationPreferenceOverrides` (por categoria × canal) e `notificationEntityMutes` (por entidade).

Esse controle é aplicado a notificações in-app (nível 0), push (nível 1) e e-mail (nível 2) dentro do funil — inclusive os e-mails imediatos de lembretes e resumos — e aos textos de lembrete em `ReminderEngine.sendSms()`. O e-mail transacional (códigos de autenticação, redefinições de senha, convites, recibos de doação) ignora esse controle por design; essa é a razão de existir da segunda porta.

### Fluxos de confirmação de escala {#serving-confirmation-workflows}

Um plano pode optar por um fluxo de trabalho `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publicar/Notificar então chama `POST /doing/plans/:id/issueRequests` em vez da notificação por atribuição: cada nova atribuição Não confirmada recebe `notified` + `confirmationWorkflowId` e um cartão de fluxo de trabalho (`tasks.assignmentId`, `followupKey` único). O cartão envia um alerta apenas no aplicativo (`appOnly: true` — sem escalonamento para push/e-mail) e depois executa as ações `sendAssignmentRequest` do fluxo de trabalho, que passam por `MessagingModuleGateway.sendServingWorkflowMessage`: e-mail via `NotificationHelper.sendWorkflowEmail` (portão de preferências + `ChurchEmailLimiter`, medido como `workflowEmail`), SMS via `sendPersonText` somente com `allowSms` e o portão da categoria `serving_schedule`. Aceitar/Recusar (`assignment.updated` no barramento de eventos) fecha o cartão; o temporizador de 30 minutos (`AssignmentWorkflowHelper.processPending`) corrige inícios e eventos perdidos e transforma uma solicitação sem resposta no prazo de acompanhamento em uma tarefa de revisão para o líder. Ciclo de vida completo: `Api/docs/assignment-confirmation-workflows.md`.

## Limites de e-mail escritos pela igreja {#church-authored-email-limits}

E-mails cujo conteúdo foi escrito por uma igreja saem da identidade SES compartilhada da ChurchApps, por isso são medidos por igreja por `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quatro caminhos chamam esse helper: envios de grupo/modelo (`EmailTemplateController`, tipo de conteúdo `email`), e-mails de acompanhamento de formulários (`FormSubmissionController`, `formFollowUp`), ações **Enviar e-mail** de fluxos de trabalho (`NotificationHelper` com `churchAuthored`, `workflowEmail`) e e-mails de solicitação de confirmação de escala (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). E-mails do sistema (códigos de autenticação, recibos, lembretes) e convites de funções e grupos (`UserController.sendInviteEmail`, um modelo fixo) não são medidos.

- **Portão de aprovação.** Uma igreja não envia nada até que um administrador do servidor defina `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Administrador do servidor → Igrejas → selo **Group Email**). Igrejas arquivadas são sempre bloqueadas. O diálogo Enviar e-mail do B1Admin lê `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, quando não aprovada, mostra um cartão **Solicitar revisão** no lugar do editor. O editor de etapas do fluxo de trabalho lê o mesmo endpoint (aberto para `tasks.admin` além de `groupMembers.edit`) para avisar sobre ações **Enviar e-mail** quando a igreja não está aprovada ou está pausada. No momento do envio, `MessagingModuleGateway.sendTemplatedEmail` retorna `false` sem criar uma notificação quando `ChurchEmailLimiter.remaining()` é menor que 1, para que o histórico do cartão nunca diga **E-mail enviado** para um e-mail que foi descartado. `POST /messaging/emailTemplates/requestApproval` envia um e-mail ao suporte, no máximo uma vez por igreja por semana.
- **Cota conquistada.** Uma igreja aprovada recebe `max(150, 2 × its best church-authored day in the prior 30 days)`, limitado a 2.000 em 24 horas móveis. As 24 horas atuais são excluídas do cálculo do "melhor dia", para que uma rajada não aumente o próprio limite.
- **Reservar, depois liquidar.** `reserve()` grava uma linha em `deliveryLogs` por destinatário antes do envio, verifica novamente a cota com essas linhas contadas e recua se duas requisições ultrapassaram o limite ao mesmo tempo (o envio retorna 429). `settle()` marca cada linha como enviada ou com falha.
- **Pausa por reclamações.** A Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentada por SES → SNS) associa cada rejeição permanente ou reclamação à igreja cujo e-mail escrito por ela chegou àquele endereço por volta daquele momento, armazenado como `deliveryMethod` `sesBounce` / `sesComplaint`. Uma igreja é pausada com 2+ reclamações (≥ 0,3% dos envios) ou 10+ rejeições definitivas (≥ 5%) em 7 dias.

## Agendamento {#scheduling}

Tanto o motor de lembretes quanto o resumo de notificações usam temporizadores agendados já existentes, em vez de introduzir nova infraestrutura:

| Temporizador | Cronograma | Executa |
|--------------|------------|---------|
| Temporizador de 30 minutos | a cada 30 minutos | Escalonar notificações não lidas; enviar resumos por e-mail com frequência `individual`; despachar ocorrências de lembretes vencidas (`ReminderEngine.scan`); resumos de aprovação; execuções de automação vencidas |
| Temporizador de 1 minuto (`timerWebhooks`) | a cada minuto | Enviar notificações push agendadas vencidas (`ScheduledNotificationHelper.dispatchDue`, job `scheduledNotifications`) |
| Temporizador noturno | 05:00 UTC | Lembretes de presença de grupos; avançar cultos de transmissão recorrentes; atualizar listas de atualização automática; expandir ocorrências de lembretes para o próximo horizonte (`ReminderEngine.expandAll`); enviar resumos por e-mail com frequência `daily` |

Localmente, a mesma lógica pode ser disparada sob demanda com `npm run timer:30min` e `npm run timer:midnight` a partir do projeto `Api`.

## Inventário de arquivos {#file-inventory}

| Área | Arquivos |
|------|----------|
| Funil | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartilhada | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transacional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regra de lint `Api/tools/eslint-rules/email-door.cjs` |
| Limites de e-mail da igreja | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motor de lembretes | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Texto / opt-out STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Enviar texto aos voluntários** na visão geral de escalas) |
| Repositórios de lembretes | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-mail de planos/escalas | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de lembretes (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor de lembretes / preferências (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas relacionadas {#related-pages}

- [Arquitetura em tempo real](../realtime.md) — o protocolo WebSocket e as primitivas do cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sobre as quais o nível de entrega in-app se apoia
- [Notificações push na web](../web-push.md) — configuração do VAPID e o caminho da API Push do navegador usado pelo nível de escalonamento de push
- [Endpoints de mensagens](../api/endpoints/messaging.md) — a superfície REST completa para mensagens, conversas, conexões e as rotas de notificação/lembrete
