---
title: "Notifications & Reminders आर्किटेक्चर"
---

# Notifications & Reminders आर्किटेक्चर

<div class="article-intro">

हर संदेश जो एक चर्च मेंबर उस पेज के बाहर देखता है जिसे वह देख रहा है — एक badge count, एक push notification, एक digest ईमेल — MessagingApi में दो दरवाज़ों में से एक से होकर गुज़रता है। यह पृष्ठ फ़नल को, उसे शेड्यूल पर feed करने वाले reminder इंजन को, और उस preference मॉडल को डॉक्यूमेंट करता है जो तय करता है कि वास्तव में किसी व्यक्ति तक क्या पहुँचता है।

</div>

## अवलोकन — दो दरवाज़े

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **कोई भी चीज़ जो किसी व्यक्ति को कुछ बताती है** messaging मॉड्यूल में `NotificationHelper.createNotifications()` से होकर जाती है। यह एक `notifications` row persist करती है और socket → push → email को escalate करती है, हर चैनल पर `PreferenceGateHelper` का मूल्यांकन करते हुए — level 0 पर `in_app` सहित।
2. **कोई भी scheduled चीज़** एक `reminderDefinition` है (entity-level या scope-level) जो `reminderOccurrences` में expand होकर एक recurring timer पर `ReminderEngine.scan()` द्वारा dispatch की जाती है। एक expander, एक dispatcher, एक send ledger (`reminderSentLog`)।
3. **Direct email** केवल `TransactionalEmailHelper.sendTransactional()` के पीछे मौजूद है। एक ESLint नियम इसे compile time पर लागू करता है — नीचे देखें।

:::tip Email दरवाज़ा lint-enforced है, केवल परंपरा नहीं
`Api/tools/eslint-rules/email-door.cjs` `no-direct-email-helper` को परिभाषित करता है: `NotificationHelper.ts` या `TransactionalEmailHelper.ts` के बाहर `EmailHelper.sendTemplatedEmail()` या `EmailHelper.sendEmail()` की कोई भी कॉल lint को फेल कर देती है। यदि आपको एक ईमेल भेजना है, तो इसे फ़नल के माध्यम से route करें (`emailImmediate` के साथ `createNotifications`) या `TransactionalEmailHelper.sendTransactional()` के माध्यम से — कोई तीसरा तरीका नहीं है जो CI को पास करे।
:::

## Notification फ़नल

`NotificationHelper.createNotifications()` किसी भी चीज़ के लिए एकमात्र entry point है जो scheduled या transactional नहीं है:

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

हर recipient के लिए यह `notifications` में एक row सेव करता है और `attemptDeliveryWithEscalation` को कॉल करता है, जो नीचे दी गई चैनल सीढ़ी पर चलता है। समान `(contentType, contentId)` के लिए एक अभी भी-अपठित row re-creation को दबा देती है — यह dedup गार्ड `emailImmediate` sends के लिए skip किया जाता है (reminder offsets, staff "email all", workflow steps अपना खुद का dedup करते हैं) और direct messages के लिए, जो हमेशा socket को ping करते हैं।

`shared/helpers/NotificationService.ts` messaging मॉड्यूल के बाहर callers के लिए वही signature (`NotificationServiceOptions`) mirror करता है और boot पर messaging मॉड्यूल के साथ रजिस्टर होता है।

## Channel escalation chain

Delivery एक level पर शुरू होती है (डिफ़ॉल्ट रूप से 0, या reminders/explicit sends के लिए higher) और अगले चैनल पर तभी आगे बढ़ती है जब पिछला वाला सफल नहीं हुआ। हर level को कुछ भी प्रयास करने से पहले `PreferenceGateHelper` द्वारा gate किया जाता है।

| Level | चैनल | व्यवहार |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app` gate पहले चेक होता है। यदि suppressed (muted), row को `isNew=false` के साथ persist किया जाता है और delivery पूरी तरह रुक जाती है — कोई socket ping नहीं, कोई badge नहीं, कोई आगे escalation नहीं। अन्यथा सर्वर व्यक्ति के `alerts` room के लिए open socket connections को देखता है और एक `notification` (या `privateMessage`) frame push करता है। सामान्य notifications के लिए, एक सफल socket delivery chain को यहीं रोक देती है — 30-मिनट का टाइमर unread items को दोबारा जाँचता है और उन्हें बाद में escalate करता है। Direct messages कभी socket पर नहीं रुकते: एक installed PWA alerts socket को background में open रख सकता है, जो अन्यथा OS-level push को दबा देता। |
| 1 | **push** | `allowPush` / category opt-out / quiet hours पर gated। व्यक्ति की `devices` rows पर मिले Expo push tokens और Web Push subscriptions दोनों को भेजता है, endpoint के हिसाब से deduplicate करते हुए और साथ ही stale tokens को prune करते हुए। |
| 2 | **email** | `emailFrequency` और category opt-out पर gated। Immediate sends (`emailImmediate`) तुरंत render होते हैं और एक `deliveryLogs` row लिखते हैं; अन्यथा notification batch digest के लिए pending छोड़ दिया जाता है, जो नीचे describe किया गया है। |
| — | **sms** | Preference plumbing (`allowSms`, प्रति-category चैनल सूचियाँ) पहले से एक SMS चैनल के लिए हिसाब रखती है, लेकिन आज कोई producer इसके माध्यम से नहीं भेजता — यह bulk SMS प्रोडक्ट के लिए reserved रहता है, जो `TextingController` / `@churchapps/texting` के माध्यम से एक अलग, siloed फ़्लो के रूप में चलता है। |

Socket या push पर छूटे unread notifications 30-मिनट टाइमर (`NotificationHelper.escalateDelivery`) द्वारा escalate की जाती हैं। Batch email हर व्यक्ति की `emailFrequency` preference द्वारा driven `NotificationHelper.sendEmailNotifications(frequency)` से भेजी जाती है: `individual` 30-मिनट टाइमर पर चलता है, `daily` nightly टाइमर पर चलता है। (`weekly` एक valid preference value है लेकिन अभी तक इसका कोई dedicated batch run नहीं है।)

## Reminder Engine

Scheduled reminders — event reminders, task due dates, serving/plan assignment reminders — सभी bespoke प्रति-फ़ीचर cron logic के बजाय एक generalized इंजन से होकर जाती हैं।

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- या scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitions** (`reminderDefinitions`) या तो entity-level (`entityId` सेट — एक specific event, task, या plan) या scope-level (`entityId` null, `scopeId` सेट — जैसे एक serving plan type के तहत हर plan) हैं। एक definition minute offsets का एक CSV (`offsets`, जैसे एक दिन और एक घंटा पहले के लिए `"1440,60"`), एक local send time (`sendLocalTime`), चैनलों का एक CSV (`channels` — `email` को शामिल करना send time पर एक immediate rich ईमेल ट्रिगर करता है), एक `recipientMode`, और एक वैकल्पिक कस्टम `message` carry करती है।

**Expansion** आगे के horizon के लिए fire rows को materialize करता है (एक rolling multi-day विंडो)। यह nightly टाइमर पर चलता है, और synchronously जब भी एक definition सेव होती है ताकि एक last-minute event का reminder फिर भी fire हो। Scope definitions adapter के `loadScopeEntities` के माध्यम से fan out होती हैं, हर concrete entity के लिए एक occurrence सेट produce करते हुए; entity-level occurrences key `definitionId:occurrenceISO:offset` का उपयोग करती हैं, जबकि scoped occurrences entity id द्वारा namespace होती हैं ताकि वे कभी collide न हों। एक occurrence को upsert करना पहले से cancelled row को **resurrect** करता है — cancel-then-re-expand underlying entity बदलने के बाद एक reminder को दोबारा sync करने का मानक तरीका है; पहले से `sent`, `failed`, या `processing` rows को अछूता छोड़ दिया जाता है।

**Dispatch** (`ReminderEngine.scan()`) 30-मिनट टाइमर पर चलता है। यह due occurrences को claim करता है (एक lease double-processing को रोकता है), entity के adapter के माध्यम से recipients को लोड करता है, जो कोई भी उस occurrence के लिए पहले से `reminderSentLog` में रिकॉर्ड है उसे फ़िल्टर करता है, और `createNotifications` को `deliveryStartLevel: 1` (सीधे push पर जाना) के साथ, प्लस जब definition के चैनलों में email शामिल हो तो `emailImmediate`/`emailByPerson` के साथ कॉल करता है।

एक internal event bus nightly expansion का इंतज़ार किए बिना entity mutations पर react करता है: content events (webhook dispatcher के माध्यम से) और plan/task अपडेट events प्रभावित entity के लिए तुरंत दोबारा-expansion या cancellation ट्रिगर करते हैं, और एक plan अपडेट अपने plan type से जुड़ी किसी भी scope definitions को भी दोबारा expand करता है।

### Adapters

इंजन entity-agnostic है; हर समर्थित entity type एक adapter (`helpers/adapters/`) के माध्यम से plug होता है:

| Entity type | Adapter | नोट्स |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Recipients event और `recipientMode` के आधार पर registrants या group members तक scoped हैं। |
| `plan` | `PlanReminderAdapter` | Recipients Accepted + Unconfirmed plan assignments हैं। `buildEmails` `DoingModuleGateway.buildPlanReminderEmails` को कॉल करता है, जो positions, notes, और एक कस्टम message को `doing/helpers/PlanReminderEmailHelper` के माध्यम से render करता है, जिसमें `ReminderTokenHelper` द्वारा signed Accept/Decline buttons शामिल हैं जो एक public assignment-response endpoint को post करते हैं। |
| `task` | `TaskReminderAdapter` | Recipients task के assignee(s) हैं। |

### Endpoints

| Method | Path | उद्देश्य |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | एक entity के लिए reminder definition लोड या सेव करें। |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | एक scope-level (inherited) reminder definition लोड या सेव करें। |
| `DELETE` | `/messaging/reminders/:defId` | एक definition डिलीट करें और इसके pending occurrences को cancel करें। |
| `GET` | `/messaging/reminders/event/:eventId/preview` | सेव करने से पहले एक event reminder के लिए recipient count और अगली fire times का preview करें। |
| `GET` | `/messaging/reminders/log` | किसी चर्च के लिए हाल का reminder occurrence इतिहास। |
| `POST` | `/messaging/reminders/mute` | एक specific entity के लिए reminders को mute करें। |

एक definition को सेव करना उस entity या scope के लिए एक synchronous re-expansion ट्रिगर करता है, इसलिए editors nightly job का इंतज़ार किए बिना up-to-date "अगली fires" देखते हैं।

## Direct messages

Direct messages एक अलग escalation पाथ के बजाय बाकी सबकी तरह उसी फ़नल पर चलते हैं। हर unread conversation को `notifications` में एक **shadow row** मिलती है (`contentType='privateMessage'`, `contentId` = private message id, `category='direct_messages'`) जो सभी delivery state की मालिक है — socket/push/email escalation, read tracking, सब कुछ। `privateMessages` टेबल खुद message payload रखती है और एक `notifyPersonId` column, जो unread badge का स्रोत है और recipient के conversation पढ़ने पर clear हो जाता है।

Shadow rows notifications bell के लिए invisible हैं: वे unread count query, notification list query, और mark-read/delete queries से बाहर हैं, जो सभी `contentType <> 'privateMessage'` को फ़िल्टर करते हैं। हर DM ping unread state की परवाह किए बिना socket को hit करता है (live chat semantics — कोई dedup नहीं), और DMs कभी socket delivery पर सामान्य notifications की तरह नहीं रुकते, क्योंकि एक backgrounded PWA अभी भी OS-level push की ज़रूरत रहते हुए एक socket को open रख सकता है। यदि कोई व्यक्ति DM notifications को mute करता है, shadow row को park कर दिया जाता है (`isNew=false`, `notifyPersonId` cleared) — फिर भी conversation के अंदर visible, बस badges या alerts के बिना।

## Preferences और gating

हर send `PreferenceGateHelper.evaluate()` से होकर गुज़रता है, एक pure function (सारी state पास की गई, hot path पर कोई DB calls नहीं) जो `allow`, `suppress`, या `defer` लौटाता है। Layers क्रम से चलती हैं, और पहला जो decide करती है वह जीतती है:

1. **Locked category** — कुछ categories mandatory हैं (tier 0) और हर दूसरी layer को bypass करती हैं।
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms`, या `emailFrequency='never'` सीधे suppress करते हैं।
3. **Quiet hours** — केवल push और SMS (ईमेल को non-intrusive माना जाता है)। यदि व्यक्ति के timezone में current wall-clock time उनकी quiet विंडो में आता है, एक transactional category फिर भी पहुँच जाती है; एक non-transactional एक `TimezoneHelper.wallClockToUtc` के माध्यम से DST-correct UTC instant के रूप में गणना की गई quiet विंडो के अंत तक deferred होती है।
4. **Per-category preference override** — एक category × चैनल जोड़े के लिए explicit opt-out; अनुपस्थिति का मतलब category का डिफ़ॉल्ट।
5. **Per-entity mute** — एक specific entity (जैसे एक event, एक plan) के विरुद्ध रिकॉर्ड किया गया mute category-level सेटिंग से आगे प्रतिबंधित करता है, लेकिन केवल तभी लागू होता है जब caller notification के साथ एक entity id/type सप्लाई करे।

शामिल tables: `notificationPreferences` (global — `masterMute`, `individual|daily|weekly|never` का `emailFrequency`, `allowPush`, quiet-hours विंडो + timezone, `allowSms`), `notificationPreferenceOverrides` (प्रति category × चैनल), और `notificationEntityMutes` (प्रति entity)।

यह gate फ़नल के अंदर in-app (level 0), push (level 1), और email (level 2) के लिए लागू किया जाता है — immediate reminder/digest ईमेल सहित। Transactional email (auth codes, password resets, invites, donation receipts) design से इसे bypass करती है; यही दूसरे दरवाज़े का पूरा मकसद है।

## शेड्यूलिंग

Reminder इंजन और notification digest दोनों नई infrastructure लाने के बजाय मौजूदा scheduled टाइमर पर चलते हैं:

| टाइमर | शेड्यूल | क्या चलाता है |
|-------|----------|------|
| 30-मिनट टाइमर | हर 30 मिनट | Unread notifications escalate करें; `individual`-frequency digest ईमेल भेजें; due reminder occurrences dispatch करें (`ReminderEngine.scan`); approval digests; due automation executions |
| Nightly टाइमर | 05:00 UTC | Group attendance reminders; recurring streaming services को आगे बढ़ाएँ; auto-refresh सूचियों को refresh करें; अगले horizon के लिए reminder occurrences expand करें (`ReminderEngine.expandAll`); `daily`-frequency digest ईमेल भेजें |

Locally, `Api` प्रोजेक्ट से `npm run timer:30min` और `npm run timer:midnight` के साथ वही logic माँग पर ट्रिगर की जा सकती है।

## File inventory

| क्षेत्र | फ़ाइलें |
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

- [Real-time Architecture](../realtime) — WebSocket प्रोटोकॉल और client primitives (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) जिन पर in-app delivery level चलता है
- [Web Push Notifications](../web-push) — VAPID सेटअप और browser Push API पाथ जो push escalation level द्वारा उपयोग किया जाता है
- [Messaging Endpoints](../api/endpoints/messaging) — messages, conversations, connections, और notification/reminder routes के लिए पूर्ण REST सतह
