---
title: "Arkitektur for varsler og påminnelser"
---

# Arkitektur for varsler og påminnelser

<div class="article-intro">

Hver melding et kirkemedlem ser utenfor siden de ser på — et antall på et merke, en push-varsling, en sammendrags-e-post — går gjennom en av to dører i MessagingApi. Denne siden dokumenterer trakten, påminnelsesmotoren som mater den etter en tidsplan, og preferansemodellen som avgjør hva som faktisk når frem til en person.

</div>

## Oversikt — to dører

```
planlagt hva som helst ──▶ ReminderEngine (definisjoner → forekomster → skanning) ─┐
chat / forespørsler / arbeidsflyt / masseutsendelser ──────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app-sperre → socket → push → e-post (→ sms-plass)
konto-/juridisk post ──▶ TransactionalEmailHelper.sendTransactional()  [tillatelseslistet, lint-håndhevet]
```

1. **Alt som forteller en person noe** går gjennom `NotificationHelper.createNotifications()` i messaging-modulen. Den lagrer en `notifications`-rad og eskalerer socket → push → e-post, og evaluerer `PreferenceGateHelper` per kanal — inkludert `in_app` på nivå 0.
2. **Alt som er planlagt** er en `reminderDefinition` (på entitetsnivå eller omfangsnivå) utvidet til `reminderOccurrences` og sendt ut av `ReminderEngine.scan()` på en tilbakevendende timer. Én utvider, én utsender, én sendeledger (`reminderSentLog`).
3. **Direkte e-post** eksisterer kun bak `TransactionalEmailHelper.sendTransactional()`. En ESLint-regel håndhever dette ved kompilering — se nedenfor.

:::tip E-postdøren er lint-håndhevet, ikke bare konvensjon
`Api/tools/eslint-rules/email-door.cjs` definerer `no-direct-email-helper`: ethvert kall til `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` utenfor `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` feiler ved lint. Hvis du trenger å sende en e-post, ruter du den gjennom trakten (`createNotifications` med `emailImmediate`) eller gjennom `TransactionalEmailHelper.sendTransactional()` — det finnes ingen tredje vei som består CI.
:::

## Varslingstrakten

`NotificationHelper.createNotifications()` er det eneste inngangspunktet for alt som verken er planlagt eller transaksjonelt:

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
    deliveryStartLevel?: number;      // 0 socket (standard), 1 push, 2 kun e-post
    category?: string;                // preferanseakse; utledet fra contentType hvis utelatt
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send e-post nå i stedet for å vente på sammendraget
  }
)
```

For hver mottaker lagrer den en rad i `notifications` og kaller `attemptDeliveryWithEscalation`, som går gjennom kanalstigen nedenfor. En fortsatt-ulest rad for samme `(contentType, contentId)` undertrykker gjenopprettelse — denne deduplikeringsvakten hoppes over for `emailImmediate`-sendinger (påminnelsesforskyvninger, ansatt-"e-post til alle", arbeidsflytssteg eier sin egen deduplisering) og for direktemeldinger, som alltid pinger socketen.

`shared/helpers/NotificationService.ts` speiler den samme signaturen (`NotificationServiceOptions`) for innringere utenfor messaging-modulen og er registrert med messaging-modulen ved oppstart.

## Kanaleskaleringskjeden

Levering starter på et nivå (0 som standard, eller høyere for påminnelser/eksplisitte sendinger) og går videre til neste kanal bare hvis den forrige ikke lyktes. Hvert nivå sperres av `PreferenceGateHelper` før noe forsøkes.

| Nivå | Kanal | Atferd |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app`-sperren sjekkes først. Hvis undertrykt (dempet), lagres raden med `isNew=false` og leveringen stopper helt — ingen socket-pinging, ingen merke, ingen videre eskalering. Ellers slår serveren opp åpne socket-tilkoblinger for personens `alerts`-rom og pusher en `notification`- (eller `privateMessage`-)ramme. For vanlige varsler stopper en vellykket socket-levering kjeden her — 30-minutterstimeren sjekker ulest på nytt og eskalerer dem senere. Direktemeldinger stopper aldri ved socket: en installert PWA kan holde alerts-socketen åpen i bakgrunnen, noe som ellers ville undertrykt push på OS-nivå. |
| 1 | **push** | Sperret på `allowPush` / kategori-opt-out / stilletid. Sender til både Expo push-tokener og Web Push-abonnementer funnet på personens `devices`-rader, dedupliserer etter endepunkt og luker ut utdaterte tokener underveis. |
| 2 | **e-post** | Sperret på `emailFrequency` og kategori-opt-out. Umiddelbare sendinger (`emailImmediate`) rendres med en gang og skriver en `deliveryLogs`-rad; ellers blir varselet stående som ventende for parti-sammendraget, beskrevet nedenfor. |
| — | **sms** | Preferanserørleggingen (`allowSms`, per-kategori kanallister) tar allerede høyde for en SMS-kanal, men ingen produsent sender gjennom den i dag — den forblir reservert for masse-SMS-produktet, som kjører som en separat, isolert flyt via `TextingController` / `@churchapps/texting`. |

Uleste varsler som blir stående på socket eller push, eskaleres av 30-minutterstimeren (`NotificationHelper.escalateDelivery`). Parti-e-post sendes av `NotificationHelper.sendEmailNotifications(frequency)`, drevet av hver persons `emailFrequency`-preferanse: `individual` kjører på 30-minutterstimeren, `daily` kjører på nattimeren. (`weekly` er en gyldig preferanseverdi, men har ingen dedikert partikjøring ennå.)

## Påminnelsesmotoren

Planlagte påminnelser — arrangementspåminnelser, forfallsdatoer for oppgaver, tjeneste-/plantildelingspåminnelser — går alle gjennom én generalisert motor i stedet for skreddersydd per-funksjon cron-logikk.

```
reminderDefinitions ──utvider──▶ reminderOccurrences ──skanner (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entitets- eller omfangsnivå     én rad per (definisjon,               deliveryStartLevel: 1
 forskyvninger/kanaler/melding   entitet, forekomst, forskyvning)      + reminderSentLog-ledger
```

**Definisjoner** (`reminderDefinitions`) er enten på entitetsnivå (`entityId` satt — et spesifikt arrangement, en oppgave, eller en plan) eller på omfangsnivå (`entityId` null, `scopeId` satt — f.eks. hver plan under en tjenesteplantype). En definisjon bærer en CSV med minuttforskyvninger (`offsets`, f.eks. `"1440,60"` for én dag og én time før), et lokalt sendetidspunkt (`sendLocalTime`), en CSV med kanaler (`channels` — der `email` inkludert utløser en umiddelbar rik e-post ved sendetidspunktet), en `recipientMode`, og en valgfri egendefinert `message`.

**Utvidelse** materialiserer utsendingsrader for horisonten fremover (et rullende multi-dagers vindu). Den kjører på nattimeren, og synkront hver gang en definisjon lagres, slik at en påminnelse for et arrangement i siste liten fortsatt utløses. Omfangsdefinisjoner vifter ut via adapterens `loadScopeEntities`, og produserer ett forekomstsett per konkret entitet; forekomster på entitetsnivå bruker nøkkelen `definitionId:occurrenceISO:offset`, mens omfangsforekomster navnerommer etter entitets-id slik at de aldri kolliderer. Å upserte en forekomst **gjenoppliver** en tidligere avbrutt rad — å avbryte og deretter re-utvide er den standard måten å resynkronisere en påminnelse på etter at den underliggende entiteten endres; rader som allerede er `sent`, `failed`, eller `processing`, forblir urørt.

**Utsendelse** (`ReminderEngine.scan()`) kjører på 30-minutterstimeren. Den krever inn forfalte forekomster (en leie forhindrer dobbeltbehandling), laster mottakere gjennom entitetens adapter, filtrerer bort alle som allerede er registrert i `reminderSentLog` for den forekomsten, og kaller `createNotifications` med `deliveryStartLevel: 1` (hopp rett til push) pluss `emailImmediate`/`emailByPerson` når definisjonens kanaler inkluderer e-post.

En intern hendelsesbuss reagerer på entitetsmutasjoner uten å vente på den nattlige utvidelsen: innholdshendelser (via webhook-utsenderen) og plan-/oppgaveoppdateringshendelser utløser umiddelbar re-utvidelse eller kansellering for den berørte entiteten, og en planoppdatering re-utvider også eventuelle omfangsdefinisjoner knyttet til plantypen.

### Adaptere

Motoren er entitetsagnostisk; hver støttet entitetstype kobles til gjennom en adapter (`helpers/adapters/`):

| Entitetstype | Adapter | Notater |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Mottakere er omfangsbegrenset til påmeldte eller gruppemedlemmer avhengig av arrangementet og `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Mottakere er Akseptert + Ubekreftet plantildelinger. `buildEmails` kaller inn i `DoingModuleGateway.buildPlanReminderEmails`, som gjengir posisjoner, notater, og en egendefinert melding via `doing/helpers/PlanReminderEmailHelper`, inkludert Aksepter/Avslå-knapper signert av `ReminderTokenHelper` som poster til et offentlig tildelingsrespons-endepunkt. |
| `task` | `TaskReminderAdapter` | Mottakere er oppgavens tildelte person(er). |

### Endepunkter

| Metode | Sti | Formål |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Last eller lagre påminnelsesdefinisjonen for én entitet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Last eller lagre en påminnelsesdefinisjon på omfangsnivå (arvet). |
| `DELETE` | `/messaging/reminders/:defId` | Slett en definisjon og kanseller dens ventende forekomster. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Forhåndsvis mottakerantall og neste utløsningstidspunkter for en arrangementspåminnelse før lagring. |
| `GET` | `/messaging/reminders/log` | Nylig historikk over påminnelsesforekomster for en kirke. |
| `POST` | `/messaging/reminders/mute` | Demp påminnelser for en spesifikk entitet. |

Å lagre en definisjon utløser en synkron re-utvidelse for den entiteten eller omfanget, slik at redaktører ser oppdaterte "neste utløsninger" uten å vente på det nattlige jobben.

## Direktemeldinger

Direktemeldinger rir den samme trakten som alt annet, snarere enn en separat eskaleringssti. Hver ulest samtale får én **skyggerad** i `notifications` (`contentType='privateMessage'`, `contentId` = privatmeldings-id-en, `category='direct_messages'`) som eier all leveringstilstand — socket-/push-/e-posteskalering, lesesporing, alt. `privateMessages`-tabellen selv holder meldingsinnholdet og en `notifyPersonId`-kolonne, som er kilden til det uleste merket og som tømmes når mottakeren leser samtalen.

Skyggerader er usynlige for varslingsklokken: de ekskluderes fra ulest-antall-spørringen, varslingslistespørringen, og marker-som-lest/slett-spørringene, som alle filtrerer på `contentType <> 'privateMessage'`. Hver DM-ping treffer socketen uansett ulest-tilstand (live chat-semantikk — ingen deduplisering), og DM-er stopper aldri ved socket-levering slik vanlige varsler gjør, siden en PWA i bakgrunnen kan holde en socket åpen mens den likevel trenger en push på OS-nivå. Hvis en person demper DM-varsler, parkeres skyggeraden (`isNew=false`, `notifyPersonId` tømt) — fortsatt synlig inne i selve samtalen, bare uten merker eller varsler.

## Preferanser og sperring

Hver sending går gjennom `PreferenceGateHelper.evaluate()`, en ren funksjon (all tilstand sendes inn, ingen DB-kall på den hyppig brukte stien) som returnerer `allow`, `suppress`, eller `defer`. Lagene kjøres i rekkefølge, og det første som bestemmer, vinner:

1. **Låst kategori** — enkelte kategorier er obligatoriske (nivå 0) og omgår hvert annet lag.
2. **Hoveddemping / kanal-drap** — `masterMute`, `allowPush`, `allowSms`, eller `emailFrequency='never'` undertrykker direkte.
3. **Stilletid** — kun push og SMS (e-post anses som ikke-påtrengende). Hvis nåværende klokkeslett i personens tidssone faller innenfor deres stille vindu, slipper en transaksjonell kategori likevel gjennom; en ikke-transaksjonell utsettes til slutten av det stille vinduet, beregnet som et DST-korrekt UTC-tidspunkt via `TimezoneHelper.wallClockToUtc`.
4. **Per-kategori preferanseoverstyring** — en eksplisitt opt-out for ett kategori × kanal-par; fravær betyr kategoriens standard.
5. **Per-entitet demping** — en demping registrert mot en spesifikk entitet (f.eks. ett arrangement, én plan) begrenser ytterligere utover kategorinivå-innstillingen, men gjelder bare når innringeren oppgir en entitets-id/-type sammen med varselet.

Tabeller involvert: `notificationPreferences` (globalt — `masterMute`, `emailFrequency` av `individual|daily|weekly|never`, `allowPush`, stilletid-vindu + tidssone, `allowSms`), `notificationPreferenceOverrides` (per kategori × kanal), og `notificationEntityMutes` (per entitet).

Denne sperren håndheves for in-app (nivå 0), push (nivå 1), og e-post (nivå 2) inne i trakten — inkludert umiddelbare påminnelses-/sammendrags-e-poster. Transaksjonell e-post (autentiseringskoder, passordtilbakestillinger, invitasjoner, donasjonskvitteringer) omgår den med hensikt; det er hele poenget med den andre døren.

## Tidsplanlegging

Både påminnelsesmotoren og varslingssammendraget rir eksisterende planlagte timere i stedet for å innføre ny infrastruktur:

| Timer | Tidsplan | Kjører |
|-------|----------|------|
| 30-minutterstimer | hvert 30. minutt | Eskalerer uleste varsler; sender `individual`-frekvens sammendrags-e-poster; sender ut forfalte påminnelsesforekomster (`ReminderEngine.scan`); godkjenningssammendrag; forfalte automasjonsutførelser |
| Nattimer | 05:00 UTC | Gruppeoppmøtepåminnelser; fremdrift for gjentakende strømmetjenester; oppfrisking av auto-oppfrisk-lister; utvidelse av påminnelsesforekomster for neste horisont (`ReminderEngine.expandAll`); sender `daily`-frekvens sammendrags-e-poster |

Lokalt kan samme logikk utløses på forespørsel med `npm run timer:30min` og `npm run timer:midnight` fra `Api`-prosjektet.

## Filoversikt

| Område | Filer |
|------|-------|
| Trakt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Delt inngangspunkt | `Api/src/shared/helpers/NotificationService.ts` |
| Transaksjonell dør | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint-regel `Api/tools/eslint-rules/email-door.cjs` |
| Påminnelsesmotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Påminnelses-repoer | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Tjeneste-/plan-e-post | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Påminnelsesredaktører (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Påminnelsesredaktør / preferanser (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterte sider

- [Sanntidsarkitektur](../realtime) — WebSocket-protokollen og klientprimitivene (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) som in-app-leveringsnivået rir på
- [Nett-push-varsler](../web-push) — VAPID-oppsett og nettleserens Push API-sti brukt av push-eskaleringsnivået
- [Messaging-endepunkter](../api/endpoints/messaging) — full REST-flate for meldinger, samtaler, koblinger, og varslings-/påminnelsesrutene
