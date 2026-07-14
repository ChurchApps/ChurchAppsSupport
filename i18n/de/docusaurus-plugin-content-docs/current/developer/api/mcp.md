---
title: "MCP-Server"
---

# MCP-Server

<div class="article-intro">

Die B1 API stellt einen [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-Server unter `/mcp` bereit. Jeder MCP-fähige KI-Client — Claude Code, Claude Desktop, das OpenAI Agents SDK, Cursor oder Ihre eigene Lösung — kann sich damit verbinden und die zugrunde liegende REST API im Namen eines authentifizierten Kirchen-Benutzers aufrufen. Es ist ein dünner, generischer Wrapper: Drei generische Tools stellen die gesamte API-Oberfläche dynamisch bereit, anstatt jeden Endpunkt manuell zu modellieren, plus ein domänenspezifisches Guide-Tool für den Website-Builder.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Einen [B1 API-Schlüssel](./api-keys) (`cak_…`) mit den erforderlichen Scopes
- Einen erreichbaren B1 API-Host — `https://api.churchapps.org` für gehostete Kirchen oder Ihre eigene Bereitstellung
- Einen MCP-Client. Siehe [Claude](/docs/b1-admin/integrations/claude) und [ChatGPT](/docs/b1-admin/integrations/chatgpt) für Benutzersetup

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
| **Methode** | Nur `POST` — Request/Response und SSE-Streaming erfolgen auf demselben Endpunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sitzungsmodell** | Zustandslos. Eine neue MCP-Server-Instanz wird pro Request erstellt — keine Sitzungs-ID, kein Lebensdauer |
| **Auth** | Bearer-Token. Beide `cak_…` API-Schlüssel und B1 JWTs funktionieren; Auflösung ist gleich wie bei jedem anderen authentifizierten Endpunkt |

Ein Request ohne oder mit ungültigem `Authorization`-Header gibt zurück:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

mit HTTP 401.

## Tools

Drei generische Tools plus ein Guide. Das Modell nutzt `list_endpoints` zur Erkennung, `describe_endpoint` zum Lernen einer Payload-Form, `api_call` zum tatsächlichen Aufrufen der API und `describe_page_builder` wenn die Aufgabe Website-Inhalte betrifft.

### `list_endpoints`

Gibt das vollständige Inventar registrierter REST-Routen zurück, gefiltert nach optionalem Substring und/oder HTTP-Verb. Jeder Eintrag enthält den Controllernamen und die wahrscheinlich benötigten API-Schlüssel-Scopes.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `filter` | String (optional) | Substring ohne Berücksichtigung von Groß-/Kleinschreibung, abgeglichen gegen den Pfad, z.B. `"people"` |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Ausgabe:** Ein JSON-Dokument der Form

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

Das Inventar wird bei API-Start einmalig aus der aktiven Routentabelle erstellt — alles, was Sie mit `curl` aufrufen können, erscheint hier.

### `describe_endpoint`

Gibt eine kurze Zusammenfassung und, wo verfügbar, ein handkuriert erstelltes Request-Body und Response-Beispiel für einen Endpunkt zurück.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | String | HTTP-Verb |
| `path` | String | Vollständiger Pfad wie von `list_endpoints` zurückgegeben |

**Ausgabe:** Für kuratierte Endpunkte ein Beispiel mit `summary`, `requestBody` und `responseSample`. Für nicht kuratierte Endpunkte eine Fallback-Nachricht, die das Modell anweist, `GET` zuerst aufzurufen, um die Form zu sehen. Etwa ein Dutzend hochfrequente Routen (people, groups, donations, attendance, funds) sind kuratiert.

### `api_call`

Ruft den gewählten REST-Endpunkt in-process durch den gleichen Express-Middleware-Stack wie eine normale HTTP-Anfrage auf — Auth, Body-Parsing, Audit-Logging und pro-Kirchen-Scoping gelten alle.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | String | Pfad einschließlich Modul-Präfix, z.B. `/membership/people` |
| `query` | Objekt (optional) | Flaches Objekt von Query-String-Parametern |
| `body` | any (optional) | JSON-Request-Body — typischerweise ein Array von Modellobjekten für `POST` |

**Ausgabe:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* die JSON-Antwort des Controllers */ ]
}
```

Tool-Ergebnis ist mit `isError: true` gekennzeichnet für jede Antwort mit Status ≥ 400.

### `describe_page_builder`

Das eine nicht-generische Tool: Ein statischer, in sich geschlossener Guide zum Erstellen von Website-Seiten über die `/content/*`-Endpunkte — das Page → Section → Element-Datenmodell, der Create-Workflow, jeder `elementType` mit seiner `answersJSON`-Form, Einstellungen auf Abschnittsebene wie die `dividerTop`/`dividerBottom`-Form-Trennzeichen und ein bearbeitetes End-to-End-Beispiel. Es benötigt keine Eingabe und spiegelt den Element-Katalog wider, der im B1Admin-Editor verwaltet wird (siehe [Website Builder Architektur](../architecture/website-builder)). Agenten werden erwartet, es einmal vor dem Erstellen oder Bearbeiten von Seiteninhalten aufzurufen, dann über `api_call` zu handeln.

## Auth-Modell

Der MCP-Request selbst läuft durch `CustomAuthProvider.getUser()` — den gleichen Pfad, den jeder authentifizierte B1-Endpunkt nutzt. Ein `cak_…`-Bearer wird zu einem `Principal`, dessen Berechtigungen die aktuelle RBAC des ausstellenden Benutzers **intersektiert** mit den vom Schlüssel gewährten Scopes sind. Diese Schnittmenge wird bei jedem Request neu berechnet, daher:

- Das Entfernen eines Scopes aus einem Schlüssel (durch Löschen und Neu-Erstellen) unterbricht den Zugriff beim nächsten Aufruf.
- Das Entfernen einer Berechtigung vom zugrunde liegenden Benutzer in B1Admin unterbricht den Zugriff beim nächsten Aufruf, auch wenn der Schlüssel noch existiert.

Für verschachtelte `api_call`-Aufrufe wird der ursprüngliche `Authorization`-Header auf den synthetischen Request kopiert, daher läuft `CustomAuthProvider` erneut aus und die Scope-Schnittmenge wird pro Aufruf erneut angewendet. Es gibt kein Token-Caching.

## Pfad-Blockliste

Eine kleine Gruppe von Routen sind nicht über `api_call` erreichbar, auch nicht mit einem gültigen Schlüssel:

| Muster | Warum |
|---|---|
| `/giving/donate/webhook/*` | Provider-Webhook-Endpunkte erwarten Rohdaten, signaturgefälscht von Stripe/PayPal — nicht allgemeine Aufrufer |
| `/membership/oauth/clients*` | OAuth-Client-Registrierung ist nur für Operatoren |
| `/membership/people/apiEmails` | Gated durch den Operator `jwtSecret`, nicht Benutzerberechtigungen |
| Jede Route erwartet `multipart/form-data` | Datei-Uploads sind nicht JSON-RPC-freundlich |

Eine blockierte Route gibt ein `isError: true` Tool-Ergebnis mit einer beschreibenden Nachricht zurück; die zugrunde liegende Route wird nie aufgerufen.

## Response-Größen-Grenze

Jeder `api_call`-Response-Body ist auf **64 KB** erfasste Ausgabe begrenzt. Wenn ein Query die Grenze überschreitet, trägt die Antwort `"truncated": true` und das Modell wird erwartet, es mit eingeengteren Query-Parametern erneut zu versuchen. Dies verhindert, dass eine einzelne Tool-Antwort das Kontext-Fenster des Clients sprengt.

## Rate Limiting

Es gibt kein Anwendungs-Level-Rate-Limit auf `/mcp`. Drosselung ist auf API Gateway / Lambda Concurrency in Produktion verschoben, und was auch immer Ihr Reverse Proxy in selbst gehosteten Bereitstellungen erzwingt.

## OAuth Discovery

Der MCP-Server **wirbt nicht** OAuth 2.1-Metadaten (`/.well-known/oauth-authorization-server`, dynamische Client-Registrierung, PKCE-Flow). Clients, die OAuth-erkannte MCP-Server erfordern — besonders Claude.ai's "Add custom connector" UI und ChatGPT's "Connectors"-Feature — können ohne diese Oberfläche nicht verbinden.

Clients, die einen statischen Bearer-Token in ihrer Konfiguration akzeptieren — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, benutzerdefinierter Code — funktionieren heute. Der existierende [OAuthController](/docs/developer/api/connected-apps) gibt bereits Token via Authorization-Code + PKCE für Third-Party-Apps aus; eine MCP-Spez-konforme Discovery-Schicht darüber würde die Lücke schließen.

## Lokale Entwicklung

Der MCP-Endpunkt wird neben allem anderen zusammen eingespielt, wenn die API lokal läuft:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Bei Start bestätigt die Log-Zeile `📡 MCP server ready at /mcp — N routes in inventory` dass das Inventar erstellt wurde.

Prüfen Sie es mit dem MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

In der Inspector UI, zeigen Sie es auf `http://localhost:8084/mcp` und setzen Sie den `Authorization`-Header auf `Bearer cak_<prefix>.<secret>`. Rufen Sie `list_endpoints` zuerst auf; Sie sollten die volle Route-Liste sehen. Dann sollte `api_call({ method: "GET", path: "/membership/people" })` Ihre lokalen Seed-Personen zurückgeben.

## Code-Layout

Der MCP-Server lebt unter `src/modules/mcp/` im Api-Repo. Bemerkenswerte Dateien:

| Datei | Zweck |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; wärt `StreamableHTTPServerTransport` pro Request ein |
| `McpServer.ts` | Erstellt einen MCP `Server`, registriert die vier Tools |
| `RouteInventory.ts` | Läuft durch inversify-express-utils Metadaten bei Start um Routen aufzulisten |
| `internalDispatch.ts` | Synthetischer `req`/`res` der die Express-App in-process erneut eintritt |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuratierte Request/Response-Beispiele für hochfrequente Endpunkte |

## Verwandte Themen

- [API Keys](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
- [Claude — Benutzersetup](/docs/b1-admin/integrations/claude)
- [ChatGPT — Benutzersetup](/docs/b1-admin/integrations/chatgpt)
