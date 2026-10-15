---
title: "Giving Endpoints"
---

# Giving Endpoints

<div class="article-intro">

Giving module donations, funds, payment processing, subscriptions, और संबंधित वित्तीय operations को प्रबंधित करता है। यह कई payment gateways (Stripe, PayPal) को सपोर्ट करता है, one-time और recurring donations संभालता है, donation batches ट्रैक करता है, और asynchronous payment events के लिए webhook processing प्रदान करता है।

</div>

**Base path:** `/giving`

## Donations

Base path: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या own personId | सभी donations की सूची। `?batchId=` या `?personId=` से filter करें। `?personId=` के साथ, non-deductible funds को दिए गए gifts छोड़ दिए जाते हैं (giving statements की तरह), जब तक कि Donations.View caller `&includeNonDeductible=1` न जोड़े, जो B1Admin का person record करता है |
| GET | `/:id` | JWT | Donations.View | ID द्वारा एक donation प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान user के donations प्राप्त करें |
| GET | `/my/summary?year=` | JWT | — | वर्तमान user का किसी वर्ष का giving कुल योग (डिफ़ॉल्ट इस साल): `{ year, total, count, currency, isConverted }`, कुल योग church currency में बदला हुआ। member home page पर giving preview को सपोर्ट करता है |
| GET | `/summary` | JWT | Donations.ViewSummary | donation summary प्राप्त करें। `?startDate=&endDate=&type=` से filter करें। प्रति-व्यक्ति विभाजन के लिए `type=person` उपयोग करें |
| GET | `/testEmail` | Public | — | एक test email भेजें (development/debugging के लिए) |
| POST | `/` | JWT | Donations.Edit | donations बनाएं या अपडेट करें (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | donation हटाएं |

### Example: Batch के अनुसार Donations की सूची

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

### Example: Donation Summary प्राप्त करना

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

CRUD routes के साथ `GenericCrudController` का विस्तार: `getById`, `getAll`, `post`, `delete`। delete operation batch के भीतर के सभी donations भी हटा देता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी donation batches की सूची |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा एक donation batch प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | donation batches बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | batch और उसके सभी donations हटाएं |

## Donate

Base path: `/giving/donate`

सार्वजनिक donation flow को संभालता है, जिसमें charges, subscriptions, webhooks, और fee calculations शामिल हैं। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints custom हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | किसी church के लिए उपलब्ध payment gateways प्राप्त करें (केवल public keys) |
| POST | `/client-token` | JWT | — | gateway initialization के लिए client token बनाएं |
| POST | `/create-order` | JWT | — | payment order बनाएं (PayPal-style checkout) |
| POST | `/charge` | JWT | — | एक बार का donation charge process करें |
| POST | `/subscribe` | JWT | — | recurring donation subscription बनाएं |
| POST | `/log` | Public | — | donation log करें। Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | payment webhook events प्राप्त करें (Stripe, PayPal)। `?churchId=` आवश्यक |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | किसी date range के Stripe events दोबारा चलाएं। Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | transaction fees की गणना करें। Body: `{ type, provider, gatewayId, amount, currency }`। `?churchId=` आवश्यक |
| POST | `/captcha-verify` | Public | — | reCAPTCHA token सत्यापित करें। Body: `{ token }` |

### Example: Donation Charge Process करना

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

### Example: Recurring Subscription बनाना

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

CRUD routes के साथ `GenericCrudController` का विस्तार: `getById`, `getAll`, `post`, `delete`। `view` permission `null` है (funds देखने के लिए कोई permission आवश्यक नहीं)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी funds की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक fund प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | किसी विशिष्ट church के सभी funds प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | किसी fund का donation कुल योग प्राप्त करें: `{ fundId, totalAmount, donationCount }`। website builder के `campaignProgress` element को सपोर्ट करता है |
| POST | `/` | JWT | Donations.Edit | funds बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | fund हटाएं |

## Fund Donations

Base path: `/giving/funddonations`

ट्रैक करता है कि व्यक्तिगत donations funds में कैसे आवंटित होते हैं। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints custom हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | fund donations की सूची। `?donationId=`, `?personId=`, `?fundId=`, या `?fundName=` से filter करें। तारीख के filter के लिए वैकल्पिक रूप से `?startDate=&endDate=` जोड़ें |
| GET | `/:id` | JWT | Donations.View | ID द्वारा एक fund donation प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान user के fund donations प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | fund donations बनाएं या अपडेट करें (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | fund donation हटाएं |

## Gateways

Base path: `/giving/gateways`

payment gateway configurations (Stripe, PayPal, आदि) प्रबंधित करता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints custom हैं। Gateway secrets at rest encrypted रहते हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | church के सभी gateways की सूची |
| GET | `/:id` | JWT | Settings.Edit | ID द्वारा एक gateway प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | किसी church के gateways प्राप्त करें (केवल public keys) |
| GET | `/configured/:churchId` | Public | — | जांचें कि church के पास कॉन्फ़िगर किया गया payment gateway है या नहीं |
| POST | `/` | JWT | Settings.Edit | gateways बनाएं या अपडेट करें (keys encrypt करता है, webhooks और products provision करता है) |
| PATCH | `/:id` | JWT | Settings.Edit | gateway को आंशिक रूप से अपडेट करें |
| DELETE | `/:id` | JWT | Settings.Edit | gateway हटाएं (उसके webhooks भी हटाता है) |

### Example: Gateway Configuration जांचना

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

CRUD routes (`getAll`, `delete`) के साथ `GenericCrudController` का विस्तार। लोगों को उनके payment gateway customer records से जोड़ता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी customers की सूची |
| GET | `/:id` | JWT | Donations.ViewSummary या own record | ID द्वारा एक customer प्राप्त करें |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary या own record | किसी customer के gateway subscriptions प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | customer हटाएं |

## Subscriptions

Base path: `/giving/subscriptions`

recurring donation subscriptions प्रबंधित करता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints custom हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी subscriptions की सूची |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा एक subscription प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या own subscription | payment gateway के साथ subscriptions अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit या own subscription | subscription रद्द करें और database से हटाएं। Body: `{ provider, reason }` |

## Subscription Funds

Base path: `/giving/subscriptionfunds`

recurring subscriptions के लिए fund आवंटन ट्रैक करता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints custom हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या own subscription | subscription funds की सूची। `?subscriptionId=` से filter करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा एक subscription fund प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | subscription fund हटाएं |
| DELETE | `/subscription/:id` | JWT | Donations.Edit या own subscription | किसी subscription के सभी funds हटाएं |

## Payment Methods

Base path: `/giving/paymentmethods`

payment gateway APIs के माध्यम से सहेजे गए payment methods (cards, bank accounts) प्रबंधित करता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints custom हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View या own personId | किसी व्यक्ति के सभी सहेजे गए payment methods प्राप्त करें (cards, bank accounts) |
| POST | `/addcard` | JWT | — | card payment method attach करें। Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit या own personId | card विवरण अपडेट करें। Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit या own personId | bank account linking के लिए Stripe ACH SetupIntent बनाएं। Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | guest donations के लिए एक अनाम ACH SetupIntent बनाएं। Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit या own personId | token के माध्यम से bank account जोड़ें (deprecated; `ach-setup-intent` उपयोग करें)। Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit या own personId | bank account विवरण अपडेट करें। Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit या own customer | micro-deposits के साथ bank account सत्यापित करें। Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit या own customer | payment method (card या bank account) हटाएं |

## Event Log

Base path: `/giving/eventLog`

CRUD routes (`getById`, `getAll`, `post`, `delete`) के साथ `GenericCrudController` का विस्तार। auditing और deduplication के लिए payment gateway webhook events ट्रैक करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी event logs की सूची |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा एक event log प्राप्त करें |
| GET | `/type/:type` | JWT | Donations.ViewSummary | event type द्वारा filter की गई event logs प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | event logs बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | event log हटाएं |

## संबंधित पेज

- [Membership Endpoints](./membership) — People, churches, groups, roles, और permissions
- [Authentication & Permissions](./authentication) — Login flow, JWT, OAuth, permission model
- [Module Structure](../module-structure) — Code organization patterns
