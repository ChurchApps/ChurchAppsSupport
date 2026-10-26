---
title: "Arkitektura ng Notification at Paalala"
---

# Arkitektura ng Notification at Paalala

<div class="article-intro">

Bawat mensaheng nakikita ng miyembro ng simbahan sa labas ng pahinang kasalukuyan nilang tinitingnan — isang badge count, isang push notification, isang digest email — ay dumadaan sa isa sa dalawang pinto sa MessagingApi. Dokumentado sa pahinang ito ang funnel, ang reminder engine na nagpapakain dito ayon sa iskedyul, at ang preference model na nagpapasya kung ano talaga ang nakakarating sa isang tao.

</div>

## Pangkalahatang-tanaw — dalawang pinto

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Anumang nagsasabi sa isang tao ng isang bagay** ay dumadaan sa `NotificationHelper.createNotifications()` sa messaging module. Nagse-save ito ng row sa `notifications` at umaakyat mula socket → push → email, habang sinusuri ang `PreferenceGateHelper` para sa bawat channel — kasama ang `in_app` sa level 0.
2. **Anumang naka-iskedyul** ay isang `reminderDefinition` (entity-level o scope-level) na pinalalawak sa `reminderOccurrences` at ipinapadala ng `ReminderEngine.scan()` sa paulit-ulit na timer. Isang expander, isang dispatcher, at isang send ledger (`reminderSentLog`).
3. **Direktang email** ay umiiral lamang sa likod ng `TransactionalEmailHelper.sendTransactional()`. Ipinatutupad ito ng ESLint rule sa compile time — tingnan sa ibaba.

:::tip Ipinapatupad ng lint ang email door, hindi lang kumbensiyon
Tinutukoy ng `Api/tools/eslint-rules/email-door.cjs` ang `no-direct-email-helper`: ang anumang tawag sa `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` sa labas ng `NotificationHelper.ts` o `TransactionalEmailHelper.ts` ay babagsak sa lint. Kung kailangan mong magpadala ng email, dumaan ito sa funnel (`createNotifications` na may `emailImmediate`) o sa `TransactionalEmailHelper.sendTransactional()` — walang ikatlong paraan na makakapasa sa CI.
:::

## Ang notification funnel

Ang `NotificationHelper.createNotifications()` ang iisang entry point para sa anumang hindi naka-iskedyul o transactional:

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

Para sa bawat tatanggap, nagse-save ito ng row sa `notifications` at tinatawag ang `attemptDeliveryWithEscalation`, na dumadaan sa channel ladder sa ibaba. Kapag may umiiral pang hindi nababasang row para sa parehong `(contentType, contentId)`, hindi na ito muling gagawin — nilalaktawan ang dedup guard na ito para sa mga `emailImmediate` na send (reminder offsets, "email all" ng staff, mga workflow step na sila mismo ang may sariling dedup) at para sa direct messages, na laging nagpapa-ping sa socket.

Sinasalamin ng `shared/helpers/NotificationService.ts` ang parehong signature (`NotificationServiceOptions`) para sa mga tumatawag mula sa labas ng messaging module, at nire-register ito sa messaging module sa boot.

## Channel escalation chain

Nagsisimula ang delivery sa isang level (0 bilang default, o mas mataas para sa mga paalala/tahasang send) at lumilipat lamang sa susunod na channel kapag hindi nagtagumpay ang nauna. Bawat level ay dinadaanan muna ng `PreferenceGateHelper` bago subukan.

| Level | Channel | Gawi |
|-------|---------|------|
| 0 | **in_app / socket** | Unang sinusuri ang `in_app` gate. Kapag napigilan (naka-mute), nase-save ang row na may `isNew=false` at tuluyang humihinto ang delivery — walang socket ping, walang badge, walang karagdagang escalation. Kung hindi, hahanapin ng server ang mga bukas na socket connection ng `alerts` room ng tao at magpapadala ng `notification` (o `privateMessage`) na frame. Para sa karaniwang notification, kapag nagtagumpay ang socket delivery, dito humihinto ang chain — muling susuriin ng 30-minutong timer ang mga hindi pa nababasang item at ie-escalate ang mga ito sa bandang huli. Hindi kailanman humihinto sa socket ang direct messages: maaaring panatilihing bukas ng naka-install na PWA ang alerts socket sa background, na kung hindi ay pipigil sa OS-level push. |
| 1 | **push** | Nakabatay sa `allowPush` / category opt-out / quiet hours. Nagpapadala sa parehong Expo push token at Web Push subscription na nasa `devices` rows ng tao, dinededup ayon sa endpoint at tinatanggal ang mga lumang token habang dumadaan. |
| 2 | **email** | Nakabatay sa `emailFrequency` at category opt-out. Agad na nire-render ang mga immediate send (`emailImmediate`) at nagsusulat ng `deliveryLogs` row; kung hindi, nananatiling pending ang notification para sa batch digest, na ipinaliwanag sa ibaba. |
| — | **sms** | Hindi ito level sa escalation ladder. Ang tanging gated na SMS producer ay ang reminder engine: kapag kasama sa `channels` ng isang definition ang `sms`, tinetext ng `ReminderEngine.sendSms()` ang bawat tatanggap **bilang karagdagan sa** push/email notification (tingnan ang [Text reminders](#text-reminders)). Ang bulk texting (`TextingController` / `@churchapps/texting`), ang serving overview na **Text Volunteers** send (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), at ang workflow na **Send Text** step action (`StepActionHelper.sendText` → `sendPersonText`) ay direktang nagte-text sa pamamagitan ng provider ng simbahan, kaya hindi nalalapat sa kanila ang notification preferences at quiet hours — ang `optedOut` flag lamang ng tao ang iginagalang. |

Ang mga hindi pa nababasang notification na naiwan sa socket o push ay ie-escalate ng 30-minutong timer (`NotificationHelper.escalateDelivery`). Ang batch email ay ipinapadala ng `NotificationHelper.sendEmailNotifications(frequency)`, na pinapatakbo ng `emailFrequency` preference ng bawat tao: tumatakbo ang `individual` sa 30-minutong timer, at ang `daily` ay tumatakbo sa nightly timer. (Valid na preference value ang `weekly` pero wala pa itong sariling batch run.)

## Reminder Engine

Ang mga naka-iskedyul na paalala — event reminders, task due dates, serving/plan assignment reminders — ay dumadaan lahat sa iisang pangkalahatang engine sa halip na sariling cron logic ng bawat feature.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitions** (`reminderDefinitions`) ay alinman sa entity-level (`entityId` ang nakatakda — isang partikular na event, task, o plan) o scope-level (`entityId` ay null, `scopeId` ang nakatakda — hal., bawat plan sa ilalim ng isang serving plan type). Ang definition ay may dalang CSV ng minute offsets (`offsets`, hal. `"1440,60"` para sa isang araw at isang oras bago), lokal na oras ng pagpapadala (`sendLocalTime`), CSV ng channels (`channels` — kasama ang `email`, na nagti-trigger ng agarang rich email sa oras ng pagpapadala), `recipientMode`, at opsyonal na custom na `message`.

Ang **Expansion** ay gumagawa ng fire rows para sa darating na horizon (isang rolling na ilang-araw na window). Tumatakbo ito sa nightly timer, at kaagad din tuwing may na-save na definition, para tumunog pa rin ang paalala ng event na nakaiskedyul sa huling sandali. Ang scope definitions ay nagfa-fan out sa pamamagitan ng `loadScopeEntities` ng adapter, na gumagawa ng isang set ng occurrence bawat konkretong entity; ang entity-level occurrences ay gumagamit ng key na `definitionId:occurrenceISO:offset`, habang ang scoped occurrences ay nagnenamespace ayon sa entity id para hindi magbanggaan. Ang pag-upsert ng occurrence ay **nagbabalik** ng dating kinansel na row — ang cancel-then-re-expand ang karaniwang paraan para i-sync muli ang isang paalala pagkatapos magbago ang underlying entity; ang mga row na `sent`, `failed`, o `processing` ay hindi ginagalaw.

Ang **Dispatch** (`ReminderEngine.scan()`) ay tumatakbo sa 30-minutong timer. Kinukuha nito ang mga occurrence na dapat nang ipadala (may lease para hindi ito maproseso nang dalawang beses), kinukuha ang mga tatanggap sa pamamagitan ng adapter ng entity, sinasala ang sinumang nakatala na sa `reminderSentLog` para sa occurrence na iyon, at tinatawag ang `createNotifications` na may `deliveryStartLevel: 1` (diretsong lumaktaw sa push) kasama ang `emailImmediate`/`emailByPerson` kapag kasama sa channels ng definition ang email.

### Mga text reminder

Kapag kasama sa `channels` ng isang definition ang `sms`, tinatawag ng `scan()` ang `ReminderEngine.sendSms()` pagkatapos malikha ang push/email notification, para sa parehong bagong tatanggap. Opt-in ang pagte-text sa bawat miyembro:

- Dumadaan ang bawat tatanggap sa `PreferenceGateHelper.evaluate(..., "sms", ...)`, kaya dapat naka-on ang `allowSms` (naka-off ito bilang default at itinatakda mula sa **Text messages** switch ng B1App) at hindi naka-override na naka-off ang `sms` channel ng category. Nakalista ang `sms` sa `defaultChannels` at `allowedChannels` ng `event_reminders`, `serving_schedule`, at `tasks`.
- Sinusupil ang mga taong walang `mobilePhone` o may nakatakdang `optedOut`. Kapag walang texting provider ang simbahan, sinusupil ang natitirang batch na may dahilang `no_provider`.
- Binubuo ang katawan ng mensahe ng `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, pinutol upang magkasya sa isang 160-character na segment.
- Bawat tatanggap ay may sariling `reminderSentLog` row na may `channel: "sms"` at status na `sent` / `suppressed` / `failed`, hiwalay sa push/email row, kaya hindi na uulitin ang push o email kapag pumalya ang text.

Ipinapakita lamang ng mga editor ang **Text** kapag ang `GET /messaging/texting/status` ay nagbabalik ng `{ enabled: true }` (naka-enable ang unang texting provider ng simbahan).

**STOP opt-out.** Ang `POST /messaging/texting/inbound/:churchId/:token` ay isang anonymous na webhook na ipinapaste ng simbahan sa provider nito (ipinapakita ng B1Admin ang URL mula sa `GET /messaging/texting/inboundUrl` sa texting settings). Ang token ay HMAC ng church id (`SmsOptOutHelper.token`). Tinatanggap ng `SmsOptOutHelper.parse` ang mga form field na istilong Twilio at ang JSON na istilong Clearstream/TextInChurch; kapag ang reply ay eksaktong carrier stop word (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), bawat taong hindi tinanggal sa simbahan na tumutugma ang mobile number ay makakakuha ng `people.optedOut = true` at `allowSms = false`. Kinikilala lamang at binabalewala ang ibang reply.

Tumutugon ang isang internal event bus sa mga pagbabago ng entity nang hindi naghihintay sa nightly expansion: ang mga content event (sa pamamagitan ng webhook dispatcher) at mga plan/task update event ay nagti-trigger ng agarang muling expansion o pagkansel para sa apektadong entity, at ang plan update ay muling nag-e-expand din ng anumang scope definition na nakatali sa plan type nito.

### Mga adapter

Hindi nakadepende sa uri ng entity ang engine; bawat suportadong uri ng entity ay kumokonekta sa pamamagitan ng adapter (`helpers/adapters/`):

| Uri ng entity | Adapter | Mga tala |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Ang mga tatanggap ay limitado sa mga registrant o miyembro ng grupo, depende sa event at `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Ang mga tatanggap ay ang Accepted at Unconfirmed na assignment sa mga nai-publish na (hindi draft) plan. Hindi kasama ang mga Unconfirmed na assignment na inilabas sa pamamagitan ng serving confirmation workflow hanggang tanggapin ang mga ito (tingnan sa ibaba). Tumatawag ang `buildEmails` sa `DoingModuleGateway.buildPlanReminderEmails`, na nagre-render ng mga posisyon, tala, at custom na mensahe sa pamamagitan ng `doing/helpers/PlanReminderEmailHelper`, kasama ang Accept/Decline na button na nilagdaan ng `ReminderTokenHelper` at nagpo-post sa pampublikong assignment-response endpoint. |
| `task` | `TaskReminderAdapter` | Ang mga tatanggap ay ang assignee ng task. |

### Mga endpoint

| Method | Path | Layunin |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | I-load o i-save ang reminder definition para sa isang entity. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | I-load o i-save ang scope-level (namamanang) reminder definition. |
| `DELETE` | `/messaging/reminders/:defId` | Burahin ang isang definition at kanselahin ang mga nakabinbing occurrence nito. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Silipin ang bilang ng tatanggap at ang mga susunod na oras ng pagpapaputok para sa event reminder bago i-save. |
| `GET` | `/messaging/reminders/log` | Kamakailang kasaysayan ng reminder occurrence para sa isang simbahan. |
| `POST` | `/messaging/reminders/mute` | I-mute ang mga paalala para sa isang partikular na entity. |

Kapag na-save ang isang definition, nagti-trigger ito ng synchronous na muling expansion para sa entity o scope na iyon, kaya nakikita ng mga editor ang up-to-date na "next fires" nang hindi naghihintay sa nightly job.

## Direct messages

Sumasakay ang direct messages sa parehong funnel tulad ng lahat, sa halip na sa hiwalay na escalation path. Bawat hindi pa nababasang usapan ay nakakakuha ng isang **shadow row** sa `notifications` (`contentType='privateMessage'`, `contentId` = ang id ng private message, `category='direct_messages'`) na nagmamay-ari ng lahat ng estado ng delivery — socket/push/email escalation, read tracking, lahat. Hawak pa rin ng `privateMessages` table ang payload ng mensahe at isang `notifyPersonId` column, na pinagmumulan ng unread badge at nililinis kapag nabasa ng tatanggap ang usapan.

Hindi nakikita ng notifications bell ang mga shadow row: hindi sila kasama sa unread count query, sa notification list query, at sa mark-read/delete queries, na lahat ay nagfi-filter ng `contentType <> 'privateMessage'`. Bawat DM ping ay napupunta sa socket anuman ang unread state (live chat semantics — walang dedup), at hindi humihinto sa socket delivery ang mga DM gaya ng karaniwang notification, dahil maaaring panatilihing bukas ng naka-background na PWA ang socket habang kailangan pa rin ng OS-level push. Kung i-mute ng tao ang DM notifications, ipinapahinto ang shadow row (`isNew=false`, nililinis ang `notifyPersonId`) — nakikita pa rin sa loob mismo ng usapan, pero walang badge o alerto.

## Preference at gating

Dumadaan ang bawat send sa `PreferenceGateHelper.evaluate()`, isang pure function (lahat ng estado ay ipinapasa mula sa labas, walang DB call sa hot path) na nagbabalik ng `allow`, `suppress`, o `defer`. Tumatakbo ang mga layer ayon sa pagkakasunod-sunod, at ang unang layer na makapagdedesisyon ang nananalo:

1. **Locked category** — may ilang category na sapilitan (tier 0) at nilalampasan ang lahat ng ibang layer.
2. **Master mute / channel kill** — ang `masterMute`, `allowPush`, `allowSms` (naka-off bilang default — kailangang mag-opt in ang mga miyembro), o `emailFrequency='never'` ay direktang nagsusupil.
3. **Quiet hours** — push at SMS lamang (itinuturing na hindi nakakaabala ang email). Kapag nasa quiet window ng tao ang kasalukuyang oras sa kanilang timezone, nakakalusot pa rin ang transactional category; ang hindi transactional ay ipinagpapaliban hanggang sa dulo ng quiet window, na kinakalkula bilang DST-correct na UTC instant sa pamamagitan ng `TimezoneHelper.wallClockToUtc`.
4. **Per-category preference override** — tahasang opt-out para sa isang pares ng category × channel; ang kawalan nito ay nangangahulugang ang default ng category.
5. **Per-entity mute** — ang mute na naitala sa isang partikular na entity (hal. isang event, isang plan) ay naglilimita nang higit pa sa setting sa antas ng category, pero nalalapat lamang kapag ang tumatawag ay nagbigay ng entity id/type kasama ng notification.

Mga talahanayang kasangkot: `notificationPreferences` (global — `masterMute`, `emailFrequency` na `individual|daily|weekly|never`, `allowPush`, quiet-hours window + timezone, `allowSms`), `notificationPreferenceOverrides` (bawat category × channel), at `notificationEntityMutes` (bawat entity).

Ipinatutupad ang gate na ito para sa in-app (level 0), push (level 1), at email (level 2) sa loob ng funnel — kasama ang mga agarang reminder/digest email — at para sa mga text reminder sa `ReminderEngine.sendSms()`. Sinasadyang nilalampasan ng transactional email (auth code, password reset, imbitasyon, resibo ng donasyon) ang gate na ito; iyon mismo ang punto ng pangalawang pinto.

### Mga serving confirmation workflow

Maaaring mag-opt in ang isang plan sa `workflowType = "assignmentConfirmation"` workflow (`plans.confirmationWorkflowId`). Kapag pinindot ang Publish/Notify, tinatawag nito ang `POST /doing/plans/:id/issueRequests` sa halip na ang per-assignment na notification: bawat bagong Unconfirmed na assignment ay nakakakuha ng `notified` + `confirmationWorkflowId` at isang workflow card (`tasks.assignmentId`, natatanging `followupKey`). Nagpapadala ang card ng app-only na alerto (`appOnly: true` — walang push/email escalation), at pagkatapos ay pinapatakbo ang mga `sendAssignmentRequest` action ng workflow, na dumadaan sa `MessagingModuleGateway.sendServingWorkflowMessage`: email sa pamamagitan ng `NotificationHelper.sendWorkflowEmail` (preference gate + `ChurchEmailLimiter`, minemeter bilang `workflowEmail`), SMS sa pamamagitan ng `sendPersonText` kapag may `allowSms` lamang at ng `serving_schedule` category gate. Isinasara ng Accept/Decline (`assignment.updated` sa event bus) ang card; inaayos ng 30-minutong timer (`AssignmentWorkflowHelper.processPending`) ang mga nalaktawang simula at event, at ginagawang leader review task ang hindi nasagot na request sa deadline ng follow-up. Buong lifecycle: `Api/docs/assignment-confirmation-workflows.md`.

## Mga limitasyon sa email na isinulat ng simbahan

Ang email na ang nilalaman ay isinulat ng simbahan ay lumalabas mula sa ibinahaging ChurchApps SES identity, kaya minemeter ito bawat simbahan ng `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Apat na landas ang tumatawag dito: group/template send (`EmailTemplateController`, content type na `email`), form follow-up email (`FormSubmissionController`, `formFollowUp`), workflow na **Send email** action (`NotificationHelper` na may `churchAuthored`, `workflowEmail`), at serving confirmation request email (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Hindi minemeter ang system mail (auth code, resibo, paalala) at ang role at group invite (`UserController.sendInviteEmail`, isang nakapirming template).

- **Approval gate.** Walang ipinapadala ang simbahan hangga't hindi nagtatakda ang server admin ng `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** chip). Palaging hinaharangan ang mga archived na simbahan. Binabasa ng Send Email dialog ng B1Admin ang `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) at, kapag hindi pa aprubado, nagpapakita ng **Request review** card sa halip na editor. Binabasa ng workflow step editor ang parehong endpoint (bukas din sa `tasks.admin` bukod sa `groupMembers.edit`) para magbabala sa mga **Send email** action kapag hindi aprubado o naka-pause ang simbahan. Sa oras ng pagpapadala, nagbabalik ang `MessagingModuleGateway.sendTemplatedEmail` ng `false` nang walang ginagawang notification kapag ang `ChurchEmailLimiter.remaining()` ay mas mababa sa 1, para hindi magsabi ang kasaysayan ng card ng **Email sent** para sa mail na naibagsak. Ang `POST /messaging/emailTemplates/requestApproval` ay nagpapadala ng email sa support, nang hindi hihigit sa isang beses bawat simbahan bawat linggo.
- **Kinitang allowance.** Ang aprubadong simbahan ay nakakakuha ng `max(150, 2 × ang pinakamahusay nitong araw ng church-authored sa nakaraang 30 araw)`, na may takip na 2,000 bawat rolling na 24 oras. Hindi isinasama sa "best day" ang kasalukuyang 24 oras, para hindi nito mapataas ang sariling limitasyon ang isang biglaang pagdagsa.
- **Reserve, pagkatapos settle.** Nagsusulat ang `reserve()` ng isang `deliveryLogs` row bawat tatanggap bago magpadala, muling tinitingnan ang allowance kasama ang mga row na iyon na nabibilang, at umaatras kapag dalawang request ang nakalampas sa limitasyon nang sabay (nagbabalik ang send ng 429). Minamarkahan ng `settle()` ang bawat row bilang sent o failed.
- **Pause dahil sa reklamo.** Ang `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, pinapakain ng SES → SNS) ay ikinakabit ang bawat permanenteng bounce o reklamo sa simbahang ang church-authored email ay umabot sa address na iyon sa paligid ng panahong iyon, na iniimbak bilang `deliveryMethod` na `sesBounce` / `sesComplaint`. Napapausan ang isang simbahan kapag may 2+ reklamo (≥ 0.3% ng mga send) o 10+ hard bounce (≥ 5%) sa loob ng 7 araw.

## Pag-iiskedyul

Parehong sumasakay ang reminder engine at ang notification digest sa mga umiiral nang naka-iskedyul na timer sa halip na magpakilala ng bagong imprastraktura:

| Timer | Iskedyul | Tumatakbo |
|-------|----------|-----------|
| 30-minutong timer | bawat 30 minuto | I-escalate ang mga hindi pa nababasang notification; magpadala ng `individual`-frequency na digest email; i-dispatch ang mga nakatakdang reminder occurrence (`ReminderEngine.scan`); mga approval digest; mga nakatakdang automation execution |
| Nightly timer | 05:00 UTC | Mga paalala sa attendance ng grupo; i-advance ang mga recurring streaming service; i-refresh ang mga auto-refresh list; i-expand ang mga reminder occurrence para sa susunod na horizon (`ReminderEngine.expandAll`); magpadala ng `daily`-frequency na digest email |

Sa lokal, maaaring i-trigger ang parehong lohika kapag hiniling gamit ang `npm run timer:30min` at `npm run timer:midnight` mula sa `Api` project.

## Listahan ng mga file

| Lugar | Mga file |
|------|------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Shared entry | `Api/src/shared/helpers/NotificationService.ts` |
| Transactional door | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| Mga limitasyon sa email ng simbahan | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Reminder engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Texting / STOP opt-out | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (serving overview **Text Volunteers**) |
| Reminder repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving/plan email | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Reminder editors (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Reminder editor / preference (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Mga Kaugnay na Pahina

- [Real-time Architecture](../realtime) — ang WebSocket protocol at mga client primitive (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) na sinasakyan ng in-app delivery level
- [Web Push Notifications](../web-push) — VAPID setup at ang browser Push API path na ginagamit ng push escalation level
- [Messaging Endpoints](../api/endpoints/messaging) — kumpletong REST surface para sa mga message, conversation, connection, at notification/reminder route
