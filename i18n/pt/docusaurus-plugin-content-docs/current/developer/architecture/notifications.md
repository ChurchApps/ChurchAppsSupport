---
title: "Arquitetura de Notificações e Lembretes"
---

# Arquitetura de Notificações e Lembretes

<div class="article-intro">

Cada mensagem que um membro da igreja vê fora da página que está consultando — um contador de crachá, uma notificação por push, um email de resumo — passa por uma de duas portas na MessagingApi. Esta página documenta o funil, o mecanismo de lembretes que o alimenta em um cronograma, e o modelo de preferências que decide o que realmente chega a uma pessoa.

</div>

## Visão geral — duas portas

```
qualquer coisa agendada ──▶ ReminderEngine (definições → ocorrências → scan) ─┐
chat / requisições / workflow / envios em massa ─────────────────────────────┼─▶ createNotifications()
                                                                             │    in_app gate → socket → push → email (→ sms slot)
email de conta/legal ──▶ TransactionalEmailHelper.sendTransactional()  [lista de permissões, lint obrigatório]
```

1. **Tudo que comunica algo a uma pessoa** passa por `NotificationHelper.createNotifications()` no módulo de mensagens. Persiste uma linha `notifications` e escala socket → push → email, avaliando `PreferenceGateHelper` por canal — incluindo `in_app` no nível 0.
2. **Tudo que é agendado** é uma `reminderDefinition` (no nível de entidade ou escopo) expandida em `reminderOccurrences` e despachada por `ReminderEngine.scan()` em um timer recorrente. Um expansor, um despachador, um livro razão de envio (`reminderSentLog`).
3. **Email direto** existe apenas atrás de `TransactionalEmailHelper.sendTransactional()`. Uma regra ESLint impõe isso no tempo de compilação — veja abaixo.

:::tip A porta de email é imposta por lint, não apenas por convenção
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: qualquer chamada para `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` fora de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` falha no lint. Se você precisa enviar um email, encaminhe-o através do funil (`createNotifications` com `emailImmediate`) ou através de `TransactionalEmailHelper.sendTransactional()` — não há uma terceira forma que passa no CI.
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
    deliveryStartLevel?: number;      // 0 socket (padrão), 1 push, 2 email-only
    category?: string;                // eixo de preferência; derivado de contentType se omitido
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // enviar email agora em vez de esperar pelo resumo
  }
)
```

Para cada destinatário, salva uma linha em `notifications` e chama `attemptDeliveryWithEscalation`, que percorre a escada de canais abaixo. Uma linha ainda não lida para o mesmo `(contentType, contentId)` suprime recriação — essa proteção de dedup é ignorada para envios `emailImmediate` (deslocamentos de lembretes, equipe "enviar para todos", etapas de workflow possuem seu próprio dedup) e para mensagens diretas, que sempre avisam o socket.

`shared/helpers/NotificationService.ts` espelha a mesma assinatura (`NotificationServiceOptions`) para chamadores fora do módulo de mensagens e é registrado com o módulo de mensagens na inicialização.

## Cadeia de escalação de canal

A entrega começa em um nível (0 por padrão, ou superior para lembretes/envios explícitos) e apenas prossegue para o próximo canal se o anterior não teve sucesso. Cada nível é controlado por `PreferenceGateHelper` antes de qualquer tentativa.

| Nível | Canal | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | O portão `in_app` é verificado primeiro. Se suprimido (silenciado), a linha é persistida com `isNew=false` e a entrega para completamente — sem aviso de socket, sem crachá, sem escalação adicional. Caso contrário, o servidor procura conexões de socket aberto para a sala `alerts` da pessoa e envia um quadro `notification` (ou `privateMessage`). Para notificações ordinárias, uma entrega de socket bem-sucedida para a cadeia aqui — o timer de 30 minutos verifica novamente itens não lidos e os escala mais tarde. Mensagens diretas nunca param no socket: um PWA instalado pode manter o socket de alertas aberto em segundo plano, o que de outra forma suprimiria o push no nível do SO. |
| 1 | **push** | Controlado por `allowPush` / exclusão de categoria / horários de silêncio. Envia para tokens de push do Expo e Web Push subscrições encontrados nas linhas `devices` da pessoa, deduplicando por endpoint e removendo tokens obsoletos ao longo do caminho. |
| 2 | **email** | Controlado por `emailFrequency` e exclusão de categoria. Envios imediatos (`emailImmediate`) renderizam imediatamente e escrevem uma linha `deliveryLogs`; caso contrário, a notificação é deixada pendente para o resumo do lote, descrito abaixo. |
| — | **sms** | A tubulação de preferências (`allowSms`, listas de canal por categoria) já contabiliza um canal de SMS, mas nenhum produtor envia através dele hoje — ele permanece reservado para o produto de SMS em massa, que executa como um fluxo separado e isolado via `TextingController` / `@churchapps/texting`. A etapa de ação de workflow **Send Text** (`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`) também ignora esse funil: envia texto da pessoa do cartão diretamente através do provedor da igreja, então as preferências de notificação e horários de silêncio não se aplicam — apenas a flag `optedOut` da pessoa é honrada. |

Notificações não lidas deixadas no socket ou push são escaladas pelo timer de 30 minutos (`NotificationHelper.escalateDelivery`). Email em lote é enviado por `NotificationHelper.sendEmailNotifications(frequency)`, orientado pela preferência `emailFrequency` de cada pessoa: `individual` executa no timer de 30 minutos, `daily` executa no timer noturno. (`weekly` é um valor de preferência válido, mas ainda não tem uma execução dedicada.)

## Mecanismo de Lembretes

Lembretes agendados — lembretes de evento, datas de vencimento de tarefas, lembretes de atribuição de servir/plano — todos passam por um mecanismo generalizado em vez de lógica de cron bespoke por recurso.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 deslocamentos/canais/mensagem   uma linha por (definição,          deliveryStartLevel: 1
 no nível de entidade ou escopo   entidade, ocorrência, deslocamento) + ledger reminderSentLog
```

**Definições** (`reminderDefinitions`) são no nível de entidade (`entityId` definido — um evento, tarefa ou plano específico) ou no nível de escopo (`entityId` nulo, `scopeId` definido — por exemplo, cada plano sob um tipo de plano de servir). Uma definição carrega um CSV de deslocamentos de minutos (`offsets`, por exemplo `"1440,60"` para um dia e uma hora antes), uma hora de envio local (`sendLocalTime`), um CSV de canais (`channels` — incluindo `email` dispara um email rico imediato no momento do envio), um `recipientMode`, e uma `message` opcional personalizada.

**Expansão** materializa linhas de disparo para o horizonte à frente (uma janela móvel de vários dias). Executa no timer noturno e sincronamente sempre que uma definição é salva, então um lembrete de um evento de última hora ainda dispara. Definições de escopo se expandem via `loadScopeEntities` do adaptador, produzindo um conjunto de ocorrência por entidade concreta; as ocorrências no nível de entidade usam a chave `definitionId:occurrenceISO:offset`, enquanto as ocorrências com escopo fazem namespace por id de entidade para que nunca colidam. Upserting uma ocorrência **ressuscita** uma linha previamente cancelada — cancelar-depois-re-expandir é a forma padrão de re-sincronizar um lembrete após a entidade subjacente mudar; linhas já `sent`, `failed`, ou `processing` são deixadas intactas.

**Despacho** (`ReminderEngine.scan()`) executa no timer de 30 minutos. Ele reivindica ocorrências devidas (uma concessão evita duplo processamento), carrega destinatários através do adaptador da entidade, filtra qualquer um já registrado em `reminderSentLog` para aquela ocorrência, e chama `createNotifications` com `deliveryStartLevel: 1` (pula direto para push) mais `emailImmediate`/`emailByPerson` quando os canais da definição incluem email.

Um barramento de eventos interno reage a mutações de entidade sem esperar pela expansão noturna: eventos de conteúdo (via o despachador de webhook) e eventos de atualização de plano/tarefa disparam re-expansão imediata ou cancelamento pela entidade afetada, e uma atualização de plano também re-expande qualquer definição de escopo vinculada ao seu tipo de plano.

### Adaptadores

O mecanismo é agnóstico em relação a entidade; cada tipo de entidade suportado se conecta através de um adaptador (`helpers/adapters/`):

| Tipo de entidade | Adaptador | Notas |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatários com escopo para registrantes ou membros do grupo dependendo do evento e `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Destinatários são atribuições de plano Aceitas + Não confirmadas. `buildEmails` chama em `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posições, notas e uma mensagem personalizada via `doing/helpers/PlanReminderEmailHelper`, incluindo botões Accept/Decline assinados por `ReminderTokenHelper` que postam em um endpoint público de resposta de atribuição. |
| `task` | `TaskReminderAdapter` | Destinatários são o(s) responsável(is) da tarefa. |

### Endpoints

| Método | Caminho | Propósito |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carregar ou salvar a definição de lembrete de uma entidade. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carregar ou salvar uma definição de lembrete no nível de escopo (herdada). |
| `DELETE` | `/messaging/reminders/:defId` | Deletar uma definição e cancelar suas ocorrências pendentes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Pré-visualizar contagem de destinatários e próximos horários de disparo de um lembrete de evento antes de salvar. |
| `GET` | `/messaging/reminders/log` | Histórico recente de ocorrência de lembrete de uma igreja. |
| `POST` | `/messaging/reminders/mute` | Silenciar lembretes de uma entidade específica. |

Salvar uma definição dispara uma re-expansão síncrona para aquela entidade ou escopo, então os editores veem "próximos disparos" atualizados sem esperar pelo trabalho noturno.

## Mensagens diretas

Mensagens diretas andam no mesmo funil que tudo mais, em vez de um caminho de escalação separado. Cada conversa não lida recebe uma **linha sombra** em `notifications` (`contentType='privateMessage'`, `contentId` = o id da mensagem privada, `category='direct_messages'`) que possui todo o estado de entrega — escalação socket/push/email, rastreamento de leitura, tudo. A tabela `privateMessages` em si mantém a carga útil da mensagem e uma coluna `notifyPersonId`, que é a fonte do crachá não lido e é limpa quando o destinatário lê a conversa.

Linhas sombra são invisíveis ao sino de notificações: são excluídas da consulta de contagem não lida, da consulta de lista de notificações e das consultas de marcar lido/deletar, todas as quais filtram `contentType <> 'privateMessage'`. Cada aviso de DM atinge o socket independentemente do estado não lido (semântica de bate-papo ao vivo — sem dedup), e DMs nunca param na entrega de socket da forma que as notificações ordinárias fazem, pois um PWA em background pode manter um socket aberto enquanto ainda precisa de um push no nível do SO. Se uma pessoa silencia notificações de DM, a linha sombra é estacionada (`isNew=false`, `notifyPersonId` limpo) — ainda visível dentro da conversa em si, apenas sem crachás ou alertas.

## Preferências e Gating

Cada envio passa por `PreferenceGateHelper.evaluate()`, uma função pura (todo o estado passado, sem chamadas DB no caminho quente) que retorna `allow`, `suppress`, ou `defer`. As camadas executam em ordem, e a primeira que decide vence:

1. **Categoria bloqueada** — algumas categorias são obrigatórias (nível 0) e ignoram todas as outras camadas.
2. **Silêncio mestre / desligamento de canal** — `masterMute`, `allowPush`, `allowSms`, ou `emailFrequency='never'` suprimem totalmente.
3. **Horários de silêncio** — apenas push e SMS (email é considerado não intrusivo). Se a hora atual do relógio na zona horária da pessoa cair em sua janela de silêncio, uma categoria transacional ainda passa; uma não transacional é adiada para o fim da janela de silêncio, computada como um instante UTC correto para DST via `TimezoneHelper.wallClockToUtc`.
4. **Substituição de preferência por categoria** — uma exclusão explícita para um par categoria × canal; a ausência significa o padrão da categoria.
5. **Silêncio por entidade** — um silêncio registrado contra uma entidade específica (por exemplo, um evento, um plano) restringe mais que a configuração no nível de categoria, mas apenas se aplica quando o chamador fornece um id/tipo de entidade ao lado da notificação.

Tabelas envolvidas: `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, janela de horários de silêncio + zona horária, `allowSms`), `notificationPreferenceOverrides` (por categoria × canal), e `notificationEntityMutes` (por entidade).

Este portão é imposto para in-app (nível 0), push (nível 1) e email (nível 2) dentro do funil — incluindo emails de lembrete/resumo imediatos. Email transacional (códigos de autenticação, redefinições de senha, convites, recibos de doação) o ignora por design; esse é todo o ponto da segunda porta.

## Limites de email autorizado pela igreja

Email cujo conteúdo uma igreja escreveu sai da identidade ChurchApps SES compartilhada, então é medido por igreja por `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quatro caminhos o chamam: envios de grupo/modelo (`EmailTemplateController`, tipo de conteúdo `email`), emails de acompanhamento de formulário (`FormSubmissionController`, `formFollowUp`), ações de workflow **Send email** (`NotificationHelper` com `churchAuthored`, `workflowEmail`), e convites de conta B1 (`UserController.sendInviteEmail`, `invite`). Email do sistema (códigos de autenticação, recibos, lembretes) não é medido.

- **Portão de aprovação.** Uma igreja não envia nada até que um administrador do servidor defina `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Igrejas arquivadas sempre são bloqueadas. O diálogo Send Email do B1Admin lê `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) e, quando não aprovado, mostra um cartão **Request review** em vez do editor. `POST /messaging/emailTemplates/requestApproval` envia email ao suporte, no máximo uma vez por igreja por semana.
- **Abono ganho.** Uma igreja aprovada recebe `max(150, 2 × seu melhor dia autorizado pela igreja em 30 dias anteriores)`, limitado a 2.000 por 24 horas móveis. As 24 horas atuais são excluídas de "melhor dia" para que um surto não possa aumentar seu próprio limite.
- **Reservar, depois liquidar.** `reserve()` escreve uma linha `deliveryLogs` por destinatário antes de enviar, verifica novamente o abono com essas linhas contadas, e recua se duas requisições passarem do limite (o envio retorna 429). `settle()` marca cada linha enviada ou falhada.
- **Pausa de reclamação.** O Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentado por SES → SNS) fixa cada rejeição permanente ou reclamação à igreja cujo email autorizado pela igreja atingiu esse endereço por volta daquele tempo, armazenado como `deliveryMethod` `sesBounce` / `sesComplaint`. Uma igreja é pausada com 2+ reclamações (≥ 0,3% dos envios) ou 10+ rejeições rígidas (≥ 5%) ao longo de 7 dias.

## Agendamento

Tanto o mecanismo de lembrete quanto o resumo de notificação usam timers agendados existentes em vez de introduzir nova infraestrutura:

| Timer | Cronograma | Executa |
|-------|----------|------|
| Timer de 30 minutos | a cada 30 minutos | Escalar notificações não lidas; enviar emails de resumo de frequência `individual`; despachar ocorrências de lembrete devidas (`ReminderEngine.scan`); resumos de aprovação; execuções de automação devidas |
| Timer noturno | 05:00 UTC | Lembretes de frequência de presença de grupo; avanço de serviços de streaming recorrentes; atualizar listas de atualização automática; expandir ocorrências de lembrete para o próximo horizonte (`ReminderEngine.expandAll`); enviar emails de resumo de frequência `daily` |

Localmente, a mesma lógica pode ser acionada sob demanda com `npm run timer:30min` e `npm run timer:midnight` do projeto `Api`.

## Inventário de arquivos

| Área | Arquivos |
|------|-------|
| Funil | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartilhada | `Api/src/shared/helpers/NotificationService.ts` |
| Porta transacional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regra lint `Api/tools/eslint-rules/email-door.cjs` |
| Limites de email da igreja | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Mecanismo de lembrete | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repositórios de lembrete | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email de servir/plano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de lembrete (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor de lembrete / preferências (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas Relacionadas

- [Arquitetura em Tempo Real](../realtime) — o protocolo WebSocket e primitivos do cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) nos quais o nível de entrega in-app é baseado
- [Notificações Web Push](../web-push) — configuração VAPID e o caminho da API Push do navegador usado pelo nível de escalação de push
- [Endpoints de Mensagens](../api/endpoints/messaging) — superfície REST completa para mensagens, conversas, conexões e rotas de notificação/lembrete
