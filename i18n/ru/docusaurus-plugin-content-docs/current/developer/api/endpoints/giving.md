---
title: "Эндпоинты Giving"
description: "Справочник эндпоинтов Giving API ChurchApps: пожертвования, пакеты, шлюзы, подписки и способы оплаты, с правилами доступа для интеграций с B1 Admin."
---

# Эндпоинты Giving

<div class="article-intro">

Модуль Giving управляет пожертвованиями, фондами, обработкой платежей, подписками и связанными финансовыми операциями. Он поддерживает несколько платёжных шлюзов (Stripe, PayPal), обрабатывает разовые и регулярные пожертвования, ведёт учёт пакетов пожертвований и обрабатывает вебхуки для асинхронных платёжных событий.

</div>

**Базовый путь:** `/giving`

## Пожертвования

Базовый путь: `/giving/donations`

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View или собственный personId | Список всех пожертвований. Фильтры: `?batchId=` или `?personId=`. При `?personId=` подарки в фонды, не облагаемые налогом, не возвращаются (как и в выписках о пожертвованиях), если только вызывающий с правом Donations.View не добавит `&includeNonDeductible=1` — так делает запись человека в B1Admin |
| GET | `/:id` | JWT | Donations.View | Получить пожертвование по ID |
| GET | `/my` | JWT | — | Получить пожертвования текущего пользователя |
| GET | `/my/summary?year=` | JWT | — | Сумма пожертвований текущего пользователя за год (по умолчанию текущий год): `{ year, total, count, currency, isConverted }`, суммы пересчитаны в валюту церкви. Используется для превью пожертвований на домашней странице участника |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Пожертвования за период (включительно). Обе даты обязательны в формате `YYYY-MM-DD`, иначе `400`. Страницы выписок о пожертвованиях в B1Admin запрашивают так один календарный год вместо всей истории церкви |
| GET | `/summary` | JWT | Donations.ViewSummary | Сводка по пожертвованиям. Фильтры: `?startDate=&endDate=&type=`. Используйте `type=person` для разбивки по людям |
| GET | `/testEmail` | Public | — | Отправить тестовое письмо (разработка и отладка) |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Создать или обновить пожертвования (пакетно). Только с Donations.Enter: и целевой пакет, и (при обновлении) текущий пакет пожертвования должны быть открыты, а подарки от шлюза (с `transactionId`) изменить нельзя; иначе `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit или Donations.Enter | Удалить пожертвование. Только для Donations.Enter: пожертвование должно находиться в открытом пакете и не быть подарком от шлюза, иначе `403` |

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

### Пример: получение сводки по пожертвованиям

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

## Пакеты пожертвований {#donation-batches}

Базовый путь: `/giving/donationbatches`

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Операция удаления также удаляет все пожертвования внутри пакета.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary или Donations.Enter | Список всех пакетов пожертвований |
| GET | `/:id` | JWT | Donations.ViewSummary или Donations.Enter | Получить пакет пожертвований по ID |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Создать или обновить пакеты пожертвований. Только для Donations.Enter: обновление существующего пакета требует, чтобы он был открыт, иначе `403 { "error": "This batch is closed." }`. Поле `status` здесь игнорируется, поэтому сохранение пакета не может его открыть повторно |
| POST | `/:id/close` | JWT | Donations.Edit | Закрыть пакет: устанавливает `status` в `closed`, `closedDate` в текущее время и `closedBy` в ID вызывающего пользователя. Возвращает пакет |
| POST | `/:id/reopen` | JWT | Donations.Edit | Открыть пакет повторно: устанавливает `status` в `open` и очищает `closedDate` и `closedBy`. Возвращает пакет |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить пакет и все его пожертвования |

Каждый пакет содержит `status` (`open` или `closed`; новые и уже существующие пакеты имеют `open`), `closedDate` и `closedBy`. Donations.Edit может изменять пожертвования в любом пакете; Donations.Enter (в редакторе ролей отображается как **Enter Donations**) может только добавлять, изменять или удалять пожертвования и распределение по фондам, пока их пакет открыт.

## Пожертвование

Базовый путь: `/giving/donate`

Обрабатывает публичный поток пожертвований, включая списания, подписки, вебхуки и расчёт комиссий. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Получить доступные платёжные шлюзы церкви (только публичные ключи) |
| POST | `/client-token` | JWT | — | Сгенерировать клиентский токен для инициализации шлюза |
| POST | `/create-order` | JWT | — | Создать платёжный заказ (checkout в стиле PayPal) |
| POST | `/charge` | JWT | — | Провести списание разового пожертвования |
| POST | `/subscribe` | JWT | — | Создать подписку на регулярное пожертвование |
| POST | `/log` | Public | — | Записать пожертвование в журнал. Тело: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Принимать события платежей через вебхуки (Stripe, PayPal). Требуется `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Повторно обработать события Stripe за диапазон дат. Тело: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Рассчитать комиссии за транзакцию. Тело: `{ type, provider, gatewayId, amount, currency }`. Требуется `?churchId=` |
| POST | `/captcha-verify` | Public | — | Проверить токен reCAPTCHA. Тело: `{ token, churchId? }`. Ответ человека возвращает `{ response: "human", pass }`, где `pass` — подписанный пропуск гостевого пожертвования, действительный 10 минут (и только для `churchId`, если он передан) |

Если API запущен с `CAPTCHA_ENFORCE=true`, вызовы от гостей (не вошедших в систему) к `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` и `/giving/paymentmethods/ach-setup-intent-anon` (а также гостевой платный `POST /content/registrations/register`) должны включать `captchaPass` в тело запроса, иначе возвращается 403 `Captcha verification required`. Пропуск можно использовать повторно до истечения срока, поскольку гостевой поток Stripe делает два вызова (добавление карты, затем списание). На вызовы от вошедших пользователей это не влияет. По умолчанию `CAPTCHA_ENFORCE` равен `false`; формы гостевых пожертвований из `@churchapps/apphelper` отправляют пропуск автоматически.

### Пример: списание пожертвования

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

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Право `view` равно `null` (для просмотра фондов право не требуется).

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех фондов |
| GET | `/:id` | JWT | — | Получить фонд по ID |
| GET | `/churchId/:churchId` | Public | — | Получить все фонды конкретной церкви (публично) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Получить сумму пожертвований по фонду: `{ fundId, totalAmount, donationCount }`. Обслуживает элемент `campaignProgress` конструктора сайтов |
| POST | `/` | JWT | Donations.Edit | Создать или обновить фонды |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд |

## Распределение пожертвований по фондам

Базовый путь: `/giving/funddonations`

Отслеживает, как отдельные пожертвования распределяются по фондам. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Список распределений по фондам. Фильтры: `?donationId=`, `?personId=`, `?fundId=` или `?fundName=`. Дополнительно можно указать `?startDate=&endDate=` для фильтрации по дате |
| GET | `/:id` | JWT | Donations.View | Получить распределение по фонду по ID |
| GET | `/my` | JWT | — | Получить распределения по фондам текущего пользователя |
| POST | `/` | JWT | Donations.Edit или Donations.Enter | Создать или обновить распределения по фондам (пакетно). Только для Donations.Enter: родительское пожертвование должно находиться в открытом пакете и не быть подарком от шлюза, иначе `403` |
| DELETE | `/:id` | JWT | Donations.Edit или Donations.Enter | Удалить распределение по фонду. Для Donations.Enter действует то же правило открытого пакета |

## Шлюзы

Базовый путь: `/giving/gateways`

Управляет конфигурациями платёжных шлюзов (Stripe, PayPal и др.). Базовые маршруты CRUD не включены; все эндпоинты пользовательские. Секреты шлюзов хранятся в зашифрованном виде.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список всех шлюзов церкви |
| GET | `/:id` | JWT | Settings.Edit | Получить шлюз по ID |
| GET | `/churchId/:churchId` | Public | — | Получить шлюзы церкви (только публичные ключи) |
| GET | `/configured/:churchId` | Public | — | Проверить, настроен ли платёжный шлюз у церкви |
| POST | `/` | JWT | Settings.Edit | Создать или обновить шлюзы (шифрует ключи, создаёт вебхуки и продукты) |
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

Расширяет `GenericCrudController` маршрутами CRUD: `getAll`, `delete`. Связывает людей с записями клиентов в платёжном шлюзе.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех клиентов |
| GET | `/:id` | JWT | Donations.ViewSummary или собственная запись | Получить клиента по ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary или собственная запись | Получить подписки клиента в платёжном шлюзе |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить клиента |

## Подписки

Базовый путь: `/giving/subscriptions`

Управляет подписками на регулярные пожертвования. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех подписок |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить подписку по ID |
| POST | `/` | JWT | Donations.Edit или собственная подписка | Обновить подписки в платёжном шлюзе |
| DELETE | `/:id` | JWT | Donations.Edit или собственная подписка | Отменить подписку и удалить её из базы данных. Тело: `{ provider, reason }` |

## Фонды подписок

Базовый путь: `/giving/subscriptionfunds`

Отслеживает распределение по фондам для регулярных подписок. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View или собственная подписка | Список фондов подписок. Фильтр: `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить фонд подписки по ID |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить фонд подписки |
| DELETE | `/subscription/:id` | JWT | Donations.Edit или собственная подписка | Удалить все фонды подписки |

## Способы оплаты

Базовый путь: `/giving/paymentmethods`

Управляет сохранёнными способами оплаты (картами, банковскими счетами) через API платёжных шлюзов. Базовые маршруты CRUD не включены; все эндпоинты пользовательские.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View или собственный personId | Получить все сохранённые способы оплаты человека (карты, банковские счета) |
| POST | `/addcard` | JWT | — | Привязать карту как способ оплаты. Тело: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit или собственный personId | Обновить данные карты. Тело: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit или собственный personId | Создать Stripe ACH SetupIntent для привязки банковского счёта. Тело: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Создать анонимный ACH SetupIntent для гостевых пожертвований. Тело: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit или собственный personId | Добавить банковский счёт по токену (устарело; используйте `ach-setup-intent`). Тело: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit или собственный personId | Обновить данные банковского счёта. Тело: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit или собственный клиент | Подтвердить банковский счёт микроплатежами. Тело: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit или собственный клиент | Удалить способ оплаты (карту или банковский счёт) |

## Журнал событий

Базовый путь: `/giving/eventLog`

Расширяет `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Ведёт журнал событий вебхуков платёжных шлюзов для аудита и дедупликации.

| Метод | Путь | Auth | Права | Описание |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Список всех журналов событий |
| GET | `/:id` | JWT | Donations.ViewSummary | Получить запись журнала событий по ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Получить записи журнала по типу события |
| POST | `/` | JWT | Donations.Edit | Создать или обновить записи журнала событий |
| DELETE | `/:id` | JWT | Donations.Edit | Удалить запись журнала событий |

## Связанные страницы

- [Эндпоинты Membership](./membership.md) — люди, церкви, группы, роли и права
- [Аутентификация и права доступа](./authentication.md) — процесс входа, JWT, OAuth, модель прав
- [Структура модулей](../module-structure.md) — организация кода
