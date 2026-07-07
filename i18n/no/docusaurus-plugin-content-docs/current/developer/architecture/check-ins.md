---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

Innsjekking er ett system med tre forøvelser: B1Checkin kiosk appen for bemanned og selvbetjente stasjoner, selvinnsjekking innsiden B1App medlemsportalen, og admin-side oppmøte i B1Admin. Alle tre skriver til samme oppmøtemodul i kjernens Api, og klasserom ruting drives helt av grupper — det er ingen separat "steder" eller "rom" entitet. Et barnesikkerhets lag sitter på toppen: per-besøk innsjekkings typer, server-side kapasitet og frivillighets forhold porter, kiosk-side alder/klasse berettigelse, betrodd hentet verifisering ved sjekking ut, og forelder sending over kirkens tekstmeldings leverandør. Denne siden kartlegger data modellen, innsjekkings flyten, sikkerhets laget, og etikett utskrifts rørledningen.

</div>

## Oversikt

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership modul ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance modul ──────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (romruting)          │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Etikett utskrifts sti (kun kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (etikett maler, eller samlet HTML tilbakefall)
       └▶ LabelRenderer → HTML dokument + inline SVG strekkoder
            └▶ PrintUI: WebView gjengivelse → ViewShot JPG fangst
                 └▶ printer-helper innfødt modul → Brother QL / Zebra
```

| Flate | Depo | Stabel | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router fil ruting; EAS bygger for Android, Amazon Fire, og iOS; OTA oppdateringer via `expo-updates` | Bemanned eller selvbetjent stasjon med etikett utskrift og verifisert sjekking ut |
| Selvinnsjekking | `B1App` | Next.js (b1.church medlemsportal) | Innloggede medlemmer sjekker husholdningen sin fra en telefon; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tildeler grupper til tjeneste tider, designer etiketter, registrerer manuelt oppmøte, kjører rapporter |

Alle tre kaller samme to API moduler gjennom `ApiHelper`: **MembershipApi** (`/membership`) for personer, husholdninger, og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`)

| Entitet / tabell | Nøkkel felt | Betydning |
|----------------|-----------|---------|
| `campuses` | name, address | Avskrevet her — campuser er mastered i medlemskaps modulen (`/membership/campuses`); kopien av oppmøte er frosset skrivebeskyttet for eldre lesere (`models/Campus.ts`) |
| `services` | campusId, name | En gjentakende samling, f.eks. "Søndag morgen" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | En tidsslot innsiden en tjeneste, f.eks. "09:00" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join tabell: hvilke grupper (klasserom) møtes på hvilke tjeneste tider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte av en gruppe på en dato — opprettet lat ved innsjekkings tid (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | En person som deltar på en dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = eldre medlem), satt av kiosken og konsumert av kapasitets/forhold porta |
| `visitSessions` | visitId, sessionId | Hvilken sesjon(er) et besøk dekker — et barn innsjekket til to tjeneste tider får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blokker) | Designbare etikett layout (`models/LabelTemplate.ts`) |

### Hvordan en fullført innsjekking vedvarer

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Kroppen er en rekke av `Visit` objekter, som hver bærer `visitSessions` hvis innebygde `session` bare navngir en `(serviceTimeId, groupId)` par. Serveren så:

1. **Porter kapasitet og forhold før noen skriving.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sjekker hver målrettet roms kapasitet, gjest kapasitet, lukket flagg, og frivillighets forhold mot nåværende okkupasjon. postCheckin er **ikke transaksjonell**, så porta må kjøre før første lagring — en hard brudd returnerer en 409 navngir offending rom(er) og ingenting er vedvarende. Se [Kapasitet og frivillighets forhold porta](#capacity-and-volunteer-ratio-gates).
2. **Løser sesjoner lat.** `getSessionId()` finner eller oppretter `sessions` raden for `(groupId, serviceTimeId, i dag)` — sesjon ids er bufret i-prosess per dato. Nye sesjoner sender en `session.created` webhook. Løkken er en avventet `for..of` — en tidligere ild-og-glemme `forEach(async …)` løp skriving og skrev NULL sessionIds på første-sesjon opprettelse (fast; notert i en kode kommentar på løkken).
3. **Erstatter dagens poster.** Ethvert eksisterende besøk for disse personene ved denne tjenesten i dag blir slettet sammen med visitSessions, så det sendte settet lagres. Re-sjekking-i en familie er derfor en idempotent "Dette er nåværende tilstand" operasjon, ikke en tillegg. Passering `?checkDuplicates=true` i stedet returnerer `{ duplicates: [personId…] }` uten skriving, som er hvordan kiosken advarer før overskriving.
4. **Genererer en sikkerhetskode per parti.** `SecurityCodeHelper.generate()` produserer en 4-tegns kode fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, så kodene kan ikke stave ord eller mislest). Serveren prøver igjen på kollisjon mot samme kirkes samme-dag åpne besøk og stempel kode på hver besøk i partiet.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` maps personId til påfølgende-uke oppmøte telling; kiosken feirer milepeler (hver 5. uke) med konfetti.

Hver lagret besøk sender også en `attendance.recorded` webhook. Les siden, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **siste loggede dato** — hvis det var en tidligere uke ids blir fjernet, så klienten mottar en før-utfylt kopi av forrige ukes rom valg som vil lagre som nye poster.

### Sjekking ut

To endepunkter fullfører løkken (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens ikke-ennå-sjekket-ut besøk som bærer denne sikkerhetskoden, med sesjoner populert.
- `POST /attendance/visits/checkout` — kropp `{ visitIds, checkedOutBy?, checkedOutById? }`; stempel `checkoutTime` og hvem som plukket opp, og sender en `attendance.checkout` webhook per besøk.

Tillatelser: kiosker autentiserer med `attendance.checkin`, som gir nøyaktig innsjekkings/sjekking ut/etikett-template overflaten; `attendance.view`/`attendance.edit` dekker rapportering og manuell innsetting; strukturen (tjenester, tjeneste tider, gruppe tildeling) krever `services.edit`.

## Grupper driver romruting

Det er ingen rom eller klasserom entitet noe sted i systemet. Et "rom" er et medlemskaps **gruppe** med `trackAttendance` aktivert, koblet til en eller flere tjeneste tider gjennom `groupServiceTimes`. Gruppe feltene (på `Api/src/modules/membership/models/Group.ts`) som former kiosk oppførsel:

| Felt | Virkning |
|------|--------|
| `trackAttendance` | Gruppe deltar i oppmøte i det hele tatt; B1Admin oppsett tre flagg `trackAttendance` grupper med nei `groupServiceTimes` rad som utildelt |
| `parentPickup` | Markerer et barn rom: innsjekking til det gjør besøket et "barn" besøk, som skriver en familie hentelabel og legger sikkerhetskoden på navnakken |
| `printNametag` | Hvorvidt innsjekkinger til denne gruppen skriver en navnetikett i det hele tatt |
| `capacity` / `guestCapacity` / `checkinClosed` | Rom kapasitets grenser og en hard "lukket" bryter, gjennomtvunget server-side av innsjekkings porta (redigert i B1Admin gruppe innstillinger under "Innsjekkings kapasitet") |
| `volunteerRatio` / `minVolunteers` | Barn-per-frivillighets forhold og minimum frivillighets antall, gjennomtvunget per kirkens hele `ratioEnforcement` innstilling |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alder/klasse berettigelse grenser evaluert kiosk-side til å fremheve eller dusj rom |

Hver klient denormaliserer på samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): laste `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, og `GET /membership/groups` i parallell, så for hver tjeneste tid samle gruppene hvis `groupServiceTimes` rad peker på det inn i `serviceTime.groups`. At array er hva som romvelger viser, organisert etter gruppe `categoryName`.

Oppgaver blir redigert fra gruppens side i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), og hele Campus → Tjeneste → Tjeneste tid → Gruppe tre blir visualisert i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er den eneste kilden til sannhet, samme gruppe medlemskap krefter kiosk ruting, liste-stil oppmøte i B1Admin gruppe sider, og oppmøte rapportering — tildeling av en gruppe til en tjeneste tid er den eneste trinn som trengs for å gjøre det en innsjekking destinasjon.
:::

## Barnesikkerhet

### Innsjekkings typer

Ethvert besøk bærer en `checkinType` — `member`, `guest`, eller `volunteer` (NULL betyr eldre/medlem; migrasjon `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **kiosk-side**: Medlem / Gjest / Frivillighets sjetonger på den utvidete medlem rad (`B1Checkin/src/components/MemberServiceTimes.tsx`), stempel på hver ventende besøk ved fullføring (`app/checkinComplete.tsx`, standard til `member`). Serveren konsumerer det i porta — frivillige teller mot forhold dekning i stedet for mot kapasitet, og gjester teller mot `guestCapacity`.

### Kapasitet og frivillighets forhold porta

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjører innsiden `postCheckin` før noen lagring (endepunktet er ikke-transaksjonell, så porta-før-lagring er korrekthets mekanisme). Det laster nåværende okkupasjon per målrettet gruppe (`VisitRepo.countActiveByGroupToday`) og gruppe konfig gjennom medlemskaps modul gateway, så klassifiserer brudd:

- **Hard (alltid blokk):** `checkinClosed`, `current + incoming > capacity`, gjest tell over `guestCapacity`. Partiet blir avvist med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosken viser det navngitte rom.
- **Forhold (advarsler eller blokk):** innkommende ikke-frivillige inn i et rom hvor `volunteers < minVolunteers`, ingen frivillige i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighet følger per-kirke innstillingen `ratioEnforcement` (`"warn"` standard / `"block"`, redigert i B1Admin Administrer kirke → Innsjekking, `CheckinSettingsEdit.tsx`). Advarsel-modus returnerer `409 { warning: true, error: "ratio", … }` med mindre klienten gjeninnleverer med `acknowledgeWarnings=true` — at gjeninnlevert er kiosk stab-bekreft overstyring.

### Alder/klasse berettigelse (kiosk-side)

Rom berettigelse er rådgivende UI, evaluert på kiosken, ikke gjennomtvunget av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klasse mot gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (klasse rekkefølge: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` — manglende data gir `unknown` og aldri skjuler et rom. Aldre og klasser blir beregnet som av kirkens **klasse promosjonsdato** (`gradePromotionDate` innstilling, `"MM-DD"`, redigert i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter det fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` plukker den mest nylige forekomst på eller før i dag. Rom velgeren fremhever berettigede rom og dunster uberettigede; plukking av dunst rom krever en stab bekreftelse.

### Betrodd og ikke-autorisert hentet

Hentet personer er en medlemskaps entitet, per husholdning: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (noen som helst autentisert kirke bruker, så kiosker kan lese det) pluss `POST` / `DELETE` gated av `people.edit`. Stab administrer listen på person siden **Hentet** kort (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, forhold, og en Betrodd/Ikke autorisert status sjeton.

Ved sjekking ut (`B1Checkin/app/checkout.tsx`) kiosken laster husholdningen hentet liste: `trusted` poster gjengivelse som trykbar hentet kort sammen husholdning-voksen foto grid, og en fri-skrevet "Annen" navn er fuzzy-matchet (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized` poster — en match blokker sjekking ut med en advarsel ark og en stab **Overstyring** knapp. Overstyringen blir loggett på besøket selv: det poster `checkedOutBy` som `"OVERRIDE: {name}"` gjennom normal `POST /attendance/visits/checkout`, så det lander i oppmøte post og `attendance.checkout` webhook snarere enn en separat revisjon tabell.

### Send forelder og nødkringkasting

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) avslører to SMS endepunkter:

- `POST /page` — `{ visitId, message }`: sender foresatte av en innsjekket barn (kiosk sjekking ut skjerm, bemande modus).
- `POST /broadcast` — `{ serviceId, message }`: tekster hver innsjekket husholdnings voksne for en tjeneste (kiosk admin innstillinger, bak en type-`EMERGENCY`-til-bekreft ark i `B1Checkin/app/adminSettings.tsx`).

Begge løse husholdning voksne gjennom medlemskaps gateway, så hand levering til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — kors-modul dør inn i kirkens konfigurerte tekstmeldings leverandør (`@churchapps/texting`: TextInChurch, Clearstream, eller MutualMinistry; det er ingen innebygd SMS sender). Gateway logger en `sentText` rad pluss per-mottaker `deliveryLog` poster og tak et parti på 500 mottakere; uten leverandør konfigurert det returnerer `no_provider`, som kiosken flate som "Ingen SMS leverandør konfigurert". Controlleren `dispatch()` dedupes telefon nummer og hopper personer med ingen mobile eller `optedOut` satt, returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }` så kiosken kan vise hva ble hoppet over.

## Kiosken (B1Checkin)

Skjermer er expo-router filer under `B1Checkin/app/`; kors-skjerm tilstand lever i en statisk `CachedData` klasse (`src/helpers/CachedData.ts`), ikke React tilstand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             laster serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (bemanne)          auto-return
             labelTemplates               │                                            til lookup
```

1. **Lookup** (`app/lookup.tsx`) — søk etter telefon (`GET /membership/people/search/phone?number=`, siste-4 eller full) eller etter navn (`GET /membership/people/search?term=`). Velging av et samsvar laster husholdningen (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), frøing `pendingVisits` med forrige ukes valg.
2. **Husholdnings gjennomgang** (`app/household.tsx`, `src/components/MemberList.tsx`) — hver medlem rad viser en allerede-innsjekket badge, allergi/`nametagNotes` badge, og deres nåværende rom sjetonger. Utvidelse av medlem lister hver tjeneste tid med en rom knapp pluss medlem / gjest / frivillighets innsjekkings-type sjetonger (`MemberServiceTimes.tsx`).
3. **Gruppe tildeling** (`app/selectGroup.tsx`) — en kategori tre bygget fra `serviceTime.groups`, med alder/klasse-berettigete rom fremhevet og uberettigede dunst bak en stab bekreftelse (se [Alder/klasse berettigelse](#agegrade-eligibility-kiosk-side)); plukking av et rom skriver en `{ session: { serviceTimeId, groupId } }` visitSession inn i den persons ventende besøk (`src/helpers/VisitSessionHelper.ts`). "Ingen" sletter det.
4. **Kompletter** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` med `pendingVisits` (hver stemplet med sin `checkinType`), så utskrifter etikett hvis en skriver er konfigurert og auto-returnerer til lookup. En `409` kapasitets respons viser det navngitte fulle/lukkete rom; et forhold advarsel tilbyr en stab bekreftelse som gjeninnleverer med `acknowledgeWarnings=true`.

**Sjekking ut** skjermen (`app/checkout.tsx`) godtar 4-tegns sikkerhetskoden gjennom en auto-fokusert innsetting — så USB/Bluetooth tastatur-kile strekkode skannere fungerer uten kamera — eller en on-skjerm tastatur bruker samme alfabet, auto-innlegge på 4 tegn. Det slår opp koden, viser barna som blir plukket opp, og presenterer husholdningen **betrodde hentet personer** som trykbar kort sammen husholdning voksne foto grid (pluss en "Annen" fri-tekst alternativ som er fuzzy-sjekket mot ikke-autorisert navn — se [Betrodd og ikke-autorisert hentet](#trusted-and-not-authorized-pickup)), så poster `POST /attendance/visits/checkout` med hentet persons navn/id. I bemanne modus skjermen også tilbyr **Send forelder** (`POST /attendance/checkin/page`) og en **sikkerhetsetikett omutskrift** — `reprint()` gjenoppbygger familiens etikett med `LabelHelper.getAllLabelsFor(...)` og fôr dem gjennom samme `PrintUI` rørledning som innsjekking.

Stasjon personlighet er en AsyncStorage flagg `@StationMode` (`"self"` | `"manned"`, slått i `app/adminSettings.tsx`). Bemanne modus legger til sjekking ut innsetting på lookup skjermen og per-medlem profil redigering (`POST /membership/people`) fra husholdnings skjermen. Kiosk herding er innebygd: en valgfri PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) porter admin og skriver skjermer, admin skjermen åpner bare via 7 raske trykk på header logo, og en lat attraksjon skjerm (`src/hooks/useInactivityTimer.ts`) tar over mellom familier.

## Selvinnsjekking (B1App)

Medlemmer sjekk i fra b1.church portalen på `/mobile/checkin` skjermen (rutert av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Det krever en innlogget bruker og går samme fire trinn som kiosken — tjenester → husholdning → grupper → kompletter — mot identiske endepunkter, med tilstand som holdes i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kiosken: husholdningen kommer fra den innloggede brukeren egen `householdId` (ingen søk trinn), og flyten ender på en bekreftelse skjerm — ingen sikkerhetskode display og ingen etikett utskrift. Typer og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React komponenter blir delt med B1Admin.

## Admin-side oppmøte (B1Admin)

- **Oppsett** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) gjengivelse strukturen tre og oppretter tjenester (`ServiceEdit.tsx`) og tjeneste tider (`ServiceTimeEdit.tsx`). Campus data kommer fra medlemskap via `useCampuses()` krok.
- **Manuelt oppmøte** lever på gruppenes side, ikke oppmøte seksjonen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter sesjoner (`POST /attendance/sessions`) og markerer personer til stede via `POST /attendance/visitsessions/log`, som finner-eller-oppretter besøket for den persons sesjon. Gruppe ledere kan registrere oppmøte for deres egne grupper uten `attendance.edit` tillatelse — kontrollere sjekk `au.leaderGroupIds`.
- **Rapportering** — oppmøte trend og gruppe oppmøte er server-definert rapporter (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi); per-persons historie er `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikett utskrift

### Maler og designeren

Kirker designer sine egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nådd fra innsjekking innstillings siden). En mal er en `labelTemplates` rad hvis `content` er en JSON rekke av blokker — `text`, `field`, `barcode`, `qrcode`, eller `box` — hver plassert i prosent koordinater med skrift, justering, symbologi (`code39`/`code128`/`qr`), og valgfri synlighets betingelser (f.eks. bare gjengivelse allergi boksen når `person.nametagNotes` er ikke-tom). To `labelType`s eksisterer: `nametag` (en per innsjekket person; felt som `person.displayName`, `sessions`, `securityCode`) og `pickup` (en per familie; felt som `children`, `childrenAllergies`). Serveren håndhever en enkelt standard per type per kirke (`LabelTemplateController.save`). Designeren leveringer starter maler speilet kiosk samlet etiketter og forhåndsvisninger mot utvalg data.

### Gjengivelse og utskrift på kiosken

Ved innsjekking fullføring, `B1Checkin/src/helpers/LabelHelper.ts` bestemmer hva som skal skrives ut fra gruppe flagg på hver ventende besøk: navnetiketter for `printNametag` grupper, pluss en familie hentelabel hvis noen besøk hit en `parentPickup` gruppe. Sikkerhetskoden fra innsjekkings respons går på barn navnetiketter og hentelabel; voksen navnetiketter skrive uten en kode. Hvis kirken har maler, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) slår blokker + et felt kontekst inn i en frittstående HTML dokument; ellers samlet HTML etiketter i `B1Checkin/assets/labels/` blir brukt med placeholder erstatning.

Strekkoder blir generert som inline SVG av rent-TypeScript kodingtakere i `B1Checkin/src/helpers/barcode.ts` — Kode 39 mønstre tabeller og Kode 128 (kode sett B med mod-103 sjeksum) bredde tabeller, pluss QR via `qrcode` pakken. **Disse kodingtakerne blir bevisst duplisert i B1Admin** (`LabelEditor.tsx` inline samme tabeller, notert i en kode kommentar) så designer forhåndsvisninger er piksel-tro til kiosk utdata; en endring til en må spiegles i den andre.

Print rørledningen (`src/components/PrintUI.tsx`) gjengivelse hver HTML etikett i en `WebView`, fanger det til JPG via `react-native-view-shot`, og hender bilde URIs til den innfødt **printer-helper** Expo modul (`B1Checkin/modules/printer-helper/`). Modulen avslører `scan()`, `checkInit()`, `printUris()`, og status hendelser, med en leverandør per merke på begge plattformer:

| Merke | Android | iOS | Noter |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother utskrift SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serier nettverks skrivere (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 etiketter, den anbefale standard |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverks oppdagelse + TCP/ZPL bilde utskrift |

Skriver valg lever på `app/printers.tsx` (nettverks skanning returnerer `brand~model~ip` poster; valget vedvarer til AsyncStorage), og `src/helpers/PrinterLog.ts` beholder en on-enhet diagnostisk log som vises gjennom en live status prikk i kiosk header.

## Gjestregistrering

To stier oppretter en persons mid-innsjekking:

- **På kiosken** — husholdning skjermen "Legg til gjest" åpner `B1Checkin/app/addGuest.tsx`, som først søker `GET /membership/people/search?term=` for en eksisterende ikke-medlem samsvar og ellers oppretter en med `POST /membership/people`, vedlagt nåværende husholdning. Gjesten så flyter gjennom gruppe tildeling som noen medlem.
- **Selvbetjent via QR** — når kirkens innstilling `enableQRGuestRegistration` er på (konfigurert i B1Admin innsjekking innstillinger, lest fra `GET /membership/settings/public/{churchId}`), kiosk lookup skjermen viser en QR kode koblende til `https://{subdomain}.b1.church/guest-register?serviceId=`. At B1App side (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en besøk familie registrere seg selv på deres egen telefon gjennom anonym `POST /membership/people/guest-register` endepunkt, holde kiosk linjen bevegelse.

## Relaterte sider

- [Oppmøte endepunkter](../api/endpoints/attendance) -- Full REST flate for campuser, tjenester, sesjoner, besøk, og besøk sesjoner
- [Medlemskaps endepunkter](../api/endpoints/membership) -- Personer, husholdninger, og grupper
- [Webhooks](../api/webhooks) -- Den `session.created`, `attendance.recorded`, og `attendance.checkout` hendelser
- [Modul struktur](../api/module-structure) -- Hvordan oppmøte modulen er organisert server-side
