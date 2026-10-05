---
title: "उपस्थिति Endpoints"
---

# उपस्थिति Endpoints

<div class="article-intro">

उपस्थिति मॉड्यूल परिसर स्थान, सेवाएं, सेवा समय, उपस्थिति सत्र, दौरे, और दौरे सत्र को प्रबंधित करता है। यह ट्रैक करने के लिए बुनियादी ढांचा प्रदान करता है कि किसने कौन सी सेवा या समूह बैठक में भाग लिया, चेक-इन वर्कफ़्लो का समर्थन करता है, और उपस्थिति प्रवृत्ति और सारांश रिपोर्टिंग प्रदान करता है।

</div>

**Base path:** `/attendance`

## Campuses

Base path: `/attendance/campuses`

Standard CRUD controller (GenericCrudController को extend करता है)। CRUD base class के माध्यम से `getById`, `getAll`, `post`, और `delete` routes प्रदान करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के लिए सभी परिसरों की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक परिसर प्राप्त करें |
| POST | `/` | JWT | Services.Edit | परिसरों को बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | एक परिसर हटाएं |

## Services

Base path: `/attendance/services`

GenericCrudController को extend करता है जिसमें CRUD routes `getById`, `getAll`, `post`, और `delete` हैं। `getAll` (`GET /`) और `search` endpoints को कस्टम implementations के साथ override किया गया है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सेवाओं की सूची (परिसर जानकारी शामिल) |
| GET | `/:id` | JWT | — | ID द्वारा एक सेवा प्राप्त करें |
| GET | `/search?campusId=` | JWT | — | परिसर ID द्वारा सेवाओं की खोज करें |
| POST | `/` | JWT | Services.Edit | सेवाओं को बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | एक सेवा हटाएं |

### उदाहरण: परिसर द्वारा सेवाओं की खोज

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

GenericCrudController को extend करता है जिसमें CRUD routes `getById`, `post`, और `delete` हैं। `getAll` और `search` endpoints कस्टम implementations हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी सेवा समय की सूची। `?serviceId=` द्वारा फ़िल्टर करें। समूह डेटा जोड़ने के लिए `?include=groups` जोड़ें |
| GET | `/:id` | JWT | — | ID द्वारा एक सेवा समय प्राप्त करें |
| GET | `/search?campusId=&serviceId=` | JWT | — | परिसर और सेवा द्वारा सेवा समय की खोज करें |
| GET | `/public/:churchId` | Public | — | एक चर्च के लिए परिसर → सेवा → समय का पेड़ प्राप्त करें। वेबसाइट बिल्डर के `serviceTimes` element को शक्ति देता है |
| POST | `/` | JWT | Services.Edit | सेवा समय को बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | एक सेवा समय हटाएं |

## Group Service Times

Base path: `/attendance/groupservicetimes`

समूहों को विशिष्ट सेवा समय से जोड़ता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूह-सेवा-समय संगठन की सूची। समूह नाम के साथ संगठन प्राप्त करने के लिए `?groupId=` द्वारा फ़िल्टर करें |
| GET | `/:id` | JWT | — | ID द्वारा एक समूह-सेवा-समय संगठन प्राप्त करें |
| POST | `/` | JWT | Services.Edit | समूह-सेवा-समय संगठन को बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Services.Edit | एक समूह-सेवा-समय संगठन हटाएं |

## उपस्थिति रिकॉर्ड

Base path: `/attendance/attendancerecords`

रिपोर्टिंग और प्रदर्शन के लिए उपस्थिति डेटा के read-only aggregate views प्रदान करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | एक व्यक्ति के लिए उपस्थिति रिकॉर्ड लोड करें। `?personId=` की आवश्यकता है |
| GET | `/tree` | JWT | — | पूर्ण उपस्थिति पेड़ (परिसर, सेवाएं, सेवा समय, समूह) लोड करें |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | वैकल्पिक फ़िल्टर के साथ उपस्थिति प्रवृत्ति डेटा लोड करें |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | किसी सप्ताह पर सेवा के लिए समूह उपस्थिति लोड करें |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | प्रत्येक समूह के लिए सेवा समय को असाइन किया गया है, `{ groupId, sessionId, attendanceCount }` उस तारीख के लिए लौटाएं (`date` `YYYY-MM-DD` है; `sessionId` null है जब समूह के पास कोई सत्र नहीं है)। B1Admin के **Who Still Needs Attendance** dialog को सपोर्ट करता है |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | फ़िल्टर (परिसर, सेवा, सेवा समय, समूह, तारीख रेंज) के साथ उपस्थिति रिकॉर्ड की खोज करें |

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

## Sessions

Base path: `/attendance/sessions`

GenericCrudController को extend करता है जिसमें CRUD routes `getById` और `delete` हैं। `getAll` और `save` endpoints कस्टम implementations हैं जो समूह नेताओं को अपने समूहों के लिए सत्रों को प्रबंधित करने की अनुमति भी देते हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Group Leader | सभी सत्रों की सूची। `?groupId=` द्वारा फ़िल्टर करें (नाम शामिल)। समूह नेता अपने स्वयं के समूहों के लिए सत्रों को देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID द्वारा एक सत्र प्राप्त करें |
| POST | `/` | JWT | Attendance.Edit or Group Leader | सत्रों को बनाएं या अपडेट करें। समूह नेता अपने स्वयं के समूहों के लिए सत्रों को सहेज सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | एक सत्र हटाएं |

## Visits

Base path: `/attendance/visits`

व्यक्तिगत दौरे रिकॉर्ड (किसी विशिष्ट तारीख को किसी व्यक्ति द्वारा भाग लिया गया) को प्रबंधित करता है और चेक-इन वर्कफ़्लो प्रदान करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | सभी दौरों की सूची। `?personId=` द्वारा फ़िल्टर करें |
| GET | `/:id` | JWT | Attendance.View | ID द्वारा एक दौरा प्राप्त करें |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View or Attendance.Checkin | एक सेवा पर लोगों के लिए चेक-इन डेटा लोड करें। पिछली लॉगिन की तारीख से दौरे और दौरे सत्र लौटाता है |
| POST | `/` | JWT | Attendance.Edit | दौरों को बनाएं या अपडेट करें |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit or Attendance.Checkin | चेक-इन डेटा जमा करें। दौरे और दौरे सत्र बनाता/अपडेट करता है, पुराने रिकॉर्ड को हटाता है |
| DELETE | `/:id` | JWT | Attendance.Edit | एक दौरा हटाएं |

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

**चरण 2 -- चेक-इन जमा करें:**

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

## दौरे सत्र

Base path: `/attendance/visitsessions`

दौरों और सत्रों के बीच संगठन को प्रबंधित करता है (किसी व्यक्ति ने दौरे के दौरान कौन सा विशेष सत्र भाग लिया)। एक त्वरित लॉग endpoint और एक डाउनलोड/निर्यात endpoint भी प्रदान करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Group Leader | दौरे सत्रों की सूची। `?sessionId=` द्वारा फ़िल्टर करें। समूह नेता अपने स्वयं के समूहों के लिए दौरे सत्रों को देख सकते हैं |
| GET | `/:id` | JWT | Attendance.View | ID द्वारा एक दौरा सत्र प्राप्त करें |
| GET | `/download/:sessionId` | JWT | Attendance.View | किसी सत्र के लिए उपस्थिति डाउनलोड करें (वर्तमान/अनुपस्थित स्थिति के साथ व्यक्ति के नाम लौटाता है) |
| POST | `/` | JWT | Attendance.Edit | दौरे सत्रों को बनाएं या अपडेट करें |
| POST | `/log` | JWT | Attendance.Edit or Group Leader | किसी व्यक्ति की उपस्थिति को एक सत्र में तुरंत लॉग करें। यदि आवश्यक हो तो स्वचालित रूप से दौरा बनाता है। समूह नेता अपने स्वयं के समूहों के लिए उपस्थिति लॉग कर सकते हैं |
| DELETE | `/:id` | JWT | Attendance.Edit | ID द्वारा एक दौरा सत्र हटाएं |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit or Group Leader | किसी व्यक्ति को एक सत्र से हटाएं। दौरा सत्र को हटाता है और यदि कोई सत्र नहीं रहता तो मूल दौरे को हटाता है। समूह नेता अपने स्वयं के समूहों के लिए उपस्थिति हटा सकते हैं |

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

### उदाहरण: सत्र उपस्थिति डाउनलोड

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

व्यक्तियों के लिए उपस्थिति streaks को ट्रैक करता है -- लगातार सप्ताह कोई व्यक्ति भाग लिया है। जुड़ाव metrics और gamification के लिए उपयोगी।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति के लिए उपस्थिति streaks लोड करें |

## संबंधित पृष्ठ

- [Membership Endpoints](./membership) — लोग, समूह, भूमिकाएं, और चर्च प्रबंधन
- [Authentication & Permissions](./authentication) — लॉगिन प्रवाह, JWT, अनुमति मॉडल
- [Module Structure](../module-structure) — कोड संगठन पैटर्न
