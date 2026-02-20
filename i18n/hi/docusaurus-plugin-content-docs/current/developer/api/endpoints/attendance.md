---
title: "उपस्थिति एंडपॉइंट"
---

# उपस्थिति एंडपॉइंट

<div class="article-intro">

Attendance मॉड्यूल कैम्पस स्थानों, सेवाओं, सेवा समय, उपस्थिति सत्रों, विज़िट और विज़िट सत्रों का प्रबंधन करता है। यह ट्रैक करने के लिए बुनियादी ढाँचा प्रदान करता है कि किसने किस सेवा या समूह बैठक में भाग लिया, चेक-इन वर्कफ़्लो का समर्थन करता है, और उपस्थिति प्रवृत्ति व सारांश रिपोर्टिंग प्रदान करता है।

</div>

**बेस पथ:** `/attendance`

## कैम्पस

बेस पथ: `/attendance/campuses`

मानक CRUD कंट्रोलर (GenericCrudController को विस्तारित करता है)। CRUD बेस क्लास के माध्यम से `getById`, `getAll`, `post`, और `delete` रूट प्रदान करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी कैम्पस सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा कैम्पस प्राप्त करें |
| POST | `/` | JWT | Services.Edit | कैम्पस बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | कैम्पस हटाएँ |

## सेवाएँ

बेस पथ: `/attendance/services`

GenericCrudController को CRUD रूट `getById`, `getAll`, `post`, और `delete` के साथ विस्तारित करता है। `getAll` (`GET /`) और `search` एंडपॉइंट कस्टम कार्यान्वयन के साथ ओवरराइड किए गए हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सेवाएँ सूचीबद्ध करें (कैम्पस जानकारी सहित) |
| GET | `/:id` | JWT | — | ID द्वारा सेवा प्राप्त करें |
| GET | `/search?campusId=` | JWT | — | कैम्पस ID द्वारा सेवाएँ खोजें |
| POST | `/` | JWT | Services.Edit | सेवाएँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | सेवा हटाएँ |

### उदाहरण: कैम्पस द्वारा सेवाएँ खोजें

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

## सेवा समय

बेस पथ: `/attendance/servicetimes`

GenericCrudController को CRUD रूट `getById`, `post`, और `delete` के साथ विस्तारित करता है। `getAll` और `search` एंडपॉइंट कस्टम कार्यान्वयन हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सेवा समय सूचीबद्ध करें। `?serviceId=` से फ़िल्टर करें। समूह डेटा जोड़ने के लिए `?include=groups` जोड़ें |
| GET | `/:id` | JWT | — | ID द्वारा सेवा समय प्राप्त करें |
| GET | `/search?campusId=&serviceId=` | JWT | — | कैम्पस और सेवा द्वारा सेवा समय खोजें |
| POST | `/` | JWT | Services.Edit | सेवा समय बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | सेवा समय हटाएँ |

## समूह सेवा समय

बेस पथ: `/attendance/groupservicetimes`

समूहों को विशिष्ट सेवा समय से जोड़ता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूह-सेवा-समय संबंध सूचीबद्ध करें। सेवा नामों के साथ संबंध प्राप्त करने के लिए `?groupId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | — | ID द्वारा समूह-सेवा-समय संबंध प्राप्त करें |
| POST | `/` | JWT | Services.Edit | समूह-सेवा-समय संबंध बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | समूह-सेवा-समय संबंध हटाएँ |

## उपस्थिति रिकॉर्ड

बेस पथ: `/attendance/attendancerecords`

रिपोर्टिंग और प्रदर्शन के लिए उपस्थिति डेटा के केवल-पठन एग्रीगेट दृश्य प्रदान करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | किसी व्यक्ति के लिए उपस्थिति रिकॉर्ड लोड करें। `?personId=` आवश्यक है |
| GET | `/tree` | JWT | — | पूर्ण उपस्थिति ट्री लोड करें (कैम्पस, सेवाएँ, सेवा समय, समूह) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | वैकल्पिक फ़िल्टर के साथ उपस्थिति प्रवृत्ति डेटा लोड करें |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | किसी दिए गए सप्ताह में सेवा के लिए समूह उपस्थिति लोड करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | फ़िल्टर के साथ उपस्थिति रिकॉर्ड खोजें (कैम्पस, सेवा, सेवा समय, समूह, तिथि सीमा) |

### उदाहरण: उपस्थिति प्रवृत्ति

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

## सत्र

बेस पथ: `/attendance/sessions`

GenericCrudController को CRUD रूट `getById` और `delete` के साथ विस्तारित करता है। `getAll` और `save` एंडपॉइंट कस्टम कार्यान्वयन हैं जो समूह नेताओं को अपने समूहों के लिए सत्र प्रबंधित करने की अनुमति भी देते हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View या Group Leader | सभी सत्र सूचीबद्ध करें। `?groupId=` से फ़िल्टर करें (नाम सहित)। समूह नेता अपने समूहों के सत्र देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID द्वारा सत्र प्राप्त करें |
| POST | `/` | JWT | Attendance.Edit या Group Leader | सत्र बनाएँ या अपडेट करें। समूह नेता अपने समूहों के लिए सत्र सहेज सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | सत्र हटाएँ |

## विज़िट

बेस पथ: `/attendance/visits`

व्यक्तिगत विज़िट रिकॉर्ड (किसी विशिष्ट तिथि पर एक व्यक्ति की उपस्थिति) का प्रबंधन करता है और चेक-इन वर्कफ़्लो प्रदान करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | सभी विज़िट सूचीबद्ध करें। `?personId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Attendance.View | ID द्वारा विज़िट प्राप्त करें |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View या Attendance.Checkin | किसी सेवा में लोगों के लिए चेक-इन डेटा लोड करें। अंतिम लॉग तिथि से विज़िट सत्रों के साथ विज़िट लौटाता है |
| POST | `/` | JWT | Attendance.Edit | विज़िट बनाएँ या अपडेट करें |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit या Attendance.Checkin | चेक-इन डेटा सबमिट करें। विज़िट और विज़िट सत्र बनाता/अपडेट करता है, पुराने रिकॉर्ड हटाता है |
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

## विज़िट सत्र

बेस पथ: `/attendance/visitsessions`

विज़िट और सत्रों के बीच संबंध का प्रबंधन करता है (एक विज़िट के दौरान किसी व्यक्ति ने किस विशिष्ट सत्र में भाग लिया)। त्वरित लॉग एंडपॉइंट और डाउनलोड/निर्यात एंडपॉइंट भी प्रदान करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View या Group Leader | विज़िट सत्र सूचीबद्ध करें। `?sessionId=` से फ़िल्टर करें। समूह नेता अपने समूहों के विज़िट सत्र देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID द्वारा विज़िट सत्र प्राप्त करें |
| GET | `/download/:sessionId` | JWT | Attendance.View | सत्र के लिए उपस्थिति डाउनलोड करें (उपस्थित/अनुपस्थित स्थिति के साथ व्यक्ति नाम लौटाता है) |
| POST | `/` | JWT | Attendance.Edit | विज़िट सत्र बनाएँ या अपडेट करें |
| POST | `/log` | JWT | Attendance.Edit या Group Leader | किसी सत्र में व्यक्ति की उपस्थिति त्वरित-लॉग करें। यदि आवश्यक हो तो स्वचालित रूप से विज़िट बनाता है। समूह नेता अपने समूहों के लिए उपस्थिति लॉग कर सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | ID द्वारा विज़िट सत्र हटाएँ |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit या Group Leader | किसी सत्र से व्यक्ति को हटाएँ। विज़िट सत्र और पैरेंट विज़िट हटाता है यदि कोई सत्र शेष नहीं है। समूह नेता अपने समूहों की उपस्थिति हटा सकते हैं |

### उदाहरण: त्वरित-लॉग उपस्थिति

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

### उदाहरण: सत्र उपस्थिति डाउनलोड करें

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

## संबंधित पृष्ठ

- [Membership एंडपॉइंट](./membership) — लोग, समूह, भूमिकाएँ और चर्च प्रबंधन
- [प्रमाणीकरण और अनुमतियाँ](./authentication) — लॉगिन प्रवाह, JWT, अनुमति मॉडल
- [मॉड्यूल संरचना](../module-structure) — कोड संगठन पैटर्न
