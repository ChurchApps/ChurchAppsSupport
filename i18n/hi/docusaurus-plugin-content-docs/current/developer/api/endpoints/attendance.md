---
title: "उपस्थिति एंडपॉइंट"
---

# उपस्थिति एंडपॉइंट {#attendance-endpoints}

<div class="article-intro">

Attendance मॉड्यूल कैंपस स्थान, सेवाएँ, सेवा समय, उपस्थिति सत्र, विज़िट और विज़िट सत्र प्रबंधित करता है। यह ट्रैक करने का ढाँचा प्रदान करता है कि किसने कौन-सी सेवा या समूह बैठक में भाग लिया, चेक-इन वर्कफ़्लो को सपोर्ट करता है, और उपस्थिति रुझान व सारांश रिपोर्टिंग देता है।

</div>

**बेस पथ:** `/attendance`

## कैंपस {#campuses}

बेस पथ: `/attendance/campuses`

मानक CRUD कंट्रोलर (GenericCrudController को विस्तारित)। CRUD बेस क्लास के माध्यम से `getById`, `getAll`, `post`, और `delete` रूट प्रदान करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी कैंपस की सूची |
| GET | `/:id` | JWT | — | ID से कैंपस प्राप्त करें |
| POST | `/` | JWT | Services.Edit | कैंपस बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | कैंपस हटाएँ |

## सेवाएँ {#services}

बेस पथ: `/attendance/services`

CRUD रूट `getById`, `getAll`, `post`, और `delete` के साथ GenericCrudController को विस्तारित करता है। `getAll` (`GET /`) और `search` एंडपॉइंट कस्टम कार्यान्वयन से ओवरराइड किए गए हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सेवाओं की सूची (कैंपस जानकारी सहित) |
| GET | `/:id` | JWT | — | ID से सेवा प्राप्त करें |
| GET | `/search?campusId=` | JWT | — | कैंपस ID से सेवाएँ खोजें |
| POST | `/` | JWT | Services.Edit | सेवाएँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | सेवा हटाएँ |

### उदाहरण: कैंपस के अनुसार सेवाएँ खोजें {#example-search-services-by-campus}

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

## सेवा समय {#service-times}

बेस पथ: `/attendance/servicetimes`

CRUD रूट `getById`, `post`, और `delete` के साथ GenericCrudController को विस्तारित करता है। `getAll` और `search` एंडपॉइंट कस्टम कार्यान्वयन हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सेवा समय की सूची। `?serviceId=` से फ़िल्टर करें। समूह डेटा जोड़ने के लिए `?include=groups` जोड़ें। हर पंक्ति में एक गणना किया गया `checkinOpen` बूलियन शामिल होता है (केवल तभी false जब सेवा समय का चेक-इन शेड्यूल हो और उसकी विंडो अभी बंद हो)। विंडो सेवा के कैंपस के समय क्षेत्र में मापी जाती है, फिर चर्च के समय क्षेत्र में, फिर पहले ऐसे कैंपस के समय क्षेत्र में जिसका एक हो, और अंत में `America/New_York` में |
| GET | `/:id` | JWT | — | ID से सेवा समय प्राप्त करें |
| GET | `/search?campusId=&serviceId=` | JWT | — | कैंपस और सेवा के अनुसार सेवा समय खोजें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च का कैंपस → सेवा → समय ट्री प्राप्त करें। वेबसाइट बिल्डर के `serviceTimes` एलिमेंट को सपोर्ट करता है |
| POST | `/` | JWT | Services.Edit | सेवा समय बनाएँ या अपडेट करें। वैकल्पिक शेड्यूल फ़ील्ड: `dayOfWeek` (0 = रविवार … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (आरंभ से पहले), `checkinCloseMinutes` (समाप्ति के बाद)। चेक-इन केवल तभी समय-सीमित होता है जब `dayOfWeek` और `startTime` दोनों सेट हों |
| DELETE | `/:id` | JWT | Services.Edit | सेवा समय हटाएँ |

## समूह सेवा समय {#group-service-times}

बेस पथ: `/attendance/groupservicetimes`

समूहों को विशिष्ट सेवा समय से जोड़ता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूह-सेवा समय संबंधों की सूची। सेवा नामों वाले संबंध पाने के लिए `?groupId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | — | ID से समूह-सेवा समय संबंध प्राप्त करें |
| POST | `/` | JWT | Services.Edit | समूह-सेवा समय संबंध बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | समूह-सेवा समय संबंध हटाएँ |

## उपस्थिति रिकॉर्ड {#attendance-records}

बेस पथ: `/attendance/attendancerecords`

रिपोर्टिंग और प्रदर्शन के लिए उपस्थिति डेटा के केवल-पढ़ने योग्य संयुक्त दृश्य प्रदान करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | किसी व्यक्ति के उपस्थिति रिकॉर्ड लोड करें। `?personId=` आवश्यक है |
| GET | `/my` | JWT | — | स्व-स्कोप्ड: साइन-इन सदस्य के अपने पिछले 12 महीनों के उपस्थिति रिकॉर्ड, सबसे नए पहले। यदि उपयोगकर्ता किसी व्यक्ति से जुड़ा नहीं है तो `401` लौटाता है। B1 Me पेज के **My Attendance** सेक्शन को सपोर्ट करता है |
| GET | `/tree` | JWT | — | पूरा उपस्थिति ट्री लोड करें (कैंपस, सेवाएँ, सेवा समय, समूह) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | वैकल्पिक फ़िल्टर के साथ उपस्थिति रुझान डेटा लोड करें |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | किसी दिए गए सप्ताह के लिए किसी सेवा की समूह उपस्थिति लोड करें |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | सेवा समय पर असाइन हर समूह के लिए, उस तारीख का `{ groupId, sessionId, attendanceCount }` लौटाएँ (`date` `YYYY-MM-DD` है; जिस समूह का सत्र नहीं है उसके लिए `sessionId` null होता है)। B1Admin के **Who Still Needs Attendance** डायलॉग को सपोर्ट करता है |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | फ़िल्टर (कैंपस, सेवा, सेवा समय, समूह, तारीख सीमा) के साथ उपस्थिति रिकॉर्ड खोजें |

### उदाहरण: उपस्थिति रुझान {#example-attendance-trend}

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

## सत्र {#sessions}

बेस पथ: `/attendance/sessions`

CRUD रूट `getById` और `delete` के साथ GenericCrudController को विस्तारित करता है। `getAll` और `save` एंडपॉइंट कस्टम कार्यान्वयन हैं जो समूह लीडर्स को अपने समूहों के सत्र प्रबंधित करने की भी अनुमति देते हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View या Group Leader | सभी सत्रों की सूची। `?groupId=` से फ़िल्टर करें (नाम सहित)। समूह लीडर अपने समूहों के सत्र देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID से सत्र प्राप्त करें |
| POST | `/` | JWT | Attendance.Edit या Group Leader | सत्र बनाएँ या अपडेट करें। समूह लीडर अपने समूहों के सत्र सहेज सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | सत्र हटाएँ |

## विज़िट {#visits}

बेस पथ: `/attendance/visits`

व्यक्तिगत विज़िट रिकॉर्ड (किसी व्यक्ति का किसी विशिष्ट तारीख को उपस्थित होना) प्रबंधित करता है और चेक-इन वर्कफ़्लो प्रदान करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | सभी विज़िट की सूची। `?personId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Attendance.View | ID से विज़िट प्राप्त करें |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View या Attendance.Checkin | किसी सेवा पर लोगों के लिए चेक-इन डेटा लोड करें। पिछली दर्ज तारीख के विज़िट सत्रों के साथ विज़िट लौटाता है |
| POST | `/` | JWT | Attendance.Edit | विज़िट बनाएँ या अपडेट करें |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit या Attendance.Checkin | चेक-इन डेटा सबमिट करें। विज़िट और विज़िट सत्र बनाता/अपडेट करता है, पुराने रिकॉर्ड हटाता है |
| DELETE | `/:id` | JWT | Attendance.Edit | विज़िट हटाएँ |

### उदाहरण: चेक-इन फ़्लो {#example-check-in-flow}

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

यदि लक्षित सेवा समय का चेक-इन शेड्यूल है और उसकी विंडो बंद है (उसी कैंपस-प्रथम समय क्षेत्र क्रम में मापी गई जो `checkinOpen` के लिए है), तो कुछ भी सहेजा नहीं जाता और प्रतिक्रिया `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }` होती है। क्षमता और स्वयंसेवक-अनुपात उल्लंघन भी 409 लौटाते हैं (`error: "capacity"` या `"ratio"`)। वे सत्र जो कोई व्यक्ति आज पहले से रखता है (हर चेक-इन के साथ पुनः पोस्ट किए गए) विंडो जाँच को छोड़ देते हैं, ताकि कोई परिवार पहले वाले की विंडो बंद होने के बाद भी खुला सेवा समय जोड़ सके।

## विज़िट सत्र {#visit-sessions}

बेस पथ: `/attendance/visitsessions`

विज़िट और सत्रों के बीच संबंध प्रबंधित करता है (विज़िट के दौरान कोई व्यक्ति किस विशिष्ट सत्र में उपस्थित हुआ)। एक त्वरित लॉग एंडपॉइंट और डाउनलोड/एक्सपोर्ट एंडपॉइंट भी प्रदान करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View या Group Leader | विज़िट सत्रों की सूची। `?sessionId=` से फ़िल्टर करें। समूह लीडर अपने समूहों के विज़िट सत्र देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID से विज़िट सत्र प्राप्त करें |
| GET | `/download/:sessionId` | JWT | Attendance.View | किसी सत्र की उपस्थिति डाउनलोड करें (व्यक्तियों के नाम उपस्थित/अनुपस्थित स्थिति के साथ लौटाता है) |
| POST | `/` | JWT | Attendance.Edit | विज़िट सत्र बनाएँ या अपडेट करें |
| POST | `/log` | JWT | Attendance.Edit या Group Leader | किसी व्यक्ति की उपस्थिति को सत्र में त्वरित रूप से लॉग करें। आवश्यकता होने पर स्वतः विज़िट बनाता है। समूह लीडर अपने समूहों के लिए उपस्थिति लॉग कर सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | ID से विज़िट सत्र हटाएँ |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit या Group Leader | किसी व्यक्ति को सत्र से हटाएँ। विज़िट सत्र हटाता है, और कोई सत्र न बचने पर मूल विज़िट भी। समूह लीडर अपने समूहों की उपस्थिति हटा सकते हैं |

### उदाहरण: त्वरित उपस्थिति लॉग {#example-quick-log-attendance}

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

### उदाहरण: सत्र की उपस्थिति डाउनलोड करें {#example-download-session-attendance}

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

## स्ट्रीक {#streaks}

बेस पथ: `/attendance/streaks`

व्यक्तियों के लिए उपस्थिति स्ट्रीक ट्रैक करता है -- लगातार कितने सप्ताह कोई व्यक्ति उपस्थित हुआ। जुड़ाव मेट्रिक्स और गेमिफ़िकेशन के लिए उपयोगी।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति की उपस्थिति स्ट्रीक लोड करें |

## संबंधित पृष्ठ {#related-pages}

- [Membership एंडपॉइंट](./membership) -- लोग, समूह, भूमिकाएँ, और चर्च प्रबंधन
- [प्रमाणीकरण और अनुमतियाँ](./authentication) -- लॉगिन फ़्लो, JWT, अनुमति मॉडल
- [मॉड्यूल संरचना](../module-structure) -- कोड संगठन पैटर्न
