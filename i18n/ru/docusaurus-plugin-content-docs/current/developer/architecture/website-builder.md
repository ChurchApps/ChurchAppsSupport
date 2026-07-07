---
title: "Архитектура конструктора веб-сайтов"
---

# Архитектура конструктора веб-сайтов

<div class="article-intro">

Каждый веб-сайт церкви served by B1App это rendered из content дерева — страницы sections elements — stored в ContentApi и edited визуально в B1Admin. One shared компонент библиотека renders both editor preview и live site one element-type каталог defines що может appear на page и separate AI сервис может generate или rewrite این дерево. На этой странице описывается целый стек: element контракт в `@churchapps/helpers` render pipeline church-data элементы site-wide widgets blog слой access-gated страницы SEO AI generation і conversational forms.

</div>

## Обзор

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content модуль (ContentApi)     │
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

Три правила hold across стек:

1. **One дерево two renderers.** Страница это `pages → sections → elements` дерево де every node carries його настройки як `answers` JSON blob. Same apphelper компоненти render drag-and-drop editor в B1Admin і server-rendered public site в B1App — нет separate "publish format".
2. **Контракт lives в `@churchapps/helpers`.** `ElementTypes.ts` это single каталог element типи; renderers resolve через registry в apphelper; editor форми live в B1Admin. Adding element тип означає touching all три в этом order.
3. **Public site reads anonymous endpoints.** Все що B1App needs — page дерево настройки blog посты redirects і church-data endpoints в других modules — это public. Auth это optional: JWT на anonymous дерево endpoint unlocks members-only страницы nothing else changes.

## Content дерево

Content модуль (`Api/src/modules/content`) owns builder's дані:

| Таблиця | Role |
|-------|------|
| `pages` | One сторінка per URL: `url`, `title`, `layout`, плюс `visibility`/`groupIds` (access gating) і `metaDescription` (SEO) |
| `sections` | Горизонтальні смуги на сторінці (або в блоку): background text колір і `answersJSON` що carries styling плюс `dividerTop`/`dividerBottom` shape-divider конфіги |
| `elements` | Content pieces внутрі section: `elementType` + `answersJSON` nestable для layout типи (row/column carousel) |
| `blocks` | Переиспользуемые section/element групи (footer блоки element блоки) shared across сторінки |
| `posts` | Blog метадані over regular builder сторінка (see [Blog](#blog-posts-over-pages)) |
| `redirects` | Per-church `fromPath → toPath` пари capped на 200 (see [SEO](#seo-and-discoverability)) |
| `settings` | Key-value church настройки; строки flagged `public` це served анонімно і carry widget/analytics конфіг |

Целе дерево для one URL comes back з single анонімного call — `GET /content/pages/:churchId/tree?url=/about` — який це что B1App server-renders від. Editor запросы fetch by id замість і keep внутрішні ids.

## Element контракт

### Каталог (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` defines кожен element тип як `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` і JSON-schema-style `answersSchema` для його answers. `validateElementAnswers()` це deliberately lenient — unknown типи і extra ключи pass поэтому old content ніколи не breaks на catalog upgrade. **35 типи ship сегодня:**

| Категорія | Element типи |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons` element це most configurable из church типи: `layout` ответ selects `browse` (legacy full browser) `grid` `list` або `featuredLatest` з `playlistId` `itemCount` `showTitles` і `showDates` refining non-browse layouts.

### Renderers (`@churchapps/apphelper`)

Renderers live в `Packages/apphelper/src/website/components/elementTypes/` one компонент per тип resolved через `ElementRegistry.ts` — two-layer карта де `Element.tsx` registers default renderer для all 35 типи (`registerDefaultElementRenderer`) і host app може override any із них на runtime (`registerElementRenderer`) без forking package.

### Editor форми (B1Admin)

Editor's per-type настройки форми live в `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` dispatches до dedicated компонента (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) або inline field builder per тип. AI-facing дзеркало із цього каталогу це API's MCP `describe_page_builder` tool (see [MCP Server](../api/mcp)).

### Section shape dividers

Sections можуть carry декоративне shape dividers на either край. Конфіг live в section's `answersJSON` як `dividerTop` / `dividerBottom` об'єкти — `{ shape, color, height, flip }` з `shape` one із `wave, waves, slant, curve, triangle, peaks`. Apphelper ships `SectionDivider` компонент і `parseDividerConfig()` helper; обе apps' Section renderers (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parse answers і mount divider і `SectionEdit.tsx` в B1Admin provides picker UI. Packages only ship building block — section-level wiring це consuming apps' job.

## Church-data елементи

Три element типи render live church дані rather чем authored content. Module isolation все ще applies — каждый один calls owning module's own public endpoint з браузера:

| Element | Endpoint | Примечания |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returns `{ fundId, totalAmount, donationCount }` optional `?startDate=&endDate=` window; element compares це against його `goalAmount` ответ |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in only**: group мусить have `publicRoster` set (default off). Проекція це deliberately minimal — `personId` `displayName` `leader` фото — no contact або demographic поля |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returns campus → service → time дерево; apphelper renderer emits best-effort schema.org `Event` JSON-LD від це (API возвращает plain дані) |

:::warning
`publicRoster` это privacy gate для `staffGrid`. Never widen public group-member проекція або bypass flag — roster endpoint це анонимне by дизайн і minimal field список це safety property.
:::

## Site-wide widgets

Two widgets render на каждой public сторінці rather чем inside дерево: **AnnouncementBanner** (dismissible top-of-page bar) і **Launcher** (floating action hub для give/visit/watch-style ссылки). Both компоненти і їхні `parse*Config()` helpers ship в apphelper. Configuration це two public settings строки — keys `announcementBanner` і `launcher` — written by B1Admin's `SiteWidgetsEdit` (на Appearance page) і read by B1App's public layout via `GET /content/settings/public/:churchId`. API treats це як opaque key-value пари; key имена це convention между дві apps.

## Blog: посты over сторінки

Blog це thin метадані слой не second content система. `posts` строка (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) points на regular builder сторінка via `pageId`; сторінка holds body і это edited в normal page editor. Public поверхность (all анонимне `PostController`):

| Маршрут | Цель |
|-------|---------|
| `GET /content/posts/public/:churchId` | Published посты filterable by `?category=&tag=` paginated |
| `GET /content/posts/public/:churchId/slug/:slug` | One post's метадані |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed |

Post это "published" один раз `publishDate` это set і past. B1App serves `/{sdSlug}/blog` (listing с RSS feed advertised як alternate link) і `/{sdSlug}/blog/[postSlug]` які fetches backing page дерево на `/blog/{slug}` і renders це через same Zone/Section pipeline як любой other сторінка adding `BlogPosting` JSON-LD. Blog URLs це included в per-church sitemap. B1Admin's authoring UI (**Site → Blog**) creates backing сторінка на `/blog/{slug}` і `posts` строка together.

## Members-only сторінки

`pages.visibility` reuses navigation-links enum — `everyone` (default) `visitors` `members` `staff` `team` `groups` (з `groupIds`) — але як **hard access gate** не nav filter (`PageVisibilityHelper.canViewPage`). Поток:

1. Anonymous дерево endpoint checks visibility на URL-based fetches. Anonymous callers із gated сторінки get `{ restricted: true, visibility }` замість content — дерево никогда не leaks.
2. Endpoint все ще honors JWT: `CustomAuthProvider` verifies `Authorization` заголовок на *каждый* запрос включаючи анонімне маршрути поэтому authenticated member's fetch из same URL resolves normально.
3. B1App renders `RestrictedPage` на `restricted` ответе: це hydrates сеанс з stored credentials re-fetches дерево з JWT і renders це — або shows login gate з `returnUrl` когда нету сеансу.

:::info
Gate's granularity varies by level: `groups` checks token's `groupIds` против page's список і `staff` checks `membershipStatus` але `members` і `team` currently pass any authenticated user із church. Treat `groups` як strict опцію.
:::

## SEO і discoverability

All з this це B1App-side rendering over ContentApi дані — API stores app emits:

| Concern | Как це works |
|---------|--------------|
| Meta описання | `pages.metaDescription` (≤300 chars) flows через `MetaHelper.getMetaData()` в Next.js `Metadata` (description + Open Graph) на каждом builder-rendered маршруте. B1Admin's сторінка настройки include AI "Generate" кнопка (see ниже) |
| Redirects | Per-church `redirects` строки managed на `/content/redirects` (`content.edit` 200-row cap нормализовані paths). На would-be 404 B1App's page маршрут resolves path против `GET /content/redirects/public/:churchId` і issues HTTP 308 через Next's `permanentRedirect`; unmatched path fall через к `notFound()` |
| Branded 404 | `not-found.tsx` renders `BrandedNotFound` з church's logo имя і theme замість generic error |
| Structured дані | `BlogPosting` JSON-LD на blog посты; `VideoObject` на per-sermon сторінки (`/{sdSlug}/sermons/[sermonId]`) і на сторінке containing `sermons` element; `Event` із calendar/event елементи на builder сторінке; schema.org `Event` із `serviceTimes` element |
| Sermon сторінке | Каждый public sermon gets crawlable сторінка на `/sermons/[sermonId]` з full метадані — серьёзные are больше не locked внутрі client-side browser element |
| Analytics | Public настройки key `ga4MeasurementId` (managed next to redirects в B1Admin) injects per-church GA4 gtag через `next/script` |
| Sitemap & feeds | Per-church `sitemap.xml` маршрут includes builder сторінке і blog URLs; blog listing advertises RSS feed |
| Доступность | Public chrome renders skip link targeting `<main id="main-content">` landmark в каждом layout wrapper |

## AI generation (AskApi)

Page і site generation runs в **AskApi** separate сервис under `/website` контроллер. Це authenticates з same `CustomAuthProvider` JWT як всё else і це **stateless относно content**: каждый endpoint returns JSON і caller (B1Admin) persists результат через ContentApi (`POST /content/pages/temp/ai` saves generated page-sections-elements bundle в one call).

:::info
As із 2026-07-03 B1Admin's entry point к це pipeline — site "AI" template в `AddPageModal` `SectionToolbar` rewrite кнопка і pages-list "Generate Site" кнопка — це commented out client-side пока feature це reworked. AskApi endpoints ниже це unaffected і все ще respond; только B1Admin UI це hidden.
:::

| Endpoint | Цель |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Original two-step page поток: outline сначала затем one call per section. B1Admin's "AI" page template в `AddPageModal` drives це — outline затем parallel section generation затем preview |
| `POST /website/generateSite` | Whole-site generation. **Two-phase by дизайн**: `planOnly: true` call returns только multi-page plan (one fast модель call) затем client requests full content — keeping каждый request inside Lambda/API-Gateway timeout |
| `POST /website/rewriteSection` | Structure-preserving rewrite: модель may только change text-bearing answers. Recursive structure signature (ids + типи + order) это compared before і after; any mismatch returns оригинальний section з `fallback: true` замість corrupted structure |
| `POST /website/generateAltText` | Vision call over up к 20 image URLs; returns concise alt text (≤125 chars "photo of" префіксы stripped) |
| `POST /website/generateMetaDescription` | One SEO meta описання (≤155 chars) з page's text content — wired к Generate кнопка на B1Admin's сторінка настройки |

Prompts це markdown файли under `AskApi/config/instructions/` включаючи element каталог модель generates з. Two дизайн точки keep каталог honest: client passes `availableElementTypes` на каждый request (prompt может only use типи із це список — сервер никогда не hardcodes повне set) і API's MCP `describe_page_builder` tool carries same guide для AI агентів working через [MCP](../api/mcp). Моделі це Anthropic Claude через OpenRouter — 3.5 Haiku для section content (latency) 3.5 Sonnet для outlines site плани і vision — з OpenAI fallback коли no OpenRouter ключ це configured.

## Conversational forms

Forms (membership модуль) gained conversational режим aimed на connect-card-style сторінке. Four стовпці на `forms` drive це: `displayMode` (`standard` | `conversational`) `autoCreatePerson` `followUpSubject` `followUpBody`.

- **Rendering** — apphelper's `FormSubmissionEdit` switches до `ConversationalForm` компонент (one question на раз) коли `displayMode` це `conversational`; B1App's form сторінка passes режим через. Same submission payload либо way.
- **Auto-create person** — на submission з `autoCreatePerson` set `ConversationalFormHelper.findOrCreatePerson` dedups by email (case-insensitive) і otherwise creates домашнее хозяйство + person з `membershipStatus: "Guest"` затем links submission до這 person.
- **Follow-up email** — коли subject і body це set submitter gets templated email (з `{firstName}` / `{churchName}` токены) через existing transactional path (`TransactionalEmailHelper`) никогда notification дайджест door. Both side-effects це non-fatal: failure никогда не loses submission.

Four поля це set через API сегодня; B1Admin форма editor не expose їх yet.

## Пов'язані сторінки

- [Website Routing & Multi-Site](./websites) — як request resolves до church/site і як custom domains маршрут
- [Content Endpoints](../api/endpoints/content) — full REST поверхність для pages sections elements blocks посты redirects і настройки
- [AppHelper](../shared-libraries/app-helper) — npm package що ships renderers registry dividers і widgets
- [MCP Server](../api/mcp) — включаючи `describe_page_builder` guide tool
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — staff-facing editor документація
