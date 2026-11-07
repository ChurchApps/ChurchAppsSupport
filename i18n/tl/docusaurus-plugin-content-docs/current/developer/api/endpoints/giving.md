---
title: "Mga Giving Endpoint"
description: "Sanggunian ng Giving API endpoints sa ChurchApps: donasyon, batch, gateway, subscription, at paraan ng bayad, kasama ang auth at permission rules."
---

# Mga Giving Endpoint

<div class="article-intro">

Pinamamahalaan ng Giving module ang mga donasyon, fund, pagproseso ng bayad, subscription, at mga kaugnay na operasyong pinansyal. Sinusuportahan nito ang maraming payment gateway (Stripe, PayPal), humahawak sa isang beses at paulit-ulit na donasyon, sumusubaybay sa mga batch ng donasyon, at nagbibigay ng pagproseso ng webhook para sa mga asynchronous na pangyayari sa bayad.

</div>

**Base path:** `/giving`

## Mga Donasyon

Base path: `/giving/donations`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling personId | Ilista ang lahat ng donasyon. I-filter gamit ang `?batchId=` o `?personId=`. Gamit ang `?personId=`, hindi isinasama ang mga regalo sa mga fund na hindi ma-deduct (gaya ng nasa giving statement) maliban kung magdagdag ang caller na may Donations.View ng `&includeNonDeductible=1`, na ginagawa ng person record ng B1Admin |
| GET | `/:id` | JWT | Donations.View | Kunin ang donasyon ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga donasyon ng kasalukuyang user |
| GET | `/my/summary?year=` | JWT | — | Kabuuang giving ng kasalukuyang user para sa isang taon (default ang taong ito): `{ year, total, count, currency, isConverted }`, na may mga kabuuang na-convert sa currency ng simbahan. Sumusuporta sa giving preview sa home page ng miyembro |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Mga donasyong may petsa sa loob ng saklaw (kasama ang dalawang dulo). Kailangan ang parehong petsa bilang `YYYY-MM-DD`, kung hindi ay `400`. Ganito humihiling ang mga pahina ng giving statement ng B1Admin ng isang kalendaryong taon sa halip na buong kasaysayan ng simbahan |
| GET | `/summary` | JWT | Donations.ViewSummary | Kunin ang buod ng donasyon. I-filter gamit ang `?startDate=&endDate=&type=`. Gamitin ang `type=person` para sa breakdown bawat tao |
| GET | `/testEmail` | Public | — | Magpadala ng test email (development/debugging) |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Gumawa o mag-update ng mga donasyon (batch). Kapag Donations.Enter lang, dapat bukas ang target na batch at (para sa update) ang kasalukuyang batch ng donasyon, at hindi maaaring baguhin ang mga gateway gift (yaong may `transactionId`); kung hindi, `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Burahin ang donasyon. Donations.Enter lang: dapat nasa bukas na batch ang donasyon at hindi gateway gift, kung hindi ay `403` |

### Halimbawa: Ilista ang Mga Donasyon Ayon sa Batch

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

Base path: `/giving/donationbatches`

Nagmamana mula sa `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. Inaalis din ng operasyong delete ang lahat ng donasyon sa loob ng batch.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary o Donations.Enter | Ilista ang lahat ng donation batch |
| GET | `/:id` | JWT | Donations.ViewSummary o Donations.Enter | Kunin ang donation batch ayon sa ID |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Gumawa o mag-update ng mga donation batch. Kapag Donations.Enter lang: ang pag-update ng umiiral na batch ay nangangailangang bukas ito, kung hindi ay `403 { "error": "This batch is closed." }`. Hindi pinapansin dito ang `status`, kaya hindi maibabalik sa bukas ang batch sa pag-save |
| POST | `/:id/close` | JWT | Donations.Edit | Isara ang batch: itinatakda ang `status` sa `closed`, ang `closedDate` sa ngayon, at ang `closedBy` sa user id ng caller. Ibinabalik ang batch |
| POST | `/:id/reopen` | JWT | Donations.Edit | Buksan muli ang batch: itinatakda ang `status` sa `open` at binubura ang `closedDate` at `closedBy`. Ibinabalik ang batch |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang batch at lahat ng donasyon nito |

Kasama sa bawat batch ang `status` (`open` o `closed`; ang mga bago at umiiral na batch ay `open`), `closedDate`, at `closedBy`. Maaaring baguhin ng Donations.Edit ang mga donasyon sa anumang batch; ang Donations.Enter (ipinapakita bilang **Enter Donations** sa role editor) ay maaari lang magdagdag, magbago, o magbura ng mga donasyon at hati ng fund habang bukas ang batch nila.

## Donate

Base path: `/giving/donate`

Humahawak sa pampublikong daloy ng donasyon kabilang ang mga singil, subscription, webhook, at kalkulasyon ng bayarin. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Kunin ang mga available na payment gateway para sa isang simbahan (public key lang) |
| POST | `/client-token` | JWT | — | Gumawa ng client token para sa initialization ng gateway |
| POST | `/create-order` | JWT | — | Gumawa ng payment order (checkout na istilong PayPal) |
| POST | `/charge` | JWT | — | Iproseso ang singil ng isang beses na donasyon |
| POST | `/subscribe` | JWT | — | Gumawa ng paulit-ulit na donasyong subscription |
| POST | `/log` | Public | — | Mag-log ng donasyon. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Tumanggap ng mga event ng webhook ng bayad (Stripe, PayPal). Kailangan ang `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | I-replay ang mga event ng Stripe para sa saklaw ng petsa. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Kalkulahin ang mga bayarin sa transaksyon. Body: `{ type, provider, gatewayId, amount, currency }`. Kailangan ang `?churchId=` |
| POST | `/captcha-verify` | Public | — | I-verify ang reCAPTCHA token. Body: `{ token, churchId? }`. Ang sagot na tao ay nagbabalik ng `{ response: "human", pass }`, kung saan ang `pass` ay naka-sign na guest-giving pass na valid nang 10 minuto (at para lang sa `churchId` kapag may ipinadala) |

Kapag tumatakbo ang Api na may `CAPTCHA_ENFORCE=true`, dapat isama sa body ang `captchaPass` na iyon ng mga guest (hindi naka-sign in) na tawag sa `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard`, at `/giving/paymentmethods/ach-setup-intent-anon` (at ang guest na may presyong `POST /content/registrations/register` na tawag), kung hindi ay magbabalik sila ng 403 `Captcha verification required`. Maaaring gamitin muli ang pass hanggang mag-expire ito, dahil dalawang tawag ang ginagawa ng Stripe guest flow (idagdag ang card, pagkatapos ang singil). Hindi apektado ang mga naka-sign in na tawag. Ang default ng `CAPTCHA_ENFORCE` ay `false`; awtomatikong ipinapadala ng mga guest giving form ng `@churchapps/apphelper` ang pass.

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

## Mga Fund

Base path: `/giving/funds`

Nagmamana mula sa `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. Ang permiso na `view` ay `null` (walang kailangang permiso para tingnan ang mga fund).

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng fund |
| GET | `/:id` | JWT | — | Kunin ang fund ayon sa ID |
| GET | `/churchId/:churchId` | Public | — | Kunin ang lahat ng fund ng isang partikular na simbahan (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Kunin ang kabuuang donasyon ng fund: `{ fundId, totalAmount, donationCount }`. Nagpapagana sa `campaignProgress` element ng website builder |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng mga fund |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang fund |

## Fund Donations

Base path: `/giving/funddonations`

Sinusubaybayan kung paano inilalaan ang bawat donasyon sa mga fund. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Ilista ang mga fund donation. I-filter gamit ang `?donationId=`, `?personId=`, `?fundId=`, o `?fundName=`. Opsyonal na idagdag ang `?startDate=&endDate=` para sa pag-filter ayon sa petsa |
| GET | `/:id` | JWT | Donations.View | Kunin ang fund donation ayon sa ID |
| GET | `/my` | JWT | — | Kunin ang mga fund donation ng kasalukuyang user |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Gumawa o mag-update ng mga fund donation (batch). Kapag Donations.Enter lang: dapat bukas ang batch ng parent donation at hindi ito gateway gift, kung hindi ay `403` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Burahin ang fund donation. Parehong panuntunan ng bukas na batch para sa Donations.Enter |

## Mga Gateway

Base path: `/giving/gateways`

Pinamamahalaan ang mga configuration ng payment gateway (Stripe, PayPal, atbp.). Walang naka-enable na base CRUD route; lahat ng endpoint ay custom. Naka-encrypt habang naka-imbak ang mga secret ng gateway.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng gateway ng simbahan |
| GET | `/:id` | JWT | Settings.Edit | Kunin ang gateway ayon sa ID |
| GET | `/churchId/:churchId` | Public | — | Kunin ang mga gateway ng isang simbahan (public key lang) |
| GET | `/configured/:churchId` | Public | — | Tingnan kung may naka-configure na payment gateway ang isang simbahan |
| POST | `/` | JWT | Settings.Edit | Gumawa o mag-update ng mga gateway (nag-e-encrypt ng mga key, nag-p-provision ng mga webhook at product) |
| PATCH | `/:id` | JWT | Settings.Edit | I-update nang bahagya ang isang gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang gateway (inaalis din ang mga webhook nito) |

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

Nagmamana mula sa `GenericCrudController` na may mga CRUD route: `getAll`, `delete`. Nag-uugnay ng mga tao sa kanilang customer record sa payment gateway.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng customer |
| GET | `/:id` | JWT | Donations.ViewSummary o sariling record | Kunin ang customer ayon sa ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o sariling record | Kunin ang mga gateway subscription ng isang customer |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang customer |

## Mga Subscription

Base path: `/giving/subscriptions`

Pinamamahalaan ang mga paulit-ulit na donasyong subscription. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng subscription |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang subscription ayon sa ID |
| POST | `/` | JWT | Donations.Edit o sariling subscription | I-update ang mga subscription sa payment gateway |
| DELETE | `/:id` | JWT | Donations.Edit o sariling subscription | Kanselahin ang subscription at alisin sa database. Body: `{ provider, reason }` |

## Mga Subscription Fund

Base path: `/giving/subscriptionfunds`

Sinusubaybayan ang mga paglalaan ng fund para sa mga paulit-ulit na subscription. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o sariling subscription | Ilista ang mga subscription fund. I-filter gamit ang `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang subscription fund ayon sa ID |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang subscription fund |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o sariling subscription | Burahin ang lahat ng fund ng isang subscription |

## Mga Paraan ng Pagbabayad

Base path: `/giving/paymentmethods`

Pinamamahalaan ang mga naka-imbak na paraan ng pagbabayad (card, bank account) sa pamamagitan ng API ng payment gateway. Walang naka-enable na base CRUD route; lahat ng endpoint ay custom.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o sariling personId | Kunin ang lahat ng naka-imbak na paraan ng pagbabayad ng isang tao (card, bank account) |
| POST | `/addcard` | JWT | — | Magdagdag ng card na paraan ng pagbabayad. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o sariling personId | I-update ang detalye ng card. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o sariling personId | Gumawa ng Stripe ACH SetupIntent para sa pag-link ng bank account. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Gumawa ng anonymous na ACH SetupIntent para sa mga donasyon ng guest. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o sariling personId | Magdagdag ng bank account sa pamamagitan ng token (deprecated; gamitin ang `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o sariling personId | I-update ang detalye ng bank account. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o sariling customer | I-verify ang bank account gamit ang micro-deposit. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o sariling customer | Burahin ang paraan ng pagbabayad (card o bank account) |

## Event Log

Base path: `/giving/eventLog`

Nagmamana mula sa `GenericCrudController` na may mga CRUD route: `getById`, `getAll`, `post`, `delete`. Sinusubaybayan ang mga event ng webhook ng payment gateway para sa auditing at deduplication.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Ilista ang lahat ng event log |
| GET | `/:id` | JWT | Donations.ViewSummary | Kunin ang event log ayon sa ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Kunin ang mga event log na sinala ayon sa uri ng event |
| POST | `/` | JWT | Donations.Edit | Gumawa o mag-update ng mga event log |
| DELETE | `/:id` | JWT | Donations.Edit | Burahin ang event log |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership.md) — Mga tao, simbahan, grupo, role, at permiso
- [Authentication at Permissions](./authentication.md) — Daloy ng login, JWT, OAuth, modelo ng permiso
- [Module Structure](../module-structure.md) — Mga pattern ng organisasyon ng code
