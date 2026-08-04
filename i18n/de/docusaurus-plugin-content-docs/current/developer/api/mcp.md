---
title: "MCP-Server"
---

# MCP-Server

<div class="article-intro">

Die B1-API stellt einen [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-Server unter `/mcp` bereit. Jeder MCP-fähige KI-Client — Claude Code, Claude Desktop, das OpenAI Agents SDK, Cursor oder ein eigener Client — kann sich damit verbinden und im Namen eines authentifizierten Kirchennutzers die zugrunde liegende REST-API aufrufen. Es handelt sich um einen schlanken, generischen Wrapper: drei generische Tools stellen die gesamte API-Oberfläche dynamisch bereit, anstatt jeden Endpunkt einzeln nachzubilden, dazu ein Domänen-Guide-Tool für den Website-Builder.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [B1-API-Schlüssel](./api-keys) (`cak_…`) mit den Scopes, die der Client haben soll
- Ein erreichbarer B1-API-Host — `https://api.churchapps.org` für gehostete Kirchen, oder Ihr eigenes Deployment
- Ein MCP-Client. Siehe [Claude](/docs/b1-admin/integrations/claude) und [ChatGPT](/docs/b1-admin/integrations/chatgpt) für die Einrichtung durch Endnutzer

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
| **Methode** | Nur `POST` — Anfrage/Antwort und SSE-Streaming laufen beide über denselben Endpunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sitzungsmodell** | Zustandslos. Pro Anfrage wird eine neue MCP-Server-Instanz erstellt — keine Sitzungs-ID, keine Wiederaufnahme |
| **Authentifizierung** | Bearer-Token. Sowohl `cak_…`-API-Schlüssel als auch B1-JWTs funktionieren; die Auflösung erfolgt genauso wie bei jedem anderen authentifizierten Endpunkt |

Eine Anfrage, deren `Authorization`-Header fehlt oder ungültig ist, liefert:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

mit HTTP 401.

## Tools

Drei generische Tools plus ein Guide. Das Modell verwendet `list_endpoints` zur Entdeckung, `describe_endpoint`, um die Form eines Payloads kennenzulernen, `api_call`, um die API tatsächlich aufzurufen, und `describe_page_builder`, wenn es um Website-Inhalte geht.

### `list_endpoints`

Gibt das vollständige Inventar der registrierten REST-Routen zurück, gefiltert nach einem optionalen Teilstring und/oder einem HTTP-Verb. Jeder Eintrag enthält den Controller-Namen und die API-Schlüssel-Scopes, die am wahrscheinlichsten benötigt werden.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `filter` | string (optional) | Groß-/Kleinschreibung ignorierender Teilstring, der gegen den Pfad geprüft wird, z. B. `"people"` |
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

Das Inventar wird einmal beim API-Start aus der aktiven Routentabelle erstellt — alles, was Sie mit `curl` erreichen können, erscheint hier.

### `describe_endpoint`

Gibt eine kurze Zusammenfassung sowie, sofern verfügbar, einen handkuratierten Beispiel-Request-Body und ein Response-Beispiel für einen Endpunkt zurück.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | string | HTTP-Verb |
| `path` | string | Vollständiger Pfad, wie von `list_endpoints` zurückgegeben |

**Ausgabe:** Für kuratierte Endpunkte ein Beispiel mit `summary`, `requestBody` und `responseSample`. Für nicht kuratierte Endpunkte eine Fallback-Nachricht, die das Modell anweist, zunächst `GET` aufzurufen, um die Form zu sehen. Etwa ein Dutzend stark frequentierte Routen (people, groups, donations, attendance, funds) sind kuratiert.

### `api_call`

Ruft den gewählten REST-Endpunkt in-process auf, durch denselben Express-Middleware-Stack wie eine normale HTTP-Anfrage — Authentifizierung, Body-Parsing, Audit-Logging und kirchenspezifisches Scoping gelten alle.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Pfad einschließlich eines etwaigen Modul-Präfixes, z. B. `/membership/people` |
| `query` | object (optional) | Flaches Objekt mit Query-String-Parametern |
| `body` | any (optional) | JSON-Request-Body — bei `POST` typischerweise ein Array von Modellobjekten |

**Ausgabe:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* die JSON-Antwort des Controllers */ ]
}
```

Das Tool-Ergebnis wird für jede Antwort mit Status ≥ 400 als `isError: true` markiert.

### `describe_page_builder`

Das einzige nicht generische Tool: ein statischer, in sich geschlossener Leitfaden zum Erstellen von Website-Seiten über die `/content/*`-Endpunkte — das Datenmodell Page → Section → Element, der Erstellungs-Workflow, jeder `elementType` mit seiner `answersJSON`-Form, Einstellungen auf Abschnittsebene wie die Formteiler `dividerTop`/`dividerBottom` und ein durchgerechnetes End-to-End-Beispiel. Es benötigt keine Eingabe und spiegelt den Elementkatalog wider, der im B1Admin-Editor gepflegt wird (siehe [Website-Builder-Architektur](../architecture/website-builder)). Agenten sollen es einmal aufrufen, bevor sie Seiteninhalte erstellen oder bearbeiten, und danach über `api_call` handeln.

## Auth-Modell

Die MCP-Anfrage selbst läuft über `CustomAuthProvider.getUser()` — denselben Pfad, den jeder authentifizierte B1-Endpunkt verwendet. Ein `cak_…`-Bearer wird zu einem `Principal` aufgelöst, dessen Berechtigungen die aktuellen RBAC-Rechte der ausstellenden Person sind, **geschnitten** mit den gewährten Scopes des Schlüssels. Diese Schnittmenge wird bei jeder Anfrage neu berechnet, daher:

- Das Entfernen eines Scopes aus einem Schlüssel (durch Löschen und Neuerstellen) reduziert den Zugriff ab dem nächsten Aufruf.
- Das Entfernen einer Berechtigung von der zugrunde liegenden Person in B1Admin reduziert den Zugriff ab dem nächsten Aufruf, selbst wenn der Schlüssel noch existiert.

Bei verschachtelten `api_call`-Aufrufen wird der ursprüngliche `Authorization`-Header auf die synthetische Anfrage kopiert, sodass `CustomAuthProvider` erneut läuft und die Scope-Schnittmenge pro Aufruf neu angewendet wird. Es gibt kein Token-Caching.

## Pfad-Sperrliste

Ein kleiner Satz von Routen ist über `api_call` nicht erreichbar, selbst mit einem gültigen Schlüssel:

| Muster | Grund |
|---|---|
| `/giving/donate/webhook/*` | Provider-Webhook-Endpunkte erwarten rohe, signaturgeprüfte Bodies von Stripe/PayPal — nicht von allgemeinen Aufrufern |
| `/membership/oauth/clients*` | Die Registrierung von OAuth-Clients ist ausschließlich dem Betreiber vorbehalten |
| `/membership/people/apiEmails` | Abgesichert durch das `jwtSecret` des Betreibers, nicht durch Benutzerberechtigungen |
| Jede Route, die `multipart/form-data` erwartet | Datei-Uploads sind nicht JSON-RPC-freundlich |

Ein gesperrter Pfad liefert ein Tool-Ergebnis mit `isError: true` und einer beschreibenden Meldung zurück; die zugrunde liegende Route wird nie aufgerufen.

## Obergrenze der Antwortgröße

Jeder `api_call`-Antwort-Body ist auf **64 KB** erfasster Ausgabe begrenzt. Überschreitet eine Abfrage die Obergrenze, trägt die Antwort `"truncated": true`, und das Modell soll es mit engeren Query-Parametern erneut versuchen. Das verhindert, dass eine einzelne Tool-Antwort das Kontextfenster des Clients sprengt.

## Rate Limiting

Für `/mcp` gibt es kein anwendungsseitiges Rate Limit. Die Drosselung wird in der Produktion an API Gateway / Lambda-Nebenläufigkeit delegiert, und bei selbst gehosteten Deployments an das, was Ihr Reverse Proxy durchsetzt.

## OAuth-Discovery

Der MCP-Server gibt **keine** OAuth-2.1-Metadaten bekannt (`/.well-known/oauth-authorization-server`, dynamische Client-Registrierung, PKCE-Flow). Clients, die MCP-Server mit OAuth-Discovery benötigen — insbesondere die "Add custom connector"-Oberfläche von Claude.ai und das "Connectors"-Feature von ChatGPT — können sich ohne diese Oberfläche nicht verbinden.

Clients, die einen statischen Bearer-Token in ihrer Konfiguration akzeptieren — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, eigener Code — funktionieren bereits heute. Der vorhandene [OAuthController](/docs/developer/api/connected-apps) stellt für Drittanbieter-Apps bereits Tokens über Authorization-Code + PKCE aus; eine MCP-Spec-konforme Discovery-Schicht darüber würde die Lücke schließen.

## Lokale Entwicklung

Der MCP-Endpunkt wird zusammen mit allem anderen eingebunden, wenn die API lokal läuft:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Beim Start bestätigt die Log-Zeile `📡 MCP server ready at /mcp — N routes in inventory`, dass das Inventar erstellt wurde.

Testen Sie ihn mit dem MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Richten Sie den Inspector in der UI auf `http://localhost:8084/mcp` und setzen Sie den `Authorization`-Header auf `Bearer cak_<prefix>.<secret>`. Rufen Sie zuerst `list_endpoints` auf; Sie sollten die vollständige Routenliste sehen. Anschließend sollte `api_call({ method: "GET", path: "/membership/people" })` Ihre lokal angelegten Testpersonen zurückgeben.

## Code-Layout

Der MCP-Server befindet sich unter `src/modules/mcp/` im Api-Repository. Bemerkenswerte Dateien:

| Datei | Zweck |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; verdrahtet `StreamableHTTPServerTransport` pro Anfrage |
| `McpServer.ts` | Baut einen MCP-`Server` auf, registriert die vier Tools |
| `RouteInventory.ts` | Durchläuft beim Start die Metadaten von inversify-express-utils, um Routen aufzulisten |
| `internalDispatch.ts` | Synthetische `req`/`res`, die die Express-App in-process erneut betreten |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuratierte Request-/Response-Beispiele für stark frequentierte Endpunkte |

## Verwandte Themen

- [API-Schlüssel](./api-keys)
- [Webhooks](./webhooks)
- [Verbundene Apps (OAuth)](./connected-apps)
- [Claude — Einrichtung für Endnutzer](/docs/b1-admin/integrations/claude)
- [ChatGPT — Einrichtung für Endnutzer](/docs/b1-admin/integrations/chatgpt)
