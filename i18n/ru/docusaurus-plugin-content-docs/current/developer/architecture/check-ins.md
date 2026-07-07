---
title: "Регистрация при прибытии"
---

# Регистрация при прибытии

<div class="article-intro">

Регистрация при прибытии — это одна система с тремя входными дверями: приложение киоска B1Checkin для укомплектованных и самообслуживающихся станций, самостоятельная регистрация внутри портала участников B1App и управление посещаемостью на стороне администратора в B1Admin. Все три записывают в один модуль посещаемости в основной API, и маршрутизация классных комнат управляется полностью группами — нет отдельной сущности "местоположения" или "комнаты". Слой защиты детей находится сверху: типы регистрации при прибытии per-visit, server-side шлюзы вместимости и добровольческого соотношения, age/grade приемлемость на стороне киоска, проверка надежного забирающего лица при выезде и пейджинг родителей через поставщика SMS-сообщений церкви. На этой странице описывается модель данных, потоки регистрации при прибытии, слой защиты и конвейер печати этикеток.

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

Путь печати этикеток (только киоск):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, или bundled HTML fallback)
       └▶ LabelRenderer → HTML документ + inline SVG штрих-коды
            └▶ PrintUI: WebView rendering → ViewShot JPG capture
                 └▶ printer-helper native модуль → Brother QL / Zebra
```

| Поверхность | Репо | Стек | Роль |
|---------|------|-------|------|
| Киоск | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds для Android, Amazon Fire и iOS; OTA updates via `expo-updates` | Укомплектованная или самообслуживающаяся станция с печатью этикеток и проверенным выездом |
| Самостоятельная регистрация | `B1App` | Next.js (b1.church member portal) | Авторизованные участники регистрируют свое домашнее хозяйство со своего телефона; без печати |
| Управление | `B1Admin` | React SPA | Настраивает структуру служения, назначает группы на время служения, проектирует этикетки, записывает ручное посещение, запускает отчеты |

Все три вызывают одни и те же два API модули через `ApiHelper`: **MembershipApi** (`/membership`) для людей, домашних хозяйств и групп; **AttendanceApi** (`/attendance`) для всего ниже.

## Модель данных (`Api/src/modules/attendance`)

| Сущность / таблица | Ключевые поля | Значение |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated здесь — campuses mastered в membership module (`/membership/campuses`); копия посещаемости frozen read-only для legacy readers (`models/Campus.ts`) |
| `services` | campusId, name | Повторяющееся собрание, например "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Временной слот в служении, например "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join таблица: какие группы (классные комнаты) встречаются в каком время служения (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Одна встреча одной группы на один день — создается лениво во время регистрации (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Один человек участвует на один день (`models/Visit.ts`). `checkinType` это `member` / `guest` / `volunteer` (NULL = legacy member), установленный киоском и потребленный шлюзами вместимости/соотношения |
| `visitSessions` | visitId, sessionId | Какую/какие сеансы покрывает посещение — ребенок, зарегистрированный на два момента служения, получает две строки (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Проектируемые расположения этикеток (`models/LabelTemplate.ts`) |

### Как завершенная регистрация сохраняется

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) обрабатывает `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Тело — это массив объектов `Visit`, каждый несущий `visitSessions` чьи встроенные `session` имена только пара `(serviceTimeId, groupId)`. Затем сервер:

1. **Шлюзы вместимости и соотношений перед любой записью.** `evaluateGates()` → `CheckinGateHelper.evaluate()` проверяет вместимость целевой комнаты, вместимость гостей, закрытый флаг и добровольческое соотношение против текущего занятия. postCheckin **не транзакционный**, поэтому shutter должен запуститься перед первым сохранением — hard нарушение возвращает 409, называя offending комнаты и ничего не сохраняется. See [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Разрешает сеансы лениво.** `getSessionId()` находит или создает `sessions` строка для `(groupId, serviceTimeId, today)` — session ids кэшируются в-процессе на дату. Новые сеансы выдают webhook `session.created`. Цикл это awaited `for..of` — более ранний fire-and-forget `forEach(async …)` гонка сохранена и написаны NULL sessionIds при создании первого сеанса (fixed; noted в коментарии кода в цикле).
3. **Заменяет записи дня.** Любые существующие посещения для этих людей в этом служении сегодня удаляются вместе с их visitSessions, затем отправленный набор сохраняется. Пересчет-в семьи поэтому idempotent "это текущее состояние" операция, не append. Передача `?checkDuplicates=true` вместо возвращает `{ duplicates: [personId…] }` без записи, это как киоск предупреждает перед перезаписью.
4. **Генерирует один код безопасности на партию.** `SecurityCodeHelper.generate()` производит 4-значный код из алфавита `23456789BCDFGHJKLMNPQRSTVWXYZ` (без гласных или неоднозначных символов, поэтому коды не могут произносить слова или неправильно читать). Сервер повторяет попытку при столкновении против того же церковного, того же дня открытых посещений и штампует код на каждом посещении в партии.
5. **Возвращает `{ streaks, securityCode }`.** `streaks` maps personId к consecutive-week посещаемость count; киоск celebrate milestones (каждую 5-ю неделю) с конфетти.

Каждое сохраненное посещение также выдает webhook `attendance.recorded`. Сторона чтения, `GET /attendance/visits/checkin`, возвращает посещения людей из их **последней logged date** — если это была предыдущая неделя ids удаляются, поэтому клиент получает предзаполненную копию выборов комнаты последней недели, которые сохранит как новые записи.

### Выезд

Два конечные точки завершают цикл (`VisitController`):

- `GET /attendance/visits/code/:code` — сегодняшние еще-не-checked-out посещения несущие этот код безопасности, с созданными сеансами.
- `POST /attendance/visits/checkout` — тело `{ visitIds, checkedOutBy?, checkedOutById? }`; stamps `checkoutTime` и кто забрал, и выдает webhook `attendance.checkout` per посещение.

Разрешения: киоски authenticate с `attendance.checkin`, что дает ровно surface check-in/check-out/label-template; `attendance.view`/`attendance.edit` охватывают reporting и manual entry; структура (services, service times, group assignments) требует `services.edit`.

## Группы управляют маршрутизацией комнаты

Нет комнаты или сущности классной комнаты нигде в системе. "Комната" это membership **группа** с `trackAttendance` включенной, связанной с одной или несколькими временами служения через `groupServiceTimes`. Поля группы (на `Api/src/modules/membership/models/Group.ts`) которые формируют поведение киоска:

| Поле | Эффект |
|------|--------|
| `trackAttendance` | Группа участвует в посещаемости вообще; B1Admin setup tree flags `trackAttendance` группы с нет `groupServiceTimes` строка как unassigned |
| `parentPickup` | Отмечает детскую комнату: регистрация в неё делает посещение "child" посещением, которое печатает этикетку семейного выезда и ставит код безопасности на бейдж |
| `printNametag` | Печатают ли регистрации в этой группе бейдж вообще |
| `capacity` / `guestCapacity` / `checkinClosed` | Ограничения вместимости комнаты и hard "closed" switch, enforced server-side by the check-in gate (edited в B1Admin группе settings под "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Соотношение детей на добровольца и минимальное количество добровольцев, enforced per церковь-wide `ratioEnforcement` setting |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Границы приемлемости по возрасту/оценке оцененные киоском-side для highlight или dim комнаты |

Каждый клиент denormalizes тот же способ (например `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): load `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` и `GET /membership/groups` в parallel, затем для каждого времени служения собрать группы чьи `groupServiceTimes` строка указывает это в `serviceTime.groups`. Этот массив это что room picker показывает, organized по группе `categoryName`.

Assignments редактируются из страницы группы в B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), и целые Campus → Service → Service Time → Group дерево visualized в `B1Admin/src/attendance/components/AttendanceSetup.tsx` через `GET /attendance/attendancerecords/tree`.

:::info
Потому что группы это единственный источник истины, та же членство группы питает киоск routing, roster-style посещаемость в B1Admin группе pages и посещаемость reporting — assigning группу к time служения это единственный шаг нужный сделать это check-in destination.
:::

## Защита детей

### Типы регистрации при прибытии

Каждое посещение несет `checkinType` — `member`, `guest` или `volunteer` (NULL означает legacy/member; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Тип выбран **киоском-side**: Member / Guest / Volunteer chips на expanded member row (`B1Checkin/src/components/MemberServiceTimes.tsx`), stamped на каждого pending посещение на completion (`app/checkinComplete.tsx`, defaulting к `member`). Сервер потребляет его в шлюзе — добровольцы count toward ratio coverage вместо against capacity и гости count against `guestCapacity`.

### Шлюзы вместимости и добровольческого соотношения

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) runs внутри `postCheckin` перед любым сохранением (конечная точка non-transactional, поэтому gating-before-save это correctness механизм). Он загружает текущее занятие per целевую группу (`VisitRepo.countActiveByGroupToday`) и конфиг группы через gateway membership модуля, затем classifies нарушения:

- **Hard (always block):** `checkinClosed`, `current + incoming > capacity`, guest count over `guestCapacity`. Партия rejected с `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — киоск shows названная комната.
- **Ratio (warn или block):** incoming non-volunteers в комнату где `volunteers < minVolunteers`, no volunteers вообще или `children > volunteers × volunteerRatio`. Severity следует per-church setting `ratioEnforcement` (`"warn"` default / `"block"`, edited в B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Warn-mode возвращает `409 { warning: true, error: "ratio", … }` unless клиент resubmits с `acknowledgeWarnings=true` — этот resubmit это киоска staff-confirm override.

### Age/grade приемлемость (киоск-side)

Приемлемость комнаты это advisory UI, оцененная на киоске не enforced by the server. `B1Checkin/src/helpers/EligibilityHelper.ts` сравнивает день рождения человека/оценку против группы `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (grade order: PreK, K, 1–12, Graduated) и возвращает `eligible` / `ineligible` / `unknown` — отсутствующие данные yields `unknown` и никогда не прячет комнату. Возраста и оценки вычислены as of церковь's **grade promotion date** (`gradePromotionDate` setting, `"MM-DD"`, edited в `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); киоск fetches это из `GET /attendance/checkin/settings` и `resolveAsOfDate` picks самое recent occurrence на или перед today. Room picker highlights eligible комнаты и dims ineligible ones; picking dimmed комната требует staff confirmation.

### Доверенный и неавторизованный забирающий

Забирающие люди это membership сущность, per домашнее хозяйство: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD это `GET /membership/householdpickup/:householdId` (any authenticated церковь user, поэтому киоски могут читать это) плюс `POST` / `DELETE` gated by `people.edit`. Персонал manage список на person page's **Pickup** card (`B1Admin/src/people/components/PickupPeople.tsx`) — фото, relationship и Trusted/Not Authorized status chip.

На check-out (`B1Checkin/app/checkout.tsx`) киоск loads домашнее хозяйство pickup список: `trusted` entries render как tappable pickup карточки alongside household-adult photo grid и free-typed "Other" имя is fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) against `notAuthorized` entries — match блокирует check-out с warning лист и staff **Override** кнопка. Override logged на посещение самое: оно posts `checkedOutBy` как `"OVERRIDE: {name}"` через normal `POST /attendance/visits/checkout` поэтому это lands в attendance record и `attendance.checkout` webhook вместо отдельная audit таблица.

### Пейджинг родителя и экстренное вещание

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) выставляет два SMS конечные точки:

- `POST /page` — `{ visitId, message }`: pages guardiansа one checked-in child (киоск check-out screen, manned mode).
- `POST /broadcast` — `{ serviceId, message }`: texts все checked-in домашнее хозяйство's adults для serving (киоск admin settings, behind type-`EMERGENCY`-to-confirm sheet в `B1Checkin/app/adminSettings.tsx`).

Оба resolve household adults через membership gateway, затем hand delivery к **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — cross-module дверь в церковь's configured texting provider (`@churchapps/texting`: TextInChurch, Clearstream или MutualMinistry; нет built-in SMS sender). Gateway logs `sentText` row плюс per-recipient `deliveryLog` entries и caps batch на 500 recipients; с no provider configured это возвращает `no_provider` которая киоск surfaces как "No SMS provider configured". Dispatcher контроллера's `dispatch()` dedupes phone numbers и skips люди с no mobile или `optedOut` set, возвращая `{ sent, failed, skippedOptedOut, skippedNoPhone }` поэтому киоск может показать что было skipped.

## Киоск (B1Checkin)

Экраны это expo-router файлы under `B1Checkin/app/`; cross-screen state lives в static `CachedData` class (`src/helpers/CachedData.ts`), not React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — search по phone (`GET /membership/people/search/phone?number=`, last-4 или full) или по name (`GET /membership/people/search?term=`). Selecting match loads домашнее хозяйство (`GET /membership/people/household/{householdId}`) и existing visits (`GET /attendance/visits/checkin`), seeding `pendingVisits` с last week's selections.
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — каждая member row shows already-checked-in badge, allergy/`nametagNotes` badge и их current room chips. Expanding member lists каждый service time с room кнопка плюс Member / Guest / Volunteer check-in-type chips (`MemberServiceTimes.tsx`).
3. **Group assignment** (`app/selectGroup.tsx`) — category tree built из `serviceTime.groups`, с age/grade-eligible комнаты highlighted и ineligible ones dimmed за staff confirm (see [Age/grade eligibility](#agegrade-eligibility-kiosk-side)); picking комната пишет `{ session: { serviceTimeId, groupId } }` visitSession into этого person's pending посещение (`src/helpers/VisitSessionHelper.ts`). "None" это clears это.
4. **Complete** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` с `pendingVisits` (каждый stamped с его `checkinType`), затем prints labels если printer configured и auto-returns к lookup. `409` capacity response shows названная full/closed комната; ratio warning предлагает staff confirm который resubmits с `acknowledgeWarnings=true`.

**Check-out** экран (`app/checkout.tsx`) принимает 4-значный код безопасности через auto-focused input — поэтому USB/Bluetooth keyboard-wedge barcode scanners work с no camera — или on-screen keypad используя то же самое алфавит, auto-submitting в 4 символов. Он looks up код, shows дети being picked up и presents домашнее хозяйство's **trusted pickup люди** как tappable карточки alongside photo grid household adults (плюс "Other" free-text опцией это is fuzzy-checked against not-authorized имена — see [Trusted and not-authorized pickup](#trusted-and-not-authorized-pickup)), затем posts `POST /attendance/visits/checkout` с picker's имя/id. В manned mode экран также предложения **Page parent** (`POST /attendance/checkin/page`) и **security-label reprint** — `reprint()` rebuilds семья's labels с `LabelHelper.getAllLabelsFor(...)` и feeds их through same `PrintUI` pipeline как check-in.

Station personality это AsyncStorage flag `@StationMode` (`"self"` | `"manned"`, toggled в `app/adminSettings.tsx`). Manned mode добавляет check-out entry point на lookup экран и per-member profile editing (`POST /membership/people`) из household экран. Киоск hardening это built in: optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) gates the admin и printer экраны admin экран opens только через 7 rapid taps на header logo и idle attract экран (`src/hooks/useInactivityTimer.ts`) takes over between families.

## Самостоятельная регистрация (B1App)

Участники check в з b1.church портала at `/mobile/checkin` экран (routed by `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` к `screens/CheckinPage.tsx`). Это требует logged-in user и walks same четыре шаги as киоск — services → household → groups → complete — against identical конечные точки с state held в `B1App/src/helpers/CheckinHelper.ts`. Различия из киоска: домашнее хозяйство comes из logged-in user's собственный `householdId` (no search step) и flow ends на confirmation экран — no security code display и no label printing. Types и `ApiHelper`/`ArrayHelper` come из `@churchapps/helpers` и `@churchapps/apphelper`; no React компоненты это shared с B1Admin.

## Admin-side посещаемость (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renders структура tree и creates services (`ServiceEdit.tsx`) и service times (`ServiceTimeEdit.tsx`). Campus data comes из membership через `useCampuses()` hook.
- **Manual attendance** lives на Groups side не attendance раздел: `B1Admin/src/groups/components/GroupSessionsTab.tsx` creates sessions (`POST /attendance/sessions`) и marks люди present via `POST /attendance/visitsessions/log` которая finds-или-creates посещение для этого person и session. Group лидеры могут record посещаемость для их собственный группы без `attendance.edit` разрешение — контроллеры check `au.leaderGroupIds`.
- **Reporting** — attendance тренд и group посещаемость это server-defined отчеты (`B1Admin/src/components/reporting/ReportWithFilter.tsx` against ReportingApi); per-person история это `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Печать этикеток

### Шаблоны и дизайнер

Церкви design их own этикетки в B1Admin в `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx` reached из Check-In settings page). Template это `labelTemplates` строка чья `content` это JSON массив blocks — `text`, `field`, `barcode`, `qrcode` или `box` — каждая positioned в percent coordinates с font, alignment, symbology (`code39`/`code128`/`qr`) и optional visibility условия (например только render allergy box когда `person.nametagNotes` is non-empty). Два `labelType`s exist: `nametag` (one per checked-in person; fields как `person.displayName`, `sessions`, `securityCode`) и `pickup` (one per family; fields как `children`, `childrenAllergies`). Сервер enforces single default per type per church (`LabelTemplateController.save`). Дизайнер ships starter templates mirroring киоска's bundled labels и previews against sample данные.

### Rendering и printing на киоске

В check-in completion `B1Checkin/src/helpers/LabelHelper.ts` decides что to print из group flags на каждого pending visit: nametags для `printNametag` группы плюс one семья pickup label если any visit hit `parentPickup` группа. Security code из check-in response goes на child nametags и pickup label; adult nametags print без code. Если church has templates `LabelRenderer` (`src/helpers/LabelRenderer.ts`) turns blocks + field context в standalone HTML документ; иначе bundled HTML labels в `B1Checkin/assets/labels/` используются с placeholder substitution.

Barcodes это generated как inline SVG by pure-TypeScript encoders в `B1Checkin/src/helpers/barcode.ts` — Code 39 pattern таблицы и Code 128 (code set B с mod-103 checksum) width таблицы плюс QR через `qrcode` package. **These encoders это intentionally duplicated в B1Admin** (`LabelEditor.tsx` inlines same таблицы noted в code comment) поэтому designer previews это pixel-faithful к киоска output; change к one must быть mirrored в other.

Print pipeline (`src/components/PrintUI.tsx`) renders каждый HTML label в `WebView` captures его к JPG via `react-native-view-shot` и hands image URIs к native **printer-helper** Expo модулю (`B1Checkin/modules/printer-helper/`). Модуль exposes `scan()`, `checkInit()`, `printUris()` и status события с provider per brand на обоих platforms:

| Бренд | Android | iOS | Примечания |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network принтеры (QL-800/810W/820NWB/1100/1110NWB…) die-cut 29×90 labels рекомендуемый default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Printer selection lives в `app/printers.tsx` (network scan возвращает `brand~model~ip` entries; choice persists к AsyncStorage) и `src/helpers/PrinterLog.ts` keeps on-device diagnostic log surfaced через live status dot в киоска header.

## Guest регистрация

Два пути create person mid-check-in:

- **На киоске** — household экран's "Add guest" opens `B1Checkin/app/addGuest.tsx` которая сначала searches `GET /membership/people/search?term=` для existing non-member match и иначе creates один с `POST /membership/people` attached к current домашнее хозяйство. Guest затем flows через group assignment как any member.
- **Self-serve через QR** — когда church setting `enableQRGuestRegistration` это on (configured в B1Admin's Check-In settings read из `GET /membership/settings/public/{churchId}`) киоск lookup экран shows QR code linking к `https://{subdomain}.b1.church/guest-register?serviceId=`. Этот B1App page (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lets visiting семья register сами на их собственный phone через anonymous `POST /membership/people/guest-register` конечная точка keeping киоск line moving.

## Связанные страницы

- [Attendance Endpoints](../api/endpoints/attendance) — полный REST поверхность для campuses services sessions visits и visit sessions
- [Membership Endpoints](../api/endpoints/membership) — люди домашние хозяйства и группы
- [Webhooks](../api/webhooks) — события `session.created` `attendance.recorded` и `attendance.checkout`
- [Module Structure](../api/module-structure) — как attendance модуль это organized server-side
