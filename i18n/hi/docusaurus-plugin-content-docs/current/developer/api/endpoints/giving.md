---
title: "दान एंडपॉइंट"
---

# दान एंडपॉइंट

<div class="article-intro">

दान मॉड्यूल दान, निधि, भुगतान प्रक्रिया, सदस्यता, और संबंधित वित्तीय संचालन का प्रबंधन करता है। यह कई भुगतान गेटवे (Stripe, PayPal) का समर्थन करता है, एकबारी और आवर्ती दान को संभालता है, दान बैच को ट्रैक करता है, और अतुल्यकालिक भुगतान इवेंट के लिए वेबहुक प्रसंस्करण प्रदान करता है।

</div>

**आधार पथ:** `/giving`

## दान

आधार पथ: `/giving/donations`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | \/\ | JWT | Donations.View या खुद की personId | सभी दान सूचीबद्ध करें। `?batchId=` या `?personId=` द्वारा फ़िल्टर करें |
| GET | `/:id` | JWT | Donations.View | ID द्वारा दान प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के दान प्राप्त करें |
| GET | `/summary` | JWT | Donations.ViewSummary | दान सारांश प्राप्त करें। `?startDate=&endDate=&type=` द्वारा फ़िल्टर करें। प्रति-व्यक्ति विच्छेद के लिए \`type=person`\ का उपयोग करें |
| GET | `/testEmail` | सार्वजनिक | — | परीक्षण ईमेल भेजें (विकास/डिबगिंग) |
| POST | \/\ | JWT | Donations.Edit | दान बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Donations.Edit | दान को हटाएं |

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
    "fund": "सामान्य निधि",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## दान बैच

आधार पथ: `/giving/donationbatches`

CRUD मार्ग के साथ `GenericCrudController` विस्तारित करता है: `getById`, `getAll`, `post`, `delete`। हटाने की प्रक्रिया बैच के भीतर सभी दान को भी हटाती है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | \/\ | JWT | Donations.ViewSummary | सभी दान बैच सूचीबद्ध करें |
| GET | `/:id` | JWT | Donations.ViewSummary | ID द्वारा दान बैच प्राप्त करें |
| POST | \/\ | JWT | Donations.Edit | दान बैच बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Donations.Edit | बैच और इसके सभी दान को हटाएं |

## दान करें

आधार पथ: `/giving/donate`

सार्वजनिक-सामना दान प्रवाह को संभालता है जिसमें प्रभार, सदस्यता, वेबहुक, और शुल्क गणना शामिल हैं। कोई आधार CRUD मार्ग सक्षम नहीं हैं; सभी एंडपॉइंट कस्टम हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | सार्वजनिक | — | चर्च के लिए उपलब्ध भुगतान गेटवे प्राप्त करें (केवल सार्वजनिक कुंजी) |
| POST | `/client-token` | JWT | — | गेटवे इनिशियलाइजेशन के लिए एक क्लाइंट टोकन उत्पन्न करें |
| POST | `/create-order` | JWT | — | भुगतान ऑर्डर बनाएं (PayPal-शैली चेकआउट) |
| POST | `/charge` | JWT | — | एकबारी दान प्रभार संसाधित करें |
| POST | `/subscribe` | JWT | — | एक आवर्ती दान सदस्यता बनाएं |
| POST | `/log` | सार्वजनिक | — | दान लॉग करें। बॉडी: `{ donation, fundData }` |
| POST | `/webhook/:provider` | सार्वजनिक | — | भुगतान वेबहुक इवेंट प्राप्त करें (Stripe, PayPal)। `?churchId=` आवश्यक है |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | तारीख सीमा के लिए Stripe इवेंट को पुनः चलाएं। बॉडी: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | सार्वजनिक | — | लेनदेन शुल्क की गणना करें। बॉडी: `{ type, provider, gatewayId, amount, currency }`। `?churchId=` आवश्यक है |
| POST | `/captcha-verify` | सार्वजनिक | — | reCAPTCHA टोकन सत्यापित करें। बॉडी: `{ token }` |

### उदाहरण: दान प्रभार संसाधित करें
