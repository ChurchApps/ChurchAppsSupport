---
title: "Конечные точки пожертвований"
---

# Конечные точки пожертвований

<div class="article-intro">

Модуль пожертвований управляет пожертвованиями, фондами, обработкой платежей, подписками и связанными финансовыми операциями. Он поддерживает несколько платёжных шлюзов (Stripe, PayPal), обрабатывает одноразовые и повторяющиеся пожертвования, отслеживает пакеты пожертвований и обеспечивает обработку вебхуков для асинхронных событий платежей.

</div>

**Базовый путь:** `/giving`

## Пожертвования

Базовый путь: `/giving/donations`

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View или собственный personId | Список всех пожертвований. Фильтр по `?batchId=` или `?personId=` |
| GET | `/:id` | JWT | Donations.View | Получить пожертвование по ID |
| GET | `/my` | JWT | — | Получить пожертвования текущего пользователя |
| GET | `/summary` | JWT | Donations.ViewSummary | Получить резюме пожертвований. Фильтр по `?startDate=&endDate=&type=`. Используйте `type=person` для разбивки по людям |
| GET | `/testEmail` | Public | — | Отправить тестовое письмо (разработка/отладка) |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пожертвования (пакет) |
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

### Пример: получить резюме пожертвований

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

Расширяет `GenericCrudController` с маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Операция удаления также удаляет все пожертвования в пакете.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех пакетов пожертвований |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить пакет пожертвований по ID |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пакеты пожертвований |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пакет и все его пожертвования |

## Пожертвование

Базовый путь: `/giving/donate`

Обрабатывает поток пожертвований для общественности, включая платежи, подписки, вебхуки и расчёты сборов. Маршруты базового CRUD не включены; все конечные точки являются пользовательскими.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Получить доступные платёжные шлюзы для церкви (только открытые ключи) |
| POST | `/client-token` | JWT | — | Генерировать маркер клиента для инициализации шлюза |
| POST | `/create-order` | JWT | — | Создать заказ платежа (PayPal-стиль проверка) |
| POST | `/charge` | JWT | — | Обработать платёж одноразового пожертвования |
| POST | `/subscribe` | JWT | — | Создать подписку повторяющегося пожертвования |
| POST | `/log` | Public | — | Залогировать пожертвование. Тело: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Получить события платёжного вебхука (Stripe, PayPal). Требует `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Повторить события Stripe для диапазона дат. Тело: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Рассчитать сборы за транзакции. Тело: `{ type, provider, gatewayId, amount, currency }`. Требует `?churchId=` |
| POST | `/captcha-verify` | Public | — | Проверить маркер reCAPTCHA. Тело: `{ token }` |

### Пример: обработка платежа пожертвования

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

### Пример: создание повторяющейся подписки

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

Расширяет `GenericCrudController` с маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Разрешение `view` равно `null` (разрешение не требуется для просмотра фондов).

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех фондов |
| GET | `/:id` | JWT | — | Получить фонд по ID |
| GET | `/churchId/:churchId` | Public | — | Получить все фонды для конкретной церкви (открытый доступ) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Получить общую сумму пожертвований фонда: `{ fundId, totalAmount, donationCount }`. Питает элемент `campaignProgress` конструктора веб-сайта |
| POST | `/` | JWT | Donations.Edit | Создать или обновить фонды |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд |

## Пожертвования в фонды

Базовый путь: `/giving/funddonations`

Отслеживает, как отдельные пожертвования распределяются по фондам. Маршруты базового CRUD не включены; все конечные точки являются пользовательскими.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Список пожертвований в фонды. Фильтр по `?donationId=`, `?personId=`, `?fundId=` или `?fundName=`. Дополнительно добавьте `?startDate=&endDate=` для фильтрации по датам |
| GET | `/:id` | JWT | Donations.View | Получить пожертвование в фонд по ID |
| GET | `/my` | JWT | — | Получить пожертвования в фонды текущего пользователя |
| POST | `/` | JWT | Donations.Edit | Создать или обновить пожертвования в фонды (пакет) |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пожертвование в фонд |

## Шлюзы

Базовый путь: `/giving/gateways`

Управляет конфигурациями платёжных шлюзов (Stripe, PayPal и т. д.). Маршруты базового CRUD не включены; все конечные точки являются пользовательскими. Секреты шлюза зашифрованы в состоянии покоя.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех шлюзов для церкви |
| GET | `/:id` | JWT | Settings.Edit | Получить шлюз по ID |
| GET | `/churchId/:churchId` | Public | — | Получить шлюзы для церкви (только открытые ключи) |
| GET | `/configured/:churchId` | Public | — | Проверить, есть ли у церкви настроенный платёжный шлюз |
| POST | `/` | JWT | Settings.Edit | Создать или обновить шлюзы (зашифровать ключи, подготовить вебхуки и продукты) |
| PATCH | `/:id` | JWT | Settings.Edit | Частичное обновление шлюза |
| DELETE | `/:id` | JWT | Settings.Edit | Удалить шлюз (также удалить его вебхуки) |

### Пример: проверить конфигурацию шлюза

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

Расширяет `GenericCrudController` с маршрутами CRUD: `getAll`, `delete`. Связывает людей с их записями клиентов платёжного шлюза.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех клиентов |
| GET | `/:id` | JWT | Donations.ViewSummary или собственная запись | Получить клиента по ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary или собственная запись | Получить подписки шлюза для клиента |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить клиента |

## Подписки

Базовый путь: `/giving/subscriptions`

Управляет подписками повторяющихся пожертвований. Маршруты базового CRUD не включены; все конечные точки являются пользовательскими.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех подписок |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить подписку по ID |
| POST | `/` | JWT | Donations.Edit или собственная подписка | Обновить подписки с платёжным шлюзом |
| DELETE | `/:id` | JWT | Donations.Edit или собственная подписка | Отменить подписку и удалить из базы данных. Тело: `{ provider, reason }` |

## Фонды подписки

Базовый путь: `/giving/subscriptionfunds`

Отслеживает распределение фондов для повторяющихся подписок. Маршруты базового CRUD не включены; все конечные точки являются пользовательскими.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View или собственная подписка | Список фондов подписки. Фильтр по `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить фонд подписки по ID |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд подписки |
| DELETE | `/subscription/:id` | JWT | Donations.Edit или собственная подписка | Удалить все фонды для подписки |

## Методы платежей

Базовый путь: `/giving/paymentmethods`

Управляет сохранёнными методами платежей (карты, банковские счета) через API платёжных шлюзов. Маршруты базового CRUD не включены; все конечные точки являются пользовательскими.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View или собственный personId | Получить все сохранённые методы платежей для человека (карты, банковские счета) |
| POST | `/addcard` | JWT | — | Прикрепить метод платежа карты. Тело: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit или собственный personId | Обновить детали карты. Тело: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit или собственный personId | Создать Stripe ACH SetupIntent для связи банковского счёта. Тело: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Создать анонимный ACH SetupIntent для пожертвований гостей. Тело: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit или собственный personId | Добавить банковский счёт через маркер (устаревший; используйте `ach-setup-intent`). Тело: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit или собственный personId | Обновить детали банковского счёта. Тело: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit или собственный клиент | Проверить банковский счёт с микродепозитами. Тело: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit или собственный клиент | Удалить метод платежа (карта или банковский счёт) |

## Журнал событий

Базовый путь: `/giving/eventLog`

Расширяет `GenericCrudController` с маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Отслеживает события платёжного шлюза вебхука для аудита и дедупликации.

| Метод | Путь | Аут. | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех журналов событий |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить журнал событий по ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Получить журналы событий, отфильтрованные по типу события |
| POST | `/` | JWT | Donations.Edit | Создать или обновить журналы событий |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить журнал событий |

## Связанные страницы

- [Конечные точки членства](./membership) — люди, церкви, группы, роли и разрешения
- [Аутентификация и разрешения](./authentication) — поток входа, JWT, OAuth, модель разрешений
- [Структура модуля](../module-structure) — шаблоны организации кода
