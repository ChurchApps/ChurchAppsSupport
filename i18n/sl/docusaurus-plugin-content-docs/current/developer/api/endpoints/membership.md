---
title: "Končne točke za članstvo"
---

# Končne točke za članstvo

<div class="article-intro">

Modul Membership upravlja osebe, cerkve, skupine, gospodinjstva, vloge, dovoljenja, obrazce in nastavitve. Je največji modul in zagotavlja osnovno plast za identiteto in avtorizacijo za vse druge module.

</div>

**Osnovna pot:** `/membership`

## Osebe

Osnovna pot: `/membership/people`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | People.View ali Member | Seznam vseh oseb v cerkvi |
| GET | `/:id` | JWT | People.View ali lasten zapis | Pridobi osebo po ID-ju (vključno z oddanimi obrazci) |
| GET | `/ids?ids=` | JWT | People.View, Member ali People.ViewNames | Pridobi več oseb po ID-jih, ločenih z vejicami. Klicatelji s People.ViewNames brez People.View prejmejo osnovni model, osebe, ki so se odjavile iz imenika, pa so izpuščene (razen klicatelja) |
| GET | `/basic?ids=` | JWT | — | Pridobi osnovne podatke (samo ime) za več oseb |
| GET | `/names?ids=` | JWT | Katero koli dovoljenje za cerkev | `[{ id, name: { display, first, last }, photo }]`, razvrščeno po priimku, nato po imenu, za ID-je, ločene z vejicami, ki jih klicatelj že ima. Tako lahko vloge brez People.View (darila, udeležba) označijo osebe. Brez iskanja in brez filtra imenika |
| POST | `/names` | JWT | Katero koli dovoljenje za cerkev | Enako kot `GET /names`. Telo: `{ peopleIds }` (ali `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member ali People.ViewNames | Nedavno dodane osebe. Klicatelji s People.ViewNames brez People.View (tudi člani z dostopom do imenika) prejmejo osnovni model (`id`, `name.display`, `photo`, `membershipStatus`), osebe, ki so se odjavile, pa so izpuščene |
| GET | `/guest-register/options?churchId=` | Javno | — | Kontrolni seznam za prijavo gostov prek QR-kode: vrne `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, vsako vrednost `"off"`, `"optional"` ali `"required"` (razčlenjeno iz javne nastavitve `guestRegistrationFields`; manjkajoče ali neveljavne vrednosti se privzeto nastavijo na e-pošto in telefon kot neobvezna, ostalo pa izklopljeno). Zahteva `enableQRGuestRegistration`, razen če zahteva vsebuje ustrezen žeton za spletno mesto ali cerkev; omejena hitrost (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member ali People.ViewNames | Iskanje oseb po imenu ali e-pošti (do 100, razvrščeno po priimku, nato po imenu). Klicatelji s People.ViewNames brez People.View (tudi člani z dostopom do imenika) prejmejo iskanje po imenu, ki vrne osnovni model; iskanje po `email` vrne `[]` |
| GET | `/search/phone?number=` | JWT | People.View ali Member | Iskanje po telefonski številki |
| GET | `/search/group?groupId=` | JWT | People.View ali Member | Pridobi osebe v določeni skupini |
| GET | `/household/:householdId` | JWT | — | Pridobi vse osebe v gospodinjstvu |
| GET | `/attendance` | JWT | People.Edit | Naloži udeležence s filtri (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Naloži podatke časovnice za osebe in skupine |
| GET | `/directory/:id` | JWT | — | Pridobi osebo za prikaz v imeniku (upošteva nastavitve vidnosti) |
| GET | `/claim/:churchId` | JWT | — | Zahtevaj zapis osebe za trenutnega uporabnika v cerkvi |
| POST | `/` | JWT | People.Edit ali EditSelf | Ustvari ali posodobi osebe (serijsko) |
| POST | `/search` | JWT | People.View, Member ali People.ViewNames | Iskanje oseb (različica POST). Telo: `{ term }` ali `{ email }`; enaka pravila glede imen kot pri `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ali Member | Iskanje z več pogoji (starost, birthMonth, membershipStatus itd.). Telo je seznam pogojev; prazno telo pomeni brez pogojev, vsako drugo telo, ki ni seznam, vrne 400 |
| POST | `/loadOrCreate` | Javno | — | Poišči ali ustvari osebo po e-pošti. Telo: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Javno | — | Prijava gosta prek QR-kode. Telo: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 članov; email/phone/maritalStatus veljajo samo za prvega člana). Polja, ki jih je cerkev izklopila, se izpustijo; manjkajoče obvezne ali neveljavne vrednosti vrnejo 400. Najprej se ponovno uporabijo obstoječe osebe: član se ujema, če je natanko ena neodstranjena oseba z enakim imenom (neobčutljivo na velike in male črke) in enakim e-poštnim naslovom ali številkami telefona (doma, v službi ali mobilni); član brez e-pošte ali telefona se ujema po imenu znotraj ujetega gospodinjstva. Ujete osebe se nikoli ne urejajo. Neujeti člani se pridružijo ujetemu gospodinjstvu ali pa se ustvari novo gospodinjstvo (poimenovano po priimku prvega člana) kot `membershipStatus: "Visitor"` z deljenim `address`. Vrednost `comments` se shrani kot opomba pri prvem članu, vse osebe se dodajo v zasebno skupino `guestRegistrationGroupId`, če je nastavljena, in – če je `guestRegistrationRecordAttendance` enak `"true"` – se zabeleži udeležba za načrtovane termine te skupine, katerih okno za prijavo je trenutno odprto. Vrne `{ householdId, people: [{ id, name }] }`, pri čemer ponovi poslana imena, ne shranjenih. Enaka pravila za privolitev/žeton in omejitev hitrosti kot pri klicu options |
| POST | `/household/:householdId` | JWT | People.Edit | Posodobi dodelitve članov gospodinjstva |
| POST | `/public/email` | Javno | — | Pošlji e-pošto osebi. Telo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Notranje | — | Naloži e-poštne naslove oseb po ID-jih (strežnik-strežnik, zahteva jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Izbriši osebo |

### Primer: iskanje oseb

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

### Primer: ustvarjanje osebe

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Uporabniki

Osnovna pot: `/membership/users`

Za končne točke za prijavo, registracijo in upravljanje gesel glejte [Avtentikacija in dovoljenja](./authentication).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| POST | `/login` | Javno | — | Prijava (e-pošta/geslo, osvežitev JWT ali authGuid) |
| POST | `/register` | Javno | — | Registracija novega uporabnika |
| POST | `/forgot` | Javno | — | Pošlji e-pošto za ponastavitev gesla |
| POST | `/setPasswordGuid` | Javno | — | Nastavi geslo z uporabo auth GUID-ja iz povezave v e-pošti |
| POST | `/verifyCredentials` | Javno | — | Preveri e-pošto/geslo in vrni povezane cerkve |
| POST | `/loadOrCreate` | JWT | — | Poišči ali ustvari uporabnika po e-pošti/userId |
| POST | `/setDisplayName` | JWT | — | Posodobi uporabnikovo ime in priimek |
| POST | `/updateEmail` | JWT | — | Spremeni uporabnikov e-poštni naslov |
| POST | `/updatePassword` | JWT | — | Spremeni uporabnikovo geslo (najmanj 6 znakov) |
| POST | `/updateOptedOut` | JWT | — | Nastavi stanje odjave osebe iz imenika |
| POST | `/sendInviteEmail` | JWT | People.Edit | Pošlji e-poštno vabilo osebi v tej cerkvi (`email`, `personName`, `contextName`). Gumb za osebo brez računa piše **Registriraj se**, za obstoječega uporabnika pa **Prijavi se**. Uporabnik, ki se še ni nikoli prijavil, namesto tega dobi povezavo **Nastavi geslo**, ki poteče v 7 dneh. Gre za fiksno predlogo, zato se ne šteje v dnevno omejitev e-pošte cerkve |
| GET | `/search?term=` | JWT | Server.Admin | Iskanje vseh uporabnikov po imenu/e-pošti |
| DELETE | `/` | JWT | — | Izbriši trenutni uporabniški račun |

## Cerkve

Osnovna pot: `/membership/churches`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Naloži vse cerkve za trenutnega uporabnika |
| GET | `/:id` | JWT | — | Pridobi cerkev po ID-ju |
| GET | `/:id/getDomainAdmin` | JWT | — | Pridobi skrbniškega uporabnika domene za cerkev |
| GET | `/:id/impersonate` | JWT | Server.Admin | Predstavljanje cerkve (samo strežniški skrbnik) |
| GET | `/all?term=` | JWT | Server.Admin | Iskanje vseh cerkva (skrbnik) |
| GET | `/search/?name=` | Javno | — | Iskanje cerkva po imenu |
| GET | `/lookup/?subDomain=&id=` | Javno | — | Poišči cerkev po poddomeni ali ID-ju |
| POST | `/` | JWT | Settings.Edit | Posodobi podatke o cerkvi |
| POST | `/add` | JWT | — | Registriraj novo cerkev. Obvezna polja: name, address1, city, state, zip, country |
| POST | `/search` | Javno | — | Iskanje cerkva po imenu (različica POST) |
| POST | `/select` | JWT | — | Izberi/preklopi na cerkev. Telo: `{ churchId }` ali `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arhiviraj ali odarhiviraj cerkev |
| POST | `/byIds` | Javno | — | Naloži več cerkva po ID-jih |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Izbriši cerkve, ki so bile opuščene 7 ali več dni |

## Skupine

Osnovna pot: `/membership/groups`

Razširja standardni CRUD (GET `/`, GET `/:id` iz osnovnega razreda).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam vseh skupin |
| GET | `/:id` | JWT | — | Pridobi skupino po ID-ju |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Iskanje skupin po filtrih storitev |
| GET | `/my` | JWT | — | Pridobi skupine za trenutnega uporabnika |
| GET | `/my/:tag` | JWT | — | Pridobi skupine trenutnega uporabnika, filtrirane po oznaki |
| GET | `/tag/:tag` | JWT | — | Pridobi vse skupine z določeno oznako |
| GET | `/public/:churchId/:id` | Javno | — | Pridobi javno skupino po cerkvi in ID-ju |
| GET | `/public/:churchId/tag/:tag` | Javno | — | Pridobi javne skupine po oznaki |
| GET | `/public/:churchId/label?label=` | Javno | — | Pridobi javne skupine po nalepki |
| GET | `/public/:churchId/slug/:slug` | Javno | — | Pridobi javno skupino po slugu |
| POST | `/` | JWT | Groups.Edit | Ustvari ali posodobi skupine (samodejno ustvari slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Izbriši skupino (pri službenih skupinah izbriše tudi podrejene ekipe) |

## Člani skupin

Osnovna pot: `/membership/groupmembers`

Razširja standardni CRUD (GET `/:id`, DELETE `/:id` iz osnovnega razreda).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | GroupMembers.View | Pridobi člana skupine po ID-ju |
| GET | `/` | JWT | GroupMembers.View* | Seznam članov skupin. Filtriraj s `?groupId=`, `?groupIds=` ali `?personId=`. *Dovoljeno tudi, če je uporabnik v skupini ali poizveduje za lastni personId, ter za `?groupId=` katere koli nezaupne skupine, kadar ima uporabnik Attendance.View ali Attendance.Edit (zanje so vključeni člani, mlajši od 13 let) |
| GET | `/my` | JWT | — | Pridobi članstva v skupinah trenutnega uporabnika |
| GET | `/basic/:groupId` | JWT | — | Pridobi osnovni seznam članov skupine |
| GET | `/public/leaders/:churchId/:groupId` | Javno | — | Pridobi vodje skupine (javno) |
| GET | `/public/:churchId/:groupId` | Javno | — | Pridobi javni seznam članov skupine (minimalna polja: `personId`, `displayName`, `leader`, fotografija). Samo če se skupina vključi prek `publicRoster`; omogoča element `staffGrid` v graditelju spletnega mesta |
| POST | `/` | JWT | GroupMembers.Edit | Dodaj ali posodobi člane skupine |
| DELETE | `/:id` | JWT | GroupMembers.View | Odstrani člana skupine |

## Gospodinjstva

Osnovna pot: `/membership/households`

Standardni CRUD krmilnik.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam vseh gospodinjstev |
| GET | `/:id` | JWT | — | Pridobi gospodinjstvo po ID-ju |
| POST | `/` | JWT | People.Edit | Ustvari ali posodobi gospodinjstva |
| DELETE | `/:id` | JWT | People.Edit | Izbriši gospodinjstvo |

## Vloge

Osnovna pot: `/membership/roles`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Roles.View | Pridobi vlogo po ID-ju |
| GET | `/church/:churchId` | JWT | Roles.View | Pridobi vse vloge za cerkev. Vsaka vloga vključuje `memberCount`, število različnih uporabnikov v njej |
| POST | `/` | JWT | Roles.Edit | Ustvari ali posodobi vloge |
| DELETE | `/:id` | JWT | Roles.Edit | Izbriši vlogo (odstrani tudi njena dovoljenja in člane) |

## Člani vlog

Osnovna pot: `/membership/rolemembers`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | Pridobi člane vloge. Dodaj `?include=users`, da vključiš podatke o uporabnikih |
| POST | `/` | JWT | Roles.Edit | Dodaj člane v vlogo (ustvari uporabnika, če e-poštni naslov ne obstaja) |
| DELETE | `/:id` | JWT | Roles.View | Odstrani člana vloge |
| DELETE | `/self/:churchId/:userId` | JWT | — | Odstrani sebe iz cerkve |

## Dovoljenja vlog

Osnovna pot: `/membership/rolepermissions`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | Pridobi dovoljenja za vlogo (kot ID uporabi `null` za vlogo "Everyone") |
| POST | `/` | JWT | Roles.Edit | Ustvari ali posodobi dovoljenja vloge |
| DELETE | `/:id` | JWT | Roles.Edit | Izbriši dovoljenje vloge |

## Dovoljenja

Osnovna pot: `/membership/permissions`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Pridobi celoten seznam razpoložljivih dovoljenj |

Vsak vnos vsebuje `apiName`, `section` (vrsta vsebine), `action` ter oznake `displaySection` in `displayAction`, ki jih prikazuje urejevalnik vlog v B1Admin. Nedavni dodatki: `MembershipApi` / `People` / `View Names` (**Samo ogled imen oseb**, pod Osebe in skupine) ter `GivingApi` / `Donations` / `Enter` (**Vnos daril**, pod Darila; glejte [Serije darov](./giving.md#donation-batches)).

## Obrazci

Osnovna pot: `/membership/forms`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin ali Forms.Edit | Seznam vseh obrazcev (skrbnik vidi vse; urejevalci vidijo dodeljene in obrazce, ki niso za člane) |
| GET | `/:id` | JWT | Dostop do obrazca | Pridobi obrazec po ID-ju |
| GET | `/archived` | JWT | Forms.Admin ali Forms.Edit | Seznam arhiviranih obrazcev |
| GET | `/group/:groupId` | JWT | Član skupine, vodja skupine ali Forms.Admin | Samostojni obrazci, povezani s skupino (`forms.groupId`), brez arhiviranih, razvrščeni po imenu. Vrne `id`, `name`, `description` in `open` (znotraj obdobja razpoložljivosti). Člani dobijo samo odprte obrazce; vodje in skrbniki obrazcev dobijo tudi zaprte. Podpira povezane obrazce na strani skupine |
| GET | `/standalone/:id?churchId=` | JWT | — | Pridobi samostojni obrazec (omejeni obrazci zahtevajo avtentikacijo) |
| POST | `/` | JWT | Forms.Admin ali Forms.Edit | Ustvari ali posodobi obrazce. Samostojni obrazci sprejmejo izbirni `photoUrl` (glava s fotografijo nad obrazcem) in `groupId` (povezana skupina) |
| DELETE | `/:id` | JWT | Dostop do obrazca | Izbriši obrazec |

## Oddaje obrazcev

Osnovna pot: `/membership/formsubmissions`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin ali Forms.Edit | Seznam oddaj. Filtriraj s `?personId=` ali `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Samo za lastne podatke: do 50 oddaj samostojnih obrazcev (ne obrazcev oseb), ki jih je prijavljeni član oddal ali so povezane z njegovo osebo (`contentType` `person`, `contentId` = ID njegove osebe – na primer po spremembi, ki jo je naredil skrbnik), najnovejše najprej, vsaka z `form.name`. `include` doda vprašanja obrazca in odgovore na oddajo. Vrne `401`, če uporabnik ni povezan z osebo. Podpira razdelek **Moji obrazci** na strani B1 Me |
| GET | `/group/:groupId` | JWT | Vodja skupine | Odgovori za vodje skupine: en vnos za vsak povezan obrazec in za vsak dogodek skupine z obrazcem za prijavo, vsak z `form`, `event` (`id`, `title`, `start`; samo pri vnosih dogodkov), `questions` in `submissions` (z `answers` in `personName`, `null` če je anonimno) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit ali dostop za ogled | Pridobi oddajo po ID-ju. Dodaj `?include=form,questions,answers`. Lahko jo preberejo tudi vodje skupine, povezane z obrazcem, in vodje skupine, ki ji pripada prijava na dogodek |
| GET | `/formId/:formId` | JWT | Dostop do obrazca (ogled) | Pridobi vse oddaje za obrazec (vključuje form, questions, answers). Vodje skupine, povezane z obrazcem, imajo dostop za ogled |
| POST | `/` | JWT | — | Oddaj odgovore na obrazec (obravnava omejene/neomejene obrazce, pošilja obvestila po e-pošti). Če ima obrazec `autoCreatePerson`, poišče ali ustvari osebo Guest po e-pošti in poveže oddajo; če ima obrazec tudi `groupId`, doda osebo v skupino; če sta nastavljena `followUpSubject`/`followUpBody`, pošlje predlogo nadaljnje e-pošte oddajalcu. Razen če lahko klicatelj upravlja obrazec, je `submittedBy` vedno nastavljen na osebo prijavljenega člana (ali prazen pri anonimnih oddajah) |
| DELETE | `/:id` | JWT | Forms.Admin ali Forms.Edit | Izbriši oddajo in njene odgovore |

## Vprašanja

Osnovna pot: `/membership/questions`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | Dostop do obrazca | Seznam vprašanj za obrazec. Zahteva `?formId=` |
| GET | `/:id` | JWT | Dostop do obrazca | Pridobi vprašanje po ID-ju |
| GET | `/unrestricted?formId=` | JWT | — | Pridobi vprašanja za neomejen obrazec |
| GET | `/sort/:id/up` | JWT | — | Premakni vprašanje navzgor v vrstnem redu |
| GET | `/sort/:id/down` | JWT | — | Premakni vprašanje navzdol v vrstnem redu |
| POST | `/` | JWT | Dostop do obrazca | Ustvari ali posodobi vprašanja (samodejno dodeli vrstni red) |
| DELETE | `/:id?formId=` | JWT | Dostop do obrazca | Izbriši vprašanje |

## Odgovori

Osnovna pot: `/membership/answers`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin ali Forms.Edit | Seznam odgovorov. Filtriraj s `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ali Forms.Edit | Ustvari ali posodobi odgovore |

## Dovoljenja članov

Osnovna pot: `/membership/memberpermissions`

Nadzira dostop posameznih članov do določenih obrazcev.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Dostop do obrazca | Pridobi dovoljenje člana po ID-ju |
| GET | `/member/:id` | JWT | Dostop do obrazca | Pridobi vsa dovoljenja za obrazce za člana |
| GET | `/form/:id` | JWT | Dostop do obrazca | Pridobi vsa dovoljenja članov za obrazec |
| GET | `/form/:id/my` | JWT | Dostop do obrazca | Pridobi dovoljenje trenutnega uporabnika za obrazec |
| POST | `/` | JWT | Dostop do obrazca | Ustvari ali posodobi dovoljenja člana |
| DELETE | `/:id?formId=` | JWT | Dostop do obrazca | Izbriši dovoljenje člana |
| DELETE | `/member/:id?formId=` | JWT | Dostop do obrazca | Izbriši vsa dovoljenja člana za obrazec |

## Nastavitve

Osnovna pot: `/membership/settings`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | Settings.Edit | Pridobi vse nastavitve za cerkev |
| GET | `/public/:churchId` | Javno | — | Pridobi javne nastavitve za cerkev |
| POST | `/` | JWT | Settings.Edit | Shrani nastavitve (podpira nalaganje slik v base64) |

## Domene

Osnovna pot: `/membership/domains`

Razširja standardni CRUD (GET `/:id`, GET `/`, DELETE `/:id` iz osnovnega razreda).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam vseh domen |
| GET | `/:id` | JWT | — | Pridobi domeno po ID-ju |
| GET | `/lookup/:domainName` | JWT | — | Poišči domeno po imenu |
| GET | `/public/lookup/:domainName` | Javno | — | Javno iskanje domene po imenu |
| GET | `/health/check` | Javno | — | Zaženi preverjanje stanja nepreverjenih domen |
| POST | `/` | JWT | Settings.Edit | Ustvari ali posodobi domene (sproži posodobitev Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Izbriši domeno |

## Uporabnik–cerkev

Osnovna pot: `/membership/userchurch`

Upravlja povezavo med uporabniki in cerkvami.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/userid/:userId` | JWT | — | Pridobi zapis uporabnik–cerkev po ID-ju uporabnika |
| GET | `/personid/:personId` | JWT | — | Pridobi e-pošto povezanega uporabnika osebe |
| GET | `/user/:userId` | JWT | Server.Admin | Naloži vse cerkve za uporabnika |
| POST | `/` | JWT | — | Ustvari povezavo uporabnik–cerkev |
| PATCH | `/:userId` | JWT | — | Posodobi čas zadnjega dostopa in zabeleži dostop |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Izbriši zapis uporabnik–cerkev |

## Nastavitve vidnosti

Osnovna pot: `/membership/visibilityPreferences`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Pridobi nastavitve vidnosti trenutnega uporabnika |
| POST | `/` | JWT | — | Shrani nastavitve vidnosti (vidnost naslova, telefona, e-pošte) |

## Poizvedba

Osnovna pot: `/membership/query`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| POST | `/members` | JWT | — | Iskanje članov v naravnem jeziku z uporabo UI. Telo: `{ text, subDomain, siteUrl }` |

## Napake na strani odjemalca

Osnovna pot: `/membership/clientErrors`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| POST | `/` | JWT | — | Zabeleži napako na strani odjemalca |

## Sorodne strani

- [Avtentikacija in dovoljenja](./authentication) — Potek prijave, JWT, OAuth, model dovoljenj
- [Končne točke za udeležbo](./attendance) — Sledenje storitvam in obiskom
- [Struktura modula](../module-structure) — Vzorci organizacije kode
