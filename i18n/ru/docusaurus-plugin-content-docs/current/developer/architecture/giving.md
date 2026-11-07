---
title: "Архитектура пожертвований"
description: "Руководство по пожертвованиям ChurchApps: как B1 Admin и B1.church отправляют платежи через шлюзы Stripe, PayPal, Kingdom Funding и Paystack."
---

# Архитектура пожертвований

<div class="article-intro">

ChurchApps работает с пожертвованиями по модели «шлюзового рельса»: у церкви есть собственная учётная запись Stripe (или PayPal, Kingdom Funding либо Paystack), а B1 никогда не находится в платёжном потоке как платформенный процессор. Данные карты токенизируются в браузере и никогда не попадают на серверы ChurchApps. На этой странице описан весь стек: реестр клиентских провайдеров в `@churchapps/apphelper`, абстракция шлюзов GivingApi, модель данных пожертвований и то, как вебхуки шлюзов сверяются с базой данных.

</div>

## Обзор

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (браузер)  │                   │  Платёжный шлюз                       │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ ввод карты в      │  Stripe Elements · токенизатор KF ·   │
│  │ Реестр платёжных      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ провайдеров           │  │◀── токен / nonce ─│  (карта никогда не попадает на сервер B1) │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            списание / подписка│                │ подписанное
┌─────────────────────────────────────────────┐ (секретный ключ) │                │ событие вебхука
│  GivingApi — модуль /giving                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  сохранение donations + fundDonations — дедупликация через eventLogs / transactionId
                      ▼
                MySQL (схема giving)
```

Три принципа действуют во всём стеке:

1. **Карту держит шлюз.** Виджет ввода каждого провайдера токенизирует данные в браузере; API получает только токен, nonce или ID заказа.
2. **Одна абстракция, много провайдеров.** Браузер получает `PaymentProvider` из реестра; сервер получает `IGatewayProvider` из фабрики. Оба опираются на одно и то же нормализованное имя провайдера, которое хранится в записи шлюза.
3. **Вебхуки — источник истины для расчётов.** Ответ на списание записывается оптимистично, но подписанный вебхук шлюза подтверждает (или создаёт) завершённое пожертвование, и с обеих сторон действуют защиты от повторной обработки.

## Клиентская сторона: реестр платёжных провайдеров (`@churchapps/apphelper`)

Реестр находится в `Packages/apphelper/src/donations/providers/`, а виджеты и вспомогательные функции каждого провайдера — в собственном подкаталоге (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`); ничто за пределами `providers/` не ветвится по имени провайдера. `PaymentProvider` (см. `providers/types.ts`) объединяет всё, что нужно приложению-хосту для одного шлюза: `descriptor` (подписи для администратора, поддерживаемые валюты, поля комиссий, ставки комиссий по умолчанию, URL панели и регистрации), набор флагов `capabilities` (сохранённые карты, ACH, регулярные платежи, ввод новой карты на месте, неявное сохранение при токенизации), React-виджеты для ввода участником (`MemberWrapper`/`MemberEntry`), гостевого пожертвования (`GuestForm`), редактирования сохранённого способа оплаты (`MethodEditForm`) и платежей по вопросам формы (`FormPayment`), а также `buildChargeRequest(ctx, token)` — единственное место, где форма тела запроса списания отличается для каждого провайдера. `MemberWrapper` каждого провайдера загружает собственный SDK по публичному ключу из записи шлюза, поэтому приложения-хосты никогда не импортируют SDK шлюза (у B1App и B1Admin нет зависимости от `@stripe/*`). `pickDefaultGateway(gateways, capability?)` определяет, какой из шлюзов церкви должна использовать каждая поверхность.

`providers/registry.ts` содержит встроенные провайдеры. Они **передаются по значению**, а не регистрируются через побочный эффект модуля, поэтому tree-shaking сборщика никогда не сможет удалить регистрацию:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Функция | Назначение |
|----------|---------|
| `getPaymentProvider(name)` | Получить по нормализованному имени; при отсутствии возвращает Stripe, чтобы неправильно настроенный провайдер никогда не ломал форму донора |
| `registerPaymentProvider(p)` | Зарегистрировать дополнительный провайдер во время выполнения (для собственного шлюза приложения-хоста) |
| `listPaymentProviders()` | Перечислить встроенные и пользовательские провайдеры — используется для выпадающего списка шлюзов в администрировании |
| `hasPaymentProvider(name)` | Проверка наличия |

**Встроенные клиентские провайдеры: Stripe, PayPal, Kingdom Funding, Paystack.** B1App и B1Admin только *читают* реестр (`getPaymentProvider`, `listPaymentProviders`); ни один из них не вызывает `registerPaymentProvider` — регистрация остаётся внутри apphelper.

Каждый провайдер токенизирует по-своему, но все не дают карте попасть в B1:

| Провайдер | Виджет ввода | Токен, возвращаемый в API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; гостевая форма дополнительно монтирует `ExpressCheckoutElement` (Apple Pay / Google Pay, для разовых пожертвований), чей `onConfirm` возвращает тот же id `pm_…` | id способа оплаты (`pm_…`); банк — через `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` для шлюзов в USD, канадский PAD `acss_debit` (модальное окно мандата, мандат `default_for` для счетов и подписок; разовые списания передают id мандата) для шлюзов в CAD |
| Kingdom Funding | Размещённая форма токенизатора с ключом публичного шлюза | одноразовый nonce |
| PayPal | PayPal Hosted Fields (карта, регулярные платежи) плюс PayPal Smart Buttons с финансированием через Venmo (разовые); оба используют одну загрузку SDK и серверный заказ, созданный через `/donate/client-token` + `/donate/create-order` | id захваченного заказа |
| Paystack | Всплывающее окно Paystack Inline (`js.paystack.co/v2/inline.js`) — само окно принимает платёж (карта, мобильные деньги, банковский перевод, USSD) | ссылка на оплаченную транзакцию; сохранённые способы оплаты — коды авторизации Paystack `AUTH_…` |

`finalizeResult` у Stripe выполняет 3-D Secure / SCA в браузере (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) до того, как пожертвование считается завершённым; общая форма просто вызывает `provider.finalizeResult(result)` и не знает, что именно при этом происходит.

## Серверная сторона: абстракция шлюза (GivingApi)

Модуль `/giving` (`Api/src/modules/giving`) предоставляет REST-интерфейс; логика шлюзов находится в `Api/src/shared/helpers`. `DonateController` никогда не обращается к SDK шлюза напрямую — он идёт через `GatewayService`, который получает нужный `IGatewayProvider` из `GatewayFactory` и передаёт ему расшифрованный `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() расшифровывает privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) — это контракт, который реализует каждый шлюз: жизненный цикл вебхуков (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), платежи (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), комиссии (`calculateFees`), работа с сохранёнными способами оплаты (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) и необязательные дополнения (клиенты, заказы, SetupIntent, повторное воспроизведение событий, `retryFailedPayment` для неудачного счёта по подписке, `registerPaymentMethodDomain` для проверки домена Apple Pay). Провайдер, который не реализует необязательный хук, считается не поддерживающим это действие, и интерфейс скрывает соответствующий элемент управления. Каждый класс провайдера объявляет собственную матрицу `capabilities` (поддерживаемые валюты, ACH, возвраты, требования к подпискам, лимиты транзакций) — `GatewayService.getProviderCapabilities(provider)` просто её читает, а флаги вроде `logsDonationsImmediately` управляют поведением контроллеров без условий по имени провайдера в контроллерах.

**Серверные провайдеры, зарегистрированные в `GatewayFactory`:**

| Провайдер | Доступность |
|----------|-------------|
| Stripe | Всегда включён |
| PayPal | Всегда включён |
| Kingdom Funding | Всегда включён |
| Paystack | Всегда включён (продавцы в Нигерии, Гане, ЮАР, Кении, Кот-д'Ивуаре; валюты NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Включается по желанию переменной окружения `ENABLE_SQUARE` |
| ePayMints | Включается по желанию переменной окружения `ENABLE_EPAYMINTS` |

Paystack отличается от остальных тем, что деньги движутся до того, как в дело вступает GivingApi: всплывающее окно списывает деньги с донора, `processCharge` — это `GET /transaction/verify/:reference`, чья оплаченная сумма и валюта должны совпадать с пожертвованием, которое записывается (ссылка, уже находящаяся в учёте, никогда не записывается дважды), а первый платёж регулярного расписания записывается из `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` с `start_date` через один интервал). Вебхуки подписываются самим секретным ключом (`x-paystack-signature`, HMAC-SHA512 от необработанного тела), а у Paystack нет API управления вебхуками, поэтому административный экран показывает URL, который церковь вставляет в свою панель. События продления `charge.success` не содержат разбивки по фондам; провайдер восстанавливает её из локальных строк `subscriptions`/`subscriptionFunds` донора. Только авторизации карт пригодны для повторного использования — платежи мобильными деньгами только разовые, поэтому `createSubscription` их отклоняет. Демо-данные добавляют вторую церковь (Accra Community Church, `CHU00000002`) с тестовым шлюзом Paystack в GHS, чтобы набор Playwright для Paystack работал рядом с набором Stripe для Grace.

Пользовательские провайдеры можно регистрировать во время выполнения, если задана переменная `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; базовым классом для них служит `AbstractExperimentalGatewayProvider`. Имена провайдеров сопоставляются без учёта регистра.

### Настройка шлюза и секреты

Администратор сохраняет учётные данные шлюза через `POST /giving/gateways` (`GatewayController`). При сохранении контроллер шифрует приватный и вебхук-ключи через `EncryptionHelper` перед записью, а затем — на любом хосте, отличном от localhost, — удаляет существующий вебхук церкви и создаёт новый, направленный на `/giving/donate/webhook/{provider}?churchId=…`. Церковь хранит по одной строке на каждого провайдера: сохранение шлюза заменяет только существующую строку того же провайдера. Публичные чтения (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) возвращают только публичные ключи.

## Модель данных

Схема giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, модели в `models/`) — это схема MySQL, доступ к которой идёт через Kysely:

| Таблица | Назначение |
|-------|-------|
| `gateways` | Конфигурация провайдера для каждой церкви: `provider`, `publicKey`, зашифрованные `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Назначения пожертвований (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Группировка для ввода и отчётности (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Одно подношение: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; выписки, итоги, панели и отчёты о пожертвованиях учитывают только `complete` или null), `transactionId` |
| `fundDonations` | Распределение пожертвования по одному или нескольким фондам (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Регулярное пожертвование; `id` — это id подписки в шлюзе, связанный с `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Распределение регулярного пожертвования по фондам |
| `customers` | Связывает `personId` с id клиента в шлюзе для каждого `provider` |
| `gatewayPaymentMethods` | Сохранённые карты/банки: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Журнал аудита событий вебхуков и ключ дедупликации (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Кампании обещанных пожертвований, привязанные к фонду, и обещанная сумма каждого человека |

Пожертвование распределяется по фондам через `fundDonations` — в самом пожертвовании хранится общая сумма, а каждая `fundDonation` содержит свою долю. `donations.currency` и `gateways.currency` хранят код валюты ISO; каждый провайдер объявляет свои `supportedCurrencies`, а суммы форматируются через `CurrencyHelper.formatCurrencyWithLocale`.

## Сквозные сценарии

### Разовые и регулярные пожертвования участника (B1App)

Экран пожертвований для вошедшего пользователя (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) собирает три компонента apphelper: `MultiGatewayDonationForm`, `PaymentMethods` и `RecurringDonations`. B1App выполняет загрузку данных вокруг них — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — и передаёт список шлюзов дальше; выбранный провайдер загружает собственный SDK по публичному ключу шлюза. Само списание происходит внутри apphelper: выбранный провайдер токенизирует (новый или сохранённый) способ оплаты, затем отправляет запрос в `/giving/donate/charge` для разового пожертвования или в `/giving/donate/subscribe` для регулярного. Оба эндпоинта относят пожертвование вошедшего донора к его собственному `personId` (указать другого человека может только тот, у кого есть `donations.edit`) и отклоняют распределения по фондам, сумма которых превышает списанную. Регулярные пожертвования создают строку `subscriptions` плюс `subscriptionFunds` и передают расписание шлюзу (Stripe Subscriptions, PayPal Billing Plans или регулярное расписание KF).

### Гостевые и анонимные пожертвования

Публичная страница пожертвований (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) и панель «дать сейчас» выводят `NonAuthDonationWrapper` из `@churchapps/apphelper/website`, который подключает reCAPTCHA и контекст Elements шлюза вокруг `GuestForm` провайдера. Гости не входят в систему, у них нет сохранённых способов оплаты и истории. Процесс получает `GET /giving/funds/churchId/:id` и `GET /giving/donate/gateways/:churchId` (только публичные ключи), проверяет посетителя через `POST /giving/donate/captcha-verify`, токенизирует в браузере и отправляет запрос в `/giving/donate/charge` (или `/subscribe`). Вызов проверки возвращает `captchaPass` с HMAC-подписью на 10 минут (`Api/src/modules/giving/helpers/CaptchaPass.ts`), который форма отправляет с каждым денежным запросом гостя; при `CAPTCHA_ENFORCE=true` API отклоняет вызовы гостевых `create-order`, `charge`, `subscribe`, `addcard` и `ach-setup-intent-anon` без действительного пропуска для этой церкви. Гостевые платные регистрации на события (`POST /content/registrations/register`) проверяют тот же пропуск непосредственно перед списанием; см. [Регистрации на события](./registrations.md#payment-flow). Гостевой ACH использует анонимный `POST /giving/paymentmethods/ach-setup-intent-anon`, который допускает только мгновенную проверку (Financial Connections): проверка микроплатежами завершается через несколько дней, уже после того, как гостевая страница закрыта, поэтому пожертвование никогда не было бы завершено. Форма отказывается списывать деньги по непроверенному SetupIntent и предлагает донору оплату картой или настройку банка для вошедшего пользователя.

Три параметра гостевой формы передаются в том же запросе списания. `?fundId=` и `?amount=` в URL страницы пожертвований заранее выбирают распределение по фондам (читается формой каждого провайдера при монтировании и проходит через обычный обработчик изменения фонда, поэтому итоги и комиссии обновляются). `anonymous: true` заставляет `DonateController.charge` отбросить любого человека, которого прислал клиент, и записать пожертвование с `personId = null`; гостевая форма пропускает `/people/loadOrCreate` и шаг с клиентом/хранилищем, а три провайдера с немедленной записью перестают определять человека по клиенту шлюза. Apple Pay требует, чтобы домен страницы был зарегистрирован в Stripe, поэтому гостевая форма Stripe один раз за сеанс отправляет запрос на публичный, ограниченный по частоте `POST /giving/donate/register-domain`, который принимает только домен, принадлежащий церкви (`<subDomain>.b1.church`, строка в таблице доменов модуля content или локальный хост), прежде чем вызвать API доменов способов оплаты Stripe.

### Ввод администратором и импорт из Stripe (B1Admin)

Раздел пожертвований в B1Admin (`B1Admin/src/donations/`) — это место, где работают финансовые команды. Пакетный ввод (`components/BulkDonationEntry.tsx`) записывает наличные, чеки и натуральные подношения через `POST /giving/donations`, затем `/giving/funddonations` — без участия шлюза. Диалог **Log a gift** на странице человека (`components/LogGiftDialog.tsx`) делает то же самое для одного подношения: сначала ищет пакет, у которого `batchDate` совпадает с датой подношения, или создаёт пакет с этой датой в названии (`POST /giving/donationbatches`), а если более поздний шаг не удаётся — удаляет пожертвование и созданный пакет. Фонды, пакеты, кампании и выписки сопоставляются с CRUD-маршрутами `/giving/*`; страницы выписок (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) запрашивают один календарный год через `GET /donations?startDate=&endDate=` и `GET /fundDonations?startDate=&endDate=`, а не всю историю церкви, которая могла бы превысить лимит размера ответа Lambda. Панель пожертвований в стиле участника (`B1Admin/src/donationComponents/`) использует те же компоненты apphelper, что и B1App.

Отчётность и передача данных бухгалтерии выполняются на клиенте или через обработчик отчётов, а не через шлюз: экспорт пакета в QuickBooks на странице пакета строит CSV журнальной проводки из `donations` + `fundDonations` пакета (дебет Undeposited Funds, по одному кредиту на каждый фонд); представление Lapsed Givers на странице Summary запускает `Api/reports/lapsedGivers.json` через общий обработчик отчётов, а имена людей подставляются через `ReportOutput`; форматы квитанций для стран (Канада / Австралия / Новая Зеландия) — это настройки церкви в хранилище «ключ — значение» модуля membership, которые выводит `GivingStatementDocument` и которые дублируются на странице печати в B1App. Страницы печати выписок в B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) передают настройку `logoLight` церкви (через `usePrintLogo` в `B1Admin/src/components/PrintChurchHeader.tsx`), так что логотип печатается вверху каждой выписки, и ждут загрузки изображения перед автоматической печатью.

### Статус пакета и право Enter Donations

Пакеты можно закрывать, чтобы сверенный депозит оставался неизменным. `POST /giving/donationbatches/:id/close` и `/:id/reopen` (только Donations.Edit) — единственные записи `status`, `closedDate` и `closedBy` (`DonationBatchRepo.setStatus`); обычное сохранение пакета эти поля не трогает, поэтому отправка пакета не может его открыть. Доступ на запись централизован в `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit может менять всё, а более узкое право Donations.Enter (`GivingApi` / `Donations` / `Enter`, «Enter Donations» в редакторе ролей) может создавать пакеты и сохранять или удалять пожертвования и распределения по фондам только тогда, когда открыты и текущий пакет пожертвования, и целевой пакет, и никогда — для подарка от шлюза (с `transactionId`). Заблокированная запись возвращает `403 { error: "This batch is closed." }`. Чтение пакетов принимает Donations.ViewSummary или Donations.Enter, чтобы счётчик мог выбрать пакет, в который он вводит данные. На клиенте `B1Admin/src/donations/batchAccess.ts` повторяет эти правила (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), а `Header` / `SecondaryMenuHelper` показывают **Donations > Batches** всем, кто может видеть пакеты, даже без View Summary.

### Пересчёт смешанных валют

Любой эндпоинт, который возвращает единую общую сумму по подношениям, возможно, в разных валютах — KPI-карточки сводки пожертвований (`GivingKpiCards`), итог пакета, итог фонда и итоги с начала года или за период на экране пожертвований B1App, — конвертирует сумму в валюту церкви по умолчанию на сервере, а не складывает разные валюты. `Api/src/shared/helpers/ExchangeRateHelper.ts` получает курсы с `api.frankfurter.dev` по ключу — валюте церкви, кеширует их в памяти процесса на 12 часов и предоставляет `convertTotals(rows, churchCurrency, rates)`: строки заранее группируются по валюте в SQL (несколько групп, а не конвертация каждого подношения), каждая группа конвертируется и суммируется, а результат содержит флаг `isConverted`, по которому клиент показывает примечание «Converted at current exchange rates». `GET /donations/exchange-rates` открывает таблицу курсов клиентам, которым она нужна (экран пожертвований B1App); сами курсы никогда не принимаются из запроса, а только получаются на сервере, поэтому клиент не может повлиять на отчётную сумму. Отдельные записи о пожертвованиях и исторические отчёты в исходной валюте никогда не конвертируются — конвертируются только общие итоги.

Импорт из Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) догружает подношения, сделанные вне B1: он вызывает `POST /giving/donate/replay-stripe-events` с `dryRun: true` для предварительного просмотра, затем с `dryRun: false` для импорта. Сервер получает список событий Stripe за диапазон дат и пропускает всё, что уже записано: сначала по id провайдера в `eventLogs`, затем по id транзакции, затем через `DonationRepo.findMatchingDonation` (сумма + дата + человек), так что повторный запуск не создаёт дубликатов. События `charge.succeeded` / `payment_intent.succeeded` по подпискам пропускаются, потому что эти подношения записывает `invoice.paid`; в новых версиях API Stripe `PaymentIntent.invoice` больше не возвращается, поэтому пропуск также опирается на описание «Subscription …».

## Вебхуки и сверка

Расчёты по платежам и изменения состояния подписок приходят на `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Обработка намеренно идемпотентна:

1. **Проверка** — `GatewayService.verifyWebhook` делегирует проверку подписи провайдеру; неверная подпись возвращает 401. События, которые не требуют обработки, сразу завершаются с 200.
2. **Дедупликация события** — `EventLogRepo.loadByProviderId` пропускает вебхук, который уже записан в `eventLogs`.
3. **Дедупликация пожертвования** — перед созданием чего-либо проверяется `DonationRepo.loadByTransactionId` по каждому возможному идентификатору, который может содержать payload. Это поглощает повторные доставки, многоэтапные события ACH (ожидание → расчёт) и случай, когда `/donate/charge` уже оптимистично записал подношение.
4. **Применение** — метод `classifyWebhookEvent(eventType)` провайдера говорит, что означает событие (`donation` ожидание/завершение, `cancel-subscription` или `ignore`); завершённые платежи создают пожертвование `complete` (или переводят существующее `pending` или `failed`), события в стиле ACH попадают как `pending` до расчёта, неудачный счёт по подписке (Stripe `invoice.payment_failed`) создаёт пожертвование `failed` с ключом по id счёта, а события отмены удаляют локальную строку `subscriptions`. Контроллер никогда не проверяет специфичные для провайдера имена событий.

### Неудачные регулярные пожертвования и повторные попытки списания

Пожертвование со статусом `failed` — это единица работы для восстановления. `GET /giving/donations/failed` перечисляет их с последним сообщением о сбое от шлюза из `eventLogs` и флагом `canRetry` из возможностей шлюза; `POST /giving/donate/retry/:donationId` вызывает `retryFailedPayment` провайдера (Stripe оплачивает открытый счёт), а получившийся вебхук переводит строку в `complete` через обычный путь дедупликации. Письма с напоминанием об оплате отправляются донору из обработчика вебхука в день 0, затем `DunningHelper.run` из полуночного таймера (подключён и в `lambda/timer-handler.ts`, и в `RailwayCron.ts`) на 3-й и 7-й день; каждая отправка записывается в `eventLogs` как `provider: "dunning"`, `providerId: "<donationId>:<day>"`, поэтому повторный запуск никогда не отправит письмо дважды. Когда Stripe сдаётся и отменяет подписку (`customer.subscription.deleted` с `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` отправляет донору одно письмо (`providerId: "<subscriptionId>:canceled"`); отмены, инициированные донором или администратором, остаются без уведомления. Stripe никогда не добавляет события в уже существующий эндпоинт: после изменения `StripeHelper.webhookEvents` либо пересохраните шлюз, либо запустите `tools/manual/stripe-webhook-events.ts` (по умолчанию сухой прогон, `--apply` для записи) против продакшена.

Провайдеры с `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) записывают списания из ответа на `/charge` (для успешного сценария вебхук не нужен), а Stripe опирается на `payment_intent.succeeded` / `invoice.paid` и ACH `payment_intent.processing`. Обработка комиссий (`POST /giving/donate/fee`, флаг шлюза `payFees` и `calculateFees` каждого провайдера) вычисляет наценку «покрыть комиссии» на стороне донора — B1 не берёт платформенной доли, поэтому никакой комиссии приложения не добавляется.

:::info
Пути списания и вебхуков записывают одни и те же строки `donations` / `fundDonations`. `transactionId` — ключ соединения, который не даёт оптимистичной записи списания и последующему вебхуку создать два пожертвования за одно подношение.
:::

## Связанные страницы

- [Эндпоинты Giving](../api/endpoints/giving.md) — полный REST-интерфейс для пожертвований, фондов, пакетов, шлюзов, подписок, способов оплаты и вебхуков
- [AppHelper](../shared-libraries/app-helper.md) — npm-пакет, который поставляет реестр платёжных провайдеров и компоненты пожертвований
- [Структура модулей](../api/module-structure.md) — как организован модуль GivingApi на стороне сервера
