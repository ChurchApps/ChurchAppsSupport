---
title: "Směrování webu a více webů"
---

# Směrování webu a více webů

<div class="article-intro">

Jeden sbor může nyní provozovat více než jeden samostatný web a každý z nich může být umístěn na subdoméně `*.b1.church` nebo na plně vlastní doméně sboru. Tato stránka popisuje směrovací vrstvu, která stojí *pod* tvorbou webu: jak se příchozí požadavek přiřadí ke sboru **a** ke konkrétnímu webu, datový model více webů (zástupná hodnota `siteId`, která zajišťuje, že se všechny dříve existující weby zobrazují beze změny), a okraj pro vlastní domény, tedy vlastní proxy Caddy na EC2, která ukončuje TLS a přepisuje každou doménu sboru na její nadřazený `*.b1.church`. Informace o tom, co se zobrazí poté, co je požadavek přiřazen, tedy strom stránek, sekcí a prvků, najdete v části [Tvorba webu](./website-builder).

</div>

## Přehled

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

Tři pravidla platí napříč touto vrstvou:

1. **Zástupná hodnota zajišťuje zpětnou kompatibilitu.** `siteId = ''` je hlavní web. Každá stránka, blok, odkaz, globální styl a řádek domény, který existoval před touto funkcí, má hodnotu `''` a zobrazuje se přesně tak jako dříve. *Druhý* web je jednoduše sada řádků s neprázdným `siteId` a každý koncový bod obsahu volaný bez `?siteId=` vrátí hlavní web, tedy bajt po bajtu stejný požadavek jako dříve.
2. **Směrování vychází z názvu hostitele a sbíhá se.** Subdoména `*.b1.church` se směruje přímo podle prvního štítku svého hostitele. Vlastní doména je na okraji Caddy přepsána na štítek `{sub}.b1.church` dříve, než ji B1App uvidí (s vyhledáním v databázi v middleware, které nastaví hlavičku `x-site` jako záložní řešení pro jakýkoli surový vlastní `Host`). Obě cesty končí na stejné trase `[sdSlug]` a stejném volání `churches/lookup`, takže následné vykreslování je totožné.
3. **Okraj Caddy je bezstavový nad jediným zdrojem pravdy.** Vlastní domény končí na vlastní proxy Caddy na EC2, která přepisuje každou doménu na její upstream `{sub}.b1.church`. Uložení domény spustí jediné best-effort volání `CaddyHelper.updateCaddy()` a Caddy navíc čte tabulku `domains` přímo (koncové body `authorize` a `hostmap` níže). Tabulka je autoritativní, takže nedostupný Caddy nikdy nemůže způsobit selhání uložení.

## Výběr webu

### Subdomény `*.b1.church`

`B1App/next.config.mjs` přepisuje příchozí požadavky podle hostitele. Pravidlo hostitele se vzorem `(?<subdomain>.*?)\..*` zachytí **první štítek** hostitele a přepíše `/` a `/:path*` na `/{subdomain}`, tedy na segment App Routeru `[sdSlug]`. Takže `grace.b1.church/about` se stane `/grace/about`.

Uvnitř `src/app/[sdSlug]/` volá `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) endpoint `GET /membership/churches/lookup/?subDomain={sdSlug}`. Odpověď `ChurchController.getBySubDomain` má nyní dvě větve:

| Slug odpovídá | Odpověď | Význam |
|--------------|---------|--------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hlavní web daného sboru |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Sekundární web**: kontroler se vrátí k `sites`, zjistí vlastnící sbor a vrátí dotazovaný slug spolu s dodatečným `siteId` |

Ten dodatečný `siteId` je jediná věc, která odlišuje požadavek na sekundární web od požadavku na hlavní web. Vše ostatní v cestě zpracování je sdíleno.

Slug, který neodpovídá žádné tabulce, se vrátí jako `{}` se stavem `200`. `ConfigHelper.load` považuje odpověď bez `id` za neznámý web a volá `notFound()` z Nextu. Neznámá subdoména tak dostane skutečnou chybu 404 místo toho, aby každé další volání dotazovalo `/…/undefined`. Trasa stránky tvorby také sestavuje cestu stromu pomocí `pageTreePath()` (`src/helpers/pageTreePath.ts`), která URL-kóduje slug. Chybný slug (zpětná lomítka, mezery) tak vrátí 404 místo toho, aby se chyba `400` z API projevila jako 500.

### Vlastní domény

Vlastní doména sboru končí na **okraji Caddy** (podrobnosti níže), který přepíše hlavičku `Host` na `{sub}.b1.church` daného webu, než požadavek přepošle do B1App. Na běžné cestě tedy B1App dostane *interního* hostitele `*.b1.church` a přeloží ho podle prvního štítku úplně stejně jako nativní subdoménu. Vyhledání v databázi v middleware se nikdy nespustí. `src/middleware.ts` běží stále u každého požadavku, ale má jednu vždy aktivní úlohu a jeden záložní postup:

1. **Vždy** smaže **jakoukoli hlavičku `x-site` poslanou klientem**. Tato hlavička je falšovatelný vstup pro přepisování a je důvěryhodná pouze tehdy, když ji nastaví samotný middleware. Její odstranění je skutečná úloha middleware za Caddy.
2. **Záloha, pouze pro neinterní `Host`.** U surového `Host` vlastní domény, který dorazí do B1App *bez* přepisu Caddy, zavolá `GET /membership/domains/public/lookup/{host}` a pokud vrátí `subDomain`, nastaví `x-site: {subDomain}.b1.church`. Za Caddy je tato větev neaktivní, protože `Host` je již `*.b1.church`.

Interní hostitelé (`localhost`, `b1.church` a přípony `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app`) přeskočí vyhledání úplně. Jsou již přeloženi přepisem podle prvního štítku nebo jsou náhledovými či nasazovacími hostiteli.

Samotné vyhledání (`DomainRepo.loadByName`) provádí left join `domains → churches` a `domains → sites` a vrací `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`. Vrací tedy subdoménu přiřazeného sekundárního webu, pokud doména na nějaký ukazuje, jinak subdoménu sboru. Nejprve hledá přesnou shodu hostitele. Pokud hostitel začínal na `www.` a nic nenašel, zkusí **jednou** ještě holou apex doménu.

Zpět v `next.config.mjs` jsou pravidla přepisu `x-site` umístěna **před** obecnými pravidly hostitele, takže mají přednost. `x-site: grace.b1.church` → první štítek `grace` → `[sdSlug] = grace`. Odtud je přeložení totožné s cestou přes subdoménu (stejné `churches/lookup`, stejné `siteId`).

:::info
Hlavička `x-site` je zvenčí nedůvěryhodná. Middleware bezpodmínečně odstraní každou příchozí hlavičku `x-site`, než případně nastaví svou vlastní. Pravidla přepisu vidí pouze hodnotu nastavenou middleware, takže klient nemůže vnutit sebe na obsah jiného sboru tím, že pošle hlavičku.
:::

Dva provozní detaily middleware:

- **Mezipaměť.** Výsledek pro každého hostitele (zásah *nebo* potvrzená neshoda, nikdy síťová chyba) se ukládá do paměťové `Map` na **10 minut**, pro každou serverless izolaci.
- **Matcher.** Matcher záměrně znovu zahrnuje `/sitemap.xml`, `/robots.txt` a `/manifest.webmanifest`. Jeho první vzor vylučuje cesty s tečkou, které by jinak tyto soubory vyřadily. Jsou přidány zpět, aby soubory SEO/PWA na vlastní doméně sboru také dostaly hlavičku `x-site`.
- **Kanonická hlavička.** U stránek sboru middleware připojí k odpovědi hlavičku `Link: <{proto}://{host}{path}>; rel="canonical"`, která uvádí hostitele, ze kterého byla stránka skutečně doručena: subdoménu nebo vlastní doménu (`helpers/canonicalLink.ts`). Když vlastní doména dorazí do B1App přes [proxy Caddy](../deployment/caddy-proxy.md), je hostitelem požadavku subdoména `{sub}.b1.church`. Middleware proto místo toho použije doménu návštěvníka z `X-Church-Host`, ale až poté, co `/domains/public/lookup/{host}` potvrdí, že tato doména mapuje na stejnou subdoménu (`ownsSubdomain()`). Kanonický odkaz, `robots.txt` a `sitemap.xml` pak uvádějí vlastní doménu namísto subdomény `b1.church`. Hlavička se přeskakuje u hostitelů, kteří nejsou sbory (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`), a na `/mobile`, `/login`, `/logout` a vygenerovaných souborech robots, sitemap a manifest.

### Vypnutý veřejný web

Sbor může v B1Admin zapnout **Disable Public Website** (nastavení obsahu na úrovni sboru `hidePublicSite = "true"`). Web pak zobrazuje pouze trasy pro členy:

- **Middleware B1App** vyhledá subdoménu (`/membership/churches/lookup` a poté `/content/settings/public/:churchId`) a přesměruje anonymní požadavky na jakoukoli cestu mimo povolený seznam na `/login?returnUrl={path}{query}`. Povolený seznam (`helpers/publicSite.ts`) tvoří `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` a soubory manifest, robots a sitemap. Ukládají se pouze potvrzené odpovědi, a to 60 sekund v produkci, protože volání revalidate z administrace nemůže vyčistit tuto mapu jedné instance. V dev/test prostředí se neukládají. Chyba API způsobí zobrazení webu, aby nikdo nebyl zamčen venku.
- **Přihlášení členové vidí celý web.** Požadavek s nevypršelým cookie `jwt` přeskočí přesměrování. Funkce middleware `hasSession()` dekóduje `exp` z payloadu bez ověření podpisu, takže jde o měkkou bránu, nikoli o řízení přístupu. Člen se po přihlášení vrátí na stránku, kterou požadoval, a uvidí běžné stránky, vestavěné stránky (Skupiny, Kázání apod.) a navigaci v záhlaví. Komponenty stránek ani `Header` už samy `hidePublicSite` nekontrolují.
- **`robots.txt`** zakazuje vše, stejně jako na hostitelích s noindex.
- **API.** `GET /content/pages/public/:churchId` (seznam stránek pro mapu webu) vrací `[]`, takže anonymní volající nemohou stránky vypsat.

### Předávání `siteId`

`ConfigHelper` ukládá přeložené `siteId` do svého `ConfigurationInterface` pro každý požadavek (memoizováno pomocí `cache()` z Reactu). Připojuje `?siteId=` k volání obsahu, které on sám a komponenty stránek provádějí, a to **podmíněně**: prázdné `siteId` (subdoména hlavního sboru) parametr vynechá úplně. Předávané koncové body jsou strom stránek (`/content/pages/:id/tree`), veřejný seznam stránek používaný mapou webu (`/content/pages/public/:id`), globální styly (`/content/globalStyles/church/:id`), navigační odkazy (`/content/links/church/:id`) a samostatný blok patičky (`/content/blocks/public/footer/:id`). Na běžné cestě vykreslení přichází patička uvnitř stromu stránek (sekce označené `zone: "siteFooter"`), již načtená s `siteId`. Neexistuje tedy žádná mezera v patičce bez rozsahu.

Členský portál (B1App `mobile`) je záměrně mimo tento mechanismus. `loadChurchAppearance.ts` přeloží sbor přes `churches/lookup`, ale čte nastavení na úrovni sboru z `/settings/public/{id}` a `siteId` nikdy nepředává. Portál je v první verzi pro celý sbor (viz níže).

## Více webů na jednom sboru

### Datový model

Nová tabulka `membership.sites` je záměrně malá:

| Sloupec | Typ | Poznámky |
|---------|-----|----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Vlastnící sbor |
| `name` | `varchar(255)` | Zobrazovaný název (např. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Jedinečný index**, globální jmenný prostor (níže) |

Rozsah webu je pak určen jediným sloupcem přidaným do tabulek obsahu a domén, který nemůže být NULL:

| Tabulka (modul) | Sloupec | Význam `''` |
|-----------------|---------|-------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Doména slouží hlavnímu webu |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hlavní web. U **`blocks`** `''` navíc znamená *sdíleno napříč všemi weby* |

Dvě migrace přidají všechno toto (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Protože sloupec má výchozí hodnotu `''`, každý existující řádek si zachová dnešní chování bez doplňování dat.

**Globální jmenný prostor subdomén.** `sites.subDomain` sdílí *jeden* jmenný prostor s `churches.subDomain`. Subdoména webu se tedy nikdy nemůže shodovat se subdoménou sboru nebo jiného webu. Vynucuje se to na **obou** cestách ukládání: `SiteController.save` odmítne slug, který zasáhne buď `churches`, nebo `sites`, a `ChurchController.validateSave` dělá totéž obráceně. Jedinečný index na `sites.subDomain` to podpírá na úrovni databáze.

**Jedinečnost stránek** se rozšířila z `(churchId, url)` na `(churchId, siteId, url)`, takže dva weby jednoho sboru mohou mít každý svůj vlastní `/about`.

### Obsah pro každý web se záložními řešeními

Každý koncový bod pro **seznam nebo strom** obsahu v rámci webu přijímá volitelné `?siteId=` (chybí ⇒ `''` = hlavní). Jde o strom, seznam a veřejné stránky, seznam bloků, bloky podle typu a patičku, dále odkazy (anonymní, filtrované, všechny) a globální styly. Sekce a prvky se přímo *nevymezují*. Dědí přes svou nadřazenou stránku nebo blok.

Dva řetězce překladu dělají zajímavou práci:

- **Globální styly: `web → hlavní → výchozí`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` vrátí vlastní řádek webu. Pokud sekundární web žádný nemá, vrátí **řádek hlavního webu (`''`) tak, jak je**, s jeho `id` a `siteId`, které klient použije pro copy-on-write. Pokud není ani hlavní řádek, `GlobalStyleController` vrátí pevně zakódovanou výchozí paletu a písma.
- **Blok patičky: přednost má patička daného webu, sdílená je záložní.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` vrátí sdílené řádky (`''`) *i* řádky specifické pro web. Resolver vybere vlastní patičku webu, pokud existuje, jinak sdílenou. Stejná logika běží v `TreeHelper.insertBlocks` (strom stránek) i v samostatném endpointu `/content/blocks/public/footer/:churchId`.

### Kaskáda při smazání webu

`SiteController.delete` (povoleno oprávněním Settings→Edit v modulu členství) odstraní sekundární web ve třech krocích:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskádově smaže veškerý obsah, který web vlastní. Jeho **stránky** se smažou spolu se sekcemi, prvky, `pageHistory` a `posts`. Jeho vlastní **bloky** se smažou spolu se sekcemi, prvky a `pageHistory`. Smažou se také jeho **odkazy** a **globalStyles**. Ochrana odmítne běžet pro `''`, protože zástupná hodnota hlavního a sdíleného obsahu se nikdy nekaskádově nemaže.
2. `DomainRepo.clearSiteId` **přiřadí** domény webu zpět hlavnímu webu (`siteId → ''`) místo jejich smazání, takže vlastní doména přežije smazání webu.
3. Řádek `sites` se smaže a trasy Caddy se znovu synchronizují (best-effort).

### Rozhraní B1Admin

| Funkce | Kde | Mechanismus |
|--------|-----|-------------|
| Přepínač webu | `useSiteSelection` + `SiteSwitcher` (prázdné = "Main Website") | Čte parametr URL `?site=` a předává ho jako `?siteId=` do volání ContentApi. Je k dispozici u tří seznamových oblastí webu, tedy **Pages**, **Blocks** a **Appearance**, ale *ne* v editorech stránek a bloků, které nesou `siteId` v záznamu |
| Vytváření a mazání webů | `SitesDialog`, otevřený z položky „Manage websites…" v přepínači | `POST /membership/sites` / `DELETE /membership/sites/:id` (název a subDomain). Povoleno oprávněním Settings→Edit v modulu členství (`Permissions.settings.edit` na serveru; `Permissions.membershipApi.settings.edit` v B1Admin). **Pouze vytváření a mazání. V první verzi není UI pro přejmenování** |
| Přiřazení webu k doméně | `DomainSettingsEdit` v Settings→Domains | Rozbalovací nabídka webu v každém řádku odešle `siteId` pro každou doménu na `/membership/domains`. Sloupec se skryje, pokud API nevrátí žádné weby (starší backend) |
| Copy-on-write styly | `StylesManager.prepareForSave` | Když se `siteId` načteného řádku globálních stylů neshoduje s vybraným webem (tj. API vrátilo zděděný hlavní web jako záložní), zahodí `id` hlavního webu a nastaví aktuální `siteId`. Tím vynutí **vložení** nového řádku specifického pro web místo přepsání hlavního. Stejná logika větvení při neshodě platí i pro blok patičky webu |

:::info
**Co zůstává v první verzi na úrovni celého sboru** (záměrné rozhodnutí o rozsahu, nikoli omezení datového modelu): **blog** (`BlogPage` nemá přepínač a načítá `/posts` bez `siteId`), **widgety webu** (banner oznámení a spouštěč), **přesměrování**, **logo, GA4 a nastavení sboru** a **členský portál** (B1App mobile). Není to ale celý Appearance. Globální styly sekundárního webu (paleta, písma, typografie, rozestupy, navigace, vlastní CSS) **jsou** pro každý web díky výše popsané cestě copy-on-write. Na úrovni sboru zůstávají jen podpanely banneru, spouštěče, přesměrování a loga na stránce Appearance.
:::

## Vlastní domény: okraj Caddy (plán statické konfigurace)

:::info
**Směr revidován 2026-07-02.** Dřívější plán přesunout hostování vlastních domén na domény spravované Vercelem byl **zrušen**. Veškerý kód pro registraci domén na Vercelu (`VercelHelper`, jeho proměnné prostředí `vercelToken`, `vercelProjectId` a `vercelTeamId`, parametry SSM a položky stavu) byl z Api odstraněn. Vlastní **proxy Caddy na EC2 zůstává** jako trvalý okraj pro vlastní domény. Zbývající práce je pouze interní: nahrazení *běhové* konfigurace administračního API Caddy *statickou* konfigurací, která přežije restarty.
:::

### Okraj

Každá vlastní doména sboru směřuje DNS na jediný box EC2, `3.23.251.61`, dostupný také jako `proxy.b1.church`. Obrazovka Settings→Domains v B1Admin navádí sbory přidat apex `A → 3.23.251.61` nebo `CNAME → proxy.b1.church`. Caddy ukončuje TLS certifikátem Let's Encrypt pro každou doménu, přepíše hlavičku `Host` na upstream `{sub}.b1.church` dané domény a přepošle požadavek do B1App. Ta jej poté směruje podle prvního štítku stejně jako jakoukoli nativní subdoménu (viz výše [Vlastní domény](#vlastní-domény)).

Mapování upstreamu pochází z `DomainRepo.loadPairs`. Jeho `dial` **COALESCE-uje subdoménu přiřazeného webu**, takže doména se proxuje na správný *sekundární* web. Jinak se proxuje na hlavní web sboru:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Řádky `www.*` jsou z mapy vynechány. Caddy obsluhuje `www.{host}` přesměrováním `302` na apex.

### Dva anonymní koncové body pro okraj

`DomainController` vystavuje dva nepřihlášené, pouze čtecí koncové body, které box spotřebovává přímo. Jsou anonymní z nutnosti, protože okraj se na ně dotazuje dříve, než existuje jakýkoli kontext sboru:

| Koncový bod | Vrací | Role |
|-------------|-------|------|
| `GET /membership/domains/authorize?domain=` | `200`, pokud doména (nebo u chybějící shody s `www.` její holá apex) existuje v `domains`. Jinak `404`, včetně prázdné `domain`. | **On-demand-TLS `ask`** Caddy: ochrana proti zneužití, která rozhoduje, zda vystavit certifikát pro příchozí SNI |
| `GET /membership/domains/hostmap` | `text/plain`, jeden seřazený řádek `{domain} {sub}.b1.church` na každou směrovatelnou doménu | Soubor mapy hostitel→upstream, který box obnovuje časovačem |

`authorize` znovu používá `DomainRepo.loadByName` (přesná shoda hostitele, poté jedno opakování `www.`→apex). `hostmap` znovu používá `loadPairs`, takže je závislý na webu a vynechává `www.*`, stejně jako proxy trasy. Pouze odstraní příponu `:443`.

### Uložení a smazání domény: jedno best-effort odeslání

`DomainController.save` zapíše řádky `domains` a poté provede **jediné best-effort** volání `CaddyHelper.updateCaddy()`. To je obaleno do `try/catch`, které chybu zaloguje (`console.error`) a pohltí. `delete` dělá totéž, čímž se také opravila dřívější chyba se zastaralou trasou po smazání. Stejně postupuje i smazání sekundárního webu (`SiteController.delete`). Samotné `updateCaddy` je omezeno časovým limitem Axiosu **10 s**, takže nedostupný nebo zastavený Caddy nemůže způsobit chybu `500` při uložení domény. Zdrojem pravdy je tabulka `domains`.

### Aktuální stav: statická konfigurace, žádný běhový stav

Box (Windows EC2 za trvalou Elastic IP) provozuje Caddy ze **statického Caddyfile**. Obsahuje TLS na vyžádání, jehož `ask` ukazuje na `/membership/domains/authorize`, a soubor mapy hostitel→upstream. Ten každých 5 minut obnovuje z `/membership/domains/hostmap` naplánovaná úloha, která končí elegantním `caddy reload`. Konfigurace přežije restarty bez jakéhokoli běhového stavu, takže není potřeba žádné opětovné „priming". Neznámé SNI je **odmítnuto na úrovni TLS**, protože pro hostitele, který `authorize` odmítne, se nevytvoří žádný certifikát. Autorizovaný, ale zatím nenamapovaný hostitel (zcela nová doména v okně synchronizace) dostane čistou chybu 404. Nové domény jsou směrovatelné do ~5 minut od uložení. Jejich certifikáty se vytvoří při prvním zásahu. Nastavení a sestavení, provoz a ověřená úskalí: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Starší běhové odesílání: cesta pro návrat, čeká na smazání

`CaddyHelper` (modul membership) může stále řídit Caddy přes **administrační API** na `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; nedělá nic, pokud nejsou nastaveny; zobrazuje se ve skupině Integrations v `ServerHealthController`). `updateCaddy()` provede PATCH celého pole tras. `initializeCaddy()` spolu s koncovými body `GET /membership/domains/caddy/init` a `GET /membership/domains/caddy` vytvoří běhově nakonfigurovaný server od nuly. Konfigurace tohoto režimu žila pouze v paměti Caddy. Šlo tedy o zapomínání při restartu, které tato architektura nahradila. Zbytek mechanismu zůstává pouze jako cesta pro návrat a je naplánován ke smazání, jakmile bude statický box stabilní. Best-effort odeslání `updateCaddy()` při uložení nebo smazání domény je vůči statickému boxu neškodná operace bez efektu, protože jeho administrační API je dostupné jen z localhostu.

## Související stránky

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy): samotný okrajový box, tedy čerstvé nastavení, služba WinSW, úloha synchronizace mapy a provozní úskalí
- [Tvorba webu](./website-builder): strom stránek, sekcí a prvků, renderery, blog, SEO a generování pomocí AI (co se zobrazí poté, co je požadavek přiřazen ke sboru nebo webu)
- [Content Endpoints](../api/endpoints/content): REST rozhraní pro stránky, bloky, odkazy a globální styly, nyní všechny rozpoznávají `?siteId=`
- [B1App](../web-apps/b1-app): aplikace Next.js, která hostí middleware a směrování `[sdSlug]`
- [Nasazení webových aplikací](../deployment/web-apps): jak se B1App nasazuje na Vercel
