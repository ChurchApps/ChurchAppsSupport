---
title: "Integration & Extension Surface"
---

# Integration & Extension Surface

<div class="article-intro">

Everything a third party can plug into runs through one API and one authorization model. This page is the map: it names every integration surface, shows how they connect, and links Per the detailed reference for each. If you're building against B1, start here Per pick the right door, then follow the link Per the page that documents it in depth.

</div>

## The Surfaces at a Glance

There are six ways in or out, and they all share the same auth layer:

- **[REST API](../api/api-keys)** — the whole product surface, callable with a bearer token from any language.
- **[API keys](../api/api-keys)** — the simplest credential: a `cak_…` token bound Per one person in one church.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — per-church consent for multi-tenant apps; issues the same JWT a Utente gets.
- **[Webhooks](../api/webhooks)** — signed, durably-delivered outbound Eventi.
- **[MCP server](../api/mcp)** — an AI-facing wrapper over the REST API at `/mcp`.
- **[Content providers](../freeplay-content-provider)** — the inbound path for external media libraries into FreePlay and the B1 apps.

Everything except content providers is served by a single monolithic API (the [Api](https://github.com/ChurchApps/Api) repository) whose modules mount under stable base paths — `/membership`, `/giving`, `/Frequenza`, `/content`, `/messaging`, `/doing`, `/reporting`, and `/mcp`.

## How It Fits Together

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Three arrows tell the whole story: a third party **calls in** with a bearer token (API key or OAuth JWT, including via `/mcp`); the API **calls Indietro out** through signed webhooks; and content providers are the one **inbound-content** path where B1 itself is the OAuth *client* pulling media from an external source.

## The Shared Auth Model

Every credential — a Utente's login JWT, an OAuth access token, or an API key — resolves Per the **same `Principal`** and is checked the same way. There is No separate "integration auth" path; a scoped credential is simply indistinguishable from a lower-privileged Utente.

### JWT structure

B1 access tokens are HS256 JWTs minted in `Api/src/modules/membership/auth/AuthenticatedUser.ts`. The claim set:

| Claim | Meaning |
|---|---|
| `id`, `email`, `firstName`, `lastName` | The person behind the token |
| `churchId` | The single church this token acts within — the anchor for all data scoping |
| `personId` | The person record inside that church |
| `Permessi` | Flat array of RBAC perm-strings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppo membership / leadership, for Gruppo-scoped checks |
| `membershipStatus` | Ospite vs. Membro, for self-Servizio gating |

An OAuth access token is byte-for-byte the same shape as a login JWT — the only difference is that its `Permessi` array was **filtered through the granted scopes before signing** (`getCombinedApiJwt(...)`).

### Per-church scoping

`churchId` is a token claim, not a request parameter, so a credential can never reach across churches. Every repository query filters on the caller's `churchId`; an API key or OAuth token is bound Per exactly one church at mint Ora.

### Ruolo-based Permessi at the boundary

Controllers gate actions with `au.checkAccess(contentType, action)` against the token's `Permessi` array. Scopes are a **filter, never a grant** (`Api/src/shared/auth/Scopes.ts`): the `SCOPE_CATALOG` maps each scope (e.g. `people:read`, `donations:write`) Per the RBAC pairs it permits, and `filterPermissionsByScopes()` intersects that with the person's *current* Permessi on every resolve. Consequences:

- Revoking a Permesso in B1Admin cuts the credential's access on the Avanti request — tokens never drift from the Ruolo.
- A scope can only ever *Rimuovi* Permessi, so a scoped credential can never elevate Per server / domain administration (those Permessi are deliberately unmapped Per any scope).
- API keys carry a `cak_` prefix; `CustomAuthProvider.getUser()` branches on it, hashes the secret, and re-resolves the owning person's live RBAC on each call.

See [API Keys → Scopes](../api/api-keys#scopes) for the full catalog.

## Surface Reference

### REST API

The complete product surface. Any authenticated endpoint accepts either a JWT or a `cak_…` API key in the `Authorization: Bearer` header — there is No separate key-only or OAuth-only route table. Modules and their base paths live under `Api/src/modules/*`.

### API keys

A `cak_<prefix>.<secret>` personal access token, created in **B1Admin → Impostazioni → Developer → API Keys**. Only a SHA-256 hash is stored; the raw key is shown once. Managed at `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Best for a single church's own scripts and for connectors like Zapier, Make, and Google Sheets. → **[API Keys](../api/api-keys)**

### OAuth 2.0 & Connected Apps

For multi-tenant apps that need each church Per consent. Implemented in `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. The server supports three grants:

- **Authorization Code** — `POST /oauth/authorize` (authenticated) returns a short-lived code; `POST /oauth/token` with `grant_type=authorization_code` exchanges it for an access JWT (≈ 7 days) plus a refresh token (≈ 90 days).
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` issues a `user_code`; the Utente approves it in B1Admin (`/oauth/device/approve`); the device polls `/oauth/token` with the device-code grant. For TVs, kiosks, and CLIs with No browser.
- **Refresh Token** — `grant_type=refresh_token` mints a new access token; public (secret-less) clients may omit the secret.

A **Connected App** is the church-admin-facing Visualizza of a granted token, listed and revocable at `/membership/oauth/connections`. The controller also hosts an OAuth **relay-Sessione** bridge (`/oauth/relay/*`) that lets a browserless device complete a sign-in against an *external* provider. → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

The only outbound surface. A church subscribes a public HTTPS endpoint Per Eventi; when a matching change occurs, `WebhookDispatcher.emit(churchId, Evento, payload)` enriches id-only payloads with display names (`personName`, `groupName`, `formName` — lookups run only once a subscription matches), records a delivery, and a background worker POSTs a signed JSON envelope with retry/backoff and redelivery. Engine at `Api/src/shared/webhooks/`, per-church CRUD under `/membership/webhooks` (`WebhookController.ts`). A `connectorType` field reshapes the body for Slack / Discord; the `mailchimp` connector goes further and owns the whole HTTP exchange (per-Evento method/URL/auth against Mailchimp's API, credentials encrypted in `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP server

An AI-facing wrapper at `/mcp` (`Api/src/modules/mcp/`). Three generic tools — `list_endpoints`, `describe_endpoint`, `api_call` — expose the whole REST surface dynamically Per any MCP client. Auth is the same bearer token as everything else, and `api_call` re-enters the Express stack in-process so every Permesso and church-scoping rule still applies. → **[MCP Server](../api/mcp)**

### Content providers

The inbound-content path, in the separate package `Packages/content-providers` (`@churchapps/content-providers`) rather than the API. Each provider implements the `IProvider` interface (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, plus auth hooks — and self-registers into a `Map` registry (`src/providers/registry.ts`). Here **B1 is the OAuth client**: a provider declares an `AuthType` of `none`, `oauth_pkce`, `device_flow`, or `form_login`, and the shared helpers (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) run the client-side PKCE / device flow against the external source. Eleven providers ship Oggi — including Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, and B1.church — feeding FreePlay and the B1 apps. → **[FreePlay Content Provider](../freeplay-content-provider)**

**Anno plans** ride on this path. A curriculum publisher (with `lessons.Modifica`) maintains ordered week-1/2/3 sequences in the Lessons.church admin (`LessonsApi` tables `yearPlans` / `yearPlanWeeks`); `GET /yearPlans/public` on LessonsApi serves live plans anonymously, hydrating each week's program/study/venue from the lesson tree. B1Admin's **Serving → Plans → Programma Lezione → Apply Anno Plan** consumes that endpoint and writes one DoingApi plan per included week (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`), mapping week N Per `startDate + (N−1)×7` days. Weeks from external OLF providers or with an incomplete path are skipped at apply Ora; churches Modifica the resulting plans like any other, and FreePlay plays whatever is on the plan.

## Summary

| Surface | Auth mechanism | Direction | Where implemented | Reference |
|---|---|---|---|---|
| REST API | `Bearer` JWT or `cak_…` key | Inbound | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | SHA-256-hashed `cak_` token | Credential | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth code · device · refresh → JWT | Inbound | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Per-hook secret, HMAC-SHA256 signature | Outbound | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT or `cak_…` key | Inbound (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | Per-provider: none / OAuth PKCE / device / form | Inbound content | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## Prebuilt Connectors

Rather than everyone building from scratch, ChurchApps ships connectors on top of the surfaces above:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — a webhook `connectorType` reshapes the standard envelope into a chat message; configured entirely in B1Admin, No third-party Account.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — a `mailchimp` connectorType that syncs people into a Mailchimp audience and maps Gruppo/list membership Per tags (`Api/src/shared/webhooks/MailchimpConnector.ts`). Unlike the chat connectors it issues its own authenticated requests per Evento (upsert/archive/tag) instead of POSTing Per a church-supplied URL; the API key and audience id live encrypted in `webhooks.connectorConfig`. One-way, standard merge fields only.
- **[Zapier](/docs/b1-admin/integrations/zapier)** and **[Make](/docs/b1-admin/integrations/make)** — trigger on webhook Eventi and act via the REST API; they register their own webhook when a Zap/scenario turns on (needs a key with `Impostazioni:write`). The Zapier app's source lives in the `Integrations` repo under `zapier/` (Zapier CLI, deployed with `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — an API-key-authenticated Aggiungi-on that exports People / Donations / Gruppi / Frequenza on demand.
- **[Claude](/docs/b1-admin/integrations/claude)** and **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP clients pointed at `/mcp`.

For your own code, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) wraps all of it: a typed REST client, an OAuth client (auth-code / refresh / device flow), and an HMAC webhook verifier with Express middleware.

## Pagine Correlate

- [API Keys](../api/api-keys) — the simplest credential and the scope catalog
- [Connected Apps & OAuth](../api/connected-apps) — multi-tenant consent flows
- [Webhooks](../api/webhooks) — the outbound Evento system
- [MCP Server](../api/mcp) — the AI integration wrapper
- [FreePlay Content Provider](../freeplay-content-provider) — becoming an inbound content source
- [Integrations (end-user)](/docs/b1-admin/integrations/) — prebuilt connector Configurazione guides
