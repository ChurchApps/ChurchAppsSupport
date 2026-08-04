---
title: "Giving एंडपॉइंट्स"
---

# Giving एंडपॉइंट्स

<div class="article-intro">

Giving मॉड्यूल डोनेशंस, फंड्स, पेमेंट प्रोसेसिंग, सब्सक्रिप्शंस, और संबंधित वित्तीय ऑपरेशंस को मैनेज करता है। यह कई पेमेंट गेटवे (Stripe, PayPal) को सपोर्ट करता है, एक बार के और आवर्ती डोनेशंस को हैंडल करता है, डोनेशन बैचेज़ को ट्रैक करता है, और असिंक्रोनस पेमेंट इवेंट्स के लिए वेबहुक प्रोसेसिंग प्रदान करता है।

</div>

**बेस पथ:** `/giving`

## Donations

बेस पथ: `/giving/donations`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या खुद की personId | सभी डोनेशंस सूचीबद्ध करें। `?batchId=` या `?personId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Donations.View | ID से एक डोनेशन प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान यूज़र के डोनेशंस प्राप्त करें |
| GET | `/summary` | JWT | Donations.ViewSummary | डोनेशन समरी प्राप्त करें। `?startDate=&endDate=&type=` से फ़िल्टर करें। प्रति-व्यक्ति ब्रेकडाउन के लिए `type=person` का उपयोग करें |
| GET | `/testEmail` | सार्वजनिक | — | टेस्ट ईमेल भेजें (डेवलपमेंट/डिबगिंग) |
| POST | `/` | JWT | Donations.Edit | डोनेशंस बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Donations.Edit | एक डोनेशन हटाएं |

### उदाहरण: बैच से डोनेशंस सूचीबद्ध करें

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

### उदाहरण: डोनेशन समरी प्राप्त करें

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

बेस पथ: `/giving/donationbatches`

CRUD रूट्स के साथ `GenericCrudController` को विस्तारित करता है: `getById`, `getAll`, `post`, `delete`। डिलीट ऑपरेशन बैच के भीतर सभी डोनेशंस को भी हटाता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी डोनेशन बैचेज़ सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से एक डोनेशन बैच प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | डोनेशन बैचेज़ बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | एक बैच और उसके सभी डोनेशंस हटाएं |

## Donate

बेस पथ: `/giving/donate`

सार्वजनिक-मुखी डोनेशन फ़्लो को हैंडल करता है जिसमें चार्जेज़, सब्सक्रिप्शंस, वेबहुक्स, और फ़ीस कैलकुलेशंस शामिल हैं। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट्स कस्टम हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | सार्वजनिक | — | किसी चर्च के लिए उपलब्ध पेमेंट गेटवे प्राप्त करें (केवल पब्लिक कीज़) |
| POST | `/client-token` | JWT | — | गेटवे इनिशियलाइज़ेशन के लिए एक क्लाइंट टोकन जनरेट करें |
| POST | `/create-order` | JWT | — | एक पेमेंट ऑर्डर बनाएं (PayPal-शैली चेकआउट) |
| POST | `/charge` | JWT | — | एक बार का डोनेशन चार्ज प्रोसेस करें |
| POST | `/subscribe` | JWT | — | एक आवर्ती डोनेशन सब्सक्रिप्शन बनाएं |
| POST | `/log` | सार्वजनिक | — | एक डोनेशन लॉग करें। बॉडी: `{ donation, fundData }` |
| POST | `/webhook/:provider` | सार्वजनिक | — | पेमेंट वेबहुक इवेंट्स प्राप्त करें (Stripe, PayPal)। `?churchId=` आवश्यक है |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | किसी तारीख सीमा के लिए Stripe इवेंट्स फिर से चलाएं। बॉडी: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | सार्वजनिक | — | ट्रांज़ैक्शन फ़ीस कैलकुलेट करें। बॉडी: `{ type, provider, gatewayId, amount, currency }`। `?churchId=` आवश्यक है |
| POST | `/captcha-verify` | सार्वजनिक | — | reCAPTCHA टोकन वेरिफ़ाई करें। बॉडी: `{ token }` |

### उदाहरण: एक डोनेशन चार्ज प्रोसेस करें

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

### उदाहरण: एक आवर्ती सब्सक्रिप्शन बनाएं

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

बेस पथ: `/giving/funds`

CRUD रूट्स के साथ `GenericCrudController` को विस्तारित करता है: `getById`, `getAll`, `post`, `delete`। `view` अनुमति `null` है (फंड्स देखने के लिए कोई अनुमति आवश्यक नहीं)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी फंड्स सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से एक फंड प्राप्त करें |
| GET | `/churchId/:churchId` | सार्वजनिक | — | किसी विशिष्ट चर्च के सभी फंड्स प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | सार्वजनिक | — | किसी फंड का डोनेशन टोटल प्राप्त करें: `{ fundId, totalAmount, donationCount }`। वेबसाइट बिल्डर के `campaignProgress` एलिमेंट को पावर देता है |
| POST | `/` | JWT | Donations.Edit | फंड्स बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | एक फंड हटाएं |

## Fund Donations

बेस पथ: `/giving/funddonations`

ट्रैक करता है कि व्यक्तिगत डोनेशंस को फंड्स में कैसे आवंटित किया जाता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट्स कस्टम हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | फंड डोनेशंस सूचीबद्ध करें। `?donationId=`, `?personId=`, `?fundId=`, या `?fundName=` से फ़िल्टर करें। तारीख फ़िल्टरिंग के लिए वैकल्पिक रूप से `?startDate=&endDate=` जोड़ें |
| GET | `/:id` | JWT | Donations.View | ID से एक फंड डोनेशन प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान यूज़र के फंड डोनेशंस प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | फंड डोनेशंस बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Donations.Edit | एक फंड डोनेशन हटाएं |

## Gateways

बेस पथ: `/giving/gateways`

पेमेंट गेटवे कॉन्फ़िगरेशंस (Stripe, PayPal, आदि) को मैनेज करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट्स कस्टम हैं। गेटवे सीक्रेट्स रेस्ट में एन्क्रिप्टेड होते हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के लिए सभी गेटवे सूचीबद्ध करें |
| GET | `/:id` | JWT | Settings.Edit | ID से एक गेटवे प्राप्त करें |
| GET | `/churchId/:churchId` | सार्वजनिक | — | किसी चर्च के लिए गेटवे प्राप्त करें (केवल पब्लिक कीज़) |
| GET | `/configured/:churchId` | सार्वजनिक | — | जांचें कि किसी चर्च के पास कॉन्फ़िगर्ड पेमेंट गेटवे है या नहीं |
| POST | `/` | JWT | Settings.Edit | गेटवे बनाएं या अपडेट करें (कीज़ को एन्क्रिप्ट करता है, वेबहुक्स और प्रोडक्ट्स प्रोविज़न करता है) |
| PATCH | `/:id` | JWT | Settings.Edit | किसी गेटवे को आंशिक रूप से अपडेट करें |
| DELETE | `/:id` | JWT | Settings.Edit | एक गेटवे हटाएं (उसके वेबहुक्स भी हटाता है) |

### उदाहरण: गेटवे कॉन्फ़िगरेशन जांचें

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Customers

बेस पथ: `/giving/customers`

CRUD रूट्स के साथ `GenericCrudController` को विस्तारित करता है: `getAll`, `delete`। लोगों को उनके पेमेंट गेटवे कस्टमर रिकॉर्ड्स से जोड़ता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी कस्टमर्स सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary या खुद का रिकॉर्ड | ID से एक कस्टमर प्राप्त करें |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary या खुद का रिकॉर्ड | किसी कस्टमर के लिए गेटवे सब्सक्रिप्शंस प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | एक कस्टमर हटाएं |

## Subscriptions

बेस पथ: `/giving/subscriptions`

आवर्ती डोनेशन सब्सक्रिप्शंस को मैनेज करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट्स कस्टम हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी सब्सक्रिप्शंस सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से एक सब्सक्रिप्शन प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या खुद का सब्सक्रिप्शन | पेमेंट गेटवे के साथ सब्सक्रिप्शंस अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit या खुद का सब्सक्रिप्शन | एक सब्सक्रिप्शन रद्द करें और डेटाबेस से हटाएं। बॉडी: `{ provider, reason }` |

## Subscription Funds

बेस पथ: `/giving/subscriptionfunds`

आवर्ती सब्सक्रिप्शंस के लिए फंड आवंटन को ट्रैक करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट्स कस्टम हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या खुद का सब्सक्रिप्शन | सब्सक्रिप्शन फंड्स सूचीबद्ध करें। `?subscriptionId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से एक सब्सक्रिप्शन फंड प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | एक सब्सक्रिप्शन फंड हटाएं |
| DELETE | `/subscription/:id` | JWT | Donations.Edit या खुद का सब्सक्रिप्शन | किसी सब्सक्रिप्शन के सभी फंड्स हटाएं |

## Payment Methods

बेस पथ: `/giving/paymentmethods`

पेमेंट गेटवे APIs के ज़रिए सेव किए गए पेमेंट मेथड्स (कार्ड्स, बैंक अकाउंट्स) को मैनेज करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट्स कस्टम हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View या खुद की personId | किसी व्यक्ति के सभी सेव किए गए पेमेंट मेथड्स प्राप्त करें (कार्ड्स, बैंक अकाउंट्स) |
| POST | `/addcard` | JWT | — | एक कार्ड पेमेंट मेथड जोड़ें। बॉडी: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit या खुद की personId | कार्ड विवरण अपडेट करें। बॉडी: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit या खुद की personId | बैंक अकाउंट लिंकिंग के लिए एक Stripe ACH SetupIntent बनाएं। बॉडी: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | सार्वजनिक | — | गेस्ट डोनेशंस के लिए एक अनाम ACH SetupIntent बनाएं। बॉडी: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit या खुद की personId | टोकन के ज़रिए एक बैंक अकाउंट जोड़ें (डिप्रिकेटेड; इसके बजाय `ach-setup-intent` उपयोग करें)। बॉडी: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit या खुद की personId | बैंक अकाउंट विवरण अपडेट करें। बॉडी: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit या खुद का कस्टमर | माइक्रो-डिपॉज़िट्स से बैंक अकाउंट वेरिफ़ाई करें। बॉडी: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit या खुद का कस्टमर | एक पेमेंट मेथड हटाएं (कार्ड या बैंक अकाउंट) |

## Event Log

बेस पथ: `/giving/eventLog`

CRUD रूट्स के साथ `GenericCrudController` को विस्तारित करता है: `getById`, `getAll`, `post`, `delete`। ऑडिटिंग और डीडुप्लिकेशन के लिए पेमेंट गेटवे वेबहुक इवेंट्स को ट्रैक करता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी इवेंट लॉग्स सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से एक इवेंट लॉग प्राप्त करें |
| GET | `/type/:type` | JWT | Donations.ViewSummary | इवेंट टाइप से फ़िल्टर किए गए इवेंट लॉग्स प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | इवेंट लॉग्स बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | एक इवेंट लॉग हटाएं |

## संबंधित पेज

- [Membership एंडपॉइंट्स](./membership) — लोग, चर्चेज़, ग्रुप्स, रोल्स, और परमिशंस
- [Authentication & Permissions](./authentication) — लॉगिन फ़्लो, JWT, OAuth, परमिशन मॉडल
- [Module Structure](../module-structure) — कोड ऑर्गनाइज़ेशन पैटर्न
