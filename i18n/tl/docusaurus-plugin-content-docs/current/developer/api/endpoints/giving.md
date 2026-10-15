---
title: "Mga Giving Endpoint"
---

# Mga Giving Endpoint

<div class="article-intro">

Pinamamahalaan ng Giving module ang mga donasyon, fund, pagproseso ng bayad, subscription, at iba pang operasyong pinansyal. Sinusuportahan nito ang maraming payment gateway (Stripe, PayPal), humahawak ng one-time at paulit-ulit na donasyon, sumusubaybay sa mga batch ng donasyon, at nagbibigay ng webhook processing para sa mga asynchronous na pangyayari sa pagbabayad.

</div>

**Base path:** `/giving`

## Mga Donasyon

Base path: `/giving/donations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling personId | Ilista ang lahat ng donasyon. I-filter gamit ang `?batchId=` o `?personId=`. Kasama ang `?personId=`, hindi isasama ang mga regalo sa mga non-deductible na fund (gaya sa giving statements) maliban kung magdadagdag ng `&includeNonDeductible=1` ang caller na may Donations.View, na ginagawa ng person record ng B1Admin |
| GET | `/:id` | JWT | Donations.View | Kunin ang isang donasyon ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga donasyon ng kasalukuyang user |
| GET | `/my/summary?year=` | JWT | — | Kabuuang giving ng kasalukuyang user para sa isang taon (default ang taong ito): `{ year, total, count, currency, isConverted }`, na ang mga kabuuan ay ico-convert sa currency ng simbahan. Sumusuporta sa giving preview sa home page ng member |
| GET | `/summary` | JWT | Donations.ViewSummary | Kunin ang buod ng donasyon. I-filter gamit ang `?startDate=&endDate=&type=`. Gamitin ang `type=person` para sa breakdown bawat tao |
| GET | `/testEmail` | Public | — | Magpadala ng test email (para sa development/debugging) |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng mga donasyon (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang donasyon |

### Halimbawa: Ilista ang Mga Donasyon ayon sa Batch

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

## Mga Batch ng Donasyon

Base path: `/giving/donationbatches`

Nagpapalawig sa `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. Ang operasyong delete ay tinatanggal din ang lahat ng donasyon sa loob ng batch.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng batch ng donasyon |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang batch ng donasyon ayon sa ID |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng mga batch ng donasyon |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang batch at lahat ng donasyon nito |

## Donate

Base path: `/giving/donate`

Hinahawakan ang public-facing na daloy ng donasyon kabilang ang mga charge, subscription, webhook, at kalkulasyon ng bayarin. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Kunin ang mga available na payment gateway para sa isang simbahan (public key lamang) |
| POST | `/client-token` | JWT | — | Gumawa ng client token para sa initialization ng gateway |
| POST | `/create-order` | JWT | — | Gumawa ng payment order (checkout na tulad ng PayPal) |
| POST | `/charge` | JWT | — | Iproseso ang isang one-time na singil ng donasyon |
| POST | `/subscribe` | JWT | — | Gumawa ng recurring donation subscription |
| POST | `/log` | Public | — | I-log ang isang donasyon. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Tanggapin ang mga webhook event ng pagbabayad (Stripe, PayPal). Kailangan ang `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | I-replay ang mga Stripe event para sa isang saklaw ng petsa. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Kalkulahin ang mga bayarin sa transaksyon. Body: `{ type, provider, gatewayId, amount, currency }`. Kailangan ang `?churchId=` |
| POST | `/captcha-verify` | Public | — | I-verify ang reCAPTCHA token. Body: `{ token }` |

### Halimbawa: Iproseso ang Singil ng Donasyon

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

### Halimbawa: Gumawa ng Recurring Subscription

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

## Mga Fund

Base path: `/giving/funds`

Nagpapalawig sa `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. Ang `view` permission ay `null` (walang kailangang permission para tingnan ang mga fund).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng fund |
| GET | `/:id` | JWT | — | Kunin ang isang fund ayon sa ID |
| GET | `/churchId/:churchId` | Public | — | Kunin ang lahat ng fund ng isang partikular na simbahan (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Kunin ang kabuuan ng donasyon ng isang fund: `{ fundId, totalAmount, donationCount }`. Ginagamit ng `campaignProgress` element ng website builder |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng mga fund |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang fund |

## Mga Donasyon sa Fund

Base path: `/giving/funddonations`

Sinusubaybayan kung paano inilalaan ang mga indibidwal na donasyon sa mga fund. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Ilista ang mga donasyon sa fund. I-filter gamit ang `?donationId=`, `?personId=`, `?fundId=`, o `?fundName=`. Maaaring idagdag ang `?startDate=&endDate=` para sa pag-filter ayon sa petsa |
| GET | `/:id` | JWT | Donations.View | Kunin ang isang donasyon sa fund ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga donasyon sa fund ng kasalukuyang user |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng mga donasyon sa fund (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang donasyon sa fund |

## Mga Gateway

Base path: `/giving/gateways`

Pinamamahalaan ang mga configuration ng payment gateway (Stripe, PayPal, atbp.). Walang naka-enable na base CRUD route; lahat ng endpoint ay custom. Naka-encrypt sa imbakan ang mga secret ng gateway.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng gateway ng simbahan |
| GET | `/:id` | JWT | Settings.Edit | Kunin ang isang gateway ayon sa ID |
| GET | `/churchId/:churchId` | Public | — | Kunin ang mga gateway ng isang simbahan (public key lamang) |
| GET | `/configured/:churchId` | Public | — | Suriin kung may naka-configure na payment gateway ang isang simbahan |
| POST | `/` | JWT | Settings.Edit | Gumawa o mag-update ng mga gateway (nag-e-encrypt ng mga key, nagpo-provision ng mga webhook at product) |
| PATCH | `/:id` | JWT | Settings.Edit | Bahagyang i-update ang isang gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang isang gateway (inaalis din ang mga webhook nito) |

### Halimbawa: Suriin ang Configuration ng Gateway

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Mga Customer

Base path: `/giving/customers`

Nagpapalawig sa `GenericCrudController` na may mga CRUD route: `getAll`, `delete`. Ikinakabit ang mga tao sa kanilang customer record sa payment gateway.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng customer |
| GET | `/:id` | JWT | Donations.ViewSummary o sariling record | Kunin ang isang customer ayon sa ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o sariling record | Kunin ang mga subscription sa gateway ng isang customer |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang customer |

## Mga Subscription

Base path: `/giving/subscriptions`

Pinamamahalaan ang mga recurring donation subscription. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng subscription |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang subscription ayon sa ID |
| POST | `/` | JWT | Donations.Edit o sariling subscription | I-update ang mga subscription sa payment gateway |
| DELETE | `/:id` | JWT | Donations.Edit o sariling subscription | Kanselahin ang isang subscription at alisin sa database. Body: `{ provider, reason }` |

## Mga Fund ng Subscription

Base path: `/giving/subscriptionfunds`

Sinusubaybayan ang mga alokasyon ng fund para sa mga recurring subscription. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling subscription | Ilista ang mga fund ng subscription. I-filter gamit ang `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang fund ng subscription ayon sa ID |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang fund ng subscription |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o sariling subscription | Burahin ang lahat ng fund ng isang subscription |

## Mga Paraan ng Pagbabayad

Base path: `/giving/paymentmethods`

Pinamamahalaan ang mga naka-imbak na paraan ng pagbabayad (card, bank account) sa pamamagitan ng API ng payment gateway. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o sariling personId | Kunin ang lahat ng naka-imbak na paraan ng pagbabayad ng isang tao (card, bank account) |
| POST | `/addcard` | JWT | — | Ikabit ang isang card bilang paraan ng pagbabayad. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o sariling personId | I-update ang detalye ng card. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o sariling personId | Gumawa ng Stripe ACH SetupIntent para sa pagkakabit ng bank account. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Gumawa ng anonymous na ACH SetupIntent para sa mga donasyon ng bisita. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o sariling personId | Magdagdag ng bank account sa pamamagitan ng token (deprecated; gamitin ang `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o sariling personId | I-update ang detalye ng bank account. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o sariling customer | I-verify ang isang bank account gamit ang micro-deposits. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o sariling customer | Burahin ang isang paraan ng pagbabayad (card o bank account) |

## Event Log

Base path: `/giving/eventLog`

Nagpapalawig sa `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. Sinusubaybayan ang mga webhook event ng payment gateway para sa auditing at deduplication.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng event log |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang event log ayon sa ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Kunin ang mga event log na sinala ayon sa uri ng event |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng mga event log |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang event log |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership) -- Mga tao, simbahan, group, role, at permission
- [Authentication & Permissions](./authentication) -- Daloy ng login, JWT, OAuth, modelo ng permission
- [Module Structure](../module-structure) -- Mga pattern ng organisasyon ng code
