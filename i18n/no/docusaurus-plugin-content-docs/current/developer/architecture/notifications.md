---
title: "Arkitektur for varsler og påminnelser"
description: "Hvordan B1 Admin-API-et ruter varsler, planlagte påminnelser, e-postgrenser for menigheter og reservasjon mot tekstmeldinger gjennom én leveringstrakt og én preferansesjekk."
---

# Arkitektur for varsler og påminnelser

<div class="article-intro">

Alt en medlem ser utenfor siden de ser på -- et merke med antall uleste, et push-varsel, en oppsummerings-e-post -- går gjennom en av to dører i MessagingApi. Denne siden dokumenterer trakten, påminnelsesmotoren som mater den etter en plan, og preferansemodellen som avgjør hva som faktisk når en person.

</div>

## Oversikt -- to dører {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alt som forteller en person noe** går gjennom `NotificationHelper.createNotifications()` i meldingsmodulen. Den lagrer en rad i `notifications` og eskalerer socket → push → e-post, og evaluerer `PreferenceGateHelper` for hver kanal -- inkludert `in_app` på nivå 0.
2. **Alt som er planlagt** er en `reminderDefinition` (på enhetsnivå eller omfangsnivå) som ekspanderes til `reminderOccurrences` og sendes av `ReminderEngine.scan()` på en gjentakende timer. Én ekspandering, én sender og én sendelogg (`reminderSentLog`). Unntaket er et push fra ansatte som planlegges på siden **Mobil > Push-varsler** i B1Admin, eller i dialogen **Varsle** for en gruppe. Det er en rad i `scheduledNotifications` (målgruppe `church` eller `group`), som sendes av `ScheduledNotificationHelper.dispatchDue()` på 1-minuttstimeren. En rad som er mer enn 30 minutter forbi `sendAt` ved første forsøk, markeres som mislykket med `missed send window` i stedet for å sendes for sent, og en mislykket sending forsøkes på nytt inntil 3 ganger. Mottakerne løses opp ved sendetid av `PushAudienceHelper`, den samme hjelperen som den umiddelbare gruppesendingen bruker, og leveres via `createNotifications()` som `churchPushNotification` (preferansekategori `announcements`) eller `groupPushNotification`.
3. **Direkte e-post** finnes bare bak `TransactionalEmailHelper.sendTransactional()`. En ESLint-regel håndhever dette ved kompilering -- se nedenfor.

:::tip E-postdøren håndheves av lint, ikke bare av konvensjon
`Api/tools/eslint-rules/email-door.cjs` definerer `no-direct-email-helper`: ethvert kall til `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` utenfor `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` feiler lint. Hvis du må sende en e-post, rut den gjennom trakten (`createNotifications` med `emailImmediate`) eller gjennom `TransactionalEmailHelper.sendTransactional()`. Det finnes ingen tredje måte som går gjennom CI.
:::

## Varseltrakten {#the-notification-funnel}

`NotificationHelper.createNotifications()` er eneste inngangspunkt for alt som ikke er planlagt eller transaksjonelt:

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

For hver mottaker lagrer den en rad i `notifications` og kaller `attemptDeliveryWithEscalation`, som går gjennom kjeden av kanaler nedenfor. En fortsatt ulest rad for samme `(contentType, contentId)` hindrer ny oppretting. Denne dedupliseringsvakten hoppes over for `emailImmediate`-sendinger (påminnelsesforskyvninger, «send e-post til alle» fra ansatte, arbeidsflyttrinn som håndterer sin egen deduplisering) og for direktemeldinger, som alltid sender ping via socket.

`shared/helpers/NotificationService.ts` speiler den samme signaturen (`NotificationServiceOptions`) for kallere utenfor meldingsmodulen, og er registrert i meldingsmodulen ved oppstart.

## Kjeden for eskalering av kanaler {#channel-escalation-chain}

Levering starter på et nivå (0 som standard, eller høyere for påminnelser og eksplisitte sendinger), og går bare videre til neste kanal hvis den forrige ikke lyktes. Hvert nivå styres av `PreferenceGateHelper` før noe forsøkes.

| Nivå | Kanal | Oppførsel |
|-------|---------|----------|
| 0 | **in_app / socket** | Preferansesjekken for `in_app` kjøres først. Hvis den undertrykkes (dempet), lagres raden med `isNew=false`, og leveringen stopper helt -- ingen socket-ping, ingen merke, ingen videre eskalering. Ellers slår serveren opp åpne socket-tilkoblinger til personens `alerts`-rom og sender en ramme `notification` (eller `privateMessage`). For vanlige varsler stopper kjeden her når socket-levering lykkes. Timeren på 30 minutter sjekker uleste elementer på nytt og eskalerer dem senere. Direktemeldinger stopper aldri ved socket: en installert PWA kan holde socket-tilkoblingen åpen i bakgrunnen, og det ville ellers undertrykt push på OS-nivå. |
| 1 | **push** | Styres av `allowPush`, kategoriavslag og stille timer. Sender til både Expo-push-tokens og Web Push-abonnementer som finnes på personens `devices`-rader. Duplikater fjernes på endepunkt, og utdaterte tokens ryddes underveis. |
| 2 | **e-post** | Styres av `emailFrequency` og kategoriavslag. Umiddelbare sendinger (`emailImmediate`) gjengis med en gang og skriver en rad i `deliveryLogs`. Ellers blir varselet liggende som ventende for oppsummeringen, som beskrives nedenfor. |
| -- | **sms** | Ikke et nivå i eskaleringskjeden. Den eneste styrte SMS-produsenten er påminnelsesmotoren: når en definisjons `channels` inkluderer `sms`, sender `ReminderEngine.sendSms()` en tekstmelding til hver mottaker **i tillegg til** push-/e-postvarselet (se [Tekstpåminnelser](#text-reminders)). Masseutsendelse av tekst (`TextingController` / `@churchapps/texting`), tjenestepanelets **Send tekst til frivillige** (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) og arbeidsflytens **Send tekst**-handling (`StepActionHelper.sendText` → `sendPersonText`) sender alle tekst direkte gjennom menighetens leverandør. Det betyr at varselpreferanser og stille timer ikke gjelder for dem. Bare flagget `optedOut` for personen respekteres. |

Uleste varsler som står igjen på socket eller push, eskaleres av 30-minuttstimeren (`NotificationHelper.escalateDelivery`). Samlet e-post sendes av `NotificationHelper.sendEmailNotifications(frequency)`, styrt av hver persons preferanse `emailFrequency`: `individual` kjører på 30-minuttstimeren, `daily` kjører på nattstimeren. (`weekly` er en gyldig preferanseverdi, men har ingen egen samlet kjøring ennå.)

## Påminnelsesmotoren {#reminder-engine}

Planlagte påminnelser -- arrangementspåminnelser, forfallsdatoer for oppgaver, påminnelser om tjenesteoppdrag og planer -- går alle gjennom én generalisert motor i stedet for egen cron-logikk for hver funksjon.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definisjoner** (`reminderDefinitions`) er enten på enhetsnivå (`entityId` satt -- et bestemt arrangement, en oppgave eller en plan) eller på omfangsnivå (`entityId` null, `scopeId` satt -- for eksempel alle planer under en plantype). En definisjon har en CSV-liste med minuttforskyvninger (`offsets`, f.eks. `"1440,60"` for ett døgn og én time før), et lokalt sendetidspunkt (`sendLocalTime`), en CSV-liste med kanaler (`channels` -- `email` utløser en umiddelbar e-post med rik formatering når det sendes), en `recipientMode` og en valgfri egendefinert `message`.

**Ekspandering** materialiserer utløsningsrader for det kommende horisontet (et glidende vindu på flere dager). Den kjører på nattstimeren, og synkront hver gang en definisjon lagres, slik at en påminnelse for et arrangement med kort varsel også utløses. Omfangsdefinisjoner fordeles via adapterens `loadScopeEntities`, og gir ett sett forekomster per konkret entitet. Forekomster på enhetsnivå bruker nøkkelen `definitionId:occurrenceISO:offset`, mens omfangsforekomster navneromsføres etter entitets-id, slik at de aldri kolliderer. Når en forekomst lagres på nytt, **gjenopprettes** en tidligere kansellert rad. Kanseller-og-ekspander-på-nytt er standardmåten å synkronisere en påminnelse på nytt etter at den underliggende entiteten har endret seg. Rader som allerede er `sent`, `failed` eller `processing`, lar man være urørt.

**Utsending** (`ReminderEngine.scan()`) kjører på 30-minuttstimeren. Den reserverer forfalte forekomster (et lease hindrer dobbeltbehandling), laster mottakere via entitetens adapter, filtrerer ut alle som allerede står i `reminderSentLog` for den forekomsten, og kaller `createNotifications` med `deliveryStartLevel: 1` (hopper rett til push) pluss `emailImmediate`/`emailByPerson` når definisjonens kanaler inkluderer e-post.

### Tekstpåminnelser {#text-reminders}

Når en definisjons `channels` inkluderer `sms`, kaller `scan()` `ReminderEngine.sendSms()` etter at push-/e-postvarslene er opprettet, for de samme nye mottakerne. Tekstmelding er opt-in for hvert medlem:

- Hver mottaker går gjennom `PreferenceGateHelper.evaluate(..., "sms", ...)`, så `allowSms` må være på (standard er av, og settes fra bryteren **Tekstmeldinger** i B1App), og kategoriens `sms`-kanal må ikke være overstyrt til av. `event_reminders`, `serving_schedule` og `tasks` oppfører seg slik at `sms` står både i `defaultChannels` og `allowedChannels`.
- Personer uten `mobilePhone`, eller med `optedOut` satt, undertrykkes. Hvis menigheten ikke har noen leverandør for tekst, undertrykkes resten av gruppen med årsaken `no_provider`.
- Teksten bygges av `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, trimmet til ett segment på 160 tegn.
- Hver mottaker får en egen rad i `reminderSentLog` med `channel: "sms"` og status `sent` / `suppressed` / `failed`. Den føres separat fra push-/e-postraden, slik at en mislykket tekst aldri sender push eller e-post på nytt.

Redigeringsverktøyene tilbyr bare **Tekst** når `GET /messaging/texting/status` returnerer `{ enabled: true }` (menighetens første leverandør for tekst er aktivert).

**STOP-avmelding.** `POST /messaging/texting/inbound/:churchId/:token` er et anonymt webhook som menigheten limer inn hos leverandøren sin (B1Admin viser URL-en fra `GET /messaging/texting/inboundUrl` i innstillingene for tekst). Tokenet er en HMAC av menighets-id-en (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` godtar Twilio-stil skjemafelt og Clearstream/TextInChurch-stil JSON. Hvis svaret er nøyaktig et operatørstoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), får hver ikke-fjernet person i menigheten hvis mobilnummer stemmer, satt `people.optedOut = true` og `allowSms = false`. Andre svar bekreftes og ignoreres.

En intern hendelsesbuss reagerer på endringer i entiteter uten å vente på den nattlige ekspanderingen: innholdshendelser (via webhook-dispatcheren) og oppdateringshendelser for planer og oppgaver utløser umiddelbar ny ekspandering eller kansellering for den berørte entiteten. En planoppdatering ekspanderer også på nytt alle omfangsdefinisjoner som er knyttet til plantypen.

### Adaptere {#adapters}

Motoren er uavhengig av entitetstype. Hver støttet entitetstype kobles til via en adapter (`helpers/adapters/`):

| Entitetstype | Adapter | Merknader |
|-------------|---------|-----------|
| `event` | `EventReminderAdapter` | Mottakere avgrenses til påmeldte eller gruppemedlemmer, avhengig av arrangementet og `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Mottakere er Akseptert + Ubekreftet-oppdrag på publiserte (ikke-utkast) planer. Ubekreftede oppdrag utstedt gjennom en arbeidsflyt for bekreftelse av tjeneste utelates til de er akseptert (se nedenfor). `buildEmails` kaller `DoingModuleGateway.buildPlanReminderEmails`, som gjengir posisjoner, notater og en egendefinert melding via `doing/helpers/PlanReminderEmailHelper`, inkludert knapper for Aksepter/Avslå signert av `ReminderTokenHelper`, som sendes til et offentlig endepunkt for svar på oppdrag. |
| `task` | `TaskReminderAdapter` | Mottakerne er oppgavens tildelte(e). |

### Endepunkter {#endpoints}

| Metode | Sti | Formål |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Laste eller lagre påminnelsesdefinisjonen for én entitet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Laste eller lagre en påminnelsesdefinisjon på omfangsnivå (arvet). |
| `DELETE` | `/messaging/reminders/:defId` | Slette en definisjon og kansellere dens ventende forekomster. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Forhåndsvise antall mottakere og neste utløsningstidspunkter for en arrangementspåminnelse før lagring. |
| `GET` | `/messaging/reminders/log` | Nylig historikk over påminnelsesforekomster for en menighet. |
| `POST` | `/messaging/reminders/mute` | Dempe påminnelser for en bestemt entitet. |

Lagring av en definisjon utløser en synkron ny ekspandering for entiteten eller omfanget, slik at redigerere ser oppdaterte «neste utløsning» uten å vente på nattjobben.

## Direktemeldinger {#direct-messages}

Direktemeldinger går gjennom samme trakt som alt annet, i stedet for en egen eskaleringsvei. Hver ulest samtale får én **skyggerad** i `notifications` (`contentType='privateMessage'`, `contentId` = id-en til den private meldingen, `category='direct_messages'`) som eier all leveringstilstand -- eskalering via socket/push/e-post, lesesporing, alt. Tabellen `privateMessages` beholder selve meldingsinnholdet og en kolonne `notifyPersonId`. Den er kilden til merket for uleste, og den nullstilles når mottakeren leser samtalen.

Skyggerader er usynlige for varselklokken. De utelates fra antallet uleste, fra varsellisten og fra spørringene for å markere som lest eller slette, som alle filtrerer på `contentType <> 'privateMessage'`. Hver DM-ping går til socket uavhengig av lesestatus (live-chat-semantikk -- ingen deduplisering), og DM stopper aldri ved socket-levering slik vanlige varsler gjør, fordi en PWA i bakgrunnen kan holde en socket åpen og likevel trenge et push på OS-nivå. Hvis en person demper DM-varsler, parkeres skyggeraden (`isNew=false`, `notifyPersonId` nullstilles). Den er fortsatt synlig inne i selve samtalen, men uten merker eller varsler.

## Preferanser og styring {#preferences--gating}

Hver sending går gjennom `PreferenceGateHelper.evaluate()`, en ren funksjon (all tilstand sendes inn, ingen databasekall på den kritiske banen) som returnerer `allow`, `suppress` eller `defer`. Lagene kjøres i rekkefølge, og det første som avgjør, vinner:

1. **Låst kategori** -- noen kategorier er obligatoriske (nivå 0) og omgår alle andre lag.
2. **Hovedavslag / kanalavslag** -- `masterMute`, `allowPush`, `allowSms` (av som standard -- medlemmer velger selv) eller `emailFrequency='never'` undertrykker direkte.
3. **Stille timer** -- bare push og SMS (e-post regnes som lite påtrengende). Hvis klokkeslettet i personens tidssone faller i det stille vinduet, slipper en transaksjonell kategori likevel gjennom. En ikke-transaksjonell kategori utsettes til slutten av det stille vinduet, beregnet som et DST-korrekt UTC-tidspunkt via `TimezoneHelper.wallClockToUtc`.
4. **Overstyring per kategori** -- et eksplisitt avslag for ett par kategori × kanal. Mangel på oppføring betyr kategoriens standard.
5. **Demping per entitet** -- en demping registrert mot en bestemt entitet (f.eks. ett arrangement, én plan) begrenser mer enn innstillingen på kategorinivå, men gjelder bare når avsenderen oppgir en entitets-id og -type sammen med varselet.

Tabeller som er involvert: `notificationPreferences` (globalt -- `masterMute`, `emailFrequency` med `individual|daily|weekly|never`, `allowPush`, vindu for stille timer og tidssone, `allowSms`), `notificationPreferenceOverrides` (per kategori × kanal) og `notificationEntityMutes` (per entitet).

Dette lagt håndheves for innen-appen (nivå 0), push (nivå 1) og e-post (nivå 2) inne i trakten -- også for umiddelbare påminnelses- og oppsummeringse-poster -- og for tekstpåminnelser i `ReminderEngine.sendSms()`. Transaksjonell e-post (innloggingskoder, passordtilbakestilling, invitasjoner, gavekvitteringer) omgår det med vilje. Det er hele poenget med den andre døren.

### Arbeidsflyter for bekreftelse av tjeneste {#serving-confirmation-workflows}

En plan kan velge en arbeidsflyt av typen `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publiser/varsle kaller da `POST /doing/plans/:id/issueRequests` i stedet for varselet per oppdrag. Hvert nytt Ubekreftet-oppdrag får `notified` + `confirmationWorkflowId` og ett arbeidsflytkort (`tasks.assignmentId`, unik `followupKey`). Kortet sender et varsel som bare vises i appen (`appOnly: true`, ingen eskalering til push eller e-post), og kjører deretter arbeidsflytens `sendAssignmentRequest`-handlinger, som går gjennom `MessagingModuleGateway.sendServingWorkflowMessage`: e-post via `NotificationHelper.sendWorkflowEmail` (preferansesjekk + `ChurchEmailLimiter`, målt som `workflowEmail`), SMS via `sendPersonText` bare med `allowSms` og kategoriporten `serving_schedule`. Aksepter/Avslå (`assignment.updated` på hendelsesbussen) lukker kortet. 30-minuttstimeren (`AssignmentWorkflowHelper.processPending`) reparerer tapte starter og hendelser, og gjør en ubesvart forespørsel ved oppfølgingsfristen om til en oppgave for lederens gjennomgang. Full livssyklus: `Api/docs/assignment-confirmation-workflows.md`.

## E-postgrenser for menighetsskrevet e-post {#church-authored-email-limits}

E-post der innholdet er skrevet av en menighet, sendes fra den delte ChurchApps SES-identiteten, og måles derfor per menighet av `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Fire veier kaller den: gruppe-/malutsendelser (`EmailTemplateController`, innholdstype `email`), oppfølgings-e-post fra skjemaer (`FormSubmissionController`, `formFollowUp`), arbeidsflytens **Send e-post**-handlinger (`NotificationHelper` med `churchAuthored`, `workflowEmail`), og e-post med forespørsel om bekreftelse av tjeneste (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systemmail (innloggingskoder, kvitteringer, påminnelser) og invitasjoner til roller og grupper (`UserController.sendInviteEmail`, en fast mal) måles ikke.

- **Godkjenningsport.** En menighet sender ingenting før en serveradministrator setter `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Serveradministrasjon → Menigheter → brikken **Gruppe-e-post**). Arkiverte menigheter blokkeres alltid. Dialogen Send e-post i B1Admin leser `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`). Når menigheten ikke er godkjent, viser den et kort **Be om gjennomgang** i stedet for redigeringsverktøyet. Redigeringsverktøyet for arbeidsflyttrinn leser det samme endepunktet (åpent både for `tasks.admin` og `groupMembers.edit`), og varsler ved handlinger **Send e-post** når menigheten ikke er godkjent eller er satt på pause. Ved sending returnerer `MessagingModuleGateway.sendTemplatedEmail` `false` uten å opprette et varsel når `ChurchEmailLimiter.remaining()` er under 1. Dermed påstår kortets historikk aldri **E-post sendt** for e-post som ble droppet. `POST /messaging/emailTemplates/requestApproval` sender en e-post til støtte, høyst én gang per menighet per uke.
- **Opptjent kvote.** En godkjent menighet får `max(150, 2 × its best church-authored day in the prior 30 days)`, begrenset til 2 000 per glidende 24 timer. Inneværende 24 timer utelates fra «beste dag», slik at et utbrudd ikke kan heve sin egen grense.
- **Reserver, og gjør opp etterpå.** `reserve()` skriver én `deliveryLogs`-rad per mottaker før sending, sjekker kvoten på nytt med disse radene telt med, og trekker seg tilbake hvis to forespørsler passerte grensen samtidig (sendingen returnerer 429). `settle()` merker hver rad som sendt eller mislykket.
- **Pause ved klager.** Lambdaen `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, matet av SES → SNS) knytter hver permanent bounce eller klage til menigheten hvis menighetsskrevne e-post nådde den adressen omtrent samtidig, og lagrer det som `deliveryMethod` `sesBounce` / `sesComplaint`. En menighet settes på pause ved 2 eller flere klager (≥ 0,3 % av sendingene) eller 10 eller flere harde bounces (≥ 5 %) i løpet av 7 dager.

## Planlegging {#scheduling}

Både påminnelsesmotoren og varselsoppsummeringen kjører på eksisterende planlagte timere i stedet for å innføre ny infrastruktur:

| Timer | Plan | Kjører |
|-------|----------|------|
| 30-minuttstimer | hvert 30. minutt | Eskalere uleste varsler; sende oppsummeringse-poster med `individual`-frekvens; sende forfalte påminnelsesforekomster (`ReminderEngine.scan`); godkjenningsoppsummeringer; forfalte automatiseringskjøringer |
| 1-minuttstimer (`timerWebhooks`) | hvert minutt | Sende forfalte planlagte push-varsler (`ScheduledNotificationHelper.dispatchDue`, jobb `scheduledNotifications`) |
| Nattstimer | 05:00 UTC | Påminnelser om gruppeoppmøte; avansere gjentakende direktesendte gudstjenester; oppdatere lister med automatisk oppdatering; ekspandere påminnelsesforekomster for neste horisont (`ReminderEngine.expandAll`); sende oppsummeringse-poster med `daily`-frekvens |

Lokalt kan den samme logikken utløses på forespørsel med `npm run timer:30min` og `npm run timer:midnight` fra `Api`-prosjektet.

## Filoversikt {#file-inventory}

| Område | Filer |
|------|-------|
| Trakt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Felles inngang | `Api/src/shared/helpers/NotificationService.ts` |
| Transaksjonell dør | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint-regelen `Api/tools/eslint-rules/email-door.cjs` |
| E-postgrenser for menigheter | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Påminnelsesmotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Tekst / STOP-avmelding | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (tjenestepanelets **Send tekst til frivillige**) |
| Repositories for påminnelser | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Tjeneste-/planepost | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Redigeringsverktøy for påminnelser (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Redigeringsverktøy / preferanser for påminnelser (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterte sider {#related-pages}

- [Sanntidsarkitektur](../realtime.md) -- WebSocket-protokollen og klientprimitivene (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) som leveringsnivået i appen bygger på
- [Web Push-varsler](../web-push.md) -- VAPID-oppsett og banen for nettleserens Push API som brukes av push-eskaleringsnivået
- [Endepunkter for meldinger](../api/endpoints/messaging.md) -- komplett REST-flate for meldinger, samtaler, forbindelser, og varsel- og påminnelsesrutene
