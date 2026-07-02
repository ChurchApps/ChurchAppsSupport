---
title: "Giving Architecture"
---

# Giving Architecture

<div class="article-intro">

ChurchApps runs donations on a gateway-rail model: the church keeps its own Stripe (or PayPal, or Kingdom Funding) account, and B1 never sits in the money path as a platform processor. Card data is tokenized in the browser and never reaches a ChurchApps server. This page maps the whole stack — the client-side provider registry in `@churchapps/apphelper`, the GivingApi gateway abstraction, the donation data model, and how gateway webhooks reconcile back into the database.

</div>

## Overview

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

Three principles hold across the stack:

1. **The gateway holds the card.** Every provider's entry widget tokenizes in the browser; the API only ever receives a token, nonce, or order id.
2. **One abstraction, many providers.** The browser resolves a `PaymentProvider` from a registry; the server resolves an `IGatewayProvider` from a factory. Both key off the same normalized provider name stored on the gateway record.
3. **Webhooks are the source of truth for settlement.** A charge response is recorded optimistically, but the gateway's signed webhook is what confirms (or creates) the completed donation, with idempotency guards on both sides.

## Client-side: the payment provider registry (`@churchapps/apphelper`)

The registry lives in `Packages/apphelper/src/donations/providers/`. A `PaymentProvider` (see `providers/types.ts`) bundles everything a host app needs for one gateway: a `descriptor` (admin labels, supported currencies, fee fields, signup URL), a `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry), the React widgets for member and guest entry, and a `buildChargeRequest(ctx, token)` function — the one place the charge payload shape differs per provider.

`providers/registry.ts` holds the built-ins. They are **referenced by value**, not registered through a module side-effect, so a bundler's tree-shaking can never drop the registration:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Function | Purpose |
|----------|---------|
| `getPaymentProvider(name)` | Resolve by normalized name; falls back to Stripe so a misconfigured provider never hard-crashes the donor form |
| `registerPaymentProvider(p)` | Register an extra provider at runtime (for a host app's custom gateway) |
| `listPaymentProviders()` | Enumerate built-ins + custom — used to build the admin gateway dropdown |
| `hasPaymentProvider(name)` | Membership check |

**Built-in client providers: Stripe, PayPal, Kingdom Funding.** B1App and B1Admin only *read* the registry (`getPaymentProvider`, `listPaymentProviders`); neither calls `registerPaymentProvider` — registration stays inside apphelper.

Each provider tokenizes differently, but all keep the card out of B1:

| Provider | Entry widget | Token returned to API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | payment-method id (`pm_…`); bank via Financial Connections / ACH SetupIntent |
| Kingdom Funding | Hosted tokenizer form keyed by the gateway public key | single-use nonce |
| PayPal | PayPal Hosted Fields; server order built via `/donate/client-token` + `/donate/create-order` | captured order id |

Stripe's `finalizeResult` runs 3-D Secure / SCA in the browser (`DonationHelper.handle3DSIfRequired` → `stripe.confirmCardPayment`) before the donation is considered complete.

## Server-side: the gateway abstraction (GivingApi)

The `/giving` module (`Api/src/modules/giving`) exposes the REST surface; the gateway plumbing lives in `Api/src/shared/helpers`. `DonateController` never talks to a gateway SDK directly — it goes through `GatewayService`, which resolves the right `IGatewayProvider` from `GatewayFactory` and hands it a decrypted `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) is the contract every gateway implements — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`), payment (`processCharge`, `createSubscription`, `cancelSubscription`), fees (`calculateFees`), and optional capabilities (customers, saved payment methods, orders, SetupIntents). `GatewayService.getProviderCapabilities(provider)` returns a static capability matrix (supported currencies, ACH, refunds, subscription requirements, transaction limits) used to gate flows before a call is attempted.

**Server providers registered in `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Always on |
| PayPal | Always on |
| Kingdom Funding | Always on |
| Square | Opt-in via the `ENABLE_SQUARE` environment flag |
| ePayMints | Opt-in via the `ENABLE_EPAYMINTS` environment flag |

Custom providers can be registered at runtime when `ENABLE_CUSTOM_GATEWAY_PROVIDERS` is set; `AbstractExperimentalGatewayProvider` is the base class for those. Provider names are matched case-insensitively.

### Gateway configuration & secrets

An admin saves gateway credentials via `POST /giving/gateways` (`GatewayController`). On save the controller encrypts the private and webhook keys with `EncryptionHelper` before persisting, then — on any non-localhost host — deletes the church's existing webhook and provisions a fresh one pointed at `/giving/donate/webhook/{provider}?churchId=…`. Public reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) return public keys only.

## Data model

The giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, models in `models/`) is a MySQL schema accessed through Kysely:

| Table | Role |
|-------|------|
| `gateways` | Per-church provider config: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving designations (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Grouping for entry/reporting (`name`, `batchDate`) |
| `donations` | One gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Allocation of a donation across one or more funds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Recurring gift; `id` is the gateway's subscription id, linked to `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fund split for a recurring gift |
| `customers` | Links a `personId` to its gateway customer id, per `provider` |
| `gatewayPaymentMethods` | Saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/event audit trail and dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Pledge campaigns tied to a fund, and each person's pledged amount |

A donation is split across funds through `fundDonations` — the donation carries the total, each `fundDonation` carries a slice. `donations.currency` and `gateways.currency` carry the ISO currency; each provider advertises its `supportedCurrencies`, and amounts are formatted with `CurrencyHelper.formatCurrencyWithLocale`.

## End-to-end flows

### Member one-time and recurring (B1App)

The authenticated donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) composes three apphelper components: `MultiGatewayDonationForm`, `PaymentMethods`, and `RecurringDonations`. B1App does the surrounding data-loading — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — and Stripe is loaded from the gateway's public key. The charge itself happens inside apphelper: the resolved provider tokenizes the (new or saved) method, then posts to `/giving/donate/charge` for a one-time gift or `/giving/donate/subscribe` for a recurring one. Recurring gifts create a `subscriptions` row plus `subscriptionFunds` and hand the schedule to the gateway (Stripe Subscriptions, PayPal Billing Plans, or a KF recurring schedule).

### Guest / anonymous giving

The public donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) and the "give now" panel render `NonAuthDonationWrapper` from `@churchapps/apphelper/website`, which injects reCAPTCHA and the gateway's Elements context around the provider's `GuestForm`. Guests get no login, no saved methods, and no history. The flow fetches `GET /giving/funds/churchId/:id` and `GET /giving/donate/gateways/:churchId` (public keys only), verifies the visitor with `POST /giving/donate/captcha-verify`, tokenizes in the browser, and posts to `/giving/donate/charge` (or `/subscribe`). Guest ACH uses the anonymous `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Admin recording and Stripe import (B1Admin)

The B1Admin donations section (`B1Admin/src/donations/`) is where finance teams work. Batch entry (`components/BulkDonationEntry.tsx`) records cash/check/in-kind gifts by posting `/giving/donations` then `/giving/funddonations` — no gateway involved. Funds, batches, campaigns, and statements each map to their `/giving/*` CRUD routes. The member-style donate panel (`B1Admin/src/donationComponents/`) reuses the same apphelper components as B1App.

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) backfills gifts made outside B1: it calls `POST /giving/donate/replay-stripe-events` with `dryRun: true` for a preview, then `dryRun: false` to import. The server lists Stripe events for the date range and skips anything already recorded — matched first by `eventLogs` provider id, then by `DonationRepo.findMatchingDonation` (amount + date + person) so a re-run never double-imports.

## Webhooks and reconciliation

Settled payments and subscription state changes arrive at `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Processing is deliberately idempotent:

1. **Verify** — `GatewayService.verifyWebhook` delegates to the provider's signature check; a failed signature returns 401. Events that don't need processing short-circuit with 200.
2. **Dedup the event** — `EventLogRepo.loadByProviderId` skips a webhook already recorded in `eventLogs`.
3. **Dedup the donation** — before creating anything, `DonationRepo.loadByTransactionId` is checked against every candidate id the payload might carry. This absorbs duplicate deliveries, multi-stage ACH events (pending → settled), and the case where `/donate/charge` already logged the gift optimistically.
4. **Apply** — completed payments create a `complete` donation (or promote an existing `pending` one); ACH-style events land as `pending` until settlement; subscription-cancellation events delete the local `subscriptions` row.

PayPal and Kingdom Funding charges are logged immediately from the `/charge` response (no webhook round-trip required for the happy path), while Stripe relies on `payment_intent.succeeded` / `invoice.paid` and ACH `payment_intent.processing`. Fee handling (`POST /giving/donate/fee`, the `payFees` gateway flag, and each provider's `calculateFees`) computes the "cover the fees" gross-up on the donor side — B1 takes no platform cut, so no application fee is ever added.

:::info
The charge and webhook paths write the same `donations` / `fundDonations` rows. The `transactionId` is the join key that keeps an optimistic charge log and its later webhook from producing two donations for one gift.
:::

## Related Pages

- [Giving Endpoints](../api/endpoints/giving) — full REST surface for donations, funds, batches, gateways, subscriptions, payment methods, and webhooks
- [AppHelper](../shared-libraries/app-helper) — the npm package that ships the payment provider registry and donation components
- [Module Structure](../api/module-structure) — how the GivingApi module is organized server-side
