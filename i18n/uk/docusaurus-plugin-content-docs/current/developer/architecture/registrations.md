---
title: "Реєстрація на події"
description: "Реєстрація на заходи в B1 Admin і B1App: типи учасників, платні доповнення, знижкові коди, оплата через шлюз пожертв і список очікування."
---

# Реєстрація на події

<div class="article-intro">

Вбудована реєстрація на події міститься в модулі контенту і, починаючи з хвилі платних реєстрацій, має повноцінну комерційну модель: типи учасників із цінами, платні додаткові опції, промокоди, оплата через наявний платіжний шлюз церкви та список очікування, що керується статусами. Шлях оплати навмисно повторно використовує стек пожертв: контролер реєстрації списує кошти через той самий абстрактний шар `GatewayService` / `IGatewayProvider`, описаний у розділі [Пожертви](./giving.md), тож у модулі контенту немає жодних даних платіжних карток і знань про SDK шлюзу. Ця сторінка описує модель даних, правила ціноутворення та місткості, а також потоки реєстрації, оплати та списку очікування.

</div>

## Огляд

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Три правила діють у всьому стеку:

1. **Сервер визначає ціну.** Клієнти надсилають ідентифікатори типів, ідентифікатори опцій і кількості; `RegistrationPricingHelper.computeTotal()` обчислює загальну суму на стороні сервера, а купони повторно перевіряються під час списання. Сума, передана клієнтом, ніколи не довіряється.
2. **Місткість перевіряється атомарно під час вставки.** Кожна вставка з обмеженою місткістю використовує оператор `INSERT … SELECT … FROM dual WHERE (кількість активних рядків) < місткість`, тож дві одночасні реєстрації не можуть обидві зайняти останнє місце. Кількість визначається за статусом (`pending`/`confirmed`) і ніколи не зберігається.
3. **Платежі йдуть тими самими каналами, що й пожертви.** `RegistrationController` викликає спільний `GatewayService.processCharge` з налаштованим для церкви шлюзом — та сама абстракція провайдера, та сама модель токенізації і та сама обробка SCA, що й для пожертв.

## Модель даних (`Api/src/modules/content`)

Моделі знаходяться в `models/Registration.ts`; відображення таблиць — у `db/DatabaseTypes.ts`; по одному репозиторію на таблицю — у `repositories/`.

| Таблиця | Призначення | Ключові поля |
|-------|---------|-----------|
| `registrations` | Одна реєстрація (одне домогосподарство/група для однієї події) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Один учасник реєстрації | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Типи учасників для кожної події (наприклад, Дорослий / Дитина) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Іменовані додаткові опції з ціною (наприклад, футболка) | eventId, name, description, **price**, **capacity**, **maxQuantity** (ліміт на реєстрацію), sort, active |
| `registrationSelectionChoices` | Кількість опції, обрана реєстрацією/учасником | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Один успішний платіж за реєстрацію | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Промокоди для кожної події | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Примітки:

- **Таблиці списку очікування немає.** Групи зі списку очікування — це рядки `registrations` зі `status = 'waitlisted'`; увесь життєвий цикл списку очікування — це переходи статусів в одній таблиці.
- **Лічильників не зберігається.** Кількості «продано» / «використано» (місткість події, місткість за типом, місткість за опцією, використання купонів) обчислюються корельованими підзапитами за рядками зі статусом у `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Тому скасування реєстрації звільняє місткість без додаткового обліку.
- Ціни — це колонки MySQL DECIMAL (у передачі вони є рядками), які перетворюються через `Number()` всередині помічника з ціноутворення.

## REST-інтерфейс

Усе розміщено під `/content/registrations` (`controllers/RegistrationController.ts`) і контролюється `Permissions.registrations` (`view` / `edit`):

| Маршрут | Доступ | Призначення |
|-------|--------|---------|
| `POST /register` | анонімно | Повне подання: гість, учасник або додавання учасника персоналом; ціноутворення на сервері, перевірки місткості, необов'язкове списання |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | публічно | Типи/опції з похідними значеннями `used` / `remainingCapacity` для майстра |
| `POST /types`, `DELETE /types/:id` (так само для `/selections`, `/coupons`) | `registrations.edit` | CRUD налаштувань для персоналу |
| `POST /coupons/validate` | публічно | Перевірка промокоду в процесі реєстрації |
| `GET /coupons/event/:eventId` | персонал | Купони з лічильниками використань |
| `GET /event/:eventId` · `GET /event/:eventId/count` | персонал · публічно | Список учасників; кількість активних для відображення місткості |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | автентифіковані | Мої реєстрації, деталі, історія платежів |
| `PUT /:id` | власник/персонал | Редагування після подання — замінює учасників і вибір опцій зі свіжими атомарними перевірками місткості, перераховує `totalAmount`; ніколи не списує і не повертає кошти автоматично |
| `POST /:id/pay` | власник | «Завершити оплату»: списує `totalAmount − amountPaid`, змінює `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | персонал | Ручне переведення зі списку очікування |
| `POST /:id/cancel` · `DELETE /:id` | власник · персонал | Скасування / видалення; обидві дії запускають автоматичне переведення зі списку очікування |

Існуюча незаскасована реєстрація для того самого `personId` на тій самій події відхиляється з кодом 409, а кожна створена реєстрація генерує вебхук `registration.created` через `WebhookDispatcher`.

## Ціни та промокоди

`helpers/RegistrationPricingHelper.ts` — єдиний авторитет для грошових розрахунків:

- `computeTotal()` підсумовує ціну типу кожного учасника плюс `ціна × кількість` для кожного вибору опції.
- `validateCoupon()` перевіряє ознаку активності, діапазон дат (`startDate`/`endDate`), `minMembers` відносно розміру поданої групи та `maxUses` відносно кількості використань, визначеної статусом.
- `applyDiscount()` — `percent` віднімає `total × value/100`; `amount` віднімає `value`; обидва варіанти не опускаються нижче нуля.

Майстер викликає `POST /coupons/validate` для миттєвого зворотного зв'язку, але `register` повторно перевіряє та застосовує купон на сервері — сума, що відображається в клієнті, має лише орієнтовний характер.

## Ідіома атомарної місткості

Кожна вставка з обмеженою місткістю безпечно обробляє конкуренцію без транзакцій і блокувань, роблячи перевірку місткості частиною самого `INSERT`. На рівні події (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Нульова кількість змінених рядків означає «місткість вичерпано». Та сама ідіома захищає вставки за типом (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, що рахує учасників, приєднаних до активних реєстрацій) та кількості за опцією (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, що використовує `COALESCE(SUM(quantity),0) + ? <= capacity`). Якщо будь-яка вставка учасника або опції не вдається посеред реєстрації, контролер відкочує часткову реєстрацію через `deleteCascade()` і повідомляє, який тип або опція розпродані.

## Потік оплати

`processRegistrationCharge` у контролері — єдине місце, де реєстрації торкаються грошей, і це тонкий клієнт стеку пожертв:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Токенізація відбувається в браузері так само, як і для пожертв (див. [Пожертви](./giving.md)) — майстер повторно використовує реєстр платіжних провайдерів apphelper, тож авторизовані учасники можуть платити збереженими картками, а гості токенізують нову картку. Контролер повторює особливості провайдерів з `DonateController` (ідентифікатори способу оплати `pm-{id}` для Kingdom Funding, відповіді Stripe SCA `requires_action`, які повертаються клієнту без запису платежу). Успішне списання створює рядок у `registrationPayments`, збільшує `amountPaid` і підтверджує реєстрацію. **Повернення коштів не реалізовано** — скасована оплачена реєстрація зберігає рядки платежів, а будь-яке повернення здійснюється окремо в панелі шлюзу.

Обидві точки входу проходять через один і той самий шлях коду: `register` (оплата під час реєстрації) і `pay` (оплата залишку / завершення очікування).

`register` пропускає списання у двох випадках і зберігає реєстрацію як `pending` з `amountPaid = 0`, залишаючи повну суму як заборгованість:

- **Додавання учасника персоналом.** Тіло містить `personId`, що не є ідентифікатором викликаючого, без `guestInfo`, і викликаючий має `registrations.edit` у цій церкві. Особа має існувати (інакше 404), фільтр учасників домогосподарства обходиться, і картка не списується.
- **Немає шлюзу.** У церкви немає шлюзу для пожертв (`hasGateway` перевіряє `gateway.loadAll`). Крок оплати в B1App показує **Зареєструватися і сплатити пізніше** замість форми картки.

Гості (без `au.id`) з платною реєстрацією повинні передати `captchaPass` з `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (тепер у `shared/helpers`) виконується безпосередньо перед списанням, тож реєстрації зі списку очікування та безкоштовні реєстрації не змінюються. Якщо `CAPTCHA_ENFORCE=true` і пропуск відсутній або недійсний, нова реєстрація відкочується через `deleteCascade()`, а виклик повертає 403. `RegistrationPaymentForm` у B1App показує гостям прапорець reCAPTCHA і надсилає пропуск разом зі збереженням картки та реєстрацією.

## Життєвий цикл списку очікування

Коли подія заповнена і прапорець `waitlistEnabled` події увімкнено, `register` зберігає групу як `waitlisted` (пропускаючи перевірки місткості) і надсилає звичайний лист-підтвердження з позначкою, що місце в списку очікування. Переведення відбувається трьома способами — `cancel`, `delete` і кінцева точка персоналу `promote` — і всі вони ведуть до `RegistrationRepo.promoteFromWaitlist`, який вибирає найстаріший рядок зі списку очікування і атомарно його змінює:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Умова `status='waitlisted'` не дає одночасним переведенням подвійно перевести один рядок, а підзапит місткості не дає переведенню перевищити ліміт. Переведені рядки отримують статус `pending`, а не `confirmed`, оскільки заборгованість ще може існувати. `RegistrationHelper.sendWaitlistAvailabilityEmail` повідомляє учаснику, що його місце звільнилося, і якщо `totalAmount − amountPaid > 0`, посилається на сторінку B1 церкви `/mobile/registrations` (Мої реєстрації), побудовану з `B1AppRoot` і піддомену церкви. Оплата (або відсутність заборгованості) підтверджує реєстрацію.

:::info
Саме по собі збільшення місткості не переводить учасників автоматично — персонал використовує дію «Перевести» у списку учасників після збільшення місткості. Скасування і видалення переводять автоматично.
:::

## Клієнтські поверхні

- **Майстер B1App** — один спільний хук, `B1App/src/components/registration/useEventRegistration.ts`, керує і компонентом на сайті (`components/registration/EventRegister.tsx`), і екраном мобільного порталу (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) через кроки `info → members → selections → questions → payment → confirm` (середні кроки відображаються лише тоді, коли в події є опції, прикріплена форма або ненульова сума). Кроки info/members показують вибір за типом учасника з поточною доступною місткістю та станами «розпродано»; оплата (`RegistrationPaymentForm.tsx`) показує підсумок замовлення, поле для промокоду і — для авторизованих учасників — збережені способи оплати через реєстр провайдерів apphelper, а гості токенізують нову картку. Мобільний екран **Реєстрації** (`screens/RegistrationsPage.tsx`) — це Мої реєстрації: статус, заборгованість, Завершити оплату (`POST /:id/pay`), Редагувати (`PUT /:id` — контакти, типи учасників, кількості опцій) і Скасувати.
- **Налаштування B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` додає перемикач Увімкнути список очікування та акордеони для Типів учасників, Опцій і Промокодів (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), усі з CRUD через маршрути `/types`, `/selections`, `/coupons`.
- **Список у B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: колонка Тип для кожного учасника, колонка Оплачено/Усього зі значком заборгованості, лічильники за типом, діалог деталей платежів (`RegistrationDetailDialog.tsx`, з `GET /payments/:registrationId`), дія рядка Перевести для списку очікування та експорт CSV, що містить типи учасників, опції, оплачено/усього/заборгованість і відповіді на запитання.

Міжмодульні пошуки (визначення або створення гостьової особи, завантаження церкви для листів) виконуються через `getMembershipModuleGateway()` — модуль контенту ніколи не читає таблиці членства безпосередньо.

## Пов'язані сторінки

- [Пожертви](./giving.md) — абстракція шлюзу, реєстр провайдерів і модель токенізації, які повторно використовує ця функція
- [Кінцеві точки контенту](../api/endpoints/content.md) — REST-інтерфейс модуля контенту
- [Вебхуки](../api/webhooks.md) — подія `registration.created`
- [Структура модуля](../api/module-structure.md) — як модуль контенту організовано на сервері
