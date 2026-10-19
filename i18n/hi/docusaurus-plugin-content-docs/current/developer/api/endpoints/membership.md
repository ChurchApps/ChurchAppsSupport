---
title: "मेंबरशिप एंडपॉइंट्स"
---

# मेंबरशिप एंडपॉइंट्स

<div class="article-intro">

मेंबरशिप मॉड्यूल लोगों, चर्चों, समूहों, परिवारों, भूमिकाओं, अनुमतियों, फ़ॉर्मों और सेटिंग्स का प्रबंधन करता है। यह सबसे बड़ा मॉड्यूल है और बाकी सभी मॉड्यूल के लिए मुख्य पहचान और प्राधिकरण की परत प्रदान करता है।

</div>

**आधार पथ:** `/membership`

## लोग

आधार पथ: `/membership/people`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or Member | चर्च के सभी लोगों की सूची |
| GET | `/:id` | JWT | People.View or own record | ID से व्यक्ति प्राप्त करें (फ़ॉर्म सबमिशन सहित) |
| GET | `/ids?ids=` | JWT | People.View or Member | अल्पविराम से अलग की गई IDs से कई लोग प्राप्त करें |
| GET | `/basic?ids=` | JWT | — | कई लोगों की बुनियादी जानकारी (केवल नाम) प्राप्त करें |
| GET | `/names?ids=` | JWT | Any church permission | `[{ id, name: { display, first, last }, photo }]`, अल्पविराम से अलग की गई उन IDs के लिए जिन तक कॉलर की पहुँच है, पहले अंतिम नाम और फिर पहले नाम के अनुसार क्रमबद्ध। इससे बिना People.View वाली भूमिकाएँ (दान, उपस्थिति) लोगों के नाम दिखा सकती हैं। कोई खोज या डायरेक्टरी फ़िल्टर नहीं |
| POST | `/names` | JWT | Any church permission | `GET /names` के समान। बॉडी: `{ peopleIds }` (या `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, or People.ViewNames | हाल में जोड़े गए लोग। केवल People.ViewNames वाले कॉलर को बुनियादी मॉडल (`id`, `name.display`, `photo`, `membershipStatus`) मिलता है, और जिन लोगों ने ऑप्ट-आउट किया है उन्हें छोड़ दिया जाता है |
| GET | `/search?term=&email=` | JWT | People.View, Member, or People.ViewNames | नाम या ईमेल से लोगों की खोज करें (अधिकतम 100, अंतिम नाम और फिर पहले नाम के अनुसार क्रमबद्ध)। केवल People.ViewNames वाले कॉलर को बुनियादी मॉडल के साथ नाम खोज मिलती है; `email` खोज `[]` लौटाती है |
| GET | `/search/phone?number=` | JWT | People.View or Member | फ़ोन नंबर से खोजें |
| GET | `/search/group?groupId=` | JWT | People.View or Member | किसी विशेष समूह के लोग प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | किसी परिवार के सभी लोग प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | फ़िल्टर के साथ उपस्थित लोग लोड करें (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और समूहों के लिए टाइमलाइन डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | डायरेक्टरी दृश्य के लिए व्यक्ति प्राप्त करें (दृश्यता प्राथमिकताओं का पालन करता है) |
| GET | `/claim/:churchId` | JWT | — | किसी चर्च में वर्तमान उपयोगकर्ता के लिए व्यक्ति रिकॉर्ड का दावा करें |
| POST | `/` | JWT | People.Edit or EditSelf | लोगों को बनाएँ या अपडेट करें (बैच में) |
| POST | `/search` | JWT | People.View, Member, or People.ViewNames | लोगों की खोज (POST संस्करण)। बॉडी: `{ term }` या `{ email }`; वही केवल-नाम नियम जो `GET /search` पर लागू होते हैं |
| POST | `/advancedSearch` | JWT | People.View or Member | कई शर्तों वाली खोज (आयु, birthMonth, membershipStatus, आदि) |
| POST | `/loadOrCreate` | Public | — | ईमेल से व्यक्ति खोजें या बनाएँ। बॉडी: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | परिवार के सदस्यों की असाइनमेंट अपडेट करें |
| POST | `/public/email` | Public | — | किसी व्यक्ति को ईमेल भेजें। बॉडी: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | IDs द्वारा व्यक्तियों के ईमेल लोड करें (सर्वर-से-सर्वर, jwtSecret आवश्यक) |
| DELETE | `/:id` | JWT | People.Edit | किसी व्यक्ति को हटाएँ |

### उदाहरण: लोगों की खोज

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

### उदाहरण: एक व्यक्ति बनाएँ

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## उपयोगकर्ता {#users}

आधार पथ: `/membership/users`

लॉगिन, पंजीकरण और पासवर्ड प्रबंधन एंडपॉइंट्स के लिए देखें [प्रमाणीकरण और अनुमतियाँ](./authentication)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | लॉग इन करें (ईमेल/पासवर्ड, JWT रीफ़्रेश, या authGuid) |
| POST | `/register` | Public | — | नया उपयोगकर्ता पंजीकृत करें |
| POST | `/forgot` | Public | — | पासवर्ड रीसेट ईमेल भेजें |
| POST | `/setPasswordGuid` | Public | — | ईमेल लिंक के auth GUID से पासवर्ड सेट करें |
| POST | `/verifyCredentials` | Public | — | ईमेल/पासवर्ड सत्यापित करें और संबंधित चर्च लौटाएँ |
| POST | `/loadOrCreate` | JWT | — | ईमेल/userId द्वारा उपयोगकर्ता खोजें या बनाएँ |
| POST | `/setDisplayName` | JWT | — | उपयोगकर्ता का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | उपयोगकर्ता का ईमेल पता बदलें |
| POST | `/updatePassword` | JWT | — | उपयोगकर्ता का पासवर्ड बदलें (कम से कम 6 अक्षर) |
| POST | `/updateOptedOut` | JWT | — | किसी व्यक्ति की ऑप्ट-आउट स्थिति सेट करें |
| POST | `/sendInviteEmail` | JWT | People.Edit | इस चर्च के किसी व्यक्ति को invite ईमेल भेजें (`email`, `personName`, `contextName`)। बटन उस व्यक्ति के लिए **साइन अप** दिखाता है जिसका कोई खाता नहीं है, और मौजूदा उपयोगकर्ता के लिए **लॉग इन**। जिस उपयोगकर्ता ने कभी लॉग इन नहीं किया, उसे इसके बजाय 7 दिनों में समाप्त होने वाला **अपना पासवर्ड सेट करें** लिंक मिलता है। चर्च की दैनिक ईमेल सीमा में गिना जाता है (सीमा पूरी होने पर `429`) |
| GET | `/search?term=` | JWT | Server.Admin | नाम/ईमेल से सभी उपयोगकर्ता खोजें |
| DELETE | `/` | JWT | — | वर्तमान उपयोगकर्ता खाता हटाएँ |

## चर्च

आधार पथ: `/membership/churches`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी चर्च लोड करें |
| GET | `/:id` | JWT | — | ID से चर्च प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | किसी चर्च का डोमेन एडमिन उपयोगकर्ता प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | किसी चर्च का प्रतिरूप बनें (केवल सर्वर एडमिन) |
| GET | `/all?term=` | JWT | Server.Admin | सभी चर्च खोजें (एडमिन) |
| GET | `/search/?name=` | Public | — | नाम से चर्च खोजें |
| GET | `/lookup/?subDomain=&id=` | Public | — | सबडोमेन या ID से चर्च खोजें |
| POST | `/` | JWT | Settings.Edit | चर्च का विवरण अपडेट करें |
| POST | `/add` | JWT | — | नया चर्च पंजीकृत करें। आवश्यक फ़ील्ड: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | नाम से चर्च खोजें (POST संस्करण) |
| POST | `/select` | JWT | — | चर्च चुनें/बदलें। बॉडी: `{ churchId }` या `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | चर्च को संग्रहीत या असंग्रहीत करें |
| POST | `/byIds` | Public | — | IDs द्वारा कई चर्च लोड करें |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7 या अधिक दिनों से छोड़े गए चर्च हटाएँ |

## समूह

आधार पथ: `/membership/groups`

बेस क्लास से मानक CRUD का विस्तार करता है (GET `/`, GET `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूहों की सूची |
| GET | `/:id` | JWT | — | ID से समूह प्राप्त करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | सेवा फ़िल्टर से समूह खोजें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के समूह प्राप्त करें |
| GET | `/my/:tag` | JWT | — | वर्तमान उपयोगकर्ता के समूह, टैग के अनुसार फ़िल्टर करके प्राप्त करें |
| GET | `/tag/:tag` | JWT | — | किसी विशेष टैग वाले सभी समूह प्राप्त करें |
| GET | `/public/:churchId/:id` | Public | — | चर्च और ID से सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/tag/:tag` | Public | — | टैग से सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/label?label=` | Public | — | लेबल से सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug से सार्वजनिक समूह प्राप्त करें |
| POST | `/` | JWT | Groups.Edit | समूह बनाएँ या अपडेट करें (स्वतः slug बनाता है) |
| DELETE | `/:id` | JWT | Groups.Edit | समूह हटाएँ (मिनिस्ट्री समूहों के चाइल्ड टीम भी हटाता है) |

## समूह के सदस्य

आधार पथ: `/membership/groupmembers`

बेस क्लास से मानक CRUD का विस्तार करता है (GET `/:id`, DELETE `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID से समूह सदस्य प्राप्त करें |
| GET | `/` | JWT | GroupMembers.View* | समूह सदस्यों की सूची। `?groupId=`, `?groupIds=`, या `?personId=` से फ़िल्टर करें। *यदि उपयोगकर्ता समूह में है या अपना personId पूछ रहा है तो भी अनुमति है |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की समूह सदस्यताएँ प्राप्त करें |
| GET | `/basic/:groupId` | JWT | — | किसी समूह की बुनियादी सदस्य सूची प्राप्त करें |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | समूह के नेता प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:groupId` | Public | — | समूह की सार्वजनिक रोस्टर प्राप्त करें (न्यूनतम फ़ील्ड: `personId`, `displayName`, `leader`, फ़ोटो)। केवल तभी जब समूह `publicRoster` के माध्यम से सहमति दे; वेबसाइट बिल्डर के `staffGrid` एलिमेंट को शक्ति देता है |
| POST | `/` | JWT | GroupMembers.Edit | समूह सदस्य जोड़ें या अपडेट करें |
| DELETE | `/:id` | JWT | GroupMembers.View | समूह सदस्य हटाएँ |

## परिवार

आधार पथ: `/membership/households`

मानक CRUD कंट्रोलर।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी परिवारों की सूची |
| GET | `/:id` | JWT | — | ID से परिवार प्राप्त करें |
| POST | `/` | JWT | People.Edit | परिवार बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | People.Edit | परिवार हटाएँ |

## भूमिकाएँ

आधार पथ: `/membership/roles`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID से भूमिका प्राप्त करें |
| GET | `/church/:churchId` | JWT | Roles.View | किसी चर्च की सभी भूमिकाएँ प्राप्त करें |
| POST | `/` | JWT | Roles.Edit | भूमिकाएँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका हटाएँ (उसकी अनुमतियाँ और सदस्य भी हटाता है) |

## भूमिका सदस्य

आधार पथ: `/membership/rolemembers`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी भूमिका के सदस्य प्राप्त करें। उपयोगकर्ता विवरण शामिल करने के लिए `?include=users` जोड़ें |
| POST | `/` | JWT | Roles.Edit | भूमिका में सदस्य जोड़ें (यदि ईमेल मौजूद नहीं है तो उपयोगकर्ता बनाता है) |
| DELETE | `/:id` | JWT | Roles.View | भूमिका सदस्य हटाएँ |
| DELETE | `/self/:churchId/:userId` | JWT | — | स्वयं को चर्च से हटाएँ |

## भूमिका अनुमतियाँ

आधार पथ: `/membership/rolepermissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी भूमिका की अनुमतियाँ प्राप्त करें ("Everyone" भूमिका के लिए ID के स्थान पर `null` का उपयोग करें) |
| POST | `/` | JWT | Roles.Edit | भूमिका अनुमतियाँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका अनुमति हटाएँ |

## अनुमतियाँ

आधार पथ: `/membership/permissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | उपलब्ध अनुमतियों की पूरी सूची प्राप्त करें |

हर प्रविष्टि में `apiName`, `section` (सामग्री का प्रकार), `action`, और `displaySection` / `displayAction` लेबल होते हैं, जिन्हें B1Admin का भूमिका संपादक दिखाता है। हाल की जोड़ें: `MembershipApi` / `People` / `View Names` (**View People Names Only**, People और Groups के अंतर्गत) और `GivingApi` / `Donations` / `Enter` (**Enter Donations**, Donations के अंतर्गत; देखें [दान बैच](./giving.md#donation-batches))।

## फ़ॉर्म

आधार पथ: `/membership/forms`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | सभी फ़ॉर्म की सूची (एडमिन सभी देखता है; संपादक असाइन किए गए + गैर-सदस्य फ़ॉर्म देखते हैं) |
| GET | `/:id` | JWT | Form access | ID से फ़ॉर्म प्राप्त करें |
| GET | `/archived` | JWT | Forms.Admin or Forms.Edit | संग्रहीत फ़ॉर्म की सूची |
| GET | `/standalone/:id?churchId=` | JWT | — | स्वतंत्र फ़ॉर्म प्राप्त करें (प्रतिबंधित फ़ॉर्म के लिए प्रमाणीकरण आवश्यक) |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | फ़ॉर्म बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Form access | फ़ॉर्म हटाएँ |

## फ़ॉर्म सबमिशन

आधार पथ: `/membership/formsubmissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | सबमिशन की सूची। `?personId=` या `?formId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Forms.Admin or Forms.Edit | ID से सबमिशन प्राप्त करें। `?include=form,questions,answers` जोड़ें |
| GET | `/formId/:formId` | JWT | Form access | किसी फ़ॉर्म के सभी सबमिशन प्राप्त करें (फ़ॉर्म, प्रश्न, उत्तर शामिल) |
| POST | `/` | JWT | — | फ़ॉर्म के उत्तर सबमिट करें (प्रतिबंधित/अप्रतिबंधित फ़ॉर्म संभालता है, ईमेल सूचनाएँ भेजता है)। जब फ़ॉर्म में `autoCreatePerson` हो, तो ईमेल से Guest व्यक्ति खोजता या बनाता है और सबमिशन से जोड़ता है; जब `followUpSubject`/`followUpBody` सेट हों, तो सबमिट करने वाले को टेम्पलेट वाला फ़ॉलो-अप ईमेल भेजता है |
| DELETE | `/:id` | JWT | Forms.Admin or Forms.Edit | सबमिशन और उसके उत्तर हटाएँ |

## प्रश्न

आधार पथ: `/membership/questions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | किसी फ़ॉर्म के प्रश्नों की सूची। `?formId=` आवश्यक |
| GET | `/:id` | JWT | Form access | ID से प्रश्न प्राप्त करें |
| GET | `/unrestricted?formId=` | JWT | — | अप्रतिबंधित फ़ॉर्म के प्रश्न प्राप्त करें |
| GET | `/sort/:id/up` | JWT | — | प्रश्न को क्रम में ऊपर ले जाएँ |
| GET | `/sort/:id/down` | JWT | — | प्रश्न को क्रम में नीचे ले जाएँ |
| POST | `/` | JWT | Form access | प्रश्न बनाएँ या अपडेट करें (क्रम स्वतः निर्धारित होता है) |
| DELETE | `/:id?formId=` | JWT | Form access | प्रश्न हटाएँ |

## उत्तर

आधार पथ: `/membership/answers`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | उत्तरों की सूची। `?formSubmissionId=` से फ़िल्टर करें |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | उत्तर बनाएँ या अपडेट करें |

## सदस्य अनुमतियाँ

आधार पथ: `/membership/memberpermissions`

यह हर सदस्य की विशिष्ट फ़ॉर्म तक पहुँच नियंत्रित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | ID से सदस्य अनुमति प्राप्त करें |
| GET | `/member/:id` | JWT | Form access | किसी सदस्य की सभी फ़ॉर्म अनुमतियाँ प्राप्त करें |
| GET | `/form/:id` | JWT | Form access | किसी फ़ॉर्म की सभी सदस्य अनुमतियाँ प्राप्त करें |
| GET | `/form/:id/my` | JWT | Form access | किसी फ़ॉर्म के लिए वर्तमान उपयोगकर्ता की अनुमति प्राप्त करें |
| POST | `/` | JWT | Form access | सदस्य अनुमतियाँ बनाएँ या अपडेट करें |
| DELETE | `/:id?formId=` | JWT | Form access | सदस्य अनुमति हटाएँ |
| DELETE | `/member/:id?formId=` | JWT | Form access | किसी फ़ॉर्म पर किसी सदस्य की सभी अनुमतियाँ हटाएँ |

## सेटिंग्स

आधार पथ: `/membership/settings`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च की सार्वजनिक सेटिंग्स प्राप्त करें |
| POST | `/` | JWT | Settings.Edit | सेटिंग्स सहेजें (base64 इमेज अपलोड समर्थित) |

## डोमेन

आधार पथ: `/membership/domains`

बेस क्लास से मानक CRUD का विस्तार करता है (GET `/:id`, GET `/`, DELETE `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी डोमेन की सूची |
| GET | `/:id` | JWT | — | ID से डोमेन प्राप्त करें |
| GET | `/lookup/:domainName` | JWT | — | नाम से डोमेन खोजें |
| GET | `/public/lookup/:domainName` | Public | — | नाम से सार्वजनिक डोमेन खोज |
| GET | `/health/check` | Public | — | जाँचे न गए डोमेन पर हेल्थ चेक चलाएँ |
| POST | `/` | JWT | Settings.Edit | डोमेन बनाएँ या अपडेट करें (Caddy अपडेट शुरू करता है) |
| DELETE | `/:id` | JWT | Settings.Edit | डोमेन हटाएँ |

## उपयोगकर्ता-चर्च

आधार पथ: `/membership/userchurch`

उपयोगकर्ताओं और चर्चों के बीच संबंध का प्रबंधन करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | userId से उपयोगकर्ता-चर्च रिकॉर्ड प्राप्त करें |
| GET | `/personid/:personId` | JWT | — | किसी व्यक्ति के जुड़े उपयोगकर्ता का ईमेल प्राप्त करें |
| GET | `/user/:userId` | JWT | Server.Admin | किसी उपयोगकर्ता के सभी चर्च लोड करें |
| POST | `/` | JWT | — | उपयोगकर्ता-चर्च संबंध बनाएँ |
| PATCH | `/:userId` | JWT | — | अंतिम पहुँच समय अपडेट करें और पहुँच दर्ज करें |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | उपयोगकर्ता-चर्च रिकॉर्ड हटाएँ |

## दृश्यता प्राथमिकताएँ

आधार पथ: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की दृश्यता प्राथमिकताएँ प्राप्त करें |
| POST | `/` | JWT | — | दृश्यता प्राथमिकताएँ सहेजें (पता, फ़ोन, ईमेल की दृश्यता) |

## क्वेरी

आधार पथ: `/membership/query`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI का उपयोग करके प्राकृतिक भाषा में सदस्य खोज। बॉडी: `{ text, subDomain, siteUrl }` |

## क्लाइंट त्रुटियाँ

आधार पथ: `/membership/clientErrors`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | क्लाइंट-साइड त्रुटि दर्ज करें |

## संबंधित पृष्ठ

- [प्रमाणीकरण और अनुमतियाँ](./authentication) — लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [उपस्थिति एंडपॉइंट्स](./attendance) — सेवा और विज़िट ट्रैकिंग
- [मॉड्यूल संरचना](../module-structure) — कोड संगठन के पैटर्न
