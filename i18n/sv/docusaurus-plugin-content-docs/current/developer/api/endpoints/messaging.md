---
title: "Meddelandeslutpunkter"
description: "Referens för ChurchApps API-slutpunkter för meddelanden: konversationer, åtkomstregler för anteckningar, sms, e-postmallar, aviseringar och enheter."
---

# Meddelandeslutpunkter

<div class="article-intro">

Meddelandemodulen hanterar realtidskonversationer, chattmeddelanden, pushaviseringar, sms- och e-postutskick, WebSocket-anslutningar, privata meddelanden, enhetsregistrering och sms-leverantörer. Den tillhandahåller kommunikationslagret som används i alla ChurchApps-program, både för chatt i livesändningar och för asynkrona aviseringar.

</div>

**Basväg:** `/messaging`

## Konversationer

Basväg: `/messaging/conversations`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | Hämta konversationer med kommaseparerade ID:n, inklusive första och sista meddelandet |
| GET | `/messages/:contentType/:contentId` | JWT | — | Hämta konversationer för innehåll med sidindelade meddelanden (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hämta konversationer av typen inlägg för den aktuella användarens grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hämta konversationer av typen inlägg för en specifik grupp |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Senaste anteckningarna från alla poster, för sidan Anteckningar i B1 Admin. `section` är `people`, `groups`, `events` eller `workflows` (annars 400). `limit` är 25 som standard (max 100). `before` är markören från föregående sida. Varje anteckning måste fortfarande uppfylla regeln för sin egen typ (behörighet People Edit / konfidentiella anteckningar, gruppledare, eventvisare eller visare av arbetsflödeskort). Anropare ser därmed bara anteckningar de hade kunnat öppna. Anteckningstexten kapas vid 300 tecken |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Hämta eller skapa aktuell konversation för innehåll (avkodar contentId automatiskt) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Hämta konversationer efter innehållstyp och ID |
| GET | `/:churchId/:id` | Offentlig | — | Hämta en enskild konversation med ID |
| POST | `/` | JWT | — | Skapa eller uppdatera konversationer (batch) |
| POST | `/start` | JWT | — | Starta en ny konversation med ett inledande kommentarsmeddelande |
| DELETE | `/:churchId/:id` | JWT | — | Ta bort en konversation |

### Åtkomstkontroll för personanteckningar

Konversationer med `contentType: "person"` (fliken Anteckningar på en personpost) eller `contentType: "personConfidential"` (avsnittet Konfidentiella anteckningar) styrs vid varje läs- och skrivväg, inklusive de offentliga rutterna ovan, som returnerar `401` för dessa innehållstyper. `person` kräver behörigheten **People / Edit** i MembershipApi. `personConfidential` kräver **People / View Confidential Notes**. För API-nycklar med begränsad åtkomst omfattar `people:write` båda åtgärderna. Nyckelns användare måste fortfarande ha den underliggande rollbehörigheten.

### Åtkomstkontroll för grupp- och eventanteckningar {#group-and-event-notes-access-control}

Två ytterligare anteckningstyper styrs på samma sätt, vid varje läs- och skrivväg (inklusive de offentliga rutterna ovan), och är aldrig öppna för anonyma inlägg:

- **`groupNote`** (`contentId` = gruppens ID) -- flödet **Ledaranteckningar** på en grupp. Endast den gruppens ledare (`leaderGroupIds` i JWT) kan läsa eller skriva. Ingen personalbehörighet ger åtkomst, inklusive `content.edit` och behörigheterna för gruppmedlemskap.
- **`eventNote`** (`contentId` = event-ID) -- anteckningarna på en kalenderhändelse. Personal med `content.edit` eller **Calendars / Admin** kan alltid läsa och skriva. I övrigt följer åtkomsten händelsens `notesViewRole` (läsning) och `notesPostRole` (skrivning). `staff` (standard, används när fältet är `null`) ger ingen annan åtkomst. `leaders` ger åtkomst till ledare i händelsens grupp, och `members` ger åtkomst till medlemmar och ledare i händelsens grupp. En händelse utan `groupId` är endast för personal.

### Åtkomstkontroll för anteckningar på arbetsflödeskort

Konversationer med `contentType: "workflowCard"` (anteckningarna på ett arbetsflödeskort, där `contentId` är kortets uppgifts-ID) kan endast läsas och skrivas av någon som kan öppna kortet. Det gäller en användare med DoingApi-behörigheten **Tasks / View**, eller personen eller gruppen som kortet är tilldelat, skapat av eller gäller. Alla andra får `401` på varje läsväg, inklusive de offentliga rutterna ovan. En konversation kopplas till kortet med `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`). Den första konversation som kopplas gäller. Anropet kan göras av kortets redigerare och dess tilldelade.

### Exempel: Starta en konversation

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Meddelanden

Basväg: `/messaging/messages`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | Hämta alla meddelanden i en konversation |
| GET | `/catchup/:churchId/:conversationId` | Offentlig | — | Hämta alla meddelanden i en konversation (offentlig uppdatering för livechatt) |
| GET | `/:churchId/:id` | Offentlig | — | Hämta ett enskilt meddelande med ID |
| POST | `/` | JWT | — | Spara meddelanden (batch). Skickar realtidsuppdateringar och utlöser aviseringar. Att uppdatera ett befintligt meddelande kräver att man är dess författare eller har `content.edit`. Den lagrade författaren kan aldrig ändras |
| POST | `/send` | Offentlig | — | Skicka meddelanden (batch, offentlig). Skickar realtidsuppdateringar via WebSocket och utlöser aviseringar |
| POST | `/setCallout` | JWT | — | (legacy) Sänder ett callout-meddelande i realtid. Ingen aktiv klient finns. Chatten i livesändningar visar inte längre callouts |
| DELETE | `/:churchId/:id` | JWT | — | Tar bort ett meddelande och sänder raderingen i realtid. Se [Moderering av meddelanden](#message-moderation) |

### Moderering av meddelanden

Ett meddelande får tas bort av:

- meddelandets författare;
- personal med `content.edit` (i hela församlingen);
- **gruppledare**, för konversationer med `contentType` `group` eller `groupAnnouncement` vars `contentId` är en grupp de leder (`leaderGroupIds` i JWT).

Konversationer för personanteckningar (`person` / `personConfidential`) modereras aldrig av ledare. De använder i stället anteckningsbehörigheterna (`people.edit`, `people.viewConfidentialNotes`).

Ledare får bara radera, inte redigera. Att skriva om en annan medlems meddelande är fortsatt begränsat till författaren och personal med `content.edit`.

### Exempel: Skicka ett meddelande

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
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
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Privata meddelanden

Basväg: `/messaging/privatemessages`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Hämta alla privata meddelanden för den aktuella användaren (inkluderar senaste meddelandet per konversation och markerar alla som lästa) |
| GET | `/existing/:personId` | JWT | — | Hitta en befintlig privat konversation med en specifik person |
| GET | `/:id` | JWT | — | Hämta ett privat meddelande med ID (rensar aviseringen om det är adresserat till den aktuella användaren) |
| POST | `/` | JWT | — | Skicka privata meddelanden (batch). Utlöser pushavisering till mottagaren |

## Aviseringar

Basväg: `/messaging/notifications`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | Hämta antalet olästa aviseringar för den aktuella användaren |
| GET | `/my` | JWT | — | Hämta alla aviseringar för den aktuella användaren (markerar alla som lästa) |
| GET | `/tmpEmail` | Offentlig | — | Utlös det dagliga e-postsammandraget av aviseringar (felsöknings- eller cron-slutpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Hämta aviseringar för en specifik person |
| GET | `/:churchId/:id` | JWT | — | Hämta en avisering med ID |
| POST | `/` | JWT | — | Skapa eller uppdatera aviseringar (batch) |
| POST | `/create` | JWT | — | Skapa aviseringar för flera personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markera alla aviseringar för en person som lästa |
| POST | `/sendTest` | JWT | — | Skicka en testpushavisering. Body: `{ personId, title }` |
| POST | `/ping` | Offentlig | — | Skapa en avisering från en extern utlösare. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Ta bort en avisering |

### Exempel: Skapa aviseringar

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Aviseringsinställningar

Basväg: `/messaging/notificationpreferences`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/categories` | JWT | — | Lista aviseringskategorier med deras standardkanaler och tillåtna kanaler |
| GET | `/my` | JWT | — | Hämta aviseringsinställningar för den aktuella användaren (skapar standardvärden automatiskt om inga finns) |
| POST | `/` | JWT | — | Spara den aktuella användarens inställningar. Body: valfri av `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, samt valfria `overrides: [{ categoryKey, channel, optedIn }]` (kanalen kan vara `push`, `email`, `in_app` eller `sms`; låsta kategorier ignoreras). `allowSms` är medlemmens samtycke till sms-påminnelser. En äldre body med en rad per inställning accepteras fortfarande |

## Anslutningar

Basväg: `/messaging/connections`

Hanterar WebSocket-anslutningar i realtid för chatt, gruppkonversationer, privata meddelanden och livesändningar. Se [Realtidsarkitektur](../../realtime.md) för det fullständiga protokollet.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:churchId/:conversationId` | Offentlig | — | Hämta alla anslutningar för en konversation |
| POST | `/` | Offentlig | — | Registrera anslutningar (batch). Utlöser en närvarosändning för konversationen. Objekt i body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Offentlig | — | Uppdatera visningsnamnet för en anslutning med socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Offentlig | — | Ta bort en anslutning från en konversation. Utlöser en närvarosändning |
| POST | `/tmpSendAlert` | Offentlig | — | Skicka en aviseringsvarning till en persons anslutningar. Body: `{ churchId, personId }` |

## Enheter

Basväg: `/messaging/devices`

Hanterar enhetsregistrering för pushaviseringar och parning av innehåll (t.ex. Lessons-appen på TV-skärmar).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| POST | `/enroll` | JWT | — | Registrera eller uppdatera en enhet (registrering för mobil push). Matchar på FCM-token eller enhets-ID |
| POST | `/enrollAnon` | Offentlig | — | Registrera en anonym enhet och skapa en parningskod med 4 tecken |
| POST | `/` | Offentlig | — | Spara enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Para en enhet med dess parningskod. Valfritt `?contentType=&contentId=` för att tilldela innehåll |
| GET | `/status/:deviceId` | Offentlig | — | Kontrollera parningsstatus för en enhet |
| GET | `/:churchId` | JWT | — | Hämta alla enheter för en församling |
| GET | `/:churchId/person/:personId` | JWT | — | Hämta alla enheter för en person |
| GET | `/:churchId/:id` | JWT | — | Hämta en enhet med ID |
| DELETE | `/:churchId/:id` | JWT | — | Ta bort en enhet |

### Exempel: Registrera en enhet

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Enhetsinnehåll

Basväg: `/messaging/devicecontents`

Hanterar innehållstilldelningar för parade enheter (t.ex. vilken lektion som visas på en TV).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/deviceId/:deviceId` | JWT | — | Hämta innehållstilldelningar för en enhet |
| POST | `/` | JWT | — | Spara innehållstilldelningar för enheter (batch) |
| DELETE | `/:id` | JWT | — | Ta bort en innehållstilldelning för en enhet |

## SMS

Basväg: `/messaging/texting`

Hanterar sms-leverantörer, gruppsms och uppföljning av leveranser.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/providers` | JWT | — | Hämta sms-leverantörer för församlingen (uppgifter är maskerade) |
| GET | `/status` | JWT | — | `{ enabled }`. Anger om församlingen har en aktiverad sms-leverantör. Gäller alla inloggade användare i församlingen och används för att bara visa alternativet **Text** när sms kan skickas |
| GET | `/inboundUrl` | JWT | `texting.send` eller `settings.edit` | `{ url }`. Församlingens webhook-URL för inkommande meddelanden (STOP) som ska klistras in hos leverantören |
| POST | `/inbound/:churchId/:token` | Offentlig | — | Webhook för inkommande meddelanden från leverantören. `token` är en HMAC av församlingens ID. Ett svar som exakt är ett stoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) markerar alla matchande personer som `optedOut` och stänger av deras `allowSms`. Returnerar `{ optedOut: <count> }`. Andra svar returnerar `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Förhandsgranska mottagare för ett gruppsms (antal berättigade, avregistrerade och utan telefonnummer) |
| GET | `/sent` | JWT | — | Hämta alla skickade sms-poster för församlingen |
| GET | `/sent/:id/details` | JWT | — | Hämta ett skickat sms med leveranslogg per mottagare |
| POST | `/providers` | JWT | — | Spara sms-leverantörer (batch). Krypterar API-uppgifter |
| POST | `/send` | JWT | — | Skicka ett sms till alla berättigade medlemmar i en grupp. Body: `{ groupId, message }`. Fältmallar (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ersätts för varje mottagare |
| POST | `/sendPerson` | JWT | — | Skicka ett sms till en enskild person. Body: `{ personId, phoneNumber, message }`. Fältmallar ersätts, och den ersatta texten är den som loggas |
| DELETE | `/providers/:id` | JWT | — | Ta bort en sms-leverantör |

### Exempel: Skicka ett gruppsms

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
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

Basväg: `/messaging/emailTemplates`

Hanterar återanvändbara e-postmallar och skickande av mallade e-postmeddelanden till grupper.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Hämta alla e-postmallar för församlingen |
| GET | `/:id` | JWT | — | Hämta en enskild e-postmall med ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` eller `tasks.admin` | Församlingens e-poststatus för grupper: `{ approved, paused, remaining, requested }`. Dialogrutan Skicka e-post i B1Admin och åtgärden **Skicka e-post** i arbetsflöden använder den för att varna när e-post inte kommer att skickas |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Be supporten godkänna församlingen för e-post till grupper (högst en gång per församling och vecka) |
| GET | `/preview/:groupId` | JWT | — | Förhandsgranska e-postleverans för en grupp (antal berättigade mottagare, medlemmar utan e-postadress) |
| POST | `/` | JWT | — | Skapa eller uppdatera e-postmallar (batch) |
| POST | `/send` | JWT | — | Skicka ett mallat e-postmeddelande till alla medlemmar i en grupp. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Ta bort en e-postmall |

### Exempel: Skicka e-post till en grupp

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
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

**Stödda fältmallar:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blockerade IP-adresser

Basväg: `/messaging/blockedips`

(legacy) IP-blockering för chatt i livesändningar. B1App-klienten anropar inte längre `POST /`. IP-blockering togs bort i migreringen till enhetlig leverans. Rutten `/clear` anropas fortfarande server-till-server av `StreamingServiceController` när streamingtjänster sparas.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| POST | `/` | JWT | — | (legacy) Spara blockerade IP-adresser (batch). Ingen aktiv klient finns |
| POST | `/clear` | JWT | — | Rensa alla blockerade IP-adresser för specifika tjänster. Body: `[{ serviceId, churchId }]` |

## Leveranslogg

Basväg: `/messaging/deliverylogs`

Följer leveransstatus för skickade meddelanden (sms, pushaviseringar och e-post).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | Hämta leveranslogg efter innehållstyp och ID |
| GET | `/person/:personId` | JWT | — | Hämta leveranslogg för en person. Valfria filter `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Hämta senaste leveranslogg för församlingen. Valfritt `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Hämta en leveranslogg med ID |

## Relaterade sidor

- [Realtidsarkitektur](../../realtime.md) -- WebSocket-protokoll, rumsprenumerationer och det enhetliga leveransramverket
- [Webbpushaviseringar](../../web-push.md) -- Registrering och leverans av webbläsarpush
- [Slutpunkter för medlemskap](./membership.md) -- Personer, grupper, roller och grundläggande identitet
- [Slutpunkter för närvaro](./attendance.md) -- Spårning av gudstjänster och besök
- [Autentisering och behörigheter](./authentication.md) -- Inloggningsflöde, JWT, OAuth och behörighetsmodell
- [Modulstruktur](../module-structure.md) -- Mönster för kodorganisation
