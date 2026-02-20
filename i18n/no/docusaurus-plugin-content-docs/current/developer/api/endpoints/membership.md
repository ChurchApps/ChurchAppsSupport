---
title: "Membership-endepunkter"
---

# Membership-endepunkter

<div class="article-intro">

Membership-modulen administrerer personer, kirker, grupper, husstander, roller, tillatelser, skjemaer og innstillinger. Det er den største modulen og tilbyr det sentrale identitets- og autorisasjonslaget for alle andre moduler.

</div>

**Basissti:** `/membership`

## Personer

Basissti: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View eller Member | List alle personer for kirken |
| GET | `/:id` | JWT | People.View eller egen oppføring | Hent en person etter ID (inkluderer skjemainnsendinger) |
| GET | `/ids?ids=` | JWT | People.View eller Member | Hent flere personer etter kommaseparerte ID-er |
| GET | `/basic?ids=` | JWT | — | Hent grunnleggende info (kun navn) for flere personer |
| GET | `/recent` | JWT | People.View eller Member | Nylig tillagte personer |
| GET | `/search?term=&email=` | JWT | People.View eller Member | Søk personer etter navn eller e-post |
| GET | `/search/phone?number=` | JWT | People.View eller Member | Søk etter telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View eller Member | Hent personer i en spesifikk gruppe |
| GET | `/household/:householdId` | JWT | — | Hent alle personer i en husstand |
| GET | `/attendance` | JWT | People.Edit | Last deltakere med filtre (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Last tidslinjedata for personer og grupper |
| GET | `/directory/:id` | JWT | — | Hent person for katalogvisning (respekterer synlighetsinnstillinger) |
| GET | `/claim/:churchId` | JWT | — | Krev en personoppføring for gjeldende bruker ved en kirke |
| POST | `/` | JWT | People.Edit eller EditSelf | Opprett eller oppdater personer (batch) |
| POST | `/search` | JWT | People.View eller Member | Søk personer (POST-variant) |
| POST | `/advancedSearch` | JWT | People.View eller Member | Flerbetingelsessøk (alder, fødselsmåned, medlemsstatus osv.) |
| POST | `/loadOrCreate` | Public | — | Finn eller opprett en person etter e-post. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Oppdater husstandsmedlemstilordninger |
| POST | `/public/email` | Public | — | Send en e-post til en person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Last person-e-poster etter ID-er (server-til-server, krever jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Slett en person |

### Eksempel: Søk personer

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

## Brukere

Basissti: `/membership/users`

Se [Autentisering og tillatelser](./authentication) for innlogging, registrering og passordadministrasjonsendepunkter.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Logg inn (e-post/passord, JWT-fornyelse eller authGuid) |
| POST | `/register` | Public | — | Registrer en ny bruker |
| POST | `/forgot` | Public | — | Send e-post for tilbakestilling av passord |
| POST | `/setPasswordGuid` | Public | — | Angi passord ved hjelp av auth-GUID fra e-postlenke |
| POST | `/verifyCredentials` | Public | — | Verifiser e-post/passord og returner tilknyttede kirker |
| POST | `/loadOrCreate` | JWT | — | Finn eller opprett en bruker etter e-post/userId |
| POST | `/setDisplayName` | JWT | — | Oppdater brukerens for- og etternavn |
| POST | `/updateEmail` | JWT | — | Endre brukerens e-postadresse |
| POST | `/updatePassword` | JWT | — | Endre brukerens passord (min. 6 tegn) |
| POST | `/updateOptedOut` | JWT | — | Angi en persons avmeldingsstatus |
| GET | `/search?term=` | JWT | Server.Admin | Søk alle brukere etter navn/e-post |
| DELETE | `/` | JWT | — | Slett gjeldende brukerkonto |

## Kirker

Basissti: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Last alle kirker for gjeldende bruker |
| GET | `/:id` | JWT | — | Hent kirke etter ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Hent domeneadministratorbrukeren for en kirke |
| GET | `/:id/impersonate` | JWT | Server.Admin | Etterlign en kirke (kun serveradministrator) |
| GET | `/all?term=` | JWT | Server.Admin | Søk alle kirker (administrator) |
| GET | `/search/?name=` | Public | — | Søk kirker etter navn |
| GET | `/lookup/?subDomain=&id=` | Public | — | Slå opp en kirke etter underdomene eller ID |
| POST | `/` | JWT | Settings.Edit | Oppdater kirkedetaljer |
| POST | `/add` | JWT | — | Registrer en ny kirke. Påkrevde felter: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Søk kirker etter navn (POST-variant) |
| POST | `/select` | JWT | — | Velg/bytt til en kirke. Body: `{ churchId }` eller `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkiver eller gjenopprett en kirke |
| POST | `/byIds` | Public | — | Last flere kirker etter ID-er |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Slett kirker forlatt i 7+ dager |

## Grupper

Basissti: `/membership/groups`

Utvider standard CRUD (GET `/`, GET `/:id` fra baseklassen).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle grupper |
| GET | `/:id` | JWT | — | Hent gruppe etter ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Søk grupper etter gudstjenestefiltre |
| GET | `/my` | JWT | — | Hent grupper for gjeldende bruker |
| GET | `/my/:tag` | JWT | — | Hent gjeldende brukers grupper filtrert etter tag |
| GET | `/tag/:tag` | JWT | — | Hent alle grupper med en spesifikk tag |
| GET | `/public/:churchId/:id` | Public | — | Hent en offentlig gruppe etter kirke og ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Hent offentlige grupper etter tag |
| GET | `/public/:churchId/label?label=` | Public | — | Hent offentlige grupper etter etikett |
| GET | `/public/:churchId/slug/:slug` | Public | — | Hent en offentlig gruppe etter slug |
| POST | `/` | JWT | Groups.Edit | Opprett eller oppdater grupper (genererer slug automatisk) |
| DELETE | `/:id` | JWT | Groups.Edit | Slett en gruppe (sletter også underordnede team for tjeneste-grupper) |

## Gruppemedlemmer

Basissti: `/membership/groupmembers`

Utvider standard CRUD (GET `/:id`, DELETE `/:id` fra baseklassen).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Hent gruppemedlem etter ID |
| GET | `/` | JWT | GroupMembers.View* | List gruppemedlemmer. Filtrer med `?groupId=`, `?groupIds=` eller `?personId=`. *Også tillatt hvis brukeren er i gruppen eller spør etter egen personId |
| GET | `/my` | JWT | — | Hent gjeldende brukers gruppemedlemskap |
| GET | `/basic/:groupId` | JWT | — | Hent grunnleggende medlemsliste for en gruppe |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Hent gruppeledere (offentlig) |
| POST | `/` | JWT | GroupMembers.Edit | Legg til eller oppdater gruppemedlemmer |
| DELETE | `/:id` | JWT | GroupMembers.View | Fjern et gruppemedlem |

## Husstander

Basissti: `/membership/households`

Standard CRUD-kontroller.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle husstander |
| GET | `/:id` | JWT | — | Hent husstand etter ID |
| POST | `/` | JWT | People.Edit | Opprett eller oppdater husstander |
| DELETE | `/:id` | JWT | People.Edit | Slett en husstand |

## Roller

Basissti: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Hent rolle etter ID |
| GET | `/church/:churchId` | JWT | Roles.View | Hent alle roller for en kirke |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater roller |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolle (fjerner også tillatelser og medlemmer) |

## Rollemedlemmer

Basissti: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent medlemmer for en rolle. Legg til `?include=users` for å inkludere brukerdetaljer |
| POST | `/` | JWT | Roles.Edit | Legg til medlemmer i en rolle (oppretter bruker hvis e-post ikke finnes) |
| DELETE | `/:id` | JWT | Roles.View | Fjern et rollemedlem |
| DELETE | `/self/:churchId/:userId` | JWT | — | Fjern deg selv fra en kirke |

## Rolletillatelser

Basissti: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent tillatelser for en rolle (bruk `null` som ID for «Alle»-rollen) |
| POST | `/` | JWT | Roles.Edit | Opprett eller oppdater rolletillatelser |
| DELETE | `/:id` | JWT | Roles.Edit | Slett en rolletillatelse |

## Tillatelser

Basissti: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent den fullstendige listen over tilgjengelige tillatelser |

## Skjemaer

Basissti: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List alle skjemaer (administrator ser alle; redaktører ser tildelte + ikke-medlemsskjemaer) |
| GET | `/:id` | JWT | Skjematilgang | Hent et skjema etter ID |
| GET | `/archived` | JWT | Forms.Admin eller Forms.Edit | List arkiverte skjemaer |
| GET | `/standalone/:id?churchId=` | JWT | — | Hent et frittstående skjema (begrensede skjemaer krever autentisering) |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater skjemaer |
| DELETE | `/:id` | JWT | Skjematilgang | Slett et skjema |

## Skjemainnsendinger

Basissti: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List innsendinger. Filtrer med `?personId=` eller `?formId=` |
| GET | `/:id` | JWT | Forms.Admin eller Forms.Edit | Hent innsending etter ID. Legg til `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Skjematilgang | Hent alle innsendinger for et skjema (inkluderer skjema, spørsmål, svar) |
| POST | `/` | JWT | — | Send inn skjemasvar (håndterer begrensede/ubegrensede skjemaer, sender e-postvarsler) |
| DELETE | `/:id` | JWT | Forms.Admin eller Forms.Edit | Slett en innsending og dens svar |

## Spørsmål

Basissti: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Skjematilgang | List spørsmål for et skjema. Krever `?formId=` |
| GET | `/:id` | JWT | Skjematilgang | Hent et spørsmål etter ID |
| GET | `/unrestricted?formId=` | JWT | — | Hent spørsmål for et ubegrenset skjema |
| GET | `/sort/:id/up` | JWT | — | Flytt et spørsmål opp i sorteringsrekkefølgen |
| GET | `/sort/:id/down` | JWT | — | Flytt et spørsmål ned i sorteringsrekkefølgen |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater spørsmål (tilordner sorteringsrekkefølge automatisk) |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett et spørsmål |

## Svar

Basissti: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | List svar. Filtrer med `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Opprett eller oppdater svar |

## Medlemstillatelser

Basissti: `/membership/memberpermissions`

Kontrollerer per-medlem-tilgang til spesifikke skjemaer.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Skjematilgang | Hent en medlemstillatelse etter ID |
| GET | `/member/:id` | JWT | Skjematilgang | Hent alle skjematillatelser for et medlem |
| GET | `/form/:id` | JWT | Skjematilgang | Hent alle medlemstillatelser for et skjema |
| GET | `/form/:id/my` | JWT | Skjematilgang | Hent gjeldende brukers tillatelse for et skjema |
| POST | `/` | JWT | Skjematilgang | Opprett eller oppdater medlemstillatelser |
| DELETE | `/:id?formId=` | JWT | Skjematilgang | Slett en medlemstillatelse |
| DELETE | `/member/:id?formId=` | JWT | Skjematilgang | Slett alle tillatelser for et medlem på et skjema |

## Innstillinger

Basissti: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for kirken |
| GET | `/public/:churchId` | Public | — | Hent offentlige innstillinger for en kirke |
| POST | `/` | JWT | Settings.Edit | Lagre innstillinger (støtter base64-bildeopplasting) |

## Domener

Basissti: `/membership/domains`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra baseklassen).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle domener |
| GET | `/:id` | JWT | — | Hent domene etter ID |
| GET | `/lookup/:domainName` | JWT | — | Slå opp et domene etter navn |
| GET | `/public/lookup/:domainName` | Public | — | Offentlig domeneoppslag etter navn |
| GET | `/health/check` | Public | — | Kjør helsesjekk på ukontrollerte domener |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater domener (utløser Caddy-oppdatering) |
| DELETE | `/:id` | JWT | Settings.Edit | Slett et domene |

## Brukerkirke

Basissti: `/membership/userchurch`

Administrerer tilknytningen mellom brukere og kirker.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Hent bruker-kirke-oppføring etter bruker-ID |
| GET | `/personid/:personId` | JWT | — | Hent e-post for en persons tilknyttede bruker |
| GET | `/user/:userId` | JWT | Server.Admin | Last alle kirker for en bruker |
| POST | `/` | JWT | — | Opprett en bruker-kirke-tilknytning |
| PATCH | `/:userId` | JWT | — | Oppdater sist brukte tidspunkt og logg tilgang |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Slett en bruker-kirke-oppføring |

## Synlighetsinnstillinger

Basissti: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent gjeldende brukers synlighetsinnstillinger |
| POST | `/` | JWT | — | Lagre synlighetsinnstillinger (adresse-, telefon-, e-postsynlighet) |

## Spørring

Basissti: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Naturlig språk-medlemssøk ved hjelp av AI. Body: `{ text, subDomain, siteUrl }` |

## Klientfeil

Basissti: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Logg en klientsidisfeil |

## Relaterte sider

- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Attendance-endepunkter](./attendance) — Gudstjeneste- og besøkssporing
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
