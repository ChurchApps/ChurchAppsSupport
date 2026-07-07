---
title: "Integration & Extension Surface"
---

# Integration & Extension Surface

<div class="article-intro">

Lahat ng maaaring i-plug ng third party ay tumatakbo sa isang API at isang authorization model. Ang pahinang ito ay ang map: ito ay nagpapangalan ng bawat integration surface, ipinapakita kung paano sila nag-connect, at nag-link sa detalyadong reference para sa bawat isa. Kung bumubuo ka laban sa B1, magsimula dito upang pumili ng tamang pintuan, pagkatapos ay sundin ang link sa pahinang nag-document nito nang malalim.

</div>

## Ang Surfaces sa isang Sulyap

May anim na paraan papasok o labas, at lahat ay nagbabahagi ng parehong auth layer:

- **[REST API](../api/api-keys)** — ang buong product surface, callable na may bearer token mula sa anumang wika.
- **[API keys](../api/api-keys)** — ang pinakasimpleng credential: isang `cak_…` token na nakabound sa isang tao sa isang simbahan.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — per-church consent para sa multi-tenant apps; nagibigay ng parehong JWT na makukuha ng user.
- **[Webhooks](../api/webhooks)** — signed, durably-delivered outbound events.
- **[MCP server](../api/mcp)** — isang AI-facing wrapper sa REST API sa `/mcp`.
- **[Content providers](../freeplay-content-provider)** — ang inbound path para sa external media libraries sa FreePlay at B1 apps.

Lahat maliban ang content providers ay nasisilbihan ng isang iisang monolithic API (ang [Api](https://github.com/ChurchApps/Api) repository) na ang mga modules ay nag-mount sa ilalim ng stable base paths — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, at `/mcp`.

## Paano Ito Umaangkop

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

Tatlong arrow ang nagkukuwento ng buong kuwento: isang third party ay **tumatawag papasok** na may bearer token (API key o OAuth JWT, kasama sa pamamagit ng `/mcp`); ang API ay **tumatawag pabalik** sa pamamagit ng signed webhooks; at ang mga content providers ay ang tanging **inbound-content** path kung saan ang B1 mismo ay ang OAuth *client* na kumukuha ng media mula sa external source.

## Ang Shared Auth Model

Bawat credential — isang login JWT ng user, isang OAuth access token, o isang API key — ay nagresolba sa **parehong `Principal`** at sinusuri sa parehong paraan. Walang hiwalay na "integration auth" path; ang scoped credential ay simpleng hindi malalaman mula sa isang mas mababang-pribilehiyo na user.

### JWT structure

Ang B1 access tokens ay HS256 JWTs na mintado sa `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Ang claim set:

| Claim | Kahulugan |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Ang tao sa likod ng token |
| `churchId` | Ang iisang simbahan na ang token ay gumagana — ang anchor para sa lahat ng data scoping |
| `personId` | Ang person record sa loob ng simbahang iyon |
| `permissions` | Flat array ng RBAC perm-strings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Group membership / leadership, para sa group-scoped checks |
| `membershipStatus` | Guest vs. member, para sa self-service gating |

Ang OAuth access token ay byte-for-byte ang parehong hugis ng login JWT — ang tanging pagkakaiba ay ang `permissions` array nito ay **na-filter sa pamamagit ng granted scopes bago mag-sign** (`getCombinedApiJwt(...)`).

### Per-church scoping

Ang `churchId` ay isang token claim, hindi isang request parameter, kaya ang credential ay hindi maaaring umaabot sa mga simbahan. Bawat repository query ay nag-filter sa caller's `churchId`; ang API key o OAuth token ay nakabound sa eksaktong isang simbahan sa mint time.

### Role-based permissions sa boundary

Ang mga controller ay nag-gate ng actions gamit ang `au.checkAccess(contentType, action)` laban sa token's `permissions` array. Ang mga scope ay isang **filter, hindi kailanman isang grant** (`Api/src/shared/auth/Scopes.ts`): ang `SCOPE_CATALOG` ay nag-map ng bawat scope (e.g. `people:read`, `donations:write`) sa RBAC pairs na pinapayagan nito, at ang `filterPermissionsByScopes()` ay nagsasalubong iyon sa person's *kasalukuyang* permissions sa bawat resolve. Ang mga resulta:

- Ang pag-revoke ng permission sa B1Admin ay pumupuksa ang credential's access sa susunod na kahilingan — ang mga tokens ay hindi kailanman umaalis mula sa papel.
- Ang scope ay maaaring lamang *alisin* permissions, kaya ang scoped credential ay hindi maaaring mag-elevate sa server / domain administration (ang mga permissions na iyon ay sinandig na unmapped sa anumang scope).
- Ang mga API keys ay may `cak_` prefix; ang `CustomAuthProvider.getUser()` ay sumasagot dito, nag-hash ng secret, at muling nagresolba ng owning person's live RBAC sa bawat tawag.

Tingnan ang [API Keys → Scopes](../api/api-keys#scopes) para sa buong catalog.

## Surface Reference

### REST API

Ang kumpleto ng product surface. Anumang authenticated endpoint ay tumatanggap ng alinman sa JWT o `cak_…` API key sa `Authorization: Bearer` header — walang hiwalay na key-only o OAuth-only route table. Ang mga modules at base paths nila ay nabubuhay sa ilalim ng `Api/src/modules/*`.

### API keys

Ang `cak_<prefix>.<secret>` personal access token, na nilikha sa **B1Admin → Settings → Developer → API Keys**. Lamang isang SHA-256 hash ang ina-imbak; ang raw key ay ipinakita minsan. Pinamamahalaan sa `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Pinakamahusay para sa mga script ng isang simbahan at para sa mga connector tulad ng Zapier, Make, at Google Sheets. → **[API Keys](../api/api-keys)**

### OAuth 2.0 & Connected Apps

Para sa multi-tenant apps na kailangan ng bawat simbahan na mag-consent. Ipinatupad sa `Api/src/modules/membership/controllers/OAuthController.ts` sa ilalim ng `/membership/oauth`. Ang server ay sumusuporta sa tatlong grants:

- **Authorization Code** — `POST /oauth/authorize` (authenticated) ay nagbabalik ng short-lived code; `POST /oauth/token` na may `grant_type=authorization_code` ay nagsasaliksik nito para sa isang access JWT (≈ 7 days) kasama ang refresh token (≈ 90 days).
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` ay nagbibigay ng `user_code`; ang user ay nag-approve nito sa B1Admin (`/oauth/device/approve`); ang device ay nag-poll ng `/oauth/token` na may device-code grant. Para sa TVs, kiosks, at CLIs na walang browser.
- **Refresh Token** — `grant_type=refresh_token` ay nag-mint ng bagong access token; ang mga public (secret-less) clients ay maaaring alisin ang secret.

Ang **Connected App** ay ang church-admin-facing view ng granted token, na nakalista at revocable sa `/membership/oauth/connections`. Ang controller ay nag-host din ng isang OAuth **relay-session** bridge (`/oauth/relay/*`) na nagpapahintulot sa browserless device na tapusin ang sign-in laban sa isang *external* provider. → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

Ang tanging outbound surface. Ang simbahan ay nag-subscribe ng public HTTPS endpoint sa mga events; kapag mayroong matching change, ang `WebhookDispatcher.emit(churchId, event, payload)` ay nag-record ng delivery at background worker ay nagpadala ng signed JSON envelope na may retry/backoff at redelivery. Ang engine ay sa `Api/src/shared/webhooks/`, per-church CRUD sa ilalim ng `/membership/webhooks` (`WebhookController.ts`). Ang `connectorType` field ay muling bumubuo ng body para sa Slack / Discord. → **[Webhooks](../api/webhooks)**

### MCP server

Ang AI-facing wrapper sa `/mcp` (`Api/src/modules/mcp/`). Tatlong generic tools — `list_endpoints`, `describe_endpoint`, `api_call` — ay nag-expose ng buong REST surface nang dynamic sa anumang MCP client. Ang auth ay ang parehong bearer token bilang lahat ng iba, at ang `api_call` ay muling papasok sa Express stack in-process kaya ang bawat permission at church-scoping rule ay nananatiling nag-apply. → **[MCP Server](../api/mcp)**

### Content providers

Ang inbound-content path, sa hiwalay na package `Packages/content-providers` (`@churchapps/content-providers`) sa halip ng API. Bawat provider ay nagpapatupad ng `IProvider` interface (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, kasama ang auth hooks — at self-registers sa isang `Map` registry (`src/providers/registry.ts`). Dito ang **B1 ay ang OAuth client**: ang provider ay nagpapahayag ng `AuthType` ng `none`, `oauth_pkce`, `device_flow`, o `form_login`, at ang mga shared helpers (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) ay tumatakbo ng client-side PKCE / device flow laban sa external source. Labing isang providers ang nagpapadala ngayon — kasama ang Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, at B1.church — na nagpapakain sa FreePlay at B1 apps. → **[FreePlay Content Provider](../freeplay-content-provider)**

## Buod

| Surface | Auth mechanism | Direksyon | Kung saan ipinatupad | Reference |
|---|---|---|---|---|
| REST API | `Bearer` JWT o `cak_…` key | Inbound | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | SHA-256-hashed `cak_` token | Credential | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth code · device · refresh → JWT | Inbound | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Per-hook secret, HMAC-SHA256 signature | Outbound | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT o `cak_…` key | Inbound (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | Per-provider: none / OAuth PKCE / device / form | Inbound content | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## Prebuilt Connectors

Sa halip na ang lahat ay bumubuo mula sa simula, ang ChurchApps ay nagpadala ng mga connector sa taas ng mga surfaces sa itaas:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — isang webhook `connectorType` ay muling bumubuo ng standard envelope sa chat message; na-configure nang kumpleto sa B1Admin, walang third-party account.
- **[Zapier](/docs/b1-admin/integrations/zapier)** at **[Make](/docs/b1-admin/integrations/make)** — trigger sa webhook events at kumilos sa pamamagit ng REST API; sila ay nag-register ng kanilang sariling webhook kapag isang Zap/scenario ay nagiging on (kailangan ang key na may `settings:write`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — isang API-key-authenticated add-on na nag-export ng People / Donations / Groups / Attendance on demand.
- **[Claude](/docs/b1-admin/integrations/claude)** at **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — ang mga MCP clients na tumuturo sa `/mcp`.

Para sa iyong sariling code, ang **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) ay tumapos sa lahat: isang typed REST client, isang OAuth client (auth-code / refresh / device flow), at isang HMAC webhook verifier na may Express middleware.

## Mga Kaugnay na Pahina

- [API Keys](../api/api-keys) — ang pinakasimpleng credential at ang scope catalog
- [Connected Apps & OAuth](../api/connected-apps) — multi-tenant consent flows
- [Webhooks](../api/webhooks) — ang outbound event system
- [MCP Server](../api/mcp) — ang AI integration wrapper
- [FreePlay Content Provider](../freeplay-content-provider) — pagiging isang inbound content source
- [Integrations (end-user)](/docs/b1-admin/integrations/) — prebuilt connector setup guides
