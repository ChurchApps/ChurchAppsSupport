---
title: "Маршрутизация веб-сайтов и мульти-сайт"
---

# Маршрутизация веб-сайтов и мульти-сайт

<div class="article-intro">

Single церковь может теперь serve more чем one distinct веб-сайт и каждый один может live на `*.b1.church` subdomain или на fully custom church-owned доменною На этой странице описывается routing слой که sits *under* builder: как incoming запрос resolves к church **і** к specific сайт multi-site data модель (`siteId` sentinel это keeps every pre-existing сайт rendering unchanged) і custom-domain edge — self-managed Caddy proxy на EC2 که terminates TLS і rewrites каждый church domain onto його `*.b1.church` upstream. Для what actually renders один раз запрос has resolved — page/section/element дерево — see [Website Builder](./website-builder).

</div>

## Обзор

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

Три правила hold across это слой:

1. **Sentinel keeps все backward compatible.** `siteId = ''` это primary сайт. Каждый page block link global-style і domain строка که existed перед這 feature carries `''` і renders exactly як він did. *Second* веб-сайт это simply set із строк з non-empty `siteId` і any content endpoint called без `?siteId=` returns primary сайт — byte-for-byte old запрос.
2. **Resolution это host-label-based і converges.** `*.b1.church` subdomain routes by його host label directly; custom домен это rewritten к його `{sub}.b1.church` label на Caddy edge перед B1App видит это (з middleware DB lookup که stamps `x-site` заголовок як fallback для any raw custom `Host`). Both ноги land на same `[sdSlug]` маршрут і same `churches/lookup` call поэтому downstream rendering это identical.
3. **Caddy edge це stateless over one source істини.** Custom домени terminate на self-managed Caddy proxy на EC2 که rewrite каждый domain onto його `{sub}.b1.church` upstream. Domain save fires single best-effort `CaddyHelper.updateCaddy()` і Caddy також читає `domains` таблиця directly (`authorize` і `hostmap` endpoints ниже). Таблиця это authoritative — unreachable Caddy може никогда не fail save.

## Site resolution

### `*.b1.church` subdomains

`B1App/next.config.mjs` rewrite incoming запросы by host. Host правило з pattern `(?<subdomain>.*?)\..*` captures **first label** із host і rewrite `/` і `/:path*` в `/{subdomain}` — `[sdSlug]` App-Router сегмент. Поэтому `grace.b1.church/about` becomes `/grace/about`.

Внутри `src/app/[sdSlug]/` `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) calls `GET /membership/churches/lookup/?subDomain={sdSlug}`. `ChurchController.getBySubDomain` ответ тепер has two гілки:

| Slug matches | Ответ | Значение |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primary сайт із це church |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Secondary сайт** — контроллер falls back к `sites` resolves owning church і echoes queried slug плюс extra `siteId` |

Це extra `siteId` это only вещь که distinguishes secondary-site запрос із primary один; всё else в pipeline это shared.

### Custom домени

Church-owned домен terminates на **Caddy edge** (detailed ниже) які rewrite `Host` заголовок к site's `{sub}.b1.church` перед proxying к B1App. Поэтому на normal путь B1App receives *internal* `*.b1.church` host і resolve його by host label exactly як native subdomain — middleware's DB lookup никогда не fires. `src/middleware.ts` все ще runs на каждый запрос але з one always-on job і one fallback:

1. **Always** — це **delete any client-supplied `x-site` заголовок**. That заголовок это spoofable rewrite input і це only ever trusted коли middleware itself sets його; stripping його це middleware's real job за Caddy.
2. **Fallback non-internal `Host` only** — для raw custom-domain `Host` که reaches B1App *without* Caddy's rewrite це calls `GET /membership/domains/public/lookup/{host}` і якщо це return `subDomain` sets `x-site: {subDomain}.b1.church`. За Caddy це branch це inert потому `Host` это вже `*.b1.church`.

Internal hosts — `localhost`, `b1.church` і suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — skip lookup entirely (они already resolved by host-label rewrite або це preview/deploy hosts).

Lookup самий (`DomainRepo.loadByName`) left-joins `domains → churches` і `domains → sites` і returns `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — assigned secondary site's subdomain якщо domain points на один otherwise church's. Це matches exact host сначала; якщо це host почав з `www.` і missed це retries **один раз** против bare apex.

Back в `next.config.mjs` `x-site` rewrite правила це placed **ahead of** generic host правила поэтому they win. `x-site: grace.b1.church` → first label `grace` → `[sdSlug] = grace` і з there resolution это identical към subdomain путь (same `churches/lookup` same `siteId`).

:::info
`x-site` заголовок это untrusted з outside. Middleware unconditionally strips any inbound `x-site` перед optionally setting його own і rewrite правила only ever see middleware-set value — клиент cannot force себя onto another church's content by sending заголовок.
:::

Two operational детали на middleware:

- **Cache.** Каждый host's result (hit *або* confirmed miss — никогда network error) это cached на **10 minutes** в in-memory `Map` per serverless isolate.
- **Matcher.** Matcher deliberately re-includes `/sitemap.xml`, `/robots.txt` і `/manifest.webmanifest`. Its first pattern excludes dotted paths які would otherwise drop тех файли; they добавлены back поэтому custom domain's per-church SEO/PWA файли також receive `x-site` заголовок.

### `siteId` threading

`ConfigHelper` stores resolved `siteId` на його per-request `ConfigurationInterface` (memoized з React `cache()`) і appends `?siteId=` к content calls це і page компоненти make — **conditionally**: empty `siteId` (primary-church subdomain) omits параметр altogether. Threaded endpoints це page дерево (`/content/pages/:id/tree`) public page список used by sitemap (`/content/pages/public/:id`) global стилі (`/content/globalStyles/church/:id`) nav ссылки (`/content/links/church/:id`) і standalone footer block (`/content/blocks/public/footer/:id`). На normal render путь footer arrives внутри page дерево (sections tagged `zone: "siteFooter"`) уже fetched з `siteId` поэтому нет un-scoped footer gap.

Member portal (B1App `mobile`) intentionally sits outside це: `loadChurchAppearance.ts` resolves church via `churches/lookup` але reads church-level `/settings/public/{id}` і никогда не threads `siteId` — portal это church-wide в v1 (see ниже).

## Multiple веб-сайт per church

### Модель данных

New `membership.sites` таблиця это deliberately tiny:

| Column | Type | Примечания |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Owning church |
| `name` | `varchar(255)` | Display имя (например "Español" "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** — global namespace (ниже) |

Site scoping это затем single nullable-free стовпец added к content і domain таблицы:

| Таблиця (модуль) | Column | `''` means |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain serves primary сайт |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primary сайт — і на **`blocks`** `''` additionally means *shared across all sites* |

Two миграции add all із це (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Потому стовпец defaults к `''` каждый existing строка keeps сегодня's поведение з no backfill.

**Global subdomain namespace.** `sites.subDomain` shares *one* namespace з `churches.subDomain` — site subdomain може never collide з church subdomain або another site's. Це enforced на **обе** save пути: `SiteController.save` rejects slug که hits либо `churches` або `sites` і `ChurchController.validateSave` does same в reverse. Unique index на `sites.subDomain` backs це на database level.

**Pages uniqueness** widened з `(churchId, url)` к `(churchId, siteId, url)` поэтому two сайт із one church може каждый own їхня собственный `/about`.

### Per-site content з fallbacks

Каждый site-scoped content **list/tree** endpoint takes optional `?siteId=` (absent ⇒ `''` = primary): pages дерево / список / public блоки список / by-type / footer ссылки (anon / filtered / all) і global стилі. Sections і elements це *not* scoped directly — they inherit через their parent page або block.

Two resolution цепь do interesting работа:

- **Global стилі — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returns site's own строка; якщо secondary сайт has none це returns **primary (`''`) строка as-is** (keeping primary's `id`/`siteId` які клиент uses к copy-on-write); якщо нету primary either `GlobalStyleController` returns hard-coded default palette/fonts. 
- **Footer block — site-specific wins shared falls back.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returns shared (`''`) *і* site-specific строки; resolver picks site's own footer якщо present else shared один. Same логика runs both в `TreeHelper.insertBlocks` (page дерево) і в standalone `/content/blocks/public/footer/:churchId` endpoint.

### Site deletion cascade

`SiteController.delete` (gated на membership Settings→Edit разрешение) tears secondary сайт down в three шаги:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` cascades all content site owns: його **pages** → their sections elements `pageHistory` і `posts`; його own **blocks** → їхня sections elements і `pageHistory`; його **links** і **globalStyles**. Guard refuses к run для `''` — primary/shared sentinel это никогда не cascaded.
2. `DomainRepo.clearSiteId` **reassigns** site's домены back к primary (`siteId → ''`) rather чем deleting їх поэтому custom домен survives site deletion.
3. `sites` строка это deleted і Caddy маршруты це re-synced (best-effort).

### B1Admin поверхность

| Capability | Где | Механизм |
|-----------|-------|-----------|
| Site switcher | `useSiteSelection` + `SiteSwitcher` (empty = "Main Website") | Reads `?site=` URL параметр і threads його як `?siteId=` в ContentApi calls. Present на three Site **list** области — **Pages**, **Blocks**, **Appearance** — але *not* page/block редактори які carry `siteId` на record |
| Sites create/delete | `SitesDialog` opened з switcher's "Manage websites…" entry | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). Gated на membership Settings→Edit разрешение (`Permissions.settings.edit` server-side; `Permissions.membershipApi.settings.edit` в B1Admin). **Create/delete only — there це no rename UI в v1** |
| Per-domain site assignment | `DomainSettingsEdit` under Settings→Domains | Per-row site dropdown posts `siteId` per domain к `/membership/domains`. Стовпец hides якщо API returns no sites (older backend) |
| Copy-on-write стилі | `StylesManager.prepareForSave` | Коли loaded global-style строка's `siteId` це not match selected сайт (example API returned inherited primary як fallback) це drops primary's `id` і stamps current `siteId` forcing **insert** із new site-specific строка замість overwriting primary. Same fork-on-mismatch applies к site footer block |

:::info
**Що stays church-wide в v1 (deliberate scoping вибір not data-model limit):** **blog** (`BlogPage` has no switcher і loads `/posts` з no `siteId`) **site widgets** (announcement banner + launcher) **redirects** **logo / GA4 / church настройки** і **member portal** (B1App mobile). Note це це *not* "all із Appearance" — secondary site's global стилі (palette fonts typography spacing nav custom CSS) **are** per-site через copy-on-write путь выше; only banner/launcher/redirects/logo sub-panels із Appearance page remain church-wide.
:::

## Custom домени: Caddy edge (static-config план)

:::info
**Направление revised 2026-07-02.** Ранні план к move custom-domain hosting onto Vercel-managed домени was **cancelled** і все Vercel domain-registration код (`VercelHelper` його `vercelToken`/`vercelProjectId`/`vercelTeamId` env vars SSM params і health entries) was removed із Api. Self-managed **Caddy proxy на EC2 stays** як permanent custom-domain edge. Только remaining работа це internal: swapping Caddy's *runtime* admin-API конфиграцион для *static* конфиг که survives restarts.
:::

### Edge

Каждый custom church domain points DNS на one EC2 box — `3.23.251.61` також reachable як `proxy.b1.church`. B1Admin's Settings→Domains экран instructs церкви к add apex `A → 3.23.251.61` або `CNAME → proxy.b1.church`. Caddy terminates TLS з per-domain Let's Encrypt cert rewrites `Host` заголовок к domain's `{sub}.b1.church` upstream і reverse-proxies к B1App — който затем маршрут його by host label як any native subdomain (see [Custom domains](#custom-domains) выше).

Upstream mapping comes з `DomainRepo.loadPairs` whose dial **COALESCEs assigned site's subdomain** поэтому domain proxies к correct *secondary* site falling back к church's primary:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` строки это excluded із map; Caddy serves `www.{host}` via `302` redirect к apex instead.

### Two anonymous endpoints feed edge

`DomainController` exposes two unauthenticated read-only endpoints box consumes directly — anonymous by необходимость since edge queries їх перед any church context exists:

| Endpoint | Returns | Role |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` якщо domain — або для `www.` miss його bare apex — exists в `domains`; `404` иначе (включая empty `domain`) | Caddy's **on-demand-TLS `ask`**: abuse контроль deciding чи к issue cert для incoming SNI |
| `GET /membership/domains/hostmap` | `text/plain` one sorted `{domain} {sub}.b1.church` линия per routable domain | Host→upstream карта файл box refreshes на таймер |

`authorize` reuses `DomainRepo.loadByName` (exact host затем single `www.`→apex retry); `hostmap` reuses `loadPairs` — поэтому це site-aware і `www.*`-excluded identical к proxy маршрути — і just strips `:443` suffix.

### Domain save/delete — one best-effort push

`DomainController.save` writes `domains` строки затем makes **single best-effort** `CaddyHelper.updateCaddy()` call wrapped в `try/catch` که logs (`console.error`) і swallows; `delete` does same (які също fixed prior stale-route-on-delete bug) як does secondary-site deletion (`SiteController.delete`). `updateCaddy` itself bounded by **10s** Axios timeout поэтому unreachable або stopped Caddy може никогда не `500` domain save — `domains` таблиця це source істины.

### Current state — static конфиг no runtime state

Box (Windows EC2 за permanent Elastic IP) runs Caddy з **static Caddyfile**: on-demand TLS whose `ask` points на `/membership/domains/authorize` плюс host→upstream карта файл refreshed каждые 5 minutes з `/membership/domains/hostmap` by scheduled task що ends у graceful `caddy reload`. Config survives restarts з zero runtime state — no re-priming танец — і unknown SNI це **TLS-refused** (no cert це minted для host `authorize` rejects) в то время як authorized-but-not-yet-mapped host (brand-new domain внутри sync window) gets clean 404. New домени become маршрутизирован within ~5 minutes із save; їхня certificates це minted на first hit. Build/setup operations і field-tested gotchas: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legacy runtime push — rollback путь pending deletion

`CaddyHelper` (membership модуль) може все ще drive Caddy через його **admin API** на `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op коли unset; surfaced under `ServerHealthController`'s Integrations group): `updateCaddy()` PATCHes full маршруты array і `initializeCaddy()` + `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` endpoints rebuild runtime-configured сервер з scratch. Це mode's конфиг lived only в Caddy's memory — restart-amnesia це архітектура replaced. Machinery remains solely як rollback путь і scheduled для deletion один раз static box has been стабільна; best-effort `updateCaddy()` push на domain save/delete це harmless no-op проти static box (його admin API это localhost-only).

## Пов'язані сторінки

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — edge box самий: fresh-box setup WinSW служба map sync завдання і operational gotchas
- [Website Builder](./website-builder) — page/section/element дерево renderers blog SEO і AI generation (що renders один раз запрос has resolved к church/site)
- [Content Endpoints](../api/endpoints/content) — REST поверхність для pages blocks ссылки і global стилі все тепер `?siteId=`-aware
- [B1App](../web-apps/b1-app) — Next.js приложение що hosts middleware і `[sdSlug]` маршрутизація
- [Web App Deployment](../deployment/web-apps) — як B1App це deployed к Vercel
