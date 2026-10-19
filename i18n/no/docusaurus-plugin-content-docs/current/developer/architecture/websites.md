---
title: "Rutingen for nettsteder og flere nettsteder"
---

# Rutingen for nettsteder og flere nettsteder

<div class="article-intro">

En enkelt menighet kan nå betjene mer enn ett distinkt nettsted, og hvert av dem kan ligge på et `*.b1.church`-underdomene eller på et helt tilpasset domene som menigheten eier. Denne siden beskriver ruting-laget som ligger *under* byggeverktøyet: hvordan en innkommende forespørsel løses til en menighet **og** til et bestemt nettsted, datamodellen for flere nettsteder (`siteId`-markøren som sørger for at alle eksisterende nettsteder fortsatt vises uendret), og kanten for egne domener, en selvadministrert Caddy-proxy på EC2 som avslutter TLS og skriver om hvert menighetsdomene til den tilhørende `*.b1.church`-oppstrømstjenesten. For det som faktisk vises når en forespørsel er løst, altså side-, seksjons- og elementtreet, se [Nettstedsbygger](./website-builder).

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

Tre regler gjelder for hele dette laget:

1. **En markør sørger for bakoverkompatibilitet.** `siteId = ''` er hovednettstedet. Hver side, blokk, lenke, globalStyle og domenerad som fantes før denne funksjonen bærer `''` og vises nøyaktig som før. Et *andre* nettsted er ganske enkelt et sett med rader med en ikke-tom `siteId`, og ethvert innholdsendepunkt som kalles uten `?siteId=` returnerer hovednettstedet, byte for byte den gamle forespørselen.
2. **Løsningen er basert på vertsetikett og konvergerer.** Et `*.b1.church`-underdomene rutes direkte etter vertsetiketten; et eget domene skrives om til sin `{sub}.b1.church`-etikett ved Caddy-kanten før B1App ser det (med et middleware-databaseoppslag som setter en `x-site`-header som reserveløsning for enhver rå egendefinert `Host`). Begge veier ender på samme `[sdSlug]`-rute og samme `churches/lookup`-kall, så påfølgende visning er identisk.
3. **Caddy-kanten er tilstandsløs over én sannhetskilde.** Egne domener avsluttes på en selvadministrert Caddy-proxy på EC2 som skriver hvert domene om til sin `{sub}.b1.church`-oppstrøm. Når et domene lagres, kjøres ett enkelt best-effort-kall til `CaddyHelper.updateCaddy()`, og Caddy leser også `domains`-tabellen direkte (endepunktene `authorize` og `hostmap` nedenfor). Tabellen er autoritativ. En utilgjengelig Caddy kan aldri få en lagring til å feile.

## Nettstedsløsning

### `*.b1.church`-underdomener

`B1App/next.config.mjs` skriver om innkommende forespørsler etter vert. En vertsregel med mønsteret `(?<subdomain>.*?)\..*` fanger opp **første etikett** i verten og skriver om `/` og `/:path*` til `/{subdomain}`, altså `[sdSlug]`-segmentet i App Router. Dermed blir `grace.b1.church/about` til `/grace/about`.

Inne i `src/app/[sdSlug]/` kaller `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}`. Svaret fra `ChurchController.getBySubDomain` har nå to grener:

| Slug matcher | Svar | Betydning |
|--------------|------|-----------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hovednettstedet for den menigheten |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Et **sekundært nettsted**. Kontrolleren faller tilbake til `sites`, finner menigheten som eier det, og gjentar den spurte slugen sammen med den ekstra `siteId`-en |

Den ekstra `siteId`-en er det eneste som skiller en forespørsel til et sekundært nettsted fra en til hovednettstedet. Alt annet i pipelinen er felles.

En slug som ikke matcher noen av tabellene, returneres som `{}` med `200`. `ConfigHelper.load` behandler et svar uten `id` som et ukjent nettsted og kaller Nexts `notFound()`, slik at et ukjent underdomene får en ekte 404 i stedet for at alle senere kall spør etter `/…/undefined`. Ruten for byggesider bygger også treestien sin med `pageTreePath()` (`src/helpers/pageTreePath.ts`), som URL-koder slugen. En feilformatert slug (skråstreker, mellomrom) gir derfor 404 i stedet for at APIets `400` vises som en 500.

### Egne domener {#custom-domains}

Et menighetseid domene avsluttes ved **Caddy-kanten** (beskrevet nedenfor), som skriver om `Host`-headeren til nettstedets `{sub}.b1.church` før den videresendes til B1App. På den vanlige veien mottar B1App altså en *intern* `*.b1.church`-vert og løser den etter vertsetikett akkurat som et innebygd underdomene. Databaseoppslaget i middleware utføres derfor aldri. `src/middleware.ts` kjører fortsatt for hver forespørsel, men med én alltid aktiv jobb og én reserveløsning:

1. **Alltid**: den **sletter enhver klientsendt `x-site`-header**. Denne headeren er forfalskbar omskrivingsinput og stoles bare på når middleware selv setter den. Å fjerne den er middlewarens egentlige jobb bak Caddy.
2. **Reserveløsning, kun ikke-intern `Host`**: for en rå egendefinert `Host` som når B1App *uten* Caddys omskriving, kaller den `GET /membership/domains/public/lookup/{host}` og, hvis svaret inneholder en `subDomain`, setter den `x-site: {subDomain}.b1.church`. Bak Caddy er denne grenen inaktiv, fordi `Host` allerede er `*.b1.church`.

Interne verter (`localhost`, `b1.church` og suffiksene `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app`) hopper helt over oppslaget. De er allerede løst av vertsetikett-omskrivingen, eller er forhånds- eller deploy-verter.

Selve oppslaget (`DomainRepo.loadByName`) gjør en venstre-sammenkobling av `domains → churches` og `domains → sites` og returnerer `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`, altså underdomenet til det tildelte sekundære nettstedet hvis domenet peker dit, ellers til menigheten. Det prøver først nøyaktig vert. Hvis verten startet med `www.` og ikke ga treff, prøves det **én gang** til mot det nakne apexdomenet.

Tilbake i `next.config.mjs` er `x-site`-omskrivingsreglene plassert **foran** de generelle vertsreglene, slik at de vinner. `x-site: grace.b1.church` gir første etikett `grace`, altså `[sdSlug] = grace`, og derfra er løsningen identisk med underdomeveien (samme `churches/lookup`, samme `siteId`).

:::info
`x-site`-headeren er ikke til å stole på utenfra. Middleware fjerner ubetinget enhver innkommende `x-site` før den eventuelt setter sin egen, og omskrivingsreglene ser bare verdien middleware satte. En klient kan ikke tvinge seg inn i en annen menighets innhold ved å sende en header.
:::

To driftsdetaljer for middleware:

- **Cache.** Resultatet for hver vert (en treff *eller* en bekreftet ikke-treff, aldri en nettverksfeil) caches i **10 minutter** i et in-memory-`Map`, per serverless-isolat.
- **Matcher.** Matcheren inkluderer bevisst `/sitemap.xml`, `/robots.txt` og `/manifest.webmanifest` på nytt. Det første mønsteret ekskluderer punktede stier, noe som ellers ville fjernet disse filene. De legges tilbake, slik at et egendefinert domenes SEO- og PWA-filer for menigheten også får `x-site`-headeren.
- **Kanonisk header.** For menighetssider legger middleware til en `Link: <{proto}://{host}{path}>; rel="canonical"`-responsheader som angir verten siden faktisk ble servert fra, enten underdomene eller eget domene (`helpers/canonicalLink.ts`). Den hoppes over på ikke-menighetsverter (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) og på `/mobile`, `/login`, `/logout` og de genererte robots-, sitemap- og manifest-filene.

### Deaktivert offentlig nettside

En menighet kan slå på **Deaktiver offentlig nettside** i B1Admin (innstillingen på menighetsnivå `hidePublicSite = "true"`). Nettstedet viser da bare rutene for medlemmer:

- **B1App-middleware** slår opp underdomenet (`/membership/churches/lookup` og deretter `/content/settings/public/:churchId`) og sender anonyme forespørsler til stier utenfor tillatelseslisten videre til `/login?returnUrl={path}{query}`. Tillatelseslisten (`helpers/publicSite.ts`) er `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` og manifest-, robots- og sitemap-filene. Bare bekreftede svar caches (60 sekunder i produksjon, siden administratorens revalideringskall ikke kan tømme dette kartet per instans; ikke cachet i dev og test). En API-feil viser nettstedet i stedet for å låse alle ute.
- **Innloggede medlemmer ser hele nettstedet.** En forespørsel med en ikke-utløpt `jwt`-cookie (middlewarens `hasSession()` dekoder `exp` i payloaden uten å verifisere signaturen. Dette er en myk port, ikke tilgangskontroll) hopper over omdirigeringen. Etter innlogging går medlemmet dermed tilbake til siden de ba om, og ser de vanlige sidene, innebygde sider (Grupper, Preken osv.) og topptekstnavigasjonen. Sidekomponentene og `Header` sjekker ikke lenger `hidePublicSite` selv.
- **`robots.txt`** forbyr alt, slik det gjøres på noindex-verter.
- **API.** `GET /content/pages/public/:churchId` (sitemapens sideliste) returnerer `[]`, slik at anonyme kallere ikke kan liste sidene.

### Videresending av `siteId`

`ConfigHelper` lagrer det løste `siteId` i sin `ConfigurationInterface` per forespørsel (memoisert med Reacts `cache()`) og legger til `?siteId=` på innholdskallene den og sidekomponentene gjør. Dette skjer **betinget**: en tom `siteId` (et underdomene for hovedmenigheten) utelater parameteren helt. Endepunktene som videresender den, er sidetreet (`/content/pages/:id/tree`), den offentlige sideListen som brukes av sitemapen (`/content/pages/public/:id`), globale stiler (`/content/globalStyles/church/:id`), navigasjonslenker (`/content/links/church/:id`) og den frittstående bunnteksblokken (`/content/blocks/public/footer/:id`). På den vanlige visningsveien kommer bunnteksten med i sidetreet (seksjoner merket `zone: "siteFooter"`), allerede hentet med `siteId`, så det finnes ingen bunntekst uten omfang.

Medlemsportalen (B1App `mobile`) står bevisst utenfor dette. `loadChurchAppearance.ts` løser menigheten via `churches/lookup`, men leser innstillingene på menighetsnivå fra `/settings/public/{id}` og videresender aldri `siteId`. Portalen er menighetsomfattende i v1 (se nedenfor).

## Flere nettsteder per menighet

### Datamodell

Den nye tabellen `membership.sites` er bevisst liten:

| Kolonne | Type | Merknad |
|---------|------|---------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Eierende menighet |
| `name` | `varchar(255)` | Visningsnavn (f.eks. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unik indeks**, globalt navnerom (se nedenfor) |

Nettstedsomfanget er deretter én enkel kolonne som legges til innholds- og domenetabellene. Den er ikke nullbar:

| Tabell (modul) | Kolonne | `''` betyr |
|----------------|---------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domenet betjener hovednettstedet |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hovednettstedet, og på **`blocks`** betyr `''` i tillegg *delt mellom alle nettsteder* |

To migreringer legger til alt dette (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Fordi kolonnen har standardverdien `''`, beholder alle eksisterende rader dagens oppførsel uten backfill.

**Globalt navnerom for underdomener.** `sites.subDomain` deler *ett* navnerom med `churches.subDomain`. Et nettstedsunderdomene kan dermed aldri kollidere med et menighetsunderdomene eller et annet nettsteds. Dette håndheves på **begge** lagringsveier: `SiteController.save` avviser en slug som treffer enten `churches` eller `sites`, og `ChurchController.validateSave` gjør det samme motsatt vei. En unik indeks på `sites.subDomain` sikrer det på databasenivå.

**Unikhet for sider** utvides fra `(churchId, url)` til `(churchId, siteId, url)`, slik at to nettsteder i samme menighet kan ha hver sin `/about`.

### Innhold per nettsted, med reserveløsninger

Hvert innholdsendepunkt for nettstedsomfattede **lister/trær** tar en valgfri `?siteId=` (uten den brukes `''` = hovednettstedet): sidetre, sidelister og offentlige sider, blokklister, blokker etter type og bunntekst, lenker (anonyme, filtrerte og alle) og globale stiler. Seksjoner og elementer er *ikke* direkte nettstedsomfattet. De arver fra sin overordnede side eller blokk.

To løsningskjeder gjør det interessante arbeidet:

- **Globale stiler: `nettsted → hoved → standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnerer nettstedets egen rad. Hvis et sekundært nettsted ikke har en, returneres **hovedradens (`''`) som den er** (med hovedradens `id`/`siteId`, som klienten bruker for kopi-ved-skriving). Hvis det heller ikke finnes en hovedrad, returnerer `GlobalStyleController` en hardkodet standardpalett og standardskrifter.
- **Bunnteksblokk: nettstedsspesifikk vinner, delt faller tilbake.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnerer de delte (`''`) *og* de nettstedsspesifikke radene. Løseren velger nettstedets egen bunntekst hvis den finnes, ellers den delte. Samme logikk kjører både i `TreeHelper.insertBlocks` (sidetreet) og i det frittstående endepunktet `/content/blocks/public/footer/:churchId`.

### Kaskade ved sletting av nettsted

`SiteController.delete` (krever tillatelsen Innstillinger → Rediger for medlemskap) fjerner et sekundært nettsted i tre trinn:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskadesletter alt innhold nettstedet eier: dets **sider** med tilhørende seksjoner, elementer, `pageHistory` og `posts`; dets egne **blokker** med tilhørende seksjoner, elementer og `pageHistory`; dets **lenker** og **globalStyles**. En vakt nekter å kjøre for `''`. Hovedmarkøren/den delte markøren kaskaderes aldri.
2. `DomainRepo.clearSiteId` **tilordner** nettstedets domener tilbake til hovednettstedet (`siteId → ''`) i stedet for å slette dem, slik at et eget domene overlever at nettstedet slettes.
3. Raden i `sites` slettes, og Caddy-rutene synkroniseres på nytt (best-effort).

### B1Admin-flater

| Funksjon | Hvor | Mekanisme |
|----------|------|-----------|
| Nettstedsbytter | `useSiteSelection` + `SiteSwitcher` (tom = "Hovedside") | Leser en URL-parameter `?site=` og videresender den som `?siteId=` til ContentApi-kall. Finnes på de tre nettstedslistene **Sider**, **Blokker** og **Utseende**, men *ikke* i side- og blokkeditorene, som har `siteId` på selve posten |
| Opprett/slett nettsted | `SitesDialog`, åpnes fra bytterens "Administrer nettsteder…" | `POST /membership/sites` / `DELETE /membership/sites/:id` (navn og subDomain). Krever tillatelsen Innstillinger → Rediger for medlemskap (`Permissions.settings.edit` på serversiden; `Permissions.membershipApi.settings.edit` i B1Admin). **Bare opprett og slett. Det finnes ingen omdøpningsfunksjon i v1** |
| Tildeling av domene til nettsted | `DomainSettingsEdit` under Innstillinger → Domener | En nedtrekksliste per domenerad sender `siteId` per domene til `/membership/domains`. Kolonnen skjules hvis API-et ikke returnerer noen nettsteder (eldre backend) |
| Kopi-ved-skriving for stiler | `StylesManager.prepareForSave` | Når den innlastede globale stilraden har en `siteId` som ikke samsvarer med det valgte nettstedet (altså at API-et returnerte den arvede hovedraden som reserveløsning), fjerner den hovedradens `id` og setter gjeldende `siteId`. Dette tvinger en **innsetting** av en ny nettstedsspesifikk rad i stedet for å overskrive hovedraden. Samme forgreningsregel gjelder for nettstedets bunntekstblokk |

:::info
**Dette forblir menighetsomfattet i v1 (et bevisst valg, ikke en begrensning i datamodellen):** **bloggen** (`BlogPage` har ingen bytter og laster `/posts` uten `siteId`), **nettstedswidgetene** (kunngjøringsbanner og launcher), **omdirigeringer**, **logo, GA4 og menighetsinnstillinger**, og **medlemsportalen** (B1App mobile). Dette er *ikke* "all Utseende". Et sekundært nettsteds globale stiler (palett, skrifter, typografi, avstand, navigasjon og egen CSS) **er** per nettsted via kopi-ved-skriving-stien ovenfor. Det er bare undervinduene for banner, launcher, omdirigeringer og logo på Utseende-siden som forblir menighetsomfattet.
:::

## Egne domener: Caddy-kanten (plan med statisk konfigurasjon)

:::info
**Retningen ble revidert 2026-07-02.** En tidligere plan om å flytte hosting av egne domener over til Vercel-administrerte domener ble **avlyst**, og all kode for registrering av Vercel-domener (`VercelHelper`, miljøvariablene `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM-parametere og helsesjekker) ble fjernet fra API-et. Den selvadministrerte **Caddy-proxyen på EC2 består** som permanent kant for egne domener. Det eneste gjenværende arbeidet er internt: å bytte Caddys *kjørende* admin-API-konfigurasjon mot en *statisk* konfigurasjon som overlever omstarter.
:::

### Kanten

Hvert eget menighetsdomene peker DNS til én EC2-maskin, `3.23.251.61`, som også er tilgjengelig som `proxy.b1.church`. Skjermbildet Innstillinger → Domener i B1Admin ber menigheter legge til en apex `A → 3.23.251.61` eller en `CNAME → proxy.b1.church`. Caddy avslutter TLS med et sertifikat fra Let's Encrypt per domene, skriver om `Host`-headeren til domenets `{sub}.b1.church`-oppstrøm og videresender til B1App. B1App ruter den deretter etter vertsetikett, akkurat som et innebygd underdomene (se [Egne domener](#custom-domains) ovenfor).

Oppstrømskartleggingen kommer fra `DomainRepo.loadPairs`. Der COALESCE-es oppslaget av det tildelte nettstedets underdomene, slik at et domene videresendes til riktig *sekundære* nettsted og faller tilbake til menighetens hovednettsted:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Rader med `www.*` utelates fra kartet. Caddy betjener i stedet `www.{host}` med en `302`-omdirigering til apexdomenet.

### To anonyme endepunkter mater kanten

`DomainController` eksponerer to uautentiserte skrivebeskyttede endepunkter som maskinen bruker direkte. De er anonyme av nødvendighet, fordi kanten spør dem før det finnes noen menighetskontekst:

| Endepunkt | Returnerer | Rolle |
|-----------|-----------|-------|
| `GET /membership/domains/authorize?domain=` | `200` hvis domenet (eller, ved et `www.`-treff som mangler, apexdomenet) finnes i `domains`; ellers `404` (også for et tomt `domain`) | Caddys **on-demand-TLS `ask`**: misbrukskontrollen som avgjør om det skal utstedes et sertifikat for en innkommende SNI |
| `GET /membership/domains/hostmap` | `text/plain`, én sortert linje `{domain} {sub}.b1.church` per rutebart domene | Vert→oppstrøm-kartfilen som maskinen oppdaterer med en timer |

`authorize` gjenbruker `DomainRepo.loadByName` (nøyaktig vert, deretter ett nytt forsøk med `www.`→apex). `hostmap` gjenbruker `loadPairs`. Den er dermed nettstedsbevisst og ekskluderer `www.*`, identisk med proxy-rutene, og fjerner bare `:443`-suffikset.

### Lagring og sletting av domene: ett best-effort-kall

`DomainController.save` skriver radene i `domains` og kaller deretter ett enkelt best-effort-`CaddyHelper.updateCaddy()`, pakket i en `try/catch` som logger (`console.error`) og svelger feilen. `delete` gjør det samme (noe som også rettet en tidligere feil med utdatert rute ved sletting), og det samme gjelder sletting av sekundære nettsteder (`SiteController.delete`). `updateCaddy` begrenses i seg selv av en Axios-tidsavbrudd på **10 s**, så en utilgjengelig eller stoppet Caddy kan aldri gi `500` ved lagring av domene. Tabellen `domains` er sannhetskilden.

### Nåværende tilstand: statisk konfigurasjon, ingen kjøretidstilstand

Maskinen (en Windows-EC2 bak den permanente Elastic IP-adressen) kjører Caddy fra en **statisk Caddyfile**: on-demand-TLS der `ask` peker på `/membership/domains/authorize`, pluss en vert→oppstrøm-kartfil som oppdateres hvert 5. minutt fra `/membership/domains/hostmap` av en planlagt oppgave som avsluttes med en skånsom `caddy reload`. Konfigurasjonen overlever omstarter uten kjøretidstilstand. Det trengs ingen ny priming, og en ukjent SNI avvises på TLS-nivå (det utstedes ikke noe sertifikat for en vert som `authorize` avviser), mens en autorisert men ennå ikke kartlagt vert (et helt nytt domene innenfor synkroniseringsvinduet) får en ren 404. Nye domener kan rutes innen ca. 5 minutter etter lagring. Sertifikatene utstedes ved første treff. Bygging, oppsett, drift og verifiserte fallgruver: [Caddy-proxy for egne domener](../deployment/caddy-proxy).

### Eldre kjøretidspush: tilbakerullingsvei, venter på sletting

`CaddyHelper` (membership-modulen) kan fortsatt styre Caddy via **admin-API-et** på `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`. Ingen handling når de ikke er satt, og den vises under gruppen Integrasjoner i `ServerHealthController`). `updateCaddy()` sender en PATCH med en hel rutearray, og `initializeCaddy()` samt endepunktene `GET /membership/domains/caddy/init` og `GET /membership/domains/caddy` bygger en kjøretidskonfigurert server fra grunnen av. I denne modusen lå konfigurasjonen bare i Caddys minne, den omstart-glemsomheten denne arkitekturen erstattet. Mekanismen består bare som tilbakerullingsvei og er planlagt slettet når den statiske maskinen har vært stabil en stund. Det best-effort-`updateCaddy()`-kallet ved lagring/sletting av domene er en uskadelig ingenting-operasjon mot den statiske maskinen, fordi admin-API-et bare er tilgjengelig lokalt.

## Relaterte sider

- [Caddy-proxy for egne domener](../deployment/caddy-proxy): selve kantmaskinen: oppsett av ny maskin, WinSW-tjeneste, synkroniseringsoppgave for kartet og driftsfallgruver
- [Nettstedsbygger](./website-builder): side-, seksjons- og elementtreet, renderere, blogg, SEO og AI-generering (det som vises når en forespørsel er løst til en menighet/et nettsted)
- [Innholdsendepunkter](../api/endpoints/content): REST-flaten for sider, blokker, lenker og globale stiler, nå alle `?siteId=`-bevisste
- [B1App](../web-apps/b1-app): Next.js-appen som har middleware og `[sdSlug]`-ruting
- [Distribusjon av webapper](../deployment/web-apps): hvordan B1App distribueres til Vercel
