---
title: "Authentifizierung & Berechtigungen"
---

# Authentifizierung & Berechtigungen

<div class="article-intro">

Die ChurchApps API nutzt JWT-basierte Authentifizierung. Benutzer melden sich an, um einen Token zu erhalten, der ihre Identität, Kirchenmitgliedschaft und Berechtigungen kodiert. Diese Seite behandelt den Auth-Flow, das Berechtigungsmodell und OAuth-Support.

</div>

## Login-Flow

### Standard-Login

```
POST /membership/users/login
```

**Auth:** Öffentlich

Akzeptiert einen von drei Anmeldedatentypen:

| Feld | Beschreibung |
|-------|-------------|
| `email` + `password` | Standard-E-Mail/Passwort-Login |
| `jwt` | Neu-Authentifizierung mit bestehendem JWT |
| `authGuid` | Einmaliger Auth-Link (verwendet in Willkommens-/Reset-E-Mails) |

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

Das `token`-Feld ist ein JWT, das als `Authorization: Bearer <token>` in nachfolgenden Anfragen gesendet werden sollte.

### Token-Inhalt

Das JWT kodiert:
- `id` — Benutzer-ID
- `churchId` — Derzeit ausgewählte Kirche
- `personId` — Person-Datensatz für die ausgewählte Kirche
- Pro-API-Berechtigungsarrays

### Kirchenauswahl

Benutzer können mehreren Kirchen angehören. Die Login-Antwort enthält alle Kirchen mit ihren Berechtigungen. Um Kirchen zu wechseln, generiert der Client ein neues JWT, das auf eine andere Kirche aus den Login-Antwortdaten begrenzt ist.

## Benutzerregistrierung

### Neuen Benutzer registrieren

```
POST /membership/users/register
```

**Auth:** Öffentlich

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Erstellt einen Benutzer mit temporärem Passwort und sendet eine Willkommens-E-Mail mit einem Auth-Link. Der erste registrierte Benutzer auf einer neuen Instanz erhält automatisch Server-Admin-Zugriff.

### Neue Kirche registrieren

```
POST /membership/churches/add
```

**Auth:** JWT

Nach Registrierung eines Benutzers rufen Sie diesen Endpoint auf, um eine Kirche zu erstellen und den Benutzer mit ihr zu verknüpfen.

## Passwortverwaltung

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Öffentlich | Password-Reset-E-Mail senden. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Öffentlich | Neues Passwort mit Auth-GUID aus Reset-E-Mail setzen. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Passwort des aktuellen Benutzers ändern. Body: `{ "newPassword": "..." }` |

## Berechtigungsmodell

Berechtigungen werden nach Modul organisiert und Benutzern durch Rollen zugewiesen. Jede Berechtigung hat einen **Content-Type** und eine **Aktion**.

### Berechtigungsreferenz

| Anzeigeabschnitt | Content-Type | Aktion | Beschreibung |
|----------------|--------------|--------|-------------|
| **Anwesenheit** | Attendance | Checkin | Mitglieder bei Services einchecken |
| | Attendance | Edit | Besuchsdaten bearbeiten |
| | Services | Edit | Services und Servicezeiten verwalten |
| | Attendance | View | Besuchsdaten anzeigen |
| | Attendance | View Summary | Anwesenheitszusammenfassungen und Berichte anzeigen |
| **Spenden** | Donations | Edit | Spendendatensätze erstellen und bearbeiten |
| | Settings | Edit | Spendeneinstellungen bearbeiten |
| | Donations | View Summary | Spendenzusammenfassungsberichte anzeigen |
| | Donations | View | Individuelle Spendendatensätze anzeigen |
| **Personen und Gruppen** | Forms | Admin | Vollständige Formularverwaltung |
| | Forms | Edit | Formulardefinitionen bearbeiten |
| | Plans | Edit | Servicepläne bearbeiten |
| | Group Members | Edit | Gruppenmitglieder hinzufügen/entfernen |
| | Groups | Edit | Gruppen erstellen und bearbeiten |
| | Households | Edit | Haushaltzuweisungen bearbeiten |
| | People | Edit | Beliebigen Personendatensatz bearbeiten |
| | People | Edit Self | Nur eigenen Personendatensatz bearbeiten |
| | Roles | Edit | Rollen und Benutzerzuweisungen verwalten |
| | Group Members | View | Gruppenmitgliederlisten anzeigen |
| | People | View Members | Nur Mitglieder anzeigen (nicht Besucher) |
| | People | View | Alle Personen anzeigen |
| | Roles | View | Rollen und Zuweisungen anzeigen |
| | Settings | Edit | Kircheneinstellungen bearbeiten |
| **Content** | Content | Edit | Seiten, Abschnitte, Elemente bearbeiten |
| | Settings | Edit | Content-Einstellungen bearbeiten |
| | StreamingServices | Edit | Streaming-Service-Konfiguration verwalten |
| | Chat | Host | Chat-Sessions hosten/moderieren |
| **Messaging** | Texting | Send | SMS-Nachrichten senden |

### Wie Berechtigungen überprüft werden

In Controllern werden Berechtigungen mit der `au.checkAccess()`-Methode überprüft:

```typescript
// Spezifische Berechtigung erforderlich
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Oder innerhalb von actionWrapper — das CRUD-System prüft automatisch
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Server-Admin

Die `Server.Admin`-Berechtigung gewährt vollständigen Zugriff über alle Kirchen hinweg. Dies wird dem ersten registrierten Benutzer zugewiesen und kann anderen über die Server-Admin-Rolle gewährt werden.

## OAuth 2.0

Die API unterstützt OAuth 2.0 für Drittanwendungsintegrationen. Zwei Grant-Typen sind verfügbar.

### Authorization Code Flow

1. **Autorisieren:** `POST /membership/oauth/authorize` (JWT erforderlich)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Rückgabe: `{ "code": "...", "state": "..." }`

2. **Code gegen Token tauschen:** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Rückgabe: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Token aktualisieren:** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Zugriffstokens verfallen nach **12 Stunden**.

### Device Code Flow (RFC 8628)

Für Geräte ohne Browser (TV-Apps, Kiosks):

1. **Device-Code anfordern:** `POST /membership/oauth/device/authorize` (Öffentlich)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Rückgabe: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Benutzer gibt den Code** unter der Verification-URI ein und genehmigt oder lehnt ab

3. **Token abfragen:** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Gibt `authorization_pending` zurück, bis genehmigt, dann gibt den Zugriffstoken zurück

### OAuth-Client-Verwaltung

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Alle OAuth-Clients auflisten |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client nach ID abrufen |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Client nach Client-ID abrufen (Geheimnis reduziert) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Client erstellen oder aktualisieren |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client löschen |

### Device-Genehmigungspunkte

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Info zu ausstehender Device-Code für Genehmigungs-UI abrufen |
| POST | `/membership/oauth/device/approve` | JWT | Device-Autorisierung genehmigen. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Device-Autorisierung ablehnen. Body: `{ "user_code": "..." }` |

## Öffentlich vs. Authentifizierte Endpoints

Die API nutzt zwei Wrapper-Funktionen, die Authentifizierungsanforderungen bestimmen:

- **`actionWrapper`** — Benötigt ein gültiges JWT. Das authentifizierte Benutzerobjekt (`au`) ist mit `churchId`, `userId` und Berechtigungsprüfungen verfügbar.
- **`actionWrapperAnon`** — Keine Authentifizierung erforderlich. Verwendet für Login, Registrierung, öffentliche Content-Lookups und Webhook-Receiver.

In den Endpoint-Tabellen in dieser Dokumentation werden diese als **JWT** und **Öffentlich** in der Auth-Spalte angezeigt.

## Verwandte Seiten

- [Modulstruktur](../module-structure) — Wie Controller, Repositories und Modelle organisiert sind
- [Lokales Setup](../local-setup) — API lokal für Entwicklung ausführen
