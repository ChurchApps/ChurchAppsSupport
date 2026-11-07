---
title: "Mga Endpoint ng Membership"
description: "Sanggunian ng endpoint para sa ChurchApps Membership API: tao, sambahayan, grupo, tungkulin, form, at setting, kasama ang auth at permission rules."
---

# Mga Endpoint ng Membership

<div class="article-intro">

Pinamamahalaan ng Membership module ang mga tao, simbahan, grupo, sambahayan, tungkulin, pahintulot, form, at settings. Ito ang pinakamalaking module at nagbibigay ng pangunahing layer ng pagkakakilanlan at awtorisasyon para sa lahat ng iba pang module.

</div>

**Batayang path:** `/membership`

## People

Batayang path: `/membership/people`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | People.View o Member | Ilista ang lahat ng tao para sa simbahan |
| GET | `/:id` | JWT | People.View o sariling record | Kunin ang isang tao ayon sa ID (kasama ang mga form submission) |
| GET | `/ids?ids=` | JWT | People.View, Member, o People.ViewNames | Kunin ang maraming tao ayon sa mga ID na pinaghihiwalay ng kuwit. Ang mga tumatawag na may People.ViewNames pero walang People.View ay nakakakuha ng basic model, at hindi kasama ang mga taong nag-opt out (maliban sa tumatawag) |
| GET | `/basic?ids=` | JWT | — | Kunin ang basic na impormasyon (pangalan lamang) ng maraming tao |
| GET | `/names?ids=` | JWT | Anumang pahintulot sa simbahan | `[{ id, name: { display, first, last }, photo }]`, nakaayos ayon sa apelyido at pagkatapos ayon sa unang pangalan, para sa mga id na pinaghihiwalay ng kuwit na mayroon na ang tumatawag, upang ang mga tungkulin na walang People.View (donations, attendance) ay makapaglagay ng pangalan sa mga tao. Walang search at walang directory filter |
| POST | `/names` | JWT | Anumang pahintulot sa simbahan | Katulad ng `GET /names`. Body: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, o People.ViewNames | Mga kamakailang idinagdag na tao. Ang mga tumatawag na may People.ViewNames pero walang People.View (kahit mga miyembrong may access sa directory) ay nakakakuha ng basic model (`id`, `name.display`, `photo`, `membershipStatus`) at hindi kasama ang mga nag-opt out |
| GET | `/guest-register/options?churchId=` | Publiko | — | Checklist ng QR guest sign-up: nagbabalik ng `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, na ang bawat isa ay `"off"`, `"optional"`, o `"required"` (kinukuha mula sa pampublikong setting na `guestRegistrationFields`; ang nawawala o maling value ay babalik sa email/phone bilang optional, at ang iba ay naka-off). Kailangan ang `enableQRGuestRegistration` maliban kung may kasamang tumutugmang site/church token ang request; may rate limit (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, o People.ViewNames | Maghanap ng tao ayon sa pangalan o email (hanggang 100, nakaayos ayon sa apelyido at pagkatapos ayon sa unang pangalan). Ang mga tumatawag na may People.ViewNames pero walang People.View (kahit mga miyembrong may access sa directory) ay nakakakuha ng paghahanap ayon sa pangalan na nagbabalik ng basic model; ang paghahanap ayon sa `email` ay nagbabalik ng `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Maghanap ayon sa numero ng telepono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Kunin ang mga tao sa isang partikular na grupo |
| GET | `/household/:householdId` | JWT | — | Kunin ang lahat ng tao sa isang sambahayan |
| GET | `/attendance` | JWT | People.Edit | I-load ang mga dumalo gamit ang mga filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | I-load ang timeline data para sa mga tao at grupo |
| GET | `/directory/:id` | JWT | — | Kunin ang tao para sa directory view (sinusunod ang mga kagustuhan sa visibility) |
| GET | `/claim/:churchId` | JWT | — | I-claim ang record ng tao para sa kasalukuyang user sa isang simbahan |
| POST | `/` | JWT | People.Edit o EditSelf | Lumikha o mag-update ng mga tao (batch) |
| POST | `/search` | JWT | People.View, Member, o People.ViewNames | Maghanap ng tao (POST variant). Body: `{ term }` o `{ email }`; kapareho ng mga patakaran sa pangalan lamang ng `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Paghahanap na may maraming kondisyon (edad, birthMonth, membershipStatus, atbp.). Ang body ay isang array ng mga kondisyon; ang walang lamang body ay nangangahulugang walang kondisyon, at anumang ibang body na hindi array ay nagbabalik ng 400 |
| POST | `/loadOrCreate` | Publiko | — | Hanapin o gumawa ng tao ayon sa email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Publiko | — | QR guest sign-up. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 miyembro; ang email/phone/maritalStatus ay para lamang sa unang miyembro). Ang mga field na pinatay ng simbahan ay tinatanggal; ang nawawala o hindi wastong kinakailangang value ay nagbabalik ng 400. Una, ginagamit muli ang mga umiiral na tao: tumutugma ang isang miyembro kapag eksaktong isang hindi tinanggal na tao ang may parehong unang pangalan (hindi sensitibo sa case) at parehong email o mga digit ng telepono (home, work, o mobile); ang miyembrong walang email o telepono ay tumutugma ayon sa unang pangalan sa loob ng tumugmang sambahayan. Hindi kailanman ine-edit ang mga tumugmang tao. Ang mga hindi tumugmang miyembro ay sumasali sa tumugmang sambahayan, o kung wala, sa bagong sambahayan (pinangalanan ayon sa apelyido ng unang miyembro), bilang `membershipStatus: "Visitor"` na may kaparehong `address`. Sine-save ang `comments` bilang tala sa unang miyembro, idinaragdag ang lahat sa pribadong grupong `guestRegistrationGroupId` kung may nakatakda, at — kapag ang `guestRegistrationRecordAttendance` ay `"true"` — nire-record ang attendance para sa mga naka-iskedyul na service time ng grupong iyon na bukas pa ang check-in window ngayon. Nagbabalik ng `{ householdId, people: [{ id, name }] }`, inuulit ang mga isinumiteng pangalan sa halip na ang mga naka-imbak. Pareho ang opt-in/token at mga patakaran sa rate limit ng options call |
| POST | `/household/:householdId` | JWT | People.Edit | I-update ang mga assignment ng miyembro ng sambahayan |
| POST | `/public/email` | Publiko | — | Magpadala ng email sa isang tao. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | I-load ang mga email ng tao ayon sa mga ID (server-to-server, nangangailangan ng jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang isang tao |

### Halimbawa: Maghanap ng Tao

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

## Users

Batayang path: `/membership/users`

Tingnan ang [Authentication at Mga Pahintulot](./authentication.md) para sa mga endpoint ng login, registration, at pamamahala ng password.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| POST | `/login` | Publiko | — | Mag-log in (email/password, JWT refresh, o authGuid) |
| POST | `/register` | Publiko | — | Magparehistro ng bagong user |
| POST | `/forgot` | Publiko | — | Magpadala ng email para sa pag-reset ng password |
| POST | `/setPasswordGuid` | Publiko | — | Magtakda ng password gamit ang auth GUID mula sa link sa email |
| POST | `/verifyCredentials` | Publiko | — | I-verify ang email/password at ibalik ang mga kaugnay na simbahan |
| POST | `/loadOrCreate` | JWT | — | Hanapin o gumawa ng user ayon sa email/userId |
| POST | `/setDisplayName` | JWT | — | I-update ang unang pangalan at apelyido ng user |
| POST | `/updateEmail` | JWT | — | Palitan ang email address ng user |
| POST | `/updatePassword` | JWT | — | Palitan ang password ng user (min 6 na character) |
| POST | `/updateOptedOut` | JWT | — | Itakda ang opted-out status ng isang tao |
| POST | `/sendInviteEmail` | JWT | People.Edit | Magpadala ng imbitasyon sa email sa isang tao sa simbahang ito (`email`, `personName`, `contextName`). Ang button ay nagbabasa ng **Sign Up** para sa taong walang account at **Log In** para sa umiiral na user. Ang user na hindi pa nakapag-log in ay makakatanggap ng link na **Set Your Password** na mag-e-expire sa loob ng 7 araw. Isa itong nakapirming template, kaya hindi ito binibilang sa pang-araw-araw na limitasyon ng email ng simbahan |
| GET | `/search?term=` | JWT | Server.Admin | Maghanap ng lahat ng user ayon sa pangalan/email |
| DELETE | `/` | JWT | — | Burahin ang kasalukuyang account ng user |

## Churches

Batayang path: `/membership/churches`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | — | I-load ang lahat ng simbahan para sa kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang simbahan ayon sa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Kunin ang domain admin user para sa isang simbahan |
| GET | `/:id/impersonate` | JWT | Server.Admin | I-impersonate ang isang simbahan (server admin lamang) |
| GET | `/all?term=` | JWT | Server.Admin | Maghanap ng lahat ng simbahan (admin) |
| GET | `/search/?name=` | Publiko | — | Maghanap ng simbahan ayon sa pangalan |
| GET | `/lookup/?subDomain=&id=` | Publiko | — | Hanapin ang simbahan ayon sa subdomain o ID |
| POST | `/` | JWT | Settings.Edit | I-update ang detalye ng simbahan |
| POST | `/add` | JWT | — | Magparehistro ng bagong simbahan. Mga kinakailangang field: name, address1, city, state, zip, country |
| POST | `/search` | Publiko | — | Maghanap ng simbahan ayon sa pangalan (POST variant) |
| POST | `/select` | JWT | — | Piliin/lumipat sa isang simbahan. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | I-archive o i-unarchive ang isang simbahan |
| POST | `/byIds` | Publiko | — | I-load ang maraming simbahan ayon sa mga ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Burahin ang mga simbahang inabandona nang 7+ araw |

## Groups

Batayang path: `/membership/groups`

Nagpapalawak ng karaniwang CRUD (GET `/`, GET `/:id` mula sa base class).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | — | Ilista ang lahat ng grupo |
| GET | `/:id` | JWT | — | Kunin ang grupo ayon sa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Maghanap ng grupo ayon sa service filter |
| GET | `/my` | JWT | — | Kunin ang mga grupo para sa kasalukuyang user |
| GET | `/my/:tag` | JWT | — | Kunin ang mga grupo ng kasalukuyang user na sinala ayon sa tag |
| GET | `/tag/:tag` | JWT | — | Kunin ang lahat ng grupo na may partikular na tag |
| GET | `/public/:churchId/:id` | Publiko | — | Kunin ang pampublikong grupo ayon sa simbahan at ID |
| GET | `/public/:churchId/tag/:tag` | Publiko | — | Kunin ang mga pampublikong grupo ayon sa tag |
| GET | `/public/:churchId/label?label=` | Publiko | — | Kunin ang mga pampublikong grupo ayon sa label |
| GET | `/public/:churchId/slug/:slug` | Publiko | — | Kunin ang pampublikong grupo ayon sa slug |
| POST | `/` | JWT | Groups.Edit | Lumikha o mag-update ng mga grupo (awtomatikong gumagawa ng slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Burahin ang isang grupo (binubura rin ang mga child team para sa ministry group) |

## Group Members

Batayang path: `/membership/groupmembers`

Nagpapalawak ng karaniwang CRUD (GET `/:id`, DELETE `/:id` mula sa base class).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/:id` | JWT | GroupMembers.View | Kunin ang miyembro ng grupo ayon sa ID |
| GET | `/` | JWT | GroupMembers.View* | Ilista ang mga miyembro ng grupo. I-filter gamit ang `?groupId=`, `?groupIds=`, o `?personId=`. *Pinapayagan din kung ang user ay nasa grupo o nagqu-query ng sariling personId, at para sa `?groupId=` ng sinumang hindi kumpidensyal na grupo kapag may Attendance.View o Attendance.Edit ang user (kasama ang mga miyembrong wala pang 13 taong gulang para sa kanila) |
| GET | `/my` | JWT | — | Kunin ang mga membership ng grupo ng kasalukuyang user |
| GET | `/basic/:groupId` | JWT | — | Kunin ang basic na listahan ng miyembro para sa isang grupo |
| GET | `/public/leaders/:churchId/:groupId` | Publiko | — | Kunin ang mga lider ng grupo (pampubliko) |
| GET | `/public/:churchId/:groupId` | Publiko | — | Kunin ang pampublikong roster ng grupo (minimal na field: `personId`, `displayName`, `leader`, photo). Available lamang kapag pumayag ang grupo sa `publicRoster`; pinapagana nito ang elemento ng `staffGrid` ng website builder |
| POST | `/` | JWT | GroupMembers.Edit | Magdagdag o mag-update ng mga miyembro ng grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Alisin ang isang miyembro ng grupo |

## Households

Batayang path: `/membership/households`

Standard na CRUD controller.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | — | Ilista ang lahat ng sambahayan |
| GET | `/:id` | JWT | — | Kunin ang sambahayan ayon sa ID |
| POST | `/` | JWT | People.Edit | Lumikha o mag-update ng mga sambahayan |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang isang sambahayan |

## Roles

Batayang path: `/membership/roles`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/:id` | JWT | Roles.View | Kunin ang tungkulin ayon sa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Kunin ang lahat ng tungkulin para sa isang simbahan. Ang bawat tungkulin ay may kasamang `memberCount`, ang bilang ng magkakaibang user dito |
| POST | `/` | JWT | Roles.Edit | Lumikha o mag-update ng mga tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang isang tungkulin (inaalis din ang mga pahintulot at miyembro nito) |

## Role Members

Batayang path: `/membership/rolemembers`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga miyembro ng isang tungkulin. Idagdag ang `?include=users` upang isama ang detalye ng user |
| POST | `/` | JWT | Roles.Edit | Magdagdag ng mga miyembro sa isang tungkulin (gumagawa ng user kung hindi pa umiiral ang email) |
| DELETE | `/:id` | JWT | Roles.View | Alisin ang isang miyembro ng tungkulin |
| DELETE | `/self/:churchId/:userId` | JWT | — | Alisin ang sarili mo sa isang simbahan |

## Role Permissions

Batayang path: `/membership/rolepermissions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga pahintulot ng isang tungkulin (gamitin ang `null` bilang ID para sa "Everyone" role) |
| POST | `/` | JWT | Roles.Edit | Lumikha o mag-update ng mga pahintulot ng tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang isang pahintulot ng tungkulin |

## Permissions

Batayang path: `/membership/permissions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | — | Kunin ang kumpletong listahan ng mga available na pahintulot |

Bawat entry ay may `apiName`, `section` (uri ng nilalaman), `action`, at ang mga label na `displaySection` / `displayAction` na ipinapakita ng role editor ng B1Admin. Mga kamakailang dagdag: `MembershipApi` / `People` / `View Names` (**View People Names Only**, sa ilalim ng People and Groups) at `GivingApi` / `Donations` / `Enter` (**Enter Donations**, sa ilalim ng Donations; tingnan ang [Donation Batches](./giving.md#donation-batches)).

## Forms

Batayang path: `/membership/forms`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang lahat ng form (nakikita ng admin ang lahat; nakikita ng mga editor ang nakatalaga at ang mga hindi-miyembro na form) |
| GET | `/:id` | JWT | Access sa form | Kunin ang form ayon sa ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga naka-archive na form |
| GET | `/group/:groupId` | JWT | Miyembro ng grupo, lider ng grupo, o Forms.Admin | Mga stand-alone na form na naka-link sa grupo (`forms.groupId`), hindi kasama ang mga naka-archive, nakaayos ayon sa pangalan. Nagbabalik ng `id`, `name`, `description`, at `open` (nasa loob ng availability window). Ang mga miyembro ay mga bukas na form lamang ang nakukuha; ang mga lider at forms admin ay nakakakuha rin ng mga sarado. Sinusuportahan nito ang mga naka-link na form sa pahina ng grupo |
| GET | `/standalone/:id?churchId=` | JWT | — | Kunin ang isang standalone na form (ang mga restricted na form ay nangangailangan ng auth) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Lumikha o mag-update ng mga form. Ang mga stand-alone na form ay tumatanggap ng opsyonal na `photoUrl` (header photo na ipinapakita sa itaas ng form) at `groupId` (naka-link na grupo) |
| DELETE | `/:id` | JWT | Access sa form | Burahin ang isang form |

## Form Submissions

Batayang path: `/membership/formsubmissions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga submission. I-filter gamit ang `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Sariling saklaw: hanggang 50 stand-alone na form submission (hindi person form) na isinumite ng naka-sign in na miyembro o naka-link sa kanilang tao (`contentType` na `person`, `contentId` = ID ng kanilang tao, halimbawa, pagkatapos ng pagbabago ng tao ng admin), pinakabago muna, bawat isa ay may `form.name`. Ikinakabit ng `include` ang mga tanong ng bawat form at ang mga sagot ng submission. Nagbabalik ng `401` kung hindi naka-link ang user sa isang tao. Sinusuportahan nito ang seksyong **My Forms** ng B1 Me page |
| GET | `/group/:groupId` | JWT | Lider ng grupo | Mga sagot para sa mga lider ng grupo: isang entry bawat naka-link na form at bawat group event na may registration form, bawat isa ay may `form`, `event` (`id`, `title`, `start`; event entries lamang), `questions`, at `submissions` (kasama ang `answers` at `personName`, `null` kapag anonymous) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, o view access | Kunin ang submission ayon sa ID. Idagdag ang `?include=form,questions,answers`. Mababasa rin ito ng mga lider ng naka-link na grupo ng form, at ng mga lider ng grupong kinabibilangan ng registration sa event |
| GET | `/formId/:formId` | JWT | Access sa form (view) | Kunin ang lahat ng submission para sa isang form (kasama ang form, questions, answers). May view access ang mga lider ng naka-link na grupo ng form |
| POST | `/` | JWT | — | Isumite ang mga sagot sa form (pinangangasiwaan ang restricted/unrestricted na form, nagpapadala ng email notification). Kapag may `autoCreatePerson` ang form, hinahanap o gumagawa ito ng Guest person ayon sa email at iniuugnay ang submission; kapag may `groupId" ang form, idinaragdag ang taong iyon sa grupo; kapag nakatakda ang `followUpSubject`/`followUpBody`, nagpapadala ito ng templated na follow-up email sa nagsumite. Maliban kung kayang pamahalaan ng tumatawag ang form, palaging nakatakda ang `submittedBy` sa tao ng naka-sign in na miyembro (o iiwang walang laman para sa anonymous na submission) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Burahin ang isang submission at ang mga sagot nito |

## Questions

Batayang path: `/membership/questions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | Access sa form | Ilista ang mga tanong para sa isang form. Kailangan ang `?formId=` |
| GET | `/:id` | JWT | Access sa form | Kunin ang tanong ayon sa ID |
| GET | `/unrestricted?formId=` | JWT | — | Kunin ang mga tanong para sa isang unrestricted na form |
| GET | `/sort/:id/up` | JWT | — | Ilipat paitaas ang isang tanong sa pagkakasunod-sunod |
| GET | `/sort/:id/down` | JWT | — | Ilipat pababa ang isang tanong sa pagkakasunod-sunod |
| POST | `/` | JWT | Access sa form | Lumikha o mag-update ng mga tanong (awtomatikong nagtatalaga ng sort order) |
| DELETE | `/:id?formId=` | JWT | Access sa form | Burahin ang isang tanong |

## Answers

Batayang path: `/membership/answers`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga sagot. I-filter gamit ang `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Lumikha o mag-update ng mga sagot |

## Member Permissions

Batayang path: `/membership/memberpermissions`

Kinokontrol ang access ng bawat miyembro sa mga partikular na form.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/:id` | JWT | Access sa form | Kunin ang member permission ayon sa ID |
| GET | `/member/:id` | JWT | Access sa form | Kunin ang lahat ng pahintulot sa form para sa isang miyembro |
| GET | `/form/:id` | JWT | Access sa form | Kunin ang lahat ng member permission para sa isang form |
| GET | `/form/:id/my` | JWT | Access sa form | Kunin ang pahintulot ng kasalukuyang user para sa isang form |
| POST | `/` | JWT | Access sa form | Lumikha o mag-update ng member permissions |
| DELETE | `/:id?formId=` | JWT | Access sa form | Burahin ang isang member permission |
| DELETE | `/member/:id?formId=` | JWT | Access sa form | Burahin ang lahat ng pahintulot ng isang miyembro sa isang form |

## Settings

Batayang path: `/membership/settings`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng settings para sa simbahan |
| GET | `/public/:churchId` | Publiko | — | Kunin ang pampublikong settings para sa isang simbahan |
| POST | `/` | JWT | Settings.Edit | I-save ang settings (sinusuportahan ang pag-upload ng larawan sa base64) |

## Domains

Batayang path: `/membership/domains`

Nagpapalawak ng karaniwang CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/` | JWT | — | Ilista ang lahat ng domain |
| GET | `/:id` | JWT | — | Kunin ang domain ayon sa ID |
| GET | `/lookup/:domainName` | JWT | — | Hanapin ang domain ayon sa pangalan |
| GET | `/public/lookup/:domainName` | Publiko | — | Pampublikong paghahanap ng domain ayon sa pangalan |
| GET | `/health/check` | Publiko | — | Magpatakbo ng health check sa mga hindi pa nasusuri na domain |
| POST | `/` | JWT | Settings.Edit | Lumikha o mag-update ng mga domain (nagti-trigger ng update sa Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang isang domain |

## User Church

Batayang path: `/membership/userchurch`

Pinamamahalaan ang ugnayan ng mga user at simbahan.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/userid/:userId` | JWT | — | Kunin ang user-church record ayon sa user ID |
| GET | `/personid/:personId` | JWT | — | Kunin ang email ng naka-link na user ng isang tao |
| GET | `/user/:userId` | JWT | Server.Admin | I-load ang lahat ng simbahan ng isang user |
| POST | `/` | JWT | — | Lumikha ng user-church association |
| PATCH | `/:userId` | JWT | — | I-update ang huling oras ng access at i-log ang access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Burahin ang isang user-church record |

## Visibility Preferences

Batayang path: `/membership/visibilityPreferences`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| GET | `/my` | JWT | — | Kunin ang visibility preferences ng kasalukuyang user |
| POST | `/` | JWT | — | I-save ang visibility preferences (visibility ng address, telepono, email) |

## Query

Batayang path: `/membership/query`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| POST | `/members` | JWT | — | Paghahanap ng miyembro gamit ang natural na wika gamit ang AI. Body: `{ text, subDomain, siteUrl }` |

## Client Errors

Batayang path: `/membership/clientErrors`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|--------------|
| POST | `/` | JWT | — | I-log ang error sa panig ng client |

## Mga Kaugnay na Pahina

- [Authentication at Mga Pahintulot](./authentication.md) — Daloy ng login, JWT, OAuth, modelo ng pahintulot
- [Mga Endpoint ng Attendance](./attendance.md) — Pagsubaybay ng serbisyo at pagbisita
- [Istruktura ng Module](../module-structure.md) — Mga pattern ng pag-oorganisa ng code
