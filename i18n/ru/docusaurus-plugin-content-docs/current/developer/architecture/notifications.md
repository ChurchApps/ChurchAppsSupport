---
title: "Архитектура уведомлений и напоминаний"
---

# Архитектура уведомлений и напоминаний

<div class="article-intro">

Каждое сообщение member church видит outside страница они looking в — badge count push notification digest email — passes через one из two doors в MessagingApi. Эта страница documents funnel reminder engine это feeds это на schedule и preference модель это decides что actually reaches person.

</div>

## Обзор — two doors

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Anything это tells person something** goes через `NotificationHelper.createNotifications()` в messaging модуль. Это persists `notifications` строка и escalates socket → push → email evaluating `PreferenceGateHelper` per channel — включая `in_app` на level 0.
2. **Anything scheduled** это `reminderDefinition` (entity-level или scope-level) expanded в `reminderOccurrences` и dispatched by `ReminderEngine.scan()` на recurring таймер. One expander one dispatcher one send ledger (`reminderSentLog`).
3. **Direct email** exists только behind `TransactionalEmailHelper.sendTransactional()`. ESLint правило enforces это на compile time — see ниже.

:::tip Email дверь это lint-enforced не only convention
`Api/tools/eslint-rules/email-door.cjs` defines `no-direct-email-helper`: любой call к `EmailHelper.sendTemplatedEmail()` или `EmailHelper.sendEmail()` outside `NotificationHelper.ts` или `TransactionalEmailHelper.ts` fails lint. Если вам need отправить email route это через funnel (`createNotifications` с `emailImmediate`) или через `TransactionalEmailHelper.sendTransactional()` — нет third путь это passes CI.
:::

## Notification funnel

`NotificationHelper.createNotifications()` это single entry point для anything это не scheduled или transactional:

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

Для каждого recipient это saves строка в `notifications` и calls `attemptDeliveryWithEscalation` который walks channel ladder ниже. Still-unread строка для same `(contentType, contentId)` suppresses re-creation — этот dedup guard это skipped для `emailImmediate` sends (reminder offsets staff "email all" workflow steps own их собственный dedup) и для direct messages які always ping socket.

`shared/helpers/NotificationService.ts` mirrors same signature (`NotificationServiceOptions`) для callers outside messaging модуль и это registered с messaging модулю на boot.

## Channel escalation цепь

Delivery starts в level (0 by default или higher для reminders/explicit sends) и only proceeds к next channel если previous один didn't succeed. Каждый level это gated by `PreferenceGateHelper` перед anything attempted.

| Level | Channel | Behavior |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app` gate это checked сначала. Если suppressed (muted) строка это persisted с `isNew=false` и delivery stops entire — no socket ping no badge no further escalation. Otherwise сервер looks up open socket connections для person's `alerts` room и pushes `notification` (или `privateMessage`) frame. Для ordinary notifications successful socket delivery stops цепь здесь — 30-minute таймер re-checks unread items и escalates их позже. Direct messages никогда не stop у socket: installed PWA может hold alerts socket open в background что would otherwise suppress OS-level push. |
| 1 | **push** | Gated на `allowPush` / category opt-out / quiet hours. Sends к both Expo push tokens и Web Push subscriptions found на person's `devices` строки deduplicating by endpoint и pruning stale tokens along the way. |
| 2 | **email** | Gated на `emailFrequency` и category opt-out. Immediate sends (`emailImmediate`) render прямо away и write `deliveryLogs` строка; otherwise notification это left pending для batch digest described ниже. |
| — | **sms** | Preference plumbing (`allowSms` per-category channel списки) уже accounts для SMS channel но no producer sends через это today — это stays зарезервировано для bulk SMS продукт які runs как separate siloed flow через `TextingController` / `@churchapps/texting`. |

Unread notifications left на socket или push это escalated by 30-minute таймер (`NotificationHelper.escalateDelivery`). Batch email это sent by `NotificationHelper.sendEmailNotifications(frequency)` driven by каждого person's `emailFrequency` preference: `individual` runs на 30-minute таймер `daily` runs на nightly таймер. (`weekly` это valid preference value але has no dedicated batch run еще.)

## Reminder Engine

Scheduled напоминания — event напоминания task due dates serving/plan assignment напоминания — все это go через one generalized движок rather чем bespoke per-feature cron логика.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- или scope-level          one строка per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitions** (`reminderDefinitions`) это либо entity-level (`entityId` set — specific event task или plan) или scope-level (`entityId` null `scopeId` set — например every plan under serving plan type). Definition carries CSV это minute offsets (`offsets` например `"1440,60"` для one день и one hour перед) local send time (`sendLocalTime`) CSV это channels (`channels` — включая `email` triggers immediate rich email на send time) `recipientMode` и optional custom `message`.

**Expansion** materializes пожарные row для horizon ahead (rolling multi-day window). Это runs на nightly таймер и synchronously whenever definition это saved поэтому напоминание для last-minute event все еще fires. Scope definitions fan out через adapter's `loadScopeEntities` producing one occurrence set per concrete entity; entity-level occurrences использование ключ `definitionId:occurrenceISO:offset` в то время как scoped occurrences namespace by entity id поэтому они никогда не collide. Upserting occurrence **resurrects** previously-cancelled строка — cancel-then-re-expand это standard способ к re-sync напоминание после underlying entity изменения; строки уже `sent` `failed` или `processing` это left untouched.

**Dispatch** (`ReminderEngine.scan()`) runs на 30-minute таймер. Это claims due occurrences (lease prevents double-processing) loads recipients через entity's adapter filters out anyone уже recorded в `reminderSentLog` для этого occurrence и calls `createNotifications` с `deliveryStartLevel: 1` (skip straight к push) плюс `emailImmediate`/`emailByPerson` когда definition's channels включая email.

Internal event шина reacts к entity мутациям без waiting для nightly expansion: content события (через webhook dispatcher) и plan/task update события trigger immediate re-expansion или cancellation для affected entity и plan update также re-expands any scope definitions tied к its plan type.

### Adapters

Movement это entity-agnostic; каждый supported entity тип plugs в через adapter (`helpers/adapters/`):

| Entity тип | Adapter | Примечания |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Recipients scoped к registrants или group members в зависимости от event и `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Recipients это Accepted + Unconfirmed plan assignments. `buildEmails` calls в `DoingModuleGateway.buildPlanReminderEmails` які renders positions notes и custom message через `doing/helpers/PlanReminderEmailHelper` включая Accept/Decline кнопки signed by `ReminderTokenHelper` это post к public assignment-response endpoint. |
| `task` | `TaskReminderAdapter` | Recipients это task's assignee(s). |

### Endpoints

| Method | Path | Цель |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Load или save reminder definition для one entity. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Load или save scope-level (inherited) reminder definition. |
| `DELETE` | `/messaging/reminders/:defId` | Delete definition и cancel its pending occurrences. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Preview recipient count и next fire times для event напоминание перед saving. |
| `GET` | `/messaging/reminders/log` | Recent напоминание occurrence история для church. |
| `POST` | `/messaging/reminders/mute` | Mute напоминания для specific entity. |

Saving definition triggers synchronous re-expansion для это entity или scope поэтому editors видят up-to-date "next fires" без waiting для nightly job.

## Direct messages

Direct messages ride same funnel как everything else rather чем separate escalation путь. Каждый unread conversation gets one **shadow строка** в `notifications` (`contentType='privateMessage'` `contentId` = private message id `category='direct_messages'`) это owns все delivery state — socket/push/email escalation read tracking everything. `privateMessages` таблица самая keeps message payload и `notifyPersonId` column які это source это unread badge и gets cleared когда recipient reads conversation.

Shadow строки это invisible к notifications bell: они excluded из unread count query notification список query и mark-read/delete queries все из които filter `contentType <> 'privateMessage'`. Каждый DM ping hits socket regardless из unread state (live чат semantics — no dedup) и DMs никогда не stop на socket delivery как ordinary напоминания делать since backgrounded PWA может hold socket open у то время как все еще needing OS-level push. Если person mutes DM напоминания shadow строка это parked (`isNew=false` `notifyPersonId` cleared) — все еще visible внутри conversation самого только без badges или alerts.

## Preferences & gating

Каждый send passes через `PreferenceGateHelper.evaluate()` pure функцион (все state passed в no DB calls на hot путь) это returns `allow` `suppress` или `defer`. Layers run в order и first один это decides wins:

1. **Locked категория** — some категории это mandatory (tier 0) и bypass every другой layer.
2. **Master mute / channel kill** — `masterMute` `allowPush` `allowSms` или `emailFrequency='never'` suppress outright.
3. **Quiet hours** — push и SMS only (email это considered non-intrusive). Если current wall-clock time в person's timezone falls в их quiet window transactional категория все еще gets through; non-transactional one это deferred к end из quiet window computed как DST-correct UTC мгновение через `TimezoneHelper.wallClockToUtc`.
4. **Per-category preference override** — explicit opt-out для one категория × channel пара; отсутствие means категория's default.
5. **Per-entity mute** — mute recorded против specific entity (например one event one plan) restricts дальше чем категория-level setting але only applies когда caller supplies entity id/type alongside notification.

Таблицы involved: `notificationPreferences` (global — `masterMute` `emailFrequency` из `individual|daily|weekly|never` `allowPush` quiet-hours window + timezone `allowSms`) `notificationPreferenceOverrides` (per категория × channel) и `notificationEntityMutes` (per entity).

Это gate это enforced для in-app (level 0) push (level 1) и email (level 2) внутри funnel — включая immediate reminder/digest emails. Transactional email (auth коды password resets invites donation receipts) bypasses это by дизайн; это целый point из second дверь.

## Scheduling

Оба reminder движок и notification digest ride существующий scheduled таймеры rather чем introducing new инфраструктура:

| Таймер | Schedule | Runs |
|-------|----------|------|
| 30-minute таймер | every 30 minutes | Escalate unread напоминания; send `individual`-frequency digest emails; dispatch due напоминание occurrences (`ReminderEngine.scan`); одобрение digests; due automation executions |
| Nightly таймер | 05:00 UTC | Group посещаемость напоминания; advance recurring streaming услуги; refresh auto-refresh lists; expand напоминание occurrences для next horizon (`ReminderEngine.expandAll`); send `daily`-frequency digest emails |

Locally same логика может быть triggered на demand с `npm run timer:30min` и `npm run timer:midnight` из `Api` проект.

## File inventory

| Area | Files |
|------|-------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Shared entry | `Api/src/shared/helpers/NotificationService.ts` |
| Transactional door | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint правило `Api/tools/eslint-rules/email-door.cjs` |
| Reminder движок | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Reminder repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving/plan email | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Reminder редакторы (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Reminder редактор / preferences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Связанные страницы

- [Real-time Architecture](../realtime) — WebSocket протокол и client primitives (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) это in-app delivery level rides на
- [Web Push Notifications](../web-push) — VAPID setup и browser Push API путь used by push escalation level
- [Messaging Endpoints](../api/endpoints/messaging) — полный REST поверхность для messages conversations connections и notification/reminder маршруты
