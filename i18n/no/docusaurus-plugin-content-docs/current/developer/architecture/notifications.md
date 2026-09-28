---
title: "Varslings- & påminnelsesarkitektur"
---

# Varslings- & påminnelsesarkitektur

<div class="article-intro">

Hver melding en kirkemedlem ser utenfor siden de ser på — et merketall, en push-melding, en e-postsammendrag — går gjennom en av to dører i MessagingApi. Denne siden dokumenterer trakten, påminnelsesmotoren som mater den etter en tidsplan, og preferansemodellen som bestemmer hva som faktisk når en person.

</div>

## Oversikt — to dører

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alt som forteller en person noe** går gjennom `NotificationHelper.createNotifications()` i meldingsmodulen. Den opprettholder en `notifications` rad og eskalerer socket → push → email, evaluerer `PreferenceGateHelper` per kanal — inkludert `in_app` på nivå 0.
2. **Alt som er planlagt** er en `reminderDefinition` (enhet-nivå eller omfang-nivå) utvidet til `reminderOccurrences` og sendt av `ReminderEngine.scan()` på en tilbakevendende tidtaker. En ekspander, en dispatcher, en send hovedbok (`reminderSentLog`).
3. **Direkte e-post** eksisterer bare bak `TransactionalEmailHelper.sendTransactional()`. En ESLint-regel håndhever dette ved kompilering — se nedenfor.

:::tip E-post-døren er lint-håndhevet, ikke bare konvensjon
`Api/tools/eslint-rules/email-door.cjs` definerer `no-direct-email-helper`: enhver kall til `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` utenfor `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` feiler lint. Hvis du trenger å sende en e-post, rute den gjennom trakten (`createNotifications` med `emailImmediate`) eller gjennom `TransactionalEmailHelper.sendTransactional()` — det er ingen tredje måte som passerer CI.
:::

## Varsltrakten

`NotificationHelper.createNotifications()` er den eneste inngangspunktet for alt som ikke er planlagt eller transaksjonelt:

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

For hver mottaker lagrer den en rad i `notifications` og kaller `attemptDeliveryWithEscalation`, som går opp kanalstigningen nedenfor. En fortsatt ulest rad for samme `(contentType, contentId)` undertrykker gjenopprettelse — denne dedupbeskyttelsen hoppes over for `emailImmediate` sendinger (påminnelsesforskyvninger, personallmedarbeidere "e-post alle", arbeidsflyttrinn eier sin egen dedup) og for direktemeldinger, som alltid pinger socketen.

`shared/helpers/NotificationService.ts` speiler samme signatur (`NotificationServiceOptions`) for anropere utenfor meldingsmodulen og er registrert med meldingsmodulen ved oppstart.

## Kanal-eskaleringskjede

Levering starter på et nivå (0 som standard, eller høyere for påminnelser/eksplisitte sendinger) og fortsetter bare til neste kanal hvis den forrige ikke lyktes. Hvert nivå blir sendt gjennom `PreferenceGateHelper` før noe forsøkes.

| Nivå | Kanal | Atferd |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app`-porten blir sjekket først. Hvis undertrykt (dempet), lagres raden med `isNew=false` og levering stopper helt — ingen socketping, ingen merke, ingen videre eskalering. Ellers ser serveren opp åpne socketforbindelser for personens `alerts` rom og presser en `notification` (eller `privateMessage`) ramme. For ordinære meldinger stopper en vellykket socketlevering kjeden her — 30-minutters-timeren re-sjekker uleste elementer og eskalerer dem senere. Direktemeldinger stopper aldri ved socket: en installert PWA kan holde alerts-socketen åpen i bakgrunnen, som ellers ville undertrykke OS-nivå-pushen. |
| 1 | **push** | Sendt på `allowPush` / kategori opt-out / stille timer. Sender til både Expo push-tokens og Web Push-abonnementer funnet på personens `devices` rader, deduplicerer etter endepunkt og rydder opp stale tokens underveis. |
| 2 | **email** | Sendt på `emailFrequency` og kategori opt-out. Umiddelbare sendinger (`emailImmediate`) gjengivelser rett og skriver en `deliveryLogs` rad; ellers er meldingen igjen ventende for batchdigesteret, beskrevet nedenfor. |
| — | **sms** | Preferanserørleggeriet (`allowSms`, per-kategori kanallister) regner allerede med en SMS-kanal, men ingen produsent sender gjennom den i dag — den forblir reservert for bulk SMS-produktet, som kjører som en separat, isolert flyt via `TextingController` / `@churchapps/texting`. |

Uleste meldinger igjen på socket eller push blir eskalert av 30-minutters-timeren (`NotificationHelper.escalateDelivery`). Batch-e-post blir sendt av `NotificationHelper.sendEmailNotifications(frequency)`, drevet av hver persons `emailFrequency` preferanse: `individual` kjører på 30-minutters-timeren, `daily` kjører på nattens tidtaker. (`weekly` er en gyldig preferanseverdi men har ingen dedikert batchkjøring ennå.)

## Påminnelsesmotor

Planlagte påminnelser — arrangementspåminnelser, oppgaveforfallsdatoer, betjening/planstillpåminnelser — går alle gjennom en generalisert motor i stedet for spesiell per-funksjon cron-logikk.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definisjoner** (`reminderDefinitions`) er enten enhet-nivå (`entityId` satt — et spesifikt arrangement, oppgave eller plan) eller omfang-nivå (`entityId` null, `scopeId` satt — f.eks. alle planer under en tjeneste plan type). En definisjon bærer en CSV av minutt-forskyvninger (`offsets`, f.eks. `"1440,60"` for en dag og en time før), et lokalt sendtidspunkt (`sendLocalTime`), en CSV av kanaler (`channels` — inkludert `email` utløser en umiddelbar rik e-post på sendtidspunktet), en `recipientMode`, og en valgfri egendefinert `message`.

**Utvidelse** materialiserer brennende rader for horisonten forut (et rullende flerdagers vindu). Det kjører på nattens tidtaker, og synkront når en definisjon blir lagret slik en påminnelse for et siste øyeblikks-arrangement fortsatt brenner. Omfangsdefinisjonerble ut via adaptørens `loadScopeEntities`, som produserer ett oppsett per konkret enhet; enhet-nivå-forekomster bruker nøkkelen `definitionId:occurrenceISO:offset`, mens omfangsforekomster navnerom etter enhets-id slik de aldri kolliderer. Oppsetting av en forekomst **oppstandelse** av en tidligere kansellert rad — avbryt-deretter-re-utvide er standardmåten å re-synk en påminnelse etter at den underliggende enheten endres; rader allerede `sent`, `failed` eller `processing` blir igjen uanfektet.

**Dispatch** (`ReminderEngine.scan()`) kjører på 30-minutters-timeren. Den hevder forfalte forekomster (en leieavtale forhindrer dobbeltbehandling), laster mottakere gjennom enhetens adapter, filtrerer ut alle som allerede er registrert i `reminderSentLog` for denne forekomsten, og kaller `createNotifications` med `deliveryStartLevel: 1` (hopp rett til push) pluss `emailImmediate`/`emailByPerson` når definisjonens kanaler inkluderer e-post.

En intern arrangementsbuss reagerer på enhetsendringer uten å vente på nattens utvidelse: innholdsarrangementer (via webhook-dispatcheren) og plan/oppgave oppdateringsarrangementer utløser umiddelbar re-utvidelse eller avbrudd for den berørte enheten, og en planoppdatering re-utvider også alle omfangsdefinisjonerknyttet til dens plantype.

### Adaptere

Motoren er enhet-agnostisk; hver støttet enhettype plugger inn gjennom en adapter (`helpers/adapters/`):

| Enhettype | Adapter | Notater |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Mottakere begrenset til deltakere eller gruppemedlemmer avhengig av arrangementet og `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Mottakere er Akseptert + Ubekreftet planstillinger. `buildEmails` kaller inn i `DoingModuleGateway.buildPlanReminderEmails`, som gjengivelser stillinger, notater og en egendefinert melding via `doing/helpers/PlanReminderEmailHelper`, inkludert Aksepter/Avslå knapper signert av `ReminderTokenHelper` som poster til et offentlig stillingssvar-endepunkt. |
| `task` | `TaskReminderAdapter` | Mottakere er oppgavens tilordning(er). |

### Endepunkter

| Metode | Bane | Formål |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Last eller lagre påminnelsesdefinisjonen for en enhet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Last eller lagre en omfang-nivå (nedarvet) påminnelsesdefinisjon. |
| `DELETE` | `/messaging/reminders/:defId` | Slett en definisjon og avbryt dens ventende forekomster. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Forhåndsvis mottakerantall og neste brenntider for en arrangementspåminnelse før lagring. |
| `GET` | `/messaging/reminders/log` | Nylig påminnelsesforekomst historie for en kirke. |
| `POST` | `/messaging/reminders/mute` | Demp påminnelser for en spesifikk enhet. |

Lagring av en definisjon utløser en synkron re-utvidelse for den enheten eller omfanget, så redaktørutgivelser ser oppdatert "neste brenner" uten å vente på nattejobben.

## Direktemeldinger

Direktemeldinger kjører samme trakt som alt annet i stedet for en separat eskalerings-vei. Hver ulest samtale får en **skyggeradl** i `notifications` (`contentType='privateMessage'`, `contentId` = den private meldings-id, `category='direct_messages'`) som eier all leveringstilstand — socket/push/email-eskalering, lest sporing, alt. Tabellen `privateMessages` selv holder meldingsnylasten og en `notifyPersonId` kolonne, som er kilden til det uleste merket og blir klart når mottakeren leser samtalen.

Skyggerader er usynlige for varslets klokke: de er ekskludert fra det uleste antallet spørsmål, varsellisten spørsmål og merket-les/slett-spørsmål, som alle filter `contentType <> 'privateMessage'`. Hver DM-ping treffer socketen uavhengig av ulest tilstand (live chat semantikk — ingen dedup), og DM-er stopper aldri på socketlevering slik ordinære meldinger gjør, siden en bakgrunnlagt PWA kan holde en socket åpen mens den fortsatt trenger en OS-nivå-push. Hvis en person demper DM-meldinger, blir skyggeraden parkert (`isNew=false`, `notifyPersonId` klart) — fortsatt synlig inne i samtalen selv, bare uten merker eller advarsler.

## Preferanser & sending

Hver sending går gjennom `PreferenceGateHelper.evaluate()`, en ren funksjon (all tilstand sendt inn, ingen DB-anrop på varm vei) som returnerer `allow`, `suppress` eller `defer`. Lagene kjører i rekkefølge, og den første som bestemmer vinner:

1. **Låst kategori** — noen kategorier er obligatoriske (nivå 0) og omgår hver annen lag.
2. **Mester-demp / kanal-slåing av** — `masterMute`, `allowPush`, `allowSms` eller `emailFrequency='never'` undertrykker direkte.
3. **Stille timer** — push og SMS bare (e-post anses som ikke-påtrengende). Hvis gjeldende veggklokk-tid i personens tidssone faller inn i deres stille vindu, får en transaksjonskategori fortsatt gjennom; en ikke-transaksjonell blir utsatt til slutten av det stille vinduet, beregnet som en DST-korrekt UTC øyeblikk via `TimezoneHelper.wallClockToUtc`.
4. **Per-kategori preferanse overstyring** — en eksplisitt opt-ut for en kategori × kanal pair; fravær betyr kategoriens standard.
5. **Per-enhet-demp** — en demp registrert mot en spesifikk enhet (f.eks. ett arrangement, en plan) begrenser videre enn kategori-nivå-innstillingen, men gjelder bare når anroperen leverer en enhets-id/type sammen med meldingen.

Tabeller involvert: `notificationPreferences` (global — `masterMute`, `emailFrequency` av `individual|daily|weekly|never`, `allowPush`, stille-timer-vindu + tidssone, `allowSms`), `notificationPreferenceOverrides` (per kategori × kanal), og `notificationEntityMutes` (per enhet).

Denne porten blir håndhevet for in_app (nivå 0), push (nivå 1) og e-post (nivå 2) inne i trakten — inkludert umiddelbar påminnelse/digest e-poster. Transaksjon e-post (auth-koder, passord-gjenoppsettinger, invitasjoner, donasjonskvitteringer) omgår den ved design; det er hele poenget med den andre døren.

## Kirke-forfattet e-postgrenser

E-post hvis innhold en kirke skrev går ut fra den delte ChurchApps SES-identiteten, så den er målt per kirke av `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Fire stier kaller den: gruppe/malsendingarner (`EmailTemplateController`, innholdstype `email`), form oppfølgings-e-poster (`FormSubmissionController`, `formFollowUp`), arbeidsflyt **Send e-post** handlinger (`NotificationHelper` med `churchAuthored`, `workflowEmail`), og B1 kontoinvitasjoner (`UserController.sendInviteEmail`, `invite`). Systempost (auth-koder, kvitteringer, påminnelser) er ikke målt.

- **Godkjenning gate.** En kirke sender ingenting før en serveradministrator setter `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** chip). Arkiverte kirker er alltid blokkert. B1Admin's Send Email dialog leser `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) og, når den ikke er godkjent, viser en **Request review** kort i stedet for redaktøren. `POST /messaging/emailTemplates/requestApproval` e-poster support, maksimalt en gang per kirke per uke.
- **Opptjent godtgjørelse.** En godkjent kirke får `max(150, 2 × its best church-authored day in the prior 30 days)`, begrenset til 2.000 per rullet 24 timer. De nåværende 24 timer er ekskludert fra "beste dag" slik en brudd ikke kan øke sin egen grense.
- **Reserve, deretter oppgjør.** `reserve()` skriver en `deliveryLogs` rad per mottaker før sending, re-sjekker godtgjørelsen med disse radene talt, og backed ut hvis to forespørsler raste forbi grensen (sendingen returnerer 429). `settle()` merker hver rad sendt eller mislykket.
- **Klage pause.** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, fed av SES → SNS) pins hver permanent bounce eller klage til kirken hvis kirke-forfattede e-post nådde den adressen rundt det tidspunktet, lagret som `deliveryMethod` `sesBounce` / `sesComplaint`. En kirke blir pausert på 2+ klager (≥ 0,3 % av sendinger) eller 10+ hard bounces (≥ 5 %) over 7 dager.

## Planlegging

Både påminnelsesmotoren og varslingens digest kjører eksisterende planlagte tidtakere i stedet for å introdusere ny infrastruktur:

| Tidtaker | Tidsplan | Kjøringer |
|-------|----------|------|
| 30-minutters tidtaker | hver 30 minutter | Eskalere uleste meldinger; sende `individual`-frekvens digest e-poster; dispatch forfalte påminnelsesforekomster (`ReminderEngine.scan`); godkjennelsessammendrag; forfalte automatisering henrettelser |
| Nattens tidtaker | 05:00 UTC | Gruppeoppmøte påminnelser; fremskynde gjentakende strømmings tjenester; oppfriske auto-oppfriskningsmeldinger; utvide påminnelsesforekomster for den neste horisonten (`ReminderEngine.expandAll`); sende `daily`-frekvens digest e-poster |

Lokalt kan den samme logikken utløses på forespørsel med `npm run timer:30min` og `npm run timer:midnight` fra `Api` prosjektet.

## Filbeholdning

| Område | Filer |
|------|-------|
| Trakt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Delt oppføring | `Api/src/shared/helpers/NotificationService.ts` |
| Transaksjon dør | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint regel `Api/tools/eslint-rules/email-door.cjs` |
| Kirke e-postgrenser | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Påminnelsesmotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Påminnelse lagringer | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Betjening/plan e-post | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Påminnelse redaktører (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Påminnelse redaktør / preferanser (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterte sider

- [Sanntids arkitektur](../realtime) — WebSocket-protokollen og klient-primitiver (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) som in_app-leveringsnivået kjører på
- [Web Push-meldinger](../web-push) — VAPID-oppsett og nettleser Push API-vei som brukes av push-eskalerings nivået
- [Messaging Endepunkter](../api/endpoints/messaging) — full REST overflate for meldinger, samtaler, forbindelser og varsling/påminnelse-ruter
