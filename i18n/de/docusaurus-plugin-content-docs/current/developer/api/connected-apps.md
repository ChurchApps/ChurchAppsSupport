---
title: "Verbundene Apps & OAuth"
---

# Verbundene Apps & OAuth

<div class="article-intro">

Die B1-API unterstützt OAuth 2.0, damit eine Drittanbieter-Anwendung von jeder Kirchenadministration die Erlaubnis einholen kann, auf deren Daten zuzugreifen – ohne dass die Kirche jemals ein Passwort oder einen API-Schlüssel weitergeben muss. Eine **verbundene App** ist ein OAuth-Token, das eine Kirchenadministration genehmigt hat; ein Widerruf beendet den Zugriff der Drittanbieter-App mit einem einzigen Klick. Diesen Weg nutzen Sie für mandantenfähige SaaS-Connectoren. Für eine Integration mit nur einer Kirche sind [API-Schlüssel](./api-keys) vorzuziehen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein OAuth-**Client** muss registriert sein, bevor Kirchen ihm Zugriff gewähren können – entweder durch einen B1-Serveradministrator oder durch den Client selbst über die [dynamische Registrierung](#dynamic-client-registration)
- Alle OAuth-Endpunkte liegen im Membership-Modul: `/membership/oauth/...`
- Zugriffstoken sind JWTs – sie enthalten die Berechtigungen des Benutzers, gefiltert nach den gewährten Scopes

</div>

## Begriffe

| Begriff | Bedeutung |
|---|---|
| **OAuth-Client** | Die Drittanbieter-App selbst – erkennbar an der `client_id` und geschützt durch das `client_secret`. Einmalig bei B1 registriert und von allen Kirchen geteilt, die sie installieren. |
| **Verbundene App** | Ein bestimmtes Paar aus `(Client, Kirchenadministration)`, für das die Administration den Zugriff gewährt hat. Jede verbundene App wird durch ein OAuth-Refresh-Token gestützt. |
| **Zugriffstoken** | Ein kurzlebiger JWT (ca. 7 Tage), den der Client für API-Aufrufe nutzt. Gleiche Form wie ein Benutzer-JWT – `Authorization: Bearer <jwt>`. |
| **Refresh-Token** | Eine langlebige undurchsichtige Zeichenkette (ca. 90 Tage), mit der der Client neue Zugriffstoken erzeugt. |
| **Scope** | Schränkt ein, was das Zugriffstoken tun kann – siehe den [Scope-Katalog](./api-keys#scopes). |

## Autorisierungsabläufe

B1 unterstützt drei OAuth-Abläufe, alle definiert durch RFC 6749 und RFC 8628.

### Authorization Code (Webanwendungen)

Verwenden Sie diesen Ablauf, wenn Ihre App eine serverseitige Komponente hat und das `client_secret` geheim halten kann.

1. **Autorisieren**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Öffentliche Clients (ohne `client_secret`) müssen zusätzlich `"code_challenge": "..."` und `"code_challenge_method": "S256"` senden (PKCE, RFC 7636). Nur `S256` wird akzeptiert.

   Die Antwort lautet `{ "code": "...", "state": "xyz" }`. Der Endpunkt für den Autorisierungscode ist bewusst ein authentifiziertes POST – Ihre App erhält das B1-JWT des Benutzers (typischerweise über eine Schaltfläche in dessen B1-Sitzung) und gibt es im Zustimmungsschritt weiter.

2. **Code gegen Token tauschen**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Hat der Autorisierungsschritt eine `code_challenge` gesendet, fügen Sie das passende `"code_verifier": "..."` hinzu. Ein öffentlicher Client sendet den Verifier und lässt `client_secret` weg. Der Token-Endpunkt akzeptiert JSON- oder form-kodierte (`application/x-www-form-urlencoded`) Anfragekörper.

   Die Antwort mit dem Token lautet:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Erneuern**, wenn das Zugriffstoken bald abläuft:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Das Refresh-Token läuft nach 90 Tagen ohne Nutzung ab. Ist es abgelaufen, autorisiert die Kirchenadministration erneut.

### Device Code (TVs, Kioske, CLI)

Verwenden Sie diesen Ablauf, wenn das Gerät keinen Browser hat. Definiert durch RFC 8628.

1. **Einen Gerätecode anfordern**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Die Antwort enthält den Code für den Benutzer und das Abfrageintervall:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Zeigen Sie `user_code` und `verification_uri` dem Benutzer an.

3. **Abfragen** Sie `/membership/oauth/token` mit `grant_type=urn:ietf:params:oauth:grant-type:device_code` und dem `device_code`. Standardantworten:

   | Fehler | Bedeutung |
   |---|---|
   | `authorization_pending` | Der Benutzer hat noch nicht zugestimmt – im vorgeschlagenen Intervall weiter abfragen |
   | `expired_token` | Der Gerätecode ist über `expires_in` hinaus gültig – von vorn beginnen |
   | `access_denied` | Der Benutzer hat die Anfrage abgelehnt |
   | _(keine – 200 OK)_ | Genehmigt – der Körper ist ein `B1TokenResponse` |

4. Nach der Genehmigung speichern Sie das `refresh_token` und verwenden das `access_token`, bis es abläuft.

Das B1-SDK enthält `B1OAuthClient.awaitDeviceToken(...)`, das die Abfrageschleife mit einer RFC-konformen Wartezeit für Sie übernimmt.

### Refresh-Token

Immer als eigenständige Anfrage verfügbar, sobald Sie ein `refresh_token` besitzen:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Sie erhalten ein neues `access_token` und ein neues `refresh_token` zurück. **Öffentliche Clients** (ohne `client_secret`) können beim Erneuern auf das `client_secret` verzichten – nützlich für mobile oder Desktop-OAuth-Apps, die kein Geheimnis bewahren können.

## Aufbau des Tokens

Ein Zugriffstoken ist ein von B1 ausgestellter JWT, der dem entspricht, den ein Benutzer über `POST /membership/users/login` erhält – mit demselben modularen Berechtigungs-Claim und demselben `checkAccess`-Verhalten in jedem Controller. **Die einzige Ausnahme:** Das Berechtigungs-Array wurde zum Zeitpunkt der Ausstellung durch die gewährten Scopes gefiltert. Ein eingeschränktes Zugriffstoken kann nichts, was ein ähnlich eingeschränkter API-Schlüssel nicht kann. Es gibt in keinem Controller einen eigenen „OAuth-Pfad“; `actionWrapper` weiß nicht, ob der Inhaber eine Person, ein API-Schlüssel oder ein OAuth-Client ist.

## Verbundene Apps (für Benutzer sichtbar)

Aus Sicht einer Kirchenadministration ist „Verbundene Apps“ die Liste der Apps, denen Zugriff auf ihre Kirche gewährt wurde. Jede Zeile ist ein aktives Paar `(OAuthClient, OAuthToken)`.

In B1 Admin zeigt **Einstellungen → Entwickler → Verbundene Apps**:

- den Namen des Clients,
- die Scopes, die die Administration genehmigt hat,
- das Datum, an dem der Zugriff gewährt wurde,
- eine Schaltfläche **Widerrufen**.

| Methode & Pfad | Authentifizierung | Zweck |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Listet die eigenen aktiven Verbindungen des Aufrufers auf (mit Client-Name und Scopes) |
| `DELETE /membership/oauth/connections/:id` | JWT | Widerruft eine Verbindung über die ID des OAuth-Tokens – das Token funktioniert ab der nächsten Anfrage nicht mehr |

Die Liste schließt abgelaufene Token automatisch aus.

## Scopes und Zustimmung

Die Scope-Bezeichnungen entsprechen dem Katalog der [API-Schlüssel](./api-keys#scopes). Bewährte Vorgehensweisen für Clients:

- **Fordern Sie die engsten Scopes an, die funktionieren.** Kirchen bemerken es, wenn Sie `donations:write` anfordern, obwohl Sie nur Personen lesen müssen.
- **Verwenden Sie ein Refresh-Token zusammen mit kurzlebigen Zugriffstoken.** Langlebige Zugriffstoken lassen sich nur schwer schnell widerrufen.
- **Zeigen Sie die gewährten Scopes dem Benutzer immer in Ihrer eigenen Oberfläche an**, damit er prüfen kann, wozu er zugestimmt hat.

## Verwaltung der OAuth-Clients

OAuth-Clients (die Drittanbieter-Apps selbst) werden global registriert. Ein vertraulicher Client mit `client_secret` wird von einem B1-Serveradministrator angelegt – um eine solche App bereitzustellen, wenden Sie sich an das ChurchApps-Team für ein Paar aus `client_id` und `client_secret` und lassen Ihre Redirect-URIs registrieren. Öffentliche Clients wie MCP-Connectoren können sich selbst registrieren (siehe unten).

Registrierte Redirect-URIs müssen exakt mit dem `redirect_uri` der Anfrage übereinstimmen; eine Präfix- oder Teilübereinstimmung wird abgelehnt.

| Methode & Pfad | Berechtigung | Beschreibung |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Listet alle OAuth-Clients auf |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Holt einen Client über seine öffentliche ID (Geheimnis ausgeblendet) |
| `POST /membership/oauth/clients` | Server.Admin | Erstellt oder aktualisiert einen Client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Löscht einen Client |

### Dynamische Client-Registrierung {#dynamic-client-registration}

`POST /membership/oauth/register` (öffentlich, RFC 7591) ermöglicht es einem Client wie dem MCP-Connector von claude.ai, sich selbst zu registrieren. Der Endpunkt wird im Dokument `/.well-known/oauth-authorization-server` der API bekannt gegeben – siehe [MCP-Server → OAuth-Erkennung](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Die Antwort mit dem Status 201 enthält `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) und `token_endpoint_auth_method: "none"`.

- Es wird nie ein Geheimnis ausgegeben. Der Client muss daher bei jeder Autorisierung PKCE verwenden.
- `redirect_uris` müssen 1 bis 10 `https`-URLs sein oder `http` auf `localhost`, `127.0.0.1` oder `[::1]`.
- `client_name` wird auf 45 Zeichen gekürzt (Standard: „AI assistant“).
- Auf 20 Registrierungen pro Stunde und IP-Adresse begrenzt.

Auf der Zustimmungsseite von B1 Admin erhält ein selbst registrierter Client einen Hinweis, dass er sich selbst registriert hat, niemals mehr tun kann als das eigene B1-Konto des Benutzers und unter **Einstellungen → Entwickler → Verbundene Apps** getrennt werden kann.

## SDK-Unterstützung

Das Paket `@churchapps/integration-sdk` umhüllt jeden OAuth-Ablauf mit typisierten Hilfsfunktionen – `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` und `.awaitDeviceToken()`. Ein durchgängiges Beispiel finden Sie in der README des Pakets und unter [Webhooks](./webhooks#sdk-support).
