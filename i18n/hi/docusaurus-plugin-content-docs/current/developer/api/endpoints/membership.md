---
title: "मेंबरशिप एंडपॉइंट"
---

# मेंबरशिप एंडपॉइंट {#membership-endpoints}

<div class="article-intro">

Membership मॉड्यूल लोग, चर्च, समूह, परिवार, भूमिकाएं, अनुमतियां, फ़ॉर्म और सेटिंग्स का प्रबंधन करता है। यह सबसे बड़ा मॉड्यूल है और बाकी सभी मॉड्यूल के लिए मुख्य पहचान और अधिकार-प्रबंधन की परत प्रदान करता है।

</div>

**बेस पथ:** `/membership`

## लोग {#people}

बेस पथ: `/membership/people`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View या Member | चर्च के सभी लोग सूचीबद्ध करें |
| GET | `/:id` | JWT | People.View या स्वयं का रिकॉर्ड | ID द्वारा व्यक्ति प्राप्त करें (फ़ॉर्म सबमिशन सहित) |
| GET | `/ids?ids=` | JWT | People.View, Member, या People.ViewNames | अल्पविराम से अलग ID द्वारा कई लोग प्राप्त करें। People.ViewNames वाले कॉलर (बिना People.View के) को बुनियादी मॉडल मिलता है, और opt-out किए गए लोग बाहर रहते हैं (कॉलर को छोड़कर) |
| GET | `/basic?ids=` | JWT | — | कई लोगों की बुनियादी जानकारी (केवल नाम) प्राप्त करें |
| GET | `/names?ids=` | JWT | कोई भी चर्च अनुमति | `[{ id, name: { display, first, last }, photo }]`, अंतिम नाम और फिर पहले नाम के अनुसार क्रमबद्ध, अल्पविराम से अलग उन ids के लिए जो कॉलर के पास पहले से हैं, ताकि बिना People.View वाली भूमिकाएं (दान, उपस्थिति) लोगों को लेबल कर सकें। कोई खोज नहीं, कोई डायरेक्टरी फ़िल्टर नहीं |
| POST | `/names` | JWT | कोई भी चर्च अनुमति | `GET /names` के समान। Body: `{ peopleIds }` (या `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, या People.ViewNames | हाल ही में जोड़े गए लोग। People.ViewNames वाले कॉलर (बिना People.View के, यहां तक कि डायरेक्टरी एक्सेस वाले सदस्य भी) को बुनियादी मॉडल (`id`, `name.display`, `photo`, `membershipStatus`) मिलता है, और opt-out किए गए लोग बाहर रहते हैं |
| GET | `/search?term=&email=` | JWT | People.View, Member, या People.ViewNames | नाम या ईमेल से लोग खोजें (अधिकतम 100, अंतिम नाम और फिर पहले नाम के अनुसार क्रमबद्ध)। People.ViewNames वाले कॉलर (बिना People.View के, यहां तक कि डायरेक्टरी एक्सेस वाले सदस्य भी) को नाम खोज पर बुनियादी मॉडल मिलता है; `email` खोज `[]` लौटाती है |
| GET | `/search/phone?number=` | JWT | People.View या Member | फ़ोन नंबर से खोजें |
| GET | `/search/group?groupId=` | JWT | People.View या Member | किसी विशिष्ट समूह के लोग प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | किसी परिवार के सभी लोग प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | फ़िल्टर (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) के साथ उपस्थित लोग लोड करें |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और समूहों के लिए टाइमलाइन डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | डायरेक्टरी व्यू के लिए व्यक्ति प्राप्त करें (दृश्यता प्राथमिकताओं का पालन करता है) |
| GET | `/claim/:churchId` | JWT | — | किसी चर्च में वर्तमान उपयोगकर्ता के लिए व्यक्ति रिकॉर्ड दावा करें |
| POST | `/` | JWT | People.Edit या EditSelf | लोग बनाएं या अपडेट करें (बैच) |
| POST | `/search` | JWT | People.View, Member, या People.ViewNames | लोग खोजें (POST संस्करण)। Body: `{ term }` या `{ email }`; `GET /search` वाले नाम-आधारित नियम ही लागू |
| POST | `/advancedSearch` | JWT | People.View या Member | कई शर्तों वाली खोज (आयु, birthMonth, membershipStatus आदि) |
| POST | `/loadOrCreate` | सार्वजनिक | — | ईमेल से व्यक्ति खोजें या बनाएं। Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | परिवार के सदस्यों के असाइनमेंट अपडेट करें |
| POST | `/public/email` | सार्वजनिक | — | किसी व्यक्ति को ईमेल भेजें। Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | आंतरिक | — | ID द्वारा लोगों के ईमेल लोड करें (सर्वर-से-सर्वर, jwtSecret आवश्यक) |
| DELETE | `/:id` | JWT | People.Edit | व्यक्ति हटाएं |

### उदाहरण: लोग खोजना

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

### उदाहरण: व्यक्ति बनाना

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## उपयोगकर्ता {#users}

बेस पथ: `/membership/users`

लॉगिन, पंजीकरण और पासवर्ड प्रबंधन एंडपॉइंट के लिए देखें [प्रमाणीकरण और अनुमतियां](./authentication)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/login` | सार्वजनिक | — | लॉग इन करें (ईमेल/पासवर्ड, JWT रिफ़्रेश, या authGuid) |
| POST | `/register` | सार्वजनिक | — | नया उपयोगकर्ता पंजीकृत करें |
| POST | `/forgot` | सार्वजनिक | — | पासवर्ड रीसेट ईमेल भेजें |
| POST | `/setPasswordGuid` | सार्वजनिक | — | ईमेल लिंक के auth GUID से पासवर्ड सेट करें |
| POST | `/verifyCredentials` | सार्वजनिक | — | ईमेल/पासवर्ड सत्यापित करें और संबंधित चर्च लौटाएं |
| POST | `/loadOrCreate` | JWT | — | ईमेल/userId से उपयोगकर्ता खोजें या बनाएं |
| POST | `/setDisplayName` | JWT | — | उपयोगकर्ता का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | उपयोगकर्ता का ईमेल पता बदलें |
| POST | `/updatePassword` | JWT | — | उपयोगकर्ता का पासवर्ड बदलें (न्यूनतम 6 अक्षर) |
| POST | `/updateOptedOut` | JWT | — | किसी व्यक्ति की opted-out स्थिति सेट करें |
| POST | `/sendInviteEmail` | JWT | People.Edit | इस चर्च के किसी व्यक्ति को आमंत्रण ईमेल भेजें (`email`, `personName`, `contextName`)। बटन पर किसी ऐसे व्यक्ति के लिए **साइन अप** लिखा होता है जिसका खाता नहीं है, और मौजूदा उपयोगकर्ता के लिए **लॉग इन**। जिस उपयोगकर्ता ने कभी लॉग इन नहीं किया, उसे 7 दिन में समाप्त होने वाला **अपना पासवर्ड सेट करें** लिंक मिलता है। यह एक निश्चित टेम्पलेट है, इसलिए चर्च की दैनिक ईमेल सीमा में नहीं गिना जाता |
| GET | `/search?term=` | JWT | Server.Admin | नाम/ईमेल से सभी उपयोगकर्ता खोजें |
| DELETE | `/` | JWT | — | वर्तमान उपयोगकर्ता खाता हटाएं |

## चर्च {#churches}

बेस पथ: `/membership/churches`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी चर्च लोड करें |
| GET | `/:id` | JWT | — | ID द्वारा चर्च प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | किसी चर्च का डोमेन एडमिन उपयोगकर्ता प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | किसी चर्च का इम्पर्सोनेशन करें (केवल सर्वर एडमिन) |
| GET | `/all?term=` | JWT | Server.Admin | सभी चर्च खोजें (एडमिन) |
| GET | `/search/?name=` | सार्वजनिक | — | नाम से चर्च खोजें |
| GET | `/lookup/?subDomain=&id=` | सार्वजनिक | — | सबडोमेन या ID से चर्च खोजें |
| POST | `/` | JWT | Settings.Edit | चर्च का विवरण अपडेट करें |
| POST | `/add` | JWT | — | नया चर्च पंजीकृत करें। आवश्यक फ़ील्ड: name, address1, city, state, zip, country |
| POST | `/search` | सार्वजनिक | — | नाम से चर्च खोजें (POST संस्करण) |
| POST | `/select` | JWT | — | चर्च चुनें/उस पर स्विच करें। Body: `{ churchId }` या `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | चर्च को आर्काइव या अन-आर्काइव करें |
| POST | `/byIds` | सार्वजनिक | — | IDs द्वारा कई चर्च लोड करें |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7 या अधिक दिनों से छोड़े गए चर्च हटाएं |

## समूह {#groups}

बेस पथ: `/membership/groups`

बेस क्लास से मानक CRUD (GET `/`, GET `/:id`) का विस्तार।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूह सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा समूह प्राप्त करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | सेवा फ़िल्टर द्वारा समूह खोजें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के समूह प्राप्त करें |
| GET | `/my/:tag` | JWT | — | टैग द्वारा फ़िल्टर किए गए वर्तमान उपयोगकर्ता के समूह प्राप्त करें |
| GET | `/tag/:tag` | JWT | — | किसी विशिष्ट टैग वाले सभी समूह प्राप्त करें |
| GET | `/public/:churchId/:id` | सार्वजनिक | — | चर्च और ID द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/tag/:tag` | सार्वजनिक | — | टैग द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/label?label=` | सार्वजनिक | — | लेबल द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/slug/:slug` | सार्वजनिक | — | slug द्वारा सार्वजनिक समूह प्राप्त करें |
| POST | `/` | JWT | Groups.Edit | समूह बनाएं या अपडेट करें (स्वतः slug बनाता है) |
| DELETE | `/:id` | JWT | Groups.Edit | समूह हटाएं (मिनिस्ट्री समूहों की चाइल्ड टीमें भी हटाता है) |

## समूह सदस्य {#group-members}

बेस पथ: `/membership/groupmembers`

बेस क्लास से मानक CRUD (GET `/:id`, DELETE `/:id`) का विस्तार।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID द्वारा समूह सदस्य प्राप्त करें |
| GET | `/` | JWT | GroupMembers.View* | समूह सदस्य सूचीबद्ध करें। `?groupId=`, `?groupIds=`, या `?personId=` से फ़िल्टर करें। *जो उपयोगकर्ता समूह में है या अपना personId पूछ रहा है, उसे भी अनुमति है; और Attendance.View या Attendance.Edit होने पर किसी भी गैर-गोपनीय समूह के `?groupId=` के लिए भी (उनके लिए 13 वर्ष से कम आयु के सदस्य शामिल होते हैं) |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की समूह सदस्यताएं प्राप्त करें |
| GET | `/basic/:groupId` | JWT | — | किसी समूह की बुनियादी सदस्य सूची प्राप्त करें |
| GET | `/public/leaders/:churchId/:groupId` | सार्वजनिक | — | समूह के लीडर प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:groupId` | सार्वजनिक | — | किसी समूह की सार्वजनिक रोस्टर प्राप्त करें (न्यूनतम फ़ील्ड: `personId`, `displayName`, `leader`, photo)। केवल तब जब समूह `publicRoster` के माध्यम से सहमति दे; वेबसाइट बिल्डर के `staffGrid` एलिमेंट को शक्ति देता है |
| POST | `/` | JWT | GroupMembers.Edit | समूह सदस्य जोड़ें या अपडेट करें |
| DELETE | `/:id` | JWT | GroupMembers.View | समूह सदस्य हटाएं |

## परिवार {#households}

बेस पथ: `/membership/households`

मानक CRUD कंट्रोलर।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी परिवार सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा परिवार प्राप्त करें |
| POST | `/` | JWT | People.Edit | परिवार बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | People.Edit | परिवार हटाएं |

## भूमिकाएं {#roles}

बेस पथ: `/membership/roles`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID द्वारा भूमिका प्राप्त करें |
| GET | `/church/:churchId` | JWT | Roles.View | किसी चर्च की सभी भूमिकाएं प्राप्त करें |
| POST | `/` | JWT | Roles.Edit | भूमिकाएं बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका हटाएं (उसकी अनुमतियां और सदस्य भी हटाता है) |

## भूमिका सदस्य {#role-members}

बेस पथ: `/membership/rolemembers`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी भूमिका के सदस्य प्राप्त करें। उपयोगकर्ता विवरण शामिल करने के लिए `?include=users` जोड़ें |
| POST | `/` | JWT | Roles.Edit | भूमिका में सदस्य जोड़ें (ईमेल मौजूद न होने पर उपयोगकर्ता बनाता है) |
| DELETE | `/:id` | JWT | Roles.View | भूमिका सदस्य हटाएं |
| DELETE | `/self/:churchId/:userId` | JWT | — | स्वयं को किसी चर्च से हटाएं |

## भूमिका अनुमतियां {#role-permissions}

बेस पथ: `/membership/rolepermissions`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी भूमिका की अनुमतियां प्राप्त करें ("Everyone" भूमिका के लिए ID के रूप में `null` उपयोग करें) |
| POST | `/` | JWT | Roles.Edit | भूमिका अनुमतियां बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका अनुमति हटाएं |

## अनुमतियां {#permissions}

बेस पथ: `/membership/permissions`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | उपलब्ध अनुमतियों की पूरी सूची प्राप्त करें |

हर प्रविष्टि में `apiName`, `section` (कंटेंट प्रकार), `action`, और `displaySection` / `displayAction` लेबल होते हैं, जो B1Admin के भूमिका संपादक में दिखते हैं। हाल की नई जोड़ें: `MembershipApi` / `People` / `View Names` (**View People Names Only**, People and Groups के अंतर्गत) और `GivingApi` / `Donations` / `Enter` (**Enter Donations**, Donations के अंतर्गत; देखें [दान बैच](./giving.md#donation-batches))।

## फ़ॉर्म {#forms}

बेस पथ: `/membership/forms`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सभी फ़ॉर्म सूचीबद्ध करें (एडमिन सभी देखता है; एडिटर को असाइन किए गए और गैर-सदस्य फ़ॉर्म दिखते हैं) |
| GET | `/:id` | JWT | फ़ॉर्म एक्सेस | ID द्वारा फ़ॉर्म प्राप्त करें |
| GET | `/archived` | JWT | Forms.Admin या Forms.Edit | आर्काइव किए गए फ़ॉर्म सूचीबद्ध करें |
| GET | `/standalone/:id?churchId=` | JWT | — | स्टैंडअलोन फ़ॉर्म प्राप्त करें (प्रतिबंधित फ़ॉर्म के लिए प्रमाणीकरण आवश्यक) |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | फ़ॉर्म बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | फ़ॉर्म एक्सेस | फ़ॉर्म हटाएं |

## फ़ॉर्म सबमिशन {#form-submissions}

बेस पथ: `/membership/formsubmissions`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सबमिशन सूचीबद्ध करें। `?personId=` या `?formId=` से फ़िल्टर करें |
| GET | `/my?include=questions,answers` | JWT | — | स्वयं-सीमित: साइन इन किए गए सदस्य द्वारा सबमिट किए गए अधिकतम 50 स्टैंडअलोन फ़ॉर्म सबमिशन (व्यक्ति फ़ॉर्म नहीं), सबसे नए पहले, प्रत्येक के साथ `form.name`। `include` प्रत्येक फ़ॉर्म के प्रश्न और सबमिशन के उत्तर जोड़ता है। उपयोगकर्ता किसी व्यक्ति से जुड़ा न होने पर `401` लौटाता है। B1 Me पेज के **मेरे फ़ॉर्म** सेक्शन को शक्ति देता है |
| GET | `/:id` | JWT | Forms.Admin या Forms.Edit | ID द्वारा सबमिशन प्राप्त करें। `?include=form,questions,answers` जोड़ें |
| GET | `/formId/:formId` | JWT | फ़ॉर्म एक्सेस | किसी फ़ॉर्म के सभी सबमिशन प्राप्त करें (फ़ॉर्म, प्रश्न, उत्तर शामिल) |
| POST | `/` | JWT | — | फ़ॉर्म के उत्तर सबमिट करें (प्रतिबंधित/अप्रतिबंधित फ़ॉर्म संभालता है, ईमेल सूचनाएं भेजता है)। जब फ़ॉर्म में `autoCreatePerson` हो, तो ईमेल से Guest व्यक्ति खोजता या बनाता है और सबमिशन से जोड़ता है; जब `followUpSubject`/`followUpBody` सेट हों, तो सबमिट करने वाले को टेम्पलेट वाला फ़ॉलो-अप ईमेल भेजता है। जब तक कॉलर फ़ॉर्म प्रबंधित न कर सके, `submittedBy` हमेशा साइन इन किए सदस्य के व्यक्ति पर सेट होता है (या अनाम सबमिशन के लिए खाली) |
| DELETE | `/:id` | JWT | Forms.Admin या Forms.Edit | सबमिशन और उसके उत्तर हटाएं |

## प्रश्न {#questions}

बेस पथ: `/membership/questions`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | फ़ॉर्म एक्सेस | किसी फ़ॉर्म के प्रश्न सूचीबद्ध करें। `?formId=` आवश्यक है |
| GET | `/:id` | JWT | फ़ॉर्म एक्सेस | ID द्वारा प्रश्न प्राप्त करें |
| GET | `/unrestricted?formId=` | JWT | — | अप्रतिबंधित फ़ॉर्म के प्रश्न प्राप्त करें |
| GET | `/sort/:id/up` | JWT | — | प्रश्न को क्रम में ऊपर ले जाएं |
| GET | `/sort/:id/down` | JWT | — | प्रश्न को क्रम में नीचे ले जाएं |
| POST | `/` | JWT | फ़ॉर्म एक्सेस | प्रश्न बनाएं या अपडेट करें (क्रम स्वतः असाइन होता है) |
| DELETE | `/:id?formId=` | JWT | फ़ॉर्म एक्सेस | प्रश्न हटाएं |

## उत्तर {#answers}

बेस पथ: `/membership/answers`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर सूचीबद्ध करें। `?formSubmissionId=` से फ़िल्टर करें |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर बनाएं या अपडेट करें |

## सदस्य अनुमतियां {#member-permissions}

बेस पथ: `/membership/memberpermissions`

प्रति सदस्य विशिष्ट फ़ॉर्म तक एक्सेस को नियंत्रित करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | फ़ॉर्म एक्सेस | ID द्वारा सदस्य अनुमति प्राप्त करें |
| GET | `/member/:id` | JWT | फ़ॉर्म एक्सेस | किसी सदस्य की सभी फ़ॉर्म अनुमतियां प्राप्त करें |
| GET | `/form/:id` | JWT | फ़ॉर्म एक्सेस | किसी फ़ॉर्म की सभी सदस्य अनुमतियां प्राप्त करें |
| GET | `/form/:id/my` | JWT | फ़ॉर्म एक्सेस | किसी फ़ॉर्म के लिए वर्तमान उपयोगकर्ता की अनुमति प्राप्त करें |
| POST | `/` | JWT | फ़ॉर्म एक्सेस | सदस्य अनुमतियां बनाएं या अपडेट करें |
| DELETE | `/:id?formId=` | JWT | फ़ॉर्म एक्सेस | सदस्य अनुमति हटाएं |
| DELETE | `/member/:id?formId=` | JWT | फ़ॉर्म एक्सेस | किसी फ़ॉर्म पर किसी सदस्य की सभी अनुमतियां हटाएं |

## सेटिंग्स {#settings}

बेस पथ: `/membership/settings`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च की सार्वजनिक सेटिंग्स प्राप्त करें |
| POST | `/` | JWT | Settings.Edit | सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |

## डोमेन {#domains}

बेस पथ: `/membership/domains`

बेस क्लास से मानक CRUD (GET `/:id`, GET `/`, DELETE `/:id`) का विस्तार।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी डोमेन सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा डोमेन प्राप्त करें |
| GET | `/lookup/:domainName` | JWT | — | नाम से डोमेन खोजें |
| GET | `/public/lookup/:domainName` | सार्वजनिक | — | नाम से सार्वजनिक डोमेन खोज |
| GET | `/health/check` | सार्वजनिक | — | बिना जांचे डोमेन पर हेल्थ चेक चलाएं |
| POST | `/` | JWT | Settings.Edit | डोमेन बनाएं या अपडेट करें (Caddy अपडेट शुरू करता है) |
| DELETE | `/:id` | JWT | Settings.Edit | डोमेन हटाएं |

## उपयोगकर्ता-चर्च {#user-church}

बेस पथ: `/membership/userchurch`

उपयोगकर्ताओं और चर्चों के बीच संबंध का प्रबंधन करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | userId द्वारा उपयोगकर्ता-चर्च रिकॉर्ड प्राप्त करें |
| GET | `/personid/:personId` | JWT | — | किसी व्यक्ति से जुड़े उपयोगकर्ता का ईमेल प्राप्त करें |
| GET | `/user/:userId` | JWT | Server.Admin | किसी उपयोगकर्ता के सभी चर्च लोड करें |
| POST | `/` | JWT | — | उपयोगकर्ता-चर्च संबंध बनाएं |
| PATCH | `/:userId` | JWT | — | अंतिम एक्सेस समय अपडेट करें और एक्सेस लॉग करें |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | उपयोगकर्ता-चर्च रिकॉर्ड हटाएं |

## दृश्यता प्राथमिकताएं {#visibility-preferences}

बेस पथ: `/membership/visibilityPreferences`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की दृश्यता प्राथमिकताएं प्राप्त करें |
| POST | `/` | JWT | — | दृश्यता प्राथमिकताएं सहेजें (पता, फ़ोन, ईमेल दृश्यता) |

## क्वेरी {#query}

बेस पथ: `/membership/query`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI का उपयोग करके प्राकृतिक भाषा में सदस्य खोज। Body: `{ text, subDomain, siteUrl }` |

## क्लाइंट त्रुटियां {#client-errors}

बेस पथ: `/membership/clientErrors`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | क्लाइंट-साइड त्रुटि लॉग करें |

## संबंधित पेज {#related-pages}

- [प्रमाणीकरण और अनुमतियां](./authentication) — लॉगिन फ़्लो, JWT, OAuth, अनुमति मॉडल
- [उपस्थिति एंडपॉइंट](./attendance) — सेवा और विज़िट ट्रैकिंग
- [मॉड्यूल संरचना](../module-structure) — कोड संगठन पैटर्न
