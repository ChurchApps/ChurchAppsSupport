---
title: "Integration और Extension Surface"
---

# Integration और Extension Surface

<div class="article-intro">

सब कुछ एक third party plug कर सकता है एक API और एक authorization model के माध्यम से चलता है। यह पृष्ठ map है: यह हर integration surface को name करता है, दिखाता है कि कैसे वे connect करते हैं, और प्रत्येक के लिए detailed reference को link करता है। यदि आप B1 के विरुद्ध build कर रहे हैं, तो यहां शुरू करें सही door को pick करने के लिए, फिर link को follow करें वह पृष्ठ तक जो इसे depth में document करता है।

</div>

## एक Glance में Surfaces

छह तरीके हैं या बाहर, और वे सभी same auth layer को share करते हैं:

- **[REST API](../api/api-keys)** — पूर्ण product surface, किसी भी language से bearer token के साथ callable।
- **[API keys](../api/api-keys)** — सबसे सरल credential: एक `cak_…` token एक चर्च में एक व्यक्ति के लिए bound।
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — per-church consent multi-tenant apps के लिए; एक user को मिलने वाली same JWT को issue करता है।
- **[Webhooks](../api/webhooks)** — signed, durably-delivered outbound events।
- **[MCP server](../api/mcp)** — `/mcp` पर REST API पर एक AI-facing wrapper।
- **[Content providers](../freeplay-content-provider)** — FreePlay और B1 apps में external media libraries के लिए inbound path।

Content providers को छोड़कर सब कुछ एक single monolithic API के द्वारा served है ([Api](https://github.com/ChurchApps/Api) repository) जिसके modules stable base paths के तहत mount होते हैं — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, और `/mcp`।

## कैसे यह एक साथ फिट होता है

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

तीन arrows पूरी कहानी को बताते हैं: एक third party **calls in** एक bearer token (API key या OAuth JWT, including via `/mcp`) के साथ; API **calls back out** signed webhooks के माध्यम से; और content providers एक **inbound-content** path हैं जहां B1 itself OAuth *client* है जो external source से media को pull कर रहा है।

## Shared Auth Model

हर credential — एक user का login JWT, एक OAuth access token, या एक API key — same `Principal` को resolve करता है और same तरीके से check किया जाता है। कोई अलग "integration auth" path नहीं है; एक scoped credential एक lower-privileged user से simply indistinguishable है।

### JWT structure

B1 access tokens HS256 JWTs हैं `Api/src/modules/membership/auth/AuthenticatedUser.ts` में minted। claim set:

| Claim | अर्थ |
|---|---|
| `id`, `email`, `firstName`, `lastName` | token के पीछे का व्यक्ति |
| `churchId` | single church यह token के लिए acts — सभी data scoping के लिए anchor |
| `personId` | वह church के अंदर person record |
| `permissions` | Flat array of RBAC perm-strings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Group membership / leadership, group-scoped checks के लिए |
| `membershipStatus` | Guest vs. member, self-service gating के लिए |

एक OAuth access token byte-for-byte same shape का एक login JWT है — एक ही अंतर यह है कि इसकी `permissions` array को **signed होने से पहले granted scopes के माध्यम से filter किया गया था** (`getCombinedApiJwt(...)`)।

### Per-church scoping

`churchId` एक token claim है, request parameter नहीं, तो एक credential कभी भी churches में reach नहीं कर सकता। हर repository query caller की `churchId` पर filter करता है; एक API key या OAuth token exactly एक church के लिए mint time पर bound है।

### Role-based permissions at the boundary

Controllers `au.checkAccess(contentType, action)` के साथ token के `permissions` array के विरुद्ध actions को gate करते हैं। Scopes एक **filter, कभी भी grant नहीं** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` हर scope (जैसे `people:read`, `donations:write`) को RBAC pairs को map करता है यह permits, और `filterPermissionsByScopes()` हर resolve पर person के *current* permissions के साथ intersect करता है। परिणाम:

- B1Admin में एक permission को revoke करना अगले request पर credential की access को cut करता है — tokens कभी भी role से drift नहीं करते।
- एक scope केवल *remove* permissions को कर सकता है, तो एक scoped credential कभी भी server / domain administration में elevate नहीं कर सकता (वे permissions deliberately किसी scope को unmapped हैं)।
- API keys एक `cak_` prefix carry करते हैं; `CustomAuthProvider.getUser()` इस पर branch करता है, secret को hash करता है, और हर call पर owning person के live RBAC को re-resolve करता है।

[API Keys → Scopes](../api/api-keys#scopes) पर full catalog देखें।

## Surface Reference

### REST API

पूर्ण product surface। कोई भी authenticated endpoint `Authorization: Bearer` header में या एक JWT या `cak_…` API key को accept करता है — कोई अलग key-only या OAuth-only route table नहीं है। Modules और उनके base paths `Api/src/modules/*` के तहत रहते हैं।

### API keys

एक `cak_<prefix>.<secret>` personal access token, **B1Admin → Settings → Developer → API Keys** में create किया गया। केवल SHA-256 hash store किया जाता है; raw key एक बार दिखाया जाता है। `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`) पर managed। एक single church के अपने scripts और connectors जैसे Zapier, Make, और Google Sheets के लिए सर्वश्रेष्ठ। → **[API Keys](../api/api-keys)**

### OAuth 2.0 & Connected Apps

Multi-tenant apps के लिए जिन्हें हर church को consent की आवश्यकता है। `Api/src/modules/membership/controllers/OAuthController.ts` में `/membership/oauth` के तहत implemented। सर्वर तीन grants को support करता है:

- **Authorization Code** — `POST /oauth/authorize` (authenticated) एक short-lived code return करता है; `POST /oauth/token` साथ `grant_type=authorization_code` इसे एक access JWT (≈ 7 days) plus एक refresh token (≈ 90 days) के लिए exchange करता है।
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` एक `user_code` issue करता है; user इसे B1Admin में approve करता है (`/oauth/device/approve`); device `/oauth/token` को device-code grant के साथ poll करता है। TVs, kiosks, और CLIs के लिए कोई browser के बिना।
- **Refresh Token** — `grant_type=refresh_token` एक नया access token mint करता है; public (secret-less) clients secret को omit कर सकते हैं।

एक **Connected App** एक granted token का church-admin-facing view है, listed और revocable `/membership/oauth/connections` पर। controller एक OAuth **relay-session** bridge को भी host करता है (`/oauth/relay/*`) जो एक browserless device को एक *external* provider के विरुद्ध sign-in को complete करने देता है। → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

एकमात्र outbound surface। एक church एक public HTTPS endpoint को events के लिए subscribe करता है; जब एक matching change होता है, `WebhookDispatcher.emit(churchId, event, payload)` एक delivery को record करता है और एक background worker retry/backoff और redelivery के साथ signed JSON envelope को POST करता है। Engine `Api/src/shared/webhooks/` पर, per-church CRUD `/membership/webhooks` के तहत (`WebhookController.ts`)। एक `connectorType` field Slack / Discord के लिए body को reshape करता है। → **[Webhooks](../api/webhooks)**

### MCP server

एक AI-facing wrapper `/mcp` पर (`Api/src/modules/mcp/`)। तीन generic tools — `list_endpoints`, `describe_endpoint`, `api_call` — पूरी REST surface को dynamically किसी भी MCP client में expose करते हैं। Auth हर चीज के समान bearer token है, और `api_call` Express stack को in-process में re-enter करता है तो हर permission और church-scoping rule अभी भी apply होता है। → **[MCP Server](../api/mcp)**

### Content providers

Inbound-content path, API के बजाय separate package `Packages/content-providers` (`@churchapps/content-providers`) में। प्रत्येक provider `IProvider` interface को implement करता है (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, plus auth hooks — और एक `Map` registry में self-registers (`src/providers/registry.ts`)। यहां **B1 OAuth client है**: एक provider एक `AuthType` के `none`, `oauth_pkce`, `device_flow`, या `form_login` को declare करता है, और shared helpers (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) client-side PKCE / device flow को external source के विरुद्ध चलाते हैं। ग्यारह providers आज ship होते हैं — including Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, और B1.church — FreePlay और B1 apps को feed करते हुए। → **[FreePlay Content Provider](../freeplay-content-provider)**

## सारांश

| Surface | Auth mechanism | Direction | कहां implemented | Reference |
|---|---|---|---|---|
| REST API | `Bearer` JWT या `cak_…` key | Inbound | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | SHA-256-hashed `cak_` token | Credential | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth code · device · refresh → JWT | Inbound | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Per-hook secret, HMAC-SHA256 signature | Outbound | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT या `cak_…` key | Inbound (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | Per-provider: none / OAuth PKCE / device / form | Inbound content | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## Prebuilt Connectors

बजाय हर कोई से scratch से build करता है, ChurchApps prebuilt connectors को ship करता है ऊपर की surfaces पर:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — एक webhook `connectorType` standard envelope को एक chat message में reshape करता है; पूरी तरह B1Admin में configured, कोई third-party account नहीं।
- **[Zapier](/docs/b1-admin/integrations/zapier)** और **[Make](/docs/b1-admin/integrations/make)** — webhook events पर trigger करते हैं और REST API के माध्यम से act करते हैं; वे अपने webhook को register करते हैं जब एक Zap/scenario turn on होता है (एक key की जरूरत है साथ `settings:write`)।
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — एक API-key-authenticated add-on जो People / Donations / Groups / Attendance को on demand export करता है।
- **[Claude](/docs/b1-admin/integrations/claude)** और **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP clients `/mcp` की ओर।

आपके अपने code के लिए, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) सब को wrap करता है: एक typed REST client, एक OAuth client (auth-code / refresh / device flow), और एक HMAC webhook verifier with Express middleware।

## संबंधित पृष्ठ

- [API Keys](../api/api-keys) — सबसे सरल credential और scope catalog
- [Connected Apps & OAuth](../api/connected-apps) — multi-tenant consent flows
- [Webhooks](../api/webhooks) — outbound event system
- [MCP Server](../api/mcp) — AI integration wrapper
- [FreePlay Content Provider](../freeplay-content-provider) — एक inbound content source बनना
- [Integrations (end-user)](/docs/b1-admin/integrations/) — prebuilt connector setup guides
