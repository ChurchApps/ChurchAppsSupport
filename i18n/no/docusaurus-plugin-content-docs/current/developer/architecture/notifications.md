---
title: "Arkitektur for varsler og påminnelser"
description: "Hvordan B1 Admin-API-et ruter varsler, planlagte påminnelser, e-postgrenser for menigheter og tekstavmeldinger gjennom én leveringstrakt og én preferansesjekk."
---

# Arkitektur for varsler og påminnelser

<div class="article-intro">

Alt en medlem ser utenfor siden de ser på -- et merke med antall, et pushvarsel, et e-postsammendrag -- går gjennom en av to dører i MessagingApi. Denne siden dokumenterer trakten, påminnelsesmotoren som mater den etter en plan, og preferansemodellen som avgjør hva som faktisk når en person.

</div>

## Oversikt -- to dører

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alt som forteller en person noe** går gjennom `NotificationHelper.createNotifications()` i meldingsmodulen. Den lagrer en rad i `notifications` og eskalerer socket → push → e-post, og evaluerer `PreferenceGateHelper` per kanal -- inkludert `in_app` på nivå 0.
2. **Alt som er planlagt** er en `reminderDefinition` (på enhetsnivå eller scope-nivå) som utvides til `reminderOccurrences` og sendes av `ReminderEngine.scan()` på en gjentakende timer. Én utvider, én sender og ett sendelogg (`reminderSentLog`). Unntaket er et pushvarsel fra staben som planlegges fra B1Admins **Mobil > Pushvarsler**-side eller en gruppes **Varsle**-dialog: det er en `scheduledNotifications`-rad (målgruppe `church` eller `group`), sendt av `ScheduledNotificationHelper.dispatchDue()` på 1-minutters-timeren. En rad som er mer enn 30 minutter forbi `sendAt` ved første forsøk, markeres som mislykket med `missed send window` i stedet for å sendes for sent, og en mislykket sending forsøkes på nytt opptil 3 ganger. Mottakere løses ved sendetidspunktet av `PushAudienceHelper`, den samme hjelperen som den umiddelbare gruppesendingen bruker, og leveres gjennom `createNotifications()` som `churchPushNotification` (preferansekategori `announcements`) eller `groupPushNotification`.
3. **Direkte e-post** finnes bare bak `TransactionalEmailHelper.sendTransactional()`. En ESLint-regel håndhever dette ved kompilering -- se under.

:::tip E-postdøren håndheves av lint, ikke bare konvensjon
`Api/tools/eslint-rules/email-door.cjs` definerer `no-direct-email-helper`: ethvert kall til `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` utenfor `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` feiler lint. Hvis du må sende en e-post, send den gjennom trakten (`createNotifications` med `emailImmediate`) eller gjennom `TransactionalEmailHelper.sendTransactional()` -- det finnes ingen tredje vei som består CI.
:::

## Varseltrakten

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

For hver mottaker lagrer den en rad i `notifications` og kaller `attemptDeliveryWithEscalation`, som går gjennom kanalstigen nedenfor. En fortsatt ulest rad for samme `(contentType, contentId)` hindrer ny opprettelse -- denne duplikatvernen hoppes over for `emailImmediate`-sendinger (påminnelsesforskyvninger, «e-post til alle» fra staben, arbeidsflyttrinn som har egen deduplisering) og for direktemeldinger, som alltid sender et socket-ping.

`shared/helpers/NotificationService.ts` speiler den samme signaturen (`NotificationServiceOptions`) for kallere utenfor meldingsmodulen, og den er registrert i meldingsmodulen ved oppstart.

## Kanaleskaleringskjeden

Leveringen starter på et nivå (0 som standard, eller høyere for påminnelser og eksplisitte sendinger), og går bare videre til neste kanal hvis den forrige ikke lyktes. Hvert nivå evalueres av `PreferenceGateHelper` før noe forsøkes.

| Nivå | Kanal | Atferd |
|-------|---------|----------|
| 0 | **in_app / socket** | Gaten `in_app` sjekkes først. Hvis den er undertrykt (dempet), lagres raden med `isNew=false`, og leveringen stopper helt -- ingen socket-ping, ingen merke, ingen videre eskalering. Ellers slår serveren opp åpne socket-tilkoblinger til personens `alerts`-rom og sender en `notification`-ramme (eller `privateMessage`). For vanlige varsler stopper en vellykket socket-levering her -- 30-minutters-timeren sjekker uleste elementer på nytt og eskalerer dem senere. Direktemeldinger stopper aldri ved socket: en installert PWA kan holde alerts-socketen åpen i bakgrunnen, noe som ellers ville undertrykt pushvarselet på operativsystemnivå. |
| 1 | **push** | Styres av `allowPush` / kategoriavmelding / stille tider. Sendes til både Expo-pushtokener og Web Push-abonnementer som finnes på personens `devices`-rader, med deduplisering etter endepunkt og fjerning av utdaterte tokener underveis. |
| 2 | **e-post** | Styres av `emailFrequency` og kategoriavmelding. Umiddelbare sendinger (`emailImmediate`) gjengis med en gang og skriver en `deliveryLogs`-rad; ellers blir varselet liggende som ventende til batchsammendraget beskrevet under. |
| — | **sms** | Ikke et nivå i eskaleringskjeden. Den eneste styrte SMS-produsenten er påminnelsesmotoren: når en definisjons `channels` inkluderer `sms`, sender `ReminderEngine.sendSms()` en tekst til hver mottaker **i tillegg til** push/e-post-varselet (se [Tekstpåminnelser](#text-reminders)). Masse-tekst (`TextingController` / `@churchapps/texting`), tjenestegjøringsoversiktens **Tekst frivillige**-utsending (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) og arbeidsflyttrinnet **Send tekst** (`StepActionHelper.sendText` → `sendPersonText`) sender alle tekst direkte gjennom menighetens leverandør, så varselinnstillinger og stille tider gjelder ikke for dem -- bare personens `optedOut`-flagg respekteres. |

Uleste varsler som står igjen på socket eller push eskaleres av 30-minutters-timeren (`NotificationHelper.escalateDelivery`). Batch-e-post sendes av `NotificationHelper.sendEmailNotifications(frequency)`, styrt av hver persons `emailFrequency`-innstilling: `individual` kjører på 30-minutters-timeren, `daily` kjører på nattetimeren. (`weekly` er en gyldig innstillingsverdi, men har ingen egen batchkjøring ennå.)

## Påminnelsesmotoren

Planlagte påminnelser -- arrangementspåminnelser, oppgaveforfall, påminnelser om tjeneste- og planoppdrag -- går alle gjennom én generalisert motor i stedet for egen cron-logikk per funksjon.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definisjoner** (`reminderDefinitions`) er enten på enhetsnivå (`entityId` satt -- et bestemt arrangement, en oppgave eller en plan) eller på scope-nivå (`entityId` null, `scopeId` satt -- f.eks. alle planer under en plantype). En definisjon har en kommaseparert liste med minuttforskyvninger (`offsets`, f.eks. `"1440,60"` for én dag og én time før), et lokalt sendetidspunkt (`sendLocalTime`), en kommaseparert liste med kanaler (`channels` -- `email` gir en umiddelbar e-post med rik formatering ved sendetidspunktet), en `recipientMode` og en valgfri egendefinert `message`.

**Utvidelse** (`expand`) materialiserer utløsende rader for horisonten fremover (et rullende vindu på flere dager). Den kjøres på nattetimeren, og synkront hver gang en definisjon lagres, slik at en påminnelse for et arrangement med kort varsel likevel utløses. Scope-definisjoner spres via adapterens `loadScopeEntities`, og gir ett forekomstsett per konkret enhet; forekomster på enhetsnivå bruker nøkkelen `definitionId:occurrenceISO:offset`, mens scope-forekomster navneromsetter etter enhets-ID, slik at de aldri kolliderer. Å legge inn en forekomst **gjenoppretter** en tidligere kansellert rad -- kanseller-og-utvid-på-nytt er standardmåten å synkronisere en påminnelse på nytt etter at den underliggende enheten har endret seg; rader som allerede er `sent`, `failed` eller `processing` røres ikke.

**Utsending** (`ReminderEngine.scan()`) kjører på 30-minutters-timeren. Den tar i besittelse forekomster som forfaller (en lease hindrer dobbel behandling), laster mottakere gjennom enhetens adapter, filtrerer ut alle som allerede står i `reminderSentLog` for forekomsten, og kaller `createNotifications` med `deliveryStartLevel: 1` (hopper rett til push) pluss `emailImmediate`/`emailByPerson` når definisjonens kanaler inkluderer e-post.

### Tekstpåminnelser {#text-reminders}

Når en definisjons `channels` inkluderer `sms`, kaller `scan()` `ReminderEngine.sendSms()` etter at push/e-post-varslene er laget, for de samme nye mottakerne. Tekst er opt-in per medlem:

- Hver mottaker går gjennom `PreferenceGateHelper.evaluate(..., "sms", ...)`, så `allowSms` må være på (den er av som standard og settes av bryteren **Tekstmeldinger** i B1App), og kategoriens `sms`-kanal må ikke være overstyrt til av. `event_reminders`, `serving_schedule` og `tasks` har `sms` i både `defaultChannels` og `allowedChannels`.
- Personer uten `mobilePhone` eller med `optedOut` satt undertrykkes. Hvis menigheten ikke har en tekstleverandør, undertrykkes resten av batchen med årsak `no_provider`.
- Teksten bygges av `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, kuttet til ett segment på 160 tegn.
- Hver mottaker får en egen `reminderSentLog`-rad med `channel: "sms"` og status `sent` / `suppressed` / `failed`, nøklet separat fra push/e-post-raden, slik at en mislykket tekst aldri sender push eller e-post på nytt.

Redigerere tilbyr bare **Tekst** når `GET /messaging/texting/status` returnerer `{ enabled: true }` (menighetens første tekstleverandør er aktivert).

**STOP-avmelding.** `POST /messaging/texting/inbound/:churchId/:token` er et anonymt webhook som menigheten limer inn hos leverandøren sin (B1Admin viser nettadressen fra `GET /messaging/texting/inboundUrl` i tekstinnstillingene). Tokenet er en HMAC av menighets-ID-en (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` godtar Twilio-stil skjemafelt og Clearstream-/TextInChurch-stil JSON. Hvis svaret er nøyaktig et stoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), får hver ikke-fjernet person i menigheten hvis mobilnummer samsvarer `people.optedOut = true` og `allowSms = false`. Andre svar bekreftes og ignoreres.

En intern hendelsesbuss reagerer på endringer av enheter uten å vente på nattlig utvidelse: innholdshendelser (via webhook-dispatcheren) og hendelser for oppdatering av plan/oppgave utløser umiddelbar utvidelse eller kansellering for den berørte enheten, og en oppdatering av plan utvider også på nytt alle scope-definisjoner knyttet til plantypen.

### Adaptere

Motoren er entitetsuavhengig; hver støttet enhetstype kobles til via en adapter (`helpers/adapters/`):

| Enhetstype | Adapter | Merknader |
|-------------|---------|-----------|
| `event` | `EventReminderAdapter` | Mottakere begrenset til påmeldte eller gruppemedlemmer, avhengig av arrangementet og `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Mottakere er Godtatt + Ubekreftet-oppdrag på publiserte (ikke-utkast-) planer. Ubekreftede oppdrag utstedt gjennom en bekreftelsesarbeidsflyt for tjeneste utelates til de godtas (se nedenfor). `buildEmails` kaller `DoingModuleGateway.buildPlanReminderEmails`, som gjengir posisjoner, notater og en egendefinert melding via `doing/helpers/PlanReminderEmailHelper`, inkludert knapper for Godta/Avslå signert av `ReminderTokenHelper` som sendes til et offentlig endepunkt for svar på oppdrag. |
| `task` | `TaskReminderAdapter` | Mottakere er oppgavens tildelte(e). |

### Endepunkter

| Metode | Bane | Formål |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Last inn eller lagre påminnelsesdefinisjonen for én enhet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Last inn eller lagre en påminnelsesdefinisjon på scope-nivå (arvet). |
| `DELETE` | `/messaging/reminders/:defId` | Slett en definisjon og kanseller dens ventende forekomster. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Forhåndsvis antall mottakere og neste utløsningstidspunkt for en arrangementspåminnelse før lagring. |
| `GET` | `/messaging/reminders/log` | Nylig historikk over påminnelsesforekomster for en menighet. |
| `POST` | `/messaging/reminders/mute` | Demp påminnelser for en bestemt enhet. |

Å lagre en definisjon utløser en synkron ny utvidelse for enheten eller scopet, slik at redigerere ser oppdaterte «neste utløsninger» uten å vente på nattejobben.

## Direktemeldinger

Direktemeldinger går samme trakt som alt annet i stedet for en egen eskaleringsvei. Hver ulest samtale får én **skyggerad** i `notifications` (`contentType='privateMessage'`, `contentId` = den private meldingens ID, `category='direct_messages'`), som eier all leveringstilstand -- socket-/push-/e-post-eskalering, lesesporing, alt. Tabellen `privateMessages` beholder selve meldingsinnholdet og en kolonne `notifyPersonId`, som er kilden til merket for uleste og nullstilles når mottakeren leser samtalen.

Skyggerader er usynlige for varselklokken: de utelates fra spørringen for antall uleste, listespørringen for varsler og spørringene for å merke som lest eller slette, som alle filtrerer på `contentType <> 'privateMessage'`. Hver DM-ping går til socket uansett ulest-status (sanntidssemantikk for chat -- ingen deduplisering), og DM-er stopper aldri ved socket-levering slik vanlige varsler gjør, fordi en PWA i bakgrunnen kan holde en socket åpen samtidig som den fortsatt trenger et push på operativsystemnivå. Hvis en person demper DM-varsler, parkeres skyggeraden (`isNew=false`, `notifyPersonId` nullstilt) -- fortsatt synlig inne i selve samtalen, men uten merker eller varsler.

## Preferanser og styring

Hver utsending går gjennom `PreferenceGateHelper.evaluate()`, en ren funksjon (all tilstand sendes inn, ingen databasekall på den varme banen) som returnerer `allow`, `suppress` eller `defer`. Lagene kjøres i rekkefølge, og det første som avgjør vinner:

1. **Låst kategori** -- noen kategorier er obligatoriske (nivå 0) og omgår alle andre lag.
2. **Hovedpause / kanalavslag** -- `masterMute`, `allowPush`, `allowSms` (av som standard -- medlemmer velger selv) eller `emailFrequency='never'` undertrykker direkte.
3. **Stille tider** -- bare push og SMS (e-post regnes som ikke-påtrengende). Hvis klokkeslettet på personens tidssone faller innenfor det stille vinduet, slipper en transaksjonell kategori likevel gjennom; en ikke-transaksjonell utsettes til slutten av det stille vinduet, beregnet som et DST-korrekt UTC-tidspunkt via `TimezoneHelper.wallClockToUtc`.
4. **Overstyring per kategori** -- en eksplisitt avmelding for ett kategori × kanal-par; fravær betyr kategoriens standard.
5. **Demping per enhet** -- en demping registrert mot en bestemt enhet (f.eks. ett arrangement, én plan) begrenser mer enn innstillingen på kategorinivå, men gjelder bare når kalleren oppgir en enhets-ID og -type sammen med varselet.

Involverte tabeller: `notificationPreferences` (globalt -- `masterMute`, `emailFrequency` med `individual|daily|weekly|never`, `allowPush`, vindu for stille tider og tidssone, `allowSms`), `notificationPreferenceOverrides` (per kategori × kanal) og `notificationEntityMutes` (per enhet).

Denne styringen håndheves for in-app (nivå 0), push (nivå 1) og e-post (nivå 2) inne i trakten -- inkludert umiddelbare påminnelses- og sammendragse-poster -- og for påminnelsestekster i `ReminderEngine.sendSms()`. Transaksjonell e-post (innloggingskoder, passordtilbakestillinger, invitasjoner, gavekvitteringer) omgår den med vilje; det er hele poenget med den andre døren.

### Bekreftelsesarbeidsflyter for tjeneste

En plan kan velge en `workflowType = "assignmentConfirmation"`-arbeidsflyt (`plans.confirmationWorkflowId`). Publisering/varsling kaller da `POST /doing/plans/:id/issueRequests` i stedet for det vanlige varselet per oppdrag: hvert nytt ubekreftet oppdrag får `notified` + `confirmationWorkflowId` og ett arbeidsflytkort (`tasks.assignmentId`, unik `followupKey`). Kortet sender et varsel kun i appen (`appOnly: true` -- ingen eskalering til push/e-post), og kjører deretter arbeidsflytens `sendAssignmentRequest`-handlinger, som går gjennom `MessagingModuleGateway.sendServingWorkflowMessage`: e-post via `NotificationHelper.sendWorkflowEmail` (preferansegate + `ChurchEmailLimiter`, målt som `workflowEmail`), SMS via `sendPersonText` bare med `allowSms` og gaten for kategorien `serving_schedule`. Godta/Avslå (`assignment.updated` på hendelsesbussen) lukker kortet. 30-minutters-timeren (`AssignmentWorkflowHelper.processPending`) reparerer tapte starter og hendelser, og gjør en ubesvart forespørsel ved svarfristen om til en lederoppgave for gjennomgang. Full livssyklus: `Api/docs/assignment-confirmation-workflows.md`.

## E-postgrenser for menigheter

E-post hvis innhold en menighet har skrevet, sendes fra den delte ChurchApps SES-identiteten, og måles derfor per menighet av `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Fire veier kaller den: gruppe-/malutsendinger (`EmailTemplateController`, innholdstype `email`), oppfølgings-e-post fra skjemaer (`FormSubmissionController`, `formFollowUp`), handlingen **Send e-post** i arbeidsflyter (`NotificationHelper` med `churchAuthored`, `workflowEmail`), og e-post for forespørsler om bekreftelse av tjeneste (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systemepost (innloggingskoder, kvitteringer, påminnelser) og invitasjoner til roller og grupper (`UserController.sendInviteEmail`, en fast mal) måles ikke.

- **Godkjenningsgate.** En menighet sender ingenting før en serveradministrator setter `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Serveradministrasjon → Menigheter → brikken **Gruppe-e-post**). Arkiverte menigheter er alltid blokkert. Dialogen Send e-post i B1Admin leser `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`), og viser et kort **Be om gjennomgang** i stedet for editoren når den ikke er godkjent. Arbeidsflyttrinn-editoren leser det samme endepunktet (åpent for `tasks.admin` i tillegg til `groupMembers.edit`) for å advare ved handlinger **Send e-post** når menigheten ikke er godkjent eller er satt på pause. Ved utsending returnerer `MessagingModuleGateway.sendTemplatedEmail` `false` uten å lage et varsel når `ChurchEmailLimiter.remaining()` er under 1, slik at kortets historikk aldri hevder **E-post sendt** for post som ble droppet. `POST /messaging/emailTemplates/requestApproval` sender e-post til support, høyst én gang per menighet per uke.
- **Opptjent kvote.** En godkjent menighet får `max(150, 2 × sin beste dag med menighetsskrevet e-post i de siste 30 dagene)`, begrenset til 2 000 per rullerende 24 timer. Inneværende 24 timer utelates fra «beste dag» slik at et utbrudd ikke kan heve sin egen grense.
- **Reserver, deretter avregn.** `reserve()` skriver én `deliveryLogs`-rad per mottaker før utsending, sjekker kvoten på nytt med disse radene talt med, og trekker seg tilbake hvis to forespørsler passerte grensen samtidig (sendingen returnerer 429). `settle()` markerer hver rad som sendt eller mislykket.
- **Klagepause.** Lambdaen `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, matet av SES → SNS) knytter hver permanente returnert e-post eller klage til menigheten hvis menighetsskrevne e-post nådde den adressen rundt det tidspunktet, og lagrer den som `deliveryMethod` `sesBounce` / `sesComplaint`. En menighet settes på pause ved 2+ klager (≥ 0,3 % av sendingene) eller 10+ harde returer (≥ 5 %) i løpet av 7 dager.

## Planlegging

Både påminnelsesmotoren og varsel-sammendraget kjører på eksisterende planlagte timere i stedet for å introdusere ny infrastruktur:

| Timer | Plan | Kjører |
|-------|----------|------|
| 30-minutters-timer | hvert 30. minutt | Eskalerer uleste varsler; sender sammendragse-poster med `individual`-frekvens; sender forfalte påminnelsesforekomster (`ReminderEngine.scan`); godkjenningssammendrag; forfalte automatiseringskjøringer |
| 1-minutters-timer (`timerWebhooks`) | hvert minutt | Sender forfalte planlagte pushvarsler (`ScheduledNotificationHelper.dispatchDue`, jobb `scheduledNotifications`) |
| Nattetimer | 05:00 UTC | Gruppens oppmøtepåminnelser; avanserer gjentakende direktesendingstjenester; oppdaterer automatisk oppdaterte lister; utvider påminnelsesforekomster for neste horisont (`ReminderEngine.expandAll`); sender sammendragse-poster med `daily`-frekvens |

Lokalt kan den samme logikken utløses på forespørsel med `npm run timer:30min` og `npm run timer:midnight` fra `Api`-prosjektet.

## Filoversikt

| Område | Filer |
|------|-------|
| Trakt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Delt inngang | `Api/src/shared/helpers/NotificationService.ts` |
| Transaksjonell dør | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint-regel `Api/tools/eslint-rules/email-door.cjs` |
| E-postgrenser for menigheter | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Påminnelsesmotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Tekst / STOP-avmelding | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (tjenestegjøringsoversiktens **Tekst frivillige**) |
| Påminnelsesrepositorier | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Tjeneste-/plan-e-post | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Påminnelsesredigerere (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Påminnelsesredigerer / preferanser (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterte sider

- [Sanntidsarkitektur](../realtime.md) -- WebSocket-protokollen og klientprimitivene (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) som leveringsnivået i appen bygger på
- [Web-pushvarsler](../web-push.md) -- VAPID-oppsett og nettleserens Push API-vei som brukes av push-eskaleringsnivået
- [Meldings-endepunkter](../api/endpoints/messaging.md) -- full REST-flate for meldinger, samtaler, tilkoblinger og varsel-/påminnelsesruter
