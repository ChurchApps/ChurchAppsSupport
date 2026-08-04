---
title: "Membership Endpoints"
---

# Membership Endpoints

<div class="article-intro">

Pinamamahalaan ng Membership module ang mga tao, simbahan, grupo, sambahayan, tungkulin, permission, form, at setting. Ito ang pinakamalaking module at nagbibigay ng core identity at authorization layer para sa lahat ng ibang module.

</div>

**Base path:** `/membership`

## People

Base path: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Ilista ang lahat ng tao para sa simbahan |
| GET | `/:id` | JWT | People.View o sariling record | Kunin ang isang tao ayon sa ID (kasama ang mga form submission) |
| GET | `/ids?ids=` | JWT | People.View o Member | Kunin ang maraming tao gamit ang mga comma-separated na ID |
| GET | `/basic?ids=` | JWT | — | Kunin ang basic na impormasyon (pangalan lamang) para sa maraming tao |
| GET | `/recent` | JWT | People.View o Member | Mga kamakailan idinagdag na tao |
| GET | `/search?term=&email=` | JWT | People.View o Member | Maghanap ng mga tao ayon sa pangalan o email |
| GET | `/search/phone?number=` | JWT | People.View o Member | Maghanap ayon sa numero ng telepono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Kunin ang mga tao sa isang partikular na grupo |
| GET | `/household/:householdId` | JWT | — | Kunin ang lahat ng tao sa isang sambahayan |
| GET | `/attendance` | JWT | People.Edit | I-load ang mga dumalo na may mga filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | I-load ang timeline data para sa mga tao at grupo |
| GET | `/directory/:id` | JWT | — | Kunin ang isang tao para sa directory view (gumagalang sa mga visibility preference) |
| GET | `/claim/:churchId` | JWT | — | I-claim ang record ng isang tao para sa kasalukuyang user sa isang simbahan |
| POST | `/` | JWT | People.Edit o EditSelf | Lumikha o mag-update ng mga tao (batch) |
| POST | `/search` | JWT | People.View o Member | Maghanap ng mga tao (POST variant) |
| POST | `/advancedSearch` | JWT | People.View o Member | Multi-condition na paghahanap (edad, birthMonth, membershipStatus, atbp.) |
| POST | `/loadOrCreate` | Public | — | Hanapin o lumikha ng isang tao ayon sa email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | I-update ang mga assignment ng miyembro ng sambahayan |
| POST | `/public/email` | Public | — | Magpadala ng email sa isang tao. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | I-load ang mga email ng tao ayon sa mga ID (server-to-server, nangangailangan ng jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Tanggalin ang isang tao |

### Halimbawa: Maghanap ng mga Tao

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

### Halimbawa: Lumikha ng Isang Tao

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Users

Base path: `/membership/users`

Tingnan ang [Authentication & Permissions](./authentication) para sa mga endpoint ng pag-login, pagrehistro, at pamamahala ng password.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Mag-log in (email/password, JWT refresh, o authGuid) |
| POST | `/register` | Public | — | Magrehistro ng bagong user |
| POST | `/forgot` | Public | — | Magpadala ng email para sa pag-reset ng password |
| POST | `/setPasswordGuid` | Public | — | Itakda ang password gamit ang auth GUID mula sa email link |
| POST | `/verifyCredentials` | Public | — | I-verify ang email/password at ibalik ang mga kaugnay na simbahan |
| POST | `/loadOrCreate` | JWT | — | Hanapin o lumikha ng user ayon sa email/userId |
| POST | `/setDisplayName` | JWT | — | I-update ang unang pangalan at apelyido ng user |
| POST | `/updateEmail` | JWT | — | Baguhin ang email address ng user |
| POST | `/updatePassword` | JWT | — | Baguhin ang password ng user (minimum 6 na karakter) |
| POST | `/updateOptedOut` | JWT | — | Itakda ang opted-out na katayuan ng isang tao |
| GET | `/search?term=` | JWT | Server.Admin | Maghanap ng lahat ng user ayon sa pangalan/email |
| DELETE | `/` | JWT | — | Tanggalin ang kasalukuyang user account |

## Churches

Base path: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng simbahan para sa kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang simbahan ayon sa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Kunin ang domain admin user para sa isang simbahan |
| GET | `/:id/impersonate` | JWT | Server.Admin | I-impersonate ang isang simbahan (server admin lamang) |
| GET | `/all?term=` | JWT | Server.Admin | Maghanap sa lahat ng simbahan (admin) |
| GET | `/search/?name=` | Public | — | Maghanap ng mga simbahan ayon sa pangalan |
| GET | `/lookup/?subDomain=&id=` | Public | — | Hanapin ang isang simbahan ayon sa subdomain o ID |
| POST | `/` | JWT | Settings.Edit | I-update ang mga detalye ng simbahan |
| POST | `/add` | JWT | — | Magrehistro ng bagong simbahan. Kinakailangang field: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Maghanap ng mga simbahan ayon sa pangalan (POST variant) |
| POST | `/select` | JWT | — | Pumili/lumipat sa isang simbahan. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | I-archive o i-unarchive ang isang simbahan |
| POST | `/byIds` | Public | — | I-load ang maraming simbahan ayon sa mga ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Tanggalin ang mga simbahang inabandona nang 7+ araw |

## Groups

Base path: `/membership/groups`

Nag-e-extend ng standard na CRUD (GET `/`, GET `/:id` mula sa base class).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng grupo |
| GET | `/:id` | JWT | — | Kunin ang grupo ayon sa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Maghanap ng mga grupo ayon sa mga filter ng serbisyo |
| GET | `/my` | JWT | — | Kunin ang mga grupo para sa kasalukuyang user |
| GET | `/my/:tag` | JWT | — | Kunin ang mga grupo ng kasalukuyang user na na-filter ayon sa tag |
| GET | `/tag/:tag` | JWT | — | Kunin ang lahat ng grupong may partikular na tag |
| GET | `/public/:churchId/:id` | Public | — | Kunin ang isang public na grupo ayon sa simbahan at ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Kunin ang mga public na grupo ayon sa tag |
| GET | `/public/:churchId/label?label=` | Public | — | Kunin ang mga public na grupo ayon sa label |
| GET | `/public/:churchId/slug/:slug` | Public | — | Kunin ang isang public na grupo ayon sa slug |
| POST | `/` | JWT | Groups.Edit | Lumikha o mag-update ng mga grupo (awtomatikong bumubuo ng slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Tanggalin ang isang grupo (tinatanggal din ang mga child team para sa mga ministry group) |

## Group Members

Base path: `/membership/groupmembers`

Nag-e-extend ng standard na CRUD (GET `/:id`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Kunin ang isang group member ayon sa ID |
| GET | `/` | JWT | GroupMembers.View* | Ilista ang mga group member. I-filter sa pamamagitan ng `?groupId=`, `?groupIds=`, o `?personId=`. *Pinapayagan din kung ang user ay nasa grupo o nagbe-query ng sariling personId |
| GET | `/my` | JWT | — | Kunin ang mga group membership ng kasalukuyang user |
| GET | `/basic/:groupId` | JWT | — | Kunin ang basic na listahan ng miyembro para sa isang grupo |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Kunin ang mga leader ng grupo (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Kunin ang public na roster ng isang grupo (minimal na mga field: `personId`, `displayName`, `leader`, larawan). Lamang kapag pumili ang grupo sa pamamagitan ng `publicRoster`; nagpapatakbo sa `staffGrid` element ng website builder |
| POST | `/` | JWT | GroupMembers.Edit | Magdagdag o mag-update ng mga group member |
| DELETE | `/:id` | JWT | GroupMembers.View | Alisin ang isang group member |

## Households

Base path: `/membership/households`

Standard na CRUD controller.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng sambahayan |
| GET | `/:id` | JWT | — | Kunin ang sambahayan ayon sa ID |
| POST | `/` | JWT | People.Edit | Lumikha o mag-update ng mga sambahayan |
| DELETE | `/:id` | JWT | People.Edit | Tanggalin ang isang sambahayan |

## Roles

Base path: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Kunin ang tungkulin ayon sa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Kunin ang lahat ng tungkulin para sa isang simbahan |
| POST | `/` | JWT | Roles.Edit | Lumikha o mag-update ng mga tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Tanggalin ang isang tungkulin (tinatanggal din ang mga permission at miyembro nito) |

## Role Members

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga miyembro para sa isang tungkulin. Idagdag ang `?include=users` upang isama ang mga detalye ng user |
| POST | `/` | JWT | Roles.Edit | Magdagdag ng mga miyembro sa isang tungkulin (lumilikha ng user kung wala pang email) |
| DELETE | `/:id` | JWT | Roles.View | Alisin ang isang miyembro ng tungkulin |
| DELETE | `/self/:churchId/:userId` | JWT | — | Alisin ang iyong sarili mula sa isang simbahan |

## Role Permissions

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga permission para sa isang tungkulin (gamitin ang `null` bilang ID para sa tungkuling "Everyone") |
| POST | `/` | JWT | Roles.Edit | Lumikha o mag-update ng mga role permission |
| DELETE | `/:id` | JWT | Roles.Edit | Tanggalin ang isang role permission |

## Permissions

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang buong listahan ng mga available na permission |

## Forms

Base path: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang lahat ng form (nakikita ng admin ang lahat; nakikita ng mga editor ang mga naitalaga + non-member na form) |
| GET | `/:id` | JWT | Form access | Kunin ang isang form ayon sa ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga archived na form |
| GET | `/standalone/:id?churchId=` | JWT | — | Kunin ang isang standalone na form (nangangailangan ng auth ang mga restricted na form) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Lumikha o mag-update ng mga form |
| DELETE | `/:id` | JWT | Form access | Tanggalin ang isang form |

## Form Submissions

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga submission. I-filter sa pamamagitan ng `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Kunin ang isang submission ayon sa ID. Idagdag ang `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Form access | Kunin ang lahat ng submission para sa isang form (kasama ang form, mga tanong, mga sagot) |
| POST | `/` | JWT | — | Isumite ang mga sagot sa form (hinahawakan ang mga restricted/unrestricted na form, nagpapadala ng mga email notification). Kapag may `autoCreatePerson` ang form, humahanap o lumilikha ng Guest na tao ayon sa email at inuugnay ang submission; kapag naka-set ang `followUpSubject`/`followUpBody`, nagpapadala ng templated na follow-up email sa nagsumite |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Tanggalin ang isang submission at ang mga sagot nito |

## Questions

Base path: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | Ilista ang mga tanong para sa isang form. Kailangan ang `?formId=` |
| GET | `/:id` | JWT | Form access | Kunin ang isang tanong ayon sa ID |
| GET | `/unrestricted?formId=` | JWT | — | Kunin ang mga tanong para sa isang unrestricted na form |
| GET | `/sort/:id/up` | JWT | — | Ilipat pataas ang isang tanong sa sort order |
| GET | `/sort/:id/down` | JWT | — | Ilipat pababa ang isang tanong sa sort order |
| POST | `/` | JWT | Form access | Lumikha o mag-update ng mga tanong (awtomatikong nag-a-assign ng sort order) |
| DELETE | `/:id?formId=` | JWT | Form access | Tanggalin ang isang tanong |

## Answers

Base path: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga sagot. I-filter sa pamamagitan ng `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Lumikha o mag-update ng mga sagot |

## Member Permissions

Base path: `/membership/memberpermissions`

Kinokontrol ang per-member na access sa mga partikular na form.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | Kunin ang isang member permission ayon sa ID |
| GET | `/member/:id` | JWT | Form access | Kunin ang lahat ng form permission para sa isang miyembro |
| GET | `/form/:id` | JWT | Form access | Kunin ang lahat ng member permission para sa isang form |
| GET | `/form/:id/my` | JWT | Form access | Kunin ang permission ng kasalukuyang user para sa isang form |
| POST | `/` | JWT | Form access | Lumikha o mag-update ng mga member permission |
| DELETE | `/:id?formId=` | JWT | Form access | Tanggalin ang isang member permission |
| DELETE | `/member/:id?formId=` | JWT | Form access | Tanggalin ang lahat ng permission para sa isang miyembro sa isang form |

## Settings

Base path: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting para sa simbahan |
| GET | `/public/:churchId` | Public | — | Kunin ang mga public na setting para sa isang simbahan |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting (sinusuportahan ang base64 image upload) |

## Domains

Base path: `/membership/domains`

Nag-e-extend ng standard na CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng domain |
| GET | `/:id` | JWT | — | Kunin ang domain ayon sa ID |
| GET | `/lookup/:domainName` | JWT | — | Hanapin ang isang domain ayon sa pangalan |
| GET | `/public/lookup/:domainName` | Public | — | Public na paghahanap ng domain ayon sa pangalan |
| GET | `/health/check` | Public | — | Magpatakbo ng health check sa mga hindi pa nasusuring domain |
| POST | `/` | JWT | Settings.Edit | Lumikha o mag-update ng mga domain (nagtatrigger ng Caddy update) |
| DELETE | `/:id` | JWT | Settings.Edit | Tanggalin ang isang domain |

## User Church

Base path: `/membership/userchurch`

Pinamamahalaan ang ugnayan sa pagitan ng mga user at simbahan.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Kunin ang user-church record ayon sa user ID |
| GET | `/personid/:personId` | JWT | — | Kunin ang email para sa naka-link na user ng isang tao |
| GET | `/user/:userId` | JWT | Server.Admin | I-load ang lahat ng simbahan para sa isang user |
| POST | `/` | JWT | — | Lumikha ng isang ugnayang user-church |
| PATCH | `/:userId` | JWT | — | I-update ang huling naka-access na oras at i-log ang access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Tanggalin ang isang user-church record |

## Visibility Preferences

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga visibility preference ng kasalukuyang user |
| POST | `/` | JWT | — | I-save ang mga visibility preference (visibility ng address, telepono, email) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Natural language na paghahanap ng miyembro gamit ang AI. Body: `{ text, subDomain, siteUrl }` |

## Client Errors

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | I-log ang isang client-side na error |

## Mga Kaugnay na Pahina

- [Authentication & Permissions](./authentication) — Daloy ng pag-login, JWT, OAuth, permission model
- [Attendance Endpoints](./attendance) — Pagsubaybay sa serbisyo at visit
- [Module Structure](../module-structure) — Mga pattern ng pag-oorganisa ng code
