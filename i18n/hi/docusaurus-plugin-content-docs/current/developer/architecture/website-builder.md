---
title: "Website Builder आर्किटेक्चर"
---

# Website Builder आर्किटेक्चर

<div class="article-intro">

B1App द्वारा सर्व की गई हर चर्च वेबसाइट एक content tree — pages, sections, elements — से रेंडर होती है जो ContentApi में स्टोर है और B1Admin में visually edit की जाती है। एक शेयर्ड component library editor preview और live साइट दोनों को रेंडर करती है, एक element-type catalog परिभाषित करता है कि एक पेज पर क्या दिखाई दे सकता है, और एक अलग AI सेवा उस tree को generate या rewrite कर सकती है। यह पृष्ठ पूरे स्टैक को मैप करता है: `@churchapps/helpers` में element कॉन्ट्रैक्ट, render pipeline, चर्च-डेटा elements, site-wide widgets, blog लेयर, access-gated pages, SEO, AI generation, और conversational forms।

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

पूरे स्टैक में तीन नियम लागू होते हैं:

1. **एक tree, दो renderers।** एक पेज एक `pages → sections → elements` tree है जहाँ हर node अपनी सेटिंग्स को एक `answers` JSON blob के रूप में carry करता है। वही apphelper components B1Admin में drag-and-drop editor और B1App में server-rendered public साइट दोनों को रेंडर करते हैं — कोई अलग "publish format" नहीं है।
2. **कॉन्ट्रैक्ट `@churchapps/helpers` में रहता है।** `ElementTypes.ts` element types का एकमात्र catalog है; renderers apphelper में एक registry के ज़रिए resolve होते हैं; editor forms B1Admin में रहते हैं। एक element type जोड़ने का मतलब है तीनों को उसी क्रम में छूना।
3. **Public साइट anonymous endpoints पढ़ती है।** B1App को जो कुछ चाहिए — page tree, settings, blog posts, redirects, और अन्य मॉड्यूल में चर्च-डेटा endpoints — सब public है। Auth वैकल्पिक है: anonymous tree endpoint पर एक JWT members-only pages को unlock करता है, बाकी कुछ नहीं बदलता।

## Content tree

Content मॉड्यूल (`Api/src/modules/content`) builder के डेटा का मालिक है:

| टेबल | भूमिका |
|-------|------|
| `pages` | प्रति URL एक पेज: `url`, `title`, `layout`, प्लस `visibility`/`groupIds` (access gating) और `metaDescription` (SEO) |
| `sections` | एक पेज (या एक block) पर horizontal bands: background, text color, और एक `answersJSON` जो styling प्लस `dividerTop`/`dividerBottom` shape-divider configs carry करता है |
| `elements` | एक section के अंदर content pieces: `elementType` + `answersJSON`, layout types (row/column, carousel) के लिए nestable |
| `blocks` | Pages में शेयर की गई reusable section/element groups (footer blocks, element blocks) |
| `posts` | स्वतंत्र blog posts (देखें [Blog](#blog)) |
| `redirects` | प्रति-चर्च `fromPath → toPath` जोड़े, 200 पर capped (देखें [SEO](#seo-and-discoverability)) |
| `settings` | Key-value चर्च सेटिंग्स; `public` फ़्लैग वाली rows anonymously सर्व होती हैं और widget/analytics कॉन्फ़िग carry करती हैं |

एक URL के लिए पूरा tree एक ही anonymous कॉल से वापस आता है — `GET /content/pages/:churchId/tree?url=/about` — जिससे B1App server-render करता है। Editor requests इसके बजाय id से fetch करती हैं और internal ids रखती हैं।

## Element कॉन्ट्रैक्ट

### Catalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` हर element type को एक `ElementTypeDefinition` के रूप में परिभाषित करता है: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, और इसके answers के लिए एक JSON-schema-style `answersSchema`। `validateElementAnswers()` जानबूझकर lenient है — अज्ञात types और अतिरिक्त keys पास हो जाती हैं, इसलिए पुराना content कभी catalog अपग्रेड पर नहीं टूटता। **आज 35 types शिप होते हैं:**

| श्रेणी | Element types |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons` element चर्च types में सबसे configurable है: एक `layout` answer `browse` (legacy full browser), `grid`, `list`, या `featuredLatest` चुनता है, `playlistId`, `itemCount`, `showTitles`, और `showDates` non-browse layouts को refine करते हुए।

### Renderers (`@churchapps/apphelper`)

Renderers `Packages/apphelper/src/website/components/elementTypes/` में रहते हैं, प्रति type एक component, `ElementRegistry.ts` के ज़रिए resolved — एक two-layer map जहाँ `Element.tsx` सभी 35 types के लिए डिफ़ॉल्ट renderer रजिस्टर करता है (`registerDefaultElementRenderer`) और एक host app runtime पर पैकेज को fork किए बिना इनमें से किसी को भी override कर सकता है (`registerElementRenderer`)।

### Editor forms (B1Admin)

Editor के प्रति-type settings forms `B1Admin/src/site/admin/elements/` में रहते हैं — `ElementEdit.tsx` एक dedicated component को dispatch करता है (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) या प्रति type एक inline field builder को। इस catalog का AI-facing mirror API का MCP `describe_page_builder` टूल है (देखें [MCP Server](../api/mcp))।

### Section shape dividers

Sections किसी भी किनारे पर decorative shape dividers carry कर सकते हैं। कॉन्फ़िग section के `answersJSON` में `dividerTop` / `dividerBottom` ऑब्जेक्ट्स के रूप में रहता है — `{ shape, color, height, flip }` जिसमें `shape` `wave, waves, slant, curve, triangle, peaks` में से एक है। Apphelper `SectionDivider` component और `parseDividerConfig()` helper शिप करता है; दोनों ऐप्स के Section renderers (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) answers को parse करते हैं और divider को mount करते हैं, और B1Admin में `SectionEdit.tsx` picker UI प्रदान करता है। पैकेज केवल building block शिप करते हैं — section-level वायरिंग उपभोक्ता ऐप्स का काम है।

## चर्च-डेटा elements

तीन element types authored content के बजाय live चर्च डेटा रेंडर करते हैं। Module isolation फिर भी लागू होता है — हर एक ब्राउज़र से मालिक मॉड्यूल के अपने public endpoint को कॉल करता है:

| Element | Endpoint | नोट्स |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }` लौटाता है, वैकल्पिक `?startDate=&endDate=` विंडो; element इसे अपने `goalAmount` answer के विरुद्ध compare करता है |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **केवल Opt-in**: group के पास `publicRoster` सेट होना चाहिए (डिफ़ॉल्ट बंद)। Projection जानबूझकर न्यूनतम है — `personId`, `displayName`, `leader`, फोटो — कोई contact या demographic फ़ील्ड नहीं |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Campus → service → time tree लौटाता है; apphelper renderer इससे best-effort schema.org `Event` JSON-LD emit करता है (API सादा डेटा लौटाता है) |

:::warning
`publicRoster` `staffGrid` के लिए privacy gate है। Public group-member projection को कभी widen न करें या फ़्लैग को bypass न करें — roster endpoint design से anonymous है और न्यूनतम field सूची ही safety property है।
:::

## Site-wide widgets

दो widgets tree के अंदर के बजाय हर public पेज पर रेंडर होते हैं: **AnnouncementBanner** (dismissible top-of-page bar) और **Launcher** (give/visit/watch-style links के लिए floating action hub)। दोनों components और उनके `parse*Config()` helpers apphelper में शिप होते हैं। कॉन्फ़िगरेशन दो public settings rows हैं — keys `announcementBanner` और `launcher` — B1Admin के `SiteWidgetsEdit` (Appearance पेज पर) द्वारा लिखी गई और B1App के public layout द्वारा `GET /content/settings/public/:churchId` से पढ़ी गई। API इन्हें opaque key-value जोड़ों के रूप में treat करता है; key नाम दोनों ऐप्स के बीच एक परंपरा हैं।

## Blog

Blog एक स्वतंत्र content type है, builder pages के ऊपर एक लेयर नहीं। एक `posts` row पूरा post रखता है: `title`, `slug`, `excerpt`, `content` (markdown body), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`। Public सतह (सभी anonymous, `PostController`):

| Route | उद्देश्य |
|-------|---------|
| `GET /content/posts/public/:churchId` | Published posts, `?category=&tag=` से फ़िल्टर करने योग्य, paginated |
| `GET /content/posts/public/:churchId/categories` | Published posts में विशिष्ट categories |
| `GET /content/posts/public/:churchId/slug/:slug` | एक published post |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed, चर्च के नाम से titled, प्रति-आइटम category और excerpt-or-content description के साथ |

एक post "published" तब होता है जब `publishDate` सेट हो और बीत चुकी हो; भविष्य की `publishDate` एक scheduled post है (publicly छिपी, admin में एक Scheduled chip के साथ दिखाई गई)। Read endpoints हर post को `authorName` से समृद्ध करते हैं, जो membership module gateway के ज़रिए `authorId` से resolve किया जाता है। गायब excerpts listing कार्ड्स, meta descriptions, और RSS में stripped-markdown content (~160 अक्षर) पर fallback करते हैं। B1App `/{sdSlug}/blog` सर्व करता है — एक editorial listing (केंद्रित header जो filter होने पर सक्रिय category/tag नाम बन जाता है, category-chip filter row, byline और excerpts वाली thumbnail-left post rows) जिसमें RSS feed एक alternate link के रूप में विज्ञापित है — और `/{sdSlug}/blog/[postSlug]`, एक dedicated route (Zone/Section pipeline नहीं) एक केंद्रित header (category kicker, title, byline, primary-color accent rule) के साथ, container चौड़ाई पर एक 16:9 hero, ~720px पढ़ने वाले कॉलम में markdown body, article footer में tag chips, एक `"More in {category}"` related-posts strip, और author सहित `BlogPosting` JSON-LD। दोनों pages पूरी तरह theme tokens से स्टाइल होते हैं इसलिए ये हर चर्च के palette को विरासत में लेते हैं। Blog URLs प्रति-चर्च sitemap में शामिल हैं। B1Admin का authoring UI (**Site → Blog**) एक dialog में posts edit करता है: preview toggle वाला markdown editor, 16:9-cropped gallery image picker, author person-picker (editing यूज़र से डिफ़ॉल्ट), मौजूदा categories से seeded category autocomplete, duplicate-slug validation, और एक publish toggle; published rows live post से लिंक करती हैं, और पेज admins को एक `/blog` navigation link जोड़ने के लिए प्रेरित करता है।

## Members-only pages

`pages.visibility` navigation-links enum को दोबारा उपयोग करता है — `everyone` (डिफ़ॉल्ट), `visitors`, `members`, `staff`, `team`, `groups` (`groupIds` के साथ) — लेकिन एक nav filter के बजाय एक **hard access gate** के रूप में (`PageVisibilityHelper.canViewPage`)। फ़्लो:

1. Anonymous tree endpoint URL-आधारित fetches पर visibility चेक करता है। एक gated पेज के anonymous callers को content के बजाय `{ restricted: true, visibility }` मिलता है — tree कभी लीक नहीं होता।
2. Endpoint फिर भी एक JWT का सम्मान करता है: `CustomAuthProvider` *हर* रिक्वेस्ट पर `Authorization` header को verify करता है, anonymous routes सहित, इसलिए उसी URL का एक authenticated member का fetch सामान्य रूप से resolve होता है।
3. B1App एक `restricted` response पर `RestrictedPage` रेंडर करता है: यह stored credentials से session को hydrate करता है, JWT के साथ tree को दोबारा fetch करता है, और इसे रेंडर करता है — या जब कोई session नहीं है तो एक `returnUrl` के साथ एक login gate दिखाता है।

:::info
Gate की granularity स्तर के हिसाब से अलग होती है: `groups` टोकन के `groupIds` को पेज की सूची के विरुद्ध चेक करता है और `staff` `membershipStatus` चेक करता है, लेकिन `members` और `team` अभी चर्च के किसी भी authenticated यूज़र को pass करते हैं। `groups` को सख़्त विकल्प मानें।
:::

## SEO और discoverability

यह सब ContentApi डेटा पर B1App-side rendering है — API स्टोर करती है, ऐप emit करता है:

| सरोकार | यह कैसे काम करता है |
|---------|--------------|
| Meta descriptions | `pages.metaDescription` (≤300 अक्षर) हर builder-rendered route पर `MetaHelper.getMetaData()` से होकर Next.js `Metadata` (description + Open Graph) में जाता है। B1Admin की page settings में एक AI "Generate" बटन शामिल है (नीचे देखें) |
| Redirects | `/content/redirects` पर मैनेज की गई प्रति-चर्च `redirects` rows (`content.edit`, 200-row cap, normalized paths)। एक संभावित 404 पर, B1App का page route `GET /content/redirects/public/:churchId` के विरुद्ध पाथ को resolve करता है और Next के `permanentRedirect` से एक HTTP 308 जारी करता है; बेमेल पाथ `notFound()` पर गिर जाते हैं |
| Branded 404 | `not-found.tsx` एक generic error के बजाय चर्च के logo, नाम, और theme के साथ `BrandedNotFound` रेंडर करता है |
| Structured data | Blog posts पर `BlogPosting` JSON-LD; प्रति-sermon pages (`/{sdSlug}/sermons/[sermonId]`) पर और एक `sermons` element वाले pages पर `VideoObject`; builder pages पर calendar/event elements से `Event`; `serviceTimes` element से schema.org `Event` |
| Sermon pages | हर public sermon को पूरे metadata के साथ `/sermons/[sermonId]` पर एक crawlable पेज मिलता है — sermons अब client-side browser element के अंदर locked नहीं रहते |
| Analytics | Public settings key `ga4MeasurementId` (B1Admin में redirects के बगल में मैनेज) `next/script` के ज़रिए एक प्रति-चर्च GA4 gtag inject करता है |
| Sitemap & feeds | प्रति-चर्च `sitemap.xml` route में builder pages और blog URLs शामिल हैं; blog listing RSS feed को विज्ञापित करती है |
| Accessibility | Public chrome हर layout wrapper में `<main id="main-content">` landmark को लक्षित करने वाला एक skip link रेंडर करता है |

## AI generation (AskApi)

पेज और साइट generation **AskApi** में चलती है, एक अलग सेवा, `/website` कंट्रोलर के तहत। यह बाकी सब चीज़ों जैसे ही `CustomAuthProvider` JWT से authenticate करती है और content के मामले में **stateless** है: हर endpoint JSON लौटाता है और caller (B1Admin) ContentApi के ज़रिए परिणाम को persist करता है (`POST /content/pages/temp/ai` एक generated page-sections-elements bundle को एक ही कॉल में सेव करता है)।

:::info
2026-07-03 तक, इस pipeline के B1Admin entry points — `AddPageModal` में साइट "AI" template, `SectionToolbar` rewrite बटन, और pages-list "Generate Site" बटन — फ़ीचर को दोबारा काम करते समय client-side commented out हैं। नीचे दिए गए AskApi endpoints प्रभावित नहीं हैं और अभी भी respond करते हैं; केवल B1Admin UI छिपा है।
:::

| Endpoint | उद्देश्य |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | मूल दो-चरण page फ़्लो: पहले outline, फिर प्रति section एक कॉल। B1Admin का `AddPageModal` में "AI" page template इसे चलाता है — outline, फिर parallel section generation, फिर preview |
| `POST /website/generateSite` | पूरी साइट generation। **डिज़ाइन से दो-चरण**: एक `planOnly: true` कॉल केवल multi-page plan लौटाता है (एक तेज़ model कॉल), फिर क्लाइंट पूरा content माँगता है — हर रिक्वेस्ट को Lambda/API-Gateway timeout के अंदर रखते हुए |
| `POST /website/rewriteSection` | संरचना-संरक्षक rewrite: model केवल text-carrying answers बदल सकता है। पहले और बाद में एक recursive structure signature (ids + types + order) compare की जाती है; कोई भी बेमेल corrupted संरचना के बजाय `fallback: true` के साथ मूल section लौटाता है |
| `POST /website/generateAltText` | 20 तक image URLs पर एक vision कॉल; संक्षिप्त alt text लौटाता है (≤125 अक्षर, "photo of" prefixes हटाए गए) |
| `POST /website/generateMetaDescription` | पेज के text content से एक SEO meta description (≤155 अक्षर) — B1Admin की page settings पर Generate बटन से जुड़ा |

Prompts `AskApi/config/instructions/` के तहत markdown फ़ाइलें हैं, जिनमें वह element catalog शामिल है जिससे model generate करता है। दो डिज़ाइन बिंदु catalog को honest रखते हैं: क्लाइंट हर रिक्वेस्ट पर `availableElementTypes` पास करता है (prompt केवल उस सूची के types का उपयोग कर सकता है — सर्वर कभी पूरा सेट hardcode नहीं करता), और API का MCP `describe_page_builder` टूल AI agents के लिए [MCP](../api/mcp) के ज़रिए काम करते हुए वही गाइड carry करता है। Models OpenRouter के ज़रिए Anthropic Claude हैं — section content के लिए 3.5 Haiku (latency), outlines, site plans, और vision के लिए 3.5 Sonnet — जब कोई OpenRouter key कॉन्फ़िगर नहीं है तो एक OpenAI fallback के साथ।

## Conversational forms

Forms (membership मॉड्यूल) ने connect-card-style pages के लिए लक्षित एक conversational मोड हासिल किया। `forms` पर चार columns इसे चलाते हैं: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`।

- **Rendering** — apphelper का `FormSubmissionEdit` `ConversationalForm` component (एक बार में एक सवाल) पर स्विच करता है जब `displayMode` `conversational` हो; B1App का form पेज मोड को आगे पास करता है। दोनों तरह से वही submission payload।
- **Auto-create person** — `autoCreatePerson` सेट के साथ submission पर, `ConversationalFormHelper.findOrCreatePerson` email से dedupe करता है (case-insensitive) और अन्यथा `membershipStatus: "Guest"` के साथ एक household + person बनाता है, फिर submission को उस व्यक्ति से लिंक करता है।
- **Follow-up ईमेल** — जब एक subject और body सेट हों, submitter को मौजूदा transactional पाथ (`TransactionalEmailHelper`) के ज़रिए एक templated ईमेल मिलता है (`{firstName}` / `{churchName}` tokens के साथ), कभी notification digest दरवाज़े से नहीं। दोनों side-effects non-fatal हैं: एक विफलता कभी submission को खोने नहीं देती।

चार फ़ील्ड्स आज API के ज़रिए सेट होते हैं; B1Admin का form editor अभी इन्हें expose नहीं करता।

## संबंधित पृष्ठ

- [Website Routing & Multi-Site](./websites) — कैसे एक रिक्वेस्ट किसी चर्च/साइट को resolve करती है और custom domains कैसे route होते हैं
- [Content Endpoints](../api/endpoints/content) — pages, sections, elements, blocks, posts, redirects, और settings के लिए पूर्ण REST सतह
- [AppHelper](../shared-libraries/app-helper) — वह npm पैकेज जो renderers, registry, dividers, और widgets शिप करता है
- [MCP Server](../api/mcp) — `describe_page_builder` गाइड टूल सहित
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — स्टाफ़-facing editor डॉक्यूमेंटेशन
