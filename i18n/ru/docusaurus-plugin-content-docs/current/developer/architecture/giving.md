---
title: "Архитектура пожертвований"
---

# Архитектура пожертвований

<div class="article-intro">

ChurchApps проводит пожертвования по модели «платёжный шлюз-рельс»: церковь сохраняет собственный аккаунт Stripe (или PayPal, или Kingdom Funding), и B1 никогда не встаёт в путь денежных средств как процессор платформы. Данные карты токенизируются в браузере и никогда не достигают сервера ChurchApps. На этой странице описан весь стек — реестр провайдеров на стороне клиента в `@churchapps/apphelper`, абстракция шлюза GivingApi, модель данных пожертвований и то, как вебхуки шлюза согласовываются обратно с базой данных.

</div>

## Обзор

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
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

1. **Шлюз хранит карту.** Виджет ввода каждого провайдера токенизирует данные в браузере; API получает только токен, nonce или id заказа.
2. **Одна абстракция, много провайдеров.** Браузер разрешает `PaymentProvider` из реестра; сервер разрешает `IGatewayProvider` из фабрики. Оба привязываются к одному и тому же нормализованному имени провайдера, хранящемуся в записи шлюза.
3. **Вебхуки — источник истины для расчётов.** Ответ на списание записывается оптимистично, но именно подписанный вебхук шлюза подтверждает (или создаёт) завершённое пожертвование, с защитой от повторной обработки с обеих сторон.

## На стороне клиента: реестр платёжных провайдеров (`@churchapps/apphelper`)

Реестр живёт в `Packages/apphelper/src/donations/providers/`, при этом виджеты и вспомогательные функции каждого провайдера находятся в собственной подпапке (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — ничто вне `providers/` не ветвится по имени провайдера. `PaymentProvider` (см. `providers/types.ts`) объединяет всё, что нужно принимающему приложению для одного шлюза: `descriptor` (административные подписи, поддерживаемые валюты, поля комиссий, ставки комиссий по умолчанию, URL панели/регистрации), набор флагов `capabilities` (сохранённые карты, ACH, повторяющиеся платежи, встроенный ввод новой карты, неявное сохранение при токенизации), React-виджеты для ввода данных участника (`MemberWrapper`/`MemberEntry`), пожертвования гостя (`GuestForm`), редактирование сохранённого метода (`MethodEditForm`) и платежи по вопросам формы (`FormPayment`), плюс `buildChargeRequest(ctx, token)` — единственное место, где форма полезной нагрузки списания отличается у каждого провайдера. `MemberWrapper` каждого провайдера загружает собственный SDK из публичного ключа записи шлюза, поэтому принимающие приложения никогда не импортируют SDK шлюза (у B1App и B1Admin нет зависимости `@stripe/*`). `pickDefaultGateway(gateways, capability?)` централизует, какой из шлюзов церкви должна использовать та или иная поверхность.

`providers/registry.ts` хранит встроенные провайдеры. Они **указаны по значению**, а не регистрируются через побочный эффект модуля, поэтому tree-shaking сборщика никогда не сможет отбросить регистрацию:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Функция | Назначение |
|----------|---------|
| `getPaymentProvider(name)` | Разрешает по нормализованному имени; при неудаче переключается на Stripe, чтобы неправильно настроенный провайдер никогда не приводил к жёсткому сбою формы донора |
| `registerPaymentProvider(p)` | Регистрирует дополнительного провайдера во время выполнения (для собственного шлюза принимающего приложения) |
| `listPaymentProviders()` | Перечисляет встроенные + пользовательские — используется для построения выпадающего списка шлюзов в администрировании |
| `hasPaymentProvider(name)` | Проверка наличия |

**Встроенные клиентские провайдеры: Stripe, PayPal, Kingdom Funding.** B1App и B1Admin только *читают* реестр (`getPaymentProvider`, `listPaymentProviders`); ни один не вызывает `registerPaymentProvider` — регистрация остаётся внутри apphelper.

Каждый провайдер токенизирует по-своему, но все не допускают попадания карты в B1:

| Провайдер | Виджет ввода | Токен, возвращаемый API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | id способа оплаты (`pm_…`); банк через Financial Connections / ACH SetupIntent |
| Kingdom Funding | Хостируемая форма токенизации, привязанная к публичному ключу шлюза | одноразовый nonce |
| PayPal | PayPal Hosted Fields; серверный заказ создаётся через `/donate/client-token` + `/donate/create-order` | захваченный id заказа |

`finalizeResult` Stripe выполняет 3-D Secure / SCA в браузере (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), прежде чем пожертвование считается завершённым; общая форма просто вызывает `provider.finalizeResult(result)`, не зная, что именно он делает.

## На стороне сервера: абстракция шлюза (GivingApi)

Модуль `/giving` (`Api/src/modules/giving`) предоставляет REST-поверхность; сантехника шлюза живёт в `Api/src/shared/helpers`. `DonateController` никогда не общается напрямую с SDK шлюза — он проходит через `GatewayService`, который разрешает нужный `IGatewayProvider` из `GatewayFactory` и передаёт ему расшифрованную `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) — контракт, который реализует каждый шлюз — жизненный цикл вебхуков (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), платежи (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), комиссии (`calculateFees`), обработку сохранённых методов (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) и опциональные дополнения (клиенты, заказы, SetupIntent, повтор событий). Каждый класс провайдера объявляет собственную матрицу `capabilities` (поддерживаемые валюты, ACH, возвраты, требования к подпискам, лимиты транзакций) — `GatewayService.getProviderCapabilities(provider)` просто её читает — а флаги вроде `logsDonationsImmediately` управляют поведением контроллера без каких-либо условий по имени провайдера в контроллерах.

**Серверные провайдеры, зарегистрированные в `GatewayFactory`:**

| Провайдер | Доступность |
|----------|-------------|
| Stripe | Всегда включён |
| PayPal | Всегда включён |
| Kingdom Funding | Всегда включён |
| Square | Опционально через флаг окружения `ENABLE_SQUARE` |
| ePayMints | Опционально через флаг окружения `ENABLE_EPAYMINTS` |

Пользовательские провайдеры можно зарегистрировать во время выполнения, когда установлен `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` — базовый класс для них. Имена провайдеров сравниваются без учёта регистра.

### Конфигурация шлюза и секреты

Администратор сохраняет учётные данные шлюза через `POST /giving/gateways` (`GatewayController`). При сохранении контроллер шифрует приватный ключ и ключ вебхука с помощью `EncryptionHelper` перед сохранением, а затем — на любом хосте, кроме localhost — удаляет существующий вебхук церкви и создаёт новый, указывающий на `/giving/donate/webhook/{provider}?churchId=…`. Публичные операции чтения (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) возвращают только публичные ключи.

## Модель данных

Схема пожертвований (`Api/src/modules/giving/db/DatabaseTypes.ts`, модели в `models/`) — это схема MySQL, доступ к которой осуществляется через Kysely:

| Таблица | Роль |
|-------|------|
| `gateways` | Конфигурация провайдера по церкви: `provider`, `publicKey`, зашифрованные `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Направления пожертвований (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Группировка для ввода/отчётности (`name`, `batchDate`) |
| `donations` | Одно пожертвование: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Распределение пожертвования по одному или нескольким фондам (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Повторяющееся пожертвование; `id` — это id подписки шлюза, связан с `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Разбивка по фондам для повторяющегося пожертвования |
| `customers` | Связывает `personId` с id клиента в шлюзе для каждого `provider` |
| `gatewayPaymentMethods` | Сохранённые карты/банковские счета: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Журнал аудита вебхуков/событий и ключ дедупликации (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Кампании обещанных пожертвований, привязанные к фонду, и обещанная сумма каждого человека |

Пожертвование распределяется по фондам через `fundDonations` — пожертвование несёт общую сумму, каждый `fundDonation` — свою долю. `donations.currency` и `gateways.currency` содержат код валюты ISO; каждый провайдер объявляет свои `supportedCurrencies`, а суммы форматируются через `CurrencyHelper.formatCurrencyWithLocale`.

## Сквозные потоки

### Разовое и повторяющееся пожертвование участника (B1App)

Экран пожертвования для авторизованных пользователей (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) собирает три компонента apphelper: `MultiGatewayDonationForm`, `PaymentMethods` и `RecurringDonations`. B1App выполняет сопутствующую загрузку данных — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — и передаёт список шлюзов дальше; разрешённый провайдер загружает собственный SDK из публичного ключа шлюза. Само списание происходит внутри apphelper: разрешённый провайдер токенизирует (новый или сохранённый) метод, затем отправляет запрос на `/giving/donate/charge` для разового пожертвования или `/giving/donate/subscribe` для повторяющегося. Повторяющиеся пожертвования создают строку `subscriptions` плюс `subscriptionFunds` и передают расписание шлюзу (Stripe Subscriptions, PayPal Billing Plans или повторяющееся расписание KF).

### Пожертвование гостя / анонимное

Публичная страница пожертвования (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) и панель «give now» отображают `NonAuthDonationWrapper` из `@churchapps/apphelper/website`, который встраивает reCAPTCHA и контекст Elements шлюза вокруг `GuestForm` провайдера. У гостей нет входа в систему, нет сохранённых методов и истории. Поток получает `GET /giving/funds/churchId/:id` и `GET /giving/donate/gateways/:churchId` (только публичные ключи), проверяет посетителя через `POST /giving/donate/captcha-verify`, токенизирует в браузере и отправляет запрос на `/giving/donate/charge` (или `/subscribe`). Гостевой ACH использует анонимную конечную точку `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Внесение записей администратором и импорт из Stripe (B1Admin)

Раздел пожертвований в B1Admin (`B1Admin/src/donations/`) — это то место, где работает финансовая команда. Пакетный ввод (`components/BulkDonationEntry.tsx`) фиксирует наличные/чековые/натуральные пожертвования, отправляя `/giving/donations`, затем `/giving/funddonations` — без участия шлюза. Фонды, пакеты, кампании и выписки сопоставляются каждый со своими CRUD-маршрутами `/giving/*`. Панель пожертвования в стиле участника (`B1Admin/src/donationComponents/`) переиспользует те же компоненты apphelper, что и B1App.

Импорт из Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) восполняет пожертвования, сделанные вне B1: он вызывает `POST /giving/donate/replay-stripe-events` с `dryRun: true` для предпросмотра, затем с `dryRun: false` для импорта. Сервер получает список событий Stripe за диапазон дат и пропускает всё, что уже записано — сначала сопоставляя по id провайдера в `eventLogs`, затем по `DonationRepo.findMatchingDonation` (сумма + дата + человек), так что повторный запуск никогда не дублирует импорт.

## Вебхуки и сверка

Завершённые платежи и изменения состояния подписки поступают на `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Обработка намеренно идемпотентна:

1. **Проверка** — `GatewayService.verifyWebhook` делегирует проверку подписи провайдеру; неудачная проверка подписи возвращает 401. События, не требующие обработки, немедленно завершаются с кодом 200.
2. **Дедупликация события** — `EventLogRepo.loadByProviderId` пропускает вебхук, уже зарегистрированный в `eventLogs`.
3. **Дедупликация пожертвования** — перед созданием чего-либо `DonationRepo.loadByTransactionId` проверяется на каждый id-кандидат, который может нести полезная нагрузка. Это поглощает повторные доставки, многоэтапные события ACH (ожидание → расчёт) и случай, когда `/donate/charge` уже оптимистично зафиксировал пожертвование.
4. **Применение** — `classifyWebhookEvent(eventType)` провайдера определяет, что означает событие (`donation` ожидание/завершено, `cancel-subscription` или `ignore`); завершённые платежи создают пожертвование в статусе `complete` (или переводят существующее `pending` в этот статус), события в стиле ACH попадают как `pending` до расчёта, а события отмены удаляют локальную строку `subscriptions`. Контроллер никогда не анализирует специфичные для провайдера имена событий.

Провайдеры с `logsDonationsImmediately` (PayPal, Kingdom Funding) фиксируют свои списания из ответа `/charge` (обратный цикл вебхука для основного сценария не требуется), тогда как Stripe полагается на `payment_intent.succeeded` / `invoice.paid` и ACH `payment_intent.processing`. Обработка комиссий (`POST /giving/donate/fee`, флаг шлюза `payFees` и `calculateFees` каждого провайдера) вычисляет надбавку «покрыть комиссию» на стороне донора — B1 не берёт долю платформы, поэтому комиссия за приложение никогда не добавляется.

:::info
Пути списания и вебхука записывают одни и те же строки `donations` / `fundDonations`. `transactionId` — это ключ соединения, который не позволяет оптимистичной записи списания и её последующему вебхуку создать два пожертвования для одного подарка.
:::

## Связанные страницы

- [Конечные точки пожертвований](../api/endpoints/giving) — полная REST-поверхность для пожертвований, фондов, пакетов, шлюзов, подписок, способов оплаты и вебхуков
- [AppHelper](../shared-libraries/app-helper) — npm-пакет, который поставляет реестр платёжных провайдеров и компоненты пожертвований
- [Структура модулей](../api/module-structure) — как модуль GivingApi организован на стороне сервера
