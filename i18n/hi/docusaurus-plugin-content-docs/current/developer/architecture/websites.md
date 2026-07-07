---
title: "Website Routing और Multi-Site"
---

# Website Routing और Multi-Site

<div class="article-intro">

एक single church अब एक से अधिक distinct website को serve कर सकता है, और हर एक एक `*.b1.church` subdomain पर या एक fully custom, church-owned domain पर रह सकता है। यह पृष्ठ routing layer को map करता है जो builder के *नीचे* बैठता है: कैसे एक incoming request एक church **और** एक specific site को resolve करता है, multi-site data model (वह `siteId` sentinel जो हर pre-existing site को unchanged rendering रखता है), और custom-domain edge — एक self-managed Caddy proxy EC2 पर जो TLS को terminate करता है और हर church domain को अपने `*.b1.church` upstream पर rewrite करता है। जो actually render होता है एक बार request resolve हो जाता है — page/section/element tree — देखें [Website Builder](./website-builder)।

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

तीन rules इस layer में रखे गए हैं:

1. **एक sentinel सब कुछ को backward compatible रखता है।** `siteId = ''` primary site है। हर page, block, link, global-style, और domain row जो इस feature से पहले exist किया था `''` को carry करता है और बिल्कुल जैसे यह था render होता है। एक *दूसरा* website बस एक set of rows एक non-empty `siteId` के साथ है, और कोई भी content endpoint बिना `?siteId=` के call किया गया primary site return करता है — byte-for-byte old request।
2. **Resolution host-label-based है और converge करता है।** एक `*.b1.church` subdomain अपने host label से directly route करता है; एक custom domain Caddy edge पर अपने `{sub}.b1.church` label में rewrite किया जाता है इससे पहले कि B1App इसे see करे (middleware DB lookup के साथ जो एक fallback के रूप में `x-site` header को stamp करता है किसी भी raw custom `Host` के लिए)। दोनों legs same `[sdSlug]` route और same `churches/lookup` call पर land करते हैं, तो downstream rendering identical है।
3. **Caddy edge stateless है one source of truth पर।** Custom domains एक self-managed Caddy proxy EC2 पर terminate होते हैं जो हर domain को अपने `{sub}.b1.church` upstream पर rewrite करता है। एक domain save एक single best-effort `CaddyHelper.updateCaddy()` को fire करता है, और Caddy भी `domains` table को directly read करता है (नीचे `authorize` और `hostmap` endpoints)। table authoritative है — एक unreachable Caddy कभी भी save को fail नहीं कर सकता।

## Site resolution

### `*.b1.church` subdomains

`B1App/next.config.mjs` incoming requests को host द्वारा rewrite करता है। `(?<subdomain>.*?)\..*` pattern वाला host rule host के **first label** को capture करता है और `/` और `/:path*` को `/{subdomain}` में rewrite करता है — `[sdSlug]` App-Router segment। तो `grace.b1.church/about` `/grace/about` हो जाता है।

### Custom domains

एक church-owned domain **Caddy edge** पर terminate होता है (नीचे detailed), जो site के `{sub}.b1.church` में `Host` header को rewrite करता है B1App को proxy करने से पहले।

### `siteId` threading

`ConfigHelper` resolved `siteId` को अपने per-request `ConfigurationInterface` पर store करता है और `?siteId=` को content calls में append करता है।

## Multiple websites per church

### डेटा मॉडल

नया `membership.sites` table deliberately tiny है।

### Per-site content, with fallbacks

हर site-scoped content **list/tree** endpoint एक optional `?siteId=` लेता है।

### Site deletion cascade

`SiteController.delete` एक secondary site को तीन steps में tear down करता है।

### B1Admin surface

Site switcher, sites create/delete, per-domain site assignment, और copy-on-write styles।

## Custom domains: Caddy edge (static-config plan)

:::info
**Direction revised 2026-07-02.** Vercel-managed domains पर custom-domain hosting move करने की एक पहली plan **cancelled** की गई थी, और सभी Vercel domain-registration code को Api से removed किया गया था। self-managed **Caddy proxy EC2 पर stays** permanent custom-domain edge के रूप में।
:::

### The edge

हर custom church domain एक EC2 box पर DNS करता है — `3.23.251.61`।

### Two anonymous endpoints feed the edge

`DomainController` दो unauthenticated, read-only endpoints expose करता है box सीधे consume करता है।

### Domain save/delete — one best-effort push

`DomainController.save` `domains` rows write करता है और फिर एक **single best-effort** `CaddyHelper.updateCaddy()` call बनाता है।

### Current state — static config, no runtime state

Box Caddy को एक **static Caddyfile** से run करता है।

### Legacy runtime push — rollback path, pending deletion

`CaddyHelper` अभी भी Caddy को अपने **admin API** के माध्यम से drive कर सकता है।

## संबंधित पृष्ठ

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — edge box itself: fresh-box setup, WinSW service, map sync task, और operational gotchas
