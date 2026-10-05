---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

Innsjekking er ett system med tre innganger: B1Checkin-kioskappen for betjente stasjoner og selvbetjening, selvinnsjekking i B1App-medlemsportalen, og oppmøteregistrering fra administratorsiden i B1Admin. Alle tre skriver til den samme oppmøtemodulen i kjerne-API-et, og ruting til klasserom styres utelukkende av grupper — det finnes ingen egen enhet for «lokasjoner» eller «rom». Oppå dette ligger et lag for barns sikkerhet: innsjekkingstyper per besøk, kapasitets- og frivilligforholdssperrer på serversiden, kvalifikasjonskontroll for alder/klassetrinn på kiosken, verifisering av godkjente hentepersoner ved utsjekking, og tilkalling av foreldre via menighetens tekstmeldingsleverandør. Denne siden beskriver datamodellen, innsjekkingsflytene, sikkerhetslaget og pipelinen for utskrift av etiketter.

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

| Flate | Repo | Teknologi | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, filbasert ruting med expo-router; EAS-bygg for Android, Amazon Fire og iOS; OTA-oppdateringer via `expo-updates` | Betjent stasjon eller selvbetjeningsstasjon med etikettutskrift og verifisert utsjekking |
| Selvinnsjekking | `B1App` | Next.js (b1.church-medlemsportalen) | Innloggede medlemmer sjekker inn husstanden fra telefonen; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tilordner grupper til gudstjenestetidspunkter, designer etiketter, registrerer manuelt oppmøte og kjører rapporter |

Alle tre kaller de samme to API-modulene via `ApiHelper`: **MembershipApi** (`/membership`) for personer, husstander og grupper; **AttendanceApi** (`/attendance`) for alt nedenfor.

## Datamodell (`Api/src/modules/attendance`)

| Enhet / tabell | Nøkkelfelt | Betydning |
|----------------|-----------|---------|
| `campuses` | name, address | Utgått her — campuser administreres i medlemskapsmodulen (`/membership/campuses`); oppmøtekopien er frosset og skrivebeskyttet for eldre lesere (`models/Campus.ts`) |
| `services` | campusId, name | En gjentakende samling, f.eks. «Sunday Morning» (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Et tidsrom innenfor en gudstjeneste, f.eks. «9:00 AM» (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Koblingstabell: hvilke grupper (klasserom) som møtes på hvilke gudstjenestetidspunkter (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett møte i én gruppe på én dato — opprettes ved behov under innsjekking (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Én person som møter opp på én dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = eldre medlem), settes av kiosken og brukes av kapasitets- og forholdssperrene |
| `visitSessions` | visitId, sessionId | Hvilke økter et besøk dekker — et barn som sjekkes inn på to gudstjenestetidspunkter får to rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokker) | Etikettoppsett som kan designes (`models/LabelTemplate.ts`) |

### Slik lagres en fullført innsjekking

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Body er en liste av `Visit`-objekter, hver med `visitSessions` der den innebygde `session` bare angir et par `(serviceTimeId, groupId)`. Serveren gjør deretter følgende:

1. **Sperrer på kapasitet og forhold før noe skrives.** `evaluateGates()` → `CheckinGateHelper.evaluate()` sjekker hvert aktuelt roms kapasitet, gjestekapasitet, stengt-flagg og frivilligforhold mot nåværende belegg. postCheckin er **ikke transaksjonell**, så sperren må kjøre før den første lagringen — et hardt brudd returnerer 409 med navn på rommet/rommene det gjelder, og ingenting lagres. Se [Kapasitets- og frivilligforholdssperrer](#capacity-and-volunteer-ratio-gates).
2. **Løser opp økter ved behov.** `getSessionId()` finner eller oppretter `sessions`-raden for `(groupId, serviceTimeId, today)` — økt-ID-er mellomlagres i prosessen per dato. Nye økter sender en `session.created`-webhook. Løkken er en `for..of` med await — en tidligere «fire-and-forget» `forEach(async …)` kom i kappløp med lagringen og skrev NULL-sessionId-er når den første økten ble opprettet (rettet; nevnt i en kodekommentar ved løkken).
3. **Erstatter dagens registreringer.** Eventuelle eksisterende besøk for disse personene på den gudstjenesten i dag slettes sammen med besøksøktene deres, og deretter lagres det innsendte settet. Å sjekke inn en familie på nytt er derfor en idempotent «dette er den gjeldende tilstanden»-operasjon, ikke en tilføyelse. Med `?checkDuplicates=true` returneres i stedet `{ duplicates: [personId…] }` uten at noe skrives, og slik advarer kiosken før den overskriver.
4. **Genererer én sikkerhetskode per batch.** `SecurityCodeHelper.generate()` lager en kode på 4 tegn fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, slik at kodene verken kan danne ord eller leses feil). Serveren prøver på nytt ved kollisjon mot den samme menighetens åpne besøk samme dag og stempler koden på hvert besøk i batchen.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` kobler personId til antall sammenhengende uker med oppmøte; kiosken feirer milepæler (hver 5. uke) med konfetti.

Hvert lagrede besøk sender også en `attendance.recorded`-webhook. Leseveien, `GET /attendance/visits/checkin`, returnerer personenes besøk fra deres **sist registrerte dato** — hvis den var i en tidligere uke, fjernes ID-ene, slik at klienten får en forhåndsutfylt kopi av forrige ukes romvalg som lagres som nye registreringer.

### Utsjekking

To endepunkter fullfører sløyfen (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens besøk som ennå ikke er sjekket ut og som har den sikkerhetskoden, med økter ferdig lastet.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; stempler `checkoutTime` og hvem som hentet barnet, og sender en `attendance.checkout`-webhook per besøk.

Tillatelser: kiosker autentiserer seg med `attendance.checkin`, som gir akkurat innsjekkings-, utsjekkings- og etikettmalflaten; `attendance.view`/`attendance.edit` dekker rapportering og manuell registrering; strukturen (gudstjenester, gudstjenestetidspunkter, gruppetilordninger) krever `services.edit`. Medlemmers selvinnsjekking (B1App) krever ingen tillatelse i det hele tatt: enhver autentisert bruker med en koblet person i menigheten kan kalle `GET`/`POST /attendance/visits/checkin`, og serveren begrenser de innsendte `personId`-ene til innringerens egen husstand (403 ellers — denne sperren gjør at andre familiers `securityCode` ikke kan leses). Medlemskapet er tillatelsen; om medlemmene *ser* funksjonen, styres av menighetens navigasjonsfaner i B1App. De andre innsjekkingsendepunktene (`code/:code`, `checkout`, `guardians`, `CheckinController`) forblir kun for kiosk og ansatte.

## Grupper styrer ruting til rom

Det finnes ingen rom- eller klasseromsenhet noe sted i systemet. Et «rom» er en medlemskaps**gruppe** med `trackAttendance` aktivert, knyttet til ett eller flere gudstjenestetidspunkter gjennom `groupServiceTimes`. Gruppefeltene (i `Api/src/modules/membership/models/Group.ts`) som former kioskens oppførsel:

| Felt | Virkning |
|------|--------|
| `trackAttendance` | Gruppen deltar i oppmøteregistreringen i det hele tatt; oppsettstreet i B1Admin markerer `trackAttendance`-grupper uten `groupServiceTimes`-rad som ikke tilordnet |
| `parentPickup` | Markerer et barnerom: innsjekking til det gjør besøket til et «barnebesøk», som skriver ut en henteetikett for familien og setter sikkerhetskoden på navnelappen |
| `printNametag` | Om innsjekkinger til denne gruppen skriver ut en navnelapp i det hele tatt |
| `capacity` / `guestCapacity` / `checkinClosed` | Kapasitetsgrenser for rommet og en hard «stengt»-bryter, håndhevet på serversiden av innsjekkingssperren (redigeres i gruppeinnstillingene i B1Admin under «Check-In Capacity») |
| `volunteerRatio` / `minVolunteers` | Forhold mellom barn og frivillige og minste antall frivillige, håndhevet etter menighetens `ratioEnforcement`-innstilling |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Grenser for alder/klassetrinn som vurderes på kiosken for å framheve eller dempe rom |

Hver klient denormaliserer på samme måte (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): last inn `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` og `GET /membership/groups` parallelt, og samle deretter for hvert gudstjenestetidspunkt de gruppene hvis `groupServiceTimes`-rad peker på det, i `serviceTime.groups`. Den listen er det romvelgeren viser, ordnet etter gruppens `categoryName`.

Tilordninger redigeres fra gruppens side i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), og hele treet campus → gudstjeneste → gudstjenestetidspunkt → gruppe visualiseres i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er den eneste sannhetskilden, driver det samme gruppemedlemskapet både kioskruting, oppmøteregistrering i listeform på gruppesidene i B1Admin og oppmøterapportering — å tilordne en gruppe til et gudstjenestetidspunkt er det eneste som skal til for å gjøre den til en innsjekkingsdestinasjon.
:::

## Barnesikkerhet

### Innsjekkingstyper

Hvert besøk har en `checkinType` — `member`, `guest` eller `volunteer` (NULL betyr eldre/medlem; migrering `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen velges **på kiosken**: brikkene Member / Guest / Volunteer på den utvidede medlemsraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), stemplet på hvert ventende besøk ved fullføring (`app/checkinComplete.tsx`, med `member` som standard). Serveren bruker den i sperren — frivillige teller som dekning i forholdet i stedet for mot kapasiteten, og gjester teller mot `guestCapacity`.

### Kapasitets- og frivilligforholdssperrer {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kjører i `postCheckin` før noen lagring (endepunktet er ikke transaksjonelt, så sperring før lagring er mekanismen som sikrer korrekthet). Den laster nåværende belegg per aktuell gruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigurasjonen gjennom medlemskapsmodulens gateway, og klassifiserer deretter brudd:

- **Hard (blokkerer alltid):** `checkinClosed`, `current + incoming > capacity`, antall gjester over `guestCapacity`. Batchen avvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosken viser det aktuelle rommet med navn.
- **Forhold (advar eller blokker):** innkommende ikke-frivillige til et rom der `volunteers < minVolunteers`, ingen frivillige i det hele tatt, eller `children > volunteers × volunteerRatio`. Alvorlighetsgraden følger menighetsinnstillingen `ratioEnforcement` (`"warn"` som standard / `"block"`, redigeres i B1Admin under Administrer menighet → Innsjekking, `CheckinSettingsEdit.tsx`). I advarselsmodus returneres `409 { warning: true, error: "ratio", … }` med mindre klienten sender på nytt med `acknowledgeWarnings=true` — den nye innsendingen er kioskens bekreftelse fra ansatte som overstyrer advarselen.

### Kvalifikasjon etter alder/klassetrinn (på kiosken) {#agegrade-eligibility-kiosk-side}

Romkvalifikasjon er et veiledende brukergrensesnitt som vurderes på kiosken og ikke håndheves av serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klassetrinn med gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (rekkefølge for klassetrinn: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` — manglende data gir `unknown` og skjuler aldri et rom. Alder og klassetrinn beregnes per menighetens **dato for opprykk av klassetrinn** (innstillingen `gradePromotionDate`, `"MM-DD"`, redigeres i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` velger den siste forekomsten på eller før i dag. Romvelgeren framhever kvalifiserte rom og demper ikke-kvalifiserte; å velge et dempet rom krever bekreftelse fra en ansatt.

### Godkjente og ikke-godkjente hentepersoner {#trusted-and-not-authorized-pickup}

Hentepersoner er en medlemskapsenhet, per husstand: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (enhver autentisert menighetsbruker, slik at kiosker kan lese den) pluss `POST` / `DELETE` styrt av `people.edit`. Ansatte administrerer listen på kortet **Pickup** på personsiden (`B1Admin/src/people/components/PickupPeople.tsx`) — bilde, slektskap og en statusbrikke for Trusted/Not Authorized.

Ved utsjekking (`B1Checkin/app/checkout.tsx`) laster kiosken husstandens hentepersonliste: `trusted`-oppføringer vises som trykkbare henterkort ved siden av bilderutenettet med voksne i husstanden, og et fritt skrevet «Annet»-navn sammenlignes uklart (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized`-oppføringer — et treff blokkerer utsjekkingen med et advarselsark og en **Override**-knapp for ansatte. Overstyringen logges på selve besøket: den sender `checkedOutBy` som `"OVERRIDE: {name}"` gjennom den vanlige `POST /attendance/visits/checkout`, slik at den havner i oppmøteregistreringen og i `attendance.checkout`-webhooken i stedet for i en egen revisjonstabell.

### Tilkalling av foreldre og nødvarsling

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) tilbyr to SMS-endepunkter:

- `POST /page` — `{ visitId, message }`: tilkaller foresatte til ett innsjekket barn (kioskens utsjekkingsskjerm, betjent modus).
- `POST /broadcast` — `{ serviceId, message }`: sender tekstmelding til de voksne i alle innsjekkede husstander for en gudstjeneste (kioskens administratorinnstillinger, bak et ark som krever at du skriver `EMERGENCY` for å bekrefte, i `B1Checkin/app/adminSettings.tsx`).

Begge løser opp voksne i husstanden via medlemskapsgatewayen og overlater deretter leveringen til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — døren på tvers av moduler inn til menighetens konfigurerte tekstmeldingsleverandør (`@churchapps/texting`: TextInChurch, Clearstream eller MutualMinistry; det finnes ingen innebygd SMS-sender). Gatewayen logger en `sentText`-rad pluss `deliveryLog`-oppføringer per mottaker og begrenser en batch til 500 mottakere; uten konfigurert leverandør returnerer den `no_provider`, som kiosken viser som «No SMS provider configured». Kontrollerens `dispatch()` fjerner duplikate telefonnumre og hopper over personer uten mobilnummer eller med `optedOut` satt, og returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }` slik at kiosken kan vise hva som ble hoppet over.

## Kiosken (B1Checkin)

Skjermene er expo-router-filer under `B1Checkin/app/`; tilstand som deles mellom skjermer ligger i en statisk `CachedData`-klasse (`src/helpers/CachedData.ts`), ikke i React-tilstand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Oppslag** (`app/lookup.tsx`) — søk på telefon (`GET /membership/people/search/phone?number=`, de siste 4 sifrene eller hele nummeret) eller på navn (`GET /membership/people/search?term=`). Når du velger et treff, lastes husstanden (`GET /membership/people/household/{householdId}`) og eksisterende besøk (`GET /attendance/visits/checkin`), og `pendingVisits` fylles med forrige ukes valg.
2. **Gjennomgang av husstanden** (`app/household.tsx`, `src/components/MemberList.tsx`) — hver medlemsrad viser et merke for allerede innsjekket, et merke for allergi/`nametagNotes` og de nåværende romvalgene som brikker. Når du utvider et medlem, vises alle gudstjenestetidspunkter med en romknapp pluss innsjekkingstypebrikkene Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Under navnet på hvert gudstjenestetidspunkt viser `ServiceTimeHelper.getGroupSummary()` gruppene som tilbys der (navnene i `serviceTime.groups`, trimmet, uten duplikater uavhengig av store og små bokstaver, kommaseparert); ingenting vises når tidspunktet ikke har grupper.
3. **Gruppetilordning** (`app/selectGroup.tsx`) — et kategoritre bygget fra `serviceTime.groups`, med rom som er kvalifisert etter alder/klassetrinn framhevet og ikke-kvalifiserte dempet bak en bekreftelse fra ansatte (se [Kvalifikasjon etter alder/klassetrinn](#agegrade-eligibility-kiosk-side)); å velge et rom skriver en visitSession `{ session: { serviceTimeId, groupId } }` inn i personens ventende besøk (`src/helpers/VisitSessionHelper.ts`). «None» fjerner valget.
4. **Fullfør** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` med `pendingVisits` (hver stemplet med sin `checkinType`), deretter skrives etiketter ut hvis en skriver er konfigurert, og skjermen går automatisk tilbake til oppslag. Et `409`-svar om kapasitet viser det fulle/stengte rommet med navn; en forholdsadvarsel gir en bekreftelse fra ansatte som sender på nytt med `acknowledgeWarnings=true`.

**Utsjekkingsskjermen** (`app/checkout.tsx`) tar imot sikkerhetskoden på 4 tegn gjennom et felt som får fokus automatisk — slik at USB-/Bluetooth-strekkodeskannere som fungerer som tastatur virker uten kamera — eller et tastatur på skjermen med samme alfabet, som sender automatisk ved 4 tegn. En **Scan**-knapp åpner et ark med den delte `src/components/CodeScanner.tsx`-kameravisningen (bakovervendt som standard, godtar QR, Code 128 og Code 39), slik at stasjoner uten skanner kan lese henteetiketten; en skannet kode går gjennom samme `handleCode()`-vei som skrevet inndata. Skjermen slår opp koden, viser barna som skal hentes og presenterer husstandens **godkjente hentepersoner** som trykkbare kort ved siden av et bilderutenett med voksne i husstanden (pluss et fritekstvalg «Annet» som uklart sammenlignes med navn som ikke er godkjent — se [Godkjente og ikke-godkjente hentepersoner](#trusted-and-not-authorized-pickup)), og sender deretter `POST /attendance/visits/checkout` med hentepersonens navn/ID. I betjent modus tilbyr skjermen også **Page a parent** (`POST /attendance/checkin/page`) og **ny utskrift av sikkerhetsetikett** — `reprint()` bygger familiens etiketter på nytt med `LabelHelper.getAllLabelsFor(...)` og sender dem gjennom den samme `PrintUI`-pipelinen som ved innsjekking.

Stasjonens personlighet er et AsyncStorage-flagg `@StationMode` (`"self"` | `"manned"`, byttes i `app/adminSettings.tsx`). Betjent modus legger til inngangen til utsjekking på oppslagsskjermen og redigering av enkeltmedlemmers profil (`POST /membership/people`) fra husstandsskjermen. Herding av kiosken er innebygd: en valgfri PIN-kode (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) låser administrator- og skriverskjermene, administratorskjermen åpnes bare med 7 raske trykk på logoen i toppen, og en hvileskjerm (`src/hooks/useInactivityTimer.ts`) tar over mellom familiene.

## Selvinnsjekking (B1App)

Medlemmer sjekker inn fra b1.church-portalen på skjermen `/mobile/checkin` (rutet av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Den krever en innlogget bruker og går gjennom de samme fire trinnene som kiosken — gudstjenester → husstand → grupper → fullfør — mot de samme endepunktene, med tilstand i `B1App/src/helpers/CheckinHelper.ts`. Forskjellene fra kiosken: husstanden kommer fra den innloggede brukerens egen `householdId` (ingen søketrinn), og det er ingen etikettutskrift — i stedet viser fullføringsskjermen batchens sikkerhetskode som en QR-kode (`qrcode.react`) med et hint om «vis dette på en innsjekkingsstasjon». Hvis husstanden allerede er innsjekket når siden lastes, viser en knapp «Show check-in code» QR-koden på nytt fra det første eksisterende besøket (fra `GET /attendance/visits/checkin`) som har en `securityCode`. Innsjekkingen registreres umiddelbart ved innsending (det finnes ingen ventende tilstand); QR-koden brukes bare til å utløse etikettutskrift på kiosken.

**Etikettutskrift fra telefon til kiosk** (`B1Checkin/app/scan.tsx`, nås fra QR-knappen «Scan code» på oppslagsskjermen): kiosken viser `CodeScanner` (en `expo-camera` `CameraView`, frontvendt som standard, kan snus) som skanner etter QR-koder. `ScanCodeHelper.parse()` godtar bare en nyttelast som er en ren kode på 4 tegn i sikkerhetskodens alfabet, og `ScanCodeHelper.isRepeat()` ignorerer den samme koden i 4 sekunder, slik at både B1App-QR-koden og QR-blokken på en utskrevet etikett fungerer. Skjermen følger deretter utsjekkingens vei for ny utskrift — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — og går tilbake til oppslag. Ingen oppmøteskriving skjer ved skanning; kun etiketter. Koder uten aktive besøk, stasjoner uten skriver og grupper uten etiketter gir hver en varselmelding og går tilbake til oppslag.

Typer og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; ingen React-komponenter deles med B1Admin.

## Oppmøteregistrering fra administratorsiden (B1Admin)

- **Oppsett** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) viser strukturtreet og oppretter gudstjenester (`ServiceEdit.tsx`) og gudstjenestetidspunkter (`ServiceTimeEdit.tsx`). Campusdata kommer fra medlemskapsmodulen via `useCampuses()`-hooken.
- **Manuelt oppmøte** ligger på gruppesiden, ikke i oppmøtedelen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` oppretter økter (`POST /attendance/sessions`; ved tilføyelse kan `SessionEdit.tsx` ta med én økt per annen gruppe som deler det valgte gudstjenestetidspunktet, og hopper over grupper som allerede har en økt den datoen) og markerer personer som til stede via `POST /attendance/visitsessions/log`, som finner eller oppretter besøket for den personen og økten. Gruppeledere kan registrere oppmøte for sine egne grupper uten tillatelsen `attendance.edit` — kontrollerne sjekker `au.leaderGroupIds`.
- **Rapportering** — oppmøtetrend og gruppeoppmøte er rapporter definert på serveren (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi; definisjoner i `Api/reports/*.json`). Begge tar `startDate`/`endDate` (sluttdato inkludert); trendrapporten har som standard ett år tilbake til i dag og legger til en `sessionDates`-kolonne per uke, og gruppeoppmøtets tre på skjermen inkluderer hvert besøks `checkinTime` og personens `membershipStatus`. CSV-filen for gruppeoppmøte kommer fra den tilhørende rapporten `groupAttendanceDownload`, pivotert av `GroupAttendanceDownloadHelper` til én rad per gruppemedlem med en kolonne for til stede/fraværende per daterte økt; historikk per person er `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettutskrift

### Maler og designeren

Menigheter designer egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nås fra innstillingssiden for innsjekking). En mal er en `labelTemplates`-rad der `content` er en JSON-liste med blokker — `text`, `field`, `barcode`, `qrcode` eller `box` — hver plassert i prosentkoordinater med font, justering, strekkodetype (`code39`/`code128`/`qr`) og valgfrie synlighetsbetingelser (f.eks. vis bare allergiboksen når `person.nametagNotes` ikke er tom). Det finnes to `labelType`: `nametag` (én per innsjekket person; felt som `person.displayName`, `sessions`, `securityCode` og `person.isBirthdayWeek` -- `"true"` når fødselsdagens måned/dag er innen 3 dager fra i dag, også over årsskiftet, beregnet av `LabelHelper.isBirthdayWithin()`) og `pickup` (én per familie; felt som `children`, `childrenAllergies`). Serveren sørger for én standard per type per menighet (`LabelTemplateController.save`). Designeren leveres med startmaler som speiler kioskens innebygde etiketter og viser forhåndsvisning mot eksempeldata.

### Gjengivelse og utskrift på kiosken

Når innsjekkingen er fullført, avgjør `B1Checkin/src/helpers/LabelHelper.ts` hva som skal skrives ut ut fra gruppeflaggene på hvert ventende besøk: navnelapper for `printNametag`-grupper, pluss én henteetikett for familien hvis noe besøk traff en `parentPickup`-gruppe. Besøk med `checkinType` `volunteer` hoppes over av `LabelHelper.selectChildVisits()`, slik at en barnepasser i et Parent Pickup-rom aldri utløser en henteetikett. Sikkerhetskoden fra innsjekkingssvaret settes på barnenes navnelapper og på henteetiketten; voksnes navnelapper skrives ut uten kode. Hvis menigheten har maler, gjør `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blokkene pluss en feltkontekst om til et selvstendig HTML-dokument; ellers brukes innebygde HTML-etiketter i `B1Checkin/assets/labels/` med utskifting av plassholdere.

Strekkoder genereres som innebygd SVG av rene TypeScript-kodere i `B1Checkin/src/helpers/barcode.ts` — mønstertabeller for Code 39 og breddetabeller for Code 128 (kodesett B med mod-103-kontrollsum), pluss QR via `qrcode`-pakken. **Disse koderne er bevisst duplisert i B1Admin** (`LabelEditor.tsx` har de samme tabellene innebygd, nevnt i en kodekommentar) slik at forhåndsvisninger i designeren er pikselnøyaktige i forhold til kioskens utdata; en endring i den ene må speiles i den andre.

Utskriftspipelinen (`src/components/PrintUI.tsx`) gjengir hver HTML-etikett i en `WebView`, fanger den som JPG via `react-native-view-shot` og sender bilde-URI-ene til den opprinnelige **printer-helper**-Expo-modulen (`B1Checkin/modules/printer-helper/`). Modulen eksponerer `scan()`, `checkInit()`, `printUris()` og statushendelser, med en leverandør per merke på begge plattformer:

| Merke | Android | iOS | Merknader |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Nettverksskrivere i QL-serien (QL-800/810W/820NWB/1100/1110NWB…), utstansede etiketter på 29×90, den anbefalte standarden |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nettverksoppdagelse + TCP/ZPL-bildeutskrift |

Valg av skriver skjer i `app/printers.tsx` (nettverksskanning returnerer oppføringer av typen `brand~model~ip`; valget lagres i AsyncStorage), og `src/helpers/PrinterLog.ts` fører en diagnoselogg på enheten som vises gjennom en levende statusprikk i kioskens topplinje.

## Gjesteregistrering

To veier oppretter en person midt under innsjekkingen:

- **På kiosken** — «Add guest» på husstandsskjermen åpner `B1Checkin/app/addGuest.tsx`, som først søker `GET /membership/people/search?term=` etter et eksisterende treff som ikke er medlem, og ellers oppretter en person med `POST /membership/people`, knyttet til den aktuelle husstanden. Gjesten går deretter gjennom gruppetilordning som alle andre medlemmer.
- **Selvbetjent via QR** — når menighetsinnstillingen `enableQRGuestRegistration` er på (konfigureres i innsjekkingsinnstillingene i B1Admin, leses fra `GET /membership/settings/public/{churchId}`), viser kioskens oppslagsskjerm en QR-kode som lenker til `https://{subdomain}.b1.church/guest-register?serviceId=`. Den B1App-siden (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lar en familie på besøk registrere seg selv på sin egen telefon gjennom det anonyme endepunktet `POST /membership/people/guest-register`, slik at køen ved kiosken holder seg i bevegelse. QR-arket har også en **Register here**-knapp som åpner den samme siden på kiosken (`app/guestRegister.tsx`) i en `WebView` i inkognito uten hurtigbuffer; `src/helpers/GuestRegisterHelper.ts` bygger URL-en både for QR-koden og WebView-en og blokkerer navigasjon bort fra `https://{subdomain}.b1.church/guest-register`. Skjermen går tilbake til oppslag ved **Done**, tilbake eller 120 sekunders inaktivitet (skriving i skjemaet videresendes fra WebView-en som aktivitet), og fjerner WebView-en slik at én families innskrevne opplysninger aldri når den neste.

## Relaterte sider

- [Endepunkter for oppmøte](../api/endpoints/attendance) -- Hele REST-flaten for campuser, gudstjenester, økter, besøk og besøksøkter
- [Endepunkter for medlemskap](../api/endpoints/membership) -- Personer, husstander og grupper
- [Webhooks](../api/webhooks) -- Hendelsene `session.created`, `attendance.recorded` og `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Hvordan oppmøtemodulen er organisert på serversiden
