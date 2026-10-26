---
title: "Verbundene Apps & OAuth"
---

# Verbundene Apps & OAuth

<div class="article-intro">

Die B1-API unterstützt OAuth 2.0, sodass eine Drittanwendung von jedem Gemeindeadministrator die Erlaubnis einholen kann, auf dessen Daten zuzugreifen – ohne dass die Gemeinde jemals ein Passwort oder einen API-Schlüssel weitergibt. Eine **verbundene App** ist ein OAuth-Token, das ein Gemeindeadministrator genehmigt hat; wird es widerrufen, wird der Zugriff der Drittanwendung mit einem Klick beendet. Diesen Weg nutzen Sie für mandantenfähige SaaS-Connectors. Für eine Integration mit nur einer Gemeinde ist [API-Schlüssel](./api-keys) vorzuziehen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein OAuth-**Client** muss registriert sein, bevor Gemeinden ihm Zugriff gewähren können – durch einen B1-Serveradministrator oder durch den Client selbst über die [dynamische Registrierung](#dynamic-client-registration)
- Alle OAuth-Endpunkte liegen unter dem Membership-Modul: `/membership/oauth/...`
- Zugriffstoken sind JWTs – sie enthalten die Berechtigungen des Benutzers, gefiltert nach den gewährten Bereichen

</div>

## Konzepte

| Begriff | Bedeutung |
|---|---|
| **OAuth-Client** | Die Drittanwendung selbst – identifiziert durch `client_id`, gesichert durch `client_secret`. Einmalig bei B1 registriert und für alle Gemeinden geteilt, die sie installieren. |
| **Verbundene App** | Ein bestimmtes Paar aus `(Client, Gemeindeadministrator)`, bei dem der Administrator dem Client Zugriff gewährt hat. Jede verbundene App wird durch ein OAuth-Refresh-Token gestützt. |
| **Zugriffstoken** | Ein kurzlebiges JWT (ca. 7 Tage), das der Client für API-Aufrufe verwendet. Gleiche Form wie ein Benutzer-JWT – `Authorization: Bearer <jwt>`. |
| **Refresh-Token** | Eine langlebige undurchsichtige Zeichenkette (ca. 90 Tage), mit der der Client neue Zugriffstoken erzeugt. |
| **Bereich (Scope)** | Schränkt ein, was das Zugriffstoken tun kann – siehe den [Bereichskatalog](./api-keys#scopes). |

## Autorisierungsabläufe

B1 unterstützt drei OAuth-Abläufe, die alle in RFC 6749 und RFC 8628 definiert sind.

### Autorisierungscode (Webanwendungen)

Verwenden Sie diesen Ablauf, wenn Ihre App eine serverseitige Komponente hat und das `client_secret` geheim halten kann.

1. **Autorisieren**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Öffentliche Clients (ohne `client_secret`) müssen außerdem `"code_challenge": "..."` und `"code_challenge_method": "S256"` senden (PKCE, RFC 7636). Nur `S256` wird akzeptiert.

   Liefert `{ "code": "...", "state": "xyz" }`. Der Endpunkt für den Autorisierungscode ist bewusst eine authentifizierte POST-Anfrage – Ihre App erhält das B1-JWT des Benutzers (typischerweise über eine Schaltfläche in dessen B1-Sitzung) und leitet es im Zustimmungsschritt weiter.

2. **Code gegen Tokens tauschen**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Hat der Autorisierungsschritt einen `code_challenge` gesendet, fügen Sie das passende `"code_verifier": "..."` hinzu. Ein öffentlicher Client sendet den Verifier und lässt `client_secret` weg. Der Token-Endpunkt akzeptiert JSON- oder formularkodierte (`application/x-www-form-urlencoded`) Anfragekörper.

   Liefert die Token-Antwort:

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

   Das Refresh-Token läuft nach 90 Tagen ohne Nutzung ab; ist es abgelaufen, muss der Gemeindeadministrator die Autorisierung erneut erteilen.

### Gerätecode (TVs, Kioske, CLI)

Verwenden Sie diesen Ablauf, wenn das Gerät keinen Browser hat. Definiert in RFC 8628.

1. **Gerätecode anfordern**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Liefert den für den Benutzer sichtbaren Code und das Abfrageintervall:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. `user_code` und `verification_uri` dem Benutzer anzeigen.

3. **Abfragen** Sie `/membership/oauth/token` mit `grant_type=urn:ietf:params:oauth:grant-type:device_code` und dem `device_code`. Übliche Antworten:

   | Fehler | Bedeutung |
   |---|---|
   | `authorization_pending` | Der Benutzer hat noch nicht zugestimmt – im vorgeschlagenen Intervall weiter abfragen |
   | `expired_token` | Der Gerätecode ist über `expires_in` hinaus gültig – von vorn beginnen |
   | `access_denied` | Der Benutzer hat die Anfrage abgelehnt |
   | _(keine – 200 OK)_ | Genehmigt – der Körper ist eine `B1TokenResponse` |

4. Nach der Genehmigung speichern Sie das `refresh_token` und verwenden das `access_token`, bis es abläuft.

Das B1-SDK enthält `B1OAuthClient.awaitDeviceToken(...)`, das die Abfrageschleife mit sinnvollem, RFC-konformem Backoff für Sie übernimmt.

### Refresh-Token

Ist immer als eigenständige Anfrage verfügbar, sobald Sie ein `refresh_token` besitzen:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Es kommen ein neues `access_token` und ein neues `refresh_token` zurück. **Öffentliche Clients** (ohne `client_secret`) können `client_secret` beim Erneuern weglassen – nützlich für Mobil- und Desktop-OAuth-Apps, die kein Geheimnis bewahren können.

Refresh-Token werden rotiert, das alte wird jedoch nicht sofort verworfen. Erhält ein Client die Antwort auf die Erneuerung nie (etwa ein Fernseher, der mitten in der Anfrage den Strom oder das WLAN verliert), kann er mit dem vorherigen `refresh_token` bis zu **7 Tage** lang erneut versuchen. Der Versuch gelingt nur, solange das Ersatztoken noch nicht verwendet wurde; das ungenutzte Ersatztoken wird dann verworfen und ein neues Paar ausgestellt. Wurde das Ersatztoken selbst bereits erneuert, liefert das alte Token `invalid_grant`. Das Widerrufen einer Verbindung widerruft auch alle rotierten Token, die sich noch im Nachfristraum befinden, und die Liste der verbundenen Apps zeigt jede Verbindung nur einmal an.

## Token-Aufbau

Ein Zugriffstoken ist ein von B1 ausgestelltes JWT, das identisch ist mit dem, das ein Benutzer bei `POST /membership/users/login` erhält – dieselbe modulare Berechtigungsangabe, dasselbe `checkAccess`-Verhalten in jedem Controller –, **mit einer Ausnahme**: Das Berechtigungsfeld wurde bei der Ausstellung durch die gewährten Bereiche gefiltert. Ein eingeschränktes Zugriffstoken kann nichts tun, was ein ähnlich eingeschränkter API-Schlüssel nicht könnte, und es gibt keinen separaten „OAuth-Pfad“ in einem Controller; `actionWrapper` weiß nicht, ob der Inhaber eine Person, ein API-Schlüssel oder ein OAuth-Client ist.

## Verbundene Apps (für Benutzer)

Aus Sicht eines Gemeindeadministrators ist „Verbundene Apps“ die Liste der Apps, denen Zugriff auf seine Gemeinde gewährt wurde. Jede Zeile ist ein aktives Paar `(OAuthClient, OAuthToken)`.

In B1Admin zeigt **Einstellungen → Entwickler → Verbundene Apps**:

- Den Namen des Clients
- Die Bereiche, die der Administrator genehmigt hat
- Das Datum, an dem der Zugriff gewährt wurde
- Eine Schaltfläche **Widerrufen**

| Methode und Pfad | Authentifizierung | Zweck |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Die eigenen aktiven Verbindungen des Aufrufers auflisten (zusammen mit dem Namen des Clients und den Bereichen) |
| `DELETE /membership/oauth/connections/:id` | JWT | Eine Verbindung anhand ihrer OAuth-Token-ID widerrufen – das Token funktioniert ab der nächsten Anfrage nicht mehr |

Die Liste schließt abgelaufene Token automatisch aus.

## Bereiche und Zustimmung

Die Bereichszeichenfolgen entsprechen demselben Katalog wie bei [API-Schlüsseln](./api-keys#scopes). Bewährte Vorgehensweisen für Clients:

- **Fordern Sie möglichst eingeschränkte Bereiche an.** Gemeinden fallen auf, wenn Sie `donations:write` anfordern, obwohl Sie nur Personen lesen müssen.
- **Verwenden Sie ein Refresh-Token zusammen mit kurzlebigen Zugriffstoken.** Langlebige Zugriffstoken lassen sich schwerer schnell widerrufen.
- **Zeigen Sie den Benutzern die gewährten Bereiche immer in Ihrer eigenen Oberfläche an**, damit sie überprüfen können, wozu sie zugestimmt haben.

## Verwaltung der OAuth-Clients

OAuth-Clients (die Drittanwendungen selbst) werden global registriert. Ein vertraulicher Client mit `client_secret` wird von einem B1-Serveradministrator erstellt – um einen auszuliefern, wenden Sie sich an das ChurchApps-Team, um ein Paar aus `client_id` und `client_secret` zu erhalten, und registrieren Sie Ihre Redirect-URIs. Öffentliche Clients wie MCP-Connectors können sich selbst registrieren (siehe unten).

Registrierte Redirect-URIs müssen mit dem `redirect_uri` der Anfrage exakt übereinstimmen; eine Präfix- oder Teilübereinstimmung wird abgelehnt.

| Methode und Pfad | Berechtigung | Beschreibung |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Alle OAuth-Clients auflisten |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Einen Client anhand seiner öffentlichen ID abrufen (Geheimnis geschwärzt) |
| `POST /membership/oauth/clients` | Server.Admin | Einen Client erstellen oder aktualisieren |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Einen Client löschen |

### Dynamische Client-Registrierung

`POST /membership/oauth/register` (öffentlich, RFC 7591) erlaubt es einem Client wie dem MCP-Connector von claude.ai, sich selbst zu registrieren. Er wird im Dokument `/.well-known/oauth-authorization-server` der API angekündigt – siehe [MCP-Server → OAuth-Erkennung](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Liefert 201 mit `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) und `token_endpoint_auth_method: "none"`.

- Es wird nie ein Geheimnis ausgestellt, daher muss der Client bei jeder Autorisierung PKCE verwenden.
- `redirect_uris` müssen 1 bis 10 `https`-URLs sein oder `http` auf `localhost`, `127.0.0.1` oder `[::1]`.
- `client_name` wird auf 45 Zeichen gekürzt (Standard: „AI assistant“).
- Begrenzt auf 20 Registrierungen pro Stunde und IP-Adresse.

Auf der Zustimmungsseite von B1Admin erhält ein selbst registrierter Client einen Hinweis, dass er sich selbst registriert hat, dass er niemals mehr tun kann als das eigene B1-Konto des Benutzers, und dass er unter **Einstellungen → Entwickler → Verbundene Apps** getrennt werden kann.

## SDK-Unterstützung

Das Paket `@churchapps/integration-sdk` umhüllt jeden OAuth-Ablauf mit typisierten Hilfsfunktionen – `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Siehe das README des Pakets und [Webhooks](./webhooks#sdk-support) für ein durchgängiges Beispiel.
