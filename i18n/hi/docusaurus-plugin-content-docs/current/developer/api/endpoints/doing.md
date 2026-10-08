---
title: "Doing Endpoints"
---

# Doing Endpoints

<div class="article-intro">

Doing मॉड्यूल सेवा योजना, स्वयंसेवक शेड्यूलिंग, कार्य प्रबंधन, और ऑटोमेशन को प्रबंधित करता है। यह समय और पदों के साथ सेवा योजनाएं बनाने, स्वयंसेवकों को असाइन करने, ब्लॉकआउट तिथियां प्रबंधित करने, सेवा क्रम आइटम बनाने, बाहरी content providers से कनेक्ट करने, और शर्तों व क्रियाओं के साथ स्वचालित वर्कफ़्लो कॉन्फ़िगर करने के उपकरण प्रदान करता है।

</div>

**Base path:** `/doing`

## Plans

Base path: `/doing/plans`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के लिए सभी योजनाओं की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक योजना प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग की गई IDs द्वारा कई योजनाएं प्राप्त करें |
| GET | `/types/:planTypeId` | JWT | — | योजना प्रकार द्वारा योजनाएं प्राप्त करें |
| GET | `/presenter` | JWT | — | अगले 7 दिनों की योजनाएं प्राप्त करें (presenter दृश्य) |
| GET | `/public/current/:planTypeId` | Public | — | किसी योजना प्रकार की वर्तमान योजना प्राप्त करें |
| GET | `/public/signup/:churchId` | Public | — | स्वयं-साइनअप के लिए खुली योजनाएं, प्रत्येक के साथ उसके स्वयं-साइनअप पद (और Accepted/Unconfirmed असाइनमेंट की `filledCount`) तथा समय। स्वयंसेवकों के नाम शामिल नहीं |
| GET | `/signup/:planId/volunteers` | JWT | — | योजना के स्वयं-साइनअप पदों के लिए `[{ positionId, names }]` (Accepted/Unconfirmed असाइनी के प्रदर्शन नाम)। जब तक योजना का `showVolunteerNames` चालू न हो, `[]` लौटाता है |
| POST | `/` | JWT | — | योजनाएं बनाएं या अपडेट करें (एकल ऑब्जेक्ट या array स्वीकार करता है) |
| POST | `/copy/:id` | JWT | — | पदों, समय, असाइनमेंट, और सेवा क्रम आइटम सहित एक योजना की प्रतिलिपि बनाएं। Body में `copyMode` ("none", "positions", "all") और `copyServiceOrder` (boolean) शामिल हैं। `notes` और `signupDeadlineHours` स्रोत योजना से आगे लाए जाते हैं, जब तक body उन्हें न दे |
| POST | `/autofill/:id` | JWT | — | किसी योजना के लिए स्वयंसेवक असाइनमेंट स्वतः भरें। Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | एक योजना और सभी संबंधित समय, असाइनमेंट, पद, और योजना आइटम हटाएं |

### उदाहरण: योजना की प्रतिलिपि बनाना

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Plan Types

Base path: `/doing/planTypes`

CRUD base class को extend करता है (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — कोई अनुमति जांच नहीं)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी योजना प्रकारों की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक योजना प्रकार प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग की गई IDs द्वारा कई योजना प्रकार प्राप्त करें |
| GET | `/ministryId/:ministryId` | JWT | — | किसी सेवकाई के योजना प्रकार प्राप्त करें |
| POST | `/` | JWT | — | योजना प्रकार बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | एक योजना प्रकार हटाएं |

## Plan Items

Base path: `/doing/planItems`

सेवा क्रम आइटम (शीर्षक, खंड, गीत, आदि) को प्रबंधित करता है जो parent-child ट्री संरचना में व्यवस्थित होते हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक योजना आइटम प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग की गई IDs द्वारा कई योजना आइटम प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी योजना के सभी योजना आइटम प्राप्त करें (ट्री संरचना लौटाता है) |
| GET | `/presenter/:churchId/:planId` | Public | — | presenter दृश्य के लिए योजना आइटम प्राप्त करें (ट्री संरचना लौटाता है) |
| POST | `/` | JWT | — | योजना आइटम बनाएं या अपडेट करें |
| POST | `/sort` | JWT | — | किसी योजना आइटम का क्रम अपडेट करें (समकक्ष आइटम को फिर से क्रमबद्ध करता है) |
| DELETE | `/:id` | JWT | — | एक योजना आइटम हटाएं |

## Plan Feed

Base path: `/doing/planFeed`

presenter के लिए योजना आइटम फ़ीड प्रदान करता है। यदि कोई योजना आइटम मौजूद नहीं है, तो योजना के `contentId` का उपयोग करके Lessons.church venue फ़ीड से स्वतः भर देता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | presenter के लिए योजना फ़ीड प्राप्त करें (खाली होने पर venue फ़ीड से स्वतः भरता है) |

## Positions

Base path: `/doing/positions`

CRUD base class को extend करता है (GET `/:id`, POST `/`, DELETE `/:id` — कोई अनुमति जांच नहीं)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक पद प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग की गई IDs द्वारा कई पद प्राप्त करें |
| GET | `/plan/ids?planIds=` | JWT | — | अल्पविराम से अलग की गई योजना IDs द्वारा कई योजनाओं के पद प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी योजना के सभी पद प्राप्त करें |
| POST | `/` | JWT | — | पद बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | एक पद हटाएं |

## Times

Base path: `/doing/times`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | चर्च के सभी समय की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक समय प्राप्त करें |
| GET | `/plans?planIds=` | JWT | — | अल्पविराम से अलग की गई योजना IDs द्वारा कई योजनाओं के समय प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी योजना के सभी समय प्राप्त करें |
| POST | `/` | JWT | — | समय बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | एक समय हटाएं |

## Assignments

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के असाइनमेंट प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा एक असाइनमेंट प्राप्त करें |
| GET | `/plan/ids?planIds=` | JWT | — | अल्पविराम से अलग की गई योजना IDs द्वारा कई योजनाओं के असाइनमेंट प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी योजना के सभी असाइनमेंट प्राप्त करें |
| POST | `/` | JWT | — | असाइनमेंट बनाएं या अपडेट करें (status डिफ़ॉल्ट रूप से "Unconfirmed" होता है) |
| POST | `/accept/:id` | JWT | — | एक असाइनमेंट स्वीकार करें (असाइन किया गया व्यक्ति ही होना चाहिए) |
| POST | `/decline/:id` | JWT | — | एक असाइनमेंट अस्वीकार करें (असाइन किया गया व्यक्ति ही होना चाहिए) |
| DELETE | `/:id` | JWT | — | एक असाइनमेंट हटाएं |

### उदाहरण: असाइनमेंट स्वीकार करना

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Blockout Dates

Base path: `/doing/blockoutDates`

CRUD base class को extend करता है (GET `/:id`, DELETE `/:id` — कोई अनुमति जांच नहीं)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक ब्लॉकआउट तिथि प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग की गई IDs द्वारा कई ब्लॉकआउट तिथियां प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की ब्लॉकआउट तिथियां प्राप्त करें |
| GET | `/upcoming` | JWT | — | चर्च की सभी आगामी ब्लॉकआउट तिथियां प्राप्त करें |
| POST | `/` | JWT | — | ब्लॉकआउट तिथियां बनाएं या अपडेट करें (यदि personId न दिया जाए तो डिफ़ॉल्ट रूप से वर्तमान उपयोगकर्ता) |
| DELETE | `/:id` | JWT | — | एक ब्लॉकआउट तिथि हटाएं |

## Tasks

Base path: `/doing/tasks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के खुले कार्य प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा एक कार्य प्राप्त करें |
| GET | `/closed` | JWT | — | वर्तमान उपयोगकर्ता के बंद कार्य प्राप्त करें |
| GET | `/timeline?taskIds=` | JWT | — | अल्पविराम से अलग की गई कार्य IDs द्वारा कार्यों का टाइमलाइन डेटा प्राप्त करें |
| GET | `/directoryUpdate/:personId` | JWT | — | किसी व्यक्ति के लिए डायरेक्टरी अपडेट कार्य प्राप्त करें |
| POST | `/` | JWT | — | कार्य बनाएं या अपडेट करें। डायरेक्टरी अपडेट कार्यों को संभालने के लिए `?type=directoryUpdate` जोड़ें (फ़ोटो स्वतः अपलोड करता है) |
| POST | `/loadForGroups` | JWT | — | विशिष्ट समूहों के लिए कार्य लोड करें। Body: `{ groupIds: [], status: "Open" }` |

## Automations

Base path: `/doing/automations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के लिए सभी ऑटोमेशन की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक ऑटोमेशन प्राप्त करें |
| GET | `/check` | Public | — | सभी ऑटोमेशन की जांच ट्रिगर करें |
| POST | `/` | JWT | — | ऑटोमेशन बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | एक ऑटोमेशन हटाएं |

## Actions

Base path: `/doing/actions`

Actions परिभाषित करते हैं कि ऑटोमेशन ट्रिगर होने पर क्या होता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक action प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी ऑटोमेशन के सभी actions प्राप्त करें |
| POST | `/` | JWT | — | Actions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | एक action हटाएं |

## Conditions

Base path: `/doing/conditions`

Conditions वे मानदंड परिभाषित करती हैं जो ऑटोमेशन को ट्रिगर करते हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक condition प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी ऑटोमेशन की सभी conditions प्राप्त करें |
| POST | `/` | JWT | — | Conditions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | एक condition हटाएं |

## Conjunctions

Base path: `/doing/conjunctions`

Conjunctions किसी ऑटोमेशन में कई conditions को आपस में जोड़ते हैं (AND/OR लॉजिक)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक conjunction प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी ऑटोमेशन के सभी conjunctions प्राप्त करें |
| POST | `/` | JWT | — | Conjunctions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | एक conjunction हटाएं |

## Content Provider Auths

Base path: `/doing/contentProviderAuths`

CRUD base class को extend करता है (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — कोई अनुमति जांच नहीं)।

बाहरी content providers (जैसे, प्रेजेंटेशन सॉफ़्टवेयर इंटीग्रेशन) के लिए OAuth प्रमाणीकरण रिकॉर्ड प्रबंधित करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी content provider auths की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक content provider auth प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग की गई IDs द्वारा कई content provider auths प्राप्त करें |
| GET | `/ministry/:ministryId` | JWT | — | किसी सेवकाई के सभी content provider auths प्राप्त करें |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | किसी विशिष्ट सेवकाई और provider के लिए auth रिकॉर्ड प्राप्त करें |
| POST | `/` | JWT | — | Content provider auths बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | एक content provider auth हटाएं |

## Provider Proxy

Base path: `/doing/providerProxy`

बाहरी content providers (जैसे, ProPresenter, EasyWorship) को अनुरोध proxy करता है। टोकन की अवधि समाप्त होने पर टोकन रीफ़्रेश स्वतः संभालता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Content provider की फ़ाइलें ब्राउज़ करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Content provider से प्रेजेंटेशन प्राप्त करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Content provider से प्लेलिस्ट प्राप्त करें। Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | किसी content आइटम के लिए निर्देश प्राप्त करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | किसी content आइटम के लिए विस्तृत निर्देश प्राप्त करें। Body: `{ ministryId, providerId, path }` |

## संबंधित पृष्ठ

- [Membership Endpoints](./membership) — लोग, समूह, भूमिकाएं, और अनुमतियां
- [Attendance Endpoints](./attendance) — सेवा और दौरे की ट्रैकिंग
- [Module Structure](../module-structure) — कोड संगठन पैटर्न
