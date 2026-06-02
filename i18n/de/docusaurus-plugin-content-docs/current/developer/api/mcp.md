---
title: "MCP-Server"
---

# MCP-Server

<div class="article-intro">

Die B1 API versandt einen [MCP (Model Context Protocol)](https://modelcontextprotocol.io) Server unter `/mcp`. Jeder MCP-fähige KI-Client -- Claude Code, Claude Desktop, das OpenAI Agents SDK, Cursor oder dein eigener -- kann sich damit verbinden und die zugrunde liegende REST API im Namen eines authentifizierten Kirchenbenutzers aufrufen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [B1 API-Schlüssel](./api-keys) (`cak_…`) mit den Umfängen, die der Client haben soll
- Ein erreichbarer B1 API-Host -- `https://api.churchapps.org` für gehostete Kirchen
- Ein MCP-Client

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
| **Methode** | `POST` nur |
| **Transport** | MCP Streamable HTTP |
| **Session Model** | Zustandslos |
| **Auth** | Bearer-Token |

## Tools

Drei Tools, alle generisch.

### `list_endpoints`

Gibt das vollständige Verzeichnis der registrierten REST-Routen zurück.

### `describe_endpoint`

Gibt eine kurze Zusammenfassung für einen Endpunkt zurück.

### `api_call`

Ruft den ausgewählten REST-Endpunkt auf.

## Auth-Modell

Die MCP-Anfrage wird durch `CustomAuthProvider.getUser()` ausgeführt.

## Path Blocklist

Eine kleine Menge von Routen ist nicht über `api_call` erreichbar.

## Response Size Cap

Jede `api_call`-Antwort ist auf **64 KB** erfasster Ausgabe begrenzt.

## Rate Limiting

Es gibt kein Application-Level-Rate-Limit auf `/mcp`.

## Lokale Entwicklung

Der MCP-Endpunkt wird zusammen mit allem anderen bereitgestellt, wenn die API lokal ausgeführt wird:

```bash
cd Api
npm run dev
```

## Related

- [API-Schlüssel](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
