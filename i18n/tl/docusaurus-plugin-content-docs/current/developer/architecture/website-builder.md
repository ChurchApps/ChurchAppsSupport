---
title: "Arkitektura ng Website Builder"
description: "Developer map ng B1 website builder: content tree, shared element catalog, render pipeline, at AI page generation sa B1 Admin at B1.church."
---

# Arkitektura ng Website Builder

<div class="article-intro">

Bawat website ng simbahan na inihahatid ng B1App ay nire-render mula sa isang content tree -- mga pahina, seksyon, elemento -- na nakaimbak sa ContentApi at vinivisual na ine-edit sa B1Admin. Isang shared na component library ang nagre-render ng kapwa editor preview at ng live na site, isang element-type catalog ang nagtatakda kung ano ang maaaring lumitaw sa pahina, at isang hiwalay na AI service ang maaaring bumuo o sumulat muli ng tree na iyon. Inilalarawan ng pahinang ito ang buong stack: ang kontrata ng elemento sa `@churchapps/helpers`, ang render pipeline, mga church-data element, mga site-wide widget, ang blog layer, mga pahinang may access gate, SEO, AI generation, at mga conversational form.

</div>

## Pangkalahatang-tanaw

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

Tatlong panuntunan ang nananatili sa buong stack:

1. **Isang tree, dalawang renderer.** Ang pahina ay isang `pages → sections → elements` tree kung saan bawat node ay may dalang setting nito bilang `answers` na JSON blob. Ang parehong apphelper component ang nagre-render ng drag-and-drop na editor sa B1Admin at ng server-rendered na pampublikong site sa B1App -- walang hiwalay na "publish format".
2. **Nasa `@churchapps/helpers` ang kontrata.** Ang `ElementTypes.ts` ang iisang catalog ng mga uri ng elemento; nireresolba ng mga renderer ang isang registry sa apphelper; nasa B1Admin ang mga form ng editor. Ang pagdaragdag ng uri ng elemento ay nangangailangan ng pagbago sa lahat ng tatlo, sa ganitong pagkakasunod.
3. **Nagbabasa ng mga anonymous na endpoint ang pampublikong site.** Lahat ng kailangan ng B1App -- ang page tree, mga setting, blog post, redirect, at ang mga church-data endpoint sa ibang module -- ay pampubliko. Opsyonal ang auth: ang JWT sa anonymous na tree endpoint ay nagbubukas lang ng mga pahinang para sa miyembro, walang ibang nagbabago.

## Ang content tree

Pinamamahalaan ng content module (`Api/src/modules/content`) ang datos ng builder:

| Table | Papel |
|-------|-------|
| `pages` | Isang pahina kada URL: `url`, `title`, `layout`, kasama ang `visibility`/`groupIds` (access gating) at `metaDescription` (SEO) |
| `sections` | Mga pahalang na banda sa isang pahina (o sa isang block): background, kulay ng teksto, at isang `answersJSON` na nagdadala ng styling pati ang mga config ng shape divider na `dividerTop`/`dividerBottom` |
| `elements` | Mga piraso ng nilalaman sa loob ng isang seksyon: `elementType` + `answersJSON`, maaaring i-nest para sa mga layout type (row/column, carousel) |
| `blocks` | Mga muling magagamit na grupo ng seksyon/elemento (mga footer block, element block) na ibinabahagi sa mga pahina |
| `posts` | Mga standalone na blog post (tingnan ang [Blog](#blog)) |
| `redirects` | Mga pares na `fromPath → toPath` kada simbahan, nilimitahan sa 200 (tingnan ang [SEO](#seo-and-discoverability)) |
| `settings` | Key-value na setting ng simbahan; ang mga row na minarkahang `public` ay inihahain nang anonymous at nagdadala ng config ng widget/analytics |

Ang buong tree para sa isang URL ay nagbabalik mula sa iisang anonymous na tawag -- `GET /content/pages/:churchId/tree?url=/about` -- na siyang pinagre-render-an ng B1App sa server. Ang mga request ng editor ay kumukuha sa pamamagitan ng id sa halip at pinapanatili ang mga internal na id.

## Ang kontrata ng elemento

### Ang catalog (`@churchapps/helpers`)

Tinutukoy ng `Packages/helpers/src/ElementTypes.ts` ang bawat uri ng elemento bilang isang `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, at isang `answersSchema` na istilong JSON-schema para sa mga answer nito. Sadyang maluwag ang `validateElementAnswers()` -- ang hindi kilalang uri at dagdag na key ay pumapasa, kaya hindi nasisira ng lumang nilalaman ang mga upgrade ng catalog. **35 uri ang kasama ngayon:**

| Kategorya | Mga uri ng elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Ang elementong `sermons` ang pinakamaraming maaaring i-configure sa mga uri ng simbahan: pinipili ng answer na `layout` ang `browse` (ang legacy na full browser), `grid`, `list`, o `featuredLatest`, na may `playlistId`, `itemCount`, `showTitles`, at `showDates` na nagpipino sa mga layout na hindi browse.

May dalawang answer ang elementong `rawHTML`: `rawHTML` (markup) at `javascript`. Hindi kailanman tumatakbo ang mga script na isinisingit sa pamamagitan ng `innerHTML`, kaya nilalikha muli ng `RawHTMLElement` ang bawat `<script>` node sa markup bilang bagong elemento. Ang mga node na ito na hindi ipinasok ng parser ay pinagkakatiwalaan sa ilalim ng `strict-dynamic` ng CSP. Ang answer na `javascript` na nagsisimula sa `<` (isang vendor snippet na naka-paste kasama ang mga tag na `<script>`) ay pinaparse bilang markup at tumatanggap ng parehong pagtrato. Kung hindi, tumatakbo ito bilang simpleng inline na script. Binabanderahan ng B1Admin ang bare na URL sa JavaScript box, dahil ang nag-iisang URL ay tumatakbo bilang script na walang ginagawa. Walang nire-render ang elementong `map`, at hindi nagla-load ng Google Maps script, kapag walang nakakonpigurang Maps API key.

### Mga renderer (`@churchapps/apphelper`)

Nakatira ang mga renderer sa `Packages/apphelper/src/website/components/elementTypes/`, isang component kada uri, nireresolba sa pamamagitan ng `ElementRegistry.ts` -- isang two-layer na map kung saan ang `Element.tsx` ay nagrerehistro ng default na renderer para sa lahat ng 35 uri (`registerDefaultElementRenderer`) at maaaring i-override ng host app ang alinman sa mga ito sa runtime (`registerElementRenderer`) nang hindi nagfo-fork ng package.

### Mga editor form (B1Admin)

Nakatira ang mga form ng settings kada uri ng editor sa `B1Admin/src/site/admin/elements/` -- ang `ElementEdit.tsx` ay nagpapadala sa isang nakalaang component (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o isang inline na field builder kada uri. Ang AI-facing na salamin ng catalog na ito ay ang MCP tool ng API na `describe_page_builder` (tingnan ang [MCP Server](../api/mcp.md)).

Ang editor preview ay nagmo-mount ng parehong `Theme` gaya ng live na site, na nagtatakda ng mga CSS variable na `--headingFont` / `--bodyFont` mula sa global styles ng simbahan. Inilalapat ng B1App ang mga variable na iyon sa pamamagitan ng `pages.css`, na hindi maiimport ng B1Admin, kaya ini-inject ng `ContentEditor.tsx` ang `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) para ilapat ang mga ito sa teksto ng body ng `.page` at sa `h1`–`h6`. Kung wala ito, ipinapakita ng preview ang mga heading sa admin font.

### Mga shape divider ng seksyon

Maaaring magdala ang mga seksyon ng pandekorasyong shape divider sa alinmang gilid. Nakatira ang config sa `answersJSON` ng seksyon bilang mga object na `dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }` na may `shape` na isa sa `wave, waves, slant, curve, triangle, peaks`. Nagpapadala ang apphelper ng component na `SectionDivider` at ng helper na `parseDividerConfig()`; ang mga Section renderer ng parehong app (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) ay nagpaparse ng mga answer at nagmo-mount ng divider, at ang `SectionEdit.tsx` sa B1Admin ang nagbibigay ng UI picker. Ang mga package ay nagpapadala lang ng building block -- ang section-level na wiring ay trabaho ng mga app na gumagamit nito.

## Mga church-data element

Tatlong uri ng elemento ang nagre-render ng live na datos ng simbahan sa halip na authored na nilalaman. Umiiral pa rin ang module isolation -- bawat isa ay tumatawag sa sariling pampublikong endpoint ng module na nagmamay-ari nito mula sa browser:

| Elemento | Endpoint | Mga tala |
|---------|----------|---------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Nagbabalik ng `{ fundId, totalAmount, donationCount }`, opsyonal na `?startDate=&endDate=` na window; ikinukumpara ito ng elemento sa answer nitong `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in lang**: dapat nakatakda ang `publicRoster` ng grupo (default na naka-off). Sadyang minimal ang projection -- `personId`, `displayName`, `leader`, larawan -- walang contact o demograpikong field |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Nagbabalik ng tree na campus → serbisyo → oras; gumagawa ang renderer ng apphelper ng best-effort na schema.org `Event` JSON-LD mula rito (plain data lang ang ibinabalik ng API) |

:::warning
Ang `publicRoster` ang privacy gate ng `staffGrid`. Huwag kailanman palawakin ang pampublikong projection ng miyembro ng grupo o lampasan ang flag -- sadyang anonymous ang roster endpoint at ang minimal na listahan ng field ang safety property.
:::

### Elemento ng calendar at mga pahina ng event

Ang mga answer ng elementong `calendar` ay `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, ang default, o `upcoming`), at `tag`. Pinapalitan ng B1App ang renderer ng apphelper sa `src/components/Element.tsx` gamit ang `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** ay nagre-render ng `UpcomingEventsElement` ng B1App: naglo-load ito ng `GET /content/events/public/group/:churchId/:groupId` o `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, pinapalawak ang mga pag-uulit gamit ang `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, isang occurrence kada event sa loob ng isang taon), at ipinapakita ang unang 12 bilang photo tile (`events.photoUrl`, na babagsak sa pamagat sa dark color ng theme) na nagli-link sa `/events/{id}`, na may Subscribe menu para sa ICS feed ng calendar.
- **`display: "month"`** ay nagre-render ng `CalendarElement` ng apphelper na may callback na `eventUrl`. Ang `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` ay nagna-navigate sa URL na iyon sa pag-click sa halip na magbukas ng detail dialog (hindi nagpapasa ng `eventUrl` ang B1Admin, kaya nananatili ang dialog ng admin calendar).
- **`tag`** ay nagfi-filter sa parehong display gamit ang `EventHelper.hasTag()` (`@churchapps/helpers`): case-insensitive na pagtutugma laban sa `events.tags` na pinaghihiwalay ng kuwit; ang walang laman ay nagpapakita ng lahat. Pinipili ng curated-calendar join ang `e.tags` para dala ng mga curated event ang mga ito.

Ang mga curated event ay naka-link sa pamamagitan ng `realEventId` (`eventPageId()`), kaya palaging pinangalanan ng URL ang tunay na event. Ang `/{sdSlug}/events/[eventId]` ay isang nakalaang route (hindi ang builder pipeline): nilo-load nito ang `GET /content/events/public/:churchId/:id` -- na nagbabalik ng `null` para sa mga pending/rejected na event at para sa mga pribadong event na walang registration, at nagdaragdag ng `roomNames` mula sa mga room booking na hindi rejected -- nire-render ang `EventPageContent` (photo hero, markdown na paglalarawan, aside na When/Where, **Register for this Event** kapag `registrationEnabled`, at link na **Add to my calendar** patungo sa `GET /content/events/public/:churchId/:id/ical`), ginagamit ang larawan bilang Open Graph image, at naglalabas ng `Event` JSON-LD para sa susunod na occurrence sa pamamagitan ng `EventPageJsonLd`. Ang hindi kilala o nakatagong event ay nagbabalik ng tunay na 404.

## Mga site-wide na widget

Dalawang widget ang lumalabas sa bawat pampublikong pahina sa labas ng tree: **AnnouncementBanner** (nadi-dismiss na bar sa itaas ng pahina) at **Launcher** (floating action hub para sa mga link na istilong give/visit/watch). Parehong component at ang kanilang `parse*Config()` na helper ay nasa apphelper. Ang configuration ay dalawang pampublikong row ng setting -- mga key na `announcementBanner` at `launcher` -- na isinusulat ng `SiteWidgetsEdit` ng B1Admin (sa pahinang Appearance) at binabasa ng public layout ng B1App sa pamamagitan ng `GET /content/settings/public/:churchId`. Itinuturing ng API ang mga ito bilang opaque na key-value pair; ang mga pangalan ng key ay kombensyon sa pagitan ng dalawang app.

## Blog {#blog}

Standalone na uri ng nilalaman ang blog, hindi isang layer sa ibabaw ng mga pahina ng builder. Hawak ng isang row ng `posts` ang buong post: `title`, `slug`, `excerpt`, `content` (markdown na katawan), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Pampublikong surface (lahat ay anonymous, `PostController`):

| Route | Layunin |
|-------|---------|
| `GET /content/posts/public/:churchId` | Mga nai-publish na post, nasasala ayon sa `?category=&tag=`, may pahina |
| `GET /content/posts/public/:churchId/categories` | Mga natatanging category sa mga nai-publish na post |
| `GET /content/posts/public/:churchId/slug/:slug` | Isang nai-publish na post |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed, na may pamagat ayon sa pangalan ng simbahan, at may category at excerpt-o-content na paglalarawan kada item |

Ang post ay "nai-publish" kapag nakatakda at lumipas na ang `publishDate`; ang hinaharap na `publishDate` ay nagpapahiwatig ng naka-iskedyul na post (nakatago sa publiko, ipinapakita na may chip na Scheduled sa admin). Pinayayaman ng mga read endpoint ang bawat post ng `authorName`, na nireresolba mula sa `authorId` sa pamamagitan ng membership module gateway. Ang mga excerpt na wala ay babagsak sa markdown-na-tinanggalan-ng-format na content (~160 character) sa mga listing card, meta description, at RSS. Inihahain ng B1App ang `/{sdSlug}/blog` -- isang editorial na listahan (centered na header na nagiging pangalan ng aktibong category/tag kapag na-filter, row ng category-chip na filter, mga post row na may thumbnail sa kaliwa kasama ang mga byline at excerpt) na may RSS feed na ina-advertise bilang alternate link -- at ang `/{sdSlug}/blog/[postSlug]`, isang nakalaang route (hindi ang Zone/Section pipeline) na may centered na header (kicker ng category, pamagat, byline, accent rule na kulay ng primary), 16:9 na hero sa lapad ng container, ang markdown na katawan sa ~720px na reading column, mga tag chip sa footer ng artikulo, isang strip ng mga kaugnay na post na `"More in {category}"`, at `BlogPosting` JSON-LD na kasama ang may-akda. Parehong pahina ay nag-i-style nang buo mula sa mga token ng theme, kaya nagmamana sila ng palette ng bawat simbahan. Kasama sa sitemap ng bawat simbahan ang mga URL ng blog. Ang authoring UI ng B1Admin (**Site → Blog**) ay nag-e-edit ng mga post sa isang dialog: markdown editor na may toggle ng preview, picker ng gallery image na 16:9-cropped, author person-picker (default sa user na nag-e-edit), autocomplete ng category na pinuno mula sa umiiral na category, validation ng duplicate na slug, at publish toggle; ang mga nai-publish na row ay nagli-link sa live na post, at ang pahina ay nagpapaalala sa admin na magdagdag ng navigation link na `/blog`. Iniiwan ang mga komento sa mga third-party na serbisyo: ang church-wide na public content setting na `blogFooterHtml` (ine-edit sa **Below Every Post** sa pahina ng Blog, ipinapakita lang sa may Settings→Edit) ay nire-render sa ilalim ng bawat post ng `BlogFooterEmbed` ng B1App, na muling gumagawa ng mga tag na `<script>` para tumakbo ang mga ito sa ilalim ng `'strict-dynamic'` at pinapatakbo ang mga ito nang sunud-sunod (natatapos muna ang paglo-load ng external na `src` bago tumakbo ang susunod na inline na script), dahil naglo-load muna ng library ang mga vendor snippet at saka ito tinatawag.

## Mga pahinang para sa miyembro lang

Ginagamit muli ng `pages.visibility` ang enum ng mga navigation link -- `everyone` (default), `visitors`, `members`, `staff`, `team`, `groups` (kasama ang `groupIds`) -- pero bilang **mahigpit na access gate**, hindi nav filter (`PageVisibilityHelper.canViewPage`). Ang daloy:

1. Sinusuri ng anonymous na tree endpoint ang visibility sa mga fetch na nakabatay sa URL. Ang mga anonymous na tumatawag ng gated na pahina ay tumatanggap ng `{ restricted: true, visibility }` sa halip na nilalaman -- hindi kailanman tumutulo ang tree.
2. Pinararangalan pa rin ng endpoint ang JWT: sinusuri ng `CustomAuthProvider` ang header na `Authorization` sa *bawat* request, kasama ang mga anonymous na route, kaya nareresolba nang normal ang fetch ng naka-authenticate na miyembro sa parehong URL.
3. Nire-render ng B1App ang `RestrictedPage` sa tugon na `restricted`: hinihidrate nito ang session mula sa naka-imbak na credential, muling kinukuha ang tree gamit ang JWT, at nire-render ito -- o nagpapakita ng login gate na may `returnUrl` kapag walang session.

:::info
Nag-iiba ang antas ng gate: sinusuri ng `groups` ang `groupIds` ng token laban sa listahan ng pahina at sinusuri ng `staff` ang `membershipStatus`, ngunit ang `members` at `team` ay kasalukuyang pumapasa sa anumang naka-authenticate na user ng simbahan. Ituring ang `groups` bilang ang mahigpit na opsyon.
:::

## SEO at discoverability {#seo-and-discoverability}

Lahat ng ito ay pag-render sa panig ng B1App sa ibabaw ng datos ng ContentApi -- nag-iimbak ang API, naglalabas ang app:

| Konsern | Paano ito gumagana |
|---------|--------------|
| Meta description | Dumadaloy ang `pages.metaDescription` (≤300 character) sa pamamagitan ng `MetaHelper.getMetaData()` papunta sa `Metadata` ng Next.js (description + Open Graph) sa bawat route na nire-render ng builder. May butones na AI na "Generate" ang page settings ng B1Admin (tingnan sa ibaba) |
| Mga redirect | Mga row ng `redirects` kada simbahan na pinamamahalaan sa `/content/redirects` (`content.edit`, limitasyon na 200 row, mga normalized na path). Kapag malapit nang maging 404, nireresolba ng page route ng B1App ang path laban sa `GET /content/redirects/public/:churchId` at naglalabas ng HTTP 308 sa pamamagitan ng `permanentRedirect` ng Next; ang mga hindi tumugmang path ay dumadaan sa `notFound()` |
| Branded na 404 | Nire-render ng `not-found.tsx` ang `BrandedNotFound` na may logo, pangalan, at theme ng simbahan sa halip na generic na error. Ang mga hindi kilalang path na `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]`, at `/volunteer/[planId]` ay nagbabalik ng tunay na 404, gayundin ang mga hindi kilalang subdomain at malformed na page slug (tingnan ang [Website Routing & Multi-Site](./websites.md)) |
| Structured data | `BlogPosting` JSON-LD sa mga blog post; `VideoObject` sa mga pahina ng bawat sermon (`/{sdSlug}/sermons/[sermonId]`) at sa mga pahinang may elementong `sermons`; `Event` mula sa mga elemento ng calendar/event sa mga pahina ng builder at sa bawat pahinang `/{sdSlug}/events/[eventId]` (susunod na occurrence, na may larawan ng event bilang `image`); schema.org `Event` mula sa elementong `serviceTimes` |
| Mga pahina ng sermon | Ang bawat pampublikong sermon ay nakakakuha ng crawlable na pahina sa `/sermons/[sermonId]` na may kumpletong metadata -- hindi na nakakulong ang mga sermon sa loob ng client-side na browser element |
| Analytics | Ang public settings key na `ga4MeasurementId` (pinamamahalaan kasama ng mga redirect sa B1Admin) ay nag-iinject ng per-church na GA4 gtag sa pamamagitan ng `next/script`. Pinapadalhan din ng B1 app (`/{sdSlug}/mobile`) ng page view ang ID na iyon, kasama ng sariling tag ng ChurchApps, kapag ito ay valid na `G-` ID (mga GTM container ID ay nananatiling website-only). Ang bawat `gtag('config')` ay may `display_mode` na `installed` o `browser`, batay sa `navigator.standalone` o sa media query na `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap at mga feed | Kasama sa per-church na route na `sitemap.xml` ang mga pahina ng builder, mga URL ng blog, at ang 50 pinakabagong pahina ng sermon (na may `<lastmod>` mula sa publish date ng bawat sermon). Nakalista rin dito ang mga built-in na pahinang `/sermons`, `/groups`, at `/volunteer` kapag may nilalaman ang mga ito (mga pampublikong grupo, plan para sa signup), maliban kung pinapalitan ng naka-save na redirect ang path na iyon. Hindi kasama ang `/` kapag walang home page ang simbahan, dahil nagre-redirect ang `/` noon sa hindi pinapayagang `/mobile`. Ina-advertise ng listahan ng blog ang RSS feed |
| Accessibility | Nagre-render ang pampublikong chrome ng skip link na nakatutok sa landmark na `<main id="main-content">` sa bawat layout wrapper |

## AI generation (AskApi)

Ang page at site generation ay tumatakbo sa **AskApi**, isang hiwalay na serbisyo, sa ilalim ng `/website` controller. Nag-a-authenticate ito gamit ang parehong `CustomAuthProvider` JWT gaya ng lahat ng iba, at **stateless tungkol sa nilalaman**: bawat endpoint ay nagbabalik ng JSON at ang tumatawag (B1Admin) ang nagpe-persist ng resulta sa pamamagitan ng ContentApi (`POST /content/pages/importTree` ay gumagawa ng pahina kasama ang buong nested na tree ng seksyon at elemento sa isang tawag; palagi itong nagpapasok sa ilalim ng simbahan ng tumatawag at binabalewala ang mga id sa body).

### Page generation (`planPage` → `writePage`)

Ang template na "AI" sa `AddPageModal` ng B1Admin ay gumagamit ng pipeline na mababa ang gastos (`AskApi/src/helpers/SiteGenHelper.ts`) na nakabatay sa isang panuntunan: **walang modelong naglalabas ng JSON ng builder**. Dalawang modelo ang naghahati ng trabaho sa pamamagitan ng Vercel AI Gateway (plain HTTP, SSM key na `/{env}/aiGatewayApiKey` o `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) -- isang typed-decision na modelo na nagbabalik ng mga pagpili, marka, at boolean na may probabilidad pero hindi makasulat ng teksto. Pumipili ito ng bawat seksyon nang paisa-isa mula sa nakapirming template library, nagmamarka ng mga layout, nagfa-fact-check ng copy, at pumipili ng stock na larawan at icon. Ang input ay humigit-kumulang $0.04 kada milyong token at libre ang output, kaya ang ~90 na tawag bawat pahina ay mas mababa pa sa isang sentimo.
- **Isang maliit na chat model (GPT-4.1 mini bilang default)** -- pumupuno sa mga pinangalanan at may limitasyon sa haba na slot ng teksto ng mga napiling template. Iisa ang constant ng writer, na maaaring i-override gamit ang environment variable na `SITEGEN_COPY_MODEL` (anumang chat model id sa gateway, hal. `anthropic/claude-haiku-4.5`). Sa isang blind na magkatabing paghahambing sa tatlong simbahan, bahagyang mas mainit ang basa ng Claude Haiku 4.5, pero malapit ang GPT-4.1 mini, humigit-kumulang 4x na mas mura at mas mabilis, kaya ito ang default. Ang isang buong pahina na may tatlong layout ay nagkakahalaga ng humigit-kumulang 1.3 sentimo, mga 80% nito ay ang writer.

| Yugto | Endpoint | Ano ang nangyayari |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Inuuri ang uri ng pahina (home, visit, about…), pagkatapos ay kumukuha ng 10 kandidatong layout mula sa probabilidad ng JEV kada round (hero + bilang ng seksyon → bawat seksyon → closer), nagde-deduplicate, pinapamarkahan ng JEV ang bawat isa para sa akma/daloy/mga puwang, at ibinabalik ang nangungunang 3 kasama ang isang writing voice at isang `suggestedStyle` (palette + font). Ang mga kandidatong nagbabahagi ng parehong seksyon hanggang sa ngayon ay nagtatanong sa JEV ng magkaparehong tanong, kaya ang mga round ay memoized ayon sa prefix. Ang pinakamahusay na marka na mas mababa sa 6 ay naitatala bilang `lowLayoutScore` -- ang log na iyon ang backlog ng mga template na sulit idagdag. ~2s |
| 2 | `POST /website/writePage` (isang tawag kada kandidato) | Pinupuno ng writer ang slot copy ng dalawang seksyon kada tawag, parallel, at nagbabalik ng limang headline ng hero na pinipili ng JEV; fina-fact-check ng JEV ang bawat seksyon; ang mga seksyong pumapalya, gumagamit ng stock na parirala, o nagkukuwento muli ng naunang seksyon (mga shared na 4-na-salitang run, sinusuri sa code) ay isinusulat muli nang parallel na may tiyak na dahilan; tinatanggal ng code scrub ang mga pangungusap na may stock na parirala ng site ng simbahan (maliban kung ginagamit ito ng sariling paglalarawan ng simbahan); pinipili ng JEV ang mga paksa ng larawan, icon, at shape divider ng hero, at minamarkahan ang resulta. Nagbabalik ng handa-nang-i-save na section tree at isang marka. ~6–9s |
| 3 | `POST /content/pages/importTree` | Isinusulat lang ng B1Admin ang pinakamataas ang rank na layout (ang runner-up ay fallback kung pumalya ang isulat), sine-save ito at binubuksan ang preview (~10s pagkatapos ng Save) |

Bawat yugto ay sariling request para manatili ang bawat tawag sa loob ng 29-segundong limitasyon ng API Gateway. Ang mga template sa `SiteGenHelper.buildTree` ay mga nakapirming section + element tree mula sa catalog (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) at tumutukoy sa mga token ng theme (`var(--accent)`, `var(--lightAccent)`…), kaya nagmamana ang nagawang mga pahina ng umiiral na setting ng itsura ng simbahan. Ang pagdaragdag ng template ng seksyon ay nangangahulugang idagdag ang listahan ng slot nito sa `SECTIONS` at ang tree nito sa `buildTree`; dinadaanan ng unit test ang bawat template at binabalidate ang tree.

**Mga input.** Maaaring magsabi ng mga katotohanan ang copy mula lang sa dalawang pinagmulan: ang inilagay ng user, at ang `churchContext.facts` -- mga record na kinokolekta ng B1Admin bago magplano (mga public na oras ng serbisyo at pampublikong pangalan ng grupo, kasama ang pangalan at address ng simbahan). Ang parehong flag ay nagbabantay sa mga template na may datos: ang `times` ay nagre-render ng live na elementong `serviceTimes` kapag itinatago ng simbahan ang mga oras ng serbisyo sa B1 (kung hindi, isang naka-type na table), at ang `groups` at `countdown` ay inaalok lang kapag may datos sa likod nila. Hedged ang mga tawag sa JEV -- nagpapaputok ng duplicate pagkalipas ng 1.5s at ang unang sagot ang nananaig -- dahil paminsan-minsang natitigil ang gateway at halos libre ang mga tawag.

**Pananatili sa paksa.** Ang prompt ng user ang *paksa ng pahina*, hindi background tungkol sa simbahan. Inuuri ng `planPage` ang request (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), at para sa mga pahinang `event` at `topic`, hindi na inaalok ang mga general-church na template (pastor note, sermon, ministry, grupo, community impact, lingguhang oras at countdown, video hero), habang inaalok ang `details` (kailan / saan / ano ang dalhin) at isang `eventCountdown` na may petsa. Parehong sumusukat ang mga hukom sa pagiging nasa paksa. Ipinapasa ng B1Admin ang `pageType` mula sa plano sa bawat tawag ng `writePage`.

**Buong pahina mula sa maikling request.** Ang mga pahina ay may tatlo hanggang anim na gitnang seksyon, maluwag na haba ng slot, linya ng pagpapakilala sa mga card section, at FAQ na may limang tanong, at pinalalawak ng repair pass ang anumang seksyong lumabas na manipis. Isang click lang ang generation: walang mga follow-up na tanong. Kapag hindi kasama sa request ang isang karaniwang detalyeng kailangan ng kumpletong pahina (oras ng pagsisimula, kuwarto, ano ang dadalhin, paano mag-sign up), pinupunan ito ng writer ng makatwiran at katamtamang pagpili para baguhin ng simbahan. Dahil parallel na isinusulat ang mga seksyon, ang mga puwang na iyon ay **minsang** pinagpapasyahan sa `planPage` (`assumedDetails`, isang maliit na tawag sa writer na tumatakbo kasabay ng pag-sample ng layout), at ibinabalik sa bawat tawag ng `writePage` sa pamamagitan ng `churchContext.assumedDetails`, kaya hindi masasabi ng isang seksyon na 5:00 habang sinasabi ng isa pa na 5:30. Inaayos ng JEV ang anumang seksyong sumasalungat sa request, sa mga talaan ng simbahan, o sa mga detalyeng iyon. Hindi ipinapakita sa UI ang mga napagpasyahang detalye; ire-review at ie-edit ito ng simbahan gaya ng anumang pahina. May mga bagay na hindi kailanman ginagawa-gawa: pangalan ng mga tao, numero ng telepono, email at web address, presyo, estadistika, kasaysayan ng simbahan, mga quote na iniuugnay sa mga tao, at araw ng linggo para sa petsang hindi ito ibinigay ng request.

**Mga visual.** Hindi kailanman pinapangalanan ng mga template ang kanilang mga larawan o icon. Nag-iiwan sila ng bukas na slot, at iisang generic na pass (`visualSlots` → `pickVisuals` → `applyVisuals` sa `SiteGenHelper`) ang dumadaan sa tapos na tree at pinupunan ang bawat isa: isang background ng seksyon o entry ng gallery na may markang `auto:photo`, isang `auto:icon`, ang `auto:divider` ng hero, at, kapag walang anumang marker, anumang `textWithPhoto`, `card`, o `image` na elemento na walang laman ang `photo`. Pinipili ng JEV ang bawat isa mula sa tekstong nasa tabi nito (ang larawan ng card mula sa pamagat at teksto ng card na iyon; ang background mula sa copy ng seksyon), na walang paksang inuulit sa isang pahina. Kaya nakakakuha ng larawan nang libre ang bagong template. Ang mga larawan ay mga paksa ng paghahanap sa Pexels na inilalabas bilang mga placeholder na `pexels:<term>` na nireresolba ng B1Admin sa pamamagitan ng `POST /content/stock/search`; ang client na hindi nagpapadala ng `resolvesPhotos` ay tumatanggap ng built-in na hero image, mga flat na kulay na banda, at mga card na walang larawan. Sadyang walang paksang portrait at walang larawan ang pastor template: hindi dapat pumalit ang estranghero sa stock sa isang totoong tao. Para sa simbahang wala pang mga pahina, ina-apply ng B1Admin ang `suggestedStyle` sa global styles; nananatili ang itsura ng umiiral na site.

### Iba pang endpoint

:::info
Nakakomento pa rin sa panig ng client ang `SectionToolbar` rewrite button at ang butones na "Generate Site" sa listahan ng pahina sa B1Admin. Tumutugon pa rin ang mga endpoint ng AskApi sa ibaba; ang UI lang ang nakatago.
:::

| Endpoint | Layunin |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Ang orihinal na dalawang-hakbang na daloy ng pahina (outline, pagkatapos isang tawag ng LLM kada seksyon na naglalabas ng JSON ng elemento). Pinalitan na sa B1Admin ng `planPage`/`writePage` dahil sa gastos; itinatago para sa mga API consumer |
| `POST /website/generateSite` | Generation ng buong site. **Dalawang-yugto sa disenyo**: ang tawag na `planOnly: true` ay nagbabalik lang ng multi-page na plano (isang mabilis na tawag sa modelo), pagkatapos hinihiling ng client ang buong nilalaman -- pinananatiling nasa loob ng timeout ng Lambda/API-Gateway ang bawat request |
| `POST /website/rewriteSection` | Pagsulat muli na pinapanatili ang istruktura: ang modelo ay maaaring baguhin lang ang mga answer na may teksto. Ikinukumpara ang isang recursive na structure signature (mga id + uri + pagkakasunod) bago at pagkatapos; anumang hindi pagtutugma ay nagbabalik ng orihinal na seksyon na may `fallback: true` sa halip na sirang istruktura |
| `POST /website/generateAltText` | Vision na tawag sa hanggang 20 URL ng larawan; nagbabalik ng maikling alt text (≤125 character, tinanggal ang prefix na "photo of") |
| `POST /website/generateMetaDescription` | Isang SEO meta description (≤155 character) mula sa teksto ng nilalaman ng pahina -- nakakabit sa butones na Generate sa page settings ng B1Admin |

Ang mga prompt ng mga endpoint na ito ay mga markdown file sa ilalim ng `AskApi/config/instructions/`, kasama ang catalog ng elemento na pinagbabatayan ng modelo. Dalawang disenyong punto ang nagpapanatiling tapat ng catalog: ipinapasa ng client ang `availableElementTypes` sa bawat request (ang prompt ay maaari lang gumamit ng mga uri mula sa listahang iyon -- hindi kailanman hinahardcode ng server ang buong set), at dala ng MCP tool ng API na `describe_page_builder` ang parehong gabay para sa mga AI agent na nagtatrabaho sa pamamagitan ng [MCP](../api/mcp.md). Mga modelo ang Anthropic Claude sa pamamagitan ng OpenRouter -- 3.5 Haiku para sa nilalaman ng seksyon (latency), 3.5 Sonnet para sa mga outline, site plan, at vision -- na may OpenAI fallback kapag walang naka-configure na OpenRouter key.

## Mga conversational form

Nakakuha ang mga form (membership module) ng conversational mode na nakatuon sa mga pahinang istilong connect-card. Apat na column sa `forms` ang nagpapatakbo nito: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** -- lumilipat ang `FormSubmissionEdit` ng apphelper sa component na `ConversationalForm` (isang tanong sa isang pagkakataon) kapag ang `displayMode` ay `conversational`; ipinapasa ng form page ng B1App ang mode. Pareho ang payload ng pagsusumite sa alinmang paraan.
- **Auto-create na tao** -- sa pagsusumite na may `autoCreatePerson`, nag-de-dedup ang `ConversationalFormHelper.findOrCreatePerson` ayon sa email (case-insensitive) at kung hindi, gagawa ng household + tao na may `membershipStatus: "Guest"`, pagkatapos ikinakabit ang pagsusumite sa taong iyon.
- **Follow-up email** -- kapag may subject at katawan na nakatakda, nakakatanggap ang nagsumite ng nakatemplate na email (na may mga token na `{firstName}` / `{churchName}`) sa pamamagitan ng umiiral na transactional path (`TransactionalEmailHelper`), hindi kailanman sa notification digest door. Parehong hindi nakamamatay ang side-effect: ang pagkabigo ay hindi kailanman nawawala ang pagsusumite.

Itinatakda ang apat na field sa pamamagitan ng API sa ngayon; hindi pa inilalantad ng form editor ng B1Admin ang mga ito.

## Cache ng pampublikong site

Nagca-cache ang public render path ng B1App ng mga fetch na naka-tag sa simbahan (`next: { revalidate: 300, tags: [sdSlug] }` sa production; `0` sa dev) kaya maaaring manatiling luma ang live na pahina nang hanggang limang minuto pagkatapos ng isang write sa ContentApi. Ang `POST /api/revalidate/{sdSlug}` sa B1App ay tumatawag sa `revalidateTag(sdSlug)` at ang tanging paraan para mabura nang maaga ang cache na iyon.

Dalawa ang sumusulat dito:

1. **B1Admin** -- ang `clearSiteCache()` sa `B1Admin/src/site/siteCache.ts` ay nagpo-POST pagkatapos ng save ng editor. Mas gusto nito ang subdomain ng aktibong site (dapat burahin ng pangalawang site ang *tag* nito, hindi ang default ng simbahan).
2. **Api** -- Ang mga mutation ng content na hindi dumadaan sa B1Admin (API key, MCP, AI) ay nagpapaputok ng `SiteCacheHelper.bump(churchId)` mula sa mga content controller. Ni-re-resolve ng helper ang subdomain ng simbahan sa pamamagitan ng `SubDomainHelper` at nagpo-POST sa `{b1AppRoot}/api/revalidate/{sd}`. Nilalamon ang mga pagkabigo para hindi makapagpabagsak ng save ang B1App na hindi maabot.

Mga controller na nagbu-bump: mga pahina (save, delete, duplicate, publish, discard, unpublish, AI temp), mga seksyon, elemento, block, link, global styles, post, at redirect. Ang dev na `b1AppRoot` ay `http://{subdomain}.localtest.me:3301`; ang demo/prod ay gumagamit ng `https://{subdomain}.b1.church`.

## Mga Kaugnay na Pahina

- [Website Routing & Multi-Site](./websites.md) -- paano nireresolba ng request ang isang simbahan/site at paano nagru-route ang mga custom domain
- [Content Endpoints](../api/endpoints/content.md) -- kumpletong REST surface para sa mga pahina, seksyon, elemento, block, post, redirect, at setting
- [AppHelper](../shared-libraries/app-helper.md) -- ang npm package na naglalaman ng mga renderer, registry, divider, at widget
- [MCP Server](../api/mcp.md) -- kasama ang tool na gabay na `describe_page_builder`
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) -- ang dokumentasyon ng editor para sa staff
