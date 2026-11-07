---
title: "Smerovanie webstránok a viacero webov"
description: "Ako B1.church mapuje subdomény a vlastné domény na správnu cirkev alebo sekundárny web, plus okrajová vrstva Caddy, ktorá spracúva TLS pre vlastné domény."
---

# Smerovanie webstránok a viacero webov

<div class="article-intro">

Jeden kostol teraz môže prevádzkovať viac odlišných webových stránok a každá z nich môže byť na subdoméne `*.b1.church` alebo na plne vlastnej doméne patriacej kostolu. Táto stránka opisuje smerovaciu vrstvu, ktorá je *pod* tvorcom webu: ako sa prichádzajúca požiadavka preloží na kostol **a** na konkrétnu stránku, dátový model viacerých stránok (sentinelová hodnota `siteId`, ktorá zachováva každú existujúcu stránku bez zmeny) a okraj pre vlastné domény — samostatne spravovaný proxy server Caddy na EC2, ktorý ukončuje TLS a prepisuje každú doménu kostola na jej upstream `*.b1.church`. Informácie o tom, čo sa vykreslí po tom, ako je požiadavka vyriešená — strom stránok, sekcií a prvkov — nájdete v [Tvorca webstránok](./website-builder.md).

</div>

## Prehľad

```
   grace.b1.church              www.gracechurch.org  (vlastná doména)
   (subdoména b1.church)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Okraj Caddy — EC2 3.23.251.61            │
          │             │             (proxy.b1.church)             │
          │             │  • ukončuje TLS (LE certifikát pre doménu)│
          │             │  • prepisuje Host → {sub}.b1.church       │
          │             │  • reverzne preposiela do B1App           │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • vždy: zmaže každú hlavičku x-site od klienta (proti spoofingu) │
   │  • interný Host *.b1.church ⇒ vyhľadanie domén zostáva neaktívne │
   │  • surový vlastný Host (obchádza Caddy) ⇒ vyhľadanie → nastaví x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → prvá časť hostiteľa → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   pridáva ?siteId= do každého volania obsahu:    │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  uloženie/zmazanie domény (B1Admin Nastavenia→Domény → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (obalené, nefatálne, 10s časový limit)
  Caddy číta samotnú tabuľku domén cez dva anonymné endpointy:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 známa / 404 neznáma)
        GET /membership/domains/hostmap    — mapa host→{sub}.b1.church (obnova každých 5 min)
```

Tri pravidlá platia v celej tejto vrstve:

1. **Sentinel zachováva spätnú kompatibilitu.** `siteId = ''` je primárna stránka. Každá stránka, blok, odkaz, globálny štýl a riadok domény, ktoré existovali pred touto funkciou, obsahujú `''` a vykresľujú sa presne tak ako predtým. *Druhá* webová stránka je jednoducho množina riadkov s neprázdnym `siteId`, a každý koncový bod obsahu volaný bez `?siteId=` vráti primárnu stránku — bajt po bajte rovnakú požiadavku ako predtým.
2. **Rozlíšenie je založené na časti názvu hostiteľa a konverguje.** Subdoména `*.b1.church` sa smeruje priamo podľa svojej časti názvu hostiteľa; vlastná doména sa na okraji Caddy prepíše na svoju časť `{sub}.b1.church`, skôr než ju B1App uvidí (s vyhľadaním v databáze v middleware, ktoré nastaví hlavičku `x-site` ako záložné riešenie pre akýkoľvek surový vlastný `Host`). Obe cesty skončia na rovnakej trase `[sdSlug]` a rovnakom volaní `churches/lookup`, takže ďalšie vykresľovanie je identické.
3. **Okraj Caddy je bezstavový nad jedným zdrojom pravdy.** Vlastné domény končia na samostatne spravovanom proxy serveri Caddy na EC2, ktorý prepisuje každú doménu na jej upstream `{sub}.b1.church`. Uloženie domény spustí jediné best-effort volanie `CaddyHelper.updateCaddy()` a Caddy tiež číta tabuľku `domains` priamo (koncové body `authorize` a `hostmap` nižšie). Tabuľka je rozhodujúca — nedostupný Caddy nikdy nemôže zlyhať uloženie.

## Rozlíšenie stránky

### Subdomény `*.b1.church`

`B1App/next.config.mjs` prepisuje prichádzajúce požiadavky podľa hostiteľa. Pravidlo hostiteľa so vzorom `(?<subdomain>.*?)\..*` zachytí **prvú časť** hostiteľa a prepíše `/` a `/:path*` na `/{subdomain}` — segment App Routera `[sdSlug]`. Takže `grace.b1.church/about` sa stane `/grace/about`.

V rámci `src/app/[sdSlug]/` volá `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}`. Odpoveď `ChurchController.getBySubDomain` má teraz dve vetvy:

| Slug sa zhoduje | Odpoveď | Význam |
|-----------------|---------|--------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primárna stránka tohto kostola |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Sekundárna stránka** — kontrolér sa vráti k `sites`, zistí vlastniaci kostol a vráti dotazovaný slug spolu s dodatočným `siteId` |

Tento dodatočný `siteId` je jediná vec, ktorá odlišuje požiadavku na sekundárnu stránku od primárnej; všetko ostatné v spracovaní je spoločné.

Slug, ktorý nezodpovedá žiadnej tabuľke, sa vráti ako `{}` so stavom `200`. `ConfigHelper.load` považuje odpoveď bez `id` za neznámu stránku a volá `notFound()` z Next, takže neznáma subdoména dostane skutočnú chybu 404 namiesto toho, aby každé ďalšie volanie pýtalo `/…/undefined`. Trasa stránky tvorcu tiež zostavuje cestu stromu pomocou `pageTreePath()` (`src/helpers/pageTreePath.ts`), ktorá kóduje slug do URL, takže nesprávny slug (spätné lomky, medzery) vráti 404 namiesto toho, aby sa chyba `400` z API zobrazila ako 500.

### Vlastné domény

Vlastná doména patriaca kostolu končí na **okraji Caddy** (podrobnosti nižšie), ktorý prepíše hlavičku `Host` na `{sub}.b1.church` stránky, skôr než požiadavku preposiela do B1App. Takže pri bežnej ceste B1App dostane *interný* hostiteľ `*.b1.church` a rozlíši ho podľa časti názvu rovnako ako natívnu subdoménu — vyhľadanie v databáze middleware sa nikdy nespustí. `src/middleware.ts` sa stále spúšťa pri každej požiadavke, ale s jednou vždy aktívnou úlohou a jednou záložnou:

1. **Vždy** — **zmaže akúkoľvek hlavičku `x-site` poslanú klientom**. Táto hlavička je vstup pre prepisovanie, ktorý možno sfalšovať, a dôveruje sa jej iba vtedy, keď ju nastaví samotný middleware; jej odstránenie je skutočnou úlohou middleware za Caddy.
2. **Záložné riešenie, iba pre neinterný `Host`** — pre surový vlastný `Host` domény, ktorý sa dostane do B1App *bez* prepisu Caddy, zavolá `GET /membership/domains/public/lookup/{host}` a ak vráti `subDomain`, nastaví `x-site: {subDomain}.b1.church`. Za Caddy je táto vetva neaktívna, pretože `Host` je už `*.b1.church`.

Interné hostiteľe — `localhost`, `b1.church` a prípony `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — preskakujú vyhľadávanie úplne (už sú vyriešené prepisom podľa časti názvu hostiteľa alebo ide o náhľadové či nasadzovacie hostiteľe).

Samotné vyhľadanie (`DomainRepo.loadByName`) robí ľavé spojenie `domains → churches` a `domains → sites` a vráti `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — subdoménu priradenej sekundárnej stránky, ak doména smeruje na jednu, inak subdoménu kostola. Najprv hľadá presnú zhodu hostiteľa; ak tento hostiteľ začínal na `www.` a nič nenašiel, skúsi **raz** znova holú apex doménu.

Späť v `next.config.mjs` sú pravidlá prepisu `x-site` umiestnené **pred** všeobecnými pravidlami hostiteľa, takže majú prednosť. `x-site: grace.b1.church` → prvá časť `grace` → `[sdSlug] = grace` a odtiaľ je rozlíšenie identické ako pri ceste cez subdoménu (rovnaký `churches/lookup`, rovnaký `siteId`).

:::info
Hlavička `x-site` nie je zvonku dôveryhodná. Middleware bezpodmienečne odstráni každú prichádzajúcu hlavičku `x-site` skôr, než prípadne nastaví svoju vlastnú, a pravidlá prepisu vidia iba hodnotu nastavenú middleware — klient nemôže vnútiť svoje miesto obsahu iného kostola poslaním hlavičky.
:::

Dva prevádzkové detaily middleware:

- **Vyrovnávacia pamäť.** Výsledok pre každého hostiteľa (zásah *alebo* potvrdený neúspech — nikdy nie sieťová chyba) sa ukladá na **10 minút** do pamäťovej `Map`, pre každú serverless izolovanú inštanciu.
- **Matcher.** Matcher zámerne znovu zahŕňa `/sitemap.xml`, `/robots.txt` a `/manifest.webmanifest`. Jeho prvý vzor vylučuje cesty s bodkou, ktoré by inak tieto súbory vyradili; sú pridané späť, aby súbory SEO/PWA pre jednotlivé kostoly na vlastnej doméne tiež dostali hlavičku `x-site`.
- **Kanonická hlavička.** Pre stránky kostola middleware pripojí k odpovedi hlavičku `Link: <{proto}://{host}{path}>; rel="canonical"`, ktorá uvádza hostiteľa, z ktorého bola stránka skutočne poskytnutá — subdoménu alebo vlastnú doménu (`helpers/canonicalLink.ts`). Keď sa vlastná doména dostane do B1App cez [proxy Caddy](../deployment/caddy-proxy.md), hostiteľ požiadavky je subdoména `{sub}.b1.church`, takže middleware namiesto toho použije doménu návštevníka z `X-Church-Host` — ale až potom, čo `/domains/public/lookup/{host}` potvrdí, že táto doména sa mapuje na rovnakú subdoménu (`ownsSubdomain()`). Kanonický odkaz, `robots.txt` a `sitemap.xml` potom uvádzajú vlastnú doménu namiesto subdomény `b1.church`. Preskakuje sa na hostiteľoch, ktorí nie sú kostolom (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) a na `/mobile`, `/login`, `/logout` a vygenerovaných súboroch robots/sitemap/manifest.

### Vypnutá verejná webová stránka

Kostol môže v B1Admin zapnúť **Vypnúť verejnú webovú stránku** (nastavenie obsahu na úrovni kostola `hidePublicSite = "true"`). Stránka potom poskytuje iba trasy určené pre členov:

- **Middleware B1App** vyhľadá subdoménu (`/membership/churches/lookup` a potom `/content/settings/public/:churchId`) a anonymné požiadavky na akúkoľvek cestu mimo povoleného zoznamu presmeruje na `/login?returnUrl={path}{query}`. Povolený zoznam (`helpers/publicSite.ts`) tvoria `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` a súbory manifest/robots/sitemap. Ukladajú sa iba potvrdené odpovede (60 sekúnd v produkcii, pretože volanie revalidácie v administrácii nedokáže vymazať túto mapu pre jednotlivú inštanciu; v dev/test sa neukladajú do vyrovnávacej pamäte). Chyba API poskytne stránku namiesto toho, aby všetkých zamkla.
- **Prihlásení členovia vidia celú stránku.** Požiadavka s neuplynulou cookie `jwt` (funkcia `hasSession()` v middleware dekóduje hodnotu `exp` z payloadu bez overenia podpisu — ide o mäkkú bránu, nie o kontrolu prístupu) preskočí presmerovanie, takže po prihlásení sa člen vráti na stránku, ktorú požadoval, a uvidí bežné stránky, vstavané stránky (Skupiny, Kázne atď.) a navigáciu v hlavičke. Komponenty stránok a `Header` už samy nekontrolujú `hidePublicSite`.
- **`robots.txt`** zakazuje všetko, rovnako ako na hostiteľoch s noindex.
- **API.** `GET /content/pages/public/:churchId` (zoznam stránok pre sitemap) vracia `[]`, takže anonymní volajúci nemôžu vypísať stránky.

### Pridávanie `siteId`

`ConfigHelper` ukladá rozlíšený `siteId` do svojej `ConfigurationInterface` pre každú požiadavku (memoizované pomocou `cache()` z Reactu) a pripája `?siteId=` k volaniam obsahu, ktoré on a komponenty stránok robia — **podmienene**: prázdny `siteId` (subdoména primárneho kostola) vynechá parameter úplne. Endpointy, ktoré ho prenášajú, sú strom stránky (`/content/pages/:id/tree`), verejný zoznam stránok používaný sitemap (`/content/pages/public/:id`), globálne štýly (`/content/globalStyles/church/:id`), navigačné odkazy (`/content/links/church/:id`) a samostatný blok pätičky (`/content/blocks/public/footer/:id`). Pri bežnom vykresľovaní sa pätička dostane vnútri stromu stránky (sekcie označené `zone: "siteFooter"`), ktorý už bol načítaný s `siteId`, takže neexistuje žiadna medzera v pätičke bez rozsahu.

Portál pre členov (B1App `mobile`) je týmto zámerne vynechaný: `loadChurchAppearance.ts` rozlíši kostol cez `churches/lookup`, ale číta nastavenia na úrovni kostola `/settings/public/{id}` a nikdy neprenáša `siteId` — portál je v prvej verzii pre celý kostol (pozri nižšie).

## Viacero webov na kostol

### Dátový model

Nová tabuľka `membership.sites` je zámerne malá:

| Stĺpec | Typ | Poznámky |
|--------|-----|----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Vlastniaci kostol |
| `name` | `varchar(255)` | Zobrazovaný názov (napr. „Español“, „Youth“) |
| `subDomain` | `varchar(45)` | **Jedinečný index** — globálny menný priestor (nižšie) |

Rozsah stránky je potom daný jediným stĺpcom bez možnosti null, pridaným do obsahových a doménových tabuliek:

| Tabuľka (modul) | Stĺpec | `''` znamená |
|-----------------|--------|--------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Doména slúži primárnej stránke |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primárna stránka — a pri **`blocks`** `''` navyše znamená *zdieľané vo všetkých stránkach* |

Dve migrácie pridávajú všetko toto (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Pretože stĺpec má predvolenú hodnotu `''`, každý existujúci riadok si zachová dnešné správanie bez dodatočného dopĺňania dát.

**Globálny menný priestor subdomén.** `sites.subDomain` zdieľa *jeden* menný priestor s `churches.subDomain` — subdoména stránky sa nikdy nemôže zhodovať so subdoménou kostola ani so subdoménou inej stránky. Toto je vynútené na **oboch** cestách ukladania: `SiteController.save` odmietne slug, ktorý sa nachádza buď v `churches`, alebo v `sites`, a `ChurchController.validateSave` robí to isté opačným smerom. Jedinečný index na `sites.subDomain` to podopiera na úrovni databázy.

**Jedinečnosť stránok** bola rozšírená z `(churchId, url)` na `(churchId, siteId, url)`, takže dve stránky jedného kostola môžu mať každá vlastnú `/about`.

### Obsah pre jednotlivé stránky, so záložnými riešeniami

Každý koncový bod na **zoznam/strom** obsahu viazaný na stránku prijme voliteľný `?siteId=` (ak chýba ⇒ `''` = primárna): zoznam/strom stránok/verejné stránky, zoznam/podľa typu/pätička blokov, odkazy (anonymné / filtrované / všetky) a globálne štýly. Sekcie a prvky nie sú viazané priamo — dedia rozsah cez svoju nadradenú stránku alebo blok.

Dva reťazce rozlíšenia robia zaujímavú prácu:

- **Globálne štýly — `stránka → primárna → predvolená`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` vráti vlastný riadok stránky; ak sekundárna stránka žiadny nemá, vráti **primárny riadok (`''`) tak, ako je** (zachová `id`/`siteId` primárnej stránky, ktoré klient používa na copy-on-write); ak nie je ani primárny, `GlobalStyleController` vráti pevne zakódovanú predvolenú paletu a písma.
- **Blok pätičky — vyhráva pätička pre konkrétnu stránku, zdieľaná slúži ako záloha.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` vráti zdieľané riadky (`''`) *aj* riadky pre konkrétnu stránku; resolver vyberie vlastnú pätičku stránky, ak existuje, inak zdieľanú. Rovnaká logika beží v `TreeHelper.insertBlocks` (strom stránky) aj v samostatnom koncovom bode `/content/blocks/public/footer/:churchId`.

### Kaskáda pri zmazaní stránky

`SiteController.delete` (riadené oprávnením Nastavenia→Upraviť v členstve) zruší sekundárnu stránku v troch krokoch:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskádovo zmaže všetok obsah, ktorý stránka vlastní: jej **stránky** → ich sekcie, prvky, `pageHistory` a `posts`; jej vlastné **bloky** → ich sekcie, prvky a `pageHistory`; jej **odkazy** a **globalStyles**. Ochrana odmietne bežať pre `''` — primárny/zdieľaný sentinel sa nikdy nekaskáduje.
2. `DomainRepo.clearSiteId` **preradí** domény stránky späť na primárnu (`siteId → ''`) namiesto ich zmazania, takže vlastná doména prežije zmazanie stránky.
3. Riadok `sites` sa zmaže a trasy Caddy sa znovu synchronizujú (best-effort).

### Rozhranie B1Admin

| Schopnosť | Kde | Mechanizmus |
|-----------|-----|-------------|
| Prepínač stránok | `useSiteSelection` + `SiteSwitcher` (prázdne = „Hlavná webová stránka“) | Číta URL parameter `?site=` a prenáša ho ako `?siteId=` do volaní ContentApi. Nachádza sa v troch zoznamových sekciách stránok — **Stránky**, **Bloky**, **Vzhľad** — ale *nie* v editoroch stránok/blokov, ktoré nesú `siteId` vo svojom zázname |
| Vytvorenie/zmazanie stránok | `SitesDialog`, otvorený z položky „Spravovať weby…“ v prepínači | `POST /membership/sites` / `DELETE /membership/sites/:id` (názov + subDomain). Riadené oprávnením Nastavenia→Upraviť v členstve (`Permissions.settings.edit` na serveri; `Permissions.membershipApi.settings.edit` v B1Admin). **Iba vytváranie/mazanie — v prvej verzii nie je rozhranie na premenovanie** |
| Priradenie stránky k doméne | `DomainSettingsEdit` v Nastavenia→Domény | Rozbaľovací zoznam stránok pre každý riadok odošle `siteId` pre každú doménu na `/membership/domains`. Stĺpec sa skryje, ak API nevráti žiadne stránky (staršia backendová verzia) |
| Copy-on-write štýly | `StylesManager.prepareForSave` | Keď sa načítaný riadok globálnych štýlov `siteId` nezhoduje s vybranou stránkou (t. j. API vrátilo zdedenú primárnu stránku ako zálohu), zahodí `id` primárnej stránky a nastaví aktuálny `siteId`, čím vynúti **vloženie** nového riadku pre konkrétnu stránku namiesto prepísania primárnej. Rovnaké rozvetvenie pri nesúlade platí aj pre blok pätičky stránky |

:::info
**Čo zostáva v prvej verzii pre celý kostol (zámerné rozhodnutie o rozsahu, nie obmedzenie dátového modelu):** **blog** (`BlogPage` nemá prepínač a načítava `/posts` bez `siteId`), **widgety stránky** (banner s oznámením + spúšťač), **presmerovania**, **logo / GA4 / nastavenia kostola** a **portál pre členov** (mobilná aplikácia B1App). Pozor, toto *nie je* „celý Vzhľad“ — globálne štýly sekundárnej stránky (paleta, písma, typografia, medzery, navigácia, vlastné CSS) **sú** pre každú stránku osobitne cez copy-on-write cestu uvedenú vyššie; iba podpanely banneru/spúšťača/presmerovaní/loga na stránke Vzhľad zostávajú pre celý kostol.
:::

## Vlastné domény: okraj Caddy (plán statickej konfigurácie)

:::info
**Smer upravený 2026-07-02.** Skorší plán presunúť hosťovanie vlastných domén na domény spravované Vercelom bol **zrušený** a všetok kód na registráciu domén vo Verceli (`VercelHelper`, jeho premenné prostredia `vercelToken`/`vercelProjectId`/`vercelTeamId`, parametre SSM a záznamy o stave) bol odstránený z Api. Samostatne spravovaný **proxy server Caddy na EC2 zostáva** ako trvalý okraj pre vlastné domény. Zostáva iba interná práca: nahradiť *runtime* konfiguráciu Caddy cez admin API za *statickú* konfiguráciu, ktorá prežije reštarty.
:::

### Okraj

Každá vlastná doména kostola ukazuje DNS na jeden box na EC2 — `3.23.251.61`, dostupný aj ako `proxy.b1.church`. Obrazovka Nastavenia→Domény v B1Admin inštruuje kostoly, aby pridali apex `A → 3.23.251.61` alebo `CNAME → proxy.b1.church`. Caddy ukončuje TLS s certifikátom Let's Encrypt pre každú doménu, prepíše hlavičku `Host` na upstream `{sub}.b1.church` danej domény a reverzne preposiela do B1App — ktorá ju potom smeruje podľa časti názvu hostiteľa ako akúkoľvek natívnu subdoménu (pozri [Vlastné domény](#custom-domains) vyššie).

Mapovanie upstreamu pochádza z `DomainRepo.loadPairs`, ktorého výraz dial používa `COALESCE` na subdoménu priradenej stránky, takže doména smeruje na správnu *sekundárnu* stránku a v opačnom prípade na primárnu stránku kostola:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Riadky `www.*` sú z mapy vylúčené; Caddy obsluhuje `www.{host}` cez presmerovanie `302` na apex.

### Dva anonymné endpointy napájajú okraj

`DomainController` poskytuje dva neautentifikované, iba na čítanie určené endpointy, ktoré box spotrebúva priamo — anonymné z nevyhnutnosti, pretože okraj sa na ne dopytuje skôr, než existuje akýkoľvek kontext kostola:

| Endpoint | Vracia | Úloha |
|----------|--------|-------|
| `GET /membership/domains/authorize?domain=` | `200`, ak doména — alebo pri chybe `www.` jej holý apex — existuje v `domains`; inak `404` (vrátane prázdnej `domain`) | On-demand-TLS `ask` pre Caddy: kontrola zneužitia, ktorá rozhoduje, či vydať certifikát pre prichádzajúce SNI |
| `GET /membership/domains/hostmap` | `text/plain`, jeden zoradený riadok `{domain} {sub}.b1.church` pre každú smerovateľnú doménu | Súbor mapy host→upstream, ktorý box obnovuje časovačom |

`authorize` znovu používa `DomainRepo.loadByName` (presný hostiteľ, potom jedno opakovanie `www.`→apex); `hostmap` znovu používa `loadPairs` — takže je citlivá na stránku a vylučuje `www.*`, rovnako ako trasy proxy — a iba odstráni príponu `:443`.

### Uloženie/zmazanie domény — jedno best-effort odoslanie

`DomainController.save` zapíše riadky `domains` a potom urobí **jediné best-effort** volanie `CaddyHelper.updateCaddy()`, obalené do `try/catch`, ktorý zaznamená chybu (`console.error`) a potlačí ju; `delete` robí to isté (čím sa opravil aj predchádzajúci chybný stav zastaranej trasy pri mazaní), rovnako ako zmazanie sekundárnej stránky (`SiteController.delete`). Samotné `updateCaddy` je obmedzené **10s** časovým limitom Axios, takže nedostupný alebo zastavený Caddy nikdy nemôže vrátiť `500` pri uložení domény — tabuľka `domains` je zdrojom pravdy.

### Aktuálny stav — statická konfigurácia, žiadny runtime stav

Box (Windows EC2 za trvalou Elastic IP) spúšťa Caddy zo **statického Caddyfile**: on-demand TLS, ktorého `ask` ukazuje na `/membership/domains/authorize`, plus súbor mapy host→upstream, ktorý každých 5 minút obnovuje naplánovaná úloha z `/membership/domains/hostmap` a ktorá končí elegantným `caddy reload`. Konfigurácia prežije reštarty bez akéhokoľvek runtime stavu — žiadny opätovný „priming“ — a neznáma hodnota SNI je **odmietnutá na úrovni TLS** (pre hostiteľa, ktorý `authorize` odmietne, sa nevydá žiadny certifikát), zatiaľ čo autorizovaný, ale ešte nenamapovaný hostiteľ (nová doména v rámci okna synchronizácie) dostane čistú chybu 404. Nové domény sú smerovateľné do ~5 minút od uloženia; ich certifikáty sa vydajú pri prvom zásahu. Nastavenie a prevádzka, ako aj gotchas overené v praxi: [Proxy pre vlastnú doménu Caddy](../deployment/caddy-proxy.md).

### Starý runtime push — cesta na návrat, čaká na zmazanie

`CaddyHelper` (modul membership) môže stále riadiť Caddy cez jeho **admin API** na `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; nerobí nič, ak nie sú nastavené; zobrazuje sa v skupine Integrácie v `ServerHealthController`): `updateCaddy()` odošle PATCH celého poľa tras a `initializeCaddy()` spolu s koncovými bodmi `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` znovu vytvoria server s runtime konfiguráciou od nuly. Konfigurácia tohto režimu žila iba v pamäti Caddy — strata pamäte pri reštarte, ktorú táto architektúra nahradila. Mechanizmus zostáva iba ako cesta na návrat a je naplánovaný na zmazanie, keď bude statický box stabilný; best-effort push `updateCaddy()` pri uložení/zmazaní domény je neškodná operácia bez účinku voči statickému boxu (jeho admin API je dostupné iba z localhostu).

## Súvisiace stránky

- [Proxy pre vlastnú doménu Caddy](../deployment/caddy-proxy.md) — samotný okrajový box: nastavenie čerstvého boxu, služba WinSW, úloha synchronizácie mapy a prevádzkové gotchas
- [Tvorca webstránok](./website-builder.md) — strom stránok/sekcií/prvkov, renderery, blog, SEO a generovanie pomocou AI (čo sa vykreslí po tom, ako je požiadavka vyriešená na kostol/stránku)
- [Koncové body obsahu](../api/endpoints/content.md) — REST rozhranie pre stránky, bloky, odkazy a globálne štýly, všetky teraz rozpoznávajú `?siteId=`
- [B1App](../web-apps/b1-app.md) — aplikácia Next.js, ktorá hostí middleware a smerovanie `[sdSlug]`
- [Nasadenie webových aplikácií](../deployment/web-apps.md) — ako sa B1App nasadzuje do Vercelu
