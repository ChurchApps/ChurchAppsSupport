---
title: "Messaging-Endpunkte"
description: "Referenz der API-Endpunkte für Nachrichten bei ChurchApps: Unterhaltungen, Regeln für den Zugriff auf Notizen, Texting, E-Mail-Vorlagen, Benachrichtigungen und Geräte."
---

# Messaging-Endpunkte

<div class="article-intro">

Das Messaging-Modul verwaltet Echtzeit-Unterhaltungen, Chat-Nachrichten, Push-Benachrichtigungen, SMS- und E-Mail-Zustellung, WebSocket-Verbindungen, private Nachrichten, Geräteregistrierung und Texting-Anbieter. Es stellt die Kommunikationsschicht bereit, die in allen ChurchApps-Anwendungen sowohl für den Live-Chat im Stream als auch für asynchrone Benachrichtigungen genutzt wird.

</div>

**Basispfad:** `/messaging`

## Unterhaltungen {#conversations}

Basispfad: `/messaging/conversations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Lädt Unterhaltungen anhand kommagetrennter IDs mit erster und letzter Nachricht |
| GET | `/messages/:contentType/:contentId` | JWT | — | Lädt Unterhaltungen für einen Inhalt mit paginierten Nachrichten (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ruft Beitrags-Unterhaltungen für die Gruppen des aktuellen Benutzers ab |
| GET | `/posts/group/:groupId` | JWT | — | Ruft Beitrags-Unterhaltungen für eine bestimmte Gruppe ab |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Neueste Notizen aller Datensätze für die Seite Notizen im B1 Admin. `section` ist `people`, `groups`, `events` oder `workflows` (sonst 400); `limit` ist standardmäßig 25 (maximal 100); `before` ist der Cursor der vorherigen Seite. Jede Notiz besteht weiterhin die Regel ihres eigenen Typs (Berechtigung Personen bearbeiten / vertrauliche Notizen, Leiter der Gruppe, Veranstaltungsbetrachter, Betrachter von Workflow-Karten), sodass Aufrufer nur Notizen sehen, die sie öffnen dürften. Der Notiztext wird auf 300 Zeichen gekürzt |
| GET | `/current/:churchId/:contentType/:contentId` | Öffentlich | — | Ruft die aktuelle Unterhaltung für einen Inhalt ab oder erstellt sie (entschlüsselt contentId automatisch) |
| GET | `/:churchId/:contentType/:contentId` | Öffentlich | — | Lädt Unterhaltungen nach Inhaltstyp und ID |
| GET | `/:churchId/:id` | Öffentlich | — | Lädt eine einzelne Unterhaltung nach ID |
| POST | `/` | JWT | — | Erstellt oder aktualisiert Unterhaltungen (Stapel) |
| POST | `/start` | JWT | — | Startet eine neue Unterhaltung mit einer ersten Kommentarnachricht |
| DELETE | `/:churchId/:id` | JWT | — | Löscht eine Unterhaltung |

### Zugriffskontrolle für Personennotizen {#person-notes-access-control}

Unterhaltungen mit `contentType: "person"` (der Reiter Notizen eines Personendatensatzes) oder `contentType: "personConfidential"` (der Abschnitt Vertrauliche Notizen) sind bei jedem Lese- und Schreibpfad geschützt, auch bei den oben genannten öffentlichen Routen, die für diese Inhaltstypen mit `401` antworten. `person` erfordert die Berechtigung MembershipApi **Personen / Bearbeiten**; `personConfidential` erfordert **Personen / Vertrauliche Notizen anzeigen**. Bei eingeschränkten API-Schlüsseln deckt `people:write` beide Aktionen ab (der Benutzer des Schlüssels muss weiterhin die zugrunde liegende Rollenberechtigung besitzen).

### Zugriffskontrolle für Gruppen- und Veranstaltungsnotizen {#group-and-event-notes-access-control}

Zwei weitere Notiz-Inhaltstypen sind auf die gleiche Weise bei jedem Lese- und Schreibpfad geschützt (einschließlich der oben genannten öffentlichen Routen) und stehen nie für anonyme Beiträge offen:

- **`groupNote`** (`contentId` = Gruppen-ID) -- der Feed **Leiternotizen** einer Gruppe. Nur die Leiter dieser Gruppe (`leaderGroupIds` im JWT) können lesen oder schreiben. Keine Mitarbeiterberechtigung gewährt Zugriff, auch nicht `content.edit` und die Berechtigungen für Gruppenmitgliedschaften.
- **`eventNote`** (`contentId` = Veranstaltungs-ID) -- die Notizen zu einer Kalenderveranstaltung. Mitarbeiter mit `content.edit` oder **Kalender / Administrator** können immer lesen und schreiben. Ansonsten richtet sich der Zugriff nach `notesViewRole` (Lesen) und `notesPostRole` (Schreiben) der Veranstaltung: `staff` (der Standard, wenn das Feld `null` ist) lässt niemand anderen zu, `leaders` lässt Leiter der Gruppe der Veranstaltung zu, und `members` lässt Mitglieder und Leiter der Veranstaltungsgruppe zu. Eine Veranstaltung ohne `groupId` ist nur für Mitarbeiter zugänglich.

### Zugriffskontrolle für Notizen zu Workflow-Karten {#workflow-card-notes-access-control}

Unterhaltungen mit `contentType: "workflowCard"` (die Notizen zu einer Workflow-Karte, wobei `contentId` die Aufgaben-ID der Karte ist) sind nur für Personen lesbar und beschreibbar, die diese Karte öffnen dürfen: ein Benutzer mit der Berechtigung DoingApi **Aufgaben / Anzeigen** oder die Person bzw. Gruppe, der die Karte zugewiesen, von der sie erstellt oder für die sie bestimmt ist. Alle anderen erhalten bei jedem Lesepfad `401`, einschließlich der oben genannten öffentlichen Routen. Die Unterhaltung einer Karte wird über die Karte selbst mit `POST /doing/tasks/:id/conversation` angehängt (Body `{ "conversationId": "..." }`; die zuerst angehängte Unterhaltung gewinnt), was die Bearbeiter der Karte und ihr Verantwortlicher aufrufen dürfen.

### Beispiel: Eine Unterhaltung starten {#example-start-a-conversation}

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

## Nachrichten {#messages}

Basispfad: `/messaging/messages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Lädt alle Nachrichten einer Unterhaltung |
| GET | `/catchup/:churchId/:conversationId` | Öffentlich | — | Lädt alle Nachrichten einer Unterhaltung (öffentlicher Nachholmechanismus für Live-Chat) |
| GET | `/:churchId/:id` | Öffentlich | — | Lädt eine einzelne Nachricht nach ID |
| POST | `/` | JWT | — | Speichert Nachrichten (Stapel). Sendet Echtzeit-Updates und löst Benachrichtigungen aus. Das Aktualisieren einer bestehenden Nachricht erfordert, dass man ihr Autor ist oder `content.edit` besitzt; der gespeicherte Autor kann nie neu zugewiesen werden |
| POST | `/send` | Öffentlich | — | Sendet Nachrichten (Stapel, öffentlich). Sendet Echtzeit-Updates über WebSocket und löst Benachrichtigungen aus |
| POST | `/setCallout` | JWT | — | (veraltet) Sendet eine Hinweisnachricht in Echtzeit. Kein aktiver Client; der Live-Stream-Chat zeigt Hinweise nicht mehr an |
| DELETE | `/:churchId/:id` | JWT | — | Löscht eine Nachricht und sendet die Löschung in Echtzeit. Siehe [Moderation von Nachrichten](#message-moderation) |

### Moderation von Nachrichten {#message-moderation}

Das Löschen einer Nachricht ist erlaubt für:

- den Autor der Nachricht;
- Mitarbeiter mit `content.edit` (überall in der Gemeinde);
- **Gruppenleiter** bei Unterhaltungen mit `contentType` `group` oder `groupAnnouncement`, deren `contentId` eine Gruppe ist, die sie leiten (`leaderGroupIds` im JWT).

Unterhaltungen über Personennotizen (`person` / `personConfidential`) werden nie von Leitern moderiert -- sie folgen stattdessen den Notizberechtigungen (`people.edit`, `people.viewConfidentialNotes`).

Leiter dürfen nur löschen, nicht bearbeiten: Das Umschreiben der Nachricht eines anderen Mitglieds bleibt auf den Autor und Mitarbeiter mit `content.edit` beschränkt.

### Beispiel: Eine Nachricht senden {#example-send-a-message}

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

## Private Nachrichten {#private-messages}

Basispfad: `/messaging/privatemessages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lädt alle privaten Nachrichten des aktuellen Benutzers (inklusive letzter Nachricht je Unterhaltung; markiert alle als gelesen) |
| GET | `/existing/:personId` | JWT | — | Findet eine bestehende private Unterhaltung mit einer bestimmten Person |
| GET | `/:id` | JWT | — | Lädt eine private Nachricht nach ID (löscht die Benachrichtigung, wenn sie an den aktuellen Benutzer adressiert ist) |
| POST | `/` | JWT | — | Sendet private Nachrichten (Stapel). Löst eine Push-Benachrichtigung an den Empfänger aus |

## Benachrichtigungen {#notifications}

Basispfad: `/messaging/notifications`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Ruft die Anzahl ungelesener Benachrichtigungen des aktuellen Benutzers ab |
| GET | `/my` | JWT | — | Lädt alle Benachrichtigungen des aktuellen Benutzers (markiert alle als gelesen) |
| GET | `/tmpEmail` | Öffentlich | — | Löst die tägliche E-Mail-Zusammenfassung der Benachrichtigungen aus (Debug-/Cron-Endpunkt) |
| GET | `/:churchId/person/:personId` | JWT | — | Lädt Benachrichtigungen für eine bestimmte Person |
| GET | `/:churchId/:id` | JWT | — | Lädt eine Benachrichtigung nach ID |
| POST | `/` | JWT | — | Erstellt oder aktualisiert Benachrichtigungen (Stapel) |
| POST | `/create` | JWT | — | Erstellt Benachrichtigungen für mehrere Personen. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markiert alle Benachrichtigungen einer Person als gelesen |
| POST | `/sendTest` | JWT | — | Sendet eine Test-Push-Benachrichtigung. Body: `{ personId, title }` |
| POST | `/ping` | Öffentlich | — | Erstellt eine Benachrichtigung aus einem externen Auslöser. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Löscht eine Benachrichtigung |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Zählt, wie viele Mitglieder einer Gruppe ein Push erreichen würde |
| GET | `/churchPreview` | JWT | `content.edit` | Zählt, wie viele Personen ein Push an alle mit der App erreichen würde |
| POST | `/group/send` | JWT | `groupMembers.edit` | Sendet sofort ein Push an die Mitglieder einer Gruppe |

### Beispiel: Benachrichtigungen erstellen {#example-create-notifications}

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

## Geplante Benachrichtigungen {#scheduled-notifications}

Basispfad: `/messaging/scheduledNotifications`

Im Voraus geplante Pushes. `audience` ist `church` (alle mit der App; erfordert `content.edit`) oder `group` (erfordert `groupMembers.edit` und eine `groupId`). Der Titel ist auf 80 Zeichen begrenzt, die Nachricht auf 240. Eine fällige Zeile wird vom Minuten-Timer gesendet.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` oder `content.edit` | Listet geplante und kürzlich versendete Benachrichtigungen der Gemeinde auf |
| POST | `/` | JWT | je nach Zielgruppe | Erstellt eine geplante Benachrichtigung oder aktualisiert eine, wenn `id` gesetzt ist. Body: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Die Aktualisierung einer nicht mehr ausstehenden gibt 409 zurück |
| POST | `/:id/sendNow` | JWT | je nach Zielgruppe | Sendet eine ausstehende Benachrichtigung sofort. Gibt 409 zurück, wenn sie bereits gesendet, storniert wurde oder gerade gesendet wird |
| DELETE | `/:id` | JWT | je nach Zielgruppe | Storniert eine ausstehende Benachrichtigung oder entfernt eine gesendete, fehlgeschlagene oder stornierte aus der Liste. Gibt 409 zurück, während sie gesendet wird |
| DELETE | `/` | JWT | `groupMembers.edit` oder `content.edit` | Entfernt alle gesendeten, fehlgeschlagenen und stornierten Benachrichtigungen für die Zielgruppen, an die der Benutzer senden darf. Gibt `{ deleted }` zurück |

## Benachrichtigungseinstellungen {#notification-preferences}

Basispfad: `/messaging/notificationpreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Listet Benachrichtigungskategorien mit ihren Standard- und erlaubten Kanälen auf |
| GET | `/my` | JWT | — | Lädt die Benachrichtigungseinstellungen des aktuellen Benutzers (legt Standardwerte automatisch an, falls keine existieren) |
| POST | `/` | JWT | — | Speichert die Einstellungen des aktuellen Benutzers. Body: beliebige der Felder `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` sowie optional `overrides: [{ categoryKey, channel, optedIn }]` (channel kann `push`, `email`, `in_app` oder `sms` sein; gesperrte Kategorien werden ignoriert). `allowSms` ist die Zustimmung des Mitglieds zu Texterinnerungen. Ein veralteter Body als Zeilenliste wird weiterhin akzeptiert |

## Verbindungen {#connections}

Basispfad: `/messaging/connections`

Verwaltet WebSocket-/Echtzeitverbindungen für Chat, Gruppenunterhaltungen, private Nachrichten und Live-Streaming. Das vollständige Protokoll findest du unter [Echtzeit-Architektur](../../realtime.md).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Öffentlich | — | Lädt alle Verbindungen einer Unterhaltung |
| POST | `/` | Öffentlich | — | Registriert Verbindungen (Stapel). Löst eine Anwesenheitsmeldung für die Unterhaltung aus. Body-Einträge: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Öffentlich | — | Aktualisiert den Anzeigenamen einer Verbindung anhand der Socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Öffentlich | — | Entfernt eine Verbindung aus einer Unterhaltung. Löst eine Anwesenheitsmeldung aus |
| POST | `/tmpSendAlert` | Öffentlich | — | Sendet eine Benachrichtigung an die Verbindungen einer Person. Body: `{ churchId, personId }` |

## Geräte {#devices}

Basispfad: `/messaging/devices`

Verwaltet die Geräteregistrierung für Push-Benachrichtigungen und die Kopplung von Inhalten (z. B. die Lessons-App auf TV-Bildschirmen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registriert oder aktualisiert ein Gerät (Push-Registrierung auf dem Mobilgerät). Gleicht anhand des FCM-Tokens oder der Geräte-ID ab |
| POST | `/enrollAnon` | Öffentlich | — | Registriert ein anonymes Gerät und erzeugt einen 4-stelligen Kopplungscode |
| POST | `/` | Öffentlich | — | Speichert Geräte (Stapel) |
| GET | `/pair/:pairingCode` | JWT | — | Koppelt ein Gerät mit seinem Kopplungscode. Optional `?contentType=&contentId=`, um Inhalte zuzuweisen |
| GET | `/status/:deviceId` | Öffentlich | — | Prüft den Kopplungsstatus eines Geräts |
| GET | `/:churchId` | JWT | — | Lädt alle Geräte einer Gemeinde |
| GET | `/:churchId/person/:personId` | JWT | — | Lädt alle Geräte einer Person |
| GET | `/:churchId/:id` | JWT | — | Lädt ein Gerät nach ID |
| DELETE | `/:churchId/:id` | JWT | — | Löscht ein Gerät |

### Beispiel: Ein Gerät registrieren {#example-enroll-a-device}

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

## Geräteinhalte {#device-contents}

Basispfad: `/messaging/devicecontents`

Verwaltet Inhaltszuweisungen für gekoppelte Geräte (z. B. welche Lektion auf einem TV angezeigt wird).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Lädt die Inhaltszuweisungen eines Geräts |
| POST | `/` | JWT | — | Speichert Inhaltszuweisungen von Geräten (Stapel) |
| DELETE | `/:id` | JWT | — | Löscht eine Inhaltszuweisung eines Geräts |

## Texting {#texting}

Basispfad: `/messaging/texting`

Verwaltet SMS-Texting-Anbieter, den Versand von Gruppennachrichten per SMS und die Zustellverfolgung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Lädt die Texting-Anbieter der Gemeinde (Zugangsdaten sind maskiert) |
| GET | `/status` | JWT | — | `{ enabled }` -- ob die Gemeinde einen aktivierten Texting-Anbieter hat. Jeder angemeldete Benutzer der Gemeinde; dient dazu, **Text**-Optionen nur anzuzeigen, wenn SMS versendet werden können |
| GET | `/inboundUrl` | JWT | `texting.send` oder `settings.edit` | `{ url }` -- die eingehende Webhook-URL (STOP) der Gemeinde, die beim Anbieter eingetragen wird |
| POST | `/inbound/:churchId/:token` | Öffentlich | — | Webhook für eingehende Nachrichten des Anbieters. `token` ist ein HMAC der Gemeinde-ID. Eine Antwort, die genau einem Stopp-Wort entspricht (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), markiert jede passende Person als `optedOut` und schaltet deren `allowSms` aus. Gibt `{ optedOut: <count> }` zurück; andere Antworten geben `{ optedOut: 0 }` zurück |
| GET | `/preview/:groupId` | JWT | — | Zeigt Empfänger einer Gruppen-SMS in der Vorschau (Anzahl berechtigter, abgemeldeter und Personen ohne Telefonnummer) |
| GET | `/sent` | JWT | — | Lädt alle versendeten SMS-Datensätze der Gemeinde |
| GET | `/sent/:id/details` | JWT | — | Lädt eine versendete SMS mit Zustellprotokollen je Empfänger |
| POST | `/providers` | JWT | — | Speichert Texting-Anbieter (Stapel). Verschlüsselt API-Zugangsdaten |
| POST | `/send` | JWT | — | Sendet eine SMS an alle berechtigten Mitglieder einer Gruppe. Body: `{ groupId, message }`. Platzhalterfelder (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) werden pro Empfänger aufgelöst |
| POST | `/sendPerson` | JWT | — | Sendet eine SMS an eine einzelne Person. Body: `{ personId, phoneNumber, message }`. Platzhalterfelder werden aufgelöst, und der aufgelöste Text wird protokolliert |
| DELETE | `/providers/:id` | JWT | — | Löscht einen Texting-Anbieter |

### Beispiel: Gruppen-SMS senden {#example-send-group-text}

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

## E-Mail-Vorlagen {#email-templates}

Basispfad: `/messaging/emailTemplates`

Verwaltet wiederverwendbare E-Mail-Vorlagen und das Versenden vorlagenbasierter E-Mails an Gruppen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lädt alle E-Mail-Vorlagen der Gemeinde |
| GET | `/:id` | JWT | — | Lädt eine E-Mail-Vorlage nach ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` oder `tasks.admin` | Der E-Mail-Status der Gruppen der Gemeinde: `{ approved, paused, remaining, requested }`. Der Dialog E-Mail senden im B1Admin und die Workflow-Aktion **E-Mail senden** nutzen ihn, um zu warnen, wenn keine E-Mails versendet werden |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Bittet den Support, die Gemeinde für Gruppen-E-Mails freizuschalten (höchstens einmal pro Gemeinde und Woche) |
| GET | `/preview/:groupId` | JWT | — | Zeigt die E-Mail-Zustellung für eine Gruppe in der Vorschau (Anzahl berechtigter Empfänger, Mitglieder ohne E-Mail) |
| POST | `/` | JWT | — | Erstellt oder aktualisiert E-Mail-Vorlagen (Stapel) |
| POST | `/send` | JWT | — | Sendet eine vorlagenbasierte E-Mail an alle Mitglieder einer Gruppe. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Löscht eine E-Mail-Vorlage |

### Beispiel: E-Mail an eine Gruppe senden {#example-send-email-to-group}

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

## Gesperrte IP-Adressen {#blocked-ips}

Basispfad: `/messaging/blockedips`

(veraltet) IP-Sperre für den Live-Stream-Chat. Der B1App-Client ruft `POST /` nicht mehr auf -- die IP-Sperre wurde bei der Migration zur einheitlichen Zustellung entfernt. Die Route `/clear` wird weiterhin server-zu-server von `StreamingServiceController` aufgerufen, wenn Streaming-Gottesdienste gespeichert werden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (veraltet) Speichert gesperrte IPs (Stapel). Kein aktiver Client |
| POST | `/clear` | JWT | — | Entfernt alle gesperrten IPs für bestimmte Gottesdienste. Body: `[{ serviceId, churchId }]` |

## Zustellprotokolle {#delivery-logs}

Basispfad: `/messaging/deliverylogs`

Verfolgt den Zustellstatus gesendeter Nachrichten (SMS, Push-Benachrichtigungen, E-Mail).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Lädt Zustellprotokolle nach Inhaltstyp und ID |
| GET | `/person/:personId` | JWT | — | Lädt Zustellprotokolle einer Person. Optional `?startDate=&endDate=` als Filter |
| GET | `/recent` | JWT | — | Lädt die neuesten Zustellprotokolle der Gemeinde. Optional `?limit=` (Standard 100) |
| GET | `/:id` | JWT | — | Lädt ein Zustellprotokoll nach ID |

## Verwandte Seiten {#related-pages}

- [Echtzeit-Architektur](../../realtime.md) -- WebSocket-Protokoll, Raumabonnements und das einheitliche Zustellsystem
- [Web-Push-Benachrichtigungen](../../web-push.md) -- Browser-Push-Registrierung und Zustellung
- [Membership-Endpunkte](./membership.md) -- Personen, Gruppen, Rollen und Kernidentität
- [Anwesenheits-Endpunkte](./attendance.md) -- Erfassung von Gottesdiensten und Besuchen
- [Authentifizierung & Berechtigungen](./authentication.md) -- Anmeldeablauf, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure.md) -- Organisationsmuster des Codes
