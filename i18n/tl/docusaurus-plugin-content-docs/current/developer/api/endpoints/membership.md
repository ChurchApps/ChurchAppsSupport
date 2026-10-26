---
title: "Mga Endpoint ng Membership"
---

# Mga Endpoint ng Membership

<div class="article-intro">

Pinamamahalaan ng modyul na Membership ang mga tao, simbahan, grupo, sambahayan, tungkulin, pahintulot, form, at setting. Ito ang pinakamalaking modyul at nagbibigay ng pangunahing layer ng pagkakakilanlan at awtorisasyon para sa lahat ng iba pang modyul.

</div>

**Pangunahing path:** `/membership`

## Mga Tao

Pangunahing path: `/membership/people`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Ilista ang lahat ng tao para sa simbahan |
| GET | `/:id` | JWT | People.View o sariling rekord | Kunin ang isang tao ayon sa ID (kasama ang mga form submission) |
| GET | `/ids?ids=` | JWT | People.View, Member, o People.ViewNames | Kunin ang maraming tao ayon sa mga ID na pinaghihiwalay ng kuwit. Ang mga tumatawag na may People.ViewNames ngunit walang People.View ay makakakuha ng basic model, at ang mga taong nag-opt out ay hindi isasama (maliban sa tumatawag) |
| GET | `/basic?ids=` | JWT | — | Kunin ang basic na impormasyon (pangalan lamang) para sa maraming tao |
| GET | `/names?ids=` | JWT | Anumang pahintulot sa simbahan | `[{ id, name: { display, first, last }, photo }]`, nakaayos ayon sa apelyido at pagkatapos ang unang pangalan, para sa mga ID na pinaghihiwalay ng kuwit na mayroon na ang tumatawag, upang ang mga tungkuling walang People.View (donations, attendance) ay makapagpangalan ng mga tao. Walang paghahanap at walang directory filter |
| POST | `/names` | JWT | Anumang pahintulot sa simbahan | Kapareho ng `GET /names`. Body: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, o People.ViewNames | Kamakailang idinagdag na mga tao. Ang mga tumatawag na may People.ViewNames ngunit walang People.View (kahit ang mga miyembrong may access sa directory) ay makakakuha ng basic model (`id`, `name.display`, `photo`, `membershipStatus`) at hindi isasama ang mga nag-opt out |
| GET | `/guest-register/options?churchId=` | Publiko | — | QR guest sign-up checklist: nagbabalik ng `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, na ang bawat isa ay `"off"`, `"optional"`, o `"required"` (binabasa mula sa pampublikong setting na `guestRegistrationFields`; ang nawawala o maling halaga ay babalik sa email/phone bilang optional at ang iba ay off). Kailangan ang `enableQRGuestRegistration` maliban kung ang request ay may katugmang site/church token; may rate limit (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, o People.ViewNames | Maghanap ng tao ayon sa pangalan o email (hanggang 100, nakaayos ayon sa apelyido at pagkatapos ang unang pangalan). Ang mga tumatawag na may People.ViewNames ngunit walang People.View (kahit ang mga miyembrong may access sa directory) ay makakakuha ng resulta ng paghahanap ayon sa pangalan na basic model; ang paghahanap ayon sa `email` ay nagbabalik ng `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Maghanap ayon sa numero ng telepono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Kunin ang mga tao sa isang partikular na grupo |
| GET | `/household/:householdId` | JWT | — | Kunin ang lahat ng tao sa isang sambahayan |
| GET | `/attendance` | JWT | People.Edit | Mag-load ng mga dumalo gamit ang mga filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Mag-load ng timeline data para sa mga tao at grupo |
| GET | `/directory/:id` | JWT | — | Kunin ang tao para sa directory view (sinusunod ang mga kagustuhan sa visibility) |
| GET | `/claim/:churchId` | JWT | — | Angkinin ang rekord ng tao para sa kasalukuyang user sa isang simbahan |
| POST | `/` | JWT | People.Edit o EditSelf | Gumawa o mag-update ng mga tao (batch) |
| POST | `/search` | JWT | People.View, Member, o People.ViewNames | Maghanap ng tao (POST variant). Body: `{ term }` o `{ email }`; kapareho ng mga patakaran sa names-only ng `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Paghahanap na may maraming kondisyon (edad, birthMonth, membershipStatus, atbp.). Ang body ay array ng mga kondisyon; ang walang laman na body ay nangangahulugang walang kondisyon, at ang anumang ibang body na hindi array ay nagbabalik ng 400 |
| POST | `/loadOrCreate` | Publiko | — | Maghanap o gumawa ng tao ayon sa email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Publiko | — | QR guest sign-up. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 miyembro; ang email/phone/maritalStatus ay para lamang sa unang miyembro). Ang mga field na pinatay ng simbahan ay tinatanggal; ang nawawala o hindi wastong kinakailangang halaga ay nagbabalik ng 400. Gumagawa ng bagong sambahayan (pinangalanan ayon sa apelyido ng unang miyembro) kung saan ang bawat miyembro ay may `membershipStatus: "Visitor"`, ibinabahagi ang `address` sa lahat ng miyembro, sine-save ang `comments` bilang tala sa pinuno ng sambahayan, idinaragdag ang lahat sa pribadong grupong `guestRegistrationGroupId` kung may nakatakda, at — kapag ang `guestRegistrationRecordAttendance` ay `"true"` — nagtatala ng attendance para sa mga naka-iskedyul na service time ng grupong iyon na bukas pa ang check-in window. Nagbabalik ng `{ householdId, people: [{ id, name }] }`. Kapareho ng opt-in/token at rate-limit na patakaran ng options call |
| POST | `/household/:householdId` | JWT | People.Edit | I-update ang mga assignment ng miyembro sa sambahayan |
| POST | `/public/email` | Publiko | — | Magpadala ng email sa isang tao. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Mag-load ng email ng tao ayon sa mga ID (server-to-server, kailangan ang jwtSecret) |
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

## Mga User

Pangunahing path: `/membership/users`

Tingnan ang [Pagpapatunay at Mga Pahintulot](./authentication) para sa mga endpoint ng login, registration, at pamamahala ng password.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/login` | Publiko | — | Mag-log in (email/password, JWT refresh, o authGuid) |
| POST | `/register` | Publiko | — | Magparehistro ng bagong user |
| POST | `/forgot` | Publiko | — | Magpadala ng email para sa pag-reset ng password |
| POST | `/setPasswordGuid` | Publiko | — | Magtakda ng password gamit ang auth GUID mula sa link sa email |
| POST | `/verifyCredentials` | Publiko | — | I-verify ang email/password at ibalik ang mga kaugnay na simbahan |
| POST | `/loadOrCreate` | JWT | — | Maghanap o gumawa ng user ayon sa email/userId |
| POST | `/setDisplayName` | JWT | — | I-update ang unang at apelyido ng user |
| POST | `/updateEmail` | JWT | — | Palitan ang email address ng user |
| POST | `/updatePassword` | JWT | — | Palitan ang password ng user (min. 6 na karakter) |
| POST | `/updateOptedOut` | JWT | — | Itakda ang opted-out status ng isang tao |
| POST | `/sendInviteEmail` | JWT | People.Edit | Magpadala ng imbitasyon sa email sa isang tao sa simbahang ito (`email`, `personName`, `contextName`). Ang button ay nagbabasa ng **Sign Up** para sa taong walang account at **Log In** para sa umiiral nang user. Ang user na hindi pa nakakapag-log in ay makakatanggap ng link na **Set Your Password** na mag-e-expire sa loob ng 7 araw. Ito ay nakapirmeng template, kaya hindi ito binibilang sa araw-araw na limitasyon ng email ng simbahan |
| GET | `/search?term=` | JWT | Server.Admin | Maghanap ng lahat ng user ayon sa pangalan/email |
| DELETE | `/` | JWT | — | Burahin ang kasalukuyang account ng user |

## Mga Simbahan

Pangunahing path: `/membership/churches`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | I-load ang lahat ng simbahan para sa kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang simbahan ayon sa ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Kunin ang domain admin user para sa isang simbahan |
| GET | `/:id/impersonate` | JWT | Server.Admin | I-impersonate ang isang simbahan (server admin lamang) |
| GET | `/all?term=` | JWT | Server.Admin | Maghanap ng lahat ng simbahan (admin) |
| GET | `/search/?name=` | Publiko | — | Maghanap ng simbahan ayon sa pangalan |
| GET | `/lookup/?subDomain=&id=` | Publiko | — | Maghanap ng simbahan ayon sa subdomain o ID |
| POST | `/` | JWT | Settings.Edit | I-update ang detalye ng simbahan |
| POST | `/add` | JWT | — | Magparehistro ng bagong simbahan. Kinakailangang field: name, address1, city, state, zip, country |
| POST | `/search` | Publiko | — | Maghanap ng simbahan ayon sa pangalan (POST variant) |
| POST | `/select` | JWT | — | Pumili/lumipat sa isang simbahan. Body: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | I-archive o i-unarchive ang isang simbahan |
| POST | `/byIds` | Publiko | — | Mag-load ng maraming simbahan ayon sa mga ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Burahin ang mga simbahang inabandona nang 7+ araw |

## Mga Grupo

Pangunahing path: `/membership/groups`

Nagpapalawak ng karaniwang CRUD (GET `/`, GET `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng grupo |
| GET | `/:id` | JWT | — | Kunin ang grupo ayon sa ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Maghanap ng grupo ayon sa service filter |
| GET | `/my` | JWT | — | Kunin ang mga grupo para sa kasalukuyang user |
| GET | `/my/:tag` | JWT | — | Kunin ang mga grupo ng kasalukuyang user na na-filter ayon sa tag |
| GET | `/tag/:tag` | JWT | — | Kunin ang lahat ng grupo na may partikular na tag |
| GET | `/public/:churchId/:id` | Publiko | — | Kunin ang pampublikong grupo ayon sa simbahan at ID |
| GET | `/public/:churchId/tag/:tag` | Publiko | — | Kunin ang mga pampublikong grupo ayon sa tag |
| GET | `/public/:churchId/label?label=` | Publiko | — | Kunin ang mga pampublikong grupo ayon sa label |
| GET | `/public/:churchId/slug/:slug` | Publiko | — | Kunin ang pampublikong grupo ayon sa slug |
| POST | `/` | JWT | Groups.Edit | Gumawa o mag-update ng grupo (awtomatikong gumagawa ng slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Burahin ang grupo (binubura rin ang mga child team para sa ministry group) |

## Mga Miyembro ng Grupo

Pangunahing path: `/membership/groupmembers`

Nagpapalawak ng karaniwang CRUD (GET `/:id`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Kunin ang miyembro ng grupo ayon sa ID |
| GET | `/` | JWT | GroupMembers.View* | Ilista ang mga miyembro ng grupo. I-filter gamit ang `?groupId=`, `?groupIds=`, o `?personId=`. *Pinapayagan din kung ang user ay nasa grupo o tinatanong ang sariling personId, at para sa `?groupId=` ng sinumang hindi confidential na grupo kapag may Attendance.View o Attendance.Edit ang user (kasama ang mga miyembrong wala pang 13 taong gulang para sa kanila) |
| GET | `/my` | JWT | — | Kunin ang mga membership sa grupo ng kasalukuyang user |
| GET | `/basic/:groupId` | JWT | — | Kunin ang basic na listahan ng miyembro ng isang grupo |
| GET | `/public/leaders/:churchId/:groupId` | Publiko | — | Kunin ang mga lider ng grupo (publiko) |
| GET | `/public/:churchId/:groupId` | Publiko | — | Kunin ang pampublikong roster ng grupo (minimal na field: `personId`, `displayName`, `leader`, photo). Available lamang kapag pumayag ang grupo sa `publicRoster`; ito ang nagpapagana ng elementong `staffGrid` ng website builder |
| POST | `/` | JWT | GroupMembers.Edit | Magdagdag o mag-update ng mga miyembro ng grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Alisin ang miyembro ng grupo |

## Mga Sambahayan

Pangunahing path: `/membership/households`

Standard CRUD controller.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng sambahayan |
| GET | `/:id` | JWT | — | Kunin ang sambahayan ayon sa ID |
| POST | `/` | JWT | People.Edit | Gumawa o mag-update ng mga sambahayan |
| DELETE | `/:id` | JWT | People.Edit | Burahin ang sambahayan |

## Mga Tungkulin

Pangunahing path: `/membership/roles`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Kunin ang tungkulin ayon sa ID |
| GET | `/church/:churchId` | JWT | Roles.View | Kunin ang lahat ng tungkulin para sa isang simbahan. Ang bawat tungkulin ay may kasamang `memberCount`, ang bilang ng magkakaibang user dito |
| POST | `/` | JWT | Roles.Edit | Gumawa o mag-update ng mga tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang tungkulin (tinatanggal din ang mga pahintulot at miyembro nito) |

## Mga Miyembro ng Tungkulin

Pangunahing path: `/membership/rolemembers`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga miyembro ng isang tungkulin. Idagdag ang `?include=users` para isama ang detalye ng user |
| POST | `/` | JWT | Roles.Edit | Magdagdag ng mga miyembro sa tungkulin (gumagawa ng user kung hindi pa umiiral ang email) |
| DELETE | `/:id` | JWT | Roles.View | Alisin ang miyembro ng tungkulin |
| DELETE | `/self/:churchId/:userId` | JWT | — | Alisin ang sarili mo sa isang simbahan |

## Mga Pahintulot ng Tungkulin

Pangunahing path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Kunin ang mga pahintulot ng isang tungkulin (gamitin ang `null` bilang ID para sa "Everyone" role) |
| POST | `/` | JWT | Roles.Edit | Gumawa o mag-update ng mga pahintulot ng tungkulin |
| DELETE | `/:id` | JWT | Roles.Edit | Burahin ang isang pahintulot ng tungkulin |

## Mga Pahintulot

Pangunahing path: `/membership/permissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang kumpletong listahan ng mga available na pahintulot |

Bawat entry ay may `apiName`, `section` (uri ng content), `action`, at ang mga label na `displaySection` / `displayAction` na ipinapakita ng role editor ng B1Admin. Mga kamakailang idinagdag: `MembershipApi` / `People` / `View Names` (**View People Names Only**, sa ilalim ng People and Groups) at `GivingApi` / `Donations` / `Enter` (**Enter Donations**, sa ilalim ng Donations; tingnan ang [Donation Batches](./giving.md#donation-batches)).

## Mga Form

Pangunahing path: `/membership/forms`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang lahat ng form (nakikita ng admin ang lahat; nakikita ng editor ang nakatalaga at ang mga non-member na form) |
| GET | `/:id` | JWT | Access sa form | Kunin ang form ayon sa ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga naka-archive na form |
| GET | `/group/:groupId` | JWT | Miyembro ng grupo, lider ng grupo, o Forms.Admin | Mga stand-alone na form na naka-link sa grupo (`forms.groupId`), hindi kasama ang mga naka-archive, nakaayos ayon sa pangalan. Nagbabalik ng `id`, `name`, `description`, at `open` (sa loob ng availability window). Ang mga miyembro ay mga bukas na form lamang ang nakukuha; nakukuha rin ng mga lider at forms admin ang mga sarado. Sinusuportahan ang mga naka-link na form ng group page |
| GET | `/standalone/:id?churchId=` | JWT | — | Kunin ang stand-alone na form (ang mga restricted na form ay nangangailangan ng auth) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Gumawa o mag-update ng mga form. Ang mga stand-alone na form ay tumatanggap ng opsyonal na `photoUrl` (header photo na ipinapakita sa itaas ng form) at `groupId` (naka-link na grupo) |
| DELETE | `/:id` | JWT | Access sa form | Burahin ang form |

## Mga Form Submission

Pangunahing path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga submission. I-filter gamit ang `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Sariling saklaw: hanggang 50 stand-alone na form submission (hindi person form) na isinumite ng naka-sign in na miyembro o naka-link sa kanilang tao (`contentType` na `person`, `contentId` = ID ng kanilang tao — halimbawa, pagkatapos ng pagbabago ng admin sa tao), pinakabago muna, bawat isa ay may `form.name`. Ang `include` ay naglalakip ng mga tanong ng bawat form at ng mga sagot ng submission. Nagbabalik ng `401` kung ang user ay hindi naka-link sa isang tao. Sinusuportahan ang seksyong **My Forms** ng B1 Me page |
| GET | `/group/:groupId` | JWT | Lider ng grupo | Mga sagot para sa mga lider ng grupo: isang entry bawat naka-link na form at bawat group event na may registration form, bawat isa ay may `form`, `event` (`id`, `title`, `start`; para lamang sa event entries), `questions`, at `submissions` (kasama ang `answers` at `personName`, `null` kapag anonymous) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, o view access | Kunin ang submission ayon sa ID. Idagdag ang `?include=form,questions,answers`. Maaari ring basahin ito ng mga lider ng naka-link na grupo ng form, at ng mga lider ng grupong kinabibilangan ng event registration |
| GET | `/formId/:formId` | JWT | Access sa form (view) | Kunin ang lahat ng submission para sa isang form (kasama ang form, questions, answers). May view access ang mga lider ng naka-link na grupo ng form |
| POST | `/` | JWT | — | Isumite ang mga sagot sa form (humahawak ng restricted/unrestricted na form, nagpapadala ng email notification). Kapag ang form ay may `autoCreatePerson`, naghahanap o gumagawa ng Guest na tao ayon sa email at ini-link ang submission; kapag may `groupId` din ang form, idinaragdag ang taong iyon sa grupo; kapag nakatakda ang `followUpSubject`/`followUpBody`, nagpapadala ng template na follow-up na email sa nagsumite. Maliban kung kayang pamahalaan ng tumatawag ang form, palaging nakatakda ang `submittedBy` sa tao ng naka-sign in na miyembro (o walang laman para sa anonymous na submission) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Burahin ang submission at ang mga sagot nito |

## Mga Tanong

Pangunahing path: `/membership/questions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Access sa form | Ilista ang mga tanong ng isang form. Kinakailangan ang `?formId=` |
| GET | `/:id` | JWT | Access sa form | Kunin ang tanong ayon sa ID |
| GET | `/unrestricted?formId=` | JWT | — | Kunin ang mga tanong ng isang unrestricted na form |
| GET | `/sort/:id/up` | JWT | — | Ilipat pataas ang tanong sa sort order |
| GET | `/sort/:id/down` | JWT | — | Ilipat pababa ang tanong sa sort order |
| POST | `/` | JWT | Access sa form | Gumawa o mag-update ng mga tanong (awtomatikong nagtatalaga ng sort order) |
| DELETE | `/:id?formId=` | JWT | Access sa form | Burahin ang tanong |

## Mga Sagot

Pangunahing path: `/membership/answers`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Ilista ang mga sagot. I-filter gamit ang `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Gumawa o mag-update ng mga sagot |

## Mga Pahintulot ng Miyembro

Pangunahing path: `/membership/memberpermissions`

Kinokontrol ang access ng bawat miyembro sa mga partikular na form.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Access sa form | Kunin ang pahintulot ng miyembro ayon sa ID |
| GET | `/member/:id` | JWT | Access sa form | Kunin ang lahat ng pahintulot sa form ng isang miyembro |
| GET | `/form/:id` | JWT | Access sa form | Kunin ang lahat ng pahintulot ng miyembro para sa isang form |
| GET | `/form/:id/my` | JWT | Access sa form | Kunin ang pahintulot ng kasalukuyang user para sa isang form |
| POST | `/` | JWT | Access sa form | Gumawa o mag-update ng mga pahintulot ng miyembro |
| DELETE | `/:id?formId=` | JWT | Access sa form | Burahin ang pahintulot ng miyembro |
| DELETE | `/member/:id?formId=` | JWT | Access sa form | Burahin ang lahat ng pahintulot ng miyembro sa isang form |

## Mga Setting

Pangunahing path: `/membership/settings`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting ng simbahan |
| GET | `/public/:churchId` | Publiko | — | Kunin ang pampublikong setting ng isang simbahan |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting (sumusuporta sa base64 na pag-upload ng larawan) |

## Mga Domain

Pangunahing path: `/membership/domains`

Nagpapalawak ng karaniwang CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng domain |
| GET | `/:id` | JWT | — | Kunin ang domain ayon sa ID |
| GET | `/lookup/:domainName` | JWT | — | Maghanap ng domain ayon sa pangalan |
| GET | `/public/lookup/:domainName` | Publiko | — | Pampublikong paghahanap ng domain ayon sa pangalan |
| GET | `/health/check` | Publiko | — | Patakbuhin ang health check sa mga domain na hindi pa na-check |
| POST | `/` | JWT | Settings.Edit | Gumawa o mag-update ng mga domain (nag-trigger ng update sa Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Burahin ang domain |

## User Church

Pangunahing path: `/membership/userchurch`

Pinamamahalaan ang ugnayan sa pagitan ng mga user at simbahan.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Kunin ang user-church record ayon sa user ID |
| GET | `/personid/:personId` | JWT | — | Kunin ang email ng naka-link na user ng isang tao |
| GET | `/user/:userId` | JWT | Server.Admin | I-load ang lahat ng simbahan ng isang user |
| POST | `/` | JWT | — | Gumawa ng user-church association |
| PATCH | `/:userId` | JWT | — | I-update ang huling oras ng access at itala ang access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Burahin ang user-church record |

## Mga Kagustuhan sa Visibility

Pangunahing path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga kagustuhan sa visibility ng kasalukuyang user |
| POST | `/` | JWT | — | I-save ang mga kagustuhan sa visibility (visibility ng address, phone, email) |

## Query

Pangunahing path: `/membership/query`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Natural language na paghahanap ng miyembro gamit ang AI. Body: `{ text, subDomain, siteUrl }` |

## Mga Error ng Client

Pangunahing path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Itala ang error sa panig ng client |

## Mga Kaugnay na Pahina

- [Pagpapatunay at Mga Pahintulot](./authentication) — Daloy ng login, JWT, OAuth, modelo ng pahintulot
- [Mga Endpoint ng Attendance](./attendance) — Pagsubaybay sa serbisyo at pagbisita
- [Istruktura ng Modyul](../module-structure) — Mga pattern ng organisasyon ng code
