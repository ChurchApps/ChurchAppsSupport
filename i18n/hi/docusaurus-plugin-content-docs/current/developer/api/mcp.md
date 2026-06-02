---
title: "MCP Server"
---

# MCP Server

<div class="article-intro">

B1 API `/mcp` पर एक [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server ships करता है। कोई भी MCP-aware AI क्लाइंट -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, या आपका स्वयं का -- इसे connect कर सकता है और एक authenticated चर्च उपयोगकर्ता की ओर से underlying REST API को कॉल कर सकता है। यह एक thin, generic wrapper है: तीन tools हैं, और वे पूरे API surface को dynamically expose करते हैं बजाय प्रत्येक endpoint को hand-modeling के।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [B1 API key](./api-keys) (`cak_…`) जिसके पास जो scopes क्लाइंट को होने चाहिए
- एक पहुंच योग्य B1 API host -- hosted चर्चों के लिए `https://api.churchapps.org`, या आपका स्वयं का deployment
- एक MCP क्लाइंट। end-user setup के लिए [Claude](/docs/b1-admin/integrations/claude) और [ChatGPT](/docs/b1-admin/integrations/chatgpt) देखें

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
| **Path** | `/mcp` (API host के relative) |
| **Method** | `POST` केवल -- request/response और SSE streaming दोनों समान endpoint पर होते हैं |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Session model** | Stateless। प्रति request एक fresh MCP server instance बनाया जाता है -- कोई session id, कोई resumption नहीं |
| **Auth** | Bearer token. `cak_…` API keys और B1 JWTs दोनों काम करते हैं; resolution किसी अन्य authenticated endpoint के समान है |

एक अनुरोध जिसका `Authorization` हेडर missing या invalid है:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

रिटर्न करता है HTTP 401 के साथ।

## Tools

तीन tools, सभी generic। मॉडल discovery के लिए `list_endpoints` का उपयोग करता है, एक endpoint को जानने के लिए `describe_endpoint`, और वास्तव में API को invoke करने के लिए `api_call`।

### `list_endpoints`

Registered REST routes के पूरे inventory को रिटर्न करता है, एक optional substring और/या HTTP verb द्वारा filtered। प्रत्येक entry में controller नाम और most likely जरूरी API key scopes शामिल हैं।

**Input:**

| Field | Type | Description |
|---|---|---|
| `filter` | string (optional) | Case-insensitive substring path से match किया गया, जैसे `"people"` |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** एक JSON document जिसका form है

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

Inventory API startup से एक बार बनाया जाता है live route table से -- कुछ भी जो आप `curl` के साथ hit कर सकते हैं यहां दिखाई देता है।

### `describe_endpoint`

एक short summary plus, जहां उपलब्ध हो, एक hand-curated request body और response sample एक endpoint के लिए।

**Input:**

| Field | Type | Description |
|---|---|---|
| `method` | string | HTTP verb |
| `path` | string | Full path जैसा `list_endpoints` द्वारा रिटर्न किया जाता है |

**Output:** curated endpoints के लिए, एक उदाहरण जिसमें `summary`, `requestBody`, और `responseSample` हो। Un-curated endpoints के लिए, एक fallback संदेश मॉडल को `GET` कॉल करने के लिए shape देखने को निर्देश देता है। लगभग दर्जन high-traffic routes (people, groups, donations, attendance, funds) curated हैं।

### `api_call`

चुने हुए REST endpoint को invoke करता है, in-process, Express middleware stack के माध्यम से एक normal HTTP request के रूप में -- auth, body parsing, audit logging, और per-church scoping सभी apply होते हैं।

**Input:**

| Field | Type | Description |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Path जिसमें कोई भी module prefix शामिल हो, जैसे `/membership/people` |
| `query` | object (optional) | Query-string parameters का flat object |
| `body` | any (optional) | JSON request body -- typically model objects की एक array `POST` के लिए |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* controller का JSON response */ ]
}
```

Tool result को `isError: true` के साथ marked किया जाता है किसी भी response के लिए status ≥ 400।

## Auth Model

MCP request स्वयं `CustomAuthProvider.getUser()` के through चलता है -- same path हर authenticated B1 endpoint उपयोग करता है। एक `cak_…` bearer एक `Principal` को resolve करता है जिसकी अनुमतियां issuing व्यक्ति की current RBAC हैं, **key के granted scopes के साथ intersected**। यह intersection हर request पर recomputed है, तो:

- एक key से scope को हटाना (deleting और recreating द्वारा) अगली call पर एक्सेस को cut करता है।
- B1Admin में underlying व्यक्ति से एक अनुमति हटाना अगली call पर एक्सेस को cut करता है, यहां तक कि यदि key अभी भी मौजूद है।

Nested `api_call` invocations के लिए, original `Authorization` हेडर synthetic request पर copied किया जाता है, तो `CustomAuthProvider` फिर से run होता है और scope intersection re-applied होता है प्रति call। कोई token caching नहीं है।

## Path Blocklist

Routes का एक छोटा सेट `api_call` के through reachable नहीं है, यहां तक कि एक वैलिड key के साथ:

| Pattern | Why |
|---|---|
| `/giving/donate/webhook/*` | Provider webhook endpoints raw, signature-verified bodies की अपेक्षा करते हैं Stripe/PayPal से -- general callers से नहीं |
| `/membership/oauth/clients*` | OAuth client registration operator-only है |
| `/membership/people/apiEmails` | Operator `jwtSecret` द्वारा gated है, user permissions द्वारा नहीं |
| कोई भी route expecting `multipart/form-data` | File uploads JSON-RPC-friendly नहीं हैं |

एक blocked path एक `isError: true` tool result एक descriptive संदेश के साथ रिटर्न करता है; underlying route को कभी invoke नहीं किया जाता है।

## Response Size Cap

प्रत्येक `api_call` response body captured output के **64 KB** पर capped है। यदि एक query cap को exceed करता है, तो response `"truncated": true` carry करता है और मॉडल को narrower query parameters के साथ retry करने की अपेक्षा की जाती है। यह एक single tool response को क्लाइंट के context window से blow out होने से रोकता है।

## Rate Limiting

`/mcp` पर कोई application-level rate limit नहीं है। Throttling production में API Gateway / Lambda concurrency को defer किया जाता है, और जो भी आपके reverse proxy self-hosted deployments में enforce करता है।

## OAuth Discovery

MCP server OAuth 2.1 metadata (`/.well-known/oauth-authorization-server`, dynamic client registration, PKCE flow) advertise **नहीं** करता है। Clients जिन्हें OAuth-discovered MCP servers की आवश्यकता है -- notably Claude.ai के "Add custom connector" UI और ChatGPT के "Connectors" feature -- बिना उस surface के connect नहीं कर सकते।

Clients जो उनके config में एक static bearer token स्वीकार करते हैं -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, कस्टम कोड -- आज काम करते हैं। Existing [OAuthController](/docs/developer/api/connected-apps) पहले से ही authorization-code + PKCE के through tokens issue करता है तीसरे पक्ष के ऐप के लिए; एक MCP-spec-compliant discovery layer इसके top पर अंतराल को close करेगा।

## स्थानीय विकास

MCP endpoint सब कुछ के साथ mount करता है जब API locally चलता है:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Startup पर log line `📡 MCP server ready at /mcp — N routes in inventory` inventory के built होने की पुष्टि करता है।

MCP Inspector के साथ probe करें:

```bash
npx @modelcontextprotocol/inspector
```

Inspector UI में, इसे `http://localhost:8084/mcp` पर point करें और `Authorization` हेडर को `Bearer cak_<prefix>.<secret>` पर set करें। पहले `list_endpoints` कॉल करें; आपको पूरी route list दिखनी चाहिए। फिर `api_call({ method: "GET", path: "/membership/people" })` आपके local seed लोगों को रिटर्न करना चाहिए।

## कोड लेआउट

MCP server Api repo में `src/modules/mcp/` पर रहता है। Notable files:

| File | Purpose |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; per request `StreamableHTTPServerTransport` को wire करता है |
| `McpServer.ts` | एक MCP `Server` बनाता है, तीन tools को रजिस्टर करता है |
| `RouteInventory.ts` | Startup पर routes को enumerate करने के लिए inversify-express-utils metadata को walk करता है |
| `internalDispatch.ts` | Synthetic `req`/`res` जो in-process Express app में फिर से प्रवेश करता है |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts` |
| `examples.ts` | High-traffic endpoints के लिए curated request/response samples |

## संबंधित

- [API Keys](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
- [Claude -- end-user setup](/docs/b1-admin/integrations/claude)
- [ChatGPT -- end-user setup](/docs/b1-admin/integrations/chatgpt)
