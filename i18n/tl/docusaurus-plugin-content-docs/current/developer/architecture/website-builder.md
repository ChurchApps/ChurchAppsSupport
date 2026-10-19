---
title: "Arkitektura ng Website Builder"
---

# Arkitektura ng Website Builder

<div class="article-intro">

Ang bawat website ng simbahan na sineserbisyohan ng B1App ay nire-render mula sa isang content tree -- mga page, seksyon, at element -- na nakaimbak sa ContentApi at ine-edit nang biswal sa B1Admin. Iisang shared component library ang nagre-render sa parehong editor preview at sa live site, iisang element-type catalog ang nagtatakda kung ano ang maaaring lumitaw sa isang page, at magagawa o mabago ng hiwalay na AI service ang tree na iyon. Ipinapakita ng pahinang ito ang buong stack: ang element contract sa `@churchapps/helpers`, ang render pipeline, mga church-data element, mga site-wide widget, ang blog layer, mga page na may access gate, SEO, AI generation, at mga conversational form.

</div>

## Pangkalahatang Tanaw

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

Tatlong patakaran ang nalalapat sa buong stack:

1. **Iisang tree, dalawang renderer.** Ang page ay isang `pages → sections → elements` tree kung saan ang bawat node ay may dalang settings nito bilang `answers` JSON blob. Ang parehong apphelper component ang nagre-render sa drag-and-drop editor sa B1Admin at sa server-rendered na public site sa B1App -- walang hiwalay na "publish format".
2. **Nasa `@churchapps/helpers` ang contract.** Ang `ElementTypes.ts` ang iisang catalog ng mga element type; ang mga renderer ay nagre-resolve sa pamamagitan ng registry sa apphelper; nasa B1Admin ang mga editor form. Ang pagdaragdag ng element type ay nangangailangan ng pagbabago sa tatlong lugar na ito, sa ganoong pagkakasunod.
3. **Anonymous endpoint ang binabasa ng public site.** Lahat ng kailangan ng B1App -- ang page tree, settings, blog post, redirect, at mga church-data endpoint sa ibang module -- ay public. Opsyonal ang auth: ang JWT sa anonymous tree endpoint ay nagbubukas ng mga page para sa mga miyembro lamang, at walang ibang nagbabago.

## Ang content tree

Ang content module (`Api/src/modules/content`) ang may-ari ng data ng builder:

| Table | Tungkulin |
|-------|------|
| `pages` | Isang page bawat URL: `url`, `title`, `layout`, kasama ang `visibility`/`groupIds` (access gating) at `metaDescription` (SEO) |
| `sections` | Mga pahalang na banda sa isang page (o sa isang block): background, kulay ng teksto, at isang `answersJSON` na nagdadala ng styling pati ang mga shape-divider config na `dividerTop`/`dividerBottom` |
| `elements` | Mga piraso ng content sa loob ng isang seksyon: `elementType` + `answersJSON`, puwedeng i-nest para sa mga layout type (row/column, carousel) |
| `blocks` | Mga reusable na grupo ng seksyon/element (footer block, element block) na ibinabahagi sa mga page |
| `posts` | Mga hiwalay na blog post (tingnan ang [Blog](#blog)) |
| `redirects` | Mga pares na `fromPath → toPath` kada simbahan, hanggang 200 (tingnan ang [SEO](#seo-and-discoverability)) |
| `settings` | Mga key-value na setting ng simbahan; ang mga row na may flag na `public` ay ibinibigay nang anonymous at dala ang config ng widget/analytics |

Ang buong tree para sa isang URL ay ibinabalik ng iisang anonymous na tawag -- `GET /content/pages/:churchId/tree?url=/about` -- na siyang pinagre-render-an ng B1App sa server. Ang mga request ng editor ay kumukuha sa pamamagitan ng id sa halip at pinananatili ang mga internal id.

## Ang element contract

### Ang catalog (`@churchapps/helpers`)

Tinutukoy ng `Packages/helpers/src/ElementTypes.ts` ang bawat element type bilang isang `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, at isang `answersSchema` na nasa estilo ng JSON-schema para sa mga answer nito. Sadyang maluwag ang `validateElementAnswers()` -- ang mga hindi kilalang type at dagdag na key ay pinapayagan, kaya hindi nasisira ang lumang content kapag na-upgrade ang catalog. **35 type ang kasama ngayon:**

| Kategorya | Mga element type |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Ang element na `sermons` ang pinakamaraming maaaring i-configure sa mga church type: pinipili ng answer na `layout` ang `browse` (ang lumang buong browser), `grid`, `list`, o `featuredLatest`, kung saan pinipino ng `playlistId`, `itemCount`, `showTitles`, at `showDates` ang mga layout na hindi `browse`.

May dalawang answer ang elementong `rawHTML`: `rawHTML` (markup) at `javascript`. Hindi kailanman tumatakbo ang mga script na ipinasok sa pamamagitan ng `innerHTML`, kaya muling binubuo ng `RawHTMLElement` ang bawat `<script>` node sa markup bilang bagong element. Ang mga node na hindi ipinasok ng parser na ito ay pinagkakatiwalaan sa ilalim ng `strict-dynamic` ng CSP. Ang answer na `javascript` na nagsisimula sa `<` (isang vendor snippet na idinikit kasama ang mga `<script>` tag nito) ay ina-parse bilang markup at tinatrato sa parehong paraan. Kung hindi, tumatakbo ito bilang simpleng inline script. Nagbababala ang B1Admin kapag bare URL lamang ang nasa JavaScript box, dahil ang nag-iisang URL ay tumatakbo bilang walang-silbing script. Walang nire-render ang elementong `map`, at hindi nito nilo-load ang Google Maps script kapag walang naka-configure na Maps API key.

### Mga renderer (`@churchapps/apphelper`)

Nasa `Packages/apphelper/src/website/components/elementTypes/` ang mga renderer, isang component bawat type, at nire-resolve ang mga ito sa pamamagitan ng `ElementRegistry.ts` -- isang two-layer na map kung saan ang `Element.tsx` ay nagre-register ng default renderer para sa lahat ng 35 type (`registerDefaultElementRenderer`) at maaaring i-override ng host app ang alinman sa mga ito sa runtime (`registerElementRenderer`) nang hindi nagfa-fork ng package.

### Mga editor form (B1Admin)

Nasa `B1Admin/src/site/admin/elements/` ang mga form ng settings ng editor para sa bawat type -- ang `ElementEdit.tsx` ay nagdi-dispatch sa isang nakalaang component (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, ...) o sa isang inline field builder para sa bawat type. Ang AI-facing na salamin ng catalog na ito ay ang MCP tool ng API na `describe_page_builder` (tingnan ang [MCP Server](../api/mcp)).

Ginagamit ng editor preview ang parehong `Theme` ng live site, na nagtatakda ng mga CSS variable na `--headingFont` / `--bodyFont` mula sa global styles ng simbahan. Ina-apply ng B1App ang mga variable na iyon sa pamamagitan ng `pages.css`, na hindi kayang i-import ng B1Admin, kaya nag-iinject ang `ContentEditor.tsx` ng `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) para ilapat ang mga ito sa body text ng `.page` at sa `h1`–`h6`. Kung wala ito, ang preview ay magpapakita ng mga heading sa admin font.

### Mga section shape divider

Maaaring magdala ng pandekorasyong shape divider ang mga seksyon sa alinmang gilid. Nasa `answersJSON` ng seksyon ang config bilang mga object na `dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }` kung saan ang `shape` ay isa sa `wave, waves, slant, curve, triangle, peaks`. Ibinibigay ng apphelper ang component na `SectionDivider` at ang helper na `parseDividerConfig()`; parehong nagpa-parse ng mga answer at nagmo-mount ng divider ang mga Section renderer ng dalawang app (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`), at nagbibigay ng picker UI ang `SectionEdit.tsx` sa B1Admin. Ang mga package ay nagbibigay lamang ng building block -- ang section-level wiring ay trabaho ng mga app na gumagamit nito.

## Mga church-data element

Tatlong element type ang nagre-render ng live na data ng simbahan sa halip na authored na content. Umiiral pa rin ang module isolation -- bawat isa ay tumatawag sa sariling public endpoint ng module na nagmamay-ari nito mula sa browser:

| Element | Endpoint | Mga tala |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Nagbabalik ng `{ fundId, totalAmount, donationCount }`, opsyonal na `?startDate=&endDate=` na window; ikinukumpara ito ng element sa answer nitong `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in lamang**: dapat naka-set ang `publicRoster` ng group (default na naka-off). Sadyang minimal ang projection -- `personId`, `displayName`, `leader`, larawan -- walang contact o demographic na field |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Nagbabalik ng tree ng campus → service → oras; ang apphelper renderer ay naglalabas ng best-effort na schema.org `Event` JSON-LD mula rito (plain data lamang ang ibinabalik ng API) |

:::warning
Ang `publicRoster` ang privacy gate ng `staffGrid`. Huwag kailanman palawakin ang public group-member projection o laktawan ang flag -- anonymous ang roster endpoint sa disenyo, at ang minimal na listahan ng field ang safety property nito.
:::

### Calendar element at mga event page

Ang mga answer ng `calendar` element ay `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, ang default, o `upcoming`), at `tag`. Ino-override ng B1App ang apphelper renderer sa `src/components/Element.tsx` gamit ang `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** ay nire-render ang `UpcomingEventsElement` ng B1App: kumukuha ito mula sa `GET /content/events/public/group/:churchId/:groupId` o `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, pinapalawak ang mga pag-uulit gamit ang `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, isang occurrence bawat event sa loob ng isang taon), at ipinapakita ang unang 12 bilang photo tile (`events.photoUrl`, at kapag wala ay ang pamagat sa dark color ng theme) na nagli-link sa `/events/{id}`, kasama ang Subscribe menu para sa ICS feed ng kalendaryo.
- **`display: "month"`** ay nire-render ang `CalendarElement` ng apphelper na may `eventUrl` callback. Ang `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` ay nagna-navigate sa URL na iyon kapag na-click sa halip na magbukas ng detail dialog (hindi nagpapasa ng `eventUrl` ang B1Admin, kaya nananatili ang dialog sa admin calendar).
- **`tag`** ay nagfi-filter sa parehong display gamit ang `EventHelper.hasTag()` (`@churchapps/helpers`): case-insensitive na pagtutugma sa comma-separated na `events.tags`; kapag walang laman, ipinapakita ang lahat. Ang join ng curated calendar ay pumipili ng `e.tags` para dala ng mga curated event ang mga ito.

Ang mga curated event ay nagli-link sa pamamagitan ng `realEventId` (`eventPageId()`), kaya palaging ang underlying event ang pinapangalanan ng URL. Ang `/{sdSlug}/events/[eventId]` ay isang nakalaang route (hindi ang builder pipeline): nilo-load nito ang `GET /content/events/public/:churchId/:id` -- na nagbabalik ng `null` para sa pending/rejected na event at para sa private na event na walang registration, at nagdadagdag ng `roomNames` mula sa mga room booking na hindi rejected -- nire-render ang `EventPageContent` (photo hero, markdown na deskripsyon, aside na When/Where, **Magparehistro para sa Event na Ito** kapag naka-on ang `registrationEnabled`, at link na **Idagdag sa aking calendar** papunta sa `GET /content/events/public/:churchId/:id/ical`), ginagamit ang larawan bilang Open Graph image, at naglalabas ng `Event` JSON-LD para sa susunod na occurrence sa pamamagitan ng `EventPageJsonLd`. Ang hindi kilala o nakatagong event ay nagbabalik ng tunay na 404.

## Mga site-wide na widget

Dalawang widget ang nagre-render sa bawat public na page sa labas ng tree: ang **AnnouncementBanner** (dismissible na bar sa itaas ng pahina) at ang **Launcher** (floating action hub para sa mga link na tulad ng give/visit/watch). Parehong component at ang kanilang `parse*Config()` helper ay nasa apphelper. Dalawang public settings row ang configuration -- mga key na `announcementBanner` at `launcher` -- na isinusulat ng `SiteWidgetsEdit` ng B1Admin (sa pahinang Appearance) at binabasa ng public layout ng B1App sa pamamagitan ng `GET /content/settings/public/:churchId`. Itinuturing ng API ang mga ito bilang opaque na key-value pair; ang mga pangalan ng key ay kasunduan sa pagitan ng dalawang app.

## Blog

Hiwalay na content type ang blog, hindi isang layer sa ibabaw ng mga builder page. Ang isang row ng `posts` ay naglalaman ng buong post: `title`, `slug`, `excerpt`, `content` (markdown na katawan), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Public na bahagi nito (lahat ay anonymous, `PostController`):

| Route | Layunin |
|-------|---------|
| `GET /content/posts/public/:churchId` | Mga na-publish na post, maaaring i-filter sa `?category=&tag=`, may pagination |
| `GET /content/posts/public/:churchId/categories` | Mga natatanging kategorya sa mga na-publish na post |
| `GET /content/posts/public/:churchId/slug/:slug` | Isang na-publish na post |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed, may pamagat ayon sa pangalan ng simbahan, kasama ang kategorya ng bawat item at deskripsyon na excerpt o content |

Ang post ay "published" kapag nakatakda na ang `publishDate` at lumipas na; ang `publishDate` sa hinaharap ay scheduled post (nakatago sa publiko, at ipinapakitang may chip na Scheduled sa admin). Dinadagdagan ng read endpoint ang bawat post ng `authorName`, na nire-resolve mula sa `authorId` sa pamamagitan ng membership module gateway. Kapag walang excerpt, ang stripped-markdown na content (~160 character) ang ginagamit sa listing card, meta description, at RSS. Nagse-serve ang B1App ng `/{sdSlug}/blog` -- isang editorial listing (naka-center na header na nagiging pangalan ng aktibong kategorya/tag kapag naka-filter, row ng category-chip na filter, mga post row na may thumbnail sa kaliwa at byline at excerpt) kasama ang RSS feed na ina-advertise bilang alternate link -- at ang `/{sdSlug}/blog/[postSlug]`, isang nakalaang route (hindi ang Zone/Section pipeline) na may naka-center na header (category kicker, pamagat, byline, primary-color accent rule), 16:9 na hero sa lapad ng container, ang markdown na katawan sa ~720px na reading column, tag chip sa footer ng artikulo, strip ng mga kaugnay na post na `"More in {category}"`, at `BlogPosting` JSON-LD kasama ang may-akda. Ganap na nagsa-style ang dalawang pahina mula sa theme token, kaya minamana nila ang palette ng bawat simbahan. Kasama sa per-church sitemap ang mga URL ng blog. Ang authoring UI ng B1Admin (**Site → Blog**) ay nag-e-edit ng mga post sa isang dialog: markdown editor na may preview toggle, gallery image picker na naka-crop sa 16:9, author person-picker (ang default ay ang user na nag-e-edit), category autocomplete na galing sa mga umiiral na kategorya, beripikasyon ng duplicate na slug, at publish toggle; ang mga na-publish na row ay nagli-link palabas sa live post, at ipinapaalala ng pahina sa mga admin na magdagdag ng link na `/blog` sa navigation.

## Mga pahinang para sa mga miyembro lamang

Ginagamit muli ng `pages.visibility` ang enum ng navigation-links -- `everyone` (default), `visitors`, `members`, `staff`, `team`, `groups` (kasama ang `groupIds`) -- pero bilang **mahigpit na access gate**, hindi nav filter (`PageVisibilityHelper.canViewPage`). Ang daloy:

1. Sinusuri ng anonymous tree endpoint ang visibility sa mga fetch na nakabatay sa URL. Ang mga anonymous na tumatawag sa isang naka-gate na page ay tumatanggap ng `{ restricted: true, visibility }` sa halip na content -- hindi kailanman lumalabas sa tree ang content.
2. Pinararangalan pa rin ng endpoint ang JWT: sinusuri ng `CustomAuthProvider` ang `Authorization` header sa *bawat* request, kasama ang mga anonymous route, kaya ang fetch ng naka-authenticate na miyembro sa parehong URL ay normal na nare-resolve.
3. Nire-render ng B1App ang `RestrictedPage` kapag may `restricted` na response: ibinabalik nito ang session mula sa naka-imbak na credentials, muling kinukuha ang tree gamit ang JWT, at nire-render ito -- o nagpapakita ng login gate na may `returnUrl` kapag walang session.

:::info
Nag-iiba ang granularity ng gate ayon sa antas: sinusuri ng `groups` ang `groupIds` ng token laban sa listahan ng page at sinusuri ng `staff` ang `membershipStatus`, ngunit ang `members` at `team` sa ngayon ay pumapayag sa sinumang naka-authenticate na user ng simbahan. Ituring na mahigpit na opsyon ang `groups`.
:::

## SEO at pagkakadiskubre {#seo-and-discoverability}

Lahat ng ito ay rendering sa panig ng B1App sa ibabaw ng data ng ContentApi -- iniimbak ng API, inilalabas ng app:

| Paksa | Paano ito gumagana |
|---------|--------------|
| Meta description | Ang `pages.metaDescription` (≤300 character) ay dumadaloy sa pamamagitan ng `MetaHelper.getMetaData()` papunta sa Next.js `Metadata` (description + Open Graph) sa bawat route na nire-render ng builder. Kasama sa page settings ng B1Admin ang button na AI na **I-generate** (tingnan sa ibaba) |
| Redirect | Mga row ng `redirects` kada simbahan na pinamamahalaan sa `/content/redirects` (`content.edit`, limitasyong 200 row, na-normalize na mga path). Sa isang posibleng 404, nireresolba ng page route ng B1App ang path laban sa `GET /content/redirects/public/:churchId` at naglalabas ng HTTP 308 sa pamamagitan ng `permanentRedirect` ng Next; ang mga path na walang tugma ay dumadaan sa `notFound()` |
| Branded na 404 | Nire-render ng `not-found.tsx` ang `BrandedNotFound` na may logo, pangalan, at theme ng simbahan sa halip na generic na error. Ang mga hindi kilalang `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]`, at `/volunteer/[planId]` na path ay nagbabalik ng tunay na 404, gayundin ang mga hindi kilalang subdomain at maling page slug (tingnan ang [Website Routing & Multi-Site](./websites)) |
| Structured data | `BlogPosting` JSON-LD sa mga blog post; `VideoObject` sa mga pahina ng bawat sermon (`/{sdSlug}/sermons/[sermonId]`) at sa mga pahinang may `sermons` element; `Event` mula sa calendar/event element sa mga builder page at sa bawat pahinang `/{sdSlug}/events/[eventId]` (susunod na occurrence, may larawan ng event bilang `image`); schema.org `Event` mula sa `serviceTimes` element |
| Mga pahina ng sermon | Bawat public na sermon ay may pahinang crawlable sa `/sermons/[sermonId]` na may kumpletong metadata -- hindi na nakakulong ang mga sermon sa client-side browser element |
| Analytics | Ang public settings key na `ga4MeasurementId` (pinamamahalaan sa tabi ng redirect sa B1Admin) ay nag-iinject ng per-church na GA4 gtag sa pamamagitan ng `next/script`. Ipinapadala rin ng B1 app (`/{sdSlug}/mobile`) ang mga page view nito sa ID na iyon, kasama ng tag ng ChurchApps mismo, kapag valid na `G-` ID ito (nananatiling website-only ang mga GTM container ID). Ang bawat `gtag('config')` ay may dalang `display_mode` na `installed` o `browser`, batay sa `navigator.standalone` o sa media query na `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap at feed | Ang per-church na route ng `sitemap.xml` ay may kasamang mga page ng builder, URL ng blog, at 50 pinakabagong sermon page (may `<lastmod>` mula sa publish date ng bawat sermon). Kasama rin nito ang mga built-in na pahinang `/sermons`, `/groups`, at `/volunteer` kapag may content ang mga ito (mga public group, signup plan), maliban kung papalitan ng naka-save na redirect ang path na iyon. Hindi kasama ang `/` kapag walang home page ang simbahan, dahil ang `/` ay magre-redirect noon sa `/mobile` na hindi pinapayagan. Ina-advertise ng blog listing ang RSS feed |
| Accessibility | Naglalabas ang public chrome ng skip link na tumutugon sa landmark na `<main id="main-content">` sa bawat layout wrapper |

## AI generation (AskApi)

Ang pagbuo ng page at site ay tumatakbo sa **AskApi**, isang hiwalay na service, sa ilalim ng `/website` controller. Gumagamit ito ng parehong `CustomAuthProvider` JWT gaya ng lahat ng iba, at **stateless** sa content: nagbabalik ang bawat endpoint ng JSON at ang tumatawag (B1Admin) ang nagpe-persist ng resulta sa pamamagitan ng ContentApi (lumilikha ang `POST /content/pages/importTree` ng page kasama ang buong nested na section/element tree nito sa isang tawag; palagi itong nagpapasok sa ilalim ng church ng tumatawag at binabalewala ang mga id sa body).

### Page generation (`planPage` → `writePage`)

Ang template na "AI" sa `AddPageModal` ng B1Admin ay gumagamit ng murang pipeline (`AskApi/src/helpers/SiteGenHelper.ts`) na nakabatay sa isang patakaran: **walang model na naglalabas ng builder JSON**. Hinahati ng dalawang model ang trabaho sa pamamagitan ng Vercel AI Gateway (plain HTTP, SSM key na `/{env}/aiGatewayApiKey` o `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) -- isang typed-decision model na nagbabalik ng mga pagpili, score, at boolean na may probabilidad pero hindi kayang sumulat ng teksto. Pumipili ito ng bawat seksyon nang sunud-sunod mula sa nakapirmihang template library, nagsa-score ng mga layout, nagfa-fact-check ng copy, at pumipili ng stock photo at icon. Ang input ay humigit-kumulang $0.04 kada milyong token at libre ang output, kaya ang ~90 tawag kada page ay napakamura.
- **Maliit na chat model (GPT-4.1 mini bilang default)** -- pinupunan ang mga pinangalanang text slot na may limitasyon sa haba ng mga napiling template. Iisang constant ang writer, maaaring i-override gamit ang environment variable na `SITEGEN_COPY_MODEL` (anumang chat model id sa gateway, halimbawa `anthropic/claude-haiku-4.5`). Sa isang blind na side-by-side sa tatlong simbahan, bahagyang mas mainit ang basa ng Claude Haiku 4.5, pero malapit ang GPT-4.1 mini, humigit-kumulang 4x na mas mura at mas mabilis, kaya ito ang default. Ang isang buong page na may tatlong layout ay nagkakahalaga ng humigit-kumulang 1.3 sentimo, na halos 80% ay ang writer.

| Yugto | Endpoint | Ano ang nangyayari |
|-------|----------|--------------------|
| 1 | `POST /website/planPage` | Iniuuri ang uri ng page (home, visit, about...), pagkatapos ay kumukuha ng 10 kandidatong layout mula sa per-round na probabilidad ng JEV (hero + bilang ng seksyon → bawat seksyon → closer), nag-aalis ng duplicate, pinapa-score ng JEV ang bawat isa para sa fit/flow/gaps, at ibinabalik ang nangungunang 3 kasama ang writing voice at `suggestedStyle` (palette + font). Ang mga kandidatong may magkakaparehong seksyon hanggang sa puntong iyon ay nagtatanong sa JEV ng magkaparehong tanong, kaya ang mga round ay memoized ayon sa prefix. Ang pinakamataas na score na mas mababa sa 6 ay nila-log bilang `lowLayoutScore` -- ang log na iyon ang backlog ng mga template na sulit idagdag. ~2s |
| 2 | `POST /website/writePage` (isang tawag bawat kandidato) | Pinupunan ng writer ang slot copy, dalawang seksyon kada tawag, nang parallel, at nagbabalik ng limang hero headline na pinipili ng JEV; nagfa-fact-check ang JEV ng bawat seksyon; ang mga seksyong pumapalya, gumagamit ng stock phrase, o inuulit ang isang naunang seksyon (ibinabahaging 4-word run, sinusuri sa code) ay muling isinusulat nang parallel na may tiyak na dahilan; tinatanggal ng code scrub ang mga pangungusap na may stock church-site phrase (maliban kung ginamit ang mga ito sa sariling deskripsyon ng simbahan); pinipili ng JEV ang paksa ng larawan, mga icon, at shape divider ng hero, at sine-score ang resulta. Nagbabalik ng handa-nang-i-save na section tree at score. ~6–9s |
| 3 | `POST /content/pages/importTree` | Ang B1Admin ay nagsusulat lamang ng pinakamataas ang ranggo na layout (ang runner-up ang fallback kapag pumalya ang pagsulat), sine-save ito, at binubuksan ang preview (~10s pagkatapos ng Save) |

Ang bawat yugto ay sarili nitong request para manatili ang bawat tawag sa loob ng 29-second limit ng API Gateway. Ang mga template sa `SiteGenHelper.buildTree` ay nakapirmihang section + element tree mula sa catalog (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) at tumutukoy sa mga theme token (`var(--accent)`, `var(--lightAccent)`…), kaya nagmamana ang mga nabuong page ng umiiral na appearance settings ng simbahan. Ang pagdaragdag ng section template ay nangangahulugang idagdag ang listahan ng slot nito sa `SECTIONS` at ang tree nito sa `buildTree`; dinadaanan ng unit test ang bawat template at vina-validate ang tree.

**Mga input.** Maaaring magsabi ang copy ng mga katotohanan mula lamang sa dalawang pinagmulan: ang itinype ng user, at ang `churchContext.facts` -- mga talaang kinokolekta ng B1Admin bago magplano (mga public service time at pangalan ng public group, kasama ang pangalan at address ng simbahan). Ang parehong flag ang nagbubukas sa mga data-backed na template: ang `times` ay nagre-render ng live na `serviceTimes` element kapag pinapanatili ng simbahan ang service times sa B1 (kung hindi, isang naka-type na table), at ang `groups` at `countdown` ay iniaalok lamang kapag may data sa likod nila. Hedged ang mga tawag sa JEV -- ang duplicate ay pumapaputok pagkalipas ng 1.5s at ang unang sagot ang nananaig -- dahil paminsan-minsang natitigil ang gateway at halos libre ang mga tawag.

**Pananatili sa paksa.** Ang prompt ng user ang *paksa ng page*, hindi background tungkol sa simbahan. Inuuri ng `planPage` ang request (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), at para sa mga page na `event` at `topic`, hindi na inaalok ang mga pangkalahatang template ng simbahan (pastor note, sermons, ministries, groups, community impact, weekly times at countdown, video hero), habang inaalok ang `details` (kailan / saan / ano ang dadalhin) at isang date `eventCountdown`. Parehong nagsa-score ang dalawang judge ng pagiging on-topic. Ipinapasa ng B1Admin ang `pageType` mula sa plan sa bawat tawag ng `writePage`.

**Buong page mula sa maikling request.** May tatlo hanggang anim na gitnang seksyon ang mga page, sapat na haba ng slot, isang linya ng panimula sa mga card section, at limang tanong na FAQ, at pinalalawak ng repair pass ang anumang seksyong lumabas na payat. Isang click lamang ang generation: walang follow-up na tanong. Kapag iniwan ng request ang isang karaniwang detalyeng kailangan ng kumpletong page (oras ng simula, kuwarto, ano ang dadalhin, paano magpalista), pupunan ito ng writer ng makatwirang, katamtamang pagpili para ma-edit ng simbahan. Dahil parallel na isinusulat ang mga seksyon, **minsan lamang** napapagpasyahan ang mga puwang na iyon sa `planPage` (`assumedDetails`, isang maliit na tawag sa writer na tumatakbo kasabay ng pag-sample ng layout), at ibinabalik ang mga ito sa bawat tawag ng `writePage` sa pamamagitan ng `churchContext.assumedDetails`, kaya hindi masasabi ng isang seksyon na 5:00 habang ang isa ay nagsasabing 5:30. Inaayos ng JEV ang anumang seksyong sumasalungat sa request, sa mga talaan ng simbahan, o sa mga napagpasyahang detalyeng iyon. Hindi inilalabas sa UI ang mga napagpasyahang detalye; sinusuri at ine-edit ng simbahan ang page tulad ng iba. May ilang bagay na hindi kailanman ginagawa-gawa: mga pangalan ng tao, numero ng telepono, email at web address, presyo, estadistika, kasaysayan ng simbahan, mga quote na iniuugnay sa mga tao, at araw ng linggo para sa petsang hindi ibinigay ng request.

**Mga visual.** Hindi kailanman pinapangalanan ng mga template ang kanilang larawan o icon. Nag-iiwan sila ng bukas na slot, at isang pangkalahatang pass (`visualSlots` → `pickVisuals` → `applyVisuals` sa `SiteGenHelper`) ang dumaraan sa tapos nang tree at pinupunan ang bawat isa: background ng seksyon o gallery entry na may markang `auto:photo`, `auto:icon`, ang `auto:divider` ng hero, at, kapag walang kahit anong marker, ang alinmang `textWithPhoto`, `card`, o `image` element na walang laman ang `photo`. Pinipili ng JEV ang bawat isa mula sa tekstong katabi nito (ang larawan ng card mula sa pamagat at teksto ng card na iyon; ang background mula sa copy ng seksyon), nang walang paksang inuulit sa isang page. Kaya nagkakaroon ng larawan nang libre ang bagong template. Ang mga larawan ay mga Pexels search subject na inilalabas bilang `pexels:<term>` placeholder na nire-resolve ng B1Admin sa pamamagitan ng `POST /content/stock/search`; ang client na hindi nagpapadala ng `resolvesPhotos` ay tumatanggap ng built-in na hero image, patag na kulay na banda, at mga card na walang larawan. Sadyang walang portrait subject, at walang larawan ang pastor template: hindi dapat pumalit ang estranghero sa stock sa isang tunay na tao. Para sa simbahang wala pang page, ina-apply ng B1Admin ang `suggestedStyle` sa global styles; ang mga umiiral na site ay nananatili sa kanilang itsura.

### Iba pang endpoint

:::info
Nananatiling naka-comment out sa client-side ang button na rewrite ng `SectionToolbar` at ang button na **I-generate ang Site** sa listahan ng pages ng B1Admin. Tumutugon pa rin ang mga endpoint ng AskApi sa ibaba; nakatago lamang ang UI.
:::

| Endpoint | Layunin |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Ang orihinal na dalawang-hakbang na daloy ng page (outline, pagkatapos isang tawag ng LLM kada seksyon na naglalabas ng element JSON). Napalitan na sa B1Admin ng `planPage`/`writePage` dahil sa gastos; itinago para sa mga API consumer |
| `POST /website/generateSite` | Generation ng buong site. **Dalawang yugto sa disenyo**: ang tawag na `planOnly: true` ay nagbabalik lamang ng multi-page plan (isang mabilis na tawag sa model), pagkatapos ay humihiling ang client ng buong content -- kaya nananatili ang bawat request sa loob ng timeout ng Lambda/API Gateway |
| `POST /website/rewriteSection` | Rewrite na nagpapanatili ng istruktura: maaari lamang baguhin ng model ang mga answer na may teksto. Ikinukumpara ang recursive na structure signature (ids + types + order) bago at pagkatapos; ang anumang hindi tugma ay nagbabalik ng orihinal na seksyon na may `fallback: true` sa halip na sirang istruktura |
| `POST /website/generateAltText` | Vision call sa hanggang 20 image URL; nagbabalik ng maikling alt text (≤125 character, inaalis ang mga prefix na "photo of") |
| `POST /website/generateMetaDescription` | Isang SEO meta description (≤155 character) mula sa text content ng page -- nakakabit sa button na Generate sa page settings ng B1Admin |

Ang mga prompt ng mga endpoint na ito ay mga markdown file sa ilalim ng `AskApi/config/instructions/`, kasama ang element catalog na pinagbabatayan ng model. Dalawang disenyong desisyon ang nagpapanatiling tapat sa catalog: ipinapasa ng client ang `availableElementTypes` sa bawat request (maaari lamang gumamit ng prompt ng mga type mula sa listahang iyon -- hindi kailanman hard-code ng server ang buong set), at dala ng MCP tool ng API na `describe_page_builder` ang parehong gabay para sa mga AI agent na gumagana sa pamamagitan ng [MCP](../api/mcp). Mga Anthropic Claude model ang ginagamit sa pamamagitan ng OpenRouter -- 3.5 Haiku para sa nilalaman ng seksyon (latency), 3.5 Sonnet para sa mga outline, site plan, at vision -- na may OpenAI fallback kapag walang naka-configure na OpenRouter key.

## Mga conversational form

May conversational mode na ang mga form (membership module) na nakatuon sa mga pahinang tulad ng connect card. Apat na column sa `forms` ang nagpapatakbo nito: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Pag-render** -- lumilipat ang `FormSubmissionEdit` ng apphelper sa component na `ConversationalForm` (isang tanong sa bawat pagkakataon) kapag `conversational` ang `displayMode`; ipinapasa ng form page ng B1App ang mode. Iisa ang submission payload sa alinmang paraan.
- **Awtomatikong paggawa ng person** -- sa pagsusumite na may `autoCreatePerson`, dine-dedup ng `ConversationalFormHelper.findOrCreatePerson` ayon sa email (case-insensitive) at kung hindi ay gumagawa ng household at person na may `membershipStatus: "Guest"`, pagkatapos ay iniuugnay ang submission sa person na iyon.
- **Follow-up na email** -- kapag may naka-set na subject at body, ang nagsumite ay tumatanggap ng templated na email (may mga token na `{firstName}` / `{churchName}`) sa pamamagitan ng umiiral na transactional path (`TransactionalEmailHelper`), at hindi kailanman sa notification digest. Hindi nakamamatay ang dalawang side-effect: ang pagkabigo ay hindi kailanman nawawala ang submission.

Sa ngayon, sa pamamagitan ng API lamang itinatakda ang apat na field; hindi pa ito inilalantad ng form editor ng B1Admin.

## Cache ng public site

Nagca-cache ang public render path ng B1App ng mga fetch na naka-tag sa simbahan (`next: { revalidate: 300, tags: [sdSlug] }` sa production; `0` sa dev), kaya maaaring manatiling luma ang live na page nang hanggang limang minuto pagkatapos ng isang ContentApi write. Ang `POST /api/revalidate/{sdSlug}` sa B1App ay tumatawag ng `revalidateTag(sdSlug)` at ang tanging paraan para maalis nang maaga ang cache na iyon.

Dalawang tagasulat ang tumatama rito:

1. **B1Admin** -- ang `clearSiteCache()` sa `B1Admin/src/site/siteCache.ts` ay nagpo-POST pagkatapos ng mga save sa editor. Inuuna nito ang subdomain ng aktibong site (dapat burahin ng secondary site ang *tag na iyon*, hindi ang default ng simbahan).
2. **Api** -- ang mga pagbabago sa content na hindi dumadaan sa B1Admin (API key, MCP, AI) ay nagpapatakbo ng `SiteCacheHelper.bump(churchId)` mula sa mga content controller. Nire-resolve ng helper ang subdomain ng simbahan sa pamamagitan ng `SubDomainHelper` at nagpo-POST sa `{b1AppRoot}/api/revalidate/{sd}`. Nilalamon ang mga pagkabigo para hindi ma-fail ng hindi maabot na B1App ang isang save.

Mga controller na nagpapatakbo ng bump: pages (save, delete, duplicate, publish, discard, unpublish, AI temp), sections, elements, blocks, links, global styles, posts, at redirects. Ang dev `b1AppRoot` ay `http://{subdomain}.localtest.me:3301`; ang demo/prod ay gumagamit ng `https://{subdomain}.b1.church`.

## Mga Kaugnay na Pahina

- [Website Routing & Multi-Site](./websites) -- paano nireresolve ang isang request sa simbahan/site at paano nire-route ang custom domain
- [Content Endpoints](../api/endpoints/content) -- kumpletong REST surface para sa pages, sections, elements, blocks, posts, redirects, at settings
- [AppHelper](../shared-libraries/app-helper) -- ang npm package na naglalaman ng mga renderer, registry, divider, at widget
- [MCP Server](../api/mcp) -- kasama ang gabay na tool na `describe_page_builder`
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) -- ang dokumentasyon ng editor para sa staff
