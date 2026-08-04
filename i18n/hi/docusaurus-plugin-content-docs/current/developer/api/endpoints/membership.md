---
title: "Membership एंडपॉइंट्स"
---

# Membership एंडपॉइंट्स

<div class="article-intro">

Membership मॉड्यूल लोगों, चर्चेज़, ग्रुप्स, हाउसहोल्ड्स, रोल्स, परमिशंस, फ़ॉर्म्स, और सेटिंग्स को मैनेज करता है। यह सबसे बड़ा मॉड्यूल है और सभी अन्य मॉड्यूल्स के लिए मुख्य आइडेंटिटी और ऑथराइज़ेशन लेयर प्रदान करता है।

</div>

**बेस पथ:** `/membership`

## People

बेस पथ: `/membership/people`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View या Member | चर्च के लिए सभी लोग सूचीबद्ध करें |
| GET | `/:id` | JWT | People.View या खुद का रिकॉर्ड | ID से एक व्यक्ति प्राप्त करें (फ़ॉर्म सबमिशंस शामिल) |
| GET | `/ids?ids=` | JWT | People.View या Member | कॉमा से अलग IDs से कई लोग प्राप्त करें |
| GET | `/basic?ids=` | JWT | — | कई लोगों की बेसिक जानकारी (केवल नाम) प्राप्त करें |
| GET | `/recent` | JWT | People.View या Member | हाल में जोड़े गए लोग |
| GET | `/search?term=&email=` | JWT | People.View या Member | नाम या ईमेल से लोगों को खोजें |
| GET | `/search/phone?number=` | JWT | People.View या Member | फ़ोन नंबर से खोजें |
| GET | `/search/group?groupId=` | JWT | People.View या Member | किसी विशिष्ट ग्रुप के लोग प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | किसी हाउसहोल्ड के सभी लोग प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | फ़िल्टर्स के साथ अटेंडीज़ लोड करें (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और ग्रुप्स के लिए टाइमलाइन डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | डायरेक्टरी व्यू के लिए व्यक्ति प्राप्त करें (विज़िबिलिटी प्रेफ़रेंसेज़ का सम्मान करता है) |
| GET | `/claim/:churchId` | JWT | — | किसी चर्च में वर्तमान यूज़र के लिए एक व्यक्ति रिकॉर्ड क्लेम करें |
| POST | `/` | JWT | People.Edit या EditSelf | लोगों को बनाएं या अपडेट करें (बैच) |
| POST | `/search` | JWT | People.View या Member | लोगों को खोजें (POST वेरिएंट) |
| POST | `/advancedSearch` | JWT | People.View या Member | मल्टी-कंडीशन सर्च (age, birthMonth, membershipStatus, आदि) |
| POST | `/loadOrCreate` | सार्वजनिक | — | ईमेल से व्यक्ति खोजें या बनाएं। बॉडी: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | हाउसहोल्ड सदस्य असाइनमेंट अपडेट करें |
| POST | `/public/email` | सार्वजनिक | — | किसी व्यक्ति को ईमेल भेजें। बॉडी: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | आंतरिक | — | IDs से व्यक्तियों के ईमेल्स लोड करें (सर्वर-टू-सर्वर, jwtSecret आवश्यक है) |
| DELETE | `/:id` | JWT | People.Edit | एक व्यक्ति हटाएं |

### उदाहरण: लोगों को खोजें

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

### उदाहरण: एक व्यक्ति बनाएं

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Users

बेस पथ: `/membership/users`

लॉगिन, रजिस्ट्रेशन, और पासवर्ड मैनेजमेंट एंडपॉइंट्स के लिए [Authentication & Permissions](./authentication) देखें।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/login` | सार्वजनिक | — | लॉग इन करें (email/password, JWT रीफ़्रेश, या authGuid) |
| POST | `/register` | सार्वजनिक | — | एक नया यूज़र रजिस्टर करें |
| POST | `/forgot` | सार्वजनिक | — | पासवर्ड रीसेट ईमेल भेजें |
| POST | `/setPasswordGuid` | सार्वजनिक | — | ईमेल लिंक से auth GUID का उपयोग करके पासवर्ड सेट करें |
| POST | `/verifyCredentials` | सार्वजनिक | — | ईमेल/पासवर्ड वेरिफ़ाई करें और संबंधित चर्चेज़ लौटाएं |
| POST | `/loadOrCreate` | JWT | — | ईमेल/userId से यूज़र खोजें या बनाएं |
| POST | `/setDisplayName` | JWT | — | यूज़र का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | यूज़र का ईमेल पता बदलें |
| POST | `/updatePassword` | JWT | — | यूज़र का पासवर्ड बदलें (न्यूनतम 6 वर्ण) |
| POST | `/updateOptedOut` | JWT | — | किसी व्यक्ति की ऑप्टेड-आउट स्थिति सेट करें |
| GET | `/search?term=` | JWT | Server.Admin | नाम/ईमेल से सभी यूज़र्स खोजें |
| DELETE | `/` | JWT | — | वर्तमान यूज़र खाता हटाएं |

## Churches

बेस पथ: `/membership/churches`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान यूज़र के लिए सभी चर्चेज़ लोड करें |
| GET | `/:id` | JWT | — | ID से चर्च प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | किसी चर्च के लिए डोमेन एडमिन यूज़र प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | किसी चर्च की नकल करें (केवल सर्वर एडमिन) |
| GET | `/all?term=` | JWT | Server.Admin | सभी चर्चेज़ खोजें (एडमिन) |
| GET | `/search/?name=` | सार्वजनिक | — | नाम से चर्चेज़ खोजें |
| GET | `/lookup/?subDomain=&id=` | सार्वजनिक | — | सबडोमेन या ID से किसी चर्च को देखें |
| POST | `/` | JWT | Settings.Edit | चर्च विवरण अपडेट करें |
| POST | `/add` | JWT | — | एक नया चर्च रजिस्टर करें। आवश्यक फ़ील्ड्स: name, address1, city, state, zip, country |
| POST | `/search` | सार्वजनिक | — | नाम से चर्चेज़ खोजें (POST वेरिएंट) |
| POST | `/select` | JWT | — | किसी चर्च को सेलेक्ट/स्विच करें। बॉडी: `{ churchId }` या `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | किसी चर्च को आर्काइव या अनआर्काइव करें |
| POST | `/byIds` | सार्वजनिक | — | IDs से कई चर्चेज़ लोड करें |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7+ दिनों से अबैंडन्ड चर्चेज़ हटाएं |

## Groups

बेस पथ: `/membership/groups`

मानक CRUD विस्तारित करता है (बेस क्लास से GET `/`, GET `/:id`)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी ग्रुप्स सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से ग्रुप प्राप्त करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | सर्विस फ़िल्टर्स से ग्रुप्स खोजें |
| GET | `/my` | JWT | — | वर्तमान यूज़र के लिए ग्रुप्स प्राप्त करें |
| GET | `/my/:tag` | JWT | — | वर्तमान यूज़र के ग्रुप्स को टैग से फ़िल्टर करके प्राप्त करें |
| GET | `/tag/:tag` | JWT | — | किसी विशिष्ट टैग के सभी ग्रुप्स प्राप्त करें |
| GET | `/public/:churchId/:id` | सार्वजनिक | — | चर्च और ID से एक सार्वजनिक ग्रुप प्राप्त करें |
| GET | `/public/:churchId/tag/:tag` | सार्वजनिक | — | टैग से सार्वजनिक ग्रुप्स प्राप्त करें |
| GET | `/public/:churchId/label?label=` | सार्वजनिक | — | लेबल से सार्वजनिक ग्रुप्स प्राप्त करें |
| GET | `/public/:churchId/slug/:slug` | सार्वजनिक | — | slug से एक सार्वजनिक ग्रुप प्राप्त करें |
| POST | `/` | JWT | Groups.Edit | ग्रुप्स बनाएं या अपडेट करें (slug स्वतः जनरेट करता है) |
| DELETE | `/:id` | JWT | Groups.Edit | एक ग्रुप हटाएं (मिनिस्ट्री ग्रुप्स के लिए चाइल्ड टीम्स भी हटाता है) |

## Group Members

बेस पथ: `/membership/groupmembers`

मानक CRUD विस्तारित करता है (बेस क्लास से GET `/:id`, DELETE `/:id`)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID से ग्रुप मेंबर प्राप्त करें |
| GET | `/` | JWT | GroupMembers.View* | ग्रुप मेंबर्स सूचीबद्ध करें। `?groupId=`, `?groupIds=`, या `?personId=` से फ़िल्टर करें। *यह भी अनुमति है यदि यूज़र उस ग्रुप में है या खुद की personId क्वेरी कर रहा है |
| GET | `/my` | JWT | — | वर्तमान यूज़र की ग्रुप मेंबरशिप्स प्राप्त करें |
| GET | `/basic/:groupId` | JWT | — | किसी ग्रुप के लिए बेसिक मेंबर लिस्ट प्राप्त करें |
| GET | `/public/leaders/:churchId/:groupId` | सार्वजनिक | — | ग्रुप लीडर्स प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:groupId` | सार्वजनिक | — | किसी ग्रुप का सार्वजनिक रोस्टर प्राप्त करें (न्यूनतम फ़ील्ड्स: `personId`, `displayName`, `leader`, फ़ोटो)। केवल तब जब ग्रुप ने `publicRoster` से इसे चुना हो; वेबसाइट बिल्डर के `staffGrid` एलिमेंट को पावर देता है |
| POST | `/` | JWT | GroupMembers.Edit | ग्रुप मेंबर्स जोड़ें या अपडेट करें |
| DELETE | `/:id` | JWT | GroupMembers.View | एक ग्रुप मेंबर हटाएं |

## Households

बेस पथ: `/membership/households`

मानक CRUD कंट्रोलर।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी हाउसहोल्ड्स सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से हाउसहोल्ड प्राप्त करें |
| POST | `/` | JWT | People.Edit | हाउसहोल्ड्स बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | People.Edit | एक हाउसहोल्ड हटाएं |

## Roles

बेस पथ: `/membership/roles`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID से रोल प्राप्त करें |
| GET | `/church/:churchId` | JWT | Roles.View | किसी चर्च के सभी रोल्स प्राप्त करें |
| POST | `/` | JWT | Roles.Edit | रोल्स बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | एक रोल हटाएं (उसकी परमिशंस और मेंबर्स भी हटाता है) |

## Role Members

बेस पथ: `/membership/rolemembers`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी रोल के मेंबर्स प्राप्त करें। यूज़र विवरण शामिल करने के लिए `?include=users` जोड़ें |
| POST | `/` | JWT | Roles.Edit | किसी रोल में मेंबर्स जोड़ें (यदि ईमेल मौजूद न हो तो यूज़र बनाता है) |
| DELETE | `/:id` | JWT | Roles.View | एक रोल मेंबर हटाएं |
| DELETE | `/self/:churchId/:userId` | JWT | — | खुद को किसी चर्च से हटाएं |

## Role Permissions

बेस पथ: `/membership/rolepermissions`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी रोल की परमिशंस प्राप्त करें ("Everyone" रोल के लिए `null` को ID के रूप में उपयोग करें) |
| POST | `/` | JWT | Roles.Edit | रोल परमिशंस बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | एक रोल परमिशन हटाएं |

## Permissions

बेस पथ: `/membership/permissions`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | उपलब्ध परमिशंस की पूरी सूची प्राप्त करें |

## Forms

बेस पथ: `/membership/forms`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सभी फ़ॉर्म्स सूचीबद्ध करें (एडमिन सभी देखता है; एडिटर्स असाइन्ड + नॉन-मेंबर फ़ॉर्म्स देखते हैं) |
| GET | `/:id` | JWT | Form access | ID से एक फ़ॉर्म प्राप्त करें |
| GET | `/archived` | JWT | Forms.Admin या Forms.Edit | आर्काइव्ड फ़ॉर्म्स सूचीबद्ध करें |
| GET | `/standalone/:id?churchId=` | JWT | — | एक स्टैंडअलोन फ़ॉर्म प्राप्त करें (प्रतिबंधित फ़ॉर्म्स के लिए ऑथ आवश्यक है) |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | फ़ॉर्म्स बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Form access | एक फ़ॉर्म हटाएं |

## Form Submissions

बेस पथ: `/membership/formsubmissions`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सबमिशंस सूचीबद्ध करें। `?personId=` या `?formId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Forms.Admin या Forms.Edit | ID से सबमिशन प्राप्त करें। `?include=form,questions,answers` जोड़ें |
| GET | `/formId/:formId` | JWT | Form access | किसी फ़ॉर्म के सभी सबमिशंस प्राप्त करें (फ़ॉर्म, प्रश्न, उत्तर शामिल) |
| POST | `/` | JWT | — | फ़ॉर्म उत्तर सबमिट करें (प्रतिबंधित/अप्रतिबंधित फ़ॉर्म्स को हैंडल करता है, ईमेल नोटिफ़िकेशंस भेजता है)। जब फ़ॉर्म में `autoCreatePerson` हो, तो ईमेल से एक Guest व्यक्ति ढूंढता या बनाता है और सबमिशन को लिंक करता है; जब `followUpSubject`/`followUpBody` सेट हों, तो सबमिटर को एक टेम्प्लेटेड फ़ॉलो-अप ईमेल भेजता है |
| DELETE | `/:id` | JWT | Forms.Admin या Forms.Edit | एक सबमिशन और उसके उत्तर हटाएं |

## Questions

बेस पथ: `/membership/questions`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | किसी फ़ॉर्म के प्रश्न सूचीबद्ध करें। `?formId=` आवश्यक है |
| GET | `/:id` | JWT | Form access | ID से एक प्रश्न प्राप्त करें |
| GET | `/unrestricted?formId=` | JWT | — | किसी अप्रतिबंधित फ़ॉर्म के प्रश्न प्राप्त करें |
| GET | `/sort/:id/up` | JWT | — | किसी प्रश्न को सॉर्ट क्रम में ऊपर ले जाएं |
| GET | `/sort/:id/down` | JWT | — | किसी प्रश्न को सॉर्ट क्रम में नीचे ले जाएं |
| POST | `/` | JWT | Form access | प्रश्न बनाएं या अपडेट करें (सॉर्ट क्रम स्वतः असाइन करता है) |
| DELETE | `/:id?formId=` | JWT | Form access | एक प्रश्न हटाएं |

## Answers

बेस पथ: `/membership/answers`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर सूचीबद्ध करें। `?formSubmissionId=` से फ़िल्टर करें |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर बनाएं या अपडेट करें |

## Member Permissions

बेस पथ: `/membership/memberpermissions`

किसी विशिष्ट फ़ॉर्म तक प्रति-मेंबर एक्सेस को नियंत्रित करता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | ID से एक मेंबर परमिशन प्राप्त करें |
| GET | `/member/:id` | JWT | Form access | किसी मेंबर की सभी फ़ॉर्म परमिशंस प्राप्त करें |
| GET | `/form/:id` | JWT | Form access | किसी फ़ॉर्म की सभी मेंबर परमिशंस प्राप्त करें |
| GET | `/form/:id/my` | JWT | Form access | किसी फ़ॉर्म के लिए वर्तमान यूज़र की परमिशन प्राप्त करें |
| POST | `/` | JWT | Form access | मेंबर परमिशंस बनाएं या अपडेट करें |
| DELETE | `/:id?formId=` | JWT | Form access | एक मेंबर परमिशन हटाएं |
| DELETE | `/member/:id?formId=` | JWT | Form access | किसी फ़ॉर्म पर किसी मेंबर की सभी परमिशंस हटाएं |

## Settings

बेस पथ: `/membership/settings`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | चर्च के लिए सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च के लिए सार्वजनिक सेटिंग्स प्राप्त करें |
| POST | `/` | JWT | Settings.Edit | सेटिंग्स सेव करें (base64 इमेज अपलोड सपोर्ट करता है) |

## Domains

बेस पथ: `/membership/domains`

मानक CRUD विस्तारित करता है (बेस क्लास से GET `/:id`, GET `/`, DELETE `/:id`)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी डोमेंस सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से डोमेन प्राप्त करें |
| GET | `/lookup/:domainName` | JWT | — | नाम से एक डोमेन देखें |
| GET | `/public/lookup/:domainName` | सार्वजनिक | — | नाम से सार्वजनिक डोमेन लुकअप |
| GET | `/health/check` | सार्वजनिक | — | बिना जांचे गए डोमेंस पर हेल्थ चेक चलाएं |
| POST | `/` | JWT | Settings.Edit | डोमेंस बनाएं या अपडेट करें (Caddy अपडेट ट्रिगर करता है) |
| DELETE | `/:id` | JWT | Settings.Edit | एक डोमेन हटाएं |

## User Church

बेस पथ: `/membership/userchurch`

यूज़र्स और चर्चेज़ के बीच एसोसिएशन को मैनेज करता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | यूज़र ID से यूज़र-चर्च रिकॉर्ड प्राप्त करें |
| GET | `/personid/:personId` | JWT | — | किसी व्यक्ति के लिंक्ड यूज़र का ईमेल प्राप्त करें |
| GET | `/user/:userId` | JWT | Server.Admin | किसी यूज़र के लिए सभी चर्चेज़ लोड करें |
| POST | `/` | JWT | — | एक यूज़र-चर्च एसोसिएशन बनाएं |
| PATCH | `/:userId` | JWT | — | अंतिम एक्सेस समय अपडेट करें और एक्सेस लॉग करें |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | एक यूज़र-चर्च रिकॉर्ड हटाएं |

## Visibility Preferences

बेस पथ: `/membership/visibilityPreferences`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान यूज़र की विज़िबिलिटी प्रेफ़रेंसेज़ प्राप्त करें |
| POST | `/` | JWT | — | विज़िबिलिटी प्रेफ़रेंसेज़ सेव करें (एड्रेस, फ़ोन, ईमेल विज़िबिलिटी) |

## Query

बेस पथ: `/membership/query`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI का उपयोग करके प्राकृतिक भाषा में मेंबर सर्च। बॉडी: `{ text, subDomain, siteUrl }` |

## Client Errors

बेस पथ: `/membership/clientErrors`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | एक क्लाइंट-साइड एरर लॉग करें |

## संबंधित पेज

- [Authentication & Permissions](./authentication) — लॉगिन फ़्लो, JWT, OAuth, परमिशन मॉडल
- [Attendance एंडपॉइंट्स](./attendance) — सर्विस और विज़िट ट्रैकिंग
- [Module Structure](../module-structure) — कोड ऑर्गनाइज़ेशन पैटर्न
