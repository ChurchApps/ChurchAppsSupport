---
title: "Membership Endpoints"
---

# Membership Endpoints

<div class="article-intro">

De Membership module beheert personen, kerken, groepen, huishoudens, rollen, machtigingen, formulieren en instellingen. Het is de grootste module en biedt de kernidentiteits- en autorisatielaag voor alle andere modules.

</div>

**Base path:** `/membership`

## Personen

Base path: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View of Lid | Alle personen voor de kerk weergeven |
| GET | `/:id` | JWT | People.View of eigen record | Een persoon op ID ophalen (inclusief formulierinzendingen) |
| GET | `/ids?ids=` | JWT | People.View of Lid | Meerdere personen op kommagescheiden ID's ophalen |
| GET | `/basic?ids=` | JWT | — | Basisinformatie (naam alleen) voor meerdere personen ophalen |
| GET | `/recent` | JWT | People.View of Lid | Onlangs toegevoegde personen |
| GET | `/search?term=&email=` | JWT | People.View of Lid | Personen op naam of e-mail zoeken |
| GET | `/search/phone?number=` | JWT | People.View of Lid | Op telefoonnummer zoeken |
| GET | `/search/group?groupId=` | JWT | People.View of Lid | Personen in een specifieke groep ophalen |
| GET | `/household/:householdId` | JWT | — | Alle personen in een huishouden ophalen |
| GET | `/attendance` | JWT | People.Edit | Deelnemers laden met filters (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Timelinegegevens voor personen en groepen laden |
| GET | `/directory/:id` | JWT | — | Persoon voor directoryweergave ophalen (respecteert zichtbaarheidsvoorkeuren) |
| GET | `/claim/:churchId` | JWT | — | Een persoonrecord voor de huidige gebruiker claimen in een kerk |
| POST | `/` | JWT | People.Edit of EditSelf | Personen maken of bijwerken (batch) |
| POST | `/search` | JWT | People.View of Lid | Personen zoeken (POST-variant) |
| POST | `/advancedSearch` | JWT | People.View of Lid | Zoekopdracht met meerdere voorwaarden (leeftijd, geboortemaand, lidmaatschapsstatus, enz.) |
| POST | `/loadOrCreate` | Public | — | Een persoon op e-mail zoeken of aanmaken. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Huishoudenlidtoewijzingen bijwerken |
| POST | `/public/email` | Public | — | Een e-mail naar een persoon verzenden. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Persone-mails op ID's laden (server-naar-server, vereist jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Een persoon verwijderen |

### Voorbeeld: Personen Zoeken

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

### Voorbeeld: Een Persoon Aanmaken

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Gebruikers

Base path: `/membership/users`

Zie [Authentication & Permissions](./authentication) voor login-, registratie- en wachtwoord-beheerendpunten.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Inloggen (e-mail/wachtwoord, JWT-vernieuming, of authGuid) |
| POST | `/register` | Public | — | Een nieuwe gebruiker registreren |
| POST | `/forgot` | Public | — | Wachtwoordresetstuurmail verzenden |
| POST | `/setPasswordGuid` | Public | — | Wachtwoord instellen met auth GUID uit e-maillink |
| POST | `/verifyCredentials` | Public | — | E-mail/wachtwoord verifiëren en bijbehorende kerken retourneren |
| POST | `/loadOrCreate` | JWT | — | Een gebruiker op e-mail/userId zoeken of aanmaken |
| POST | `/setDisplayName` | JWT | — | Voornaam en achternaam van gebruiker bijwerken |
| POST | `/updateEmail` | JWT | — | E-mailadres van gebruiker wijzigen |
| POST | `/updatePassword` | JWT | — | Wachtwoord van gebruiker wijzigen (min. 6 tekens) |
| POST | `/updateOptedOut` | JWT | — | Opt-out-status van een persoon instellen |
| GET | `/search?term=` | JWT | Server.Admin | Alle gebruikers op naam/e-mail zoeken |
| DELETE | `/` | JWT | — | Huidige gebruikersaccount verwijderen |

## Kerken

Base path: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle kerken voor de huidige gebruiker laden |
| GET | `/:id` | JWT | — | Kerk op ID ophalen |
| GET | `/:id/getDomainAdmin` | JWT | — | Domeinbeheerder voor een kerk ophalen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Een kerk zich voordoen (alleen serverbeheerder) |
| GET | `/all?term=` | JWT | Server.Admin | Alle kerken zoeken (beheerder) |
| GET | `/search/?name=` | Public | — | Kerken op naam zoeken |
| GET | `/lookup/?subDomain=&id=` | Public | — | Een kerk op subdomein of ID opzoeken |
| POST | `/` | JWT | Settings.Edit | Kerkdetails bijwerken |
| POST | `/add` | JWT | — | Een nieuwe kerk registreren. Verplichte velden: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Kerken op naam zoeken (POST-variant) |
| POST | `/select` | JWT | — | Naar een kerk gaan/overschakelen. Body: `{ churchId }` of `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Een kerk archiveren of uit archief halen |
| POST | `/byIds` | Public | — | Meerdere kerken op ID's laden |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Kerken die 7+ dagen verlaten zijn, verwijderen |

## Groepen

Base path: `/membership/groups`

Breidt standaard CRUD uit (GET `/`, GET `/:id` van basisklasse).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle groepen weergeven |
| GET | `/:id` | JWT | — | Groep op ID ophalen |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Groepen op servicefilters zoeken |
| GET | `/my` | JWT | — | Groepen voor de huidige gebruiker ophalen |
| GET | `/my/:tag` | JWT | — | Groepen van huidige gebruiker gefilterd op tag |
| GET | `/tag/:tag` | JWT | — | Alle groepen met een specifieke tag ophalen |
| GET | `/public/:churchId/:id` | Public | — | Een openbare groep op kerk en ID ophalen |
| GET | `/public/:churchId/tag/:tag` | Public | — | Openbare groepen op tag ophalen |
| GET | `/public/:churchId/label?label=` | Public | — | Openbare groepen op label ophalen |
| GET | `/public/:churchId/slug/:slug` | Public | — | Een openbare groep op slug ophalen |
| POST | `/` | JWT | Groups.Edit | Groepen maken of bijwerken (genereert automatisch slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Een groep verwijderen (verwijdert ook onderliggende teams voor ministerie-groepen) |

## Groepsleden

Base path: `/membership/groupmembers`

Breidt standaard CRUD uit (GET `/:id`, DELETE `/:id` van basisklasse).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Groepslid op ID ophalen |
| GET | `/` | JWT | GroupMembers.View* | Groepsleden weergeven. Filteren op `?groupId=`, `?groupIds=`, of `?personId=`. *Ook toegestaan als gebruiker in de groep is of eigen personId opvraagt |
| GET | `/my` | JWT | — | Groepslidmaatschappen van huidige gebruiker ophalen |
| GET | `/basic/:groupId` | JWT | — | Basisledenlijst voor een groep ophalen |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Groepsleiders ophalen (openbaar) |
| POST | `/` | JWT | GroupMembers.Edit | Groepsleden toevoegen of bijwerken |
| DELETE | `/:id` | JWT | GroupMembers.View | Een groepslid verwijderen |

## Huishoudens

Base path: `/membership/households`

Standaard CRUD-controller.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle huishoudens weergeven |
| GET | `/:id` | JWT | — | Huishouden op ID ophalen |
| POST | `/` | JWT | People.Edit | Huishoudens maken of bijwerken |
| DELETE | `/:id` | JWT | People.Edit | Een huishouden verwijderen |

## Rollen

Base path: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Rol op ID ophalen |
| GET | `/church/:churchId` | JWT | Roles.View | Alle rollen voor een kerk ophalen |
| POST | `/` | JWT | Roles.Edit | Rollen maken of bijwerken |
| DELETE | `/:id` | JWT | Roles.Edit | Een rol verwijderen (verwijdert ook bijbehorende machtigingen en leden) |

## Rolleden

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Leden voor een rol ophalen. Voeg `?include=users` toe voor gebruikersdetails |
| POST | `/` | JWT | Roles.Edit | Leden aan een rol toevoegen (maakt gebruiker aan als e-mail niet bestaat) |
| DELETE | `/:id` | JWT | Roles.View | Een rollid verwijderen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Jezelf van een kerk verwijderen |

## Rolmachtigingen

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Machtigingen voor een rol ophalen (gebruik `null` als ID voor "Iedereen"-rol) |
| POST | `/` | JWT | Roles.Edit | Rolmachtigingen maken of bijwerken |
| DELETE | `/:id` | JWT | Roles.Edit | Een rolmachtiging verwijderen |

## Machtigingen

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | De volledige lijst beschikbare machtigingen ophalen |

## Formulieren

Base path: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin of Forms.Edit | Alle formulieren weergeven (beheerder ziet alles; editors zien toegewezen + niet-leden-formulieren) |
| GET | `/:id` | JWT | Formulieertoegang | Een formulier op ID ophalen |
| GET | `/archived` | JWT | Forms.Admin of Forms.Edit | Gearchiveerde formulieren weergeven |
| GET | `/standalone/:id?churchId=` | JWT | — | Een standalone-formulier ophalen (beperkte formulieren vereisen verificatie) |
| POST | `/` | JWT | Forms.Admin of Forms.Edit | Formulieren maken of bijwerken |
| DELETE | `/:id` | JWT | Formulieertoegang | Een formulier verwijderen |

## Formulierinzendingen

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin of Forms.Edit | Inzendingen weergeven. Filteren op `?personId=` of `?formId=` |
| GET | `/:id` | JWT | Forms.Admin of Forms.Edit | Inzending op ID ophalen. Voeg `?include=form,questions,answers` toe |
| GET | `/formId/:formId` | JWT | Formulieertoegang | Alle inzendingen voor een formulier ophalen (inclusief formulier, vragen, antwoorden) |
| POST | `/` | JWT | — | Formulierantwoorden indienen (verwerkt beperkte/onbeperkte formulieren, verzendt e-mailmeldingen) |
| DELETE | `/:id` | JWT | Forms.Admin of Forms.Edit | Een inzending en antwoorden ervan verwijderen |

## Vragen

Base path: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formulieertoegang | Vragen voor een formulier weergeven. Vereist `?formId=` |
| GET | `/:id` | JWT | Formulieertoegang | Een vraag op ID ophalen |
| GET | `/unrestricted?formId=` | JWT | — | Vragen voor een onbeperkt formulier ophalen |
| GET | `/sort/:id/up` | JWT | — | Een vraag in sorteervolgorde omhoog verplaatsen |
| GET | `/sort/:id/down` | JWT | — | Een vraag in sorteervolgorde omlaag verplaatsen |
| POST | `/` | JWT | Formulieertoegang | Vragen maken of bijwerken (wijst automatisch sorteervolgorde toe) |
| DELETE | `/:id?formId=` | JWT | Formulieertoegang | Een vraag verwijderen |

## Antwoorden

Base path: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin of Forms.Edit | Antwoorden weergeven. Filteren op `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin of Forms.Edit | Antwoorden maken of bijwerken |

## Lidmachtigingen

Base path: `/membership/memberpermissions`

Bepaalt toegang per lid tot specifieke formulieren.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formulieertoegang | Een lidmachtiging op ID ophalen |
| GET | `/member/:id` | JWT | Formulieertoegang | Alle formuliermachtigingen voor een lid ophalen |
| GET | `/form/:id` | JWT | Formulieertoegang | Alle lidmachtigingen voor een formulier ophalen |
| GET | `/form/:id/my` | JWT | Formulieertoegang | Eigen machtigung voor een formulier ophalen |
| POST | `/` | JWT | Formulieertoegang | Lidmachtigingen maken of bijwerken |
| DELETE | `/:id?formId=` | JWT | Formulieertoegang | Een lidmachtiging verwijderen |
| DELETE | `/member/:id?formId=` | JWT | Formulieertoegang | Alle machtiningingen voor een lid op een formulier verwijderen |

## Instellingen

Base path: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Alle instellingen voor de kerk ophalen |
| GET | `/public/:churchId` | Public | — | Openbare instellingen voor een kerk ophalen |
| POST | `/` | JWT | Settings.Edit | Instellingen opslaan (ondersteunt base64-afbeeldingsupload) |

## Domeinen

Base path: `/membership/domains`

Breidt standaard CRUD uit (GET `/:id`, GET `/`, DELETE `/:id` van basisklasse).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle domeinen weergeven |
| GET | `/:id` | JWT | — | Domein op ID ophalen |
| GET | `/lookup/:domainName` | JWT | — | Een domein op naam opzoeken |
| GET | `/public/lookup/:domainName` | Public | — | Openbare domeinizipopeking op naam |
| GET | `/health/check` | Public | — | Gezondheidscheck op ongecontroleerde domeinen uitvoeren |
| POST | `/` | JWT | Settings.Edit | Domeinen maken of bijwerken (triggert Caddy-update) |
| DELETE | `/:id` | JWT | Settings.Edit | Een domein verwijderen |

## Gebruikerskerk

Base path: `/membership/userchurch`

Beheert de associatie tussen gebruikers en kerken.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Gebruiker-kerkrecord op gebruikers-ID ophalen |
| GET | `/personid/:personId` | JWT | — | E-mail voor gekoppelde gebruiker van een persoon ophalen |
| GET | `/user/:userId` | JWT | Server.Admin | Alle kerken voor een gebruiker laden |
| POST | `/` | JWT | — | Een gebruiker-kerkassociatie maken |
| PATCH | `/:userId` | JWT | — | Laatst geopende tijd bijwerken en toegang registreren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Een gebruiker-kerkrecord verwijderen |

## Zichtbaarheidsvoorkeuren

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Zichtbaarheidsvoorkeuren van huidige gebruiker ophalen |
| POST | `/` | JWT | — | Zichtbaarheidsvoorkeuren opslaan (adres-, telefoon-, e-mailzichtbaarheid) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Zoeken naar leden in natuurlijke taal met AI. Body: `{ text, subDomain, siteUrl }` |

## Clientfouten

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Een client-side-fout registreren |

## Gerelateerde Pagina's

- [Authentication & Permissions](./authentication) — Loginflow, JWT, OAuth, machtigingsmodel
- [Attendance Endpoints](./attendance) — Service- en bezoektracking
- [Module Structure](../module-structure) — Codeorganisatiepatronen
