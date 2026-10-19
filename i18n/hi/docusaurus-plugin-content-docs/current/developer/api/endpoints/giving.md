---
title: "दान एंडपॉइंट्स"
---

# दान एंडपॉइंट्स

<div class="article-intro">

दान मॉड्यूल दान, फ़ंड, भुगतान प्रसंस्करण, सब्सक्रिप्शन और संबंधित वित्तीय कार्यों का प्रबंधन करता है। यह कई भुगतान गेटवे (Stripe, PayPal) का समर्थन करता है, एक-बार और आवर्ती दान संभालता है, दान बैच ट्रैक करता है, और अतुल्यकालिक भुगतान घटनाओं के लिए webhook प्रसंस्करण प्रदान करता है।

</div>

**आधार पथ:** `/giving`

## दान

आधार पथ: `/giving/donations`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own personId | सभी दान की सूची। `?batchId=` या `?personId=` से फ़िल्टर करें। `?personId=` के साथ, गैर-कटौती योग्य फ़ंड के उपहार छोड़ दिए जाते हैं (दान विवरण की तरह), जब तक Donations.View वाला कॉलर `&includeNonDeductible=1` न जोड़े, जो B1Admin का व्यक्ति रिकॉर्ड करता है |
| GET | `/:id` | JWT | Donations.View | ID से दान प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के दान प्राप्त करें |
| GET | `/my/summary?year=` | JWT | — | वर्तमान उपयोगकर्ता का किसी वर्ष का कुल दान (डिफ़ॉल्ट इस वर्ष): `{ year, total, count, currency, isConverted }`, कुल चर्च की मुद्रा में परिवर्तित। सदस्य होम पेज पर दान पूर्वावलोकन को शक्ति देता है |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | तिथि सीमा में दान (समावेशी)। दोनों तिथियाँ `YYYY-MM-DD` रूप में आवश्यक हैं, अन्यथा `400`। B1Admin के दान विवरण पृष्ठ इसी तरह चर्च के पूरे इतिहास के बजाय एक कैलेंडर वर्ष का अनुरोध करते हैं |
| GET | `/summary` | JWT | Donations.ViewSummary | दान सारांश प्राप्त करें। `?startDate=&endDate=&type=` से फ़िल्टर करें। व्यक्ति-वार विवरण के लिए `type=person` उपयोग करें |
| GET | `/testEmail` | Public | — | परीक्षण ईमेल भेजें (विकास/डीबगिंग के लिए) |
| POST | `/` | JWT | Donations.Edit or Donations.Enter | दान बनाएँ या अपडेट करें (बैच)। केवल Donations.Enter के साथ, लक्ष्य बैच और (अपडेट के लिए) दान का वर्तमान बैच, दोनों खुले होने चाहिए, और गेटवे उपहार (जिनमें `transactionId` है) नहीं बदले जा सकते; अन्यथा `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit or Donations.Enter | दान हटाएँ। केवल Donations.Enter: दान किसी खुले बैच में होना चाहिए और गेटवे उपहार नहीं होना चाहिए, अन्यथा `403` |

### उदाहरण: बैच के अनुसार दान सूची

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

## दान बैच {#donation-batches}

आधार पथ: `/giving/donationbatches`

CRUD रूट `getById`, `getAll`, `post`, `delete` के साथ `GenericCrudController` का विस्तार करता है। डिलीट ऑपरेशन बैच के सभी दान भी हटा देता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary or Donations.Enter | सभी दान बैच की सूची |
| GET | `/:id` | JWT | Donations.ViewSummary or Donations.Enter | ID से दान बैच प्राप्त करें |
| POST | `/` | JWT | Donations.Edit or Donations.Enter | दान बैच बनाएँ या अपडेट करें। केवल Donations.Enter: मौजूदा बैच अपडेट करने के लिए उसका खुला होना आवश्यक है, अन्यथा `403 { "error": "This batch is closed." }`। यहाँ `status` अनदेखा किया जाता है, इसलिए बैच सहेजने से वह दोबारा नहीं खुलता |
| POST | `/:id/close` | JWT | Donations.Edit | बैच बंद करें: `status` को `closed`, `closedDate` को अभी के समय, और `closedBy` को कॉलर की user id पर सेट करता है। बैच लौटाता है |
| POST | `/:id/reopen` | JWT | Donations.Edit | बैच दोबारा खोलें: `status` को `open` पर सेट करता है और `closedDate` और `closedBy` साफ़ करता है। बैच लौटाता है |
| DELETE | `/:id` | JWT | Donations.Edit | बैच और उसके सभी दान हटाएँ |

हर बैच में `status` (`open` या `closed`; नए और मौजूदा सभी बैच `open` होते हैं), `closedDate`, और `closedBy` शामिल होते हैं। Donations.Edit किसी भी बैच के दान बदल सकता है; Donations.Enter (भूमिका संपादक में **Enter Donations** के रूप में दिखाया गया) केवल तभी दान और फ़ंड विभाजन जोड़, बदल या हटा सकता है जब उसका बैच खुला हो।

## दान (Donate)

आधार पथ: `/giving/donate`

सार्वजनिक दान प्रवाह को संभालता है, जिसमें शुल्क, सब्सक्रिप्शन, webhooks और शुल्क गणनाएँ शामिल हैं। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | किसी चर्च के लिए उपलब्ध भुगतान गेटवे प्राप्त करें (केवल सार्वजनिक कुंजियाँ) |
| POST | `/client-token` | JWT | — | गेटवे इनिशियलाइज़ेशन के लिए क्लाइंट टोकन बनाएँ |
| POST | `/create-order` | JWT | — | भुगतान ऑर्डर बनाएँ (PayPal-शैली चेकआउट) |
| POST | `/charge` | JWT | — | एक-बार दान शुल्क संसाधित करें |
| POST | `/subscribe` | JWT | — | आवर्ती दान सब्सक्रिप्शन बनाएँ |
| POST | `/log` | Public | — | दान लॉग करें। बॉडी: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | भुगतान webhook घटनाएँ प्राप्त करें (Stripe, PayPal)। `?churchId=` आवश्यक |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | किसी तिथि सीमा के लिए Stripe घटनाएँ फिर से चलाएँ। बॉडी: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | लेनदेन शुल्क की गणना करें। बॉडी: `{ type, provider, gatewayId, amount, currency }`। `?churchId=` आवश्यक |
| POST | `/captcha-verify` | Public | — | reCAPTCHA टोकन सत्यापित करें। बॉडी: `{ token }` |

### उदाहरण: एक-बार दान शुल्क संसाधित करें

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

### उदाहरण: आवर्ती सब्सक्रिप्शन बनाएँ

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

## फ़ंड

आधार पथ: `/giving/funds`

CRUD रूट `getById`, `getAll`, `post`, `delete` के साथ `GenericCrudController` का विस्तार करता है। फ़ंड देखने के लिए `view` अनुमति `null` है (कोई अनुमति आवश्यक नहीं)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी फ़ंड की सूची |
| GET | `/:id` | JWT | — | ID से फ़ंड प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | किसी विशेष चर्च के सभी फ़ंड प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | किसी फ़ंड का दान कुल प्राप्त करें: `{ fundId, totalAmount, donationCount }`। वेबसाइट बिल्डर के `campaignProgress` एलिमेंट को शक्ति देता है |
| POST | `/` | JWT | Donations.Edit | फ़ंड बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | फ़ंड हटाएँ |

## फ़ंड दान

आधार पथ: `/giving/funddonations`

यह ट्रैक करता है कि व्यक्तिगत दान फ़ंड में कैसे बाँटे गए। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | फ़ंड दान की सूची। `?donationId=`, `?personId=`, `?fundId=`, या `?fundName=` से फ़िल्टर करें। तिथि फ़िल्टर के लिए वैकल्पिक रूप से `?startDate=&endDate=` जोड़ें |
| GET | `/:id` | JWT | Donations.View | ID से फ़ंड दान प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के फ़ंड दान प्राप्त करें |
| POST | `/` | JWT | Donations.Edit or Donations.Enter | फ़ंड दान बनाएँ या अपडेट करें (बैच)। केवल Donations.Enter: मूल दान किसी खुले बैच में होना चाहिए और गेटवे उपहार नहीं होना चाहिए, अन्यथा `403` |
| DELETE | `/:id` | JWT | Donations.Edit or Donations.Enter | फ़ंड दान हटाएँ। Donations.Enter के लिए वही खुले-बैच नियम लागू |

## गेटवे

आधार पथ: `/giving/gateways`

भुगतान गेटवे कॉन्फ़िगरेशन (Stripe, PayPal, आदि) का प्रबंधन करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट कस्टम हैं। गेटवे की गोपनीय जानकारी संग्रहीत होने पर एन्क्रिप्टेड रहती है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी गेटवे की सूची |
| GET | `/:id` | JWT | Settings.Edit | ID से गेटवे प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | किसी चर्च के गेटवे प्राप्त करें (केवल सार्वजनिक कुंजियाँ) |
| GET | `/configured/:churchId` | Public | — | जाँचें कि किसी चर्च ने भुगतान गेटवे कॉन्फ़िगर किया है या नहीं |
| POST | `/` | JWT | Settings.Edit | गेटवे बनाएँ या अपडेट करें (कुंजियाँ एन्क्रिप्ट करता है, webhooks और उत्पाद तैयार करता है) |
| PATCH | `/:id` | JWT | Settings.Edit | गेटवे को आंशिक रूप से अपडेट करें |
| DELETE | `/:id` | JWT | Settings.Edit | गेटवे हटाएँ (उसके webhooks भी हटाता है) |

### उदाहरण: गेटवे कॉन्फ़िगरेशन जाँचें

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## ग्राहक

आधार पथ: `/giving/customers`

CRUD रूट `getAll`, `delete` के साथ `GenericCrudController` का विस्तार करता है। लोगों को उनके भुगतान गेटवे ग्राहक रिकॉर्ड से जोड़ता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी ग्राहकों की सूची |
| GET | `/:id` | JWT | Donations.ViewSummary or own record | ID से ग्राहक प्राप्त करें |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary or own record | किसी ग्राहक के गेटवे सब्सक्रिप्शन प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | ग्राहक हटाएँ |

## सब्सक्रिप्शन

आधार पथ: `/giving/subscriptions`

आवर्ती दान सब्सक्रिप्शन का प्रबंधन करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी सब्सक्रिप्शन की सूची |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से सब्सक्रिप्शन प्राप्त करें |
| POST | `/` | JWT | Donations.Edit or own subscription | भुगतान गेटवे के साथ सब्सक्रिप्शन अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit or own subscription | सब्सक्रिप्शन रद्द करें और डेटाबेस से हटाएँ। बॉडी: `{ provider, reason }` |

## सब्सक्रिप्शन फ़ंड

आधार पथ: `/giving/subscriptionfunds`

आवर्ती सब्सक्रिप्शन के फ़ंड आवंटन ट्रैक करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own subscription | सब्सक्रिप्शन फ़ंड की सूची। `?subscriptionId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से सब्सक्रिप्शन फ़ंड प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | सब्सक्रिप्शन फ़ंड हटाएँ |
| DELETE | `/subscription/:id` | JWT | Donations.Edit or own subscription | किसी सब्सक्रिप्शन के सभी फ़ंड हटाएँ |

## भुगतान विधियाँ

आधार पथ: `/giving/paymentmethods`

भुगतान गेटवे APIs के माध्यम से संग्रहीत भुगतान विधियों (कार्ड, बैंक खाते) का प्रबंधन करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी एंडपॉइंट कस्टम हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View or own personId | किसी व्यक्ति की सभी संग्रहीत भुगतान विधियाँ प्राप्त करें (कार्ड, बैंक खाते) |
| POST | `/addcard` | JWT | — | कार्ड भुगतान विधि जोड़ें। बॉडी: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit or own personId | कार्ड विवरण अपडेट करें। बॉडी: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit or own personId | बैंक खाता जोड़ने के लिए Stripe ACH SetupIntent बनाएँ। बॉडी: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | अतिथि दान के लिए गुमनाम ACH SetupIntent बनाएँ। बॉडी: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit or own personId | टोकन के माध्यम से बैंक खाता जोड़ें (अप्रचलित; `ach-setup-intent` उपयोग करें)। बॉडी: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit or own personId | बैंक खाते का विवरण अपडेट करें। बॉडी: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit or own customer | माइक्रो-डिपॉज़िट से बैंक खाता सत्यापित करें। बॉडी: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit or own customer | भुगतान विधि (कार्ड या बैंक खाता) हटाएँ |

## इवेंट लॉग

आधार पथ: `/giving/eventLog`

CRUD रूट `getById`, `getAll`, `post`, `delete` के साथ `GenericCrudController` का विस्तार करता है। ऑडिटिंग और डुप्लिकेट रोकथाम के लिए भुगतान गेटवे webhook घटनाएँ ट्रैक करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी इवेंट लॉग की सूची |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से इवेंट लॉग प्राप्त करें |
| GET | `/type/:type` | JWT | Donations.ViewSummary | इवेंट प्रकार के अनुसार फ़िल्टर किए गए इवेंट लॉग प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | इवेंट लॉग बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | इवेंट लॉग हटाएँ |

## संबंधित पृष्ठ

- [मेंबरशिप एंडपॉइंट्स](./membership) — लोग, चर्च, समूह, भूमिकाएँ और अनुमतियाँ
- [प्रमाणीकरण और अनुमतियाँ](./authentication) — लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [मॉड्यूल संरचना](../module-structure) — कोड संगठन के पैटर्न
