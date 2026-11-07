---
title: "Routarea site-urilor și multi-site"
---

# Routarea site-urilor și multi-site

<div class="article-intro">

O singură biserică poate acum servi mai multe site-uri web distincte, iar fiecare poate fi găzduit pe un subdomeniu `*.b1.church` sau pe un domeniu personalizat, deținut de biserică. Această pagină descrie stratul de routare de *sub* constructor: cum se rezolvă o cerere primită către o biserică **și** către un anumit site, modelul de date multi-site (valoarea sentinelă `siteId` care păstrează funcționarea tuturor site-urilor existente) și nodul de domeniu personalizat — un proxy Caddy autogestionat pe EC2, care termină TLS și rescrie fiecare domeniu al bisericii către upstream-ul său `*.b1.church`. Pentru ceea ce se afișează efectiv odată ce o cerere a fost rezolvată — arborele pagină/secțiune/element — vezi [Constructorul de site-uri](./website-builder).

</div>

## Prezentare generală

```
   grace.b1.church              www.gracechurch.org  (domeniu personalizat)
   (subdomeniu b1.church)                 │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Edge Caddy — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • termină TLS (certificat LE per domeniu)│
          │             │  • rescrie Host → {sub}.b1.church         │
          │             │  • face reverse-proxy către B1App         │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • mereu: șterge orice x-site furnizat de client (anti-spoof)│
   │  • Host intern *.b1.church ⇒ căutarea în domenii rămâne inertă│
   │  • Host personalizat brut (ocolind Caddy) ⇒ căutare → setează x-site│
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → prima etichetă a host-ului → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   transmite ?siteId= în fiecare apel de conținut:│
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  salvare/ștergere domeniu (B1Admin Settings→Domains → POST /membership/domains)
        └─ CaddyHelper.updateCaddy() best-effort  (învelit, nefatal, timeout 10s)
  Caddy citește singur tabela domains prin două endpoint-uri anonime:
        GET /membership/domains/authorize  — `ask` pentru TLS la cerere (200 cunoscut / 404 necunoscut)
        GET /membership/domains/hostmap    — harta host→{sub}.b1.church (reîmprospătare la 5 min)
```

Trei reguli sunt valabile pentru acest strat:

1. **O sentinelă păstrează compatibilitatea înapoi.** `siteId = ''` este site-ul principal. Fiecare pagină, bloc, link, stil global și rând de domeniu care exista înainte de această funcționalitate poartă `''` și se afișează exact ca înainte. Un *al doilea* site web este pur și simplu un set de rânduri cu un `siteId` nevid, iar orice endpoint de conținut apelat fără `?siteId=` returnează site-ul principal — exact cererea veche, octet cu octet.
2. **Rezolvarea se bazează pe eticheta host-ului și converge.** Un subdomeniu `*.b1.church` se routează direct după eticheta host-ului; un domeniu personalizat este rescris la eticheta `{sub}.b1.church` la marginea Caddy, înainte ca B1App să-l vadă (cu un lookup în baza de date din middleware, care setează un header `x-site` ca rezervă pentru orice `Host` personalizat brut). Ambele ramuri ajung pe aceeași rută `[sdSlug]` și același apel `churches/lookup`, deci randarea din aval este identică.
3. **Edge-ul Caddy este fără stare peste o singură sursă de adevăr.** Domeniile personalizate se termină la un proxy Caddy autogestionat pe EC2, care rescrie fiecare domeniu către upstream-ul său `{sub}.b1.church`. O salvare de domeniu declanșează un singur `CaddyHelper.updateCaddy()` best-effort, iar Caddy citește și tabela `domains` direct (endpoint-urile `authorize` și `hostmap` de mai jos). Tabela este autoritară — un Caddy inaccesibil nu poate face să eșueze niciodată o salvare.

## Rezolvarea site-ului

### Subdomenii `*.b1.church`

`B1App/next.config.mjs` rescrie cererile primite după host. O regulă de host cu modelul `(?<subdomain>.*?)\..*` capturează **prima etichetă** a host-ului și rescrie `/` și `/:path*` în `/{subdomain}` — segmentul App Router `[sdSlug]`. Deci `grace.b1.church/about` devine `/grace/about`.

În interiorul `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) apelează `GET /membership/churches/lookup/?subDomain={sdSlug}`. Răspunsul `ChurchController.getBySubDomain` are acum două ramuri:

| Slug-ul corespunde | Răspuns | Înseamnă |
|--------------------|---------|----------|
| `churches.subDomain` | `{ id, name, subDomain }` | Site-ul principal al acelei biserici |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **site secundar** — controller-ul revine la `sites`, rezolvă biserica proprietară și returnează slug-ul interogat plus `siteId`-ul suplimentar |

Acel `siteId` suplimentar este singurul lucru care distinge o cerere către un site secundar de una către un site principal; restul pipeline-ului este comun.

Un slug care nu corespunde niciunei tabele revine ca `{}` cu `200`. `ConfigHelper.load` tratează un răspuns fără `id` ca pe un site necunoscut și apelează `notFound()` din Next, astfel încât un subdomeniu necunoscut primește un 404 real, în loc ca fiecare apel ulterior să ceară `/…/undefined`. Ruta paginii-constructor construiește, de asemenea, calea arborelui cu `pageTreePath()` (`src/helpers/pageTreePath.ts`), care codifică slug-ul în URL, astfel încât un slug malformat (backslash-uri, spații) primește 404 în loc să transforme `400`-ul API-ului într-un 500.

### Domenii personalizate

Un domeniu deținut de biserică se termină la **edge-ul Caddy** (detaliat mai jos), care rescrie header-ul `Host` la `{sub}.b1.church` al site-ului înainte de a face proxy către B1App. Deci, pe calea normală, B1App primește un host *intern* `*.b1.church` și îl rezolvă după eticheta host-ului exact ca pe un subdomeniu nativ — lookup-ul în baza de date din middleware nu se declanșează niciodată. `src/middleware.ts` rulează în continuare la fiecare cerere, dar cu o sarcină permanentă și o rezervă:

1. **Mereu** — **șterge orice header `x-site` furnizat de client**. Acest header este input de rescriere care poate fi falsificat și este considerat de încredere doar când middleware-ul însuși îl setează; eliminarea lui este adevărata sarcină a middleware-ului în spatele Caddy.
2. **Rezervă, doar pentru `Host` extern-intern** — pentru un `Host` de domeniu personalizat brut care ajunge la B1App *fără* rescrierea Caddy, apelează `GET /membership/domains/public/lookup/{host}` și, dacă returnează un `subDomain`, setează `x-site: {subDomain}.b1.church`. În spatele Caddy, această ramură este inertă, deoarece `Host` este deja `*.b1.church`.

Host-urile interne — `localhost`, `b1.church` și sufixele `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — sar complet peste lookup (sunt deja rezolvate prin rescrierea după eticheta host-ului sau sunt host-uri de preview/deploy).

Lookup-ul propriu-zis (`DomainRepo.loadByName`) face un left join `domains → churches` și `domains → sites` și returnează `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — subdomeniul site-ului secundar atribuit, dacă domeniul indică unul, altfel pe cel al bisericii. Mai întâi caută host-ul exact; dacă acel host începea cu `www.` și nu a găsit nimic, reîncearcă **o singură dată** cu apex-ul simplu.

Înapoi în `next.config.mjs`, regulile de rescriere `x-site` sunt plasate **înaintea** regulilor generice de host, deci câștigă. `x-site: grace.b1.church` → prima etichetă `grace` → `[sdSlug] = grace`, iar de acolo rezolvarea este identică cu calea subdomeniului (același `churches/lookup`, același `siteId`).

:::info
Header-ul `x-site` nu este de încredere din exterior. Middleware-ul elimină necondiționat orice `x-site` primit înainte de a-l seta opțional pe al său, iar regulile de rescriere văd doar valoarea setată de middleware — un client nu se poate impune peste conținutul altei biserici trimițând un header.
:::

Două detalii operaționale despre middleware:

- **Cache.** Rezultatul fiecărui host (un succes *sau* un eșec confirmat — niciodată o eroare de rețea) este păstrat **10 minute** într-un `Map` în memorie, per izolare serverless.
- **Matcher.** Matcher-ul include intenționat din nou `/sitemap.xml`, `/robots.txt` și `/manifest.webmanifest`. Primul său model exclude căile cu punct, care altfel ar elimina aceste fișiere; ele sunt adăugate înapoi, astfel încât fișierele SEO/PWA ale fiecărei biserici de pe un domeniu personalizat să primească și ele header-ul `x-site`.
- **Header canonic.** Pentru paginile bisericii, middleware-ul adaugă un header de răspuns `Link: <{proto}://{host}{path}>; rel="canonical"`, care indică host-ul de pe care pagina a fost servită efectiv — subdomeniu sau domeniu personalizat (`helpers/canonicalLink.ts`). Când un domeniu personalizat ajunge la B1App prin [proxy-ul Caddy](../deployment/caddy-proxy.md), host-ul cererii este subdomeniul `{sub}.b1.church`, deci middleware-ul folosește în schimb domeniul vizitatorului din `X-Church-Host` — dar doar după ce `/domains/public/lookup/{host}` confirmă că domeniul corespunde aceluiași subdomeniu (`ownsSubdomain()`). Link-ul canonic, `robots.txt` și `sitemap.xml` indică apoi domeniul personalizat, nu subdomeniul `b1.church`. Este omis pe host-urile fără biserică (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) și pe `/mobile`, `/login`, `/logout` și fișierele generate robots/sitemap/manifest.

### Site public dezactivat

O biserică poate activa **Disable Public Website** în B1Admin (setarea de conținut la nivel de biserică `hidePublicSite = "true"`). Site-ul servește atunci doar rutele destinate membrilor:

- **Middleware-ul B1App** caută subdomeniul (`/membership/churches/lookup`, apoi `/content/settings/public/:churchId`) și redirecționează cererile anonime către orice cale din afara listei permise la `/login?returnUrl={path}{query}`. Lista permisă (`helpers/publicSite.ts`) este `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` și fișierele manifest/robots/sitemap. Doar răspunsurile confirmate sunt păstrate în cache (60 de secunde în producție, deoarece apelul de revalidare al administratorului nu poate șterge această hartă per instanță; fără cache în dev/test). O eroare de API servește site-ul în loc să blocheze pe toată lumea.
- **Membrii autentificați văd site-ul complet.** O cerere care poartă un cookie `jwt` nevalabil (funcția `hasSession()` a middleware-ului decodifică `exp` din payload fără a verifica semnătura — este o poartă modestă, nu un control de acces) sare peste redirecționare, astfel încât, după autentificare, un membru revine la pagina cerută și vede paginile normale, paginile integrate (Grupuri, Predici etc.) și navigarea din antet. Componentele de pagină și `Header` nu mai verifică singure `hidePublicSite`.
- **`robots.txt`** interzice totul, ca pe host-urile noindex.
- **API.** `GET /content/pages/public/:churchId` (lista de pagini a sitemap-ului) returnează `[]`, astfel încât apelanții anonimi nu pot enumera paginile.

### Transmiterea `siteId`

`ConfigHelper` stochează `siteId`-ul rezolvat în `ConfigurationInterface`-ul său per cerere (memoizat cu `cache()` din React) și adaugă `?siteId=` la apelurile de conținut pe care le face el și componentele de pagină — **condiționat**: un `siteId` gol (subdomeniul unei biserici principale) omite complet parametrul. Endpoint-urile transmise sunt arborele paginii (`/content/pages/:id/tree`), lista publică de pagini folosită de sitemap (`/content/pages/public/:id`), stilurile globale (`/content/globalStyles/church/:id`), linkurile de navigare (`/content/links/church/:id`) și blocul independent de subsol (`/content/blocks/public/footer/:id`). Pe calea normală de randare, subsolul ajunge în interiorul arborelui paginii (secțiuni marcate cu `zone: "siteFooter"`), deja preluat cu `siteId`, deci nu există o lacună de subsol fără domeniu.

Portalul membrilor (B1App `mobile`) se află intenționat în afara acestui mecanism: `loadChurchAppearance.ts` rezolvă biserica prin `churches/lookup`, dar citește `/settings/public/{id}` la nivel de biserică și nu transmite niciodată `siteId` — portalul este la nivelul întregii biserici în v1 (vezi mai jos).

## Mai multe site-uri web per biserică

### Modelul de date

Noul tabel `membership.sites` este intenționat foarte mic:

| Coloană | Tip | Observații |
|---------|-----|------------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Biserica proprietară |
| `name` | `varchar(255)` | Nume afișat (ex. „Español”, „Youth”) |
| `subDomain` | `varchar(45)` | **Index unic** — spațiu de nume global (mai jos) |

Delimitarea pe site este apoi realizată printr-o singură coloană, fără valori nule, adăugată tabelelor de conținut și domenii:

| Tabel (modul) | Coloană | `''` înseamnă |
|---------------|---------|---------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domeniul servește site-ul principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Site-ul principal — iar la **`blocks`**, `''` înseamnă în plus *comun tuturor site-urilor* |

Două migrări adaugă toate acestea (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Deoarece coloana are valoarea implicită `''`, fiecare rând existent păstrează comportamentul de azi, fără completare de date.

**Spațiu de nume global pentru subdomenii.** `sites.subDomain` partajează *un singur* spațiu de nume cu `churches.subDomain` — un subdomeniu de site nu poate intra niciodată în conflict cu un subdomeniu de biserică sau cu al altui site. Acest lucru este impus pe **ambele** căi de salvare: `SiteController.save` respinge un slug care se regăsește în `churches` sau în `sites`, iar `ChurchController.validateSave` face același lucru invers. Un index unic pe `sites.subDomain` îl susține la nivelul bazei de date.

**Unicitatea paginilor** a fost extinsă de la `(churchId, url)` la `(churchId, siteId, url)`, astfel încât două site-uri ale aceleiași biserici pot avea fiecare propriul `/about`.

### Conținut per site, cu rezerve

Fiecare endpoint de **listă/arbore** de conținut delimitat pe site primește un `?siteId=` opțional (absent ⇒ `''` = principal): arborele/lista/publicul paginilor, lista/după tip/subsol a blocurilor, linkurile (anonim / filtrate / toate) și stilurile globale. Secțiunile și elementele *nu* sunt delimitate direct — moștenesc prin pagina sau blocul părinte.

Două lanțuri de rezolvare fac partea interesantă:

- **Stiluri globale — `site → principal → implicit`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnează rândul propriu al site-ului; dacă un site secundar nu are niciunul, returnează **rândul principal (`''`) așa cum este** (păstrând `id`/`siteId` ale principalului, pe care clientul le folosește pentru copy-on-write); dacă nici principalul nu există, `GlobalStyleController` returnează o paletă/fonturi implicite codificate în cod.
- **Blocul de subsol — cel specific site-ului câștigă, cel comun servește drept rezervă.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnează rândurile comune (`''`) *și* cele specifice site-ului; rezolvatorul alege subsolul propriu al site-ului dacă există, altfel pe cel comun. Aceeași logică rulează atât în `TreeHelper.insertBlocks` (arborele paginii), cât și în endpoint-ul independent `/content/blocks/public/footer/:churchId`.

### Ștergerea site-ului în cascadă

`SiteController.delete` (condiționat de permisiunea Settings→Edit din membership) desfiinţează un site secundar în trei pași:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` șterge în cascadă tot conținutul pe care îl deține site-ul: **paginile** sale → secțiunile, elementele, `pageHistory` și `posts` ale acestora; **blocurile** sale → secțiunile, elementele și `pageHistory` ale acestora; **linkurile** și **globalStyles**-ul său. O gardă refuză să ruleze pentru `''` — sentinela principal/comun nu este niciodată ștearsă în cascadă.
2. `DomainRepo.clearSiteId` **realocă** domeniile site-ului înapoi la principal (`siteId → ''`) în loc să le șteargă, astfel încât un domeniu personalizat supraviețuiește ștergerii site-ului.
3. Rândul din `sites` este șters, iar rutele Caddy sunt resincronizate (best-effort).

### Suprafața B1Admin

| Capabilitate | Unde | Mecanism |
|--------------|------|----------|
| Comutator de site | `useSiteSelection` + `SiteSwitcher` (gol = „Main Website”) | Citește un parametru URL `?site=` și îl transmite ca `?siteId=` în apelurile ContentApi. Prezent în cele trei zone de **listă** pentru site — **Pages**, **Blocks**, **Appearance** — dar *nu* în editoarele de pagini/blocuri, care transportă `siteId` în înregistrare |
| Creare/ștergere de site-uri | `SitesDialog`, deschis din intrarea „Manage websites…” a comutatorului | `POST /membership/sites` / `DELETE /membership/sites/:id` (nume + subDomain). Condiționat de permisiunea Settings→Edit din membership (`Permissions.settings.edit` pe server; `Permissions.membershipApi.settings.edit` în B1Admin). **Doar creare/ștergere — în v1 nu există interfață de redenumire** |
| Atribuirea domeniului către site | `DomainSettingsEdit` din Settings→Domains | Un meniu derulant per rând trimite `siteId` per domeniu către `/membership/domains`. Coloana se ascunde dacă API-ul nu returnează site-uri (backend mai vechi) |
| Stiluri copy-on-write | `StylesManager.prepareForSave` | Când rândul de stil global încărcat are un `siteId` care nu corespunde site-ului selectat (adică API-ul a returnat principalul moștenit ca rezervă), elimină `id`-ul principalului și aplică `siteId`-ul curent, forțând o **inserare** a unui rând nou, specific site-ului, în loc să suprascrie principalul. Aceeași bifurcare la nepotrivire se aplică și blocului de subsol al site-ului |

:::info
**Ce rămâne la nivelul întregii biserici în v1 (o alegere intenționată de delimitare, nu o limită a modelului de date):** **blogul** (`BlogPage` nu are comutator și încarcă `/posts` fără `siteId`), **widget-urile de site** (bannerul de anunțuri + lansatorul), **redirecționările**, **logo-ul / GA4 / setările bisericii** și **portalul membrilor** (B1App mobile). Observați că aceasta *nu* înseamnă „toată secțiunea Appearance” — stilurile globale ale unui site secundar (paleta, fonturile, tipografia, spațierea, navigarea, CSS-ul personalizat) **sunt** per site prin calea copy-on-write de mai sus; doar subpanourile bannerului/lansatorului/redirecționărilor/logo-ului din pagina Appearance rămân la nivelul întregii biserici.
:::

## Domenii personalizate: edge Caddy (plan cu configurație statică)

:::info
**Direcție revizuită la 2026-07-02.** Un plan anterior de a muta găzduirea domeniilor personalizate pe domenii gestionate de Vercel a fost **anulat**, iar tot codul de înregistrare a domeniilor Vercel (`VercelHelper`, variabilele de mediu `vercelToken`/`vercelProjectId`/`vercelTeamId`, parametrii SSM și intrările de health) a fost eliminat din Api. Proxy-ul **Caddy autogestionat pe EC2 rămâne** ca edge permanent pentru domeniile personalizate. Singura muncă rămasă este internă: înlocuirea configurației de *rulare* a API-ului admin al Caddy cu o configurație *statică*, care supraviețuiește repornirilor.
:::

### Edge-ul

Fiecare domeniu personalizat al unei biserici indică DNS-ul către o singură mașină EC2 — `3.23.251.61`, accesibilă și ca `proxy.b1.church`. Ecranul Settings→Domains din B1Admin îndrumă bisericile să adauge un `A` apex → `3.23.251.61` sau un `CNAME` → `proxy.b1.church`. Caddy termină TLS cu un certificat Let's Encrypt per domeniu, rescrie header-ul `Host` la upstream-ul `{sub}.b1.church` al domeniului și face reverse-proxy către B1App — care apoi îl routează după eticheta host-ului ca pe orice subdomeniu nativ (vezi [Domenii personalizate](#domenii-personalizate) mai sus).

Maparea upstream provine din `DomainRepo.loadPairs`, a cărui destinație **COALESCE subdomeniul site-ului atribuit**, astfel încât un domeniu să fie proxiat către site-ul *secundar* corect, cu revenire la principalul bisericii:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Rândurile `www.*` sunt excluse din hartă; Caddy servește `www.{host}` printr-o redirecționare `302` către apex.

### Două endpoint-uri anonime alimentează edge-ul

`DomainController` expune două endpoint-uri nedecontrolate, doar pentru citire, pe care mașina le consumă direct — anonime din necesitate, deoarece edge-ul le interoghează înainte ca vreun context de biserică să existe:

| Endpoint | Returnează | Rol |
|----------|------------|-----|
| `GET /membership/domains/authorize?domain=` | `200` dacă domeniul — sau, pentru un eșec `www.`, apex-ul simplu — există în `domains`; `404` altfel (inclusiv pentru un `domain` gol) | `ask`-ul Caddy pentru TLS la cerere: controlul împotriva abuzului, care decide dacă se emite un certificat pentru un SNI care sosește |
| `GET /membership/domains/hostmap` | `text/plain`, câte o linie sortată `{domain} {sub}.b1.church` per domeniu rutabil | Fișierul de hartă host→upstream pe care mașina îl reîmprospătează periodic |

`authorize` reutilizează `DomainRepo.loadByName` (host exact, apoi o singură reîncercare `www.`→apex); `hostmap` reutilizează `loadPairs` — deci este conștient de site și exclude `www.*`, identic cu rutele proxy — și doar elimină sufixul `:443`.

### Salvarea/ștergerea domeniului — o singură trimitere best-effort

`DomainController.save` scrie rândurile din `domains` și apoi face un **singur** apel best-effort `CaddyHelper.updateCaddy()`, învelit într-un `try/catch` care înregistrează (`console.error`) și înghite eroarea; `delete` face la fel (ceea ce a remediat și un vechi bug de rută învechită la ștergere), la fel ca ștergerea site-ului secundar (`SiteController.delete`). `updateCaddy` este el însuși limitat de un timeout Axios de **10s**, astfel încât un Caddy inaccesibil sau oprit nu poate produce niciodată un `500` la salvarea unui domeniu — tabela `domains` este sursa de adevăr.

### Starea curentă — configurație statică, fără stare de rulare

Mașina (EC2 Windows în spatele unui Elastic IP permanent) rulează Caddy dintr-un **Caddyfile static**: TLS la cerere al cărui `ask` indică `/membership/domains/authorize`, plus un fișier de hartă host→upstream reîmprospătat la fiecare 5 minute din `/membership/domains/hostmap` de către o sarcină programată, care se încheie cu un `caddy reload` grațios. Configurația supraviețuiește repornirilor fără nicio stare de rulare — fără ritualul de re-inițializare — iar un SNI necunoscut este **refuzat la TLS** (nu se emite niciun certificat pentru un host pe care `authorize` îl respinge), în timp ce un host autorizat, dar încă nemapat (un domeniu nou în fereastra de sincronizare), primește un 404 curat. Domeniile noi devin rutabile în ~5 minute de la salvare; certificatele lor sunt emise la prima accesare. Configurarea/instalarea, operarea și capcanele verificate în practică: [Proxy Caddy pentru domenii personalizate](../deployment/caddy-proxy).

### Împingerea de rulare moștenită — cale de revenire, în curs de ștergere

`CaddyHelper` (modulul membership) poate încă să comande Caddy prin **API-ul său admin** la `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; fără efect când nu sunt setate; expus sub grupul Integrations al `ServerHealthController`): `updateCaddy()` trimite un PATCH cu un array complet de rute, iar `initializeCaddy()` + endpoint-urile `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruiesc de la zero un server configurat la rulare. Configurația acelui mod trăia doar în memoria Caddy — „uitarea la repornire” pe care această arhitectură a înlocuit-o. Mecanismul rămâne doar ca cale de revenire și este programat pentru ștergere după ce mașina statică a fost stabilă; împingerea best-effort `updateCaddy()` la salvarea/ștergerea domeniului este un no-op inofensiv față de mașina statică (API-ul ei admin este accesibil doar local).

## Pagini conexe

- [Proxy Caddy pentru domenii personalizate](../deployment/caddy-proxy) — mașina edge în sine: configurarea unei mașini noi, serviciul WinSW, sarcina de sincronizare a hărții și capcanele operaționale
- [Constructorul de site-uri](./website-builder) — arborele pagină/secțiune/element, randatoarele, blogul, SEO și generarea cu AI (ceea ce se afișează odată ce o cerere a fost rezolvată către o biserică/site)
- [Endpoint-uri de conținut](../api/endpoints/content) — suprafața REST pentru pagini, blocuri, linkuri și stiluri globale, toate acum conștiente de `?siteId=`
- [B1App](../web-apps/b1-app) — aplicația Next.js care găzduiește middleware-ul și routarea `[sdSlug]`
- [Implementarea aplicațiilor web](../deployment/web-apps) — cum este implementată B1App pe Vercel
