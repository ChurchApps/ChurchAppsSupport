---
title: "Bejelentkezések"
---

# Bejelentkezések

<div class="article-intro">

A bejelentkezés egy rendszer három bejárattal: a B1Checkin kioszkalkalmazás személyzeti és önkiszolgáló állomásokhoz, az önálló bejelentkezés a B1App tagi portálon belül, valamint a jelenléti nyilvántartás a B1Admin felületen. Mindhárom ugyanabba a jelenléti modulba ír az Api központi részében, és a gyermekszobák irányítását teljes egészében a Csoportok vezérlik — nincs külön „helyszín” vagy „terem” entitás. Ezt egy gyermekbiztonsági réteg egészíti ki: látogatásonkénti bejelentkezési típusok, szerveroldali kapacitás- és önkéntes-arány-korlátok, kioszkoldali kor- és osztályfokozat-ellenőrzés, megbízható átvételi ellenőrzés kijelentkezéskor, valamint szülői értesítés az egyház SMS-szolgáltatóján keresztül. Ez az oldal bemutatja az adatmodellt, a bejelentkezési folyamatokat, a biztonsági réteget és a címkenyomtatási folyamatot.

</div>

## Áttekintés

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

| Felület | Tároló | Technológia | Szerep |
|---------|--------|-------------|--------|
| Kioszk | `B1Checkin` | Expo / React Native, expo-router fájlalapú útválasztás; EAS-buildek Androidra, Amazon Fire-re és iOS-re; OTA-frissítések az `expo-updates` segítségével | Személyzeti vagy önkiszolgáló állomás címkenyomtatással és ellenőrzött kijelentkezéssel |
| Önálló bejelentkezés | `B1App` | Next.js (b1.church tagi portál) | A bejelentkezett tagok telefonról jelentkeztetik be a háztartásukat; nincs nyomtatás |
| Adminisztráció | `B1Admin` | React SPA | Beállítja a szolgálati struktúrát, csoportokat rendel a szolgálati időpontokhoz, címkéket tervez, kézi jelenlétet rögzít, jelentéseket futtat |

Mindhárom ugyanazt a két API-modult hívja az `ApiHelper` segítségével: **MembershipApi** (`/membership`) a személyekhez, háztartásokhoz és csoportokhoz; **AttendanceApi** (`/attendance`) az alábbi összes funkcióhoz.

## Adatmodell (`Api/src/modules/attendance`)

| Entitás / tábla | Kulcsmezők | Jelentés |
|----------------|-----------|---------|
| `campuses` | name, address | Itt elavult — a campusokat a tagság modul (`/membership/campuses`) kezeli törzsadatként; a jelenléti modulban lévő másolat csak olvasható, a régi olvasók számára megfagyasztva (`models/Campus.ts`) |
| `services` | campusId, name | Ismétlődő összejövetel, pl. „Vasárnapi reggel” (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Időpont egy szolgálaton belül, pl. „9:00” (`models/ServiceTime.ts`). Az ütemezési oszlopok opcionálisak (migráció: `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`), és a [bejelentkezési ablakot](#scheduled-check-in-windows) vezérlik |
| `groupServiceTimes` | groupId, serviceTimeId | Kapcsolótábla: mely csoportok (termek) találkoznak mely szolgálati időpontokban (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Egy csoport egy találkozója egy adott napon — a bejelentkezéskor jön létre, szükség szerint (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Egy személy részvétele egy adott napon (`models/Visit.ts`). A `checkinType` értéke `member` / `guest` / `volunteer` (NULL = régi tag); a kioszk állítja be, és a kapacitás- és arány-korlátok használják |
| `visitSessions` | visitId, sessionId | Mely szekció(k)at fed le egy látogatás — két szolgálati időpontba bejelentkezett gyermek két sort kap (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-blokkok) | Tervezhető címkeelrendezések (`models/LabelTemplate.ts`) |

### Hogyan mentődik el egy befejezett bejelentkezés

A `VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) kezeli a `POST /attendance/visits/checkin?serviceId=&peopleIds=` végpontot. A törzs `Visit` objektumok tömbje, amelyek mindegyike `visitSessions` elemeket hordoz; ezek beágyazott `session` mezője csak egy `(serviceTimeId, groupId)` párost nevez meg. A szerver ezután:

1. **Még írás előtt ellenőrzi a kapacitást és az arányokat.** Az `evaluateGates()` → `CheckinGateHelper.evaluate()` minden érintett terem kapacitását, vendégkapacitását, lezárt állapotát és önkéntes-arányát ellenőrzi a jelenlegi létszámhoz képest. A postCheckin **nem tranzakcionális**, ezért az ellenőrzésnek az első mentés előtt kell lefutnia: súlyos szabálysértés esetén 409-es válasz érkezik, amely megnevezi az érintett termeket, és semmi nem mentődik el. Lásd: [Kapacitás- és önkéntes-arány-korlátok](#capacity-and-volunteer-ratio-gates).
2. **A szekciókat igény szerint oldja fel.** A `getSessionId()` megkeresi vagy létrehozza a `sessions` sort a `(groupId, serviceTimeId, mai nap)` kombinációhoz — a szekcióazonosítók dátumonként a folyamat memóriájában vannak gyorsítótárazva. Az új szekciók `session.created` webhookot indítanak. A ciklus egy megvárt `for..of` — egy korábbi „tűz és felejtsd el” `forEach(async …)` versenyhelyzetet okozott a mentéssel, és az első szekció létrehozásakor NULL sessionId-kat írt (javítva; a ciklusnál kódkommentben jelezve).
3. **Lecseréli a nap rekordjait.** Az adott személyek ezen a szolgálaton, ma meglévő látogatásai a hozzájuk tartozó visitSessions-ökkel együtt törlődnek, majd a beküldött halmaz mentődik. Egy család újra bejelentkeztetése ezért idempotens „ez a jelenlegi állapot” művelet, nem hozzáfűzés. A `?checkDuplicates=true` paraméter írás nélkül `{ duplicates: [personId…] }` választ ad — a kioszk ezzel figyelmeztet a felülírás előtt.
4. **Köteg-szintenként egy biztonsági kódot generál.** A `SecurityCodeHelper.generate()` a `23456789BCDFGHJKLMNPQRSTVWXYZ` ábécéből állít elő 4 karakteres kódot (nincsenek magánhangzók és összetéveszthető karakterek, így a kódok nem alkothatnak szavakat, és nem olvashatók félre). A szerver ütközés esetén újrapróbálkozik, az ugyanazon egyház aznapi nyitott látogatásaival szemben, és a kódot a köteg minden látogatására ráírja.
5. **A `{ streaks, securityCode }` értéket adja vissza.** A `streaks` a personId-khoz rendeli a egymás utáni heti jelenlétek számát; a kioszk a mérföldköveket (minden 5. hét) konfettivel ünnepli.

Minden mentett látogatás `attendance.recorded` webhookot is kibocsát. Az olvasó oldal, a `GET /attendance/visits/checkin`, a személyek látogatásait a **legutoljára rögzített dátumukról** adja vissza. Ha ez egy korábbi hét volt, az azonosítók törlődnek, így a kliens az előző heti teremválasztások előre kitöltött másolatát kapja, amely új rekordként menthető el.

### Kijelentkezés

Két végpont zárja a folyamatot (`VisitController`):

- `GET /attendance/visits/code/:code` — a mai, még ki nem jelentkezett látogatások, amelyek az adott biztonsági kódot viselik, a szekciókkal együtt.
- `POST /attendance/visits/checkout` — törzs: `{ visitIds, checkedOutBy?, checkedOutById? }`; rögzíti a `checkoutTime` értéket és azt, ki vette át a gyermeket, és látogatásonként `attendance.checkout` webhookot indít.

Jogosultságok: a kioszkok az `attendance.checkin` jogosultsággal hitelesítenek. Ez pontosan a bejelentkezési/kijelentkezési/címkesablon-felületet adja meg, továbbá azokat a háztartás-lekérdezéseket, amelyekre a kioszknak `people.view` nélkül van szüksége (telefonszám és név szerinti keresés, a háztartás tagjai a bejelentkezési modellben, és a háztartás átvételi listája). A B1Checkin `SessionHelper.filterChurches` csak azokat az egyházakat ajánlja fel, ahol a fióknak `Attendance/Checkin` vagy `Attendance/Edit` jogosultsága van. A `Checkin` már nem tartozik az Everyone (null szerepkörű) jogosultságok közé (`RoleHelper` és a `2026-11-01_remove_everyone_checkin` migráció), ezért valódi szerepkörön keresztül kell megadni. Az `attendance.view`/`attendance.edit` a jelentéskészítést és a kézi rögzítést fedi le; a struktúrát (szolgálatok, szolgálati időpontok, csoporthozzárendelések) a `services.edit` jogosultság szükséges. A tagok önálló bejelentkezéséhez (B1App) nincs szükség jogosultságra: bármely hitelesített felhasználó, akihez az egyházban személy kapcsolódik, hívhatja a `GET`/`POST /attendance/visits/checkin` végpontokat, a szerver pedig a beküldött `personId`-kat a hívó saját háztartására korlátozza (egyébként 403 — ez a korlát akadályozza, hogy más családok `securityCode`-jai olvashatóak legyenek). Maga a tagság a jogosultság; azt, hogy a tagok *látják-e* a funkciót, az egyház B1App navigációs fülei szabályozzák. A többi bejelentkezési végpont (`code/:code`, `checkout`, `guardians`, `CheckinController`) továbbra is csak kioszkok és személyzet számára érhető el.

## A csoportok irányítják a termeket

Nincs szoba- vagy terem-entitás a rendszerben. Egy „terem” olyan tagsági **csoport**, amelynél a `trackAttendance` be van kapcsolva, és amely a `groupServiceTimes` révén egy vagy több szolgálati időponthoz kapcsolódik. A csoportmezők (`Api/src/modules/membership/models/Group.ts`), amelyek a kioszk viselkedését alakítják:

| Mező | Hatás |
|------|-------|
| `trackAttendance` | A csoport egyáltalán részt vesz a jelenlétben; a B1Admin beállítási fája a `trackAttendance` csoportokat, amelyekhez nincs `groupServiceTimes` sor, hozzá nem rendelt csoportként jelöli |
| `parentPickup` | Gyermekszobát jelöl: ide bejelentkezve a látogatás „gyermek” látogatássá válik, amely családi átvételi címkét nyomtat, és a biztonsági kódot a névcímkére teszi |
| `printNametag` | Nyomtat-e névcímkét egyáltalán az ide történő bejelentkezés |
| `capacity` / `guestCapacity` / `checkinClosed` | Terem-kapacitáskorlátok és egy kemény „lezárt” kapcsoló, amelyet a bejelentkezési ellenőrzés szerveroldalon érvényesít (a B1Admin csoportbeállításai között, a „Check-In Capacity” alatt szerkeszthető) |
| `volunteerRatio` / `minVolunteers` | Gyermek–önkéntes arány és a minimális önkéntes-létszám, az egyházszintű `ratioEnforcement` beállítás szerint érvényesítve |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Kor- és osztályfokozat-feltételek, amelyeket a kioszk értékel ki a szobák kiemeléséhez vagy halványításához |

Minden kliens ugyanúgy dolgozza fel az adatokat (pl. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): a `GET /attendance/servicetimes?serviceId=`, a `GET /attendance/groupservicetimes` és a `GET /membership/groups` végpontokat párhuzamosan tölti be, majd minden szolgálati időponthoz összegyűjti azokat a csoportokat, amelyek `groupServiceTimes` sora rá mutat, és ezeket a `serviceTime.groups` tömbbe teszi. Ez a tömb az, amit a teremválasztó megjelenít, a csoport `categoryName` szerint csoportosítva.

A hozzárendeléseket a csoport oldaláról szerkesztik a B1Admin felületen (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), a teljes Campus → Service → Service Time → Group fát pedig a `B1Admin/src/attendance/components/AttendanceSetup.tsx` jeleníti meg a `GET /attendance/attendancerecords/tree` végponton keresztül.

:::info
Mivel a csoportok az egyetlen igazságforrást jelentik, ugyanaz a csoporttagság táplálja a kioszk-irányítást, a B1Admin csoportoldalainak névsor-jellegű jelenlétkezelését és a jelentéskészítést. Egy csoport szolgálati időponthoz rendelése az egyetlen lépés, amely bejelentkezési célponttá teszi.
:::

## Gyermekbiztonság

### Bejelentkezési típusok

Minden látogatás rendelkezik `checkinType` mezővel: `member`, `guest` vagy `volunteer` (a NULL érték régi/tag típust jelent; migráció: `tools/migrations/attendance/2026-07-03_checkin_type.ts`). A típust a **kioszk oldalon** választják ki: a kibontott tagsori Member / Guest / Volunteer chipeken (`B1Checkin/src/components/MemberServiceTimes.tsx`), és a bejelentkezés befejezésekor minden függő látogatásra rábélyegzik (`app/checkinComplete.tsx`, alapértelmezetten `member`). A szerver ezt a típust az ellenőrzésben használja: az önkéntesek a kapacitás helyett az arány-lefedettséghez számítanak, a vendégek pedig a `guestCapacity` ellen.

### Kapacitás- és önkéntes-arány-korlátok

A `CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) a `postCheckin` részeként, mentés előtt fut (a végpont nem tranzakcionális, ezért a mentés előtti ellenőrzés a helyességet biztosítja). Csoportonként betölti az aktuális létszámot (`VisitRepo.countActiveByGroupToday`) és a csoport konfigurációját a tagság modul átjárón keresztül, majd besorolja a szabálysértéseket:

- **Kemény (mindig blokkol):** `checkinClosed`, `current + incoming > capacity`, a vendéglétszám meghaladja a `guestCapacity` értéket. A köteget `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` válasszal utasítja el a szerver — a kioszk megnevezi a szobát.
- **Arány (figyelmeztet vagy blokkol):** nem önkéntes bejelentkezés olyan szobába, ahol `volunteers < minVolunteers`, nincs egyetlen önkéntes sem, vagy `children > volunteers × volunteerRatio`. A súlyosság az egyházi `ratioEnforcement` beállítást követi (`"warn"` az alapértelmezett / `"block"`; a B1Admin Manage Church → Check-In felületen szerkeszthető, `CheckinSettingsEdit.tsx`). Figyelmeztető módban `409 { warning: true, error: "ratio", … }` válasz érkezik, kivéve ha a kliens `acknowledgeWarnings=true` paraméterrel újra beküldi — ez az újrabeküldés a kioszk személyzeti megerősítéses felülbírálása.

### Ütemezett bejelentkezési ablakok

Egy szolgálati időpont tartalmazhat opcionális heti ütemezést (`dayOfWeek` 0–6, ahol 0 = vasárnap; `startTime`/`endTime` `HH:mm` formátumban; `checkinOpenMinutes`, `checkinCloseMinutes`). Ezt a B1Admin **Attendance → Setup** felületének szolgálati időpont űrlapján lehet szerkeszteni (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Check-in Schedule”). A `CheckinGateHelper.hasSchedule()` csak akkor tekinti ütemezettnek a szolgálati időpontot, ha a `dayOfWeek` és a `startTime` is be van állítva; az ütemezetlen időpontokat soha nem korlátozza időben. Az `isServiceTimeOpen()` az ablakot helyi falióra-idő szerint számolja (`DateHelper.toChurchTime`). Az időzónát szolgálati időpontonként a `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) határozza meg: először a szolgálat campusának `timezone` értéke (`service.campusId`, a `MembershipModuleGateway.loadCampusTimeZones` segítségével), majd az egyház `timeZone` értéke (a B1Admin Church Information részében), majd az első nem törölt, `timezone` értékkel rendelkező campus (`loadCampusTimeZone`), és csak végül az `America/New_York`. A campus azért van elöl, mert a legtöbb egyházban az `America/New_York` került visszamenőlegesen az egyház időzónájába. Az alábbi listázási és beküldési útvonal is ugyanígy oldja fel az időzónát. Az ablak a kezdés előtt `checkinOpenMinutes` perccel nyit és a vég után `checkinCloseMinutes` perccel zár (vagy a kezdés után, ha nincs vég), és kezeli a hétközi határokon vagy éjfélen átnyúló ablakokat.

Az ablakot két helyen érvényesítik:

- **Listázás:** a `GET /attendance/servicetimes` minden sorhoz kiszámított `checkinOpen` logikai értéket csatol. A B1App önálló bejelentkezése (`CheckinPage.tsx`) és a B1Checkin szolgálatválasztója (`app/services.tsx`) minden időpontot megtart. Ha egy szolgálat összes időpontja zárva van, a legközelebbi nyitást mutatják („Check-in opens Sun 9:30 AM.” a B1App-ban, „Check-in for this service opens Sun 9:30 AM.” a B1Checkinben, a `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel` alapján), és ha nem számítható ki nyitás, a „Check-in isn't open for this service right now.” szöveg jelenik meg (a kioszkon van Vissza gomb, amellyel másik szolgálatot lehet választani). Egyébként a zárt időpontok nem választható „Closed” / „Closed · opens 9:30 AM” sorként jelennek meg. A B1Checkin háztartás-képernyője (`MemberServiceTimes.tsx`) a `ServiceTimeHelper.isCheckinOpen()` segítségével élőben újraértékeli a nyitottságot az eszköz óráján (az eszköz időzónájával, nem az egyházéval), így a hosszan futó kioszk a helyes időben nyit és zár, és egy zárt időponton, ahol a személy már be van jelentkezve, a „Kids Room 1 · Checked in” (csoportnév) szöveget mutatja.
- **Beküldés:** az `evaluateGates()` belsejében, a kapacitás- és arány-értékelés előtt a `findClosedServiceTimeGroups()` elutasítja a köteget `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` válasszal, ha bármely érintett szekció szolgálati időpontja az ablakán kívül esik. Mivel a háztartás mai meglévő látogatásai minden bejelentkezéskor újra beküldésre kerülnek, azok a szekciók, amelyeket a személy már birtokol (a meglévő látogatásokban szereplő `personId|sessionId`), átugorják ezt az ellenőrzést, így egy későbbi nyitott szolgálati időpont hozzáadását nem utasítja el az, hogy egy korábbi ablak bezárult. A B1Checkin ezt a kemény ellenőrzési képernyőjén keresztül jeleníti meg a „check-in isn't open right now” („a bejelentkezés most nem nyitott”) indokkal (a kapacitási szabálysértések továbbra is a „room is full or closed” – „a terem tele van vagy zárva” – szöveget mutatják).

### Kor- és osztályfokozat-jogosultság (kioszk oldalon)

A szobák jogosultsága tanácsadó jellegű felhasználói felület, amelyet a kioszkon értékelnek ki, nem a szerver kényszerít ki. A `B1Checkin/src/helpers/EligibilityHelper.ts` összehasonlítja a személy születési dátumát/osztályfokozatát a csoport `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` értékeivel (osztályfokozat-sorrend: PreK, K, 1–12, Graduated), és `eligible` / `ineligible` / `unknown` értékek egyikét adja vissza — a hiányzó adat `unknown` eredményt ad, és soha nem rejt el szobát. A kor és az osztályfokozat az egyház **osztályelőmenetel dátumához** (`gradePromotionDate` beállítás, `"MM-DD"` formátumban, a `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` felületen szerkeszthető) képest kerül kiszámításra; a kioszk ezt a `GET /attendance/checkin/settings` végpontról tölti be, a `resolveAsOfDate` pedig a legutóbbi, mai napon vagy azelőtt bekövetkezett előfordulást választja. A teremválasztó kiemeli a jogosult szobákat, és halványítja a nem jogosultakat; halványított szoba kiválasztásához személyzeti megerősítés szükséges.

### Megbízható és nem engedélyezett átvétel

Az átvevő személyek a tagság entitásai, háztartásonként: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, opcionális personId, name, photoUrl, relationship, `status` értéke `trusted` / `notAuthorized`, notes). A CRUD műveletek: `GET /membership/householdpickup/:householdId` (bármely hitelesített egyházi felhasználó, így a kioszkok is olvashatják), valamint a `POST` / `DELETE` műveletek, amelyekhez `people.edit` jogosultság kell. A személyzet a lista kezelését a személy oldalának **Pickup** kártyáján végzi (`B1Admin/src/people/components/PickupPeople.tsx`) — fotó, kapcsolat és egy Trusted / Not Authorized állapotjelző chip.

Kijelentkezéskor (`B1Checkin/app/checkout.tsx`) a kioszk betölti a háztartás átvételi listáját: a `trusted` bejegyzések tapintható átvételi kártyákként jelennek meg a háztartási felnőttek fotórácsa mellett. A szabadon beírt „Other” (Egyéb) nevet a rendszer közelítő egyezéssel (Levenshtein-távolság, `src/helpers/PickupMatchHelper.ts`) veti össze a `notAuthorized` bejegyzésekkel. Egyezés esetén a kijelentkezést figyelmeztető lap blokkolja, és egy személyzeti **Override** (Felülbírálás) gomb jelenik meg. A felülbírálás magán a látogatáson naplózódik: a normál `POST /attendance/visits/checkout` végponton `checkedOutBy` értékként `"OVERRIDE: {name}"` kerül elküldésre, így a jelenléti nyilvántartásba és az `attendance.checkout` webhookba kerül, nem egy külön auditáló táblába.

### Szülő értesítése és vészhelyzeti üzenet

A `CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) két SMS-végpontot kínál:

- `POST /page` — `{ visitId, message }`: egy bejelentkezett gyermek gondviselőinek értesítése (kioszk kijelentkezési képernyő, személyzettel működtetett módban).
- `POST /broadcast` — `{ serviceId, message }`: szolgálatonként minden bejelentkezett háztartás felnőttjének SMS-t küld (kioszk adminisztrációs beállítások, a `B1Checkin/app/adminSettings.tsx` fájlban egy `EMERGENCY` típusú megerősítő lap mögött).

Mindkét végpont a tagság átjárón keresztül oldja fel a háztartás felnőttjeit, majd a kézbesítést a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) kapja meg — ez az átjáró az egyház beállított SMS-szolgáltatójához vezet (`@churchapps/texting`: TextInChurch, Clearstream vagy MutualMinistry; beépített SMS-küldő nincs). Az átjáró egy `sentText` sort és címzettenként `deliveryLog` bejegyzéseket naplóz, egy köteg legfeljebb 500 címzettet tartalmazhat. Ha nincs szolgáltató beállítva, `no_provider` értéket ad vissza, amelyet a kioszk „No SMS provider configured” („Nincs beállítva SMS-szolgáltató”) üzenetként jelenít meg. A vezérlő `dispatch()` függvénye deduplikálja a telefonszámokat, és kihagyja azokat, akiknek nincs mobilszámuk vagy `optedOut` jelölést kaptak, és `{ sent, failed, skippedOptedOut, skippedNoPhone }` értéket ad vissza, hogy a kioszk megmutathassa, mi maradt ki.

## A kioszk (B1Checkin)

A képernyők expo-router fájlok a `B1Checkin/app/` mappában; a képernyők közötti állapot egy statikus `CachedData` osztályban él (`src/helpers/CachedData.ts`), nem React-állapotként.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Keresés** (`app/lookup.tsx`) — keresés telefonszám (`GET /membership/people/search/phone?number=`, utolsó 4 vagy teljes szám) vagy név (`GET /membership/people/search?term=`) alapján. Egy találat kiválasztása betölti a háztartást (`GET /membership/people/household/{householdId}`) és a meglévő látogatásokat (`GET /attendance/visits/checkin`), és a `pendingVisits` listát az előző heti választásokkal tölti fel.
2. **Háztartás áttekintése** (`app/household.tsx`, `src/components/MemberList.tsx`) — minden tagsor mutatja, ha már be van jelentkezve (jelvény), az allergia/`nametagNotes` jelvényt és az aktuális teremchipeket. Egy tag kibontásakor minden szolgálati időpont listázódik egy teremgombbal, valamint a Member / Guest / Volunteer bejelentkezési típus chipek (`MemberServiceTimes.tsx`). Minden szolgálati időpont neve alatt a `ServiceTimeHelper.getGroupSummary()` megmutatja az ott elérhető csoportokat (a `serviceTime.groups` nevei, levágva, kisbetű-érzéketlenül deduplikálva, vesszővel elválasztva); ha az időponthoz nincs csoport, semmi nem jelenik meg.
3. **Csoport-hozzárendelés** (`app/selectGroup.tsx`) — a `serviceTime.groups` alapján épített kategóriafa, a korra/osztályfokozatra jogosult szobák kiemelve, a nem jogosultak halványítva, személyzeti megerősítés mögött (lásd: [Kor- és osztályfokozat-jogosultság](#agegrade-eligibility-kiosk-side)). Egy szoba kiválasztása egy `{ session: { serviceTimeId, groupId } }` visitSession-t ír az adott személy függő látogatásába (`src/helpers/VisitSessionHelper.ts`). A „None” (Nincs) törli a választást.
4. **Befejezés** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` a `pendingVisits` listával (mindegyik a `checkinType` értékével bélyegezve), majd ha van beállított nyomtató, címkék nyomtatása, és automatikus visszatérés a keresésbe. A `409` válasz (kapacitás vagy `notOpen`) az érintett szobát az okkal együtt mutatja (tele/lezárt vagy nincs nyitva a bejelentkezés); az arány-figyelmeztetés személyzeti megerősítést kínál, amely `acknowledgeWarnings=true` paraméterrel újra beküld.

A **kijelentkezési** képernyő (`app/checkout.tsx`) egy automatikusan fókuszált beviteli mezőn fogadja a 4 karakteres biztonsági kódot — így a USB/Bluetooth billentyűzet-emulációs vonalkódolvasók kamera nélkül is működnek — vagy egy képernyő-billentyűzeten, ugyanazzal az ábécével, 4 karakter után automatikusan beküldve. A **Scan** (Beolvasás) gomb egy lapot nyit meg a megosztott `src/components/CodeScanner.tsx` kamerával (alapértelmezetten hátsó kamera, QR-, Code 128- és Code 39-kódot fogadva), így azok az állomások, amelyeken nincs vonalkódolvasó, is be tudják olvasni az átvételi címkét; a beolvasott kód ugyanazt a `handleCode()` útvonalat használja, mint a begépelt bevitel. A képernyő megkeresi a kódot, megmutatja a felvett gyermekeket, és a háztartás **megbízható átvevő személyeit** tapintható kártyákként mutatja a háztartási felnőttek fotórácsa mellett (valamint egy „Other” szabad szöveges opciót, amelyet a nem engedélyezett nevekkel közelítően ellenőriz — lásd [Megbízható és nem engedélyezett átvétel](#trusted-and-not-authorized-pickup)), majd a `POST /attendance/visits/checkout` végpontra küldi a kiválasztott személy nevét/azonosítóját. Személyzettel működtetett módban a képernyő felajánlja a **Page a parent** (Szülő értesítése) műveletet (`POST /attendance/checkin/page`) és a **biztonsági címke újranyomtatását** is — a `reprint()` a `LabelHelper.getAllLabelsFor(...)` segítségével újraépíti a család címkéit, és ugyanazon a `PrintUI` folyamaton keresztül nyomtatja, mint a bejelentkezés.

Az állomás jellegét egy AsyncStorage-jelző, az `@StationMode` határozza meg (`"self"` | `"manned"`, az `app/adminSettings.tsx` fájlban állítható). A személyzettel működtetett mód hozzáadja a kijelentkezési belépési pontot a keresési képernyőhöz, valamint a személyek profiljának szerkesztését (`POST /membership/people`) a háztartási képernyőről. A kioszk megerősítése beépített: egy opcionális PIN-kód (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) védi az adminisztrációs és nyomtatói képernyőket, az adminisztrációs képernyő csak a fejlécben lévő logón történő 7 gyors koppintásra nyílik meg, a családok között pedig egy tétlen üdvözlő képernyő (`src/hooks/useInactivityTimer.ts`) veszi át az irányítást.

## Önálló bejelentkezés (B1App)

A tagok a b1.church portálon, a `/mobile/checkin` képernyőn jelentkeznek be (a `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx` felé irányítja). Bejelentkezett felhasználót igényel, és ugyanazt a négy lépést járja be, mint a kioszk — szolgálatok → háztartás → csoportok → befejezés —, ugyanazokon a végpontokon, a állapotot pedig a `B1App/src/helpers/CheckinHelper.ts` tartja. A különbségek a kioszkhoz képest: a háztartás a bejelentkezett felhasználó saját `householdId` értékéből származik (nincs keresési lépés), és nincs címkenyomtatás — helyette a befejező képernyő a köteg biztonsági kódját QR-kódként (`qrcode.react`) jeleníti meg, a „show this at a check-in station” („mutasd ezt egy bejelentkezési állomáson”) tippel. Ha a háztartás már be van jelentkezve, amikor az oldal betöltődik, a „Show check-in code” (Bejelentkezési kód megjelenítése) gomb újra megjeleníti a QR-kódot az első meglévő látogatásból (a `GET /attendance/visits/checkin` végpontról), amely rendelkezik `securityCode` értékkel. A bejelentkezés a beküldés pillanatában azonnal rögzítődik (nincs függő állapot); a QR-kód csak a kioszknál vezérli a címkenyomtatást.

**Telefonról a kioszkra történő címkenyomtatás** (`B1Checkin/app/scan.tsx`, a keresési képernyő „Scan code” gombjáról érhető el): a kioszk a `CodeScanner` komponenst jeleníti meg (egy `expo-camera` `CameraView`, alapértelmezetten előlapi kamerával, átfordítható), QR-kódokat keresve. A `ScanCodeHelper.parse()` csak akkor fogad el egy adatot, ha az egy tiszta, a biztonsági kód ábécéjéhez tartozó 4 karakteres kód; a `ScanCodeHelper.isRepeat()` 4 másodpercig figyelmen kívül hagyja ugyanazt a kódot, így mind a B1App QR-kódja, mind a nyomtatott címke QR-blokkja működik. A képernyő ezután a kijelentkezési újranyomtatási útvonalat követi — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — és visszatér a keresésbe. A beolvasáskor nem történik jelenléti írás; csak címkék készülnek. Az aktív látogatás nélküli kódok, a nyomtató nélküli állomások és a címke nélküli csoportok mindegyike toast-üzenetet jelenít meg, és visszatér a keresésbe.

A típusok és az `ApiHelper`/`ArrayHelper` a `@churchapps/helpers` és a `@churchapps/apphelper` csomagokból származnak; React-komponens nincs megosztva a B1Admin felülettel.

## Adminisztratív jelenlét (B1Admin)

- **Beállítás** — a `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) jeleníti meg a struktúrafát, és innen lehet szolgálatokat (`ServiceEdit.tsx`) és szolgálati időpontokat (`ServiceTimeEdit.tsx`) létrehozni. A campusadatokat a tagság modulból a `useCampuses()` hook szolgáltatja.
- **A kézi jelenlét** a csoportok oldalán érhető el, nem a jelenléti részben: a `B1Admin/src/groups/components/GroupSessionsTab.tsx` hoz létre szekciókat (`POST /attendance/sessions`; hozzáadáskor a `SessionEdit.tsx` a kiválasztott szolgálati időponton osztozó minden más csoporthoz is létrehozhat egy-egy szekciót, kihagyva azokat a csoportokat, amelyeknek már van szekciójuk az adott napon), és a személyeket a `POST /attendance/visitsessions/log` végponton jelöli jelenlévőnek, amely megkeresi vagy létrehozza a személy adott szekcióhoz tartozó látogatását. A csoportvezetők a `attendance.edit` jogosultság nélkül is rögzíthetik a jelenlétet a saját csoportjaikban — a vezérlők ezt a `au.leaderGroupIds` alapján ellenőrzik.
- **Jelentéskészítés** — a jelenléti trend és a csoportos jelenlét a szerver által definiált jelentések (`B1Admin/src/components/reporting/ReportWithFilter.tsx` a ReportingApi-n keresztül; a definíciók az `Api/reports/*.json` fájlokban vannak). Mindkettő `startDate`/`endDate` paramétert fogad (a záródátum beleértendő); a trendjelentés alapértelmezetten az egy évvel ezelőtti naptól a mai napig tart, és heti `sessionDates` oszlopot ad hozzá; a csoportos jelenlét képernyőn látható fája minden látogatás `checkinTime` értékét és a személy `membershipStatus` értékét tartalmazza. A csoportos jelenlét CSV-je a kapcsolódó `groupAttendanceDownload` jelentésből származik, amelyet a `GroupAttendanceDownloadHelper` pivotál: csoporttagonként egy sor, minden dátumozott szekcióhoz egy jelen/hiányzó oszloppal. A személyenkénti előzmények a `GET /attendance/attendancerecords?personId=` végponton érhetők el (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Címkenyomtatás

### Sablonok és a tervező

Az egyházak a B1Admin felületen, a `/mobile/checkin/labels` címen tervezik meg a saját címkéiket (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, a Check-In beállítások oldaláról érhető el). A sablon egy `labelTemplates` sor, amelynek `content` mezője blokkok JSON-tömbje — `text`, `field`, `barcode`, `qrcode` vagy `box` típusú —, mindegyik százalékos koordinátákkal pozicionálva, betűtípussal, igazítással, szimbólumrendszerrel (`code39`/`code128`/`qr`) és opcionális láthatósági feltételekkel (pl. az allergia-doboz csak akkor jelenjen meg, ha a `person.nametagNotes` nem üres). Két `labelType` létezik: `nametag` (egy minden bejelentkezett személynek; olyan mezőkkel, mint a `person.displayName`, `sessions`, `securityCode` és `person.isBirthdayWeek` — az utóbbi `"true"`, ha a születésnap hónapja és napja a mai naptól 3 napon belül van, az év végén átnyúlva, a `LabelHelper.isBirthdayWithin()` számításával) és `pickup` (egy minden családnak; olyan mezőkkel, mint a `children`, `childrenAllergies`). A szerver típusonként egy alapértelmezett sablont kényszerít ki egyházanként (`LabelTemplateController.save`). A tervező a kioszk beépített címkéit tükröző kezdő sablonokat tartalmaz, és mintaadatokon jelenít meg előnézetet.

### Renderelés és nyomtatás a kioszkon

A bejelentkezés befejezésekor a `B1Checkin/src/helpers/LabelHelper.ts` a függő látogatásokon lévő csoportjelzők alapján dönti el, mit nyomtasson: névcímkéket a `printNametag` csoportoknak, plusz egy családi átvételi címkét, ha bármely látogatás `parentPickup` csoportba került. A `checkinType` értékű `volunteer` látogatásokat a `LabelHelper.selectChildVisits()` kihagyja, így egy gyermekfelügyeletes dolgozó, aki a Parent Pickup szobában van, soha nem vált ki átvételi címkét. A bejelentkezési válaszból érkező biztonsági kód a gyermek névcímkékre és az átvételi címkére kerül; a felnőtt névcímkék kód nélkül nyomtatódnak. Ha az egyháznak vannak sablonjai, a `LabelRenderer` (`src/helpers/LabelRenderer.ts`) a blokkokból és a mezőkörnyezetből önálló HTML-dokumentumot állít elő; egyébként a `B1Checkin/assets/labels/` mappában lévő beépített HTML-címkéket használja, helyőrző-behelyettesítéssel.

A vonalkódokat tiszta TypeScript kódolók állítják elő inline SVG-ként a `B1Checkin/src/helpers/barcode.ts` fájlban — Code 39 mintatáblázatok és Code 128 (B kódkészlet, mod-103 ellenőrző összeggel) szélességtáblázatok, a QR-kódot pedig a `qrcode` csomaggal. **Ezeket a kódolókat szándékosan duplikálják a B1Admin felületen** (a `LabelEditor.tsx` beágyazza ugyanazokat a táblázatokat, kódkommentben jelezve), hogy a tervező előnézetei pixelpontosan megegyezzenek a kioszk kimenetével; az egyik módosítását a másikban is át kell vezetni.

A nyomtatási folyamat (`src/components/PrintUI.tsx`) minden HTML-címkét egy `WebView`-ban jelenít meg, `react-native-view-shot` segítségével JPG-be rögzíti, majd az képfájl-URI-kat a natív **printer-helper** Expo modulnak adja át (`B1Checkin/modules/printer-helper/`). A modul a `scan()`, `checkInit()`, `printUris()` műveleteket és állapot-eseményeket biztosít, márkánként külön szolgáltatóval mindkét platformon:

| Márka | Android | iOS | Megjegyzések |
|-------|---------|-----|--------------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-sorozatú hálózati nyomtatók (QL-800/810W/820NWB/1100/1110NWB…), 29×90 mm-es szabászott címkék, az ajánlott alapértelmezett |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Hálózati felderítés + TCP/ZPL képnyomtatás |

A nyomtatóválasztás az `app/printers.tsx` alatt érhető el (a hálózati keresés `brand~model~ip` bejegyzéseket ad vissza; a választás az AsyncStorage-ban marad meg), a `src/helpers/PrinterLog.ts` pedig egy eszközön tárolt diagnosztikai naplót vezet, amelyet a kioszk fejlécében lévő élő állapotjelző pötty mutat.

## Vendégregisztráció

Két útvonal hoz létre személyt bejelentkezés közben:

- **A kioszknál** — a háztartási képernyőn lévő „Add guest” (Vendég hozzáadása) a `B1Checkin/app/addGuest.tsx` fájlt nyitja meg, amely először a `GET /membership/people/search?term=` végponton keres egy meglévő, nem tag egyezést, majd ha nincs, a `POST /membership/people` végponton létrehoz egyet, a jelenlegi háztartáshoz csatolva. A vendég ezután ugyanúgy megy végig a csoport-hozzárendelésen, mint bármely tag.
- **Önkiszolgálóan, QR-kóddal** — ha az `enableQRGuestRegistration` egyházi beállítás be van kapcsolva (a B1Admin Check-In beállításaiban konfigurálva, a `GET /membership/settings/public/{churchId}` végpontról olvasva), a kioszk keresési képernyőjén egy QR-kód jelenik meg, amely a `https://{subdomain}.b1.church/guest-register?serviceId=` címre mutat. Ez a B1App oldal (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lehetővé teszi, hogy a látogató család a saját telefonján regisztrálja magát a névtelen `POST /membership/people/guest-register` végponton keresztül, így a kioszk sora halad. A QR-lapon van egy **Register here** (Regisztrálás itt) gomb is, amely ugyanazt az oldalt nyitja meg a kioszkon (`app/guestRegister.tsx`) egy inkognitó, gyorsítótárazás nélküli `WebView`-ban; a `src/helpers/GuestRegisterHelper.ts` építi fel az URL-t mind a QR-kódhoz, mind a WebView-hoz, és letiltja a `https://{subdomain}.b1.church/guest-register` címről való kilépést. A képernyő a **Done** (Kész) gombra, a visszalépésre vagy 120 másodpercnyi tétlenségre (az űrlap begépelését a WebView aktivitásként jelzi) visszalép a keresésbe, és a WebView-t leválasztja, így egy család bejegyzései soha nem jutnak el a következő családhoz.

A QR-regisztrációt a B1Admin **QR Guest Registration** kártyáján (`src/mobile/CheckInPage.tsx`) mentett egyházi beállítások vezérlik:

| Beállítás | Láthatóság | Cél |
|---|---|---|
| `enableQRGuestRegistration` | nyilvános | Be-/kikapcsoló a kioszk QR-kódhoz és a névtelen végpontokhoz |
| `guestRegistrationFields` | nyilvános | JSON-térkép: `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Alapértelmezés: az e-mail és a telefon opcionális, a többi ki. A keresztnév és a vezetéknév mindig kötelező |
| `guestRegistrationImage` | nyilvános | Fejléc fotójának URL-je; a B1App 16:9 arányban jeleníti meg az űrlapon és a visszaigazoló képernyőn az ikon helyett |
| `guestRegistrationGroupId` | privát | A csoport, amelyhez minden regisztráció hozzáadódik (a vendégek sosem látják vagy választják ki) |
| `guestRegistrationRecordAttendance` | privát | `"true"`, ha az adott csoportra a jelenlétet is rögzíteni kell |

A B1App `src/components/checkin/GuestRegister.tsx` a névtelen `GET /membership/people/guest-register/options?churchId=` végpontról tölti le az ellenőrzőlistát, és csak a bekapcsolt mezőket jeleníti meg (e-mail, telefon, családi állapot és cím az elsődleges kapcsolattartónál; születési dátum, nem és osztályfokozat tagonként; egy megjegyzésmező), és csak ezeket küldi el. A szerver a `GuestRegistrationHelper.sanitize()` függvényben újra alkalmazza az ellenőrzőlistát — a kikapcsolt mezők eldobódnak, a hiányzó kötelező vagy listán kívüli értékek 400-as hibát okoznak — mielőtt a `PersonHelper.registerGuestHousehold()` lefutna. Ez először minden olyan tagra meghívja a `PersonRepo.findGuestMatch()` függvényt, akinek van e-mail vagy telefonszáma: pontosan egy élő személy, azonos keresztnévvel és azonos e-mail vagy telefonszám-számjegyekkel újra felhasználódik (nulla vagy több egyezés esetén új személy jön létre, így a rendszer soha nem tippel). Kontakt nélküli tagot a keresztnév alapján, az egyező háztartáson belül párosít. Az újra felhasznált személyeket soha nem szerkeszti a rendszer, így egy névtelen űrlap nem írhatja felül a tárolt adatokat, a válasz pedig visszhangozza a beküldött neveket. A nem egyező tagok az egyező vagy egy új háztartáshoz csatlakoznak `membershipStatus: "Visitor"` státusszal, és minden új személyre `person.created` eseményt bocsátanak ki. Ezt követően a hibákat naplózza a rendszer, nem adja vissza: a tagok hozzáadódnak a beállított csoporthoz (`group.member.added`); ha a jelenlét-rögzítés be van kapcsolva, az `AttendanceModuleGateway.recordAttendance()` minden tagot jelen jelöl a csoport minden olyan szolgálati időpontjára, amelynek van ütemezése, és amelynek bejelentkezési ablaka (`CheckinGateHelper.isServiceTimeOpen`) éppen most nyitva van, szükség esetén létrehozva a mai egyházi helyi dátumra vonatkozó szekciót — az ütemezetlen szolgálati időpontok és az ablakon kívüli regisztrációk nem rögzítenek semmit; a megjegyzésekből pedig rejtett személyi jegyzetbeszélgetés lesz a háztartásfőn (üzenet szerzője: „Guest sign-up”), a `person.conversationId` mezőn keresztül kapcsolva.

## Kapcsolódó oldalak

- [Jelenléti végpontok](../api/endpoints/attendance) -- A teljes REST-felület a campusokhoz, szolgálatokhoz, szekciókhoz, látogatásokhoz és látogatási szekciókhoz
- [Tagsági végpontok](../api/endpoints/membership) -- Személyek, háztartások és csoportok
- [Webhookok](../api/webhooks) -- A `session.created`, `attendance.recorded` és `attendance.checkout` események
- [Modulstruktúra](../api/module-structure) -- A jelenléti modul szervezése a szerveroldalon
