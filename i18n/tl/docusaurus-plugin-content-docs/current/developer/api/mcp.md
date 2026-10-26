---
title: "MCP Server"
---

# MCP Server

<div class="article-intro">

Ang B1 API ay may kasamang [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server sa `/mcp`. Maaaring kumonekta rito ang anumang AI client na marunong sa MCP — mga custom connector ng claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, o sarili mong client — at tawagin ang underlying REST API para sa isang naka-authenticate na user ng simbahan. Isa itong manipis at pangkalahatang wrapper: tatlong generic na tool ang naglalantad ng buong API surface nang dynamic sa halip na manu-manong imodelo ang bawat endpoint, kasama ang isang domain guide tool para sa website builder.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [B1 API key](./api-keys) (`cak_…`) na may mga scope na dapat taglayin ng client, o isang MCP client na maaaring mag-sign in gamit ang OAuth (tingnan ang [OAuth Discovery](#oauth-discovery))
- Isang maaabot na B1 API host — `https://api.churchapps.org` para sa mga hosted na simbahan, o sarili mong deployment
- Isang MCP client. Tingnan ang [Claude](/docs/b1-admin/integrations/claude) at [ChatGPT](/docs/b1-admin/integrations/chatgpt) para sa setup ng end-user

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
| **Path** | `/mcp` (kaugnay ng API host) |
| **Method** | `POST` lamang — nangyayari sa iisang endpoint ang request/response at SSE streaming |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Session model** | Stateless. Isang bagong MCP server instance ang binubuo bawat request — walang session id, walang resumption |
| **Auth** | Bearer token. Gumagana ang mga `cak_…` API key at B1 JWT (kasama ang mga OAuth access token); pareho ang resolusyon gaya ng anumang naka-authenticate na endpoint |

Ang request na kulang o hindi wasto ang `Authorization` header ay nagbabalik ng:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

kasama ang HTTP 401 at header na `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, na sinusundan ng mga OAuth-capable client para simulan ang sign-in.

Sa hosted API (production at demo), ang `/mcp` ay inihahain sa pamamagitan ng API Gateway HTTP API sa halip na REST API na ginagamit ng ibang endpoint. Pinalitan ng pangalan ng REST API ang `WWW-Authenticate` bilang `x-amzn-remapped-www-authenticate` sa mga Lambda proxy response, kaya ang mga client gaya ng ChatGPT ay natitirang may bare na 401 at walang paraan para simulan ang sign-in; ipinapasa ng HTTP API ang header nang hindi binabago.

## Mga Tool

Tatlong generic na tool at isang guide. Ginagamit ng modelo ang `list_endpoints` para sa discovery, `describe_endpoint` para matutunan ang hugis ng payload, `api_call` para aktwal na tawagin ang API, at `describe_page_builder` kapag may kinalaman sa nilalaman ng website ang gawain.

### `list_endpoints`

Nagbabalik ng buong imbentaryo ng mga nakarehistrong REST route, na sinasala ng opsyonal na substring at/o HTTP verb. Kasama sa bawat entry ang pangalan ng controller at ang mga API key scope na malamang na kailangan.

**Input:**

| Field | Uri | Paglalarawan |
|---|---|---|
| `filter` | string (opsyonal) | Substring na hindi sensitibo sa case, hinahanap sa path, hal. `"people"` |
| `method` | enum (opsyonal) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** isang JSON document sa anyong ito:

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

Ginagawa ang imbentaryo minsan lamang sa pagsisimula ng API mula sa live route table — anumang maaari mong tawagin gamit ang `curl` ay lalabas dito.

### `describe_endpoint`

Nagbabalik ng maikling buod at, kung mayroon, isang manu-manong piniling halimbawa ng request body at response para sa isang endpoint.

**Input:**

| Field | Uri | Paglalarawan |
|---|---|---|
| `method` | string | HTTP verb |
| `path` | string | Buong path gaya ng ibinalik ng `list_endpoints` |

**Output:** para sa mga curated na endpoint, isang halimbawa na may `summary`, `requestBody`, at `responseSample`. Para sa mga hindi curated na endpoint, isang fallback message na nag-uutos sa modelo na tawagin muna ang `GET` para makita ang hugis. Humigit-kumulang isang dosena sa mga high-traffic na route (people, groups, donations, attendance, funds) ang curated.

### `api_call`

Tinatawag ang napiling REST endpoint, sa loob ng proseso, sa pamamagitan ng parehong Express middleware stack ng normal na HTTP request — nalalapat ang auth, body parsing, audit logging, at per-church scoping.

**Input:**

| Field | Uri | Paglalarawan |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Path kasama ang anumang module prefix, hal. `/membership/people` |
| `query` | object (opsyonal) | Flat na object ng mga query-string parameter |
| `body` | any (opsyonal) | JSON request body — kadalasang array ng model object para sa `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Minamarkahan ang tool result bilang `isError: true` para sa anumang response na may status ≥ 400.

### `describe_page_builder`

Ang tanging hindi generic na tool: isang static at kumpletong gabay sa pagbuo ng mga pahina ng website sa pamamagitan ng `/content/*` na mga endpoint — ang data model na Page → Section → Element, ang create workflow, ang bawat `elementType` kasama ang hugis ng `answersJSON` nito, mga setting sa antas ng section gaya ng `dividerTop`/`dividerBottom` na shape divider, at isang buong halimbawang end-to-end. Wala itong input at sumasalamin sa element catalog na pinananatili sa B1Admin editor (tingnan ang [Arkitektura ng Website Builder](../architecture/website-builder)). Inaasahang tatawagin ito ng mga agent nang minsan bago gumawa o mag-edit ng nilalaman ng pahina, at pagkatapos ay kumilos sa pamamagitan ng `api_call`.

## Modelo ng Auth

Ang mismong MCP request ay dumadaan sa `CustomAuthProvider.getUser()` — ang parehong daan na dinadaanan ng bawat naka-authenticate na B1 endpoint. Ang `cak_…` bearer ay nireresolba bilang `Principal` na ang mga pahintulot ay ang kasalukuyang RBAC ng taong naglabas nito, **intersected** sa mga ibinigay na scope ng key. Muling kinakalkula ang intersection na ito sa bawat request, kaya:

- Ang pag-alis ng scope sa isang key (sa pamamagitan ng pagbura at muling paggawa nito) ay puputol ng access sa susunod na tawag.
- Ang pag-alis ng pahintulot sa taong pinagbabatayan sa B1Admin ay puputol ng access sa susunod na tawag, kahit umiiral pa ang key.

Para sa mga nested na `api_call` invocation, kinokopya ang orihinal na `Authorization` header sa synthetic request, kaya tatakbo muli ang `CustomAuthProvider` at muling ilalapat ang scope intersection sa bawat tawag. Walang token caching.

## Path Blocklist

Ilang maliliit na set ng route ang hindi maaabot sa pamamagitan ng `api_call`, kahit may wastong key:

| Pattern | Dahilan |
|---|---|
| `/giving/donate/webhook/*` | Ang mga provider webhook endpoint ay umaasa sa raw, na-verify ang signature na body mula sa Stripe/PayPal — hindi para sa pangkalahatang tumatawag |
| `/membership/oauth/clients*` | Ang pagpaparehistro ng OAuth client ay para sa operator lamang |
| `/membership/people/apiEmails` | Pinoprotektahan ng operator `jwtSecret`, hindi ng mga pahintulot ng user |
| Anumang route na umaasa sa `multipart/form-data` | Hindi angkop sa JSON-RPC ang pag-upload ng file |

Ang naharang na path ay nagbabalik ng `isError: true` na tool result na may paglalarawang mensahe; hindi kailanman tinatawag ang underlying route.

## Limitasyon sa Laki ng Response

Ang bawat response body ng `api_call` ay limitado sa **64 KB** ng nakunang output. Kapag lumampas ang query sa limitasyon, ang response ay may kasamang `"truncated": true` at inaasahang susubukan muli ng modelo gamit ang mas makitid na query parameter. Pinipigilan nito ang isang tool response na pasabugin ang context window ng client.

## Rate Limiting

Walang application-level na rate limit sa `/mcp`. Ang throttling ay ipinagpapaliban sa API Gateway / Lambda concurrency sa production, at sa anumang ipinapatupad ng reverse proxy mo sa mga self-hosted na deployment.

## Pagtuklas ng OAuth {#oauth-discovery}

Inaanunsyo ng MCP server ang OAuth 2.1 metadata para makapag-sign in ang user sa pamamagitan ng mga client na kumokonekta lamang sa mga server na natuklasan sa pamamagitan ng OAuth — lalo na ang UI na "Add custom connector" ng Claude.ai — nang walang na-paste na key. Ang `/mcp` ang protected resource, ang kasalukuyang [OAuth provider](./connected-apps) sa ilalim ng `/membership/oauth` ang authorization server nito, at ang pahinang `/oauth` ng B1Admin ang consent screen.

| Endpoint | Layunin |
|---|---|
| `GET /.well-known/oauth-protected-resource` (at `/.well-known/oauth-protected-resource/mcp`) | Protected resource metadata (RFC 9728): ang `resource` ay `<api>/mcp`, ang `authorization_servers` ay ang API root, ang `scopes_supported` ay naglilista ng bawat [API key scope](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Authorization server metadata (RFC 8414): ang `authorization_endpoint` ay ang `/oauth` ng B1Admin, ang `token_endpoint` ay `/membership/oauth/token`, ang `registration_endpoint` ay `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamic client registration (RFC 7591) |

Ang daloy na pinapatakbo ng isang client gaya ng claude.ai:

1. Ang `POST /mcp` na walang token ay nagbabalik ng 401 na may `WWW-Authenticate` header na tumuturo sa protected resource metadata.
2. Binabasa ng client ang dalawang metadata document, pagkatapos ay nagpaparehistro sa sarili gamit ang `POST /membership/oauth/register`, na nagpapadala ng `client_name`, `redirect_uris`, at opsyonal na `scope`. Ang bawat self-registered na client ay **public** na client: walang secret na inisyu at ang response ay may `token_endpoint_auth_method: "none"`. Dapat na `https` ang redirect URI, o `http` sa loopback address (`localhost`, `127.0.0.1`, `[::1]`); hanggang 10 bawat client. May rate limit ang registration na 20 kada oras bawat IP.
3. Ipinapadala ang user sa `/oauth` ng B1Admin kasama ang `code_challenge` at `code_challenge_method=S256`. Inililista ng consent page ang bawat hinihinging scope sa malinaw na wika (o "Everything your B1 account can access" kapag walang hiniling), ipinapakita ang host kung saan ibabalik ang user, at binabanggit kapag nag-register ang app sa sarili nito. Ki-ni-click ng user ang **Allow**.
4. Ipinapalit ng client ang code sa `/membership/oauth/token` gamit ang `grant_type=authorization_code` at ang `code_verifier` nito, at kalaunan ay nagre-refresh gamit ang `grant_type=refresh_token`. Tinatanggap ang form-encoded at JSON body.
5. Ang nagresultang access token ay isang scoped na B1 JWT, na ginagamit bilang bearer sa `/mcp`.

Mga patakaran sa PKCE: `S256` lamang ang tinatanggap. Ang client na walang secret ay dapat magpadala ng `code_challenge` sa authorize at ng katugmang `code_verifier` sa token exchange; ang confidential client (may secret) ay maaari pa ring gumamit ng secret lamang. Dapat na eksaktong tumugma ang redirect URI sa isang nakarehistrong URI.

Ang mga client na tumatanggap ng static bearer token sa kanilang config — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, custom code — ay maaaring magpatuloy na gumamit ng `cak_…` key sa halip.

## Lokal na Development

Kasama ng lahat ng iba pa ang MCP endpoint kapag tumatakbo ang API nang lokal:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Sa pagsisimula, kinukumpirma ng log line na `📡 MCP server ready at /mcp — N routes in inventory` na nabuo na ang imbentaryo.

Subukan ito gamit ang MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Sa UI ng Inspector, ituro ito sa `http://localhost:8084/mcp` at itakda ang `Authorization` header sa `Bearer cak_<prefix>.<secret>`. Tawagin muna ang `list_endpoints`; dapat makita mo ang buong listahan ng route. Pagkatapos, ang `api_call({ method: "GET", path: "/membership/people" })` ay dapat magbalik ng mga lokal na seed na tao mo.

## Layout ng Code

Nasa `src/modules/mcp/` sa Api repo ang MCP server. Mga mahahalagang file:

| File | Layunin |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; nagkakabit ng `StreamableHTTPServerTransport` sa bawat request at nagpapadala ng hamon na `WWW-Authenticate` sa 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Naghahain ng mga OAuth discovery document sa `/.well-known` |
| `McpServer.ts` | Bumubuo ng MCP `Server` at nagrerehistro ng apat na tool |
| `RouteInventory.ts` | Dinadaanan ang metadata ng inversify-express-utils sa pagsisimula para ilista ang mga route |
| `internalDispatch.ts` | Synthetic na `req`/`res` na muling pumapasok sa Express app sa loob ng proseso |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Mga curated na halimbawa ng request/response para sa mga high-traffic na endpoint |

## Kaugnay

- [API Keys](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
- [Claude — setup para sa end-user](/docs/b1-admin/integrations/claude)
- [ChatGPT — setup para sa end-user](/docs/b1-admin/integrations/chatgpt)
