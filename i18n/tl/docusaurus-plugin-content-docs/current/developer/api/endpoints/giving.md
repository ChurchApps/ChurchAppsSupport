---
title: "Mga Endpoint ng Giving"
---

# Mga Endpoint ng Giving

<div class="article-intro">

Pinapamahalaan ng Giving module ang mga donasyon, pondo, pagpoproseso ng bayad, subscription, at mga kaugnay na operasyong pinansyal. Sinusuportahan nito ang maraming payment gateway (Stripe, PayPal), hina-handle ang isang beses at umuulit na mga donasyon, sinusubaybayan ang mga batch ng donasyon, at nagbibigay ng pagpoproseso ng webhook para sa mga asynchronous na kaganapan ng bayad.

</div>

**Base path:** `/giving`

## Mga Donasyon

Base path: `/giving/donations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling personId | Ilista ang lahat ng donasyon. I-filter ayon sa `?batchId=` o `?personId=` |
| GET | `/:id` | JWT | Donations.View | Kunin ang isang donasyon ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga donasyon ng kasalukuyang gumagamit |
| GET | `/summary` | JWT | Donations.ViewSummary | Kunin ang buod ng donasyon. I-filter ayon sa `?startDate=&endDate=&type=`. Gamitin ang `type=person` para sa detalye bawat tao |
| GET | `/testEmail` | Pampubliko | — | Magpadala ng test email (development/debugging) |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga donasyon (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang donasyon |

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

## Mga Batch ng Donasyon

Base path: `/giving/donationbatches`

Nag-eextend ng `GenericCrudController` na may mga CRUD ruta: `getById`, `getAll`, `post`, `delete`. Ang operasyon ng pagbura ay nag-aalis din ng lahat ng donasyon sa loob ng batch.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng batch ng donasyon |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang batch ng donasyon ayon sa ID |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga batch ng donasyon |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang batch at lahat ng mga donasyon nito |

## Mag-donate

Base path: `/giving/donate`

Hina-handle ang pampublikong daloy ng donasyon kasama ang mga singil, subscription, webhook, at kalkulasyon ng bayad. Walang naka-enable na base CRUD ruta; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Pampubliko | — | Kunin ang mga magagamit na payment gateway para sa isang simbahan (mga pampublikong key lamang) |
| POST | `/client-token` | JWT | — | Bumuo ng client token para sa pagsisimula ng gateway |
| POST | `/create-order` | JWT | — | Lumikha ng payment order (PayPal-style na checkout) |
| POST | `/charge` | JWT | — | Iproseso ang isang beses na singil ng donasyon |
| POST | `/subscribe` | JWT | — | Lumikha ng umuulit na subscription ng donasyon |
| POST | `/log` | Pampubliko | — | Mag-log ng donasyon. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Pampubliko | — | Tumanggap ng mga kaganapan ng payment webhook (Stripe, PayPal). Nangangailangan ng `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Muling i-play ang mga Stripe event para sa isang saklaw ng petsa. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Pampubliko | — | Kalkulahin ang mga bayad sa transaksyon. Body: `{ type, provider, gatewayId, amount, currency }`. Nangangailangan ng `?churchId=` |
| POST | `/captcha-verify` | Pampubliko | — | I-verify ang reCAPTCHA token. Body: `{ token }` |

### Halimbawa: Iproseso ang isang Singil ng Donasyon

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

### Halimbawa: Lumikha ng Umuulit na Subscription

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

## Mga Pondo

Base path: `/giving/funds`

Nag-eextend ng `GenericCrudController` na may mga CRUD ruta: `getById`, `getAll`, `post`, `delete`. Ang pahintulot para sa `view` ay `null` (walang kinakailangang pahintulot para sa pagtingin ng mga pondo).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng pondo |
| GET | `/:id` | JWT | — | Kunin ang isang pondo ayon sa ID |
| GET | `/churchId/:churchId` | Pampubliko | — | Kunin ang lahat ng pondo para sa isang partikular na simbahan (pampubliko) |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga pondo |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang pondo |

## Mga Donasyon sa Pondo

Base path: `/giving/funddonations`

Sinusubaybayan kung paano inilalaan ang mga indibidwal na donasyon sa mga pondo. Walang naka-enable na base CRUD ruta; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Ilista ang mga donasyon sa pondo. I-filter ayon sa `?donationId=`, `?personId=`, `?fundId=`, o `?fundName=`. Opsyonal na magdagdag ng `?startDate=&endDate=` para sa pag-filter ng petsa |
| GET | `/:id` | JWT | Donations.View | Kunin ang isang donasyon sa pondo ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga donasyon sa pondo ng kasalukuyang gumagamit |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga donasyon sa pondo (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang donasyon sa pondo |

## Mga Gateway

Base path: `/giving/gateways`

Pinapamahalaan ang mga configuration ng payment gateway (Stripe, PayPal, atbp.). Walang naka-enable na base CRUD ruta; lahat ng endpoint ay custom. Ang mga lihim ng gateway ay naka-encrypt sa pahinga.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng gateway para sa simbahan |
| GET | `/:id` | JWT | Settings.Edit | Kunin ang isang gateway ayon sa ID |
| GET | `/churchId/:churchId` | Pampubliko | — | Kunin ang mga gateway para sa isang simbahan (mga pampublikong key lamang) |
| GET | `/configured/:churchId` | Pampubliko | — | Suriin kung ang isang simbahan ay may naka-configure na payment gateway |
| POST | `/` | JWT | Settings.Edit | Lumikha o mag-update ng mga gateway (nag-e-encrypt ng mga key, nagpo-provision ng mga webhook at produkto) |
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

Nag-eextend ng `GenericCrudController` na may mga CRUD ruta: `getAll`, `delete`. Nag-uugnay ng mga tao sa kanilang mga talaan ng customer sa payment gateway.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng customer |
| GET | `/:id` | JWT | Donations.ViewSummary o sariling talaan | Kunin ang isang customer ayon sa ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o sariling talaan | Kunin ang mga subscription ng gateway para sa isang customer |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang customer |

## Mga Subscription

Base path: `/giving/subscriptions`

Pinapamahalaan ang mga umuulit na subscription ng donasyon. Walang naka-enable na base CRUD ruta; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng subscription |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang subscription ayon sa ID |
| POST | `/` | JWT | Donations.Edit o sariling subscription | I-update ang mga subscription sa payment gateway |
| DELETE | `/:id` | JWT | Donations.Edit o sariling subscription | Kanselahin ang isang subscription at alisin mula sa database. Body: `{ provider, reason }` |

## Mga Pondo ng Subscription

Base path: `/giving/subscriptionfunds`

Sinusubaybayan ang mga paglalaan ng pondo para sa mga umuulit na subscription. Walang naka-enable na base CRUD ruta; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling subscription | Ilista ang mga pondo ng subscription. I-filter ayon sa `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang pondo ng subscription ayon sa ID |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang pondo ng subscription |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o sariling subscription | Burahin ang lahat ng pondo para sa isang subscription |

## Mga Paraan ng Pagbabayad

Base path: `/giving/paymentmethods`

Pinapamahalaan ang mga naka-imbak na paraan ng pagbabayad (mga card, bank account) sa pamamagitan ng mga API ng payment gateway. Walang naka-enable na base CRUD ruta; lahat ng endpoint ay custom.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o sariling personId | Kunin ang lahat ng naka-imbak na paraan ng pagbabayad para sa isang tao (mga card, bank account) |
| POST | `/addcard` | JWT | — | Mag-attach ng paraan ng pagbabayad na card. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o sariling personId | I-update ang mga detalye ng card. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o sariling personId | Lumikha ng Stripe ACH SetupIntent para sa pag-link ng bank account. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Pampubliko | — | Lumikha ng anonymous na ACH SetupIntent para sa mga donasyong panauhin. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o sariling personId | Magdagdag ng bank account sa pamamagitan ng token (deprecated; gamitin ang `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o sariling personId | I-update ang mga detalye ng bank account. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o sariling customer | I-verify ang isang bank account gamit ang mga micro-deposit. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o sariling customer | Burahin ang isang paraan ng pagbabayad (card o bank account) |

## Log ng Kaganapan

Base path: `/giving/eventLog`

Nag-eextend ng `GenericCrudController` na may mga CRUD ruta: `getById`, `getAll`, `post`, `delete`. Sinusubaybayan ang mga kaganapan ng webhook ng payment gateway para sa pag-audit at deduplication.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng log ng kaganapan |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang isang log ng kaganapan ayon sa ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Kunin ang mga log ng kaganapan na na-filter ayon sa uri ng kaganapan |
| POST | `/` | JWT | Donations.Edit | Lumikha o mag-update ng mga log ng kaganapan |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang isang log ng kaganapan |

## Mga Kaugnay na Pahina

- [Mga Endpoint ng Membership](./membership) — Mga tao, simbahan, grupo, tungkulin, at mga pahintulot
- [Authentication at Mga Pahintulot](./authentication) — Daloy ng pag-login, JWT, OAuth, modelo ng pahintulot
- [Istraktura ng Module](../module-structure) — Mga pattern ng organisasyon ng code
