---
title: "Website Routing & Multi-Site"
---

# Website Routing & Multi-Site

<div class="article-intro">

एक ही चर्च अब एक से ज़्यादा अलग-अलग वेबसाइट सर्व कर सकता है, और हर एक या तो एक `*.b1.church` subdomain पर या पूरी तरह custom, चर्च-मालिकाना domain पर रह सकती है। यह पृष्ठ उस routing लेयर को मैप करता है जो builder के *नीचे* बैठती है: कैसे एक incoming रिक्वेस्ट किसी चर्च **और** किसी specific साइट को resolve करती है, multi-site डेटा मॉडल (वह `siteId` sentinel जो हर पहले से मौजूद साइट को unchanged रेंडर होते रहने देता है), और custom-domain edge — EC2 पर एक self-managed Caddy proxy जो TLS terminate करता है और हर चर्च domain को उसके `*.b1.church` upstream पर rewrite करता है। रिक्वेस्ट resolve हो जाने के बाद वास्तव में क्या रेंडर होता है — page/section/element tree — इसके लिए देखें [Website Builder](./website-builder)।

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

इस लेयर में तीन नियम लागू होते हैं:

1. **एक sentinel सब कुछ को backward compatible रखता है।** `siteId = ''` primary साइट है। हर page, block, link, global-style, और domain row जो इस फ़ीचर से पहले मौजूद थी `''` carry करती है और बिल्कुल पहले जैसी रेंडर होती है। एक *दूसरी* वेबसाइट बस एक non-empty `siteId` वाली rows का एक सेट है, और `?siteId=` के बिना कॉल किया गया कोई भी content endpoint primary साइट लौटाता है — byte-for-byte वही पुरानी रिक्वेस्ट।
2. **Resolution host-label-based है और converge करती है।** एक `*.b1.church` subdomain सीधे अपने host label से route करता है; एक custom domain B1App के देखने से पहले Caddy edge पर उसके `{sub}.b1.church` label में rewrite हो जाता है (एक middleware DB lookup के साथ जो किसी भी raw custom `Host` के लिए fallback के रूप में एक `x-site` header stamp करता है)। दोनों रास्ते उसी `[sdSlug]` route और उसी `churches/lookup` कॉल पर पहुँचते हैं, इसलिए downstream rendering identical है।
3. **Caddy edge एक ही सत्य के स्रोत पर stateless है।** Custom domains EC2 पर एक self-managed Caddy proxy पर terminate होते हैं जो हर domain को उसके `{sub}.b1.church` upstream पर rewrite करता है। एक domain save एक ही best-effort `CaddyHelper.updateCaddy()` को fire करता है, और Caddy `domains` टेबल को भी सीधे पढ़ता है (नीचे दिए गए `authorize` और `hostmap` endpoints)। टेबल ही authoritative है — एक unreachable Caddy कभी किसी save को fail नहीं करा सकता।

## साइट resolution

### `*.b1.church` subdomains

`B1App/next.config.mjs` incoming रिक्वेस्ट को host से rewrite करता है। `(?<subdomain>.*?)\..*` pattern वाला एक host rule host का **पहला label** capture करता है और `/` तथा `/:path*` को `/{subdomain}` में rewrite करता है — यानी `[sdSlug]` App-Router segment। इसलिए `grace.b1.church/about` `/grace/about` बन जाता है।

`src/app/[sdSlug]/` के अंदर, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` कॉल करता है। `ChurchController.getBySubDomain` response में अब दो शाखाएँ हैं:

| Slug मैच करता है | Response | अर्थ |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | उस चर्च की primary साइट |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | एक **secondary साइट** — कंट्रोलर `sites` पर fallback करता है, मालिक चर्च को resolve करता है, और पूछे गए slug को अतिरिक्त `siteId` के साथ वापस भेजता है |

वह अतिरिक्त `siteId` ही एकमात्र चीज़ है जो एक secondary-site रिक्वेस्ट को primary से अलग करती है; बाकी pipeline में सब कुछ शेयर्ड है।

### Custom domains

एक चर्च-मालिकाना domain **Caddy edge** पर terminate होता है (नीचे विस्तार से), जो B1App को proxy करने से पहले `Host` header को साइट के `{sub}.b1.church` में rewrite कर देता है। इसलिए सामान्य पाथ पर B1App को एक *internal* `*.b1.church` host मिलता है और यह इसे बिल्कुल एक native subdomain की तरह host label से resolve करता है — middleware का DB lookup कभी नहीं चलता। `src/middleware.ts` फिर भी हर रिक्वेस्ट पर चलता है, लेकिन एक हमेशा-चालू काम और एक fallback के साथ:

1. **हमेशा** — यह किसी भी क्लाइंट-सप्लाई किए गए **`x-site` header को डिलीट कर देता है**। वह header spoofable rewrite इनपुट है और तभी भरोसेमंद है जब middleware खुद इसे सेट करे; इसे strip करना ही Caddy के पीछे middleware का असली काम है।
2. **Fallback, केवल non-internal `Host`** — एक raw custom-domain `Host` के लिए जो Caddy के rewrite के *बिना* B1App तक पहुँचता है, यह `GET /membership/domains/public/lookup/{host}` कॉल करता है और, यदि वह एक `subDomain` लौटाता है, `x-site: {subDomain}.b1.church` सेट करता है। Caddy के पीछे यह शाखा inert है क्योंकि `Host` पहले से ही `*.b1.church` है।

Internal hosts — `localhost`, `b1.church`, और suffixes `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — lookup को पूरी तरह skip कर देते हैं (वे पहले से host-label rewrite से resolved हैं, या preview/deploy hosts हैं)।

Lookup खुद (`DomainRepo.loadByName`) `domains → churches` और `domains → sites` को left-join करता है और `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` लौटाता है — यानी यदि domain किसी secondary साइट की ओर इशारा करता है तो उस assigned साइट का subdomain, अन्यथा चर्च का। यह पहले exact host को मैच करता है; यदि वह host `www.` से शुरू होता था और मैच नहीं हुआ, तो यह bare apex के विरुद्ध **एक बार** दोबारा कोशिश करता है।

वापस `next.config.mjs` में, `x-site` rewrite नियम generic host नियमों से **पहले** रखे गए हैं, ताकि वे जीतें। `x-site: grace.b1.church` → पहला label `grace` → `[sdSlug] = grace`, और वहाँ से resolution subdomain पाथ जैसा ही identical है (वही `churches/lookup`, वही `siteId`)।

:::info
`x-site` header बाहर से untrusted है। Middleware अपना खुद का सेट करने से पहले हमेशा किसी भी inbound `x-site` को strip करता है, और rewrite नियम केवल middleware-set वैल्यू ही कभी देखते हैं — एक क्लाइंट खुद को किसी header भेजकर किसी दूसरे चर्च के content पर force नहीं कर सकता।
:::

Middleware पर दो operational विवरण:

- **Cache।** हर host का परिणाम (एक hit *या* एक confirmed miss — कभी network error नहीं) प्रति serverless isolate एक in-memory `Map` में **10 मिनट** के लिए cache होता है।
- **Matcher।** Matcher जानबूझकर `/sitemap.xml`, `/robots.txt`, और `/manifest.webmanifest` को फिर से शामिल करता है। इसका पहला pattern dotted paths को exclude करता है, जो अन्यथा इन फ़ाइलों को गिरा देगा; इन्हें वापस जोड़ा गया है ताकि एक custom domain की प्रति-चर्च SEO/PWA फ़ाइलों को भी `x-site` header मिले।

### `siteId` threading

`ConfigHelper` resolved `siteId` को अपने per-request `ConfigurationInterface` पर स्टोर करता है (React `cache()` से memoized) और इसके तथा page components द्वारा किए गए content calls में `?siteId=` जोड़ता है — **सशर्त रूप से**: एक खाली `siteId` (एक primary-चर्च subdomain) पैरामीटर को पूरी तरह छोड़ देता है। Threaded endpoints हैं: page tree (`/content/pages/:id/tree`), sitemap द्वारा उपयोग की जाने वाली public page list (`/content/pages/public/:id`), global styles (`/content/globalStyles/church/:id`), nav links (`/content/links/church/:id`), और standalone footer block (`/content/blocks/public/footer/:id`)। सामान्य render पाथ पर footer page tree के अंदर आता है (`zone: "siteFooter"` से टैग किए गए sections), पहले से `siteId` के साथ fetched, इसलिए कोई un-scoped footer gap नहीं है।

Member पोर्टल (B1App `mobile`) जानबूझकर इससे बाहर रहता है: `loadChurchAppearance.ts` `churches/lookup` से चर्च resolve करता है लेकिन चर्च-स्तरीय `/settings/public/{id}` पढ़ता है और कभी `siteId` thread नहीं करता — पोर्टल v1 में चर्च-वाइड है (नीचे देखें)।

## प्रति चर्च कई वेबसाइट

### डेटा मॉडल

नया `membership.sites` टेबल जानबूझकर बहुत छोटा है:

| Column | Type | नोट्स |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | मालिक चर्च |
| `name` | `varchar(255)` | Display नाम (जैसे "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique इंडेक्स** — global namespace (नीचे) |

साइट scoping फिर content और domain टेबल में जोड़ा गया एक ही nullable-free column है:

| टेबल (मॉड्यूल) | Column | `''` का मतलब |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain primary साइट सर्व करता है |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primary साइट — और **`blocks`** पर, `''` का अतिरिक्त मतलब है *सभी साइटों में शेयर्ड* |

दो migrations यह सब जोड़ते हैं (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`)। चूँकि column डिफ़ॉल्ट `''` है, हर मौजूदा row बिना किसी backfill के आज जैसा ही व्यवहार रखती है।

**Global subdomain namespace।** `sites.subDomain` `churches.subDomain` के साथ *एक* namespace शेयर करता है — एक साइट subdomain कभी किसी चर्च subdomain या किसी दूसरी साइट से टकरा नहीं सकता। यह **दोनों** save paths पर लागू होता है: `SiteController.save` एक ऐसे slug को रिजेक्ट करता है जो `churches` या `sites` से टकराता हो, और `ChurchController.validateSave` उल्टा वही करता है। `sites.subDomain` पर एक unique index इसे डेटाबेस स्तर पर backup करता है।

**Pages की uniqueness** `(churchId, url)` से `(churchId, siteId, url)` तक widen की गई, ताकि एक चर्च की दो साइटें दोनों अपना खुद का `/about` रख सकें।

### प्रति-साइट content, fallbacks के साथ

हर साइट-scoped content **list/tree** endpoint एक वैकल्पिक `?siteId=` लेता है (अनुपस्थित ⇒ `''` = primary): pages tree / list / public, blocks list / by-type / footer, links (anon / filtered / all), और global styles। Sections और elements सीधे scoped *नहीं* हैं — वे अपने parent page या block से विरासत में मिलते हैं।

दो resolution chains दिलचस्प काम करती हैं:

- **Global styles — `site → primary → default`।** `GlobalStyleRepo.loadForChurch(churchId, siteId)` साइट की अपनी row लौटाता है; यदि एक secondary साइट के पास कोई नहीं है, यह **primary (`''`) row को जैसी है वैसी** लौटाता है (primary का `id`/`siteId` रखते हुए, जिसे क्लाइंट copy-on-write के लिए उपयोग करता है); यदि कोई primary भी नहीं है, `GlobalStyleController` एक hard-coded डिफ़ॉल्ट palette/fonts लौटाता है।
- **Footer block — साइट-specific जीतता है, shared fallback करता है।** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` shared (`''`) *और* site-specific दोनों rows लौटाता है; resolver साइट का अपना footer मौजूद होने पर उसे चुनता है, अन्यथा shared वाला। वही logic `TreeHelper.insertBlocks` (page tree) और standalone `/content/blocks/public/footer/:churchId` endpoint दोनों में चलता है।

### साइट deletion cascade

`SiteController.delete` (membership Settings→Edit अनुमति पर gated) एक secondary साइट को तीन steps में tear down करता है:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` साइट के मालिकाना सभी content को cascade करता है: उसके **pages** → उनके sections, elements, `pageHistory`, और `posts`; उसके खुद के **blocks** → उनके sections, elements, और `pageHistory`; उसके **links** और **globalStyles**। एक गार्ड `''` के लिए चलने से इनकार करता है — primary/shared sentinel कभी cascade नहीं होता।
2. `DomainRepo.clearSiteId` साइट के domains को डिलीट करने के बजाय वापस primary को **reassign** करता है (`siteId → ''`), ताकि एक custom domain एक साइट deletion से बच जाए।
3. `sites` row डिलीट हो जाती है और Caddy routes दोबारा sync होते हैं (best-effort)।

### B1Admin सतह

| क्षमता | कहाँ | तंत्र |
|-----------|-------|-------|
| Site switcher | `useSiteSelection` + `SiteSwitcher` (खाली = "Main Website") | एक `?site=` URL पैरामीटर पढ़ता है और इसे ContentApi calls में `?siteId=` के रूप में thread करता है। तीन Site **list** क्षेत्रों — **Pages**, **Blocks**, **Appearance** — पर मौजूद है, लेकिन page/block editors पर *नहीं*, जो रिकॉर्ड पर `siteId` carry करते हैं |
| Sites create/delete | `SitesDialog`, switcher की "Manage websites…" entry से खुला | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain)। Membership Settings→Edit अनुमति पर gated (सर्वर-साइड `Permissions.settings.edit`; B1Admin में `Permissions.membershipApi.settings.edit`)। **केवल Create/delete — v1 में कोई rename UI नहीं है** |
| प्रति-domain साइट असाइनमेंट | Settings→Domains के तहत `DomainSettingsEdit` | एक प्रति-row साइट dropdown प्रति domain `/membership/domains` पर `siteId` post करता है। यदि API कोई साइट नहीं लौटाती (पुराना backend) तो column छिप जाता है |
| Copy-on-write styles | `StylesManager.prepareForSave` | जब loaded global-style row का `siteId` चुनी गई साइट से मेल नहीं खाता (यानी API ने fallback के रूप में inherited primary लौटाई), यह primary की `id` गिरा देता है और वर्तमान `siteId` stamp करता है, primary को overwrite करने के बजाय एक नई साइट-specific row का **insert** मजबूर करते हुए। वही fork-on-mismatch साइट footer block पर भी लागू होता है |

:::info
**v1 में जो चर्च-वाइड रहता है (एक जानबूझकर scoping चुनाव, कोई डेटा-मॉडल सीमा नहीं):** **blog** (`BlogPage` के पास कोई switcher नहीं है और `/posts` को बिना `siteId` के लोड करता है), **site widgets** (announcement banner + launcher), **redirects**, **logo / GA4 / चर्च सेटिंग्स**, और **member पोर्टल** (B1App mobile)। ध्यान दें यह "पूरा Appearance" नहीं है — एक secondary साइट की global styles (palette, fonts, typography, spacing, nav, custom CSS) ऊपर दिए गए copy-on-write पाथ के ज़रिए **प्रति-साइट हैं**; केवल Appearance पेज के banner/launcher/redirects/logo सब-panels चर्च-वाइड रहते हैं।
:::

## Custom domains: Caddy edge (static-config plan)

:::info
**दिशा 2026-07-02 को संशोधित।** Custom-domain hosting को Vercel-managed domains पर ले जाने की पहले की एक योजना **रद्द** कर दी गई थी, और सभी Vercel domain-registration कोड (`VercelHelper`, इसके `vercelToken`/`vercelProjectId`/`vercelTeamId` env वेरिएबल, SSM params, और health entries) को Api से हटा दिया गया। Self-managed **Caddy proxy EC2 पर स्थायी custom-domain edge के रूप में बना रहता है**। एकमात्र बचा काम आंतरिक है: Caddy की *runtime* admin-API कॉन्फ़िगरेशन को restarts से बचने वाली एक *static* कॉन्फ़िग से बदलना।
:::

### Edge

हर custom चर्च domain DNS को एक ही EC2 box पर पॉइंट करता है — `3.23.251.61`, जिसे `proxy.b1.church` से भी access किया जा सकता है। B1Admin की Settings→Domains स्क्रीन चर्चों को एक apex `A → 3.23.251.61` या एक `CNAME → proxy.b1.church` जोड़ने का निर्देश देती है। Caddy एक प्रति-domain Let's Encrypt cert से TLS terminate करता है, `Host` header को domain के `{sub}.b1.church` upstream में rewrite करता है, और B1App को reverse-proxy करता है — जो फिर इसे किसी भी native subdomain की तरह host label से route करता है (ऊपर [Custom domains](#custom-domains) देखें)।

Upstream mapping `DomainRepo.loadPairs` से आती है, जिसका dial **assigned साइट के subdomain को COALESCE करता है** ताकि एक domain सही *secondary* साइट को proxy करे, चर्च की primary पर fallback करते हुए:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` rows map से exclude होती हैं; Caddy इसके बजाय `www.{host}` को apex पर एक `302` रीडायरेक्ट के रूप में सर्व करता है।

### Edge को feed करने वाले दो anonymous endpoints

`DomainController` दो unauthenticated, read-only endpoints expose करता है जिन्हें box सीधे उपभोग करता है — जानबूझकर anonymous, क्योंकि किसी भी चर्च context से पहले edge इन्हें query करता है:

| Endpoint | लौटाता है | भूमिका |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` यदि domain — या, एक `www.` miss के लिए, इसका bare apex — `domains` में मौजूद है; अन्यथा `404` (एक खाली `domain` सहित) | Caddy का **on-demand-TLS `ask`**: वह abuse control जो तय करता है कि एक incoming SNI के लिए cert जारी करना है या नहीं |
| `GET /membership/domains/hostmap` | `text/plain`, प्रति routable domain एक sorted `{domain} {sub}.b1.church` लाइन | वह host→upstream map फ़ाइल जिसे box एक टाइमर पर refresh करता है |

`authorize` `DomainRepo.loadByName` को दोबारा उपयोग करता है (exact host, फिर एक `www.`→apex retry); `hostmap` `loadPairs` को दोबारा उपयोग करता है — इसलिए यह site-aware और `www.*`-excluded है, proxy routes जैसा ही — और बस `:443` suffix हटा देता है।

### Domain save/delete — एक best-effort push

`DomainController.save` `domains` rows लिखता है और फिर एक **single best-effort** `CaddyHelper.updateCaddy()` कॉल करता है, एक `try/catch` में wrapped जो log करता है (`console.error`) और निगल जाता है; `delete` वही करता है (जिसने एक पुराने stale-route-on-delete bug को भी ठीक किया), जैसा secondary-site deletion (`SiteController.delete`) भी करता है। `updateCaddy` खुद एक **10s** Axios timeout से bounded है, इसलिए एक unreachable या रुका हुआ Caddy कभी किसी domain save को `500` नहीं करा सकता — `domains` टेबल ही सत्य का स्रोत है।

### वर्तमान स्थिति — static config, कोई runtime state नहीं

Box (permanent Elastic IP के पीछे Windows EC2) एक **static Caddyfile** से Caddy चलाता है: on-demand TLS जिसका `ask` `/membership/domains/authorize` पर पॉइंट करता है, प्लस एक host→upstream map फ़ाइल जो `/membership/domains/hostmap` से हर 5 मिनट में एक scheduled task द्वारा refresh होती है जो एक graceful `caddy reload` पर समाप्त होता है। कॉन्फ़िग restarts को शून्य runtime state के साथ झेलता है — कोई re-priming dance नहीं — और एक अज्ञात SNI **TLS-refused** होता है (एक ऐसे host के लिए कोई cert mint नहीं होता जिसे `authorize` रिजेक्ट करता है), जबकि एक authorized-but-not-yet-mapped host (sync विंडो के भीतर एक बिल्कुल नया domain) को एक clean 404 मिलता है। नए domains एक save के ~5 मिनट के भीतर routable हो जाते हैं; उनके certificates पहली hit पर minted होते हैं। Build/setup, operations, और field-tested gotchas के लिए: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy)।

### Legacy runtime push — rollback पाथ, deletion लंबित

`CaddyHelper` (membership मॉड्यूल) अभी भी `caddyHost:caddyPort` पर अपने **admin API** के ज़रिए Caddy को drive कर सकता है (SSM `caddyHost`/`caddyPort`; unset होने पर no-op; `ServerHealthController` के Integrations group के तहत surfaced): `updateCaddy()` एक पूरा routes array PATCH करता है, और `initializeCaddy()` + `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` endpoints scratch से एक runtime-configured सर्वर को दोबारा बनाते हैं। उस मोड की कॉन्फ़िग केवल Caddy की memory में रहती थी — यही restart-amnesia जिसे यह architecture replace करता है। यह machinery केवल rollback पाथ के रूप में बनी हुई है और static box के स्थिर होने के बाद deletion के लिए scheduled है; domain save/delete पर best-effort `updateCaddy()` push static box के विरुद्ध एक harmless no-op है (इसका admin API केवल localhost-only है)।

## संबंधित पृष्ठ

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — edge box खुद: fresh-box setup, WinSW service, map sync task, और operational gotchas
- [Website Builder](./website-builder) — page/section/element tree, renderers, blog, SEO, और AI generation (रिक्वेस्ट किसी चर्च/साइट पर resolve हो जाने के बाद क्या रेंडर होता है)
- [Content Endpoints](../api/endpoints/content) — pages, blocks, links, और global styles के लिए REST सतह, सभी अब `?siteId=`-aware
- [B1App](../web-apps/b1-app) — वह Next.js ऐप जो middleware और `[sdSlug]` routing होस्ट करता है
- [Web App Deployment](../deployment/web-apps) — B1App को Vercel पर कैसे deploy किया जाता है
