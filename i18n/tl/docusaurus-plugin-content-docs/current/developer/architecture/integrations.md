---
title: "Integration & Extension Surface"
---

# Integration & Extension Surface

<div class="article-intro">

Lahat ng maaaring mag-plug in ng third party ay tumatakbo sa isang API at isang authorization model. Ang page na ito ay ang mapa: ito ay nagpapangalan sa bawat integration surface, ipinakikita kung paano sila kumokonekta, at nag-link sa detalyadong reference para sa bawat isa. Kung bumubuo ka laban sa B1, magsimula dito upang piliin ang tamang pinto, pagkatapos ay sundin ang link sa page na dine-document ito sa lalim.

</div>

## Ang Mga Surface sa isang Tingin

May anim na paraan sa o labas, at lahat sila ay nagbabahagi ng parehong auth layer:

- **[REST API](../api/api-keys)** — ang buong surface ng produkto, maaaring tawagan na may bearer token mula sa anumang wika.
- **[API keys](../api/api-keys)** — ang pinakasimpleng credential: isang `cak_…` token na nakatali sa isang tao sa isang simbahan.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — per-church consent para sa multi-tenant apps; naglalabas ng parehong JWT na nakukuha ng isang user.
- **[Webhooks](../api/webhooks)** — naka-sign, matibay na-deliver outbound events.
- **[MCP server](../api/mcp)** — isang AI-facing wrapper sa REST API sa `/mcp`.
- **[Content providers](../freeplay-content-provider)** — ang inbound path para sa external na media libraries sa FreePlay at ang B1 apps.

Lahat maliban sa content providers ay siniserve ng isang monolithic API (ang [Api](https://github.com/ChurchApps/Api) repository) na ang mga module ay nag-mount sa ilalim ng stable base paths — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, at `/mcp`.

## Paano Ito Umangkop

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

Ang tatlong arrow ay nagsasabi ng buong kuwento: isang third party **tumatawag sa** na may bearer token (API key o OAuth JWT, kabilang sa pamamagitan ng `/mcp`); ang API **tumatawag pabalik** sa pamamagitan ng naka-sign na mga webhook; at ang content providers ay ang isang **inbound-content** path kung saan ang B1 mismo ay ang OAuth *client* na sumusubo ng media mula sa isang external na source.

## Ang Shared Auth Model

Bawat credential — ang login JWT ng isang user, isang OAuth access token, o isang API key — nalulutas sa **parehong `Principal`** at sinusuri sa parehong paraan. Walang magkahiwalay na "integration auth" path; ang isang scoped credential ay simpleng hindi mapapansin mula sa isang mas mababang-pribilehiyong user.

### JWT structure

Ang B1 access tokens ay HS256 JWTs na mintado sa `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Ang claim set:

| Claim | Meaning |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Ang tao sa likod ng token |
| `churchId` | Ang iisang simbahan na ginagalaw ng token na ito — ang anchor para sa lahat ng data scoping |
| `personId` | Ang tao record sa loob ng simbahang iyon |
| `permissions` | Flat array ng RBAC perm-strings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Pagsali ng grupo / leadership, para sa grupo-scoped checks |
| `membershipStatus` | Guest vs. member, para sa self-service gating |

Ang isang OAuth access token ay byte-for-byte ang parehong hugis bilang isang login JWT — ang tanging pagkakaiba ay ang `permissions` array nito ay naka-filter **sa pamamagitan ng mga granted scopes bago mag-sign** (`getCombinedApiJwt(...)`).

### Per-church scoping

Ang `churchId` ay isang token claim, hindi isang request parameter, kaya ang isang credential ay hindi kailanman maaabot ang mga simbahan. Bawat repository query ay nag-filter sa `churchId` ng caller; ang isang API key o OAuth token ay nakatali sa eksaktong isang simbahan sa mint time.

### Role-based permissions sa hangganan

Ang mga controller ay nag-gate ng mga aksyon na may `au.checkAccess(contentType, action)` laban sa `permissions` array ng token. Ang mga scope ay isang **filter, hindi kailanman ang isang grant** (`Api/src/shared/auth/Scopes.ts`): ang `SCOPE_CATALOG` ay nag-map sa bawat scope (halimbawa, `people:read`, `donations:write`) sa RBAC pairs na ito ay nagpapahintulot, at `filterPermissionsByScopes()` ay nagtugma ng iyon sa *current* permissions ng tao sa bawat resolve. Ang mga kahihinatnan:

- Ang pag-revoke ng isang pahintulot sa B1Admin ay pinupuputol ang access ng credential sa susunod na request — ang mga token ay hindi kailanman nag-drift mula sa papel.
- Ang isang scope ay maaari lamang *alisin* ang mga pahintulot, kaya ang isang scoped credential ay hindi kailanman maaaring itaas sa server / domain administration (ang mga pahintulot na iyon ay sinadyang hindi na-map sa anumang scope).
- Ang mga API key ay nagdadala ng `cak_` prefix; `CustomAuthProvider.getUser()` ay sumasanga sa ito, nag-hash ng sekreto, at muling nalulutas ang live RBAC ng may-ari sa bawat tawag.

Tingnan ang [API Keys → Scopes](../api/api-keys#scopes) para sa buong catalog.

## Surface Reference

### REST API

Ang buong surface ng produkto. Anumang authenticated endpoint ay tumatanggap ng isang JWT o isang `cak_…` API key sa `Authorization: Bearer` header — walang magkahiwalay na key-only o OAuth-only route table. Ang mga module at kanilang base paths ay nabubuhay sa `Api/src/modules/*`.

### API keys

Isang `cak_<prefix>.<secret>` personal access token, na ginawa sa **B1Admin → Settings → Developer → API Keys**. Tanging isang SHA-256 hash lamang ang naka-store; ang raw key ay ipinapakita nang minsan. Isinasagawa sa `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Pinakamahusay para sa mga script ng isang iisang simbahan at para sa mga connector tulad ng Zapier, Make, at Google Sheets. → **[API Keys](../api/api-keys)**

### OAuth 2.0 & Connected Apps

Para sa multi-tenant apps na nangangailangan ng bawat simbahan na magbigay ng pahintulot. Isinasagawa sa `Api/src/modules/membership/controllers/OAuthController.ts` sa ilalim ng `/membership/oauth`. Ang server ay sumusuporta sa tatlong grants:

- **Authorization Code** — `POST /oauth/authorize` (authenticated) ay nagbabalik ng isang short-lived code; `POST /oauth/token` na may `grant_type=authorization_code` ay nag-exchange ito para sa isang access JWT (≈ 7 days) kasama ang isang refresh token (≈ 90 days).
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` ay naglalabas ng `user_code`; ang user ay aprubahan ito sa B1Admin (`/oauth/device/approve`); ang device ay nag-poll ng `/oauth/token` na may device-code grant. Para sa TVs, kiosks, at CLIs na walang browser.
- **Refresh Token** — `grant_type=refresh_token` ay mintado ng isang bagong access token; ang public (secret-less) clients ay maaaring kumaligtaan ng sekreto.

Ang isang **Connected App** ay ang church-admin-facing view ng isang granted token, nakalista at revocable sa `/membership/oauth/connections`. Ang controller ay nag-host din ng isang OAuth **relay-session** bridge (`/oauth/relay/*`) na nagpapahintulot sa isang browserless device na kumpletuhin ang sign-in laban sa isang *external* provider. → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

Ang tanging outbound surface. Ang isang simbahan ay nag-subscribe ng isang public HTTPS endpoint sa mga event; kapag ang isang matching na pagbabago ay nangyayari, ang `WebhookDispatcher.emit(churchId, event, payload)` ay nag-enrich ng id-only payloads na may display names (`personName`, `groupName`, `formName` — ang mga lookup ay tumatakbo lamang nang minsan ang isang subscription ay tumutugma), nag-record ng isang paghahatid, at isang background worker ay POSTs isang signed JSON envelope na may retry/backoff at redelivery. Engine sa `Api/src/shared/webhooks/`, per-church CRUD sa `/membership/webhooks` (`WebhookController.ts`). Isang `connectorType` field ay nag-reshape ng body para sa Slack / Discord; ang `mailchimp` connector ay umabot pa at nag-own ng buong HTTP exchange (per-event method/URL/auth laban sa Mailchimp's API, credentials encrypted sa `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP server

Isang AI-facing wrapper sa `/mcp` (`Api/src/modules/mcp/`). Tatlong generic tools — `list_endpoints`, `describe_endpoint`, `api_call` — ipakita ang buong REST surface na dinamiko sa anumang MCP client. Ang auth ay ang parehong bearer token bilang lahat ng iba, at ang `api_call` ay muling papasok sa Express stack sa-proseso upang bawat pahintulot at church-scoping rule ay pa rin nalalapat. → **[MCP Server](../api/mcp)**

### Content providers

Ang inbound-content path, sa magkakaibang package `Packages/content-providers` (`@churchapps/content-providers`) sa halip na ang API. Bawat provider ay nag-implement ng `IProvider` interface (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, kasama ang auth hooks — at self-register sa isang `Map` registry (`src/providers/registry.ts`). Dito **ang B1 ay ang OAuth client**: isang provider ay nagdideklara ng `AuthType` ng `none`, `oauth_pkce`, `device_flow`, o `form_login`, at ang shared helpers (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) ay tumatakbo sa client-side PKCE / device flow laban sa external source. Labing-isang mga provider ay nagpadala ngayon — kabilang ang Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, at B1.church — nagkakaroon ng FreePlay at ang B1 apps. → **[FreePlay Content Provider](../freeplay-content-provider)**

## Summary

| Surface | Auth mechanism | Direction | Where implemented | Reference |
|---|---|---|---|---|
| REST API | `Bearer` JWT o `cak_…` key | Inbound | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | SHA-256-hashed `cak_` token | Credential | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth code · device · refresh → JWT | Inbound | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Per-hook secret, HMAC-SHA256 signature | Outbound | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT o `cak_…` key | Inbound (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | Per-provider: none / OAuth PKCE / device / form | Inbound content | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## Prebuilt Connectors

Sa halip na lahat ay bumubuo mula sa simula, ang ChurchApps ay naghahatid ng mga connector sa tuktok ng mga surface sa itaas:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — isang webhook `connectorType` ay nag-reshape ng standard envelope sa isang chat message; na-configure nang lubos sa B1Admin, walang third-party account.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — isang `mailchimp` connectorType na nag-sync ng mga tao sa isang Mailchimp audience at nag-map ng pagsali sa grupo/listahan sa mga tag (`Api/src/shared/webhooks/MailchimpConnector.ts`). Hindi tulad ng mga chat connector ito ay naglalabas ng sarili na naawtentikong mga request bawat event (upsert/archive/tag) sa halip na mag-POST sa isang church-supplied URL; ang API key at audience id ay nabubuhay na naka-encrypt sa `webhooks.connectorConfig`. One-way, standard merge fields lamang.
- **[Zapier](/docs/b1-admin/integrations/zapier)** at **[Make](/docs/b1-admin/integrations/make)** — trigger sa webhook events at kumilos sa pamamagitan ng REST API; sila ay nag-register ng sarili na webhook kapag isang Zap/scenario ay nagiging on (nangangailangan ng key na may `settings:write`). Ang source ng Zapier app ay nabubuhay sa `Integrations` repo sa ilalim ng `zapier/` (Zapier CLI, na inilabas na may `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — isang API-key-authenticated add-on na nag-export ng People / Donations / Groups / Attendance on demand.
- **[Claude](/docs/b1-admin/integrations/claude)** at **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — mga MCP client na nakatutok sa `/mcp`.

Para sa iyong sariling code, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) ay nagbalot sa lahat ng ito: isang typed REST client, isang OAuth client (auth-code / refresh / device flow), at isang HMAC webhook verifier na may Express middleware.

## Related Pages

- [API Keys](../api/api-keys) — ang pinakasimpleng credential at ang scope catalog
- [Connected Apps & OAuth](../api/connected-apps) — multi-tenant consent flows
- [Webhooks](../api/webhooks) — ang outbound event system
- [MCP Server](../api/mcp) — ang AI integration wrapper
- [FreePlay Content Provider](../freeplay-content-provider) — nagiging isang inbound content source
- [Integrations (end-user)](/docs/b1-admin/integrations/) — prebuilt connector setup guides
