---
title: "Meddelandeslutpunkter"
---

# Meddelandeslutpunkter

<div class="article-intro">

Meddelandemodulen hanterar realtidskonversationer, chattmeddelanden, pushnotiser, SMS- och e-postleverans, WebSocket-anslutningar, privata meddelanden, enhetsregistrering och sms-leverantörer. Den tillhandahåller kommunikationslagret som används i alla ChurchApps-applikationer, både för chatt i livesändningar och för asynkrona notiser.

</div>

**Bassökväg:** `/messaging`

## Konversationer

Bassökväg: `/messaging/conversations`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | Hämta konversationer med kommaseparerade ID:n, inklusive första och sista meddelandet |
| GET | `/messages/:contentType/:contentId` | JWT | — | Hämta konversationer för innehåll med sidindelade meddelanden (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hämta inläggskonversationer för den aktuella användarens grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hämta inläggskonversationer för en specifik grupp |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Senaste anteckningarna för alla poster på B1 Admins sida för anteckningar. `section` är `people`, `groups`, `events` eller `workflows` (annars 400). `limit` är som standard 25 (max 100). `before` är markören från föregående sida. Varje anteckning måste fortfarande uppfylla sin egen typs regel (behörigheten People Edit / konfidentiella anteckningar, gruppledare, händelsevisare, visare av arbetsflödeskort), så anropare ser bara anteckningar de kan öppna. Anteckningstexten kapas till 300 tecken |
| GET | `/current/:churchId/:contentType/:contentId` | Publik | — | Hämta eller skapa aktuell konversation för innehåll (avkodar contentId automatiskt) |
| GET | `/:churchId/:contentType/:contentId` | Publik | — | Hämta konversationer efter innehållstyp och ID |
| GET | `/:churchId/:id` | Publik | — | Hämta en enskild konversation via ID |
| POST | `/` | JWT | — | Skapa eller uppdatera konversationer (batch) |
| POST | `/start` | JWT | — | Starta en ny konversation med ett inledande kommentarsmeddelande |
| DELETE | `/:churchId/:id` | JWT | — | Ta bort en konversation |

### Åtkomstkontroll för personanteckningar

Konversationer med `contentType: "person"` (fliken Anteckningar på en personpost) eller `contentType: "personConfidential"` (avsnittet Konfidentiella anteckningar) kontrolleras vid varje läs- och skrivväg, inklusive de offentliga rutterna ovan, som returnerar `401` för dessa innehållstyper. `person` kräver MembershipApi-behörigheten **People / Edit** (Personer / Redigera). `personConfidential` kräver **People / View Confidential Notes** (Personer / Visa konfidentiella anteckningar). För API-nycklar med begränsat omfång ger `people:write` båda åtgärderna. Nyckelns användare måste fortfarande ha den underliggande rollbehörigheten.

### Åtkomstkontroll för grupp- och händelseanteckningar {#group-and-event-notes-access-control}

Ytterligare två anteckningstyper kontrolleras på samma sätt vid varje läs- och skrivväg, inklusive de offentliga rutterna ovan, och är aldrig öppna för anonyma inlägg:

- **`groupNote`** (`contentId` = grupp-ID) -- flödet **Ledaranteckningar** på en grupp. Endast gruppens ledare (`leaderGroupIds` i JWT:n) kan läsa eller skriva. Ingen personalbehörighet ger åtkomst, inte heller `content.edit` eller gruppmedlemsbehörigheterna.
- **`eventNote`** (`contentId` = händelse-ID) -- anteckningarna på en kalenderhändelse. Personal med `content.edit` eller **Calendars / Admin** (Kalendrar / Admin) kan alltid läsa och skriva. I övrigt följer åtkomsten händelsens `notesViewRole` (läsning) och `notesPostRole` (skrivning): `staff` (standard, används när fältet är `null`) ger ingen annan åtkomst, `leaders` ger åtkomst till händelsegruppens ledare, och `members` ger åtkomst till händelsegruppens medlemmar och ledare. En händelse utan `groupId` är endast för personal.

### Åtkomstkontroll för anteckningar på arbetsflödeskort

Konversationer med `contentType: "workflowCard"` (anteckningarna på ett arbetsflödeskort, där `contentId` är kortets uppgifts-ID) kan endast läsas och skrivas av någon som kan öppna kortet: en användare med DoingApi-behörigheten **Tasks / View** (Uppgifter / Visa), eller personen eller gruppen som kortet är tilldelat, skapat av eller gäller. Alla andra får `401` på varje läsväg, inklusive de offentliga rutterna ovan. Ett korts konversation kopplas via kortet självt med `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; den första kopplade konversationen gäller). Anropet kan göras av kortets redigerare och dess tilldelade person.

### Exempel: Starta en konversation

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Veckans diskussion",
  "comment": "Välkommen till veckans diskussionstråd!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Veckans diskussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Meddelanden

Bassökväg: `/messaging/messages`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | Hämta alla meddelanden för en konversation |
| GET | `/catchup/:churchId/:conversationId` | Publik | — | Hämta alla meddelanden för en konversation (publik återhämtning för livechatt) |
| GET | `/:churchId/:id` | Publik | — | Hämta ett enskilt meddelande via ID |
| POST | `/` | JWT | — | Spara meddelanden (batch). Skickar realtidsuppdateringar och utlöser notiser. Att uppdatera ett befintligt meddelande kräver att man är dess författare eller har `content.edit`. Den lagrade författaren kan aldrig ändras |
| POST | `/send` | Publik | — | Skicka meddelanden (batch, publikt). Skickar realtidsuppdateringar via WebSocket och utlöser notiser |
| POST | `/setCallout` | JWT | — | (äldre) Sänd ett callout-meddelande i realtid. Ingen aktiv klient används. Chatten i livesändningar visar inte längre callouts |
| DELETE | `/:churchId/:id` | JWT | — | Ta bort ett meddelande och sänd borttagningen i realtid. Se [Moderering av meddelanden](#message-moderation) |

### Moderering av meddelanden

Ett meddelande får tas bort av:

- meddelandets författare;
- personal med `content.edit` (var som helst i kyrkan);
- **gruppledare**, för konversationer med `contentType` `group` eller `groupAnnouncement` vars `contentId` är en grupp de leder (`leaderGroupIds` i JWT:n).

Konversationer med personanteckningar (`person` / `personConfidential`) modereras aldrig av ledare. De använder i stället anteckningsbehörigheterna (`people.edit`, `people.viewConfidentialNotes`).

Ledare får bara ta bort meddelanden, inte redigera dem. Att skriva om en annan medlems meddelande är fortsatt begränsat till författaren och personal med `content.edit`.

### Exempel: Skicka ett meddelande

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hej alla!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hej alla!",
    "messageType": "comment"
  }
]
```

## Privata meddelanden

Bassökväg: `/messaging/privatemessages`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Hämta alla privata meddelanden för den aktuella användaren (inkluderar senaste meddelandet per konversation och markerar alla som lästa) |
| GET | `/existing/:personId` | JWT | — | Hitta en befintlig privat konversation med en specifik person |
| GET | `/:id` | JWT | — | Hämta ett privat meddelande via ID (rensar notisen om det är adresserat till den aktuella användaren) |
| POST | `/` | JWT | — | Skicka privata meddelanden (batch). Utlöser en pushnotis till mottagaren |

## Notiser

Bassökväg: `/messaging/notifications`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | Hämta antalet olästa notiser för den aktuella användaren |
| GET | `/my` | JWT | — | Hämta alla notiser för den aktuella användaren (markerar alla som lästa) |
| GET | `/tmpEmail` | Publik | — | Utlös det dagliga e-postsammandraget av notiser (felsöknings- och cron-slutpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Hämta notiser för en specifik person |
| GET | `/:churchId/:id` | JWT | — | Hämta en notis via ID |
| POST | `/` | JWT | — | Skapa eller uppdatera notiser (batch) |
| POST | `/create` | JWT | — | Skapa notiser för flera personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markera alla notiser som lästa för en person |
| POST | `/sendTest` | JWT | — | Skicka en testpushnotis. Body: `{ personId, title }` |
| POST | `/ping` | Publik | — | Skapa en notis från en extern utlösare. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Ta bort en notis |

### Exempel: Skapa notiser

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "Ny händelse publicerad i din grupp",
  "link": "/groups/group-789"
}
```

## Notisinställningar

Bassökväg: `/messaging/notificationpreferences`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/categories` | JWT | — | Lista notiskategorier med deras standardkanaler och tillåtna kanaler |
| GET | `/my` | JWT | — | Hämta notisinställningar för den aktuella användaren (skapar standardinställningar automatiskt om inga finns) |
| POST | `/` | JWT | — | Spara den aktuella användarens inställningar. Body: valfri av `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, samt valfritt `overrides: [{ categoryKey, channel, optedIn }]` (channel kan vara `push`, `email`, `in_app` eller `sms`; låsta kategorier ignoreras). `allowSms` är medlemmens samtycke till textpåminnelser. En äldre body som är en array av rader accepteras fortfarande |

## Anslutningar

Bassökväg: `/messaging/connections`

Hanterar WebSocket- och realtidsanslutningar för chatt, gruppkonversationer, privata meddelanden och livesändningar. Se [Realtidsarkitektur](../../realtime) för det fullständiga protokollet.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:churchId/:conversationId` | Publik | — | Hämta alla anslutningar för en konversation |
| POST | `/` | Publik | — | Registrera anslutningar (batch). Utlöser en närvarosändning för konversationen. Body-objekt: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Publik | — | Uppdatera visningsnamnet för en anslutning med socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Publik | — | Ta bort en anslutning från en konversation. Utlöser en närvarosändning |
| POST | `/tmpSendAlert` | Publik | — | Skicka en notisavisering till en persons anslutningar. Body: `{ churchId, personId }` |

## Enheter

Bassökväg: `/messaging/devices`

Hanterar enhetsregistrering för pushnotiser och innehållskoppling (t.ex. Lessons-appen på TV-skärmar).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| POST | `/enroll` | JWT | — | Registrera eller uppdatera en enhet (registrering av mobil push). Matchar på FCM-token eller enhets-ID |
| POST | `/enrollAnon` | Publik | — | Registrera en anonym enhet och generera en 4-teckens kopplingskod |
| POST | `/` | Publik | — | Spara enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Koppla en enhet med dess kopplingskod. Valfritt `?contentType=&contentId=` för att tilldela innehåll |
| GET | `/status/:deviceId` | Publik | — | Kontrollera kopplingsstatus för en enhet |
| GET | `/:churchId` | JWT | — | Hämta alla enheter för en kyrka |
| GET | `/:churchId/person/:personId` | JWT | — | Hämta alla enheter för en person |
| GET | `/:churchId/:id` | JWT | — | Hämta en enhet via ID |
| DELETE | `/:churchId/:id` | JWT | — | Ta bort en enhet |

### Exempel: Registrera en enhet

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "Johns iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "Johns iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Enhetsinnehåll

Bassökväg: `/messaging/devicecontents`

Hanterar innehållstilldelningar för kopplade enheter (t.ex. vilken lektion som visas på en TV).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/deviceId/:deviceId` | JWT | — | Hämta innehållstilldelningar för en enhet |
| POST | `/` | JWT | — | Spara enhetens innehållstilldelningar (batch) |
| DELETE | `/:id` | JWT | — | Ta bort en innehållstilldelning för en enhet |

## Sms-utskick

Bassökväg: `/messaging/texting`

Hanterar sms-leverantörer, gruppmeddelanden och leveransspårning.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/providers` | JWT | — | Hämta sms-leverantörer för kyrkan (uppgifterna är maskerade) |
| GET | `/status` | JWT | — | `{ enabled }` -- om kyrkan har en aktiverad sms-leverantör. Gäller alla inloggade kyrkanvändare. Används för att bara visa alternativen **Text** när sms kan skickas |
| GET | `/inboundUrl` | JWT | `texting.send` eller `settings.edit` | `{ url }` -- kyrkans webhook-URL för inkommande meddelanden (STOP), som ska klistras in hos leverantören |
| POST | `/inbound/:churchId/:token` | Publik | — | Leverantörens webhook för inkommande meddelanden. `token` är en HMAC av kyrko-ID:t. Ett svar som exakt är ett stoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) markerar alla matchande personer som `optedOut` och stänger av deras `allowSms`. Returnerar `{ optedOut: <antal> }`. Andra svar returnerar `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Förhandsgranska mottagare för ett gruppsms (antal berättigade, avregistrerade och utan telefonnummer) |
| GET | `/sent` | JWT | — | Hämta alla skickade sms-poster för kyrkan |
| GET | `/sent/:id/details` | JWT | — | Hämta ett skickat sms med leveranslogg per mottagare |
| POST | `/providers` | JWT | — | Spara sms-leverantörer (batch). Krypterar API-uppgifter |
| POST | `/send` | JWT | — | Skicka ett sms till alla berättigade medlemmar i en grupp. Body: `{ groupId, message }`. Sammanslagningsfält (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) löses per mottagare |
| POST | `/sendPerson` | JWT | — | Skicka ett sms till en enskild person. Body: `{ personId, phoneNumber, message }`. Sammanslagningsfält löses, och det lösta meddelandet är det som loggas |
| DELETE | `/providers/:id` | JWT | — | Ta bort en sms-leverantör |

### Exempel: Skicka gruppsms

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Påminnelse: Gudstjänsten börjar kl. 10 på söndag!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## E-postmallar

Bassökväg: `/messaging/emailTemplates`

Hanterar återanvändbara e-postmallar och skickar mallbaserade e-postmeddelanden till grupper.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Hämta alla e-postmallar för kyrkan |
| GET | `/:id` | JWT | — | Hämta en enskild e-postmall via ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` eller `tasks.admin` | Kyrkans e-poststatus för grupper: `{ approved, paused, remaining, requested }`. B1Admins dialogruta Skicka e-post och arbetsflödesåtgärden **Skicka e-post** använder den för att varna när e-post inte kommer att skickas |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Be supporten att godkänna kyrkan för grupp-e-post (högst en gång per kyrka och vecka) |
| GET | `/preview/:groupId` | JWT | — | Förhandsgranska e-postleverans för en grupp (antal berättigade mottagare, medlemmar utan e-post) |
| POST | `/` | JWT | — | Skapa eller uppdatera e-postmallar (batch) |
| POST | `/send` | JWT | — | Skicka ett mallbaserat e-postmeddelande till alla medlemmar i en grupp. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Ta bort en e-postmall |

### Exempel: Skicka e-post till en grupp

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "Veckans uppdatering - {{churchName}}",
  "htmlContent": "<p>Hej {{firstName}},</p><p>Här är vad som händer den här veckan...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Stödda sammanslagningsfält:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blockerade IP-adresser

Bassökväg: `/messaging/blockedips`

(äldre) IP-blockering för chatt i livesändningar. B1App-klienten anropar inte längre `POST /`, eftersom IP-blockering togs bort i migreringen till enhetlig leverans. Rutten `/clear` anropas fortfarande server till server av `StreamingServiceController` när streamingtjänster sparas.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| POST | `/` | JWT | — | (äldre) Spara blockerade IP-adresser (batch). Ingen aktiv klient |
| POST | `/clear` | JWT | — | Rensa alla blockerade IP-adresser för specifika tjänster. Body: `[{ serviceId, churchId }]` |

## Leveranslogg

Bassökväg: `/messaging/deliverylogs`

Spårar leveransstatus för skickade meddelanden (sms, pushnotiser och e-post).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | Hämta leveransloggar efter innehållstyp och ID |
| GET | `/person/:personId` | JWT | — | Hämta leveransloggar för en person. Valfria `?startDate=&endDate=` filtrerar resultatet |
| GET | `/recent` | JWT | — | Hämta de senaste leveransloggarna för kyrkan. Valfritt `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Hämta en leveranslogg via ID |

## Relaterade sidor

- [Realtidsarkitektur](../../realtime) -- WebSocket-protokoll, rumsprenumerationer och det enhetliga leveransramverket
- [Webbpushnotiser](../../web-push) -- Registrering och leverans av webbläsarpush
- [Medlemsslutpunkter](./membership) -- Personer, grupper, roller och kärnidentitet
- [Närvaroslutpunkter](./attendance) -- Spårning av gudstjänster och besök
- [Autentisering och behörigheter](./authentication) -- Inloggningsflöde, JWT, OAuth och behörighetsmodell
- [Modulstruktur](../module-structure) -- Mönster för kodorganisation
