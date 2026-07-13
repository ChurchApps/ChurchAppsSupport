---
title: "Sakhiwo Tetaziso Netikhumbuto"
---

# Sakhiwo Tetaziso Netikhumbuto

<div class="article-intro">

Wonkhe umlayeto lolibona lilunga lelibandla ngephandle kwelikhasi lelibe ulibuka — inombolo yebheji, saziso lesivelako (push notification), imeyili yesifinyeto — konkhe kuyendlula kulomunye wemnyango lababili ku-MessagingApi. Lelikhasi lichaza indlela lena, injini yesikhumbuto leyiyigcwalisa ngesikhatsi lesihleliwe, kanye nemodeli yekukhetsa leyincuma kutsi yini legcina ifika kumuntfu.

</div>

## Sifinyeto — iminyango lemibili

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Nobe ngutoni lokutjela umuntfu intfo** kuyendlula ku-`NotificationHelper.createNotifications()` emodyulini yemilayeto (messaging module). Iyagcina umugca ku-`notifications` bese inyusa kusuka ku-socket → push → imeyili, ihlola i-`PreferenceGateHelper` kulo lonkhe likhanali — kuhlanganisa ne-`in_app` ku-level 0.
2. **Nobe ngutoni lokuhleliwe ngesikhatsi** ngu-`reminderDefinition` (ku-entity-level nome ku-scope-level) leyandziswe yaba ngu-`reminderOccurrences` bese ithunyelwa yi-`ReminderEngine.scan()` etayimeni lephindzaphindzako. Sandzisi sinye, mtfumeli munye, kanye nelogi yinye yekutfumela (`reminderSentLog`).
3. **Imeyili leliqondzile (direct email)** ikhona kuphela ngemuva kwe-`TransactionalEmailHelper.sendTransactional()`. Umtsetfo we-ESLint uyakugcinisekisa loku ngesikhatsi se-compile — bona ngentasi.

:::tip Umnyango wemeyili ugcinwa yi-lint, hhayi nje inchubo
`Api/tools/eslint-rules/email-door.cjs` ichaza i-`no-direct-email-helper`: nome ngukuphi kubita i-`EmailHelper.sendTemplatedEmail()` nome i-`EmailHelper.sendEmail()` ngephandle kwe-`NotificationHelper.ts` nome i-`TransactionalEmailHelper.ts` kuyawela ku-lint. Nangabe udzinga kutfumela imeyili, yidzedzele kulendlela (`createNotifications` nge-`emailImmediate`) nome nge-`TransactionalEmailHelper.sendTransactional()` — akukho lenye indlela yesitsatfu ledlula ku-CI.
:::

## Indlela yetaziso

`NotificationHelper.createNotifications()` yindzawo yekungena yinye yaloko lokungahlelwanga ngesikhatsi noma lokungasiko kwe-transactional:

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

Kumtfoli ngamunye iyagcina umugca ku-`notifications` bese ibita i-`attemptDeliveryWithEscalation`, lehamba emkhandlwini welikhanali lolandzelako ngentasi. Umugca longakafundvwa (unread) wa-`(contentType, contentId)` lofananako uyavimbela kwenteka kabusha (dedup) — lomcondvo we-dedup uyewutjwa (skipped) kuma-`emailImmediate` (ema-offset esikhumbuto, "tfumela imeyili kubo bonkhe" yebasebenti, tinyatselo temsebenti tinelo dedup lato) kanye nemilayeto leliqondzile, leyihlala ishaya i-socket.

`shared/helpers/NotificationService.ts` ifanana ncamashi (`NotificationServiceOptions`) kulabo labatibitako labangephandle kwemodyuli yemilayeto, futsi ibhaliswe kulomodyuli ngesikhatsi selikhaza le-boot.

## Umkhandlu wekunyuswa kwelikhanali

Kutfunyelwa kucala ku-level (0 ngekwehluleka, nome lengetiwe kutikhumbuto/kutfunyelwa lokusobala) futsi kuye phambili kulelinye likhanali kuphela nangabe lelendlulele alizange liphumelele. Levele ngayinye iyahlungwa yi-`PreferenceGateHelper` ngaphambi kwekutsi nakukodwa kuzanywe.

| Level | Likhanali | Kwenteka |
|-------|---------|----------|
| 0 | **in_app / socket** | Isango le-`in_app` liyahlolwa kucala. Nangabe kuvinjelwe (muted), umugca uyagcinwa nge-`isNew=false` bese kutfunyelwa kuyeka nyalo — akukho socket ping, akukho bheji, akukho kunyuswa lokwengetiwe. Ngephandle kwaloko, iseva iyafuna tixhumano te-socket letivulekile ku-alerts room yalomuntfu bese itfumela i-frame ye-`notification` (nome `privateMessage`). Kutiziso letijwayelekile, kutfunyelwa lokuphumelele nge-socket kuyamisa umkhandlu lapha — sitayima sematimu langu-30 siyawuphindze uhlole titfo letingakafundvwa bese titinyusa ngemuva kwaloko. Imilayeto leliqondzile ayikaze imiswe ku-socket: i-PWA lefakiwe ingakhona kugcina i-socket ye-alerts ivulekile ngemuva, lokungahle kuvimbe i-push ye-OS-level. |
| 1 | **push** | Kuhlungwa nge-`allowPush` / kukhipha ekhathegori / emahora ekuthula. Kutfunyelwa kuto tonkhe ema-Expo push tokens kanye netibhaliso te-Web Push letitfolwa emugceni we-`devices` walomuntfu, kususa lokuphindzako nge-endpoint futsi kususa ema-token lasagcono ngesikhatsi. |
| 2 | **email** | Kuhlungwa nge-`emailFrequency` kanye nekukhipha ekhathegori. Kutfunyelwa lokusobala (`emailImmediate`) kuyakhicitwa nyalo bese kubhala umugca we-`deliveryLogs`; ngephandle kwaloko, saziso siyashiywa silindzile kuze kube ngu-batch digest, lokuchaziwe ngentasi. |
| — | **sms** | Umshini wekukhetsa (`allowSms`, tincwadzi tekhanali ngekhathegori ngayinye) sewubala i-channel ye-SMS, kodvwa akukho mkhicito lotfumela kuyo lamuhla — isesele igciniwe kumkhicito we-bulk SMS, losebenta njengendlela lehlukanisiwe ngalodwa nge-`TextingController` / `@churchapps/texting`. |

Tisaziso letingakafundvwa letishiywe ku-socket nome ku-push tiyanyuswa yi-tayima yematimu langu-30 (`NotificationHelper.escalateDelivery`). I-batch email itfunyelwa yi-`NotificationHelper.sendEmailNotifications(frequency)`, leyicondziswa kukhetsa kwemuntfu ngamunye kwe-`emailFrequency`: `individual` isebenta etayimeni lematimu langu-30, `daily` isebenta etayimeni lasebusuku. (`weekly` ligugu lelisemtsetfweni lekukhetsa kodvwa alikabi ne-batch run yalo lecatsaniswe layo.)

## Injini Yesikhumbuto

Tikhumbuto letihleliwe — tikhumbuto temicimbi, tinsuku tekugcina temisebenti, tikhumbuto tekwabelwa emsebentini/kuhlela — tonkhe tiyendlula kule injini leyodwa leyakhelwe konkhe, hhayi kumakhodi acabophini nge-cron ngesici ngasinye.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Tincazelo** (`reminderDefinitions`) kungaba tekulevele ye-entity (`entityId` lisethiwe — umcimbi lotsite, umsebenti, nome luhlelo) nome tekulevele ye-scope (`entityId` ayikho, `scopeId` isethiwe — sib. luhlelo ngalunye ngaphansi kwelinye luhlaka lekusebenta). Incazelo iphetse i-CSV yema-offset ngemaminithi (`offsets`, sib. `"1440,60"` kulusuku lolulodvwa nelihora lelilodvwa ngaphambi), sikhatsi sekutfumela sendzawo (`sendLocalTime`), i-CSV yemakhanali (`channels` — kuhlanganisa i-`email` levusa imeyili lecebile lesobala ngesikhatsi sekutfumela), i-`recipientMode`, kanye ne-`message` lengakhetfwa yesifiso.

**Kwandziswa** (Expansion) kwakha imigca yekushaya (fire rows) kuze kufike ebangeni lelisembili (window lengetulu kwetinsuku letiningi leliphindzaphindzako). Kusebenta etayimeni lasebusuku, futsi ngasikhatsi sinye (synchronously) noma nini incazelo nayigcinwa kuze sikhumbuto semcimbi wanyalo-nyalo sisashaya. Tincazelo te-scope tiyandza nge-adapter ye-`loadScopeEntities`, tikhicita luhlu lwesento ngalunye nge-entity lelicace; kwentela e-entity-level, kusetjentiswa sikhiya (key) lesithi `definitionId:occurrenceISO:offset`, kepha lokuhleliwe nge-scope kusetjentiswa i-namespace nge-entity id kuze kungabi khona kungqubuzana. Kwenta i-upsert kusento kuyakwenta luvivinye (resurrect) umugca lowawukhanseliwe ngaphambili — kukhansela bese kwandziswa kabusha kuyindlela lejwayelekile yekuvumelanisa kabusha sikhumbuto ngemuva kwekutsi i-entity lengaphansi ishintjile; imigca lesele i-`sent`, `failed`, nome `processing` ayitsintfwa.

**Kutfunyelwa** (`ReminderEngine.scan()`) kusebenta etayimeni lematimu langu-30. Kubamba tento letifikile sikhatsi (kubanjelwa yi-lease kuvimbela kucutjwa kabili), kulaya bemukeli nge-adapter ye-entity, kukhipha nome ngubani lose abhaliswe ku-`reminderSentLog` yaleso sento, bese kubita i-`createNotifications` nge-`deliveryStartLevel: 1` (yeqa iye ku-push ngco) kanye ne-`emailImmediate`/`emailByPerson` nangabe emakhanali encazelo afaka i-imeyili.

Ibhasi yemcimbi wangekhatsi (internal event bus) iphendvula kuhlanganiswa kwe-entity ngaphandle kwekulindza kwandziswa kwasebusuku: imicimbi yekucuketfwa (nge-webhook dispatcher) kanye nemicimbi yekuhlelwa kabusha kweluhlelo/umsebenti kuvusa kwandziswa noma kukhanselwa kabusha kwaso nyalo kwentela i-entity letsintekile, futsi kuhlelwa kabusha kwaluhlelo naku vusa kwandziswa kabusha kwato tonkhe tincazelo te-scope letihlotane nalohlobo lwaso lweluhlelo.

### Ema-Adapter

Injini ayikhetsi hlobo lwe-entity; hlobo ngalunye lwe-entity loluvunyelwe lungena nge-adapter (`helpers/adapters/`):

| Hlobo lwe-Entity | Adapter | Emavi |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Bemukeli babekwa esikhtini kulababhalisile nome emalunga eliciko, kuya nge-mcimbi kanye ne-`recipientMode`. |
| `plan` | `PlanReminderAdapter` | Bemukeli ngulabo labanekwabelwa Kwemukelwe kanye Nalabangakaciniseki eluhlelweni. `buildEmails` ibita i-`DoingModuleGateway.buildPlanReminderEmails`, leyakha tikhundla, emanotsi, kanye nemlayeto wesifiso nge-`doing/helpers/PlanReminderEmailHelper`, kuhlanganisa netinkinobho te-Emukela/Ala letisayiniwe yi-`ReminderTokenHelper` letitfumela ku-endpoint yesiphendvulo sekwabelwa lesiveliwe. |
| `task` | `TaskReminderAdapter` | Bemukeli ngulabo labanikwe lomsebenti. |

### Ema-Endpoint

| Indlela | Indlela yekufika | Injongo |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Layisha nome ugcine incazelo yesikhumbuto ye-entity lelinye. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Layisha nome ugcine incazelo yesikhumbuto ye-scope-level (lelifundzelwa/inherited). |
| `DELETE` | `/messaging/reminders/:defId` | Sula incazelo bese ukhansela tento letisalindzile. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Buka linani lebemukeli kanye netikhatsi letilandzelako tekushaya kwesikhumbuto semcimbi ngaphambi kwekugcina. |
| `GET` | `/messaging/reminders/log` | Umlandvo wanyalo-nyalo wesento sesikhumbuto welibandla. |
| `POST` | `/messaging/reminders/mute` | Vimbela tikhumbuto te-entity lelitsite. |

Kugcina incazelo kuvusa kwandziswa kabusha ngasikhatsi sinye kwaleyo entity nome scope, kuze bahleli babone "kushaya lokulandzelako" lokusesikhatsini ngephandle kwekulindza umsebenti wasebusuku.

## Imilayeto Leliqondzile

Imilayeto leliqondzile ihamba ngendlela lefanako naloko lokunye kunaloku kuba nendlela yekunyusa lehlukene. Inkulumo ngayinye lengakafundvwa itfola **umugca lomunye lofihlekile** (shadow row) ku-`notifications` (`contentType='privateMessage'`, `contentId` = i-id yemlayeto loliqondzile, `category='direct_messages'`) leyiphetse sonkhe sitatimende sekutfunyelwa — kunyuswa kwe-socket/push/email, kulandzelela kufundvwa, konkhe. Lithebula le-`privateMessages` ngalokwalo ligcina umtfwalo wemlayeto kanye nelikholomu le-`notifyPersonId`, lokuyimphumela yebheji lengakafundvwa futsi lesulwako nome umemukeli sewuyifundzile inkulumo.

Imigca lefihlekile ayibonakali ku-bell yetisaziso: iyakhishwa ku-query yenani lelingakafundvwa, ku-query yeluhlu lwetisaziso, kanye nema-query wekumaka-kufundvwa/kusula, konkhe loku kuhlunga `contentType <> 'privateMessage'`. Iping yonkhe ye-DM ishaya i-socket kungakhatsaliseki simo sekungakafundvwa (lokusho luvo lwenkulumo lephilako — akukho dedup), futsi ema-DM akaze ame ku-socket delivery njengoba tenta tisaziso letijwayelekile, njengobe i-PWA lesekhatsi ingakhona kugcina i-socket ivulekile ngesikhatsi lisadzinga i-push ye-OS-level. Nangabe umuntfu avimbela tisaziso te-DM, umugca lofihlekile uyapaka (`isNew=false`, `notifyPersonId` iyasulwa) — usasabonakala ngekhatsi kwenkulumo ngalokwayo, kodvwa ngephandle kwebheji nome ema-alert.

## Kukhetsa kanye Nekuhlunga

Kutfunyelwa konkhe kuyendlula ku-`PreferenceGateHelper.evaluate()`, umsebenti lohlantekile (state yonkhe ingenisiwe, akukho ma-DB calls endleleni lesheshako) lobuyisa i-`allow`, `suppress`, nome `defer`. Emaleveli asebenta ngendzawo, futsi lelicala lekucala lelincuma liyaphumelela:

1. **Khathegori levinjelwe (Locked category)** — letinye tikhathegori tiphocelekile (tier 0) futsi tiyeqa onkhe malayela lamanye.
2. **Kuvimbela konkhe / kubulala likhanali** — `masterMute`, `allowPush`, `allowSms`, nome `emailFrequency='never'` kuyavimbela ngco.
3. **Emahora ekuthula (Quiet hours)** — push ne-SMS kuphela (imeyili ibhekwa njengengangeni). Nangabe sikhatsi samanje setulu (wall-clock) esikhatsini semuntfu leso siwela esikhatsini sekuthula, khathegori ye-transactional isadlula; leyingesiyo transactional iyaphuyiswa (deferred) kuze kufike ekugcineni kwesikhatsi sekuthula, lokubalwa njenge-UTC lelungile nge-DST nge-`TimezoneHelper.wallClockToUtc`.
4. **Kukhetsa lokungetiwe ngekhathegori** — kukhipha lokusobala kwekhathegori linye × likhanali linye; kungabikho kwaso kusho ekwehluleka kwekhathegori.
5. **Kuvinjelwa nge-entity** — kuvimbela lokugcinwe ngekhatsi kwe-entity lelitsite (sib. umcimbi lomunye, luhlelo lolulodvwa) kuvimbela ngetulu kwesilinganiso sekhathegori, kodvwa kusebenta kuphela nangabe lobitako uniketa entity id/type kanye nesaziso.

Emathebula labandzakanyekako: `notificationPreferences` (yonkhonkhe — `masterMute`, `emailFrequency` ye-`individual|daily|weekly|never`, `allowPush`, window yemahora ekuthula + sikhatsi, `allowSms`), `notificationPreferenceOverrides` (ngekhathegori × likhanali), kanye ne-`notificationEntityMutes` (nge-entity).

Lelisango liyasebenta kuma-in-app (level 0), push (level 1), kanye ne-imeyili (level 2) ngekhatsi kwendlela — kuhlanganisa imeyili yesikhumbuto/digest lesobala. Imeyili ye-transactional (emakhodi ekungena, kucalwa kwelipassword, kumenywa, ema-receipt ekunikela) iyayeqa loku ngekuhlelwa; leyo ngiyo inhloso yayo yonkhe yemnyango wesibili.

## Kuhleleka

Injini yesikhumbuto kanye ne-digest yetaziso konkhe kuhamba ngetayima letihleliwe lesekukhona kunekungenisa infrastructure lensha:

| Tayima | Kuhleleka | Kwenteka |
|-------|----------|------|
| Tayima yematimu langu-30 | matimu angu-30 onkhe | Kunyusa tisaziso letingakafundvwa; kutfumela ema-imeyili edigest ye-`individual`-frequency; kutfumela tento tesikhumbuto letifikile (`ReminderEngine.scan`); ema-digest ekwemukela; kusebenta kwe-automation lokufikile sikhatsi |
| Tayima yasebusuku | 05:00 UTC | Tikhumbuto tekubakhona eliciko; kucondzisa phambili tinsita letiphindzaphindzako te-streaming; kuvuselela luhlu lwekutivuselela; kwandzisa tento tesikhumbuto kubanga lelilandzelako (`ReminderEngine.expandAll`); kutfumela ema-imeyili edigest ye-`daily`-frequency |

Endzaweni, umsebenti lofanako ungavuswa ngesikhatsi lesifisako nge-`npm run timer:30min` kanye ne-`npm run timer:midnight` kusuka ku-projekthi ye-`Api`.

## Luhlu Lwemafayela

| Sifundza | Emafayela |
|------|-------|
| Indlela | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Kungena lokwabelwene | `Api/src/shared/helpers/NotificationService.ts` |
| Umnyango we-transactional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, umtsetfo we-lint `Api/tools/eslint-rules/email-door.cjs` |
| Injini yesikhumbuto | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Ema-repositori esikhumbuto | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Imeyili yekusebenta/luhlelo | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Bahleli besikhumbuto (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Umhleli wesikhumbuto / kukhetsa (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Emakhasi Lahlobene

- [Sakhiwo Se-Realtime](../realtime) — umtsetfo we-WebSocket kanye netinsimbi te-client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) leveleveli ye-in-app delivery ihamba ngato
- [Tisaziso te-Web Push](../web-push) — kuhleleka kwe-VAPID kanye nendlela ye-browser Push API lesetjentiswa levelini yekunyuswa kwe-push
- [Ema-Endpoint Emlayeto](../api/endpoints/messaging) — bonkhe bubanti be-REST betimilayeto, tinkulumo, tixhumano, kanye nemigwaco yesaziso/sikhumbuto
