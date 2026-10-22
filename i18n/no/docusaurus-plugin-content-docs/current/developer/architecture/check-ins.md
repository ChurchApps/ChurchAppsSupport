---
title: "Innsjekking"
---

# Innsjekking {#check-ins}

<div class="article-intro">

Innsjekking er ett system med tre innganger: B1Checkin-kioskappen for bemannede og selvbetjente stasjoner, selvinnsjekking inne i B1Apps medlemsportal, og oppmøte på administratorsiden i B1Admin. Alle tre skriver til samme oppmøtemodul i kjerne-API-et, og rombestillingen styres helt av grupper — det finnes ingen egen enhet for «lokasjoner» eller «rom». Et barnesikkerhetslag ligger over dette: innsjekkingstyper per besøk, serverside gater for kapasitet og volontørratio, alders- og klassetrinnskontroll på kiosken, verifisering av betrodde hentepersoner ved utsjekking, og foreldrevarsling via menighetens SMS-leverandør. Denne siden viser datamodellen, innsjekkingsflytene, sikkerhetslaget og utskriftsrørledningen for etiketter.

</div>

## Oversikt {#overview}

```
┌──────────────────────────┐
│ B1Checkin (Expo-kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  oppslag → husstand →    │  │         │ Api                                          │
│  grupper → fullfør/skriv │  │  HTTPS  │  ┌─ membership-modul ──────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (selvinnsjekking)  │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin-skjerm  │  │         │  ┌─ attendance-modul ──────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (ansatte)        │──┘         │  │ groupServiceTimes  (romtildeling)       │ │
│  oppsett · rapporter ·   │            │  │ sessions ← visitSessions → visits       │ │
│  etikettdesigner         │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Utskriftsvei for etiketter (bare kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (etikettmaler, eller innebygd HTML-reserve)
       └▶ LabelRenderer → HTML-dokument + innebygde SVG-strekkoder
            └▶ PrintUI: WebView-rendering → ViewShot JPG-fangst
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Flate | Repo | Stack | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, filruting med expo-router; EAS-bygg for Android, Amazon Fire og iOS; OTA-oppdateringer via `expo-updates` | Bemannet eller selvbetjent stasjon med etikettutskrift og verifisert utsjekking |
| Selvinnsjekking | `B1App` | Next.js (b1.church-medlemsportal) | Innloggede medlemmer sjekker inn husstanden sin fra telefonen; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tilordner grupper til gudstjenestetider, designer etiketter, registrerer manuelt oppmøte, kjører rapporter |

Alle tre kaller de samme to API-modulene via `ApiHelper`: **MembershipApi** (`/membership`) for personer, husstander og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`) {#data-model-apisrcmodulesattendance}

| Entitet / tabell | Nøkkelfelt | Betydning |
|----------------|-----------|---------|
| `campuses` | name, address | Foreldet her — campuser administreres i membership-modulen (`/membership/campuses`); attendance-kopien er frosset som skrivebeskyttet for eldre lesere (`models/Campus.ts`) |
| `services` | campusId, name | En gjentakende samling, f.eks. «Sunday Morning» (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Et tidsrom innenfor en gudstjeneste, f.eks. «9:00 AM» (`models/ServiceTime.ts`). Tidsplankolonnene er valgfrie (migrering `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) og styrer [innsjekkingsvinduet](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Koblingstabell: hvilke grupper (klasserom) som møtes på hvilke gudstjenestetider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte for én gruppe på én dato — opprettes lazy ved innsjekking (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Én person som deltar på én dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = eldre medlem), satt av kiosken og brukt av kapasitets- og ratiogatene |
| `visitSessions` | visitId, sessionId | Hvilken(e) økt(er) et besøk dekker — et barn som sjekkes inn på to gudstjenestetider får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokker) | Designbare etikettoppsett (`models/LabelTemplate.ts`) |

### Slik lagres en fullført innsjekking

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Kroppen er en matrise av `Visit`-objekter, der hvert har `visitSessions` med en innbygget `session` som bare angir et par `(serviceTimeId, groupId)`. Serveren gjør deretter følgende:

1. **Gater kapasitet og ratio før noen skriving.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sjekker hvert målrettet rom mot kapasitet, gjestekapasitet, stengt-flagget og volontørratio mot gjeldende belegg. postCheckin er **ikke transaksjonell**, så gaten må kjøre før den første lagringen — et hardt brudd gir 409 med navn på berørte rom, og ingenting lagres. Se [Kapasitets- og volontørratiogater](#capacity-and-volunteer-ratio-gates).
2. **Løser økter lazy.** `getSessionId()` finner eller oppretter `sessions`-raden for `(groupId, serviceTimeId, today)` — økt-ID-er caches i prosessen per dato. Nye økter sender en `session.created`-webhook. Løkken er en ventet `for..of` — en tidligere fire-and-forget `forEach(async …)` kappløp med lagringen og skrev NULL som sessionId ved opprettelse av første økt (rettet; notert i en kodekommentar ved løkken).
3. **Erstatter dagens poster.** Eksisterende besøk for disse personene på denne gudstjenesten i dag slettes sammen med tilhørende visitSessions, og deretter lagres det innsendte settet. Å sjekke inn en familie på nytt er derfor en idempotent «dette er gjeldende tilstand»-operasjon, ikke en tilføyelse. Når du sender `?checkDuplicates=true` i stedet, returneres `{ duplicates: [personId…] }` uten skriving — slik kiosken varsler før den overskriver.
4. **Genererer én sikkerhetskode per batch.** `SecurityCodeHelper.generate()` lager en 4-tegns kode fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, så kodene ikke kan stave ord eller leses feil). Serveren prøver på nytt ved kollisjon mot samme menighets åpne besøk samme dag, og setter koden på hvert besøk i batchen.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` kobler personId til antall sammenhengende ukers oppmøte; kiosken feirer milepæler (hver femte uke) med konfetti.

Hvert lagret besøk sender også en `attendance.recorded`-webhook. Lesesiden, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **siste registrerte dato** — hvis det var en tidligere uke, fjernes ID-ene, og klienten får en forhåndsutfylt kopi av forrige ukes romvalg som lagres som nye poster.

### Utsjekking

To endepunkter fullfører kretsløpet (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens ikke-utsjekkede besøk med den sikkerhetskoden, med økter fylt ut.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; setter `checkoutTime` og hvem som hentet, og sender en `attendance.checkout`-webhook per besøk.

Tillatelser: kiosker autentiserer med `attendance.checkin`, som gir nøyaktig innsjekkings-/utsjekkings- og etikettmalflaten; `attendance.view`/`attendance.edit` dekker rapportering og manuell registrering; strukturen (gudstjenester, gudstjenestetider, grupptildelinger) krever `services.edit`. Medlemmers egen innsjekking i B1App krever ingen tillatelse: enhver autentisert bruker med en koblet person i menigheten kan kalle `GET`/`POST /attendance/visits/checkin`, og serveren begrenser de innsendte `personId`-ene til kallerens egen husstand (403 ellers — denne skranken er det som hindrer at andre familiers `securityCode`-er kan leses). Medlemskap er tillatelsen; om medlemmer *ser* funksjonen styres av menighetens faner i B1App-navigasjonen. De andre innsjekkingsendepunktene (`code/:code`, `checkout`, `guardians`, `CheckinController`) forblir bare for kiosk og ansatte.

## Grupper styrer romtildelingen {#groups-drive-room-routing}

Det finnes ingen rom- eller klasseromsenhet noe sted i systemet. Et «rom» er en membership-**gruppe** med `trackAttendance` aktivert, koblet til en eller flere gudstjenestetider via `groupServiceTimes`. Gruppefeltene (i `Api/src/modules/membership/models/Group.ts`) som former kioskens oppførsel:

| Felt | Effekt |
|------|--------|
| `trackAttendance` | Gruppen deltar i oppmøte i det hele tatt; B1Admins oppsettstre markerer `trackAttendance`-grupper uten `groupServiceTimes`-rad som ikke tildelt |
| `parentPickup` | Markerer et barnerom: innsjekking i det gjør besøket til et «barn»-besøk, som skriver ut en familiehentingsetikett og setter sikkerhetskoden på navneskiltet |
| `printNametag` | Om innsjekkinger til denne gruppen skriver ut et navneskilt i det hele tatt |
| `capacity` / `guestCapacity` / `checkinClosed` | Romkapasitetsgrenser og en hard «stengt»-bryter, håndhevet serverside av innsjekkingsgaten (redigeres i B1Admins gruppeinnstillinger under «Check-In Capacity») |
| `volunteerRatio` / `minVolunteers` | Forhold barn per volontør og minimum antall volontører, håndhevet per den menighetsomfattende `ratioEnforcement`-innstillingen |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alders- og klassetrinnsgrenser som evalueres på kiosken for å fremheve eller dempe rom |

Alle klienter denormaliserer på samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): last `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` og `GET /membership/groups` parallelt, og samle deretter for hver gudstjenestetid gruppene hvis `groupServiceTimes`-rad peker til den i `serviceTime.groups`. Denne matrisen er det romvelgeren viser, ordnet etter gruppens `categoryName`.

Tildelinger redigeres fra gruppens side i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), og hele treet campus → gudstjeneste → gudstjenestetid → gruppe visualiseres i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er den eneste sannhetskilden, driver det samme gruppemedlemskapet kioskrutingen, oppmøte i stil med oppmøteliste på B1Admins gruppesider, og oppmøterapportering. Å tilordne en gruppe til en gudstjenestetid er det eneste trinnet som kreves for å gjøre den til et innsjekkingsmål.
:::

## Barnesikkerhet {#child-safety}

### Innsjekkingstyper {#check-in-types}

Hvert besøk har en `checkinType` — `member`, `guest` eller `volunteer` (NULL betyr eldre/medlem; migrering `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **på kiosken**: Member / Guest / Volunteer-brikker på den utvidede medlemsraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), og settes på hvert ventende besøk når innsjekkingen fullføres (`app/checkinComplete.tsx`, som standard `member`). Serveren bruker den i gaten — volontører teller mot ratiodekning i stedet for mot kapasitet, og gjester teller mot `guestCapacity`.

### Kapasitets- og volontørratiogater {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjøres inne i `postCheckin` før noen lagring (endepunktet er ikke-transaksjonelt, så gating før lagring er korrekthetsmekanismen). Den laster gjeldende belegg per målgruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigurasjonen gjennom membership-modulens gateway, og klassifiserer deretter brudd:

- **Hardt (blokkerer alltid):** `checkinClosed`, `current + incoming > capacity`, antall gjester over `guestCapacity`. Batchen avvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosken viser det navngitte rommet.
- **Ratio (advarer eller blokkerer):** innkommende ikke-volontører til et rom der `volunteers < minVolunteers`, ingen volontører i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighetsgraden følger den menighetsspesifikke innstillingen `ratioEnforcement` (`"warn"` som standard / `"block"`, redigeres i B1Admin under Manage Church → Check-In, `CheckinSettingsEdit.tsx`). I advarselsmodus returneres `409 { warning: true, error: "ratio", … }` med mindre klienten sender inn på nytt med `acknowledgeWarnings=true` — denne innsendingen på nytt er kioskens overstyring som bekreftes av ansatte.

### Planlagte innsjekkingsvinduer {#scheduled-check-in-windows}

En gudstjenestetid kan ha en valgfri ukentlig plan (`dayOfWeek` 0–6 der 0 = søndag, `startTime`/`endTime` som `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), redigert i B1Admins **Attendance → Setup**-skjema for gudstjenestetider (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, «Check-in Schedule»). `CheckinGateHelper.hasSchedule()` behandler en gudstjenestetid som planlagt bare når både `dayOfWeek` og `startTime` er satt; ikke-planlagte tider er aldri tidsstyrt. `isServiceTimeOpen()` beregner vinduet i lokal veggklokketid (`DateHelper.toChurchTime`). Sonen løses per gudstjenestetid av `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): `timezone` for gudstjenestens campus (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) kommer først, deretter menighetens `timeZone` (satt i B1Admins Church Information), deretter første ikke-fjernede campus som har en `timezone` (`loadCampusTimeZone`), og først til slutt `America/New_York`. Campus kommer først fordi de fleste menigheter fikk `America/New_York` tilbakefylt som menighetssone. Både oppslaget og innsendingsveiene nedenfor løser den på samme måte. Vinduet går fra `checkinOpenMinutes` før start til `checkinCloseMinutes` etter slutt (eller etter start når det ikke finnes slutt), og håndterer vinduer som går over midnatt eller over ukegrensen.

Vinduet håndheves på to steder:

- **Oppslag:** `GET /attendance/servicetimes` setter en beregnet boolsk `checkinOpen` på hver rad. B1Apps selvinnsjekking (`CheckinPage.tsx`) og B1Checkins gudstjenestevelger (`app/services.tsx`) beholder hver tid. Når alle tidene for en gudstjeneste er stengt, viser de neste åpningstidspunkt («Check-in opens Sun 9:30 AM.» i B1App, «Check-in for this service opens Sun 9:30 AM.» i B1Checkin, fra `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), og faller tilbake til «Check-in isn't open for this service right now.» når ingen åpning kan beregnes (kiosken tilbyr en Tilbake-knapp for å velge en annen gudstjeneste). Ellers vises stengte tider som en ikke-valgbar «Closed» / «Closed · opens 9:30 AM»-rad. Husstandsskjermen i B1Checkin (`MemberServiceTimes.tsx`) evaluerer åpenhet på nytt live med enhetens klokke via `ServiceTimeHelper.isCheckinOpen()` (enhetens tidssone, ikke menighetens), slik at en kiosk som står og går åpner og lukker i tide, og viser «Kids Room 1 · Checked in» (gruppenavn) på en stengt tid personen allerede har.
- **Innsending:** inne i `evaluateGates()`, før kapasitets-/ratiovurderingen, avviser `findClosedServiceTimeGroups()` batchen med `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` hvis en målrettet økts gudstjenestetid er utenfor vinduet. Fordi en husstands eksisterende besøk for i dag sendes på nytt ved hver innsjekking, hopper økter personen allerede har (`personId|sessionId` i eksisterende besøk) over denne gaten, slik at det ikke avvises å legge til en senere åpen gudstjenestetid fordi et tidligere vindu har lukket seg. B1Checkin viser dette via sin hardgate-skjerm med begrunnelsen «check-in isn't open right now» (kapasitetsbrudd viser fortsatt «room is full or closed»).

### Alders- og klassetrinnskontroll (på kiosken) {#agegrade-eligibility-kiosk-side}

Romkvalifisering er rådgivende UI, evaluert på kiosken og ikke håndhevet av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klassetrinn med gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (rekkefølge for klassetrinn: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` — manglende data gir `unknown` og skjuler aldri et rom. Alder og klassetrinn beregnes per menighetens **dato for klassetrinnsopprykk** (`gradePromotionDate`-innstilling, `"MM-DD"`, redigert i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` velger den nyeste forekomsten på eller før i dag. Romvelgeren fremhever kvalifiserte rom og demper ikke-kvalifiserte; å velge et dempet rom krever bekreftelse fra ansatte.

### Betrodd henting og ikke-autorisert henting {#trusted-and-not-authorized-pickup}

Hentepersoner er en membership-entitet, per husstand: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (enhver autentisert menighetsbruker, slik at kiosker kan lese den) pluss `POST` / `DELETE` som krever `people.edit`. Ansatte administrerer listen på personsidens **Pickup**-kort (`B1Admin/src/people/components/PickupPeople.tsx`) — bilde, slektskap og en statusbrikke for Trusted/Not Authorized.

Ved utsjekking (`B1Checkin/app/checkout.tsx`) laster kiosken husstandens henteliste: `trusted`-oppføringer vises som trykkbare hentekort ved siden av rutenettet med bilder av voksne i husstanden, og et fritt skrevet navn under «Other» sammenlignes uskarpt (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized`-oppføringer — et treff blokkerer utsjekking med et advarselsark og en **Override**-knapp for ansatte. Overstyringen logges på selve besøket: den sender `checkedOutBy` som `"OVERRIDE: {name}"` gjennom vanlig `POST /attendance/visits/checkout`, så den havner i oppmøteposten og i `attendance.checkout`-webhooken i stedet for i en egen revisjonstabell.

### Varsling av foreldre og nødkunngjøring {#page-a-parent-and-emergency-broadcast}

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) tilbyr to SMS-endepunkter:

- `POST /page` — `{ visitId, message }`: varsler foresatte til ett innsjekket barn (utsjekkingsskjermen på kiosken, bemannet modus).
- `POST /broadcast` — `{ serviceId, message }`: sender SMS til de voksne i alle innsjekkede husstander for en gudstjeneste (admininnstillinger på kiosken, bak et ark der man må skrive `EMERGENCY` for å bekrefte, i `B1Checkin/app/adminSettings.tsx`).

Begge slår opp voksne i husstander gjennom membership-gatewayen, og overlater deretter levering til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — døren på tvers av moduler til menighetens konfigurerte SMS-leverandør (`@churchapps/texting`: TextInChurch, Clearstream eller MutualMinistry; det finnes ingen innebygd SMS-avsender). Gatewayen logger en `sentText`-rad pluss `deliveryLog`-oppføringer per mottaker og begrenser en batch til 500 mottakere; uten konfigurert leverandør returnerer den `no_provider`, som kiosken viser som «No SMS provider configured». Kontrollerens `dispatch()` fjerner duplikate telefonnumre og hopper over personer uten mobilnummer eller med `optedOut` satt, og returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }` slik at kiosken kan vise hva som ble hoppet over.

## Kiosken (B1Checkin) {#the-kiosk-b1checkin}

Skjermene er expo-router-filer under `B1Checkin/app/`; tilstand på tvers av skjermer ligger i en statisk `CachedData`-klasse (`src/helpers/CachedData.ts`), ikke i React-tilstand.

```
index (oppstart/automatisk innlogging) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             laster serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ skriv ut etiketter,
             groupServiceTimes,           │             └▶ checkout (bemannet)         går tilbake automatisk
             labelTemplates               │                                            til lookup
```

1. **Oppslag** (`app/lookup.tsx`) — søk etter telefonnummer (`GET /membership/people/search/phone?number=`, siste 4 eller hele) eller navn (`GET /membership/people/search?term=`). Å velge et treff laster husstanden (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), og fyller `pendingVisits` med forrige ukes valg.
2. **Gjennomgang av husstand** (`app/household.tsx`, `src/components/MemberList.tsx`) — hver medlemsrad viser en brikke for allerede innsjekket, en brikke for allergi/`nametagNotes`, og gjeldende romvalg. Ved å utvide et medlem vises hver gudstjenestetid med en romknapp, pluss Member / Guest / Volunteer-brikkene for innsjekkingstype (`MemberServiceTimes.tsx`). Under hvert gudstjenestetidsnavn viser `ServiceTimeHelper.getGroupSummary()` gruppene som tilbys der (navnene fra `serviceTime.groups`, trimmet, dedupliserte uavhengig av store/små bokstaver, kommaseparert); ingenting vises når tiden ikke har grupper.
3. **Gruppetildeling** (`app/selectGroup.tsx`) — et kategoritre bygget fra `serviceTime.groups`, med alders-/klassetrinnskvalifiserte rom fremhevet og ikke-kvalifiserte dempet bak en bekreftelse fra ansatte (se [Alders- og klassetrinnskontroll](#agegrade-eligibility-kiosk-side)); å velge et rom skriver en `{ session: { serviceTimeId, groupId } }`-besøksøkt inn i personens ventende besøk (`src/helpers/VisitSessionHelper.ts`). «None» fjerner valget.
4. **Fullfør** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` med `pendingVisits` (hver stemplet med sin `checkinType`), deretter utskrift av etiketter hvis en skriver er konfigurert, og automatisk retur til oppslag. Et `409`-svar for kapasitet eller `notOpen` viser det navngitte rommet med årsaken (fullt/stengt, eller innsjekking ikke åpen); en ratioadvarsel tilbyr en bekreftelse fra ansatte som sender inn på nytt med `acknowledgeWarnings=true`.

Utsjekkingsskjermen (`app/checkout.tsx`) tar imot den 4-tegns sikkerhetskoden gjennom et automatisk fokusert felt — slik at USB-/Bluetooth-tastaturskannere fungerer uten kamera — eller et skjermtastatur som bruker samme alfabet, og sender automatisk ved 4 tegn. En **Scan**-knapp åpner et ark med det delte kameraet `src/components/CodeScanner.tsx` (bakkamera som standard, som godtar QR, Code 128 og Code 39), slik at stasjoner uten tastaturskanner kan lese henteetiketten; en skannet kode går gjennom samme `handleCode()`-sti som skrevet inndata. Den slår opp koden, viser barna som hentes, og presenterer husstandens **betrodde hentepersoner** som trykkbare kort ved siden av et rutenett med bilder av voksne i husstanden (pluss et «Other»-valg med fritekst som sammenlignes uskarpt mot navn som ikke er autorisert — se [Betrodd henting og ikke-autorisert henting](#trusted-and-not-authorized-pickup)), og sender deretter `POST /attendance/visits/checkout` med velgerens navn/ID. I bemannet modus tilbyr skjermen også **Page a parent** (`POST /attendance/checkin/page`) og **omutskrift av sikkerhetsetikett** — `reprint()` bygger familiens etiketter på nytt med `LabelHelper.getAllLabelsFor(...)` og sender dem gjennom samme `PrintUI`-rørledning som innsjekking.

Stasjonens oppførsel er et AsyncStorage-flagg `@StationMode` (`"self"` | `"manned"`, byttes i `app/adminSettings.tsx`). Bemannet modus legger til inngangspunktet for utsjekking på oppslagsskjermen og redigering av personprofil per medlem (`POST /membership/people`) fra husstandsskjermen. Herdingen av kiosken er innebygd: en valgfri PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) låser admin- og skriverskjermene, admin-skjermen åpnes bare ved 7 raske trykk på hodelogoen, og en inaktiv hvilemodusskjerm (`src/hooks/useInactivityTimer.ts`) tar over mellom familiene.

## Selvinnsjekking (B1App) {#self-check-in-b1app}

Medlemmer sjekker inn fra b1.church-portalen på `/mobile/checkin`-skjermen (rutet av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Den krever en innlogget bruker og går gjennom de samme fire stegene som kiosken — gudstjenester → husstand → grupper → fullfør — mot de identiske endepunktene, med tilstand i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kiosken: husstanden kommer fra den innloggede brukerens egen `householdId` (ikke noe søkesteg), og det finnes ingen etikettutskrift — i stedet viser fullføringsskjermen batchens sikkerhetskode som en QR-kode (`qrcode.react`) med en hint om «show this at a check-in station». Hvis husstanden allerede er innsjekket når siden lastes, viser en knapp «Show check-in code» QR-koden på nytt fra det første eksisterende besøket (fra `GET /attendance/visits/checkin`) som har en `securityCode`. Innsjekkingen registreres øyeblikkelig ved innsending (det finnes ingen ventende tilstand); QR-koden styrer bare etikettutskrift på kiosken.

**Utskrift av etiketter fra telefon til kiosk** (`B1Checkin/app/scan.tsx`, nås fra QR-knappen «Scan code» på oppslagsskjermen): kiosken viser `CodeScanner` (en `expo-camera` `CameraView`, forhåndsvendt kamera som standard, kan snus) og skanner etter QR-koder. `ScanCodeHelper.parse()` godtar bare en nyttelast som er en ren 4-tegns kode i sikkerhetskodealfabetet, og `ScanCodeHelper.isRepeat()` ignorerer samme kode i 4 sekunder, slik at både B1App-QR-en og QR-blokken på en utskrevet etikett fungerer. Skjermen følger deretter utskriftsstien for omutskrift ved utsjekking — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — og går tilbake til oppslag. Det skjer ingen oppmøteskriving ved skanning; bare etiketter. Koder uten aktive besøk, stasjoner uten skriver og grupper uten etiketter viser hver sin toast og går tilbake til oppslag.

Typene og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React-komponenter deles med B1Admin.

## Oppmøte på administratorsiden (B1Admin) {#admin-side-attendance-b1admin}

- **Oppsett** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) viser strukturtreet og lar deg opprette gudstjenester (`ServiceEdit.tsx`) og gudstjenestetider (`ServiceTimeEdit.tsx`). Campusdata kommer fra membership via hooken `useCampuses()`.
- **Manuelt oppmøte** finnes på gruppesiden, ikke i oppmøteseksjonen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter økter (`POST /attendance/sessions`; ved tillegging kan `SessionEdit.tsx` inkludere én økt per annen gruppe som deler den valgte gudstjenestetiden, og hopper over grupper som allerede har en økt på den datoen) og markerer personer som til stede via `POST /attendance/visitsessions/log`, som finner eller oppretter besøket for den personen og økten. Gruppeledere kan registrere oppmøte for sine egne grupper uten tillatelsen `attendance.edit` — kontrollerne sjekker `au.leaderGroupIds`.
- **Rapportering** — trend i oppmøte og gruppeoppmøte er serverdefinerte rapporter (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi; definisjoner i `Api/reports/*.json`). Begge tar `startDate`/`endDate` (sluttdatoen er inkludert); trendrapporten har som standard ett år tilbake til i dag og legger til en `sessionDates`-kolonne per uke, og gruppeoppmøtets tre på skjermen inkluderer hvert besøks `checkinTime` og personens `membershipStatus`. CSV-filen for gruppeoppmøte kommer fra den tilhørende rapporten `groupAttendanceDownload`, pivotert av `GroupAttendanceDownloadHelper` til én rad per gruppemedlem med en kolonne for til stede/fraværende per datert økt; historikk per person er `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Utskrift av etiketter {#label-printing}

### Maler og designeren {#templates-and-the-designer}

Menigheter designer sine egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nås fra innsjekkingsinnstillingene). En mal er en `labelTemplates`-rad der `content` er en JSON-matrise av blokker — `text`, `field`, `barcode`, `qrcode` eller `box` — hver plassert i prosentkoordinater med skrift, justering, symbologi (`code39`/`code128`/`qr`) og valgfrie synlighetsbetingelser (f.eks. bare vis allergiboksen når `person.nametagNotes` ikke er tom). Det finnes to `labelType`-verdier: `nametag` (én per innsjekket person; felt som `person.displayName`, `sessions`, `securityCode` og `person.isBirthdayWeek` — `"true"` når bursdagens måned/dag er innenfor 3 dager fra i dag, også over årsskiftet, beregnet av `LabelHelper.isBirthdayWithin()`) og `pickup` (én per familie; felt som `children`, `childrenAllergies`). Serveren håndhever én standard per type per menighet (`LabelTemplateController.save`). Designeren leveres med startmaler som speiler kioskens innebygde etiketter, og forhåndsviser mot eksempeldata.

### Rendering og utskrift på kiosken {#rendering-and-printing-on-the-kiosk}

Når innsjekkingen er fullført, avgjør `B1Checkin/src/helpers/LabelHelper.ts` hva som skal skrives ut ut fra gruppeflaggene på hvert ventende besøk: navneskilt for `printNametag`-grupper, pluss én familiehentingsetikett hvis et besøk traff en `parentPickup`-gruppe. Besøk med `checkinType` `volunteer` hoppes over av `LabelHelper.selectChildVisits()`, slik at en barnepasser i et Parent Pickup-rom aldri utløser en hentingsetikett. Sikkerhetskoden fra innsjekkingssvaret settes på barnas navneskilt og hentingsetiketten; voksne navneskilt skrives ut uten kode. Hvis menigheten har maler, gjør `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blokker pluss en feltkontekst om til et frittstående HTML-dokument; ellers brukes innebygde HTML-etiketter i `B1Checkin/assets/labels/` med plassholdererstatning.

Strekkoder genereres som innebygd SVG av rene TypeScript-enkodere i `B1Checkin/src/helpers/barcode.ts` — mønstertabeller for Code 39 og breddetabeller for Code 128 (kodesett B med mod-103-sjekksum), pluss QR via pakken `qrcode`. **Disse enkoderne er bevisst duplisert i B1Admin** (`LabelEditor.tsx` inlinerer de samme tabellene, notert i en kodekommentar), slik at designerens forhåndsvisninger er pikselnøyaktige med kioskutskriften; en endring i den ene må speiles i den andre.

Utskriftsrørledningen (`src/components/PrintUI.tsx`) rendrer hver HTML-etikett i en `WebView`, fanger den til JPG med `react-native-view-shot`, og sender bilde-URI-ene til den native Expo-modulen **printer-helper** (`B1Checkin/modules/printer-helper/`). Modulen eksponerer `scan()`, `checkInit()`, `printUris()` og statushendelser, med en leverandør per merke på begge plattformer:

| Merke | Android | iOS | Merknader |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serien nettverksskrivere (QL-800/810W/820NWB/1100/1110NWB…), stansede 29×90-etiketter, anbefalt standard |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverksoppdagelse + TCP/ZPL-bildeutskrift |

Skrididvalg ligger i `app/printers.tsx` (nettverksskanning returnerer `brand~model~ip`-oppføringer; valget lagres i AsyncStorage), og `src/helpers/PrinterLog.ts` holder en diagnostikklogg på enheten som vises via en levende statusprikk i kioskens topptekst.

## Gjestregistrering {#guest-registration}

To veier oppretter en person midt i innsjekkingen:

- **På kiosken** — «Add guest» på husstandsskjermen åpner `B1Checkin/app/addGuest.tsx`, som først søker i `GET /membership/people/search?term=` etter et eksisterende treff som ikke er medlem, og ellers oppretter en med `POST /membership/people`, knyttet til gjeldende husstand. Gjesten går deretter gjennom gruppetildelingen som ethvert medlem.
- **Selvbetjent via QR** — når menighetsinnstillingen `enableQRGuestRegistration` er på (konfigureres i B1Admins innsjekkingsinnstillinger, leses fra `GET /membership/settings/public/{churchId}`), viser oppslagsskjermen på kiosken en QR-kode som lenker til `https://{subdomain}.b1.church/guest-register?serviceId=`. Den B1App-siden (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en besøkende familie registrere seg selv på sin egen telefon gjennom det anonyme endepunktet `POST /membership/people/guest-register`, slik at køen ved kiosken går videre. QR-arket har også en **Register here**-knapp som åpner samme side på kiosken (`app/guestRegister.tsx`) i en `WebView` uten cache og i inkognitomodus; `src/helpers/GuestRegisterHelper.ts` bygger adressen for både QR-en og `WebView`-en, og blokkerer navigering bort fra `https://{subdomain}.b1.church/guest-register`. Skjermen hopper tilbake til oppslag ved **Done**, tilbakeknappen, eller etter 120 sekunder uten aktivitet (skriving i skjemaet videresendes fra `WebView` som aktivitet), og avmonterer `WebView`-en slik at én families oppføringer aldri når neste familie.

## Relaterte sider {#related-pages}

- [Oppmøte-endepunkter](../api/endpoints/attendance) -- Fullstendig REST-flate for campuser, gudstjenester, økter, besøk og besøksøkter
- [Medlemsendepunkter](../api/endpoints/membership) -- Personer, husstander og grupper
- [Webhooks](../api/webhooks) -- Hendelsene `session.created`, `attendance.recorded` og `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Hvordan oppmøtemodulen er organisert på serversiden
