---
title: "Usmerjanje spletnih strani in več spletnih mest"
---

# Usmerjanje spletnih strani in več spletnih mest

<div class="article-intro">

Ena cerkev lahko zdaj upravlja več ločenih spletnih mest, vsako pa lahko deluje na poddomeni `*.b1.church` ali na popolnoma prilagojeni domeni, ki je last cerkve. Ta stran opisuje plast usmerjanja, ki je *pod* graditeljem: kako se dohodna zahteva razreši v cerkev **in** v določeno spletno mesto, model podatkov za več spletnih mest (čuvar `siteId`, ki ohranja delovanje vseh obstoječih spletnih mest nespremenjeno) ter robni del za domene po meri, to je samostojni posredniški strežnik Caddy na EC2, ki zaključi TLS in preusmeri vsako cerkveno domeno na njen upstream `*.b1.church`. Za to, kaj se dejansko prikaže, ko je zahteva razrešena, to je drevo strani, odsekov in elementov, glejte [Graditelj spletnih strani](./website-builder).

</div>

## Pregled

```
   grace.b1.church              www.gracechurch.org  (domena po meri)
   (poddomena b1.church)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Robni Caddy — EC2 3.23.251.61            │
          │             │             (proxy.b1.church)            │
          │             │  • zaključi TLS (LE certifikat za domeno) │
          │             │  • prepiše Host → {sub}.b1.church        │
          │             │  • reverzni proxy do B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • vedno: izbriše vsak x-site, ki ga pošlje odjemalec (proti ponarejanju) │
   │  • notranji Host *.b1.church ⇒ iskanje domen ostane neaktivno │
   │  • surov Host po meri (mimo Caddy) ⇒ iskanje → nastavi x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → prva oznaka gostitelja → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   prenese ?siteId= v vsak klic vsebine:          │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  shranjevanje/brisanje domene (B1Admin Nastavitve→Domene → POST /membership/domains)
        └─ poskus po najboljših močeh CaddyHelper.updateCaddy()  (ovito, ni usodno, 10 s časovna omejitev)
  Caddy sam bere tabelo domen prek dveh anonimnih končnih točk:
        GET /membership/domains/authorize  — ask za TLS na zahtevo (200 znana / 404 neznana)
        GET /membership/domains/hostmap    — zemljevid host→{sub}.b1.church (osvežitev vsakih 5 min)
```

Tri pravila veljajo v tej plasti:

1. **Čuvar ohranja združljivost nazaj.** `siteId = ''` je primarno spletno mesto. Vsaka stran, blok, povezava, globalni slog in vrstica domene, ki je obstajala pred to funkcijo, nosi `''` in se prikaže natanko tako kot prej. *Drugo* spletno mesto je preprosto niz vrstic z neprazno vrednostjo `siteId`, vsaka vsebinska končna točka, klicana brez `?siteId=`, pa vrne primarno spletno mesto, bajt za bajtom enako kot prejšnja zahteva.
2. **Razreševanje temelji na oznaki gostitelja in se zbližuje.** Poddomena `*.b1.church` se usmeri neposredno po svoji oznaki gostitelja. Domena po meri se na robu Caddy preimenuje v svojo oznako `{sub}.b1.church`, preden B1App sploh vidi zahtevo (z rezervnim iskanjem v bazi v vmesni programski opremi, ki za vsak surov gostiteljski naslov po meri nastavi glavo `x-site`). Obe poti pristaneta na isti usmerjevalni poti `[sdSlug]` in na istem klicu `churches/lookup`, zato je nadaljnje prikazovanje identično.
3. **Robni strežnik Caddy je brez stanja nad enim virom resnice.** Domene po meri se zaključijo na samostojnem strežniku Caddy na EC2, ki vsako domeno preusmeri na njen upstream `{sub}.b1.church`. Shranjevanje domene sproži en poskus `CaddyHelper.updateCaddy()` po najboljših močeh, Caddy pa tudi sam neposredno bere tabelo `domains` (končni točki `authorize` in `hostmap` spodaj). Tabela je merodajna, zato nedosegljiv Caddy nikoli ne more spodleteti shranjevanja.

## Razreševanje spletnega mesta

### Poddomene `*.b1.church`

`B1App/next.config.mjs` prepisuje dohodne zahteve glede na gostitelja. Pravilo gostitelja z vzorcem `(?<subdomain>.*?)\..*` zajame **prvo oznako** gostitelja in prepiše `/` ter `/:path*` v `/{subdomain}`, kar je segment App Router `[sdSlug]`. Tako se `grace.b1.church/about` spremeni v `/grace/about`.

Znotraj `src/app/[sdSlug]/` klic `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) pokliče `GET /membership/churches/lookup/?subDomain={sdSlug}`. Odgovor `ChurchController.getBySubDomain` ima zdaj dve veji:

| Ujemanje oznake | Odgovor | Pomen |
|-----------------|---------|-------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primarno spletno mesto te cerkve |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Sekundarno spletno mesto**: krmilnik se vrne k `sites`, poišče lastniško cerkev in vrne poizvedovano oznako ter dodatni `siteId` |

Ta dodatni `siteId` je edina stvar, ki loči zahtevo sekundarnega spletnega mesta od primarne. Vse ostalo v cevovodu je skupno.

Oznaka, ki se ne ujema z nobeno tabelo, se vrne kot `{}` s kodo `200`. `ConfigHelper.load` odgovor brez `id` obravnava kot neznano spletno mesto in pokliče Nextov `notFound()`, tako da neznana poddomena dobi pravi 404 namesto da vsi nadaljnji klici zahtevajo `/…/undefined`. Usmerjevalnik strani gradnika prav tako gradi pot drevesa z `pageTreePath()` (`src/helpers/pageTreePath.ts`), ki kodira oznako v URL. Napačna oznaka (poševnice nazaj, presledki) tako vrne 404 in ne prikaže API-jevega `400` kot napake 500.

### Domene po meri

Domena, ki je last cerkve, se zaključi na **robnem Caddy** (podrobneje spodaj), ki pred posredovanjem do B1App prepiše glavo `Host` na `{sub}.b1.church` spletnega mesta. Na običajni poti B1App torej prejme *notranji* gostiteljski naslov `*.b1.church` in ga razreši po oznaki gostitelja, enako kot domačo poddomeno. Iskanje v bazi v vmesniku `middleware` se nikoli ne sproži. `src/middleware.ts` se sicer izvede pri vsaki zahtevi, vendar ima eno vedno aktivno nalogo in eno rezervno:

1. **Vedno** izbriše **vsako glavo `x-site`, ki jo pošlje odjemalec**. Ta glava je ponarejiv vhod za prepisovanje in se zaupa samo takrat, ko jo nastavi sam `middleware`. Njeno odstranjevanje je prava naloga `middleware` za Caddy.
2. **Rezerva, samo za nenotranji `Host`**: za surov gostiteljski naslov domene po meri, ki doseže B1App brez prepisa Caddy, pokliče `GET /membership/domains/public/lookup/{host}` in, če ta vrne `subDomain`, nastavi `x-site: {subDomain}.b1.church`. Za Caddy ta veja ostane neaktivna, ker je `Host` že `*.b1.church`.

Notranji gostitelji (`localhost`, `b1.church` ter pripone `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app`) iskanje popolnoma preskočijo. Te zahteve so že razrešene s prepisom oznake gostitelja ali pa so predogledni oziroma namestitveni gostitelji.

Samo iskanje (`DomainRepo.loadByName`) izvede levo združitev `domains → churches` in `domains → sites` ter vrne `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`, to je poddomeno dodeljenega sekundarnega spletnega mesta, če domena kaže nanj, sicer pa poddomeno cerkve. Najprej išče natančen gostitelj. Če se je gostitelj začel z `www.` in ni bilo zadetka, poskusi **enkrat** še z golo domeno (apex).

V `next.config.mjs` so pravila za prepis `x-site` postavljena **pred** splošnimi pravili za gostitelja, zato imajo prednost. `x-site: grace.b1.church` → prva oznaka `grace` → `[sdSlug] = grace`, od tam naprej pa je razreševanje enako kot pri poti s poddomeno (isti `churches/lookup`, isti `siteId`).

:::info
Glava `x-site` je z zunanje strani nezaupanja vredna. Vmesnik `middleware` brezpogojno odstrani vsako dohodno glavo `x-site`, preden po potrebi nastavi svojo. Pravila za prepisovanje vidijo samo vrednost, ki jo je nastavil `middleware`, zato odjemalec ne more vsiliti vsebine druge cerkve s pošiljanjem glave.
:::

Dve operativni podrobnosti za `middleware`:

- **Predpomnilnik.** Rezultat za vsak gostitelj (zadetek *ali* potrjen neuspeh, nikoli napaka omrežja) se shrani za **10 minut** v pomnilnik `Map`, po izolatu brezstrežniške funkcije.
- **Ujemanje.** Vzorec namerno ponovno vključi `/sitemap.xml`, `/robots.txt` in `/manifest.webmanifest`. Prvi vzorec izključuje poti s piko, kar bi sicer izpustilo te datoteke. Ponovno so dodane, da tudi datoteke SEO/PWA cerkve na domeni po meri prejmejo glavo `x-site`.
- **Kanonična glava.** Za cerkvene strani `middleware` doda odzivno glavo `Link: <{proto}://{host}{path}>; rel="canonical"`, ki navaja gostitelja, s katerega je bila stran dejansko postrežena, to je poddomeno ali domeno po meri (`helpers/canonicalLink.ts`). Ko domena po meri doseže B1App prek [posredniškega strežnika Caddy](../deployment/caddy-proxy.md), je gostitelj zahteve poddomena `{sub}.b1.church`. Zato `middleware` namesto tega uporabi obiskovalčevo domeno iz `X-Church-Host`, vendar šele potem, ko `/domains/public/lookup/{host}` potrdi, da ta domena kaže na isto poddomeno (`ownsSubdomain()`). Kanonična povezava, `robots.txt` in `sitemap.xml` tako navajajo domeno po meri, ne pa poddomene `b1.church`. Preskoči se na negostiteljskih naslovih (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) ter na poteh `/mobile`, `/login`, `/logout` in ustvarjenih datotekah robots/sitemap/manifest.

### Onemogočeno javno spletno mesto

Cerkev lahko v B1Admin vklopi **Onemogoči javno spletno mesto** (nastavitev vsebine na ravni cerkve `hidePublicSite = "true"`). Spletno mesto nato postreže samo poti, namenjene članom:

- **Vmesnik B1App `middleware`** poišče poddomeno (`/membership/churches/lookup`, nato `/content/settings/public/:churchId`) in anonimne zahteve za poti zunaj dovoljenega seznama preusmeri na `/login?returnUrl={path}{query}`. Dovoljeni seznam (`helpers/publicSite.ts`) vsebuje `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` ter datoteke manifest/robots/sitemap. Shranjujejo se samo potrjeni odgovori, in sicer 60 sekund v produkciji, ker klic za ponovno validacijo iz skrbniškega vmesnika ne more počistiti tega zemljevida za posamezen primerek. V razvoju in testih se ne shranjujejo. Napaka API-ja postreže spletno mesto, namesto da bi vse zaklenila.
- **Prijavljeni člani vidijo celotno spletno mesto.** Zahteva s še veljavnim piškotkom `jwt` (funkcija `hasSession()` v `middleware` dekodira polje `exp` v koristnem delu brez preverjanja podpisa, zato je to mehka zapora, ne nadzor dostopa) preskoči preusmeritev. Po prijavi se tako član vrne na stran, ki jo je zahteval, in vidi običajne strani, vgrajene strani (Skupine, Pridige itd.) ter glavno navigacijo. Komponente strani in `Header` same več ne preverjajo `hidePublicSite`.
- **`robots.txt`** vse prepoveduje, kot tudi na gostiteljih z noindex.
- **API.** `GET /content/pages/public/:churchId` (seznam strani za sitemap) vrne `[]`, da anonimni klicatelji ne morejo izpisati strani.

### Prenos `siteId`

`ConfigHelper` shrani razrešeni `siteId` v svoj `ConfigurationInterface` za posamezno zahtevo (zapomnjen z Reactovo funkcijo `cache()`) in ga doda klicem vsebine, ki jih izvaja on in komponente strani. To stori **pogojno**: prazen `siteId` (poddomena primarne cerkve) parameter sploh izpusti. Končne točke, ki prenašajo `siteId`, so drevo strani (`/content/pages/:id/tree`), javni seznam strani za sitemap (`/content/pages/public/:id`), globalni slogi (`/content/globalStyles/church/:id`), navigacijske povezave (`/content/links/church/:id`) in samostojni blok noge (`/content/blocks/public/footer/:id`). Na običajni poti prikazovanja noga pride znotraj drevesa strani (odseki z oznako `zone: "siteFooter"`), ki je bilo že pridobljeno s `siteId`, zato ni nobene luknje pri nogi brez omejitve na spletno mesto.

Portal za člane (B1App `mobile`) je namenoma zunaj tega: `loadChurchAppearance.ts` razreši cerkev prek `churches/lookup`, vendar bere nastavitve na ravni cerkve iz `/settings/public/{id}` in nikoli ne prenese `siteId`. Portal je v v1 zasnovan za celotno cerkev (glejte spodaj).

## Več spletnih mest za eno cerkev

### Model podatkov

Nova tabela `membership.sites` je namerno majhna:

| Stolpec | Tip | Opombe |
|---------|-----|--------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Lastniška cerkev |
| `name` | `varchar(255)` | Prikazno ime (npr. "Español", "Mladi") |
| `subDomain` | `varchar(45)` | **Edinstven indeks**, globalen imenski prostor (spodaj) |

Omejitev spletnega mesta se nato doseže z enim stolpcem, dodanim vsebinskim in domenskim tabelam. Stolpec ne dopušča praznih vrednosti:

| Tabela (modul) | Stolpec | `''` pomeni |
|----------------|---------|-------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domena postreže primarno spletno mesto |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primarno spletno mesto. Pri **`blocks`** pa `''` dodatno pomeni *deljeno med vsa spletna mesta* |

Vse to dodata dve migraciji (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Ker je privzeta vrednost stolpca `''`, vsaka obstoječa vrstica ohrani današnje vedenje brez naknadnega polnjenja.

**Globalni imenski prostor poddomen.** `sites.subDomain` deli *en* imenski prostor s `churches.subDomain`, zato poddomena spletnega mesta nikoli ne more trčiti s poddomeno cerkve ali s poddomeno drugega spletnega mesta. To velja na **obeh** poteh shranjevanja: `SiteController.save` zavrne oznako, ki zadene `churches` ali `sites`, `ChurchController.validateSave` pa stori enako v obratni smeri. Za to na ravni baze podatkov skrbi edinstven indeks na `sites.subDomain`.

**Edinstvenost strani** je razširjena z `(churchId, url)` na `(churchId, siteId, url)`, zato lahko dve spletni mesti iste cerkve vsako imata svojo stran `/about`.

### Vsebina po spletnem mestu, z rezervami

Vsaka končna točka za **seznam/drevo** vsebine, omejena na spletno mesto, sprejme izbirni `?siteId=` (če ga ni, je `''`, to je primarno): drevo strani, seznam in javne strani, seznami blokov, blokov po vrsti in noga, povezave (anonimne, filtrirane in vse) ter globalni slogi. Odseki in elementi *niso* neposredno omejeni na spletno mesto. Dedujejo ga prek nadrejene strani ali bloka.

Dve verigi razreševanja opravita zanimivo delo:

- **Globalni slogi: `spletno mesto → primarno → privzeto`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` vrne lastno vrstico spletnega mesta. Če sekundarno spletno mesto nima svoje, vrne **vrstico primarnega (`''`) takšno, kot je** (ohrani `id`/`siteId` primarnega, ki ga odjemalec uporabi za kopiranje ob pisanju). Če primarne vrstice ni, `GlobalStyleController` vrne vgrajeno privzeto paleto barv in pisav.
- **Blok noge: prednost ima nog spletnega mesta, deljeni pa je rezerva.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` vrne deljene (`''`) *in* vrstice, specifične za spletno mesto. Razreševalnik izbere nogo spletnega mesta, če obstaja, sicer deljeno. Enaka logika se izvede tako v `TreeHelper.insertBlocks` (drevo strani) kot v samostojni končni točki `/content/blocks/public/footer/:churchId`.

### Kaskada brisanja spletnega mesta

`SiteController.delete` (omejen na dovoljenje Nastavitve→Uredi v članstvu) sekundarno spletno mesto odstrani v treh korakih:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskadno izbriše vso vsebino, ki pripada spletnemu mestu: njegove **strani** ter njihove odseke, elemente, `pageHistory` in `posts`, njegove **bloke** ter njihove odseke, elemente in `pageHistory`, ter njegove **povezave** in **globalne sloge**. Zaščita zavrne izvedbo za `''`, to je za primarni/deljeni čuvar, ki se nikoli ne kaskadno ne izbriše.
2. `DomainRepo.clearSiteId` domene spletnega mesta **dodeli nazaj** primarnemu (`siteId → ''`), namesto da bi jih izbrisal, zato domena po meri preživi brisanje spletnega mesta.
3. Vrstica `sites` se izbriše in poti Caddy se ponovno sinhronizirajo (po najboljših močeh).

### Površina B1Admin

| Zmožnost | Kje | Mehanizem |
|----------|-----|-----------|
| Preklopnik spletnih mest | `useSiteSelection` + `SiteSwitcher` (prazno = "Glavno spletno mesto") | Prebere parameter URL `?site=` in ga kot `?siteId=` prenese v klice ContentApi. Prisoten na treh **seznamskih** področjih spletnih mest: **Strani**, **Bloki** in **Videz**. Ni pa na urejevalnikih strani/blokov, ki nosijo `siteId` v samem zapisu |
| Ustvarjanje/brisanje spletnih mest | `SitesDialog`, odprt iz vnosa "Upravljaj spletna mesta…" v preklopniku | `POST /membership/sites` / `DELETE /membership/sites/:id` (ime + subDomain). Omejeno na dovoljenje Nastavitve→Uredi v članstvu (`Permissions.settings.edit` na strani strežnika; `Permissions.membershipApi.settings.edit` v B1Admin). **Samo ustvarjanje in brisanje, v v1 ni vmesnika za preimenovanje** |
| Dodelitev spletnega mesta domeni | `DomainSettingsEdit` pod Nastavitve→Domene | Spustni seznam za spletno mesto v vsaki vrstici pošlje `siteId` za vsako domeno na `/membership/domains`. Stolpec se skrije, če API ne vrne nobenega spletnega mesta (starejši zaledni sistem) |
| Slogi kopiraj-ob-pisanju | `StylesManager.prepareForSave` | Ko se naloženi globalni slog ne ujema z izbranim spletnim mestom (to pomeni, da je API vrnil podedovano primarno kot rezervo), izbriše `id` primarnega in vpiše trenutni `siteId`. Tako nastane **vstavitev** nove vrstice, specifične za spletno mesto, namesto prepisa primarne. Enaka razvejitev ob neujemanju velja tudi za nogo spletnega mesta |

:::info
**Kaj v v1 ostane na ravni cerkve (namerna omejitev, ne omejitev podatkovnega modela):** **blog** (`BlogPage` nima preklopnika in nalaga `/posts` brez `siteId`), **gradniki spletnega mesta** (pasica z obvestili in gumb za zagon), **preusmeritve**, **logotip / GA4 / nastavitve cerkve** ter **portal za člane** (B1App mobile). To ni "vsi Videz". Globalni slogi sekundarnega spletnega mesta (paleta, pisave, tipografija, razmiki, navigacija, lasten CSS) **so** po spletnem mestu prek zgoraj opisane poti kopiraj-ob-pisanju. Na ravni cerkve ostanejo samo podokna za pasico, gumb za zagon, preusmeritve in logotip na strani Videz.
:::

## Domene po meri: robni Caddy (načrt statične konfiguracije)

:::info
**Smer spremenjena 2. 7. 2026.** Prejšnji načrt za premik gostovanja domen po meri na domene, ki jih upravlja Vercel, je bil **preklican**, vsa koda za registracijo domen v Vercelu (`VercelHelper`, njegove okoljske spremenljivke `vercelToken`/`vercelProjectId`/`vercelTeamId`, parametri SSM in zdravstveni vnosi) pa je bila odstranjena iz Api. Samostojni **posredniški strežnik Caddy na EC2 ostaja** kot trajni robni del za domene po meri. Preostalo delo je notranje: zamenjava Caddyjeve *izvajalne* konfiguracije prek skrbniškega API-ja s *statično* konfiguracijo, ki preživi ponovne zagone.
:::

### Rob

Vsaka domena cerkve po meri ima DNS, ki kaže na en strežnik EC2, `3.23.251.61`, ki je dosegljiv tudi kot `proxy.b1.church`. Zaslon Nastavitve→Domene v B1Admin cerkvam naroči, naj dodajo golo domeno `A → 3.23.251.61` ali `CNAME → proxy.b1.church`. Caddy zaključi TLS s certifikatom Let's Encrypt za vsako domeno, prepiše glavo `Host` na `{sub}.b1.church` te domene in opravi reverzni proxy do B1App, ki jo nato usmeri po oznaki gostitelja kot katero koli domačo poddomeno (glejte [Domene po meri](#domene-po-meri) zgoraj).

Preslikava upstreama prihaja iz `DomainRepo.loadPairs`, katerega `dial` uporablja `COALESCE` za poddomeno dodeljenega spletnega mesta. Domena se tako posreduje na pravilno **sekundarno** spletno mesto, sicer pa na primarno spletno mesto cerkve:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Vrstice `www.*` so izključene iz zemljevida. Caddy namesto tega streže `www.{host}` s preusmeritvijo `302` na golo domeno.

### Dve anonimni končni točki za rob

`DomainController` izpostavlja dve nepreverjeni, samo za branje namenjeni končni točki, ki ju strežnik uporablja neposredno. Sta anonimni nujno, saj rob poizveduje po njih, preden obstaja kakršen koli kontekst cerkve:

| Končna točka | Vrne | Vloga |
|--------------|------|-------|
| `GET /membership/domains/authorize?domain=` | `200`, če domena (ali za zadetek `www.` njena gola domena) obstaja v `domains`; sicer `404` (vključno s praznim `domain`) | **`ask` za TLS na zahtevo** pri Caddy: nadzor zlorab, ki odloča, ali se za dohodni SNI izda certifikat |
| `GET /membership/domains/hostmap` | `text/plain`, po ena urejena vrstica `{domain} {sub}.b1.church` za vsako usmerljivo domeno | Datoteka zemljevida host→upstream, ki jo strežnik osvežuje z časovnikom |

`authorize` ponovno uporablja `DomainRepo.loadByName` (natančen gostitelj, nato enkratni poskus `www.`→golo domeno), `hostmap` pa ponovno uporablja `loadPairs`. Zato je občutljiv na spletno mesto in izključuje `www.*`, enako kot poti proxyja. Samo odstrani pripono `:443`.

### Shranjevanje/brisanje domene: en poskus potiska po najboljših močeh

`DomainController.save` zapiše vrstice `domains` in nato opravi **en poskus** `CaddyHelper.updateCaddy()` po najboljših močeh, ovit v `try/catch`, ki napako zabeleži (`console.error`) in jo pogoltne. Enako stori `delete`, ki je hkrati odpravil prejšnjo napako zastarelih poti ob brisanju, in tudi brisanje sekundarnega spletnega mesta (`SiteController.delete`). `updateCaddy` je sam omejen z **10 s** časovno omejitvijo Axios, zato nedosegljiv ali ustavljen Caddy nikoli ne more vrniti `500` pri shranjevanju domene. Merodajna je tabela `domains`.

### Trenutno stanje: statična konfiguracija, brez izvajalnega stanja

Strežnik (Windows EC2 za trajnim elastičnim IP-jem) izvaja Caddy iz **statične Caddyfile**. Ta vsebuje TLS na zahtevo, katerega `ask` kaže na `/membership/domains/authorize`, in datoteko zemljevida host→upstream, ki jo vsakih 5 minut osvežuje načrtovana naloga iz `/membership/domains/hostmap`. Ta naloga se konča z elegantnim `caddy reload`. Konfiguracija preživi ponovne zagone brez izvajalnega stanja, brez ponovnega pripravljanja. Neznani SNI je **zavrnjen na ravni TLS** (certifikat za gostitelja, ki ga `authorize` zavrne, se ne izda), gostitelj, ki je odobren, a še ni na zemljevidu (nova domena znotraj obdobja sinhronizacije), pa dobi čisti 404. Nove domene so usmerljive v približno 5 minutah po shranjevanju, njihovi certifikati pa se izdajo ob prvem obisku. Gradnja/nastavitev, delovanje in preizkušene pasti: [Caddy posrednik za domene po meri](../deployment/caddy-proxy).

### Starejše potiskanje v izvajalnem času: pot za povratek, čaka na brisanje

`CaddyHelper` (modul membership) lahko še vedno upravlja Caddy prek **skrbniškega API-ja** na `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; brez učinka, če nista nastavljena; prikazano v skupini Integrations v `ServerHealthController`). `updateCaddy()` izvede PATCH celotnega polja poti, `initializeCaddy()` ter končni točki `GET /membership/domains/caddy/init` in `GET /membership/domains/caddy` pa iz nič zgradita strežnik z izvajalno konfiguracijo. Konfiguracija tega načina je živela samo v pomnilniku Caddy, to je izguba stanja ob ponovnem zagonu, ki jo je ta arhitektura nadomestila. Mehanizem ostaja samo kot pot za povratek in bo izbrisan, ko bo statični strežnik stabilen. Poskus potiska `updateCaddy()` ob shranjevanju/brisanju domene je za statični strežnik neškodljiv brez učinka, ker je njegov skrbniški API dosegljiv samo na localhostu.

## Povezane strani

- [Caddy posrednik za domene po meri](../deployment/caddy-proxy): sam robni strežnik, namestitev novega strežnika, storitev WinSW, naloga sinhronizacije zemljevida in operativne pasti
- [Graditelj spletnih strani](./website-builder): drevo strani/odsekov/elementov, upodabljalniki, blog, SEO in generiranje z AI (kaj se prikaže, ko je zahteva razrešena v cerkev/spletno mesto)
- [Končne točke vsebine](../api/endpoints/content): REST vmesnik za strani, bloke, povezave in globalne sloge, ki so zdaj vsi občutljivi na `?siteId=`
- [B1App](../web-apps/b1-app): aplikacija Next.js, ki gosti `middleware` in usmerjanje `[sdSlug]`
- [Namestitev spletnih aplikacij](../deployment/web-apps): kako je B1App nameščen v Vercel
