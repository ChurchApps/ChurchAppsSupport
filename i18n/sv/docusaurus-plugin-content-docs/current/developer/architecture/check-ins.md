---
title: "Check-ins"
description: "Så fungerar incheckning i B1Checkin, B1App och B1 Admin: datamodellen för närvaro, grupper som rum, kapacitetsspärrar och säkerhetsregler för avhämtning."
---

# Check-ins

<div class="article-intro">

Incheckning sker i ett system med tre ingångar: kioskappen B1Checkin för bemannade och självbetjänade stationer, självincheckning i medlemsportalen B1App och närvaroregistrering på adminsidan i B1Admin. Alla tre skriver till samma närvaromodul i kärn-Api:et, och klassrumsrouting styrs helt av grupper. Det finns ingen separat entitet för "platser" eller "rum". Ett barnsäkerhetslager ligger ovanpå: incheckningstyper per besök, kapacitets- och volontärkvotskontroller på servern, kioskbaserad kontroll av ålder och årskurs, verifierad upphämtning vid utcheckning samt sidsökning till föräldrar via kyrkans sms-leverantör. Den här sidan beskriver datamodellen, incheckningsflödena, säkerhetslagret och utskriften av etiketter.

</div>

## Översikt

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  sök → hushåll →         │  │         │ Api                                          │
│  grupper → klar/skriv ut │  │  HTTPS  │  ┌─ medlemsmodul ──────────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ personer · hushåll · grupper            │ │
│ B1App (självincheckning) │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin-sidan   │  │         │  ┌─ närvaromodul ──────────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (personal)       │──┘         │  │ groupServiceTimes  (rumsrouting)        │ │
│  inställningar · rapporter · │        │  │ sessions ← visitSessions → visits       │ │
│  etikettredigerare       │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Utskriftsväg för etiketter (endast kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (etikettmallar, eller inbyggd HTML-reserv)
       └▶ LabelRenderer → HTML-dokument + inline-SVG-streckkoder
            └▶ PrintUI: WebView-rendering → ViewShot JPG-fångst
                 └▶ printer-helper-native-modul → Brother QL / Zebra
```

| Yta | Repo | Stack | Roll |
|-----|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router-filrouting; EAS-byggen för Android, Amazon Fire och iOS; OTA-uppdateringar via `expo-updates` | Bemannad eller självbetjänad station med etikettutskrift och verifierad utcheckning |
| Självincheckning | `B1App` | Next.js (b1.church-medlemsportalen) | Inloggade medlemmar checkar in sitt hushåll från en telefon; ingen utskrift |
| Admin | `B1Admin` | React SPA | Konfigurerar gudstjänststrukturen, tilldelar grupper till gudstjänsttider, designar etiketter, registrerar manuell närvaro och kör rapporter |

Alla tre anropar samma två API-moduler via `ApiHelper`: **MembershipApi** (`/membership`) för personer, hushåll och grupper, samt **AttendanceApi** (`/attendance`) för allt nedan.

## Datamodell (`Api/src/modules/attendance`)

| Entitet / tabell | Nyckelfält | Betydelse |
|------------------|-----------|-----------|
| `campuses` | name, address | Föråldrad här. Campus huvudregistreras i medlemsmodulen (`/membership/campuses`). Kopian i närvaromodulen är fryst och skrivskyddad för äldre läsare (`models/Campus.ts`) |
| `services` | campusId, name | En återkommande sammankomst, t.ex. "Söndagsmorgon" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | En tidslucka inom en gudstjänst, t.ex. "09:00" (`models/ServiceTime.ts`). Schemakolumnerna är valfria (migrering `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) och styr [incheckningsfönstret](#schemalagda-incheckningsfönster) |
| `groupServiceTimes` | groupId, serviceTimeId | Kopplingstabell: vilka grupper (klassrum) som möts vid vilka gudstjänsttider (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ett möte för en grupp ett datum. Skapas lazy vid incheckning (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | En person som deltar ett datum (`models/Visit.ts`). `checkinType` är `member` / `guest` / `volunteer` (NULL = äldre medlem). Sätts av kiosken och används av kapacitets- och kvotkontrollerna |
| `visitSessions` | visitId, sessionId | Vilka sessioner ett besök omfattar. Ett barn incheckat på två gudstjänsttider får två rader (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-block) | Designbara etikettlayouter (`models/LabelTemplate.ts`) |

### Så sparas en slutförd incheckning

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) hanterar `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Body är en array av `Visit`-objekt. Varje objekt bär `visitSessions` vars inbäddade `session` bara anger ett par `(serviceTimeId, groupId)`. Servern gör sedan följande:

1. **Kontrollerar kapacitet och kvoter innan något skrivs.** `evaluateGates()` → `CheckinGateHelper.evaluate()` kontrollerar varje berörd sals kapacitet, gästkapacitet, stängt-flagga och volontärkvot mot aktuell beläggning. postCheckin är **inte transaktionell**, så kontrollen måste köras före första sparningen. Ett hårt brott ger ett 409-svar som namnger berörda rum, och inget sparas. Se [Kapacitets- och volontärkvotskontroller](#kapacitets-och-volontärkvotskontroller).
2. **Löser sessioner lazy.** `getSessionId()` hittar eller skapar raden i `sessions` för `(groupId, serviceTimeId, idag)`. Session-id:n cachas i processminnet per datum. Nya sessioner skickar en webhook `session.created`. Loopen är en väntad `for..of`. En tidigare fire-and-forget-`forEach(async …)` körde om sparningen och skrev NULL som sessionId vid skapande av första sessionen (åtgärdat; noterat i en kodkommentar vid loopen).
3. **Ersätter dagens poster.** Befintliga besök för dessa personer vid den gudstjänsten idag tas bort tillsammans med deras visitSessions, och sedan sparas den inskickade uppsättningen. Att checka in en familj igen är därför en idempotent operation "detta är aktuellt tillstånd", inte ett tillägg. Om man skickar `?checkDuplicates=true` i stället returneras `{ duplicates: [personId…] }` utan att något skrivs. Så varnar kiosken innan något skrivs över.
4. **Genererar en säkerhetskod per batch.** `SecurityCodeHelper.generate()` producerar en 4-teckenskod ur alfabetet `23456789BCDFGHJKLMNPQRSTVWXYZ` (inga vokaler eller tvetydiga tecken, så koderna inte kan bilda ord eller misstolkas). Servern gör nya försök vid kollision mot samma kyrkas öppna besök samma dag och sätter koden på varje besök i batchen.
5. **Returnerar `{ streaks, securityCode }`.** `streaks` mappar personId till antal veckor i följd med närvaro. Kiosken firar milstolpar (var femte vecka) med konfetti.

Varje sparat besök skickar också en webhook `attendance.recorded`. Läsvägen, `GET /attendance/visits/checkin`, returnerar personernas besök från deras **senast loggade datum**. Om det var en tidigare vecka tas id:n bort, så klienten får en förifylld kopia av förra veckans rumsval som sparas som nya poster.

### Utcheckning

Två endpoints slutför kedjan (`VisitController`):

- `GET /attendance/visits/code/:code` — dagens ej utcheckade besök med den säkerhetskoden, med sessioner ifyllda.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`. Sätter `checkoutTime` och vem som hämtade, och skickar en webhook `attendance.checkout` per besök.

Behörigheter: kiosker autentiserar med `attendance.checkin`, som ger exakt in-/utcheckning och etikettmallar, plus de hushållsuppslag en kiosk behöver utan `people.view` (sök på telefon/namn, hushållsmedlemmar i incheckningsmodellen och hushållets hämtningslista). B1Checkins `SessionHelper.filterChurches` erbjuder bara kyrkor där kontot har `Attendance/Checkin` eller `Attendance/Edit`. `Checkin` ingår inte längre i behörigheterna för Everyone (null-roll) (`RoleHelper` och migreringen `2026-11-01_remove_everyone_checkin`), så den måste ges via en riktig roll. `attendance.view`/`attendance.edit` täcker rapportering och manuell registrering. Strukturen (gudstjänster, gudstjänsttider, gruppkopplingar) kräver `services.edit`. Medlems självincheckning (B1App) kräver ingen behörighet alls: alla autentiserade användare med en kopplad person i kyrkan får anropa `GET`/`POST /attendance/visits/checkin`, och servern begränsar de inskickade `personId`:na till anroparens eget hushåll (403 annars). Det är detta staket som gör att andra familjers `securityCode` inte kan läsas. Medlemskapet är behörigheten. Huruvida medlemmar *ser* funktionen styrs av kyrkans flikar i B1App-navigeringen. De övriga incheckningsendpointsen (`code/:code`, `checkout`, `guardians`, `CheckinController`) är fortsatt endast för kiosk och personal.

## Grupper styr rumsrouting

Det finns ingen rums- eller klassrumsentitet i systemet. Ett "rum" är en medlemsgrupp med `trackAttendance` aktiverat, kopplad till en eller flera gudstjänsttider via `groupServiceTimes`. Gruppfälten (i `Api/src/modules/membership/models/Group.ts`) som formar kioskens beteende:

| Fält | Effekt |
|------|--------|
| `trackAttendance` | Gruppen deltar över huvud taget i närvaro. B1Admins inställningsträd markerar `trackAttendance`-grupper utan `groupServiceTimes`-rad som otilldelade |
| `parentPickup` | Markerar ett barnrum. Incheckning där gör besöket till ett "barn"-besök, som skriver ut en etikett för familjens hämtning och lägger säkerhetskoden på namnbrickan |
| `printNametag` | Om incheckningar till gruppen skriver ut en namnbricka alls |
| `capacity` / `guestCapacity` / `checkinClosed` | Rumskapacitet och en hård "stängd"-brytare, som tillämpas på servern av incheckningskontrollen (redigeras i B1Admins gruppinställningar under "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Antal barn per volontär och minsta volontärantal, tillämpat enligt kyrkans övergripande inställning `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Gränser för ålder och årskurs som kontrolleras i kiosken för att markera eller tona ned rum |

Alla klienter denormaliserar på samma sätt (t.ex. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): hämta `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` och `GET /membership/groups` parallellt, och samla sedan för varje gudstjänsttid de grupper vars `groupServiceTimes`-rad pekar dit i `serviceTime.groups`. Den arrayen är vad rumsväljaren visar, ordnad efter gruppens `categoryName`.

Tilldelningar redigeras från gruppens sida i B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx`, `POST`/`DELETE /attendance/groupservicetimes`). Hela trädet Campus → Gudstjänst → Gudstjänsttid → Grupp visualiseras i `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Eftersom grupperna är enda källan till sanning driver samma gruppmedlemskap kioskrouting, närvarolistor i stil med klasslistor på B1Admins gruppsidor och närvarorapportering. Att tilldela en grupp till en gudstjänsttid är det enda steg som behövs för att göra den till ett incheckningsmål.
:::

## Barnsäkerhet

### Incheckningstyper

Varje besök har en `checkinType`: `member`, `guest` eller `volunteer`. NULL betyder äldre/medlem. Migreringen `tools/migrations/attendance/2026-07-03_checkin_type.ts` ger detta. Typen väljs **i kiosken**: chipsen Medlem / Gäst / Volontär på den utökade medlemsraden (`B1Checkin/src/components/MemberServiceTimes.tsx`), och stämplas på varje väntande besök vid slutförandet (`app/checkinComplete.tsx`, där standardvärdet är `member`). Servern använder den i kontrollen. Volontärer räknas mot volontärtäckningen i stället för mot kapaciteten, och gäster räknas mot `guestCapacity`.

### Kapacitets- och volontärkvotskontroller

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) körs inne i `postCheckin` före all sparning. Endpointen är inte transaktionell, så kontroll före sparning är korrekthetsmekanismen. Den laddar aktuell beläggning per berörd grupp (`VisitRepo.countActiveByGroupToday`) och gruppkonfigurationen via membership-modulens gateway, och klassificerar sedan brotten:

- **Hårda (blockerar alltid):** `checkinClosed`, `current + incoming > capacity`, antal gäster över `guestCapacity`. Batchen avvisas med `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`, och kiosken visar det namngivna rummet.
- **Kvot (varnar eller blockerar):** inkommande icke-volontärer till ett rum där `volunteers < minVolunteers`, inga volontärer alls, eller `children > volunteers × volunteerRatio`. Allvarlighetsgraden följer kyrkans inställning `ratioEnforcement` (`"warn"` som standard, eller `"block"`, redigeras i B1Admin under Hantera kyrka → Check-In, `CheckinSettingsEdit.tsx`). I varningsläget returneras `409 { warning: true, error: "ratio", … }` om klienten inte skickar in igen med `acknowledgeWarnings=true`. Den omsändningen är kioskens bekräftelse av personal.

### Schemalagda incheckningsfönster

En gudstjänsttid kan ha ett valfritt veckoschema (`dayOfWeek` 0–6 där 0 = söndag, `startTime`/`endTime` som `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`). Det redigeras i formuläret för gudstjänsttid under B1Admins **Närvaro → Inställningar** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). `CheckinGateHelper.hasSchedule()` behandlar en gudstjänsttid som schemalagd bara när både `dayOfWeek` och `startTime` är satta. Oschemalagda tider tidsstyrs aldrig. `isServiceTimeOpen()` beräknar fönstret i lokal väggklocktid (`DateHelper.toChurchTime`). Tidszonen löses per gudstjänsttid av `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): först kommer `timezone` för gudstjänstens campus (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`), sedan kyrkans `timeZone` (satt i B1Admins Kyrkoinformation), därefter det första icke-borttagna campus som har en `timezone` (`loadCampusTimeZone`), och först sist `America/New_York`. Campus kommer först eftersom de flesta kyrkor hade `America/New_York` retroaktivt satt som kyrkans zon. Både listningen och postningen nedan löser tidszonen på samma sätt. Fönstret löper från `checkinOpenMinutes` före starten till `checkinCloseMinutes` efter slutet (eller efter starten om det inte finns något slut), och hanterar fönster som går över midnatt eller veckogränsen.

Fönstret tillämpas på två ställen:

- **Listning:** `GET /attendance/servicetimes` lägger på varje rad en beräknad boolean `checkinOpen`. B1Apps självincheckning (`CheckinPage.tsx`) och B1Checkins gudstjänstväljare (`app/services.tsx`) behåller varje tid. När alla en gudstjänsts tider är stängda visas nästa öppning ("Incheckningen öppnar sön 09:30." i B1App, "Incheckningen för den här gudstjänsten öppnar sön 09:30." i B1Checkin, från `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`). Om ingen öppning kan beräknas faller det tillbaka till "Incheckningen är inte öppen för den här gudstjänsten just nu." (kiosken har en tillbakaknapp för att välja en annan gudstjänst). Annars visas stängda tider som en icke-valbar rad "Stängd" / "Stängd · öppnar 09:30". B1Checkins hushållsskärm (`MemberServiceTimes.tsx`) räknar om öppenheten live på enhetens klocka med `ServiceTimeHelper.isCheckinOpen()` (enhetens tidszon, inte kyrkans). Det gör att en kiosk som står igång öppnar och stänger i tid. På en stängd tid som personen redan har visar den "Barnrum 1 · Incheckad" (gruppnamn).
- **Postning:** inne i `evaluateGates()`, före utvärderingen av kapacitet och kvot, avvisar `findClosedServiceTimeGroups()` batchen med `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` om någon berörd sessions gudstjänsttid ligger utanför sitt fönster. Eftersom ett hushålls befintliga besök för idag skickas om vid varje incheckning hoppar sessioner som personen redan har över kontrollen (`personId|sessionId` i de befintliga besöken). Därför avvisas inte en senare öppen gudstjänsttid bara för att ett tidigare fönster har stängt. B1Checkin visar detta på sin hårda kontrollskärm med orsaken "incheckningen är inte öppen just nu" (kapacitetsbrott visar fortfarande "rummet är fullt eller stängt").

### Ålder och årskurs (kioskbaserat)

Rumsbehörighet är rådgivande UI som utvärderas i kiosken och inte tillämpas av servern. `B1Checkin/src/helpers/EligibilityHelper.ts` jämför en persons födelsedatum eller årskurs med gruppens `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (årskursordning: förskoleklass, K, 1–12, Examinerad) och returnerar `eligible` / `ineligible` / `unknown`. Saknade uppgifter ger `unknown` och döljer aldrig ett rum. Åldrar och årskurser beräknas per kyrkans **datum för årskursflytt** (inställningen `gradePromotionDate`, `"MM-DD"`, redigeras i `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`). Kiosken hämtar det från `GET /attendance/checkin/settings`, och `resolveAsOfDate` väljer den senaste förekomsten på eller före idag. Rumsväljaren markerar behöriga rum och tonar ned obehöriga. Att välja ett nedtonat rum kräver bekräftelse av personal.

### Betrodda och ej godkända hämtningspersoner

Hämtningspersoner är en medlemsentitet per hushåll: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts`, med householdId, valfritt personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized` och notes). CRUD sker via `GET /membership/householdpickup/:householdId` (alla autentiserade kyrkans användare, så att kiosker kan läsa listan) samt `POST` / `DELETE` som kräver `people.edit`. Personalen förvaltar listan på personsidans kort **Hämtning** (`B1Admin/src/people/components/PickupPeople.tsx`): foto, relation och en statusbricka Betrodd / Ej godkänd.

Vid utcheckning (`B1Checkin/app/checkout.tsx`) hämtar kiosken hushållets hämtningslista. Poster med `trusted` visas som tryckbara hämtningskort bredvid hushållets fotorutnät för vuxna. Ett fritextnamn under "Annan" jämförs med oskarp matchning (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mot `notAuthorized`-poster. En träff blockerar utcheckningen med ett varningsblad och en knapp **Åsidosätt** för personal. Åsidosättningen loggas på själva besöket. Den skickar `checkedOutBy` som `"OVERRIDE: {name}"` via den vanliga `POST /attendance/visits/checkout`, så den hamnar i närvaroposten och i webhooken `attendance.checkout` i stället för i en separat granskningstabell.

### Sidsökning till förälder och nödutskick

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) exponerar två sms-endpoints:

- `POST /page`, med `{ visitId, message }`: sidsöker vårdnadshavarna till ett incheckat barn (kioskens utcheckningsskärm, bemannat läge).
- `POST /broadcast`, med `{ serviceId, message }`: skickar sms till alla vuxna i varje incheckat hushåll för en gudstjänst (kioskens admininställningar, bakom ett blad där man måste skriva `EMERGENCY` för att bekräfta, i `B1Checkin/app/adminSettings.tsx`).

Båda slår upp hushållens vuxna via membership-gatewayen och lämnar sedan över leveransen till **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`). Det är dörren mellan modulerna till kyrkans konfigurerade sms-leverantör (`@churchapps/texting`: TextInChurch, Clearstream eller MutualMinistry. Det finns ingen inbyggd sms-avsändare). Gatewayen loggar en rad `sentText` plus en `deliveryLog`-post per mottagare och begränsar en batch till 500 mottagare. Utan konfigurerad leverantör returnerar den `no_provider`, vilket kiosken visar som "Ingen sms-leverantör är konfigurerad". Controllerns `dispatch()` tar bort dubbletter av telefonnummer och hoppar över personer utan mobilnummer eller med `optedOut` satt. Den returnerar `{ sent, failed, skippedOptedOut, skippedNoPhone }` så att kiosken kan visa vad som hoppades över.

## Kiosken (B1Checkin)

Skärmarna är expo-router-filer under `B1Checkin/app/`. Tillståndet mellan skärmar ligger i en statisk klass `CachedData` (`src/helpers/CachedData.ts`), inte i React-state.

```
index (start/automatisk inloggning) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             laddar serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ skriv ut etiketter,
             groupServiceTimes,           │             └▶ checkout (bemannat)         återgå automatiskt
             labelTemplates               │                                            till lookup
```

1. **Sök** (`app/lookup.tsx`): sök på telefon (`GET /membership/people/search/phone?number=`, sista fyra eller hela numret) eller på namn (`GET /membership/people/search?term=`). Att välja en träff laddar hushållet (`GET /membership/people/household/{householdId}`) och befintliga besök (`GET /attendance/visits/checkin`), och fyller `pendingVisits` med förra veckans val.
2. **Granskning av hushåll** (`app/household.tsx`, `src/components/MemberList.tsx`): varje medlemsrad visar ett märke för redan incheckad, ett märke för allergi eller `nametagNotes` samt aktuella rumschip. Att expandera en medlem listar varje gudstjänsttid med en rumsknapp plus chipsen för incheckningstyp Medlem / Gäst / Volontär (`MemberServiceTimes.tsx`). Under varje gudstjänsttids namn visar `ServiceTimeHelper.getGroupSummary()` grupperna som erbjuds där (namnen i `serviceTime.groups`, trimmade, dubbletter borttagna utan hänsyn till versaler och sammanfogade med kommatecken). Inget visas om tiden saknar grupper.
3. **Gruppval** (`app/selectGroup.tsx`): ett kategoriträd byggt av `serviceTime.groups`, där rum som passar ålder och årskurs markeras och olämpliga tonas ned bakom en bekräftelse av personal (se [Ålder och årskurs](#ålder-och-årskurs-kioskbaserat)). Att välja ett rum skriver en visitSession `{ session: { serviceTimeId, groupId } }` i den personens väntande besök (`src/helpers/VisitSessionHelper.ts`). "Ingen" rensar valet.
4. **Slutför** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` med `pendingVisits` (där varje besök stämplas med sin `checkinType`). Därefter skrivs etiketter ut om en skrivare är konfigurerad, och skärmen återgår automatiskt till sök. Ett `409`-svar för kapacitet eller `notOpen` visar det namngivna rummet med orsaken (fullt/stängt eller incheckning ej öppen). En kvotvarning erbjuder en bekräftelse av personal som skickar in igen med `acknowledgeWarnings=true`.

Utcheckningsskärmen (`app/checkout.tsx`) tar emot den fyrteckniga säkerhetskoden via ett automatiskt fokuserat fält. Därmed fungerar USB- och Bluetooth-streckkodsläsare som fungerar som tangentbord, utan kamera. Alternativt används ett skärmtangentbord med samma alfabet, som skickas automatiskt vid fyra tecken. Knappen **Skanna** öppnar ett blad med den delade kameran `src/components/CodeScanner.tsx` (bakåtvänd som standard, och den godkänner QR, Code 128 och Code 39). Det gör att stationer utan streckkodsläsare kan läsa hämtningsetiketten. En skannad kod matas in i samma `handleCode()`-väg som skriven text. Skärmen slår upp koden, visar barnen som hämtas och presenterar hushållets **betrodda hämtningspersoner** som tryckbara kort, bredvid ett fotorutnät med hushållets vuxna (plus alternativet "Annan" med fritext som jämförs med oskarp matchning mot namn som inte är godkända; se [Betrodda och ej godkända hämtningspersoner](#betrodda-och-ej-godkända-hämtningspersoner)). Därefter skickas `POST /attendance/visits/checkout` med väljarens namn och id. I bemannat läge erbjuder skärmen också **Sidsök förälder** (`POST /attendance/checkin/page`) och **omutskrift av säkerhetsetikett**. `reprint()` bygger familjens etiketter på nytt med `LabelHelper.getAllLabelsFor(...)` och matar dem genom samma `PrintUI`-väg som vid incheckning.

Stationens läge är en AsyncStorage-flagga `@StationMode` (`"self"` | `"manned"`, som växlas i `app/adminSettings.tsx`). Bemannat läge lägger till ingången för utcheckning på sökskärmen och redigering av personprofiler (`POST /membership/people`) från hushållsskärmen. Kioskhärdning finns inbyggd. En valfri PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) skyddar admin- och skrivarskärmarna. Adminskärmen öppnas bara med 7 snabba tryck på logotypen i sidhuvudet. En vilande attraktionsskärm (`src/hooks/useInactivityTimer.ts`) tar över mellan familjer.

## Självincheckning (B1App)

Medlemmar checkar in från portalen b1.church på skärmen `/mobile/checkin` (dirigeras av `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` till `screens/CheckinPage.tsx`). Den kräver en inloggad användare och går igenom samma fyra steg som kiosken: gudstjänster → hushåll → grupper → klar, mot samma endpoints. Tillståndet hålls i `B1App/src/helpers/CheckinHelper.ts`. Skillnaderna mot kiosken är: hushållet kommer från den inloggade användarens egna `householdId` (inget sökssteg), och ingen etikettutskrift sker. I stället visar slutskärmen batchens säkerhetskod som en QR-kod (`qrcode.react`) med texten "visa den här vid en incheckningsstation". Om hushållet redan är incheckat när sidan laddas visas knappen "Visa incheckningskod", som visar QR-koden igen utifrån första befintliga besök (från `GET /attendance/visits/checkin`) som har en `securityCode`. Incheckningen registreras direkt vid inskickning (det finns inget väntande tillstånd). QR-koden driver bara etikettutskriften i kiosken.

**Utskrift av etiketter från telefon till kiosk** (`B1Checkin/app/scan.tsx`, nås från knappen "Skanna kod" vid QR-koden på sökskärmen): kiosken visar `CodeScanner` (en `expo-camera` `CameraView`, som som standard är vänd mot användaren och kan vändas) och söker efter QR-koder. `ScanCodeHelper.parse()` godkänner bara en nyttolast som är en ren 4-teckenkod ur säkerhetskodens alfabet. `ScanCodeHelper.isRepeat()` ignorerar samma kod i 4 sekunder, så både QR-koden från B1App och QR-blocket på en utskriven etikett fungerar. Skärmen följer sedan samma omutskriftsväg som utcheckningen: `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`, och återgår till sök. Ingen närvaroskrivning sker vid skanningen. Det är bara etiketter. Koder utan aktiva besök, stationer utan skrivare och grupper utan etiketter visar var sitt meddelande och återgår till sök.

Typer och `ApiHelper`/`ArrayHelper` kommer från `@churchapps/helpers` och `@churchapps/apphelper`. Inga React-komponenter delas med B1Admin.

## Närvaro på adminsidan (B1Admin)

- **Inställningar**: `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) visar strukturträdet och skapar gudstjänster (`ServiceEdit.tsx`) och gudstjänsttider (`ServiceTimeEdit.tsx`). Campusdata kommer från medlemsdelen via hooken `useCampuses()`.
- **Manuell närvaro** ligger under Grupper, inte i närvarodelen. `B1Admin/src/groups/components/GroupSessionsTab.tsx` skapar sessioner (`POST /attendance/sessions`). Vid tillägg kan `SessionEdit.tsx` inkludera en session per övrig grupp som delar den valda gudstjänsttiden, och hoppar över grupper som redan har en session det datumet. Personer markeras närvarande via `POST /attendance/visitsessions/log`, som hittar eller skapar besöket för personen och sessionen. Gruppledare kan registrera närvaro för sina egna grupper utan behörigheten `attendance.edit`. Kontrollerna kollar `au.leaderGroupIds`.
- **Rapportering**: närvarotrenden och gruppnärvaro är rapporter som definieras på servern (`B1Admin/src/components/reporting/ReportWithFilter.tsx` mot ReportingApi. Definitionerna finns i `Api/reports/*.json`). Båda tar `startDate`/`endDate` (slutdatum inkluderas). Trendrapporten har som standard ett år bakåt till idag och lägger till en kolumn `sessionDates` per vecka. Gruppnärvarons trädvy på skärmen innehåller varje besöks `checkinTime` och personens `membershipStatus`. Gruppnärvarons CSV kommer från den medföljande rapporten `groupAttendanceDownload`. `GroupAttendanceDownloadHelper` pivoterar den till en rad per gruppmedlem, med en kolumn för närvarande/frånvarande per daterad session. Personens historik hämtas via `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Utskrift av etiketter

### Mallar och redigeraren

Kyrkor designar sina egna etiketter i B1Admin på `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, nås från inställningssidan för Check-In). En mall är en rad i `labelTemplates` vars `content` är en JSON-array av block: `text`, `field`, `barcode`, `qrcode` eller `box`. Varje block placeras i procentkoordinater med typsnitt, justering, symbologi (`code39`/`code128`/`qr`) och valfria synlighetsvillkor (t.ex. visa allergirutan bara när `person.nametagNotes` är ifyllt). Det finns två `labelType`: `nametag` (en per incheckad person, med fält som `person.displayName`, `sessions`, `securityCode` och `person.isBirthdayWeek`. Det sistnämnda är `"true"` när personens födelsedags månad och dag ligger inom 3 dagar från idag, även över årsskiftet, beräknat av `LabelHelper.isBirthdayWithin()`) och `pickup` (en per familj, med fält som `children` och `childrenAllergies`). Servern tillämpar en enda standardmall per typ och kyrka (`LabelTemplateController.save`). Redigeraren levererar startmallar som speglar kioskens inbyggda etiketter, och förhandsgranskar mot exempeldata.

### Rendering och utskrift i kiosken

Vid slutförd incheckning avgör `B1Checkin/src/helpers/LabelHelper.ts` vad som ska skrivas ut utifrån gruppflaggorna på varje väntande besök. Namnbrickor skrivs för grupper med `printNametag`, och en familjeetikett för hämtning skrivs om något besök träffade en grupp med `parentPickup`. Besök med `checkinType` `volunteer` hoppas över av `LabelHelper.selectChildVisits()`, så att en barnvakt i ett rum för hämtning aldrig utlöser en etikett för hämtning. Säkerhetskoden från incheckningssvaret läggs på barnens namnbrickor och på hämtningsetiketten. Vuxnas namnbrickor skrivs ut utan kod. Om kyrkan har mallar omvandlar `LabelRenderer` (`src/helpers/LabelRenderer.ts`) block och ett fältunderlag till ett fristående HTML-dokument. Annars används de inbyggda HTML-etiketterna i `B1Checkin/assets/labels/` med ersättning av platshållare.

Streckkoder genereras som inline-SVG av rena TypeScript-kodare i `B1Checkin/src/helpers/barcode.ts`. Det är mönstertabeller för Code 39 och breddtabeller för Code 128 (kodset B med mod-103-kontrollsiffra), samt QR via paketet `qrcode`. **Kodarna är medvetet duplicerade i B1Admin** (`LabelEditor.tsx` har samma tabeller inlinade, noterat i en kodkommentar), så att förhandsvisningarna i redigeraren stämmer pixel för pixel med kioskens utdata. En ändring i den ena måste speglas i den andra.

Utskriftspipen (`src/components/PrintUI.tsx`) renderar varje HTML-etikett i en `WebView`, fångar den till JPG med `react-native-view-shot`, och skickar bildadresserna till den inbyggda Expo-modulen **printer-helper** (`B1Checkin/modules/printer-helper/`). Modulen exponerar `scan()`, `checkInit()`, `printUris()` och statushändelser, med en leverantör per märke på båda plattformarna:

| Märke | Android | iOS | Anteckningar |
|-------|---------|-----|--------------|
| Brother | `BrotherProvider.kt` (Brothers print-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-serien nätverksskrivare (QL-800/810W/820NWB/1100/1110NWB…), stansade 29×90-etiketter. Rekommenderad standard |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Nätverkssökning + TCP/ZPL-bildutskrift |

Skrivarvalet ligger i `app/printers.tsx` (en nätverkssökning returnerar poster i formatet `brand~model~ip`. Valet sparas i AsyncStorage). `src/helpers/PrinterLog.ts` för en diagnosloggen på enheten, som visas via en statusprick i kioskens sidhuvud.

## Gästregistrering

Två vägar skapar en person mitt i en incheckning:

- **I kiosken**: knappen "Lägg till gäst" på hushållsskärmen öppnar `B1Checkin/app/addGuest.tsx`. Den söker först via `GET /membership/people/search?term=` efter en befintlig matchning som inte är medlem. Annars skapas en ny med `POST /membership/people`, kopplad till det aktuella hushållet. Gästen går sedan genom gruppvalet som vilken medlem som helst.
- **Självbetjäning via QR**: när kyrkans inställning `enableQRGuestRegistration` är på (konfigureras i B1Admins inställningar för Check-In och läses från `GET /membership/settings/public/{churchId}`), visar kioskens sökskärm en QR-kod som länkar till `https://{subdomain}.b1.church/guest-register?serviceId=`. Den sidan i B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) låter ett besökande hushåll registrera sig själv på sin egen telefon via den anonyma endpointen `POST /membership/people/guest-register`. Det håller kölinjen i rörelse. QR-bladet har också en knapp **Registrera här**, som öppnar samma sida i kiosken (`app/guestRegister.tsx`) i en `WebView` utan cache och i inkognitoläge. `src/helpers/GuestRegisterHelper.ts` bygger webbadressen både för QR-koden och för `WebView`, och blockerar navigering utanför `https://{subdomain}.b1.church/guest-register`. Skärmen går tillbaka till sök vid **Klar**, vid bakåt eller efter 120 sekunders inaktivitet (inmatning i formuläret skickas från `WebView` som aktivitet). Då avmonteras `WebView`, så att ett hushålls uppgifter aldrig når nästa familj.

Registreringen via QR styrs av kyrkoinställningar som sparas på kortet **QR-gästregistrering** i B1Admin (`src/mobile/CheckInPage.tsx`):

| Inställning | Synlighet | Syfte |
|---|---|---|
| `enableQRGuestRegistration` | public | Tillval för QR-koden i kiosken och de anonyma endpointsen |
| `guestRegistrationFields` | public | JSON-karta över `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standard: e-post och telefon valfria, resten av. Förnamn och efternamn är alltid obligatoriska |
| `guestRegistrationImage` | public | URL till en rubrikbild. B1App visar den i 16:9 i stället för ikonen på formuläret och bekräftelseskärmen |
| `guestRegistrationGroupId` | private | Grupp som alla registreringar läggs till i (gäster ser eller väljer den aldrig) |
| `guestRegistrationRecordAttendance` | private | `"true"` för att även registrera närvaro i den gruppen |

B1Apps `src/components/checkin/GuestRegister.tsx` hämtar checklistan från den anonyma `GET /membership/people/guest-register/options?churchId=` och visar bara de fält som ingår (e-post, telefon, civilstånd och adress för primärkontakten. Födelsedatum, kön och årskurs per medlem, samt en kommentarsruta). Den skickar bara dessa. Servern tillämpar checklistan igen i `GuestRegistrationHelper.sanitize()`. Fält som är avstängda tas bort. Saknade obligatoriska värden eller värden utanför listan ger ett 400-fel. Först därefter körs `PersonHelper.registerGuestHousehold()`. Den anropar först `PersonRepo.findGuestMatch()` för varje medlem med e-post eller telefon. Exakt en levande person med samma förnamn och samma e-post eller telefonsiffror återanvänds. Noll eller flera träffar skapar en ny person, så att systemet aldrig gissar. En medlem utan kontaktuppgifter matchas på förnamn inom det matchade hushållet. Återanvända personer redigeras aldrig, så ett anonymt formulär kan inte skriva över lagrade uppgifter. Svaret ekar tillbaka de inskickade namnen. Omatchade medlemmar går med i det matchade hushållet eller ett nytt, som `membershipStatus: "Visitor"`, och `person.created` skickas för varje ny person. Efteråt loggas fel i stället för att returneras. Medlemmar läggs till i den konfigurerade gruppen (`group.member.added`). Om närvaroregistrering är på anropar `AttendanceModuleGateway.recordAttendance()` och markerar varje medlem närvarande för varje gudstjänsttid i gruppen som har ett schema och vars incheckningsfönster (`CheckinGateHelper.isServiceTimeOpen`) är öppet just nu. Sessionen för kyrkans lokala datum skapas vid behov. Oschemalagda gudstjänsttider och registreringar utanför fönstret registrerar ingenting. Kommentarer blir en dold personanteckning på hushållets huvudperson (meddelandeförfattare "Gästregistrering"), kopplad via `person.conversationId`.

## Relaterade sidor

- [Endpoints för närvaro](../api/endpoints/attendance.md) -- Hela REST-ytan för campus, gudstjänster, sessioner, besök och besökssessioner
- [Endpoints för medlemskap](../api/endpoints/membership.md) -- Personer, hushåll och grupper
- [Webhooks](../api/webhooks.md) -- Händelserna `session.created`, `attendance.recorded` och `attendance.checkout`
- [Modulstruktur](../api/module-structure.md) -- Hur närvaromodulen är organiserad på servern
