---
title: "Ендпоінти Giving"
description: "Довідка з ендпоінтів Giving API ChurchApps: пожертви, пакети, шлюзи, підписки та способи оплати, з правилами автентифікації й дозволів для розробників."
---

# Ендпоінти Giving

<div class="article-intro">

Модуль Giving керує пожертвами, фондами, обробкою платежів, підписками та пов'язаними фінансовими операціями. Він підтримує кілька платіжних шлюзів (Stripe, PayPal), обробляє разові та регулярні пожертви, веде облік пакетів пожертв і обробляє вебхуки для асинхронних подій платежів.

</div>

**Базовий шлях:** `/giving`

## Пожертви

Базовий шлях: `/giving/donations`

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View або власний personId | Отримати всі пожертви. Фільтрація за `?batchId=` або `?personId=`. З параметром `?personId=` подарунки на фонди, що не підлягають податковому відрахуванню, не включаються (як і у звітах про пожертви), якщо викликач із дозволом Donations.View не додає `&includeNonDeductible=1`, що робить запис особи в B1Admin |
| GET | `/:id` | JWT | Donations.View | Отримати пожертву за ID |
| GET | `/my` | JWT | — | Отримати пожертви поточного користувача |
| GET | `/my/summary?year=` | JWT | — | Загальна сума пожертв поточного користувача за рік (за замовчуванням поточний рік): `{ year, total, count, currency, isConverted }`. Суми конвертуються у валюту церкви. Забезпечує попередній перегляд пожертв на головній сторінці учасника |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Пожертви з датою в межах діапазону (включно). Обидві дати обов'язкові у форматі `YYYY-MM-DD`, інакше `400`. Сторінки звітів про пожертви в B1Admin запитують один календарний рік таким чином, а не всю історію церкви |
| GET | `/summary` | JWT | Donations.ViewSummary | Отримати зведення пожертв. Фільтрація за `?startDate=&endDate=&type=`. Використовуйте `type=person` для розбивки за особами |
| GET | `/testEmail` | Публічний | — | Надіслати тестовий лист (для розробки та налагодження) |
| POST | `/` | JWT | Donations.Edit або Donations.Enter | Створити або оновити пожертви (пакетно). Лише з Donations.Enter і цільовий пакет, і (для оновлення) поточний пакет пожертви мають бути відкритими, а подарунки через платіжний шлюз (ті, що мають `transactionId`) не можна змінювати; інакше `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit або Donations.Enter | Видалити пожертву. Лише з Donations.Enter: пожертва має бути у відкритому пакеті й не бути подарунком через платіжний шлюз, інакше `403` |

### Приклад: список пожертв за пакетом

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

### Приклад: отримання зведення пожертв

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

## Пакети пожертв

Базовий шлях: `/giving/donationbatches`

Розширює `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Операція видалення також видаляє всі пожертви в пакеті.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary або Donations.Enter | Отримати всі пакети пожертв |
| GET | `/:id` | JWT | Donations.ViewSummary або Donations.Enter | Отримати пакет пожертв за ID |
| POST | `/` | JWT | Donations.Edit або Donations.Enter | Створити або оновити пакети пожертв. Лише з Donations.Enter: оновлення наявного пакета вимагає, щоб він був відкритим, інакше `403 { "error": "This batch is closed." }`. Поле `status` тут ігнорується, тож збереження пакета не може його повторно відкрити |
| POST | `/:id/close` | JWT | Donations.Edit | Закрити пакет: встановлює `status` у `closed`, `closedDate` на поточний час, а `closedBy` на ID користувача, який виконав запит. Повертає пакет |
| POST | `/:id/reopen` | JWT | Donations.Edit | Повторно відкрити пакет: встановлює `status` у `open` і очищає `closedDate` та `closedBy`. Повертає пакет |
| DELETE | `/:id` | JWT | Donations.Edit | Видалити пакет і всі його пожертви |

Кожен пакет містить `status` (`open` або `closed`; нові та наявні пакети мають статус `open`), `closedDate` і `closedBy`. Donations.Edit може змінювати пожертви в будь-якому пакеті; Donations.Enter (у редакторі ролей позначено як **Enter Donations**) може лише додавати, змінювати або видаляти пожертви та розподіл за фондами, поки їхній пакет відкритий.

## Пожертвування

Базовий шлях: `/giving/donate`

Обробляє публічний процес пожертвування, включно зі списаннями, підписками, вебхуками та розрахунком комісій. Базові маршрути CRUD не увімкнено; усі ендпоінти є власними.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Публічний | — | Отримати доступні платіжні шлюзи для церкви (лише публічні ключі) |
| POST | `/client-token` | JWT | — | Згенерувати клієнтський токен для ініціалізації шлюзу |
| POST | `/create-order` | JWT | — | Створити платіжне замовлення (оформлення у стилі PayPal) |
| POST | `/charge` | JWT | — | Обробити разове списання пожертви |
| POST | `/subscribe` | JWT | — | Створити підписку на регулярні пожертви |
| POST | `/log` | Публічний | — | Зафіксувати пожертву. Тіло запиту: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Публічний | — | Отримувати вебхук-події платежів (Stripe, PayPal). Потребує `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Повторно відтворити події Stripe за діапазон дат. Тіло запиту: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Публічний | — | Розрахувати комісії за транзакції. Тіло запиту: `{ type, provider, gatewayId, amount, currency }`. Потребує `?churchId=` |
| POST | `/captcha-verify` | Публічний | — | Перевірити токен reCAPTCHA. Тіло запиту: `{ token, churchId? }`. Відповідь людини повертає `{ response: "human", pass }`, де `pass` — підписаний гостьовий пропуск для пожертв, дійсний 10 хвилин (і лише для `churchId`, якщо його надіслано) |

Коли Api працює з `CAPTCHA_ENFORCE=true`, гостьові (не авторизовані) виклики до `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` та `/giving/paymentmethods/ach-setup-intent-anon` (а також гостьові `POST /content/registrations/register` з цінами) мають містити `captchaPass` у тілі запиту, інакше вони повертають 403 `Captcha verification required`. Пропуск можна використовувати повторно до закінчення терміну дії, оскільки гостьовий процес Stripe робить два виклики (додавання картки, потім списання). На виклики авторизованих користувачів це не впливає. `CAPTCHA_ENFORCE` за замовчуванням має значення `false`; гостьові форми пожертв у `@churchapps/apphelper` автоматично надсилають пропуск.

### Приклад: обробка разового списання пожертви

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

### Приклад: створення регулярної підписки

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

## Фонди

Базовий шлях: `/giving/funds`

Розширює `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Дозвіл `view` має значення `null` (для перегляду фондів дозвіл не потрібен).

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Отримати всі фонди |
| GET | `/:id` | JWT | — | Отримати фонд за ID |
| GET | `/churchId/:churchId` | Публічний | — | Отримати всі фонди конкретної церкви (публічно) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Публічний | — | Отримати загальну суму пожертв фонду: `{ fundId, totalAmount, donationCount }`. Забезпечує елемент `campaignProgress` конструктора сайтів |
| POST | `/` | JWT | Donations.Edit | Створити або оновити фонди |
| DELETE | `/:id` | JWT | Donations.Edit | Видалити фонд |

## Пожертви за фондами

Базовий шлях: `/giving/funddonations`

Відстежує, як окремі пожертви розподіляються між фондами. Базові маршрути CRUD не увімкнено; усі ендпоінти є власними.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Отримати пожертви за фондами. Фільтрація за `?donationId=`, `?personId=`, `?fundId=` або `?fundName=`. За бажанням додайте `?startDate=&endDate=` для фільтрації за датою |
| GET | `/:id` | JWT | Donations.View | Отримати пожертву за фондом за ID |
| GET | `/my` | JWT | — | Отримати пожертви за фондами поточного користувача |
| POST | `/` | JWT | Donations.Edit або Donations.Enter | Створити або оновити пожертви за фондами (пакетно). Лише з Donations.Enter: батьківська пожертва має бути у відкритому пакеті й не бути подарунком через платіжний шлюз, інакше `403` |
| DELETE | `/:id` | JWT | Donations.Edit або Donations.Enter | Видалити пожертву за фондом. Для Donations.Enter діє те саме правило відкритого пакета |

## Шлюзи

Базовий шлях: `/giving/gateways`

Керує конфігураціями платіжних шлюзів (Stripe, PayPal тощо). Базові маршрути CRUD не увімкнено; усі ендпоінти є власними. Секрети шлюзів зберігаються в зашифрованому вигляді.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Отримати всі шлюзи церкви |
| GET | `/:id` | JWT | Settings.Edit | Отримати шлюз за ID |
| GET | `/churchId/:churchId` | Публічний | — | Отримати шлюзи церкви (лише публічні ключі) |
| GET | `/configured/:churchId` | Публічний | — | Перевірити, чи налаштовано у церкви платіжний шлюз |
| POST | `/` | JWT | Settings.Edit | Створити або оновити шлюзи (шифрує ключі, налаштовує вебхуки та продукти) |
| PATCH | `/:id` | JWT | Settings.Edit | Частково оновити шлюз |
| DELETE | `/:id` | JWT | Settings.Edit | Видалити шлюз (також видаляє його вебхуки) |

### Приклад: перевірка налаштування шлюзу

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Клієнти

Базовий шлях: `/giving/customers`

Розширює `GenericCrudController` маршрутами CRUD: `getAll`, `delete`. Пов'язує осіб з їхніми записами клієнтів у платіжному шлюзі.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Отримати всіх клієнтів |
| GET | `/:id` | JWT | Donations.ViewSummary або власний запис | Отримати клієнта за ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary або власний запис | Отримати підписки клієнта в шлюзі |
| DELETE | `/:id` | JWT | Donations.Edit | Видалити клієнта |

## Підписки

Базовий шлях: `/giving/subscriptions`

Керує підписками на регулярні пожертви. Базові маршрути CRUD не увімкнено; усі ендпоінти є власними.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Отримати всі підписки |
| GET | `/:id` | JWT | Donations.ViewSummary | Отримати підписку за ID |
| POST | `/` | JWT | Donations.Edit або власна підписка | Оновити підписки в платіжному шлюзі |
| DELETE | `/:id` | JWT | Donations.Edit або власна підписка | Скасувати підписку та видалити її з бази даних. Тіло запиту: `{ provider, reason }` |

## Фонди підписок

Базовий шлях: `/giving/subscriptionfunds`

Відстежує розподіл фондів для регулярних підписок. Базові маршрути CRUD не увімкнено; усі ендпоінти є власними.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View або власна підписка | Отримати фонди підписок. Фільтрація за `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Отримати фонд підписки за ID |
| DELETE | `/:id` | JWT | Donations.Edit | Видалити фонд підписки |
| DELETE | `/subscription/:id` | JWT | Donations.Edit або власна підписка | Видалити всі фонди для підписки |

## Способи оплати

Базовий шлях: `/giving/paymentmethods`

Керує збереженими способами оплати (картками, банківськими рахунками) через API платіжних шлюзів. Базові маршрути CRUD не увімкнено; усі ендпоінти є власними.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View або власний personId | Отримати всі збережені способи оплати особи (картки, банківські рахунки) |
| POST | `/addcard` | JWT | — | Прив'язати спосіб оплати карткою. Тіло запиту: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit або власний personId | Оновити дані картки. Тіло запиту: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit або власний personId | Створити Stripe ACH SetupIntent для прив'язки банківського рахунку. Тіло запиту: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Публічний | — | Створити анонімний ACH SetupIntent для гостьових пожертв. Тіло запиту: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit або власний personId | Додати банківський рахунок за токеном (застаріло; використовуйте `ach-setup-intent`). Тіло запиту: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit або власний personId | Оновити дані банківського рахунку. Тіло запиту: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit або власний клієнт | Перевірити банківський рахунок за допомогою мікроплатежів. Тіло запиту: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit або власний клієнт | Видалити спосіб оплати (картку або банківський рахунок) |

## Журнал подій

Базовий шлях: `/giving/eventLog`

Розширює `GenericCrudController` маршрутами CRUD: `getById`, `getAll`, `post`, `delete`. Веде облік вебхук-подій платіжного шлюзу для аудиту та усунення дублікатів.

| Метод | Шлях | Автентифікація | Дозвіл | Опис |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Отримати всі журнали подій |
| GET | `/:id` | JWT | Donations.ViewSummary | Отримати журнал подій за ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Отримати журнали подій, відфільтровані за типом події |
| POST | `/` | JWT | Donations.Edit | Створити або оновити журнали подій |
| DELETE | `/:id` | JWT | Donations.Edit | Видалити журнал подій |

## Пов'язані сторінки

- [Ендпоінти членства](./membership.md) — Особи, церкви, групи, ролі та дозволи
- [Автентифікація та дозволи](./authentication.md) — Процес входу, JWT, OAuth, модель дозволів
- [Структура модуля](../module-structure.md) — Шаблони організації коду
