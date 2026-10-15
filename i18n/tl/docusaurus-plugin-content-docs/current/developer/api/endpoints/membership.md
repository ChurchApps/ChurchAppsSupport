---
title: "Mga Membership Endpoint"
---

# Mga Membership Endpoint

<div class="article-intro">

Pinamamahalaan ng Membership module ang mga tao, simbahan, group, household, role, permission, form, at setting. Ito ang pinakamalaking module at nagbibigay ng pangunahing layer ng identity at authorization para sa lahat ng iba pang module.

</div>

**Base path:** `/membership`

## Mga Tao

Base path: `/membership/people`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Ilista ang lahat ng tao ng simbahan |
| GET | `/:id` | JWT | People.View o sariling record | Kunin ang isang tao ayon sa ID (kasama ang mga form submission) |
| GET | `/ids?ids=` | JWT | People.View o Member | Kunin ang maraming tao ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/basic?ids=` | JWT | — | Kunin ang pangunahing impormasyon (pangalan lamang) ng maraming tao |
| GET | `/names?ids=` | JWT | Anumang permission sa simbahan | `[{ id, name: { display }, photo }]` para sa mga ID na pinaghihiwalay ng kuwit na hawak na ng caller, upang ang mga role na walang People.View (donations, attendance) ay makapagpangalan ng mga tao. Walang paghahanap, walang directory filter |
| POST | `/names` | JWT | Anumang permission sa simbahan | Kapareho ng `GET /names`. Body: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View o Member | Mga kamakailang idinagdag na tao |
| GET | `/search?term=&email=` | JWT | People.View o Member | Maghanap ng mga tao ayon sa pangalan o email |
| GET | `/search/phone?number=` | JWT | People.View o Member | Maghanap ayon sa numero ng telepono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Kunin ang mga tao sa isang partikular na group |
| GET | `/household/:householdId` | JWT | — | Kunin ang lahat ng tao sa isang household |
| GET | `/attendance` | JWT | People.Edit | I-load ang mga dumalo na may filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | I-load ang timeline data para sa mga tao at group |
| GET | `/directory/:id` | JWT | — | Kunin ang tao para sa directory view (sumusunod sa mga visibility preference) |
| GET | `/claim/:churchId` | JWT | — | Angkinin ang isang person record para sa kasalukuyang user sa isang simbahan |
| POST | `/` | JWT | People.Edit o EditSelf | Gumawa o mag-update ng mga tao (batch) |
| POST | `/search` | JWT | People.View o Member | Maghanap ng mga tao (POST variant) |
| POST | `/advancedSearch` | JWT | People.View o Member | Maraming kondisyong paghahanap (edad, birthMonth, membershipStatus, atbp.) |
| POST | `/loadOrCreate` | Public | — | Hanapin o gumawa ng tao ayon sa email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | I-update ang mga assignment ng miyembro ng household |
| POST | `/public/email` | Public | — | Magpadala ng email sa isang tao. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | I-load ang mga email ng tao ayon sa mga ID (server-to-server, kailangan ang jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang isang tao |

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

## Mga User

Base path: `/membership/users`

Tingnan ang [Authentication & Permissions](./authentication) para sa mga endpoint ng login, registration, at pamamahala ng password.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Mag-log in (email/password, JWT refresh, o authGuid) |
| POST | `/register` | Public | — | Magparehistro ng bagong user |
| POST | `/forgot` | Public | — | Magpadala ng email para sa pag-reset ng password |
| POST | `/setPasswordGuid` | Public | — | Magtakda ng password gamit ang auth GUID mula sa link sa email |
| POST | `/verifyCredentials` | Public | — | I-verify ang email/password at ibalik ang mga kaugnay na simbahan |
| POST | `/loadOrCreate` | JWT | — | Hanapin o gumawa ng user ayon sa email/userId |
| POST | `/setDisplayName` | JWT | — | I-update ang first at last name ng user |
| POST | `/updateEmail` | JWT | — | Baguhin ang email address ng user |
| POST | `/updatePassword` | JWT | — | Baguhin ang password ng user (kahit 6 karakter) |
| POST | `/updateOptedOut` | JWT | — | Itakda ang opted-out status ng isang tao |
| POST | `/sendInviteEmail` | JWT | People.Edit | Magpadala ng imbitasyon sa email sa isang tao sa simbahang ito (`email`, `personName`, `contextName`). Ang button ay magbabasang **Sign Up** para sa taong walang account at **Log In** para sa umiiral na user. Ang user na hindi pa nakakapag-log in ay makakakuha ng link na **Set Your Password** na mag-e-expire sa loob ng 7 araw. Binibilang sa araw-araw na limitasyon ng email ng simbahan (`429` kapag naabot) |
| GET | `/search?term=` | JWT | Server.Admin | Maghanap ng lahat ng user ayon sa pangalan/email |
| DELETE | `/` | JWT | — | Burahin ang account ng kasalukuyang user |

## Mga Simbahan

Base path: `/membership/churches`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng simbahan ng kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang simbahan ayon sa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Kunin ang domain admin user ng isang simbahan |
| GET | `/:id/impersonate` | JWT | Server.Admin | I-impersonate ang isang simbahan (server admin lamang) |
| GET | `/all?term=` | JWT | Server.Admin | Maghanap ng lahat ng simbahan (admin) |
| GET | `/search/?name=` | Public | — | Maghanap ng simbahan ayon sa pangalan |
| GET | `/lookup/?subDomain=&id=` | Public | — | Hanapin ang simbahan ayon sa subdomain o ID |
| POST | `/` | JWT | Settings.Edit | I-update ang detalye ng simbahan |
| POST | `/add` | JWT | — | Magparehistro ng bagong simbahan. Kailangang field: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Maghanap ng simbahan ayon sa pangalan (POST variant) |
| POST | `/select` | JWT | — | Piliin/lumipat sa isang simbahan. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | I-archive o i-unarchive ang isang simbahan |
| POST | `/byIds` | Public | — | I-load ang maraming simbahan ayon sa mga ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Burahin ang mga simbahang iniwan nang 7+ araw |

## Mga Group

Base path: `/membership/groups`

Nagpapalawig sa karaniwang CRUD (GET `/`, GET `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng group |
| GET | `/:id` | JWT | — | Kunin ang group ayon sa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Maghanap ng group ayon sa mga filter ng serbisyo |
| GET | `/my` | JWT | — | Kunin ang mga group ng kasalukuyang user |
| GET | `/my/:tag` | JWT | — | Kunin ang mga group ng kasalukuyang user na sinala ayon sa tag |
| GET | `/tag/:tag` | JWT | — | Kunin ang lahat ng group na may partikular na tag |
| GET | `/public/:churchId/:id` | Public | — | Kunin ang isang pampublikong group ayon sa simbahan at ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Kunin ang mga pampublikong group ayon sa tag |
| GET | `/public/:churchId/label?label=` | Public | — | Kunin ang mga pampublikong group ayon sa label |
| GET | `/public/:churchId/slug/:slug` | Public | — | Kunin ang isang pampublikong group ayon sa slug |
| POST | `/` | JWT | Groups.Edit | Gumawa o mag-update ng mga group (awtomatikong gumagawa ng slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Burahin ang isang group (binubura rin ang mga child team para sa ministry group) |

## Mga Miyembro ng Group

Base path: `/membership/groupmembers`

Nagpapalawig sa karaniwang CRUD (GET `/:id`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Kunin ang miyembro ng group ayon sa ID |
| GET | `/` | JWT | GroupMembers.View* | Ilista ang mga miyembro ng group. I-filter gamit ang `?groupId=`, `?groupIds=`, o `?personId=`. *Pinapayagan din kung ang user ay nasa group o nagtatanong ng sariling personId |
| GET | `/my` | JWT | — | Kunin ang mga membership sa group ng kasalukuyang user |
| GET | `/basic/:groupId` | JWT | — | Kunin ang pangunahing listahan ng miyembro ng isang group |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Kunin ang mga lider ng group (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Kunin ang pampublikong roster ng group (minimal na field: `personId`, `displayName`, `leader`, photo). Para lamang kapag pumayag ang group sa pamamagitan ng `publicRoster`; sumusuporta sa `staffGrid` element ng website builder |
| POST | `/` | JWT | GroupMembers.Edit | Magdagdag o mag-update ng mga miyembro ng group |
| DELETE | `/:id` | JWT | GroupMembers.View | Alisin ang isang miyembro ng group |

## Mga Household

Base path: `/membership/households`

Standard na CRUD controller.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng household |
| GET | `/:id` | JWT | — | Kunin ang household ayon sa ID |
| POST | `/` | JWT | People.Edit | Gumawa o mag-update ng mga household |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang isang household |

## Mga Role

Base path: `/membership/roles`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Kunin ang role ayon sa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Kunin ang lahat ng role ng isang simbahan |
| POST | `/` | JWT | Roles.Edit | Gumawa o mag-update ng mga role |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang isang role (inaalis din ang mga permission at miyembro nito) |

## Mga Miyembro ng Role

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga miyembro ng isang role. Idagdag ang `?include=users` upang isama ang detalye ng user |
| POST | `/` | JWT | Roles.Edit | Magdagdag ng mga miyembro sa isang role (gumagawa ng user kung walang email na ganito) |
| DELETE | `/:id` | JWT | Roles.View | Alisin ang isang miyembro ng role |
| DELETE | `/self/:churchId/:userId` | JWT | — | Alisin ang sarili mo sa isang simbahan |

## Mga Permission ng Role

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga permission ng isang role (gamitin ang `null` bilang ID para sa "Everyone" role) |
| POST | `/` | JWT | Roles.Edit | Gumawa o mag-update ng mga permission ng role |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang isang permission ng role |

## Mga Permission

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang buong listahan ng mga available na permission |

## Mga Form

Base path: `/membership/forms`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang lahat ng form (nakikita ng admin ang lahat; nakikita ng mga editor ang naka-assign at hindi-member na form) |
| GET | `/:id` | JWT | Form access | Kunin ang isang form ayon sa ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga naka-archive na form |
| GET | `/standalone/:id?churchId=` | JWT | — | Kunin ang isang standalone na form (kailangan ng auth ang mga restricted na form) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Gumawa o mag-update ng mga form |
| DELETE | `/:id` | JWT | Form access | Burahin ang isang form |

## Mga Form Submission

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga submission. I-filter gamit ang `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Kunin ang submission ayon sa ID. Idagdag ang `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Form access | Kunin ang lahat ng submission ng isang form (kasama ang form, questions, answers) |
| POST | `/` | JWT | — | Isumite ang mga sagot sa form (humahawak ng restricted/unrestricted na form, nagpapadala ng email notification). Kapag may `autoCreatePerson` ang form, humahanap-o-gumagawa ng Guest na tao ayon sa email at iniuugnay ang submission; kapag may `followUpSubject`/`followUpBody`, nagpapadala ng templated na follow-up email sa nagsumite |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Burahin ang isang submission at ang mga sagot nito |

## Mga Tanong

Base path: `/membership/questions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | Ilista ang mga tanong ng isang form. Kailangan ang `?formId=` |
| GET | `/:id` | JWT | Form access | Kunin ang isang tanong ayon sa ID |
| GET | `/unrestricted?formId=` | JWT | — | Kunin ang mga tanong ng isang unrestricted na form |
| GET | `/sort/:id/up` | JWT | — | Ilipat pataas ang isang tanong sa sort order |
| GET | `/sort/:id/down` | JWT | — | Ilipat pababa ang isang tanong sa sort order |
| POST | `/` | JWT | Form access | Gumawa o mag-update ng mga tanong (awtomatikong nagtatalaga ng sort order) |
| DELETE | `/:id?formId=` | JWT | Form access | Burahin ang isang tanong |

## Mga Sagot

Base path: `/membership/answers`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga sagot. I-filter gamit ang `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Gumawa o mag-update ng mga sagot |

## Member Permissions

Base path: `/membership/memberpermissions`

Kinokontrol ang access ng bawat miyembro sa mga partikular na form.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | Kunin ang member permission ayon sa ID |
| GET | `/member/:id` | JWT | Form access | Kunin ang lahat ng permission sa form ng isang miyembro |
| GET | `/form/:id` | JWT | Form access | Kunin ang lahat ng member permission ng isang form |
| GET | `/form/:id/my` | JWT | Form access | Kunin ang permission ng kasalukuyang user para sa isang form |
| POST | `/` | JWT | Form access | Gumawa o mag-update ng mga member permission |
| DELETE | `/:id?formId=` | JWT | Form access | Burahin ang isang member permission |
| DELETE | `/member/:id?formId=` | JWT | Form access | Burahin ang lahat ng permission ng isang miyembro sa isang form |

## Mga Setting

Base path: `/membership/settings`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting ng simbahan |
| GET | `/public/:churchId` | Public | — | Kunin ang mga pampublikong setting ng isang simbahan |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting (sumusuporta sa base64 image upload) |

## Mga Domain

Base path: `/membership/domains`

Nagpapalawig sa karaniwang CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng domain |
| GET | `/:id` | JWT | — | Kunin ang domain ayon sa ID |
| GET | `/lookup/:domainName` | JWT | — | Hanapin ang domain ayon sa pangalan |
| GET | `/public/lookup/:domainName` | Public | — | Public na paghahanap ng domain ayon sa pangalan |
| GET | `/health/check` | Public | — | Magpatakbo ng health check sa mga domain na hindi pa nasusuri |
| POST | `/` | JWT | Settings.Edit | Gumawa o mag-update ng mga domain (nagti-trigger ng Caddy update) |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang isang domain |

## User Church

Base path: `/membership/userchurch`

Pinamamahalaan ang ugnayan sa pagitan ng mga user at simbahan.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Kunin ang user-church record ayon sa user ID |
| GET | `/personid/:personId` | JWT | — | Kunin ang email ng naka-link na user ng isang tao |
| GET | `/user/:userId` | JWT | Server.Admin | I-load ang lahat ng simbahan ng isang user |
| POST | `/` | JWT | — | Gumawa ng user-church association |
| PATCH | `/:userId` | JWT | — | I-update ang huling oras ng access at itala ang access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Burahin ang isang user-church record |

## Mga Visibility Preference

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang visibility preference ng kasalukuyang user |
| POST | `/` | JWT | — | I-save ang visibility preference (visibility ng address, telepono, email) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Paghahanap ng miyembro gamit ang natural na wika sa tulong ng AI. Body: `{ text, subDomain, siteUrl }` |

## Mga Client Error

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Itala ang error sa panig ng client |

## Mga Kaugnay na Pahina

- [Authentication & Permissions](./authentication) -- Daloy ng login, JWT, OAuth, modelo ng permission
- [Attendance Endpoints](./attendance) -- Pagsubaybay sa serbisyo at pagbisita
- [Module Structure](../module-structure) -- Mga pattern ng organisasyon ng code
