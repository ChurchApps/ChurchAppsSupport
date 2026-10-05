---
title: "Messaging-Endpunkte"
---

# Messaging-Endpunkte

<div class="article-intro">

Das Messaging-Modul verwaltet Echtzeit-Gespräche, Chat-Nachrichten, Push-Benachrichtigungen, SMS-/E-Mail-Zustellung, WebSocket-Verbindungen, private Nachrichten, Geräteregistrierung und SMS-Anbieter. Es bietet die Kommunikationsschicht, die in allen ChurchApps-Anwendungen für Live-Streaming-Chat und asynchrone Benachrichtigungen verwendet wird.

</div>

**Basispfad:** `/messaging`

## Gespräche

Basispfad: `/messaging/conversations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Gespräche nach komma-getrennten IDs mit ersten/letzten Nachrichten laden |
| GET | `/messages/:contentType/:contentId` | JWT | — | Gespräche für Inhalte mit paginierten Nachrichten laden (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Posten-Typ-Gespräche für die Gruppen des aktuellen Benutzers abrufen |
| GET | `/posts/group/:groupId` | JWT | — | Posten-Typ-Gespräche für eine bestimmte Gruppe abrufen |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Das aktuelle Gespräch für Inhalte abrufen oder erstellen (auto-entschlüsselt contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Gespräche nach Inhaltstyp und ID laden |
| GET | `/:churchId/:id` | Public | — | Ein einzelnes Gespräch nach ID laden |
| POST | `/` | JWT | — | Gespräche erstellen oder aktualisieren (Batch) |
| POST | `/start` | JWT | — | Ein neues Gespräch mit einer anfänglichen Kommentarnachricht starten |
| DELETE | `/:churchId/:id` | JWT | — | Gespräch löschen |

### Zugriffskontrolle für Personennotizen

Gespräche mit `contentType: "person"` (der Notizenreiter auf einem Personendatensatz) oder `contentType: "personConfidential"` (der Abschnitt mit vertraulichen Notizen) werden auf jedem Lese- und Schreibpfad, einschließlich der oben erwähnten öffentlichen Routen, die für diese Inhaltstypen `401` zurückgeben, gated. `person` erfordert die MembershipApi-Berechtigung **People / Edit**; `personConfidential` erfordert **People / View Confidential Notes**. Für scoped API-Schlüssel trägt `people:write` beide Aktionen (der Benutzer des Schlüssels muss immer noch die zugrunde liegende Rollenberechtigung halten).

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

Basispfad: `/messaging/messages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Alle Nachrichten für ein Gespräch laden |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Alle Nachrichten für ein Gespräch laden (öffentlicher Aufholmodus für Live-Chat) |
| GET | `/:churchId/:id` | Public | — | Eine einzelne Nachricht nach ID laden |
| POST | `/` | JWT | — | Nachrichten speichern (Batch). Sendet Echtzeit-Updates und löst Benachrichtigungen aus. Zum Aktualisieren einer vorhandenen Nachricht müssen Sie der Autor sein oder `content.edit` halten; der gespeicherte Autor kann nicht umgestaltet werden |
| POST | `/send` | Public | — | Nachrichten senden (Batch, öffentlich). Sendet Echtzeit-Updates über WebSocket und löst Benachrichtigungen aus |
| POST | `/setCallout` | JWT | — | (legacy) Broadcast eine Callout-Nachricht in Echtzeit. Kein aktiver Client; Live-Stream-Chat rendert Callouts nicht mehr |
| DELETE | `/:churchId/:id` | JWT | — | Nachricht löschen und Löschung in Echtzeit broadcasten. Siehe [Nachrichtenmoderation](#nachrichtenmoderation) |

### Nachrichtenmoderation

Löschen einer Nachricht ist erlaubt für:

- den Autor der Nachricht;
- Personal mit `content.edit` (überall in der Kirche);
- **Gruppenleiter**, für Gespräche mit einem `contentType` von `group` oder `groupAnnouncement`, dessen `contentId` eine Gruppe ist, die sie leiten (`leaderGroupIds` auf dem JWT).

Personennoten-Gespräche (`person` / `personConfidential`) werden nie von Leitern moderiert -- sie verwenden die Noten-Berechtigungen (`people.edit`, `people.viewConfidentialNotes`) stattdessen.

Leiter erhalten nur das Löschen, nicht das Bearbeiten: Das Umschreiben der Nachricht eines anderen Mitglieds bleibt auf den Autor und `content.edit` Personal beschränkt.

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

Basispfad: `/messaging/privatemessages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | — | Alle privaten Nachrichten für den aktuellen Benutzer laden (enthält letzte Nachricht pro Gespräch, markiert alles als gelesen) |
| GET | `/existing/:personId` | JWT | — | Ein vorhandenes privates Gespräch mit einer bestimmten Person finden |
| GET | `/:id` | JWT | — | Eine private Nachricht nach ID laden (löscht Benachrichtigung, falls für aktuellen Benutzer adressiert) |
| POST | `/` | JWT | — | Private Nachrichten senden (Batch). Löst Push-Benachrichtigung an Empfänger aus |

## Benachrichtigungen

Basispfad: `/messaging/notifications`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/unreadCount` | JWT | — | Ungelesene Benachrichtigungsanzahl für den aktuellen Benutzer abrufen |
| GET | `/my` | JWT | — | Alle Benachrichtigungen für den aktuellen Benutzer laden (markiert alles als gelesen) |
| GET | `/tmpEmail` | Public | — | Tägliche E-Mail-Benachrichtigungszusammenfassung auslösen (Debug-/Cron-Endpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Benachrichtigungen für eine bestimmte Person laden |
| GET | `/:churchId/:id` | JWT | — | Benachrichtigung nach ID laden |
| POST | `/` | JWT | — | Benachrichtigungen erstellen oder aktualisieren (Batch) |
| POST | `/create` | JWT | — | Benachrichtigungen für mehrere Personen erstellen. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Alle Benachrichtigungen als gelesen für eine Person markieren |
| POST | `/sendTest` | JWT | — | Test-Push-Benachrichtigung senden. Body: `{ personId, title }` |
| POST | `/ping` | Public | — | Benachrichtigung von einem externen Trigger erstellen. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Benachrichtigung löschen |

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

## Benachrichtigungseinstellungen

Basispfad: `/messaging/notificationpreferences`

Erweitert Standard-CRUD. Die Basisklasse bietet POST `/` (erstellen oder aktualisieren, keine Berechtigung erforderlich).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| POST | `/` | JWT | — | Benachrichtigungseinstellungen erstellen oder aktualisieren (aus CRUD-Basisklasse) |
| GET | `/my` | JWT | — | Benachrichtigungseinstellungen für den aktuellen Benutzer laden (erstellt automatisch Standardeinstellungen, falls keine vorhanden) |

## Verbindungen

Basispfad: `/messaging/connections`

Verwaltet WebSocket-/Echtzeit-Verbindungen für Chat, Gruppengespräche, private Nachrichten und Live-Streaming. Siehe [Echtzeit-Architektur](../../realtime) für das End-to-End-Protokoll.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Alle Verbindungen für ein Gespräch laden |
| POST | `/` | Public | — | Verbindungen registrieren (Batch). Löst eine Präsenz-Broadcast auf dem Gespräch aus. Body-Elemente: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Anzeigenamen für eine Verbindung nach Socket-ID aktualisieren. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Verbindung aus einem Gespräch löschen. Löst eine Präsenz-Broadcast aus |
| POST | `/tmpSendAlert` | Public | — | Benachrichtigungsmeldung an die Verbindungen einer Person senden. Body: `{ churchId, personId }` |

## Geräte

Basispfad: `/messaging/devices`

Verwaltet die Geräteregistrierung für Push-Benachrichtigungen und Inhalte-Pairing (z.B. Lessons-App auf TV-Bildschirmen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| POST | `/enroll` | JWT | — | Ein Gerät registrieren oder aktualisieren (mobile Push-Registrierung). Entspricht nach FCM-Token oder Geräte-ID |
| POST | `/enrollAnon` | Public | — | Ein anonymes Gerät registrieren und einen 4-stelligen Pairing-Code generieren |
| POST | `/` | Public | — | Geräte speichern (Batch) |
| GET | `/pair/:pairingCode` | JWT | — | Ein Gerät mit seinem Pairing-Code koppeln. Optional `?contentType=&contentId=` zum Zuweisen von Inhalten |
| GET | `/status/:deviceId` | Public | — | Pairing-Status eines Geräts überprüfen |
| GET | `/:churchId` | JWT | — | Alle Geräte für eine Kirche laden |
| GET | `/:churchId/person/:personId` | JWT | — | Alle Geräte für eine Person laden |
| GET | `/:churchId/:id` | JWT | — | Ein Gerät nach ID laden |
| DELETE | `/:churchId/:id` | JWT | — | Gerät löschen |

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

Basispfad: `/messaging/devicecontents`

Verwaltet Inhaltszuordnungen für gekoppelte Geräte (z.B. welche Lektion auf einem Fernseher angezeigt wird).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Inhaltszuordnungen für ein Gerät laden |
| POST | `/` | JWT | — | Geräte-Inhaltszuordnungen speichern (Batch) |
| DELETE | `/:id` | JWT | — | Geräte-Inhaltszuordnung löschen |

## SMS

Basispfad: `/messaging/texting`

Verwaltet SMS-SMS-Anbieter, Gruppen-SMS und Zustellungsverfolgung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/providers` | JWT | — | SMS-Anbieter für die Kirche laden (Anmeldedaten sind maskiert) |
| GET | `/preview/:groupId` | JWT | — | Vorschau der Empfänger für eine Gruppen-SMS (berechtigt, abmelden, keine Telefonnummern) |
| GET | `/sent` | JWT | — | Alle gesendeten SMS-Datensätze für die Kirche laden |
| GET | `/sent/:id/details` | JWT | — | Eine gesendete SMS mit Pro-Empfänger-Zustellungsprotokollen laden |
| POST | `/providers` | JWT | — | SMS-Anbieter speichern (Batch). Verschlüsselt API-Anmeldedaten |
| POST | `/send` | JWT | — | Eine SMS an alle berechtigten Mitglieder einer Gruppe senden. Body: `{ groupId, message }`. Merge-Felder (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) werden pro Empfänger aufgelöst |
| POST | `/sendPerson` | JWT | — | SMS an eine einzelne Person senden. Body: `{ personId, phoneNumber, message }`. Merge-Felder werden aufgelöst und der gelöste Text ist das, was protokolliert wird |
| DELETE | `/providers/:id` | JWT | — | SMS-Anbieter löschen |

### Beispiel: Gruppen-SMS senden

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

Basispfad: `/messaging/emailTemplates`

Verwaltet wiederverwendbare E-Mail-Vorlagen und Versand von vorlagigen E-Mails an Gruppen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | — | Alle E-Mail-Vorlagen für die Kirche laden |
| GET | `/:id` | JWT | — | Eine einzelne E-Mail-Vorlage nach ID laden |
| GET | `/preview/:groupId` | JWT | — | Vorschau der E-Mail-Zustellung für eine Gruppe (berechtigte Empfängeranzahl, Mitglieder ohne E-Mail) |
| POST | `/` | JWT | — | E-Mail-Vorlagen erstellen oder aktualisieren (Batch) |
| POST | `/send` | JWT | — | Eine vorlagige E-Mail an alle Mitglieder einer Gruppe senden. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | E-Mail-Vorlage löschen |

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

Basispfad: `/messaging/blockedips`

(legacy) IP-Blockierung für Live-Streaming-Chat. Der B1App-Client ruft `POST /` nicht mehr auf -- IP-Blockierung wurde beim vereinheitlichten Lieferprozess entfernt. Die Route `/clear` wird immer noch Server-zu-Server von `StreamingServiceController` aufgerufen, wenn Streaming-Services gespeichert werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| POST | `/` | JWT | — | (legacy) Blockierte IPs speichern (Batch). Kein aktiver Client |
| POST | `/clear` | JWT | — | Alle blockierten IPs für bestimmte Services löschen. Body: `[{ serviceId, churchId }]` |

## Zustellungsprotokolle

Basispfad: `/messaging/deliverylogs`

Verfolgt den Zustellungsstatus für gesendete Nachrichten (SMS, Push-Benachrichtigungen, E-Mail).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Zustellungsprotokolle nach Inhaltstyp und ID laden |
| GET | `/person/:personId` | JWT | — | Zustellungsprotokolle für eine Person laden. Optional `?startDate=&endDate=` Filter |
| GET | `/recent` | JWT | — | Aktuelle Zustellungsprotokolle für die Kirche laden. Optional `?limit=` (Standard 100) |
| GET | `/:id` | JWT | — | Zustellungsprotokoll nach ID laden |

## Verwandte Seiten

- [Echtzeit-Architektur](../../realtime) -- WebSocket-Protokoll, Raum-Abos und das vereinheitlichte Liefersystem
- [Web-Push-Benachrichtigungen](../../web-push) -- Browser-Push-Anmeldung und -Zustellung
- [Mitgliedschafts-Endpunkte](./membership) -- Personen, Gruppen, Rollen und Kernidentität
- [Anwesenheits-Endpunkte](./attendance) -- Service- und Besuchsverfolgung
- [Authentifizierung & Berechtigungen](./authentication) -- Anmelde-Arbeitsablauf, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) -- Code-Organisationsmuster
