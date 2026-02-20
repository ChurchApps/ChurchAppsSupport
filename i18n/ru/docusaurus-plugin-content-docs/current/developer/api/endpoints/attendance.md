---
title: "Эндпоинты Attendance"
---

# Эндпоинты Attendance

<div class="article-intro">

Модуль Attendance управляет местоположениями кампусов, служениями, временем служений, сессиями посещаемости, визитами и сессиями визитов. Он обеспечивает инфраструктуру для отслеживания того, кто посетил какое служение или встречу группы, поддерживает процессы регистрации и предоставляет отчёты о тенденциях и сводках посещаемости.

</div>

**Базовый путь:** `/attendance`

## Кампусы

Базовый путь: `/attendance/campuses`

Стандартный CRUD-контроллер (наследует GenericCrudController). Предоставляет маршруты `getById`, `getAll`, `post` и `delete` через базовый CRUD-класс.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех кампусов церкви |
| GET | `/:id` | JWT | — | Получить кампус по ID |
| POST | `/` | JWT | Services.Edit | Создать или обновить кампусы |
| DELETE | `/:id` | JWT | Services.Edit | Удалить кампус |

## Служения

Базовый путь: `/attendance/services`

Наследует GenericCrudController с CRUD-маршрутами `getById`, `getAll`, `post` и `delete`. Маршруты `getAll` (`GET /`) и `search` переопределены пользовательскими реализациями.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех служений (включает информацию о кампусе) |
| GET | `/:id` | JWT | — | Получить служение по ID |
| GET | `/search?campusId=` | JWT | — | Поиск служений по ID кампуса |
| POST | `/` | JWT | Services.Edit | Создать или обновить служения |
| DELETE | `/:id` | JWT | Services.Edit | Удалить служение |

### Пример: Поиск служений по кампусу

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

## Время служений

Базовый путь: `/attendance/servicetimes`

Наследует GenericCrudController с CRUD-маршрутами `getById`, `post` и `delete`. Маршруты `getAll` и `search` являются пользовательскими реализациями.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех времён служений. Фильтр по `?serviceId=`. Добавьте `?include=groups` для включения данных о группах |
| GET | `/:id` | JWT | — | Получить время служения по ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Поиск времён служений по кампусу и служению |
| POST | `/` | JWT | Services.Edit | Создать или обновить время служений |
| DELETE | `/:id` | JWT | Services.Edit | Удалить время служения |

## Время служений для групп

Базовый путь: `/attendance/groupservicetimes`

Связывает группы с определёнными временами служений.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех связей группа-время служения. Фильтр по `?groupId=` для получения связей с названиями служений |
| GET | `/:id` | JWT | — | Получить связь группа-время служения по ID |
| POST | `/` | JWT | Services.Edit | Создать или обновить связи группа-время служения |
| DELETE | `/:id` | JWT | Services.Edit | Удалить связь группа-время служения |

## Записи посещаемости

Базовый путь: `/attendance/attendancerecords`

Предоставляет агрегированные представления данных посещаемости только для чтения, для отчётности и отображения.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Загрузить записи посещаемости для человека. Требуется `?personId=` |
| GET | `/tree` | JWT | — | Загрузить полное дерево посещаемости (кампусы, служения, времена служений, группы) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Загрузить данные о тенденциях посещаемости с необязательными фильтрами |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Загрузить посещаемость групп для служения за определённую неделю |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Поиск записей посещаемости с фильтрами (кампус, служение, время служения, группа, диапазон дат) |

### Пример: Тенденция посещаемости

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

## Сессии

Базовый путь: `/attendance/sessions`

Наследует GenericCrudController с CRUD-маршрутами `getById` и `delete`. Маршруты `getAll` и `save` являются пользовательскими реализациями, которые также позволяют лидерам групп управлять сессиями своих групп.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View или лидер группы | Список всех сессий. Фильтр по `?groupId=` (включает имена). Лидеры групп могут просматривать сессии своих групп |
| GET | `/:id` | JWT | Attendance.View | Получить сессию по ID |
| POST | `/` | JWT | Attendance.Edit или лидер группы | Создать или обновить сессии. Лидеры групп могут сохранять сессии своих групп |
| DELETE | `/:id` | JWT | Attendance.Edit | Удалить сессию |

## Визиты

Базовый путь: `/attendance/visits`

Управляет отдельными записями визитов (посещение человеком в определённую дату) и обеспечивает процесс регистрации.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Список всех визитов. Фильтр по `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Получить визит по ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View или Attendance.Checkin | Загрузить данные регистрации для людей на служении. Возвращает визиты с сессиями визитов от последней зарегистрированной даты |
| POST | `/` | JWT | Attendance.Edit | Создать или обновить визиты |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit или Attendance.Checkin | Отправить данные регистрации. Создаёт/обновляет визиты и сессии визитов, удаляет устаревшие записи |
| DELETE | `/:id` | JWT | Attendance.Edit | Удалить визит |

### Пример: Процесс регистрации

**Шаг 1 -- Загрузка существующих данных регистрации:**

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

**Шаг 2 -- Отправка регистрации:**

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

## Сессии визитов

Базовый путь: `/attendance/visitsessions`

Управляет связью между визитами и сессиями (какую именно сессию посетил человек во время визита). Также предоставляет эндпоинт быстрой записи и эндпоинт скачивания/экспорта.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View или лидер группы | Список сессий визитов. Фильтр по `?sessionId=`. Лидеры групп могут просматривать сессии визитов своих групп |
| GET | `/:id` | JWT | Attendance.View | Получить сессию визита по ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Скачать посещаемость сессии (возвращает имена людей со статусом присутствия/отсутствия) |
| POST | `/` | JWT | Attendance.Edit | Создать или обновить сессии визитов |
| POST | `/log` | JWT | Attendance.Edit или лидер группы | Быстрая запись посещаемости человека в сессию. Автоматически создаёт визит при необходимости. Лидеры групп могут записывать посещаемость своих групп |
| DELETE | `/:id` | JWT | Attendance.Edit | Удалить сессию визита по ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit или лидер группы | Удалить человека из сессии. Удаляет сессию визита и родительский визит, если не осталось сессий. Лидеры групп могут удалять посещаемость своих групп |

### Пример: Быстрая запись посещаемости

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

### Пример: Скачивание посещаемости сессии

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

## Связанные страницы

- [Эндпоинты Membership](./membership) — Люди, группы, роли и управление церковью
- [Аутентификация и разрешения](./authentication) — Процесс входа, JWT, модель разрешений
- [Структура модулей](../module-structure) — Паттерны организации кода
