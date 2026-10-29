---
title: "Website Builder आर्किटेक्चर"
---

# Website Builder आर्किटेक्चर

<div class="article-intro">

B1App द्वारा परोसी जाने वाली हर चर्च वेबसाइट एक content tree से रेंडर होती है -- pages, sections, elements -- जो ContentApi में संग्रहीत है और B1Admin में दृश्यात्मक रूप से संपादित होती है। एक साझा component library editor preview और लाइव साइट दोनों को रेंडर करती है, एक element-type catalog परिभाषित करता है कि किसी पेज पर क्या आ सकता है, और एक अलग AI सेवा उस tree को generate या rewrite कर सकती है। यह पृष्ठ पूरे स्टैक को मैप करता है: `@churchapps/helpers` में element contract, render pipeline, church-data elements, साइट-व्यापी widgets, blog परत, access-gated pages, SEO, AI generation, और conversational forms।

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

इस स्टैक में तीन नियम लागू होते हैं:

1. **एक tree, दो renderers।** एक पेज एक `pages → sections → elements` tree है जहाँ हर नोड अपनी सेटिंग्स एक `answers` JSON blob के रूप में रखता है। वही apphelper components B1Admin का drag-and-drop editor और B1App का सर्वर-रेंडर्ड सार्वजनिक साइट दोनों रेंडर करते हैं -- कोई अलग "publish format" नहीं है।
2. **contract `@churchapps/helpers` में रहता है।** `ElementTypes.ts` element types की एकमात्र catalog है; renderers apphelper में एक registry के माध्यम से हल होते हैं; editor forms B1Admin में रहते हैं। नया element type जोड़ने का अर्थ है तीनों को इसी क्रम में छूना।
3. **सार्वजनिक साइट गुमनाम endpoints पढ़ती है।** B1App को जो कुछ भी चाहिए -- pages tree, सेटिंग्स, blog posts, redirects, और अन्य modules के church-data endpoints -- सार्वजनिक है। Auth वैकल्पिक है: गुमनाम tree endpoint पर JWT केवल members-only पेजों को खोलता है, और कुछ नहीं बदलता।

## Content tree

content module (`Api/src/modules/content`) builder का डेटा रखता है:

| Table | भूमिका |
|-------|------|
| `pages` | हर URL के लिए एक पेज: `url`, `title`, `layout`, साथ में `visibility`/`groupIds` (access gating) और `metaDescription` (SEO) |
| `sections` | एक पेज (या block) पर क्षैतिज पट्टियाँ: background, text color, और एक `answersJSON` जो styling के साथ `dividerTop`/`dividerBottom` shape-divider configs रखता है |
| `elements` | एक section के भीतर सामग्री टुकड़े: `elementType` + `answersJSON`, layout प्रकारों (row/column, carousel) के लिए nestable |
| `blocks` | पुन: उपयोग योग्य section/element समूह (footer blocks, element blocks) जो पेजों में साझा होते हैं |
| `posts` | स्वतंत्र blog posts (देखें [Blog](#blog)) |
| `redirects` | प्रति-चर्च `fromPath → toPath` जोड़े, 200 तक सीमित (देखें [SEO](#seo-and-discoverability)) |
| `settings` | key-value चर्च सेटिंग्स; `public` चिह्नित पंक्तियाँ गुमनाम रूप से परोसी जाती हैं और widget/analytics कॉन्फ़िग रखती हैं |

एक URL के लिए पूरा tree एक एकल गुमनाम कॉल से वापस आता है -- `GET /content/pages/:churchId/tree?url=/about` -- और B1App इसी से सर्वर-रेंडर करता है। editor अनुरोध इसके बजाय id से प्राप्त करते हैं और आंतरिक ids रखते हैं।

## Element contract

### Catalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` हर element type को एक `ElementTypeDefinition` के रूप में परिभाषित करता है: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, और उसके answers के लिए एक JSON-schema-शैली `answersSchema`। `validateElementAnswers()` जानबूझकर उदार है -- अज्ञात types और अतिरिक्त keys पास हो जाते हैं, ताकि catalog के अपग्रेड पर पुरानी सामग्री कभी न टूटे। **आज 35 types शिप होते हैं:**

| Category | Element types |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons` element चर्च types में सबसे अधिक कॉन्फ़िगर योग्य है: एक `layout` answer `browse` (पुराना पूर्ण browser), `grid`, `list`, या `featuredLatest` चुनता है, जिसमें `playlistId`, `itemCount`, `showTitles`, और `showDates` गैर-browse layouts को परिष्कृत करते हैं।

`rawHTML` element के दो answers हैं: `rawHTML` (markup) और `javascript`। `innerHTML` के माध्यम से डाली गई scripts कभी execute नहीं होतीं, इसलिए `RawHTMLElement` markup में हर `<script>` node को एक ताज़ा element के रूप में पुनः बनाता है। ये non-parser-inserted nodes CSP के `strict-dynamic` के अंतर्गत विश्वसनीय माने जाते हैं। एक `javascript` answer जो `<` से शुरू होता है (एक vendor snippet जो अपने `<script>` tags के साथ चिपकाया गया है) markup के रूप में parse होता है और वही उपचार पाता है। अन्यथा यह एक साधारण inline script के रूप में चलता है। B1Admin JavaScript बॉक्स में एक अकेले URL को चिह्नित करता है, क्योंकि एक अकेला URL no-op script के रूप में चलता है। `map` element कुछ भी रेंडर नहीं करता, और जब कोई Maps API key कॉन्फ़िगर न हो तो Google Maps script लोड नहीं करता।

### Renderers (`@churchapps/apphelper`)

Renderers `Packages/apphelper/src/website/components/elementTypes/` में रहते हैं, हर type के लिए एक component, `ElementRegistry.ts` के माध्यम से हल होते हैं -- एक दो-परत map जहाँ `Element.tsx` सभी 35 types के लिए डिफ़ॉल्ट renderer register करता है (`registerDefaultElementRenderer`), और एक host app पैकेज को fork किए बिना किसी भी को runtime पर override कर सकता है (`registerElementRenderer`)।

### Editor forms (B1Admin)

editor के प्रति-type सेटिंग्स forms `B1Admin/src/site/admin/elements/` में रहते हैं -- `ElementEdit.tsx` एक समर्पित component (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) या प्रति type एक inline field builder की ओर भेजता है। इस catalog का AI-facing प्रतिबिंब API का MCP `describe_page_builder` tool है (देखें [MCP Server](../api/mcp))।

editor preview वही `Theme` माउंट करता है जो लाइव साइट पर है, जो चर्च की global styles से `--headingFont` / `--bodyFont` CSS variables सेट करता है। B1App इन variables को `pages.css` के माध्यम से लागू करता है, जिसे B1Admin import नहीं कर सकता, इसलिए `ContentEditor.tsx` `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) इंजेक्ट करता है ताकि उन्हें `.page` body text और `h1`–`h6` पर लागू किया जा सके। इसके बिना preview में headings admin font में दिखती थीं।

### Section shape dividers

Sections किसी भी किनारे पर सजावटी shape dividers रख सकते हैं। कॉन्फ़िग section के `answersJSON` में `dividerTop` / `dividerBottom` objects के रूप में रहता है -- `{ shape, color, height, flip }` जहाँ `shape` `wave, waves, slant, curve, triangle, peaks` में से एक है। apphelper `SectionDivider` component और `parseDividerConfig()` helper शिप करता है; दोनों apps के Section renderers (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) answers parse करते हैं और divider माउंट करते हैं, और B1Admin में `SectionEdit.tsx` picker UI देता है। packages केवल building block शिप करते हैं -- section-स्तर की वायरिंग उपभोक्ता apps का काम है।

## Church-data elements

तीन element types लाइव चर्च डेटा रेंडर करते हैं, लिखित सामग्री नहीं। मॉड्यूल अलगाव लागू रहता है -- हर एक ब्राउज़र से मालिक मॉड्यूल का अपना सार्वजनिक endpoint कॉल करता है:

| Element | Endpoint | नोट्स |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }` लौटाता है, वैकल्पिक `?startDate=&endDate=` विंडो के साथ; element इसकी तुलना अपने `goalAmount` answer से करता है |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **केवल opt-in**: समूह पर `publicRoster` सेट होना चाहिए (डिफ़ॉल्ट off)। प्रक्षेपण जानबूझकर न्यूनतम है -- `personId`, `displayName`, `leader`, फ़ोटो -- कोई संपर्क या जनसांख्यिकीय फ़ील्ड नहीं |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | campus → service → time tree लौटाता है; apphelper renderer इससे best-effort schema.org `Event` JSON-LD emit करता है (API सादा डेटा लौटाता है) |

:::warning
`publicRoster` `staffGrid` का गोपनीयता द्वार है। सार्वजनिक समूह-सदस्य प्रक्षेपण को कभी चौड़ा न करें या flag को बायपास न करें -- roster endpoint डिज़ाइन से गुमनाम है और न्यूनतम फ़ील्ड सूची ही सुरक्षा गुण है।
:::

### Calendar element और event पेज

`calendar` element के answers हैं `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, डिफ़ॉल्ट, या `upcoming`), और `tag`। B1App `src/components/Element.tsx` में `registerElementRenderer("calendar", …)` के साथ apphelper renderer को override करता है:

- **`display: "upcoming"`** B1App का `UpcomingEventsElement` रेंडर करता है: यह `GET /content/events/public/group/:churchId/:groupId` या `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId` लोड करता है, `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, एक वर्ष के भीतर हर event के लिए एक occurrence) से पुनरावृत्तियाँ विस्तारित करता है, और पहले 12 को फ़ोटो टाइल्स (`events.photoUrl`, थीम के गहरे रंग पर शीर्षक पर fallback) के रूप में दिखाता है जो `/events/{id}` से लिंक होती हैं, साथ में कैलेंडर के ICS feed के लिए Subscribe मेनू।
- **`display: "month"`** apphelper का `CalendarElement` रेंडर करता है जिसमें `eventUrl` callback होता है। `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` क्लिक पर विवरण dialog खोलने के बजाय उस URL पर navigate करते हैं (B1Admin `eventUrl` पास नहीं करता, इसलिए admin calendar अपना dialog रखता है)।
- **`tag`** दोनों displays को `EventHelper.hasTag()` (`@churchapps/helpers`) से फ़िल्टर करता है: comma-separated `events.tags` के विरुद्ध case-insensitive मिलान; खाली होने पर सब कुछ दिखता है। curated-calendar join `e.tags` चुनता है ताकि curated events उन्हें रखें।

Curated events `realEventId` (`eventPageId()`) से लिंक होते हैं, इसलिए URL हमेशा अंतर्निहित event का नाम लेता है। `/{sdSlug}/events/[eventId]` एक समर्पित route है (builder pipeline नहीं): यह `GET /content/events/public/:churchId/:id` लोड करता है -- जो pending/rejected events के लिए और बिना registration वाले private events के लिए `null` लौटाता है, और गैर-rejected room bookings से `roomNames` जोड़ता है -- `EventPageContent` रेंडर करता है (फ़ोटो hero, markdown विवरण, When/Where aside, `registrationEnabled` होने पर **Register for this Event**, और `GET /content/events/public/:churchId/:id/ical` के लिए **Add to my calendar** लिंक), फ़ोटो को Open Graph image के रूप में उपयोग करता है, और `EventPageJsonLd` के माध्यम से अगली पुनरावृत्ति के लिए `Event` JSON-LD emit करता है। अज्ञात या छिपा हुआ event एक वास्तविक 404 लौटाता है।

## साइट-व्यापी widgets

दो widgets हर सार्वजनिक पेज पर रेंडर होते हैं, tree के अंदर नहीं: **AnnouncementBanner** (खारिज करने योग्य शीर्ष बार) और **Launcher** (give/visit/watch-शैली लिंकों के लिए फ़्लोटिंग action hub)। दोनों components और उनके `parse*Config()` helpers apphelper में शिप होते हैं। कॉन्फ़िगरेशन दो सार्वजनिक settings पंक्तियाँ हैं -- keys `announcementBanner` और `launcher` -- जो B1Admin के `SiteWidgetsEdit` (Appearance पृष्ठ पर) द्वारा लिखी जाती हैं और B1App की सार्वजनिक layout द्वारा `GET /content/settings/public/:churchId` से पढ़ी जाती हैं। API इन्हें अपारदर्शी key-value जोड़ियों के रूप में मानता है; key नाम दोनों apps के बीच एक परिपाटी हैं।

## Blog

blog एक स्वतंत्र content type है, builder पेजों की परत नहीं। एक `posts` पंक्ति पूरा post रखती है: `title`, `slug`, `excerpt`, `content` (markdown body), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`। सार्वजनिक सतह (सभी गुमनाम, `PostController`):

| Route | उद्देश्य |
|-------|------|
| `GET /content/posts/public/:churchId` | प्रकाशित posts, `?category=&tag=` से फ़िल्टर योग्य, पृष्ठांकित |
| `GET /content/posts/public/:churchId/categories` | प्रकाशित posts में अलग-अलग categories |
| `GET /content/posts/public/:churchId/slug/:slug` | एक प्रकाशित post |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed, चर्च के नाम पर शीर्षक, प्रति item category और excerpt-या-content विवरण के साथ |

एक post तब "published" है जब `publishDate` सेट और बीत चुकी हो; भविष्य का `publishDate` एक शेड्यूल्ड post है (सार्वजनिक रूप से छिपा, admin में Scheduled चिप के साथ दिखाया गया)। पढ़ने के endpoints हर post को `authorName` से समृद्ध करते हैं, जो membership module gateway के माध्यम से `authorId` से हल होता है। गायब excerpts सूची कार्ड, meta descriptions, और RSS में stripped-markdown content (~160 अक्षर) पर fallback करते हैं। B1App `/{sdSlug}/blog` परोसता है -- एक संपादकीय सूची (केंद्रित header जो फ़िल्टर होने पर सक्रिय category/tag नाम बन जाता है, category-chip फ़िल्टर पंक्ति, बायीं ओर thumbnail वाली post पंक्तियाँ bylines और excerpts के साथ) जिसमें RSS feed एक alternate link के रूप में विज्ञापित है -- और `/{sdSlug}/blog/[postSlug]`, एक समर्पित route (Zone/Section pipeline नहीं) जिसमें केंद्रित header (category kicker, title, byline, primary-color accent rule), container चौड़ाई पर 16:9 hero, ~720px reading column में markdown body, article footer में tag chips, एक `"More in {category}"` related-posts पट्टी, और लेखक सहित `BlogPosting` JSON-LD है। दोनों पेज पूरी तरह theme tokens से style होते हैं ताकि हर चर्च का palette विरासत में मिले। Blog URLs प्रति-चर्च sitemap में शामिल होते हैं। B1Admin का authoring UI (**Site → Blog**) posts को एक dialog में संपादित करता है: preview toggle वाला markdown editor, 16:9-cropped gallery image picker, लेखक person-picker (संपादन करने वाले उपयोगकर्ता पर डिफ़ॉल्ट), मौजूदा categories से seeded category autocomplete, duplicate-slug सत्यापन, और publish toggle; प्रकाशित पंक्तियाँ live post से लिंक होती हैं, और पेज admins को `/blog` navigation लिंक जोड़ने का सुझाव देता है। टिप्पणियाँ तीसरे-पक्ष सेवाओं पर छोड़ी गई हैं: एक चर्च-व्यापी सार्वजनिक content setting `blogFooterHtml` (Blog पृष्ठ पर **Below Every Post** में संपादित, केवल Settings→Edit वालों को दिखता है) हर post के नीचे B1App के `BlogFooterEmbed` द्वारा रेंडर होती है, जो `<script>` tags को फिर से बनाता है ताकि वे `'strict-dynamic'` के अंतर्गत execute हों और उन्हें क्रम से चलाता है (अगली inline script चलने से पहले एक बाहरी `src` पूरा लोड हो जाता है), क्योंकि vendor snippets पहले एक library लोड करते हैं और फिर उसे कॉल करते हैं।

## केवल-सदस्य पेज

`pages.visibility` navigation-links enum का पुन: उपयोग करता है -- `everyone` (डिफ़ॉल्ट), `visitors`, `members`, `staff`, `team`, `groups` (`groupIds` के साथ) -- लेकिन एक **कठोर access gate** के रूप में, nav filter के रूप में नहीं (`PageVisibilityHelper.canViewPage`)। प्रवाह:

1. गुमनाम tree endpoint URL-आधारित fetches पर visibility जाँचता है। एक gated पेज के गुमनाम कॉलर्स को सामग्री के बजाय `{ restricted: true, visibility }` मिलता है -- tree कभी लीक नहीं होता।
2. endpoint फिर भी JWT का सम्मान करता है: `CustomAuthProvider` *हर* अनुरोध पर `Authorization` header सत्यापित करता है, गुमनाम routes सहित, इसलिए उसी URL का एक प्रमाणित सदस्य का fetch सामान्य रूप से हल होता है।
3. B1App `restricted` प्रतिक्रिया पर `RestrictedPage` रेंडर करता है: यह संग्रहीत credentials से session hydrate करता है, JWT के साथ tree दोबारा fetch करता है, और उसे रेंडर करता है -- या session न होने पर `returnUrl` के साथ एक login gate दिखाता है।

:::info
gate की सूक्ष्मता स्तर के अनुसार बदलती है: `groups` token के `groupIds` को पेज की सूची से जाँचता है और `staff` `membershipStatus` जाँचता है, लेकिन `members` और `team` वर्तमान में चर्च के किसी भी प्रमाणित उपयोगकर्ता को पास करते हैं। `groups` को सख्त विकल्प मानें।
:::

## SEO और खोज योग्यता {#seo-and-discoverability}

यह सब ContentApi डेटा पर B1App-side रेंडरिंग है -- API संग्रहीत करता है, ऐप उत्सर्जित करता है:

| विषय | यह कैसे काम करता है |
|---------|--------------|
| Meta descriptions | `pages.metaDescription` (≤300 अक्षर) `MetaHelper.getMetaData()` से हर builder-रेंडर्ड route पर Next.js `Metadata` (description + Open Graph) में बहता है। B1Admin की page settings में एक AI "Generate" बटन है (नीचे देखें) |
| Redirects | `/content/redirects` (`content.edit`, 200-पंक्ति सीमा, normalized paths) पर प्रबंधित प्रति-चर्च `redirects` पंक्तियाँ। संभावित 404 पर, B1App का page route पथ को `GET /content/redirects/public/:churchId` के विरुद्ध हल करता है और Next के `permanentRedirect` के माध्यम से HTTP 308 जारी करता है; बिना मिलान वाले पथ `notFound()` पर गिरते हैं |
| Branded 404 | `not-found.tsx` सामान्य त्रुटि के बजाय चर्च के लोगो, नाम, और थीम के साथ `BrandedNotFound` रेंडर करता है। अज्ञात `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]`, और `/volunteer/[planId]` पथ एक वास्तविक 404 लौटाते हैं, जैसे अज्ञात subdomains और गलत आकार वाले page slugs (देखें [Website Routing & Multi-Site](./websites)) |
| Structured data | blog posts पर `BlogPosting` JSON-LD; प्रति-sermon पेजों (`/{sdSlug}/sermons/[sermonId]`) और `sermons` element वाले पेजों पर `VideoObject`; builder पेजों पर calendar/event elements से और हर `/{sdSlug}/events/[eventId]` पेज पर `Event` (अगली पुनरावृत्ति, event की फ़ोटो `image` के रूप में); `serviceTimes` element से schema.org `Event` |
| Sermon पेज | हर सार्वजनिक sermon को पूर्ण metadata के साथ `/sermons/[sermonId]` पर एक crawlable पेज मिलता है -- sermons अब client-side browser element के अंदर बंद नहीं हैं |
| Analytics | सार्वजनिक setting key `ga4MeasurementId` (B1Admin में redirects के बगल में प्रबंधित) `next/script` के माध्यम से प्रति-चर्च GA4 gtag इंजेक्ट करती है। B1 ऐप (`/{sdSlug}/mobile`) भी ChurchApps के अपने tag के साथ अपने page views उस ID पर भेजता है, जब वह एक वैध `G-` ID हो (GTM container IDs केवल वेबसाइट पर रहते हैं)। हर `gtag('config')` में `navigator.standalone` या `(display-mode: standalone)` media query के आधार पर `installed` या `browser` का `display_mode` होता है (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap और feeds | प्रति-चर्च `sitemap.xml` route में builder पेज, blog URLs, और 50 सबसे हाल के sermon पेज (हर sermon की publish तारीख से `<lastmod>` के साथ) शामिल हैं। यह built-in `/sermons`, `/groups`, और `/volunteer` पेज भी सूचीबद्ध करता है जब उनमें सामग्री हो (सार्वजनिक समूह, साइनअप योजनाएँ), जब तक कोई सहेजा गया redirect उस पथ को न बदले। `/` तब छोड़ा जाता है जब चर्च का कोई home पेज न हो, क्योंकि तब `/` अननुमत `/mobile` पर redirect करता है। blog listing RSS feed का विज्ञापन करती है |
| Accessibility | सार्वजनिक chrome हर layout wrapper में `<main id="main-content">` landmark को लक्षित एक skip link रेंडर करता है |

## AI generation (AskApi)

पेज और साइट generation **AskApi**, एक अलग सेवा में चलता है, `/website` controller के अंतर्गत। यह बाकी सब की तरह उसी `CustomAuthProvider` JWT से प्रमाणित होता है और content के संबंध में **stateless** है: हर endpoint JSON लौटाता है और कॉलर (B1Admin) परिणाम को ContentApi के माध्यम से सहेजता है (`POST /content/pages/importTree` एक पेज को उसके पूरे nested section/element tree के साथ एक कॉल में बनाता है; यह हमेशा कॉलर के चर्च में insert करता है और body में ids को अनदेखा करता है)।

### पेज generation (`planPage` → `writePage`)

B1Admin के `AddPageModal` में "AI" पेज template एक कम-लागत पाइपलाइन (`AskApi/src/helpers/SiteGenHelper.ts`) का उपयोग करता है, जो एक नियम पर बना है: **कोई model कभी builder JSON उत्सर्जित नहीं करता**। दो models Vercel AI Gateway के माध्यम से काम बाँटते हैं (सादा HTTP, SSM key `/{env}/aiGatewayApiKey` या `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — एक typed-decision model जो probabilities के साथ choices, scores, और booleans लौटाता है लेकिन टेक्स्ट नहीं लिख सकता। यह एक निश्चित template library से हर section को बारी-बारी से चुनता है, layouts को स्कोर करता है, copy के तथ्य जाँचता है, और stock फ़ोटो और icons चुनता है। input लगभग $0.04 प्रति मिलियन tokens है और output मुफ़्त है, इसलिए प्रति पेज ~90 calls एक पैसे के अंश की लागत हैं।
- **एक छोटा chat model (डिफ़ॉल्ट रूप से GPT-4.1 mini)** — चुने गए templates की नामित, लंबाई-सीमित टेक्स्ट slots भरता है। writer एक constant है, जिसे `SITEGEN_COPY_MODEL` environment variable से override किया जा सकता है (gateway पर कोई भी chat model id, जैसे `anthropic/claude-haiku-4.5`)। तीन चर्चों पर एक blind side-by-side में Claude Haiku 4.5 थोड़ा अधिक गर्म पढ़ा गया, लेकिन GPT-4.1 mini करीब था, लगभग 4 गुना सस्ता और तेज़ था, इसलिए यह डिफ़ॉल्ट है। तीनों layouts वाले पूरे पेज की लागत लगभग 1.3 सेंट है, जिसका लगभग 80% writer का है।

| चरण | Endpoint | क्या होता है |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | पेज प्रकार (home, visit, about…) को वर्गीकृत करता है, फिर JEV की प्रति-राउंड probabilities से 10 उम्मीदवार layouts नमूना लेता है (hero + section count → हर section → closer), deduplicate करता है, JEV से हर एक को fit/flow/gaps के लिए स्कोर कराता है, और शीर्ष 3 के साथ लेखन voice और `suggestedStyle` (palette + fonts) लौटाता है। अब तक एक ही sections साझा करने वाले उम्मीदवार JEV से एक समान प्रश्न पूछते हैं, इसलिए राउंड prefix द्वारा memoized होते हैं। 6 से कम सर्वोत्तम स्कोर `lowLayoutScore` के रूप में लॉग होता है -- वह लॉग उन templates का backlog है जिन्हें जोड़ना उचित है। ~2s |
| 2 | `POST /website/writePage` (हर उम्मीदवार पर एक कॉल) | writer slot copy को प्रति कॉल दो sections में, समानांतर में भरता है, और पाँच hero headlines लौटाता है जिनमें से JEV चुनता है; JEV हर section के तथ्य जाँचता है; वे sections जो विफल होते हैं, stock phrase उपयोग करते हैं, या किसी पिछले section को दोहराते हैं (साझा 4-शब्द runs, कोड में जाँचे गए) विशिष्ट कारण के साथ समानांतर में फिर लिखे जाते हैं; एक कोड scrub stock चर्च-साइट वाक्यांशों वाले वाक्य हटाता है (जब तक चर्च का अपना विवरण उन्हें उपयोग न करे); JEV photo subjects, icons, और hero के shape divider चुनता है, और परिणाम स्कोर करता है। एक तैयार-सेव करने योग्य section tree और एक स्कोर लौटाता है। ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin केवल सर्वोच्च-रैंक वाला layout लिखता है (यदि वह लिखना विफल हो तो दूसरा fallback होता है), उसे सहेजता है और preview खोलता है (Save के ~10s बाद) |

हर चरण अपना अनुरोध है ताकि हर कॉल API Gateway की 29-सेकंड सीमा के भीतर रहे। `SiteGenHelper.buildTree` में templates catalog से निश्चित section + element trees हैं (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) और theme tokens (`var(--accent)`, `var(--lightAccent)`…) का संदर्भ देते हैं, इसलिए generated पेज चर्च की मौजूदा appearance सेटिंग्स विरासत में लेते हैं। एक section template जोड़ने का अर्थ है उसकी slot सूची को `SECTIONS` में और उसके tree को `buildTree` में जोड़ना; unit test हर template को चलाकर tree को सत्यापित करता है।

**इनपुट।** copy केवल दो स्रोतों के तथ्य बता सकती है: जो उपयोगकर्ता ने टाइप किया, और `churchContext.facts` -- योजना से पहले B1Admin द्वारा एकत्र किए गए रिकॉर्ड (सार्वजनिक service times और सार्वजनिक समूहों के नाम, साथ में चर्च का नाम और पता)। वही flags data-आधारित templates को गेट करते हैं: `times` तब लाइव `serviceTimes` element रेंडर करता है जब चर्च B1 में service times रखता है (अन्यथा टाइप की गई तालिका); `groups` और `countdown` केवल तभी ऑफ़र होते हैं जब उनके पीछे डेटा हो। JEV कॉल hedged हैं -- 1.5s के बाद एक duplicate fire होता है और पहला उत्तर जीतता है -- क्योंकि gateway कभी-कभी रुकता है और कॉल लगभग मुफ़्त हैं।

**विषय पर बने रहना।** उपयोगकर्ता का prompt *पेज का विषय* है, चर्च की पृष्ठभूमि नहीं। `planPage` अनुरोध को वर्गीकृत करता है (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), और `event` और `topic` पेजों के लिए सामान्य-चर्च templates (pastor note, sermons, ministries, groups, community impact, weekly times and countdown, video hero) ऑफ़र ही नहीं होते, जबकि `details` (कब / कहाँ / क्या लाना) और एक तारीख `eventCountdown` ऑफ़र होते हैं। दोनों judges विषय-संगतता पर स्कोर करते हैं। B1Admin हर `writePage` कॉल में योजना से `pageType` पास करता है।

**छोटे अनुरोधों से पूर्ण पेज।** पेजों में तीन से छह बीच के sections, उदार slot लंबाइयाँ, card sections पर एक परिचय पंक्ति, और पाँच-प्रश्न FAQ होते हैं, और repair pass कोई भी पतला section लौटने पर उसे विस्तारित करता है। generation एक क्लिक है: कोई follow-up प्रश्न नहीं होते। जहाँ अनुरोध कोई सामान्य विवरण छोड़ता है जो एक पूर्ण पेज को चाहिए (एक शुरुआत समय, कमरा, क्या लाना, कैसे साइन अप करें), writer उसे चर्च के संपादित करने के लिए एक विश्वसनीय, सामान्य विकल्प से भरता है। क्योंकि sections समानांतर में लिखे जाते हैं, उन अंतरालों को **एक बार** `planPage` (`assumedDetails`, एक छोटी writer कॉल जो layout नमूने के साथ चलती है) में तय किया जाता है, और `churchContext.assumedDetails` के माध्यम से हर `writePage` कॉल को वापस पास किया जाता है, ताकि एक section 5:00 न कहे जबकि दूसरा 5:30 कहे। JEV किसी भी section को सुधारता है जो अनुरोध, चर्च के रिकॉर्ड, या उन तय विवरणों का विरोध करता है। तय किए गए विवरण UI में नहीं दिखाए जाते; चर्च पेज की समीक्षा और संपादन किसी और पेज की तरह करता है। कुछ चीज़ें कभी गढ़ी नहीं जातीं: लोगों के नाम, फ़ोन नंबर, ईमेल और वेब पते, कीमतें, आँकड़े, चर्च का इतिहास, लोगों को श्रेय दिए गए उद्धरण, और उस तारीख के लिए सप्ताह का दिन जिसके लिए अनुरोध ने दिन नहीं दिया।

**विज़ुअल।** templates अपने फ़ोटो या icons का नाम नहीं लेते। वे slots खुले छोड़ते हैं, और एक सामान्य pass (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) तैयार tree में चलकर हर एक भरता है: `auto:photo` चिह्नित section background या gallery entry, एक `auto:icon`, hero का `auto:divider`, और बिना किसी marker के, कोई भी `textWithPhoto`, `card` या `image` element जिसका `photo` खाली है। JEV हर एक को उसके बगल के टेक्स्ट से चुनता है (एक card की फ़ोटो उस card के शीर्षक और टेक्स्ट से; एक background section की copy से), पेज पर कोई विषय दोहराए बिना। इसलिए एक नया template मुफ़्त में फ़ोटो पाता है। फ़ोटो Pexels search subjects हैं जो `pexels:<term>` placeholders के रूप में उत्सर्जित होते हैं, जिन्हें B1Admin `POST /content/stock/search` के माध्यम से हल करता है; जो client `resolvesPhotos` नहीं भेजता उसे इसके बजाय एक अंतर्निर्मित hero image, सपाट रंगीन पट्टियाँ और बिना फ़ोटो वाले cards मिलते हैं। जानबूझकर कोई portrait subjects नहीं हैं और pastor template में कोई फ़ोटो नहीं होती: एक stock अजनबी कभी किसी असली व्यक्ति की जगह नहीं ले सकता। जिस चर्च के पास अभी कोई पेज नहीं है, B1Admin `suggestedStyle` को global styles पर लागू करता है; मौजूदा साइटें अपना रूप रखती हैं।

### अन्य endpoints

:::info
B1Admin में `SectionToolbar` का rewrite बटन और pages-list का "Generate Site" बटन client-side पर टिप्पणी में रहते हैं। नीचे के AskApi endpoints फिर भी प्रतिक्रिया देते हैं; केवल वह UI छिपा है।
:::

| Endpoint | उद्देश्य |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | मूल दो-चरणीय पेज प्रवाह (outline, फिर हर section के लिए एक LLM कॉल जो element JSON उत्सर्जित करता है)। लागत के कारण B1Admin में `planPage`/`writePage` द्वारा प्रतिस्थापित; API उपभोक्ताओं के लिए रखा गया |
| `POST /website/generateSite` | पूरी-साइट generation। **डिज़ाइन से दो-चरणीय**: एक `planOnly: true` कॉल केवल बहु-पेज योजना लौटाती है (एक तेज़ model कॉल), फिर क्लाइंट पूरी सामग्री माँगता है -- हर अनुरोध को Lambda/API-Gateway timeout के भीतर रखते हुए |
| `POST /website/rewriteSection` | संरचना-संरक्षित rewrite: model केवल टेक्स्ट-युक्त answers बदल सकता है। एक recursive संरचना signature (ids + types + order) पहले और बाद में तुलना होती है; कोई भी असंगति मूल section को `fallback: true` के साथ लौटाती है, बिगड़ी हुई संरचना के बजाय |
| `POST /website/generateAltText` | 20 image URLs तक पर vision कॉल; संक्षिप्त alt text लौटाता है (≤125 अक्षर, "photo of" उपसर्ग हटाए गए) |
| `POST /website/generateMetaDescription` | पेज के टेक्स्ट सामग्री से एक SEO meta description (≤155 अक्षर) -- B1Admin की page settings पर Generate बटन से जुड़ा |

इन endpoints के prompts `AskApi/config/instructions/` के तहत markdown फ़ाइलें हैं, जिनमें वह element catalog भी है जिससे model generate करता है। दो डिज़ाइन बिंदु catalog को ईमानदार रखते हैं: क्लाइंट हर अनुरोध पर `availableElementTypes` पास करता है (prompt केवल उस सूची के types उपयोग कर सकता है -- सर्वर पूरा सेट कभी hardcode नहीं करता), और API का MCP `describe_page_builder` tool [MCP](../api/mcp) के माध्यम से काम करने वाले AI agents के लिए वही गाइड रखता है। models OpenRouter के माध्यम से Anthropic Claude हैं -- section सामग्री के लिए 3.5 Haiku (विलंबता), outlines, साइट योजनाओं, और vision के लिए 3.5 Sonnet -- और OpenRouter key कॉन्फ़िगर न होने पर OpenAI fallback के साथ।

## Conversational forms

Forms (membership module) ने connect-card-शैली पेजों के लिए एक conversational मोड प्राप्त किया। `forms` पर चार कॉलम इसे चलाते हैं: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`।

- **Rendering** — apphelper का `FormSubmissionEdit`, जब `displayMode` `conversational` हो, `ConversationalForm` component (एक बार में एक प्रश्न) पर स्विच करता है; B1App का form पेज मोड पास करता है। दोनों तरह से वही submission payload।
- **Auto-create person** — `autoCreatePerson` सेट होने पर सबमिशन के समय, `ConversationalFormHelper.findOrCreatePerson` ईमेल (case-insensitive) से dedup करता है और अन्यथा `membershipStatus: "Guest"` वाला एक household + person बनाता है, फिर सबमिशन को उस व्यक्ति से जोड़ता है।
- **Follow-up email** — जब subject और body सेट हों, सबमिट करने वाले को मौजूदा transactional पथ (`TransactionalEmailHelper`) के माध्यम से एक टेम्पलेट वाला ईमेल मिलता है (`{firstName}` / `{churchName}` tokens के साथ), कभी notification digest द्वार से नहीं। दोनों side-effects non-fatal हैं: विफलता कभी सबमिशन नहीं खोती।

चारों फ़ील्ड आज API से सेट होते हैं; B1Admin फ़ॉर्म एडिटर इन्हें अभी expose नहीं करता।

## सार्वजनिक-साइट cache

B1App का सार्वजनिक render पथ चर्च-टैग वाले fetches को cache करता है (production में `next: { revalidate: 300, tags: [sdSlug] }`; dev में `0`), ताकि ContentApi लिखने के बाद एक लाइव पेज पाँच मिनट तक पुराना रह सकता है। B1App पर `POST /api/revalidate/{sdSlug}` `revalidateTag(sdSlug)` कॉल करता है और उस cache को जल्दी हटाने का एकमात्र तरीका है।

दो लेखक इसे हिट करते हैं:

1. **B1Admin** — `clearSiteCache()` (`B1Admin/src/site/siteCache.ts`) editor सेव के बाद POST करता है। यह सक्रिय साइट के subdomain को प्राथमिकता देता है (एक द्वितीयक साइट को *उसी* tag को bust करना चाहिए, चर्च के डिफ़ॉल्ट को नहीं)।
2. **Api** — ContentApi के बदलाव जो कभी B1Admin से नहीं गुज़रते (API keys, MCP, AI) content controllers से `SiteCacheHelper.bump(churchId)` fire करते हैं। helper `SubDomainHelper` से चर्च का subdomain हल करता है और `{b1AppRoot}/api/revalidate/{sd}` पर POST करता है। विफलताएँ निगल ली जाती हैं ताकि एक अप्राप्य B1App कभी सहेजने को विफल न करे।

bump करने वाले controllers: pages (save, delete, duplicate, publish, discard, unpublish, AI temp), sections, elements, blocks, links, global styles, posts, और redirects। dev में `b1AppRoot` `http://{subdomain}.localtest.me:3301` है; demo/prod में `https://{subdomain}.b1.church`।

## संबंधित पृष्ठ

- [Website Routing & Multi-Site](./websites) — अनुरोध चर्च/साइट से कैसे हल होता है और कस्टम डोमेन कैसे रूट होते हैं
- [Content Endpoints](../api/endpoints/content) — पेजों, sections, elements, blocks, posts, redirects, और settings के लिए REST surface
- [AppHelper](../shared-libraries/app-helper) — npm package जो renderers, registry, dividers, और widgets शिप करता है
- [MCP Server](../api/mcp) — `describe_page_builder` guide tool सहित
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — staff-facing editor दस्तावेज़ीकरण
