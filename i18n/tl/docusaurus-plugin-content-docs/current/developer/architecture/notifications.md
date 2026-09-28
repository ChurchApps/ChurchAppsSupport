---
title: "Arkitektura ng Mga Notification at Reminder"
---

# Arkitektura ng Mga Notification at Reminder

<div class="article-intro">

Bawat mensahe na makikita ng miyembro ng simbahan sa labas ng pahina na tinitingin nila — isang badge count, isang push notification, isang digest email — ay dumadaan sa isa sa dalawang pintuan sa MessagingApi. Ang pahinang ito ay nagdodokumento sa funnel, ang reminder engine na nagpapakain nito sa isang schedule, at ang preference model na nagpapasya kung ano talaga ang umaabot sa isang tao.

</div>

## Pangkalahatang Pananaw — dalawang pintuan

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Kahit ano na nagsasabi sa tao ng isang bagay** ay dumadaan sa `NotificationHelper.createNotifications()` sa messaging module. Ito ay nagpanatili ng `notifications` row at nag-escalate ng socket → push → email, sinusuri ang `PreferenceGateHelper` bawat channel — kabilang ang `in_app` sa level 0.
2. **Kahit ano na scheduled** ay isang `reminderDefinition` (entity-level o scope-level) na pinalawak sa `reminderOccurrences` at i-dispatch ng `ReminderEngine.scan()` sa isang recurring timer. Isang expander, isang dispatcher, isang send ledger (`reminderSentLog`).
3. **Direct email** ay umiiral lamang sa likod ng `TransactionalEmailHelper.sendTransactional()`. Ang isang ESLint rule ay nag-enforce nito sa compile time — tingnan sa ibaba.

:::tip Ang email door ay lint-enforced, hindi lamang convention
Ang `Api/tools/eslint-rules/email-door.cjs` ay tumutukoy ng `no-direct-email-helper`: anumang tawag sa `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` sa labas ng `NotificationHelper.ts` o `TransactionalEmailHelper.ts` ay nabibigo ang lint. Kung kailangan mo ng email, i-route ito sa pamamagitan ng funnel (`createNotifications` na may `emailImmediate`) o sa pamamagitan ng `TransactionalEmailHelper.sendTransactional()` — walang ikatlong paraan na pumasa sa CI.
:::

## Ang notification funnel

Ang `NotificationHelper.createNotifications()` ay ang iisang entry point para sa anumang hindi scheduled o transactional:

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

Para sa bawat recipient ito ay nagsasave ng row sa `notifications` at tumatawag ng `attemptDeliveryWithEscalation`, na lumakad sa channel ladder sa ibaba. Isang still-unread row para sa parehong `(contentType, contentId)` ay nag-suppress ng re-creation — ang dedup guard na ito ay nali-skip para sa `emailImmediate` sends (reminder offsets, staff "email all", workflow steps ay may sariling dedup) at para sa direct messages, na laging nag-ping ng socket.

Ang `shared/helpers/NotificationService.ts` ay sumasalamin sa parehong signature (`NotificationServiceOptions`) para sa callers sa labas ng messaging module at ay naka-register sa messaging module sa boot.

## Channel escalation chain

Ang delivery ay nagsisimula sa isang level (0 by default, o mas mataas para sa reminders/explicit sends) at lamang pumipili sa susunod na channel kung ang previous one ay hindi nagtagumpay. Bawat level ay gated ng `PreferenceGateHelper` bago kahit ano ay sinubukan.

| Level | Channel | Behavior |
|-------|---------|----------|
| 0 | **in_app / socket** | Ang `in_app` gate ay sinusuri muna. Kung suppressed (muted), ang row ay nananatili na may `isNew=false` at ang delivery ay tumitigil nang lubusan — walang socket ping, walang badge, walang karagdagang escalation. Kung hindi ang server ay tumitingin sa open socket connections para sa person's `alerts` room at nagtutulak ng `notification` (o `privateMessage`) frame. Para sa ordinary notifications, isang matagumpay na socket delivery ay humihinto ng chain dito — ang 30-minute timer ay muling sinusuri ang unread items at nag-escalate sa kanila mamaya. Ang direct messages ay hindi kailanman tumitigil sa socket: isang installed PWA ay maaaring panatilihin ang alerts socket open sa background, na kung hindi ay mag-suppress ng OS-level push. |
| 1 | **push** | Gated sa `allowPush` / category opt-out / quiet hours. Nagpapadala sa parehong Expo push tokens at Web Push subscriptions na makikita sa person's `devices` rows, deduplicating ng endpoint at nag-prune ng stale tokens sa daan. |
| 2 | **email** | Gated sa `emailFrequency` at category opt-out. Immediate sends (`emailImmediate`) ay nag-render kaagad at nagsusulat ng `deliveryLogs` row; kung hindi ang notification ay nananatiling pending para sa batch digest, na inilarawan sa ibaba. |
| — | **sms** | Ang preference plumbing (`allowSms`, per-category channel lists) ay nag-account na para sa SMS channel, ngunit walang producer ang nagpapadala sa pamamagitan nito ngayon — ito ay nananatiling reserved para sa bulk SMS product, na tumatakbo bilang separate, siloed flow sa pamamagitan ng `TextingController` / `@churchapps/texting`. |

Ang unread notifications na naiwan sa socket o push ay nag-escalate ng 30-minute timer (`NotificationHelper.escalateDelivery`). Ang batch email ay ipinapadala ng `NotificationHelper.sendEmailNotifications(frequency)`, driven ng bawat person's `emailFrequency` preference: ang `individual` ay tumatakbo sa 30-minute timer, `daily` ay tumatakbo sa nightly timer. (Ang `weekly` ay isang valid preference value ngunit walang dedicated batch run pa.)

## Reminder Engine

Ang scheduled reminders — event reminders, task due dates, serving/plan assignment reminders — ay lahat dumadaan sa isang generalized engine sa halip na bespoke per-feature cron logic.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitions** (`reminderDefinitions`) ay isa man entity-level (`entityId` set — isang specific event, task, o plan) o scope-level (`entityId` null, `scopeId` set — tulad ng bawat plan sa isang serving plan type). Ang isang definition ay nagdadala ng CSV ng minute offsets (`offsets`, halimbawa `"1440,60"` para sa isang araw at isang oras bago), isang local send time (`sendLocalTime`), isang CSV ng channels (`channels` — kasama ang `email` ay nag-trigger ng immediate rich email sa send time), isang `recipientMode`, at isang optional custom `message`.

**Expansion** ay nag-materialize ng fire rows para sa horizon na malapit (isang rolling multi-day window). Ito ay tumatakbo sa nightly timer, at synchronously kahit kailan ang isang definition ay nakatipid kaya isang reminder para sa last-minute event ay tumatakbo pa rin. Ang scope definitions ay fan out sa pamamagitan ng adapter's `loadScopeEntities`, na gumagawa ng isang occurrence set bawat concrete entity; ang entity-level occurrences ay gumagamit ng key `definitionId:occurrenceISO:offset`, habang ang scoped occurrences ay namespace ng entity id kaya hindi sila kailanman nagbangaan. Ang upserting ng isang occurrence ay **resurrects** isang previously-cancelled row — cancel-then-re-expand ay ang standard way upang mag-re-sync ng reminder pagkatapos ang underlying entity ay nagbago; ang rows na naka-`sent`, `failed`, o `processing` ay nananatiling untouched.

**Dispatch** (`ReminderEngine.scan()`) ay tumatakbo sa 30-minute timer. Ito ay nag-claim ng due occurrences (isang lease ay pumipigil sa double-processing), nag-load ng recipients sa pamamagitan ng entity's adapter, nag-filter out ng kahit sino na naka-record na sa `reminderSentLog` para sa occurrence na iyon, at tumatawag ng `createNotifications` na may `deliveryStartLevel: 1` (skip straight sa push) pati `emailImmediate`/`emailByPerson` kapag ang definition's channels ay kabilang ang email.

Ang isang internal event bus ay tumutugon sa entity mutations nang hindi naghihintay para sa nightly expansion: ang content events (sa pamamagitan ng webhook dispatcher) at plan/task update events ay nag-trigger ng immediate re-expansion o cancellation para sa affected entity, at isang plan update ay nag-re-expand din ng anumang scope definitions na nakakabit sa plan type nito.

### Adapters

Ang engine ay entity-agnostic; bawat supported entity type ay nag-plug sa pamamagitan ng isang adapter (`helpers/adapters/`):

| Entity type | Adapter | Notes |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Ang recipients ay scoped sa registrants o group members depende sa event at `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Ang recipients ay Accepted + Unconfirmed plan assignments. Ang `buildEmails` ay tumatawag sa `DoingModuleGateway.buildPlanReminderEmails`, na nag-render ng positions, notes, at isang custom message sa pamamagitan ng `doing/helpers/PlanReminderEmailHelper`, kabilang ang Accept/Decline buttons na naka-sign ng `ReminderTokenHelper` na nag-post sa isang public assignment-response endpoint. |
| `task` | `TaskReminderAdapter` | Ang recipients ay ang task's assignee(s). |

### Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Mag-load o mag-save ng reminder definition para sa isang entity. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Mag-load o mag-save ng scope-level (inherited) reminder definition. |
| `DELETE` | `/messaging/reminders/:defId` | Mag-delete ng definition at i-cancel ang pending occurrences nito. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Preview recipient count at next fire times para sa event reminder bago mag-save. |
| `GET` | `/messaging/reminders/log` | Recent reminder occurrence history para sa isang simbahan. |
| `POST` | `/messaging/reminders/mute` | Mute reminders para sa isang specific entity. |

Ang pagsave ng definition ay nag-trigger ng synchronous re-expansion para sa entity o scope na iyon, kaya ang editors ay makakakita ng up-to-date "next fires" nang hindi naghihintay para sa nightly job.

## Direct messages

Ang direct messages ay sumakay sa parehong funnel tulad ng lahat ng iba sa halip na isang separate escalation path. Bawat unread conversation ay nakakuha ng isang **shadow row** sa `notifications` (`contentType='privateMessage'`, `contentId` = ang private message id, `category='direct_messages'`) na nagmamay-ari ng lahat ng delivery state — socket/push/email escalation, read tracking, lahat. Ang `privateMessages` table mismo ay nagpapanatili ng message payload at isang `notifyPersonId` column, na kung saan ang source ng unread badge at nagiging clear kapag ang recipient ay bumasa ng conversation.

Ang shadow rows ay invisible sa notifications bell: sila ay excluded mula sa unread count query, ang notification list query, at ang mark-read/delete queries, na lahat ay nag-filter ng `contentType <> 'privateMessage'`. Bawat DM ping ay humihit ng socket kahit hindi unread state (live chat semantics — walang dedup), at ang DMs ay hindi kailanman tumitigil sa socket delivery tulad ng ordinary notifications, dahil isang backgrounded PWA ay maaaring manatilihin ang socket open habang still kailangan ng OS-level push. Kung isang tao ay i-mute ang DM notifications, ang shadow row ay nakapark (`isNew=false`, `notifyPersonId` cleared) — still visible sa loob ng conversation mismo, lamang nang walang badges o alerts.

## Preferences & gating

Bawat send ay dumadaan sa `PreferenceGateHelper.evaluate()`, isang pure function (lahat ng state ay dumaan, walang DB calls sa hot path) na nagbabalik ng `allow`, `suppress`, o `defer`. Ang layers ay tumatakbo sa order, at ang una na nag-decide ay nanalo:

1. **Locked category** — ilang categories ay mandatory (tier 0) at bypass bawat ibang layer.
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` ay nag-suppress outright.
3. **Quiet hours** — push at SMS lamang (ang email ay itinuturing na non-intrusive). Kung ang current wall-clock time sa person's timezone ay nahuhulog sa kanilang quiet window, isang transactional category ay nakakakuha pa rin; ang isang non-transactional ay deferred sa dulo ng quiet window, computed bilang DST-correct UTC instant sa pamamagitan ng `TimezoneHelper.wallClockToUtc`.
4. **Per-category preference override** — isang explicit opt-out para sa isang category × channel pair; ang absence ay nangangahulugan ng category's default.
5. **Per-entity mute** — isang mute na naka-record laban sa isang specific entity (halimbawa isang event, isang plan) ay nag-restrict ng mas malayo kaysa sa category-level setting, ngunit lamang nag-apply kapag ang caller ay nagbibigay ng entity id/type kasama ang notification.

Ang tables na kasangkot: `notificationPreferences` (global — `masterMute`, `emailFrequency` ng `individual|daily|weekly|never`, `allowPush`, quiet-hours window + timezone, `allowSms`), `notificationPreferenceOverrides` (per category × channel), at `notificationEntityMutes` (per entity).

Ang gate na ito ay i-enforce para sa in-app (level 0), push (level 1), at email (level 2) sa loob ng funnel — kabilang ang immediate reminder/digest emails. Ang transactional email (auth codes, password resets, invites, donation receipts) ay nag-bypass nito ng disenyo; iyan ang buong punto ng pangalawang pintuan.

## Church-authored email limits

Ang email na ang content ay isinulat ng simbahan ay umaalis mula sa shared ChurchApps SES identity, kaya ito ay metered per church ng `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Ang apat na paths ay tumatawag nito: group/template sends (`EmailTemplateController`, content type `email`), form follow-up emails (`FormSubmissionController`, `formFollowUp`), workflow **Send email** actions (`NotificationHelper` na may `churchAuthored`, `workflowEmail`), at B1 account invites (`UserController.sendInviteEmail`, `invite`). Ang system mail (auth codes, receipts, reminders) ay hindi metered.

- **Approval gate.** Isang simbahan ay nagpapadala ng walang bagay hanggang isang server admin ay nagtakda ng `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** chip). Ang archived churches ay laging blocked. Ang B1Admin's Send Email dialog ay nagsusulat ng `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) at, kapag unapproved, ay nagpapakita ng **Request review** card sa halip ng editor. Ang `POST /messaging/emailTemplates/requestApproval` ay nag-email ng support, at most minsan bawat simbahan bawat linggo.
- **Earned allowance.** Isang approved simbahan ay nakakakuha ng `max(150, 2 × its best church-authored day sa prior 30 days)`, capped sa 2,000 bawat rolling 24 hours. Ang current 24 hours ay excluded mula sa "best day" kaya isang burst ay hindi maaaring itaas ang sariling limit nito.
- **Reserve, then settle.** Ang `reserve()` ay nagsusulat ng isang `deliveryLogs` row bawat recipient bago magpadala, muling sinusuri ang allowance na may mga rows na ito ay binanggit, at bumabalik kung dalawang requests ay nag-race past ang limit (ang send ay nagbabalik ng 429). Ang `settle()` ay nagmamarka ng bawat row na ipinapadala o nabigo.
- **Complaint pause.** Ang `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, na-feed ng SES → SNS) ay nag-pin ng bawat permanent bounce o complaint sa simbahan na ang church-authored email ay umaabot sa address na iyon sa paligid ng oras na iyon, naka-store bilang `deliveryMethod` `sesBounce` / `sesComplaint`. Isang simbahan ay paused sa 2+ complaints (≥ 0.3% ng sends) o 10+ hard bounces (≥ 5%) sa loob ng 7 araw.

## Scheduling

Parehong ang reminder engine at ang notification digest ay sumasagwan sa existing scheduled timers sa halip na pagpakilala ng bagong infrastructure:

| Timer | Schedule | Runs |
|-------|----------|------|
| 30-minute timer | bawat 30 minuto | Mag-escalate ng unread notifications; magpadala ng `individual`-frequency digest emails; mag-dispatch ng due reminder occurrences (`ReminderEngine.scan`); approval digests; due automation executions |
| Nightly timer | 05:00 UTC | Group attendance reminders; mag-advance ng recurring streaming services; mag-refresh ng auto-refresh lists; mag-expand ng reminder occurrences para sa next horizon (`ReminderEngine.expandAll`); magpadala ng `daily`-frequency digest emails |

Locally, ang parehong logic ay maaaring ma-trigger on demand na may `npm run timer:30min` at `npm run timer:midnight` mula sa `Api` project.

## File inventory

| Area | Files |
|------|-------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Shared entry | `Api/src/shared/helpers/NotificationService.ts` |
| Transactional door | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| Church email limits | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Reminder engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Reminder repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving/plan email | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Reminder editors (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Reminder editor / preferences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Related Pages

- [Real-time Architecture](../realtime) — ang WebSocket protocol at client primitives (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) na ang in-app delivery level ay sumasagwan sa
- [Web Push Notifications](../web-push) — VAPID setup at ang browser Push API path na ginagamit ng push escalation level
- [Messaging Endpoints](../api/endpoints/messaging) — buong REST surface para sa messages, conversations, connections, at notification/reminder routes
