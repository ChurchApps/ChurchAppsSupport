---
title: "Doing Endpoints"
---

# Doing Endpoints

<div class="article-intro">

Doing module service planning, volunteer scheduling, task management, और automations को प्रबंधित करता है। यह times और positions के साथ service plans बनाने, volunteers assign करने, blockout dates प्रबंधित करने, service order items बनाने, बाहरी content providers से जुड़ने, और conditions तथा actions के साथ स्वचालित workflows कॉन्फ़िगर करने के उपकरण प्रदान करता है।

</div>

**Base path:** `/doing`

## Plans

Base path: `/doing/plans`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | church के सभी plans की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक plan प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | comma-separated IDs द्वारा कई plans प्राप्त करें |
| GET | `/types/:planTypeId` | JWT | — | plan type द्वारा plans प्राप्त करें |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministry edit | serving overview **Text Volunteers** द्वारा भेजे जाने वाले संदेश का preview: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` range में assigned volunteers के लिए (प्रति व्यक्ति एक, opted-out और बिना नंबर वाले छोड़े गए, साझा नंबर deduplicate किए गए, 200 पर सीमित) |
| GET | `/presenter` | JWT | — | अगले 7 दिनों के plans प्राप्त करें (presenter view) |
| GET | `/public/current/:planTypeId` | Public | — | किसी plan type के लिए वर्तमान plan प्राप्त करें |
| GET | `/public/signup/:churchId` | Public | — | self-signup के लिए खुले plans, सबसे नज़दीकी पहले, हर एक के self-signup positions के साथ (`categoryName`, फिर `name` के अनुसार sorted, साथ में Accepted/Unconfirmed assignments का `filledCount`) और times। volunteer नाम नहीं। जब church setting `volunteerSignupNextOnly` `"true"` हो, तो हर plan type का केवल पहला plan लौटाया जाता है |
| GET | `/signup/:planId/volunteers` | JWT | — | plan की self-signup positions के लिए `[{ positionId, names }]` (Accepted/Unconfirmed assignees के display names)। plan का `showVolunteerNames` चालू न होने पर `[]` लौटाता है |
| POST | `/` | JWT | — | plans बनाएं या अपडेट करें (एक object या array स्वीकार करता है) |
| POST | `/copy/:id` | JWT | Ministry edit | positions, times, assignments, और service order items सहित plan कॉपी करें। body में `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") और `copyServiceOrder` (boolean) शामिल हैं। `targetPlanId` के बिना नया plan बनता है, और `notes`, `signupDeadlineHours`, `showVolunteerNames`, और `autoReplaceOnDecline` स्रोत plan से आते हैं, जब तक body उन्हें न दे। `targetPlanId` के साथ, कॉपी उसी मौजूदा plan को भरती है (caller को उसे edit करने में सक्षम होना चाहिए)। B1Admin का **Repeat weekly** विकल्प हर हफ्ते एक बार इसे कॉल करता है, हर बार पिछले हफ्ते बने plan से कॉपी करते हुए |
| POST | `/textRange` | JWT | `texting.send` + ministry edit | church के texting provider के माध्यम से एक date range में assigned हर volunteer को text करें। Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (message 1600 अक्षरों तक; merge fields हर प्राप्तकर्ता के लिए resolve होते हैं)। preview counts के साथ `recipientCount`, `successCount`, `failCount`, और भेजना जल्दी रुकने पर `error` (`no_provider` या `insufficient_credits`) लौटाता है |
| POST | `/autofill/:id` | JWT | — | किसी plan के लिए volunteer assignments अपने-आप भरें। Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | plan और उससे जुड़े सभी times, assignments, positions, और plan items हटाएं |

### Example: Plan कॉपी करना

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

CRUD base class का विस्तार (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — कोई permission जांच नहीं)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी plan types की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक plan type प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | comma-separated IDs द्वारा कई plan types प्राप्त करें |
| GET | `/ministryId/:ministryId` | JWT | — | किसी ministry के plan types प्राप्त करें |
| POST | `/` | JWT | — | plan types बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | plan type हटाएं |

## Plan Items

Base path: `/doing/planItems`

service order items (headers, sections, songs, आदि) को parent-child tree संरचना में प्रबंधित करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक plan item प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | comma-separated IDs द्वारा कई plan items प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी plan के सभी plan items प्राप्त करें (tree संरचना लौटाता है) |
| GET | `/presenter/:churchId/:planId` | Public | — | presenter view के लिए plan items प्राप्त करें (tree संरचना लौटाता है) |
| POST | `/` | JWT | — | plan items बनाएं या अपडेट करें |
| POST | `/sort` | JWT | — | किसी plan item का sort order अपडेट करें (siblings को पुनः sort करता है) |
| DELETE | `/:id` | JWT | — | plan item हटाएं |

## Plan Feed

Base path: `/doing/planFeed`

presenter के लिए plan item feeds प्रदान करता है। यदि कोई plan items मौजूद नहीं हैं, तो plan के `contentId` का उपयोग करके Lessons.church venue feed से अपने-आप भरता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | presenter के लिए plan feed प्राप्त करें (खाली होने पर venue feed से अपने-आप भरता है) |

## Positions

Base path: `/doing/positions`

CRUD base class का विस्तार (GET `/:id`, POST `/`, DELETE `/:id` — कोई permission जांच नहीं)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक position प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | comma-separated IDs द्वारा कई positions प्राप्त करें |
| GET | `/plan/ids?planIds=` | JWT | — | comma-separated plan IDs द्वारा कई plans की positions प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी plan की सभी positions प्राप्त करें |
| POST | `/` | JWT | — | positions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | position हटाएं |

## Times

Base path: `/doing/times`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | church के सभी times की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक time प्राप्त करें |
| GET | `/plans?planIds=` | JWT | — | comma-separated plan IDs द्वारा कई plans के times प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी plan के सभी times प्राप्त करें |
| POST | `/` | JWT | — | times बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | time हटाएं |

## Assignments

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान user की assignments प्राप्त करें |
| GET | `/my/upcoming` | JWT | — | वर्तमान user की अधिकतम 20 assignments, उन plans पर जो कल से या उसके बाद की तारीख के हैं (penciled-in, या `prepared`, plans छोड़ दिए जाते हैं), सबसे नज़दीकी पहले: `{ assignmentId, status, positionName, planId, planName, serviceDate }`। member home page पर serving preview को सपोर्ट करता है |
| GET | `/:id` | JWT | — | ID द्वारा एक assignment प्राप्त करें |
| GET | `/plan/ids?planIds=` | JWT | — | comma-separated plan IDs द्वारा कई plans की assignments प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी plan की सभी assignments प्राप्त करें |
| POST | `/` | JWT | — | assignments बनाएं या अपडेट करें (status डिफ़ॉल्ट रूप से "Unconfirmed" होता है) |
| POST | `/accept/:id` | JWT | — | assignment स्वीकार करें (केवल assigned व्यक्ति) |
| POST | `/decline/:id` | JWT | — | assignment अस्वीकार करें (केवल assigned व्यक्ति) |
| DELETE | `/:id` | JWT | — | assignment हटाएं |

### Example: Assignment स्वीकार करना

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

CRUD base class का विस्तार (GET `/:id`, DELETE `/:id` — कोई permission जांच नहीं)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक blockout date प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | comma-separated IDs द्वारा कई blockout dates प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान user के blockout dates प्राप्त करें |
| GET | `/upcoming` | JWT | — | church के सभी आने वाले blockout dates प्राप्त करें |
| POST | `/` | JWT | — | blockout dates बनाएं या अपडेट करें (यदि प्रदान न हो तो personId डिफ़ॉल्ट रूप से वर्तमान user होता है) |
| DELETE | `/:id` | JWT | — | blockout date हटाएं |

## Tasks

Base path: `/doing/tasks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान user के खुले tasks प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा एक task प्राप्त करें |
| GET | `/:id/contact` | JWT | Can view the card | workflow card जिस व्यक्ति के बारे में है उसकी contact जानकारी: `{ personId, displayName, mobilePhone, email }`। People access के बिना assigned caller को व्यक्ति तक पहुंचने देता है |
| GET | `/closed` | JWT | — | वर्तमान user के बंद tasks प्राप्त करें |
| GET | `/timeline?taskIds=` | JWT | — | comma-separated task IDs द्वारा tasks का timeline डेटा प्राप्त करें |
| GET | `/directoryUpdate/:personId` | JWT | — | किसी व्यक्ति का directory update task प्राप्त करें |
| POST | `/` | JWT | — | tasks बनाएं या अपडेट करें। directory update tasks संभालने के लिए `?type=directoryUpdate` जोड़ें (फ़ोटो अपने-आप अपलोड होती हैं) |
| POST | `/:id/conversation` | JWT | `tasks.edit` या card assignee | card से notes conversation जोड़ें। Body: `{ conversationId }`। पहली जोड़ी गई conversation मान्य रहती है; बाद के calls card को बिना बदलाव के लौटाते हैं |
| POST | `/loadForGroups` | JWT | — | विशिष्ट groups के लिए tasks लोड करें। Body: `{ groupIds: [], status: "Open" }` |

## Automations

Base path: `/doing/automations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | church के सभी automations की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक automation प्राप्त करें |
| GET | `/check` | Public | — | सभी automations की जांच शुरू करें |
| POST | `/` | JWT | — | automations बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | automation हटाएं |

## Actions

Base path: `/doing/actions`

Actions परिभाषित करते हैं कि automation ट्रिगर होने पर क्या होता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक action प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी automation के सभी actions प्राप्त करें |
| POST | `/` | JWT | — | actions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | action हटाएं |

## Conditions

Base path: `/doing/conditions`

Conditions वे मानदंड परिभाषित करते हैं जो automation को ट्रिगर करते हैं।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक condition प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी automation की सभी conditions प्राप्त करें |
| POST | `/` | JWT | — | conditions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | condition हटाएं |

## Conjunctions

Base path: `/doing/conjunctions`

Conjunctions किसी automation में कई conditions को आपस में जोड़ते हैं (AND/OR logic)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक conjunction प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी automation की सभी conjunctions प्राप्त करें |
| POST | `/` | JWT | — | conjunctions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | conjunction हटाएं |

## Content Provider Auths

Base path: `/doing/contentProviderAuths`

CRUD base class का विस्तार (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — कोई permission जांच नहीं)।

बाहरी content providers (जैसे presentation software integrations) के लिए OAuth authentication records प्रबंधित करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी content provider auths की सूची |
| GET | `/:id` | JWT | — | ID द्वारा एक content provider auth प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | comma-separated IDs द्वारा कई content provider auths प्राप्त करें |
| GET | `/ministry/:ministryId` | JWT | — | किसी ministry के सभी content provider auths प्राप्त करें |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | किसी विशिष्ट ministry और provider के लिए auth record प्राप्त करें |
| POST | `/` | JWT | — | content provider auths बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | — | content provider auth हटाएं |

## Provider Proxy

Base path: `/doing/providerProxy`

बाहरी content providers (जैसे ProPresenter, EasyWorship) को requests proxy करता है। tokens expire होने पर token refresh अपने-आप संभालता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | content provider की files ब्राउज़ करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | content provider से presentations प्राप्त करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | content provider से playlist प्राप्त करें। Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | किसी content item के निर्देश प्राप्त करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | किसी content item के विस्तृत निर्देश प्राप्त करें। Body: `{ ministryId, providerId, path }` |

## संबंधित पेज

- [Membership Endpoints](./membership) — People, groups, roles, और permissions
- [Attendance Endpoints](./attendance) — Service और visit tracking
- [Module Structure](../module-structure) — Code organization patterns
