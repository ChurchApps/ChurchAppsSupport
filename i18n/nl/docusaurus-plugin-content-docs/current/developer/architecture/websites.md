---
title: "Websiteroutering & Multi-Site"
description: "Hoe B1.church subdomeinen en eigen domeinen koppelt aan de juiste kerk of secundaire site, en de Caddy-edge die TLS voor eigen domeinen afhandelt."
---

# Websiteroutering & Multi-Site

<div class="article-intro">

Een enkele kerk kan nu meer dan één afzonderlijke website hebben, en elk daarvan kan op een `*.b1.church`-subdomein staan of op een volledig eigen, door de kerk beheerd domein. Deze pagina beschrijft de routeringslaag die *onder* de builder ligt: hoe een binnenkomend verzoek wordt omgezet naar een kerk **en** naar een specifieke site, het multi-site datamodel (de `siteId`-sentinel die ervoor zorgt dat elke bestaande site ongewijzigd wordt weergegeven), en de edge voor eigen domeinen: een zelfbeheerde Caddy-proxy op EC2 die TLS beëindigt en elk kerkdomein herschrijft naar zijn `*.b1.church`-upstream. Voor wat er daadwerkelijk wordt weergegeven zodra een verzoek is omgezet, de pagina-, sectie- en elementstructuur, zie [Websitebouwer](./website-builder.md).

</div>

## Overzicht

```
   grace.b1.church              www.gracechurch.org  (eigen domein)
   (b1.church-subdomein)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy-edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • beëindigt TLS (per-domein LE-cert)     │
          │             │  • herschrijft Host → {sub}.b1.church     │
          │             │  • reverse-proxy naar B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • altijd: verwijder door client meegestuurde x-site (anti-spoof) │
   │  • interne *.b1.church Host ⇒ domeinopzoeking blijft inactief │
   │  • ruwe eigen Host (zonder Caddy) ⇒ opzoeking → zet x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host-eerste-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   geeft ?siteId= door aan elke content-aanroep:  │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domein opslaan/verwijderen (B1Admin Instellingen→Domeinen → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (ingepakt, niet-fataal, 10s timeout)
  Caddy leest de domeintabel zelf via twee anonieme endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 bekend / 404 onbekend)
        GET /membership/domains/hostmap    — host→{sub}.b1.church-kaart (vernieuwing elke 5 min)
```

Drie regels gelden binnen deze laag:

1. **Een sentinel zorgt voor achterwaartse compatibiliteit.** `siteId = ''` is de primaire site. Elke pagina, blok, link, globale stijl en domeinrij die bestond vóór deze functie, heeft `''` en wordt precies zoals voorheen weergegeven. Een *tweede* website is simpelweg een set rijen met een niet-lege `siteId`, en elk content-endpoint dat zonder `?siteId=` wordt aangeroepen, geeft de primaire site terug, byte voor byte hetzelfde als het oude verzoek.
2. **Routering is gebaseerd op het hostlabel en convergeert.** Een `*.b1.church`-subdomein wordt rechtstreeks op basis van zijn hostlabel gerouteerd. Een eigen domein wordt aan de Caddy-edge herschreven naar zijn `{sub}.b1.church`-label voordat B1App het ziet (met een middleware-databaseopzoeking die een `x-site`-header instelt als terugvaloptie voor elke ruwe eigen `Host`). Beide paden komen uit op dezelfde `[sdSlug]`-route en dezelfde `churches/lookup`-aanroep, zodat de weergave daarna identiek is.
3. **De Caddy-edge is stateless boven één bron van waarheid.** Eigen domeinen eindigen bij een zelfbeheerde Caddy-proxy op EC2 die elk domein herschrijft naar zijn `{sub}.b1.church`-upstream. Bij het opslaan van een domein wordt één best-effort `CaddyHelper.updateCaddy()` uitgevoerd, en Caddy leest de `domains`-tabel ook rechtstreeks (de endpoints `authorize` en `hostmap` hieronder). De tabel is leidend: een onbereikbare Caddy kan een opslagactie nooit laten mislukken.

## Sitesroutering

### `*.b1.church`-subdomeinen

`B1App/next.config.mjs` herschrijft binnenkomende verzoeken op basis van de host. Een hostregel met het patroon `(?<subdomain>.*?)\..*` vangt het **eerste label** van de host op en herschrijft `/` en `/:path*` naar `/{subdomain}`, het `[sdSlug]`-segment van de App Router. Dus `grace.b1.church/about` wordt `/grace/about`.

Binnen `src/app/[sdSlug]/` roept `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` aan. De respons van `ChurchController.getBySubDomain` heeft nu twee takken:

| Slug komt overeen met | Respons | Betekenis |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primaire site van die kerk |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Een **secundaire site**. De controller valt terug op `sites`, zoekt de eigenaar-kerk op en geeft de opgevraagde slug plus de extra `siteId` terug |

Die extra `siteId` is het enige dat een verzoek naar een secundaire site onderscheidt van een verzoek naar de primaire site. Al het overige in de pijplijn is gedeeld.

Een slug die in geen van beide tabellen voorkomt, komt terug als `{}` met een `200`. `ConfigHelper.load` behandelt een respons zonder `id` als een onbekende site en roept Next's `notFound()` aan. Een onbekend subdomein krijgt zo een echte 404 in plaats van dat alle volgende aanroepen naar `/…/undefined` vragen. De route van de websitebouwerpagina bouwt zijn boompad ook met `pageTreePath()` (`src/helpers/pageTreePath.ts`), dat de slug URL-codeert. Een misvormde slug (backslashes, spaties) geeft daardoor een 404 in plaats van dat de `400` van de API als een 500 aan de gebruiker wordt getoond.

### Eigen domeinen

Een eigen domein van een kerk eindigt bij de **Caddy-edge** (hieronder beschreven), die de `Host`-header herschrijft naar het `{sub}.b1.church` van de site voordat het naar B1App wordt geproxied. Op het normale pad ontvangt B1App dus een *interne* `*.b1.church`-host en routeert die op hostlabel, precies zoals een eigen subdomein. De databaseopzoeking van de middleware wordt dan nooit uitgevoerd. `src/middleware.ts` draait nog steeds bij elk verzoek, maar met één altijd actieve taak en één terugvaloptie:

1. **Altijd**: het **verwijdert elke door de client meegestuurde `x-site`-header**. Die header is vervalsbare herschrijvingsinvoer en wordt alleen vertrouwd als de middleware hem zelf instelt. Dit verwijderen is de echte taak van de middleware achter Caddy.
2. **Terugval, alleen bij een niet-interne `Host`**: voor een ruwe eigen-domein-`Host` die B1App bereikt *zonder* Caddy's herschrijving, roept het `GET /membership/domains/public/lookup/{host}` aan. Als dat een `subDomain` teruggeeft, wordt `x-site: {subDomain}.b1.church` ingesteld. Achter Caddy is deze tak inactief, omdat de `Host` al `*.b1.church` is.

Interne hosts (`localhost`, `b1.church`, en de suffixen `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app` en `.vercel.app`) slaan de opzoeking helemaal over. Ze worden al door de herschrijving op hostlabel afgehandeld, of het zijn preview- of deployhosts.

De opzoeking zelf (`DomainRepo.loadByName`) doet een left join van `domains → churches` en `domains → sites` en geeft `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` terug. Dat is het subdomein van de toegewezen secundaire site als het domein naar een secundaire site verwijst, anders dat van de kerk. Eerst wordt de exacte host gezocht. Als die host met `www.` begon en niets vond, wordt er **één keer** opnieuw gezocht op het kale apex-domein.

In `next.config.mjs* staan de `x-site`-herschrijfregels **vóór** de generieke hostregels, zodat zij voorrang krijgen. `x-site: grace.b1.church` → eerste label `grace` → `[sdSlug] = grace`. Vanaf daar is de routering identiek aan het subdomeinpad (dezelfde `churches/lookup`, dezelfde `siteId`).

:::info
De `x-site`-header is van buitenaf niet vertrouwd. De middleware verwijdert onvoorwaardelijk elke binnenkomende `x-site` voordat hij eventueel zijn eigen waarde instelt, en de herschrijfregels zien alleen de door de middleware ingestelde waarde. Een client kan zichzelf dus niet op de content van een andere kerk plaatsen door een header mee te sturen.
:::

Twee operationele details van de middleware:

- **Cache.** Het resultaat per host (een treffer *of* een bevestigde mislukte opzoeking, nooit een netwerkfout) wordt **10 minuten** gecachet in een in-memory `Map`, per serverless-isolate.
- **Matcher.** De matcher neemt bewust `/sitemap.xml`, `/robots.txt` en `/manifest.webmanifest` opnieuw op. Het eerste patroon sluit paden met een punt uit, wat die bestanden anders zou laten vallen. Ze worden teruggezet, zodat de SEO- en PWA-bestanden van een kerk op een eigen domein ook de `x-site`-header ontvangen.
- **Canonieke header.** Voor kerkpagina's voegt de middleware een responsheader `Link: <{proto}://{host}{path}>; rel="canonical"` toe. Die noemt de host waarop de pagina daadwerkelijk werd geserveerd: subdomein of eigen domein (`helpers/canonicalLink.ts`). Wanneer een eigen domein via de [Caddy-proxy](../deployment/caddy-proxy.md) bij B1App aankomt, is de verzoekhost het `{sub}.b1.church`-subdomein. De middleware gebruikt daarom het domein van de bezoeker uit `X-Church-Host`, maar pas nadat `/domains/public/lookup/{host}` bevestigt dat dat domein naar hetzelfde subdomein wijst (`ownsSubdomain()`). De canonieke link, `robots.txt` en `sitemap.xml` noemen dan het eigen domein in plaats van het `b1.church`-subdomein. Op niet-kerkhosts (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) en op `/mobile`, `/login`, `/logout` en de gegenereerde robots-, sitemap- en manifestbestanden wordt dit overgeslagen.

### Openbare website uitgeschakeld

Een kerk kan in B1Admin **Openbare website uitschakelen** aanzetten (een instelling op kerkniveau: `hidePublicSite = "true"`). De site toont dan alleen de routes voor leden:

- **De middleware van B1App** zoekt het subdomein op (`/membership/churches/lookup`, daarna `/content/settings/public/:churchId`) en stuurt anonieme verzoeken naar elk pad buiten de toegestane lijst door naar `/login?returnUrl={path}{query}`. De toegestane lijst (`helpers/publicSite.ts`) bestaat uit `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` en de manifest-, robots- en sitemapbestanden. Alleen bevestigde antwoorden worden gecachet, 60 seconden in productie, omdat de revalidate-aanroep van de beheerder deze per-instance map niet kan wissen. In dev/test wordt niets gecachet. Een API-fout toont de site in plaats van iedereen buiten te sluiten.
- **Ingelogde leden zien de volledige site.** Een verzoek met een niet-verlopen `jwt`-cookie slaat de redirect over. (De `hasSession()`-functie van de middleware decodeert de `exp` van de payload zonder de handtekening te controleren. Dit is een zachte poort, geen toegangscontrole.) Na het inloggen keert een lid dus terug naar de pagina die hij opvroeg en ziet hij de normale pagina's, ingebouwde pagina's (Groepen, Preken enz.) en de navigatie in de header. De paginacomponenten en `Header` controleren `hidePublicSite` zelf niet meer.
- **`robots.txt`** blokkeert alles, zoals op noindex-hosts.
- **API.** `GET /content/pages/public/:churchId` (de paginalijst van de sitemap) geeft `[]` terug, zodat anonieme aanroepers de pagina's niet kunnen opvragen.

### `siteId`-doorgifte

`ConfigHelper` slaat de opgeloste `siteId` op in zijn `ConfigurationInterface` per verzoek (gememoïseerd met React `cache()`) en voegt `?siteId=` toe aan de contentaanroepen die het en de paginacomponenten doen. Dat gebeurt **voorwaardelijk**: een lege `siteId` (een subdomein van de primaire kerk) laat de parameter helemaal weg. De endpoints die de `siteId` doorgeven zijn de paginaboom (`/content/pages/:id/tree`), de openbare paginalijst die de sitemap gebruikt (`/content/pages/public/:id`), globale stijlen (`/content/globalStyles/church/:id`), navigatielinks (`/content/links/church/:id`) en het losse footerblok (`/content/blocks/public/footer/:id`). Op het normale renderpad komt de footer binnen in de paginaboom (secties gemarkeerd met `zone: "siteFooter"`), die al met `siteId` is opgehaald. Er is dus geen footer die zonder scope wordt geladen.

Het ledenportaal (B1App `mobile`) valt hier bewust buiten. `loadChurchAppearance.ts` zoekt de kerk op via `churches/lookup`, maar leest de instellingen op kerkniveau via `/settings/public/{id}` en geeft nooit `siteId` door. Het portaal geldt in v1 voor de hele kerk (zie hieronder).

## Meerdere websites per kerk

### Datamodel

De nieuwe tabel `membership.sites` is bewust klein:

| Kolom | Type | Opmerkingen |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Eigenaar-kerk |
| `name` | `varchar(255)` | Weergavenaam (bijv. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unieke index**: globale naamruimte (hieronder) |

De scope per site wordt daarna geregeld met één kolom zonder null-waarden die aan de content- en domeintabellen is toegevoegd:

| Tabel (module) | Kolom | Betekenis van `''` |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domein bedient de primaire site |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primaire site. Bij **`blocks`** betekent `''` bovendien *gedeeld over alle sites* |

Twee migraties voegen dit allemaal toe (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Omdat de kolom standaard `''` is, behoudt elke bestaande rij het huidige gedrag, zonder backfill.

**Globale subdomein-naamruimte.** `sites.subDomain` deelt *één* naamruimte met `churches.subDomain`. Een subdomein van een site kan dus nooit botsen met dat van een kerk of van een andere site. Dit wordt op **beide** opslagpaden afgedwongen: `SiteController.save` weigert een slug die in `churches` of `sites` voorkomt, en `ChurchController.validateSave` doet hetzelfde in omgekeerde richting. Een unieke index op `sites.subDomain` bewaakt dit ook op databaseniveau.

**Uniciteit van pagina's** is verbreed van `(churchId, url)` naar `(churchId, siteId, url)`, zodat twee sites van één kerk elk hun eigen `/about` kunnen hebben.

### Content per site, met terugvalopties

Elk endpoint voor een lijst of boom van site-gebonden content accepteert een optionele `?siteId=` (afwezig betekent `''`, dus primair): de paginaboom, paginalijst en openbare pagina's, blokkenlijst, blokken per type en footer, links (anoniem, gefilterd en alle) en globale stijlen. Secties en elementen zijn *niet* direct gescoped. Ze erven de scope van hun bovenliggende pagina of blok.

Twee opzoekketens doen het eigenlijke werk:

- **Globale stijlen: `site → primair → standaard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` geeft de eigen rij van de site terug. Heeft een secundaire site er geen, dan geeft het de **rij van de primaire site (`''`) ongewijzigd terug**, met de `id` en `siteId` van de primaire rij, die de client gebruikt voor copy-on-write. Bestaat er ook geen primaire rij, dan geeft `GlobalStyleController` een vastgelegd standaardpalet en standaardlettertypen terug.
- **Footerblok: de site-specifieke wint, gedeeld is de terugval.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` geeft de gedeelde rijen (`''`) *en* de site-specifieke rijen terug. De resolver kiest de eigen footer van de site als die bestaat, anders de gedeelde. Dezelfde logica draait in zowel `TreeHelper.insertBlocks` (paginaboom) als in het losse endpoint `/content/blocks/public/footer/:churchId`.

### Verwijdering van een site met cascade

`SiteController.delete` (vereist het recht Instellingen→Bewerken van het ledenmodule) haalt een secundaire site in drie stappen weg:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` verwijdert alle content van de site in cascade: zijn **pagina's** met hun secties, elementen, `pageHistory` en `posts`; zijn **blokken** met hun secties, elementen en `pageHistory`; zijn **links** en **globalStyles**. Een bewaking weigert te draaien voor `''`. De primaire/gedeelde sentinel wordt nooit in cascade verwijderd.
2. `DomainRepo.clearSiteId` **wijst** de domeinen van de site **terug** naar de primaire site (`siteId → ''`), in plaats van ze te verwijderen. Een eigen domein blijft zo bestaan na het verwijderen van een site.
3. De rij in `sites` wordt verwijderd en de Caddy-routes worden opnieuw gesynchroniseerd (best-effort).

### B1Admin-oppervlak

| Mogelijkheid | Waar | Werking |
|-----------|-------|-----------|
| Sitewisselaar | `useSiteSelection` + `SiteSwitcher` (leeg = "Hoofdwebsite") | Leest een URL-parameter `?site=` en geeft die door als `?siteId=` aan ContentApi-aanroepen. Aanwezig op de drie **lijstschermen** voor sites: **Pagina's**, **Blokken** en **Uiterlijk**. Niet aanwezig in de pagina- en bloksbewerkers, die de `siteId` in het record zelf dragen |
| Sites aanmaken/verwijderen | `SitesDialog`, geopend via de optie "Websites beheren…" in de wisselaar | `POST /membership/sites` / `DELETE /membership/sites/:id` (naam + subDomain). Vereist het recht Instellingen→Bewerken van het ledenmodule (`Permissions.settings.edit` op de server; `Permissions.membershipApi.settings.edit` in B1Admin). **Alleen aanmaken en verwijderen: in v1 is er geen hernoem-scherm** |
| Toewijzing van site per domein | `DomainSettingsEdit` onder Instellingen→Domeinen | Een keuzelijst per rij stuurt de `siteId` per domein naar `/membership/domains`. De kolom verbergt zich als de API geen sites teruggeeft (oudere backend) |
| Copy-on-write voor stijlen | `StylesManager.prepareForSave` | Als de `siteId` van de geladen globale-stijlrij niet overeenkomt met de geselecteerde site (dus de API heeft de geërfde primaire rij als terugval teruggegeven), wordt de `id` van de primaire rij verwijderd en de huidige `siteId` ingesteld. Zo wordt een **nieuwe** site-specifieke rij ingevoegd in plaats van de primaire te overschrijven. Dezelfde afsplitsing bij een mismatch geldt voor het footerblok van de site |

:::info
**Wat in v1 voor de hele kerk blijft (een bewuste keuze voor de scope, geen beperking van het datamodel):** de **blog** (`BlogPage` heeft geen wisselaar en laadt `/posts` zonder `siteId`), de **sitewidgets** (aankondigingsbanner en launcher), **redirects**, het **logo / GA4 / kerkinstellingen** en het **ledenportaal** (B1App mobile). Let op: dit is *niet* "heel Uiterlijk". De globale stijlen van een secundaire site (palet, lettertypen, typografie, afstanden, navigatie, eigen CSS) **zijn** per site, via het copy-on-write-pad hierboven. Alleen de deelvensters banner, launcher, redirects en logo op de pagina Uiterlijk blijven voor de hele kerk.
:::

## Eigen domeinen: Caddy-edge (plan met statische configuratie)

:::info
**Richting herzien op 2026-07-02.** Een eerder plan om het hosten van eigen domeinen onder te brengen bij door Vercel beheerde domeinen is **geannuleerd**. Alle code voor domeinregistratie bij Vercel (`VercelHelper`, de omgevingsvariabelen `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM-parameters en healthchecks) is uit de Api verwijderd. De zelfbeheerde **Caddy-proxy op EC2 blijft** als permanente edge voor eigen domeinen. Het enige wat nog overblijft is intern: de *runtime*-configuratie van Caddy via de admin-API vervangen door een *statische* configuratie die herstarts overleeft.
:::

### De edge

Elk eigen kerkdomein wijst zijn DNS naar één EC2-server, `3.23.251.61`, ook bereikbaar als `proxy.b1.church`. Het scherm Instellingen→Domeinen van B1Admin vraagt kerken om een apex-`A` naar `3.23.251.61` of een `CNAME` naar `proxy.b1.church` toe te voegen. Caddy beëindigt TLS met een per-domein Let's Encrypt-certificaat, herschrijft de `Host`-header naar het `{sub}.b1.church` van het domein en reverse-proxyt naar B1App. B1App routeert het daarna op hostlabel, zoals elk eigen subdomein (zie [Eigen domeinen](#eigen-domeinen) hierboven).

De upstream-koppeling komt uit `DomainRepo.loadPairs`. Daarin wordt in de dial de subdomeinnaam van de toegewezen site **gecombineerd met COALESCE**, zodat een domein naar de juiste *secundaire* site wordt geproxied en anders naar de primaire site van de kerk valt:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Rijen met `www.*` vallen buiten de kaart. Caddy bedient `www.{host}` met een `302`-redirect naar het apex-domein.

### Twee anonieme endpoints voeden de edge

`DomainController` biedt twee niet-geauthenticeerde, alleen-lezen endpoints die de server rechtstreeks gebruikt. Ze zijn noodzakelijkerwijs anoniem, omdat de edge ze opvraagt voordat er enige kerkcontext bestaat:

| Endpoint | Geeft terug | Rol |
|----------|----------|------|
| `GET /membership/domains/authorize?domain=` | `200` als het domein, of bij een `www.`-miss het kale apex-domein, bestaat in `domains`. Anders `404`, ook bij een leeg `domain` | Caddy's **on-demand-TLS `ask`**: het misbruikbeheer dat bepaalt of voor een binnenkomende SNI een certificaat mag worden uitgegeven |
| `GET /membership/domains/hostmap` | `text/plain`, één gesorteerde regel `{domain} {sub}.b1.church` per routeerbaar domein | Het host→upstream-kaartbestand dat de server periodiek vernieuwt |

`authorize` hergebruikt `DomainRepo.loadByName` (exacte host, daarna één nieuwe poging zonder `www.`). `hostmap` hergebruikt `loadPairs`, dus het is sitebewust en sluit `www.*` uit, net als de proxyroutes. Het verwijdert alleen het achtervoegsel `:443`.

### Domein opslaan/verwijderen: één best-effort push

`DomainController.save` schrijft de rijen in `domains` en doet daarna **één best-effort** `CaddyHelper.updateCaddy()`-aanroep. Die zit in een `try/catch` dat logt (`console.error`) en de fout inslikt. `delete` doet hetzelfde (wat ook een eerdere bug met verouderde routes na verwijderen oploste), net als het verwijderen van een secundaire site (`SiteController.delete`). `updateCaddy` heeft zelf een timeout van **10 seconden** in Axios, dus een onbereikbare of gestopte Caddy kan een domeinopslag nooit een `500` laten geven. De tabel `domains` is de bron van waarheid.

### Huidige stand: statische configuratie, geen runtime-status

De server (een Windows-EC2 achter het permanente Elastic IP) draait Caddy met een **statisch Caddyfile**. Daarin staat on-demand TLS waarvan de `ask` naar `/membership/domains/authorize` wijst, plus een bestand met de host→upstream-kaart. Dat bestand wordt elke 5 minuten vernieuwd vanaf `/membership/domains/hostmap`, door een geplande taak die eindigt met een nette `caddy reload`. De configuratie overleeft herstarts zonder runtime-status, zonder het gedoe van opnieuw initialiseren. Een onbekende SNI wordt **TLS-geweigerd** (er wordt geen certificaat uitgegeven voor een host die `authorize` afwijst). Een geautoriseerde host die nog niet in de kaart staat (een nieuw domein binnen het synchronisatievenster) krijgt een schoon 404. Nieuwe domeinen zijn binnen ongeveer 5 minuten na opslaan routeerbaar, en hun certificaten worden bij het eerste bezoek uitgegeven. Installatie, beheer en in de praktijk ontdekte valkuilen: [Caddy-proxy voor eigen domeinen](../deployment/caddy-proxy.md).

### Oud runtime-pushmechanisme: terugvalpad, wordt verwijderd

`CaddyHelper` (ledenmodule) kan Caddy nog steeds aansturen via de **admin-API** op `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; geen actie als ze niet zijn ingesteld; zichtbaar onder de groep Integraties van `ServerHealthController`). `updateCaddy()` stuurt een PATCH met de volledige routelijst, en `initializeCaddy()` samen met de endpoints `GET /membership/domains/caddy/init` en `GET /membership/domains/caddy` bouwen een server met runtime-configuratie helemaal opnieuw op. In die modus stond de configuratie alleen in het geheugen van Caddy. Dat is het verlies bij herstarts dat deze architectuur heeft vervangen. Het mechanisme blijft alleen bestaan als terugvalpad en wordt verwijderd zodra de statische server stabiel is gebleken. De best-effort push van `updateCaddy()` bij het opslaan of verwijderen van een domein is een onschadelijke no-op voor de statische server, omdat de admin-API alleen op localhost bereikbaar is.

## Gerelateerde pagina's

- [Caddy-proxy voor eigen domeinen](../deployment/caddy-proxy.md): de edge-server zelf: installatie van een nieuwe server, de WinSW-service, de synchronisatietaak voor de kaart en operationele valkuilen
- [Websitebouwer](./website-builder.md): de boom van pagina's, secties en elementen, de renderers, de blog, SEO en AI-generatie (wat wordt weergegeven zodra een verzoek is omgezet naar een kerk of site)
- [Content-endpoints](../api/endpoints/content.md): de REST-interface voor pagina's, blokken, links en globale stijlen, die nu allemaal `?siteId=` ondersteunen
- [B1App](../web-apps/b1-app.md): de Next.js-app die de middleware en de `[sdSlug]`-routering bevat
- [Deployment van webapps](../deployment/web-apps.md): hoe B1App naar Vercel wordt uitgerold
