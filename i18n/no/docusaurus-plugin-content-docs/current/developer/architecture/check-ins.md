---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

Innsjekking er ett system med tre innganger: B1Checkin-kioskappen for bemannede og selvbetjente stasjoner, selvinnsjekking inne i B1App-medlemsportalen, og oppmøte på administrasjonssiden i B1Admin. Alle tre skriver til samme oppmøtemodul i kjerne-Api-et, og romtildelingen i klasserommene styres helt av grupper – det finnes ingen egen enhet for «lokasjoner» eller «rom». Oppå dette ligger et sikkerhetslag for barn: innsjekkingstyper per besøk, kapasitets- og frivillig-ratiosjekker på serversiden, alders- og klassetrinnskontroll i kiosken, verifisering av pålitelig henting ved utsjekking, og foreldrevarsling via menighetens SMS-leverandør. Denne siden kartlegger datamodellen, innsjekkingsflytene, sikkerhetslaget og utskriftsløpet for etiketter.

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

| Flate | Repo | Stack | Rolle |
|-------|------|-------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router filbasert ruting; EAS-bygg for Android, Amazon Fire og iOS; OTA-oppdateringer via `expo-updates` | Bemannet eller selvbetjent stasjon med utskrift av etiketter og verifisert utsjekking |
| Selvinnsjekking | `B1App` | Next.js (b1.church-medlemsportalen) | Innloggede medlemmer sjekker inn husstanden sin fra en telefon; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tildeler grupper til gudstjenestetider, designer etiketter, registrerer manuelt oppmøte, kjører rapporter |

Alle tre kaller de samme to API-modulene gjennom `ApiHelper`: **MembershipApi** (`/membership`) for personer, husstander og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`)

| Enhet / tabell | Nøkkelfelt | Betydning |
|----------------|-----------|-----------|
| `campuses` | name, address | Foreldet her — campuser forvaltes i membership-modulen (`/membership/campuses`); kopien i attendance er frosset som skrivebeskyttet for eldre lesere (`models/Campus.ts`) |
| `services` | campusId, name | En gjentakende samling, f.eks. «Sunday Morning» (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Et tidspunkt innenfor en tjeneste, f.eks. «9:00 AM» (`models/ServiceTime.ts`). Tidsplankolonnene er valgfrie (migrering `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) og styrer [innsjekkingsvinduet](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Koblingstabell: hvilke grupper (klasserom) som møtes på hvilke gudstjenestetider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte for én gruppe på én dato — opprettes lazily ved innsjekking (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Én person som deltar på én dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = eldre medlem), settes av kiosken og brukes av kapasitets- og ratiosjekkene |
| `visitSessions` | visitId, sessionId | Hvilken(e) økt(er) et besøk dekker — et barn som sjekkes inn til to gudstjenestetider, får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designbare etikettoppsett (`models/LabelTemplate.ts`) |

### Slik lagres en fullført innsjekking

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Kroppen er en liste med `Visit`-objekter, der hvert har `visitSessions` hvis innebygde `session` kun angir et `(serviceTimeId, groupId)`-par. Serveren gjør deretter følgende:

1. **Sjekker kapasitet og ratioer før noe skrives.** `evaluateGates()` → `CheckinGateHelper.evaluate()` kontrollerer hvert målrettet rom mot kapasitet, gjestekapasitet, stengt-flagg og frivillig-ratio sammenlignet med nåværende belegg. postCheckin er **ikke transaksjonell**, så kontrollen må kjøre før første lagring — et hardt brudd gir en 409 som nevner det/de berørte rommet/rommene, og ingenting lagres. Se [Kapasitets- og frivillig-ratiosjekker](#capacity-and-volunteer-ratio-gates).
2. **Løser økter lazily.** `getSessionId()` finner eller oppretter raden i `sessions` for `(groupId, serviceTimeId, today)` — økt-ID-er caches i prosessen per dato. Nye økter sender en `session.created`-webhook. Løkken er en ventet `for..of` — en tidligere fire-and-forget `forEach(async …)` kappløp med lagringen og skrev NULL som sessionId ved opprettelse av første økt (rettet; notert i en kodekommentar ved løkken).
3. **Erstatter dagens poster.** Eksisterende besøk for disse personene på denne tjenesten i dag slettes sammen med deres visitSessions, og deretter lagres det innsendte settet. Å sjekke inn en familie på nytt er derfor en idempotent operasjon «dette er gjeldende tilstand», ikke et tillegg. Med `?checkDuplicates=true` returneres i stedet `{ duplicates: [personId…] }` uten at det skrives noe; det er slik kiosken varsler før en overskriving.
4. **Genererer én sikkerhetskode per batch.** `SecurityCodeHelper.generate()` lager en 4-tegns kode fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, så kodene ikke kan danne ord eller leses feil). Serveren prøver på nytt ved kollisjon mot menighetens åpne besøk samme dag, og setter koden på hvert besøk i batchen.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` kobler personId til antall sammenhengende uker med oppmøte; kiosken feirer milepæler (hver 5. uke) med konfetti.

Hvert lagret besøk sender også en `attendance.recorded`-webhook. Lesesiden, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **sist registrerte dato** — hvis det var en tidligere uke, fjernes ID-ene, og klienten får en forhåndsutfylt kopi av forrige ukes romvalg som lagres som nye poster.

### Utsjekking

To endepunkter fullfører kretsen (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens ikke-utsjekkede besøk med den sikkerhetskoden, med økter fylt inn.
- `POST /attendance/visits/checkout` — kropp `{ visitIds, checkedOutBy?, checkedOutById? }`; setter `checkoutTime` og hvem som hentet, og sender en `attendance.checkout`-webhook per besøk.

Tillatelser: kiosker autentiserer med `attendance.checkin`, som gir nøyaktig innsjekkings-, utsjekkings- og etikettmalflaten; `attendance.view`/`attendance.edit` dekker rapportering og manuell registrering; strukturen (tjenester, gudstjenestetider, gruppetildelinger) krever `services.edit`. Selvinnsjekking for medlemmer (B1App) krever ingen tillatelse i det hele tatt: enhver autentisert bruker med en koblet person i menigheten kan kalle `GET`/`POST /attendance/visits/checkin`, og serveren begrenser de innsendte `personId`-ene til innringerens egen husstand (403 ellers — denne skranken er det som gjør at andre familiers `securityCode`-er ikke kan leses). Medlemskap er tilgangen; om medlemmer *ser* funksjonen styres av menighetens faner i B1App-navigasjonen. De øvrige innsjekkingsendepunktene (`code/:code`, `checkout`, `guardians`, `CheckinController`) er fortsatt kun for kiosk og ansatte.

## Grupper styrer romtildelingen

Det finnes ingen rom- eller klasseromsenhet noe sted i systemet. Et «rom» er en membership-**gruppe** med `trackAttendance` aktivert, koblet til en eller flere gudstjenestetider gjennom `groupServiceTimes`. Gruppefeltene (i `Api/src/modules/membership/models/Group.ts`) som former kioskens oppførsel:

| Felt | Effekt |
|------|--------|
| `trackAttendance` | Gruppen deltar i oppmøte i det hele tatt; B1Admins oppsettstre markerer `trackAttendance`-grupper uten en `groupServiceTimes`-rad som ikke tildelt |
| `parentPickup` | Markerer et barnerom: innsjekking til det gjør besøket til et «barn»-besøk, som skriver ut en familiehentingsetikett og setter sikkerhetskoden på navneskiltet |
| `printNametag` | Om innsjekkinger til denne gruppen i det hele tatt skriver ut et navneskilt |
| `capacity` / `guestCapacity` / `checkinClosed` | Romkapasitetsgrenser og en hard «stengt»-bryter, håndhevet på serveren av innsjekkingskontrollen (redigeres i B1Admins gruppeinnstillinger under «Check-In Capacity») |
| `volunteerRatio` / `minVolunteers` | Ratio barn per frivillig og minimum antall frivillige, håndhevet i henhold til den menighetsdekkende innstillingen `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Grenser for alder og klassetrinn, vurdert i kiosken for å fremheve eller nedtone rom |

Alle klienter denormaliserer på samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): last inn `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` og `GET /membership/groups` parallelt, og for hver gudstjenestetid samle de gruppene hvis `groupServiceTimes`-rad peker til den i `serviceTime.groups`. Denne listen er det romvelgeren viser, ordnet etter gruppens `categoryName`.

Tildelinger redigeres fra gruppens side i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), og hele treet Campus → Service → Service Time → Group visualiseres i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Siden grupper er den eneste sannhetskilden, driver det samme gruppemedlemskapet kioskens ruting, oppmøtelister i stil med rulleliste på B1Admins gruppesider, og oppmøterapportering — å tildele en gruppe til en gudstjenestetid er det eneste steget som trengs for å gjøre den til et innsjekkingsmål.
:::

## Sikkerhet for barn

### Innsjekkingstyper

Hvert besøk har en `checkinType` — `member`, `guest` eller `volunteer` (NULL betyr eldre/medlem; migrering `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **i kiosken**: Member / Guest / Volunteer-brikker på den utvidede medlemsraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), og settes på hvert ventende besøk ved fullføring (`app/checkinComplete.tsx`, med standard `member`). Serveren bruker den i kontrollen — frivillige teller mot ratiodekning i stedet for mot kapasitet, og gjester teller mot `guestCapacity`.

### Kapasitets- og frivillig-ratiosjekker

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjøres inne i `postCheckin` før noe lagres (endepunktet er ikke transaksjonelt, så kontroll før lagring er korrekthetsmekanismen). Den laster nåværende belegg per målrettet gruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigurasjonen gjennom membership-modulens gateway, og klassifiserer deretter brudd:

- **Hardt (blokkerer alltid):** `checkinClosed`, `current + incoming > capacity`, gjestetall over `guestCapacity`. Batchen avvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosken viser det navngitte rommet.
- **Ratio (advarer eller blokkerer):** innkommende ikke-frivillige til et rom der `volunteers < minVolunteers`, ingen frivillige i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighetsgraden følger den menighetsspesifikke innstillingen `ratioEnforcement` (`"warn"` som standard / `"block"`, redigeres i B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). I advarselsmodus returneres `409 { warning: true, error: "ratio", … }` med mindre klienten sender inn på nytt med `acknowledgeWarnings=true` — den nye innsendingen er kioskens overstyring som bekreftes av ansatte.

### Planlagte innsjekkingsvinduer

En gudstjenestetid kan ha en valgfri ukentlig plan (`dayOfWeek` 0–6 der 0 = søndag, `startTime`/`endTime` som `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), redigert i B1Admins **Attendance → Setup**-skjema for gudstjenestetid (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, «Check-in Schedule»). `CheckinGateHelper.hasSchedule()` regner en gudstjenestetid som planlagt bare når både `dayOfWeek` og `startTime` er satt; ikke-planlagte tider styres aldri av tid. `isServiceTimeOpen()` beregner vinduet i lokal veggklokketid (`DateHelper.toChurchTime`). Sonen løses per gudstjenestetid av `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): `timezone` for tjenestens campus (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) kommer først, deretter menighetens `timeZone` (satt i B1Admins Church Information), deretter første ikke-fjernede campus som har en `timezone` (`loadCampusTimeZone`), og først deretter `America/New_York`. Campus kommer først fordi de fleste menigheter fikk `America/New_York` tilbakefylt som menighetssone. Både oppslags- og innsendingsstiene nedenfor løser sonen på samme måte. Vinduet går fra `checkinOpenMinutes` før starten til `checkinCloseMinutes` etter slutten (eller etter starten når det ikke finnes slutt), og håndterer vinduer som krysser midnatt eller ukeskiftet.

Vinduet håndheves to steder:

- **Oppslag:** `GET /attendance/servicetimes` setter et beregnet `checkinOpen`-boolsk felt på hver rad. Selvinnsjekkingen i B1App (`CheckinPage.tsx`) og tjenestevelgeren i B1Checkin (`app/services.tsx`) beholder alle tider. Når alle tidene for en tjeneste er stengt, viser de neste åpning («Check-in opens Sun 9:30 AM.» i B1App, «Check-in for this service opens Sun 9:30 AM.» i B1Checkin, fra `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), og faller tilbake til «Check-in isn't open for this service right now.» når ingen åpning kan beregnes (kiosken tilbyr en Tilbake-knapp for å velge en annen tjeneste). Ellers vises stengte tider som en ikke-valgbar rad med «Closed» / «Closed · opens 9:30 AM». B1Checkins husstandsskjerm (`MemberServiceTimes.tsx`) vurderer åpenhet på nytt live etter enhetens klokke med `ServiceTimeHelper.isCheckinOpen()` (enhetens tidssone, ikke menighetens), slik at en kiosk som står på i fortsettelsen åpner og stenger i rett tid, og viser «Kids Room 1 · Checked in» (gruppenavn) på en stengt tid personen allerede har.
- **Innsending:** inne i `evaluateGates()`, før kapasitets-/ratiovurderingen, avviser `findClosedServiceTimeGroups()` batchen med `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` hvis gudstjenestetiden til en målrettet økt er utenfor vinduet. Siden en husstands eksisterende besøk for i dag sendes på nytt med hver innsjekking, hopper økter personen allerede har (`personId|sessionId` i de eksisterende besøkene) over denne kontrollen, slik at det å legge til en senere åpen gudstjenestetid ikke avvises fordi et tidligere vindu er stengt. B1Checkin viser dette gjennom sin skjerm for harde stopp med begrunnelsen «check-in isn't open right now» (kapasitetsbrudd viser fortsatt «room is full or closed»).

### Alders- og klassetrinnskontroll (i kiosken)

Romkvalifisering er rådgivende UI, vurdert i kiosken, og ikke håndhevet av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klassetrinn med gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (rekkefølge for klassetrinn: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` — manglende data gir `unknown` og skjuler aldri et rom. Alder og klassetrinn beregnes per menighetens **dato for klassetrinnsopprykk** (innstillingen `gradePromotionDate`, `"MM-DD"`, redigert i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` velger den siste forekomsten på eller før i dag. Romvelgeren fremhever kvalifiserte rom og nedtoner ikke-kvalifiserte; å velge et nedtonet rom krever bekreftelse fra ansatte.

### Pålitelig og ikke-autorisert henting

Hentepersoner er en membership-enhet, per husstand: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (enhver autentisert menighetsbruker, slik at kiosker kan lese den), pluss `POST` / `DELETE` beskyttet med `people.edit`. Ansatte vedlikeholder listen på personsidens **Pickup**-kort (`B1Admin/src/people/components/PickupPeople.tsx`) — bilde, slektskap og en Trusted / Not Authorized-statusbrikke.

Ved utsjekking (`B1Checkin/app/checkout.tsx`) laster kiosken husstandens liste over hentepersoner: `trusted`-oppføringer vises som trykkbare hentekort ved siden av rutenettet med voksne i husstanden, og et fritt skrevet navn under «Other» sammenlignes upresist (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized`-oppføringer — et treff blokkerer utsjekking med et advarselsark og en ansatt-knapp for **Override**. Overstyringen logges på selve besøket: den sender `checkedOutBy` som `"OVERRIDE: {name}"` gjennom den vanlige `POST /attendance/visits/checkout`, så den havner i oppmøteposten og `attendance.checkout`-webhooken i stedet for i en egen revisjonstabell.

### Varsle foreldre og nødkringkasting

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) eksponerer to SMS-endepunkter:

- `POST /page` — `{ visitId, message }`: varsler foresatte til ett innsjekket barn (utsjekkingsskjermen i kiosken, bemannet modus).
- `POST /broadcast` — `{ serviceId, message }`: sender tekstmelding til de voksne i hver innsjekket husstand for en tjeneste (innstillingene for administrator i kiosken, bak et ark der man må skrive `EMERGENCY` for å bekrefte, i `B1Checkin/app/adminSettings.tsx`).

Begge løser de voksne i husstanden gjennom membership-gatewayen, og overlater deretter levering til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — den modulovergripende døren inn til menighetens konfigurerte SMS-leverandør (`@churchapps/texting`: TextInChurch, Clearstream eller MutualMinistry; det finnes ingen innebygd SMS-avsender). Gatewayen logger en `sentText`-rad pluss `deliveryLog`-oppføringer per mottaker, og begrenser en batch til 500 mottakere; uten konfigurert leverandør returnerer den `no_provider`, som kiosken viser som «No SMS provider configured». Kontrollerens `dispatch()` fjerner dupliserte telefonnumre og hopper over personer uten mobilnummer eller med `optedOut` satt, og returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }` slik at kiosken kan vise hva som ble hoppet over.

## Kiosken (B1Checkin)

Skjermene er expo-router-filer under `B1Checkin/app/`; tilstand som går på tvers av skjermer ligger i en statisk klasse `CachedData` (`src/helpers/CachedData.ts`), ikke i React-state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Oppslag** (`app/lookup.tsx`) — søk på telefonnummer (`GET /membership/people/search/phone?number=`, siste 4 eller hele) eller på navn (`GET /membership/people/search?term=`). Å velge en treff laster husstanden (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), og fyller `pendingVisits` med forrige ukes valg.
2. **Gjennomgang av husstand** (`app/household.tsx`, `src/components/MemberList.tsx`) — hver medlemsrad viser en brikke for allerede innsjekket, en brikke for allergi/`nametagNotes` og gjeldende romm-brikker. Å utvide et medlem viser hver gudstjenestetid med en romknapp, pluss brikkene Member / Guest / Volunteer for innsjekkingstype (`MemberServiceTimes.tsx`). Under hvert gudstjenestetidsnavn viser `ServiceTimeHelper.getGroupSummary()` gruppene som tilbys der (navnene fra `serviceTime.groups`, trimmet, duplikater fjernet uavhengig av store/små bokstaver, kommaseparert); ingenting vises når tiden ikke har grupper.
3. **Gruppetildeling** (`app/selectGroup.tsx`) — et kategoritre bygget fra `serviceTime.groups`, med rom som er kvalifisert etter alder/klassetrinn fremhevet og ikke-kvalifiserte nedtonet bak en bekreftelse fra ansatte (se [Alders- og klassetrinnskontroll](#agegrade-eligibility-kiosk-side)); å velge et rom skriver en `{ session: { serviceTimeId, groupId } }`-visitSession inn i den personens ventende besøk (`src/helpers/VisitSessionHelper.ts`). «None» fjerner det.
4. **Fullfør** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` med `pendingVisits` (hvert med sin `checkinType`), skriver deretter ut etiketter hvis en skriver er konfigurert, og går automatisk tilbake til oppslag. Et `409`-svar for kapasitet eller `notOpen` viser det navngitte rommet med årsaken (fullt/stengt, eller innsjekking ikke åpen); en ratioadvarsel tilbyr en bekreftelse fra ansatte som sender inn på nytt med `acknowledgeWarnings=true`.

**Utsjekkingsskjermen** (`app/checkout.tsx`) tar imot den 4-tegns sikkerhetskoden gjennom et automatisk fokusert felt — slik at USB-/Bluetooth-tastaturskannere fungerer uten kamera — eller et tastatur på skjermen som bruker samme alfabet og sender automatisk ved 4 tegn. En **Scan**-knapp åpner et ark med det delte kameraet `src/components/CodeScanner.tsx` (bakkamera som standard, og godtar QR, Code 128 og Code 39), slik at stasjoner uten tastaturskanner kan lese hentetiketten; en skannet kode går gjennom samme `handleCode()`-sti som tastet inn tekst. Skjermen slår opp koden, viser barna som hentes, og presenterer husstandens **pålitelige hentepersoner** som trykkbare kort ved siden av et rutenett med bilder av voksne i husstanden (pluss et fritt tekstalternativ «Other» som sammenlignes upresist mot navn som ikke er autorisert — se [Pålitelig og ikke-autorisert henting](#trusted-and-not-authorized-pickup)), og sender deretter `POST /attendance/visits/checkout` med navnet/ID-en til den som velges. I bemannet modus tilbyr skjermen også **Page a parent** (`POST /attendance/checkin/page`) og **utskrift av sikkerhetsetikett på nytt** — `reprint()` bygger familiens etiketter på nytt med `LabelHelper.getAllLabelsFor(...)` og sender dem gjennom samme `PrintUI`-løp som innsjekking.

Stasjonens oppførsel styres av et AsyncStorage-flagg `@StationMode` (`"self"` | `"manned"`, byttes i `app/adminSettings.tsx`). Bemannet modus legger til inngangen for utsjekking på oppslagsskjermen og redigering av den enkelte medlemsprofilen (`POST /membership/people`) fra husstandsskjermen. Herdingen av kiosken er innebygd: en valgfri PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) beskytter administrator- og skriverskjermene, administratorskjermen åpnes kun ved 7 raske trykk på logoen i toppteksten, og en inaktivitetsskjerm (`src/hooks/useInactivityTimer.ts`) tar over mellom familiene.

## Selvinnsjekking (B1App)

Medlemmer sjekker inn fra b1.church-portalen på skjermen `/mobile/checkin` (rutet av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Den krever en innlogget bruker og gjennomgår de samme fire stegene som kiosken — tjenester → husstand → grupper → fullfør — mot de identiske endepunktene, med tilstand i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kiosken: husstanden kommer fra den innloggede brukerens egen `householdId` (ikke noe søkesteg), og det finnes ingen utskrift av etiketter — i stedet viser fullføringsskjermen innsendingens sikkerhetskode som en QR (`qrcode.react`) med hintet «vis dette på en innsjekkingsstasjon». Hvis husstanden allerede er innsjekket når siden lastes, viser en knapp **Show check-in code** QR-koden på nytt fra det første eksisterende besøket (fra `GET /attendance/visits/checkin`) som har en `securityCode`. Innsjekkingen registreres umiddelbart ved innsending (det finnes ingen ventetilstand); QR-koden styrer bare utskrift av etiketter i kiosken.

**Utskrift av etiketter fra telefon til kiosk** (`B1Checkin/app/scan.tsx`, nås via knappen «Scan code» ved QR-koden på oppslagsskjermen): kiosken viser `CodeScanner` (en `CameraView` fra `expo-camera`, som standard vender mot forsiden og kan snus) og skanner etter QR-koder. `ScanCodeHelper.parse()` godtar bare en nyttelast som er en ren 4-tegns kode i sikkerhetskodealfabetet, og `ScanCodeHelper.isRepeat()` ignorerer samme kode i 4 sekunder, slik at både QR-koden fra B1App og QR-blokken på en utskrevet etikett fungerer. Skjermen følger deretter utskriftsløpet for utsjekking på nytt — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — og går tilbake til oppslag. Det skjer ingen oppmøteskriving på skanningstidspunktet; kun etiketter. Koder uten aktive besøk, stasjoner uten skriver og grupper uten etiketter viser hver sin toast og går tilbake til oppslag.

Typer og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React-komponenter deles med B1Admin.

## Oppmøte på administrasjonssiden (B1Admin)

- **Oppsett** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) viser strukturtreet og oppretter tjenester (`ServiceEdit.tsx`) og gudstjenestetider (`ServiceTimeEdit.tsx`). Campusdata kommer fra membership via hooken `useCampuses()`.
- **Manuelt oppmøte** ligger i gruppedelen, ikke i oppmøteseksjonen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter økter (`POST /attendance/sessions`; når man legger til, kan `SessionEdit.tsx` inkludere én økt per annen gruppe som deler den valgte gudstjenestetiden, og hoppe over grupper som allerede har en økt på den datoen), og markerer personer som tilstede via `POST /attendance/visitsessions/log`, som finner eller oppretter besøket for den personen og økten. Gruppeledere kan registrere oppmøte for sine egne grupper uten tillatelsen `attendance.edit` — kontrollerne sjekker `au.leaderGroupIds`.
- **Rapportering** — trend i oppmøte og gruppeoppmøte er rapporter definert på serversiden (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi; definisjonene ligger i `Api/reports/*.json`). Begge tar `startDate`/`endDate` (sluttdatoen inkludert); trendrapporten har som standard ett år tilbake til i dag og legger til en kolonne `sessionDates` per uke, og gruppeoppmøtets tre på skjermen inkluderer hvert besøks `checkinTime` og personens `membershipStatus`. CSV-filen for gruppeoppmøte kommer fra den tilhørende rapporten `groupAttendanceDownload`, som `GroupAttendanceDownloadHelper` pivoterer til én rad per gruppemedlem med en tilstede/fraværende-kolonne per datert økt; personlig historikk hentes med `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Utskrift av etiketter

### Maler og designeren

Menigheter designer sine egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nås fra innsjekkingens innstillingsside). En mal er en rad i `labelTemplates` der `content` er en JSON-liste med blokker — `text`, `field`, `barcode`, `qrcode` eller `box` — hver plassert i prosentkoordinater med skrift, justering, symbologi (`code39`/`code128`/`qr`) og valgfrie synlighetsbetingelser (f.eks. vis allergiboksen bare når `person.nametagNotes` ikke er tom). Det finnes to `labelType`-er: `nametag` (én per innsjekket person; med felt som `person.displayName`, `sessions`, `securityCode` og `person.isBirthdayWeek` — `"true"` når dagen og måneden i fødselsdagen er innenfor 3 dager fra i dag, med overgang over årsskiftet, beregnet av `LabelHelper.isBirthdayWithin()`) og `pickup` (én per familie; med felt som `children`, `childrenAllergies`). Serveren håndhever én standardmal per type per menighet (`LabelTemplateController.save`). Designeren leveres med startmaler som speiler kioskens innebygde etiketter, og forhåndsviser mot eksempeldata.

### Gjengivelse og utskrift i kiosken

Ved fullføring av innsjekking avgjør `B1Checkin/src/helpers/LabelHelper.ts` hva som skal skrives ut ut fra gruppeflaggene på hvert ventende besøk: navneskilt for `printNametag`-grupper, pluss én familiehentingsetikett hvis et besøk traff en `parentPickup`-gruppe. Besøk med `checkinType` `volunteer` hoppes over av `LabelHelper.selectChildVisits()`, så en barnepasser i et Parent Pickup-rom utløser aldri en hentingsetikett. Sikkerhetskoden fra innsjekkingssvaret settes på barnas navneskilt og hentingsetiketten; voksne navneskilt skrives ut uten kode. Hvis menigheten har maler, gjør `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blokkene og en feltkontekst om til et frittstående HTML-dokument; ellers brukes de innebygde HTML-etikettene i `B1Checkin/assets/labels/` med plassholdererstatning.

Strekkoder genereres som innebygd SVG av rene TypeScript-kodere i `B1Checkin/src/helpers/barcode.ts` — mønstertabeller for Code 39 og breddetabeller for Code 128 (kodesett B med mod-103-kontrollsum), pluss QR via pakken `qrcode`. **Disse koderne er bevisst duplisert i B1Admin** (`LabelEditor.tsx` inneholder de samme tabellene, notert i en kodekommentar) slik at forhåndsvisningene i designeren er pikselnøyaktige i forhold til kioskens utdata; en endring i den ene må speiles i den andre.

Utskriftsløpet (`src/components/PrintUI.tsx`) gjengir hver HTML-etikett i en `WebView`, fanger den som JPG med `react-native-view-shot`, og gir bilde-URI-ene videre til den native Expo-modulen **printer-helper** (`B1Checkin/modules/printer-helper/`). Modulen eksponerer `scan()`, `checkInit()`, `printUris()` og statushendelser, med en leverandør per merke på begge plattformer:

| Merke | Android | iOS | Merknader |
|-------|---------|-----|-----------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Nettverksskrivere i QL-serien (QL-800/810W/820NWB/1100/1110NWB…), stansede 29×90-etiketter, anbefalt standard |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverksoppdagelse + TCP/ZPL-bildeutskrift |

Valg av skriver ligger i `app/printers.tsx` (nettverksskanningen returnerer `brand~model~ip`-oppføringer; valget lagres i AsyncStorage), og `src/helpers/PrinterLog.ts` holder en diagnostikkslogg på enheten som vises gjennom en levende statusprikk i kioskens topptekst.

## Gjestregistrering

To veier oppretter en person midt i innsjekkingen:

- **I kiosken** — «Add guest» på husstandsskjermen åpner `B1Checkin/app/addGuest.tsx`, som først søker med `GET /membership/people/search?term=` etter et eksisterende treff som ikke er medlem, og ellers oppretter en ny med `POST /membership/people`, knyttet til gjeldende husstand. Gjesten går deretter gjennom gruppetildeling som alle andre medlemmer.
- **Selvbetjent via QR** — når menighetsinnstillingen `enableQRGuestRegistration` er på (konfigureres i B1Admins innstillinger for innsjekking, leses fra `GET /membership/settings/public/{churchId}`), viser oppslagsskjermen i kiosken en QR-kode som lenker til `https://{subdomain}.b1.church/guest-register?serviceId=`. Denne B1App-siden (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en besøkende familie registrere seg selv på sin egen telefon gjennom det anonyme endepunktet `POST /membership/people/guest-register`, slik at køen ved kiosken holder en god fart. QR-arket har også en knapp **Register here** som åpner den samme siden i kiosken (`app/guestRegister.tsx`) i en `WebView` uten sporing og uten cache; `src/helpers/GuestRegisterHelper.ts` bygger URL-en både for QR-koden og for `WebView`-en, og blokkerer navigering utenfor `https://{subdomain}.b1.church/guest-register`. Skjermen går tilbake til oppslag ved **Done**, ved tilbakeknappen, eller etter 120 sekunders inaktivitet (skriving i skjemaet videresendes fra `WebView` som aktivitet), og fjerner `WebView`-en slik at den ene familiens opplysninger aldri når den neste.

Registreringen via QR styres av menighetsinnstillinger som lagres fra kortet **QR Guest Registration** i B1Admin (`src/mobile/CheckInPage.tsx`):

| Innstilling | Synlighet | Formål |
|---|---|---|
| `enableQRGuestRegistration` | offentlig | Bryter for å slå på kiosk-QR-koden og de anonyme endepunktene |
| `guestRegistrationFields` | offentlig | JSON-kart over `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standard: e-post og telefon valgfrie, resten av. Fornavn og etternavn er alltid påkrevd |
| `guestRegistrationImage` | offentlig | URL til toppbilde; B1App viser det i 16:9 i stedet for ikonet på skjemaet og bekreftelsesskjermen |
| `guestRegistrationGroupId` | privat | Gruppen hver registrering legges til i (gjester ser eller velger den aldri) |
| `guestRegistrationRecordAttendance` | privat | `"true"` for også å registrere oppmøte for den gruppen |

B1Apps `src/components/checkin/GuestRegister.tsx` henter sjekklisten fra det anonyme endepunktet `GET /membership/people/guest-register/options?churchId=` og viser bare de inkluderte feltene (e-post, telefon, sivilstatus og adresse på hovedkontakten; fødselsdato, kjønn og klassetrinn per medlem; én kommentarboks), og sender bare disse. Serveren bruker sjekklisten på nytt i `GuestRegistrationHelper.sanitize()` — felt som er av fjernes, manglende påkrevde verdier eller verdier utenfor listen gir en 400 — før `PersonHelper.registerGuestHousehold()` oppretter en ny husstand (ingen deduplisering på e-post) der hvert medlem får `membershipStatus: "Visitor"`, og sender `person.created` for hver. Deretter logges feil i stedet for å returneres: medlemmene legges til den konfigurerte gruppen (`group.member.added`); hvis oppmøteregistrering er på, markerer `AttendanceModuleGateway.recordAttendance()` hvert medlem som tilstede for hver av gruppens gudstjenestetider som har en plan og hvis innsjekkingsvindu (`CheckinGateHelper.isServiceTimeOpen`) er åpent akkurat nå, og oppretter økten for menighetens lokale dato i dag ved behov — ikke-planlagte gudstjenestetider og registreringer utenfor vinduet registrerer ingenting; og kommentarer blir en skjult personnotatsamtale hos hovedpersonen i husstanden (meldingsforfatter «Guest sign-up»), koblet gjennom `person.conversationId`.

## Relaterte sider

- [Oppmøte-endepunkter](../api/endpoints/attendance) -- Hele REST-flaten for campuser, tjenester, økter, besøk og besøksøkter
- [Membership-endepunkter](../api/endpoints/membership) -- Personer, husstander og grupper
- [Webhooks](../api/webhooks) -- hendelsene `session.created`, `attendance.recorded` og `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Hvordan oppmøtemodulen er organisert på serversiden
