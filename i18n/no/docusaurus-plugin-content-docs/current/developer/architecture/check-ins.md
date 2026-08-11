---
title: "Insjekk"
---

# Insjekk

<div class="article-intro">

Innsjekk er ett system med tre fronter: B1Checkin kioskappen for bemannet og selvbetjening stasjonene, selvinnsjekk inne i B1App medlemsportalen, og administratorside nærvær i B1Admin. Alle tre skriver til samme nærværmodul i kjerne Api, og klasseroutingdrevet helt av Grupper -- det er ingen egen "steder" eller "rom" enhet. Et barnesikkerhetslag sitter på toppen: per-besøk innsjekk-typer, server-side kapasitet og frivillig-forhold porter, kiosk-side alder/klasse berettigelse, verifisert oppsamling ved sjekk-ut, og foreldre-personsøking over kirkens tekstingsleverandør. Denne siden kartlegger datamodellen, innsjekk-flyten, sikkerhetslaget og etikettutskriftspipelinjen.

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

| Overflate | Repo | Stack | Rolle |
|---------|------|-------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router filruting; EAS bygger for Android, Amazon Fire og iOS; OTA-oppdateringer via `expo-updates` | Bemannet eller selvbetjening stasjon med etikettutskrift og verifisert sjekk-ut |
| Selvinnsjekk | `B1App` | Next.js (b1.church medlemsportal) | Påloggede medlemmer sjekker husholdningen inn fra en telefon; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer servicestrukturen, tildeler grupper til servicetider, designer etiketter, registrerer manuell nærvær, kjører rapporter |

Alle tre kaller samme to API-moduler gjennom `ApiHelper`: **MembershipApi** (`/membership`) for mennesker, husholdninger og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`)

| Enhet / tabell | Nøkkelfelt | Betydning |
|----------------|-----------|---------|
| `campuses` | name, address | Avskrevet her -- campus mastered i medlemskapsmodulen (`/membership/campuses`); innsjekk kopien er fryst skrivebeskyttet for legacy lesere (`models/Campus.ts`) |
| `services` | campusId, name | Et gjentakende møte, f.eks. "Søndagmorgen" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | En tidsspor innen en service, f.eks. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Sammenkoblingstubell: hvilke grupper (klasserom) møtes ved hvilke servicetider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte av en gruppe på en dato -- opprettet latent på innsjekkstid (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | En person som deltar på en dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = legacy medlem), satt av kioskenen og konsumert av kapasitets-/forhold porter |
| `visitSessions` | visitId, sessionId | Hvilken(e) sesjon(er) et besøk dekker -- et barn sjekket inn i to servicetider får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designable etikett-oppsett (`models/LabelTemplate.ts`) |

### Hvordan et fullført innsjekk blir vedvarende

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Kroppen er en rekke `Visit`-objeketer, som hver bærer `visitSessions` hvis innebygde `session` bare navn en `(serviceTimeId, groupId)` par. Serveren deretter:

1. **Gates kapasitet og forhold før noen skrivning.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sjekker hver målromets kapasitet, gjestekapasitet, lukket flagg og frivilliges forhold mot gjeldende belegg. postCheckin er **ikke transaksjonell**, så porten må kjøre før første lagring -- et hardt brudd returnerer en 409 som navngir det krenkende rommet(e) og ingenting blir vedvarende. Se [Kapasitet og frivilliges forhold porter](#kapasitet-og-frivilliges-forhold-porter).
2. **Løser sesjoner latent.** `getSessionId()` finner eller oppretter `sessions` raden for `(groupId, serviceTimeId, i dag)` -- sesjon ids er cachet in-prosess per dato. Nye sesjoner utsletter en `session.created` webhook. Løkken er en avventet `for..of` -- en tidligere brann-og-glemme `forEach(async …)` konkurrerte om lagringen og skrev NULL sessionIds på første-sesjonopprettelse (fikset; notert i kommentar kode på løkken).
3. **Erstatter dagens oppføringer.** Eventuelle eksisterende besøk for disse personene på denne tjenesten i dag slettes sammen med visitSessions, deretter lagres det sendte settet. Re-sjekking av en familie er derfor en idempotent "dette er gjeldende tilstand" operasjon, ikke en tillegg. Passering `?checkDuplicates=true` returnerer i stedet `{ duplicates: [personId…] }` uten å skrive, som er hvordan kioskenen advarer før overskriving.
4. **Genererer en sikkerhetskode per batch.** `SecurityCodeHelper.generate()` produserer en 4-tegn kode fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, så koder kan ikke stave ord eller mislesing). Serveren prøver på nytt på kollisjon mot samme kirkas samme-dag åpne besøk og stempler koden på hvert besøk i batchen.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` kart personId til straff for påfølgende uke nærvær; kioskenen feirer milepæler (hver 5. uke) med konfetti.

Hvert lagret besøk sender også en `attendance.recorded` webhook. Lesesiden, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **sist loggerte dato** -- hvis det var en tidligere uke blir id'ene stript, slik at klienten mottar en forhåndsutfylt kopi av forrige uke valg for rom som vil lagre som nye oppføringer.

### Sjekk-ut

To endepunkter fullfører løkken (`VisitController`):

- `GET /attendance/visits/code/:code` -- dagens ikke-ennå-sjekket-ut besøk bæring denne sikkerhetskoden, med sesjoner befolket.
- `POST /attendance/visits/checkout` -- kropp `{ visitIds, checkedOutBy?, checkedOutById? }`; stempler `checkoutTime` og hvem som plukket opp, og sender en `attendance.checkout` webhook per besøk.

Tillatelser: kiosker godkjenner med `attendance.checkin`, som gir nøyaktig innsjekk/sjekk-ut/etikett-mal overflaten; `attendance.view`/`attendance.edit` dekk rapportering og manuell oppføring; strukturen (tjenester, servicetider, grupptildelinger) krever `services.edit`. Medlem selvinnsjekk (B1App) trenger ingen tillatelse i det hele tatt: en hvilken som helst godkjent bruker med en koblet person i kirken kan kalle `GET`/`POST /attendance/visits/checkin`, og serveren begrenser det sendte `personId`s til nåværens egen husholdning (403 ellers -- dette gjerdet er det som holder andre familiers `securityCode`s ulesebar). Medlemskap er tildeling; enten medlemmer *ser* funksjonen styres av kirkens B1App navigasjonsfaner. De andre innsjekkendepunktene (`code/:code`, `checkout`, `guardians`, `CheckinController`) forblir kiosk/ansatt-kun.

## Grupper driver romruting

Det er ingen rom eller klasserom enitet noe sted i systemet. Et "rom" er et medlemskap **gruppe** med `trackAttendance` aktivert, koblet til en eller flere servicetider gjennom `groupServiceTimes`. Gruppefelt (på `Api/src/modules/membership/models/Group.ts`) som former kioskoppførsel:

| Felt | Effekt |
|------|--------|
| `trackAttendance` | Gruppe deltaker i nærvær i det hele tatt; B1Admin setuptre flagg `trackAttendance` grupper med ingen `groupServiceTimes` rad som tildelt |
| `parentPickup` | Merker et barnrom: innsjekk til det gjør besøket et "barn" besøk, som skriver ut en familieoppsamlingsetikett og setter sikkerhetskoden på navneskilt |
| `printNametag` | Enten innsjekk til denne gruppen skriver ut navneskilt i det hele tatt |
| `capacity` / `guestCapacity` / `checkinClosed` | Romkapasitetsbegrensninger og en hard "lukket" bryter, håndhevet server-side ved innsjekkporten (redigert i B1Admin gruppinnstillinger under "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Barn-per-frivillig forhold og minimum frivillig antall, håndhevet per kirkens `ratioEnforcement` innstilling |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alder/klasse berettigelsegrenser evaluert kiosk-side for å fremheve eller dyrke rom |

Hver klient denormaliserer samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): last `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` og `GET /membership/groups` i parallell, deretter for hver servicetid samle gruppene hvis `groupServiceTimes` rad peker på det inn i `serviceTime.groups`. Den matrisen er hva rekkepickeren viser, organisert etter gruppe `categoryName`.

Tildelinger redigeres fra gruppens side i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), og hele Campus → Service → Service Time → Group trestrukturen er visualisert i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er enkeltkilden til sannhet, samme gruppe medlemskap kjøringskiosk rutting, roster-stil nærvær i B1Admin gruppesider og nærværrapportering -- tildeling av en gruppe til en servicetid er det eneste trinnet som trengs for å gjøre det til en innsjekkdestinasjon.
:::

## Barnesikkerhet

### Innsjekk typer

Hvert besøk bærer en `checkinType` -- `member`, `guest`, eller `volunteer` (NULL betyr legacy/medlem; migrasjon `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **kiosk-side**: Medlem / Gjest / Frivillig brikker på den utvidede medlemraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), stempling på hver ventende besøk ved fullføring (`app/checkinComplete.tsx`, som standard til `medlem`). Serveren forbruker det i porten -- frivilliger teller mot forhold dekning i stedet for mot kapasitet, og gjester teller mot `guestCapacity`.

### Kapasitet og frivilliges forhold porter

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjøres inne i `postCheckin` før noen lagring (endepunktet er ikke transaksjonelt, så gating-før-lagring er korrekthet mekanismen). Den laster gjeldende belegg per målgruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigen gjennom medlemskapsmodul gateway, deretter klassifiserer brudd:

- **Hard (alltid blokk):** `checkinClosed`, `current + incoming > capacity`, gjesteantal over `guestCapacity`. Batchen avvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- kioskenen viser det navngitte rommet.
- **Forhold (advare eller blokk):** innkommende ikke-frivilliger inn i et rom der `volunteers < minVolunteers`, ingen frivilliger i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighetsgrad følger per-kirke innstilling `ratioEnforcement` (`"warn"` standard / `"block"`, redigert i B1Admin Administrer kirke → Check-In, `CheckinSettingsEdit.tsx`). Advare-modus returnerer `409 { warning: true, error: "ratio", … }` hvis ikke klienten sender på nytt med `acknowledgeWarnings=true` -- det resend er kioskenen ansatt-bekrefta overstyring.

### Alder/klasse berettigelse (kiosk-side)

Romberettigelse er rådgivning brukergrensesnitt, evaluert på kiosken, ikke håndhevet av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klasse mot gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (klasseorden: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` -- manglende data gir `unknown` og slutter aldri et rom. Aldre og klasser beregnes som på kirkens **klassefremmøte dato** (`gradePromotionDate` innstilling, `"MM-DD"`, redigert i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kioskenen henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` velger den siste forekomsten på eller før i dag. Rekkepickeren fremhever berettigede rom og dempet uberettigede; plukking av et dempet rom krever en personalbekreftelse.

### Betrodd og ikke-autorisert oppsamling

Oppsamlingspersoner er et medlemskap enitet, per husholdning: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, valgfritt personId, navn, fotoUrl, forhold, `status` `trusted` / `notAuthorized`, merknader). CRUD er `GET /membership/householdpickup/:householdId` (en hvilken som helst godkjent kirkbruker, slik kioskene kan lese den) pluss `POST` / `DELETE` gates av `people.edit`. Ansatte administrerer listen på personens siden **Oppsamling**-kort (`B1Admin/src/people/components/PickupPeople.tsx`) -- foto, forhold og en Betrodd/Ikke autorisert statusbrikke.

Ved sjekk-ut (`B1Checkin/app/checkout.tsx`) laster kioskenen husholdningsoppsamlinglisten: `trusted` oppføringer gjengir som trykbare oppsamlingskort ved siden av husholdning-voksen fotogrid, og et fritekst "Annet" navn er fuzzy-matchet (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized` oppføringer -- et samsvar blokkerer sjekk-ut med ett varselark og et ansatt **Overstyring**-knapp. Overstyring er loggd på besøket selv: det sender `checkedOutBy` som `"OVERRIDE: {name}"` gjennom normal `POST /attendance/visits/checkout`, slik at det lander i nærværoppføringen og `attendance.checkout` webhook i stedet for ett separat revisjons tabell.

### Side-en-forelder og nødkringkasting

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) eksponerer to SMS-endepunkter:

- `POST /page` -- `{ visitId, message }`: sider forsvarsfolk for ett innsjekket barn (kiosksjekk-ut skjerm, bemannet modus).
- `POST /broadcast` -- `{ serviceId, message }`: tekster hvert innsjekket husholdnings voksne for en service (kioskens innstillinger, bak en type-`EMERGENCY`-til-bekrefte ark i `B1Checkin/app/adminSettings.tsx`).

Begge løser husholdnings voksne gjennom medlemskapsgateway, deretter handlevering til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- tverr-modul dør inn i kirkens konfigurert tekstingsleverandør (`@churchapps/texting`: TextInChurch, Clearstream, eller MutualMinistry; det er ingen innebygd SMS avsender). Gateway logger en `sentText` rad pluss per-mottaker `deliveryLog` oppføringer og kapper et batch på 500 mottakere; med ingen leverandør konfigurert returnerer det `no_provider`, som kioskenen overflatene som "Ingen SMS-leverandør konfigurert". Kontrolleren er `dispatch()` deduper telefonnumre og hopper over mennesker med ingen mobil eller `optedOut` sett, returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }` slik kioskenen kan vise hva som ble hoppet over.

## Kioskenen (B1Checkin)

Skjermer er expo-ruter filer under `B1Checkin/app/`; tverr-skjerm tilstand lever i en statisk `CachedData` klasse (`src/helpers/CachedData.ts`), ikke React tilstand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Oppslag** (`app/lookup.tsx`) -- søk etter telefon (`GET /membership/people/search/phone?number=`, siste-4 eller full) eller etter navn (`GET /membership/people/search?term=`). Valgt av en kamp laster husholdningen (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), seed `pendingVisits` med sist uke valg.
2. **Husholdningsgjennomgang** (`app/household.tsx`, `src/components/MemberList.tsx`) -- hvert medlemrad viser et allerede innsjekket merke, allergi/`nametagNotes` merke og deres gjeldende rombrikker. Utviding av medlem lister hver servicetid med en romknapp pluss medlemmet / Gjest / Frivillig innsjekk-type brikker (`MemberServiceTimes.tsx`).
3. **Gruppetildeling** (`app/selectGroup.tsx`) -- en kategoritre bygd fra `serviceTime.groups`, med alder/klasse-berettigede rom fremhevet og uberettigede dempet bak en ansatt bekreftelse (se [Alder/klasse berettigelse](#agegrade-berettigelse-kiosk-side)); plukking av et rom skriver en `{ session: { serviceTimeId, groupId } }` visitSession inn i det medlemmets ventende besøk (`src/helpers/VisitSessionHelper.ts`). "Ingen" fjerner det.
4. **Fullfør** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` med `pendingVisits` (hvert stemplet med sitt `checkinType`), deretter skriver etiketter hvis en skriver er konfigurert og auto-returnerer til oppslag. En `409` kapasitet respons viser det navngitte fullt/lukket rom; et forhold varsel tilbyr en ansatt bekreftelse som sender på nytt med `acknowledgeWarnings=true`.

**Sjekk-ut** skjermen (`app/checkout.tsx`) godtar 4-tegn sikkerhetskoden gjennom en auto-fokusert inngang -- så USB/Bluetooth tastatur-kile strek-lesere virker med ingen kamera -- eller en on-skjerm keypad ved hjelp av samme alfabet, auto-sending på 4 tegn. Det slår opp koden, viser barna som blir hentet, og presenterer husholdningens **betrodd oppsamling mennesker** som trykbare kort ved siden av et fotogrid av husholdnings voksne (pluss en "Annet" fritekst innstilling som er fuzzy-kontrollert mot ikke-autorisert navn -- se [Betrodd og ikke-autorisert oppsamling](#trusted-og-ikke-autorisert-oppsamling)), deretter poster `POST /attendance/visits/checkout` med pickerens navn/id. I bemannet modus skjermen tilbyr også **Side en forelder** (`POST /attendance/checkin/page`) og et **sikkerhet-etikett reprint** -- `reprint()` gjenoppbygger familiens etiketter med `LabelHelper.getAllLabelsFor(...)` og mater dem gjennom samme `PrintUI` pipeline som innsjekk.

Stasjonspersonlighet er en AsyncStorage flagg `@StationMode` (`"self"` | `"manned"`, byttet i `app/adminSettings.tsx`). Bemannet modus legger til sjekk-ut oppføringspunkt på oppslags skjermen og per-medlem profil redigering (`POST /membership/people`) fra husholdnings skjermen. Kiosk herding er innebygd: en valgfritt PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) port admin og skriver skjermer, admin skjermen åpnes bare via 7 raske trykk på toppteksten logo, og en idle attrahere skjermen (`src/hooks/useInactivityTimer.ts`) tar over mellom familier.

## Selvinnsjekk (B1App)

Medlemmer sjekker inn fra b1.church portalen på `/mobile/checkin` skjermen (ruted av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Det krever en pålogget bruker og går samme fire trinn som kioskenen -- tjenester → husholdning → grupper → fullstendighet -- mot identiske endepunkter, med tilstand holdt i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kioskenen: husholdningen kommer fra den påloggede brukeren sin egen `householdId` (ingen søk trinn), og det er ingen etikettutskrift -- i stedet viser fullgjøring skjermen batchen sikkerhetskode som en QR (`qrcode.react`) med en "vis dette på en innsjekk stasjon" hint. Hvis husholdningen allerede er innsjekket når siden lastes, en "Vis innsjekk kode"-knapp gjen-viser QR fra det eksisterende besøkets `securityCode`. Innsjekken registreres umiddelbart ved innsendingstid (det er ingen ventende tilstand); QR-en kjører bare etikettutskrift på kioskenen.

**Telefon-til-kiosk etikett utskrift** (`B1Checkin/app/scan.tsx`, nådd fra "Skann kode"-knappen på oppslag skjermen): kioskenen åpner en `expo-camera` `CameraView` (front-vendt som standard, flippbar) skanning for QR-koder. En skannet nyttelast godtas når det er en bar 4-tegn kode i sikkerhetskode alfabetet, så både B1App QR og en trykt etikett QR blokk virker. Skjermen deretter følger sjekk-ut reprint banen -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- og returnerer til oppslag. Ingen nærvær skriving skjer ved skann tid; bare etiketter. Koder med ingen aktive besøk, stasjoner med ingen skriver, og etikett-mindre grupper hver overflate en toast og returnerer til oppslag.

Typer og `ApiHelper`/`ArrayHelper` komme fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React komponenter deles med B1Admin.

## Admin-side nærvær (B1Admin)

- **Oppsett** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) gjengir struktur trestrukturen og oppretter tjenester (`ServiceEdit.tsx`) og servicetider (`ServiceTimeEdit.tsx`). Campus data kommer fra medlemskap via `useCampuses()` hook.
- **Manuell nærvær** lever på gruppesiden, ikke nærvær seksjonen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter sesjoner (`POST /attendance/sessions`) og merker mennesker til stede via `POST /attendance/visitsessions/log`, som finner-eller-oppretter besøket for den personen og sesjonen. Gruppeledere kan registrere nærvær for deres egne grupper uten `attendance.edit` tillatelse -- kontrolleren sjekker `au.leaderGroupIds`.
- **Rapportering** -- nærværtrend og grupp nærvær er server-definerte rapporter (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi); per-person historie er `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettutskrift

### Maler og designeren

Kirker designer deres egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nådd fra Check-In innstillinger siden). En mal er en `labelTemplates` rad hvis `content` er en JSON matrise av blokker -- `text`, `field`, `barcode`, `qrcode`, eller `box` -- hver posisjonert i prosent koordinater med skrift, justering, symbolikk (`code39`/`code128`/`qr`), og valgfritt synlighetsbetingelser (f.eks. bare gjengir allergi boksen når `person.nametagNotes` er ikke-tomt). To `labelType`s eksistere: `nametag` (en per innsjekket person; felt som `person.displayName`, `sessions`, `securityCode`) og `pickup` (en per familie; felt som `children`, `childrenAllergies`). Serveren håndhever en enkelt standard per type per kirke (`LabelTemplateController.save`). Designeren sender starter maler som speiler kioskenen bundlet etiketter og forhåndsvisninger mot eksempel data.

### Gjengivelse og utskrift på kioskenen

Ved innsjekk fullføring, `B1Checkin/src/helpers/LabelHelper.ts` bestemmer hva som skal skrives ut fra gruppeflagg på hver ventende besøk: navneskilt for `printNametag` grupper, pluss en familie oppsamling etikett hvis noen besøk hit en `parentPickup` gruppe. Sikkerhetskoden fra innsjekk respons går på barn navneskilt og oppsamling etikett; voksne navneskilt skriver ut uten kode. Hvis kirken har maler, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) gjør blokker + et felt kontekst inn i ett frittstående HTML dokument; ellers bundlet HTML etiketter i `B1Checkin/assets/labels/` brukes med plassholder substitusjon.

Strekoder genereres som inline SVG av rent-TypeScript kodere i `B1Checkin/src/helpers/barcode.ts` -- Code 39 mønstertabeller og Code 128 (kode sett B med mod-103 kontrollsum) bredde tabeller, pluss QR via `qrcode` pakken. **Disse koderne er bevisst duplikert i B1Admin** (`LabelEditor.tsx` inlines de samme tabeller, notert i kommentar kode) slik designer forhåndsvisninger er piksel-trofast til kiosk utdata; en endring til en må speiles i den andre.

Print pipeline (`src/components/PrintUI.tsx`) gjengir hver HTML etikett i en `WebView`, fanger det til JPG via `react-native-view-shot`, og hånd bildene URIs til den innebygd **skriver-hjelper** Expo modul (`B1Checkin/modules/printer-helper/`). Modul eksponerer `scan()`, `checkInit()`, `printUris()` og status hendelser, med en leverandør per merke på begge plattformer:

| Merke | Android | iOS | Merknader |
|-------|---------|-----|----------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serie nettverksskrivere (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 etiketter, anbefalte standard |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverk oppdagelse + TCP/ZPL bilde utskrift |

Skriversvalg lever på `app/printers.tsx` (nettverk skanning returnerer `brand~model~ip` oppføringer; valg vedvarer til AsyncStorage), og `src/helpers/PrinterLog.ts` holder en på-enhet diagnostikk logg overflateavdeling gjennom en live status prikk i kiosk toppteksten.

## Gjestregistrering

To stier opprettet en person midt-innsjekk:

- **Ved kioskenen** -- husholdnings skjerm "Legg til gjest" åpner `B1Checkin/app/addGuest.tsx`, som først søk `GET /membership/people/search?term=` for et eksisterende ikke-medlem samsvar og ellers opprettelse en med `POST /membership/people`, vedlagt gjeldende husholdning. Gjesten strømmer deretter gjennom gruppetildeling som et medlem.
- **Selvbetjening via QR** -- når kirkens innstilling `enableQRGuestRegistration` er på (konfigurert i B1Admin Check-In innstillinger, lese fra `GET /membership/settings/public/{churchId}`), kioskenen oppslag skjermen viser en QR-kode lenking til `https://{subdomain}.b1.church/guest-register?serviceId=`. At B1App side (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en besøk familie registrer seg på sin egen telefon gjennom det anonym `POST /membership/people/guest-register` endepunkt, holde kiosk linjen beveger seg.

## Relaterte sider

- [Nærværendepunkter](../api/endpoints/attendance) -- Full REST overflate for campus, tjenester, sesjoner, besøk og besøkssesjoner
- [Medlemskapendepunkter](../api/endpoints/membership) -- Mennesker, husholdninger og grupper
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded` og `attendance.checkout` hendelser
- [Modulstruktur](../api/module-structure) -- Hvordan nærvær modulen organiseres server-side
