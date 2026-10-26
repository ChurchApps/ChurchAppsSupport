---
title: "Arkitektur for varsler og påminnelser"
---

# Arkitektur for varsler og påminnelser

<div class="article-intro">

Hver melding en kirkemedlem ser utenfor siden de står på – en tellerindikator, et push-varsel, et sammendrag på e-post – passerer én av to innganger i MessagingApi. Denne siden dokumenterer trakten, påminnelsesmotoren som mater den etter en tidsplan, og preferansemodellen som avgjør hva som faktisk når en person.

</div>

## Oversikt – to innganger

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alt som forteller en person noe** går gjennom `NotificationHelper.createNotifications()` i meldingsmodulen. Den lagrer en rad i `notifications` og eskalerer socket → push → e-post, og evaluerer `PreferenceGateHelper` per kanal – inkludert `in_app` på nivå 0.
2. **Alt som er planlagt** er en `reminderDefinition` (på entitetsnivå eller omfangsnivå) som utvides til `reminderOccurrences` og sendes av `ReminderEngine.scan()` på en gjentakende tidtaker. Én utvidelsesmodul, én sender og én sendelogg (`reminderSentLog`).
3. **Direkte e-post** finnes kun bak `TransactionalEmailHelper.sendTransactional()`. En ESLint-regel håndhever dette ved kompilering – se nedenfor.

:::tip E-postinngangen håndheves av lint, ikke bare av konvensjon
`Api/tools/eslint-rules/email-door.cjs` definerer `no-direct-email-helper`: ethvert kall til `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` utenfor `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` feiler lint. Hvis du trenger å sende en e-post, send den gjennom trakten (`createNotifications` med `emailImmediate`) eller gjennom `TransactionalEmailHelper.sendTransactional()` – det finnes ingen tredje måte som består CI.
:::

## Varselstrakten

`NotificationHelper.createNotifications()` er det eneste inngangspunktet for alt som ikke er planlagt eller transaksjonelt:

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

For hver mottaker lagrer den en rad i `notifications` og kaller `attemptDeliveryWithEscalation`, som går gjennom kanalstigen nedenfor. En ulest rad for samme `(contentType, contentId)` hindrer ny opprettelse – denne duplikatsikringen hoppes over for `emailImmediate`-sendinger (påminnelsesforskyvninger, ansattes «send e-post til alle», arbeidsflyt-steg som har sin egen duplikatsjekk) og for direktemeldinger, som alltid sender et socket-signal.

`shared/helpers/NotificationService.ts` speiler samme signatur (`NotificationServiceOptions`) for kallere utenfor meldingsmodulen og registreres i meldingsmodulen ved oppstart.

## Kanaleskaleringskjede

Levering starter på et nivå (0 som standard, eller høyere for påminnelser og eksplisitte sendinger) og går kun videre til neste kanal hvis den forrige ikke lyktes. Hvert nivå styres av `PreferenceGateHelper` før noe forsøkes.

| Nivå | Kanal | Oppførsel |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app`-styringen sjekkes først. Hvis den er undertrykt (dempet), lagres raden med `isNew=false`, og leveringen stopper helt – ingen socket-signal, ingen merke, ingen videre eskalering. Ellers slår serveren opp åpne socket-tilkoblinger for personens `alerts`-rom og sender en `notification`- (eller `privateMessage`-) ramme. For vanlige varsler stopper kjeden her når socket-levering lykkes – tidtakeren på 30 minutter sjekker uleste elementer på nytt og eskalerer dem senere. Direktemeldinger stopper aldri ved socket: en installert PWA kan holde alerts-socketen åpen i bakgrunnen, noe som ellers ville undertrykt push-varselet på operativsystemnivå. |
| 1 | **push** | Styres av `allowPush` / kategoriavmelding / stille tid. Sender til både Expo-push-tokens og Web Push-abonnementer funnet i personens `devices`-rader, fjerner duplikater basert på endepunkt og rydder bort utdaterte tokens underveis. |
| 2 | **e-post** | Styres av `emailFrequency` og kategoriavmelding. Umiddelbare sendinger (`emailImmediate`) gjengis med en gang og skriver en `deliveryLogs`-rad; ellers blir varselet liggende som ventende til batch-sammendraget, beskrevet nedenfor. |
| — | **sms** | Ikke et nivå i eskaleringskjeden. Den eneste styrte SMS-produsenten er påminnelsesmotoren: når en definisjons `channels` inkluderer `sms`, sender `ReminderEngine.sendSms()` en tekstmelding til hver mottaker **i tillegg til** push-/e-postvarselet (se [Tekstpåminnelser](#text-reminders)). Massetekstmeldinger (`TextingController` / `@churchapps/texting`), tjenesteoversiktens **Send tekst til frivillige** (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) og arbeidsflyt-trinnhandlingen **Send tekst** (`StepActionHelper.sendText` → `sendPersonText`) sender alle tekst direkte via kirkens leverandør, så varselpreferanser og stille tid gjelder ikke for dem – kun personens `optedOut`-flagg respekteres. |

Ulest varsler som står igjen på socket eller push eskaleres av tidtakeren på 30 minutter (`NotificationHelper.escalateDelivery`). Samlet e-post sendes av `NotificationHelper.sendEmailNotifications(frequency)`, styrt av hver persons `emailFrequency`-preferanse: `individual` kjører på tidtakeren på 30 minutter, `daily` kjører på den nattlige tidtakeren. (`weekly` er en gyldig preferanseverdi, men har ingen egen batch-kjøring ennå.)

## Påminnelsesmotoren

Planlagte påminnelser – arrangementspåminnelser, oppgavefrister, påminnelser om tjeneste- og planoppdrag – går alle gjennom én generalisert motor i stedet for egen cron-logikk per funksjon.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definisjoner** (`reminderDefinitions`) er enten på entitetsnivå (`entityId` satt – et bestemt arrangement, en oppgave eller en plan) eller på omfangsnivå (`entityId` null, `scopeId` satt – f.eks. hver plan under en tjenesteplantype). En definisjon har en CSV med minuttforskyvninger (`offsets`, f.eks. `"1440,60"` for én dag og én time før), et lokalt sendetidspunkt (`sendLocalTime`), en CSV med kanaler (`channels` – der `email` utløser en umiddelbar e-post med rik formatering ved sendetidspunkt), en `recipientMode` og en valgfri egendefinert `message`.

**Utvidelse** materialiserer utløsingsrader for det kommende horisontet (et rullende vindu på flere dager). Den kjører på den nattlige tidtakeren, og synkront hver gang en definisjon lagres, slik at en påminnelse for et arrangement på siste liten fortsatt utløses. Omfangsdefinisjoner forgrener seg via adapterens `loadScopeEntities`, og lager ett sett forekomster per konkret entitet. Forekomster på entitetsnivå bruker nøkkelen `definitionId:occurrenceISO:offset`, mens omfangsforekomster navnerom etter entitets-id slik at de aldri kolliderer. Å oppdatere en forekomst **gjenoppliver** en tidligere kansellert rad – kanseller og utvid på nytt er standardmåten å resynkronisere en påminnelse etter at den underliggende entiteten er endret; rader som allerede er `sent`, `failed` eller `processing` røres ikke.

**Sending** (`ReminderEngine.scan()`) kjører på tidtakeren på 30 minutter. Den henter forfalte forekomster (en leie hindrer dobbeltbehandling), laster mottakere gjennom entitetens adapter, filtrerer bort alle som allerede er registrert i `reminderSentLog` for forekomsten, og kaller `createNotifications` med `deliveryStartLevel: 1` (hopper rett til push) pluss `emailImmediate`/`emailByPerson` når definisjonens kanaler inkluderer e-post.

### Tekstpåminnelser

Når en definisjons `channels` inkluderer `sms`, kaller `scan()` `ReminderEngine.sendSms()` etter at push-/e-postvarslene er opprettet, for de samme nye mottakerne. Tekstmeldinger er basert på samtykke per medlem:

- Hver mottaker går gjennom `PreferenceGateHelper.evaluate(..., "sms", ...)`, så `allowSms` må være på (den er av som standard og settes fra B1Apps **Tekstmeldinger**-bryter), og kategoriens `sms`-kanal må ikke være overstyrt til av. `event_reminders`, `serving_schedule` og `tasks` har `sms` i både `defaultChannels` og `allowedChannels`.
- Personer uten `mobilePhone` eller med `optedOut` satt undertrykkes. Hvis kirken ikke har en tekstleverandør, undertrykkes resten av batchen med årsaken `no_provider`.
- Meldingsteksten bygges av `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, kuttet til ett segment på 160 tegn.
- Hver mottaker får sin egen `reminderSentLog`-rad med `channel: "sms"` og status `sent` / `suppressed` / `failed`, nøkkelt separat fra push-/e-postraden, slik at en mislykket tekst aldri sender push eller e-post på nytt.

Redigerere viser kun **Text** når `GET /messaging/texting/status` returnerer `{ enabled: true }` (kirkens første tekstleverandør er aktivert).

**STOP-avmelding.** `POST /messaging/texting/inbound/:churchId/:token` er et anonymt webhook som kirken limer inn i sin leverandør (B1Admin viser URL-en fra `GET /messaging/texting/inboundUrl` i tekstinnstillingene). Tokenet er en HMAC av kirke-id-en (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` godtar Twilio-stil skjemafelt og Clearstream/TextInChurch-stil JSON. Hvis svaret er nøyaktig et stoppord fra mobiloperatøren (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), settes `people.optedOut = true` og `allowSms = false` for hver ikke-fjernet person i kirken hvis mobilnummer stemmer. Andre svar bekreftes og ignoreres.

En intern hendelsesbuss reagerer på entitetsendringer uten å vente på den nattlige utvidelsen: innholdshendelser (via webhook-dispatcheren) og hendelser for plan- og oppgaveoppdateringer utløser umiddelbar utvidelse eller kansellering for den berørte entiteten, og en planoppdatering utvider også på nytt omfangsdefinisjoner knyttet til plantypen.

### Adaptere

Motoren er entitetsuavhengig; hver støttet entitetstype kobles til via en adapter (`helpers/adapters/`):

| Entitetstype | Adapter | Merknader |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Mottakere avgrenset til påmeldte eller gruppemedlemmer, avhengig av arrangementet og `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Mottakere er Akseptert + Ubekreftet oppdrag på publiserte (ikke-utkast) planer. Ubekreftede oppdrag utstedt gjennom en tjenestebekreftelsesarbeidsflyt er utelatt inntil de aksepteres (se nedenfor). `buildEmails` kaller `DoingModuleGateway.buildPlanReminderEmails`, som gjengir posisjoner, notater og en egendefinert melding via `doing/helpers/PlanReminderEmailHelper`, inkludert Aksepter/Avslå-knapper signert av `ReminderTokenHelper` som sender til et offentlig endepunkt for svar på oppdrag. |
| `task` | `TaskReminderAdapter` | Mottakere er oppgavens tildelte person(er). |

### Endepunkter

| Metode | Sti | Formål |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Hent eller lagre påminnelsesdefinisjonen for én entitet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Hent eller lagre en påminnelsesdefinisjon på omfangsnivå (arvet). |
| `DELETE` | `/messaging/reminders/:defId` | Slett en definisjon og kanseller dens ventende forekomster. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Forhåndsvis antall mottakere og neste utløsingstidspunkter for en arrangementspåminnelse før lagring. |
| `GET` | `/messaging/reminders/log` | Nylig historikk over påminnelsesforekomster for en kirke. |
| `POST` | `/messaging/reminders/mute` | Demp påminnelser for en bestemt entitet. |

Lagring av en definisjon utløser en synkron ny utvidelse for den entiteten eller omfanget, slik at redigerere ser oppdaterte «neste utløsing» uten å vente på den nattlige jobben.

## Direktemeldinger

Direktemeldinger går samme trakt som alt annet i stedet for en egen eskaleringsvei. Hver ulest samtale får én **skyggerad** i `notifications` (`contentType='privateMessage'`, `contentId` = den private meldingens id, `category='direct_messages'`) som eier all leveringsstatus – socket-/push-/e-posteskalering, lesesporing, alt. Tabellen `privateMessages` beholder selve meldingsinnholdet og en `notifyPersonId`-kolonne, som er kilden til merket for uleste og nullstilles når mottakeren leser samtalen.

Skyggerader er usynlige for varselsklokken: de utelates fra tellespørringen for uleste, listespørringen for varsler og spørringene for merk som lest/slett, som alle filtrerer på `contentType <> 'privateMessage'`. Hver DM-ping går til socket uansett uleststatus (live-chat-semantikk – ingen duplikatsjekk), og DM-er stopper aldri ved socket-levering slik vanlige varsler gjør, siden en PWA i bakgrunnen kan holde en socket åpen mens den fortsatt trenger et push-varsel på operativsystemnivå. Hvis en person demper DM-varsler, parkeres skyggeraden (`isNew=false`, `notifyPersonId` nullstilt) – fortsatt synlig inne i selve samtalen, men uten merker eller varsler.

## Preferanser og styring

Hver sending går gjennom `PreferenceGateHelper.evaluate()`, en ren funksjon (all tilstand sendes inn, ingen databasekall på den kritiske veien) som returnerer `allow`, `suppress` eller `defer`. Lagene kjøres i rekkefølge, og det første som avgjør vinner:

1. **Låst kategori** – noen kategorier er obligatoriske (nivå 0) og omgår alle andre lag.
2. **Hovedmutering / kanalbryter** – `masterMute`, `allowPush`, `allowSms` (av som standard – medlemmer velger selv) eller `emailFrequency='never'` undertrykker direkte.
3. **Stille tid** – kun push og SMS (e-post regnes som lite påtrengende). Hvis klokkeslettet i personens tidssone er innenfor deres stille vindu, slipper en transaksjonell kategori likevel gjennom; en ikke-transaksjonell utsettes til slutten av det stille vinduet, beregnet som et DST-korrekt UTC-tidspunkt via `TimezoneHelper.wallClockToUtc`.
4. **Overstyring av preferanse per kategori** – en eksplisitt avmelding for ett kategori × kanal-par; fravær betyr kategoriens standard.
5. **Mutering per entitet** – en mutering registrert mot en bestemt entitet (f.eks. ett arrangement, én plan) begrenser mer enn innstillingen på kategorinivå, men gjelder kun når avsenderen oppgir en entitets-id/-type sammen med varselet.

Tabeller som er involvert: `notificationPreferences` (globalt – `masterMute`, `emailFrequency` med verdiene `individual|daily|weekly|never`, `allowPush`, stille-tidsvindu og tidssone, `allowSms`), `notificationPreferenceOverrides` (per kategori × kanal) og `notificationEntityMutes` (per entitet).

Denne styringen håndheves for in-app (nivå 0), push (nivå 1) og e-post (nivå 2) inne i trakten – inkludert umiddelbare påminnelses- og sammendrags-e-poster – og for påminnelsestekster i `ReminderEngine.sendSms()`. Transaksjonell e-post (innloggingskoder, passordtilbakestillinger, invitasjoner, gavekvitteringer) omgår den med vilje; det er hele poenget med den andre inngangen.

### Arbeidsflyter for tjenestebekreftelse

En plan kan velge en `workflowType = "assignmentConfirmation"`-arbeidsflyt (`plans.confirmationWorkflowId`). Publiser/Varsle kaller da `POST /doing/plans/:id/issueRequests` i stedet for det per-oppdrag-varselet: hvert nytt Ubekreftet oppdrag får `notified` + `confirmationWorkflowId` og ett arbeidsflytkort (`tasks.assignmentId`, unik `followupKey`). Kortet sender et varsel kun i appen (`appOnly: true` – ingen push- eller e-posteskalering), og kjører deretter arbeidsflytens `sendAssignmentRequest`-handlinger, som går gjennom `MessagingModuleGateway.sendServingWorkflowMessage`: e-post via `NotificationHelper.sendWorkflowEmail` (preferansestyring + `ChurchEmailLimiter`, målt som `workflowEmail`), SMS via `sendPersonText` kun med `allowSms` og kategoristyringen `serving_schedule`. Aksepter/Avslå (`assignment.updated` på hendelsesbussen) lukker kortet. Tidtakeren på 30 minutter (`AssignmentWorkflowHelper.processPending`) reparerer tapte starter og hendelser, og gjør en ubesvart forespørsel ved oppfølgingsfristen om til en oppgave for leder-gjennomgang. Full livssyklus: `Api/docs/assignment-confirmation-workflows.md`.

## Kirkeskrevne e-postgrenser

E-post hvis innhold en kirke har skrevet, sendes fra den delte ChurchApps SES-identiteten, og måles derfor per kirke av `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Fire veier kaller den: gruppe- og malsendinger (`EmailTemplateController`, innholdstype `email`), oppfølgings-e-poster fra skjema (`FormSubmissionController`, `formFollowUp`), arbeidsflyt-handlingen **Send e-post** (`NotificationHelper` med `churchAuthored`, `workflowEmail`) og e-poster med forespørsler om tjenestebekreftelse (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systemepost (innloggingskoder, kvitteringer, påminnelser) og invitasjoner til roller og grupper (`UserController.sendInviteEmail`, en fast mal) måles ikke.

- **Godkjenningsport.** En kirke sender ingenting før en serveradministrator setter `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Serveradministrator → Kirker → **Group Email**-brikken). Arkiverte kirker blokkeres alltid. B1Admins dialog for Send e-post leser `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`), og viser når den ikke er godkjent et **Be om gjennomgang**-kort i stedet for redigeringsverktøyet. Redigeringen for arbeidsflyt-trinn leser samme endepunkt (åpent for `tasks.admin` i tillegg til `groupMembers.edit`) for å advare ved **Send e-post**-handlinger når kirken ikke er godkjent eller er satt på pause. Ved sending returnerer `MessagingModuleGateway.sendTemplatedEmail` `false` uten å opprette et varsel når `ChurchEmailLimiter.remaining()` er under 1, slik at kortets historikk aldri hevder **E-post sendt** for post som ble droppet. `POST /messaging/emailTemplates/requestApproval` sender e-post til support, høyst én gang per kirke per uke.
- **Opptjent kvote.** En godkjent kirke får `max(150, 2 × sin beste kirkeskrevne dag de siste 30 dagene)`, begrenset til 2 000 per rullende 24 timer. Inneværende 24 timer utelates fra «beste dag», slik at et skyll ikke kan heve sin egen grense.
- **Reserver, deretter avgjør.** `reserve()` skriver én `deliveryLogs`-rad per mottaker før sending, kontrollerer kvoten på nytt med disse radene talt med, og trekker seg tilbake hvis to forespørsler løp forbi grensen (sendingen returnerer 429). `settle()` markerer hver rad som sendt eller mislykket.
- **Klagepause.** Lambda-funksjonen `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, matet av SES → SNS) knytter hver permanent bounce eller klage til kirken hvis kirkeskrevne e-post nådde den adressen omtrent på det tidspunktet, lagret som `deliveryMethod` `sesBounce` / `sesComplaint`. En kirke settes på pause ved 2 eller flere klager (≥ 0,3 % av sendingene) eller 10 eller flere harde bounces (≥ 5 %) i løpet av 7 dager.

## Planlegging

Både påminnelsesmotoren og sammendraget av varsler kjører på eksisterende planlagte tidtakere i stedet for å innføre ny infrastruktur:

| Tidtaker | Tidsplan | Kjører |
|-------|----------|----------|
| Tidtaker på 30 minutter | hvert 30. minutt | Eskalerer uleste varsler; sender sammendrags-e-poster med `individual`-frekvens; sender forfalte påminnelsesforekomster (`ReminderEngine.scan`); godkjenningssammendrag; forfalte automatiseringsutførelser |
| Nattlig tidtaker | 05:00 UTC | Påminnelser om gruppeoppmøte; avanserer gjentakende strømmede gudstjenester; oppdaterer listene som oppdateres automatisk; utvider påminnelsesforekomster for neste horisont (`ReminderEngine.expandAll`); sender sammendrags-e-poster med `daily`-frekvens |

Lokalt kan den samme logikken utløses på forespørsel med `npm run timer:30min` og `npm run timer:midnight` fra prosjektet `Api`.

## Filoversikt

| Område | Filer |
|------|------|
| Trakt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Delt inngang | `Api/src/shared/helpers/NotificationService.ts` |
| Transaksjonell inngang | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint-regel `Api/tools/eslint-rules/email-door.cjs` |
| Kirkens e-postgrenser | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Påminnelsesmotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Tekst / STOP-avmelding | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (tjenesteoversiktens **Send tekst til frivillige**) |
| Påminnelsesrepositorier | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Tjeneste-/plan-e-post | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Påminnelsesredigerere (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Påminnelsesredigerer / preferanser (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterte sider

- [Sanntidsarkitektur](../realtime) – WebSocket-protokollen og klientprimitivene (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) som nivået for leveringen i appen bygger på
- [Web Push-varsler](../web-push) – VAPID-oppsett og nettleserens Push API-sti som brukes av push-eskaleringsnivået
- [Endepunkter for meldinger](../api/endpoints/messaging) – fullstendig REST-grensesnitt for meldinger, samtaler, forbindelser og ruter for varsler og påminnelser
