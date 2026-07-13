---
title: "Ema-Endpoint E-Membership"
---

# Ema-Endpoint E-Membership

<div class="article-intro">

I-module ye-Membership iphatsa bantfu, emabandla, emacembu, emakhaya, ema-role, timvumo, emafomu, kanye netilungiselelo. Iyona module lenkhulu kakhulu futsi iniketa lulwandle lwebunikati nekuvunyelwa lwato tonkhe leminye i-module.

</div>

**Umkhondvo Losisekelo:** `/membership`

## Bantfu

Umkhondvo losisekelo: `/membership/people`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View nobe Lilunga | Bala bonkhe bantfu belibandla |
| GET | `/:id` | JWT | People.View nobe umbhalo wakhe | Tfola umuntfu nge-ID (kufaka kufakwa kwemafomu) |
| GET | `/ids?ids=` | JWT | People.View nobe Lilunga | Tfola bantfu labanyenti nge-ID letihlukaniswe ngekhoma |
| GET | `/basic?ids=` | JWT | — | Tfola imininingwane lesisekelo (ligama kuphela) yebantfu labanyenti |
| GET | `/recent` | JWT | People.View nobe Lilunga | Bantfu labengetwe muva nyalo |
| GET | `/search?term=&email=` | JWT | People.View nobe Lilunga | Fumana bantfu nge-ligama nobe i-imeyili |
| GET | `/search/phone?number=` | JWT | People.View nobe Lilunga | Fumana nge-inombolo yeselula |
| GET | `/search/group?groupId=` | JWT | People.View nobe Lilunga | Tfola bantfu belicembu lelitsite |
| GET | `/household/:householdId` | JWT | — | Tfola bonkhe bantfu belikhaya |
| GET | `/attendance` | JWT | People.Edit | Layisha lababekhona ngekucenga (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Layisha idatha ye-timeline yebantfu nemacembu |
| GET | `/directory/:id` | JWT | — | Tfola umuntfu wekubukwa ku-directory (ihlonipha tikhetselo tekubonakala) |
| GET | `/claim/:churchId` | JWT | — | Cela umbhalo womuntfu kumsebentisi wanyalo elibandleni |
| POST | `/` | JWT | People.Edit nobe EditSelf | Akha nobe buyeketa bantfu (batch) |
| POST | `/search` | JWT | People.View nobe Lilunga | Fumana bantfu (indlela ye-POST) |
| POST | `/advancedSearch` | JWT | People.View nobe Lilunga | Kufuna ngetimo letinyenti (bunyaka, inyanga yekutalwa, simo selilunga, njll.) |
| POST | `/loadOrCreate` | Ngeyeveleni | — | Fumana nobe wakhe umuntfu nge-imeyili. Umtimba: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Buyeketa kwabelwa kwemalunga elikhaya |
| POST | `/public/email` | Ngeyeveleni | — | Tfumela i-imeyili kumuntfu. Umtimba: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Ngengekhatsi | — | Layisha ema-imeyili abantfu nge-ID (server-ku-server, idzinga jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Sula umuntfu |

### Sibonelo: Fumana Bantfu

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

### Sibonelo: Akha Umuntfu

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Basebentisi

Umkhondvo losisekelo: `/membership/users`

Buka [Authentication & Permissions](./authentication) kuma-endpoint ekungena, kubhaliswa, kanye nekuphatsa liphasiwedi.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/login` | Ngeyeveleni | — | Ngena (imeyili/liphasiwedi, JWT refresh, nobe authGuid) |
| POST | `/register` | Ngeyeveleni | — | Bhalisa umsebentisi lomusha |
| POST | `/forgot` | Ngeyeveleni | — | Tfumela i-imeyili yekusetja liphasiwedi kabusha |
| POST | `/setPasswordGuid` | Ngeyeveleni | — | Setja liphasiwedi kusetjentiswa auth GUID lesuka ku-linki ye-imeyili |
| POST | `/verifyCredentials` | Ngeyeveleni | — | Cinisekisa imeyili/liphasiwedi bese ubuyisela emabandla lahlobene |
| POST | `/loadOrCreate` | JWT | — | Fumana nobe wakhe umsebentisi nge-imeyili/userId |
| POST | `/setDisplayName` | JWT | — | Buyeketa ligama lekucala nelekugcina lemsebentisi |
| POST | `/updateEmail` | JWT | — | Shintja i-imeyili yemsebentisi |
| POST | `/updatePassword` | JWT | — | Shintja liphasiwedi lemsebentisi (kungenele tinhlamvu leti-6) |
| POST | `/updateOptedOut` | JWT | — | Setja simo semuntfu sekutephula |
| GET | `/search?term=` | JWT | Server.Admin | Fumana bonkhe basebentisi nge-ligama/imeyili |
| DELETE | `/` | JWT | — | Sula i-akhawundi yemsebentisi wanyalo |

## Emabandla

Umkhondvo losisekelo: `/membership/churches`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Layisha onkhe emabandla emsebentisi wanyalo |
| GET | `/:id` | JWT | — | Tfola libandla nge-ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Tfola umsebentisi we-domain admin welibandla |
| GET | `/:id/impersonate` | JWT | Server.Admin | Yenta njengalibandla (server admin kuphela) |
| GET | `/all?term=` | JWT | Server.Admin | Fumana onkhe emabandla (admin) |
| GET | `/search/?name=` | Ngeyeveleni | — | Fumana emabandla nge-ligama |
| GET | `/lookup/?subDomain=&id=` | Ngeyeveleni | — | Fumana libandla nge-subdomain nobe ID |
| POST | `/` | JWT | Settings.Edit | Buyeketa imininingwane yelibandla |
| POST | `/add` | JWT | — | Bhalisa libandla lelisha. Tinsimu letidzingekako: ligama, likheli 1, dolobha, sifundza, khodi yeposi, live |
| POST | `/search` | Ngeyeveleni | — | Fumana emabandla nge-ligama (indlela ye-POST) |
| POST | `/select` | JWT | — | Khetsa/shintjela kulibandla. Umtimba: `{ churchId }` nobe `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Gcina nobe khipha libandla ku-archive |
| POST | `/byIds` | Ngeyeveleni | — | Layisha emabandla lamanyenti nge-ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Sula emabandla lashiywe emalanga langu-7+ |

## Emacembu

Umkhondvo losisekelo: `/membership/groups`

Yandzisa i-CRUD levamile (GET `/`, GET `/:id` kusuka ku-base class).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala onkhe emacembu |
| GET | `/:id` | JWT | — | Tfola licembu nge-ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Fumana emacembu ngekucenga kwe-service |
| GET | `/my` | JWT | — | Tfola emacembu emsebentisi wanyalo |
| GET | `/my/:tag` | JWT | — | Tfola emacembu emsebentisi wanyalo acengiwe nge-tag |
| GET | `/tag/:tag` | JWT | — | Tfola onkhe emacembu lanetag lelitsite |
| GET | `/public/:churchId/:id` | Ngeyeveleni | — | Tfola licembu leveleni nge-libandla ne-ID |
| GET | `/public/:churchId/tag/:tag` | Ngeyeveleni | — | Tfola emacembu eveleni nge-tag |
| GET | `/public/:churchId/label?label=` | Ngeyeveleni | — | Tfola emacembu eveleni nge-label |
| GET | `/public/:churchId/slug/:slug` | Ngeyeveleni | — | Tfola licembu leveleni nge-slug |
| POST | `/` | JWT | Groups.Edit | Akha nobe buyeketa emacembu (izenzakalelisa kukhicita slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Sula licembu (isule futsi emathimba emntfwana emacembu e-ministry) |

## Emalunga Elicembu

Umkhondvo losisekelo: `/membership/groupmembers`

Yandzisa i-CRUD levamile (GET `/:id`, DELETE `/:id` kusuka ku-base class).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Tfola lilunga lelicembu nge-ID |
| GET | `/` | JWT | GroupMembers.View* | Bala emalunga elicembu. Cenga nge-`?groupId=`, `?groupIds=`, nobe `?personId=`. *Kuvunyiwe futsi nangabe umsebentisi ukulelocembu nobe ubuta i-personId yakhe |
| GET | `/my` | JWT | — | Tfola kuba lilunga kwemsebentisi wanyalo |
| GET | `/basic/:groupId` | JWT | — | Tfola luhla lolusisekelo lwemalunga elicembu |
| GET | `/public/leaders/:churchId/:groupId` | Ngeyeveleni | — | Tfola baholi belicembu (yeveleni) |
| GET | `/public/:churchId/:groupId` | Ngeyeveleni | — | Tfola luhla lweveleni lwelicembu (tinsimu letincane: `personId`, `displayName`, `leader`, sitfombe). Kuphela nangabe licembu likhetse ku-`publicRoster`; isebentisa element ye-`staffGrid` ye-website builder |
| POST | `/` | JWT | GroupMembers.Edit | Engeta nobe buyeketa emalunga elicembu |
| DELETE | `/:id` | JWT | GroupMembers.View | Susa lilunga lelicembu |

## Emakhaya

Umkhondvo losisekelo: `/membership/households`

Layela lwe-CRUD levamile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala onkhe emakhaya |
| GET | `/:id` | JWT | — | Tfola likhaya nge-ID |
| POST | `/` | JWT | People.Edit | Akha nobe buyeketa emakhaya |
| DELETE | `/:id` | JWT | People.Edit | Sula likhaya |

## Ema-Role

Umkhondvo losisekelo: `/membership/roles`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Tfola role nge-ID |
| GET | `/church/:churchId` | JWT | Roles.View | Tfola onkhe ema-role elibandla |
| POST | `/` | JWT | Roles.Edit | Akha nobe buyeketa ema-role |
| DELETE | `/:id` | JWT | Roles.Edit | Sula role (isule futsi timvumo netilunga tayo) |

## Emalunga E-Role

Umkhondvo losisekelo: `/membership/rolemembers`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Tfola emalunga e-role. Engeta `?include=users` kufaka imininingwane yebasebentisi |
| POST | `/` | JWT | Roles.Edit | Engeta emalunga ku-role (yakha umsebentisi nangabe imeyili ingekho) |
| DELETE | `/:id` | JWT | Roles.View | Susa lilunga le-role |
| DELETE | `/self/:churchId/:userId` | JWT | — | Sula wena ngokwakho elibandleni |

## Timvumo Te-Role

Umkhondvo losisekelo: `/membership/rolepermissions`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Tfola timvumo te-role (sebentisa `null` njenge-ID ye-role "Everyone") |
| POST | `/` | JWT | Roles.Edit | Akha nobe buyeketa timvumo te-role |
| DELETE | `/:id` | JWT | Roles.Edit | Sula imvumo ye-role |

## Timvumo

Umkhondvo losisekelo: `/membership/permissions`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Tfola luhla lolugcwele lwetimvumo letitfolakalako |

## Emafomu

Umkhondvo losisekelo: `/membership/forms`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin nobe Forms.Edit | Bala onkhe emafomu (admin ubona konkhe; bahleli babona labanikwe kanye nemafomu langesiwo emalunga) |
| GET | `/:id` | JWT | Kufinyelela ifomu | Tfola ifomu nge-ID |
| GET | `/archived` | JWT | Forms.Admin nobe Forms.Edit | Bala emafomu la-archived |
| GET | `/standalone/:id?churchId=` | JWT | — | Tfola ifomu letimele (emafomu lavinjelwe adzinga kutivakalisa) |
| POST | `/` | JWT | Forms.Admin nobe Forms.Edit | Akha nobe buyeketa emafomu |
| DELETE | `/:id` | JWT | Kufinyelela ifomu | Sula ifomu |

## Kufakwa Kwemafomu

Umkhondvo losisekelo: `/membership/formsubmissions`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin nobe Forms.Edit | Bala lokufakiwe. Cenga nge-`?personId=` nobe `?formId=` |
| GET | `/:id` | JWT | Forms.Admin nobe Forms.Edit | Tfola lokufakiwe nge-ID. Engeta `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Kufinyelela ifomu | Tfola konkhe lokufakiwe kwefomu (kufaka ifomu, imibuto, timphendvulo) |
| POST | `/` | JWT | — | Fakela timphendvulo tefomu (iphatsa emafomu lavinjelwe/langavinjelwe, itfumela tatiso te-imeyili). Nangabe ifomu inayo i-`autoCreatePerson`, ifumana nobe yakhe umuntfu lomasihambi (Guest) nge-imeyili futsi ixhumanise lokufakiwe; nangabe i-`followUpSubject`/`followUpBody` ihleliwe, itfumela imeyili yekuchubeka lesetakhwe ngetemplate kulofakile |
| DELETE | `/:id` | JWT | Forms.Admin nobe Forms.Edit | Sula lokufakiwe kanye netimphendvulo talo |

## Imibuto

Umkhondvo losisekelo: `/membership/questions`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Kufinyelela ifomu | Bala imibuto yefomu. Idzinga `?formId=` |
| GET | `/:id` | JWT | Kufinyelela ifomu | Tfola umbuto nge-ID |
| GET | `/unrestricted?formId=` | JWT | — | Tfola imibuto yefomu lengavinjelwe |
| GET | `/sort/:id/up` | JWT | — | Shintja umbuto ukhushulwe eluhla lwekuhlela |
| GET | `/sort/:id/down` | JWT | — | Shintja umbuto wehliswe eluhla lwekuhlela |
| POST | `/` | JWT | Kufinyelela ifomu | Akha nobe buyeketa imibuto (izenzakalelisa kwabela luhla lwekuhlela) |
| DELETE | `/:id?formId=` | JWT | Kufinyelela ifomu | Sula umbuto |

## Timphendvulo

Umkhondvo losisekelo: `/membership/answers`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin nobe Forms.Edit | Bala timphendvulo. Cenga nge-`?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin nobe Forms.Edit | Akha nobe buyeketa timphendvulo |

## Timvumo Telilunga

Umkhondvo losisekelo: `/membership/memberpermissions`

Iphatsa kufinyelela kwelilunga ngalinye kumafomu lakhetsekile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Kufinyelela ifomu | Tfola imvumo yelilunga nge-ID |
| GET | `/member/:id` | JWT | Kufinyelela ifomu | Tfola tonkhe timvumo tefomu telilunga |
| GET | `/form/:id` | JWT | Kufinyelela ifomu | Tfola tonkhe timvumo telilunga tefomu |
| GET | `/form/:id/my` | JWT | Kufinyelela ifomu | Tfola imvumo yemsebentisi wanyalo yefomu |
| POST | `/` | JWT | Kufinyelela ifomu | Akha nobe buyeketa timvumo telilunga |
| DELETE | `/:id?formId=` | JWT | Kufinyelela ifomu | Sula imvumo yelilunga |
| DELETE | `/member/:id?formId=` | JWT | Kufinyelela ifomu | Sula tonkhe timvumo telilunga kufomu |

## Tilungiselelo

Umkhondvo losisekelo: `/membership/settings`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Tfola tonkhe tilungiselelo telibandla |
| GET | `/public/:churchId` | Ngeyeveleni | — | Tfola tilungiselelo teveleni telibandla |
| POST | `/` | JWT | Settings.Edit | Gcina tilungiselelo (kusekela kulayishwa kwesitfombe se-base64) |

## Emadomain

Umkhondvo losisekelo: `/membership/domains`

Yandzisa i-CRUD levamile (GET `/:id`, GET `/`, DELETE `/:id` kusuka ku-base class).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala onkhe emadomain |
| GET | `/:id` | JWT | — | Tfola domain nge-ID |
| GET | `/lookup/:domainName` | JWT | — | Fumana domain nge-ligama |
| GET | `/public/lookup/:domainName` | Ngeyeveleni | — | Kufuna domain leveleni nge-ligama |
| GET | `/health/check` | Ngeyeveleni | — | Hambisa kuhlolwa kwemphilo kumadomain langakahlolwa |
| POST | `/` | JWT | Settings.Edit | Akha nobe buyeketa emadomain (ivusa kubuyeketwa kwe-Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Sula domain |

## Libandla Lemsebentisi

Umkhondvo losisekelo: `/membership/userchurch`

Iphatsa kuhlanganiswa emkhatsini wabasebentisi nemabandla.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Tfola umbhalo we-libandla-lemsebentisi nge-user ID |
| GET | `/personid/:personId` | JWT | — | Tfola imeyili yemsebentisi lohlanganiswe nemuntfu |
| GET | `/user/:userId` | JWT | Server.Admin | Layisha onkhe emabandla emsebentisi |
| POST | `/` | JWT | — | Akha kuhlanganiswa kwe-libandla-lemsebentisi |
| PATCH | `/:userId` | JWT | — | Buyeketa sikhatsi sekugcina kufinyelela futsi ubhale kufinyelela |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Sula umbhalo we-libandla-lemsebentisi |

## Tikhetselo Tekubonakala

Umkhondvo losisekelo: `/membership/visibilityPreferences`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Tfola tikhetselo tekubonakala temsebentisi wanyalo |
| POST | `/` | JWT | — | Gcina tikhetselo tekubonakala (likheli, inombolo, imeyili) |

## Kubuta (Query)

Umkhondvo losisekelo: `/membership/query`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Kufuna emalunga ngendlela yelulwimi lwemvelo kusetjentiswa i-AI. Umtimba: `{ text, subDomain, siteUrl }` |

## Emaphutsa E-Client

Umkhondvo losisekelo: `/membership/clientErrors`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Bhala phansi liphutsa lakusiye kwe-client |

## Emakhasi Lahlobene

- [Authentication & Permissions](./authentication) — Inchubo yekungena, JWT, OAuth, sifanekiso semvumo
- [Attendance Endpoints](./attendance) — Kulandzelela service kanye nekuvakasha
- [Module Structure](../module-structure) — Sifanekiso sekuhlelwa kwekhodi
