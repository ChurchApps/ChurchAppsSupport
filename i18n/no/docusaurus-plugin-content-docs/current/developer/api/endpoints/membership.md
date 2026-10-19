---
title: "Membership-endepunkter"
---

# Membership-endepunkter

<div class="article-intro">

Membership-modulen håndterer personer, kirker, grupper, husstander, roller, tillatelser, skjemaer og innstillinger. Det er den største modulen, og den gir det sentrale identitets- og autorisasjonslaget for alle andre moduler.

</div>

**Basissti:** `/membership`

## Personer

Basissti: `/membership/people`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | People.View eller Member | Lister alle personer for kirken |
| GET | `/:id` | JWT | People.View eller egen post | Henter en person etter ID (inkluderer skjemainnsendinger) |
| GET | `/ids?ids=` | JWT | People.View eller Member | Henter flere personer etter kommaseparerte ID-er |
| GET | `/basic?ids=` | JWT | — | Henter grunnleggende informasjon (kun navn) for flere personer |
| GET | `/names?ids=` | JWT | Enhver kirketillatelse | `[{ id, name: { display, first, last }, photo }]`, sortert etter etternavn og deretter fornavn, for kommaseparerte ID-er som den som kaller allerede har tilgang til, slik at roller uten People.View (gaver, oppmøte) kan vise navn på personer. Ingen søk, ingen katalogfilter |
| POST | `/names` | JWT | Enhver kirketillatelse | Samme som `GET /names`. Body: `{ peopleIds }` (eller `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member eller People.ViewNames | Nylig registrerte personer. Kallere med kun People.ViewNames får grunnmodellen (`id`, `name.display`, `photo`, `membershipStatus`), med personer som har reservert seg utelatt |
| GET | `/search?term=&email=` | JWT | People.View, Member eller People.ViewNames | Søker etter personer på navn eller e-post (opptil 100, sortert etter etternavn og deretter fornavn). Kallere med kun People.ViewNames får et navnesøk som returnerer grunnmodellen; et `email`-søk returnerer `[]` |
| GET | `/search/phone?number=` | JWT | People.View eller Member | Søker etter telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View eller Member | Henter personer i en bestemt gruppe |
| GET | `/household/:householdId` | JWT | — | Henter alle personer i en husstand |
| GET | `/attendance` | JWT | People.Edit | Laster deltakere med filtre (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Laster tidslinjedata for personer og grupper |
| GET | `/directory/:id` | JWT | — | Henter person for katalogvisning (respekterer synlighetsinnstillinger) |
| GET | `/claim/:churchId` | JWT | — | Knytter en personpost til gjeldende bruker i en kirke |
| POST | `/` | JWT | People.Edit eller EditSelf | Oppretter eller oppdaterer personer (batch) |
| POST | `/search` | JWT | People.View, Member eller People.ViewNames | Søk etter personer (POST-variant). Body: `{ term }` eller `{ email }`; samme regler for kun navn som `GET /search` |
| POST | `/advancedSearch` | JWT | People.View eller Member | Søk med flere betingelser (alder, birthMonth, membershipStatus osv.) |
| POST | `/loadOrCreate` | Offentlig | — | Finner eller oppretter en person etter e-post. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Oppdaterer medlemstilordninger i husstanden |
| POST | `/public/email` | Offentlig | — | Sender en e-post til en person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | Laster personers e-postadresser etter ID (server-til-server, krever jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Sletter en person |

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

Basissti: `/membership/users`

Se [Autentisering og tillatelser](./authentication) for endepunkter for innlogging, registrering og passordhåndtering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/login` | Offentlig | — | Logger inn (e-post/passord, JWT-fornyelse eller authGuid) |
| POST | `/register` | Offentlig | — | Registrerer en ny bruker |
| POST | `/forgot` | Offentlig | — | Sender e-post for tilbakestilling av passord |
| POST | `/setPasswordGuid` | Offentlig | — | Setter passord ved hjelp av auth-GUID fra e-postlenken |
| POST | `/verifyCredentials` | Offentlig | — | Verifiserer e-post/passord og returnerer tilknyttede kirker |
| POST | `/loadOrCreate` | JWT | — | Finner eller oppretter en bruker etter e-post/userId |
| POST | `/setDisplayName` | JWT | — | Oppdaterer brukerens for- og etternavn |
| POST | `/updateEmail` | JWT | — | Endrer brukerens e-postadresse |
| POST | `/updatePassword` | JWT | — | Endrer brukerens passord (minst 6 tegn) |
| POST | `/updateOptedOut` | JWT | — | Setter en persons reservasjonsstatus |
| POST | `/sendInviteEmail` | JWT | People.Edit | Sender en invitasjons-e-post til en person i denne kirken (`email`, `personName`, `contextName`). Knappen heter **Registrer deg** for en person uten konto og **Logg inn** for en eksisterende bruker. En bruker som aldri har logget inn får i stedet en lenke **Angi passordet ditt** som utløper etter 7 dager. Teller mot kirkens daglige e-postgrense (`429` når den er nådd) |
| GET | `/search?term=` | JWT | Server.Admin | Søker etter alle brukere på navn/e-post |
| DELETE | `/` | JWT | — | Sletter gjeldende brukerkonto |

## Kirker

Basissti: `/membership/churches`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Laster alle kirker for gjeldende bruker |
| GET | `/:id` | JWT | — | Henter kirke etter ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Henter domeneadministratoren for en kirke |
| GET | `/:id/impersonate` | JWT | Server.Admin | Later som en kirke (kun serveradministrator) |
| GET | `/all?term=` | JWT | Server.Admin | Søker i alle kirker (admin) |
| GET | `/search/?name=` | Offentlig | — | Søker etter kirker på navn |
| GET | `/lookup/?subDomain=&id=` | Offentlig | — | Slår opp en kirke etter underdomene eller ID |
| POST | `/` | JWT | Settings.Edit | Oppdaterer kirkedetaljer |
| POST | `/add` | JWT | — | Registrerer en ny kirke. Påkrevde felt: name, address1, city, state, zip, country |
| POST | `/search` | Offentlig | — | Søker etter kirker på navn (POST-variant) |
| POST | `/select` | JWT | — | Velger/bytter til en kirke. Body: `{ churchId }` eller `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkiverer eller gjenoppretter en kirke |
| POST | `/byIds` | Offentlig | — | Laster flere kirker etter ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Sletter kirker som har vært forlatt i 7+ dager |

## Grupper

Basissti: `/membership/groups`

Utvider standard CRUD (GET `/`, GET `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Lister alle grupper |
| GET | `/:id` | JWT | — | Henter gruppe etter ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Søker etter grupper med tjenestefiltre |
| GET | `/my` | JWT | — | Henter grupper for gjeldende bruker |
| GET | `/my/:tag` | JWT | — | Henter gjeldende brukers grupper filtrert på tagg |
| GET | `/tag/:tag` | JWT | — | Henter alle grupper med en bestemt tagg |
| GET | `/public/:churchId/:id` | Offentlig | — | Henter en offentlig gruppe etter kirke og ID |
| GET | `/public/:churchId/tag/:tag` | Offentlig | — | Henter offentlige grupper etter tagg |
| GET | `/public/:churchId/label?label=` | Offentlig | — | Henter offentlige grupper etter etikett |
| GET | `/public/:churchId/slug/:slug` | Offentlig | — | Henter en offentlig gruppe etter slug |
| POST | `/` | JWT | Groups.Edit | Oppretter eller oppdaterer grupper (genererer slug automatisk) |
| DELETE | `/:id` | JWT | Groups.Edit | Sletter en gruppe (sletter også underordnede team for tjenestegrupper) |

## Gruppemedlemmer

Basissti: `/membership/groupmembers`

Utvider standard CRUD (GET `/:id`, DELETE `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Henter gruppemedlem etter ID |
| GET | `/` | JWT | GroupMembers.View* | Lister gruppemedlemmer. Filtrer med `?groupId=`, `?groupIds=` eller `?personId=`. *Også tillatt hvis brukeren er i gruppen eller spør etter egen personId |
| GET | `/my` | JWT | — | Henter gjeldende brukers gruppemedlemskap |
| GET | `/basic/:groupId` | JWT | — | Henter grunnleggende medlemsliste for en gruppe |
| GET | `/public/leaders/:churchId/:groupId` | Offentlig | — | Henter gruppeledere (offentlig) |
| GET | `/public/:churchId/:groupId` | Offentlig | — | Henter en gruppes offentlige liste (minimale felt: `personId`, `displayName`, `leader`, bilde). Kun når gruppen velger å delta via `publicRoster`; brukes av `staffGrid`-elementet i nettstedsbyggeren |
| POST | `/` | JWT | GroupMembers.Edit | Legger til eller oppdaterer gruppemedlemmer |
| DELETE | `/:id` | JWT | GroupMembers.View | Fjerner et gruppemedlem |

## Husstander

Basissti: `/membership/households`

Standard CRUD-kontroller.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Lister alle husstander |
| GET | `/:id` | JWT | — | Henter husstand etter ID |
| POST | `/` | JWT | People.Edit | Oppretter eller oppdaterer husstander |
| DELETE | `/:id` | JWT | People.Edit | Sletter en husstand |

## Roller

Basissti: `/membership/roles`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Henter rolle etter ID |
| GET | `/church/:churchId` | JWT | Roles.View | Henter alle roller for en kirke |
| POST | `/` | JWT | Roles.Edit | Oppretter eller oppdaterer roller |
| DELETE | `/:id` | JWT | Roles.Edit | Sletter en rolle (fjerner også dens tillatelser og medlemmer) |

## Rollemedlemmer

Basissti: `/membership/rolemembers`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Henter medlemmer for en rolle. Legg til `?include=users` for å inkludere brukerdetaljer |
| POST | `/` | JWT | Roles.Edit | Legger til medlemmer i en rolle (oppretter bruker hvis e-posten ikke finnes) |
| DELETE | `/:id` | JWT | Roles.View | Fjerner et rollemedlem |
| DELETE | `/self/:churchId/:userId` | JWT | — | Fjerner deg selv fra en kirke |

## Rolletillatelser

Basissti: `/membership/rolepermissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Henter tillatelser for en rolle (bruk `null` som ID for rollen «Alle») |
| POST | `/` | JWT | Roles.Edit | Oppretter eller oppdaterer rolletillatelser |
| DELETE | `/:id` | JWT | Roles.Edit | Sletter en rolletillatelse |

## Tillatelser

Basissti: `/membership/permissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Henter hele listen over tilgjengelige tillatelser |

Hvert element har `apiName`, `section` (innholdstype), `action` og etikettene `displaySection` / `displayAction` som rolleredigeringen i B1Admin viser. Nylige tillegg: `MembershipApi` / `People` / `View Names` (**Vis kun personnavn**, under Personer og grupper) og `GivingApi` / `Donations` / `Enter` (**Registrer gaver**, under Gaver; se [Gavebatcher](./giving.md#donation-batches)).

## Skjema

Basissti: `/membership/forms`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Lister alle skjemaer (admin ser alle; redigerere ser tildelte og ikke-medlemsskjemaer) |
| GET | `/:id` | JWT | Skjematilgang | Henter et skjema etter ID |
| GET | `/archived` | JWT | Forms.Admin eller Forms.Edit | Lister arkiverte skjemaer |
| GET | `/standalone/:id?churchId=` | JWT | — | Henter et frittstående skjema (skjemaer med begrenset tilgang krever innlogging) |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Oppretter eller oppdaterer skjemaer |
| DELETE | `/:id` | JWT | Skjematilgang | Sletter et skjema |

## Skjemainnsendinger

Basissti: `/membership/formsubmissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Lister innsendinger. Filtrer med `?personId=` eller `?formId=` |
| GET | `/:id` | JWT | Forms.Admin eller Forms.Edit | Henter innsending etter ID. Legg til `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Skjematilgang | Henter alle innsendinger for et skjema (inkluderer skjema, spørsmål og svar) |
| POST | `/` | JWT | — | Sender inn skjemasvar (håndterer skjemaer med og uten begrenset tilgang, sender e-postvarsler). Når skjemaet har `autoCreatePerson`, finner eller oppretter den en gjesteperson etter e-post og knytter innsendingen til den; når `followUpSubject`/`followUpBody` er satt, sendes en malbasert oppfølgings-e-post til innsenderen |
| DELETE | `/:id` | JWT | Forms.Admin eller Forms.Edit | Sletter en innsending og dens svar |

## Spørsmål

Basissti: `/membership/questions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Skjematilgang | Lister spørsmål for et skjema. Krever `?formId=` |
| GET | `/:id` | JWT | Skjematilgang | Henter et spørsmål etter ID |
| GET | `/unrestricted?formId=` | JWT | — | Henter spørsmål for et skjema uten begrenset tilgang |
| GET | `/sort/:id/up` | JWT | — | Flytter et spørsmål opp i sorteringsrekkefølgen |
| GET | `/sort/:id/down` | JWT | — | Flytter et spørsmål ned i sorteringsrekkefølgen |
| POST | `/` | JWT | Skjematilgang | Oppretter eller oppdaterer spørsmål (tildeler sorteringsrekkefølge automatisk) |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Sletter et spørsmål |

## Svar

Basissti: `/membership/answers`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Lister svar. Filtrer med `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Oppretter eller oppdaterer svar |

## Medlemstillatelser

Basissti: `/membership/memberpermissions`

Styrer tilgang for den enkelte medlem til bestemte skjemaer.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/:id` | JWT | Skjematilgang | Henter en medlemstillatelse etter ID |
| GET | `/member/:id` | JWT | Skjematilgang | Henter alle skjematillatelser for et medlem |
| GET | `/form/:id` | JWT | Skjematilgang | Henter alle medlemstillatelser for et skjema |
| GET | `/form/:id/my` | JWT | Skjematilgang | Henter gjeldende brukers tillatelse for et skjema |
| POST | `/` | JWT | Skjematilgang | Oppretter eller oppdaterer medlemstillatelser |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Sletter en medlemstillatelse |
| DELETE | `/member/:id?formId=` | JWT | Skjematilgang | Sletter alle tillatelser for et medlem på et skjema |

## Innstillinger

Basissti: `/membership/settings`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Henter alle innstillinger for kirken |
| GET | `/public/:churchId` | Offentlig | — | Henter offentlige innstillinger for en kirke |
| POST | `/` | JWT | Settings.Edit | Lagrer innstillinger (støtter opplasting av bilder som base64) |

## Domener

Basissti: `/membership/domains`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Lister alle domener |
| GET | `/:id` | JWT | — | Henter domene etter ID |
| GET | `/lookup/:domainName` | JWT | — | Slår opp et domene etter navn |
| GET | `/public/lookup/:domainName` | Offentlig | — | Offentlig domeneoppslag etter navn |
| GET | `/health/check` | Offentlig | — | Kjører helsesjekk på domener som ikke er kontrollert |
| POST | `/` | JWT | Settings.Edit | Oppretter eller oppdaterer domener (utløser oppdatering av Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Sletter et domene |

## Bruker–kirke

Basissti: `/membership/userchurch`

Administrerer forbindelsen mellom brukere og kirker.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Henter bruker–kirke-post etter bruker-ID |
| GET | `/personid/:personId` | JWT | — | Henter e-post for en persons tilknyttede bruker |
| GET | `/user/:userId` | JWT | Server.Admin | Laster alle kirker for en bruker |
| POST | `/` | JWT | — | Oppretter en bruker–kirke-forbindelse |
| PATCH | `/:userId` | JWT | — | Oppdaterer tidspunkt for sist tilgang og logger tilgangen |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Sletter en bruker–kirke-post |

## Synlighetsinnstillinger

Basissti: `/membership/visibilityPreferences`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/my` | JWT | — | Henter gjeldende brukers synlighetsinnstillinger |
| POST | `/` | JWT | — | Lagrer synlighetsinnstillinger (synlighet for adresse, telefon og e-post) |

## Søk

Basissti: `/membership/query`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/members` | JWT | — | Søk etter medlemmer med naturlig språk ved hjelp av AI. Body: `{ text, subDomain, siteUrl }` |

## Klientfeil

Basissti: `/membership/clientErrors`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| POST | `/` | JWT | — | Logger en feil på klientsiden |

## Relaterte sider

- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Attendance-endepunkter](./attendance) — Sporing av gudstjenester og besøk
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
