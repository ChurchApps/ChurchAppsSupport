---
title: "Arkitektur for notifikationer og påmindelser"
description: "Hvordan B1 Admin API'et router notifikationer, planlagte påmindelser, kirkens e-mailgrænser og sms-fravalg via én leveringskanal og præferencefilter."
---

# Arkitektur for notifikationer og påmindelser

<div class="article-intro">

Hver besked et kirkemedlem ser uden for den side, de kigger på — et badge-tal, en push-notifikation, en daglig e-mailoversigt — passerer en af to indgange i MessagingApi. Denne side beskriver tragten, påmindelsesmotoren, der fodrer den efter en tidsplan, og præferencemodellen, der afgør, hvad der faktisk når frem til en person.

</div>

## Oversigt — to indgange

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alt, der fortæller en person noget**, går gennem `NotificationHelper.createNotifications()` i messaging-modulet. Den gemmer en række i `notifications` og eskalerer fra socket → push → e-mail, hvor `PreferenceGateHelper` evalueres for hver kanal — inklusive `in_app` på niveau 0.
2. **Alt, der er planlagt**, er en `reminderDefinition` (på entitetsniveau eller scope-niveau), som udvides til `reminderOccurrences` og afsendes af `ReminderEngine.scan()` på en gentagende timer. Én udvider, én afsender og ét afsendelsesregnskab (`reminderSentLog`).
3. **Direkte e-mail** findes kun bag `TransactionalEmailHelper.sendTransactional()`. En ESLint-regel håndhæver dette ved kompilering — se nedenfor.

:::tip E-mail-indgangen håndhæves af lint, ikke kun af konvention
`Api/tools/eslint-rules/email-door.cjs` definerer `no-direct-email-helper`: ethvert kald til `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` uden for `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` fejler lint. Hvis du skal sende en e-mail, skal den gå gennem tragten (`createNotifications` med `emailImmediate`) eller gennem `TransactionalEmailHelper.sendTransactional()` — der findes ingen tredje vej, der består CI.
:::

## Notifikationstragten

`NotificationHelper.createNotifications()` er det eneste indgangspunkt for alt, der hverken er planlagt eller transaktionelt:

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

For hver modtager gemmer den en række i `notifications` og kalder `attemptDeliveryWithEscalation`, som gennemgår kanalstigen nedenfor. En stadig ulæst række for samme `(contentType, contentId)` forhindrer oprettelse af en ny — denne dubletkontrol springes over for `emailImmediate`-afsendelser (påmindelsesforskydninger, medarbejderes "e-mail alle", workflow-trin, som selv håndterer deres dublethed) og for direkte beskeder, som altid sender et ping til socket.

`shared/helpers/NotificationService.ts` spejler den samme signatur (`NotificationServiceOptions`) for kaldere uden for messaging-modulet og registreres hos messaging-modulet ved opstart.

## Kanaleskaleringskæden

Levering starter på et niveau (0 som standard, eller højere for påmindelser og eksplicitte afsendelser) og fortsætter kun til den næste kanal, hvis den forrige ikke lykkedes. Hvert niveau gates af `PreferenceGateHelper`, før noget forsøges.

| Niveau | Kanal | Adfærd |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app`-gaten tjekkes først. Hvis den er undertrykt (slået fra), gemmes rækken med `isNew=false`, og levering stopper helt — intet socket-ping, intet badge, ingen yderligere eskalering. Ellers slår serveren op efter åbne socket-forbindelser til personens `alerts`-rum og sender en `notification`- (eller `privateMessage`-) frame. For almindelige notifikationer stopper en vellykket socket-levering kæden her — 30-minutters timeren gentjekker ulæste elementer og eskalerer dem senere. Direkte beskeder stopper aldrig ved socket: en installeret PWA kan holde alerts-socketen åben i baggrunden, hvilket ellers ville undertrykke push på operativsystemniveau. |
| 1 | **push** | Gated af `allowPush` / kategori-fravalg / stille tid. Sender til både Expo push-tokens og Web Push-abonnementer, der findes i personens `devices`-rækker, deduplikerer efter endpoint og fjerner forældede tokens undervejs. |
| 2 | **e-mail** | Gated af `emailFrequency` og kategori-fravalg. Øjeblikkelige afsendelser (`emailImmediate`) renderes med det samme og skriver en `deliveryLogs`-række; ellers forbliver notifikationen afventende til den daglige batch-oversigt, beskrevet nedenfor. |
| — | **sms** | Ikke et niveau i eskaleringskæden. Den eneste gatede SMS-producent er påmindelsesmotoren: når en definitions `channels` inkluderer `sms`, sender `ReminderEngine.sendSms()` en sms til hver modtager **ud over** push-/e-mailnotifikationen (se [Sms-påmindelser](#text-reminders)). Massesms (`TextingController` / `@churchapps/texting`), serveringsoversigtens **Send sms til frivillige** (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) og workflow-handlingen **Send sms** (`StepActionHelper.sendText` → `sendPersonText`) sender alle sms'er direkte gennem kirkens udbyder, så notifikationspræferencer og stille tid gælder ikke for dem — kun personens `optedOut`-flag respekteres. |

Ulæste notifikationer, der står tilbage på socket eller push, eskaleres af 30-minutters timeren (`NotificationHelper.escalateDelivery`). Batch-e-mail sendes af `NotificationHelper.sendEmailNotifications(frequency)`, styret af hver persons `emailFrequency`-præference: `individual` kører på 30-minutters timeren, `daily` kører på den natlige timer. (`weekly` er en gyldig præferenceværdi, men har endnu ingen dedikeret batch-kørsel.)

## Påmindelsesmotoren

Planlagte påmindelser — begivenhedspåmindelser, opgaveforfaldsdatoer, påmindelser om tjeneste- og planopgaver — går alle gennem én generaliseret motor i stedet for specialbygget cron-logik for hver funktion.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitioner** (`reminderDefinitions`) er enten på entitetsniveau (`entityId` sat — en specifik begivenhed, opgave eller plan) eller på scope-niveau (`entityId` null, `scopeId` sat — f.eks. alle planer under en tjenesteplanstype). En definition indeholder en CSV-liste af minutforskydninger (`offsets`, f.eks. `"1440,60"` for én dag og én time før), et lokalt afsendelsestidspunkt (`sendLocalTime`), en CSV-liste af kanaler (`channels` — hvor `email` udløser en øjeblikkelig rig e-mail på afsendelsestidspunktet), en `recipientMode` og en valgfri brugerdefineret `message`.

**Udvidelse** materialiserer udløsningsrækker for den kommende horisont (et rullende vindue på flere dage). Den kører på den natlige timer og synkront, hver gang en definition gemmes, så en påmindelse for en begivenhed med kort varsel stadig udløses. Scope-definitioner fordeles via adapterens `loadScopeEntities` og giver ét forekomstsæt pr. konkret entitet; forekomster på entitetsniveau bruger nøglen `definitionId:occurrenceISO:offset`, mens scopede forekomster navngiver sig efter entitets-id, så de aldrig kolliderer. Upsert af en forekomst **genopliver** en tidligere annulleret række — annuller-og-udvid igen er den standardmåde at resynkronisere en påmindelse, efter den underliggende entitet er ændret; rækker, der allerede er `sent`, `failed` eller `processing`, røres ikke.

**Afsendelse** (`ReminderEngine.scan()`) kører på 30-minutters timeren. Den reserverer forfaldne forekomster (en lease forhindrer dobbeltbehandling), indlæser modtagere gennem entitetens adapter, filtrerer alle, der allerede er registreret i `reminderSentLog` for den forekomst, og kalder `createNotifications` med `deliveryStartLevel: 1` (spring direkte til push) plus `emailImmediate`/`emailByPerson`, når definitionens kanaler inkluderer e-mail.

### Sms-påmindelser

Når en definitions `channels` inkluderer `sms`, kalder `scan()` `ReminderEngine.sendSms()`, efter push-/e-mailnotifikationerne er oprettet, for de samme nye modtagere. Sms'er er tilvalg pr. medlem:

- Hver modtager gennemgår `PreferenceGateHelper.evaluate(..., "sms", ...)`, så `allowSms` skal være slået til (den er som standard fra og sættes via B1Apps kontakt **Tekstbeskeder**), og kategoriens `sms`-kanal må ikke være overstyret til fra. `event_reminders`, `serving_schedule` og `tasks` angiver `sms` i både `defaultChannels` og `allowedChannels`.
- Personer uden `mobilePhone` eller med `optedOut` sat udelades. Hvis kirken ikke har en sms-udbyder, undertrykkes resten af batchen med årsagen `no_provider`.
- Teksten opbygges af `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, trimmet til ét 160-tegns segment.
- Hver modtager får sin egen `reminderSentLog`-række med `channel: "sms"` og status `sent` / `suppressed` / `failed`, adskilt fra push-/e-mailrækken, så en mislykket sms aldrig gensender push eller e-mail.

Redigeringsværktøjerne tilbyder kun **Sms** når `GET /messaging/texting/status` returnerer `{ enabled: true }` (kirkens første sms-udbyder er aktiveret).

**STOP-fravalg.** `POST /messaging/texting/inbound/:churchId/:token` er et anonymt webhook, som kirken indsætter i sin udbyder (B1Admin viser URL'en fra `GET /messaging/texting/inboundUrl` i sms-indstillingerne). Tokenet er en HMAC af kirke-id'et (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accepterer Twilio-lignende formularfelter og Clearstream/TextInChurch-lignende JSON; hvis svaret præcist er et operatørstopord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), får hver ikke-fjernet person i kirken, hvis mobilnummer matcher, sat `people.optedOut = true` og `allowSms = false`. Andre svar bekræftes og ignoreres.

En intern event bus reagerer på entitetsændringer uden at vente på den natlige udvidelse: indholdshændelser (via webhook-dispatcheren) og plan-/opgaveopdateringer udløser øjeblikkelig udvidelse eller annullering for den berørte entitet, og en planopdatering udvider også alle scope-definitioner knyttet til dens plantype igen.

### Adaptere

Motoren er entitetsuafhængig; hver understøttet entitetstype kobles til gennem en adapter (`helpers/adapters/`):

| Entitetstype | Adapter | Noter |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Modtagere afgrænset til tilmeldte eller gruppemedlemmer, afhængigt af begivenheden og `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Modtagere er Accepterede + Ubekræftede tildelinger på publicerede (ikke-kladde) planer. Ubekræftede tildelinger udstedt gennem en tjeneste-bekræftelsesworkflow udelukkes, indtil de er accepteret (se nedenfor). `buildEmails` kalder `DoingModuleGateway.buildPlanReminderEmails`, som gengiver positioner, noter og en brugerdefineret besked via `doing/helpers/PlanReminderEmailHelper`, herunder knapperne Accepter/Afslå signeret af `ReminderTokenHelper`, som sender til et offentligt endpoint for svar på tildelinger. |
| `task` | `TaskReminderAdapter` | Modtagere er opgavens tildelte person(er). |

### Endpoints

| Metode | Sti | Formål |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Indlæs eller gem påmindelsesdefinitionen for én entitet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Indlæs eller gem en påmindelsesdefinition på scope-niveau (nedarvet). |
| `DELETE` | `/messaging/reminders/:defId` | Slet en definition og annuller dens afventende forekomster. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Forhåndsvis antal modtagere og næste udløsningstidspunkter for en begivenhedspåmindelse, før den gemmes. |
| `GET` | `/messaging/reminders/log` | Nylig historik over påmindelsesforekomster for en kirke. |
| `POST` | `/messaging/reminders/mute` | Slå påmindelser fra for en specifik entitet. |

Gemning af en definition udløser en synkron udvidelse for den pågældende entitet eller scope, så redaktører ser opdaterede "næste udløsninger" uden at vente på den natlige opgave.

## Direkte beskeder

Direkte beskeder følger samme tragt som alt andet i stedet for en separat eskaleringssti. Hver ulæst samtale får én **skyggerække** i `notifications` (`contentType='privateMessage'`, `contentId` = den private beskeds id, `category='direct_messages'`), som ejer al leveringstilstand — socket-/push-/e-mail-eskalering, læsesporing, alt. Tabellen `privateMessages` selv gemmer beskedindholdet og en kolonne `notifyPersonId`, som er kilden til det ulæste badge og ryddes, når modtageren læser samtalen.

Skyggerækker er usynlige for notifikationsklokken: de udelukkes fra optællingen af ulæste, listeforespørgslen for notifikationer og forespørgslerne til markér-som-læst/slet, som alle filtrerer på `contentType <> 'privateMessage'`. Hvert DM-ping rammer socket uanset ulæst-tilstand (live-chatsemantik — ingen dubletkontrol), og DM'er stopper aldrig ved socket-levering, som almindelige notifikationer gør, da en PWA i baggrunden kan holde en socket åben, mens den stadig har brug for push på operativsystemniveau. Hvis en person slår DM-notifikationer fra, parkeres skyggerækken (`isNew=false`, `notifyPersonId` ryddet) — stadig synlig inde i selve samtalen, men uden badges eller advarsler.

## Præferencer og gating

Hver afsendelse passerer `PreferenceGateHelper.evaluate()`, en ren funktion (al tilstand sendes ind, ingen databasekald på den kritiske sti), som returnerer `allow`, `suppress` eller `defer`. Lagene køres i rækkefølge, og det første, der afgør sagen, vinder:

1. **Låst kategori** — nogle kategorier er obligatoriske (niveau 0) og omgår alle andre lag.
2. **Hovedlydløs / kanal-slukning** — `masterMute`, `allowPush`, `allowSms` (fra som standard — medlemmer tilvælger) eller `emailFrequency='never'` undertrykker direkte.
3. **Stille tid** — kun push og sms (e-mail betragtes som ikke-forstyrrende). Hvis det aktuelle vægur-tidspunkt i personens tidszone falder inden for vinduet for stille tid, kommer en transaktionel kategori stadig igennem; en ikke-transaktionel kategori udskydes til slutningen af vinduet for stille tid, beregnet som et DST-korrekt UTC-tidspunkt via `TimezoneHelper.wallClockToUtc`.
4. **Præferenceoverstyring pr. kategori** — et eksplicit fravalg for et kategori × kanal-par; fravær betyder kategoriens standard.
5. **Lydløs pr. entitet** — en lydløsning registreret for en bestemt entitet (f.eks. én begivenhed, én plan) begrænser mere end indstillingen på kategoriniveau, men gælder kun, når kalderen angiver et entitets-id/-type sammen med notifikationen.

Involverede tabeller: `notificationPreferences` (globalt — `masterMute`, `emailFrequency` med værdierne `individual|daily|weekly|never`, `allowPush`, vindue for stille tid + tidszone, `allowSms`), `notificationPreferenceOverrides` (pr. kategori × kanal) og `notificationEntityMutes` (pr. entitet).

Denne gate håndhæves for in-app (niveau 0), push (niveau 1) og e-mail (niveau 2) inde i tragten — inklusive øjeblikkelige påmindelses- og oversigtsmails — og for påmindelses-sms'er i `ReminderEngine.sendSms()`. Transaktionel e-mail (login-koder, nulstilling af adgangskoder, invitationer, donationskvitteringer) omgår den med vilje; det er hele pointen med den anden indgang.

### Tjeneste-bekræftelsesworkflows

En plan kan vælge en `workflowType = "assignmentConfirmation"`-workflow (`plans.confirmationWorkflowId`). Publicér/Notificér kalder derefter `POST /doing/plans/:id/issueRequests` i stedet for notifikationen pr. tildeling: hver ny Ubekræftet tildeling får `notified` + `confirmationWorkflowId` og ét workflow-kort (`tasks.assignmentId`, unik `followupKey`). Kortet sender en alert, der kun vises i appen (`appOnly: true` — ingen eskalering til push/e-mail), og kører derefter workflowens `sendAssignmentRequest`-handlinger, som går gennem `MessagingModuleGateway.sendServingWorkflowMessage`: e-mail via `NotificationHelper.sendWorkflowEmail` (præferencegate + `ChurchEmailLimiter`, målt som `workflowEmail`), sms via `sendPersonText` kun med `allowSms` og gaten for kategorien `serving_schedule`. Accepter/Afslå (`assignment.updated` på event bus) lukker kortet; 30-minutters timeren (`AssignmentWorkflowHelper.processPending`) reparerer manglende starter og hændelser og omdanner en ubesvaret anmodning efter opfølgningsfristen til en opgave for gennemgang hos lederen. Fuld livscyklus: `Api/docs/assignment-confirmation-workflows.md`.

## Grænser for kirkeskrevne e-mails

E-mail, hvis indhold en kirke har skrevet, sendes fra den fælles ChurchApps SES-identitet, og derfor måles den pr. kirke af `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Fire stier kalder den: gruppe-/skabelonafsendelser (`EmailTemplateController`, indholdstype `email`), opfølgnings-e-mails fra formularer (`FormSubmissionController`, `formFollowUp`), workflow-handlingen **Send e-mail** (`NotificationHelper` med `churchAuthored`, `workflowEmail`) og e-mails med anmodning om tjenestebekræftelse (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systemmail (login-koder, kvitteringer, påmindelser) og invitationer til roller og grupper (`UserController.sendInviteEmail`, en fast skabelon) måles ikke.

- **Godkendelsesgate.** En kirke sender intet, før en serveradministrator sætter `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chippen **Gruppe-e-mail**). Arkiverede kirker blokeres altid. B1Admins dialog for Send e-mail læser `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) og viser, når den ikke er godkendt, et kort med **Anmod om gennemgang** i stedet for editoren. Editoren for workflow-trin læser det samme endpoint (åbent for `tasks.admin` såvel som `groupMembers.edit`) for at advare ved handlingerne **Send e-mail**, når kirken ikke er godkendt eller er sat på pause. Ved afsendelse returnerer `MessagingModuleGateway.sendTemplatedEmail` `false` uden at oprette en notifikation, når `ChurchEmailLimiter.remaining()` er under 1, så kortets historik aldrig påstår **E-mail sendt** for mail, der blev droppet. `POST /messaging/emailTemplates/requestApproval` sender en e-mail til support, højst én gang pr. kirke om ugen.
- **Optjent kvote.** En godkendt kirke får `max(150, 2 × dens bedste dag med kirkeskrevne e-mails i de foregående 30 dage)`, begrænset til 2.000 pr. rullende 24 timer. Den aktuelle 24-timersperiode udelukkes fra "bedste dag", så et udbrud ikke kan hæve sin egen grænse.
- **Reservér, og afregn bagefter.** `reserve()` skriver én `deliveryLogs`-række pr. modtager før afsendelse, kontrollerer kvoten igen med disse rækker talt med og trækker sig tilbage, hvis to anmodninger løb forbi grænsen (afsendelsen returnerer 429). `settle()` markerer hver række som sendt eller mislykket.
- **Pause ved klager.** Lambdaen `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, fodret af SES → SNS) knytter hver permanent bounce eller klage til den kirke, hvis kirkeskrevne e-mail nåede den adresse omkring det tidspunkt, og gemmer den som `deliveryMethod` `sesBounce` / `sesComplaint`. En kirke sættes på pause ved 2+ klager (≥ 0,3 % af afsendelserne) eller 10+ hårde bounces (≥ 5 %) inden for 7 dage.

## Planlægning

Både påmindelsesmotoren og notifikationsoversigten kører på eksisterende planlagte timere i stedet for at introducere ny infrastruktur:

| Timer | Plan | Kører |
|-------|----------|------|
| 30-minutters timer | hver 30. minut | Eskalerer ulæste notifikationer; sender oversigtsmails med frekvensen `individual`; afsender forfaldne påmindelsesforekomster (`ReminderEngine.scan`); godkendelsesoversigter; forfaldne automatiseringsudførelser |
| Natlig timer | 05:00 UTC | Påmindelser om gruppedeltagelse; fremrykker gentagne streamingtjenester; opdaterer automatisk opdaterede lister; udvider påmindelsesforekomster for den næste horisont (`ReminderEngine.expandAll`); sender oversigtsmails med frekvensen `daily` |

Lokalt kan den samme logik udløses efter behov med `npm run timer:30min` og `npm run timer:midnight` fra projektet `Api`.

## Filoversigt

| Område | Filer |
|------|-------|
| Tragt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Delt indgang | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionel indgang | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint-regel `Api/tools/eslint-rules/email-door.cjs` |
| Grænser for kirkens e-mail | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Påmindelsesmotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Sms / STOP-fravalg | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (serveringsoversigtens **Send sms til frivillige**) |
| Påmindelsesrepositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Tjeneste-/plan-e-mail | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Påmindelseseditorer (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Påmindelseseditor / præferencer (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterede sider

- [Realtidsarkitektur](../realtime.md) — WebSocket-protokollen og klientprimitiverne (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), som leveringsniveauet i appen bygger på
- [Web Push-notifikationer](../web-push.md) — VAPID-opsætning og browserens Push API-sti, der bruges af push-eskaleringsniveauet
- [Messaging-endpoints](../api/endpoints/messaging.md) — den fulde REST-overflade for beskeder, samtaler, forbindelser og notifikations- og påmindelsesruter
