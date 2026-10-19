---
title: "Эндпоинты Giving"
---

# Эндпоинты Giving

<div class="article-intro">

Модуль Giving управляет пожертвованиями, фондами, обработкой платежей, подписками и связанными финансовыми операциями. Он поддерживает несколько платежных шлюзов (Stripe, PayPal), обрабатывает разовые и регулярные пожертвования, ведет учет пакетов пожертвований и обрабатывает webhook-события для асинхронных платежей.

</div>

**Базовый путь:** `/giving`

## Donations

Базовый путь: `/giving/donations`

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View или собственный personId | Список всех пожертвований. Фильтр по `?batchId=` или `?personId=`. При `?personId=` подарки в не облагаемые налогом фонды исключаются (как в выписках о пожертвованиях), если только вызывающий с Donations.View не добавит `&includeNonDeductible=1`, что делает карточка человека в B1Admin |
| GET | `/:id` | JWT | Donations.View | Получить пожертвование по ID |
| GET | `/my` | JWT | — | Получить пожертвования текущего пользователя |
| GET | `/my/summary?year=` | JWT | — | Общая сумма пожертвований текущего пользователя за год (по умолчанию текущий год): `{ year, total, count, currency, isConverted }`, суммы пересчитаны в валюту церкви. Используется в блоке пожертвований на главной странице участника |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Пожертвования за период (включительно). Обе даты обязательны в формате `YYYY-MM-DD`, иначе `400`. Страницы выписок о пожертвованиях в B1Admin запрашивают так один календарный год вместо всей истории церкви |
| GET | `/summary` | JWT | Donations.ViewSummary | Получить сводку пожертвований. Фильтр по `?startDate=&endDate=&type=`. Используйте `type=person` для разбивки по людям |
| GET | `/testEmail` | Public | — | Отправить тестовое письмо (для разработки и отладки) |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Создать или обновить пожертвования (пакетно). При наличии только Donations.Enter и целевой пакет, и (для обновления) текущий пакет пожертвования должны быть открыты; пожертвования, пришедшие через шлюз (с `transactionId`), изменить нельзя; иначе `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit или Donations.Enter | Удалить пожертвование. Только для Donations.Enter: пожертвование должно находиться в открытом пакете и не быть подарком через шлюз, иначе `403` |

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

### Пример: получить сводку пожертвований

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

## Donation Batches

Базовый путь: `/giving/donationbatches`

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Операция удаления также удаляет все пожертвования в пакете.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary или Donations.Enter | Список всех пакетов пожертвований |
| GET | `/:id` | JWT | Donations.ViewSummary или Donations.Enter | Получить пакет пожертвований по ID |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Создать или обновить пакеты пожертвований. Только для Donations.Enter: обновление существующего пакета требует, чтобы он был открыт, иначе `403 { "error": "This batch is closed." }`. Поле `status` здесь игнорируется, поэтому сохранение пакета не может его переоткрыть |
| POST | `/:id/close` | JWT | Donations.Edit | Закрыть пакет: устанавливает `status` в `closed`, `closedDate` в текущее время и `closedBy` в ID пользователя. Возвращает пакет |
| POST | `/:id/reopen` | JWT | Donations.Edit | Переоткрыть пакет: устанавливает `status` в `open` и очищает `closedDate` и `closedBy`. Возвращает пакет |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пакет и все его пожертвования |

Каждый пакет содержит `status` (`open` или `closed`; новые и уже существующие пакеты имеют статус `open`), `closedDate` и `closedBy`. Donations.Edit может изменять пожертвования в любом пакете; Donations.Enter (в редакторе ролей отображается как **Ввод пожертвований**) может добавлять, изменять или удалять пожертвования и распределения по фондам только тогда, когда их пакет открыт.

## Donate

Базовый путь: `/giving/donate`

Обрабатывает публичный поток пожертвований, включая списания, подписки, webhook-события и расчет комиссий. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Получить доступные платежные шлюзы для церкви (только публичные ключи) |
| POST | `/client-token` | JWT | — | Создать клиентский токен для инициализации шлюза |
| POST | `/create-order` | JWT | — | Создать платежный заказ (оформление в стиле PayPal) |
| POST | `/charge` | JWT | — | Обработать разовое списание пожертвования |
| POST | `/subscribe` | JWT | — | Создать подписку на регулярное пожертвование |
| POST | `/log` | Public | — | Записать пожертвование. Тело: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Принимать webhook-события платежей (Stripe, PayPal). Требуется `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Повторно обработать события Stripe за период. Тело: `{ startDate, endDate, dryRun }` |
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

## Funds

Базовый путь: `/giving/funds`

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Разрешение `view` равно `null` (для просмотра фондов право не требуется).

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех фондов |
| GET | `/:id` | JWT | — | Получить фонд по ID |
| GET | `/churchId/:churchId` | Public | — | Получить все фонды конкретной церкви (публично) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Получить сумму пожертвований фонда: `{ fundId, totalAmount, donationCount }`. Используется элементом `campaignProgress` конструктора сайтов |
| POST | `/` | JWT | Donations.Edit | Создать или обновить фонды |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд |

## Fund Donations

Базовый путь: `/giving/funddonations`

Отслеживает, как отдельные пожертвования распределяются по фондам. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Список распределений по фондам. Фильтр по `?donationId=`, `?personId=`, `?fundId=` или `?fundName=`. При необходимости добавьте `?startDate=&endDate=` для фильтрации по дате |
| GET | `/:id` | JWT | Donations.View | Получить распределение по фонду по ID |
| GET | `/my` | JWT | — | Получить распределения по фондам текущего пользователя |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Создать или обновить распределения по фондам (пакетно). Только для Donations.Enter: родительское пожертвование должно находиться в открытом пакете и не быть подарком через шлюз, иначе `403` |
| DELETE | `/:id` | JWT | Donations.Edit или Donations.Enter | Удалить распределение по фонду. Для Donations.Enter действует то же правило открытого пакета |

## Gateways

Базовый путь: `/giving/gateways`

Управляет конфигурациями платежных шлюзов (Stripe, PayPal и др.). Базовые маршруты CRUD не включены; все эндпоинты пользовательские. Секреты шлюзов шифруются при хранении.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех шлюзов церкви |
| GET | `/:id` | JWT | Settings.Edit | Получить шлюз по ID |
| GET | `/churchId/:churchId` | Public | — | Получить шлюзы церкви (только публичные ключи) |
| GET | `/configured/:churchId` | Public | — | Проверить, настроен ли у церкви платежный шлюз |
| POST | `/` | JWT | Settings.Edit | Создать или обновить шлюзы (шифрует ключи, настраивает webhook и продукты) |
| PATCH | `/:id` | JWT | Settings.Edit | Частично обновить шлюз |
| DELETE | `/:id` | JWT | Settings.Edit | Удалить шлюз (также удаляет его webhook) |

### Пример: проверка настройки шлюза

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Customers

Базовый путь: `/giving/customers`

Расширяет `GenericCrudController` маршрутами CRUD: `getAll`, `delete`. Связывает людей с их записями клиентов платежного шлюза.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех клиентов |
| GET | `/:id` | JWT | Donations.ViewSummary или собственная запись | Получить клиента по ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary или собственная запись | Получить подписки клиента в шлюзе |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить клиента |

## Subscriptions

Базовый путь: `/giving/subscriptions`

Управляет регулярными подписками на пожертвования. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех подписок |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить подписку по ID |
| POST | `/` | JWT | Donations.Edit или собственная подписка | Обновить подписки в платежном шлюзе |
| DELETE | `/:id` | JWT | Donations.Edit или собственная подписка | Отменить подписку и удалить её из базы данных. Тело: `{ provider, reason }` |

## Subscription Funds

Базовый путь: `/giving/subscriptionfunds`

Отслеживает распределение подписок по фондам. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View или собственная подписка | Список распределений подписок. Фильтр по `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить распределение подписки по ID |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить распределение подписки |
| DELETE | `/subscription/:id` | JWT | Donations.Edit или собственная подписка | Удалить все распределения для подписки |

## Payment Methods

Базовый путь: `/giving/paymentmethods`

Управляет сохраненными способами оплаты (карты, банковские счета) через API платежного шлюза. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View или собственный personId | Получить все сохраненные способы оплаты человека (карты, банковские счета) |
| POST | `/addcard` | JWT | — | Привязать карту как способ оплаты. Тело: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit или собственный personId | Обновить данные карты. Тело: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit или собственный personId | Создать Stripe ACH SetupIntent для привязки банковского счета. Тело: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Создать анонимный ACH SetupIntent для пожертвований гостей. Тело: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit или собственный personId | Добавить банковский счет по токену (устарело; используйте `ach-setup-intent`). Тело: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit или собственный personId | Обновить данные банковского счета. Тело: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit или собственный customer | Подтвердить банковский счет микроплатежами. Тело: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit или собственный customer | Удалить способ оплаты (карту или банковский счет) |

## Event Log

Базовый путь: `/giving/eventLog`

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Отслеживает webhook-события платежных шлюзов для аудита и устранения дубликатов.

| Метод | Путь | Авторизация | Разрешение | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех журналов событий |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить журнал событий по ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Получить журналы событий, отфильтрованные по типу события |
| POST | `/` | JWT | Donations.Edit | Создать или обновить журналы событий |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить журнал событий |

## Related Pages

- [Эндпоинты Membership](./membership) — люди, церкви, группы, роли и права
- [Аутентификация и разрешения](./authentication) — поток входа, JWT, OAuth, модель разрешений
- [Структура модуля](../module-structure) — паттерны организации кода
