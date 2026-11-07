---
title: "Check-in"
description: "Hvordan check-in virker på tværs af B1Checkin, B1App og B1 Admin: deltagelsesmodellen, grupper som rum, kapacitetsgrænser og afhentningsregler."
---

# Check-in

<div class="article-intro">

Check-in er ét system med tre indgange: B1Checkin-kiosk-appen til bemandede og selvbetjente stationer, selvcheck-in i B1App-medlemsportalen og administrativ tilstedeværelse i B1Admin. Alle tre skriver til det samme tilstedeværelsesmodul i core-Api'et, og rutning til børnerum styres helt af grupper — der findes ingen separat entitet for "lokationer" eller "rum". Oven på dette ligger et lag til børnesikkerhed: check-in-typer pr. besøg, serverside kapacitets- og voksen-barn-forholdskontrol, kioskside alders- og klassetrinskontrol, verificeret afhentning ved check-out og sidemeddelelser til forældre via kirkens sms-udbyder. Denne side beskriver datamodellen, check-in-flowene, sikkerhedslaget og pipelinen til udskrivning af etiketter.

</div>

## Oversigt

```
┌──────────────────────────┐
│ B1Checkin (Expo-kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  opslag → husstand →     │  │         │ Api                                          │
│  grupper → fuldfør/print │  │  HTTPS  │  ┌─ medlemsmodul ──────────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ personer · husstande · grupper          │ │
│ B1App (selvcheck-in)     │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin-skærm   │  │         │  ┌─ tilstedeværelsesmodul ─────────────────┐ │
├──────────────────────────┤  │         │  │ campusser → tjenester → tjenestetider   │ │
│ B1Admin (personale)      │──┘         │  │ groupServiceTimes  (rumrutning)         │ │
│  opsætning · rapporter · │            │  │ sessions ← visitSessions → visits       │ │
│  etiketdesigner          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Udskriftssti for etiketter (kun kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (etiketskabeloner eller indbygget HTML-fallback)
       └▶ LabelRenderer → HTML-dokument + inline SVG-stregkoder
            └▶ PrintUI: WebView-rendering → ViewShot JPG-optagelse
                 └▶ printer-helper-native-modul → Brother QL / Zebra
```

| Flade | Repo | Stak | Rolle |
|-------|------|------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router-filrouting; EAS-builds til Android, Amazon Fire og iOS; OTA-opdateringer via `expo-updates` | Bemandet eller selvbetjent station med etiketudskrivning og verificeret check-out |
| Selvcheck-in | `B1App` | Next.js (b1.church-medlemsportal) | Indloggede medlemmer checker deres husstand ind fra en telefon; ingen udskrivning |
| Admin | `B1Admin` | React SPA | Konfigurerer tjenestestrukturen, tildeler grupper til tjenestetider, designer etiketter, registrerer manuel tilstedeværelse og kører rapporter |

Alle tre kalder de samme to API-moduler via `ApiHelper`: **MembershipApi** (`/membership`) til personer, husstande og grupper; **AttendanceApi** (`/attendance`) til alt nedenfor.

## Datamodel (`Api/src/modules/attendance`)

| Entitet / tabel | Nøglefelter | Betydning |
|-----------------|-------------|-----------|
| `campuses` | name, address | Forældet her — campusser administreres i medlemsmodulet (`/membership/campuses`); kopien i tilstedeværelse er frosset som skrivebeskyttet for ældre læsere (`models/Campus.ts`) |
| `services` | campusId, name | En tilbagevendende samling, f.eks. "Søndag formiddag" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Et tidsrum inden for en tjeneste, f.eks. "9:00" (`models/ServiceTime.ts`). Planlægningskolonnerne er valgfri (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) og styrer [check-in-vinduet](#planlagte-check-in-vinduer) |
| `groupServiceTimes` | groupId, serviceTimeId | Forbindelsestabel: hvilke grupper (klasselokaler) der mødes på hvilke tjenestetider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ét møde for én gruppe på én dato — oprettes dovent på check-in-tidspunktet (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Én person der deltager på én dato (`models/Visit.ts`). `checkinType` er `member` / `guest` / `volunteer` (NULL = ældre medlem), sat af kiosken og brugt af kapacitets- og forholdskontrollerne |
| `visitSessions` | visitId, sessionId | Hvilke session(er) et besøg dækker — et barn checket ind til to tjenestetider får to rækker (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokke) | Designbare etiketlayouts (`models/LabelTemplate.ts`) |

### Sådan gemmes et fuldført check-in

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) håndterer `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Body'en er et array af `Visit`-objekter, hver med `visitSessions`, hvor den indlejrede `session` kun angiver et `(serviceTimeId, groupId)`-par. Serveren gør derefter følgende:

1. **Kontrollerer kapacitet og forhold før nogen skrivning.** `evaluateGates()` → `CheckinGateHelper.evaluate()` kontrollerer hvert målrettet rums kapacitet, gæstekapacitet, lukket-flag og voksen-barn-forhold mod den aktuelle belægning. postCheckin er **ikke transaktionel**, så kontrollen skal køre før den første gemning — en hård overtrædelse returnerer en 409, der navngiver de berørte rum, og intet gemmes. Se [Kapacitets- og voksen-barn-forholdskontroller](#kapacitets-og-voksen-barn-forholdskontroller).
2. **Løser sessioner dovent.** `getSessionId()` finder eller opretter rækken i `sessions` for `(groupId, serviceTimeId, i dag)` — session-id'er caches i processen pr. dato. Nye sessioner udsender en `session.created`-webhook. Løkken er et ventende `for..of` — en tidligere fire-and-forget `forEach(async …)` kappede med gemningen og skrev NULL-sessionIds ved oprettelse af første session (rettet; noteret i en kodekommentar ved løkken).
3. **Erstatter dagens poster.** Eksisterende besøg for disse personer til denne tjeneste i dag slettes sammen med deres visitSessions, hvorefter det indsendte sæt gemmes. Et familie-check-in gentaget er derfor en idempotent "dette er den aktuelle tilstand"-handling og ikke en tilføjelse. Sendes i stedet `?checkDuplicates=true`, returneres `{ duplicates: [personId…] }` uden skrivning — det er sådan kiosken advarer, før den overskriver.
4. **Genererer én sikkerhedskode pr. batch.** `SecurityCodeHelper.generate()` producerer en 4-tegns kode fra alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ingen vokaler eller tvetydige tegn, så koder ikke kan stave ord eller fejllæses). Serveren forsøger igen ved kollision mod samme kirkes åbne besøg fra samme dag og stempler koden på hvert besøg i batchen.
5. **Returnerer `{ streaks, securityCode }`.** `streaks` afbilder personId til antal sammenhængende ugers tilstedeværelse; kiosken fejrer milepæle (hver 5. uge) med konfetti.

Hvert gemt besøg udsender også en `attendance.recorded`-webhook. Læsesiden, `GET /attendance/visits/checkin`, returnerer personernes besøg fra deres **sidst registrerede dato** — hvis det var en tidligere uge, fjernes id'erne, og klienten modtager en forududfyldt kopi af sidste uges rumvalg, som gemmes som nye poster.

### Check-out

To endpoints fuldender kredsløbet (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens endnu ikke udtjekkede besøg med den sikkerhedskode, med sessions udfyldt.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; stempler `checkoutTime` og hvem der hentede barnet, og udsender en `attendance.checkout`-webhook pr. besøg.

Tilladelser: kiosker autentificerer med `attendance.checkin`, som giver præcis check-in-/check-out-/etiketskabelon-fladen, plus de husstandsopslag en kiosk har brug for uden `people.view` (søgning på telefon/navn, husstandsmedlemmer i check-in-modellen og listen over husstandens afhentningspersoner). B1Checkins `SessionHelper.filterChurches` tilbyder kun kirker, hvor kontoen har `Attendance/Checkin` eller `Attendance/Edit`. `Checkin` er ikke længere en del af Everyone-tilladelserne (null-rolle) (`RoleHelper` og migration `2026-11-01_remove_everyone_checkin`), så den skal tildeles via en rigtig rolle; `attendance.view`/`attendance.edit` dækker rapportering og manuel registrering; strukturen (tjenester, tjenestetider, gruppetildelinger) kræver `services.edit`. Medlemmers selvcheck-in (B1App) kræver ingen tilladelse: enhver autentificeret bruger med en tilknyttet person i kirken må kalde `GET`/`POST /attendance/visits/checkin`, og serveren begrænser de indsendte `personId`'er til kaldérens egen husstand (403 ellers — det er denne afgrænsning, der forhindrer andre familiers `securityCode`s i at kunne læses). Medlemskab er adgangen; om medlemmer *ser* funktionen styres af kirkens B1App-navigationsfaner. De øvrige check-in-endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) forbliver kun for kiosk/personale.

## Grupper styrer rumrutning

Der findes ingen rum- eller klasseentitet nogen steder i systemet. Et "rum" er en medlemsgruppe med `trackAttendance` aktiveret, knyttet til en eller flere tjenestetider via `groupServiceTimes`. Gruppefelterne (i `Api/src/modules/membership/models/Group.ts`), der former kioskens adfærd:

| Felt | Virkning |
|------|----------|
| `trackAttendance` | Gruppen deltager overhovedet i tilstedeværelse; B1Admins opsætningstræ markerer `trackAttendance`-grupper uden en `groupServiceTimes`-række som ikke tildelt |
| `parentPickup` | Markerer et børnerum: check-in til det gør besøget til et "barn"-besøg, som udskriver en familieafhentningsetiket og sætter sikkerhedskoden på navneskiltet |
| `printNametag` | Om check-ins til denne gruppe overhovedet udskriver et navneskilt |
| `capacity` / `guestCapacity` / `checkinClosed` | Rumkapacitetsgrænser og en hård "lukket"-kontakt, håndhævet serverside af check-in-kontrollen (redigeres i B1Admins gruppeindstillinger under "Check-In-kapacitet") |
| `volunteerRatio` / `minVolunteers` | Børn-pr.-frivillig-forhold og minimum antal frivillige, håndhævet efter den kirkedækkende `ratioEnforcement`-indstilling |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alders- og klassetrinsgrænser, vurderet på kiosken for at fremhæve eller nedtone rum |

Alle klienter denormaliserer på samme måde (f.eks. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): indlæs `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` og `GET /membership/groups` parallelt, og saml derefter for hver tjenestetid de grupper, hvis `groupServiceTimes`-række peger på den, i `serviceTime.groups`. Det array er det, rumvælgeren viser, organiseret efter gruppens `categoryName`.

Tildelinger redigeres fra gruppens side i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), og hele Campus → Tjeneste → Tjenestetid → Gruppe-træet visualiseres i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Fordi grupper er den eneste sandhedskilde, driver det samme gruppemedlemskab kioskrutning, listebaseret tilstedeværelse på B1Admins gruppesider og tilstedeværelsesrapportering — at tildele en gruppe til en tjenestetid er det eneste trin, der skal til, for at den bliver et check-in-mål.
:::

## Børnesikkerhed

### Check-in-typer

Hvert besøg har en `checkinType` — `member`, `guest` eller `volunteer` (NULL betyder ældre/medlem; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typen vælges **på kiosken**: Medlem / Gæst / Frivillig-chips på den udvidede medlemsrække (`B1Checkin/src/components/MemberServiceTimes.tsx`), som stemples på hvert ventende besøg ved fuldførelse (`app/checkinComplete.tsx`, med standard `member`). Serveren bruger den i kontrollen — frivillige tæller med i forholdsdækningen i stedet for mod kapaciteten, og gæster tæller mod `guestCapacity`.

### Kapacitets- og voksen-barn-forholdskontroller

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) kører inde i `postCheckin` før enhver gemning (endepunktet er ikke-transaktionelt, så kontrol-før-gemning er korrekthedsmekanismen). Den indlæser den aktuelle belægning pr. målrettet gruppe (`VisitRepo.countActiveByGroupToday`) og gruppekonfigurationen via medlemsmodulets gateway, og klassificerer derefter overtrædelser:

- **Hård (blokerer altid):** `checkinClosed`, `nuværende + indkommende > capacity`, gæsteantal over `guestCapacity`. Batchen afvises med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosken viser det navngivne rum.
- **Forhold (advarer eller blokerer):** indkommende ikke-frivillige i et rum hvor `volunteers < minVolunteers`, slet ingen frivillige, eller `children > volunteers × volunteerRatio`. Alvorlighedsgraden følger den kirkespecifikke indstilling `ratioEnforcement` (`"warn"` som standard / `"block"`, redigeres i B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). I advarselstilstand returneres `409 { warning: true, error: "ratio", … }`, medmindre klienten sender forespørgslen igen med `acknowledgeWarnings=true` — det genindsendte er kioskens bekræftelse fra personale.

### Planlagte check-in-vinduer

En tjenestetid kan have en valgfri ugentlig plan (`dayOfWeek` 0–6 med 0 = søndag, `startTime`/`endTime` som `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), redigeret i B1Admins **Tilstedeværelse → Opsætning**-formular for tjenestetider (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in-plan"). `CheckinGateHelper.hasSchedule()` betragter kun en tjenestetid som planlagt, når både `dayOfWeek` og `startTime` er sat; uplanlagte tider bliver aldrig tidsstyret. `isServiceTimeOpen()` beregner vinduet i lokal væggetid (`DateHelper.toChurchTime`). Zonen løses pr. tjenestetid af `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): først kommer `timezone` for tjenestens campus (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`), dernæst kirkens `timeZone` (sat i B1Admins Church Information), dernæst det første ikke-fjernede campus med en `timezone` (`loadCampusTimeZone`), og først ddernæst `America/New_York`. Campus kommer først, fordi de fleste kirker fik `America/New_York` tilbageudfyldt som kirkezone. Både listen og indsendelsesstien nedenfor løser den på samme måde. Vinduet løber fra `checkinOpenMinutes` før starten til `checkinCloseMinutes` efter slutningen (eller efter starten, når der ikke er en sluttid) og håndterer vinduer, der krydser midnat eller ugegrænsen.

Vinduet håndhæves to steder:

- **Liste:** `GET /attendance/servicetimes` stempler hver række med en beregnet `checkinOpen`-boolean. B1Apps selvcheck-in (`CheckinPage.tsx`) og B1Checkins tjenestevælger (`app/services.tsx`) beholder alle tider. Når alle en tjenestes tider er lukkede, viser de den nærmeste åbning ("Check-in åbner søn. 9:30." i B1App, "Check-in til denne tjeneste åbner søn. 9:30." i B1Checkin, fra `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), og falder tilbage til "Check-in er ikke åben for denne tjeneste lige nu.", når ingen åbning kan beregnes (kiosken tilbyder en Tilbage-knap for at vælge en anden tjeneste). Ellers vises lukkede tider som en ikke-valgbar række "Lukket" / "Lukket · åbner 9:30". B1Checkins husstandsskærm (`MemberServiceTimes.tsx`) genvurderer åbenhed live på enhedens ur med `ServiceTimeHelper.isCheckinOpen()` (enhedens tidszone, ikke kirkens), så en kiosk, der kører uovervåget, åbner og lukker til tiden, og den viser "Børnerum 1 · Checket ind" (gruppenavn) på en lukket tid, som personen allerede har.
- **Indsendelse:** inde i `evaluateGates()`, før kapacitets-/forholdsvurderingen, afviser `findClosedServiceTimeGroups()` batchen med `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`, hvis en målrettet sessions tjenestetid ligger uden for sit vindue. Fordi en husstands eksisterende besøg for i dag gensendes ved hvert check-in, springer sessioner, som personen allerede har (`personId|sessionId` i de eksisterende besøg), denne kontrol over, så det ikke afvises at tilføje en senere åben tjenestetid, fordi et tidligere vindue er lukket. B1Checkin viser dette via sin hård-kontrol-skærm med årsagen "check-in er ikke åben lige nu" (kapacitetsovertrædelser viser stadig "rummet er fuldt eller lukket").

### Alders- og klassetrinsberettigelse (kioskside)

Rumberettigelse er vejledende UI, vurderet på kiosken, ikke håndhævet af serveren. `B1Checkin/src/helpers/EligibilityHelper.ts` sammenligner en persons fødselsdato/klassetrin med gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (klassetrinsrækkefølge: PreK, K, 1–12, Graduated) og returnerer `eligible` / `ineligible` / `unknown` — manglende data giver `unknown` og skjuler aldrig et rum. Alder og klassetrin beregnes pr. kirkens **klassetrinsopryknings­dato** (`gradePromotionDate`-indstilling, `"MM-DD"`, redigeret i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosken henter den fra `GET /attendance/checkin/settings`, og `resolveAsOfDate` vælger den seneste forekomst på eller før i dag. Rumvælgeren fremhæver berettigede rum og nedtoner ikke-berettigede; valg af et nedtonet rum kræver en bekræftelse fra personale.

### Verificeret og ikke-autoriseret afhentning

Afhentningspersoner er en medlemsentitet, pr. husstand: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valgfri personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD er `GET /membership/householdpickup/:householdId` (enhver autentificeret kirkebruger, så kiosker kan læse det) plus `POST` / `DELETE` styret af `people.edit`. Personale administrerer listen på personsidens **Afhentning**-kort (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relation og en status-chip Verificeret/Ikke autoriseret.

Ved check-out (`B1Checkin/app/checkout.tsx`) indlæser kiosken husstandens afhentningsliste: `trusted`-poster vises som trykbare afhentningskort sammen med husstandens voksenfotogitter, og et frit indtastet "Andre"-navn sammenlignes uskarpt (Levenshtein, `src/helpers/PickupMatchHelper.ts`) med `notAuthorized`-poster — et match blokerer check-out med et advarselsark og en **Tilsidesæt**-knap for personale. Tilsidesættelsen logges på selve besøget: den sender `checkedOutBy` som `"OVERRIDE: {name}"` gennem det almindelige `POST /attendance/visits/checkout`, så den havner i tilstedeværelsesposten og i `attendance.checkout`-webhooken i stedet for i en separat revisionstabel.

### Sidemeddelelse til forældre og nødudsendelse

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) udstiller to sms-endpoints:

- `POST /page` — `{ visitId, message }`: sender besked til værgerne for ét indtjekket barn (kioskens check-out-skærm, bemandet tilstand).
- `POST /broadcast` — `{ serviceId, message }`: sender sms til alle indtjekkede husstandes voksne for en tjeneste (kioskens admin-indstillinger, bag et ark der kræver at skrive `EMERGENCY` for at bekræfte i `B1Checkin/app/adminSettings.tsx`).

Begge løser husstandens voksne via medlemsgatewayen og overdrager derefter leveringen til **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — den tværmodulære dør til kirkens konfigurerede sms-udbyder (`@churchapps/texting`: TextInChurch, Clearstream eller MutualMinistry; der findes ingen indbygget sms-afsender). Gatewayen logger en `sentText`-række plus `deliveryLog`-poster pr. modtager og begrænser en batch til 500 modtagere; uden konfigureret udbyder returnerer den `no_provider`, som kiosken viser som "Ingen sms-udbyder konfigureret". Controllerens `dispatch()` fjerner dubletter af telefonnumre og springer personer over uden mobil eller med `optedOut` sat, og returnerer `{ sent, failed, skippedOptedOut, skippedNoPhone }`, så kiosken kan vise, hvad der blev sprunget over.

## Kiosken (B1Checkin)

Skærme er expo-router-filer under `B1Checkin/app/`; tilstand på tværs af skærme ligger i en statisk `CachedData`-klasse (`src/helpers/CachedData.ts`), ikke i React-tilstand.

```
index (opstart/automatisk login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             indlæser serviceTimes, grupper, │          │  └─────────┘ └▶ addGuest  └▶ udskriv etiketter,
             groupServiceTimes,           │             └▶ checkout (bemandet)        automatisk retur
             labelTemplates               │                                            til lookup
```

1. **Opslag** (`app/lookup.tsx`) — søg på telefon (`GET /membership/people/search/phone?number=`, sidste 4 eller fuldt) eller på navn (`GET /membership/people/search?term=`). Valg af et match indlæser husstanden (`GET /membership/people/household/{householdId}`) og eksisterende besøg (`GET /attendance/visits/checkin`), og udfylder `pendingVisits` med sidste uges valg.
2. **Gennemgang af husstand** (`app/household.tsx`, `src/components/MemberList.tsx`) — hver medlemsrække viser et badge for allerede indtjekket, et allergi-/`nametagNotes`-badge og deres aktuelle rum-chips. Udvidelse af et medlem lister hver tjenestetid med en rumknap plus check-in-type-chips Medlem / Gæst / Frivillig (`MemberServiceTimes.tsx`). Under hvert tjenestetidsnavn viser `ServiceTimeHelper.getGroupSummary()` de grupper, der tilbydes dér (navnene fra `serviceTime.groups`, trimmet, dubletter fjernet uafhængigt af store/små bogstaver, kommasepareret); intet vises, når tiden ingen grupper har.
3. **Gruppetildeling** (`app/selectGroup.tsx`) — et kategoritræ bygget fra `serviceTime.groups`, med alders-/klassetrinsberettigede rum fremhævet og ikke-berettigede nedtonet bag en bekræftelse fra personale (se [Alders- og klassetrinsberettigelse](#aldersog-klassetrinsberettigelse-kioskside)); valg af et rum skriver en `{ session: { serviceTimeId, groupId } }`-visitSession ind i personens ventende besøg (`src/helpers/VisitSessionHelper.ts`). "Ingen" fjerner den.
4. **Fuldfør** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` med `pendingVisits` (hver stemplet med sin `checkinType`), udskriver derefter etiketter, hvis en printer er konfigureret, og vender automatisk tilbage til opslag. Et `409`-svar for kapacitet eller `notOpen` viser det navngivne rum med årsagen (fuldt/lukket eller check-in ikke åben); en forholdsadvarsel tilbyder en bekræftelse fra personale, der genindsender med `acknowledgeWarnings=true`.

Check-out-skærmen (`app/checkout.tsx`) accepterer den 4-tegns sikkerhedskode gennem et automatisk fokuseret felt — så USB/Bluetooth-tastatur-scannere virker uden kamera — eller et tastatur på skærmen med samme alfabet, der automatisk indsendes ved 4 tegn. En **Scan**-knap åbner et ark med det delte `src/components/CodeScanner.tsx`-kamera (bagudvendt som standard, og accepterer QR, Code 128 og Code 39), så stationer uden tastaturscanner kan læse afhentningsetiketten; en scannet kode sendes gennem samme `handleCode()`-sti som indtastet input. Den slår koden op, viser de børn, der hentes, og præsenterer husstandens **verificerede afhentningspersoner** som trykbare kort sammen med et fotogitter af husstandens voksne (plus en "Andre"-mulighed med fritekst, der sammenlignes uskarpt med ikke-autoriserede navne — se [Verificeret og ikke-autoriseret afhentning](#verificeret-og-ikke-autoriseret-afhentning)), og sender derefter `POST /attendance/visits/checkout` med hentepersonens navn/id. I bemandet tilstand tilbyder skærmen også **Sidemeddelelse til forælder** (`POST /attendance/checkin/page`) og en **genudskrivning af sikkerhedsetiket** — `reprint()` genopbygger familiens etiketter med `LabelHelper.getAllLabelsFor(...)` og sender dem gennem den samme `PrintUI`-pipeline som check-in.

Stationens karakter er et AsyncStorage-flag `@StationMode` (`"self"` | `"manned"`, skiftes i `app/adminSettings.tsx`). Bemandet tilstand tilføjer indgangen til check-out på opslagsskærmen og redigering af den enkelte medlemsprofil (`POST /membership/people`) fra husstandsskærmen. Kiosk-hærdning er indbygget: en valgfri pinkode (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) låser admin- og printerskærmene, admin-skærmen åbnes kun ved 7 hurtige tryk på logoet i headeren, og en inaktiv velkomstskærm (`src/hooks/useInactivityTimer.ts`) overtager mellem familierne.

## Selvcheck-in (B1App)

Medlemmer checker ind fra b1.church-portalen på `/mobile/checkin`-skærmen (dirigeret af `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` til `screens/CheckinPage.tsx`). Den kræver en indlogget bruger og gennemgår de samme fire trin som kiosken — tjenester → husstand → grupper → fuldfør — mod de identiske endpoints, med tilstand i `B1App/src/helpers/CheckinHelper.ts`. Forskellene fra kiosken: husstanden kommer fra den indloggede brugers egen `householdId` (intet søgetrin), og der er ingen etiketudskrivning — i stedet viser fuldførelsesskærmen batchens sikkerhedskode som en QR (`qrcode.react`) med hintet "vis dette på en check-in-station". Hvis husstanden allerede er indtjekket, når siden indlæses, viser en knap "Vis check-in-kode" QR'en igen fra det første eksisterende besøg (fra `GET /attendance/visits/checkin`), der har en `securityCode`. Check-in'et registreres med det samme ved indsendelse (der er ingen ventende tilstand); QR'en styrer kun etiketudskrivning på kiosken.

**Udskrivning af etiketter fra telefon til kiosk** (`B1Checkin/app/scan.tsx`, nås via knappen "Scan kode" på QR'en på opslagsskærmen): kiosken viser `CodeScanner` (en `expo-camera` `CameraView`, som som standard vender mod forsiden og kan vendes) og scanner efter QR-koder. `ScanCodeHelper.parse()` accepterer kun en nyttelast, når den er en nøgen 4-tegns kode i sikkerhedskodens alfabet, og `ScanCodeHelper.isRepeat()` ignorerer den samme kode i 4 sekunder, så både B1App-QR'en og QR-blokken på en udskrevet etiket virker. Skærmen følger derefter genudskrivningsstien for check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — og vender tilbage til opslag. Der sker ingen tilstedeværelsesskrivning ved scanning; kun etiketter. Koder uden aktive besøg, stationer uden printer og grupper uden etiketter viser hver en toast og vender tilbage til opslag.

Typer og `ApiHelper`/`ArrayHelper` kommer fra `@churchapps/helpers` og `@churchapps/apphelper`; der deles ingen React-komponenter med B1Admin.

## Tilstedeværelse på adminsiden (B1Admin)

- **Opsætning** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) viser strukturtræet og opretter tjenester (`ServiceEdit.tsx`) og tjenestetider (`ServiceTimeEdit.tsx`). Campusdata kommer fra medlemsmodulet via hooket `useCampuses()`.
- **Manuel tilstedeværelse** ligger på grupperne, ikke i tilstedeværelsessektionen: `B1Admin/src/groups/components/GroupSessionsTab.tsx` opretter sessioner (`POST /attendance/sessions`; ved tilføjelse kan `SessionEdit.tsx` inkludere én session pr. anden gruppe, der deler den valgte tjenestetid, og springer grupper over, der allerede har en session på den dato) og markerer personer som til stede via `POST /attendance/visitsessions/log`, som finder eller opretter besøget for den person og session. Gruppeledere kan registrere tilstedeværelse for deres egne grupper uden tilladelsen `attendance.edit` — controllerne kontrollerer `au.leaderGroupIds`.
- **Rapportering** — udviklings­tendens og gruppetilstedeværelse er serverdefinerede rapporter (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mod ReportingApi; definitioner i `Api/reports/*.json`). Begge tager `startDate`/`endDate` (slutdato inklusiv); tendensrapporten har som standard et år tilbage til i dag og tilføjer en kolonne `sessionDates` pr. uge, og gruppetilstedeværelsens træ på skærmen inkluderer hvert besøgs `checkinTime` og personens `membershipStatus`. Gruppetilstedeværelsens CSV kommer fra den tilknyttede `groupAttendanceDownload`-rapport, pivoteret af `GroupAttendanceDownloadHelper` til én række pr. gruppemedlem med en kolonne for til stede/fraværende pr. dateret session; historik pr. person er `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Udskrivning af etiketter

### Skabeloner og designeren

Kirker designer deres egne etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nås fra siden Check-In-indstillinger). En skabelon er en `labelTemplates`-række, hvis `content` er et JSON-array af blokke — `text`, `field`, `barcode`, `qrcode` eller `box` — hver placeret i procentkoordinater med skrifttype, justering, symbologi (`code39`/`code128`/`qr`) og valgfrie synlighedsbetingelser (f.eks. kun vis allergiboksen når `person.nametagNotes` ikke er tom). Der findes to `labelType`s: `nametag` (én pr. indtjekket person; felter som `person.displayName`, `sessions`, `securityCode` og `person.isBirthdayWeek` — `"true"` når fødselsdagens måned/dag ligger inden for 3 dage fra i dag, med omslag ved årsskiftet, beregnet af `LabelHelper.isBirthdayWithin()`) og `pickup` (én pr. familie; felter som `children`, `childrenAllergies`). Serveren håndhæver én standard pr. type pr. kirke (`LabelTemplateController.save`). Designeren leveres med startskabeloner, der spejler kioskens indbyggede etiketter, og forhåndsviser mod eksempeldata.

### Rendering og udskrivning på kiosken

Ved fuldførelse af check-in afgør `B1Checkin/src/helpers/LabelHelper.ts`, hvad der skal udskrives ud fra gruppeflagene på hvert ventende besøg: navneskilte for `printNametag`-grupper, plus én familieafhentningsetiket, hvis et besøg ramte en `parentPickup`-gruppe. Besøg med `checkinType` `volunteer` springes over af `LabelHelper.selectChildVisits()`, så en børnepasser i et Forældreafhentnings-rum aldrig udløser en afhentningsetiket. Sikkerhedskoden fra check-in-svaret sættes på børnenes navneskilte og afhentningsetiketten; voksne navneskilte udskrives uden kode. Hvis kirken har skabeloner, omdanner `LabelRenderer` (`src/helpers/LabelRenderer.ts`) blokke + en feltkontekst til et selvstændigt HTML-dokument; ellers bruges de indbyggede HTML-etiketter i `B1Checkin/assets/labels/` med pladsholder-udskiftning.

Stregkoder genereres som inline SVG af rene TypeScript-encodere i `B1Checkin/src/helpers/barcode.ts` — Code 39-mønstertabeller og Code 128 (kodesæt B med mod-103-kontrolsum) breddetabeller, plus QR via pakken `qrcode`. **Disse encodere er bevidst duplikeret i B1Admin** (`LabelEditor.tsx` inliner de samme tabeller, noteret i en kodekommentar), så designerens forhåndsvisninger er pixel-tro mod kioskens output; en ændring i den ene skal spejles i den anden.

Udskriftspipelinen (`src/components/PrintUI.tsx`) renderer hver HTML-etiket i en `WebView`, optager den som JPG via `react-native-view-shot` og overdrager billed-URI'erne til det native **printer-helper**-Expo-modul (`B1Checkin/modules/printer-helper/`). Modulet udstiller `scan()`, `checkInit()`, `printUris()` og statushændelser, med en udbyder pr. mærke på begge platforme:

| Mærke | Android | iOS | Noter |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brothers print-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serien netværksprintere (QL-800/810W/820NWB/1100/1110NWB…), stansede 29×90 mm-etiketter, den anbefalede standard |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netværksopdagelse + TCP/ZPL-billedudskrivning |

Printervalg ligger i `app/printers.tsx` (netværksscanning returnerer `brand~model~ip`-poster; valget gemmes i AsyncStorage), og `src/helpers/PrinterLog.ts` fører en diagnostiklog på enheden, der vises via en levende statusprik i kioskens header.

## Gæsteregistrering

To veje opretter en person midt i check-in:

- **På kiosken** — "Tilføj gæst" på husstandsskærmen åbner `B1Checkin/app/addGuest.tsx`, som først søger via `GET /membership/people/search?term=` efter et eksisterende ikke-medlem-match og ellers opretter en med `POST /membership/people`, tilknyttet den aktuelle husstand. Gæsten går derefter gennem gruppetildelingen ligesom ethvert medlem.
- **Selvbetjent via QR** — når kirkeindstillingen `enableQRGuestRegistration` er slået til (konfigureres i B1Admins Check-In-indstillinger, læst fra `GET /membership/settings/public/{churchId}`), viser kioskens opslagsskærm en QR-kode, der linker til `https://{subdomain}.b1.church/guest-register?serviceId=`. Den B1App-side (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lader en besøgende familie registrere sig selv på deres egen telefon via det anonyme endpoint `POST /membership/people/guest-register`, så kiosk-køen fortsat bevæger sig. QR-arket har også en knap **Registrer her**, der åbner den samme side på kiosken (`app/guestRegister.tsx`) i en inkognito-, cache-deaktiveret `WebView`; `src/helpers/GuestRegisterHelper.ts` bygger URL'en til både QR'en og WebView'et og blokerer navigation væk fra `https://{subdomain}.b1.church/guest-register`. Skærmen springer tilbage til opslag ved **Færdig**, tilbage eller 120 sekunders inaktivitet (indtastning i formularen sendes fra WebView'et som aktivitet), og afmonterer WebView'et, så én families indtastninger aldrig når den næste.

QR-tilmeldingen styres af kirkeindstillinger gemt fra kortet **QR-gæsteregistrering** i B1Admin (`src/mobile/CheckInPage.tsx`):

| Indstilling | Synlighed | Formål |
|---|---|---|
| `enableQRGuestRegistration` | offentlig | Tilvalgskontakt for kiosk-QR'en og de anonyme endpoints |
| `guestRegistrationFields` | offentlig | JSON-kort over `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standard: e-mail og telefon valgfri, resten fra. For- og efternavn er altid påkrævet |
| `guestRegistrationImage` | offentlig | URL til headerfoto; B1App viser det i 16:9 i stedet for ikonet på formularen og bekræftelsesskærmen |
| `guestRegistrationGroupId` | privat | Gruppe alle tilmeldinger føjes til (gæster ser eller vælger den aldrig) |
| `guestRegistrationRecordAttendance` | privat | `"true"` for også at registrere tilstedeværelse for den gruppe |

B1Apps `src/components/checkin/GuestRegister.tsx` henter tjeklisten fra det anonyme `GET /membership/people/guest-register/options?churchId=` og viser kun de medtagne felter (e-mail, telefon, civilstand og adresse på den primære kontakt; fødselsdato, køn og klassetrin pr. medlem, og én kommentarboks), og sender kun dem. Serveren anvender tjeklisten igen i `GuestRegistrationHelper.sanitize()` — fravalgte felter fjernes, og manglende påkrævede eller værdier uden for listen giver en 400 — før `PersonHelper.registerGuestHousehold()` kører. Den kalder først `PersonRepo.findGuestMatch()` for hvert medlem med en e-mail eller et telefonnummer: præcis én levende person med samme fornavn og samme e-mail eller samme telefoncifre genbruges (nul eller flere match opretter en ny person, så den aldrig gætter). Et medlem uden kontaktoplysninger matches på fornavn inden for den matchede husstand. Genbrugte personer redigeres aldrig, så en anonym formular ikke kan overskrive gemte oplysninger, og svaret gentager de indsendte navne. Ikke-matchede medlemmer slutter sig til den matchede husstand eller en ny, som `membershipStatus: "Visitor"`, og udsender `person.created` for hver ny person. Bagefter logges fejl frem for at blive returneret: medlemmer føjes til den konfigurerede gruppe (`group.member.added`); hvis registrering af tilstedeværelse er slået til, markerer `AttendanceModuleGateway.recordAttendance()` hvert medlem som til stede for hver af gruppens tjenestetider, der har en plan og hvis check-in-vindue (`CheckinGateHelper.isServiceTimeOpen`) er åbent i det øjeblik, og opretter sessionen for kirkens lokale dato i dag, hvis det er nødvendigt — uplanlagte tjenestetider og tilmeldinger uden for vinduet registrerer ingenting; og kommentarer bliver til en skjult personnote-samtale på husstandens hoved (meddelelsesforfatter "Gæstetilmelding"), knyttet via `person.conversationId`.

## Relaterede sider

- [Tilstedeværelses-endpoints](../api/endpoints/attendance.md) -- Den fulde REST-flade for campusser, tjenester, sessioner, besøg og besøgssessioner
- [Medlemsendpoints](../api/endpoints/membership.md) -- Personer, husstande og grupper
- [Webhooks](../api/webhooks.md) -- Hændelserne `session.created`, `attendance.recorded` og `attendance.checkout`
- [Modulstruktur](../api/module-structure.md) -- Hvordan tilstedeværelsesmodulet er organiseret på serversiden
