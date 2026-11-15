---
title: "Arkitektura ng Notification at Paalala"
description: "Paano dinidirekta ng B1 Admin API ang mga notification, naka-iskedyul na paalala, limitasyon sa email ng simbahan, at mga opt-out sa text sa pamamagitan ng iisang delivery funnel at preference gate."
---

# Arkitektura ng Notification at Paalala

<div class="article-intro">

Bawat mensaheng nakikita ng miyembro sa labas ng pahinang kasalukuyan nilang tinitingnan -- isang badge count, push notification, o digest email -- ay dumaraan sa isa sa dalawang pinto ng MessagingApi. Dokumentado sa pahinang ito ang funnel, ang reminder engine na nagpapakain dito ayon sa iskedyul, at ang modelo ng preference na nagpapasya kung ano talaga ang makakarating sa isang tao.

</div>

## Pangkalahatang-tanaw -- dalawang pinto {#overview--two-doors}

```
anumang naka-iskedyul ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
naka-iskedyul na staff push ─▶ scheduledNotifications (1-minute timer) ──────┤
chat / request / workflow / bulk send ───────────────────────────────────────┼─▶ createNotifications()
                                                                             │    in_app gate → socket → push → email
     (kasama sa reminder channel ang sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() sa pamamagitan ng provider ng simbahan
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Anumang nagsasabi ng isang bagay sa isang tao** ay dumaraan sa `NotificationHelper.createNotifications()` sa messaging module. Nagsa-save ito ng row sa `notifications` at nagre-escalate mula socket papuntang push papuntang email, at sinusuri ang `PreferenceGateHelper` para sa bawat channel -- kasama ang `in_app` sa level 0.
2. **Anumang naka-iskedyul** ay isang `reminderDefinition` (entity-level o scope-level) na pinalalawak sa `reminderOccurrences` at ipinapadala ng `ReminderEngine.scan()` sa isang paulit-ulit na timer. Isang expander, isang dispatcher, isang send ledger (`reminderSentLog`). Ang tanging eksepsiyon ay ang staff push na naka-iskedyul mula sa pahinang **Mobile > Push Notifications** ng B1Admin o sa dialog na **Notify** ng grupo: ito ay row sa `scheduledNotifications` (audience na `church` o `group`), na ipinapadala ng `ScheduledNotificationHelper.dispatchDue()` sa 1-minutong timer. Ang row na lampas nang 30 minuto sa `sendAt` nito sa unang pagsubok ay minamarkahang pumalya na may `missed send window` sa halip na ipadala nang huli, at ang pumalyang pagpapadala ay sinusubukan muli hanggang 3 beses. Tinutukoy ang mga tatanggap sa oras ng pagpapadala ng `PushAudienceHelper`, ang parehong helper na ginagamit ng agarang group send, at ipinapadala sa pamamagitan ng `createNotifications()` bilang `churchPushNotification` (preference category `announcements`) o `groupPushNotification`.
3. **Direktang email** ay umiiral lamang sa likod ng `TransactionalEmailHelper.sendTransactional()`. Ipinapatupad ng ESLint rule ang panuntunang ito sa compile time -- tingnan sa ibaba.

:::tip Ang email door ay ipinapatupad ng lint, hindi lamang ng kombensyon
Tinutukoy ng `Api/tools/eslint-rules/email-door.cjs` ang `no-direct-email-helper`: anumang tawag sa `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` sa labas ng `NotificationHelper.ts` o `TransactionalEmailHelper.ts` ay pumapalya sa lint. Kung kailangan mong magpadala ng email, idaan ito sa funnel (`createNotifications` na may `emailImmediate`) o sa `TransactionalEmailHelper.sendTransactional()` -- walang ikatlong paraan na pumapasa sa CI.
:::

## Ang notification funnel {#the-notification-funnel}

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

Para sa bawat tatanggap, nagsa-save ito ng row sa `notifications` at tinatawag ang `attemptDeliveryWithEscalation`, na dumaraan sa channel ladder sa ibaba. Pinipigilan ng umiiral pang hindi nababasang row para sa parehong `(contentType, contentId)` ang muling paggawa -- nilalaktawan ang dedup guard na ito para sa mga `emailImmediate` na send (mga offset ng paalala, "email all" ng staff, mga hakbang ng workflow na sariling dedup ang pinamamahalaan) at para sa direct message, na palaging nagpi-ping sa socket.

Ginagaya ng `shared/helpers/NotificationService.ts` ang parehong signature (`NotificationServiceOptions`) para sa mga caller sa labas ng messaging module at nakarehistro sa messaging module sa boot.

## Channel escalation chain {#channel-escalation-chain}

Nagsisimula ang paghahatid sa isang level (0 bilang default, o mas mataas para sa mga paalala/tahasang send), at lumilipat lamang sa susunod na channel kung hindi nagtagumpay ang nauna. Bawat level ay sinusuri ng `PreferenceGateHelper` bago may subukan.

| Level | Channel | Gawi |
|-------|---------|----------|
| 0 | **in_app / socket** | Unang sinusuri ang `in_app` gate. Kung napigilan (naka-mute), ang row ay ise-save na may `isNew=false` at titigil nang buo ang paghahatid -- walang socket ping, walang badge, walang karagdagang escalation. Kung hindi, hinahanap ng server ang mga bukas na socket connection sa `alerts` room ng tao at nagpapadala ng frame na `notification` (o `privateMessage`). Para sa karaniwang notification, kapag nagtagumpay ang socket delivery, dito humihinto ang chain -- muling sinusuri ng 30-minutong timer ang mga hindi pa nababasang item at saka nire-escalate ang mga ito. Hindi kailanman humihinto sa socket ang direct message: maaaring panatilihing bukas ng naka-install na PWA ang alerts socket sa background, na kung hindi ay magpipigil sa OS-level push. |
| 1 | **push** | Nakabatay sa `allowPush` / pag-opt out sa kategorya / quiet hours. Nagpapadala sa parehong Expo push token at Web Push subscription na nasa `devices` row ng tao, nagde-deduplicate ayon sa endpoint at nagtatanggal ng mga lumang token habang nagpapatuloy. |
| 2 | **email** | Nakabatay sa `emailFrequency` at pag-opt out sa kategorya. Ang agarang send (`emailImmediate`) ay nire-render kaagad at nagsusulat ng row sa `deliveryLogs`; kung hindi, ang notification ay iiwang pending para sa batch digest, na inilalarawan sa ibaba. |
| -- | **sms** | Hindi ito level sa escalation ladder. Ang tanging SMS producer na may gate ay ang reminder engine: kapag kasama sa `channels` ng isang definition ang `sms`, tinetext ng `ReminderEngine.sendSms()` ang bawat tatanggap **bukod pa** sa push/email notification (tingnan ang [Mga paalala sa text](#text-reminders)). Ang bulk texting (`TextingController` / `@churchapps/texting`), ang serving overview na **Text Volunteers** send (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), at ang workflow na aksyong **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) ay direktang nagte-text sa pamamagitan ng provider ng simbahan, kaya hindi nalalapat sa mga ito ang mga kagustuhan sa notification at quiet hours -- ang `optedOut` flag lamang ng tao ang iginagalang. |

Ang mga hindi pa nababasang notification na naiwan sa socket o push ay nire-escalate ng 30-minutong timer (`NotificationHelper.escalateDelivery`). Ang batch email ay ipinapadala ng `NotificationHelper.sendEmailNotifications(frequency)`, na pinapatakbo ng `emailFrequency` na kagustuhan ng bawat tao: ang `individual` ay tumatakbo sa 30-minutong timer, ang `daily` ay tumatakbo sa nightly timer. (Ang `weekly` ay wastong halaga ng kagustuhan ngunit wala pang nakalaang batch run.)

## Reminder Engine {#reminder-engine}

Ang mga naka-iskedyul na paalala -- mga paalala sa event, due date ng task, paalala sa takda ng serving/plano -- ay dumaraan sa iisang pangkalahatang engine sa halip na mga hiwa-hiwalay na cron logic bawat feature.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- o scope-level            isang row bawat (definition,          deliveryStartLevel: 1
 offsets/channels/message         entity, occurrence, offset)           + reminderSentLog ledger
```

**Mga definition** (`reminderDefinitions`) ay alinman sa entity-level (may `entityId` -- isang partikular na event, task, o plano) o scope-level (`entityId` na null, may `scopeId` -- hal., bawat plano sa ilalim ng isang uri ng serving plan). Ang definition ay may CSV ng minute offset (`offsets`, hal. `"1440,60"` para sa isang araw at isang oras bago), lokal na oras ng pagpapadala (`sendLocalTime`), CSV ng channel (`channels` -- kapag may `email`, nagti-trigger ito ng agarang rich email sa oras ng pagpapadala), isang `recipientMode`, at opsyonal na custom na `message`.

**Ang expansion** ay nagmamaterialize ng fire row para sa darating na horizon (isang gumugulong na multi-day na window). Tumatakbo ito sa nightly timer, at kasabay tuwing na-save ang isang definition para hindi makaligtaan ang paalala ng event na huling minuto nang nagawa. Ang scope definition ay nagfa-fan out sa pamamagitan ng `loadScopeEntities` ng adapter, na gumagawa ng isang set ng occurrence bawat konkretong entity; ang entity-level na occurrence ay gumagamit ng key na `definitionId:occurrenceISO:offset`, habang ang scoped na occurrence ay nagna-namespace ayon sa entity id para hindi kailanman magbanggaan. Ang pag-upsert ng occurrence ay **nagbabalik** ng dating nakansela na row -- ang cancel-then-re-expand ang karaniwang paraan ng pag-sync muli ng paalala pagkatapos magbago ang underlying entity; ang mga row na nasa `sent`, `failed`, o `processing` ay hindi ginagalaw.

**Dispatch** (`ReminderEngine.scan()`) ay tumatakbo sa 30-minutong timer. Kumukuha ito ng mga occurrence na dumating na (may lease para maiwasan ang dobleng pagproseso), nilo-load ang mga tatanggap sa pamamagitan ng adapter ng entity, sinasala ang sinumang naitala na sa `reminderSentLog` para sa occurrence na iyon, at tinatawag ang `createNotifications` na may `deliveryStartLevel: 1` (diretso sa push) kasama ang `emailImmediate`/`emailByPerson` kapag kasama sa channels ng definition ang email.

### Mga paalala sa text {#text-reminders}

Kapag kasama sa `channels` ng isang definition ang `sms`, tinatawag ng `scan()` ang `ReminderEngine.sendSms()` pagkatapos malikha ang mga push/email notification, para sa parehong bagong tatanggap. Opt-in ang texting bawat miyembro:

- Dumadaan ang bawat tatanggap sa `PreferenceGateHelper.evaluate(..., "sms", ...)`, kaya dapat naka-on ang `allowSms` (naka-off ito bilang default at itinatakda mula sa switch na **Text messages** ng B1App) at hindi naka-override na naka-off ang `sms` channel ng kategorya. Ang `event_reminders`, `serving_schedule`, at `tasks` ay naglilista ng `sms` sa parehong `defaultChannels` at `allowedChannels`.
- Ang mga taong walang `mobilePhone` o may nakatakdang `optedOut` ay napipigilan. Kung walang texting provider ang simbahan, napipigilan ang natitirang batch na may dahilang `no_provider`.
- Ang laman ng mensahe ay binubuo ng `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, pinaikli sa isang 160-karakter na segment.
- Bawat tatanggap ay may sariling row sa `reminderSentLog` na may `channel: "sms"` at status na `sent` / `suppressed` / `failed`, hiwalay sa push/email row, kaya hindi kailanman muling ipapadala ng pumalyang text ang push o email.

Ang mga editor ay nag-aalok lamang ng **Text** kapag ibinabalik ng `GET /messaging/texting/status` ang `{ enabled: true }` (naka-enable ang unang texting provider ng simbahan).

**STOP opt-out.** Ang `POST /messaging/texting/inbound/:churchId/:token` ay isang anonymous na webhook na ipe-paste ng simbahan sa provider nito (ipinapakita ng B1Admin ang URL mula sa `GET /messaging/texting/inboundUrl` sa mga setting ng texting). Ang token ay HMAC ng church id (`SmsOptOutHelper.token`). Tumatanggap ang `SmsOptOutHelper.parse` ng mga Twilio-style na form field at mga JSON na istilong Clearstream/TextInChurch; kung ang reply ay eksaktong stop word ng carrier (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), ang bawat tao sa simbahan na hindi tinanggal at may tugmang mobile number ay makakatanggap ng `people.optedOut = true` at `allowSms = false`. Kinikilala at binabalewala ang iba pang reply.

May internal na event bus na tumutugon sa mga pagbabago sa entity nang hindi naghihintay sa nightly expansion: ang content event (sa pamamagitan ng webhook dispatcher) at mga event ng pag-update ng plano/task ay nagti-trigger ng agarang re-expansion o pagkansela para sa apektadong entity, at ang pag-update ng plano ay nagre-re-expand din ng anumang scope definition na nakatali sa uri ng plano nito.

### Mga adapter {#adapters}

Hindi nakatali sa entity ang engine; bawat suportadong uri ng entity ay nakakabit sa pamamagitan ng adapter (`helpers/adapters/`):

| Uri ng entity | Adapter | Mga tala |
|-------------|---------|----------|
| `event` | `EventReminderAdapter` | Ang mga tatanggap ay nakasaklaw sa mga nagpatala o miyembro ng grupo, depende sa event at `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Ang mga tatanggap ay mga Accepted at Unconfirmed na takda sa mga nai-publish na (hindi draft) na plano. Ang mga Unconfirmed na takda na inilabas sa pamamagitan ng serving confirmation workflow ay hindi kasama hanggang tanggapin (tingnan sa ibaba). Tinatawag ng `buildEmails` ang `DoingModuleGateway.buildPlanReminderEmails`, na nagre-render ng mga posisyon, tala, at custom na mensahe sa pamamagitan ng `doing/helpers/PlanReminderEmailHelper`, kasama ang mga button na Accept/Decline na nilagdaan ng `ReminderTokenHelper` na nagpo-post sa isang pampublikong endpoint ng tugon sa takda. |
| `task` | `TaskReminderAdapter` | Ang mga tatanggap ay ang assignee ng task. |

### Mga endpoint {#endpoints}

| Method | Path | Layunin |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | I-load o i-save ang reminder definition para sa isang entity. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | I-load o i-save ang scope-level (namamana) na reminder definition. |
| `DELETE` | `/messaging/reminders/:defId` | Burahin ang isang definition at kanselahin ang mga pending na occurrence nito. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | I-preview ang bilang ng tatanggap at mga susunod na oras ng pagpapaputok para sa paalala ng event bago i-save. |
| `GET` | `/messaging/reminders/log` | Kamakailang kasaysayan ng occurrence ng paalala para sa isang simbahan. |
| `POST` | `/messaging/reminders/mute` | I-mute ang mga paalala para sa isang partikular na entity. |

Ang pag-save ng definition ay nagti-trigger ng sabay na re-expansion para sa entity o scope na iyon, kaya nakikita ng mga editor ang napapanahong "next fires" nang hindi naghihintay sa nightly job.

## Direct message {#direct-messages}

Ang direct message ay dumaraan sa parehong funnel tulad ng lahat ng iba pa, sa halip na hiwalay na escalation path. Bawat hindi pa nababasang usapan ay may isang **shadow row** sa `notifications` (`contentType='privateMessage'`, `contentId` = ID ng pribadong mensahe, `category='direct_messages'`) na nagmamay-ari ng lahat ng estado ng paghahatid -- socket/push/email escalation, pagsubaybay sa pagbasa, lahat. Ang talahanayang `privateMessages` mismo ay nagtatago ng payload ng mensahe at isang column na `notifyPersonId`, na pinagmumulan ng unread badge at nililinis kapag binasa ng tatanggap ang usapan.

Hindi nakikita ng notification bell ang shadow row: hindi sila kasama sa unread count query, sa notification list query, at sa mark-read/delete query, na lahat ay nagfi-filter ng `contentType <> 'privateMessage'`. Bawat DM ping ay napupunta sa socket anuman ang estado ng pagbasa (live chat semantics -- walang dedup), at hindi kailanman humihinto sa socket delivery ang mga DM gaya ng karaniwang notification, dahil maaaring panatilihing bukas ng PWA sa background ang socket ngunit kailangan pa rin nito ng OS-level push. Kung i-mute ng isang tao ang DM notification, ang shadow row ay ipinaparada (`isNew=false`, nililinis ang `notifyPersonId`) -- nakikita pa rin sa loob mismo ng usapan, ngunit walang badge o alerto.

## Mga kagustuhan at gating {#preferences--gating}

Bawat pagpapadala ay dumaraan sa `PreferenceGateHelper.evaluate()`, isang purong function (lahat ng state ay ipinapasa, walang DB call sa hot path) na nagbabalik ng `allow`, `suppress`, o `defer`. Tumatakbo ang mga layer ayon sa pagkakasunod-sunod, at ang unang makapagpasya ay siyang nananaig:

1. **Naka-lock na kategorya** -- ang ilang kategorya ay sapilitan (tier 0) at nilalampasan ang lahat ng ibang layer.
2. **Master mute / pagpatay sa channel** -- ang `masterMute`, `allowPush`, `allowSms` (naka-off bilang default -- ang mga miyembro ang nag-o-opt in), o `emailFrequency='never'` ay nagpipigil nang tuluyan.
3. **Quiet hours** -- push at SMS lamang (itinuturing na hindi nakakaabala ang email). Kung nasa quiet window ng tao ang kasalukuyang oras sa kanilang timezone, nakakalusot pa rin ang transactional na kategorya; ang hindi transactional ay idi-defer hanggang sa dulo ng quiet window, na kinakalkula bilang UTC instant na tama ang DST sa pamamagitan ng `TimezoneHelper.wallClockToUtc`.
4. **Override ng kagustuhan sa kategorya** -- tahasang pag-opt out para sa isang pares ng kategorya × channel; ang kawalan nito ay nangangahulugang ang default ng kategorya.
5. **Mute sa bawat entity** -- ang mute na naitala laban sa isang partikular na entity (hal. isang event, isang plano) ay mas mahigpit kaysa setting sa antas ng kategorya, pero nalalapat lamang kapag ang caller ay nagbigay ng entity id/type kasama ng notification.

Mga talahanayang kasali: `notificationPreferences` (global -- `masterMute`, `emailFrequency` na `individual|daily|weekly|never`, `allowPush`, quiet-hours window at timezone, `allowSms`), `notificationPreferenceOverrides` (bawat kategorya × channel), at `notificationEntityMutes` (bawat entity).

Ipinapatupad ang gate na ito para sa in-app (level 0), push (level 1), at email (level 2) sa loob ng funnel -- kasama ang agarang reminder/digest email -- at para sa mga text ng paalala sa `ReminderEngine.sendSms()`. Ang transactional na email (auth code, password reset, imbitasyon, resibo ng donasyon) ay sinasadyang nilalampasan ito; iyon mismo ang punto ng ikalawang pinto.

### Mga serving confirmation workflow {#serving-confirmation-workflows}

Maaaring mag-opt in ang isang plano sa `workflowType = "assignmentConfirmation"` na workflow (`plans.confirmationWorkflowId`). Tinatawag ng Publish/Notify ang `POST /doing/plans/:id/issueRequests` sa halip na per-assignment na notification: bawat bagong Unconfirmed na takda ay nakakakuha ng `notified` + `confirmationWorkflowId` at isang workflow card (`tasks.assignmentId`, unique na `followupKey`). Nagpapadala ang card ng app-only na alerto (`appOnly: true` -- walang push/email escalation), pagkatapos ay tinatakbo ang mga aksyong `sendAssignmentRequest` ng workflow, na dumadaan sa `MessagingModuleGateway.sendServingWorkflowMessage`: email sa pamamagitan ng `NotificationHelper.sendWorkflowEmail` (preference gate + `ChurchEmailLimiter`, minimeter bilang `workflowEmail`), SMS sa pamamagitan ng `sendPersonText` lamang kung may `allowSms` at ang `serving_schedule` category gate. Ang Accept/Decline (`assignment.updated` sa event bus) ay nagsasara sa card; ang 30-minutong timer (`AssignmentWorkflowHelper.processPending`) ang nag-aayos ng mga nalampasang simula at event at nagpapalit ng hindi nasagot na request sa deadline ng follow-up bilang task ng pagsusuri ng lider. Buong lifecycle: `Api/docs/assignment-confirmation-workflows.md`.

## Mga limitasyon sa email na isinulat ng simbahan {#church-authored-email-limits}

Ang email na nilalaman ay isinulat ng simbahan ay ipinapadala mula sa shared na ChurchApps SES identity, kaya minimeter ito bawat simbahan ng `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Apat na landas ang tumatawag dito: group/template send (`EmailTemplateController`, content type na `email`), form follow-up email (`FormSubmissionController`, `formFollowUp`), workflow na aksyong **Send email** (`NotificationHelper` na may `churchAuthored`, `workflowEmail`), at serving confirmation request email (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Hindi minimeter ang system mail (auth code, resibo, paalala) at ang imbitasyon sa role at grupo (`UserController.sendInviteEmail`, isang nakapirming template).

- **Approval gate.** Walang ipinapadala ang simbahan hangga't hindi nagtatakda ang server admin ng `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip na **Group Email**). Palaging hinaharangan ang mga archived na simbahan. Binabasa ng dialog na Send Email ng B1Admin ang `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) at, kapag hindi pa aprubado, nagpapakita ng card na **Request review** sa halip na editor. Binabasa ng step editor ng workflow ang parehong endpoint (bukas sa `tasks.admin` at sa `groupMembers.edit`) para magbabala sa mga aksyong **Send email** kapag hindi pa aprubado o naka-pause ang simbahan. Sa oras ng pagpapadala, nagbabalik ang `MessagingModuleGateway.sendTemplatedEmail` ng `false` nang hindi gumagawa ng notification kapag mas mababa sa 1 ang `ChurchEmailLimiter.remaining()`, para hindi kailanman magpakitang **Email sent** ang kasaysayan ng card para sa mail na naalis. Ang `POST /messaging/emailTemplates/requestApproval` ay nagpapadala ng email sa support, isang beses lamang bawat simbahan kada linggo.
- **Kinita na allowance.** Ang aprubadong simbahan ay nakakakuha ng `max(150, 2 × its best church-authored day in the prior 30 days)`, may tuktok na 2,000 bawat gumugulong na 24 na oras. Hindi isinasama sa "best day" ang kasalukuyang 24 na oras para hindi maitaas ng isang burst ang sarili nitong limitasyon.
- **Reserve, pagkatapos settle.** Nagsusulat ang `reserve()` ng isang row sa `deliveryLogs` bawat tatanggap bago magpadala, muling sinusuri ang allowance kasama ang mga row na iyon, at umuurong kung dalawang request ang nakalampas sa limitasyon nang sabay (nagbabalik ng 429 ang pagpapadala). Minamarkahan ng `settle()` ang bawat row bilang sent o failed.
- **Pause dahil sa reklamo.** Pinapaandar ng `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, pinapakain ng SES → SNS) ang bawat permanenteng bounce o reklamo sa simbahang ang church-authored email ay umabot sa address na iyon sa paligid ng oras na iyon, at itinatala bilang `deliveryMethod` na `sesBounce` / `sesComplaint`. Napapausan ang isang simbahan sa 2+ reklamo (≥ 0.3% ng mga pagpapadala) o 10+ hard bounce (≥ 5%) sa loob ng 7 araw.

## Pag-iskedyul {#scheduling}

Pareho ang reminder engine at ang notification digest na gumagamit ng umiiral nang naka-iskedyul na timer sa halip na magpakilala ng bagong imprastraktura:

| Timer | Iskedyul | Tumatakbo |
|-------|----------|----------|
| 30-minute timer | bawat 30 minuto | Mag-escalate ng hindi nabasang notification; magpadala ng `individual`-frequency na digest email; i-dispatch ang mga dumating nang reminder occurrence (`ReminderEngine.scan`); approval digest; mga dumating nang automation execution |
| 1-minute timer (`timerWebhooks`) | bawat minuto | Ipadala ang mga dumating nang naka-iskedyul na push notification (`ScheduledNotificationHelper.dispatchDue`, job na `scheduledNotifications`) |
| Nightly timer | 05:00 UTC | Mga paalala sa attendance ng grupo; i-advance ang mga paulit-ulit na streaming service; i-refresh ang mga auto-refresh list; i-expand ang reminder occurrence para sa susunod na horizon (`ReminderEngine.expandAll`); magpadala ng `daily`-frequency na digest email |

Sa lokal, maaaring i-trigger ang parehong lohika kapag kinakailangan gamit ang `npm run timer:30min` at `npm run timer:midnight` mula sa `Api` project.

## Imbentaryo ng file {#file-inventory}

| Lugar | Mga file |
|------|------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Shared na entry | `Api/src/shared/helpers/NotificationService.ts` |
| Transactional na pinto | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| Mga limitasyon sa church email | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Reminder engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Texting / STOP opt-out | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (serving overview na **Text Volunteers**) |
| Reminder repository | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving/plan email | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Reminder editor (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Reminder editor / preferences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Mga Kaugnay na Pahina {#related-pages}

- [Real-time Architecture](../realtime.md) -- ang protocol ng WebSocket at mga client primitive (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) na sinasakyan ng in-app delivery level
- [Web Push Notifications](../web-push.md) -- VAPID setup at ang browser Push API path na ginagamit ng push escalation level
- [Messaging Endpoints](../api/endpoints/messaging.md) -- buong REST surface para sa messages, conversations, connections, at mga route ng notification/reminder
