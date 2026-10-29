---
title: "Giving Endpoints"
---

# Giving Endpoints

<div class="article-intro">

Giving मॉड्यूल दान, फंड, भुगतान प्रसंस्करण, सदस्यताओं और संबंधित वित्तीय संचालनों का प्रबंधन करता है। यह कई भुगतान गेटवे (Stripe, PayPal) का समर्थन करता है, एक-बार और आवर्ती दान संभालता है, दान बैच ट्रैक करता है, और अतुल्यकालिक भुगतान इवेंट के लिए webhook प्रसंस्करण प्रदान करता है।

</div>

**Base path:** `/giving`

## Donations

Base path: `/giving/donations`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या स्वयं का personId | सभी दान सूचीबद्ध करें। `?batchId=` या `?personId=` से फ़िल्टर करें। `?personId=` के साथ, गैर-कटौती योग्य फंड के उपहार छोड़ दिए जाते हैं (giving statements की तरह), जब तक कि Donations.View कॉलर `&includeNonDeductible=1` न जोड़े, जो B1Admin का व्यक्ति रिकॉर्ड करता है |
| GET | `/:id` | JWT | Donations.View | ID से दान प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के दान प्राप्त करें |
| GET | `/my/summary?year=` | JWT | — | वर्तमान उपयोगकर्ता का किसी वर्ष का कुल दान (डिफ़ॉल्ट इस वर्ष): `{ year, total, count, currency, isConverted }`, कुल चर्च की मुद्रा में परिवर्तित। सदस्य होम पृष्ठ पर giving पूर्वावलोकन को सपोर्ट करता है |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | सीमा (समावेशी) के भीतर दिनांकित दान। दोनों तारीखें `YYYY-MM-DD` के रूप में आवश्यक हैं, अन्यथा `400`। B1Admin के giving statements पृष्ठ इस तरह पूरे चर्च के इतिहास के बजाय एक कैलेंडर वर्ष माँगते हैं |
| GET | `/summary` | JWT | Donations.ViewSummary | दान सारांश प्राप्त करें। `?startDate=&endDate=&type=` से फ़िल्टर करें। प्रति-व्यक्ति विभाजन के लिए `type=person` उपयोग करें |
| GET | `/testEmail` | Public | — | एक परीक्षण ईमेल भेजें (विकास/डीबगिंग) |
| POST | `/` | JWT | Donations.Edit या Donations.Enter | दान (बैच) बनाएँ या अपडेट करें। केवल Donations.Enter के साथ, लक्ष्य बैच और (अपडेट के लिए) दान का वर्तमान बैच दोनों खुले होने चाहिए, और gateway उपहार (जिनमें `transactionId` है) बदले नहीं जा सकते; अन्यथा `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit या Donations.Enter | दान हटाएँ। केवल Donations.Enter: दान एक खुले बैच में होना चाहिए और gateway उपहार नहीं होना चाहिए, अन्यथा `403` |

### उदाहरण: बैच द्वारा दान सूचीबद्ध करना

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

### उदाहरण: दान सारांश प्राप्त करना

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

CRUD routes के साथ `GenericCrudController` को extend करता है: `getById`, `getAll`, `post`, `delete`। delete ऑपरेशन बैच के भीतर सभी दानों को भी हटा देता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary या Donations.Enter | सभी दान बैच सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary या Donations.Enter | ID से दान बैच प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या Donations.Enter | दान बैच बनाएँ या अपडेट करें। केवल Donations.Enter: मौजूदा बैच अपडेट करने के लिए उसका खुला होना आवश्यक है, अन्यथा `403 { "error": "This batch is closed." }`। यहाँ `status` अनदेखा किया जाता है, इसलिए बैच सहेजने से वह फिर से नहीं खुलता |
| POST | `/:id/close` | JWT | Donations.Edit | बैच बंद करें: `status` को `closed`, `closedDate` को अभी, और `closedBy` को कॉलर के उपयोगकर्ता ID पर सेट करता है। बैच लौटाता है |
| POST | `/:id/reopen` | JWT | Donations.Edit | बैच फिर से खोलें: `status` को `open` पर सेट करता है और `closedDate` व `closedBy` साफ़ करता है। बैच लौटाता है |
| DELETE | `/:id` | JWT | Donations.Edit | बैच और उसके सभी दान हटाएँ |

हर बैच में `status` (`open` या `closed`; नए और मौजूदा बैच `open` होते हैं), `closedDate`, और `closedBy` शामिल होते हैं। Donations.Edit किसी भी बैच में दान बदल सकता है; Donations.Enter (भूमिका संपादक में **Enter Donations** के रूप में दिखाया गया) केवल तब दान और फंड विभाजन जोड़, बदल या हटा सकता है जब उनका बैच खुला हो।

## Donate

Base path: `/giving/donate`

चार्ज, सदस्यताएँ, webhooks, और शुल्क गणनाओं सहित सार्वजनिक-सामने वाला दान प्रवाह संभालता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | किसी चर्च के लिए उपलब्ध भुगतान गेटवे प्राप्त करें (केवल public keys) |
| POST | `/client-token` | JWT | — | गेटवे इनिशियलाइज़ेशन के लिए client token जनरेट करें |
| POST | `/create-order` | JWT | — | भुगतान ऑर्डर बनाएँ (PayPal-शैली checkout) |
| POST | `/charge` | JWT | — | एक-बार दान चार्ज प्रोसेस करें |
| POST | `/subscribe` | JWT | — | आवर्ती दान सदस्यता बनाएँ |
| POST | `/log` | Public | — | दान लॉग करें। Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | भुगतान webhook इवेंट प्राप्त करें (Stripe, PayPal)। `?churchId=` आवश्यक |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | किसी तारीख सीमा के लिए Stripe इवेंट पुनः चलाएँ। Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | लेनदेन शुल्क की गणना करें। Body: `{ type, provider, gatewayId, amount, currency }`। `?churchId=` आवश्यक |
| POST | `/captcha-verify` | Public | — | reCAPTCHA टोकन सत्यापित करें। Body: `{ token, churchId? }`। मानव उत्तर `{ response: "human", pass }` लौटाता है, जहाँ `pass` 10 मिनट तक मान्य एक हस्ताक्षरित guest-giving pass है (और केवल तब `churchId` के लिए जब एक भेजा गया हो) |

जब Api `CAPTCHA_ENFORCE=true` के साथ चलता है, तो अतिथि (साइन-इन नहीं) कॉल `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard`, और `/giving/paymentmethods/ach-setup-intent-anon` पर body में वह `captchaPass` शामिल होना चाहिए, अन्यथा वे 403 `Captcha verification required` लौटाते हैं। pass समाप्त होने तक पुनः उपयोग किया जा सकता है, क्योंकि Stripe guest flow दो कॉल करता है (कार्ड जोड़ना, फिर चार्ज)। `CAPTCHA_ENFORCE` डिफ़ॉल्ट रूप से `false` है; `@churchapps/apphelper` के guest giving फ़ॉर्म pass को स्वचालित रूप से भेजते हैं।

### उदाहरण: एक-बार दान चार्ज प्रोसेस करना

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

### उदाहरण: आवर्ती सदस्यता बनाना

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

CRUD routes के साथ `GenericCrudController` को extend करता है: `getById`, `getAll`, `post`, `delete`। `view` अनुमति `null` है (फंड देखने के लिए कोई अनुमति आवश्यक नहीं)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी फंड सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से फंड प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | किसी विशिष्ट चर्च के सभी फंड प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | फंड का दान कुल प्राप्त करें: `{ fundId, totalAmount, donationCount }`। वेबसाइट बिल्डर के `campaignProgress` एलिमेंट को सपोर्ट करता है |
| POST | `/` | JWT | Donations.Edit | फंड बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | फंड हटाएँ |

## Fund Donations

Base path: `/giving/funddonations`

यह ट्रैक करता है कि व्यक्तिगत दान फंड्स में कैसे आवंटित होते हैं। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | fund donations सूचीबद्ध करें। `?donationId=`, `?personId=`, `?fundId=`, या `?fundName=` से फ़िल्टर करें। तारीख फ़िल्टर के लिए वैकल्पिक रूप से `?startDate=&endDate=` जोड़ें |
| GET | `/:id` | JWT | Donations.View | ID से fund donation प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के fund donations प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या Donations.Enter | fund donations (बैच) बनाएँ या अपडेट करें। केवल Donations.Enter: मूल दान एक खुले बैच में होना चाहिए और gateway उपहार नहीं होना चाहिए, अन्यथा `403` |
| DELETE | `/:id` | JWT | Donations.Edit या Donations.Enter | fund donation हटाएँ। Donations.Enter के लिए वही खुले-बैच नियम |

## Gateways

Base path: `/giving/gateways`

भुगतान गेटवे कॉन्फ़िगरेशन (Stripe, PayPal, आदि) प्रबंधित करता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints कस्टम हैं। गेटवे secrets विश्राम अवस्था में एन्क्रिप्टेड होते हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी गेटवे सूचीबद्ध करें |
| GET | `/:id` | JWT | Settings.Edit | ID से गेटवे प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | किसी चर्च के गेटवे प्राप्त करें (केवल public keys) |
| GET | `/configured/:churchId` | Public | — | जाँचें कि किसी चर्च के पास कॉन्फ़िगर किया गया भुगतान गेटवे है या नहीं |
| POST | `/` | JWT | Settings.Edit | गेटवे बनाएँ या अपडेट करें (keys एन्क्रिप्ट करता है, webhooks और products प्रावधान करता है) |
| PATCH | `/:id` | JWT | Settings.Edit | गेटवे को आंशिक रूप से अपडेट करें |
| DELETE | `/:id` | JWT | Settings.Edit | गेटवे हटाएँ (उसके webhooks भी हटाता है) |

### उदाहरण: गेटवे कॉन्फ़िगरेशन जाँचना

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

CRUD routes के साथ `GenericCrudController` को extend करता है: `getAll`, `delete`। लोगों को उनके भुगतान गेटवे customer रिकॉर्ड से जोड़ता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी customers सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary या स्वयं का रिकॉर्ड | ID से customer प्राप्त करें |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary या स्वयं का रिकॉर्ड | किसी customer की गेटवे सदस्यताएँ प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | customer हटाएँ |

## Subscriptions

Base path: `/giving/subscriptions`

आवर्ती दान सदस्यताएँ प्रबंधित करता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी सदस्यताएँ सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से सदस्यता प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या स्वयं की सदस्यता | भुगतान गेटवे के साथ सदस्यताएँ अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit या स्वयं की सदस्यता | सदस्यता रद्द करें और डेटाबेस से हटाएँ। Body: `{ provider, reason }` |

## Subscription Funds

Base path: `/giving/subscriptionfunds`

आवर्ती सदस्यताओं के लिए फंड आवंटन ट्रैक करता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या स्वयं की सदस्यता | subscription funds सूचीबद्ध करें। `?subscriptionId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से subscription fund प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | subscription fund हटाएँ |
| DELETE | `/subscription/:id` | JWT | Donations.Edit या स्वयं की सदस्यता | किसी सदस्यता के सभी फंड हटाएँ |

## Payment Methods

Base path: `/giving/paymentmethods`

भुगतान गेटवे APIs के माध्यम से संग्रहीत भुगतान विधियाँ (कार्ड, बैंक खाते) प्रबंधित करता है। कोई base CRUD routes सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View या स्वयं का personId | किसी व्यक्ति के लिए सभी संग्रहीत भुगतान विधियाँ प्राप्त करें (कार्ड, बैंक खाते) |
| POST | `/addcard` | JWT | — | कार्ड भुगतान विधि जोड़ें। Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit या स्वयं का personId | कार्ड विवरण अपडेट करें। Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit या स्वयं का personId | बैंक खाता लिंक करने के लिए Stripe ACH SetupIntent बनाएँ। Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | अतिथि दानों के लिए अनाम ACH SetupIntent बनाएँ। Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit या स्वयं का personId | token के माध्यम से बैंक खाता जोड़ें (अप्रचलित; `ach-setup-intent` उपयोग करें)। Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit या स्वयं का personId | बैंक खाते का विवरण अपडेट करें। Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit या स्वयं का customer | micro-deposits से बैंक खाते को सत्यापित करें। Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit या स्वयं का customer | भुगतान विधि (कार्ड या बैंक खाता) हटाएँ |

## Event Log

Base path: `/giving/eventLog`

CRUD routes के साथ `GenericCrudController` को extend करता है: `getById`, `getAll`, `post`, `delete`। ऑडिटिंग और डुप्लिकेशन हटाने के लिए भुगतान गेटवे webhook इवेंट ट्रैक करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी event logs सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से event log प्राप्त करें |
| GET | `/type/:type` | JWT | Donations.ViewSummary | इवेंट प्रकार से फ़िल्टर की गई event logs प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | event logs बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | event log हटाएँ |

## संबंधित पृष्ठ

- [Membership Endpoints](./membership) — लोग, चर्च, समूह, भूमिकाएँ, और अनुमतियाँ
- [Authentication & Permissions](./authentication) — लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [Module Structure](../module-structure) — कोड संगठन पैटर्न
