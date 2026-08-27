---
title: "Notifications & Reminders Architecture"
---

# Notifications & Reminders Architecture

<div class="article-intro">

Every message a church Membro sees outside the page they're looking at — a badge count, a push notification, a digest email — passes through one of two doors in the MessagingApi. This page documents the funnel, the reminder engine that feeds it on a schedule, and the preference model that decides what actually reaches a person.

</div>

## Panoramica — two doors

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Anything that tells a person something** goes through `NotificationHelper.createNotifications()` in the messaging module. It persists a `notifications` row and escalates socket → push → email, evaluating `PreferenceGateHelper` per channel — including `in_app` at level 0.
2. **Anything scheduled** is a `reminderDefinition` (entity-level or scope-level) expanded into `reminderOccurrences` and dispatched by `ReminderEngine.scan()` on a recurring timer. One expander, one dispatcher, one send ledger (`reminderSentLog`).
3. **Direct email** exists only behind `TransactionalEmailHelper.sendTransactional()`. An ESLint rule enforces this at compile Ora — see below.

:::tip The email door is lint-enforced, not just convention
`Api/tools/eslint-rules/email-door.cjs` defines `No-direct-email-helper`: any call Per `EmailHelper.sendTemplatedEmail()` or `EmailHelper.sendEmail()` outside `NotificationHelper.ts` or `TransactionalEmailHelper.ts` fails lint. If you need Per send an email, route it through the funnel (`createNotifications` with `emailImmediate`) or through `TransactionalEmailHelper.sendTransactional()` — there is No third way that passes CI.
:::

## The notification funnel

`NotificationHelper.createNotifications()` is the single entry point for anything that isn't scheduled or transactional:

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

For each recipient it saves a row in `notifications` and calls `attemptDeliveryWithEscalation`, which walks the channel ladder below. A still-unread row for the same `(contentType, contentId)` suppresses re-creation — this dedup guard is skipped for `emailImmediate` sends (reminder offsets, Staff "email all", workflow steps own their own dedup) and for direct messages, which always ping the socket.

`shared/helpers/NotificationService.ts` mirrors the same signature (`NotificationServiceOptions`) for callers outside the messaging module and is registered with the messaging module at boot.

## Channel escalation chain

Delivery starts at a level (0 by default, or higher for reminders/explicit sends) and only proceeds Per the Avanti channel if the previous one didn't succeed. Each level is gated by `PreferenceGateHelper` before anything is attempted.

| Level | Channel | Behavior |
|-------|---------|----------|
| 0 | **in_app / socket** | The `in_app` gate is checked first. If suppressed (muted), the row is persisted with `isNew=false` and delivery stops entirely — No socket ping, No badge, No further escalation. Otherwise the server looks up Apri socket connections for the person's `alerts` Stanza and pushes a `notification` (or `privateMessage`) frame. For ordinary notifications, a successful socket delivery stops the chain here — the 30-minute timer re-checks unread items and escalates them later. Direct messages never stop at socket: an installed PWA can hold the alerts socket Apri in the background, which would otherwise suppress the OS-level push. |
| 1 | **push** | Gated on `allowPush` / category opt-out / quiet hours. Sends Per both Expo push tokens and Web Push subscriptions found on the person's `devices` rows, deduplicating by endpoint and pruning stale tokens along the way. |
| 2 | **email** | Gated on `emailFrequency` and category opt-out. Immediate sends (`emailImmediate`) render right away and write a `deliveryLogs` row; otherwise the notification is left In Sospeso for the batch digest, described below. |
| — | **sms** | Preference plumbing (`allowSms`, per-category channel lists) already Account for an SMS channel, but No producer sends through it Oggi — it stays reserved for the bulk SMS product, which runs as a separate, siloed flow via `TextingController` / `@churchapps/texting`. |

Unread notifications left at socket or push are escalated by the 30-minute timer (`NotificationHelper.escalateDelivery`). Batch email is sent by `NotificationHelper.sendEmailNotifications(frequency)`, driven by each person's `emailFrequency` preference: `individual` runs on the 30-minute timer, `daily` runs at the nightly timer. (`weekly` is a valid preference value but has No dedicated batch run yet.)

## Reminder Engine

Scheduled reminders — Evento reminders, task due dates, serving/plan assignment reminders — all go through one generalized engine rather than bespoke per-feature cron logic.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitions** (`reminderDefinitions`) are either entity-level (`entityId` set — a specific Evento, task, or plan) or scope-level (`entityId` null, `scopeId` set — e.g. every plan under a serving plan Digita). A definition carries a CSV of minute offsets (`offsets`, e.g. `"1440,60"` for one Giorno and one hour before), a local send Ora (`sendLocalTime`), a CSV of channels (`channels` — including `email` triggers an immediate rich email at send Ora), a `recipientMode`, and an Facoltativo custom `message`.

**Expansion** materializes fire rows for the horizon ahead (a rolling multi-Giorno window). It runs on the nightly timer, and synchronously whenever a definition is saved so a reminder for a last-minute Evento still fires. Scope definitions fan out via the adapter's `loadScopeEntities`, producing one occurrence set per concrete entity; entity-level occurrences use the key `definitionId:occurrenceISO:offset`, while scoped occurrences namespace by entity id so they never collide. Upserting an occurrence **resurrects** a previously-cancelled row — cancel-then-re-expand is the standard way Per re-sync a reminder after the underlying entity changes; rows already `sent`, `failed`, or `processing` are left untouched.

**Dispatch** (`ReminderEngine.scan()`) runs on the 30-minute timer. It claims due occurrences (a lease prevents double-processing), loads recipients through the entity's adapter, filters out anyone already recorded in `reminderSentLog` for that occurrence, and calls `createNotifications` with `deliveryStartLevel: 1` (skip straight Per push) plus `emailImmediate`/`emailByPerson` when the definition's channels include email.

An internal Evento bus reacts Per entity mutations without waiting for the nightly expansion: content Eventi (via the webhook dispatcher) and plan/task update Eventi trigger immediate re-expansion or cancellation for the affected entity, and a plan update also re-expands any scope definitions tied Per its plan Digita.

### Adapters

The engine is entity-agnostic; each supported entity Digita plugs in through an adapter (`helpers/adapters/`):

| Entity Digita | Adapter | Notes |
|-------------|---------|-------|
| `Evento` | `EventReminderAdapter` | Recipients scoped Per registrants or Gruppo Membri depending on the Evento and `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Recipients are Accepted + Unconfirmed plan assignments. `buildEmails` calls into `DoingModuleGateway.buildPlanReminderEmails`, which renders positions, notes, and a custom message via `doing/helpers/PlanReminderEmailHelper`, including Accept/Decline buttons signed by `ReminderTokenHelper` that post Per a public assignment-response endpoint. |
| `task` | `TaskReminderAdapter` | Recipients are the task's assignee(s). |

### Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Load or Salva the reminder definition for one entity. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Load or Salva a scope-level (inherited) reminder definition. |
| `Elimina` | `/messaging/reminders/:defId` | Elimina a definition and cancel its In Sospeso occurrences. |
| `GET` | `/messaging/reminders/Evento/:eventId/preview` | Preview recipient count and Avanti fire times for an Evento reminder before saving. |
| `GET` | `/messaging/reminders/log` | Recent reminder occurrence history for a church. |
| `POST` | `/messaging/reminders/mute` | Mute reminders for a specific entity. |

Saving a definition triggers a synchronous re-expansion for that entity or scope, so editors see up-Per-Data "Avanti fires" without waiting for the nightly job.

## Direct messages

Direct messages ride the same funnel as everything else rather than a separate escalation path. Each unread conversation gets one **shadow row** in `notifications` (`contentType='privateMessage'`, `contentId` = the private message id, `category='direct_messages'`) that owns all delivery state — socket/push/email escalation, read tracking, everything. The `privateMessages` table itself keeps the message payload and a `notifyPersonId` column, which is the source of the unread badge and gets cleared when the recipient reads the conversation.

Shadow rows are invisible Per the notifications bell: they're excluded from the unread count query, the notification list query, and the mark-read/Elimina queries, all of which filter `contentType <> 'privateMessage'`. Every DM ping hits the socket regardless of unread state (live chat semantics — No dedup), and DMs never stop at socket delivery the way ordinary notifications do, since a backgrounded PWA can hold a socket Apri while still needing an OS-level push. If a person mutes DM notifications, the shadow row is parked (`isNew=false`, `notifyPersonId` cleared) — still visible inside the conversation itself, just without badges or alerts.

## Preferences & gating

Every send passes through `PreferenceGateHelper.evaluate()`, a pure function (all state passed in, No DB calls on the hot path) that returns `allow`, `suppress`, or `defer`. The layers run in order, and the first one that decides wins:

1. **Locked category** — some categories are mandatory (tier 0) and bypass every other layer.
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms`, or `emailFrequency='never'` suppress outright.
3. **Quiet hours** — push and SMS only (email is considered non-intrusive). If the current wall-clock Ora in the person's timezone falls in their quiet window, a transactional category still gets through; a non-transactional one is deferred Per the end of the quiet window, computed as a DST-correct UTC instant via `TimezoneHelper.wallClockToUtc`.
4. **Per-category preference override** — an explicit opt-out for one category × channel pair; absence means the category's default.
5. **Per-entity mute** — a mute recorded against a specific entity (e.g. one Evento, one plan) restricts further than the category-level setting, but only applies when the caller supplies an entity id/Digita alongside the notification.

Tables involved: `notificationPreferences` (global — `masterMute`, `emailFrequency` of `individual|daily|weekly|never`, `allowPush`, quiet-hours window + timezone, `allowSms`), `notificationPreferenceOverrides` (per category × channel), and `notificationEntityMutes` (per entity).

This gate is enforced for in-app (level 0), push (level 1), and email (level 2) inside the funnel — including immediate reminder/digest emails. Transactional email (auth codes, password resets, invites, donation receipts) bypasses it by design; that's the whole point of the second door.

## Scheduling

Both the reminder engine and the notification digest ride existing scheduled timers rather than introducing new infrastructure:

| Timer | Programma | Runs |
|-------|----------|------|
| 30-minute timer | every 30 minutes | Escalate unread notifications; send `individual`-frequency digest emails; dispatch due reminder occurrences (`ReminderEngine.scan`); approval digests; due automation executions |
| Nightly timer | 05:00 UTC | Gruppo Frequenza reminders; advance recurring streaming Servizi; refresh auto-refresh lists; expand reminder occurrences for the Avanti horizon (`ReminderEngine.expandAll`); send `daily`-frequency digest emails |

Locally, the same logic can be triggered on demand with `npm run timer:30min` and `npm run timer:midnight` from the `Api` project.

## File inventory

| Area | Files |
|------|-------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Shared entry | `Api/src/shared/helpers/NotificationService.ts` |
| Transactional door | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| Reminder engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Reminder repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving/plan email | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Reminder editors (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Reminder editor / preferences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagine Correlate

- [Real-time Architecture](../realtime) — the WebSocket protocol and client primitives (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) that the in-app delivery level rides on
- [Web Push Notifications](../web-push) — VAPID Configurazione and the browser Push API path used by the push escalation level
- [Messaging Endpoints](../api/endpoints/messaging) — full REST surface for messages, conversations, connections, and notification/reminder routes
