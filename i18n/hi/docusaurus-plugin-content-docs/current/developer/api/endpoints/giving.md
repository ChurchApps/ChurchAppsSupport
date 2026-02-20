---
title: "दान एंडपॉइंट"
---

# दान एंडपॉइंट

<div class="article-intro">

Giving मॉड्यूल दान, फंड, भुगतान प्रसंस्करण, सदस्यताओं और संबंधित वित्तीय संचालन का प्रबंधन करता है। यह कई भुगतान गेटवे (Stripe, PayPal) का समर्थन करता है, एकमुश्त और आवर्ती दान को संभालता है, दान बैच को ट्रैक करता है, और असिंक्रोनस भुगतान इवेंट के लिए webhook प्रसंस्करण प्रदान करता है।

</div>

**बेस पथ:** `/giving`

## दान

बेस पथ: `/giving/donations`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या अपना personId | सभी दान सूचीबद्ध करें। `?batchId=` या `?personId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Donations.View | ID द्वारा दान प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के दान प्राप्त करें |
| GET | `/summary` | JWT | Donations.ViewSummary | दान सारांश प्राप्त करें। `?startDate=&endDate=&type=` से फ़िल्टर करें। प्रति-व्यक्ति विश्लेषण के लिए `type=person` उपयोग करें |
| GET | `/testEmail` | Public | — | परीक्षण ईमेल भेजें (विकास/डिबगिंग) |
| POST | `/` | JWT | Donations.Edit | दान बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Donations.Edit | दान हटाएँ |

### उदाहरण: बैच द्वारा दान सूचीबद्ध करें

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

### उदाहरण: दान सारांश प्राप्त करें

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

## दान बैच

बेस पथ: `/giving/donationbatches`

`GenericCrudController` को CRUD रूट: `getById`, `getAll`, `post`, `delete` के साथ विस्तारित करता है। डिलीट ऑपरेशन बैच के भीतर सभी दान भी हटाता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी दान बैच सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा दान बैच प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | दान बैच बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | बैच और उसके सभी दान हटाएँ |

## दान करें

बेस पथ: `/giving/donate`

शुल्क, सदस्यताओं, webhook और शुल्क गणना सहित सार्वजनिक-सामने वाले दान प्रवाह को संभालता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | चर्च के लिए उपलब्ध भुगतान गेटवे प्राप्त करें (केवल सार्वजनिक कुंजी) |
| POST | `/client-token` | JWT | — | गेटवे इनिशियलाइज़ेशन के लिए क्लाइंट टोकन जनरेट करें |
| POST | `/create-order` | JWT | — | भुगतान आदेश बनाएँ (PayPal-शैली चेकआउट) |
| POST | `/charge` | JWT | — | एकमुश्त दान शुल्क प्रोसेस करें |
| POST | `/subscribe` | JWT | — | आवर्ती दान सदस्यता बनाएँ |
| POST | `/log` | Public | — | दान लॉग करें। बॉडी: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | भुगतान webhook इवेंट प्राप्त करें (Stripe, PayPal)। `?churchId=` आवश्यक |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | तिथि सीमा के लिए Stripe इवेंट रीप्ले करें। बॉडी: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | लेनदेन शुल्क गणना करें। बॉडी: `{ type, provider, gatewayId, amount, currency }`। `?churchId=` आवश्यक |
| POST | `/captcha-verify` | Public | — | reCAPTCHA टोकन सत्यापित करें। बॉडी: `{ token }` |

## फंड

बेस पथ: `/giving/funds`

`GenericCrudController` को CRUD रूट: `getById`, `getAll`, `post`, `delete` के साथ विस्तारित करता है। `view` अनुमति `null` है (फंड देखने के लिए कोई अनुमति आवश्यक नहीं)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी फंड सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा फंड प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | विशिष्ट चर्च के सभी फंड प्राप्त करें (सार्वजनिक) |
| POST | `/` | JWT | Donations.Edit | फंड बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | फंड हटाएँ |

## फंड दान

बेस पथ: `/giving/funddonations`

ट्रैक करता है कि व्यक्तिगत दान फंड में कैसे आवंटित किए जाते हैं। कोई बेस CRUD रूट सक्षम नहीं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | फंड दान सूचीबद्ध करें। `?donationId=`, `?personId=`, `?fundId=`, या `?fundName=` से फ़िल्टर करें। वैकल्पिक रूप से `?startDate=&endDate=` तिथि फ़िल्टरिंग जोड़ें |
| GET | `/:id` | JWT | Donations.View | ID द्वारा फंड दान प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के फंड दान प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | फंड दान बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Donations.Edit | फंड दान हटाएँ |

## गेटवे

बेस पथ: `/giving/gateways`

भुगतान गेटवे कॉन्फ़िगरेशन (Stripe, PayPal, आदि) प्रबंधित करता है। कोई बेस CRUD रूट सक्षम नहीं; सभी एंडपॉइंट कस्टम हैं। गेटवे सीक्रेट विश्राम में एन्क्रिप्टेड हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी गेटवे सूचीबद्ध करें |
| GET | `/:id` | JWT | Settings.Edit | ID द्वारा गेटवे प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | चर्च के गेटवे प्राप्त करें (केवल सार्वजनिक कुंजी) |
| GET | `/configured/:churchId` | Public | — | जाँचें कि चर्च में कॉन्फ़िगर किया गया भुगतान गेटवे है या नहीं |
| POST | `/` | JWT | Settings.Edit | गेटवे बनाएँ या अपडेट करें (कुंजियाँ एन्क्रिप्ट करता है, webhook और उत्पाद प्रावधान करता है) |
| PATCH | `/:id` | JWT | Settings.Edit | गेटवे आंशिक रूप से अपडेट करें |
| DELETE | `/:id` | JWT | Settings.Edit | गेटवे हटाएँ (इसके webhook भी हटाता है) |

## ग्राहक

बेस पथ: `/giving/customers`

`GenericCrudController` को CRUD रूट: `getAll`, `delete` के साथ विस्तारित करता है। लोगों को उनके भुगतान गेटवे ग्राहक रिकॉर्ड से जोड़ता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी ग्राहक सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary या अपना रिकॉर्ड | ID द्वारा ग्राहक प्राप्त करें |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary या अपना रिकॉर्ड | ग्राहक के गेटवे सदस्यताएँ प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | ग्राहक हटाएँ |

## सदस्यताएँ

बेस पथ: `/giving/subscriptions`

आवर्ती दान सदस्यताएँ प्रबंधित करता है। कोई बेस CRUD रूट सक्षम नहीं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी सदस्यताएँ सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा सदस्यता प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या अपनी सदस्यता | भुगतान गेटवे के साथ सदस्यताएँ अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit या अपनी सदस्यता | सदस्यता रद्द करें और डेटाबेस से हटाएँ। बॉडी: `{ provider, reason }` |

## सदस्यता फंड

बेस पथ: `/giving/subscriptionfunds`

आवर्ती सदस्यताओं के लिए फंड आवंटन ट्रैक करता है। कोई बेस CRUD रूट सक्षम नहीं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या अपनी सदस्यता | सदस्यता फंड सूचीबद्ध करें। `?subscriptionId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा सदस्यता फंड प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | सदस्यता फंड हटाएँ |
| DELETE | `/subscription/:id` | JWT | Donations.Edit या अपनी सदस्यता | सदस्यता के सभी फंड हटाएँ |

## भुगतान विधियाँ

बेस पथ: `/giving/paymentmethods`

भुगतान गेटवे API के माध्यम से संग्रहीत भुगतान विधियाँ (कार्ड, बैंक खाते) प्रबंधित करता है। कोई बेस CRUD रूट सक्षम नहीं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View या अपना personId | व्यक्ति की सभी संग्रहीत भुगतान विधियाँ प्राप्त करें (कार्ड, बैंक खाते) |
| POST | `/addcard` | JWT | — | कार्ड भुगतान विधि जोड़ें। बॉडी: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit या अपना personId | कार्ड विवरण अपडेट करें। बॉडी: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit या अपना personId | बैंक खाता लिंकिंग के लिए Stripe ACH SetupIntent बनाएँ। बॉडी: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | अतिथि दान के लिए अनाम ACH SetupIntent बनाएँ। बॉडी: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit या अपना personId | टोकन के माध्यम से बैंक खाता जोड़ें (पदावनत; `ach-setup-intent` उपयोग करें)। बॉडी: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit या अपना personId | बैंक खाता विवरण अपडेट करें। बॉडी: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit या अपना ग्राहक | माइक्रो-डिपॉज़िट के साथ बैंक खाता सत्यापित करें। बॉडी: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit या अपना ग्राहक | भुगतान विधि हटाएँ (कार्ड या बैंक खाता) |

## इवेंट लॉग

बेस पथ: `/giving/eventLog`

`GenericCrudController` को CRUD रूट: `getById`, `getAll`, `post`, `delete` के साथ विस्तारित करता है। ऑडिटिंग और डिडुप्लिकेशन के लिए भुगतान गेटवे webhook इवेंट ट्रैक करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी इवेंट लॉग सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा इवेंट लॉग प्राप्त करें |
| GET | `/type/:type` | JWT | Donations.ViewSummary | इवेंट प्रकार द्वारा फ़िल्टर किए गए इवेंट लॉग प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | इवेंट लॉग बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | इवेंट लॉग हटाएँ |

## संबंधित पृष्ठ

- [Membership एंडपॉइंट](./membership) — लोग, चर्च, समूह, भूमिकाएँ और अनुमतियाँ
- [प्रमाणीकरण और अनुमतियाँ](./authentication) — लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [मॉड्यूल संरचना](../module-structure) — कोड संगठन पैटर्न
