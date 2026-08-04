---
title: "Nettstedruting og multi-nettsted"
---

# Nettstedruting og multi-nettsted

<div class="article-intro">

En enkelt kirke kan nå betjene mer enn ett distinkt nettsted, og hvert ett kan ligge på et `*.b1.church`-subdomene eller på et helt egendefinert, kirkeeid domene. Denne siden kartlegger rutingslaget som ligger *under* byggeren: hvordan en innkommende forespørsel løses til en kirke **og** til et spesifikt nettsted, multi-nettsted-datamodellen (`siteId`-vaktposten som holder hvert allerede eksisterende nettsted gjengitt uendret), og kanten for egendefinerte domener — en selvadministrert Caddy-proxy på EC2 som avslutter TLS og skriver om hvert kirkedomene til sin `*.b1.church`-oppstrøm. For hva som faktisk gjengis når en forespørsel har blitt løst — side-/seksjons-/elementtreet — se [Nettstedbygging](./website-builder).

</div>

## Oversikt

```
   grace.b1.church              www.gracechurch.org  (egendefinert domene)
   (b1.church-subdomene)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy-kant — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • avslutter TLS (per-domene LE-sertifikat)│
          │             │  • skriver om Host → {sub}.b1.church       │
          │             │  • reverse-proxyer til B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • alltid: slett enhver klientlevert x-site (anti-spoofing) │
   │  • intern *.b1.church Host ⇒ domeneoppslaget forblir inert  │
   │  • rå egendefinert Host (går utenom Caddy) ⇒ oppslag → setter x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → verts-førsteetikett → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   sender ?siteId= inn i hvert innholdskall:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domenelagring/-sletting (B1Admin Innstillinger→Domener → POST /membership/domains)
        └─ beste-innsats CaddyHelper.updateCaddy()  (innpakket, ikke-fatal, 10s tidsavbrudd)
  Caddy leser domains-tabellen selv via to anonyme endepunkter:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 kjent / 404 ukjent)
        GET /membership/domains/hostmap    — host→{sub}.b1.church-kart (5-min oppfrisking)
```

Tre regler gjelder for dette laget:

1. **En vaktpost holder alt bakoverkompatibelt.** `siteId = ''` er hovednettstedet. Hver side, blokk, lenke, globalstil, og domenerad som eksisterte før denne funksjonen bærer `''` og gjengis nøyaktig som før. Et *andre* nettsted er ganske enkelt et sett med rader med en ikke-tom `siteId`, og ethvert innholdsendepunkt kalt uten `?siteId=` returnerer hovednettstedet — byte-for-byte den gamle forespørselen.
2. **Løsning er vertsetikett-basert og konvergerer.** Et `*.b1.church`-subdomene rutes etter sin vertsetikett direkte; et egendefinert domene skrives om til sin `{sub}.b1.church`-etikett ved Caddy-kanten før B1App ser det (med et middleware-DB-oppslag som stempler en `x-site`-header som fallback for enhver rå egendefinert `Host`). Begge ben lander på samme `[sdSlug]`-rute og samme `churches/lookup`-kall, så nedstrøms gjengivelse er identisk.
3. **Caddy-kanten er stateless over én sannhetskilde.** Egendefinerte domener avsluttes ved en selvadministrert Caddy-proxy på EC2 som skriver om hvert domene til sin `{sub}.b1.church`-oppstrøm. En domenelagring utløser ett enkelt beste-innsats-kall til `CaddyHelper.updateCaddy()`, og Caddy leser også `domains`-tabellen direkte (`authorize`- og `hostmap`-endepunktene nedenfor). Tabellen er den autoritative kilden — en utilgjengelig Caddy kan aldri få en lagring til å feile.

## Nettstedløsning

### `*.b1.church`-subdomener

`B1App/next.config.mjs` skriver om innkommende forespørsler etter vert. En vertsregel med mønsteret `(?<subdomain>.*?)\..*` fanger **første etikett** av verten og skriver om `/` og `/:path*` til `/{subdomain}` — App Router-segmentet `[sdSlug]`. Så `grace.b1.church/about` blir `/grace/about`.

Inne i `src/app/[sdSlug]/` kaller `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}`. `ChurchController.getBySubDomain`-svaret har nå to grener:

| Slug matcher | Svar | Betydning |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hovednettstedet til den kirken |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Et **andre nettsted** — controlleren faller tilbake til `sites`, løser den eiende kirken, og gjentar den spurte etiketten pluss den ekstra `siteId` |

Den ekstra `siteId`-en er det eneste som skiller en andre-nettsted-forespørsel fra en primær; alt annet i pipelinen er delt.

### Egendefinerte domener

Et kirkeeid domene avsluttes ved **Caddy-kanten** (detaljert nedenfor), som skriver om `Host`-headeren til nettstedets `{sub}.b1.church` før den proxyer til B1App. Så på den normale stien mottar B1App en *intern* `*.b1.church`-vert og løser den etter vertsetikett akkurat som et innebygd subdomene — middlewarens DB-oppslag utløses aldri. `src/middleware.ts` kjører fortsatt på hver forespørsel, men med én alltid-på-jobb og én fallback:

1. **Alltid** — den **sletter enhver klientlevert `x-site`-header**. Den headeren er en manipulerbar omskrivingsinngang og stoles bare på når middlewaren selv setter den; å fjerne den er middlewarens egentlige jobb bak Caddy.
2. **Fallback, kun ikke-intern `Host`** — for en rå egendefinert-domene-`Host` som når B1App *uten* Caddys omskriving, kaller den `GET /membership/domains/public/lookup/{host}` og setter, hvis den returnerer en `subDomain`, `x-site: {subDomain}.b1.church`. Bak Caddy er denne grenen inert fordi `Host` allerede er `*.b1.church`.

Interne verter — `localhost`, `b1.church`, og suffiksene `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — hopper over oppslaget helt (de er allerede løst av vertsetikett-omskrivingen, eller er forhåndsvisnings-/utrullingsverter).

Selve oppslaget (`DomainRepo.loadByName`) venstre-joiner `domains → churches` og `domains → sites` og returnerer `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — det tildelte andre-nettstedets subdomene hvis domenet peker på ett, ellers kirkens. Det matcher den eksakte verten først; hvis den verten begynte med `www.` og bommet, prøver den **én gang** mot den nakne apex.

Tilbake i `next.config.mjs` er `x-site`-omskrivingsreglene plassert **foran** de generiske vertsreglene, så de vinner. `x-site: grace.b1.church` → første etikett `grace` → `[sdSlug] = grace`, og derfra er løsningen identisk med subdomene-stien (samme `churches/lookup`, samme `siteId`).

:::info
`x-site`-headeren er ikke tiltrodd fra utsiden. Middlewaren fjerner ubetinget enhver innkommende `x-site` før den eventuelt setter sin egen, og omskrivingsreglene ser bare noensinne den middleware-satte verdien — en klient kan ikke tvinge seg selv inn på en annen kirkes innhold ved å sende en header.
:::

To driftsdetaljer om middlewaren:

- **Cache.** Hver verts resultat (et treff *eller* et bekreftet ikke-treff — aldri en nettverksfeil) caches i **10 minutter** i et in-memory `Map`, per serverløs isolat.
- **Matcher.** Matcheren tar bevisst med `/sitemap.xml`, `/robots.txt`, og `/manifest.webmanifest` tilbake. Dens første mønster ekskluderer prikkede stier, noe som ellers ville droppet disse filene; de er lagt tilbake slik at et egendefinert domenes per-kirke SEO-/PWA-filer også mottar `x-site`-headeren.

### `siteId`-innveving

`ConfigHelper` lagrer den løste `siteId`-en på sitt per-forespørsel `ConfigurationInterface` (memoisert med Reacts `cache()`) og legger til `?siteId=` på innholdskallene den og sidekomponentene gjør — **betinget**: en tom `siteId` (et hovedkirke-subdomene) utelater parameteren helt. De involverte endepunktene er sidetreet (`/content/pages/:id/tree`), den offentlige sidelisten brukt av sitemap (`/content/pages/public/:id`), globale stiler (`/content/globalStyles/church/:id`), navigasjonslenker (`/content/links/church/:id`), og den frittstående bunntekstblokken (`/content/blocks/public/footer/:id`). På den normale gjengivelsesstien ankommer bunnteksten inne i sidetreet (seksjoner merket `zone: "siteFooter"`), allerede hentet med `siteId`, så det finnes ikke noe uomfangsbestemt bunntekst-gap.

Medlemsportalen (B1App `mobile`) sitter bevisst utenfor dette: `loadChurchAppearance.ts` løser kirken via `churches/lookup`, men leser kirkenivå-`/settings/public/{id}` og sender aldri `siteId` — portalen er kirkeomfattende i v1 (se nedenfor).

## Flere nettsteder per kirke

### Datamodell

Den nye tabellen `membership.sites` er bevisst liten:

| Kolonne | Type | Notater |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Eiende kirke |
| `name` | `varchar(255)` | Visningsnavn (f.eks. "Español", "Ungdom") |
| `subDomain` | `varchar(45)` | **Unik indeks** — globalt navnerom (nedenfor) |

Nettstedomfang er deretter én enkelt nullable-fri kolonne lagt til innholds- og domenetabellene:

| Tabell (modul) | Kolonne | `''` betyr |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domenet betjener hovednettstedet |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hovednettstedet — og på **`blocks`** betyr `''` i tillegg *delt på tvers av alle nettsteder* |

To migrasjoner legger til alt dette (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Fordi kolonnen har `''` som standard, beholder hver eksisterende rad dagens atferd uten noen etterfylling.

**Globalt subdomene-navnerom.** `sites.subDomain` deler *ett* navnerom med `churches.subDomain` — et nettsted-subdomene kan aldri kollidere med et kirke-subdomene eller et annet nettsteds. Dette håndheves på **begge** lagringsstier: `SiteController.save` avviser en slug som treffer enten `churches` eller `sites`, og `ChurchController.validateSave` gjør det samme motsatt vei. En unik indeks på `sites.subDomain` sikrer det på databasenivå.

**Sideunikhet** utvidet fra `(churchId, url)` til `(churchId, siteId, url)`, slik at to nettsteder tilhørende én kirke hver kan eie sin egen `/about`.

### Per-nettsted-innhold, med fallback-er

Hvert nettsted-omfangsbestemte innholds-**liste-/tre**-endepunkt tar en valgfri `?siteId=` (fravær ⇒ `''` = hoved): sidetre/-liste/-offentlig, blokker-liste/etter-type/bunntekst, lenker (anon/filtrert/alle), og globale stiler. Seksjoner og elementer er *ikke* omfangsbestemt direkte — de arver gjennom sin overordnede side eller blokk.

To løsningskjeder gjør det interessante arbeidet:

- **Globale stiler — `nettsted → hoved → standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnerer nettstedets egen rad; hvis et andre nettsted ikke har noen, returnerer den **hoved-raden (`''`) som den er** (og beholder hovedens `id`/`siteId`, som klienten bruker til kopier-ved-skriving); hvis det heller ikke finnes noen hoved, returnerer `GlobalStyleController` en hardkodet standardpalett/-font.
- **Bunntekstblokk — nettstedspesifikk vinner, delt faller tilbake.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnerer både den delte (`''`) *og* nettstedspesifikke radene; resolveren velger nettstedets egen bunntekst hvis den finnes, ellers den delte. Samme logikk kjører både i `TreeHelper.insertBlocks` (sidetreet) og i det frittstående `/content/blocks/public/footer/:churchId`-endepunktet.

### Kaskadering ved sletting av nettsted

`SiteController.delete` (sperret på medlemskapsmodulens Innstillinger→Rediger-tillatelse) river ned et andre nettsted i tre steg:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskaderer alt innhold nettstedet eier: dets **sider** → deres seksjoner, elementer, `pageHistory`, og `posts`; dets egne **blokker** → deres seksjoner, elementer, og `pageHistory`; dets **lenker** og **globalStyles**. En vakt nekter å kjøre for `''` — hoved-/delt-vaktposten kaskaderes aldri.
2. `DomainRepo.clearSiteId` **tildeler på nytt** nettstedets domener tilbake til hovedet (`siteId → ''`) i stedet for å slette dem, slik at et egendefinert domene overlever en nettstedsletting.
3. `sites`-raden slettes og Caddy-rutene resynkroniseres (beste innsats).

### B1Admin-flate

| Kapasitet | Hvor | Mekanisme |
|-----------|-------|-----------|
| Nettstedbytter | `useSiteSelection` + `SiteSwitcher` (tomt = "Hovednettsted") | Leser en `?site=`-URL-parameter og sender den videre som `?siteId=` inn i ContentApi-kall. Til stede på de tre nettsted-**liste**-områdene — **Sider**, **Blokker**, **Utseende** — men *ikke* side-/blokkredaktørene, som bærer `siteId` på posten |
| Opprett/slett nettsteder | `SitesDialog`, åpnet fra bytterens "Administrer nettsteder…"-inngang | `POST /membership/sites` / `DELETE /membership/sites/:id` (navn + subDomain). Sperret på medlemskapsmodulens Innstillinger→Rediger-tillatelse (`Permissions.settings.edit` server-side; `Permissions.membershipApi.settings.edit` i B1Admin). **Kun opprett/slett — det finnes ingen omdøpings-UI i v1** |
| Per-domene nettstedtildeling | `DomainSettingsEdit` under Innstillinger→Domener | En per-rad nettsted-nedtrekksliste poster `siteId` per domene til `/membership/domains`. Kolonnen skjules hvis APIet ikke returnerer noen nettsteder (eldre backend) |
| Kopier-ved-skriving-stiler | `StylesManager.prepareForSave` | Når den lastede globalstil-radens `siteId` ikke matcher det valgte nettstedet (dvs. APIet returnerte det arvede hovedet som fallback), dropper den hovedets `id` og stempler gjeldende `siteId`, og tvinger frem en **innsetting** av en ny nettstedspesifikk rad i stedet for å overskrive hovedet. Samme forgreining-ved-uoverensstemmelse gjelder nettstedets bunntekstblokk |

:::info
**Hva som forblir kirkeomfattende i v1 (et bevisst omfangsvalg, ikke en datamodellbegrensning):** **bloggen** (`BlogPage` har ingen bytter og laster `/posts` uten `siteId`), **nettstedwidgetene** (kunngjøringsbanner + launcher), **redirects**, **logo-/GA4-/kirkeinnstillingene**, og **medlemsportalen** (B1App mobil). Merk at dette *ikke* er "hele Utseende" — et andre nettsteds globale stiler (palett, font, typografi, mellomrom, navigasjon, egendefinert CSS) **er** per-nettsted via kopier-ved-skriving-stien over; det er bare banner-/launcher-/redirects-/logo-underpanelene på Utseende-siden som forblir kirkeomfattende.
:::

## Egendefinerte domener: Caddy-kanten (plan for statisk konfigurasjon)

:::info
**Retning revidert 2026-07-02.** En tidligere plan om å flytte hosting av egendefinerte domener til Vercel-administrerte domener ble **kansellert**, og all Vercel-domeneregistreringskode (`VercelHelper`, dens `vercelToken`/`vercelProjectId`/`vercelTeamId`-miljøvariabler, SSM-parametere, og helseoppføringer) ble fjernet fra Api-et. Den selvadministrerte **Caddy-proxyen på EC2 blir værende** som den permanente kanten for egendefinerte domener. Det eneste gjenværende arbeidet er internt: å bytte Caddys *kjøretids*-admin-API-konfigurasjon med en *statisk* konfigurasjon som overlever omstarter.
:::

### Kanten

Hvert egendefinerte kirkedomene peker DNS-en sin mot én EC2-boks — `3.23.251.61`, også tilgjengelig som `proxy.b1.church`. B1Admins Innstillinger→Domener-skjerm instruerer kirker om å legge til en apex `A → 3.23.251.61` eller en `CNAME → proxy.b1.church`. Caddy avslutter TLS med et per-domene Let's Encrypt-sertifikat, skriver om `Host`-headeren til domenets `{sub}.b1.church`-oppstrøm, og reverse-proxyer til B1App — som deretter ruter det etter vertsetikett akkurat som ethvert innebygd subdomene (se [Egendefinerte domener](#custom-domains) over).

Oppstrømskartleggingen kommer fra `DomainRepo.loadPairs`, hvis oppringing **COALESCEr det tildelte nettstedets subdomene** slik at et domene proxyer til det riktige *andre* nettstedet, med fallback til kirkens hovedsted:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*`-rader ekskluderes fra kartet; Caddy betjener `www.{host}` via en `302`-omdirigering til apex i stedet.

### To anonyme endepunkter mater kanten

`DomainController` eksponerer to uautentiserte, skrivebeskyttede endepunkter boksen konsumerer direkte — anonyme av nødvendighet, siden kanten spør dem før noen kirkekontekst eksisterer:

| Endepunkt | Returnerer | Rolle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` hvis domenet — eller, for et `www.`-ikke-treff, dets nakne apex — finnes i `domains`; `404` ellers (inkludert et tomt `domain`) | Caddys **on-demand-TLS `ask`**: misbrukskontrollen som avgjør om det skal utstedes et sertifikat for et innkommende SNI |
| `GET /membership/domains/hostmap` | `text/plain`, én sortert `{domain} {sub}.b1.church`-linje per rutbart domene | Verts-til-oppstrøm-kartfilen boksen oppfrisker på en timer |

`authorize` gjenbruker `DomainRepo.loadByName` (eksakt vert, deretter ett enkelt `www.`→apex-forsøk); `hostmap` gjenbruker `loadPairs` — så det er nettstedbevisst og `www.*`-ekskludert, identisk med proxy-rutene — og strømlinjer bare bort `:443`-suffikset.

### Domenelagring/-sletting — ett beste-innsats-push

`DomainController.save` skriver `domains`-radene og gjør deretter ett **enkelt beste-innsats**-kall til `CaddyHelper.updateCaddy()`, innpakket i en `try/catch` som logger (`console.error`) og svelger; `delete` gjør det samme (som også fikset en tidligere feil med foreldede ruter ved sletting), det samme gjør sletting av andre nettsted (`SiteController.delete`). `updateCaddy` er selv begrenset av et **10s** Axios-tidsavbrudd, så en utilgjengelig eller stoppet Caddy kan aldri gi `500` for en domenelagring — `domains`-tabellen er sannhetskilden.

### Nåværende tilstand — statisk konfigurasjon, ingen kjøretidstilstand

Boksen (Windows EC2 bak den permanente elastiske IP-en) kjører Caddy fra en **statisk Caddyfile**: on-demand TLS hvis `ask` peker på `/membership/domains/authorize`, pluss en verts-til-oppstrøm-kartfil oppfrisket hvert 5. minutt fra `/membership/domains/hostmap` av en planlagt oppgave som avsluttes med en skånsom `caddy reload`. Konfigurasjonen overlever omstarter med null kjøretidstilstand — ingen re-primings-dans — og en ukjent SNI blir **TLS-avvist** (ingen sertifikat lages for en vert `authorize` avviser), mens en autorisert-men-ennå-ikke-kartlagt vert (et helt nytt domene innenfor synkroniseringsvinduet) får en ren 404. Nye domener blir rutbare innen ~5 minutter etter en lagring; sertifikatene deres genereres ved første treff. Bygging/oppsett, drift, og feltestede fallgruver: [Caddy-proxy for egendefinerte domener](../deployment/caddy-proxy).

### Eldre kjøretids-push — fallback-sti, planlagt for sletting

`CaddyHelper` (membership-modulen) kan fortsatt styre Caddy gjennom dens **admin-API** på `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op når usatt; eksponert under `ServerHealthController`s Integrasjoner-gruppe): `updateCaddy()` PATCHer et fullt rutearray, og `initializeCaddy()` + endepunktene `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` bygger opp igjen en kjøretidskonfigurert server fra bunnen av. Den modusens konfigurasjon lå bare i Caddys minne — restart-hukommelsestapet denne arkitekturen erstattet. Maskineriet forblir utelukkende som fallback-stien og er planlagt for sletting når den statiske boksen har vært stabil; det beste-innsats-`updateCaddy()`-pushet ved domenelagring/-sletting er en ufarlig no-op mot den statiske boksen (dens admin-API er kun localhost).

## Relaterte sider

- [Caddy-proxy for egendefinerte domener](../deployment/caddy-proxy) — selve kant-boksen: oppsett av fersk boks, WinSW-tjeneste, kartsynkroniseringsoppgave, og driftsmessige fallgruver
- [Nettstedbygging](./website-builder) — side-/seksjons-/elementtreet, gjengivere, blogg, SEO, og AI-generering (hva som gjengis når en forespørsel har blitt løst til en kirke/et nettsted)
- [Content-endepunkter](../api/endpoints/content) — REST-flaten for sider, blokker, lenker, og globale stiler, alle nå `?siteId=`-bevisste
- [B1App](../web-apps/b1-app) — Next.js-appen som er vert for middlewaren og `[sdSlug]`-rutingen
- [Distribusjon av nettapper](../deployment/web-apps) — hvordan B1App distribueres til Vercel
