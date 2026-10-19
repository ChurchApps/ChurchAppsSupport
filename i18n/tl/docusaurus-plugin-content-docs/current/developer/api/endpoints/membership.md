---
title: "Mga Membership Endpoint"
---

# Mga Membership Endpoint

<div class="article-intro">

Pinamamahalaan ng Membership module ang mga tao, simbahan, grupo, sambahayan, tungkulin, pahintulot, form, at settings. Ito ang pinakamalaking module at nagbibigay ng pangunahing layer ng pagkakakilanlan at awtorisasyon para sa lahat ng iba pang module.

</div>

**Pangunahing path:** `/membership`

## Mga Tao

Pangunahing path: `/membership/people`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or Member | Ilista ang lahat ng tao para sa simbahan |
| GET | `/:id` | JWT | People.View or own record | Kunin ang tao ayon sa ID (kasama ang mga form submission) |
| GET | `/ids?ids=` | JWT | People.View or Member | Kunin ang maraming tao ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/basic?ids=` | JWT | — | Kunin ang basic na impormasyon (pangalan lamang) ng maraming tao |
| GET | `/names?ids=` | JWT | Anumang pahintulot ng simbahan | `[{ id, name: { display, first, last }, photo }]`, nakaayos ayon sa apelyido at pagkatapos ang pangalan, para sa mga comma-separated na ids na hawak na ng tumatawag, upang ang mga tungkulin na walang People.View (donations, attendance) ay maipakita ang pangalan ng mga tao. Walang search at walang directory filter |
| POST | `/names` | JWT | Anumang pahintulot ng simbahan | Kapareho ng `GET /names`. Body: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, o People.ViewNames | Kamakailang idinagdag na mga tao. Ang mga tumatawag na People.ViewNames lamang ay makakakuha ng basic model (`id`, `name.display`, `photo`, `membershipStatus`) at hindi kasama ang mga taong nag-opt out |
| GET | `/search?term=&email=` | JWT | People.View, Member, o People.ViewNames | Maghanap ng tao ayon sa pangalan o email (hanggang 100, nakaayos ayon sa apelyido at pagkatapos ang pangalan). Ang mga tumatawag na People.ViewNames lamang ay makakakuha ng paghahanap ayon sa pangalan na nagbabalik ng basic model; ang paghahanap ayon sa `email` ay nagbabalik ng `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Maghanap ayon sa numero ng telepono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Kunin ang mga tao sa partikular na grupo |
| GET | `/household/:householdId` | JWT | — | Kunin ang lahat ng tao sa isang sambahayan |
| GET | `/attendance` | JWT | People.Edit | Mag-load ng mga dumalo gamit ang filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Mag-load ng timeline data para sa mga tao at grupo |
| GET | `/directory/:id` | JWT | — | Kunin ang tao para sa directory view (sinusunod ang mga visibility preference) |
| GET | `/claim/:churchId` | JWT | — | I-claim ang record ng tao para sa kasalukuyang user sa isang simbahan |
| POST | `/` | JWT | People.Edit o EditSelf | Gumawa o mag-update ng mga tao (batch) |
| POST | `/search` | JWT | People.View, Member, o People.ViewNames | Maghanap ng tao (POST variant). Body: `{ term }` o `{ email }`; kapareho ng mga patakaran sa names-only ng `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Maramihang kondisyon na paghahanap (edad, birthMonth, membershipStatus, atbp.) |
| POST | `/loadOrCreate` | Public | — | Hanapin o gumawa ng tao ayon sa email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | I-update ang mga miyembro ng sambahayan |
| POST | `/public/email` | Public | — | Magpadala ng email sa isang tao. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Mag-load ng email ng tao ayon sa mga ID (server-to-server, nangangailangan ng jwtSecret) |
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

## Mga User {#users}

Pangunahing path: `/membership/users`

Tingnan ang [Authentication & Permissions](./authentication) para sa mga endpoint ng login, registration, at pamamahala ng password.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Mag-log in (email/password, JWT refresh, o authGuid) |
| POST | `/register` | Public | — | Magparehistro ng bagong user |
| POST | `/forgot` | Public | — | Magpadala ng email para sa pag-reset ng password |
| POST | `/setPasswordGuid` | Public | — | Itakda ang password gamit ang auth GUID mula sa email link |
| POST | `/verifyCredentials` | Public | — | I-verify ang email/password at ibalik ang mga kaugnay na simbahan |
| POST | `/loadOrCreate` | JWT | — | Hanapin o gumawa ng user ayon sa email/userId |
| POST | `/setDisplayName` | JWT | — | I-update ang first at last name ng user |
| POST | `/updateEmail` | JWT | — | Palitan ang email address ng user |
| POST | `/updatePassword` | JWT | — | Palitan ang password ng user (min 6 na karakter) |
| POST | `/updateOptedOut` | JWT | — | Itakda ang opted-out status ng isang tao |
| POST | `/sendInviteEmail` | JWT | People.Edit | Magpadala ng invite email sa isang tao sa simbahang ito (`email`, `personName`, `contextName`). Ang button ay nagbabasa ng **Sign Up** para sa taong walang account at **Log In** para sa umiiral na user. Ang user na hindi pa nakapag-log in ay makakatanggap ng link na **Set Your Password** na mag-e-expire sa loob ng 7 araw. Binibilang sa araw-araw na limitasyon ng email ng simbahan (`429` kapag naabot) |
| GET | `/search?term=` | JWT | Server.Admin | Maghanap ng lahat ng user ayon sa pangalan/email |
| DELETE | `/` | JWT | — | Burahin ang kasalukuyang account ng user |

## Mga Simbahan

Pangunahing path: `/membership/churches`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Mag-load ng lahat ng simbahan para sa kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang simbahan ayon sa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Kunin ang domain admin user para sa isang simbahan |
| GET | `/:id/impersonate` | JWT | Server.Admin | I-impersonate ang isang simbahan (server admin lamang) |
| GET | `/all?term=` | JWT | Server.Admin | Maghanap ng lahat ng simbahan (admin) |
| GET | `/search/?name=` | Public | — | Maghanap ng simbahan ayon sa pangalan |
| GET | `/lookup/?subDomain=&id=` | Public | — | Hanapin ang simbahan ayon sa subdomain o ID |
| POST | `/` | JWT | Settings.Edit | I-update ang detalye ng simbahan |
| POST | `/add` | JWT | — | Magparehistro ng bagong simbahan. Kinakailangang field: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Maghanap ng simbahan ayon sa pangalan (POST variant) |
| POST | `/select` | JWT | — | Piliin/lumipat sa isang simbahan. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | I-archive o i-unarchive ang isang simbahan |
| POST | `/byIds` | Public | — | Mag-load ng maraming simbahan ayon sa mga ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Burahin ang mga simbahang inabandona nang 7+ araw |

## Mga Grupo

Pangunahing path: `/membership/groups`

Pinalawak ang standard CRUD (GET `/`, GET `/:id` mula sa base class).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng grupo |
| GET | `/:id` | JWT | — | Kunin ang grupo ayon sa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Maghanap ng grupo ayon sa service filter |
| GET | `/my` | JWT | — | Kunin ang mga grupo para sa kasalukuyang user |
| GET | `/my/:tag` | JWT | — | Kunin ang mga grupo ng kasalukuyang user na na-filter ayon sa tag |
| GET | `/tag/:tag` | JWT | — | Kunin ang lahat ng grupo na may partikular na tag |
| GET | `/public/:churchId/:id` | Public | — | Kunin ang pampublikong grupo ayon sa simbahan at ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Kunin ang mga pampublikong grupo ayon sa tag |
| GET | `/public/:churchId/label?label=` | Public | — | Kunin ang mga pampublikong grupo ayon sa label |
| GET | `/public/:churchId/slug/:slug` | Public | — | Kunin ang pampublikong grupo ayon sa slug |
| POST | `/` | JWT | Groups.Edit | Gumawa o mag-update ng mga grupo (awtomatikong gumagawa ng slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Burahin ang grupo (binubura rin ang mga child team para sa ministry group) |

## Mga Miyembro ng Grupo

Pangunahing path: `/membership/groupmembers`

Pinalawak ang standard CRUD (GET `/:id`, DELETE `/:id` mula sa base class).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Kunin ang miyembro ng grupo ayon sa ID |
| GET | `/` | JWT | GroupMembers.View* | Ilista ang mga miyembro ng grupo. I-filter gamit ang `?groupId=`, `?groupIds=`, o `?personId=`. *Pinapayagan din kung ang user ay nasa grupo o hinahanap ang sariling personId |
| GET | `/my` | JWT | — | Kunin ang mga membership ng grupo ng kasalukuyang user |
| GET | `/basic/:groupId` | JWT | — | Kunin ang basic na listahan ng miyembro para sa isang grupo |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Kunin ang mga lider ng grupo (pampubliko) |
| GET | `/public/:churchId/:groupId` | Public | — | Kunin ang pampublikong roster ng grupo (minimal na field: `personId`, `displayName`, `leader`, photo). Lamang kapag pinili ng grupo ang `publicRoster`; ginagamit ng website builder ang elementong `staffGrid` |
| POST | `/` | JWT | GroupMembers.Edit | Magdagdag o mag-update ng mga miyembro ng grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Alisin ang miyembro ng grupo |

## Mga Sambahayan

Pangunahing path: `/membership/households`

Standard na CRUD controller.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng sambahayan |
| GET | `/:id` | JWT | — | Kunin ang sambahayan ayon sa ID |
| POST | `/` | JWT | People.Edit | Gumawa o mag-update ng mga sambahayan |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang sambahayan |

## Mga Tungkulin

Pangunahing path: `/membership/roles`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Kunin ang tungkulin ayon sa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Kunin ang lahat ng tungkulin para sa simbahan |
| POST | `/` | JWT | Roles.Edit | Gumawa o mag-update ng mga tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang tungkulin (binubura rin ang mga pahintulot at miyembro nito) |

## Mga Miyembro ng Tungkulin

Pangunahing path: `/membership/rolemembers`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga miyembro ng tungkulin. Idagdag ang `?include=users` para isama ang detalye ng user |
| POST | `/` | JWT | Roles.Edit | Magdagdag ng miyembro sa tungkulin (gumagawa ng user kung hindi pa umiiral ang email) |
| DELETE | `/:id` | JWT | Roles.View | Alisin ang miyembro ng tungkulin |
| DELETE | `/self/:churchId/:userId` | JWT | — | Alisin ang sarili mo sa isang simbahan |

## Mga Pahintulot ng Tungkulin

Pangunahing path: `/membership/rolepermissions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga pahintulot ng tungkulin (gamitin ang `null` bilang ID para sa tungkulin na "Everyone") |
| POST | `/` | JWT | Roles.Edit | Gumawa o mag-update ng mga pahintulot ng tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang pahintulot ng tungkulin |

## Mga Pahintulot

Pangunahing path: `/membership/permissions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang buong listahan ng available na pahintulot |

Bawat entry ay may `apiName`, `section` (uri ng content), `action`, at ang `displaySection` / `displayAction` na label na ipinapakita ng role editor ng B1Admin. Mga kamakailang idinagdag: `MembershipApi` / `People` / `View Names` (**View People Names Only**, sa ilalim ng People and Groups) at `GivingApi` / `Donations` / `Enter` (**Enter Donations**, sa ilalim ng Donations; tingnan ang [Donation Batches](./giving.md#donation-batches)).

## Mga Form

Pangunahing path: `/membership/forms`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang lahat ng form (nakikita ng admin ang lahat; nakikita ng editor ang nakatalaga at non-member na form) |
| GET | `/:id` | JWT | Access sa form | Kunin ang form ayon sa ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga naka-archive na form |
| GET | `/standalone/:id?churchId=` | JWT | — | Kunin ang standalone na form (ang restricted na form ay nangangailangan ng auth) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Gumawa o mag-update ng mga form |
| DELETE | `/:id` | JWT | Access sa form | Burahin ang form |

## Mga Submission ng Form

Pangunahing path: `/membership/formsubmissions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga submission. I-filter gamit ang `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Kunin ang submission ayon sa ID. Idagdag ang `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Access sa form | Kunin ang lahat ng submission para sa isang form (kasama ang form, questions, answers) |
| POST | `/` | JWT | — | Ipasa ang mga sagot sa form (humahawak ng restricted/unrestricted na form, nagpapadala ng email notification). Kapag may `autoCreatePerson` ang form, humahanap-o-gumagawa ng Guest na tao ayon sa email at iniuugnay ang submission; kapag may nakatakda na `followUpSubject`/`followUpBody`, nagpapadala ng templated na follow-up email sa nagsumite |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Burahin ang submission at ang mga sagot nito |

## Mga Tanong

Pangunahing path: `/membership/questions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Access sa form | Ilista ang mga tanong para sa form. Kinakailangan ang `?formId=` |
| GET | `/:id` | JWT | Access sa form | Kunin ang tanong ayon sa ID |
| GET | `/unrestricted?formId=` | JWT | — | Kunin ang mga tanong para sa unrestricted na form |
| GET | `/sort/:id/up` | JWT | — | Ilipat pataas ang tanong sa sort order |
| GET | `/sort/:id/down` | JWT | — | Ilipat pababa ang tanong sa sort order |
| POST | `/` | JWT | Access sa form | Gumawa o mag-update ng mga tanong (awtomatikong nagtatalaga ng sort order) |
| DELETE | `/:id?formId=` | JWT | Access sa form | Burahin ang tanong |

## Mga Sagot

Pangunahing path: `/membership/answers`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga sagot. I-filter gamit ang `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Gumawa o mag-update ng mga sagot |

## Pahintulot ng Miyembro

Pangunahing path: `/membership/memberpermissions`

Kinokontrol ang access ng bawat miyembro sa partikular na mga form.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Access sa form | Kunin ang pahintulot ng miyembro ayon sa ID |
| GET | `/member/:id` | JWT | Access sa form | Kunin ang lahat ng pahintulot sa form para sa isang miyembro |
| GET | `/form/:id` | JWT | Access sa form | Kunin ang lahat ng pahintulot ng miyembro para sa isang form |
| GET | `/form/:id/my` | JWT | Access sa form | Kunin ang pahintulot ng kasalukuyang user sa isang form |
| POST | `/` | JWT | Access sa form | Gumawa o mag-update ng pahintulot ng miyembro |
| DELETE | `/:id?formId=` | JWT | Access sa form | Burahin ang pahintulot ng miyembro |
| DELETE | `/member/:id?formId=` | JWT | Access sa form | Burahin ang lahat ng pahintulot ng miyembro sa isang form |

## Mga Setting

Pangunahing path: `/membership/settings`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting ng simbahan |
| GET | `/public/:churchId` | Public | — | Kunin ang pampublikong setting ng simbahan |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting (sumusuporta sa base64 na pag-upload ng larawan) |

## Mga Domain

Pangunahing path: `/membership/domains`

Pinalawak ang standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng domain |
| GET | `/:id` | JWT | — | Kunin ang domain ayon sa ID |
| GET | `/lookup/:domainName` | JWT | — | Hanapin ang domain ayon sa pangalan |
| GET | `/public/lookup/:domainName` | Public | — | Pampublikong paghahanap ng domain ayon sa pangalan |
| GET | `/health/check` | Public | — | Patakbuhin ang health check sa mga hindi pa nasusuring domain |
| POST | `/` | JWT | Settings.Edit | Gumawa o mag-update ng mga domain (nag-trigger ng update sa Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang domain |

## User Church

Pangunahing path: `/membership/userchurch`

Pinamamahalaan ang ugnayan sa pagitan ng mga user at simbahan.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Kunin ang user-church record ayon sa user ID |
| GET | `/personid/:personId` | JWT | — | Kunin ang email ng naka-link na user ng tao |
| GET | `/user/:userId` | JWT | Server.Admin | Mag-load ng lahat ng simbahan para sa isang user |
| POST | `/` | JWT | — | Gumawa ng user-church na ugnayan |
| PATCH | `/:userId` | JWT | — | I-update ang huling oras ng pag-access at itala ang access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Burahin ang user-church record |

## Mga Visibility Preference

Pangunahing path: `/membership/visibilityPreferences`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang visibility preference ng kasalukuyang user |
| POST | `/` | JWT | — | I-save ang visibility preference (visibility ng address, telepono, email) |

## Query

Pangunahing path: `/membership/query`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Natural na paghahanap ng miyembro gamit ang AI. Body: `{ text, subDomain, siteUrl }` |

## Mga Client Error

Pangunahing path: `/membership/clientErrors`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Itala ang client-side na error |

## Mga Kaugnay na Pahina

- [Authentication & Permissions](./authentication) — Daloy ng login, JWT, OAuth, modelo ng pahintulot
- [Attendance Endpoints](./attendance) — Pagsubaybay ng serbisyo at pagbisita
- [Module Structure](../module-structure) — Mga pattern ng organisasyon ng code
