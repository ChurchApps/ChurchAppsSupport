---
title: "Messaging-Endpunkte"
---

# Messaging-Endpunkte

<div class="article-intro">

Das Messaging-Modul verwaltet Echtzeit-Unterhaltungen, Chatnachrichten, Push-Benachrichtigungen, SMS- und E-Mail-Zustellung, WebSocket-Verbindungen, private Nachrichten, Geräteregistrierung und SMS-Anbieter. Es stellt die Kommunikationsebene bereit, die in allen ChurchApps-Anwendungen sowohl für Live-Streaming-Chats als auch für asynchrone Benachrichtigungen genutzt wird.

</div>

**Basispfad:** `/messaging`

## Unterhaltungen

Basispfad: `/messaging/conversations`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Unterhaltungen anhand kommagetrennter IDs mit erster und letzter Nachricht laden |
| GET | `/messages/:contentType/:contentId` | JWT | — | Unterhaltungen für Inhalte mit paginierten Nachrichten laden (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Beitrags-Unterhaltungen der Gruppen des aktuellen Benutzers abrufen |
| GET | `/posts/group/:groupId` | JWT | — | Beitrags-Unterhaltungen einer bestimmten Gruppe abrufen |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Neueste Notizen aus allen Datensätzen für die Seite Notes in B1 Admin. `section` ist `people`, `groups`, `events` oder `workflows` (sonst 400); `limit` ist standardmäßig 25 (max. 100); `before` ist der Cursor der vorherigen Seite. Jede Notiz unterliegt weiterhin der Regel ihres Typs (People Edit / Berechtigung für vertrauliche Notizen, Gruppenleitung, Veranstaltungsteilnehmer, Berechtigte für Workflow-Karten), sodass Aufrufer nur Notizen sehen, die sie öffnen könnten. Der Notiztext wird nach 300 Zeichen abgeschnitten |
| GET | `/current/:churchId/:contentType/:contentId` | Öffentlich | — | Die aktuelle Unterhaltung für Inhalte abrufen oder erstellen (entschlüsselt contentId automatisch) |
| GET | `/:churchId/:contentType/:contentId` | Öffentlich | — | Unterhaltungen nach Inhaltstyp und ID laden |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Unterhaltung anhand der ID laden |
| POST | `/` | JWT | — | Unterhaltungen anlegen oder aktualisieren (Stapelverarbeitung) |
| POST | `/start` | JWT | — | Eine neue Unterhaltung mit einer ersten Kommentarnachricht beginnen |
| DELETE | `/:churchId/:id` | JWT | — | Eine Unterhaltung löschen |

### Zugriffskontrolle für Personennotizen

Unterhaltungen mit `contentType: "person"` (der Tab Notes auf einem Personendatensatz) oder `contentType: "personConfidential"` (der Bereich Confidential Notes) sind bei jedem Lese- und Schreibzugriff geschützt, auch über die oben genannten öffentlichen Routen; diese geben für diese Inhaltstypen `401` zurück. `person` erfordert die MembershipApi-Berechtigung **People / Edit**; `personConfidential` erfordert **People / View Confidential Notes**. Bei API-Schlüsseln mit eingeschränkten Bereichen umfasst `people:write` beide Aktionen (der Benutzer des Schlüssels muss die zugrunde liegende Rollenberechtigung weiterhin besitzen).

### Zugriffskontrolle für Gruppen- und Veranstaltungsnotizen {#group-and-event-notes-access-control}

Zwei weitere Notiztypen sind auf die gleiche Weise bei jedem Lese- und Schreibzugriff geschützt (auch über die oben genannten öffentlichen Routen) und stehen niemals für anonyme Beiträge offen:

- **`groupNote`** (`contentId` = Gruppen-ID) – der Feed **Leader notes** einer Gruppe. Nur die Leitung dieser Gruppe (`leaderGroupIds` im JWT) kann lesen oder posten. Keine Mitarbeiterberechtigung gewährt Zugriff, auch nicht `content.edit` oder die Gruppenmitgliedschafts-Berechtigungen.
- **`eventNote`** (`contentId` = Veranstaltungs-ID) – die Notizen zu einem Kalendereintrag. Mitarbeiter mit `content.edit` oder **Calendars / Admin** können immer lesen und posten. Ansonsten richtet sich der Zugriff nach dem `notesViewRole` (Lesen) und `notesPostRole` (Posten) der Veranstaltung: `staff` (der Standard, wenn das Feld `null` ist) erlaubt sonst niemandem Zugriff, `leaders` erlaubt den Leitungen der Gruppe der Veranstaltung und `members` erlaubt den Mitgliedern und Leitungen der Veranstaltungsgruppe. Eine Veranstaltung ohne `groupId` ist nur für Mitarbeiter zugänglich.

### Zugriffskontrolle für Notizen auf Workflow-Karten

Unterhaltungen mit `contentType: "workflowCard"` (die Notizen auf einer Workflow-Karte, wobei `contentId` die Task-ID der Karte ist) können nur von Personen gelesen und beschrieben werden, die diese Karte öffnen dürfen: ein Benutzer mit der DoingApi-Berechtigung **Tasks / View** oder die Person bzw. Gruppe, der die Karte zugewiesen ist, von der sie erstellt wurde oder die sie betrifft. Alle anderen erhalten bei jedem Lesezugriff `401`, auch über die oben genannten öffentlichen Routen. Die Unterhaltung einer Karte wird über die Karte selbst mit `POST /doing/tasks/:id/conversation` (Body `{ "conversationId": "..." }`; die zuerst angehängte Unterhaltung gewinnt) angehängt; dies können die Bearbeiter der Karte und ihr Verantwortlicher aufrufen.

### Beispiel: Eine Unterhaltung beginnen

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

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Alle Nachrichten einer Unterhaltung laden |
| GET | `/catchup/:churchId/:conversationId` | Öffentlich | — | Alle Nachrichten einer Unterhaltung laden (öffentlicher Catch-up für Live-Chat) |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Nachricht anhand der ID laden |
| POST | `/` | JWT | — | Nachrichten speichern (Stapelverarbeitung). Sendet Echtzeit-Aktualisierungen und löst Benachrichtigungen aus. Zum Bearbeiten einer bestehenden Nachricht muss man ihr Autor sein oder `content.edit` besitzen; der gespeicherte Autor kann niemals neu zugewiesen werden |
| POST | `/send` | Öffentlich | — | Nachrichten senden (Stapelverarbeitung, öffentlich). Sendet Echtzeit-Aktualisierungen über WebSocket und löst Benachrichtigungen aus |
| POST | `/setCallout` | JWT | — | (veraltet) Eine Hinweisnachricht in Echtzeit verbreiten. Kein aktiver Client; der Live-Stream-Chat zeigt Hinweise nicht mehr an |
| DELETE | `/:churchId/:id` | JWT | — | Eine Nachricht löschen und die Löschung in Echtzeit verbreiten. Siehe [Nachrichtenmoderation](#message-moderation) |

### Nachrichtenmoderation

Eine Nachricht darf gelöscht werden von:

- dem Autor der Nachricht;
- Mitarbeitern mit `content.edit` (kirchenweit);
- **Gruppenleitungen** für Unterhaltungen mit einem `contentType` von `group` oder `groupAnnouncement`, deren `contentId` eine Gruppe ist, die sie leiten (`leaderGroupIds` im JWT).

Unterhaltungen zu Personennotizen (`person` / `personConfidential`) werden niemals von Gruppenleitungen moderiert – dafür gelten die Notizberechtigungen (`people.edit`, `people.viewConfidentialNotes`).

Leitungen dürfen nur löschen, nicht bearbeiten: Das Umschreiben der Nachricht eines anderen Mitglieds bleibt auf den Autor und Mitarbeiter mit `content.edit` beschränkt.

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

Basispfad: `/messaging/privatemessages`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle privaten Nachrichten des aktuellen Benutzers laden (mit der letzten Nachricht pro Unterhaltung; markiert alle als gelesen) |
| GET | `/existing/:personId` | JWT | — | Eine bestehende private Unterhaltung mit einer bestimmten Person finden |
| GET | `/:id` | JWT | — | Eine private Nachricht anhand der ID laden (entfernt die Benachrichtigung, wenn sie an den aktuellen Benutzer adressiert ist) |
| POST | `/` | JWT | — | Private Nachrichten senden (Stapelverarbeitung). Löst eine Push-Benachrichtigung an den Empfänger aus |

## Benachrichtigungen

Basispfad: `/messaging/notifications`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Anzahl der ungelesenen Benachrichtigungen des aktuellen Benutzers abrufen |
| GET | `/my` | JWT | — | Alle Benachrichtigungen des aktuellen Benutzers laden (markiert alle als gelesen) |
| GET | `/tmpEmail` | Öffentlich | — | Tägliche E-Mail-Übersicht der Benachrichtigungen auslösen (Debug-/Cron-Endpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Benachrichtigungen einer bestimmten Person laden |
| GET | `/:churchId/:id` | JWT | — | Eine Benachrichtigung anhand der ID laden |
| POST | `/` | JWT | — | Benachrichtigungen anlegen oder aktualisieren (Stapelverarbeitung) |
| POST | `/create` | JWT | — | Benachrichtigungen für mehrere Personen anlegen. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Alle Benachrichtigungen einer Person als gelesen markieren |
| POST | `/sendTest` | JWT | — | Eine Test-Push-Benachrichtigung senden. Body: `{ personId, title }` |
| POST | `/ping` | Öffentlich | — | Eine Benachrichtigung aus einem externen Auslöser anlegen. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Eine Benachrichtigung löschen |

### Beispiel: Benachrichtigungen anlegen

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

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Benachrichtigungskategorien mit ihren Standard- und erlaubten Kanälen auflisten |
| GET | `/my` | JWT | — | Benachrichtigungseinstellungen des aktuellen Benutzers laden (legt Standardwerte automatisch an, falls keine vorhanden sind) |
| POST | `/` | JWT | — | Die Einstellungen des aktuellen Benutzers speichern. Body: beliebige der Felder `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` sowie optional `overrides: [{ categoryKey, channel, optedIn }]` (channel kann `push`, `email`, `in_app` oder `sms` sein; gesperrte Kategorien werden ignoriert). `allowSms` ist die Zustimmung des Mitglieds zu Textnachrichten-Erinnerungen. Ein veralteter Body als Array von Zeilen wird weiterhin akzeptiert |

## Verbindungen

Basispfad: `/messaging/connections`

Verwaltet WebSocket-/Echtzeitverbindungen für Chat, Gruppenunterhaltungen, private Nachrichten und Live-Streaming. Das durchgängige Protokoll ist unter [Echtzeit-Architektur](../../realtime) beschrieben.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Öffentlich | — | Alle Verbindungen einer Unterhaltung laden |
| POST | `/` | Öffentlich | — | Verbindungen registrieren (Stapelverarbeitung). Löst eine Anwesenheits-Übertragung für die Unterhaltung aus. Body-Einträge: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Öffentlich | — | Den Anzeigenamen einer Verbindung anhand der Socket-ID aktualisieren. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Öffentlich | — | Eine Verbindung aus einer Unterhaltung entfernen. Löst eine Anwesenheits-Übertragung aus |
| POST | `/tmpSendAlert` | Öffentlich | — | Eine Benachrichtigung an die Verbindungen einer Person senden. Body: `{ churchId, personId }` |

## Geräte

Basispfad: `/messaging/devices`

Verwaltet die Geräteregistrierung für Push-Benachrichtigungen und die Zuordnung von Inhalten (z. B. die Lessons-App auf TV-Bildschirmen).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Ein Gerät registrieren oder aktualisieren (Push-Registrierung für mobile Geräte). Die Zuordnung erfolgt über das FCM-Token oder die Geräte-ID |
| POST | `/enrollAnon` | Öffentlich | — | Ein anonymes Gerät registrieren und einen 4-stelligen Kopplungscode erzeugen |
| POST | `/` | Öffentlich | — | Geräte speichern (Stapelverarbeitung) |
| GET | `/pair/:pairingCode` | JWT | — | Ein Gerät mit seinem Kopplungscode koppeln. Optional `?contentType=&contentId=`, um Inhalte zuzuweisen |
| GET | `/status/:deviceId` | Öffentlich | — | Den Kopplungsstatus eines Geräts prüfen |
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

## Geräteinhalte

Basispfad: `/messaging/devicecontents`

Verwaltet Inhaltszuweisungen für gekoppelte Geräte (z. B. welche Lektion auf einem Fernseher angezeigt wird).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Inhaltszuweisungen eines Geräts laden |
| POST | `/` | JWT | — | Inhaltszuweisungen des Geräts speichern (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | — | Eine Inhaltszuweisung des Geräts löschen |

## Texting

Basispfad: `/messaging/texting`

Verwaltet SMS-Anbieter, Gruppen-Textnachrichten und die Nachverfolgung der Zustellung.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Texting-Anbieter der Kirche laden (Zugangsdaten sind maskiert) |
| GET | `/status` | JWT | — | `{ enabled }` – ob die Kirche einen aktivierten Texting-Anbieter hat. Jeder angemeldete Kirchenbenutzer; dient dazu, die Option **Text** nur anzuzeigen, wenn Textnachrichten gesendet werden können |
| GET | `/inboundUrl` | JWT | `texting.send` oder `settings.edit` | `{ url }` – die eingehende (STOP-)Webhook-URL der Kirche, die beim Anbieter eingefügt wird |
| POST | `/inbound/:churchId/:token` | Öffentlich | — | Webhook für eingehende Nachrichten des Anbieters. `token` ist ein HMAC der Kirchen-ID. Eine Antwort, die genau einem Stoppwort entspricht (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), markiert alle passenden Personen als `optedOut` und deaktiviert deren `allowSms`. Gibt `{ optedOut: <count> }` zurück; andere Antworten geben `{ optedOut: 0 }` zurück |
| GET | `/preview/:groupId` | JWT | — | Empfänger einer Gruppen-Textnachricht vorab anzeigen (Anzahl berechtigter, abgemeldeter und Personen ohne Telefonnummer) |
| GET | `/sent` | JWT | — | Alle gesendeten Textnachrichten der Kirche laden |
| GET | `/sent/:id/details` | JWT | — | Eine gesendete Textnachricht mit Zustellprotokollen pro Empfänger laden |
| POST | `/providers` | JWT | — | Texting-Anbieter speichern (Stapelverarbeitung). Verschlüsselt API-Zugangsdaten |
| POST | `/send` | JWT | — | Eine SMS an alle berechtigten Mitglieder einer Gruppe senden. Body: `{ groupId, message }`. Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) werden pro Empfänger aufgelöst |
| POST | `/sendPerson` | JWT | — | Eine SMS an eine einzelne Person senden. Body: `{ personId, phoneNumber, message }`. Platzhalter werden aufgelöst, und der aufgelöste Text wird protokolliert |
| DELETE | `/providers/:id` | JWT | — | Einen Texting-Anbieter löschen |

### Beispiel: Gruppen-Textnachricht senden

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

Verwaltet wiederverwendbare E-Mail-Vorlagen und den Versand vorlagenbasierter E-Mails an Gruppen.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle E-Mail-Vorlagen der Kirche laden |
| GET | `/:id` | JWT | — | Eine einzelne E-Mail-Vorlage anhand der ID laden |
| GET | `/sendStatus` | JWT | `groupMembers.edit` oder `tasks.admin` | Der E-Mail-Status der Gruppen der Kirche: `{ approved, paused, remaining, requested }`. Der Dialog Send Email in B1Admin und die Workflow-Aktion **Send email** nutzen ihn, um zu warnen, wenn keine E-Mails versendet werden |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Den Support bitten, die Kirche für den Gruppen-E-Mail-Versand freizugeben (höchstens einmal pro Kirche und Woche) |
| GET | `/preview/:groupId` | JWT | — | Die E-Mail-Zustellung für eine Gruppe vorab anzeigen (Anzahl berechtigter Empfänger, Mitglieder ohne E-Mail-Adresse) |
| POST | `/` | JWT | — | E-Mail-Vorlagen anlegen oder aktualisieren (Stapelverarbeitung) |
| POST | `/send` | JWT | — | Eine vorlagenbasierte E-Mail an alle Mitglieder einer Gruppe senden. Body: `{ groupId, subject, htmlContent }` |
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

**Unterstützte Platzhalter:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Gesperrte IP-Adressen

Basispfad: `/messaging/blockedips`

(veraltet) IP-Sperre für den Live-Stream-Chat. Der B1App-Client ruft `POST /` nicht mehr auf – die IP-Sperre wurde bei der einheitlichen Zustellung entfernt. Die Route `/clear` wird weiterhin serverseitig von `StreamingServiceController` aufgerufen, wenn Streaming-Gottesdienste gespeichert werden.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (veraltet) Gesperrte IPs speichern (Stapelverarbeitung). Kein aktiver Client |
| POST | `/clear` | JWT | — | Alle gesperrten IPs für bestimmte Gottesdienste löschen. Body: `[{ serviceId, churchId }]` |

## Zustellprotokolle

Basispfad: `/messaging/deliverylogs`

Verfolgt den Zustellstatus gesendeter Nachrichten (SMS, Push-Benachrichtigungen, E-Mail).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Zustellprotokolle nach Inhaltstyp und ID laden |
| GET | `/person/:personId` | JWT | — | Zustellprotokolle einer Person laden. Optionale Filter `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Aktuelle Zustellprotokolle der Kirche laden. Optional `?limit=` (Standard 100) |
| GET | `/:id` | JWT | — | Ein Zustellprotokoll anhand der ID laden |

## Verwandte Seiten

- [Echtzeit-Architektur](../../realtime) -- WebSocket-Protokoll, Raum-Abonnements und das einheitliche Zustellungs-Framework
- [Web-Push-Benachrichtigungen](../../web-push) -- Registrierung und Zustellung von Browser-Push
- [Membership-Endpunkte](./membership) -- Personen, Gruppen, Rollen und zentrale Identität
- [Anwesenheits-Endpunkte](./attendance) -- Erfassung von Gottesdiensten und Besuchen
- [Authentifizierung und Berechtigungen](./authentication) -- Anmeldablauf, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) -- Muster zur Code-Organisation
