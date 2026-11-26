---
title: "Giving Endpoints"
description: "Reference for the Giving API endpoints in ChurchApps: donations, batches, funds, campaigns and pledges, gateways, subscriptions, and payment methods, with auth and permission rules."
---

# Giving Endpoints

<div class="article-intro">

The Giving module manages donations, funds, pledge campaigns, payment processing, subscriptions, and related financial operations. It supports multiple payment gateways (Stripe, PayPal), handles one-time and recurring donations, tracks donation batches, records pledges against campaigns, and provides webhook processing for asynchronous payment events.

</div>

**Base path:** `/giving`

## Donations

Base path: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own personId | List all donations. Filter by `?batchId=` or `?personId=`. With `?personId=`, gifts to non-deductible funds are left out (as on giving statements) unless a Donations.View caller adds `&includeNonDeductible=1`, which B1Admin's person record does. With `?startDate=&endDate=` instead (Donations.View only), returns the donations dated within the range (inclusive); both dates are required as `YYYY-MM-DD`, otherwise `400`. B1Admin's giving statements pages request one calendar year this way instead of the church's full history |
| GET | `/:id` | JWT | Donations.View | Get a donation by ID |
| GET | `/my` | JWT | — | Get current user's donations |
| GET | `/my/summary?year=` | JWT | — | Current user's giving total for a year (default this year): `{ year, total, count, currency, isConverted }`, with totals converted to the church currency. Backs the giving preview on the member home page |
| GET | `/summary` | JWT | Donations.ViewSummary | Get donation summary. Filter by `?startDate=&endDate=&type=`. Use `type=person` for per-person breakdown |
| GET | `/kpis?startDate=&endDate=&fundId=` | JWT | Donations.ViewSummary | Dashboard totals for the date range (everything since 2000 up to now when omitted), optionally for one fund: `{ totalGiving, avgGift, donorCount, donationCount, currency, isConverted, amountsByCurrency }`. Counts only donations whose status is `complete` or unset. Amounts are converted to the church currency with the server's exchange rates |
| GET | `/exchange-rates` | JWT | — | The church currency and the server's exchange-rate table for it: `{ base, rates, asOf }`. `base` is the first gateway's currency, else the church's `currency` setting, else `usd`; `rates` is empty when no rates are available. Rates are never accepted from a client |
| GET | `/failed` | JWT | Donations.View | List donations with status `failed`, newest first. Each row adds `gatewayMessage` (the latest failure message logged for that donor's gateway customer) and `canRetry` (true when one of the church's gateways supports retrying). Retry one with `POST /giving/donate/retry/:donationId` |
| POST | `/` | JWT | Donations.Edit or Donations.Enter | Create or update donations (batch). With Donations.Enter only, both the target batch and (for an update) the donation's current batch must be open, and gateway gifts (those with a `transactionId`) can't be changed; otherwise `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit or Donations.Enter | Delete a donation. Donations.Enter only: the donation must be in an open batch and not a gateway gift, otherwise `403` |

### Example: List Donations by Batch

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Example: Get Donation Summary

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Donation Batches

Base path: `/giving/donationbatches`

Deleting a batch also deletes all donations within the batch.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary or Donations.Enter | List all donation batches |
| GET | `/:id` | JWT | Donations.ViewSummary or Donations.Enter | Get a donation batch by ID |
| POST | `/` | JWT | Donations.Edit or Donations.Enter | Create or update donation batches. Donations.Enter only: updating an existing batch requires it to be open, otherwise `403 { "error": "This batch is closed." }`. `status` is ignored here, so saving a batch can't reopen it |
| POST | `/:id/close` | JWT | Donations.Edit | Close a batch: sets `status` to `closed`, `closedDate` to now, and `closedBy` to the caller's user id. Returns the batch |
| POST | `/:id/reopen` | JWT | Donations.Edit | Reopen a batch: sets `status` to `open` and clears `closedDate` and `closedBy`. Returns the batch |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a batch and all its donations |

Each batch includes `status` (`open` or `closed`; new and pre-existing batches are `open`), `closedDate`, and `closedBy`. Donations.Edit can change donations in any batch; Donations.Enter (shown as **Enter Donations** in the role editor) can only add, change, or delete donations and fund splits while their batch is open.

## Donate

Base path: `/giving/donate`

Handles the public-facing donation flow including charges, subscriptions, webhooks, and fee calculations, plus the staff actions on a gift after the fact: retrying a failed payment and refunding a completed one. [Giving Architecture](../../architecture/giving.md) describes the flow end to end.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Get available payment gateways for a church (public keys only) |
| POST | `/client-token` | JWT | — | Generate a client token for gateway initialization |
| POST | `/create-order` | JWT | — | Create a payment order (PayPal-style checkout) |
| POST | `/charge` | JWT | — | Process a one-time donation charge |
| POST | `/subscribe` | JWT | — | Create a recurring donation subscription |
| POST | `/log` | Public | — | Log a donation. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Receive payment webhook events (Stripe, PayPal). Requires `?churchId=` |
| POST | `/retry/:donationId` | JWT | Donations.Edit | Retry a failed gateway payment. The donation must have status `failed` and a `transactionId`, and the church needs a gateway that supports retries (Stripe, and only for failed subscription invoices, whose transaction IDs start with `in_`). Asks the gateway to pay the invoice again, which charges the donor; once it is paid the donation's status is set to `complete` and the response is `{ success: true }`. `404` when the donation is not found; `400` with `{ error }` for any other refusal or a retry that does not succeed |
| POST | `/refund/:donationId` | JWT | Donations.Edit | Refund a gateway donation in full (partial refunds are not supported). The donation must have status `complete` (or none) and a `transactionId`, and the church needs a gateway that supports refunds (Stripe, for transaction IDs starting with `ch_` or `pi_`). Creates the refund at the gateway, which returns the money to the donor, then sets the donation's status to `refunded` and returns `{ success: true, refundId }`. `404` when the donation is not found; `400` with `{ error }` for any other refusal or a refund that fails |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Replay Stripe events for a date range. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calculate transaction fees. Body: `{ type, provider, gatewayId, amount, currency }`. Requires `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verify reCAPTCHA token. Body: `{ token, churchId? }`. A human answer returns `{ response: "human", pass }`, where `pass` is a signed guest-giving pass good for 10 minutes (and only for `churchId` when one is sent) |
| POST | `/register-domain` | Public | — | Register a website domain with the church's Stripe gateway as a payment method domain, which wallet payments such as Apple Pay need on that host. Body: `{ churchId, domain }`. The domain must be the church's own `b1.church` subdomain or a custom domain that belongs to the church, otherwise `400`. Returns `{ registered: true, created }`, or `{ registered: false, reason }` with `reason` `local` (localhost) or `unsupported`. A repeat call for the same church and domain within an hour returns `{ registered: true, created: false }` without contacting the gateway. `404` when the church has no Stripe gateway; `502` when the gateway call fails |

When the Api runs with `CAPTCHA_ENFORCE=true`, guest (not signed-in) calls to `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard`, and `/giving/paymentmethods/ach-setup-intent-anon` (and guest priced `POST /content/registrations/register` calls) must include that `captchaPass` in the body, or they return 403 `Captcha verification required`. The pass can be reused until it expires, because the Stripe guest flow makes two calls (add card, then charge). Signed-in calls are not affected. `CAPTCHA_ENFORCE` defaults to `false`; `@churchapps/apphelper`'s guest giving forms send the pass automatically.

### Example: Process a Donation Charge

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Example: Create a Recurring Subscription

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Funds

Base path: `/giving/funds`

Viewing funds needs no permission, but `GET /` includes hidden funds (`visible` set to `false`) only for callers with Donations.View or Donations.Edit.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all funds |
| GET | `/:id` | JWT | — | Get a fund by ID |
| GET | `/churchId/:churchId` | Public | — | Get all funds for a specific church (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Get a fund's donation total: `{ fundId, totalAmount, donationCount }`. Powers the website builder's `campaignProgress` element |
| POST | `/` | JWT | Donations.Edit | Create or update funds |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a fund |

## Fund Donations

Base path: `/giving/funddonations`

Tracks how individual donations are allocated across funds.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | List fund donations. Filter by `?donationId=`, `?personId=`, `?fundId=`, or `?fundName=`. Optionally add `?startDate=&endDate=` for date filtering |
| GET | `/:id` | JWT | Donations.View | Get a fund donation by ID |
| GET | `/my` | JWT | — | Get current user's fund donations |
| GET | `/totals?fundId=&startDate=&endDate=` | JWT | Donations.View | Total given to one fund, in the church currency: `{ totalAmount, currency, isConverted, amountsByCurrency }`. `fundId` is required (`400` otherwise); the date range applies only when both dates are sent. Counts only donations whose status is `complete` or unset |
| POST | `/` | JWT | Donations.Edit or Donations.Enter | Create or update fund donations (batch). Donations.Enter only: the parent donation must be in an open batch and not a gateway gift, otherwise `403` |
| DELETE | `/:id` | JWT | Donations.Edit or Donations.Enter | Delete a fund donation. Same open-batch rule for Donations.Enter |

## Campaigns

Base path: `/giving/campaigns`

A campaign is a pledge drive tied to one fund. Fields: `fundId`, `name`, `description`, `goalAmount`, `startDate`, `endDate` (optional), `showPublic`, and `allowSelfPledge`. Progress compares pledges with giving: the amount given is the sum of fund donations to the campaign's fund on donations dated from `startDate` through `endDate` (open-ended when there is no `endDate`) whose status is `complete` or unset, grouped by person.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List the church's campaigns, sorted by start date, then name |
| GET | `/:id` | JWT | — | Get a campaign by ID |
| GET | `/churchId/:churchId` | Public | — | Progress for a church's public campaigns: those with `showPublic` set whose `endDate` has not passed. Returns `[{ campaign, totalPledged, totalGiven, pledgeCount, donorCount }]`, with no per-person data |
| GET | `/progress` | JWT | Donations.ViewSummary | Progress totals for every campaign: `[{ campaign, totalPledged, totalGiven, pledgeCount, donorCount }]` |
| GET | `/progress/people` | JWT | Donations.ViewSummary | One row per person per campaign, across all campaigns: `[{ campaignId, campaignName, personId, pledgeId, pledgedAmount, givenAmount, status }]`. `status` is `notStarted`, `inProgress`, `fulfilled`, `beyondPledged`, or `nonPledged` (gave without pledging). Gifts with no person are grouped under `personId: null` |
| GET | `/:id/progress` | JWT | Donations.ViewSummary | Progress totals for one campaign, plus `rows` with the same per-person breakdown (without `campaignName`). `404` when the campaign is not found |
| POST | `/` | JWT | Donations.Edit | Create or update campaigns (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a campaign (soft delete) and permanently delete its pledges |

## Pledges

Base path: `/giving/pledges`

A pledge is the amount one person commits to a campaign: `{ campaignId, personId, amount }`. A person has one pledge per campaign. The `/my` routes let a signed-in member manage their own pledges.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own personId | List pledges. Filter by `?campaignId=` (Donations.View only) or `?personId=`. Without Donations.View, the caller must pass their own `personId` |
| GET | `/:id` | JWT | Donations.View | Get a pledge by ID |
| GET | `/my` | JWT | — | The current user's pledges with progress: `[{ pledge, campaign, givenAmount, status }]`. `givenAmount` is what they have given toward that campaign and `status` uses the same values as campaign progress |
| POST | `/` | JWT | Donations.Edit | Create or update pledges (batch). A new pledge for a person who already has one in that campaign updates the existing pledge instead of adding a second |
| POST | `/my` | JWT | — | Create or change the current user's pledge for a campaign. Body: `{ campaignId, amount }`. `amount` must be greater than zero and the campaign must have `allowSelfPledge` set, otherwise `400`. An existing pledge for that campaign is updated |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a pledge |
| DELETE | `/my/:id` | JWT | — | Delete one of the current user's own pledges. `401` when the pledge is not theirs or does not exist |

## Gateways

Base path: `/giving/gateways`

Manages payment gateway configurations (Stripe, PayPal, etc.). Gateway secrets are encrypted at rest.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all gateways for the church |
| GET | `/:id` | JWT | Settings.Edit | Get a gateway by ID |
| GET | `/churchId/:churchId` | Public | — | Get gateways for a church (public keys only) |
| GET | `/configured/:churchId` | Public | — | Check if a church has a configured payment gateway |
| POST | `/` | JWT | Settings.Edit | Create or update gateways (encrypts keys, provisions webhooks and products) |
| PATCH | `/:id` | JWT | Settings.Edit | Partially update a gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Delete a gateway (also removes its webhooks) |

### Example: Check Gateway Configuration

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Customers

Base path: `/giving/customers`

Links people to their payment gateway customer records.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List all customers |
| GET | `/:id` | JWT | Donations.ViewSummary or own record | Get a customer by ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary or own record | Get gateway subscriptions for a customer |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a customer |

## Subscriptions

Base path: `/giving/subscriptions`

Manages recurring donation subscriptions.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List all subscriptions |
| GET | `/:id` | JWT | Donations.ViewSummary | Get a subscription by ID |
| POST | `/` | JWT | Donations.Edit or own subscription | Update subscriptions with the payment gateway |
| POST | `/:id/pause` | JWT | Donations.Edit or own subscription | Pause a recurring gift at the payment gateway. An optional `provider` (query or body) picks the gateway; otherwise the provider of the subscription's customer is used, then any gateway that supports subscriptions. On Stripe this sets `pause_collection` with behavior `void`, so invoices raised while paused are voided and the donor is not charged. The stored subscription record is not changed. Returns `{ success: true }`. `400` when no gateway is configured; `500` `{ error: "Subscription pause failed" }` when the gateway rejects the call, which every gateway other than Stripe does |
| POST | `/:id/resume` | JWT | Donations.Edit or own subscription | Resume a paused recurring gift (on Stripe, clears `pause_collection` so charges continue). Same gateway selection, permission, and responses as `/pause`, with `500` `{ error: "Subscription resume failed" }` on failure |
| DELETE | `/:id` | JWT | Donations.Edit or own subscription | Cancel a subscription and remove from database. Body: `{ provider, reason }` |

## Subscription Funds

Base path: `/giving/subscriptionfunds`

Tracks fund allocations for recurring subscriptions.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own subscription | List subscription funds. Filter by `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Get a subscription fund by ID |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a subscription fund |
| DELETE | `/subscription/:id` | JWT | Donations.Edit or own subscription | Delete all funds for a subscription |

## Payment Methods

Base path: `/giving/paymentmethods`

Manages stored payment methods (cards, bank accounts) via payment gateway APIs.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View or own personId | Get all stored payment methods for a person (cards, bank accounts) |
| POST | `/addcard` | JWT | — | Attach a card payment method. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit or own personId | Update card details. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit or own personId | Create a Stripe ACH SetupIntent for bank account linking. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Create an anonymous ACH SetupIntent for guest donations. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit or own personId | Add a bank account via token (deprecated; use `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit or own personId | Update bank account details. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit or own customer | Verify a bank account with micro-deposits. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit or own customer | Delete a payment method (card or bank account). Returns `409` with `code: "payment_method_in_use"` when an active recurring gift still uses it; cancel or re-point the subscription first |

## Event Log

Base path: `/giving/eventLog`

Tracks payment gateway webhook events for auditing and deduplication.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List all event logs |
| GET | `/:id` | JWT | Donations.ViewSummary | Get an event log by ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Get event logs filtered by event type |
| POST | `/` | JWT | Donations.Edit | Create or update event logs |
| DELETE | `/:id` | JWT | Donations.Edit | Delete an event log |

## Related Pages

- [Giving Architecture](../../architecture/giving.md) — System map of the gateways, donation flow, webhooks, and failed-payment recovery
- [Membership Endpoints](./membership.md) — People, churches, groups, roles, and permissions
- [Authentication & Permissions](./authentication.md) — Login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure.md) — Code organization patterns
