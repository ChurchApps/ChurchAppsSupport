---
title: "Endpoints посещаемости"
---

# Endpoints посещаемости

<div class="article-intro">

Модуль Attendance управляет местоположениями кампусов, услугами, временем обслуживания, сеансами посещаемости, посещениями и сеансами посещений. Он обеспечивает инфраструктуру для отслеживания того, кто посетил какую услугу или встречу группы, поддерживает рабочие процессы check-in и предлагает отчеты по тенденциям и сводкам посещаемости.

</div>

**Базовый путь:** `/attendance`

## Campuses

Базовый путь: `/attendance/campuses`

Standard CRUD controller (extends GenericCrudController). Предоставляет маршруты `getById`, `getAll`, `post` и `delete` через базовый класс CRUD.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех кампусов для церкви |
| GET | `/:id` | JWT | — | Получить кампус по ID |
| POST | `/` | JWT | Services.Edit | Создать или обновить кампусы |
| DELETE | `/:id` | JWT | Services.Edit | Удалить кампус |

## Services

Базовый путь: `/attendance/services`

Расширяет GenericCrudController с маршрутами CRUD `getById`, `getAll`, `post` и `delete`. Endpoints `getAll` (`GET /`) и `search` переопределены с пользовательскими реализациями.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех услуг (включает информацию о кампусе) |
| GET | `/:id` | JWT | — | Получить услугу по ID |
| GET | `/search?campusId=` | JWT | — | Поиск услуг по ID кампуса |
| POST | `/` | JWT | Services.Edit | Создать или обновить услуги |
| DELETE | `/:id` | JWT | Services.Edit | Удалить услугу |

### Пример: поиск услуг по кампусу

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

## Service Times

Базовый путь: `/attendance/servicetimes`

Расширяет GenericCrudController с маршрутами CRUD `getById`, `post` и `delete`. Endpoints `getAll` и `search` — пользовательские реализации.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех времен обслуживания. Фильтр по `?serviceId=`. Добавьте `?include=groups` для добавления данных группы |
| GET | `/:id` | JWT | — | Получить время обслуживания по ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Поиск времен обслуживания по кампусу и услуге |
| GET | `/public/:churchId` | Public | — | Получить дерево кампуса → услуги → времени для церкви. Питает элемент `serviceTimes` построителя веб-сайтов |
| POST | `/` | JWT | Services.Edit | Создать или обновить времена обслуживания |
| DELETE | `/:id` | JWT | Services.Edit | Удалить время обслуживания |

## Group Service Times

Базовый путь: `/attendance/groupservicetimes`

Связывает группы с определенными временами обслуживания.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех ассоциаций группа-время обслуживания. Фильтр по `?groupId=` для получения ассоциаций с названиями услуг |
| GET | `/:id` | JWT | — | Получить ассоциацию группа-время обслуживания по ID |
| POST | `/` | JWT | Services.Edit | Создать или обновить ассоциации группа-время обслуживания |
| DELETE | `/:id` | JWT | Services.Edit | Удалить ассоциацию группа-время обслуживания |

## Attendance Records

Базовый путь: `/attendance/attendancerecords`

Предоставляет представления только для чтения агрегированных данных посещаемости для отчетности и отображения.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Загрузить записи посещаемости для человека. Требует `?personId=` |
| GET | `/tree` | JWT | — | Загрузить полное дерево посещаемости (кампусы, услуги, времена обслуживания, группы) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Загрузить данные тенденций посещаемости с дополнительными фильтрами |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Загрузить посещаемость группы для услуги на данной неделе |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Для каждой группы, назначенной времени обслуживания, верните `{ groupId, sessionId, attendanceCount }` для этой даты (`date` это `YYYY-MM-DD`; `sessionId` это null когда у группы нет сеанса). Поддерживает диалог B1Admin **Who Still Needs Attendance** |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Поиск записей посещаемости с фильтрами (кампус, услуга, время обслуживания, группа, диапазон дат) |

### Пример: тенденция посещаемости

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

## Sessions

Базовый путь: `/attendance/sessions`

Расширяет GenericCrudController с маршрутами CRUD `getById` и `delete`. Endpoints `getAll` и `save` — пользовательские реализации, которые также позволяют лидерам группы управлять сеансами для своих групп.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View или Group Leader | Список всех сеансов. Фильтр по `?groupId=` (включает названия). Лидеры группы могут просмотреть сеансы для своих групп |
| GET | `/:id` | JWT | Attendance.View | Получить сеанс по ID |
| POST | `/` | JWT | Attendance.Edit или Group Leader | Создать или обновить сеансы. Лидеры группы могут сохранять сеансы для своих групп |
| DELETE | `/:id` | JWT | Attendance.Edit | Удалить сеанс |

## Visits

Базовый путь: `/attendance/visits`

Управляет записями индивидуальных посещений (человек посещает в конкретную дату) и обеспечивает рабочий процесс check-in.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Список всех посещений. Фильтр по `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Получить посещение по ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View или Attendance.Checkin | Загрузить данные check-in для людей на услуге. Возвращает посещения с сеансами посещений с последней залогированной даты |
| POST | `/` | JWT | Attendance.Edit | Создать или обновить посещения |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit или Attendance.Checkin | Отправить данные check-in. Создает/обновляет посещения и сеансы посещений, удаляет устаревшие записи |
| DELETE | `/:id` | JWT | Attendance.Edit | Удалить посещение |

### Пример: Check-in рабочий процесс

**Шаг 1 — загрузить существующие данные check-in:**

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

**Шаг 2 — отправить check-in:**

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

## Visit Sessions

Базовый путь: `/attendance/visitsessions`

Управляет ассоциацией между посещениями и сеансами (какой конкретный сеанс человек посетил во время посещения). Также предоставляет быстрый endpoint журнала и endpoint для загрузки/экспорта.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View или Group Leader | Список сеансов посещения. Фильтр по `?sessionId=`. Лидеры группы могут просмотреть сеансы посещений для своих групп |
| GET | `/:id` | JWT | Attendance.View | Получить сеанс посещения по ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Загрузить посещаемость для сеанса (возвращает имена людей со статусом присутствия/отсутствия) |
| POST | `/` | JWT | Attendance.Edit | Создать или обновить сеансы посещений |
| POST | `/log` | JWT | Attendance.Edit или Group Leader | Быстро записать посещаемость человека в сеанс. Автоматически создает посещение при необходимости. Лидеры группы могут записывать посещаемость для своих групп |
| DELETE | `/:id` | JWT | Attendance.Edit | Удалить сеанс посещения по ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit или Group Leader | Удалить человека из сеанса. Удаляет сеанс посещения и родительское посещение, если не осталось сеансов. Лидеры группы могут удалить посещаемость для своих групп |

### Пример: быстрая запись посещаемости

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

### Пример: загрузить посещаемость сеанса

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

## Streaks

Базовый путь: `/attendance/streaks`

Отслеживает серии посещений для людей — последовательные недели, когда человек посетил. Полезно для метрик взаимодействия и геймификации.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Загрузить серии посещений для человека |

## Связанные страницы

- [Endpoints членства](./membership) — люди, группы, роли и управление церковью
- [Аутентификация и разрешения](./authentication) — поток входа, JWT, модель разрешений
- [Структура модуля](../module-structure) — паттерны организации кода
