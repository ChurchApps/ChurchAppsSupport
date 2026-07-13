---
title: "Ema-Endpoint E-Giving"
---

# Ema-Endpoint E-Giving

<div class="article-intro">

I-module ye-Giving iphatsa eminikelo, tikhwama, kucutjwa kwetinkhokhelo, ema-subscription, kanye netento letihlobene temali. Isekela ema-gateway lamanyenti etinkhokhelo (Stripe, PayPal), iphatsa eminikelo yekanyekanye nalephindzaphindzako, ilandzelela emabatch eminikelo, futsi iniketa kuphatsa kwe-webhook kumicimbi yetinkhokhelo lengahambisani.

</div>

**Umkhondvo Losisekelo:** `/giving`

## Eminikelo

Umkhondvo losisekelo: `/giving/donations`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View nobe personId wakhe | Bala yonkhe eminikelo. Cenga nge-`?batchId=` nobe `?personId=` |
| GET | `/:id` | JWT | Donations.View | Tfola umnikelo nge-ID |
| GET | `/my` | JWT | — | Tfola eminikelo yemsebentisi wanyalo |
| GET | `/summary` | JWT | Donations.ViewSummary | Tfola sifingqo seminikelo. Cenga nge-`?startDate=&endDate=&type=`. Sebentisa `type=person` kwehlukaniswa ngumuntfu ngamunye |
| GET | `/testEmail` | Ngeyeveleni | — | Tfumela i-imeyili yekuhlola (kutfutfuka/kuhlola) |
| POST | `/` | JWT | Donations.Edit | Akha nobe buyeketa eminikelo (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Sula umnikelo |

### Sibonelo: Bala Eminikelo Nge-Batch

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

### Sibonelo: Tfola Sifingqo Seminikelo

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

## Emabatch Eminikelo

Umkhondvo losisekelo: `/giving/donationbatches`

Yandzisa i-`GenericCrudController` ngemikhondvo ye-CRUD: `getById`, `getAll`, `post`, `delete`. Sento sekususa futsi sisusa yonkhe eminikelo lengekhatsi kwebatch.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Bala onkhe emabatch eminikelo |
| GET | `/:id` | JWT | Donations.ViewSummary | Tfola batch nge-ID |
| POST | `/` | JWT | Donations.Edit | Akha nobe buyeketa emabatch eminikelo |
| DELETE | `/:id` | JWT | Donations.Edit | Sula batch kanye nayo yonkhe eminikelo yayo |

## Kunikela (Donate)

Umkhondvo losisekelo: `/giving/donate`

Iphatsa inchubo yeveleni yekunikela kufaka tinkhokhelo, ema-subscription, ema-webhook, kanye nekubalwa kwetimali tekusebentisa. Akukho mikhondvo ye-CRUD lesisekelo levunyiwe; wonkhe ema-endpoint akhetsekile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Ngeyeveleni | — | Tfola ema-gateway etinkhokhelo latfolakalako elibandla (tikhiya teveleni kuphela) |
| POST | `/client-token` | JWT | — | Khicita client token yekucalisa gateway |
| POST | `/create-order` | JWT | — | Akha order yenkhokhelo (kukhokha kwesimo se-PayPal) |
| POST | `/charge` | JWT | — | Chubekisa inkhokhelo yemnikelo wekanye |
| POST | `/subscribe` | JWT | — | Akha subscription yemnikelo lophindzaphindzako |
| POST | `/log` | Ngeyeveleni | — | Bhala phansi umnikelo. Umtimba: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Ngeyeveleni | — | Yemukela imicimbi yewebhook yetinkhokhelo (Stripe, PayPal). Idzinga `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Phindza imicimbi ye-Stripe sikhatsi lesitsite. Umtimba: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Ngeyeveleni | — | Bala tinkhokhelo tekusebentisa. Umtimba: `{ type, provider, gatewayId, amount, currency }`. Idzinga `?churchId=` |
| POST | `/captcha-verify` | Ngeyeveleni | — | Cinisekisa i-reCAPTCHA token. Umtimba: `{ token }` |

### Sibonelo: Chubekisa Inkhokhelo Yemnikelo

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

### Sibonelo: Akha Subscription Lephindzaphindzako

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

## Tikhwama

Umkhondvo losisekelo: `/giving/funds`

Yandzisa i-`GenericCrudController` ngemikhondvo ye-CRUD: `getById`, `getAll`, `post`, `delete`. Imvumo ye-`view` yi-`null` (akukho mvumo ledzingekako kubuka tikhwama).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala tonkhe tikhwama |
| GET | `/:id` | JWT | — | Tfola sikhwama nge-ID |
| GET | `/churchId/:churchId` | Ngeyeveleni | — | Tfola tonkhe tikhwama telibandla lelikhetsekile (yeveleni) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Ngeyeveleni | — | Tfola lidzinga lelilonkhe leminikelo yesikhwama: `{ fundId, totalAmount, donationCount }`. Isebentisa element ye-`campaignProgress` ye-website builder |
| POST | `/` | JWT | Donations.Edit | Akha nobe buyeketa tikhwama |
| DELETE | `/:id` | JWT | Donations.Edit | Sula sikhwama |

## Eminikelo Yetikhwama

Umkhondvo losisekelo: `/giving/funddonations`

Ilandzelela indlela leminikelo yakamunye yabelwa ngayo etikhwameni. Akukho mikhondvo ye-CRUD lesisekelo levunyiwe; wonkhe ema-endpoint akhetsekile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Bala eminikelo yetikhwama. Cenga nge-`?donationId=`, `?personId=`, `?fundId=`, nobe `?fundName=`. Ngekukhetsa engeta `?startDate=&endDate=` kucenga ngelilanga |
| GET | `/:id` | JWT | Donations.View | Tfola umnikelo wesikhwama nge-ID |
| GET | `/my` | JWT | — | Tfola eminikelo yetikhwama yemsebentisi wanyalo |
| POST | `/` | JWT | Donations.Edit | Akha nobe buyeketa eminikelo yetikhwama (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Sula umnikelo wesikhwama |

## Ema-Gateway

Umkhondvo losisekelo: `/giving/gateways`

Iphatsa kuhlelwa kwema-gateway etinkhokhelo (Stripe, PayPal, njll.). Akukho mikhondvo ye-CRUD lesisekelo levunyiwe; wonkhe ema-endpoint akhetsekile. Imfihlo yema-gateway ifihliwe (encrypted) ekugcinweni.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala onkhe ema-gateway elibandla |
| GET | `/:id` | JWT | Settings.Edit | Tfola gateway nge-ID |
| GET | `/churchId/:churchId` | Ngeyeveleni | — | Tfola ema-gateway elibandla (tikhiya teveleni kuphela) |
| GET | `/configured/:churchId` | Ngeyeveleni | — | Hlola nangabe libandla linayo gateway yetinkhokhelo lehleliwe |
| POST | `/` | JWT | Settings.Edit | Akha nobe buyeketa ema-gateway (ifihla tikhiya, iniketa ema-webhook nemikhicito) |
| PATCH | `/:id` | JWT | Settings.Edit | Buyeketa incenye ye-gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Sula gateway (isule netema-webhook ayo) |

### Sibonelo: Hlola Kuhlelwa Kwe-Gateway

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Bakhokhi (Customers)

Umkhondvo losisekelo: `/giving/customers`

Yandzisa i-`GenericCrudController` ngemikhondvo ye-CRUD: `getAll`, `delete`. Ixhumanisa bantfu nemibhalo yabo yebakhokhi ye-gateway yetinkhokhelo.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Bala bonkhe bakhokhi |
| GET | `/:id` | JWT | Donations.ViewSummary nobe umbhalo wakhe | Tfola mkhokhi nge-ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary nobe umbhalo wakhe | Tfola ema-subscription e-gateway emkhokhi |
| DELETE | `/:id` | JWT | Donations.Edit | Sula mkhokhi |

## Ema-Subscription

Umkhondvo losisekelo: `/giving/subscriptions`

Iphatsa ema-subscription eminikelo lephindzaphindzako. Akukho mikhondvo ye-CRUD lesisekelo levunyiwe; wonkhe ema-endpoint akhetsekile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Bala onkhe ema-subscription |
| GET | `/:id` | JWT | Donations.ViewSummary | Tfola subscription nge-ID |
| POST | `/` | JWT | Donations.Edit nobe subscription yakhe | Buyeketa ema-subscription ne-gateway yetinkhokhelo |
| DELETE | `/:id` | JWT | Donations.Edit nobe subscription yakhe | Yekela subscription futsi uyisuse ku-database. Umtimba: `{ provider, reason }` |

## Tikhwama Tesubscription

Umkhondvo losisekelo: `/giving/subscriptionfunds`

Ilandzelela kwabelwa kwetikhwama kuma-subscription laphindzaphindzako. Akukho mikhondvo ye-CRUD lesisekelo levunyiwe; wonkhe ema-endpoint akhetsekile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View nobe subscription yakhe | Bala tikhwama tesubscription. Cenga nge-`?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Tfola sikhwama sesubscription nge-ID |
| DELETE | `/:id` | JWT | Donations.Edit | Sula sikhwama sesubscription |
| DELETE | `/subscription/:id` | JWT | Donations.Edit nobe subscription yakhe | Sula tonkhe tikhwama tesubscription |

## Tindlela Tekukhokha

Umkhondvo losisekelo: `/giving/paymentmethods`

Iphatsa tindlela tekukhokha letigciniwe (emakhadi, ema-akhawundi ebhange) nge-API te-gateway yetinkhokhelo. Akukho mikhondvo ye-CRUD lesisekelo levunyiwe; wonkhe ema-endpoint akhetsekile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View nobe personId wakhe | Tfola tonkhe tindlela tekukhokha letigciniwe temuntfu (emakhadi, ema-akhawundi ebhange) |
| POST | `/addcard` | JWT | — | Namatsela indlela yekukhokha yekhadi. Umtimba: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit nobe personId wakhe | Buyeketa imininingwane yekhadi. Umtimba: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit nobe personId wakhe | Akha i-Stripe ACH SetupIntent yekuhlanganisa akhawundi yebhange. Umtimba: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Ngeyeveleni | — | Akha ACH SetupIntent lengaziwa yeminikelo yesihambi. Umtimba: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit nobe personId wakhe | Engeta akhawundi yebhange nge-token (seyingasetjentiswa; sebentisa `ach-setup-intent`). Umtimba: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit nobe personId wakhe | Buyeketa imininingwane yakhawundi yebhange. Umtimba: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit nobe customer wakhe | Cinisekisa akhawundi yebhange nge-micro-deposit. Umtimba: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit nobe customer wakhe | Sula indlela yekukhokha (khadi nobe akhawundi yebhange) |

## Bhalo Lwemicimbi

Umkhondvo losisekelo: `/giving/eventLog`

Yandzisa i-`GenericCrudController` ngemikhondvo ye-CRUD: `getById`, `getAll`, `post`, `delete`. Ilandzelela imicimbi yewebhook ye-gateway yetinkhokhelo kwe-audit kanye nekususa loku lokuphindziwe.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Bala onkhe emabhalo emicimbi |
| GET | `/:id` | JWT | Donations.ViewSummary | Tfola bhalo lemcimbi nge-ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Tfola emabhalo emicimbi acengiwe nge-luhlobo lwemcimbi |
| POST | `/` | JWT | Donations.Edit | Akha nobe buyeketa emabhalo emicimbi |
| DELETE | `/:id` | JWT | Donations.Edit | Sula bhalo lemcimbi |

## Emakhasi Lahlobene

- [Membership Endpoints](./membership) — Bantfu, emabandla, emacembu, ema-role, kanye netimvumo
- [Authentication & Permissions](./authentication) — Inchubo yekungena, JWT, OAuth, sifanekiso semvumo
- [Module Structure](../module-structure) — Sifanekiso sekuhlelwa kwekhodi
