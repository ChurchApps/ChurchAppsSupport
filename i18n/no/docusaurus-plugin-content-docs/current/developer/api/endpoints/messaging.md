---
title: "Messaging-endepunkter"
---

# Messaging-endepunkter

<div class="article-intro">

Messaging-modulen administrerer sanntidssamtaler, chatmeldinger, push-varsler, SMS/e-postlevering, WebSocket-tilkoblinger, private meldinger, enhetsregistrering og tekstmeldingsleverandører. Den tilbyr kommunikasjonslaget som brukes på tvers av alle ChurchApps-applikasjoner for både direktestrømmingschat og asynkrone varsler.

</div>

**Basissti:** `/messaging`

## Samtaler

Basissti: `/messaging/conversations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Last samtaler etter kommaseparerte ID-er med første/siste meldinger |
| GET | `/messages/:contentType/:contentId` | JWT | — | Last samtaler for innhold med paginerte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent innleggstype-samtaler for gjeldende brukers grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent innleggstype-samtaler for en spesifikk gruppe |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Hent eller opprett gjeldende samtale for innhold (dekrypterer contentId automatisk) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Last samtaler etter innholdstype og ID |
| GET | `/:churchId/:id` | Public | — | Last en enkelt samtale etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater samtaler (batch) |
| POST | `/start` | JWT | — | Start en ny samtale med en innledende kommentarmelding |
| DELETE | `/:churchId/:id` | JWT | — | Slett en samtale |

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

## Meldinger

Basissti: `/messaging/messages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Last alle meldinger for en samtale |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Last alle meldinger for en samtale (offentlig innhenting for direktechat) |
| GET | `/:churchId/:id` | Public | — | Last en enkelt melding etter ID |
| POST | `/` | JWT | — | Lagre meldinger (batch). Sender sanntidsoppdateringer og utløser varsler |
| POST | `/send` | Public | — | Send meldinger (batch, offentlig). Sender sanntidsoppdateringer via WebSocket og utløser varsler |
| POST | `/setCallout` | JWT | — | Kringkast en fremhevingsmelding til en samtale i sanntid |
| DELETE | `/:churchId/:id` | JWT | — | Slett en melding og kringkast slettingen i sanntid |

### Eksempel: Send en melding

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

## Private meldinger

Basissti: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Last alle private meldinger for gjeldende bruker (inkluderer siste melding per samtale, markerer alle som lest) |
| GET | `/existing/:personId` | JWT | — | Finn en eksisterende privat samtale med en spesifikk person |
| GET | `/:id` | JWT | — | Last en privat melding etter ID (fjerner varsel hvis adressert til gjeldende bruker) |
| POST | `/` | JWT | — | Send private meldinger (batch). Utløser push-varsel til mottaker |

## Varsler

Basissti: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Hent antall uleste varsler for gjeldende bruker |
| GET | `/my` | JWT | — | Last alle varsler for gjeldende bruker (markerer alle som lest) |
| GET | `/tmpEmail` | Public | — | Utløs daglig e-postvarselsammendrag (feilsøking/cron-endepunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Last varsler for en spesifikk person |
| GET | `/:churchId/:id` | JWT | — | Last et varsel etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater varsler (batch) |
| POST | `/create` | JWT | — | Opprett varsler for flere personer. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marker alle varsler som lest for en person |
| POST | `/sendTest` | JWT | — | Send et test-push-varsel. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Opprett et varsel fra en ekstern utløser. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Slett et varsel |

### Eksempel: Opprett varsler

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

## Varslingsinnstillinger

Basissti: `/messaging/notificationpreferences`

Utvider standard CRUD. Baseklassen tilbyr POST `/` (opprett eller oppdater, ingen tillatelse kreves).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Opprett eller oppdater varslingsinnstillinger (fra CRUD-baseklassen) |
| GET | `/my` | JWT | — | Last varslingsinnstillinger for gjeldende bruker (oppretter standardverdier automatisk hvis ingen finnes) |

## Tilkoblinger

Basissti: `/messaging/connections`

Administrerer WebSocket-/sanntidstilkoblinger for direktestrømmingschat.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Last alle tilkoblinger for en samtale |
| POST | `/` | Public | — | Registrer tilkoblinger (batch). Nummererer anonyme brukere automatisk og sender oppmøte-/blokkert IP-oppdateringer |
| POST | `/setName` | Public | — | Oppdater visningsnavnet for en tilkobling etter socket-ID. Body: `{ socketId, name }` |
| POST | `/tmpSendAlert` | Public | — | Send et varslingsalert til en persons tilkoblinger. Body: `{ churchId, personId }` |

## Enheter

Basissti: `/messaging/devices`

Administrerer enhetsregistrering for push-varsler og innholdsparing (f.eks. Lessons-appen på TV-skjermer).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registrer eller oppdater en enhet (mobil push-registrering). Matcher etter FCM-token eller enhets-ID |
| POST | `/enrollAnon` | Public | — | Registrer en anonym enhet og generer en 4-tegns paringskode |
| POST | `/` | Public | — | Lagre enheter (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Par en enhet ved hjelp av paringskoden. Valgfritt `?contentType=&contentId=` for å tilordne innhold |
| GET | `/status/:deviceId` | Public | — | Sjekk paringsstatus for en enhet |
| GET | `/:churchId` | JWT | — | Last alle enheter for en kirke |
| GET | `/:churchId/person/:personId` | JWT | — | Last alle enheter for en person |
| GET | `/:churchId/:id` | JWT | — | Last en enhet etter ID |
| DELETE | `/:churchId/:id` | JWT | — | Slett en enhet |

### Eksempel: Registrer en enhet

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

## Enhetsinnhold

Basissti: `/messaging/devicecontents`

Administrerer innholdstilordninger for parede enheter (f.eks. hvilken leksjon som vises på en TV).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Last innholdstilordninger for en enhet |
| POST | `/` | JWT | — | Lagre enhetsinnholdstilordninger (batch) |
| DELETE | `/:id` | JWT | — | Slett en enhetsinnholdstilordning |

## Tekstmeldinger

Basissti: `/messaging/texting`

Administrerer SMS-tekstmeldingsleverandører, gruppemelding og leveringssporing.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Last tekstmeldingsleverandører for kirken (legitimasjon er maskert) |
| GET | `/preview/:groupId` | JWT | — | Forhåndsvis mottakere for en gruppemelding (kvalifiserte, avmeldte, uten-telefon-antall) |
| GET | `/sent` | JWT | — | Last alle sendte tekstmeldingsoppføringer for kirken |
| GET | `/sent/:id/details` | JWT | — | Last en sendt tekst med leveringslogger per mottaker |
| POST | `/providers` | JWT | — | Lagre tekstmeldingsleverandører (batch). Krypterer API-legitimasjon |
| POST | `/send` | JWT | — | Send en SMS til alle kvalifiserte medlemmer av en gruppe. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Send en SMS til en enkelt person. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Slett en tekstmeldingsleverandør |

### Eksempel: Send gruppemelding

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

## Blokkerte IP-er

Basissti: `/messaging/blockedips`

Administrerer IP-blokkering for direktestrømmingschat-samtaler.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Lagre blokkerte IP-er (batch). Kringkaster oppdatert blokkeringsliste til samtalen |
| POST | `/clear` | JWT | — | Fjern alle blokkerte IP-er for spesifikke tjenester. Body: `[{ serviceId, churchId }]` |

## Leveringslogger

Basissti: `/messaging/deliverylogs`

Sporer leveringsstatus for sendte meldinger (SMS, push-varsler, e-post).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Last leveringslogger etter innholdstype og ID |
| GET | `/person/:personId` | JWT | — | Last leveringslogger for en person. Valgfrie `?startDate=&endDate=`-filtre |
| GET | `/recent` | JWT | — | Last nylige leveringslogger for kirken. Valgfri `?limit=` (standard 100) |
| GET | `/:id` | JWT | — | Last en leveringslogg etter ID |

## Relaterte sider

- [Membership-endepunkter](./membership) -- Personer, grupper, roller og kjerneidentitet
- [Attendance-endepunkter](./attendance) -- Gudstjeneste- og besøkssporing
- [Autentisering og tillatelser](./authentication) -- Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) -- Kodeorganiseringsmønstre
