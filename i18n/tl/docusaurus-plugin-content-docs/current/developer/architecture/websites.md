---
title: "Website Routing & Multi-Site"
---

# Website Routing & Multi-Site

<div class="article-intro">

Ang isang simbahan ay maaaring maglingkod ng higit sa isang distinct website, at bawat isa ay maaaring mabuhay sa `*.b1.church` subdomain o sa isang ganap na custom, church-owned domain. Ang pahinang ito ay nagsasaad ng routing layer na nakaupo *sa ilalim* ng builder: kung paano ang incoming request ay nagresolba sa isang simbahan **at** sa isang specific site, ang multi-site data model (ang `siteId` sentinel na pinapanatili ang bawat pre-existing site na nag-render nang walang pagbabago), at ang custom-domain edge — isang self-managed Caddy proxy sa EC2 na nagtatapos TLS at nag-rewrite ng bawat church domain sa `*.b1.church` upstream nito. Para sa kung ano ang tunay na nag-render kapag ang request ay nagresolba — ang page/section/element tree — tingnan ang [Website Builder](./website-builder).

</div>

## Pangkalahatang-ideya

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies sa B1App              │
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
              │   threads ?siteId= sa bawat content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads ang domains table mismo sa pamamagit ng dalawang anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

Tatlong rules ang sumusuporta sa layer na ito:

1. **Isang sentinel ay pinapanatili ang lahat sa backward compatible.** Ang `siteId = ''` ay ang primary site. Bawat page, block, link, global-style, at domain row na umiiral bago ang feature na ito ay may `''` at nag-render eksaktong tulad ng ginawa nito. Ang *pangalawa* website ay simpleng isang set ng rows na may non-empty `siteId`, at anumang content endpoint na tinatawagan nang walang `?siteId=` ay nagbabalik ng primary site — byte-for-byte ang lumang request.
2. **Ang resolution ay host-label-based at nag-converge.** Ang `*.b1.church` subdomain ay nag-route sa host label nito nang direkta; ang custom domain ay ginagawang muli sa `{sub}.b1.church` label nito sa Caddy edge bago makita ng B1App (na may middleware DB lookup na nag-stamp ng `x-site` header bilang fallback para sa anumang raw custom `Host`). Pareho ang mga leg ay umaabot sa parehong `[sdSlug]` route at ang parehong `churches/lookup` call, kaya ang downstream rendering ay magkapareho.
3. **Ang Caddy edge ay stateless sa isang source ng truth.** Ang mga custom domains ay nagtatapos sa isang self-managed Caddy proxy sa EC2 na nag-rewrite ng bawat domain sa `{sub}.b1.church` upstream nito. Ang domain save ay nag-fire ng isang single best-effort `CaddyHelper.updateCaddy()`, at ang Caddy ay nag-read din ng `domains` table nang direkta (ang `authorize` at `hostmap` endpoints sa ibaba). Ang talahanayan ay authoritative — ang unreachable Caddy ay hindi maaaring kailanman mabigo ang save.

## Site resolution

### `*.b1.church` subdomains

Ang `B1App/next.config.mjs` ay nag-rewrite ng incoming requests sa host. Isang host rule na may pattern `(?<subdomain>.*?)\..*` ay kumukuha ng **first label** ng host at nag-rewrite ng `/` at `/:path*` sa `/{subdomain}` — ang `[sdSlug]` App-Router segment. Kaya `grace.b1.church/about` ay nagiging `/grace/about`.

Sa loob ng `src/app/[sdSlug]/`, ang `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) ay tumatawag sa `GET /membership/churches/lookup/?subDomain={sdSlug}`. Ang `ChurchController.getBySubDomain` response ay may dalawang branches ngayon:

| Slug matches | Response | Kahulugan |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primary site ng simbahang iyon |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Isang **secondary site** — ang controller ay bumabalik sa `sites`, nagresolba ng owning church, at nag-echo ng queried slug kasama ang extra `siteId` |

Ang extra `siteId` ay ang tanging bagay na nag-distinguish ng secondary-site request mula sa primary one; lahat ng iba sa pipeline ay ibinabahagi.

### Custom domains

Isang church-owned domain ay nagtatapos sa **Caddy edge** (detalyado sa ibaba), na nag-rewrite ng `Host` header sa site's `{sub}.b1.church` bago mag-proxy sa B1App. Kaya sa normal path ang B1App ay nakakatanggap ng *internal* `*.b1.church` host at nagresolba dito sa host label eksaktong tulad ng native subdomain — ang middleware's DB lookup ay hindi kailanman tumatakbo. Ang `src/middleware.ts` ay patuloy na tumatakbo sa bawat request, ngunit na may isa laging-on job at isang fallback:

1. **Palagi** — ito ay **nag-delete ng anumang client-supplied `x-site` header**. Ang header na ito ay spoofable rewrite input at ay only ever pinagkakatiwalaan kapag ang middleware mismo ay nag-set nito; ang pag-strip nito ay ang tunay na job ng middleware sa likod ng Caddy.
2. **Fallback, non-internal `Host` lamang** — para sa raw custom-domain `Host` na umaabot sa B1App *nang walang* Caddy's rewrite, ito ay tumatawag sa `GET /membership/domains/public/lookup/{host}` at, kung nagbabalik iyon ng `subDomain`, nag-set `x-site: {subDomain}.b1.church`. Sa likod ng Caddy ang branch na ito ay inert dahil ang `Host` ay `*.b1.church` na.

Ang mga internal hosts — `localhost`, `b1.church`, at ang suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — ay nag-skip ng lookup nang buo (sila ay naka-resolve na sa host-label rewrite, o ay preview/deploy hosts).

Ang lookup mismo (`DomainRepo.loadByName`) ay left-joins `domains → churches` at `domains → sites` at nagbabalik ng `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — ang subdomain ng assigned secondary site kung ang domain ay tumuturo sa isa, kung hindi ang church's. Ito ay tumutugma sa exact host muna; kung ang host na iyon ay nagsimula na may `www.` at nawala, ito ay sumusubok muli **minsan** laban sa bare apex.

Bumalik sa `next.config.mjs`, ang `x-site` rewrite rules ay inilagay **nang nangunguna** ang generic host rules, kaya sila ay nananalo. `x-site: grace.b1.church` → first label `grace` → `[sdSlug] = grace`, at mula doon ang resolution ay magkapareho sa subdomain path (parehong `churches/lookup`, parehong `siteId`).

:::info
Ang `x-site` header ay untrusted mula sa labas. Ang middleware ay unconditionally nag-strip ng anumang inbound `x-site` bago optionally nag-set ng sarili nito, at ang rewrite rules ay only ever nakikita ang middleware-set value — isang client ay hindi maaaring magpork sa sarili sa iba pang church's content sa pamamagitan ng pagpadala ng header.
:::

Dalawang operational details sa middleware:

- **Cache.** Ang bawat host's result (isang hit *o* isang confirmed miss — hindi kailanman ang network error) ay naka-cache para sa **10 minuto** sa isang in-memory `Map`, per serverless isolate.
- **Matcher.** Ang matcher ay deliberately nag-re-include ng `/sitemap.xml`, `/robots.txt`, at `/manifest.webmanifest`. Ang first pattern nito ay nag-exclude ng dotted paths, na kung hindi ay mahuhulog ang mga file; sila ay idinagdag pabalik upang ang custom domain's per-church SEO/PWA files ay makatanggap din ng `x-site` header.

### `siteId` threading

Ang `ConfigHelper` ay nag-imbak ng resolved `siteId` sa per-request `ConfigurationInterface` nito (memoized na may React `cache()`) at nag-append ng `?siteId=` sa content calls nito at ng page components — **conditionally**: ang empty `siteId` (isang primary-church subdomain) ay nag-omit ng parameter nang buo. Ang threaded endpoints ay ang page tree (`/content/pages/:id/tree`), ang public page list na ginagamit ng sitemap (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), nav links (`/content/links/church/:id`), at ang standalone footer block (`/content/blocks/public/footer/:id`). Sa normal render path ang footer ay umaabot sa loob ng page tree (sections na tagged `zone: "siteFooter"`), na na-fetch na gamit ang `siteId`, kaya walang un-scoped footer gap.

Ang member portal (B1App `mobile`) ay sinandig na nakaupo sa labas nito: `loadChurchAppearance.ts` ay nagresolba ng church sa pamamagit ng `churches/lookup` ngunit nagbabasa ng church-level `/settings/public/{id}` at hindi kailanman nag-thread ng `siteId` — ang portal ay church-wide sa v1 (tingnan sa ibaba).

## Maraming websites bawat simbahan

### Data model

Ang bagong `membership.sites` table ay sinandig na maliit:

| Column | Type | Mga Tala |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Owning church |
| `name` | `varchar(255)` | Display name (e.g. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** — global namespace (sa ibaba) |

Ang site scoping ay pagkatapos ay isang single nullable-free column na idinadagdag sa content at domain tables:

| Table (module) | Column | `''` means |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain ay nagsisilbi sa primary site |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primary site — at sa **`blocks`**, `''` additionally ay nangangahulugang *shared sa lahat ng sites* |

Dalawang migrations ay nagdadagdag ng lahat ng ito (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Dahil ang column ay nag-default sa `''`, bawat existing row ay nagpapanatili ng ngayon's behavior na walang backfill.

**Global subdomain namespace.** Ang `sites.subDomain` ay nagbabahagi ng *isang* namespace na may `churches.subDomain` — ang site subdomain ay hindi maaaring magsulong sa church subdomain o sa iba pang site's. Ito ay ipinapatupad sa **parehong** save paths: `SiteController.save` ay tinatanggihan ang slug na tumama sa `churches` o `sites`, at `ChurchController.validateSave` ay gumagawa ng parehong bagay sa reverse. Ang unique index sa `sites.subDomain` ay sinusuportahan ito sa database level.

**Pages uniqueness** ay lumawak mula sa `(churchId, url)` hanggang `(churchId, siteId, url)`, kaya dalawang sites ng isang simbahan ay maaaring bawat may sarili `/about`.

### Per-site content, na may fallbacks

Bawat site-scoped content **list/tree** endpoint ay tumatanggap ng optional `?siteId=` (wala ⇒ `''` = primary): pages tree / list / public, blocks list / by-type / footer, links (anon / filtered / all), at global styles. Ang mga section at elements ay *hindi* directly scoped — sila ay nag-inherit sa pamamagit ng parent page o block.

Dalawang resolution chains ay gumagawa ng interesting work:

- **Global styles — `site → primary → default`.** Ang `GlobalStyleRepo.loadForChurch(churchId, siteId)` ay nagbabalik ng site's sariling row; kung ang secondary site ay walang, ito ay nagbabalik ng **primary (`''`) row bilang-ay** (pinapanatili ang primary's `id`/`siteId`, na ginagamit ng client para sa copy-on-write); kung walang primary rin, ang `GlobalStyleController` ay nagbabalik ng isang hard-coded default palette/fonts.
- **Footer block — site-specific ay nanalo, shared ay bumabalik.** Ang `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` ay nagbabalik ng shared (`''`) *at* site-specific rows; ang resolver ay pumipili ng site's sariling footer kung present, kung hindi ang shared one. Ang parehong logic ay tumatakbo sa `TreeHelper.insertBlocks` (page tree) at sa standalone `/content/blocks/public/footer/:churchId` endpoint.

### Site deletion cascade

Ang `SiteController.delete` (gated sa membership Settings→Edit permission) ay naglalasap ng secondary site sa tatlong hakbang:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` ay nag-cascade ng lahat ng content na ang site ay nagmamay-ari: ang **pages** nito → kanilang sections, elements, `pageHistory`, at `posts`; ang sariling **blocks** nito → kanilang sections, elements, at `pageHistory`; ang **links** at **globalStyles** nito. Ang guard ay tumutanggi na tumatakbo para sa `''` — ang primary/shared sentinel ay hindi kailanman naka-cascade.
2. `DomainRepo.clearSiteId` ay **nag-reassign** ng site's domains pabalik sa primary (`siteId → ''`) sa halip na burahin sila, kaya ang custom domain ay nakaligtas sa site deletion.
3. Ang `sites` row ay binura at ang Caddy routes ay re-synced (best-effort).

### B1Admin surface

| Capability | Kung saan | Mechanism |
|-----------|-------|-----------|
| Site switcher | `useSiteSelection` + `SiteSwitcher` (empty = "Main Website") | Nagbabasa ng `?site=` URL param at nag-thread dito bilang `?siteId=` sa ContentApi calls. Naroroon sa tatlong Site **list** areas — **Pages**, **Blocks**, **Appearance** — ngunit *hindi* ang page/block editors, na may `siteId` sa record |
| Sites create/delete | `SitesDialog`, binuka mula sa switcher's "Manage websites…" entry | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). Gated sa membership Settings→Edit permission (`Permissions.settings.edit` server-side; `Permissions.membershipApi.settings.edit` sa B1Admin). **Create/delete lamang — walang rename UI sa v1** |
| Per-domain site assignment | `DomainSettingsEdit` sa ilalim ng Settings→Domains | Isang per-row site dropdown ay nagpadala ng `siteId` bawat domain sa `/membership/domains`. Ang column ay nagtago kung ang API ay nagbabalik ng walang sites (mas luma backend) |
| Copy-on-write styles | `StylesManager.prepareForSave` | Kapag ang loaded global-style row's `siteId` ay hindi tumutugma sa selected site (i.e. ang API ay nagbabalik ng inherited primary bilang fallback), ito ay bumubuo ng primary's `id` at nag-stamp ng current `siteId`, na nagpipigil ng **insert** ng bagong site-specific row sa halip na ma-overwrite ang primary. Ang parehong fork-on-mismatch ay nag-apply sa site footer block |

:::info
**Kung ano ang nanatiling church-wide sa v1 (isang sinandig na scoping choice, hindi isang data-model limit):** ang **blog** (`BlogPage` ay walang switcher at nag-load ng `/posts` na walang `siteId`), ang **site widgets** (announcement banner + launcher), **redirects**, ang **logo / GA4 / church settings**, at ang **member portal** (B1App mobile). Tandaan ito ay *hindi* "lahat ng Appearance" — ang secondary site's global styles (palette, fonts, typography, spacing, nav, custom CSS) **ay** per-site sa pamamagit ng copy-on-write path sa itaas; lamang ang banner/launcher/redirects/logo sub-panels ng Appearance page ay nanatiling church-wide.
:::

## Mga Custom domains: Caddy edge (static-config plan)

:::info
**Direction na na-revise 2026-07-02.** Ang isang mas maaga na plan na ilipat ang custom-domain hosting sa Vercel-managed domains ay **kinansela**, at lahat ng Vercel domain-registration code (`VercelHelper`, ang `vercelToken`/`vercelProjectId`/`vercelTeamId` env vars nito, SSM params, at health entries) ay inalis mula sa Api. Ang self-managed **Caddy proxy sa EC2 ay nanatili** bilang ang permanent custom-domain edge. Ang tanging natitirang work ay internal: pag-swap ng Caddy's *runtime* admin-API configuration para sa *static* config na nakakaligtas sa restarts.
:::

### Ang edge

Bawat custom church domain ay tumuturo DNS sa isang EC2 box — `3.23.251.61`, na maaabot din bilang `proxy.b1.church`. Ang B1Admin's Settings→Domains screen ay nag-instruct sa mga simbahan na magdagdag ng apex `A → 3.23.251.61` o isang `CNAME → proxy.b1.church`. Ang Caddy ay nagtatapos TLS na may per-domain Let's Encrypt cert, nag-rewrite ng `Host` header sa domain's `{sub}.b1.church` upstream, at reverse-proxies sa B1App — na pagkatapos ay nag-route dito sa host label tulad ng anumang native subdomain (tingnan ang [Custom domains](#custom-domains) sa itaas).

Ang upstream mapping ay nagmula sa `DomainRepo.loadPairs`, na ang dial ay **COALESCEs ang assigned site's subdomain** kaya ang domain ay nag-proxy sa tamang *secondary* site, na bumababa sa primary ng church:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Ang `www.*` rows ay hindi kasama sa map; ang Caddy ay nagsisilbi ng `www.{host}` sa pamamagit ng isang `302` redirect sa apex sa halip.

### Dalawang anonymous endpoints ay nag-feed sa edge

Ang `DomainController` ay nag-expose ng dalawang unauthenticated, read-only endpoints na ang box ay kumikita nang direkta — anonymous sa pangangailangan, dahil ang edge ay nag-query sa kanila bago ang anumang church context ay umiiral:

| Endpoint | Nagbabalik | Papel |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` kung ang domain — o, para sa `www.` miss, ang bare apex nito — ay umiiral sa `domains`; `404` kung hindi (kasama ang empty `domain`) | Ang Caddy's **on-demand-TLS `ask`**: ang abuse control na nagdedesisyon kung magbibigay ng cert para sa incoming SNI |
| `GET /membership/domains/hostmap` | `text/plain`, isang sorted `{domain} {sub}.b1.church` line bawat routable domain | Ang host→upstream map file na ang box ay nag-refresh sa timer |

Ang `authorize` ay ginagamit muli ang `DomainRepo.loadByName` (exact host, pagkatapos isang single `www.`→apex retry); ang `hostmap` ay ginagamit muli ang `loadPairs` — kaya ito ay site-aware at `www.*`-excluded, magkapareho sa proxy routes — at simpleng nag-strip ng `:443` suffix.

### Domain save/delete — isang best-effort push

Ang `DomainController.save` ay nagsusulat ng `domains` rows at pagkatapos ay gumagawa ng **isang best-effort** `CaddyHelper.updateCaddy()` call, na na-wrap sa `try/catch` na nag-log (`console.error`) at nag-swallow; ang `delete` ay gumagawa ng parehong (na nag-fix din ng prior stale-route-on-delete bug), tulad ng secondary-site deletion (`SiteController.delete`). Ang `updateCaddy` mismo ay limited ng **10s** Axios timeout, kaya ang unreachable o stopped Caddy ay hindi maaaring `500` ang domain save — ang `domains` table ay ang source ng truth.

### Current state — static config, walang runtime state

Ang box (Windows EC2 sa likod ng permanent Elastic IP) ay tumatakbo ng Caddy mula sa **static Caddyfile**: on-demand TLS na ang `ask` ay tumuturo sa `/membership/domains/authorize`, kasama ang host→upstream map file na nag-refresh bawat 5 minuto mula sa `/membership/domains/hostmap` ng scheduled task na nagtatapos sa graceful `caddy reload`. Ang config ay nakakaligtas sa restarts na walang runtime state — walang re-priming dance — at ang unknown SNI ay **TLS-refused** (walang cert na na-mint para sa host na `authorize` ay tinatanggihan), habang ang authorized-but-not-yet-mapped host (isang brand-new domain sa loob ng sync window) ay nakakakuha ng clean 404. Ang mga bagong domain ay nagiging routable sa loob ng ~5 minuto ng save; ang kanilang certificates ay na-mint sa first hit. Build/setup, operations, at field-tested gotchas: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legacy runtime push — rollback path, pending deletion

Ang `CaddyHelper` (membership module) ay maaaring pa ring mag-drive ng Caddy sa pamamagit ng **admin API** nito sa `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op kapag wala; naitampok sa ilalim ng `ServerHealthController`'s Integrations group): ang `updateCaddy()` ay nag-PATCH ng full routes array, at ang `initializeCaddy()` + ang `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` endpoints ay muling bubuo ng runtime-configured server mula sa simula. Ang config ng mode na iyon ay nabuhay lamang sa Caddy's memory — ang restart-amnesia na ang architecture na ito ay pinalitan. Ang machinery ay nananatili lamang bilang ang rollback path at naka-schedule para sa deletion kapag ang static box ay maging stable na; ang best-effort `updateCaddy()` push sa domain save/delete ay isang harmless no-op laban sa static box (ang admin API nito ay localhost-only).

## Mga Kaugnay na Pahina

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — ang edge box mismo: fresh-box setup, WinSW service, map sync task, at operational gotchas
