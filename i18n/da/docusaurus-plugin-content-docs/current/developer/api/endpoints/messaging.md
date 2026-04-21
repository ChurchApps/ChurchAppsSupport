---
title: "Messaging-endpoints"
---

# Messaging-endpoints

<div class="article-intro">

Messaging-modulet administrerer realtidssamtaler, chatbeskeder, push-meddelelser, SMS/e-mail-levering, WebSocket-forbindelser, private beskeder, enhedsregistrering og SMS-udbydere. Det leverer kommunikationslaget, der bruges på tværs af alle ChurchApps-applikationer til både live-streaming chat og asynkrone meddelelser.

</div>

**Basesti:** `/messaging`

## Samtaler

Basesti: `/messaging/conversations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Indlæs samtaler efter komma-separerede ID'er med første/sidste beskeder |
| GET | `/messages/:contentType/:contentId` | JWT | — | Indlæs samtaler til indhold med pagineerede beskeder (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent post-type samtaler for nuværende brugers grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent post-type samtaler for en bestemt gruppe |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Hent eller opret den nuværende samtale for indhold (auto-dekrypterer contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Indlæs samtaler efter indholdstype og ID |
| GET | `/:churchId/:id` | Public | — | Indlæs en enkelt samtale efter ID |
| POST | `/` | JWT | — | Opret eller opdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en initial comment-besked |
| DELETE | `/:churchId/:id` | JWT | — | Slet en samtale |

### Eksempel: Start en samtale

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

## Beskeder

Basesti: `/messaging/messages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Indlæs alle beskeder for en samtale |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Indlæs alle beskeder for en samtale (offentlig catch-up til live chat) |
| GET | `/:churchId/:id` | Public | — | Indlæs en enkelt besked efter ID |
| POST | `/` | JWT | — | Gem beskeder (batch). Sender realtidsopdateringer og udløser meddelelser |
| POST | `/send` | Public | — | Send beskeder (batch, offentlig). Sender realtidsopdateringer via WebSocket og udløser meddelelser |
| POST | `/setCallout` | JWT | — | Udsend en callout-besked til en samtale i realtid |
| DELETE | `/:churchId/:id` | JWT | — | Slet en besked og udsend sletningen i realtid |

### Eksempel: Send en besked

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

## Private beskeder

Basesti: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Indlæs alle private beskeder for nuværende bruger (inkluderer sidste besked per samtale, markerer alt som læst) |
| GET | `/existing/:personId` | JWT | — | Find en eksisterende privat samtale med en bestemt person |
| GET | `/:id` | JWT | — | Indlæs en privat besked efter ID (rydder meddelelse, hvis adresseret til nuværende bruger) |
| POST | `/` | JWT | — | Send private beskeder (batch). Udløser push-meddelelse til modtager |

## Meddelelser

Basesti: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Hent ulæst meddelelsesantal for nuværende bruger |
| GET | `/my` | JWT | — | Indlæs alle meddelelser for nuværende bruger (markerer alt som læst) |
| GET | `/tmpEmail` | Public | — | Udløs daglig e-mail-meddelelsessammendrag (debug/cron-endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Indlæs meddelelser for en bestemt person |
| GET | `/:churchId/:id` | JWT | — | Indlæs en meddelelse efter ID |
| POST | `/` | JWT | — | Opret eller opdater meddelelser (batch) |
| POST | `/create` | JWT | — | Opret meddelelser for flere mennesker. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markér alle meddelelser som læst for en person |
| POST | `/sendTest` | JWT | — | Send en test push-meddelelse. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Opret en meddelelse fra en ekstern udløser. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Slet en meddelelse |

### Eksempel: Opret meddelelser

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

## Meddelelsesindstillinger

Basesti: `/messaging/notificationpreferences`

Udvider standard CRUD. Basisklassen leverer POST `/` (opret eller opdater, ingen tilladelse påkrævet).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Opret eller opdater meddelelsesindstillinger (fra CRUD-basisklasse) |
| GET | `/my` | JWT | — | Indlæs meddelelsesindstillinger for nuværende bruger (auto-opretter standardindstillinger, hvis ingen findes) |

## Forbindelser

Basesti: `/messaging/connections`

Administrerer WebSocket/realtidsforbindelser til live-streaming chat.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Indlæs alle forbindelser for en samtale |
| POST | `/` | Public | — | Registrer forbindelser (batch). Auto-nummererer anonyme brugere og sender opdateringer til tilstedeværelse/blokerede IP'er |
| POST | `/setName` | Public | — | Opdater visningsnavnet for en forbindelse efter socket-ID. Body: `{ socketId, name }` |
| POST | `/tmpSendAlert` | Public | — | Send en meddelelsesalert til en persons forbindelser. Body: `{ churchId, personId }` |

## Enheder

Basesti: `/messaging/devices`

Administrerer enhedsregistrering til push-meddelelser og indholdsparring (f.eks. Lessons-app på TV-displays).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Tilmeld eller opdater en enhed (mobil push-registrering). Matcher efter FCM-token eller enhed-ID |
| POST | `/enrollAnon` | Public | — | Tilmeld en anonym enhed og generer en 4-tegns paringskode |
| POST | `/` | Public | — | Gem enheder (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Par en enhed ved hjælp af dens paringskode. Valgfrit `?contentType=&contentId=` for at tildele indhold |
| GET | `/status/:deviceId` | Public | — | Kontroller paringstatus for en enhed |
| GET | `/:churchId` | JWT | — | Indlæs alle enheder for en kirke |
| GET | `/:churchId/person/:personId` | JWT | — | Indlæs alle enheder for en person |
| GET | `/:churchId/:id` | JWT | — | Indlæs en enhed efter ID |
| DELETE | `/:churchId/:id` | JWT | — | Slet en enhed |

### Eksempel: Tilmeld en enhed

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Enhedsindhold

Basesti: `/messaging/devicecontents`

Administrerer indholdstildelinger for parrede enheder (f.eks. hvilken lektion der vises på et TV).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Indlæs indholdstildelinger for en enhed |
| POST | `/` | JWT | — | Gem enhedsindholdssamtidertildelinger (batch) |
| DELETE | `/:id` | JWT | — | Slet en enhedsindholdssamtiderl |

## SMS'er

Basesti: `/messaging/texting`

Administrerer SMS-tekstudbydere, grupp-SMS-beskedsystem og leveringssporing.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Indlæs SMS-udbydere for kirken (legitimationsoplysninger maskeres) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvisning af modtagere for en grupp-SMS (berettiget, opt-out, ingen telefonnummer telle) |
| GET | `/sent` | JWT | — | Indlæs alle sendte SMS-poster for kirken |
| GET | `/sent/:id/details` | JWT | — | Indlæs en sendt SMS med leveringslogge per modtager |
| POST | `/providers` | JWT | — | Gem SMS-udbydere (batch). Krypterer API-legitimationsoplysninger |
| POST | `/send` | JWT | — | Send en SMS til alle berettigede medlemmer af en gruppe. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Send en SMS til en enkelt person. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Slet en SMS-udbyder |

### Eksempel: Send grupp-SMS

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

## E-mail-skabeloner

Basesti: `/messaging/emailTemplates`

Administrerer genbrugelige e-mail-skabeloner og sending af skabloniserede e-mails til grupper.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Indlæs alle e-mail-skabeloner for kirken |
| GET | `/:id` | JWT | — | Indlæs en enkelt e-mail-skabelon efter ID |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvisning af e-mail-levering for en gruppe (berettiget modtagertal, medlemmer uden e-mail) |
| POST | `/` | JWT | — | Opret eller opdater e-mail-skabeloner (batch) |
| POST | `/send` | JWT | — | Send en skabloniseret e-mail til alle medlemmer af en gruppe. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Slet en e-mail-skabelon |

### Eksempel: Send e-mail til gruppe

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

**Understøttede fletningsfelter:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blokerede IP'er

Basesti: `/messaging/blockedips`

Administrerer IP-blokering til live-streaming chat-samtaler.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Gem blokerede IP'er (batch). Udsender opdateret blokerliste til samtalen |
| POST | `/clear` | JWT | — | Ryd alle blokerede IP'er for specifikke tjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogge

Basesti: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte beskeder (SMS, push-meddelelser, e-mail).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Indlæs leveringslogge efter indholdstype og ID |
| GET | `/person/:personId` | JWT | — | Indlæs leveringslogge for en person. Valgfrit `?startDate=&endDate=` filtre |
| GET | `/recent` | JWT | — | Indlæs seneste leveringslogge for kirken. Valgfrit `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Indlæs en leveringslog efter ID |

## Relaterede sider

- [Medlemskabsendpoints](./membership) -- Mennesker, grupper, roller og kernidentitet
- [Deltagelsesendpoints](./attendance) -- Service- og besøgssporing
- [Godkendelse og tilladelser](./authentication) — Login flow, JWT, OAuth, tilladelsesmodel
- [Modulstruktur](../module-structure) -- Kodeorganiseringsmønstre
