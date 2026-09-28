---
title: "Arkitektura ng Website Builder"
---

# Arkitektura ng Website Builder

<div class="article-intro">

Bawat website ng simbahan na inilaan ng B1App ay ginagawa mula sa isang content tree — mga pahina, seksyon, elemento — na nakaimbak sa ContentApi at binibigyang-editan ng biswal sa B1Admin. Isang ibinahaging library ng sangkap ang nagpapakita pareho sa editor preview at sa live site, isang elemento-uri na katalogo ang nagbibigay-kahulugan kung ano ang maaaring lumitaw sa isang pahina, at isang magkakahiwalay na AI service ay maaaring lumikha o isulat muli ang puno. Ang pahinang ito ay nagmamapa sa buong stack: ang elemento contract sa `@churchapps/helpers`, ang render pipeline, church-data na mga elemento, site-wide na widgets, ang blog layer, access-gated na mga pahina, SEO, AI generation, at conversational forms.

</div>

## Pangkalahatang-kahulugan

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Tatlong patakaran ang gumagana sa buong stack:

1. **Isang puno, dalawang renderer.** Isang pahina ay isang `pages → sections → elements` na puno kung saan bawat node ay nagdadala ng mga setting nito bilang isang `answers` JSON blob. Ang parehong apphelper components ay gumagawa ng drag-and-drop editor sa B1Admin at ang server-rendered public site sa B1App — walang hiwalay na "publish format".
2. **Ang kontrata ay nanananatili sa `@churchapps/helpers`.** Ang `ElementTypes.ts` ay ang iisang katalogo ng elemento uri; ang mga renderer ay nalulutas sa pamamagitan ng registry sa apphelper; ang editor forms ay nanananatili sa B1Admin. Ang pagdaragdag ng uri ng elemento ay nangangahulugang pagkakabit sa lahat ng tatlong, sa ganitong pagkakasunod-sunod.
3. **Ang public site ay nagbabasa ng mga anonymous na endpoint.** Lahat ng kailangan ng B1App — ang puno ng pahina, mga setting, blog posts, redirects, at ang church-data endpoints sa ibang modules — ay pampubliko. Ang auth ay opsyonal: ang JWT sa anonymous tree endpoint ay nagbubukas ng mga pahina na para sa members lamang, walang iba pang pagbabago.

## Ang content tree

Ang content module (`Api/src/modules/content`) ay may-ari ng data ng builder:

| Talahanayan | Tungkulin |
|-------|------|
| `pages` | Isang pahina bawat URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (access gating) at `metaDescription` (SEO) |
| `sections` | Pahalang na ribbons sa isang pahina (o sa isang block): background, text color, at isang `answersJSON` na nagdadala ng styling plus ang `dividerTop`/`dividerBottom` na shape-divider configs |
| `elements` | Mga content piece sa loob ng seksyon: `elementType` + `answersJSON`, nestable para sa uri ng layout (row/column, carousel) |
| `blocks` | Mga reusable na grupo ng seksyon/elemento (footer blocks, element blocks) na ibinahagi sa mga pahina |
| `posts` | Standalone na mga blog posts (tingnan ang [Blog](#blog)) |
| `redirects` | Per-church `fromPath → toPath` na mga pares, may hangganan sa 200 (tingnan ang [SEO](#seo-and-discoverability)) |
| `settings` | Key-value na mga setting ng simbahan; mga row na may flag na `public` ay ginagamit nang anonymous at nagdadala ng widget/analytics config |

Ang buong puno para sa isang URL ay bumabalik mula sa isang anonymous call — `GET /content/pages/:churchId/tree?url=/about` — na kung ano ang ginagamit ng B1App para sa server-render. Ang mga request ng editor ay nag-fetch ng ID at pinapanatili ang internal ids.

## Ang elemento contract

### Ang katalogo (`@churchapps/helpers`)

Ang `Packages/helpers/src/ElementTypes.ts` ay tumutukoy sa bawat uri ng elemento bilang isang `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, at isang JSON-schema-style na `answersSchema` para sa mga sagot nito. Ang `validateElementAnswers()` ay sadyang malaya — ang mga hindi kilalang uri at karagdagang mga key ay pumapasa, kaya ang lumang content ay hindi kailanman masira sa isang catalog upgrade. **35 na uri ay nagpapadala ngayon:**

| Kategorya | Mga elemento uri |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Ang elemento na `sermons` ay ang pinaka-makonfigurable sa mga uri ng simbahan: ang sagot na `layout` ay pumipili ng `browse` (ang legacy full browser), `grid`, `list`, o `featuredLatest`, na may `playlistId`, `itemCount`, `showTitles`, at `showDates` na pinipino ang mga non-browse layouts.

### Mga Renderer (`@churchapps/apphelper`)

Ang mga renderer ay nanananatili sa `Packages/apphelper/src/website/components/elementTypes/`, isang component bawat uri, na nalulutas sa pamamagian ng `ElementRegistry.ts` — isang dalawang-layer na mapa kung saan ang `Element.tsx` ay nagrehistro ng default renderer para sa lahat ng 35 uri (`registerDefaultElementRenderer`) at ang isang host app ay maaaring anumang override sa runtime (`registerElementRenderer`) nang walang paggagaya ng package.

### Mga editor form (B1Admin)

Ang mga form na setting bawat uri ng editor ay nanananatili sa `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` ay nagpapadala sa isang dedicated component (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o isang inline field builder bawat uri. Ang AI-facing mirror ng katalogong ito ay ang MCP ng API `describe_page_builder` tool (tingnan ang [MCP Server](../api/mcp)).

### Mga section shape dividers

Ang mga seksyon ay maaaring magdala ng dekoratibong shape dividers sa alinmang gilid. Ang config ay nanananatili sa seksyon ng `answersJSON` bilang `dividerTop` / `dividerBottom` na mga object — `{ shape, color, height, flip }` na may `shape` na isa sa `wave, waves, slant, curve, triangle, peaks`. Ang apphelper ay nagbabadal ng `SectionDivider` component at `parseDividerConfig()` helper; ang parehong apps' Section renderers (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) ay nag-parse ng mga sagot at i-mount ang divider, at ang `SectionEdit.tsx` sa B1Admin ay nagbibigay ng picker UI. Ang packages ay nagbabadal lamang ng building block — ang section-level wiring ay ang trabaho ng consuming apps.

## Mga elemento ng church-data

Tatlong uri ng elemento ay gumagawa ng live church data sa halip na ang authored content. Ang module isolation ay patuloy na gumagana — bawat isa ay tumatawag sa sariling public endpoint ng owning module mula sa browser:

| Elemento | Endpoint | Mga Tala |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Nagbabalik ng `{ fundId, totalAmount, donationCount }`, opsyonal `?startDate=&endDate=` window; ang elemento ay inihahambing ito sa sariling `goalAmount` answer |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in lamang**: ang grupo ay dapat may `publicRoster` na itinakda (default off). Ang projection ay sadyang minimal — `personId`, `displayName`, `leader`, photo — walang contact o demographic na mga field |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Nagbabalik ang campus → service → time tree; ang apphelper renderer ay naglalabas ng best-effort schema.org `Event` JSON-LD mula dito (ang API ay nagbabalik ng plain data) |

:::warning
Ang `publicRoster` ay ang privacy gate para sa `staffGrid`. Huwag palawakin ang public group-member projection o lampasan ang flag — ang roster endpoint ay anonymous by design at ang minimal field list ay ang safety property.
:::

## Mga site-wide na widgets

Dalawang widgets ay gumagawa sa bawat public page sa halip na sa loob ng puno: **AnnouncementBanner** (dismissible top-of-page bar) at **Launcher** (floating action hub para sa give/visit/watch-style links). Ang parehong components at ang kanilang `parse*Config()` helpers ay nagbabadal sa apphelper. Ang configuration ay dalawang public settings na row — mga key `announcementBanner` at `launcher` — isinusulat ng B1Admin ng `SiteWidgetsEdit` (sa Appearance page) at binabasa ng B1App's public layout sa pamamagian ng `GET /content/settings/public/:churchId`. Ang API ay tinatrato ang mga ito bilang opaque key-value na mga pares; ang mga pangalan ng key ay isang convention sa pagitan ng dalawang apps.

## Blog

Ang blog ay isang standalone content type, hindi isang layer sa itaas ng builder pages. Ang isang `posts` row ay naglalaman ng buong post: `title`, `slug`, `excerpt`, `content` (markdown body), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Ang public surface (lahat ng anonymous, `PostController`):

| Ruta | Layunin |
|-------|---------|
| `GET /content/posts/public/:churchId` | Naglathala ng mga posts, filterable ng `?category=&tag=`, paginated |
| `GET /content/posts/public/:churchId/categories` | Mga distinct na kategorya sa buong naglathala ng mga posts |
| `GET /content/posts/public/:churchId/slug/:slug` | Isang naglathala ng post |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed, may titulo sa pangalan ng simbahan, may per-item category at excerpt-or-content description |

Isang post ay "published" kapag ang `publishDate` ay itinakda at lumipas na; isang hinaharap na `publishDate` ay isang scheduled post (nakatagpo sa publiko, ipinakita na may Scheduled chip sa admin). Ang mga read endpoints ay nagpapayaman ng bawat post na may `authorName`, na nalulutas mula sa `authorId` sa pamamagian ng membership module gateway. Ang nawawalang excerpts ay bumabalik sa stripped-markdown content (~160 chars) sa listing cards, meta descriptions, at RSS. Ang B1App ay gumagamit ng `/{sdSlug}/blog` — isang editorial listing (centered header na nagiging active category/tag name kapag nafi-filter, category-chip filter row, thumbnail-left post rows na may bylines at excerpts) na may RSS feed na ina-advertise bilang alternate link — at `/{sdSlug}/blog/[postSlug]`, isang dedicated route (hindi ang Zone/Section pipeline) na may centered header (category kicker, title, byline, primary-color accent rule), isang 16:9 hero sa container width, ang markdown body sa isang ~720px reading column, tag chips sa article footer, isang `"More in {category}"` related-posts strip, at `BlogPosting` JSON-LD kasama ang author. Ang parehong mga pahina ay nag-istilo ng buong-buwo mula sa theme tokens upang magmana sila ng bawat palette ng simbahan. Ang mga Blog URL ay kasama sa per-church sitemap. Ang B1Admin's authoring UI (**Site → Blog**) ay nag-edit ng mga posts sa isang dialog: markdown editor na may preview toggle, 16:9-cropped gallery image picker, author person-picker (defaults sa editing user), category autocomplete na binubuo mula sa existing categories, duplicate-slug validation, at isang publish toggle; ang mga naglathala ng row ay may link sa live post, at ang pahina ay nagtutulak sa mga admin na magdagdag ng `/blog` navigation link.

## Mga pahina lamang para sa members

Ang `pages.visibility` ay muling gumagamit ang navigation-links enum — `everyone` (default), `visitors`, `members`, `staff`, `team`, `groups` (na may `groupIds`) — ngunit bilang isang **hard access gate**, hindi isang nav filter (`PageVisibilityHelper.canViewPage`). Ang daloy:

1. Ang anonymous tree endpoint ay sinusuri ang visibility sa URL-based na fetches. Ang mga anonymous callers ng isang gated page ay nakakakuha ng `{ restricted: true, visibility }` sa halip ng content — ang puno ay hindi kailanman nag-leak.
2. Ang endpoint ay nagpapatuloy na gumagalang sa JWT: `CustomAuthProvider` ay nag-verify ng `Authorization` header sa *bawat* request, kasama ang anonymous routes, kaya ang isang authenticated member's fetch ng parehong URL ay nalulutas nang normal.
3. Ang B1App ay gumagawa ng `RestrictedPage` sa isang `restricted` response: ito ay nag-hydrate ng session mula sa nakaimbak na credentials, muling nag-fetch ng puno na may JWT, at ito ay gumagawa — o nagpapakita ng login gate na may `returnUrl` kapag walang session.

:::info
Ang granularity ng gate ay nag-iiba depende sa antas: `groups` ay sinusuri ang token's `groupIds` laban sa list ng pahina at `staff` ay sinusuri ang `membershipStatus`, ngunit `members` at `team` ay kasalukuyang pumapasa sa kahit anong authenticated user ng simbahan. Tratuhin ang `groups` bilang ang strict option.
:::

## SEO at discoverability

Lahat ng ito ay B1App-side rendering sa itaas ng ContentApi data — ang API ay nag-iimbak, ang app ay naglalabas:

| Alalahanin | Paano ito gumagana |
|---------|--------------|
| Meta descriptions | Ang `pages.metaDescription` (≤300 chars) ay dumaloy sa pamamagian ng `MetaHelper.getMetaData()` sa Next.js `Metadata` (description + Open Graph) sa bawat builder-rendered route. Ang B1Admin's page settings ay may kasamang AI "Generate" button (tingnan sa ibaba) |
| Redirects | Per-church `redirects` na mga row na pinamamahalaan sa `/content/redirects` (`content.edit`, 200-row cap, normalized paths). Sa isang magiging 404, ang B1App's page route ay nalulutas ang path laban sa `GET /content/redirects/public/:churchId` at naglalabas ng HTTP 308 sa pamamagian ng Next's `permanentRedirect`; ang unmached paths ay bumubuo sa `notFound()` |
| Branded 404 | Ang `not-found.tsx` ay gumagawa ng `BrandedNotFound` na may logo, pangalan, at tema ng simbahan sa halip na isang generic error |
| Structured data | Ang `BlogPosting` JSON-LD sa mga blog posts; `VideoObject` sa per-sermon pages (`/{sdSlug}/sermons/[sermonId]`) at sa mga pahina na naglalaman ng `sermons` element; `Event` mula sa calendar/event elements sa builder pages; schema.org `Event` mula sa `serviceTimes` element |
| Sermon pages | Bawat public sermon ay nakakakuha ng isang crawlable page sa `/sermons/[sermonId]` na may full metadata — ang mga sermon ay hindi na locked sa loob ng client-side browser element |
| Analytics | Ang public settings key `ga4MeasurementId` (pinamamahalaan sa tabi ng redirects sa B1Admin) ay nag-inject ng per-church GA4 gtag sa pamamagian ng `next/script` |
| Sitemap & feeds | Ang per-church `sitemap.xml` route ay may kasamang builder pages at blog URLs; ang blog listing ay nag-advertise ng RSS feed |
| Accessibility | Ang public chrome ay gumagawa ng skip link na targeting ang `<main id="main-content">` landmark sa bawat layout wrapper |

## AI generation (AskApi)

Ang generation ng pahina at site ay tumatakbo sa **AskApi**, isang hiwalay na serbisyo, sa ilalim ng `/website` controller. Ito ay nag-authenticate na may parehong `CustomAuthProvider` JWT bilang lahat at ay **stateless na may kaugnayan sa content**: bawat endpoint ay nagbabalik ng JSON at ang caller (B1Admin) ay nag-persist ng resulta sa pamamagian ng ContentApi (`POST /content/pages/importTree` ay lumilikha ng isang pahina na may buong nested section/element tree sa isang tawag; ito ay palaging nagsasama sa churcho ng caller at binabalewala ang ids sa body).

### Ang generation ng pahina (`planPage` → `writePage`)

Ang template ng "AI" page sa B1Admin's `AddPageModal` ay gumagamit ng isang low-cost pipeline (`AskApi/src/helpers/SiteGenHelper.ts`) na binuo sa isang patakaran: **walang model na kailanman naglalabas ng builder JSON**. Dalawang models ay naghahati ng trabaho sa pamamagian ng Vercel AI Gateway (plain HTTP, SSM key `/{env}/aiGatewayApiKey` o `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — isang typed-decision model na nagbabalik ng mga pagpipilian, mga iskor at booleans na may probabilities ngunit hindi maaaring magsulat ng teksto. Ito ay pumipili ng bawat seksyon nang maingat mula sa isang fixed template library, ay nagsisikap ng layouts, fact-checks copy, at pumipili ng stock photos at icons. Ang input cost ay tungkol sa $0.04 bawat milyong tokens at ang output ay libre, kaya ~90 calls bawat pahina ay nagkakahalaga ng bahagi lamang ng isang sentimo.
- **Isang maliit na chat model (GPT-4.1 mini by default)** — pumupunan ang named, length-capped text slots ng mga piniling templates. Ang writer ay isang constant, overable na may `SITEGEN_COPY_MODEL` environment variable (kahit anong chat model id sa gateway, hal. `anthropic/claude-haiku-4.5`). Sa isang blind side-by-side sa tatlong simbahan ang Claude Haiku 4.5 ay nag-basang medyo mas mainit, ngunit ang GPT-4.1 mini ay malapit, humigit-kumulang 4x mas murang at mas mabilis, kaya ito ang default. Isang buong pahina na may lahat ng tatlong layouts ay nagkakahalaga ng tungkol sa 1.3 sentimo, humigit-kumulang 80% nito ang writer.

| Phase | Endpoint | Ano ang nangyayari |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Ay nagsisikap ng uri ng pahina (home, visit, about…), pagkatapos ay nag-sample ng 10 candidate layouts mula sa per-round probabilities ng JEV (hero + section count → bawat seksyon → mas malapit), ay nag-de-duplicate, ay may JEV score bawat fit/flow/gaps, at nagbabalik ng top 3 plus isang writing voice at isang `suggestedStyle` (palette + fonts). Ang mga kandidato na nagbabahagi ng parehong mga seksyon sa hinaharap ay nag-tanong sa JEV ng isang parehong tanong, kaya ang mga round ay naka-memorize ng prefix. Ang isang best score sa ilalim ng 6 ay naka-log bilang `lowLayoutScore` — ang log na ito ay ang backlog ng templates na sulit na idagdag. ~2s |
| 2 | `POST /website/writePage` (isang tawag bawat kandidato) | Ang writer ay pumupunan ang slot copy dalawang seksyon bawat tawag, sa parallel, at nagbabalik ng limang hero headlines na pumipili ang JEV; JEV fact-checks bawat seksyon; mga seksyon na nabigo, gumagamit ng stock phrase, o muling sinasabi ang isang mas maaga na seksyon (shared 4-word runs, sinuri sa code) ay muling isinusulat sa parallel na may specific reason; ang code scrub ay bumubuo ng mga pangungusap na may stock church-site phrases (maliban kung ang paglalarawan ng sarili ng simbahan ay gumagamit ng mga ito); JEV ay pumipili ng photo subjects, icons at ang hero's shape divider, at nagsisikap ng resulta. Nagbabalik ng isang ready-to-save section tree at isang iskor. ~6–9s |
| 3 | `POST /content/pages/importTree` | Ang B1Admin ay nagsusulat lamang ng best-ranked layout (ang runner-up ay isang fallback kung ang sulatin na ito ay nabigo), ay nagsasave at bumubukas ng preview (~10s pagkatapos ng Save) |

Bawat phase ay sariling request upang bawat tawag ay manatili sa loob ng API Gateway 29-segundo na hangganan. Ang mga template sa `SiteGenHelper.buildTree` ay fixed section + element trees mula sa katalogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) at mag-reference ng theme tokens (`var(--accent)`, `var(--lightAccent)`…), kaya ang mga generated pages ay mangyari ang charger ng existing appearance settings ng simbahan. Ang pagdaragdag ng isang section template ay nangangahulugang pagdaragdag ng slot list nito sa `SECTIONS` at ang tree nito sa `buildTree`; ang unit test ay sumasalamin sa bawat template at nag-validate ng puno.

**Mga Input.** Ang copy ay maaaring lamang magbigay ng mga katotohanan mula sa dalawang source: kung ano ang ino-type ng user, at `churchContext.facts` — mga record na kinokolekta ng B1Admin bago magplano (public service times at public group names, plus ang pangalan at address ng simbahan). Ang parehong mga flag ay gate ng data-backed templates: `times` ay gumagawa ng live `serviceTimes` element kapag ang simbahan ay kumukuha ng service times sa B1 (isang typed table sa halip), `groups` at `countdown` ay inaalok lamang kapag may data sa likod nila. Ang mga JEV call ay naka-hedge — isang duplicate ay bumabangon pagkatapos ng 1.5s at ang unang sumasagot ay nanalo — dahil ang gateway ay minsan ay tumitigil at ang mga tawag ay halos libre.

**Panatiling sa paksa.** Ang prompt ng user ay ang *paksa ng pahina*, hindi background tungkol sa simbahan. Ang `planPage` ay nagsisikap ng request (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), at para sa `event` at `topic` pages ang general-church templates (pastor note, sermons, ministries, groups, community impact, weekly times at countdown, video hero) ay hindi ina-alok, habang ang `details` (kailan / saan / kung ano ang dadalhin) at isang date `eventCountdown` ay. Ang parehong mga hukom ay nagsisikap ng on-topic-ness. Ang B1Admin ay gumagamit ng `pageType` mula sa plano sa bawat tawag ng `writePage`.

**Buong mga pahina mula sa maikling mga kahilingan.** Ang mga pahina ay may tatlong hanggang anim na middle sections, generous slot lengths, isang intro line sa card sections at isang limang-tanong FAQ, at ang repair pass ay nagpapalapad ng kahit anong seksyon na bumabalik na napakaliit. Ang generation ay isang click: walang follow-up questions. Kung saan ang kahilingan ay umuusog ng isang ordinaryong detalye na kailangan ng isang kumpletong pahina (isang start time, isang room, kung ano ang dadalhin, paano mag-sign up), ang writer ay pumupunan ito na may isang malambot, maliit na pagpipilian para sa simbahan na mag-edit. Dahil ang mga seksyon ay isinusulat sa parallel, ang mga agapan ay pinili **minsan**, sa `planPage` (`assumedDetails`, isang maliit na writer call na tumatakbo sa tabi ng layout sampling), at ipinabalik pabalik sa bawat tawag ng `writePage` sa pamamagian ng `churchContext.assumedDetails`, kaya ang isang seksyon ay hindi maaaring magsabi ng 5:00 habang ang iba ay nagsasabi ng 5:30. Ang JEV ay nag-repair ng kahit anong seksyon na sumasalungat sa kahilingan, ang mga record ng simbahan o ang mga na-desisyon na detalye. Ang mga na-desisyon na detalye ay hindi na-surface sa UI; ang simbahan ay sinusuri at nag-edit ng pahina tulad ng anuman. Ang ilang mga bagay ay hindi kailanman ginawa: mga pangalan ng mga tao, mga numero ng telepono, email at web addresses, mga presyo, mga istatistika, ang kasaysayan ng simbahan, mga quote na ina-attribute sa mga tao, at isang araw ng linggo para sa isang petsa na ang kahilingan ay hindi nagbigay ng isa para.

**Mga Larawan.** Ang mga template ay hindi kailanman nag-pangalan ng kanilang mga larawan o icons. Sila ay nag-iiwan ng mga puwang bukas, at isang generic pass (`visualSlots` → `pickVisuals` → `applyVisuals` sa `SiteGenHelper`) ay tumutukoy sa natapos na puno at pumupunan ng bawat isa: isang section background o gallery entry na minarkahan `auto:photo`, isang `auto:icon`, ang hero's `auto:divider`, at, walang marker sa lahat, kahit anong `textWithPhoto`, `card` o `image` element na ang `photo` ay walang laman. Ang JEV ay pumipili sa bawat mula sa teksto sa tabi nito (ang larawan ng isang card mula sa title at teksto ng card na iyon; isang background mula sa copy ng seksyon), na walang paksa na inulit sa isang pahina. Ang isang bagong template kaya ay nakakakuha ng mga larawan nang libre. Ang mga larawan ay Pexels search subjects na inilabas bilang `pexels:<term>` placeholders na resolbahin ng B1Admin sa pamamagian ng `POST /content/stock/search`; ang isang client na hindi nagpapadala ng `resolvesPhotos` ay nakakakuha ng isang built-in hero image, flat colored bands at photo-less cards sa halip. Walang sadyang portrait subjects at ang pastor template ay walang larawan: ang stock stranger ay dapat hindi kailanman tumayo sa halip ng isang tunay na tao. Para sa isang simbahan na walang mga pahina pa, ang B1Admin ay nag-apply ng `suggestedStyle` sa mga pandaigdigang istilo; ang mga existing sites ay pinapanatili ang kanilang hitsura.

### Iba pang mga endpoint

:::info
Ang `SectionToolbar` rewrite button at ang pages-list "Generate Site" button sa B1Admin ay nananatiling naka-comment out client-side. Ang AskApi endpoints sa ibaba ay patuloy na tumutugon; lamang ang UI na ito ay nakataggo.
:::

| Endpoint | Layunin |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Ang orihinal na dalawang-hakbang na pahina flow (outline, pagkatapos ay isang LLM call bawat seksyon naglalabas ng element JSON). Pinalitan sa B1Admin ng `planPage`/`writePage` dahil sa gastos; pinanatili para sa API consumers |
| `POST /website/generateSite` | Buong-site generation. **Dalawang-phase by design**: isang `planOnly: true` call ay nagbabalik lamang ng multi-page plan (isang mabilis na model call), pagkatapos ang client ay humihiling ng buong content — pinapanatili ang bawat request sa loob ng Lambda/API-Gateway timeout |
| `POST /website/rewriteSection` | Rewrite na nag-preserve ng structure: ang model ay maaaring lamang baguhin ang text-bearing answers. Isang recursive structure signature (ids + types + order) ay inihambing bago at pagkatapos; ang kahit anong mismatch ay nagbabalik ng orihinal na seksyon na may `fallback: true` sa halip na corrupted structure |
| `POST /website/generateAltText` | Vision call sa itaas ng hanggang 20 image URLs; nagbabalik ng concise alt text (≤125 chars, "photo of" prefixes na naiwan) |
| `POST /website/generateMetaDescription` | Isang SEO meta description (≤155 chars) mula sa content ng teksto ng pahina — na-wire sa Generate button sa page settings ng B1Admin |

Ang mga prompts para sa mga endpoint na ito ay mga markdown files sa ilalim ng `AskApi/config/instructions/`, kasama ang elemento katalogo na ang model ay bumubuo mula sa. Dalawang design points ay pinapanatili ang katalogo na matapat: ang client ay pumipasa ng `availableElementTypes` sa bawat kahilingan (ang prompt ay maaaring lamang gumamit ng uri mula sa listang iyon — ang server ay hindi kailanman hardcodes ang buong set), at ang MCP ng API `describe_page_builder` tool ay nagdadala ng parehong gabay para sa AI agents na gumagana sa pamamagian ng [MCP](../api/mcp). Ang mga modelo ay Anthropic Claude sa pamamagian ng OpenRouter — 3.5 Haiku para sa section content (latency), 3.5 Sonnet para sa outlines, site plans, at vision — na may OpenAI fallback kapag walang OpenRouter key na configured.

## Mga conversational form

Ang mga form (membership module) ay nakakuha ng isang conversational mode na nakatuon sa mga connect-card-style pages. Apat na column sa `forms` ay nag-drive dito: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — ang apphelper's `FormSubmissionEdit` ay lumipat sa `ConversationalForm` component (isang tanong sa isang pagkakataon) kapag ang `displayMode` ay `conversational`; ang form page ng B1App ay gumagamit ng mode sa pamamagian ng. Parehong submission payload sa alinmang paraan.
- **Auto-create person** — sa submission na may `autoCreatePerson` na itinakda, `ConversationalFormHelper.findOrCreatePerson` ay dedups ng email (case-insensitive) at sa halip ay lumilikha ng household + person na may `membershipStatus: "Guest"`, pagkatapos ay nag-link ng submission sa taong iyon.
- **Follow-up email** — kapag isang subject at body ay itinakda, ang submitter ay nakakakuha ng isang templated email (na may `{firstName}` / `{churchName}` tokens) sa pamamagian ng existing transactional path (`TransactionalEmailHelper`), hindi kailanman ang notification digest door. Ang parehong side-effects ay non-fatal: ang pagkabigo ay hindi kailanman mawawala ang submission.

Ang apat na larangan ay itinakda sa pamamagian ng API ngayon; ang form editor ng B1Admin ay hindi pa nag-eexpose ng mga ito.

## Ang public-site cache

Ang public render path ng B1App ay nag-cache ng church-tagged fetches (`next: { revalidate: 300, tags: [sdSlug] }` sa production; `0` sa dev) kaya ang isang live page ay maaaring manatiling stale hanggang limang minuto pagkatapos ng ContentApi write. Ang `POST /api/revalidate/{sdSlug}` sa B1App ay tumatawag ng `revalidateTag(sdSlug)` at ang tanging paraan upang ibagsak ang cache na iyon nang maaga.

Dalawang writers ay tumama dito:

1. **B1Admin** — `clearSiteCache()` sa `B1Admin/src/site/siteCache.ts` ay nag-POST pagkatapos ng editor saves. Ito ay preferred ng active site's subdomain (ang secondary site ay dapat mag-bust ng *iyon* tag, hindi ang default ng simbahan).
2. **Api** — Ang content mutations na hindi kailanman dumaan sa B1Admin (API keys, MCP, AI) ay sumusulong `SiteCacheHelper.bump(churchId)` mula sa mga content controllers. Ang helper ay nalulutas ang church subdomain sa pamamagian ng `SubDomainHelper` at nag-POST ng `{b1AppRoot}/api/revalidate/{sd}`. Ang mga pagkabigo ay navalwal kaya ang isang hindi maaabot na B1App ay hindi maaaring mabigo ang isang save.

Ang mga controllers na bumubuo: pages (save, delete, duplicate, publish, discard, unpublish, AI temp), sections, elements, blocks, links, global styles, posts, at redirects. Dev `b1AppRoot` ay `http://{subdomain}.localtest.me:3301`; demo/staging/prod ay gumagamit ng `https://{subdomain}.b1.church`.

## Mga Kaugnay na Pahina

- [Website Routing & Multi-Site](./websites) — kung paano ang isang request ay nalulutas sa isang simbahan/site at kung paano ang mga custom domains ay nag-ruta
- [Content Endpoints](../api/endpoints/content) — buong REST surface para sa mga pahina, seksyon, elemento, blocks, posts, redirects, at settings
- [AppHelper](../shared-libraries/app-helper) — ang npm package na nagbabadal ng mga renderer, registry, dividers, at widgets
- [MCP Server](../api/mcp) — kasama ang `describe_page_builder` guide tool
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — ang staff-facing editor documentation
