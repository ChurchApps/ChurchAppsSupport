---
title: "सदस्यता एंडपॉइंट"
---

# सदस्यता एंडपॉइंट

<div class="article-intro">

सदस्यता मॉड्यूल लोगों, चर्चों, समूहों, परिवारों, भूमिकाओं, अनुमतियों, फॉर्म, और सेटिंग्स का प्रबंधन करता है। यह सबसे बड़ा मॉड्यूल है और सभी अन्य मॉड्यूल के लिए मुख्य पहचान और प्राधिकरण परत प्रदान करता है।

</div>

**आधार पथ:** `/membership`

## लोग

आधार पथ: `/membership/people`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | \/\ | JWT | People.View या Member | चर्च के लिए सभी लोगों की सूची बनाएं |
| GET | `/:id` | JWT | People.View या खुद का रिकॉर्ड | ID द्वारा व्यक्ति प्राप्त करें (फॉर्म जमा शामिल) |
| GET | `/ids?ids=` | JWT | People.View या Member | अल्पविराम से अलग IDs द्वारा कई लोगों को प्राप्त करें |
| GET | `/basic?ids=` | JWT | — | कई लोगों के लिए बुनियादी जानकारी (केवल नाम) प्राप्त करें |
| GET | `/recent` | JWT | People.View या Member | हाल ही में जोड़े गए लोग |
| GET | `/search?term=&email=` | JWT | People.View या Member | नाम या ईमेल द्वारा लोगों की खोज करें |
| GET | `/search/phone?number=` | JWT | People.View या Member | फोन नंबर द्वारा खोजें |
| GET | `/search/group?groupId=` | JWT | People.View या Member | किसी विशिष्ट समूह में लोगों को प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | एक परिवार के सभी लोगों को प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | फ़िल्टर के साथ उपस्थित लोगों को लोड करें (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और समूहों के लिए टाइमलाइन डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | निर्देशिका दृश्य के लिए व्यक्ति प्राप्त करें (दृश्यता प्राथमिकताओं को सम्मान करता है) |
| GET | `/claim/:churchId` | JWT | — | चर्च में वर्तमान उपयोगकर्ता के लिए एक व्यक्ति रिकॉर्ड दावा करें |
| POST | \/\ | JWT | People.Edit या EditSelf | लोगों को बनाएं या अपडेट करें (बैच) |
| POST | `/search` | JWT | People.View या Member | लोगों की खोज करें (POST वेरिएंट) |
| POST | `/advancedSearch` | JWT | People.View या Member | बहु-स्थिति खोज (आयु, जन्मMonth, सदस्यता स्थिति, आदि) |
| POST | `/loadOrCreate` | सार्वजनिक | — | ईमेल द्वारा व्यक्ति को खोजें या बनाएं। बॉडी: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | परिवार सदस्य असाइनमेंट अपडेट करें |
| POST | `/public/email` | सार्वजनिक | — | किसी व्यक्ति को ईमेल भेजें। बॉडी: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | आंतरिक | — | IDs द्वारा व्यक्ति ईमेल लोड करें (सर्वर-से-सर्वर, jwtSecret की आवश्यकता है) |
| DELETE | `/:id` | JWT | People.Edit | व्यक्ति को हटाएं |

### उदाहरण: लोगों की खोज करें

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### उदाहरण: व्यक्ति बनाएं

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## उपयोगकर्ता

आधार पथ: `/membership/users`

लॉगिन, पंजीकरण, और पासवर्ड प्रबंधन एंडपॉइंट के लिए [प्रमाणीकरण और अनुमतियां](./authentication) देखें।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/login` | सार्वजनिक | — | लॉग इन करें (ईमेल/पासवर्ड, JWT रीफ्रेश, या authGuid) |
| POST | `/register` | सार्वजनिक | — | एक नया उपयोगकर्ता पंजीकृत करें |
| POST | `/forgot` | सार्वजनिक | — | पासवर्ड रीसेट ईमेल भेजें |
| POST | `/setPasswordGuid` | सार्वजनिक | — | ईमेल लिंक से auth GUID का उपयोग करके पासवर्ड सेट करें |
| POST | `/verifyCredentials` | सार्वजनिक | — | ईमेल/पासवर्ड सत्यापित करें और संबंधित चर्च लौटाएं |
| POST | `/loadOrCreate` | JWT | — | ईमेल/userId द्वारा उपयोगकर्ता को खोजें या बनाएं |
| POST | `/setDisplayName` | JWT | — | उपयोगकर्ता का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | उपयोगकर्ता के ईमेल पता को बदलें |
| POST | `/updatePassword` | JWT | — | उपयोगकर्ता का पासवर्ड बदलें (न्यूनतम 6 वर्ण) |
| POST | `/updateOptedOut` | JWT | — | किसी व्यक्ति की ऑप्ट-आउट स्थिति सेट करें |
| GET | `/search?term=` | JWT | Server.Admin | नाम/ईमेल द्वारा सभी उपयोगकर्ताओं की खोज करें |
| DELETE | \/\ | JWT | — | वर्तमान उपयोगकर्ता खाता हटाएं |

## चर्च

आधार पथ: `/membership/churches`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | \/\ | JWT | — | वर्तमान उपयोगकर्ता के लिए सभी चर्च लोड करें |
| GET | `/:id` | JWT | — | ID द्वारा चर्च प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | चर्च के लिए डोमेन व्यवस्थापक उपयोगकर्ता प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | एक चर्च को नकल करें (केवल सर्वर व्यवस्थापक) |
