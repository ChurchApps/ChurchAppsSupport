---
title: "Innsjekkinger"
---

# Innsjekkinger

<div class="article-intro">

Innsjekking er ett system med tre innganger: B1Checkin-kioskappen for bemannede og selvbetjente stasjoner, selvinnsjekking i medlemsportalen B1App, og oppmøte på administratorsiden i B1Admin. Alle tre skriver til samme oppmøtemodul i kjerne-API-et, og romtildelingen styres helt av grupper – det finnes ingen egen enhet for «lokasjoner» eller «rom». Et sikkerhetslag ligger oppå dette: innsjekkingstyper per besøk, kapasitets- og frivillig-forholdskontroller på serversiden, alders- og klassetrinnskontroll på kiosken, verifisering av betrodd henting ved utsjekking, og varsling av foreldre via menighetens SMS-leverandør. Denne siden beskriver datamodellen, innsjekkingsflytene, sikkerhetslaget og utskriftsløpet for etiketter.

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
| Kiosk | `B1Checkin` | Expo / React Native, expo-router-filruting; EAS-bygg for Android, Amazon Fire og iOS; OTA-oppdateringer via `expo-updates` | Bemannet eller selvbetjent stasjon med etikettutskrift og verifisert utsjekking |
| Selvinnsjekking | `B1App` | Next.js (b1.church-medlemsportalen) | Innloggede medlemmer sjekker husstanden sin inn fra telefonen; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tilordner grupper til tjenestetider, designer etiketter, registrerer manuelt oppmøte og kjører rapporter |

Alle tre kaller de samme to API-modulene via `ApiHelper`: **MembershipApi** (`/membership`) for personer, husstander og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`)

| Entitet / tabell | Nøkkelfelt | Betydning |
|----------------|-----------|---------|
| `campuses` | name, address | Utfaset her – campus forvaltes i membership-modulen (`/membership/campuses`); attendance-kopien er frosset som skrivebeskyttet for eldre lesere (`models/Campus.ts`) |
| `services` | campusId, name | En gjentakende samling, f.eks. «Søndag morgen» (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Et tidspunkt innenfor en tjeneste, f.eks. «09:00» (`models/ServiceTime.ts`). Tidsplankolonnene er valgfrie (migrering `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) og styrer [innsjekkingsvinduet](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Koblingstabell: hvilke grupper (klasserom) som møtes på hvilke tjenestetider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte for én gruppe på én dato – opprettes først når det sjekkes inn (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Én person som deltar på én dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = eldre medlem), satt av kiosken og brukt av kapasitets- og forholdskontrollene |
| `visitSessions` | visitId, sessionId | Hvilke økter et besøk dekker – et barn som sjekkes inn til to tjenestetider får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokker) | Designbare etikettoppsett (`models/LabelTemplate.ts`) |

### Slik lagres en fullført innsjekking

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Body er en liste med `Visit`-objekter, hver med `visitSessions` der det innebygde `session`-objektet kun angir et par `(serviceTimeId, groupId)`. Serveren gjør deretter følgende:

1. **Kontrollerer kapasitet og forhold før noe skrives.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sjekker hvert berørt rom mot kapasitet, gjestekapasitet, stengt-flagg og frivillig-forhold mot nåværende belegg. postCheckin er **ikke transaksjonell**, så kontrollen må kjøre før første lagring – et hardt brudd gir en 409 som nevner rommet/rommene det gjelder, og ingenting lagres. Se [Kapasitets- og frivillig-forholdskontroller](#capacity-and-volunteer-ratio-gates).
2. **Finner eller oppretter økter ved behov.** `getSessionId()` finner eller oppretter raden i `sessions` for `(groupId, serviceTimeId, today)` – økt-id-er caches i prosessen per dato. Nye økter sender en `session.created`-webhook. Løkken er en ventet `for..of` – en tidligere fire-and-forget `forEach(async …)` kjørte i kapp med lagringen og skrev NULL som sessionId ved opprettelse av første økt (rettet; notert i en kodekommentar ved løkken).
3. **Erstatter dagens registreringer.** Eksisterende besøk for disse personene på den tjenesten i dag slettes sammen med deres visitSessions, og så lagres det innsendte settet. Å sjekke inn en familie på nytt er derfor en idempotent «dette er nåværende tilstand»-operasjon, ikke et tillegg. Sendes `?checkDuplicates=true` i stedet, returneres `{ duplicates: [personId…] }` uten å skrive, og det er slik kiosken varsler før den overskriver.
4. **Genererer én sikkerhetskode per batch.** `SecurityCodeHelper.generate()` lager en 4-tegns kode fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, slik at koder ikke kan stave ord eller leses feil). Serveren prøver på nytt ved kollisjon mot samme menighets åpne besøk samme dag og setter koden på hvert besøk i batchen.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` kobler personId til antall sammenhengende uker med oppmøte; kiosken feirer milepæler (hver 5. uke) med konfetti.

Hvert lagret besøk sender også en `attendance.recorded`-webhook. Lesesiden, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **sist registrerte dato** – var det en tidligere uke, fjernes id-ene, og klienten får en forhåndsutfylt kopi av forrige ukes romvalg som lagres som nye registreringer.

### Utsjekking

To endepunkter fullfører kretsen (`VisitController`):

- `GET /attendance/visits/code/:code` – dagens ikke-utsjekkede besøk med den sikkerhetskoden, med økter fylt ut.
- `POST /attendance/visits/checkout` – body `{ visitIds, checkedOutBy?, checkedOutById? }`; setter `checkoutTime` og hvem som hentet, og sender en `attendance.checkout`-webhook per besøk.

Tillatelser: kiosker autentiserer med `attendance.checkin`, som gir nøyaktig innsjekkings-, utsjekkings- og etikettmalflaten; `attendance.view`/`attendance.edit` dekker rapportering og manuell registrering; strukturen (tjenester, tjenestetider, gruppetilordninger) krever `services.edit`. Medlemmers selvinnsjekking (B1App) krever ingen tillatelse i det hele tatt: enhver autentisert bruker med en koblet person i menigheten kan kalle `GET`/`POST /attendance/visits/checkin`, og serveren begrenser de innsendte `personId`-ene til innloggedes egen husstand (403 ellers – denne sperren er det som hindrer at andre familiers `securityCode` kan leses). Medlemskap er tilgangen; om medlemmene *ser* funksjonen styres av menighetens B1App-navigasjonsfaner. De andre innsjekkingsendepunktene (`code/:code`, `checkout`, `guardians`, `CheckinController`) er fortsatt kun for kiosk/personale.

## Grupper styrer romtildelingen

Det finnes ingen rom- eller klasseromsenhet noe sted i systemet. Et «rom» er en medlemsgruppe med `trackAttendance` aktivert, koblet til én eller flere tjenestetider via `groupServiceTimes`. Gruppefeltene (i `Api/src/modules/membership/models/Group.ts`) som former kioskens oppførsel:

| Felt | Effekt |
|------|--------|
| `trackAttendance` | Gruppen deltar i oppmøte i det hele tatt; oppsettstreet i B1Admin markerer `trackAttendance`-grupper uten `groupServiceTimes`-rad som ikke tilordnet |
| `parentPickup` | Markerer et barnerom: innsjekking til det gjør besøket til et «barn»-besøk, som skriver ut en familiehentingsetikett og legger sikkerhetskoden på navneskiltet |
| `printNametag` | Om innsjekkinger til denne gruppen skriver ut et navneskilt i det hele tatt |
| `capacity` / `guestCapacity` / `checkinClosed` | Romkapasitetsgrenser og en hard «stengt»-bryter, håndhevet på serversiden av innsjekkingskontrollen (redigeres i B1Admins gruppeinnstillinger under «Innsjekkingskapasitet») |
| `volunteerRatio` / `minVolunteers` | Barn per frivillig-forhold og minimum antall frivillige, håndhevet i henhold til menighetens globale `ratioEnforcement`-innstilling |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alders- og klassetrinnsgrenser som evalueres på kiosken for å fremheve eller nedtone rom |

Alle klienter denormaliserer på samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): last inn `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` og `GET /membership/groups` parallelt, og for hver tjenestetid samle gruppene hvis `groupServiceTimes`-rad peker på den inn i `serviceTime.groups`. Den matrisen er det romvelgeren viser, organisert etter gruppens `categoryName`.

Tilordninger redigeres fra gruppesiden i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` – `POST`/`DELETE /attendance/groupservicetimes`), og hele Campus → Tjeneste → Tjenestetid → Gruppe-treet visualiseres i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er den eneste sannhetskilden, driver samme gruppemedlemskap kioskrutingen, oppmøtelister i stil med klasseliste på B1Admins gruppesider og oppmøtrapportering – å tilordne en gruppe til en tjenestetid er det eneste steget som trengs for å gjøre den til et innsjekkingsmål.
:::

## Barnesikkerhet

### Innsjekkingstyper

Hvert besøk har en `checkinType` – `member`, `guest` eller `volunteer` (NULL betyr eldre/medlem; migrering `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **på kiosken**: Medlem / Gjest / Frivillig-brikker på den utvidede medlemsraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), og stemples på hvert ventende besøk ved fullføring (`app/checkinComplete.tsx`, standard `member`). Serveren bruker den i kontrollen – frivillige teller mot forholdsdekning i stedet for mot kapasitet, og gjester teller mot `guestCapacity`.

### Kapasitets- og frivillig-forholdskontroller {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjører inne i `postCheckin` før noen lagring (endepunktet er ikke-transaksjonelt, så kontroll før lagring er korrekthetsmekanismen). Den laster nåværende belegg per berørt gruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigurasjonen gjennom membership-modulens gateway, og klassifiserer deretter brudd:

- **Hard (blokkerer alltid):** `checkinClosed`, `nåværende + innkommende > capacity`, gjesteantall over `guestCapacity`. Batchen avvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` – kiosken viser det navngitte rommet.
- **Forhold (advarsel eller blokkering):** innkommende ikke-frivillige til et rom der `volunteers < minVolunteers`, ingen frivillige i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighetsgraden følger menighetens innstilling `ratioEnforcement` (`"warn"` som standard / `"block"`, redigeres i B1Admin Administrer menighet → Innsjekking, `CheckinSettingsEdit.tsx`). Advarselsmodus returnerer `409 { warning: true, error: "ratio", … }` med mindre klienten sender inn på nytt med `acknowledgeWarnings=true` – den innsendingen er kioskens bekreftelse fra personale.

### Planlagte innsjekkingsvinduer {#scheduled-check-in-windows}

En tjenestetid kan ha en valgfri ukentlig plan (`dayOfWeek` 0–6 der 0 = søndag, `startTime`/`endTime` som `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), redigert i B1Admins **Oppmøte → Oppsett**-skjema for tjenestetid (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, «Check-in Schedule»). `CheckinGateHelper.hasSchedule()` behandler en tjenestetid som planlagt kun når både `dayOfWeek` og `startTime` er satt; uplanlagte tider er aldri tidsstyrt. `isServiceTimeOpen()` beregner vinduet i menighetens lokale tid (`DateHelper.toChurchTime`). Tidssonen er menighetens `timeZone`; menigheter uten satt tidssone faller tilbake til første ikke-fjernede campus som har en `timezone` (`MembershipModuleGateway.loadCampusTimeZone`), og først da til `America/New_York`. Både listings- og innsendingsstiene nedenfor løser den på samme måte. Vinduet åpner `checkinOpenMinutes` før starten og lukker `checkinCloseMinutes` etter slutten (eller etter starten når det ikke finnes slutt), og håndterer vinduer som går over midnatt eller over ukegrensen.

Vinduet håndheves to steder:

- **Liste:** `GET /attendance/servicetimes` setter en beregnet `checkinOpen`-boolsk verdi på hver rad. B1Apps selvinnsjekking (`CheckinPage.tsx`) og B1Checkins tjenestevelger (`app/services.tsx`) fjerner begge tider der `checkinOpen === false`, og viser «Innsjekking er ikke åpen for denne tjenesten akkurat nå.» når en tjeneste har tider men ingen er åpne (kiosken tilbyr en Tilbake-knapp for å velge en annen tjeneste).
- **Innsending:** inne i `evaluateGates()`, før kapasitets-/forholdsevalueringen, avviser `findClosedServiceTimeGroups()` batchen med `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` hvis en berørt økts tjenestetid er utenfor vinduet. B1Checkin viser dette på sin harde blokkeringsskjerm med begrunnelsen «innsjekking er ikke åpen akkurat nå» (kapasitetsbrudd viser fortsatt «rommet er fullt eller stengt»).

### Alders- og klassetrinnskontroll (på kiosken) {#agegrade-eligibility-kiosk-side}

Romtilgang er rådgivende UI, evaluert på kiosken og ikke håndhevet av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klassetrinn med gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (klassetrinnsrekkefølge: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` – manglende data gir `unknown` og skjuler aldri et rom. Alder og klassetrinn beregnes per menighetens **klassetrinnsopprykksdato** (`gradePromotionDate`-innstilling, `"MM-DD"`, redigert i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` velger den siste forekomsten på eller før i dag. Romvelgeren fremhever kvalifiserte rom og nedtoner ikke-kvalifiserte; å velge et nedtonet rom krever bekreftelse fra personale.

### Betrodd henting og ikke-autorisert henting {#trusted-and-not-authorized-pickup}

Hentepersoner er en medlemsenhet, per husstand: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` – householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (enhver autentisert menighetsbruker, slik at kiosker kan lese den) pluss `POST` / `DELETE` beskyttet av `people.edit`. Personale administrerer listen på personsidens **Henting**-kort (`B1Admin/src/people/components/PickupPeople.tsx`) – bilde, slektskap og en Betrodd/Ikke autorisert-statusbrikke.

Ved utsjekking (`B1Checkin/app/checkout.tsx`) laster kiosken husstandens hentelist: `trusted`-oppføringer vises som trykkbare hentekort ved siden av rutenettet med husstandens voksne, og et fritt skrevet «Annen»-navn fuzzy-matches (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized`-oppføringer – en treff blokkerer utsjekking med et varselark og en **Overstyr**-knapp for personale. Overstyringen loggføres på selve besøket: den sender `checkedOutBy` som `"OVERRIDE: {name}"` gjennom vanlig `POST /attendance/visits/checkout`, slik at den havner i oppmøteregistreringen og `attendance.checkout`-webhooken i stedet for i en egen revisjonstabell.

### Varsling av forelder og nødkringkasting

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) eksponerer to SMS-endepunkter:

- `POST /page` – `{ visitId, message }`: varsler foresatte til ett innsjekket barn (utsjekkingsskjermen på kiosken, bemannet modus).
- `POST /broadcast` – `{ serviceId, message }`: sender tekstmelding til alle innsjekkede husstanders voksne for en tjeneste (kioskens administrasjonsinnstillinger, bak et bekreftelsesark der brukeren må skrive `EMERGENCY`, i `B1Checkin/app/adminSettings.tsx`).

Begge slår opp husstandens voksne via membership-gatewayen og overleverer deretter levering til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) – den modulovergripende døren til menighetens konfigurerte SMS-leverandør (`@churchapps/texting`: TextInChurch, Clearstream eller MutualMinistry; det finnes ingen innebygd SMS-avsender). Gatewayen logger en `sentText`-rad pluss `deliveryLog`-oppføringer per mottaker og begrenser en batch til 500 mottakere; uten konfigurert leverandør returnerer den `no_provider`, som kiosken viser som «Ingen SMS-leverandør konfigurert». Kontrollerens `dispatch()` fjerner dupliserte telefonnumre og hopper over personer uten mobil eller med `optedOut`, og returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }` slik at kiosken kan vise hva som ble hoppet over.

## Kiosken (B1Checkin)

Skjermer er expo-router-filer under `B1Checkin/app/`; tverrskjermtilstand ligger i en statisk `CachedData`-klasse (`src/helpers/CachedData.ts`), ikke i React-tilstand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Oppslag** (`app/lookup.tsx`) – søk på telefon (`GET /membership/people/search/phone?number=`, siste 4 eller hele) eller på navn (`GET /membership/people/search?term=`). Å velge et treff laster husstanden (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), og fyller `pendingVisits` med forrige ukes valg.
2. **Gjennomgang av husstand** (`app/household.tsx`, `src/components/MemberList.tsx`) – hver medlemsrad viser et merke for allerede innsjekket, et allergi-/`nametagNotes`-merke og gjeldende romvalg-brikker. Når man utvider et medlem, listes hver tjenestetid med en romknapp og Medlem / Gjest / Frivillig-brikkene for innsjekkingstype (`MemberServiceTimes.tsx`). Under hvert tjenestetidsnavn viser `ServiceTimeHelper.getGroupSummary()` gruppene som tilbys der (navnene i `serviceTime.groups`, trimmet, dupliserte fjernet uavhengig av store/små bokstaver, komma-separert); ingenting vises når tiden ikke har grupper.
3. **Gruppetilordning** (`app/selectGroup.tsx`) – et kategoritre bygget fra `serviceTime.groups`, der alders-/klassetrinnskvalifiserte rom fremheves og ikke-kvalifiserte nedtones bak personalbekreftelse (se [Alders- og klassetrinnskontroll](#agegrade-eligibility-kiosk-side)); å velge et rom skriver en `{ session: { serviceTimeId, groupId } }`-visitSession inn i personens ventende besøk (`src/helpers/VisitSessionHelper.ts`). «Ingen» fjerner den.
4. **Fullfør** (`app/checkinComplete.tsx`) – `POST /attendance/visits/checkin` med `pendingVisits` (hver stemplet med sin `checkinType`), skriver ut etiketter hvis en skriver er konfigurert, og går automatisk tilbake til oppslag. Et `409`-svar for kapasitet eller `notOpen` viser det navngitte rommet med årsaken (fullt/stengt, eller innsjekking ikke åpen); en forholdsadvarsel tilbyr en personalbekreftelse som sender inn på nytt med `acknowledgeWarnings=true`.

**Utsjekkingsskjermen** (`app/checkout.tsx`) tar imot den 4-tegns sikkerhetskoden via et automatisk fokusert felt – slik at USB-/Bluetooth-tastaturskannere fungerer uten kamera – eller et tastatur på skjermen med samme alfabet, som sendes automatisk ved 4 tegn. En **Skann**-knapp åpner et ark med det delte kameraet `src/components/CodeScanner.tsx` (bakkamera som standard, og godtar QR, Code 128 og Code 39), slik at stasjoner uten tastaturskanner kan lese hentetiketten; en skannet kode går gjennom samme `handleCode()`-sti som skrevet inn. Den slår opp koden, viser barna som hentes, og presenterer husstandens **betrodde hentepersoner** som trykkbare kort sammen med et rutenett av husstandens voksne med bilde (pluss et «Annen»-valg med fritekst som fuzzy-sjekkes mot ikke-autoriserte navn – se [Betrodd henting og ikke-autorisert henting](#trusted-and-not-authorized-pickup)), og sender deretter `POST /attendance/visits/checkout` med hentepersonens navn/id. I bemannet modus tilbyr skjermen også **Varsle en forelder** (`POST /attendance/checkin/page`) og **gjenutskrift av sikkerhetsetikett** – `reprint()` bygger familiens etiketter på nytt med `LabelHelper.getAllLabelsFor(...)` og sender dem gjennom samme `PrintUI`-løp som innsjekking.

Stasjonens egenart styres av et AsyncStorage-flagg `@StationMode` (`"self"` | `"manned"`, byttes i `app/adminSettings.tsx`). Bemannet modus legger til utsjekkingsinngangen på oppslagsskjermen og redigering av personprofil per medlem (`POST /membership/people`) fra husstandsskjermen. Kiosken har innebygd herding: en valgfri PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) låser administrasjons- og skriverskjermene, administrasjonsskjermen åpnes kun ved 7 raske trykk på logoen i toppen, og en inaktiv velkomstskjerm (`src/hooks/useInactivityTimer.ts`) tar over mellom familier.

## Selvinnsjekking (B1App)

Medlemmer sjekker seg inn fra b1.church-portalen på skjermen `/mobile/checkin` (rutes av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Den krever en innlogget bruker og går gjennom de samme fire stegene som kiosken – tjenester → husstand → grupper → fullfør – mot de identiske endepunktene, med tilstand i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kiosken: husstanden kommer fra den innloggede brukerens egen `householdId` (ingen søkesteg), og det finnes ingen etikettutskrift – i stedet viser fullføringsskjermen batchens sikkerhetskode som en QR (`qrcode.react`) med en hint om «vis dette på en innsjekkingsstasjon». Hvis husstanden allerede er sjekket inn når siden lastes, viser en «Vis innsjekkingskode»-knapp QR-koden på nytt fra det første eksisterende besøket (fra `GET /attendance/visits/checkin`) som har en `securityCode`. Innsjekkingen registreres umiddelbart ved innsending (det finnes ingen ventende tilstand); QR-koden styrer kun etikettutskrift på kiosken.

**Utskrift av etiketter fra telefon til kiosk** (`B1Checkin/app/scan.tsx`, nådd fra QR-knappen «Skann kode» på oppslagsskjermen): kiosken viser `CodeScanner` (en `expo-camera` `CameraView`, frontkamera som standard, kan snus) som skanner etter QR-koder. `ScanCodeHelper.parse()` godtar kun en nyttelast som er en ren 4-tegns kode i sikkerhetskodealfabetet, og `ScanCodeHelper.isRepeat()` ignorerer samme kode i 4 sekunder, slik at både B1App-QR-koden og et utskrevet etiketts QR-felt fungerer. Skjermen følger deretter gjenutskriftsstien ved utsjekking – `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` – og går tilbake til oppslag. Ingen oppmøteskriving skjer ved skanning; kun etiketter. Koder uten aktive besøk, stasjoner uten skriver og grupper uten etiketter viser hver en toast og går tilbake til oppslag.

Typer og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React-komponenter deles med B1Admin.

## Oppmøte på administratorsiden (B1Admin)

- **Oppsett** – `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) viser strukturtreet og oppretter tjenester (`ServiceEdit.tsx`) og tjenestetider (`ServiceTimeEdit.tsx`). Menighetsdata for campus kommer fra membership via `useCampuses()`-hooken.
- **Manuelt oppmøte** ligger på gruppesiden, ikke i oppmøteseksjonen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter økter (`POST /attendance/sessions`; ved tillegg kan `SessionEdit.tsx` inkludere én økt per annen gruppe som deler den valgte tjenestetiden, og hopper over grupper som allerede har en økt på den datoen), og markerer personer som tilstede via `POST /attendance/visitsessions/log`, som finner eller oppretter besøket for den personen og økten. Gruppeledere kan registrere oppmøte for egne grupper uten `attendance.edit`-tillatelsen – kontrollerne sjekker `au.leaderGroupIds`.
- **Rapportering** – trend for oppmøte og gruppeoppmøte er serverdefinerte rapporter (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi; definisjoner i `Api/reports/*.json`). Begge tar `startDate`/`endDate` (sluttdato inkludert); trendrapporten har som standard fra ett år siden til i dag og legger til en `sessionDates`-kolonne per uke, og gruppeoppmøtets trestruktur på skjermen inkluderer hvert besøks `checkinTime` og personens `membershipStatus`. CSV for gruppeoppmøte kommer fra den tilhørende `groupAttendanceDownload`-rapporten, som pivoteres av `GroupAttendanceDownloadHelper` til én rad per gruppemedlem med en tilstede/fraværende-kolonne per datert økt; personhistorikk hentes via `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettutskrift

### Maler og designer

Menighetene designer sine egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nådd fra innsjekkingsinnstillingene). En mal er en `labelTemplates`-rad der `content` er en JSON-liste med blokker – `text`, `field`, `barcode`, `qrcode` eller `box` – hver posisjonert i prosentkoordinater med skrift, justering, symbologi (`code39`/`code128`/`qr`) og valgfrie synlighetsbetingelser (f.eks. vis allergiboksen kun når `person.nametagNotes` er utfylt). Det finnes to `labelType`-er: `nametag` (én per innsjekket person; felt som `person.displayName`, `sessions`, `securityCode` og `person.isBirthdayWeek` – `"true"` når bursdagens måned/dag er innen 3 dager fra i dag, også over årsskiftet, beregnet av `LabelHelper.isBirthdayWithin()`) og `pickup` (én per familie; felt som `children`, `childrenAllergies`). Serveren håndhever én standard per type per menighet (`LabelTemplateController.save`). Designeren leveres med startmaler som speiler kioskens innebygde etiketter og forhåndsviser med eksempeldata.

### Rendering og utskrift på kiosken

Ved fullføring av innsjekking avgjør `B1Checkin/src/helpers/LabelHelper.ts` hva som skal skrives ut ut fra gruppeflaggene på hvert ventende besøk: navneskilt for `printNametag`-grupper, pluss én familiehentingsetikett hvis et besøk traff en `parentPickup`-gruppe. Besøk med `checkinType` `volunteer` hoppes over av `LabelHelper.selectChildVisits()`, så en barnepassfrivillig i et Parent Pickup-rom utløser aldri en hentingsetikett. Sikkerhetskoden fra innsjekkingssvaret settes på barnas navneskilt og hentingsetiketten; voksne navneskilt skrives ut uten kode. Hvis menigheten har maler, gjør `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blokker og et feltkontekst-objekt om til et frittstående HTML-dokument; ellers brukes de innebygde HTML-etikettene i `B1Checkin/assets/labels/` med plassholdererstatning.

Strekkoder genereres som innebygd SVG av rene TypeScript-enkodere i `B1Checkin/src/helpers/barcode.ts` – Code 39-mønstertabeller og Code 128-bredde-tabeller (kodesett B med mod-103-kontrollsum), pluss QR via `qrcode`-pakken. **Disse enkoderne er bevisst duplisert i B1Admin** (`LabelEditor.tsx` har de samme tabellene innlemmet, notert i en kodekommentar), slik at designerens forhåndsvisninger er pikselnøyaktige med kioskutskriften; en endring i den ene må speiles i den andre.

Utskriftsløpet (`src/components/PrintUI.tsx`) renderer hver HTML-etikett i en `WebView`, fanger den til JPG med `react-native-view-shot`, og sender bilde-URI-ene til den native **printer-helper**-Expo-modulen (`B1Checkin/modules/printer-helper/`). Modulen eksponerer `scan()`, `checkInit()`, `printUris()` og statushendelser, med en leverandør per merke på begge plattformer:

| Merke | Android | iOS | Merknader |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serien nettverksskrivere (QL-800/810W/820NWB/1100/1110NWB…), stansede 29×90-etiketter, den anbefalte standarden |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverksoppdagelse + TCP/ZPL-bildeutskrift |

Skrivervalget ligger i `app/printers.tsx` (nettverksskanning returnerer `brand~model~ip`-oppføringer; valget lagres i AsyncStorage), og `src/helpers/PrinterLog.ts` holder en diagnostikklogg på enheten som vises via en live statusprikk i kioskens topptekst.

## Gjesteregistrering

To veier oppretter en person midt i innsjekkingen:

- **På kiosken** – husstandsskjermens «Legg til gjest» åpner `B1Checkin/app/addGuest.tsx`, som først søker `GET /membership/people/search?term=` etter et eksisterende ikke-medlem-treff og ellers oppretter en med `POST /membership/people`, knyttet til gjeldende husstand. Gjesten går deretter gjennom gruppetilordning som et hvilket som helst medlem.
- **Selvbetjent via QR** – når menighetsinnstillingen `enableQRGuestRegistration` er på (konfigureres i B1Admins innsjekkingsinnstillinger, leses fra `GET /membership/settings/public/{churchId}`), viser kioskens oppslagsskjerm en QR-kode som lenker til `https://{subdomain}.b1.church/guest-register?serviceId=`. Denne B1App-siden (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en besøkende familie registrere seg selv på sin egen telefon via det anonyme endepunktet `POST /membership/people/guest-register`, slik at køen går videre. QR-arket har også en **Registrer her**-knapp som åpner samme side på kiosken (`app/guestRegister.tsx`) i en inkognito-`WebView` uten cache; `src/helpers/GuestRegisterHelper.ts` bygger URL-en for både QR-koden og `WebView`-en, og blokkerer navigasjon bort fra `https://{subdomain}.b1.church/guest-register`. Skjermen går tilbake til oppslag ved **Ferdig**, tilbake, eller etter 120 sekunder uten aktivitet (skriving i skjemaet videresendes fra `WebView`en som aktivitet), og avmonterer `WebView`en slik at en familie sine oppføringer aldri når neste familie.

## Relaterte sider

- [Oppmøteendepunkter](../api/endpoints/attendance) – Fullstendig REST-flate for campus, tjenester, økter, besøk og besøksøkter
- [Membership-endepunkter](../api/endpoints/membership) – Personer, husstander og grupper
- [Webhooks](../api/webhooks) – Hendelsene `session.created`, `attendance.recorded` og `attendance.checkout`
- [Modulstruktur](../api/module-structure) – Hvordan oppmøtemodulen er organisert på serversiden
