---
title: "वेबसाइट बिल्डर आर्किटेक्चर"
description: "B1 वेबसाइट बिल्डर का डेवलपर मानचित्र: सामग्री ट्री, साझा तत्व सूची, रेंडर पाइपलाइन और B1 Admin व B1.church में AI पृष्ठ निर्माण।"
---

# वेबसाइट बिल्डर आर्किटेक्चर

<div class="article-intro">

B1App द्वारा परोसी जाने वाली हर चर्च वेबसाइट एक कंटेंट tree -- पृष्ठ, सेक्शन, एलिमेंट -- से रेंडर होती है, जो ContentApi में संग्रहीत है और B1Admin में दृश्य रूप से संपादित होती है। एक साझा कंपोनेंट लाइब्रेरी संपादक पूर्वावलोकन और लाइव साइट दोनों को रेंडर करती है, एक एलिमेंट-प्रकार कैटलॉग तय करता है कि पृष्ठ पर क्या आ सकता है, और एक अलग AI सेवा उस tree को जेनरेट या फिर से लिख सकती है। यह पृष्ठ पूरे स्टैक का मानचित्र देता है: `@churchapps/helpers` में एलिमेंट अनुबंध, रेंडर पाइपलाइन, चर्च-डेटा एलिमेंट, साइट-व्यापी विजेट, ब्लॉग परत, पहुँच-नियंत्रित पृष्ठ, SEO, AI जेनरेशन, और संवादात्मक फ़ॉर्म।

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

1. **एक tree, दो रेंडरर।** एक पृष्ठ एक `pages → sections → elements` tree है जहाँ हर नोड अपनी सेटिंग्स को `answers` JSON blob के रूप में रखता है। वही apphelper कंपोनेंट्स B1Admin के ड्रैग-एंड-ड्रॉप संपादक और B1App की सर्वर-रेंडर सार्वजनिक साइट दोनों को रेंडर करते हैं -- कोई अलग "publish format" नहीं है।
2. **अनुबंध `@churchapps/helpers` में रहता है।** `ElementTypes.ts` एलिमेंट प्रकारों का एकल कैटलॉग है; रेंडरर apphelper में एक रजिस्ट्री के माध्यम से हल होते हैं; संपादक फ़ॉर्म B1Admin में रहते हैं। एक एलिमेंट प्रकार जोड़ने के लिए तीनों को इसी क्रम में छूना होता है।
3. **सार्वजनिक साइट गुमनाम endpoints पढ़ती है।** B1App को जो कुछ चाहिए -- पृष्ठ tree, सेटिंग्स, ब्लॉग पोस्ट, रीडायरेक्ट, और अन्य मॉड्यूलों के चर्च-डेटा endpoints -- सार्वजनिक है। प्रमाणीकरण वैकल्पिक है: गुमनाम tree endpoint पर JWT केवल members-only पृष्ठ खोलता है, और कुछ नहीं बदलता।

## कंटेंट tree

कंटेंट मॉड्यूल (`Api/src/modules/content`) बिल्डर का डेटा रखता है:

| तालिका | भूमिका |
|-------|------|
| `pages` | हर URL के लिए एक पृष्ठ: `url`, `title`, `layout`, साथ में `visibility`/`groupIds` (पहुँच नियंत्रण) और `metaDescription` (SEO) |
| `sections` | पृष्ठ (या ब्लॉक) पर क्षैतिज पट्टियाँ: बैकग्राउंड, टेक्स्ट रंग, और एक `answersJSON` जो स्टाइलिंग के साथ `dividerTop`/`dividerBottom` shape-divider कॉन्फ़िग रखता है |
| `elements` | एक सेक्शन के भीतर कंटेंट टुकड़े: `elementType` + `answersJSON`, लेआउट प्रकारों (row/column, carousel) के लिए नेस्टेबल |
| `blocks` | पुन: उपयोग योग्य सेक्शन/एलिमेंट समूह (फ़ुटर ब्लॉक, एलिमेंट ब्लॉक), पृष्ठों के बीच साझा |
| `posts` | स्वतंत्र ब्लॉग पोस्ट (देखें [Blog](#blog)) |
| `redirects` | प्रति-चर्च `fromPath → toPath` जोड़े, 200 तक सीमित (देखें [SEO](#seo-and-discoverability)) |
| `settings` | key-value चर्च सेटिंग्स; `public` चिह्नित पंक्तियाँ गुमनाम रूप से परोसी जाती हैं और विजेट/analytics कॉन्फ़िग रखती हैं |

एक URL का पूरा tree एक गुमनाम कॉल से वापस आता है -- `GET /content/pages/:churchId/tree?url=/about` -- जिससे B1App सर्वर-रेंडर करता है। संपादक अनुरोध इसके बजाय id से लाते हैं और आंतरिक ids रखते हैं।

## एलिमेंट अनुबंध

### कैटलॉग (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` हर एलिमेंट प्रकार को एक `ElementTypeDefinition` के रूप में परिभाषित करता है: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, और उसके answers के लिए एक JSON-schema-शैली `answersSchema`। `validateElementAnswers()` जानबूझकर उदार है -- अज्ञात प्रकार और अतिरिक्त keys पास होते हैं, ताकि कैटलॉग अपग्रेड पर पुराना कंटेंट कभी न टूटे। **आज 35 प्रकार भेजे जाते हैं:**

| श्रेणी | एलिमेंट प्रकार |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons` एलिमेंट चर्च प्रकारों में सबसे अधिक कॉन्फ़िगर योग्य है: एक `layout` answer `browse` (पुराना पूर्ण ब्राउज़र), `grid`, `list`, या `featuredLatest` चुनता है, जिसमें `playlistId`, `itemCount`, `showTitles`, और `showDates` गैर-browse लेआउट को परिष्कृत करते हैं।

`rawHTML` एलिमेंट के दो answers हैं: `rawHTML` (markup) और `javascript`। `innerHTML` के माध्यम से डाली गई स्क्रिप्ट कभी execute नहीं होतीं, इसलिए `RawHTMLElement` markup में हर `<script>` नोड को एक नए एलिमेंट के रूप में फिर से बनाता है। ये गैर-parser-inserted नोड CSP के `strict-dynamic` के अंतर्गत भरोसेमंद हैं। एक `javascript` answer जो `<` से शुरू होता है (अपने `<script>` टैग सहित पेस्ट किया गया विक्रेता snippet) markup के रूप में पार्स होता है और वही व्यवहार पाता है। अन्यथा यह एक सादी inline स्क्रिप्ट के रूप में चलता है। B1Admin JavaScript बॉक्स में एक अकेले URL को चिह्नित करता है, क्योंकि अकेला URL एक no-op स्क्रिप्ट के रूप में चलता है। `map` एलिमेंट कुछ रेंडर नहीं करता, और जब कोई Maps API key कॉन्फ़िगर नहीं होती तो Google Maps स्क्रिप्ट लोड नहीं करता।

### रेंडरर (`@churchapps/apphelper`)

रेंडरर `Packages/apphelper/src/website/components/elementTypes/` में रहते हैं, हर प्रकार के लिए एक कंपोनेंट, `ElementRegistry.ts` के माध्यम से हल होते हैं -- एक दो-परत मानचित्र जहाँ `Element.tsx` सभी 35 प्रकारों के लिए डिफ़ॉल्ट रेंडरर पंजीकृत करता है (`registerDefaultElementRenderer`) और एक होस्ट ऐप पैकेज को fork किए बिना किसी भी को रनटाइम पर ओवरराइड कर सकता है (`registerElementRenderer`)।

### संपादक फ़ॉर्म (B1Admin)

संपादक के प्रति-प्रकार सेटिंग्स फ़ॉर्म `B1Admin/src/site/admin/elements/` में रहते हैं -- `ElementEdit.tsx` एक समर्पित कंपोनेंट (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) या प्रति प्रकार एक inline फ़ील्ड बिल्डर को dispatch करता है। इस कैटलॉग का AI-मुखी प्रतिबिंब API का MCP `describe_page_builder` टूल है (देखें [MCP Server](../api/mcp.md))।

संपादक पूर्वावलोकन वही `Theme` माउंट करता है जो लाइव साइट पर है, जो चर्च के वैश्विक styles से `--headingFont` / `--bodyFont` CSS variables सेट करता है। B1App इन variables को `pages.css` के माध्यम से लागू करता है, जिसे B1Admin इम्पोर्ट नहीं कर सकता, इसलिए `ContentEditor.tsx` `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) इंजेक्ट करता है ताकि उन्हें `.page` बॉडी टेक्स्ट और `h1`–`h6` पर लागू करे। इसके बिना, पूर्वावलोकन शीर्षक एडमिन फ़ॉन्ट में दिखाता था।

### सेक्शन शेप डिवाइडर

सेक्शन किसी भी किनारे पर सजावटी शेप डिवाइडर रख सकते हैं। कॉन्फ़िग सेक्शन के `answersJSON` में `dividerTop` / `dividerBottom` ऑब्जेक्ट्स के रूप में रहता है -- `{ shape, color, height, flip }` जिसमें `shape` `wave, waves, slant, curve, triangle, peaks` में से एक है। apphelper `SectionDivider` कंपोनेंट और `parseDividerConfig()` helper भेजता है; दोनों ऐप्स के Section रेंडरर (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) answers पार्स करते हैं और divider माउंट करते हैं, और B1Admin में `SectionEdit.tsx` पिकर UI देता है। पैकेज केवल बिल्डिंग ब्लॉक भेजते हैं -- सेक्शन-स्तरीय वायरिंग उपभोक्ता ऐप्स का काम है।

## चर्च-डेटा एलिमेंट

तीन एलिमेंट प्रकार लिखित कंटेंट के बजाय लाइव चर्च डेटा रेंडर करते हैं। मॉड्यूल अलगाव फिर भी लागू होता है -- हर एक ब्राउज़र से स्वामी मॉड्यूल के अपने सार्वजनिक endpoint को कॉल करता है:

| एलिमेंट | Endpoint | टिप्पणियाँ |
|---------|----------|-----------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }` लौटाता है, वैकल्पिक `?startDate=&endDate=` विंडो के साथ; एलिमेंट इसकी तुलना अपने `goalAmount` answer से करता है |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **केवल opt-in**: समूह पर `publicRoster` सेट होना चाहिए (डिफ़ॉल्ट off)। प्रोजेक्शन जानबूझकर न्यूनतम है -- `personId`, `displayName`, `leader`, फ़ोटो -- कोई संपर्क या जनसांख्यिकीय फ़ील्ड नहीं |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | परिसर → सेवा → समय tree लौटाता है; apphelper रेंडरर उससे सर्वोत्तम-प्रयास schema.org `Event` JSON-LD भेजता है (API सादा डेटा लौटाता है) |

:::warning
`publicRoster` `staffGrid` का गोपनीयता गेट है। सार्वजनिक group-member प्रोजेक्शन को कभी चौड़ा न करें और न ही flag को बायपास करें -- roster endpoint डिज़ाइन से गुमनाम है और न्यूनतम फ़ील्ड सूची ही सुरक्षा गुण है।
:::

### Calendar एलिमेंट और कार्यक्रम पृष्ठ

`calendar` एलिमेंट के answers हैं `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, डिफ़ॉल्ट, या `upcoming`), और `tag`। B1App `src/components/Element.tsx` में `registerElementRenderer("calendar", …)` के साथ apphelper रेंडरर को ओवरराइड करता है:

- **`display: "upcoming"`** B1App के `UpcomingEventsElement` को रेंडर करता है: यह `GET /content/events/public/group/:churchId/:groupId` या `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId` लोड करता है, `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, एक वर्ष के भीतर प्रति इवेंट एक घटना) से दोहराव विस्तारित करता है, और पहली 12 को फ़ोटो टाइल्स (`events.photoUrl`, फ़ोटो न होने पर थीम के गहरे रंग पर शीर्षक) के रूप में दिखाता है जो `/events/{id}` से लिंक होती हैं, साथ में कैलेंडर के ICS फ़ीड के लिए एक Subscribe मेनू।
- **`display: "month"`** `eventUrl` कॉलबैक के साथ apphelper का `CalendarElement` रेंडर करता है। `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` फिर क्लिक पर विवरण डायलॉग खोलने के बजाय उस URL पर नेविगेट करते हैं (B1Admin `eventUrl` पास नहीं करता, इसलिए एडमिन कैलेंडर अपना डायलॉग रखता है)।
- **`tag`** दोनों दृश्यों को `EventHelper.hasTag()` (`@churchapps/helpers`) से फ़िल्टर करता है: अल्पविराम-से-अलग `events.tags` के विरुद्ध केस-इनसेंसिटिव मिलान; खाली होने पर सब कुछ दिखता है। curated-calendar join `e.tags` चुनता है ताकि curated इवेंट्स उन्हें लें।

Curated इवेंट्स `realEventId` (`eventPageId()`) से लिंक होते हैं, इसलिए URL हमेशा अंतर्निहित इवेंट का नाम रखता है। `/{sdSlug}/events/[eventId]` एक समर्पित रूट है (बिल्डर पाइपलाइन नहीं): यह `GET /content/events/public/:churchId/:id` लोड करता है -- जो लंबित/अस्वीकृत इवेंट्स और बिना पंजीकरण वाले निजी इवेंट्स के लिए `null` लौटाता है, और गैर-अस्वीकृत रूम बुकिंग से `roomNames` जोड़ता है -- `EventPageContent` रेंडर करता है (फ़ोटो हीरो, markdown विवरण, When/Where aside, `registrationEnabled` होने पर **Register for this Event**, और `GET /content/events/public/:churchId/:id/ical` पर **Add to my calendar** लिंक), फ़ोटो को Open Graph इमेज के रूप में उपयोग करता है, और `EventPageJsonLd` के माध्यम से अगली घटना के लिए `Event` JSON-LD उत्सर्जित करता है। अज्ञात या छिपा इवेंट एक वास्तविक 404 लौटाता है।

## साइट-व्यापी विजेट

दो विजेट tree के भीतर के बजाय हर सार्वजनिक पृष्ठ पर रेंडर होते हैं: **AnnouncementBanner** (खारिज करने योग्य शीर्ष-पृष्ठ पट्टी) और **Launcher** (give/visit/watch-शैली लिंक के लिए फ़्लोटिंग action हब)। दोनों कंपोनेंट और उनके `parse*Config()` helpers apphelper में आते हैं। कॉन्फ़िगरेशन दो सार्वजनिक सेटिंग्स पंक्तियाँ हैं -- keys `announcementBanner` और `launcher` -- जो B1Admin के `SiteWidgetsEdit` (Appearance पृष्ठ पर) द्वारा लिखी जाती हैं और B1App के सार्वजनिक layout द्वारा `GET /content/settings/public/:churchId` से पढ़ी जाती हैं। API इन्हें अपारदर्शी key-value जोड़ियों के रूप में मानता है; key नाम दोनों ऐप्स के बीच एक सम्मेलन है।

## ब्लॉग {#blog}

ब्लॉग एक स्वतंत्र कंटेंट प्रकार है, बिल्डर पृष्ठों पर परत नहीं। एक `posts` पंक्ति पूरी पोस्ट रखती है: `title`, `slug`, `excerpt`, `content` (markdown बॉडी), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`। सार्वजनिक सतह (सभी गुमनाम, `PostController`):

| रूट | उद्देश्य |
|-------|---------|
| `GET /content/posts/public/:churchId` | प्रकाशित पोस्ट, `?category=&tag=` से फ़िल्टर योग्य, पृष्ठांकित |
| `GET /content/posts/public/:churchId/categories` | प्रकाशित पोस्टों की विशिष्ट श्रेणियाँ |
| `GET /content/posts/public/:churchId/slug/:slug` | एक प्रकाशित पोस्ट |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 फ़ीड, चर्च के नाम से शीर्षक, प्रति आइटम श्रेणी और excerpt-या-content विवरण के साथ |

एक पोस्ट तब "प्रकाशित" है जब `publishDate` सेट हो और बीत चुकी हो; भविष्य की `publishDate` एक शेड्यूल्ड पोस्ट है (सार्वजनिक रूप से छिपी, एडमिन में Scheduled चिप के साथ दिखाई गई)। पढ़ने के endpoints हर पोस्ट को `authorName` से समृद्ध करते हैं, जो membership मॉड्यूल गेटवे के माध्यम से `authorId` से हल होता है। गायब excerpts सूची कार्ड, meta विवरण, और RSS में स्ट्रिप्ड-markdown content (~160 अक्षर) पर वापस गिरते हैं। B1App `/{sdSlug}/blog` परोसता है -- एक संपादकीय सूची (केंद्रित हेडर जो फ़िल्टर होने पर सक्रिय श्रेणी/टैग नाम बन जाता है, श्रेणी-चिप फ़िल्टर पंक्ति, बायलाइन और excerpts के साथ बाईं ओर थंबनेल वाली पोस्ट पंक्तियाँ), RSS फ़ीड एक वैकल्पिक लिंक के रूप में विज्ञापित -- और `/{sdSlug}/blog/[postSlug]`, एक समर्पित रूट (Zone/Section पाइपलाइन नहीं) जिसमें केंद्रित हेडर (श्रेणी kicker, शीर्षक, बायलाइन, प्राथमिक-रंग accent रेखा), कंटेनर चौड़ाई पर 16:9 हीरो, ~720px पढ़ने के कॉलम में markdown बॉडी, लेख के फ़ुटर में टैग चिप्स, `"More in {category}"` संबंधित-पोस्ट पट्टी, और लेखक सहित `BlogPosting` JSON-LD। दोनों पृष्ठ पूरी तरह थीम टोकन से स्टाइल होते हैं, ताकि हर चर्च का पैलेट विरासत में मिले। ब्लॉग URLs प्रति-चर्च sitemap में शामिल हैं। B1Admin का लेखन UI (**Site → Blog**) एक डायलॉग में पोस्ट संपादित करता है: preview टॉगल के साथ markdown एडिटर, 16:9-क्रॉप गैलरी इमेज पिकर, लेखक person-picker (संपादन उपयोगकर्ता पर डिफ़ॉल्ट), मौजूदा श्रेणियों से बीज की गई श्रेणी ऑटोकंप्लीट, डुप्लिकेट-slug सत्यापन, और एक प्रकाशन टॉगल; प्रकाशित पंक्तियाँ लाइव पोस्ट से लिंक होती हैं, और पृष्ठ एडमिन को `/blog` नेविगेशन लिंक जोड़ने का सुझाव देता है। टिप्पणियाँ तृतीय-पक्ष सेवाओं पर छोड़ी गई हैं: एक चर्च-व्यापी सार्वजनिक कंटेंट सेटिंग `blogFooterHtml` (Blog पृष्ठ पर **Below Every Post** में संपादित, केवल Settings→Edit के साथ दिखाई) B1App के `BlogFooterEmbed` द्वारा हर पोस्ट के नीचे रेंडर होती है, जो `<script>` टैग को पुनर्निर्मित करता है ताकि वे `'strict-dynamic'` के अंतर्गत execute हों और उन्हें क्रम में चलाता है (एक बाहरी `src` अगली inline स्क्रिप्ट चलने से पहले लोड होना पूरा करता है), क्योंकि विक्रेता snippets एक लाइब्रेरी लोड करते हैं और फिर उसे कॉल करते हैं।

## Members-only पृष्ठ

`pages.visibility` नेविगेशन-लिंक enum का पुन: उपयोग करता है -- `everyone` (डिफ़ॉल्ट), `visitors`, `members`, `staff`, `team`, `groups` (`groupIds` के साथ) -- लेकिन एक **कठोर पहुँच गेट** के रूप में, नेव फ़िल्टर के रूप में नहीं (`PageVisibilityHelper.canViewPage`)। प्रवाह:

1. गुमनाम tree endpoint URL-आधारित लाने पर visibility जाँचता है। गेट किए गए पृष्ठ के गुमनाम कॉलर्स को कंटेंट के बजाय `{ restricted: true, visibility }` मिलता है -- tree कभी लीक नहीं होता।
2. endpoint फिर भी JWT का सम्मान करता है: `CustomAuthProvider` गुमनाम रूट्स सहित *हर* अनुरोध पर `Authorization` header सत्यापित करता है, इसलिए किसी प्रमाणित सदस्य का उसी URL का लाना सामान्य रूप से हल होता है।
3. B1App `restricted` प्रतिक्रिया पर `RestrictedPage` रेंडर करता है: यह संग्रहीत credentials से सत्र hydrate करता है, JWT के साथ tree फिर से लाता है, और उसे रेंडर करता है -- या जब कोई सत्र न हो तो `returnUrl` के साथ लॉगिन गेट दिखाता है।

:::info
गेट की सूक्ष्मता स्तर के अनुसार बदलती है: `groups` टोकन के `groupIds` को पृष्ठ की सूची से जाँचता है और `staff` `membershipStatus` जाँचता है, लेकिन `members` और `team` वर्तमान में चर्च के किसी भी प्रमाणित उपयोगकर्ता को पास करते हैं। `groups` को कठोर विकल्प मानें।
:::

## SEO और खोज योग्यता {#seo-and-discoverability}

यह सब ContentApi डेटा पर B1App-साइड रेंडरिंग है -- API संग्रहीत करता है, ऐप उत्सर्जित करता है:

| विषय | कैसे काम करता है |
|---------|--------------|
| Meta विवरण | `pages.metaDescription` (≤300 अक्षर) `MetaHelper.getMetaData()` के माध्यम से हर builder-रेंडर रूट पर Next.js `Metadata` (description + Open Graph) में बहता है। B1Admin की पृष्ठ सेटिंग्स में AI "Generate" बटन शामिल है (नीचे देखें) |
| रीडायरेक्ट | `/content/redirects` पर प्रबंधित प्रति-चर्च `redirects` पंक्तियाँ (`content.edit`, 200-पंक्ति सीमा, सामान्यीकृत पथ)। संभावित 404 पर, B1App का पृष्ठ रूट पथ को `GET /content/redirects/public/:churchId` के विरुद्ध हल करता है और Next के `permanentRedirect` के माध्यम से HTTP 308 जारी करता है; अमिलान पथ `notFound()` पर गिरते हैं |
| ब्रांडेड 404 | `not-found.tsx` सामान्य त्रुटि के बजाय चर्च के लोगो, नाम, और थीम के साथ `BrandedNotFound` रेंडर करता है। अज्ञात `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]`, और `/volunteer/[planId]` पथ वास्तविक 404 लौटाते हैं, जैसे अज्ञात सबडोमेन और खराब पृष्ठ slugs (देखें [Website Routing & Multi-Site](./websites.md)) |
| संरचित डेटा | ब्लॉग पोस्ट पर `BlogPosting` JSON-LD; प्रति-सर्मन पृष्ठों (`/{sdSlug}/sermons/[sermonId]`) पर और `sermons` एलिमेंट वाले पृष्ठों पर `VideoObject`; बिल्डर पृष्ठों पर calendar/event एलिमेंट्स और हर `/{sdSlug}/events/[eventId]` पृष्ठ पर `Event` (अगली घटना, इवेंट फ़ोटो `image` के रूप में); `serviceTimes` एलिमेंट से schema.org `Event` |
| सर्मन पृष्ठ | हर सार्वजनिक सर्मन को पूर्ण मेटाडेटा के साथ `/sermons/[sermonId]` पर एक crawlable पृष्ठ मिलता है -- सर्मन अब क्लाइंट-साइड ब्राउज़र एलिमेंट के भीतर बंद नहीं हैं |
| Analytics | सार्वजनिक सेटिंग key `ga4MeasurementId` (B1Admin में रीडायरेक्ट के बगल में प्रबंधित) `next/script` के माध्यम से प्रति-चर्च GA4 gtag इंजेक्ट करती है। B1 ऐप (`/{sdSlug}/mobile`) भी जब वैध `G-` ID हो तो अपने पृष्ठ दृश्य उस ID पर भेजता है, ChurchApps के अपने टैग के साथ (GTM कंटेनर IDs केवल वेबसाइट पर रहते हैं)। हर `gtag('config')` `navigator.standalone` या `(display-mode: standalone)` मीडिया क्वेरी के आधार पर `display_mode` `installed` या `browser` के साथ आता है (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap और फ़ीड | प्रति-चर्च `sitemap.xml` रूट में बिल्डर पृष्ठ, ब्लॉग URLs, और सबसे हाल के 50 सर्मन पृष्ठ (हर सर्मन की प्रकाशन तारीख से `<lastmod>` के साथ) शामिल हैं। यह built-in `/sermons`, `/groups`, और `/volunteer` पृष्ठों को भी सूचीबद्ध करता है जब उनमें कंटेंट हो (सार्वजनिक समूह, साइनअप योजनाएँ), जब तक कोई सहेजा रीडायरेक्ट उस पथ को बदल न दे। `/` को तब छोड़ा जाता है जब चर्च के पास होम पृष्ठ न हो, क्योंकि तब `/` अस्वीकृत `/mobile` पर रीडायरेक्ट होता है। ब्लॉग सूची RSS फ़ीड का विज्ञापन करती है |
| एक्सेसिबिलिटी | सार्वजनिक chrome हर layout wrapper में `<main id="main-content">` landmark को लक्षित एक skip link रेंडर करता है |

## AI जेनरेशन (AskApi)

पृष्ठ और साइट जेनरेशन **AskApi** में चलता है, एक अलग सेवा, `/website` नियंत्रक के अंतर्गत। यह बाकी सब की तरह उसी `CustomAuthProvider` JWT से प्रमाणित होती है और कंटेंट के संबंध में **स्टेटलेस** है: हर endpoint JSON लौटाता है और कॉलर (B1Admin) परिणाम को ContentApi के माध्यम से संग्रहीत करता है (`POST /content/pages/importTree` पूर्ण नेस्टेड section/element tree के साथ एक पृष्ठ एक कॉल में बनाता है; यह हमेशा कॉलर के चर्च के अंतर्गत insert करता है और बॉडी के ids को अनदेखा करता है)।

### पृष्ठ जेनरेशन (`planPage` → `writePage`)

B1Admin के `AddPageModal` में "AI" पृष्ठ टेम्पलेट एक कम-लागत पाइपलाइन (`AskApi/src/helpers/SiteGenHelper.ts`) का उपयोग करता है जो एक नियम पर बनी है: **कोई मॉडल कभी बिल्डर JSON उत्सर्जित नहीं करता**। दो मॉडल Vercel AI Gateway (सादा HTTP, SSM key `/{env}/aiGatewayApiKey` या `AI_GATEWAY_API_KEY`) के माध्यम से काम बाँटते हैं:

- **JEV** (`typesafe-ai/jev`) -- एक टाइप्ड-निर्णय मॉडल जो संभावनाओं के साथ विकल्प, स्कोर और boolean लौटाता है लेकिन टेक्स्ट नहीं लिख सकता। यह एक निश्चित टेम्पलेट लाइब्रेरी से बारी-बारी हर सेक्शन चुनता है, लेआउट स्कोर करता है, कॉपी के तथ्य जाँचता है, और स्टॉक फ़ोटो और आइकन चुनता है। इनपुट लागत लगभग $0.04 प्रति मिलियन टोकन है और आउटपुट मुफ़्त है, इसलिए प्रति पृष्ठ ~90 कॉल एक सेंट के अंश की लागत रखते हैं।
- **एक छोटा chat मॉडल (डिफ़ॉल्ट रूप से GPT-4.1 mini)** -- चुने गए टेम्पलेट्स के नामित, लंबाई-सीमित टेक्स्ट slots भरता है। लेखक एक स्थिर है, जिसे `SITEGEN_COPY_MODEL` पर्यावरण चर से बदला जा सकता है (gateway पर कोई भी chat मॉडल id, जैसे `anthropic/claude-haiku-4.5`)। तीन चर्चों पर एक अंधे साइड-बाय-साइड में Claude Haiku 4.5 थोड़ा गर्म पढ़ा गया, लेकिन GPT-4.1 mini करीब था, लगभग 4 गुना सस्ता और तेज़ था, इसलिए यह डिफ़ॉल्ट है। तीनों लेआउट वाला पूरा पृष्ठ लगभग 1.3 सेंट लगाता है, जिसका लगभग 80% लेखक का है।

| चरण | Endpoint | क्या होता है |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | पृष्ठ प्रकार वर्गीकृत करता है (home, visit, about…), फिर JEV की प्रति-राउंड संभावनाओं से 10 उम्मीदवार लेआउट नमूना करता है (hero + section गिनती → हर section → closer), डी-डुप्लिकेट करता है, JEV से हर एक को fit/flow/gaps के लिए स्कोर कराता है, और शीर्ष 3 लौटाता है साथ में एक लेखन स्वर और एक `suggestedStyle` (पैलेट + फ़ॉन्ट)। जो उम्मीदवार अब तक एक ही sections साझा करते हैं वे JEV से एक समान प्रश्न पूछते हैं, इसलिए राउंड प्रीफ़िक्स द्वारा memoized होते हैं। 6 से कम सर्वश्रेष्ठ स्कोर `lowLayoutScore` के रूप में लॉग होता है -- वह लॉग जोड़ने योग्य टेम्पलेट्स का बैकलॉग है। ~2s |
| 2 | `POST /website/writePage` (हर उम्मीदवार के लिए एक कॉल) | लेखक हर कॉल में दो sections, समानांतर में slot कॉपी भरता है, और पाँच hero headlines लौटाता है जिनमें से JEV चुनता है; JEV हर section के तथ्य जाँचता है; जो sections विफल होते हैं, stock वाक्यांश उपयोग करते हैं, या पहले के section को फिर से कहते हैं (साझा 4-शब्द के रन, कोड में जाँचे गए) उन्हें विशिष्ट कारण के साथ समानांतर में फिर से लिखा जाता है; एक कोड स्क्रब stock चर्च-साइट वाक्यों वाले वाक्य हटाता है (जब तक चर्च का अपना विवरण उन्हें उपयोग न करे); JEV फ़ोटो विषय, आइकन, और hero का shape divider चुनता है, और परिणाम स्कोर करता है। सहेजने के लिए तैयार section tree और एक स्कोर लौटाता है। ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin केवल सर्वश्रेष्ठ-रैंक वाला लेआउट लिखता है (यदि वह लिखना विफल हो तो दूसरे स्थान वाला fallback), उसे सहेजता है और पूर्वावलोकन खोलता है (Save के ~10s बाद) |

हर चरण अपना अनुरोध है ताकि हर कॉल API Gateway की 29-सेकंड सीमा के भीतर रहे। `SiteGenHelper.buildTree` में टेम्पलेट कैटलॉग से निश्चित section + element trees हैं (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) और theme टोकन का संदर्भ देते हैं (`var(--accent)`, `var(--lightAccent)`…), इसलिए जेनरेट किए पृष्ठ चर्च की मौजूदा appearance सेटिंग्स विरासत में लेते हैं। एक section टेम्पलेट जोड़ने का मतलब है उसकी slot सूची को `SECTIONS` में और उसके tree को `buildTree` में जोड़ना; यूनिट टेस्ट हर टेम्पलेट को चलाता है और tree सत्यापित करता है।

**इनपुट।** कॉपी केवल दो स्रोतों के तथ्य कह सकती है: उपयोगकर्ता ने जो टाइप किया, और `churchContext.facts` -- योजना से पहले B1Admin द्वारा इकट्ठा किए गए रिकॉर्ड (सार्वजनिक सेवा समय और सार्वजनिक समूह नाम, साथ में चर्च का नाम और पता)। वही flags डेटा-आधारित टेम्पलेट्स को गेट करते हैं: `times` लाइव `serviceTimes` एलिमेंट रेंडर करता है जब चर्च B1 में सेवा समय रखता है (अन्यथा टाइप्ड तालिका), और `groups` और `countdown` केवल तभी प्रस्तावित होते हैं जब उनके पीछे डेटा हो। JEV कॉल hedged हैं -- एक डुप्लिकेट 1.5s बाद फ़ायर होता है और पहला उत्तर जीतता है -- क्योंकि gateway कभी-कभी रुकता है और कॉल लगभग मुफ़्त हैं।

**विषय पर बने रहना।** उपयोगकर्ता का prompt *पृष्ठ का विषय* है, चर्च की पृष्ठभूमि नहीं। `planPage` अनुरोध को वर्गीकृत करता है (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), और `event` और `topic` पृष्ठों के लिए सामान्य-चर्च टेम्पलेट्स (पास्टर नोट, सर्मन, मंत्रालय, समूह, सामुदायिक प्रभाव, साप्ताहिक समय और countdown, वीडियो hero) प्रस्तावित भी नहीं होते, जबकि `details` (कब / कहाँ / क्या लाना) और एक तारीख `eventCountdown` होते हैं। दोनों judges विषय-प्रासंगिकता स्कोर करते हैं। B1Admin योजना से `pageType` हर `writePage` कॉल में पास करता है।

**छोटे अनुरोधों से पूर्ण पृष्ठ।** पृष्ठों में तीन से छह मध्य sections होते हैं, उदार slot लंबाई, card sections पर एक परिचय पंक्ति और पाँच-प्रश्न FAQ, और मरम्मत पास कोई भी पतला section विस्तारित करता है। जेनरेशन एक क्लिक है: कोई अनुवर्ती प्रश्न नहीं। जहाँ अनुरोध वह साधारण विवरण छोड़ता है जो एक पूर्ण पृष्ठ को चाहिए (एक प्रारंभ समय, एक कक्ष, क्या लाना, कैसे साइन अप करें), लेखक एक विश्वसनीय, संयमित चुनाव से भरता है जिसे चर्च संपादित कर सके। चूँकि sections समानांतर में लिखे जाते हैं, वे अंतराल **एक बार** `planPage` में तय होते हैं (`assumedDetails`, एक छोटी लेखक कॉल जो लेआउट नमूने के साथ चलती है), और `churchContext.assumedDetails` के माध्यम से हर `writePage` कॉल में वापस पास होते हैं, ताकि एक section 5:00 न कहे जबकि दूसरा 5:30 कहे। JEV अनुरोध, चर्च के रिकॉर्ड, या उन तय विवरणों के विरोधाभासी किसी भी section की मरम्मत करता है। तय विवरण UI में सामने नहीं आते; चर्च किसी भी अन्य पृष्ठ की तरह पृष्ठ की समीक्षा और संपादन करता है। कुछ चीज़ें कभी नहीं बनाई जातीं: लोगों के नाम, फ़ोन नंबर, ईमेल और वेब पते, कीमतें, आँकड़े, चर्च का इतिहास, लोगों को श्रेय दिए गए उद्धरण, और उस तारीख के लिए सप्ताह का दिन जिसके लिए अनुरोध ने दिन नहीं दिया।

**विज़ुअल।** टेम्पलेट कभी अपनी फ़ोटो या आइकन नाम नहीं देते। वे slots खुले छोड़ते हैं, और एक सामान्य पास (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) तैयार tree में चलता है और हर एक भरता है: `auto:photo` चिह्नित section बैकग्राउंड या गैलरी प्रविष्टि, एक `auto:icon`, hero का `auto:divider`, और बिना किसी मार्कर के, कोई भी `textWithPhoto`, `card`, या `image` एलिमेंट जिसकी `photo` खाली है। JEV हर एक को उसके बगल के टेक्स्ट से चुनता है (कार्ड की फ़ोटो उस कार्ड के शीर्षक और टेक्स्ट से; बैकग्राउंड section की कॉपी से), पृष्ठ पर कोई विषय दोहराए बिना। इसलिए एक नया टेम्पलेट मुफ़्त में फ़ोटो पाता है। फ़ोटो Pexels खोज विषय हैं जो `pexels:<term>` placeholders के रूप में उत्सर्जित होते हैं, जिन्हें B1Admin `POST /content/stock/search` के माध्यम से हल करता है; जो क्लाइंट `resolvesPhotos` नहीं भेजता उसे इसके बजाय एक अंतर्निहित hero इमेज, सपाट रंगीन पट्टियाँ और बिना फ़ोटो वाले कार्ड मिलते हैं। जानबूझकर कोई पोर्ट्रेट विषय नहीं हैं और पास्टर टेम्पलेट में कोई फ़ोटो नहीं है: एक स्टॉक अजनबी कभी असली व्यक्ति की जगह नहीं ले सकता। जिस चर्च के अभी कोई पृष्ठ नहीं हैं, B1Admin `suggestedStyle` को वैश्विक styles पर लागू करता है; मौजूदा साइटें अपना रूप बनाए रखती हैं।

### अन्य endpoints

:::info
B1Admin में `SectionToolbar` rewrite बटन और पृष्ठ-सूची का "Generate Site" बटन क्लाइंट-साइड पर अब भी comment out हैं। नीचे के AskApi endpoints फिर भी जवाब देते हैं; केवल वह UI छिपा है।
:::

| Endpoint | उद्देश्य |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | मूल दो-चरणीय पृष्ठ प्रवाह (outline, फिर हर section के लिए एक LLM कॉल जो element JSON उत्सर्जित करती है)। लागत के कारण B1Admin में `planPage`/`writePage` द्वारा प्रतिस्थापित; API उपभोक्ताओं के लिए रखा गया |
| `POST /website/generateSite` | पूरी-साइट जेनरेशन। **डिज़ाइन से दो-चरणीय**: `planOnly: true` कॉल केवल बहु-पृष्ठ योजना लौटाती है (एक तेज़ मॉडल कॉल), फिर क्लाइंट पूर्ण कंटेंट माँगता है -- हर अनुरोध को Lambda/API-Gateway timeout के भीतर रखते हुए |
| `POST /website/rewriteSection` | संरचना-संरक्षित पुनर्लेखन: मॉडल केवल टेक्स्ट-धारक answers बदल सकता है। पहले और बाद में एक पुनरावर्ती संरचना हस्ताक्षर (ids + types + order) की तुलना होती है; कोई भी बेमेल मूल section को `fallback: true` के साथ लौटाता है, दूषित संरचना के बजाय |
| `POST /website/generateAltText` | 20 इमेज URLs तक पर Vision कॉल; संक्षिप्त alt टेक्स्ट लौटाता है (≤125 अक्षर, "photo of" उपसर्ग हटाए गए) |
| `POST /website/generateMetaDescription` | पृष्ठ के टेक्स्ट कंटेंट से एक SEO meta विवरण (≤155 अक्षर) -- B1Admin की पृष्ठ सेटिंग्स पर Generate बटन से जुड़ा |

इन endpoints के prompts `AskApi/config/instructions/` के अंतर्गत markdown फ़ाइलें हैं, जिनमें वह एलिमेंट कैटलॉग शामिल है जिससे मॉडल जेनरेट करता है। दो डिज़ाइन बिंदु इस कैटलॉग को ईमानदार रखते हैं: क्लाइंट हर अनुरोध पर `availableElementTypes` भेजता है (prompt केवल उस सूची के प्रकार उपयोग कर सकता है -- सर्वर पूरा सेट कभी हार्डकोड नहीं करता), और API का MCP `describe_page_builder` टूल वही गाइड AI एजेंटों के लिए [MCP](../api/mcp.md) के माध्यम से काम करते हुए रखता है। मॉडल OpenRouter के माध्यम से Anthropic Claude हैं -- sections कंटेंट के लिए 3.5 Haiku (विलंबता), outlines, site plans, और vision के लिए 3.5 Sonnet -- और OpenRouter key कॉन्फ़िगर न होने पर OpenAI fallback के साथ।

## संवादात्मक फ़ॉर्म

फ़ॉर्म (membership मॉड्यूल) ने connect-card-शैली पृष्ठों के लिए एक संवादात्मक मोड प्राप्त किया। `forms` पर चार कॉलम इसे चलाते हैं: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`।

- **रेंडरिंग** -- apphelper का `FormSubmissionEdit` जब `displayMode` `conversational` हो तो `ConversationalForm` कंपोनेंट (एक बार में एक प्रश्न) पर स्विच करता है; B1App का फ़ॉर्म पृष्ठ मोड पास करता है। दोनों तरह से वही सबमिशन payload।
- **स्वतः-निर्मित व्यक्ति** -- `autoCreatePerson` सेट होने पर सबमिशन पर, `ConversationalFormHelper.findOrCreatePerson` ईमेल (केस-इनसेंसिटिव) से डुप्लिकेट हटाता है और अन्यथा `membershipStatus: "Guest"` के साथ एक household + व्यक्ति बनाता है, फिर सबमिशन को उस व्यक्ति से जोड़ता है।
- **फ़ॉलो-अप ईमेल** -- जब विषय और बॉडी सेट हों, तो प्रस्तुतकर्ता को मौजूदा ट्रांज़ैक्शनल पथ (`TransactionalEmailHelper`) के माध्यम से एक टेम्पलेट ईमेल (`{firstName}` / `{churchName}` टोकन के साथ) मिलता है, कभी notification digest द्वार से नहीं। दोनों साइड-इफ़ेक्ट गैर-घातक हैं: विफलता कभी सबमिशन नहीं खोती।

चारों फ़ील्ड आज API के माध्यम से सेट होते हैं; B1Admin फ़ॉर्म संपादक उन्हें अभी उजागर नहीं करता।

## पब्लिक-साइट कैश

B1App का सार्वजनिक रेंडर पथ चर्च-टैग किए गए fetches को कैश करता है (`next: { revalidate: 300, tags: [sdSlug] }` production में; dev में `0`), इसलिए एक लाइव पृष्ठ ContentApi लिखने के बाद पाँच मिनट तक पुराना रह सकता है। B1App पर `POST /api/revalidate/{sdSlug}` `revalidateTag(sdSlug)` कॉल करता है और उस कैश को जल्दी हटाने का एकमात्र तरीका है।

इसे दो लेखक छूते हैं:

1. **B1Admin** -- `B1Admin/src/site/siteCache.ts` में `clearSiteCache()` संपादक सहेजने के बाद POST करता है। यह सक्रिय साइट के सबडोमेन को प्राथमिकता देता है (एक द्वितीयक साइट को *उस* टैग को बस्ट करना चाहिए, चर्च के डिफ़ॉल्ट को नहीं)।
2. **Api** -- ऐसे Content बदलाव जो कभी B1Admin से नहीं गुज़रते (API keys, MCP, AI) content नियंत्रकों से `SiteCacheHelper.bump(churchId)` फ़ायर करते हैं। helper `SubDomainHelper` के माध्यम से चर्च सबडोमेन हल करता है और `{b1AppRoot}/api/revalidate/{sd}` पर POST करता है। विफलताएँ निगल ली जाती हैं ताकि एक अप्राप्य B1App कभी save को विफल न करे।

Bump करने वाले नियंत्रक: pages (save, delete, duplicate, publish, discard, unpublish, AI temp), sections, elements, blocks, links, global styles, posts, और redirects। Dev `b1AppRoot` `http://{subdomain}.localtest.me:3301` है; demo/prod `https://{subdomain}.b1.church` उपयोग करते हैं।

## संबंधित पृष्ठ

- [Website Routing & Multi-Site](./websites.md) -- अनुरोध किसी चर्च/साइट पर कैसे हल होता है और कस्टम डोमेन कैसे रूट होते हैं
- [Content Endpoints](../api/endpoints/content.md) -- पृष्ठों, sections, elements, blocks, posts, redirects, और settings के लिए पूर्ण REST सतह
- [AppHelper](../shared-libraries/app-helper.md) -- npm पैकेज जो renderers, रजिस्ट्री, dividers, और widgets भेजता है
- [MCP Server](../api/mcp.md) -- `describe_page_builder` गाइड टूल सहित
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) -- स्टाफ़-मुखी संपादक दस्तावेज़ीकरण
