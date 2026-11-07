---
title: "Пријаве"
description: "Како функционише пријава у B1Checkin-у, B1App-у и B1 Admin-у: подаци о присуству, групе као просторије, ограничења капацитета и безбедност преузимања."
---

# Пријаве

<div class="article-intro">

Пријава је један систем са три улаза: апликација за киоск B1Checkin за станице са особљем и станице за самопријаву, самопријава унутар портала за чланове B1App и административна евиденција присуства у B1Admin. Сва три уписују податке у исти модул присуства у Api-ју, а распоред по учионицама се потпуно заснива на групама — не постоји посебан ентитет „локације” или „собе”. Преко тога је постављен слој за безбедност деце: типови пријаве по посети, провере капацитета и односа волонтера на серверу, провера узраста и разреда на киоску, провера овлашћених особа за преузимање при одјави и обавештавање родитеља путем SMS-а преко добављача текстуалних порука у цркви. На овој страници су приказани модел података, токови пријаве, слој за безбедност и цевовод за штампање налепница.

</div>

## Преглед

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

| Површина | Репозиторијум | Технологија | Улога |
|---------|------|-------|------|
| Киоск | `B1Checkin` | Expo / React Native, рутирање датотека помоћу expo-router; EAS изградње за Android, Amazon Fire и iOS; OTA ажурирања преко `expo-updates` | Станица са особљем или станица за самопослугу са штампањем налепница и провереном одјавом |
| Самопријава | `B1App` | Next.js (портал за чланове b1.church) | Пријављени чланови пријављују своје домаћинство са телефона; без штампања |
| Администрација | `B1Admin` | React SPA | Подешава структуру служби, додељује групе терминима служби, дизајнира налепнице, бележи ручно присуство и покреће извештаје |

Сва три користе исте два API модула преко `ApiHelper`-а: **MembershipApi** (`/membership`) за особе, домаћинства и групе; **AttendanceApi** (`/attendance`) за све испод.

## Модел података (`Api/src/modules/attendance`)

| Ентитет / табела | Кључна поља | Значење |
|----------------|-----------|---------|
| `campuses` | name, address | Застарело — кампуси се воде у модулу за чланство (`/membership/campuses`); копија у модулу присуства је замрznута и само за читање за старије читаоце (`models/Campus.ts`) |
| `services` | campusId, name | Понављајући скуп, нпр. „Недељно јутро” (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Термин унутар службе, нпр. „9:00” (`models/ServiceTime.ts`). Колоне за распоред су опционе (миграција `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) и одређују [прозор за пријаву](#prozori-za-prijavu-po-rasporedu) |
| `groupServiceTimes` | groupId, serviceTimeId | Спојна табела: које групе (учионице) се састају у којим терминима службе (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Један састанак једне групе на један датум — креира се лењо у време пријаве (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Једна особа присутна на један датум (`models/Visit.ts`). `checkinType` је `member` / `guest` / `volunteer` (NULL = наслеђени члан), поставља га киоск, а користе га провере капацитета и односа |
| `visitSessions` | visitId, sessionId | Које сесије посета покрива — дете пријављено на два термина службе добија два реда (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Шаблони налепница које се могу дизајнирати (`models/LabelTemplate.ts`) |

### Како се завршена пријава чува

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) обрађује `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Тело је низ `Visit` објеката, од којих сваки садржи `visitSessions` чија уграђена `session` навodi само пар `(serviceTimeId, groupId)`. Сервер затим:

1. **Проверава капацитет и односе пре било ког уписа.** `evaluateGates()` → `CheckinGateHelper.evaluate()` проверава капацитет сваке циљане собе, капацитет за госте, затворени статус и однос волонтера у односу на тренутну заузетост. postCheckin **није трансакциони**, па провера мора да се изврши пре првог чувања — тешка неусаглашеност враћа 409 са називом собе (соба) које су у питању и ништа се не чува. Видети [Провере капацитета и односа волонтера](#provere-kapaciteta-i-odnosa-volontera).
2. **Лењо разрешава сесије.** `getSessionId()` налази или креира ред у `sessions` за `(groupId, serviceTimeId, today)` — ид-ови сесија се кеширају у процесу по датуму. Нове сесије емитују webhook `session.created`. Петља је чекана `for..of` — раније `forEach(async …)` без чекања је тркао са чувањем и уписивао NULL sessionId-еве при креирању прве сесије (поправљено; напомена у коду код петље).
3. **Замењује записе за дан.** Све постојеће посете тих особа на тој служби данас се бришу заједно са њиховим visitSessions, а затим се чува достављени скуп. Поновна пријава породице је зато идемпотентна операција „ово је тренутно стање”, а не додавање. Ако се уместо тога проследи `?checkDuplicates=true`, враћа се `{ duplicates: [personId…] }` без уписа — тако киоск упозорава пре преписивања.
4. **Генерише један безбедносни код по серији.** `SecurityCodeHelper.generate()` производи 4-знаковни код из азбуке `23456789BCDFGHJKLMNPQRSTVWXYZ` (без самогласника и нејасних знакова, па кодови не могу да сачињавају речи нити да се погрешно читају). Сервер покушава поново у случају колизије са отвореним посетама исте цркве истог дана и жигоше код на свакој посети у серији.
5. **Враћа `{ streaks, securityCode }`.** `streaks` преслikava personId на број узастопних недеља присуства; киоск прославља прекретнице (сваке 5. недеље) конфетима.

Свака сачувана посета такође емитује webhook `attendance.recorded`. Читање, `GET /attendance/visits/checkin`, враћа посете особа од њиховог **последњег евидентираног датума** — ако је то била претходна недеља, ид-ови се уклањају и клијент добија попуњену копију избора соба са прошле недеље која ће се сачувати као нови записи.

### Одјава

Два крајња тачка затварају циклус (`VisitController`):

- `GET /attendance/visits/code/:code` — данашње посете које још нису одјављене, а носе тај безбедносни код, са популисаним сесијама.
- `POST /attendance/visits/checkout` — тело `{ visitIds, checkedOutBy?, checkedOutById? }`; жигоше `checkoutTime` и ко је преузео дете, и емитује webhook `attendance.checkout` за сваку посету.

Дозволе: киосци се аутентификују помоћу `attendance.checkin`, која даје тачно површину за пријаву/одјаву/шаблоне налепница, плус претраге домаћинстава које киоску требају без `people.view` (претрага по телефону/имену, чланови домаћинства у моделу пријаве и листа овлашћених особа за преузимање). `SessionHelper.filterChurches` у B1Checkin нуди само цркве на којима налог има `Attendance/Checkin` или `Attendance/Edit`. `Checkin` више није део дозвола Everyone (null-role) (`RoleHelper` и миграција `2026-11-01_remove_everyone_checkin`), па се мора доделити кроз стварну улогу; `attendance.view`/`attendance.edit` покривају извештавање и ручни унос; структура (службе, termini служби, додела група) захтева `services.edit`. Самопријава члана (B1App) не захтева никакву дозволу: сваки аутентификовани корисник са повезаном особом у цркви може позвати `GET`/`POST /attendance/visits/checkin`, а сервер ограничава послате `personId`-е на сопствено домаћинство корисника (403 у супротном) — ова ограда спречава да се `securityCode`-ови других породица учине читљивима. Чланство је дозвола; то да ли чланови *виде* функцију контролише се навигационим картицама B1App-а цркве. Остали крајњи тачке пријаве (`code/:code`, `checkout`, `guardians`, `CheckinController`) остају само за киоск/особље.

## Групе управљају распоредом по собама

Нигде у систему не постоји ентитет собе или учионице. „Соба” је група из модула за чланство са омогућеним `trackAttendance`, повезана са једним или више termina служби преко `groupServiceTimes`. Поља групе (у `Api/src/modules/membership/models/Group.ts`) која обликују понашање киоска:

| Поље | Ефекат |
|------|--------|
| `trackAttendance` | Група уопште учествује у присуству; стабло подешавања у B1Admin-у означава групе са `trackAttendance` а без реда у `groupServiceTimes` као нераспоређене |
| `parentPickup` | Означава дечију собу: пријава у њу чини посету „дечјом”, што штампа налепницу за преузимање породице и ставља безбедносни код на налепницу за име |
| `printNametag` | Да ли пријаве у ову групу уопште штампају налепницу за име |
| `capacity` / `guestCapacity` / `checkinClosed` | Ограничења капацитета собе и тврди прекидач „затворено”, спроводи сервер преко провере пријаве (уређује се у подешавањима групе у B1Admin-у под „Капацитет пријаве”) |
| `volunteerRatio` / `minVolunteers` | Однос деце по волонтеру и минимални број волонтера, спроводи се према црквеној поставци `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Границе узраста/разреда за подобност, које се процењују на киоску ради истицања или стишавања соба |

Сваки клијент денормализује на исти начин (нпр. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): паралелно учитава `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` и `GET /membership/groups`, а затим за сваки termin службе прикупља групе чији ред у `groupServiceTimes` упућује на њега у `serviceTime.groups`. Тај низ приказује бирач соба, организован по `categoryName` групе.

Додела се уређује са странице групе у B1Admin-у (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), а цело стабло Кампус → Служба → Termin службе → Група је визуализовано у `B1Admin/src/attendance/components/AttendanceSetup.tsx` преко `GET /attendance/attendancerecords/tree`.

:::info
Пошто су групе јединствени извор истине, иста чланства у групама покрећу рутирање на киоску, приказ присуства у облику списка на страницама група у B1Admin-у и извештавање о присуству — додела групе terminu службе је једини корак потребан да би постала одредиште за пријаву.
:::

## Безбедност деце

### Типови пријаве

Свака посета носи `checkinType` — `member`, `guest` или `volunteer` (NULL значи наслеђено/члан; миграција `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Тип бира **киоск**: чипови Члан / Гост / Волонтер у проширеном реду члана (`B1Checkin/src/components/MemberServiceTimes.tsx`), који се уписују на сваку чекајућу посету при завршетку (`app/checkinComplete.tsx`, подразумевано `member`). Сервер га користи у провери — волонтери се рачунају у покривеност односа уместо према капацитету, а гости се рачунају према `guestCapacity`.

### Провере капацитета и односа волонтера

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) извршава се унутар `postCheckin` пре било ког чувања (крајња тачка није трансакциона, па је исправност заснована на провери пре чувања). Учитава тренутну заузетост по циљаној групи (`VisitRepo.countActiveByGroupToday`) и конфигурацију групе преко пролаза модула за чланство, а затим класификује неусаглашености:

- **Тврде (увек блокирају):** `checkinClosed`, `current + incoming > capacity`, број гостију већи од `guestCapacity`. Серија се одбија са `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — киоск приказује назначену собу.
- **Однос (упозорење или блокада):** долазни не-волонтери у соби где је `volunteers < minVolunteers`, нема волонтера уопште или `children > volunteers × volunteerRatio`. Озбиљност следи поставку по цркви `ratioEnforcement` (`"warn"` подразумевано / `"block"`, уређује се у B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Режим упозорења враћа `409 { warning: true, error: "ratio", … }` осим ако клијент поново не пошаље са `acknowledgeWarnings=true` — то поновно слање је потврда особља коју даје киоск.

### Прозори за пријаву по распореду

Termin службе може имати опционални недељни распоред (`dayOfWeek` 0–6 где је 0 = недеља, `startTime`/`endTime` као `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), који се уређује у обрасцу termina службе у B1Admin-у под **Attendance → Setup** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Check-in Schedule”). `CheckinGateHelper.hasSchedule()` третира termin службе као заказан само када су постављени и `dayOfWeek` и `startTime`; термини без распореда никада нису временски ограничени. `isServiceTimeOpen()` израчунава прозор у локалном зидном времену (`DateHelper.toChurchTime`). Зону разрешава `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) за сваки termin службе: прво `timezone` кампуса службе (`service.campusId`, преко `MembershipModuleGateway.loadCampusTimeZones`), затим `timeZone` цркве (постављен у B1Admin-овим подацима о цркви), затим први некласирани кампус који има `timezone` (`loadCampusTimeZone`), и тек онда `America/New_York`. Кампус иде први зато што су многе цркве имале `America/New_York` накнадно попуњено као зону цркве. И путања листања и путања слања у наставку разрешавају зону на исти начин. Прозор почиње `checkinOpenMinutes` пре почетка и завршава се `checkinCloseMinutes` после краја (или после почетка ако нема краја), и обрађује прозоре који прелазе поноћ или границу недеље.

Прозор се спроводи на два места:

- **Листање:** `GET /attendance/servicetimes` сваком реду додаје израчунату логичку вредност `checkinOpen`. Самопријава у B1App-у (`CheckinPage.tsx`) и бирач служби у B1Checkin-у (`app/services.tsx`) задржавају сваки termin. Када су сви termini једне службе затворени, приказују најскоријe отварање („Пријава се отвара у нед 9:30.” у B1App-у, „Пријава за ову службу се отвара у нед 9:30.” у B1Checkin-у, из `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), а када се отварање не може израчунати, резервна порука је „Пријава за ову службу тренутно није отворена.” (киосик нуди дугме Назад за избор друге службе). У супротном, затворени termini се приказују као ред „Затворено” / „Затворено · отвара се у 9:30” који се не може изабрати. Екран домаћинства у B1Checkin-у (`MemberServiceTimes.tsx`) поново процењује отвореност уживо на сату уређаја помоћу `ServiceTimeHelper.isCheckinOpen()` (временска зона уређаја, а не цркве), тако да киоск који ради без надзора отвара и затвара у прави час, и на затвореном терminu који особа већ има приказује „Дечја соба 1 · Пријављен” (назив групе).
- **Слање:** унутар `evaluateGates()`, пре процене капацитета/односа, `findClosedServiceTimeGroups()` одбија серију са `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` ако је termin службе било које циљане сесије ван свог прозора. Пошто се постојеће посете домаћинства за данас поново шаљу при свакој пријави, сесије које особа већ има (`personId|sessionId` у постојећим посетама) прескачу ову проверу, па додавање касније отвореног termina службе не бива одбијено зато што је ранији прозор већ затворен. B1Checkin ово приказује кроз свој екран тврде провере са разлогом „пријава није тренутно отворена” (неусаглашености капацитета и даље гласе „соба је пуна или затворена”).

### Подобност по узрасту/разреду (на киоску)

Подобност соба је саветодавни кориснички интерфејс, процењује се на киоску, а не спроводи сервер. `B1Checkin/src/helpers/EligibilityHelper.ts` упоређује датум рођења/разред особе са границама групе `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (редослед разреда: PreK, K, 1–12, Graduated) и враћа `eligible` / `ineligible` / `unknown` — недостајући подаци дају `unknown` и никада не скривају собу. Узраст и разреди се израчунавају на дан **датума преласка у виши разред** цркве (поставка `gradePromotionDate`, `"MM-DD"`, уређује се у `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); киоск га преузима из `GET /attendance/checkin/settings`, а `resolveAsOfDate` бира најскорије појављивање на или пре данас. Бирач соба истиче подобне собе и stишава неподобне; избор стишане собе захтева потврду особља.

### Овлашћено и неовлашћено преузимање

Особе за преузимање су ентитет модула за чланство, по домаћинству: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, opcioni personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD је `GET /membership/householdpickup/:householdId` (било који аутентификовани корисник цркве, па киосци могу да читају) плус `POST` / `DELETE` које штити `people.edit`. Особље управља списком на картици **Pickup** на страници особе (`B1Admin/src/people/components/PickupPeople.tsx`) — фотографија, однос и ознака статуса Trusted/Not Authorized.

При одјави (`B1Checkin/app/checkout.tsx`) киоск учитава листу преузимања домаћинства: уноси `trusted` се приказују као картице за додир поред мреже фотографија одраслих из домаћинства, а слободно унесено име „Други” се нејасно упоређује (Левенштајнова удаљеност, `src/helpers/PickupMatchHelper.ts`) са уносима `notAuthorized` — подударање блокира одјаву упозорењем и дугметом особља **Override**. Прескакање се бележи на самој посети: шаље `checkedOutBy` као `"OVERRIDE: {name}"` кроз уобичајени `POST /attendance/visits/checkout`, па се упис нађе у евиденцији присуства и у webhook-у `attendance.checkout`, а не у засебној ревизијској табели.

### Позивање родитеља и хитно обавештавање

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) излаже две SMS крајње тачке:

- `POST /page` — `{ visitId, message }`: позива старатеље једног пријављеног детета (екран одјаве на киоску, режим са особљем).
- `POST /broadcast` — `{ serviceId, message }`: шаље текст одраслима из сваког пријављеног домаћинства за службу (подешавања админа на киоску, иза листа за потврду `EMERGENCY` у `B1Checkin/app/adminSettings.tsx`).

Обе крајње тачке разрешавају одрасле из домаћинства преко пролаза за чланство, а затим предају испоруку **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — међумодулни улаз ка конфигурисаном добављачу текстуалних порука цркве (`@churchapps/texting`: TextInChurch, Clearstream или MutualMinistry; уграђеног SMS пошиљаоца нема). Пролаз бележи ред `sentText` плус уносе `deliveryLog` по примаоцу и ограничава серију на 500 прималаца; ако добављач није конфигурисан, враћа `no_provider`, а киоск то приказује као „SMS добављач није конфигурисан”. `dispatch()` контролера уклања дупле бројеве телефона и прескаче особе без мобилног броја или са постављеним `optedOut`, враћајући `{ sent, failed, skippedOptedOut, skippedNoPhone }` како би киоск могао да прикаже шта је прескочено.

## Киоск (B1Checkin)

Екрани су expo-router датотеке у `B1Checkin/app/`; стање између екрана живи у статичкој класи `CachedData` (`src/helpers/CachedData.ts`), а не у React стању.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Претрага** (`app/lookup.tsx`) — претрага по телефону (`GET /membership/people/search/phone?number=`, последње 4 или пун број) или по имену (`GET /membership/people/search?term=`). Избор поклапања учитава домаћинство (`GET /membership/people/household/{householdId}`) и постојеће посете (`GET /attendance/visits/checkin`), popunjавајући `pendingVisits` изборима са прошле недеље.
2. **Преглед домаћинства** (`app/household.tsx`, `src/components/MemberList.tsx`) — сваки ред члана приказује значку већ пријављен, значку алергије/`nametagNotes` и тренутне чипове соба. Проширење члана наводи сваки termin службе са дугметом собе и чиповима типа пријаве Члан / Гост / Волонтер (`MemberServiceTimes.tsx`). Испод назива сваког термина службе, `ServiceTimeHelper.getGroupSummary()` приказује групе које се ту нуде (називи из `serviceTime.groups`, скраћени, без дупликата без обзира на велика и мала слова, спојени зарезом); ништа се не приказује када termin нема група.
3. **Додела групе** (`app/selectGroup.tsx`) — стабло категорија изграђено из `serviceTime.groups`, са подобним собама по узрасту/разреду истакнутим и неподобним stишаним иза потврде особља (видети [Подобност по узрасту/разреду](#podobnost-po-uzrastu-razredu-na-kiosku)); избор собе уписује `{ session: { serviceTimeId, groupId } }` visitSession у ту особу чекајућу посету (`src/helpers/VisitSessionHelper.ts`). „Нема” га брише.
4. **Завршетак** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` са `pendingVisits` (сваки означен својим `checkinType`), затим штампа налепнице ако је штампач конфигурисан и аутоматски се враћа на претрагу. Одговор `409` за капацитет или `notOpen` приказује назначену собу са разлогом (пуна/затворена, или пријава није отворена); упозорење о односу нуди потврду особља која поново шаље са `acknowledgeWarnings=true`.

Екран **одјаве** (`app/checkout.tsx`) прихвата 4-знаковни безбедносни код кроз аутоматски фокусирано поље за унос — тако да USB/Bluetooth скенери бар кодова у виду тастатуре раде без камере — или тастатуру на екрану која користи исту азбуку, аутоматски шаљући при 4 знака. Дугме **Скенирај** отвара листу са дељеном камером `src/components/CodeScanner.tsx` (подразумевано задња камера, прихвата QR, Code 128 и Code 39) како би станице без скенера могле да читају налепницу за преузимање; скенирани код иде истим путем `handleCode()` као унос са тастатуре. Екран тражи код, приказује децу која се преузимају и приказује **овлашћене особе за преузимање** домаћинства као картице за додир поред мреже фотографија одраслих из домаћинства (плус опција „Други” са слободним текстом која се нејасно проверава у односу на имена неовлашћених — видети [Овлашћено и неовлашћено преузимање](#ovlasceno-i-neovlasceno-preuzimanje)), затим шаље `POST /attendance/visits/checkout` са именом/ид-ом бирача. У режиму са особљем екран нуди и **Позови родитеља** (`POST /attendance/checkin/page`) и **поновно штампање безбедносне налепнице** — `reprint()` поново прави налепнице породице помоћу `LabelHelper.getAllLabelsFor(...)` и шаље их кроз исти `PrintUI` цевовод као и пријава.

Карактер станице је AsyncStorage заставица `@StationMode` (`"self"` | `"manned"`, пребацује се у `app/adminSettings.tsx`). Режим са особљем додаје улазну тачку одјаве на екран претраге и уређивање профила по члану (`POST /membership/people`) са екрана домаћинства. Заштита киоска је уграђена: опционални PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) штити екране за админа и штампач, административни екран се отвара само са 7 брзих додира на логотип у заглављу, а неактиван екран за привлачење (`src/hooks/useInactivityTimer.ts`) преузима између породица.

## Самопријава (B1App)

Чланови се пријављују са портала b1.church на екрану `/mobile/checkin` (рутира га `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` на `screens/CheckinPage.tsx`). Захтева пријављеног корисника и пролази кроз исте четири кораке као киоск — службе → домаћинство → групе → завршетак — преко идентичних крајњих тачака, са стањем у `B1App/src/helpers/CheckinHelper.ts`. Разлике у односу на киоск: домаћинство долази из `householdId` самог пријављеног корисника (нема корака претраге), а нема штампања налепница — уместо тога екран за завршетак приказује безбедносни код серије као QR (`qrcode.react`) уз напомену „покажите ово на станици за пријаву”. Ако је домаћинство већ пријављено при учитавању странице, дугме „Прикажи код за пријаву” поново приказује QR из прве постојеће посете (из `GET /attendance/visits/checkin`) која носи `securityCode`. Пријава се бележи одмах при слању (нема стања чекања); QR служи само за штампање налепница на киоску.

**Штампање налепница са телефона на киоск** (`B1Checkin/app/scan.tsx`, отвара се из дугмета „Скенирај код” на QR-у на екрану претраге): киоск приказује `CodeScanner` (`expo-camera` `CameraView`, подразумевано предња камера, може се окренути) и скенира QR кодове. `ScanCodeHelper.parse()` прихвата податке само када је то голи 4-знаковни код из азбуке безбедносног кода, а `ScanCodeHelper.isRepeat()` игнорише исти код 4 секунде, тако да раде и QR из B1App-а и QR блок штампане налепнице. Екран затим прати путању поновног штампања при одјави — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — и враћа се на претрагу. При скенирању се не врши упис присуства; само налепнице. Кодови без активних посета, станице без штампача и групе без налепница свaki приказују поруку и враћају на претрагу.

Типови и `ApiHelper`/`ArrayHelper` долазе из `@churchapps/helpers` и `@churchapps/apphelper`; ниједна React компонента се не дели са B1Admin-ом.

## Присуство у администрацији (B1Admin)

- **Подешавање** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) приказује стабло структуре и омогућава креирање служби (`ServiceEdit.tsx`) и termina служби (`ServiceTimeEdit.tsx`). Подаци о кампусима долазе из чланства преко куке `useCampuses()`.
- **Ручно присуство** живи на страни група, а не у одељку присуства: `B1Admin/src/groups/components/GroupSessionsTab.tsx` креира сесије (`POST /attendance/sessions`; при додавању, `SessionEdit.tsx` може укључити по једну сесију за сваку другу групу која дели изабрани termin службе, прескачући групе које већ имају сесију тог датума) и означава особе присутним преко `POST /attendance/visitsessions/log`, који налази или креира посету за ту особу и сесију. Вође група могу да евидентирају присуство за своје групе без дозволе `attendance.edit` — контролери проверавају `au.leaderGroupIds`.
- **Извештавање** — трендови присуства и присуство по групама су извештаји које дефинише сервер (`B1Admin/src/components/reporting/ReportWithFilter.tsx` према ReportingApi; дефиниције у `Api/reports/*.json`). Оба узимају `startDate`/`endDate` (крајњи датум укључен); извештај о трендовима подразумевано покрива период од годину дана уназад до данас и додаје колону `sessionDates` по недељи, а стабло на екрану за присуство по групама укључује `checkinTime` сваке посете и `membershipStatus` особе. CSV присуства по групама долази из пратећег извештаја `groupAttendanceDownload`, који `GroupAttendanceDownloadHelper` пребацује у један ред по члану групе са колоном присутан/одсутан за сваку датирану сесију; историја по особи је `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Штампање налепница

### Шаблони и дизајнер

Цркве дизајнирају своје налепнице у B1Admin-у на `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, отвара се са странице подешавања пријаве). Шаблон је ред `labelTemplates` чији је `content` JSON низ блокова — `text`, `field`, `barcode`, `qrcode` или `box` — од којих је сваки позициониран у координатама у процентима са фонтом, поравнањем, симболиком (`code39`/`code128`/`qr`) и опционалним условима видљивости (нпр. приказати оквир алергије само када `person.nametagNotes` није празно). Постоје два `labelType`-а: `nametag` (по једна за сваку пријављену особу; поља као `person.displayName`, `sessions`, `securityCode` и `person.isBirthdayWeek` — `"true"` када су месец/дан рођендана у року од 3 дана од данас, уз прелазак преко краја године, рачуна `LabelHelper.isBirthdayWithin()`) и `pickup` (по једна за породицу; поља као `children`, `childrenAllergies`). Сервер спроводи један подразумевани шаблон по типу по цркви (`LabelTemplateController.save`). Дизајнер нуди почетне шаблоне који одражавају уграђене налепнице киоска и приказује преглед на узорку података.

### Исцртавање и штампање на киоску

При завршетку пријаве, `B1Checkin/src/helpers/LabelHelper.ts` одлучује шта ће се штампати на основу ознака група на свакој чекајућој посети: налепнице за име за групе са `printNametag`, плус једна налепница за преузимање породице ако је нека посета погодила групу `parentPickup`. Посете са `checkinType` `volunteer` прескаче `LabelHelper.selectChildVisits()`, па волонтер за децу у соби Parent Pickup никада не покреће налепницу за преузимање. Безбедносни код из одговора на пријаву иде на налепнице деце и налепницу за преузимање; налепнице одраслих се штампају без кода. Ако црква има шаблоне, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) претвара блокове + контекст поља у самостални HTML документ; у супротном се користе уграђене HTML налепнице у `B1Checkin/assets/labels/` са заменом места за податке.

Баркодови се генеришу као уметнути SVG помоћу чистих TypeScript енкодера у `B1Checkin/src/helpers/barcode.ts` — табеле образаца Code 39 и табеле ширина Code 128 (скуп B са mod-103 контролним збиром), плус QR преко пакета `qrcode`. **Ови енкодери су намерно дуплирани у B1Admin-у** (`LabelEditor.tsx` укључује исте табеле, што је наведено у напомени у коду), тако да прегледи дизајнера одговарају излазу киоска пиксел по пиксел; промена у једном мора се пренети и у други.

Цевовод штампања (`src/components/PrintUI.tsx`) исцртава сваку HTML налепницу у `WebView`-у, снима је као JPG преко `react-native-view-shot` и предаје URI-јеве слика изворном Expo модулу **printer-helper** (`B1Checkin/modules/printer-helper/`). Модул излаже `scan()`, `checkInit()`, `printUris()` и догађаје статуса, са провајдером по бренду на обе платформе:

| Бренд | Android | iOS | Напомене |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Мрежни штампачи серије QL (QL-800/810W/820NWB/1100/1110NWB…), исечене налепнице 29×90, препоручени подразумевани |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Откривање на мрежи + TCP/ZPL штампање слика |

Избор штампача је на `app/printers.tsx` (мрежно скенирање враћа уносе `brand~model~ip`; избор се чува у AsyncStorage), а `src/helpers/PrinterLog.ts` чува дијагностички дневник на уређају који се приказује кроз статусну тачку уживо у заглављу киоска.

## Регистрација гостију

Два пута стварају особу усред пријаве:

- **На киоску** — дугме „Додај госта” на екрану домаћинства отвара `B1Checkin/app/addGuest.tsx`, који прво претражује `GET /membership/people/search?term=` за постојеће подударање које није члан, а у супротном креира новог помоћу `POST /membership/people`, прикачен на текуће домаћинство. Гост затим пролази кроз доделу групе као и сваки члан.
- **Самоуслужно преко QR-а** — када је црквена поставка `enableQRGuestRegistration` укључена (подешава се у подешавањима пријаве у B1Admin-у, чита се из `GET /membership/settings/public/{churchId}`), екран претраге на киоску приказује QR код који води на `https://{subdomain}.b1.church/guest-register?serviceId=`. Та страница B1App-а (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) омогућава посетиocima породици да се региструју на сопственом телефону преко анонимне крајње тачке `POST /membership/people/guest-register`, чиме red на киоску се креће. QR лист такође има дугме **Региструј се овде** које отвара исту страницу на киоску (`app/guestRegister.tsx`) у `WebView`-у у инкогнито режиму без кеша; `src/helpers/GuestRegisterHelper.ts` ствара URL и за QR и за WebView и блокира навигацију ван `https://{subdomain}.b1.church/guest-register`. Екран се враћа на претрагу при **Готово**, назад или после 120 секунди неактивности (куцање у обрасцу се преноси из WebView-а као активност), уклањајући WebView тако да уноси једне породице никада не стигну до следеће.

Регистрација путем QR-а се покреће поставкама цркве сачуваним из картице **QR Guest Registration** у B1Admin-у (`src/mobile/CheckInPage.tsx`):

| Поставка | Видљивост | Сврха |
|---|---|---|
| `enableQRGuestRegistration` | јавно | Прекидач за укључивање QR кода на киоску и анонимних крајњих тачака |
| `guestRegistrationFields` | јавно | JSON мапа `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Подразумевано: е-пошта и телефон опциони, остало искључено. Име и презиме су увек обавезни |
| `guestRegistrationImage` | јавно | URL фотографије заглавља; B1App је приказује у односу 16:9 уместо иконе на обрасцу и на екрану за потврду |
| `guestRegistrationGroupId` | приватно | Група у коју се додаје свака пријава (гости је никада не виде нити бирају) |
| `guestRegistrationRecordAttendance` | приватно | `"true"` да се за ту групу такође евидентира присуство |

Компонента B1App-а `src/components/checkin/GuestRegister.tsx` преузима списак из анонимне крајње тачке `GET /membership/people/guest-register/options?churchId=` и приказује само укључена поља (е-пошта, телефон, брачни статус и адреса за примарни контакт; датум рођења, пол и разред по члану; једно поље за коментаре), шаљући само њих. Сервер поново примењује списак у `GuestRegistrationHelper.sanitize()` — искључена поља се одбацују, а недостајућа обавезна или вредности ван листе дају 400 — пре него што се покрене `PersonHelper.registerGuestHousehold()`. Прво позива `PersonRepo.findGuestMatch()` за сваког члана са е-поштом или телефоном: тачно једна жива особа са истим именом и истом е-поштом или истим цифрама телефона се поново користи (нула или више подударања ствара нову особу, па се никада не нагађа). Члан без контакта се подудара по имену унутар подударног домаћинства. Поново коришћене особе се никада не мењају, тако да анонимни образац не може да преписује сачуване податке, а одговор понавља послата имена. Неподударни чланови се придружују подударном или новом домаћинству као `membershipStatus: "Visitor"`, уз емитовање `person.created` за сваку нову особу. Након тога, грешке се бележе, а не враћају: чланови се додају у конфигурисану групу (`group.member.added`); ако је евидентирање присуства укључено, `AttendanceModuleGateway.recordAttendance()` означава сваког члана присутним за сваки termin службе те групе који има распоред и чији је прозор пријаве (`CheckinGateHelper.isServiceTimeOpen`) тренутно отворен, креирајући сесију за данашњи датум по локалном датуму цркве ако је потребно — термини без распореда и пријаве ван прозора не бележе ништа; а коментари постају скривена белешка о особи у разговору са главом домаћинства (аутор поруке „Guest sign-up”), повезана преко `person.conversationId`.

## Повезане странице

- [Крајње тачке присуства](../api/endpoints/attendance.md) -- Пун REST интерфејс за кампусе, службе, сесије, посете и сесије посета
- [Крајње тачке чланства](../api/endpoints/membership.md) -- Особе, домаћинства и групе
- [Webhook-ови](../api/webhooks.md) -- Догађаји `session.created`, `attendance.recorded` и `attendance.checkout`
- [Структура модула](../api/module-structure.md) -- Како је модул присуства организован на серверу
