---
title: "Membership Endpoints"
---

# Membership Endpoints

<div class="article-intro">

Membership मॉड्यूल people, churches, groups, households, roles, permissions, forms, और settings का प्रबंधन करता है। यह सबसे बड़ा मॉड्यूल है और अन्य सभी मॉड्यूलों के लिए मूल पहचान और प्राधिकरण परत प्रदान करता है।

</div>

**Base path:** `/membership`

## People

Base path: `/membership/people`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View या Member | चर्च के सभी लोगों की सूची |
| GET | `/:id` | JWT | People.View या अपना रिकॉर्ड | ID द्वारा एक person प्राप्त करें (form submissions सहित) |
| GET | `/ids?ids=` | JWT | People.View या Member | अल्पविराम से अलग IDs द्वारा कई लोग प्राप्त करें |
| GET | `/basic?ids=` | JWT | — | कई लोगों की basic जानकारी (केवल नाम) प्राप्त करें |
| GET | `/recent` | JWT | People.View या Member | हाल ही में जोड़े गए लोग |
| GET | `/search?term=&email=` | JWT | People.View या Member | नाम या email से लोग खोजें |
| GET | `/search/phone?number=` | JWT | People.View या Member | फ़ोन नंबर से खोजें |
| GET | `/search/group?groupId=` | JWT | People.View या Member | किसी विशेष समूह के लोग प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | किसी घर के सभी लोग प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | फ़िल्टर के साथ उपस्थित लोग लोड करें (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और समूहों का timeline डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | directory दृश्य के लिए person प्राप्त करें (visibility preferences का सम्मान करता है) |
| GET | `/claim/:churchId` | JWT | — | किसी चर्च में वर्तमान उपयोगकर्ता के लिए person रिकॉर्ड claim करें |
| POST | `/` | JWT | People.Edit या EditSelf | लोग बनाएं या अपडेट करें (batch) |
| POST | `/search` | JWT | People.View या Member | लोग खोजें (POST variant) |
| POST | `/advancedSearch` | JWT | People.View या Member | बहु-शर्त खोज (age, birthMonth, membershipStatus, आदि) |
| POST | `/loadOrCreate` | Public | — | email द्वारा person खोजें या बनाएं। Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | घर के सदस्य असाइनमेंट अपडेट करें |
| POST | `/public/email` | Public | — | किसी person को email भेजें। Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | IDs द्वारा person emails लोड करें (server-to-server, jwtSecret आवश्यक) |
| DELETE | `/:id` | JWT | People.Edit | एक person हटाएं |

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

### उदाहरण: एक person बनाएं

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
| POST | `/login` | Public | — | लॉग इन करें (email/password, JWT refresh, या authGuid) |
| POST | `/register` | Public | — | नया उपयोगकर्ता पंजीकृत करें |
| POST | `/forgot` | Public | — | पासवर्ड रीसेट ईमेल भेजें |
| POST | `/setPasswordGuid` | Public | — | ईमेल लिंक के auth GUID से पासवर्ड सेट करें |
| POST | `/verifyCredentials` | Public | — | email/password सत्यापित करें और संबंधित चर्च लौटाएं |
| POST | `/loadOrCreate` | JWT | — | email/userId द्वारा उपयोगकर्ता खोजें या बनाएं |
| POST | `/setDisplayName` | JWT | — | उपयोगकर्ता का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | उपयोगकर्ता का email पता बदलें |
| POST | `/updatePassword` | JWT | — | उपयोगकर्ता का पासवर्ड बदलें (न्यूनतम 6 अक्षर) |
| POST | `/updateOptedOut` | JWT | — | किसी person का opted-out स्थिति सेट करें |
| POST | `/sendInviteEmail` | JWT | People.Edit | इस चर्च के किसी व्यक्ति को invite ईमेल भेजें (`email`, `personName`, `contextName`)। बटन पर किसी ऐसे व्यक्ति के लिए **Sign Up** लिखा होता है जिसका खाता नहीं है, और मौजूदा उपयोगकर्ता के लिए **Log In**। जो उपयोगकर्ता कभी लॉग इन नहीं हुआ, उसे इसके बजाय 7 दिन में समाप्त होने वाला **Set Your Password** लिंक मिलता है। चर्च की दैनिक email सीमा में गिना जाता है (पहुंचने पर `429`) |
| GET | `/search?term=` | JWT | Server.Admin | नाम/email से सभी उपयोगकर्ता खोजें |
| DELETE | `/` | JWT | — | वर्तमान उपयोगकर्ता खाता हटाएं |

## Churches

Base path: `/membership/churches`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के लिए सभी चर्च लोड करें |
| GET | `/:id` | JWT | — | ID द्वारा चर्च प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | किसी चर्च का domain admin उपयोगकर्ता प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | किसी चर्च का impersonate करें (केवल server admin) |
| GET | `/all?term=` | JWT | Server.Admin | सभी चर्च खोजें (admin) |
| GET | `/search/?name=` | Public | — | नाम से चर्च खोजें |
| GET | `/lookup/?subDomain=&id=` | Public | — | subdomain या ID द्वारा चर्च खोजें |
| POST | `/` | JWT | Settings.Edit | चर्च विवरण अपडेट करें |
| POST | `/add` | JWT | — | नया चर्च पंजीकृत करें। आवश्यक फ़ील्ड: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | नाम से चर्च खोजें (POST variant) |
| POST | `/select` | JWT | — | चर्च चुनें/बदलें। Body: `{ churchId }` या `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | चर्च को archive या unarchive करें |
| POST | `/byIds` | Public | — | IDs द्वारा कई चर्च लोड करें |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7+ दिनों से छोड़े गए चर्च हटाएं |

## Groups

Base path: `/membership/groups`

मानक CRUD को extend करता है (base class से GET `/`, GET `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी समूहों की सूची |
| GET | `/:id` | JWT | — | ID द्वारा समूह प्राप्त करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | service फ़िल्टर द्वारा समूह खोजें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के समूह प्राप्त करें |
| GET | `/my/:tag` | JWT | — | tag द्वारा फ़िल्टर किए गए वर्तमान उपयोगकर्ता के समूह प्राप्त करें |
| GET | `/tag/:tag` | JWT | — | किसी विशेष tag वाले सभी समूह प्राप्त करें |
| GET | `/public/:churchId/:id` | Public | — | चर्च और ID द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/tag/:tag` | Public | — | tag द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/label?label=` | Public | — | label द्वारा सार्वजनिक समूह प्राप्त करें |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug द्वारा सार्वजनिक समूह प्राप्त करें |
| POST | `/` | JWT | Groups.Edit | समूह बनाएं या अपडेट करें (slug स्वतः बनता है) |
| DELETE | `/:id` | JWT | Groups.Edit | समूह हटाएं (ministry groups के लिए child teams भी हटाता है) |

## Group Members

Base path: `/membership/groupmembers`

मानक CRUD को extend करता है (base class से GET `/:id`, DELETE `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID द्वारा group member प्राप्त करें |
| GET | `/` | JWT | GroupMembers.View* | group members की सूची। `?groupId=`, `?groupIds=`, या `?personId=` से फ़िल्टर करें। *यदि उपयोगकर्ता समूह में है या अपना personId क्वेरी कर रहा है तो भी अनुमति है |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की group memberships प्राप्त करें |
| GET | `/basic/:groupId` | JWT | — | किसी समूह की basic member सूची प्राप्त करें |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | समूह के leaders प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:groupId` | Public | — | समूह का सार्वजनिक roster प्राप्त करें (न्यूनतम फ़ील्ड: `personId`, `displayName`, `leader`, photo)। केवल तब जब समूह `publicRoster` के माध्यम से opt in करे; website builder के `staffGrid` element को शक्ति देता है |
| POST | `/` | JWT | GroupMembers.Edit | group members जोड़ें या अपडेट करें |
| DELETE | `/:id` | JWT | GroupMembers.View | group member हटाएं |

## Households

Base path: `/membership/households`

मानक CRUD controller।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी घरों की सूची |
| GET | `/:id` | JWT | — | ID द्वारा घर प्राप्त करें |
| POST | `/` | JWT | People.Edit | घर बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | People.Edit | घर हटाएं |

## Roles

Base path: `/membership/roles`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID द्वारा role प्राप्त करें |
| GET | `/church/:churchId` | JWT | Roles.View | किसी चर्च के सभी roles प्राप्त करें |
| POST | `/` | JWT | Roles.Edit | roles बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | role हटाएं (इसकी permissions और members को भी हटाता है) |

## Role Members

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी role के members प्राप्त करें। उपयोगकर्ता विवरण शामिल करने के लिए `?include=users` जोड़ें |
| POST | `/` | JWT | Roles.Edit | role में members जोड़ें (यदि email मौजूद नहीं है तो उपयोगकर्ता बनाता है) |
| DELETE | `/:id` | JWT | Roles.View | role member हटाएं |
| DELETE | `/self/:churchId/:userId` | JWT | — | स्वयं को किसी चर्च से हटाएं |

## Role Permissions

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी role की permissions प्राप्त करें ("Everyone" role के लिए ID के रूप में `null` उपयोग करें) |
| POST | `/` | JWT | Roles.Edit | role permissions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | role permission हटाएं |

## Permissions

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | उपलब्ध permissions की पूरी सूची प्राप्त करें |

## Forms

Base path: `/membership/forms`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सभी forms की सूची (admin सभी देखता है; editors को असाइन किए गए + non-member forms दिखते हैं) |
| GET | `/:id` | JWT | Form access | ID द्वारा form प्राप्त करें |
| GET | `/archived` | JWT | Forms.Admin या Forms.Edit | archived forms की सूची |
| GET | `/standalone/:id?churchId=` | JWT | — | standalone form प्राप्त करें (प्रतिबंधित forms के लिए प्रमाणीकरण आवश्यक) |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | forms बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Form access | form हटाएं |

## Form Submissions

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | submissions की सूची। `?personId=` या `?formId=` से फ़िल्टर करें |
| GET | `/:id` | JWT | Forms.Admin या Forms.Edit | ID द्वारा submission प्राप्त करें। `?include=form,questions,answers` जोड़ें |
| GET | `/formId/:formId` | JWT | Form access | किसी form की सभी submissions प्राप्त करें (form, questions, answers सहित) |
| POST | `/` | JWT | — | form answers सबमिट करें (प्रतिबंधित/अप्रतिबंधित forms संभालता है, email सूचनाएं भेजता है)। जब form में `autoCreatePerson` हो, तो email द्वारा Guest person खोजता या बनाता है और submission को जोड़ता है; जब `followUpSubject`/`followUpBody` सेट हों, तो submitter को templated follow-up email भेजता है |
| DELETE | `/:id` | JWT | Forms.Admin या Forms.Edit | submission और उसके answers हटाएं |

## Questions

Base path: `/membership/questions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | किसी form के questions की सूची। `?formId=` आवश्यक |
| GET | `/:id` | JWT | Form access | ID द्वारा question प्राप्त करें |
| GET | `/unrestricted?formId=` | JWT | — | अप्रतिबंधित form के questions प्राप्त करें |
| GET | `/sort/:id/up` | JWT | — | question को sort क्रम में ऊपर ले जाएं |
| GET | `/sort/:id/down` | JWT | — | question को sort क्रम में नीचे ले जाएं |
| POST | `/` | JWT | Form access | questions बनाएं या अपडेट करें (sort क्रम स्वतः असाइन करता है) |
| DELETE | `/:id?formId=` | JWT | Form access | question हटाएं |

## Answers

Base path: `/membership/answers`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | answers की सूची। `?formSubmissionId=` से फ़िल्टर करें |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | answers बनाएं या अपडेट करें |

## Member Permissions

Base path: `/membership/memberpermissions`

प्रति-सदस्य विशिष्ट forms तक पहुंच को नियंत्रित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | ID द्वारा member permission प्राप्त करें |
| GET | `/member/:id` | JWT | Form access | किसी सदस्य की सभी form permissions प्राप्त करें |
| GET | `/form/:id` | JWT | Form access | किसी form की सभी member permissions प्राप्त करें |
| GET | `/form/:id/my` | JWT | Form access | किसी form के लिए वर्तमान उपयोगकर्ता की permission प्राप्त करें |
| POST | `/` | JWT | Form access | member permissions बनाएं या अपडेट करें |
| DELETE | `/:id?formId=` | JWT | Form access | member permission हटाएं |
| DELETE | `/member/:id?formId=` | JWT | Form access | किसी form पर किसी सदस्य की सभी permissions हटाएं |

## Settings

Base path: `/membership/settings`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | चर्च की सभी settings प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च की सार्वजनिक settings प्राप्त करें |
| POST | `/` | JWT | Settings.Edit | settings सहेजें (base64 image upload का समर्थन) |

## Domains

Base path: `/membership/domains`

मानक CRUD को extend करता है (base class से GET `/:id`, GET `/`, DELETE `/:id`)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी domains की सूची |
| GET | `/:id` | JWT | — | ID द्वारा domain प्राप्त करें |
| GET | `/lookup/:domainName` | JWT | — | नाम द्वारा domain खोजें |
| GET | `/public/lookup/:domainName` | Public | — | नाम द्वारा सार्वजनिक domain खोज |
| GET | `/health/check` | Public | — | जांचे न गए domains पर health check चलाएं |
| POST | `/` | JWT | Settings.Edit | domains बनाएं या अपडेट करें (Caddy अपडेट trigger करता है) |
| DELETE | `/:id` | JWT | Settings.Edit | domain हटाएं |

## User Church

Base path: `/membership/userchurch`

उपयोगकर्ताओं और चर्चों के बीच संबंध का प्रबंधन करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | user ID द्वारा user-church रिकॉर्ड प्राप्त करें |
| GET | `/personid/:personId` | JWT | — | किसी person से जुड़े उपयोगकर्ता का email प्राप्त करें |
| GET | `/user/:userId` | JWT | Server.Admin | किसी उपयोगकर्ता के सभी चर्च लोड करें |
| POST | `/` | JWT | — | user-church संबंध बनाएं |
| PATCH | `/:userId` | JWT | — | अंतिम access समय अपडेट करें और access लॉग करें |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | user-church रिकॉर्ड हटाएं |

## Visibility Preferences

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की visibility preferences प्राप्त करें |
| POST | `/` | JWT | — | visibility preferences सहेजें (address, phone, email visibility) |

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

- [Authentication & Permissions](./authentication) -- लॉगिन फ़्लो, JWT, OAuth, अनुमति मॉडल
- [Attendance Endpoints](./attendance) -- सेवा और विज़िट ट्रैकिंग
- [Module Structure](../module-structure) -- कोड संगठन पैटर्न
