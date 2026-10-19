---
title: "Messaging-Endpunkte"
---

# Messaging-Endpunkte

<div class="article-intro">

Das Messaging-Modul verwaltet Echtzeit-Unterhaltungen, Chat-Nachrichten, Push-Benachrichtigungen, SMS-/E-Mail-Zustellung, WebSocket-Verbindungen, private Nachrichten, Geräteregistrierung und Texting-Anbieter. Es stellt die Kommunikationsschicht bereit, die in allen ChurchApps-Anwendungen sowohl für Live-Streaming-Chats als auch für asynchrone Benachrichtigungen genutzt wird.

</div>

**Basispfad:** `/messaging`

## Unterhaltungen

Basispfad: `/messaging/conversations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Unterhaltungen anhand kommagetrennter IDs mit ersten/letzten Nachrichten laden |
| GET | `/messages/:contentType/:contentId` | JWT | — | Unterhaltungen für Inhalte mit paginierten Nachrichten laden (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Unterhaltungen vom Typ „Beitrag“ für die Gruppen des aktuellen Benutzers abrufen |
| GET | `/posts/group/:groupId` | JWT | — | Unterhaltungen vom Typ „Beitrag“ für eine bestimmte Gruppe abrufen |
| GET | `/current/:churchId/:contentType/:contentId` | Öffentlich | — | Aktuelle Unterhaltung für Inhalte abrufen oder erstellen (entschlüsselt contentId automatisch) |
| GET | `/:churchId/:contentType/:contentId` | Öffentlich | — | Unterhaltungen anhand von Inhaltstyp und ID laden |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Unterhaltung anhand der ID laden |
| POST | `/` | JWT | — | Unterhaltungen erstellen oder aktualisieren (Stapelverarbeitung) |
| POST | `/start` | JWT | — | Eine neue Unterhaltung mit einer ersten Kommentarnachricht starten |
| DELETE | `/:churchId/:id` | JWT | — | Eine Unterhaltung löschen |

### Zugriffskontrolle für Personennotizen

Unterhaltungen mit `contentType: "person"` (der Tab „Notizen“ im Personendatensatz) oder `contentType: "personConfidential"` (der Bereich „Vertrauliche Notizen“) sind bei jedem Lese- und Schreibzugriff geschützt, auch über die oben aufgeführten öffentlichen Routen, die für diese Inhaltstypen `401` zurückgeben. `person` erfordert die MembershipApi-Berechtigung **Personen / Bearbeiten**; `personConfidential` erfordert **Personen / Vertrauliche Notizen anzeigen**. Für eingeschränkte API-Schlüssel umfasst `people:write` beide Aktionen (der Benutzer des Schlüssels muss weiterhin die zugrunde liegende Rollenberechtigung besitzen).

### Zugriffskontrolle für Gruppen- und Veranstaltungsnotizen {#group-and-event-notes-access-control}

Zwei weitere Notizentypen sind auf die gleiche Weise geschützt, bei jedem Lese- und Schreibzugriff (auch über die oben genannten öffentlichen Routen), und sind niemals für anonyme Beiträge offen:

- **`groupNote`** (`contentId` = Gruppen-ID) -- der Feed **Leiter-Notizen** einer Gruppe. Nur die Leiter dieser Gruppe (`leaderGroupIds` im JWT) können lesen oder posten. Keine Mitarbeiterberechtigung gewährt Zugriff, auch nicht `content.edit` und die Berechtigungen zur Gruppenmitgliedschaft.
- **`eventNote`** (`contentId` = Veranstaltungs-ID) -- die Notizen zu einer Kalenderveranstaltung. Mitarbeiter mit `content.edit` oder **Kalender / Administrator** können immer lesen und posten. Andernfalls richtet sich der Zugriff nach dem Feld `notesViewRole` (Lesen) und `notesPostRole` (Posten) der Veranstaltung: `staff` (der Standardwert, der verwendet wird, wenn das Feld `null` ist) erlaubt sonst niemandem Zugriff, `leaders` erlaubt den Leitern der Gruppe der Veranstaltung Zugriff, und `members` erlaubt den Mitgliedern und Leitern der Veranstaltungsgruppe Zugriff. Eine Veranstaltung ohne `groupId` ist nur für Mitarbeiter zugänglich.

### Zugriffskontrolle für Notizen zu Workflow-Karten

Unterhaltungen mit `contentType: "workflowCard"` (die Notizen zu einer Workflow-Karte, wobei `contentId` die Task-ID der Karte ist) können nur von Personen gelesen und geschrieben werden, die diese Karte öffnen dürfen: ein Benutzer mit der DoingApi-Berechtigung **Aufgaben / Anzeigen** oder die Person bzw. Gruppe, der die Karte zugewiesen ist, von der sie erstellt wurde oder die sie betrifft. Alle anderen erhalten bei jedem Lesezugriff `401`, auch über die oben genannten öffentlichen Routen. Die Unterhaltung einer Karte wird über die Karte selbst mit `POST /doing/tasks/:id/conversation` (Body `{ "conversationId": "..." }`; die zuerst angehängte Unterhaltung gewinnt) angehängt, was die Bearbeiter der Karte und ihr Verantwortlicher aufrufen können.

### Beispiel: Eine Unterhaltung starten

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
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Alle Nachrichten einer Unterhaltung laden |
| GET | `/catchup/:churchId/:conversationId` | Öffentlich | — | Alle Nachrichten einer Unterhaltung laden (öffentlicher Catch-up für Live-Chat) |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Nachricht anhand der ID laden |
| POST | `/` | JWT | — | Nachrichten speichern (Stapelverarbeitung). Sendet Echtzeit-Updates und löst Benachrichtigungen aus. Das Aktualisieren einer vorhandenen Nachricht erfordert, dass man ihr Autor ist oder `content.edit` besitzt; der gespeicherte Autor kann niemals neu zugewiesen werden |
| POST | `/send` | Öffentlich | — | Nachrichten senden (Stapelverarbeitung, öffentlich). Sendet Echtzeit-Updates über WebSocket und löst Benachrichtigungen aus |
| POST | `/setCallout` | JWT | — | (veraltet) Eine Hinweisnachricht in Echtzeit übertragen. Kein aktiver Client; der Live-Stream-Chat zeigt Hinweise nicht mehr an |
| DELETE | `/:churchId/:id` | JWT | — | Eine Nachricht löschen und die Löschung in Echtzeit übertragen. Siehe [Moderation von Nachrichten](#message-moderation) |

### Moderation von Nachrichten {#message-moderation}

Das Löschen einer Nachricht ist erlaubt für:

- den Autor der Nachricht;
- Mitarbeiter mit `content.edit` (in der gesamten Kirche);
- **Gruppenleiter** für Unterhaltungen mit einem `contentType` von `group` oder `groupAnnouncement`, deren `contentId` eine Gruppe ist, die sie leiten (`leaderGroupIds` im JWT).

Unterhaltungen zu Personennotizen (`person` / `personConfidential`) werden niemals von Gruppenleitern moderiert -- dafür gelten stattdessen die Notizberechtigungen (`people.edit`, `people.viewConfidentialNotes`).

Leiter erhalten nur das Löschrecht, nicht das Bearbeitungsrecht: Das Umschreiben der Nachricht eines anderen Mitglieds bleibt auf den Autor und Mitarbeiter mit `content.edit` beschränkt.

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

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle privaten Nachrichten des aktuellen Benutzers laden (enthält die letzte Nachricht pro Unterhaltung und markiert alle als gelesen) |
| GET | `/existing/:personId` | JWT | — | Eine bestehende private Unterhaltung mit einer bestimmten Person finden |
| GET | `/:id` | JWT | — | Eine private Nachricht anhand der ID laden (entfernt die Benachrichtigung, falls sie an den aktuellen Benutzer gerichtet ist) |
| POST | `/` | JWT | — | Private Nachrichten senden (Stapelverarbeitung). Löst eine Push-Benachrichtigung beim Empfänger aus |

## Benachrichtigungen

Basispfad: `/messaging/notifications`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Anzahl ungelesener Benachrichtigungen für den aktuellen Benutzer abrufen |
| GET | `/my` | JWT | — | Alle Benachrichtigungen des aktuellen Benutzers laden (markiert alle als gelesen) |
| GET | `/tmpEmail` | Öffentlich | — | Die tägliche E-Mail-Zusammenfassung der Benachrichtigungen auslösen (Debug-/Cron-Endpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Benachrichtigungen einer bestimmten Person laden |
| GET | `/:churchId/:id` | JWT | — | Eine Benachrichtigung anhand der ID laden |
| POST | `/` | JWT | — | Benachrichtigungen erstellen oder aktualisieren (Stapelverarbeitung) |
| POST | `/create` | JWT | — | Benachrichtigungen für mehrere Personen erstellen. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Alle Benachrichtigungen einer Person als gelesen markieren |
| POST | `/sendTest` | JWT | — | Eine Test-Push-Benachrichtigung senden. Body: `{ personId, title }` |
| POST | `/ping` | Öffentlich | — | Eine Benachrichtigung über einen externen Auslöser erstellen. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

## Benachrichtigungseinstellungen

Basispfad: `/messaging/notificationpreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Benachrichtigungskategorien mit ihren Standard- und erlaubten Kanälen auflisten |
| GET | `/my` | JWT | — | Benachrichtigungseinstellungen des aktuellen Benutzers laden (erstellt Standardwerte automatisch, falls keine vorhanden sind) |
| POST | `/` | JWT | — | Die Einstellungen des aktuellen Benutzers speichern. Body: beliebige der Felder `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, sowie optional `overrides: [{ categoryKey, channel, optedIn }]` (channel kann `push`, `email`, `in_app` oder `sms` sein; gesperrte Kategorien werden ignoriert). `allowSms` ist die Einwilligung des Mitglieds für Textnachricht-Erinnerungen. Ein veralteter Body als Array von Zeilen wird weiterhin akzeptiert |

## Verbindungen

Basispfad: `/messaging/connections`

Verwaltet WebSocket-/Echtzeitverbindungen für Chat, Gruppenunterhaltungen, private Nachrichten und Live-Streaming. Das vollständige Protokoll finden Sie unter [Echtzeit-Architektur](../../realtime).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Öffentlich | — | Alle Verbindungen einer Unterhaltung laden |
| POST | `/` | Öffentlich | — | Verbindungen registrieren (Stapelverarbeitung). Löst eine Anwesenheitsübertragung in der Unterhaltung aus. Body-Elemente: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Öffentlich | — | Den Anzeigenamen einer Verbindung anhand der Socket-ID aktualisieren. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Öffentlich | — | Eine Verbindung aus einer Unterhaltung entfernen. Löst eine Anwesenheitsübertragung aus |
| POST | `/tmpSendAlert` | Öffentlich | — | Eine Benachrichtigung an die Verbindungen einer Person senden. Body: `{ churchId, personId }` |

## Geräte

Basispfad: `/messaging/devices`

Verwaltet die Geräteregistrierung für Push-Benachrichtigungen und die Inhaltskopplung (z. B. die Lessons-App auf TV-Displays).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Ein Gerät registrieren oder aktualisieren (Registrierung für mobile Push-Nachrichten). Die Zuordnung erfolgt über das FCM-Token oder die Geräte-ID |
| POST | `/enrollAnon` | Öffentlich | — | Ein anonymes Gerät registrieren und einen 4-stelligen Kopplungscode erzeugen |
| POST | `/` | Öffentlich | — | Geräte speichern (Stapelverarbeitung) |
| GET | `/pair/:pairingCode` | JWT | — | Ein Gerät anhand seines Kopplungscodes koppeln. Optional `?contentType=&contentId=`, um Inhalte zuzuweisen |
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

## Gerätinhalte

Basispfad: `/messaging/devicecontents`

Verwaltet Inhaltszuweisungen für gekoppelte Geräte (z. B. welche Lektion auf einem Fernseher angezeigt wird).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Inhaltszuweisungen eines Geräts laden |
| POST | `/` | JWT | — | Inhaltszuweisungen von Geräten speichern (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | — | Eine Inhaltszuweisung eines Geräts löschen |

## Texting

Basispfad: `/messaging/texting`

Verwaltet SMS-Texting-Anbieter, Gruppen-Textnachrichten und die Nachverfolgung der Zustellung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Texting-Anbieter der Kirche laden (Zugangsdaten sind maskiert) |
| GET | `/status` | JWT | — | `{ enabled }` -- ob die Kirche einen aktivierten Texting-Anbieter hat. Jeder angemeldete Kirchenbenutzer; wird verwendet, um **Text**-Optionen nur anzuzeigen, wenn Textnachrichten gesendet werden können |
| GET | `/inboundUrl` | JWT | `texting.send` oder `settings.edit` | `{ url }` -- die eingehende Webhook-URL (STOP) der Kirche, die beim Anbieter eingetragen wird |
| POST | `/inbound/:churchId/:token` | Öffentlich | — | Webhook für eingehende Nachrichten des Anbieters. `token` ist ein HMAC der Kirchen-ID. Eine Antwort, die genau einem Stoppwort entspricht (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), markiert jede passende Person als `optedOut` und deaktiviert deren `allowSms`. Gibt `{ optedOut: <count> }` zurück; andere Antworten geben `{ optedOut: 0 }` zurück |
| GET | `/preview/:groupId` | JWT | — | Empfänger einer Gruppen-Textnachricht vorab anzeigen (Anzahl berechtigter, abgemeldeter und Personen ohne Telefonnummer) |
| GET | `/sent` | JWT | — | Alle gesendeten Textnachrichten-Datensätze der Kirche laden |
| GET | `/sent/:id/details` | JWT | — | Eine gesendete Textnachricht mit Zustellprotokollen pro Empfänger laden |
| POST | `/providers` | JWT | — | Texting-Anbieter speichern (Stapelverarbeitung). Verschlüsselt API-Zugangsdaten |
| POST | `/send` | JWT | — | Eine SMS an alle berechtigten Mitglieder einer Gruppe senden. Body: `{ groupId, message }`. Platzhalterfelder (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) werden für jeden Empfänger aufgelöst |
| POST | `/sendPerson` | JWT | — | Eine SMS an eine einzelne Person senden. Body: `{ personId, phoneNumber, message }`. Platzhalterfelder werden aufgelöst, und der aufgelöste Text wird protokolliert |
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

Verwaltet wiederverwendbare E-Mail-Vorlagen und das Senden von vorlagenbasierten E-Mails an Gruppen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle E-Mail-Vorlagen der Kirche laden |
| GET | `/:id` | JWT | — | Eine einzelne E-Mail-Vorlage anhand der ID laden |
| GET | `/preview/:groupId` | JWT | — | E-Mail-Zustellung für eine Gruppe vorab anzeigen (Anzahl berechtigter Empfänger, Mitglieder ohne E-Mail-Adresse) |
| POST | `/` | JWT | — | E-Mail-Vorlagen erstellen oder aktualisieren (Stapelverarbeitung) |
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

**Unterstützte Platzhalterfelder:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Gesperrte IP-Adressen

Basispfad: `/messaging/blockedips`

(veraltet) IP-Sperre für den Live-Streaming-Chat. Der B1App-Client ruft `POST /` nicht mehr auf -- die IP-Sperre wurde bei der Umstellung auf die einheitliche Zustellung entfernt. Die Route `/clear` wird weiterhin serverseitig von `StreamingServiceController` aufgerufen, wenn Streaming-Dienste gespeichert werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (veraltet) Gesperrte IP-Adressen speichern (Stapelverarbeitung). Kein aktiver Client |
| POST | `/clear` | JWT | — | Alle gesperrten IP-Adressen für bestimmte Dienste löschen. Body: `[{ serviceId, churchId }]` |

## Zustellprotokolle

Basispfad: `/messaging/deliverylogs`

Verfolgt den Zustellstatus gesendeter Nachrichten (SMS, Push-Benachrichtigungen, E-Mail).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Zustellprotokolle anhand von Inhaltstyp und ID laden |
| GET | `/person/:personId` | JWT | — | Zustellprotokolle einer Person laden. Optionale Filter `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Aktuelle Zustellprotokolle der Kirche laden. Optional `?limit=` (Standard 100) |
| GET | `/:id` | JWT | — | Ein Zustellprotokoll anhand der ID laden |

## Verwandte Seiten

- [Echtzeit-Architektur](../../realtime) -- WebSocket-Protokoll, Raumabonnements und das einheitliche Zustellframework
- [Web-Push-Benachrichtigungen](../../web-push) -- Browser-Registrierung für Push und Zustellung
- [Membership-Endpunkte](./membership) -- Personen, Gruppen, Rollen und zentrale Identität
- [Anwesenheits-Endpunkte](./attendance) -- Erfassung von Gottesdiensten und Besuchen
- [Authentifizierung & Berechtigungen](./authentication) -- Anmeldefluss, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) -- Muster der Code-Organisation
