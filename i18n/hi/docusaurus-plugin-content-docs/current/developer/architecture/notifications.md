---
title: "Notifications और Reminders Architecture"
---

# Notifications और Reminders Architecture

<div class="article-intro">

हर संदेश जो एक church member को page के बाहर देखता है — एक badge count, एक push notification, एक digest email — MessagingApi में दो दरवाजों में से एक से passes करता है। यह पृष्ठ funnel को document करता है, reminder engine जो इसे एक schedule पर feed करता है, और preference model जो decide करता है कि वास्तव में एक व्यक्ति तक क्या पहुंचता है।

</div>

## अवलोकन — दो दरवाजे

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **कुछ भी जो एक व्यक्ति को कुछ बताता है** `NotificationHelper.createNotifications()` के माध्यम से messaging module में जाता है। यह एक `notifications` पंक्ति को persist करता है और socket → push → email को escalate करता है, hर channel पर `PreferenceGateHelper` को evaluate करता है — including `in_app` level 0 पर।
2. **कुछ भी scheduled** एक `reminderDefinition` है (entity-level या scope-level) जो `reminderOccurrences` में expand किया गया है और एक recurring timer पर `ReminderEngine.scan()` द्वारा dispatched है। एक expander, एक dispatcher, एक send ledger (`reminderSentLog`)।
3. **Direct email** केवल `TransactionalEmailHelper.sendTransactional()` के पीछे exist करता है। एक ESLint rule इसे compile time पर enforce करता है — नीचे देखें।

:::tip Email door lint-enforced है, सिर्फ convention नहीं
`Api/tools/eslint-rules/email-door.cjs` `no-direct-email-helper` define करता है: `NotificationHelper.ts` या `TransactionalEmailHelper.ts` के बाहर `EmailHelper.sendTemplatedEmail()` या `EmailHelper.sendEmail()` के लिए कोई भी call lint को fail करता है। यदि आपको एक email भेजना है, तो इसे funnel के माध्यम से route करें (`createNotifications` साथ `emailImmediate`) या `TransactionalEmailHelper.sendTransactional()` के माध्यम से — कोई third way नहीं है जो CI को pass करता है।
:::

## The notification funnel

`NotificationHelper.createNotifications()` कुछ भी के लिए single entry point है जो scheduled या transactional नहीं है:

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

हर recipient के लिए यह `notifications` में एक row save करता है और `attemptDeliveryWithEscalation` को call करता है, जो नीचे channel ladder को walks करता है। Same `(contentType, contentId)` के लिए एक still-unread row re-creation को suppress करता है — यह dedup guard `emailImmediate` sends के लिए skip किया जाता है (reminder offsets, staff "email all", workflow steps अपना dedup own करते हैं) और direct messages के लिए, जो हमेशा socket को ping करते हैं।

`shared/helpers/NotificationService.ts` messaging module के बाहर callers के लिए same signature (`NotificationServiceOptions`) को mirror करता है और boot पर messaging module के साथ registered है।

## Channel escalation chain

Delivery एक level पर शुरू होता है (0 default, या reminders/explicit sends के लिए higher) और अगले channel पर केवल तभी proceed करता है यदि पिछला एक succeed नहीं हुआ। हर level कुछ भी attempt किए जाने से पहले `PreferenceGateHelper` द्वारा gated है।

| Level | Channel | Behavior |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app` gate पहले check किया जाता है। यदि suppressed (muted), row को `isNew=false` के साथ persist किया जाता है और delivery पूरी तरह बंद हो जाती है — कोई socket ping नहीं, कोई badge नहीं, कोई further escalation नहीं। अन्यथा सर्वर person के `alerts` room के लिए open socket connections को look up करता है और `notification` (या `privateMessage`) frame को push करता है। ordinary notifications के लिए, एक successful socket delivery chain को यहां stops करता है — 30-minute timer unread items को re-check करता है और उन्हें बाद में escalate करता है। Direct messages कभी भी socket पर stop नहीं करते: एक installed PWA alerts socket को background में open रख सकता है, जो अन्यथा OS-level push को suppress करेगा। |
| 1 | **push** | `allowPush` / category opt-out / quiet hours पर gated। person के `devices` rows पर पाए गए Expo push tokens और Web Push subscriptions दोनों को send करता है, endpoint द्वारा deduplicate करता है और साथ ही stale tokens को prune करता है। |
| 2 | **email** | `emailFrequency` और category opt-out पर gated। Immediate sends (`emailImmediate`) right away render करते हैं और एक `deliveryLogs` row लिखते हैं; अन्यथा notification को batch digest के लिए pending left रहता है, नीचे describe किया गया। |
| — | **sms** | Preference plumbing (`allowSms`, per-category channel lists) पहले से ही एक SMS channel के लिए accounts करते हैं, लेकिन कोई producer इसके माध्यम से भेजता नहीं है आज — यह bulk SMS product के लिए reserved रहता है, जो एक separate, siloed flow via `TextingController` / `@churchapps/texting` के रूप में चलता है। |

Socket या push पर left unread notifications 30-minute timer (`NotificationHelper.escalateDelivery`) द्वारा escalated हैं। Batch email each person के `emailFrequency` preference द्वारा driven `NotificationHelper.sendEmailNotifications(frequency)` द्वारा भेजा जाता है: `individual` 30-minute timer पर चलता है, `daily` nightly timer पर चलता है। (`weekly` एक valid preference value है लेकिन अभी तक कोई dedicated batch run नहीं है।)

## Reminder Engine

Scheduled reminders — event reminders, task due dates, serving/plan assignment reminders — सभी एक generalized engine के माध्यम से जाते हैं बजाय bespoke per-feature cron logic के।

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- या scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitions** (`reminderDefinitions`) entity-level हैं (`entityId` set — एक specific event, task, या plan) या scope-level (`entityId` null, `scopeId` set — जैसे हर plan एक serving plan type के तहत)। एक definition minute offsets (`offsets`, जैसे `"1440,60"` एक दिन और एक घंटे पहले के लिए) का एक CSV, एक local send time (`sendLocalTime`), channels (`channels` का एक CSV — including `email` एक immediate rich email को send time पर trigger करता है), एक `recipientMode`, और एक optional custom `message` को carry करता है।

**Expansion** आगे horizon के लिए fire rows को materialize करता है (एक rolling multi-day window)। यह nightly timer पर चलता है, और synchronously जब एक definition save होता है ताकि एक last-minute event के लिए reminder अभी भी fire हो। Scope definitions adapter के `loadScopeEntities` के माध्यम से fan out करते हैं, हर concrete entity के लिए एक occurrence set produce करते हैं; entity-level occurrences key `definitionId:occurrenceISO:offset` का use करते हैं, जबकि scoped occurrences entity id द्वारा namespace करते हैं तो वे कभी भी collide नहीं करते। एक occurrence को upserting **resurrect** एक previously-cancelled row करता है — cancel-then-re-expand underlying entity के बाद एक reminder को re-sync करने का standard तरीका है; rows पहले से `sent`, `failed`, या `processing` untouched छोड़े जाते हैं।

**Dispatch** (`ReminderEngine.scan()`) 30-minute timer पर चलता है। यह due occurrences को claim करता है (एक lease double-processing को prevent करता है), entity के adapter के माध्यम से recipients को load करता है, जो कोई भी पहले से `reminderSentLog` में उस occurrence के लिए recorded हैं उन्हें filter करता है, और `createNotifications` को call करता है साथ `deliveryStartLevel: 1` (push के लिए straight skip करता है) साथ ही `emailImmediate`/`emailByPerson` जब definition के channels email को include करते हैं।

एक internal event bus entity mutations पर react करता है nightly expansion के लिए wait किए बिना: content events (webhook dispatcher के माध्यम से) और plan/task update events affected entity के लिए immediate re-expansion या cancellation को trigger करते हैं, और एक plan update भी किसी भी scope definitions को re-expand करता है अपने plan type से tied।

### Adapters

Engine entity-agnostic है; हर supported entity type एक adapter के माध्यम से plug करता है (`helpers/adapters/`):

| Entity type | Adapter | Notes |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Recipients को registrants या group members के लिए scope किया गया है event और `recipientMode` के आधार पर। |
| `plan` | `PlanReminderAdapter` | Recipients Accepted + Unconfirmed plan assignments हैं। `buildEmails` `DoingModuleGateway.buildPlanReminderEmails` में call करता है, जो positions, notes, और एक custom message को `doing/helpers/PlanReminderEmailHelper` के माध्यम से render करता है, including Accept/Decline buttons जो `ReminderTokenHelper` द्वारा signed हैं जो एक public assignment-response endpoint को post करते हैं। |
| `task` | `TaskReminderAdapter` | Recipients task के assignee(s) हैं। |

### Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | एक entity के लिए reminder definition को load या save करें। |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | एक scope-level (inherited) reminder definition को load या save करें। |
| `DELETE` | `/messaging/reminders/:defId` | एक definition को delete करें और इसके pending occurrences को cancel करें। |
| `GET` | `/messaging/reminders/event/:eventId/preview` | एक event reminder के लिए save करने से पहले recipient count और next fire times को preview करें। |
| `GET` | `/messaging/reminders/log` | एक church के लिए recent reminder occurrence history। |
| `POST` | `/messaging/reminders/mute` | एक specific entity के लिए reminders को mute करें। |

एक definition को save करना उस entity या scope के लिए एक synchronous re-expansion को trigger करता है, इसलिए editors nightly job के लिए wait किए बिना up-to-date "next fires" देख सकते हैं।

## Direct messages

Direct messages same funnel के रूप में ride करते हैं सब कुछ बजाय एक separate escalation path के। हर unread conversation को एक **shadow row** `notifications` में मिलता है (`contentType='privateMessage'`, `contentId` = private message id, `category='direct_messages'`) जो सभी delivery state को own करता है — socket/push/email escalation, read tracking, सब कुछ। `privateMessages` table itself message payload को keep करता है और एक `notifyPersonId` column, जो unread badge का source है और जब recipient conversation को read करता है तब clear होता है।

Shadow rows notifications bell के लिए invisible हैं: वे unread count query, notification list query, और mark-read/delete queries से excluded हैं, जो सभी `contentType <> 'privateMessage'` को filter करते हैं। हर DM ping socket को hit करता है regardless of unread state से (live chat semantics — कोई dedup नहीं), और DMs कभी भी socket delivery पर ordinary notifications की तरह stop नहीं करते, क्योंकि एक backgrounded PWA एक socket को open hold कर सकता है जबकि अभी भी एक OS-level push की जरूरत है। यदि एक व्यक्ति DM notifications को mute करता है, shadow row को park किया जाता है (`isNew=false`, `notifyPersonId` cleared) — still visible conversation के अंदर ही, बस badges या alerts के बिना।

## Preferences और gating

हर send `PreferenceGateHelper.evaluate()` के माध्यम से passes करता है, एक pure function (सभी state passed in, hot path पर DB calls नहीं) जो `allow`, `suppress`, या `defer` return करता है। layers क्रम में चलाते हैं, और पहला जो decide करता है वह win करता है:

1. **Locked category** — कुछ categories mandatory (tier 0) हैं और हर दूसरे layer को bypass करते हैं।
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms`, या `emailFrequency='never'` outright suppress करते हैं।
3. **Quiet hours** — push और SMS केवल (email को non-intrusive माना जाता है)। यदि person के timezone में current wall-clock time उनकी quiet window में fall करता है, एक transactional category अभी भी get through करता है; एक non-transactional एक quiet window के end तक deferred होता है, `TimezoneHelper.wallClockToUtc` के माध्यम से DST-correct UTC instant के रूप में computed।
4. **Per-category preference override** — एक explicit opt-out एक category × channel pair के लिए; absence मतलब category का default।
5. **Per-entity mute** — एक mute एक specific entity (जैसे एक event, एक plan) के विरुद्ध recorded category-level setting से further restrict करता है, लेकिन केवल तब apply होता है जब caller notification के साथ एक entity id/type supply करता है।

Tables involved: `notificationPreferences` (global — `masterMute`, `emailFrequency` of `individual|daily|weekly|never`, `allowPush`, quiet-hours window + timezone, `allowSms`), `notificationPreferenceOverrides` (per category × channel), और `notificationEntityMutes` (per entity)।

यह gate in-app (level 0), push (level 1), और email (level 2) के अंदर funnel में enforce किया जाता है — including immediate reminder/digest emails। Transactional email (auth codes, password resets, invites, donation receipts) design द्वारा इसे bypass करता है; यह second door का पूरा point है।

## शेड्यूलिंग

दोनों reminder engine और notification digest existing scheduled timers पर ride करते हैं बजाय नई infrastructure introduce करने के:

| Timer | Schedule | Runs |
|-------|----------|------|
| 30-minute timer | हर 30 मिनट | Unread notifications को escalate करें; `individual`-frequency digest emails भेजें; due reminder occurrences को dispatch करें (`ReminderEngine.scan`); approval digests; due automation executions |
| Nightly timer | 05:00 UTC | Group attendance reminders; recurring streaming services को advance करें; auto-refresh lists को refresh करें; next horizon के लिए reminder occurrences को expand करें (`ReminderEngine.expandAll`); `daily`-frequency digest emails भेजें |

Locally, same logic `npm run timer:30min` और `npm run timer:midnight` के साथ `Api` project से on demand को trigger कर सकता है।

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

## संबंधित पृष्ठ

- [Real-time Architecture](../realtime) — WebSocket protocol और client primitives (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) जो in-app delivery level ride करता है
- [Web Push Notifications](../web-push) — VAPID setup और browser Push API path जो push escalation level द्वारा use किया जाता है
- [Messaging Endpoints](../api/endpoints/messaging) — messages, conversations, connections, और notification/reminder routes के लिए पूर्ण REST surface
