---
title: "Giving Endpoints"
---

# Giving Endpoints

<div class="article-intro">

Ang Giving module ay namamahala sa donation, fund, payment processing, subscription, at mga kaugnay na financial operation. Sinusuportahan nito ang maraming payment gateway (Stripe, PayPal), humahawak ng one-time at recurring donation, sinusubaybayan ang donation batch, at nagbibigay ng webhook processing para sa asynchronous payment event.

</div>

**Base path:** `/giving`

## Donation

Base path: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling personId | Itala ang lahat ng donation. Filter sa pamamagitan ng `?batchId=` o `?personId=` |
| GET | `/:id` | JWT | Donations.View | Makakuha ng donation sa pamamagitan ng ID |
| GET | `/my` | JWT | — | Makakuha ng kasalukuyang user ng donation |
| GET | `/summary` | JWT | Donations.ViewSummary | Makakuha ng donation summary. Filter sa pamamagitan ng `?startDate=&endDate=&type=`. Gamitin ang `type=person` para sa per-person breakdown |
| GET | `/testEmail` | Public | — | Magpadala ng test email (development/debugging) |
| POST | `/` | JWT | Donations.Edit | Lumikha o i-update ang donation (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang donation |

### Halimbawa: Itala ang Donation ayon sa Batch

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

### Halimbawa: Makakuha ng Donation Summary

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

## Donation Batch

Base path: `/giving/donationbatches`

Nag-extend ng `GenericCrudController` na may CRUD route: `getById`, `getAll`, `post`, `delete`. Ang delete operation ay nag-aalis din ng lahat ng donation sa loob ng batch.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Itala ang lahat ng donation batch |
| GET | `/:id` | JWT | Donations.ViewSummary | Makakuha ng donation batch sa pamamagitan ng ID |
| POST | `/` | JWT | Donations.Edit | Lumikha o i-update ang donation batch |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang batch at lahat ng donation nito |

## Donate

Base path: `/giving/donate`

Humahawak ng public-facing na donation flow kabilang ang charge, subscription, webhook, at fee calculation. Walang base CRUD route na naka-enable; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Makakuha ng available payment gateway para sa isang simbahan (public key lamang) |
| POST | `/client-token` | JWT | — | Bumuo ng client token para sa gateway initialization |
| POST | `/create-order` | JWT | — | Lumikha ng payment order (PayPal-style checkout) |
| POST | `/charge` | JWT | — | Proseso ng one-time na donation charge |
| POST | `/subscribe` | JWT | — | Lumikha ng recurring donation subscription |
| POST | `/log` | Public | — | I-log ang donation. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Matanggap ang payment webhook event (Stripe, PayPal). Nangangailangan ng `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | I-replay ang Stripe event para sa date range. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Kalkulahin ang transaction fee. Body: `{ type, provider, gatewayId, amount, currency }`. Nangangailangan ng `?churchId=` |
| POST | `/captcha-verify` | Public | — | I-verify ang reCAPTCHA token. Body: `{ token }` |

### Halimbawa: Proseso ng Donation Charge

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

### Halimbawa: Lumikha ng Recurring Subscription

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

## Fund

Base path: `/giving/funds`

Nag-extend ng `GenericCrudController` na may CRUD route: `getById`, `getAll`, `post`, `delete`. Ang `view` permission ay `null` (walang permission na kinakailangan para sa pag-view ng fund).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng fund |
| GET | `/:id` | JWT | — | Makakuha ng fund sa pamamagitan ng ID |
| GET | `/churchId/:churchId` | Public | — | Makakuha ng lahat ng fund para sa isang specific na simbahan (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Makakuha ng fund na donation total: `{ fundId, totalAmount, donationCount }`. Nag-power ng website builder ng `campaignProgress` element |
| POST | `/` | JWT | Donations.Edit | Lumikha o i-update ang fund |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang fund |

## Fund Donation

Base path: `/giving/funddonations`

Sinusubaybayan kung paano ang indibidwal na donation ay naa-allocate sa mga fund. Walang base CRUD route na naka-enable; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Itala ang fund donation. Filter sa pamamagitan ng `?donationId=`, `?personId=`, `?fundId=`, o `?fundName=`. Opsyonal na idagdag ang `?startDate=&endDate=` para sa date filtering |
| GET | `/:id` | JWT | Donations.View | Makakuha ng fund donation sa pamamagitan ng ID |
| GET | `/my` | JWT | — | Makakuha ng kasalukuyang user ng fund donation |
| POST | `/` | JWT | Donations.Edit | Lumikha o i-update ang fund donation (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang fund donation |

## Gateway

Base path: `/giving/gateways`

Namamahala ng payment gateway configuration (Stripe, PayPal, atbp.). Walang base CRUD route na naka-enable; lahat ng endpoint ay custom. Ang gateway secret ay encrypted sa rest.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng gateway para sa simbahan |
| GET | `/:id` | JWT | Settings.Edit | Makakuha ng gateway sa pamamagitan ng ID |
| GET | `/churchId/:churchId` | Public | — | Makakuha ng gateway para sa isang simbahan (public key lamang) |
| GET | `/configured/:churchId` | Public | — | Suriin kung mayroon ang isang simbahan ng configured na payment gateway |
| POST | `/` | JWT | Settings.Edit | Lumikha o i-update ang gateway (nag-encrypt ng key, nag-provision ng webhook at product) |
| PATCH | `/:id` | JWT | Settings.Edit | Bahagyang i-update ang gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Tanggalin ang gateway (pati na rin tinatanggal ang webhook nito) |

### Halimbawa: Suriin ang Gateway Configuration

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Customer

Base path: `/giving/customers`

Nag-extend ng `GenericCrudController` na may CRUD route: `getAll`, `delete`. Nag-link ng mga tao sa kanilang payment gateway customer record.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Itala ang lahat ng customer |
| GET | `/:id` | JWT | Donations.ViewSummary o sariling record | Makakuha ng customer sa pamamagitan ng ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o sariling record | Makakuha ng gateway subscription para sa isang customer |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang customer |

## Subscription

Base path: `/giving/subscriptions`

Namamahala ng recurring donation subscription. Walang base CRUD route na naka-enable; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Itala ang lahat ng subscription |
| GET | `/:id` | JWT | Donations.ViewSummary | Makakuha ng subscription sa pamamagitan ng ID |
| POST | `/` | JWT | Donations.Edit o sariling subscription | I-update ang subscription gamit ang payment gateway |
| DELETE | `/:id` | JWT | Donations.Edit o sariling subscription | Kanselahin ang subscription at alisin mula sa database. Body: `{ provider, reason }` |

## Subscription Fund

Base path: `/giving/subscriptionfunds`

Sinusubaybayan ang fund allocation para sa recurring subscription. Walang base CRUD route na naka-enable; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling subscription | Itala ang subscription fund. Filter sa pamamagitan ng `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Makakuha ng subscription fund sa pamamagitan ng ID |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang subscription fund |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o sariling subscription | Tanggalin ang lahat ng fund para sa isang subscription |

## Payment Method

Base path: `/giving/paymentmethods`

Namamahala ng stored payment method (card, bank account) sa pamamagitan ng payment gateway API. Walang base CRUD route na naka-enable; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o sariling personId | Makakuha ng lahat ng stored payment method para sa isang tao (card, bank account) |
| POST | `/addcard` | JWT | — | I-attach ang card payment method. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o sariling personId | I-update ang card detail. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o sariling personId | Lumikha ng Stripe ACH SetupIntent para sa bank account linking. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Lumikha ng anonymous ACH SetupIntent para sa guest donation. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o sariling personId | Magdagdag ng bank account sa pamamagitan ng token (deprecated; gamitin ang `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o sariling personId | I-update ang bank account detail. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o sariling customer | I-verify ang bank account na may micro-deposit. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o sariling customer | Tanggalin ang payment method (card o bank account) |

## Event Log

Base path: `/giving/eventLog`

Nag-extend ng `GenericCrudController` na may CRUD route: `getById`, `getAll`, `post`, `delete`. Sinusubaybayan ang payment gateway webhook event para sa auditing at deduplication.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Itala ang lahat ng event log |
| GET | `/:id` | JWT | Donations.ViewSummary | Makakuha ng event log sa pamamagitan ng ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Makakuha ng event log na na-filter ayon sa event type |
| POST | `/` | JWT | Donations.Edit | Lumikha o i-update ang event log |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang event log |

## Mga Kaugnay na Pahina

- [Membership Endpoint](./membership) — Mga tao, simbahan, grupo, tungkulin, at permission
- [Authentication & Permission](./authentication) — Login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure) — Code organization pattern
