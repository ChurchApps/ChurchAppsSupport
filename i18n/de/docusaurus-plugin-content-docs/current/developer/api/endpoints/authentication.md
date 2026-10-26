---
title: "Authentifizierung und Berechtigungen"
---

# Authentifizierung und Berechtigungen

<div class="article-intro">

Die ChurchApps-API verwendet JWT-basierte Authentifizierung. Benutzer melden sich an und erhalten ein Token, das ihre Identität, Kirchenzugehörigkeit und Berechtigungen enthält. Diese Seite beschreibt den Anmeldeablauf, das Berechtigungsmodell und die OAuth-Unterstützung.

</div>

## Anmeldeablauf

### Standardanmeldung

```
POST /membership/users/login
```

**Authentifizierung:** Öffentlich

Akzeptiert einen von drei Anmeldedatentypen:

| Feld | Beschreibung |
|-------|-------------|
| `email` + `password` | Standardanmeldung mit E-Mail-Adresse und Passwort |
| `jwt` | Erneute Authentifizierung mit einem vorhandenen JWT |
| `authGuid` | Einmaliger Authentifizierungslink (wird in Willkommens- und Zurücksetzungs-E-Mails verwendet) |

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
- `id` — Benutzer-ID
- `churchId` — Aktuell ausgewählte Kirche
- `personId` — Personendatensatz für die ausgewählte Kirche
- Berechtigungsarrays pro API

### Auswahl der Kirche

Benutzer können mehreren Kirchen angehören. Die Antwort der Anmeldung enthält alle Kirchen mit ihren Berechtigungen. Um die Kirche zu wechseln, erzeugt der Client aus den Anmeldedaten ein neues JWT, das auf eine andere Kirche aus der Antwort beschränkt ist.

## Benutzerregistrierung

### Neuen Benutzer registrieren

```
POST /membership/users/register
```

**Authentifizierung:** Öffentlich

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Legt einen Benutzer mit einem temporären Passwort an und sendet eine Willkommens-E-Mail mit einem Authentifizierungslink. Der erste auf einer neuen Instanz registrierte Benutzer erhält automatisch Serveradministrator-Zugriff.

Zwei optionale Felder gegen Bots werden akzeptiert: `website` (ein verborgenes Honeypot-Feld, das echte Benutzer leer lassen) und `fillMs` (wie lange das Formular geöffnet war, in Millisekunden). Ist `website` ausgefüllt oder ist `fillMs` kleiner als 2000, wird kein Konto angelegt, der Endpunkt gibt aber dennoch eine normal aussehende Antwort `200` zurück, damit Bots nicht erkennen können, dass sie abgelehnt wurden. Clients, die beide Felder weglassen, registrieren sich wie gewohnt.

### Neue Kirche registrieren

```
POST /membership/churches/add
```

**Authentifizierung:** JWT

Rufen Sie nach der Registrierung eines Benutzers diesen Endpunkt auf, um eine Kirche anzulegen und den Benutzer ihr zuzuordnen.

## Passwortverwaltung

| Methode | Pfad | Authentifizierung | Beschreibung |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Öffentlich | Eine E-Mail zum Zurücksetzen des Passworts senden. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Öffentlich | Ein neues Passwort mit einer Authentifizierungs-GUID aus einer Zurücksetzungs-E-Mail festlegen. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Das Passwort des aktuellen Benutzers ändern. Body: `{ "newPassword": "..." }` |

## Berechtigungsmodell

Berechtigungen sind nach Modul gegliedert und Benutzern über Rollen zugewiesen. Jede Berechtigung hat einen **Inhaltstyp** und eine **Aktion**.

### Berechtigungsübersicht

| Anzeigebereich | Inhaltstyp | Aktion | Beschreibung |
|----------------|--------------|--------|-------------|
| **Anwesenheit** | Attendance | Checkin | Mitglieder bei Gottesdiensten einchecken |
| | Attendance | Edit | Anwesenheitsdatensätze bearbeiten |
| | Services | Edit | Gottesdienste und Gottesdienstzeiten verwalten |
| | Attendance | View | Anwesenheitsdatensätze einsehen |
| | Attendance | View Summary | Anwesenheitszusammenfassungen und Berichte einsehen |
| **Spenden** | Donations | Edit | Spendendatensätze erstellen und bearbeiten |
| | Settings | Edit | Einstellungen für Spenden und Zahlungen bearbeiten |
| | Donations | View Summary | Spendenübersichtsberichte einsehen |
| | Donations | View | Einzelne Spendendatensätze einsehen |
| **Personen und Gruppen** | Forms | Admin | Vollständige Verwaltung von Formularen |
| | Forms | Edit | Formulardefinitionen bearbeiten |
| | Plans | Edit | Dienstpläne bearbeiten |
| | Group Members | Edit | Gruppenmitglieder hinzufügen/entfernen |
| | Groups | Edit | Gruppen erstellen und bearbeiten |
| | Households | Edit | Haushaltszuordnungen bearbeiten |
| | People | Edit | Jeden Personendatensatz bearbeiten |
| | People | Edit Self | Nur den eigenen Personendatensatz bearbeiten |
| | Roles | Edit | Rollen und Benutzerzuweisungen verwalten |
| | Group Members | View | Gruppenmitgliederlisten einsehen |
| | People | View Members | Nur Mitglieder einsehen (keine Besucher) |
| | People | View | Alle Personen einsehen |
| | Roles | View | Rollen und Zuweisungen einsehen |
| | Settings | Edit | Kircheneinstellungen bearbeiten |
| **Inhalte** | Content | Edit | Seiten, Abschnitte und Elemente bearbeiten |
| | Settings | Edit | Inhaltseinstellungen bearbeiten |
| | StreamingServices | Edit | Konfiguration der Streaming-Dienste verwalten |
| | Chat | Host | Chat-Sitzungen hosten/moderieren |
| **Nachrichten** | Texting | Send | SMS-Textnachrichten senden |

### So werden Berechtigungen geprüft

In Controllern werden Berechtigungen mit der Methode `au.checkAccess()` geprüft:

```typescript
// Bestimmte Berechtigung verlangen
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Oder innerhalb von actionWrapper — das CRUD-System prüft automatisch
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Serveradministrator

Die Berechtigung `Server.Admin` gewährt vollen Zugriff auf alle Kirchen. Sie wird dem ersten registrierten Benutzer zugewiesen und kann über die Serveradministrator-Rolle an andere vergeben werden.

## OAuth 2.0

Die API unterstützt OAuth 2.0 für Integrationen von Drittanbietern. Es stehen zwei Grant-Typen zur Verfügung.

### Autorisierungscode-Ablauf

1. **Autorisieren:** `POST /membership/oauth/authorize` (JWT erforderlich)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, nur `S256`) sind für öffentliche Clients ohne Geheimnis erforderlich
   - Rückgabe: `{ "code": "...", "state": "..." }`

2. **Code gegen Token tauschen:** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Senden Sie `code_verifier`, wenn beim Autorisierungsschritt ein `code_challenge` verwendet wurde; öffentliche Clients lassen `client_secret` weg. JSON- und formularkodierte Bodies werden akzeptiert
   - Rückgabe: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Token erneuern:** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Zugriffstoken laufen nach **12 Stunden** ab.

### Gerätecode-Ablauf (RFC 8628)

Für Geräte ohne Browser (TV-Apps, Kioske):

1. **Gerätecode anfordern:** `POST /membership/oauth/device/authorize` (Öffentlich)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Rückgabe: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Benutzer gibt den Code ein** auf der Verifizierungsseite und genehmigt oder lehnt ab

3. **Auf Token warten:** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Gibt `authorization_pending` zurück, bis die Freigabe erfolgt, und danach das Zugriffstoken

### Verwaltung von OAuth-Clients

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Alle OAuth-Clients auflisten |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client anhand der ID abrufen |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Client anhand der Client-ID abrufen (Geheimnis ausgeblendet) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Client erstellen oder aktualisieren |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client löschen |
| POST | `/membership/oauth/register` | Öffentlich | — | Dynamische Client-Registrierung (RFC 7591) für öffentliche Clients wie MCP-Konnektoren. Siehe [Verbundene Apps](../connected-apps#dynamic-client-registration) |

### Endpunkte zur Gerätefreigabe

| Methode | Pfad | Authentifizierung | Beschreibung |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Informationen zum ausstehenden Gerätecode für die Freigabeoberfläche abrufen |
| POST | `/membership/oauth/device/approve` | JWT | Eine Geräteautorisierung genehmigen. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Eine Geräteautorisierung ablehnen. Body: `{ "user_code": "..." }` |

## Öffentliche und authentifizierte Endpunkte

Die API verwendet zwei Wrapper-Funktionen, die bestimmen, ob eine Authentifizierung erforderlich ist:

- **`actionWrapper`** — Verlangt ein gültiges JWT. Das authentifizierte Benutzerobjekt (`au`) steht mit `churchId`, `userId` und Berechtigungsprüfungen zur Verfügung.
- **`actionWrapperAnon`** — Keine Authentifizierung erforderlich. Wird für Anmeldung, Registrierung, öffentliche Inhaltsabfragen und Webhook-Empfänger verwendet.

In den Endpunkttabellen dieser Dokumentation werden diese in der Spalte Authentifizierung als **JWT** bzw. **Öffentlich** gekennzeichnet.

## Verwandte Seiten

- [Modulstruktur](../module-structure) — Wie Controller, Repositories und Modelle organisiert sind
- [Lokale Einrichtung](../local-setup) — Ausführen der API für die lokale Entwicklung
