---
title: "Регистрация посещений"
---

# Регистрация посещений

<div class="article-intro">

Регистрация — это одна система с тремя точками входа: киоск B1Checkin для станций с сотрудником и для самообслуживания, самостоятельная регистрация внутри портала участников B1App и учёт посещаемости со стороны администраторов в B1Admin. Все три пишут в один и тот же модуль посещаемости в основном Api, а распределение по классам полностью определяется группами — отдельной сущности «локаций» или «комнат» нет. Поверх этого работает слой защиты детей: типы регистрации для каждого визита, серверные проверки вместимости и соотношения волонтёров, проверка возраста и класса на стороне киоска, подтверждение доверенного лица при выдаче ребёнка и вызов родителей через SMS-провайдера церкви. На этой странице описаны модель данных, сценарии регистрации, слой защиты и конвейер печати этикеток.

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

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Поверхность | Репозиторий | Стек | Роль |
|---------|------|-------|------|
| Киоск | `B1Checkin` | Expo / React Native, маршрутизация файлов expo-router; сборки EAS для Android, Amazon Fire и iOS; OTA-обновления через `expo-updates` | Станция с сотрудником или для самообслуживания с печатью этикеток и проверенной выдачей детей |
| Самостоятельная регистрация | `B1App` | Next.js (портал участников b1.church) | Вошедшие участники регистрируют свою семью с телефона; печать не выполняется |
| Администрирование | `B1Admin` | React SPA | Настраивает структуру служений, назначает группы на времена служений, создаёт макеты этикеток, вносит посещаемость вручную, формирует отчёты |

Все три клиента обращаются к двум модулям API через `ApiHelper`: **MembershipApi** (`/membership`) для людей, семей и групп; **AttendanceApi** (`/attendance`) для всего, что описано ниже.

## Модель данных (`Api/src/modules/attendance`)

| Сущность / таблица | Ключевые поля | Значение |
|----------------|-----------|---------|
| `campuses` | name, address | Устаревшая сущность — кампусы ведутся в модуле membership (`/membership/campuses`); копия в посещаемости заморожена и доступна только для чтения старым читателям (`models/Campus.ts`) |
| `services` | campusId, name | Регулярное собрание, например «Воскресное утро» (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Временной слот внутри служения, например «9:00» (`models/ServiceTime.ts`). Колонки расписания необязательны (миграция `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) и определяют [окно регистрации](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Таблица связей: какие группы (классы) собираются в каких временах служения (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Одно собрание одной группы в одну дату — создаётся лениво в момент регистрации (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Одно посещение одним человеком в одну дату (`models/Visit.ts`). `checkinType` — это `member` / `guest` / `volunteer` (NULL = устаревший участник); задаётся киоском и используется шлюзами вместимости и соотношения |
| `visitSessions` | visitId, sessionId | Какие сессии охватывает визит — ребёнок, зарегистрированный на два времени служения, получает две строки (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-блоки) | Настраиваемые макеты этикеток (`models/LabelTemplate.ts`) |

### Как сохраняется завершённая регистрация

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) обрабатывает `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Тело запроса — это массив объектов `Visit`, каждый из которых содержит `visitSessions`, а вложенная `session` указывает только пару `(serviceTimeId, groupId)`. Затем сервер:

1. **Проверяет вместимость и соотношения до любой записи.** `evaluateGates()` → `CheckinGateHelper.evaluate()` проверяет для каждой целевой комнаты вместимость, вместимость для гостей, флаг закрытия и соотношение волонтёров относительно текущей заполненности. Метод postCheckin **не выполняется в транзакции**, поэтому шлюз должен сработать до первого сохранения — при жёстком нарушении возвращается 409 с указанием комнат и ничего не сохраняется. См. [Ограничения вместимости и соотношения волонтёров](#capacity-and-volunteer-ratio-gates).
2. **Создаёт сессии лениво.** `getSessionId()` находит или создаёт строку в `sessions` для `(groupId, serviceTimeId, today)` — идентификаторы сессий кэшируются в процессе для каждой даты. Новые сессии генерируют webhook `session.created`. Цикл построен на awaited `for..of` — более ранний вариант с `forEach(async …)` без ожидания гонялся с сохранением и записывал NULL в sessionId при создании первой сессии (исправлено; отмечено комментарием в коде у цикла).
3. **Заменяет записи за день.** Все существующие визиты этих людей на это служение сегодня удаляются вместе со своими visitSessions, после чего сохраняется переданный набор. Поэтому повторная регистрация семьи — это идемпотентная операция «это текущее состояние», а не добавление. Если передать `?checkDuplicates=true`, метод возвращает `{ duplicates: [personId…] }` без записи — так киоск предупреждает перед перезаписью.
4. **Формирует один код безопасности на пакет.** `SecurityCodeHelper.generate()` создаёт 4-символьный код из алфавита `23456789BCDFGHJKLMNPQRSTVWXYZ` (без гласных и похожих символов, чтобы коды не складывались в слова и не читались неверно). При совпадении с кодом уже открытых сегодняшних визитов той же церкви сервер повторяет генерацию и проставляет код во все визиты пакета.
5. **Возвращает `{ streaks, securityCode }`.** `streaks` сопоставляет personId с количеством посещений подряд по неделям; киоск отмечает вехи (каждую 5-ю неделю) конфетти.

Каждый сохранённый визит также генерирует webhook `attendance.recorded`. Чтение, `GET /attendance/visits/checkin`, возвращает визиты людей за их **последнюю зафиксированную дату** — если это была предыдущая неделя, идентификаторы удаляются, и клиент получает предзаполненную копию выбора комнат прошлой недели, которая сохранится как новые записи.

### Выдача ребёнка

Два эндпоинта завершают цикл (`VisitController`):

- `GET /attendance/visits/code/:code` — сегодняшние визиты с этим кодом безопасности, по которым ещё не выполнена выдача, с заполненными сессиями.
- `POST /attendance/visits/checkout` — тело `{ visitIds, checkedOutBy?, checkedOutById? }`; проставляет `checkoutTime` и того, кто забрал ребёнка, и генерирует webhook `attendance.checkout` для каждого визита.

Права доступа: киоски проходят аутентификацию с `attendance.checkin`, который даёт ровно доступ к регистрации, выдаче и шаблонам этикеток; `attendance.view`/`attendance.edit` покрывают отчёты и ручной ввод; структура (служения, времена служений, назначения групп) требует `services.edit`. Самостоятельная регистрация участника (B1App) не требует никаких прав: любой вошедший пользователь, связанный с человеком в этой церкви, может вызывать `GET`/`POST /attendance/visits/checkin`, а сервер ограничивает передаваемые `personId` собственной семьёй вызывающего (иначе 403 — именно это ограничение не даёт прочитать чужие `securityCode`). Членство и есть разрешение; то, видят ли участники эту функцию, задаётся вкладками навигации B1App в настройках церкви. Остальные эндпоинты регистрации (`code/:code`, `checkout`, `guardians`, `CheckinController`) доступны только киоскам и сотрудникам.

## Группы определяют маршрутизацию по комнатам

В системе нет ни одной сущности комнаты или класса. «Комната» — это группа членства с включённым `trackAttendance`, связанная с одним или несколькими временами служений через `groupServiceTimes`. Поля группы (в `Api/src/modules/membership/models/Group.ts`), которые определяют поведение киоска:

| Поле | Эффект |
|------|--------|
| `trackAttendance` | Группа вообще участвует в посещаемости; дерево настройки в B1Admin помечает группы с `trackAttendance` без строки в `groupServiceTimes` как неназначенные |
| `parentPickup` | Помечает детскую комнату: регистрация в неё делает визит «детским», что печатает этикетку для выдачи семье и помещает код безопасности на бейдж |
| `printNametag` | Печатать ли бейдж при регистрации в эту группу вообще |
| `capacity` / `guestCapacity` / `checkinClosed` | Ограничения вместимости комнаты и жёсткий переключатель «закрыто», которые проверяются на сервере шлюзом регистрации (редактируются в настройках группы в B1Admin в разделе «Check-In Capacity») |
| `volunteerRatio` / `minVolunteers` | Соотношение детей на одного волонтёра и минимальное число волонтёров, применяются в соответствии с общей настройкой церкви `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Границы возраста и класса для допуска, которые проверяются на стороне киоска, чтобы выделить или приглушить комнаты |

Каждый клиент выполняет денормализацию одинаково (например, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): параллельно загружаются `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` и `GET /membership/groups`, затем для каждого времени служения собираются группы, чья строка `groupServiceTimes` на него указывает, в `serviceTime.groups`. Именно этот массив показывает выбор комнаты и организован по `categoryName` группы.

Назначения редактируются со страницы группы в B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), а всё дерево Кампус → Служение → Время служения → Группа визуализируется в `B1Admin/src/attendance/components/AttendanceSetup.tsx` через `GET /attendance/attendancerecords/tree`.

:::info
Поскольку группы — единственный источник истины, одно и то же членство в группе обеспечивает маршрутизацию на киоске, списки участников на страницах групп в B1Admin и отчёты о посещаемости. Назначение группы на время служения — единственный шаг, необходимый, чтобы сделать её пунктом регистрации.
:::

## Защита детей

### Типы регистрации

Каждый визит содержит `checkinType` — `member`, `guest` или `volunteer` (NULL означает устаревший/участник; миграция `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Тип выбирается **на стороне киоска**: чипы «Member / Guest / Volunteer» в развёрнутой строке участника (`B1Checkin/src/components/MemberServiceTimes.tsx`), и проставляются на каждый ожидающий визит при завершении (`app/checkinComplete.tsx`, по умолчанию `member`). Сервер использует его в шлюзе: волонтёры учитываются в покрытии соотношения, а не против вместимости, а гости считаются против `guestCapacity`.

### Ограничения вместимости и соотношения волонтёров

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) выполняется внутри `postCheckin` до любого сохранения (эндпоинт не транзакционный, поэтому корректность обеспечивается проверкой до записи). Он загружает текущую заполненность для каждой целевой группы (`VisitRepo.countActiveByGroupToday`) и конфигурацию группы через шлюз модуля membership, затем классифицирует нарушения:

- **Жёсткие (всегда блокируют):** `checkinClosed`, `current + incoming > capacity`, количество гостей сверх `guestCapacity`. Пакет отклоняется ответом `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — киоск показывает указанную комнату.
- **Соотношение (предупреждение или блокировка):** входящие не-волонтёры в комнату, где `volunteers < minVolunteers`, волонтёров нет вовсе или `children > volunteers × volunteerRatio`. Строгость определяется настройкой церкви `ratioEnforcement` (`"warn"` по умолчанию / `"block"`, редактируется в B1Admin: Manage Church → Check-In, `CheckinSettingsEdit.tsx`). В режиме предупреждения возвращается `409 { warning: true, error: "ratio", … }`, если клиент не отправит повторно с `acknowledgeWarnings=true` — именно такая повторная отправка и есть переопределение сотрудником на киоске.

### Окна регистрации по расписанию

Время служения может иметь необязательное еженедельное расписание (`dayOfWeek` от 0 до 6, где 0 — воскресенье, `startTime`/`endTime` в формате `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), которое редактируется в форме времени служения в B1Admin в разделе **Attendance → Setup** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, «Check-in Schedule»). `CheckinGateHelper.hasSchedule()` считает время служения запланированным, только если заданы и `dayOfWeek`, и `startTime`; незапланированные времена никогда не ограничиваются по времени. `isServiceTimeOpen()` вычисляет окно по местному настенному времени (`DateHelper.toChurchTime`). Часовой пояс для каждого времени служения определяет `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): сначала берётся `timezone` кампуса службы (`service.campusId`, через `MembershipModuleGateway.loadCampusTimeZones`), затем `timeZone` церкви (задаётся в Church Information в B1Admin), затем первый неудалённый кампус с заполненным `timezone` (`loadCampusTimeZone`), и только после этого `America/New_York`. Кампус идёт первым, потому что многим церквям часовой пояс `America/New_York` был проставлен задним числом как часовой пояс церкви. И список, и пути отправки ниже определяют пояс одинаково. Окно идёт от `checkinOpenMinutes` до начала до `checkinCloseMinutes` после окончания (или после начала, если окончания нет), с учётом окон, переходящих через полночь или границу недели.

Окно соблюдается в двух местах:

- **Список:** `GET /attendance/servicetimes` добавляет в каждую строку вычисленный логический флаг `checkinOpen`. Самостоятельная регистрация в B1App (`CheckinPage.tsx`) и выбор служения в B1Checkin (`app/services.tsx`) показывают все времена. Когда все времена служения закрыты, они показывают ближайшее открытие («Check-in opens Sun 9:30 AM.» в B1App, «Check-in for this service opens Sun 9:30 AM.» в B1Checkin, из `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), а если открытие вычислить невозможно — «Check-in isn't open for this service right now.» (киоск предлагает кнопку «Назад», чтобы выбрать другое служение). В остальных случаях закрытые времена отображаются как невыбираемая строка «Closed» / «Closed · opens 9:30 AM». Экран домохозяйства в B1Checkin (`MemberServiceTimes.tsx`) заново проверяет открытость в реальном времени по часам устройства с `ServiceTimeHelper.isCheckinOpen()` (часовой пояс устройства, а не церкви), чтобы киоск, оставленный работать, открывался и закрывался вовремя, и показывает «Kids Room 1 · Checked in» (название группы) для закрытого времени, на которое человек уже зарегистрирован.
- **Отправка:** внутри `evaluateGates()`, до оценки вместимости и соотношения, `findClosedServiceTimeGroups()` отклоняет пакет ответом `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`, если время служения любой целевой сессии находится вне окна. Поскольку существующие визиты семьи на сегодня передаются повторно при каждой регистрации, сессии, на которые человек уже зарегистрирован (`personId|sessionId` в существующих визитах), этот шлюз пропускают — поэтому добавление более позднего открытого времени служения не отклоняется только потому, что закрылось более раннее окно. B1Checkin отображает это через экран жёсткого ограничения с причиной «check-in isn't open right now» (нарушения вместимости по-прежнему показывают «room is full or closed»).

### Допуск по возрасту и классу (на стороне киоска)

Допуск в комнату — это советующий элемент интерфейса, который вычисляется на киоске, а не принудительно проверяется сервером. `B1Checkin/src/helpers/EligibilityHelper.ts` сравнивает дату рождения и класс человека с `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` группы (порядок классов: PreK, K, 1–12, Graduated) и возвращает `eligible` / `ineligible` / `unknown` — отсутствие данных даёт `unknown` и никогда не скрывает комнату. Возраст и класс вычисляются на дату перехода в следующий класс церкви (настройка `gradePromotionDate`, формат `"MM-DD"`, редактируется в `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); киоск получает её из `GET /attendance/checkin/settings`, а `resolveAsOfDate` выбирает ближайшее наступившее значение на сегодня или раньше. Выбор комнаты подсвечивает подходящие комнаты и приглушает неподходящие; выбор приглушённой комнаты требует подтверждения сотрудника.

### Выдача доверенному лицу и лицам без разрешения

Лица, которым можно выдать ребёнка, — это сущность membership, привязанная к семье: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, необязательный personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD: `GET /membership/householdpickup/:householdId` (любой аутентифицированный пользователь церкви, поэтому киоски могут читать список), а `POST` / `DELETE` защищены правом `people.edit`. Сотрудники управляют списком на карточке **Pickup** на странице человека (`B1Admin/src/people/components/PickupPeople.tsx`) — фото, отношение и чип статуса Trusted / Not Authorized.

При выдаче (`B1Checkin/app/checkout.tsx`) киоск загружает список лиц для выдачи семьи: записи `trusted` отображаются как карточки для нажатия рядом с сеткой фотографий взрослых членов семьи, а введённое вручную имя «Other» сравнивается нечётко (расстояние Левенштейна, `src/helpers/PickupMatchHelper.ts`) с записями `notAuthorized` — совпадение блокирует выдачу предупреждающим листом и кнопкой **Override** для сотрудника. Переопределение записывается в сам визит: через обычный `POST /attendance/visits/checkout` отправляется `checkedOutBy` в виде `"OVERRIDE: {name}"`, поэтому оно попадает в запись посещаемости и в webhook `attendance.checkout`, а не в отдельную таблицу аудита.

### Вызов родителя и экстренная рассылка

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) предоставляет два SMS-эндпоинта:

- `POST /page` — `{ visitId, message }`: вызывает опекунов одного зарегистрированного ребёнка (экран выдачи на киоске, ручной режим).
- `POST /broadcast` — `{ serviceId, message }`: отправляет SMS всем взрослым зарегистрированных семей на служение (настройки администратора киоска, за листом подтверждения, где нужно ввести `EMERGENCY`, в `B1Checkin/app/adminSettings.tsx`).

Оба варианта находят взрослых членов семьи через шлюз membership, а затем передают доставку в **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — межмодульный вход к настроенному у церкви SMS-провайдеру (`@churchapps/texting`: TextInChurch, Clearstream или MutualMinistry; встроенного SMS-отправителя нет). Шлюз записывает строку `sentText` и отдельные записи `deliveryLog` для каждого получателя и ограничивает пакет 500 получателями; если провайдер не настроен, он возвращает `no_provider`, и киоск показывает «No SMS provider configured». Метод `dispatch()` контроллера убирает дубликаты номеров и пропускает людей без мобильного номера или с флагом `optedOut`, возвращая `{ sent, failed, skippedOptedOut, skippedNoPhone }`, чтобы киоск мог показать, что было пропущено.

## Киоск (B1Checkin)

Экраны — это файлы expo-router в `B1Checkin/app/`; состояние между экранами хранится в статическом классе `CachedData` (`src/helpers/CachedData.ts`), а не в состоянии React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Поиск** (`app/lookup.tsx`) — поиск по телефону (`GET /membership/people/search/phone?number=`, последние 4 цифры или полный номер) или по имени (`GET /membership/people/search?term=`). Выбор совпадения загружает семью (`GET /membership/people/household/{householdId}`) и существующие визиты (`GET /attendance/visits/checkin`), заполняя `pendingVisits` выбором прошлой недели.
2. **Проверка семьи** (`app/household.tsx`, `src/components/MemberList.tsx`) — каждая строка участника показывает бейдж «уже зарегистрирован», бейдж аллергии/`nametagNotes` и текущие чипы комнат. При развёртывании участника перечисляются все времена служений с кнопкой комнаты и чипами типа регистрации Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Под названием каждого времени служения `ServiceTimeHelper.getGroupSummary()` показывает группы, предлагаемые в это время (названия из `serviceTime.groups`, обрезанные, без повторов без учёта регистра, через запятую); если групп нет, ничего не выводится.
3. **Назначение группы** (`app/selectGroup.tsx`) — дерево категорий, построенное из `serviceTime.groups`, с подсвеченными комнатами, подходящими по возрасту и классу, и приглушёнными неподходящими за подтверждением сотрудника (см. [Допуск по возрасту и классу](#agegrade-eligibility-kiosk-side)); выбор комнаты записывает visitSession `{ session: { serviceTimeId, groupId } }` в ожидающий визит этого человека (`src/helpers/VisitSessionHelper.ts`). «None» очищает выбор.
4. **Завершение** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` с `pendingVisits` (каждый с проставленным `checkinType`), затем печать этикеток, если настроен принтер, и автоматический возврат к поиску. Ответ `409` с ошибкой вместимости или `notOpen` показывает указанную комнату с причиной (заполнена/закрыта или регистрация не открыта); предупреждение о соотношении предлагает подтверждение сотрудника, которое отправляет запрос повторно с `acknowledgeWarnings=true`.

Экран **выдачи** (`app/checkout.tsx`) принимает 4-символьный код безопасности через поле с автофокусом — поэтому сканеры штрихкодов USB/Bluetooth, работающие как клавиатура, работают без камеры, — или через экранную клавиатуру с тем же алфавитом, которая отправляется автоматически при 4 символах. Кнопка **Scan** открывает лист с общей камерой `src/components/CodeScanner.tsx` (по умолчанию основная камера, поддерживаются QR, Code 128 и Code 39), чтобы станции без сканера могли считать этикетку для выдачи; отсканированный код передаётся в тот же путь `handleCode()`, что и введённый вручную. Экран находит код, показывает детей, которых забирают, и выводит **доверенных лиц для выдачи** семьи в виде карточек для нажатия вместе с сеткой фотографий взрослых членов семьи (а также вариант «Other» для произвольного имени, которое нечётко сверяется с именами без разрешения — см. [Доверенные лица и лица без разрешения](#trusted-and-not-authorized-pickup)), затем отправляет `POST /attendance/visits/checkout` с именем/id выбранного лица. В ручном режиме экран также предлагает **Page a parent** (`POST /attendance/checkin/page`) и **повторную печать этикетки безопасности** — `reprint()` пересобирает этикетки семьи через `LabelHelper.getAllLabelsFor(...)` и передаёт их через тот же конвейер `PrintUI`, что и при регистрации.

Режим станции задаётся флагом AsyncStorage `@StationMode` (`"self"` | `"manned"`, переключается в `app/adminSettings.tsx`). Ручной режим добавляет точку входа выдачи на экране поиска и редактирование профиля участника (`POST /membership/people`) с экрана семьи. Защита киоска встроена: необязательный PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) защищает экраны администратора и принтера, экран администратора открывается только при 7 быстрых нажатиях на логотип в шапке, а экран ожидания (`src/hooks/useInactivityTimer.ts`) включается между семьями.

## Самостоятельная регистрация (B1App)

Участники регистрируются с портала b1.church на экране `/mobile/checkin` (маршрутизация через `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` на `screens/CheckinPage.tsx`). Требуется вход в систему; пользователь проходит те же четыре шага, что и на киоске — служения → семья → группы → завершение — с теми же эндпоинтами, а состояние хранится в `B1App/src/helpers/CheckinHelper.ts`. Отличия от киоска: семья берётся из `householdId` вошедшего пользователя (шага поиска нет), и печати этикеток нет — вместо этого на экране завершения показывается код безопасности пакета в виде QR-кода (`qrcode.react`) с подсказкой «покажите это на станции регистрации». Если семья уже зарегистрирована при загрузке страницы, кнопка «Show check-in code» повторно показывает QR-код из первого существующего визита (из `GET /attendance/visits/checkin`), в котором есть `securityCode`. Регистрация фиксируется сразу при отправке (состояния ожидания нет); QR-код нужен только для печати этикеток на киоске.

**Печать этикеток с телефона на киоске** (`B1Checkin/app/scan.tsx`, открывается кнопкой «Scan code» с QR на экране поиска): киоск показывает `CodeScanner` (`CameraView` из `expo-camera`, по умолчанию фронтальная камера, с возможностью переключения), который ищет QR-коды. `ScanCodeHelper.parse()` принимает данные только если это голый 4-символьный код из алфавита кодов безопасности, а `ScanCodeHelper.isRepeat()` игнорирует тот же код в течение 4 секунд, поэтому работают и QR из B1App, и QR-блок напечатанной этикетки. Затем экран идёт по тому же пути повторной печати, что и выдача: `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — и возвращается к поиску. При сканировании запись посещаемости не создаётся; печатаются только этикетки. Коды без активных визитов, станции без принтера и группы без этикеток каждый показывают всплывающее уведомление и возвращают к поиску.

Типы и `ApiHelper`/`ArrayHelper` поступают из `@churchapps/helpers` и `@churchapps/apphelper`; React-компоненты с B1Admin не разделяются.

## Посещаемость со стороны администраторов (B1Admin)

- **Настройка** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) выводит дерево структуры и создаёт служения (`ServiceEdit.tsx`) и времена служений (`ServiceTimeEdit.tsx`). Данные кампусов поступают из membership через хук `useCampuses()`.
- **Ручная посещаемость** находится в разделе групп, а не в разделе посещаемости: `B1Admin/src/groups/components/GroupSessionsTab.tsx` создаёт сессии (`POST /attendance/sessions`; при добавлении `SessionEdit.tsx` может создать по одной сессии для каждой другой группы с выбранным временем служения, пропуская группы, у которых уже есть сессия на эту дату) и отмечает присутствие людей через `POST /attendance/visitsessions/log`, который находит или создаёт визит этого человека на эту сессию. Руководители групп могут отмечать посещаемость своих групп без права `attendance.edit` — контроллеры проверяют `au.leaderGroupIds`.
- **Отчёты** — тренд посещаемости и посещаемость групп являются отчётами, определёнными на сервере (`B1Admin/src/components/reporting/ReportWithFilter.tsx` с ReportingApi; определения в `Api/reports/*.json`). Оба принимают `startDate`/`endDate` (конечная дата включается); отчёт о тренде по умолчанию охватывает период от года назад до сегодня и добавляет столбец `sessionDates` по неделям, а дерево посещаемости групп на экране включает `checkinTime` каждого визита и `membershipStatus` человека. CSV посещаемости групп формируется из сопутствующего отчёта `groupAttendanceDownload`, который `GroupAttendanceDownloadHelper` преобразует в одну строку на участника группы со столбцом «присутствовал/отсутствовал» для каждой датированной сессии; история по конкретному человеку доступна через `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Печать этикеток

### Шаблоны и редактор

Церкви создают собственные этикетки в B1Admin по адресу `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, открывается со страницы настроек регистрации). Шаблон — это строка `labelTemplates`, в поле `content` которой хранится JSON-массив блоков: `text`, `field`, `barcode`, `qrcode` или `box`. Каждый блок размещён в процентных координатах с настройками шрифта, выравнивания, символики (`code39`/`code128`/`qr`) и необязательными условиями видимости (например, выводить блок аллергии только если `person.nametagNotes` не пуст). Существует два значения `labelType`: `nametag` (по одной на каждого зарегистрированного человека; поля вроде `person.displayName`, `sessions`, `securityCode` и `person.isBirthdayWeek` — `"true"`, если день рождения приходится в пределах 3 дней от сегодняшнего, включая переход через конец года; вычисляется `LabelHelper.isBirthdayWithin()`) и `pickup` (по одной на семью; поля вроде `children`, `childrenAllergies`). Сервер поддерживает один шаблон по умолчанию на тип для каждой церкви (`LabelTemplateController.save`). Редактор содержит стартовые шаблоны, повторяющие встроенные этикетки киоска, и показывает предпросмотр на тестовых данных.

### Рендеринг и печать на киоске

По завершении регистрации `B1Checkin/src/helpers/LabelHelper.ts` решает, что печатать, по флагам групп каждого ожидающего визита: бейджи для групп с `printNametag`, а также одна этикетка для выдачи семье, если какой-либо визит попал в группу с `parentPickup`. Визиты с `checkinType` `volunteer` пропускаются функцией `LabelHelper.selectChildVisits()`, поэтому сотрудник детской комнаты в комнате Parent Pickup никогда не вызывает печать этикетки для выдачи. Код безопасности из ответа на регистрацию попадает на бейджи детей и на этикетку для выдачи; бейджи взрослых печатаются без кода. Если у церкви есть шаблоны, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) превращает блоки и контекст полей в самостоятельный HTML-документ; иначе используются встроенные HTML-этикетки из `B1Checkin/assets/labels/` с подстановкой заполнителей.

Штрихкоды формируются как встроенный SVG чистыми TypeScript-кодировщиками в `B1Checkin/src/helpers/barcode.ts` — таблицы шаблонов Code 39 и таблицы ширин Code 128 (набор B с контрольной суммой mod-103), а также QR через пакет `qrcode`. **Эти кодировщики намеренно продублированы в B1Admin** (`LabelEditor.tsx` встраивает те же таблицы, что отмечено комментарием в коде), чтобы предпросмотр в редакторе совпадал с выводом киоска до пикселя; изменение в одном месте нужно повторить в другом.

Конвейер печати (`src/components/PrintUI.tsx`) отображает каждую HTML-этикетку в `WebView`, сохраняет её в JPG через `react-native-view-shot` и передаёт URI изображений нативному модулю Expo **printer-helper** (`B1Checkin/modules/printer-helper/`). Модуль предоставляет `scan()`, `checkInit()`, `printUris()` и события статуса, а на обеих платформах есть провайдер для каждой марки:

| Марка | Android | iOS | Примечания |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK печати Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Сетевые принтеры серии QL (QL-800/810W/820NWB/1100/1110NWB…), вырубные этикетки 29×90, рекомендуемый вариант по умолчанию |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Сетевое обнаружение и печать изображений по TCP/ZPL |

Выбор принтера находится в `app/printers.tsx` (сканирование сети возвращает записи вида `brand~model~ip`; выбор сохраняется в AsyncStorage), а `src/helpers/PrinterLog.ts` ведёт локальный диагностический журнал, который выводится через индикатор статуса в шапке киоска.

## Регистрация гостей

Два пути создают человека прямо во время регистрации:

- **На киоске** — кнопка «Add guest» на экране семьи открывает `B1Checkin/app/addGuest.tsx`, который сначала ищет существующее совпадение среди не-участников через `GET /membership/people/search?term=`, а если его нет, создаёт человека через `POST /membership/people` и привязывает его к текущей семье. Гость затем проходит назначение группы так же, как любой участник.
- **Самостоятельная регистрация по QR** — когда настройка церкви `enableQRGuestRegistration` включена (задаётся в настройках регистрации в B1Admin и читается из `GET /membership/settings/public/{churchId}`), экран поиска на киоске показывает QR-код со ссылкой `https://{subdomain}.b1.church/guest-register?serviceId=`. Эта страница B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) позволяет приезжей семье зарегистрироваться самостоятельно со своего телефона через анонимный эндпоинт `POST /membership/people/guest-register`, не задерживая очередь на киоске. На листе с QR также есть кнопка **Register here**, которая открывает ту же страницу на киоске (`app/guestRegister.tsx`) в режиме инкогнито с отключённым кэшем в `WebView`; `src/helpers/GuestRegisterHelper.ts` формирует URL и для QR, и для WebView и блокирует переходы за пределы `https://{subdomain}.b1.church/guest-register`. Экран возвращается к поиску по **Done**, кнопке «назад» или через 120 секунд бездействия (ввод в форме передаётся из WebView как активность), размонтируя WebView, чтобы данные одной семьи не попали к следующей.

Регистрация по QR управляется настройками церкви, которые сохраняются в карточке **QR Guest Registration** в B1Admin (`src/mobile/CheckInPage.tsx`):

| Настройка | Видимость | Назначение |
|---|---|---|
| `enableQRGuestRegistration` | public | Переключатель, включающий QR на киоске и анонимные эндпоинты |
| `guestRegistrationFields` | public | JSON-карта `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. По умолчанию email и телефон необязательны, остальные отключены. Имя и фамилия всегда обязательны |
| `guestRegistrationImage` | public | URL фотографии-шапки; B1App выводит её в формате 16:9 вместо иконки на форме и экране подтверждения |
| `guestRegistrationGroupId` | private | Группа, в которую добавляется каждая регистрация (гости её никогда не видят и не выбирают) |
| `guestRegistrationRecordAttendance` | private | `"true"`, чтобы также записывать посещаемость для этой группы |

`src/components/checkin/GuestRegister.tsx` в B1App получает список полей из анонимного `GET /membership/people/guest-register/options?churchId=` и выводит только включённые поля (email, телефон, семейное положение и адрес для основного контакта; дата рождения, пол и класс для каждого члена семьи; одно поле комментариев), отправляя только их. Сервер повторно применяет список в `GuestRegistrationHelper.sanitize()` — отключённые поля отбрасываются, отсутствующие обязательные или значения вне списка приводят к 400 — до того, как `PersonHelper.registerGuestHousehold()` создаст новую семью (без дедупликации по email), где каждый участник получит `membershipStatus: "Visitor"`, и для каждого сгенерируется `person.created`. После этого ошибки логируются, а не возвращаются: участники добавляются в настроенную группу (`group.member.added`); если запись посещаемости включена, `AttendanceModuleGateway.recordAttendance()` отмечает каждого участника присутствующим на каждом времени служения группы, у которого есть расписание и окно регистрации (`CheckinGateHelper.isServiceTimeOpen`) открыто прямо сейчас, создавая при необходимости сессию на сегодняшнюю дату по местному времени церкви — незапланированные времена служений и регистрации вне окна ничего не записывают; а комментарии становятся скрытой заметкой к человеку в переписке главы семьи (автор сообщения «Guest sign-up»), связанной через `person.conversationId`.

## Связанные страницы

- [Эндпоинты посещаемости](../api/endpoints/attendance) -- Полный REST-интерфейс для кампусов, служений, сессий, визитов и связей визитов с сессиями
- [Эндпоинты membership](../api/endpoints/membership) -- Люди, семьи и группы
- [Webhooks](../api/webhooks) -- События `session.created`, `attendance.recorded` и `attendance.checkout`
- [Структура модуля](../api/module-structure) -- Как организован модуль посещаемости на сервере
