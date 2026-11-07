---
title: "Ендпоінти Membership"
description: "Довідка з ендпоінтів Membership API ChurchApps: люди, родини, групи, ролі, форми й налаштування, з правилами автентифікації та дозволів."
---

# Ендпоінти Membership

<div class="article-intro">

Модуль Membership керує людьми, церквами, групами, домогосподарствами, ролями, дозволами, формами та налаштуваннями. Це найбільший модуль, який забезпечує основний рівень ідентифікації та авторизації для всіх інших модулів.

</div>

**Базовий шлях:** `/membership`

## People

Базовий шлях: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or Member | Отримати список усіх людей церкви |
| GET | `/:id` | JWT | People.View or own record | Отримати особу за ID (включає відправлені форми) |
| GET | `/ids?ids=` | JWT | People.View, Member, or People.ViewNames | Отримати кількох людей за ID, розділеними комами. Викликачі з People.ViewNames без People.View отримують базову модель, при цьому люди, які відмовилися від відображення, виключаються (крім самого викликача) |
| GET | `/basic?ids=` | JWT | — | Отримати базову інформацію (лише ім'я) для кількох людей |
| GET | `/names?ids=` | JWT | Any church permission | `[{ id, name: { display, first, last }, photo }]`, відсортовано за прізвищем, потім за іменем, для ID через кому, які викликач уже має. Це дає змогу ролям без People.View (пожертви, відвідуваність) підписувати людей. Без пошуку та без фільтра каталогу |
| POST | `/names` | JWT | Any church permission | Те саме, що `GET /names`. Тіло: `{ peopleIds }` (або `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, or People.ViewNames | Нещодавно додані люди. Викликачі з People.ViewNames без People.View (навіть учасники з доступом до каталогу) отримують базову модель (`id`, `name.display`, `photo`, `membershipStatus`), при цьому люди, які відмовилися від відображення, виключаються |
| GET | `/guest-register/options?churchId=` | Public | — | Контрольний список реєстрації гостей через QR: повертає `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, кожне значення `"off"`, `"optional"` або `"required"` (розбирається з публічного налаштування `guestRegistrationFields`; відсутні або некоректні значення повертаються до: email/телефон необов'язкові, решта вимкнені). Потребує `enableQRGuestRegistration`, якщо запит не містить відповідний токен сайту/церкви; обмеження частоти (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, or People.ViewNames | Пошук людей за іменем або email (до 100, відсортовано за прізвищем, потім за іменем). Викликачі з People.ViewNames без People.View (навіть учасники з доступом до каталогу) отримують пошук за іменем, що повертає базову модель; пошук за `email` повертає `[]` |
| GET | `/search/phone?number=` | JWT | People.View or Member | Пошук за номером телефону |
| GET | `/search/group?groupId=` | JWT | People.View or Member | Отримати людей у конкретній групі |
| GET | `/household/:householdId` | JWT | — | Отримати всіх людей у домогосподарстві |
| GET | `/attendance` | JWT | People.Edit | Завантажити відвідувачів з фільтрами (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Завантажити дані хронології для людей і груп |
| GET | `/directory/:id` | JWT | — | Отримати особу для перегляду в каталозі (враховує налаштування видимості) |
| GET | `/claim/:churchId` | JWT | — | Прив'язати запис особи до поточного користувача в церкві |
| POST | `/` | JWT | People.Edit or EditSelf | Створити або оновити людей (пакетно) |
| POST | `/search` | JWT | People.View, Member, or People.ViewNames | Пошук людей (варіант POST). Тіло: `{ term }` або `{ email }`; ті самі правила для лише імен, що й у `GET /search` |
| POST | `/advancedSearch` | JWT | People.View or Member | Пошук за кількома умовами (вік, birthMonth, membershipStatus тощо). Тіло — це масив умов; порожнє тіло означає відсутність умов, а будь-яке інше тіло, що не є масивом, повертає 400 |
| POST | `/loadOrCreate` | Public | — | Знайти або створити особу за email. Тіло: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | Реєстрація гостей через QR. Тіло: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (від 1 до 10 учасників; email/phone/maritalStatus застосовуються лише до першого учасника). Поля, які церква вимкнула, відкидаються; відсутні обов'язкові або некоректні значення повертають 400. Спочатку використовуються наявні люди: учасник збігається, коли рівно одна не видалена особа має те саме ім'я (без урахування регістру) і той самий email або ті самі цифри телефону (домашній, робочий або мобільний); учасник без email або телефону збігається за іменем у межах збіглого домогосподарства. Збіглих людей ніколи не редагують. Незбіглі учасники приєднуються до збіглого домогосподарства, інакше створюється нове домогосподарство (назване за прізвищем першого учасника) зі статусом `membershipStatus: "Visitor"` і спільною `address`. Зберігає `comments` як нотатку для першого учасника, додає всіх до приватної групи `guestRegistrationGroupId`, якщо її задано, і — коли `guestRegistrationRecordAttendance` дорівнює `"true"` — фіксує відвідуваність для запланованих часів служб цієї групи, вікно реєстрації яких зараз відкрите. Повертає `{ householdId, people: [{ id, name }] }`, повторюючи надіслані імена, а не збережені. Ті самі правила opt-in/токена та обмеження частоти, що й для виклику options |
| POST | `/household/:householdId` | JWT | People.Edit | Оновити призначення учасників домогосподарства |
| POST | `/public/email` | Public | — | Надіслати email особі. Тіло: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Завантажити email людей за ID (сервер-сервер, потребує jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Видалити особу |

### Приклад: пошук людей

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Приклад: створення особи

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Users

Базовий шлях: `/membership/users`

Див. [Автентифікація та дозволи](./authentication.md) для ендпоінтів входу, реєстрації та керування паролем.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Вхід (email/пароль, оновлення JWT або authGuid) |
| POST | `/register` | Public | — | Зареєструвати нового користувача |
| POST | `/forgot` | Public | — | Надіслати email для скидання пароля |
| POST | `/setPasswordGuid` | Public | — | Установити пароль за auth GUID з посилання в email |
| POST | `/verifyCredentials` | Public | — | Перевірити email/пароль і повернути пов'язані церкви |
| POST | `/loadOrCreate` | JWT | — | Знайти або створити користувача за email/userId |
| POST | `/setDisplayName` | JWT | — | Оновити ім'я та прізвище користувача |
| POST | `/updateEmail` | JWT | — | Змінити email користувача |
| POST | `/updatePassword` | JWT | — | Змінити пароль користувача (мін. 6 символів) |
| POST | `/updateOptedOut` | JWT | — | Установити статус відмови від відображення для особи |
| POST | `/sendInviteEmail` | JWT | People.Edit | Надіслати запрошення особі в цій церкві (`email`, `personName`, `contextName`). Кнопка показує **Sign Up** для людини без облікового запису та **Log In** для наявного користувача. Користувач, який ніколи не входив, натомість отримує посилання **Set Your Password**, яке спливає через 7 днів. Це фіксований шаблон, тому не враховується в денному ліміті листів церкви |
| GET | `/search?term=` | JWT | Server.Admin | Пошук усіх користувачів за іменем/email |
| DELETE | `/` | JWT | — | Видалити обліковий запис поточного користувача |

## Churches

Базовий шлях: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Завантажити всі церкви поточного користувача |
| GET | `/:id` | JWT | — | Отримати церкву за ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Отримати користувача-адміністратора домену для церкви |
| GET | `/:id/impersonate` | JWT | Server.Admin | Імперсонувати церкву (лише адміністратор сервера) |
| GET | `/all?term=` | JWT | Server.Admin | Пошук усіх церков (адміністратор) |
| GET | `/search/?name=` | Public | — | Пошук церков за назвою |
| GET | `/lookup/?subDomain=&id=` | Public | — | Знайти церкву за піддоменом або ID |
| POST | `/` | JWT | Settings.Edit | Оновити дані церкви |
| POST | `/add` | JWT | — | Зареєструвати нову церкву. Обов'язкові поля: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Пошук церков за назвою (варіант POST) |
| POST | `/select` | JWT | — | Вибрати або перемкнутися на церкву. Тіло: `{ churchId }` або `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Архівувати або розархівувати церкву |
| POST | `/byIds` | Public | — | Завантажити кілька церков за ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Видалити церкви, неактивні 7+ днів |

## Groups

Базовий шлях: `/membership/groups`

Розширює стандартний CRUD (GET `/`, GET `/:id` з базового класу).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список усіх груп |
| GET | `/:id` | JWT | — | Отримати групу за ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Пошук груп за фільтрами служб |
| GET | `/my` | JWT | — | Отримати групи поточного користувача |
| GET | `/my/:tag` | JWT | — | Отримати групи поточного користувача, відфільтровані за тегом |
| GET | `/tag/:tag` | JWT | — | Отримати всі групи з конкретним тегом |
| GET | `/public/:churchId/:id` | Public | — | Отримати публічну групу за церквою та ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Отримати публічні групи за тегом |
| GET | `/public/:churchId/label?label=` | Public | — | Отримати публічні групи за міткою |
| GET | `/public/:churchId/slug/:slug` | Public | — | Отримати публічну групу за slug |
| POST | `/` | JWT | Groups.Edit | Створити або оновити групи (автоматично генерує slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Видалити групу (також видаляє дочірні команди для служильних груп) |

## Group Members

Базовий шлях: `/membership/groupmembers`

Розширює стандартний CRUD (GET `/:id`, DELETE `/:id` з базового класу).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Отримати учасника групи за ID |
| GET | `/` | JWT | GroupMembers.View* | Список учасників груп. Фільтр за `?groupId=`, `?groupIds=` або `?personId=`. *Також дозволено, якщо користувач є учасником групи або запитує власний personId, а також для `?groupId=` будь-якої неконфіденційної групи, якщо користувач має Attendance.View або Attendance.Edit (для них включаються учасники віком до 13 років) |
| GET | `/my` | JWT | — | Отримати членство в групах поточного користувача |
| GET | `/basic/:groupId` | JWT | — | Отримати базовий список учасників групи |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Отримати лідерів групи (публічно) |
| GET | `/public/:churchId/:groupId` | Public | — | Отримати публічний склад групи (мінімальні поля: `personId`, `displayName`, `leader`, photo). Лише якщо група вмикає `publicRoster` у налаштуваннях; забезпечує елемент `staffGrid` у конструкторі веб-сайтів |
| POST | `/` | JWT | GroupMembers.Edit | Додати або оновити учасників групи |
| DELETE | `/:id` | JWT | GroupMembers.View | Видалити учасника групи |

## Households

Базовий шлях: `/membership/households`

Стандартний CRUD-контролер.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список усіх домогосподарств |
| GET | `/:id` | JWT | — | Отримати домогосподарство за ID |
| POST | `/` | JWT | People.Edit | Створити або оновити домогосподарства |
| DELETE | `/:id` | JWT | People.Edit | Видалити домогосподарство |

## Roles

Базовий шлях: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Отримати роль за ID |
| GET | `/church/:churchId` | JWT | Roles.View | Отримати всі ролі церкви. Кожна роль містить `memberCount`, кількість різних користувачів у ній |
| POST | `/` | JWT | Roles.Edit | Створити або оновити ролі |
| DELETE | `/:id` | JWT | Roles.Edit | Видалити роль (також видаляє її дозволи та учасників) |

## Role Members

Базовий шлях: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Отримати учасників ролі. Додайте `?include=users`, щоб включити дані користувачів |
| POST | `/` | JWT | Roles.Edit | Додати учасників до ролі (створює користувача, якщо email не існує) |
| DELETE | `/:id` | JWT | Roles.View | Видалити учасника ролі |
| DELETE | `/self/:churchId/:userId` | JWT | — | Вийти з церкви |

## Role Permissions

Базовий шлях: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Отримати дозволи ролі (використовуйте `null` як ID для ролі "Everyone") |
| POST | `/` | JWT | Roles.Edit | Створити або оновити дозволи ролі |
| DELETE | `/:id` | JWT | Roles.Edit | Видалити дозвіл ролі |

## Permissions

Базовий шлях: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Отримати повний список доступних дозволів |

Кожен запис містить `apiName`, `section` (тип вмісту), `action` і мітки `displaySection` / `displayAction`, які показує редактор ролей B1Admin. Останні додавання: `MembershipApi` / `People` / `View Names` (**View People Names Only**, у розділі People and Groups) та `GivingApi` / `Donations` / `Enter` (**Enter Donations**, у розділі Donations; див. [Пакети пожертвувань](./giving.md#donation-batches)).

## Forms

Базовий шлях: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | Список усіх форм (адміністратор бачить усі; редактори бачать призначені та не-членські форми) |
| GET | `/:id` | JWT | Form access | Отримати форму за ID |
| GET | `/archived` | JWT | Forms.Admin or Forms.Edit | Список архівних форм |
| GET | `/group/:groupId` | JWT | Group member, group leader, or Forms.Admin | Окремі форми, пов'язані з групою (`forms.groupId`), без архівних, відсортовані за назвою. Повертає `id`, `name`, `description` і `open` (у межах вікна доступності). Учасники отримують лише відкриті форми; лідери та адміністратори форм також отримують закриті. Використовується для пов'язаних форм на сторінці групи |
| GET | `/standalone/:id?churchId=` | JWT | — | Отримати окрему форму (обмежені форми вимагають автентифікації) |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | Створити або оновити форми. Окремі форми приймають необов'язкові `photoUrl` (фото заголовка над формою) і `groupId` (пов'язана група) |
| DELETE | `/:id` | JWT | Form access | Видалити форму |

## Form Submissions

Базовий шлях: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | Список відправок. Фільтр за `?personId=` або `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Лише для себе: до 50 відправок окремих форм (не форм людей), які надіслав увійшовший учасник або які пов'язані з його особою (`contentType` `person`, `contentId` = ID його особи, наприклад, після зміни особи адміністратором), від найновіших до старіших, кожна з `form.name`. `include` додає питання кожної форми та відповіді у відправці. Повертає `401`, якщо користувач не пов'язаний з особою. Використовується для розділу **My Forms** на сторінці B1 Me |
| GET | `/group/:groupId` | JWT | Leader of the group | Відповіді для лідерів групи: один запис на кожну пов'язану форму та на кожну подію групи з формою реєстрації, кожен із `form`, `event` (`id`, `title`, `start`; лише для записів подій), `questions` і `submissions` (з `answers` і `personName`, `null` для анонімних) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, or view access | Отримати відправку за ID. Додайте `?include=form,questions,answers`. Лідери пов'язаної з формою групи та лідери групи, до якої належить реєстрація на подію, також можуть її читати |
| GET | `/formId/:formId` | JWT | Form access (view) | Отримати всі відправки форми (включає form, questions, answers). Лідери пов'язаної з формою групи мають доступ на перегляд |
| POST | `/` | JWT | — | Надіслати відповіді на форму (обробляє обмежені/необмежені форми, надсилає сповіщення email). Якщо форма має `autoCreatePerson`, знаходить або створює особу Guest за email і прив'язує відправку; якщо форма також має `groupId`, додає цю особу до групи; якщо задано `followUpSubject`/`followUpBody`, надсилає відправнику лист-підтвердження за шаблоном. Якщо викликач не може керувати формою, `submittedBy` завжди встановлюється як особа увійшовшого учасника (або залишається порожнім для анонімних відправок) |
| DELETE | `/:id` | JWT | Forms.Admin or Forms.Edit | Видалити відправку та її відповіді |

## Questions

Базовий шлях: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | Список питань для форми. Потрібен `?formId=` |
| GET | `/:id` | JWT | Form access | Отримати питання за ID |
| GET | `/unrestricted?formId=` | JWT | — | Отримати питання для необмеженої форми |
| GET | `/sort/:id/up` | JWT | — | Перемістити питання вгору в порядку сортування |
| GET | `/sort/:id/down` | JWT | — | Перемістити питання вниз у порядку сортування |
| POST | `/` | JWT | Form access | Створити або оновити питання (автоматично призначає порядок сортування) |
| DELETE | `/:id?formId=` | JWT | Form access | Видалити питання |

## Answers

Базовий шлях: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | Список відповідей. Фільтр за `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | Створити або оновити відповіді |

## Member Permissions

Базовий шлях: `/membership/memberpermissions`

Керує доступом окремих учасників до конкретних форм.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | Отримати дозвіл учасника за ID |
| GET | `/member/:id` | JWT | Form access | Отримати всі дозволи форм для учасника |
| GET | `/form/:id` | JWT | Form access | Отримати всі дозволи учасників для форми |
| GET | `/form/:id/my` | JWT | Form access | Отримати дозвіл поточного користувача для форми |
| POST | `/` | JWT | Form access | Створити або оновити дозволи учасників |
| DELETE | `/:id?formId=` | JWT | Form access | Видалити дозвіл учасника |
| DELETE | `/member/:id?formId=` | JWT | Form access | Видалити всі дозволи учасника для форми |

## Settings

Базовий шлях: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Отримати всі налаштування церкви |
| GET | `/public/:churchId` | Public | — | Отримати публічні налаштування церкви |
| POST | `/` | JWT | Settings.Edit | Зберегти налаштування (підтримує завантаження зображень у base64) |

## Domains

Базовий шлях: `/membership/domains`

Розширює стандартний CRUD (GET `/:id`, GET `/`, DELETE `/:id` з базового класу).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Список усіх доменів |
| GET | `/:id` | JWT | — | Отримати домен за ID |
| GET | `/lookup/:domainName` | JWT | — | Знайти домен за назвою |
| GET | `/public/lookup/:domainName` | Public | — | Публічний пошук домену за назвою |
| GET | `/health/check` | Public | — | Запустити перевірку стану для неперевірених доменів |
| POST | `/` | JWT | Settings.Edit | Створити або оновити домени (запускає оновлення Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Видалити домен |

## User Church

Базовий шлях: `/membership/userchurch`

Керує зв'язком між користувачами та церквами.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Отримати запис користувач-церква за ID користувача |
| GET | `/personid/:personId` | JWT | — | Отримати email пов'язаного користувача особи |
| GET | `/user/:userId` | JWT | Server.Admin | Завантажити всі церкви користувача |
| POST | `/` | JWT | — | Створити зв'язок користувач-церква |
| PATCH | `/:userId` | JWT | — | Оновити час останнього доступу та зафіксувати доступ |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Видалити запис користувач-церква |

## Visibility Preferences

Базовий шлях: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Отримати налаштування видимості поточного користувача |
| POST | `/` | JWT | — | Зберегти налаштування видимості (видимість адреси, телефону, email) |

## Query

Базовий шлях: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Пошук учасників природною мовою за допомогою ШІ. Тіло: `{ text, subDomain, siteUrl }` |

## Client Errors

Базовий шлях: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Зафіксувати помилку на стороні клієнта |

## Related Pages

- [Автентифікація та дозволи](./authentication.md) — Потік входу, JWT, OAuth, модель дозволів
- [Ендпоінти відвідуваності](./attendance.md) — Відстеження служб і відвідувань
- [Структура модулів](../module-structure.md) — Шаблони організації коду
