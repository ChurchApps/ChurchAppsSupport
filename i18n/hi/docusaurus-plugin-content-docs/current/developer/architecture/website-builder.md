---
title: "Website Builder Architecture"
---

# Website Builder Architecture

<div class="article-intro">

B1App द्वारा served हर church website एक content tree — pages, sections, elements — से render होता है ContentApi में stored और B1Admin में visually edited। एक shared component library दोनों editor preview और live site को render करता है, एक element-type catalog define करता है कि एक page पर क्या appear हो सकता है, और एक separate AI service उस tree को generate या rewrite कर सकता है। यह पृष्ठ पूरे stack को map करता है: `@churchapps/helpers` में element contract, render pipeline, church-data elements, site-wide widgets, blog layer, access-gated pages, SEO, AI generation, और conversational forms।

</div>

## अवलोकन

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

तीन rules stack में रखे गए हैं:

1. **एक tree, दो renderers।** एक page एक `pages → sections → elements` tree है जहां हर node अपने settings को एक `answers` JSON blob के रूप में carries करता है। same apphelper components B1Admin में drag-and-drop editor और B1App में server-rendered public site दोनों को render करते हैं — कोई अलग "publish format" नहीं है।
2. **Contract `@churchapps/helpers` में रहता है।** `ElementTypes.ts` element types का single catalog है; renderers apphelper में एक registry के माध्यम से resolve होते हैं; editor forms B1Admin में रहते हैं। एक element type add करने का मतलब है तीनों को उस क्रम में touch करना।
3. **Public site anonymous endpoints को read करता है।** सब कुछ B1App को चाहिए — page tree, settings, blog posts, redirects, और अन्य modules में church-data endpoints — public है। Auth optional है: anonymous tree endpoint पर एक JWT members-only pages को unlock करता है, बाकी कुछ भी नहीं बदलता है।

## The content tree

Content module (`Api/src/modules/content`) builder के data को own करता है:

| तालिका | भूमिका |
|-------|------|
| `pages` | एक page per URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (access gating) और `metaDescription` (SEO) |
| `sections` | एक page पर horizontal bands (या एक block में): background, text color, और एक `answersJSON` जो styling को carry करता है साथ ही `dividerTop`/`dividerBottom` shape-divider configs |
| `elements` | एक section के अंदर content pieces: `elementType` + `answersJSON`, layout types के लिए nestable (row/column, carousel) |
| `blocks` | Reusable section/element groups (footer blocks, element blocks) pages में shared |
| `posts` | Blog metadata एक regular builder page पर ([Blog](#blog-posts-over-pages) देखें) |
| `redirects` | Per-church `fromPath → toPath` pairs, 200 पर capped (देखें [SEO](#seo-and-discoverability)) |
| `settings` | Key-value church settings; rows flagged `public` anonymously served हैं और widget/analytics config को carry करते हैं |

एक URL के लिए पूरा tree एक single anonymous call से back आता है — `GET /content/pages/:churchId/tree?url=/about` — जो B1App से server-render होता है। Editor requests instead by id को fetch करते हैं और internal ids को keep करते हैं।

## The element contract

### The catalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` हर element type को `ElementTypeDefinition` के रूप में define करता है: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, और JSON-schema-style `answersSchema` इसके answers के लिए। `validateElementAnswers()` deliberately lenient है — unknown types और extra keys pass करते हैं, तो old content कभी भी catalog upgrade पर break नहीं होता है। **35 types आज ship होते हैं:**

| Category | Element types |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons` element church types में सबसे configurable है: एक `layout` answer `browse` (legacy full browser), `grid`, `list`, या `featuredLatest` को select करता है, `playlistId`, `itemCount`, `showTitles`, और `showDates` non-browse layouts को refining करते हुए।

### Renderers (`@churchapps/apphelper`)

Renderers `Packages/apphelper/src/website/components/elementTypes/` में रहते हैं, एक component per type, `ElementRegistry.ts` के माध्यम से resolved — एक two-layer map जहां `Element.tsx` सभी 35 types के लिए default renderer register करता है (`registerDefaultElementRenderer`) और एक host app runtime पर उनमें से किसी को भी override कर सकता है (`registerElementRenderer`) package को fork किए बिना।

### Editor forms (B1Admin)

Editor के per-type settings forms `B1Admin/src/site/admin/elements/` में रहते हैं — `ElementEdit.tsx` एक dedicated component को dispatch करता है (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) या एक inline field builder per type।

### Section shape dividers

Sections decorative shape dividers को either edge पर carry कर सकते हैं। config section के `answersJSON` में `dividerTop` / `dividerBottom` objects के रूप में रहता है — `{ shape, color, height, flip }` साथ `shape` एक `wave, waves, slant, curve, triangle, peaks` में से। Apphelper `SectionDivider` component और `parseDividerConfig()` helper को ship करता है; दोनों apps के Section renderers (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) answers को parse करते हैं और divider को mount करते हैं, और `SectionEdit.tsx` B1Admin में picker UI provide करता है।

## Church-data elements

तीन element types authored content के बजाय live church data को render करते हैं। Module isolation अभी भी applies होता है — प्रत्येक browser से owning module के own public endpoint को call करता है:

| Element | Endpoint | Notes |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }` return करता है, optional `?startDate=&endDate=` window; element इसे `goalAmount` answer के विरुद्ध compare करता है |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in only**: group को `publicRoster` set होना चाहिए (default off)। projection deliberately minimal है — `personId`, `displayName`, `leader`, photo — कोई contact या demographic fields नहीं |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Campus → service → time tree return करता है; apphelper renderer इससे best-effort schema.org `Event` JSON-LD को emit करता है (API plain data return करता है) |

:::warning
`publicRoster` `staffGrid` के लिए privacy gate है। कभी भी public group-member projection को widen न करें या flag को bypass न करें — roster endpoint anonymous by design है और minimal field list safety property है।
:::

## Site-wide widgets

दो widgets हर public page पर render होते हैं tree के अंदर के बजाय: **AnnouncementBanner** (dismissible top-of-page bar) और **Launcher** (floating action hub give/visit/watch-style links के लिए)। दोनों components और उनके `parse*Config()` helpers apphelper में ship होते हैं। Configuration दो public settings rows हैं — keys `announcementBanner` और `launcher` — B1Admin के `SiteWidgetsEdit` द्वारा written (Appearance page पर) और B1App के public layout द्वारा read via `GET /content/settings/public/:churchId`।

## Blog: posts over pages

Blog एक thin metadata layer है, दूसरा content system नहीं। एक `posts` row (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) एक regular builder page को `pageId` via point करता है; page body को hold करता है और normal page editor में edited है।

## Members-only pages

`pages.visibility` navigation-links enum को reuse करता है — `everyone` (default), `visitors`, `members`, `staff`, `team`, `groups` (`groupIds` के साथ) — लेकिन एक **hard access gate** के रूप में, nav filter नहीं (`PageVisibilityHelper.canViewPage`)।

## SEO and discoverability

यह सब B1App-side rendering है ContentApi data पर — API stores करता है, app emits करता है।

## AI generation (AskApi)

Page और site generation **AskApi**, एक separate service में, `/website` controller के तहत चलता है।

## Conversational forms

Forms (membership module) एक conversational mode को gain किए aimed at connect-card-style pages।

## संबंधित पृष्ठ

- [Website Routing & Multi-Site](./websites) — कैसे एक request एक church/site को resolve करता है और custom domains कैसे route होते हैं
- [Content Endpoints](../api/endpoints/content) — pages, sections, elements, blocks, posts, redirects, और settings के लिए पूर्ण REST surface
- [AppHelper](../shared-libraries/app-helper) — npm package जो renderers, registry, dividers, और widgets को ship करता है
- [MCP Server](../api/mcp) — including `describe_page_builder` guide tool
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — staff-facing editor documentation
