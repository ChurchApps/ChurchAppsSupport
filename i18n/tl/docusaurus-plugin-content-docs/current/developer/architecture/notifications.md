---
title: "Arkitektura ng Notifications at Reminders"
---

# Arkitektura ng Notifications at Reminders

<div class="article-intro">

Bawat mensaheng nakikita ng isang miyembro ng simbahan sa labas ng pahinang tinitingnan niya — bilang ng badge, push notification, digest email — ay dumadaan sa isa sa dalawang pintuan ng MessagingApi. Ipinapaliwanag ng pahinang ito ang funnel, ang reminder engine na nagpapakain dito ayon sa iskedyul, at ang preference model na nagpapasya kung ano talaga ang aabot sa isang tao.

</div>

## Pangkalahatang-ideya — dalawang pintuan

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Anumang nagpapaalam sa isang tao ng kahit ano** ay dumadaan sa `NotificationHelper.createNotifications()` sa messaging module. Nagse-save ito ng row sa `notifications` at nag-e-escalate mula socket → push → email, at sinusuri ang `PreferenceGateHelper` sa bawat channel — kasama ang `in_app` sa level 0.
2. **Anumang naka-iskedyul** ay isang `reminderDefinition` (entity-level o scope-level) na ginagawang `reminderOccurrences` at ipinapadala ng `ReminderEngine.scan()` sa paulit-ulit na timer. Isang expander, isang dispatcher, isang send ledger (`reminderSentLog`).
3. **Direktang email** ay umiiral lamang sa likod ng `TransactionalEmailHelper.sendTransactional()`. Ipinapatupad ito ng isang ESLint rule sa compile time — tingnan sa ibaba.

:::tip Ang pintuan ng email ay ipinapatupad ng lint, hindi lang ng nakagawian
Ang `Api/tools/eslint-rules/email-door.cjs` ay nagtatakda ng `no-direct-email-helper`: anumang tawag sa `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` sa labas ng `NotificationHelper.ts` o `TransactionalEmailHelper.ts` ay babagsak sa lint. Kung kailangan mong magpadala ng email, idaan ito sa funnel (`createNotifications` na may `emailImmediate`) o sa `TransactionalEmailHelper.sendTransactional()` — walang ikatlong paraan na papasa sa CI.
:::

## Ang notification funnel

Ang `NotificationHelper.createNotifications()` ang nag-iisang entry point para sa anumang hindi naka-iskedyul o transactional:

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

Para sa bawat tatanggap, nagse-save ito ng row sa `notifications` at tinatawag ang `attemptDeliveryWithEscalation`, na dumadaan sa channel ladder sa ibaba. Ang isang hindi pa nababasang row para sa parehong `(contentType, contentId)` ay pumipigil sa muling paggawa — nilalaktawan ang dedup guard na ito para sa mga `emailImmediate` na padala (ang reminder offsets, staff "email all", at workflow steps ay may sarili nilang dedup) at para sa mga direct message, na laging nagpi-ping sa socket.

Ang `shared/helpers/NotificationService.ts` ay sumasalamin sa parehong signature (`NotificationServiceOptions`) para sa mga caller sa labas ng messaging module at nirerehistro sa messaging module sa boot.

## Channel escalation chain

Nagsisimula ang delivery sa isang level (0 bilang default, o mas mataas para sa mga reminder/tahasang padala) at sa susunod na channel lang ito pupunta kung hindi nagtagumpay ang nauna. Bawat level ay dumadaan sa `PreferenceGateHelper` bago subukan ang anuman.

| Level | Channel | Gawi |
|-------|---------|------|
| 0 | **in_app / socket** | Unang sinusuri ang `in_app` gate. Kung suppressed (naka-mute), ise-save ang row na may `isNew=false` at titigil nang tuluyan ang delivery — walang socket ping, walang badge, walang karagdagang escalation. Kung hindi, hahanapin ng server ang mga bukas na socket connection para sa `alerts` room ng tao at magpu-push ng `notification` (o `privateMessage`) frame. Sa mga ordinaryong notification, ang matagumpay na socket delivery ay tumitigil sa chain dito — ang 30-minutong timer ang muling susuri sa mga hindi pa nababasa at mag-e-escalate ng mga ito mamaya. Ang mga direct message ay hindi kailanman humihinto sa socket: ang naka-install na PWA ay maaaring panatilihing bukas ang alerts socket sa background, na kung hindi ay magpipigil sa OS-level push. |
| 1 | **push** | Naka-gate sa `allowPush` / category opt-out / quiet hours. Nagpapadala sa parehong Expo push token at Web Push subscription na nasa `devices` rows ng tao, inaalis ang mga duplicate ayon sa endpoint at binubura ang mga lumang token habang tumatakbo. |
| 2 | **email** | Naka-gate sa `emailFrequency` at category opt-out. Ang mga immediate send (`emailImmediate`) ay agad na nire-render at nagsusulat ng row sa `deliveryLogs`; kung hindi, ang notification ay naiiwang nakabinbin para sa batch digest, na inilalarawan sa ibaba. |
| — | **sms** | Ang preference plumbing (`allowSms`, per-category channel lists) ay may puwang na para sa SMS channel, pero wala pang producer na nagpapadala rito ngayon — nananatili itong nakareserba para sa bulk SMS product, na tumatakbo bilang hiwalay at nakahiwalay na flow sa pamamagitan ng `TextingController` / `@churchapps/texting`. Ang workflow na **Send Text** step action (`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`) ay lumalampas din sa funnel na ito: direktang nagte-text ito sa tao ng card gamit ang provider ng simbahan, kaya hindi nalalapat ang notification preferences at quiet hours — ang `optedOut` flag lang ng tao ang iginagalang. |

Ang mga hindi pa nababasang notification na naiwan sa socket o push ay ine-escalate ng 30-minutong timer (`NotificationHelper.escalateDelivery`). Ang batch email ay ipinapadala ng `NotificationHelper.sendEmailNotifications(frequency)`, na idinidikta ng `emailFrequency` preference ng bawat tao: ang `individual` ay tumatakbo sa 30-minutong timer, ang `daily` ay tumatakbo sa nightly timer. (Ang `weekly` ay wastong halaga ng preference pero wala pang nakalaang batch run.)

## Reminder Engine

Ang mga naka-iskedyul na reminder — event reminder, due date ng task, reminder para sa serving/plan assignment — ay lahat dumadaan sa isang pangkalahatang engine sa halip na kanya-kanyang cron logic sa bawat feature.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

Ang **Definitions** (`reminderDefinitions`) ay maaaring entity-level (may `entityId` — isang tiyak na event, task, o plan) o scope-level (`entityId` ay null, may `scopeId` — hal. bawat plan sa ilalim ng isang serving plan type). Ang isang definition ay may CSV ng minutong offset (`offsets`, hal. `"1440,60"` para sa isang araw at isang oras bago), isang lokal na oras ng pagpapadala (`sendLocalTime`), isang CSV ng mga channel (`channels` — ang pagsama ng `email` ay nagti-trigger ng agarang rich email sa oras ng pagpapadala), isang `recipientMode`, at opsyonal na custom na `message`.

Ang **Expansion** ay gumagawa ng mga fire row para sa horizon sa hinaharap (isang rolling na multi-day window). Tumatakbo ito sa nightly timer, at kasabay (synchronously) tuwing may na-save na definition para tumunog pa rin ang reminder para sa event na huling-minuto. Ang mga scope definition ay kumakalat sa pamamagitan ng `loadScopeEntities` ng adapter, na gumagawa ng isang set ng occurrence para sa bawat konkretong entity; ang mga entity-level occurrence ay gumagamit ng key na `definitionId:occurrenceISO:offset`, habang ang mga scoped occurrence ay may namespace ayon sa entity id para hindi sila magbanggaan. Ang pag-upsert ng occurrence ay **bumubuhay muli** sa dating na-cancel na row — ang cancel-then-re-expand ang karaniwang paraan para i-sync muli ang reminder pagkatapos magbago ang pinagbabatayang entity; ang mga row na `sent`, `failed`, o `processing` na ay hindi ginagalaw.

Ang **Dispatch** (`ReminderEngine.scan()`) ay tumatakbo sa 30-minutong timer. Kinukuha nito ang mga occurrence na due na (pinipigilan ng lease ang dobleng pagproseso), nilo-load ang mga tatanggap sa pamamagitan ng adapter ng entity, inaalis ang sinumang nakatala na sa `reminderSentLog` para sa occurrence na iyon, at tinatawag ang `createNotifications` na may `deliveryStartLevel: 1` (diretso sa push) kasama ang `emailImmediate`/`emailByPerson` kapag kasama ang email sa mga channel ng definition.

Ang isang internal event bus ay tumutugon sa mga pagbabago sa entity nang hindi naghihintay sa nightly expansion: ang mga content event (sa pamamagitan ng webhook dispatcher) at plan/task update event ay nagti-trigger ng agarang re-expansion o cancellation para sa apektadong entity, at ang pag-update ng plan ay nagre-re-expand din ng anumang scope definition na nakatali sa plan type nito.

### Mga Adapter

Walang pinapanigan ang engine sa uri ng entity; bawat sinusuportahang entity type ay kumokonekta sa pamamagitan ng adapter (`helpers/adapters/`):

| Uri ng entity | Adapter | Mga tala |
|---------------|---------|----------|
| `event` | `EventReminderAdapter` | Ang mga tatanggap ay limitado sa mga nagparehistro o miyembro ng grupo depende sa event at `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Ang mga tatanggap ay ang mga plan assignment na Accepted + Unconfirmed. Ang `buildEmails` ay tumatawag sa `DoingModuleGateway.buildPlanReminderEmails`, na nagre-render ng mga posisyon, tala, at custom na mensahe sa pamamagitan ng `doing/helpers/PlanReminderEmailHelper`, kasama ang mga Accept/Decline button na pinirmahan ng `ReminderTokenHelper` na nagpo-post sa isang pampublikong assignment-response endpoint. |
| `task` | `TaskReminderAdapter` | Ang mga tatanggap ay ang assignee ng task. |

### Mga Endpoint

| Method | Path | Layunin |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | I-load o i-save ang reminder definition para sa isang entity. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | I-load o i-save ang scope-level (minana) na reminder definition. |
| `DELETE` | `/messaging/reminders/:defId` | Burahin ang isang definition at i-cancel ang mga nakabinbing occurrence nito. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | I-preview ang bilang ng tatanggap at mga susunod na oras ng pagtunog para sa isang event reminder bago i-save. |
| `GET` | `/messaging/reminders/log` | Kamakailang kasaysayan ng reminder occurrence para sa isang simbahan. |
| `POST` | `/messaging/reminders/mute` | I-mute ang mga reminder para sa isang tiyak na entity. |

Ang pag-save ng definition ay nagti-trigger ng kasabay na re-expansion para sa entity o scope na iyon, kaya nakikita ng mga editor ang napapanahong "next fires" nang hindi naghihintay sa nightly job.

## Mga direct message

Ang mga direct message ay sumasakay sa parehong funnel tulad ng iba pa sa halip na hiwalay na escalation path. Bawat hindi pa nababasang usapan ay may isang **shadow row** sa `notifications` (`contentType='privateMessage'`, `contentId` = ang private message id, `category='direct_messages'`) na may hawak ng lahat ng delivery state — socket/push/email escalation, read tracking, lahat. Ang `privateMessages` table mismo ay nag-iingat ng message payload at ng column na `notifyPersonId`, na pinagmumulan ng unread badge at nililinis kapag binasa ng tatanggap ang usapan.

Ang mga shadow row ay hindi nakikita ng notifications bell: hindi sila kasama sa unread count query, sa notification list query, at sa mark-read/delete query, na lahat ay nagfi-filter ng `contentType <> 'privateMessage'`. Bawat DM ping ay tumatama sa socket anuman ang unread state (live chat semantics — walang dedup), at ang mga DM ay hindi humihinto sa socket delivery tulad ng mga ordinaryong notification, dahil ang PWA na nasa background ay maaaring magpanatiling bukas ng socket habang kailangan pa rin ng OS-level push. Kung i-mute ng isang tao ang mga DM notification, ang shadow row ay ipa-park (`isNew=false`, nilinis ang `notifyPersonId`) — nakikita pa rin sa loob mismo ng usapan, pero walang badge o alerto.

## Mga preference at gating

Bawat padala ay dumadaan sa `PreferenceGateHelper.evaluate()`, isang pure function (lahat ng state ay ipinapasa, walang DB call sa hot path) na nagbabalik ng `allow`, `suppress`, o `defer`. Sunud-sunod na tumatakbo ang mga layer, at ang unang magpasya ang nananaig:

1. **Locked category** — ang ilang kategorya ay sapilitan (tier 0) at nilalampasan ang lahat ng ibang layer.
2. **Master mute / channel kill** — ang `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` ay tuwirang nagsu-suppress.
3. **Quiet hours** — push at SMS lang (ang email ay itinuturing na hindi nakakaistorbo). Kung ang kasalukuyang wall-clock time sa timezone ng tao ay nasa quiet window niya, ang transactional na kategorya ay makakalusot pa rin; ang hindi transactional ay ide-defer hanggang sa katapusan ng quiet window, na kinukuwenta bilang DST-correct na UTC instant sa pamamagitan ng `TimezoneHelper.wallClockToUtc`.
4. **Per-category preference override** — tahasang opt-out para sa isang pares ng category × channel; ang kawalan nito ay nangangahulugang default ng kategorya.
5. **Per-entity mute** — ang mute na nakatala sa isang tiyak na entity (hal. isang event, isang plan) ay mas mahigpit kaysa sa setting sa antas ng kategorya, pero nalalapat lang kapag nagbigay ang caller ng entity id/type kasama ng notification.

Mga table na kasangkot: `notificationPreferences` (global — `masterMute`, `emailFrequency` na `individual|daily|weekly|never`, `allowPush`, quiet-hours window + timezone, `allowSms`), `notificationPreferenceOverrides` (bawat category × channel), at `notificationEntityMutes` (bawat entity).

Ipinapatupad ang gate na ito para sa in-app (level 0), push (level 1), at email (level 2) sa loob ng funnel — kasama ang mga immediate reminder/digest email. Ang transactional email (auth code, password reset, imbitasyon, resibo ng donasyon) ay lumalampas dito sa disenyo; iyon mismo ang layunin ng ikalawang pintuan.

## Mga limitasyon sa email na isinulat ng simbahan

Ang email na ang nilalaman ay isinulat ng simbahan ay lumalabas mula sa nakabahaging ChurchApps SES identity, kaya sinusukat ito bawat simbahan ng `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Apat na landas ang tumatawag dito: group/template send (`EmailTemplateController`, content type na `email`), form follow-up email (`FormSubmissionController`, `formFollowUp`), workflow na **Send email** action (`NotificationHelper` na may `churchAuthored`, `workflowEmail`), at B1 account invite (`UserController.sendInviteEmail`, `invite`). Ang system mail (auth code, resibo, reminder) ay hindi sinusukat.

- **Approval gate.** Walang maipapadala ang isang simbahan hangga't hindi itinatakda ng server admin ang `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** chip). Ang mga naka-archive na simbahan ay laging hinaharang. Binabasa ng Send Email dialog ng B1Admin ang `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) at, kapag hindi pa aprubado, nagpapakita ng **Request review** card sa halip na editor. Ang `POST /messaging/emailTemplates/requestApproval` ay nag-e-email sa support, nang hindi hihigit sa isang beses bawat simbahan bawat linggo.
- **Earned allowance.** Ang aprubadong simbahan ay nakakakuha ng `max(150, 2 × its best church-authored day in the prior 30 days)`, na may takip na 2,000 bawat rolling na 24 oras. Hindi kasama sa "best day" ang kasalukuyang 24 oras para hindi mapataas ng biglaang dami ang sarili nitong limitasyon.
- **Reserve, then settle.** Ang `reserve()` ay nagsusulat ng isang `deliveryLogs` row bawat tatanggap bago magpadala, sinusuri muli ang allowance kasama ang mga row na iyon, at umaatras kung dalawang request ang sabay na nakalampas sa limitasyon (ang padala ay nagbabalik ng 429). Minamarkahan ng `settle()` ang bawat row na sent o failed.
- **Complaint pause.** Ang `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, pinapakain ng SES → SNS) ay iniuugnay ang bawat permanenteng bounce o reklamo sa simbahang ang church-authored na email ay umabot sa address na iyon sa paligid ng oras na iyon, na iniimbak bilang `deliveryMethod` na `sesBounce` / `sesComplaint`. Ang simbahan ay ipo-pause sa 2+ reklamo (≥ 0.3% ng mga padala) o 10+ hard bounce (≥ 5%) sa loob ng 7 araw.

## Pag-iiskedyul

Ang reminder engine at ang notification digest ay parehong sumasakay sa mga umiiral nang naka-iskedyul na timer sa halip na magpakilala ng bagong imprastraktura:

| Timer | Iskedyul | Tumatakbo |
|-------|----------|-----------|
| 30-minutong timer | bawat 30 minuto | I-escalate ang mga hindi pa nababasang notification; magpadala ng mga digest email na `individual` ang frequency; i-dispatch ang mga due na reminder occurrence (`ReminderEngine.scan`); approval digest; mga due na automation execution |
| Nightly timer | 05:00 UTC | Mga reminder sa group attendance; i-advance ang mga umuulit na streaming service; i-refresh ang mga auto-refresh list; i-expand ang mga reminder occurrence para sa susunod na horizon (`ReminderEngine.expandAll`); magpadala ng mga digest email na `daily` ang frequency |

Sa lokal, ang parehong logic ay maaaring i-trigger kapag kailangan gamit ang `npm run timer:30min` at `npm run timer:midnight` mula sa `Api` project.

## Imbentaryo ng mga file

| Bahagi | Mga file |
|--------|----------|
| Funnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Shared entry | `Api/src/shared/helpers/NotificationService.ts` |
| Transactional door | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint rule `Api/tools/eslint-rules/email-door.cjs` |
| Mga limitasyon sa email ng simbahan | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Reminder engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Mga reminder repository | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving/plan email | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Mga reminder editor (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Reminder editor / mga preference (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Mga Kaugnay na Pahina

- [Real-time Architecture](../realtime) — ang WebSocket protocol at mga client primitive (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) na sinasakyan ng in-app delivery level
- [Web Push Notifications](../web-push) — setup ng VAPID at ang browser Push API path na ginagamit ng push escalation level
- [Messaging Endpoints](../api/endpoints/messaging) — buong REST surface para sa mga mensahe, usapan, connection, at mga route ng notification/reminder
