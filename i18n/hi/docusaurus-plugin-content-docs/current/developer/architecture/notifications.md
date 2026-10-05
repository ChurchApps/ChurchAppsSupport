---
title: "सूचनाएं और अनुस्मारक आर्किटेक्चर"
---

# सूचनाएं और अनुस्मारक आर्किटेक्चर

<div class="article-intro">

चर्च के सदस्य को जो भी संदेश उस पृष्ठ के बाहर दिखता है जो वह देख रहे हैं — एक बैज गिनती, एक पुश सूचना, एक डाइजेस्ट ईमेल — MessagingApi में दो दरवाजों में से एक के माध्यम से जाता है। यह पृष्ठ फनल, अनुसूची पर इसे खिलाने वाले अनुस्मारक इंजन, और प्राथमिकता मॉडल को दस्तावेज़ित करता है जो यह तय करता है कि वास्तव में किसी तक क्या पहुंचता है।

</div>

## अवलोकन — दो दरवाजे

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **कुछ भी जो किसी को कुछ बताता है** messaging मॉड्यूल में `NotificationHelper.createNotifications()` के माध्यम से जाता है। यह एक `notifications` पंक्ति को persistent करता है और socket → push → email को escalate करता है, प्रत्येक चैनल के लिए `PreferenceGateHelper` का मूल्यांकन करते हुए — स्तर 0 पर `in_app` सहित।
2. **कुछ भी अनुसूचित** एक `reminderDefinition` (entity-स्तर या scope-स्तर) है जो `reminderOccurrences` में विस्तारित होता है और एक आवर्ती टाइमर पर `ReminderEngine.scan()` द्वारा भेजा जाता है। एक expander, एक dispatcher, एक भेजें ledger (`reminderSentLog`)।
3. **प्रत्यक्ष ईमेल** केवल `TransactionalEmailHelper.sendTransactional()` के पीछे मौजूद है। एक ESLint नियम compile समय पर इसे लागू करता है — नीचे देखें।

:::tip ईमेल दरवाज़ा lint-enforced है, केवल सम्मेलन नहीं
`Api/tools/eslint-rules/email-door.cjs` `no-direct-email-helper` को परिभाषित करता है: `NotificationHelper.ts` या `TransactionalEmailHelper.ts` के बाहर `EmailHelper.sendTemplatedEmail()` या `EmailHelper.sendEmail()` के लिए कोई भी कॉल lint में विफल होता है। यदि आपको एक ईमेल भेजने की आवश्यकता है, तो इसे फनल (`createNotifications` के साथ `emailImmediate`) के माध्यम से या `TransactionalEmailHelper.sendTransactional()` के माध्यम से रूट करें — कोई तीसरा तरीका नहीं है जो CI को पास करता है।
:::

## सूचना फनल

`NotificationHelper.createNotifications()` किसी भी चीज के लिए एकमात्र प्रवेश बिंदु है जो अनुसूचित या transactional नहीं है:

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

प्रत्येक प्राप्तकर्ता के लिए यह `notifications` में एक पंक्ति को save करता है और `attemptDeliveryWithEscalation` को कॉल करता है, जो नीचे चैनल सीढ़ी पर जाता है। एक ही `(contentType, contentId)` के लिए अभी भी unread पंक्ति पुनः-निर्माण को suppress करती है — यह dedup guard `emailImmediate` भेजने के लिए छोड़ा जाता है (reminder offsets, staff "email all", workflow steps अपना स्वयं का dedup own करते हैं) और direct messages के लिए, जो हमेशा socket को ping करते हैं।

`shared/helpers/NotificationService.ts` messaging मॉड्यूल के बाहर callers के लिए समान signature (`NotificationServiceOptions`) को mirror करता है और boot पर messaging मॉड्यूल के साथ registered है।

## चैनल escalation chain

Delivery एक स्तर पर शुरू होता है (डिफ़ॉल्ट रूप से 0, या reminders/explicit भेजने के लिए उच्चतर) और केवल अगले चैनल पर जाता है यदि पिछला सफल नहीं हुआ। प्रत्येक स्तर कुछ भी करने का प्रयास करने से पहले `PreferenceGateHelper` द्वारा gated है।

| स्तर | चैनल | व्यवहार |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app` gate पहले checked है। यदि suppressed (muted), पंक्ति `isNew=false` के साथ persist है और delivery पूरी तरह से रुक जाती है — कोई socket ping नहीं, कोई badge नहीं, कोई further escalation नहीं। अन्यथा server व्यक्ति के `alerts` room के लिए खुले socket connections को देखता है और एक `notification` (या `privateMessage`) frame push करता है। सामान्य सूचनाओं के लिए, एक सफल socket delivery chain को यहीं रोक देता है — 30-मिनट का टाइमर unread items को फिर से check करता है और बाद में उन्हें escalate करता है। Direct messages कभी socket पर रुकते नहीं: एक installed PWA alerts socket को background में hold कर सकता है, जो अन्यथा OS-level push को suppress करेगा। |
| 1 | **push** | `allowPush` / category opt-out / quiet hours पर gated। व्यक्ति की `devices` पंक्तियों पर पाए गए Expo push tokens और Web Push subscriptions दोनों को भेजता है, endpoint द्वारा deduplicating और रास्ते में stale tokens को pruning करता है। |
| 2 | **email** | `emailFrequency` और category opt-out पर gated। Immediate भेजने (`emailImmediate`) तुरंत render करते हैं और एक `deliveryLogs` पंक्ति write करते हैं; अन्यथा notification को batch digest के लिए pending छोड़ा जाता है, नीचे described। |
| — | **sms** | Preference plumbing (`allowSms`, per-category channel lists) पहले से एक SMS channel के लिए accounts करता है, लेकिन कोई भी producer आज इसके माध्यम से भेजता नहीं — यह bulk SMS product के लिए reserved रहता है, जो `TextingController` / `@churchapps/texting` के माध्यम से एक separate, siloed flow के रूप में चलता है। workflow **Send Text** step action (`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`) भी इस funnel को bypass करता है: यह church के provider के माध्यम से directly व्यक्ति को texts करता है, इसलिए notification preferences और quiet hours लागू नहीं होते — केवल व्यक्ति की `optedOut` flag को honor किया जाता है। |

Unread notifications को socket या push पर छोड़ा जाता है 30-मिनट के टाइमर द्वारा escalate किया जाता है (`NotificationHelper.escalateDelivery`)। Batch email को `NotificationHelper.sendEmailNotifications(frequency)` द्वारा भेजा जाता है, प्रत्येक व्यक्ति की `emailFrequency` preference द्वारा driven: `individual` 30-मिनट के टाइमर पर चलता है, `daily` nightly टाइमर पर चलता है। (`weekly` एक valid preference value है लेकिन अभी तक कोई dedicated batch run नहीं है।)

## अनुस्मारक इंजन

अनुसूचित reminders — event reminders, task due dates, serving/plan assignment reminders — सभी एक generalized engine के माध्यम से जाते हैं बजाय per-feature cron logic के।

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitions** (`reminderDefinitions`) या तो entity-level हैं (`entityId` set — एक specific event, task, या plan) या scope-level हैं (`entityId` null, `scopeId` set — उदाहरण के लिए एक serving plan type के तहत हर plan)। एक definition minute offsets का एक CSV carry करता है (`offsets`, उदाहरण के लिए `"1440,60"` एक दिन और एक घंटा पहले के लिए), एक local send time (`sendLocalTime`), channels का एक CSV (`channels` — including `email` एक send time पर immediate rich email को trigger करता है), एक `recipientMode`, और एक optional custom `message`।

**Expansion** आगे के horizon के लिए fire rows को materialize करता है (एक rolling multi-day window)। यह nightly timer पर चलता है, और synchronously जब भी एक definition को save किया जाता है तो एक last-minute event के लिए reminder अभी भी fire होता है। Scope definitions adapter के `loadScopeEntities` के माध्यम से fan out करते हैं, प्रत्येक concrete entity के लिए एक occurrence set produce करते हैं; entity-level occurrences key `definitionId:occurrenceISO:offset` का उपयोग करते हैं, जबकि scoped occurrences entity id द्वारा namespace करते हैं तो वे कभी collide नहीं करते। एक occurrence को upsert करना एक previously-cancelled पंक्ति को **resurrects** करता है — cancel-then-re-expand underlying entity परिवर्तन के बाद एक reminder को re-sync करने का standard तरीका है; पंक्तियां जो पहले से `sent`, `failed`, या `processing` हैं untouched छोड़ी जाती हैं।

**Dispatch** (`ReminderEngine.scan()`) 30-मिनट के टाइमर पर चलता है। यह due occurrences को claim करता है (एक lease double-processing को prevent करता है), entity के adapter के माध्यम से recipients को load करता है, किसी को भी पहले से `reminderSentLog` में recorded के out को filter करता है, और `createNotifications` को `deliveryStartLevel: 1` (socket को skip straight to push) के साथ कॉल करता है साथ ही `emailImmediate`/`emailByPerson` जब definition के channels email को include करते हैं।

एक internal event bus entity mutations पर reacts nightly expansion के लिए wait किए बिना: content events (webhook dispatcher के माध्यम से) और plan/task update events affected entity के लिए immediate re-expansion या cancellation को trigger करते हैं, और एक plan update अपने plan type के लिए tied किए गए scope definitions को भी re-expand करता है।

### Adapters

Engine entity-agnostic है; प्रत्येक supported entity type एक adapter (`helpers/adapters/`) के माध्यम से plug करता है:

| Entity type | Adapter | Notes |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Recipients को event और `recipientMode` के आधार पर registrants या group members के लिए scoped किया जाता है। |
| `plan` | `PlanReminderAdapter` | Recipients Accepted + Unconfirmed plan assignments हैं। `buildEmails` `DoingModuleGateway.buildPlanReminderEmails` में कॉल करता है, जो `doing/helpers/PlanReminderEmailHelper` के माध्यम से positions, notes, और एक custom message को render करता है, `ReminderTokenHelper` द्वारा signed Accept/Decline buttons सहित जो एक public assignment-response endpoint को post करते हैं। |
| `task` | `TaskReminderAdapter` | Recipients task के assignee(s) हैं। |

### Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | एक entity के लिए reminder definition को load या save करें। |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | एक scope-level (inherited) reminder definition को load या save करें। |
| `DELETE` | `/messaging/reminders/:defId` | एक definition को delete करें और इसके pending occurrences को cancel करें। |
| `GET` | `/messaging/reminders/event/:eventId/preview` | एक event reminder के लिए recipient count और अगले fire times को preview करें save करने से पहले। |
| `GET` | `/messaging/reminders/log` | एक church के लिए recent reminder occurrence history। |
| `POST` | `/messaging/reminders/mute` | एक specific entity के लिए reminders को mute करें। |

एक definition को save करना उस entity या scope के लिए एक synchronous re-expansion को trigger करता है, इसलिए editors को updated "next fires" देखते हैं nightly job के लिए wait किए बिना।

## Direct messages

Direct messages same funnel के रूप में ride करते हैं सब कुछ के समान बजाय एक separate escalation path के। प्रत्येक unread conversation को एक **shadow row** मिलता है `notifications` में (`contentType='privateMessage'`, `contentId` = private message id, `category='direct_messages'`) जो सभी delivery state को own करता है — socket/push/email escalation, read tracking, सब कुछ। `privateMessages` table itself message payload को keep करता है और एक `notifyPersonId` column, जो unread badge का source है और recipient द्वारा conversation को read करने पर clear होता है।

Shadow rows notification bell के लिए invisible हैं: वे unread count query, notification list query, और mark-read/delete queries से excluded हैं, सभी `contentType <> 'privateMessage'` को filter करते हैं। प्रत्येक DM ping socket को regardless of unread state के बावजूद hit करता है (live chat semantics — कोई dedup नहीं), और DMs कभी socket delivery के तरीके सामान्य notifications को नहीं रोकते, क्योंकि एक backgrounded PWA एक socket को hold कर सकता है जबकि अभी भी एक OS-level push की आवश्यकता है। यदि कोई व्यक्ति DM notifications को mute करता है, shadow row को park किया जाता है (`isNew=false`, `notifyPersonId` cleared) — अभी भी conversation के अंदर visible, बस badges या alerts के बिना।

## Preferences और gating

हर भेजना `PreferenceGateHelper.evaluate()` के माध्यम से जाता है, एक pure function (सभी state passed in, hot path पर कोई DB calls नहीं) जो `allow`, `suppress`, या `defer` को return करता है। Layers order में चलते हैं, और पहला जो decide करता है wins:

1. **Locked category** — कुछ categories mandatory हैं (tier 0) और हर दूसरे layer को bypass करते हैं।
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms`, या `emailFrequency='never'` outright को suppress करते हैं।
3. **Quiet hours** — push और SMS only (email को non-intrusive माना जाता है)। यदि wall-clock time person के timezone में उनके quiet window में fall करता है, एक transactional category अभी भी through होता है; एक non-transactional one quiet window के end के लिए deferred होता है, `TimezoneHelper.wallClockToUtc` के माध्यम से DST-correct UTC instant के रूप में computed।
4. **Per-category preference override** — एक explicit opt-out एक category × channel pair के लिए; absence का मतलब category का default है।
5. **Per-entity mute** — एक mute एक specific entity के against recorded (उदाहरण के लिए एक event, एक plan) further restrict करता है category-level setting से, लेकिन केवल apply होता है जब caller एक entity id/type को notification के साथ supply करता है।

Tables involved: `notificationPreferences` (global — `masterMute`, `emailFrequency` of `individual|daily|weekly|never`, `allowPush`, quiet-hours window + timezone, `allowSms`), `notificationPreferenceOverrides` (per category × channel), और `notificationEntityMutes` (per entity)।

यह gate in-app (level 0), push (level 1), और email (level 2) के अंदर funnel में enforced होता है — including immediate reminder/digest emails। Transactional email (auth codes, password resets, invites, donation receipts) design के द्वारा bypass होता है; दूसरे door का पूरा point है।

## Church-authored email limits

Email जिसका content church ने written किया shared ChurchApps SES identity से जाता है, तो यह `Api/src/shared/helpers/ChurchEmailLimiter.ts` द्वारा per church metered है। चार paths इसे कॉल करते हैं: group/template sends (`EmailTemplateController`, content type `email`), form follow-up emails (`FormSubmissionController`, `formFollowUp`), workflow **Send email** actions (`NotificationHelper` के साथ `churchAuthored`, `workflowEmail`), और B1 account invites (`UserController.sendInviteEmail`, `invite`)। System mail (auth codes, receipts, reminders) metered नहीं है।

- **Approval gate.** एक church कुछ नहीं भेजता जब तक एक server admin `churches.emailApprovedDate` को set नहीं करता (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** chip)। Archived churches हमेशा blocked हैं। B1Admin का Send Email dialog `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) को read करता है और, जब unapproved, एक **Request review** card को editor के बजाय दिखाता है। `POST /messaging/emailTemplates/requestApproval` support को emails करता है, at most once per church per week।
- **Earned allowance.** एक approved church को `max(150, 2 × its best church-authored day in the prior 30 days)` मिलता है, rolling 24 hours पर 2,000 में capped। Current 24 hours "best day" से excluded हैं तो एक burst अपनी स्वयं की limit को raise नहीं कर सकता।
- **Reserve, then settle.** `reserve()` sending से पहले per recipient को एक `deliveryLogs` पंक्ति write करता है, allowance को re-check करता है उन rows counted के साथ, और if two requests limit के past raced (send 429 को return करता है) को back out करता है। `settle()` प्रत्येक row को sent या failed के रूप में marks करता है।
- **Complaint pause.** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS द्वारा fed), प्रत्येक permanent bounce या complaint को church के pin करता है जिसका church-authored email उस address को reach किया around that time में, `deliveryMethod` `sesBounce` / `sesComplaint` के रूप में stored। एक church को 2+ complaints (≥ 0.3% of sends) या 10+ hard bounces (≥ 5%) over 7 days में pause किया जाता है।

## Scheduling

Reminder engine और notification digest दोनों new infrastructure introduce करने की बजाय existing scheduled timers पर ride करते हैं:

| Timer | Schedule | Runs |
|-------|----------|------|
| 30-minute timer | every 30 minutes | Unread notifications को escalate करें; `individual`-frequency digest emails भेजें; due reminder occurrences को dispatch करें (`ReminderEngine.scan`); approval digests; due automation executions |
| Nightly timer | 05:00 UTC | Group attendance reminders; advance करें recurring streaming services; refresh करें auto-refresh lists; reminder occurrences को expand करें next horizon के लिए (`ReminderEngine.expandAll`); `daily`-frequency digest emails भेजें |

Locally, same logic को demand पर `Api` project से `npm run timer:30min` और `npm run timer:midnight` के साथ trigger किया जा सकता है।

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

- [Real-time Architecture](../realtime) — the WebSocket protocol और client primitives (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) जो in-app delivery level ride करता है
- [Web Push Notifications](../web-push) — VAPID setup और browser Push API path push escalation level द्वारा used
- [Messaging Endpoints](../api/endpoints/messaging) — full REST surface messages, conversations, connections, और notification/reminder routes के लिए
