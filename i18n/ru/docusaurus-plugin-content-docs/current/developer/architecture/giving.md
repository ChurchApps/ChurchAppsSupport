---
title: "Архитектура пожертвований"
---

# Архитектура пожертвований

<div class="article-intro">

ChurchApps работает с пожертвованиями по модели шлюза: церковь ведет собственный аккаунт Stripe (или PayPal, Kingdom Funding, или Paystack), и B1 никогда не находится на пути денежных потоков как платформа-процессор. Данные карты токенизируются в браузере и никогда не достигают сервер ChurchApps. На этой странице представлена вся архитектура — реестр поставщиков платежей на стороне клиента в `@churchapps/apphelper`, абстракция шлюза GivingApi, модель данных пожертвований и то, как вебхуки шлюза согласовываются в базе данных.

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

На всей архитектуре держатся три принципа:

1. **Шлюз держит карту.** Виджет для ввода данных каждого поставщика токенизирует в браузере; API получает только токен, nonce или id заказа.
2. **Одна абстракция, много поставщиков.** Браузер разрешает `PaymentProvider` из реестра; сервер разрешает `IGatewayProvider` из фабрики. Оба ключаются по одному и тому же нормализованному имени поставщика, хранящемуся в записи шлюза.
3. **Вебхуки — источник правды для расчетов.** Ответ о зарядке регистрируется оптимистично, но подписанный вебхук шлюза подтверждает (или создает) завершенное пожертвование с охраной от дублирования с обеих сторон.

## Клиентская часть: реестр поставщиков платежей (`@churchapps/apphelper`)

Реестр находится в `Packages/apphelper/src/donations/providers/`, с виджетами каждого поставщика и вспомогательными функциями в его собственной подпапке (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — ничего вне `providers/` не ветвится по имени поставщика. `PaymentProvider` (см. `providers/types.ts`) объединяет все необходимое хост-приложению для одного шлюза: `descriptor` (ярлыки администратора, поддерживаемые валюты, поля комиссии, ставки комиссии по умолчанию, URL-адреса панели инструментов/регистрации), набор флагов `capabilities` (сохраненные карты, ACH, повторяющиеся платежи, встроенный ввод новой карты, неявное сохранение при токенизации), React-виджеты для ввода данных члена (`MemberWrapper`/`MemberEntry`), пожертвования гостем (`GuestForm`), редактирования сохраненного метода (`MethodEditForm`), платежей за вопросы формы (`FormPayment`), плюс `buildChargeRequest(ctx, token)` — единственное место, где форма полезной нагрузки зарядки отличается для каждого поставщика. Каждый `MemberWrapper` поставщика загружает свой SDK из открытого ключа шлюза в записи шлюза, поэтому хост-приложениям никогда не нужно импортировать SDK шлюза (B1App и B1Admin не имеют зависимости `@stripe/*`). `pickDefaultGateway(gateways, capability?)` централизует выбор того, какой из шлюзов церкви должна использовать поверхность.

`providers/registry.ts` содержит встроенные. Они **ссылаются по значению**, а не регистрируются через побочный эффект модуля, поэтому tree-shaking bundler никогда не может удалить регистрацию:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Функция | Назначение |
|----------|---------|
| `getPaymentProvider(name)` | Разрешить по нормализованному имени; откатывается на Stripe, чтобы неправильно сконфигурированный поставщик никогда не вызвал жесткий сбой формы донора |
| `registerPaymentProvider(p)` | Регистрировать дополнительного поставщика во время выполнения (для пользовательского шлюза хост-приложения) |
| `listPaymentProviders()` | Перечислить встроенные + пользовательские — используется для построения раскрывающегося списка администратора шлюза |
| `hasPaymentProvider(name)` | Проверка принадлежности |

**Встроенные поставщики клиента: Stripe, PayPal, Kingdom Funding, Paystack.** B1App и B1Admin только *читают* реестр (`getPaymentProvider`, `listPaymentProviders`); ни один из них не вызывает `registerPaymentProvider` — регистрация остается внутри apphelper.

Каждый поставщик токенизирует по-разному, но все держат карту вне B1:

| Поставщик | Виджет ввода | Токен, возвращенный в API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; форма гостя также монтирует `ExpressCheckoutElement` (Apple Pay / Google Pay, разовые пожертвования), чей `onConfirm` разрешается на одно и то же значение `pm_…` id | id платежного метода (`pm_…`); банк через `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` для USD шлюзов, Canadian PAD `acss_debit` (модальное окно hosted mandate, mandate `default_for` invoices/subscriptions, одноразовые платежи передают id мандата) для CAD шлюзов |
| Kingdom Funding | Hosted tokenizer form, ключ которой по открытому ключу шлюза | одноразовый nonce |
| PayPal | PayPal Hosted Fields (карта, повторяющаяся) плюс PayPal Smart Buttons с Venmo funding (разовые); оба используют одну загрузку SDK и заказ на сервере, построенный через `/donate/client-token` + `/donate/create-order` | захватанный id заказа |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) — popup сам принимает платеж (карта, мобильные деньги, банковский перевод, USSD) | оплаченная ссылка на транзакцию; сохраненные методы — это коды авторизации Paystack `AUTH_…` |

`finalizeResult` Stripe выполняет 3-D Secure / SCA в браузере (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) до того, как пожертвование считается завершенным; общая форма просто вызывает `provider.finalizeResult(result)` без знания того, что это делает.

## Серверная часть: абстракция шлюза (GivingApi)

Поверхность REST модуля `/giving` (`Api/src/modules/giving`) предоставляет `/giving` модуль; трубопровод шлюза находится в `Api/src/shared/helpers`. `DonateController` никогда не разговаривает с SDK шлюза напрямую — он идет через `GatewayService`, который разрешает правильное `IGatewayProvider` из `GatewayFactory` и передает ему расшифрованное `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) — это контракт, который реализует каждый шлюз — жизненный цикл вебхука (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), платеж (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), комиссии (`calculateFees`), обработка сохраненного метода (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) и опциональные расширения (клиенты, заказы, SetupIntents, повторное воспроизведение события, `retryFailedPayment` для неудачного счета подписки, `registerPaymentMethodDomain` для проверки домена Apple Pay). Поставщик, который пропускает дополнительный хук, сообщается как неподдерживаемый для этого действия и пользовательский интерфейс скрывает элемент управления. Каждый класс поставщика объявляет свою собственную матрицу `capabilities` (поддерживаемые валюты, ACH, возвраты, требования подписки, лимиты транзакций) — `GatewayService.getProviderCapabilities(provider)` просто читает это — и флаги как `logsDonationsImmediately` управляют поведением контроллера без каких-либо условных выражений имени поставщика в контроллерах.

**Поставщики на сервере, зарегистрированные в `GatewayFactory`:**

| Поставщик | Доступность |
|----------|-------------|
| Stripe | Всегда включен |
| PayPal | Всегда включен |
| Kingdom Funding | Всегда включен |
| Paystack | Всегда включен (торговцы Нигерии, Ганы, Южной Африки, Кении, Кот-д'Ивуара; валюты NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in через флаг среды `ENABLE_SQUARE` |
| ePayMints | Opt-in через флаг среды `ENABLE_EPAYMINTS` |

Paystack отличается от остальных тем, что деньги движутся до того, как GivingApi вовлечен: popup взимает плату с донора, `processCharge` — это `GET /transaction/verify/:reference`, оплаченная сумма и валюта которого должны соответствовать регистрируемому пожертвованию (ссылка уже в файле никогда не регистрируется дважды), и первый подарок повторяющегося графика регистрируется из `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` с `start_date` на один интервал вперед). Вебхуки подписаны самим секретным ключом (`x-paystack-signature`, HMAC-SHA512 по сырому телу), и Paystack не имеет API управления вебхуками, поэтому экран администратора показывает URL-адрес для вставки церковью на его панель инструментов. События `charge.success` возобновления не несут разделения фондов; поставщик восстанавливает это из локальных строк пожертвователя `subscriptions`/`subscriptionFunds`. Только авторизации карты являются `reusable` — пожертвования мобильных денег — это разовые только, поэтому `createSubscription` отказывает им. Демо-данные заполняют вторую церковь (Accra Community Church, `CHU00000002`) на шлюзе Paystack test-mode GHS, чтобы набор Paystack Playwright работал рядом с Stripe Grace.

Пользовательские поставщики могут быть зарегистрированы во время выполнения, когда установлено `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` — это базовый класс для них. Имена поставщиков совпадают без учета регистра.

### Конфигурация шлюза и секреты

Администратор сохраняет учетные данные шлюза через `POST /giving/gateways` (`GatewayController`). При сохранении контроллер шифрует приватный и вебхук-ключи с помощью `EncryptionHelper` перед сохранением, а затем — на любом хосте, отличном от localhost — удаляет существующий вебхук церкви и предоставляет новый, указывающий на `/giving/donate/webhook/{provider}?churchId=…`. Церковь держит одну строку для каждого поставщика: сохранение шлюза заменяет только существующую строку для того же поставщика. Открытые чтения (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) возвращают только открытые ключи.

## Модель данных

Схема пожертвований (`Api/src/modules/giving/db/DatabaseTypes.ts`, модели в `models/`) — это MySQL-схема, доступная через Kysely:

| Таблица | Роль |
|-------|------|
| `gateways` | Конфигурация поставщика для каждой церкви: `provider`, `publicKey`, зашифрованные `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Назначение пожертвований (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Группировка для ввода/отчетности (`name`, `batchDate`) |
| `donations` | Один подарок: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; выписки, итоги, панели инструментов и отчеты пожертвований учитывают только `complete` или null), `transactionId` |
| `fundDonations` | Распределение пожертвования по одному или более фондам (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Повторяющийся подарок; `id` — это id подписки шлюза, связанный с `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Разделение фонда для повторяющегося подарка |
| `customers` | Связывает `personId` с его id клиента шлюза, на поставщика |
| `gatewayPaymentMethods` | Сохраненные карты/банки: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Журнал вебхука/события и ключ дедупликации (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Кампании обещания, привязанные к фонду, и обещанная каждым лицом сумма |

Пожертвование разделяется по фондам через `fundDonations` — пожертвование несет итог, каждое `fundDonation` несет кусок. `donations.currency` и `gateways.currency` несут ISO валюту; каждый поставщик рекламирует свой `supportedCurrencies`, и суммы форматируются с `CurrencyHelper.formatCurrencyWithLocale`.

## Полные потоки

### Член разовый и повторяющийся (B1App)

Проверенный экран пожертвования (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) компонует три компонента apphelper: `MultiGatewayDonationForm`, `PaymentMethods` и `RecurringDonations`. B1App делает окружающую загрузку данных — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — и передает через список шлюзов; разрешенный поставщик загружает свой собственный SDK из открытого ключа шлюза. Сама зарядка происходит внутри apphelper: разрешенный поставщик токенизирует (новый или сохраненный) метод, затем отправляет на `/giving/donate/charge` для разового подарка или `/giving/donate/subscribe` для повторяющегося. Обе конечные точки приписывают вошедшего донора их собственному `personId` (только держатели `donations.edit` могут приписать кому-то другому) и отказывают разделение фондов, которое добавляет более взимаемой суммы. Повторяющиеся подарки создают строку `subscriptions` плюс `subscriptionFunds` и передают график шлюзу (Stripe Subscriptions, PayPal Billing Plans или KF повторяющийся график).

### Гостевое / анонимное пожертвование

Страница пожертвований для публики (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) и панель "подарить сейчас" отображают `NonAuthDonationWrapper` из `@churchapps/apphelper/website`, который внедряет reCAPTCHA и контекст Elements шлюза вокруг `GuestForm` поставщика. Гости не получают вход в систему, не сохранили методы и историю. Поток получает `GET /giving/funds/churchId/:id` и `GET /giving/donate/gateways/:churchId` (только открытые ключи), проверяет посетителя с `POST /giving/donate/captcha-verify`, токенизирует в браузере и отправляет на `/giving/donate/charge` (или `/subscribe`). Гостевой ACH использует анонимный `POST /giving/paymentmethods/ach-setup-intent-anon`.

Три опции гостевой формы используют один и тот же вызов зарядки. `?fundId=` и `?amount=` на URL пожертвования предварительно выбирают разделение фонда (читается каждой гостевой формой поставщика при монтировании, маршрутизируется через обработчик изменения обычного фонда, поэтому итоги и комиссии обновляются). `anonymous: true` заставляет `DonateController.charge` отбросить любого человека, которого клиент отправил, и зарегистрировать подарок с `personId = null`; гостевая форма пропускает `/people/loadOrCreate` и этап customer/vault, и три поставщика немедленного логирования останавливают разрешение лица из клиента шлюза. Apple Pay нужен домен страницы, зарегистрированный в Stripe, поэтому гостевая форма Stripe отправляет один раз за сеанс на публичный, ограниченный по скорости `POST /giving/donate/register-domain`, который принимает только домен, который принадлежит церкви (`<subDomain>.b1.church`, строка в таблице доменов модуля контента или локальный хост), прежде чем вызвать API доменов способа платежа Stripe.

### Запись администратора и импорт Stripe (B1Admin)

Раздел пожертвований B1Admin (`B1Admin/src/donations/`) — это место, где работают финансовые команды. Массовый ввод (`components/BulkDonationEntry.tsx`) регистрирует пожертвования наличными/чеками/натурой, отправляя `/giving/donations` затем `/giving/funddonations` — без шлюза. Фонды, пакеты, кампании и выписки каждый отображаются на свои маршруты CRUD `/giving/*`. Панель пожертвования в стиле члена (`B1Admin/src/donationComponents/`) переиспользует те же компоненты apphelper, что и B1App.

Отчеты и передачи бухгалтерского учета — это работа на стороне клиента или report-runner, а не работа шлюза: CSV экспорта QuickBooks страницы пакета строит журнальную запись из `donations` + `fundDonations` пакета (дебет Undeposited Funds, один кредит на фонд), вкладка Lapsed Givers запускает `Api/reports/lapsedGivers.json` через универсальный runner отчета с разрешенными именами людей по `ReportOutput`, и форматы чеков страны (Канада / Австралия / Новая Зеландия) — это параметры церкви в хранилище ключ/значение членства, отображаемые `GivingStatementDocument` и дублированные на странице печати B1App.

### Преобразование смешанных валютных итогов

Любая конечная точка, которая возвращает один объединенный итог, возможно, смешанные валютные подарки — KPI резюме пожертвований (`GivingKpiCards`), итог пакета пожертвований, итог фонда и год-к-дате/период итоговые B1App экран пожертвования — преобразует в валюту по умолчанию церкви на стороне сервера, а не суммируя неподобные валюты. `Api/src/shared/helpers/ExchangeRateHelper.ts` получает ставки от `api.frankfurter.dev`, ключ по валюте церкви, кеширует их в-процесс на 12 часов, и предоставляет `convertTotals(rows, churchCurrency, rates)`: строки предварительно сгруппированы по валюте в SQL (горстка групп, никогда не преобразование за подарок), каждая группа преобразуется и суммируется, и результат несет флаг `isConverted` клиент использует, чтобы показать примечание "Converted at current exchange rates". Отдельные записи пожертвований и исторические/исходные валютные отчеты никогда не преобразуются — только объединенные итоги.

Импорт Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) заполняет подарки, сделанные вне B1: он вызывает `POST /giving/donate/replay-stripe-events` с `dryRun: true` для предварительного просмотра, а затем `dryRun: false` для импорта. Сервер перечисляет события Stripe за диапазон дат и пропускает все уже зарегистрированное — сопоставлено в первую очередь по id поставщика `eventLogs`, а затем по `DonationRepo.findMatchingDonation` (сумма + дата + человек), поэтому повторный запуск никогда не импортирует дважды.

## Вебхуки и согласование

Расчетные платежи и изменения состояния подписки приходят на `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Обработка намеренно идемпотентна:

1. **Проверить** — `GatewayService.verifyWebhook` делегирует проверку подписи поставщика; неудачная подпись возвращает 401. События, которые не нуждаются в обработке, замыкаются с 200.
2. **Дедупликировать событие** — `EventLogRepo.loadByProviderId` пропускает вебхук, уже зарегистрированный в `eventLogs`.
3. **Дедупликировать пожертвование** — перед созданием чего-либо, `DonationRepo.loadByTransactionId` проверяется против каждого кандидата id, который может нести полезная нагрузка. Это поглощает дублирующиеся доставки, многоэтапные события ACH (pending → settled), и случай, когда `/donate/charge` уже регистрировал подарок оптимистично.
4. **Применить** — `classifyWebhookEvent(eventType)` поставщика говорит, что означает событие (`donation` pending/complete, `cancel-subscription` или `ignore`); завершенные платежи создают `complete` пожертвование (или повышают существующее `pending` или `failed`), события в стиле ACH приземляются как `pending` до расчета, неудачный счет подписки (Stripe `invoice.payment_failed`) создает `failed` пожертвование, ключ которого по id счета, и события отмены удаляют локальную строку `subscriptions`. Контроллер никогда не проверяет имена событий специфичные для поставщика.

### Неудачные повторяющиеся подарки и погоня за задолженностью

`failed` пожертвование — это единица работы для восстановления. `GET /giving/donations/failed` перечисляет их с самым новым сообщением об отказе шлюза от `eventLogs` и флагом `canRetry` из возможностей шлюза; `POST /giving/donate/retry/:donationId` вызывает `retryFailedPayment` поставщика (Stripe платит открытый счет), и получающийся вебхук повышает строку до `complete` через обычный путь дедупликации. Письма погони за задолженностью отправляются донору из обработчика вебхука в день 0, затем из `DunningHelper.run` в полночный таймер (подключено в обоих `lambda/timer-handler.ts` и `RailwayCron.ts`) в 3 и 7 дней; каждая отправка регистрируется в `eventLogs` как `provider: "dunning"`, `providerId: "<donationId>:<day>"`, поэтому повторный запуск никогда не отправляет дважды. Конечные точки вебхука Stripe, созданные до этой функции, не подписываются на `invoice.payment_failed`; повторное сохранение шлюза предоставляет новую конечную точку с событием.

Поставщики с `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) имеют свои платежи, регистрируемые из ответа `/charge` (не требуется повторный цикл вебхука для счастливого пути), в то время как Stripe полагается на `payment_intent.succeeded` / `invoice.paid` и ACH `payment_intent.processing`. Обработка комиссии (`POST /giving/donate/fee`, флаг `payFees` шлюза и `calculateFees` каждого поставщика) вычисляет валовый рост "покрыть комиссии" на стороне донора — B1 не принимает платформенный сбор, поэтому плата за приложение никогда не добавляется.

:::info
Пути зарядки и вебхука записывают одни и те же строки `donations` / `fundDonations`. `transactionId` — это ключ присоединения, который предотвращает создание двух пожертвований для одного подарка оптимистичным логом зарядки и его последующим вебхуком.
:::

## Связанные страницы

- [Giving Endpoints](../api/endpoints/giving) — полная поверхность REST для пожертвований, фондов, пакетов, шлюзов, подписок, методов платежа и вебхуков
- [AppHelper](../shared-libraries/app-helper) — пакет npm, который поставляет реестр поставщиков платежей и компоненты пожертвований
- [Module Structure](../api/module-structure) — как организован модуль GivingApi на стороне сервера
