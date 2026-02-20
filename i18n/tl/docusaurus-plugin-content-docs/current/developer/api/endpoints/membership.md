---
title: "Mga Endpoint ng Membership"
---

# Mga Endpoint ng Membership

<div class="article-intro">

Pinapamahalaan ng Membership module ang mga tao, simbahan, grupo, sambahayan, tungkulin, pahintulot, form, at setting. Ito ang pinakamalaking module at nagbibigay ng pangunahing layer ng pagkakakilanlan at awtorisasyon para sa lahat ng ibang module.

</div>

**Base path:** `/membership`

## Mga Tao

Base path: `/membership/people`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Miyembro | Ilista ang lahat ng tao para sa simbahan |
| GET | `/:id` | JWT | People.View o sariling talaan | Kunin ang isang tao ayon sa ID (kasama ang mga form submission) |
| GET | `/ids?ids=` | JWT | People.View o Miyembro | Kunin ang maraming tao ayon sa mga ID na pinaghiwalay ng kuwit |
| GET | `/basic?ids=` | JWT | — | Kunin ang pangunahing impormasyon (pangalan lamang) para sa maraming tao |
| GET | `/recent` | JWT | People.View o Miyembro | Mga kamakailang nadagdag na tao |
| GET | `/search?term=&email=` | JWT | People.View o Miyembro | Maghanap ng mga tao ayon sa pangalan o email |
| GET | `/search/phone?number=` | JWT | People.View o Miyembro | Maghanap ayon sa numero ng telepono |
| GET | `/search/group?groupId=` | JWT | People.View o Miyembro | Kunin ang mga tao sa isang partikular na grupo |
| GET | `/household/:householdId` | JWT | — | Kunin ang lahat ng tao sa isang sambahayan |
| GET | `/attendance` | JWT | People.Edit | I-load ang mga dumalo na may mga filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | I-load ang data ng timeline para sa mga tao at grupo |
| GET | `/directory/:id` | JWT | — | Kunin ang tao para sa view ng direktoryo (iginagalang ang mga kagustuhan sa visibility) |
| GET | `/claim/:churchId` | JWT | — | I-claim ang isang talaan ng tao para sa kasalukuyang gumagamit sa isang simbahan |
| POST | `/` | JWT | People.Edit o EditSelf | Lumikha o mag-update ng mga tao (batch) |
| POST | `/search` | JWT | People.View o Miyembro | Maghanap ng mga tao (POST variant) |
| POST | `/advancedSearch` | JWT | People.View o Miyembro | Paghahanap na may maraming kundisyon (edad, buwang ng kapanganakan, membershipStatus, atbp.) |
| POST | `/loadOrCreate` | Pampubliko | — | Hanapin o lumikha ng tao ayon sa email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | I-update ang mga takdang-aralin ng miyembro ng sambahayan |
| POST | `/public/email` | Pampubliko | — | Magpadala ng email sa isang tao. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | I-load ang mga email ng tao ayon sa mga ID (server-to-server, nangangailangan ng jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang isang tao |

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

### Halimbawa: Lumikha ng isang Tao

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Mga Gumagamit

Base path: `/membership/users`

Tingnan ang [Authentication at Mga Pahintulot](./authentication) para sa mga endpoint ng pag-login, pagpaparehistro, at pamamahala ng password.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/login` | Pampubliko | — | Mag-login (email/password, JWT refresh, o authGuid) |
| POST | `/register` | Pampubliko | — | Magrehistro ng bagong gumagamit |
| POST | `/forgot` | Pampubliko | — | Magpadala ng email para sa pag-reset ng password |
| POST | `/setPasswordGuid` | Pampubliko | — | Magtakda ng password gamit ang auth GUID mula sa email link |
| POST | `/verifyCredentials` | Pampubliko | — | I-verify ang email/password at ibalik ang mga kaugnay na simbahan |
| POST | `/loadOrCreate` | JWT | — | Hanapin o lumikha ng gumagamit ayon sa email/userId |
| POST | `/setDisplayName` | JWT | — | I-update ang unang pangalan at apelyido ng gumagamit |
| POST | `/updateEmail` | JWT | — | Baguhin ang email address ng gumagamit |
| POST | `/updatePassword` | JWT | — | Baguhin ang password ng gumagamit (minimum 6 karakter) |
| POST | `/updateOptedOut` | JWT | — | Itakda ang opted-out na katayuan ng isang tao |
| GET | `/search?term=` | JWT | Server.Admin | Maghanap sa lahat ng gumagamit ayon sa pangalan/email |
| DELETE | `/` | JWT | — | Burahin ang kasalukuyang account ng gumagamit |

## Mga Simbahan

Base path: `/membership/churches`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng simbahan para sa kasalukuyang gumagamit |
| GET | `/:id` | JWT | — | Kunin ang simbahan ayon sa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Kunin ang domain admin user para sa isang simbahan |
| GET | `/:id/impersonate` | JWT | Server.Admin | Mag-impersonate ng isang simbahan (server admin lamang) |
| GET | `/all?term=` | JWT | Server.Admin | Maghanap sa lahat ng simbahan (admin) |
| GET | `/search/?name=` | Pampubliko | — | Maghanap ng mga simbahan ayon sa pangalan |
| GET | `/lookup/?subDomain=&id=` | Pampubliko | — | Maghanap ng isang simbahan ayon sa subdomain o ID |
| POST | `/` | JWT | Settings.Edit | I-update ang mga detalye ng simbahan |
| POST | `/add` | JWT | — | Magrehistro ng bagong simbahan. Mga kinakailangang field: name, address1, city, state, zip, country |
| POST | `/search` | Pampubliko | — | Maghanap ng mga simbahan ayon sa pangalan (POST variant) |
| POST | `/select` | JWT | — | Pumili/lumipat sa isang simbahan. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | I-archive o i-unarchive ang isang simbahan |
| POST | `/byIds` | Pampubliko | — | I-load ang maraming simbahan ayon sa mga ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Burahin ang mga simbahang inabandona nang 7+ araw |

## Mga Grupo

Base path: `/membership/groups`

Nag-eextend ng karaniwang CRUD (GET `/`, GET `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng grupo |
| GET | `/:id` | JWT | — | Kunin ang grupo ayon sa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Maghanap ng mga grupo ayon sa mga filter ng serbisyo |
| GET | `/my` | JWT | — | Kunin ang mga grupo para sa kasalukuyang gumagamit |
| GET | `/my/:tag` | JWT | — | Kunin ang mga grupo ng kasalukuyang gumagamit na na-filter ayon sa tag |
| GET | `/tag/:tag` | JWT | — | Kunin ang lahat ng grupo na may partikular na tag |
| GET | `/public/:churchId/:id` | Pampubliko | — | Kunin ang isang pampublikong grupo ayon sa simbahan at ID |
| GET | `/public/:churchId/tag/:tag` | Pampubliko | — | Kunin ang mga pampublikong grupo ayon sa tag |
| GET | `/public/:churchId/label?label=` | Pampubliko | — | Kunin ang mga pampublikong grupo ayon sa label |
| GET | `/public/:churchId/slug/:slug` | Pampubliko | — | Kunin ang isang pampublikong grupo ayon sa slug |
| POST | `/` | JWT | Groups.Edit | Lumikha o mag-update ng mga grupo (awtomatikong bumubuo ng slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Burahin ang isang grupo (binubura din ang mga child team para sa mga grupo ng ministeryo) |

## Mga Miyembro ng Grupo

Base path: `/membership/groupmembers`

Nag-eextend ng karaniwang CRUD (GET `/:id`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Kunin ang miyembro ng grupo ayon sa ID |
| GET | `/` | JWT | GroupMembers.View* | Ilista ang mga miyembro ng grupo. I-filter ayon sa `?groupId=`, `?groupIds=`, o `?personId=`. *Pinapayagan din kung ang gumagamit ay nasa grupo o naghahanap ng sariling personId |
| GET | `/my` | JWT | — | Kunin ang mga membership sa grupo ng kasalukuyang gumagamit |
| GET | `/basic/:groupId` | JWT | — | Kunin ang pangunahing listahan ng miyembro para sa isang grupo |
| GET | `/public/leaders/:churchId/:groupId` | Pampubliko | — | Kunin ang mga lider ng grupo (pampubliko) |
| POST | `/` | JWT | GroupMembers.Edit | Magdagdag o mag-update ng mga miyembro ng grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Alisin ang isang miyembro ng grupo |

## Mga Sambahayan

Base path: `/membership/households`

Karaniwang CRUD controller.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng sambahayan |
| GET | `/:id` | JWT | — | Kunin ang sambahayan ayon sa ID |
| POST | `/` | JWT | People.Edit | Lumikha o mag-update ng mga sambahayan |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang isang sambahayan |

## Mga Tungkulin

Base path: `/membership/roles`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Kunin ang tungkulin ayon sa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Kunin ang lahat ng tungkulin para sa isang simbahan |
| POST | `/` | JWT | Roles.Edit | Lumikha o mag-update ng mga tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang isang tungkulin (inaalis din ang mga pahintulot at miyembro nito) |

## Mga Miyembro ng Tungkulin

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga miyembro para sa isang tungkulin. Magdagdag ng `?include=users` para isama ang mga detalye ng gumagamit |
| POST | `/` | JWT | Roles.Edit | Magdagdag ng mga miyembro sa isang tungkulin (lumilikha ng gumagamit kung walang umiiral na email) |
| DELETE | `/:id` | JWT | Roles.View | Alisin ang isang miyembro ng tungkulin |
| DELETE | `/self/:churchId/:userId` | JWT | — | Alisin ang sarili mula sa isang simbahan |

## Mga Pahintulot ng Tungkulin

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga pahintulot para sa isang tungkulin (gamitin ang `null` bilang ID para sa tungkuling "Everyone") |
| POST | `/` | JWT | Roles.Edit | Lumikha o mag-update ng mga pahintulot ng tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang isang pahintulot ng tungkulin |

## Mga Pahintulot

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang buong listahan ng mga magagamit na pahintulot |

## Mga Form

Base path: `/membership/forms`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang lahat ng form (nakikita ng admin ang lahat; nakikita ng mga editor ang mga itinalaga + mga form na hindi para sa miyembro) |
| GET | `/:id` | JWT | Access sa Form | Kunin ang isang form ayon sa ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga naka-archive na form |
| GET | `/standalone/:id?churchId=` | JWT | — | Kunin ang isang standalone na form (ang mga pinaghihigpitang form ay nangangailangan ng auth) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Lumikha o mag-update ng mga form |
| DELETE | `/:id` | JWT | Access sa Form | Burahin ang isang form |

## Mga Pagsusumite ng Form

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga pagsusumite. I-filter ayon sa `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Kunin ang pagsusumite ayon sa ID. Magdagdag ng `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Access sa Form | Kunin ang lahat ng pagsusumite para sa isang form (kasama ang form, mga tanong, mga sagot) |
| POST | `/` | JWT | — | Magsumite ng mga sagot sa form (hina-handle ang mga pinaghihigpitan/hindi pinaghihigpitang form, nagpapadala ng mga abiso sa email) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Burahin ang isang pagsusumite at ang mga sagot nito |

## Mga Tanong

Base path: `/membership/questions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Access sa Form | Ilista ang mga tanong para sa isang form. Nangangailangan ng `?formId=` |
| GET | `/:id` | JWT | Access sa Form | Kunin ang isang tanong ayon sa ID |
| GET | `/unrestricted?formId=` | JWT | — | Kunin ang mga tanong para sa isang hindi pinaghihigpitang form |
| GET | `/sort/:id/up` | JWT | — | Ilipat ang isang tanong pataas sa sort order |
| GET | `/sort/:id/down` | JWT | — | Ilipat ang isang tanong pababa sa sort order |
| POST | `/` | JWT | Access sa Form | Lumikha o mag-update ng mga tanong (awtomatikong nagtatalaga ng sort order) |
| DELETE | `/:id?formId=` | JWT | Access sa Form | Burahin ang isang tanong |

## Mga Sagot

Base path: `/membership/answers`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga sagot. I-filter ayon sa `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Lumikha o mag-update ng mga sagot |

## Mga Pahintulot ng Miyembro

Base path: `/membership/memberpermissions`

Kinokontrol ang per-member na access sa mga partikular na form.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Access sa Form | Kunin ang isang pahintulot ng miyembro ayon sa ID |
| GET | `/member/:id` | JWT | Access sa Form | Kunin ang lahat ng pahintulot sa form para sa isang miyembro |
| GET | `/form/:id` | JWT | Access sa Form | Kunin ang lahat ng pahintulot ng miyembro para sa isang form |
| GET | `/form/:id/my` | JWT | Access sa Form | Kunin ang pahintulot ng kasalukuyang gumagamit para sa isang form |
| POST | `/` | JWT | Access sa Form | Lumikha o mag-update ng mga pahintulot ng miyembro |
| DELETE | `/:id?formId=` | JWT | Access sa Form | Burahin ang isang pahintulot ng miyembro |
| DELETE | `/member/:id?formId=` | JWT | Access sa Form | Burahin ang lahat ng pahintulot para sa isang miyembro sa isang form |

## Mga Setting

Base path: `/membership/settings`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting para sa simbahan |
| GET | `/public/:churchId` | Pampubliko | — | Kunin ang mga pampublikong setting para sa isang simbahan |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting (sinusuportahan ang base64 na pag-upload ng imahe) |

## Mga Domain

Base path: `/membership/domains`

Nag-eextend ng karaniwang CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng domain |
| GET | `/:id` | JWT | — | Kunin ang domain ayon sa ID |
| GET | `/lookup/:domainName` | JWT | — | Maghanap ng isang domain ayon sa pangalan |
| GET | `/public/lookup/:domainName` | Pampubliko | — | Pampublikong paghahanap ng domain ayon sa pangalan |
| GET | `/health/check` | Pampubliko | — | Magpatakbo ng health check sa mga hindi pa nasusuring domain |
| POST | `/` | JWT | Settings.Edit | Lumikha o mag-update ng mga domain (nagti-trigger ng Caddy update) |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang isang domain |

## User Church

Base path: `/membership/userchurch`

Pinapamahalaan ang ugnayan sa pagitan ng mga gumagamit at simbahan.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Kunin ang talaan ng user-church ayon sa user ID |
| GET | `/personid/:personId` | JWT | — | Kunin ang email para sa naka-link na gumagamit ng isang tao |
| GET | `/user/:userId` | JWT | Server.Admin | I-load ang lahat ng simbahan para sa isang gumagamit |
| POST | `/` | JWT | — | Lumikha ng ugnayan ng user-church |
| PATCH | `/:userId` | JWT | — | I-update ang huling oras ng pag-access at mag-log ng access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Burahin ang isang talaan ng user-church |

## Mga Kagustuhan sa Visibility

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga kagustuhan sa visibility ng kasalukuyang gumagamit |
| POST | `/` | JWT | — | I-save ang mga kagustuhan sa visibility (visibility ng address, telepono, email) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Paghahanap ng miyembro sa natural na wika gamit ang AI. Body: `{ text, subDomain, siteUrl }` |

## Mga Error ng Client

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Mag-log ng error sa panig ng client |

## Mga Kaugnay na Pahina

- [Authentication at Mga Pahintulot](./authentication) — Daloy ng pag-login, JWT, OAuth, modelo ng pahintulot
- [Mga Endpoint ng Attendance](./attendance) — Pagsubaybay ng serbisyo at pagbisita
- [Istraktura ng Module](../module-structure) — Mga pattern ng organisasyon ng code
