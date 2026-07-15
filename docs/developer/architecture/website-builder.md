---
title: "Website Builder Architecture"
---

# Website Builder Architecture

<div class="article-intro">

Every church website served by B1App is rendered from a content tree — pages, sections, elements — stored in the ContentApi and edited visually in B1Admin. One shared component library renders both the editor preview and the live site, one element-type catalog defines what can appear on a page, and a separate AI service can generate or rewrite that tree. This page maps the whole stack: the element contract in `@churchapps/helpers`, the render pipeline, church-data elements, site-wide widgets, the blog layer, access-gated pages, SEO, AI generation, and conversational forms.

</div>

## Overview

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

Three rules hold across the stack:

1. **One tree, two renderers.** A page is a `pages → sections → elements` tree where every node carries its settings as an `answers` JSON blob. The same apphelper components render the drag-and-drop editor in B1Admin and the server-rendered public site in B1App — there is no separate "publish format".
2. **The contract lives in `@churchapps/helpers`.** `ElementTypes.ts` is the single catalog of element types; renderers resolve through a registry in apphelper; editor forms live in B1Admin. Adding an element type means touching all three, in that order.
3. **The public site reads anonymous endpoints.** Everything B1App needs — the page tree, settings, blog posts, redirects, and the church-data endpoints in other modules — is public. Auth is optional: a JWT on the anonymous tree endpoint unlocks members-only pages, nothing else changes.

## The content tree

The content module (`Api/src/modules/content`) owns the builder's data:

| Table | Role |
|-------|------|
| `pages` | One page per URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (access gating) and `metaDescription` (SEO) |
| `sections` | Horizontal bands on a page (or in a block): background, text color, and an `answersJSON` that carries styling plus the `dividerTop`/`dividerBottom` shape-divider configs |
| `elements` | Content pieces inside a section: `elementType` + `answersJSON`, nestable for layout types (row/column, carousel) |
| `blocks` | Reusable section/element groups (footer blocks, element blocks) shared across pages |
| `posts` | Standalone blog posts (see [Blog](#blog)) |
| `redirects` | Per-church `fromPath → toPath` pairs, capped at 200 (see [SEO](#seo-and-discoverability)) |
| `settings` | Key-value church settings; rows flagged `public` are served anonymously and carry the widget/analytics config |

The whole tree for one URL comes back from a single anonymous call — `GET /content/pages/:churchId/tree?url=/about` — which is what B1App server-renders from. Editor requests fetch by id instead and keep internal ids.

## The element contract

### The catalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` defines every element type as an `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, and a JSON-schema-style `answersSchema` for its answers. `validateElementAnswers()` is deliberately lenient — unknown types and extra keys pass, so old content never breaks on a catalog upgrade. **35 types ship today:**

| Category | Element types |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

The `sermons` element is the most configurable of the church types: a `layout` answer selects `browse` (the legacy full browser), `grid`, `list`, or `featuredLatest`, with `playlistId`, `itemCount`, `showTitles`, and `showDates` refining the non-browse layouts.

### Renderers (`@churchapps/apphelper`)

Renderers live in `Packages/apphelper/src/website/components/elementTypes/`, one component per type, resolved through `ElementRegistry.ts` — a two-layer map where `Element.tsx` registers the default renderer for all 35 types (`registerDefaultElementRenderer`) and a host app can override any of them at runtime (`registerElementRenderer`) without forking the package.

### Editor forms (B1Admin)

The editor's per-type settings forms live in `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` dispatches to a dedicated component (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) or an inline field builder per type. The AI-facing mirror of this catalog is the API's MCP `describe_page_builder` tool (see [MCP Server](../api/mcp)).

### Section shape dividers

Sections can carry decorative shape dividers on either edge. The config lives in the section's `answersJSON` as `dividerTop` / `dividerBottom` objects — `{ shape, color, height, flip }` with `shape` one of `wave, waves, slant, curve, triangle, peaks`. Apphelper ships the `SectionDivider` component and `parseDividerConfig()` helper; both apps' Section renderers (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parse the answers and mount the divider, and `SectionEdit.tsx` in B1Admin provides the picker UI. The packages only ship the building block — the section-level wiring is the consuming apps' job.

## Church-data elements

Three element types render live church data rather than authored content. Module isolation still applies — each one calls the owning module's own public endpoint from the browser:

| Element | Endpoint | Notes |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returns `{ fundId, totalAmount, donationCount }`, optional `?startDate=&endDate=` window; the element compares it against its `goalAmount` answer |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in only**: the group must have `publicRoster` set (default off). The projection is deliberately minimal — `personId`, `displayName`, `leader`, photo — no contact or demographic fields |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returns the campus → service → time tree; the apphelper renderer emits best-effort schema.org `Event` JSON-LD from it (the API returns plain data) |

:::warning
`publicRoster` is the privacy gate for `staffGrid`. Never widen the public group-member projection or bypass the flag — the roster endpoint is anonymous by design and the minimal field list is the safety property.
:::

## Site-wide widgets

Two widgets render on every public page rather than inside the tree: **AnnouncementBanner** (dismissible top-of-page bar) and **Launcher** (floating action hub for give/visit/watch-style links). Both components and their `parse*Config()` helpers ship in apphelper. Configuration is two public settings rows — keys `announcementBanner` and `launcher` — written by B1Admin's `SiteWidgetsEdit` (on the Appearance page) and read by B1App's public layout via `GET /content/settings/public/:churchId`. The API treats these as opaque key-value pairs; the key names are a convention between the two apps.

## Blog

The blog is a standalone content type, not a layer over builder pages. A `posts` row holds the whole post: `title`, `slug`, `excerpt`, `content` (markdown body), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Public surface (all anonymous, `PostController`):

| Route | Purpose |
|-------|---------|
| `GET /content/posts/public/:churchId` | Published posts, filterable by `?category=&tag=`, paginated |
| `GET /content/posts/public/:churchId/categories` | Distinct categories across published posts |
| `GET /content/posts/public/:churchId/slug/:slug` | One published post |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed, titled with the church name, with per-item category and excerpt-or-content description |

A post is "published" once `publishDate` is set and past; a future `publishDate` is a scheduled post (hidden publicly, shown with a Scheduled chip in admin). Read endpoints enrich each post with `authorName`, resolved from `authorId` through the membership module gateway. Missing excerpts fall back to stripped-markdown content (~160 chars) in listing cards, meta descriptions, and RSS. B1App serves `/{sdSlug}/blog` — a card grid with a category-chip filter row, bylines, and the RSS feed advertised as an alternate link — and `/{sdSlug}/blog/[postSlug]`, a dedicated route (not the Zone/Section pipeline) with a 16:9 hero image, byline, clickable category/tag chips linking back to the filtered listing, the markdown body, a "More in {category}" related-posts strip, and `BlogPosting` JSON-LD including the author. Blog URLs are included in the per-church sitemap. B1Admin's authoring UI (**Site → Blog**) edits posts in a dialog: markdown editor with preview toggle, 16:9-cropped gallery image picker, author person-picker (defaults to the editing user), category autocomplete seeded from existing categories, duplicate-slug validation, and a publish toggle; published rows link out to the live post, and the page nudges admins to add a `/blog` navigation link.

## Members-only pages

`pages.visibility` reuses the navigation-links enum — `everyone` (default), `visitors`, `members`, `staff`, `team`, `groups` (with `groupIds`) — but as a **hard access gate**, not a nav filter (`PageVisibilityHelper.canViewPage`). The flow:

1. The anonymous tree endpoint checks visibility on URL-based fetches. Anonymous callers of a gated page get `{ restricted: true, visibility }` instead of content — the tree never leaks.
2. The endpoint still honors a JWT: `CustomAuthProvider` verifies the `Authorization` header on *every* request, including anonymous routes, so an authenticated member's fetch of the same URL resolves normally.
3. B1App renders `RestrictedPage` on a `restricted` response: it hydrates the session from stored credentials, re-fetches the tree with the JWT, and renders it — or shows a login gate with a `returnUrl` when there is no session.

:::info
The gate's granularity varies by level: `groups` checks the token's `groupIds` against the page's list and `staff` checks `membershipStatus`, but `members` and `team` currently pass any authenticated user of the church. Treat `groups` as the strict option.
:::

## SEO and discoverability

All of this is B1App-side rendering over ContentApi data — the API stores, the app emits:

| Concern | How it works |
|---------|--------------|
| Meta descriptions | `pages.metaDescription` (≤300 chars) flows through `MetaHelper.getMetaData()` into the Next.js `Metadata` (description + Open Graph) on every builder-rendered route. B1Admin's page settings include an AI "Generate" button (see below) |
| Redirects | Per-church `redirects` rows managed at `/content/redirects` (`content.edit`, 200-row cap, normalized paths). On a would-be 404, B1App's page route resolves the path against `GET /content/redirects/public/:churchId` and issues an HTTP 308 via Next's `permanentRedirect`; unmatched paths fall through to `notFound()` |
| Branded 404 | `not-found.tsx` renders `BrandedNotFound` with the church's logo, name, and theme instead of a generic error |
| Structured data | `BlogPosting` JSON-LD on blog posts; `VideoObject` on the per-sermon pages (`/{sdSlug}/sermons/[sermonId]`) and on pages containing a `sermons` element; `Event` from calendar/event elements on builder pages; schema.org `Event` from the `serviceTimes` element |
| Sermon pages | Every public sermon gets a crawlable page at `/sermons/[sermonId]` with full metadata — sermons are no longer locked inside the client-side browser element |
| Analytics | The public settings key `ga4MeasurementId` (managed next to redirects in B1Admin) injects a per-church GA4 gtag via `next/script` |
| Sitemap & feeds | The per-church `sitemap.xml` route includes builder pages and blog URLs; the blog listing advertises the RSS feed |
| Accessibility | The public chrome renders a skip link targeting the `<main id="main-content">` landmark in every layout wrapper |

## AI generation (AskApi)

Page and site generation runs in **AskApi**, a separate service, under the `/website` controller. It authenticates with the same `CustomAuthProvider` JWT as everything else and is **stateless with respect to content**: every endpoint returns JSON and the caller (B1Admin) persists the result through ContentApi (`POST /content/pages/temp/ai` saves a generated page-sections-elements bundle in one call).

:::info
As of 2026-07-03, B1Admin's entry points to this pipeline — the site "AI" template in `AddPageModal`, the `SectionToolbar` rewrite button, and the pages-list "Generate Site" button — are commented out client-side while the feature is reworked. The AskApi endpoints below are unaffected and still respond; only the B1Admin UI is hidden.
:::

| Endpoint | Purpose |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | The original two-step page flow: outline first, then one call per section. B1Admin's "AI" page template in `AddPageModal` drives this — outline, then parallel section generation, then preview |
| `POST /website/generateSite` | Whole-site generation. **Two-phase by design**: a `planOnly: true` call returns just the multi-page plan (one fast model call), then the client requests full content — keeping every request inside the Lambda/API-Gateway timeout |
| `POST /website/rewriteSection` | Structure-preserving rewrite: the model may only change text-bearing answers. A recursive structure signature (ids + types + order) is compared before and after; any mismatch returns the original section with `fallback: true` instead of corrupted structure |
| `POST /website/generateAltText` | Vision call over up to 20 image URLs; returns concise alt text (≤125 chars, "photo of" prefixes stripped) |
| `POST /website/generateMetaDescription` | One SEO meta description (≤155 chars) from the page's text content — wired to the Generate button on B1Admin's page settings |

Prompts are markdown files under `AskApi/config/instructions/`, including the element catalog the model generates from. Two design points keep the catalog honest: the client passes `availableElementTypes` on every request (the prompt may only use types from that list — the server never hardcodes the full set), and the API's MCP `describe_page_builder` tool carries the same guide for AI agents working through [MCP](../api/mcp). Models are Anthropic Claude via OpenRouter — 3.5 Haiku for section content (latency), 3.5 Sonnet for outlines, site plans, and vision — with an OpenAI fallback when no OpenRouter key is configured.

## Conversational forms

Forms (membership module) gained a conversational mode aimed at connect-card-style pages. Four columns on `forms` drive it: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — apphelper's `FormSubmissionEdit` switches to the `ConversationalForm` component (one question at a time) when `displayMode` is `conversational`; B1App's form page passes the mode through. Same submission payload either way.
- **Auto-create person** — on submission with `autoCreatePerson` set, `ConversationalFormHelper.findOrCreatePerson` dedups by email (case-insensitive) and otherwise creates a household + person with `membershipStatus: "Guest"`, then links the submission to that person.
- **Follow-up email** — when a subject and body are set, the submitter gets a templated email (with `{firstName}` / `{churchName}` tokens) through the existing transactional path (`TransactionalEmailHelper`), never the notification digest door. Both side-effects are non-fatal: a failure never loses the submission.

The four fields are set via the API today; the B1Admin form editor does not expose them yet.

## Related Pages

- [Website Routing & Multi-Site](./websites) — how a request resolves to a church/site and how custom domains route
- [Content Endpoints](../api/endpoints/content) — full REST surface for pages, sections, elements, blocks, posts, redirects, and settings
- [AppHelper](../shared-libraries/app-helper) — the npm package that ships the renderers, registry, dividers, and widgets
- [MCP Server](../api/mcp) — including the `describe_page_builder` guide tool
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — the staff-facing editor documentation
