---
title: "MCP Server"
---

# MCP Server

<div class="article-intro">

Ang B1 API ay naghahatid ng isang MCP (Model Context Protocol) server sa `/mcp`. Anumang MCP-aware AI client -- Claude Code, Claude Desktop, Cursor, o ang iyong sarili -- ay maaaring kumonekta dito at tawagan ang base na REST API sa ngalan ng isang authenticated church user.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang [B1 API key](./api-keys) (`cak_…`) na may mga scope na dapat magkaroon ang client
- Isang reachable B1 API host -- `https://api.churchapps.org` para sa mga hosted na simbahan
- Isang MCP client

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspeto | Halaga |
|---|---|
| **Path** | `/mcp` (relative sa API host) |
| **Pamamaraan** | `POST` lamang |
| **Transport** | MCP Streamable HTTP |
| **Session model** | Stateless |
| **Auth** | Bearer token |

## Mga Tools

Tatlong tools, lahat ay generic.

### `list_endpoints`

Ibinabalik ang buong inventory ng registered REST routes, na-filter ng isang opsyonal na substring at/o HTTP verb.

**Input:**

| Field | Type | Paglalarawan |
|---|---|---|
| `filter` | string (optional) | Substring matched laban sa path |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

### `describe_endpoint`

Ibinabalik ang isang maikling buod pang request body at response sample para sa isang endpoint.

**Input:**

| Field | Type | Paglalarawan |
|---|---|---|
| `method` | string | HTTP verb |
| `path` | string | Full path |

### `api_call`

I-invoke ang piniling REST endpoint, in-process, sa pamamagitan ng parehong Express middleware stack bilang isang normal na HTTP request.

**Input:**

| Field | Type | Paglalarawan |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Path kabilang ang anumang module prefix |
| `query` | object (optional) | Query-string parameters |
| `body` | any (optional) | JSON request body |

## Auth Model

Ang MCP request mismo ay tumatakbo sa pamamagitan ng `CustomAuthProvider.getUser()` -- ang parehong path bawat authenticated B1 endpoint ay gumagamit. Ang isang `cak_…` bearer ay nalulutas sa isang `Principal` na ang mga pahintulot ay ang RBAC ng kasalukuyang tao ng issuance, **intersected** na may mga scope na binigyan ng susi.

## Local Development

Ang MCP endpoint ay nag-mount kasama ang lahat kapag ang API ay tumatakbo locally:

```bash
cd Api
npm run dev
```

I-probe ito na may MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Sa Inspector UI, ituro ito sa `http://localhost:8084/mcp` at itakda ang `Authorization` header sa `Bearer cak_<prefix>.<secret>`.
