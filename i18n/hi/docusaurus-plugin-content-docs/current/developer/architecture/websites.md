---
title: "Website Routing और Multi-Site"
---

# Website Routing और Multi-Site

<div class="article-intro">

एक ही चर्च अब एक से अधिक अलग वेबसाइटें परोस सकता है, और हर एक `*.b1.church` subdomain पर या पूरी तरह चर्च के अपने कस्टम डोमेन पर रह सकती है। यह पृष्ठ builder के *नीचे* बैठी routing परत को मैप करता है: एक आने वाला अनुरोध चर्च **और** एक विशिष्ट साइट दोनों से कैसे हल होता है, multi-site डेटा मॉडल (`siteId` sentinel जो हर पहले से मौजूद साइट को अपरिवर्तित रेंडर रखता है), और कस्टम-डोमेन edge -- EC2 पर एक स्व-प्रबंधित Caddy proxy जो TLS समाप्त करता है और हर चर्च डोमेन को उसके `*.b1.church` upstream पर पुनर्लिखित करता है। एक बार अनुरोध हल हो जाने पर वास्तव में क्या रेंडर होता है -- page/section/element tree -- इसके लिए [Website Builder](./website-builder) देखें।

</div>

## अवलोकन

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

इस परत में तीन नियम लागू होते हैं:

1. **एक sentinel सब कुछ पीछे-संगत रखता है।** `siteId = ''` प्राथमिक साइट है। इस फ़ीचर से पहले मौजूद हर पेज, block, link, global-style, और domain पंक्ति `''` रखती है और ठीक वैसे ही रेंडर होती है जैसे पहले होती थी। एक *दूसरी* वेबसाइट बस एक गैर-खाली `siteId` वाली पंक्तियों का सेट है, और `?siteId=` के बिना बुलाया गया कोई भी content endpoint प्राथमिक साइट लौटाता है -- बिल्कुल पुराना अनुरोध, बाइट-दर-बाइट।
2. **हल होना host-label-आधारित है और एकजुट होता है।** एक `*.b1.church` subdomain अपने host label से सीधे रूट होता है; एक कस्टम डोमेन को B1App उसे देखने से पहले Caddy edge पर उसके `{sub}.b1.church` label में पुनर्लिखित किया जाता है (किसी भी raw कस्टम `Host` के लिए fallback के रूप में `x-site` header लगाने वाली middleware DB lookup के साथ)। दोनों पथ एक ही `[sdSlug]` route और एक ही `churches/lookup` कॉल पर पहुँचते हैं, इसलिए नीचे का रेंडरिंग समान है।
3. **Caddy edge एक स्रोत-of-truth पर stateless है।** कस्टम डोमेन EC2 पर एक स्व-प्रबंधित Caddy proxy पर समाप्त होते हैं, जो हर डोमेन को उसके `{sub}.b1.church` upstream पर पुनर्लिखित करता है। डोमेन सहेजने पर एक एकल best-effort `CaddyHelper.updateCaddy()` फ़ायर होता है, और Caddy `domains` तालिका को सीधे भी पढ़ता है (नीचे `authorize` और `hostmap` endpoints)। तालिका ही प्रामाणिक है -- एक अप्राप्य Caddy कभी सहेजने को विफल नहीं कर सकता।

## साइट हल होना

### `*.b1.church` subdomains

`B1App/next.config.mjs` होस्ट के आधार पर आने वाले अनुरोधों को पुनर्लिखित करता है। `(?<subdomain>.*?)\..*` पैटर्न वाला एक host नियम होस्ट के **पहले label** को कैप्चर करता है और `/` तथा `/:path*` को `/{subdomain}` में लिखता है -- `[sdSlug]` App-Router segment। तो `grace.b1.church/about` `/grace/about` बन जाता है।

`src/app/[sdSlug]/` के भीतर, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` को कॉल करता है। `ChurchController.getBySubDomain` प्रतिक्रिया की अब दो शाखाएँ हैं:

| Slug मेल खाता है | प्रतिक्रिया | अर्थ |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | उस चर्च की प्राथमिक साइट |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | एक **द्वितीयक साइट** -- controller `sites` पर fallback करता है, स्वामी चर्च हल करता है, और पूछे गए slug को अतिरिक्त `siteId` के साथ लौटाता है |

वह अतिरिक्त `siteId` ही एकमात्र चीज़ है जो एक द्वितीयक-साइट अनुरोध को प्राथमिक से अलग करती है; पाइपलाइन की बाकी हर चीज़ साझा है।

ऐसा slug जो किसी भी तालिका से मेल न खाए `200` के साथ `{}` लौटता है। `ConfigHelper.load` बिना `id` वाली प्रतिक्रिया को अज्ञात साइट मानता है और Next का `notFound()` कॉल करता है, इसलिए एक अज्ञात subdomain को एक वास्तविक 404 मिलता है, बजाय इसके कि बाद की हर कॉल `/…/undefined` माँगे। builder-पेज route अपना tree path `pageTreePath()` (`src/helpers/pageTreePath.ts`) से बनाता है, जो slug को URL-encode करता है, इसलिए गलत slug (backslashes, spaces) 404 देता है बजाय API के `400` को 500 के रूप में दिखाने के।

### कस्टम डोमेन {#custom-domains}

एक चर्च-स्वामित्व वाला डोमेन **Caddy edge** (नीचे विस्तार से) पर समाप्त होता है, जो B1App को प्रॉक्सी करने से पहले `Host` header को साइट के `{sub}.b1.church` में पुनर्लिखित करता है। तो सामान्य पथ पर B1App एक *आंतरिक* `*.b1.church` host प्राप्त करता है और उसे मूल subdomain की तरह ठीक host label से हल करता है -- middleware की DB lookup कभी फ़ायर नहीं होती। `src/middleware.ts` अब भी हर अनुरोध पर चलता है, लेकिन एक हमेशा-चालू काम और एक fallback के साथ:

1. **हमेशा** -- यह **किसी भी client-भेजे गए `x-site` header को हटा देता है**। वह header spoofable rewrite input है और केवल तभी भरोसेमंद माना जाता है जब middleware स्वयं उसे सेट करे; Caddy के पीछे middleware का असली काम उसे हटाना है।
2. **Fallback, केवल गैर-आंतरिक `Host`** -- एक raw कस्टम-डोमेन `Host` के लिए जो Caddy की पुनर्लिखन *के बिना* B1App तक पहुँचता है, यह `GET /membership/domains/public/lookup/{host}` कॉल करता है और यदि वह `subDomain` लौटाता है, तो `x-site: {subDomain}.b1.church` सेट करता है। Caddy के पीछे यह शाखा निष्क्रिय है क्योंकि `Host` पहले से `*.b1.church` है।

आंतरिक hosts -- `localhost`, `b1.church`, और suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` -- lookup को पूरी तरह छोड़ देते हैं (वे पहले से host-label पुनर्लेखन से हल हो चुके हैं, या preview/deploy hosts हैं)।

lookup स्वयं (`DomainRepo.loadByName`) `domains → churches` और `domains → sites` को left-join करता है और `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` लौटाता है -- यदि डोमेन एक द्वितीयक साइट की ओर इशारा करता है तो उसका सौंपा गया साइट subdomain, अन्यथा चर्च का। यह पहले सटीक host से मेल करता है; यदि वह host `www.` से शुरू हुआ और मेल नहीं खाया, तो यह नग्न apex पर **एक बार** पुनः प्रयास करता है।

`next.config.mjs` में, `x-site` पुनर्लेखन नियम सामान्य host नियमों से **पहले** रखे जाते हैं, इसलिए वे जीतते हैं। `x-site: grace.b1.church` → पहला label `grace` → `[sdSlug] = grace`, और वहाँ से हल होना subdomain पथ जैसा ही है (वही `churches/lookup`, वही `siteId`)।

:::info
`x-site` header बाहर से अविश्वसनीय है। middleware किसी भी आने वाले `x-site` को बिना शर्त हटाता है इससे पहले कि वह अपना सेट करे, और पुनर्लेखन नियम केवल middleware-सेट मान देखते हैं -- एक क्लाइंट header भेजकर खुद को किसी और चर्च की सामग्री पर थोप नहीं सकता।
:::

middleware के दो परिचालन विवरण:

- **Cache।** हर host का परिणाम (hit *या* पुष्ट miss -- कभी network error नहीं) एक in-memory `Map` में **10 मिनट** तक cache होता है, प्रति serverless isolate।
- **Matcher।** matcher जानबूझकर `/sitemap.xml`, `/robots.txt`, और `/manifest.webmanifest` को फिर से शामिल करता है। इसका पहला pattern dotted paths को बाहर करता है, जो अन्यथा उन फ़ाइलों को गिरा देता; उन्हें वापस जोड़ा जाता है ताकि कस्टम डोमेन की प्रति-चर्च SEO/PWA फ़ाइलों को भी `x-site` header मिले।
- **Canonical header।** चर्च पेजों के लिए middleware एक `Link: <{proto}://{host}{path}>; rel="canonical"` response header जोड़ता है जो उस host का नाम देता है जहाँ से पेज वास्तव में परोसा गया था -- subdomain या कस्टम डोमेन (`helpers/canonicalLink.ts`)। जब कोई कस्टम डोमेन [Caddy proxy](../deployment/caddy-proxy) के माध्यम से B1App तक पहुँचता है, तो अनुरोध का host `{sub}.b1.church` subdomain होता है, इसलिए middleware इसके बजाय `X-Church-Host` से आगंतुक का डोमेन उपयोग करता है -- लेकिन केवल तब जब `/domains/public/lookup/{host}` पुष्टि करे कि वह डोमेन उसी subdomain से मैप होता है (`ownsSubdomain()`)। तब canonical link, `robots.txt`, और `sitemap.xml` `b1.church` subdomain के बजाय कस्टम डोमेन का नाम लेते हैं। यह गैर-चर्च hosts (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) पर और `/mobile`, `/login`, `/logout`, और उत्पन्न robots/sitemap/manifest फ़ाइलों पर छोड़ा जाता है।

### अक्षम सार्वजनिक वेबसाइट

एक चर्च B1Admin में **Disable Public Website** चालू कर सकता है (चर्च-स्तरीय content setting `hidePublicSite = "true"`)। तब साइट केवल अपने सदस्य-सामने वाले रूट परोसती है:

- **B1App middleware** subdomain को देखता है (`/membership/churches/lookup` फिर `/content/settings/public/:churchId`) और allowlist के बाहर किसी भी पथ के गुमनाम अनुरोधों को `/login?returnUrl={path}{query}` पर redirect करता है। allowlist (`helpers/publicSite.ts`) है `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, और manifest/robots/sitemap फ़ाइलें। केवल पुष्ट उत्तर cache होते हैं (production में 60 सेकंड, क्योंकि admin की revalidate कॉल इस प्रति-instance map को साफ़ नहीं कर सकती; dev/test में uncached)। एक API त्रुटि साइट परोस देती है बजाय सभी को बाहर रखने के।
- **साइन-इन सदस्य पूरी साइट देखते हैं।** एक अनुरोध जिसके पास एक समाप्त न हुआ `jwt` cookie है (middleware का `hasSession()` payload का `exp` बिना signature सत्यापित किए decode करता है -- यह एक नरम gate है, access control नहीं) redirect छोड़ देता है, इसलिए लॉग इन करने के बाद एक सदस्य उस पेज पर लौटता है जो उसने माँगा था और सामान्य पेज, built-in पेज (Groups, Sermons, आदि), और header navigation देखता है। पेज components और `Header` अब स्वयं `hidePublicSite` की जाँच नहीं करते।
- **`robots.txt`** सब कुछ disallow करता है, noindex hosts की तरह।
- **API।** `GET /content/pages/public/:churchId` (sitemap की पेज सूची) `[]` लौटाता है, ताकि गुमनाम कॉलर पेज सूचीबद्ध न कर सकें।

### `siteId` threading

`ConfigHelper` हल किए गए `siteId` को अपने प्रति-अनुरोध `ConfigurationInterface` पर संग्रहीत करता है (React `cache()` से memoized) और उन content कॉल्स में `?siteId=` जोड़ता है जो वह और पेज components करते हैं -- **सशर्त रूप से**: खाली `siteId` (प्राथमिक-चर्च subdomain) पैरामीटर को पूरी तरह छोड़ देता है। threaded endpoints हैं पेज tree (`/content/pages/:id/tree`), sitemap द्वारा उपयोग की गई सार्वजनिक पेज सूची (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), nav links (`/content/links/church/:id`), और स्वतंत्र footer block (`/content/blocks/public/footer/:id`)। सामान्य रेंडर पथ पर footer पेज tree के भीतर आता है (`zone: "siteFooter"` के साथ tagged sections), जो पहले से `siteId` के साथ fetch हुआ है, इसलिए कोई बे-scoped footer अंतर नहीं है।

सदस्य पोर्टल (B1App `mobile`) जानबूझकर इससे बाहर है: `loadChurchAppearance.ts` `churches/lookup` के माध्यम से चर्च हल करता है लेकिन चर्च-स्तरीय `/settings/public/{id}` पढ़ता है और कभी `siteId` thread नहीं करता -- पोर्टल v1 में चर्च-व्यापी है (नीचे देखें)।

## एक चर्च की कई वेबसाइटें

### डेटा मॉडल

नई `membership.sites` तालिका जानबूझकर छोटी है:

| कॉलम | प्रकार | नोट्स |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | स्वामी चर्च |
| `name` | `varchar(255)` | प्रदर्शित नाम (जैसे "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** -- वैश्विक नामस्थान (नीचे) |

साइट scoping फिर content और domain तालिकाओं में जोड़ा गया एक एकल nullable-मुक्त कॉलम है:

| तालिका (module) | कॉलम | `''` का अर्थ |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | डोमेन प्राथमिक साइट परोसता है |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | प्राथमिक साइट -- और **`blocks`** पर, `''` का अर्थ अतिरिक्त रूप से *सभी साइटों में साझा* है |

दो migrations यह सब जोड़ते हैं (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`)। क्योंकि कॉलम का डिफ़ॉल्ट `''` है, हर मौजूदा पंक्ति बिना backfill के आज का व्यवहार रखती है।

**वैश्विक subdomain नामस्थान।** `sites.subDomain` `churches.subDomain` के साथ *एक* नामस्थान साझा करता है -- एक साइट subdomain कभी चर्च subdomain या किसी अन्य साइट से टकरा नहीं सकता। यह **दोनों** सहेजने के पथों पर लागू होता है: `SiteController.save` किसी भी slug को अस्वीकार करता है जो `churches` या `sites` से टकराए, और `ChurchController.validateSave` उलटे तरीके से वही करता है। `sites.subDomain` पर एक unique index इसे डेटाबेस स्तर पर समर्थन देता है।

**Pages की विशिष्टता** `(churchId, url)` से `(churchId, siteId, url)` तक चौड़ी की गई, ताकि एक चर्च की दो साइटें हर एक अपना `/about` रख सकें।

### प्रति-साइट सामग्री, fallbacks के साथ

हर साइट-scoped content **सूची/tree** endpoint एक वैकल्पिक `?siteId=` लेता है (अनुपस्थित ⇒ `''` = प्राथमिक): pages tree / list / public, blocks list / by-type / footer, links (anon / filtered / all), और global styles। Sections और elements सीधे scope नहीं होते -- वे अपने parent page या block के माध्यम से विरासत में लेते हैं।

दो resolution chains दिलचस्प काम करती हैं:

- **Global styles — `site → primary → default`।** `GlobalStyleRepo.loadForChurch(churchId, siteId)` साइट की अपनी पंक्ति लौटाता है; यदि द्वितीयक साइट की कोई नहीं है, तो यह **प्राथमिक (`''`) पंक्ति को ज्यों का त्यों लौटाता है** (प्राथमिक का `id`/`siteId` रखते हुए, जिसे क्लाइंट copy-on-write के लिए उपयोग करता है); यदि प्राथमिक भी नहीं है, तो `GlobalStyleController` एक hard-coded डिफ़ॉल्ट palette/fonts लौटाता है।
- **Footer block — साइट-विशिष्ट जीतता है, साझा fallback।** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` साझा (`''`) *और* साइट-विशिष्ट दोनों पंक्तियाँ लौटाता है; resolver यदि उपलब्ध हो तो साइट का अपना footer चुनता है, अन्यथा साझा। वही तर्क `TreeHelper.insertBlocks` (पेज tree) और स्वतंत्र `/content/blocks/public/footer/:churchId` endpoint दोनों में चलता है।

### साइट हटाने का cascade

`SiteController.delete` (membership Settings→Edit अनुमति से gated) एक द्वितीयक साइट को तीन चरणों में हटाता है:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` साइट के स्वामित्व वाली सारी सामग्री cascade करता है: उसके **pages** → उनके sections, elements, `pageHistory`, और `posts`; उसके अपने **blocks** → उनके sections, elements, और `pageHistory`; उसके **links** और **globalStyles**। एक guard `''` के लिए चलने से इनकार करता है -- प्राथमिक/साझा sentinel कभी cascade नहीं होता।
2. `DomainRepo.clearSiteId` साइट के डोमेन को हटाने के बजाय प्राथमिक पर वापस **पुन: सौंपता है** (`siteId → ''`), ताकि साइट हटाने पर कस्टम डोमेन बचे रहें।
3. `sites` पंक्ति हटाई जाती है और Caddy routes पुनः सिंक होते हैं (best-effort)।

### B1Admin सतह

| क्षमता | कहाँ | तंत्र |
|-----------|-----------|-----------|
| साइट स्विचर | `useSiteSelection` + `SiteSwitcher` (खाली = "Main Website") | एक `?site=` URL param पढ़ता है और उसे ContentApi कॉल्स में `?siteId=` के रूप में thread करता है। तीन Site **सूची** क्षेत्रों पर उपस्थित -- **Pages**, **Blocks**, **Appearance** -- लेकिन page/block editors पर नहीं, जो `siteId` को रिकॉर्ड पर रखते हैं |
| साइट बनाना/हटाना | `SitesDialog`, स्विचर की "Manage websites…" प्रविष्टि से खुला | `POST /membership/sites` / `DELETE /membership/sites/:id` (नाम + subDomain)। membership Settings→Edit अनुमति से gated (सर्वर-side `Permissions.settings.edit`; B1Admin में `Permissions.membershipApi.settings.edit`)। **केवल बनाना/हटाना -- v1 में नाम बदलने का UI नहीं है** |
| प्रति-डोमेन साइट असाइनमेंट | Settings→Domains के अंतर्गत `DomainSettingsEdit` | एक प्रति-पंक्ति साइट dropdown हर डोमेन के लिए `siteId` को `/membership/domains` पर पोस्ट करता है। यदि API कोई साइट नहीं लौटाता (पुराना backend) तो कॉलम छिप जाता है |
| Copy-on-write styles | `StylesManager.prepareForSave` | जब लोड की गई global-style पंक्ति का `siteId` चुनी गई साइट से मेल नहीं खाता (यानी API ने विरासत में मिली प्राथमिक को fallback के रूप में लौटाया), तो यह प्राथमिक का `id` हटाकर और वर्तमान `siteId` लगाकर प्राथमिक को overwrite करने के बजाय एक नई साइट-विशिष्ट पंक्ति का **insert** बाध्य करता है। वही mismatch-पर-fork साइट footer block पर भी लागू होता है |

:::info
**v1 में चर्च-व्यापी क्या रहता है (एक जानबूझकर scoping विकल्प, डेटा मॉडल की सीमा नहीं):** **blog** (`BlogPage` में कोई switcher नहीं है और वह `siteId` के बिना `/posts` लोड करता है), **साइट widgets** (announcement banner + launcher), **redirects**, **logo / GA4 / चर्च सेटिंग्स**, और **सदस्य पोर्टल** (B1App mobile)। ध्यान दें कि यह "पूरा Appearance" नहीं है -- एक द्वितीयक साइट की global styles (palette, fonts, typography, spacing, nav, custom CSS) ऊपर copy-on-write पथ से **प्रति-साइट** हैं; केवल Appearance पेज के banner/launcher/redirects/logo उप-पैनल चर्च-व्यापी रहते हैं।
:::

## कस्टम डोमेन: Caddy edge (static-config योजना)

:::info
**दिशा 2026-07-02 को संशोधित।** कस्टम-डोमेन होस्टिंग को Vercel-प्रबंधित डोमेन पर ले जाने की पिछली योजना **रद्द** की गई, और सभी Vercel डोमेन-पंजीकरण कोड (`VercelHelper`, उसके `vercelToken`/`vercelProjectId`/`vercelTeamId` env vars, SSM params, और health entries) Api से हटा दिए गए। EC2 पर स्व-प्रबंधित **Caddy proxy स्थायी कस्टम-डोमेन edge के रूप में रहता है**। केवल शेष कार्य आंतरिक है: Caddy के *runtime* admin-API कॉन्फ़िगरेशन को एक *static* कॉन्फ़िग से बदलना जो पुनरारंभ के बाद भी बचा रहे।
:::

### edge

हर चर्च का कस्टम डोमेन DNS को एक EC2 बॉक्स की ओर इंगित करता है -- `3.23.251.61`, जो `proxy.b1.church` के माध्यम से भी पहुँच योग्य है। B1Admin की Settings→Domains स्क्रीन चर्चों को एक apex `A → 3.23.251.61` या `CNAME → proxy.b1.church` जोड़ने का निर्देश देती है। Caddy हर डोमेन के लिए एक Let's Encrypt प्रमाणपत्र के साथ TLS समाप्त करता है, `Host` header को डोमेन के `{sub}.b1.church` upstream पर पुनर्लिखित करता है, और B1App को प्रॉक्सी करता है -- जो फिर इसे किसी भी मूल subdomain की तरह host label से रूट करता है (ऊपर [कस्टम डोमेन](#custom-domains) देखें)।

upstream मैपिंग `DomainRepo.loadPairs` से आती है, जिसका dial **असाइन की गई साइट के subdomain को COALESCE करता है** ताकि एक डोमेन सही *द्वितीयक* साइट को प्रॉक्सी करे, प्राथमिक चर्च पर fallback करते हुए:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` पंक्तियाँ map से बाहर रखी जाती हैं; Caddy `www.{host}` को apex पर `302` redirect के माध्यम से परोसता है।

### दो गुमनाम endpoints edge को खिलाते हैं

`DomainController` दो अप्रमाणित, केवल-पढ़ने योग्य endpoints expose करता है जिन्हें बॉक्स सीधे उपभोग करता है -- आवश्यकता से गुमनाम, क्योंकि edge किसी भी चर्च संदर्भ के मौजूद होने से पहले उनसे पूछता है:

| Endpoint | लौटाता है | भूमिका |
|----------|----------|--------|
| `GET /membership/domains/authorize?domain=` | `200` यदि डोमेन -- या, `www.` मिस के लिए, उसका नग्न apex -- `domains` में मौजूद है; अन्यथा `404` (खाली `domain` सहित) | Caddy का **on-demand-TLS `ask`**: यह तय करने वाला दुरुपयोग नियंत्रण कि आने वाले SNI के लिए प्रमाणपत्र जारी करना है या नहीं |
| `GET /membership/domains/hostmap` | `text/plain`, हर routable डोमेन के लिए एक क्रमबद्ध `{domain} {sub}.b1.church` पंक्ति | host→upstream map फ़ाइल जिसे बॉक्स एक timer पर रीफ़्रेश करता है |

`authorize` `DomainRepo.loadByName` को पुन: उपयोग करता है (सटीक host, फिर एक एकल `www.`→apex पुनः प्रयास); `hostmap` `loadPairs` को पुन: उपयोग करता है -- इसलिए यह साइट-जागरूक और `www.*`-बाहर है, proxy routes के समान -- और केवल `:443` प्रत्यय हटाता है।

### डोमेन सहेजना/हटाना -- एक best-effort push

`DomainController.save` `domains` पंक्तियाँ लिखता है और फिर एक **single best-effort** `CaddyHelper.updateCaddy()` कॉल करता है, जो एक `try/catch` में लिपटा है जो लॉग (`console.error`) करता है और निगल लेता है; `delete` भी यही करता है (जिसने पहले के stale-route-on-delete बग को भी ठीक किया), जैसे द्वितीयक-साइट हटाना (`SiteController.delete`)। `updateCaddy` स्वयं एक **10s** Axios timeout से बाधित है, इसलिए एक अप्राप्य या बंद Caddy कभी डोमेन सहेजने को `500` नहीं कर सकता -- `domains` तालिका स्रोत है।

### वर्तमान स्थिति -- static config, कोई runtime state नहीं

बॉक्स (स्थायी Elastic IP के पीछे Windows EC2) Caddy को एक **static Caddyfile** से चलाता है: on-demand TLS जिसका `ask` `/membership/domains/authorize` की ओर इशारा करता है, प्लस एक host→upstream map फ़ाइल जो हर 5 मिनट में `/membership/domains/hostmap` से एक scheduled task द्वारा रीफ़्रेश होती है जो एक graceful `caddy reload` पर समाप्त होता है। कॉन्फ़िग शून्य runtime state के साथ पुनरारंभ से बच जाता है -- कोई पुनः-priming नृत्य नहीं -- और एक अज्ञात SNI **TLS-refused** होता है (जिस host को `authorize` अस्वीकार करता है उसके लिए कोई प्रमाणपत्र नहीं बनता), जबकि एक authorized-but-not-yet-mapped host (sync विंडो के भीतर एक बिल्कुल नया डोमेन) एक साफ़ 404 पाता है। नए डोमेन सहेजने के ~5 मिनट के भीतर routable होते हैं; उनके प्रमाणपत्र पहली hit पर बनते हैं। build/setup, संचालन, और field-tested gotchas: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy)।

### Legacy runtime push -- rollback पथ, हटाने के लिए लंबित

`CaddyHelper` (membership module) अब भी Caddy को उसके **admin API** के माध्यम से `caddyHost:caddyPort` पर चला सकता है (SSM `caddyHost`/`caddyPort`; सेट न होने पर no-op; `ServerHealthController` के Integrations समूह के अंतर्गत दिखता है): `updateCaddy()` एक पूरी routes array को PATCH करता है, और `initializeCaddy()` + `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` endpoints एक runtime-कॉन्फ़िगर सर्वर को शुरू से पुनर्निर्मित करते हैं। उस मोड की कॉन्फ़िग केवल Caddy की memory में रहती थी -- वही पुनरारंभ-विस्मरण जिसे यह आर्किटेक्चर बदलता है। यह machinery केवल rollback पथ के रूप में बची है और static बॉक्स के स्थिर होने के बाद हटाने के लिए निर्धारित है; डोमेन सहेजने/हटाने पर best-effort `updateCaddy()` push static बॉक्स के विरुद्ध एक हानिरहित no-op है (इसका admin API केवल localhost पर है)।

## संबंधित पृष्ठ

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — edge बॉक्स स्वयं: नए बॉक्स का सेटअप, WinSW service, map sync task, और परिचालन gotchas
- [Website Builder](./website-builder) — page/section/element tree, renderers, blog, SEO, और AI generation (एक बार अनुरोध चर्च/साइट से हल होने पर जो रेंडर होता है)
- [Content Endpoints](../api/endpoints/content) — pages, blocks, links, और global styles के लिए REST surface, अब सभी `?siteId=`-जागरूक
- [B1App](../web-apps/b1-app) — Next.js ऐप जो middleware और `[sdSlug]` routing होस्ट करता है
- [Web App Deployment](../deployment/web-apps) — B1App को Vercel पर कैसे deploy किया जाता है
