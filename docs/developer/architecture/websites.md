---
title: "Website Routing & Multi-Site"
---

# Website Routing & Multi-Site

<div class="article-intro">

A single church can now serve more than one distinct website, and each one can live on a `*.b1.church` subdomain or on a fully custom, church-owned domain. This page maps the routing layer that sits *underneath* the builder: how an incoming request resolves to a church **and** to a specific site, the multi-site data model (the `siteId` sentinel that keeps every pre-existing site rendering unchanged), and the custom-domain edge — a self-managed Caddy proxy on EC2 that terminates TLS and rewrites each church domain onto its `*.b1.church` upstream. For what actually renders once a request has resolved — the page/section/element tree — see [Website Builder](./website-builder).

</div>

## Overview

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

Three rules hold across this layer:

1. **A sentinel keeps everything backward compatible.** `siteId = ''` is the primary site. Every page, block, link, global-style, and domain row that existed before this feature carries `''` and renders exactly as it did. A *second* website is simply a set of rows with a non-empty `siteId`, and any content endpoint called without `?siteId=` returns the primary site — byte-for-byte the old request.
2. **Resolution is host-label-based and converges.** A `*.b1.church` subdomain routes by its host label directly; a custom domain is rewritten to its `{sub}.b1.church` label at the Caddy edge before B1App sees it (with a middleware DB lookup that stamps an `x-site` header as the fallback for any raw custom `Host`). Both legs land on the same `[sdSlug]` route and the same `churches/lookup` call, so downstream rendering is identical.
3. **The Caddy edge is stateless over one source of truth.** Custom domains terminate at a self-managed Caddy proxy on EC2 that rewrites each domain onto its `{sub}.b1.church` upstream. A domain save fires a single best-effort `CaddyHelper.updateCaddy()`, and Caddy also reads the `domains` table directly (the `authorize` and `hostmap` endpoints below). The table is authoritative — an unreachable Caddy can never fail a save.

## Site resolution

### `*.b1.church` subdomains

`B1App/next.config.mjs` rewrites incoming requests by host. A host rule with the pattern `(?<subdomain>.*?)\..*` captures the **first label** of the host and rewrites `/` and `/:path*` into `/{subdomain}` — the `[sdSlug]` App-Router segment. So `grace.b1.church/about` becomes `/grace/about`.

Inside `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) calls `GET /membership/churches/lookup/?subDomain={sdSlug}`. The `ChurchController.getBySubDomain` response now has two branches:

| Slug matches | Response | Meaning |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primary site of that church |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | A **secondary site** — the controller falls back to `sites`, resolves the owning church, and echoes the queried slug plus the extra `siteId` |

That extra `siteId` is the only thing that distinguishes a secondary-site request from a primary one; everything else in the pipeline is shared.

### Custom domains

A church-owned domain terminates at the **Caddy edge** (detailed below), which rewrites the `Host` header to the site's `{sub}.b1.church` before proxying to B1App. So on the normal path B1App receives an *internal* `*.b1.church` host and resolves it by host label exactly like a native subdomain — the middleware's DB lookup never fires. `src/middleware.ts` still runs on every request, but with one always-on job and one fallback:

1. **Always** — it **deletes any client-supplied `x-site` header**. That header is spoofable rewrite input and is only ever trusted when the middleware itself sets it; stripping it is the middleware's real job behind Caddy.
2. **Fallback, non-internal `Host` only** — for a raw custom-domain `Host` that reaches B1App *without* Caddy's rewrite, it calls `GET /membership/domains/public/lookup/{host}` and, if that returns a `subDomain`, sets `x-site: {subDomain}.b1.church`. Behind Caddy this branch is inert because the `Host` is already `*.b1.church`.

Internal hosts — `localhost`, `b1.church`, and the suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — skip the lookup entirely (they are already resolved by the host-label rewrite, or are preview/deploy hosts).

The lookup itself (`DomainRepo.loadByName`) left-joins `domains → churches` and `domains → sites` and returns `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — the assigned secondary site's subdomain if the domain points at one, otherwise the church's. It matches the exact host first; if that host began with `www.` and missed, it retries **once** against the bare apex.

Back in `next.config.mjs`, the `x-site` rewrite rules are placed **ahead of** the generic host rules, so they win. `x-site: grace.b1.church` → first label `grace` → `[sdSlug] = grace`, and from there resolution is identical to the subdomain path (same `churches/lookup`, same `siteId`).

:::info
The `x-site` header is untrusted from the outside. The middleware unconditionally strips any inbound `x-site` before optionally setting its own, and the rewrite rules only ever see the middleware-set value — a client cannot force itself onto another church's content by sending a header.
:::

Two operational details on the middleware:

- **Cache.** Each host's result (a hit *or* a confirmed miss — never a network error) is cached for **10 minutes** in an in-memory `Map`, per serverless isolate.
- **Matcher.** The matcher deliberately re-includes `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest`. Its first pattern excludes dotted paths, which would otherwise drop those files; they are added back so a custom domain's per-church SEO/PWA files also receive the `x-site` header.

### `siteId` threading

`ConfigHelper` stores the resolved `siteId` on its per-request `ConfigurationInterface` (memoized with React `cache()`) and appends `?siteId=` to the content calls it and the page components make — **conditionally**: an empty `siteId` (a primary-church subdomain) omits the parameter altogether. The threaded endpoints are the page tree (`/content/pages/:id/tree`), the public page list used by the sitemap (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), nav links (`/content/links/church/:id`), and the standalone footer block (`/content/blocks/public/footer/:id`). On the normal render path the footer arrives inside the page tree (sections tagged `zone: "siteFooter"`), already fetched with `siteId`, so there is no un-scoped footer gap.

The member portal (B1App `mobile`) intentionally sits outside this: `loadChurchAppearance.ts` resolves the church via `churches/lookup` but reads church-level `/settings/public/{id}` and never threads `siteId` — the portal is church-wide in v1 (see below).

## Multiple websites per church

### Data model

The new `membership.sites` table is deliberately tiny:

| Column | Type | Notes |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Owning church |
| `name` | `varchar(255)` | Display name (e.g. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** — global namespace (below) |

Site scoping is then a single nullable-free column added to the content and domain tables:

| Table (module) | Column | `''` means |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain serves the primary site |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primary site — and on **`blocks`**, `''` additionally means *shared across all sites* |

Two migrations add all of this (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Because the column defaults to `''`, every existing row keeps today's behavior with no backfill.

**Global subdomain namespace.** `sites.subDomain` shares *one* namespace with `churches.subDomain` — a site subdomain can never collide with a church subdomain or another site's. This is enforced on **both** save paths: `SiteController.save` rejects a slug that hits either `churches` or `sites`, and `ChurchController.validateSave` does the same in reverse. A unique index on `sites.subDomain` backs it at the database level.

**Pages uniqueness** widened from `(churchId, url)` to `(churchId, siteId, url)`, so two sites of one church can each own their own `/about`.

### Per-site content, with fallbacks

Every site-scoped content **list/tree** endpoint takes an optional `?siteId=` (absent ⇒ `''` = primary): pages tree / list / public, blocks list / by-type / footer, links (anon / filtered / all), and global styles. Sections and elements are *not* scoped directly — they inherit through their parent page or block.

Two resolution chains do the interesting work:

- **Global styles — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returns the site's own row; if a secondary site has none, it returns the **primary (`''`) row as-is** (keeping the primary's `id`/`siteId`, which the client uses to copy-on-write); if there is no primary either, `GlobalStyleController` returns a hard-coded default palette/fonts. 
- **Footer block — site-specific wins, shared falls back.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returns the shared (`''`) *and* site-specific rows; the resolver picks the site's own footer if present, else the shared one. The same logic runs both in `TreeHelper.insertBlocks` (page tree) and in the standalone `/content/blocks/public/footer/:churchId` endpoint.

### Site deletion cascade

`SiteController.delete` (gated on the membership Settings→Edit permission) tears a secondary site down in three steps:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` cascades all content the site owns: its **pages** → their sections, elements, `pageHistory`, and `posts`; its own **blocks** → their sections, elements, and `pageHistory`; its **links** and **globalStyles**. A guard refuses to run for `''` — the primary/shared sentinel is never cascaded.
2. `DomainRepo.clearSiteId` **reassigns** the site's domains back to the primary (`siteId → ''`) rather than deleting them, so a custom domain survives a site deletion.
3. The `sites` row is deleted and Caddy routes are re-synced (best-effort).

### B1Admin surface

| Capability | Where | Mechanism |
|-----------|-------|-----------|
| Site switcher | `useSiteSelection` + `SiteSwitcher` (empty = "Main Website") | Reads a `?site=` URL param and threads it as `?siteId=` into ContentApi calls. Present on the three Site **list** areas — **Pages**, **Blocks**, **Appearance** — but *not* the page/block editors, which carry `siteId` on the record |
| Sites create/delete | `SitesDialog`, opened from the switcher's "Manage websites…" entry | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). Gated on the membership Settings→Edit permission (`Permissions.settings.edit` server-side; `Permissions.membershipApi.settings.edit` in B1Admin). **Create/delete only — there is no rename UI in v1** |
| Per-domain site assignment | `DomainSettingsEdit` under Settings→Domains | A per-row site dropdown posts `siteId` per domain to `/membership/domains`. The column hides if the API returns no sites (older backend) |
| Copy-on-write styles | `StylesManager.prepareForSave` | When the loaded global-style row's `siteId` doesn't match the selected site (i.e. the API returned the inherited primary as a fallback), it drops the primary's `id` and stamps the current `siteId`, forcing an **insert** of a new site-specific row instead of overwriting the primary. The same fork-on-mismatch applies to the site footer block |

:::info
**What stays church-wide in v1 (a deliberate scoping choice, not a data-model limit):** the **blog** (`BlogPage` has no switcher and loads `/posts` with no `siteId`), the **site widgets** (announcement banner + launcher), **redirects**, the **logo / GA4 / church settings**, and the **member portal** (B1App mobile). Note this is *not* "all of Appearance" — a secondary site's global styles (palette, fonts, typography, spacing, nav, custom CSS) **are** per-site via the copy-on-write path above; only the banner/launcher/redirects/logo sub-panels of the Appearance page remain church-wide.
:::

## Custom domains: Caddy edge (static-config plan)

:::info
**Direction revised 2026-07-02.** An earlier plan to move custom-domain hosting onto Vercel-managed domains was **cancelled**, and all Vercel domain-registration code (`VercelHelper`, its `vercelToken`/`vercelProjectId`/`vercelTeamId` env vars, SSM params, and health entries) was removed from the Api. The self-managed **Caddy proxy on EC2 stays** as the permanent custom-domain edge. The only remaining work is internal: swapping Caddy's *runtime* admin-API configuration for a *static* config that survives restarts.
:::

### The edge

Every custom church domain points DNS at one EC2 box — `3.23.251.61`, also reachable as `proxy.b1.church`. B1Admin's Settings→Domains screen instructs churches to add an apex `A → 3.23.251.61` or a `CNAME → proxy.b1.church`. Caddy terminates TLS with a per-domain Let's Encrypt cert, rewrites the `Host` header to the domain's `{sub}.b1.church` upstream, and reverse-proxies to B1App — which then routes it by host label like any native subdomain (see [Custom domains](#custom-domains) above).

The upstream mapping comes from `DomainRepo.loadPairs`, whose dial **COALESCEs the assigned site's subdomain** so a domain proxies to the correct *secondary* site, falling back to the church's primary:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` rows are excluded from the map; Caddy serves `www.{host}` via a `302` redirect to the apex instead.

### Two anonymous endpoints feed the edge

`DomainController` exposes two unauthenticated, read-only endpoints the box consumes directly — anonymous by necessity, since the edge queries them before any church context exists:

| Endpoint | Returns | Role |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` if the domain — or, for a `www.` miss, its bare apex — exists in `domains`; `404` otherwise (including an empty `domain`) | Caddy's **on-demand-TLS `ask`**: the abuse control deciding whether to issue a cert for an incoming SNI |
| `GET /membership/domains/hostmap` | `text/plain`, one sorted `{domain} {sub}.b1.church` line per routable domain | The host→upstream map file the box refreshes on a timer |

`authorize` reuses `DomainRepo.loadByName` (exact host, then a single `www.`→apex retry); `hostmap` reuses `loadPairs` — so it is site-aware and `www.*`-excluded, identical to the proxy routes — and just strips the `:443` suffix.

### Domain save/delete — one best-effort push

`DomainController.save` writes the `domains` rows and then makes a **single best-effort** `CaddyHelper.updateCaddy()` call, wrapped in a `try/catch` that logs (`console.error`) and swallows; `delete` does the same (which also fixed a prior stale-route-on-delete bug), as does secondary-site deletion (`SiteController.delete`). `updateCaddy` is itself bounded by a **10s** Axios timeout, so an unreachable or stopped Caddy can never `500` a domain save — the `domains` table is the source of truth.

### Current state — runtime admin-API config

`CaddyHelper` (membership module) drives Caddy through its **admin API** at `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort` → `CADDY_HOST`/`CADDY_PORT`; the production `caddyHost` is `3.23.251.61`; a no-op when unset, and surfaced under `ServerHealthController`'s Integrations group). `updateCaddy()` PATCHes the whole routes array on every save; `initializeCaddy()` (re-)creates the S3 cert storage, the ACME/TLS policy, and the `:443` proxy / `:80` redirect servers. The catch: that config lives only in Caddy's memory, so **after a restart the box must be re-primed** — hit `GET /membership/domains/caddy/init` then `GET /membership/domains/caddy` to rebuild storage/servers and re-sync routes. Those two endpoints exist for exactly this dance.

### Planned swap — static config, no runtime state

The planned change (ops runbook lives in the workspace notes at `.notes/fableTodo/caddy.md`, not this repo) drops the admin-API push for a **static Caddyfile**: on-demand TLS whose `ask` points at `/membership/domains/authorize`, plus a host→upstream map file refreshed every 5 minutes from `/membership/domains/hostmap` by a systemd timer that ends in a graceful `caddy reload`. Config then survives restarts with zero runtime state, the init/re-sync dance disappears, and the `updateCaddy()` push — and `CaddyHelper` itself — becomes deletable.

## Related Pages

- [Website Builder](./website-builder) — the page/section/element tree, renderers, blog, SEO, and AI generation (what renders once a request has resolved to a church/site)
- [Content Endpoints](../api/endpoints/content) — the REST surface for pages, blocks, links, and global styles, all now `?siteId=`-aware
- [B1App](../web-apps/b1-app) — the Next.js app that hosts the middleware and `[sdSlug]` routing
- [Web App Deployment](../deployment/web-apps) — how B1App is deployed to Vercel
