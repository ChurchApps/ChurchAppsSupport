---
title: "Membership Endpoints"
---

# Membership Endpoints

<div class="article-intro">

Membership मॉड्यूल लोग, चर्च, समूह, परिवार (households), भूमिकाएँ, अनुमतियाँ, फ़ॉर्म और सेटिंग्स प्रबंधित करता है। यह सबसे बड़ा मॉड्यूल है और अन्य सभी मॉड्यूल के लिए मुख्य पहचान और प्राधिकरण परत प्रदान करता है।

</div>

**Base path:** `/membership`

## लोग (People)

Base path: `/membership/people`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | People.View या Member | चर्च के सभी लोग सूचीबद्ध करें |
| GET | `/:id` | JWT | People.View या स्वयं का रिकॉर्ड | ID से व्यक्ति प्राप्त करें (फ़ॉर्म प्रस्तुतियाँ शामिल) |
| GET | `/ids?ids=` | JWT | People.View, Member, या People.ViewNames | अल्पविराम से अलग IDs द्वारा कई लोग प्राप्त करें। बिना People.View वाले People.ViewNames कॉलर को बुनियादी मॉडल मिलता है, जिसमें opted-out लोग छोड़ दिए जाते हैं (कॉलर को छोड़कर) |
| GET | `/basic?ids=` | JWT | — | कई लोगों की बुनियादी जानकारी (केवल नाम) प्राप्त करें |
| GET | `/names?ids=` | JWT | कोई भी चर्च अनुमति | `[{ id, name: { display, first, last }, photo }]`, अंतिम नाम फिर पहले नाम के अनुसार क्रमबद्ध, कॉलर के पास पहले से मौजूद अल्पविराम से अलग ids के लिए, ताकि बिना People.View वाली भूमिकाएँ (दान, उपस्थिति) लोगों को लेबल कर सकें। कोई खोज नहीं, कोई डायरेक्टरी फ़िल्टर नहीं |
| POST | `/names` | JWT | कोई भी चर्च अनुमति | `GET /names` जैसा ही। बॉडी: `{ peopleIds }` (या `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, या People.ViewNames | हाल ही में जोड़े गए लोग। बिना People.View वाले People.ViewNames कॉलर (डायरेक्टरी पहुँच वाले सदस्य भी) को बुनियादी मॉडल (`id`, `name.display`, `photo`, `membershipStatus`) मिलता है, जिसमें opted-out लोग छोड़ दिए जाते हैं |
| GET | `/guest-register/options?churchId=` | Public | — | QR अतिथि साइन-अप चेकलिस्ट: `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }` लौटाता है, प्रत्येक `"off"`, `"optional"`, या `"required"` (सार्वजनिक `guestRegistrationFields` सेटिंग से पार्स किया गया; गायब या गलत मान email/phone को वैकल्पिक और बाकी को off पर लौटाते हैं)। मिलान करने वाले site/church टोकन के बिना `enableQRGuestRegistration` आवश्यक है; दर-सीमित (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, या People.ViewNames | नाम या ईमेल से लोगों को खोजें (अधिकतम 100, अंतिम नाम फिर पहले नाम के अनुसार क्रमबद्ध)। बिना People.View वाले People.ViewNames कॉलर (डायरेक्टरी पहुँच वाले सदस्य भी) को बुनियादी मॉडल लौटाने वाली नाम खोज मिलती है; `email` खोज `[]` लौटाती है |
| GET | `/search/phone?number=` | JWT | People.View या Member | फ़ोन नंबर से खोजें |
| GET | `/search/group?groupId=` | JWT | People.View या Member | किसी विशिष्ट समूह के लोग प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | किसी परिवार (household) के सभी लोग प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | फ़िल्टर के साथ उपस्थित लोग लोड करें (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और समूहों के लिए टाइमलाइन डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | डायरेक्टरी दृश्य के लिए व्यक्ति प्राप्त करें (दृश्यता प्राथमिकताओं का सम्मान) |
| GET | `/claim/:churchId` | JWT | — | किसी चर्च में वर्तमान उपयोगकर्ता के लिए व्यक्ति रिकॉर्ड का दावा करें |
| POST | `/` | JWT | People.Edit या EditSelf | लोग बनाएँ या अपडेट करें (बैच) |
| POST | `/search` | JWT | People.View, Member, या People.ViewNames | लोगों को खोजें (POST संस्करण)। बॉडी: `{ term }` या `{ email }`; `GET /search` जैसे ही नाम-केवल नियम |
| POST | `/advancedSearch` | JWT | People.View या Member | बहु-शर्त खोज (आयु, birthMonth, membershipStatus, आदि)। बॉडी शर्तों की सरणी है; खाली बॉडी का अर्थ कोई शर्त नहीं, और कोई अन्य गैर-सरणी बॉडी 400 लौटाती है |
| POST | `/loadOrCreate` | Public | — | ईमेल से व्यक्ति खोजें या बनाएँ। बॉडी: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | QR अतिथि साइन-अप। बॉडी: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 सदस्य; email/phone/maritalStatus केवल पहले सदस्य पर लागू)। चर्च द्वारा बंद किए गए फ़ील्ड हटा दिए जाते हैं; गायब आवश्यक या गलत मान 400 लौटाते हैं। पहले मौजूदा लोगों का पुन: उपयोग होता है: कोई सदस्य तब मेल खाता है जब ठीक एक गैर-हटाया गया व्यक्ति वही पहला नाम (केस-इनसेंसिटिव) और वही ईमेल या फ़ोन अंक (घर, कार्य, या मोबाइल) रखता है; बिना ईमेल या फ़ोन वाला सदस्य मिलान किए गए परिवार के भीतर पहले नाम से मिलता है। मिलान किए गए लोग कभी संपादित नहीं होते। बिना मिलान वाले सदस्य मिलान किए गए परिवार में शामिल होते हैं, या अन्यथा एक नया परिवार (पहले सदस्य के अंतिम नाम पर नामित), `membershipStatus: "Visitor"` और साझा `address` के साथ। `comments` को पहले सदस्य पर एक नोट के रूप में सहेजता है, सभी को निजी `guestRegistrationGroupId` समूह में जोड़ता है (यदि सेट हो), और — जब `guestRegistrationRecordAttendance` `"true"` हो — उस समूह के उन निर्धारित सेवा समयों के लिए उपस्थिति दर्ज करता है जिनकी चेक-इन विंडो अभी खुली है। `{ householdId, people: [{ id, name }] }` लौटाता है, संग्रहीत नामों के बजाय जमा किए गए नाम दोहराते हुए। वही opt-in/टोकन और दर-सीमा नियम जो options कॉल पर हैं |
| POST | `/household/:householdId` | JWT | People.Edit | परिवार के सदस्य असाइनमेंट अपडेट करें |
| POST | `/public/email` | Public | — | किसी व्यक्ति को ईमेल भेजें। बॉडी: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | IDs द्वारा व्यक्तियों के ईमेल लोड करें (server-to-server, jwtSecret आवश्यक) |
| DELETE | `/:id` | JWT | People.Edit | व्यक्ति हटाएँ |

### उदाहरण: लोगों को खोजना

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

## उपयोगकर्ता (Users) {#users}

Base path: `/membership/users`

लॉगिन, पंजीकरण और पासवर्ड प्रबंधन endpoints के लिए [Authentication & Permissions](./authentication) देखें।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| POST | `/login` | Public | — | लॉग इन करें (ईमेल/पासवर्ड, JWT रिफ़्रेश, या authGuid) |
| POST | `/register` | Public | — | नया उपयोगकर्ता पंजीकृत करें |
| POST | `/forgot` | Public | — | पासवर्ड रीसेट ईमेल भेजें |
| POST | `/setPasswordGuid` | Public | — | ईमेल लिंक के auth GUID से पासवर्ड सेट करें |
| POST | `/verifyCredentials` | Public | — | ईमेल/पासवर्ड सत्यापित करें और संबंधित चर्च लौटाएँ |
| POST | `/loadOrCreate` | JWT | — | ईमेल/userId से उपयोगकर्ता खोजें या बनाएँ |
| POST | `/setDisplayName` | JWT | — | उपयोगकर्ता का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | उपयोगकर्ता का ईमेल पता बदलें |
| POST | `/updatePassword` | JWT | — | उपयोगकर्ता का पासवर्ड बदलें (न्यूनतम 6 अक्षर) |
| POST | `/updateOptedOut` | JWT | — | किसी व्यक्ति की opted-out स्थिति सेट करें |
| POST | `/sendInviteEmail` | JWT | People.Edit | इस चर्च के किसी व्यक्ति को निमंत्रण ईमेल भेजें (`email`, `personName`, `contextName`)। बटन बिना खाते वाले व्यक्ति के लिए **Sign Up** और मौजूदा उपयोगकर्ता के लिए **Log In** पढ़ता है। जिस उपयोगकर्ता ने कभी लॉग इन नहीं किया, उसे इसके बजाय 7 दिन में समाप्त होने वाला **Set Your Password** लिंक मिलता है। एक निश्चित टेम्पलेट, इसलिए यह चर्च की दैनिक ईमेल सीमा में नहीं गिना जाता |
| GET | `/search?term=` | JWT | Server.Admin | नाम/ईमेल से सभी उपयोगकर्ता खोजें |
| DELETE | `/` | JWT | — | वर्तमान उपयोगकर्ता खाता हटाएँ |

## चर्च (Churches)

Base path: `/membership/churches`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी चर्च लोड करें |
| GET | `/:id` | JWT | — | ID से चर्च प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | किसी चर्च का domain admin उपयोगकर्ता प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | किसी चर्च का रूप धारण करें (केवल server admin) |
| GET | `/all?term=` | JWT | Server.Admin | सभी चर्च खोजें (एडमिन) |
| GET | `/search/?name=` | Public | — | नाम से चर्च खोजें |
| GET | `/lookup/?subDomain=&id=` | Public | — | सबडोमेन या ID से चर्च खोजें |
| POST | `/` | JWT | Settings.Edit | चर्च विवरण अपडेट करें |
| POST | `/add` | JWT | — | नया चर्च पंजीकृत करें। आवश्यक फ़ील्ड: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | नाम से चर्च खोजें (POST संस्करण) |
| POST | `/select` | JWT | — | चर्च चुनें/बदलें। बॉडी: `{ churchId }` या `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | चर्च को संग्रहीत या असंग्रहीत करें |
| POST | `/byIds` | Public | — | IDs द्वारा कई चर्च लोड करें |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7+ दिनों से छोड़े गए चर्च हटाएँ |

## समूह (Groups)

Base path: `/membership/groups`

मानक CRUD का विस्तार (बेस क्लास से GET `/`, GET `/:id`)।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूह सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से समूह प्राप्त करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | सेवा फ़िल्टर से समूह खोजें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के लिए समूह प्राप्त करें |
| GET | `/my/:tag` | JWT | — | वर्तमान उपयोगकर्ता के समूह, टैग से फ़िल्टर किए हुए, प्राप्त करें |
| GET | `/tag/:tag` | JWT | — | किसी विशिष्ट टैग वाले सभी समूह प्राप्त करें |
| GET | `/public/:churchId/:id` | Public | — | चर्च और ID से सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/tag/:tag` | Public | — | टैग से सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/label?label=` | Public | — | लेबल से सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug से सार्वजनिक समूह प्राप्त करें |
| POST | `/` | JWT | Groups.Edit | समूह बनाएँ या अपडेट करें (slug अपने आप बनता है) |
| DELETE | `/:id` | JWT | Groups.Edit | समूह हटाएँ (ministry समूहों के लिए child teams भी हटाता है) |

## समूह सदस्य (Group Members)

Base path: `/membership/groupmembers`

मानक CRUD का विस्तार (बेस क्लास से GET `/:id`, DELETE `/:id`)।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID से समूह सदस्य प्राप्त करें |
| GET | `/` | JWT | GroupMembers.View* | समूह सदस्य सूचीबद्ध करें। `?groupId=`, `?groupIds=`, या `?personId=` से फ़िल्टर करें। *यदि उपयोगकर्ता समूह में है या अपना personId पूछ रहा है, तो भी अनुमति है, और उपयोगकर्ता के पास Attendance.View या Attendance.Edit होने पर किसी भी गैर-गोपनीय समूह के `?groupId=` के लिए (उनके लिए 13 वर्ष से कम आयु के सदस्य भी शामिल) |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की समूह सदस्यताएँ प्राप्त करें |
| GET | `/basic/:groupId` | JWT | — | किसी समूह की बुनियादी सदस्य सूची प्राप्त करें |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | समूह लीडर प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:groupId` | Public | — | किसी समूह की सार्वजनिक सूची (न्यूनतम फ़ील्ड: `personId`, `displayName`, `leader`, photo)। केवल तभी जब समूह `publicRoster` से opt-in करे; वेबसाइट बिल्डर के `staffGrid` एलिमेंट को शक्ति देता है |
| POST | `/` | JWT | GroupMembers.Edit | समूह सदस्य जोड़ें या अपडेट करें |
| DELETE | `/:id` | JWT | GroupMembers.View | समूह सदस्य हटाएँ |

## परिवार (Households)

Base path: `/membership/households`

मानक CRUD कंट्रोलर।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी परिवार सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से परिवार प्राप्त करें |
| POST | `/` | JWT | People.Edit | परिवार बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | People.Edit | परिवार हटाएँ |

## भूमिकाएँ (Roles)

Base path: `/membership/roles`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID से भूमिका प्राप्त करें |
| GET | `/church/:churchId` | JWT | Roles.View | किसी चर्च की सभी भूमिकाएँ प्राप्त करें। हर भूमिका में `memberCount` शामिल है, यानी उसमें कितने अलग उपयोगकर्ता हैं |
| POST | `/` | JWT | Roles.Edit | भूमिकाएँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका हटाएँ (उसकी अनुमतियाँ और सदस्य भी हटाता है) |

## भूमिका सदस्य (Role Members)

Base path: `/membership/rolemembers`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी भूमिका के सदस्य प्राप्त करें। उपयोगकर्ता विवरण शामिल करने के लिए `?include=users` जोड़ें |
| POST | `/` | JWT | Roles.Edit | भूमिका में सदस्य जोड़ें (ईमेल न होने पर उपयोगकर्ता बनाता है) |
| DELETE | `/:id` | JWT | Roles.View | भूमिका सदस्य हटाएँ |
| DELETE | `/self/:churchId/:userId` | JWT | — | स्वयं को किसी चर्च से हटाएँ |

## भूमिका अनुमतियाँ (Role Permissions)

Base path: `/membership/rolepermissions`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी भूमिका की अनुमतियाँ प्राप्त करें ("Everyone" भूमिका के लिए ID के स्थान पर `null` उपयोग करें) |
| POST | `/` | JWT | Roles.Edit | भूमिका अनुमतियाँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका अनुमति हटाएँ |

## अनुमतियाँ (Permissions)

Base path: `/membership/permissions`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | — | उपलब्ध अनुमतियों की पूरी सूची प्राप्त करें |

हर प्रविष्टि में `apiName`, `section` (content type), `action`, और `displaySection` / `displayAction` लेबल होते हैं, जो B1Admin का भूमिका संपादक दिखाता है। हाल की जोड़ें: `MembershipApi` / `People` / `View Names` (**View People Names Only**, People and Groups के अंतर्गत) और `GivingApi` / `Donations` / `Enter` (**Enter Donations**, Donations के अंतर्गत; देखें [Donation Batches](./giving.md#donation-batches))।

## फ़ॉर्म (Forms)

Base path: `/membership/forms`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सभी फ़ॉर्म सूचीबद्ध करें (एडमिन सभी देखता है; संपादक असाइन किए गए + गैर-सदस्य फ़ॉर्म देखते हैं) |
| GET | `/:id` | JWT | फ़ॉर्म पहुँच | ID से फ़ॉर्म प्राप्त करें |
| GET | `/archived` | JWT | Forms.Admin या Forms.Edit | संग्रहीत फ़ॉर्म सूचीबद्ध करें |
| GET | `/group/:groupId` | JWT | समूह सदस्य, समूह लीडर, या Forms.Admin | समूह से जुड़े स्टैंड-अलोन फ़ॉर्म (`forms.groupId`), संग्रहीत को छोड़कर, नाम के अनुसार क्रमबद्ध। `id`, `name`, `description`, और `open` (उपलब्धता अवधि के भीतर) लौटाता है। सदस्यों को केवल खुले फ़ॉर्म मिलते हैं; लीडर और फ़ॉर्म एडमिन बंद फ़ॉर्म भी पाते हैं। समूह पृष्ठ के जुड़े फ़ॉर्म को शक्ति देता है |
| GET | `/standalone/:id?churchId=` | JWT | — | स्टैंड-अलोन फ़ॉर्म प्राप्त करें (प्रतिबंधित फ़ॉर्म के लिए प्रमाणीकरण आवश्यक) |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | फ़ॉर्म बनाएँ या अपडेट करें। स्टैंड-अलोन फ़ॉर्म वैकल्पिक `photoUrl` (फ़ॉर्म के ऊपर दिखने वाली हेडर फ़ोटो) और `groupId` (जुड़ा समूह) स्वीकार करते हैं |
| DELETE | `/:id` | JWT | फ़ॉर्म पहुँच | फ़ॉर्म हटाएँ |

## फ़ॉर्म प्रस्तुतियाँ (Form Submissions)

Base path: `/membership/formsubmissions`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | प्रस्तुतियाँ सूचीबद्ध करें। `?personId=` या `?formId=` से फ़िल्टर करें |
| GET | `/my?include=questions,answers` | JWT | — | स्वयं-सीमित: साइन इन सदस्य द्वारा प्रस्तुत या उनके व्यक्ति से जुड़े अधिकतम 50 स्टैंड-अलोन फ़ॉर्म प्रस्तुतियाँ (person फ़ॉर्म नहीं) (`contentType` `person`, `contentId` = उनका person id — उदाहरण के लिए, किसी एडमिन के person बदलने के बाद), सबसे नई पहले, हर एक के साथ `form.name`। `include` हर फ़ॉर्म के प्रश्न और प्रस्तुति के उत्तर जोड़ता है। यदि उपयोगकर्ता किसी person से नहीं जुड़ा है तो `401` लौटाता है। B1 Me पृष्ठ के **My Forms** अनुभाग को शक्ति देता है |
| GET | `/group/:groupId` | JWT | समूह का लीडर | समूह के लीडरों के लिए उत्तर: हर जुड़े फ़ॉर्म और पंजीकरण फ़ॉर्म वाले हर समूह कार्यक्रम के लिए एक प्रविष्टि, हर एक में `form`, `event` (`id`, `title`, `start`; केवल कार्यक्रम प्रविष्टियों के लिए), `questions`, और `submissions` (`answers` और `personName` के साथ, गुमनाम होने पर `null`) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, या view पहुँच | ID से प्रस्तुति प्राप्त करें। `?include=form,questions,answers` जोड़ें। फ़ॉर्म के जुड़े समूह के लीडर, और जिस समूह से कार्यक्रम पंजीकरण जुड़ा है उसके लीडर भी इसे पढ़ सकते हैं |
| GET | `/formId/:formId` | JWT | फ़ॉर्म पहुँच (view) | किसी फ़ॉर्म की सभी प्रस्तुतियाँ प्राप्त करें (फ़ॉर्म, प्रश्न, उत्तर शामिल)। फ़ॉर्म के जुड़े समूह के लीडरों को view पहुँच है |
| POST | `/` | JWT | — | फ़ॉर्म के उत्तर जमा करें (प्रतिबंधित/गैर-प्रतिबंधित फ़ॉर्म संभालता है, ईमेल सूचनाएँ भेजता है)। जब फ़ॉर्म में `autoCreatePerson` होता है, तो ईमेल से Guest व्यक्ति खोजता या बनाता है और प्रस्तुति को जोड़ता है; जब फ़ॉर्म में `groupId` भी हो, तो उस व्यक्ति को समूह में जोड़ता है; जब `followUpSubject`/`followUpBody` सेट हों, तो प्रस्तुतकर्ता को टेम्पलेट वाला फ़ॉलो-अप ईमेल भेजता है। जब तक कॉलर फ़ॉर्म प्रबंधित नहीं कर सकता, `submittedBy` हमेशा साइन इन सदस्य के person पर सेट होता है (गुमनाम प्रस्तुतियों के लिए खाली) |
| DELETE | `/:id` | JWT | Forms.Admin या Forms.Edit | प्रस्तुति और उसके उत्तर हटाएँ |

## प्रश्न (Questions)

Base path: `/membership/questions`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | फ़ॉर्म पहुँच | किसी फ़ॉर्म के प्रश्न सूचीबद्ध करें। `?formId=` आवश्यक |
| GET | `/:id` | JWT | फ़ॉर्म पहुँच | ID से प्रश्न प्राप्त करें |
| GET | `/unrestricted?formId=` | JWT | — | गैर-प्रतिबंधित फ़ॉर्म के प्रश्न प्राप्त करें |
| GET | `/sort/:id/up` | JWT | — | प्रश्न को सॉर्ट क्रम में ऊपर ले जाएँ |
| GET | `/sort/:id/down` | JWT | — | प्रश्न को सॉर्ट क्रम में नीचे ले जाएँ |
| POST | `/` | JWT | फ़ॉर्म पहुँच | प्रश्न बनाएँ या अपडेट करें (सॉर्ट क्रम स्वतः असाइन) |
| DELETE | `/:id?formId=` | JWT | फ़ॉर्म पहुँच | प्रश्न हटाएँ |

## उत्तर (Answers)

Base path: `/membership/answers`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर सूचीबद्ध करें। `?formSubmissionId=` से फ़िल्टर करें |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर बनाएँ या अपडेट करें |

## सदस्य अनुमतियाँ (Member Permissions)

Base path: `/membership/memberpermissions`

किसी विशिष्ट फ़ॉर्म तक प्रति-सदस्य पहुँच नियंत्रित करता है।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/:id` | JWT | फ़ॉर्म पहुँच | ID से सदस्य अनुमति प्राप्त करें |
| GET | `/member/:id` | JWT | फ़ॉर्म पहुँच | किसी सदस्य की सभी फ़ॉर्म अनुमतियाँ प्राप्त करें |
| GET | `/form/:id` | JWT | फ़ॉर्म पहुँच | किसी फ़ॉर्म की सभी सदस्य अनुमतियाँ प्राप्त करें |
| GET | `/form/:id/my` | JWT | फ़ॉर्म पहुँच | किसी फ़ॉर्म के लिए वर्तमान उपयोगकर्ता की अनुमति प्राप्त करें |
| POST | `/` | JWT | फ़ॉर्म पहुँच | सदस्य अनुमतियाँ बनाएँ या अपडेट करें |
| DELETE | `/:id?formId=` | JWT | फ़ॉर्म पहुँच | सदस्य अनुमति हटाएँ |
| DELETE | `/member/:id?formId=` | JWT | फ़ॉर्म पहुँच | किसी फ़ॉर्म पर किसी सदस्य की सभी अनुमतियाँ हटाएँ |

## सेटिंग्स (Settings)

Base path: `/membership/settings`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च की सार्वजनिक सेटिंग्स प्राप्त करें |
| POST | `/` | JWT | Settings.Edit | सेटिंग्स सहेजें (base64 इमेज अपलोड समर्थित) |

## डोमेन (Domains)

Base path: `/membership/domains`

मानक CRUD का विस्तार (बेस क्लास से GET `/:id`, GET `/`, DELETE `/:id`)।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी डोमेन सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से डोमेन प्राप्त करें |
| GET | `/lookup/:domainName` | JWT | — | नाम से डोमेन खोजें |
| GET | `/public/lookup/:domainName` | Public | — | नाम से सार्वजनिक डोमेन खोज |
| GET | `/health/check` | Public | — | बिना जाँचे गए डोमेन पर स्वास्थ्य जाँच चलाएँ |
| POST | `/` | JWT | Settings.Edit | डोमेन बनाएँ या अपडेट करें (Caddy अपडेट ट्रिगर करता है) |
| DELETE | `/:id` | JWT | Settings.Edit | डोमेन हटाएँ |

## उपयोगकर्ता-चर्च (User Church)

Base path: `/membership/userchurch`

उपयोगकर्ताओं और चर्चों के बीच संबंध प्रबंधित करता है।

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | user ID से user-church रिकॉर्ड प्राप्त करें |
| GET | `/personid/:personId` | JWT | — | किसी व्यक्ति के लिंक्ड उपयोगकर्ता का ईमेल प्राप्त करें |
| GET | `/user/:userId` | JWT | Server.Admin | किसी उपयोगकर्ता के सभी चर्च लोड करें |
| POST | `/` | JWT | — | उपयोगकर्ता-चर्च संबंध बनाएँ |
| PATCH | `/:userId` | JWT | — | अंतिम पहुँच समय अपडेट करें और पहुँच दर्ज करें |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | user-church रिकॉर्ड हटाएँ |

## दृश्यता प्राथमिकताएँ (Visibility Preferences)

Base path: `/membership/visibilityPreferences`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की दृश्यता प्राथमिकताएँ प्राप्त करें |
| POST | `/` | JWT | — | दृश्यता प्राथमिकताएँ सहेजें (पता, फ़ोन, ईमेल की दृश्यता) |

## क्वेरी (Query)

Base path: `/membership/query`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI का उपयोग करके प्राकृतिक-भाषा सदस्य खोज। बॉडी: `{ text, subDomain, siteUrl }` |

## क्लाइंट त्रुटियाँ (Client Errors)

Base path: `/membership/clientErrors`

| विधि | पथ | Auth | अनुमति | विवरण |
|------|------|------|------------|-------------|
| POST | `/` | JWT | — | क्लाइंट-साइड त्रुटि लॉग करें |

## संबंधित पृष्ठ

- [Authentication & Permissions](./authentication) — लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [Attendance Endpoints](./attendance) — सेवा और विज़िट ट्रैकिंग
- [Module Structure](../module-structure) — कोड संगठन के पैटर्न
