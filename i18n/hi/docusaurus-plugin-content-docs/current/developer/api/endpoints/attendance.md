---
title: "Attendance एंडपॉइंट्स"
---

# Attendance एंडपॉइंट्स

<div class="article-intro">

Attendance मॉड्यूल कैंपस लोकेशंस, सर्विसेज़, सर्विस टाइम्स, अटेंडेंस सेशंस, विज़िट्स, और विज़िट सेशंस को मैनेज करता है। यह ट्रैक करने के लिए बुनियादी ढांचा प्रदान करता है कि किसने किस सर्विस या ग्रुप मीटिंग में भाग लिया, चेक-इन वर्कफ़्लोज़ को सपोर्ट करता है, और अटेंडेंस ट्रेंड व समरी रिपोर्टिंग प्रदान करता है।

</div>

**बेस पथ:** `/attendance`

## Campuses

बेस पथ: `/attendance/campuses`

मानक CRUD कंट्रोलर (GenericCrudController को विस्तारित करता है)। CRUD बेस क्लास के ज़रिए `getById`, `getAll`, `post`, और `delete` रूट प्रदान करता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के लिए सभी कैंपस सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से एक कैंपस प्राप्त करें |
| POST | `/` | JWT | Services.Edit | कैंपस बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | एक कैंपस हटाएं |

## Services

बेस पथ: `/attendance/services`

CRUD रूट्स `getById`, `getAll`, `post`, और `delete` के साथ GenericCrudController को विस्तारित करता है। `getAll` (`GET /`) और `search` एंडपॉइंट्स कस्टम इम्प्लीमेंटेशंस से ओवरराइड किए गए हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सर्विसेज़ सूचीबद्ध करें (कैंपस जानकारी सहित) |
| GET | `/:id` | JWT | — | ID से एक सर्विस प्राप्त करें |
| GET | `/search?campusId=` | JWT | — | कैंपस ID से सर्विसेज़ खोजें |
| POST | `/` | JWT | Services.Edit | सर्विसेज़ बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | एक सर्विस हटाएं |

### उदाहरण: कैंपस से सर्विसेज़ खोजें

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

बेस पथ: `/attendance/servicetimes`

CRUD रूट्स `getById`, `post`, और `delete` के साथ GenericCrudController को विस्तारित करता है। `getAll` और `search` एंडपॉइंट्स कस्टम इम्प्लीमेंटेशंस हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सर्विस टाइम्स सूचीबद्ध करें। `?serviceId=` से फ़िल्टर करें। ग्रुप डेटा जोड़ने के लिए `?include=groups` जोड़ें |
| GET | `/:id` | JWT | — | ID से एक सर्विस टाइम प्राप्त करें |
| GET | `/search?campusId=&serviceId=` | JWT | — | कैंपस और सर्विस से सर्विस टाइम्स खोजें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च के लिए campus → service → time ट्री प्राप्त करें। वेबसाइट बिल्डर के `serviceTimes` एलिमेंट को पावर देता है |
| POST | `/` | JWT | Services.Edit | सर्विस टाइम्स बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | एक सर्विस टाइम हटाएं |

## Group Service Times

बेस पथ: `/attendance/groupservicetimes`

ग्रुप्स को विशिष्ट सर्विस टाइम्स से जोड़ता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी group-service-time एसोसिएशंस सूचीबद्ध करें। सर्विस नामों के साथ एसोसिएशंस प्राप्त करने के लिए `?groupId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | — | ID से एक group-service-time एसोसिएशन प्राप्त करें |
| POST | `/` | JWT | Services.Edit | group-service-time एसोसिएशंस बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | एक group-service-time एसोसिएशन हटाएं |

## Attendance Records

बेस पथ: `/attendance/attendancerecords`

रिपोर्टिंग और डिस्प्ले के लिए अटेंडेंस डेटा के रीड-ओनली एग्रीगेट व्यू प्रदान करता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | किसी व्यक्ति के लिए अटेंडेंस रिकॉर्ड्स लोड करें। `?personId=` आवश्यक है |
| GET | `/tree` | JWT | — | पूरा अटेंडेंस ट्री (कैंपस, सर्विसेज़, सर्विस टाइम्स, ग्रुप्स) लोड करें |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | वैकल्पिक फ़िल्टर्स के साथ अटेंडेंस ट्रेंड डेटा लोड करें |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | किसी दिए गए सप्ताह में किसी सर्विस के लिए ग्रुप अटेंडेंस लोड करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | फ़िल्टर्स (कैंपस, सर्विस, सर्विस टाइम, ग्रुप, तारीख सीमा) से अटेंडेंस रिकॉर्ड्स खोजें |

### उदाहरण: Attendance Trend

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

बेस पथ: `/attendance/sessions`

CRUD रूट्स `getById` और `delete` के साथ GenericCrudController को विस्तारित करता है। `getAll` और `save` एंडपॉइंट्स कस्टम इम्प्लीमेंटेशंस हैं जो ग्रुप लीडर्स को अपने ग्रुप्स के लिए सेशंस मैनेज करने की अनुमति भी देते हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View या Group Leader | सभी सेशंस सूचीबद्ध करें। `?groupId=` से फ़िल्टर करें (नाम शामिल)। ग्रुप लीडर्स अपने ग्रुप्स के सेशंस देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID से एक सेशन प्राप्त करें |
| POST | `/` | JWT | Attendance.Edit या Group Leader | सेशंस बनाएं या अपडेट करें। ग्रुप लीडर्स अपने ग्रुप्स के लिए सेशंस सेव कर सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | एक सेशन हटाएं |

## Visits

बेस पथ: `/attendance/visits`

व्यक्तिगत विज़िट रिकॉर्ड्स (किसी व्यक्ति की किसी विशेष तारीख को उपस्थिति) को मैनेज करता है और चेक-इन वर्कफ़्लो प्रदान करता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | सभी विज़िट्स सूचीबद्ध करें। `?personId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Attendance.View | ID से एक विज़िट प्राप्त करें |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View या Attendance.Checkin | किसी सर्विस में लोगों के लिए चेक-इन डेटा लोड करें। पिछली लॉग की गई तारीख से विज़िट सेशंस सहित विज़िट्स लौटाता है |
| POST | `/` | JWT | Attendance.Edit | विज़िट्स बनाएं या अपडेट करें |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit या Attendance.Checkin | चेक-इन डेटा सबमिट करें। विज़िट्स और विज़िट सेशंस बनाता/अपडेट करता है, पुराने रिकॉर्ड्स हटाता है |
| DELETE | `/:id` | JWT | Attendance.Edit | एक विज़िट हटाएं |

### उदाहरण: चेक-इन फ़्लो

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

## Visit Sessions

बेस पथ: `/attendance/visitsessions`

विज़िट्स और सेशंस के बीच एसोसिएशन (किसी व्यक्ति ने विज़िट के दौरान किस विशेष सेशन में भाग लिया) को मैनेज करता है। एक क्विक लॉग एंडपॉइंट और एक डाउनलोड/एक्सपोर्ट एंडपॉइंट भी प्रदान करता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View या Group Leader | विज़िट सेशंस सूचीबद्ध करें। `?sessionId=` से फ़िल्टर करें। ग्रुप लीडर्स अपने ग्रुप्स के विज़िट सेशंस देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID से एक विज़िट सेशन प्राप्त करें |
| GET | `/download/:sessionId` | JWT | Attendance.View | किसी सेशन के लिए अटेंडेंस डाउनलोड करें (उपस्थित/अनुपस्थित स्थिति के साथ व्यक्ति नाम लौटाता है) |
| POST | `/` | JWT | Attendance.Edit | विज़िट सेशंस बनाएं या अपडेट करें |
| POST | `/log` | JWT | Attendance.Edit या Group Leader | किसी व्यक्ति की अटेंडेंस को किसी सेशन में क्विक-लॉग करें। ज़रूरत होने पर स्वचालित रूप से विज़िट बनाता है। ग्रुप लीडर्स अपने ग्रुप्स के लिए अटेंडेंस लॉग कर सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | ID से एक विज़िट सेशन हटाएं |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit या Group Leader | किसी सेशन से किसी व्यक्ति को हटाएं। विज़िट सेशन और (यदि कोई सेशन शेष न रहे तो) पैरेंट विज़िट को हटाता है। ग्रुप लीडर्स अपने ग्रुप्स के लिए अटेंडेंस हटा सकते हैं |

### उदाहरण: क्विक-लॉग अटेंडेंस

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

### उदाहरण: सेशन अटेंडेंस डाउनलोड करें

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

बेस पथ: `/attendance/streaks`

व्यक्तियों के लिए अटेंडेंस स्ट्रीक्स ट्रैक करता है -- लगातार कितने सप्ताह किसी व्यक्ति ने भाग लिया। एंगेजमेंट मेट्रिक्स और गेमिफ़िकेशन के लिए उपयोगी।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति के लिए अटेंडेंस स्ट्रीक्स लोड करें |

## संबंधित पेज

- [Membership एंडपॉइंट्स](./membership) — लोग, ग्रुप्स, रोल्स, और चर्च मैनेजमेंट
- [Authentication & Permissions](./authentication) — लॉगिन फ़्लो, JWT, परमिशन मॉडल
- [Module Structure](../module-structure) — कोड ऑर्गनाइज़ेशन पैटर्न
