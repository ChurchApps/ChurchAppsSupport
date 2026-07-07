---
title: "Membership Endpoints"
---

# Membership Endpoints

<div class="article-intro">

Ang Membership module ay namamahala sa mga tao, simbahan, grupo, household, tungkulin, permission, form, at setting. Ito ay ang pinakamalaking module at nagbibigay ng core identity at authorization layer para sa lahat ng ibang module.

</div>

**Base path:** `/membership`

## Tao

Base path: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Miyembro | Itala ang lahat ng tao para sa simbahan |
| GET | `/:id` | JWT | People.View o sariling record | Makakuha ng tao sa pamamagitan ng ID (kasama ang form submission) |
| GET | `/ids?ids=` | JWT | People.View o Miyembro | Makakuha ng maraming tao sa pamamagitan ng comma-separated na ID |
| GET | `/basic?ids=` | JWT | — | Makakuha ng basic info (pangalan lamang) para sa maraming tao |
| GET | `/recent` | JWT | People.View o Miyembro | Kamakailan na idadagdag na mga tao |
| GET | `/search?term=&email=` | JWT | People.View o Miyembro | Maghanap ng mga tao ayon sa pangalan o email |
| GET | `/search/phone?number=` | JWT | People.View o Miyembro | Maghanap ayon sa telepono number |
| GET | `/search/group?groupId=` | JWT | People.View o Miyembro | Makakuha ng mga tao sa isang specific na grupo |
| GET | `/household/:householdId` | JWT | — | Makakuha ng lahat ng tao sa isang household |
| GET | `/attendance` | JWT | People.Edit | I-load ang attendee na may filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | I-load ang timeline data para sa mga tao at grupo |
| GET | `/directory/:id` | JWT | — | Makakuha ng tao para sa directory view (gumagalang sa visibility preference) |
| GET | `/claim/:churchId` | JWT | — | Tamasahin ang record ng tao para sa kasalukuyang user sa isang simbahan |
| POST | `/` | JWT | People.Edit o EditSelf | Lumikha o i-update ang mga tao (batch) |
| POST | `/search` | JWT | People.View o Miyembro | Maghanap ng mga tao (POST variant) |
| POST | `/advancedSearch` | JWT | People.View o Miyembro | Multi-condition na paghahanap (age, birthMonth, membershipStatus, atbp.) |
| POST | `/loadOrCreate` | Public | — | Hanapin o lumikha ng tao ayon sa email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | I-update ang household member assignment |
| POST | `/public/email` | Public | — | Magpadala ng email sa isang tao. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | I-load ang person email ayon sa ID (server-to-server, nangangailangan ng jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Tanggalin ang tao |

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

### Halimbawa: Lumikha ng Tao

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## User

Base path: `/membership/users`

Tingnan ang [Authentication & Permission](./authentication) para sa login, registration, at password management endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Mag-log in (email/password, JWT refresh, o authGuid) |
| POST | `/register` | Public | — | Mag-register ng bagong user |
| POST | `/forgot` | Public | — | Magpadala ng password reset email |
| POST | `/setPasswordGuid` | Public | — | Itakda ang password gamit ang auth GUID mula sa email link |
| POST | `/verifyCredentials` | Public | — | I-verify ang email/password at ibalik ang kaugnay na mga simbahan |
| POST | `/loadOrCreate` | JWT | — | Hanapin o lumikha ng user ayon sa email/userId |
| POST | `/setDisplayName` | JWT | — | I-update ang user ng first at last name |
| POST | `/updateEmail` | JWT | — | Baguhin ang email address ng user |
| POST | `/updatePassword` | JWT | — | Baguhin ang password ng user (min 6 char) |
| POST | `/updateOptedOut` | JWT | — | Itakda ang opted-out status ng tao |
| GET | `/search?term=` | JWT | Server.Admin | Maghanap ng lahat ng user ayon sa pangalan/email |
| DELETE | `/` | JWT | — | Tanggalin ang kasalukuyang user account |

## Simbahan

Base path: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng simbahan para sa kasalukuyang user |
| GET | `/:id` | JWT | — | Makakuha ng simbahan ayon sa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Makakuha ng domain admin user para sa isang simbahan |
| GET | `/:id/impersonate` | JWT | Server.Admin | I-impersonate ang isang simbahan (server admin lamang) |
| GET | `/all?term=` | JWT | Server.Admin | Maghanap ng lahat ng simbahan (admin) |
| GET | `/search/?name=` | Public | — | Maghanap ng mga simbahan ayon sa pangalan |
| GET | `/lookup/?subDomain=&id=` | Public | — | Hanapin ang simbahan ayon sa subdomain o ID |
| POST | `/` | JWT | Settings.Edit | I-update ang detalye ng simbahan |
| POST | `/add` | JWT | — | Mag-register ng bagong simbahan. Kinakailangan na field: pangalan, address1, lungsod, estado, zip, bansa |
| POST | `/search` | Public | — | Maghanap ng mga simbahan ayon sa pangalan (POST variant) |
| POST | `/select` | JWT | — | Pumili/lumipat sa isang simbahan. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | I-archive o i-unarchive ang isang simbahan |
| POST | `/byIds` | Public | — | I-load ang maraming simbahan ayon sa ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Tanggalin ang mga simbahan na inabandona sa loob ng 7+ araw |

## Grupo

Base path: `/membership/groups`

Nag-extend ng standard CRUD (GET `/`, GET `/:id` mula sa base class).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng grupo |
| GET | `/:id` | JWT | — | Makakuha ng grupo ayon sa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Maghanap ng grupo ayon sa service filter |
| GET | `/my` | JWT | — | Makakuha ng grupo para sa kasalukuyang user |
| GET | `/my/:tag` | JWT | — | Makakuha ng grupo ng kasalukuyang user na na-filter ayon sa tag |
| GET | `/tag/:tag` | JWT | — | Makakuha ng lahat ng grupo na may specific na tag |
| GET | `/public/:churchId/:id` | Public | — | Makakuha ng public na grupo ayon sa simbahan at ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Makakuha ng public na grupo ayon sa tag |
| GET | `/public/:churchId/label?label=` | Public | — | Makakuha ng public na grupo ayon sa label |
| GET | `/public/:churchId/slug/:slug` | Public | — | Makakuha ng public na grupo ayon sa slug |
| POST | `/` | JWT | Groups.Edit | Lumikha o i-update ang mga grupo (awtomatikong bumubuo ng slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Tanggalin ang grupo (pati na rin tinatanggal ang child team para sa ministry group) |

## Group Member

Base path: `/membership/groupmembers`

Nag-extend ng standard CRUD (GET `/:id`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Makakuha ng group member ayon sa ID |
| GET | `/` | JWT | GroupMembers.View* | Itala ang group member. Filter sa pamamagitan ng `?groupId=`, `?groupIds=`, o `?personId=`. *Pinapayagan din kung ang user ay nasa grupo o nag-query ng sariling personId |
| GET | `/my` | JWT | — | Makakuha ng kasalukuyang user ng group membership |
| GET | `/basic/:groupId` | JWT | — | Makakuha ng basic member list para sa isang grupo |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Makakuha ng group leader (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Makakuha ng public roster ng isang grupo (minimal field: `personId`, `displayName`, `leader`, larawan). Lamang kung ang grupo ay pumili sa pamamagitan ng `publicRoster`; nag-power ng website builder ng `staffGrid` element |
| POST | `/` | JWT | GroupMembers.Edit | Magdagdag o i-update ang group member |
| DELETE | `/:id` | JWT | GroupMembers.View | Tanggalin ang group member |

## Household

Base path: `/membership/households`

Standard CRUD controller.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng household |
| GET | `/:id` | JWT | — | Makakuha ng household ayon sa ID |
| POST | `/` | JWT | People.Edit | Lumikha o i-update ang household |
| DELETE | `/:id` | JWT | People.Edit | Tanggalin ang household |

## Role

Base path: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Makakuha ng role ayon sa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Makakuha ng lahat ng role para sa isang simbahan |
| POST | `/` | JWT | Roles.Edit | Lumikha o i-update ang role |
| DELETE | `/:id` | JWT | Roles.Edit | Tanggalin ang role (pati na rin tinatanggal ang permission at miyembro nito) |

## Role Member

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Makakuha ng miyembro para sa isang role. Idagdag ang `?include=users` upang isama ang user detail |
| POST | `/` | JWT | Roles.Edit | Magdagdag ng miyembro sa isang role (lumilikha ng user kung ang email ay hindi umiiral) |
| DELETE | `/:id` | JWT | Roles.View | Tanggalin ang role member |
| DELETE | `/self/:churchId/:userId` | JWT | — | Tanggalin ang iyong sarili mula sa isang simbahan |

## Role Permission

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Makakuha ng permission para sa isang role (gamitin ang `null` bilang ID para sa "Everyone" role) |
| POST | `/` | JWT | Roles.Edit | Lumikha o i-update ang role permission |
| DELETE | `/:id` | JWT | Roles.Edit | Tanggalin ang role permission |

## Permission

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Makakuha ng buong listahan ng available na permission |

## Form

Base path: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Itala ang lahat ng form (admin ay nakikita ang lahat; editor ay nakikita ang assigned + non-member form) |
| GET | `/:id` | JWT | Form access | Makakuha ng form ayon sa ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Itala ang archived na form |
| GET | `/standalone/:id?churchId=` | JWT | — | Makakuha ng standalone na form (restricted na form ay nangangailangan ng auth) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Lumikha o i-update ang form |
| DELETE | `/:id` | JWT | Form access | Tanggalin ang form |

## Form Submission

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Itala ang submission. Filter sa pamamagitan ng `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Makakuha ng submission ayon sa ID. Idagdag ang `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Form access | Makakuha ng lahat ng submission para sa isang form (kasama ang form, tanong, sagot) |
| POST | `/` | JWT | — | Ipadala ang form answer (humahawak ng restricted/unrestricted na form, nagpadala ng email notification). Kapag ang form ay may `autoCreatePerson`, nakahanap o lumilikha ng Guest person ayon sa email at nag-link sa submission; kapag `followUpSubject`/`followUpBody` ay nakatakda, nagpadala ng templated na follow-up email sa submitter |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Tanggalin ang submission at ang sagot nito |

## Tanong

Base path: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | Itala ang tanong para sa isang form. Nangangailangan ng `?formId=` |
| GET | `/:id` | JWT | Form access | Makakuha ng tanong ayon sa ID |
| GET | `/unrestricted?formId=` | JWT | — | Makakuha ng tanong para sa unrestricted na form |
| GET | `/sort/:id/up` | JWT | — | Ilipat ang isang tanong pataas sa sort order |
| GET | `/sort/:id/down` | JWT | — | Ilipat ang isang tanong pababa sa sort order |
| POST | `/` | JWT | Form access | Lumikha o i-update ang tanong (awtomatikong nag-assign ng sort order) |
| DELETE | `/:id?formId=` | JWT | Form access | Tanggalin ang tanong |

## Sagot

Base path: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Itala ang sagot. Filter sa pamamagitan ng `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Lumikha o i-update ang sagot |

## Member Permission

Base path: `/membership/memberpermissions`

Kumokontrol ng per-member access sa specific na form.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | Makakuha ng member permission ayon sa ID |
| GET | `/member/:id` | JWT | Form access | Makakuha ng lahat ng form permission para sa isang miyembro |
| GET | `/form/:id` | JWT | Form access | Makakuha ng lahat ng member permission para sa isang form |
| GET | `/form/:id/my` | JWT | Form access | Makakuha ng kasalukuyang user ng permission para sa isang form |
| POST | `/` | JWT | Form access | Lumikha o i-update ang member permission |
| DELETE | `/:id?formId=` | JWT | Form access | Tanggalin ang member permission |
| DELETE | `/member/:id?formId=` | JWT | Form access | Tanggalin ang lahat ng permission para sa isang miyembro sa isang form |

## Setting

Base path: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Makakuha ng lahat ng setting para sa simbahan |
| GET | `/public/:churchId` | Public | — | Makakuha ng public setting para sa isang simbahan |
| POST | `/` | JWT | Settings.Edit | Magsave ng setting (sumusuporta ng base64 image upload) |

## Domain

Base path: `/membership/domains`

Nag-extend ng standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng domain |
| GET | `/:id` | JWT | — | Makakuha ng domain ayon sa ID |
| GET | `/lookup/:domainName` | JWT | — | Hanapin ang domain ayon sa pangalan |
| GET | `/public/lookup/:domainName` | Public | — | Public domain lookup ayon sa pangalan |
| GET | `/health/check` | Public | — | Magpatakbo ng health check sa unchecked domain |
| POST | `/` | JWT | Settings.Edit | Lumikha o i-update ang domain (nag-trigger ng Caddy update) |
| DELETE | `/:id` | JWT | Settings.Edit | Tanggalin ang domain |

## User Church

Base path: `/membership/userchurch`

Namamahala ang association sa pagitan ng user at simbahan.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Makakuha ng user-church record ayon sa user ID |
| GET | `/personid/:personId` | JWT | — | Makakuha ng email para sa naka-link na user ng tao |
| GET | `/user/:userId` | JWT | Server.Admin | I-load ang lahat ng simbahan para sa isang user |
| POST | `/` | JWT | — | Lumikha ng user-church association |
| PATCH | `/:userId` | JWT | — | I-update ang huling accessed time at mag-log ng access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Tanggalin ang user-church record |

## Visibility Preference

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Makakuha ng kasalukuyang user ng visibility preference |
| POST | `/` | JWT | — | Magsave ng visibility preference (address, phone, email visibility) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Natural language member search gamit ang AI. Body: `{ text, subDomain, siteUrl }` |

## Client Error

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | I-log ang client-side na error |

## Mga Kaugnay na Pahina

- [Authentication & Permission](./authentication) — Login flow, JWT, OAuth, permission model
- [Attendance Endpoint](./attendance) — Service at visit tracking
- [Module Structure](../module-structure) — Code organization pattern
