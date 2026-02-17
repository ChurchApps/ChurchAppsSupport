---
title: "Giving Endpoints"
---

# Giving Endpoints

<div class="article-intro">

The Giving module manages donations, funds, payment processing, subscriptions, and related financial operations. It supports multiple payment gateways (Stripe, PayPal), handles one-time and recurring donations, tracks donation batches, and provides webhook processing for asynchronous payment events.

</div>

**Base path:** `/giving`

## Donations

Base path: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own personId | List all donations. Filter by `?batchId=` or `?personId=` |
| GET | `/:id` | JWT | Donations.View | Get a donation by ID |
| GET | `/my` | JWT | — | Get current user's donations |
| GET | `/summary` | JWT | Donations.ViewSummary | Get donation summary. Filter by `?startDate=&endDate=&type=`. Use `type=person` for per-person breakdown |
| GET | `/testEmail` | Public | — | Send a test email (development/debugging) |
| POST | `/` | JWT | Donations.Edit | Create or update donations (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a donation |

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

Extends `GenericCrudController` with CRUD routes: `getById`, `getAll`, `post`, `delete`. The delete operation also removes all donations within the batch.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List all donation batches |
| GET | `/:id` | JWT | Donations.ViewSummary | Get a donation batch by ID |
| POST | `/` | JWT | Donations.Edit | Create or update donation batches |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a batch and all its donations |

## Donate

Base path: `/giving/donate`

Handles the public-facing donation flow including charges, subscriptions, webhooks, and fee calculations. No base CRUD routes are enabled; all endpoints are custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Get available payment gateways for a church (public keys only) |
| POST | `/client-token` | JWT | — | Generate a client token for gateway initialization |
| POST | `/create-order` | JWT | — | Create a payment order (PayPal-style checkout) |
| POST | `/charge` | JWT | — | Process a one-time donation charge |
| POST | `/subscribe` | JWT | — | Create a recurring donation subscription |
| POST | `/log` | Public | — | Log a donation. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Receive payment webhook events (Stripe, PayPal). Requires `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Replay Stripe events for a date range. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calculate transaction fees. Body: `{ type, provider, gatewayId, amount, currency }`. Requires `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verify reCAPTCHA token. Body: `{ token }` |

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

Extends `GenericCrudController` with CRUD routes: `getById`, `getAll`, `post`, `delete`. The `view` permission is `null` (no permission required for viewing funds).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all funds |
| GET | `/:id` | JWT | — | Get a fund by ID |
| GET | `/churchId/:churchId` | Public | — | Get all funds for a specific church (public) |
| POST | `/` | JWT | Donations.Edit | Create or update funds |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a fund |

## Fund Donations

Base path: `/giving/funddonations`

Tracks how individual donations are allocated across funds. No base CRUD routes are enabled; all endpoints are custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | List fund donations. Filter by `?donationId=`, `?personId=`, `?fundId=`, or `?fundName=`. Optionally add `?startDate=&endDate=` for date filtering |
| GET | `/:id` | JWT | Donations.View | Get a fund donation by ID |
| GET | `/my` | JWT | — | Get current user's fund donations |
| POST | `/` | JWT | Donations.Edit | Create or update fund donations (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a fund donation |

## Gateways

Base path: `/giving/gateways`

Manages payment gateway configurations (Stripe, PayPal, etc.). No base CRUD routes are enabled; all endpoints are custom. Gateway secrets are encrypted at rest.

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

Extends `GenericCrudController` with CRUD routes: `getAll`, `delete`. Links people to their payment gateway customer records.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List all customers |
| GET | `/:id` | JWT | Donations.ViewSummary or own record | Get a customer by ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary or own record | Get gateway subscriptions for a customer |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a customer |

## Subscriptions

Base path: `/giving/subscriptions`

Manages recurring donation subscriptions. No base CRUD routes are enabled; all endpoints are custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List all subscriptions |
| GET | `/:id` | JWT | Donations.ViewSummary | Get a subscription by ID |
| POST | `/` | JWT | Donations.Edit or own subscription | Update subscriptions with the payment gateway |
| DELETE | `/:id` | JWT | Donations.Edit or own subscription | Cancel a subscription and remove from database. Body: `{ provider, reason }` |

## Subscription Funds

Base path: `/giving/subscriptionfunds`

Tracks fund allocations for recurring subscriptions. No base CRUD routes are enabled; all endpoints are custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own subscription | List subscription funds. Filter by `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Get a subscription fund by ID |
| DELETE | `/:id` | JWT | Donations.Edit | Delete a subscription fund |
| DELETE | `/subscription/:id` | JWT | Donations.Edit or own subscription | Delete all funds for a subscription |

## Payment Methods

Base path: `/giving/paymentmethods`

Manages stored payment methods (cards, bank accounts) via payment gateway APIs. No base CRUD routes are enabled; all endpoints are custom.

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
| DELETE | `/:id/:customerid` | JWT | Donations.Edit or own customer | Delete a payment method (card or bank account) |

## Event Log

Base path: `/giving/eventLog`

Extends `GenericCrudController` with CRUD routes: `getById`, `getAll`, `post`, `delete`. Tracks payment gateway webhook events for auditing and deduplication.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List all event logs |
| GET | `/:id` | JWT | Donations.ViewSummary | Get an event log by ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Get event logs filtered by event type |
| POST | `/` | JWT | Donations.Edit | Create or update event logs |
| DELETE | `/:id` | JWT | Donations.Edit | Delete an event log |

## Related Pages

- [Membership Endpoints](./membership) — People, churches, groups, roles, and permissions
- [Authentication & Permissions](./authentication) — Login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure) — Code organization patterns
