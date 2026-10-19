---
title: "Pag-route ng Website at Multi-Site"
---

# Pag-route ng Website at Multi-Site

<div class="article-intro">

Ang isang simbahan ay maaari na ngayong maglingkod ng higit sa isang natatanging website, at ang bawat isa ay maaaring nasa `*.b1.church` subdomain o sa isang ganap na custom na domain na pag-aari ng simbahan. Inilalarawan ng pahinang ito ang routing layer na nasa *ilalim* ng builder: kung paano nireresolba ang papasok na request sa isang simbahan **at** sa isang partikular na site, ang multi-site data model (ang `siteId` sentinel na nagpapanatiling gumagana ang bawat dating site nang walang pagbabago), at ang custom-domain edge — isang self-managed na Caddy proxy sa EC2 na nagtatapos ng TLS at nagre-rewrite ng bawat domain ng simbahan papunta sa `*.b1.church` upstream nito. Para sa aktwal na nire-render kapag nareresolba na ang request — ang page/section/element tree — tingnan ang [Website Builder](./website-builder).

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

Tatlong panuntunan ang nalalapat sa layer na ito:

1. **May sentinel na nagpapanatiling backward compatible ang lahat.** `siteId = ''` ang primary site. Bawat page, block, link, global-style, at domain row na umiral bago ang feature na ito ay may `''` at nagre-render nang eksakto gaya ng dati. Ang *pangalawang* website ay simpleng hanay ng mga row na may non-empty na `siteId`, at ang anumang content endpoint na tinawag nang walang `?siteId=` ay nagbabalik ng primary site — eksaktong kapareho ng lumang request, byte-for-byte.
2. **Nakabatay sa host label ang resolution at nagtatagpo ito.** Ang `*.b1.church` subdomain ay nagru-route ayon sa host label nito nang direkta; ang custom domain ay nire-rewrite sa `{sub}.b1.church` label nito sa Caddy edge bago ito makita ng B1App (kasama ang middleware DB lookup na naglalagay ng `x-site` header bilang fallback para sa anumang raw custom `Host`). Parehong landas ay dumadaan sa iisang `[sdSlug]` route at sa iisang `churches/lookup` call, kaya magkapareho ang rendering sa ibaba.
3. **Stateless ang Caddy edge sa iisang source of truth.** Ang custom domain ay nagtatapos sa isang self-managed na Caddy proxy sa EC2 na nagre-rewrite sa bawat domain papunta sa `{sub}.b1.church` upstream nito. Isang best-effort na `CaddyHelper.updateCaddy()` ang pinapatakbo sa bawat pag-save ng domain, at direktang binabasa rin ng Caddy ang `domains` table (ang `authorize` at `hostmap` endpoint sa ibaba). Ang table ang awtoritatibo — hindi kailanman maaaring mabigo ang pag-save dahil lang hindi maabot ang Caddy.

## Pagre-resolve ng site

### Mga `*.b1.church` subdomain

`B1App/next.config.mjs` ay nagre-rewrite ng mga papasok na request ayon sa host. Ang host rule na may pattern na `(?<subdomain>.*?)\..*` ay kumukuha ng **unang label** ng host at nagre-rewrite ng `/` at `/:path*` papunta sa `/{subdomain}` — ang `[sdSlug]` App-Router segment. Kaya ang `grace.b1.church/about` ay nagiging `/grace/about`.

Sa loob ng `src/app/[sdSlug]/`, tinatawag ng `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) ang `GET /membership/churches/lookup/?subDomain={sdSlug}`. Ang `ChurchController.getBySubDomain` response ay mayroon na ngayong dalawang branch:

| Tumutugma ang slug sa | Response | Kahulugan |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primary site ng simbahang iyon |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Isang **pangalawang site** — binabalikan ng controller ang `sites`, hinahanap ang nagmamay-ari na simbahan, at ibinabalik ang tinanong na slug kasama ang dagdag na `siteId` |

Ang dagdag na `siteId` ang tanging nagpapaiba sa request ng pangalawang site mula sa primary; ang lahat ng iba pa sa pipeline ay pareho.

Ang slug na hindi tumutugma sa alinmang table ay nagbabalik ng `{}` na may `200`. Itinuturing ng `ConfigHelper.load` na walang `id` ang response bilang hindi kilalang site at tinatawag ang `notFound()` ng Next, kaya ang hindi kilalang subdomain ay nakakakuha ng totoong 404 sa halip na tanungin ng lahat ng susunod na call ang `/…/undefined`. Ginagawa rin ng builder-page route ang tree path nito gamit ang `pageTreePath()` (`src/helpers/pageTreePath.ts`), na nag-e-encode ng slug sa URL, kaya ang maling slug (may backslash, space) ay nagiging 404 sa halip na ipasa ang `400` ng API bilang 500.

### Mga custom domain {#custom-domains}

Ang domain na pag-aari ng simbahan ay nagtatapos sa **Caddy edge** (nakalarawan sa ibaba), na nagre-rewrite ng `Host` header papunta sa `{sub}.b1.church` ng site bago i-proxy papunta sa B1App. Kaya sa normal na landas, ang B1App ay tumatanggap ng *internal* na `*.b1.church` host at nireresolba ito ayon sa host label gaya ng native na subdomain — hindi kailanman tumatakbo ang DB lookup ng middleware. Tumatakbo pa rin ang `src/middleware.ts` sa bawat request, pero may isang laging-aktibong trabaho at isang fallback:

1. **Laging** — binubura nito ang anumang `x-site` header na ipinadala ng client. Ang header na iyon ay maaaring pekein na rewrite input at pinagkakatiwalaan lamang kapag ang middleware mismo ang nagtakda nito; ang pagbura nito ang tunay na trabaho ng middleware sa likod ng Caddy.
2. **Fallback, non-internal na `Host` lamang** — para sa raw custom-domain `Host` na nakarating sa B1App nang *walang* rewrite ng Caddy, tinatawag nito ang `GET /membership/domains/public/lookup/{host}` at, kung magbalik ito ng `subDomain`, itinatakda ang `x-site: {subDomain}.b1.church`. Sa likod ng Caddy, walang epekto ang branch na ito dahil `*.b1.church` na ang `Host`.

Ang mga internal na host — `localhost`, `b1.church`, at ang mga suffix na `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — ay nilalampasan ang lookup nang buo (naresolba na sila ng host-label rewrite, o mga preview/deploy host sila).

Ang mismong lookup (`DomainRepo.loadByName`) ay nagsasagawa ng left join ng `domains → churches` at `domains → sites` at nagbabalik ng `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — ang subdomain ng itinalagang pangalawang site kung doon nakaturo ang domain, kung hindi ay ang sa simbahan. Una nitong tinutugma ang eksaktong host; kung nagsimula ang host sa `www.` at walang tumugma, **minsan lang** itong susubok muli sa bare apex.

Sa `next.config.mjs`, ang mga `x-site` rewrite rule ay nakalagay **sa unahan** ng generic host rules, kaya sila ang nananaig. `x-site: grace.b1.church` → unang label na `grace` → `[sdSlug] = grace`, at mula roon ay magkapareho ang resolution sa subdomain path (parehong `churches/lookup`, parehong `siteId`).

:::info
Hindi pinagkakatiwalaan ang `x-site` header mula sa labas. Walang kondisyong binubura ito ng middleware bago magtakda ng sarili nitong halaga, at ang mga rewrite rule ay nakikita lamang ang halagang itinakda ng middleware — hindi maaaring pilitin ng client ang sarili sa content ng ibang simbahan sa pamamagitan ng pagpapadala ng header.
:::

Dalawang detalye sa operasyon ng middleware:

- **Cache.** Ang resulta ng bawat host (tama o kumpirmadong walang tugma — hindi kailanman network error) ay naka-cache nang **10 minuto** sa in-memory na `Map`, bawat serverless isolate.
- **Matcher.** Sadyang muling isinama ng matcher ang `/sitemap.xml`, `/robots.txt`, at `/manifest.webmanifest`. Inaalis ng unang pattern nito ang mga dotted path, na kung hindi ay mag-aalis sa mga file na iyon; ibinabalik ang mga ito upang makatanggap din ng `x-site` header ang per-church SEO/PWA file ng custom domain.
- **Canonical header.** Para sa mga pahina ng simbahan, dinadagdagan ng middleware ang response ng `Link: <{proto}://{host}{path}>; rel="canonical"` header na nagpapangalan sa host kung saan aktwal na inihain ang pahina — subdomain man o custom domain (`helpers/canonicalLink.ts`). Nilalampasan ito sa mga non-church host (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) at sa `/mobile`, `/login`, `/logout`, at sa mga nabuong robots/sitemap/manifest file.

### Naka-disable na pampublikong website

Maaaring i-on ng simbahan ang **Disable Public Website** sa B1Admin (church-level content setting na `hidePublicSite = "true"`). Tanging mga route para sa miyembro ang ihahain ng site pagkatapos:

- **B1App middleware** ay hinahanap ang subdomain (`/membership/churches/lookup` at pagkatapos `/content/settings/public/:churchId`) at nagre-redirect ng mga anonymous na request para sa anumang path na wala sa allowlist papunta sa `/login?returnUrl={path}{query}`. Ang allowlist (`helpers/publicSite.ts`) ay `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, at ang manifest/robots/sitemap file. Tanging kumpirmadong sagot lamang ang naka-cache (60 segundo sa production, dahil ang revalidate call ng admin ay hindi makakapag-clear ng per-instance map na ito; hindi naka-cache sa dev/test). Ang API error ay naghahain ng site sa halip na i-lock out ang lahat.
- **Nakikita ng mga naka-sign in na miyembro ang buong site.** Ang request na may hindi pa expired na `jwt` cookie (ang `hasSession()` ng middleware ay nagde-decode ng `exp` ng payload nang hindi bine-verify ang signature — soft gate ito, hindi access control) ay nilalampasan ang redirect, kaya pagkatapos mag-log in ay babalik ang miyembro sa pahinang hiniling niya at makikita ang normal na mga pahina, built-in na pahina (Groups, Sermons, atbp.), at header navigation. Hindi na sinusuri ng mga page component at ng `Header` ang `hidePublicSite` nang sarili nila.
- **`robots.txt`** ay tumatanggi sa lahat, gaya ng sa mga noindex na host.
- **API.** Ang `GET /content/pages/public/:churchId` (ang listahan ng pahina para sa sitemap) ay nagbabalik ng `[]`, kaya hindi nakakalista ng mga pahina ang mga anonymous na caller.

### Pagdaan ng `siteId`

Iniimbak ng `ConfigHelper` ang na-resolve na `siteId` sa kanyang per-request na `ConfigurationInterface` (memoized gamit ang `cache()` ng React) at dinadagdagan ng `?siteId=` ang mga content call na ginagawa nito at ng mga page component — **may kondisyon**: ang walang lamang `siteId` (subdomain ng primary na simbahan) ay ganap na hindi nagdaragdag ng parameter. Ang mga endpoint na dinadaanan nito ay ang page tree (`/content/pages/:id/tree`), ang public page list na ginagamit ng sitemap (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), nav links (`/content/links/church/:id`), at ang standalone na footer block (`/content/blocks/public/footer/:id`). Sa normal na render path, kasama ng page tree ang footer (mga section na may markang `zone: "siteFooter"`), na kinuha na gamit ang `siteId`, kaya walang hindi naka-scope na footer.

Sadyang nasa labas nito ang member portal (B1App `mobile`): ang `loadChurchAppearance.ts` ay nireresolba ang simbahan sa pamamagitan ng `churches/lookup` pero binabasa ang church-level na `/settings/public/{id}` at hindi kailanman dinadaanan ang `siteId` — ang portal ay buong-simbahan sa v1 (tingnan sa ibaba).

## Maraming website bawat simbahan

### Data model

Sadyang maliit ang bagong `membership.sites` table:

| Column | Type | Mga Tala |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Simbahang nagmamay-ari |
| `name` | `varchar(255)` | Display name (hal. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** — pandaigdigang namespace (sa ibaba) |

Ang pag-scope sa site ay pagkatapos isang column na idinagdag sa content at domain tables (hindi nullable):

| Table (module) | Column | Ang `''` ay nangangahulugan |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Ang domain ay naghahain ng primary site |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primary site — at sa **`blocks`**, ang `''` ay nangangahulugan din na *shared sa lahat ng site* |

Dalawang migration ang nagdadagdag ng lahat ng ito (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Dahil ang column ay may default na `''`, bawat dating row ay nagpapanatili ng kasalukuyang gawi nang walang backfill.

**Pandaigdigang namespace ng subdomain.** Ang `sites.subDomain` ay nagbabahagi ng *isang* namespace sa `churches.subDomain` — hindi kailanman magbabanggaan ang subdomain ng site sa subdomain ng simbahan o ng ibang site. Ipinapatupad ito sa **parehong** save path: tinatanggihan ng `SiteController.save` ang slug na tumutugma sa `churches` o `sites`, at ginagawa rin ito ng `ChurchController.validateSave` nang pabaligtad. Sinusuportahan ito ng unique index sa `sites.subDomain` sa antas ng database.

**Ang uniqueness ng pages** ay pinalawak mula `(churchId, url)` patungong `(churchId, siteId, url)`, kaya ang dalawang site ng iisang simbahan ay maaaring magkaroon ng sarili nilang `/about`.

### Per-site na content, na may mga fallback

Bawat site-scoped na content **list/tree** endpoint ay tumatanggap ng opsyonal na `?siteId=` (kung wala ⇒ `''` = primary): pages tree / list / public, blocks list / by-type / footer, links (anon / filtered / all), at global styles. Ang mga section at element ay hindi direktang naka-scope — nagmamana sila sa kanilang parent page o block.

Dalawang resolution chain ang gumagawa ng mga kawili-wiling bagay:

- **Global styles — `site → primary → default`.** Ibinabalik ng `GlobalStyleRepo.loadForChurch(churchId, siteId)` ang sariling row ng site; kung walang row ang pangalawang site, ibinabalik nito ang **primary (`''`) row nang tulad ng dati** (pinapanatili ang `id`/`siteId` ng primary, na ginagamit ng client para sa copy-on-write); kung wala ring primary, ang `GlobalStyleController` ay nagbabalik ng hard-coded na default na palette/fonts.
- **Footer block — nananaig ang footer ng site, bumabagsak sa shared.** Ibinabalik ng `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` ang shared (`''`) *at* ang mga row na partikular sa site; pinipili ng resolver ang sariling footer ng site kung mayroon, kung wala ay ang shared. Ang parehong lohika ay tumatakbo sa `TreeHelper.insertBlocks` (page tree) at sa standalone na endpoint na `/content/blocks/public/footer/:churchId`.

### Pagbura ng site (cascade)

Tinatanggal ng `SiteController.delete` (nakatali sa permission na membership Settings→Edit) ang pangalawang site sa tatlong hakbang:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` ay kinakaskad ang lahat ng content na pag-aari ng site: ang mga **pahina** nito → ang kanilang mga section, element, `pageHistory`, at `posts`; ang sarili nitong mga **block** → ang kanilang mga section, element, at `pageHistory`; ang mga **link** at **globalStyles** nito. Hindi tumatakbo ang guard para sa `''` — ang primary/shared sentinel ay hindi kailanman kinakaskad.
2. Ibinabalik ng `DomainRepo.clearSiteId` ang mga domain ng site sa primary (`siteId → ''`) sa halip na burahin ang mga ito, kaya nananatili ang custom domain pagkatapos mabura ang site.
3. Binubura ang `sites` row at muling isinasabay ang mga Caddy route (best-effort).

### Surface ng B1Admin

| Kakayahan | Saan | Mekanismo |
|-----------|-------|-----------|
| Site switcher | `useSiteSelection` + `SiteSwitcher` (walang laman = "Main Website") | Binabasa ang `?site=` URL param at isinasama ito bilang `?siteId=` sa mga ContentApi call. Nasa tatlong **listahan** ng Site — **Pages**, **Blocks**, **Appearance** — pero *hindi* sa mga page/block editor, na may dalang `siteId` sa record mismo |
| Paggawa/pagbura ng site | `SitesDialog`, binubuksan mula sa entry na "Manage websites…" ng switcher | `POST /membership/sites` / `DELETE /membership/sites/:id` (pangalan at subDomain). Nakatali sa permission na membership Settings→Edit (`Permissions.settings.edit` sa server; `Permissions.membershipApi.settings.edit` sa B1Admin). **Paggawa/pagbura lamang — walang rename UI sa v1** |
| Pagtatalaga ng site sa domain | `DomainSettingsEdit` sa ilalim ng Settings→Domains | Ang per-row na site dropdown ay nagpapadala ng `siteId` kada domain sa `/membership/domains`. Nagtatago ang column kung walang ibinabalik na site ang API (mas lumang backend) |
| Copy-on-write na styles | `StylesManager.prepareForSave` | Kapag ang na-load na global-style row ay may `siteId` na hindi tugma sa napiling site (ibig sabihin, ibinalik ng API ang primary bilang fallback), tinatanggal nito ang `id` ng primary at inilalagay ang kasalukuyang `siteId`, na pinipilit ang **insert** ng bagong row na partikular sa site sa halip na i-overwrite ang primary. Ang parehong fork-on-mismatch ay nalalapat sa footer block ng site |

:::info
**Ano ang nananatiling buong-simbahan sa v1 (sadyang pagpili ng scope, hindi limitasyon ng data model):** ang **blog** (walang switcher ang `BlogPage` at nilo-load nito ang `/posts` nang walang `siteId`), ang **site widgets** (announcement banner + launcher), ang **redirects**, ang **logo / GA4 / church settings**, at ang **member portal** (B1App mobile). Tandaan na hindi ito ang "lahat ng Appearance" — ang global styles ng pangalawang site (palette, fonts, typography, spacing, nav, custom CSS) **ay** per-site sa pamamagitan ng copy-on-write path sa itaas; ang banner/launcher/redirects/logo sub-panel lamang ng pahina ng Appearance ang nananatiling buong-simbahan.
:::

## Mga custom domain: Caddy edge (static-config plan)

:::info
**Binago ang direksyon noong 2026-07-02.** Ang naunang plano na ilipat ang hosting ng custom domain sa mga domain na pinamamahalaan ng Vercel ay **kinansela**, at ang lahat ng code ng pagrerehistro ng domain sa Vercel (`VercelHelper`, ang mga env var nitong `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM params, at health entries) ay inalis mula sa Api. Ang self-managed na **Caddy proxy sa EC2 ay nananatili** bilang permanenteng custom-domain edge. Ang natitira na lamang na gawain ay panloob: ang pagpapalit ng *runtime* admin-API configuration ng Caddy ng isang *static* na config na nananatili pagkatapos ng restart.
:::

### Ang edge

Ang bawat custom na domain ng simbahan ay nakaturo ang DNS sa iisang EC2 box — `3.23.251.61`, na maaari ring abutin bilang `proxy.b1.church`. Ang screen ng Settings→Domains ng B1Admin ay nagtuturo sa mga simbahan na magdagdag ng apex `A → 3.23.251.61` o `CNAME → proxy.b1.church`. Tinatapos ng Caddy ang TLS gamit ang per-domain na Let's Encrypt cert, nire-rewrite ang `Host` header papunta sa `{sub}.b1.church` upstream ng domain, at nire-reverse-proxy papunta sa B1App — na saka ito nagru-route ayon sa host label gaya ng anumang native na subdomain (tingnan ang [Custom domains](#custom-domains) sa itaas).

Ang upstream mapping ay galing sa `DomainRepo.loadPairs`, na ang dial ay nagko-COALESCE ng subdomain ng itinalagang site upang maipadala ang domain sa tamang *pangalawang* site, at bumabagsak sa primary ng simbahan:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Ang mga row na `www.*` ay hindi kasama sa mapa; ang Caddy ang naghahain ng `www.{host}` sa pamamagitan ng `302` redirect papunta sa apex.

### Dalawang anonymous na endpoint ang nagpapakain sa edge

Ang `DomainController` ay naglalantad ng dalawang hindi naka-authenticate at read-only na endpoint na direktang kinokonsumo ng box — anonymous dahil kailangan, dahil tinatanong ng edge ang mga ito bago pa umiral ang anumang church context:

| Endpoint | Nagbabalik | Papel |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` kung umiiral ang domain — o, para sa `www.` na walang tugma, ang bare apex nito — sa `domains`; `404` kung hindi (kasama ang walang laman na `domain`) | On-demand-TLS `ask` ng Caddy: ang abuse control na nagpapasya kung maglalabas ng cert para sa papasok na SNI |
| `GET /membership/domains/hostmap` | `text/plain`, isang naayos na linya ng `{domain} {sub}.b1.church` kada routable na domain | Ang host→upstream map file na nire-refresh ng box sa timer |

Ginagamit muli ng `authorize` ang `DomainRepo.loadByName` (eksaktong host, saka isang `www.`→apex na retry); ginagamit muli ng `hostmap` ang `loadPairs` — kaya site-aware ito at hindi kasama ang `www.*`, kapareho ng mga proxy route — at tinatanggal lamang ang suffix na `:443`.

### Pag-save/pagbura ng domain — isang best-effort na push

Isinusulat ng `DomainController.save` ang mga row ng `domains` at pagkatapos ay gumagawa ng **isang best-effort** na tawag na `CaddyHelper.updateCaddy()`, na nakabalot sa `try/catch` na nagla-log (`console.error`) at lumulunok ng error. Ginagawa rin ito ng `delete` (na nag-ayos din ng dating stale-route-on-delete bug), gayundin ng pagbura ng pangalawang site (`SiteController.delete`). Ang `updateCaddy` mismo ay limitado ng **10 segundong** Axios timeout, kaya hindi kailanman makapagbibigay ng `500` sa pag-save ng domain ang isang hindi maabot o nakahintong Caddy — ang table ng `domains` ang source of truth.

### Kasalukuyang estado — static config, walang runtime state

Ang box (Windows EC2 sa likod ng permanenteng Elastic IP) ay nagpapatakbo ng Caddy mula sa isang **static na Caddyfile**: on-demand TLS na ang `ask` ay tumuturo sa `/membership/domains/authorize`, kasama ang host→upstream map file na nire-refresh kada 5 minuto mula sa `/membership/domains/hostmap` ng isang scheduled task na nagtatapos sa isang graceful na `caddy reload`. Nananatili ang config pagkatapos ng restart nang walang runtime state — walang re-priming na hakbang — at ang hindi kilalang SNI ay **tinatanggihan sa TLS** (walang cert na mimintin para sa host na tinanggihan ng `authorize`), habang ang authorized-pero-hindi-pa-na-map na host (bagong domain sa loob ng sync window) ay nakakakuha ng malinis na 404. Nagiging routable ang mga bagong domain sa loob ng ~5 minuto mula sa pag-save; mamimintin ang kanilang mga cert sa unang hit. Build/setup, operasyon, at mga field-tested na gotcha: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legacy na runtime push — rollback path, nakabinbin ang pagbura

Maaari pa ring itulak ng `CaddyHelper` (membership module) ang Caddy sa pamamagitan ng admin API nito sa `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; walang epekto kapag hindi naka-set; lumalabas sa ilalim ng Integrations group ng `ServerHealthController`): ang `updateCaddy()` ay nagpa-PATCH ng buong routes array, at ang `initializeCaddy()` kasama ang mga endpoint na `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ay bumubuo muli ng runtime-configured na server mula sa simula. Ang config ng mode na iyon ay nabuhay lamang sa memorya ng Caddy — ang restart-amnesia na pinalitan ng arkitekturang ito. Nananatili ang makinarya bilang rollback path lamang at nakatakdang burahin kapag naging matatag na ang static box; ang best-effort na `updateCaddy()` push sa pag-save/pagbura ng domain ay isang walang-epektong operasyon lamang laban sa static box (localhost-only ang admin API nito).

## Mga Kaugnay na Pahina

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — ang mismong edge box: bagong box setup, WinSW service, map sync task, at mga operational gotcha
- [Website Builder](./website-builder) — ang page/section/element tree, mga renderer, blog, SEO, at AI generation (ang nire-render kapag nareresolba na ang request sa isang simbahan/site)
- [Content Endpoints](../api/endpoints/content) — ang REST surface para sa mga pahina, block, link, at global styles, na lahat ngayon ay `?siteId=`-aware
- [B1App](../web-apps/b1-app) — ang Next.js app na nagho-host ng middleware at ng `[sdSlug]` routing
- [Web App Deployment](../deployment/web-apps) — kung paano dine-deploy ang B1App sa Vercel
