---
title: "Connected Apps & OAuth"
---

# Connected Apps & OAuth

<div class="article-intro">

Die B1-API unterstützt OAuth 2.0, damit eine Drittanbieter-Anwendung jeden Kirchen-Admin um Erlaubnis bitten kann, auf dessen Daten zuzugreifen — ohne dass die Kirche jemals ein Passwort oder einen API-Schlüssel teilt. Eine **Connected App** ist ein OAuth-Token, das ein Kirchen-Admin genehmigt hat; das Widerrufen trennt den Zugriff der Drittanbieter-App mit einem Klick. Verwenden Sie diesen Weg für Multi-Tenant-SaaS-Connectors. Für eine Integration mit nur einer Kirche bevorzugen Sie [API-Schlüssel](./api-keys).

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein OAuth-**Client** muss (derzeit von einem B1-Server-Admin) registriert sein, bevor Kirchen ihm Zugriff gewähren können
- Alle OAuth-Endpunkte liegen unter dem Membership-Modul: `/membership/oauth/...`
- Zugriffstoken sind JWTs — sie tragen die Berechtigungen des Benutzers, gefiltert nach den gewährten Scopes

</div>

## Konzepte

| Begriff | Bedeutung |
|---|---|
| **OAuth-Client** | Die Drittanbieter-App selbst — identifiziert durch `client_id`, gesichert durch `client_secret`. Wird einmal bei B1 registriert und über alle Kirchen hinweg geteilt, die sie installieren. |
| **Connected App** | Ein bestimmtes `(Client, Kirchen-Admin)`-Paar, bei dem der Admin dem Client Zugriff gewährt hat. Jede Connected App wird durch ein OAuth-Refresh-Token gestützt. |
| **Access Token** | Ein kurzlebiges JWT (≈ 7 Tage), das der Client für API-Aufrufe verwendet. Gleiche Form wie ein Benutzer-JWT — `Authorization: Bearer <jwt>`. |
| **Refresh Token** | Eine langlebige, undurchsichtige Zeichenkette (≈ 90 Tage), mit der der Client neue Access Token erzeugt. |
| **Scope** | Grenzt ein, was das Access Token tun kann — siehe den [Scope-Katalog](./api-keys#scopes). |

## Grant-Flows

B1 unterstützt drei OAuth-Flows, alle gemäß RFC 6749 + RFC 8628 definiert.

### Authorization Code (Web-Apps)

Verwenden Sie diesen Flow, wenn Ihre App eine serverseitige Komponente hat und `client_secret` geheim halten kann.

1. **Autorisieren**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Gibt `{ "code": "...", "state": "xyz" }` zurück. Der Authorization-Code-Endpunkt ist absichtlich ein authentifizierter POST — Ihre App holt das B1-JWT des Benutzers ab (typischerweise, indem sie eine Schaltfläche innerhalb der B1-Sitzung des Benutzers anzeigt) und leitet es als Teil des Zustimmungsschritts weiter.

2. **Code gegen Token austauschen**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Gibt die Token-Antwort zurück:

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

3. **Aktualisieren (Refresh)**, wenn das Access Token kurz vor dem Ablauf steht:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Das Refresh Token läuft nach 90 Tagen Inaktivität ab; ist es abgelaufen, autorisiert der Kirchen-Admin erneut.

### Device Code (TVs, Kioske, CLI)

Verwenden Sie diesen Flow, wenn das Gerät keinen Browser hat. Definiert durch RFC 8628.

1. **Einen Device Code anfordern**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Gibt den benutzerseitigen Code und das Polling-Intervall zurück:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Zeigen Sie `user_code` + `verification_uri` dem Benutzer an.

3. **Pollen** Sie `/membership/oauth/token` mit `grant_type=urn:ietf:params:oauth:grant-type:device_code` und dem `device_code`. Standardantworten:

   | Fehler | Bedeutung |
   |---|---|
   | `authorization_pending` | Der Benutzer hat noch nicht genehmigt — weiter im vorgeschlagenen Intervall pollen |
   | `expired_token` | Der Device Code ist über `expires_in` hinaus — von vorn beginnen |
   | `access_denied` | Der Benutzer hat die Anfrage abgelehnt |
   | _(keiner — 200 OK)_ | Genehmigt — der Body ist eine `B1TokenResponse` |

4. Sobald genehmigt, speichern Sie das `refresh_token` und verwenden das `access_token`, bis es abläuft.

Das B1-SDK enthält `B1OAuthClient.awaitDeviceToken(...)`, das die Polling-Schleife mit sinnvollem, RFC-konformem Backoff für Sie ausführt.

### Refresh Token

Immer als eigenständige Anfrage verfügbar, sobald Sie ein `refresh_token` besitzen:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Ein neues `access_token` und `refresh_token` kommen zurück. **Public Clients** (ohne `client_secret`) können `client_secret` beim Refresh weglassen — nützlich für Mobile-/Desktop-OAuth-Apps, die kein Geheimnis bewahren können.

## Token-Form

Ein Access Token ist ein von B1 ausgestelltes JWT, identisch mit einem, das ein Benutzer von `POST /membership/users/login` erhalten würde — dieselbe modulare Berechtigungs-Claim, dasselbe `checkAccess`-Verhalten in jedem Controller — **außer** dass das Berechtigungs-Array beim Erstellen durch die gewährten Scopes gefiltert wurde. Ein gescoptes Access Token kann nichts tun, was ein ähnlich gescopter API-Schlüssel nicht kann, und es gibt keinen separaten "OAuth-Pfad" in irgendeinem Controller; `actionWrapper` weiß nicht, ob der Bearer eine Person, ein API-Schlüssel oder ein OAuth-Client ist.

## Connected Apps (benutzerseitig)

Aus Sicht eines Kirchen-Admins ist "Connected Apps" die Liste der Apps, denen Zugriff auf ihre Kirche gewährt wurde. Jede Zeile ist ein aktives `(OAuthClient, OAuthToken)`-Paar.

In B1Admin zeigt **Einstellungen → Entwickler → Connected Apps**:

- Den Namen des Clients
- Die Scopes, die der Admin genehmigt hat
- Das Datum, an dem der Zugriff gewährt wurde
- Eine Schaltfläche **Widerrufen**

| Methode & Pfad | Auth | Zweck |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Listet die eigenen aktiven Verbindungen des Aufrufers auf (verknüpft mit Client-Name + Scopes) |
| `DELETE /membership/oauth/connections/:id` | JWT | Widerruft eine Verbindung anhand ihrer OAuth-Token-ID — das Token funktioniert ab der nächsten Anfrage nicht mehr |

Die Liste schließt abgelaufene Token automatisch aus.

## Scopes & Zustimmung

Die Scope-Strings sind derselbe Katalog wie bei [API-Schlüsseln](./api-keys#scopes). Best Practices für Clients:

- **Fordern Sie die engsten Scopes an, die funktionieren.** Kirchen bemerken es, wenn Sie `donations:write` verlangen, obwohl Sie nur Personen lesen müssen.
- **Verwenden Sie ein Refresh Token plus kurzlebige Access Token.** Langlebige Access Token lassen sich schwerer schnell widerrufen.
- **Zeigen Sie die gewährten Scopes dem Benutzer immer in Ihrer eigenen UI an**, damit er überprüfen kann, wozu er zugestimmt hat.

## Verwaltung von OAuth-Clients

OAuth-Clients (die Drittanbieter-Apps selbst) werden derzeit global von einem B1-Server-Admin registriert. Die Selbstregistrierung je Kirche ist auf der Roadmap — bis dahin kontaktieren Sie das ChurchApps-Team, um ein `client_id`/`client_secret`-Paar zu erstellen und Ihre Redirect-URIs zu registrieren, wenn Sie einen öffentlichen Connector ausliefern möchten.

| Methode & Pfad | Berechtigung | Beschreibung |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Listet alle OAuth-Clients auf |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Ruft einen Client anhand seiner öffentlichen ID ab (Secret geschwärzt) |
| `POST /membership/oauth/clients` | Server.Admin | Erstellt oder aktualisiert einen Client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Löscht einen Client |

## SDK-Unterstützung

Das Paket `@churchapps/integration-sdk` umschließt jeden OAuth-Flow mit typisierten Hilfsfunktionen — `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Ein End-to-End-Beispiel finden Sie im README des Pakets und unter [Webhooks](./webhooks#sdk-support).
