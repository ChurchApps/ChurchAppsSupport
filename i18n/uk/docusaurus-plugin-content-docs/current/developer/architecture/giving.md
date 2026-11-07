---
title: "Архітектура пожертв"
description: "Посібник для розробників з пожертв ChurchApps: як B1 Admin і B1.church надсилають платежі через шлюзи Stripe, PayPal, Kingdom Funding або Paystack."
---

# Архітектура пожертв

<div class="article-intro">

ChurchApps проводить пожертви за моделлю «шлюз-канал»: церква має власний обліковий запис Stripe (або PayPal, Kingdom Funding чи Paystack), а B1 ніколи не є платіжним процесором у ланцюжку грошових операцій. Дані картки токенізуються в браузері й ніколи не потрапляють на сервери ChurchApps. Ця сторінка описує весь стек: клієнтський реєстр провайдерів у `@churchapps/apphelper`, абстракцію шлюзу GivingApi, модель даних пожертв і те, як вебхуки шлюзу узгоджуються з базою даних.

</div>

## Огляд

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Три принципи діють у всьому стеку:

1. **Картку тримає шлюз.** Кожен віджет введення провайдера токенізує дані в браузері. API отримує лише токен, nonce або ідентифікатор замовлення.
2. **Одна абстракція, багато провайдерів.** Браузер отримує `PaymentProvider` із реєстру, сервер отримує `IGatewayProvider` із фабрики. Обидва використовують одну й ту саму нормалізовану назву провайдера, яка зберігається в записі шлюзу.
3. **Вебхуки є джерелом істини для розрахунків.** Відповідь на списання фіксується оптимістично, але підписаний вебхук шлюзу підтверджує (або створює) завершену пожертву. Захист від повторної обробки діє з обох боків.

## Клієнтський бік: реєстр платіжних провайдерів (`@churchapps/apphelper`)

Реєстр розміщено в `Packages/apphelper/src/donations/providers/`. Віджети й допоміжні функції кожного провайдера містяться у власній підпапці (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Ніщо за межами `providers/` не розгалужується за назвою провайдера. `PaymentProvider` (див. `providers/types.ts`) об'єднує все, що потрібно хост-застосунку для одного шлюзу: `descriptor` (написи для адміністратора, підтримувані валюти, поля комісій, стандартні ставки комісій, посилання на панель керування та реєстрацію), набір прапорців `capabilities` (збережені картки, ACH, регулярні платежі, введення нової картки в інлайн-режимі, неявне збереження під час токенізації), React-віджети для введення даних учасником (`MemberWrapper`/`MemberEntry`), гостьові пожертви (`GuestForm`), редагування збереженого способу оплати (`MethodEditForm`) і платежі з полів форм (`FormPayment`), а також `buildChargeRequest(ctx, token)`, єдине місце, де структура корисного навантаження запиту на списання відрізняється для різних провайдерів. `MemberWrapper` кожного провайдера завантажує власний SDK за публічним ключем із запису шлюзу, тож хост-застосунки ніколи не імпортують SDK шлюзу (B1App і B1Admin не мають залежності від `@stripe/*`). `pickDefaultGateway(gateways, capability?)` централізує вибір шлюзу церкви для кожної поверхні інтерфейсу.

`providers/registry.ts` містить вбудованих провайдерів. Вони **передаються за значенням**, а не реєструються через побічний ефект модуля, тож tree-shaking збірника ніколи не зможе відкинути реєстрацію:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Функція | Призначення |
|----------|---------|
| `getPaymentProvider(name)` | Знаходить провайдера за нормалізованою назвою; як запасний варіант повертає Stripe, щоб неправильно налаштований провайдер ніколи не призводив до аварійного завершення форми донора |
| `registerPaymentProvider(p)` | Реєструє додаткового провайдера під час виконання (для власного шлюзу хост-застосунку) |
| `listPaymentProviders()` | Перелічує вбудованих і користувацьких провайдерів. Використовується для побудови випадаючого списку шлюзів в адмін-панелі |
| `hasPaymentProvider(name)` | Перевірка належності до реєстру |

**Вбудовані клієнтські провайдери: Stripe, PayPal, Kingdom Funding, Paystack.** B1App і B1Admin лише *читають* реєстр (`getPaymentProvider`, `listPaymentProviders`). Жоден із них не викликає `registerPaymentProvider`. Реєстрація залишається всередині apphelper.

Кожен провайдер токенізує дані по-своєму, але всі тримають картку поза межами B1:

| Провайдер | Віджет введення | Токен, що повертається до API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`. Гостьова форма також монтує `ExpressCheckoutElement` (Apple Pay / Google Pay для разових пожертв), чий `onConfirm` повертає той самий ідентифікатор `pm_…` | Ідентифікатор способу оплати (`pm_…`). Банківський рахунок через `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` для гейтвеїв у USD, канадський PAD `acss_debit` (модальне вікно з мандатом, мандат `default_for` для рахунків і підписок, разові списання передають ідентифікатор мандата) для гейтвеїв у CAD |
| Kingdom Funding | Розміщена форма токенізації, прив'язана до публічного ключа шлюзу | Одноразовий nonce |
| PayPal | PayPal Hosted Fields (картка, регулярні платежі) та PayPal Smart Buttons з фондуванням через Venmo (разові платежі). Обидва використовують одне завантаження SDK і серверне замовлення, створене через `/donate/client-token` + `/donate/create-order` | Ідентифікатор підтвердженого замовлення |
| Paystack | Спливаюче вікно Paystack Inline (`js.paystack.co/v2/inline.js`). Саме спливаюче вікно приймає платіж (картка, мобільні гроші, банківський переказ, USSD) | Ідентифікатор оплаченої транзакції. Збережені способи оплати є кодами авторизації Paystack `AUTH_…` |

Метод `finalizeResult` у Stripe виконує 3-D Secure / SCA у браузері (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), перш ніж пожертву вважати завершеною. Спільна форма просто викликає `provider.finalizeResult(result)` і не знає, що саме відбувається.

## Серверний бік: абстракція шлюзу (GivingApi)

Модуль `/giving` (`Api/src/modules/giving`) надає REST-інтерфейс, а логіка роботи зі шлюзами розміщена в `Api/src/shared/helpers`. `DonateController` ніколи не звертається до SDK шлюзу напряму. Він працює через `GatewayService`, який отримує потрібний `IGatewayProvider` із `GatewayFactory` і передає йому розшифрований `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) є контрактом, який реалізує кожен шлюз. Він охоплює життєвий цикл вебхуків (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), платежі (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), комісії (`calculateFees`), роботу зі збереженими способами оплати (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) і необов'язкові додаткові функції (клієнти, замовлення, SetupIntents, повторне відтворення подій, `retryFailedPayment` для невдалого рахунку за підписку, `registerPaymentMethodDomain` для підтвердження домену Apple Pay). Якщо провайдер не реалізує необов'язковий хук, дія для нього позначається як непідтримувана, а елемент керування в інтерфейсі приховується. Кожен клас провайдера оголошує власну матрицю `capabilities` (підтримувані валюти, ACH, повернення коштів, вимоги до підписок, ліміти транзакцій). `GatewayService.getProviderCapabilities(provider)` лише зчитує її. Прапорці на кшталт `logsDonationsImmediately` керують поведінкою контролерів без жодних умов за назвою провайдера в самих контролерах.

**Серверні провайдери, зареєстровані в `GatewayFactory`:**

| Провайдер | Доступність |
|----------|-------------|
| Stripe | Завжди увімкнено |
| PayPal | Завжди увімкнено |
| Kingdom Funding | Завжди увімкнено |
| Paystack | Завжди увімкнено (для торговців з Нігерії, Гани, Південної Африки, Кенії та Кот-д'Івуару; валюти NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Вмикається за бажанням через змінну середовища `ENABLE_SQUARE` |
| ePayMints | Вмикається за бажанням через змінну середовища `ENABLE_EPAYMINTS` |

Paystack відрізняється від інших тим, що гроші переходять до того, як залучається GivingApi. Спливаюче вікно списує кошти з донора, `processCharge` є викликом `GET /transaction/verify/:reference`, сплачена сума та валюта якого мають збігатися з пожертвою, що записується (посилання, яке вже є в системі, ніколи не реєструється двічі). Перша пожертва в межах регулярного графіка реєструється з `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` із `start_date` через один інтервал). Вебхуки підписуються самим секретним ключем (`x-paystack-signature`, HMAC-SHA512 від необробленого тіла запиту). Paystack не має API для керування вебхуками, тож на адмін-екрані показується URL, який церква має вставити в свою панель керування. Події `charge.success` для поновлень не містять розподілу за фондами. Провайдер відновлює його з локальних рядків `subscriptions`/`subscriptionFunds` донора. Лише авторизації карток є `reusable`. Платежі мобільними грошима є лише разовими, тому `createSubscription` їх відхиляє. Демонстраційні дані додають другу церкву (Accra Community Church, `CHU00000002`) з тестовим гейтвеєм Paystack у GHS, щоб набір Playwright для Paystack працював поруч із набором для Stripe від Grace.

Користувацькі провайдери можна реєструвати під час виконання, якщо встановлено `ENABLE_CUSTOM_GATEWAY_PROVIDERS`. Базовим класом для них є `AbstractExperimentalGatewayProvider`. Назви провайдерів порівнюються без урахування регістру.

### Налаштування шлюзу та секрети

Адміністратор зберігає облікові дані шлюзу через `POST /giving/gateways` (`GatewayController`). Під час збереження контролер шифрує приватний і вебхук-ключі за допомогою `EncryptionHelper` перед записом у базу. Потім, на будь-якому хості, відмінному від localhost, він видаляє наявний вебхук церкви й створює новий, що вказує на `/giving/donate/webhook/{provider}?churchId=…`. Церква зберігає один рядок на кожного провайдера: збереження шлюзу замінює лише наявний рядок для того самого провайдера. Публічні запити на читання (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) повертають лише публічні ключі.

## Модель даних

Схема giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, моделі в `models/`) є схемою MySQL, до якої звертаються через Kysely:

| Таблиця | Роль |
|-------|------|
| `gateways` | Конфігурація провайдера для церкви: `provider`, `publicKey`, зашифровані `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Призначення пожертв (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Групування для введення та звітності (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Одна пожертва: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; виписки, підсумки, панелі та звіти про пожертви враховують лише `complete` або null), `transactionId` |
| `fundDonations` | Розподіл пожертви між одним або кількома фондами (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Регулярна пожертва. `id` є ідентифікатором підписки в шлюзі, пов'язаним із `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Розподіл регулярної пожертви за фондами |
| `customers` | Пов'язує `personId` з ідентифікатором клієнта в шлюзі для кожного `provider` |
| `gatewayPaymentMethods` | Збережені картки та банківські рахунки: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Журнал аудиту вебхуків і подій, а також ключ для захисту від дублікатів (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Кампанії обіцянок, пов'язані з фондом, і обіцяна сума кожної людини |

Пожертву розподіляють між фондами через `fundDonations`. Пожертва містить загальну суму, а кожен `fundDonation` містить свою частку. `donations.currency` і `gateways.currency` зберігають код валюти ISO. Кожен провайдер оголошує свої `supportedCurrencies`, а суми форматуються за допомогою `CurrencyHelper.formatCurrencyWithLocale`.

## Наскрізні сценарії

### Разові та регулярні пожертви учасників (B1App)

Екран пожертв для автентифікованих користувачів (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) складається з трьох компонентів apphelper: `MultiGatewayDonationForm`, `PaymentMethods` і `RecurringDonations`. B1App виконує допоміжне завантаження даних: `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`. Він передає список шлюзів далі, а визначений провайдер сам завантажує SDK за публічним ключем шлюзу. Саме списання відбувається всередині apphelper. Визначений провайдер токенізує (нову або збережену) картку, а потім надсилає запит на `/giving/donate/charge` для разової пожертви або на `/giving/donate/subscribe` для регулярної. Обидві кінцеві точки прив'язують пожертву авторизованого донора до його власного `personId` (приписати пожертву іншій особі можуть лише користувачі з правом `donations.edit`) і відхиляють розподіли за фондами, сума яких перевищує списану суму. Регулярні пожертви створюють рядок `subscriptions` та `subscriptionFunds` і передають графік шлюзу (Stripe Subscriptions, PayPal Billing Plans або регулярний графік KF).

### Гостьові та анонімні пожертви

Публічна сторінка пожертв (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) і панель «пожертвувати зараз» відображають `NonAuthDonationWrapper` з `@churchapps/apphelper/website`. Він додає reCAPTCHA та контекст Elements шлюзу навколо `GuestForm` провайдера. Гості не входять в систему, не мають збережених способів оплати та історії. Процес отримує `GET /giving/funds/churchId/:id` і `GET /giving/donate/gateways/:churchId` (лише публічні ключі), перевіряє відвідувача через `POST /giving/donate/captcha-verify`, токенізує дані в браузері та надсилає запит на `/giving/donate/charge` (або `/subscribe`). Відповідь перевірки повертає `captchaPass`, підписаний HMAC і дійсний 10 хвилин (`Api/src/modules/giving/helpers/CaptchaPass.ts`). Форма надсилає його з кожним грошовим запитом гостя. Якщо встановлено `CAPTCHA_ENFORCE=true`, API відхиляє гостьові виклики `create-order`, `charge`, `subscribe`, `addcard` і `ach-setup-intent-anon` без дійсного пропуску для цієї церкви. Гостьові платні реєстрації на події (`POST /content/registrations/register`) перевіряють той самий пропуск безпосередньо перед списанням. Див. [Реєстрації на події](./registrations.md#payment-flow). Гостьові платежі через ACH використовують анонімний `POST /giving/paymentmethods/ach-setup-intent-anon`, який дозволяє лише миттєву перевірку (Financial Connections). Перевірка мікродепозитом завершується через кілька днів, коли сторінку гостя вже закрито, тож пожертва ніколи не завершилася б. Форма відмовляється списувати кошти за неперевіреним SetupIntent і пропонує донору картку або налаштування банку для авторизованого користувача.

Три опції гостьової форми використовують один і той самий запит на списання. `?fundId=` і `?amount=` в URL сторінки пожертв попередньо вибирають розподіл за фондами. Їх зчитує гостьова форма кожного провайдера під час монтування, і вони проходять через звичайний обробник зміни фонду, тож підсумки та комісії оновлюються. `anonymous: true` змушує `DonateController.charge` відкинути будь-яку особу, яку надіслав клієнт, і зареєструвати пожертву з `personId = null`. Гостьова форма пропускає `/people/loadOrCreate` і крок клієнта/сховища. Три провайдери з миттєвим журналюванням перестають визначати особу з клієнта шлюзу. Apple Pay потребує реєстрації домену сторінки в Stripe, тому гостьова форма Stripe один раз за сеанс надсилає запит на публічний `POST /giving/donate/register-domain` з обмеженням частоти. Він приймає лише домен, що належить церкві (`<subDomain>.b1.church`, рядок у таблиці доменів модуля контенту або локальний хост), і лише після цього викликає API доменів способів оплати Stripe.

### Адміністративний запис і імпорт зі Stripe (B1Admin)

Розділ пожертв B1Admin (`B1Admin/src/donations/`) є місцем роботи фінансових команд. Введення пакетів (`components/BulkDonationEntry.tsx`) записує готівкові, чекові та натуральні пожертви, надсилаючи `/giving/donations`, а потім `/giving/funddonations`. Шлюз тут не задіяний. Діалог **Зареєструвати пожертву** в картці особи (`components/LogGiftDialog.tsx`) робить те саме для однієї пожертви. Спочатку він шукає пакет, чия `batchDate` збігається з датою пожертви, або створює новий пакет з назвою цієї дати (`POST /giving/donationbatches`). Якщо на пізнішому кроці виникає помилка, пожертву та новий пакет видаляють. Фонди, пакети, кампанії та виписки відповідають своїм CRUD-маршрутам `/giving/*`. Сторінки виписок (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) запитують один календарний рік через `GET /donations?startDate=&endDate=` і `GET /fundDonations?startDate=&endDate=`, а не всю історію церкви, яка може перевищити ліміт розміру відповіді Lambda. Панель пожертв у стилі учасника (`B1Admin/src/donationComponents/`) повторно використовує ті самі компоненти apphelper, що й B1App.

Звітність і передача даreal для бухгалтерії виконуються на клієнті або засобом запуску звітів, а не через шлюз. Експорт батча в QuickBooks створює CSV із записами журналу з `donations` і `fundDonations` пакета (дебет Undeposited Funds, один кредит на кожен фонд). Сторінка Summary, розділ Lapsed Givers, запускає `Api/reports/lapsedGivers.json` через загальний засіб запуску звітів, а імена людей визначає `ReportOutput`. Формати квитанцій для країн (Канада, Австралія, Нова Зеландія) є налаштуваннями церкви в сховищі ключ-значення членства. Їх відображає `GivingStatementDocument`, а також дублює сторінка друку B1App. Сторінки друку виписок B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) передають налаштування `logoLight` церкви (через `usePrintLogo` у `B1Admin/src/components/PrintChurchHeader.tsx`), тож логотип друкується у верхній частині кожної виписки. Сторінки також чекають завантаження зображення перед автоматичним друком.

### Статус пакета та дозвіл «Введення пожертв»

Пакети можна закрити, щоб підрахована сума депозиту залишилася незмінною. `POST /giving/donationbatches/:id/close` і `/:id/reopen` (лише Donations.Edit) є єдиними способами змінити `status`, `closedDate` і `closedBy` (`DonationBatchRepo.setStatus`). Звичайне збереження пакета ніколи їх не змінює, тож проведення пакета не може його знову відкрити. Права на запис централізовано в `Api/src/modules/giving/helpers/BatchAccessHelper.ts`. Donations.Edit може змінювати все. Вужчий дозвіл Donations.Enter (`GivingApi` / `Donations` / `Enter`, «Enter Donations» у редакторі ролей) може створювати пакети, зберігати та видаляти пожертви і розподіли за фондами лише тоді, коли відкриті і поточний пакет пожертви, і цільовий пакет. Він ніколи не працює з пожертвою від шлюзу (з `transactionId`). Заблокований запис повертає `403 { error: "This batch is closed." }`. Читання пакетів доступне для Donations.ViewSummary або Donations.Enter, щоб касир міг вибрати пакет, до якого вносить дані. На клієнті `B1Admin/src/donations/batchAccess.ts` відображає ці правила (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`). `Header` і `SecondaryMenuHelper` показують **Пожертви > Пакети** всім, хто може бачити пакети, навіть без View Summary.

### Перерахунок сум у різних валютах

Будь-яка кінцева точка, яка повертає одну сумарну суму за пожертвами, можливо в різних валютах, конвертує її у стандартну валюту церкви на сервері, а не додає непорівнювані валюти разом. До таких точок належать KPI-картки підсумків пожертв (`GivingKpiCards`), загальна сума пакета, загальна сума фонду та суми за рік або період на екрані пожертв B1App. `Api/src/shared/helpers/ExchangeRateHelper.ts` отримує курси з `api.frankfurter.dev` за валютою церкви, кешує їх у пам'яті процесу на 12 годин і надає `convertTotals(rows, churchCurrency, rates)`. Рядки попередньо групуються за валютою в SQL (кілька груп, а не конвертація кожної пожертви). Кожну групу конвертують і підсумовують, а результат містить прапорець `isConverted`, за яким клієнт показує примітку «Конвертовано за поточними курсами обміну». `GET /donations/exchange-rates` надає таблицю курсів клієнтам, яким вона потрібна (екран пожертв B1App). Самі курси ніколи не приймаються із запиту, їх завжди отримують лише на сервері, тож клієнт не може вплинути на звітну суму. Окремі записи пожертв і звіти в початковій або оригінальній валюті ніколи не конвертуються. Конвертуються лише сумарні підсумки.

Імпорт зі Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) додає пожертви, зроблені поза B1. Він викликає `POST /giving/donate/replay-stripe-events` з `dryRun: true` для попереднього перегляду, а потім з `dryRun: false` для імпорту. Сервер перелічує події Stripe за вказаний період і пропускає все, що вже записано. Спочатку збіги шукаються за ідентифікатором провайдера в `eventLogs`, потім за ідентифікатором транзакції, а потім через `DonationRepo.findMatchingDonation` (сума, дата та особа). Тож повторний запуск ніколи не імпортує дублікати. Події `charge.succeeded` / `payment_intent.succeeded` для підписок пропускаються, оскільки ці пожертви записує `invoice.paid`. Новіші версії API Stripe прибирають `PaymentIntent.invoice`, тому пропуск також орієнтується на опис «Subscription …».

## Вебхуки та узгодження

Подію про завершений платіж і зміни стану підписки отримує `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Обробка навмисно ідемпотентна:

1. **Перевірка**: `GatewayService.verifyWebhook` делегує перевірку підпису провайдеру. Якщо підпис недійсний, повертається 401. Події, які не потребують обробки, завершуються з 200.
2. **Захист від дубліката події**: `EventLogRepo.loadByProviderId` пропускає вебхук, який уже є в `eventLogs`.
3. **Захист від дубліката пожертви**: перед створенням чого-небудь `DonationRepo.loadByTransactionId` перевіряється для кожного можливого ідентифікатора в корисному навантаженні. Це поглинає повторні доставки, багатоетапні події ACH (очікування → зараховано) і випадок, коли `/donate/charge` вже оптимістично записав пожертву.
4. **Застосування**: `classifyWebhookEvent(eventType)` провайдера визначає, що означає подія (`donation` у стані pending/complete, `cancel-subscription` або `ignore`). Завершені платежі створюють пожертву `complete` (або підвищують наявну `pending` чи `failed`). Події у стилі ACH потрапляють як `pending` до зарахування. Невдалий рахунок за підписку (`invoice.payment_failed` у Stripe) створює пожертву `failed` з ключем за ідентифікатором рахунку. Події скасування видаляють локальний рядок `subscriptions`. Контролер ніколи не перевіряє назви подій, специфічні для провайдера.

### Невдалі регулярні пожертви та нагадування про неоплату

Пожертва зі статусом `failed` є одиницею роботи для відновлення. `GET /giving/donations/failed` повертає їх разом з останнім повідомленням про помилку шлюзу з `eventLogs` і прапорцем `canRetry` із можливостей шлюзу. `POST /giving/donate/retry/:donationId` викликає `retryFailedPayment` провайдера (Stripe оплачує відкритий рахунок). Отриманий вебхук підвищує рядок до `complete` через звичайний шлях захисту від дублікатів. Листи з нагадуванням про неоплату надсилаються донору з обробника вебхука в день 0, а потім `DunningHelper.run` у опівнічному таймері (підключено в `lambda/timer-handler.ts` і `RailwayCron.ts`) на 3-й і 7-й день. Кожне надсилання записується в `eventLogs` як `provider: "dunning"`, `providerId: "<donationId>:<day>"`, тож повторний запуск ніколи не надішле лист двічі. Якщо Stripe відмовляється від спроб і скасовує підписку (`customer.subscription.deleted` з `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` надсилає донору один лист (`providerId: "<subscriptionId>:canceled"`). Скасування, ініційовані донором або адміністратором, залишаються без сповіщень. Stripe ніколи не додає події до наявної кінцевої точки. Після зміни `StripeHelper.webhookEvents` потрібно або знову зберегти шлюз, або запустити `tools/manual/stripe-webhook-events.ts` (за замовчуванням лише пробний запуск, `--apply` для запису) на продакшені.

Провайдери з `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) записують списання з відповіді `/charge` (для успішного сценарію не потрібен вебхук). Stripe покладається на `payment_intent.succeeded` / `invoice.paid` і ACH `payment_intent.processing`. Обробка комісій (`POST /giving/donate/fee`, прапорець шлюзу `payFees` і `calculateFees` кожного провайдера) обчислює збільшення суми «покрити комісії» на боці донора. B1 не бере платформну частку, тож ніколи не додається комісія застосунку.

:::info
Шлях списання та шлях вебхука записують ті самі рядки `donations` / `fundDonations`. `transactionId` є ключем з'єднання, який не дозволяє оптимістичному журналу списання та пізнішому вебхуку створити дві пожертви для однієї.
:::

## Пов'язані сторінки

- [Кінцеві точки пожертв](../api/endpoints/giving.md): повний REST-інтерфейс для пожертв, фондів, пакетів, шлюзів, підписок, способів оплати та вебхуків
- [AppHelper](../shared-libraries/app-helper.md): пакет npm, який містить реєстр платіжних провайдерів і компоненти пожертв
- [Структура модуля](../api/module-structure.md): як модуль GivingApi організовано на сервері
