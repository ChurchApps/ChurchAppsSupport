---
title: "Verkkosivujen reititys ja monisivustot"
description: "Miten B1.church yhdistää alidomainit ja mukautetut domainit oikeaan seurakuntaan tai toissijaiseen sivustoon sekä Caddy-reunapalvelin, joka hoitaa mukautettujen domainien TLS:n."
---

# Verkkosivujen reititys ja monisivustot

<div class="article-intro">

Yksi seurakunta voi nyt palvella useampaa erillistä verkkosivustoa, ja jokainen voi sijaita `*.b1.church`-aliverkkotunnuksessa tai täysin mukautetussa, seurakunnan omistamassa verkkotunnuksessa. Tämä sivu kuvaa rakentajan *alla* olevan reititystason: miten saapuva pyyntö ratkaistaan seurakunnaksi **ja** tietyksi sivustoksi, monisivustojen tietomallin (`siteId`-vartija, joka pitää kaikki aiemmin olemassa olleet sivustot ennallaan) sekä oman verkkotunnuksen reunan. Reunalla on EC2:lla itse ylläpidettävä Caddy-välityspalvelin, joka päättää TLS-yhteyden ja kirjoittaa kunkin seurakunnan verkkotunnuksen uudelleen sen `*.b1.church`-ylävirtaan. Siitä, mitä renderöityy, kun pyyntö on ratkaistu, eli sivujen, osioiden ja elementtien puusta, katso [Verkkosivurakentaja](./website-builder.md).

</div>

## Yleiskatsaus

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

Kolme sääntöä pätee tässä kerroksessa:

1. **Vartija pitää kaiken taaksepäin yhteensopivana.** `siteId = ''` on pääsivusto. Jokainen sivu, lohko, linkki, globaali tyyli ja verkkotunnusrivi, joka oli olemassa ennen tätä ominaisuutta, kantaa arvoa `''` ja renderöityy täsmälleen kuten ennen. *Toinen* verkkosivusto on yksinkertaisesti joukko rivejä, joilla on ei-tyhjä `siteId`. Mikä tahansa sisältöpäätepiste, jota kutsutaan ilman `?siteId=`-parametria, palauttaa pääsivuston, bitti bitiltä sama kuin vanha pyyntö.
2. **Ratkaisu perustuu isäntänimen ensimmäiseen osaan ja lopulta yhtyy.** `*.b1.church`-aliverkkotunnus reititetään suoraan isäntänimen ensimmäisen osan perusteella. Oma verkkotunnus kirjoitetaan Caddy-reunalla uudelleen sen `{sub}.b1.church`-tunnukseksi ennen kuin B1App näkee sen. (Middleware tekee tietokantahaun, joka asettaa `x-site`-otsakkeen varatoimena mille tahansa suoralle omalle `Host`-arvolle.) Molemmat haarat päätyvät samaan `[sdSlug]`-reittiin ja samaan `churches/lookup`-kutsuun, joten myöhempi renderöinti on identtinen.
3. **Caddy-reuna on tilaton yhden totuuden lähteen päällä.** Oman verkkotunnuksen liikenne päättyy EC2:lla itse ylläpidettyyn Caddy-välityspalvelimeen, joka kirjoittaa jokaisen verkkotunnuksen uudelleen sen `{sub}.b1.church`-ylävirtaan. Verkkotunnuksen tallennus käynnistää yhden parhaan yrityksen mukaisen `CaddyHelper.updateCaddy()`-kutsun. Caddy lukee myös `domains`-taulun suoraan (alla olevat `authorize`- ja `hostmap`-päätepisteet). Taulu on ratkaiseva, joten tavoittamaton Caddy ei koskaan voi kaataa tallennusta.

## Sivuston ratkaisu

### `*.b1.church`-aliverkkotunnukset

`B1App/next.config.mjs` kirjoittaa saapuvat pyynnöt uudelleen isäntänimen perusteella. Isäntäsääntö, jonka malli on `(?<subdomain>.*?)\..*`, kaappaa isäntänimen **ensimmäisen osan** ja kirjoittaa `/`- ja `/:path*`-polut muotoon `/{subdomain}`, eli App Routerin `[sdSlug]`-segmenttiin. Siis `grace.b1.church/about` muuttuu muotoon `/grace/about`.

Kansiossa `src/app/[sdSlug]/` `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) kutsuu päätepistettä `GET /membership/churches/lookup/?subDomain={sdSlug}`. `ChurchController.getBySubDomain`-vastauksella on nyt kaksi haaraa:

| Tunniste täsmää | Vastaus | Merkitys |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Kyseisen seurakunnan pääsivusto |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Toissijainen sivusto**. Kontrolleri siirtyy `sites`-tauluun, selvittää omistavan seurakunnan ja palauttaa kyselyn tunnisteen sekä ylimääräisen `siteId`-kentän |

Tuo ylimääräinen `siteId` on ainoa asia, joka erottaa toissijaisen sivuston pyynnön pääsivuston pyynnöstä. Muu putki on yhteinen.

Tunniste, joka ei täsmää kumpaankaan taulun, palautuu muodossa `{}` tilalla `200`. `ConfigHelper.load` käsittelee vastauksen ilman `id`-kenttää tuntemattomana sivustona ja kutsuu Nextin `notFound()`-funktiota. Tuntematon aliverkkotunnus saa siis oikean 404-vastauksen sen sijaan, että jokainen myöhempi kutsu pyytäisi polkuja muotoa `/…/undefined`. Rakentajasivun reitti muodostaa puupolkunsa `pageTreePath()`-funktiolla (`src/helpers/pageTreePath.ts`), joka koodaa tunnisteen URL-muotoon. Siksi virheellinen tunniste (kenoviivat, välilyönnit) palauttaa 404:n sen sijaan, että API:n `400` näkyisi 500-virheenä.

### Oma verkkotunnus

Seurakunnan oma verkkotunnus päättyy **Caddy-reunalle** (kuvataan alla), joka kirjoittaa `Host`-otsakkeen uudelleen sivuston `{sub}.b1.church`-tunnukseksi ennen välitystä B1Appiin. Normaalissa polussa B1App siis saa *sisäisen* `*.b1.church`-isännän ja ratkaisee sen isäntänimen ensimmäisen osan perusteella täsmälleen kuten oman aliverkkotunnuksen. Middlewaren tietokantahaku ei siis koskaan käynnisty. `src/middleware.ts` ajetaan silti joka pyynnölle, mutta sillä on yksi aina päällä oleva tehtävä ja yksi varatoiminto:

1. **Aina** se **poistaa asiakkaan lähettämän `x-site`-otsakkeen**. Otsake on väärennettävissä oleva uudelleenkirjoitussyöte, ja sitä luotetaan vain silloin, kun middleware itse asettaa sen. Sen poistaminen on middlewaren todellinen tehtävä Caddyn takana.
2. **Varatoiminto, vain ei-sisäinen `Host`** — jos raakana oma verkkotunnus saavuttaa B1Appin ilman Caddyn uudelleenkirjoitusta, se kutsuu `GET /membership/domains/public/lookup/{host}`-päätepistettä. Jos vastauksessa on `subDomain`, se asettaa `x-site: {subDomain}.b1.church`. Caddyn takana tämä haara on passiivinen, koska `Host` on jo `*.b1.church`.

Sisäiset isännät — `localhost`, `b1.church` sekä päätteet `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app` ja `.vercel.app` — ohittavat haun kokonaan. Ne on jo ratkaistu isäntänimen ensimmäisen osan uudelleenkirjoituksella tai ne ovat esikatselu- tai julkaisuisäntiä.

Itse haku (`DomainRepo.loadByName`) tekee vasemman liitoksen `domains → churches`- ja `domains → sites`-tauluihin ja palauttaa lausekkeen `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`. Eli se palauttaa osoitetun toissijaisen sivuston aliverkkotunnuksen, jos verkkotunnus osoittaa sellaiseen, muuten seurakunnan aliverkkotunnuksen. Haku täsmää ensin tarkkaan isäntään. Jos isäntä alkoi `www.`-alkuliitteellä eikä löytynyt, haku yrittää **kerran** uudelleen paljaalla juuridomainilla.

`next.config.mjs`-tiedostossa `x-site`-uudelleenkirjoitussäännöt sijoitetaan yleisten isäntäsääntöjen **eteen**, joten ne voittavat. `x-site: grace.b1.church` → ensimmäinen osa `grace` → `[sdSlug] = grace`, ja siitä eteenpäin ratkaisu on identtinen aliverkkotunnuspolun kanssa (sama `churches/lookup`, sama `siteId`).

:::info
Ulkopuolelta tuleva `x-site`-otsake ei ole luotettava. Middleware poistaa ehdoitta kaikki saapuvat `x-site`-otsakkeet ennen kuin asettaa oman arvonsa. Uudelleenkirjoitussäännöt näkevät vain middlewaren asettaman arvon, joten asiakas ei voi pakottaa itseään toisen seurakunnan sisältöön lähettämällä otsakkeen.
:::

Middlewaren kaksi operatiivista yksityiskohtaa:

- **Välimuisti.** Jokaisen isännän tulos (osuma *tai* varmistettu ohitus, ei koskaan verkkovirhe) tallennetaan **10 minuutiksi** muistissa olevaan `Map`-rakenteeseen, kullekin palvelinvaiheelle erikseen.
- **Vastaavuus.** Vastaavuus sisältää tarkoituksella uudelleen `/sitemap.xml`-, `/robots.txt`- ja `/manifest.webmanifest`-polut. Sen ensimmäinen kuvio jättää pois pisteelliset polut, jotka muuten pudottaisivat nämä tiedostot pois. Ne lisätään takaisin, jotta seurakunnan oman verkkotunnuksen SEO- ja PWA-tiedostot saavat myös `x-site`-otsakkeen.
- **Kanoninen otsake.** Seurakunnan sivuilla middleware lisää vastausotsakkeen `Link: <{proto}://{host}{path}>; rel="canonical"`. Se nimeää isännän, josta sivu todellisuudessa palveltiin: aliverkkotunnuksen tai oman verkkotunnuksen (`helpers/canonicalLink.ts`). Kun oma verkkotunnus saavuttaa B1Appin [Caddy-välityspalvelimen](../deployment/caddy-proxy.md) kautta, pyynnön isäntä on `{sub}.b1.church`-aliverkkotunnus. Siksi middleware käyttää kävijän verkkotunnusta otsakkeesta `X-Church-Host`. Tämä tehdään kuitenkin vasta sen jälkeen, kun `/domains/public/lookup/{host}` vahvistaa, että verkkotunnus osoittaa samaan aliverkkotunnukseen (`ownsSubdomain()`). Kanoninen linkki, `robots.txt` ja `sitemap.xml` nimeävät sitten oman verkkotunnuksen eivätkä `b1.church`-aliverkkotunnusta. Tätä ei tehdä muissa kuin seurakuntien isännissä (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) eikä poluilla `/mobile`, `/login`, `/logout` eikä generoiduissa robots-, sitemap- ja manifest-tiedostoissa.

### Julkinen verkkosivusto pois käytöstä

Seurakunta voi ottaa B1Adminissa käyttöön asetuksen **Poista julkinen verkkosivusto käytöstä** (seurakuntatason sisältöasetus `hidePublicSite = "true"`). Sivusto palvelee tämän jälkeen vain jäsenille tarkoitettuja reittejä:

- **B1App-middleware** hakee aliverkkotunnuksen (`/membership/churches/lookup` ja sitten `/content/settings/public/:churchId`) ja ohjaa anonyymit pyynnöt mille tahansa sallitun listan ulkopuolelle jäävälle polulle osoitteeseen `/login?returnUrl={path}{query}`. Sallittu lista (`helpers/publicSite.ts`) on `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` sekä manifest-, robots- ja sitemap-tiedostot. Vain vahvistetut vastaukset tallennetaan välimuistiin: tuotannossa 60 sekuntia, koska ylläpitäjän uudelleenvalidointikutsu ei voi tyhjentää tätä instanssikohtaista Mapia. Kehitys- ja testiympäristössä niitä ei tallenneta. API-virhe näyttää sivuston sen sijaan, että se lukitsisi kaikki ulos.
- **Kirjautuneet jäsenet näkevät koko sivuston.** Pyyntö, jossa on voimassa oleva `jwt`-eväste, ohittaa uudelleenohjauksen. (Middlewaren `hasSession()` lukee hyötykuorman `exp`-kentän varmentamatta allekirjoitusta. Kyseessä on pehmeä portti, ei pääsynhallintaa.) Kirjautumisen jälkeen jäsen palaa siis sivulle, jota hän pyysi, ja näkee tavalliset sivut, sisäänrakennetut sivut (Ryhmät, Saarnat jne.) ja ylänavigaation. Sivukomponentit ja `Header` eivät enää itse tarkista `hidePublicSite`-arvoa.
- **`robots.txt`** kieltää kaiken, kuten myös noindex-isännissä.
- **API.** `GET /content/pages/public/:churchId` (sitemapin sivulista) palauttaa `[]`, joten anonyymit kutsujat eivät voi listata sivuja.

### `siteId`-välitys

`ConfigHelper` tallentaa ratkaistun `siteId`-arvon pyyntökohtaiseen `ConfigurationInterface`-rakenteeseensa (muistissa React `cache()`-funktiolla) ja lisää `?siteId=`-parametrin sisältökutsuihin, joita se ja sivukomponentit tekevät. Lisäys on **ehdollinen**: tyhjä `siteId` (pääseurakunnan aliverkkotunnus) jättää parametrin kokonaan pois. Välitettäviä päätepisteitä ovat sivupuu (`/content/pages/:id/tree`), sitemapin käyttämä julkinen sivulista (`/content/pages/public/:id`), globaalit tyylit (`/content/globalStyles/church/:id`), navigaatiolinkit (`/content/links/church/:id`) ja erillinen alatunnisteen lohko (`/content/blocks/public/footer/:id`). Tavallisessa renderöinnissä alatunniste tulee sivupuun sisältä (osiot merkitty `zone: "siteFooter"`), ja se on jo haettu `siteId`-arvolla. Siksi ei ole rajaamatonta alatunnisteaukkoa.

Jäsenportaali (B1App `mobile`) on tarkoituksella tämän ulkopuolella. `loadChurchAppearance.ts` selvittää seurakunnan `churches/lookup`-kutsulla, mutta lukee seurakuntatason `/settings/public/{id}`-asetukset eikä koskaan välitä `siteId`-arvoa. Portaali on v1:ssä koko seurakunnan kattava (katso alla).

## Useita verkkosivuja seurakuntaa kohden

### Tietomalli

Uusi `membership.sites`-taulu on tarkoituksella pieni:

| Sarake | Tyyppi | Huomautus |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Omistava seurakunta |
| `name` | `varchar(255)` | Näyttönimi (esim. „Español“, „Youth“) |
| `subDomain` | `varchar(45)` | **Yksilöllinen indeksi**, globaali nimiavaruus (alla) |

Sivustojen rajaus perustuu yhteen tyhjentämättömään sarakkeeseen, joka lisätään sisältö- ja verkkotunnustauluihin:

| Taulu (moduuli) | Sarake | `''` tarkoittaa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Verkkotunnus palvelee pääsivustoa |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Pääsivusto. Taulussa **`blocks`** `''` tarkoittaa lisäksi *jaettua kaikille sivustoille* |

Kaiken tämän lisäävät kaksi migraatiota (`tools/migrations/membership/2026-07-02_sites.ts` ja `tools/migrations/content/2026-07-02_site_id.ts`). Koska sarakkeen oletusarvo on `''`, jokainen olemassa oleva rivi säilyttää nykyisen toimintansa ilman täyttöä.

**Globaali aliverkkotunnusten nimiavaruus.** `sites.subDomain` jakaa *yhden* nimiavaruuden `churches.subDomain`-kentän kanssa. Sivuston aliverkkotunnus ei siis voi koskaan törmätä seurakunnan aliverkkotunnukseen tai toisen sivuston tunnukseen. Tämä pakotetaan **molemmissa** tallennusreiteissä. `SiteController.save` hylkää tunnuksen, joka osuu joko `churches`- tai `sites`-tauluun, ja `ChurchController.validateSave` tekee saman päinvastaisessa suunnassa. Tietokantatasolla tätä tukee yksilöllinen indeksi `sites.subDomain`-kentässä.

**Sivujen yksilöllisyys** laajennettiin muodosta `(churchId, url)` muotoon `(churchId, siteId, url)`. Näin seurakunnan kaksi sivustoa voivat omistaa kumpikin oman `/about`-sivunsa.

### Sivustokohtainen sisältö vararatkaisuilla

Jokainen sivustokohtainen sisältölista- ja puupäätepiste hyväksyy valinnaisen `?siteId=`-parametrin (puuttuessa `''`, eli pääsivusto). Näitä ovat sivupuu, lista ja julkinen sivu, lohkojen lista, lohko tyypin mukaan ja alatunniste, linkit (anonyymit, suodatetut ja kaikki) sekä globaalit tyylit. Osioita ja elementtejä ei rajata suoraan. Ne periytyvät emosivulta tai -lohkolta.

Kaksi ratkaisuketjua tekee mielenkiintoisen työn:

- **Globaalit tyylit — `sivusto → pääsivusto → oletus`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` palauttaa sivuston oman rivin. Jos toissijaisella sivustolla ei ole sellaista, se palauttaa **pääsivuston (`''`) rivin sellaisenaan**. Rivin `id` ja `siteId` säilyvät, ja asiakas käyttää niitä kopioi-kirjoita-toiminnossa. Jos pääsivustoakaan ei ole, `GlobalStyleController` palauttaa kovakoodatun oletuspaletin ja -fontit.
- **Alatunnisteen lohko — sivustokohtainen voittaa, jaettu varalla.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` palauttaa jaetun (`''`) *ja* sivustokohtaiset rivit. Ratkaisija valitsee sivuston oman alatunnisteen, jos sellainen on, muuten jaetun. Sama logiikka ajetaan sekä `TreeHelper.insertBlocks`-funktiossa (sivupuu) että erillisessä `/content/blocks/public/footer/:churchId`-päätepisteessä.

### Sivuston poiston kaskadi

`SiteController.delete` (vaatii jäsenhallinnan Asetukset→Muokkaa-oikeuden) poistaa toissijaisen sivuston kolmessa vaiheessa:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` poistaa kaiken sivuston omistaman sisällön kaskadina. Sivut poistuvat niiden osioineen, elementteineen, `pageHistory`- ja `posts`-rivineen. Sivuston omat lohkot poistuvat osioineen, elementteineen ja `pageHistory`-rivineen. Lisäksi poistuvat sen **linkit** ja **globalStyles**. Suojaus estää ajamisen arvolle `''`, eli pääsivuston tai jaetun sisällön vartijaa ei koskaan poisteta kaskadina.
2. `DomainRepo.clearSiteId` **osoittaa** sivuston verkkotunnukset takaisin pääsivustolle (`siteId → ''`) sen sijaan, että poistaisi ne. Näin oma verkkotunnus säilyy sivuston poistonkin jälkeen.
3. `sites`-rivi poistetaan ja Caddy-reitit synkronoidaan uudelleen (parhaan yrityksen mukaan).

### B1Adminin käyttöliittymä

| Ominaisuus | Missä | Toteutus |
|-----------|-------|-----------|
| Sivustonvaihtaja | `useSiteSelection` + `SiteSwitcher` (tyhjä = „Päätyhjä“, eli „Main Website“) | Lukee URL-parametrin `?site=` ja välittää sen `?siteId=`-parametrina ContentApi-kutsuihin. Näkyy kolmella sivustolistalla: **Sivut**, **Lohkot** ja **Ulkoasu**. Ei näy sivu- eikä lohkoeditoreissa, jotka kantavat `siteId`-arvon tietueessaan |
| Sivustojen luonti ja poisto | `SitesDialog`, avataan vaihtajan kohdasta „Manage websites…“ (”Hallitse verkkosivustoja…”) | `POST /membership/sites` ja `DELETE /membership/sites/:id` (nimi ja subDomain). Vaatii jäsenhallinnan Asetukset→Muokkaa-oikeuden (`Permissions.settings.edit` palvelimella, `Permissions.membershipApi.settings.edit` B1Adminissa). **Vain luonti ja poisto. Nimeämistä ei ole v1:ssä käyttöliittymässä** |
| Verkkotunnuksen sivustomääritys | `DomainSettingsEdit` kohdassa Asetukset→Verkkotunnukset | Rivikohtainen sivustovalikko lähettää `siteId`-arvon kullekin verkkotunnukselle kohteeseen `/membership/domains`. Sarake piilotetaan, jos API ei palauta sivustoja (vanhempi taustajärjestelmä) |
| Kopioi-kirjoita-tyylit | `StylesManager.prepareForSave` | Kun ladatun globaalin tyylirivin `siteId` ei vastaa valittua sivustoa (eli API palautti periytyvän pääsivuston varatoimena), se poistaa pääsivuston `id`-arvon ja asettaa nykyisen `siteId`-arvon. Tämä pakottaa **lisäyksen** uudelle sivustokohtaiselle riville sen sijaan, että pääsivuston rivi ylikirjoitettaisiin. Sama haaraistuminen koskee sivuston alatunnisteen lohkoa |

:::info
**Mikä pysyy koko seurakunnan kattavana v1:ssä (tietoinen rajausvalinta, ei tietomallin rajoite):** **blogi** (`BlogPage`:ssa ei ole vaihtajaa, ja se lataa `/posts`-kutsun ilman `siteId`-arvoa), **sivuston widgetit** (ilmoitusbanneri ja käynnistin), **uudelleenohjaukset**, **logo, GA4 ja seurakunnan asetukset** sekä **jäsenportaali** (B1App mobile). Tämä ei tarkoita, että koko Ulkoasu-osio olisi kirjaa. Toissijaisen sivuston globaalit tyylit (paletti, fontit, typografia, välistys, navigaatio ja mukautettu CSS) **ovat** sivustokohtaisia edellä kuvatun kopioi-kirjoita-reitin kautta. Vain Ulkoasu-sivun banneri-, käynnistin-, uudelleenohjaus- ja logo-alaosat jäävät koko seurakunnan kattaviksi.
:::

## Omat verkkotunnukset: Caddy-reuna (staattisen konfiguraation suunnitelma)

:::info
**Suunta tarkistettu 2026-07-02.** Aiempi suunnitelma siirtää oman verkkotunnuksen isännöinti Vercelin hallitsemille verkkotunnuksille **peruttiin**. Kaikki Vercel-verkkotunnusten rekisteröintikoodi (`VercelHelper`, sen ympäristömuuttujat `vercelToken`, `vercelProjectId` ja `vercelTeamId`, SSM-parametrit ja tilatarkistukset) poistettiin Apista. EC2:lla oleva itse ylläpidetty **Caddy-välityspalvelin jää pysyväksi oman verkkotunnuksen reunaksi**. Jäljellä oleva työ on sisäistä: Caddyn *ajonaikaisen* admin-API-konfiguraation vaihtaminen *staattiseen* konfiguraatioon, joka säilyy uudelleenkäynnistyksissä.
:::

### Reuna

Jokainen seurakunnan oma verkkotunnus osoittaa DNS:llä yhteen EC2-koneeseen: `3.23.251.61`, joka tavoitetaan myös nimellä `proxy.b1.church`. B1Adminin Asetukset→Verkkotunnukset-näkymä ohjeistaa seurakuntia lisäämään juuritunnukselle `A`-tietueen `3.23.251.61`-osoitteeseen tai `CNAME`-tietueen kohteeseen `proxy.b1.church`. Caddy päättää TLS-yhteyden kunkin verkkotunnuksen omalla Let's Encrypt -varmenteella, kirjoittaa `Host`-otsakkeen uudelleen verkkotunnuksen `{sub}.b1.church`-ylävirtaan ja välittää pyynnön B1Appiin. B1App reitittää sen isäntänimen ensimmäisen osan perusteella kuten mikä tahansa oma aliverkkotunnus (katso yllä [Oma verkkotunnus](#oma-verkkotunnus)).

Ylävirran kartoituksen tuottaa `DomainRepo.loadPairs`. Sen `dial`-lauseke käyttää `COALESCE`-funktiota ja valitsee osoitetun sivuston aliverkkotunnuksen, jotta verkkotunnus välittyy oikealle *toissijaiselle* sivustolle. Muussa tapauksessa käytetään seurakunnan pääaliverkkotunnusta:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*`-rivit jätetään kartoituksesta pois. Caddy palvelee `www.{host}`-osoitteen sen sijaan `302`-uudelleenohjauksella juuritunnukselle.

### Kaksi anonyymiä päätepistettä syöttää reunaa

`DomainController` tarjoaa kaksi todentamatonta, vain luku -päätepistettä, joita kone kuluttaa suoraan. Ne ovat anonyymejä väistämättä, koska reuna kysyy niitä ennen kuin seurakunnan kontekstia on olemassa:

| Päätepiste | Palauttaa | Tehtävä |
|----------|----------|----------|
| `GET /membership/domains/authorize?domain=` | `200`, jos verkkotunnus (tai `www.`-osumassa sen paljas juuritunnus) on olemassa taulussa `domains`. Muuten `404`, myös tyhjällä `domain`-arvolla | Caddyn **on-demand-TLS `ask`**: väärinkäytön esto, joka päättää, myönnetäänkö varmenne saapuvalle SNI:lle |
| `GET /membership/domains/hostmap` | `text/plain`, yksi lajiteltu rivi reititettävää verkkotunnusta kohden muodossa `{domain} {sub}.b1.church` | Isäntä→ylävirta-kartoitustiedosto, jonka kone päivittää ajastimella |

`authorize` käyttää uudelleen `DomainRepo.loadByName`-funktiota (tarkka isäntä, sitten kerran `www.`→juuri-uudelleenyritys). `hostmap` käyttää uudelleen `loadPairs`-funktiota, joten se on sivustotietoinen ja jättää `www.*`-rivit pois kuten välityspalvelinreitit. Se vain poistaa `:443`-päätteen.

### Verkkotunnuksen tallennus ja poisto: yksi parhaan yrityksen mukainen työntö

`DomainController.save` kirjoittaa `domains`-rivit ja tekee sitten **yhden parhaan yrityksen mukaisen** `CaddyHelper.updateCaddy()`-kutsun. Kutsu on `try/catch`-lohkossa, joka kirjaa virheen (`console.error`) ja nielaisee sen. `delete` tekee saman, mikä myös korjasi aiemman vanhentuneen reitin poistovirheen. Sama koskee toissijaisen sivuston poistoa (`SiteController.delete`). `updateCaddy` on lisäksi rajattu **10 sekunnin** Axios-aikakatkaisulla. Tavoittamaton tai pysäytetty Caddy ei siis koskaan voi aiheuttaa `500`-virhettä verkkotunnuksen tallennuksessa. Taulu `domains` on totuuden lähde.

### Nykytila: staattinen konfiguraatio, ei ajonaikaista tilaa

Kone (Windows-EC2 pysyvän Elastic IP:n takana) ajaa Caddya **staattisesta Caddyfile-tiedostosta**. Siinä on on-demand TLS, jonka `ask` osoittaa polkuun `/membership/domains/authorize`, sekä isäntä→ylävirta-kartoitustiedosto. Ajastettu tehtävä päivittää sen viiden minuutin välein polusta `/membership/domains/hostmap` ja lopettaa sen Caddyn sulavaan `caddy reload`-komentoon. Konfiguraatio säilyy uudelleenkäynnistyksissä ilman ajonaikaista tilaa, eikä sitä tarvitse alustaa uudelleen. Tuntematon SNI **hylätään TLS-tasolla** (varmennetta ei luoda isännälle, jonka `authorize` hylkää). Valtuutettu mutta vielä kartoittamaton isäntä (uusi verkkotunnus synkronointi-ikkunassa) saa puhtaan 404-vastauksen. Uudet verkkotunnukset reititetään noin viiden minuutin kuluessa tallennuksesta. Varmenteet luodaan ensimmäisellä pyynnöllä. Rakennus, asennus, operointi ja kenttätestatut sudenkuopat: [Caddy-oman-verkkotunnuksen välityspalvelin](../deployment/caddy-proxy.md).

### Vanha ajonaikainen työntö: palautusreitti, poisto odottaa

`CaddyHelper` (membership-moduuli) voi yhä ohjata Caddya sen **admin-API:n** kautta osoitteessa `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`). Jos arvo puuttuu, mitään ei tehdä. Tila näkyy `ServerHealthController`-ohjaimen Integrations-ryhmässä. `updateCaddy()` lähettää PATCH-pyynnön, joka sisältää koko reittitaulukon, ja `initializeCaddy()` sekä päätepisteet `GET /membership/domains/caddy/init` ja `GET /membership/domains/caddy` rakentavat ajonaikaisesti konfiguroidun palvelimen alusta. Tämän tilan konfiguraatio oli vain Caddyn muistissa. Se oli juuri se uudelleenkäynnistyksessä katoava ongelma, jonka tämä arkkitehtuuri korvasi. Koodi jää jäljelle ainoastaan palautusreitiksi, ja se on ajastettu poistettavaksi, kun staattinen kone on ollut vakaa. Verkkotunnuksen tallennuksen ja poiston yhden parhaan yrityksen mukainen `updateCaddy()`-työntö on vaaraton ei-operaatio staattista konetta vastaan, koska sen admin-API on vain localhostista käytettävissä.

## Liittyvät sivut

- [Caddy-oman-verkkotunnuksen välityspalvelin](../deployment/caddy-proxy.md): itse reunakone, eli uuden koneen asennus, WinSW-palvelu, kartoituksen synkronointitehtävä ja käytännön sudenkuopat
- [Verkkosivurakentaja](./website-builder.md): sivu-, osio- ja elementtipuu, renderöijät, blogi, SEO ja tekoälyn tuottama sisältö (eli se, mitä renderöityy, kun pyyntö on ratkaistu seurakunnaksi tai sivustoksi)
- [Sisältöpäätepisteet](../api/endpoints/content.md): REST-rajapinta sivuille, lohkoille, linkeille ja globaaleille tyyleille, jotka kaikki ymmärtävät nyt `?siteId=`-parametrin
- [B1App](../web-apps/b1-app.md): Next.js-sovellus, joka isännöi middlewarea ja `[sdSlug]`-reititystä
- [Verkkosovellusten käyttöönotto](../deployment/web-apps.md): miten B1App otetaan käyttöön Vercelissä
