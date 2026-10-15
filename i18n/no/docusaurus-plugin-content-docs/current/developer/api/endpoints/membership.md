---
title: "Membership-endepunkter"
---

# Membership-endepunkter

<div class="article-intro">

Membership-modulen håndterer personer, kirker, grupper, husstander, roller, tillatelser, skjemaer og innstillinger. Det er den største modulen, og den gir det sentrale lag for identitet og autorisasjon for alle andre moduler.

</div>

**Basisbane:** `/membership`

## Personer

Basisbane: `/membership/people`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View eller Member | Liste over alle personer for kirken |
| GET | `/:id` | JWT | People.View eller egen registrering | Hent en person etter ID (inkluderer skjemainnsendinger) |
| GET | `/ids?ids=` | JWT | People.View eller Member | Hent flere personer etter kommaseparerte ID-er |
| GET | `/basic?ids=` | JWT | — | Hent grunnleggende informasjon (kun navn) for flere personer |
| GET | `/names?ids=` | JWT | Enhver kirkerettighet | `[{ id, name: { display }, photo }]` for kommaseparerte ID-er som innringeren allerede har, slik at roller uten People.View (gaver, oppmøte) kan merke personer. Ingen søk, ingen katalogfilter |
| POST | `/names` | JWT | Enhver kirkerettighet | Samme som `GET /names`. Forespørsel: `{ peopleIds }` (eller `{ ids }`) |
| GET | `/recent` | JWT | People.View eller Member | Nylig lagt til personer |
| GET | `/search?term=&email=` | JWT | People.View eller Member | Søk etter personer på navn eller e-post |
| GET | `/search/phone?number=` | JWT | People.View eller Member | Søk etter telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View eller Member | Hent personer i en bestemt gruppe |
| GET | `/household/:householdId` | JWT | — | Hent alle personer i en husstand |
| GET | `/attendance` | JWT | People.Edit | Last deltakere med filtre (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Last tidslinjedata for personer og grupper |
| GET | `/directory/:id` | JWT | — | Hent person for katalogvisning (respekterer synlighetsinnstillinger) |
| GET | `/claim/:churchId` | JWT | — | Knytt en personregistrering til gjeldende bruker i en kirke |
| POST | `/` | JWT | People.Edit eller EditSelf | Opprett eller oppdater personer (batch) |
| POST | `/search` | JWT | People.View eller Member | Søk etter personer (POST-variant) |
| POST | `/advancedSearch` | JWT | People.View eller Member | Søk med flere betingelser (alder, birthMonth, membershipStatus osv.) |
| POST | `/loadOrCreate` | Offentlig | — | Finn eller opprett en person etter e-post. Forespørsel: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Oppdater tilordning av husstandsmedlemmer |
| POST | `/public/email` | Offentlig | — | Send en e-post til en person. Forespørsel: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | Last e-postadresser for personer etter ID (server-til-server, krever jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Slett en person |

### Eksempel: Søke etter personer

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

### Eksempel: Opprette en person

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Brukere

Basisbane: `/membership/users`

Se [Autentisering og tillatelser](./authentication) for endepunkter for innlogging, registrering og passordhåndtering.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/login` | Offentlig | — | Logg inn (e-post/passord, JWT-fornyelse, eller authGuid) |
| POST | `/register` | Offentlig | — | Registrer en ny bruker |
| POST | `/forgot` | Offentlig | — | Send e-post for tilbakestilling av passord |
| POST | `/setPasswordGuid` | Offentlig | — | Sett passord ved hjelp av auth-GUID fra e-postlenken |
| POST | `/verifyCredentials` | Offentlig | — | Verifiser e-post/passord og returner tilknyttede kirker |
| POST | `/loadOrCreate` | JWT | — | Finn eller opprett en bruker etter e-post/userId |
| POST | `/setDisplayName` | JWT | — | Oppdater brukerens fornavn og etternavn |
| POST | `/updateEmail` | JWT | — | Endre brukerens e-postadresse |
| POST | `/updatePassword` | JWT | — | Endre brukerens passord (minst 6 tegn) |
| POST | `/updateOptedOut` | JWT | — | Sett en persons avmeldingsstatus |
| POST | `/sendInviteEmail` | JWT | People.Edit | Send en invitasjon på e-post til en person i denne kirken (`email`, `personName`, `contextName`). Knappen heter **Registrer deg** for en person uten konto og **Logg inn** for en eksisterende bruker. En bruker som aldri har logget inn, får i stedet en lenke **Sett passordet ditt** som utløper etter 7 dager. Teller mot kirkens daglige e-postgrense (`429` når den er nådd) |
| GET | `/search?term=` | JWT | Server.Admin | Søk etter alle brukere på navn/e-post |
| DELETE | `/` | JWT | — | Slett gjeldende brukerkonto |

## Kirker

Basisbane: `/membership/churches`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Last alle kirker for gjeldende bruker |
| GET | `/:id` | JWT | — | Hent kirke etter ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Hent domeneadministratoren for en kirke |
| GET | `/:id/impersonate` | JWT | Server.Admin | Utgi deg for en kirke (kun serveradministrator) |
| GET | `/all?term=` | JWT | Server.Admin | Søk i alle kirker (admin) |
| GET | `/search/?name=` | Offentlig | — | Søk etter kirker på navn |
| GET | `/lookup/?subDomain=&id=` | Offentlig | — | Slå opp en kirke etter underdomene eller ID |
| POST | `/` | JWT | Settings.Edit | Oppdater kirkeopplysninger |
| POST | `/add` | JWT | — | Registrer en ny kirke. Påkrevde felt: name, address1, city, state, zip, country |
| POST | `/search` | Offentlig | — | Søk etter kirker på navn (POST-variant) |
| POST | `/select` | JWT | — | Velg/bytt til en kirke. Forespørsel: `{ churchId }` eller `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkiver eller opphev arkivering av en kirke |
| POST | `/byIds` | Offentlig | — | Last flere kirker etter ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Slett kirker som har vært forlatt i 7+ dager |

## Grupper

Basisbane: `/membership/groups`

Utvider standard CRUD (GET `/`, GET `/:id` fra basisklassen).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle grupper |
| GET | `/:id` | JWT | — | Hent gruppe etter ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Søk etter grupper med tjenestefilter |
| GET | `/my` | JWT | — | Hent grupper for gjeldende bruker |
| GET | `/my/:tag` | JWT | — | Hent gjeldende brukers grupper filtrert på merkelapp |
| GET | `/tag/:tag` | JWT | — | Hent alle grupper med en bestemt merkelapp |
| GET | `/public/:churchId/:id` | Offentlig | — | Hent en offentlig gruppe etter kirke og ID |
| GET | `/public/:churchId/tag/:tag` | Offentlig | — | Hent offentlige grupper etter merkelapp |
| GET | `/public/:churchId/label?label=` | Offentlig | — | Hent offentlige grupper etter etikett |
| GET | `/public/:churchId/slug/:slug` | Offentlig | — | Hent en offentlig gruppe etter slug |
| POST | `/` | JWT | Groups.Edit | Opprett eller oppdater grupper (genererer slug automatisk) |
| DELETE | `/:id` | JWT | Groups.Edit | Slett en gruppe (sletter også underordnede team for tjenestegrupper) |

## Gruppemedlemmer

Basisbane: `/membership/groupmembers`

Utvider standard CRUD (GET `/:id`, DELETE `/:id` fra basisklassen).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Hent gruppemedlem etter ID |
| GET | `/` | JWT | GroupMembers.View* | Liste over gruppemedlemmer. Filtrer med `?groupId=`, `?groupIds=` eller `?personId=`. *Tillatt også hvis brukeren er i gruppen, eller spør etter egen personId |
| GET | `/my` | JWT | — | Hent gjeldende brukers gruppemedlemskap |
| GET | `/basic/:groupId` | JWT | — | Hent grunnleggende medlemsliste for en gruppe |
| GET | `/public/leaders/:churchId/:groupId` | Offentlig | — | Hent gruppeledere (offentlig) |
| GET | `/public/:churchId/:groupId` | Offentlig | — | Hent en gruppes offentlige liste (minimale felt: `personId`, `displayName`, `leader`, bilde). Kun når gruppen velger å delta via `publicRoster`; brukes av `staffGrid`-elementet i nettstedsbyggeren |
| POST | `/` | JWT | GroupMembers.Edit | Legg til eller oppdater gruppemedlemmer |
| DELETE | `/:id` | JWT | GroupMembers.View | Fjern et gruppemedlem |

## Husstander

Basisbane: `/membership/households`

Standard CRUD-kontroller.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle husstander |
| GET | `/:id` | JWT | — | Hent husstand etter ID |
| POST | `/` | JWT | People.Edit | Opprett eller oppdater husstander |
| DELETE | `/:id` | JWT | People.Edit | Slett en husstand |

## Roller

Basisbane: `/membership/roles`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Hent rolle etter ID |
| GET | `/church/:churchId` | JWT | Roles.View | Hent alle roller for en kirke |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater roller |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolle (fjerner også dens tillatelser og medlemmer) |

## Rollemedlemmer

Basisbane: `/membership/rolemembers`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent medlemmer for en rolle. Legg til `?include=users` for å inkludere brukerdetaljer |
| POST | `/` | JWT | Roles.Edit | Legg til medlemmer i en rolle (oppretter bruker hvis e-posten ikke finnes) |
| DELETE | `/:id` | JWT | Roles.View | Fjern et rollemedlem |
| DELETE | `/self/:churchId/:userId` | JWT | — | Fjern deg selv fra en kirke |

## Rolletillatelser

Basisbane: `/membership/rolepermissions`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent tillatelser for en rolle (bruk `null` som ID for rollen "Everyone") |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater rolletillatelser |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolletillatelse |

## Tillatelser

Basisbane: `/membership/permissions`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent hele listen over tilgjengelige tillatelser |

## Skjemaer

Basisbane: `/membership/forms`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Liste over alle skjemaer (admin ser alle; redaktører ser tildelte og ikke-medlemsskjemaer) |
| GET | `/:id` | JWT | Skjematilgang | Hent et skjema etter ID |
| GET | `/archived` | JWT | Forms.Admin eller Forms.Edit | Liste over arkiverte skjemaer |
| GET | `/standalone/:id?churchId=` | JWT | — | Hent et frittstående skjema (begrensede skjemaer krever autentisering) |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater skjemaer |
| DELETE | `/:id` | JWT | Skjematilgang | Slett et skjema |

## Skjemainnsendinger

Basisbane: `/membership/formsubmissions`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Liste over innsendinger. Filtrer med `?personId=` eller `?formId=` |
| GET | `/:id` | JWT | Forms.Admin eller Forms.Edit | Hent innsending etter ID. Legg til `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Skjematilgang | Hent alle innsendinger for et skjema (inkluderer skjema, spørsmål, svar) |
| POST | `/` | JWT | — | Send inn skjemasvar (håndterer begrensede og ubegrensede skjemaer, sender e-postvarsler). Når skjemaet har `autoCreatePerson`, finner eller oppretter den en gjestperson etter e-post og knytter innsendingen til den; når `followUpSubject`/`followUpBody` er satt, sendes en malbasert oppfølgings-e-post til innsenderen |
| DELETE | `/:id` | JWT | Forms.Admin eller Forms.Edit | Slett en innsending og dens svar |

## Spørsmål

Basisbane: `/membership/questions`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Skjematilgang | Liste over spørsmål for et skjema. Krever `?formId=` |
| GET | `/:id` | JWT | Skjematilgang | Hent et spørsmål etter ID |
| GET | `/unrestricted?formId=` | JWT | — | Hent spørsmål for et ubegrenset skjema |
| GET | `/sort/:id/up` | JWT | — | Flytt et spørsmål opp i sorteringsrekkefølgen |
| GET | `/sort/:id/down` | JWT | — | Flytt et spørsmål ned i sorteringsrekkefølgen |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater spørsmål (tildeler sorteringsrekkefølge automatisk) |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett et spørsmål |

## Svar

Basisbane: `/membership/answers`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Liste over svar. Filtrer med `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater svar |

## Medlemstillatelser

Basisbane: `/membership/memberpermissions`

Styrer tilgang per medlem til bestemte skjemaer.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Skjematilgang | Hent en medlemstillatelse etter ID |
| GET | `/member/:id` | JWT | Skjematilgang | Hent alle skjematillatelser for et medlem |
| GET | `/form/:id` | JWT | Skjematilgang | Hent alle medlemstillatelser for et skjema |
| GET | `/form/:id/my` | JWT | Skjematilgang | Hent gjeldende brukers tillatelse for et skjema |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater medlemstillatelser |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett en medlemstillatelse |
| DELETE | `/member/:id?formId=` | JWT | Skjematilgang | Slett alle tillatelser for et medlem på et skjema |

## Innstillinger

Basisbane: `/membership/settings`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for kirken |
| GET | `/public/:churchId` | Offentlig | — | Hent offentlige innstillinger for en kirke |
| POST | `/` | JWT | Settings.Edit | Lagre innstillinger (støtter opplasting av bilder som base64) |

## Domener

Basisbane: `/membership/domains`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklassen).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle domener |
| GET | `/:id` | JWT | — | Hent domene etter ID |
| GET | `/lookup/:domainName` | JWT | — | Slå opp et domene etter navn |
| GET | `/public/lookup/:domainName` | Offentlig | — | Offentlig domeneoppslag etter navn |
| GET | `/health/check` | Offentlig | — | Kjør helsesjekk på domener som ikke er sjekket |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater domener (utløser oppdatering av Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Slett et domene |

## Brukerkirke

Basisbane: `/membership/userchurch`

Administrerer forbindelsen mellom brukere og kirker.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Hent bruker-kirke-post etter bruker-ID |
| GET | `/personid/:personId` | JWT | — | Hent e-post for en persons koblede bruker |
| GET | `/user/:userId` | JWT | Server.Admin | Last alle kirker for en bruker |
| POST | `/` | JWT | — | Opprett en bruker-kirke-kobling |
| PATCH | `/:userId` | JWT | — | Oppdater sist tilgjengelige tidspunkt og logg tilgang |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Slett en bruker-kirke-post |

## Synlighetsinnstillinger

Basisbane: `/membership/visibilityPreferences`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent gjeldende brukers synlighetsinnstillinger |
| POST | `/` | JWT | — | Lagre synlighetsinnstillinger (synlighet for adresse, telefon og e-post) |

## Spørring

Basisbane: `/membership/query`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Søk etter medlemmer med naturlig språk ved hjelp av KI. Forespørsel: `{ text, subDomain, siteUrl }` |

## Klientfeil

Basisbane: `/membership/clientErrors`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Logg en feil på klientsiden |

## Relaterte sider

- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Attendance-endepunkter](./attendance) — Sporing av gudstjenester og besøk
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
