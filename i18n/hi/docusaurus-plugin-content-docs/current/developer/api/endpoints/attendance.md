---
title: "उपस्थिति एंडपॉइंट्स"
---

# उपस्थिति एंडपॉइंट्स

<div class="article-intro">

उपस्थिति (Attendance) मॉड्यूल कैंपस स्थान, सेवाएँ, सेवा समय, उपस्थिति सत्र, विज़िट और विज़िट सत्रों का प्रबंधन करता है। यह ट्रैक करने का आधार देता है कि किस व्यक्ति ने किस सेवा या समूह की बैठक में भाग लिया, चेक-इन कार्यप्रवाह का समर्थन करता है, और उपस्थिति के रुझान और सारांश रिपोर्ट प्रदान करता है।

</div>

**Base path:** `/attendance`

## Campuses

Base path: `/attendance/campuses`

मानक CRUD कंट्रोलर (GenericCrudController का विस्तार)। CRUD बेस क्लास के माध्यम से `getById`, `getAll`, `post` और `delete` रूट प्रदान करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी कैंपस सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID के आधार पर कैंपस प्राप्त करें |
| POST | `/` | JWT | Services.Edit | कैंपस बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | कैंपस हटाएँ |

## Services

Base path: `/attendance/services`

GenericCrudController का विस्तार करता है, जिसमें CRUD रूट `getById`, `getAll`, `post` और `delete` हैं। `getAll` (`GET /`) और `search` एंडपॉइंट कस्टम कार्यान्वयन से ओवरराइड किए गए हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सेवाएँ सूचीबद्ध करें (कैंपस की जानकारी सहित) |
| GET | `/:id` | JWT | — | ID के आधार पर सेवा प्राप्त करें |
| GET | `/search?campusId=` | JWT | — | कैंपस ID के आधार पर सेवाएँ खोजें |
| POST | `/` | JWT | Services.Edit | सेवाएँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | सेवा हटाएँ |

### उदाहरण: कैंपस के आधार पर सेवाएँ खोजें

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Service Times

Base path: `/attendance/servicetimes`

GenericCrudController का विस्तार करता है, जिसमें CRUD रूट `getById`, `post` और `delete` हैं। `getAll` और `search` एंडपॉइंट कस्टम कार्यान्वयन हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सेवा समय सूचीबद्ध करें। `?serviceId=` से फ़िल्टर करें। समूह डेटा जोड़ने के लिए `?include=groups` जोड़ें। प्रत्येक पंक्ति में एक गणना किया गया `checkinOpen` बूलियन शामिल होता है (केवल तभी `false` जब सेवा समय का चेक-इन शेड्यूल हो और उसकी विंडो अभी बंद हो)। यह विंडो सेवा के कैंपस के समय क्षेत्र में मापी जाती है, फिर चर्च के समय क्षेत्र में, फिर पहले कैंपस में जिसका समय क्षेत्र हो, और अंत में `America/New_York` में |
| GET | `/:id` | JWT | — | ID के आधार पर सेवा समय प्राप्त करें |
| GET | `/search?campusId=&serviceId=` | JWT | — | कैंपस और सेवा के आधार पर सेवा समय खोजें |
| GET | `/public/:churchId` | Public | — | किसी चर्च के लिए कैंपस → सेवा → समय का ट्री प्राप्त करें। यह वेबसाइट बिल्डर के `serviceTimes` एलिमेंट को शक्ति देता है |
| POST | `/` | JWT | Services.Edit | सेवा समय बनाएँ या अपडेट करें। वैकल्पिक शेड्यूल फ़ील्ड: `dayOfWeek` (0 = रविवार … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (आरंभ से पहले), `checkinCloseMinutes` (समाप्ति के बाद)। चेक-इन का समय तभी सीमित होता है जब `dayOfWeek` और `startTime` दोनों सेट हों |
| DELETE | `/:id` | JWT | Services.Edit | सेवा समय हटाएँ |

## Group Service Times

Base path: `/attendance/groupservicetimes`

समूहों को विशिष्ट सेवा समय से जोड़ता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूह-सेवा समय संबंध सूचीबद्ध करें। सेवा के नाम सहित संबंध पाने के लिए `?groupId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | — | ID के आधार पर समूह-सेवा समय संबंध प्राप्त करें |
| POST | `/` | JWT | Services.Edit | समूह-सेवा समय संबंध बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | समूह-सेवा समय संबंध हटाएँ |

## Attendance Records

Base path: `/attendance/attendancerecords`

रिपोर्टिंग और प्रदर्शन के लिए उपस्थिति डेटा के केवल-पढ़ने योग्य (read-only) समेकित दृश्य प्रदान करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | किसी व्यक्ति के लिए उपस्थिति रिकॉर्ड लोड करें। `?personId=` आवश्यक है |
| GET | `/my` | JWT | — | स्व-सीमित: साइन-इन सदस्य के अपने पिछले 12 महीनों के उपस्थिति रिकॉर्ड, सबसे नए पहले। यदि उपयोगकर्ता किसी व्यक्ति से जुड़ा नहीं है तो `401` लौटाता है। B1 Me पेज के **My Attendance** अनुभाग को डेटा देता है |
| GET | `/tree` | JWT | — | पूरा उपस्थिति ट्री लोड करें (कैंपस, सेवाएँ, सेवा समय, समूह) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | वैकल्पिक फ़िल्टर के साथ उपस्थिति रुझान डेटा लोड करें |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | किसी दिए गए सप्ताह में किसी सेवा के लिए समूह उपस्थिति लोड करें |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | सेवा समय पर असाइन हर समूह के लिए, उस तारीख का `{ groupId, sessionId, attendanceCount }` लौटाएँ (`date` का प्रारूप `YYYY-MM-DD` है; यदि समूह का कोई सत्र नहीं है तो `sessionId` null होता है)। B1Admin के **Who Still Needs Attendance** डायलॉग को डेटा देता है |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | फ़िल्टर (कैंपस, सेवा, सेवा समय, समूह, तारीख सीमा) के साथ उपस्थिति रिकॉर्ड खोजें |

### उदाहरण: उपस्थिति रुझान

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Sessions

Base path: `/attendance/sessions`

GenericCrudController का विस्तार करता है, जिसमें CRUD रूट `getById` और `delete` हैं। `getAll` और `save` एंडपॉइंट कस्टम कार्यान्वयन हैं जो समूह लीडर्स को अपने समूहों के सत्र प्रबंधित करने की भी अनुमति देते हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View या Group Leader | सभी सत्र सूचीबद्ध करें। `?groupId=` से फ़िल्टर करें (नाम सहित)। समूह लीडर अपने समूहों के सत्र देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID के आधार पर सत्र प्राप्त करें |
| POST | `/` | JWT | Attendance.Edit या Group Leader | सत्र बनाएँ या अपडेट करें। समूह लीडर अपने समूहों के सत्र सहेज सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | सत्र हटाएँ |

## Visits

Base path: `/attendance/visits`

व्यक्तिगत विज़िट रिकॉर्ड (किसी विशिष्ट तारीख को उपस्थित व्यक्ति) प्रबंधित करता है और चेक-इन कार्यप्रवाह प्रदान करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | सभी विज़िट सूचीबद्ध करें। `?personId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Attendance.View | ID के आधार पर विज़िट प्राप्त करें |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View या Attendance.Checkin | किसी सेवा में लोगों के लिए चेक-इन डेटा लोड करें। अंतिम दर्ज की गई तारीख के विज़िट सत्रों सहित विज़िट लौटाता है |
| POST | `/` | JWT | Attendance.Edit | विज़िट बनाएँ या अपडेट करें |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit या Attendance.Checkin | चेक-इन डेटा सबमिट करें। विज़िट और विज़िट सत्र बनाता/अपडेट करता है, और पुराने रिकॉर्ड हटाता है |
| DELETE | `/:id` | JWT | Attendance.Edit | विज़िट हटाएँ |

### उदाहरण: चेक-इन प्रवाह

**चरण 1 -- मौजूदा चेक-इन डेटा लोड करें:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**चरण 2 -- चेक-इन सबमिट करें:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

यदि लक्षित सेवा समय का चेक-इन शेड्यूल है और उसकी विंडो बंद है (उसी कैंपस-प्राथमिकता वाले समय क्षेत्र क्रम में मापी गई जैसे `checkinOpen` के लिए), तो कुछ भी सहेजा नहीं जाता और प्रतिक्रिया `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }` होती है। क्षमता (capacity) और स्वयंसेवक-अनुपात (volunteer-ratio) के उल्लंघन पर भी 409 लौटता है (`error: "capacity"` या `"ratio"`)। जिन सत्रों पर कोई व्यक्ति आज पहले से है (हर चेक-इन पर फिर से पोस्ट किए गए), उनके लिए विंडो जाँच छोड़ दी जाती है, ताकि किसी परिवार के सदस्य किसी पहले वाले सेवा समय की विंडो बंद होने के बाद भी खुले सेवा समय को जोड़ सकें।

## Visit Sessions

Base path: `/attendance/visitsessions`

विज़िट और सत्रों के बीच संबंध प्रबंधित करता है (कि किसी विज़िट के दौरान कोई व्यक्ति किस विशिष्ट सत्र में उपस्थित हुआ)। साथ ही एक त्वरित लॉग एंडपॉइंट और डाउनलोड/एक्सपोर्ट एंडपॉइंट भी प्रदान करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View या Group Leader | विज़िट सत्र सूचीबद्ध करें। `?sessionId=` से फ़िल्टर करें। समूह लीडर अपने समूहों के विज़िट सत्र देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID के आधार पर विज़िट सत्र प्राप्त करें |
| GET | `/download/:sessionId` | JWT | Attendance.View | किसी सत्र की उपस्थिति डाउनलोड करें (उपस्थित/अनुपस्थित स्थिति के साथ व्यक्तियों के नाम लौटाता है) |
| POST | `/` | JWT | Attendance.Edit | विज़िट सत्र बनाएँ या अपडेट करें |
| POST | `/log` | JWT | Attendance.Edit या Group Leader | किसी व्यक्ति की उपस्थिति एक सत्र में त्वरित रूप से लॉग करें। आवश्यकता होने पर स्वचालित रूप से विज़िट बनाता है। समूह लीडर अपने समूहों के लिए उपस्थिति लॉग कर सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | ID के आधार पर विज़िट सत्र हटाएँ |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit या Group Leader | किसी व्यक्ति को सत्र से हटाएँ। विज़िट सत्र हटाता है, और यदि कोई सत्र शेष न रहे तो मूल विज़िट भी हटाता है। समूह लीडर अपने समूहों की उपस्थिति हटा सकते हैं |

### उदाहरण: उपस्थिति त्वरित लॉग करें

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### उदाहरण: सत्र की उपस्थिति डाउनलोड करें

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Streaks

Base path: `/attendance/streaks`

व्यक्तियों के लिए उपस्थिति स्ट्रीक (लगातार वे सप्ताह जिनमें कोई व्यक्ति उपस्थित हुआ) ट्रैक करता है। यह जुड़ाव (engagement) मेट्रिक्स और गेमिफ़िकेशन के लिए उपयोगी है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति के लिए उपस्थिति स्ट्रीक लोड करें |

## Related Pages

- [Membership Endpoints](./membership) — व्यक्ति, समूह, भूमिकाएँ और चर्च प्रबंधन
- [Authentication & Permissions](./authentication) — लॉगिन प्रवाह, JWT, अनुमति मॉडल
- [Module Structure](../module-structure) — कोड संगठन के पैटर्न
