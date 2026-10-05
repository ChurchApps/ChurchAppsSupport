---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Check-in это одна система с тремя входами: приложение kiosk B1Checkin для обслуживаемых и самообслуживаемых станций, самостоятельный check-in внутри портала членов B1App, и посещаемость на стороне администратора в B1Admin. Все три записывают в один и тот же модуль attendance в основном Api, а маршрутизация в классе управляется полностью Группами — нет отдельной сущности "location" или "rooms". На верху расположен слой безопасности детей: типы check-in за посещение, серверные ворота емкости и коэффициента волонтеров, eligibility по возрасту/классу на стороне kiosk, проверка trusted-pickup при check-out, и paging родителей через поставщика текстовых сообщений церкви. Эта страница отображает модель данных, flows check-in, слой безопасности и pipeline печати ярлыков.

</div>

## Обзор

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

Путь печати ярлыков (только kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, или bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Surface | Repo | Stack | Role |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds для Android, Amazon Fire, и iOS; OTA updates via `expo-updates` | Обслуживаемая или самообслуживаемая станция с печатью ярлыков и проверенным check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Вошедшие члены проверяют своих домочадцев с телефона; без печати |
| Admin | `B1Admin` | React SPA | Настраивает структуру обслуживания, присваивает группы времени обслуживания, разрабатывает ярлыки, записывает ручное посещение, запускает отчеты |

Все три вызывают одни и те же два модуля API через `ApiHelper`: **MembershipApi** (`/membership`) для людей, домохозяйств и групп; **AttendanceApi** (`/attendance`) для всех остальных.

## Модель данных (`Api/src/modules/attendance`)

| Entity / table | Key fields | Meaning |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated здесь — кампусы мастерятся в модуле membership (`/membership/campuses`); копия attendance заморожена только для чтения для наследованных читателей (`models/Campus.ts`) |
| `services` | campusId, name | Повторяющееся собрание, например "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Временной слот в рамках сервиса, например "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: какие группы (классы) встречаются в какое время обслуживания (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Одно собрание одной группы в одну дату — создается лениво при проверке времени (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Один человек посещает в одну дату (`models/Visit.ts`). `checkinType` это `member` / `guest` / `volunteer` (NULL = наследование member), установленный kiosk и потребляемый воротами емкости/коэффициента |
| `visitSessions` | visitId, sessionId | Какие session(ы) покрывает посещение — ребенок, зарегистрировавшийся на два времени обслуживания получает две строки (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designable label layouts (`models/LabelTemplate.ts`) |

### Как завершенный check-in сохраняется

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) обрабатывает `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Тело это массив объектов `Visit`, каждый несущий `visitSessions` чье встроенное `session` называет только пару `(serviceTimeId, groupId)`. Затем сервер:

1. **Ворота емкости и коэффициентов до любой записи.** `evaluateGates()` → `CheckinGateHelper.evaluate()` проверяет емкость каждой целевой комнаты, емкость гостей, закрытый флаг и коэффициент волонтеров против текущей занятости. postCheckin это **не transactional**, поэтому ворота должны работать до первого сохранения — жесткое нарушение возвращает 409, называя нарушающую комнату(ы) и ничего не сохраняется. См. [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Resolves sessions лениво.** `getSessionId()` находит или создает строку `sessions` для `(groupId, serviceTimeId, today)` — session ids кэшируются in-process per date. Новые sessions выпускают webhook `session.created`. Цикл это awaited `for..of` — более раннее fire-and-forget `forEach(async …)` рассчитано на save и написано NULL sessionIds при создании first-session (fixed; отмечено в comment в коде при цикле).
3. **Заменяет записи дня.** Любые существующие visits для этих людей в этом сервисе сегодня удаляются вместе с их visitSessions, затем представленный набор сохраняется. Re-checking-in семья это поэтому идемпотентная операция "это текущее состояние", а не append. Передача `?checkDuplicates=true` вместо этого возвращает `{ duplicates: [personId…] }` без записи, что это как kiosk предупреждает перед перезаписью.
4. **Генерирует один security code за batch.** `SecurityCodeHelper.generate()` производит 4-символьный код из alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (не гласные или неоднозначные символы, поэтому коды не могут писать слова или неправильно читаться). Сервер повторяет попытку на коллизию против открытых посещений того же дня церкви и ставит код на каждый visit в batch.
5. **Возвращает `{ streaks, securityCode }`.** `streaks` отображает personId на count последовательных недель посещения; kiosk праздничует milestones (каждую 5-ю неделю) с конфетти.

Каждый сохраненный visit также выпускает webhook `attendance.recorded`. Сторона чтения, `GET /attendance/visits/checkin`, возвращает visits людей из их **последней залогированной даты** — если это была предыдущая неделя ids удаляются, поэтому клиент получает pre-filled копию выборов комнаты прошлой недели, которая сохранится как новые записи.

### Check-out

Два endpoints закрывают цикл (`VisitController`):

- `GET /attendance/visits/code/:code` — visits сегодня еще не checked-out несущие этот security code, с populated sessions.
- `POST /attendance/visits/checkout` — тело `{ visitIds, checkedOutBy?, checkedOutById? }`; ставит `checkoutTime` и кто забрал, и выпускает webhook `attendance.checkout` для каждого visit.

Разрешения: kiosks authenticate с `attendance.checkin`, который грантит точно поверхность check-in/check-out/label-template; `attendance.view`/`attendance.edit` покрывают отчеты и ручной ввод; структура (services, service times, group assignments) требует `services.edit`. Member self check-in (B1App) не требует никакого разрешения вообще: любой аутентифицированный пользователь с linked person в церкви может вызвать `GET`/`POST /attendance/visits/checkin`, и сервер ограничивает представленные `personId`s домохозяйством вызывающего (403 иначе — этот забор это то, что держит другие семьи `securityCode`s нечитаемыми). Membership это грант; видят ли члены *видят* функцию контролируется вкладками навигации B1App церкви. Другие endpoints check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) остаются только kiosk/staff-only.

## Группы управляют маршрутизацией комнаты

Нет сущности комнаты или classroom нигде в системе. "Комната" это membership **группа** с включенным `trackAttendance`, linked к одному или более service times через `groupServiceTimes`. Поля группы (на `Api/src/modules/membership/models/Group.ts`) которые формируют behavior kiosk:

| Field | Effect |
|------|--------|
| `trackAttendance` | Group участвует в attendance вообще; B1Admin's setup tree флаги `trackAttendance` groups с нет `groupServiceTimes` row как unassigned |
| `parentPickup` | Отмечает комнату ребенка: checking in к ней делает visit "child" visit, который печатает family pickup label и кладет security code на nametag |
| `printNametag` | Печатают ли check-ins к этой группе nametag вообще |
| `capacity` / `guestCapacity` / `checkinClosed` | Room capacity limits и hard "closed" switch, enforced server-side by check-in gate (edited в B1Admin's group settings под "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Children-per-volunteer ratio и minimum volunteer headcount, enforced per church-wide `ratioEnforcement` setting |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Age/grade eligibility bounds evaluated kiosk-side к highlight или dim rooms |

Каждый клиент denormalizes одинаково (например `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): load `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, и `GET /membership/groups` в parallel, затем для каждого service time собрать groups чья `groupServiceTimes` row указывает на это в `serviceTime.groups`. Это array это что room picker показывает, организованный by group `categoryName`.

Assignments редактируются со страницы группы в B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), и весь Campus → Service → Service Time → Group tree визуализируется в `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Потому что groups это single source of truth, one group membership питает kiosk routing, roster-style attendance в B1Admin's group pages, и attendance reporting — assigning group к service time это only step needed к make its check-in destination.
:::

## Безопасность ребенка

### Check-in типы

Каждый visit несет `checkinType` — `member`, `guest`, или `volunteer` (NULL означает legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Тип выбирается **kiosk-side**: Member / Guest / Volunteer chips на expanded member row (`B1Checkin/src/components/MemberServiceTimes.tsx`), stamped на каждый pending visit при completion (`app/checkinComplete.tsx`, defaulting к `member`). Сервер потребляет его в воротах — volunteers считают toward ratio coverage вместо against capacity, и guests считают против `guestCapacity`.

### Capacity и volunteer-ratio gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) runs inside `postCheckin` перед любым save (endpoint это non-transactional, поэтому gating-before-save это correctness mechanism). Он loads current occupancy per targeted group (`VisitRepo.countActiveByGroupToday`) и group config через membership module gateway, затем classifies violations:

- **Hard (всегда блокирует):** `checkinClosed`, `current + incoming > capacity`, guest count over `guestCapacity`. Batch rejected с `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosk показывает named room.
- **Ratio (warn или block):** incoming non-volunteers в room где `volunteers < minVolunteers`, нет волонтеров вообще, или `children > volunteers × volunteerRatio`. Severity следует per-church setting `ratioEnforcement` (`"warn"` default / `"block"`, edited в B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Warn-mode возвращает `409 { warning: true, error: "ratio", … }` если клиент не resubmits с `acknowledgeWarnings=true` — это resubmit это kiosk's staff-confirm override.

### Age/grade eligibility (kiosk-side)

Room eligibility это advisory UI, evaluated на kiosk, не enforced by server. `B1Checkin/src/helpers/EligibilityHelper.ts` сравнивает birthdate/grade человека против group's `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (grade order: PreK, K, 1–12, Graduated) и возвращает `eligible` / `ineligible` / `unknown` — missing data yields `unknown` и никогда не hides room. Ages и grades вычисляются as of church's **grade promotion date** (`gradePromotionDate` setting, `"MM-DD"`, edited в `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosk fetches it из `GET /attendance/checkin/settings`, и `resolveAsOfDate` picks most recent occurrence на или before today. Room picker highlights eligible rooms и dims ineligible ones; picking dimmed room требует staff confirmation.

### Trusted и not-authorized pickup

Pickup people это membership entity, per household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD это `GET /membership/householdpickup/:householdId` (любой authenticated church user, поэтому kiosks могут читать это) плюс `POST` / `DELETE` gated by `people.edit`. Staff управляют list на person page's **Pickup** card (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, relationship, и Trusted/Not Authorized status chip.

At check-out (`B1Checkin/app/checkout.tsx`) kiosk loads household's pickup list: `trusted` entries render как tappable pickup cards вместе с household-adult photo grid, и free-typed "Other" name это fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) против `notAuthorized` entries — match blocks check-out с warning sheet и staff **Override** button. Override это logged на visit itself: он posts `checkedOutBy` как `"OVERRIDE: {name}"` через normal `POST /attendance/visits/checkout`, поэтому lands в attendance record и `attendance.checkout` webhook вместо отдельной audit table.

### Page-a-parent и emergency broadcast

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) exposes два SMS endpoints:

- `POST /page` — `{ visitId, message }`: pages guardians одного checked-in child (kiosk check-out screen, manned mode).
- `POST /broadcast` — `{ serviceId, message }`: texts every checked-in household's adults для service (kiosk admin settings, за type-`EMERGENCY`-to-confirm sheet в `B1Checkin/app/adminSettings.tsx`).

Both resolve household adults через membership gateway, затем hand delivery к **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — cross-module door в church's configured texting provider (`@churchapps/texting`: TextInChurch, Clearstream, или MutualMinistry; нет built-in SMS sender). Gateway logs `sentText` row плюс per-recipient `deliveryLog` entries и caps batch в 500 recipients; с no provider configured это возвращает `no_provider`, который kiosk surfaces как "No SMS provider configured". Controller's `dispatch()` dedupes phone numbers и skips people с no mobile или `optedOut` set, returning `{ sent, failed, skippedOptedOut, skippedNoPhone }` поэтому kiosk может показать что было skipped.

## Kiosk (B1Checkin)

Screens это expo-router files под `B1Checkin/app/`; cross-screen state lives в static `CachedData` class (`src/helpers/CachedData.ts`), не React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — search по phone (`GET /membership/people/search/phone?number=`, last-4 или full) или по name (`GET /membership/people/search?term=`). Selecting match loads household (`GET /membership/people/household/{householdId}`) и existing visits (`GET /attendance/visits/checkin`), seeding `pendingVisits` с last week's selections.
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — каждый member row показывает already-checked-in badge, allergy/`nametagNotes` badge, и их current room chips. Expanding member lists every service time с room button плюс Member / Guest / Volunteer check-in-type chips (`MemberServiceTimes.tsx`). Under каждого service time name, `ServiceTimeHelper.getGroupSummary()` показывает groups offered there (names `serviceTime.groups`, trimmed, de-duplicated case-insensitively, comma-joined); ничего не renders когда time нет groups.
3. **Group assignment** (`app/selectGroup.tsx`) — category tree built из `serviceTime.groups`, с age/grade-eligible rooms highlighted и ineligible ones dimmed за staff confirm (см. [Age/grade eligibility](#agegrade-eligibility-kiosk-side)); picking room writes `{ session: { serviceTimeId, groupId } }` visitSession into это person's pending visit (`src/helpers/VisitSessionHelper.ts`). "None" clears it.
4. **Complete** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` с `pendingVisits` (каждый stamped с это `checkinType`), затем prints labels если printer configured и auto-returns к lookup. `409` capacity response показывает named full/closed room; ratio warning offers staff confirm это resubmits с `acknowledgeWarnings=true`.

**Check-out** screen (`app/checkout.tsx`) accepts 4-character security code через auto-focused input — поэтому USB/Bluetooth keyboard-wedge barcode scanners work с no camera — или on-screen keypad using same alphabet, auto-submitting в 4 characters. **Scan** button opens sheet с shared `src/components/CodeScanner.tsx` camera (back-facing by default, accepting QR, Code 128, и Code 39) поэтому stations без wedge scanner могут читать pickup label; scanned code feeds same `handleCode()` path как typed input. Это looks up code, shows children being picked up, и presents household's **trusted pickup people** как tappable cards вместе с photo grid household adults (плюс "Other" free-text option это fuzzy-checked против not-authorized names — см. [Trusted и not-authorized pickup](#trusted-и-not-authorized-pickup)), затем posts `POST /attendance/visits/checkout` с picker's name/id. In manned mode screen также offers **Page a parent** (`POST /attendance/checkin/page`) и **security-label reprint** — `reprint()` rebuilds family's labels с `LabelHelper.getAllLabelsFor(...)` и feeds them через same `PrintUI` pipeline как check-in.

Station personality это AsyncStorage flag `@StationMode` (`"self"` | `"manned"`, toggled в `app/adminSettings.tsx`). Manned mode добавляет check-out entry point на lookup screen и per-member profile editing (`POST /membership/people`) из household screen. Kiosk hardening это built in: optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) gates admin и printer screens, admin screen opens только via 7 rapid taps на header logo, и idle attract screen (`src/hooks/useInactivityTimer.ts`) takes over между families.

## Self check-in (B1App)

Members check in из b1.church portal в `/mobile/checkin` screen (routed by `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` к `screens/CheckinPage.tsx`). Это requires logged-in user и walks same four steps как kiosk — services → household → groups → complete — против identical endpoints, с state held в `B1App/src/helpers/CheckinHelper.ts`. Это differences из kiosk: household comes из logged-in user's own `householdId` (no search step), и нет label printing — вместо этого completion screen shows batch's security code как QR (`qrcode.react`) с "show this в check-in station" hint. Если household это already checked in когда page loads, "Show check-in code" button re-displays QR из first existing visit (из `GET /attendance/visits/checkin`) что carries `securityCode`. Check-in это recorded immediately при submit time (нет pending state); QR только drives label printing в kiosk.

**Phone-to-kiosk label printing** (`B1Checkin/app/scan.tsx`, reached из QR "Scan code" button на lookup screen): kiosk shows `CodeScanner` (`expo-camera` `CameraView`, front-facing by default, flippable) scanning для QR codes. `ScanCodeHelper.parse()` accepts payload только когда это bare 4-character code в security-code alphabet, и `ScanCodeHelper.isRepeat()` ignores same code для 4 seconds, поэтому both B1App QR и printed label's QR block work. Screen затем follows check-out reprint path — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — и returns к lookup. No attendance write happens в scan time; labels-only. Codes с no active visits, stations с no printer, и label-less groups каждый surface toast и return к lookup.

Types и `ApiHelper`/`ArrayHelper` come из `@churchapps/helpers` и `@churchapps/apphelper`; no React components это shared с B1Admin.

## Admin-side attendance (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renders структуру tree и creates services (`ServiceEdit.tsx`) и service times (`ServiceTimeEdit.tsx`). Campus data comes из membership via `useCampuses()` hook.
- **Manual attendance** lives на Groups side, не attendance section: `B1Admin/src/groups/components/GroupSessionsTab.tsx` creates sessions (`POST /attendance/sessions`; when adding, `SessionEdit.tsx` может include one session per other group sharing chosen service time, skipping groups это already have session на date) и marks people present via `POST /attendance/visitsessions/log`, который finds-or-creates visit для that person и session. Group leaders могут record attendance для their own groups без `attendance.edit` permission — controllers check `au.leaderGroupIds`.
- **Reporting** — attendance trend и group attendance это server-defined reports (`B1Admin/src/components/reporting/ReportWithFilter.tsx` против ReportingApi; definitions в `Api/reports/*.json`). Both take `startDate`/`endDate` (end date inclusive); trend report defaults к one year ago through today и adds per-week `sessionDates` column, и group attendance's on-screen tree includes каждый visit's `checkinTime` и person's `membershipStatus`. Group attendance's CSV comes из companion `groupAttendanceDownload` report, pivoted by `GroupAttendanceDownloadHelper` в one row per group member с present/absent column per dated session; per-person history это `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Label printing

### Templates и designer

Churches design их own labels в B1Admin в `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, reached из Check-In settings page). Template это `labelTemplates` row чья `content` это JSON array of blocks — `text`, `field`, `barcode`, `qrcode`, или `box` — каждый positioned в percent coordinates с font, alignment, symbology (`code39`/`code128`/`qr`), и optional visibility conditions (например только render allergy box когда `person.nametagNotes` это non-empty). Two `labelType`s exist: `nametag` (one per checked-in person; fields как `person.displayName`, `sessions`, `securityCode`, и `person.isBirthdayWeek` -- `"true"` когда birthday's month/day это within 3 days of today, wrapping across year end, computed by `LabelHelper.isBirthdayWithin()`) и `pickup` (one per family; fields как `children`, `childrenAllergies`). Server enforces single default per type per church (`LabelTemplateController.save`). Designer ships starter templates mirroring kiosk's bundled labels и previews против sample data.

### Rendering и printing на kiosk

At check-in completion, `B1Checkin/src/helpers/LabelHelper.ts` decides что для print из group flags на каждый pending visit: nametags для `printNametag` groups, плюс one family pickup label если any visit hit `parentPickup` group. Visits с `checkinType` `volunteer` это skipped by `LabelHelper.selectChildVisits()`, поэтому childcare worker в Parent Pickup room никогда не triggers pickup label. Security code из check-in response goes на child nametags и pickup label; adult nametags print без code. Если church has templates, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) turns blocks + field context в standalone HTML document; иначе bundled HTML labels в `B1Checkin/assets/labels/` используются с placeholder substitution.

Barcodes generated как inline SVG by pure-TypeScript encoders в `B1Checkin/src/helpers/barcode.ts` — Code 39 pattern tables и Code 128 (code set B с mod-103 checksum) width tables, плюс QR via `qrcode` package. **These encoders это intentionally duplicated в B1Admin** (`LabelEditor.tsx` inlines same tables, noted в code comment) поэтому designer previews это pixel-faithful к kiosk output; change к one must be mirrored в other.

Print pipeline (`src/components/PrintUI.tsx`) renders каждый HTML label в `WebView`, captures it к JPG via `react-native-view-shot`, и hands image URIs к native **printer-helper** Expo module (`B1Checkin/modules/printer-helper/`). Module exposes `scan()`, `checkInit()`, `printUris()`, и status events, с provider per brand на both platforms:

| Brand | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, это recommended default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Printer selection lives в `app/printers.tsx` (network scan returns `brand~model~ip` entries; choice persists к AsyncStorage), и `src/helpers/PrinterLog.ts` keeps on-device diagnostic log surfaced через live status dot в kiosk header.

## Guest registration

Two paths create person mid-check-in:

- **На kiosk** — household screen's "Add guest" opens `B1Checkin/app/addGuest.tsx`, который first searches `GET /membership/people/search?term=` для existing non-member match и иначе creates one с `POST /membership/people`, attached к current household. Guest затем flows через group assignment как any member.
- **Self-serve via QR** — когда church setting `enableQRGuestRegistration` это on (configured в B1Admin's Check-In settings, read из `GET /membership/settings/public/{churchId}`), kiosk lookup screen shows QR code linking к `https://{subdomain}.b1.church/guest-register?serviceId=`. That B1App page (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lets visiting family register themselves на their own phone через anonymous `POST /membership/people/guest-register` endpoint, keeping kiosk line moving. QR sheet также has **Register here** button это opens same page на kiosk (`app/guestRegister.tsx`) в incognito, cache-disabled `WebView`; `src/helpers/GuestRegisterHelper.ts` builds URL для both QR и WebView и blocks navigation off `https://{subdomain}.b1.church/guest-register`. Screen pops back к lookup на **Done**, back, или 120 seconds of inactivity (form typing это relayed из WebView как activity), unmounting WebView поэтому one family's entries никогда не reach next.

## Связанные страницы

- [Attendance Endpoints](../api/endpoints/attendance) — Full REST surface для campuses, services, sessions, visits, и visit sessions
- [Membership Endpoints](../api/endpoints/membership) — People, households, и groups
- [Webhooks](../api/webhooks) — `session.created`, `attendance.recorded`, и `attendance.checkout` events
- [Module Structure](../api/module-structure) — How attendance module это organized server-side
