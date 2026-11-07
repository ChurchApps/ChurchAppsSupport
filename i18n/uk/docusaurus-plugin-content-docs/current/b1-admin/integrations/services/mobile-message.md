---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) — австралійський SMS API, популярний серед австралійських церков, адже пропонує місцеві номери та конкурентні тарифи для Австралії, на відміну від Clearstream і Text In Church, які орієнтовані на США. У Mobile Message поки немає офіційного застосунку для Zapier, але є публічний REST API, тож ви можете за кілька хвилин налаштувати відправлення текстових повідомлень із подій B1 через **Webhooks by Zapier** (або через модуль HTTP у Make).

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Обліковий запис [Mobile Message](https://mobilemessage.com.au) із зареєстрованим Sender ID та обліковими даними API (ім'я користувача та пароль API у розділі *Account → API Settings*)
- Обліковий запис [Zapier](https://zapier.com) (або [Make](https://www.make.com))
- Користувач B1Admin із дозволом **Edit Settings**

</div>

## Що можна налаштувати

API Mobile Message призначений для надсилання SMS: у ньому немає тригерів, лише вихідні повідомлення. Тому всі сценарії мають вигляд «B1 → SMS»:

| Напрямок | Тригер B1 | Результат |
|---|---|---|
| B1 → Mobile Message | `person.created` | Привітальне повідомлення новій людині |
| B1 → Mobile Message | `donation.created` | Повідомлення з подякою донору |
| B1 → Mobile Message | `form.submission.created` | Виклик команди чергових |
| B1 → Mobile Message | `event.created` | Нагадування, розіслане списку отримувачів |

## Налаштування

### 1. Створіть ключ API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — для реєстрації вебхука-тригера
- `people:read` — щоб за `personId` знайти номер телефону отримувача

### 2. Створіть Zap за допомогою Webhooks by Zapier

1. **Тригер** — B1.church: виберіть потрібну подію (наприклад, New Donation).
2. **Дія** — B1.church: Find Person (з використанням `data.personId`), щоб отримати номер телефону та ім'я.
3. **Дія** — Webhooks by Zapier: **POST**. Налаштуйте, як показано нижче.

Налаштування кроку POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier додає це автоматично)
- **Basic Auth** — у полі *Basic Auth* вкажіть `<api_username>|<api_password>` (Zapier перетворить це на правильний заголовок `Authorization: Basic …`)

Увімкніть Zap. Щоб перевірити, що повідомлення надходить, надішліть тестовий донат у B1Admin.

## Типові сценарії

### Нагадування про події зранку

- **Тригер** — Schedule by Zapier (щодня о 7:00)
- **Дія** — B1.church: Find Events на сьогодні (або крок Find із фіксованим фільтром за датою, або збережіть список сьогоднішніх подій у Google Sheets)
- **Дія** — Webhooks by Zapier: POST до Mobile Message зі списком подій для зареєстрованої групи передплатників

### Використання пакетного endpoint для розсилки списку

Endpoint `/v1/messages` у Mobile Message приймає до 10 000 повідомлень за один запит. Щоб розіслати повідомлення групі B1:

- **Тригер** — B1.church: New Form Submission (з фільтром для конкретної форми)
- **Дія** — B1.church: List Group Members для цільової групи (через крок *Webhooks by Zapier — GET* до `/membership/groupmembers?groupId=…`)
- **Дія** — Formatter by Zapier → Utilities → Line-itemize, щоб перетворити відповідь на масив `messages`
- **Дія** — Webhooks by Zapier: POST усього масиву до `/v1/messages`

### Альтернатива в Make

Якщо ви віддаєте перевагу Make, додайте модуль **HTTP — Make a request** після тригера B1 Watch Events і налаштуйте його так само (POST, Basic Auth, тіло JSON). Про частину B1 дивіться [огляд Make](../make).

## Обмеження та примітки

- **Basic Auth — єдиний спосіб автентифікації.** Mobile Message видає ім'я користувача та пароль на панелі керування. Обидва слід зберігати як секрети.
- **`sender` має бути зареєстрованим Sender ID** у вашому обліковому записі Mobile Message, інакше надсилання поверне `400 Invalid sender`. Австралійські правила вимагають реєстрації відправника.
- **Австралійські номери телефонів** можуть мати вигляд `0412345678` (місцевий) або `+61412345678` (міжнародний). API приймає обидва формати, але якщо ви також надсилаєте повідомлення за кордон, краще приводити номери до вигляду `+61…`.
- **До 10 000 повідомлень в одному запиті.** Це зручно для розсилок, але один виклик вебхука B1 рідко створює такий великий список, тому пакетний endpoint варто залишити для запланованих масових Zap.

## Усунення несправностей

- **POST повертає `401 Unauthorized`** — облікові дані Basic Auth неправильні. Скопіюйте їх ще раз з розділу *Account → API Settings* на панелі Mobile Message. Зверніть увагу: за замовчуванням ім'я користувача — це електронна адреса вашого облікового запису, а не окремий ключ API.
- **POST повертає `400 Invalid sender`** — значення `sender` не є зареєстрованим Sender ID у вашому обліковому записі. Спочатку зареєструйте його на панелі Mobile Message.
- **Текст приходить, але обрізаний** — Mobile Message ділить повідомлення довші за ~160 символів на кілька частин, і плата стягується за кожну частину. Перевірте тіло відповіді: там вказано кількість частин.

## Дивіться також

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — альтернативні SMS-провайдери з власними застосунками для Zapier (крок Webhooks by Zapier не потрібен)
- [Zapier (огляд)](../zapier) — частина B1 для кожного сценарію Zapier
- [Документація API Mobile Message](https://mobilemessage.com.au/api-documentation)
