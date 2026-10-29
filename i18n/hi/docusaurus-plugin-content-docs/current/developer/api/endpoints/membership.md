---
title: "Membership Endpoints"
---

# Membership Endpoints

<div class="article-intro">

Membership मॉड्यूल लोगों, चर्चों, समूहों, households, भूमिकाओं, अनुमतियों, फ़ॉर्मों और सेटिंग्स का प्रबंधन करता है। यह सबसे बड़ा मॉड्यूल है और अन्य सभी मॉड्यूलों के लिए मूल पहचान और प्राधिकरण परत प्रदान करता है।

</div>

**Base path:** `/membership`

## People

Base path: `/membership/people`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View या Member | चर्च के सभी लोग सूचीबद्ध करें |
| GET | `/:id` | JWT | People.View या स्वयं का रिकॉर्ड | ID से व्यक्ति प्राप्त करें (फ़ॉर्म सबमिशन शामिल) |
| GET | `/ids?ids=` | JWT | People.View, Member, या People.ViewNames | अल्पविराम से अलग IDs द्वारा कई लोग प्राप्त करें। बिना People.View वाले People.ViewNames कॉलर को बुनियादी मॉडल मिलता है, जिसमें opted-out लोग छोड़े जाते हैं (कॉलर को छोड़कर) |
| GET | `/basic?ids=` | JWT | — | कई लोगों के लिए बुनियादी जानकारी (केवल नाम) प्राप्त करें |
| GET | `/names?ids=` | JWT | कोई भी चर्च अनुमति | `[{ id, name: { display, first, last }, photo }]`, अंतिम नाम फिर पहले नाम के अनुसार क्रमबद्ध, अल्पविराम से अलग ids के लिए जिन्हें कॉलर पहले से जानता है, ताकि बिना People.View वाली भूमिकाएँ (donations, attendance) लोगों को लेबल कर सकें। कोई खोज नहीं, कोई डायरेक्टरी फ़िल्टर नहीं |
| POST | `/names` | JWT | कोई भी चर्च अनुमति | `GET /names` के समान। Body: `{ peopleIds }` (या `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, या People.ViewNames | हाल ही में जोड़े गए लोग। बिना People.View वाले People.ViewNames कॉलर (डायरेक्टरी पहुँच वाले सदस्यों सहित) को बुनियादी मॉडल मिलता है (`id`, `name.display`, `photo`, `membershipStatus`), जिसमें opted-out लोग छोड़े जाते हैं |
| GET | `/guest-register/options?churchId=` | Public | — | QR अतिथि साइन-अप चेकलिस्ट: `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }` लौटाता है, हर एक `"off"`, `"optional"`, या `"required"` (सार्वजनिक `guestRegistrationFields` सेटिंग से पार्स किया गया; गायब या गलत मान email/phone को वैकल्पिक और बाकी को off पर डिफ़ॉल्ट करते हैं)। `enableQRGuestRegistration` आवश्यक है, जब तक अनुरोध में मेल खाने वाला site/church token न हो; दर-सीमित (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, या People.ViewNames | नाम या ईमेल से लोगों की खोज करें (अधिकतम 100, अंतिम नाम फिर पहले नाम के अनुसार)। बिना People.View वाले People.ViewNames कॉलर (डायरेक्टरी पहुँच वाले सदस्यों सहित) को बुनियादी मॉडल लौटाने वाली नाम खोज मिलती है; `email` खोज `[]` लौटाती है |
| GET | `/search/phone?number=` | JWT | People.View या Member | फ़ोन नंबर से खोजें |
| GET | `/search/group?groupId=` | JWT | People.View या Member | किसी विशिष्ट समूह के लोग प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | किसी household के सभी लोग प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | फ़िल्टर (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) के साथ attendees लोड करें |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और समूहों के लिए timeline डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | directory दृश्य के लिए व्यक्ति प्राप्त करें (दृश्यता प्राथमिकताओं का सम्मान करता है) |
| GET | `/claim/:churchId` | JWT | — | किसी चर्च में वर्तमान उपयोगकर्ता के लिए व्यक्ति रिकॉर्ड का दावा करें |
| POST | `/` | JWT | People.Edit या EditSelf | लोग बनाएँ या अपडेट करें (बैच) |
| POST | `/search` | JWT | People.View, Member, या People.ViewNames | लोगों की खोज (POST रूप)। Body: `{ term }` या `{ email }`; `GET /search` के समान नाम-केवल नियम |
| POST | `/advancedSearch` | JWT | People.View या Member | बहु-शर्त खोज (आयु, birthMonth, membershipStatus, आदि)। Body शर्तों की एक सरणी है; खाली body का अर्थ कोई शर्त नहीं, और कोई अन्य गैर-सरणी body 400 लौटाती है |
| POST | `/loadOrCreate` | Public | — | ईमेल से व्यक्ति खोजें या बनाएँ। Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | QR अतिथि साइन-अप। Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 सदस्य; email/phone/maritalStatus केवल पहले सदस्य पर लागू)। चर्च द्वारा बंद किए गए फ़ील्ड हटा दिए जाते हैं; गायब आवश्यक या अमान्य मान 400 लौटाते हैं। पहले मौजूदा लोगों का पुन: उपयोग होता है: कोई सदस्य तब मेल खाता है जब ठीक एक गैर-हटाया गया व्यक्ति वही पहला नाम (केस-असंवेदनशील) और वही ईमेल या फ़ोन अंक (home, work, या mobile) रखता हो; बिना ईमेल या फ़ोन वाला सदस्य मिलान किए गए household के भीतर पहले नाम से मेल खाता है। मेल खाने वाले लोग कभी संपादित नहीं होते। मेल न खाने वाले सदस्य मिलान किए गए household में जुड़ते हैं, या अन्यथा एक नया household (पहले सदस्य के अंतिम नाम पर नामित), `membershipStatus: "Visitor"` के साथ और साझा `address` के साथ। `comments` को पहले सदस्य पर एक नोट के रूप में सहेजता है, सभी को निजी `guestRegistrationGroupId` समूह में जोड़ता है यदि सेट हो, और — जब `guestRegistrationRecordAttendance` `"true"` हो — उस समूह के उन निर्धारित सेवा समयों के लिए उपस्थिति दर्ज करता है जिनकी चेक-इन विंडो अभी खुली है। `{ householdId, people: [{ id, name }] }` लौटाता है, सहेजे गए नामों के बजाय सबमिट किए गए नाम दोहराते हुए। वही opt-in/token और दर-सीमा नियम जो options कॉल पर हैं |
| POST | `/household/:householdId` | JWT | People.Edit | household सदस्य असाइनमेंट अपडेट करें |
| POST | `/public/email` | Public | — | किसी व्यक्ति को ईमेल भेजें। Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | IDs द्वारा व्यक्ति के ईमेल लोड करें (server-to-server, jwtSecret आवश्यक) |
| DELETE | `/:id` | JWT | People.Edit | व्यक्ति हटाएँ |

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

### उदाहरण: एक व्यक्ति बनाना

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Users

Base path: `/membership/users`

लॉगिन, पंजीकरण, और पासवर्ड प्रबंधन endpoints के लिए [Authentication & Permissions](./authentication) देखें।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | लॉग इन करें (ईमेल/पासवर्ड, JWT रिफ़्रेश, या authGuid) |
| POST | `/register` | Public | — | नया उपयोगकर्ता पंजीकृत करें |
| POST | `/forgot` | Public | — | पासवर्ड रीसेट ईमेल भेजें |
| POST | `/setPasswordGuid` | Public | — | ईमेल लिंक से auth GUID का उपयोग करके पासवर्ड सेट करें |
| POST | `/verifyCredentials` | Public | — | ईमेल/पासवर्ड सत्यापित करें और संबंधित चर्च लौटाएँ |
| POST | `/loadOrCreate` | JWT | — | ईमेल/userId से उपयोगकर्ता खोजें या बनाएँ |
| POST | `/setDisplayName` | JWT | — | उपयोगकर्ता का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | उपयोगकर्ता का ईमेल पता बदलें |
| POST | `/updatePassword` | JWT | — | उपयोगकर्ता का पासवर्ड बदलें (न्यूनतम 6 अक्षर) |
| POST | `/updateOptedOut` | JWT | — | किसी व्यक्ति की opted-out स्थिति सेट करें |
| POST | `/sendInviteEmail` | JWT | People.Edit | इस चर्च के किसी व्यक्ति को आमंत्रण ईमेल भेजें (`email`, `personName`, `contextName`)। बटन उस व्यक्ति के लिए **Sign Up** पढ़ता है जिसका कोई खाता नहीं है, और मौजूदा उपयोगकर्ता के लिए **Log In**। जिस उपयोगकर्ता ने कभी लॉग इन नहीं किया उसे इसके बजाय 7 दिन में समाप्त होने वाला **Set Your Password** लिंक मिलता है। एक निश्चित टेम्पलेट है, इसलिए यह चर्च की दैनिक ईमेल सीमा में नहीं गिना जाता |
| GET | `/search?term=` | JWT | Server.Admin | नाम/ईमेल से सभी उपयोगकर्ता खोजें |
| DELETE | `/` | JWT | — | वर्तमान उपयोगकर्ता खाता हटाएँ |

## Churches

Base path: `/membership/churches`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी चर्च लोड करें |
| GET | `/:id` | JWT | — | ID से चर्च प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | किसी चर्च का domain admin उपयोगकर्ता प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | किसी चर्च का प्रतिरूपण करें (केवल server admin) |
| GET | `/all?term=` | JWT | Server.Admin | सभी चर्च खोजें (एडमिन) |
| GET | `/search/?name=` | Public | — | नाम से चर्च खोजें |
| GET | `/lookup/?subDomain=&id=` | Public | — | subdomain या ID से चर्च खोजें |
| POST | `/` | JWT | Settings.Edit | चर्च विवरण अपडेट करें |
| POST | `/add` | JWT | — | नया चर्च पंजीकृत करें। आवश्यक फ़ील्ड: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | नाम से चर्च खोजें (POST रूप) |
| POST | `/select` | JWT | — | चर्च चुनें/बदलें। Body: `{ churchId }` या `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | चर्च को archive या unarchive करें |
| POST | `/byIds` | Public | — | IDs द्वारा कई चर्च लोड करें |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7+ दिनों से छोड़े गए चर्च हटाएँ |

## Groups

Base path: `/membership/groups`

मानक CRUD को extend करता है (base class से GET `/`, GET `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूह सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से समूह प्राप्त करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | सेवा फ़िल्टर से समूह खोजें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के समूह प्राप्त करें |
| GET | `/my/:tag` | JWT | — | वर्तमान उपयोगकर्ता के समूह, टैग से फ़िल्टर करके, प्राप्त करें |
| GET | `/tag/:tag` | JWT | — | किसी विशिष्ट टैग वाले सभी समूह प्राप्त करें |
| GET | `/public/:churchId/:id` | Public | — | चर्च और ID द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/tag/:tag` | Public | — | टैग द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/label?label=` | Public | — | लेबल द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug द्वारा सार्वजनिक समूह प्राप्त करें |
| POST | `/` | JWT | Groups.Edit | समूह बनाएँ या अपडेट करें (slug स्वतः बनता है) |
| DELETE | `/:id` | JWT | Groups.Edit | समूह हटाएँ (सेवकाई समूहों के लिए child teams भी हटाता है) |

## Group Members

Base path: `/membership/groupmembers`

मानक CRUD को extend करता है (base class से GET `/:id`, DELETE `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID से समूह सदस्य प्राप्त करें |
| GET | `/` | JWT | GroupMembers.View* | समूह सदस्य सूचीबद्ध करें। `?groupId=`, `?groupIds=`, या `?personId=` से फ़िल्टर करें। *यदि उपयोगकर्ता समूह में है या अपना personId पूछ रहा है, तो भी अनुमति है, और Attendance.View या Attendance.Edit वाले उपयोगकर्ता के लिए किसी भी गैर-गोपनीय समूह के `?groupId=` के लिए (13 से कम आयु के सदस्य उनके लिए शामिल) |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की समूह सदस्यताएँ प्राप्त करें |
| GET | `/basic/:groupId` | JWT | — | किसी समूह की बुनियादी सदस्य सूची प्राप्त करें |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | समूह के लीडर प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:groupId` | Public | — | समूह की सार्वजनिक रोस्टर प्राप्त करें (न्यूनतम फ़ील्ड: `personId`, `displayName`, `leader`, फ़ोटो)। केवल तब जब समूह `publicRoster` के माध्यम से opt-in करता है; वेबसाइट बिल्डर के `staffGrid` एलिमेंट को सपोर्ट करता है |
| POST | `/` | JWT | GroupMembers.Edit | समूह सदस्य जोड़ें या अपडेट करें |
| DELETE | `/:id` | JWT | GroupMembers.View | समूह सदस्य हटाएँ |

## Households

Base path: `/membership/households`

मानक CRUD controller।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी households सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से household प्राप्त करें |
| POST | `/` | JWT | People.Edit | households बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | People.Edit | household हटाएँ |

## Roles

Base path: `/membership/roles`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID से भूमिका प्राप्त करें |
| GET | `/church/:churchId` | JWT | Roles.View | किसी चर्च की सभी भूमिकाएँ प्राप्त करें। हर भूमिका में `memberCount` शामिल है, जो उसमें मौजूद अलग उपयोगकर्ताओं की संख्या है |
| POST | `/` | JWT | Roles.Edit | भूमिकाएँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका हटाएँ (उसकी अनुमतियाँ और सदस्य भी हटाता है) |

## Role Members

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी भूमिका के सदस्य प्राप्त करें। उपयोगकर्ता विवरण शामिल करने के लिए `?include=users` जोड़ें |
| POST | `/` | JWT | Roles.Edit | किसी भूमिका में सदस्य जोड़ें (यदि ईमेल मौजूद नहीं है तो उपयोगकर्ता बनाता है) |
| DELETE | `/:id` | JWT | Roles.View | भूमिका सदस्य हटाएँ |
| DELETE | `/self/:churchId/:userId` | JWT | — | स्वयं को किसी चर्च से हटाएँ |

## Role Permissions

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी भूमिका की अनुमतियाँ प्राप्त करें ("Everyone" भूमिका के लिए ID के रूप में `null` उपयोग करें) |
| POST | `/` | JWT | Roles.Edit | भूमिका अनुमतियाँ बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | भूमिका अनुमति हटाएँ |

## Permissions

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | उपलब्ध अनुमतियों की पूरी सूची प्राप्त करें |

हर प्रविष्टि में `apiName`, `section` (content type), `action`, और `displaySection` / `displayAction` लेबल होते हैं जो B1Admin का भूमिका संपादक दिखाता है। हालिया जोड़: `MembershipApi` / `People` / `View Names` (**View People Names Only**, People and Groups के अंतर्गत) और `GivingApi` / `Donations` / `Enter` (**Enter Donations**, Donations के अंतर्गत; देखें [Donation Batches](./giving.md#donation-batches))।

## Forms

Base path: `/membership/forms`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सभी फ़ॉर्म सूचीबद्ध करें (admin सभी देखता है; editors को असाइन किए गए + गैर-सदस्य फ़ॉर्म दिखते हैं) |
| GET | `/:id` | JWT | Form access | ID से फ़ॉर्म प्राप्त करें |
| GET | `/archived` | JWT | Forms.Admin या Forms.Edit | archived फ़ॉर्म सूचीबद्ध करें |
| GET | `/group/:groupId` | JWT | समूह सदस्य, समूह लीडर, या Forms.Admin | समूह से जुड़े स्टैंड-अलोन फ़ॉर्म (`forms.groupId`), archived को छोड़कर, नाम से क्रमबद्ध। `id`, `name`, `description`, और `open` (उपलब्धता विंडो के भीतर) लौटाता है। सदस्यों को केवल खुले फ़ॉर्म मिलते हैं; लीडर और फ़ॉर्म एडमिन बंद फ़ॉर्म भी पाते हैं। समूह पृष्ठ के linked forms को सपोर्ट करता है |
| GET | `/standalone/:id?churchId=` | JWT | — | स्टैंड-अलोन फ़ॉर्म प्राप्त करें (प्रतिबंधित फ़ॉर्म के लिए auth आवश्यक) |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | फ़ॉर्म बनाएँ या अपडेट करें। स्टैंड-अलोन फ़ॉर्म वैकल्पिक `photoUrl` (फ़ॉर्म के ऊपर दिखने वाली हेडर फ़ोटो) और `groupId` (जुड़ा हुआ समूह) स्वीकार करते हैं |
| DELETE | `/:id` | JWT | Form access | फ़ॉर्म हटाएँ |

## Form Submissions

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सबमिशन सूचीबद्ध करें। `?personId=` या `?formId=` से फ़िल्टर करें |
| GET | `/my?include=questions,answers` | JWT | — | स्व-सीमित: हस्ताक्षरित सदस्य द्वारा सबमिट किए गए या उनके व्यक्ति से जुड़े (`contentType` `person`, `contentId` = उनका person id — उदाहरण के लिए, किसी एडमिन के person बदलने के बाद) अधिकतम 50 स्टैंड-अलोन फ़ॉर्म सबमिशन (व्यक्ति फ़ॉर्म नहीं), सबसे नए पहले, हर एक के साथ `form.name`। `include` हर फ़ॉर्म के प्रश्न और सबमिशन के उत्तर जोड़ता है। यदि उपयोगकर्ता किसी व्यक्ति से जुड़ा नहीं है तो `401` लौटाता है। B1 Me पृष्ठ के **My Forms** अनुभाग को सपोर्ट करता है |
| GET | `/group/:groupId` | JWT | समूह का लीडर | समूह के लीडरों के लिए उत्तर: हर जुड़े फ़ॉर्म और पंजीकरण फ़ॉर्म वाले हर समूह इवेंट के लिए एक प्रविष्टि, हर एक में `form`, `event` (`id`, `title`, `start`; केवल इवेंट प्रविष्टियाँ), `questions`, और `submissions` (`answers` और `personName` के साथ, अनाम होने पर `null`) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, या view पहुँच | ID से सबमिशन प्राप्त करें। `?include=form,questions,answers` जोड़ें। फ़ॉर्म के जुड़े समूह के लीडर, और जिस समूह से इवेंट पंजीकरण जुड़ा है उसके लीडर भी इसे पढ़ सकते हैं |
| GET | `/formId/:formId` | JWT | Form access (view) | किसी फ़ॉर्म के सभी सबमिशन प्राप्त करें (form, questions, answers शामिल)। फ़ॉर्म के जुड़े समूह के लीडरों को view पहुँच है |
| POST | `/` | JWT | — | फ़ॉर्म उत्तर सबमिट करें (प्रतिबंधित/अप्रतिबंधित फ़ॉर्म संभालता है, ईमेल सूचनाएँ भेजता है)। जब फ़ॉर्म में `autoCreatePerson` हो, तो ईमेल से Guest व्यक्ति खोजता या बनाता है और सबमिशन जोड़ता है; जब फ़ॉर्म में `groupId` भी हो, तो उस व्यक्ति को समूह में जोड़ता है; जब `followUpSubject`/`followUpBody` सेट हों, तो सबमिट करने वाले को टेम्पलेट वाला फ़ॉलो-अप ईमेल भेजता है। जब तक कॉलर फ़ॉर्म प्रबंधित न कर सके, `submittedBy` हमेशा हस्ताक्षरित सदस्य के person पर सेट होता है (या अनाम सबमिशन के लिए खाली) |
| DELETE | `/:id` | JWT | Forms.Admin या Forms.Edit | सबमिशन और उसके उत्तर हटाएँ |

## Questions

Base path: `/membership/questions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | किसी फ़ॉर्म के प्रश्न सूचीबद्ध करें। `?formId=` आवश्यक है |
| GET | `/:id` | JWT | Form access | ID से प्रश्न प्राप्त करें |
| GET | `/unrestricted?formId=` | JWT | — | अप्रतिबंधित फ़ॉर्म के प्रश्न प्राप्त करें |
| GET | `/sort/:id/up` | JWT | — | प्रश्न को सॉर्ट क्रम में ऊपर ले जाएँ |
| GET | `/sort/:id/down` | JWT | — | प्रश्न को सॉर्ट क्रम में नीचे ले जाएँ |
| POST | `/` | JWT | Form access | प्रश्न बनाएँ या अपडेट करें (सॉर्ट क्रम स्वतः असाइन होता है) |
| DELETE | `/:id?formId=` | JWT | Form access | प्रश्न हटाएँ |

## Answers

Base path: `/membership/answers`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर सूचीबद्ध करें। `?formSubmissionId=` से फ़िल्टर करें |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | उत्तर बनाएँ या अपडेट करें |

## Member Permissions

Base path: `/membership/memberpermissions`

किसी व्यक्ति की विशिष्ट फ़ॉर्मों तक प्रति-सदस्य पहुँच नियंत्रित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | ID से member permission प्राप्त करें |
| GET | `/member/:id` | JWT | Form access | किसी सदस्य की सभी फ़ॉर्म अनुमतियाँ प्राप्त करें |
| GET | `/form/:id` | JWT | Form access | किसी फ़ॉर्म की सभी member permissions प्राप्त करें |
| GET | `/form/:id/my` | JWT | Form access | किसी फ़ॉर्म के लिए वर्तमान उपयोगकर्ता की अनुमति प्राप्त करें |
| POST | `/` | JWT | Form access | member permissions बनाएँ या अपडेट करें |
| DELETE | `/:id?formId=` | JWT | Form access | member permission हटाएँ |
| DELETE | `/member/:id?formId=` | JWT | Form access | किसी फ़ॉर्म पर किसी सदस्य की सभी अनुमतियाँ हटाएँ |

## Settings

Base path: `/membership/settings`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च की सार्वजनिक सेटिंग्स प्राप्त करें |
| POST | `/` | JWT | Settings.Edit | सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |

## Domains

Base path: `/membership/domains`

मानक CRUD को extend करता है (base class से GET `/:id`, GET `/`, DELETE `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी domains सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से domain प्राप्त करें |
| GET | `/lookup/:domainName` | JWT | — | नाम से domain खोजें |
| GET | `/public/lookup/:domainName` | Public | — | नाम से सार्वजनिक domain खोज |
| GET | `/health/check` | Public | — | अनजाँचे domains पर health check चलाएँ |
| POST | `/` | JWT | Settings.Edit | domains बनाएँ या अपडेट करें (Caddy अपडेट ट्रिगर करता है) |
| DELETE | `/:id` | JWT | Settings.Edit | domain हटाएँ |

## User Church

Base path: `/membership/userchurch`

उपयोगकर्ताओं और चर्चों के बीच संबंध प्रबंधित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | user ID द्वारा user-church रिकॉर्ड प्राप्त करें |
| GET | `/personid/:personId` | JWT | — | किसी व्यक्ति के जुड़े उपयोगकर्ता का ईमेल प्राप्त करें |
| GET | `/user/:userId` | JWT | Server.Admin | किसी उपयोगकर्ता के सभी चर्च लोड करें |
| POST | `/` | JWT | — | user-church संबंध बनाएँ |
| PATCH | `/:userId` | JWT | — | अंतिम पहुँच समय अपडेट करें और पहुँच लॉग करें |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | user-church रिकॉर्ड हटाएँ |

## Visibility Preferences

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की दृश्यता प्राथमिकताएँ प्राप्त करें |
| POST | `/` | JWT | — | दृश्यता प्राथमिकताएँ सहेजें (पता, फ़ोन, ईमेल दृश्यता) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI का उपयोग करके प्राकृतिक भाषा में सदस्य खोज। Body: `{ text, subDomain, siteUrl }` |

## Client Errors

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | क्लाइंट-साइड त्रुटि लॉग करें |

## संबंधित पृष्ठ

- [Authentication & Permissions](./authentication) — लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [Attendance Endpoints](./attendance) — सेवा और विज़िट ट्रैकिंग
- [Module Structure](../module-structure) — कोड संगठन पैटर्न
