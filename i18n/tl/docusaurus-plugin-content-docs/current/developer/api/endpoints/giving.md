---
title: "Giving Endpoints"
---

# Giving Endpoints

<div class="article-intro">

Pinamamahalaan ng Giving module ang mga donasyon, fund, pagproseso ng pagbabayad, subscription, at mga kaugnay na operasyong pinansyal. Sinusuportahan nito ang maraming payment gateway (Stripe, PayPal), hinahawakan ang mga one-time at recurring na donasyon, sinusubaybayan ang mga donation batch, at nagbibigay ng webhook processing para sa mga asynchronous na payment event.

</div>

**Base path:** `/giving`

## Donations

Base path: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling personId | Ilista ang lahat ng donasyon. I-filter sa pamamagitan ng `?batchId=` o `?personId=` |
| GET | `/:id` | JWT | Donations.View | Kunin ang isang donasyon ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga donasyon ng kasalukuyang user |
| GET | `/summary` | JWT | Donations.ViewSummary | Kunin ang buod ng donasyon. I-filter sa pamamagitan ng `?startDate=&endDate=&type=`. Gamitin ang `type=person` para sa breakdown kada tao |
| GET | `/testEmail` | Public | — | Magpadala ng test email (development/debugging) |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga donasyon (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang isang donasyon |

### Halimbawa: Ilista ang mga Donasyon ayon sa Batch

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

### Halimbawa: Kunin ang Buod ng Donasyon

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

Nag-e-extend ng `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. Inaalis din ng delete operation ang lahat ng donasyon sa loob ng batch.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng donation batch |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang donation batch ayon sa ID |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga donation batch |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang isang batch at lahat ng donasyon nito |

## Donate

Base path: `/giving/donate`

Hinahawakan ang public-facing na daloy ng donasyon kabilang ang mga charge, subscription, webhook, at pagkalkula ng fee. Walang naka-enable na base CRUD route; custom ang lahat ng endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Kunin ang mga available na payment gateway para sa isang simbahan (public key lamang) |
| POST | `/client-token` | JWT | — | Bumuo ng client token para sa pag-initialize ng gateway |
| POST | `/create-order` | JWT | — | Lumikha ng payment order (PayPal-style na checkout) |
| POST | `/charge` | JWT | — | Iproseso ang isang one-time na donation charge |
| POST | `/subscribe` | JWT | — | Lumikha ng recurring donation subscription |
| POST | `/log` | Public | — | I-log ang isang donasyon. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Tumanggap ng mga payment webhook event (Stripe, PayPal). Kailangan ang `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | I-replay ang mga Stripe event para sa isang saklaw ng petsa. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Kalkulahin ang mga transaction fee. Body: `{ type, provider, gatewayId, amount, currency }`. Kailangan ang `?churchId=` |
| POST | `/captcha-verify` | Public | — | I-verify ang reCAPTCHA token. Body: `{ token }` |

### Halimbawa: Iproseso ang isang Donation Charge

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

## Funds

Base path: `/giving/funds`

Nag-e-extend ng `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. `null` ang `view` permission (walang kailangang permission para tingnan ang mga fund).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng fund |
| GET | `/:id` | JWT | — | Kunin ang isang fund ayon sa ID |
| GET | `/churchId/:churchId` | Public | — | Kunin ang lahat ng fund para sa isang partikular na simbahan (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Kunin ang kabuuang donasyon ng isang fund: `{ fundId, totalAmount, donationCount }`. Nagpapatakbo sa `campaignProgress` element ng website builder |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga fund |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang isang fund |

## Fund Donations

Base path: `/giving/funddonations`

Sinusubaybayan kung paano naaalokado ang mga indibidwal na donasyon sa mga fund. Walang naka-enable na base CRUD route; custom ang lahat ng endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Ilista ang mga fund donation. I-filter sa pamamagitan ng `?donationId=`, `?personId=`, `?fundId=`, o `?fundName=`. Opsyonal na idagdag ang `?startDate=&endDate=` para sa pag-filter ayon sa petsa |
| GET | `/:id` | JWT | Donations.View | Kunin ang isang fund donation ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga fund donation ng kasalukuyang user |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga fund donation (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang isang fund donation |

## Gateways

Base path: `/giving/gateways`

Pinamamahalaan ang mga konpigurasyon ng payment gateway (Stripe, PayPal, atbp.). Walang naka-enable na base CRUD route; custom ang lahat ng endpoint. Naka-encrypt at nakaimbak nang secure ang mga gateway secret.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng gateway para sa simbahan |
| GET | `/:id` | JWT | Settings.Edit | Kunin ang isang gateway ayon sa ID |
| GET | `/churchId/:churchId` | Public | — | Kunin ang mga gateway para sa isang simbahan (public key lamang) |
| GET | `/configured/:churchId` | Public | — | Suriin kung may naka-configure nang payment gateway ang isang simbahan |
| POST | `/` | JWT | Settings.Edit | Lumikha o mag-update ng mga gateway (nag-e-encrypt ng mga key, nagpo-provision ng mga webhook at produkto) |
| PATCH | `/:id` | JWT | Settings.Edit | Bahagyang i-update ang isang gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Tanggalin ang isang gateway (inaalis din ang mga webhook nito) |

### Halimbawa: Suriin ang Konpigurasyon ng Gateway

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

Nag-e-extend ng `GenericCrudController` na may mga CRUD route: `getAll`, `delete`. Nag-uugnay ng mga tao sa kanilang mga customer record sa payment gateway.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng customer |
| GET | `/:id` | JWT | Donations.ViewSummary o sariling record | Kunin ang isang customer ayon sa ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o sariling record | Kunin ang mga gateway subscription para sa isang customer |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang isang customer |

## Subscriptions

Base path: `/giving/subscriptions`

Pinamamahalaan ang mga recurring donation subscription. Walang naka-enable na base CRUD route; custom ang lahat ng endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng subscription |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang subscription ayon sa ID |
| POST | `/` | JWT | Donations.Edit o sariling subscription | I-update ang mga subscription sa payment gateway |
| DELETE | `/:id` | JWT | Donations.Edit o sariling subscription | Kanselahin ang isang subscription at alisin ito sa database. Body: `{ provider, reason }` |

## Subscription Funds

Base path: `/giving/subscriptionfunds`

Sinusubaybayan ang mga alokasyon ng fund para sa mga recurring subscription. Walang naka-enable na base CRUD route; custom ang lahat ng endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling subscription | Ilista ang mga subscription fund. I-filter sa pamamagitan ng `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang subscription fund ayon sa ID |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang isang subscription fund |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o sariling subscription | Tanggalin ang lahat ng fund para sa isang subscription |

## Payment Methods

Base path: `/giving/paymentmethods`

Pinamamahalaan ang mga naka-store na paraan ng pagbabayad (card, bank account) sa pamamagitan ng mga API ng payment gateway. Walang naka-enable na base CRUD route; custom ang lahat ng endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o sariling personId | Kunin ang lahat ng naka-store na paraan ng pagbabayad para sa isang tao (mga card, bank account) |
| POST | `/addcard` | JWT | — | I-attach ang isang card na paraan ng pagbabayad. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o sariling personId | I-update ang mga detalye ng card. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o sariling personId | Lumikha ng Stripe ACH SetupIntent para sa pag-link ng bank account. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Lumikha ng anonymous na ACH SetupIntent para sa mga donasyon ng bisita. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o sariling personId | Magdagdag ng bank account sa pamamagitan ng token (deprecated na; gamitin ang `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o sariling personId | I-update ang mga detalye ng bank account. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o sariling customer | I-verify ang isang bank account gamit ang mga micro-deposit. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o sariling customer | Tanggalin ang isang paraan ng pagbabayad (card o bank account) |

## Event Log

Base path: `/giving/eventLog`

Nag-e-extend ng `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. Sinusubaybayan ang mga webhook event ng payment gateway para sa auditing at deduplication.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng event log |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang event log ayon sa ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Kunin ang mga event log na na-filter ayon sa uri ng event |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga event log |
| DELETE | `/:id` | JWT | Donations.Edit | Tanggalin ang isang event log |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership) — Mga tao, simbahan, grupo, tungkulin, at permission
- [Authentication & Permissions](./authentication) — Daloy ng pag-login, JWT, OAuth, permission model
- [Module Structure](../module-structure) — Mga pattern ng pag-oorganisa ng code
