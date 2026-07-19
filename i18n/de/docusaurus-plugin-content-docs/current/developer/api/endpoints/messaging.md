---
title: "Messaging-Endpunkte"
---

# Messaging-Endpunkte

<div class="article-intro">

Das Messaging-Modul verwaltet Echtzeit-Gespräche, Chat-Nachrichten, Push-Benachrichtigungen, SMS-/E-Mail-Zustellung, WebSocket-Verbindungen, private Nachrichten, Geräteregistrierung und Texting-Anbieter. Es bietet die Kommunikationsschicht, die in allen ChurchApps-Anwendungen sowohl für Live-Streaming-Chat als auch für asynchrone Benachrichtigungen verwendet wird.

</div>

**Basis-Pfad:** `/messaging`

## Gespräche

Basis-Pfad: `/messaging/conversations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Gespräche anhand von kommagetrennten IDs laden, inklusive erster/letzter Nachrichten |
| GET | `/messages/:contentType/:contentId` | JWT | — | Gespräche für Inhalte mit paginierten Nachrichten laden (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Post-Typ-Gespräche für die Gruppen des aktuellen Benutzers abrufen |
| GET | `/posts/group/:groupId` | JWT | — | Post-Typ-Gespräche für eine bestimmte Gruppe abrufen |
| GET | `/current/:churchId/:contentType/:contentId` | Öffentlich | — | Das aktuelle Gespräch für Inhalte abrufen oder erstellen (entschlüsselt contentId automatisch) |
| GET | `/:churchId/:contentType/:contentId` | Öffentlich | — | Gespräche nach Inhaltstyp und ID laden |
| GET | `/:churchId/:id` | Öffentlich | — | Ein einzelnes Gespräch anhand der ID laden |
| POST | `/` | JWT | — | Gespräche erstellen oder aktualisieren (Batch) |
| POST | `/start` | JWT | — | Ein neues Gespräch mit einer ersten Kommentarnachricht starten |
| DELETE | `/:churchId/:id` | JWT | — | Ein Gespräch löschen |

### Beispiel: Ein Gespräch starten

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

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Alle Nachrichten für ein Gespräch laden |
| GET | `/catchup/:churchId/:conversationId` | Öffentlich | — | Alle Nachrichten für ein Gespräch laden (öffentliches Catchup für Live-Chat) |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Nachricht anhand der ID laden |
| POST | `/` | JWT | — | Nachrichten speichern (Batch). Sendet Echtzeit-Updates und löst Benachrichtigungen aus |
| POST | `/send` | Öffentlich | — | Nachrichten senden (Batch, öffentlich). Sendet Echtzeit-Updates per WebSocket und löst Benachrichtigungen aus |
| POST | `/setCallout` | JWT | — | (veraltet) Eine Callout-Nachricht in Echtzeit übertragen. Kein aktiver Client; der Live-Stream-Chat rendert keine Callouts mehr |
| DELETE | `/:churchId/:id` | JWT | — | Eine Nachricht löschen und die Löschung in Echtzeit übertragen |

### Beispiel: Eine Nachricht senden

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

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle privaten Nachrichten für den aktuellen Benutzer laden (enthält die letzte Nachricht je Gespräch, markiert alle als gelesen) |
| GET | `/existing/:personId` | JWT | — | Ein bestehendes privates Gespräch mit einer bestimmten Person finden |
| GET | `/:id` | JWT | — | Eine private Nachricht anhand der ID laden (löscht die Benachrichtigung, falls sie an den aktuellen Benutzer adressiert ist) |
| POST | `/` | JWT | — | Private Nachrichten senden (Batch). Löst eine Push-Benachrichtigung an den Empfänger aus |

## Benachrichtigungen

Basis-Pfad: `/messaging/notifications`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Anzahl ungelesener Benachrichtigungen für den aktuellen Benutzer abrufen |
| GET | `/my` | JWT | — | Alle Benachrichtigungen für den aktuellen Benutzer laden (markiert alle als gelesen) |
| GET | `/tmpEmail` | Öffentlich | — | Tägliche E-Mail-Benachrichtigungs-Zusammenfassung auslösen (Debug-/Cron-Endpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Benachrichtigungen für eine bestimmte Person laden |
| GET | `/:churchId/:id` | JWT | — | Eine Benachrichtigung anhand der ID laden |
| POST | `/` | JWT | — | Benachrichtigungen erstellen oder aktualisieren (Batch) |
| POST | `/create` | JWT | — | Benachrichtigungen für mehrere Personen erstellen. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Alle Benachrichtigungen für eine Person als gelesen markieren |
| POST | `/sendTest` | JWT | — | Eine Test-Push-Benachrichtigung senden. Body: `{ personId, title }` |
| POST | `/ping` | Öffentlich | — | Eine Benachrichtigung aus einem externen Trigger erstellen. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Eine Benachrichtigung löschen |

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

Erweitert das Standard-CRUD. Die Basisklasse stellt POST `/` bereit (Erstellen oder Aktualisieren, keine Berechtigung erforderlich).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Benachrichtigungs-Einstellungen erstellen oder aktualisieren (aus der CRUD-Basisklasse) |
| GET | `/my` | JWT | — | Benachrichtigungs-Einstellungen für den aktuellen Benutzer laden (erzeugt automatisch Standardwerte, falls keine vorhanden sind) |

## Verbindungen

Basis-Pfad: `/messaging/connections`

Verwaltet WebSocket-/Echtzeit-Verbindungen für Chat, Gruppengespräche, private Nachrichten und Live-Streaming. Siehe [Echtzeit-Architektur](../../realtime) für das End-to-End-Protokoll.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Öffentlich | — | Alle Verbindungen für ein Gespräch laden |
| POST | `/` | Öffentlich | — | Verbindungen registrieren (Batch). Löst eine Anwesenheits-Übertragung für das Gespräch aus. Body-Elemente: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Öffentlich | — | Den Anzeigenamen für eine Verbindung anhand der Socket-ID aktualisieren. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Öffentlich | — | Eine Verbindung aus einem Gespräch entfernen. Löst eine Anwesenheits-Übertragung aus |
| POST | `/tmpSendAlert` | Öffentlich | — | Eine Benachrichtigungswarnung an die Verbindungen einer Person senden. Body: `{ churchId, personId }` |

## Geräte

Basis-Pfad: `/messaging/devices`

Verwaltet die Geräteregistrierung für Push-Benachrichtigungen und Inhalts-Kopplung (z. B. die Lessons-App auf TV-Displays).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Ein Gerät registrieren oder aktualisieren (Mobile-Push-Registrierung). Abgleich per FCM-Token oder Geräte-ID |
| POST | `/enrollAnon` | Öffentlich | — | Ein anonymes Gerät registrieren und einen 4-stelligen Kopplungscode generieren |
| POST | `/` | Öffentlich | — | Geräte speichern (Batch) |
| GET | `/pair/:pairingCode` | JWT | — | Ein Gerät anhand seines Kopplungscodes koppeln. Optional `?contentType=&contentId=`, um Inhalte zuzuweisen |
| GET | `/status/:deviceId` | Öffentlich | — | Kopplungsstatus eines Geräts prüfen |
| GET | `/:churchId` | JWT | — | Alle Geräte einer Kirche laden |
| GET | `/:churchId/person/:personId` | JWT | — | Alle Geräte einer Person laden |
| GET | `/:churchId/:id` | JWT | — | Ein Gerät anhand der ID laden |
| DELETE | `/:churchId/:id` | JWT | — | Ein Gerät löschen |

### Beispiel: Ein Gerät registrieren

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

## Geräte-Inhalte

Basis-Pfad: `/messaging/devicecontents`

Verwaltet die Inhaltszuweisungen für gekoppelte Geräte (z. B. welche Lektion auf einem TV angezeigt wird).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Inhaltszuweisungen für ein Gerät laden |
| POST | `/` | JWT | — | Inhaltszuweisungen für Geräte speichern (Batch) |
| DELETE | `/:id` | JWT | — | Eine Geräte-Inhaltszuweisung löschen |

## Texting

Basis-Pfad: `/messaging/texting`

Verwaltet SMS-Texting-Anbieter, Gruppen-Textnachrichten und Zustellungs-Tracking.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Texting-Anbieter für die Kirche laden (Zugangsdaten werden maskiert) |
| GET | `/preview/:groupId` | JWT | — | Empfänger-Vorschau für einen Gruppen-Text (Anzahl berechtigter, abgemeldeter und telefonloser Personen) |
| GET | `/sent` | JWT | — | Alle gesendeten Textnachrichten-Datensätze der Kirche laden |
| GET | `/sent/:id/details` | JWT | — | Eine gesendete Nachricht mit Zustellungsprotokollen pro Empfänger laden |
| POST | `/providers` | JWT | — | Texting-Anbieter speichern (Batch). Verschlüsselt API-Zugangsdaten |
| POST | `/send` | JWT | — | Eine SMS an alle berechtigten Mitglieder einer Gruppe senden. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Eine SMS an eine einzelne Person senden. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Einen Texting-Anbieter löschen |

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

## E-Mail-Vorlagen

Basis-Pfad: `/messaging/emailTemplates`

Verwaltet wiederverwendbare E-Mail-Vorlagen und den Versand von Vorlagen-E-Mails an Gruppen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle E-Mail-Vorlagen der Kirche laden |
| GET | `/:id` | JWT | — | Eine einzelne E-Mail-Vorlage anhand der ID laden |
| GET | `/preview/:groupId` | JWT | — | E-Mail-Zustellung für eine Gruppe in der Vorschau anzeigen (Anzahl berechtigter Empfänger, Mitglieder ohne E-Mail) |
| POST | `/` | JWT | — | E-Mail-Vorlagen erstellen oder aktualisieren (Batch) |
| POST | `/send` | JWT | — | Eine Vorlagen-E-Mail an alle Mitglieder einer Gruppe senden. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Eine E-Mail-Vorlage löschen |

### Beispiel: E-Mail an eine Gruppe senden

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

(veraltet) IP-Blockierung für Live-Streaming-Chat. Der B1App-Client ruft `POST /` nicht mehr auf — die IP-Blockierung wurde bei der Migration zur einheitlichen Zustellung entfernt. Die Route `/clear` wird weiterhin Server-zu-Server vom `StreamingServiceController` aufgerufen, wenn Streaming-Dienste gespeichert werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (veraltet) Blockierte IPs speichern (Batch). Kein aktiver Client |
| POST | `/clear` | JWT | — | Alle blockierten IPs für bestimmte Dienste löschen. Body: `[{ serviceId, churchId }]` |

## Zustellungsprotokolle

Basis-Pfad: `/messaging/deliverylogs`

Verfolgt den Zustellungsstatus für gesendete Nachrichten (SMS, Push-Benachrichtigungen, E-Mail).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Zustellungsprotokolle nach Inhaltstyp und ID laden |
| GET | `/person/:personId` | JWT | — | Zustellungsprotokolle für eine Person laden. Optionale Filter `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Aktuelle Zustellungsprotokolle der Kirche laden. Optional `?limit=` (Standard 100) |
| GET | `/:id` | JWT | — | Ein Zustellungsprotokoll anhand der ID laden |

## Verwandte Seiten

- [Echtzeit-Architektur](../../realtime) -- WebSocket-Protokoll, Raum-Abonnements und das einheitliche Zustellungs-Framework
- [Web-Push-Benachrichtigungen](../../web-push) -- Browser-Push-Registrierung und Zustellung
- [Membership-Endpunkte](./membership) -- Personen, Gruppen, Rollen und Kern-Identität
- [Anwesenheits-Endpunkte](./attendance) -- Dienst- und Besuchs-Verfolgung
- [Authentifizierung & Berechtigungen](./authentication) -- Login-Ablauf, JWT, OAuth, Berechtigungsmodell
- [Modul-Struktur](../module-structure) -- Code-Organisationsmuster
