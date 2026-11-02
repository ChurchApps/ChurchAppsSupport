---
title: "Giving Endpoints"
---

# Giving Endpoints

<div class="article-intro">

Giving मॉड्यूल दान, फंड, भुगतान प्रसंस्करण, सदस्यताएँ और संबंधित वित्तीय संचालन प्रबंधित करता है। यह कई भुगतान गेटवे (Stripe, PayPal) का समर्थन करता है, एकबारगी और आवर्ती दान संभालता है, दान बैच ट्रैक करता है, और अतुल्यकालिक (asynchronous) भुगतान घटनाओं के लिए webhook प्रसंस्करण प्रदान करता है।

</div>

**Base path:** `/giving`

## दान (Donations)

Base path: `/giving/donations`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या स्वयं का personId | सभी दान सूचीबद्ध करें। `?batchId=` या `?personId=` से फ़िल्टर करें। `?personId=` के साथ, गैर-कर-कटौती योग्य फंड के उपहार छोड़ दिए जाते हैं (giving statements की तरह), जब तक कोई Donations.View कॉलर `&includeNonDeductible=1` न जोड़े, जो B1Admin का व्यक्ति रिकॉर्ड करता है |
| GET | `/:id` | JWT | Donations.View | ID से दान प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के दान प्राप्त करें |
| GET | `/my/summary?year=` | JWT | — | वर्तमान उपयोगकर्ता का किसी वर्ष का कुल दान (डिफ़ॉल्ट इस वर्ष): `{ year, total, count, currency, isConverted }`, कुल चर्च मुद्रा में परिवर्तित। सदस्य होम पृष्ठ पर giving पूर्वावलोकन का समर्थन करता है |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | सीमा (समावेशी) में दिनांकित दान। दोनों तारीखें `YYYY-MM-DD` के रूप में आवश्यक हैं, अन्यथा `400`। B1Admin के giving statements पृष्ठ इसी तरह एक कैलेंडर वर्ष माँगते हैं, चर्च के पूरे इतिहास के बजाय |
| GET | `/summary` | JWT | Donations.ViewSummary | दान सारांश प्राप्त करें। `?startDate=&endDate=&type=` से फ़िल्टर करें। प्रति-व्यक्ति विवरण के लिए `type=person` उपयोग करें |
| GET | `/testEmail` | Public | — | परीक्षण ईमेल भेजें (विकास/डीबगिंग) |
| POST | `/` | JWT | Donations.Edit या Donations.Enter | दान (बैच) बनाएँ या अपडेट करें। केवल Donations.Enter के साथ, लक्ष्य बैच और (अपडेट के लिए) दान का वर्तमान बैच दोनों खुले होने चाहिए, और गेटवे उपहार (जिनमें `transactionId` है) बदले नहीं जा सकते; अन्यथा `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit या Donations.Enter | दान हटाएँ। केवल Donations.Enter: दान खुले बैच में होना चाहिए और गेटवे उपहार नहीं होना चाहिए, अन्यथा `403` |

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

## दान बैच (Donation Batches) {#donation-batches}

Base path: `/giving/donationbatches`

`GenericCrudController` का विस्तार करता है, CRUD रूट के साथ: `getById`, `getAll`, `post`, `delete`। डिलीट ऑपरेशन बैच के भीतर के सभी दान भी हटा देता है।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary या Donations.Enter | सभी दान बैच सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary या Donations.Enter | ID से दान बैच प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या Donations.Enter | दान बैच बनाएँ या अपडेट करें। केवल Donations.Enter: मौजूदा बैच अपडेट करने के लिए उसका खुला होना आवश्यक है, अन्यथा `403 { "error": "This batch is closed." }`। यहाँ `status` अनदेखा होता है, इसलिए बैच सहेजने से वह फिर से नहीं खुलता |
| POST | `/:id/close` | JWT | Donations.Edit | बैच बंद करें: `status` को `closed`, `closedDate` को अभी, और `closedBy` को कॉलर की user id पर सेट करता है। बैच लौटाता है |
| POST | `/:id/reopen` | JWT | Donations.Edit | बैच फिर से खोलें: `status` को `open` पर सेट करता है और `closedDate` व `closedBy` साफ़ करता है। बैच लौटाता है |
| DELETE | `/:id` | JWT | Donations.Edit | बैच और उसके सभी दान हटाएँ |

हर बैच में `status` (`open` या `closed`; नए और मौजूदा बैच `open` हैं), `closedDate`, और `closedBy` शामिल होते हैं। Donations.Edit किसी भी बैच के दान बदल सकता है; Donations.Enter (भूमिका संपादक में **Enter Donations** के रूप में दिखाया गया) केवल तब दान और फंड विभाजन जोड़, बदल या हटा सकता है जब उनका बैच खुला हो।

## Donate

Base path: `/giving/donate`

सार्वजनिक दान प्रवाह को संभालता है, जिसमें शुल्क, सदस्यताएँ, webhooks और शुल्क गणनाएँ शामिल हैं। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | किसी चर्च के लिए उपलब्ध भुगतान गेटवे प्राप्त करें (केवल सार्वजनिक keys) |
| POST | `/client-token` | JWT | — | गेटवे इनिशियलाइज़ेशन के लिए क्लाइंट टोकन बनाएँ |
| POST | `/create-order` | JWT | — | भुगतान ऑर्डर बनाएँ (PayPal-शैली checkout) |
| POST | `/charge` | JWT | — | एकबारगी दान चार्ज प्रसंस्कृत करें |
| POST | `/subscribe` | JWT | — | आवर्ती दान सदस्यता बनाएँ |
| POST | `/log` | Public | — | दान लॉग करें। बॉडी: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | भुगतान webhook घटनाएँ प्राप्त करें (Stripe, PayPal)। `?churchId=` आवश्यक |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | किसी तारीख सीमा के लिए Stripe घटनाएँ फिर से चलाएँ। बॉडी: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | लेन-देन शुल्क की गणना करें। बॉडी: `{ type, provider, gatewayId, amount, currency }`। `?churchId=` आवश्यक |
| POST | `/captcha-verify` | Public | — | reCAPTCHA टोकन सत्यापित करें। बॉडी: `{ token, churchId? }`। मानवीय उत्तर `{ response: "human", pass }` लौटाता है, जहाँ `pass` 10 मिनट तक वैध एक हस्ताक्षरित guest-giving pass है (और केवल तभी `churchId` के लिए, जब वह भेजा गया हो) |

जब API `CAPTCHA_ENFORCE=true` के साथ चलता है, तो गैर-साइन-इन (guest) कॉल `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard`, और `/giving/paymentmethods/ach-setup-intent-anon` (और guest मूल्य वाले `POST /content/registrations/register` कॉल) को बॉडी में वह `captchaPass` शामिल करना होगा, अन्यथा वे 403 `Captcha verification required` लौटाते हैं। पास समाप्त होने तक पुन: उपयोग किया जा सकता है, क्योंकि Stripe guest प्रवाह दो कॉल करता है (कार्ड जोड़ना, फिर चार्ज)। साइन-इन कॉल प्रभावित नहीं होती। `CAPTCHA_ENFORCE` डिफ़ॉल्ट रूप से `false` है; `@churchapps/apphelper` के guest giving फ़ॉर्म पास को अपने आप भेजते हैं।

### उदाहरण: एकबारगी दान चार्ज प्रसंस्कृत करना

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

## फंड (Funds)

Base path: `/giving/funds`

`GenericCrudController` का विस्तार करता है, CRUD रूट के साथ: `getById`, `getAll`, `post`, `delete`। फंड देखने के लिए `view` अनुमति `null` है (फंड देखने के लिए कोई अनुमति आवश्यक नहीं)।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी फंड सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से फंड प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | किसी विशिष्ट चर्च के सभी फंड प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | किसी फंड का दान कुल: `{ fundId, totalAmount, donationCount }`। वेबसाइट बिल्डर के `campaignProgress` एलिमेंट को शक्ति देता है |
| POST | `/` | JWT | Donations.Edit | फंड बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | फंड हटाएँ |

## फंड दान (Fund Donations)

Base path: `/giving/funddonations`

ट्रैक करता है कि व्यक्तिगत दान फंडों में कैसे आवंटित होते हैं। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | फंड दान सूचीबद्ध करें। `?donationId=`, `?personId=`, `?fundId=`, या `?fundName=` से फ़िल्टर करें। तारीख फ़िल्टर के लिए वैकल्पिक रूप से `?startDate=&endDate=` जोड़ें |
| GET | `/:id` | JWT | Donations.View | ID से फंड दान प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के फंड दान प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या Donations.Enter | फंड दान (बैच) बनाएँ या अपडेट करें। केवल Donations.Enter: मूल दान खुले बैच में होना चाहिए और गेटवे उपहार नहीं होना चाहिए, अन्यथा `403` |
| DELETE | `/:id` | JWT | Donations.Edit या Donations.Enter | फंड दान हटाएँ। Donations.Enter के लिए वही खुले-बैच नियम |

## गेटवे (Gateways)

Base path: `/giving/gateways`

भुगतान गेटवे कॉन्फ़िगरेशन (Stripe, PayPal, आदि) प्रबंधित करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी endpoints कस्टम हैं। गेटवे secrets संग्रह में एन्क्रिप्टेड होते हैं।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी गेटवे सूचीबद्ध करें |
| GET | `/:id` | JWT | Settings.Edit | ID से गेटवे प्राप्त करें |
| GET | `/churchId/:churchId` | Public | — | किसी चर्च के गेटवे प्राप्त करें (केवल सार्वजनिक keys) |
| GET | `/configured/:churchId` | Public | — | जाँचें कि किसी चर्च का भुगतान गेटवे कॉन्फ़िगर है या नहीं |
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

## ग्राहक (Customers)

Base path: `/giving/customers`

`GenericCrudController` का विस्तार करता है, CRUD रूट के साथ: `getAll`, `delete`। लोगों को उनके भुगतान गेटवे ग्राहक रिकॉर्ड से जोड़ता है।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी ग्राहक सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary या स्वयं का रिकॉर्ड | ID से ग्राहक प्राप्त करें |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary या स्वयं का रिकॉर्ड | किसी ग्राहक की गेटवे सदस्यताएँ प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | ग्राहक हटाएँ |

## सदस्यताएँ (Subscriptions)

Base path: `/giving/subscriptions`

आवर्ती दान सदस्यताएँ प्रबंधित करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी सदस्यताएँ सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से सदस्यता प्राप्त करें |
| POST | `/` | JWT | Donations.Edit या स्वयं की सदस्यता | भुगतान गेटवे के साथ सदस्यताएँ अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit या स्वयं की सदस्यता | सदस्यता रद्द करें और डेटाबेस से हटाएँ। बॉडी: `{ provider, reason }` |

## सदस्यता फंड (Subscription Funds)

Base path: `/giving/subscriptionfunds`

आवर्ती सदस्यताओं के लिए फंड आवंटन ट्रैक करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View या स्वयं की सदस्यता | सदस्यता फंड सूचीबद्ध करें। `?subscriptionId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से सदस्यता फंड प्राप्त करें |
| DELETE | `/:id` | JWT | Donations.Edit | सदस्यता फंड हटाएँ |
| DELETE | `/subscription/:id` | JWT | Donations.Edit या स्वयं की सदस्यता | किसी सदस्यता के सभी फंड हटाएँ |

## भुगतान विधियाँ (Payment Methods)

Base path: `/giving/paymentmethods`

भुगतान गेटवे APIs के माध्यम से संग्रहीत भुगतान विधियाँ (कार्ड, बैंक खाते) प्रबंधित करता है। कोई बेस CRUD रूट सक्षम नहीं हैं; सभी endpoints कस्टम हैं।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View या स्वयं का personId | किसी व्यक्ति की सभी संग्रहीत भुगतान विधियाँ प्राप्त करें (कार्ड, बैंक खाते) |
| POST | `/addcard` | JWT | — | कार्ड भुगतान विधि जोड़ें। बॉडी: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit या स्वयं का personId | कार्ड विवरण अपडेट करें। बॉडी: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit या स्वयं का personId | बैंक खाता लिंकिंग के लिए Stripe ACH SetupIntent बनाएँ। बॉडी: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | guest दानों के लिए गुमनाम ACH SetupIntent बनाएँ। बॉडी: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit या स्वयं का personId | टोकन के माध्यम से बैंक खाता जोड़ें (अप्रचलित; `ach-setup-intent` का उपयोग करें)। बॉडी: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit या स्वयं का personId | बैंक खाता विवरण अपडेट करें। बॉडी: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit या स्वयं का ग्राहक | माइक्रो-डिपॉज़िट से बैंक खाता सत्यापित करें। बॉडी: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit या स्वयं का ग्राहक | भुगतान विधि (कार्ड या बैंक खाता) हटाएँ |

## इवेंट लॉग (Event Log)

Base path: `/giving/eventLog`

`GenericCrudController` का विस्तार करता है, CRUD रूट के साथ: `getById`, `getAll`, `post`, `delete`। ऑडिटिंग और डुप्लिकेट हटाने के लिए भुगतान गेटवे webhook घटनाएँ ट्रैक करता है।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | सभी इवेंट लॉग सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID से इवेंट लॉग प्राप्त करें |
| GET | `/type/:type` | JWT | Donations.ViewSummary | इवेंट प्रकार के अनुसार फ़िल्टर किए गए इवेंट लॉग प्राप्त करें |
| POST | `/` | JWT | Donations.Edit | इवेंट लॉग बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | इवेंट लॉग हटाएँ |

## संबंधित पृष्ठ

- [Membership Endpoints](./membership) — लोग, चर्च, समूह, भूमिकाएँ और अनुमतियाँ
- [Authentication & Permissions](./authentication) — लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [Module Structure](../module-structure) — कोड संगठन के पैटर्न
