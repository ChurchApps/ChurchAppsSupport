---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in je jeden systém se třemi vstupními body: aplikace B1Checkin pro kiosky na stanovištích s obsluhou i pro samoobslužné stanice, samoobslužné odbavení v členském portálu B1App a správa docházky v B1Admin. Všechny tři zapisují do stejného modulu docházky v jádru Api a směrování do učeben je řízeno výhradně skupinami — neexistuje žádná samostatná entita „místnosti“ nebo „lokace“. Nad tím funguje vrstva ochrany dětí: typy odbavení pro jednotlivé návštěvy, serverová kontrola kapacity a poměru dobrovolníků, kontrola věku a ročníku na kiosku, ověřování důvěryhodných osob při vyzvednutí a upozorňování rodičů prostřednictvím poskytovatele SMS služby kostela. Tato stránka popisuje datový model, postupy odbavení, vrstvu ochrany a postup tisku štítků.

</div>

## Přehled

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  vyhledání → domácnost → │  │         │ Api                                          │
│  skupiny → dokončení/tisk│  │  HTTPS  │  ┌─ modul membership ──────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ osoby · domácnosti · skupiny            │ │
│ B1App (samoobsluha)      │──┤         │  └─────────────────────────────────────────┘ │
│  obrazovka /mobile/checkin│ │         │  ┌─ modul docházky ────────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (personál)       │──┘         │  │ groupServiceTimes  (směrování do místností)│
│  nastavení · reporty ·   │            │  │ sessions ← visitSessions → visits       │ │
│  návrhář štítků         │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Cesta tisku štítků (pouze kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (šablony štítků nebo vestavěný HTML záložní štítek)
       └▶ LabelRenderer → HTML dokument + vložené SVG čárové kódy
            └▶ PrintUI: vykreslení WebView → zachycení JPG přes ViewShot
                 └▶ nativní modul printer-helper → Brother QL / Zebra
```

| Povrch | Repozitář | Technologie | Role |
|--------|-----------|-------------|------|
| Kiosk | `B1Checkin` | Expo / React Native, směrování souborů přes expo-router; sestavení EAS pro Android, Amazon Fire a iOS; aktualizace OTA přes `expo-updates` | Stanoviště s obsluhou nebo samoobslužné, s tiskem štítků a ověřeným odbavením při odchodu |
| Samoobslužné odbavení | `B1App` | Next.js (členský portál b1.church) | Přihlášení členové odbavují svou domácnost z telefonu; bez tisku |
| Admin | `B1Admin` | React SPA | Nastavuje strukturu bohoslužeb, přiřazuje skupiny k časům bohoslužeb, navrhuje štítky, zaznamenává ruční docházku, generuje reporty |

Všechny tři volají stejné dva moduly API přes `ApiHelper`: **MembershipApi** (`/membership`) pro osoby, domácnosti a skupiny; **AttendanceApi** (`/attendance`) pro vše níže.

## Datový model (`Api/src/modules/attendance`)

| Entita / tabulka | Klíčová pole | Význam |
|------------------|--------------|--------|
| `campuses` | name, address | Zastaralé — pobočky se spravují v modulu membership (`/membership/campuses`); kopie v docházce je zmrazena pouze pro čtení kvůli starším čtenářům (`models/Campus.ts`) |
| `services` | campusId, name | Opakující se shromáždění, např. „Nedělní dopoledne“ (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Časový úsek v rámci bohoslužby, např. „9:00“ (`models/ServiceTime.ts`). Sloupce rozvrhu jsou volitelné (migrace `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) a řídí [okno odbavení](#planovana-okna-odbaveni) |
| `groupServiceTimes` | groupId, serviceTimeId | Spojovací tabulka: které skupiny (učebny) se scházejí v kterých časech bohoslužeb (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Jedno setkání jedné skupiny v jeden den — vytváří se líně v okamžiku odbavení (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Jedna osoba navštěvující jeden den (`models/Visit.ts`). `checkinType` je `member` / `guest` / `volunteer` (NULL = starší člen), nastavuje ho kiosk a spotřebovávají ho brány kapacity/poměru |
| `visitSessions` | visitId, sessionId | Které relace návštěva pokrývá — dítě odbavené do dvou časů bohoslužeb dostane dva řádky (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (bloky JSON) | Navrhovatelné rozvržení štítků (`models/LabelTemplate.ts`) |

### Jak se dokončené odbavení ukládá

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) zpracovává `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Tělo je pole objektů `Visit`, každý nese `visitSessions`, jejichž vnořený `session` určuje pouze dvojici `(serviceTimeId, groupId)`. Server poté:

1. **Kontroluje kapacitu a poměry ještě před jakýmkoli zápisem.** `evaluateGates()` → `CheckinGateHelper.evaluate()` kontroluje u každé cílové místnosti kapacitu, kapacitu hostů, příznak uzavření a poměr dobrovolníků vůči aktuální obsazenosti. postCheckin **není transakční**, proto musí brána proběhnout před prvním uložením — při tvrdém porušení vrátí 409 s názvem dotčených místností a nic se neuloží. Viz [Brány kapacity a poměru dobrovolníků](#brany-kapacity-a-pomeru-dobrovolniku).
2. **Řeší relace líně.** `getSessionId()` najde nebo vytvoří řádek `sessions` pro `(groupId, serviceTimeId, dnes)` — ID relací se cachují v procesu pro každé datum. Nové relace vyvolají webhook `session.created`. Smyčka je čekající `for..of` — dřívější fire-and-forget `forEach(async …)` se dostal do závodu s uložením a při vytvoření první relace zapisoval NULL sessionId (opraveno; poznámka v kódu u smyčky).
3. **Nahrazuje záznamy dne.** Všechny stávající návštěvy těchto osob na tuto bohoslužbu dnes se smažou spolu se svými visitSessions a poté se uloží odeslaná sada. Opětovné odbavení rodiny je proto idempotentní operace „toto je aktuální stav“, nikoli připojení. Pokud se místo toho předá `?checkDuplicates=true`, vrátí se `{ duplicates: [personId…] }` bez zápisu — tak kiosk varuje před přepsáním.
4. **Generuje jeden bezpečnostní kód na dávku.** `SecurityCodeHelper.generate()` vytvoří 4znakový kód z abecedy `23456789BCDFGHJKLMNPQRSTVWXYZ` (bez samohlásek a nejednoznačných znaků, aby kódy nemohly tvořit slova nebo být špatně přečteny). Server při kolizi opakuje losování vůči otevřeným návštěvám téhož kostela ze stejného dne a kód připíše ke každé návštěvě v dávce.
5. **Vrací `{ streaks, securityCode }`.** `streaks` mapuje personId na počet po sobě jdoucích týdnů docházky; kiosk oslavuje milníky (každý pátý týden) konfetami.

Každá uložená návštěva rovněž vyvolá webhook `attendance.recorded`. Čtecí část, `GET /attendance/visits/checkin`, vrací návštěvy osob z jejich **posledního zaznamenaného data** — pokud šlo o předchozí týden, ID se odstraní, takže klient dostane předvyplněnou kopii výběru místností z minulého týdne, která se uloží jako nové záznamy.

### Odhlášení

Dva endpointy uzavírají smyčku (`VisitController`):

- `GET /attendance/visits/code/:code` — dnešní dosud neodhlášené návštěvy s tímto bezpečnostním kódem, s naplněnými relacemi.
- `POST /attendance/visits/checkout` — tělo `{ visitIds, checkedOutBy?, checkedOutById? }`; nastaví `checkoutTime` a kdo dítě vyzvedl, a pro každou návštěvu vyvolá webhook `attendance.checkout`.

Oprávnění: kiosky se autentizují pomocí `attendance.checkin`, které uděluje přesně povrch odbavení/odhlášení/šablon štítků, plus vyhledávání domácností, které kiosk potřebuje bez `people.view` (vyhledávání podle telefonu/jména, členové domácnosti v modelu odbavení a seznam osob pro vyzvednutí v domácnosti). `SessionHelper.filterChurches` v B1Checkin nabízí pouze kostely, kde účet drží `Attendance/Checkin` nebo `Attendance/Edit`. `Checkin` již není součástí oprávnění Everyone (null-role) (`RoleHelper` a migrace `2026-11-01_remove_everyone_checkin`), proto se musí udělit přes skutečnou roli; `attendance.view`/`attendance.edit` pokrývají reporting a ruční zadávání; struktura (bohoslužby, časy bohoslužeb, přiřazení skupin) vyžaduje `services.edit`. Samoobslužné odbavení člena (B1App) nevyžaduje žádné oprávnění: každý přihlášený uživatel s propojenou osobou v kostele může volat `GET`/`POST /attendance/visits/checkin` a server omezí odeslaná `personId` na vlastní domácnost volajícího (jinak 403) — tato hranice brání tomu, aby bylo možné číst `securityCode` cizích rodin. Členství je oprávnění; zda členové *vidí* tuto funkci, řídí navigační záložky B1App daného kostela. Ostatní endpointy odbavení (`code/:code`, `checkout`, `guardians`, `CheckinController`) zůstávají pouze pro kiosky/personál.

## Skupiny řídí směrování do místností

Nikde v systému neexistuje entita místnosti nebo učebny. „Místnost“ je členská **skupina** s povoleným `trackAttendance`, propojená s jedním nebo více časy bohoslužeb přes `groupServiceTimes`. Pole skupiny (v `Api/src/modules/membership/models/Group.ts`), která určují chování kiosku:

| Pole | Účinek |
|------|--------|
| `trackAttendance` | Skupina se vůbec účastní docházky; přehled nastavení v B1Admin označí skupiny s `trackAttendance` bez řádku `groupServiceTimes` jako nepřiřazené |
| `parentPickup` | Označuje dětskou místnost: odbavení do ní učiní z návštěvy „dětskou“ návštěvu, která vytiskne rodinný štítek pro vyzvednutí a umístí bezpečnostní kód na jmenovku |
| `printNametag` | Zda odbavení do této skupiny vůbec vytiskne jmenovku |
| `capacity` / `guestCapacity` / `checkinClosed` | Kapacitní limity místnosti a tvrdý přepínač „uzavřeno“, vynucované na serveru bránou odbavení (upravuje se v nastavení skupiny v B1Admin pod „Kapacita odbavení“) |
| `volunteerRatio` / `minVolunteers` | Poměr dětí na dobrovolníka a minimální počet dobrovolníků, vynucované podle celokostelního nastavení `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Meze věku/ročníku pro způsobilost, vyhodnocované na kiosku za účelem zvýraznění nebo ztlumení místností |

Každý klient denormalizuje stejným způsobem (např. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): paralelně načte `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` a `GET /membership/groups`, poté pro každý čas bohoslužby shromáždí skupiny, jejichž řádek `groupServiceTimes` na něj ukazuje, do `serviceTime.groups`. Toto pole je to, co zobrazuje výběr místnosti, uspořádané podle `categoryName` skupiny.

Přiřazení se upravují na stránce skupiny v B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`) a celý strom Pobočka → Bohoslužba → Čas bohoslužby → Skupina je vizualizován v `B1Admin/src/attendance/components/AttendanceSetup.tsx` přes `GET /attendance/attendancerecords/tree`.

:::info
Protože skupiny jsou jediným zdrojem pravdy, stejné členství ve skupině pohání směrování na kiosku, přehledy docházky ve stylu seznamu na stránkách skupin v B1Admin i reporting docházky — přiřazení skupiny k času bohoslužby je jediný krok potřebný k tomu, aby se stala cílem odbavení.
:::

## Ochrana dětí

### Typy odbavení

Každá návštěva nese `checkinType` — `member`, `guest` nebo `volunteer` (NULL znamená starší/člen; migrace `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Typ se vybírá **na straně kiosku**: volby Člen / Host / Dobrovolník na rozbaleném řádku člena (`B1Checkin/src/components/MemberServiceTimes.tsx`) a přiřazují se ke každé čekající návštěvě při dokončení (`app/checkinComplete.tsx`, výchozí hodnota `member`). Server jej využívá v bráně — dobrovolníci se počítají do pokrytí poměru místo proti kapacitě a hosté se počítají proti `guestCapacity`.

### Brány kapacity a poměru dobrovolníků

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) běží uvnitř `postCheckin` před jakýmkoli uložením (endpoint není transakční, takže správnost zajišťuje kontrola před uložením). Načte aktuální obsazenost pro každou cílovou skupinu (`VisitRepo.countActiveByGroupToday`) a konfiguraci skupiny přes bránu modulu membership, a poté klasifikuje porušení:

- **Tvrdé (vždy blokuje):** `checkinClosed`, `current + incoming > capacity`, počet hostů nad `guestCapacity`. Dávka je odmítnuta s `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosk zobrazí pojmenovanou místnost.
- **Poměr (varuje nebo blokuje):** příchozí nedobrovolníci do místnosti, kde `volunteers < minVolunteers`, kde nejsou žádní dobrovolníci, nebo kde `children > volunteers × volunteerRatio`. Závažnost určuje nastavení kostela `ratioEnforcement` (`"warn"` výchozí / `"block"`, upravuje se v B1Admin Správa kostela → Odbavení, `CheckinSettingsEdit.tsx`). Režim varování vrací `409 { warning: true, error: "ratio", … }`, pokud klient neodešle znovu s `acknowledgeWarnings=true` — toto opětovné odeslání je přepsání potvrzené personálem na kiosku.

### Plánovaná okna odbavení

Čas bohoslužby může nést volitelný týdenní rozvrh (`dayOfWeek` 0–6, kde 0 = neděle, `startTime`/`endTime` jako `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), upravovaný ve formuláři času bohoslužby v B1Admin **Docházka → Nastavení** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Rozvrh odbavení“). `CheckinGateHelper.hasSchedule()` považuje čas bohoslužby za naplánovaný pouze tehdy, když jsou nastaveny `dayOfWeek` i `startTime`; nenaplánované časy nejsou nikdy časově omezeny. `isServiceTimeOpen()` vypočítá okno v místním nástěnném čase (`DateHelper.toChurchTime`). Časové pásmo se pro každý čas bohoslužby určuje v `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): nejprve `timezone` pobočky služby (`service.campusId`, přes `MembershipModuleGateway.loadCampusTimeZones`), poté `timeZone` kostela (nastavené v B1Admin v Informacích o kostele), dále první nesmazaná pobočka s vyplněným `timezone` (`loadCampusTimeZone`) a teprve nakonec `America/New_York`. Pobočka má přednost, protože většina kostelů měla jako časové pásmo kostela doplněno `America/New_York`. Výpis i odesílání níže určují pásmo stejným způsobem. Okno běží od `checkinOpenMinutes` před začátkem do `checkinCloseMinutes` po konci (nebo po začátku, pokud konec chybí) a zvládá okna přesahující půlnoc nebo hranici týdne.

Okno je vynucováno na dvou místech:

- **Výpis:** `GET /attendance/servicetimes` označí každý řádek vypočteným booleanem `checkinOpen`. Samoobslužné odbavení v B1App (`CheckinPage.tsx`) a výběr služby v B1Checkin (`app/services.tsx`) ponechávají každý čas. Když jsou všechny časy dané služby uzavřené, zobrazí nejbližší otevření („Odbavení se otevírá v ne 9:30.“ v B1App, „Odbavení pro tuto bohoslužbu se otevírá v ne 9:30.“ v B1Checkin, z `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), a pokud otevření nelze vypočítat, použije se text „Odbavení teď pro tuto bohoslužbu není otevřené.“ (kiosk nabízí tlačítko Zpět pro výběr jiné služby). Jinak se uzavřené časy vykreslí jako neselektovatelný řádek „Uzavřeno“ / „Uzavřeno · otevírá se v 9:30“. Obrazovka domácnosti v B1Checkin (`MemberServiceTimes.tsx`) znovu vyhodnocuje otevřenost živě podle hodin zařízení pomocí `ServiceTimeHelper.isCheckinOpen()` (časové pásmo zařízení, nikoli kostela), takže kiosk, který běží bez obsluhy, se otevírá a zavírá načas, a u uzavřeného času, který daná osoba už má, zobrazí „Dětská místnost 1 · Odbaveno“ (název skupiny).
- **Odesílání:** uvnitř `evaluateGates()`, před vyhodnocením kapacity/poměru, `findClosedServiceTimeGroups()` odmítne dávku s `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`, pokud je čas bohoslužby kterékoli cílové relace mimo jeho okno. Protože stávající návštěvy domácnosti na dnešek se při každém odbavení znovu odesílají, relace, které osoba již má (`personId|sessionId` ve stávajících návštěvách), tuto bránu přeskočí, takže přidání pozdějšího otevřeného času bohoslužby není odmítnuto jen proto, že se předchozí okno zavřelo. B1Checkin to zobrazuje přes obrazovku tvrdé brány s důvodem „odbavení teď není otevřené“ (porušení kapacity stále hlásí „místnost je plná nebo uzavřená“).

### Způsobilost podle věku/ročníku (na straně kiosku)

Způsobilost místnosti je pouze informativní uživatelské rozhraní, vyhodnocované na kiosku a nevynucované serverem. `B1Checkin/src/helpers/EligibilityHelper.ts` porovnává datum narození/ročník osoby s poli `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` skupiny (pořadí ročníků: PreK, K, 1–12, Graduated) a vrací `eligible` / `ineligible` / `unknown` — chybějící údaje vedou k `unknown` a místnost nikdy neskryjí. Věk a ročník se počítají k **datu postupu ročníků** kostela (nastavení `gradePromotionDate`, `"MM-DD"`, upravuje se v `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosk jej načítá z `GET /attendance/checkin/settings` a `resolveAsOfDate` vybere nejbližší výskyt na dnešek nebo před ním. Výběr místnosti zvýrazňuje způsobilé místnosti a ztlumuje nezpůsobilé; výběr ztlumené místnosti vyžaduje potvrzení personálem.

### Důvěryhodné a neoprávněné vyzvednutí

Osoby oprávněné k vyzvednutí jsou entita členství, na každou domácnost: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, volitelné personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD je `GET /membership/householdpickup/:householdId` (každý přihlášený uživatel kostela, aby kiosky mohly číst) plus `POST` / `DELETE` chráněné oprávněním `people.edit`. Personál spravuje seznam na kartě **Vyzvednutí** na stránce osoby (`B1Admin/src/people/components/PickupPeople.tsx`) — fotografie, příbuzenský vztah a štítek stavu Důvěryhodný / Neoprávněný.

Při odhlášení (`B1Checkin/app/checkout.tsx`) kiosk načte seznam osob k vyzvednutí domácnosti: položky `trusted` se zobrazí jako klikací karty vedle mřížky fotografií dospělých z domácnosti a volně zadané jméno „Jiný“ se přibližně porovná (Levenshteinova vzdálenost, `src/helpers/PickupMatchHelper.ts`) s položkami `notAuthorized` — shoda blokuje odhlášení varovným panelem a tlačítkem personálu **Přepsat**. Přepsání se zaznamenává na samotné návštěvě: prostřednictvím běžného `POST /attendance/visits/checkout` odešle `checkedOutBy` jako `"OVERRIDE: {name}"`, takže se objeví v záznamu docházky a ve webhooku `attendance.checkout`, nikoli v samostatné auditní tabulce.

### Upozornění rodičů a nouzové vysílání

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) nabízí dva SMS endpointy:

- `POST /page` — `{ visitId, message }`: upozorní opatrovníky jednoho odbaveného dítěte (obrazovka odhlášení na kiosku, režim s obsluhou).
- `POST /broadcast` — `{ serviceId, message }`: pošle SMS všem dospělým z odbavených domácností pro danou bohoslužbu (nastavení administrátora kiosku, za potvrzovacím panelem vyžadujícím zadat `EMERGENCY` v `B1Checkin/app/adminSettings.tsx`).

Oba endpointy nejprve přes bránu membership najdou dospělé v domácnosti a poté předají doručení **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — mezimodulová brána k nakonfigurovanému poskytovateli SMS kostela (`@churchapps/texting`: TextInChurch, Clearstream nebo MutualMinistry; vestavěný odesílatel SMS neexistuje). Brána zapisuje řádek `sentText` a záznamy `deliveryLog` pro každého příjemce a omezuje dávku na 500 příjemců; pokud není poskytovatel nakonfigurován, vrací `no_provider`, což kiosk zobrazí jako „Není nakonfigurován poskytovatel SMS“. Metoda `dispatch()` kontroleru odstraňuje duplicitní telefonní čísla a přeskakuje osoby bez mobilu nebo s nastaveným `optedOut`, a vrací `{ sent, failed, skippedOptedOut, skippedNoPhone }`, aby kiosk mohl ukázat, co bylo přeskočeno.

## Kiosk (B1Checkin)

Obrazovky jsou soubory expo-router v `B1Checkin/app/`; stav přesahující obrazovky je uložen ve statické třídě `CachedData` (`src/helpers/CachedData.ts`), nikoli v React state.

```
index (spuštění/automatické přihlášení) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             načte serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ tisk štítků,
             groupServiceTimes,           │             └▶ checkout (s obsluhou)      automatický návrat
             labelTemplates               │                                           na lookup
```

1. **Vyhledání** (`app/lookup.tsx`) — hledání podle telefonu (`GET /membership/people/search/phone?number=`, posledních 4 nebo celé číslo) nebo podle jména (`GET /membership/people/search?term=`). Výběr shody načte domácnost (`GET /membership/people/household/{householdId}`) a stávající návštěvy (`GET /attendance/visits/checkin`) a předvyplní `pendingVisits` výběrem z minulého týdne.
2. **Kontrola domácnosti** (`app/household.tsx`, `src/components/MemberList.tsx`) — každý řádek člena zobrazuje odznak „už odbaveno“, odznak alergií/`nametagNotes` a aktuální čipy místností. Rozbalení člena vypíše každý čas bohoslužby s tlačítkem místnosti a čipy typu odbavení Člen / Host / Dobrovolník (`MemberServiceTimes.tsx`). Pod názvem každého času bohoslužby `ServiceTimeHelper.getGroupSummary()` zobrazuje skupiny nabízené v daném čase (názvy `serviceTime.groups`, oříznuté, bez duplicit bez ohledu na velikost písmen, oddělené čárkou); pokud čas nemá žádné skupiny, nic se nezobrazí.
3. **Přiřazení skupiny** (`app/selectGroup.tsx`) — strom kategorií sestavený z `serviceTime.groups`, s místnostmi způsobilými podle věku/ročníku zvýrazněnými a nezpůsobilými ztlumenými za potvrzením personálem (viz [Způsobilost podle věku/ročníku](#zpusobilost-podle-vekuroCniku-na-strane-kiosku)); výběr místnosti zapíše do čekající návštěvy dané osoby `{ session: { serviceTimeId, groupId } }` visitSession (`src/helpers/VisitSessionHelper.ts`). „Žádná“ to zruší.
4. **Dokončení** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` s `pendingVisits` (každá s přiřazeným `checkinType`), poté tisk štítků, pokud je nakonfigurována tiskárna, a automatický návrat na vyhledání. Odpověď `409` pro kapacitu nebo `notOpen` zobrazí pojmenovanou místnost s důvodem (plná/uzavřená, nebo odbavení není otevřené); varování poměru nabídne potvrzení personálem, které znovu odešle s `acknowledgeWarnings=true`.

Obrazovka **odhlášení** (`app/checkout.tsx`) přijímá 4znakový bezpečnostní kód přes automaticky zaostřené pole — takže čtečky čárových kódů typu klávesnice přes USB/Bluetooth fungují bez kamery — nebo přes klávesnici na obrazovce používající stejnou abecedu, která se automaticky odešle po 4 znacích. Tlačítko **Skenovat** otevře panel se sdílenou komponentou kamery `src/components/CodeScanner.tsx` (ve výchozím stavu zadní kamera, přijímá QR, Code 128 a Code 39), takže stanoviště bez čtečky mohou načíst štítek pro vyzvednutí; naskenovaný kód jde do stejné cesty `handleCode()` jako ručně zadaný vstup. Vyhledá kód, zobrazí děti, které se vyzvedávají, a nabídne **důvěryhodné osoby k vyzvednutí** domácnosti jako klikací karty spolu s mřížkou fotografií dospělých z domácnosti (plus volba „Jiný“ pro volný text, který se přibližně kontroluje proti jménům neoprávněných — viz [Důvěryhodné a neoprávněné vyzvednutí](#duveryhodne-a-neopravnene-vyzvednuti)), a poté odešle `POST /attendance/visits/checkout` se jménem/ID vybraným výběrem. V režimu s obsluhou obrazovka také nabízí **Upozornit rodiče** (`POST /attendance/checkin/page`) a **dotisk bezpečnostního štítku** — `reprint()` znovu sestaví štítky rodiny pomocí `LabelHelper.getAllLabelsFor(...)` a předá je stejnou cestou `PrintUI` jako při odbavení.

Osobnost stanoviště je příznak AsyncStorage `@StationMode` (`"self"` | `"manned"`, přepíná se v `app/adminSettings.tsx`). Režim s obsluhou přidává vstupní bod odhlášení na obrazovce vyhledání a úpravu profilu jednotlivých členů (`POST /membership/people`) z obrazovky domácnosti. Zabezpečení kiosku je vestavěno: volitelný PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) chrání obrazovky administrátora a tiskárny, administrátorská obrazovka se otevře pouze sedminásobným rychlým klepnutím na logo v záhlaví a nečinná úvodní obrazovka (`src/hooks/useInactivityTimer.ts`) se zapne mezi rodinami.

## Samoobslužné odbavení (B1App)

Členové se odbavují z portálu b1.church na obrazovce `/mobile/checkin` (směrovanou z `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` na `screens/CheckinPage.tsx`). Vyžaduje přihlášeného uživatele a prochází stejné čtyři kroky jako kiosk — služby → domácnost → skupiny → dokončení — proti totožným endpointům, se stavem uloženým v `B1App/src/helpers/CheckinHelper.ts`. Rozdíly oproti kiosku: domácnost pochází z vlastního `householdId` přihlášeného uživatele (bez kroku vyhledávání) a netiskne se žádné štítky — místo toho obrazovka dokončení zobrazí bezpečnostní kód dávky jako QR (`qrcode.react`) s nápovědou „ukažte na odbavovací stanici“. Pokud je domácnost už odbavená při načtení stránky, tlačítko „Zobrazit kód pro odbavení“ znovu zobrazí QR z první existující návštěvy (z `GET /attendance/visits/checkin`), která nese `securityCode`. Odbavení se zaznamenává okamžitě při odeslání (neexistuje čekající stav); QR slouží pouze k tisku štítků na kiosku.

**Tisk štítků z telefonu na kiosk** (`B1Checkin/app/scan.tsx`, dostupné z tlačítka „Skenovat kód“ u QR na obrazovce vyhledání): kiosk zobrazí `CodeScanner` (`CameraView` z `expo-camera`, ve výchozím stavu přední kamera, lze přepnout) a hledá QR kódy. `ScanCodeHelper.parse()` přijme užitečný obsah pouze tehdy, je-li to holý 4znakový kód v abecedě bezpečnostních kódů, a `ScanCodeHelper.isRepeat()` ignoruje stejný kód po dobu 4 sekund, takže funguje QR z B1App i blok QR na vytištěném štítku. Obrazovka pak postupuje cestou dotisku při odhlášení — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — a vrací se na vyhledání. Při skenování se nezapisuje žádná docházka; pouze štítky. Kódy bez aktivních návštěv, stanoviště bez tiskárny a skupiny bez štítků každé zobrazí upozornění (toast) a vrátí se na vyhledání.

Typy a `ApiHelper`/`ArrayHelper` pocházejí z `@churchapps/helpers` a `@churchapps/apphelper`; žádné React komponenty nejsou sdílené s B1Admin.

## Docházka na straně administrace (B1Admin)

- **Nastavení** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) vykresluje strom struktury a vytváří služby (`ServiceEdit.tsx`) a časy bohoslužeb (`ServiceTimeEdit.tsx`). Údaje o pobočkách pocházejí z membership přes hook `useCampuses()`.
- **Ruční docházka** je na straně skupin, ne v sekci docházky: `B1Admin/src/groups/components/GroupSessionsTab.tsx` vytváří relace (`POST /attendance/sessions`; při přidávání může `SessionEdit.tsx` zahrnout jednu relaci pro každou jinou skupinu sdílející zvolený čas bohoslužby, přičemž přeskočí skupiny, které už mají relaci k danému datu) a označuje osoby jako přítomné přes `POST /attendance/visitsessions/log`, který pro danou osobu a relaci najde nebo vytvoří návštěvu. Vedoucí skupin mohou zaznamenávat docházku pro své vlastní skupiny bez oprávnění `attendance.edit` — kontrolery ověřují `au.leaderGroupIds`.
- **Reporting** — trend docházky a docházka ve skupině jsou reporty definované na serveru (`B1Admin/src/components/reporting/ReportWithFilter.tsx` proti ReportingApi; definice v `Api/reports/*.json`). Oba berou `startDate`/`endDate` (koncové datum včetně); report trendu se výchozně nastaví od před rokem do dneška a přidává sloupec `sessionDates` po týdnech, a strom docházky skupiny na obrazovce zahrnuje `checkinTime` každé návštěvy a `membershipStatus` osoby. CSV docházky skupiny pochází z doprovodného reportu `groupAttendanceDownload`, který `GroupAttendanceDownloadHelper` převádí kontingenčně na jeden řádek pro každého člena skupiny se sloupcem přítomen/nepřítomen pro každou datovanou relaci; historie jednotlivé osoby je dostupná přes `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Tisk štítků

### Šablony a návrhář

Kostely navrhují své štítky v B1Admin na `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, dostupné ze stránky nastavení odbavení). Šablona je řádek `labelTemplates`, jehož `content` je pole bloků JSON — `text`, `field`, `barcode`, `qrcode` nebo `box` — každý umístěný v procentuálních souřadnicích s písmem, zarovnáním, symbologií (`code39`/`code128`/`qr`) a volitelnými podmínkami viditelnosti (např. vykreslit políčko alergií jen tehdy, když `person.nametagNotes` není prázdné). Existují dva `labelType`: `nametag` (jeden na každou odbavenou osobu; pole jako `person.displayName`, `sessions`, `securityCode` a `person.isBirthdayWeek` — `"true"`, pokud je měsíc/den narozenin do 3 dnů od dneška, včetně přechodu přes konec roku, počítáno v `LabelHelper.isBirthdayWithin()`) a `pickup` (jeden na rodinu; pole jako `children`, `childrenAllergies`). Server vynucuje jednu výchozí šablonu na typ pro každý kostel (`LabelTemplateController.save`). Návrhář obsahuje výchozí šablony zrcadlící vestavěné štítky kiosku a náhled používá ukázková data.

### Vykreslování a tisk na kiosku

Při dokončení odbavení `B1Checkin/src/helpers/LabelHelper.ts` rozhodne, co vytisknout, podle příznaků skupiny u každé čekající návštěvy: jmenovky pro skupiny `printNametag` a jeden rodinný štítek pro vyzvednutí, pokud nějaká návštěva zasáhla skupinu `parentPickup`. Návštěvy s `checkinType` `volunteer` přeskakuje `LabelHelper.selectChildVisits()`, takže pracovník péče o děti v místnosti Vyzvednutí rodiči nikdy nespustí štítek pro vyzvednutí. Bezpečnostní kód z odpovědi odbavení se umístí na dětské jmenovky a štítek pro vyzvednutí; jmenovky dospělých se tisknou bez kódu. Pokud má kostel šablony, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) přemění bloky + kontext polí na samostatný HTML dokument; jinak se použijí vestavěné HTML štítky v `B1Checkin/assets/labels/` s dosazením zástupných hodnot.

Čárové kódy se generují jako vložené SVG čisticími kodéry v TypeScriptu v `B1Checkin/src/helpers/barcode.ts` — tabulky vzorů Code 39 a tabulky šířek Code 128 (kódová sada B s kontrolním součtem mod-103), plus QR přes balíček `qrcode`. **Tyto kodéry jsou záměrně duplikovány v B1Admin** (`LabelEditor.tsx` vkládá stejné tabulky, což je uvedeno v poznámce v kódu), aby náhledy návrháře byly pixelově věrné výstupu kiosku; změna v jednom musí být zrcadlena v druhém.

Tisková cesta (`src/components/PrintUI.tsx`) vykreslí každý HTML štítek v `WebView`, zachytí jej do JPG přes `react-native-view-shot` a předá URI obrázků nativnímu modulu Expo **printer-helper** (`B1Checkin/modules/printer-helper/`). Modul vystavuje `scan()`, `checkInit()`, `printUris()` a události stavu, s poskytovatelem pro každou značku na obou platformách:

| Značka | Android | iOS | Poznámky |
|--------|---------|-----|----------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Síťové tiskárny řady QL (QL-800/810W/820NWB/1100/1110NWB…), vysekávané štítky 29×90, doporučená výchozí volba |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Síťové vyhledávání + tisk obrázků přes TCP/ZPL |

Výběr tiskárny je v `app/printers.tsx` (skenování sítě vrací položky `brand~model~ip`; volba se ukládá do AsyncStorage) a `src/helpers/PrinterLog.ts` vede diagnostický log na zařízení, zobrazený přes živou indikaci stavu v záhlaví kiosku.

## Registrace hostů

Dva způsoby vytvoří osobu uprostřed odbavení:

- **Na kiosku** — tlačítko „Přidat hosta“ na obrazovce domácnosti otevře `B1Checkin/app/addGuest.tsx`, které nejprve vyhledá existující neočlenskou shodu přes `GET /membership/people/search?term=` a jinak ji vytvoří přes `POST /membership/people`, připojenou k aktuální domácnosti. Host pak prochází přiřazením skupiny stejně jako kterýkoli člen.
- **Samoobslužně přes QR** — když je nastavení kostela `enableQRGuestRegistration` zapnuto (nastavuje se v nastavení odbavení v B1Admin, čte se z `GET /membership/settings/public/{churchId}`), obrazovka vyhledání na kiosku zobrazí QR kód odkazující na `https://{subdomain}.b1.church/guest-register?serviceId=`. Tato stránka B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) umožňuje navštěvující rodině zaregistrovat se na vlastním telefonu přes anonymní endpoint `POST /membership/people/guest-register`, čímž udržuje frontu na kiosku v pohybu. Panel QR má také tlačítko **Registrovat zde**, které otevře stejnou stránku na kiosku (`app/guestRegister.tsx`) v anonymním `WebView` bez mezipaměti; `src/helpers/GuestRegisterHelper.ts` sestavuje URL pro QR i pro WebView a blokuje navigaci mimo `https://{subdomain}.b1.church/guest-register`. Obrazovka se po **Hotovo**, zpět nebo 120 sekundách nečinnosti vrátí na vyhledání (psaní ve formuláři se z WebView hlásí jako aktivita) a odpojí WebView, takže záznamy jedné rodiny se nikdy nedostanou k další.

Registrace přes QR je řízena nastavením kostela uloženým z karty **Registrace hostů přes QR** v B1Admin (`src/mobile/CheckInPage.tsx`):

| Nastavení | Viditelnost | Účel |
|---|---|---|
| `enableQRGuestRegistration` | veřejné | Přepínač zapnutí pro QR na kiosku a anonymní endpointy |
| `guestRegistrationFields` | veřejné | JSON mapa `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Výchozí: e-mail a telefon volitelné, zbytek vypnutý. Jméno a příjmení jsou vždy povinné |
| `guestRegistrationImage` | veřejné | URL hlavní fotografie; B1App ji vykreslí v poměru 16:9 místo ikony na formuláři a potvrzovací obrazovce |
| `guestRegistrationGroupId` | soukromé | Skupina, do které se přidává každá registrace (hosté ji nikdy nevidí ani nevybírají) |
| `guestRegistrationRecordAttendance` | soukromé | `"true"` pro zaznamenání docházky i do této skupiny |

Soubor `src/components/checkin/GuestRegister.tsx` v B1App načte kontrolní seznam z anonymního `GET /membership/people/guest-register/options?churchId=` a vykreslí pouze zahrnutá pole (e-mail, telefon, rodinný stav a adresa u primárního kontaktu; datum narození, pohlaví a ročník u každého člena; jedno pole pro komentáře) a odesílá pouze je. Server znovu aplikuje kontrolní seznam v `GuestRegistrationHelper.sanitize()` — vypnutá pole se zahodí, chybějící povinná nebo hodnoty mimo seznam znamenají 400 — před během `PersonHelper.registerGuestHousehold()`. Nejprve pro každého člena s e-mailem nebo telefonem zavolá `PersonRepo.findGuestMatch()`: přesně jedna živá osoba se stejným křestním jménem a stejným e-mailem nebo telefonními číslicemi se znovu použije (žádná nebo několik shod vytvoří novou osobu, takže se nikdy nehádá). Člen bez kontaktu se páruje podle křestního jména uvnitř spárované domácnosti. Znovu použité osoby se nikdy neupravují, takže anonymní formulář nemůže přepsat uložené údaje, a odpověď vrací odeslaná jména. Nespárovaní členové se připojí ke spárované nebo nové domácnosti jako `membershipStatus: "Visitor"` a pro každou novou osobu vyvolají `person.created`. Poté se chyby zaznamenávají do logu místo vrácení: členové se přidají do nakonfigurované skupiny (`group.member.added`); je-li zapnutý záznam docházky, `AttendanceModuleGateway.recordAttendance()` označí každého člena jako přítomného pro každý čas bohoslužby skupiny, který má rozvrh a jehož okno odbavení (`CheckinGateHelper.isServiceTimeOpen`) je právě teď otevřené, a relace pro dnešní datum podle místního času kostela se vytvoří, je-li potřeba — nenaplánované časy bohoslužeb a registrace mimo okno nezaznamenají nic; a komentáře se stanou skrytou poznámkou k osobě v konverzaci u hlavy domácnosti (autor zprávy „Registrace hosta“), propojenou přes `person.conversationId`.

## Související stránky

- [Endpointy docházky](../api/endpoints/attendance) -- Úplné REST rozhraní pro pobočky, služby, relace, návštěvy a visitSessions
- [Endpointy členství](../api/endpoints/membership) -- Osoby, domácnosti a skupiny
- [Webhooky](../api/webhooks) -- Události `session.created`, `attendance.recorded` a `attendance.checkout`
- [Struktura modulů](../api/module-structure) -- Jak je modul docházky organizován na straně serveru
