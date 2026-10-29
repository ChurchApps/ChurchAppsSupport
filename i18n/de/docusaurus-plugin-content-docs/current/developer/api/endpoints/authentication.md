---
title: "Authentifizierung & Berechtigungen"
---

# Authentifizierung & Berechtigungen

<div class="article-intro">

Die ChurchApps-API verwendet eine JWT-basierte Authentifizierung. Benutzer melden sich an und erhalten ein Token, das ihre Identität, Kirchenzugehörigkeit und Berechtigungen enthält. Diese Seite behandelt den Anmeldeablauf, das Berechtigungsmodell und die OAuth-Unterstützung.

</div>

## Anmeldeablauf

### Standardanmeldung

```
POST /membership/users/login
```

**Auth:** Öffentlich

Akzeptiert eine von drei Arten von Zugangsdaten:

| Feld | Beschreibung |
|-------|-------------|
| `email` + `password` | Standardanmeldung mit E-Mail und Passwort |
| `jwt` | Erneute Authentifizierung mit einem vorhandenen JWT |
| `authGuid` | Einmaliger Authentifizierungslink (verwendet in Willkommens- und Zurücksetzungs-E-Mails) |

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

### Zwei-Faktor-Anmeldung

Benutzer können die Zwei-Faktor-Anmeldung per Authenticator-App (TOTP) aktivieren. Bei diesen Benutzern liefert eine Anmeldung mit `email` + `password`, `authGuid` oder SSO kein Token. Stattdessen kommt eine Aufforderung zur Eingabe eines zweiten Faktors:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Das Challenge-Token ist 5 Minuten gültig. Senden Sie es mit dem Code erneut an denselben Endpunkt:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` kann der aktuelle 6-stellige Code der Authenticator-App oder einer der zehn einmal verwendbaren Sicherungscodes des Benutzers sein. Ein falscher Code liefert `Invalid code`; wiederholte Fehlversuche werden pro Konto gedrosselt. Eine Anmeldung per `jwt` wird nie zusätzlich abgefragt, sodass bestehende Sitzungen weiter erneuert werden. Das Objekt `user` in der Anmeldeantwort enthält `mfaEnabled`.

Selbstbedienungs-Endpunkte (nur für angemeldete Benutzer, unter `/membership/users/mfa`):

| Endpunkt | Beschreibung |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Startet die Einrichtung; liefert `{ secret, otpauthUrl }` für den QR-Code |
| `POST /enable` | Body `{ code }`; schaltet sie ein und liefert `{ backupCodes }` genau einmal |
| `POST /disable` | Body `{ code }` (Authenticator- oder Sicherungscode); schaltet sie aus |
| `POST /reset/:userId` | Nur Server.Admin; schaltet sie für einen anderen Benutzer aus |

Geheimnisse werden verschlüsselt gespeichert, Sicherungscodes als Hashes. Aktivieren, Deaktivieren und Zurücksetzen werden im Audit-Protokoll festgehalten.

### Inhalt des Tokens

Das JWT enthält:
- `id` — Benutzer-ID
- `churchId` — aktuell ausgewählte Kirche
- `personId` — Personendatensatz für die ausgewählte Kirche
- Berechtigungslisten pro API

### Kirchenauswahl

Benutzer können mehreren Kirchen angehören. Die Anmeldeantwort enthält alle Kirchen mit ihren Berechtigungen. Zum Wechseln der Kirche erzeugt der Client aus den Anmeldedaten ein neues JWT, das auf eine andere Kirche beschränkt ist.

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

Legt einen Benutzer mit einem temporären Passwort an und sendet eine Willkommens-E-Mail mit einem Authentifizierungslink. Der erste Benutzer, der auf einer neuen Instanz registriert wird, erhält automatisch Serveradministrator-Zugriff.

Zwei optionale Felder zur Abwehr von Bots werden akzeptiert: `website` (ein verborgenes Honeypot-Feld, das echte Benutzer leer lassen) und `fillMs` (wie lange das Formular geöffnet war, in Millisekunden). Ist `website` ausgefüllt oder `fillMs` kleiner als 2000, wird kein Konto angelegt, der Endpunkt liefert aber dennoch eine normal aussehende `200`-Antwort, damit Bots nicht erkennen, dass sie abgelehnt wurden. Clients, die beide Felder weglassen, registrieren sich wie gewohnt.

### Neue Kirche registrieren

```
POST /membership/churches/add
```

**Auth:** JWT

Rufen Sie diesen Endpunkt nach der Registrierung eines Benutzers auf, um eine Kirche anzulegen und den Benutzer ihr zuzuordnen.

## Passwortverwaltung

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|--------------|
| POST | `/membership/users/forgot` | Öffentlich | Sendet eine E-Mail zum Zurücksetzen des Passworts. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Öffentlich | Setzt ein neues Passwort mit der Auth-GUID aus der Zurücksetzungs-E-Mail. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Ändert das Passwort des aktuellen Benutzers. Body: `{ "newPassword": "..." }` |

## Berechtigungsmodell

Berechtigungen sind nach Modul gegliedert und werden Benutzern über Rollen zugewiesen. Jede Berechtigung hat einen **Inhaltstyp** und eine **Aktion**.

### Berechtigungsübersicht

| Anzeigeabschnitt | Inhaltstyp | Aktion | Beschreibung |
|----------------|--------------|--------|-------------|
| **Anwesenheit** | Attendance | Checkin | Mitglieder bei Gottesdiensten einchecken |
| | Attendance | Edit | Anwesenheitsdatensätze bearbeiten |
| | Services | Edit | Gottesdienste und Gottesdienstzeiten verwalten |
| | Attendance | View | Anwesenheitsdatensätze ansehen |
| | Attendance | View Summary | Anwesenheitszusammenfassungen und Berichte ansehen |
| **Spenden** | Donations | Edit | Spendendatensätze anlegen und bearbeiten |
| | Settings | Edit | Einstellungen für Spenden/Zahlungen bearbeiten |
| | Donations | View Summary | Spendenübersichtsberichte ansehen |
| | Donations | View | Einzelne Spendendatensätze ansehen |
| **Personen und Gruppen** | Forms | Admin | Vollständige Formularverwaltung |
| | Forms | Edit | Formulardefinitionen bearbeiten |
| | Plans | Edit | Dienstpläne bearbeiten |
| | Group Members | Edit | Gruppenmitglieder hinzufügen/entfernen |
| | Groups | Edit | Gruppen anlegen und bearbeiten |
| | Households | Edit | Haushaltszuordnungen bearbeiten |
| | People | Edit | Jeden Personendatensatz bearbeiten |
| | People | Edit Self | Nur den eigenen Personendatensatz bearbeiten |
| | Roles | Edit | Rollen und Benutzerzuordnungen verwalten |
| | Group Members | View | Gruppenmitgliederlisten ansehen |
| | People | View Members | Nur Mitglieder ansehen (keine Besucher) |
| | People | View | Alle Personen ansehen |
| | Roles | View | Rollen und Zuordnungen ansehen |
| | Settings | Edit | Kircheneinstellungen bearbeiten |
| **Inhalte** | Content | Edit | Seiten, Abschnitte, Elemente bearbeiten |
| | Settings | Edit | Inhaltseinstellungen bearbeiten |
| | StreamingServices | Edit | Konfiguration der Streamingdienste verwalten |
| | Chat | Host | Chatsitzungen moderieren/leiten |
| **Nachrichten** | Texting | Send | SMS-Nachrichten senden |

### So werden Berechtigungen geprüft

In Controllern werden Berechtigungen mit der Methode `au.checkAccess()` geprüft:

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
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

Die API unterstützt OAuth 2.0 für Integrationen von Drittanbietern. Zwei Grant-Typen sind verfügbar.

### Autorisierungscode-Ablauf

1. **Autorisieren:** `POST /membership/oauth/authorize` (JWT erforderlich)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, nur `S256`) sind für öffentliche Clients ohne Geheimnis erforderlich
   - Liefert: `{ "code": "...", "state": "..." }`

2. **Code gegen Token tauschen:** `POST /membership/oauth/token` (öffentlich)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Senden Sie `code_verifier`, wenn im Autorisierungsschritt ein `code_challenge` verwendet wurde; öffentliche Clients lassen `client_secret` weg. JSON- und formularkodierte Bodys werden akzeptiert
   - Liefert: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Token erneuern:** `POST /membership/oauth/token` (öffentlich)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access-Tokens laufen nach **12 Stunden** ab.

### Gerätecode-Ablauf (RFC 8628)

Für Geräte ohne Browser (TV-Apps, Kiosk-Terminals):

1. **Gerätecode anfordern:** `POST /membership/oauth/device/authorize` (öffentlich)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Liefert: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Benutzer gibt den Code** unter der Verifizierungs-URI ein und genehmigt oder lehnt ab

3. **Token abfragen:** `POST /membership/oauth/token` (öffentlich)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Liefert `authorization_pending`, bis die Anfrage genehmigt wurde, und danach das Access-Token

### Verwaltung von OAuth-Clients

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Alle OAuth-Clients auflisten |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client nach ID abrufen |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Client nach Client-ID abrufen (Geheimnis ausgeblendet) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Client anlegen oder aktualisieren |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client löschen |
| POST | `/membership/oauth/register` | Öffentlich | — | Dynamische Client-Registrierung (RFC 7591) für öffentliche Clients wie MCP-Connectoren. Siehe [Verbundene Apps](../connected-apps#dynamic-client-registration) |

### Endpunkte zur Genehmigung von Geräten

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|--------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Informationen zu ausstehenden Gerätecodes für die Genehmigungsoberfläche abrufen |
| POST | `/membership/oauth/device/approve` | JWT | Eine Gerätegenehmigung bestätigen. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Eine Gerätegenehmigung ablehnen. Body: `{ "user_code": "..." }` |

## Öffentliche und authentifizierte Endpunkte

Die API verwendet zwei Wrapper-Funktionen, die die Authentifizierungsanforderungen festlegen:

- **`actionWrapper`** — Verlangt ein gültiges JWT. Das authentifizierte Benutzerobjekt (`au`) ist mit `churchId`, `userId` und Berechtigungsprüfungen verfügbar.
- **`actionWrapperAnon`** — Keine Authentifizierung erforderlich. Wird für Anmeldung, Registrierung, öffentliche Inhaltsabfragen und Webhook-Empfänger verwendet.

In den Endpunkttabellen dieser Dokumentation werden diese in der Spalte Auth als **JWT** bzw. **Öffentlich** gekennzeichnet.

## Verwandte Seiten

- [Modulstruktur](../module-structure) — Wie Controller, Repositories und Modelle organisiert sind
- [Lokale Einrichtung](../local-setup) — Die API lokal für die Entwicklung ausführen
