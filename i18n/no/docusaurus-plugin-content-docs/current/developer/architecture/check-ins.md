---
title: "Innsjekkinger"
---

# Innsjekkinger

<div class="article-intro">

Innsjekking er ett system med tre innganger: B1Checkin-kioskappen for bemannede og selvbetjente stasjoner, selvinnsjekking i B1App-medlemsportalen, og oppmøte på administratorsiden i B1Admin. Alle tre skriver til samme oppmøtemodul i kjerne-Api-et, og klasserombasert ruting styres helt av grupper -- det finnes ingen egen «lokasjons»- eller «rom»-entitet. Et barnesikkerhetslag ligger på toppen: innsjekkingstyper per besøk, kapasitets- og bemanningsforholdsporter på serversiden, alders- og klassetrinnskontroll på kiosken, verifisert henting ved utsjekking, og foreldrevarsling via kirkens SMS-leverandør. Denne siden beskriver datamodellen, innsjekkingsflytene, sikkerhetslaget og utskriftspipelinen for etiketter.

</div>

## Oversikt

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  oppslag → husstand →    │  │         │ Api                                          │
│  grupper → fullfør/skriv │  │  HTTPS  │  ┌─ membership-modul ──────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ personer · husstander · grupper         │ │
│ B1App (selvinnsjekking)  │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin-skjerm  │  │         │  ┌─ attendance-modul ──────────────────────┐ │
├──────────────────────────┤  │         │  │ kirkesteder → gudstjenester → tider     │ │
│ B1Admin (ansatte)        │──┘         │  │ groupServiceTimes  (romruting)          │ │
│  oppsett · rapporter ·   │            │  │ sessions ← visitSessions → visits       │ │
│  etikettdesigner         │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Utskriftsflyt for etiketter (kun kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (etikettmaler, eller innebygd HTML-reserve)
       └▶ LabelRenderer → HTML-dokument + innebygde SVG-strekkoder
            └▶ PrintUI: WebView-rendering → ViewShot JPG-opptak
                 └▶ printer-helper native modul → Brother QL / Zebra
```

| Flate | Repo | Stack | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router filruting; EAS-bygg for Android, Amazon Fire og iOS; OTA-oppdateringer via `expo-updates` | Bemannet eller selvbetjent stasjon med etikettutskrift og verifisert utsjekking |
| Selvinnsjekking | `B1App` | Next.js (b1.church medlemsportal) | Innloggede medlemmer sjekker inn husstanden sin fra en telefon; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tilordner grupper til gudstjenestetider, designer etiketter, registrerer manuelt oppmøte, kjører rapporter |

Alle tre kaller de samme to API-modulene gjennom `ApiHelper`: **MembershipApi** (`/membership`) for personer, husstander og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`)

| Entitet / tabell | Nøkkelfelt | Betydning |
|----------------|-----------|---------|
| `campuses` | name, address | Foreldet her — kirkesteder styres i membership-modulen (`/membership/campuses`); attendance-kopien er frosset som skrivebeskyttet for eldre lesere (`models/Campus.ts`) |
| `services` | campusId, name | En gjentakende samling, f.eks. «Søndag morgen» (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Et tidsrom innenfor en gudstjeneste, f.eks. «09.00» (`models/ServiceTime.ts`). Tidsplankolonnene er valgfrie (migrering `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) og styrer [innsjekkingsvinduet](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Koblingstabell: hvilke grupper (klasserom) som samles på hvilke gudstjenestetider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte for én gruppe på én dato — opprettes lazy ved innsjekking (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Én person som deltar på én dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = eldre medlem), satt av kiosken og brukt av kapasitets-/forholdsportene |
| `visitSessions` | visitId, sessionId | Hvilke økter et besøk dekker — et barn som sjekkes inn til to gudstjenestetider får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokker) | Designbare etikettoppsett (`models/LabelTemplate.ts`) |

### Slik lagres en fullført innsjekking

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Body er en matrise av `Visit`-objekter, der hvert har `visitSessions` med en innbygd `session` som kun angir et `(serviceTimeId, groupId)`-par. Serveren gjør deretter følgende:

1. **Kontrollerer kapasitet og forhold før noen skriving.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sjekker hvert berørt rom for kapasitet, gjestekapasitet, stengt-flagg og bemanningsforhold mot nåværende belegg. postCheckin er **ikke transaksjonell**, så porten må kjøre før den første lagringen — en hard overtredelse returnerer 409 med navnet på rommet(ene), og ingenting lagres. Se [Kapasitets- og bemanningsforholdsporter](#capacity-and-volunteer-ratio-gates).
2. **Løser økter lazy.** `getSessionId()` finner eller oppretter `sessions`-raden for `(groupId, serviceTimeId, i dag)` — økt-ID-er caches i prosessen per dato. Nye økter sender en `session.created`-webhook. Løkken er en ventende `for..of` — en tidligere fire-and-forget `forEach(async …)` kappløp med lagringen og skrev NULL sessionIds ved opprettelse av første økt (rettet; notert i en kodekommentar ved løkken).
3. **Erstatter dagens poster.** Eksisterende besøk for disse personene på den gudstjenesten i dag slettes sammen med visitSessions, og deretter lagres det innsendte settet. Å sjekke inn en familie på nytt er derfor en idempotent «dette er nåværende tilstand»-operasjon, ikke et tillegg. Med `?checkDuplicates=true` returneres `{ duplicates: [personId…] }` uten å skrive, og det er slik kiosken varsler før den overskriver.
4. **Genererer én sikkerhetskode per batch.** `SecurityCodeHelper.generate()` lager en kode på 4 tegn fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, slik at koder ikke kan stave ord eller leses feil). Serveren prøver på nytt ved kollisjon mot samme kirkes åpne besøk samme dag, og stempler koden på hvert besøk i batchen.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` mapper personId til antall sammenhengende uker med oppmøte; kiosken feirer milepæler (hver 5. uke) med konfetti.

Hvert lagret besøk sender også en `attendance.recorded`-webhook. Lesesiden, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **sist registrerte dato** — hvis det var en tidligere uke, fjernes ID-ene, og klienten får en forhåndsutfylt kopi av forrige ukes romvalg som lagres som nye poster.

### Utsjekking

To endepunkter fullfører løkken (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens ikke-utsjekkede besøk med den sikkerhetskoden, med økter fylt ut.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; stempler `checkoutTime` og hvem som hentet, og sender en `attendance.checkout`-webhook per besøk.

Tillatelser: kiosker autentiserer med `attendance.checkin`, som gir nøyaktig innsjekkings-, utsjekkings- og etikettmal-flaten, pluss husstandsoppslagene en kiosk trenger uten `people.view` (søk på telefon/navn, husstandsmedlemmer i innsjekkingsmodellen, og husstandens hentelliste). B1Checkins `SessionHelper.filterChurches` tilbyr bare kirker der kontoen har `Attendance/Checkin` eller `Attendance/Edit`. `Checkin` er ikke lenger en del av Everyone-tillatelsene (null-rolle) (`RoleHelper` og migrering `2026-11-01_remove_everyone_checkin`), så den må gis gjennom en ekte rolle; `attendance.view`/`attendance.edit` dekker rapportering og manuell registrering; strukturen (gudstjenester, gudstjenestetider, gruppetilordninger) krever `services.edit`. Medlemmers selvinnsjekking (B1App) krever ingen tillatelse i det hele tatt: enhver autentisert bruker med en koblet person i kirken kan kalle `GET`/`POST /attendance/visits/checkin`, og serveren begrenser de innsendte `personId`-ene til innringerens egen husstand (403 ellers — denne grensen er det som gjør at andre familiers `securityCode`-er ikke kan leses). Medlemskap er tillatelsen; om medlemmer *ser* funksjonen styres av kirkens navigasjonsfaner i B1App. De andre innsjekkingsendepunktene (`code/:code`, `checkout`, `guardians`, `CheckinController`) er fortsatt kun for kiosk/ansatte.

## Grupper styrer romruting

Det finnes ingen rom- eller klasserom-entitet noe sted i systemet. Et «rom» er en medlemsgruppe med `trackAttendance` aktivert, koblet til en eller flere gudstjenestetider via `groupServiceTimes`. Gruppefeltene (i `Api/src/modules/membership/models/Group.ts`) som former kioskens oppførsel:

| Felt | Effekt |
|------|--------|
| `trackAttendance` | Gruppen deltar i oppmøte i det hele tatt; B1Admins oppsettstre markerer `trackAttendance`-grupper uten `groupServiceTimes`-rad som ikke tilordnet |
| `parentPickup` | Markerer et barnerom: innsjekking der gjør besøket til et «barn»-besøk, som skriver ut en familiehentetikett og legger sikkerhetskoden på navneskiltet |
| `printNametag` | Om innsjekkinger til denne gruppen skriver ut et navneskilt i det hele tatt |
| `capacity` / `guestCapacity` / `checkinClosed` | Romkapasitetsgrenser og en hard «stengt»-bryter, håndhevet på serveren av innsjekkingsporten (redigeres i B1Admins gruppeinnstillinger under «Check-In Capacity») |
| `volunteerRatio` / `minVolunteers` | Forhold barn per frivillig og minimum antall frivillige, håndhevet i henhold til kirkens `ratioEnforcement`-innstilling |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alders- og klassetrinnsgrenser som evalueres på kiosken for å fremheve eller dempe rom |

Alle klienter denormaliserer på samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): last `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` og `GET /membership/groups` parallelt, og samle deretter for hver gudstjenestetid gruppene der `groupServiceTimes`-raden peker på den inn i `serviceTime.groups`. Den matrisen er det romvelgeren viser, organisert etter gruppens `categoryName`.

Tilordninger redigeres fra gruppesiden i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), og hele treet Kirkested → Gudstjeneste → Gudstjenestetid → Gruppe visualiseres i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er den enkelte sannhetskilden, driver det samme gruppemedlemskapet kioskrutingen, klasselistelignende oppmøte på B1Admins gruppesider og oppmøterapportering — å tilordne en gruppe til en gudstjenestetid er det eneste steget som trengs for å gjøre den til et innsjekkingsmål.
:::

## Barnesikkerhet

### Innsjekkingstyper {#check-in-types}

Hvert besøk har en `checkinType` — `member`, `guest` eller `volunteer` (NULL betyr eldre/medlem; migrering `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **på kiosksiden**: Medlem / Gjest / Frivillig-brikker på den utvidede medlemsraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), og settes på hvert ventende besøk ved fullføring (`app/checkinComplete.tsx`, standard `member`). Serveren bruker den i porten — frivillige teller mot bemanningsdekning i stedet for mot kapasitet, og gjester teller mot `guestCapacity`.

### Kapasitets- og bemanningsforholdsporter {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjører inne i `postCheckin` før noen lagring (endepunktet er ikke transaksjonelt, så port-før-lagring er korrekthetsmekanismen). Den laster nåværende belegg per berørt gruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigurasjonen gjennom membership-modulens gateway, og klassifiserer deretter overtredelser:

- **Hard (blokkerer alltid):** `checkinClosed`, `current + incoming > capacity`, gjesteantall over `guestCapacity`. Batchen avvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosken viser det navngitte rommet.
- **Forhold (advarsel eller blokkering):** innkommende ikke-frivillige til et rom der `volunteers < minVolunteers`, ingen frivillige i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighetsgraden følger den kirkevise innstillingen `ratioEnforcement` (`"warn"` standard / `"block"`, redigeres i B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). I advarselsmodus returneres `409 { warning: true, error: "ratio", … }` med mindre klienten sender inn på nytt med `acknowledgeWarnings=true` — den nye innsendingen er kioskens overstyring for bekreftelse av ansatt.

### Planlagte innsjekkingsvinduer {#scheduled-check-in-windows}

En gudstjenestetid kan ha en valgfri ukeplan (`dayOfWeek` 0–6 der 0 = søndag, `startTime`/`endTime` som `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), redigert i B1Admins skjema for gudstjenestetid under **Attendance → Setup** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, «Check-in Schedule»). `CheckinGateHelper.hasSchedule()` behandler en gudstjenestetid som planlagt bare når både `dayOfWeek` og `startTime` er satt; ikke-planlagte tider styres aldri av tid. `isServiceTimeOpen()` beregner vinduet i lokal veggklokketid (`DateHelper.toChurchTime`). Sonen løses per gudstjenestetid av `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): `timezone` for gudstjenestens kirkested (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) kommer først, deretter kirkens `timeZone` (satt i B1Admins kirkeinformasjon), deretter det første ikke-fjernede kirkestedet som har en `timezone` (`loadCampusTimeZone`), og først da `America/New_York`. Kirkestedet kommer først fordi de fleste kirker hadde `America/New_York` fylt inn som kirkens sone i etterkant. Både listings- og postingbanene nedenfor løser den på samme måte. Vinduet går fra `checkinOpenMinutes` før start til `checkinCloseMinutes` etter slutt (eller etter start når det ikke finnes sluttid), og håndterer vinduer som går over midnatt eller ukeskiftet.

Vinduet håndheves på to steder:

- **Listing:** `GET /attendance/servicetimes` stempler hver rad med en beregnet `checkinOpen`-boolsk verdi. B1Apps selvinnsjekking (`CheckinPage.tsx`) og B1Checkins gudstjenestevelger (`app/services.tsx`) beholder alle tider. Når alle en gudstjenestes tider er stengt, viser de neste åpning («Check-in opens Sun 9:30 AM.» i B1App, «Check-in for this service opens Sun 9:30 AM.» i B1Checkin, fra `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), og faller tilbake til «Check-in isn't open for this service right now.» når ingen åpning kan beregnes (kiosken tilbyr en Tilbake-knapp for å velge en annen gudstjeneste). Ellers vises stengte tider som en ikke-valgbar rad «Closed» / «Closed · opens 9:30 AM». B1Checkins husstandsskjerm (`MemberServiceTimes.tsx`) evaluerer åpenhet på nytt live med enhetens klokke via `ServiceTimeHelper.isCheckinOpen()` (enhetens tidssone, ikke kirkens), slik at en kiosk som står og går åpner og stenger i rett tid, og viser «Kids Room 1 · Checked in» (gruppenavn) på en stengt tid personen allerede har.
- **Posting:** inne i `evaluateGates()`, før kapasitets-/forholdsvurderingen, avviser `findClosedServiceTimeGroups()` batchen med `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` hvis en berørt økts gudstjenestetid er utenfor vinduet sitt. Fordi en husstands eksisterende besøk for i dag sendes på nytt med hver innsjekking, hopper økter personen allerede har (`personId|sessionId` i de eksisterende besøkene) over denne porten, slik at det å legge til en senere åpen gudstjenestetid ikke avvises fordi et tidligere vindu er stengt. B1Checkin viser dette gjennom sin harde-port-skjerm med årsaken «check-in isn't open right now» (kapasitetsbrudd viser fortsatt «room is full or closed»).

### Alders- og klassetrinnskontroll (på kiosksiden) {#agegrade-eligibility-kiosk-side}

Romkvalifisering er rådgivende UI, evaluert på kiosken, ikke håndhevet av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klassetrinn med gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (klassetrinnsrekkefølge: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` — manglende data gir `unknown` og skjuler aldri et rom. Alder og klassetrinn beregnes per kirkens **klassetrinnsopprykksdato** (innstillingen `gradePromotionDate`, `"MM-DD"`, redigert i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` velger den nyeste forekomsten på eller før i dag. Romvelgeren fremhever kvalifiserte rom og demper ikke-kvalifiserte; å velge et dempet rom krever en bekreftelse fra ansatt.

### Betrodd og ikke-autorisert henting {#trusted-and-not-authorized-pickup}

Hentepersoner er en medlemskapsentitet, per husstand: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (enhver autentisert kirkebruker, slik at kiosker kan lese den) pluss `POST` / `DELETE` styrt av `people.edit`. Ansatte administrerer listen på personsidens kort **Pickup** (`B1Admin/src/people/components/PickupPeople.tsx`) — bilde, relasjon og en statusbrikke for Trusted/Not Authorized.

Ved utsjekking (`B1Checkin/app/checkout.tsx`) laster kiosken husstandens hentelliste: `trusted`-oppføringer vises som trykkbare hentekort sammen med rutenettet med voksne fra husstanden, og et fritt skrevet «Other»-navn sammenlignes tilnærmet (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized`-oppføringer — en treff blokkerer utsjekking med et advarselsark og en ansatt-knapp **Override**. Overstyringen logges på selve besøket: den sender `checkedOutBy` som `"OVERRIDE: {name}"` gjennom den vanlige `POST /attendance/visits/checkout`, slik at den havner i oppmøteregistreringen og `attendance.checkout`-webhooken i stedet for en egen revisjonstabell.

### Varsling av foreldre og nødkringkasting

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) tilbyr to SMS-endepunkter:

- `POST /page` — `{ visitId, message }`: varsler foresattene til ett innsjekket barn (kioskens utsjekkingsskjerm, bemannet modus).
- `POST /broadcast` — `{ serviceId, message }`: sender SMS til voksne i hver innsjekket husstand for en gudstjeneste (kioskens administratorinnstillinger, bak et ark for bekreftelse av typen `EMERGENCY` i `B1Checkin/app/adminSettings.tsx`).

Begge slår opp voksne i husstander gjennom membership-gatewayen, og overlater deretter leveransen til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — døren på tvers av moduler inn til kirkens konfigurerte SMS-leverandør (`@churchapps/texting`: TextInChurch, Clearstream eller MutualMinistry; det finnes ingen innebygd SMS-sender). Gatewayen logger en `sentText`-rad pluss `deliveryLog`-oppføringer per mottaker og begrenser en batch til 500 mottakere; uten konfigurert leverandør returnerer den `no_provider`, som kiosken viser som «No SMS provider configured». Kontrollerens `dispatch()` fjerner duplikate telefonnumre og hopper over personer uten mobil eller med `optedOut` satt, og returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }`, slik at kiosken kan vise hva som ble hoppet over.

## Kiosken (B1Checkin)

Skjermene er expo-router-filer under `B1Checkin/app/`; tilstand på tvers av skjermer ligger i en statisk klasse `CachedData` (`src/helpers/CachedData.ts`), ikke i React-state.

```
index (oppstart/automatisk innlogging) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             laster serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ skriv etiketter,
             groupServiceTimes,           │             └▶ checkout (bemannet)         auto-retur
             labelTemplates               │                                            til lookup
```

1. **Oppslag** (`app/lookup.tsx`) — søk på telefon (`GET /membership/people/search/phone?number=`, siste 4 eller full) eller på navn (`GET /membership/people/search?term=`). Å velge en treff laster husstanden (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), og fyller `pendingVisits` med forrige ukes valg.
2. **Gjennomgang av husstand** (`app/household.tsx`, `src/components/MemberList.tsx`) — hver medlemsrad viser en merke for allerede innsjekket, en merke for allergi/`nametagNotes`, og personens nåværende romBrikker. Å utvide et medlem lister hver gudstjenestetid med en romknapp pluss innsjekkingstypebrikkene Medlem / Gjest / Frivillig (`MemberServiceTimes.tsx`). Under hvert gudstjenestetidsnavn viser `ServiceTimeHelper.getGroupSummary()` gruppene som tilbys der (navnene fra `serviceTime.groups`, trimmet, dedupliserte uavhengig av store/små bokstaver, komma-sammenføyd); ingenting vises når tiden ikke har grupper.
3. **Gruppetilordning** (`app/selectGroup.tsx`) — et kategoritre bygget fra `serviceTime.groups`, med alders-/klassetrinnskvalifiserte rom fremhevet og ikke-kvalifiserte dempet bak en bekreftelse fra ansatt (se [Alders-/klassetrinnskontroll](#agegrade-eligibility-kiosk-side)); å velge et rom skriver en `{ session: { serviceTimeId, groupId } }`-visitSession inn i personens ventende besøk (`src/helpers/VisitSessionHelper.ts`). «None» fjerner det.
4. **Fullfør** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` med `pendingVisits` (hver stemplet med sin `checkinType`), skriver deretter ut etiketter hvis en skriver er konfigurert, og returnerer automatisk til oppslag. Et `409`-svar for kapasitet eller `notOpen` viser det navngitte rommet med årsaken (fullt/stengt, eller innsjekking ikke åpen); en forholdsadvarsel tilbyr en bekreftelse fra ansatt som sender på nytt med `acknowledgeWarnings=true`.

**Utsjekkingsskjermen** (`app/checkout.tsx`) godtar den 4-tegns sikkerhetskoden gjennom et automatisk fokusert felt — slik at USB-/Bluetooth-tastatur-strekkodeskannere fungerer uten kamera — eller et tastatur på skjermen som bruker samme alfabet, og sender automatisk ved 4 tegn. En **Scan**-knapp åpner et ark med det delte kameraet `src/components/CodeScanner.tsx` (bakvendt som standard, og godtar QR, Code 128 og Code 39), slik at stasjoner uten tastatur-skanner kan lese hentetiketten; en skannet kode går inn i samme `handleCode()`-sti som skrevet inndata. Den slår opp koden, viser barna som hentes, og presenterer husstandens **betrodde hentepersoner** som trykkbare kort sammen med et fotorutenett av voksne i husstanden (pluss et «Other»-valg med fritekst som sammenlignes tilnærmet mot ikke-autoriserte navn — se [Betrodd og ikke-autorisert henting](#trusted-and-not-authorized-pickup)), og sender deretter `POST /attendance/visits/checkout` med velgerens navn/id. I bemannet modus tilbyr skjermen også **Page a parent** (`POST /attendance/checkin/page`) og en **gjenutskrift av sikkerhetsetikett** — `reprint()` bygger familiens etiketter på nytt med `LabelHelper.getAllLabelsFor(...)` og sender dem gjennom samme `PrintUI`-pipeline som innsjekking.

Stasjonens personlighet er et AsyncStorage-flagg `@StationMode` (`"self"` | `"manned"`, byttes i `app/adminSettings.tsx`). Bemannet modus legger til inngangspunktet for utsjekking på oppslagsskjermen og redigering av personprofiler per medlem (`POST /membership/people`) fra husstandsskjermen. Kioskherding er innebygd: en valgfri PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) låser administrator- og skriverskjermene, administratorskjermen åpnes bare med 7 raske trykk på toppteksts-logoen, og en inaktivitetsskjerm (`src/hooks/useInactivityTimer.ts`) tar over mellom familiene.

## Selvinnsjekking (B1App)

Medlemmer sjekker inn fra b1.church-portalen på skjermen `/mobile/checkin` (rutet av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Den krever en innlogget bruker og går gjennom de samme fire stegene som kiosken — gudstjenester → husstand → grupper → fullfør — mot de identiske endepunktene, med tilstand i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kiosken: husstanden kommer fra den innloggede brukerens egen `householdId` (ikke noe søkesteg), og det finnes ingen etikettutskrift — i stedet viser fullføringsskjermen batchens sikkerhetskode som en QR (`qrcode.react`) med hintet «vis dette på en innsjekkingsstasjon». Hvis husstanden allerede er innsjekket når siden lastes, viser en knapp **Show check-in code** QR-koden på nytt fra det første eksisterende besøket (fra `GET /attendance/visits/checkin`) som har en `securityCode`. Innsjekkingen registreres umiddelbart ved innsending (det finnes ingen ventende tilstand); QR-koden styrer bare etterutskrift av etiketter på kiosken.

**Telefon-til-kiosk-etikettutskrift** (`B1Checkin/app/scan.tsx`, nådd fra QR-knappen **Scan code** på oppslagsskjermen): kiosken viser `CodeScanner` (en `expo-camera` `CameraView`, som standard vender mot brukeren og kan snus) og skanner etter QR-koder. `ScanCodeHelper.parse()` godtar en nyttelast bare når den er en nakt 4-tegns kode i sikkerhetskodealfabetet, og `ScanCodeHelper.isRepeat()` ignorerer samme kode i 4 sekunder, slik at både B1App-QR-en og QR-blokken på en utskrevet etikett fungerer. Skjermen følger deretter gjenutskriftsstien for utsjekking — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — og returnerer til oppslag. Det skjer ingen oppmøteskriving ved skanning; bare etiketter. Koder uten aktive besøk, stasjoner uten skriver og grupper uten etiketter viser hver sin toast og går tilbake til oppslag.

Typer og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React-komponenter deles med B1Admin.

## Oppmøte på administratorsiden (B1Admin)

- **Oppsett** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) viser strukturtreet og oppretter tjenester (`ServiceEdit.tsx`) og gudstjenestetider (`ServiceTimeEdit.tsx`). Kirkestedsdata kommer fra membership via hooken `useCampuses()`.
- **Manuelt oppmøte** finnes på gruppesiden, ikke i oppmøteseksjonen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter økter (`POST /attendance/sessions`; ved tillegg kan `SessionEdit.tsx` inkludere én økt per annen gruppe som deler valgt gudstjenestetid, og hopper over grupper som allerede har en økt den datoen) og markerer personer som til stede via `POST /attendance/visitsessions/log`, som finner eller oppretter besøket for den personen og økten. Gruppeledere kan registrere oppmøte for sine egne grupper uten tillatelsen `attendance.edit` — kontrollerne sjekker `au.leaderGroupIds`.
- **Rapportering** — oppmøtetrend og gruppeoppmøte er serverdefinerte rapporter (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi; definisjoner i `Api/reports/*.json`). Begge tar `startDate`/`endDate` (sluttdato inkludert); trendrapporten har som standard ett år siden til i dag og legger til en `sessionDates`-kolonne per uke, og gruppeoppmøtets tre på skjermen inkluderer hvert besøks `checkinTime` og personens `membershipStatus`. CSV-filen for gruppeoppmøte kommer fra den tilhørende rapporten `groupAttendanceDownload`, pivotert av `GroupAttendanceDownloadHelper` til én rad per gruppemedlem med en til stede-/fraværende-kolonne per datert økt; historikk per person er `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettutskrift

### Maler og designeren

Kirker designer sine egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nådd fra innsjekkingsinnstillingene). En mal er en `labelTemplates`-rad der `content` er en JSON-matrise av blokker — `text`, `field`, `barcode`, `qrcode` eller `box` — hver plassert i prosentkoordinater med skrift, justering, symbologi (`code39`/`code128`/`qr`) og valgfrie synlighetsbetingelser (f.eks. bare vise allergiboksen når `person.nametagNotes` ikke er tom). Det finnes to `labelType`-er: `nametag` (én per innsjekket person; felt som `person.displayName`, `sessions`, `securityCode` og `person.isBirthdayWeek` — `"true"` når bursdagens måned/dag er innen 3 dager fra i dag, med omslag over årsskiftet, beregnet av `LabelHelper.isBirthdayWithin()`) og `pickup` (én per familie; felt som `children`, `childrenAllergies`). Serveren håndhever én standard per type per kirke (`LabelTemplateController.save`). Designeren leveres med startmaler som speiler kioskens innebygde etiketter, og forhåndsviser mot eksempeldata.

### Rendering og utskrift på kiosken

Ved fullføring av innsjekking bestemmer `B1Checkin/src/helpers/LabelHelper.ts` hva som skal skrives ut ut fra gruppeflaggene på hvert ventende besøk: navneskilt for `printNametag`-grupper, pluss én familiehentetikett hvis et besøk traff en `parentPickup`-gruppe. Besøk med `checkinType` `volunteer` hoppes over av `LabelHelper.selectChildVisits()`, slik at en barnepasser i et Parent Pickup-rom aldri utløser en hentetikett. Sikkerhetskoden fra innsjekkingsresponsen settes på barnenavneskilt og hentetiketten; voksnes navneskilt skrives ut uten kode. Hvis kirken har maler, gjør `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blokker + en feltkontekst om til et frittstående HTML-dokument; ellers brukes innebygde HTML-etiketter i `B1Checkin/assets/labels/` med plassholdererstatning.

Strekkoder genereres som innebygd SVG av rene TypeScript-kodere i `B1Checkin/src/helpers/barcode.ts` — Code 39-mønstertabeller og Code 128 (kodesett B med mod-103-kontrollsum) breddetabeller, pluss QR via pakken `qrcode`. **Disse koderne er med vilje duplisert i B1Admin** (`LabelEditor.tsx` inliner de samme tabellene, notert i en kodekommentar), slik at designerens forhåndsvisninger er pikselnøyaktige med kioskutdata; en endring i den ene må speiles i den andre.

Utskriftspipelinen (`src/components/PrintUI.tsx`) rendrer hver HTML-etikett i en `WebView`, fanger den til JPG via `react-native-view-shot`, og sender bilde-URI-ene til den native Expo-modulen **printer-helper** (`B1Checkin/modules/printer-helper/`). Modulen eksponerer `scan()`, `checkInit()`, `printUris()` og statushendelser, med en leverandør per merke på begge plattformer:

| Merke | Android | iOS | Merknader |
|-------|---------|-----|-----------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serien nettverksskrivere (QL-800/810W/820NWB/1100/1110NWB…), 29×90 mm stansede etiketter, anbefalt standard |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverksoppdagelse + TCP/ZPL-bildeutskrift |

Skriftervalg ligger i `app/printers.tsx` (nettverksskanning returnerer `brand~model~ip`-oppføringer; valget lagres i AsyncStorage), og `src/helpers/PrinterLog.ts` holder en diagnostikklogg på enheten som vises via en live statusprikk i kioskens topptekst.

## Gjesteregistrering

To veier oppretter en person midt under innsjekking:

- **På kiosken** — «Add guest» på husstandsskjermen åpner `B1Checkin/app/addGuest.tsx`, som først søker `GET /membership/people/search?term=` etter en eksisterende treff som ikke er medlem, og ellers oppretter en med `POST /membership/people`, knyttet til gjeldende husstand. Gjesten går deretter gjennom gruppetilordningen som et hvilket som helst medlem.
- **Selvbetjent via QR** — når kirkeinnstillingen `enableQRGuestRegistration` er på (konfigurert i B1Admins innsjekkingsinnstillinger, lest fra `GET /membership/settings/public/{churchId}`), viser oppslagsskjermen på kiosken en QR-kode som lenker til `https://{subdomain}.b1.church/guest-register?serviceId=`. Den B1App-siden (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en besøkende familie registrere seg selv på egen telefon gjennom det anonyme endepunktet `POST /membership/people/guest-register`, slik at kioskkøen går raskt. QR-arket har også en knapp **Register here** som åpner den samme siden på kiosken (`app/guestRegister.tsx`) i en inkognito-`WebView` uten cache; `src/helpers/GuestRegisterHelper.ts` bygger URL-en for både QR-en og `WebView`-en og blokkerer navigering bort fra `https://{subdomain}.b1.church/guest-register`. Skjermen går tilbake til oppslag ved **Done**, tilbake, eller etter 120 sekunders inaktivitet (skriving i skjemaet videreformidles fra `WebView`-en som aktivitet), og avmonterer `WebView`-en slik at én familie sine oppføringer aldri når neste.

Registrering via QR styres av kirkeinnstillinger lagret fra kortet **QR Guest Registration** i B1Admin (`src/mobile/CheckInPage.tsx`):

| Innstilling | Synlighet | Formål |
|---|---|---|
| `enableQRGuestRegistration` | offentlig | Opt-in-bryter for kiosk-QR-en og de anonyme endepunktene |
| `guestRegistrationFields` | offentlig | JSON-kart over `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standard: e-post og telefon valgfritt, resten av. Fornavn/etternavn er alltid påkrevd |
| `guestRegistrationImage` | offentlig | URL for overskriftsbilde; B1App rendrer det 16:9 i stedet for ikonet på skjemaet og bekreftelsesskjermen |
| `guestRegistrationGroupId` | privat | Gruppen hver påmelding legges til i (gjester ser eller velger den aldri) |
| `guestRegistrationRecordAttendance` | privat | `"true"` for også å registrere oppmøte for den gruppen |

B1Apps `src/components/checkin/GuestRegister.tsx` henter sjekklisten fra det anonyme `GET /membership/people/guest-register/options?churchId=` og rendrer bare de inkluderte feltene (e-post, telefon, sivilstatus og adresse på hovedkontakten; fødselsdato, kjønn og klassetrinn per medlem; én kommentarboks), og sender bare dem. Serveren bruker sjekklisten på nytt i `GuestRegistrationHelper.sanitize()` — av-felt fjernes, manglende påkrevde eller verdier utenfor listen gir en 400 — før `PersonHelper.registerGuestHousehold()` kjører. Den kaller først `PersonRepo.findGuestMatch()` for hvert medlem med en e-post eller telefon: nøyaktig én levende person med samme fornavn og samme e-post eller telefonsiffer gjenbrukes (null eller flere treff oppretter en ny person, så den gjetter aldri). Et medlem uten kontaktopplysninger matches på fornavn innenfor den matchede husstanden. Gjenbrukte personer redigeres aldri, slik at et anonymt skjema ikke kan overskrive lagrede detaljer, og responsen gjentar de innsendte navnene. Ikke-matchede medlemmer blir med i den matchede husstanden eller en ny, som `membershipStatus: "Visitor"`, og sender `person.created` for hver ny person. Deretter logges feil i stedet for å returneres: medlemmer legges til den konfigurerte gruppen (`group.member.added`); hvis oppmøteregistrering er på, markerer `AttendanceModuleGateway.recordAttendance()` hvert medlem som til stede for hver av gruppens gudstjenestetider som har en plan og hvis innsjekkingsvindu (`CheckinGateHelper.isServiceTimeOpen`) er åpent akkurat nå, og oppretter økten for dagens kirkelokale dato om nødvendig — ikke-planlagte gudstjenestetider og påmeldinger utenfor vinduet registrerer ingenting; og kommentarer blir en skjult personnotatsamtale på hovedpersonen (meldingsforfatter «Guest sign-up»), koblet gjennom `person.conversationId`.

## Relaterte sider

- [Attendance-endepunkter](../api/endpoints/attendance) -- Full REST-flate for kirkesteder, gudstjenester, økter, besøk og besøksøkter
- [Membership-endepunkter](../api/endpoints/membership) -- Personer, husstander og grupper
- [Webhooks](../api/webhooks) -- Hendelsene `session.created`, `attendance.recorded` og `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Hvordan attendance-modulen er organisert på serversiden
