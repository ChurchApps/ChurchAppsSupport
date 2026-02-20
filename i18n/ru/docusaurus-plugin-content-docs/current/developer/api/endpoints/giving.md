---
title: "Эндпоинты Giving"
---

# Эндпоинты Giving

<div class="article-intro">

Модуль Giving управляет пожертвованиями, фондами, обработкой платежей, подписками и связанными финансовыми операциями. Он поддерживает несколько платёжных шлюзов (Stripe, PayPal), обрабатывает разовые и периодические пожертвования, отслеживает пакеты пожертвований и обеспечивает обработку вебхуков для асинхронных платёжных событий.

</div>

**Базовый путь:** `/giving`

## Пожертвования

Базовый путь: `/giving/donations`

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View или собственный personId | Список всех пожертвований. Фильтр по `?batchId=` или `?personId=` |
| GET | `/:id` | JWT | Donations.View | Получить пожертвование по ID |
| GET | `/my` | JWT | — | Получить пожертвования текущего пользователя |
| GET | `/summary` | JWT | Donations.ViewSummary | Получить сводку пожертвований. Фильтр по `?startDate=&endDate=&type=`. Используйте `type=person` для разбивки по людям |
| GET | `/testEmail` | Public | — | Отправить тестовое письмо (разработка/отладка) |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пожертвования (пакетно) |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пожертвование |

### Пример: Список пожертвований по пакету

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Пример: Получение сводки пожертвований

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Пакеты пожертвований

Базовый путь: `/giving/donationbatches`

Наследует `GenericCrudController` с CRUD-маршрутами: `getById`, `getAll`, `post`, `delete`. Операция удаления также удаляет все пожертвования в пакете.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех пакетов пожертвований |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить пакет пожертвований по ID |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пакеты пожертвований |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пакет и все его пожертвования |

## Пожертвование

Базовый путь: `/giving/donate`

Обрабатывает публичный процесс пожертвования, включая списания, подписки, вебхуки и расчёт комиссий. Базовые CRUD-маршруты не активированы; все эндпоинты пользовательские.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Получить доступные платёжные шлюзы для церкви (только публичные ключи) |
| POST | `/client-token` | JWT | — | Сгенерировать клиентский токен для инициализации шлюза |
| POST | `/create-order` | JWT | — | Создать платёжный ордер (процесс оплаты в стиле PayPal) |
| POST | `/charge` | JWT | — | Обработать разовое списание пожертвования |
| POST | `/subscribe` | JWT | — | Создать подписку на периодическое пожертвование |
| POST | `/log` | Public | — | Записать пожертвование. Тело: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Получить событие вебхука платёжной системы (Stripe, PayPal). Требуется `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Повторить события Stripe за период. Тело: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Рассчитать комиссию транзакции. Тело: `{ type, provider, gatewayId, amount, currency }`. Требуется `?churchId=` |
| POST | `/captcha-verify` | Public | — | Проверить токен reCAPTCHA. Тело: `{ token }` |

### Пример: Обработка пожертвования

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Пример: Создание периодической подписки

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Фонды

Базовый путь: `/giving/funds`

Наследует `GenericCrudController` с CRUD-маршрутами: `getById`, `getAll`, `post`, `delete`. Разрешение `view` равно `null` (для просмотра фондов разрешение не требуется).

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех фондов |
| GET | `/:id` | JWT | — | Получить фонд по ID |
| GET | `/churchId/:churchId` | Public | — | Получить все фонды для конкретной церкви (публичный) |
| POST | `/` | JWT | Donations.Edit | Создать или обновить фонды |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд |

## Пожертвования в фонды

Базовый путь: `/giving/funddonations`

Отслеживает распределение отдельных пожертвований по фондам. Базовые CRUD-маршруты не активированы; все эндпоинты пользовательские.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Список пожертвований в фонды. Фильтр по `?donationId=`, `?personId=`, `?fundId=` или `?fundName=`. Необязательно `?startDate=&endDate=` для фильтрации по дате |
| GET | `/:id` | JWT | Donations.View | Получить пожертвование в фонд по ID |
| GET | `/my` | JWT | — | Получить пожертвования в фонды текущего пользователя |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пожертвования в фонды (пакетно) |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пожертвование в фонд |

## Шлюзы

Базовый путь: `/giving/gateways`

Управляет конфигурациями платёжных шлюзов (Stripe, PayPal и др.). Базовые CRUD-маршруты не активированы; все эндпоинты пользовательские. Секреты шлюзов шифруются при хранении.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех шлюзов церкви |
| GET | `/:id` | JWT | Settings.Edit | Получить шлюз по ID |
| GET | `/churchId/:churchId` | Public | — | Получить шлюзы для церкви (только публичные ключи) |
| GET | `/configured/:churchId` | Public | — | Проверить, настроен ли платёжный шлюз у церкви |
| POST | `/` | JWT | Settings.Edit | Создать или обновить шлюзы (шифрует ключи, настраивает вебхуки и продукты) |
| PATCH | `/:id` | JWT | Settings.Edit | Частично обновить шлюз |
| DELETE | `/:id` | JWT | Settings.Edit | Удалить шлюз (также удаляет его вебхуки) |

### Пример: Проверка конфигурации шлюза

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Клиенты

Базовый путь: `/giving/customers`

Наследует `GenericCrudController` с CRUD-маршрутами: `getAll`, `delete`. Связывает людей с их записями клиентов в платёжных шлюзах.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех клиентов |
| GET | `/:id` | JWT | Donations.ViewSummary или собственная запись | Получить клиента по ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary или собственная запись | Получить подписки шлюза для клиента |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить клиента |

## Подписки

Базовый путь: `/giving/subscriptions`

Управляет подписками на периодические пожертвования. Базовые CRUD-маршруты не активированы; все эндпоинты пользовательские.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех подписок |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить подписку по ID |
| POST | `/` | JWT | Donations.Edit или собственная подписка | Обновить подписки через платёжный шлюз |
| DELETE | `/:id` | JWT | Donations.Edit или собственная подписка | Отменить подписку и удалить из базы данных. Тело: `{ provider, reason }` |

## Фонды подписок

Базовый путь: `/giving/subscriptionfunds`

Отслеживает распределение по фондам для периодических подписок. Базовые CRUD-маршруты не активированы; все эндпоинты пользовательские.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View или собственная подписка | Список фондов подписок. Фильтр по `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить фонд подписки по ID |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд подписки |
| DELETE | `/subscription/:id` | JWT | Donations.Edit или собственная подписка | Удалить все фонды для подписки |

## Способы оплаты

Базовый путь: `/giving/paymentmethods`

Управляет сохранёнными способами оплаты (карты, банковские счета) через API платёжных шлюзов. Базовые CRUD-маршруты не активированы; все эндпоинты пользовательские.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View или собственный personId | Получить все сохранённые способы оплаты для человека (карты, банковские счета) |
| POST | `/addcard` | JWT | — | Привязать карточный способ оплаты. Тело: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit или собственный personId | Обновить данные карты. Тело: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit или собственный personId | Создать Stripe ACH SetupIntent для привязки банковского счёта. Тело: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Создать анонимный ACH SetupIntent для гостевых пожертвований. Тело: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit или собственный personId | Добавить банковский счёт через токен (устаревший; используйте `ach-setup-intent`). Тело: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit или собственный personId | Обновить данные банковского счёта. Тело: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit или собственный клиент | Подтвердить банковский счёт микроплатежами. Тело: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit или собственный клиент | Удалить способ оплаты (карту или банковский счёт) |

## Журнал событий

Базовый путь: `/giving/eventLog`

Наследует `GenericCrudController` с CRUD-маршрутами: `getById`, `getAll`, `post`, `delete`. Отслеживает события вебхуков платёжных шлюзов для аудита и дедупликации.

| Метод | Путь | Аутентификация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех записей журнала событий |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить запись журнала событий по ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Получить записи журнала событий с фильтром по типу |
| POST | `/` | JWT | Donations.Edit | Создать или обновить записи журнала событий |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить запись журнала событий |

## Связанные страницы

- [Эндпоинты Membership](./membership) — Люди, церкви, группы, роли и разрешения
- [Аутентификация и разрешения](./authentication) — Процесс входа, JWT, OAuth, модель разрешений
- [Структура модулей](../module-structure) — Паттерны организации кода
