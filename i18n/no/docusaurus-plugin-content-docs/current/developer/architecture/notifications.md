---
title: "Arkitektur for varsler og påminnelser"
---

# Arkitektur for varsler og påminnelser

<div class="article-intro">

Hver melding et kirkemedlem ser utenfor siden vedkommende er på – en merketeller, et pushvarsel, en sammendrags-e-post – går gjennom en av to dører i MessagingApi. Denne siden beskriver trakten, påminnelsesmotoren som mater det etter en tidsplan, og preferansemodellen som avgjør hva som faktisk når fram til en person.

</div>

## Oversikt – to dører

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alt som forteller en person noe** går gjennom `NotificationHelper.createNotifications()` i meldingsmodulen. Funksjonen lagrer en `notifications`-rad og eskalerer socket → push → e-post, og evaluerer `PreferenceGateHelper` per kanal – inkludert `in_app` på nivå 0.
2. **Alt som er planlagt** er en `reminderDefinition` (på enhetsnivå eller omfangsnivå) som utvides til `reminderOccurrences` og sendes av `ReminderEngine.scan()` på en tilbakevendende timer. Én utvider, én sender, én sendelogg (`reminderSentLog`).
3. **Direkte e-post** finnes bare bak `TransactionalEmailHelper.sendTransactional()`. En ESLint-regel håndhever dette ved kompilering – se nedenfor.

:::tip E-postdøren er lint-håndhevet, ikke bare en konvensjon
`Api/tools/eslint-rules/email-door.cjs` definerer `no-direct-email-helper`: ethvert kall til `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` utenfor `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` feiler i lint. Hvis du må sende en e-post, send den gjennom traktområdet (`createNotifications` med `emailImmediate`) eller gjennom `TransactionalEmailHelper.sendTransactional()` – det finnes ingen tredje vei som går gjennom CI.
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

For hver mottaker lagrer funksjonen en rad i `notifications` og kaller `attemptDeliveryWithEscalation`, som går gjennom kanalstigen nedenfor. En fortsatt ulest rad for samme `(contentType, contentId)` hindrer ny opprettelse – denne duplikatsperren hoppes over for `emailImmediate`-utsendelser (påminnelsesforskyvninger, «send e-post til alle» fra staben og arbeidsflyttrinn har sin egen duplikatkontroll) og for direktemeldinger, som alltid pinger socketen.

`shared/helpers/NotificationService.ts` speiler den samme signaturen (`NotificationServiceOptions`) for kallere utenfor meldingsmodulen og registreres hos meldingsmodulen ved oppstart.

## Eskaleringskjede for kanaler

Leveringen starter på et nivå (0 som standard, eller høyere for påminnelser og eksplisitte utsendelser) og går bare videre til neste kanal hvis den forrige ikke lyktes. Hvert nivå kontrolleres av `PreferenceGateHelper` før noe forsøkes.

| Nivå | Kanal | Oppførsel |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app`-porten sjekkes først. Hvis den undertrykkes (dempet), lagres raden med `isNew=false` og leveringen stopper helt – ingen socket-ping, ingen merke, ingen videre eskalering. Ellers slår serveren opp åpne socket-tilkoblinger for personens `alerts`-rom og sender en `notification`-ramme (eller `privateMessage`). For vanlige varsler stopper en vellykket socket-levering kjeden her – 30-minutterstimeren sjekker uleste elementer på nytt og eskalerer dem senere. Direktemeldinger stopper aldri ved socket: en installert PWA kan holde alerts-socketen åpen i bakgrunnen, noe som ellers ville undertrykt push-varselet på OS-nivå. |
| 1 | **push** | Styres av `allowPush` / reservasjon per kategori / stille timer. Sender til både Expo-pushtokener og Web Push-abonnementer som finnes på personens `devices`-rader, fjerner duplikater per endepunkt og rydder bort utdaterte tokener underveis. |
| 2 | **e-post** | Styres av `emailFrequency` og reservasjon per kategori. Umiddelbare utsendelser (`emailImmediate`) genereres med en gang og skriver en `deliveryLogs`-rad; ellers blir varselet liggende ventende for samlesendingen (sammendraget), beskrevet nedenfor. |
| — | **sms** | Preferanseoppsettet (`allowSms`, kanallister per kategori) tar allerede høyde for en SMS-kanal, men ingen produsent sender gjennom den i dag – den er reservert for produktet for masse-SMS, som kjører som en egen, avskilt flyt via `TextingController` / `@churchapps/texting`. Arbeidsflyttrinnets handling **Send Text** (`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`) går også utenom denne trakten: den sender tekstmelding direkte til kortets person gjennom kirkens leverandør, så varselpreferanser og stille timer gjelder ikke – bare personens `optedOut`-flagg respekteres. |

Uleste varsler som er blitt stående på socket eller push, eskaleres av 30-minutterstimeren (`NotificationHelper.escalateDelivery`). Samle-e-post sendes av `NotificationHelper.sendEmailNotifications(frequency)`, styrt av hver persons `emailFrequency`-preferanse: `individual` kjører på 30-minutterstimeren, `daily` kjører på nattetimeren. (`weekly` er en gyldig preferanseverdi, men har ingen egen samlekjøring ennå.)

## Påminnelsesmotor

Planlagte påminnelser – arrangementspåminnelser, frister for oppgaver, påminnelser om tjeneste- og planoppdrag – går alle gjennom én generalisert motor i stedet for skreddersydd cron-logikk per funksjon.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definisjoner** (`reminderDefinitions`) er enten på enhetsnivå (`entityId` satt – et bestemt arrangement, en oppgave eller en plan) eller på omfangsnivå (`entityId` er null, `scopeId` er satt – for eksempel hver plan under en tjenesteplantype). En definisjon har en CSV med minuttforskyvninger (`offsets`, f.eks. `"1440,60"` for én dag og én time før), et lokalt sendetidspunkt (`sendLocalTime`), en CSV med kanaler (`channels` – at `email` er med, utløser en umiddelbar rik e-post ved sendetidspunktet), en `recipientMode` og en valgfri egendefinert `message`.

**Utvidelse** materialiserer utløserrader for horisonten fremover (et rullerende vindu på flere dager). Den kjører på nattetimeren, og synkront hver gang en definisjon lagres, slik at en påminnelse for et arrangement i siste liten fortsatt utløses. Omfangsdefinisjoner fordeles via adapterens `loadScopeEntities` og gir ett forekomstsett per konkret enhet; forekomster på enhetsnivå bruker nøkkelen `definitionId:occurrenceISO:offset`, mens forekomster på omfangsnivå bruker enhetens id som navnerom slik at de aldri kolliderer. Å upserte en forekomst **gjenoppliver** en tidligere kansellert rad – kansellere og så utvide på nytt er standardmåten å resynkronisere en påminnelse på når den underliggende enheten endres; rader som allerede er `sent`, `failed` eller `processing`, røres ikke.

**Utsendelse** (`ReminderEngine.scan()`) kjører på 30-minutterstimeren. Den krever forfalte forekomster (en lease hindrer dobbeltbehandling), laster mottakere gjennom enhetens adapter, filtrerer bort alle som allerede er registrert i `reminderSentLog` for den forekomsten, og kaller `createNotifications` med `deliveryStartLevel: 1` (hopper rett til push) pluss `emailImmediate`/`emailByPerson` når definisjonens kanaler inkluderer e-post.

En intern hendelsesbuss reagerer på endringer i enheter uten å vente på nattlig utvidelse: innholdshendelser (via webhook-dispatcheren) og oppdateringshendelser for planer og oppgaver utløser umiddelbar ny utvidelse eller kansellering for den berørte enheten, og en planoppdatering utvider også på nytt alle omfangsdefinisjoner knyttet til planens type.

### Adaptere

Motoren er uavhengig av enhetstype; hver støttede enhetstype kobles inn via en adapter (`helpers/adapters/`):

| Enhetstype | Adapter | Merknader |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Mottakere avgrenses til påmeldte eller gruppemedlemmer avhengig av arrangementet og `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Mottakere er planoppdrag med status Akseptert + Ubekreftet. `buildEmails` kaller `DoingModuleGateway.buildPlanReminderEmails`, som genererer posisjoner, notater og en egendefinert melding via `doing/helpers/PlanReminderEmailHelper`, inkludert Godta/Avslå-knapper signert av `ReminderTokenHelper` som sender til et offentlig endepunkt for oppdragssvar. |
| `task` | `TaskReminderAdapter` | Mottakere er oppgavens ansvarlige. |

### Endepunkter

| Metode | Sti | Formål |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Last eller lagre påminnelsesdefinisjonen for én enhet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Last eller lagre en påminnelsesdefinisjon på omfangsnivå (arvet). |
| `DELETE` | `/messaging/reminders/:defId` | Slett en definisjon og kanseller de ventende forekomstene. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Forhåndsvis antall mottakere og neste utløsningstidspunkter for en arrangementspåminnelse før lagring. |
| `GET` | `/messaging/reminders/log` | Nylig historikk over påminnelsesforekomster for en kirke. |
| `POST` | `/messaging/reminders/mute` | Demp påminnelser for en bestemt enhet. |

Lagring av en definisjon utløser en synkron ny utvidelse for den enheten eller det omfanget, slik at redaktørene ser oppdaterte «neste utløsning» uten å vente på nattjobben.

## Direktemeldinger

Direktemeldinger bruker samme trakt som alt annet i stedet for en egen eskaleringsvei. Hver ulest samtale får én **skyggerad** i `notifications` (`contentType='privateMessage'`, `contentId` = id-en til den private meldingen, `category='direct_messages'`) som eier all leveringstilstand – eskalering via socket/push/e-post, lesesporing, alt. Selve `privateMessages`-tabellen beholder meldingsinnholdet og en `notifyPersonId`-kolonne, som er kilden til merket for uleste og tømmes når mottakeren leser samtalen.

Skyggeradene er usynlige for varselklokken: de utelates fra spørringen for antall uleste, spørringen for varsellisten og spørringene for merk som lest/slett, som alle filtrerer på `contentType <> 'privateMessage'`. Hver DM-ping treffer socketen uavhengig av lesestatus (semantikk som i live chat – ingen duplikatkontroll), og DM-er stopper aldri ved socket-levering slik vanlige varsler gjør, siden en PWA i bakgrunnen kan holde en socket åpen og likevel trenge et push-varsel på OS-nivå. Hvis en person demper DM-varsler, parkeres skyggeraden (`isNew=false`, `notifyPersonId` tømt) – fortsatt synlig inne i selve samtalen, bare uten merker eller varsler.

## Preferanser og porter

Hver utsendelse går gjennom `PreferenceGateHelper.evaluate()`, en ren funksjon (all tilstand sendes inn, ingen databasekall på den kritiske stien) som returnerer `allow`, `suppress` eller `defer`. Lagene kjøres i rekkefølge, og det første som avgjør, vinner:

1. **Låst kategori** – noen kategorier er obligatoriske (nivå 0) og går utenom alle andre lag.
2. **Hoveddemping / kanalstans** – `masterMute`, `allowPush`, `allowSms` eller `emailFrequency='never'` undertrykker direkte.
3. **Stille timer** – bare push og SMS (e-post regnes som lite påtrengende). Hvis klokkeslettet i personens tidssone faller i vedkommendes stille vindu, kommer en transaksjonell kategori likevel gjennom; en ikke-transaksjonell utsettes til slutten av det stille vinduet, beregnet som et sommertidskorrekt UTC-tidspunkt via `TimezoneHelper.wallClockToUtc`.
4. **Overstyring av preferanse per kategori** – en eksplisitt reservasjon for ett kategori × kanal-par; fravær betyr kategoriens standard.
5. **Demping per enhet** – en demping registrert mot en bestemt enhet (f.eks. ett arrangement, én plan) begrenser mer enn innstillingen på kategorinivå, men gjelder bare når kalleren oppgir en enhets-id/-type sammen med varselet.

Involverte tabeller: `notificationPreferences` (global – `masterMute`, `emailFrequency` med `individual|daily|weekly|never`, `allowPush`, stille vindu + tidssone, `allowSms`), `notificationPreferenceOverrides` (per kategori × kanal) og `notificationEntityMutes` (per enhet).

Denne porten håndheves for in-app (nivå 0), push (nivå 1) og e-post (nivå 2) inne i trakten – inkludert umiddelbare påminnelses- og sammendrags-e-poster. Transaksjonell e-post (autentiseringskoder, tilbakestilling av passord, invitasjoner, giverkvitteringer) går utenom den med vilje; det er hele poenget med den andre døren.

## Grenser for e-post skrevet av kirken

E-post der innholdet er skrevet av en kirke, sendes fra den delte ChurchApps SES-identiteten, så den måles per kirke av `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Fire stier kaller den: gruppe-/malutsendelser (`EmailTemplateController`, innholdstype `email`), oppfølgings-e-poster fra skjemaer (`FormSubmissionController`, `formFollowUp`), arbeidsflythandlingene **Send email** (`NotificationHelper` med `churchAuthored`, `workflowEmail`) og B1-kontoinvitasjoner (`UserController.sendInviteEmail`, `invite`). Systempost (autentiseringskoder, kvitteringer, påminnelser) måles ikke.

- **Godkjenningsport.** En kirke sender ingenting før en serveradministrator setter `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email**-brikken). Arkiverte kirker er alltid blokkert. B1Admins dialog for å sende e-post leser `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) og viser et **Request review**-kort i stedet for redigeringsvinduet når kirken ikke er godkjent. `POST /messaging/emailTemplates/requestApproval` sender e-post til support, høyst én gang per kirke per uke.
- **Opptjent kvote.** En godkjent kirke får `max(150, 2 × its best church-authored day in the prior 30 days)`, begrenset til 2 000 per rullerende 24 timer. De siste 24 timene er utelatt fra «beste dag», slik at et utbrudd ikke kan heve sin egen grense.
- **Reserver, deretter avregn.** `reserve()` skriver én `deliveryLogs`-rad per mottaker før sending, sjekker kvoten på nytt med disse radene medregnet, og trekker seg tilbake hvis to forespørsler har passert grensen samtidig (utsendelsen returnerer 429). `settle()` markerer hver rad som sendt eller mislykket.
- **Pause ved klager.** `sesFeedback`-Lambdaen (`Api/src/lambda/ses-feedback-handler.ts`, matet av SES → SNS) knytter hver permanente avvisning eller klage til kirken hvis kirkeskrevne e-post nådde den adressen omtrent på det tidspunktet, lagret som `deliveryMethod` `sesBounce` / `sesComplaint`. En kirke settes på pause ved 2+ klager (≥ 0,3 % av utsendelsene) eller 10+ harde avvisninger (≥ 5 %) over 7 dager.

## Planlegging

Både påminnelsesmotoren og varselsammendraget bruker eksisterende planlagte timere i stedet for å innføre ny infrastruktur:

| Timer | Tidsplan | Kjører |
|-------|----------|------|
| 30-minutterstimer | hvert 30. minutt | Eskalere uleste varsler; sende sammendrags-e-poster med `individual`-frekvens; sende forfalte påminnelsesforekomster (`ReminderEngine.scan`); godkjenningssammendrag; forfalte automatiseringskjøringer |
| Nattetimer | 05:00 UTC | Oppmøtepåminnelser for grupper; flytte frem gjentakende strømmetjenester; oppdatere automatisk oppdaterte lister; utvide påminnelsesforekomster for neste horisont (`ReminderEngine.expandAll`); sende sammendrags-e-poster med `daily`-frekvens |

Lokalt kan den samme logikken utløses ved behov med `npm run timer:30min` og `npm run timer:midnight` fra `Api`-prosjektet.

## Filoversikt

| Område | Filer |
|------|-------|
| Trakt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Delt inngang | `Api/src/shared/helpers/NotificationService.ts` |
| Transaksjonell dør | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint-regel `Api/tools/eslint-rules/email-door.cjs` |
| Grenser for kirke-e-post | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Påminnelsesmotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Påminnelsesrepositorier | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-post for tjeneste/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Påminnelseseditorer (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Påminnelseseditor / preferanser (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterte sider

- [Sanntidsarkitektur](../realtime) – WebSocket-protokollen og klientprimitivene (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) som leveringsnivået i appen bygger på
- [Web Push-varsler](../web-push) – VAPID-oppsett og nettleserens Push API-sti som brukes av push-eskaleringsnivået
- [Meldingsendepunkter](../api/endpoints/messaging) – hele REST-flaten for meldinger, samtaler, tilkoblinger og varsel-/påminnelsesruter
