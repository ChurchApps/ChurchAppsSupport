---
title: "Medlemsendepunkter"
---

# Medlemsendepunkter {#membership-endpoints}

<div class="article-intro">

Medlemsmodulen håndterer personer, menigheter, grupper, husholdninger, roller, tillatelser, skjemaer og innstillinger. Det er den største modulen, og den gir det sentrale identitets- og autorisasjonslaget for alle andre moduler.

</div>

**Basissti:** `/membership`

## Personer {#people}

Basissti: `/membership/people`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View eller Member | List alle personer for menigheten |
| GET | `/:id` | JWT | People.View eller egen post | Hent en person med ID (inkluderer skjemainnsendinger) |
| GET | `/ids?ids=` | JWT | People.View, Member eller People.ViewNames | Hent flere personer med kommaseparerte ID-er. Kallere med People.ViewNames uten People.View får den grunnleggende modellen, med personer som har reservert seg utelatt (unntatt kalleren selv) |
| GET | `/basic?ids=` | JWT | — | Hent grunnleggende informasjon (bare navn) for flere personer |
| GET | `/names?ids=` | JWT | Enhver tillatelse i menigheten | `[{ id, name: { display, first, last }, photo }]`, sortert etter etternavn og deretter fornavn, for kommaseparerte ID-er som kalleren allerede har. Gjør at roller uten People.View (gaver, oppmøte) kan merke personer. Ingen søk og ingen katalogfilter |
| POST | `/names` | JWT | Enhver tillatelse i menigheten | Samme som `GET /names`. Body: `{ peopleIds }` (eller `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member eller People.ViewNames | Nylig registrerte personer. Kallere med People.ViewNames uten People.View (selv medlemmer med katalogtilgang) får den grunnleggende modellen (`id`, `name.display`, `photo`, `membershipStatus`), med personer som har reservert seg utelatt |
| GET | `/search?term=&email=` | JWT | People.View, Member eller People.ViewNames | Søk etter personer med navn eller e-post (opptil 100, sortert etter etternavn og deretter fornavn). Kallere med People.ViewNames uten People.View (selv medlemmer med katalogtilgang) får et navnesøk som returnerer den grunnleggende modellen. Et `email`-søk returnerer `[]` |
| GET | `/search/phone?number=` | JWT | People.View eller Member | Søk etter telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View eller Member | Hent personer i en bestemt gruppe |
| GET | `/household/:householdId` | JWT | — | Hent alle personer i en husholdning |
| GET | `/attendance` | JWT | People.Edit | Last deltakere med filtre (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Last tidslinjedata for personer og grupper |
| GET | `/directory/:id` | JWT | — | Hent person for katalogvisning (respekterer synlighetsinnstillinger) |
| GET | `/claim/:churchId` | JWT | — | Knytt en personpost til den innloggede brukeren i en menighet |
| POST | `/` | JWT | People.Edit eller EditSelf | Opprett eller oppdater personer (batch) |
| POST | `/search` | JWT | People.View, Member eller People.ViewNames | Søk etter personer (POST-variant). Body: `{ term }` eller `{ email }`; samme regler for kun navn som for `GET /search` |
| POST | `/advancedSearch` | JWT | People.View eller Member | Søk med flere betingelser (alder, birthMonth, membershipStatus osv.) |
| POST | `/loadOrCreate` | Offentlig | — | Finn eller opprett en person med e-post. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Oppdater tilordninger av husholdningsmedlemmer |
| POST | `/public/email` | Offentlig | — | Send en e-post til en person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | Last e-postadresser for personer etter ID-er (server-til-server, krever jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Slett en person |

### Eksempel: Søk etter personer {#example-search-people}

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

### Eksempel: Opprett en person {#example-create-a-person}

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Brukere {#users}

Basissti: `/membership/users`

Se [Autentisering og tillatelser](./authentication) for endepunkter for innlogging, registrering og passordhåndtering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/login` | Offentlig | — | Logg inn (e-post/passord, JWT-fornying eller authGuid) |
| POST | `/register` | Offentlig | — | Registrer en ny bruker |
| POST | `/forgot` | Offentlig | — | Send e-post for tilbakestilling av passord |
| POST | `/setPasswordGuid` | Offentlig | — | Sett passord ved hjelp av auth-GUID fra e-postlenke |
| POST | `/verifyCredentials` | Offentlig | — | Bekreft e-post/passord og returner tilknyttede menigheter |
| POST | `/loadOrCreate` | JWT | — | Finn eller opprett en bruker etter e-post/bruker-ID |
| POST | `/setDisplayName` | JWT | — | Oppdater brukerens fornavn og etternavn |
| POST | `/updateEmail` | JWT | — | Endre brukerens e-postadresse |
| POST | `/updatePassword` | JWT | — | Endre brukerens passord (minst 6 tegn) |
| POST | `/updateOptedOut` | JWT | — | Sett en persons reservasjonsstatus |
| POST | `/sendInviteEmail` | JWT | People.Edit | Send en invitasjon per e-post til en person i denne menigheten (`email`, `personName`, `contextName`). Knappen heter **Sign Up** for en person uten konto og **Log In** for en eksisterende bruker. En bruker som aldri har logget inn får i stedet en lenke **Set Your Password** som utløper etter 7 dager. Dette er en fast mal, så den teller ikke mot menighetens daglige e-postgrense |
| GET | `/search?term=` | JWT | Server.Admin | Søk etter alle brukere på navn/e-post |
| DELETE | `/` | JWT | — | Slett den innloggede brukerkontoen |

## Menigheter {#churches}

Basissti: `/membership/churches`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Last alle menigheter for den innloggede brukeren |
| GET | `/:id` | JWT | — | Hent menighet med ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Hent domeneadministratoren for en menighet |
| GET | `/:id/impersonate` | JWT | Server.Admin | Utgi deg for en menighet (kun serveradministrator) |
| GET | `/all?term=` | JWT | Server.Admin | Søk i alle menigheter (administrator) |
| GET | `/search/?name=` | Offentlig | — | Søk etter menigheter på navn |
| GET | `/lookup/?subDomain=&id=` | Offentlig | — | Slå opp en menighet etter underdomene eller ID |
| POST | `/` | JWT | Settings.Edit | Oppdater menighetsdetaljer |
| POST | `/add` | JWT | — | Registrer en ny menighet. Påkrevde felt: name, address1, city, state, zip, country |
| POST | `/search` | Offentlig | — | Søk etter menigheter på navn (POST-variant) |
| POST | `/select` | JWT | — | Velg/bytt til en menighet. Body: `{ churchId }` eller `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkiver eller gjenopprett en menighet |
| POST | `/byIds` | Offentlig | — | Last flere menigheter etter ID-er |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Slett menigheter som har vært forlatt i 7 dager eller mer |

## Grupper {#groups}

Basissti: `/membership/groups`

Utvider standard CRUD (GET `/`, GET `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle grupper |
| GET | `/:id` | JWT | — | Hent gruppe med ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Søk etter grupper med gudstjenestefiltre |
| GET | `/my` | JWT | — | Hent grupper for den innloggede brukeren |
| GET | `/my/:tag` | JWT | — | Hent den innloggede brukerens grupper filtrert etter tagg |
| GET | `/tag/:tag` | JWT | — | Hent alle grupper med en bestemt tagg |
| GET | `/public/:churchId/:id` | Offentlig | — | Hent en offentlig gruppe etter menighet og ID |
| GET | `/public/:churchId/tag/:tag` | Offentlig | — | Hent offentlige grupper etter tagg |
| GET | `/public/:churchId/label?label=` | Offentlig | — | Hent offentlige grupper etter etikett |
| GET | `/public/:churchId/slug/:slug` | Offentlig | — | Hent en offentlig gruppe etter slug |
| POST | `/` | JWT | Groups.Edit | Opprett eller oppdater grupper (genererer slug automatisk) |
| DELETE | `/:id` | JWT | Groups.Edit | Slett en gruppe (sletter også underordnede team for tjenestegrupper) |

## Gruppemedlemmer {#group-members}

Basissti: `/membership/groupmembers`

Utvider standard CRUD (GET `/:id`, DELETE `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Hent gruppemedlem med ID |
| GET | `/` | JWT | GroupMembers.View* | List gruppemedlemmer. Filtrer med `?groupId=`, `?groupIds=` eller `?personId=`. *Også tillatt hvis brukeren er i gruppen eller spør etter egen personId, og for `?groupId=` for enhver ikke-konfidensiell gruppe når brukeren har Attendance.View eller Attendance.Edit (medlemmer under 13 år er inkludert for dem) |
| GET | `/my` | JWT | — | Hent den innloggede brukerens gruppemedlemskap |
| GET | `/basic/:groupId` | JWT | — | Hent grunnleggende medlemsliste for en gruppe |
| GET | `/public/leaders/:churchId/:groupId` | Offentlig | — | Hent gruppeledere (offentlig) |
| GET | `/public/:churchId/:groupId` | Offentlig | — | Hent en gruppes offentlige liste (minimale felt: `personId`, `displayName`, `leader`, photo). Bare når gruppen velger å delta via `publicRoster`. Driver elementet `staffGrid` i nettsidebyggeren |
| POST | `/` | JWT | GroupMembers.Edit | Legg til eller oppdater gruppemedlemmer |
| DELETE | `/:id` | JWT | GroupMembers.View | Fjern et gruppemedlem |

## Husholdninger {#households}

Basissti: `/membership/households`

Standard CRUD-kontroller.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle husholdninger |
| GET | `/:id` | JWT | — | Hent husholdning med ID |
| POST | `/` | JWT | People.Edit | Opprett eller oppdater husholdninger |
| DELETE | `/:id` | JWT | People.Edit | Slett en husholdning |

## Roller {#roles}

Basissti: `/membership/roles`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Hent rolle med ID |
| GET | `/church/:churchId` | JWT | Roles.View | Hent alle roller for en menighet |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater roller |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolle (fjerner også tillatelsene og medlemmene) |

## Rollemedlemmer {#role-members}

Basissti: `/membership/rolemembers`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent medlemmer for en rolle. Legg til `?include=users` for å inkludere brukerdetaljer |
| POST | `/` | JWT | Roles.Edit | Legg til medlemmer i en rolle (oppretter bruker hvis e-posten ikke finnes) |
| DELETE | `/:id` | JWT | Roles.View | Fjern et rollemedlem |
| DELETE | `/self/:churchId/:userId` | JWT | — | Fjern deg selv fra en menighet |

## Rolletillatelser {#role-permissions}

Basissti: `/membership/rolepermissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent tillatelser for en rolle (bruk `null` som ID for rollen «Everyone») |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater rolletillatelser |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolletillatelse |

## Tillatelser {#permissions}

Basissti: `/membership/permissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent hele listen over tilgjengelige tillatelser |

Hvert element har `apiName`, `section` (innholdstype), `action` og etikettene `displaySection` / `displayAction` som rolleredigeringen i B1Admin viser. Nylige tillegg: `MembershipApi` / `People` / `View Names` (**View People Names Only**, under People and Groups) og `GivingApi` / `Donations` / `Enter` (**Enter Donations**, under Donations; se [Gavepakker](./giving.md#donation-batches)).

## Skjemaer {#forms}

Basissti: `/membership/forms`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List alle skjemaer (administratorer ser alle; redaktører ser tildelte skjemaer og skjemaer uten medlemsbegrensning) |
| GET | `/:id` | JWT | Skjematilgang | Hent et skjema med ID |
| GET | `/archived` | JWT | Forms.Admin eller Forms.Edit | List arkiverte skjemaer |
| GET | `/standalone/:id?churchId=` | JWT | — | Hent et frittstående skjema (begrensede skjemaer krever autentisering) |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater skjemaer |
| DELETE | `/:id` | JWT | Skjematilgang | Slett et skjema |

## Skjemainnsendinger {#form-submissions}

Basissti: `/membership/formsubmissions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List innsendinger. Filtrer med `?personId=` eller `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Selvbetjent: opptil 50 frittstående skjemainnsendinger (ikke personskjemaer) som den innloggede medlemmen har sendt inn, nyeste først, hver med `form.name`. `include` legger til hvert skjemas spørsmål og innsendingens svar. Returnerer `401` hvis brukeren ikke er koblet til en person. Brukes av seksjonen **Mine skjemaer** på B1 Me-siden |
| GET | `/:id` | JWT | Forms.Admin eller Forms.Edit | Hent innsending med ID. Legg til `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Skjematilgang | Hent alle innsendinger for et skjema (inkluderer skjema, spørsmål og svar) |
| POST | `/` | JWT | — | Send inn skjemasvar (håndterer begrensede og ubegrensede skjemaer, sender varsler per e-post). Når skjemaet har `autoCreatePerson`, finner eller oppretter det en gjestperson basert på e-post og kobler innsendingen til den. Når `followUpSubject`/`followUpBody` er satt, sendes en e-post med mal til den som sendte inn. Med mindre kalleren kan administrere skjemaet, settes `submittedBy` alltid til den innloggede medlemmens person (eller er tom for anonyme innsendinger) |
| DELETE | `/:id` | JWT | Forms.Admin eller Forms.Edit | Slett en innsending og tilhørende svar |

## Spørsmål {#questions}

Basissti: `/membership/questions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Skjematilgang | List spørsmål for et skjema. Krever `?formId=` |
| GET | `/:id` | JWT | Skjematilgang | Hent et spørsmål med ID |
| GET | `/unrestricted?formId=` | JWT | — | Hent spørsmål for et ubegrenset skjema |
| GET | `/sort/:id/up` | JWT | — | Flytt et spørsmål opp i sorteringsrekkefølgen |
| GET | `/sort/:id/down` | JWT | — | Flytt et spørsmål ned i sorteringsrekkefølgen |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater spørsmål (tildeler sorteringsrekkefølge automatisk) |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett et spørsmål |

## Svar {#answers}

Basissti: `/membership/answers`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List svar. Filtrer med `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater svar |

## Medlemstillatelser {#member-permissions}

Basissti: `/membership/memberpermissions`

Styrer tilgang per medlem til bestemte skjemaer.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Skjematilgang | Hent en medlemstillatelse med ID |
| GET | `/member/:id` | JWT | Skjematilgang | Hent alle skjematillatelser for et medlem |
| GET | `/form/:id` | JWT | Skjematilgang | Hent alle medlemstillatelser for et skjema |
| GET | `/form/:id/my` | JWT | Skjematilgang | Hent den innloggede brukerens tillatelse for et skjema |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater medlemstillatelser |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett en medlemstillatelse |
| DELETE | `/member/:id?formId=` | JWT | Skjematilgang | Slett alle tillatelser for et medlem på et skjema |

## Innstillinger {#settings}

Basissti: `/membership/settings`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for menigheten |
| GET | `/public/:churchId` | Offentlig | — | Hent offentlige innstillinger for en menighet |
| POST | `/` | JWT | Settings.Edit | Lagre innstillinger (støtter opplasting av bilder i base64) |

## Domener {#domains}

Basissti: `/membership/domains`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklassen).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle domener |
| GET | `/:id` | JWT | — | Hent domene med ID |
| GET | `/lookup/:domainName` | JWT | — | Slå opp et domene etter navn |
| GET | `/public/lookup/:domainName` | Offentlig | — | Offentlig oppslag av domene etter navn |
| GET | `/health/check` | Offentlig | — | Kjør helsesjekk på domener som ikke er sjekket |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater domener (utløser oppdatering av Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Slett et domene |

## Brukermenighet {#user-church}

Basissti: `/membership/userchurch`

Håndterer koblingen mellom brukere og menigheter.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Hent bruker-menighet-post etter bruker-ID |
| GET | `/personid/:personId` | JWT | — | Hent e-post for en persons koblede bruker |
| GET | `/user/:userId` | JWT | Server.Admin | Last alle menigheter for en bruker |
| POST | `/` | JWT | — | Opprett en kobling mellom bruker og menighet |
| PATCH | `/:userId` | JWT | — | Oppdater sist brukt-tidspunkt og logg tilgangen |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Slett en bruker-menighet-post |

## Synlighetsinnstillinger {#visibility-preferences}

Basissti: `/membership/visibilityPreferences`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent den innloggede brukerens synlighetsinnstillinger |
| POST | `/` | JWT | — | Lagre synlighetsinnstillinger (synlighet for adresse, telefon og e-post) |

## Spørring {#query}

Basissti: `/membership/query`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Søk etter medlemmer med naturlig språk ved hjelp av AI. Body: `{ text, subDomain, siteUrl }` |

## Klientfeil {#client-errors}

Basissti: `/membership/clientErrors`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Logg en feil på klientsiden |

## Relaterte sider {#related-pages}

- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Oppmøte-endepunkter](./attendance) — Sporing av gudstjenester og besøk
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
