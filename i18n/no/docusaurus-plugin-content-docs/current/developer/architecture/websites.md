---
title: "Nettsted ruting og multi-nettsted"
---

# Nettsted ruting og multi-nettsted

<div class="article-intro">

Ein eneste kirke kan nå betjene mer enn ein distinkt nettsted, og hver ein kan lever på en `*.b1.church` subdomene eller på ein helt egne, kirke-eid domene. Denne siden kartlegger ruting lag som sitter *under* bygger: hvordan ein innkommende forespørsel løse til en kirke **og** til ein spesifikk nettsted, multi-nettsted data modellen (den `siteId` sentinel som holder hver allerede-eksisterende nettsted gjengivelse uendret), og egne-domene kant — ein selv-administrert Caddy proxy på EC2 som avslutter TLS og skrive hver kirke domene på sin `*.b1.church` oppstrøm. For hva som faktisk gjengive en gang ein forespørsel har løse — side/seksjonen/element tre — se [nettsted bygging](./website-builder).

</div>

## Oversikt

```
   grace.b1.church              www.gracechurch.org  (egne domene)
   (b1.church subdomene)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy kant — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • avslutter TLS (per-domene LE sert)      │
          │             │  • skrive Host → {sub}.b1.church           │
          │             │  • omvendt-proxy til B1App                │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • alltid: slett noe som helst klient-levert x-site (anti-spoof)│
   │  • intern *.b1.church Host ⇒ domener oppslag blir inert      │
   │  • rå egne Host (omgå Caddy) ⇒ oppslag → sett x-site         │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host første-etikett → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   thread ?siteId= inn i hver innhold kall:       │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domene lagring/sletting (B1Admin Innstillinger→domener → POST /membership/domains)
        └─ beste-innsats CaddyHelper.updateCaddy()  (omviklet, ikke-fatal, 10s timeout)
  Caddy leser domener tabellen selv via to anonym endepunkter:
        GET /membership/domains/authorize  — etterspørsmål-TLS `spør` (200 kjent / 404 ukjent)
        GET /membership/domains/hostmap    — host→{sub}.b1.church kart (5-min oppfrisk)
```

Tre regler holder på tvers av dette laget:

1. **Ein sentinel holder alt bakover kompatibel.** `siteId = ''` er primær nettsted. Hver side, blokk, lenke, global-stil, og domene rad som eksisterte før denne funksjon bærer `''` og gjengive nøyaktig som det gjorde. Ein *andre* nettsted er ganske enkelt ein sett av rader med ein ikke-tom `siteId`, og noe som helst innhold endepunkt kalt uten `?siteId=` returnerer primær nettsted — byte-for-byte den gamle forespørsel.
2. **Løsning er vert-etikett-basert og konvergerer.** Ein `*.b1.church` subdomene rute etter sin vert etikett direkte; ein egne domene blir skrevet til sin `{sub}.b1.church` etikett på Caddy kant før B1App ser det (med ein middleware DB oppslag som stempel ein `x-site` header som tilbakefallet for noe som helst rå egne `Host`). Begge ben lande på samme `[sdSlug]` rute og samme `churches/lookup` kall, så nedstrøm gjengivelse er identisk.
3. **Caddy kant er stateless over ein kilde til sannhet.** Egne domener avslutter på ein selv-administrert Caddy proxy på EC2 som skrive hver domene på sin `{sub}.b1.church` oppstrøm. Ein domene lagring fyr en eneste beste-innsats `CaddyHelper.updateCaddy()`, og Caddy også leser `domains` tabellen direkte (den `authorize` og `hostmap` endepunkter nedenfor). Tabellen er autoritativ — ein uoppnåelig Caddy kan aldri mislykkes ein lagring.

## Nettsted løsning

### `*.b1.church` subdomener

`B1App/next.config.mjs` skrive innkommende forespørsel etter vert. Ein vert regel med mønstre `(?<subdomain>.*?)\..*` fanger **første etikett** av verten og skrive `/` og `/:path*` inn i `/{subdomain}` — den `[sdSlug]` app-Router segment. Så `grace.b1.church/about` blir `/grace/about`.

Innsiden `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) kall `GET /membership/churches/lookup/?subDomain={sdSlug}`. Den `ChurchController.getBySubDomain` respons nå har to grener:

| Slug kamerat | Respons | Betydning |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primær nettsted av den kirken |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Ein **andre nettsted** — kontrollen fall tilbake til `sites`, løse eier kirken, og ekko spurt etikett pluss ekstra `siteId` |

At ekstra `siteId` er det eneste som skille ein andre-nettsted forespørsel fra ein primær en; alt annet i rørledningen blir delt.

### Egne domener

Ein kirke-eid domene avslutter på **Caddy kant** (detalj nedenfor), som skrive `Host` header til nettsted `{sub}.b1.church` før proxy til B1App. Så på normal sti B1App mottar en *intern* `*.b1.church` vert og løse det etter vert etikett nøyaktig som ein innebygd subdomene — middleware DB oppslag aldri fyr. `src/middleware.ts` fortsatt kjør på hver forespørsel, men med en alltid-på jobb og en tilbakefallet:

1. **Alltid** — det **slett noe som helst klient-levert `x-site` header**. Den header er spoofbar skrive inngang og blir bare aldri tiltrodd når middleware selv sett det; fjern det er middleware virkelig jobb bak Caddy.
2. **Tilbakefallet, ikke-intern `Host` bare** — for ein rå egne-domene `Host` som når B1App *uten* Caddy skrive, det kall `GET /membership/domains/public/lookup/{host}` og, hvis det returnerer ein `subDomain`, sett `x-site: {subDomain}.b1.church`. Bak Caddy denne grenen er inert fordi `Host` er allerede `*.b1.church`.

Intern vert — `localhost`, `b1.church`, og suffix `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — hopp oppslag helt (de er allerede løst etter vert-etikett skrive, eller er forhåndsvisning/deploy vert).

Oppslaget selv (`DomainRepo.loadByName`) venstre-sammenføy `domains → churches` og `domains → sites` og returnerer `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — den tildelt andre nettsted subdomene hvis domenet peker på ein, ellers kirken. Det kamerat nøyaktig vert først; hvis den vert begynt med `www.` og mistet, det prøv **en gang** mot naken apex.

Tilbake i `next.config.mjs`, `x-site` skrive reglene blir plassert **foran** generisk vert reglene, så de vin. `x-site: grace.b1.church` → første etikett `grace` → `[sdSlug] = grace`, og fra der løsning er identisk til subdomene sti (samme `churches/lookup`, samme `siteId`).

:::info
Den `x-site` header er mistrodd fra utsiden. Middleware ubetinget fjern noe som helst inngang `x-site` før valgfritt setter sin egen, og skrive regler bare aldri se middleware-sett verdi — ein klient kan ikke force seg selv på annens kirke innhold ved å sende ein header.
:::

To operativ detalj på middleware:

- **Buffer.** Hver vert resultat (ein treffer *eller* bekreftet miss — aldri ein nettverk feil) blir buffer for **10 minutter** i ein i-hukommelse `Map`, per serverless isolat.
- **Matcher.** Matcher bevisst re-inkludert `/sitemap.xml`, `/robots.txt`, og `/manifest.webmanifest`. Sin første mønstre ekskludert prikket veier, som ellers ville dråpe de filer; de blir lagt tilbake så ein egne domene per-kirke SEO/PWA filer også mottar `x-site` header.

### `siteId` threading

`ConfigHelper` lagrer den løst `siteId` på sin per-forespørsel `ConfigurationInterface` (memoisert med React `cache()`) og tilføy `?siteId=` til innhold kall det og side komponenter gjør — **betinget**: ein tom `siteId` (ein primær-kirke subdomene) utelate parameter helt. De thread endepunkter er siden tre (`/content/pages/:id/tree`), offentlig side liste brukt av sitemap (`/content/pages/public/:id`), global stil (`/content/globalStyles/church/:id`), nav lenker (`/content/links/church/:id`), og frittstå footer blokk (`/content/blocks/public/footer/:id`). På normal gjengivelse sti footer ankomst innsiden side tre (seksjonen merket `zone: "siteFooter"`), allerede hent med `siteId`, så der er nei un-scoped footer gap.

Medlem portal (B1App `mobile`) bevisst sitter utsiden dette: `loadChurchAppearance.ts` løse kirken via `churches/lookup` men leser kirke-nivå `/settings/public/{id}` og aldri thread `siteId` — portalen er kirke-bredt i v1 (se nedenfor).

## Flere nettsted per kirke

### Datamodell

Den nye `membership.sites` tabell er bevisst tiny:

| Kolonne | Type | Noter |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Eier kirke |
| `name` | `varchar(255)` | Display navn (f.eks. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unik indeks** — global omfang (nedenfor) |

Nettsted omfang er så ein eneste nullable-fri kolonne lagt til innhold og domene tabeller:

| Tabell (modul) | Kolonne | `''` betyr |
|----------------|--------|-----------|
| `domains` (medlemskaps) | `siteId char(11) NOT NULL DEFAULT ''` | Domene betjener primær nettsted |
| `pages`, `links`, `globalStyles`, `blocks` (innhold) | `siteId char(11) NOT NULL DEFAULT ''` | Primær nettsted — og på **`blocks`**, `''` tillegssvis betyr *delt på tvers av alle nettsted* |

To migrasjoner legger til alt av dette (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Fordi kolonne standard til `''`, hver eksisterende rad holder i dag oppførsel med nei backfill.

**Global subdomene omfang.** `sites.subDomain` dele *en* omfang med `churches.subDomain` — ein nettsted subdomene kan aldri collide med ein kirke subdomene eller annens nettsted. Dette blir håndhevet på **begge** lagring sti: `SiteController.save` avvist ein slug som hit enten `churches` eller `sites`, og `ChurchController.validateSave` gjør samme i omvendt. Ein unik indeks på `sites.subDomain` bakk det på database nivå.

**Side unikt** utvidet fra `(churchId, url)` til `(churchId, siteId, url)`, så to nettsted av en kirke kan hver eie sin egen `/about`.

### Per-nettsted innhold, med tilbakefallet

Hver nettsted-omfang innhold **liste/tre** endepunkt tar en valgfri `?siteId=` (fraværelse ⇒ `''` = primær): siden tre / liste / offentlig, blokker liste / etter-type / footer, lenker (anon / filtrert / alle), og global stil. Seksjoner og elementer er *ikke* omfang direkte — de arv gjennom sin morside eller blokk.

To løsning kjeder gjør interessant arbeid:

- **Global stil — `nettsted → primær → standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnerer nettsted egen rad; hvis ein andre nettsted har ingen, det returnerer **primær (`''`) rad som-er** (holde primær `id`/`siteId`, som klient bruker til copy-på-skriving); hvis der er nei primær enten, `GlobalStyleController` returnerer hard-kodet standard palett/font.
- **Footer blokk — nettsted-spesifikk vin, delt fall tilbake.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnerer delt (`''`) *og* nettsted-spesifikk rader; løseren plukk nettsted egen footer hvis til stede, ellers delt en. Samme logikk kjør både i `TreeHelper.insertBlocks` (side tre) og i frittstå `/content/blocks/public/footer/:churchId` endepunkt.

### Nettsted slettings kaskadering

`SiteController.delete` (port på medlemskaps innstillinger→Rediger tillatelse) river ein andre nettsted ned i tre trinn:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskad hele innhold nettsted eier: dets **sider** → deres seksjoner, elementer, `pageHistory`, og `posts`; dets eget **blokker** → deres seksjoner, elementer, og `pageHistory`; dets **lenker** og **globalStyles**. Ein vakt nekter å kjør for `''` — den primær/delt sentinel er aldri kaskadet.
2. `DomainRepo.clearSiteId` **re-tildeling** nettsted domener tilbake til primær (`siteId → ''`) snarere enn sletting, så ein egne domene overleverer ein nettsted slettings.
3. Den `sites` rad blir slettet og Caddy ruter blir re-synkronisert (beste-innsats).

### B1Admin flate

| Evne | Hvor | Mekanisme |
|-----------|-------|-----------|
| Nettsted bytter | `useSiteSelection` + `SiteSwitcher` (tom = "hovednettsted") | Leser ein `?site=` URL param og thread den som `?siteId=` inn i ContentApi kall. Til stede på de tre nettsted **liste** områder — **sider**, **blokker**, **utseende** — men *ikke* side/blokk redaktørere, som bærer `siteId` på posten |
| Nettsted opprett/slett | `SitesDialog`, åpnet fra bytter "Administrer nettsted…" innsettepunkt | `POST /membership/sites` / `DELETE /membership/sites/:id` (navn + subDomain). Port på medlemskaps innstillinger→Rediger tillatelse (`Permissions.settings.edit` server-side; `Permissions.membershipApi.settings.edit` i B1Admin). **Opprett/slett bare — der er nei omdøp UI i v1** |
| Per-domene nettsted tildeling | `DomainSettingsEdit` under innstillinger→domener | Ein per-rad nettsted nedrulling poster `siteId` per domene til `/membership/domains`. Kolonne gjemme hvis API returnerer ingen nettsted (eldre backend) |
| Copy-på-skriving stil | `StylesManager.prepareForSave` | Når laden global-stil rad `siteId` ikke kamerat valgt nettsted (i.e. API returnerte den arvet primær som tilbakefallet), det slipper primær `id` og stempel nåværende `siteId`, tvinge en **sett inn** av ein ny nettsted-spesifikk rad i stedet for overskriving primær. Samme gaffel-på-mismatch gjelder nettsted footer blokk |

:::info
**Hva blir kirke-bredt i v1 (ein bevisst omfang valg, ikke ein data-modell grense):** den **blogg** (`BlogPage` har nei bytter og last `/posts` med nei `siteId`), den **nettsted widgets** (meddelelse banner + launcher), **redirects**, den **logo / GA4 / kirke innstillinger**, og den **medlem portal** (B1App mobil). Merk dette er *ikke* "alle av utseende" — ein andre nettsted global stil (palett, font, typografi, mellomrom, nav, egne CSS) **er** per-nettsted via copy-på-skriving sti over; bare banner/launcher/redirects/logo sub-paneler av utseende side forblir kirke-bredt.
:::

## Egne domener: Caddy kant (statisk-konfig plan)

:::info
**Retning revidert 2026-07-02.** Ein tidligere plan til beveg egne-domene hosting på Vercel-administrert domener ble **avbrutt**, og alle Vercel domene-registrering kode (`VercelHelper`, dets `vercelToken`/`vercelProjectId`/`vercelTeamId` env var, SSM param, og helse poster) ble fjernet fra Api. Den selv-administrert **Caddy proxy på EC2 bli** som permanent egne-domene kant. Den eneste gjenværende arbeid er intern: bytte Caddy runtime admin-API konfig for ein *statisk* konfig som overleverer omstart.
:::

### Kanten

Hver egne kirke domene peker DNS på ein EC2 boks — `3.23.251.61`, også oppnåelig som `proxy.b1.church`. B1Admin innstillinger→domener skjerm instruer kirker til å legge til ein apex `A → 3.23.251.61` eller ein `CNAME → proxy.b1.church`. Caddy avslutter TLS med ein per-domene La oss krypter sert, skrive `Host` header til domene `{sub}.b1.church` oppstrøm, og omvendt-proxy til B1App — som så ruter det etter vert etikett som noe som helst innebygd subdomene (se [egne domener](#custom-domains) over).

Oppstrøm kartleggings kommer fra `DomainRepo.loadPairs`, hvis ring **COALESCEs den tildelt nettsted subdomene** så ein domene proxy til riktig *andre* nettsted, fall tilbake til kirken primær:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` rader blir ekskludert fra kartet; Caddy betjening `www.{host}` via ein `302` omdirigering til apex i stedet.

### To anonym endepunkter fôr kanten

`DomainController` avslører to uautentisert, les-bare endepunkter kassa konsumer direkte — anonym av nødvendighet, siden kant spør dem før noe som helst kirke kontekst eksisterer:

| Endepunkt | Returnerer | Rolle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` hvis domene — eller, for ein `www.` miss, sin naken apex — eksisterer i `domains`; `404` ellers (inkludert ein tom `domain`) | Caddy **etterspørsmål-TLS `spør`**: overgrep kontroll bestem om til utsted ein sert for inn SNI |
| `GET /membership/domains/hostmap` | `text/plain`, ein sortert `{domain} {sub}.b1.church` linje per rutbar domene | Verten→oppstrøm kart fil kassa oppfrisk på ein timer |

`authorize` gjenbruk `DomainRepo.loadByName` (nøyaktig vert, så ein eneste `www.`→apex omprøving); `hostmap` gjenbruk `loadPairs` — så det er nettsted-medvitent og `www.*`-ekskludert, identisk til proxy ruter — og bare fjern `:443` suffix.

### Domene lagring/slett — ein beste-innsats push

`DomainController.save` skriv `domains` rader og så gjør ein **eneste beste-innsats** `CaddyHelper.updateCaddy()` kall, omviklet i ein `try/catch` som logger (`console.error`) og svelger; `delete` gjør samme (som også fiksert ein tidligere stale-rute-på-slett bug), som gjør andre-nettsted slettings (`SiteController.delete`). `updateCaddy` er selv bundet av ein **10s** Axios timeout, så ein uoppnåelig eller stoppet Caddy kan aldri `500` ein domene lagring — den `domains` tabell er kilden til sannhet.

### nåværende tilstand — statisk konfig, nei runtime tilstand

Kassa (Windows EC2 bak permanent elast IP) kjør Caddy fra ein **statisk Caddyfile**: etterspørsmål TLS hvis `spør` peker på `/membership/domains/authorize`, pluss ein vert→oppstrøm kart fil oppfrisk hver 5 minutter fra `/membership/domains/hostmap` av ein planlagt oppgave som ender i ein vennlig `caddy reload`. Konfig overleverer omstart med null runtime tilstand — nei re-primer dans — og ein ukjent SNI er **TLS-avvist** (nei sert blir laget for ein vert `authorize` avvist), mens ein autorisert-men-ikke-ennå-kartlagt vert (ein helt-ny domene innsiden synk vindu) får ein ren 404. Nye domener blir rutbar innsiden ~5 minutter av ein lagring; deres sert blir laget på første hit. Bygge/oppsett, drift, og felt-testet fallgruver: [Caddy egne-domene proxy](../deployment/caddy-proxy).

### Eldre runtime push — tilbakefallet sti, ventende slettings

`CaddyHelper` (medlemskaps modul) kan fortsatt kjør Caddy gjennom sin **admin API** på `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op når usatt; avslør under `ServerHealthController`'s integrasjoner gruppe): `updateCaddy()` PATCH ein full ruter rekke, og `initializeCaddy()` + den `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` endepunkter gjenoppbygger ein runtime-konfigurert server fra bunnen av. Den modus konfig lever bare i Caddy hukommelse — den omstart-amnesia denne arkitektur erstattet. Maskineri forblir eneste som tilbakefallet sti og er planlagt for slettings en gang statisk boks har blitt stabil; den beste-innsats `updateCaddy()` push på domene lagring/slett er ein skadesløs no-op mot statisk boks (dets admin API er localhost-bare).

## Relaterte sider

- [Caddy egne-domene proxy](../deployment/caddy-proxy) — kant boks selv: frisk-boks oppsett, WinSW tjeneste, kart synk oppgave, og drift fallgruver
- [nettsted bygging](./website-builder) — side/seksjonen/element tre, gjengivere, blogg, SEO, og AI generering (hva gjengive en gang ein forespørsel har løse til kirke/nettsted)
- [Innhold endepunkter](../api/endpoints/content) — REST flate for sider, blokker, lenker, og global stil, alle nå `?siteId=`-medvitent
- [B1App](../web-apps/b1-app) — Next.js app som vert middleware og `[sdSlug]` ruting
- [nettapp deployment](../deployment/web-apps) — hvordan B1App blir deploy til Vercel
