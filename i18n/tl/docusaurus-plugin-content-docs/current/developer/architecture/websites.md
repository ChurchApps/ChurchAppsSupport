---
title: "Website Routing at Multi-Site"
---

# Website Routing at Multi-Site

<div class="article-intro">

Ang isang simbahan ay maaari nang magpatakbo ng higit sa isang magkakaibang website, at ang bawat isa ay maaaring nasa `*.b1.church` subdomain o sa ganap na custom na domain na pag-aari ng simbahan. Inilalarawan ng pahinang ito ang routing layer na nasa *ilalim* ng builder: kung paano nareresolba ang papasok na request sa isang simbahan **at** sa isang tiyak na site, ang multi-site data model (ang `siteId` sentinel na nagpapanatili sa lahat ng dati nang site na gumagana nang walang pagbabago), at ang custom-domain edge — isang self-managed na Caddy proxy sa EC2 na nagtatapos ng TLS at nagre-rewrite ng domain ng bawat simbahan papunta sa `*.b1.church` upstream nito. Para sa kung ano talaga ang nire-render kapag nareresolba na ang request — ang page/section/element tree — tingnan ang [Website Builder](./website-builder).

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

Tatlong tuntunin ang umiiral sa buong layer na ito:

1. **Pinapanatili ng isang sentinel ang backward compatibility.** Ang `siteId = ''` ay ang primary site. Bawat page, block, link, global-style, at domain row na umiiral bago ang feature na ito ay may `''` at nagre-render nang eksakto tulad ng dati. Ang *pangalawang* website ay simpleng set ng mga row na may hindi walang lamang `siteId`, at anumang content endpoint na tinawag nang walang `?siteId=` ay nagbabalik ng primary site — byte-for-byte ang lumang request.
2. **Ang resolution ay nakabatay sa host label at nagtatagpo.** Ang `*.b1.church` subdomain ay dumadaan sa host label nito mismo; ang custom domain ay nire-rewrite sa `{sub}.b1.church` label nito sa Caddy edge bago ito makita ng B1App (na may DB lookup sa middleware na naglalagay ng `x-site` header bilang fallback para sa anumang raw na custom `Host`). Parehong napupunta ang dalawang landas sa iisang `[sdSlug]` route at iisang `churches/lookup` call, kaya magkapareho ang downstream rendering.
3. **Ang Caddy edge ay stateless sa ibabaw ng iisang source of truth.** Ang mga custom domain ay nagtatapos sa isang self-managed na Caddy proxy sa EC2 na nagre-rewrite ng bawat domain papunta sa `{sub}.b1.church` upstream nito. Ang pag-save ng domain ay nagti-trigger ng isang best-effort na `CaddyHelper.updateCaddy()`, at binabasa rin ng Caddy ang `domains` table nang direkta (ang mga `authorize` at `hostmap` endpoint sa ibaba). Ang table ang batayan — ang hindi maabot na Caddy ay hindi kailanman magpapabagsak ng pag-save.

## Site resolution

### Mga `*.b1.church` subdomain

Ang `B1App/next.config.mjs` ay nagre-rewrite ng mga papasok na request ayon sa host. Ang host rule na may pattern na `(?<subdomain>.*?)\..*` ay kumukuha ng **unang label** ng host at nire-rewrite ang `/` at `/:path*` papuntang `/{subdomain}` — ang `[sdSlug]` App-Router segment. Kaya ang `grace.b1.church/about` ay nagiging `/grace/about`.

Sa loob ng `src/app/[sdSlug]/`, ang `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) ay tumatawag sa `GET /membership/churches/lookup/?subDomain={sdSlug}`. Ang response ng `ChurchController.getBySubDomain` ay may dalawang sangay na ngayon:

| Tumutugma ang slug sa | Response | Kahulugan |
|-----------------------|----------|-----------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primary site ng simbahang iyon |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Isang **secondary site** — bumabalik ang controller sa `sites`, nireresolba ang may-ari na simbahan, at inuulit ang tinanong na slug kasama ang karagdagang `siteId` |

Ang karagdagang `siteId` na iyon lang ang nagpapaiba sa request ng secondary site mula sa primary; lahat ng iba sa pipeline ay pinagsasaluhan.

### Mga custom domain

Ang domain na pag-aari ng simbahan ay nagtatapos sa **Caddy edge** (ipinapaliwanag sa ibaba), na nagre-rewrite ng `Host` header papunta sa `{sub}.b1.church` ng site bago mag-proxy sa B1App. Kaya sa normal na landas, ang B1App ay tumatanggap ng *internal* na `*.b1.church` host at nireresolba ito ayon sa host label tulad ng katutubong subdomain — hindi kailanman tumatakbo ang DB lookup ng middleware. Ang `src/middleware.ts` ay tumatakbo pa rin sa bawat request, pero may isang laging-aktibong gawain at isang fallback:

1. **Palagi** — **binubura nito ang anumang `x-site` header na galing sa client**. Ang header na iyon ay madaling pekein na rewrite input at pinagkakatiwalaan lang kapag ang middleware mismo ang nagtakda nito; ang pag-alis dito ang tunay na trabaho ng middleware sa likod ng Caddy.
2. **Fallback, para lang sa hindi-internal na `Host`** — para sa raw na custom-domain na `Host` na umabot sa B1App *nang walang* rewrite ng Caddy, tinatawag nito ang `GET /membership/domains/public/lookup/{host}` at, kung magbalik iyon ng `subDomain`, itatakda ang `x-site: {subDomain}.b1.church`. Sa likod ng Caddy, hindi aktibo ang sangay na ito dahil ang `Host` ay `*.b1.church` na.

Ang mga internal host — `localhost`, `b1.church`, at ang mga suffix na `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — ay lubusang lumalaktaw sa lookup (nareresolba na sila ng host-label rewrite, o mga preview/deploy host).

Ang lookup mismo (`DomainRepo.loadByName`) ay nag-left-join ng `domains → churches` at `domains → sites` at nagbabalik ng `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — ang subdomain ng itinalagang secondary site kung ang domain ay nakaturo sa isa, kung hindi ay ang sa simbahan. Tinutugma muna nito ang eksaktong host; kung ang host na iyon ay nagsimula sa `www.` at hindi nakita, susubukan itong **minsan** pa laban sa hubad na apex.

Pabalik sa `next.config.mjs`, ang mga `x-site` rewrite rule ay inilalagay **bago** ang mga generic host rule, kaya sila ang nananaig. Ang `x-site: grace.b1.church` → unang label na `grace` → `[sdSlug] = grace`, at mula roon ang resolution ay kapareho ng subdomain path (parehong `churches/lookup`, parehong `siteId`).

:::info
Ang `x-site` header ay hindi pinagkakatiwalaan mula sa labas. Walang kondisyong inaalis ng middleware ang anumang papasok na `x-site` bago opsyonal na itakda ang sarili nito, at ang mga rewrite rule ay nakakakita lang ng halagang itinakda ng middleware — hindi maipipilit ng client ang sarili sa nilalaman ng ibang simbahan sa pamamagitan ng pagpapadala ng header.
:::

Dalawang detalye sa operasyon ng middleware:

- **Cache.** Ang resulta ng bawat host (hit *o* kumpirmadong miss — hindi kailanman network error) ay kina-cache nang **10 minuto** sa in-memory na `Map`, bawat serverless isolate.
- **Matcher.** Sadyang isinasama muli ng matcher ang `/sitemap.xml`, `/robots.txt`, at `/manifest.webmanifest`. Ang unang pattern nito ay nag-e-exclude ng mga path na may tuldok, na kung hindi ay mag-aalis sa mga file na iyon; idinadagdag silang muli para ang per-church SEO/PWA file ng custom domain ay makatanggap din ng `x-site` header.
- **Canonical header.** Para sa mga pahina ng simbahan, nagdaragdag ang middleware ng `Link: <{proto}://{host}{path}>; rel="canonical"` na response header na nagpapangalan sa host kung saan talaga inihain ang pahina — subdomain o custom domain (`helpers/canonicalLink.ts`). Nilalaktawan ito sa mga host na hindi pang-simbahan (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) at sa `/mobile`, `/login`, `/logout`, at sa mga nabuong robots/sitemap/manifest file.

### Naka-disable na pampublikong website

Maaaring i-on ng simbahan ang **Disable Public Website** sa B1Admin (church-level na content setting na `hidePublicSite = "true"`). Ang site ay maghahain na lamang ng mga route na para sa mga miyembro:

- **B1App middleware** ay hinahanap ang subdomain (`/membership/churches/lookup` at pagkatapos ay `/content/settings/public/:churchId`) at nire-redirect ang mga anonymous na request para sa anumang path sa labas ng allowlist papunta sa `/login?returnUrl={path}{query}`. Ang allowlist (`helpers/publicSite.ts`) ay `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, at ang mga manifest/robots/sitemap file. Ang mga kumpirmadong sagot lang ang kina-cache (60 segundo sa production, dahil hindi mabubura ng revalidate call ng admin ang per-instance na map na ito; walang cache sa dev/test). Ang API error ay naghahain ng site sa halip na i-lock out ang lahat.
- **Nakikita ng mga naka-sign-in na miyembro ang buong site.** Ang request na may dalang hindi pa nag-e-expire na `jwt` cookie (binabasa ng `hasSession()` ng middleware ang `exp` ng payload nang hindi bine-verify ang signature -- ito ay malambot na gate, hindi access control) ay lumalaktaw sa redirect, kaya pagkatapos mag-login, ang miyembro ay bumabalik sa pahinang hiniling niya at nakikita ang mga normal na pahina, built-in na pahina (Groups, Sermons, atbp.), at header navigation. Hindi na sinusuri ng mga page component at ng `Header` ang `hidePublicSite` mismo.
- Ang **`robots.txt`** ay nagbabawal sa lahat, tulad sa mga noindex host.
- **API.** Ang `GET /content/pages/public/:churchId` (ang listahan ng pahina ng sitemap) ay nagbabalik ng `[]`, kaya hindi mailista ng mga anonymous na caller ang mga pahina.

### Pagpapasa ng `siteId`

Iniimbak ng `ConfigHelper` ang nareresolbang `siteId` sa per-request nitong `ConfigurationInterface` (naka-memoize gamit ang React `cache()`) at idinadagdag ang `?siteId=` sa mga content call na ginagawa nito at ng mga page component — **nang may kondisyon**: ang walang lamang `siteId` (subdomain ng primary na simbahan) ay lubusang nag-aalis ng parameter. Ang mga endpoint na pinapasahan ay ang page tree (`/content/pages/:id/tree`), ang pampublikong listahan ng pahina na ginagamit ng sitemap (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), nav links (`/content/links/church/:id`), at ang standalone na footer block (`/content/blocks/public/footer/:id`). Sa normal na render path, ang footer ay dumarating sa loob ng page tree (mga section na may tag na `zone: "siteFooter"`), na nakuha na gamit ang `siteId`, kaya walang un-scoped na puwang sa footer.

Ang member portal (B1App `mobile`) ay sadyang nasa labas nito: ang `loadChurchAppearance.ts` ay nagreresolba ng simbahan sa pamamagitan ng `churches/lookup` pero binabasa ang church-level na `/settings/public/{id}` at hindi kailanman nagpapasa ng `siteId` — ang portal ay sakop ang buong simbahan sa v1 (tingnan sa ibaba).

## Maraming website bawat simbahan

### Data model

Ang bagong `membership.sites` table ay sadyang napakaliit:

| Column | Uri | Mga tala |
|--------|-----|----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Simbahang may-ari |
| `name` | `varchar(255)` | Display name (hal. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** — global na namespace (sa ibaba) |

Ang site scoping ay isang column na hindi nullable na idinagdag sa mga content at domain table:

| Table (module) | Column | Ang ibig sabihin ng `''` |
|----------------|--------|--------------------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Ang domain ay naghahain ng primary site |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primary site — at sa **`blocks`**, ang `''` ay nangangahulugan din ng *ibinabahagi sa lahat ng site* |

Dalawang migration ang nagdaragdag ng lahat ng ito (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Dahil ang default ng column ay `''`, ang bawat umiiral na row ay nagpapanatili ng gawi ngayon nang walang backfill.

**Global na subdomain namespace.** Ang `sites.subDomain` ay nagbabahagi ng *iisang* namespace sa `churches.subDomain` — ang subdomain ng site ay hindi kailanman makakabanggaan ng subdomain ng simbahan o ng ibang site. Ipinapatupad ito sa **parehong** save path: tinatanggihan ng `SiteController.save` ang slug na tumatama sa alinman sa `churches` o `sites`, at ganoon din ang ginagawa ng `ChurchController.validateSave` sa kabaligtaran. Sinusuportahan ito ng unique index sa `sites.subDomain` sa antas ng database.

Ang **Pages uniqueness** ay pinalawak mula `(churchId, url)` tungong `(churchId, siteId, url)`, kaya ang dalawang site ng iisang simbahan ay maaaring magkaroon ng kani-kanilang `/about`.

### Nilalaman bawat site, na may mga fallback

Bawat site-scoped na content **list/tree** endpoint ay tumatanggap ng opsyonal na `?siteId=` (wala ⇒ `''` = primary): pages tree / list / public, blocks list / by-type / footer, links (anon / filtered / all), at global styles. Ang mga section at element ay *hindi* direktang naka-scope — minamana nila ito sa pamamagitan ng kanilang parent page o block.

Dalawang resolution chain ang gumagawa ng kawili-wiling trabaho:

- **Global styles — `site → primary → default`.** Ang `GlobalStyleRepo.loadForChurch(churchId, siteId)` ay nagbabalik ng sariling row ng site; kung walang taglay ang secondary site, ibinabalik nito ang **primary (`''`) row nang buo** (pinapanatili ang `id`/`siteId` ng primary, na ginagamit ng client para sa copy-on-write); kung wala ring primary, ang `GlobalStyleController` ay nagbabalik ng hard-coded na default na palette/fonts.
- **Footer block — nananaig ang site-specific, fallback ang shared.** Ang `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` ay nagbabalik ng parehong shared (`''`) *at* site-specific na row; pinipili ng resolver ang sariling footer ng site kung mayroon, kung hindi ay ang shared. Parehong logic ang tumatakbo sa `TreeHelper.insertBlocks` (page tree) at sa standalone na `/content/blocks/public/footer/:churchId` endpoint.

### Cascade sa pagbura ng site

Ang `SiteController.delete` (naka-gate sa membership Settings→Edit permission) ay winawasak ang secondary site sa tatlong hakbang:

1. Ang `ContentModuleGateway.deleteSiteContent(churchId, siteId)` ay nagka-cascade ng lahat ng content na pag-aari ng site: ang mga **page** nito → ang kanilang mga section, element, `pageHistory`, at `posts`; ang sarili nitong mga **block** → ang kanilang mga section, element, at `pageHistory`; ang mga **link** at **globalStyles** nito. Tumatanggi ang isang guard na tumakbo para sa `''` — ang primary/shared na sentinel ay hindi kailanman ka-cascade.
2. Ang `DomainRepo.clearSiteId` ay **muling nagtatalaga** ng mga domain ng site pabalik sa primary (`siteId → ''`) sa halip na burahin ang mga ito, kaya nananatili ang custom domain pagkatapos mabura ang site.
3. Binubura ang `sites` row at muling sini-sync ang mga Caddy route (best-effort).

### Surface ng B1Admin

| Kakayahan | Saan | Mekanismo |
|-----------|------|-----------|
| Site switcher | `useSiteSelection` + `SiteSwitcher` (walang laman = "Main Website") | Binabasa ang `?site=` URL param at ipinapasa ito bilang `?siteId=` sa mga ContentApi call. Naroroon sa tatlong Site **list** area — **Pages**, **Blocks**, **Appearance** — pero *hindi* sa mga page/block editor, na may dalang `siteId` sa record |
| Paggawa/pagbura ng site | `SitesDialog`, binubuksan mula sa "Manage websites…" na entry ng switcher | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). Naka-gate sa membership Settings→Edit permission (`Permissions.settings.edit` sa server; `Permissions.membershipApi.settings.edit` sa B1Admin). **Gumawa/magbura lang — walang rename UI sa v1** |
| Pagtatalaga ng site bawat domain | `DomainSettingsEdit` sa ilalim ng Settings→Domains | Ang dropdown ng site bawat row ay nagpo-post ng `siteId` bawat domain sa `/membership/domains`. Nakatago ang column kung walang ibinalik na site ang API (mas lumang backend) |
| Copy-on-write na mga style | `StylesManager.prepareForSave` | Kapag ang `siteId` ng na-load na global-style row ay hindi tumutugma sa napiling site (ibig sabihin, ibinalik ng API ang minanang primary bilang fallback), tinatanggal nito ang `id` ng primary at inilalagay ang kasalukuyang `siteId`, na pumipilit ng **insert** ng bagong site-specific na row sa halip na i-overwrite ang primary. Ang parehong fork-on-mismatch ay nalalapat sa footer block ng site |

:::info
**Ang nananatiling sakop ang buong simbahan sa v1 (sinadyang pagpili sa saklaw, hindi limitasyon ng data model):** ang **blog** (ang `BlogPage` ay walang switcher at nilo-load ang `/posts` nang walang `siteId`), ang mga **site widget** (announcement banner + launcher), mga **redirect**, ang **logo / GA4 / church settings**, at ang **member portal** (B1App mobile). Tandaan na ito ay *hindi* "lahat ng Appearance" — ang global styles ng secondary site (palette, fonts, typography, spacing, nav, custom CSS) ay **per-site** sa pamamagitan ng copy-on-write path sa itaas; ang mga sub-panel lang ng banner/launcher/redirects/logo ng Appearance page ang nananatiling sakop ang buong simbahan.
:::

## Mga custom domain: Caddy edge (static-config plan)

:::info
**Binago ang direksyon noong 2026-07-02.** Ang naunang plano na ilipat ang custom-domain hosting sa mga domain na pinamamahalaan ng Vercel ay **kinansela**, at ang lahat ng Vercel domain-registration code (`VercelHelper`, ang mga `vercelToken`/`vercelProjectId`/`vercelTeamId` env var nito, mga SSM param, at mga health entry) ay inalis sa Api. Ang self-managed na **Caddy proxy sa EC2 ay nananatili** bilang permanenteng custom-domain edge. Ang natitirang gawain ay internal na lamang: ang pagpapalit ng *runtime* admin-API configuration ng Caddy ng *static* config na nakaliligtas sa mga restart.
:::

### Ang edge

Bawat custom na domain ng simbahan ay nakaturo ang DNS sa iisang EC2 box — `3.23.251.61`, na maaari ding abutin bilang `proxy.b1.church`. Ang screen ng Settings→Domains ng B1Admin ay nagtuturo sa mga simbahan na magdagdag ng apex `A → 3.23.251.61` o `CNAME → proxy.b1.church`. Tinatapos ng Caddy ang TLS gamit ang per-domain na Let's Encrypt cert, nire-rewrite ang `Host` header papunta sa `{sub}.b1.church` upstream ng domain, at nagre-reverse-proxy sa B1App — na magru-route naman nito ayon sa host label tulad ng anumang katutubong subdomain (tingnan ang [Mga custom domain](#custom-domains) sa itaas).

Ang upstream mapping ay galing sa `DomainRepo.loadPairs`, na ang dial ay **nagko-COALESCE ng subdomain ng itinalagang site** para ang domain ay mag-proxy sa tamang *secondary* site, na bumabalik sa primary ng simbahan:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Ang mga `www.*` row ay hindi kasama sa map; ang Caddy ay naghahain ng `www.{host}` sa pamamagitan ng `302` redirect papunta sa apex.

### Dalawang anonymous na endpoint ang nagpapakain sa edge

Ang `DomainController` ay naglalantad ng dalawang unauthenticated, read-only na endpoint na direktang ginagamit ng box — anonymous dahil kailangan, yamang tinatanong ng edge ang mga ito bago pa umiral ang anumang church context:

| Endpoint | Ibinabalik | Papel |
|----------|------------|-------|
| `GET /membership/domains/authorize?domain=` | `200` kung ang domain — o, para sa `www.` na miss, ang hubad nitong apex — ay umiiral sa `domains`; `404` kung hindi (kasama ang walang lamang `domain`) | Ang **on-demand-TLS `ask`** ng Caddy: ang abuse control na nagpapasya kung maglalabas ng cert para sa papasok na SNI |
| `GET /membership/domains/hostmap` | `text/plain`, isang sorted na linyang `{domain} {sub}.b1.church` bawat routable na domain | Ang host→upstream map file na nire-refresh ng box sa isang timer |

Ginagamit muli ng `authorize` ang `DomainRepo.loadByName` (eksaktong host, tapos isang `www.`→apex na retry); ginagamit muli ng `hostmap` ang `loadPairs` — kaya ito ay site-aware at hindi kasama ang `www.*`, kapareho ng mga proxy route — at inaalis lang ang `:443` na suffix.

### Pag-save/pagbura ng domain — isang best-effort na push

Ang `DomainController.save` ay nagsusulat ng mga `domains` row at pagkatapos ay gumagawa ng **iisang best-effort** na tawag sa `CaddyHelper.updateCaddy()`, na nakabalot sa `try/catch` na nagla-log (`console.error`) at nilulunok ang error; ganoon din ang `delete` (na nag-ayos din ng dating bug ng lumang route pagkatapos magbura), at ang pagbura ng secondary-site (`SiteController.delete`). Ang `updateCaddy` mismo ay may hangganang **10s** na Axios timeout, kaya ang hindi maabot o nakahintong Caddy ay hindi kailanman magiging sanhi ng `500` sa pag-save ng domain — ang `domains` table ang source of truth.

### Kasalukuyang estado — static config, walang runtime state

Ang box (Windows EC2 sa likod ng permanenteng Elastic IP) ay nagpapatakbo ng Caddy mula sa isang **static Caddyfile**: on-demand TLS na ang `ask` ay nakaturo sa `/membership/domains/authorize`, kasama ang host→upstream map file na nire-refresh bawat 5 minuto mula sa `/membership/domains/hostmap` ng isang scheduled task na nagtatapos sa graceful na `caddy reload`. Nakaliligtas ang config sa mga restart nang walang runtime state — walang re-priming na sayaw — at ang hindi kilalang SNI ay **tinatanggihan ng TLS** (walang cert na ginagawa para sa host na tinanggihan ng `authorize`), habang ang awtorisadong host na hindi pa nama-map (isang bagong domain sa loob ng sync window) ay nakakakuha ng malinis na 404. Ang mga bagong domain ay nagiging routable sa loob ng ~5 minuto mula sa pag-save; ang kanilang mga certificate ay ginagawa sa unang hit. Build/setup, operasyon, at mga gotcha na nasubukan sa field: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legacy na runtime push — rollback path, nakabinbin ang pagbura

Ang `CaddyHelper` (membership module) ay maaari pa ring magpatakbo ng Caddy sa pamamagitan ng **admin API** nito sa `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; walang ginagawa kapag hindi nakatakda; lumalabas sa Integrations group ng `ServerHealthController`): ang `updateCaddy()` ay nagpa-PATCH ng buong routes array, at ang `initializeCaddy()` + ang mga endpoint na `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ay muling nagtatayo ng runtime-configured na server mula sa simula. Ang config ng mode na iyon ay nasa memorya lang ng Caddy — ang restart-amnesia na pinalitan ng arkitekturang ito. Ang makinarya ay nananatili lamang bilang rollback path at nakatakdang burahin kapag naging matatag na ang static box; ang best-effort na `updateCaddy()` push sa pag-save/pagbura ng domain ay walang-pinsalang no-op laban sa static box (ang admin API nito ay localhost lang).

## Mga Kaugnay na Pahina

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — ang edge box mismo: setup ng bagong box, WinSW service, map sync task, at mga operational gotcha
- [Website Builder](./website-builder) — ang page/section/element tree, mga renderer, blog, SEO, at AI generation (kung ano ang nire-render kapag nareresolba na ang request sa isang simbahan/site)
- [Content Endpoints](../api/endpoints/content) — ang REST surface para sa mga page, block, link, at global style, na lahat ay `?siteId=`-aware na ngayon
- [B1App](../web-apps/b1-app) — ang Next.js app na nagho-host ng middleware at ng `[sdSlug]` routing
- [Web App Deployment](../deployment/web-apps) — kung paano idine-deploy ang B1App sa Vercel
