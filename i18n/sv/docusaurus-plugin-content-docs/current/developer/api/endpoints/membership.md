---
title: "Slutpunkter för medlemskap"
description: "Endpoint-referens för ChurchApps Membership API: personer, hushåll, grupper, roller, formulär och inställningar, med autentisering och behörighetsregler."
---

# Slutpunkter för medlemskap

<div class="article-intro">

Modulen Medlemskap hanterar personer, kyrkor, grupper, hushåll, roller, behörigheter, formulär och inställningar. Det är den största modulen och tillhandahåller det centrala identitets- och auktoriseringslagret för alla andra moduler.

</div>

**Basväg:** `/membership`

## Personer

Basväg: `/membership/people`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View eller Member | Lista alla personer för kyrkan |
| GET | `/:id` | JWT | People.View eller egen post | Hämta en person med ID (inkluderar formulärinskickningar) |
| GET | `/ids?ids=` | JWT | People.View, Member eller People.ViewNames | Hämta flera personer med kommaseparerade ID:n. Anropare med People.ViewNames men utan People.View får den grundläggande modellen, med personer som valt bort synlighet utelämnade (utom anroparen själv) |
| GET | `/basic?ids=` | JWT | — | Hämta grundinformation (endast namn) för flera personer |
| GET | `/names?ids=` | JWT | Valfri kyrkbehörighet | `[{ id, name: { display, first, last }, photo }]`, sorterad efter efternamn och sedan förnamn, för kommaseparerade ID:n som anroparen redan har åtkomst till, så att roller utan People.View (gåvor, närvaro) kan visa namn på personer. Ingen sökning, inget katalogfilter |
| POST | `/names` | JWT | Valfri kyrkbehörighet | Samma som `GET /names`. Brödtext: `{ peopleIds }` (eller `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member eller People.ViewNames | Nyligen tillagda personer. Anropare med People.ViewNames men utan People.View (även medlemmar med katalogåtkomst) får den grundläggande modellen (`id`, `name.display`, `photo`, `membershipStatus`) med personer som valt bort synlighet utelämnade |
| GET | `/guest-register/options?churchId=` | Publik | — | Checklista för QR-registrering av gäster: returnerar `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, där varje värde är `"off"`, `"optional"` eller `"required"` (tolkas från den publika inställningen `guestRegistrationFields`; saknade eller felaktiga värden faller tillbaka till e-post och telefon som valfria, övriga som av). Kräver `enableQRGuestRegistration` om inte förfrågan bär en matchande webbplats- eller kyrkotoken. Hastighetsbegränsad (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member eller People.ViewNames | Sök personer på namn eller e-post (upp till 100, sorterade efter efternamn och sedan förnamn). Anropare med People.ViewNames men utan People.View (även medlemmar med katalogåtkomst) får en namnsökning som returnerar den grundläggande modellen; en sökning med `email` returnerar `[]` |
| GET | `/search/phone?number=` | JWT | People.View eller Member | Sök på telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View eller Member | Hämta personer i en specifik grupp |
| GET | `/household/:householdId` | JWT | — | Hämta alla personer i ett hushåll |
| GET | `/attendance` | JWT | People.Edit | Hämta deltagare med filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Hämta tidslinjedata för personer och grupper |
| GET | `/directory/:id` | JWT | — | Hämta person för katalogvyn (respekterar synlighetsinställningar) |
| GET | `/claim/:churchId` | JWT | — | Koppla en personpost till den aktuella användaren i en kyrka |
| POST | `/` | JWT | People.Edit eller EditSelf | Skapa eller uppdatera personer (batch) |
| POST | `/search` | JWT | People.View, Member eller People.ViewNames | Sök personer (POST-variant). Brödtext: `{ term }` eller `{ email }`; samma regler för endast namn som `GET /search` |
| POST | `/advancedSearch` | JWT | People.View eller Member | Sökning med flera villkor (ålder, birthMonth, membershipStatus osv.). Brödtexten är en array med villkor; en tom brödtext innebär inga villkor, och varje annan brödtext som inte är en array returnerar 400 |
| POST | `/loadOrCreate` | Publik | — | Hitta eller skapa en person med e-post. Brödtext: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Publik | — | QR-registrering av gäster. Brödtext: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 medlemmar; email/phone/maritalStatus gäller endast den första medlemmen). Fält som kyrkan stängt av tas bort; saknade obligatoriska eller ogiltiga värden returnerar 400. Först återanvänds befintliga personer: en medlem matchar när exakt en icke-borttagen person har samma förnamn (skiftlägesokänsligt) och samma e-post eller samma telefonsiffror (hem, arbete eller mobil); en medlem utan e-post eller telefon matchar på förnamn inom det matchade hushållet. Matchade personer redigeras aldrig. Omatchade medlemmar går med i det matchade hushållet, annars i ett nytt hushåll (namngivet efter den första medlemmens efternamn), som `membershipStatus: "Visitor"` med den gemensamma `address`. Sparar `comments` som en anteckning på den första medlemmen, lägger alla i den privata gruppen `guestRegistrationGroupId` om den är angiven, och — när `guestRegistrationRecordAttendance` är `"true"` — registrerar närvaro för gruppens schemalagda gudstjänsttider vars incheckningsfönster är öppet just nu. Returnerar `{ householdId, people: [{ id, name }] }` och eklar de inskickade namnen i stället för de lagrade. Samma regler för opt-in/token och hastighetsbegränsning som för options-anropet |
| POST | `/household/:householdId` | JWT | People.Edit | Uppdatera hushållets medlemstilldelningar |
| POST | `/public/email` | Publik | — | Skicka ett e-postmeddelande till en person. Brödtext: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | Hämta personers e-postadresser med ID (server-till-server, kräver jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Ta bort en person |

### Exempel: Sök personer

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

### Exempel: Skapa en person

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Användare

Basväg: `/membership/users`

Se [Autentisering och behörigheter](./authentication.md) för slutpunkter för inloggning, registrering och lösenordshantering.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| POST | `/login` | Publik | — | Logga in (e-post/lösenord, JWT-förnyelse eller authGuid) |
| POST | `/register` | Publik | — | Registrera en ny användare |
| POST | `/forgot` | Publik | — | Skicka e-post för återställning av lösenord |
| POST | `/setPasswordGuid` | Publik | — | Ange lösenord med auth-GUID från länken i e-postmeddelandet |
| POST | `/verifyCredentials` | Publik | — | Verifiera e-post/lösenord och returnera tillhörande kyrkor |
| POST | `/loadOrCreate` | JWT | — | Hitta eller skapa en användare med e-post/userId |
| POST | `/setDisplayName` | JWT | — | Uppdatera användarens för- och efternamn |
| POST | `/updateEmail` | JWT | — | Byt användarens e-postadress |
| POST | `/updatePassword` | JWT | — | Byt användarens lösenord (minst 6 tecken) |
| POST | `/updateOptedOut` | JWT | — | Ange en persons status för att ha valt bort synlighet |
| POST | `/sendInviteEmail` | JWT | People.Edit | Skicka en inbjudan via e-post till en person i den här kyrkan (`email`, `personName`, `contextName`). Knappen visar **Registrera dig** för någon utan konto och **Logga in** för en befintlig användare. En användare som aldrig har loggat in får i stället en länk **Ange ditt lösenord** som går ut efter 7 dagar. En fast mall, så den räknas inte mot kyrkans dagliga e-postgräns |
| GET | `/search?term=` | JWT | Server.Admin | Sök alla användare på namn/e-post |
| DELETE | `/` | JWT | — | Ta bort det aktuella användarkontot |

## Kyrkor

Basväg: `/membership/churches`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hämta alla kyrkor för den aktuella användaren |
| GET | `/:id` | JWT | — | Hämta kyrka med ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Hämta domänadministratören för en kyrka |
| GET | `/:id/impersonate` | JWT | Server.Admin | Imitera en kyrka (endast serveradministratör) |
| GET | `/all?term=` | JWT | Server.Admin | Sök alla kyrkor (admin) |
| GET | `/search/?name=` | Publik | — | Sök kyrkor på namn |
| GET | `/lookup/?subDomain=&id=` | Publik | — | Slå upp en kyrka med underdomän eller ID |
| POST | `/` | JWT | Settings.Edit | Uppdatera kyrkans uppgifter |
| POST | `/add` | JWT | — | Registrera en ny kyrka. Obligatoriska fält: name, address1, city, state, zip, country |
| POST | `/search` | Publik | — | Sök kyrkor på namn (POST-variant) |
| POST | `/select` | JWT | — | Välj/byt till en kyrka. Brödtext: `{ churchId }` eller `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkivera eller ta bort arkivering av en kyrka |
| POST | `/byIds` | Publik | — | Hämta flera kyrkor med ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Ta bort kyrkor som har övergetts i 7 dagar eller mer |

## Grupper

Basväg: `/membership/groups`

Utökar standard-CRUD (GET `/`, GET `/:id` från basklassen).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista alla grupper |
| GET | `/:id` | JWT | — | Hämta grupp med ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Sök grupper med tjänstefilter |
| GET | `/my` | JWT | — | Hämta grupper för den aktuella användaren |
| GET | `/my/:tag` | JWT | — | Hämta den aktuella användarens grupper filtrerade på tagg |
| GET | `/tag/:tag` | JWT | — | Hämta alla grupper med en viss tagg |
| GET | `/public/:churchId/:id` | Publik | — | Hämta en offentlig grupp via kyrka och ID |
| GET | `/public/:churchId/tag/:tag` | Publik | — | Hämta offentliga grupper med tagg |
| GET | `/public/:churchId/label?label=` | Publik | — | Hämta offentliga grupper med etikett |
| GET | `/public/:churchId/slug/:slug` | Publik | — | Hämta en offentlig grupp via slug |
| POST | `/` | JWT | Groups.Edit | Skapa eller uppdatera grupper (genererar slug automatiskt) |
| DELETE | `/:id` | JWT | Groups.Edit | Ta bort en grupp (tar även bort underordnade team för tjänstegrupper) |

## Gruppmedlemmar

Basväg: `/membership/groupmembers`

Utökar standard-CRUD (GET `/:id`, DELETE `/:id` från basklassen).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Hämta gruppmedlem med ID |
| GET | `/` | JWT | GroupMembers.View* | Lista gruppmedlemmar. Filtrera med `?groupId=`, `?groupIds=` eller `?personId=`. *Tillåts även om användaren är med i gruppen eller frågar efter sitt eget personId, och för `?groupId=` i alla icke-konfidentiella grupper när användaren har Attendance.View eller Attendance.Edit (medlemmar under 13 år inkluderas för dem) |
| GET | `/my` | JWT | — | Hämta den aktuella användarens gruppmedlemskap |
| GET | `/basic/:groupId` | JWT | — | Hämta grundläggande medlemslista för en grupp |
| GET | `/public/leaders/:churchId/:groupId` | Publik | — | Hämta gruppledare (offentligt) |
| GET | `/public/:churchId/:groupId` | Publik | — | Hämta en gruppens offentliga medlemsförteckning (minimala fält: `personId`, `displayName`, `leader`, foto). Endast när gruppen aktiverar `publicRoster`; driver elementet `staffGrid` i webbplatsbyggaren |
| POST | `/` | JWT | GroupMembers.Edit | Lägg till eller uppdatera gruppmedlemmar |
| DELETE | `/:id` | JWT | GroupMembers.View | Ta bort en gruppmedlem |

## Hushåll

Basväg: `/membership/households`

Standard-CRUD-controller.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista alla hushåll |
| GET | `/:id` | JWT | — | Hämta hushåll med ID |
| POST | `/` | JWT | People.Edit | Skapa eller uppdatera hushåll |
| DELETE | `/:id` | JWT | People.Edit | Ta bort ett hushåll |

## Roller

Basväg: `/membership/roles`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Hämta roll med ID |
| GET | `/church/:churchId` | JWT | Roles.View | Hämta alla roller för en kyrka. Varje roll innehåller `memberCount`, antalet unika användare i rollen |
| POST | `/` | JWT | Roles.Edit | Skapa eller uppdatera roller |
| DELETE | `/:id` | JWT | Roles.Edit | Ta bort en roll (tar även bort dess behörigheter och medlemmar) |

## Rollmedlemmar

Basväg: `/membership/rolemembers`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hämta medlemmar i en roll. Lägg till `?include=users` för att inkludera användarinformation |
| POST | `/` | JWT | Roles.Edit | Lägg till medlemmar i en roll (skapar användare om e-postadressen inte finns) |
| DELETE | `/:id` | JWT | Roles.View | Ta bort en rollmedlem |
| DELETE | `/self/:churchId/:userId` | JWT | — | Ta bort dig själv från en kyrka |

## Rollbehörigheter

Basväg: `/membership/rolepermissions`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Hämta behörigheter för en roll (använd `null` som ID för rollen "Everyone") |
| POST | `/` | JWT | Roles.Edit | Skapa eller uppdatera rollbehörigheter |
| DELETE | `/:id` | JWT | Roles.Edit | Ta bort en rollbehörighet |

## Behörigheter

Basväg: `/membership/permissions`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hämta hela listan över tillgängliga behörigheter |

Varje post har `apiName`, `section` (innehållstyp), `action` och etiketterna `displaySection` / `displayAction` som B1Admins rolleditor visar. Nya tillägg: `MembershipApi` / `People` / `View Names` (**Visa endast personnamn**, under Personer och grupper) och `GivingApi` / `Donations` / `Enter` (**Ange gåvor**, under Gåvor; se [Gåvosatser](./giving.md#donation-batches)).

## Formulär

Basväg: `/membership/forms`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Lista alla formulär (admin ser alla; redigerare ser tilldelade formulär och formulär som inte gäller medlemmar) |
| GET | `/:id` | JWT | Formulärsåtkomst | Hämta ett formulär med ID |
| GET | `/archived` | JWT | Forms.Admin eller Forms.Edit | Lista arkiverade formulär |
| GET | `/group/:groupId` | JWT | Gruppmedlem, gruppledare eller Forms.Admin | Fristående formulär kopplade till gruppen (`forms.groupId`), exklusive arkiverade, sorterade efter namn. Returnerar `id`, `name`, `description` och `open` (inom tillgänglighetsfönstret). Medlemmar får endast öppna formulär; ledare och formuläradministratörer får även stängda. Används för de länkade formulären på gruppsidan |
| GET | `/standalone/:id?churchId=` | JWT | — | Hämta ett fristående formulär (begränsade formulär kräver autentisering) |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Skapa eller uppdatera formulär. Fristående formulär accepterar valfritt `photoUrl` (rubrikbild som visas ovanför formuläret) och `groupId` (kopplad grupp) |
| DELETE | `/:id` | JWT | Formulärsåtkomst | Ta bort ett formulär |

## Formulärinskickningar

Basväg: `/membership/formsubmissions`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Lista inskickningar. Filtrera med `?personId=` eller `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Endast för den egna användaren: upp till 50 fristående formulärinskickningar (inte personformulär) som den inloggade medlemmen har skickat in eller som är kopplade till dess person (`contentType` `person`, `contentId` = dess person-ID, till exempel efter att en administratör ändrat personen), nyast först, var och en med `form.name`. `include` bifogar varje formulärs frågor och inskickningens svar. Returnerar `401` om användaren inte är kopplad till en person. Används för avsnittet **Mina formulär** på sidan B1 Me |
| GET | `/group/:groupId` | JWT | Gruppens ledare | Svar för gruppens ledare: en post per kopplat formulär och per gruppevenemang med anmälningsformulär, var och en med `form`, `event` (`id`, `title`, `start`; endast eventposter), `questions` och `submissions` (med `answers` och `personName`, `null` när den är anonym) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit eller visningsåtkomst | Hämta inskickning med ID. Lägg till `?include=form,questions,answers`. Ledare för formulärets kopplade grupp och ledare för gruppen som en eventanmälan tillhör kan också läsa den |
| GET | `/formId/:formId` | JWT | Formulärsåtkomst (visning) | Hämta alla inskickningar för ett formulär (inkluderar form, questions, answers). Ledare för formulärets kopplade grupp har visningsåtkomst |
| POST | `/` | JWT | — | Skicka in formulärsvar (hanterar begränsade/obegränsade formulär, skickar e-postnotiser). När formuläret har `autoCreatePerson` hittas eller skapas en gästperson med e-post och inskickningen kopplas till den; när formuläret dessutom har en `groupId` läggs den personen till i gruppen; när `followUpSubject`/`followUpBody` är satta skickas ett mallbaserat uppföljningsmejl till avsändaren. Om anroparen inte kan hantera formuläret sätts alltid `submittedBy` till den inloggade medlemmens person (eller lämnas tomt för anonyma inskickningar) |
| DELETE | `/:id` | JWT | Forms.Admin eller Forms.Edit | Ta bort en inskickning och dess svar |

## Frågor

Basväg: `/membership/questions`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formulärsåtkomst | Lista frågor för ett formulär. Kräver `?formId=` |
| GET | `/:id` | JWT | Formulärsåtkomst | Hämta en fråga med ID |
| GET | `/unrestricted?formId=` | JWT | — | Hämta frågor för ett obegränsat formulär |
| GET | `/sort/:id/up` | JWT | — | Flytta en fråga uppåt i sorteringsordningen |
| GET | `/sort/:id/down` | JWT | — | Flytta en fråga nedåt i sorteringsordningen |
| POST | `/` | JWT | Formulärsåtkomst | Skapa eller uppdatera frågor (tilldelar sorteringsordning automatiskt) |
| DELETE | `/:id?formId=` | JWT | Formulärsåtkomst | Ta bort en fråga |

## Svar

Basväg: `/membership/answers`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin eller Forms.Edit | Lista svar. Filtrera med `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin eller Forms.Edit | Skapa eller uppdatera svar |

## Medlemsbehörigheter

Basväg: `/membership/memberpermissions`

Styr åtkomst för enskilda medlemmar till specifika formulär.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formulärsåtkomst | Hämta en medlemsbehörighet med ID |
| GET | `/member/:id` | JWT | Formulärsåtkomst | Hämta alla formulärbehörigheter för en medlem |
| GET | `/form/:id` | JWT | Formulärsåtkomst | Hämta alla medlemsbehörigheter för ett formulär |
| GET | `/form/:id/my` | JWT | Formulärsåtkomst | Hämta den aktuella användarens behörighet för ett formulär |
| POST | `/` | JWT | Formulärsåtkomst | Skapa eller uppdatera medlemsbehörigheter |
| DELETE | `/:id?formId=` | JWT | Formulärsåtkomst | Ta bort en medlemsbehörighet |
| DELETE | `/member/:id?formId=` | JWT | Formulärsåtkomst | Ta bort alla behörigheter för en medlem på ett formulär |

## Inställningar

Basväg: `/membership/settings`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Hämta alla inställningar för kyrkan |
| GET | `/public/:churchId` | Publik | — | Hämta publika inställningar för en kyrka |
| POST | `/` | JWT | Settings.Edit | Spara inställningar (stöder uppladdning av bilder i base64) |

## Domäner

Basväg: `/membership/domains`

Utökar standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` från basklassen).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista alla domäner |
| GET | `/:id` | JWT | — | Hämta domän med ID |
| GET | `/lookup/:domainName` | JWT | — | Slå upp en domän med namn |
| GET | `/public/lookup/:domainName` | Publik | — | Offentlig domänuppslagning med namn |
| GET | `/health/check` | Publik | — | Kör hälsokontroll på okontrollerade domäner |
| POST | `/` | JWT | Settings.Edit | Skapa eller uppdatera domäner (utlöser uppdatering av Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Ta bort en domän |

## Användare och kyrkor

Basväg: `/membership/userchurch`

Hanterar kopplingen mellan användare och kyrkor.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Hämta användar–kyrka-post med användar-ID |
| GET | `/personid/:personId` | JWT | — | Hämta e-post för en persons kopplade användare |
| GET | `/user/:userId` | JWT | Server.Admin | Hämta alla kyrkor för en användare |
| POST | `/` | JWT | — | Skapa en koppling mellan användare och kyrka |
| PATCH | `/:userId` | JWT | — | Uppdatera senast använd tid och logga åtkomsten |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Ta bort en användar–kyrka-post |

## Synlighetsinställningar

Basväg: `/membership/visibilityPreferences`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hämta den aktuella användarens synlighetsinställningar |
| POST | `/` | JWT | — | Spara synlighetsinställningar (synlighet för adress, telefon och e-post) |

## Fråga

Basväg: `/membership/query`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Sökning av medlemmar med naturligt språk med hjälp av AI. Brödtext: `{ text, subDomain, siteUrl }` |

## Klientfel

Basväg: `/membership/clientErrors`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Logga ett fel på klientsidan |

## Relaterade sidor

- [Autentisering och behörigheter](./authentication.md) — Inloggningsflöde, JWT, OAuth, behörighetsmodell
- [Slutpunkter för närvaro](./attendance.md) — Spårning av gudstjänster och besök
- [Modulstruktur](../module-structure.md) — Mönster för kodorganisation
