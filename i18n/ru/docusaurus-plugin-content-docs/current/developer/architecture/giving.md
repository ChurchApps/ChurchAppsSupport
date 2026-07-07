---
title: "Архитектура пожертвований"
---

# Архитектура пожертвований

<div class="article-intro">

ChurchApps запускает пожертвования на модели gateway-rail: церковь хранит свой собственный счет Stripe (или PayPal, или Kingdom Funding) и B1 никогда не сидит в пути денег как platform processor. Данные карты токенизированы в браузере и никогда не достигают сервера ChurchApps. На этой странице описана вся стек — registry provider на стороне клиента в `@churchapps/apphelper`, gateway abstraction GivingApi, модель данных пожертвований и как gateway webhooks согласовываются обратно в базу данных.

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

Три принципа держат всю стек:

1. **Gateway держит карту.** Каждый widget входа provider'а токенизирует в браузере; API только когда-либо получает token nonce или order id.
2. **Одна abstraction много providers.** Браузер разрешает `PaymentProvider` из registry; сервер разрешает `IGatewayProvider` из factory. Обе ключи off same нормализованный provider имя сохраненный на gateway record.
3. **Webhooks это источник истины для settlement.** Ответ charge записывается optimistically но gateway's подписано webhook это что confirms (или creates) the completed пожертвование с idempotency guards на обеих sides.

## Клиент-side: payment provider registry (`@churchapps/apphelper`)

Registry lives в `Packages/apphelper/src/donations/providers/` с каждым provider's widgets и helpers под его собственный subfolder (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — nothing outside `providers/` branches на provider имя. `PaymentProvider` (see `providers/types.ts`) bundles everything host app needs для one gateway: `descriptor` (admin labels supported currencies fee fields default fee rates dashboard/signup URLs) `capabilities` flag set (saved cards ACH recurring inline new-card entry implicit save-on-tokenize) React widgets для member entry (`MemberWrapper`/`MemberEntry`) guest giving (`GuestForm`) saved-method editing (`MethodEditForm`) и form-question платежи (`FormPayment`) плюс `buildChargeRequest(ctx, token)` — one место charge payload shape отличается per provider. Каждого provider's `MemberWrapper` загружает его собственный SDK из gateway record's public key поэтому host apps никогда не import gateway SDK (B1App и B1Admin имеют no `@stripe/*` dependency). `pickDefaultGateway(gateways, capability?)` centralizes который из church's gateways поверхность должна использовать.

`providers/registry.ts` holds built-ins. Они это **referenced by value** не registered через module side-effect поэтому bundler's tree-shaking может никогда drop registration:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Функция | Цель |
|----------|---------|
| `getPaymentProvider(name)` | Разрешить по нормализованному имени; falls back к Stripe поэтому misconfigured provider никогда hard-crashes доноре форма |
| `registerPaymentProvider(p)` | Зарегистрировать extra provider во время runtime (для host app's custom gateway) |
| `listPaymentProviders()` | Enumerate built-ins + custom — используется для построения admin gateway dropdown |
| `hasPaymentProvider(name)` | Membership check |

**Built-in клиент providers: Stripe, PayPal, Kingdom Funding.** B1App и B1Admin только *read* registry (`getPaymentProvider`, `listPaymentProviders`); neither calls `registerPaymentProvider` — registration stays внутри apphelper.

Каждый provider токенизирует по-другому но все keep карта out of B1:

| Provider | Entry widget | Token returned to API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | payment-method id (`pm_…`); bank через Financial Connections / ACH SetupIntent |
| Kingdom Funding | Hosted tokenizer форма keyed by gateway public key | single-use nonce |
| PayPal | PayPal Hosted Fields; server order built via `/donate/client-token` + `/donate/create-order` | captured order id |

Stripe's `finalizeResult` runs 3-D Secure / SCA в браузере (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) перед пожертвование считается complete; shared форма просто calls `provider.finalizeResult(result)` с no knowledge что это does.

## Сервер-side: gateway abstraction (GivingApi)

`/giving` модуль (`Api/src/modules/giving`) exposes REST поверхность; gateway plumbing lives в `Api/src/shared/helpers`. `DonateController` никогда не talks к gateway SDK directly — это goes через `GatewayService` который разрешает right `IGatewayProvider` из `GatewayFactory` и hands это decrypted `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) это contract каждый gateway implements — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`) платеж (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`) fees (`calculateFees`) saved-method handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) и optional extras (customers orders SetupIntents event replay). Каждый provider класс declares его собственный `capabilities` matrix (supported currencies ACH refunds subscription requirements transaction limits) — `GatewayService.getProviderCapabilities(provider)` просто reads это — и flags как `logsDonationsImmediately` drive controller поведение без any provider-name conditionals в controllers.

**Сервер providers registered в `GatewayFactory`:**

| Provider | Доступность |
|----------|-------------|
| Stripe | Всегда on |
| PayPal | Всегда on |
| Kingdom Funding | Всегда on |
| Square | Opt-in через `ENABLE_SQUARE` environment flag |
| ePayMints | Opt-in через `ENABLE_EPAYMINTS` environment flag |

Custom providers могут быть зарегистрированы во время runtime когда `ENABLE_CUSTOM_GATEWAY_PROVIDERS` это set; `AbstractExperimentalGatewayProvider` это base класс для those. Provider имена это matched case-insensitively.

### Gateway конфигурация & секреты

Admin сохраняет gateway credentials via `POST /giving/gateways` (`GatewayController`). На save контроллер encrypts private и webhook keys с `EncryptionHelper` перед persisting затем — на any non-localhost host — deletes church's существующий webhook и provisions fresh один pointed в `/giving/donate/webhook/{provider}?churchId=…`. Публичные reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) возвращают public keys только.

## Модель данных

Giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts` модели в `models/`) это MySQL schema accessed через Kysely:

| Таблица | Роль |
|-------|------|
| `gateways` | Per-church provider конфиг: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving designations (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Grouping для entry/reporting (`name`, `batchDate`) |
| `donations` | One gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`) `transactionId` |
| `fundDonations` | Allocation пожертвования across one или более funds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Recurring gift; `id` это gateway's subscription id linked к `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fund split для recurring gift |
| `customers` | Links `personId` к its gateway customer id per `provider` |
| `gatewayPaymentMethods` | Saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/event audit trail и dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Pledge campaigns tied к fund и каждого person's pledged amount |

Пожертвование это split across funds через `fundDonations` — пожертвование carries total каждый `fundDonation` carries slice. `donations.currency` и `gateways.currency` carry ISO currency; каждый provider advertises его `supportedCurrencies` и amounts это formatted с `CurrencyHelper.formatCurrencyWithLocale`.

## End-to-end потоки

### Member one-time и recurring (B1App)

Authenticated donate экран (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) composes три apphelper компоненты: `MultiGatewayDonationForm`, `PaymentMethods` и `RecurringDonations`. B1App does surrounding data-loading — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — и passes gateway список through; resolved provider загружает его собственный SDK из gateway's public key. Charge самое happens внутри apphelper: resolved provider токенизирует (new или saved) method затем posts к `/giving/donate/charge` для one-time gift или `/giving/donate/subscribe` для recurring один. Recurring gifts create `subscriptions` строка плюс `subscriptionFunds` и hand schedule к gateway (Stripe Subscriptions, PayPal Billing Plans или KF recurring schedule).

### Guest / anonymous giving

Public donate страница (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) и "give now" панель render `NonAuthDonationWrapper` из `@churchapps/apphelper/website` который injects reCAPTCHA и gateway's Elements context around provider's `GuestForm`. Guests get no login no saved methods и no история. Flow fetches `GET /giving/funds/churchId/:id` и `GET /giving/donate/gateways/:churchId` (public keys только) verifies visitor с `POST /giving/donate/captcha-verify` токенизирует в браузере и posts к `/giving/donate/charge` (или `/subscribe`). Guest ACH uses anonymous `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Admin recording и Stripe import (B1Admin)

B1Admin donations раздел (`B1Admin/src/donations/`) это где finance teams work. Batch entry (`components/BulkDonationEntry.tsx`) records cash/check/in-kind gifts by posting `/giving/donations` затем `/giving/funddonations` — no gateway involved. Funds batches campaigns и statements каждый map к their `/giving/*` CRUD маршруты. Member-style donate панель (`B1Admin/src/donationComponents/`) reuses same apphelper компоненты как B1App.

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) backfills gifts made outside B1: это calls `POST /giving/donate/replay-stripe-events` с `dryRun: true` для preview затем `dryRun: false` к import. Сервер lists Stripe события для date range и skips anything уже recorded — matched сначала by `eventLogs` provider id затем by `DonationRepo.findMatchingDonation` (amount + date + person) поэтому re-run никогда double-imports.

## Webhooks и reconciliation

Settled платежи и subscription state изменения arrive в `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Processing это deliberately idempotent:

1. **Verify** — `GatewayService.verifyWebhook` delegates к provider's signature check; failed signature returns 401. События это не нужно processing short-circuit с 200.
2. **Dedup событие** — `EventLogRepo.loadByProviderId` skips webhook уже recorded в `eventLogs`.
3. **Dedup пожертвование** — перед creating anything `DonationRepo.loadByTransactionId` это checked against каждый candidate id payload might carry. Это absorbs duplicate deliveries multi-stage ACH события (pending → settled) и case где `/donate/charge` уже logged gift optimistically.
4. **Apply** — provider's `classifyWebhookEvent(eventType)` says что события means (`donation` pending/complete `cancel-subscription` или `ignore`); completed платежи create `complete` пожертвование (или promote existing `pending` один) ACH-style события land как `pending` до settlement и cancellation события delete local `subscriptions` строка. Контроллер никогда не inspects provider-specific события имена.

Providers с `logsDonationsImmediately` (PayPal Kingdom Funding) имеют их charges logged из `/charge` ответ (no webhook round-trip required для happy путь) в то время как Stripe relies на `payment_intent.succeeded` / `invoice.paid` и ACH `payment_intent.processing`. Fee handling (`POST /giving/donate/fee` `payFees` gateway flag и каждый provider's `calculateFees`) computes "cover the fees" gross-up на donore side — B1 takes no platform cut поэтому no application fee это никогда added.

:::info
Charge и webhook paths write same `donations` / `fundDonations` строки. `transactionId` это join key это keeps optimistic charge log и its позже webhook из producing two пожертвования для one gift.
:::

## Связанные страницы

- [Giving Endpoints](../api/endpoints/giving) — полный REST поверхность для пожертвований funds batches gateways subscriptions платежные методы и webhooks
- [AppHelper](../shared-libraries/app-helper) — npm package это ships payment provider registry и donation компоненты
- [Module Structure](../api/module-structure) — как GivingApi модуль это organized server-side
