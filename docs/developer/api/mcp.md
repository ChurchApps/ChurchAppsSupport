---
title: "MCP Server"
---

# MCP Server

<div class="article-intro">

The B1 API ships an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server at `/mcp`. Any MCP-aware AI client — claude.ai custom connectors, Claude Code, Claude Desktop, the OpenAI Agents SDK, Cursor, or your own — can connect to it and call the underlying REST API on behalf of an authenticated church user. It's a thin, generic wrapper: three generic tools expose the whole API surface dynamically rather than hand-modeling each endpoint, plus one domain guide tool for the website builder.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [B1 API key](./api-keys) (`cak_…`) with the scopes the client should have, or an MCP client that can sign in with OAuth (see [OAuth Discovery](#oauth-discovery))
- A reachable B1 API host — `https://api.churchapps.org` for hosted churches, or your own deployment
- An MCP client. See [Claude](/docs/b1-admin/integrations/claude) and [ChatGPT](/docs/b1-admin/integrations/chatgpt) for end-user setup

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
| **Path** | `/mcp` (relative to the API host) |
| **Method** | `POST` only — request/response and SSE streaming both happen on the same endpoint |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Session model** | Stateless. A fresh MCP server instance is built per request — no session id, no resumption |
| **Auth** | Bearer token. `cak_…` API keys and B1 JWTs (including OAuth access tokens) all work; resolution is the same as any other authenticated endpoint |

A request whose `Authorization` header is missing or invalid returns:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

with HTTP 401 and a `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"` header, which OAuth-capable clients follow to start sign-in.

On the hosted API (production and demo), `/mcp` is served through an API Gateway HTTP API rather than the REST API used for the rest of the endpoints. The REST API renames `WWW-Authenticate` to `x-amzn-remapped-www-authenticate` on Lambda proxy responses, which left clients such as ChatGPT with a bare 401 and no way to start sign-in; the HTTP API passes the header through unchanged.

## Tools

Three generic tools plus one guide. The model uses `list_endpoints` for discovery, `describe_endpoint` to learn a payload shape, `api_call` to actually invoke the API, and `describe_page_builder` when the task involves website content.

### `list_endpoints`

Returns the full inventory of registered REST routes, filtered by an optional substring and/or HTTP verb. Each entry includes the controller name and the API key scopes most likely needed.

**Input:**

| Field | Type | Description |
|---|---|---|
| `filter` | string (optional) | Case-insensitive substring matched against the path, e.g. `"people"` |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** a JSON document of the form

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

The inventory is built once at API startup from the live route table — anything you can hit with `curl` appears here.

### `describe_endpoint`

Returns a short summary plus, where available, a hand-curated request body and response sample for one endpoint.

**Input:**

| Field | Type | Description |
|---|---|---|
| `method` | string | HTTP verb |
| `path` | string | Full path as returned by `list_endpoints` |

**Output:** for curated endpoints, an example with `summary`, `requestBody`, and `responseSample`. For un-curated endpoints, a fallback message instructing the model to call `GET` first to see the shape. About a dozen high-traffic routes (people, groups, donations, attendance, funds) are curated.

### `api_call`

Invokes the chosen REST endpoint, in-process, through the same Express middleware stack as a normal HTTP request — auth, body parsing, audit logging, and per-church scoping all apply.

**Input:**

| Field | Type | Description |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Path including any module prefix, e.g. `/membership/people` |
| `query` | object (optional) | Flat object of query-string parameters |
| `body` | any (optional) | JSON request body — typically an array of model objects for `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Tool result is marked `isError: true` for any response with status ≥ 400.

### `describe_page_builder`

The one non-generic tool: a static, self-contained guide to building website pages through the `/content/*` endpoints — the Page → Section → Element data model, the create workflow, each `elementType` with its `answersJSON` shape, section-level settings such as the `dividerTop`/`dividerBottom` shape dividers, and a worked end-to-end example. It takes no input and mirrors the element catalog maintained in the B1Admin editor (see [Website Builder Architecture](../architecture/website-builder)). Agents are expected to call it once before creating or editing page content, then act via `api_call`.

## Auth Model

The MCP request itself runs through `CustomAuthProvider.getUser()` — the same path every authenticated B1 endpoint uses. A `cak_…` bearer resolves to a `Principal` whose permissions are the issuing person's current RBAC, **intersected** with the key's granted scopes. This intersection is recomputed on every request, so:

- Removing a scope from a key (by deleting and recreating it) cuts access on the next call.
- Removing a permission from the underlying person in B1Admin cuts access on the next call, even if the key still exists.

For nested `api_call` invocations, the original `Authorization` header is copied onto the synthetic request, so `CustomAuthProvider` runs again and the scope intersection is re-applied per call. There is no token caching.

## Path Blocklist

A small set of routes are not reachable via `api_call`, even with a valid key:

| Pattern | Why |
|---|---|
| `/giving/donate/webhook/*` | Provider webhook endpoints expect raw, signature-verified bodies from Stripe/PayPal — not general callers |
| `/membership/oauth/clients*` | OAuth client registration is operator-only |
| `/membership/people/apiEmails` | Gated by the operator `jwtSecret`, not user permissions |
| Any route expecting `multipart/form-data` | File uploads are not JSON-RPC-friendly |

A blocked path returns an `isError: true` tool result with a descriptive message; the underlying route is never invoked.

## Response Size Cap

Each `api_call` response body is capped at **64 KB** of captured output. If a query exceeds the cap, the response carries `"truncated": true` and the model is expected to retry with narrower query parameters. This keeps a single tool response from blowing out the client's context window.

## Rate Limiting

There is no application-level rate limit on `/mcp`. Throttling is deferred to API Gateway / Lambda concurrency in production, and to whatever your reverse proxy enforces in self-hosted deployments.

## OAuth Discovery

The MCP server advertises OAuth 2.1 metadata so clients that only connect to OAuth-discovered servers — notably Claude.ai's "Add custom connector" UI — can sign a user in without a pasted key. `/mcp` is the protected resource, the existing [OAuth provider](./connected-apps) under `/membership/oauth` is its authorization server, and the B1Admin `/oauth` page is the consent screen.

| Endpoint | Purpose |
|---|---|
| `GET /.well-known/oauth-protected-resource` (also `/.well-known/oauth-protected-resource/mcp`) | Protected resource metadata (RFC 9728): `resource` is `<api>/mcp`, `authorization_servers` is the API root, `scopes_supported` lists every [API key scope](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Authorization server metadata (RFC 8414): `authorization_endpoint` is B1Admin `/oauth`, `token_endpoint` is `/membership/oauth/token`, `registration_endpoint` is `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamic client registration (RFC 7591) |

The flow a client such as claude.ai runs:

1. `POST /mcp` without a token returns 401 with the `WWW-Authenticate` header pointing at the protected resource metadata.
2. The client reads both metadata documents, then registers itself with `POST /membership/oauth/register`, sending `client_name`, `redirect_uris`, and optionally `scope`. Every self-registered client is a **public** client: no secret is issued and the response has `token_endpoint_auth_method: "none"`. Redirect URIs must be `https`, or `http` on a loopback address (`localhost`, `127.0.0.1`, `[::1]`); at most 10 per client. Registration is rate limited to 20 per hour per IP.
3. The user is sent to B1Admin `/oauth` with `code_challenge` and `code_challenge_method=S256`. The consent page lists each requested scope in plain language (or "Everything your B1 account can access" when none were requested), shows the host the user will be sent back to, and notes when the app registered itself. The user clicks **Allow**.
4. The client exchanges the code at `/membership/oauth/token` with `grant_type=authorization_code` and its `code_verifier`, and later refreshes with `grant_type=refresh_token`. Form-encoded and JSON bodies are both accepted.
5. The resulting access token is a scoped B1 JWT, used as the bearer on `/mcp`.

PKCE rules: only `S256` is accepted. A client without a secret must send a `code_challenge` on authorize and the matching `code_verifier` on the token exchange; confidential clients (with a secret) may still use the secret alone. Redirect URIs must match a registered URI exactly.

Clients that accept a static bearer token in their config — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, custom code — can keep using a `cak_…` key instead.

## Local Development

The MCP endpoint mounts alongside everything else when the API runs locally:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

On startup the log line `📡 MCP server ready at /mcp — N routes in inventory` confirms the inventory was built.

Probe it with the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

In the Inspector UI, point it at `http://localhost:8084/mcp` and set the `Authorization` header to `Bearer cak_<prefix>.<secret>`. Call `list_endpoints` first; you should see the full route list. Then `api_call({ method: "GET", path: "/membership/people" })` should return your local seed people.

## Code Layout

The MCP server lives at `src/modules/mcp/` in the Api repo. Notable files:

| File | Purpose |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; wires `StreamableHTTPServerTransport` per request and sends the `WWW-Authenticate` challenge on 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Serves the `/.well-known` OAuth discovery documents |
| `McpServer.ts` | Builds an MCP `Server`, registers the four tools |
| `RouteInventory.ts` | Walks inversify-express-utils metadata at startup to enumerate routes |
| `internalDispatch.ts` | Synthetic `req`/`res` that re-enters the Express app in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Curated request/response samples for high-traffic endpoints |

## Related

- [API Keys](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
- [Claude — end-user setup](/docs/b1-admin/integrations/claude)
- [ChatGPT — end-user setup](/docs/b1-admin/integrations/chatgpt)
