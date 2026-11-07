---
title: "Svetainių maršrutizavimas ir kelios svetainės"
description: "Kaip B1.church susieja subdomenus ir pasirinktinius domenus su bažnyčia ar antrine svetaine ir kaip Caddy tvarko TLS pasirinktiniams domenams."
---

# Svetainių maršrutizavimas ir kelios svetainės

<div class="article-intro">

Viena bažnyčia dabar gali aptarnauti daugiau nei vieną atskirą svetainę, ir kiekviena jų gali veikti `*.b1.church` subdomenu arba visiškai pasirinktiniu, bažnyčios valdomu domenu. Šiame puslapyje aprašomas maršrutizavimo sluoksnis, esantis *po* kūrėju: kaip ateinanti užklausa susiejama su bažnyčia **ir** konkrečia svetaine, kelių svetainių duomenų modelis (`siteId` sentinelė, kuri užtikrina, kad visos anksčiau egzistavusios svetainės veiktų nepakitusios) bei pasirinktinių domenų kraštinė: savarankiškai valdomas Caddy tarpinis serveris EC2 serveryje, kuris nutraukia TLS ir perrašo kiekvieną bažnyčios domeną į jos `*.b1.church` šaltinį. Apie tai, kas atvaizduojama, kai užklausa jau susieta, t. y. puslapių, skyrių ir elementų medį, žr. [Svetainių kūrėjas](./website-builder.md).

</div>

## Apžvalga

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

Trys šio sluoksnio taisyklės galioja visur:

1. **Sentinelė užtikrina atgalinį suderinamumą.** `siteId = ''` yra pagrindinė svetainė. Kiekvienas puslapis, blokas, nuoroda, bendras stilius ir domeno įrašas, egzistavęs prieš šią funkciją, turi `''` ir veikia kaip anksčiau. *Antra* svetainė yra tiesiog eilučių rinkinys su ne tuščiu `siteId`, o bet kuris turinio galutinis taškas, iškviestas be `?siteId=`, grąžina pagrindinę svetainę, t. y. užklausą, identišką senajai.
2. **Susiejimas remiasi pagrindine subdomeno dalimi ir konverguoja.** `*.b1.church` subdomenas maršrutizuojamas tiesiogiai pagal savo pagrindinę dalį. Pasirinktinis domenas dar prieš B1App jį pamatant Caddy kraštinėje perrašomas į `{sub}.b1.church` dalį. Tarpinės programinės įrangos DB paieška nustato `x-site` antraštę kaip atsarginį variantą bet kokiam neapdorotam pasirinktiniam `Host`. Abu keliai nukreipiami į tą patį `[sdSlug]` maršrutą ir tą patį `churches/lookup` kvietimą, todėl tolesnis atvaizdavimas yra identiškas.
3. **Caddy kraštinė yra be būsenos ir remiasi vienu tiesos šaltiniu.** Pasirinktiniai domenai baigiasi savarankiškai valdomame Caddy tarpiniame serveryje EC2, kuris perrašo kiekvieną domeną į jo `{sub}.b1.church` šaltinį. Domeno išsaugojimas paleidžia vieną geriausių pastangų `CaddyHelper.updateCaddy()` iškvietimą. Caddy taip pat tiesiogiai skaito `domains` lentelę (žr. `authorize` ir `hostmap` galutinius taškus žemiau). Lentelė yra autoritetinga, todėl nepasiekiamas Caddy niekada negali sugadinti domeno išsaugojimo.

## Svetainės susiejimas

### `*.b1.church` subdomenai

`B1App/next.config.mjs` perrašo ateinančias užklausas pagal host. Host taisyklė su šablonu `(?<subdomain>.*?)\..*` fiksuoja host **pirmą dalį** ir perrašo `/` bei `/:path*` į `/{subdomain}`, t. y. į `[sdSlug]` App-Router segmentą. Taigi `grace.b1.church/about` tampa `/grace/about`.

Kataloge `src/app/[sdSlug]/` funkcija `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) kviečia `GET /membership/churches/lookup/?subDomain={sdSlug}`. Atsakymas iš `ChurchController.getBySubDomain` dabar turi dvi šakas:

| Slug atitinka | Atsakymas | Reikšmė |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Tos bažnyčios pagrindinė svetainė |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Antrinė svetainė**: kontroleris grįžta prie `sites`, suranda savininkę bažnyčią ir grąžina užklaustą slug bei papildomą `siteId` |

Tas papildomas `siteId` yra vienintelis dalykas, skiriantis antrinės svetainės užklausą nuo pagrindinės. Viskas kita grandinėje yra bendra.

Slug, kuris neatitinka nei vienos lentelės, grąžinamas kaip `{}` su `200`. `ConfigHelper.load` traktuoja atsakymą be `id` kaip nežinomą svetainę ir iškviečia Next `notFound()`. Taip nežinomas subdomenas gauna tikrą 404, o ne tai, kad visi vėlesni kvietimai klaustų `/…/undefined`. Puslapio kūrėjo maršrutas taip pat sudaro medžio kelią su `pageTreePath()` (`src/helpers/pageTreePath.ts`), kuris URL koduoja slug. Todėl netinkamas slug (atvirkštiniai brūkšniai, tarpai) grąžina 404, o ne API klaidą `400`, kuri pasirodytų kaip 500.

### Pasirinktiniai domenai

Bažnyčios domenas baigiasi **Caddy kraštinėje** (aprašyta žemiau), kuri perrašo `Host` antraštę į svetainės `{sub}.b1.church` prieš persiųsdama užklausą B1App. Įprastu keliu B1App gauna *vidinį* `*.b1.church` host ir susieja jį pagal pagrindinę dalį kaip ir gimtąjį subdomeną. Tarpinės programinės įrangos DB paieška niekada nevykdoma. `src/middleware.ts` vis dar veikia kiekvienai užklausai, bet su viena nuolatine funkcija ir vienu atsarginiu variantu:

1. **Visada**: ji **ištrina bet kokią kliento pateiktą `x-site` antraštę**. Ši antraštė gali būti klastojama, todėl patikima tik tada, kai ją nustato pati tarpinė programinė įranga. Jos išvalymas yra tikra tarpinės programinės įrangos užduotis už Caddy.
2. **Atsarginis variantas, tik ne vidiniam `Host`**: neapdorotam pasirinktinio domeno `Host`, kuris pasiekia B1App *be* Caddy perrašymo, ji kviečia `GET /membership/domains/public/lookup/{host}`. Jei atsakyme yra `subDomain`, ji nustato `x-site: {subDomain}.b1.church`. Už Caddy ši šaka neveikia, nes `Host` jau yra `*.b1.church`.

Vidiniai host'ai (`localhost`, `b1.church` ir priesagos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app`) visiškai praleidžia paiešką. Jie jau išspręsti pagrindinės dalies perrašymu arba yra peržiūros ir diegimo host'ai.

Pati paieška (`DomainRepo.loadByName`) atlieka `domains → churches` ir `domains → sites` left join ir grąžina `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`. Tai priskirtos antrinės svetainės subdomenas, jei domenas nukreiptas į ją, kitu atveju bažnyčios subdomenas. Pirmiausia ieškoma tikslaus host. Jei tas host prasidėjo `www.` ir nerado, paieška pakartojama **vieną kartą** su bare apex.

Grįžus į `next.config.mjs`, `x-site` perrašymo taisyklės dedamos **prieš** bendrąsias host taisykles, todėl jos laimi. `x-site: grace.b1.church` → pagrindinė dalis `grace` → `[sdSlug] = grace`, o nuo čia susiejimas identiškas subdomeno keliui (tas pats `churches/lookup`, tas pats `siteId`).

:::info
`x-site` antraštė iš išorės nepatikima. Tarpinė programinė įranga besąlygiškai pašalina bet kokią ateinančią `x-site` antraštę prieš galbūt nustatydama savo. Perrašymo taisyklės mato tik tarpinės programinės įrangos nustatytą reikšmę, todėl klientas negali priverstinai patekti į kitos bažnyčios turinį siųsdamas antraštę.
:::

Du operaciniai tarpinės programinės įrangos ypatumai:

- **Talpykla.** Kiekvieno host rezultatas (sėkmė *arba* patvirtintas nesėkmingas radimas, niekada tinklo klaida) saugomas **10 minučių** atmintyje esančiame `Map`, kiekvienoje serverless izoliacijoje.
- **Atitikmuo.** Atitikmuo tyčia vėl įtraukia `/sitemap.xml`, `/robots.txt` ir `/manifest.webmanifest`. Jo pirmasis šablonas išskiria taškuotus kelius, kitaip tie failai būtų prarasti. Jie pridedami atgal, kad pasirinktinio domeno kiekvienos bažnyčios SEO ir PWA failai taip pat gautų `x-site` antraštę.
- **Kanoninė antraštė.** Bažnyčios puslapiams tarpinė programinė įranga prideda `Link: <{proto}://{host}{path}>; rel="canonical"` atsakymo antraštę. Ji nurodo host, iš kurio puslapis iš tikrųjų buvo pateiktas: subdomeną ar pasirinktinį domeną (`helpers/canonicalLink.ts`). Kai pasirinktinis domenas pasiekia B1App per [Caddy tarpinį serverį](../deployment/caddy-proxy.md), užklausos host yra `{sub}.b1.church` subdomenas. Todėl tarpinė programinė įranga vietoj to naudoja lankytojo domeną iš `X-Church-Host`, bet tik tada, kai `/domains/public/lookup/{host}` patvirtina, kad tas domenas susiejamas su tuo pačiu subdomenu (`ownsSubdomain()`). Tuomet kanoninė nuoroda, `robots.txt` ir `sitemap.xml` nurodo pasirinktinį domeną, o ne `b1.church` subdomeną. Antraštė praleidžiama ne bažnyčios host'uose (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`), taip pat `/mobile`, `/login`, `/logout` ir sugeneruotuose robots, sitemap bei manifest failuose.

### Išjungta viešoji svetainė

Bažnyčia gali įjungti **Disable Public Website** B1Admin (bažnyčios lygio turinio nustatymas `hidePublicSite = "true"`). Tada svetainė teikia tik narių maršrutus:

- **B1App tarpinė programinė įranga** ieško subdomeno (`/membership/churches/lookup`, po to `/content/settings/public/:churchId`) ir nukreipia anoniminius užklausas į bet kurį kelią, kuris nepatenka į leidžiamųjų sąrašą, į `/login?returnUrl={path}{query}`. Leidžiamasis sąrašas (`helpers/publicSite.ts`) yra `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` ir manifest, robots bei sitemap failai. Talpinami tik patvirtinti atsakymai: gamyboje 60 sekundžių, nes administratoriaus revalidacijos kvietimas negali išvalyti šio kiekvienos instancijos žemėlapio. Dev ir test aplinkose talpykla išjungta. API klaida rodo svetainę, o ne užrakina visų.
- **Prisijungę nariai mato visą svetainę.** Užklausa su nepasibaigusiu `jwt` slapuku praleidžia nukreipimą. Tarpinės programinės įrangos `hasSession()` iššifruoja naudingosios apkrovos `exp`, bet nepatikrina parašo, todėl tai minkštas vartas, ne prieigos kontrolė. Prisijungęs narys grįžta į puslapį, kurio prašė, ir mato įprastus puslapius, integruotus puslapius (Grupės, Pamokslai ir kt.) bei antraštės navigaciją. Puslapių komponentai ir `Header` nebetikrina `hidePublicSite` patys.
- **`robots.txt`** draudžia viską, kaip ir noindex host'uose.
- **API.** `GET /content/pages/public/:churchId` (svetainės žemėlapio puslapių sąrašas) grąžina `[]`, todėl anoniminiai iškvietėjai negali išvardyti puslapių.

### `siteId` perdavimas

`ConfigHelper` saugo išspręstą `siteId` savo užklausos `ConfigurationInterface` (įsimenama su React `cache()`). Jis prideda `?siteId=` prie turinio kvietimų, kuriuos atlieka pats ir puslapių komponentai, bet **sąlygiškai**: tuščias `siteId` (pagrindinės bažnyčios subdomenas) parametro visiškai nepridedą. Perduodami galutiniai taškai yra puslapių medis (`/content/pages/:id/tree`), viešasis puslapių sąrašas, naudojamas svetainės žemėlapyje (`/content/pages/public/:id`), bendri stiliai (`/content/globalStyles/church/:id`), navigacijos nuorodos (`/content/links/church/:id`) ir atskiras poraštės blokas (`/content/blocks/public/footer/:id`). Įprastu atvaizdavimo keliu poraštė ateina puslapio medyje (skyriai pažymėti `zone: "siteFooter"`) ir jau gauta su `siteId`, todėl neapibrėžtos poraštės spragos nėra.

Narių portalas (B1App `mobile`) tyčia nepatenka į tai. `loadChurchAppearance.ts` išsprendžia bažnyčią per `churches/lookup`, bet skaito bažnyčios lygio `/settings/public/{id}` ir niekada neperduoda `siteId`. Portalas v1 versijoje yra visos bažnyčios mastu (žr. žemiau).

## Kelios svetainės vienai bažnyčiai

### Duomenų modelis

Naujoji `membership.sites` lentelė tyčia labai paprasta:

| Stulpelis | Tipas | Pastabos |
|-----------|-------|----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Savininkė bažnyčia |
| `name` | `varchar(255)` | Rodomas pavadinimas (pvz., "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unikalus indeksas**: globali vardų erdvė (žr. žemiau) |

Svetainės priskyrimas vyksta vienu stulpeliu, kuriame negali būti NULL reikšmių. Jis pridedamas turinio ir domenų lentelėms:

| Lentelė (modulis) | Stulpelis | Ką reiškia `''` |
|-------------------|-----------|-----------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domenas aptarnauja pagrindinę svetainę |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Pagrindinė svetainė. Lentelėje `blocks` `''` papildomai reiškia *bendrą visoms svetainėms* |

Dvi migracijos prideda visa tai (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Kadangi stulpelio numatytoji reikšmė yra `''`, kiekviena esama eilutė išlieka su dabartiniu elgesiu be papildomo duomenų užpildymo.

**Globali subdomenų vardų erdvė.** `sites.subDomain` dalijasi *viena* vardų erdve su `churches.subDomain`. Svetainės subdomenas niekada negali susikirsti su bažnyčios subdomenu ar kitos svetainės subdomenu. Tai užtikrinama **abiejuose** išsaugojimo keliuose: `SiteController.save` atmeta slug, kuris atitinka `churches` ar `sites`, o `ChurchController.validateSave` daro tą patį atvirkščia kryptimi. Unikalus indeksas `sites.subDomain` tai palaiko duomenų bazės lygiu.

**Puslapių unikalumas** išplėstas iš `(churchId, url)` į `(churchId, siteId, url)`, todėl dvi vienos bažnyčios svetainės gali turėti kiekviena savo `/about`.

### Svetainės turinys su atsarginiais variantais

Kiekvienas svetainės turinio **sąrašo arba medžio** galutinis taškas priima pasirenkamą `?siteId=` (jei jo nėra, reikšmė yra `''`, t. y. pagrindinė svetainė). Tai puslapių medis, sąrašas ir viešieji puslapiai, blokų sąrašas, blokai pagal tipą ir poraštė, nuorodos (anoniminės, filtruotos, visos) bei bendri stiliai. Skyriai ir elementai tiesiogiai nepriklauso svetainei. Jie paveldi ją per savo tėvinį puslapį ar bloką.

Dvi išsprendimo grandinės atlieka svarbiausią darbą:

- **Bendri stiliai: `svetainė → pagrindinė → numatytoji`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` grąžina svetainės pačios eilutę. Jei antrinė svetainė jos neturi, grąžinama **pagrindinės (`''`) eilutė tokia, kokia yra**. Ji išlaiko pagrindinės `id` ir `siteId`, kuriuos klientas naudoja kopijavimui rašant. Jei nėra ir pagrindinės eilutės, `GlobalStyleController` grąžina kietai užkoduotą numatytąją paletę ir šriftus.
- **Poraštės blokas: svetainės konkretus laimi, bendras yra atsarginis.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` grąžina bendras (`''`) *ir* svetainės konkrečias eilutes. Sprendėjas pasirenka svetainės savo poraštę, jei ji yra, kitu atveju bendrą. Ta pati logika vykdoma ir `TreeHelper.insertBlocks` (puslapio medis), ir atskirame `/content/blocks/public/footer/:churchId` galutiniame taške.

### Svetainės šalinimo kaskada

`SiteController.delete` (valdomas pagal narių Settings→Edit leidimą) pašalina antrinę svetainę trimis žingsniais:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskadiniu būdu ištrina visą svetainės turinį: jos **puslapius** su jų skyriais, elementais, `pageHistory` ir `posts`; jos savus **blokus** su jų skyriais, elementais ir `pageHistory`; jos **nuorodas** ir **globalStyles**. Apsauga atsisako veikti `''`, todėl pagrindinė ar bendra sentinelė niekada nekaskaduojama.
2. `DomainRepo.clearSiteId` **perskiria** svetainės domenus atgal pagrindinei svetainei (`siteId → ''`), o ne juos ištrina. Taip pasirinktinis domenas išlieka pašalinus svetainę.
3. `sites` eilutė ištrinama, o Caddy maršrutai iš naujo sinchronizuojami (geriausių pastangų principu).

### B1Admin sąsaja

| Galimybė | Kur | Mechanizmas |
|----------|-----|-------------|
| Svetainių perjungiklis | `useSiteSelection` ir `SiteSwitcher` (tuščia reikšmė = "Main Website") | Skaito `?site=` URL parametrą ir perduoda jį kaip `?siteId=` į ContentApi kvietimus. Yra trijose svetainių **sąrašo** srityse: **Pages**, **Blocks** ir **Appearance**. Puslapių ir blokų redaktoriuose jo nėra, nes ten `siteId` saugomas įraše |
| Svetainių kūrimas ir šalinimas | `SitesDialog`, atidaromas iš perjungiklio įrašo "Manage websites…" | `POST /membership/sites` ir `DELETE /membership/sites/:id` (pavadinimas ir subDomain). Valdoma pagal narių Settings→Edit leidimą (serveryje `Permissions.settings.edit`, B1Admin `Permissions.membershipApi.settings.edit`). **Tik kūrimas ir šalinimas: v1 versijoje pervadinimo sąsajos nėra** |
| Domeno priskyrimas svetainei | `DomainSettingsEdit` Settings→Domains skiltyje | Kiekvienos eilutės svetainės išskleidžiamasis sąrašas siunčia kiekvieno domeno `siteId` į `/membership/domains`. Stulpelis paslepiamas, jei API negrąžina svetainių (senesnė backend versija) |
| Kopijavimo rašant stiliai | `StylesManager.prepareForSave` | Kai įkeltos bendro stiliaus eilutės `siteId` nesutampa su pasirinkta svetaine (t. y. API grąžino paveldėtą pagrindinę kaip atsarginį variantą), ji pašalina pagrindinės `id` ir įrašo dabartinį `siteId`. Tai priverčia **įterpti** naują svetainės konkrečią eilutę vietoj pagrindinės perrašymo. Ta pati šakojimo logika taikoma ir svetainės poraštės blokui |

:::info
**Kas v1 versijoje lieka visos bažnyčios mastu (tyčinis apimties pasirinkimas, ne duomenų modelio apribojimas):** **tinklaraštis** (`BlogPage` neturi perjungiklio ir įkelia `/posts` be `siteId`), **svetainės valdikliai** (skelbimų juosta ir paleidimo mygtukas), **nukreipimai**, **logotipas, GA4 ir bažnyčios nustatymai** bei **narių portalas** (B1App mobile). Tai *ne* visas Appearance puslapis. Antrinės svetainės bendri stiliai (paletė, šriftai, tipografija, tarpai, navigacija, pasirinktinis CSS) **yra** svetainės konkretūs per aukščiau aprašytą kopijavimo rašant kelią. Bažnyčios mastu lieka tik Appearance puslapio juostos, paleidimo mygtuko, nukreipimų ir logotipo skyriai.
:::

## Pasirinktiniai domenai: Caddy kraštinė (statinės konfigūracijos planas)

:::info
**Kryptis peržiūrėta 2026-07-02.** Ankstesnis planas perkelti pasirinktinių domenų talpinimą į Vercel valdomus domenus buvo **atšauktas**. Visas Vercel domenų registracijos kodas (`VercelHelper`, jo `vercelToken`, `vercelProjectId` ir `vercelTeamId` aplinkos kintamieji, SSM parametrai ir patikros įrašai) pašalintas iš Api. Savarankiškai valdomas **Caddy tarpinis serveris EC2 lieka** kaip nuolatinė pasirinktinių domenų kraštinė. Vienintelis likęs darbas yra vidinis: Caddy *veikimo metu* admin API konfigūraciją pakeisti *statine* konfigūracija, kuri išlieka perkrovus.
:::

### Kraštinė

Kiekvienas bažnyčios pasirinktinis domenas DNS įrašais nukreipiamas į vieną EC2 mašiną, `3.23.251.61`, kuri pasiekiama ir kaip `proxy.b1.church`. B1Admin Settings→Domains ekranas nurodo bažnyčioms pridėti apex `A → 3.23.251.61` arba `CNAME → proxy.b1.church`. Caddy nutraukia TLS su kiekvieno domeno Let's Encrypt sertifikatu, perrašo `Host` antraštę į domeno `{sub}.b1.church` šaltinį ir persiunčia užklausą B1App. Ši maršrutizuoja pagal pagrindinę dalį kaip ir bet kurį gimtąjį subdomeną (žr. [Pasirinktiniai domenai](#custom-domains) aukščiau).

Šaltinio atitikmuo ateina iš `DomainRepo.loadPairs`. Jo `dial` **COALESCE'ina priskirtos svetainės subdomeną**, todėl domenas persiunčiamas į teisingą *antrinę* svetainę, o jos nesant, į bažnyčios pagrindinę:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` eilutės neįtraukiamos į žemėlapį. Caddy aptarnauja `www.{host}` per `302` peradresavimą į apex.

### Du anoniminiai galutiniai taškai maitina kraštinę

`DomainController` atskleidžia du neautentifikuotus, tik skaitymo galutinius taškus, kuriuos mašina naudoja tiesiogiai. Jie anoniminiai iš būtinybės, nes kraštinė juos užklausia dar prieš bet kokį bažnyčios kontekstą:

| Galutinis taškas | Grąžina | Vaidmuo |
|------------------|---------|---------|
| `GET /membership/domains/authorize?domain=` | `200`, jei domenas (arba, jei `www.` nerado, jo bare apex) egzistuoja `domains` lentelėje. Kitu atveju `404`, įskaitant tuščią `domain` | Caddy **on-demand-TLS `ask`**: piktnaudžiavimo kontrolė, nusprendžianti, ar išduoti sertifikatą ateinančiam SNI |
| `GET /membership/domains/hostmap` | `text/plain`, po vieną surūšiuotą eilutę `{domain} {sub}.b1.church` kiekvienam maršrutizuojamam domenui | Host→šaltinio žemėlapio failas, kurį mašina atnaujina pagal laikmatį |

`authorize` naudoja `DomainRepo.loadByName` (tikslus host, po to vienas pakartojimas `www.`→apex). `hostmap` naudoja `loadPairs`, todėl jis yra svetainei jautrus ir neįtraukia `www.*`, kaip ir persiuntimo maršrutai. Jis tik nuima `:443` priesagą.

### Domeno išsaugojimas ir šalinimas: vienas geriausių pastangų perdavimas

`DomainController.save` įrašo `domains` eilutes ir tada atlieka **vieną geriausių pastangų** `CaddyHelper.updateCaddy()` iškvietimą. Jis apgaubtas `try/catch`, kuris įrašo klaidą (`console.error`) ir ją nutildo. `delete` daro tą patį, o tai taip pat ištaisė ankstesnę klaidą, kai trinant liko pasenę maršrutai. Tą patį daro ir antrinės svetainės šalinimas (`SiteController.delete`). Pats `updateCaddy` ribojamas **10 sekundžių** Axios skirtimo laiku, todėl nepasiekiamas ar sustabdytas Caddy niekada negali sukelti `500` klaidos domeno išsaugojimo metu. Tiesos šaltinis yra `domains` lentelė.

### Dabartinė būsena: statinė konfigūracija, jokios veikimo metu būsenos

Mašina (Windows EC2 už nuolatinio Elastic IP) paleidžia Caddy iš **statinio Caddyfile**. Jame yra on-demand TLS, kurio `ask` nukreiptas į `/membership/domains/authorize`, ir host→šaltinio žemėlapio failas. Jį kas 5 minutes atnaujina suplanuota užduotis iš `/membership/domains/hostmap`, o užduotis baigiasi švelniu `caddy reload`. Konfigūracija išlieka perkrovus be jokios veikimo metu būsenos, todėl nereikia pakartotinio „paruošimo". Nežinomas SNI yra **TLS atmetamas**: sertifikatas nėra išduodamas host'ui, kurį `authorize` atmeta. Autorizuotas, bet dar nesusietas host (naujas domenas sinchronizacijos lange) gauna švarų 404. Nauji domenai tampa maršrutizuojami per ~5 minutes po išsaugojimo, o jų sertifikatai išduodami pirmo kreipimosi metu. Sąranka, eksploatavimas ir praktikoje patikrintos klaidos: [Caddy pasirinktinio domeno tarpinis serveris](../deployment/caddy-proxy.md).

### Senasis veikimo metu stūmimas: atsarginis kelias, laukia ištrynimo

`CaddyHelper` (membership modulis) vis dar gali valdyti Caddy per savo **admin API** adresu `caddyHost:caddyPort` (SSM `caddyHost` ir `caddyPort`; nieko nedaro, kai nenustatyta; rodoma `ServerHealthController` Integrations grupėje). `updateCaddy()` PATCH'ina visą maršrutų masyvą. `initializeCaddy()` ir `GET /membership/domains/caddy/init` bei `GET /membership/domains/caddy` galutiniai taškai atkuria veikimo metu konfigūruojamą serverį nuo nulio. Ta konfigūracija gyveno tik Caddy atmintyje, t. y. buvo ta perkrovimo amnezija, kurią pakeitė ši architektūra. Mechanizmas lieka tik kaip atsarginis kelias ir suplanuotas ištrynimui, kai statinė mašina bus stabili. Geriausių pastangų `updateCaddy()` stūmimas išsaugant ir šalinant domeną yra nekenksmingas nieko nedarantis veiksmas statinės mašinos atžvilgiu, nes jos admin API pasiekiama tik iš localhost.

## Susiję puslapiai

- [Caddy pasirinktinio domeno tarpinis serveris](../deployment/caddy-proxy.md): pati kraštinės mašina, naujos mašinos sąranka, WinSW paslauga, žemėlapio sinchronizacijos užduotis ir eksploatavimo klaidos
- [Svetainių kūrėjas](./website-builder.md): puslapių, skyrių ir elementų medis, atvaizdavikliai, tinklaraštis, SEO ir DI generavimas. Tai, kas atvaizduojama, kai užklausa jau susieta su bažnyčia ar svetaine
- [Turinio galutiniai taškai](../api/endpoints/content.md): puslapių, blokų, nuorodų ir bendrų stilių REST sąsaja, dabar visa `?siteId=` jautri
- [B1App](../web-apps/b1-app.md): Next.js programa, kurioje veikia tarpinė programinė įranga ir `[sdSlug]` maršrutizavimas
- [Web App diegimas](../deployment/web-apps.md): kaip B1App diegiama į Vercel
