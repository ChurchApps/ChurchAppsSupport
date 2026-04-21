---
title: "Medlemskabsendpoints"
---

# Medlemskabsendpoints

<div class="article-intro">

Medlemskabsmodulet administrerer mennesker, kirker, grupper, husstande, roller, tilladelser, formularer og indstillinger. Det er det største modul og leverer kernelaget for identitet og autorisering for alle andre moduler.

</div>

**Basesti:** `/membership`

## Mennesker

Basesti: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or Member | List alle mennesker for kirken |
| GET | `/:id` | JWT | People.View or own record | Hent en person efter ID (inkluderer formularindsendelser) |
| GET | `/ids?ids=` | JWT | People.View or Member | Hent flere mennesker efter komma-separerede ID'er |
| GET | `/basic?ids=` | JWT | — | Hent grundlæggende info (kun navn) for flere mennesker |
| GET | `/recent` | JWT | People.View or Member | Nyligt tilføjede mennesker |
| GET | `/search?term=&email=` | JWT | People.View or Member | Søg mennesker efter navn eller e-mail |
| GET | `/search/phone?number=` | JWT | People.View or Member | Søg efter telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View or Member | Hent mennesker i en bestemt gruppe |
| GET | `/household/:householdId` | JWT | — | Hent alle mennesker i en husstand |
| GET | `/attendance` | JWT | People.Edit | Indlæs deltagerere med filtre (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Indlæs tidslinjedata for mennesker og grupper |
| GET | `/directory/:id` | JWT | — | Hent person for mappevisning (respekterer synlighedsindstillinger) |
| GET | `/claim/:churchId` | JWT | — | Gør krav på en personpost for den aktuelle bruger på en kirke |
| POST | `/` | JWT | People.Edit or EditSelf | Opret eller opdater mennesker (batch) |
| POST | `/search` | JWT | People.View or Member | Søg mennesker (POST-variant) |
| POST | `/advancedSearch` | JWT | People.View or Member | Multi-betingelses søgning (alder, fødselsmåned, medlemskabsstatus osv.) |
| POST | `/loadOrCreate` | Public | — | Find eller opret en person efter e-mail. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Opdater tildeling af hustandsmedlemmer |
| POST | `/public/email` | Public | — | Send en e-mail til en person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Indlæs person-e-mails efter ID'er (server-til-server, kræver jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Slet en person |

### Eksempel: Søg mennesker

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

### Eksempel: Opret en person

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Brugere

Basesti: `/membership/users`

Se [Godkendelse og tilladelser](./authentication) for login-, registrerings- og adgangskodeenheder.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Log ind (e-mail/adgangskode, JWT-opdatering eller authGuid) |
| POST | `/register` | Public | — | Registrer en ny bruger |
| POST | `/forgot` | Public | — | Send e-mail til nulstilling af adgangskode |
| POST | `/setPasswordGuid` | Public | — | Angiv adgangskode ved hjælp af auth-GUID fra e-mail-link |
| POST | `/verifyCredentials` | Public | — | Bekræft e-mail/adgangskode og returner tilknyttede kirker |
| POST | `/loadOrCreate` | JWT | — | Find eller opret en bruger efter e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Opdater brugerens for- og efternavn |
| POST | `/updateEmail` | JWT | — | Skift brugerens e-mailadresse |
| POST | `/updatePassword` | JWT | — | Skift brugerens adgangskode (min 6 tegn) |
| POST | `/updateOptedOut` | JWT | — | Indstil en persons opt-out-status |
| GET | `/search?term=` | JWT | Server.Admin | Søg alle brugere efter navn/e-mail |
| DELETE | `/` | JWT | — | Slet den aktuelle brugerkonto |

## Kirker

Basesti: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Indlæs alle kirker for den aktuelle bruger |
| GET | `/:id` | JWT | — | Hent kirke efter ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Hent domæneadministratoren for en kirke |
| GET | `/:id/impersonate` | JWT | Server.Admin | Impersoner en kirke (kun serveradmin) |
| GET | `/all?term=` | JWT | Server.Admin | Søg alle kirker (admin) |
| GET | `/search/?name=` | Public | — | Søg kirker efter navn |
| GET | `/lookup/?subDomain=&id=` | Public | — | Slå en kirke op efter underdomæne eller ID |
| POST | `/` | JWT | Settings.Edit | Opdater kirkedetaljer |
| POST | `/add` | JWT | — | Registrer en ny kirke. Påkrævede felter: navn, adresse1, by, stat, postnummer, land |
| POST | `/search` | Public | — | Søg kirker efter navn (POST-variant) |
| POST | `/select` | JWT | — | Vælg/skift til en kirke. Body: `{ churchId }` eller `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkivér eller fjern arkiv fra en kirke |
| POST | `/byIds` | Public | — | Indlæs flere kirker efter ID'er |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Slet kirker opgivet i 7+ dage |

## Grupper

Basesti: `/membership/groups`

Udvider standard CRUD (GET `/`, GET `/:id` fra basisklasse).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle grupper |
| GET | `/:id` | JWT | — | Hent gruppe efter ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Søg grupper efter servicefiltere |
| GET | `/my` | JWT | — | Hent grupper for den aktuelle bruger |
| GET | `/my/:tag` | JWT | — | Hent nuværende brugers grupper filtreret efter tag |
| GET | `/tag/:tag` | JWT | — | Hent alle grupper med et bestemt tag |
| GET | `/public/:churchId/:id` | Public | — | Hent en offentlig gruppe efter kirke og ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Hent offentlige grupper efter tag |
| GET | `/public/:churchId/label?label=` | Public | — | Hent offentlige grupper efter etiket |
| GET | `/public/:churchId/slug/:slug` | Public | — | Hent en offentlig gruppe efter slug |
| POST | `/` | JWT | Groups.Edit | Opret eller opdater grupper (auto-genererer slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Slet en gruppe (sletter også underordnede teams for ministergrupper) |

## Gruppemedlemmer

Basesti: `/membership/groupmembers`

Udvider standard CRUD (GET `/:id`, DELETE `/:id` fra basisklasse).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Hent gruppemedlem efter ID |
| GET | `/` | JWT | GroupMembers.View* | List gruppemedlemmer. Filtrer efter `?groupId=`, `?groupIds=` eller `?personId=`. *Tilladt også hvis bruger er i gruppen eller spørger efter eget personId |
| GET | `/my` | JWT | — | Hent nuværende brugers gruppetilhørsforhold |
| GET | `/basic/:groupId` | JWT | — | Hent basisk medlemsliste for en gruppe |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Hent gruppeleders (offentlig) |
| POST | `/` | JWT | GroupMembers.Edit | Tilføj eller opdater gruppemedlemmer |
| DELETE | `/:id` | JWT | GroupMembers.View | Fjern et gruppemedlem |

## Husstande

Basesti: `/membership/households`

Standard CRUD-controller.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle husstande |
| GET | `/:id` | JWT | — | Hent husstand efter ID |
| POST | `/` | JWT | People.Edit | Opret eller opdater husstande |
| DELETE | `/:id` | JWT | People.Edit | Slet en husstand |

## Roller

Basesti: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Hent rolle efter ID |
| GET | `/church/:churchId` | JWT | Roles.View | Hent alle roller for en kirke |
| POST | `/` | JWT | Roles.Edit | Opret eller opdater roller |
| DELETE | `/:id` | JWT | Roles.Edit | Slet en rolle (fjerner også dens tilladelser og medlemmer) |

## Rollemedlemmer

Basesti: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent medlemmer for en rolle. Tilføj `?include=users` for at medtage brugerdetaljer |
| POST | `/` | JWT | Roles.Edit | Tilføj medlemmer til en rolle (opretter bruger, hvis e-mail ikke eksisterer) |
| DELETE | `/:id` | JWT | Roles.View | Fjern et rollemedlem |
| DELETE | `/self/:churchId/:userId` | JWT | — | Fjern dig selv fra en kirke |

## Rolletilladelser

Basesti: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hent tilladelser for en rolle (brug `null` som ID for "Alle"-rolle) |
| POST | `/` | JWT | Roles.Edit | Opret eller opdater rolletilladelser |
| DELETE | `/:id` | JWT | Roles.Edit | Slet en rolletilladelse |

## Tilladelser

Basesti: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent den fulde liste over tilgængelige tilladelser |

## Formularer

Basesti: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | List alle formularer (admin ser alt; editorer ser tildelte + ikke-medlemsformularer) |
| GET | `/:id` | JWT | Form access | Hent en formular efter ID |
| GET | `/archived` | JWT | Forms.Admin or Forms.Edit | List arkiverede formularer |
| GET | `/standalone/:id?churchId=` | JWT | — | Hent en selvstændig formular (begrænsede formularer kræver godkendelse) |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | Opret eller opdater formularer |
| DELETE | `/:id` | JWT | Form access | Slet en formular |

## Formularindsendelser

Basesti: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | List indsendelser. Filtrer efter `?personId=` eller `?formId=` |
| GET | `/:id` | JWT | Forms.Admin or Forms.Edit | Hent indsendelse efter ID. Tilføj `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Form access | Hent alle indsendelser for en formular (inkluderer formular, spørgsmål, svar) |
| POST | `/` | JWT | — | Indsend formularesvar (håndterer begrænsede/ubegrænsede formularer, sender e-mail-meddelelser) |
| DELETE | `/:id` | JWT | Forms.Admin or Forms.Edit | Slet en indsendelse og dens svar |

## Spørgsmål

Basesti: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | List spørgsmål for en formular. Kræver `?formId=` |
| GET | `/:id` | JWT | Form access | Hent et spørgsmål efter ID |
| GET | `/unrestricted?formId=` | JWT | — | Hent spørgsmål for en ubegrænset formular |
| GET | `/sort/:id/up` | JWT | — | Flyt et spørgsmål op i sorteringsrækkefølge |
| GET | `/sort/:id/down` | JWT | — | Flyt et spørgsmål ned i sorteringsrækkefølge |
| POST | `/` | JWT | Form access | Opret eller opdater spørgsmål (auto-tildeler sorteringsrækkefølge) |
| DELETE | `/:id?formId=` | JWT | Form access | Slet et spørgsmål |

## Svar

Basesti: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | List svar. Filtrer efter `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | Opret eller opdater svar |

## Medlemstilladelser

Basesti: `/membership/memberpermissions`

Kontrollerer adgang per medlem til specifikke formularer.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | Hent en medlemstilladelse efter ID |
| GET | `/member/:id` | JWT | Form access | Hent alle formulartilladelser for et medlem |
| GET | `/form/:id` | JWT | Form access | Hent alle medlemstilladelser for en formular |
| GET | `/form/:id/my` | JWT | Form access | Hent nuværende brugers tilladelse for en formular |
| POST | `/` | JWT | Form access | Opret eller opdater medlemstilladelser |
| DELETE | `/:id?formId=` | JWT | Form access | Slet en medlemstilladelse |
| DELETE | `/member/:id?formId=` | JWT | Form access | Slet alle tilladelser for et medlem på en formular |

## Indstillinger

Basesti: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Hent alle indstillinger for kirken |
| GET | `/public/:churchId` | Public | — | Hent offentlige indstillinger for en kirke |
| POST | `/` | JWT | Settings.Edit | Gem indstillinger (understøtter base64-billedupload) |

## Domæner

Basesti: `/membership/domains`

Udvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklasse).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle domæner |
| GET | `/:id` | JWT | — | Hent domæne efter ID |
| GET | `/lookup/:domainName` | JWT | — | Slå et domæne op efter navn |
| GET | `/public/lookup/:domainName` | Public | — | Offentlig domæneopslag efter navn |
| GET | `/health/check` | Public | — | Kør sundhedstjek på umarkerede domæner |
| POST | `/` | JWT | Settings.Edit | Opret eller opdater domæner (udløser Caddy-opdatering) |
| DELETE | `/:id` | JWT | Settings.Edit | Slet et domæne |

## Brugerkirke

Basesti: `/membership/userchurch`

Administrerer forbindelsen mellem brugere og kirker.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Hent brugerkirke-post efter bruger-ID |
| GET | `/personid/:personId` | JWT | — | Hent e-mail for en persons tilknyttede bruger |
| GET | `/user/:userId` | JWT | Server.Admin | Indlæs alle kirker for en bruger |
| POST | `/` | JWT | — | Opret en brugerkirke-tilknytning |
| PATCH | `/:userId` | JWT | — | Opdater sidste adgangstid og log adgang |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Slet en brugerkirke-post |

## Synlighedsindstillinger

Basesti: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent nuværende brugers synlighedsindstillinger |
| POST | `/` | JWT | — | Gem synlighedsindstillinger (adresse-, telefon- og e-mail-synlighed) |

## Forespørgsel

Basesti: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Naturligt sprogmedlemsøgning ved hjælp af AI. Body: `{ text, subDomain, siteUrl }` |

## Klientfejl

Basesti: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Log en klientside-fejl |

## Relaterede sider

- [Godkendelse og tilladelser](./authentication) — Login flow, JWT, OAuth, tilladelsesmodel
- [Deltagelsesendpoints](./attendance) — Service- og besøgssporing
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
