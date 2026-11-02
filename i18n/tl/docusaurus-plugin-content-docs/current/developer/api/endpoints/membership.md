---
title: "Mga Membership Endpoint"
---

# Mga Membership Endpoint

<div class="article-intro">

Pinamamahalaan ng Membership module ang mga tao, simbahan, grupo, household, role, permiso, form, at setting. Ito ang pinakamalaking module at nagbibigay ng pangunahing layer ng pagkakakilanlan at awtorisasyon para sa lahat ng iba pang module.

</div>

**Base path:** `/membership`

## Mga Tao

Base path: `/membership/people`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Ilista ang lahat ng tao ng simbahan |
| GET | `/:id` | JWT | People.View o sariling record | Kunin ang tao ayon sa ID (kasama ang mga form submission) |
| GET | `/ids?ids=` | JWT | People.View, Member, o People.ViewNames | Kunin ang maraming tao ayon sa mga ID na pinaghihiwalay ng kuwit. Ang mga caller na People.ViewNames na walang People.View ay nakakakuha ng basic model, at hindi kasama ang mga taong nag-opt out (maliban sa caller) |
| GET | `/basic?ids=` | JWT | — | Kunin ang basic na impormasyon (pangalan lang) para sa maraming tao |
| GET | `/names?ids=` | JWT | Anumang permiso sa simbahan | `[{ id, name: { display, first, last }, photo }]`, nakaayos ayon sa apelyido at pagkatapos unang pangalan, para sa mga ID na pinaghihiwalay ng kuwit na mayroon na ang caller, para ma-label ng mga role na walang People.View (donations, attendance) ang mga tao. Walang search, walang directory filter |
| POST | `/names` | JWT | Anumang permiso sa simbahan | Kapareho ng `GET /names`. Body: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, o People.ViewNames | Mga kamakailang idinagdag na tao. Ang mga caller na People.ViewNames na walang People.View (kahit mga miyembrong may access sa directory) ay nakakakuha ng basic model (`id`, `name.display`, `photo`, `membershipStatus`) at hindi kasama ang mga taong nag-opt out |
| GET | `/guest-register/options?churchId=` | Public | — | Checklist ng QR guest sign-up: nagbabalik ng `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, bawat isa ay `"off"`, `"optional"`, o `"required"` (binasa mula sa pampublikong setting na `guestRegistrationFields`; ang nawawala o sirang halaga ay babalik sa email/phone na optional, at naka-off ang iba). Kailangan ang `enableQRGuestRegistration` maliban kung may kasamang tugmang site/church token ang request; limitado ang rate (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, o People.ViewNames | Maghanap ng tao ayon sa pangalan o email (hanggang 100, nakaayos ayon sa apelyido at pagkatapos unang pangalan). Ang mga caller na People.ViewNames na walang People.View (kahit mga miyembrong may access sa directory) ay nakakakuha ng name search na nagbabalik ng basic model; ang `email` search ay nagbabalik ng `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Maghanap ayon sa numero ng telepono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Kunin ang mga tao sa isang partikular na grupo |
| GET | `/household/:householdId` | JWT | — | Kunin ang lahat ng tao sa isang household |
| GET | `/attendance` | JWT | People.Edit | I-load ang mga dumalo na may filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | I-load ang timeline data para sa mga tao at grupo |
| GET | `/directory/:id` | JWT | — | Kunin ang tao para sa directory view (sumusunod sa mga kagustuhan sa visibility) |
| GET | `/claim/:churchId` | JWT | — | I-claim ang person record para sa kasalukuyang user sa isang simbahan |
| POST | `/` | JWT | People.Edit o EditSelf | Gumawa o mag-update ng mga tao (batch) |
| POST | `/search` | JWT | People.View, Member, o People.ViewNames | Maghanap ng tao (POST variant). Body: `{ term }` o `{ email }`; kapareho ng mga names-only rule ng `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Paghahanap na maraming kondisyon (edad, birthMonth, membershipStatus, atbp.). Ang body ay array ng mga kondisyon; ang walang laman na body ay nangangahulugang walang kondisyon, at anumang ibang body na hindi array ay nagbabalik ng 400 |
| POST | `/loadOrCreate` | Public | — | Hanapin o gumawa ng tao ayon sa email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | QR guest sign-up. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 miyembro; ang email/phone/maritalStatus ay sa unang miyembro lang nalalapat). Ang mga field na in-off ng simbahan ay inaalis; ang nawawalang kinakailangang field o di-wastong halaga ay nagbabalik ng 400. Una, muling ginagamit ang mga umiiral na tao: tumutugma ang miyembro kapag eksaktong isang hindi naalis na tao ang may parehong first name (hindi case-sensitive) at parehong email o phone digits (bahay, trabaho, o mobile); ang miyembrong walang email o phone ay tumutugma ayon sa first name sa loob ng natugmang household. Hindi kailanman ini-edit ang mga natugmang tao. Ang hindi natugmang miyembro ay sumasali sa natugmang household, o kung wala, sa bagong household (pinangalanan ayon sa apelyido ng unang miyembro), bilang `membershipStatus: "Visitor"` na may ibinahaging `address`. Sine-save ang `comments` bilang note sa unang miyembro, idinadagdag ang lahat sa pribadong grupong `guestRegistrationGroupId` kung may nakatakda, at -- kapag ang `guestRegistrationRecordAttendance` ay `"true"` -- nire-record ang attendance para sa mga naka-iskedyul na service time ng grupong iyon na bukas ang check-in window sa sandaling ito. Nagbabalik ng `{ householdId, people: [{ id, name }] }`, inuulit ang mga isinumiteng pangalan sa halip na ang naka-imbak. Kaparehong opt-in/token at rate-limit rule ng options call |
| POST | `/household/:householdId` | JWT | People.Edit | I-update ang mga takda ng miyembro ng household |
| POST | `/public/email` | Public | — | Magpadala ng email sa isang tao. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | I-load ang mga email ng tao ayon sa mga ID (server-to-server, kailangan ang jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang tao |

### Halimbawa: Maghanap ng Mga Tao

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

### Halimbawa: Gumawa ng Tao

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Mga User {#users}

Base path: `/membership/users`

Tingnan ang [Authentication at Permissions](./authentication) para sa mga endpoint ng login, registration, at pamamahala ng password.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Mag-log in (email/password, JWT refresh, o authGuid) |
| POST | `/register` | Public | — | Magparehistro ng bagong user |
| POST | `/forgot` | Public | — | Magpadala ng password reset email |
| POST | `/setPasswordGuid` | Public | — | Magtakda ng password gamit ang auth GUID mula sa email link |
| POST | `/verifyCredentials` | Public | — | I-verify ang email/password at ibalik ang mga kaugnay na simbahan |
| POST | `/loadOrCreate` | JWT | — | Hanapin o gumawa ng user ayon sa email/userId |
| POST | `/setDisplayName` | JWT | — | I-update ang unang at apelyido ng user |
| POST | `/updateEmail` | JWT | — | Palitan ang email address ng user |
| POST | `/updatePassword` | JWT | — | Palitan ang password ng user (min 6 character) |
| POST | `/updateOptedOut` | JWT | — | Itakda ang opted-out status ng isang tao |
| POST | `/sendInviteEmail` | JWT | People.Edit | Magpadala ng imbitasyon sa email sa isang tao sa simbahang ito (`email`, `personName`, `contextName`). Ang butones ay nagbabasang **Sign Up** para sa taong walang account at **Log In** para sa umiiral na user. Ang user na hindi pa nakakapag-log in ay makakakuha ng link na **Set Your Password** na mag-e-expire sa loob ng 7 araw. Nakapirming template ito, kaya hindi ito binibilang sa araw-araw na limitasyon ng email ng simbahan |
| GET | `/search?term=` | JWT | Server.Admin | Maghanap ng lahat ng user ayon sa pangalan/email |
| DELETE | `/` | JWT | — | Burahin ang account ng kasalukuyang user |

## Mga Simbahan

Base path: `/membership/churches`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng simbahan ng kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang simbahan ayon sa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Kunin ang domain admin user ng isang simbahan |
| GET | `/:id/impersonate` | JWT | Server.Admin | I-impersonate ang isang simbahan (server admin lang) |
| GET | `/all?term=` | JWT | Server.Admin | Maghanap ng lahat ng simbahan (admin) |
| GET | `/search/?name=` | Public | — | Maghanap ng simbahan ayon sa pangalan |
| GET | `/lookup/?subDomain=&id=` | Public | — | Hanapin ang simbahan ayon sa subdomain o ID |
| POST | `/` | JWT | Settings.Edit | I-update ang detalye ng simbahan |
| POST | `/add` | JWT | — | Magparehistro ng bagong simbahan. Kailangang field: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Maghanap ng simbahan ayon sa pangalan (POST variant) |
| POST | `/select` | JWT | — | Piliin/lumipat sa isang simbahan. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | I-archive o i-unarchive ang isang simbahan |
| POST | `/byIds` | Public | — | I-load ang maraming simbahan ayon sa mga ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Burahin ang mga simbahang inabandona nang 7+ araw |

## Mga Grupo

Base path: `/membership/groups`

Nagmamana mula sa standard CRUD (GET `/`, GET `/:id` mula sa base class).

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng grupo |
| GET | `/:id` | JWT | — | Kunin ang grupo ayon sa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Maghanap ng grupo ayon sa mga filter ng serbisyo |
| GET | `/my` | JWT | — | Kunin ang mga grupo ng kasalukuyang user |
| GET | `/my/:tag` | JWT | — | Kunin ang mga grupo ng kasalukuyang user na sinala ayon sa tag |
| GET | `/tag/:tag` | JWT | — | Kunin ang lahat ng grupong may partikular na tag |
| GET | `/public/:churchId/:id` | Public | — | Kunin ang pampublikong grupo ayon sa simbahan at ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Kunin ang mga pampublikong grupo ayon sa tag |
| GET | `/public/:churchId/label?label=` | Public | — | Kunin ang mga pampublikong grupo ayon sa label |
| GET | `/public/:churchId/slug/:slug` | Public | — | Kunin ang pampublikong grupo ayon sa slug |
| POST | `/` | JWT | Groups.Edit | Gumawa o mag-update ng mga grupo (awtomatikong gumagawa ng slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Burahin ang grupo (binubura rin ang mga child team para sa ministry group) |

## Mga Miyembro ng Grupo

Base path: `/membership/groupmembers`

Nagmamana mula sa standard CRUD (GET `/:id`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Kunin ang miyembro ng grupo ayon sa ID |
| GET | `/` | JWT | GroupMembers.View* | Ilista ang mga miyembro ng grupo. I-filter gamit ang `?groupId=`, `?groupIds=`, o `?personId=`. *Pinapayagan din kung ang user ay nasa grupo o nagta-query ng sariling personId, at para sa `?groupId=` ng alinmang hindi kumpidensyal na grupo kapag may Attendance.View o Attendance.Edit ang user (kasama ang mga miyembrong wala pang 13 para sa kanila) |
| GET | `/my` | JWT | — | Kunin ang mga membership sa grupo ng kasalukuyang user |
| GET | `/basic/:groupId` | JWT | — | Kunin ang basic na listahan ng miyembro ng isang grupo |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Kunin ang mga leader ng grupo (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Kunin ang pampublikong roster ng grupo (minimal na field: `personId`, `displayName`, `leader`, photo). Lumalabas lang kapag pumayag ang grupo sa pamamagitan ng `publicRoster`; nagpapagana sa `staffGrid` element ng website builder |
| POST | `/` | JWT | GroupMembers.Edit | Magdagdag o mag-update ng mga miyembro ng grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Alisin ang miyembro ng grupo |

## Mga Household

Base path: `/membership/households`

Standard na CRUD controller.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng household |
| GET | `/:id` | JWT | — | Kunin ang household ayon sa ID |
| POST | `/` | JWT | People.Edit | Gumawa o mag-update ng mga household |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang household |

## Mga Role

Base path: `/membership/roles`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Kunin ang role ayon sa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Kunin ang lahat ng role ng isang simbahan. Bawat role ay may kasamang `memberCount`, ang bilang ng magkakaibang user dito |
| POST | `/` | JWT | Roles.Edit | Gumawa o mag-update ng mga role |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang role (inaalis din ang mga permiso at miyembro nito) |

## Mga Miyembro ng Role

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga miyembro ng isang role. Idagdag ang `?include=users` para isama ang detalye ng user |
| POST | `/` | JWT | Roles.Edit | Magdagdag ng mga miyembro sa isang role (gumagawa ng user kung hindi pa umiiral ang email) |
| DELETE | `/:id` | JWT | Roles.View | Alisin ang miyembro ng role |
| DELETE | `/self/:churchId/:userId` | JWT | — | Alisin ang sarili mo sa isang simbahan |

## Mga Permiso ng Role

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga permiso ng isang role (gamitin ang `null` bilang ID para sa role na "Everyone") |
| POST | `/` | JWT | Roles.Edit | Gumawa o mag-update ng mga permiso ng role |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang permiso ng role |

## Mga Permiso

Base path: `/membership/permissions`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang buong listahan ng mga available na permiso |

Bawat entry ay may `apiName`, `section` (content type), `action`, at ang mga label na `displaySection` / `displayAction` na ipinapakita ng role editor ng B1Admin. Mga kamakailang dagdag: `MembershipApi` / `People` / `View Names` (**View People Names Only**, sa ilalim ng People and Groups) at `GivingApi` / `Donations` / `Enter` (**Enter Donations**, sa ilalim ng Donations; tingnan ang [Donation Batches](./giving.md#donation-batches)).

## Mga Form

Base path: `/membership/forms`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang lahat ng form (nakikita ng admin ang lahat; nakikita ng editor ang mga naitakda at ang mga non-member na form) |
| GET | `/:id` | JWT | Access sa form | Kunin ang form ayon sa ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga naka-archive na form |
| GET | `/group/:groupId` | JWT | Miyembro ng grupo, leader ng grupo, o Forms.Admin | Mga stand-alone na form na naka-link sa grupo (`forms.groupId`), hindi kasama ang mga naka-archive, nakaayos ayon sa pangalan. Nagbabalik ng `id`, `name`, `description`, at `open` (nasa loob ng availability window). Ang mga miyembro ay mga bukas na form lang ang nakukuha; ang mga leader at forms admin ay nakakakuha rin ng sarado. Sumusuporta sa linked forms ng pahina ng grupo |
| GET | `/standalone/:id?churchId=` | JWT | — | Kunin ang standalone na form (kailangan ng auth ang mga restricted na form) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Gumawa o mag-update ng mga form. Tumatanggap ang mga stand-alone na form ng opsyonal na `photoUrl` (header photo na ipinapakita sa itaas ng form) at `groupId` (naka-link na grupo) |
| DELETE | `/:id` | JWT | Access sa form | Burahin ang form |

## Mga Form Submission

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga submission. I-filter gamit ang `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Nakatuon sa sarili: hanggang 50 stand-alone na form submission (hindi person form) na isinumite ng naka-sign in na miyembro o naka-link sa kanilang tao (`contentType` `person`, `contentId` = ID ng kanilang tao -- halimbawa, pagkatapos ng change person ng admin), pinakabago muna, bawat isa ay may `form.name`. Ikinakabit ng `include` ang mga tanong ng bawat form at ang mga sagot ng submission. Nagbabalik ng `401` kung hindi naka-link ang user sa isang tao. Sumusuporta sa seksyong **My Forms** ng B1 Me page |
| GET | `/group/:groupId` | JWT | Leader ng grupo | Mga sagot para sa mga leader ng grupo: isang entry bawat naka-link na form at bawat group event na may registration form, bawat isa ay may `form`, `event` (`id`, `title`, `start`; event entry lang), `questions`, at `submissions` (kasama ang `answers` at `personName`, `null` kapag anonymous) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, o view access | Kunin ang submission ayon sa ID. Idagdag ang `?include=form,questions,answers`. Maaari ring basahin ito ng mga leader ng naka-link na grupo ng form, at ng mga leader ng grupong kinabibilangan ng event registration |
| GET | `/formId/:formId` | JWT | Access sa form (view) | Kunin ang lahat ng submission para sa isang form (kasama ang form, questions, answers). May view access ang mga leader ng naka-link na grupo ng form |
| POST | `/` | JWT | — | Isumite ang mga sagot sa form (humahawak sa restricted/unrestricted na form, nagpapadala ng email notification). Kapag may `autoCreatePerson` ang form, hahanapin o gagawa ng Guest na tao ayon sa email at ili-link ang submission; kapag may `groupId` din ang form, idaragdag ang taong iyon sa grupo; kapag may nakatakda na `followUpSubject`/`followUpBody`, magpapadala ng nakatemplate na follow-up email sa nagsumite. Maliban kung kayang pamahalaan ng caller ang form, palaging nakatakda ang `submittedBy` sa tao ng naka-sign in na miyembro (o nananatiling blangko para sa anonymous na submission) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Burahin ang submission at ang mga sagot nito |

## Mga Tanong

Base path: `/membership/questions`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Access sa form | Ilista ang mga tanong ng isang form. Kailangan ang `?formId=` |
| GET | `/:id` | JWT | Access sa form | Kunin ang tanong ayon sa ID |
| GET | `/unrestricted?formId=` | JWT | — | Kunin ang mga tanong para sa unrestricted na form |
| GET | `/sort/:id/up` | JWT | — | Ilipat pataas ang tanong sa sort order |
| GET | `/sort/:id/down` | JWT | — | Ilipat pababa ang tanong sa sort order |
| POST | `/` | JWT | Access sa form | Gumawa o mag-update ng mga tanong (awtomatikong nagtatakda ng sort order) |
| DELETE | `/:id?formId=` | JWT | Access sa form | Burahin ang tanong |

## Mga Sagot

Base path: `/membership/answers`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga sagot. I-filter gamit ang `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Gumawa o mag-update ng mga sagot |

## Mga Permiso ng Miyembro

Base path: `/membership/memberpermissions`

Kinokontrol ang access ng bawat miyembro sa mga partikular na form.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Access sa form | Kunin ang permiso ng miyembro ayon sa ID |
| GET | `/member/:id` | JWT | Access sa form | Kunin ang lahat ng permiso sa form ng isang miyembro |
| GET | `/form/:id` | JWT | Access sa form | Kunin ang lahat ng permiso ng miyembro para sa isang form |
| GET | `/form/:id/my` | JWT | Access sa form | Kunin ang permiso ng kasalukuyang user para sa isang form |
| POST | `/` | JWT | Access sa form | Gumawa o mag-update ng mga permiso ng miyembro |
| DELETE | `/:id?formId=` | JWT | Access sa form | Burahin ang permiso ng miyembro |
| DELETE | `/member/:id?formId=` | JWT | Access sa form | Burahin ang lahat ng permiso ng isang miyembro sa isang form |

## Mga Setting

Base path: `/membership/settings`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting ng simbahan |
| GET | `/public/:churchId` | Public | — | Kunin ang pampublikong setting ng isang simbahan |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting (sumusuporta sa base64 image upload) |

## Mga Domain

Base path: `/membership/domains`

Nagmamana mula sa standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng domain |
| GET | `/:id` | JWT | — | Kunin ang domain ayon sa ID |
| GET | `/lookup/:domainName` | JWT | — | Hanapin ang domain ayon sa pangalan |
| GET | `/public/lookup/:domainName` | Public | — | Pampublikong paghahanap ng domain ayon sa pangalan |
| GET | `/health/check` | Public | — | Magpatakbo ng health check sa mga domain na hindi pa nasusuri |
| POST | `/` | JWT | Settings.Edit | Gumawa o mag-update ng mga domain (nagti-trigger ng pag-update ng Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang domain |

## User Church

Base path: `/membership/userchurch`

Pinamamahalaan ang ugnayan sa pagitan ng mga user at simbahan.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Kunin ang user-church record ayon sa user ID |
| GET | `/personid/:personId` | JWT | — | Kunin ang email ng naka-link na user ng isang tao |
| GET | `/user/:userId` | JWT | Server.Admin | I-load ang lahat ng simbahan ng isang user |
| POST | `/` | JWT | — | Gumawa ng user-church association |
| PATCH | `/:userId` | JWT | — | I-update ang huling oras ng access at itala ang access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Burahin ang user-church record |

## Mga Kagustuhan sa Visibility

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga kagustuhan sa visibility ng kasalukuyang user |
| POST | `/` | JWT | — | I-save ang mga kagustuhan sa visibility (visibility ng address, telepono, email) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Paghahanap ng miyembro gamit ang natural na wika sa tulong ng AI. Body: `{ text, subDomain, siteUrl }` |

## Mga Client Error

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | I-log ang client-side na error |

## Mga Kaugnay na Pahina

- [Authentication at Permissions](./authentication) — Daloy ng login, JWT, OAuth, modelo ng permiso
- [Attendance Endpoints](./attendance) — Pagsubaybay sa serbisyo at pagbisita
- [Module Structure](../module-structure) — Mga pattern ng organisasyon ng code
