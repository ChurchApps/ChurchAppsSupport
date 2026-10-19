---
title: "वेबसाइट रूटिंग और मल्टी-साइट"
---

# वेबसाइट रूटिंग और मल्टी-साइट

<div class="article-intro">

अब एक ही चर्च एक से अधिक अलग-अलग वेबसाइटें चला सकता है, और हर एक `*.b1.church` subdomain पर या पूरी तरह से कस्टम, चर्च के अपने domain पर रह सकती है। यह पेज उस routing layer को समझाता है जो builder *के नीचे* काम करती है: कोई आने वाला request किसी चर्च **और** किसी विशेष site से कैसे resolve होता है, multi-site data model (`siteId` sentinel, जो हर पहले से मौजूद site को अपरिवर्तित रूप से render करता रहता है), और custom-domain edge — EC2 पर एक self-managed Caddy proxy जो TLS terminate करता है और हर चर्च domain को उसके `*.b1.church` upstream पर rewrite करता है। request resolve होने के बाद वास्तव में क्या render होता है — page/section/element tree — इसके लिए [Website Builder](./website-builder) देखें।

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

इस layer में तीन नियम लागू होते हैं:

1. **एक sentinel सब कुछ backward compatible रखता है।** `siteId = ''` primary site है। इस feature से पहले मौजूद हर page, block, link, global-style और domain row में `''` होता है और वह पहले की तरह ही render होता है। *दूसरी* वेबसाइट बस non-empty `siteId` वाली rows का एक समूह है, और `?siteId=` के बिना कॉल किया गया कोई भी content endpoint primary site लौटाता है — बिल्कुल पुराने request जैसा।
2. **Resolution host-label पर आधारित है और एक ही बिंदु पर मिलती है।** `*.b1.church` subdomain सीधे अपने host label से route होता है; custom domain को B1App तक पहुंचने से पहले Caddy edge पर उसके `{sub}.b1.church` label में rewrite किया जाता है (किसी raw custom `Host` के लिए fallback के रूप में एक middleware DB lookup `x-site` header सेट करता है)। दोनों रास्ते एक ही `[sdSlug]` route और एक ही `churches/lookup` call पर पहुंचते हैं, इसलिए आगे का rendering समान रहता है।
3. **Caddy edge एक ही प्रामाणिक स्रोत (source of truth) पर निर्भर एक stateless परत है।** Custom domains EC2 पर एक self-managed Caddy proxy पर terminate होते हैं, जो हर domain को उसके `{sub}.b1.church` upstream पर rewrite करता है। domain save पर एक single best-effort `CaddyHelper.updateCaddy()` चलता है, और Caddy `domains` table को सीधे भी पढ़ता है (नीचे दिए `authorize` और `hostmap` endpoints)। table ही प्रामाणिक है — एक unreachable Caddy कभी भी save को fail नहीं कर सकता।

## साइट resolution

### `*.b1.church` subdomains

`B1App/next.config.mjs` host के आधार पर आने वाले requests को rewrite करता है। `(?<subdomain>.*?)\..*` pattern वाला host rule host का **पहला label** capture करता है और `/` व `/:path*` को `/{subdomain}` में rewrite करता है — यानी `[sdSlug]` App-Router segment में। तो `grace.b1.church/about`, `/grace/about` बन जाता है।

`src/app/[sdSlug]/` के अंदर, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` कॉल करता है। `ChurchController.getBySubDomain` response की अब दो शाखाएं हैं:

| Slug किससे match होता है | Response | अर्थ |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | उस चर्च की primary site |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | एक **secondary site** — controller `sites` पर fallback करता है, मालिक चर्च resolve करता है, और पूछे गए slug के साथ अतिरिक्त `siteId` लौटाता है |

वही अतिरिक्त `siteId` ही secondary-site request को primary से अलग करने वाली एकमात्र चीज़ है; बाकी pipeline में सब कुछ साझा है।

जो slug न `churches` से match करे न `sites` से, वह `200` के साथ `{}` लौटाता है। `ConfigHelper.load` बिना `id` वाले response को अज्ञात site मानता है और Next का `notFound()` कॉल करता है, ताकि अज्ञात subdomain को बाद की हर कॉल में `/…/undefined` पूछने के बजाय सच्चा 404 मिले। builder-page route भी `pageTreePath()` (`src/helpers/pageTreePath.ts`) से अपना tree path बनाता है, जो slug को URL-encode करता है, ताकि गलत format वाला slug (backslashes, spaces) API के `400` को 500 के रूप में दिखाने के बजाय 404 दे।

### Custom domains

एक चर्च का अपना domain **Caddy edge** (जिसका विवरण नीचे है) पर terminate होता है, जो B1App को proxy करने से पहले `Host` header को site के `{sub}.b1.church` में rewrite करता है। तो सामान्य रास्ते पर B1App एक *internal* `*.b1.church` host प्राप्त करता है और उसे ठीक वैसे ही host label से resolve करता है जैसे किसी native subdomain को। middleware की DB lookup कभी fire नहीं होती। `src/middleware.ts` फिर भी हर request पर चलता है, लेकिन उसके पास एक हमेशा-चालू काम और एक fallback है:

1. **हमेशा** — यह **किसी भी client-supplied `x-site` header को delete कर देता है**। वह header spoofable rewrite input है और केवल तभी भरोसा किया जाता है जब middleware स्वयं उसे सेट करे; उसे strip करना ही Caddy के पीछे middleware का असली काम है।
2. **Fallback, केवल non-internal `Host` के लिए** — किसी raw custom-domain `Host` के लिए, जो Caddy के rewrite के *बिना* B1App तक पहुंचता है, यह `GET /membership/domains/public/lookup/{host}` कॉल करता है और यदि उससे `subDomain` मिलता है, तो `x-site: {subDomain}.b1.church` सेट करता है। Caddy के पीछे यह शाखा निष्क्रिय रहती है क्योंकि `Host` पहले से `*.b1.church` है।

Internal hosts — `localhost`, `b1.church`, और suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — lookup को पूरी तरह skip करते हैं (वे पहले ही host-label rewrite से resolve हो चुके हैं, या preview/deploy hosts हैं)।

Lookup स्वयं (`DomainRepo.loadByName`) `domains → churches` और `domains → sites` को left-join करता है और `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` लौटाता है — यदि domain किसी secondary site की ओर इशारा करता है तो उस assigned site का subdomain, अन्यथा चर्च का। यह पहले exact host से match करता है; यदि वह host `www.` से शुरू होता था और miss हुआ, तो यह bare apex पर **एक बार** retry करता है।

`next.config.mjs` में, `x-site` rewrite rules generic host rules से **पहले** रखे जाते हैं, इसलिए वे जीतते हैं। `x-site: grace.b1.church` → पहला label `grace` → `[sdSlug] = grace`, और उसके बाद resolution subdomain वाले रास्ते जैसा ही है (वही `churches/lookup`, वही `siteId`)।

:::info
बाहर से `x-site` header पर भरोसा नहीं किया जाता। middleware अपना header सेट करने से पहले आने वाले हर `x-site` को बिना शर्त हटा देता है, और rewrite rules केवल middleware द्वारा सेट किए गए मान को देखते हैं — कोई client header भेजकर स्वयं को किसी दूसरे चर्च की सामग्री पर थोप नहीं सकता।
:::

Middleware के बारे में दो operational विवरण:

- **Cache।** हर host का परिणाम (hit *या* पुष्ट miss — network error कभी नहीं) प्रति serverless isolate, एक in-memory `Map` में **10 मिनट** के लिए cache होता है।
- **Matcher।** matcher जानबूझकर `/sitemap.xml`, `/robots.txt`, और `/manifest.webmanifest` को फिर से शामिल करता है। इसका पहला pattern dotted paths को बाहर करता है, जो अन्यथा इन files को हटा देता; इन्हें वापस जोड़ा जाता है ताकि custom domain की per-church SEO/PWA files को भी `x-site` header मिले।
- **Canonical header।** चर्च pages के लिए middleware एक `Link: <{proto}://{host}{path}>; rel="canonical"` response header जोड़ता है, जो उस host का नाम बताता है जहां से page वास्तव में serve हुआ — subdomain या custom domain (`helpers/canonicalLink.ts`)। यह non-church hosts (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) और `/mobile`, `/login`, `/logout`, तथा generated robots/sitemap/manifest files पर skip होता है।

### सार्वजनिक वेबसाइट बंद होना

एक चर्च B1Admin में **Disable Public Website** चालू कर सकता है (चर्च-स्तरीय content setting `hidePublicSite = "true"`)। फिर site केवल अपने member-facing routes serve करती है:

- **B1App middleware** subdomain को lookup करता है (`/membership/churches/lookup` फिर `/content/settings/public/:churchId`) और allowlist से बाहर किसी भी path के लिए गुमनाम requests को `/login?returnUrl={path}{query}` पर redirect करता है। allowlist (`helpers/publicSite.ts`) है `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, और manifest/robots/sitemap files। केवल पुष्ट उत्तर cache होते हैं (production में 60 सेकंड, क्योंकि admin का revalidate call इस per-instance map को clear नहीं कर सकता; dev/test में uncached)। एक API error site को serve करता है, सभी को बाहर नहीं रखता।
- **Signed-in members पूरी site देखते हैं।** एक unexpired `jwt` cookie वाला request (middleware का `hasSession()` payload का `exp` decode करता है बिना signature verify किए — यह एक soft gate है, access control नहीं) redirect को skip करता है, इसलिए login के बाद member उसी page पर लौटता है जो उसने मांगा था और सामान्य pages, built-in pages (Groups, Sermons, आदि) और header navigation देखता है। Page components और `Header` अब स्वयं `hidePublicSite` की जांच नहीं करते।
- **`robots.txt`** सब कुछ disallow करता है, जैसा noindex hosts पर होता है।
- **API।** `GET /content/pages/public/:churchId` (sitemap की page list) `[]` लौटाता है, ताकि गुमनाम callers pages की सूची न निकाल सकें।

### `siteId` threading

`ConfigHelper` resolve हुआ `siteId` अपने per-request `ConfigurationInterface` पर रखता है (React `cache()` से memoized) और उन content calls में `?siteId=` जोड़ता है जो वह और page components करते हैं — **शर्तिया**: खाली `siteId` (primary-church subdomain) पैरामीटर को पूरी तरह छोड़ देता है। threaded endpoints हैं page tree (`/content/pages/:id/tree`), sitemap द्वारा उपयोग की जाने वाली public page list (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), nav links (`/content/links/church/:id`), और अलग से footer block (`/content/blocks/public/footer/:id`)। सामान्य render path पर footer page tree के भीतर आता है (`zone: "siteFooter"` वाले sections), जो पहले से `siteId` के साथ fetch होता है, इसलिए कोई बिना-scope वाला footer gap नहीं है।

Member portal (B1App `mobile`) जानबूझकर इससे बाहर है: `loadChurchAppearance.ts` `churches/lookup` से चर्च resolve करता है लेकिन चर्च-स्तरीय `/settings/public/{id}` पढ़ता है और `siteId` कभी thread नहीं करता — portal v1 में पूरे चर्च के लिए है (नीचे देखें)।

## प्रति चर्च कई वेबसाइटें

### Data model

नई `membership.sites` table जानबूझकर बहुत छोटी है:

| Column | Type | टिप्पणी |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | मालिक चर्च |
| `name` | `varchar(255)` | प्रदर्शित नाम (जैसे "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** — वैश्विक namespace (नीचे) |

Site scoping फिर content और domain tables में जुड़े एक single nullable-free column से होती है:

| Table (module) | Column | `''` का अर्थ |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain primary site serve करता है |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primary site — और **`blocks`** पर, `''` का अर्थ अतिरिक्त रूप से *सभी sites में साझा* भी है |

दो migrations यह सब जोड़ते हैं (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`)। चूंकि column का default `''` है, हर मौजूदा row आज के व्यवहार को बिना backfill के बनाए रखती है।

**Global subdomain namespace।** `sites.subDomain`, `churches.subDomain` के साथ *एक* namespace साझा करता है — site subdomain कभी किसी चर्च subdomain या किसी दूसरी site से टकरा नहीं सकता। यह **दोनों** save paths पर लागू होता है: `SiteController.save` ऐसे slug को reject करता है जो `churches` या `sites` में से किसी से match करे, और `ChurchController.validateSave` उल्टी दिशा में वही करता है। `sites.subDomain` पर एक unique index database स्तर पर इसकी गारंटी देता है।

**Pages uniqueness** `(churchId, url)` से बढ़ाकर `(churchId, siteId, url)` किया गया, ताकि एक चर्च की दो sites में से हर एक अपना `/about` रख सके।

### प्रति-site content, fallbacks के साथ

हर site-scoped content **list/tree** endpoint एक वैकल्पिक `?siteId=` लेता है (अनुपस्थित ⇒ `''` = primary): pages tree / list / public, blocks list / by-type / footer, links (anon / filtered / all), और global styles। Sections और elements सीधे scope नहीं होते — वे अपने parent page या block के माध्यम से विरासत में पाते हैं।

दो resolution chains दिलचस्प काम करते हैं:

- **Global styles — `site → primary → default`।** `GlobalStyleRepo.loadForChurch(churchId, siteId)` site की अपनी row लौटाता है; यदि secondary site के पास कोई नहीं है, तो यह **primary (`''`) row को जैसी है वैसी** लौटाता है (primary का `id`/`siteId` रखते हुए, जिसे client copy-on-write के लिए उपयोग करता है); और यदि primary भी नहीं है, तो `GlobalStyleController` एक hard-coded default palette/fonts लौटाता है।
- **Footer block — site-specific जीतता है, shared fallback करता है।** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` shared (`''`) *और* site-specific rows दोनों लौटाता है; resolver site का अपना footer चुनता है यदि मौजूद हो, अन्यथा shared। यही logic `TreeHelper.insertBlocks` (page tree) और अलग `/content/blocks/public/footer/:churchId` endpoint दोनों में चलता है।

### Site deletion cascade

`SiteController.delete` (membership Settings→Edit permission पर gated) एक secondary site को तीन चरणों में हटाता है:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` site की मालिक सारी content को cascade करता है: उसके **pages** → उनके sections, elements, `pageHistory`, और `posts`; उसके अपने **blocks** → उनके sections, elements, और `pageHistory`; उसके **links** और **globalStyles**। एक guard `''` के लिए चलने से इनकार करता है — primary/shared sentinel को कभी cascade नहीं किया जाता।
2. `DomainRepo.clearSiteId` site के domains को delete करने के बजाय primary (`siteId → ''`) को **पुनः assign** करता है, ताकि site हटाने पर भी custom domain बचा रहे।
3. `sites` row delete होती है और Caddy routes फिर से sync होते हैं (best-effort)।

### B1Admin सतह

| क्षमता | कहां | तंत्र |
|-----------|-------|-----------|
| Site switcher | `useSiteSelection` + `SiteSwitcher` (खाली = "Main Website") | एक `?site=` URL param पढ़ता है और उसे ContentApi calls में `?siteId=` के रूप में thread करता है। तीन Site **list** क्षेत्रों पर उपलब्ध — **Pages**, **Blocks**, **Appearance** — लेकिन page/block editors पर नहीं, जो `siteId` record पर ही रखते हैं |
| Sites create/delete | `SitesDialog`, switcher की "Manage websites…" entry से खुलता है | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain)। membership Settings→Edit permission पर gated (server-side `Permissions.settings.edit`; B1Admin में `Permissions.membershipApi.settings.edit`)। **केवल create/delete — v1 में rename UI नहीं है** |
| प्रति-domain site assignment | Settings→Domains के अंतर्गत `DomainSettingsEdit` | हर row का site dropdown प्रति domain `siteId` को `/membership/domains` पर भेजता है। यदि API कोई sites नहीं लौटाता (पुराना backend) तो column छिप जाता है |
| Copy-on-write styles | `StylesManager.prepareForSave` | जब लोड हुई global-style row का `siteId` चुनी गई site से match नहीं करता (यानी API ने fallback के रूप में inherited primary लौटाया), तो यह primary का `id` हटा देता है और वर्तमान `siteId` लगाता है, जिससे primary को overwrite करने के बजाय नई site-specific row का **insert** होता है। यही mismatch-पर-fork logic site footer block पर भी लागू होता है |

:::info
**v1 में चर्च-व्यापी क्या रहता है (एक जानबूझकर scoping निर्णय, data-model की सीमा नहीं):** **blog** (`BlogPage` में कोई switcher नहीं है और वह `siteId` के बिना `/posts` लोड करता है), **site widgets** (announcement banner + launcher), **redirects**, **logo / GA4 / church settings**, और **member portal** (B1App mobile)। ध्यान दें कि यह "पूरा Appearance" नहीं है — secondary site की global styles (palette, fonts, typography, spacing, nav, custom CSS) ऊपर वाले copy-on-write रास्ते से **प्रति-site** हैं; केवल Appearance पेज के banner/launcher/redirects/logo sub-panels चर्च-व्यापी रहते हैं।
:::

## Custom domains: Caddy edge (static-config plan)

:::info
**दिशा 2026-07-02 को संशोधित।** custom-domain hosting को Vercel-managed domains पर ले जाने की पहले की योजना **रद्द** कर दी गई थी, और सभी Vercel domain-registration code (`VercelHelper`, उसके `vercelToken`/`vercelProjectId`/`vercelTeamId` env vars, SSM params, और health entries) Api से हटा दिए गए थे। EC2 पर self-managed **Caddy proxy स्थायी custom-domain edge के रूप में रहता है**। केवल शेष काम आंतरिक है: Caddy की *runtime* admin-API configuration को एक *static* config से बदलना जो restarts के बाद भी बची रहे।
:::

### Edge

हर custom church domain DNS में एक EC2 box की ओर इशारा करता है — `3.23.251.61`, जो `proxy.b1.church` के रूप में भी पहुंचा जा सकता है। B1Admin की Settings→Domains स्क्रीन चर्चों को निर्देश देती है कि apex `A → 3.23.251.61` या `CNAME → proxy.b1.church` जोड़ें। Caddy एक per-domain Let's Encrypt cert से TLS terminate करता है, domain के `{sub}.b1.church` upstream पर `Host` header rewrite करता है, और B1App को reverse-proxy करता है — जो फिर उसे किसी भी native subdomain की तरह host label से route करता है (ऊपर [Custom domains](#custom-domains) देखें)।

Upstream mapping `DomainRepo.loadPairs` से आता है, जिसका dial **assigned site के subdomain को COALESCE** करता है, ताकि एक domain सही *secondary* site को proxy करे, और primary चर्च पर fallback करे:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` rows map से बाहर रखी जाती हैं; Caddy `www.{host}` को apex की ओर `302` redirect से serve करता है।

### Edge को फीड करने वाले दो गुमनाम endpoints

`DomainController` दो unauthenticated, read-only endpoints expose करता है जिन्हें box सीधे उपयोग करता है — गुमनाम इसलिए क्योंकि edge किसी चर्च context के मौजूद होने से पहले ही उन्हें query करता है:

| Endpoint | लौटाता है | भूमिका |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` यदि domain — या, `www.` miss के लिए, उसका bare apex — `domains` में मौजूद है; अन्यथा `404` (खाली `domain` सहित) | Caddy का **on-demand-TLS `ask`**: दुरुपयोग नियंत्रण, यह तय करना कि आने वाले SNI के लिए cert जारी करना है या नहीं |
| `GET /membership/domains/hostmap` | `text/plain`, हर routable domain के लिए एक sorted `{domain} {sub}.b1.church` line | host→upstream map file जिसे box एक timer पर refresh करता है |

`authorize` `DomainRepo.loadByName` को पुनः उपयोग करता है (exact host, फिर एक `www.`→apex retry); `hostmap` `loadPairs` को पुनः उपयोग करता है — इसलिए यह site-aware और `www.*`-excluded है, proxy routes के समान — और केवल `:443` suffix हटाता है।

### Domain save/delete — एक best-effort push

`DomainController.save` `domains` rows लिखता है और फिर एक **single best-effort** `CaddyHelper.updateCaddy()` call करता है, जो एक `try/catch` में लिपटा होता है जो log करता (`console.error`) और निगल जाता है; `delete` भी यही करता है (जिससे पहले का stale-route-on-delete bug भी ठीक हुआ), जैसे secondary-site deletion (`SiteController.delete`) करता है। `updateCaddy` स्वयं एक **10s** Axios timeout से बंधा है, इसलिए एक unreachable या बंद Caddy कभी domain save को `500` नहीं कर सकता — `domains` table ही source of truth है।

### वर्तमान स्थिति — static config, कोई runtime state नहीं

Box (स्थायी Elastic IP के पीछे Windows EC2) एक **static Caddyfile** से Caddy चलाता है: on-demand TLS जिसका `ask` `/membership/domains/authorize` की ओर इशारा करता है, साथ में एक host→upstream map file जो हर 5 मिनट में `/membership/domains/hostmap` से एक scheduled task द्वारा refresh होती है, जो graceful `caddy reload` पर समाप्त होता है। Config restarts के बाद भी बचा रहता है और शून्य runtime state है — कोई re-priming नहीं — और एक अज्ञात SNI **TLS-refused** होता है (ऐसे host के लिए कोई cert नहीं बनता जिसे `authorize` reject करे), जबकि एक authorized-but-not-yet-mapped host (sync window के अंदर नया domain) को साफ 404 मिलता है। नए domains एक save के लगभग 5 मिनट के भीतर routable हो जाते हैं; उनके certificates पहली hit पर बनते हैं। Build/setup, operations, और field-tested gotchas: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy)।

### Legacy runtime push — rollback path, deletion के लिए लंबित

`CaddyHelper` (membership module) अभी भी Caddy को अपनी **admin API** के माध्यम से `caddyHost:caddyPort` पर चला सकता है (SSM `caddyHost`/`caddyPort`; सेट न होने पर no-op; `ServerHealthController` के Integrations group के अंतर्गत दिखता है): `updateCaddy()` एक पूरा routes array PATCH करता है, और `initializeCaddy()` + `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` endpoints runtime-configured server को शुरू से बनाते हैं। उस mode की config केवल Caddy की memory में रहती थी — वही restart-amnesia जिसे यह architecture बदल रही है। यह machinery केवल rollback path के रूप में बची है और static box के स्थिर होने के बाद हटाने के लिए तय है; domain save/delete पर best-effort `updateCaddy()` push static box पर एक हानिरहित no-op है (इसकी admin API केवल localhost पर है)।

## संबंधित पेज

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — edge box स्वयं: नए box का setup, WinSW service, map sync task, और operational gotchas
- [Website Builder](./website-builder) — page/section/element tree, renderers, blog, SEO, और AI generation (जो रेंडर होता है जब request किसी चर्च/site पर resolve हो जाता है)
- [Content Endpoints](../api/endpoints/content) — pages, blocks, links, और global styles के लिए REST surface, जो अब सभी `?siteId=`-aware हैं
- [B1App](../web-apps/b1-app) — Next.js app जो middleware और `[sdSlug]` routing होस्ट करता है
- [Web App Deployment](../deployment/web-apps) — B1App को Vercel पर कैसे deploy किया जाता है
