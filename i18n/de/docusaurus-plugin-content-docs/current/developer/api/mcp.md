---
title: "MCP-Server"
---

# MCP-Server

<div class="article-intro">

Die B1-API stellt einen [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-Server unter `/mcp` bereit. Jeder MCP-fähige KI-Client — Claude Code, Claude Desktop, das OpenAI Agents SDK, Cursor oder ein eigener Client — kann sich damit verbinden und die zugrunde liegende REST-API im Namen eines authentifizierten Kirchenbenutzers aufrufen. Es handelt sich um einen dünnen, generischen Wrapper: Drei generische Tools stellen die gesamte API-Oberfläche dynamisch bereit, statt jeden Endpunkt einzeln nachzubilden, plus ein fachliches Guide-Tool für den Website-Builder.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [B1-API-Schlüssel](./api-keys) (`cak_…`) mit den Scopes, die der Client haben soll
- Ein erreichbarer B1-API-Host — `https://api.churchapps.org` für gehostete Kirchen oder Ihre eigene Bereitstellung
- Ein MCP-Client. Siehe [Claude](/docs/b1-admin/integrations/claude) und [ChatGPT](/docs/b1-admin/integrations/chatgpt) für die Einrichtung durch Endbenutzer

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
| **Methode** | Nur `POST` — Request/Response und SSE-Streaming laufen beide über denselben Endpunkt |
| **Session-Modell** | Zustandslos. Pro Anfrage wird eine neue MCP-Serverinstanz erstellt — keine Session-ID, keine Wiederaufnahme |
| **Auth** | Bearer-Token. Sowohl `cak_…`-API-Schlüssel als auch B1-JWTs funktionieren; die Auflösung erfolgt genauso wie bei jedem anderen authentifizierten Endpunkt |

Eine Anfrage, deren `Authorization`-Header fehlt oder ungültig ist, liefert:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

mit HTTP 401.

## Tools

Drei generische Tools plus ein Guide. Das Modell nutzt `list_endpoints` zur Entdeckung, `describe_endpoint`, um die Form eines Payloads zu erfahren, `api_call`, um die API tatsächlich aufzurufen, und `describe_page_builder`, wenn die Aufgabe Website-Inhalte betrifft.

### `list_endpoints`

Liefert das vollständige Inventar der registrierten REST-Routen, gefiltert nach einem optionalen Teilstring und/oder HTTP-Verb. Jeder Eintrag enthält den Controller-Namen und die API-Schlüssel-Scopes, die am wahrscheinlichsten benötigt werden.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `filter` | string (optional) | Groß-/Kleinschreibung ignorierender Teilstring, der gegen den Pfad abgeglichen wird, z. B. `"people"` |
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

Das Inventar wird einmalig beim API-Start aus der aktiven Routentabelle erstellt — alles, was Sie mit `curl` erreichen können, taucht hier auf.

### `describe_endpoint`

Liefert eine kurze Zusammenfassung sowie, sofern verfügbar, ein handkuratiertes Beispiel für Request-Body und Response für einen Endpunkt.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | string | HTTP-Verb |
| `path` | string | Vollständiger Pfad, wie von `list_endpoints` zurückgegeben |

**Ausgabe:** Für kuratierte Endpunkte ein Beispiel mit `summary`, `requestBody` und `responseSample`. Für nicht kuratierte Endpunkte eine Fallback-Nachricht, die das Modell anweist, zuerst `GET` aufzurufen, um die Form zu sehen. Etwa ein Dutzend stark frequentierte Routen (Personen, Gruppen, Spenden, Anwesenheit, Fonds) sind kuratiert.

### `api_call`

Ruft den gewählten REST-Endpunkt in-process auf, über denselben Express-Middleware-Stack wie eine normale HTTP-Anfrage — Auth, Body-Parsing, Audit-Logging und Scoping pro Kirche gelten alle.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Pfad inklusive eines eventuellen Modulpräfixes, z. B. `/membership/people` |
| `query` | object (optional) | Flaches Objekt von Query-String-Parametern |
| `body` | any (optional) | JSON-Request-Body — typischerweise ein Array von Modellobjekten bei `POST` |

**Ausgabe:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Das Tool-Ergebnis wird bei jedem Response mit Status ≥ 400 als `isError: true` markiert.

### `describe_page_builder`

Das einzige nicht-generische Tool: eine statische, in sich geschlossene Anleitung zum Erstellen von Website-Seiten über die `/content/*`-Endpunkte — das Datenmodell Page → Section → Element, der Erstellungs-Workflow, jeder `elementType` mit seiner `answersJSON`-Form, Einstellungen auf Section-Ebene wie die Formteiler `dividerTop`/`dividerBottom` sowie ein durchgängiges Beispiel. Es benötigt keine Eingabe und spiegelt den im B1Admin-Editor gepflegten Element-Katalog wider (siehe [Website-Builder-Architektur](../architecture/website-builder)). Von Agenten wird erwartet, dass sie es einmal aufrufen, bevor sie Seiteninhalte erstellen oder bearbeiten, und dann über `api_call` handeln.

## Auth-Modell

Die MCP-Anfrage selbst läuft über `CustomAuthProvider.getUser()` — denselben Pfad, den jeder authentifizierte B1-Endpunkt nutzt. Ein `cak_…`-Bearer wird zu einem `Principal` aufgelöst, dessen Berechtigungen die aktuelle RBAC der ausstellenden Person sind, **geschnitten** mit den gewährten Scopes des Schlüssels. Diese Schnittmenge wird bei jeder Anfrage neu berechnet, daher gilt:

- Das Entfernen eines Scopes von einem Schlüssel (durch Löschen und Neuerstellen) kappt den Zugriff beim nächsten Aufruf.
- Das Entfernen einer Berechtigung von der zugrunde liegenden Person in B1Admin kappt den Zugriff beim nächsten Aufruf, selbst wenn der Schlüssel noch existiert.

Bei verschachtelten `api_call`-Aufrufen wird der ursprüngliche `Authorization`-Header auf die synthetische Anfrage kopiert, sodass `CustomAuthProvider` erneut läuft und die Scope-Schnittmenge pro Aufruf neu angewendet wird. Es gibt kein Token-Caching.

## Pfad-Sperrliste

Ein kleiner Satz von Routen ist über `api_call` nicht erreichbar, selbst mit einem gültigen Schlüssel:

| Muster | Grund |
|---|---|
| `/giving/donate/webhook/*` | Provider-Webhook-Endpunkte erwarten rohe, signaturverifizierte Bodies von Stripe/PayPal — nicht von allgemeinen Aufrufern |
| `/membership/oauth/clients*` | Die Registrierung von OAuth-Clients ist ausschließlich für Operatoren |
| `/membership/people/apiEmails` | Abgesichert durch das `jwtSecret` des Operators, nicht durch Benutzerberechtigungen |
| Jede Route, die `multipart/form-data` erwartet | Datei-Uploads sind nicht JSON-RPC-freundlich |

Ein gesperrter Pfad liefert ein Tool-Ergebnis mit `isError: true` und einer beschreibenden Nachricht; die zugrunde liegende Route wird nie aufgerufen.

## Obergrenze der Antwortgröße

Jeder `api_call`-Antwort-Body ist auf **64 KB** erfasste Ausgabe begrenzt. Überschreitet eine Abfrage diese Grenze, trägt die Antwort `"truncated": true`, und es wird erwartet, dass das Modell mit engeren Query-Parametern erneut versucht. Das verhindert, dass eine einzelne Tool-Antwort das Kontextfenster des Clients sprengt.

## Rate Limiting

Es gibt kein Rate-Limit auf Anwendungsebene für `/mcp`. Die Drosselung wird in Produktion an API-Gateway-/Lambda-Nebenläufigkeit delegiert und bei selbst gehosteten Bereitstellungen an das, was Ihr Reverse Proxy durchsetzt.

## OAuth-Discovery

Der MCP-Server bewirbt **keine** OAuth-2.1-Metadaten (`/.well-known/oauth-authorization-server`, dynamische Client-Registrierung, PKCE-Flow). Clients, die MCP-Server mit OAuth-Discovery benötigen — insbesondere die „Add custom connector“-Oberfläche von Claude.ai und die „Connectors“-Funktion von ChatGPT — können sich ohne diese Oberfläche nicht verbinden.

Clients, die ein statisches Bearer-Token in ihrer Konfiguration akzeptieren — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, eigener Code — funktionieren schon heute. Der bestehende [OAuthController](/docs/developer/api/connected-apps) stellt bereits Tokens per Authorization-Code + PKCE für Drittanbieter-Apps aus; eine MCP-spec-konforme Discovery-Schicht darüber würde die Lücke schließen.

## Lokale Entwicklung

Der MCP-Endpunkt wird zusammen mit allem anderen eingehängt, wenn die API lokal läuft:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Beim Start bestätigt die Log-Zeile `📡 MCP server ready at /mcp — N routes in inventory`, dass das Inventar erstellt wurde.

Testen Sie es mit dem MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Richten Sie in der Inspector-Oberfläche den Zeiger auf `http://localhost:8084/mcp` und setzen Sie den `Authorization`-Header auf `Bearer cak_<prefix>.<secret>`. Rufen Sie zuerst `list_endpoints` auf; Sie sollten die vollständige Routenliste sehen. Anschließend sollte `api_call({ method: "GET", path: "/membership/people" })` Ihre lokal vorbereiteten Testpersonen zurückgeben.

## Code-Struktur

Der MCP-Server befindet sich unter `src/modules/mcp/` im Api-Repository. Wichtige Dateien:

| Datei | Zweck |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; verdrahtet `StreamableHTTPServerTransport` pro Anfrage |
| `McpServer.ts` | Baut einen MCP-`Server` auf, registriert die vier Tools |
| `RouteInventory.ts` | Durchläuft die inversify-express-utils-Metadaten beim Start, um Routen aufzulisten |
| `internalDispatch.ts` | Synthetische `req`/`res`, die die Express-App in-process erneut betritt |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuratierte Request-/Response-Beispiele für stark frequentierte Endpunkte |

## Verwandte Themen

- [API-Schlüssel](./api-keys)
- [Webhooks](./webhooks)
- [Verbundene Apps (OAuth)](./connected-apps)
- [Claude — Einrichtung für Endbenutzer](/docs/b1-admin/integrations/claude)
- [ChatGPT — Einrichtung für Endbenutzer](/docs/b1-admin/integrations/chatgpt)
