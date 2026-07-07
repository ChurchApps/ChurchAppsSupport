---
title: "MCP-Server"
---

# MCP-Server

Das B1 API bietet einen MCP (Model Context Protocol) Server auf `/mcp`. Jeder MCP-fähige KI-Client kann sich mit ihm verbinden und die zugrunde liegende REST-API im Namen eines authentifizierten Kirchenbenutzers aufrufen.

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
| **Method** | `POST` nur -- Request/Response und SSE-Streaming finden auf demselben Endpunkt statt |
| **Transport** | MCP Streamable HTTP |
| **Session-Modell** | Zustandslos. Eine neue MCP-Server-Instanz wird pro Request erstellt |
| **Auth** | Bearer-Token. `cak_…` API-Schlüssel und B1 JWTs funktionieren beide |

## Werkzeuge

Drei generische Werkzeuge plus eine Anleitung. Das Modell verwendet `list_endpoints` für die Erkennung, `describe_endpoint` zum Erlernen einer Nutzlastform, `api_call` zum tatsächlichen Aufrufen der API und `describe_page_builder` wenn die Aufgabe Website-Inhalte betrifft.

### `list_endpoints`

Gibt die vollständige Bestandsaufnahme registrierter REST-Routen zurück, gefiltert nach einem optionalen Substring und/oder HTTP-Verb.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `filter` | string (optional) | Teilstring-Übereinstimmung gegen den Pfad |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

### `describe_endpoint`

Gibt eine kurze Zusammenfassung plus ein handgesammeltes Request-Body- und Response-Beispiel für einen Endpunkt zurück.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | string | HTTP-Verb |
| `path` | string | Vollständiger Pfad wie von `list_endpoints` zurückgegeben |

### `api_call`

Ruft den gewählten REST-Endpunkt prozessinterner auf, durch den gleichen Express-Middleware-Stack wie eine normale HTTP-Request.

**Eingabe:**

| Feld | Typ | Beschreibung |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Pfad einschließlich Modul-Präfix |
| `query` | object (optional) | Flat-Objekt von Query-String-Parametern |
| `body` | any (optional) | JSON-Request-Body |

### `describe_page_builder`

Das einzige nicht-generische Werkzeug: ein statischer, eigenständiger Leitfaden zum Erstellen von Website-Seiten über die `/content/*` Endpunkte.

## Auth-Modell

Der MCP-Request selbst durchläuft `CustomAuthProvider.getUser()` -- der gleiche Pfad, den jeder authentifizierte B1-Endpunkt verwendet. Ein `cak_…` Bearer löst sich zu einem `Principal` auf, dessen Berechtigungen die aktuelle RBAC des ausstellenden Benutzers sind, **verschnitten** mit den vom Schlüssel gewährten Bereichen.

## Pfad-Blockliste

Ein kleiner Satz von Routes sind über `api_call` nicht erreichbar, auch nicht mit einem gültigen Schlüssel:

| Muster | Grund |
|---|---|
| `/giving/donate/webhook/*` | Provider-Webhook-Endpunkte erwarten rohe, signaturverifizierte Bodies von Stripe/PayPal |
| `/membership/oauth/clients*` | OAuth-Client-Registrierung ist nur für Operator |
| `/membership/people/apiEmails` | Gated mit dem Operator `jwtSecret` |
| Jede Route, die `multipart/form-data` erwartet | Datei-Uploads sind nicht JSON-RPC-freundlich |

## Lokale Entwicklung

Der MCP-Endpunkt wird zusammen mit allem anderen montiert, wenn die API lokal läuft:

```bash
cd Api
npm run dev
# Server läuft auf http://localhost:8084
```

Prüfen Sie es mit dem MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Zeigen Sie im Inspector-UI auf `http://localhost:8084/mcp` und legen Sie den `Authorization` Header auf `Bearer cak_<prefix>.<secret>` fest.

## Code-Layout

Der MCP-Server lebt unter `src/modules/mcp/` im Api-Repo.

| Datei | Zweck |
|---|---|
| `McpController.ts` | `@controller("/mcp")` |
| `McpServer.ts` | Erstellt einen MCP `Server` |
| `RouteInventory.ts` | Enumeriert Routen beim Startup |
| `internalDispatch.ts` | Synthetic `req`/`res` |
| `tools/` | Werkzeugs-Implementierungen |
| `examples.ts` | Beispiele für high-traffic Endpunkte |
