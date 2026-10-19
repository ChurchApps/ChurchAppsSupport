---
title: "Архитектура пожертвований"
---

# Архитектура пожертвований

<div class="article-intro">

ChurchApps обрабатывает пожертвования по модели платёжного шлюза: у церкви есть собственный аккаунт Stripe (или PayPal, Kingdom Funding либо Paystack), а B1 никогда не выступает в денежном потоке как платформенный процессор. Данные карты токенизируются в браузере и никогда не попадают на сервер ChurchApps. На этой странице описан весь стек: реестр клиентских провайдеров в `@churchapps/apphelper`, абстракция шлюза GivingApi, модель данных пожертвований и то, как вебхуки шлюза сверяются с базой данных.

</div>

## Обзор

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

Три принципа действуют во всём стеке:

1. **Шлюз хранит карту.** Виджет ввода каждого провайдера токенизирует данные в браузере; API получает только токен, nonce или идентификатор заказа.
2. **Одна абстракция, много провайдеров.** Браузер получает `PaymentProvider` из реестра; сервер получает `IGatewayProvider` из фабрики. Оба используют одно и то же нормализованное имя провайдера, которое хранится в записи шлюза.
3. **Вебхуки — источник истины для расчётов.** Ответ на списание записывается оптимистично, но подписанный вебхук шлюза подтверждает (или создаёт) завершённое пожертвование; защита от повторной обработки работает с обеих сторон.

## Клиентская часть: реестр платёжных провайдеров (`@churchapps/apphelper`)

Реестр находится в `Packages/apphelper/src/donations/providers/`, а виджеты и вспомогательные функции каждого провайдера — в его собственной подпапке (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`); ничто за пределами `providers/` не ветвится по имени провайдера. `PaymentProvider` (см. `providers/types.ts`) объединяет всё, что нужно приложению-хосту для одного шлюза: `descriptor` (подписи для администратора, поддерживаемые валюты, поля комиссий, стандартные ставки комиссий, URL панели управления и регистрации), набор флагов `capabilities` (сохранённые карты, ACH, регулярные платежи, ввод новой карты на месте, неявное сохранение при токенизации), React-виджеты для ввода участником (`MemberWrapper`/`MemberEntry`), гостевые пожертвования (`GuestForm`), редактирование сохранённого способа оплаты (`MethodEditForm`) и платежи через формы (`FormPayment`), а также `buildChargeRequest(ctx, token)` — единственное место, где форма тела запроса на списание различается у провайдеров. `MemberWrapper` каждого провайдера загружает собственный SDK по публичному ключу из записи шлюза, поэтому приложения-хосты никогда не импортируют SDK шлюза (B1App и B1Admin не имеют зависимости `@stripe/*`). `pickDefaultGateway(gateways, capability?)` определяет, какой из шлюзов церкви должна использовать та или иная поверхность.

`providers/registry.ts` содержит встроенные провайдеры. Они **передаются по значению**, а не регистрируются через побочный эффект модуля, поэтому tree-shaking сборщика никогда не сможет удалить регистрацию:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Функция | Назначение |
|----------|---------|
| `getPaymentProvider(name)` | Находит провайдера по нормализованному имени; при отсутствии возвращает Stripe, чтобы неверно настроенный провайдер никогда не ломал форму пожертвования |
| `registerPaymentProvider(p)` | Регистрирует дополнительного провайдера во время выполнения (для пользовательского шлюза приложения-хоста) |
| `listPaymentProviders()` | Перечисляет встроенных и пользовательских провайдеров — используется для выпадающего списка шлюзов в админке |
| `hasPaymentProvider(name)` | Проверка принадлежности к реестру |

**Встроенные клиентские провайдеры: Stripe, PayPal, Kingdom Funding, Paystack.** B1App и B1Admin только *читают* реестр (`getPaymentProvider`, `listPaymentProviders`); ни один из них не вызывает `registerPaymentProvider` — регистрация остаётся внутри apphelper.

У каждого провайдера токенизация устроена по-своему, но все они не допускают попадания карты в B1:

| Провайдер | Виджет ввода | Токен, передаваемый в API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; гостевая форма также монтирует `ExpressCheckoutElement` (Apple Pay / Google Pay для разовых пожертвований), `onConfirm` которого возвращает тот же идентификатор `pm_…` | идентификатор способа оплаты (`pm_…`); банковский счёт через `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` для шлюзов в USD, канадский PAD `acss_debit` (размещённое модальное окно мандата, мандат `default_for` для счетов и подписок, разовые списания передают идентификатор мандата) для шлюзов в CAD |
| Kingdom Funding | Размещённая форма токенизации, привязанная к публичному ключу шлюза | одноразовый nonce |
| PayPal | PayPal Hosted Fields (карта, регулярные платежи) плюс PayPal Smart Buttons с Venmo (разовые платежи); оба используют одну загрузку SDK и серверный заказ, созданный через `/donate/client-token` + `/donate/create-order` | идентификатор подтверждённого заказа |
| Paystack | Всплывающее окно Paystack Inline (`js.paystack.co/v2/inline.js`) — само окно принимает платёж (карта, мобильные деньги, банковский перевод, USSD) | ссылка на оплаченную транзакцию; сохранённые способы оплаты — коды авторизации Paystack `AUTH_…` |

`finalizeResult` в Stripe выполняет 3-D Secure / SCA в браузере (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) до того, как пожертвование считается завершённым; общая форма просто вызывает `provider.finalizeResult(result)` и не знает, что именно он делает.

## Серверная часть: абстракция шлюза (GivingApi)

Модуль `/giving` (`Api/src/modules/giving`) предоставляет REST-интерфейс; механика работы со шлюзами находится в `Api/src/shared/helpers`. `DonateController` никогда не обращается к SDK шлюза напрямую — он идёт через `GatewayService`, который выбирает нужный `IGatewayProvider` из `GatewayFactory` и передаёт ему расшифрованный `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) — это контракт, который реализует каждый шлюз: жизненный цикл вебхуков (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), платежи (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), комиссии (`calculateFees`), работа с сохранёнными способами оплаты (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) и необязательные дополнения (клиенты, заказы, SetupIntents, повторное воспроизведение событий, `retryFailedPayment` для неудачного счёта по подписке, `registerPaymentMethodDomain` для проверки домена Apple Pay). Если провайдер не реализует необязательный хук, действие считается неподдерживаемым, а интерфейс скрывает соответствующий элемент управления. Каждый класс провайдера объявляет собственную матрицу `capabilities` (поддерживаемые валюты, ACH, возвраты, требования к подпискам, лимиты транзакций) — `GatewayService.getProviderCapabilities(provider)` только читает её, а флаги вроде `logsDonationsImmediately` управляют поведением контроллеров без каких-либо условий по имени провайдера.

**Серверные провайдеры, зарегистрированные в `GatewayFactory`:**

| Провайдер | Доступность |
|----------|-------------|
| Stripe | Всегда включён |
| PayPal | Всегда включён |
| Kingdom Funding | Всегда включён |
| Paystack | Всегда включён (для продавцов в Нигерии, Гане, ЮАР, Кении и Кот-д'Ивуаре; валюты NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Включается через флаг окружения `ENABLE_SQUARE` |
| ePayMints | Включается через флаг окружения `ENABLE_EPAYMINTS` |

Paystack отличается от остальных тем, что деньги перемещаются до того, как в процесс вступает GivingApi: всплывающее окно списывает средства с жертвователя, `processCharge` — это `GET /transaction/verify/:reference`, оплаченная сумма и валюта которого должны совпадать с записываемым пожертвованием (ссылка, уже имеющаяся в базе, никогда не записывается дважды), а первый платёж регулярного графика записывается из `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` с `start_date` через один интервал). Вебхуки подписываются самим секретным ключом (`x-paystack-signature`, HMAC-SHA512 от исходного тела), а у Paystack нет API для управления вебхуками, поэтому административный экран показывает URL, который церковь должна вставить в свою панель. События продления `charge.success` не содержат разбивки по фондам; провайдер восстанавливает её из локальных строк `subscriptions`/`subscriptionFunds` жертвователя. Только авторизации карт являются `reusable` — платежи мобильными деньгами разовые, поэтому `createSubscription` их отклоняет. Демо-данные добавляют вторую церковь (Accra Community Church, `CHU00000002`) с тестовым шлюзом Paystack в GHS, чтобы набор Playwright для Paystack работал наряду с набором для Stripe у Grace.

Пользовательские провайдеры можно регистрировать во время выполнения, если задана переменная `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; базовый класс для них — `AbstractExperimentalGatewayProvider`. Имена провайдеров сопоставляются без учёта регистра.

### Конфигурация шлюза и секреты

Администратор сохраняет учётные данные шлюза через `POST /giving/gateways` (`GatewayController`). При сохранении контроллер шифрует закрытый и вебхук-ключи с помощью `EncryptionHelper` перед записью, а затем — на любом хосте, отличном от localhost, — удаляет существующий вебхук церкви и создаёт новый, указывающий на `/giving/donate/webhook/{provider}?churchId=…`. Церковь хранит одну строку на каждого провайдера: сохранение шлюза заменяет только существующую строку для того же провайдера. Публичные запросы (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) возвращают только публичные ключи.

## Модель данных

Схема giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, модели в `models/`) — это схема MySQL, доступ к которой осуществляется через Kysely:

| Таблица | Назначение |
|-------|------|
| `gateways` | Настройки провайдера для каждой церкви: `provider`, `publicKey`, зашифрованные `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Фонды пожертвований (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Группировка для ввода и отчётности (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Одно пожертвование: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; выписки, итоги, панели и отчёты о пожертвованиях учитывают только `complete` или null), `transactionId` |
| `fundDonations` | Распределение пожертвования между одним или несколькими фондами (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Регулярное пожертвование; `id` — идентификатор подписки в шлюзе, связанный с `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Распределение регулярного пожертвования по фондам |
| `customers` | Связывает `personId` с идентификатором клиента в шлюзе для каждого `provider` |
| `gatewayPaymentMethods` | Сохранённые карты и счета: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Журнал аудита вебхуков и событий, а также ключ дедупликации (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Кампании обещаний, привязанные к фонду, и обещанная сумма каждого человека |

Пожертвование распределяется по фондам через `fundDonations`: само пожертвование хранит общую сумму, а каждая `fundDonation` — свою долю. `donations.currency` и `gateways.currency` хранят код валюты ISO; каждый провайдер объявляет свой список `supportedCurrencies`, а суммы форматируются с помощью `CurrencyHelper.formatCurrencyWithLocale`.

## Сквозные сценарии

### Разовые и регулярные пожертвования участника (B1App)

Экран пожертвований для авторизованных пользователей (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) собирает три компонента apphelper: `MultiGatewayDonationForm`, `PaymentMethods` и `RecurringDonations`. B1App выполняет окружающую загрузку данных — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — и передаёт список шлюзов дальше; выбранный провайдер загружает собственный SDK по публичному ключу шлюза. Само списание происходит внутри apphelper: выбранный провайдер токенизирует (новый или сохранённый) способ оплаты, затем отправляет запрос на `/giving/donate/charge` для разового пожертвования или на `/giving/donate/subscribe` для регулярного. Оба эндпоинта относят пожертвование вошедшего жертвователя к его собственному `personId` (только владельцы `donations.edit` могут указать другого человека) и отклоняют распределения по фондам, сумма которых превышает списанную сумму. Регулярные пожертвования создают строку `subscriptions` плюс `subscriptionFunds` и передают расписание шлюзу (Stripe Subscriptions, PayPal Billing Plans или регулярное расписание KF).

### Гостевые и анонимные пожертвования

Публичная страница пожертвований (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) и панель «дать сейчас» отображают `NonAuthDonationWrapper` из `@churchapps/apphelper/website`, который подключает reCAPTCHA и контекст Elements шлюза вокруг `GuestForm` провайдера. Гости не входят в систему, у них нет сохранённых способов оплаты и истории. Поток получает `GET /giving/funds/churchId/:id` и `GET /giving/donate/gateways/:churchId` (только публичные ключи), проверяет посетителя через `POST /giving/donate/captcha-verify`, токенизирует данные в браузере и отправляет запрос на `/giving/donate/charge` (или `/subscribe`). Гостевой ACH использует анонимный `POST /giving/paymentmethods/ach-setup-intent-anon`, который допускает только мгновенную проверку (Financial Connections): проверка микродепозитами завершается через несколько дней, когда гостевой страницы уже нет, поэтому пожертвование никогда не было бы завершено. Форма отказывается списывать средства по непроверенному SetupIntent и предлагает жертвователю карту или настройку банка для вошедшего пользователя.

Три опции гостевой формы используют один и тот же запрос списания. `?fundId=` и `?amount=` в URL страницы пожертвований предварительно выбирают распределение по фондам (каждая гостевая форма провайдера читает их при монтировании и передаёт через обычный обработчик смены фонда, так что итоги и комиссии обновляются). `anonymous: true` заставляет `DonateController.charge` отбросить любого человека, которого прислал клиент, и записать пожертвование с `personId = null`; гостевая форма пропускает `/people/loadOrCreate` и шаг с клиентом/хранилищем, а три провайдера, которые логируют немедленно, не определяют человека по клиенту шлюза. Apple Pay требует, чтобы домен страницы был зарегистрирован в Stripe, поэтому гостевая форма Stripe один раз за сессию отправляет запрос на публичный, ограниченный по частоте `POST /giving/donate/register-domain`, который принимает только домен, принадлежащий церкви (`<subDomain>.b1.church`, строка в таблице доменов модуля content или локальный хост), и только после этого вызывает API доменов способов оплаты Stripe.

### Ввод администратором и импорт из Stripe (B1Admin)

Раздел пожертвований B1Admin (`B1Admin/src/donations/`) — рабочее место финансовых команд. Пакетный ввод (`components/BulkDonationEntry.tsx`) фиксирует наличные, чеки и пожертвования натурой, отправляя `/giving/donations`, а затем `/giving/funddonations` — без участия шлюза. Окно **Log a gift** на карточке человека (`components/LogGiftDialog.tsx`) делает то же самое для одного пожертвования: сначала находит пакет, у которого `batchDate` совпадает с датой пожертвования, или создаёт новый с этой датой в названии (`POST /giving/donationbatches`), а при неудаче на более позднем шаге удаляет пожертвование и вновь созданный пакет. Фонды, пакеты, кампании и выписки сопоставляются с CRUD-маршрутами `/giving/*`; страницы выписок (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) запрашивают один календарный год через `GET /donations?startDate=&endDate=` и `GET /fundDonations?startDate=&endDate=`, а не всю историю церкви, которая могла бы превысить лимит размера ответа Lambda. Панель пожертвования в стиле участника (`B1Admin/src/donationComponents/`) использует те же компоненты apphelper, что и B1App.

Отчётность и передача данных бухгалтерии выполняются на стороне клиента или средствами генератора отчётов, а не шлюза: экспорт пакета в QuickBooks формирует CSV журнальных проводок из `donations` + `fundDonations` пакета (дебет Undeposited Funds, по одной кредитовой проводке на фонд); представление Lapsed Givers на странице Summary запускает `Api/reports/lapsedGivers.json` через общий генератор отчётов, при этом имена людей разрешаются в `ReportOutput`; форматы квитанций для стран (Канада / Австралия / Новая Зеландия) — это настройки церкви в хранилище ключ-значение membership, которые отрисовывает `GivingStatementDocument` и которые дублируются на странице печати B1App. Страницы печати выписок B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) передают настройку церкви `logoLight` (через `usePrintLogo` в `B1Admin/src/components/PrintChurchHeader.tsx`), чтобы логотип печатался вверху каждой выписки, и ждут загрузки изображения перед автоматической печатью.

### Статус пакета и право Enter Donations

Пакеты можно закрывать, чтобы сверенный депозит оставался неизменным. `POST /giving/donationbatches/:id/close` и `/:id/reopen` (только Donations.Edit) — единственные операции, которые записывают `status`, `closedDate` и `closedBy` (`DonationBatchRepo.setStatus`); обычное сохранение пакета их не затрагивает, поэтому отправка пакета не может его переоткрыть. Права на запись централизованы в `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit может изменять всё, тогда как более узкое право Donations.Enter (`GivingApi` / `Donations` / `Enter`, «Enter Donations» в редакторе ролей) позволяет создавать пакеты и сохранять или удалять пожертвования и распределения по фондам только тогда, когда открыты и текущий пакет пожертвования, и целевой пакет, и никогда для гостевого платежа через шлюз (с `transactionId`). Заблокированная запись возвращает `403 { error: "This batch is closed." }`. Чтение пакетов доступно для Donations.ViewSummary или Donations.Enter, чтобы счётчик мог выбрать пакет, в который вводит данные. На клиенте `B1Admin/src/donations/batchAccess.ts` повторяет эти правила (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), а `Header` и `SecondaryMenuHelper` показывают **Donations > Batches** всем, кто может видеть пакеты, даже без View Summary.

### Пересчёт итогов в разных валютах

Любой эндпоинт, который возвращает один общий итог по пожертвованиям, возможно в разных валютах — KPI сводки пожертвований (`GivingKpiCards`), итог пакета пожертвований, итог фонда и итоги за год к дате и за период на экране пожертвований B1App — пересчитывает суммы в валюту церкви по умолчанию на стороне сервера, а не складывает несопоставимые валюты. `Api/src/shared/helpers/ExchangeRateHelper.ts` получает курсы с `api.frankfurter.dev` по валюте церкви, кэширует их в памяти процесса на 12 часов и предоставляет `convertTotals(rows, churchCurrency, rates)`: строки предварительно группируются по валюте в SQL (несколько групп, а не пересчёт каждого пожертвования), каждая группа пересчитывается и суммируется, а результат содержит флаг `isConverted`, по которому клиент показывает примечание «Пересчитано по текущему курсу обмена». `GET /donations/exchange-rates` предоставляет таблицу курсов клиентам, которым она нужна (экран пожертвований B1App); сами курсы никогда не принимаются из запроса, а только запрашиваются на сервере, поэтому клиент не может повлиять на отчётный итог. Отдельные записи пожертвований и исторические отчёты в исходной валюте никогда не пересчитываются — пересчитываются только общие итоги.

Импорт из Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) загружает пожертвования, сделанные вне B1: сначала он вызывает `POST /giving/donate/replay-stripe-events` с `dryRun: true` для предварительного просмотра, затем с `dryRun: false` для импорта. Сервер перечисляет события Stripe за указанный период и пропускает всё, что уже записано — сначала по идентификатору провайдера в `eventLogs`, затем по идентификатору транзакции, затем через `DonationRepo.findMatchingDonation` (сумма + дата + человек), поэтому повторный запуск никогда не импортирует дубликаты. События подписки `charge.succeeded` / `payment_intent.succeeded` пропускаются, потому что эти пожертвования записывает `invoice.paid`; новые версии API Stripe убирают `PaymentIntent.invoice`, поэтому пропуск также опирается на описание «Subscription …».

## Вебхуки и сверка

Подтверждённые платежи и изменения состояния подписок приходят на `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Обработка намеренно идемпотентна:

1. **Проверка** — `GatewayService.verifyWebhook` делегирует проверку подписи провайдеру; при неверной подписи возвращается 401. События, которые не требуют обработки, завершаются ответом 200.
2. **Дедупликация события** — `EventLogRepo.loadByProviderId` пропускает вебхук, уже записанный в `eventLogs`.
3. **Дедупликация пожертвования** — перед созданием чего-либо `DonationRepo.loadByTransactionId` проверяется для каждого возможного идентификатора из полезной нагрузки. Это гасит повторные доставки, многоэтапные события ACH (ожидание → расчёт) и случай, когда `/donate/charge` уже оптимистично записал пожертвование.
4. **Применение** — `classifyWebhookEvent(eventType)` провайдера говорит, что означает событие (`donation` в статусе pending/complete, `cancel-subscription` или `ignore`); завершённые платежи создают пожертвование `complete` (или переводят существующее `pending` или `failed`), события в стиле ACH попадают как `pending` до расчёта, неудачный счёт по подписке (`invoice.payment_failed` в Stripe) создаёт пожертвование `failed`, привязанное к идентификатору счёта, а события отмены удаляют локальную строку `subscriptions`. Контроллер никогда не анализирует имена событий, специфичные для провайдера.

### Неудачные регулярные пожертвования и повторные списания

Пожертвование со статусом `failed` — это единица работы для восстановления. `GET /giving/donations/failed` перечисляет их с последним сообщением об ошибке шлюза из `eventLogs` и флагом `canRetry` из возможностей шлюза; `POST /giving/donate/retry/:donationId` вызывает `retryFailedPayment` провайдера (Stripe оплачивает открытый счёт), и полученный вебхук переводит строку в `complete` через обычную дедупликацию. Письма о задолженности отправляются жертвователю из обработчика вебхука в день 0, затем из `DunningHelper.run` в полуночном таймере (подключён и в `lambda/timer-handler.ts`, и в `RailwayCron.ts`) на 3-й и 7-й день; каждая отправка записывается в `eventLogs` как `provider: "dunning"`, `providerId: "<donationId>:<day>"`, поэтому повторный запуск никогда не отправляет письмо дважды. Когда Stripe сдаётся и отменяет подписку (`customer.subscription.deleted` с `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` один раз отправляет письмо жертвователю (`providerId: "<subscriptionId>:canceled"`); отмены, инициированные жертвователем или администратором, остаются без уведомления. Stripe никогда не добавляет события к существующей конечной точке: после изменения `StripeHelper.webhookEvents` нужно либо заново сохранить шлюз, либо запустить `tools/manual/stripe-webhook-events.ts` (по умолчанию пробный запуск, `--apply` для записи) против боевой среды.

Провайдеры с `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) записывают списания из ответа `/charge` (в штатном сценарии не требуется обращение через вебхук), тогда как Stripe опирается на `payment_intent.succeeded` / `invoice.paid` и на ACH `payment_intent.processing`. Обработка комиссий (`POST /giving/donate/fee`, флаг шлюза `payFees` и `calculateFees` каждого провайдера) вычисляет на стороне жертвователя наценку «покрыть комиссии» — B1 не берёт платформенной доли, поэтому комиссия приложения никогда не добавляется.

:::info
Пути списания и вебхука записывают одни и те же строки `donations` / `fundDonations`. `transactionId` — ключ связи, который не даёт оптимистичной записи списания и её последующему вебхуку создать два пожертвования для одного и того же подарка.
:::

## Связанные страницы

- [Конечные точки Giving](../api/endpoints/giving) — полный REST-интерфейс для пожертвований, фондов, пакетов, шлюзов, подписок, способов оплаты и вебхуков
- [AppHelper](../shared-libraries/app-helper) — npm-пакет, который поставляет реестр платёжных провайдеров и компоненты пожертвований
- [Структура модулей](../api/module-structure) — как модуль GivingApi организован на сервере
