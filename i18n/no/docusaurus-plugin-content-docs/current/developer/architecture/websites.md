---
title: "Nettstedsruting og flere nettsteder"
---

# Nettstedsruting og flere nettsteder

<div class="article-intro">

En enkelt kirke kan nå betjene mer enn ett distinkt nettsted, og hvert kan ligge på et `*.b1.church`-underdomene eller på et fullstendig tilpasset, kirkeeid domene. Denne siden kartlegger rutingsjiktet *under* byggeren: hvordan en innkommende forespørsel løses til både en kirke **og** et bestemt nettsted, datamodellen for flere nettsteder (`siteId`-sentinelen som gjør at alle eksisterende nettsteder fortsatt rendrer uendret), og det egne domene-laget — en selvadministrert Caddy-proxy på EC2 som avslutter TLS og skriver om hvert kirkedomene til dets `*.b1.church`-oppstrøms. For hva som faktisk rendres når en forespørsel er løst — sidetreet, seksjonene og elementene — se [Arkitektur for nettsidebyggeren](./website-builder).

</div>

## Oversikt

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

Tre regler gjelder i dette laget:

1. **Et sentinel holder alt bakoverkompatibelt.** `siteId = ''` er hovednettstedet. Hver side, blokk, lenke, globale stil og domenerad som fantes før denne funksjonen bærer `''` og rendrer nøyaktig som før. Et *andre* nettsted er ganske enkelt et sett rader med en ikke-tom `siteId`, og ethvert innholdsendepunkt kalt uten `?siteId=` returnerer hovednettstedet — byte for byte den gamle forespørselen.
2. **Løsning er basert på vertsetiketten og konvergerer.** Et `*.b1.church`-underdomene rutes direkte etter sin vertsetikett; et eget domene skrives om til sin `{sub}.b1.church`-etikett i Caddy-kanten før B1App ser det (med et middleware-databaseoppslag som setter en `x-site`-header som reserve for enhver rå egen `Host`). Begge veier havner på samme `[sdSlug]`-rute og samme `churches/lookup`-kall, så den nedstrøms rendringen er identisk.
3. **Caddy-kanten er tilstandsløs over én sannhetskilde.** Egne domener avsluttes på en selvadministrert Caddy-proxy på EC2, som skriver hvert domene om til sitt `{sub}.b1.church`-oppstrøms. En domenelagring utløser ett enkelt best-effort `CaddyHelper.updateCaddy()`, og Caddy leser også `domains`-tabellen direkte (`authorize`- og `hostmap`-endepunktene nedenfor). Tabellen er autoritativ — en utilgjengelig Caddy kan aldri mislykkes en lagring.

## Nettstedsløsning

### `*.b1.church`-underdomener

`B1App/next.config.mjs` skriver om innkommende forespørsler etter vert. En vertsregel med mønsteret `(?<subdomain>.*?)\..*` fanger **første etikett** av verten og skriver om `/` og `/:path*` til `/{subdomain}` — `[sdSlug]`-App-Router-segmentet. Altså blir `grace.b1.church/about` til `/grace/about`.

Inne i `src/app/[sdSlug]/` kaller `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}`. `ChurchController.getBySubDomain`-svaret har nå to grener:

| Slug samsvarer med | Svar | Betydning |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hovednettstedet til den kirken |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Et **sekundært nettsted** — kontrolleren faller tilbake til `sites`, løser den eide kirken, og ekko den spurte slugen pluss det ekstra `siteId`-feltet |

Det ekstra `siteId` er det eneste som skiller en forespørsel til et sekundært nettsted fra en til hovednettstedet; alt annet i rørledningen er delt.

En slug som ikke samsvarer med noen av tabellene, returnerer `{}` med `200`. `ConfigHelper.load` behandler et svar uten `id` som et ukjent nettsted og kaller Nexts `notFound()`, så et ukjent underdomene får en ekte 404 i stedet for at hvert senere kall spør etter `/…/undefined`. Sidelsruten bygger også innholdstre-stien med `pageTreePath()` (`src/helpers/pageTreePath.ts`), som URL-koder slugen, slik at en feilformet slug (skråstreker, mellomrom) gir 404 i stedet for at API-ets `400` vises som en 500.

### Egne domener

Et kirkeeid domene avsluttes i **Caddy-kanten** (beskrevet nedenfor), som skriver om `Host`-headeren til nettstedets `{sub}.b1.church` før den proxyes til B1App. Så på den normale veien mottar B1App en *intern* `*.b1.church`-vert og løser den etter vertsetikett akkurat som et innebygd underdomene — middlewarens databaseoppslag kjører aldri. `src/middleware.ts` kjører fortsatt på hver forespørsel, men med én alltid-på-jobb og ett reserveveien:

1. **Alltid** — den **sletter enhver klientsendt `x-site`-header**. Den headeren er forfalskbar omskrivingsinnput og blir kun stolt på når middlewaren selv setter den; å fjerne den er middlewarens egentlige jobb bak Caddy.
2. **Reserve, kun ikke-intern `Host`** — for en rå egen `Host` som når B1App *uten* Caddys omskriving, kaller den `GET /membership/domains/public/lookup/{host}` og, hvis det returnerer en `subDomain`, setter `x-site: {subDomain}.b1.church`. Bak Caddy er denne grenen inaktiv fordi `Host` allerede er `*.b1.church`.

Interne verter — `localhost`, `b1.church`, og suffiksene `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — hopper over oppslaget helt (de er allerede løst av vertsetikettomskrivingen, eller er forhånds-/deploy-verter).

Selve oppslaget (`DomainRepo.loadByName`) gjør en venstre-join av `domains → churches` og `domains → sites` og returnerer `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — det tildelte sekundære nettstedets underdomene hvis domenet peker til et, ellers kirkens. Det matcher eksakt vert først; hvis den verten begynte med `www.` og bommet, prøver det **én gang** mot den nakne apexen.

Tilbake i `next.config.mjs` er `x-site`-omskrivingsreglene plassert **foran** de generelle vertsreglene, så de vinner. `x-site: grace.b1.church` → første etikett `grace` → `[sdSlug] = grace`, og derfra er løsningen identisk med underdomeveien (samme `churches/lookup`, samme `siteId`).

:::info
`x-site`-headeren er ikke-klarert utenfra. Middlewaren fjerner ubetinget enhver innkommende `x-site` før den eventuelt setter sin egen, og omskrivingsreglene ser bare den middlewaren-satte verdien — en klient kan ikke tvinge seg inn i en annen kirkes innhold ved å sende en header.
:::

To driftsdetaljer om middlewaren:

- **Cache.** Hver verts resultat (et treff *eller* en bekreftet bom — aldri en nettverksfeil) caches i **10 minutter** i et in-memory `Map`, per serverless-isolat.
- **Matcher.** Matcheren inkluderer med vilje igjen `/sitemap.xml`, `/robots.txt` og `/manifest.webmanifest`. Det første mønsteret ekskluderer prikkede stier, som ellers ville fjernet disse filene; de legges til igjen slik at et eget domenes SEO-/PWA-filer for kirken også får `x-site`-headeren.
- **Kanonisk header.** For kirkesider legger middlewaren til en `Link: <{proto}://{host}{path}>; rel="canonical"`-responsheader som navngir verten siden faktisk ble servert fra — underdomene eller eget domene (`helpers/canonicalLink.ts`). Når et eget domene når B1App gjennom [Caddy-proxyen](../deployment/caddy-proxy), er forespørselsverten `{sub}.b1.church`-underdomenet, så middlewaren bruker besøkendes domene fra `X-Church-Host` i stedet — men bare etter at `/domains/public/lookup/{host}` bekrefter at det domenet peker til samme underdomene (`ownsSubdomain()`). Den kanoniske lenken, `robots.txt` og `sitemap.xml` navngir da det egne domenet i stedet for `b1.church`-underdomenet. Den hoppes over på ikke-kirkeverter (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) og på `/mobile`, `/login`, `/logout` og de genererte robots-/sitemap-/manifest-filene.

### Deaktivert offentlig nettside

En kirke kan skru på **Deaktiver offentlig nettside** i B1Admin (kirkedekkende innholdsinnstilling `hidePublicSite = "true"`). Nettstedet serverer da bare sine medlemsvendte ruter:

- **B1Apps middleware** slår opp underdomenet (`/membership/churches/lookup` og deretter `/content/settings/public/:churchId`) og omdirigerer anonyme forespørsler for enhver sti utenfor tillatelseslisten til `/login?returnUrl={path}{query}`. Tillatelseslisten (`helpers/publicSite.ts`) er `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, og manifest-/robots-/sitemap-filene. Kun bekreftede svar caches (60 sekunder i produksjon, siden administratorens revalidate-kall ikke kan fjerne dette per-instans-kartet; ikke cachet i dev/test). En API-feil serverer nettstedet i stedet for å låse alle ute.
- **Innloggede medlemmer ser hele nettstedet.** En forespørsel med en ikke-utløpt `jwt`-cookie (middlewarens `hasSession()` dekoder `exp` i nyttelasten uten å verifisere signaturen — dette er en myk port, ikke tilgangskontroll) hopper over omdirigeringen, så etter innlogging returnerer et medlem til siden de ba om og ser de vanlige sidene, innebygde sider (Grupper, Taler osv.) og topp-navigasjonen. Sidekomponentene og `Header` sjekker ikke lenger `hidePublicSite` selv.
- **`robots.txt`** forbyr alt, som på noindex-verter.
- **API.** `GET /content/pages/public/:churchId` (sitemapens sideliste) returnerer `[]`, så anonyme kallere kan ikke liste sidene.

### `siteId`-gjennomføring

`ConfigHelper` lagrer den løste `siteId` på sin per-forespørsel `ConfigurationInterface` (memoisert med Reacts `cache()`) og legger til `?siteId=` på innholdskallene den og sidekomponentene gjør — **betinget**: en tom `siteId` (et hovedkirkeunderdomene) utelater parameteren helt. Endepunktene som gjennomføres er sidetreet (`/content/pages/:id/tree`), den offentlige sidelisten brukt av sitemapen (`/content/pages/public/:id`), globale stiler (`/content/globalStyles/church/:id`), navigasjonslenker (`/content/links/church/:id`), og den frittstående bunnteksten (`/content/blocks/public/footer/:id`). På den normale rendringsveien kommer bunnteksten inn i sidetreet (seksjoner merket `zone: "siteFooter"`), allerede hentet med `siteId`, så det finnes ikke noe ikke-avgrenset bunntekstgap.

Medlemsportalen (B1App `mobile`) står bevisst utenfor dette: `loadChurchAppearance.ts` løser kirken via `churches/lookup`, men leser kirkedekkende `/settings/public/{id}` og gjennomfører aldri `siteId`— portalen er kirkedekkende i v1 (se under).

## Flere nettsteder per kirke

### Datamodell

Den nye tabellen `membership.sites` er bevisst liten:

| Kolonne | Type | Merknader |
|--------|------|-----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Eiende kirke |
| `name` | `varchar(255)` | Visningsnavn (f.eks. «Español», «Youth») |
| `subDomain` | `varchar(45)` | **Unik indeks** — globalt navnerom (nedenfor) |

Nettstedsscoping er da én enkelt ikke-nullbar kolonne lagt til innholds- og domenetabellene:

| Tabell (modul) | Kolonne | `''` betyr |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domenet serverer hovednettstedet |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hovednettstedet — og på **`blocks`** betyr `''` i tillegg *delt på tvers av alle nettsteder* |

To migreringer legger til alt dette (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Fordi kolonnen har standarden `''`, beholder hver eksisterende rad dagens oppførsel uten backfill.

**Globalt underdomenavnerom.** `sites.subDomain` deler *ett* navnerom med `churches.subDomain` — et nettstedsunderdomene kan aldri kollidere med et kirkeunderdomene eller et annet nettsteds. Dette håndheves på **begge** lagringsveiene: `SiteController.save` avviser en slug som treffer enten `churches` eller `sites`, og `ChurchController.validateSave` gjør det samme i motsatt retning. En unik indeks på `sites.subDomain` støtter det på databasenivå.

**Sideunikhet** utvidet fra `(churchId, url)` til `(churchId, siteId, url)`, slik at to nettsteder for én kirke hver kan eie sin egen `/about`.

### Innhold per nettsted, med reserver

Hvert nettstedsscopet innholds-**liste/tre**-endepunkt tar en valgfri `?siteId=` (fraværende ⇒ `''` = hoved): sidetreet / listen / den offentlige, blokklisten / etter type / bunntekst, lenker (anonyme / filtrerte / alle), og globale stiler. Seksjoner og elementer er *ikke* scopet direkte — de arver gjennom sin overordnede side eller blokk.

To løsningskjeder gjør det interessante arbeidet:

- **Globale stiler — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnerer nettstedets egen rad; hvis et sekundært nettsted ikke har en, returnerer den **hovedets (`''`) rad som den er** (og beholder hovedets `id`/`siteId`, som klienten bruker til copy-on-write); hvis det heller ikke finnes et hoved, returnerer `GlobalStyleController` en hardkodet standardpalett/-fonter. 
- **Bunntekstblokk — nettstedsspesifikk vinner, delt faller tilbake.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnerer de delte (`''`) *og* de nettstedsspesifikke radene; resolveren velger nettstedets egen bunntekst hvis den finnes, ellers den delte. Den samme logikken kjører både i `TreeHelper.insertBlocks` (sidetreet) og i det frittstående `/content/blocks/public/footer/:churchId`-endepunktet.

### Kaskade ved sletting av nettsted

`SiteController.delete` (avgrenset av membership-tillatelsen Innstillinger→Rediger) river et sekundært nettsted i tre steg:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskade-sletter alt innhold nettstedet eier: dets **sider** → deres seksjoner, elementer, `pageHistory` og `posts`; dets egne **blokker** → deres seksjoner, elementer og `pageHistory`; dets **lenker** og **globalStyles**. En vakt nekter å kjøre for `''` — hoved-/delt-sentinelen kaskade-slettes aldri.
2. `DomainRepo.clearSiteId` **tilordner nettstedets domener tilbake** til hovedet (`siteId → ''`) i stedet for å slette dem, slik at et eget domene overlever en nettstedssletting.
3. `sites`-raden slettes og Caddy-rutene synkroniseres på nytt (best-effort).

### B1Admin-flaten

| Evne | Hvor | Mekanisme |
|-----------|-----------|-----------|
| Nettstedsbytter | `useSiteSelection` + `SiteSwitcher` (tom = «Hovednettside») | Leser en `?site=`-URL-parameter og gjennomfører den som `?siteId=` i ContentApi-kall. Finnes på de tre Nettsted-**listeområdene** — **Sider**, **Blokker**, **Utseende** — men *ikke* side-/blokkredigererne, som bærer `siteId` på posten |
| Opprett/slett nettsteder | `SitesDialog`, åpnet fra byttens «Administrer nettsteder…»-oppføring | `POST /membership/sites` / `DELETE /membership/sites/:id` (navn + subDomain). Avgrenset av membership-tillatelsen Innstillinger→Rediger (`Permissions.settings.edit` på serveren; `Permissions.membershipApi.settings.edit` i B1Admin). **Kun opprett/slett — det finnes ingen omdøpingsflate i v1** |
| Tildeling av nettsted per domene | `DomainSettingsEdit` under Innstillinger→Domener | En nedtrekksliste per rad for nettsted sender `siteId` per domene til `/membership/domains`. Kolonnen skjules hvis API-et ikke returnerer nettsteder (eldre backend) |
| Copy-on-write for stiler | `StylesManager.prepareForSave` | Når den lastede globale stil-raden har en `siteId` som ikke samsvarer med det valgte nettstedet (dvs. API-et returnerte det arvede hovedet som reserve), dropper den hovedets `id` og stempler gjeldende `siteId`, og tvinger en **innsetting** av en ny nettstedsspesifikk rad i stedet for å overskrive hovedet. Den samme forgreningen ved uoverensstemmelse gjelder nettstedets bunntekstblokk |

:::info
**Hva som forblir kirkedekkende i v1 (et bevisst scopingvalg, ikke en datamodellgrense):** **bloggen** (`BlogPage` har ingen bytter og laster `/posts` uten `siteId`), **nettstedswidgetene** (kunngjøringsbanneret + launcheren), **omdirigeringer**, **logo/GA4/kirkeinnstillinger**, og **medlemsportalen** (B1App mobile). Merk at dette *ikke* er «hele Utseende» — et sekundært nettsteds globale stiler (palett, fonter, typografi, mellomrom, navigasjon, egendefinert CSS) **er** per nettsted via copy-on-write-veien over; bare banner-/launcher-/omdirigerings-/logo-underpanelene på Utseende-siden forblir kirkedekkende.
:::

## Egne domener: Caddy-kanten (statisk konfigurasjonsplan)

:::info
**Retningen revidert 2026-07-02.** En tidligere plan om å flytte hosting av egne domener over til Vercel-administrerte domener ble **kansellert**, og all Vercel-domeneregistreringskode (`VercelHelper`, dens `vercelToken`/`vercelProjectId`/`vercelTeamId`-miljøvariabler, SSM-parametere og helsesjekkoppføringer) ble fjernet fra Api. Den selvadministrerte **Caddy-proxyen på EC2 består** som den permanente egne-domene-kanten. Det eneste gjenstående arbeidet er internt: å bytte Caddys *kjøretids*-admin-API-konfigurasjon med en *statisk* konfigurasjon som overlever omstarter.
:::

### Kanten

Hvert kirkedomene med egen DNS peker til én EC2-boks — `3.23.251.61`, også tilgjengelig som `proxy.b1.church`. B1Admins Innstillinger→Domener-skjerm instruerer kirker om å legge til en apex `A → 3.23.251.61` eller en `CNAME → proxy.b1.church`. Caddy avslutter TLS med et per-domene Let's Encrypt-sertifikat, skriver `Host`-headeren om til domenets `{sub}.b1.church`-oppstrøms, og reverse-proxyer til B1App — som deretter ruter det etter vertsetikett akkurat som et innebygd underdomene (se [Egne domener](#custom-domains) over).

Oppstrøms-kartleggingen kommer fra `DomainRepo.loadPairs`, hvis oppringing **COALESCER det tildelte nettstedets underdomene** slik at et domene proxies til riktig *sekundært* nettsted, med reserve til kirkens hoved:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*`-rader utelates fra kartet; Caddy serverer `www.{host}` via en `302`-omdirigering til apexen.

### To anonyme endepunkter mater kanten

`DomainController` eksponerer to uautentiserte, skrivebeskyttede endepunkter som boksen konsumerer direkte — anonyme av nødvendighet, siden kanten spør dem før noen kirkekontekst finnes:

| Endepunkt | Returnerer | Rolle |
|----------|----------|------|
| `GET /membership/domains/authorize?domain=` | `200` hvis domenet — eller, for en `www.`-bom, dets nakne apex — finnes i `domains`; `404` ellers (inkludert en tom `domain`) | Caddys **on-demand-TLS `ask`**: misbrukskontrollen som avgjør om et sertifikat skal utstedes for en innkommende SNI |
| `GET /membership/domains/hostmap` | `text/plain`, én sortert `{domain} {sub}.b1.church`-linje per rutbart domene | Vert→oppstrøms-kartfilen boksen oppdaterer på en timer |

`authorize` gjenbruker `DomainRepo.loadByName` (eksakt vert, deretter et enkelt `www.`→apex-forsøk); `hostmap` gjenbruker `loadPairs` — så det er nettstedsbevisst og `www.*`-ekskludert, identisk med proxy-rutene — og fjerner bare `:443`-suffikset.

### Lagring/sletting av domene — ett best-effort-dytt

`DomainController.save` skriver `domains`-radene og gjør deretter ett **best-effort** `CaddyHelper.updateCaddy()`-kall, innpakket i en `try/catch` som logger (`console.error`) og svelger; `delete` gjør det samme (som også rettet en tidligere bug med utdaterte ruter ved sletting), det samme gjør sletting av sekundære nettsteder (`SiteController.delete`). `updateCaddy` er i seg selv begrenset av et **10 s** Axios-tidsavbrudd, så en utilgjengelig eller stoppet Caddy kan aldri gi `500` på en domenelagring — `domains`-tabellen er sannhetskilden.

### Nåværende tilstand — statisk konfigurasjon, ingen kjøretidstilstand

Boksen (Windows EC2 bak den permanente Elastic IP) kjører Caddy fra en **statisk Caddyfile**: on-demand TLS der `ask` peker til `/membership/domains/authorize`, pluss en vert→oppstrøms-kartfil som oppdateres hvert 5. minutt fra `/membership/domains/hostmap` av en planlagt oppgave som ender i en gradvis `caddy reload`. Konfigurasjonen overlever omstarter uten kjøretidstilstand — ingen «prime på nytt»-dans — og en ukjent SNI blir **TLS-avvist** (ingen sertifikat utstedes for en vert `authorize` avviser), mens en autorisert men ennå ikke kartlagt vert (et helt nytt domene innenfor synkvinduet) får en ren 404. Nye domener blir rutbare innen ~5 minutter etter en lagring; sertifikatene utstedes ved første treff. Bygg/oppsett, drift og feltprøvede fallgruver: [Caddy-proxy for egne domener](../deployment/caddy-proxy).

### Legacy kjøretids-push — tilbakerullingsvei, venter på sletting

`CaddyHelper` (membership-modulen) kan fortsatt styre Caddy gjennom sitt **admin-API** på `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; ingen operasjon når ikke satt; vises under `ServerHealthController`s Integrasjoner-gruppe): `updateCaddy()` PATCHer en full ruteliste, og `initializeCaddy()` + endepunktene `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` bygger en kjøretidskonfigurert server fra bunnen av. Den modusens konfigurasjon lå bare i Caddys minne — den omstarts-amnesien denne arkitekturen erstattet. Maskineriet forblir utelukkende som tilbakerullingsvei og er planlagt slettet når den statiske boksen har vært stabil; den best-effort `updateCaddy()`-pushen ved lagring/sletting av domene er en uskadelig no-op mot den statiske boksen (dens admin-API er kun localhost).

## Relaterte sider

- [Caddy-proxy for egne domener](../deployment/caddy-proxy) — selve kantboksen: oppsett av ny boks, WinSW-tjeneste, kart-synkoppgave og driftsfallgruver
- [Arkitektur for nettsidebyggeren](./website-builder) — sidetreet, rendrerne, bloggen, SEO og AI-generering (hva som rendres når en forespørsel er løst til en kirke/et nettsted)
- [Innholdsendepunkter](../api/endpoints/content) — REST-flaten for sider, blokker, lenker og globale stiler, alle nå `?siteId=`-bevisste
- [B1App](../web-apps/b1-app) — Next.js-appen som er vert for middlewaren og `[sdSlug]`-rutingen
- [Web-app-utrulling](../deployment/web-apps) — hvordan B1App rulles ut til Vercel
