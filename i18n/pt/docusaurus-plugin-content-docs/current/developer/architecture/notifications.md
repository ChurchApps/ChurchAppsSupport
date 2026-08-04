---
title: "Arquitetura de Notificações e Lembretes"
---

# Arquitetura de Notificações e Lembretes

<div class="article-intro">

Toda mensagem que um membro da igreja vê fora da página que está olhando — uma contagem de badge, uma notificação push, um e-mail de resumo — passa por uma de duas portas na MessagingApi. Esta página documenta o funil, o mecanismo de lembretes que o alimenta em um cronograma, e o modelo de preferências que decide o que realmente chega até uma pessoa.

</div>

## Visão Geral — duas portas

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Qualquer coisa que diga algo a uma pessoa** passa por `NotificationHelper.createNotifications()` no módulo de mensagens. Persiste uma linha em `notifications` e escala socket → push → e-mail, avaliando `PreferenceGateHelper` por canal — incluindo `in_app` no nível 0.
2. **Qualquer coisa agendada** é uma `reminderDefinition` (no nível de entidade ou de escopo) expandida em `reminderOccurrences` e despachada por `ReminderEngine.scan()` em um temporizador recorrente. Um expansor, um despachante, um livro-razão de envios (`reminderSentLog`).
3. **E-mail direto** existe apenas atrás de `TransactionalEmailHelper.sendTransactional()`. Uma regra do ESLint reforça isso em tempo de compilação — veja abaixo.

:::tip A porta do e-mail é reforçada por lint, não apenas por convenção
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: qualquer chamada a `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` fora de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` falha no lint. Se você precisa enviar um e-mail, encaminhe-o pelo funil (`createNotifications` com `emailImmediate`) ou por `TransactionalEmailHelper.sendTransactional()` — não existe uma terceira forma que passe no CI.
:::

## O funil de notificações

`NotificationHelper.createNotifications()` é o único ponto de entrada para qualquer coisa que não seja agendada nem transacional:

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

Para cada destinatário, salva uma linha em `notifications` e chama `attemptDeliveryWithEscalation`, que percorre a escada de canais abaixo. Uma linha ainda não lida para o mesmo `(contentType, contentId)` suprime a recriação — essa proteção contra duplicação é ignorada para envios `emailImmediate` (compensações de lembrete, "enviar e-mail para todos" da equipe, e etapas de fluxo de trabalho têm sua própria deduplicação) e para mensagens diretas, que sempre disparam o socket.

`shared/helpers/NotificationService.ts` espelha a mesma assinatura (`NotificationServiceOptions`) para quem chama fora do módulo de mensagens, e é registrado junto ao módulo de mensagens na inicialização.

## Cadeia de escalonamento de canal

A entrega começa em um nível (0 por padrão, ou mais alto para lembretes/envios explícitos) e só avança para o próximo canal se o anterior não tiver sucesso. Cada nível é controlado por `PreferenceGateHelper` antes de qualquer tentativa.

| Nível | Canal | Comportamento |
|-------|---------|----------|
| 0 | **in_app / socket** | O portão `in_app` é verificado primeiro. Se suprimido (silenciado), a linha é persistida com `isNew=false` e a entrega para completamente — sem ping de socket, sem badge, sem escalonamento adicional. Caso contrário, o servidor procura conexões de socket abertas na sala `alerts` da pessoa e envia um frame `notification` (ou `privateMessage`). Para notificações comuns, uma entrega de socket bem-sucedida encerra a cadeia aqui — o temporizador de 30 minutos reverifica itens não lidos e os escala mais tarde. Mensagens diretas nunca param no socket: um PWA instalado pode manter o socket de alertas aberto em segundo plano, o que de outra forma suprimiria o push no nível do sistema operacional. |
| 1 | **push** | Controlado por `allowPush` / opt-out de categoria / horário silencioso. Envia tanto para tokens de push Expo quanto para assinaturas Web Push encontradas nas linhas `devices` da pessoa, deduplicando por endpoint e removendo tokens obsoletos ao longo do caminho. |
| 2 | **e-mail** | Controlado por `emailFrequency` e opt-out de categoria. Envios imediatos (`emailImmediate`) são renderizados na hora e gravam uma linha em `deliveryLogs`; caso contrário, a notificação fica pendente para o resumo em lote, descrito abaixo. |
| — | **sms** | O encanamento de preferências (`allowSms`, listas de canal por categoria) já leva em conta um canal SMS, mas nenhum produtor envia por ele hoje — permanece reservado para o produto de SMS em massa, que roda como um fluxo separado e isolado via `TextingController` / `@churchapps/texting`. |

Notificações não lidas que ficaram no socket ou no push são escaladas pelo temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). O e-mail em lote é enviado por `NotificationHelper.sendEmailNotifications(frequency)`, acionado pela preferência `emailFrequency` de cada pessoa: `individual` roda no temporizador de 30 minutos, `daily` roda no temporizador noturno. (`weekly` é um valor de preferência válido, mas ainda não tem uma execução em lote dedicada.)

## Mecanismo de Lembretes

Lembretes agendados — lembretes de evento, prazos de tarefa, lembretes de atribuição de serviço/plano — passam todos por um único mecanismo generalizado em vez de lógica cron sob medida por recurso.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definições** (`reminderDefinitions`) são de nível de entidade (`entityId` definido — um evento, tarefa ou plano específico) ou de nível de escopo (`entityId` nulo, `scopeId` definido — por exemplo, todo plano sob um tipo de plano de serviço). Uma definição carrega um CSV de compensações em minutos (`offsets`, ex.: `"1440,60"` para um dia e uma hora antes), um horário de envio local (`sendLocalTime`), um CSV de canais (`channels` — incluir `email` dispara um e-mail rico imediato no momento do envio), um `recipientMode`, e uma mensagem personalizada opcional (`message`).

**A expansão** materializa linhas de disparo para o horizonte à frente (uma janela móvel de vários dias). Roda no temporizador noturno, e de forma síncrona sempre que uma definição é salva, para que um lembrete de um evento de última hora ainda dispare. Definições de escopo se expandem via `loadScopeEntities` do adaptador, produzindo um conjunto de ocorrências por entidade concreta; ocorrências de nível de entidade usam a chave `definitionId:occurrenceISO:offset`, enquanto ocorrências de escopo são organizadas por id de entidade para nunca colidirem. Fazer upsert de uma ocorrência **ressuscita** uma linha previamente cancelada — cancelar e depois reexpandir é a forma padrão de ressincronizar um lembrete após a mudança da entidade subjacente; linhas já `sent`, `failed` ou `processing` permanecem intocadas.

**O despacho** (`ReminderEngine.scan()`) roda no temporizador de 30 minutos. Ele reivindica ocorrências vencidas (um arrendamento evita processamento duplicado), carrega destinatários através do adaptador da entidade, filtra qualquer um já registrado em `reminderSentLog` para essa ocorrência, e chama `createNotifications` com `deliveryStartLevel: 1` (pula direto para push) mais `emailImmediate`/`emailByPerson` quando os canais da definição incluem e-mail.

Um barramento de eventos interno reage a mutações de entidade sem esperar pela expansão noturna: eventos de conteúdo (via o despachante de webhooks) e eventos de atualização de plano/tarefa disparam reexpansão ou cancelamento imediato para a entidade afetada, e uma atualização de plano também reexpande qualquer definição de escopo vinculada ao seu tipo de plano.

### Adaptadores

O mecanismo é agnóstico quanto à entidade; cada tipo de entidade suportado se conecta através de um adaptador (`helpers/adapters/`):

| Tipo de entidade | Adaptador | Notas |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatários com escopo em inscritos ou membros do grupo, dependendo do evento e do `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Destinatários são as atribuições de plano Aceitas + Não Confirmadas. `buildEmails` chama `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posições, notas e uma mensagem personalizada via `doing/helpers/PlanReminderEmailHelper`, incluindo botões Aceitar/Recusar assinados por `ReminderTokenHelper` que publicam em um ponto de extremidade público de resposta de atribuição. |
| `task` | `TaskReminderAdapter` | Destinatários são o(s) responsável(is) da tarefa. |

### Pontos de Extremidade

| Método | Caminho | Propósito |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carregar ou salvar a definição de lembrete de uma entidade. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carregar ou salvar uma definição de lembrete de nível de escopo (herdada). |
| `DELETE` | `/messaging/reminders/:defId` | Excluir uma definição e cancelar suas ocorrências pendentes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Pré-visualizar a contagem de destinatários e os próximos horários de disparo de um lembrete de evento antes de salvar. |
| `GET` | `/messaging/reminders/log` | Histórico recente de ocorrências de lembrete de uma igreja. |
| `POST` | `/messaging/reminders/mute` | Silenciar lembretes de uma entidade específica. |

Salvar uma definição dispara uma reexpansão síncrona para aquela entidade ou escopo, então os editores veem "próximos disparos" atualizados sem esperar pelo trabalho noturno.

## Mensagens diretas

Mensagens diretas seguem pelo mesmo funil que tudo o mais, em vez de um caminho de escalonamento separado. Cada conversa não lida ganha uma **linha-sombra** em `notifications` (`contentType='privateMessage'`, `contentId` = o id da mensagem privada, `category='direct_messages'`) que possui todo o estado de entrega — escalonamento socket/push/e-mail, rastreamento de leitura, tudo. A própria tabela `privateMessages` mantém o conteúdo da mensagem e uma coluna `notifyPersonId`, que é a fonte do badge de não lido e é limpa quando o destinatário lê a conversa.

Linhas-sombra são invisíveis para o sino de notificações: são excluídas da consulta de contagem de não lidos, da consulta de lista de notificações e das consultas de marcar-como-lido/excluir, todas as quais filtram `contentType <> 'privateMessage'`. Todo ping de DM atinge o socket independentemente do estado de leitura (semântica de chat ao vivo — sem deduplicação), e DMs nunca param na entrega por socket como as notificações comuns fazem, já que um PWA em segundo plano pode manter um socket aberto e ainda assim precisar de um push no nível do sistema operacional. Se uma pessoa silencia notificações de DM, a linha-sombra fica estacionada (`isNew=false`, `notifyPersonId` limpo) — ainda visível dentro da própria conversa, apenas sem badges ou alertas.

## Preferências e controle de acesso

Todo envio passa por `PreferenceGateHelper.evaluate()`, uma função pura (todo o estado é passado como parâmetro, sem chamadas ao banco no caminho crítico) que retorna `allow`, `suppress` ou `defer`. As camadas rodam em ordem, e a primeira que decidir vence:

1. **Categoria bloqueada** — algumas categorias são obrigatórias (nível 0) e ignoram todas as outras camadas.
2. **Silenciar tudo / desligar canal** — `masterMute`, `allowPush`, `allowSms` ou `emailFrequency='never'` suprimem completamente.
3. **Horário silencioso** — apenas push e SMS (o e-mail é considerado não intrusivo). Se a hora atual no fuso horário da pessoa cair dentro de sua janela silenciosa, uma categoria transacional ainda passa; uma não transacional é adiada até o fim da janela silenciosa, calculada como um instante UTC correto para horário de verão via `TimezoneHelper.wallClockToUtc`.
4. **Substituição de preferência por categoria** — um opt-out explícito para um par categoria × canal; a ausência significa o padrão da categoria.
5. **Silenciamento por entidade** — um silenciamento registrado contra uma entidade específica (por exemplo, um evento, um plano) restringe além da configuração no nível da categoria, mas só se aplica quando quem chama fornece um id/tipo de entidade junto com a notificação.

Tabelas envolvidas: `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, janela de horário silencioso + fuso horário, `allowSms`), `notificationPreferenceOverrides` (por categoria × canal), e `notificationEntityMutes` (por entidade).

Esse controle é aplicado para in-app (nível 0), push (nível 1) e e-mail (nível 2) dentro do funil — incluindo e-mails imediatos de lembrete/resumo. O e-mail transacional (códigos de autenticação, redefinições de senha, convites, recibos de doação) o ignora por design; esse é todo o propósito da segunda porta.

## Agendamento

Tanto o mecanismo de lembretes quanto o resumo de notificações usam temporizadores agendados já existentes, em vez de introduzir nova infraestrutura:

| Temporizador | Cronograma | Executa |
|-------|----------|------|
| Temporizador de 30 minutos | a cada 30 minutos | Escalar notificações não lidas; enviar e-mails de resumo com frequência `individual`; despachar ocorrências de lembrete vencidas (`ReminderEngine.scan`); resumos de aprovação; execuções de automação vencidas |
| Temporizador noturno | 05:00 UTC | Lembretes de presença em grupo; avançar serviços de streaming recorrentes; atualizar listas de autoatualização; expandir ocorrências de lembrete para o próximo horizonte (`ReminderEngine.expandAll`); enviar e-mails de resumo com frequência `daily` |

Localmente, a mesma lógica pode ser acionada sob demanda com `npm run timer:30min` e `npm run timer:midnight` a partir do projeto `Api`.

## Inventário de Arquivos

| Área | Arquivos |
|------|-------|
| Funil | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada Compartilhada | `Api/src/shared/helpers/NotificationService.ts` |
| Porta Transacional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regra de lint `Api/tools/eslint-rules/email-door.cjs` |
| Mecanismo de Lembretes | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repositórios de Lembrete | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-mail de Serviço/Plano | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de Lembrete (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor de Lembrete / Preferências (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas Relacionadas

- [Arquitetura em Tempo Real](../realtime) — o protocolo WebSocket e os primitivos de cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sobre os quais roda o nível de entrega no aplicativo
- [Notificações de Push da Web](../web-push) — a configuração do VAPID e o caminho da API Push do navegador usado pelo nível de escalonamento de push
- [Pontos de Extremidade de Mensagens](../api/endpoints/messaging) — superfície REST completa para mensagens, conversas, conexões e rotas de notificação/lembrete
