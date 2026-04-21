---
title: "Messaging Endpoints"
---

# Messaging Endpoints

<div class="article-intro">

De Messaging module beheert real-time gesprekken, chatberichten, push-meldingen, SMS/e-mail-bezorging, WebSocket-verbindingen, privéberichten, apparaatregistratie en tekstproviders. Het biedt de communicatielaag die in alle ChurchApps-applicaties wordt gebruikt voor zowel live streaming-chat als asynchrone meldingen.

</div>

**Base path:** `/messaging`

## Gesprekken

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Gesprekken laden op kommagescheiden ID's met eerste/laatste berichten |
| GET | `/messages/:contentType/:contentId` | JWT | — | Gesprekken voor inhoud laden met gepagineerde berichten (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Post-type-gesprekken voor groepen van huidige gebruiker ophalen |
| GET | `/posts/group/:groupId` | JWT | — | Post-type-gesprekken voor een specifieke groep ophalen |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Huidig gesprek voor inhoud ophalen of aanmaken (ontsleutelt automatisch contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Gesprekken op inhoudtype en ID laden |
| GET | `/:churchId/:id` | Public | — | Een enkel gesprek op ID laden |
| POST | `/` | JWT | — | Gesprekken maken of bijwerken (batch) |
| POST | `/start` | JWT | — | Een nieuw gesprek met een initieel opmerking-bericht starten |
| DELETE | `/:churchId/:id` | JWT | — | Een gesprek verwijderen |

### Voorbeeld: Een Gesprek Starten

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

## Berichten

Base path: `/messaging/messages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Alle berichten voor een gesprek laden |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Alle berichten voor een gesprek laden (openbare inhaalronde voor live chat) |
| GET | `/:churchId/:id` | Public | — | Een enkel bericht op ID laden |
| POST | `/` | JWT | — | Berichten opslaan (batch). Verzendt real-time updates en triggert meldingen |
| POST | `/send` | Public | — | Berichten verzenden (batch, openbaar). Verzendt real-time updates via WebSocket en triggert meldingen |
| POST | `/setCallout` | JWT | — | Een oproepbericht naar een gesprek uitzenden in real-time |
| DELETE | `/:churchId/:id` | JWT | — | Een bericht verwijderen en de verwijdering in real-time uitzenden |

### Voorbeeld: Een Bericht Verzenden

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

## Privéberichten

Base path: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle privéberichten voor huidige gebruiker laden (inclusief laatste bericht per gesprek, markeert alle als gelezen) |
| GET | `/existing/:personId` | JWT | — | Een bestaand privé-gesprek met een specifieke persoon zoeken |
| GET | `/:id` | JWT | — | Een privébericht op ID laden (wist melding als gericht aan huidige gebruiker) |
| POST | `/` | JWT | — | Privéberichten verzenden (batch). Triggert push-melding naar ontvanger |

## Meldingen

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Aantal ongelezen meldingen voor huidige gebruiker ophalen |
| GET | `/my` | JWT | — | Alle meldingen voor huidige gebruiker laden (markeert alle als gelezen) |
| GET | `/tmpEmail` | Public | — | Dagelijkse e-mailmeldingssamenvattingstreggeren (debug-/cron-eindpunt) |
| GET | `/:churchId/person/:personId` | JWT | — | Meldingen voor een specifieke persoon laden |
| GET | `/:churchId/:id` | JWT | — | Een melding op ID laden |
| POST | `/` | JWT | — | Meldingen maken of bijwerken (batch) |
| POST | `/create` | JWT | — | Meldingen voor meerdere personen aanmaken. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Alle meldingen voor een persoon als gelezen markeren |
| POST | `/sendTest` | JWT | — | Een test-push-melding verzenden. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Een melding van een externe trigger aanmaken. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Een melding verwijderen |

### Voorbeeld: Meldingen Aanmaken

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

## Meldingsvoorkeuren

Base path: `/messaging/notificationpreferences`

Breidt standaard CRUD uit. De basisklasse biedt POST `/` (maken of bijwerken, geen machtiging vereist).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Meldingsvoorkeuren maken of bijwerken (van CRUD-basisklasse) |
| GET | `/my` | JWT | — | Meldingsvoorkeuren voor huidige gebruiker laden (maakt automatisch standaarden aan als deze niet bestaan) |

## Verbindingen

Base path: `/messaging/connections`

Beheert WebSocket-/real-time-verbindingen voor live streaming-chat.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Alle verbindingen voor een gesprek laden |
| POST | `/` | Public | — | Verbindingen registreren (batch). Nummert anonieme gebruikers automatisch en verzendt aanwezigheids-/geblokkeerde IP-updates |
| POST | `/setName` | Public | — | Weergavenaam voor een verbinding op socket-ID bijwerken. Body: `{ socketId, name }` |
| POST | `/tmpSendAlert` | Public | — | Een meldingswaarschuwing naar verbindingen van een persoon verzenden. Body: `{ churchId, personId }` |

## Apparaten

Base path: `/messaging/devices`

Beheert apparaatregistratie voor push-meldingen en inhoudscoppelaing (bijv. Lessons-app op TV-displays).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Een apparaat inschrijven of bijwerken (mobiele push-registratie). Komt overeen met FCM-token of apparaat-ID |
| POST | `/enrollAnon` | Public | — | Een anoniem apparaat inschrijven en een 4-tekenige koppelingscode genereren |
| POST | `/` | Public | — | Apparaten opslaan (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Een apparaat koppelen met behulp van de koppelingscode. Optioneel `?contentType=&contentId=` voor inhoudsopdrachtgering |
| GET | `/status/:deviceId` | Public | — | Koppelingstatus van een apparaat controleren |
| GET | `/:churchId` | JWT | — | Alle apparaten voor een kerk laden |
| GET | `/:churchId/person/:personId` | JWT | — | Alle apparaten voor een persoon laden |
| GET | `/:churchId/:id` | JWT | — | Een apparaat op ID laden |
| DELETE | `/:churchId/:id` | JWT | — | Een apparaat verwijderen |

### Voorbeeld: Een Apparaat Inschrijven

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

## Apparaatinhoud

Base path: `/messaging/devicecontents`

Beheert inhoudsopdrachtgeringen voor gekoppelde apparaten (bijv. welke les op een TV wordt weergegeven).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Inhoudsopdrachtgeringen voor een apparaat laden |
| POST | `/` | JWT | — | Apparaatinhoudopdrachtgeringen opslaan (batch) |
| DELETE | `/:id` | JWT | — | Een apparaatinhoudopdracht verwijderen |

## Texten

Base path: `/messaging/texting`

Beheert SMS-tekstingproviders, groepstekstbericht en bezorgingstracking.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Tekstingsproviders voor de kerk laden (gegevens zijn gemaskeerd) |
| GET | `/preview/:groupId` | JWT | — | Ontvangers voor een groepstekst voorvertonen (in aanmerking komend, opt-out, geen telefoontellen) |
| GET | `/sent` | JWT | — | Alle verzonden tekstberichtrecords voor de kerk laden |
| GET | `/sent/:id/details` | JWT | — | Een verzonden tekst met per-ontvanger-bezorgingslogs laden |
| POST | `/providers` | JWT | — | Tekstingsproviders opslaan (batch). Versleutelt API-gegevens |
| POST | `/send` | JWT | — | Een SMS naar alle in aanmerking komende leden van een groep verzenden. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Een SMS naar een enkele persoon verzenden. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Een tekstingsprovider verwijderen |

### Voorbeeld: Groepstekst Verzenden

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

## E-mailsjablonen

Base path: `/messaging/emailTemplates`

Beheert herbruikbare e-mailsjablonen en het verzenden van sjablone-mails naar groepen.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle e-mailsjablonen voor de kerk laden |
| GET | `/:id` | JWT | — | Een enkel e-mailsjabloon op ID laden |
| GET | `/preview/:groupId` | JWT | — | E-mailbezorging voor een groep voorvertonen (in aanmerking komend ontvangersaantal, leden zonder e-mail) |
| POST | `/` | JWT | — | E-mailsjablonen maken of bijwerken (batch) |
| POST | `/send` | JWT | — | Een sjablone-mail naar alle leden van een groep verzenden. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Een e-mailsjabloon verwijderen |

### Voorbeeld: E-mail naar Groep Verzenden

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

**Ondersteunde mergevelden:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Geblokkeerde IP's

Base path: `/messaging/blockedips`

Beheert IP-blokkering voor live streaming-chatgesprekken.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Geblokkeerde IP's opslaan (batch). Zendt bijgewerkte bloklijst naar het gesprek |
| POST | `/clear` | JWT | — | Alle geblokkeerde IP's voor bepaalde services wissen. Body: `[{ serviceId, churchId }]` |

## Bezorgingslogs

Base path: `/messaging/deliverylogs`

Volgt bezorgingsstatus voor verzonden berichten (SMS, push-meldingen, e-mail) bij.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Bezorgingslogs op inhoudtype en ID laden |
| GET | `/person/:personId` | JWT | — | Bezorgingslogs voor een persoon laden. Optioneel `?startDate=&endDate=` filters |
| GET | `/recent` | JWT | — | Recente bezorgingslogs voor de kerk laden. Optioneel `?limit=` (standaard 100) |
| GET | `/:id` | JWT | — | Een bezorgingslog op ID laden |

## Gerelateerde Pagina's

- [Membership Endpoints](./membership) -- Personen, groepen, rollen en kernidentiteit
- [Attendance Endpoints](./attendance) -- Service- en bezoektracking
- [Authentication & Permissions](./authentication) -- Loginflow, JWT, OAuth, machtigingsmodel
- [Module Structure](../module-structure) -- Codeorganisatiepatronen
