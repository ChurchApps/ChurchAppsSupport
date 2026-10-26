---
title: "MCP-Server"
---

# MCP-Server

<div class="article-intro">

Die B1-API stellt unter `/mcp` einen [MCP-Server (Model Context Protocol)](https://modelcontextprotocol.io) bereit. Jeder MCP-fähige KI-Client – claude.ai-Custom-Connectors, Claude Code, Claude Desktop, das OpenAI Agents SDK, Cursor oder ein eigener Client – kann sich damit verbinden und die zugrunde liegende REST-API im Auftrag eines angemeldeten Kirchenbenutzers aufrufen. Es handelt sich um einen schlanken, generischen Wrapper: Drei generische Tools stellen die gesamte API-Oberfläche dynamisch bereit, statt jeden Endpunkt einzeln nachzubilden, dazu kommt ein Leitfaden-Tool für den Website-Builder.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Ein [B1-API-Schlüssel](./api-keys) (`cak_…`) mit den Bereichen, die der Client haben soll, oder ein MCP-Client, der sich per OAuth anmelden kann (siehe [OAuth-Erkennung](#oauth-discovery))
- Ein erreichbarer B1-API-Host – `https://api.churchapps.org` für gehostete Kirchen oder Ihre eigene Bereitstellung
- Ein MCP-Client. Anleitungen für Endbenutzer finden Sie unter [Claude](/docs/b1-admin/integrations/claude) und [ChatGPT](/docs/b1-admin/integrations/chatgpt)

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
| **Methode** | Nur `POST` – Anfrage/Antwort und SSE-Streaming laufen beide über denselben Endpunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sitzungsmodell** | Zustandslos. Pro Anfrage wird eine neue MCP-Serverinstanz erstellt – keine Sitzungs-ID, keine Wiederaufnahme |
| **Authentifizierung** | Bearer-Token. `cak_…`-API-Schlüssel und B1-JWTs (einschließlich OAuth-Zugriffstoken) funktionieren gleichermaßen; die Auflösung entspricht der jedes anderen authentifizierten Endpunkts |

Eine Anfrage, deren `Authorization`-Header fehlt oder ungültig ist, gibt Folgendes zurück:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

mit HTTP 401 und dem Header `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. OAuth-fähige Clients folgen diesem Header, um die Anmeldung zu starten.

Auf der gehosteten API (Produktion und Demo) wird `/mcp` über eine API-Gateway-HTTP-API ausgeliefert und nicht über die REST-API, die für die übrigen Endpunkte verwendet wird. Die REST-API benennt `WWW-Authenticate` bei Lambda-Proxy-Antworten in `x-amzn-remapped-www-authenticate` um. Dadurch erhielten Clients wie ChatGPT nur eine nackte 401-Antwort ohne Möglichkeit, die Anmeldung zu starten; die HTTP-API leitet den Header unverändert weiter.

## Tools

Drei generische Tools und ein Leitfaden. Das Modell verwendet `list_endpoints` zur Suche, `describe_endpoint`, um die Struktur einer Nutzlast zu erfahren, `api_call`, um die API tatsächlich aufzurufen, und `describe_page_builder`, wenn es um Website-Inhalte geht.

### `list_endpoints`

Gibt das vollständige Verzeichnis der registrierten REST-Routen zurück, optional gefiltert nach einer Teilzeichenfolge und/oder einem HTTP-Verb. Jeder Eintrag enthält den Controller-Namen und die API-Schlüsselbereiche, die voraussichtlich benötigt werden.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `filter` | string (optional) | Teilzeichenfolge, die ohne Beachtung der Groß-/Kleinschreibung im Pfad gesucht wird, z. B. `"people"` |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

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

Das Verzeichnis wird einmal beim Start der API aus der aktiven Routentabelle erstellt – alles, was Sie mit `curl` erreichen können, erscheint hier.

### `describe_endpoint`

Gibt eine kurze Zusammenfassung zurück sowie – sofern verfügbar – einen manuell kuratierten Beispiel-Request-Body und eine Beispielantwort für einen Endpunkt.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | string | HTTP-Verb |
| `path` | string | Vollständiger Pfad, wie von `list_endpoints` zurückgegeben |

**Ausgabe:** Bei kuratierten Endpunkten ein Beispiel mit `summary`, `requestBody` und `responseSample`. Bei nicht kuratierten Endpunkten eine Ersatzmeldung, die das Modell anweist, zuerst ein `GET` aufzurufen, um die Struktur zu sehen. Etwa ein Dutzend stark genutzter Routen (Personen, Gruppen, Spenden, Anwesenheit, Fonds) sind kuratiert.

### `api_call`

Ruft den gewählten REST-Endpunkt im selben Prozess auf, und zwar über denselben Express-Middleware-Stack wie eine normale HTTP-Anfrage – Authentifizierung, Body-Parsing, Audit-Protokollierung und die Zuordnung zur jeweiligen Kirche gelten alle.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Pfad einschließlich des Modulpräfixes, z. B. `/membership/people` |
| `query` | object (optional) | Flaches Objekt mit Query-String-Parametern |
| `body` | any (optional) | JSON-Request-Body – bei `POST` typischerweise ein Array von Modellobjekten |

**Ausgabe:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Das Toolergebnis wird für jede Antwort mit Status ≥ 400 als `isError: true` markiert.

### `describe_page_builder`

Das einzige nicht generische Tool: ein statischer, in sich geschlossener Leitfaden zum Erstellen von Website-Seiten über die `/content/*`-Endpunkte – das Datenmodell Page → Section → Element, der Erstellungsablauf, jeder `elementType` mit der Struktur seines `answersJSON`, abschnittsbezogene Einstellungen wie die Formteiler `dividerTop`/`dividerBottom` sowie ein durchgängiges Beispiel. Das Tool hat keine Eingabe und spiegelt den Elementkatalog, der im B1Admin-Editor gepflegt wird (siehe [Architektur des Website-Builders](../architecture/website-builder)). Agenten sollen es einmal aufrufen, bevor sie Seiteninhalte erstellen oder bearbeiten, und danach über `api_call` handeln.

## Auth-Modell

Die MCP-Anfrage selbst läuft über `CustomAuthProvider.getUser()` – denselben Pfad, den jeder authentifizierte B1-Endpunkt nutzt. Ein `cak_…`-Bearer wird zu einem `Principal`, dessen Berechtigungen die aktuelle RBAC der ausstellenden Person sind, **geschnitten** mit den gewährten Bereichen des Schlüssels. Diese Schnittmenge wird bei jeder Anfrage neu berechnet, daher gilt:

- Wird ein Bereich aus einem Schlüssel entfernt (durch Löschen und Neuerstellen), endet der Zugriff beim nächsten Aufruf.
- Wird einer zugrunde liegenden Person in B1Admin eine Berechtigung entzogen, endet der Zugriff beim nächsten Aufruf – auch wenn der Schlüssel noch existiert.

Bei verschachtelten `api_call`-Aufrufen wird der ursprüngliche `Authorization`-Header in die synthetische Anfrage kopiert, sodass `CustomAuthProvider` erneut läuft und die Bereichsschnittmenge pro Aufruf erneut angewendet wird. Es gibt kein Token-Caching.

## Pfad-Sperrliste

Einige wenige Routen sind über `api_call` nicht erreichbar, selbst mit einem gültigen Schlüssel:

| Muster | Grund |
|---|---|
| `/giving/donate/webhook/*` | Webhook-Endpunkte von Anbietern erwarten rohe, signaturgeprüfte Bodies von Stripe/PayPal – nicht für allgemeine Aufrufer bestimmt |
| `/membership/oauth/clients*` | Die Registrierung von OAuth-Clients ist dem Betreiber vorbehalten |
| `/membership/people/apiEmails` | Durch das Betreiber-`jwtSecret` geschützt, nicht durch Benutzerberechtigungen |
| Jede Route, die `multipart/form-data` erwartet | Datei-Uploads sind nicht JSON-RPC-freundlich |

Ein gesperrter Pfad gibt ein Toolergebnis mit `isError: true` und einer beschreibenden Meldung zurück; die zugrunde liegende Route wird nie aufgerufen.

## Größenbeschränkung der Antwort

Jeder `api_call`-Antwort-Body ist auf **64 KB** erfasster Ausgabe begrenzt. Überschreitet eine Abfrage die Grenze, enthält die Antwort `"truncated": true`, und das Modell soll den Aufruf mit engeren Query-Parametern wiederholen. So wird verhindert, dass eine einzelne Toolantwort das Kontextfenster des Clients sprengt.

## Ratenbegrenzung

Für `/mcp` gibt es keine Ratenbegrenzung auf Anwendungsebene. In der Produktion erfolgt die Drosselung über die Parallelität von API Gateway bzw. Lambda, bei selbst gehosteten Bereitstellungen über den Reverse-Proxy.

## OAuth-Erkennung

Der MCP-Server veröffentlicht OAuth-2.1-Metadaten, damit Clients, die nur mit per OAuth erkannten Servern verbinden – insbesondere die Oberfläche „Add custom connector“ von Claude.ai –, eine Benutzeranmeldung ohne eingefügten Schlüssel durchführen können. `/mcp` ist die geschützte Ressource, der bestehende [OAuth-Provider](./connected-apps) unter `/membership/oauth` ist der Autorisierungsserver, und die Seite `/oauth` in B1Admin ist der Zustimmungsbildschirm.

| Endpunkt | Zweck |
|---|---|
| `GET /.well-known/oauth-protected-resource` (auch `/.well-known/oauth-protected-resource/mcp`) | Metadaten der geschützten Ressource (RFC 9728): `resource` ist `<api>/mcp`, `authorization_servers` ist die API-Wurzel, `scopes_supported` listet jeden [API-Schlüsselbereich](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadaten des Autorisierungsservers (RFC 8414): `authorization_endpoint` ist B1Admin `/oauth`, `token_endpoint` ist `/membership/oauth/token`, `registration_endpoint` ist `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamische Client-Registrierung (RFC 7591) |

Der Ablauf, den ein Client wie claude.ai durchläuft:

1. `POST /mcp` ohne Token gibt 401 mit dem Header `WWW-Authenticate` zurück, der auf die Metadaten der geschützten Ressource verweist.
2. Der Client liest beide Metadatendokumente und registriert sich dann mit `POST /membership/oauth/register`; er sendet `client_name`, `redirect_uris` und optional `scope`. Jeder selbst registrierte Client ist ein **öffentlicher** Client: Es wird kein Geheimnis ausgegeben, und die Antwort enthält `token_endpoint_auth_method: "none"`. Redirect-URIs müssen `https` sein oder `http` auf einer Loopback-Adresse (`localhost`, `127.0.0.1`, `[::1]`); höchstens 10 pro Client. Die Registrierung ist auf 20 pro Stunde und IP-Adresse begrenzt.
3. Der Benutzer wird mit `code_challenge` und `code_challenge_method=S256` zu B1Admin `/oauth` geschickt. Die Zustimmungsseite listet jeden angeforderten Bereich in verständlicher Sprache auf (oder „Everything your B1 account can access“, wenn keiner angefordert wurde), zeigt den Host, zu dem der Benutzer zurückgeleitet wird, und weist darauf hin, wenn sich die App selbst registriert hat. Der Benutzer klickt auf **Allow**.
4. Der Client tauscht den Code unter `/membership/oauth/token` mit `grant_type=authorization_code` und seinem `code_verifier` gegen ein Token ein und erneuert es später mit `grant_type=refresh_token`. Formularkodierte und JSON-Bodies werden beide akzeptiert.
5. Das resultierende Zugriffstoken ist ein bereichsbeschränktes B1-JWT und dient als Bearer-Token für `/mcp`.

PKCE-Regeln: Es wird nur `S256` akzeptiert. Ein Client ohne Geheimnis muss beim Autorisieren ein `code_challenge` senden und beim Token-Austausch den passenden `code_verifier`; vertrauliche Clients (mit Geheimnis) dürfen weiterhin nur das Geheimnis verwenden. Redirect-URIs müssen einer registrierten URI exakt entsprechen.

Clients, die ein statisches Bearer-Token in ihrer Konfiguration akzeptieren – Claude Code, Claude Desktop, das OpenAI Agents SDK, Cursor, eigener Code –, können stattdessen weiterhin einen `cak_…`-Schlüssel verwenden.

## Lokale Entwicklung

Der MCP-Endpunkt wird zusammen mit allem anderen eingebunden, wenn die API lokal läuft:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Beim Start bestätigt die Logzeile `📡 MCP server ready at /mcp — N routes in inventory`, dass das Verzeichnis erstellt wurde.

Testen Sie den Endpunkt mit dem MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Richten Sie den Inspector auf `http://localhost:8084/mcp` und setzen Sie den Header `Authorization` auf `Bearer cak_<prefix>.<secret>`. Rufen Sie zuerst `list_endpoints` auf; Sie sollten die vollständige Routenliste sehen. Danach sollte `api_call({ method: "GET", path: "/membership/people" })` Ihre lokalen Seed-Personen zurückgeben.

## Code-Struktur

Der MCP-Server befindet sich im Repository der API unter `src/modules/mcp/`. Wichtige Dateien:

| Datei | Zweck |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; bindet pro Anfrage `StreamableHTTPServerTransport` ein und sendet bei 401 die Challenge `WWW-Authenticate` |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Liefert die OAuth-Erkennungsdokumente unter `/.well-known` |
| `McpServer.ts` | Erstellt einen MCP-`Server` und registriert die vier Tools |
| `RouteInventory.ts` | Durchläuft beim Start die Metadaten von inversify-express-utils, um die Routen aufzulisten |
| `internalDispatch.ts` | Synthetisches `req`/`res`, das die Express-App im selben Prozess erneut betritt |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuratierte Anfrage-/Antwortbeispiele für stark genutzte Endpunkte |

## Verwandte Seiten

- [API-Schlüssel](./api-keys)
- [Webhooks](./webhooks)
- [Verbundene Apps (OAuth)](./connected-apps)
- [Claude – Einrichtung für Endbenutzer](/docs/b1-admin/integrations/claude)
- [ChatGPT – Einrichtung für Endbenutzer](/docs/b1-admin/integrations/chatgpt)
