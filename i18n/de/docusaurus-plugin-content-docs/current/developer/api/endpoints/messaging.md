---
title: "Messaging-Endpunkte"
description: "Referenz für die API-Endpunkte des ChurchApps-Messaging: Unterhaltungen, Zugriffsregeln für Notizen, Textnachrichten, E-Mail-Vorlagen, Benachrichtigungen und Geräte."
---

# Messaging-Endpunkte

<div class="article-intro">

Das Messaging-Modul verwaltet Echtzeit-Unterhaltungen, Chat-Nachrichten, Push-Benachrichtigungen, SMS- und E-Mail-Zustellung, WebSocket-Verbindungen, private Nachrichten, Geräteregistrierung und Anbieter für Textnachrichten. Es bildet die Kommunikationsschicht für alle ChurchApps-Anwendungen, sowohl für Live-Stream-Chats als auch für asynchrone Benachrichtigungen.

</div>

**Basispfad:** `/messaging`

## Unterhaltungen

Basispfad: `/messaging/conversations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Unterhaltungen anhand kommagetrennter IDs laden, mit erster und letzter Nachricht |
| GET | `/messages/:contentType/:contentId` | JWT | — | Unterhaltungen zu Inhalten mit paginierten Nachrichten laden (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Beitragsunterhaltungen der Gruppen des aktuellen Benutzers abrufen |
| GET | `/posts/group/:groupId` | JWT | — | Beitragsunterhaltungen einer bestimmten Gruppe abrufen |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Neueste Notizen über alle Datensätze hinweg für die Seite Notizen in B1 Admin. `section` ist `people`, `groups`, `events` oder `workflows` (sonst 400). `limit` ist standardmäßig 25 (max. 100). `before` ist der Cursor von der vorherigen Seite. Jede Notiz unterliegt weiterhin der Regel ihres eigenen Typs (Berechtigung Personen bearbeiten / vertrauliche Notizen, Leitende der Gruppe, Veranstaltungsbetrachter, Betrachter von Workflow-Karten), sodass Aufrufende nur Notizen sehen, die sie öffnen könnten. Der Notiztext wird auf 300 Zeichen gekürzt |
| GET | `/current/:churchId/:contentType/:contentId` | Öffentlich | — | Die aktuelle Unterhaltung zu Inhalten abrufen oder anlegen (entschlüsselt contentId automatisch) |
| GET | `/:churchId/:contentType/:contentId` | Öffentlich | — | Unterhaltungen anhand von Inhaltstyp und ID laden |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Unterhaltung anhand der ID laden |
| POST | `/` | JWT | — | Unterhaltungen anlegen oder aktualisieren (Stapel) |
| POST | `/start` | JWT | — | Eine neue Unterhaltung mit einer ersten Kommentarnachricht beginnen |
| DELETE | `/:churchId/:id` | JWT | — | Eine Unterhaltung löschen |

### Zugriffskontrolle für Personennotizen

Unterhaltungen mit `contentType: "person"` (der Reiter Notizen eines Personendatensatzes) oder `contentType: "personConfidential"` (der Bereich Vertrauliche Notizen) sind auf jedem Lese- und Schreibpfad geschützt, auch auf den oben sonst öffentlichen Routen. Sie liefern für diese Inhaltstypen `401`. `person` erfordert die MembershipApi-Berechtigung **Personen / Bearbeiten**, `personConfidential` die Berechtigung **Personen / Vertrauliche Notizen anzeigen**. Bei eingeschränkten API-Schlüsseln umfasst `people:write` beide Aktionen (der Benutzer des Schlüssels muss weiterhin die zugrunde liegende Rollenberechtigung besitzen).

### Zugriffskontrolle für Gruppen- und Veranstaltungsnotizen {#group-and-event-notes-access-control}

Zwei weitere Notiztypen sind auf die gleiche Weise geschützt, auf jedem Lese- und Schreibpfad (auch auf den oben genannten öffentlichen Routen). Sie sind nie für anonyme Beiträge offen:

- **`groupNote`** (`contentId` = Gruppen-ID) -- Der Feed **Leitungsnotizen** einer Gruppe. Nur die Leitenden dieser Gruppe (`leaderGroupIds` im JWT) können lesen oder schreiben. Keine Mitarbeiterberechtigung gewährt Zugriff, auch nicht `content.edit` und die Berechtigungen für Gruppenmitglieder.
- **`eventNote`** (`contentId` = Veranstaltungs-ID) -- Die Notizen zu einer Kalenderveranstaltung. Mitarbeitende mit `content.edit` oder **Kalender / Administration** können immer lesen und schreiben. Sonst richtet sich der Zugriff nach `notesViewRole` (Lesen) und `notesPostRole` (Schreiben) der Veranstaltung: `staff` (der Standard, wenn das Feld `null` ist) erlaubt sonst niemandem Zugriff, `leaders` erlaubt den Leitenden der Gruppe der Veranstaltung und `members` erlaubt den Mitgliedern und Leitenden der Veranstaltungsgruppe. Eine Veranstaltung ohne `groupId` ist nur für Mitarbeitende.

### Zugriffskontrolle für Notizen von Workflow-Karten

Unterhaltungen mit `contentType: "workflowCard"` (die Notizen einer Workflow-Karte, bei der `contentId` die Aufgaben-ID der Karte ist) können nur von Personen gelesen und beschrieben werden, die diese Karte öffnen dürfen. Das sind Benutzer mit der DoingApi-Berechtigung **Aufgaben / Anzeigen** sowie die Person oder Gruppe, der die Karte zugewiesen, von der sie erstellt oder über die sie ist. Alle anderen erhalten auf jedem Lesepfad `401`, auch auf den oben genannten öffentlichen Routen. Eine Unterhaltung wird über die Karte selbst mit `POST /doing/tasks/:id/conversation` (Body `{ "conversationId": "..." }`; die zuerst angehängte Unterhaltung gewinnt) angehängt. Das können die Bearbeitenden der Karte und ihre zugewiesene Person aufrufen.

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

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Alle Nachrichten einer Unterhaltung laden |
| GET | `/catchup/:churchId/:conversationId` | Öffentlich | — | Alle Nachrichten einer Unterhaltung laden (öffentlicher Aufholmechanismus für Live-Chat) |
| GET | `/:churchId/:id` | Öffentlich | — | Eine einzelne Nachricht anhand der ID laden |
| POST | `/` | JWT | — | Nachrichten speichern (Stapel). Sendet Echtzeit-Aktualisierungen und löst Benachrichtigungen aus. Eine bestehende Nachricht zu aktualisieren erfordert, dass man ihr Autor ist oder `content.edit` besitzt. Der gespeicherte Autor kann nie neu zugewiesen werden |
| POST | `/send` | Öffentlich | — | Nachrichten senden (Stapel, öffentlich). Sendet Echtzeit-Aktualisierungen über WebSocket und löst Benachrichtigungen aus |
| POST | `/setCallout` | JWT | — | (veraltet) Einen Hinweis in Echtzeit übertragen. Kein aktiver Client. Der Live-Stream-Chat zeigt Hinweise nicht mehr an |
| DELETE | `/:churchId/:id` | JWT | — | Eine Nachricht löschen und die Löschung in Echtzeit übertragen. Siehe [Moderation von Nachrichten](#message-moderation) |

### Moderation von Nachrichten {#message-moderation}

Eine Nachricht löschen dürfen:

- der Autor der Nachricht;
- Mitarbeitende mit `content.edit` (in der ganzen Gemeinde);
- **Gruppenleitende** bei Unterhaltungen mit einem `contentType` von `group` oder `groupAnnouncement`, deren `contentId` eine Gruppe ist, die sie leiten (`leaderGroupIds` im JWT).

Unterhaltungen zu Personennotizen (`person` / `personConfidential`) werden nie durch Leitende moderiert. Sie unterliegen den Notizberechtigungen (`people.edit`, `people.viewConfidentialNotes`).

Leitende dürfen nur löschen, nicht bearbeiten. Eine Nachricht eines anderen Mitglieds umzuschreiben bleibt auf den Autor und Mitarbeitende mit `content.edit` beschränkt.

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
| GET | `/` | JWT | — | Alle privaten Nachrichten des aktuellen Benutzers laden (mit der letzten Nachricht je Unterhaltung, markiert alle als gelesen) |
| GET | `/existing/:personId` | JWT | — | Eine bestehende private Unterhaltung mit einer bestimmten Person finden |
| GET | `/:id` | JWT | — | Eine private Nachricht anhand der ID laden (löscht die Benachrichtigung, wenn sie an den aktuellen Benutzer gerichtet ist) |
| POST | `/` | JWT | — | Private Nachrichten senden (Stapel). Löst eine Push-Benachrichtigung an den Empfänger aus |

## Benachrichtigungen

Basispfad: `/messaging/notifications`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Anzahl ungelesener Benachrichtigungen des aktuellen Benutzers abrufen |
| GET | `/my` | JWT | — | Alle Benachrichtigungen des aktuellen Benutzers laden (markiert alle als gelesen) |
| GET | `/tmpEmail` | Öffentlich | — | Die tägliche E-Mail-Übersicht der Benachrichtigungen auslösen (Debug-/Cron-Endpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Benachrichtigungen einer bestimmten Person laden |
| GET | `/:churchId/:id` | JWT | — | Eine Benachrichtigung anhand der ID laden |
| POST | `/` | JWT | — | Benachrichtigungen anlegen oder aktualisieren (Stapel) |
| POST | `/create` | JWT | — | Benachrichtigungen für mehrere Personen anlegen. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Alle Benachrichtigungen einer Person als gelesen markieren |
| POST | `/sendTest` | JWT | — | Eine Test-Push-Benachrichtigung senden. Body: `{ personId, title }` |
| POST | `/ping` | Öffentlich | — | Eine Benachrichtigung aus einem externen Auslöser anlegen. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Eine Benachrichtigung löschen |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Zählen, wie viele Mitglieder einer Gruppe ein Push erreichen würde |
| GET | `/churchPreview` | JWT | `content.edit` | Zählen, wie viele Personen ein Push an alle mit der App erreichen würde |
| POST | `/group/send` | JWT | `groupMembers.edit` | Einen Push sofort an die Mitglieder einer Gruppe senden |

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

## Geplante Benachrichtigungen

Basispfad: `/messaging/scheduledNotifications`

Pushes, die im Voraus geplant sind. `audience` ist `church` (alle mit der App; erfordert `content.edit`) oder `group` (erfordert `groupMembers.edit` und eine `groupId`). Der Titel ist auf 80 Zeichen begrenzt, die Nachricht auf 240. Eine fällige Zeile wird vom Ein-Minuten-Timer gesendet.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` oder `content.edit` | Geplante und kürzlich gesendete Benachrichtigungen der Gemeinde auflisten |
| POST | `/` | JWT | je nach Zielgruppe | Eine geplante Benachrichtigung anlegen oder, wenn `id` gesetzt ist, aktualisieren. Body: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Eine Benachrichtigung, die nicht mehr ausstehend ist, liefert beim Aktualisieren 409 |
| POST | `/:id/sendNow` | JWT | je nach Zielgruppe | Eine ausstehende Benachrichtigung sofort senden. Liefert 409, wenn sie bereits gesendet, abgebrochen wurde oder gerade gesendet wird |
| DELETE | `/:id` | JWT | je nach Zielgruppe | Eine ausstehende Benachrichtigung abbrechen oder eine gesendete, fehlgeschlagene oder abgebrochene aus der Liste entfernen. Liefert 409, solange sie gerade gesendet wird |
| DELETE | `/` | JWT | `groupMembers.edit` oder `content.edit` | Jede gesendete, fehlgeschlagene und abgebrochene Benachrichtigung für die Zielgruppen entfernen, an die der Benutzer senden darf. Liefert `{ deleted }` |

## Benachrichtigungseinstellungen

Basispfad: `/messaging/notificationpreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Benachrichtigungskategorien mit ihren Standard- und erlaubten Kanälen auflisten |
| GET | `/my` | JWT | — | Benachrichtigungseinstellungen des aktuellen Benutzers laden (legt Standardwerte an, wenn keine existieren) |
| POST | `/` | JWT | — | Die Einstellungen des aktuellen Benutzers speichern. Body: beliebige der Felder `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` sowie optional `overrides: [{ categoryKey, channel, optedIn }]` (channel kann `push`, `email`, `in_app` oder `sms` sein; gesperrte Kategorien werden ignoriert). `allowSms` ist die Zustimmung des Mitglieds zu Textnachricht-Erinnerungen. Ein veralteter Body als Array von Zeilen wird weiterhin akzeptiert |

## Verbindungen

Basispfad: `/messaging/connections`

Verwaltet WebSocket-Verbindungen in Echtzeit für Chat, Gruppenunterhaltungen, private Nachrichten und Live-Streaming. Das vollständige Protokoll finden Sie unter [Echtzeit-Architektur](../../realtime.md).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Öffentlich | — | Alle Verbindungen einer Unterhaltung laden |
| POST | `/` | Öffentlich | — | Verbindungen registrieren (Stapel). Löst eine Anwesenheitsübertragung in der Unterhaltung aus. Elemente des Bodys: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Öffentlich | — | Den Anzeigenamen einer Verbindung anhand der Socket-ID aktualisieren. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Öffentlich | — | Eine Verbindung aus einer Unterhaltung entfernen. Löst eine Anwesenheitsübertragung aus |
| POST | `/tmpSendAlert` | Öffentlich | — | Eine Benachrichtigung an die Verbindungen einer Person senden. Body: `{ churchId, personId }` |

## Geräte

Basispfad: `/messaging/devices`

Verwaltet die Geräteregistrierung für Push-Benachrichtigungen und die Kopplung von Inhalten (z. B. die Lessons-App auf TV-Bildschirmen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Ein Gerät registrieren oder aktualisieren (mobile Push-Registrierung). Zuordnung über FCM-Token oder Geräte-ID |
| POST | `/enrollAnon` | Öffentlich | — | Ein anonymes Gerät registrieren und einen 4-stelligen Kopplungscode erzeugen |
| POST | `/` | Öffentlich | — | Geräte speichern (Stapel) |
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

Verwaltet die Inhaltszuweisungen für gekoppelte Geräte (z. B. welche Lektion auf einem TV angezeigt wird).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Inhaltszuweisungen eines Geräts laden |
| POST | `/` | JWT | — | Inhaltszuweisungen der Geräte speichern (Stapel) |
| DELETE | `/:id` | JWT | — | Eine Inhaltszuweisung eines Geräts löschen |

## Textnachrichten

Basispfad: `/messaging/texting`

Verwaltet SMS-Anbieter, Gruppen-Textnachrichten und die Nachverfolgung der Zustellung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Anbieter für Textnachrichten der Gemeinde laden (Zugangsdaten sind maskiert) |
| GET | `/status` | JWT | — | `{ enabled }`: ob die Gemeinde einen aktivierten Anbieter für Textnachrichten hat. Jeder angemeldete Benutzer der Gemeinde; dient dazu, **Text**-Optionen nur anzuzeigen, wenn Textnachrichten gesendet werden können |
| GET | `/inboundUrl` | JWT | `texting.send` oder `settings.edit` | `{ url }`: die eingehende Webhook-URL (STOP) der Gemeinde, die in den Anbieter eingefügt wird |
| POST | `/inbound/:churchId/:token` | Öffentlich | — | Webhook für eingehende Nachrichten des Anbieters. `token` ist ein HMAC der Gemeinde-ID. Eine Antwort, die genau einem Stoppwort entspricht (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), markiert alle passenden Personen als `optedOut` und schaltet deren `allowSms` aus. Liefert `{ optedOut: <count> }`. Andere Antworten liefern `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Empfänger einer Gruppen-Textnachricht vorab anzeigen (Anzahl geeigneter, abgemeldeter und Personen ohne Telefonnummer) |
| GET | `/sent` | JWT | — | Alle gesendeten Textnachrichten-Datensätze der Gemeinde laden |
| GET | `/sent/:id/details` | JWT | — | Eine gesendete Textnachricht mit Zustellprotokollen je Empfänger laden |
| POST | `/providers` | JWT | — | Anbieter für Textnachrichten speichern (Stapel). Verschlüsselt API-Zugangsdaten |
| POST | `/send` | JWT | — | Eine SMS an alle geeigneten Mitglieder einer Gruppe senden. Body: `{ groupId, message }`. Platzhalter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) werden für jeden Empfänger aufgelöst |
| POST | `/sendPerson` | JWT | — | Eine SMS an eine einzelne Person senden. Body: `{ personId, phoneNumber, message }`. Platzhalter werden aufgelöst, und der aufgelöste Text wird protokolliert |
| DELETE | `/providers/:id` | JWT | — | Einen Anbieter für Textnachrichten löschen |

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

Verwaltet wiederverwendbare E-Mail-Vorlagen und das Versenden von Vorlagen-E-Mails an Gruppen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle E-Mail-Vorlagen der Gemeinde laden |
| GET | `/:id` | JWT | — | Eine einzelne E-Mail-Vorlage anhand der ID laden |
| GET | `/sendStatus` | JWT | `groupMembers.edit` oder `tasks.admin` | Der E-Mail-Status der Gemeinde für Gruppen: `{ approved, paused, remaining, requested }`. Der Dialog E-Mail senden in B1 Admin und die Workflow-Aktion **E-Mail senden** nutzen ihn, um zu warnen, wenn keine E-Mails versendet werden |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Support bitten, die Gemeinde für Gruppen-E-Mails freizugeben (höchstens einmal pro Gemeinde und Woche) |
| GET | `/preview/:groupId` | JWT | — | Die E-Mail-Zustellung für eine Gruppe vorab anzeigen (Anzahl geeigneter Empfänger, Mitglieder ohne E-Mail-Adresse) |
| POST | `/` | JWT | — | E-Mail-Vorlagen anlegen oder aktualisieren (Stapel) |
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

(veraltet) IP-Sperre für den Live-Stream-Chat. Der B1App-Client ruft `POST /` nicht mehr auf. Die IP-Sperre wurde bei der Migration auf die einheitliche Zustellung entfernt. Die Route `/clear` wird weiterhin serverseitig vom `StreamingServiceController` aufgerufen, wenn Streaming-Dienste gespeichert werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (veraltet) Gesperrte IP-Adressen speichern (Stapel). Kein aktiver Client |
| POST | `/clear` | JWT | — | Alle gesperrten IP-Adressen für bestimmte Dienste löschen. Body: `[{ serviceId, churchId }]` |

## Zustellprotokolle

Basispfad: `/messaging/deliverylogs`

Verfolgt den Zustellstatus gesendeter Nachrichten (SMS, Push-Benachrichtigungen, E-Mail).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Zustellprotokolle anhand von Inhaltstyp und ID laden |
| GET | `/person/:personId` | JWT | — | Zustellprotokolle einer Person laden. Optional `?startDate=&endDate=` als Filter |
| GET | `/recent` | JWT | — | Aktuelle Zustellprotokolle der Gemeinde laden. Optional `?limit=` (Standard 100) |
| GET | `/:id` | JWT | — | Ein Zustellprotokoll anhand der ID laden |

## Verwandte Seiten

- [Echtzeit-Architektur](../../realtime.md) -- WebSocket-Protokoll, Raumabonnements und das einheitliche Zustellsystem
- [Web-Push-Benachrichtigungen](../../web-push.md) -- Registrierung und Zustellung im Browser
- [Mitgliedschafts-Endpunkte](./membership.md) -- Personen, Gruppen, Rollen und die zentrale Identität
- [Anwesenheits-Endpunkte](./attendance.md) -- Erfassung von Gottesdiensten und Besuchen
- [Authentifizierung & Berechtigungen](./authentication.md) -- Anmeldeablauf, JWT, OAuth und das Berechtigungsmodell
- [Modulstruktur](../module-structure.md) -- Muster der Code-Organisation
