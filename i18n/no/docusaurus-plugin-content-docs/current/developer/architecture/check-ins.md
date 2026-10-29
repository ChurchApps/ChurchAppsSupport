---
title: "Innsjekkinger"
---

# Innsjekkinger

<div class="article-intro">

Innsjekking er ett system med tre innganger: B1Checkin-kioskappen for bemannede og selvbetjente stasjoner, selvinnsjekking inne i B1App-medlemsportalen, og oppmøte på administratorsiden i B1Admin. Alle tre skriver til samme oppmøtemodul i kjerne-API-et, og romtildelingen i klasserommene styres helt av grupper — det finnes ingen egen enhet for «lokasjoner» eller «rom». Et barnesikkerhetslag ligger på toppen: innsjekkingstyper per besøk, kapasitets- og bemanningsforholdskontroller på serversiden, alders- og klassetrinnskvalifisering på kiosken, verifisering av betrodd henting ved utsjekking, og foreldrevarsling via kirkens tekstmeldingstjeneste. Denne siden kartlegger datamodellen, innsjekkingsflytene, sikkerhetslaget og utskriftsrørledningen for etiketter.

</div>

## Oversikt

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Flate | Repo | Stakk | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router-filruting; EAS-bygg for Android, Amazon Fire og iOS; OTA-oppdateringer via `expo-updates` | Bemannet eller selvbetjent stasjon med utskrift av etiketter og verifisert utsjekking |
| Selvinnsjekking | `B1App` | Next.js (b1.church-medlemsportalen) | Innloggede medlemmer sjekker husstanden sin inn fra en telefon; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tildeler grupper til gudstjenestetider, designer etiketter, registrerer manuelt oppmøte, kjører rapporter |

Alle tre kaller de samme to API-modulene gjennom `ApiHelper`: **MembershipApi** (`/membership`) for personer, husstander og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`)

| Entitet / tabell | Nøkkelfelt | Betydning |
|----------------|-----------|---------|
| `campuses` | name, address | Utdatert her — kampuser administreres i membership-modulen (`/membership/campuses`); attendance-kopien er frosset skrivebeskyttet for eldre lesere (`models/Campus.ts`) |
| `services` | campusId, name | En gjentakende samling, f.eks. «Søndag morgen» (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Et tidsrom innenfor en gudstjeneste, f.eks. «09:00» (`models/ServiceTime.ts`). Tidsplankolonnene er valgfrie (migrering `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) og styrer [innsjekkingsvinduet](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Koblingstabell: hvilke grupper (klasserom) som møtes på hvilke gudstjenestetider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte for én gruppe på én dato — opprettes lazy på innsjekkingstidspunktet (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Én person som deltar på én dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = eldre medlem), satt av kiosken og brukt av kapasitets-/forholdskontrollene |
| `visitSessions` | visitId, sessionId | Hvilke økter et besøk dekker — et barn som sjekkes inn til to gudstjenestetider får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokker) | Designbare etikettoppsett (`models/LabelTemplate.ts`) |

### Slik lagres en fullført innsjekking

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Body er en array med `Visit`-objekter, der hvert bærer `visitSessions` hvis innebygde `session` kun navngir et par `(serviceTimeId, groupId)`. Serveren gjør deretter følgende:

1. **Kontrollerer kapasitet og forhold før noen skriving.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sjekker hvert målrettet rom mot kapasitet, gjestekapasitet, stengt-flagg og bemanningsforhold mot gjeldende belegg. postCheckin er **ikke transaksjonell**, så kontrollen må kjøre før den første lagringen — en hard overtredelse returnerer en 409 som navngir det/de berørte rommene, og ingenting lagres. Se [Kapasitets- og bemanningsforholdskontroller](#capacity-and-volunteer-ratio-gates).
2. **Løser økter lazy.** `getSessionId()` finner eller oppretter `sessions`-raden for `(groupId, serviceTimeId, today)` — økt-ID-er caches i prosessen per dato. Nye økter sender en `session.created`-webhook. Løkken er en ventet `for..of` — en tidligere fire-and-forget `forEach(async …)` kappløp med lagringen og skrev NULL sessionIds ved opprettelse av første økt (rettet; notert i en kodekommentar ved løkken).
3. **Erstatter dagens poster.** Eksisterende besøk for disse personene på den gudstjenesten i dag slettes sammen med visitSessions, deretter lagres det innsendte settet. Å sjekke inn en familie på nytt er derfor en idempotent «dette er gjeldende tilstand»-operasjon, ikke et tillegg. Sender man `?checkDuplicates=true` i stedet, returneres `{ duplicates: [personId…] }` uten skriving, og det er slik kiosken varsler før den overskriver.
4. **Genererer én sikkerhetskode per batch.** `SecurityCodeHelper.generate()` lager en 4-tegns kode fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, så koder ikke kan stave ord eller leses feil). Serveren prøver på nytt ved kollisjon mot samme kirkes åpne besøk samme dag, og stempler koden på hvert besøk i batchen.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` kobler personId til antall sammenhengende ukers oppmøte; kiosken feirer milepæler (hver 5. uke) med konfetti.

Hvert lagret besøk sender også en `attendance.recorded`-webhook. Lesesiden, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **sist registrerte dato** — hvis den var en tidligere uke, fjernes ID-ene, og klienten får en forhåndsutfylt kopi av forrige ukes romvalg som lagres som nye poster.

### Utsjekking

To endepunkter fullfører løkken (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens ikke-utsjekkede besøk med den sikkerhetskoden, med økter fylt ut.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; stempler `checkoutTime` og hvem som hentet, og sender en `attendance.checkout`-webhook per besøk.

Tillatelser: kiosker autentiserer med `attendance.checkin`, som gir nøyaktig innsjekkings-/utsjekkings-/etikettmal-flaten; `attendance.view`/`attendance.edit` dekker rapportering og manuell registrering; strukturen (tjenester, gudstjenestetider, gruppetilordninger) krever `services.edit`. Medlems selvinnsjekking (B1App) trenger ingen tillatelse i det hele tatt: enhver autentisert bruker med en koblet person i kirken kan kalle `GET`/`POST /attendance/visits/checkin`, og serveren begrenser de innsendte `personId`-ene til innringerens egen husstand (403 ellers — denne avgrensningen er det som gjør at andre familiers `securityCode`-er ikke kan leses). Medlemskap er tilgangen; om medlemmer *ser* funksjonen styres av kirkens navigasjonsfaner i B1App. De andre innsjekkingsendepunktene (`code/:code`, `checkout`, `guardians`, `CheckinController`) forblir kun for kiosk/ansatte.

## Grupper styrer romtildelingen

Det finnes ingen rom- eller klasserom-enhet noe sted i systemet. Et «rom» er en medlemsgruppe med `trackAttendance` aktivert, koblet til en eller flere gudstjenestetider via `groupServiceTimes`. Gruppefeltene (i `Api/src/modules/membership/models/Group.ts`) som former kioskens oppførsel:

| Felt | Effekt |
|------|--------|
| `trackAttendance` | Gruppen deltar i oppmøte i det hele tatt; B1Admins oppsetttre markerer `trackAttendance`-grupper uten `groupServiceTimes`-rad som ikke tildelt |
| `parentPickup` | Markerer et barnerom: innsjekking der gjør besøket til et «barn»-besøk, som skriver ut en familiehentelapp og setter sikkerhetskoden på navnelappen |
| `printNametag` | Om innsjekkinger til denne gruppen skriver ut en navnelapp i det hele tatt |
| `capacity` / `guestCapacity` / `checkinClosed` | Romkapasitetsgrenser og en hard «stengt»-bryter, håndhevet på serveren av innsjekkingskontrollen (redigeres i B1Admins gruppeinnstillinger under «Innsjekkingskapasitet») |
| `volunteerRatio` / `minVolunteers` | Barn-per-frivillig-forhold og minimum antall frivillige, håndhevet etter kirkens `ratioEnforcement`-innstilling |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alders-/klassetrinnskvalifisering evaluert på kiosken for å markere eller dempe rom |

Alle klienter denormaliserer på samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): last `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` og `GET /membership/groups` parallelt, og samle deretter for hver gudstjenestetid gruppene hvis `groupServiceTimes`-rad peker til den inn i `serviceTime.groups`. Den matrisen er det romvelgeren viser, organisert etter gruppens `categoryName`.

Tildelinger redigeres fra gruppesiden i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), og hele treet kampus → tjeneste → gudstjenestetid → gruppe visualiseres i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er den eneste sannhetskilden, driver det samme gruppemedlemskapet kioskens ruting, oppmøte i klasselisteform på B1Admins gruppesider, og oppmøterapportering — å tildele en gruppe til en gudstjenestetid er det eneste trinnet som trengs for å gjøre den til et innsjekkingsmål.
:::

## Barnesikkerhet

### Innsjekkingstyper

Hvert besøk bærer en `checkinType` — `member`, `guest` eller `volunteer` (NULL betyr eldre/medlem; migrering `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **på kiosken**: Medlem / Gjest / Frivillig-brikker på den utvidede medlemsraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), og stemples på hvert ventende besøk ved fullføring (`app/checkinComplete.tsx`, som standard `member`). Serveren bruker den i kontrollen — frivillige teller mot bemanningsdekningen i stedet for mot kapasitet, og gjester teller mot `guestCapacity`.

### Kapasitets- og bemanningsforholdskontroller

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjører inne i `postCheckin` før noen lagring (endepunktet er ikke-transaksjonelt, så kontroll før lagring er korrekthetsmekanismen). Den laster gjeldende belegg per målrettet gruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigurasjonen gjennom membership-modulens gateway, og klassifiserer deretter overtredelser:

- **Hard (blokkerer alltid):** `checkinClosed`, `current + incoming > capacity`, gjenstall over `guestCapacity`. Batchen avvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosken viser det navngitte rommet.
- **Forhold (advarsel eller blokkering):** innkommende ikke-frivillige i et rom der `volunteers < minVolunteers`, ingen frivillige i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighetsgraden følger kirkens innstilling `ratioEnforcement` (`"warn"` som standard / `"block"`, redigeres i B1Admin Administrer kirke → Innsjekking, `CheckinSettingsEdit.tsx`). Advarselsmodus returnerer `409 { warning: true, error: "ratio", … }` med mindre klienten sender inn på nytt med `acknowledgeWarnings=true` — den innsendingen er kioskens overstyring som bekreftes av ansatte.

### Planlagte innsjekkingsvinduer

En gudstjenestetid kan ha en valgfri ukeplan (`dayOfWeek` 0–6 der 0 = søndag, `startTime`/`endTime` som `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), redigert i B1Admins **Oppmøte → Oppsett**-skjema for gudstjenestetid (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, «Innsjekkingsplan»). `CheckinGateHelper.hasSchedule()` behandler en gudstjenestetid som planlagt bare når både `dayOfWeek` og `startTime` er satt; uplanlagte tider er aldri tidsstyrt. `isServiceTimeOpen()` beregner vinduet i lokal veggklokketid (`DateHelper.toChurchTime`). Sonen løses per gudstjenestetid av `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): `timezone` for tjenestens kampus (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) kommer først, deretter kirkens `timeZone` (satt i B1Admins kirkeinfo), deretter første ikke-fjernede kampus som har en `timezone` (`loadCampusTimeZone`), og først da `America/New_York`. Kampusen kommer først fordi de fleste kirker hadde `America/New_York` fylt inn som kirkens sone i bakgrunnen. Både oppslags- og innsendingsveiene nedenfor løser den på samme måte. Vinduet går fra `checkinOpenMinutes` før start til `checkinCloseMinutes` etter slutt (eller etter start når det ikke finnes slutt), og håndterer vinduer som krysser midnatt eller ukeskiftet.

Vinduet håndheves på to steder:

- **Oppslag:** `GET /attendance/servicetimes` stempler hver rad med en beregnet `checkinOpen`-boolsk. B1Apps selvinnsjekking (`CheckinPage.tsx`) og B1Checkins tjenestevelger (`app/services.tsx`) beholder alle tider. Når alle en tjenestes tider er stengt, viser de neste åpning («Innsjekking åpner søn 09:30» i B1App, «Innsjekking for denne gudstjenesten åpner søn 09:30» i B1Checkin, fra `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), og faller tilbake til «Innsjekking er ikke åpen for denne gudstjenesten akkurat nå.» når ingen åpning kan beregnes (kiosken tilbyr en Tilbake-knapp for å velge en annen gudstjeneste). Ellers vises stengte tider som en ikke-valgbar «Stengt» / «Stengt · åpner 09:30»-rad. B1Checkins husstandsskjerm (`MemberServiceTimes.tsx`) evaluerer åpenhet på nytt live på enhetens klokke med `ServiceTimeHelper.isCheckinOpen()` (enhetens tidssone, ikke kirkens), slik at en kiosk som står på åpner og stenger i rett tid, og viser «Barnerom 1 · Innsjekket» (gruppenavn) på en stengt tid personen allerede har.
- **Innsending:** inne i `evaluateGates()`, før kapasitets-/forholdsevalueringen, avviser `findClosedServiceTimeGroups()` batchen med `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` hvis en målrettet økts gudstjenestetid er utenfor vinduet. Fordi en husstands eksisterende besøk for i dag sendes på nytt med hver innsjekking, hopper økter personen allerede har (`personId|sessionId` i de eksisterende besøkene) over denne kontrollen, slik at det ikke avvises å legge til en senere åpen gudstjenestetid fordi et tidligere vindu er stengt. B1Checkin viser dette gjennom sin harde-kontroll-skjerm med årsaken «innsjekking er ikke åpen akkurat nå» (kapasitetsovertredelser står fortsatt «rommet er fullt eller stengt»).

### Alders-/klassetrinnskvalifisering (på kiosken)

Romkvalifisering er rådgivende UI, evaluert på kiosken, ikke håndhevet av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klassetrinn med gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (klassetrinnsrekkefølge: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` — manglende data gir `unknown` og skjuler aldri et rom. Alder og klassetrinn beregnes per kirkens **klassetrinnsopprykksdato** (`gradePromotionDate`-innstilling, `"MM-DD"`, redigert i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` velger den nyeste forekomsten på eller før i dag. Romvelgeren fremhever kvalifiserte rom og demper ukvalifiserte; å velge et dempet rom krever en bekreftelse fra ansatte.

### Betrodd og ikke-autorisert henting

Hentepersoner er en membership-entitet, per husstand: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (enhver autentisert kirkebruker, slik at kiosker kan lese det) pluss `POST` / `DELETE` avgrenset av `people.edit`. Ansatte administrerer listen på personsidens kort **Henting** (`B1Admin/src/people/components/PickupPeople.tsx`) — bilde, relasjon og en brikke for Betrodd/Ikke autorisert.

Ved utsjekking (`B1Checkin/app/checkout.tsx`) laster kiosken husstandens hentelliste: `trusted`-oppføringer vises som trykkbare hentekort ved siden av husstandens voksenbildegrid, og et fritt skrevet «Annet»-navn fuzzy-matches (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized`-oppføringer — en treff blokkerer utsjekking med et advarselsark og en **Overstyr**-knapp for ansatte. Overstyringen loggføres på selve besøket: den sender `checkedOutBy` som `"OVERRIDE: {name}"` gjennom det vanlige `POST /attendance/visits/checkout`, så den havner i oppmøteposten og `attendance.checkout`-webhooken i stedet for en egen revisjonstabell.

### Varsling av foresatte og nødkringkasting

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) eksponerer to SMS-endepunkter:

- `POST /page` — `{ visitId, message }`: varsler foresatte til ett innsjekket barn (kiosken utsjekkingsskjerm, bemannet modus).
- `POST /broadcast` — `{ serviceId, message }`: sender tekst til alle voksne i hver innsjekket husstand for en gudstjeneste (kioskens administratorinnstillinger, bak et ark som krever at du skriver `EMERGENCY` for å bekrefte, i `B1Checkin/app/adminSettings.tsx`).

Begge løser husstandens voksne gjennom membership-gatewayen, og overlater deretter levering til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — den modulovergripende døren til kirkens konfigurerte tekstmeldingstjeneste (`@churchapps/texting`: TextInChurch, Clearstream eller MutualMinistry; det finnes ingen innebygd SMS-sender). Gatewayen logger en `sentText`-rad pluss `deliveryLog`-oppføringer per mottaker og begrenser en batch til 500 mottakere; uten konfigurert tjeneste returnerer den `no_provider`, som kiosken viser som «Ingen SMS-tjeneste konfigurert». `dispatch()` i kontrolleren fjerner duplikate telefonnumre og hopper over personer uten mobil eller med `optedOut` satt, og returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }` slik at kiosken kan vise hva som ble hoppet over.

## Kiosken (B1Checkin)

Skjermene er expo-router-filer under `B1Checkin/app/`; tilstand på tvers av skjermer ligger i en statisk `CachedData`-klasse (`src/helpers/CachedData.ts`), ikke i React-tilstand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Oppslag** (`app/lookup.tsx`) — søk etter telefon (`GET /membership/people/search/phone?number=`, siste 4 eller full) eller etter navn (`GET /membership/people/search?term=`). Å velge et treff laster husstanden (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), og fyller `pendingVisits` med forrige ukes valg.
2. **Husstandsgjennomgang** (`app/household.tsx`, `src/components/MemberList.tsx`) — hver medlemsrad viser en brikke for allerede innsjekket, en allergi-/`nametagNotes`-brikke og gjeldende romchips. Å utvide et medlem lister hver gudstjenestetid med en romknapp pluss brikkene Medlem / Gjest / Frivillig for innsjekkingstype (`MemberServiceTimes.tsx`). Under hvert gudstjenestetidsnavn viser `ServiceTimeHelper.getGroupSummary()` gruppene som tilbys der (navnene i `serviceTime.groups`, trimmet, duplikater fjernet uavhengig av store/små bokstaver, kommaseparert); ingenting vises når tiden ikke har grupper.
3. **Gruppetildeling** (`app/selectGroup.tsx`) — et kategoritre bygget fra `serviceTime.groups`, med alders-/klassetrinnskvalifiserte rom uthevet og ukvalifiserte dempet bak en bekreftelse fra ansatte (se [Alders-/klassetrinnskvalifisering](#agegrade-eligibility-kiosk-side)); å velge et rom skriver en `{ session: { serviceTimeId, groupId } }`-visitSession inn i den personens ventende besøk (`src/helpers/VisitSessionHelper.ts`). «Ingen» fjerner den.
4. **Fullfør** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` med `pendingVisits` (hver stemplet med sin `checkinType`), skriver deretter ut etiketter hvis en skriver er konfigurert, og returnerer automatisk til lookup. Et `409`-svar for kapasitet eller `notOpen` viser det navngitte rommet med årsaken (fullt/stengt, eller innsjekking ikke åpen); en forholdsadvarsel tilbyr en bekreftelse fra ansatte som sender inn på nytt med `acknowledgeWarnings=true`.

**Utsjekkingsskjermen** (`app/checkout.tsx`) godtar den 4-tegns sikkerhetskoden gjennom et automatisk fokusert felt — slik at USB-/Bluetooth-strekkodeskannere som emulerer tastatur fungerer uten kamera — eller et tastatur på skjermen som bruker samme alfabet, og sender automatisk ved 4 tegn. En knapp **Skann** åpner et ark med det delte kameraet `src/components/CodeScanner.tsx` (bakovervendt som standard, og godtar QR, Code 128 og Code 39), slik at stasjoner uten strekkodeskanner kan lese henteetiketten; en skannet kode mater samme `handleCode()`-vei som skrevet inndata. Den slår opp koden, viser barna som hentes, og presenterer husstandens **betrodde hentepersoner** som trykkbare kort ved siden av et fotografigrid av husstandens voksne (pluss et «Annet»-alternativ for fritekst som fuzzy-sjekkes mot ikke-autoriserte navn — se [Betrodd og ikke-autorisert henting](#trusted-and-not-authorized-pickup)), og sender deretter `POST /attendance/visits/checkout` med velgerens navn/ID. I bemannet modus tilbyr skjermen også **Varsle en forelder** (`POST /attendance/checkin/page`) og en **ny utskrift av sikkerhetsetiketten** — `reprint()` bygger familiens etiketter på nytt med `LabelHelper.getAllLabelsFor(...)` og mater dem gjennom samme `PrintUI`-rørledning som innsjekking.

Stasjonens personlighet er et AsyncStorage-flagg `@StationMode` (`"self"` | `"manned"`, byttes i `app/adminSettings.tsx`). Bemannet modus legger til utsjekkingsinngangen på oppslagsskjermen og redigering av personprofiler per medlem (`POST /membership/people`) fra husstandsskjermen. Kioskherdingen er innebygd: en valgfri PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) låser administrator- og skriverskjermene, administratorskjermen åpnes kun ved 7 raske trykk på toppteksts-logoen, og en inaktiv hvileskjerm (`src/hooks/useInactivityTimer.ts`) tar over mellom familiene.

## Selvinnsjekking (B1App)

Medlemmer sjekker inn fra b1.church-portalen på skjermen `/mobile/checkin` (rutet av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Den krever en innlogget bruker og går gjennom de samme fire stegene som kiosken — tjenester → husstand → grupper → fullfør — mot de identiske endepunktene, med tilstand i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kiosken: husstanden kommer fra den innloggede brukerens egen `householdId` (ingen søkesteg), og det finnes ingen utskrift av etiketter — i stedet viser fullføringsskjermen batchens sikkerhetskode som en QR (`qrcode.react`) med hintet «vis dette på en innsjekkingsstasjon». Hvis husstanden allerede er innsjekket når siden lastes, viser en knapp **Vis innsjekkingskode** QR-koden på nytt fra det første eksisterende besøket (fra `GET /attendance/visits/checkin`) som har en `securityCode`. Innsjekkingen registreres umiddelbart ved innsending (det finnes ingen ventende tilstand); QR-koden styrer bare utskrift av etiketter på kiosken.

**Utskrift av etiketter fra telefon til kiosk** (`B1Checkin/app/scan.tsx`, nådd fra knappen «Skann kode» for QR på oppslagsskjermen): kiosken viser `CodeScanner` (en `expo-camera` `CameraView`, som standard vendt mot forsiden og kan snus) og skanner etter QR-koder. `ScanCodeHelper.parse()` godtar en nyttelast bare når den er en ren 4-tegns kode i sikkerhetskodealfabetet, og `ScanCodeHelper.isRepeat()` ignorerer samme kode i 4 sekunder, slik at både B1App-QR-en og QR-blokken på en utskrevet etikett fungerer. Skjermen følger deretter utsjekkings-utskriftsveien — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — og returnerer til oppslag. Ingen oppmøteskriving skjer ved skanning; kun etiketter. Koder uten aktive besøk, stasjoner uten skriver og grupper uten etiketter viser hver sin toast og returnerer til oppslag.

Typer og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React-komponenter deles med B1Admin.

## Oppmøte på administratorsiden (B1Admin)

- **Oppsett** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) viser strukturtreet og oppretter tjenester (`ServiceEdit.tsx`) og gudstjenestetider (`ServiceTimeEdit.tsx`). Kampusdata kommer fra membership via `useCampuses()`-hooken.
- **Manuelt oppmøte** ligger på gruppesiden, ikke i oppmøteseksjonen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter økter (`POST /attendance/sessions`; når man legger til, kan `SessionEdit.tsx` inkludere én økt per annen gruppe som deler den valgte gudstjenestetiden, og hopper over grupper som allerede har en økt på den datoen) og markerer personer som tilstede via `POST /attendance/visitsessions/log`, som finner eller oppretter besøket for den personen og økten. Gruppeledere kan registrere oppmøte for sine egne grupper uten tillatelsen `attendance.edit` — kontrollerne sjekker `au.leaderGroupIds`.
- **Rapportering** — oppmøtetrend og gruppeoppmøte er serverdefinerte rapporter (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi; definisjoner i `Api/reports/*.json`). Begge tar `startDate`/`endDate` (sluttdato inkludert); trendrapporten har som standard ett år siden til i dag og legger til en per-uke-kolonne `sessionDates`, og gruppeoppmøtets trevisning på skjermen inkluderer hvert besøks `checkinTime` og personens `membershipStatus`. CSV-filen for gruppeoppmøte kommer fra den tilhørende rapporten `groupAttendanceDownload`, pivotert av `GroupAttendanceDownloadHelper` til én rad per gruppemedlem med en tilstede/fraværende-kolonne per datert økt; oppmøtehistorikk per person er `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Utskrift av etiketter

### Maler og designeren

Kirker designer sine egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nådd fra innsjekkingssiden i innstillingene). En mal er en `labelTemplates`-rad der `content` er en JSON-array med blokker — `text`, `field`, `barcode`, `qrcode` eller `box` — hver plassert i prosentkoordinater med skrift, justering, symbologi (`code39`/`code128`/`qr`) og valgfrie synlighetsbetingelser (f.eks. vis allergiboksen bare når `person.nametagNotes` ikke er tom). Det finnes to `labelType`-er: `nametag` (én per innsjekket person; felt som `person.displayName`, `sessions`, `securityCode` og `person.isBirthdayWeek` — `"true"` når bursdagens måned/dag er innen 3 dager fra i dag, med ombrytning ved årsskiftet, beregnet av `LabelHelper.isBirthdayWithin()`) og `pickup` (én per familie; felt som `children`, `childrenAllergies`). Serveren håndhever én standard per type per kirke (`LabelTemplateController.save`). Designeren leveres med startmaler som speiler kioskens innebygde etiketter, og forhåndsviser mot eksempeldata.

### Rendering og utskrift på kiosken

Når innsjekkingen fullføres, avgjør `B1Checkin/src/helpers/LabelHelper.ts` hva som skal skrives ut ut fra gruppeflaggene på hvert ventende besøk: navnelapper for `printNametag`-grupper, pluss én familiehentelapp hvis et besøk traff en `parentPickup`-gruppe. Besøk med `checkinType` `volunteer` hoppes over av `LabelHelper.selectChildVisits()`, slik at en barnepasser i et hentrom aldri utløser en hentelapp. Sikkerhetskoden fra innsjekkingssvaret settes på barnas navnelapper og hentelappen; voksnes navnelapper skrives ut uten kode. Hvis kirken har maler, gjør `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blokker + en feltkontekst til et frittstående HTML-dokument; ellers brukes innebygde HTML-etiketter i `B1Checkin/assets/labels/` med plassholdererstatning.

Strekkoder genereres som innebygd SVG av rene TypeScript-kodere i `B1Checkin/src/helpers/barcode.ts` — Code 39-mønstertabeller og Code 128 (kodesett B med mod-103-sjekksum) bredde-tabeller, pluss QR via pakken `qrcode`. **Disse koderne er bevisst duplisert i B1Admin** (`LabelEditor.tsx` inliner de samme tabellene, notert i en kodekommentar) slik at designerens forhåndsvisninger er piksel-trofaste mot kioskens utskrift; en endring i den ene må speiles i den andre.

Utskriftsrørledningen (`src/components/PrintUI.tsx`) rendrer hver HTML-etikett i en `WebView`, fanger den til JPG via `react-native-view-shot`, og gir bilde-URI-ene til den native Expo-modulen **printer-helper** (`B1Checkin/modules/printer-helper/`). Modulen eksponerer `scan()`, `checkInit()`, `printUris()` og statushendelser, med en leverandør per merke på begge plattformer:

| Merke | Android | iOS | Merknader |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serie nettverksskrivere (QL-800/810W/820NWB/1100/1110NWB…), stansede 29×90 mm-etiketter, anbefalt standard |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverksoppdagelse + TCP/ZPL-bildeutskrift |

Skriverforvalget ligger i `app/printers.tsx` (nettverksskanning returnerer `brand~model~ip`-oppføringer; valget lagres i AsyncStorage), og `src/helpers/PrinterLog.ts` holder en diagnostisk logg på enheten som vises gjennom en live statusprikk i kioskens topptekst.

## Gjesteregistrering

To veier oppretter en person midt i innsjekkingen:

- **På kiosken** — «Legg til gjest» på husstandsskjermen åpner `B1Checkin/app/addGuest.tsx`, som først søker i `GET /membership/people/search?term=` etter et eksisterende ikke-medlemstreff og ellers oppretter en med `POST /membership/people`, knyttet til den nåværende husstanden. Gjesten flyter deretter gjennom gruppetildelingen som alle andre medlemmer.
- **Selvbetjent via QR** — når kirkeinnstillingen `enableQRGuestRegistration` er på (konfigurert i B1Admins innsjekkingsinnstillinger, lest fra `GET /membership/settings/public/{churchId}`), viser kioskens oppslagsskjerm en QR-kode som lenker til `https://{subdomain}.b1.church/guest-register?serviceId=`. Den B1App-siden (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en besøkende familie registrere seg selv på sin egen telefon gjennom det anonyme endepunktet `POST /membership/people/guest-register`, slik at kiosk-køen går raskt. QR-arket har også en knapp **Registrer her** som åpner den samme siden på kiosken (`app/guestRegister.tsx`) i en inkognito-`WebView` uten cache; `src/helpers/GuestRegisterHelper.ts` bygger URL-en for både QR-en og WebView-en, og blokkerer navigasjon bort fra `https://{subdomain}.b1.church/guest-register`. Skjermen går tilbake til oppslag ved **Ferdig**, tilbake, eller 120 sekunder uten aktivitet (skriving i skjemaet videresendes fra WebView som aktivitet), og fjerner WebView-en slik at den ene familiens oppføringer aldri når den neste.

QR-påmeldingen styres av kirkeinnstillinger lagret fra kortet **QR-gjesteregistrering** i B1Admin (`src/mobile/CheckInPage.tsx`):

| Innstilling | Synlighet | Formål |
|---|---|---|
| `enableQRGuestRegistration` | offentlig | Opt-in-bryter for kiosk-QR-en og de anonyme endepunktene |
| `guestRegistrationFields` | offentlig | JSON-kart over `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standard: e-post og telefon valgfrie, resten av. Fornavn/etternavn er alltid påkrevd |
| `guestRegistrationImage` | offentlig | URL til toppbilde; B1App viser det 16:9 i stedet for ikonet på skjemaet og bekreftelsesskjermen |
| `guestRegistrationGroupId` | privat | Gruppen hver påmelding legges til i (gjester ser eller velger den aldri) |
| `guestRegistrationRecordAttendance` | privat | `"true"` for også å registrere oppmøte for den gruppen |

`src/components/checkin/GuestRegister.tsx` i B1App henter sjekklisten fra det anonyme `GET /membership/people/guest-register/options?churchId=` og viser bare de inkluderte feltene (e-post, telefon, sivilstatus og adresse på hovedkontakten; fødselsdato, kjønn og klassetrinn per medlem; én kommentarboks), og sender bare dem. Serveren bruker sjekklisten på nytt i `GuestRegistrationHelper.sanitize()` — av-felter fjernes, manglende påkrevde eller verdier utenfor listen gir 400 — før `PersonHelper.registerGuestHousehold()` kjører. Den kaller først `PersonRepo.findGuestMatch()` for hvert medlem med e-post eller telefon: nøyaktig én levende person med samme fornavn og samme e-post eller telefonsiffer gjenbrukes (null eller flere treff oppretter en ny person, så den gjetter aldri). Et medlem uten kontaktopplysninger samsvarer med fornavn innenfor den samsvarende husstanden. Gjenbrukte personer redigeres aldri, slik at et anonymt skjema ikke kan overskrive lagrede opplysninger, og svaret gjentar de innsendte navnene. Ikke-samsvarende medlemmer blir med i den samsvarende husstanden eller en ny, som `membershipStatus: "Visitor"`, og sender `person.created` for hver nye person. Deretter logges feil i stedet for å returneres: medlemmene legges til i den konfigurerte gruppen (`group.member.added`); er oppmøteregistrering på, markerer `AttendanceModuleGateway.recordAttendance()` hvert medlem som tilstede for hver av gruppens gudstjenestetider som har en plan og hvis innsjekkingsvindu (`CheckinGateHelper.isServiceTimeOpen`) er åpent akkurat nå, og oppretter økten for dagens kirkelokale dato om nødvendig — uplanlagte gudstjenestetider og påmeldinger utenfor vinduet registrerer ingenting; og kommentarer blir en skjult personnotat-samtale på hovedkontakten (meldingsforfatter «Gjestepåmelding»), koblet gjennom `person.conversationId`.

## Relaterte sider

- [Attendance-endepunkter](../api/endpoints/attendance) — fullstendig REST-flate for kampuser, tjenester, økter, besøk og besøksøkter
- [Membership-endepunkter](../api/endpoints/membership) — personer, husstander og grupper
- [Webhooks](../api/webhooks) — hendelsene `session.created`, `attendance.recorded` og `attendance.checkout`
- [Modulstruktur](../api/module-structure) — hvordan attendance-modulen er organisert på serversiden
