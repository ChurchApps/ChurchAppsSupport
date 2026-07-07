---
title: "Website Builder Architecture"
---

# Website Builder Architecture

<div class="article-intro">

Bawat website ng simbahan na nase-serve ng B1App ay nire-render mula sa isang content tree — pages, sections, elements — na ina-imbak sa ContentApi at nae-edit visually sa B1Admin. Isang shared component library ay nag-render sa editor preview at live site, isang element-type catalog ay nagde-define kung ano ang maaaring lumitaw sa page, at isang hiwalay na AI service ay maaaring mag-generate o magsulat muli ng tree. Ang pahinang ito ay nagsasaad ng buong stack: ang element contract sa `@churchapps/helpers`, ang render pipeline, church-data elements, site-wide widgets, ang blog layer, access-gated pages, SEO, AI generation, at conversational forms.

</div>

## Pangkalahatang-ideya

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

Tatlong rules ang sumusuporta sa stack:

1. **Isang tree, dalawang renderers.** Ang page ay isang `pages → sections → elements` tree kung saan bawat node ay nagdadala ng settings nito bilang isang `answers` JSON blob. Ang parehong apphelper components ay nag-render sa drag-and-drop editor sa B1Admin at sa server-rendered public site sa B1App — walang hiwalay na "publish format".
2. **Ang contract ay nabubuhay sa `@churchapps/helpers`.** Ang `ElementTypes.ts` ay ang iisang catalog ng element types; ang mga renderer ay nagresolba sa pamamagit ng registry sa apphelper; ang editor forms ay nabubuhay sa B1Admin. Ang pagdadagdag ng element type ay nangangahulugang pag-touch sa lahat ng tatlo, sa order na iyon.
3. **Ang public site ay nagbabasa ng anonymous endpoints.** Lahat ng kailangan ng B1App — ang page tree, settings, blog posts, redirects, at ang church-data endpoints sa ibang modules — ay public. Ang auth ay optional: isang JWT sa anonymous tree endpoint ay nag-unlock ng members-only pages, walang iba na nagbabago.

## Ang content tree

Ang content module (`Api/src/modules/content`) ay nagmamay-ari ng builder's data:

| Talahanayan | Papel |
|-------|------|
| `pages` | Isang page bawat URL: `url`, `title`, `layout`, kasama ang `visibility`/`groupIds` (access gating) at `metaDescription` (SEO) |
| `sections` | Mga horizontal bands sa page (o sa block): background, text color, at isang `answersJSON` na nagdadala ng styling kasama ang `dividerTop`/`dividerBottom` shape-divider configs |
| `elements` | Mga content pieces sa loob ng section: `elementType` + `answersJSON`, nestable para sa layout types (row/column, carousel) |
| `blocks` | Mga reusable section/element groups (footer blocks, element blocks) na ibinabahagi sa mga pages |
| `posts` | Mga blog metadata sa regular builder page (tingnan ang [Blog](#blog-posts-over-pages)) |
| `redirects` | Per-church `fromPath → toPath` pairs, na capped sa 200 (tingnan ang [SEO](#seo-and-discoverability)) |
| `settings` | Key-value church settings; ang mga rows na minark na `public` ay nase-serve nang anonymous at nagdadala ng widget/analytics config |

Ang buong tree para sa isang URL ay bumabalik mula sa isang anonymous call — `GET /content/pages/:churchId/tree?url=/about` — kung alin ang ginagamit ng B1App para sa server-render. Ang editor requests ay nag-fetch sa id sa halip at nagpapanatili ng internal ids.

## Ang element contract

### Ang catalog (`@churchapps/helpers`)

Ang `Packages/helpers/src/ElementTypes.ts` ay nagde-define ng bawat element type bilang isang `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, at isang JSON-schema-style `answersSchema` para sa answers nito. Ang `validateElementAnswers()` ay sinandig na lenient — ang mga unknown types at extra keys ay dumadaan, kaya ang lumang content ay hindi kailanman masira sa catalog upgrade. **35 types ang nagpapadala ngayon:**

| Category | Element types |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Ang `sermons` element ay ang pinakamaayos na isa sa church types: ang `layout` answer ay pumipili ng `browse` (ang legacy full browser), `grid`, `list`, o `featuredLatest`, na may `playlistId`, `itemCount`, `showTitles`, at `showDates` na nag-refine ng non-browse layouts.

### Renderers (`@churchapps/apphelper`)

Ang mga renderer ay nabubuhay sa `Packages/apphelper/src/website/components/elementTypes/`, isang component bawat type, resolved sa pamamagit ng `ElementRegistry.ts` — isang two-layer map kung saan `Element.tsx` ay nag-register ng default renderer para sa lahat ng 35 types (`registerDefaultElementRenderer`) at ang host app ay maaaring mag-override ng kahit alin sa kanila sa runtime (`registerElementRenderer`) nang walang pag-fork ng package.

### Editor forms (B1Admin)

Ang editor's per-type settings forms ay nabubuhay sa `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` ay nag-dispatch sa dedicated component (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o isang inline field builder bawat type. Ang AI-facing mirror ng catalog na ito ay ang API's MCP `describe_page_builder` tool (tingnan ang [MCP Server](../api/mcp)).

### Section shape dividers

Ang mga section ay maaaring magdala ng decorative shape dividers sa alinman sa edge. Ang config ay nabubuhay sa section's `answersJSON` bilang `dividerTop` / `dividerBottom` objects — `{ shape, color, height, flip }` na may `shape` na isa sa `wave, waves, slant, curve, triangle, peaks`. Ang Apphelper ay nagpadala ng `SectionDivider` component at `parseDividerConfig()` helper; ang parehong apps' Section renderers (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) ay nag-parse ng answers at nag-mount ng divider, at `SectionEdit.tsx` sa B1Admin ay nagbibigay ng picker UI. Ang mga packages ay nagpadala lamang ng building block — ang section-level wiring ay ang job ng consuming apps.

## Church-data elements

Tatlong element types ay nag-render ng live church data sa halip na authored content. Ang module isolation ay nananatiling nag-apply — bawat isa ay tumatawag sa owning module's sariling public endpoint mula sa browser:

| Element | Endpoint | Mga Tala |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Nagbabalik ng `{ fundId, totalAmount, donationCount }`, optional `?startDate=&endDate=` window; ang element ay naghahambing laban sa `goalAmount` answer nito |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in lamang**: ang group ay dapat na may `publicRoster` set (default off). Ang projection ay sinandig na minimal — `personId`, `displayName`, `leader`, photo — walang contact o demographic fields |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Nagbabalik ng campus → service → time tree; ang apphelper renderer ay naglalabas ng best-effort schema.org `Event` JSON-LD mula dito (ang API ay nagbabalik ng plain data) |

:::warning
Ang `publicRoster` ay ang privacy gate para sa `staffGrid`. Huwag kailanman palawakin ang public group-member projection o i-bypass ang flag — ang roster endpoint ay anonymous sa design at ang minimal field list ay ang safety property.
:::

## Site-wide widgets

Dalawang widgets ay nag-render sa bawat public page sa halip na sa loob ng tree: **AnnouncementBanner** (dismissible top-of-page bar) at **Launcher** (floating action hub para sa give/visit/watch-style links). Parehong components at `parse*Config()` helpers nila ay nagpadala sa apphelper. Ang configuration ay dalawang public settings rows — keys `announcementBanner` at `launcher` — na isinulat ng B1Admin's `SiteWidgetsEdit` (sa Appearance page) at basahin ng B1App's public layout sa pamamagit ng `GET /content/settings/public/:churchId`. Ang API ay nagtrato sa mga ito bilang opaque key-value pairs; ang mga key names ay isang convention sa pagitan ng dalawang apps.

## Blog: posts over pages

Ang blog ay isang manipis na metadata layer, hindi isang pangalawang content system. Ang `posts` row (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) ay tumuturo sa regular builder page sa pamamagit ng `pageId`; ang page ay nagtataglay ng body at na-edit sa normal page editor. Ang public surface (lahat ng anonymous, `PostController`):

| Route | Layunin |
|-------|---------|
| `GET /content/posts/public/:churchId` | Na-publish na posts, filterable ng `?category=&tag=`, paginated |
| `GET /content/posts/public/:churchId/slug/:slug` | Metadata ng isang post |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed |

Ang post ay "published" kapag ang `publishDate` ay set at dating nakaraang. Ang B1App ay nag-serve ng `/{sdSlug}/blog` (listing, na may RSS feed na na-advertise bilang alternate link) at `/{sdSlug}/blog/[postSlug]`, na nag-fetch ng backing page tree sa `/blog/{slug}` at nag-render dito sa pamamagit ng parehong Zone/Section pipeline tulad ng anumang ibang page, na nagdadagdag ng `BlogPosting` JSON-LD. Ang mga blog URLs ay kasama sa per-church sitemap. Ang B1Admin's authoring UI (**Site → Blog**) ay lumilikha ng backing page sa `/blog/{slug}` at ang `posts` row nang sabay-sabay.

## Members-only pages

Ang `pages.visibility` ay ginagamit muli ang navigation-links enum — `everyone` (default), `visitors`, `members`, `staff`, `team`, `groups` (na may `groupIds`) — ngunit bilang isang **hard access gate**, hindi isang nav filter (`PageVisibilityHelper.canViewPage`). Ang flow:

1. Ang anonymous tree endpoint ay nag-check ng visibility sa URL-based fetches. Ang mga anonymous callers ng gated page ay nakakakuha ng `{ restricted: true, visibility }` sa halip na content — ang tree ay hindi kailanman nag-leak.
2. Ang endpoint ay patuloy na nag-honor ng JWT: ang `CustomAuthProvider` ay nag-verify ng `Authorization` header sa *bawat* request, kasama ang anonymous routes, kaya ang authenticated member's fetch ng parehong URL ay nagresolba nang normal.
3. Ang B1App ay nag-render ng `RestrictedPage` sa `restricted` response: ito ay nag-hydrate ng session mula sa stored credentials, muling nag-fetch ng tree na may JWT, at nag-render dito — o nagpapakita ng login gate na may `returnUrl` kapag walang session.

:::info
Ang gate's granularity ay nag-vary ayon sa level: `groups` ay nag-check ng token's `groupIds` laban sa page's list at `staff` ay nag-check ng `membershipStatus`, ngunit `members` at `team` ay kasalukuyang pumapasa sa anumang authenticated user ng church. Gamitin ang `groups` bilang ang strict option.
:::

## SEO at discoverability

Lahat ng ito ay B1App-side rendering sa ContentApi data — ang API ay nag-imbak, ang app ay naglalabas:

| Concern | Paano ito gumagana |
|---------|--------------|
| Meta descriptions | Ang `pages.metaDescription` (≤300 chars) ay dumadaloy sa pamamagit ng `MetaHelper.getMetaData()` sa Next.js `Metadata` (description + Open Graph) sa bawat builder-rendered route. Ang B1Admin's page settings ay kasama ang AI "Generate" button (tingnan sa ibaba) |
| Redirects | Per-church `redirects` rows na pinamamahalaan sa `/content/redirects` (`content.edit`, 200-row cap, normalized paths). Sa isang would-be 404, ang B1App's page route ay nagresolba ng path laban sa `GET /content/redirects/public/:churchId` at nagbibigay ng HTTP 308 sa pamamagit ng Next's `permanentRedirect`; ang unmatched paths ay nahuhulog sa `notFound()` |
| Branded 404 | Ang `not-found.tsx` ay nag-render ng `BrandedNotFound` na may logo, name, at theme ng church sa halip ng generic error |
| Structured data | `BlogPosting` JSON-LD sa blog posts; `VideoObject` sa per-sermon pages (`/{sdSlug}/sermons/[sermonId]`) at sa pages na may `sermons` element; `Event` mula sa calendar/event elements sa builder pages; schema.org `Event` mula sa `serviceTimes` element |
| Sermon pages | Bawat public sermon ay nakakakuha ng crawlable page sa `/sermons/[sermonId]` na may full metadata — ang mga sermons ay hindi na locked sa loob ng client-side browser element |
| Analytics | Ang public settings key `ga4MeasurementId` (na pinamamahalaan susunod sa redirects sa B1Admin) ay nag-inject ng per-church GA4 gtag sa pamamagit ng `next/script` |
| Sitemap & feeds | Ang per-church `sitemap.xml` route ay kasama ang builder pages at blog URLs; ang blog listing ay nag-advertise ng RSS feed |
| Accessibility | Ang public chrome ay nag-render ng skip link na tumuturo sa `<main id="main-content">` landmark sa bawat layout wrapper |

## AI generation (AskApi)

Ang page at site generation ay tumatakbo sa **AskApi**, isang hiwalay na service, sa ilalim ng `/website` controller. Ito ay nag-authenticate na may parehong `CustomAuthProvider` JWT tulad ng lahat at ay **stateless na may kinalaman sa content**: bawat endpoint ay nagbabalik ng JSON at ang caller (B1Admin) ay nag-persist ng result sa pamamagit ng ContentApi (`POST /content/pages/temp/ai` ay nagsasave ng generated page-sections-elements bundle sa isang tawag).

:::info
Bilang 2026-07-03, ang B1Admin's entry points sa pipeline na ito — ang site "AI" template sa `AddPageModal`, ang `SectionToolbar` rewrite button, at ang pages-list "Generate Site" button — ay naka-comment out client-side habang ang feature ay binabago. Ang AskApi endpoints sa ibaba ay hindi naaapektuhan at nag-respond pa rin; lamang ang B1Admin UI ay nakatago.
:::

| Endpoint | Layunin |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Ang original two-step page flow: outline muna, pagkatapos isa tawag bawat section. Ang B1Admin's "AI" page template sa `AddPageModal` ay nagdadrive dito — outline, pagkatapos parallel section generation, pagkatapos preview |
| `POST /website/generateSite` | Whole-site generation. **Two-phase sa design**: ang `planOnly: true` call ay nagbabalik lamang ng multi-page plan (isang mabilis na model call), pagkatapos ang client ay humihiling ng full content — pinapanatili ang bawat request sa loob ng Lambda/API-Gateway timeout |
| `POST /website/rewriteSection` | Structure-preserving rewrite: ang model ay maaaring lamang baguhin ang text-bearing answers. Ang recursive structure signature (ids + types + order) ay kinokompara bago at pagkatapos; ang anumang mismatch ay nagbabalik ng original section na may `fallback: true` sa halip ng corrupted structure |
| `POST /website/generateAltText` | Vision call sa hanggang 20 image URLs; nagbabalik ng concise alt text (≤125 chars, "photo of" prefixes ay nag-strip) |
| `POST /website/generateMetaDescription` | Isang SEO meta description (≤155 chars) mula sa page's text content — na-wire sa Generate button sa B1Admin's page settings |

Ang mga prompts ay markdown files sa ilalim ng `AskApi/config/instructions/`, kasama ang element catalog na ginagawa ng model. Dalawang design points ay pinapanatili ang catalog na totoo: ang client ay pumapasa ng `availableElementTypes` sa bawat request (ang prompt ay maaaring lamang gumamit ng types mula sa list na iyon — ang server ay hindi kailanman hardcodes ang full set), at ang API's MCP `describe_page_builder` tool ay nagdadala ng parehong guide para sa AI agents na nagtatrabaho sa pamamagit ng [MCP](../api/mcp). Ang mga models ay Anthropic Claude sa pamamagit ng OpenRouter — 3.5 Haiku para sa section content (latency), 3.5 Sonnet para sa outlines, site plans, at vision — na may OpenAI fallback kapag walang OpenRouter key na na-configure.

## Conversational forms

Ang mga forms (membership module) ay nakakuha ng conversational mode na naglalayong mag-connect-card-style pages. Apat na columns sa `forms` ay nag-drive dito: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — ang apphelper's `FormSubmissionEdit` ay sumasagot sa `ConversationalForm` component (isang tanong sa paglipat) kapag `displayMode` ay `conversational`; ang B1App's form page ay pumapasa ng mode sa pamamagit. Ang parehong submission payload alinman.
- **Auto-create person** — sa submission na may `autoCreatePerson` set, ang `ConversationalFormHelper.findOrCreatePerson` ay nag-dedup ng email (case-insensitive) at kung hindi ay lumilikha ng household + person na may `membershipStatus: "Guest"`, pagkatapos ay nag-link ng submission sa taong iyon.
- **Follow-up email** — kapag isang subject at body ay set, ang submitter ay nakakakuha ng templated email (na may `{firstName}` / `{churchName}` tokens) sa pamamagit ng existing transactional path (`TransactionalEmailHelper`), hindi kailanman ang notification digest door. Parehong side-effects ay non-fatal: ang failure ay hindi kailanman nawawalan ng submission.

Ang apat na fields ay itinakda sa pamamagit ng API ngayon; ang B1Admin form editor ay hindi pa nag-expose sa kanila.

## Mga Kaugnay na Pahina

- [Website Routing & Multi-Site](./websites) — kung paano ang request ay nagresolba sa church/site at kung paano ang custom domains ay nag-route
- [Content Endpoints](../api/endpoints/content) — buong REST surface para sa pages, sections, elements, blocks, posts, redirects, at settings
- [AppHelper](../shared-libraries/app-helper) — ang npm package na nagpadala ng renderers, registry, dividers, at widgets
- [MCP Server](../api/mcp) — kasama ang `describe_page_builder` guide tool
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — ang staff-facing editor documentation
