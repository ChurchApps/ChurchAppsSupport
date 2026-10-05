---
title: "Endpoints обмена сообщениями"
---

# Endpoints обмена сообщениями

<div class="article-intro">

Модуль Messaging управляет беседами в реальном времени, сообщениями чата, push-уведомлениями, доставкой SMS/электронной почты, соединениями WebSocket, приватными сообщениями, регистрацией устройств и поставщиками текстовых сообщений. Он предоставляет уровень связи, используемый во всех приложениях ChurchApps для трансляции чата в реальном времени и асинхронных уведомлений.

</div>

**Базовый путь:** `/messaging`

## Conversations

Базовый путь: `/messaging/conversations`

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Загрузить беседы по ID через запятую с первыми/последними сообщениями |
| GET | `/messages/:contentType/:contentId` | JWT | — | Загрузить беседы для контента с разбивкой по страницам сообщений (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Получить беседы типа post для групп текущего пользователя |
| GET | `/posts/group/:groupId` | JWT | — | Получить беседы типа post для конкретной группы |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Получить или создать текущую беседу для контента (автоматическое расшифровка contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Загрузить беседы по типу контента и ID |
| GET | `/:churchId/:id` | Public | — | Загрузить одну беседу по ID |
| POST | `/` | JWT | — | Создать или обновить беседы (пакетно) |
| POST | `/start` | JWT | — | Начать новую беседу с начальным сообщением комментария |
| DELETE | `/:churchId/:id` | JWT | — | Удалить беседу |

### Контроль доступа к примечаниям человека

Беседы с `contentType: "person"` (вкладка Notes в записи человека) или `contentType: "personConfidential"` (раздел Confidential Notes) управляются на каждом пути чтения и записи, включая указанные выше в противном случае открытые маршруты, которые возвращают `401` для этих типов контента. `person` требует разрешение MembershipApi **People / Edit**; `personConfidential` требует **People / View Confidential Notes**. Для ограниченных API-ключей `people:write` выполняет оба действия (пользователь ключа должен по-прежнему иметь базовое разрешение роли).

### Пример: начать беседу

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Messages

Базовый путь: `/messaging/messages`

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Загрузить все сообщения для беседы |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Загрузить все сообщения для беседы (открытый catchup для live chat) |
| GET | `/:churchId/:id` | Public | — | Загрузить одно сообщение по ID |
| POST | `/` | JWT | — | Сохранить сообщения (пакетно). Отправляет обновления в реальном времени и запускает уведомления. Обновление существующего сообщения требует его автора или наличия `content.edit`; сохраненный автор никогда не переназначается |
| POST | `/send` | Public | — | Отправить сообщения (пакетно, публично). Отправляет обновления в реальном времени через WebSocket и запускает уведомления |
| POST | `/setCallout` | JWT | — | (legacy) Транслировать сообщение callout в реальном времени. Нет активного клиента; live stream chat больше не отображает callouts |
| DELETE | `/:churchId/:id` | JWT | — | Удалить сообщение и транслировать удаление в реальном времени. См. [Модерация сообщений](#message-moderation) |

### Модерация сообщений

Удаление сообщения разрешено для:

- автора сообщения;
- сотрудников с `content.edit` (в любом месте церкви);
- **лидеров группы**, для бесед с `contentType` группы или `groupAnnouncement` чья `contentId` это группа, которую они возглавляют (`leaderGroupIds` на JWT).

Беседы о примечаниях человека (`person` / `personConfidential`) никогда не модерируются лидерами — они используют разрешения примечаний (`people.edit`, `people.viewConfidentialNotes`) вместо этого.

Лидеры получают только удаление, не редактирование: переписывание сообщения другого члена остается ограниченным для автора и персонала `content.edit`.

### Пример: отправить сообщение

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Private Messages

Базовый путь: `/messaging/privatemessages`

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Загрузить все приватные сообщения для текущего пользователя (включает последнее сообщение на беседу, отмечает все как прочитанные) |
| GET | `/existing/:personId` | JWT | — | Найти существующую приватную беседу с конкретным человеком |
| GET | `/:id` | JWT | — | Загрузить приватное сообщение по ID (очищает уведомление, если адресовано текущему пользователю) |
| POST | `/` | JWT | — | Отправить приватные сообщения (пакетно). Запускает push-уведомление для получателя |

## Notifications

Базовый путь: `/messaging/notifications`

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Получить количество непрочитанных уведомлений для текущего пользователя |
| GET | `/my` | JWT | — | Загрузить все уведомления для текущего пользователя (отмечает все как прочитанные) |
| GET | `/tmpEmail` | Public | — | Запустить ежедневный дайджест email-уведомлений (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Загрузить уведомления для конкретного человека |
| GET | `/:churchId/:id` | JWT | — | Загрузить уведомление по ID |
| POST | `/` | JWT | — | Создать или обновить уведомления (пакетно) |
| POST | `/create` | JWT | — | Создать уведомления для нескольких человек. Тело: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Отметить все уведомления как прочитанные для человека |
| POST | `/sendTest` | JWT | — | Отправить тестовое push-уведомление. Тело: `{ personId, title }` |
| POST | `/ping` | Public | — | Создать уведомление из внешнего триггера. Тело: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Удалить уведомление |

### Пример: создать уведомления

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Notification Preferences

Базовый путь: `/messaging/notificationpreferences`

Расширяет стандартный CRUD. Базовый класс предоставляет POST `/` (создать или обновить, без разрешения).

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Создать или обновить предпочтения уведомлений (из базового класса CRUD) |
| GET | `/my` | JWT | — | Загрузить предпочтения уведомлений для текущего пользователя (автоматическое создание по умолчанию, если они не существуют) |

## Connections

Базовый путь: `/messaging/connections`

Управляет WebSocket/реальными соединениями для чата, групповых бесед, приватных сообщений и live streaming. См. [Real-time Architecture](../../realtime) для сквозного протокола.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Загрузить все соединения для беседы |
| POST | `/` | Public | — | Регистрировать соединения (пакетно). Запускает broadcast присутствия на беседу. Элементы тела: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Обновить отображаемое имя для соединения по socket ID. Тело: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Разорвать соединение из беседы. Запускает broadcast присутствия |
| POST | `/tmpSendAlert` | Public | — | Отправить оповещение уведомления на соединения человека. Тело: `{ churchId, personId }` |

## Devices

Базовый путь: `/messaging/devices`

Управляет регистрацией устройств для push-уведомлений и сопряжения контента (например, Lessons приложение на TV-дисплеях).

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Зарегистрировать или обновить устройство (мобильная push-регистрация). Сопоставляет по FCM-токену или ID устройства |
| POST | `/enrollAnon` | Public | — | Зарегистрировать анонимное устройство и сгенерировать 4-символьный код сопряжения |
| POST | `/` | Public | — | Сохранить устройства (пакетно) |
| GET | `/pair/:pairingCode` | JWT | — | Сопрячь устройство используя его код сопряжения. Опционально `?contentType=&contentId=` для назначения контента |
| GET | `/status/:deviceId` | Public | — | Проверить статус сопряжения устройства |
| GET | `/:churchId` | JWT | — | Загрузить все устройства для церкви |
| GET | `/:churchId/person/:personId` | JWT | — | Загрузить все устройства для человека |
| GET | `/:churchId/:id` | JWT | — | Загрузить устройство по ID |
| DELETE | `/:churchId/:id` | JWT | — | Удалить устройство |

### Пример: регистрация устройства

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Device Contents

Базовый путь: `/messaging/devicecontents`

Управляет назначениями контента для сопряженных устройств (например, какой урок отображается на TV).

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Загрузить назначения контента для устройства |
| POST | `/` | JWT | — | Сохранить назначения контента устройства (пакетно) |
| DELETE | `/:id` | JWT | — | Удалить назначение контента устройства |

## Texting

Базовый путь: `/messaging/texting`

Управляет поставщиками SMS текстовых сообщений, групповой отправкой текстовых сообщений и отслеживанием доставки.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Загрузить поставщиков текстовых сообщений для церкви (учетные данные замаскированы) |
| GET | `/preview/:groupId` | JWT | — | Предварительный просмотр получателей для группового текста (подходящие, отказанные, без номера телефона) |
| GET | `/sent` | JWT | — | Загрузить все отправленные записи текстовых сообщений для церкви |
| GET | `/sent/:id/details` | JWT | — | Загрузить отправленный текст с логами доставки для каждого получателя |
| POST | `/providers` | JWT | — | Сохранить поставщиков текстовых сообщений (пакетно). Шифрует учетные данные API |
| POST | `/send` | JWT | — | Отправить SMS всем подходящим членам группы. Тело: `{ groupId, message }`. Поля слияния (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) разрешаются для каждого получателя |
| POST | `/sendPerson` | JWT | — | Отправить SMS одному человеку. Тело: `{ personId, phoneNumber, message }`. Поля слияния разрешаются, и разрешенный текст это то, что получает залогировано |
| DELETE | `/providers/:id` | JWT | — | Удалить поставщика текстовых сообщений |

### Пример: отправить групповой текст

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Email Templates

Базовый путь: `/messaging/emailTemplates`

Управляет переиспользуемыми шаблонами email и отправкой шаблонных email-сообщений группам.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Загрузить все email-шаблоны для церкви |
| GET | `/:id` | JWT | — | Загрузить один email-шаблон по ID |
| GET | `/preview/:groupId` | JWT | — | Предварительный просмотр доставки email для группы (количество подходящих получателей, члены без email) |
| POST | `/` | JWT | — | Создать или обновить email-шаблоны (пакетно) |
| POST | `/send` | JWT | — | Отправить шаблонный email всем членам группы. Тело: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Удалить email-шаблон |

### Пример: отправить email группе

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Поддерживаемые поля слияния:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blocked IPs

Базовый путь: `/messaging/blockedips`

(legacy) IP-блокировка для live streaming чата. Клиент B1App больше не вызывает `POST /` — IP-блокировка была удалена при миграции unified-delivery. Маршрут `/clear` все еще вызывается server-to-server функцией `StreamingServiceController` когда услуги потокового вещания сохраняются.

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) Сохранить заблокированные IP (пакетно). Нет активного клиента |
| POST | `/clear` | JWT | — | Очистить все заблокированные IP для конкретных услуг. Тело: `[{ serviceId, churchId }]` |

## Delivery Logs

Базовый путь: `/messaging/deliverylogs`

Отслеживает статус доставки для отправленных сообщений (SMS, push-уведомления, email).

| Метод | Путь | Auth | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Загрузить логи доставки по типу контента и ID |
| GET | `/person/:personId` | JWT | — | Загрузить логи доставки для человека. Опционально `?startDate=&endDate=` фильтры |
| GET | `/recent` | JWT | — | Загрузить последние логи доставки для церкви. Опционально `?limit=` (по умолчанию 100) |
| GET | `/:id` | JWT | — | Загрузить лог доставки по ID |

## Связанные страницы

- [Real-time Architecture](../../realtime) — WebSocket протокол, подписки на комнаты и единая рамка доставки
- [Web Push Notifications](../../web-push) — Регистрация браузера push и доставка
- [Membership Endpoints](./membership) — люди, группы, роли и основная идентичность
- [Attendance Endpoints](./attendance) — отслеживание услуг и посещений
- [Authentication & Permissions](./authentication) — поток входа, JWT, OAuth, модель разрешений
- [Module Structure](../module-structure) — паттерны организации кода
