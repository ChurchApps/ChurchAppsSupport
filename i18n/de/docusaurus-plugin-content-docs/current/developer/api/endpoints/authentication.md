---
title: "Authentifizierung & Berechtigungen"
---

# Authentifizierung & Berechtigungen

<div class="article-intro">

Die ChurchApps-API verwendet eine JWT-basierte Authentifizierung. Benutzer melden sich an und erhalten ein Token, das ihre Identität, Kirchenzugehörigkeit und Berechtigungen enthält. Diese Seite beschreibt den Anmeldeablauf, das Berechtigungsmodell und die OAuth-Unterstützung.

</div>

## Anmeldeablauf

### Standardanmeldung

```
POST /membership/users/login
```

**Auth:** öffentlich

Akzeptiert eine von drei Arten von Zugangsdaten:

| Feld | Beschreibung |
|-------|-------------|
| `email` + `password` | Standardanmeldung mit E-Mail-Adresse und Passwort |
| `jwt` | Erneute Authentifizierung mit einem vorhandenen JWT |
| `authGuid` | Einmaliger Authentifizierungslink (verwendet in Willkommens- und Zurücksetzen-E-Mails) |

**Antwort:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

Das Feld `token` ist ein JWT, das bei allen weiteren Anfragen als `Authorization: Bearer <token>` gesendet werden sollte.

### Inhalt des Tokens

Das JWT enthält:
- `id` – Benutzer-ID
- `churchId` – aktuell ausgewählte Kirche
- `personId` – Personendatensatz für die ausgewählte Kirche
- Berechtigungs-Arrays pro API

### Auswahl der Kirche

Benutzer können mehreren Kirchen angehören. Die Antwort der Anmeldung enthält alle Kirchen mit ihren Berechtigungen. Um die Kirche zu wechseln, erzeugt der Client anhand der Daten der Anmeldeantwort ein neues JWT für eine andere Kirche.

## Benutzerregistrierung

### Einen neuen Benutzer registrieren

```
POST /membership/users/register
```

**Auth:** öffentlich

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Legt einen Benutzer mit einem temporären Passwort an und sendet eine Willkommens-E-Mail mit einem Authentifizierungslink. Der erste auf einer neuen Instanz registrierte Benutzer erhält automatisch Serveradministrationszugriff.

Zwei optionale Felder dienen als Bot-Falle: `website` (ein verstecktes Honeypot-Feld, das echte Benutzer leer lassen) und `fillMs` (wie lange das Formular geöffnet war, in Millisekunden). Ist `website` ausgefüllt oder ist `fillMs` kleiner als 2000, wird kein Konto angelegt. Der Endpunkt antwortet dennoch mit einem normal aussehenden `200`, damit Bots nicht erkennen können, dass sie abgelehnt wurden. Clients, die beide Felder weglassen, registrieren sich wie üblich.

### Eine neue Kirche registrieren

```
POST /membership/churches/add
```

**Auth:** JWT

Nachdem Sie einen Benutzer registriert haben, rufen Sie diesen Endpunkt auf, um eine Kirche anzulegen und den Benutzer ihr zuzuordnen.

## Passwortverwaltung

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Öffentlich | Sendet eine E-Mail zum Zurücksetzen des Passworts. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Öffentlich | Setzt ein neues Passwort mit einer Auth-GUID aus der Zurücksetzen-E-Mail. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Ändert das Passwort des aktuellen Benutzers. Body: `{ "newPassword": "..." }` |

## Berechtigungsmodell

Berechtigungen sind nach Modul gegliedert und über Rollen Benutzern zugewiesen. Jede Berechtigung hat einen **Inhaltstyp** und eine **Aktion**.

### Referenz der Berechtigungen

| Anzeigebereich | Inhaltstyp | Aktion | Beschreibung |
|----------------|--------------|--------|-------------|
| **Anwesenheit** | Attendance | Checkin | Mitglieder bei Gottesdiensten einchecken |
| | Attendance | Edit | Anwesenheitsdatensätze bearbeiten |
| | Services | Edit | Gottesdienste und Gottesdienstzeiten verwalten |
| | Attendance | View | Anwesenheitsdatensätze anzeigen |
| | Attendance | View Summary | Anwesenheitszusammenfassungen und Berichte anzeigen |
| **Spenden** | Donations | Edit | Spendenbuchungen erstellen und bearbeiten |
| | Settings | Edit | Einstellungen zu Spenden und Zahlungen bearbeiten |
| | Donations | View Summary | Spendenübersichten anzeigen |
| | Donations | View | Einzelne Spendenbuchungen anzeigen |
| **Personen und Gruppen** | Forms | Admin | Vollständige Verwaltung der Formulare |
| | Forms | Edit | Formulardefinitionen bearbeiten |
| | Plans | Edit | Dienstpläne bearbeiten |
| | Group Members | Edit | Gruppenmitglieder hinzufügen und entfernen |
| | Groups | Edit | Gruppen erstellen und bearbeiten |
| | Households | Edit | Haushaltszuordnungen bearbeiten |
| | People | Edit | Jeden Personendatensatz bearbeiten |
| | People | Edit Self | Nur den eigenen Personendatensatz bearbeiten |
| | Roles | Edit | Rollen und Benutzerzuordnungen verwalten |
| | Group Members | View | Gruppenmitgliederlisten anzeigen |
| | People | View Members | Nur Mitglieder (keine Gäste) anzeigen |
| | People | View | Alle Personen anzeigen |
| | Roles | View | Rollen und Zuordnungen anzeigen |
| | Settings | Edit | Kircheneinstellungen bearbeiten |
| **Inhalte** | Content | Edit | Seiten, Abschnitte und Elemente bearbeiten |
| | Settings | Edit | Inhaltseinstellungen bearbeiten |
| | StreamingServices | Edit | Konfiguration der Streaming-Dienste verwalten |
| | Chat | Host | Chatsitzungen moderieren und leiten |
| **Nachrichten** | Texting | Send | SMS-Nachrichten senden |

### Wie Berechtigungen geprüft werden

In den Controllern werden Berechtigungen über die Methode `au.checkAccess()` geprüft:

```typescript
// Bestimmte Berechtigung verlangen
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Oder innerhalb von actionWrapper – das CRUD-System prüft automatisch
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Serveradministrator

Die Berechtigung `Server.Admin` gewährt vollen Zugriff auf alle Kirchen. Sie wird dem ersten registrierten Benutzer zugewiesen und kann über die Serverrolle an andere vergeben werden.

## OAuth 2.0

Die API unterstützt OAuth 2.0 für Drittanbieter-Integrationen. Zwei Grant-Typen stehen zur Verfügung.

### Authorization-Code-Ablauf

1. **Autorisieren:** `POST /membership/oauth/authorize` (JWT erforderlich)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, nur `S256`) sind für öffentliche Clients ohne Geheimnis erforderlich
   - Rückgabe: `{ "code": "...", "state": "..." }`

2. **Code gegen Token tauschen:** `POST /membership/oauth/token` (öffentlich)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Senden Sie `code_verifier`, wenn der Autorisierungsschritt eine `code_challenge` verwendet hat. Öffentliche Clients lassen `client_secret` weg. JSON- oder form-kodierte Anfragekörper werden akzeptiert.
   - Rückgabe: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh-Token:** `POST /membership/oauth/token` (öffentlich)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Zugriffstoken laufen nach **12 Stunden** ab.

### Gerätecode-Ablauf (RFC 8628)

Für Geräte ohne Browser (TV-Apps, Kioske):

1. **Gerätecode anfordern:** `POST /membership/oauth/device/authorize` (öffentlich)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Rückgabe: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Der Benutzer gibt den Code** an der Verifizierungs-URI ein und genehmigt oder lehnt ab.

3. **Auf das Token warten:** `POST /membership/oauth/token` (öffentlich)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Liefert `authorization_pending`, bis genehmigt wird, und danach das Zugriffstoken

### Verwaltung der OAuth-Clients

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Alle OAuth-Clients auflisten |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client anhand der ID abrufen |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Client anhand der Client-ID abrufen (Geheimnis ausgeblendet) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Client erstellen oder aktualisieren |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client löschen |
| POST | `/membership/oauth/register` | Öffentlich | — | Dynamische Client-Registrierung (RFC 7591) für öffentliche Clients wie MCP-Connectoren. Siehe [Verbundene Apps](../connected-apps#dynamic-client-registration) |

### Endpunkte zur Genehmigung von Geräten

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Informationen zu einem ausstehenden Gerätecode für die Genehmigungsoberfläche abrufen |
| POST | `/membership/oauth/device/approve` | JWT | Eine Geräteautorisierung genehmigen. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Eine Geräteautorisierung ablehnen. Body: `{ "user_code": "..." }` |

## Öffentliche und authentifizierte Endpunkte

Die API verwendet zwei Wrapper-Funktionen, die die Authentifizierungsanforderungen festlegen:

- **`actionWrapper`** – Erfordert ein gültiges JWT. Der authentifizierte Benutzer (`au`) ist mit `churchId`, `userId` und Berechtigungsprüfungen verfügbar.
- **`actionWrapperAnon`** – Keine Authentifizierung nötig. Verwendet für Anmeldung, Registrierung, öffentliche Inhaltsabfragen und Webhook-Empfänger.

In den Endpunkttabellen dieser Dokumentation sind diese in der Spalte Auth als **JWT** bzw. **Öffentlich** gekennzeichnet.

## Verwandte Seiten

- [Modulstruktur](../module-structure) – Aufbau von Controllern, Repositories und Modellen
- [Lokale Einrichtung](../local-setup) – Die API für die Entwicklung lokal ausführen
