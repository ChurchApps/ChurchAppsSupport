---
title: "Website Routing at Multi-Site"
---

# Website Routing at Multi-Site

<div class="article-intro">

Kaya nang maghain ng higit sa isang natatanging website ang iisang simbahan, at maaaring nasa subdomain na `*.b1.church` o sa ganap na custom, pag-aari ng simbahan na domain ang bawat isa. Inilalarawan ng pahinang ito ang routing layer na nasa *ilalim* ng builder: kung paano nireresolba ng papasok na request ang isang simbahan **at** isang partikular na site, ang multi-site data model (ang sentinel na `siteId` na nagpapanatiling gumagana ang bawat umiiral nang site nang walang pagbabago), at ang custom-domain edge -- isang self-managed na Caddy proxy sa EC2 na nagtatapos ng TLS at nagre-rewrite ng bawat domain ng simbahan papunta sa upstream nitong `*.b1.church`. Para sa kung ano ang aktwal na nire-render kapag nareresolba na ang request -- ang page/section/element tree -- tingnan ang [Website Builder](./website-builder).

</div>

## Pangkalahatang-tanaw

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

Tatlong panuntunan ang nananatili sa layer na ito:

1. **Pinapanatili ng isang sentinel na compatible ang lahat.** Ang `siteId = ''` ay ang pangunahing site. Bawat pahina, block, link, global-style, at row ng domain na umiral bago ang feature na ito ay may `''` at nire-render nang eksakto gaya ng dati. Ang *ikalawang* website ay simpleng hanay ng mga row na may hindi-walang-lamang na `siteId`, at anumang content endpoint na tinawag nang walang `?siteId=` ay nagbabalik ng pangunahing site -- eksaktong parehong request ng dati, byte-for-byte.
2. **Batay sa host label ang resolution at nagtatagpo.** Ang subdomain na `*.b1.church` ay nagru-route ayon sa host label nito nang direkta; ang custom domain ay nire-rewrite sa host label na `{sub}.b1.church` sa Caddy edge bago ito makita ng B1App (may DB lookup sa middleware na nagse-stamp ng header na `x-site` bilang fallback para sa anumang raw na custom `Host`). Parehong dumadaong sa iisang route na `[sdSlug]` at sa iisang tawag na `churches/lookup`, kaya magkapareho ang downstream rendering.
3. **Stateless ang Caddy edge sa iisang pinagmumulan ng katotohanan.** Nagtatapos ang mga custom domain sa isang self-managed na Caddy proxy sa EC2 na nagre-rewrite ng bawat domain papunta sa upstream nitong `{sub}.b1.church`. Isang best-effort na `CaddyHelper.updateCaddy()` lang ang tinatawag ng pag-save ng domain, at binabasa rin ng Caddy nang direkta ang table ng `domains` (ang mga endpoint na `authorize` at `hostmap` sa ibaba). Ang table ang awtoritatibo -- hindi kailanman mabibigo ang isang save dahil hindi maabot ang Caddy.

## Pag-resolve ng site

### Mga subdomain na `*.b1.church`

Ni-re-rewrite ng `B1App/next.config.mjs` ang mga papasok na request ayon sa host. Kinukuha ng host rule na may pattern na `(?<subdomain>.*?)\..*` ang **unang label** ng host at nire-rewrite ang `/` at `/:path*` sa `/{subdomain}` -- ang App-Router segment na `[sdSlug]`. Kaya ang `grace.b1.church/about` ay nagiging `/grace/about`.

Sa loob ng `src/app/[sdSlug]/`, tinatawag ng `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) ang `GET /membership/churches/lookup/?subDomain={sdSlug}`. Dalawang sangay na ngayon ang tugon ng `ChurchController.getBySubDomain`:

| Tumutugma ang slug sa | Tugon | Kahulugan |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Pangunahing site ng simbahang iyon |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Isang **pangalawang site** -- bumabalik ang controller sa `sites`, nireresolba ang nagmamay-aring simbahan, at inuulit ang slug na tinanong kasama ang dagdag na `siteId` |

Ang dagdag na `siteId` na iyon ang tanging bagay na nagpapaiba sa request ng pangalawang site mula sa pangunahin; ang lahat ng iba sa pipeline ay pinagsasaluhan.

Ang slug na hindi tumutugma sa alinmang table ay nagbabalik ng `{}` na may `200`. Itinuturing ng `ConfigHelper.load` ang tugon na walang `id` bilang hindi kilalang site at tinatawag ang `notFound()` ng Next, kaya ang hindi kilalang subdomain ay nakakakuha ng tunay na 404 sa halip na tumawag ang bawat susunod na tawag para sa `/…/undefined`. Ang route ng builder-page ay bumubuo rin ng tree path nito gamit ang `pageTreePath()` (`src/helpers/pageTreePath.ts`), na nag-e-encode ng URL sa slug, kaya ang malformed na slug (mga backslash, espasyo) ay nagbabalik ng 404 sa halip na ipasa ang `400` ng API bilang 500.

### Mga custom domain {#custom-domains}

Nagtatapos ang domain na pag-aari ng simbahan sa **Caddy edge** (ipinaliwanag sa ibaba), na nire-rewrite ang header na `Host` papunta sa `{sub}.b1.church` ng site bago ipasa sa B1App. Kaya sa normal na daan, tumatanggap ang B1App ng *internal* na host na `*.b1.church` at nireresolba ito ayon sa host label nang eksakto gaya ng native na subdomain -- hindi kailanman tumatakbo ang DB lookup ng middleware. Tumatakbo pa rin ang `src/middleware.ts` sa bawat request, pero may isang laging-aktibong trabaho at isang fallback:

1. **Laging** -- **binubura nito ang anumang header na `x-site` na ipinadala ng client**. Ang header na iyon ay maaaring pekein na rewrite input at pinagkakatiwalaan lang kapag ang middleware mismo ang nag-set nito; ang pagtanggal dito ang tunay na trabaho ng middleware sa likod ng Caddy.
2. **Fallback, para lang sa non-internal na `Host`** -- para sa raw na custom-domain na `Host` na umaabot sa B1App *nang walang* rewrite ng Caddy, tinatawag nito ang `GET /membership/domains/public/lookup/{host}` at, kung magbalik ito ng `subDomain`, nagse-set ng `x-site: {subDomain}.b1.church`. Sa likod ng Caddy, inert ang sangay na ito dahil `*.b1.church` na ang `Host`.

Nilalaktawan ng mga internal na host -- `localhost`, `b1.church`, at ang mga suffix na `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` -- ang lookup nang buo (naresolba na sila ng host-label rewrite, o mga preview/deploy host ang mga ito).

Ang mismong lookup (`DomainRepo.loadByName`) ay nag-left-join ng `domains → churches` at `domains → sites` at nagbabalik ng `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` -- ang subdomain ng itinalagang pangalawang site kung ang domain ay tumuturo sa isa, kung hindi ang sa simbahan. Tumutugma muna ito sa eksaktong host; kung nagsimula ang host na iyon sa `www.` at hindi tumama, susubukan ulit ito **nang isang beses** laban sa bare na apex.

Pabalik sa `next.config.mjs`, nakalagay ang mga rule ng rewrite ng `x-site` **sa unahan ng** generic na host rule, kaya nananalo ang mga ito. Ang `x-site: grace.b1.church` → unang label na `grace` → `[sdSlug] = grace`, at mula roon ay magkapareho ang resolution sa daan ng subdomain (parehong `churches/lookup`, parehong `siteId`).

:::info
Hindi pinagkakatiwalaan mula sa labas ang header na `x-site`. Walang kondisyong tinatanggal ng middleware ang anumang papasok na `x-site` bago opsyonal na mag-set ng sarili nito, at ang mga rule ng rewrite ay tanging ang value na itinakda ng middleware ang nakikita -- hindi maipipilit ng client ang sarili nito sa nilalaman ng ibang simbahan sa pamamagitan ng pagpapadala ng header.
:::

Dalawang detalye sa pagpapatakbo ng middleware:

- **Cache.** Ang resulta ng bawat host (hit *o* kumpirmadong miss -- hindi kailanman network error) ay nakakache nang **10 minuto** sa isang in-memory na `Map`, kada serverless isolate.
- **Matcher.** Sadyang muling isinasama ng matcher ang `/sitemap.xml`, `/robots.txt`, at `/manifest.webmanifest`. Inaalis ng unang pattern nito ang mga dotted na path, na kung hindi ay maglalaglag sa mga file na iyon; ibinabalik ang mga ito para makatanggap din ng header na `x-site` ang per-church na SEO/PWA file ng custom domain.
- **Canonical na header.** Para sa mga pahina ng simbahan, nagdadagdag ang middleware ng response header na `Link: <{proto}://{host}{path}>; rel="canonical"` na nagpapangalan sa host kung saan aktwal na inihain ang pahina -- subdomain o custom domain (`helpers/canonicalLink.ts`). Kapag umabot ang custom domain sa B1App sa pamamagitan ng [Caddy proxy](../deployment/caddy-proxy), ang request host ay ang subdomain na `{sub}.b1.church`, kaya ginagamit ng middleware ang domain ng bisita mula sa `X-Church-Host` -- pero pagkatapos lang kumpirmahin ng `/domains/public/lookup/{host}` na ang domain na iyon ay tumutugma sa parehong subdomain (`ownsSubdomain()`). Pagkatapos, ang canonical link, `robots.txt`, at `sitemap.xml` ay nagpapangalan sa custom domain sa halip na sa subdomain na `b1.church`. Nilalaktawan ito sa mga non-church na host (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) at sa `/mobile`, `/login`, `/logout`, at sa mga generated na robots/sitemap/manifest file.

### Nakadisable na pampublikong website

Maaaring i-on ng simbahan ang **Disable Public Website** sa B1Admin (church-level na content setting na `hidePublicSite = "true"`). Pagkatapos, ang site ay naghahain lang ng mga route na nakaharap sa miyembro:

- **Sinusuri ng middleware ng B1App ang subdomain** (`/membership/churches/lookup` pagkatapos `/content/settings/public/:churchId`) at nire-redirect ang mga anonymous na request para sa anumang path sa labas ng allowlist sa `/login?returnUrl={path}{query}`. Ang allowlist (`helpers/publicSite.ts`) ay `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, at ang manifest/robots/sitemap file. Tanging ang mga kumpirmadong sagot ang nakakache (60 segundo sa production, dahil hindi maaalis ng revalidate call ng admin ang per-instance na map na ito; hindi nakakache sa dev/test). Ang error ng API ay naghahain ng site sa halip na i-lock out ang lahat.
- **Buong site ang nakikita ng mga naka-sign in na miyembro.** Ang request na may dalang hindi pa nag-e-expire na cookie na `jwt` (dine-decode ng `hasSession()` ng middleware ang `exp` ng payload nang hindi bine-verify ang signature -- soft gate ito, hindi access control) ay lumalampas sa redirect, kaya pagkatapos mag-log in ay babalik ang miyembro sa pahinang hiniling niya at makikita ang normal na mga pahina, built-in na pahina (Groups, Sermons, atbp.), at navigation ng header. Hindi na sinusuri ng mga component ng pahina at ng `Header` ang `hidePublicSite` sa kanilang sarili.
- **Hinaharangan ng `robots.txt`** ang lahat, gaya ng sa mga noindex na host.
- **API.** Ang `GET /content/pages/public/:churchId` (ang listahan ng pahina ng sitemap) ay nagbabalik ng `[]`, kaya hindi makakalista ng mga pahina ang mga anonymous na tumatawag.

### Pagdaloy ng `siteId`

Iniimbak ng `ConfigHelper` ang nireresolbang `siteId` sa kanyang per-request na `ConfigurationInterface` (memoized gamit ang `cache()` ng React) at dinudugtungan ng `?siteId=` ang mga content call na ginagawa nito at ng mga component ng pahina -- **may kondisyon**: ang walang-lamang na `siteId` (isang subdomain ng pangunahing simbahan) ay ganap na nilalaktawan ang parameter. Ang mga endpoint na may dalang threading ay ang page tree (`/content/pages/:id/tree`), ang pampublikong listahan ng pahina na ginagamit ng sitemap (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), nav link (`/content/links/church/:id`), at ang standalone na footer block (`/content/blocks/public/footer/:id`). Sa normal na render path, kasama ang footer sa loob ng page tree (mga seksyong may markang `zone: "siteFooter"`), na nakuha na gamit ang `siteId`, kaya walang puwang na hindi naka-scope na footer.

Sadyang nasa labas nito ang member portal ng B1App (`mobile`): nireresolba ng `loadChurchAppearance.ts` ang simbahan sa pamamagitan ng `churches/lookup` pero binabasa ang church-level na `/settings/public/{id}` at hindi kailanman nagthre-thread ng `siteId` -- ang portal ay church-wide sa v1 (tingnan sa ibaba).

## Maraming website bawat simbahan

### Data model

Sadyang maliit ang bagong table na `membership.sites`:

| Column | Type | Mga tala |
|--------|------|----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Simbahang nagmamay-ari |
| `name` | `varchar(255)` | Display name (hal. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** -- global na namespace (sa ibaba) |

Ang pag-scope ng site ay isang column na idinagdag sa mga content at domain table, walang nullable:

| Table (module) | Column | Ang `''` ay nangangahulugang |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Pangunahing site ang inihahain ng domain |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Pangunahing site -- at sa **`blocks`**, ang `''` ay nangangahulugan pa ng *ibinabahagi sa lahat ng site* |

Dalawang migration ang nagdaragdag ng lahat ng ito (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Dahil ang default ng column ay `''`, pinapanatili ng bawat umiiral na row ang kasalukuyang kilos nang walang backfill.

**Global na namespace ng subdomain.** Ang `sites.subDomain` ay nagbabahagi ng *isang* namespace sa `churches.subDomain` -- hindi kailanman magbabanggaan ang subdomain ng site sa subdomain ng simbahan o sa ibang site. Ipinapatupad ito sa **magkabilang** save path: tinatanggihan ng `SiteController.save` ang slug na tumatama sa `churches` o `sites`, at ginagawa rin ito ng `ChurchController.validateSave` sa kabaligtaran. Sinusuportahan ito ng unique index sa `sites.subDomain` sa antas ng database.

**Lumawak ang uniqueness ng mga pahina** mula sa `(churchId, url)` patungong `(churchId, siteId, url)`, kaya ang dalawang site ng iisang simbahan ay maaaring may kanya-kanyang `/about`.

### Per-site na nilalaman, may mga fallback

Bawat site-scoped na content **list/tree** endpoint ay tumatanggap ng opsyonal na `?siteId=` (kung wala ay `''` = pangunahin): listahan/tree/publiko ng pages, listahan/ayon-sa-uri/footer ng blocks, links (anonymous / na-filter / lahat), at global styles. Hindi direktang naka-scope ang mga seksyon at elemento -- nagmamana sila sa pamamagitan ng kanilang parent na pahina o block.

Dalawang resolution chain ang gumagawa ng kawili-wiling trabaho:

- **Global styles -- `site → primary → default`.** Ibinabalik ng `GlobalStyleRepo.loadForChurch(churchId, siteId)` ang sariling row ng site; kung walang row ang pangalawang site, ibinabalik nito ang **row ng pangunahin (`''`) gaya ng dati** (pinapanatili ang `id`/`siteId` ng pangunahin, na ginagamit ng client para sa copy-on-write); kung walang pangunahin rin, ang `GlobalStyleController` ay nagbabalik ng hard-coded na default na palette/font.
- **Footer block -- nananalo ang site-specific, babagsak sa shared.** Ibinabalik ng `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` ang shared (`''`) *at* site-specific na mga row; pinipili ng resolver ang sariling footer ng site kung naroon, kung hindi ang shared. Pareho ang lohika sa `TreeHelper.insertBlocks` (page tree) at sa standalone na endpoint na `/content/blocks/public/footer/:churchId`.

### Cascade ng pagbura ng site

Ang `SiteController.delete` (nakasalalay sa permiso ng membership na Settings→Edit) ay nagbubura ng pangalawang site sa tatlong hakbang:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` ay nagka-cascade ng lahat ng nilalamang pag-aari ng site: ang mga **pahina** nito → ang kanilang mga seksyon, elemento, `pageHistory`, at `posts`; ang sarili nitong mga **block** → ang kanilang mga seksyon, elemento, at `pageHistory`; ang mga **link** at **globalStyles** nito. May guard na tumatangging tumakbo para sa `''` -- hindi kailanman ika-cascade ang sentinel ng pangunahin/ibinabahagi.
2. Ang `DomainRepo.clearSiteId` ay **nagtatalaga muli** ng mga domain ng site pabalik sa pangunahin (`siteId → ''`) sa halip na burahin ang mga ito, kaya nabubuhay ang custom domain kahit mabura ang site.
3. Binubura ang row ng `sites` at muling sini-sync ang mga route ng Caddy (best-effort).

### Surface ng B1Admin

| Kakayahan | Saan | Mekanismo |
|-----------|------|-----------|
| Switcher ng site | `useSiteSelection` + `SiteSwitcher` (walang laman = "Main Website") | Binabasa ang URL param na `?site=` at ipinapasa bilang `?siteId=` sa mga tawag ng ContentApi. Nasa tatlong **listahan** ng Site -- **Pages**, **Blocks**, **Appearance** -- pero *hindi* sa mga editor ng pahina/block, na nagdadala ng `siteId` sa record |
| Paggawa/pagbura ng site | `SitesDialog`, binubuksan mula sa entry na "Manage websites…" ng switcher | `POST /membership/sites` / `DELETE /membership/sites/:id` (pangalan + subDomain). Nakasalalay sa permiso ng membership na Settings→Edit (`Permissions.settings.edit` sa server; `Permissions.membershipApi.settings.edit` sa B1Admin). **Paggawa/pagbura lang -- walang UI ng pagpapalit ng pangalan sa v1** |
| Pagtatalaga ng site sa domain | `DomainSettingsEdit` sa ilalim ng Settings→Domains | Ang dropdown ng site sa bawat row ay nagpo-post ng `siteId` kada domain sa `/membership/domains`. Nagtatago ang column kung walang ibinabalik na site ang API (mas lumang backend) |
| Copy-on-write ng styles | `StylesManager.prepareForSave` | Kapag ang na-load na row ng global-style ay may `siteId` na hindi tumutugma sa napiling site (ibig sabihin, ibinalik ng API ang pangunahin bilang fallback), tinatanggal nito ang `id` ng pangunahin at nagse-stamp ng kasalukuyang `siteId`, na nagpipilit ng **insert** ng bagong row na specific sa site sa halip na i-overwrite ang pangunahin. Ang parehong fork-on-mismatch ay nalalapat sa site footer block |

:::info
**Ano ang nananatiling church-wide sa v1 (sinadyang pagpili sa saklaw, hindi limitasyon ng data model):** ang **blog** (walang switcher ang `BlogPage` at nilo-load ang `/posts` nang walang `siteId`), ang **site widgets** (announcement banner + launcher), ang **redirects**, ang **logo / GA4 / church settings**, at ang **member portal** (B1App mobile). Tandaang HINDI ito ang "lahat ng Appearance" -- ang mga global style ng pangalawang site (palette, font, typography, spacing, nav, custom CSS) **ay** per-site sa pamamagitan ng copy-on-write path sa itaas; ang mga sub-panel ng banner/launcher/redirect/logo lang sa pahina ng Appearance ang nananatiling church-wide.
:::

## Mga custom domain: Caddy edge (static-config plan)

:::info
**Binago ang direksyon noong 2026-07-02.** Ang naunang plano na ilipat ang custom-domain hosting sa mga domain na pinamamahalaan ng Vercel ay **kinansela**, at ang lahat ng code ng pagrerehistro ng domain sa Vercel (`VercelHelper`, ang mga env var nitong `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM param, at health entry) ay inalis sa Api. Nananatili ang self-managed na **Caddy proxy sa EC2** bilang permanenteng custom-domain edge. Ang tanging natitirang trabaho ay panloob: ang pagpapalit ng *runtime* admin-API configuration ng Caddy ng isang *static* na config na nabubuhay sa mga restart.
:::

### Ang edge

Bawat custom domain ng simbahan ay tumuturo ng DNS sa iisang EC2 box -- `3.23.251.61`, na maaari ring maabot bilang `proxy.b1.church`. Ang screen ng Settings→Domains ng B1Admin ay nagtuturo sa mga simbahan na magdagdag ng apex `A → 3.23.251.61` o `CNAME → proxy.b1.church`. Tinatapos ng Caddy ang TLS gamit ang per-domain na Let's Encrypt cert, ni-re-rewrite ang header na `Host` papunta sa upstream na `{sub}.b1.church` ng domain, at nagre-reverse-proxy sa B1App -- na pagkatapos ay nagruruta ayon sa host label gaya ng anumang native na subdomain (tingnan ang [Custom domains](#custom-domains) sa itaas).

Nagmumula ang mapping ng upstream sa `DomainRepo.loadPairs`, na ang dial ay nag-COALESCE sa subdomain ng itinalagang site para maipasa ng domain ang request sa tamang *pangalawang* site, na bumabagsak sa pangunahin ng simbahan:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Hindi kasama sa map ang mga row na `www.*`; inihahain ng Caddy ang `www.{host}` sa pamamagitan ng redirect na `302` papunta sa apex.

### Dalawang anonymous na endpoint ang nagpapakain sa edge

Naglalantad ang `DomainController` ng dalawang endpoint na walang auth at read-only na direktang kinokonsumo ng box -- anonymous dahil kailangan, dahil tinatanong ng edge ang mga ito bago pa magkaroon ng konteksto ng simbahan:

| Endpoint | Ibinabalik | Papel |
|----------|----------|-------|
| `GET /membership/domains/authorize?domain=` | `200` kung umiiral ang domain -- o, para sa miss na `www.`, ang bare na apex nito -- sa `domains`; `404` kung hindi (kasama ang walang-lamang na `domain`) | Ang **on-demand-TLS `ask`** ng Caddy: ang abuse control na nagpapasya kung maglalabas ng cert para sa papasok na SNI |
| `GET /membership/domains/hostmap` | `text/plain`, isang sorted na linyang `{domain} {sub}.b1.church` kada routable na domain | Ang host→upstream map file na nire-refresh ng box sa timer |

Muling ginagamit ng `authorize` ang `DomainRepo.loadByName` (eksaktong host, pagkatapos isang retry ng `www.`→apex); muling ginagamit ng `hostmap` ang `loadPairs` -- kaya site-aware ito at hindi kasama ang `www.*`, eksaktong kapareho ng proxy route -- at tinatanggal lang ang suffix na `:443`.

### Pag-save/pagbura ng domain -- isang best-effort na push

Sinusulat ng `DomainController.save` ang mga row ng `domains` at pagkatapos ay gumagawa ng **isang best-effort** na tawag na `CaddyHelper.updateCaddy()`, na nakabalot sa `try/catch` na nagla-log (`console.error`) at nilalamon; ginagawa rin ito ng `delete` (na nag-ayos din sa dating bug ng stale na route sa pagbura), gayundin ng pagbura ng pangalawang site (`SiteController.delete`). Limitado mismo ang `updateCaddy` ng **10s** na Axios timeout, kaya hindi kailanman makapagbibigay ng `500` sa pag-save ng domain ang Caddy na hindi maabot o nakahinto -- ang table ng `domains` ang pinagmumulan ng katotohanan.

### Kasalukuyang estado -- static config, walang runtime state

Pinapatakbo ng box (Windows EC2 sa likod ng permanenteng Elastic IP) ang Caddy mula sa isang **static na Caddyfile**: on-demand TLS na ang `ask` ay tumuturo sa `/membership/domains/authorize`, kasama ang host→upstream map file na nire-refresh kada 5 minuto mula sa `/membership/domains/hostmap` ng isang scheduled task na nagtatapos sa isang graceful na `caddy reload`. Nabubuhay ang config sa mga restart nang walang runtime state -- walang sayaw ng re-priming -- at ang hindi kilalang SNI ay **tinatanggihan ng TLS** (walang cert na minimint para sa host na tinanggihan ng `authorize`), habang ang host na pinahintulutan ngunit hindi pa namamapa (isang bagong domain sa loob ng sync window) ay nakakakuha ng malinis na 404. Nagiging routable ang mga bagong domain sa loob ng ~5 minuto mula sa save; ang mga certificate ay minimint sa unang hit. Build/setup, operasyon, at mga bitag na nasubukan na sa field: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legacy na runtime push -- rollback path, nakabinbing burahin

Maaari pa ring patakbuhin ng `CaddyHelper` (membership module) ang Caddy sa pamamagitan ng **admin API** nito sa `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; walang-gawa kapag walang nakatakda; lumalabas sa ilalim ng grupong Integrations ng `ServerHealthController`): ang `updateCaddy()` ay nagPATCH ng buong array ng mga route, at ang `initializeCaddy()` + ang mga endpoint na `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ay muling bumubuo ng runtime-configured na server mula sa simula. Ang config ng mode na iyon ay nasa memorya lamang ng Caddy -- ang restart-amnesia na pinalitan ng arkitekturang ito. Nananatili ang makinarya bilang rollback path lang at nakatakdang burahin kapag naging matatag na ang static box; ang best-effort na push na `updateCaddy()` sa save/delete ng domain ay isang hindi nakakapinsalang walang-gawa laban sa static box (localhost lang ang admin API nito).

## Mga Kaugnay na Pahina

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) -- ang mismong edge box: fresh-box setup, WinSW service, map sync task, at mga operasyonal na bitag
- [Website Builder](./website-builder) -- ang page/section/element tree, mga renderer, blog, SEO, at AI generation (ang nire-render kapag nareresolba na ang request sa isang simbahan/site)
- [Content Endpoints](../api/endpoints/content) -- ang REST surface para sa mga pahina, block, link, at global styles, lahat ay may `?siteId=` na ngayon
- [B1App](../web-apps/b1-app) -- ang Next.js app na nagho-host ng middleware at ng routing na `[sdSlug]`
- [Web App Deployment](../deployment/web-apps) -- kung paano dine-deploy ang B1App sa Vercel
