---
title: "सदस्यता एंडपॉइंट"
---

# सदस्यता एंडपॉइंट

<div class="article-intro">

Membership मॉड्यूल लोगों, चर्चों, समूहों, परिवारों, भूमिकाओं, अनुमतियों, फ़ॉर्म और सेटिंग्स का प्रबंधन करता है। यह सबसे बड़ा मॉड्यूल है और सभी अन्य मॉड्यूल के लिए मुख्य पहचान और प्राधिकरण परत प्रदान करता है।

</div>

**बेस पथ:** `/membership`

## लोग

बेस पथ: `/membership/people`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View या Member | चर्च के सभी लोग सूचीबद्ध करें |
| GET | `/:id` | JWT | People.View या अपना रिकॉर्ड | ID द्वारा व्यक्ति प्राप्त करें (फ़ॉर्म सबमिशन सहित) |
| GET | `/ids?ids=` | JWT | People.View या Member | कॉमा-सेपरेटेड ID द्वारा कई लोग प्राप्त करें |
| GET | `/basic?ids=` | JWT | — | कई लोगों की बुनियादी जानकारी (केवल नाम) प्राप्त करें |
| GET | `/recent` | JWT | People.View या Member | हाल ही में जोड़े गए लोग |
| GET | `/search?term=&email=` | JWT | People.View या Member | नाम या ईमेल द्वारा लोग खोजें |
| GET | `/search/phone?number=` | JWT | People.View या Member | फ़ोन नंबर द्वारा खोजें |
| GET | `/search/group?groupId=` | JWT | People.View या Member | विशिष्ट समूह में लोग प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | परिवार के सभी लोग प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | फ़िल्टर के साथ उपस्थित लोग लोड करें (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और समूहों के लिए टाइमलाइन डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | डायरेक्टरी दृश्य के लिए व्यक्ति प्राप्त करें (दृश्यता प्राथमिकताओं का सम्मान करता है) |
| GET | `/claim/:churchId` | JWT | — | चर्च पर वर्तमान उपयोगकर्ता के लिए व्यक्ति रिकॉर्ड दावा करें |
| POST | `/` | JWT | People.Edit या EditSelf | लोग बनाएँ या अपडेट करें (बैच) |
| POST | `/search` | JWT | People.View या Member | लोग खोजें (POST वेरिएंट) |
| POST | `/advancedSearch` | JWT | People.View या Member | बहु-शर्त खोज (आयु, जन्म माह, सदस्यता स्थिति, आदि) |
| POST | `/loadOrCreate` | Public | — | ईमेल द्वारा व्यक्ति खोजें या बनाएँ। बॉडी: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | परिवार सदस्य असाइनमेंट अपडेट करें |
| POST | `/public/email` | Public | — | व्यक्ति को ईमेल भेजें। बॉडी: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | ID द्वारा व्यक्ति ईमेल लोड करें (सर्वर-टू-सर्वर, jwtSecret आवश्यक) |
| DELETE | `/:id` | JWT | People.Edit | व्यक्ति हटाएँ |

### उदाहरण: लोग खोजें

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

## उपयोगकर्ता

बेस पथ: `/membership/users`

लॉगिन, पंजीकरण और पासवर्ड प्रबंधन एंडपॉइंट के लिए [प्रमाणीकरण और अनुमतियाँ](./authentication) देखें।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | लॉग इन करें (ईमेल/पासवर्ड, JWT रिफ्रेश, या authGuid) |
| POST | `/register` | Public | — | नया उपयोगकर्ता पंजीकृत करें |
| POST | `/forgot` | Public | — | पासवर्ड रीसेट ईमेल भेजें |
| POST | `/setPasswordGuid` | Public | — | ईमेल लिंक से प्रमाणीकरण GUID का उपयोग करके पासवर्ड सेट करें |
| POST | `/verifyCredentials` | Public | — | ईमेल/पासवर्ड सत्यापित करें और संबंधित चर्च लौटाएँ |
| POST | `/loadOrCreate` | JWT | — | ईमेल/userId द्वारा उपयोगकर्ता खोजें या बनाएँ |
| POST | `/setDisplayName` | JWT | — | उपयोगकर्ता का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | उपयोगकर्ता का ईमेल पता बदलें |
| POST | `/updatePassword` | JWT | — | उपयोगकर्ता का पासवर्ड बदलें (न्यूनतम 6 अक्षर) |
| POST | `/updateOptedOut` | JWT | — | व्यक्ति की ऑप्ट-आउट स्थिति सेट करें |
| GET | `/search?term=` | JWT | Server.Admin | नाम/ईमेल द्वारा सभी उपयोगकर्ता खोजें |
| DELETE | `/` | JWT | — | वर्तमान उपयोगकर्ता खाता हटाएँ |

## चर्च

बेस पथ: `/membership/churches`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी चर्च लोड करें |
| GET | `/:id` | JWT | — | ID द्वारा चर्च प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | चर्च के डोमेन एडमिन उपयोगकर्ता प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | चर्च का प्रतिरूपण करें (केवल सर्वर एडमिन) |
| GET | `/all?term=` | JWT | Server.Admin | सभी चर्च खोजें (एडमिन) |
| GET | `/search/?name=` | Public | — | नाम द्वारा चर्च खोजें |
| GET | `/lookup/?subDomain=&id=` | Public | — | सबडोमेन या ID द्वारा चर्च लुकअप करें |
| POST | `/` | JWT | Settings.Edit | चर्च विवरण अपडेट करें |
| POST | `/add` | JWT | — | नया चर्च पंजीकृत करें। आवश्यक फ़ील्ड: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | नाम द्वारा चर्च खोजें (POST वेरिएंट) |
| POST | `/select` | JWT | — | चर्च चुनें/स्विच करें। बॉडी: `{ churchId }` या `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | चर्च को आर्काइव या अनार्काइव करें |
| POST | `/byIds` | Public | — | ID द्वारा कई चर्च लोड करें |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7+ दिनों से छोड़े गए चर्च हटाएँ |

## समूह

बेस पथ: `/membership/groups`

मानक CRUD विस्तारित (बेस क्लास से GET `/`, GET `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूह सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा समूह प्राप्त करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | सेवा फ़िल्टर द्वारा समूह खोजें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के समूह प्राप्त करें |
| GET | `/my/:tag` | JWT | — | टैग द्वारा फ़िल्टर किए गए वर्तमान उपयोगकर्ता के समूह प्राप्त करें |
| GET | `/tag/:tag` | JWT | — | विशिष्ट टैग वाले सभी समूह प्राप्त करें |
| GET | `/public/:churchId/:id` | Public | — | चर्च और ID द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/tag/:tag` | Public | — | टैग द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/label?label=` | Public | — | लेबल द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/slug/:slug` | Public | — | स्लग द्वारा सार्वजनिक समूह प्राप्त करें |
| POST | `/` | JWT | Groups.Edit | समूह बनाएँ या अपडेट करें (स्वचालित स्लग जनरेट) |
| DELETE | `/:id` | JWT | Groups.Edit | समूह हटाएँ (मंत्रालय समूहों के लिए चाइल्ड टीम भी हटाता है) |

## समूह सदस्य

बेस पथ: `/membership/groupmembers`

मानक CRUD विस्तारित (बेस क्लास से GET `/:id`, DELETE `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID द्वारा समूह सदस्य प्राप्त करें |
| GET | `/` | JWT | GroupMembers.View* | समूह सदस्य सूचीबद्ध करें। `?groupId=`, `?groupIds=`, या `?personId=` से फ़िल्टर करें। *उपयोगकर्ता समूह में होने या अपना personId क्वेरी करने पर भी अनुमत |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की समूह सदस्यताएँ प्राप्त करें |
| GET | `/basic/:groupId` | JWT | — | समूह की बुनियादी सदस्य सूची प्राप्त करें |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | समूह नेता प्राप्त करें (सार्वजनिक) |
| POST | `/` | JWT | GroupMembers.Edit | समूह सदस्य जोड़ें या अपडेट करें |
| DELETE | `/:id` | JWT | GroupMembers.View | समूह सदस्य हटाएँ |

## परिवार

बेस पथ: `/membership/households`

मानक CRUD कंट्रोलर।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी परिवार सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा परिवार प्राप्त करें |
| POST | `/` | JWT | People.Edit | परिवार बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | People.Edit | परिवार हटाएँ |

## भूमिकाएँ

बेस पथ: `/membership/roles`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID द्वारा भूमिका प्राप्त करें |
| GET | `/church/:churchId` | JWT | Roles.View | चर्च की सभी भूमिकाएँ प्राप्त करें |
| POST | `/` | JWT | Roles.Edit | भूमिकाएँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका हटाएँ (इसकी अनुमतियाँ और सदस्य भी हटाता है) |

## भूमिका सदस्य

बेस पथ: `/membership/rolemembers`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | भूमिका के सदस्य प्राप्त करें। उपयोगकर्ता विवरण शामिल करने के लिए `?include=users` जोड़ें |
| POST | `/` | JWT | Roles.Edit | भूमिका में सदस्य जोड़ें (ईमेल मौजूद न होने पर उपयोगकर्ता बनाता है) |
| DELETE | `/:id` | JWT | Roles.View | भूमिका सदस्य हटाएँ |
| DELETE | `/self/:churchId/:userId` | JWT | — | अपने आप को चर्च से हटाएँ |

## भूमिका अनुमतियाँ

बेस पथ: `/membership/rolepermissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | भूमिका की अनुमतियाँ प्राप्त करें ("सभी" भूमिका के लिए ID के रूप में `null` उपयोग करें) |
| POST | `/` | JWT | Roles.Edit | भूमिका अनुमतियाँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका अनुमति हटाएँ |

## अनुमतियाँ

बेस पथ: `/membership/permissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | उपलब्ध अनुमतियों की पूर्ण सूची प्राप्त करें |

## फ़ॉर्म

बेस पथ: `/membership/forms`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सभी फ़ॉर्म सूचीबद्ध करें (एडमिन सभी देखता है; संपादक असाइन + गैर-सदस्य फ़ॉर्म देखते हैं) |
| GET | `/:id` | JWT | फ़ॉर्म एक्सेस | ID द्वारा फ़ॉर्म प्राप्त करें |
| GET | `/archived` | JWT | Forms.Admin या Forms.Edit | आर्काइव किए गए फ़ॉर्म सूचीबद्ध करें |
| GET | `/standalone/:id?churchId=` | JWT | — | स्टैंडअलोन फ़ॉर्म प्राप्त करें (प्रतिबंधित फ़ॉर्म के लिए प्रमाणीकरण आवश्यक) |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | फ़ॉर्म बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | फ़ॉर्म एक्सेस | फ़ॉर्म हटाएँ |

## फ़ॉर्म सबमिशन

बेस पथ: `/membership/formsubmissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सबमिशन सूचीबद्ध करें। `?personId=` या `?formId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Forms.Admin या Forms.Edit | ID द्वारा सबमिशन प्राप्त करें। `?include=form,questions,answers` जोड़ें |
| GET | `/formId/:formId` | JWT | फ़ॉर्म एक्सेस | फ़ॉर्म के सभी सबमिशन प्राप्त करें (फ़ॉर्म, प्रश्न, उत्तर सहित) |
| POST | `/` | JWT | — | फ़ॉर्म उत्तर सबमिट करें (प्रतिबंधित/अप्रतिबंधित फ़ॉर्म संभालता है, ईमेल सूचनाएँ भेजता है) |
| DELETE | `/:id` | JWT | Forms.Admin या Forms.Edit | सबमिशन और उसके उत्तर हटाएँ |

## प्रश्न

बेस पथ: `/membership/questions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | फ़ॉर्म एक्सेस | फ़ॉर्म के लिए प्रश्न सूचीबद्ध करें। `?formId=` आवश्यक |
| GET | `/:id` | JWT | फ़ॉर्म एक्सेस | ID द्वारा प्रश्न प्राप्त करें |
| GET | `/unrestricted?formId=` | JWT | — | अप्रतिबंधित फ़ॉर्म के प्रश्न प्राप्त करें |
| GET | `/sort/:id/up` | JWT | — | क्रम में प्रश्न ऊपर ले जाएँ |
| GET | `/sort/:id/down` | JWT | — | क्रम में प्रश्न नीचे ले जाएँ |
| POST | `/` | JWT | फ़ॉर्म एक्सेस | प्रश्न बनाएँ या अपडेट करें (स्वचालित क्रम असाइन करता है) |
| DELETE | `/:id?formId=` | JWT | फ़ॉर्म एक्सेस | प्रश्न हटाएँ |

## उत्तर

बेस पथ: `/membership/answers`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर सूचीबद्ध करें। `?formSubmissionId=` से फ़िल्टर करें |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर बनाएँ या अपडेट करें |

## सदस्य अनुमतियाँ

बेस पथ: `/membership/memberpermissions`

विशिष्ट फ़ॉर्म के लिए प्रति-सदस्य एक्सेस नियंत्रित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | फ़ॉर्म एक्सेस | ID द्वारा सदस्य अनुमति प्राप्त करें |
| GET | `/member/:id` | JWT | फ़ॉर्म एक्सेस | सदस्य की सभी फ़ॉर्म अनुमतियाँ प्राप्त करें |
| GET | `/form/:id` | JWT | फ़ॉर्म एक्सेस | फ़ॉर्म की सभी सदस्य अनुमतियाँ प्राप्त करें |
| GET | `/form/:id/my` | JWT | फ़ॉर्म एक्सेस | फ़ॉर्म के लिए वर्तमान उपयोगकर्ता की अनुमति प्राप्त करें |
| POST | `/` | JWT | फ़ॉर्म एक्सेस | सदस्य अनुमतियाँ बनाएँ या अपडेट करें |
| DELETE | `/:id?formId=` | JWT | फ़ॉर्म एक्सेस | सदस्य अनुमति हटाएँ |
| DELETE | `/member/:id?formId=` | JWT | फ़ॉर्म एक्सेस | फ़ॉर्म पर सदस्य की सभी अनुमतियाँ हटाएँ |

## सेटिंग्स

बेस पथ: `/membership/settings`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | Public | — | चर्च की सार्वजनिक सेटिंग्स प्राप्त करें |
| POST | `/` | JWT | Settings.Edit | सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |

## डोमेन

बेस पथ: `/membership/domains`

मानक CRUD विस्तारित (बेस क्लास से GET `/:id`, GET `/`, DELETE `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी डोमेन सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा डोमेन प्राप्त करें |
| GET | `/lookup/:domainName` | JWT | — | नाम द्वारा डोमेन लुकअप करें |
| GET | `/public/lookup/:domainName` | Public | — | नाम द्वारा सार्वजनिक डोमेन लुकअप |
| GET | `/health/check` | Public | — | अनजाँचे डोमेन पर हेल्थ चेक चलाएँ |
| POST | `/` | JWT | Settings.Edit | डोमेन बनाएँ या अपडेट करें (Caddy अपडेट ट्रिगर करता है) |
| DELETE | `/:id` | JWT | Settings.Edit | डोमेन हटाएँ |

## उपयोगकर्ता चर्च

बेस पथ: `/membership/userchurch`

उपयोगकर्ताओं और चर्चों के बीच संबंध प्रबंधित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | उपयोगकर्ता ID द्वारा उपयोगकर्ता-चर्च रिकॉर्ड प्राप्त करें |
| GET | `/personid/:personId` | JWT | — | व्यक्ति के लिंक किए गए उपयोगकर्ता का ईमेल प्राप्त करें |
| GET | `/user/:userId` | JWT | Server.Admin | उपयोगकर्ता के सभी चर्च लोड करें |
| POST | `/` | JWT | — | उपयोगकर्ता-चर्च संबंध बनाएँ |
| PATCH | `/:userId` | JWT | — | अंतिम एक्सेस समय अपडेट करें और एक्सेस लॉग करें |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | उपयोगकर्ता-चर्च रिकॉर्ड हटाएँ |

## दृश्यता प्राथमिकताएँ

बेस पथ: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की दृश्यता प्राथमिकताएँ प्राप्त करें |
| POST | `/` | JWT | — | दृश्यता प्राथमिकताएँ सहेजें (पता, फ़ोन, ईमेल दृश्यता) |

## क्वेरी

बेस पथ: `/membership/query`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI का उपयोग करके प्राकृतिक भाषा सदस्य खोज। बॉडी: `{ text, subDomain, siteUrl }` |

## क्लाइंट त्रुटियाँ

बेस पथ: `/membership/clientErrors`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | क्लाइंट-साइड त्रुटि लॉग करें |

## संबंधित पृष्ठ

- [प्रमाणीकरण और अनुमतियाँ](./authentication) — लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [Attendance एंडपॉइंट](./attendance) — सेवा और विज़िट ट्रैकिंग
- [मॉड्यूल संरचना](../module-structure) — कोड संगठन पैटर्न
