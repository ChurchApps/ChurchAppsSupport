---
title: "Архитектура Giving"
---

# Архитектура Giving

<div class="article-intro">

ChurchApps обрабатывает пожертвования по модели «шлюз-рельс»: церковь использует собственный аккаунт Stripe (или PayPal, Kingdom Funding, Paystack), а B1 никогда не находится в платежном потоке как платформенный процессор. Данные карты токенизируются в браузере и никогда не попадают на сервер ChurchApps. Эта страница описывает весь стек: реестр провайдеров на стороне клиента в `@churchapps/apphelper`, абстракцию шлюза GivingApi, модель данных пожертвований и то, как вебхуки шлюза сверяются с базой данных.

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

Три принципа действуют во всем стеке:

1. **Шлюз хранит карту.** Виджет ввода каждого провайдера токенизирует данные в браузере; API получает только токен, nonce или ID заказа.
2. **Одна абстракция, много провайдеров.** Браузер получает `PaymentProvider` из реестра; сервер получает `IGatewayProvider` из фабрики. Оба используют одно и то же нормализованное имя провайдера, которое хранится в записи шлюза.
3. **Вебхуки — источник истины для расчетов.** Ответ на списание записывается оптимистично, но подписанный вебхук шлюза подтверждает (или создает) завершенное пожертвование; с обеих сторон действуют защиты от повторной обработки (идемпотентность).

## Клиентская часть: реестр платежных провайдеров (`@churchapps/apphelper`)

Реестр находится в `Packages/apphelper/src/donations/providers/`, а виджеты и вспомогательные функции каждого провайдера — в его собственной подпапке (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Ничто за пределами `providers/` не ветвится по имени провайдера. `PaymentProvider` (см. `providers/types.ts`) объединяет все, что нужно host-приложению для одного шлюза: `descriptor` (подписи для админки, поддерживаемые валюты, поля комиссий, ставки комиссий по умолчанию, URL панели управления и регистрации), набор флагов `capabilities` (сохраненные карты, ACH, регулярные платежи, встроенный ввод новой карты, неявное сохранение при токенизации), React-виджеты для ввода участником (`MemberWrapper`/`MemberEntry`), гостевые пожертвования (`GuestForm`), редактирование сохраненных способов оплаты (`MethodEditForm`) и платежи за вопросы формы (`FormPayment`), а также `buildChargeRequest(ctx, token)` — единственное место, где структура запроса на списание различается между провайдерами. `MemberWrapper` каждого провайдера загружает собственный SDK по публичному ключу из записи шлюза, поэтому host-приложения никогда не импортируют SDK шлюза (у B1App и B1Admin нет зависимости от `@stripe/*`). `pickDefaultGateway(gateways, capability?)` централизует выбор того из шлюзов церкви, который должен использовать каждый экран.

`providers/registry.ts` содержит встроенные провайдеры. Они **передаются по значению**, а не регистрируются через побочный эффект модуля, поэтому tree-shaking сборщика никогда не может удалить регистрацию:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Функция | Назначение |
|----------|---------|
| `getPaymentProvider(name)` | Получить по нормализованному имени; при отсутствии возвращается Stripe, чтобы неправильно настроенный провайдер никогда не ломал форму пожертвований |
| `registerPaymentProvider(p)` | Зарегистрировать дополнительный провайдер во время выполнения (для пользовательского шлюза host-приложения) |
| `listPaymentProviders()` | Перечислить встроенные и пользовательские провайдеры — используется для выпадающего списка шлюзов в админке |
| `hasPaymentProvider(name)` | Проверка наличия |

**Встроенные клиентские провайдеры: Stripe, PayPal, Kingdom Funding, Paystack.** B1App и B1Admin только *читают* реестр (`getPaymentProvider`, `listPaymentProviders`); никто из них не вызывает `registerPaymentProvider` — регистрация остается внутри apphelper.

Каждый провайдер токенизирует по-своему, но все они держат карту вне B1:

| Провайдер | Виджет ввода | Токен, возвращаемый в API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; гостевая форма также монтирует `ExpressCheckoutElement` (Apple Pay / Google Pay, для разовых пожертвований), чей `onConfirm` возвращает тот же ID `pm_…` | ID способа оплаты (`pm_…`); банк через `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` для шлюзов в USD, канадский PAD `acss_debit` (модальное окно мандата, мандат `default_for` для счетов и подписок, разовые списания передают ID мандата) для шлюзов в CAD |
| Kingdom Funding | Размещенная форма токенизатора по публичному ключу шлюза | одноразовый nonce |
| PayPal | PayPal Hosted Fields (карта, регулярные платежи) плюс PayPal Smart Buttons с финансированием Venmo (разовые); оба используют одну загрузку SDK и серверный заказ, созданный через `/donate/client-token` + `/donate/create-order` | ID захваченного заказа |
| Paystack | Всплывающее окно Paystack Inline (`js.paystack.co/v2/inline.js`) — само окно проводит платеж (карта, мобильные деньги, банковский перевод, USSD) | ссылка на оплаченную транзакцию; сохраненные способы — коды авторизации Paystack `AUTH_…` |

Функция `finalizeResult` Stripe выполняет 3-D Secure / SCA в браузере (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), прежде чем пожертвование считается завершенным; общая форма просто вызывает `provider.finalizeResult(result)` и не знает, что именно он делает.

## Серверная часть: абстракция шлюза (GivingApi)

Модуль `/giving` (`Api/src/modules/giving`) предоставляет REST-интерфейс; логика шлюзов находится в `Api/src/shared/helpers`. `DonateController` никогда не обращается к SDK шлюза напрямую — он работает через `GatewayService`, который получает нужный `IGatewayProvider` из `GatewayFactory` и передает ему расшифрованную `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) — это контракт, который реализует каждый шлюз: жизненный цикл вебхуков (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), платежи (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), комиссии (`calculateFees`), работа с сохраненными способами оплаты (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) и необязательные дополнения (клиенты, заказы, SetupIntent, повторная обработка событий, `retryFailedPayment` для неудачного счета по подписке, `registerPaymentMethodDomain` для верификации домена Apple Pay). Если провайдер не реализует необязательный хук, действие для него считается неподдерживаемым, а элемент интерфейса скрывается. Каждый класс провайдера объявляет собственную матрицу `capabilities` (поддерживаемые валюты, ACH, возвраты, требования к подпискам, лимиты транзакций) — `GatewayService.getProviderCapabilities(provider)` просто читает ее. Флаги вроде `logsDonationsImmediately` управляют поведением контроллеров без условий по имени провайдера в контроллерах.

**Серверные провайдеры, зарегистрированные в `GatewayFactory`:**

| Провайдер | Доступность |
|----------|-------------|
| Stripe | Всегда включен |
| PayPal | Всегда включен |
| Kingdom Funding | Всегда включен |
| Paystack | Всегда включен (продавцы в Нигерии, Гане, ЮАР, Кении, Кот-д'Ивуаре; валюты NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Включается флагом окружения `ENABLE_SQUARE` |
| ePayMints | Включается флагом окружения `ENABLE_EPAYMINTS` |

Paystack отличается от остальных тем, что деньги движутся до того, как в дело вступает GivingApi: всплывающее окно списывает средства с донора, `processCharge` — это `GET /transaction/verify/:reference`, оплаченная сумма и валюта которого должны совпадать с записываемым пожертвованием (ссылка, уже находящаяся в базе, никогда не записывается дважды), а первый платеж регулярного расписания записывается из `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` с `start_date` через один интервал). Вебхуки подписываются самим секретным ключом (`x-paystack-signature`, HMAC-SHA512 по сырому телу), а у Paystack нет API управления вебхуками, поэтому административный экран показывает URL, который церковь должна вставить в свою панель управления. События продления `charge.success` не содержат разбивки по фондам; провайдер восстанавливает ее из локальных строк `subscriptions`/`subscriptionFunds` донора. Только авторизации карт являются `reusable` — пожертвования мобильными деньгами разовые, поэтому `createSubscription` отклоняет их. Демо-данные добавляют вторую церковь (Accra Community Church, `CHU00000002`) с тестовым шлюзом Paystack в GHS, чтобы набор Playwright для Paystack работал рядом с набором для Stripe Grace.

Пользовательские провайдеры можно регистрировать во время выполнения, если задана переменная `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` — базовый класс для них. Имена провайдеров сопоставляются без учета регистра.

### Конфигурация шлюза и секреты

Администратор сохраняет учетные данные шлюза через `POST /giving/gateways` (`GatewayController`). При сохранении контроллер шифрует закрытый и вебхук-ключи с помощью `EncryptionHelper` перед записью в базу, а затем — на любом хосте, отличном от localhost — удаляет существующий вебхук церкви и создает новый, указывающий на `/giving/donate/webhook/{provider}?churchId=…`. Церковь хранит одну строку на провайдера: сохранение шлюза заменяет только существующую строку для того же провайдера. Публичные чтения (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) возвращают только публичные ключи.

## Модель данных

Схема giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, модели в `models/`) — это схема MySQL, доступ к которой идет через Kysely:

| Таблица | Назначение |
|-------|------|
| `gateways` | Конфигурация провайдера церкви: `provider`, `publicKey`, зашифрованные `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Назначения пожертвований (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Группировка для ввода и отчетности (`name`, `batchDate`) |
| `donations` | Одно пожертвование: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; выписки, суммы, панели и отчеты о пожертвованиях учитывают только `complete` или null), `transactionId` |
| `fundDonations` | Распределение пожертвования между одним или несколькими фондами (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Регулярное пожертвование; `id` — это ID подписки в шлюзе, связан с `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Разбивка регулярного пожертвования по фондам |
| `customers` | Связывает `personId` с ID клиента в шлюзе для каждого `provider` |
| `gatewayPaymentMethods` | Сохраненные карты/банки: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Журнал аудита вебхуков/событий и ключ дедупликации (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Кампании обещаний, привязанные к фонду, и обещанная сумма каждого человека |

Пожертвование распределяется по фондам через `fundDonations` — пожертвование хранит общую сумму, а каждая `fundDonation` содержит свою долю. `donations.currency` и `gateways.currency` хранят код валюты ISO; каждый провайдер объявляет свои `supportedCurrencies`, а суммы форматируются через `CurrencyHelper.formatCurrencyWithLocale`.

## Сквозные сценарии

### Регулярные и разовые пожертвования участника (B1App)

Экран пожертвований для авторизованных пользователей (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) собирает три компонента apphelper: `MultiGatewayDonationForm`, `PaymentMethods` и `RecurringDonations`. B1App занимается окружающей загрузкой данных — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — и передает список шлюзов дальше; выбранный провайдер загружает собственный SDK по публичному ключу шлюза. Само списание происходит внутри apphelper: выбранный провайдер токенизирует (новый или сохраненный) способ оплаты, затем отправляет запрос в `/giving/donate/charge` для разового пожертвования или в `/giving/donate/subscribe` для регулярного. Оба эндпоинта относят вошедшего донора к его собственному `personId` (приписать пожертвование другому человеку может только владелец `donations.edit`) и отклоняют разбивки по фондам, сумма которых превышает списанную. Регулярные пожертвования создают строку `subscriptions` плюс `subscriptionFunds` и передают расписание шлюзу (Stripe Subscriptions, PayPal Billing Plans или регулярное расписание KF).

### Гостевые и анонимные пожертвования

Публичная страница пожертвований (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) и панель «give now» отображают `NonAuthDonationWrapper` из `@churchapps/apphelper/website`, который подключает reCAPTCHA и контекст Elements шлюза вокруг `GuestForm` провайдера. Гости не входят в систему, у них нет сохраненных способов оплаты и истории. Поток запрашивает `GET /giving/funds/churchId/:id` и `GET /giving/donate/gateways/:churchId` (только публичные ключи), проверяет посетителя через `POST /giving/donate/captcha-verify`, токенизирует данные в браузере и отправляет запрос в `/giving/donate/charge` (или `/subscribe`). ACH для гостей использует анонимный `POST /giving/paymentmethods/ach-setup-intent-anon`, который допускает только мгновенную (Financial Connections) верификацию: проверка микроплатежами завершается через несколько дней, когда страницы гостя уже нет, поэтому пожертвование никогда не было бы завершено. Форма отказывается списывать средства по неподтвержденному SetupIntent и направляет донора к карте или к настройке банка для вошедшего пользователя.

Три опции гостевой формы работают через один и тот же вызов списания. Параметры `?fundId=` и `?amount=` в URL страницы пожертвований предварительно выбирают разбивку по фондам (их читает гостевая форма каждого провайдера при монтировании и пропускает через обычный обработчик смены фонда, так что суммы и комиссии обновляются). `anonymous: true` заставляет `DonateController.charge` отбросить любого человека, которого прислал клиент, и записать пожертвование с `personId = null`; гостевая форма пропускает `/people/loadOrCreate` и шаг с клиентом/хранилищем, а три провайдера с немедленной записью перестают определять человека по клиенту шлюза. Apple Pay требует регистрации домена страницы в Stripe, поэтому гостевая форма Stripe один раз за сессию отправляет запрос на публичный, ограниченный по частоте `POST /giving/donate/register-domain`, который принимает только домен, принадлежащий церкви (`<subDomain>.b1.church`, строка в таблице доменов модуля контента или локальный хост), прежде чем обратиться к API способов оплаты для доменов Stripe.

### Ввод администратором и импорт из Stripe (B1Admin)

Раздел пожертвований в B1Admin (`B1Admin/src/donations/`) — это место работы финансовых команд. Пакетный ввод (`components/BulkDonationEntry.tsx`) записывает наличные/чеки/натуральные пожертвования, отправляя `/giving/donations`, затем `/giving/funddonations` — без участия шлюза. Диалог **Log a gift** на странице человека (`components/LogGiftDialog.tsx`) делает то же самое для одного пожертвования: сначала ищет пакет, у которого `batchDate` совпадает с датой пожертвования, или создает пакет с названием этой даты (`POST /giving/donationbatches`), а если более поздний шаг завершается ошибкой, удаляет пожертвование и новый пакет. Фонды, пакеты, кампании и выписки сопоставляются с маршрутами CRUD `/giving/*`. Панель пожертвований в стиле участника (`B1Admin/src/donationComponents/`) использует те же компоненты apphelper, что и B1App.

Отчетность и передача данных бухгалтерии выполняются на стороне клиента или через средство запуска отчетов, а не через шлюз: экспорт QuickBooks на странице пакета формирует CSV журнальных проводок из `donations` + `fundDonations` пакета (дебет Undeposited Funds, по одному кредиту на каждый фонд), представление Lapsed Givers на странице Summary запускает `Api/reports/lapsedGivers.json` через общее средство запуска отчетов с именами людей, разрешенными через `ReportOutput`, а форматы квитанций для стран (Canada / Australia / New Zealand) — это настройки церкви в хранилище ключ-значение membership, которые отображаются через `GivingStatementDocument` и дублируются на странице печати B1App. Страницы печати выписок B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) передают настройку `logoLight` церкви (через `usePrintLogo` в `B1Admin/src/components/PrintChurchHeader.tsx`), так что логотип печатается вверху каждой выписки, и ждут загрузки изображения перед автоматической печатью.

### Пересчет смешанных валют

Любой эндпоинт, который возвращает одну общую сумму по пожертвованиям, возможно, в разных валютах — сводные показатели giving (`GivingKpiCards`), сумма пакета пожертвований, сумма фонда и суммы с начала года/за период на экране пожертвований B1App, — пересчитывает их в валюту церкви по умолчанию на сервере, а не складывает разные валюты. `Api/src/shared/helpers/ExchangeRateHelper.ts` получает курсы с `api.frankfurter.dev` по ключу валюты церкви, кэширует их в памяти процесса на 12 часов и предоставляет `convertTotals(rows, churchCurrency, rates)`: строки предварительно группируются по валюте в SQL (несколько групп, а не пересчет каждого пожертвования), каждая группа пересчитывается и суммируется, а результат содержит флаг `isConverted`, по которому клиент показывает примечание «Converted at current exchange rates». `GET /donations/exchange-rates` предоставляет таблицу курсов клиентам, которым она нужна (экран пожертвований B1App); сами курсы никогда не принимаются из запроса, а только получаются на сервере, поэтому клиент не может повлиять на отчетную сумму. Отдельные записи пожертвований и исторические отчеты в исходной валюте никогда не пересчитываются — пересчитываются только общие суммы.

Импорт из Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) дозагружает пожертвования, сделанные вне B1: он вызывает `POST /giving/donate/replay-stripe-events` с `dryRun: true` для предпросмотра, затем с `dryRun: false` для импорта. Сервер получает события Stripe за диапазон дат и пропускает уже записанные: сначала по ID провайдера в `eventLogs`, затем по ID транзакции, затем через `DonationRepo.findMatchingDonation` (сумма + дата + человек), так что повторный запуск никогда не импортирует дубликаты. События `charge.succeeded` / `payment_intent.succeeded` по подпискам пропускаются, потому что эти пожертвования записывает `invoice.paid`; в новых версиях API Stripe поле `PaymentIntent.invoice` исчезло, поэтому пропуск также опирается на описание «Subscription …».

## Вебхуки и сверка

Подтвержденные платежи и изменения состояния подписок приходят на `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Обработка намеренно идемпотентна:

1. **Проверка** — `GatewayService.verifyWebhook` делегирует проверку подписи провайдеру; при неверной подписи возвращается 401. События, которые не требуют обработки, завершаются ответом 200.
2. **Дедупликация события** — `EventLogRepo.loadByProviderId` пропускает вебхук, уже записанный в `eventLogs`.
3. **Дедупликация пожертвования** — перед созданием чего-либо `DonationRepo.loadByTransactionId` проверяется по каждому кандидату на ID, который может содержать полезная нагрузка. Это поглощает повторные доставки, многоэтапные события ACH (ожидание → расчет) и случай, когда `/donate/charge` уже записал пожертвование оптимистично.
4. **Применение** — `classifyWebhookEvent(eventType)` провайдера определяет смысл события (`donation` pending/complete, `cancel-subscription` или `ignore`): завершенные платежи создают пожертвование `complete` (или переводят существующее `pending` или `failed`), события в стиле ACH попадают как `pending` до расчета, неудачный счет по подписке (Stripe `invoice.payment_failed`) создает пожертвование `failed` с ключом по ID счета, а события отмены удаляют локальную строку `subscriptions`. Контроллер никогда не анализирует имена событий, специфичные для провайдера.

### Неудачные регулярные пожертвования и dunning

Пожертвование `failed` — это единица работы для восстановления. `GET /giving/donations/failed` перечисляет их с последним сообщением о сбое шлюза из `eventLogs` и флагом `canRetry` из возможностей шлюза; `POST /giving/donate/retry/:donationId` вызывает `retryFailedPayment` провайдера (Stripe оплачивает открытый счет), а полученный вебхук переводит строку в `complete` через обычный путь дедупликации. Письма dunning отправляются донору из обработчика вебхуков в день 0, затем из `DunningHelper.run` в полуночном таймере (подключен и в `lambda/timer-handler.ts`, и в `RailwayCron.ts`) на 3-й и 7-й день; каждая отправка записывается в `eventLogs` как `provider: "dunning"`, `providerId: "<donationId>:<day>"`, поэтому повторный запуск никогда не отправит письмо дважды. Когда Stripe отказывается от попыток и отменяет подписку (`customer.subscription.deleted` с `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` отправляет донору одно письмо (`providerId: "<subscriptionId>:canceled"`); отмены, инициированные донором или администратором, остаются без уведомления. Stripe никогда не добавляет события к существующей конечной точке: после изменения `StripeHelper.webhookEvents` либо пересохраните шлюз, либо запустите `tools/manual/stripe-webhook-events.ts` (по умолчанию — пробный запуск, `--apply` для записи) против продакшена.

Провайдеры с `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) записывают списания из ответа `/charge` (для основного сценария не нужен обмен через вебхук), тогда как Stripe опирается на `payment_intent.succeeded` / `invoice.paid` и ACH `payment_intent.processing`. Обработка комиссий (`POST /giving/donate/fee`, флаг шлюза `payFees` и `calculateFees` каждого провайдера) вычисляет наценку «покрыть комиссии» на стороне донора — B1 не берет платформенной доли, поэтому никогда не добавляется комиссия приложения.

:::info
Пути списания и вебхуков записывают одни и те же строки `donations` / `fundDonations`. `transactionId` — это ключ связи, который не дает оптимистичной записи списания и последующему вебхуку создать два пожертвования за один подарок.
:::

## Связанные страницы

- [Эндпоинты Giving](../api/endpoints/giving) — полный REST-интерфейс для пожертвований, фондов, пакетов, шлюзов, подписок, способов оплаты и вебхуков
- [AppHelper](../shared-libraries/app-helper) — npm-пакет, который поставляет реестр платежных провайдеров и компоненты пожертвований
- [Структура модулей](../api/module-structure) — как организован модуль GivingApi на стороне сервера
