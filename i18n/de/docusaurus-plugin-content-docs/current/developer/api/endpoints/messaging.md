---
title: "Messaging-Endpunkte"
description: "Referenz für die API-Endpunkte des ChurchApps-Messagings: Konversationen, Zugriffsregeln für Notizen, Texting, E-Mail-Vorlagen, Benachrichtigungen und Geräte."
---

# Messaging-Endpunkte

<div class="article-intro">

Das Modul Messaging verwaltet Echtzeit-Konversationen, Chatnachrichten, Push-Benachrichtigungen, SMS- und E-Mail-Versand, WebSocket-Verbindungen, private Nachrichten, Geräteregistrierung und Texting-Anbieter. Es stellt die Kommunikationsschicht bereit, die in allen ChurchApps-Anwendungen sowohl für Live-Stream-Chats als auch für asynchrone Benachrichtigungen genutzt wird.

</div>

**Basispfad:** `/messaging`

## Konversationen

Basispfad: `/messaging/conversations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Konversationen anhand kommagetrennter IDs laden, mit erster und letzter Nachricht |
| GET | `/messages/:contentType/:contentId` | JWT | — | Konversationen für Inhalte mit paginierten Nachrichten laden (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Konversationen vom Typ Beitrag für die Gruppen des aktuellen Benutzers abrufen |
| GET | `/posts/group/:groupId` | JWT | — | Konversationen vom Typ Beitrag für eine bestimmte Gruppe abrufen |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Neueste Notizen aus allen Datensätzen für die Notizenseite von B1 Admin. `section` ist `people`, `groups`, `events` oder `workflows` (sonst 400); `limit` ist standardmäßig 25 (max. 100); `before` ist der Cursor der vorherigen Seite. Jede Notiz unterliegt weiterhin der Regel ihres Typs (Berechtigung „People Edit“ bzw. vertrauliche Notizen, Leitende der Gruppe, Veranstaltungsbetrachter, Betrachter von Workflow-Karten), sodass Aufrufer nur Notizen sehen, die sie auch öffnen könnten. Der Notiztext wird nach 300 Zeichen gekürzt |
| GET | `/current/:churchId/:contentType/:contentId` | Öffentlich | — | Aktuelle Konversation für Inhalte abrufen oder erstellen (entschlüsselt contentId automatisch) |
| GET | `/:churchId/:contentType/:contentId` | Öffentlich | — | Konversationen nach Inhaltstyp und ID laden |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Konversation anhand der ID laden |
| POST | `/` | JWT | — | Konversationen erstellen oder aktualisieren (Stapelverarbeitung) |
| POST | `/start` | JWT | — | Eine neue Konversation mit einer ersten Kommentarnachricht starten |
| DELETE | `/:churchId/:id` | JWT | — | Eine Konversation löschen |

### Zugriffskontrolle für Personennotizen

Konversationen mit `contentType: "person"` (der Tab „Notizen“ eines Personendatensatzes) oder `contentType: "personConfidential"` (der Bereich „Vertrauliche Notizen“) sind bei jedem Lese- und Schreibzugriff geschützt, auch über die oben aufgeführten öffentlichen Routen, die für diese Inhaltstypen `401` zurückgeben. `person` erfordert die MembershipApi-Berechtigung **People / Edit**, `personConfidential` erfordert **People / View Confidential Notes**. Bei API-Schlüsseln mit eingeschränktem Umfang umfasst `people:write` beide Aktionen (der Benutzer des Schlüssels muss die zugrunde liegende Rollenberechtigung weiterhin besitzen).

### Zugriffskontrolle für Gruppen- und Veranstaltungsnotizen {#group-and-event-notes-access-control}

Zwei weitere Notiztypen sind auf die gleiche Weise geschützt, bei jedem Lese- und Schreibzugriff (auch über die oben genannten öffentlichen Routen), und sind niemals für anonymes Posten offen:

- **`groupNote`** (`contentId` = Gruppen-ID) -- der Feed **Leiternotizen** einer Gruppe. Nur die Leitenden dieser Gruppe (`leaderGroupIds` im JWT) können lesen oder posten. Keine Mitarbeiterberechtigung gewährt Zugriff, auch nicht `content.edit` oder die Berechtigungen zur Gruppenmitgliedschaft.
- **`eventNote`** (`contentId` = Veranstaltungs-ID) -- die Notizen zu einem Kalendereintrag. Mitarbeitende mit `content.edit` oder **Calendars / Admin** können immer lesen und posten. Ansonsten richtet sich der Zugriff nach der `notesViewRole` (Lesen) und `notesPostRole` (Posten) der Veranstaltung: `staff` (Standard, wenn das Feld `null` ist) erlaubt sonst niemandem Zugriff, `leaders` erlaubt den Leitenden der Veranstaltungsgruppe, und `members` erlaubt den Mitgliedern und Leitenden der Veranstaltungsgruppe. Eine Veranstaltung ohne `groupId` ist nur für Mitarbeitende zugänglich.

### Zugriffskontrolle für Notizen auf Workflow-Karten

Konversationen mit `contentType: "workflowCard"` (die Notizen zu einer Workflow-Karte, wobei `contentId` die Aufgaben-ID der Karte ist) sind nur für Personen lesbar und beschreibbar, die diese Karte öffnen dürfen: Benutzer mit der DoingApi-Berechtigung **Tasks / View** sowie die Person oder Gruppe, der die Karte zugewiesen ist, von der sie erstellt wurde oder die sie betrifft. Alle anderen erhalten bei jedem Lesezugriff `401`, auch über die oben genannten öffentlichen Routen. Die Konversation einer Karte wird über die Karte selbst mit `POST /doing/tasks/:id/conversation` (Body `{ "conversationId": "..." }`; die zuerst angehängte Konversation gewinnt) angehängt, was die Bearbeitenden der Karte und ihre zugewiesene Person aufrufen können.

### Beispiel: Eine Konversation starten

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
| GET | `/conversation/:conversationId` | JWT | — | Alle Nachrichten einer Konversation laden |
| GET | `/catchup/:churchId/:conversationId` | Öffentlich | — | Alle Nachrichten einer Konversation laden (öffentlicher Catch-up für Live-Chat) |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Nachricht anhand der ID laden |
| POST | `/` | JWT | — | Nachrichten speichern (Stapelverarbeitung). Sendet Echtzeit-Aktualisierungen und löst Benachrichtigungen aus. Zum Ändern einer bestehenden Nachricht muss man deren Autor sein oder `content.edit` besitzen; der gespeicherte Autor kann niemals neu zugewiesen werden |
| POST | `/send` | Öffentlich | — | Nachrichten senden (Stapelverarbeitung, öffentlich). Sendet Echtzeit-Aktualisierungen über WebSocket und löst Benachrichtigungen aus |
| POST | `/setCallout` | JWT | — | (veraltet) Eine Hervorhebungsnachricht in Echtzeit senden. Kein aktiver Client; der Live-Stream-Chat zeigt Hervorhebungen nicht mehr an |
| DELETE | `/:churchId/:id` | JWT | — | Eine Nachricht löschen und die Löschung in Echtzeit übertragen. Siehe [Moderation von Nachrichten](#message-moderation) |

### Moderation von Nachrichten

Eine Nachricht darf gelöscht werden von:

- dem Autor der Nachricht;
- Mitarbeitenden mit `content.edit` (in der gesamten Gemeinde);
- **Gruppenleitenden** für Konversationen mit `contentType` `group` oder `groupAnnouncement`, deren `contentId` eine Gruppe ist, die sie leiten (`leaderGroupIds` im JWT).

Konversationen zu Personennotizen (`person` / `personConfidential`) werden nie von Leitenden moderiert. Dafür gelten stattdessen die Notizberechtigungen (`people.edit`, `people.viewConfidentialNotes`).

Leitende dürfen nur löschen, nicht bearbeiten: Das Umschreiben der Nachricht eines anderen Mitglieds bleibt auf den Autor und Mitarbeitende mit `content.edit` beschränkt.

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
| GET | `/` | JWT | — | Alle privaten Nachrichten des aktuellen Benutzers laden (enthält die letzte Nachricht pro Konversation und markiert alle als gelesen) |
| GET | `/existing/:personId` | JWT | — | Eine bestehende private Konversation mit einer bestimmten Person finden |
| GET | `/:id` | JWT | — | Eine private Nachricht anhand der ID laden (löscht die Benachrichtigung, wenn sie an den aktuellen Benutzer gerichtet ist) |
| POST | `/` | JWT | — | Private Nachrichten senden (Stapelverarbeitung). Löst eine Push-Benachrichtigung beim Empfänger aus |

## Benachrichtigungen

Basispfad: `/messaging/notifications`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Anzahl ungelesener Benachrichtigungen des aktuellen Benutzers abrufen |
| GET | `/my` | JWT | — | Alle Benachrichtigungen des aktuellen Benutzers laden (markiert alle als gelesen) |
| GET | `/tmpEmail` | Öffentlich | — | Die tägliche E-Mail-Übersicht der Benachrichtigungen auslösen (Debug-/Cron-Endpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Benachrichtigungen einer bestimmten Person laden |
| GET | `/:churchId/:id` | JWT | — | Eine Benachrichtigung anhand der ID laden |
| POST | `/` | JWT | — | Benachrichtigungen erstellen oder aktualisieren (Stapelverarbeitung) |
| POST | `/create` | JWT | — | Benachrichtigungen für mehrere Personen erstellen. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Alle Benachrichtigungen einer Person als gelesen markieren |
| POST | `/sendTest` | JWT | — | Eine Test-Push-Benachrichtigung senden. Body: `{ personId, title }` |
| POST | `/ping` | Öffentlich | — | Eine Benachrichtigung durch einen externen Auslöser erstellen. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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
| GET | `/my` | JWT | — | Benachrichtigungseinstellungen des aktuellen Benutzers laden (legt Standardwerte automatisch an, falls keine vorhanden sind) |
| POST | `/` | JWT | — | Die Einstellungen des aktuellen Benutzers speichern. Body: beliebige der Felder `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, dazu optional `overrides: [{ categoryKey, channel, optedIn }]` (`channel` kann `push`, `email`, `in_app` oder `sms` sein; gesperrte Kategorien werden ignoriert). `allowSms` ist die Zustimmung des Mitglieds zu Textnachricht-Erinnerungen. Ein veraltetes Body-Format als Array von Zeilen wird weiterhin akzeptiert |

## Verbindungen

Basispfad: `/messaging/connections`

Verwaltet WebSocket-/Echtzeitverbindungen für Chats, Gruppenkonversationen, private Nachrichten und Live-Streaming. Siehe [Echtzeit-Architektur](../../realtime.md) für das vollständige Protokoll.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Öffentlich | — | Alle Verbindungen einer Konversation laden |
| POST | `/` | Öffentlich | — | Verbindungen registrieren (Stapelverarbeitung). Löst eine Anwesenheitsübertragung für die Konversation aus. Elemente im Body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Öffentlich | — | Den Anzeigenamen einer Verbindung anhand der Socket-ID aktualisieren. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Öffentlich | — | Eine Verbindung aus einer Konversation entfernen. Löst eine Anwesenheitsübertragung aus |
| POST | `/tmpSendAlert` | Öffentlich | — | Eine Benachrichtigung an die Verbindungen einer Person senden. Body: `{ churchId, personId }` |

## Geräte

Basispfad: `/messaging/devices`

Verwaltet die Geräteregistrierung für Push-Benachrichtigungen und die Inhaltskopplung (z. B. Lessons-App auf TV-Displays).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Ein Gerät registrieren oder aktualisieren (Registrierung für mobile Push-Benachrichtigungen). Abgleich über FCM-Token oder Geräte-ID |
| POST | `/enrollAnon` | Öffentlich | — | Ein anonymes Gerät registrieren und einen 4-stelligen Kopplungscode erzeugen |
| POST | `/` | Öffentlich | — | Geräte speichern (Stapelverarbeitung) |
| GET | `/pair/:pairingCode` | JWT | — | Ein Gerät mit seinem Kopplungscode koppeln. Optional `?contentType=&contentId=`, um Inhalte zuzuweisen |
| GET | `/status/:deviceId` | Öffentlich | — | Den Kopplungsstatus eines Geräts prüfen |
| GET | `/:churchId` | JWT | — | Alle Geräte einer Gemeinde laden |
| GET | `/:churchId/person/:personId` | JWT | — | Alle Geräte einer Person laden |
| GET | `/:churchId/:id` | JWT | — | Ein Gerät anhand der ID laden |
| DELETE | `/:churchId/:id` | JWT | — | Ein Gerät löschen |

### Beispiel: Ein Gerät registrieren

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

## Geräteinhalte

Basispfad: `/messaging/devicecontents`

Verwaltet Inhaltszuweisungen für gekoppelte Geräte (z. B. welche Lektion auf einem Fernseher angezeigt wird).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Inhaltszuweisungen eines Geräts laden |
| POST | `/` | JWT | — | Inhaltszuweisungen für Geräte speichern (Stapelverarbeitung) |
| DELETE | `/:id` | JWT | — | Eine Inhaltszuweisung für ein Gerät löschen |

## Texting

Basispfad: `/messaging/texting`

Verwaltet SMS-Anbieter, Gruppen-Textnachrichten und die Zustellverfolgung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Texting-Anbieter der Gemeinde laden (Zugangsdaten sind maskiert) |
| GET | `/status` | JWT | — | `{ enabled }` – ob die Gemeinde einen aktivierten Texting-Anbieter hat. Jede angemeldete Person der Gemeinde kann dies abrufen; es dient dazu, die Optionen **Text** nur dann anzuzeigen, wenn Textnachrichten gesendet werden können |
| GET | `/inboundUrl` | JWT | `texting.send` oder `settings.edit` | `{ url }` – die eingehende (STOP-)Webhook-URL der Gemeinde, die beim Anbieter eingetragen wird |
| POST | `/inbound/:churchId/:token` | Öffentlich | — | Webhook des Anbieters für eingehende Nachrichten. `token` ist ein HMAC der Gemeinde-ID. Eine Antwort, die genau einem Stoppwort entspricht (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), markiert jede passende Person als `optedOut` und deaktiviert deren `allowSms`. Gibt `{ optedOut: <count> }` zurück; andere Antworten geben `{ optedOut: 0 }` zurück |
| GET | `/preview/:groupId` | JWT | — | Empfänger einer Gruppen-Textnachricht vorab anzeigen (berechtigte, abgemeldete und Anzahl ohne Telefonnummer) |
| GET | `/sent` | JWT | — | Alle gesendeten Textnachrichten-Datensätze der Gemeinde laden |
| GET | `/sent/:id/details` | JWT | — | Eine gesendete Textnachricht mit Zustellprotokollen pro Empfänger laden |
| POST | `/providers` | JWT | — | Texting-Anbieter speichern (Stapelverarbeitung). Verschlüsselt API-Zugangsdaten |
| POST | `/send` | JWT | — | Eine SMS an alle berechtigten Mitglieder einer Gruppe senden. Body: `{ groupId, message }`. Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) werden für jeden Empfänger aufgelöst |
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

Verwaltet wiederverwendbare E-Mail-Vorlagen und den Versand von Vorlagen-E-Mails an Gruppen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle E-Mail-Vorlagen der Gemeinde laden |
| GET | `/:id` | JWT | — | Eine einzelne E-Mail-Vorlage anhand der ID laden |
| GET | `/sendStatus` | JWT | `groupMembers.edit` oder `tasks.admin` | Der E-Mail-Status der Gruppen der Gemeinde: `{ approved, paused, remaining, requested }`. Der Dialog „E-Mail senden“ von B1Admin und die Workflow-Aktion **E-Mail senden** nutzen ihn, um zu warnen, wenn E-Mails nicht versendet werden können |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Beim Support die Freigabe der Gemeinde für Gruppen-E-Mails beantragen (höchstens einmal pro Gemeinde und Woche) |
| GET | `/preview/:groupId` | JWT | — | Vorschau des E-Mail-Versands für eine Gruppe (Anzahl berechtigter Empfänger, Mitglieder ohne E-Mail-Adresse) |
| POST | `/` | JWT | — | E-Mail-Vorlagen erstellen oder aktualisieren (Stapelverarbeitung) |
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

**Unterstützte Platzhalter:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Gesperrte IP-Adressen

Basispfad: `/messaging/blockedips`

(veraltet) IP-Sperre für Live-Stream-Chats. Der B1App-Client ruft `POST /` nicht mehr auf, da die IP-Sperre bei der Umstellung auf die einheitliche Zustellung entfernt wurde. Die Route `/clear` wird weiterhin serverseitig von `StreamingServiceController` aufgerufen, wenn Streaming-Dienste gespeichert werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (veraltet) Gesperrte IP-Adressen speichern (Stapelverarbeitung). Kein aktiver Client |
| POST | `/clear` | JWT | — | Alle gesperrten IP-Adressen für bestimmte Dienste löschen. Body: `[{ serviceId, churchId }]` |

## Zustellprotokolle

Basispfad: `/messaging/deliverylogs`

Verfolgt den Zustellstatus gesendeter Nachrichten (SMS, Push-Benachrichtigungen, E-Mail).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Zustellprotokolle nach Inhaltstyp und ID laden |
| GET | `/person/:personId` | JWT | — | Zustellprotokolle einer Person laden. Optional `?startDate=&endDate=` als Filter |
| GET | `/recent` | JWT | — | Aktuelle Zustellprotokolle der Gemeinde laden. Optional `?limit=` (Standard 100) |
| GET | `/:id` | JWT | — | Ein Zustellprotokoll anhand der ID laden |

## Verwandte Seiten

- [Echtzeit-Architektur](../../realtime.md) -- WebSocket-Protokoll, Raumabonnements und das einheitliche Zustellframework
- [Web-Push-Benachrichtigungen](../../web-push.md) -- Registrierung und Zustellung von Browser-Push-Benachrichtigungen
- [Mitgliedschafts-Endpunkte](./membership.md) -- Personen, Gruppen, Rollen und Kernidentität
- [Anwesenheits-Endpunkte](./attendance.md) -- Erfassung von Gottesdiensten und Besuchen
- [Authentifizierung & Berechtigungen](./authentication.md) -- Anmeldefluss, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure.md) -- Muster zur Code-Organisation
