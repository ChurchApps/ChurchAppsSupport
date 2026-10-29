---
title: "Doing Endpoints"
---

# Doing Endpoints

<div class="article-intro">

Doing मॉड्यूल सेवा योजना, स्वयंसेवक शेड्यूलिंग, कार्य प्रबंधन और स्वचालन का प्रबंधन करता है। यह समय और पदों के साथ सेवा योजनाएँ बनाने, स्वयंसेवकों को असाइन करने, ब्लॉकआउट तिथियाँ प्रबंधित करने, सेवा के क्रम के आइटम बनाने, बाहरी सामग्री प्रदाताओं से जुड़ने, और शर्तों व क्रियाओं के साथ स्वचालित वर्कफ़्लो कॉन्फ़िगर करने के उपकरण प्रदान करता है।

</div>

**Base path:** `/doing`

## Plans

Base path: `/doing/plans`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च की सभी योजनाएँ सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से योजना प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग IDs द्वारा कई योजनाएँ प्राप्त करें |
| GET | `/types/:planTypeId` | JWT | — | plan type के अनुसार योजनाएँ प्राप्त करें |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministry edit | serving overview **Text Volunteers** के भेजे जाने से पहले का पूर्वावलोकन: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`, सीमा में असाइन किए गए स्वयंसेवकों के लिए (प्रति व्यक्ति एक, opted-out और बिना नंबर वाले छोड़े गए, साझा नंबर deduplicated, 200 तक सीमित) |
| GET | `/presenter` | JWT | — | अगले 7 दिनों की योजनाएँ प्राप्त करें (presenter दृश्य) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Ministry edit | सक्रिय सेवा असाइनमेंट पुष्टि वर्कफ़्लो (`workflowType = "assignmentConfirmation"`) जिन्हें योजना चुन सकती है: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | plan type के लिए वर्तमान योजना प्राप्त करें |
| GET | `/public/signup/:churchId` | Public | — | स्व-साइनअप के लिए खुली योजनाएँ, सबसे नज़दीक पहले, हर एक के स्व-साइनअप पदों के साथ (`categoryName`, फिर `name` के अनुसार क्रमबद्ध, साथ में Accepted/Unconfirmed असाइनमेंट का `filledCount`) और समय। स्वयंसेवकों के नाम नहीं। जब चर्च सेटिंग `volunteerSignupNextOnly` `"true"` हो, तो हर plan type की केवल पहली योजना लौटती है। हर `plan` में एक गणना की गई `signupDeadline` (ISO instant, या `null`) शामिल है: योजना के सबसे पहले `service`-प्रकार समय से `signupDeadlineHours` पहले (यदि कोई service समय नहीं है तो कोई भी समयबद्ध प्रविष्टि; यदि योजना में कोई समय नहीं है तो चर्च के समय क्षेत्र में `serviceDate` पर 9:00) |
| GET | `/signup/:planId/volunteers` | JWT | — | योजना के स्व-साइनअप पदों के लिए `[{ positionId, names }]` (Accepted/Unconfirmed असाइनी के प्रदर्शित नाम)। जब तक योजना का `showVolunteerNames` चालू न हो, `[]` लौटता है |
| POST | `/` | JWT | — | योजनाएँ बनाएँ या अपडेट करें (एकल ऑब्जेक्ट या सरणी स्वीकार्य)। किसी सेवा पुष्टि वर्कफ़्लो में योजना को शामिल करने के लिए `confirmationWorkflowId` सेट करें, या भविष्य के अनुरोधों के लिए बाहर रखने हेतु `null`। डेडलाइन हटाने के लिए `signupDeadlineHours: null` भेजें; फ़ील्ड छोड़ने पर सहेजा गया मान बना रहता है |
| POST | `/copy/:id` | JWT | Ministry edit | पदों, समयों, असाइनमेंट और सेवा के क्रम के आइटमों सहित योजना कॉपी करें। Body में `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") और `copyServiceOrder` (boolean) शामिल हैं। `targetPlanId` के बिना एक नई योजना बनती है, और `notes`, `signupDeadlineHours`, `showVolunteerNames`, और `autoReplaceOnDecline` स्रोत योजना से आते हैं, जब तक body उन्हें न दे। `targetPlanId` के साथ, कॉपी उस मौजूदा योजना को भरती है (कॉलर को उसे संपादित करने में सक्षम होना चाहिए)। B1Admin का **Repeat weekly** विकल्प हर सप्ताह के लिए इसे एक बार कॉल करता है, हर बार पिछले सप्ताह बनाई गई योजना से कॉपी करते हुए |
| POST | `/textRange` | JWT | `texting.send` + ministry edit | चर्च के टेक्स्टिंग प्रदाता के माध्यम से एक तारीख सीमा में असाइन किए गए हर स्वयंसेवक को टेक्स्ट करें। Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (संदेश 1600 अक्षरों तक; प्रति प्राप्तकर्ता मर्ज फ़ील्ड हल होते हैं)। पूर्वावलोकन गिनती के साथ `recipientCount`, `successCount`, `failCount`, और `error` (`no_provider` या `insufficient_credits`) लौटाता है जब भेजना जल्दी रुकता है |
| POST | `/:id/issueRequests` | JWT | Plan edit | योजना के नए Unconfirmed, अभी तक सूचित न किए गए असाइनमेंट को उसके पुष्टि वर्कफ़्लो के माध्यम से जारी करें: हर एक को सूचित चिह्नित करता है और हर असाइनमेंट के लिए एक वर्कफ़्लो कार्ड शुरू करता है। खाली body; `{ issued }` लौटाता है। तब तक विफल होता है जब तक योजना प्रकाशित न हो (`prepared` न हो), उसका सक्रिय `confirmationWorkflowId` न हो जिसमें कम से कम एक चरण हो, और उसकी response deadline न निकली हो |
| POST | `/autofill/:id` | JWT | — | योजना के लिए स्वयंसेवक असाइनमेंट स्वतः भरें। Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | योजना और सभी संबंधित समय, असाइनमेंट, पद, और योजना आइटम हटाएँ |

### उदाहरण: एक योजना कॉपी करना

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

Extends CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — कोई अनुमति जाँच नहीं)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी plan types सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से plan type प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग IDs द्वारा कई plan types प्राप्त करें |
| GET | `/ministryId/:ministryId` | JWT | — | किसी सेवकाई के लिए plan types प्राप्त करें |
| POST | `/` | JWT | — | plan types बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | — | plan type हटाएँ |

## Plan Items

Base path: `/doing/planItems`

parent-child ट्री संरचना में व्यवस्थित सेवा के क्रम के आइटम (हेडर, अनुभाग, गीत, आदि) प्रबंधित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से plan item प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग IDs द्वारा कई plan items प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी योजना के सभी plan items प्राप्त करें (ट्री संरचना लौटाता है) |
| GET | `/presenter/:churchId/:planId` | Public | — | presenter दृश्य के लिए plan items प्राप्त करें (ट्री संरचना लौटाता है) |
| POST | `/` | JWT | — | plan items बनाएँ या अपडेट करें |
| POST | `/sort` | JWT | — | plan item का सॉर्ट क्रम अपडेट करें (सहोदरों को पुनः क्रमबद्ध करता है) |
| DELETE | `/:id` | JWT | — | plan item हटाएँ |

## Plan Feed

Base path: `/doing/planFeed`

presenter के लिए plan item feeds प्रदान करता है। यदि कोई plan items मौजूद नहीं हैं, तो योजना के `contentId` का उपयोग करके Lessons.church venue feed से स्वतः भरता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | presenter के लिए plan feed प्राप्त करें (खाली होने पर venue feed से स्वतः भरता है) |

## Positions

Base path: `/doing/positions`

Extends CRUD base class (GET `/:id`, POST `/`, DELETE `/:id` — कोई अनुमति जाँच नहीं)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से position प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग IDs द्वारा कई positions प्राप्त करें |
| GET | `/plan/ids?planIds=` | JWT | — | अल्पविराम से अलग plan IDs द्वारा कई योजनाओं के positions प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी योजना के सभी positions प्राप्त करें |
| POST | `/` | JWT | — | positions बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | — | position हटाएँ |

## Times

Base path: `/doing/times`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | चर्च के लिए सभी समय सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से समय प्राप्त करें |
| GET | `/plans?planIds=` | JWT | — | अल्पविराम से अलग plan IDs द्वारा कई योजनाओं के समय प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी योजना के सभी समय प्राप्त करें |
| POST | `/` | JWT | — | समय बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | — | समय हटाएँ |

## Assignments

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के असाइनमेंट प्राप्त करें |
| GET | `/my/upcoming` | JWT | — | वर्तमान उपयोगकर्ता के कल से शुरू होने वाली तारीखों की योजनाओं पर अधिकतम 20 असाइनमेंट, सबसे नज़दीक पहले (penciled-in, या `prepared`, योजनाएँ छोड़ी जाती हैं): `{ assignmentId, status, positionName, planId, planName, serviceDate }`। सदस्य होम पृष्ठ पर सेवा पूर्वावलोकन को सपोर्ट करता है |
| GET | `/:id` | JWT | — | ID से असाइनमेंट प्राप्त करें |
| GET | `/plan/ids?planIds=` | JWT | — | अल्पविराम से अलग plan IDs द्वारा कई योजनाओं के असाइनमेंट प्राप्त करें |
| GET | `/plan/:planId` | JWT | — | किसी योजना के सभी असाइनमेंट प्राप्त करें |
| POST | `/` | JWT | — | असाइनमेंट बनाएँ या अपडेट करें (स्थिति डिफ़ॉल्ट रूप से "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | असाइनमेंट स्वीकार करें (असाइन किए गए व्यक्ति को ही होना चाहिए) |
| POST | `/decline/:id` | JWT | — | असाइनमेंट अस्वीकार करें (असाइन किए गए व्यक्ति को ही होना चाहिए) |
| POST | `/signup` | JWT | — | किसी पद के लिए स्व-साइनअप। Body: `{ positionId }`। पद को स्व-साइनअप की अनुमति और जगह होनी चाहिए; एक Accepted असाइनमेंट बनाता है। योजना की साइनअप डेडलाइन (जैसा ऊपर, पहले सेवा समय से पीछे गिना गया) बीत जाने पर "Signup deadline has passed" के साथ अस्वीकृत |
| DELETE | `/signup/:id` | JWT | — | अपना स्व-साइनअप हटाएँ। योजना की साइनअप डेडलाइन के बाद "Removal deadline has passed" के साथ अस्वीकृत |
| DELETE | `/:id` | JWT | — | असाइनमेंट हटाएँ |

### उदाहरण: एक असाइनमेंट स्वीकार करना

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

Extends CRUD base class (GET `/:id`, DELETE `/:id` — कोई अनुमति जाँच नहीं)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से blockout date प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग IDs द्वारा कई blockout dates प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के blockout dates प्राप्त करें |
| GET | `/upcoming` | JWT | — | चर्च के लिए सभी आगामी blockout dates प्राप्त करें |
| POST | `/` | JWT | — | blockout dates बनाएँ या अपडेट करें (personId प्रदान न होने पर डिफ़ॉल्ट रूप से वर्तमान उपयोगकर्ता) |
| DELETE | `/:id` | JWT | — | blockout date हटाएँ |

## Tasks

Base path: `/doing/tasks`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के खुले कार्य प्राप्त करें |
| GET | `/:id` | JWT | — | ID से कार्य प्राप्त करें |
| GET | `/:id/contact` | JWT | कार्ड देख सकने की अनुमति | उस व्यक्ति की संपर्क जानकारी जिसके बारे में workflow कार्ड है: `{ personId, displayName, mobilePhone, email }`। People पहुँच के बिना असाइन किए गए कॉलर को व्यक्ति तक पहुँचने देता है |
| GET | `/closed` | JWT | — | वर्तमान उपयोगकर्ता के बंद कार्य प्राप्त करें |
| GET | `/timeline?taskIds=` | JWT | — | अल्पविराम से अलग task IDs द्वारा कार्यों का timeline डेटा प्राप्त करें |
| GET | `/directoryUpdate/:personId` | JWT | — | किसी व्यक्ति के लिए directory update कार्य प्राप्त करें |
| POST | `/` | JWT | — | कार्य बनाएँ या अपडेट करें। directory update कार्यों को संभालने के लिए `?type=directoryUpdate` जोड़ें (फ़ोटो स्वतः अपलोड होती हैं) |
| POST | `/:id/conversation` | JWT | `tasks.edit` या कार्ड असाइनी | कार्ड से notes conversation जोड़ें। Body: `{ conversationId }`। पहली जुड़ी conversation जीतती है; बाद के कॉल कार्ड को बदले बिना लौटाते हैं |
| POST | `/loadForGroups` | JWT | — | विशिष्ट समूहों के लिए कार्य लोड करें। Body: `{ groupIds: [], status: "Open" }` |

## Automations

Base path: `/doing/automations`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के लिए सभी automations सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से automation प्राप्त करें |
| GET | `/check` | Public | — | सभी automations की जाँच ट्रिगर करें |
| POST | `/` | JWT | — | automations बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | — | automation हटाएँ |

## Actions

Base path: `/doing/actions`

Actions परिभाषित करते हैं कि automation ट्रिगर होने पर क्या होता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से action प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी automation की सभी actions प्राप्त करें |
| POST | `/` | JWT | — | actions बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | — | action हटाएँ |

## Conditions

Base path: `/doing/conditions`

Conditions वे मानदंड परिभाषित करते हैं जो automation को ट्रिगर करते हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से condition प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी automation की सभी conditions प्राप्त करें |
| POST | `/` | JWT | — | conditions बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | — | condition हटाएँ |

## Conjunctions

Base path: `/doing/conjunctions`

Conjunctions किसी automation में कई conditions को जोड़ते हैं (AND/OR तर्क)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से conjunction प्राप्त करें |
| GET | `/automation/:id` | JWT | — | किसी automation की सभी conjunctions प्राप्त करें |
| POST | `/` | JWT | — | conjunctions बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | — | conjunction हटाएँ |

## Content Provider Auths

Base path: `/doing/contentProviderAuths`

Extends CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — कोई अनुमति जाँच नहीं)।

बाहरी सामग्री प्रदाताओं (जैसे प्रस्तुति सॉफ़्टवेयर एकीकरण) के लिए OAuth प्रमाणीकरण रिकॉर्ड प्रबंधित करता है।

`accessToken` और `refreshToken` `EncryptionHelper` से विश्राम अवस्था में एन्क्रिप्टेड रहते हैं और पढ़ने पर डिक्रिप्ट होते हैं, इसलिए API अब भी सादे टोकन लौटाता है। एन्क्रिप्शन से पहले सहेजी गई पंक्तियों में सादा पाठ होता है (जिसमें कभी `|` नहीं होता); वे जैसी हैं वैसी लौटाई जाती हैं, और अगली बार सहेजे जाने पर एन्क्रिप्ट हो जाती हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी content provider auths सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से content provider auth प्राप्त करें |
| GET | `/ids?ids=` | JWT | — | अल्पविराम से अलग IDs द्वारा कई content provider auths प्राप्त करें |
| GET | `/ministry/:ministryId` | JWT | — | किसी सेवकाई के सभी content provider auths प्राप्त करें |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | किसी विशिष्ट सेवकाई और प्रदाता के लिए auth रिकॉर्ड प्राप्त करें |
| POST | `/` | JWT | — | content provider auths बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | — | content provider auth हटाएँ |

## Provider Proxy

Base path: `/doing/providerProxy`

बाहरी सामग्री प्रदाताओं (जैसे ProPresenter, EasyWorship) को अनुरोध प्रॉक्सी करता है। टोकन समाप्त होने पर स्वचालित रूप से टोकन ताज़ा करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | सामग्री प्रदाता की फ़ाइलें ब्राउज़ करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | सामग्री प्रदाता से presentations प्राप्त करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | सामग्री प्रदाता से playlist प्राप्त करें। Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | सामग्री आइटम के लिए निर्देश प्राप्त करें। Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | सामग्री आइटम के लिए विस्तारित निर्देश प्राप्त करें। Body: `{ ministryId, providerId, path }` |

## संबंधित पृष्ठ

- [Membership Endpoints](./membership) — लोग, समूह, भूमिकाएँ, और अनुमतियाँ
- [Attendance Endpoints](./attendance) — सेवा और विज़िट ट्रैकिंग
- [Module Structure](../module-structure) — कोड संगठन पैटर्न
