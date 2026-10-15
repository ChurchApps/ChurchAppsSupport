---
title: "Эндпоинты Giving"
---

# Эндпоинты Giving

<div class="article-intro">

Модуль Giving управляет пожертвованиями, фондами, обработкой платежей, подписками и связанными финансовыми операциями. Он поддерживает несколько платежных шлюзов (Stripe, PayPal), обрабатывает разовые и регулярные пожертвования, отслеживает пакеты пожертвований и обеспечивает обработку вебхуков для асинхронных платежных событий.

</div>

**Базовый путь:** `/giving`

## Пожертвования

Базовый путь: `/giving/donations`

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.View или собственный personId | Список всех пожертвований. Фильтр по `?batchId=` или `?personId=`. С `?personId=` пожертвования в фонды без налогового вычета не включаются (как в выписках), если вызывающий с Donations.View не добавит `&includeNonDeductible=1` — это делает карточка человека в B1Admin |
| GET | `/:id` | JWT | Donations.View | Получить пожертвование по ID |
| GET | `/my` | JWT | — | Получить пожертвования текущего пользователя |
| GET | `/my/summary?year=` | JWT | — | Сумма пожертвований текущего пользователя за год (по умолчанию текущий): `{ year, total, count, currency, isConverted }`, суммы пересчитываются в валюту церкви. Используется для превью пожертвований на главной странице участника |
| GET | `/summary` | JWT | Donations.ViewSummary | Сводка пожертвований. Фильтр по `?startDate=&endDate=&type=`. Используйте `type=person` для разбивки по людям |
| GET | `/testEmail` | Public | — | Отправить тестовое письмо (для разработки и отладки) |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пожертвования (пакетно) |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пожертвование |

### Пример: список пожертвований по пакету

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

### Пример: сводка пожертвований

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

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Операция удаления также удаляет все пожертвования внутри пакета.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех пакетов пожертвований |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить пакет пожертвований по ID |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пакеты пожертвований |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пакет и все его пожертвования |

## Donate

Базовый путь: `/giving/donate`

Обрабатывает публичный поток пожертвований, включая списания, подписки, вебхуки и расчет комиссий. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Получить доступные платежные шлюзы церкви (только публичные ключи) |
| POST | `/client-token` | JWT | — | Сгенерировать клиентский токен для инициализации шлюза |
| POST | `/create-order` | JWT | — | Создать платежный заказ (оформление в стиле PayPal) |
| POST | `/charge` | JWT | — | Обработать разовое списание пожертвования |
| POST | `/subscribe` | JWT | — | Создать подписку на регулярное пожертвование |
| POST | `/log` | Public | — | Записать пожертвование. Тело: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Принять события вебхуков платежей (Stripe, PayPal). Требуется `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Повторно обработать события Stripe за диапазон дат. Тело: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Рассчитать комиссии за транзакцию. Тело: `{ type, provider, gatewayId, amount, currency }`. Требуется `?churchId=` |
| POST | `/captcha-verify` | Public | — | Проверить токен reCAPTCHA. Тело: `{ token }` |

### Пример: обработка разового пожертвования

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

### Пример: создание регулярной подписки

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

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Разрешение `view` равно `null` (для просмотра фондов разрешение не требуется).

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Список всех фондов |
| GET | `/:id` | JWT | — | Получить фонд по ID |
| GET | `/churchId/:churchId` | Public | — | Получить все фонды конкретной церкви (публично) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Получить сумму пожертвований фонда: `{ fundId, totalAmount, donationCount }`. Используется элементом `campaignProgress` конструктора сайта |
| POST | `/` | JWT | Donations.Edit | Создать или обновить фонды |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд |

## Пожертвования по фондам

Базовый путь: `/giving/funddonations`

Отслеживает, как отдельные пожертвования распределяются по фондам. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.View | Список пожертвований по фондам. Фильтр по `?donationId=`, `?personId=`, `?fundId=` или `?fundName=`. Можно добавить `?startDate=&endDate=` для фильтрации по дате |
| GET | `/:id` | JWT | Donations.View | Получить пожертвование по фонду по ID |
| GET | `/my` | JWT | — | Получить пожертвования по фондам текущего пользователя |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пожертвования по фондам (пакетно) |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пожертвование по фонду |

## Шлюзы

Базовый путь: `/giving/gateways`

Управляет конфигурациями платежных шлюзов (Stripe, PayPal и др.). Базовые маршруты CRUD не включены; все эндпоинты пользовательские. Секреты шлюзов шифруются при хранении.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Список всех шлюзов церкви |
| GET | `/:id` | JWT | Settings.Edit | Получить шлюз по ID |
| GET | `/churchId/:churchId` | Public | — | Получить шлюзы церкви (только публичные ключи) |
| GET | `/configured/:churchId` | Public | — | Проверить, настроен ли у церкви платежный шлюз |
| POST | `/` | JWT | Settings.Edit | Создать или обновить шлюзы (шифрует ключи, настраивает вебхуки и продукты) |
| PATCH | `/:id` | JWT | Settings.Edit | Частично обновить шлюз |
| DELETE | `/:id` | JWT | Settings.Edit | Удалить шлюз (также удаляет его вебхуки) |

### Пример: проверка настройки шлюза

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

Расширяет `GenericCrudController` маршрутами CRUD: `getAll`, `delete`. Связывает людей с их записями клиентов в платежном шлюзе.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех клиентов |
| GET | `/:id` | JWT | Donations.ViewSummary или собственная запись | Получить клиента по ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary или собственная запись | Получить подписки клиента в шлюзе |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить клиента |

## Подписки

Базовый путь: `/giving/subscriptions`

Управляет подписками на регулярные пожертвования. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех подписок |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить подписку по ID |
| POST | `/` | JWT | Donations.Edit или собственная подписка | Обновить подписки в платежном шлюзе |
| DELETE | `/:id` | JWT | Donations.Edit или собственная подписка | Отменить подписку и удалить из базы данных. Тело: `{ provider, reason }` |

## Фонды подписок

Базовый путь: `/giving/subscriptionfunds`

Отслеживает распределение фондов для регулярных подписок. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.View или собственная подписка | Список фондов подписок. Фильтр по `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить фонд подписки по ID |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд подписки |
| DELETE | `/subscription/:id` | JWT | Donations.Edit или собственная подписка | Удалить все фонды подписки |

## Способы оплаты

Базовый путь: `/giving/paymentmethods`

Управляет сохраненными способами оплаты (карты, банковские счета) через API платежных шлюзов. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View или собственный personId | Получить все сохраненные способы оплаты человека (карты, банковские счета) |
| POST | `/addcard` | JWT | — | Прикрепить карту как способ оплаты. Тело: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit или собственный personId | Обновить данные карты. Тело: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit или собственный personId | Создать Stripe ACH SetupIntent для привязки банковского счета. Тело: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Создать анонимный ACH SetupIntent для пожертвований гостей. Тело: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit или собственный personId | Добавить банковский счет через токен (устарело; используйте `ach-setup-intent`). Тело: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit или собственный personId | Обновить данные банковского счета. Тело: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit или собственный клиент | Подтвердить банковский счет микроплатежами. Тело: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit или собственный клиент | Удалить способ оплаты (карту или банковский счет) |

## Журнал событий

Базовый путь: `/giving/eventLog`

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Отслеживает события вебхуков платежного шлюза для аудита и дедупликации.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех журналов событий |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить журнал событий по ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Получить журналы событий по типу события |
| POST | `/` | JWT | Donations.Edit | Создать или обновить журналы событий |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить журнал событий |

## Связанные страницы

- [Эндпоинты Membership](./membership) — люди, церкви, группы, роли и разрешения
- [Аутентификация и разрешения](./authentication) — процесс входа, JWT, OAuth, модель разрешений
- [Структура модулей](../module-structure) — паттерны организации кода
