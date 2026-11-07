---
title: "Subsplash"
description: "Підключіть пожертви, нових людей і відповіді форм Subsplash до B1 через Zapier, щоб внески й профілі автоматично потрапляли в B1 Admin."
---

# Subsplash

<div class="article-intro">

Якщо ви використовуєте Subsplash для застосунку вашої церкви, пожертв або форм, але хочете, щоб B1 був основною системою обліку людей і пожертв, Zapier-застосунок Subsplash може в реальному часі передавати пожертви, нові профілі та відповіді на форми до B1. Зауважте, що Zapier-застосунок Subsplash наразі підтримує **лише тригери**, тобто зв'язок односторонній (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Обліковий запис Subsplash з тарифним планом, який включає доступ до **API + Zapier** (уточніть у вашого менеджера з успішності клієнтів Subsplash, оскільки ця функція доступна лише на певних тарифах)
- Обліковий запис [Zapier](https://zapier.com)
- Користувач B1Admin з дозволом **Edit Settings**

</div>

## Що можна налаштувати

Усі тригери нижче належать Subsplash. Дії належать B1.

| Тригер Subsplash | Дія B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person, якщо особи немає) |
| New Pledge | Add Donation (з `notes` = "Обіцянка: …") |
| New Person Created | Create Person |
| Person Updated Profile | (немає прямої дії B1; запишіть у Google Sheet для ручного перегляду) |
| New Form Response | Create Person + (за бажанням) Add Group Member на основі форми |

Наразі Zapier-застосунок Subsplash підтримує лише напрямок Subsplash → B1.

## Налаштування

### 1. Створіть ключ API B1

У B1Admin перейдіть до **Settings → Developer → API Keys → New API Key**. Області доступу:

- `people:read` для пошуку донора за електронною адресою
- `people:write` для створення особи, якщо її ще немає
- `donations:write` для запису пожертви
- (`settings:write` не потрібен, оскільки тригер тут належить Subsplash, а не B1.)

### 2. Під'єднайте Subsplash до Zapier

Дотримуйтеся [інструкції з інтеграції Subsplash із Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash видає API-токен у панелі керування Subsplash, який Zapier використовує для автентифікації тригера.

### 3. Створіть Zap «record a donation»

1. **Trigger**: Subsplash: New Donation
2. **Action**: B1.church: Find Person (за електронною адресою)
3. **Filter / Path**: розгалуження за результатом «person found»:
   - **Found:** B1.church: Add Donation. Зіставте суму, дату, фонд, спосіб = "Online", а в notes вкажіть ідентифікатор транзакції Subsplash.
   - **Not found:** B1.church: Create Person → B1.church: Add Donation (з використанням ідентифікатора щойно створеної особи).

Увімкніть Zap. Нові пожертви з Subsplash з'являтимуться в **B1Admin → Donations** протягом кількох секунд.

## Типові рецепти

### Надсилайте подяку, коли надходить перша пожертва

- **Trigger**: Subsplash: New Donation
- **Action**: Filter by Zapier: продовжувати лише тоді, коли це перша пожертва донора (використовуйте *Lookup Table* за електронною адресою донора в Google Sheet зі списком попередніх донорів або крок Zapier *Paths* за датою створення донора)
- **Action**: Mailchimp / SMTP / SendGrid: надіслати повідомлення з подякою за першу пожертву
- **Action**: B1.church: Add Donation (як зазвичай)

### Відокремте обіцянки від звичайних пожертв

- **Trigger**: Subsplash: New Pledge
- **Action**: B1.church: Add Donation з `notes = "Обіцянка — Subsplash"` і фондом `Pledges` (окремим від операційного фонду), щоб ви могли звітувати про обіцянки окремо в **B1Admin → Donations → Summary**.

### Синхронізуйте нових користувачів застосунку як особи в B1

- **Trigger**: Subsplash: New Person Created
- **Action**: B1.church: Create Person, заповнивши ім'я, електронну адресу та телефон. Позначте особу в B1, додавши її до групи, наприклад «Subsplash App Users».

## Обмеження та примітки

- **Zapier-застосунок Subsplash підтримує лише тригери.** Якщо ви хочете, щоб зміни в B1 (наприклад, нова особа в B1) також потрапляли до Subsplash, потрібно створити цей міст з тригерів Zapier-застосунку B1, які викликають REST API Subsplash через власну дію *Webhooks by Zapier — POST*. Це користувацька інтеграція, а не готовий рецепт.
- **Доступ до API залежить від тарифу.** Якщо підключення Zapier завершується помилкою `403 Forbidden`, ваш тарифний план Subsplash, імовірно, не включає доступ до API. Зверніться до менеджера з успішності клієнтів.
- **Зіставлення фондів виконується вручну.** Subsplash передає назву кампанії або категорії, а B1 потребує числового ідентифікатора фонду. Або жорстко закодуйте фонд у Zap, або підтримуйте *Lookup Table* у Zapier, що зіставляє кампанії Subsplash із фондами B1.

## Усунення несправностей

- **Жоден тригер не спрацьовує після пожертви**: перевірте в панелі Zapier для Subsplash, що підключення все ще показує *Connected*. Якщо API-токен було змінено на боці Subsplash, Zap мовчки припиняє роботу; відновіть підключення.
- **Add Donation у B1 завершується з помилкою 422**: найчастіше відсутній або невідомий `fundId`. Перегляньте список фондів у **B1Admin → Donations → Funds** і скопіюйте точний ідентифікатор у крок Zap.
- **Перша пожертва запускає тригер двічі**: Subsplash іноді повторно надсилає тригер, якщо Zapier не отримав підтвердження. Додайте *Filter by Zapier* за ідентифікатором пожертви (Subsplash надсилає його в даних) щоб відкинути дублікати.

## Див. також

- [Donorbox](./donorbox.md): такий самий принцип рецептів, але інша платформа для пожертв
- [Zapier (огляд)](../zapier.md): сторона B1 для кожного рецепта Zapier
- [Інструкція з інтеграції Subsplash із Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (документація Subsplash)
