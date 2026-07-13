---
title: "Kuchubeka Kwewebusayithi & Emasayithi Lamaningi"
---

# Kuchubeka Kwewebusayithi & Emasayithi Lamaningi

<div class="article-intro">

Libandla linye lingasetjentisa manje emawebusayithi langetiwe langeyodwa, futsi ngalinye langahlala ku-subdomain ye-`*.b1.church` nome kulidomeni leliciniso lelimi lodvwa lelinelibandla. Lelikhasi limephu levele yekuchubeka lehleti *ngephasi* kwalomakhi: kutsi sicelo lesingenako sicabanga njani libandla **kanye** nesayithi lelitsite, imodeli yemininingwane yemasayithi lamaningi (i-sentinel ye-`siteId` legcina onkhe emasayithi lasekhona atokwakha kungashintji lutfo), kanye netihlangu telidomeni leliciniso — i-proxy ye-Caddy letilawulwa ngekwayo ku-EC2 legcina i-TLS futsi ishintje lidomeni lelibandla ngalinye laye ku-upstream yayo ye-`*.b1.church`. Kwentela loko lokugcina kuvela nasesicelo sesicabanga khona — lugcwenga lwelikhasi/sigaba/intfo — bona [Umakhi Wewebusayithi](./website-builder).

</div>

## Sifinyeto

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

Imitsetfo lemitsatfu isebenta kulelevele:

1. **I-sentinel igcina konkhe kungashintji lutfo emuva.** I-`siteId = ''` yisayithi lesisekelo. Likhasi ngalinye, sigaba, sixhumanisi, sitayela sesijikelezo, kanye nemugca welidomeni lowawukhona ngaphambi kwalesatiso uphetse i-`''` futsi wakhelwa ncamashi njengobe bewuchubeka. Isayithi **lesesibili** ngumugca nje lonesi-`siteId` lesingasilutfo, futsi nome iyiphi endpoint yekucuketfwa lebitwe ngephandle kwe-`?siteId=` ibuyisa isayithi lesisekelo — ngco njengesicelo lasendvulo.
2. **Kucaciswa kusekelwe ku-host-label futsi kuyahlangana.** I-subdomain ye-`*.b1.church` iyacaciswa ngelibhaso layo lelicalile ngco; idomeni leliciniso liyashintjwa laba libhaso lalo le-`{sub}.b1.church` ku-Caddy edge ngaphambi kwekutsi i-B1App ilibone (ngesihloko se-`x-site` lesifakwa yi-middleware ye-DB lookup njengesekela sanome ngiyiphi i-Host leliciniso leliluhlaza). Tonkhe tinyawo temibili tifika endleleni yefanako ye-`[sdSlug]` kanye nekubitwa kwe-`churches/lookup` lokufanako, ngako kwakhiwa ngephasi kuyafana.
3. **I-Caddy edge ayigcini simo, isikela emtfombeni munye weliciniso.** Emadomeni laciniso agcina ku-proxy ye-Caddy letilawulwa ngekwayo ku-EC2 leshintja lidomeni ngalinye laye ku-upstream yayo ye-`{sub}.b1.church`. Kugcinwa kwelidomeni kuvusa kubitwa kunye kwe-`CaddyHelper.updateCaddy()` lokwenta konke lokusemandleni (best-effort), kantsi i-Caddy iphindze ifundze i-`domains` table ngco (ema-endpoint e-`authorize` kanye ne-`hostmap` ngentasi). Lithebula lilelicinisile — i-Caddy lengafinyeleleki ayikwati nanini kwenta kutsi kugcinwa kwehluleke.

## Kucaciswa kwesayithi

### Ema-subdomain e-`*.b1.church`

I-`B1App/next.config.mjs` iyashintja tetucelo letingenako nge-host. Umtsetfo we-host lonepatheni `(?<subdomain>.*?)\..*` ubamba **libhaso lekucala** le-host bese ushintja i-`/` kanye ne-`/:path*` yaba i-`/{subdomain}` — incenye ye-App-Router ye-`[sdSlug]`. Ngako i-`grace.b1.church/about` iba i-`/grace/about`.

Ngekhatsi kwe-`src/app/[sdSlug]/`, i-`ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) ibita i-`GET /membership/churches/lookup/?subDomain={sdSlug}`. Sento se-`ChurchController.getBySubDomain` manje sinemagatja lamabili:

| Sicalo lesifananako | Sento | Incazelo |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Isayithi lesisekelo laleliobandla |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Isayithi lesesibili** — umlawuli uyawela ku-`sites`, acaciswe libandla lelinini, futsi aphindze acalo lelibutiwe kanye ne-`siteId` lengetiwe |

Loko-`siteId` lokwengetiwe ngiyona intfo yodvwa lehlukanisa sicelo sesayithi lesesibili kunaleso lesisekelo; konkhe lokunye endleleni kwabelene.

### Emadomeni laciniso

Idomeni lelimnini libandla ligcina ku-**Caddy edge** (lichaziwe ngentasi), leshintja i-header ye-`Host` laba i-`{sub}.b1.church` yesayithi ngaphambi kwekudlulisa ku-B1App. Ngako endleleni lejwayelekile, i-B1App itfola i-host *yangekhatsi* ye-`*.b1.church` bese icaciswa ngelibhaso lelicalile ngco njengaloko kwenteka ku-subdomain lemvelo — i-DB lookup ye-middleware ayikaze isebente. I-`src/middleware.ts` isasebenta sicelo ngasinye, kepha nemsebenti munye lohlala usebenta kanye nesekela sinye:

1. **Njalo** — iyasusa nome ngiyiphi i-header ye-`x-site` lefakwe yi-client. Loko header liyakwatiwa kudukiswa (spoofable) futsi kutfenjwa kuphela nangabe kusetjentiswe yi-middleware ngekwayo; kususa loko kusemsebentini wa-middleware weliciniso ngemuva kwe-Caddy.
2. **Sekela, i-`Host` lengasiyongekhatsi kuphela** — kwentela i-`Host` yelidomeni leliciniso leliluhlaza lefika ku-B1App *ngephandle* kwekushintjwa yi-Caddy, ibita i-`GET /membership/domains/public/lookup/{host}` bese, nangabe loko kubuyisa `subDomain`, isetsa i-`x-site: {subDomain}.b1.church`. Ngemuva kwe-Caddy legatja liyafa njengobe i-`Host` seyi-`*.b1.church`.

Ema-host wangekhatsi — `localhost`, `b1.church`, kanye nemasakhulo la-`.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — ayeqa lookup ngco (sekuvele kucaciswe nge-host-label rewrite, nome ngema-host wekuhlola/kutfumela).

Lookup ngayo (`DomainRepo.loadByName`) ihlanganisa (left-join) i-`domains → churches` kanye ne-`domains → sites` bese ibuyisa i-`COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — subDomain yesayithi lesesibili lesabelweko nangabe idomeni likhomba kuso, ngephandle kwaloko yeliobandla. Ihlanganisa i-host lelicinisile kucala; nangabe leyo host bekucala nge-`www.` bese yehluleka, iphindze **kanye kuphela** kulendlela ye-apex leliluhlaza.

Emuva ku-`next.config.mjs`, imitsetfo yekushintja ye-`x-site` ibekwe **ngaphambi** kwemitsetfo lejwayelekile ye-host, ngako iyaphumelela. I-`x-site: grace.b1.church` → libhaso lekucala `grace` → `[sdSlug] = grace`, bese kusukela lapho kucaciswa kuyafana ncamashi nendlela ye-subdomain (kubitwa lokufanako kwe-`churches/lookup`, i-siteId lefanako).

:::info
I-header ye-`x-site` ayitfenjwa nasingaphandle. I-middleware iyasusa ngephandle kwesibonelo nome ngiyiphi i-`x-site` lengenako ngaphambi kwekusetsa yekwayo, kantsi imitsetfo yekushintja ibona ligugu lelisetjwe yi-middleware kuphela — client akakhoni kutiphocelela kuye kucuketfwa kwalelinye libandla ngekutfumela header.
:::

Imininingwane lemibili yekusebenta kwe-middleware:

- **I-Cache.** Umphumela welihost ngalinye (loko lekutfoliwe *nome* loko lokucinisekile kutsi akutfolakali — akukho phutsa lweluchungechunge) kugcinwa ku-**10 emaminithi** ku-Map lesekhatsi yenkumbulo, ngesibonelo ngasinye se-serverless.
- **I-Matcher.** I-matcher ngekucabanga iphindze ifake `/sitemap.xml`, `/robots.txt`, kanye ne-`/manifest.webmanifest`. Iphateni yayo yekucala ikhipha tindlela letinemachaphazi (dotted paths), lokungahle kuwise loya mafayela; ayafakwa kabusha kuze idomeni leliciniso litfole namafayela ayo e-SEO/PWA nge-header ye-`x-site`.

### Kufakwa kwe-`siteId`

I-`ConfigHelper` igcina i-`siteId` lecaciswile ku-`ConfigurationInterface` yayo ngesicelo ngasinye (lekhunjulwe nge-React `cache()`) futsi yengeta i-`?siteId=` kutetucelo tekucuketfwa lekutentako kanye netincenye telikhasi letikwentako — **ngesimo lesitsite**: i-siteId lengenalutfo (subdomain yelibandla lesisekelo) iyayeqa i-parameter ngco. Ema-endpoint labhajiwe ngugcwenga lwelikhasi (`/content/pages/:id/tree`), luhlu lwelikhasi lomphakatsi lolusetjentiswa yi-sitemap (`/content/pages/public/:id`), tinsitayela tejikelezo (`/content/globalStyles/church/:id`), tixhumanisi tekuhamba (`/content/links/church/:id`), kanye nesigaba se-footer lesimile (`/content/blocks/public/footer/:id`). Endleleni lejwayelekile yekukhicita, i-footer ifika ngekhatsi kwe-gcwenga lelikhasi (tigaba letinemaphawu la-`zone: "siteFooter"`), sekuvele kutfolwe ne-siteId, ngako akukho sikhala se-footer lesingacaciswanga.

I-mobile portal yemalunga (i-B1App `mobile`) ngekucabanga imile ngephandle kwaloku: i-`loadChurchAppearance.ts` icacisa libandla nge-`churches/lookup` kodvwa ifundza `/settings/public/{id}` yelevele lelibandla futsi ayikaze ifake i-siteId — i-portal ime yonkhe libandla ku-v1 (bona ngentasi).

## Emawebusayithi lamaningi ngelibandla linye

### Imodeli yemininingwane

Lithebula lelisha le-`membership.sites` licinisile lincane ngekucabanga:

| Likholomu | Luhlobo | Emavi |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Libandla lelimnini |
| `name` | `varchar(255)` | Ligama lekukhonjiswa (sib. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Inkomba yekungakhona lokufanako** — indzawo yesicaba yendzawonkhe (ngentasi) |

Kubekwa esikhtini kwesayithi kuba likholomu linye lelingenalona i-null lelifakwe emathebuleni ekucuketfwa nawedomeni:

| Lithebula (Umodyuli) | Likholomu | `''` lisho |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Idomeni lisetjentisa isayithi lesisekelo |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Isayithi lesisekelo — futsi ku-**`blocks`**, i-`''` iphindze isho *kwabelanwa kuwo onkhe emasayithi* |

Tikhwishukisi letimbili tengeta konkhe loku (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Njengobe likholomu lehlulekako liba `''`, umugca ngamunye losewukhona ugcina kwenteka kwanamuhla ngephandle kwekwentiwa kabusha (backfill).

**Indzawo yesicaba yendzawonkhe yesubdomain.** I-`sites.subDomain` yabelana **ndzawo yesicaba yinye** ne-`churches.subDomain` — subdomain yesayithi ayikwati nanini kufana nesubdomain yelibandla nome yenye isayithi. Loku kugcinwa **kuto tombili** tindlela tekugcina: i-`SiteController.save` iyala sicalo lesitfola nome i-`churches` nome i-`sites`, kantsi i-`ChurchController.validateSave` yenta lokufanako ngalenye indlela. Inkomba yekungakhona lokufanako ku-`sites.subDomain` iyasekela loku kulevele ye-database.

**Kungakhona lokufanako kwemakhasi** kwandzisiwe kusuka ku-`(churchId, url)` kuya ku-`(churchId, siteId, url)`, ngako emasayithi lamabili elibandla linye angaba ne-`/about` yawo.

### Kucuketfwa ngesayithi, kanye netekwehlulela

I-endpoint yekucuketfwa **yeluhlu/gcwenga** ngesayithi ngayinye ithatsa i-`?siteId=` lengakhetiwe (nangabe kungekho ⇒ `''` = lesisekelo): gcwenga/luhlu/lomphakatsi lwelikhasi, luhlu lwesigaba / ngeluhlobo / footer, tixhumanisi (letingakabhaliswa / letihlungiwe / tonkhe), kanye netinsitayela tejikelezo. Tigaba netintfo *azihlungwa ngco*; tiyalifundza kusuka kulikhasi nome sigaba lesibazalako.

Ticaciso letimbili tenta umsebenti lonesitfaki:

- **Tinsitayela tejikelezo — `sayithi → lesisekelo → lesehlukile`.** I-`GlobalStyleRepo.loadForChurch(churchId, siteId)` ibuyisa umugca wesayithi ngekwayo; nangabe isayithi lesesibili singenawo, ibuyisa **umugca lesisekelo (`''`) ngco** (igcina i-`id`/`siteId` yaso lesisekelo, lesetjentiswa yi-client kukopisha nawubhala); nangabe kungekho lesisekelo naso, i-`GlobalStyleController` ibuyisa isitayela lesehlukile lesitfotiwe kudvwa (fonti/mibala).
- **Isigaba se-footer — lesitsite ngesayithi siyaphumelela, lesabelene siba sekela.** I-`BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` ibuyisa imigca lesabelene (`''`) *kanye* nalesitsite ngesayithi; sicaciso sikhetsa i-footer yesayithi ngekwayo nangabe ikhona, ngephandle kwaloko lesabelene. Umsebenti lofanako usebenta kuto tombili i-`TreeHelper.insertBlocks` (gcwenga lelikhasi) kanye ne-endpoint lemile ye-`/content/blocks/public/footer/:churchId`.

### Kususwa kwesayithi

I-`SiteController.delete` (levikelwe ngemvume ye-Settings→Edit yeMembership) idvilita isayithi lesesibili ngetinyatselo letitsatfu:

1. I-`ContentModuleGateway.deleteSiteContent(churchId, siteId)` idvilita konkhe kucuketfwa lokungeliso sayithi: **emakhasi** ayo → tigaba tato, tintfo, `pageHistory`, kanye ne-`posts`; **tigaba** tayo ngekwato → tigaba tato, tintfo, kanye ne-`pageHistory`; **tixhumanisi** tayo kanye ne-**tinsitayela tejikelezo**. Sivikelo sala kusebenta kwe-`''` — i-sentinel yesisekelo/lesabelene ayikaze idviliteke.
2. I-`DomainRepo.clearSiteId` **iphindze inikete** emadomeni esayithi ekubuyela esayithini lesisekelo (`siteId → ''`) kunekutsi awasuse, ngako idomeni leliciniso liyasala nome isayithi ledviliwe.
3. Umugca we-`sites` uyasulwa futsi timigwaco ye-Caddy tiyavuselelwa kabusha (best-effort).

### Bubanti be-B1Admin

| Sikhono | Kuphi | Umshini |
|-----------|-------|---------|
| Sishintjisi sesayithi | `useSiteSelection` + `SiteSwitcher` (lengelutfo = "Main Website") | Ifundza i-parameter ye-URL ye-`?site=` bese iyifaka njenge-`?siteId=` kutetucelo te-ContentApi. Ikhona endzaweni letintsatfu te-Site **luhlu** — **Pages**, **Blocks**, **Appearance** — kodvwa *hhayi* umhleli welikhasi/sigaba, lophetse i-siteId kumugca |
| Kwakha/kususa emasayithi | `SitesDialog`, levuleka kusuka ku-"Manage websites…" yesishintjisi | `POST /membership/sites` / `DELETE /membership/sites/:id` (ligama + subDomain). Kuvikelwe yimvume ye-Settings→Edit ye-Membership (`Permissions.settings.edit` ku-server-side; `Permissions.membershipApi.settings.edit` ku-B1Admin). **Kwakha/kususa kuphela — akukho i-UI yekushintja ligama ku-v1** |
| Kwabelwa kwesayithi ngedomeni | `DomainSettingsEdit` ngaphansi kwe-Settings→Domains | Kuhla kwesayithi ngemugca ngamunye kutfumela i-siteId ngedomeni ku-`/membership/domains`. Likholomu liyafihlakala nangabe i-API ibuyisa kungekho emasayithi (backend lendzala) |
| Kukopisha-nawubhala kwetinsitayela | `StylesManager.prepareForSave` | Nangabe i-siteId yemugca wesitayela sejikelezo lesilayishiwe ingafani nesayithi lesikhetsiwe (buka i-API ibuyise lesisekelo lelifundzelwe njengesekela), iyasusa i-id yalesisekelo bese ifaka i-siteId yanyalo, kuphocelela **kufakwa** kwemugca lomusha lohambisana nesayithi kunekubhalela phezu kwelesisekelo. Umkhandlu lofanako wekufokela nakungahambelani usebenta ku-sigaba se-footer sesayithi |

:::info
**Loko lokusala kuyilibandla lonkhe ku-v1 (kukhetsa lokwentiwe ngekucabanga, hhayi umkhawulo wemodeli yemininingwane):** i-**blog** (i-`BlogPage` ayinasishintjisi futsi ilayisha i-`/posts` ngephandle kwe-siteId), ti-**widget tesayithi** (ibhena yekumemetela + lomethisi), **kucondzisa kabusha (redirects)**, i-**logo / GA4 / kuhleleka kwelibandla**, kanye ne-**portal yelilunga** (B1App mobile). Cabangela kutsi loku *akusiko* "onkhe e-Appearance" — tinsitayela tejikelezo tesayithi lesesibili (mibala, fonti, typography, sikhala, nav, CSS lesifisako) **ngeza ngesayithi** nge-copy-on-write path lengetulu; ngema-sub-panel e-banner/launcher/redirects/logo yelikhasi le-Appearance lasala ayilibandla lonkhe.
:::

## Emadomeni laciniso: Caddy edge (luhlelo lwe-static-config)

:::info
**Sicondzo sishintjiwe nge-2026-07-02.** Luhlelo lwakadze lwekutfutsela kugcinwa kwedomeni leliciniso kuya kuma-domain lalawulwa yi-Vercel **lwesulwa**, futsi wonkhe umgomo wekubhalisa idomeni ku-Vercel (`VercelHelper`, tinkhinobho tayo te-`vercelToken`/`vercelProjectId`/`vercelTeamId`, tincwadzi te-SSM, kanye netibalo tempilo) tasuswa ku-Api. I-proxy ye-Caddy letilawulwa ngekwayo ku-EC2 **isasetjentiswa** njengetihlangu letimile letedomeni leliciniso. Umsebenti losele wangekhatsi kuphela: kushintja kuhleleka kwe-runtime kwe-admin-API ye-Caddy kwaba kuhleleka lokumile lokusinda tekucala kabusha.
:::

### Sihlangu

Idomeni lelibandla leliciniso ngalinye likhomba i-DNS kuyona ibhokisi ye-EC2 — `3.23.251.61`, lephindze ifinyeleleke njenge-`proxy.b1.church`. Sikrini se-Settings→Domains se-B1Admin siyala emalibandla kutsi engete i-apex `A → 3.23.251.61` nome i-`CNAME → proxy.b1.church`. I-Caddy iyagcina i-TLS ngesitifiketi se-Let's Encrypt ngedomeni ngalinye, ishintja header ye-`Host` iye ku-upstream ye-`{sub}.b1.church` yaleyo domeni, futsi iyadlulisa (reverse-proxy) iye ku-B1App — leyisebentisa i-host label njengaloko kwenta subdomain lemvelo (bona [Emadomeni laciniso](#custom-domains) ngetulu).

Kufaniswa kwe-upstream kuvela ku-`DomainRepo.loadPairs`, lokubita kwayo (dial) **kutfola i-COALESCE** kwe-subdomain yesayithi lesabelweko ngako idomeni liyadlula liye kusayithi lesesibili lelifanele, kufokela endzaweni yesayithi lesisekelo lelibandla:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Imigca ye-`www.*` iyakhishwa endzaweni yekufaniswa; i-Caddy isebentisa i-`www.{host}` nge-cocondziswa (`302` redirect) iye ku-apex.

### Ema-endpoint lamabili langakabhaliswa asondla sihlangu

I-`DomainController` ikhombisa ema-endpoint lamabili langakavunyelwa, angakabhaliswa, langafundza kuphela lasetjentiswa ngco yibhokisi — akubhaliswanga ngekudzingeka, njengobe sihlangu sibuta lawa ema-endpoint ngaphambi kwekutsi kube khona sitfombo selibandla:

| Endpoint | Ibuyisa | Umsebenti |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` nangabe idomeni — nome, kwentela i-`www.` lengafumananga, i-apex yayo leliluhlaza — ikhona ku-`domains`; `404` ngephandle kwaloko (kuhlanganisa idomeni lengelutfo) | I-`ask` ye-Caddy ye-on-demand-TLS: kulawula kudlaleka lokuncumako kutsi ngabe kukhicitwe yini sitifiketi kuma-SNI langenako |
| `GET /membership/domains/hostmap` | `text/plain`, umutsi munye lohlelwe we-`{domain} {sub}.b1.church` ngedomeni ngalinye lelicondzako | Ifayela lekufaniswa kwe-host→upstream lebhokisi liyivuselela etayimeni |

I-`authorize` isebentisa kabusha i-`DomainRepo.loadByName` (host lelicinisile kucala, bese iphindze **kanye** ku-`www.`→apex); i-`hostmap` isebentisa kabusha i-`loadPairs` — ngako yaziwa ngesayithi futsi ikhipha i-`www.*`, kufana nemigwaco ye-proxy — bese nje ikhipha sicalo se-`:443`.

### Kugcinwa/kususwa kwedomeni — kutfunyelwa kunye lokwenta konkhe lokusemandleni

I-`DomainController.save` ibhala imigca ye-`domains` bese yenta kubitwa **kunye lokwenta konkhe lokusemandleni** i-`CaddyHelper.updateCaddy()`, lokusongwe ku-`try/catch` lebhala ilogi (`console.error`) bese igwinya liphutsa; i-`delete` yenta lokufanako (loku futsi kwalungisa liphutsa lakadze lemigwaco lesele isele ngemuva kwekususwa), njengoba futsi kwenta kususwa kwesayithi lesesibili (`SiteController.delete`). I-`updateCaddy` ngayo icinisekiswe yi-timeout ye-Axios ye-**10s**, ngako i-Caddy lengafinyeleleki nome lemisiwe ayikaze yente kugcina kwedomeni kwenta `500` — lithebula le-`domains` liliciniso.

### Simo samanje — kuhleleka lokumile, kungekho simo se-runtime

Ibhokisi (i-Windows EC2 ngemuva kwe-Elastic IP lemile) isebentisa i-Caddy kusuka ku-**Caddyfile lemile**: TLS ye-on-demand lapho i-`ask` yayo ikhomba ku-`/membership/domains/authorize`, kanye nefayela lekufaniswa host→upstream levuselelwa matimu angu-5 onkhe kusuka ku-`/membership/domains/hostmap` ngumsebenti lohleliwe loguca nge-`caddy reload` lonesizotha. Kuhleleka kusinda kutekucala kabusha ngenkhulumo yesimo se-runtime lengelutfo — akukho sinyandvo sekwakha kabusha — futsi i-SNI lengaziwa **iyalwe nge-TLS** (akukho sitifiketi lesikhicitwako kwentela i-host leyalwe yi-authorize), kantsi i-host levunyelwe kodvwa lengakafanaswa (idomeni lensha ngekhatsi kwesikhala sekufaniswa) itfola `404` lecocile. Emadomeni lamasha aba ngalatfolakala ngekhatsi kwemaminithi lacishe abe-5 ngemuva kwekugcinwa; tisitifiketi tato tikhicitwa ku-hit yekucala. Kwakha/kuhlela, kusebenta, kanye netindlela letihloliwe: [I-Proxy ye-Caddy Yedomeni Leliciniso](../deployment/caddy-proxy).

### Kutfunyelwa kwakadze kwe-runtime — indlela yekubuyela emuva, kulindzele kususwa

I-`CaddyHelper` (umodyuli we-membership) usangakwati kucondzisa i-Caddy nge-admin API yayo ku-`caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; ayenti lutfo nangabe kungasethiwe, ikhonjiswa ngaphansi kwelicembu le-Integrations le-`ServerHealthController`): i-`updateCaddy()` ye-PATCHa luhlu lolugcwele lwemigwaco, kantsi i-`initializeCaddy()` + ema-endpoint e-`GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` akha kabusha seva lehlelwe nge-runtime kusuka ekucaleni. Simo saleso simo besihlala kuphela enkumbulweni ye-Caddy — kukhohlwa ngenca yekucala kabusha lokwalungiswa yilesakhiwo. Lomshini usasele kuphela njengendlela yekubuyela emuva futsi uhlelelwe kususwa nome sekumile kahle ibhokisi lelimile; kutfunyelwa lokwenta konkhe lokusemandleni kwe-`updateCaddy()` ekugcineni/kususweni kwedomeni akwenti lutfo lokulimatako ku-bhokisi lelimile (i-admin API yayo isekelwe ku-localhost kuphela).

## Emakhasi Lahlobene

- [I-Proxy ye-Caddy Yedomeni Leliciniso](../deployment/caddy-proxy) — sihlangu ngasosonkhe: kuhlela ibhokisi lensha, sevisi ye-WinSW, umsebenti wekuvumelanisa kufaniswa, kanye nendlela yekusebenta
- [Umakhi Wewebusayithi](./website-builder) — gcwenga lelikhasi/sigaba/intfo, ema-renderer, i-blog, i-SEO, kanye nekukhicitwa nge-AI (loko lokugcina kuvela nasesicelo sesicabanga selibandla/sayithi)
- [Ema-Endpoint Ekucuketfwa](../api/endpoints/content) — bubanti be-REST bemakhasi, tigaba, tixhumanisi, kanye netinsitayela tejikelezo, konkhe manje kuyati i-`?siteId=`
- [B1App](../web-apps/b1-app) — luhlelo lwe-Next.js loluhloba i-middleware kanye ne-`[sdSlug]` routing
- [Kutfunyelwa Kwetinhlelo Tewebu](../deployment/web-apps) — kutsi i-B1App itfunyelwa njani ku-Vercel
