---
title: "Mga Giving Endpoint"
---

# Mga Giving Endpoint

<div class="article-intro">

Pinamamahalaan ng Giving module ang mga donasyon, pondo, pagproseso ng bayad, subscription, at iba pang kaugnay na operasyong pinansyal. Sinusuportahan nito ang maraming payment gateway (Stripe, PayPal), humahawak ng one-time at paulit-ulit na donasyon, sumusubaybay ng donation batch, at nagbibigay ng webhook processing para sa mga asynchronous na payment event.

</div>

**Pangunahing path:** `/giving`

## Mga Donasyon

Pangunahing path: `/giving/donations`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling personId | Ilista ang lahat ng donasyon. I-filter gamit ang `?batchId=` o `?personId=`. Kapag may `?personId=`, hindi isinasama ang mga regalo sa hindi-deductible na pondo (gaya sa giving statement) maliban kung ang tumatawag na may Donations.View ay magdadagdag ng `&includeNonDeductible=1`, na ginagawa ng person record ng B1Admin |
| GET | `/:id` | JWT | Donations.View | Kunin ang donasyon ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga donasyon ng kasalukuyang user |
| GET | `/my/summary?year=` | JWT | — | Kabuuang donasyon ng kasalukuyang user para sa isang taon (default ang kasalukuyang taon): `{ year, total, count, currency, isConverted }`, na may mga kabuuang na-convert sa currency ng simbahan. Sumusuporta sa giving preview sa home page ng miyembro |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Mga donasyong may petsa sa loob ng saklaw (kasama ang dalawang dulo). Kinakailangan ang parehong petsa bilang `YYYY-MM-DD`, kung hindi ay `400`. Ang giving statement pages ng B1Admin ay humihiling ng isang kalendaryong taon sa ganitong paraan sa halip na buong kasaysayan ng simbahan |
| GET | `/summary` | JWT | Donations.ViewSummary | Kunin ang buod ng donasyon. I-filter gamit ang `?startDate=&endDate=&type=`. Gamitin ang `type=person` para sa breakdown bawat tao |
| GET | `/testEmail` | Public | — | Magpadala ng test email (para sa development/debugging) |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Gumawa o mag-update ng donasyon (batch). Sa Donations.Enter lamang, kailangang bukas ang target na batch at (para sa update) ang kasalukuyang batch ng donasyon, at hindi maaaring baguhin ang gateway gift (may `transactionId`); kung hindi, `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Burahin ang donasyon. Sa Donations.Enter lamang: dapat nasa bukas na batch ang donasyon at hindi gateway gift, kung hindi, `403` |

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

## Mga Donation Batch {#donation-batches}

Pangunahing path: `/giving/donationbatches`

Pinalawak ang `GenericCrudController` gamit ang CRUD route: `getById`, `getAll`, `post`, `delete`. Binubura rin ng delete operation ang lahat ng donasyon sa loob ng batch.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary o Donations.Enter | Ilista ang lahat ng donation batch |
| GET | `/:id` | JWT | Donations.ViewSummary o Donations.Enter | Kunin ang donation batch ayon sa ID |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Gumawa o mag-update ng donation batch. Sa Donations.Enter lamang: ang pag-update ng umiiral na batch ay nangangailangan na ito ay bukas, kung hindi, `403 { "error": "This batch is closed." }`. Hindi pinapansin dito ang `status`, kaya ang pag-save ng batch ay hindi ito mabubuksang muli |
| POST | `/:id/close` | JWT | Donations.Edit | Isara ang batch: itinatakda ang `status` sa `closed`, `closedDate` sa ngayon, at `closedBy` sa user id ng tumatawag. Ibinabalik ang batch |
| POST | `/:id/reopen` | JWT | Donations.Edit | Buksang muli ang batch: itinatakda ang `status` sa `open` at binubura ang `closedDate` at `closedBy`. Ibinabalik ang batch |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang batch at lahat ng donasyon nito |

Bawat batch ay may `status` (`open` o `closed`; ang bago at umiiral na batch ay `open`), `closedDate`, at `closedBy`. Maaaring baguhin ng Donations.Edit ang donasyon sa anumang batch; ang Donations.Enter (ipinapakita bilang **Enter Donations** sa role editor) ay makakapagdagdag, makakapagbago, o makakapagbura lamang ng donasyon at paghahati ng pondo habang bukas ang batch nito.

## Donate

Pangunahing path: `/giving/donate`

Humahawak ng public-facing na daloy ng donasyon kabilang ang mga charge, subscription, webhook, at pagkalkula ng bayad. Walang pinaganang base CRUD route; lahat ng endpoint ay custom.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Kunin ang available na payment gateway para sa isang simbahan (public keys lamang) |
| POST | `/client-token` | JWT | — | Gumawa ng client token para sa initialization ng gateway |
| POST | `/create-order` | JWT | — | Gumawa ng payment order (checkout na istilong PayPal) |
| POST | `/charge` | JWT | — | Iproseso ang one-time na donation charge |
| POST | `/subscribe` | JWT | — | Gumawa ng paulit-ulit na donation subscription |
| POST | `/log` | Public | — | Itala ang donasyon. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Tanggapin ang payment webhook event (Stripe, PayPal). Kinakailangan ang `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | I-replay ang Stripe event para sa saklaw ng petsa. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Kalkulahin ang bayad sa transaksyon. Body: `{ type, provider, gatewayId, amount, currency }`. Kinakailangan ang `?churchId=` |
| POST | `/captcha-verify` | Public | — | I-verify ang reCAPTCHA token. Body: `{ token }` |

### Halimbawa: Iproseso ang Donation Charge

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

### Halimbawa: Gumawa ng Paulit-ulit na Subscription

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

Pangunahing path: `/giving/funds`

Pinalawak ang `GenericCrudController` gamit ang CRUD route: `getById`, `getAll`, `post`, `delete`. Ang `view` na pahintulot ay `null` (walang pahintulot na kailangan para tingnan ang mga pondo).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng pondo |
| GET | `/:id` | JWT | — | Kunin ang pondo ayon sa ID |
| GET | `/churchId/:churchId` | Public | — | Kunin ang lahat ng pondo para sa partikular na simbahan (pampubliko) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Kunin ang kabuuang donasyon ng pondo: `{ fundId, totalAmount, donationCount }`. Sumusuporta sa elementong `campaignProgress` ng website builder |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng mga pondo |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang pondo |

## Mga Donasyon sa Pondo

Pangunahing path: `/giving/funddonations`

Sinusubaybayan kung paano inilalaan ang bawat donasyon sa mga pondo. Walang pinaganang base CRUD route; lahat ng endpoint ay custom.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Ilista ang mga donasyon sa pondo. I-filter gamit ang `?donationId=`, `?personId=`, `?fundId=`, o `?fundName=`. Opsyonal na idagdag ang `?startDate=&endDate=` para sa pag-filter ayon sa petsa |
| GET | `/:id` | JWT | Donations.View | Kunin ang donasyon sa pondo ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga donasyon sa pondo ng kasalukuyang user |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Gumawa o mag-update ng mga donasyon sa pondo (batch). Sa Donations.Enter lamang: ang parent na donasyon ay dapat nasa bukas na batch at hindi gateway gift, kung hindi, `403` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Burahin ang donasyon sa pondo. Ganoon din ang patakaran sa bukas na batch para sa Donations.Enter |

## Mga Gateway

Pangunahing path: `/giving/gateways`

Pinamamahalaan ang configuration ng payment gateway (Stripe, PayPal, atbp.). Walang pinaganang base CRUD route; lahat ng endpoint ay custom. Naka-encrypt ang mga secret ng gateway kapag naka-imbak.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng gateway para sa simbahan |
| GET | `/:id` | JWT | Settings.Edit | Kunin ang gateway ayon sa ID |
| GET | `/churchId/:churchId` | Public | — | Kunin ang mga gateway para sa simbahan (public keys lamang) |
| GET | `/configured/:churchId` | Public | — | Tingnan kung may naka-configure na payment gateway ang simbahan |
| POST | `/` | JWT | Settings.Edit | Gumawa o mag-update ng gateway (nag-e-encrypt ng key, nag-provision ng webhook at product) |
| PATCH | `/:id` | JWT | Settings.Edit | Bahagyang i-update ang gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang gateway (binubura rin ang mga webhook nito) |

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

Pangunahing path: `/giving/customers`

Pinalawak ang `GenericCrudController` gamit ang CRUD route: `getAll`, `delete`. Nagli-link ng mga tao sa kanilang payment gateway customer record.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng customer |
| GET | `/:id` | JWT | Donations.ViewSummary o sariling record | Kunin ang customer ayon sa ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o sariling record | Kunin ang gateway subscription ng customer |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang customer |

## Mga Subscription

Pangunahing path: `/giving/subscriptions`

Pinamamahalaan ang paulit-ulit na donation subscription. Walang pinaganang base CRUD route; lahat ng endpoint ay custom.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng subscription |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang subscription ayon sa ID |
| POST | `/` | JWT | Donations.Edit o sariling subscription | I-update ang subscription sa payment gateway |
| DELETE | `/:id` | JWT | Donations.Edit o sariling subscription | Kanselahin ang subscription at alisin sa database. Body: `{ provider, reason }` |

## Mga Pondo ng Subscription

Pangunahing path: `/giving/subscriptionfunds`

Sinusubaybayan ang alokasyon ng pondo para sa paulit-ulit na subscription. Walang pinaganang base CRUD route; lahat ng endpoint ay custom.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling subscription | Ilista ang mga pondo ng subscription. I-filter gamit ang `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang pondo ng subscription ayon sa ID |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang pondo ng subscription |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o sariling subscription | Burahin ang lahat ng pondo ng isang subscription |

## Mga Paraan ng Pagbabayad

Pangunahing path: `/giving/paymentmethods`

Pinamamahalaan ang mga naka-imbak na paraan ng pagbabayad (card, bank account) sa pamamagitan ng API ng payment gateway. Walang pinaganang base CRUD route; lahat ng endpoint ay custom.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o sariling personId | Kunin ang lahat ng naka-imbak na paraan ng pagbabayad ng isang tao (card, bank account) |
| POST | `/addcard` | JWT | — | Mag-attach ng card bilang paraan ng pagbabayad. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o sariling personId | I-update ang detalye ng card. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o sariling personId | Gumawa ng Stripe ACH SetupIntent para sa pag-link ng bank account. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Gumawa ng anonymous na ACH SetupIntent para sa donasyon ng bisita. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o sariling personId | Magdagdag ng bank account sa pamamagitan ng token (deprecated; gamitin ang `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o sariling personId | I-update ang detalye ng bank account. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o sariling customer | I-verify ang bank account gamit ang micro-deposits. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o sariling customer | Burahin ang paraan ng pagbabayad (card o bank account) |

## Event Log

Pangunahing path: `/giving/eventLog`

Pinalawak ang `GenericCrudController` gamit ang CRUD route: `getById`, `getAll`, `post`, `delete`. Sinusubaybayan ang mga webhook event ng payment gateway para sa audit at deduplication.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng event log |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang event log ayon sa ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Kunin ang event log na na-filter ayon sa uri ng event |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng event log |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang event log |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership) — Mga tao, simbahan, grupo, tungkulin, at pahintulot
- [Authentication & Permissions](./authentication) — Daloy ng login, JWT, OAuth, modelo ng pahintulot
- [Module Structure](../module-structure) — Mga pattern ng organisasyon ng code
