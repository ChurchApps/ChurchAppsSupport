---
title: "Giving Architecture"
---

# Giving Architecture

<div class="article-intro">

Ang ChurchApps ay gumagana ng mga donation sa isang gateway-rail model: ang simbahan ay nagpapanatili ng sariling Stripe (o PayPal, o Kingdom Funding) account, at ang B1 ay hindi kailanman nakaupo sa money path bilang platform processor. Ang card data ay tokenized sa browser at hindi kailanman umaabot sa ChurchApps server. Ang pahinang ito ay nagsasaad ng buong stack — ang client-side provider registry sa `@churchapps/apphelper`, ang GivingApi gateway abstraction, ang donation data model, at kung paano ang gateway webhooks ay nagsasaayos pabalik sa database.

</div>

## Pangkalahatang-ideya

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

Tatlong prinsipyo ang sumusuporta sa buong stack:

1. **Ang gateway ay sumusuporta sa card.** Bawat entry widget ng provider ay nag-tokenize sa browser; ang API ay tumatanggap lamang ng token, nonce, o order id.
2. **Isang abstraction, maraming providers.** Ang browser ay nilulutas ang `PaymentProvider` mula sa registry; ang server ay nilulutas ang `IGatewayProvider` mula sa factory. Pareho ay susi sa parehong normalized provider name na ina-imbak sa gateway record.
3. **Ang Webhooks ay ang source ng truth para sa settlement.** Ang charge response ay nire-record ng optimistic, ngunit ang signed webhook ng gateway ay kung ano ang nag-confirm (o lumilikha) ng completed donation, na may idempotency guards sa parehong panig.

## Client-side: ang payment provider registry (`@churchapps/apphelper`)

Ang registry ay nabubuhay sa `Packages/apphelper/src/donations/providers/`, na may widgets at helpers ng bawat provider sa sariling subfolder (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — walang wala sa `providers/` branches sa provider name. Ang `PaymentProvider` (tingnan ang `providers/types.ts`) ay nagsasama ng lahat ng kailangan ng host app para sa isang gateway: isang `descriptor` (admin labels, supported currencies, fee fields, default fee rates, dashboard/signup URLs), isang `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry, implicit save-on-tokenize), ang React widgets para sa member entry (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method editing (`MethodEditForm`), at form-question payments (`FormPayment`), kasama ang `buildChargeRequest(ctx, token)` — ang tanging lugar kung saan ang charge payload shape ay naiiba bawat provider. Ang `MemberWrapper` ng bawat provider ay nag-load ng sariling SDK mula sa public key ng gateway record, kaya ang host apps ay hindi kailanman nag-import ng gateway SDK (B1App at B1Admin ay walang `@stripe/*` dependency). Ang `pickDefaultGateway(gateways, capability?)` ay nakasentro sa kung aling isa sa mga gateway ng church ay dapat gamitin ng surface.

Ang `providers/registry.ts` ay nagtataglay ng built-ins. Sila ay **referenced by value**, hindi registered sa pamamagit ng module side-effect, kaya ang bundler's tree-shaking ay hindi maaaring mahulog ang registration:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Function | Layunin |
|----------|---------|
| `getPaymentProvider(name)` | Lumikas sa normalized name; bumabawi sa Stripe upang ang misconfigured provider ay hindi hard-crash ang donor form |
| `registerPaymentProvider(p)` | Mag-register ng karagdagang provider sa runtime (para sa custom gateway ng host app) |
| `listPaymentProviders()` | I-enumerate ang built-ins + custom — ginagamit upang bumuo ng admin gateway dropdown |
| `hasPaymentProvider(name)` | Membership check |

**Built-in client providers: Stripe, PayPal, Kingdom Funding.** B1App at B1Admin ay *bumabasang lamang* ang registry (`getPaymentProvider`, `listPaymentProviders`); walang tumatawag sa `registerPaymentProvider` — ang registration ay nanatili sa loob ng apphelper.

Bawat provider ay nag-tokenize ng iba, ngunit lahat ay pinapanatili ang card sa labas ng B1:

| Provider | Entry widget | Token ipinabalik sa API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | payment-method id (`pm_…`); bank sa pamamagit ng Financial Connections / ACH SetupIntent |
| Kingdom Funding | Hosted tokenizer form na may key ng gateway public key | single-use nonce |
| PayPal | PayPal Hosted Fields; server order na itinayo sa pamamagit ng `/donate/client-token` + `/donate/create-order` | captured order id |

Ang `finalizeResult` ng Stripe ay tumatakbo sa 3-D Secure / SCA sa browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) bago ang donation ay itinuring na kumpleto; ang shared form ay tumitawag lamang sa `provider.finalizeResult(result)` na walang kaalaman kung ano ang ginagawa nito.

## Server-side: ang gateway abstraction (GivingApi)

Ang `/giving` module (`Api/src/modules/giving`) ay nag-expose ng REST surface; ang gateway plumbing ay nabubuhay sa `Api/src/shared/helpers`. Ang `DonateController` ay hindi kailanman nakikipag-usap sa gateway SDK nang direkta — napupunta ito sa pamamagit ng `GatewayService`, na nilulutas ang tamang `IGatewayProvider` mula sa `GatewayFactory` at isinasagawa ito ng decrypted `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

Ang `IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ay ang kontrata na ipinapatupad ng bawat gateway — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), payment (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), at optional extras (customers, orders, SetupIntents, event replay). Bawat provider class ay nagpapahayag ng sariling `capabilities` matrix (supported currencies, ACH, refunds, subscription requirements, transaction limits) — ang `GatewayService.getProviderCapabilities(provider)` ay basahan lamang ito — at mga flag tulad ng `logsDonationsImmediately` ay nag-drive ng controller behavior nang walang provider-name conditionals sa mga controllers.

**Server providers na naka-register sa `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Palaging naka-on |
| PayPal | Palaging naka-on |
| Kingdom Funding | Palaging naka-on |
| Square | Opt-in sa pamamagit ng `ENABLE_SQUARE` environment flag |
| ePayMints | Opt-in sa pamamagit ng `ENABLE_EPAYMINTS` environment flag |

Ang mga custom providers ay maaaring maka-register sa runtime kung ang `ENABLE_CUSTOM_GATEWAY_PROVIDERS` ay naka-set; ang `AbstractExperimentalGatewayProvider` ay ang base class para sa mga iyon. Ang mga provider names ay tumutugma ng case-insensitively.

### Ang gateway configuration & secrets

Ang admin ay nag-save ng gateway credentials sa pamamagit ng `POST /giving/gateways` (`GatewayController`). Sa save ang controller ay nag-encrypt ng private at webhook keys gamit ang `EncryptionHelper` bago mag-persist, pagkatapos — sa anumang non-localhost host — ay nag-delete ng existing webhook ng church at nag-provision ng bagong isa na tumuturo sa `/giving/donate/webhook/{provider}?churchId=…`. Ang public reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ay nagbabalik lamang ng public keys.

## Data model

Ang giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, models sa `models/`) ay isang MySQL schema na na-access sa pamamagit ng Kysely:

| Talahanayan | Papel |
|-------|------|
| `gateways` | Per-church provider config: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Pagbibigay ng mga pangalan (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Paggrupo para sa entry/reporting (`name`, `batchDate`) |
| `donations` | Isang regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Allocation ng isang donation sa isa o higit pang funds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Recurring gift; `id` ay ang gateway's subscription id, na naka-link sa `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fund split para sa recurring gift |
| `customers` | Nag-link ng `personId` sa gateway customer id nito, per `provider` |
| `gatewayPaymentMethods` | Mga saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/event audit trail at dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Pledge campaigns na nakadikit sa fund, at ang bawat tao na pledged amount |

Ang isang donation ay nahahati sa mga fund sa pamamagit ng `fundDonations` — ang donation ay nagdadala ng total, bawat `fundDonation` ay nagdadala ng slice. Ang `donations.currency` at `gateways.currency` ay nagdadala ng ISO currency; bawat provider ay nag-advertise ng `supportedCurrencies` nito, at ang amounts ay na-format gamit ang `CurrencyHelper.formatCurrencyWithLocale`.

## End-to-end flows

### Member one-time at recurring (B1App)

Ang authenticated donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) ay nag-compose ng tatlong apphelper components: `MultiGatewayDonationForm`, `PaymentMethods`, at `RecurringDonations`. Ang B1App ay gumagawa ng nakapaligid na data-loading — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — at ipinasa ang gateway list; ang resolved provider ay nag-load ng sariling SDK mula sa gateway's public key. Ang charge mismo ay nangyayari sa loob ng apphelper: ang resolved provider ay nag-tokenize ng (bagong o saved) method, pagkatapos ay nagpadala sa `/giving/donate/charge` para sa one-time gift o `/giving/donate/subscribe` para sa recurring one. Ang recurring gifts ay lumilikha ng `subscriptions` row kasama ang `subscriptionFunds` at isinasagawa ang schedule sa gateway (Stripe Subscriptions, PayPal Billing Plans, o KF recurring schedule).

### Guest / anonymous giving

Ang public donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) at ang "give now" panel ay nag-render ng `NonAuthDonationWrapper` mula sa `@churchapps/apphelper/website`, na nag-inject ng reCAPTCHA at ang gateway's Elements context sa paligid ng provider's `GuestForm`. Ang mga guest ay walang login, walang saved methods, at walang history. Ang flow ay nag-fetch ng `GET /giving/funds/churchId/:id` at `GET /giving/donate/gateways/:churchId` (public keys lamang), nag-verify ng visitor na may `POST /giving/donate/captcha-verify`, nag-tokenize sa browser, at nagpadala sa `/giving/donate/charge` (o `/subscribe`). Ang guest ACH ay gumagamit ng anonymous `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Admin recording at Stripe import (B1Admin)

Ang B1Admin donations section (`B1Admin/src/donations/`) ay kung saan ang finance teams ay gumagana. Ang batch entry (`components/BulkDonationEntry.tsx`) ay nag-record ng cash/check/in-kind gifts sa pamamagit ng pagpadala `/giving/donations` pagkatapos `/giving/funddonations` — walang gateway na involved. Ang funds, batches, campaigns, at statements ay bawat isa ay nag-map sa kanilang `/giving/*` CRUD routes. Ang member-style donate panel (`B1Admin/src/donationComponents/`) ay ginagamit muli ang parehong apphelper components bilang B1App.

Ang Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) ay backfills ang mga regalo na ginawa sa labas ng B1: ito ay tumutawag sa `POST /giving/donate/replay-stripe-events` na may `dryRun: true` para sa preview, pagkatapos ay `dryRun: false` upang mag-import. Ang server ay naglalista ng Stripe events para sa date range at nag-skip ng anumang naka-record na — na tumutugma muna sa `eventLogs` provider id, pagkatapos sa `DonationRepo.findMatchingDonation` (amount + date + person) kaya ang re-run ay hindi kailanman double-imports.

## Webhooks at reconciliation

Ang settled payments at subscription state changes ay dumating sa `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Ang processing ay sinandig na idempotent:

1. **Mag-verify** — Ang `GatewayService.verifyWebhook` ay nag-delegate sa signature check ng provider; isang nabigong signature ay nagbabalik ng 401. Ang mga events na hindi kailangan ng processing ay short-circuit na may 200.
2. **Dedup ang event** — Ang `EventLogRepo.loadByProviderId` ay nag-skip ng webhook na naka-record na sa `eventLogs`.
3. **Dedup ang donation** — bago lumikha ng kahit ano, ang `DonationRepo.loadByTransactionId` ay sinusuri laban sa bawat candidate id na dala ng payload. Ito ay tumatanggap ng duplicate deliveries, multi-stage ACH events (pending → settled), at ang case kung saan ang `/donate/charge` ay nag-log na ng regalo na optimistic.
4. **Magpatakbo** — ang `classifyWebhookEvent(eventType)` ng provider ay nagsasabi kung ano ang kahulugan ng event (`donation` pending/complete, `cancel-subscription`, o `ignore`); ang completed payments ay lumilikha ng `complete` donation (o itinaas ang existing `pending` one), ang ACH-style events ay umaabot bilang `pending` hanggang settlement, at ang cancellation events ay nag-delete ng local `subscriptions` row. Ang controller ay hindi kailanman nag-inspect ng provider-specific event names.

Ang mga providers na may `logsDonationsImmediately` (PayPal, Kingdom Funding) ay may charges na naka-log mula sa `/charge` response (walang webhook round-trip na kailangan para sa happy path), habang ang Stripe ay umaasa sa `payment_intent.succeeded` / `invoice.paid` at ACH `payment_intent.processing`. Ang fee handling (`POST /giving/donate/fee`, ang `payFees` gateway flag, at ang bawat provider's `calculateFees`) ay kinakalkula ang "cover the fees" gross-up sa donor side — ang B1 ay hindi kumukuha ng platform cut, kaya walang application fee na kailanman naidagdag.

:::info
Ang charge at webhook paths ay nagsusulat ng parehong `donations` / `fundDonations` rows. Ang `transactionId` ay ang join key na pinapanatiling isang optimistic charge log at ang later webhook nito ay hindi gumagawa ng dalawang donations para sa isang regalo.
:::

## Mga Kaugnay na Pahina

- [Giving Endpoints](../api/endpoints/giving) — buong REST surface para sa donations, funds, batches, gateways, subscriptions, payment methods, at webhooks
- [AppHelper](../shared-libraries/app-helper) — ang npm package na nagdadala ng payment provider registry at donation components
- [Module Structure](../api/module-structure) — kung paano ang GivingApi module ay inorganisa sa server-side
