---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

Innsjekking er ett system med tre inngangsdører: B1Checkin-kioskappen for bemannede og selvbetjente stasjoner, selvinnsjekking inne i B1App-medlemsportalen, og admin-side oppmøte i B1Admin. Alle tre skriver til samme oppmøtemodul i kjerne-Apiet, og klasseromsruting drives helt av grupper — det finnes ingen separat "steder"- eller "rom"-entitet. Et barnesikkerhetslag ligger oppå: per-besøk innsjekkingstyper, server-side kapasitet- og frivillig-forholdssperrer, kiosk-side alder-/klassetrinnsberettigelse, betrodd hente-verifisering ved utsjekking, og foreldervarsling over kirkens tekstmeldingsleverandør. Denne siden kartlegger datamodellen, innsjekkingsflytene, sikkerhetslaget og etikettutskriftspipelinen.

</div>

## Oversikt

```
┌──────────────────────────┐
│ B1Checkin (Expo-kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  oppslag → husholdning → │  │         │ Api                                          │
│  grupper → fullfør/skriv │  │  HTTPS  │  ┌─ membership-modul ──────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (selvinnsjekking)  │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin-skjerm  │  │         │  ┌─ attendance-modul ──────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (ansatte)        │──┘         │  │ groupServiceTimes  (romruting)          │ │
│  oppsett · rapporter ·   │            │  │ sessions ← visitSessions → visits       │ │
│  etikettdesigner         │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Etikettutskriftssti (kun kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (etikettmaler, eller pakket HTML-fallback)
       └▶ LabelRenderer → HTML-dokument + inline SVG-strekkoder
            └▶ PrintUI: WebView-rendering → ViewShot JPG-fangst
                 └▶ printer-helper nativ modul → Brother QL / Zebra
```

| Flate | Repo | Stabel | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router filruting; EAS-bygg for Android, Amazon Fire og iOS; OTA-oppdateringer via `expo-updates` | Bemannet eller selvbetjent stasjon med etikettutskrift og verifisert utsjekking |
| Selvinnsjekking | `B1App` | Next.js (b1.church-medlemsportalen) | Innloggede medlemmer sjekker inn husholdningen sin fra en telefon; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tildeler grupper til tjenestetider, designer etiketter, registrerer manuelt oppmøte, kjører rapporter |

Alle tre kaller de samme to API-modulene gjennom `ApiHelper`: **MembershipApi** (`/membership`) for personer, husholdninger og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`)

| Entitet / tabell | Nøkkelfelt | Betydning |
|----------------|-----------|---------|
| `campuses` | name, address | Avviklet her — campuser mastres i medlemskapsmodulen (`/membership/campuses`); oppmøte-kopien er fryst skrivebeskyttet for eldre lesere (`models/Campus.ts`) |
| `services` | campusId, name | En tilbakevendende samling, f.eks. "Søndag morgen" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Et tidspunkt innenfor en tjeneste, f.eks. "09:00" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Koblingstabell: hvilke grupper (klasserom) møtes på hvilke tjenestetider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte for én gruppe på én dato — opprettet lat ved innsjekkingstidspunktet (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Én person som deltar på én dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = eldre medlem), satt av kiosken og konsumert av kapasitets-/forholdssperrene |
| `visitSessions` | visitId, sessionId | Hvilken(e) sesjon(er) et besøk dekker — et barn innsjekket til to tjenestetider får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokker) | Designbare etikett-oppsett (`models/LabelTemplate.ts`) |

### Hvordan en fullført innsjekking lagres

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Kroppen er en array av `Visit`-objekter, som hver bærer `visitSessions` hvis innebygde `session` bare navngir et `(serviceTimeId, groupId)`-par. Serveren gjør så følgende:

1. **Sperrer kapasitet og forhold før noen skriving.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sjekker hvert målrettede roms kapasitet, gjestekapasitet, lukket-flagg og frivillig-forhold mot nåværende belegg. postCheckin er **ikke transaksjonell**, så sperren må kjøre før den første lagringen — et hardt brudd returnerer en 409 som navngir det/de aktuelle rommet/rommene, og ingenting lagres. Se [Kapasitets- og frivillig-forholdssperrer](#capacity-and-volunteer-ratio-gates).
2. **Løser sesjoner lat.** `getSessionId()` finner eller oppretter `sessions`-raden for `(groupId, serviceTimeId, i dag)` — sesjons-id-er caches in-process per dato. Nye sesjoner sender ut en `session.created`-webhook. Løkken er en avventet `for..of` — en tidligere ild-og-glem `forEach(async …)` løp om kapp med lagringen og skrev NULL-sessionId-er ved opprettelse av første sesjon (fikset; notert i en kodekommentar ved løkken).
3. **Erstatter dagens poster.** Eventuelle eksisterende besøk for de personene ved den tjenesten i dag slettes sammen med deres visitSessions, og det innsendte settet lagres deretter. Å sjekke inn en familie på nytt er derfor en idempotent "dette er nåværende tilstand"-operasjon, ikke en tilføyelse. Å sende `?checkDuplicates=true` i stedet returnerer `{ duplicates: [personId…] }` uten å skrive, og det er slik kiosken advarer før overskriving.
4. **Genererer én sikkerhetskode per parti.** `SecurityCodeHelper.generate()` produserer en 4-tegns kode fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, slik at koder ikke kan stave ord eller mislesses). Serveren prøver på nytt ved kollisjon mot samme kirkes samme-dags åpne besøk og stempler koden på hvert besøk i partiet.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` mapper personId til antall sammenhengende uker med oppmøte; kiosken feirer milepæler (hver 5. uke) med konfetti.

Hvert lagrede besøk sender også ut en `attendance.recorded`-webhook. Lesesiden, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **siste loggede dato** — hvis det var en tidligere uke, fjernes id-ene, slik at klienten mottar en forhåndsutfylt kopi av forrige ukes romvalg som vil lagres som nye poster.

### Utsjekking

To endepunkter fullfører løkken (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens ikke-ennå-utsjekkede besøk som bærer denne sikkerhetskoden, med sesjoner fylt inn.
- `POST /attendance/visits/checkout` — kropp `{ visitIds, checkedOutBy?, checkedOutById? }`; stempler `checkoutTime` og hvem som hentet, og sender ut en `attendance.checkout`-webhook per besøk.

Tillatelser: kiosker autentiserer med `attendance.checkin`, som gir nøyaktig innsjekkings-/utsjekkings-/etikettmalflaten; `attendance.view`/`attendance.edit` dekker rapportering og manuell registrering; strukturen (tjenester, tjenestetider, gruppetildelinger) krever `services.edit`.

## Grupper driver romruting

Det finnes ingen rom- eller klasseromsentitet noe sted i systemet. Et "rom" er en medlemskaps**gruppe** med `trackAttendance` aktivert, koblet til én eller flere tjenestetider gjennom `groupServiceTimes`. Gruppefeltene (på `Api/src/modules/membership/models/Group.ts`) som former kioskatferd:

| Felt | Effekt |
|------|--------|
| `trackAttendance` | Om gruppen i det hele tatt deltar i oppmøte; B1Admins oppsett-tre flagger `trackAttendance`-grupper uten noen `groupServiceTimes`-rad som utildelt |
| `parentPickup` | Markerer et barnerom: innsjekking til det gjør besøket til et "barn"-besøk, som skriver ut en familiehentelapp og legger sikkerhetskoden på navnelappen |
| `printNametag` | Om innsjekkinger til denne gruppen i det hele tatt skriver ut en navnelapp |
| `capacity` / `guestCapacity` / `checkinClosed` | Romkapasitetsgrenser og en hard "lukket"-bryter, håndhevet server-side av innsjekkingssperren (redigeres i B1Admins gruppeinnstillinger under "Innsjekkingskapasitet") |
| `volunteerRatio` / `minVolunteers` | Forhold barn per frivillig og minimum antall frivillige, håndhevet i henhold til kirkens overordnede innstilling `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alders-/klassetrinnsberettigelse-grenser evaluert på kiosk-siden for å fremheve eller nedtone rom |

Hver klient denormaliserer på samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): last `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, og `GET /membership/groups` parallelt, og for hver tjenestetid samle så gruppene hvis `groupServiceTimes`-rad peker på den, inn i `serviceTime.groups`. Det arrayet er det romvelgeren viser, organisert etter gruppens `categoryName`.

Tildelinger redigeres fra gruppens side i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), og hele treet Campus → Tjeneste → Tjenestetid → Gruppe visualiseres i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er den eneste kilden til sannhet, driver det samme gruppemedlemskapet kioskruting, listestil-oppmøte i B1Admins gruppesider, og oppmøterapportering — å tildele en gruppe til en tjenestetid er det eneste steget som trengs for å gjøre den til et innsjekkingsmål.
:::

## Barnesikkerhet

### Innsjekkingstyper

Hvert besøk bærer en `checkinType` — `member`, `guest`, eller `volunteer` (NULL betyr eldre/medlem; migrasjon `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **på kiosk-siden**: Medlem-/Gjest-/Frivillig-chips på den utvidede medlemsraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), stemplet på hvert ventende besøk ved fullføring (`app/checkinComplete.tsx`, med `member` som standard). Serveren konsumerer den i sperren — frivillige teller mot forholdsdekning i stedet for mot kapasitet, og gjester teller mot `guestCapacity`.

### Kapasitets- og frivillig-forholdssperrer

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjører inne i `postCheckin` før noen lagring (endepunktet er ikke-transaksjonelt, så sperring-før-lagring er korrekthetsmekanismen). Den laster nåværende belegg per målrettet gruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigurasjonen gjennom medlemskapsmodulens gateway, og klassifiserer deretter brudd:

- **Harde (alltid blokk):** `checkinClosed`, `current + incoming > capacity`, gjesteantall over `guestCapacity`. Partiet avvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosken viser det navngitte rommet.
- **Forhold (advarsel eller blokk):** innkommende ikke-frivillige inn i et rom der `volunteers < minVolunteers`, ingen frivillige i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighetsgraden følger kirkens innstilling `ratioEnforcement` (`"warn"` som standard / `"block"`, redigeres i B1Admin Administrer kirke → Innsjekking, `CheckinSettingsEdit.tsx`). Advarselsmodus returnerer `409 { warning: true, error: "ratio", … }` med mindre klienten sender inn på nytt med `acknowledgeWarnings=true` — det gjensendte er kioskens ansattbekreftelses-overstyring.

### Alders-/klassetrinnsberettigelse (kiosk-side)

Romberettigelse er rådgivende UI, evaluert på kiosken, ikke håndhevet av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klassetrinn mot gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (klassetrinnsrekkefølge: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` — manglende data gir `unknown` og skjuler aldri et rom. Alder og klassetrinn beregnes per kirkens **klassetrinns-forfremmelsesdato** (innstillingen `gradePromotionDate`, `"MM-DD"`, redigeres i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` velger den nyeste forekomsten på eller før i dag. Romvelgeren fremhever berettigede rom og nedtoner ikke-berettigede; å velge et nedtonet rom krever en ansattbekreftelse.

### Betrodd og ikke-autorisert henting

Hentepersoner er en medlemskapsentitet, per husholdning: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (enhver autentisert kirkebruker, så kiosker kan lese den) pluss `POST` / `DELETE` sperret av `people.edit`. Ansatte administrerer listen på personsidens **Henting**-kort (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relasjon, og en Betrodd/Ikke autorisert-statuschip.

Ved utsjekking (`B1Checkin/app/checkout.tsx`) laster kiosken husholdningens henteliste: `trusted`-oppføringer gjengis som trykkbare hentekort ved siden av bildenettet med husholdningens voksne, og et fritt skrevet "Annet"-navn fuzzy-matches (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized`-oppføringer — et treff blokkerer utsjekking med et advarselsark og en **Overstyr**-knapp for ansatte. Overstyringen logges på selve besøket: den poster `checkedOutBy` som `"OVERRIDE: {name}"` gjennom den vanlige `POST /attendance/visits/checkout`, slik at den havner i oppmøteposten og `attendance.checkout`-webhooken i stedet for en separat revisjonstabell.

### Varsle en forelder og nødvarsling

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) eksponerer to SMS-endepunkter:

- `POST /page` — `{ visitId, message }`: varsler foresatte til ett innsjekket barn (kioskens utsjekkingsskjerm, bemannet modus).
- `POST /broadcast` — `{ serviceId, message }`: sender SMS til alle voksne i alle innsjekkede husholdninger for en tjeneste (kioskens admininnstillinger, bak et bekreftelsesark der man skriver typen `EMERGENCY` for å bekrefte, i `B1Checkin/app/adminSettings.tsx`).

Begge løser husholdningens voksne gjennom medlemskapsmodulens gateway, og overlater deretter levering til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — den kryss-modulære døren inn til kirkens konfigurerte tekstmeldingsleverandør (`@churchapps/texting`: TextInChurch, Clearstream, eller MutualMinistry; det finnes ingen innebygd SMS-avsender). Gatewayen logger en `sentText`-rad pluss per-mottaker `deliveryLog`-oppføringer og setter et tak på 500 mottakere per parti; uten en konfigurert leverandør returnerer den `no_provider`, som kiosken viser som "Ingen SMS-leverandør konfigurert". Controllerens `dispatch()` fjerner duplikate telefonnumre og hopper over personer uten mobilnummer eller med `optedOut` satt, og returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }` slik at kiosken kan vise hva som ble hoppet over.

## Kiosken (B1Checkin)

Skjermer er expo-router-filer under `B1Checkin/app/`; tilstand på tvers av skjermer lever i en statisk `CachedData`-klasse (`src/helpers/CachedData.ts`), ikke React-tilstand.

```
index (oppstart/auto-innlogging) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             laster serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ skriv ut etiketter,
             groupServiceTimes,           │             └▶ checkout (bemannet)          auto-retur
             labelTemplates               │                                            til lookup
```

1. **Oppslag** (`app/lookup.tsx`) — søk etter telefon (`GET /membership/people/search/phone?number=`, siste 4 sifre eller fullt nummer) eller etter navn (`GET /membership/people/search?term=`). Å velge et treff laster husholdningen (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), og forhåndsutfyller `pendingVisits` med forrige ukes valg.
2. **Husholdningsgjennomgang** (`app/household.tsx`, `src/components/MemberList.tsx`) — hver medlemsrad viser en allerede-innsjekket-merking, allergi-/`nametagNotes`-merking, og deres nåværende romchips. Å utvide et medlem lister hver tjenestetid med en romknapp pluss Medlem-/Gjest-/Frivillig-innsjekkingstype-chips (`MemberServiceTimes.tsx`).
3. **Gruppetildeling** (`app/selectGroup.tsx`) — et kategoritre bygget fra `serviceTime.groups`, med alders-/klassetrinnsberettigede rom fremhevet og ikke-berettigede nedtonet bak en ansattbekreftelse (se [Alders-/klassetrinnsberettigelse](#agegrade-eligibility-kiosk-side)); å velge et rom skriver en `{ session: { serviceTimeId, groupId } }`-visitSession inn i den personens ventende besøk (`src/helpers/VisitSessionHelper.ts`). "Ingen" fjerner den.
4. **Fullfør** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` med `pendingVisits` (hver stemplet med sin `checkinType`), skriver deretter ut etiketter hvis en skriver er konfigurert, og går automatisk tilbake til oppslag. Et `409`-kapasitetssvar viser det navngitte fulle/lukkede rommet; en forholdsadvarsel tilbyr en ansattbekreftelse som sender inn på nytt med `acknowledgeWarnings=true`.

**Utsjekkings**-skjermen (`app/checkout.tsx`) godtar den 4-tegns sikkerhetskoden gjennom et auto-fokusert innfelt — slik at USB-/Bluetooth-tastatur-emulerende strekkodelesere fungerer uten kamera — eller et skjermtastatur som bruker samme alfabet, og sender automatisk inn ved 4 tegn. Den slår opp koden, viser barna som hentes, og presenterer husholdningens **betrodde hentepersoner** som trykkbare kort ved siden av et bildenett av husholdningens voksne (pluss et "Annet"-fritekstalternativ som fuzzy-sjekkes mot ikke-autoriserte navn — se [Betrodd og ikke-autorisert henting](#trusted-and-not-authorized-pickup)), og poster deretter `POST /attendance/visits/checkout` med henterens navn/id. I bemannet modus tilbyr skjermen også **Varsle en forelder** (`POST /attendance/checkin/page`) og en **sikkerhetsetikett-omutskrift** — `reprint()` bygger familiens etiketter på nytt med `LabelHelper.getAllLabelsFor(...)` og mater dem gjennom den samme `PrintUI`-pipelinen som innsjekking.

Stasjonens personlighet er et AsyncStorage-flagg `@StationMode` (`"self"` | `"manned"`, byttes i `app/adminSettings.tsx`). Bemannet modus legger til utsjekkingsinngangen på oppslagsskjermen og redigering av per-medlem-profil (`POST /membership/people`) fra husholdningsskjermen. Kioskherding er innebygd: en valgfri PIN-kode (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) sperrer admin- og skriverskjermene, adminskjermen åpnes kun via 7 raske trykk på header-logoen, og en inaktiv fangeskjerm (`src/hooks/useInactivityTimer.ts`) tar over mellom familier.

## Selvinnsjekking (B1App)

Medlemmer sjekker inn fra b1.church-portalen på `/mobile/checkin`-skjermen (rutet av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Det krever en innlogget bruker og går gjennom de samme fire stegene som kiosken — tjenester → husholdning → grupper → fullfør — mot identiske endepunkter, med tilstand holdt i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kiosken: husholdningen kommer fra den innloggede brukerens egen `householdId` (ikke noe søketrinn), og det finnes ingen etikettutskrift — i stedet viser fullføringsskjermen partiets sikkerhetskode som en QR-kode (`qrcode.react`) med en hint om å "vise dette på en innsjekkingsstasjon". Hvis husholdningen allerede er sjekket inn når siden lastes, viser en "Vis innsjekkingskode"-knapp QR-koden på nytt fra det eksisterende besøkets `securityCode`. Innsjekkingen registreres umiddelbart ved innsending (det finnes ingen ventende tilstand); QR-koden driver kun etikettutskrift på kiosken.

**Telefon-til-kiosk-etikettutskrift** (`B1Checkin/app/scan.tsx`, nås fra "Skann kode"-knappen på oppslagsskjermen): kiosken åpner en `expo-camera` `CameraView` (frontkamera som standard, kan snus) som skanner etter QR-koder. En skannet nyttelast godtas når den er en ren 4-tegns kode i sikkerhetskode-alfabetet, slik at både B1App-QR-koden og en utskrevet etiketts QR-blokk fungerer. Skjermen følger deretter samme sti som utsjekkings-omutskrift — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — og går tilbake til oppslag. Ingen oppmøteskriving skjer ved skanningstidspunktet; kun etiketter. Koder uten aktive besøk, stasjoner uten skriver, og grupper uten etiketter viser hver en toast og går tilbake til oppslag.

Typer og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React-komponenter deles med B1Admin.

## Admin-side oppmøte (B1Admin)

- **Oppsett** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) gjengir strukturtreet og oppretter tjenester (`ServiceEdit.tsx`) og tjenestetider (`ServiceTimeEdit.tsx`). Campus-data kommer fra medlemskap via `useCampuses()`-kroken.
- **Manuelt oppmøte** ligger på Grupper-siden, ikke i oppmøteseksjonen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter sesjoner (`POST /attendance/sessions`) og markerer personer som til stede via `POST /attendance/visitsessions/log`, som finner eller oppretter besøket for den personen og sesjonen. Gruppeledere kan registrere oppmøte for sine egne grupper uten `attendance.edit`-tillatelsen — controllerne sjekker `au.leaderGroupIds`.
- **Rapportering** — oppmøtetrend og gruppeoppmøte er server-definerte rapporter (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi); per-persons historikk er `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettutskrift

### Maler og designeren

Kirker designer sine egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nås fra innsjekkingsinnstillingssiden). En mal er en `labelTemplates`-rad hvis `content` er et JSON-array av blokker — `text`, `field`, `barcode`, `qrcode`, eller `box` — hver plassert i prosentkoordinater med skrift, justering, symbologi (`code39`/`code128`/`qr`), og valgfrie synlighetsbetingelser (f.eks. bare gjengi allergiboksen når `person.nametagNotes` er ikke-tom). To `labelType`-er finnes: `nametag` (én per innsjekket person; felt som `person.displayName`, `sessions`, `securityCode`) og `pickup` (én per familie; felt som `children`, `childrenAllergies`). Serveren håndhever én standard per type per kirke (`LabelTemplateController.save`). Designeren leveres med startmaler som speiler kioskens innebygde etiketter, og forhåndsviser mot eksempeldata.

### Rendering og utskrift på kiosken

Ved fullført innsjekking bestemmer `B1Checkin/src/helpers/LabelHelper.ts` hva som skal skrives ut, basert på gruppeflaggene på hvert ventende besøk: navnelapper for `printNametag`-grupper, pluss én familiehentelapp hvis noen av besøkene traff en `parentPickup`-gruppe. Sikkerhetskoden fra innsjekkingssvaret havner på barns navnelapper og hentelappen; voksnes navnelapper skrives ut uten kode. Hvis kirken har maler, gjør `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blokker + en feltkontekst om til et frittstående HTML-dokument; ellers brukes pakkede HTML-etiketter i `B1Checkin/assets/labels/` med plassholder-erstatning.

Strekkoder genereres som inline SVG av rene TypeScript-kodere i `B1Checkin/src/helpers/barcode.ts` — Code 39-mønstertabeller og Code 128 (kodesett B med mod-103-sjekksum) breddetabeller, pluss QR via `qrcode`-pakken. **Disse koderne er bevisst duplisert i B1Admin** (`LabelEditor.tsx` har de samme tabellene inline, notert i en kodekommentar) slik at designerens forhåndsvisninger er pikselnøyaktige mot kioskens utdata; en endring i én må speiles i den andre.

Utskriftspipelinen (`src/components/PrintUI.tsx`) gjengir hver HTML-etikett i en `WebView`, fanger den til JPG via `react-native-view-shot`, og gir bilde-URI-ene videre til den native **printer-helper**-Expo-modulen (`B1Checkin/modules/printer-helper/`). Modulen eksponerer `scan()`, `checkInit()`, `printUris()`, og statushendelser, med én leverandør per merke på begge plattformer:

| Merke | Android | iOS | Notater |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-utskrifts-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serie nettverksskrivere (QL-800/810W/820NWB/1100/1110NWB…), formkuttede 29×90-etiketter, den anbefalte standarden |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverksoppdagelse + TCP/ZPL-bildeutskrift |

Skrivervalg ligger på `app/printers.tsx` (nettverksskanning returnerer oppføringer på formen `brand~model~ip`; valget lagres i AsyncStorage), og `src/helpers/PrinterLog.ts` holder en diagnostisk logg på enheten som vises gjennom en live statusprikk i kioskens header.

## Gjesteregistrering

To stier oppretter en person midt i innsjekkingen:

- **På kiosken** — "Legg til gjest" på husholdningsskjermen åpner `B1Checkin/app/addGuest.tsx`, som først søker `GET /membership/people/search?term=` etter et eksisterende ikke-medlemstreff og ellers oppretter en med `POST /membership/people`, knyttet til gjeldende husholdning. Gjesten går deretter gjennom gruppetildeling som ethvert medlem.
- **Selvbetjening via QR** — når kirkeinnstillingen `enableQRGuestRegistration` er på (konfigurert i B1Admins innsjekkingsinnstillinger, lest fra `GET /membership/settings/public/{churchId}`), viser kioskens oppslagsskjerm en QR-kode som lenker til `https://{subdomain}.b1.church/guest-register?serviceId=`. Den B1App-siden (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en besøkende familie registrere seg selv på sin egen telefon gjennom det anonyme `POST /membership/people/guest-register`-endepunktet, slik at kiosk-køen holder tritt.

## Relaterte sider

- [Oppmøte-endepunkter](../api/endpoints/attendance) -- Full REST-flate for campuser, tjenester, sesjoner, besøk og besøkssesjoner
- [Medlemskaps-endepunkter](../api/endpoints/membership) -- Personer, husholdninger og grupper
- [Webhooks](../api/webhooks) -- Hendelsene `session.created`, `attendance.recorded` og `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Hvordan oppmøtemodulen er organisert server-side
