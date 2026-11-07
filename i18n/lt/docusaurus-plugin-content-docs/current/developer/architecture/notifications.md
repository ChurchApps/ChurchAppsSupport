---
title: "Pranešimų ir priminimų architektūra"
---

# Pranešimų ir priminimų architektūra

<div class="article-intro">

Kiekvienas bažnyčios nario pranešimas, kurį jis mato ne puslapyje, kurį šiuo metu žiūri, — skaitiklio ženklelis, push pranešimas, suvestinės el. laiškas — praeina vieną iš dviejų įėjimų MessagingApi. Šiame puslapyje aprašoma ši kelio sistema, priminimų variklis, kuris ją periodiškai maitina, ir nuostatų modelis, nusprendžiantis, kas iš tiesų pasiekia asmenį.

</div>

## Apžvalga — du įėjimai

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Viskas, kas ką nors praneša asmeniui**, eina per `NotificationHelper.createNotifications()` messaging modulyje. Ji įrašo eilutę `notifications` lentelėje ir eskaluoja pranešimą: socket → push → el. paštas, kiekvienam kanalui taikydama `PreferenceGateHelper`, įskaitant `in_app` 0 lygyje.
2. **Viskas, kas suplanuota**, yra `reminderDefinition` (vieno subjekto arba srities lygio), išskleidžiamas į `reminderOccurrences` ir siunčiamas `ReminderEngine.scan()` funkcijos, veikiančios periodiniu laikmačiu. Vienas išskleidėjas, vienas siuntėjas, vienas siuntimo žurnalas (`reminderSentLog`).
3. **Tiesioginis el. paštas** egzistuoja tik per `TransactionalEmailHelper.sendTransactional()`. ESLint taisyklė tai užtikrina kompiliavimo metu — žr. žemiau.

:::tip El. pašto įėjimą užtikrina lintas, o ne tik susitarimas
`Api/tools/eslint-rules/email-door.cjs` apibrėžia `no-direct-email-helper`: bet koks `EmailHelper.sendTemplatedEmail()` ar `EmailHelper.sendEmail()` iškvietimas už `NotificationHelper.ts` ar `TransactionalEmailHelper.ts` ribų nepraeina lintavimo. Jei reikia išsiųsti el. laišką, nukreipkite jį per kelio sistemą (`createNotifications` su `emailImmediate`) arba per `TransactionalEmailHelper.sendTransactional()` — kitas būdas per CI neišeina.
:::

## Pranešimų kelio sistema

`NotificationHelper.createNotifications()` yra vienintelis įėjimo taškas bet kam, kas nėra suplanuota ar transakcinė:

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

Kiekvienam gavėjui ji įrašo eilutę `notifications` lentelėje ir iškviečia `attemptDeliveryWithEscalation`, kuris eina per toliau pateiktą kanalų grandinę. Jei toks pat `(contentType, contentId)` jau turi neperskaitytą eilutę, nauja nekuriama. Šis pasikartojimo apsaugos patikrinimas praleidžiamas `emailImmediate` siuntimams (priminimų poslinkiams, personalo „siųsti el. laišką visiems“, darbo eigos žingsniams, kurie patys valdo savo pasikartojimų kontrolę) ir tiesioginėms žinutėms, kurios visada praneša socket kanalu.

`shared/helpers/NotificationService.ts` atkartoja tą patį parašą (`NotificationServiceOptions`) kviečiantiems iš messaging modulio išorės ir registruojamas messaging modulyje paleidimo metu.

## Kanalų eskalacijos grandinė

Pristatymas prasideda iš tam tikro lygio (pagal nutylėjimą 0, o priminimams ar aiškiems siuntimams — aukštesnio) ir pereina prie kito kanalo tik tuo atveju, jei ankstesnis nepavyko. Kiekvienas lygis prieš bandymą praeina `PreferenceGateHelper` filtrą.

| Lygis | Kanalas | Elgsena |
|-------|---------|---------|
| 0 | **in_app / socket** | Pirmiausia tikrinamas `in_app` filtras. Jei pranešimas nutildytas, eilutė įrašoma su `isNew=false` ir pristatymas visiškai sustoja — nėra socket signalo, nėra ženklelio, nėra tolesnės eskalacijos. Priešingu atveju serveris ieško atvirų socket ryšių asmens `alerts` kambaryje ir siunčia `notification` (arba `privateMessage`) kadrą. Įprastiems pranešimams sėkmingas socket pristatymas čia ir sustabdo grandinę — 30 minučių laikmatis vėliau patikrina neperskaitytus elementus ir juos eskaluoja. Tiesioginės žinutės niekada nesustoja ties socket: įdiegta PWA gali palaikyti atvirą alerts socket fone, ir tai kitaip užgniaužtų OS lygio push pranešimą. |
| 1 | **push** | Priklauso nuo `allowPush` / kategorijos atsisakymo / tylos valandų. Siunčia tiek Expo push žetonams, tiek Web Push prenumeratoms, rastoms asmens `devices` eilutėse, pašalina pasikartojimus pagal galutinį tašką ir pašalina pasenusius žetonus.|
| 2 | **email** | Priklauso nuo `emailFrequency` ir kategorijos atsisakymo. Tiesioginiai siuntimai (`emailImmediate`) pateikiami iš karto ir įrašo eilutę `deliveryLogs` lentelėje; priešingu atveju pranešimas paliekamas laukti paketinės suvestinės, aprašytos toliau. |
| — | **sms** | Nėra grandinės lygis. Vienintelis SMS šaltinis, kurį riboja filtrai, yra priminimų variklis: kai apibrėžimo `channels` apima `sms`, `ReminderEngine.sendSms()` siunčia žinutę kiekvienam gavėjui **kartu su** push/el. pašto pranešimu (žr. [Tekstiniai priminimai](#text-reminders)). Masinis SMS siuntimas (`TextingController` / `@churchapps/texting`), bažnyčios tiekėjo per serving apžvalgą atliekamas veiksmas **Text Volunteers** (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) ir darbo eigos veiksmas **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) visi siunčia tiesiogiai per bažnyčios tiekėją, todėl pranešimų nuostatos ir tylos valandos jiems netaikomos — gerbiamas tik asmens `optedOut` požymis. |

Neperskaitytus pranešimus, likusius socket ar push lygyje, eskaluoja 30 minučių laikmatis (`NotificationHelper.escalateDelivery`). Paketinius el. laiškus siunčia `NotificationHelper.sendEmailNotifications(frequency)`, valdomas kiekvieno asmens nuostatos `emailFrequency`: `individual` veikia 30 minučių laikmačiu, `daily` — naktiniu laikmačiu. (`weekly` yra galiojanti nuostatos reikšmė, bet kol kas neturi atskiro paketinio vykdymo.)

## Priminimų variklis

Suplanuoti priminimai — renginių priminimai, užduočių terminai, tarnystės ir plano paskyrimų priminimai — visi eina per vieną bendrą variklį, o ne per atskirą kiekvienos funkcijos cron logiką.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Apibrėžimai** (`reminderDefinitions`) yra arba subjekto lygio (nustatytas `entityId` — konkretus renginys, užduotis ar planas), arba srities lygio (`entityId` tuščias, nustatytas `scopeId` — pavyzdžiui, visi planai pagal tarnystės plano tipą). Apibrėžime yra minučių poslinkių CSV (`offsets`, pvz., `"1440,60"` — prieš vieną dieną ir prieš vieną valandą), vietinis siuntimo laikas (`sendLocalTime`), kanalų CSV (`channels` — įskaitant `email`, kuris siuntimo metu sukelia tiesioginį išplėstinį el. laišką), `recipientMode` ir pasirinktinis `message`.

**Išskleidimas** sukuria įvykių eilutes artimiausiam horizontui (slenkančiam kelių dienų langui). Jis veikia naktiniu laikmačiu ir sinchroniškai kiekvieną kartą išsaugojus apibrėžimą, kad priminimas apie paskutinės minutės renginį vis tiek suveiktų. Srities apibrėžimai išsiskiria per adapterio `loadScopeEntities`, sukurdami po vieną poslinkių rinkinį kiekvienam konkrečiam subjektui; subjekto lygio poslinkiai naudoja raktą `definitionId:occurrenceISO:offset`, o srities poslinkiai įtraukia subjekto ID, kad niekada nesutaptų. Įrašant poslinkį **atgaivinama** anksčiau atšaukta eilutė — standartinis būdas iš naujo sinchronizuoti priminimą, kai pasikeičia pagrindinis subjektas, yra atšaukti ir tada išskleisti iš naujo; eilutės, kurios jau yra `sent`, `failed` ar `processing`, paliekamos nepakeistos.

**Siuntimas** (`ReminderEngine.scan()`) veikia 30 minučių laikmačiu. Jis paima paskirtus laiku poslinkius (rezervavimo mechanizmas neleidžia jų apdoroti dukart), gavėjus įkelia per subjekto adapterį, atfiltruoja tuos, kurie jau įrašyti `reminderSentLog` tam poslinkiui, ir iškviečia `createNotifications` su `deliveryStartLevel: 1` (tiesiai į push) bei `emailImmediate`/`emailByPerson`, jei apibrėžimo kanalai apima el. paštą.

### Tekstiniai priminimai

Kai apibrėžimo `channels` apima `sms`, `scan()` po push/el. pašto pranešimų sukūrimo iškviečia `ReminderEngine.sendSms()` tiems patiems naujiems gavėjams. Tekstinės žinutės siunčiamos tik tiems nariams, kurie su tuo sutiko:

- Kiekvienas gavėjas praeina `PreferenceGateHelper.evaluate(..., "sms", ...)`, todėl `allowSms` turi būti įjungtas (pagal nutylėjimą išjungtas ir nustatomas iš B1App jungiklio **Text messages**), o kategorijos `sms` kanalas neturi būti išjungtas nustatymu. `event_reminders`, `serving_schedule` ir `tasks` nurodo `sms` tiek `defaultChannels`, tiek `allowedChannels`.
- Asmenys be `mobilePhone` arba su nustatytu `optedOut` yra praleidžiami. Jei bažnyčia neturi tekstinių žinučių tiekėjo, likusi partija praleidžiama su priežastimi `no_provider`.
- Žinutės tekstą sudaro `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, sutrumpintas iki vieno 160 simbolių segmento.
- Kiekvienas gavėjas gauna atskirą `reminderSentLog` eilutę su `channel: "sms"` ir statusu `sent` / `suppressed` / `failed`. Ji saugoma atskirai nuo push/el. pašto eilutės, todėl nepavykusi žinutė niekada nepakartoja push ar el. laiško.

Redaktoriai siūlo **Text** tik tada, kai `GET /messaging/texting/status` grąžina `{ enabled: true }` (pirmasis bažnyčios tekstinių žinučių tiekėjas įjungtas).

**STOP atsisakymas.** `POST /messaging/texting/inbound/:churchId/:token` yra anoniminis webhook, kurį bažnyčia įklijuoja į savo tiekėjo nustatymus (B1Admin rodo URL iš `GET /messaging/texting/inboundUrl` teksto žinučių nustatymuose). Žetonas yra bažnyčios ID HMAC (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` priima Twilio stiliaus formos laukus ir Clearstream/TextInChurch stiliaus JSON; jei atsakymas tiksliai yra operatoriaus sustabdymo žodis (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), kiekvienam bažnyčios asmeniui, kurio mobilusis numeris sutampa ir kuris nėra pašalintas, nustatomas `people.optedOut = true` ir `allowSms = false`. Kiti atsakymai patvirtinami ir ignoruojami.

Vidinė įvykių magistralė reaguoja į subjektų pakeitimus nelaukdama naktinio išskleidimo: turinio įvykiai (per webhook dispečerį) ir plano/užduočių atnaujinimų įvykiai iš karto sukelia paveikto subjekto perskaičiavimą ar atšaukimą, o plano atnaujinimas taip pat perskaičiuoja visus srities apibrėžimus, susietus su tuo planų tipu.

### Adapteriai

Variklis nepriklauso nuo subjekto tipo; kiekvienas palaikomas subjekto tipas prisijungia per adapterį (`helpers/adapters/`):

| Subjekto tipas | Adapteris | Pastabos |
|----------------|-----------|----------|
| `event` | `EventReminderAdapter` | Gavėjai apribojami registruotaisiais ar grupės nariais, priklausomai nuo renginio ir `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Gavėjai — priimti ir nepatvirtinti paskyrimai paskelbtuose (ne juodraštiniuose) planuose. Nepatvirtinti paskyrimai, išduoti per tarnystės patvirtinimo darbo eigą, neįtraukiami, kol nebus priimti (žr. žemiau). `buildEmails` kreipiasi į `DoingModuleGateway.buildPlanReminderEmails`, kuris per `doing/helpers/PlanReminderEmailHelper` pateikia pozicijas, pastabas ir pasirinktinę žinutę, įskaitant mygtukus Priimti / Atsisakyti, pasirašytus `ReminderTokenHelper` ir siunčiamus į viešą paskyrimo atsakymo galutinį tašką. |
| `task` | `TaskReminderAdapter` | Gavėjai — užduoties vykdytojas (-ai). |

### Galutiniai taškai

| Metodas | Kelias | Paskirtis |
|---------|--------|-----------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Įkelti arba įrašyti vieno subjekto priminimo apibrėžimą. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Įkelti arba įrašyti srities lygio (paveldėtą) priminimo apibrėžimą. |
| `DELETE` | `/messaging/reminders/:defId` | Ištrinti apibrėžimą ir atšaukti jo laukiančius poslinkius. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Peržiūrėti renginio priminimo gavėjų skaičių ir kitus siuntimo laikus prieš įrašant. |
| `GET` | `/messaging/reminders/log` | Bažnyčios naujausių priminimų poslinkių istorija. |
| `POST` | `/messaging/reminders/mute` | Nutildyti priminimus konkrečiam subjektui. |

Įrašius apibrėžimą, tam subjektui ar sričiai sinchroniškai vykdomas perskaičiavimas, todėl redaktoriai mato aktualius „kiti siuntimai“ nelaukdami naktinio darbo.

## Tiesioginės žinutės

Tiesioginės žinutės naudoja tą patį kelią kaip ir viskas kita, o ne atskirą eskalacijos kelią. Kiekviena neperskaityta pokalbio šakė gauna vieną **šešėlinę eilutę** `notifications` lentelėje (`contentType='privateMessage'`, `contentId` — privačios žinutės ID, `category='direct_messages'`), kuri valdo visą pristatymo būseną — socket/push/el. pašto eskaliaciją, skaitymo sekimą ir viską kitą. Pati `privateMessages` lentelė saugo žinutės turinį ir `notifyPersonId` stulpelį, kuris yra neperskaitytų ženklelio šaltinis ir išvalomas, kai gavėjas perskaito pokalbį.

Šešėlinės eilutės nematomos pranešimų varpelyje: jos neįtraukiamos į neperskaitytų skaičiavimo užklausą, pranešimų sąrašo užklausą ir pažymėjimo kaip perskaityta / ištrynimo užklausas — visos jos filtruoja `contentType <> 'privateMessage'`. Kiekvienas DM signalas pasiekia socket nepriklausomai nuo neperskaitytos būsenos (gyvo pokalbio semantika — be pasikartojimų kontrolės), o DM niekada nesustoja ties socket pristatymu, kaip įprasti pranešimai, nes fone veikianti PWA gali palaikyti socket atvirą, bet vis dar reikalauti OS lygio push. Jei asmuo nutildo DM pranešimus, šešėlinė eilutė atidedama (`isNew=false`, `notifyPersonId` išvalomas) — ji vis dar matoma pačiame pokalbyje, tik be ženklelių ar įspėjimų.

## Nuostatos ir filtravimas

Kiekvienas siuntimas praeina `PreferenceGateHelper.evaluate()` — grynąją funkciją (visa būsena perduodama įėjime, jokių DB iškvietimų kritiniame kelyje), kuri grąžina `allow`, `suppress` arba `defer`. Sluoksniai vykdomi eilės tvarka, ir pirmasis, kuris nusprendžia, laimi:

1. **Užrakintas kategorijos sluoksnis** — kai kurios kategorijos yra privalomos (0 lygis) ir apeina visus kitus sluoksnius.
2. **Bendras nutildymas / kanalo išjungimas** — `masterMute`, `allowPush`, `allowSms` (pagal nutylėjimą išjungtas — nariai pasirenka patys) arba `emailFrequency='never'` iš karto slopina pranešimą.
3. **Tylos valandos** — taikomos tik push ir SMS (el. paštas laikomas nebūtinai trikdančiu). Jei dabartinis sienos laikrodžio laikas asmens laiko juostoje patenka į jo tylos langą, transakcinė kategorija vis tiek pasiekia; netransakcinė atidedama iki tylos lango pabaigos, apskaičiuotos kaip DST teisingas UTC momentas per `TimezoneHelper.wallClockToUtc`.
4. **Kategorijos nuostatos perrašymas** — aiškus vienos kategorijos × kanalo poros atsisakymas; jo nebuvimas reiškia kategorijos numatytąją reikšmę.
5. **Subjekto nutildymas** — konkrečiam subjektui (pvz., vienam renginiui, vienam planui) įrašytas nutildymas riboja labiau nei kategorijos lygio nustatymas, bet taikomas tik tada, kai iškvietėjas kartu su pranešimu pateikia subjekto ID ir tipą.

Susiję lentelės: `notificationPreferences` (bendros — `masterMute`, `emailFrequency` reikšmės `individual|daily|weekly|never`, `allowPush`, tylos valandų langas ir laiko juosta, `allowSms`), `notificationPreferenceOverrides` (pagal kategoriją × kanalą) ir `notificationEntityMutes` (pagal subjektą).

Šis filtras taikomas programos viduje (1 lygis — in-app, 0 lygis — push, 2 lygis — el. paštas), įskaitant tiesioginius priminimų ir suvestinių laiškus, ir priminimų tekstinėms žinutėms `ReminderEngine.sendSms()`. Transakciniam el. paštui (autentifikavimo kodai, slaptažodžio atstatymai, kvietimai, aukų kvitai) filtras taikomas nebūna sąmoningai — tam ir yra antrasis įėjimas.

### Tarnystės patvirtinimo darbo eigos

Planas gali pasirinkti `workflowType = "assignmentConfirmation"` darbo eigą (`plans.confirmationWorkflowId`). Tada paskelbimas / pranešimas vietoj vieno pranešimo kiekvienam paskyrimui iškviečia `POST /doing/plans/:id/issueRequests`: kiekvienas naujas nepatvirtintas paskyrimas gauna `notified` ir `confirmationWorkflowId` bei vieną darbo eigos kortelę (`tasks.assignmentId`, unikalus `followupKey`). Kortelė siunčia tik programai skirtą įspėjimą (`appOnly: true` — be push/el. pašto eskalacijos), tada vykdo darbo eigos `sendAssignmentRequest` veiksmus, kurie eina per `MessagingModuleGateway.sendServingWorkflowMessage`: el. paštas per `NotificationHelper.sendWorkflowEmail` (nuostatų filtras + `ChurchEmailLimiter`, skaičiuojamas kaip `workflowEmail`), SMS per `sendPersonText` tik su `allowSms` ir `serving_schedule` kategorijos filtru. Priimti / Atsisakyti (`assignment.updated` įvykių magistralėje) uždaro kortelę; 30 minučių laikmatis (`AssignmentWorkflowHelper.processPending`) ištaiso praleistus paleidimus ir įvykius, o neatsakytą prašymą iki tolesnio termino paverčia vadovo peržiūros užduotimi. Pilnas ciklas: `Api/docs/assignment-confirmation-workflows.md`.

## Bažnyčios parašytų laiškų limitai

El. paštas, kurio turinį parašė bažnyčia, siunčiamas iš bendros ChurchApps SES tapatybės, todėl jį riboja kiekvienai bažnyčiai `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Keturi keliai jį kviečia: grupių / šablonų siuntimai (`EmailTemplateController`, turinio tipas `email`), formos tolesnių veiksmų laiškai (`FormSubmissionController`, `formFollowUp`), darbo eigos veiksmai **Send email** (`NotificationHelper` su `churchAuthored`, `workflowEmail`) ir tarnystės patvirtinimo prašymų laiškai (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Sisteminis paštas (autentifikavimo kodai, kvitai, priminimai) ir vaidmenų bei grupių kvietimai (`UserController.sendInviteEmail`, fiksuotas šablonas) nėra skaičiuojami.

- **Patvirtinimo filtras.** Bažnyčia nieko neišsiunčia, kol serverio administratorius nenustato `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** žymė). Archyvuotos bažnyčios visada blokuojamos. B1Admin dialogas Send Email skaito `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) ir, jei bažnyčia nepatvirtinta, vietoj redaktoriaus rodo kortelę **Request review**. Darbo eigos žingsnio redaktorius skaito tą patį galutinį tašką (prieinamą ir `tasks.admin`, ir `groupMembers.edit` vartotojams), kad įspėtų apie veiksmus **Send email**, kai bažnyčia nepatvirtinta arba jos siuntimas sustabdytas. Siuntimo metu `MessagingModuleGateway.sendTemplatedEmail` grąžina `false`, nesukūrusi pranešimo, kai `ChurchEmailLimiter.remaining()` yra mažesnis nei 1, todėl kortelės istorija niekada netvirtina **Email sent** laiškui, kuris buvo atmestas. `POST /messaging/emailTemplates/requestApproval` siunčia laišką palaikymo komandai, ne dažniau kaip kartą per savaitę vienai bažnyčiai.
- **Uždirbtas limitas.** Patvirtinta bažnyčia gauna `max(150, 2 × jos geriausia bažnyčios parašytų laiškų diena per ankstesnes 30 dienų)`, ribojamą 2 000 per slenkančias 24 valandas. Dabartinės 24 valandos nėra įtraukiamos į „geriausią dieną“, todėl vienas sprogimas negali pats pakelti savo limito.
- **Rezervuoti, tada suskaičiuoti.** `reserve()` prieš siuntimą įrašo po vieną `deliveryLogs` eilutę kiekvienam gavėjui, pakartotinai patikrina limitą įskaitydama tas eilutes ir atšaukia, jei du užklausos lenktynių metu pralenkė limitą (siuntimas grąžina 429). `settle()` pažymi kiekvieną eilutę kaip sent arba failed.
- **Skundų sustabdymas.** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, gaunama iš SES → SNS) kiekvieną nuolatinį grąžinimą ar skundą priskiria bažnyčiai, kurios bažnyčios parašytas laiškas tuo metu pasiekė tą adresą, ir įrašo kaip `deliveryMethod` `sesBounce` / `sesComplaint`. Bažnyčia sustabdoma, kai per 7 dienas gaunama 2+ skundų (≥ 0,3 % siuntimų) arba 10+ kietųjų grąžinimų (≥ 5 %).

## Planavimas

Ir priminimų variklis, ir pranešimų suvestinė veikia per esamus planuojamus laikmačius, o ne diegiant naują infrastruktūrą:

| Laikmatis | Tvarkaraštis | Vykdo |
|-----------|--------------|-------|
| 30 minučių laikmatis | kas 30 minučių | Eskaluoja neperskaitytus pranešimus; siunčia `individual` dažnumo suvestinių laiškus; siunčia laiku esančius priminimų poslinkius (`ReminderEngine.scan`); patvirtinimo suvestines; laiku esančius automatizavimo vykdymus |
| Naktinis laikmatis | 05:00 UTC | Grupės lankomumo priminimai; pakartotinių transliacijų perkėlimas; automatinio atnaujinimo sąrašų atnaujinimas; priminimų poslinkių išskleidimas kitam horizontui (`ReminderEngine.expandAll`); siunčia `daily` dažnumo suvestinių laiškus |

Vietoje tą pačią logiką galima paleisti pagal poreikį su `npm run timer:30min` ir `npm run timer:midnight` iš `Api` projekto.

## Failų inventorius

| Sritis | Failai |
|--------|--------|
| Kelio sistema | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Bendras įėjimas | `Api/src/shared/helpers/NotificationService.ts` |
| Transakcinis įėjimas | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint taisyklė `Api/tools/eslint-rules/email-door.cjs` |
| Bažnyčios el. pašto limitai | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Priminimų variklis | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Tekstinės žinutės / STOP atsisakymas | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (tarnystės apžvalgos veiksmas **Text Volunteers**) |
| Priminimų saugyklos | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Tarnystės / plano el. paštas | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Priminimų redaktoriai (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Priminimų redaktorius / nuostatos (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Susiję puslapiai

- [Realaus laiko architektūra](../realtime) — WebSocket protokolas ir kliento primityvai (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), ant kurių remiasi programos viduje pristatymo lygis
- [Web Push pranešimai](../web-push) — VAPID nustatymas ir naršyklės Push API kelias, naudojamas push eskalacijos lygyje
- [Messaging galutiniai taškai](../api/endpoints/messaging) — pilnas REST paviršius žinutėms, pokalbiams, ryšiams ir pranešimų / priminimų maršrutams
