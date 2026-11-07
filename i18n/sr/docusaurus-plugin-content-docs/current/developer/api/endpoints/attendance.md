---
title: "Крајње тачке присуства"
description: "Референца за API присуства у B1 Admin и B1 Checkin: кампуси, богослужења, времена, сесије, посете, правила пријаве и крајње тачке за извоз."
---

# Крајње тачке присуства

<div class="article-intro">

Модул за присуство управља локацијама кампуса, службама, терминима служби, сесијама присуства, посетама и сесијама посета. Пружа инфраструктуру за праћење ко је присуствовао којој служби или састанку групе, подржава токове пријаве и нуди извештавање о трендовима и сумама присуства.

</div>

**Основна путања:** `/attendance`

## Кампуси

Основна путања: `/attendance/campuses`

Стандардни CRUD контролер (проширује GenericCrudController). Пружа руте `getById`, `getAll`, `post` и `delete` преко основне CRUD класе.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Преглед свих кампуса за цркву |
| GET | `/:id` | JWT | — | Преглед кампуса по ID-у |
| POST | `/` | JWT | Services.Edit | Креирање или ажурирање кампуса |
| DELETE | `/:id` | JWT | Services.Edit | Брисање кампуса |

## Службе

Основна путања: `/attendance/services`

Проширује GenericCrudController са CRUD рутама `getById`, `getAll`, `post` и `delete`. Крајње тачке `getAll` (`GET /`) и `search` замењене су прилагођеним имплементацијама.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Преглед свих служби (укључује податке о кампусу) |
| GET | `/:id` | JWT | — | Преглед службе по ID-у |
| GET | `/search?campusId=` | JWT | — | Претрага служби по ID-у кампуса |
| POST | `/` | JWT | Services.Edit | Креирање или ажурирање служби |
| DELETE | `/:id` | JWT | Services.Edit | Брисање службе |

### Пример: претрага служби по кампусу

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Termini službi

Основна путања: `/attendance/servicetimes`

Проширује GenericCrudController са CRUD рутама `getById`, `post` и `delete`. Крајње тачке `getAll` и `search` су прилагођене имплементације.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Преглед свих termina служби. Филтрирање путем `?serviceId=`. Додајте `?include=groups` за додавање података о групама. Сваки ред укључује израчунату логичку вредност `checkinOpen` (false само када termin службе има распоред пријаве чији је прозор тренутно затворен). Прозор се мери у временској зони кампуса службе, затим у временској зони цркве, затим у временској зони првог кампуса који је има, па онда `America/New_York` |
| GET | `/:id` | JWT | — | Преглед termina службе по ID-у |
| GET | `/search?campusId=&serviceId=` | JWT | — | Претрага termina служби по кампусу и служби |
| GET | `/public/:churchId` | Јавно | — | Преглед стабла кампус → служба → termin за цркву. Покреће елемент `serviceTimes` у алату за градњу веб-сајта |
| POST | `/` | JWT | Services.Edit | Креирање или ажурирање termina служби. Опционална поља распореда: `dayOfWeek` (0 = недеља … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (пре почетка), `checkinCloseMinutes` (после краја). Пријава је временски ограничена само када су постављени и `dayOfWeek` и `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Брисање termina службе |

## Времена служби група

Основна путања: `/attendance/groupservicetimes`

Повезује групе са одређеним терминима служби.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Преглед свих веза група и termina служби. Филтрирање путем `?groupId=` даје везе са називима служби |
| GET | `/:id` | JWT | — | Преглед везе групе и termina службе по ID-у |
| POST | `/` | JWT | Services.Edit | Креирање или ажурирање веза група и termina служби |
| DELETE | `/:id` | JWT | Services.Edit | Брисање везе групе и termina службе |

## Записи о присуству

Основна путања: `/attendance/attendancerecords`

Пружа приказе збирних података о присуству само за читање, за извештавање и приказ.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Учитавање записа о присуству за особу. Потребан је `?personId=` |
| GET | `/my` | JWT | — | Ограничено на корисника: сопствени записи о присуству пријављеног члана из последњих 12 месеци, од најновијих. Враћа `401` ако корисник није повезан са особом. Покреће одељак **Моје присуство** на страници B1 Me |
| GET | `/tree` | JWT | — | Учитавање комплетног стабла присуства (кампуси, службе, termini служби, групе) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Учитавање података о трендовима присуства уз опционалне филтере |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Учитавање присуства група за службу у датој недељи |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | За сваку групу додељену terminu службе враћа `{ groupId, sessionId, attendanceCount }` за тај датум (`date` је `YYYY-MM-DD`; `sessionId` је null када група nema сесију). Покреће дијалог **Ко још треба да се евидентира** у B1Admin-у |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Претрага записа о присуству уз филтере (кампус, служба, termin службе, група, опсег датума) |

### Пример: тренд присуства

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Сесије

Основна путања: `/attendance/sessions`

Проширује GenericCrudController са CRUD рутама `getById` и `delete`. Крајње тачке `getAll` и `save` су прилагођене имплементације које такође омогућавају вођама група да управљају сесијама својих група.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View или Вођа групе | Преглед свих сесија. Филтрирање путем `?groupId=` (укључује називе). Вође група могу прегледати сесије својих група |
| GET | `/:id` | JWT | Attendance.View | Преглед сесије по ID-у |
| POST | `/` | JWT | Attendance.Edit или Вођа групе | Креирање или ажурирање сесија. Вође група могу чувати сесије за своје групе |
| DELETE | `/:id` | JWT | Attendance.Edit | Брисање сесије |

## Посете

Основна путања: `/attendance/visits`

Управља појединачним записима о посетама (особа присутна на одређени датум) и пружа ток пријаве.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Преглед свих посета. Филтрирање путем `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Преглед посете по ID-у |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View или Attendance.Checkin | Учитавање података за пријаву особа на служби. Враћа посете са сесијама посета из последњег забележеног датума |
| POST | `/` | JWT | Attendance.Edit | Креирање или ажурирање посета |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit или Attendance.Checkin | Слање података за пријаву. Креира или ажурира посете и сесије посета, уклања застареле записе |
| DELETE | `/:id` | JWT | Attendance.Edit | Брисање посете |

### Пример: ток пријаве

**Корак 1 -- Учитајте постојеће податке за пријаву:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Корак 2 -- Пошаљите пријаву:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

Ако циљни termin службе има распоред пријаве и његов прозор је затворен (мерено истим редоследом временских зона са првенством кампуса као и `checkinOpen`), ништа се не чува и одговор је `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Прекорачења капацитета и односа волонтера такође враћају 409 (`error: "capacity"` или `"ratio"`). Сесије које особа већ има данас (поново послате са сваком пријавом) прескачу проверу прозора, тако да домаћинство може додати отворен termin службе након што је прозор ранијег термина већ затворен.

## Сесије посета

Основна путања: `/attendance/visitsessions`

Управља везом између посета и сесија (која конкретна сесија је особа похађала током посете). Такође пружа брзу крајњу тачку за евиденцију и крајњу тачку за преузимање/извоз.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View или Вођа групе | Преглед сесија посета. Филтрирање путем `?sessionId=`. Вође група могу прегледати сесије посета својих група |
| GET | `/:id` | JWT | Attendance.View | Преглед сесије посете по ID-у |
| GET | `/download/:sessionId` | JWT | Attendance.View | Преузимање присуства за сесију (враћа имена особа са статусом присутан/одсутан) |
| POST | `/` | JWT | Attendance.Edit | Креирање или ажурирање сесија посета |
| POST | `/log` | JWT | Attendance.Edit или Вођа групе | Брза евиденција присуства особе на сесији. Аутоматски креира посету ако је потребно. Вође група могу евидентирати присуство за своје групе |
| DELETE | `/:id` | JWT | Attendance.Edit | Брисање сесије посете по ID-у |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit или Вођа групе | Уклањање особе из сесије. Брише сесију посете и матичну посету ако не остане nijedna сесија. Вође група могу уклонити присуство за своје групе |

### Пример: брза евиденција присуства

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Пример: преузимање присуства за сесију

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Низови

Основна путања: `/attendance/streaks`

Прати низове присуства појединаца — узастопне недеље у којима је особа присуствовала. Корисно за метрике ангажовања и гејмификацију.

| Метод | Путања | Аутентификација | Дозвола | Опис |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Учитавање низова присуства за особу |

## Повезане странице

- [Крајње тачке чланства](./membership.md) — Особе, групе, улоге и управљање црквом
- [Аутентификација и дозволе](./authentication.md) — Ток пријаве, JWT, модел дозвола
- [Структура модула](../module-structure.md) — Обрасци организације кода
