---
title: "वेबसाइट रूटिंग और मल्टी-साइट"
description: "B1.church उपडोमेन और कस्टम डोमेन को सही चर्च या द्वितीयक साइट से कैसे जोड़ता है, साथ ही कस्टम डोमेन के TLS को संभालने वाला Caddy एज।"
---

# वेबसाइट रूटिंग और मल्टी-साइट

<div class="article-intro">

एक ही चर्च अब एक से अधिक अलग वेबसाइटें परोस सकता है, और हर एक `*.b1.church` सबडोमेन पर या पूरी तरह कस्टम, चर्च-स्वामित्व वाले डोमेन पर रह सकती है। यह पृष्ठ रूटिंग परत का मानचित्र देता है जो बिल्डर *के नीचे* बैठती है: एक आने वाला अनुरोध चर्च **और** एक विशिष्ट साइट दोनों पर कैसे हल होता है, मल्टी-साइट डेटा मॉडल (`siteId` sentinel जो हर पूर्व-मौजूदा साइट को अपरिवर्तित रेंडर रखता है), और कस्टम-डोमेन किनारा -- EC2 पर एक स्व-प्रबंधित Caddy प्रॉक्सी जो TLS समाप्त करता है और हर चर्च डोमेन को उसके `*.b1.church` upstream पर फिर से लिखता है। एक बार अनुरोध हल हो जाने पर वास्तव में क्या रेंडर होता है -- पृष्ठ/section/element tree -- उसके लिए [Website Builder](./website-builder.md) देखें।

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

1. **एक sentinel सब कुछ पिछड़ी-संगत रखता है।** `siteId = ''` प्राथमिक साइट है। हर पृष्ठ, ब्लॉक, लिंक, global-style, और domain पंक्ति जो इस फ़ीचर से पहले मौजूद थी, `''` रखती है और ठीक वैसे ही रेंडर होती है जैसे पहले होती थी। एक *दूसरी* वेबसाइट बस गैर-खाली `siteId` वाली पंक्तियों का एक सेट है, और `?siteId=` के बिना बुलाया गया कोई भी content endpoint प्राथमिक साइट लौटाता है -- बाइट-दर-बाइट पुराना अनुरोध।
2. **रिज़ॉल्यूशन होस्ट-लेबल-आधारित और अभिसारी है।** एक `*.b1.church` सबडोमेन अपने होस्ट लेबल से सीधे रूट होता है; एक कस्टम डोमेन को B1App उसे देखने से पहले Caddy किनारे पर उसके `{sub}.b1.church` लेबल में फिर से लिखा जाता है (एक middleware DB lookup जो किसी भी raw कस्टम `Host` के लिए fallback के रूप में `x-site` header सेट करता है)। दोनों पैर एक ही `[sdSlug]` रूट और एक ही `churches/lookup` कॉल पर उतरते हैं, इसलिए डाउनस्ट्रीम रेंडरिंग समान है।
3. **Caddy किनारा एक सत्य के स्रोत पर स्टेटलेस है।** कस्टम डोमेन एक स्व-प्रबंधित Caddy प्रॉक्सी पर EC2 पर समाप्त होते हैं जो हर डोमेन को उसके `{sub}.b1.church` upstream पर फिर से लिखता है। एक domain save एक एकल सर्वोत्तम-प्रयास `CaddyHelper.updateCaddy()` फ़ायर करता है, और Caddy `domains` तालिका को सीधे भी पढ़ता है (नीचे के `authorize` और `hostmap` endpoints)। तालिका अधिकृत है -- एक अप्राप्य Caddy कभी save को विफल नहीं कर सकता।

## साइट रिज़ॉल्यूशन

### `*.b1.church` सबडोमेन

`B1App/next.config.mjs` होस्ट द्वारा आने वाले अनुरोधों को फिर से लिखता है। एक होस्ट नियम पैटर्न `(?<subdomain>.*?)\..*` होस्ट के **पहले लेबल** को कैप्चर करता है और `/` और `/:path*` को `/{subdomain}` में फिर से लिखता है -- `[sdSlug]` App-Router सेगमेंट। तो `grace.b1.church/about` `/grace/about` बन जाता है।

`src/app/[sdSlug]/` के भीतर, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` कॉल करता है। `ChurchController.getBySubDomain` प्रतिक्रिया की अब दो शाखाएँ हैं:

| Slug मेल खाता है | प्रतिक्रिया | अर्थ |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | उस चर्च की प्राथमिक साइट |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | एक **द्वितीयक साइट** -- नियंत्रक `sites` पर वापस गिरता है, स्वामी चर्च हल करता है, और पूछे गए slug के साथ अतिरिक्त `siteId` लौटाता है |

वह अतिरिक्त `siteId` ही एकमात्र चीज़ है जो द्वितीयक-साइट अनुरोध को प्राथमिक से अलग करती है; पाइपलाइन में बाकी सब साझा है।

ऐसा slug जो किसी भी तालिका से मेल नहीं खाता, `200` के साथ `{}` लौटता है। `ConfigHelper.load` बिना `id` वाली प्रतिक्रिया को अज्ञात साइट मानता है और Next का `notFound()` कॉल करता है, इसलिए एक अज्ञात सबडोमेन को बाद की हर कॉल `/…/undefined` माँगने के बजाय एक वास्तविक 404 मिलता है। बिल्डर-पृष्ठ रूट अपना tree पथ `pageTreePath()` (`src/helpers/pageTreePath.ts`) से बनाता है, जो slug को URL-encode करता है, इसलिए एक खराब slug (backslashes, spaces) API के `400` को 500 के रूप में दिखाने के बजाय 404 देता है।

### कस्टम डोमेन {#custom-domains}

एक चर्च-स्वामित्व वाला डोमेन **Caddy किनारे** (नीचे विस्तार से) पर समाप्त होता है, जो B1App को प्रॉक्सी करने से पहले `Host` header को साइट के `{sub}.b1.church` में फिर से लिखता है। तो सामान्य पथ पर B1App एक *आंतरिक* `*.b1.church` होस्ट प्राप्त करता है और उसे ठीक एक मूल सबडोमेन की तरह होस्ट लेबल द्वारा हल करता है -- middleware का DB lookup कभी फ़ायर नहीं होता। `src/middleware.ts` अब भी हर अनुरोध पर चलता है, लेकिन एक हमेशा-चालू काम और एक fallback के साथ:

1. **हमेशा** -- यह **किसी भी क्लाइंट-भेजे गए `x-site` header को हटाता है**। वह header spoofable रूपांतरण इनपुट है और केवल तभी भरोसेमंद माना जाता है जब middleware स्वयं उसे सेट करे; Caddy के पीछे उसे हटाना middleware का असली काम है।
2. **Fallback, केवल गैर-आंतरिक `Host`** -- एक raw कस्टम-डोमेन `Host` के लिए जो Caddy के rewrite के बिना B1App तक पहुँचता है, यह `GET /membership/domains/public/lookup/{host}` कॉल करता है और, यदि वह `subDomain` लौटाता है, तो `x-site: {subDomain}.b1.church` सेट करता है। Caddy के पीछे यह शाखा निष्क्रिय है क्योंकि `Host` पहले से `*.b1.church` है।

आंतरिक होस्ट -- `localhost`, `b1.church`, और suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` -- lookup को पूरी तरह छोड़ देते हैं (वे पहले से होस्ट-लेबल rewrite द्वारा हल हैं, या preview/deploy होस्ट हैं)।

lookup स्वयं (`DomainRepo.loadByName`) `domains → churches` और `domains → sites` को left-join करता है और `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` लौटाता है -- यदि डोमेन किसी द्वितीयक साइट की ओर इंगित करता है तो उसे सौंपी गई साइट का सबडोमेन, अन्यथा चर्च का। यह पहले सटीक होस्ट से मेल खाता है; यदि वह होस्ट `www.` से शुरू हुआ और मेल नहीं खाया, तो यह बिना `www` वाले apex पर **एक बार** फिर प्रयास करता है।

`next.config.mjs` में, `x-site` rewrite नियम सामान्य होस्ट नियमों से **पहले** रखे जाते हैं, इसलिए वे जीतते हैं। `x-site: grace.b1.church` → पहला लेबल `grace` → `[sdSlug] = grace`, और वहाँ से रिज़ॉल्यूशन सबडोमेन पथ जैसा ही है (वही `churches/lookup`, वही `siteId`)।

:::info
बाहर से `x-site` header अविश्वसनीय है। middleware अपने स्वयं के वैकल्पिक सेट करने से पहले किसी भी आने वाले `x-site` को बिना शर्त हटाता है, और rewrite नियम केवल middleware-सेट मान देखते हैं -- एक क्लाइंट header भेजकर किसी दूसरे चर्च के कंटेंट पर स्वयं को मजबूर नहीं कर सकता।
:::

middleware के दो परिचालन विवरण:

- **कैश।** हर होस्ट का परिणाम (एक hit *या* एक पुष्ट miss -- कभी नेटवर्क त्रुटि नहीं) प्रति सर्वरलेस आइसोलेट एक इन-मेमोरी `Map` में **10 मिनट** तक कैश होता है।
- **Matcher।** matcher जानबूझकर `/sitemap.xml`, `/robots.txt`, और `/manifest.webmanifest` को फिर से शामिल करता है। इसका पहला पैटर्न dotted पथों को बाहर रखता है, जो अन्यथा उन फ़ाइलों को गिरा देता; उन्हें वापस जोड़ा जाता है ताकि कस्टम डोमेन की प्रति-चर्च SEO/PWA फ़ाइलें भी `x-site` header प्राप्त करें।
- **Canonical header।** चर्च पृष्ठों के लिए middleware एक `Link: <{proto}://{host}{path}>; rel="canonical"` प्रतिक्रिया header जोड़ता है जो उस होस्ट का नाम देता है जहाँ पृष्ठ वास्तव में परोसा गया -- सबडोमेन या कस्टम डोमेन (`helpers/canonicalLink.ts`)। जब कोई कस्टम डोमेन [Caddy प्रॉक्सी](../deployment/caddy-proxy.md) के माध्यम से B1App तक पहुँचता है, तो अनुरोध का होस्ट `{sub}.b1.church` सबडोमेन होता है, इसलिए middleware इसके बजाय `X-Church-Host` से आगंतुक का डोमेन उपयोग करता है -- लेकिन केवल तब जब `/domains/public/lookup/{host}` पुष्ट करे कि वह डोमेन उसी सबडोमेन पर मैप होता है (`ownsSubdomain()`)। तब canonical link, `robots.txt`, और `sitemap.xml` `b1.church` सबडोमेन के बजाय कस्टम डोमेन का नाम देते हैं। यह गैर-चर्च होस्ट (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) पर और `/mobile`, `/login`, `/logout`, और उत्पन्न robots/sitemap/manifest फ़ाइलों पर छोड़ दिया जाता है।

### अक्षम सार्वजनिक वेबसाइट

एक चर्च B1Admin में **Disable Public Website** चालू कर सकता है (चर्च-स्तरीय कंटेंट सेटिंग `hidePublicSite = "true"`)। तब साइट केवल अपने सदस्य-मुखी रूट परोसती है:

- **B1App middleware** सबडोमेन को देखता है (`/membership/churches/lookup` फिर `/content/settings/public/:churchId`) और अनुमति-सूची के बाहर किसी भी पथ के लिए गुमनाम अनुरोधों को `/login?returnUrl={path}{query}` पर रीडायरेक्ट करता है। अनुमति-सूची (`helpers/publicSite.ts`) है `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, और manifest/robots/sitemap फ़ाइलें। केवल पुष्ट उत्तर कैश होते हैं (production में 60 सेकंड, क्योंकि एडमिन का revalidate कॉल इस प्रति-इंस्टेंस मैप को साफ़ नहीं कर सकता; dev/test में बिना कैश)। एक API त्रुटि सबको लॉक आउट करने के बजाय साइट परोसती है।
- **साइन-इन सदस्य पूरी साइट देखते हैं।** एक अमान्य `jwt` cookie वाला अनुरोध (middleware का `hasSession()` payload का `exp` बिना signature सत्यापित किए decode करता है -- यह एक soft gate है, पहुँच नियंत्रण नहीं) रीडायरेक्ट छोड़ देता है, इसलिए लॉग इन करने के बाद सदस्य उस पृष्ठ पर लौटता है जो उसने माँगा था और सामान्य पृष्ठ, built-in पृष्ठ (Groups, Sermons, आदि), और हेडर नेविगेशन देखता है। पृष्ठ कंपोनेंट और `Header` अब `hidePublicSite` स्वयं नहीं जाँचते।
- **`robots.txt`** noindex होस्ट की तरह सब कुछ disallow करता है।
- **API।** `GET /content/pages/public/:churchId` (sitemap की पृष्ठ सूची) `[]` लौटाता है, ताकि गुमनाम कॉलर पृष्ठों की सूची न बना सकें।

### `siteId` थ्रेडिंग

`ConfigHelper` हल किए गए `siteId` को अपने प्रति-अनुरोध `ConfigurationInterface` पर संग्रहीत करता है (React `cache()` के साथ memoized) और उन content कॉल्स में `?siteId=` जोड़ता है जो वह और पृष्ठ कंपोनेंट करते हैं -- **सशर्त रूप से**: खाली `siteId` (प्राथमिक-चर्च सबडोमेन) पैरामीटर को पूरी तरह छोड़ देता है। थ्रेड किए गए endpoints हैं पृष्ठ tree (`/content/pages/:id/tree`), sitemap द्वारा उपयोग होने वाली सार्वजनिक पृष्ठ सूची (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), नेविगेशन लिंक (`/content/links/church/:id`), और स्टैंडअलोन फ़ुटर ब्लॉक (`/content/blocks/public/footer/:id`)। सामान्य रेंडर पथ पर फ़ुटर tree के भीतर आता है (sections `zone: "siteFooter"` से टैग), जो पहले ही `siteId` के साथ लाया गया है, इसलिए कोई बिना-स्कोप वाला फ़ुटर अंतराल नहीं है।

सदस्य पोर्टल (B1App `mobile`) जानबूझकर इससे बाहर है: `loadChurchAppearance.ts` `churches/lookup` के माध्यम से चर्च हल करता है लेकिन चर्च-स्तरीय `/settings/public/{id}` पढ़ता है और कभी `siteId` थ्रेड नहीं करता -- पोर्टल v1 में चर्च-व्यापी है (नीचे देखें)।

## एक चर्च की कई वेबसाइटें

### डेटा मॉडल

नई `membership.sites` तालिका जानबूझकर छोटी है:

| कॉलम | प्रकार | टिप्पणियाँ |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | स्वामी चर्च |
| `name` | `varchar(255)` | प्रदर्शित नाम (जैसे "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** -- वैश्विक नेमस्पेस (नीचे) |

साइट स्कोपिंग फिर कंटेंट और डोमेन तालिकाओं में एक एकल गैर-nullable कॉलम है:

| तालिका (मॉड्यूल) | कॉलम | `''` का अर्थ |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | डोमेन प्राथमिक साइट परोसता है |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | प्राथमिक साइट -- और **`blocks`** पर, `''` का अतिरिक्त अर्थ है *सभी साइटों पर साझा* |

दो माइग्रेशन यह सब जोड़ते हैं (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`)। चूँकि कॉलम का डिफ़ॉल्ट `''` है, हर मौजूदा पंक्ति आज के व्यवहार को बिना backfill के रखती है।

**वैश्विक सबडोमेन नेमस्पेस।** `sites.subDomain` `churches.subDomain` के साथ *एक* नेमस्पेस साझा करता है -- एक साइट सबडोमेन कभी चर्च सबडोमेन या दूसरी साइट से टकरा नहीं सकता। यह **दोनों** save पथों पर लागू है: `SiteController.save` ऐसे slug को अस्वीकार करता है जो `churches` या `sites` से मेल खाए, और `ChurchController.validateSave` उलटे तरीके से यही करता है। `sites.subDomain` पर एक unique index डेटाबेस स्तर पर इसे समर्थन देता है।

**Pages की अनूठता** `(churchId, url)` से `(churchId, siteId, url)` तक चौड़ी की गई, ताकि एक चर्च की दो साइटें हर एक अपना `/about` रख सकें।

### प्रति-साइट कंटेंट, fallbacks के साथ

हर साइट-स्कोपेड कंटेंट **सूची/tree** endpoint एक वैकल्पिक `?siteId=` लेता है (अनुपस्थित ⇒ `''` = प्राथमिक): pages tree / list / public, blocks list / by-type / footer, links (anon / filtered / all), और global styles। Sections और elements सीधे स्कोप नहीं होते -- वे अपने parent पृष्ठ या ब्लॉक के माध्यम से विरासत में लेते हैं।

दो रिज़ॉल्यूशन श्रृंखलाएँ दिलचस्प काम करती हैं:

- **Global styles -- `site → primary → default`।** `GlobalStyleRepo.loadForChurch(churchId, siteId)` साइट की अपनी पंक्ति लौटाता है; यदि द्वितीयक साइट के पास कोई नहीं है, तो यह **प्राथमिक (`''`) पंक्ति को जैसी है वैसी लौटाता है** (प्राथमिक का `id`/`siteId` रखते हुए, जिसे क्लाइंट copy-on-write के लिए उपयोग करता है); यदि प्राथमिक भी नहीं है, तो `GlobalStyleController` एक हार्डकोड डिफ़ॉल्ट palette/fonts लौटाता है।
- **फ़ुटर ब्लॉक -- साइट-विशिष्ट जीतता है, साझा fallback।** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` साझा (`''`) *और* साइट-विशिष्ट पंक्तियाँ लौटाता है; resolver साइट का अपना फ़ुटर चुनता है यदि मौजूद हो, अन्यथा साझा। वही तर्क `TreeHelper.insertBlocks` (पृष्ठ tree) और स्टैंडअलोन `/content/blocks/public/footer/:churchId` endpoint दोनों में चलता है।

### साइट हटाने का cascade

`SiteController.delete` (membership Settings→Edit अनुमति पर गेट) एक द्वितीयक साइट को तीन चरणों में हटाता है:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` साइट के स्वामित्व वाले सभी कंटेंट को cascade करता है: उसके **pages** → उनके sections, elements, `pageHistory`, और `posts`; उसके अपने **blocks** → उनके sections, elements, और `pageHistory`; उसके **links** और **globalStyles**। एक guard `''` के लिए चलने से इनकार करता है -- प्राथमिक/साझा sentinel कभी cascade नहीं होता।
2. `DomainRepo.clearSiteId` साइट के डोमेनों को प्राथमिक (`siteId → ''`) पर **पुनः सौंपता है** बजाय उन्हें हटाने के, ताकि साइट हटाने पर कस्टम डोमेन बचा रहे।
3. `sites` पंक्ति हटाई जाती है और Caddy रूट्स फिर से सिंक होते हैं (सर्वोत्तम-प्रयास)।

### B1Admin सतह

| क्षमता | कहाँ | तंत्र |
|-----------|-----------|-----------|
| साइट स्विचर | `useSiteSelection` + `SiteSwitcher` (खाली = "Main Website") | एक `?site=` URL param पढ़ता है और ContentApi कॉल्स में `?siteId=` के रूप में थ्रेड करता है। तीन Site **सूची** क्षेत्रों -- **Pages**, **Blocks**, **Appearance** -- पर मौजूद, लेकिन पृष्ठ/ब्लॉक संपादकों पर नहीं, जो `siteId` रिकॉर्ड पर रखते हैं |
| Sites बनाना/हटाना | `SitesDialog`, स्विचर की "Manage websites…" प्रविष्टि से खुलता है | `POST /membership/sites` / `DELETE /membership/sites/:id` (नाम + subDomain)। membership Settings→Edit अनुमति पर गेट (सर्वर पर `Permissions.settings.edit`; B1Admin में `Permissions.membershipApi.settings.edit`)। **केवल बनाना/हटाना -- v1 में नाम बदलने का UI नहीं है** |
| प्रति-डोमेन साइट असाइनमेंट | Settings→Domains के अंतर्गत `DomainSettingsEdit` | प्रति-पंक्ति साइट ड्रॉपडाउन हर डोमेन के लिए `siteId` को `/membership/domains` पर पोस्ट करता है। यदि API कोई साइट नहीं लौटाता (पुराना backend) तो कॉलम छिप जाता है |
| Copy-on-write styles | `StylesManager.prepareForSave` | जब लोड की गई global-style पंक्ति का `siteId` चुनी गई साइट से मेल नहीं खाता (यानी API ने विरासत में मिला प्राथमिक fallback के रूप में लौटाया), तो यह प्राथमिक का `id` हटाता है और वर्तमान `siteId` अंकित करता है, प्राथमिक को overwrite करने के बजाय एक नई साइट-विशिष्ट पंक्ति का **insert** बाध्य करता है। वही mismatch-पर-fork साइट फ़ुटर ब्लॉक पर लागू होता है |

:::info
**v1 में क्या चर्च-व्यापी रहता है (एक जानबूझकर scoping विकल्प, डेटा मॉडल सीमा नहीं):** **ब्लॉग** (`BlogPage` का कोई स्विचर नहीं है और `/posts` बिना `siteId` के लोड करता है), **साइट विजेट** (announcement banner + launcher), **रीडायरेक्ट**, **लोगो / GA4 / चर्च सेटिंग्स**, और **सदस्य पोर्टल** (B1App mobile)। ध्यान दें कि यह "पूरा Appearance" नहीं है -- एक द्वितीयक साइट की global styles (palette, fonts, typography, spacing, nav, custom CSS) ऊपर के copy-on-write पथ के माध्यम से **प्रति-साइट** हैं; केवल Appearance पृष्ठ के banner/launcher/redirects/logo उप-पैनल चर्च-व्यापी रहते हैं।
:::

## कस्टम डोमेन: Caddy किनारा (स्टेटिक-कॉन्फ़िग योजना)

:::info
**दिशा 2026-07-02 को संशोधित।** कस्टम-डोमेन होस्टिंग को Vercel-प्रबंधित डोमेन पर ले जाने की पहले की योजना **रद्द** की गई, और सभी Vercel डोमेन-पंजीकरण कोड (`VercelHelper`, इसके `vercelToken`/`vercelProjectId`/`vercelTeamId` पर्यावरण चर, SSM params, और health प्रविष्टियाँ) API से हटा दिए गए। EC2 पर स्व-प्रबंधित **Caddy प्रॉक्सी रहती है** स्थायी कस्टम-डोमेन किनारे के रूप में। केवल शेष काम आंतरिक है: Caddy के *रनटाइम* admin-API कॉन्फ़िगरेशन को एक *स्टेटिक* कॉन्फ़िग से बदलना जो रीस्टार्ट के बाद भी बचा रहे।
:::

### किनारा

हर कस्टम चर्च डोमेन DNS को एक EC2 बॉक्स की ओर इंगित करता है -- `3.23.251.61`, जिसे `proxy.b1.church` के रूप में भी पहुँचा जा सकता है। B1Admin की Settings→Domains स्क्रीन चर्चों को एक apex `A → 3.23.251.61` या एक `CNAME → proxy.b1.church` जोड़ने का निर्देश देती है। Caddy प्रति-डोमेन Let's Encrypt सर्टिफ़िकेट के साथ TLS समाप्त करता है, `Host` header को डोमेन के `{sub}.b1.church` upstream पर फिर से लिखता है, और B1App को प्रॉक्सी करता है -- जो फिर इसे किसी भी मूल सबडोमेन की तरह होस्ट लेबल से रूट करता है (ऊपर [कस्टम डोमेन](#custom-domains) देखें)।

upstream मैपिंग `DomainRepo.loadPairs` से आती है, जिसका dial **असाइन की गई साइट के सबडोमेन को COALESCE करता है** ताकि एक डोमेन सही *द्वितीयक* साइट को प्रॉक्सी करे, चर्च के प्राथमिक पर वापस गिरते हुए:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` पंक्तियाँ मैप से बाहर रखी जाती हैं; Caddy `www.{host}` को एक `302` रीडायरेक्ट के माध्यम से apex पर परोसता है।

### किनारे को फ़ीड करने वाले दो गुमनाम endpoints

`DomainController` दो अप्रमाणित, केवल-पढ़ने योग्य endpoints देता है जिन्हें बॉक्स सीधे उपभोग करता है -- गुमनाम इसलिए कि किनारा किसी भी चर्च संदर्भ के मौजूद होने से पहले उन्हें क्वेरी करता है:

| Endpoint | लौटाता है | भूमिका |
|----------|----------|------|
| `GET /membership/domains/authorize?domain=` | `200` यदि डोमेन -- या, `www.` मिस के लिए, उसका बिना-www apex -- `domains` में मौजूद है; अन्यथा `404` (खाली `domain` सहित) | Caddy का **on-demand-TLS `ask`**: आने वाले SNI के लिए सर्टिफ़िकेट जारी करना है या नहीं, यह तय करने वाला दुरुपयोग नियंत्रण |
| `GET /membership/domains/hostmap` | `text/plain`, प्रति routable डोमेन एक क्रमबद्ध `{domain} {sub}.b1.church` पंक्ति | होस्ट→upstream मैप फ़ाइल जिसे बॉक्स टाइमर पर रिफ़्रेश करता है |

`authorize` `DomainRepo.loadByName` को पुन: उपयोग करता है (सटीक होस्ट, फिर एक एकल `www.`→apex retry); `hostmap` `loadPairs` को पुन: उपयोग करता है -- इसलिए यह साइट-जागरूक और `www.*`-बहिष्कृत है, प्रॉक्सी रूट्स के समान -- और बस `:443` suffix हटाता है।

### डोमेन save/delete -- एक सर्वोत्तम-प्रयास push

`DomainController.save` `domains` पंक्तियाँ लिखता है और फिर एक **सर्वोत्तम-प्रयास** `CaddyHelper.updateCaddy()` कॉल करता है, एक `try/catch` में लिपटा जो लॉग करता है (`console.error`) और निगल लेता है; `delete` भी यही करता है (जो एक पुराने stale-route-on-delete बग को भी ठीक करता है), जैसा कि द्वितीयक-साइट हटाना (`SiteController.delete`) करता है। `updateCaddy` स्वयं एक **10s** Axios timeout से बँधा है, इसलिए एक अप्राप्य या रुका हुआ Caddy कभी डोमेन save को `500` नहीं कर सकता -- `domains` तालिका सत्य का स्रोत है।

### वर्तमान स्थिति -- स्टेटिक कॉन्फ़िग, कोई रनटाइम स्थिति नहीं

बॉक्स (स्थायी Elastic IP के पीछे एक Windows EC2) एक **स्टेटिक Caddyfile** से Caddy चलाता है: on-demand TLS जिसका `ask` `/membership/domains/authorize` की ओर इंगित करता है, साथ में एक होस्ट→upstream मैप फ़ाइल जो हर 5 मिनट में `/membership/domains/hostmap` से एक शेड्यूल्ड टास्क द्वारा रिफ़्रेश होती है, जो एक graceful `caddy reload` पर समाप्त होता है। कॉन्फ़िग शून्य रनटाइम स्थिति के साथ रीस्टार्ट से बचता है -- कोई री-प्राइमिंग नाच नहीं -- और एक अज्ञात SNI **TLS-refused** होता है (उस होस्ट के लिए कोई सर्टिफ़िकेट नहीं ढाला जाता जिसे `authorize` अस्वीकार करता है), जबकि एक authorized-लेकिन-अभी-मैप-नहीं होस्ट (sync विंडो के भीतर एक बिल्कुल नया डोमेन) एक साफ़ 404 पाता है। नए डोमेन एक save के ~5 मिनट के भीतर routable हो जाते हैं; उनके सर्टिफ़िकेट पहली hit पर ढाले जाते हैं। बिल्ड/सेटअप, संचालन, और फ़ील्ड-परीक्षित समस्याएँ: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy.md)।

### लेगेसी रनटाइम push -- रोलबैक पथ, हटाने के लिए लंबित

`CaddyHelper` (membership मॉड्यूल) अब भी Caddy को उसके **admin API** के माध्यम से `caddyHost:caddyPort` पर चला सकता है (SSM `caddyHost`/`caddyPort`; सेट न होने पर no-op; `ServerHealthController` के Integrations समूह के अंतर्गत दिखाया गया): `updateCaddy()` एक पूर्ण routes सरणी PATCH करता है, और `initializeCaddy()` + `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` endpoints एक रनटाइम-कॉन्फ़िगर सर्वर को शुरू से फिर बनाते हैं। उस मोड का कॉन्फ़िग केवल Caddy की मेमोरी में रहता था -- वह restart-amnesia जिसे यह आर्किटेक्चर बदलता है। मशीनरी केवल रोलबैक पथ के रूप में बची है और स्थिर बॉक्स के कुछ समय तक स्थिर रहने के बाद हटाने के लिए शेड्यूल है; domain save/delete पर सर्वोत्तम-प्रयास `updateCaddy()` push स्थिर बॉक्स पर एक हानिरहित no-op है (इसका admin API केवल localhost है)।

## संबंधित पृष्ठ

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy.md) -- स्वयं किनारा बॉक्स: नए बॉक्स का सेटअप, WinSW सेवा, मैप सिंक टास्क, और परिचालन समस्याएँ
- [Website Builder](./website-builder.md) -- पृष्ठ/section/element tree, renderers, ब्लॉग, SEO, और AI जेनरेशन (अनुरोध चर्च/साइट पर हल होने के बाद क्या रेंडर होता है)
- [Content Endpoints](../api/endpoints/content.md) -- pages, blocks, links, और global styles के लिए REST सतह, अब सभी `?siteId=`-जागरूक
- [B1App](../web-apps/b1-app.md) -- Next.js ऐप जो middleware और `[sdSlug]` रूटिंग होस्ट करता है
- [Web App Deployment](../deployment/web-apps.md) -- B1App Vercel पर कैसे डिप्लॉय होता है
