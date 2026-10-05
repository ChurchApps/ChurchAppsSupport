---
title: "Архитектура пожертвований"
---

# Архитектура пожертвований

<div class="article-intro">

ChurchApps запускает пожертвования на модели gateway-rail: церковь хранит свой собственный аккаунт Stripe (или PayPal, Kingdom Funding, или Paystack), и B1 никогда не находится в пути денег как процессор платформы. Данные карты tokenized в браузере и никогда не доходят до сервера ChurchApps. Эта страница отображает весь стек — registry поставщиков на стороне клиента в `@churchapps/apphelper`, gateway abstraction GivingApi, модель данных пожертвований, и как gateway webhooks примирение обратно в базу данных.

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

Three принципы hold через весь стек:

1. **Gateway держит карту.** Каждый widget entry поставщика tokenizes в браузере; API только когда-либо получает token, nonce, или order id.
2. **One abstraction, много поставщиков.** Browser resolves `PaymentProvider` из registry; server resolves `IGatewayProvider` из factory. Both key off same normalized provider name stored на gateway record.
3. **Webhooks it source of truth для settlement.** Charge response это recorded optimistically, но gateway's signed webhook это что confirms (или creates) completed donation, с idempotency guards на both sides.

## Client-side: registry поставщика платежей (`@churchapps/apphelper`)

Registry lives в `Packages/apphelper/src/donations/providers/`, с каждым provider's widgets и helpers под his own subfolder (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nothing outside `providers/` branches на provider name. `PaymentProvider` (см. `providers/types.ts`) bundles все что host app needs для one gateway: `descriptor` (admin labels, supported currencies, fee fields, default fee rates, dashboard/signup URLs), `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry, implicit save-on-tokenize), React widgets для member entry (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method editing (`MethodEditForm`), и form-question payments (`FormPayment`), плюс `buildChargeRequest(ctx, token)` — one place charge payload shape это differs per provider. Каждый provider's `MemberWrapper` loads its own SDK из gateway record's public key, поэтому host apps никогда не import gateway SDK (B1App и B1Admin have no `@stripe/*` dependency). `pickDefaultGateway(gateways, capability?)` centralizes какой из church's gateways surface should use.

`providers/registry.ts` holds built-ins. Они это **referenced by value**, not registered через module side-effect, поэтому bundler's tree-shaking может никогда не drop registration:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | Purpose |
|----------|---------|
| `getPaymentProvider(name)` | Resolve по normalized name; falls back к Stripe поэтому misconfigured provider никогда hard-crashes donor form |
| `registerPaymentProvider(p)` | Register extra provider в runtime (для host app's custom gateway) |
| `listPaymentProviders()` | Enumerate built-ins + custom — used к build admin gateway dropdown |
| `hasPaymentProvider(name)` | Membership check |

**Built-in client providers: Stripe, PayPal, Kingdom Funding, Paystack.** B1App и B1Admin только *read* registry (`getPaymentProvider`, `listPaymentProviders`); neither calls `registerPaymentProvider` — registration stays inside apphelper.

Каждый provider tokenizes differently, но все keep card out of B1:

| Provider | Entry widget | Token returned to API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; guest form также mounts `ExpressCheckoutElement` (Apple Pay / Google Pay, one-time gifts) чья `onConfirm` resolves к same `pm_…` id | payment-method id (`pm_…`); bank via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` для USD gateways, Canadian PAD `acss_debit` (hosted mandate modal, mandate `default_for` invoices/subscriptions, one-off charges pass mandate id) для CAD gateways |
| Kingdom Funding | Hosted tokenizer form keyed by gateway public key | single-use nonce |
| PayPal | PayPal Hosted Fields (card, recurring) плюс PayPal Smart Buttons с Venmo funding (one-time); both share one SDK load и server order built via `/donate/client-token` + `/donate/create-order` | captured order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) — popup itself takes payment (card, mobile money, bank transfer, USSD) | paid transaction reference; saved methods это Paystack `AUTH_…` authorization codes |

Stripe's `finalizeResult` runs 3-D Secure / SCA в браузере (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) перед donation это considered complete; shared form just calls `provider.finalizeResult(result)` с no knowledge что это does.

## Server-side: gateway abstraction (GivingApi)

`/giving` module (`Api/src/modules/giving`) exposes REST surface; gateway plumbing lives в `Api/src/shared/helpers`. `DonateController` никогда не talks to gateway SDK directly — это goes через `GatewayService`, который resolves right `IGatewayProvider` из `GatewayFactory` и hands ему decrypted `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) это contract каждый gateway implements — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), payment (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), и optional extras (customers, orders, SetupIntents, event replay, `retryFailedPayment` для failed subscription invoice, `registerPaymentMethodDomain` для Apple Pay domain verification). Provider это omits optional hook это reported как unsupported для that action и UI hides control. Каждый provider class declares its own `capabilities` matrix (supported currencies, ACH, refunds, subscription requirements, transaction limits) — `GatewayService.getProviderCapabilities(provider)` just reads it — и flags как `logsDonationsImmediately` drive controller behavior без any provider-name conditionals в controllers.

**Server providers registered в `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Always on |
| PayPal | Always on |
| Kingdom Funding | Always on |
| Paystack | Always on (Nigeria, Ghana, South Africa, Kenya, Côte d'Ivoire merchants; currencies NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via `ENABLE_SQUARE` environment flag |
| ePayMints | Opt-in via `ENABLE_EPAYMINTS` environment flag |

Paystack differs из others в что money moves перед GivingApi это involved: popup charges donor, `processCharge` это `GET /transaction/verify/:reference` чья paid amount и currency must match donation being recorded (reference это already на file никогда не logged twice), и first gift of recurring schedule это logged из `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` с `start_date` one interval out). Webhooks это signed с secret key itself (`x-paystack-signature`, HMAC-SHA512 over raw body) и Paystack has no webhook-management API, поэтому admin screen shows URL для church к paste into its dashboard. Renewal `charge.success` events carry no fund split; provider recovers it из donor's local `subscriptions`/`subscriptionFunds` rows. Только card authorizations это `reusable` — mobile money gifts это one-time only, поэтому `createSubscription` refuses them. Demo data seeds second church (Accra Community Church, `CHU00000002`) на Paystack test-mode GHS gateway поэтому Paystack Playwright suite runs beside Grace's Stripe one.

Custom providers могут be registered в runtime когда `ENABLE_CUSTOM_GATEWAY_PROVIDERS` это set; `AbstractExperimentalGatewayProvider` это base class для those. Provider names это matched case-insensitively.

### Gateway configuration & secrets

Admin saves gateway credentials via `POST /giving/gateways` (`GatewayController`). On save controller encrypts private и webhook keys с `EncryptionHelper` перед persisting, затем — на any non-localhost host — deletes church's existing webhook и provisions fresh one pointed в `/giving/donate/webhook/{provider}?churchId=…`. Church keeps one row per provider: saving gateway replaces только existing row для that same provider. Public reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) return public keys only.

## Data model

Giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, models в `models/`) это MySQL schema accessed через Kysely:

| Table | Role |
|-------|------|
| `gateways` | Per-church provider config: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving designations (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Grouping для entry/reporting (`name`, `batchDate`) |
| `donations` | One gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; statements, totals, dashboards и donation reports count только `complete` или null), `transactionId` |
| `fundDonations` | Allocation of donation через один или more funds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Recurring gift; `id` это gateway's subscription id, linked к `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fund split для recurring gift |
| `customers` | Links `personId` к its gateway customer id, per `provider` |
| `gatewayPaymentMethods` | Saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/event audit trail и dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Pledge campaigns tied к fund, и каждый person's pledged amount |

Donation это split через funds через `fundDonations` — donation carries total, каждый `fundDonation` carries slice. `donations.currency` и `gateways.currency` carry ISO currency; каждый provider advertises its `supportedCurrencies`, и amounts это formatted с `CurrencyHelper.formatCurrencyWithLocale`.

## End-to-end flows

### Member one-time и recurring (B1App)

Authenticated donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) composes три apphelper components: `MultiGatewayDonationForm`, `PaymentMethods`, и `RecurringDonations`. B1App does surrounding data-loading — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — и passes gateway list through; resolved provider loads its own SDK из gateway's public key. Charge itself happens inside apphelper: resolved provider tokenizes (new или saved) method, затем posts к `/giving/donate/charge` для one-time gift или `/giving/donate/subscribe` для recurring one. Both endpoints attribute signed-in donor к their own `personId` (только `donations.edit` holders may attribute к someone else) и reject fund splits что add up к more than charged amount. Recurring gifts create `subscriptions` row плюс `subscriptionFunds` и hand schedule к gateway (Stripe Subscriptions, PayPal Billing Plans, или KF recurring schedule).

### Guest / anonymous giving

Public donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) и "give now" panel render `NonAuthDonationWrapper` из `@churchapps/apphelper/website`, который injects reCAPTCHA и gateway's Elements context around provider's `GuestForm`. Guests get no login, no saved methods, и no history. Flow fetches `GET /giving/funds/churchId/:id` и `GET /giving/donate/gateways/:churchId` (public keys only), verifies visitor с `POST /giving/donate/captcha-verify`, tokenizes в browser, и posts к `/giving/donate/charge` (или `/subscribe`). Guest ACH uses anonymous `POST /giving/paymentmethods/ach-setup-intent-anon`.

Three guest-form options ride на same charge call. `?fundId=` и `?amount=` на donate URL preselect fund split (read by каждый provider's guest form на mount, routed через normal fund-change handler поэтому totals и fees update). `anonymous: true` makes `DonateController.charge` discard any person client sent и log gift с `personId = null`; guest form skips `/people/loadOrCreate` и customer/vault step, и three immediate-log providers stop resolving person из gateway customer. Apple Pay needs page's domain registered с Stripe, поэтому Stripe guest form posts once per session к public, rate-limited `POST /giving/donate/register-domain`, который only accepts domain что belongs к church (`<subDomain>.b1.church`, row в content module's domains table, или local host) перед calling Stripe's payment-method-domains API.

### Admin recording и Stripe import (B1Admin)

B1Admin donations section (`B1Admin/src/donations/`) это где finance teams work. Batch entry (`components/BulkDonationEntry.tsx`) records cash/check/in-kind gifts by posting `/giving/donations` затем `/giving/funddonations` — no gateway involved. Funds, batches, campaigns, и statements каждый map к their `/giving/*` CRUD routes. Member-style donate panel (`B1Admin/src/donationComponents/`) reuses same apphelper components как B1App.

Reporting и accounting hand-offs это client-side или report-runner work, не gateway work: batch page's QuickBooks export builds journal-entry CSV из batch's `donations` + `fundDonations` (debit Undeposited Funds, one credit per fund), Lapsed Givers tab runs `Api/reports/lapsedGivers.json` через generic report runner с person names resolved by `ReportOutput`, и country receipt formats (Canada / Australia / New Zealand) это church settings в membership key/value store rendered by `GivingStatementDocument` и duplicated в B1App print page.

### Converting mixed-currency totals

Any endpoint это returns single combined total across possibly-mixed-currency gifts — giving summary KPIs (`GivingKpiCards`), donation batch total, fund total, и B1App donate screen's year-to-date/period totals — converts к church's default currency server-side вместо summing unlike currencies. `Api/src/shared/helpers/ExchangeRateHelper.ts` fetches rates из `api.frankfurter.dev` keyed by church currency, caches them in-process для 12 hours, и exposes `convertTotals(rows, churchCurrency, rates)`: rows это pre-grouped by currency в SQL (handful of groups, никогда per-gift conversion), каждый group это converted и summed, и result carries `isConverted` flag client uses к show "Converted в current exchange rates" note. `GET /donations/exchange-rates` exposes rate table к clients это need it (B1App's donate screen); rates themselves это никогда accepted из request, только ever fetched server-side, поэтому client не может influence reported total. Individual donation records и historical/original-currency reports это никогда converted — только combined totals это.

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) backfills gifts made outside B1: это calls `POST /giving/donate/replay-stripe-events` с `dryRun: true` для preview, затем `dryRun: false` к import. Server lists Stripe events для date range и skips anything already recorded — matched first by `eventLogs` provider id, затем by `DonationRepo.findMatchingDonation` (amount + date + person) поэтому re-run никогда не double-imports.

## Webhooks и reconciliation

Settled payments и subscription state changes arrive в `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Processing это deliberately idempotent:

1. **Verify** — `GatewayService.verifyWebhook` delegates к provider's signature check; failed signature returns 401. Events это don't need processing short-circuit с 200.
2. **Dedup event** — `EventLogRepo.loadByProviderId` skips webhook это already recorded в `eventLogs`.
3. **Dedup donation** — перед creating anything, `DonationRepo.loadByTransactionId` это checked против every candidate id payload might carry. Это absorbs duplicate deliveries, multi-stage ACH events (pending → settled), и case где `/donate/charge` already logged gift optimistically.
4. **Apply** — provider's `classifyWebhookEvent(eventType)` says что event means (`donation` pending/complete, `cancel-subscription`, или `ignore`); completed payments create `complete` donation (или promote existing `pending` или `failed` one), ACH-style events land как `pending` until settlement, failed subscription invoice (Stripe `invoice.payment_failed`) creates `failed` donation keyed на invoice id, и cancellation events delete local `subscriptions` row. Controller никогда не inspects provider-specific event names.

### Failed recurring gifts и dunning

`failed` donation это unit of work для recovery. `GET /giving/donations/failed` lists them с newest gateway failure message из `eventLogs` и `canRetry` flag из gateway's capabilities; `POST /giving/donate/retry/:donationId` calls provider's `retryFailedPayment` (Stripe pays open invoice), и resulting webhook promotes row к `complete` через normal dedup path. Dunning emails go к donor из webhook handler на day 0, затем из `DunningHelper.run` в midnight timer (wired в both `lambda/timer-handler.ts` и `RailwayCron.ts`) на 3 и 7 days; каждый send это recorded в `eventLogs` как `provider: "dunning"`, `providerId: "<donationId>:<day>"`, поэтому rerun никогда не emails twice. Когда Stripe gives up и cancels subscription (`customer.subscription.deleted` с `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` emails donor once (`providerId: "<subscriptionId>:canceled"`); donor- или admin-initiated cancels stay silent. Stripe никогда не adds events к existing endpoint: после changing `StripeHelper.webhookEvents`, либо re-save gateway либо run `tools/manual/stripe-webhook-events.ts` (dry run by default, `--apply` к write) against prod.

Providers с `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) have their charges logged из `/charge` response (no webhook round-trip required для happy path), while Stripe relies на `payment_intent.succeeded` / `invoice.paid` и ACH `payment_intent.processing`. Fee handling (`POST /giving/donate/fee`, `payFees` gateway flag, и каждый provider's `calculateFees`) computes "cover fees" gross-up на donor side — B1 takes no platform cut, поэтому no application fee это ever added.

:::info
Charge и webhook paths write same `donations` / `fundDonations` rows. `transactionId` это join key это keeps optimistic charge log и its later webhook из producing two donations для one gift.
:::

## Связанные страницы

- [Giving Endpoints](../api/endpoints/giving) — full REST surface для donations, funds, batches, gateways, subscriptions, payment methods, и webhooks
- [AppHelper](../shared-libraries/app-helper) — npm package это ships payment provider registry и donation components
- [Module Structure](../api/module-structure) — how GivingApi module это organized server-side
