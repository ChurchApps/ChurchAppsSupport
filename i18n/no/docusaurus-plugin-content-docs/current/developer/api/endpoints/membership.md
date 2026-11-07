---
title: "Medlemskapsendepunkter"
description: "Endepunktreferanse for ChurchApps Membership API: personer, husstander, grupper, roller, skjemaer og innstillinger, med autentisering og tillatelsesregler."
---

# Medlemskapsendepunkter

<div class="article-intro">

Medlemskapsmodulen administrerer personer, kirker, grupper, husstander, roller, tillatelser, skjemaer og innstillinger. Det er den største modulen, og den gir identitets- og autorisasjonslaget for alle andre moduler.

</div>

**Basisti:** `/membership`

## Personer

Basisti: `/membership/people`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View eller Member | List alle personer for kirken |
| GET | `/:id` | JWT | People.View eller egen post | Hent en person etter ID (inkluderer skjemainnsendinger) |
| GET | `/ids?ids=` | JWT | People.View, Member eller People.ViewNames | Hent flere personer etter kommaseparerte ID-er. Innringere med People.ViewNames uten People.View får den grunnleggende modellen, med personer som har reservert seg utelatt (unntatt innringeren) |
| GET | `/basic?ids=` | JWT | — | Hent grunnleggende info (bare navn) for flere personer |
| GET | `/names?ids=` | JWT | Enhver kirkelig tillatelse | `[{ id, name: { display, first, last }, photo }]`, sortert etter etternavn og deretter fornavn, for kommaseparerte ID-er som innringeren allerede har tilgang til, slik at roller uten People.View (gaver, oppmøte) kan merke personer. Ingen søk, ingen katalogfilter |
| POST | `/names` | JWT | Enhver kirkelig tillatelse | Samme som `GET /names`. Body: `{ peopleIds }` (eller `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member eller People.ViewNames | Nylig lagte personer. Innringere med People.ViewNames uten People.View (selv medlemmer med katalogtilgang) får den grunnleggende modellen (`id`, `name.display`, `photo`, `membershipStatus`) med personer som har reservert seg utelatt |
| GET | `/guest-register/options?churchId=` | Offentlig | — | Sjekkliste for QR-gjesteregistrering: returnerer `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, hver med `"off"`, `"optional"` eller `"required"` (tolket fra den offentlige innstillingen `guestRegistrationFields`; manglende eller ugyldige verdier faller tilbake til e-post/telefon valgfritt, resten av). Krever `enableQRGuestRegistration` med mindre forespørselen bærer et samsvarende nettsted- eller kirketoken; hastighetsbegrenset (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member eller People.ViewNames | Søk etter personer på navn eller e-post (opptil 100, sortert etter etternavn og deretter fornavn). Innringere med People.ViewNames uten People.View (selv medlemmer med katalogtilgang) får et navnesøk som returnerer den grunnleggende modellen; et `email`-søk returnerer `[]` |
| GET | `/search/phone?number=` | JWT | People.View eller Member | Søk etter telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View eller Member | Hent personer i en bestemt gruppe |
| GET | `/household/:householdId` | JWT | — | Hent alle personer i en husstand |
| GET | `/attendance` | JWT | People.Edit | Last deltakere med filtre (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Last tidslinjedata for personer og grupper |
| GET | `/directory/:id` | JWT | — | Hent person for katalogvisningen (respekterer synlighetsinnstillinger) |
| GET | `/claim/:churchId` | JWT | — | Knytt en personpost til den innloggede brukeren i en kirke |
| POST | `/` | JWT | People.Edit eller EditSelf | Opprett eller oppdater personer (bunt) |
| POST | `/search` | JWT | People.View, Member eller People.ViewNames | Søk etter personer (POST-variant). Body: `{ term }` eller `{ email }`; samme regler for kun navn som `GET /search` |
| POST | `/advancedSearch` | JWT | People.View eller Member | Søk med flere betingelser (alder, birthMonth, membershipStatus osv.). Body er en matrise med betingelser; en tom body betyr ingen betingelser, og enhver annen body som ikke er en matrise returnerer 400 |
| POST | `/loadOrCreate` | Offentlig | — | Finn eller opprett en person etter e-post. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Offentlig | — | QR-gjesteregistrering. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 medlemmer; email/phone/maritalStatus gjelder bare for det første medlemmet). Felt kirken har slått av fjernes; manglende påkrevde eller ugyldige verdier gir 400. Først gjenbrukes eksisterende personer: et medlem samsvarer når nøyaktig én ikke-fjernet person har samme fornavn (uten hensyn til store/små bokstaver) og samme e-post eller telefonsiffer (hjem, jobb eller mobil); et medlem uten e-post eller telefon samsvarer på fornavn innenfor den samsvarende husstanden. Samsvarende personer redigeres aldri. Ikke-samsvarende medlemmer blir med i den samsvarende husstanden, eller ellers en ny husstand (oppkalt etter det første medlemmets etternavn), som `membershipStatus: "Visitor"` med den delte `address`. Lagrer `comments` som et notat på det første medlemmet, legger alle til i den private gruppen `guestRegistrationGroupId` hvis den er satt, og — når `guestRegistrationRecordAttendance` er `"true"` — registrerer oppmøte for gruppens planlagte gudstjenestetider som har et åpent innsjekkingsvindu nå. Returnerer `{ householdId, people: [{ id, name }] }`, og gjentar de innsendte navnene i stedet for de lagrede. Samme samtykke-/tokenregler og hastighetsbegrensning som for alternativkallet |
| POST | `/household/:householdId` | JWT | People.Edit | Oppdater tilordninger av husstandsmedlemmer |
| POST | `/public/email` | Offentlig | — | Send en e-post til en person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | Last personers e-poster etter ID-er (server-til-server, krever jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Slett en person |

### Eksempel: Søk etter personer

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

### Eksempel: Opprett en person

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Brukere {#users}

Basisti: `/membership/users`

Se [Autentisering og tillatelser](./authentication.md) for endepunkter for innlogging, registrering og passordhåndtering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/login` | Offentlig | — | Logg inn (e-post/passord, fornying av JWT eller authGuid) |
| POST | `/register` | Offentlig | — | Registrer en ny bruker |
| POST | `/forgot` | Offentlig | — | Send e-post for tilbakestilling av passord |
| POST | `/setPasswordGuid` | Offentlig | — | Sett passord med auth-GUID fra e-postlenken |
| POST | `/verifyCredentials` | Offentlig | — | Verifiser e-post/passord og returner tilknyttede kirker |
| POST | `/loadOrCreate` | JWT | — | Finn eller opprett en bruker etter e-post/bruker-ID |
| POST | `/setDisplayName` | JWT | — | Oppdater brukerens fornavn og etternavn |
| POST | `/updateEmail` | JWT | — | Endre brukerens e-postadresse |
| POST | `/updatePassword` | JWT | — | Endre brukerens passord (minst 6 tegn) |
| POST | `/updateOptedOut` | JWT | — | Sett en persons reservasjonsstatus |
| POST | `/sendInviteEmail` | JWT | People.Edit | Send en invitasjon til en person i denne kirken (`email`, `personName`, `contextName`). Knappen står på **Registrer deg** for en person uten konto og **Logg inn** for en eksisterende bruker. En bruker som aldri har logget inn, får i stedet en lenke **Sett ditt passord** som utløper om 7 dager. En fast mal, så den teller ikke mot kirkens daglige e-postgrense |
| GET | `/search?term=` | JWT | Server.Admin | Søk etter alle brukere på navn/e-post |
| DELETE | `/` | JWT | — | Slett den innloggede brukerens konto |

## Kirker

Basisti: `/membership/churches`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Last alle kirker for den innloggede brukeren |
| GET | `/:id` | JWT | — | Hent kirke etter ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Hent domeneadministratoren for en kirke |
| GET | `/:id/impersonate` | JWT | Server.Admin | Utgi deg for en kirke (kun serveradministrator) |
| GET | `/all?term=` | JWT | Server.Admin | Søk i alle kirker (admin) |
| GET | `/search/?name=` | Offentlig | — | Søk etter kirker på navn |
| GET | `/lookup/?subDomain=&id=` | Offentlig | — | Slå opp en kirke etter underdomene eller ID |
| POST | `/` | JWT | Settings.Edit | Oppdater kirkedetaljer |
| POST | `/add` | JWT | — | Registrer en ny kirke. Obligatoriske felt: name, address1, city, state, zip, country |
| POST | `/search` | Offentlig | — | Søk etter kirker på navn (POST-variant) |
| POST | `/select` | JWT | — | Velg/bytt til en kirke. Body: `{ churchId }` eller `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkiver eller opphev arkivering av en kirke |
| POST | `/byIds` | Offentlig | — | Last flere kirker etter ID-er |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Slett kirker som har vært forlatt i 7+ dager |

## Grupper

Basisti: `/membership/groups`

Utvider standard CRUD (GET `/`, GET `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle grupper |
| GET | `/:id` | JWT | — | Hent gruppe etter ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Søk etter grupper med gudstjenestefiltre |
| GET | `/my` | JWT | — | Hent grupper for den innloggede brukeren |
| GET | `/my/:tag` | JWT | — | Hent den innloggede brukerens grupper filtrert etter merkelapp |
| GET | `/tag/:tag` | JWT | — | Hent alle grupper med en bestemt merkelapp |
| GET | `/public/:churchId/:id` | Offentlig | — | Hent en offentlig gruppe etter kirke og ID |
| GET | `/public/:churchId/tag/:tag` | Offentlig | — | Hent offentlige grupper etter merkelapp |
| GET | `/public/:churchId/label?label=` | Offentlig | — | Hent offentlige grupper etter etikett |
| GET | `/public/:churchId/slug/:slug` | Offentlig | — | Hent en offentlig gruppe etter slug |
| POST | `/` | JWT | Groups.Edit | Opprett eller oppdater grupper (genererer slug automatisk) |
| DELETE | `/:id` | JWT | Groups.Edit | Slett en gruppe (sletter også underordnede team for tjenestegrupper) |

## Gruppemedlemmer

Basisti: `/membership/groupmembers`

Utvider standard CRUD (GET `/:id`, DELETE `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Hent gruppemedlem etter ID |
| GET | `/` | JWT | GroupMembers.View* | List gruppemedlemmer. Filtrer med `?groupId=`, `?groupIds=` eller `?personId=`. *Også tillatt hvis brukeren er i gruppen eller spør etter egen personId, og for `?groupId=` i enhver ikke-konfidensiell gruppe når brukeren har Attendance.View eller Attendance.Edit (medlemmer under 13 år er inkludert for dem) |
| GET | `/my` | JWT | — | Hent gjeldende brukers gruppemedlemskap |
| GET | `/basic/:groupId` | JWT | — | Hent grunnleggende medlemsliste for en gruppe |
| GET | `/public/leaders/:churchId/:groupId` | Offentlig | — | Hent gruppeledere (offentlig) |
| GET | `/public/:churchId/:groupId` | Offentlig | — | Hent en gruppes offentlige liste (minimale felt: `personId`, `displayName`, `leader`, bilde). Bare når gruppen velger det via `publicRoster`; driver elementet `staffGrid` i nettstedsbyggeren |
| POST | `/` | JWT | GroupMembers.Edit | Legg til eller oppdater gruppemedlemmer |
| DELETE | `/:id` | JWT | GroupMembers.View | Fjern et gruppemedlem |

## Husstander

Basisti: `/membership/households`

Standard CRUD-kontroller.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle husstander |
| GET | `/:id` | JWT | — | Hent husstand etter ID |
| POST | `/` | JWT | People.Edit | Opprett eller oppdater husstander |
| DELETE | `/:id` | JWT | People.Edit | Slett en husstand |

## Roller

Basisti: `/membership/roles`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Hent rolle etter ID |
| GET | `/church/:churchId` | JWT | Roles.View | Hent alle roller for en kirke. Hver rolle inkluderer `memberCount`, antall distinkte brukere i den |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater roller |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolle (fjerner også dens tillatelser og medlemmer) |

## Rollemedlemmer

Basisti: `/membership/rolemembers`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent medlemmer av en rolle. Legg til `?include=users` for å inkludere brukerdetaljer |
| POST | `/` | JWT | Roles.Edit | Legg til medlemmer i en rolle (oppretter bruker hvis e-posten ikke finnes) |
| DELETE | `/:id` | JWT | Roles.View | Fjern et rollemedlem |
| DELETE | `/self/:churchId/:userId` | JWT | — | Fjern deg selv fra en kirke |

## Rolletillatelser

Basisti: `/membership/rolepermissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent tillatelser for en rolle (bruk `null` som ID for rollen "Everyone") |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater rolletillatelser |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolletillatelse |

## Tillatelser

Basisti: `/membership/permissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent hele listen over tilgjengelige tillatelser |

Hver oppføring har `apiName`, `section` (innholdstype), `action`, og etikettene `displaySection` / `displayAction` som B1Admins rolleredigeringsprogram viser. Nye tillegg: `MembershipApi` / `People` / `View Names` (**Se kun navn på personer**, under Personer og grupper) og `GivingApi` / `Donations` / `Enter` (**Registrer gaver**, under Gaver; se [Gavebunter](./giving.md#donation-batches)).

## Skjemaer

Basisti: `/membership/forms`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List alle skjemaer (admin ser alle; redaktører ser tildelte + ikke-medlemsskjemaer) |
| GET | `/:id` | JWT | Skjematilgang | Hent et skjema etter ID |
| GET | `/archived` | JWT | Forms.Admin eller Forms.Edit | List arkiverte skjemaer |
| GET | `/group/:groupId` | JWT | Gruppemedlem, gruppeleder eller Forms.Admin | Frittstående skjemaer knyttet til gruppen (`forms.groupId`), unntatt arkiverte, sortert etter navn. Returnerer `id`, `name`, `description` og `open` (innenfor tilgjengelighetsvinduet). Medlemmer får bare åpne skjemaer; ledere og skjemaadministratorer får også stengte. Driver gruppesidens koblede skjemaer |
| GET | `/standalone/:id?churchId=` | JWT | — | Hent et frittstående skjema (begrensede skjemaer krever autentisering) |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater skjemaer. Frittstående skjemaer godtar valgfri `photoUrl` (overskriftsbilde vist over skjemaet) og `groupId` (koblet gruppe) |
| DELETE | `/:id` | JWT | Skjematilgang | Slett et skjema |

## Skjemainnsendinger

Basisti: `/membership/formsubmissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List innsendinger. Filtrer med `?personId=` eller `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Selvavgrenset: opptil 50 frittstående skjemainnsendinger (ikke personskjemaer) som den innloggede medlemmen sendte inn, eller som er knyttet til deres person (`contentType` `person`, `contentId` = deres personid — for eksempel etter en administrators endring av person), nyeste først, hver med `form.name`. `include` legger til hvert skjemas spørsmål og innsendingens svar. Returnerer `401` hvis brukeren ikke er knyttet til en person. Driver seksjonen **Mine skjemaer** på B1 Meg-siden |
| GET | `/group/:groupId` | JWT | Leder av gruppen | Svar for gruppens ledere: én oppføring per koblet skjema og per gruppearrangement med et påmeldingsskjema, hver med `form`, `event` (`id`, `title`, `start`; bare arrangementsoppføringer), `questions` og `submissions` (med `answers` og `personName`, `null` når anonym) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit eller visningstilgang | Hent innsending etter ID. Legg til `?include=form,questions,answers`. Ledere av skjemaets koblede gruppe, og ledere av gruppen en arrangementspåmelding tilhører, kan også lese den |
| GET | `/formId/:formId` | JWT | Skjematilgang (visning) | Hent alle innsendinger for et skjema (inkluderer skjema, spørsmål, svar). Ledere av skjemaets koblede gruppe har visningstilgang |
| POST | `/` | JWT | — | Send inn skjemasvar (håndterer begrensede/ubegrensede skjemaer, sender e-postvarsler). Når skjemaet har `autoCreatePerson`, finner eller oppretter den en gjestperson etter e-post og knytter innsendingen; når skjemaet også har en `groupId`, legges personen til i gruppen; når `followUpSubject`/`followUpBody` er satt, sendes en mal-basert oppfølgings-e-post til innsenderen. Med mindre den som kaller kan administrere skjemaet, settes `submittedBy` alltid til den innloggede medlemmets person (eller tomt for anonyme innsendinger) |
| DELETE | `/:id` | JWT | Forms.Admin eller Forms.Edit | Slett en innsending og dens svar |

## Spørsmål

Basisti: `/membership/questions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Skjematilgang | List spørsmål for et skjema. Krever `?formId=` |
| GET | `/:id` | JWT | Skjematilgang | Hent et spørsmål etter ID |
| GET | `/unrestricted?formId=` | JWT | — | Hent spørsmål for et ubegrenset skjema |
| GET | `/sort/:id/up` | JWT | — | Flytt et spørsmål opp i sorteringsrekkefølgen |
| GET | `/sort/:id/down` | JWT | — | Flytt et spørsmål ned i sorteringsrekkefølgen |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater spørsmål (tildeler sorteringsrekkefølge automatisk) |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett et spørsmål |

## Svar

Basisti: `/membership/answers`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List svar. Filtrer med `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater svar |

## Medlemstillatelser

Basisti: `/membership/memberpermissions`

Styrer tilgang per medlem til bestemte skjemaer.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Skjematilgang | Hent en medlemstillatelse etter ID |
| GET | `/member/:id` | JWT | Skjematilgang | Hent alle skjematillatelser for et medlem |
| GET | `/form/:id` | JWT | Skjematilgang | Hent alle medlemstillatelser for et skjema |
| GET | `/form/:id/my` | JWT | Skjematilgang | Hent gjeldende brukers tillatelse for et skjema |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater medlemstillatelser |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett en medlemstillatelse |
| DELETE | `/member/:id?formId=` | JWT | Skjematilgang | Slett alle tillatelser for et medlem på et skjema |

## Innstillinger

Basisti: `/membership/settings`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for kirken |
| GET | `/public/:churchId` | Offentlig | — | Hent offentlige innstillinger for en kirke |
| POST | `/` | JWT | Settings.Edit | Lagre innstillinger (støtter base64-bildeopplasting) |

## Domener

Basisti: `/membership/domains`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle domener |
| GET | `/:id` | JWT | — | Hent domene etter ID |
| GET | `/lookup/:domainName` | JWT | — | Slå opp et domene etter navn |
| GET | `/public/lookup/:domainName` | Offentlig | — | Offentlig domeneoppslag etter navn |
| GET | `/health/check` | Offentlig | — | Kjør helsesjekk på ukontrollerte domener |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater domener (utløser oppdatering av Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Slett et domene |

## Brukerkirke

Basisti: `/membership/userchurch`

Administrerer koblingen mellom brukere og kirker.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Hent bruker-kirke-post etter bruker-ID |
| GET | `/personid/:personId` | JWT | — | Hent e-post for en persons koblede bruker |
| GET | `/user/:userId` | JWT | Server.Admin | Last alle kirker for en bruker |
| POST | `/` | JWT | — | Opprett en kobling mellom bruker og kirke |
| PATCH | `/:userId` | JWT | — | Oppdater tidspunkt for sist tilgang og logg tilgangen |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Slett en bruker-kirke-post |

## Synlighetsinnstillinger

Basisti: `/membership/visibilityPreferences`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent gjeldende brukers synlighetsinnstillinger |
| POST | `/` | JWT | — | Lagre synlighetsinnstillinger (synlighet for adresse, telefon og e-post) |

## Spørring

Basisti: `/membership/query`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Naturlig språk-søk etter medlemmer med AI. Body: `{ text, subDomain, siteUrl }` |

## Klientfeil

Basisti: `/membership/clientErrors`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Logg en feil på klientsiden |

## Relaterte sider

- [Autentisering og tillatelser](./authentication.md) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Oppmøteendepunkter](./attendance.md) — Sporing av gudstjenester og besøk
- [Modulstruktur](../module-structure.md) — Mønstre for kodeorganisering
