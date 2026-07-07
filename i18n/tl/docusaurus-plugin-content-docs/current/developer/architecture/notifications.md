---
title: "Notifications & Reminders Architecture"
---

# Notifications & Reminders Architecture

<div class="article-intro">

Bawat mensahe na makikita ng miyembro ng simbahan sa labas ng pahinang tinatingin nila — isang badge count, isang push notification, isang digest email — ay dumadaan sa isa sa dalawang pintuan sa MessagingApi. Ang pahinang ito ay nag-document ng funnel, ang reminder engine na nagpapakain dito sa isang schedule, at ang preference model na nagdedesisyon kung ano ang tunay na umaabot sa isang tao.

</div>

## Pangkalahatang-ideya — dalawang pintuan

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Kahit ano na nagsasabi ng something sa isang tao** ay napupunta sa `NotificationHelper.createNotifications()` sa messaging module. Ito ay nag-persist ng `notifications` row at nag-escalate socket → push → email, sinusuri ang `PreferenceGateHelper` bawat channel — kasama ang `in_app` sa level 0.
2. **Kahit ano na scheduled** ay isang `reminderDefinition` (entity-level o scope-level) na pinalakas sa `reminderOccurrences` at napadala ng `ReminderEngine.scan()` sa recurring timer. Isang expander, isang dispatcher, isang send ledger (`reminderSentLog`).
3. **Direct email** ay umiiral lamang sa likod ng `TransactionalEmailHelper.sendTransactional()`. Ang ESLint rule ay nag-enforce nito sa compile time — tingnan sa ibaba.

:::tip Ang email door ay lint-enforced, hindi lamang convention
Ang `Api/tools/eslint-rules/email-door.cjs` ay nagde-define ng `no-direct-email-helper`: anumang tawag sa `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` sa labas ng `NotificationHelper.ts` o `TransactionalEmailHelper.ts` ay nabibigo ng lint. Kung kailangan mong magpadala ng email, i-route ito sa pamamagit ng funnel (`createNotifications` na may `emailImmediate`) o sa pamamagit ng `TransactionalEmailHelper.sendTransactional()` — walang ikatlong daan na dumadaan sa CI.
:::

## Ang notification funnel

Ang `NotificationHelper.createNotifications()` ay ang iisang entry point para sa kahit ano na hindi scheduled o transactional:

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

Para sa bawat recipient ito ay nagsave ng row sa `notifications` at tumatawag sa `attemptDeliveryWithEscalation`, na naglalakad ng channel ladder sa ibaba. Isang still-unread row para sa parehong `(contentType, contentId)` ay nagsupres ng re-creation — ang dedup guard na ito ay na-skip para sa `emailImmediate` sends (reminder offsets, staff "email all", workflow steps ay may sariling dedup) at para sa direct messages, na laging nag-ping sa socket.

Ang `shared/helpers/NotificationService.ts` ay sumasalamin sa parehong signature (`NotificationServiceOptions`) para sa mga caller sa labas ng messaging module at ay naka-register sa messaging module sa boot.

## Channel escalation chain

Ang delivery ay nagsisimula sa isang level (0 bilang default, o mas mataas para sa reminders/explicit sends) at nagpapatuloy lamang sa susunod na channel kung ang dating isa ay hindi nagtagumpay. Bawat level ay gated ng `PreferenceGateHelper` bago kahit ano ay sinusubukan.

| Level | Channel | Behavior |
|-------|---------|----------|
| 0 | **in_app / socket** | Ang `in_app` gate ay sinusuri muna. Kung suppressed (muted), ang row ay persisted na may `isNew=false` at delivery ay tumitigil nang buo — walang socket ping, walang badge, walang karagdagang escalation. Kung hindi ang server ay tumitingin ng bukas na socket connections para sa person's `alerts` room at nag-push ng `notification` (o `privateMessage`) frame. Para sa ordinary notifications, ang matagumpay na socket delivery ay tumitigil dito — ang 30-minute timer ay muling nag-check ng unread items at nag-escalate sila mamaya. Ang direct messages ay hindi kailanman tumitigil sa socket: isang installed PWA ay maaaring panatilihing bukas ang alerts socket sa background, na kung hindi ay magsupres ng OS-level push. |
| 1 | **push** | Gated sa `allowPush` / category opt-out / quiet hours. Nagpadala sa Expo push tokens at Web Push subscriptions na nahanap sa person's `devices` rows, nag-dedup ng endpoint at nag-prune ng stale tokens sa daan. |
| 2 | **email** | Gated sa `emailFrequency` at category opt-out. Ang immediate sends (`emailImmediate`) ay nag-render kaagad at nagsusulat ng `deliveryLogs` row; kung hindi ang notification ay naiwan na naghihintay para sa batch digest, na inilarawan sa ibaba. |
| — | **sms** | Ang preference plumbing (`allowSms`, per-category channel lists) ay nag-account na para sa SMS channel, ngunit walang producer ang nagpadala dito ngayon — ito ay nanatiling reserved para sa bulk SMS product, na tumatakbo bilang hiwalay, siloed flow sa pamamagit ng `TextingController` / `@churchapps/texting`. |

Ang unread notifications na naiwan sa socket o push ay nag-escalate ng 30-minute timer (`NotificationHelper.escalateDelivery`). Ang batch email ay ipinadala ng `NotificationHelper.sendEmailNotifications(frequency)`, hinimok ng bawat person's `emailFrequency` preference: `individual` ay tumatakbo sa 30-minute timer, `daily` ay tumatakbo sa nightly timer. (Ang `weekly` ay isang valid preference value ngunit walang dedicated batch run pa.)

## Reminder Engine

Ang scheduled reminders — event reminders, task due dates, serving/plan assignment reminders — ay lahat ay napupunta sa isang generalized engine sa halip na bespoke per-feature cron logic.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- o scope-level          isang row bawat (definition,          deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

Ang **Definitions** (`reminderDefinitions`) ay alinman entity-level (`entityId` set — isang specific event, task, o plan) o scope-level (`entityId` null, `scopeId` set — e.g. bawat plan sa ilalim ng serving plan type). Isang definition ay may CSV ng minute offsets (`offsets`, e.g. `"1440,60"` para sa isang araw at isang oras bago), isang local send time (`sendLocalTime`), isang CSV ng channels (`channels` — kasama ang `email` triggers isang immediate rich email sa send time), isang `recipientMode`, at isang optional custom `message`.

Ang **Expansion** ay nagmamaterialize ng fire rows para sa horizon na nauna (isang rolling multi-day window). Ito ay tumatakbo sa nightly timer, at synchronously kapag ang definition ay nalusog upang isang reminder para sa last-minute event ay sumusunog pa rin. Ang scope definitions ay fan out sa pamamagit ng adapter's `loadScopeEntities`, na gumagawa ng isang occurrence set bawat concrete entity; ang entity-level occurrences ay gumagamit ng key `definitionId:occurrenceISO:offset`, habang ang scoped occurrences ay namespace ng entity id kaya sila ay hindi kailanman tumagos. Ang upsertingocurrence ay **nagsasawa** ng dating-cancelled row — cancel-then-re-expand ay ang standard na paraan upang mag-re-sync ng reminder pagkatapos ng underlying entity ay nagbabago; ang mga rows na naka-`sent`, `failed`, o `processing` ay naiwan na walang putol.

Ang **Dispatch** (`ReminderEngine.scan()`) ay tumatakbo sa 30-minute timer. Ito ay nag-claim ng due occurrences (isang lease ay pumipigil ng double-processing), nag-load ng recipients sa pamamagit ng entity's adapter, nag-filter out ng sinuman na naka-record na sa `reminderSentLog` para sa occurrence na iyon, at tumatawag sa `createNotifications` na may `deliveryStartLevel: 1` (skip straight sa push) kasama ang `emailImmediate`/`emailByPerson` kapag ang definition's channels ay kasama ang email.

Ang internal event bus ay tumutugon sa entity mutations nang hindi naghihintay para sa nightly expansion: ang content events (sa pamamagit ng webhook dispatcher) at plan/task update events ay nag-trigger ng immediate re-expansion o cancellation para sa affected entity, at isang plan update ay muling nag-expand ng anumang scope definitions na nakadikit sa plan type nito.

### Adapters

Ang engine ay entity-agnostic; bawat supported entity type ay nag-plug sa pamamagit ng adapter (`helpers/adapters/`):

| Entity type | Adapter | Mga Tala |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Ang mga recipients ay naka-scope sa registrants o group members depende sa event at `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Ang mga recipients ay Accepted + Unconfirmed plan assignments. Ang `buildEmails` ay tumatawag sa `DoingModuleGateway.buildPlanReminderEmails`, na nag-render ng positions, notes, at custom message sa pamamagit ng `doing/helpers/PlanReminderEmailHelper`, kasama ang Accept/Decline buttons na naka-sign ng `ReminderTokenHelper` na nagpadala sa public assignment-response endpoint. |
| `task` | `TaskReminderAdapter` | Ang mga recipients ay ang task's assignee(s). |

### Endpoints

| Method | Path | Layunin |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | I-load o i-save ang reminder definition para sa isang entity. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | I-load o i-save isang scope-level (inherited) reminder definition. |
| `DELETE` | `/messaging/reminders/:defId` | Tanggalin ang definition at kanselahin ang pending occurrences nito. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | I-preview ang recipient count at next fire times para sa event reminder bago i-save. |
| `GET` | `/messaging/reminders/log` | Kamakailangang reminder occurrence history para sa simbahan. |
| `POST` | `/messaging/reminders/mute` | I-mute ang mga reminder para sa specific entity. |

Ang pag-save ng definition ay nag-trigger ng synchronous re-expansion para sa entity o scope, kaya ang editors ay nakakakita ng up-to-date "next fires" nang hindi naghihintay para sa nightly job.

## Direct messages

Ang mga direct message ay sumakay sa parehong funnel tulad ng lahat maliban sa hiwalay na escalation path. Bawat unread conversation ay nakakakuha ng isa **shadow row** sa `notifications` (`contentType='privateMessage'`, `contentId` = ang private message id, `category='direct_messages'`) na nagmamay-ari ng lahat ng delivery state — socket/push/email escalation, read tracking, lahat. Ang `privateMessages` table mismo ay nag-keep ng message payload at isang `notifyPersonId` column, na ang source ng unread badge at nakakakuha ng cleared kapag ang recipient ay nagbasa ng conversation.

Ang shadow rows ay invisible sa notifications bell: sila ay na-exclude mula sa unread count query, ang notification list query, at ang mark-read/delete queries, na lahat ay nag-filter `contentType <> 'privateMessage'`. Bawat DM ping ay tumama sa socket anuman ang unread state (live chat semantics — walang dedup), at ang mga DM ay hindi kailanman tumitigil sa socket delivery sa paraan ng ordinary notifications, dahil ang backgrounded PWA ay maaaring panatilihing bukas ang socket habang nangangailangan pa ng OS-level push. Kung isang tao ay nag-mute ng DM notifications, ang shadow row ay nakapark (`isNew=false`, `notifyPersonId` cleared) — nananatiling visible sa loob ng conversation mismo, lamang nang walang badges o alerts.

## Preferences & gating

Bawat send ay dumadaan sa `PreferenceGateHelper.evaluate()`, isang pure function (lahat ng state na ipinasa sa loob, walang DB calls sa hot path) na nagbabalik ng `allow`, `suppress`, o `defer`. Ang mga layers ay tumatakbo sa order, at ang una na nag-decide ay nananalo:

1. **Locked category** — ang ilang mga kategorya ay mandatory (tier 0) at lumalampas sa bawat iba pang layer.
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` ay nagsupres nang buong araw.
3. **Quiet hours** — push at SMS lamang (ang email ay itinuturing na non-intrusive). Kung ang kasalukuyang wall-clock time sa person's timezone ay nahuhulog sa kanilang quiet window, isang transactional category ay umabot pa; isang non-transactional one ay deferred hanggang sa pagtatapos ng quiet window, na kinokomputa bilang isang DST-correct UTC instant sa pamamagit ng `TimezoneHelper.wallClockToUtc`.
4. **Per-category preference override** — isang explicit opt-out para sa isa category × channel pair; ang absence ay nangangahulugan ng category's default.
5. **Per-entity mute** — isang mute na naka-record laban sa specific entity (e.g. isa event, isang plan) ay nagrerestrikta pa kaysa sa category-level setting, ngunit nag-apply lamang kapag ang caller ay nagbibigay ng entity id/type kasama ang notification.

Ang mga talahanayan na involved: `notificationPreferences` (global — `masterMute`, `emailFrequency` ng `individual|daily|weekly|never`, `allowPush`, quiet-hours window + timezone, `allowSms`), `notificationPreferenceOverrides` (per category × channel), at `notificationEntityMutes` (per entity).

Ang gate na ito ay ipinapahigpit para sa in-app (level 0), push (level 1), at email (level 2) sa loob ng funnel — kasama ang immediate reminder/digest emails. Ang transactional email (auth codes, password resets, invites, donation receipts) ay lumalampas dito sa design; iyon ang buong punto ng pangalawang pintuan.

## Scheduling

Parehong ang reminder engine at ang notification digest ay sumasagot sa existing scheduled timers sa halip na magpakilala ng bagong infrastructure:

| Timer | Schedule | Tumatakbo |
|-------|----------|------|
| 30-minute timer | bawat 30 minuto | Escalate unread notifications; magpadala ng `individual`-frequency digest emails; dispatch due reminder occurrences (`ReminderEngine.scan`); approval digests; due automation executions |
| Nightly timer | 05:00 UTC | Group attendance reminders; advance recurring streaming services; refresh auto-refresh lists; expand reminder occurrences para sa next horizon (`ReminderEngine.expandAll`); magpadala ng `daily`-frequency digest emails |

Locally, ang parehong logic ay maaaring i-trigger on demand na may `npm run timer:30min` at `npm run timer:midnight` mula sa `Api` project.

## File inventory

| Lugar | Mga file |
|------|-------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Shared entry | `Api/src/shared/helpers/NotificationService.ts` |
| Transactional door | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| Reminder engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Reminder repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving/plan email | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Reminder editors (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Reminder editor / preferences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Mga Kaugnay na Pahina

- [Real-time Architecture](../realtime) — ang WebSocket protocol at client primitives (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) na ang in-app delivery level ay sumasabay dito
- [Web Push Notifications](../web-push) — ang VAPID setup at ang browser Push API path na ginagamit ng push escalation level
- [Messaging Endpoints](../api/endpoints/messaging) — buong REST surface para sa messages, conversations, connections, at notification/reminder routes
