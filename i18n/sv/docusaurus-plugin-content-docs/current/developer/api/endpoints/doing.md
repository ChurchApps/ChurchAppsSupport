---
title: "Doing-endpoints"
description: "Endpoint-referens för Doing API bakom tjänsteplaner, volontäruppdrag, uppgifter och automatiseringar i B1 Admin, med sökvägar, autentisering och behörigheter."
---

# Doing-endpoints

<div class="article-intro">

Modulen Doing hanterar tjänsteplanering, volontärschemaläggning, uppgiftshantering och automatiseringar. Den erbjuder verktyg för att skapa tjänsteplaner med tider och positioner, tilldela volontärer, hantera spärrdatum, bygga tjänstens ordningsobjekt, ansluta till externa innehållsleverantörer och konfigurera automatiserade arbetsflöden med villkor och åtgärder.

</div>

**Basväg:** `/doing`

## Planer

Basväg: `/doing/plans`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lista alla planer för kyrkan |
| GET | `/:id` | JWT | — | Hämta en plan med ID |
| GET | `/ids?ids=` | JWT | — | Hämta flera planer med kommaseparerade ID |
| GET | `/types/:planTypeId` | JWT | — | Hämta planer efter plantyp |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + redigera ministerium | Förhandsgranska översikten för tjänsten som **Text Volunteers** skickar: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` för volontärerna som är tilldelade i intervallet (en per person, avregistrerade och saknade nummer hoppas över, delade nummer dedupliceras, högst 200) |
| GET | `/presenter` | JWT | — | Hämta planer för de kommande 7 dagarna (presentatörsvy) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Redigera ministerium | Aktiva arbetsflöden för bekräftelse av tjänsttilldelningar (`workflowType = "assignmentConfirmation"`) som en plan kan välja: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Offentlig | — | Hämta den aktuella planen för en plantyp |
| GET | `/public/signup/:churchId` | Offentlig | — | Planer som är öppna för självanmälan, tidigast först, var och en med sina självanmälningspositioner (sorterade efter `categoryName` och sedan `name`, plus `filledCount` för tilldelningar med status Accepted/Unconfirmed) och tider. Inga volontärnamn. När kyrkans inställning `volunteerSignupNextOnly` är `"true"` returneras endast den första planen för varje plantyp. Varje `plan` innehåller en beräknad `signupDeadline` (ISO-tidpunkt eller `null`): `signupDeadlineHours` före planens tidigaste tid av typen `service` (valfri tidsangiven post om det inte finns någon gudstjänsttid; 9:00 i kyrkans tidszon på `serviceDate` om planen saknar tider) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` för planens självanmälningspositioner (visningsnamn för tilldelade personer med status Accepted/Unconfirmed). Returnerar `[]` om planens `showVolunteerNames` inte är aktiverad |
| POST | `/` | JWT | — | Skapa eller uppdatera planer (accepterar ett enskilt objekt eller en array). Sätt `confirmationWorkflowId` för att koppla planen till ett arbetsflöde för bekräftelse av tjänsten, eller `null` för att avsluta kopplingen för framtida anrop. Skicka `signupDeadlineHours: null` för att rensa en deadline; om fältet utelämnas behålls det sparade värdet |
| POST | `/copy/:id` | JWT | Redigera ministerium | Kopiera en plan inklusive positioner, tider, tilldelningar och tjänstens ordningsobjekt. Innehållet omfattar `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) och `copyServiceOrder` (boolean). Utan `targetPlanId` skapas en ny plan, och `notes`, `signupDeadlineHours`, `showVolunteerNames` och `autoReplaceOnDecline` förs över från källplanen om inte innehållet anger dem. Med `targetPlanId` fylls i stället den befintliga planen (anroparen måste kunna redigera den). Alternativet **Upprepa varje vecka** i B1Admin anropar detta en gång per vecka, där varje kopiering görs från planen som skapades veckan innan |
| POST | `/textRange` | JWT | `texting.send` + redigera ministerium | Skicka sms till varje volontär som är tilldelad i ett datumintervall via kyrkans sms-leverantör. Innehåll: `{ startDate, endDate, ministryId, planTypeId?, message }` (meddelandet får vara högst 1600 tecken; sammanfogningsfält ersätts för varje mottagare). Returnerar förhandsgranskningsantalet samt `recipientCount`, `successCount`, `failCount` och `error` (`no_provider` eller `insufficient_credits`) om sändningen avbryts i förtid |
| POST | `/:id/issueRequests` | JWT | Redigera plan | Skicka planens nya tilldelningar med status Unconfirmed som ännu inte har meddelats via dess arbetsflöde för bekräftelse: markerar varje tilldelning som meddelad och startar ett arbetsflödeskort per tilldelning. Tom kropp; returnerar `{ issued }`. Misslyckas om planen inte är publicerad (inte `prepared`), saknar ett aktivt `confirmationWorkflowId` med minst ett steg, eller om svarsdeadlinen har passerat |
| POST | `/autofill/:id` | JWT | — | Fyll i volontärtilldelningar automatiskt för en plan. Innehåll: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Ta bort en plan och alla relaterade tider, tilldelningar, positioner och planobjekt |

### Exempel: Kopiera en plan

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Plantyper

Basväg: `/doing/planTypes`

Utökar basklassen CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — utan behörighetskontroller).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lista alla plantyper |
| GET | `/:id` | JWT | — | Hämta en plantyp med ID |
| GET | `/ids?ids=` | JWT | — | Hämta flera plantyper med kommaseparerade ID |
| GET | `/ministryId/:ministryId` | JWT | — | Hämta plantyper för ett ministerium |
| POST | `/` | JWT | — | Skapa eller uppdatera plantyper |
| DELETE | `/:id` | JWT | — | Ta bort en plantyp |

## Planobjekt

Basväg: `/doing/planItems`

Hanterar tjänstens ordningsobjekt (rubriker, avsnitt, sånger med mera) organiserade i en trädstruktur med över- och underordnade objekt.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta ett planobjekt med ID |
| GET | `/ids?ids=` | JWT | — | Hämta flera planobjekt med kommaseparerade ID |
| GET | `/plan/:planId` | JWT | — | Hämta alla planobjekt för en plan (returnerar trädstruktur) |
| GET | `/presenter/:churchId/:planId` | Offentlig | — | Hämta planobjekt för presentatörsvy (returnerar trädstruktur) |
| POST | `/` | JWT | — | Skapa eller uppdatera planobjekt |
| POST | `/sort` | JWT | — | Uppdatera sorteringsordningen för ett planobjekt (sorterar om syskon) |
| DELETE | `/:id` | JWT | — | Ta bort ett planobjekt |

## Planflöde

Basväg: `/doing/planFeed`

Tillhandahåller feeds med planobjekt för presentatören. Om inga planobjekt finns fylls feeden automatiskt på från Lessons.church-platsens feed med hjälp av planens `contentId`.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:planId` | Offentlig | — | Hämta planflöde för presentatören (fylls automatiskt på från platsens feed om det är tomt) |

## Positioner

Basväg: `/doing/positions`

Utökar basklassen CRUD (GET `/:id`, POST `/`, DELETE `/:id` — utan behörighetskontroller).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en position med ID |
| GET | `/ids?ids=` | JWT | — | Hämta flera positioner med kommaseparerade ID |
| GET | `/plan/ids?planIds=` | JWT | — | Hämta positioner för flera planer med kommaseparerade plan-ID |
| GET | `/plan/:planId` | JWT | — | Hämta alla positioner för en plan |
| POST | `/` | JWT | — | Skapa eller uppdatera positioner |
| DELETE | `/:id` | JWT | — | Ta bort en position |

## Tider

Basväg: `/doing/times`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/all` | JWT | — | Lista alla tider för kyrkan |
| GET | `/:id` | JWT | — | Hämta en tid med ID |
| GET | `/plans?planIds=` | JWT | — | Hämta tider för flera planer med kommaseparerade plan-ID |
| GET | `/plan/:planId` | JWT | — | Hämta alla tider för en plan |
| POST | `/` | JWT | — | Skapa eller uppdatera tider |
| DELETE | `/:id` | JWT | — | Ta bort en tid |

## Tilldelningar

Basväg: `/doing/assignments`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Hämta tilldelningar för den aktuella användaren |
| GET | `/my/upcoming` | JWT | — | Upp till 20 av den aktuella användarens tilldelningar på planer som är daterade från och med gårdagen (planer som är pennlagda, det vill säga `prepared`, hoppas över), tidigast först: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Används för tjänstförhandsvisningen på startsidan för medlemmar |
| GET | `/:id` | JWT | — | Hämta en tilldelning med ID |
| GET | `/plan/ids?planIds=` | JWT | — | Hämta tilldelningar för flera planer med kommaseparerade plan-ID |
| GET | `/plan/:planId` | JWT | — | Hämta alla tilldelningar för en plan |
| POST | `/` | JWT | — | Skapa eller uppdatera tilldelningar (status sätts till "Unconfirmed" som standard) |
| POST | `/accept/:id` | JWT | — | Acceptera en tilldelning (måste vara den tilldelade personen) |
| POST | `/decline/:id` | JWT | — | Avböj en tilldelning (måste vara den tilldelade personen) |
| POST | `/signup` | JWT | — | Självanmälan till en position. Innehåll: `{ positionId }`. Positionen måste tillåta självanmälan och ha plats kvar; skapar en tilldelning med status Accepted. Avvisas med "Signup deadline has passed" när planens deadline för självanmälan (räknad bakåt från dess första gudstjänsttid, enligt ovan) har passerat |
| DELETE | `/signup/:id` | JWT | — | Ta bort din egen självanmälan. Avvisas med "Removal deadline has passed" efter planens deadline för självanmälan |
| DELETE | `/:id` | JWT | — | Ta bort en tilldelning |

### Exempel: Acceptera en tilldelning

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Spärrdatum

Basväg: `/doing/blockoutDates`

Utökar basklassen CRUD (GET `/:id`, DELETE `/:id` — utan behörighetskontroller).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta ett spärrdatum med ID |
| GET | `/ids?ids=` | JWT | — | Hämta flera spärrdatum med kommaseparerade ID |
| GET | `/my` | JWT | — | Hämta spärrdatum för den aktuella användaren |
| GET | `/upcoming` | JWT | — | Hämta alla kommande spärrdatum för kyrkan |
| POST | `/` | JWT | — | Skapa eller uppdatera spärrdatum (sätter personId till den aktuella användaren om den inte anges) |
| DELETE | `/:id` | JWT | — | Ta bort ett spärrdatum |

## Uppgifter

Basväg: `/doing/tasks`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Hämta öppna uppgifter för den aktuella användaren |
| GET | `/:id` | JWT | — | Hämta en uppgift med ID |
| GET | `/:id/contact` | JWT | Kan visa kortet | Kontaktuppgifter för personen som ett arbetsflödeskort gäller: `{ personId, displayName, mobilePhone, email }`. Gör det möjligt för en tilldelad uppringare utan åtkomst till People att nå personen |
| GET | `/closed` | JWT | — | Hämta stängda uppgifter för den aktuella användaren |
| GET | `/timeline?taskIds=` | JWT | — | Hämta tidslinjedata för uppgifter med kommaseparerade uppgifts-ID |
| GET | `/directoryUpdate/:personId` | JWT | — | Hämta uppgift för uppdatering av katalogen för en person |
| POST | `/` | JWT | — | Skapa eller uppdatera uppgifter. Lägg till `?type=directoryUpdate` för att hantera uppgifter för uppdatering av katalogen (laddar upp foton automatiskt) |
| POST | `/:id/conversation` | JWT | `tasks.edit` eller kortets tilldelade person | Bifoga anteckningskonversationen till ett kort. Innehåll: `{ conversationId }`. Den första bifogade konversationen gäller; senare anrop returnerar kortet oförändrat |
| POST | `/loadForGroups` | JWT | — | Hämta uppgifter för särskilda grupper. Innehåll: `{ groupIds: [], status: "Open" }` |

## Automatiseringar

Basväg: `/doing/automations`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lista alla automatiseringar för kyrkan |
| GET | `/:id` | JWT | — | Hämta en automatisering med ID |
| GET | `/check` | Offentlig | — | Starta en kontroll av alla automatiseringar |
| POST | `/` | JWT | — | Skapa eller uppdatera automatiseringar |
| DELETE | `/:id` | JWT | — | Ta bort en automatisering |

## Åtgärder

Basväg: `/doing/actions`

Åtgärder definierar vad som händer när en automatisering utlöses.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en åtgärd med ID |
| GET | `/automation/:id` | JWT | — | Hämta alla åtgärder för en automatisering |
| POST | `/` | JWT | — | Skapa eller uppdatera åtgärder |
| DELETE | `/:id` | JWT | — | Ta bort en åtgärd |

## Villkor

Basväg: `/doing/conditions`

Villkor definierar kriterierna som utlöser en automatisering.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta ett villkor med ID |
| GET | `/automation/:id` | JWT | — | Hämta alla villkor för en automatisering |
| POST | `/` | JWT | — | Skapa eller uppdatera villkor |
| DELETE | `/:id` | JWT | — | Ta bort ett villkor |

## Konjunktioner

Basväg: `/doing/conjunctions`

Konjunktioner kopplar samman flera villkor i en automatisering (logiken OCH/ELLER).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en konjunktion med ID |
| GET | `/automation/:id` | JWT | — | Hämta alla konjunktioner för en automatisering |
| POST | `/` | JWT | — | Skapa eller uppdatera konjunktioner |
| DELETE | `/:id` | JWT | — | Ta bort en konjunktion |

## Autentiseringar för innehållsleverantörer

Basväg: `/doing/contentProviderAuths`

Utökar basklassen CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — utan behörighetskontroller).

Hanterar OAuth-autentiseringsposter för externa innehållsleverantörer (till exempel integrationer med presentationsprogram).

`accessToken` och `refreshToken` krypteras i vila med `EncryptionHelper` och dekrypteras vid läsning, så API:et returnerar fortfarande klartextnycklar. Poster som sparats före kryptering innehåller klartext (som aldrig innehåller `|`); de returneras oförändrade och krypteras nästa gång de sparas.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lista alla autentiseringar för innehållsleverantörer |
| GET | `/:id` | JWT | — | Hämta en autentisering för en innehållsleverantör med ID |
| GET | `/ids?ids=` | JWT | — | Hämta flera autentiseringar för innehållsleverantörer med kommaseparerade ID |
| GET | `/ministry/:ministryId` | JWT | — | Hämta alla autentiseringar för innehållsleverantörer för ett ministerium |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Hämta autentiseringspost för ett specifikt ministerium och en specifik leverantör |
| POST | `/` | JWT | — | Skapa eller uppdatera autentiseringar för innehållsleverantörer |
| DELETE | `/:id` | JWT | — | Ta bort en autentisering för en innehållsleverantör |

## Leverantörsproxy

Basväg: `/doing/providerProxy`

Vidarebefordrar förfrågningar till externa innehållsleverantörer (till exempel ProPresenter och EasyWorship). Hanterar förnyelse av nycklar automatiskt när de har gått ut.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| POST | `/browse` | JWT | — | Bläddra bland filer från en innehållsleverantör. Innehåll: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Hämta presentationer från en innehållsleverantör. Innehåll: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Hämta en spellista från en innehållsleverantör. Innehåll: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Hämta instruktioner för ett innehållsobjekt. Innehåll: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Hämta utökade instruktioner för ett innehållsobjekt. Innehåll: `{ ministryId, providerId, path }` |

## Relaterade sidor

- [Endpoints för medlemskap](./membership.md) — Personer, grupper, roller och behörigheter
- [Endpoints för närvaro](./attendance.md) — Spårning av gudstjänster och besök
- [Modulstruktur](../module-structure.md) — Mönster för kodorganisation
