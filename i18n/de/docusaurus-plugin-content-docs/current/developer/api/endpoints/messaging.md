---
title: "Messaging-Endpunkte"
---

# Messaging-Endpunkte

<div class="article-intro">

Das Messaging-Modul verwaltet Echtzeit-Konversationen, Chat-Nachrichten, Push-Benachrichtigungen, SMS/E-Mail-Lieferung, WebSocket-Verbindungen, private Nachrichten, Geräte-Registrierung und SMS-Anbieter. Es bietet die Kommunikationsebene, die über alle ChurchApps-Anwendungen für Liveübertragungs-Chat und asynchrone Benachrichtigungen verwendet wird.

</div>

**Basis-Pfad:** `/messaging`

## Konversationen

Basis-Pfad: `/messaging/conversations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Load conversations by comma-separated IDs with first/last messages |
| GET | `/messages/:contentType/:contentId` | JWT | — | Load conversations for content with paginated messages (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Get post-type conversations for the current user's groups |
| GET | `/posts/group/:groupId` | JWT | — | Get post-type conversations for a specific group |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Get or create the current conversation for content (auto-decrypts contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Load conversations by content type and ID |
| GET | `/:churchId/:id` | Public | — | Load a single conversation by ID |
| POST | `/` | JWT | — | Create or update conversations (batch) |
| POST | `/start` | JWT | — | Start a new conversation with an initial comment message |
| DELETE | `/:churchId/:id` | JWT | — | Delete a conversation |

### Person notes access control

Konversationen mit `contentType: "person"` (die Registerkarte "Notizen" auf einem Personendatensatz) oder `contentType: "personConfidential"` (der Abschnitt "Vertrauliche Notizen") werden auf jedem Lese- und Schreibpfad gated, einschließlich der ansonsten öffentlichen Routen oben, die `401` für diese Inhaltstypen zurückgeben. `person` erfordert die MembershipApi **Personen / Bearbeiten** Berechtigung; `personConfidential` erfordert **Personen / Vertrauliche Notizen anzeigen**. Für begrenzte API-Schlüssel trägt `people:write` beide Aktionen (der Benutzer des Schlüssels muss die zugrunde liegende Rollenberechtigung immer noch halten).

### Beispiel: Konversation starten

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

## Nachrichten

Basis-Pfad: `/messaging/messages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Load all messages for a conversation |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Load all messages for a conversation (public catchup for live chat) |
| GET | `/:churchId/:id` | Public | — | Load a single message by ID |
| POST | `/` | JWT | — | Save messages (batch). Sends real-time updates and triggers notifications |
| POST | `/send` | Public | — | Send messages (batch, public). Sends real-time updates via WebSocket and triggers notifications |
| POST | `/setCallout` | JWT | — | (legacy) Broadcast a callout message in real time. No active client; live stream chat no longer renders callouts |
| DELETE | `/:churchId/:id` | JWT | — | Delete a message and broadcast the deletion in real time |

### Beispiel: Nachricht senden

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

## Private Nachrichten

Basis-Pfad: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Load all private messages for the current user (includes last message per conversation, marks all as read) |
| GET | `/existing/:personId` | JWT | — | Find an existing private conversation with a specific person |
| GET | `/:id` | JWT | — | Load a private message by ID (clears notification if addressed to current user) |
| POST | `/` | JWT | — | Send private messages (batch). Triggers push notification to recipient |

## Benachrichtigungen

Basis-Pfad: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Get unread notification count for the current user |
| GET | `/my` | JWT | — | Load all notifications for the current user (marks all as read) |
| GET | `/tmpEmail` | Public | — | Trigger daily email notification digest (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | Load notifications for a specific person |
| GET | `/:churchId/:id` | JWT | — | Load a notification by ID |
| POST | `/` | JWT | — | Create or update notifications (batch) |
| POST | `/create` | JWT | — | Create notifications for multiple people. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Mark all notifications as read for a person |
| POST | `/sendTest` | JWT | — | Send a test push notification. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Create a notification from an external trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Delete a notification |

### Beispiel: Benachrichtigungen erstellen

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

## Benachrichtigungs-Einstellungen

Basis-Pfad: `/messaging/notificationpreferences`

Erweitert Standard-CRUD. Die Basisklasse bietet POST `/` (create oder update, keine Berechtigung erforderlich).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Create or update notification preferences (from CRUD base class) |
| GET | `/my` | JWT | — | Load notification preferences for the current user (auto-creates defaults if none exist) |

## Verbindungen

Basis-Pfad: `/messaging/connections`

Verwaltet WebSocket/Echtzeit-Verbindungen für Chat, Gruppen-Konversationen, private Nachrichten und Liveübertragung. Siehe [Real-time-Architektur](../../realtime) für das End-to-End-Protokoll.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Load all connections for a conversation |
| POST | `/` | Public | — | Register connections (batch). Triggers an attendance broadcast on the conversation. Body items: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Update the display name for a connection by socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Drop a connection from a conversation. Triggers an attendance broadcast |
| POST | `/tmpSendAlert` | Public | — | Send a notification alert to a person's connections. Body: `{ churchId, personId }` |

## Geräte

Basis-Pfad: `/messaging/devices`

Verwaltet die Geräte-Registrierung für Push-Benachrichtigungen und Content-Pairing (z.B. Lessons-App auf TV-Displays).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Enroll or update a device (mobile push registration). Matches by FCM token or device ID |
| POST | `/enrollAnon` | Public | — | Enroll an anonymous device and generate a 4-character pairing code |
| POST | `/` | Public | — | Save devices (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Pair a device using its pairing code. Optional `?contentType=&contentId=` to assign content |
| GET | `/status/:deviceId` | Public | — | Check pairing status of a device |
| GET | `/:churchId` | JWT | — | Load all devices for a church |
| GET | `/:churchId/person/:personId` | JWT | — | Load all devices for a person |
| GET | `/:churchId/:id` | JWT | — | Load a device by ID |
| DELETE | `/:churchId/:id` | JWT | — | Delete a device |

### Beispiel: Gerät anmelden

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

## Gerät-Inhalte

Basis-Pfad: `/messaging/devicecontents`

Verwaltet Inhalt-Zuordnungen für gekoppelte Geräte (z.B. welche Lektion auf einem TV angezeigt wird).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Load content assignments for a device |
| POST | `/` | JWT | — | Save device content assignments (batch) |
| DELETE | `/:id` | JWT | — | Delete a device content assignment |

## SMS

Basis-Pfad: `/messaging/texting`

Verwaltet SMS-Texting-Anbieter, Gruppen-Textnachrichten und Lieferungs-Tracking.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Load texting providers for the church (credentials are masked) |
| GET | `/preview/:groupId` | JWT | — | Preview recipients for a group text (eligible, opted-out, no-phone counts) |
| GET | `/sent` | JWT | — | Load all sent text message records for the church |
| GET | `/sent/:id/details` | JWT | — | Load a sent text with per-recipient delivery logs |
| POST | `/providers` | JWT | — | Save texting providers (batch). Encrypts API credentials |
| POST | `/send` | JWT | — | Send an SMS to all eligible members of a group. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Send an SMS to a single person. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Delete a texting provider |

### Beispiel: Gruppen-Text senden

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

## Email-Vorlagen

Basis-Pfad: `/messaging/emailTemplates`

Verwaltet wiederverwendbare E-Mail-Vorlagen und das Senden von Template-E-Mails an Gruppen.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Load all email templates for the church |
| GET | `/:id` | JWT | — | Load a single email template by ID |
| GET | `/preview/:groupId` | JWT | — | Preview email delivery for a group (eligible recipient count, members with no email) |
| POST | `/` | JWT | — | Create or update email templates (batch) |
| POST | `/send` | JWT | — | Send a templated email to all members of a group. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Delete an email template |

### Beispiel: E-Mail an Gruppe senden

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

**Unterstützte Merge-Felder:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blockierte IPs

Basis-Pfad: `/messaging/blockedips`

(legacy) IP-Blockierung für Liveübertragung-Chat. Der B1App-Client ruft nicht mehr `POST /` auf -- IP-Blockierung wurde bei der vereinheitlichten Lieferungs-Migration entfernt. Die Rute `/clear` wird immer noch Server-zu-Server durch `StreamingServiceController` aufgerufen, wenn Übertragungsdienste gespeichert werden.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) Save blocked IPs (batch). No active client |
| POST | `/clear` | JWT | — | Clear all blocked IPs for specific services. Body: `[{ serviceId, churchId }]` |

## Lieferungs-Protokolle

Basis-Pfad: `/messaging/deliverylogs`

Verfolgt den Lieferungsstatus für gesendete Nachrichten (SMS, Push-Benachrichtigungen, E-Mail).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Load delivery logs by content type and ID |
| GET | `/person/:personId` | JWT | — | Load delivery logs for a person. Optional `?startDate=&endDate=` filters |
| GET | `/recent` | JWT | — | Load recent delivery logs for the church. Optional `?limit=` (default 100) |
| GET | `/:id` | JWT | — | Load a delivery log by ID |

## Verwandte Seiten

- [Real-time-Architektur](../../realtime) -- WebSocket-Protokoll, Zimmer-Abonnements und das vereinheitlichte Liefererwerk
- [Web-Push-Benachrichtigungen](../../web-push) -- Browser-Push-Anmeldung und Lieferung
- [Membership-Endpunkte](./membership) -- Personen, Gruppen, Rollen und Kern-Identität
- [Attendance-Endpunkte](./attendance) -- Service- und Besuchs-Verfolgung
- [Authentifizierung & Berechtigungen](./authentication) -- Anmelde-Fluss, JWT, OAuth, Berechtigungs-Modell
- [Modul-Struktur](../module-structure) -- Code-Organisationsmuster
