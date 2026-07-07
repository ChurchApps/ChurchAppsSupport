---
title: "Поверхность интеграции и расширения"
---

# Поверхность интеграции и расширения

<div class="article-intro">

Всё, что third party может plug into, runs через one API и one авторизацион модель. Эта страница это карта: она names каждую интеграцион поверхность, shows как они connect и links к detailed справочник для each. Если вы building против B1, start здесь к pick right дверь затем follow link к странице это documents это в depth.

</div>

## Поверхности с первого взгляда

Есть six способы в или out и они all share same auth слой:

- **[REST API](../api/api-keys)** — целая product поверхность callable с bearer токеном из any язык.
- **[API ключи](../api/api-keys)** — simplest credential: `cak_…` токен bound к one person в one church.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — per-church consent для multi-tenant приложения; issues same JWT person получает.
- **[Webhooks](../api/webhooks)** — подписано durably-delivered outbound события.
- **[MCP server](../api/mcp)** — AI-facing обертка over REST API на `/mcp`.
- **[Content providers](../freeplay-content-provider)** — inbound путь для external media библиотеки в FreePlay и B1 приложения.

Всё except content providers это served by single монолитный API (the [Api](https://github.com/ChurchApps/Api) репо) чья модули mount under stable base пути — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` и `/mcp`.

## Как это Fits Together

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
             │                                        │  API модули: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 это OAuth *client* здесь  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content путь)
```

Three стрелки tell целый история: third party **calls в** с bearer токеном (API ключ или OAuth JWT включая via `/mcp`); API **calls back out** через signed webhooks; и content providers это one **inbound-content** путь где B1 самая это OAuth *client* pulling медиа из external source.

## Shared Auth Model

Каждый credential — person's login JWT OAuth access токен или API ключ — resolves к **same `Principal`** и это checked same способ. Нет separate "integration auth" путь; scoped credential это просто indistinguishable из lower-privileged user.

### JWT структура

B1 access токены это HS256 JWTs minted в `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Claim set:

| Claim | Значение |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Person позади токена |
| `churchId` | Single church это токен acts в — anchor для all data scoping |
| `personId` | Person record внутри этого church |
| `permissions` | Flat array RBAC perm-strings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Group членство / leadership для group-scoped checks |
| `membershipStatus` | Guest vs. member для self-service gating |

OAuth access токен это byte-for-byte same форма как login JWT — only разница это что его `permissions` массив был **filtered через granted scopes перед signing** (`getCombinedApiJwt(...)`).

### Per-church scoping

`churchId` это token claim не request параметр поэтому credential может никогда reach across churches. Каждый репо query filters на caller's `churchId`; API ключ или OAuth токен это bound к exactly one church на mint time.

### Role-based разрешения на boundary

Controllers gate действия с `au.checkAccess(contentType, action)` против token's `permissions` массив. Scopes это **filter никогда grant** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` maps каждый scope (например `people:read`, `donations:write`) к RBAC пары это permits и `filterPermissionsByScopes()` intersects это с person's *current* разрешения на каждый resolve. Последствия:

- Revoking разрешение в B1Admin cuts credential's доступ на next request — tokens никогда не drift из role.
- Scope может только *remove* разрешения поэтому scoped credential может никогда elevate к server / domain администрацион (those разрешения это deliberately unmapped к any scope).
- API ключи carry `cak_` префикс; `CustomAuthProvider.getUser()` branches на это hashes secret и re-resolves owning person's live RBAC на каждый call.

See [API Keys → Scopes](../api/api-keys#scopes) для полный каталог.

## Surface Reference

### REST API

Complete product поверхность. Any authenticated конечная точка принимает либо JWT или `cak_…` API ключ в `Authorization: Bearer` заголовок — нет separate key-only или OAuth-only маршрут таблица. Модули и их base пути live under `Api/src/modules/*`.

### API ключи

`cak_<prefix>.<secret>` personal access токен created в **B1Admin → Settings → Developer → API Keys**. Только SHA-256 хеш это stored; raw ключ это shown один раз. Managed на `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Best для single church's собственный скрипты и для connectors как Zapier Make и Google Sheets. → **[API Keys](../api/api-keys)**

### OAuth 2.0 & Connected Apps

Для multi-tenant приложения что need каждый church к consent. Implemented в `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. Сервер поддерживает три grants:

- **Authorization Code** — `POST /oauth/authorize` (authenticated) возвращает short-lived код; `POST /oauth/token` с `grant_type=authorization_code` exchanges это за access JWT (≈ 7 дней) плюс refresh токен (≈ 90 дней).
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` issues `user_code`; user approves это в B1Admin (`/oauth/device/approve`); device polls `/oauth/token` с device-code grant. Для TVs киоски и CLIs с no браузер.
- **Refresh Token** — `grant_type=refresh_token` mints new access токен; public (secret-less) клиенты may omit secret.

**Connected App** это church-admin-facing вид granted токена listed и revocable в `/membership/oauth/connections`. Контроллер также hosts OAuth **relay-session** bridge (`/oauth/relay/*`) это lets browserless device complete sign-in против *external* provider. → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

Only outbound поверхность. Church подписывает public HTTPS конечная точка к события; когда matching изменение occurs `WebhookDispatcher.emit(churchId, event, payload)` records delivery и background worker POSTs подписано JSON envelope с retry/backoff и redelivery. Engine на `Api/src/shared/webhooks/` per-church CRUD under `/membership/webhooks` (`WebhookController.ts`). `connectorType` поле reshapes тело для Slack / Discord. → **[Webhooks](../api/webhooks)**

### MCP server

AI-facing обертка на `/mcp` (`Api/src/modules/mcp/`). Three генерик tools — `list_endpoints`, `describe_endpoint`, `api_call` — expose целый REST поверхность dynamically к any MCP клиент. Auth это same bearer токен как всё else и `api_call` re-enters Express стек in-process поэтому каждый разрешение и church-scoping правило all еще applies. → **[MCP Server](../api/mcp)**

### Content providers

Inbound-content путь в separate package `Packages/content-providers` (`@churchapps/content-providers`) rather чем API. Каждый provider implements `IProvider` interface (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` плюс auth hooks — и self-registers в `Map` registry (`src/providers/registry.ts`). Здесь **B1 это OAuth client**: provider объявляет `AuthType` из `none`, `oauth_pkce`, `device_flow` или `form_login` и shared helpers (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) run client-side PKCE / device flow против external source. Одиннадцать providers ship сегодня — включая Planning Center Dropbox Life.Church CBN BibleProject Jesus Film Lessons.church и B1.church — feeding FreePlay и B1 приложения. → **[FreePlay Content Provider](../freeplay-content-provider)**

## Резюме

| Поверхность | Auth механизм | Направление | Где implemented | Справочник |
|---|---|---|---|---|
| REST API | `Bearer` JWT или `cak_…` ключ | Inbound | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API ключи | SHA-256-хеш `cak_` токен | Credential | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth код · device · refresh → JWT | Inbound | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Per-hook secret HMAC-SHA256 signature | Outbound | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT или `cak_…` ключ | Inbound (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | Per-provider: none / OAuth PKCE / device / form | Inbound content | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## Prebuilt Connectors

Rather чем everyone building из scratch ChurchApps ships connectors on top of поверхности above:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — webhook `connectorType` reshapes standard envelope в chat message; configured entire в B1Admin no third-party account.
- **[Zapier](/docs/b1-admin/integrations/zapier)** и **[Make](/docs/b1-admin/integrations/make)** — trigger на webhook события и act via REST API; они register их собственный webhook когда Zap/scenario turns на (needs ключ с `settings:write`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — API-key-authenticated add-on это exports People / Donations / Groups / Attendance по требованию.
- **[Claude](/docs/b1-admin/integrations/claude)** и **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP клиенты pointed на `/mcp`.

Для your собственный код **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) wraps всё: типизированный REST клиент OAuth клиент (auth-code / refresh / device flow) и HMAC webhook verifier с Express middleware.

## Связанные страницы

- [API Keys](../api/api-keys) — simplest credential и scope каталог
- [Connected Apps & OAuth](../api/connected-apps) — multi-tenant consent потоки
- [Webhooks](../api/webhooks) — outbound событие система
- [MCP Server](../api/mcp) — AI интеграцион обертка
- [FreePlay Content Provider](../freeplay-content-provider) — becoming inbound content source
- [Integrations (end-user)](/docs/b1-admin/integrations/) — prebuilt connector setup guides
