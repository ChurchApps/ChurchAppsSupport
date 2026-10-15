---
title: "Membership Endpoints"
---

# Membership Endpoints

<div class="article-intro">

Membership module लोगों, churches, groups, households, roles, permissions, forms, और settings को प्रबंधित करता है। यह सबसे बड़ा module है और बाकी सभी modules के लिए मुख्य पहचान और authorization layer प्रदान करता है।

</div>

**Base path:** `/membership`

## People

Base path: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View या Member | church के सभी लोगों की सूची |
| GET | `/:id` | JWT | People.View या own record | ID द्वारा एक व्यक्ति प्राप्त करें (form submissions सहित) |
| GET | `/ids?ids=` | JWT | People.View या Member | comma-separated IDs द्वारा कई लोग प्राप्त करें |
| GET | `/basic?ids=` | JWT | — | कई लोगों की basic जानकारी (केवल नाम) प्राप्त करें |
| GET | `/names?ids=` | JWT | कोई भी church permission | caller के पास पहले से मौजूद comma-separated ids के लिए `[{ id, name: { display }, photo }]`, ताकि People.View के बिना roles (donations, attendance) लोगों को label कर सकें। कोई search नहीं, कोई directory filter नहीं |
| POST | `/names` | JWT | कोई भी church permission | `GET /names` के समान। Body: `{ peopleIds }` (या `{ ids }`) |
| GET | `/recent` | JWT | People.View या Member | हाल में जोड़े गए लोग |
| GET | `/search?term=&email=` | JWT | People.View या Member | नाम या email से लोगों को खोजें |
| GET | `/search/phone?number=` | JWT | People.View या Member | phone number से खोजें |
| GET | `/search/group?groupId=` | JWT | People.View या Member | किसी विशिष्ट group के लोग प्राप्त करें |
| GET | `/household/:householdId` | JWT | — | किसी household के सभी लोग प्राप्त करें |
| GET | `/attendance` | JWT | People.Edit | filters (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) के साथ attendees लोड करें |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | लोगों और groups के लिए timeline डेटा लोड करें |
| GET | `/directory/:id` | JWT | — | directory view के लिए व्यक्ति प्राप्त करें (visibility preferences का सम्मान करता है) |
| GET | `/claim/:churchId` | JWT | — | किसी church में वर्तमान user के लिए एक person record claim करें |
| POST | `/` | JWT | People.Edit या EditSelf | लोग बनाएं या अपडेट करें (batch) |
| POST | `/search` | JWT | People.View या Member | लोगों को खोजें (POST variant) |
| POST | `/advancedSearch` | JWT | People.View या Member | बहु-शर्त खोज (age, birthMonth, membershipStatus, आदि) |
| POST | `/loadOrCreate` | Public | — | email द्वारा व्यक्ति खोजें या बनाएं। Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | household member assignments अपडेट करें |
| POST | `/public/email` | Public | — | किसी व्यक्ति को email भेजें। Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | IDs द्वारा व्यक्तियों के emails लोड करें (server-to-server, jwtSecret आवश्यक) |
| DELETE | `/:id` | JWT | People.Edit | किसी व्यक्ति को हटाएं |

### Example: लोगों को खोजना

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

### Example: व्यक्ति बनाना

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Users

Base path: `/membership/users`

login, registration, और password management endpoints के लिए [Authentication & Permissions](./authentication) देखें।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | log in करें (email/password, JWT refresh, या authGuid) |
| POST | `/register` | Public | — | एक नया user register करें |
| POST | `/forgot` | Public | — | password reset email भेजें |
| POST | `/setPasswordGuid` | Public | — | email link के auth GUID से password सेट करें |
| POST | `/verifyCredentials` | Public | — | email/password सत्यापित करें और संबंधित churches लौटाएं |
| POST | `/loadOrCreate` | JWT | — | email/userId द्वारा user खोजें या बनाएं |
| POST | `/setDisplayName` | JWT | — | user का पहला और अंतिम नाम अपडेट करें |
| POST | `/updateEmail` | JWT | — | user का email address बदलें |
| POST | `/updatePassword` | JWT | — | user का password बदलें (न्यूनतम 6 अक्षर) |
| POST | `/updateOptedOut` | JWT | — | किसी व्यक्ति की opted-out स्थिति सेट करें |
| POST | `/sendInviteEmail` | JWT | People.Edit | इस church के किसी व्यक्ति को invite email भेजें (`email`, `personName`, `contextName`)। जिस व्यक्ति का account नहीं है उसके लिए बटन **Sign Up** और मौजूदा user के लिए **Log In** लिखा होता है। जिस user ने कभी log in नहीं किया, उसे इसके बजाय 7 दिनों में समाप्त होने वाला **Set Your Password** link मिलता है। church की daily email limit में गिना जाता है (पहुंचने पर `429`) |
| GET | `/search?term=` | JWT | Server.Admin | नाम/email से सभी users खोजें |
| DELETE | `/` | JWT | — | वर्तमान user account हटाएं |

## Churches

Base path: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान user के लिए सभी churches लोड करें |
| GET | `/:id` | JWT | — | ID द्वारा church प्राप्त करें |
| GET | `/:id/getDomainAdmin` | JWT | — | किसी church का domain admin user प्राप्त करें |
| GET | `/:id/impersonate` | JWT | Server.Admin | किसी church का impersonate करें (केवल server admin) |
| GET | `/all?term=` | JWT | Server.Admin | सभी churches खोजें (admin) |
| GET | `/search/?name=` | Public | — | नाम से churches खोजें |
| GET | `/lookup/?subDomain=&id=` | Public | — | subdomain या ID द्वारा church खोजें |
| POST | `/` | JWT | Settings.Edit | church विवरण अपडेट करें |
| POST | `/add` | JWT | — | नया church register करें। आवश्यक fields: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | नाम से churches खोजें (POST variant) |
| POST | `/select` | JWT | — | church चुनें/बदलें। Body: `{ churchId }` या `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | church archive या unarchive करें |
| POST | `/byIds` | Public | — | IDs द्वारा कई churches लोड करें |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7+ दिनों से छोड़े गए churches हटाएं |

## Groups

Base path: `/membership/groups`

standard CRUD का विस्तार (base class से GET `/`, GET `/:id`)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी groups की सूची |
| GET | `/:id` | JWT | — | ID द्वारा group प्राप्त करें |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | service filters द्वारा groups खोजें |
| GET | `/my` | JWT | — | वर्तमान user के groups प्राप्त करें |
| GET | `/my/:tag` | JWT | — | वर्तमान user के groups को tag द्वारा filter करके प्राप्त करें |
| GET | `/tag/:tag` | JWT | — | किसी विशिष्ट tag वाले सभी groups प्राप्त करें |
| GET | `/public/:churchId/:id` | Public | — | church और ID द्वारा एक सार्वजनिक group प्राप्त करें |
| GET | `/public/:churchId/tag/:tag` | Public | — | tag द्वारा सार्वजनिक groups प्राप्त करें |
| GET | `/public/:churchId/label?label=` | Public | — | label द्वारा सार्वजनिक groups प्राप्त करें |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug द्वारा एक सार्वजनिक group प्राप्त करें |
| POST | `/` | JWT | Groups.Edit | groups बनाएं या अपडेट करें (slug अपने-आप बनाता है) |
| DELETE | `/:id` | JWT | Groups.Edit | group हटाएं (ministry groups के child teams भी हटाता है) |

## Group Members

Base path: `/membership/groupmembers`

standard CRUD का विस्तार (base class से GET `/:id`, DELETE `/:id`)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID द्वारा group member प्राप्त करें |
| GET | `/` | JWT | GroupMembers.View* | group members की सूची। `?groupId=`, `?groupIds=`, या `?personId=` से filter करें। *यदि user group में है या अपना personId पूछ रहा है तो भी अनुमति है |
| GET | `/my` | JWT | — | वर्तमान user की group memberships प्राप्त करें |
| GET | `/basic/:groupId` | JWT | — | किसी group की basic member सूची प्राप्त करें |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | group leaders प्राप्त करें (सार्वजनिक) |
| GET | `/public/:churchId/:groupId` | Public | — | group का सार्वजनिक roster प्राप्त करें (न्यूनतम fields: `personId`, `displayName`, `leader`, photo)। केवल तभी जब group `publicRoster` के माध्यम से opt in करे; website builder के `staffGrid` element को सपोर्ट करता है |
| POST | `/` | JWT | GroupMembers.Edit | group members जोड़ें या अपडेट करें |
| DELETE | `/:id` | JWT | GroupMembers.View | group member हटाएं |

## Households

Base path: `/membership/households`

standard CRUD controller।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी households की सूची |
| GET | `/:id` | JWT | — | ID द्वारा household प्राप्त करें |
| POST | `/` | JWT | People.Edit | households बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | People.Edit | household हटाएं |

## Roles

Base path: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID द्वारा role प्राप्त करें |
| GET | `/church/:churchId` | JWT | Roles.View | किसी church के सभी roles प्राप्त करें |
| POST | `/` | JWT | Roles.Edit | roles बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | role हटाएं (उसकी permissions और members भी हटाता है) |

## Role Members

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी role के members प्राप्त करें। user विवरण शामिल करने के लिए `?include=users` जोड़ें |
| POST | `/` | JWT | Roles.Edit | किसी role में members जोड़ें (यदि email मौजूद नहीं है तो user बनाता है) |
| DELETE | `/:id` | JWT | Roles.View | role member हटाएं |
| DELETE | `/self/:churchId/:userId` | JWT | — | स्वयं को किसी church से हटाएं |

## Role Permissions

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | किसी role की permissions प्राप्त करें ("Everyone" role के लिए ID के रूप में `null` उपयोग करें) |
| POST | `/` | JWT | Roles.Edit | role permissions बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Roles.Edit | role permission हटाएं |

## Permissions

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | उपलब्ध permissions की पूरी सूची प्राप्त करें |

## Forms

Base path: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | सभी forms की सूची (admin सभी देखता है; editors को assigned + non-member forms दिखते हैं) |
| GET | `/:id` | JWT | Form access | ID द्वारा एक form प्राप्त करें |
| GET | `/archived` | JWT | Forms.Admin या Forms.Edit | archived forms की सूची |
| GET | `/standalone/:id?churchId=` | JWT | — | एक standalone form प्राप्त करें (restricted forms के लिए auth आवश्यक) |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | forms बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Form access | form हटाएं |

## Form Submissions

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | submissions की सूची। `?personId=` या `?formId=` से filter करें |
| GET | `/:id` | JWT | Forms.Admin या Forms.Edit | ID द्वारा submission प्राप्त करें। `?include=form,questions,answers` जोड़ें |
| GET | `/formId/:formId` | JWT | Form access | किसी form के सभी submissions प्राप्त करें (form, questions, answers सहित) |
| POST | `/` | JWT | — | form answers submit करें (restricted/unrestricted forms संभालता है, email notifications भेजता है)। जब form में `autoCreatePerson` हो, तो email से Guest व्यक्ति खोजता या बनाता है और submission को जोड़ता है; जब `followUpSubject`/`followUpBody` सेट हों, तो submitter को template वाला follow-up email भेजता है |
| DELETE | `/:id` | JWT | Forms.Admin या Forms.Edit | submission और उसके answers हटाएं |

## Questions

Base path: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | किसी form के questions की सूची। `?formId=` आवश्यक |
| GET | `/:id` | JWT | Form access | ID द्वारा एक question प्राप्त करें |
| GET | `/unrestricted?formId=` | JWT | — | unrestricted form के questions प्राप्त करें |
| GET | `/sort/:id/up` | JWT | — | sort order में question को ऊपर ले जाएं |
| GET | `/sort/:id/down` | JWT | — | sort order में question को नीचे ले जाएं |
| POST | `/` | JWT | Form access | questions बनाएं या अपडेट करें (sort order अपने-आप देता है) |
| DELETE | `/:id?formId=` | JWT | Form access | question हटाएं |

## Answers

Base path: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin या Forms.Edit | answers की सूची। `?formSubmissionId=` से filter करें |
| POST | `/` | JWT | Forms.Admin या Forms.Edit | answers बनाएं या अपडेट करें |

## Member Permissions

Base path: `/membership/memberpermissions`

हर member की विशिष्ट forms तक पहुंच नियंत्रित करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | ID द्वारा member permission प्राप्त करें |
| GET | `/member/:id` | JWT | Form access | किसी member की सभी form permissions प्राप्त करें |
| GET | `/form/:id` | JWT | Form access | किसी form की सभी member permissions प्राप्त करें |
| GET | `/form/:id/my` | JWT | Form access | किसी form के लिए वर्तमान user की permission प्राप्त करें |
| POST | `/` | JWT | Form access | member permissions बनाएं या अपडेट करें |
| DELETE | `/:id?formId=` | JWT | Form access | member permission हटाएं |
| DELETE | `/member/:id?formId=` | JWT | Form access | किसी form पर किसी member की सभी permissions हटाएं |

## Settings

Base path: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | church की सभी settings प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी church की public settings प्राप्त करें |
| POST | `/` | JWT | Settings.Edit | settings सहेजें (base64 image upload का समर्थन) |

## Domains

Base path: `/membership/domains`

standard CRUD का विस्तार (base class से GET `/:id`, GET `/`, DELETE `/:id`)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | सभी domains की सूची |
| GET | `/:id` | JWT | — | ID द्वारा domain प्राप्त करें |
| GET | `/lookup/:domainName` | JWT | — | नाम द्वारा domain खोजें |
| GET | `/public/lookup/:domainName` | Public | — | नाम द्वारा सार्वजनिक domain खोज |
| GET | `/health/check` | Public | — | जांचे न गए domains पर health check चलाएं |
| POST | `/` | JWT | Settings.Edit | domains बनाएं या अपडेट करें (Caddy update ट्रिगर करता है) |
| DELETE | `/:id` | JWT | Settings.Edit | domain हटाएं |

## User Church

Base path: `/membership/userchurch`

users और churches के बीच संबंध प्रबंधित करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | user ID द्वारा user-church record प्राप्त करें |
| GET | `/personid/:personId` | JWT | — | किसी व्यक्ति के linked user का email प्राप्त करें |
| GET | `/user/:userId` | JWT | Server.Admin | किसी user के सभी churches लोड करें |
| POST | `/` | JWT | — | user-church association बनाएं |
| PATCH | `/:userId` | JWT | — | अंतिम access समय अपडेट करें और access लॉग करें |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | user-church record हटाएं |

## Visibility Preferences

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान user की visibility preferences प्राप्त करें |
| POST | `/` | JWT | — | visibility preferences सहेजें (address, phone, email visibility) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI का उपयोग करके प्राकृतिक भाषा में सदस्य खोज। Body: `{ text, subDomain, siteUrl }` |

## Client Errors

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | client-side त्रुटि लॉग करें |

## संबंधित पेज

- [Authentication & Permissions](./authentication) — Login flow, JWT, OAuth, permission model
- [Attendance Endpoints](./attendance) — Service और visit tracking
- [Module Structure](../module-structure) — Code organization patterns
