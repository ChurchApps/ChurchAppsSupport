---
title: "Ledenschapseindpunten"
---

# Ledenschapseindpunten

<div class="article-intro">

De module Leden beheert personen, kerken, groepen, huishoudens, rollen, rechten, formulieren en instellingen. Het is de grootste module en vormt de kern van identiteit en autorisatie voor alle andere modules.

</div>

**Basispad:** `/membership`

## Personen

Basispad: `/membership/people`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View of Member | Alle personen van de kerk weergeven |
| GET | `/:id` | JWT | People.View of eigen record | Een persoon op ID ophalen (inclusief formulierinzendingen) |
| GET | `/ids?ids=` | JWT | People.View, Member of People.ViewNames | Meerdere personen ophalen op basis van door komma's gescheiden ID's. Aanroepers met alleen People.ViewNames (zonder People.View) krijgen het basismodel, waarbij personen die zich hebben afgemeld worden weggelaten (behalve de aanroeper zelf) |
| GET | `/basic?ids=` | JWT | — | Basisgegevens (alleen naam) ophalen voor meerdere personen |
| GET | `/names?ids=` | JWT | Elk kerkrecht | `[{ id, name: { display, first, last }, photo }]`, gesorteerd op achternaam en daarna voornaam, voor door komma's gescheiden ID's waarop de aanroeper al toegang heeft. Zo kunnen rollen zonder People.View (zoals donaties en aanwezigheid) personen een naam geven. Geen zoekfunctie en geen filter op de ledenlijst |
| POST | `/names` | JWT | Elk kerkrecht | Hetzelfde als `GET /names`. Body: `{ peopleIds }` (of `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member of People.ViewNames | Recent toegevoegde personen. Aanroepers met alleen People.ViewNames (ook leden met toegang tot de ledenlijst) krijgen het basismodel (`id`, `name.display`, `photo`, `membershipStatus`), waarbij personen die zich hebben afgemeld worden weggelaten |
| GET | `/guest-register/options?churchId=` | Openbaar | — | Controlelijst voor gastregistratie via QR-code: geeft `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }` terug, elk met de waarde `"off"`, `"optional"` of `"required"` (afgeleid van de openbare instelling `guestRegistrationFields`; ontbrekende of ongeldige waarden vallen terug op e-mail en telefoon als optioneel, en de rest als uit). Vereist `enableQRGuestRegistration`, tenzij het verzoek een overeenkomend site- of kerktoken bevat. Snelheidslimiet van toepassing (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member of People.ViewNames | Personen zoeken op naam of e-mail (maximaal 100, gesorteerd op achternaam en daarna voornaam). Aanroepers met alleen People.ViewNames (ook leden met toegang tot de ledenlijst) krijgen een naamzoekopdracht die het basismodel teruggeeft; een zoekopdracht op `email` geeft `[]` terug |
| GET | `/search/phone?number=` | JWT | People.View of Member | Zoeken op telefoonnummer |
| GET | `/search/group?groupId=` | JWT | People.View of Member | Personen in een specifieke groep ophalen |
| GET | `/household/:householdId` | JWT | — | Alle personen in een huishouden ophalen |
| GET | `/attendance` | JWT | People.Edit | Deelnemers laden met filters (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Tijdlijngegevens laden voor personen en groepen |
| GET | `/directory/:id` | JWT | — | Persoon ophalen voor de ledenlijstweergave (houdt rekening met zichtbaarheidsvoorkeuren) |
| GET | `/claim/:churchId` | JWT | — | Een persoonsrecord voor de huidige gebruiker claimen bij een kerk |
| POST | `/` | JWT | People.Edit of EditSelf | Personen aanmaken of bijwerken (in batch) |
| POST | `/search` | JWT | People.View, Member of People.ViewNames | Personen zoeken (POST-variant). Body: `{ term }` of `{ email }`; dezelfde regels voor alleen namen als bij `GET /search` |
| POST | `/advancedSearch` | JWT | People.View of Member | Zoeken met meerdere voorwaarden (leeftijd, birthMonth, membershipStatus, enz.). De body is een array van voorwaarden; een lege body betekent geen voorwaarden, en elke andere body die geen array is, geeft 400 terug |
| POST | `/loadOrCreate` | Openbaar | — | Een persoon zoeken op e-mail of aanmaken. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Openbaar | — | Gastregistratie via QR-code. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1 tot 10 leden; email, phone en maritalStatus gelden alleen voor het eerste lid). Velden die de kerk heeft uitgeschakeld, worden genegeerd; ontbrekende verplichte of ongeldige waarden geven 400 terug. Eerst worden bestaande personen hergebruikt: een lid komt overeen wanneer precies één niet-verwijderde persoon dezelfde voornaam heeft (hoofdletterongevoelig) en hetzelfde e-mailadres of hetzelfde telefoonnummer (thuis, werk of mobiel). Een lid zonder e-mail of telefoon komt overeen op voornaam binnen het gevonden huishouden. Gevonden personen worden nooit gewijzigd. Niet-gevonden leden worden toegevoegd aan het gevonden huishouden, of anders aan een nieuw huishouden (genoemd naar de achternaam van het eerste lid), met `membershipStatus: "Visitor"` en het gedeelde `address`. `comments` wordt opgeslagen als notitie bij het eerste lid. Iedereen wordt toegevoegd aan de privégroep `guestRegistrationGroupId`, als die is ingesteld. Als `guestRegistrationRecordAttendance` gelijk is aan `"true"`, wordt aanwezigheid geregistreerd voor de geplande dienstijden van die groep waarvan het inchecktijdvenster nu open is. Geeft `{ householdId, people: [{ id, name }] }` terug, met de ingediende namen in plaats van de opgeslagen namen. Dezelfde opt-in- en tokenregels en snelheidslimieten gelden als voor de opties-aanroep |
| POST | `/household/:householdId` | JWT | People.Edit | Huishoudelijke leden toewijzingen bijwerken |
| POST | `/public/email` | Openbaar | — | Een e-mail naar een persoon sturen. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | E-mailadressen van personen laden op basis van ID's (server-naar-serververkeer, vereist jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Een persoon verwijderen |

### Voorbeeld: personen zoeken

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

### Voorbeeld: een persoon aanmaken

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Gebruikers

Basispad: `/membership/users`

Zie [Authenticatie en rechten](./authentication) voor eindpunten voor inloggen, registratie en wachtwoordbeheer.

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| POST | `/login` | Openbaar | — | Inloggen (e-mail/wachtwoord, JWT-vernieuwing of authGuid) |
| POST | `/register` | Openbaar | — | Een nieuwe gebruiker registreren |
| POST | `/forgot` | Openbaar | — | E-mail voor wachtwoordherstel versturen |
| POST | `/setPasswordGuid` | Openbaar | — | Wachtwoord instellen met de auth-GUID uit de e-mailkoppeling |
| POST | `/verifyCredentials` | Openbaar | — | E-mail en wachtwoord verifiëren en de bijbehorende kerken teruggeven |
| POST | `/loadOrCreate` | JWT | — | Een gebruiker zoeken op e-mail/userId of aanmaken |
| POST | `/setDisplayName` | JWT | — | De voor- en achternaam van de gebruiker bijwerken |
| POST | `/updateEmail` | JWT | — | Het e-mailadres van de gebruiker wijzigen |
| POST | `/updatePassword` | JWT | — | Het wachtwoord van de gebruiker wijzigen (minimaal 6 tekens) |
| POST | `/updateOptedOut` | JWT | — | De afmeldstatus van een persoon instellen |
| POST | `/sendInviteEmail` | JWT | People.Edit | Een uitnodiging per e-mail sturen naar een persoon in deze kerk (`email`, `personName`, `contextName`). De knop toont **Registreren** voor iemand zonder account en **Inloggen** voor een bestaande gebruiker. Een gebruiker die nog nooit is ingelogd, krijgt in plaats daarvan een link **Stel je wachtwoord in** die na 7 dagen verloopt. Dit is een vaste sjabloon en telt daarom niet mee voor de dagelijkse e-maillimiet van de kerk |
| GET | `/search?term=` | JWT | Server.Admin | Alle gebruikers zoeken op naam of e-mail |
| DELETE | `/` | JWT | — | Het account van de huidige gebruiker verwijderen |

## Kerken

Basispad: `/membership/churches`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle kerken van de huidige gebruiker laden |
| GET | `/:id` | JWT | — | Kerk ophalen op ID |
| GET | `/:id/getDomainAdmin` | JWT | — | De domeinbeheerder van een kerk ophalen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Een kerk imiteren (alleen serverbeheerder) |
| GET | `/all?term=` | JWT | Server.Admin | Alle kerken doorzoeken (beheerder) |
| GET | `/search/?name=` | Openbaar | — | Kerken zoeken op naam |
| GET | `/lookup/?subDomain=&id=` | Openbaar | — | Een kerk opzoeken op subdomein of ID |
| POST | `/` | JWT | Settings.Edit | Kerkgegevens bijwerken |
| POST | `/add` | JWT | — | Een nieuwe kerk registreren. Verplichte velden: name, address1, city, state, zip, country |
| POST | `/search` | Openbaar | — | Kerken zoeken op naam (POST-variant) |
| POST | `/select` | JWT | — | Een kerk selecteren of wisselen. Body: `{ churchId }` of `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Een kerk archiveren of het archief opheffen |
| POST | `/byIds` | Openbaar | — | Meerdere kerken laden op basis van ID's |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Kerken verwijderen die 7 dagen of langer inactief zijn |

## Groepen

Basispad: `/membership/groups`

Breidt de standaard CRUD uit (GET `/`, GET `/:id` uit de basisklasse).

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle groepen weergeven |
| GET | `/:id` | JWT | — | Groep ophalen op ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Groepen zoeken op basis van dienstfilters |
| GET | `/my` | JWT | — | Groepen voor de huidige gebruiker ophalen |
| GET | `/my/:tag` | JWT | — | Groepen van de huidige gebruiker ophalen, gefilterd op tag |
| GET | `/tag/:tag` | JWT | — | Alle groepen met een specifieke tag ophalen |
| GET | `/public/:churchId/:id` | Openbaar | — | Een openbare groep ophalen op kerk en ID |
| GET | `/public/:churchId/tag/:tag` | Openbaar | — | Openbare groepen ophalen op tag |
| GET | `/public/:churchId/label?label=` | Openbaar | — | Openbare groepen ophalen op label |
| GET | `/public/:churchId/slug/:slug` | Openbaar | — | Een openbare groep ophalen op slug |
| POST | `/` | JWT | Groups.Edit | Groepen aanmaken of bijwerken (genereert automatisch een slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Een groep verwijderen (verwijdert bij bedieningsgroepen ook de onderliggende teams) |

## Groepsleden

Basispad: `/membership/groupmembers`

Breidt de standaard CRUD uit (GET `/:id`, DELETE `/:id` uit de basisklasse).

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Groepslid ophalen op ID |
| GET | `/` | JWT | GroupMembers.View* | Groepsleden weergeven. Filteren met `?groupId=`, `?groupIds=` of `?personId=`. *Ook toegestaan als de gebruiker lid is van de groep of het eigen personId opvraagt, en voor `?groupId=` van elke niet-vertrouwelijke groep wanneer de gebruiker Attendance.View of Attendance.Edit heeft (leden jonger dan 13 jaar worden dan meegenomen) |
| GET | `/my` | JWT | — | Groepslidmaatschappen van de huidige gebruiker ophalen |
| GET | `/basic/:groupId` | JWT | — | Eenvoudige ledenlijst van een groep ophalen |
| GET | `/public/leaders/:churchId/:groupId` | Openbaar | — | Groepsleiders ophalen (openbaar) |
| GET | `/public/:churchId/:groupId` | Openbaar | — | De openbare ledenlijst van een groep ophalen (beperkte velden: `personId`, `displayName`, `leader`, foto). Alleen wanneer de groep meedoet via `publicRoster`; dit drijft het element `staffGrid` van de websitebouwer aan |
| POST | `/` | JWT | GroupMembers.Edit | Groepsleden toevoegen of bijwerken |
| DELETE | `/:id` | JWT | GroupMembers.View | Een groepslid verwijderen |

## Huishoudens

Basispad: `/membership/households`

Standaard CRUD-controller.

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle huishoudens weergeven |
| GET | `/:id` | JWT | — | Huishouden ophalen op ID |
| POST | `/` | JWT | People.Edit | Huishoudens aanmaken of bijwerken |
| DELETE | `/:id` | JWT | People.Edit | Een huishouden verwijderen |

## Rollen

Basispad: `/membership/roles`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Rol ophalen op ID |
| GET | `/church/:churchId` | JWT | Roles.View | Alle rollen van een kerk ophalen. Elke rol bevat `memberCount`, het aantal verschillende gebruikers in die rol |
| POST | `/` | JWT | Roles.Edit | Rollen aanmaken of bijwerken |
| DELETE | `/:id` | JWT | Roles.Edit | Een rol verwijderen (verwijdert ook de rechten en leden ervan) |

## Rolleden

Basispad: `/membership/rolemembers`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Leden van een rol ophalen. Voeg `?include=users` toe om gebruikersgegevens mee te nemen |
| POST | `/` | JWT | Roles.Edit | Leden aan een rol toevoegen (maakt een gebruiker aan als het e-mailadres nog niet bestaat) |
| DELETE | `/:id` | JWT | Roles.View | Een rollid verwijderen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Uzelf uit een kerk verwijderen |

## Rolrechten

Basispad: `/membership/rolepermissions`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Rechten van een rol ophalen (gebruik `null` als ID voor de rol "Everyone") |
| POST | `/` | JWT | Roles.Edit | Rolrechten aanmaken of bijwerken |
| DELETE | `/:id` | JWT | Roles.Edit | Een rolrecht verwijderen |

## Rechten

Basispad: `/membership/permissions`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | De volledige lijst met beschikbare rechten ophalen |

Elk item heeft `apiName`, `section` (inhoudstype), `action` en de labels `displaySection` / `displayAction` die de rolleneditor van B1Admin toont. Recente toevoegingen zijn `MembershipApi` / `People` / `View Names` (**Alleen namen van personen bekijken**, onder Personen en groepen) en `GivingApi` / `Donations` / `Enter` (**Donaties invoeren**, onder Donaties; zie [Donatiebatches](./giving.md#donation-batches)).

## Formulieren

Basispad: `/membership/forms`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin of Forms.Edit | Alle formulieren weergeven (beheerders zien alles; editors zien toegewezen formulieren en formulieren die niet voor leden zijn) |
| GET | `/:id` | JWT | Toegang tot formulier | Formulier ophalen op ID |
| GET | `/archived` | JWT | Forms.Admin of Forms.Edit | Gearchiveerde formulieren weergeven |
| GET | `/group/:groupId` | JWT | Groepslid, groepsleider of Forms.Admin | Zelfstandige formulieren die aan de groep zijn gekoppeld (`forms.groupId`), zonder gearchiveerde, gesorteerd op naam. Geeft `id`, `name`, `description` en `open` terug (binnen het beschikbaarheidsvenster). Leden krijgen alleen open formulieren; leiders en formulierbeheerders krijgen ook gesloten formulieren. Levert de gekoppelde formulieren op de groepspagina |
| GET | `/standalone/:id?churchId=` | JWT | — | Een zelfstandig formulier ophalen (beperkte formulieren vereisen authenticatie) |
| POST | `/` | JWT | Forms.Admin of Forms.Edit | Formulieren aanmaken of bijwerken. Zelfstandige formulieren accepteren een optionele `photoUrl` (koptekstafbeelding boven het formulier) en `groupId` (gekoppelde groep) |
| DELETE | `/:id` | JWT | Toegang tot formulier | Een formulier verwijderen |

## Formulierinzendingen

Basispad: `/membership/formsubmissions`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin of Forms.Edit | Inzendingen weergeven. Filteren met `?personId=` of `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Alleen eigen gegevens: maximaal 50 zelfstandige formulierinzendingen (geen persoonsformulieren) die het ingelogde lid heeft gedaan of die aan de eigen persoon zijn gekoppeld (`contentType` `person`, `contentId` = het eigen persoon-ID, bijvoorbeeld na een wijziging van de persoon door een beheerder), van nieuw naar oud, elk met `form.name`. Met `include` worden de vragen van elk formulier en de antwoorden van de inzending meegestuurd. Geeft `401` terug als de gebruiker niet aan een persoon is gekoppeld. Levert de sectie **Mijn formulieren** op de B1-pagina Ik |
| GET | `/group/:groupId` | JWT | Leider van de groep | Antwoorden voor de leiders van de groep: één item per gekoppeld formulier en per groepsevenement met een registratieformulier, elk met `form`, `event` (`id`, `title`, `start`; alleen bij evenementen), `questions` en `submissions` (met `answers` en `personName`, `null` bij anonieme inzendingen) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit of leesrecht | Inzending ophalen op ID. Voeg `?include=form,questions,answers` toe. Leiders van de aan het formulier gekoppelde groep, en leiders van de groep waartoe een evenementregistratie behoort, kunnen deze ook lezen |
| GET | `/formId/:formId` | JWT | Toegang tot formulier (lezen) | Alle inzendingen voor een formulier ophalen (inclusief formulier, vragen en antwoorden). Leiders van de aan het formulier gekoppelde groep hebben leesrecht |
| POST | `/` | JWT | — | Formulierantwoorden indienen (verwerkt beperkte en onbeperkte formulieren, verstuurt e-mailmeldingen). Wanneer het formulier `autoCreatePerson` heeft, wordt een gastpersoon op e-mail gezocht of aangemaakt en wordt de inzending daaraan gekoppeld; wanneer het formulier ook een `groupId` heeft, wordt die persoon aan de groep toegevoegd; wanneer `followUpSubject`/`followUpBody` zijn ingesteld, wordt een e-mail met een vaste sjabloon als vervolg naar de indiener gestuurd. Tenzij de aanroeper het formulier kan beheren, wordt `submittedBy` altijd ingesteld op de persoon van het ingelogde lid (of leeg gelaten bij anonieme inzendingen) |
| DELETE | `/:id` | JWT | Forms.Admin of Forms.Edit | Een inzending en de bijbehorende antwoorden verwijderen |

## Vragen

Basispad: `/membership/questions`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Toegang tot formulier | Vragen voor een formulier weergeven. Vereist `?formId=` |
| GET | `/:id` | JWT | Toegang tot formulier | Vraag ophalen op ID |
| GET | `/unrestricted?formId=` | JWT | — | Vragen voor een onbeperkt formulier ophalen |
| GET | `/sort/:id/up` | JWT | — | Een vraag omhoog verplaatsen in de sorteervolgorde |
| GET | `/sort/:id/down` | JWT | — | Een vraag omlaag verplaatsen in de sorteervolgorde |
| POST | `/` | JWT | Toegang tot formulier | Vragen aanmaken of bijwerken (wijst automatisch een sorteervolgorde toe) |
| DELETE | `/:id?formId=` | JWT | Toegang tot formulier | Een vraag verwijderen |

## Antwoorden

Basispad: `/membership/answers`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin of Forms.Edit | Antwoorden weergeven. Filteren met `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin of Forms.Edit | Antwoorden aanmaken of bijwerken |

## Ledenrechten

Basispad: `/membership/memberpermissions`

Bepaalt de toegang van leden tot specifieke formulieren.

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Toegang tot formulier | Een ledenrecht ophalen op ID |
| GET | `/member/:id` | JWT | Toegang tot formulier | Alle formulierrechten van een lid ophalen |
| GET | `/form/:id` | JWT | Toegang tot formulier | Alle ledenrechten voor een formulier ophalen |
| GET | `/form/:id/my` | JWT | Toegang tot formulier | Het recht van de huidige gebruiker voor een formulier ophalen |
| POST | `/` | JWT | Toegang tot formulier | Ledenrechten aanmaken of bijwerken |
| DELETE | `/:id?formId=` | JWT | Toegang tot formulier | Een ledenrecht verwijderen |
| DELETE | `/member/:id?formId=` | JWT | Toegang tot formulier | Alle rechten van een lid op een formulier verwijderen |

## Instellingen

Basispad: `/membership/settings`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Alle instellingen van de kerk ophalen |
| GET | `/public/:churchId` | Openbaar | — | Openbare instellingen van een kerk ophalen |
| POST | `/` | JWT | Settings.Edit | Instellingen opslaan (ondersteunt uploaden van afbeeldingen als base64) |

## Domeinen

Basispad: `/membership/domains`

Breidt de standaard CRUD uit (GET `/:id`, GET `/`, DELETE `/:id` uit de basisklasse).

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle domeinen weergeven |
| GET | `/:id` | JWT | — | Domein ophalen op ID |
| GET | `/lookup/:domainName` | JWT | — | Een domein opzoeken op naam |
| GET | `/public/lookup/:domainName` | Openbaar | — | Openbaar domein opzoeken op naam |
| GET | `/health/check` | Openbaar | — | Een gezondheidscontrole uitvoeren op niet-gecontroleerde domeinen |
| POST | `/` | JWT | Settings.Edit | Domeinen aanmaken of bijwerken (activeert een Caddy-update) |
| DELETE | `/:id` | JWT | Settings.Edit | Een domein verwijderen |

## Gebruiker-kerk

Basispad: `/membership/userchurch`

Beheert de koppeling tussen gebruikers en kerken.

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Gebruiker-kerkrecord ophalen op gebruikers-ID |
| GET | `/personid/:personId` | JWT | — | E-mailadres ophalen van de gekoppelde gebruiker van een persoon |
| GET | `/user/:userId` | JWT | Server.Admin | Alle kerken van een gebruiker laden |
| POST | `/` | JWT | — | Een koppeling tussen gebruiker en kerk aanmaken |
| PATCH | `/:userId` | JWT | — | Laatst geopende tijd bijwerken en de toegang registreren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Een gebruiker-kerkrecord verwijderen |

## Zichtbaarheidsvoorkeuren

Basispad: `/membership/visibilityPreferences`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Zichtbaarheidsvoorkeuren van de huidige gebruiker ophalen |
| POST | `/` | JWT | — | Zichtbaarheidsvoorkeuren opslaan (zichtbaarheid van adres, telefoon en e-mail) |

## Query

Basispad: `/membership/query`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Ledenzoekopdracht in natuurlijke taal met AI. Body: `{ text, subDomain, siteUrl }` |

## Clientfouten

Basispad: `/membership/clientErrors`

| Methode | Pad | Auth | Recht | Beschrijving |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Een fout aan de clientzijde registreren |

## Gerelateerde pagina's

- [Authenticatie en rechten](./authentication) — Inlogproces, JWT, OAuth, rechtenmodel
- [Aanwezigheidseindpunten](./attendance) — Registratie van diensten en bezoeken
- [Modulestructuur](../module-structure) — Patronen voor de codeorganisatie
