---
title: "MCP Server"
---

# MCP Server

<div class="article-intro">

Ang B1 API ay may kasamang [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server sa `/mcp`. Anumang MCP-aware na AI client — Claude Code, Claude Desktop, ang OpenAI Agents SDK, Cursor, o ang iyong sarili — ay maaaring kumonekta dito at tawagin ang underlying REST API sa pangalan ng authenticated church user. Ito ay isang thin, generic wrapper: tatlong generic tools ay nagha-expose sa buong API surface nang dynamic sa halip na hand-modeling bawat endpoint, at isang domain guide tool para sa website builder.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [B1 API key](./api-keys) (`cak_…`) na may mga scopes na dapat mayroon ang client
- Isang reachable B1 API host — `https://api.churchapps.org` para sa hosted churches, o sa iyong sariling deployment
- Isang MCP client. Tingnan ang [Claude](/docs/b1-admin/integrations/claude) at [ChatGPT](/docs/b1-admin/integrations/chatgpt) para sa end-user setup

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspect | Value |
|---|---|
| **Path** | `/mcp` (relative sa API host) |
| **Method** | `POST` lang — request/response at SSE streaming ay pareho sa parehong endpoint |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Session model** | Stateless. Isang fresh MCP server instance ay itinayo bawat request — walang session id, walang resumption |
| **Auth** | Bearer token. Ang `cak_…` API keys at B1 JWTs ay parehong gumagana; ang resolution ay pareho sa anumang ibang authenticated endpoint |

Isang request na ang `Authorization` header ay missing o invalid ay nagbabalik:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

na may HTTP 401.

## Tools

Tatlong generic tools at isang guide. Ang model ay gumagamit ng `list_endpoints` para sa discovery, `describe_endpoint` upang matuto ng payload shape, `api_call` upang aktwal na tawakin ang API, at `describe_page_builder` kapag ang gawain ay nagsasangkot ng website content.

### `list_endpoints`

Nagbabalik ng buong inventory ng registered REST routes, na-filter ng isang optional substring at/o HTTP verb. Bawat entry ay may kasamang controller name at ang API key scopes na malamang na kailangan.

**Input:**

| Field | Type | Description |
|---|---|---|
| `filter` | string (optional) | Case-insensitive substring na tumutugma sa path, e.g. `"people"` |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** isang JSON document ng form

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

Ang inventory ay itinayo minsan sa API startup mula sa live route table — anuman ang maaari mong tamaan gamit ang `curl` ay lilitaw dito.

### `describe_endpoint`

Nagbabalik ng isang maikling summary at, kung saan available, isang hand-curated request body at response sample para sa isang endpoint.

**Input:**

| Field | Type | Description |
|---|---|---|
| `method` | string | HTTP verb |
| `path` | string | Full path tulad ng nabuo ng `list_endpoints` |

**Output:** para sa curated endpoints, isang example na may `summary`, `requestBody`, at `responseSample`. Para sa un-curated endpoints, isang fallback message na nagtuturo sa model na tawakin ang `GET` muna upang makita ang shape. Tungkol sa isang dosenang high-traffic routes (people, groups, donations, attendance, funds) ay curated.

### `api_call`

Tinatawag ang napiling REST endpoint, in-process, sa pamamagitan ng parehong Express middleware stack tulad ng isang normal na HTTP request — auth, body parsing, audit logging, at per-church scoping ay lahat ay nalalapat.

**Input:**

| Field | Type | Description |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Path kabilang ang anumang module prefix, e.g. `/membership/people` |
| `query` | object (optional) | Flat object ng query-string parameters |
| `body` | any (optional) | JSON request body — karaniwang isang array ng model objects para sa `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* ang controller's JSON response */ ]
}
```

Ang tool result ay minarkahan ng `isError: true` para sa anumang response na may status ≥ 400.

### `describe_page_builder`

Ang isang non-generic tool: isang static, self-contained na guide sa pagbuo ng website pages sa pamamagitan ng `/content/*` endpoints — ang Page → Section → Element data model, ang create workflow, bawat `elementType` kasama ang `answersJSON` shape, section-level settings tulad ng `dividerTop`/`dividerBottom` shape dividers, at isang worked end-to-end example. Hindi ito tumatanggap ng input at sumasalamin sa element catalog na pinapanatili sa B1Admin editor (tingnan ang [Website Builder Architecture](../architecture/website-builder)). Ang agents ay inaasahang tatawagan ito minsan bago lumikha o mag-edit ng page content, pagkatapos ay kumilos sa pamamagitan ng `api_call`.

## Auth Model

Ang MCP request mismo ay tumatakbo sa pamamagitan ng `CustomAuthProvider.getUser()` — ang parehong landas na ginagamit ng bawat authenticated B1 endpoint. Isang `cak_…` bearer ay nalulutas sa isang `Principal` na ang permissions ay ang current RBAC ng issuing person, **na-intersect** sa mga granted scopes ng key. Ang intersection na ito ay muling kinakompute sa bawat request, kaya:

- Ang pag-aalis ng isang scope mula sa isang key (sa pamamagitan ng pag-delete at paglikha ulit nito) ay pumipigil sa access sa susunod na tawag.
- Ang pag-aalis ng isang permission mula sa underlying person sa B1Admin ay pumipigil sa access sa susunod na tawag, kahit kung ang key ay umiiral pa rin.

Para sa nested `api_call` invocations, ang original `Authorization` header ay kinokopya sa synthetic request, kaya ang `CustomAuthProvider` ay tumatakbo ulit at ang scope intersection ay muling inilalapat bawat tawag. Walang token caching.

## Path Blocklist

Isang maliit na set ng routes ay hindi maaabot sa pamamagitan ng `api_call`, kahit na may valid key:

| Pattern | Why |
|---|---|
| `/giving/donate/webhook/*` | Provider webhook endpoints ay nag-aasahan ng raw, signature-verified bodies mula sa Stripe/PayPal — hindi general callers |
| `/membership/oauth/clients*` | Ang OAuth client registration ay operator-only |
| `/membership/people/apiEmails` | Gated ng operator `jwtSecret`, hindi user permissions |
| Anumang route na nag-aasahan ng `multipart/form-data` | Ang file uploads ay hindi JSON-RPC-friendly |

Isang blocked path ay nagbabalik ng isang `isError: true` tool result na may descriptive message; ang underlying route ay hindi kailanman inilapit.

## Response Size Cap

Bawat `api_call` response body ay capped sa **64 KB** ng captured output. Kung ang isang query ay lumalampas sa cap, ang response ay may `"truncated": true` at ang model ay inaasahang mag-retry na may narrower query parameters. Ito ay napapanatiling isang tool response mula sa pag-sopla ng context window ng client.

## Rate Limiting

Walang application-level rate limit sa `/mcp`. Ang throttling ay napag-ipunan sa API Gateway / Lambda concurrency sa production, at sa kung ano ang iyong reverse proxy ay ipinatupad sa self-hosted deployments.

## OAuth Discovery

Ang MCP server ay **hindi** nag-aadvertise ng OAuth 2.1 metadata (`/.well-known/oauth-authorization-server`, dynamic client registration, PKCE flow). Ang mga client na nangangailangan ng OAuth-discovered MCP servers — lalo na ang Claude.ai's "Add custom connector" UI at ang ChatGPT's "Connectors" feature — ay hindi makakaugnay nang walang surface na iyon.

Ang mga client na tumatanggap ng static bearer token sa kanilang config — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, custom code — ay gumagana ngayon. Ang existing [OAuthController](/docs/developer/api/connected-apps) ay naglalabas na ng tokens sa pamamagitan ng authorization-code + PKCE para sa third-party apps; isang MCP-spec-compliant discovery layer sa ibabaw nito ay magsasara ng gap.

## Local Development

Ang MCP endpoint ay nag-mount kasama ang lahat ng iba kapag ang API ay tumatakbo nang lokal:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Sa startup ang log line `📡 MCP server ready at /mcp — N routes sa inventory` ay nagpapatunay na ang inventory ay itinayo.

Tuklasin ito gamit ang MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Sa MCP Inspector UI, ibahin ito sa `http://localhost:8084/mcp` at itakda ang `Authorization` header sa `Bearer cak_<prefix>.<secret>`. Tawakin ang `list_endpoints` muna; dapat makita mo ang buong route list. Pagkatapos ang `api_call({ method: "GET", path: "/membership/people" })` ay dapat ibalik ang iyong local seed people.

## Code Layout

Ang MCP server ay nakatira sa `src/modules/mcp/` sa Api repo. Kapansin-pansing files:

| File | Purpose |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; nag-wire ng `StreamableHTTPServerTransport` bawat request |
| `McpServer.ts` | Gumagawa ng isang MCP `Server`, nagrerehistro ng apat na tools |
| `RouteInventory.ts` | Lumalakad sa inversify-express-utils metadata sa startup upang i-enumerate ang routes |
| `internalDispatch.ts` | Synthetic `req`/`res` na muling pumasok sa Express app in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Curated request/response samples para sa high-traffic endpoints |

## Related

- [API Keys](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
- [Claude — end-user setup](/docs/b1-admin/integrations/claude)
- [ChatGPT — end-user setup](/docs/b1-admin/integrations/chatgpt)
