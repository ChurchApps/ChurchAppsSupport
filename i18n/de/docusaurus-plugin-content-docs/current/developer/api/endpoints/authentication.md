---
title: "Authentifizierung und Berechtigungen"
description: "Referenz zur JWT-Anmeldung, Zwei-Faktor-Anmeldung, OAuth-2.0-Abläufen und zum Berechtigungsmodell der ChurchApps-API für Entwickler von Integrationen."
---

# Authentifizierung und Berechtigungen

<div class="article-intro">

Die ChurchApps-API verwendet JWT-basierte Authentifizierung. Benutzer melden sich an und erhalten ein Token, das ihre Identität, Gemeindezugehörigkeit und Berechtigungen kodiert. Diese Seite behandelt den Anmeldeablauf, das Berechtigungsmodell und die OAuth-Unterstützung.

</div>

## Anmeldeablauf

### Standardanmeldung

```
POST /membership/users/login
```

**Auth:** Öffentlich

Akzeptiert einen von drei Anmeldedatentypen:

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

Das Feld `token` ist ein JWT, das bei nachfolgenden Anfragen als `Authorization: Bearer <token>` gesendet werden sollte.

### Zwei-Faktor-Anmeldung {#two-factor-sign-in}

Benutzer können die Zwei-Faktor-Anmeldung per Authenticator-App (TOTP) aktivieren. Für diese Benutzer liefert eine Anmeldung mit `email` + `password`, `authGuid` oder SSO kein Token zurück. Stattdessen antwortet der Server mit einer Challenge:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Das Challenge-Token ist 5 Minuten gültig. Senden Sie es zusammen mit dem Code erneut an denselben Endpunkt:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` kann der aktuelle 6-stellige Code der Authenticator-App oder einer der zehn einmal verwendbaren Backup-Codes des Benutzers sein. Ein falscher Code liefert `Invalid code`, und wiederholte Fehlversuche werden pro Konto ratenbegrenzt. Eine erneute Anmeldung per `jwt` wird nie zusätzlich abgefragt, sodass bestehende Sitzungen weiterhin erneuert werden. Das Objekt `user` in der Anmeldeantwort enthält `mfaEnabled`.

Self-Service-Endpunkte (nur für angemeldete Benutzer, unter `/membership/users/mfa`):

| Endpunkt | Beschreibung |
|----------|--------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Startet die Einrichtung; gibt `{ secret, otpauthUrl }` für den QR-Code zurück |
| `POST /enable` | Body `{ code }`; schaltet die Zwei-Faktor-Anmeldung ein und gibt `{ backupCodes }` genau einmal zurück |
| `POST /disable` | Body `{ code }` (Authenticator- oder Backup-Code); schaltet sie aus |
| `POST /reset/:userId` | Nur Server.Admin; schaltet sie für einen anderen Benutzer aus |

Geheimnisse werden verschlüsselt gespeichert, Backup-Codes als Hashes. Aktivierung, Deaktivierung und Zurücksetzung werden im Audit-Log protokolliert.

### Inhalt des Tokens

Das JWT kodiert:
- `id` — Benutzer-ID
- `churchId` — Aktuell ausgewählte Gemeinde
- `personId` — Personendatensatz für die ausgewählte Gemeinde
- Berechtigungs-Arrays pro API

### Gemeindeauswahl

Benutzer können mehreren Gemeinden angehören. Die Anmeldeantwort enthält alle Gemeinden mit ihren Berechtigungen. Um die Gemeinde zu wechseln, erzeugt der Client ein neues JWT, das auf eine andere Gemeinde aus den Anmeldedaten beschränkt ist.

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

Erstellt einen Benutzer mit einem temporären Passwort und sendet eine Willkommens-E-Mail mit einem Authentifizierungslink. Der erste Benutzer, der auf einer neuen Instanz registriert wird, erhält automatisch Server-Admin-Zugriff.

Zwei optionale Bot-Fallen-Felder werden akzeptiert: `website` (ein verstecktes Honeypot-Feld, das echte Benutzer leer lassen) und `fillMs` (wie lange das Formular geöffnet war, in Millisekunden). Ist `website` ausgefüllt oder ist `fillMs` kleiner als 2000, wird kein Konto erstellt. Der Endpunkt gibt dennoch eine normal aussehende `200` zurück, damit Bots die Ablehnung nicht erkennen können. Clients, die beide Felder weglassen, registrieren sich wie gewohnt.

### Neue Gemeinde registrieren

```
POST /membership/churches/add
```

**Auth:** JWT

Rufen Sie diesen Endpunkt nach der Registrierung eines Benutzers auf, um eine Gemeinde anzulegen und den Benutzer ihr zuzuordnen.

## Passwortverwaltung

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Öffentlich | Sendet eine E-Mail zum Zurücksetzen des Passworts. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Öffentlich | Setzt ein neues Passwort mit einer Auth-GUID aus einer Zurücksetzungs-E-Mail. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Ändert das Passwort des aktuellen Benutzers. Body: `{ "newPassword": "..." }` |

## Berechtigungsmodell

Berechtigungen sind nach Modul gegliedert und werden Benutzern über Rollen zugewiesen. Jede Berechtigung hat einen **Inhaltstyp** und eine **Aktion**.

### Berechtigungsreferenz

| Anzeigebereich | Inhaltstyp | Aktion | Beschreibung |
|----------------|--------------|--------|-------------|
| **Anwesenheit** | Attendance | Checkin | Mitglieder bei Gottesdiensten einchecken |
| | Attendance | Edit | Anwesenheitsdatensätze bearbeiten |
| | Services | Edit | Gottesdienste und Gottesdienstzeiten verwalten |
| | Attendance | View | Anwesenheitsdatensätze anzeigen |
| | Attendance | View Summary | Anwesenheitszusammenfassungen und Berichte anzeigen |
| **Spenden** | Donations | Edit | Spendendatensätze erstellen und bearbeiten |
| | Settings | Edit | Einstellungen für Spenden und Zahlungen bearbeiten |
| | Donations | View Summary | Spendenzusammenfassungen als Berichte anzeigen |
| | Donations | View | Einzelne Spendendatensätze anzeigen |
| **Personen und Gruppen** | Forms | Admin | Vollständige Verwaltung der Formulare |
| | Forms | Edit | Formulardefinitionen bearbeiten |
| | Plans | Edit | Dienstpläne bearbeiten |
| | Group Members | Edit | Gruppenmitglieder hinzufügen und entfernen |
| | Groups | Edit | Gruppen erstellen und bearbeiten |
| | Households | Edit | Haushaltszuordnungen bearbeiten |
| | People | Edit | Jeden Personendatensatz bearbeiten |
| | People | Edit Self | Nur den eigenen Personendatensatz bearbeiten |
| | Roles | Edit | Rollen und Benutzerzuweisungen verwalten |
| | Group Members | View | Gruppenmitgliederlisten anzeigen |
| | People | View Members | Nur Mitglieder anzeigen (keine Besucher) |
| | People | View | Alle Personen anzeigen |
| | Roles | View | Rollen und Zuweisungen anzeigen |
| | Settings | Edit | Gemeindeeinstellungen bearbeiten |
| **Inhalte** | Content | Edit | Seiten, Abschnitte und Elemente bearbeiten |
| | Settings | Edit | Inhaltseinstellungen bearbeiten |
| | StreamingServices | Edit | Konfiguration der Streaming-Dienste verwalten |
| | Chat | Host | Chatsitzungen moderieren und hosten |
| **Nachrichten** | Texting | Send | SMS-Textnachrichten senden |

### So werden Berechtigungen geprüft

In Controllern werden Berechtigungen mit der Methode `au.checkAccess()` geprüft:

```typescript
// Bestimmte Berechtigung erforderlich
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

Die Berechtigung `Server.Admin` gewährt vollen Zugriff auf alle Gemeinden. Sie wird dem ersten registrierten Benutzer zugewiesen und kann über die Rolle Server-Admin an andere vergeben werden.

## OAuth 2.0

Die API unterstützt OAuth 2.0 für Integrationen von Drittanbietern. Zwei Grant-Typen sind verfügbar.

### Autorisierungscode-Ablauf

1. **Autorisieren:** `POST /membership/oauth/authorize` (JWT erforderlich)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, nur `S256`) sind für öffentliche Clients ohne Geheimnis erforderlich
   - Rückgabe: `{ "code": "...", "state": "..." }`

2. **Code gegen Token tauschen:** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Senden Sie `code_verifier`, wenn der Autorisierungsschritt einen `code_challenge` verwendet hat. Öffentliche Clients lassen `client_secret` weg. JSON- und formularkodierte Body-Formate werden akzeptiert.
   - Rückgabe: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Token erneuern:** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Zugriffstoken laufen nach **12 Stunden** ab.

### Geräte-Code-Ablauf (RFC 8628)

Für Geräte ohne Browser (TV-Apps, Kioske):

1. **Geräte-Code anfordern:** `POST /membership/oauth/device/authorize` (Öffentlich)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Rückgabe: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Benutzer gibt den Code** auf der Verifizierungsseite ein und genehmigt oder lehnt ab

3. **Auf Token warten (Polling):** `POST /membership/oauth/token` (Öffentlich)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Liefert `authorization_pending`, bis die Anfrage genehmigt wurde, und gibt danach das Zugriffstoken zurück

### Verwaltung von OAuth-Clients

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Alle OAuth-Clients auflisten |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client anhand der ID abrufen |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Client anhand der Client-ID abrufen (Geheimnis ausgeblendet) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Client erstellen oder aktualisieren |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Client löschen |
| POST | `/membership/oauth/register` | Öffentlich | — | Dynamische Client-Registrierung (RFC 7591) für öffentliche Clients wie MCP-Connectors. Siehe [Connected Apps](../connected-apps.md#dynamic-client-registration) |

### Endpunkte zur Gerätegenehmigung

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Informationen zum ausstehenden Geräte-Code für die Genehmigungsoberfläche abrufen |
| POST | `/membership/oauth/device/approve` | JWT | Geräteautorisierung genehmigen. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Geräteautorisierung ablehnen. Body: `{ "user_code": "..." }` |

## Öffentliche und authentifizierte Endpunkte

Die API verwendet zwei Wrapper-Funktionen, die die Authentifizierungsanforderungen festlegen:

- **`actionWrapper`** — Erfordert ein gültiges JWT. Das authentifizierte Benutzerobjekt (`au`) ist mit `churchId`, `userId` und Berechtigungsprüfungen verfügbar.
- **`actionWrapperAnon`** — Keine Authentifizierung erforderlich. Wird für Anmeldung, Registrierung, öffentliche Inhaltsabfragen und Webhook-Empfänger verwendet.

In den Endpunkttabellen dieser Dokumentation werden diese in der Spalte Auth als **JWT** bzw. **Öffentlich** gekennzeichnet.

## Verwandte Seiten

- [Modulstruktur](../module-structure.md) — Wie Controller, Repositories und Modelle organisiert sind
- [Lokale Einrichtung](../local-setup.md) — Die API lokal für die Entwicklung ausführen
