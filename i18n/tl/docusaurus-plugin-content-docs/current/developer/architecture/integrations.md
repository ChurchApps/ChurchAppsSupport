---
title: "Integrasyon at Extension Surface"
---

# Integrasyon at Extension Surface

<div class="article-intro">

Lahat ng maaaring ikabit ng third party ay dumadaan sa iisang API at iisang modelo ng awtorisasyon. Ang pahinang ito ang mapa: pinangangalanan nito ang bawat integration surface, ipinapakita kung paano sila nagkakaugnay, at nagli-link sa detalyadong reference ng bawat isa. Kung gumagawa ka laban sa B1, magsimula dito para piliin ang tamang pinto, at sundan ang link papunta sa pahinang nagdodokumento nito nang mas malalim.

</div>

## Ang mga Surface sa Isang Sulyap

May anim na paraan papasok o palabas, at lahat sila ay nagbabahagi ng iisang auth layer:

- **[REST API](../api/api-keys)**: ang buong product surface, na maaaring tawagin gamit ang bearer token mula sa anumang wika.
- **[API keys](../api/api-keys)**: ang pinakasimpleng credential, isang token na `cak_…` na nakatali sa isang tao sa isang simbahan.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)**: pahintulot ng simbahan kada simbahan para sa mga multi-tenant na app. Naglalabas ito ng parehong JWT na nakukuha ng isang user.
- **[Webhooks](../api/webhooks)**: mga naka-sign at matibay na naihahatid na outbound na event.
- **[MCP server](../api/mcp)**: isang wrapper para sa AI sa ibabaw ng REST API, sa `/mcp`.
- **[Content providers](../freeplay-content-provider)**: ang inbound na daan para sa mga external na media library papunta sa FreePlay at sa mga B1 app.

Lahat maliban sa content providers ay inihahain ng iisang monolithic na API (ang repository na [Api](https://github.com/ChurchApps/Api)), at ang mga module nito ay nakakabit sa matatag na base path: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, at `/mcp`.

## Paano Ito Nagkakasama

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

Tatlong palaso ang nagsasalaysay ng buong kuwento: tumatawag papasok ang third party gamit ang bearer token (API key o OAuth JWT, kasama ang sa pamamagitan ng `/mcp`). Tumatawag palabas ang API sa pamamagitan ng mga naka-sign na webhook. At ang content providers ang iisang daan ng **inbound na content** kung saan ang B1 mismo ang OAuth *client* na kumukuha ng media mula sa external na pinagmulan.

## Ang Shared Auth Model

Bawat credential, maging ang login JWT ng user, ang OAuth access token, o ang API key, ay nireresolba sa **parehong `Principal`** at sinusuri sa parehong paraan. Walang hiwalay na "integration auth" path. Ang scoped na credential ay hindi nagkakaiba sa isang user na may mas mababang pribilehiyo.

### Istruktura ng JWT

Ang mga access token ng B1 ay mga HS256 JWT na ginawa sa `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Ito ang hanay ng claim:

| Claim | Kahulugan |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Ang taong nasa likod ng token |
| `churchId` | Ang iisang simbahan kung saan kumikilos ang token. Ito ang angkla ng lahat ng data scoping |
| `personId` | Ang talaan ng tao sa loob ng simbahang iyon |
| `permissions` | Patag na array ng mga RBAC perm-string (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Membership at pamumuno sa group, para sa mga check na nakabatay sa group |
| `membershipStatus` | Guest o miyembro, para sa pagbabantay ng self-service |

Ang OAuth access token ay magkapareho ang hugis, byte-for-byte, sa login JWT. Ang tanging pagkakaiba ay na ang array nitong `permissions` ay **sinala ayon sa mga ibinigay na scope bago pirmahan** (`getCombinedApiJwt(...)`).

### Scoping kada simbahan

Ang `churchId` ay claim ng token, hindi parameter ng request, kaya hindi kailanman makakarating ang isang credential sa ibang simbahan. Sinasala ng bawat repository query ang `churchId` ng tumatawag. Nakatali ang API key o OAuth token sa eksaktong isang simbahan sa oras ng paglikha nito.

### Mga pahintulot na nakabatay sa tungkulin sa hangganan

Ginagating ng mga controller ang mga aksyon gamit ang `au.checkAccess(contentType, action)` laban sa array ng `permissions` ng token. Ang mga scope ay isang **filter, hindi grant** (`Api/src/shared/auth/Scopes.ts`). Ang `SCOPE_CATALOG` ay nagmamapa ng bawat scope (halimbawa `people:read`, `donations:write`) sa mga pares ng RBAC na pinapayagan nito. Ang `filterPermissionsByScopes()` ay nag-iintersect nito sa *kasalukuyang* pahintulot ng tao sa bawat resolve. Ang mga kahihinatnan:

- Kapag binawi ang isang pahintulot sa B1Admin, puputulin ang access ng credential sa susunod na request. Hindi kailanman lumilihis ang mga token sa tungkulin.
- Ang scope ay maaari lamang *mag-alis* ng pahintulot, kaya hindi kailanman makakataas ang isang scoped na credential sa pagiging server o domain administrator. Sinadyang hindi naka-map sa anumang scope ang mga pahintulot na iyon.
- May prefix na `cak_` ang mga API key. Sinusuri ng `CustomAuthProvider.getUser()` ang prefix na ito, hina-hash ang secret, at muling nireresolba ang live na RBAC ng nagmamay-ari na tao sa bawat tawag.

Tingnan ang [API Keys → Scopes](../api/api-keys#scopes) para sa buong catalog ng scope.

## Reference ng Surface

### REST API

Ang buong product surface. Tumatanggap ang anumang naka-authenticate na endpoint ng alinman sa JWT o API key na `cak_…` sa header na `Authorization: Bearer`. Walang hiwalay na route table para sa key-lamang o OAuth-lamang. Ang mga module at ang kanilang base path ay nasa ilalim ng `Api/src/modules/*`.

### API keys

Isang personal access token na `cak_<prefix>.<secret>`, na nililikha sa **B1Admin → Settings → Developer → API Keys**. Ang SHA-256 hash lamang ang iniimbak. Ipinapakita nang minsan lang ang raw na key. Pinamamahalaan sa `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Pinakamainam para sa mga script ng iisang simbahan at para sa mga connector gaya ng Zapier, Make, at Google Sheets. → **[API Keys](../api/api-keys)**

### OAuth 2.0 & Connected Apps

Para sa mga multi-tenant na app na nangangailangan ng pahintulot ng bawat simbahan. Ipinatutupad sa `Api/src/modules/membership/controllers/OAuthController.ts` sa ilalim ng `/membership/oauth`. Tatlong grant ang sinusuportahan ng server:

- **Authorization Code**: ang `POST /oauth/authorize` (naka-authenticate) ay nagbabalik ng maikling-buhay na code. Ang `POST /oauth/token` na may `grant_type=authorization_code` ay nagpapalit nito sa access JWT (≈ 7 araw) at refresh token (≈ 90 araw). Kailangang gumamit ng PKCE (`S256` lamang) ang mga public na client (walang secret): isang `code_challenge` sa authorize at ang tugmang `code_verifier` sa palitan ng token.
- **Device Code** (RFC 8628): ang `POST /oauth/device/authorize` ay naglalabas ng `user_code`. Inaaprubahan ito ng user sa B1Admin (`/oauth/device/approve`), at ang device ay nagpo-poll sa `/oauth/token` gamit ang device-code grant. Para sa mga TV, kiosk, at CLI na walang browser.
- **Refresh Token**: ang `grant_type=refresh_token` ay naglalabas ng bagong access token. Maaaring hindi magpadala ng secret ang mga public na client (walang secret).

Maaaring magparehistro ang mga public na client sa sarili nila gamit ang `POST /oauth/register` (RFC 7591 dynamic client registration). Nakakakuha sila ng `client_id` at walang secret, at dapat na `https` o loopback ang kanilang redirect URI.

Ang **Connected App** ay ang pagtingin ng admin ng simbahan sa isang ipinagkaloob na token. Nakalista ito at nababawi sa `/membership/oauth/connections`. Naglalaman din ang controller ng OAuth **relay-session** bridge (`/oauth/relay/*`) na nagpapahintulot sa isang device na walang browser na mag-sign in sa isang *external* na provider. → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

Ang tanging outbound na surface. Nagsa-subscribe ang isang simbahan ng pampublikong HTTPS endpoint sa mga event. Kapag may tugmang pagbabago, ang `WebhookDispatcher.emit(churchId, event, payload)` ay nagdaragdag ng mga display name sa mga payload na id lamang (`personName`, `groupName`, `formName`; tumatakbo lamang ang mga lookup kapag may tugmang subscription). Nagtatala ito ng delivery, at isang background worker ang nagpo-POST ng naka-sign na JSON envelope na may retry/backoff at redelivery. Ang engine ay nasa `Api/src/shared/webhooks/`, at ang CRUD kada simbahan ay nasa ilalim ng `/membership/webhooks` (`WebhookController.ts`). Binabago ng field na `connectorType` ang hugis ng body para sa Slack / Discord. Mas malayo ang narating ng connector na `mailchimp`: sarili nitong pinamamahalaan ang buong HTTP exchange (method/URL/auth kada event laban sa API ng Mailchimp, at naka-encrypt ang mga credential sa `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP server

Isang AI-facing na wrapper sa `/mcp` (`Api/src/modules/mcp/`). Tatlong pangkalahatang tool ang naglalantad ng buong REST surface nang dinamiko sa anumang MCP client: `list_endpoints`, `describe_endpoint`, at `api_call`. Pareho ang auth, ang parehong bearer token gaya ng lahat ng iba. Para sa mga client na nag-sign in gamit ang OAuth (claude.ai custom connectors), ang 401 mula sa `/mcp` ay may header na `WWW-Authenticate` na tumuturo sa `/.well-known/oauth-protected-resource`. Ang `/.well-known/oauth-authorization-server` ay nag-aanunsyo ng mga endpoint ng `/membership/oauth`, dynamic registration, PKCE, at ang consent page ng `/oauth` sa B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). Muling pumapasok ang `api_call` sa Express stack sa loob ng proseso, kaya nananatiling ipinatutupad ang bawat patakaran ng pahintulot at scoping ng simbahan. → **[MCP Server](../api/mcp)**

### Content providers

Ang inbound na daan ng content, sa hiwalay na package na `Packages/content-providers` (`@churchapps/content-providers`) at hindi sa API. Ang bawat provider ay nagpapatupad ng interface na `IProvider` (`src/interfaces.ts`): `browse`, `getPlaylist`, `getInstructions`, at mga auth hook. Nagrerehistro ito ng sarili sa isang `Map` registry (`src/providers/registry.ts`). Dito, **ang B1 ang OAuth client**. Nagdedeklara ang provider ng `AuthType` na `none`, `oauth_pkce`, `device_flow`, o `form_login`. Pinapatakbo ng mga shared helper (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) ang PKCE / device flow sa panig ng client laban sa external na pinagmulan. Labing-isang provider ang kasalukuyang ipinapadala, kabilang ang Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, at B1.church. Pinapakain nila ang FreePlay at ang mga B1 app. → **[FreePlay Content Provider](../freeplay-content-provider)**

**Ang mga year plan** ay dumadaan din sa daang ito. Ang isang publisher ng kurikulum (na may `lessons.edit`) ay nagpapanatili ng mga nakaayos na sunod-sunod na week-1/2/3 sa admin ng Lessons.church (mga table ng `LessonsApi` na `yearPlans` / `yearPlanWeeks`, na may opsyonal na `startMonth` at `anchor` kada linggo na `easter` o `christmas`). Inihahain ng `GET /yearPlans/public` sa LessonsApi ang mga live na plano nang anonymous. Hinihydrate nito ang program/study/venue ng bawat linggo mula sa lesson tree. Ginagamit ng **Serving → Plans → Schedule Lesson → Apply Year Plan** ng B1Admin ang endpoint na ito at sumusulat ng isang DoingApi plan kada kasamang linggo (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Para sa mga plano na may `startMonth`, nireresolba ang mga naka-anchor na linggo laban sa napiling taon (Easter sa pamamagitan ng Gregorian computus, Christmas bilang ang Linggo sa o bago ng Dis. 25), at pinupunan ang mga agwat sa pagitan nila. Ang mga plano na walang `startMonth` ay nagmamapa pa rin ng linggo N sa `startDate + (N−1)×7` na araw. Nilalaktawan sa oras ng pag-apply ang mga linggong galing sa external na OLF provider o may hindi kumpletong path. Ini-e-edit ng mga simbahan ang nagresultang mga plano na parang iba pang plano, at ang FreePlay ay tumutugtog ng kung ano man ang nasa plano.

## Buod

| Surface | Mekanismo ng auth | Direksyon | Saan ipinatutupad | Reference |
|---|---|---|---|---|
| REST API | `Bearer` JWT o `cak_…` key | Papasok | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | Token na `cak_` na may SHA-256 hash | Credential | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth code (PKCE) · device · refresh → JWT; dynamic client registration | Papasok | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Secret kada hook, HMAC-SHA256 signature | Palabas | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT, OAuth JWT (natutuklasan sa pamamagitan ng `/.well-known`), o `cak_…` key | Papasok (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | Depende sa provider: wala / OAuth PKCE / device / form | Papasok na content | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## Mga Prebuilt na Connector

Sa halip na gumawa ng lahat mula sa simula, nagbibigay ang ChurchApps ng mga connector sa ibabaw ng mga surface sa itaas:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)**: ang webhook na `connectorType` ay humuhubog sa karaniwang envelope bilang chat message. Ganap na naka-configure sa B1Admin, walang third-party na account na kailangan.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)**: isang connectorType na `mailchimp` na nagsi-sync ng mga tao sa isang Mailchimp audience at minamapa ang membership ng group/list sa mga tag (`Api/src/shared/webhooks/MailchimpConnector.ts`). Hindi tulad ng mga chat connector, sarili nitong nagpapadala ng mga authenticated na request kada event (upsert/archive/tag) sa halip na mag-POST sa URL na ibinigay ng simbahan. Naka-encrypt na nakaimbak sa `webhooks.connectorConfig` ang API key at audience id. Isang direksyon lamang, at karaniwang merge field lamang.
- **[Zapier](/docs/b1-admin/integrations/zapier)** at **[Make](/docs/b1-admin/integrations/make)**: nagti-trigger sa mga webhook event at kumikilos sa pamamagitan ng REST API. Nagrerehistro sila ng sarili nilang webhook kapag na-on ang isang Zap o scenario (kailangan ng key na may `settings:write`). Ang source ng Zapier app ay nasa repository na `Integrations` sa ilalim ng `zapier/` (Zapier CLI, dine-deploy gamit ang `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)**: isang add-on na naka-authenticate gamit ang API key na nag-e-export ng People / Donations / Groups / Attendance kapag hiniling.
- **[Claude](/docs/b1-admin/integrations/claude)** at **[ChatGPT](/docs/b1-admin/integrations/chatgpt)**: mga MCP client na nakaturo sa `/mcp`.

Para sa sarili mong code, binabalot ng **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) ang lahat ng ito: isang typed na REST client, isang OAuth client (auth-code / refresh / device flow), at isang HMAC webhook verifier na may Express middleware.

## Mga Kaugnay na Pahina

- [API Keys](../api/api-keys): ang pinakasimpleng credential at ang catalog ng scope
- [Connected Apps & OAuth](../api/connected-apps): mga multi-tenant na daloy ng pahintulot
- [Webhooks](../api/webhooks): ang outbound na sistema ng event
- [MCP Server](../api/mcp): ang wrapper ng AI integration
- [FreePlay Content Provider](../freeplay-content-provider): pagiging inbound na pinagmumulan ng content
- [Integrations (end-user)](/docs/b1-admin/integrations/): mga gabay sa setup ng prebuilt na connector
