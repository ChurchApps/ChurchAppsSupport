---
title: "MCP-Server"
---

# MCP-Server

<div class="article-intro">

Die B1-API stellt einen [MCP-Server (Model Context Protocol)](https://modelcontextprotocol.io) unter `/mcp` bereit. Jeder MCP-fähige KI-Client – claude.ai-Custom-Connectors, Claude Code, Claude Desktop, das OpenAI Agents SDK, Cursor oder ein eigener Client – kann sich damit verbinden und im Namen eines angemeldeten Benutzers der Kirche die zugrunde liegende REST-API aufrufen. Es handelt sich um einen schlanken, generischen Wrapper: Drei generische Werkzeuge machen die gesamte API-Oberfläche dynamisch verfügbar, statt jeden Endpunkt einzeln nachzubilden. Hinzu kommt ein Werkzeug mit Anleitung für den Website-Baukasten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [B1-API-Schlüssel](./api-keys) (`cak_…`) mit den Scopes, die der Client haben soll, oder ein MCP-Client, der sich per OAuth anmelden kann (siehe [OAuth-Erkennung](#oauth-discovery))
- Ein erreichbarer B1-API-Host – `https://api.churchapps.org` für gehostete Kirchen oder Ihre eigene Installation
- Ein MCP-Client. Die Einrichtung für Endanwender finden Sie unter [Claude](/docs/b1-admin/integrations/claude) und [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Endpunkt

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspekt | Wert |
|---|---|
| **Pfad** | `/mcp` (relativ zum API-Host) |
| **Methode** | Nur `POST` – Anfrage/Antwort und SSE-Streaming laufen über denselben Endpunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sitzungsmodell** | Zustandslos. Pro Anfrage wird eine neue MCP-Serverinstanz erzeugt – keine Sitzungs-ID, keine Wiederaufnahme |
| **Auth** | Bearer-Token. `cak_…`-API-Schlüssel und B1-JWTs (einschließlich OAuth-Zugriffstoken) funktionieren gleichermaßen; die Auflösung ist dieselbe wie bei jedem anderen authentifizierten Endpunkt |

Eine Anfrage, deren Header `Authorization` fehlt oder ungültig ist, liefert:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

mit HTTP 401 und dem Header `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. OAuth-fähige Clients folgen diesem Header, um die Anmeldung zu starten.

## Werkzeuge

Drei generische Werkzeuge und eine Anleitung. Das Modell verwendet `list_endpoints` zur Erkundung, `describe_endpoint`, um das Format einer Nutzlast kennenzulernen, `api_call`, um die API tatsächlich aufzurufen, und `describe_page_builder`, wenn es um Website-Inhalte geht.

### `list_endpoints`

Liefert das vollständige Verzeichnis der registrierten REST-Routen, gefiltert nach einer optionalen Teilzeichenkette und/oder einem HTTP-Verb. Jeder Eintrag enthält den Namen des Controllers und die API-Key-Scopes, die voraussichtlich benötigt werden.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `filter` | Zeichenkette (optional) | Teilzeichenkette ohne Berücksichtigung der Groß-/Kleinschreibung, die mit dem Pfad verglichen wird, z. B. `"people"` |
| `method` | Aufzählung (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Ausgabe:** ein JSON-Dokument der Form

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

Das Verzeichnis wird einmal beim Start der API aus der laufenden Routentabelle erstellt – alles, was Sie mit `curl` erreichen können, erscheint hier.

### `describe_endpoint`

Liefert eine kurze Zusammenfassung und, sofern verfügbar, einen von Hand kuratierten Beispielkörper der Anfrage und eine Beispielantwort für einen Endpunkt.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | Zeichenkette | HTTP-Verb |
| `path` | Zeichenkette | Vollständiger Pfad, wie ihn `list_endpoints` zurückgibt |

**Ausgabe:** Bei kuratierten Endpunkten ein Beispiel mit `summary`, `requestBody` und `responseSample`. Bei nicht kuratierten Endpunkten eine Ersatzmeldung, die das Modell anweist, zuerst `GET` aufzurufen, um das Format zu sehen. Rund ein Dutzend stark genutzter Routen (Personen, Gruppen, Spenden, Anwesenheit, Fonds) sind kuratiert.

### `api_call`

Ruft den gewählten REST-Endpunkt im selben Prozess über denselben Express-Middleware-Stack auf wie eine normale HTTP-Anfrage. Authentifizierung, Verarbeitung des Request-Körpers, Audit-Protokollierung und die Begrenzung auf die jeweilige Kirche gelten vollständig.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | Aufzählung | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | Zeichenkette | Pfad einschließlich Modulpräfix, z. B. `/membership/people` |
| `query` | Objekt (optional) | Flaches Objekt mit Query-String-Parametern |
| `body` | beliebig (optional) | JSON-Körper der Anfrage – bei `POST` typischerweise ein Array von Modellobjekten |

**Ausgabe:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Das Werkzeugergebnis ist mit `isError: true` markiert, sobald die Antwort einen Status ≥ 400 hat.

### `describe_page_builder`

Das einzige nicht generische Werkzeug: eine statische, in sich geschlossene Anleitung zum Aufbau von Website-Seiten über die Endpunkte `/content/*` – das Datenmodell Seite → Abschnitt → Element, der Ablauf zum Anlegen, jeder `elementType` mit seinem Format `answersJSON`, Einstellungen auf Abschnittsebene wie die Formtrenner `dividerTop`/`dividerBottom` sowie ein durchgängiges Beispiel. Es nimmt keine Eingabe entgegen und spiegelt den Elementkatalog des Editors in B1 Admin wider (siehe [Architektur des Website-Baukastens](../architecture/website-builder)). Agenten sollen es einmal aufrufen, bevor sie Seiteninhalte anlegen oder bearbeiten, und dann über `api_call` handeln.

## Auth-Modell

Die MCP-Anfrage selbst läuft über `CustomAuthProvider.getUser()` – denselben Weg, den jeder authentifizierte B1-Endpunkt nutzt. Ein `cak_…`-Bearer-Token wird zu einem `Principal`, dessen Berechtigungen die aktuelle RBAC der ausstellenden Person sind, **geschnitten mit** den gewährten Scopes des Schlüssels. Diese Schnittmenge wird bei jeder Anfrage neu berechnet, daher gilt:

- Wird ein Scope aus einem Schlüssel entfernt (indem er gelöscht und neu erstellt wird), endet der Zugriff bei der nächsten Anfrage.
- Wird der zugrunde liegenden Person in B1 Admin eine Berechtigung entzogen, endet der Zugriff bei der nächsten Anfrage – selbst wenn der Schlüssel noch existiert.

Bei verschachtelten `api_call`-Aufrufen wird der ursprüngliche Header `Authorization` in die synthetische Anfrage kopiert. Dadurch läuft `CustomAuthProvider` erneut, und die Schnittmenge der Scopes wird pro Aufruf erneut angewendet. Es gibt kein Zwischenspeichern von Token.

## Pfadsperrliste

Einige wenige Routen sind über `api_call` nicht erreichbar, selbst mit einem gültigen Schlüssel:

| Muster | Grund |
|---|---|
| `/giving/donate/webhook/*` | Webhook-Endpunkte von Anbietern erwarten unveränderte, signaturgeprüfte Nachrichtenkörper von Stripe/PayPal – nicht von allgemeinen Aufrufern |
| `/membership/oauth/clients*` | Die Registrierung von OAuth-Clients ist nur dem Betreiber vorbehalten |
| `/membership/people/apiEmails` | Gesteuert durch das `jwtSecret` des Betreibers, nicht durch Benutzerberechtigungen |
| Jede Route, die `multipart/form-data` erwartet | Datei-Uploads eignen sich nicht für JSON-RPC |

Ein gesperrter Pfad liefert ein Werkzeugergebnis mit `isError: true` und einer beschreibenden Meldung; die zugrunde liegende Route wird nie aufgerufen.

## Begrenzung der Antwortgröße

Der Körper jeder `api_call`-Antwort ist auf **64 KB** erfasster Ausgabe begrenzt. Überschreitet eine Abfrage diese Grenze, enthält die Antwort `"truncated": true`, und das Modell soll den Aufruf mit enger gefassten Query-Parametern wiederholen. So sprengt eine einzelne Werkzeugantwort nicht das Kontextfenster des Clients.

## Ratenbegrenzung

Auf `/mcp` gibt es keine Ratenbegrenzung auf Anwendungsebene. In der Produktion wird die Drosselung an API Gateway bzw. die Parallelität von Lambda übertragen, bei selbst gehosteten Installationen an das, was Ihr Reverse Proxy durchsetzt.

## OAuth-Erkennung {#oauth-discovery}

Der MCP-Server kündigt OAuth-2.1-Metadaten an, damit Clients, die sich nur mit per OAuth erkannten Servern verbinden – insbesondere die Oberfläche „Benutzerdefinierten Connector hinzufügen“ von Claude.ai –, einen Benutzer ohne eingefügten Schlüssel anmelden können. `/mcp` ist die geschützte Ressource, der bestehende [OAuth-Anbieter](./connected-apps) unter `/membership/oauth` ist der Autorisierungsserver, und die Seite `/oauth` in B1 Admin ist der Zustimmungsbildschirm.

| Endpunkt | Zweck |
|---|---|
| `GET /.well-known/oauth-protected-resource` (auch `/.well-known/oauth-protected-resource/mcp`) | Metadaten der geschützten Ressource (RFC 9728): `resource` ist `<api>/mcp`, `authorization_servers` ist die Wurzel der API, `scopes_supported` listet jeden [Scope eines API-Schlüssels](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadaten des Autorisierungsservers (RFC 8414): `authorization_endpoint` ist `/oauth` in B1 Admin, `token_endpoint` ist `/membership/oauth/token`, `registration_endpoint` ist `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamische Client-Registrierung (RFC 7591) |

Der Ablauf, den ein Client wie claude.ai durchläuft:

1. `POST /mcp` ohne Token liefert 401 mit dem Header `WWW-Authenticate`, der auf die Metadaten der geschützten Ressource verweist.
2. Der Client liest beide Metadatendokumente und registriert sich selbst mit `POST /membership/oauth/register`; er sendet `client_name`, `redirect_uris` und optional `scope`. Jeder selbst registrierte Client ist ein **öffentlicher** Client: Es wird kein Geheimnis ausgegeben, und die Antwort enthält `token_endpoint_auth_method: "none"`. Redirect-URIs müssen `https` sein oder `http` auf einer Loopback-Adresse (`localhost`, `127.0.0.1`, `[::1]`); höchstens 10 pro Client. Die Registrierung ist auf 20 pro Stunde und IP-Adresse begrenzt.
3. Der Benutzer wird mit `code_challenge` und `code_challenge_method=S256` zu `/oauth` in B1 Admin geschickt. Die Zustimmungsseite listet jeden angeforderten Scope in verständlicher Sprache auf (oder „Alles, worauf Ihr B1-Konto zugreifen kann“, wenn keiner angefordert wurde), zeigt den Host, zu dem der Benutzer zurückgeleitet wird, und weist darauf hin, wenn sich die App selbst registriert hat. Der Benutzer klickt auf **Erlauben**.
4. Der Client tauscht den Code am Endpunkt `/membership/oauth/token` mit `grant_type=authorization_code` und seinem `code_verifier` ein und erneuert das Token später mit `grant_type=refresh_token`. Form-kodierte und JSON-Körper werden beide akzeptiert.
5. Das daraus entstehende Zugriffstoken ist ein Scope-begrenzter B1-JWT und wird als Bearer-Token auf `/mcp` verwendet.

PKCE-Regeln: Es wird nur `S256` akzeptiert. Ein Client ohne Geheimnis muss beim Autorisieren eine `code_challenge` und beim Token-Tausch den passenden `code_verifier` senden; vertrauliche Clients (mit Geheimnis) können weiterhin nur das Geheimnis verwenden. Redirect-URIs müssen exakt einer registrierten URI entsprechen.

Clients, die ein statisches Bearer-Token in ihrer Konfiguration akzeptieren – Claude Code, Claude Desktop, das OpenAI Agents SDK, Cursor oder eigener Code –, können stattdessen weiterhin einen Schlüssel `cak_…` verwenden.

## Lokale Entwicklung

Der MCP-Endpunkt wird zusammen mit allen anderen Teilen eingebunden, wenn die API lokal läuft:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Beim Start bestätigt die Protokollzeile `📡 MCP server ready at /mcp — N routes in inventory`, dass das Verzeichnis erstellt wurde.

Zum Testen eignet sich der MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Richten Sie ihn in der Oberfläche des Inspectors auf `http://localhost:8084/mcp` und setzen Sie den Header `Authorization` auf `Bearer cak_<prefix>.<secret>`. Rufen Sie zuerst `list_endpoints` auf; Sie sollten die vollständige Routenliste sehen. Danach sollte `api_call({ method: "GET", path: "/membership/people" })` Ihre lokalen Beispielpersonen zurückliefern.

## Code-Aufbau

Der MCP-Server liegt im Repository der API unter `src/modules/mcp/`. Wichtige Dateien:

| Datei | Zweck |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; erzeugt pro Anfrage einen `StreamableHTTPServerTransport` und sendet bei 401 die Herausforderung `WWW-Authenticate` |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Liefert die OAuth-Erkennungsdokumente unter `/.well-known` |
| `McpServer.ts` | Erstellt einen MCP-`Server` und registriert die vier Werkzeuge |
| `RouteInventory.ts` | Durchläuft beim Start die Metadaten von inversify-express-utils, um die Routen aufzuzählen |
| `internalDispatch.ts` | Synthetische `req`/`res`-Objekte, die die Express-App im selben Prozess erneut aufrufen |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuratierte Anfrage- und Antwortbeispiele für stark genutzte Endpunkte |

## Verwandt

- [API-Schlüssel](./api-keys)
- [Webhooks](./webhooks)
- [Verbundene Apps (OAuth)](./connected-apps)
- [Claude – Einrichtung für Endanwender](/docs/b1-admin/integrations/claude)
- [ChatGPT – Einrichtung für Endanwender](/docs/b1-admin/integrations/chatgpt)
