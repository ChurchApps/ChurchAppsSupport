---
title: "Nettstedsruting og flere nettsteder"
description: "Hvordan B1.church kobler underdomener og egne domener til riktig menighet eller sekundærside, og Caddy-kanten som håndterer TLS for egne domener."
---

# Nettstedsruting og flere nettsteder

<div class="article-intro">

En enkelt kirke kan nå drive mer enn ett distinkt nettsted, og hvert kan ligge på et `*.b1.church`-underdomene eller på et fullt tilpasset, kirkeeid domene. Denne siden kartlegger rutingslaget *under* byggeren: hvordan en innkommende forespørsel løses til både en kirke **og** et bestemt nettsted, datamodellen for flere nettsteder (`siteId`-sentinelen som gjør at alle eksisterende nettsteder fortsatt rendres uendret), og det egendefinerte domenets kant — en selvstyrt Caddy-proxy på EC2 som avslutter TLS og skriver om hvert kirkedomene til dets `*.b1.church`-oppstrøms. For hva som faktisk rendres når en forespørsel er løst — sidetreet, seksjonene og elementene — se [Nettstedbygger](./website-builder.md).

</div>

## Oversikt

```
   grace.b1.church              www.gracechurch.org  (egendefinert domene)
   (b1.church-underdomene)                │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy-kant — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • avslutter TLS (per-domene LE-sertifikat)│
          │             │  • skriver Host om → {sub}.b1.church      │
          │             │  • reverse-proxy til B1App                │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • alltid: slett enhver klientsendt x-site (anti-spoof)     │
   │  • interne *.b1.church-Host ⇒ domeneoppslag forblir inaktivt │
   │  • rå egendefinert Host (forbi Caddy) ⇒ oppslag → sett x-site│
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → første etikett av host → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   tråder ?siteId= inn i hvert innholdskall:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  lagring/sletting av domene (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (innpakket, ikke-fatal, 10 s timeout)
  Caddy leser selv domenetabellen via to anonyme endepunkter:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 kjent / 404 ukjent)
        GET /membership/domains/hostmap    — host→{sub}.b1.church-kart (oppfriskes hvert 5. min)
```

Tre regler gjelder i dette laget:

1. **En sentinel holder alt bakoverkompatibelt.** `siteId = ''` er hovednettstedet. Hver side, blokk, lenke, globale stil og domenerad som fantes før denne funksjonen, bærer `''` og rendres nøyaktig som før. Et *andre* nettsted er ganske enkelt et sett rader med en ikke-tom `siteId`, og ethvert innholdsendepunkt kalt uten `?siteId=` returnerer hovednettstedet — byte for byte den gamle forespørselen.
2. **Ruting er basert på vertsetikett og konvergerer.** Et `*.b1.church`-underdomene ruter direkte på sin vertsetikett; et egendefinert domene skrives om til sin `{sub}.b1.church`-etikett i Caddy-kanten før B1App ser det (med et middleware-databaseoppslag som setter en `x-site`-header som reserve for enhver rå egendefinert `Host`). Begge veier havner på samme `[sdSlug]`-rute og samme `churches/lookup`-kall, så den påfølgende rendringen er identisk.
3. **Caddy-kanten er tilstandsløs over én sannhetskilde.** Egendefinerte domener avsluttes på en selvstyrt Caddy-proxy på EC2 som skriver hvert domene om til sitt `{sub}.b1.church`-oppstrøms. En domenelagring utløser ett best-effort `CaddyHelper.updateCaddy()`, og Caddy leser også `domains`-tabellen direkte (`authorize`- og `hostmap`-endepunktene under). Tabellen er autoritativ — en utilgjengelig Caddy kan aldri feile en lagring.

## Nettstedsløsning

### `*.b1.church`-underdomener

`B1App/next.config.mjs` skriver om innkommende forespørsler etter vert. En vertsregel med mønsteret `(?<subdomain>.*?)\..*` fanger **første etikett** av verten og skriver om `/` og `/:path*` til `/{subdomain}` — App-Router-segmentet `[sdSlug]`. Så `grace.b1.church/about` blir `/grace/about`.

Inne i `src/app/[sdSlug]/` kaller `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}`. `ChurchController.getBySubDomain`-responsen har nå to grener:

| Slug matcher | Respons | Betydning |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hovednettstedet til den kirken |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Et **sekundært nettsted** — kontrolleren faller tilbake til `sites`, finner kirken som eier det, og ekko-returnerer den spurte slugen pluss det ekstra `siteId`-feltet |

Det ekstra `siteId` er det eneste som skiller en forespørsel til et sekundært nettsted fra en til hovednettstedet; alt annet i pipelinen er delt.

En slug som ikke matcher noen av tabellene, kommer tilbake som `{}` med `200`. `ConfigHelper.load` behandler en respons uten `id` som et ukjent nettsted og kaller Nexts `notFound()`, så et ukjent underdomene får en ekte 404 i stedet for at alle senere kall spør etter `/…/undefined`. Sidebyggerens rute bygger også treets sti med `pageTreePath()` (`src/helpers/pageTreePath.ts`), som URL-koder slugen, slik at en feilformet slug (omvendte skråstreker, mellomrom) gir 404 i stedet for at API-ets `400` blir til en 500.

### Egendefinerte domener {#custom-domains}

Et kirkeeid domene avsluttes i **Caddy-kanten** (beskrevet nedenfor), som skriver om `Host`-headeren til nettstedets `{sub}.b1.church` før den proxyer til B1App. På den normale veien mottar B1App altså en *intern* `*.b1.church`-vert og løser den etter vertsetikett akkurat som et innebygd underdomene — middlewarens databaseoppslag utløses aldri. `src/middleware.ts` kjører fortsatt på hver forespørsel, men med én alltid-på-jobb og én reserve:

1. **Alltid** — den **sletter enhver klientsendt `x-site`-header**. Den headeren er forfalskbar omskrivingsinndata og stoles bare på når middlewaren selv setter den; å fjerne den er middlewarens egentlige jobb bak Caddy.
2. **Reserve, bare ikke-intern `Host`** — for en rå egendefinert `Host` som når B1App *uten* Caddys omskriving, kaller den `GET /membership/domains/public/lookup/{host}` og, hvis det returnerer en `subDomain`, setter `x-site: {subDomain}.b1.church`. Bak Caddy er denne grenen inaktiv fordi `Host` allerede er `*.b1.church`.

Interne verter — `localhost`, `b1.church`, og suffiksene `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — hopper helt over oppslaget (de er allerede løst av vertsetikettomskrivingen, eller er forhånds-/deploy-verter).

Selve oppslaget (`DomainRepo.loadByName`) gjør en venstre-join `domains → churches` og `domains → sites` og returnerer `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — underdomenet til det tildelte sekundære nettstedet hvis domenet peker til et, ellers kirkens. Det matcher den eksakte verten først; hvis den verten begynte med `www.` og bommet, prøver det **én gang** til mot det nakne apexet.

Tilbake i `next.config.mjs` plasseres `x-site`-omskrivingsreglene **foran** de generiske vertsreglene, så de vinner. `x-site: grace.b1.church` → første etikett `grace` → `[sdSlug] = grace`, og derfra er løsningen identisk med underdomeneveien (samme `churches/lookup`, samme `siteId`).

:::info
`x-site`-headeren er upålitelig utenfra. Middlewaren fjerner ubetinget enhver innkommende `x-site` før den eventuelt setter sin egen, og omskrivingsreglene ser bare verdien middlewaren setter — en klient kan ikke tvinge seg inn i en annen kirkes innhold ved å sende en header.
:::

To operasjonelle detaljer i middlewaren:

- **Cache.** Hver verts resultat (en treff *eller* en bekreftet bom — aldri en nettverksfeil) caches i **10 minutter** i et in-memory-`Map`, per serverless-isolat.
- **Matcher.** Matcheren inkluderer med vilje `/sitemap.xml`, `/robots.txt` og `/manifest.webmanifest` på nytt. Dens første mønster ekskluderer prikkede stier, noe som ellers ville droppet disse filene; de legges til igjen slik at et egendefinert domenes SEO-/PWA-filer også får `x-site`-headeren.
- **Kanonisk header.** For kirkesider legger middlewaren til en responsheader `Link: <{proto}://{host}{path}>; rel="canonical"` som nevner verten siden faktisk ble servert fra — underdomene eller egendefinert domene (`helpers/canonicalLink.ts`). Når et egendefinert domene når B1App gjennom [Caddy-proxyen](../deployment/caddy-proxy.md), er forespørselens vert `{sub}.b1.church`-underdomenet, så middlewaren bruker besøkendes domene fra `X-Church-Host` i stedet — men bare etter at `/domains/public/lookup/{host}` bekrefter at det domenet peker til samme underdomene (`ownsSubdomain()`). Den kanoniske lenken, `robots.txt` og `sitemap.xml` nevner da det egendefinerte domenet i stedet for `b1.church`-underdomenet. Den hoppes over på ikke-kirkevert (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) og på `/mobile`, `/login`, `/logout`, og de genererte robots-/sitemap-/manifest-filene.

### Deaktivert offentlig nettside

En kirke kan slå på **Disable Public Website** i B1Admin (kirkeinnstillingen `hidePublicSite = "true"`). Nettstedet serverer da bare sine medlemsvendte ruter:

- **B1Apps middleware** slår opp underdomenet (`/membership/churches/lookup` deretter `/content/settings/public/:churchId`) og omdirigerer anonyme forespørsler til enhver sti utenfor tillatelseslisten til `/login?returnUrl={path}{query}`. Tillatelseslisten (`helpers/publicSite.ts`) er `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, og manifest-/robots-/sitemap-filene. Bare bekreftede svar caches (60 sekunder i produksjon, siden adminens revalidate-kall ikke kan tømme denne kartet per instans; ikke cachet i dev/test). En API-feil serverer nettstedet i stedet for å låse alle ute.
- **Innloggede medlemmer ser hele nettstedet.** En forespørsel med en ikke-utløpt `jwt`-cookie (middlewarens `hasSession()` dekoder payloadens `exp` uten å verifisere signaturen — dette er en myk port, ikke tilgangskontroll) hopper over omdirigeringen, så etter innlogging returnerer et medlem til siden de ba om og ser de vanlige sidene, innebygde sider (Grupper, Prekener osv.) og navigasjonen i headeren. Sidekomponentene og `Header` sjekker ikke lenger `hidePublicSite` selv.
- **`robots.txt`** forbyr alt, som på noindex-verter.
- **API.** `GET /content/pages/public/:churchId` (sitemapens sideliste) returnerer `[]`, så anonyme kallere kan ikke liste sidene.

### `siteId`-videresending

`ConfigHelper` lagrer den løste `siteId` på sitt forespørselsbegrensede `ConfigurationInterface` (memoisert med Reacts `cache()`) og legger til `?siteId=` på innholdskallene den og sidekomponentene gjør — **betinget**: en tom `siteId` (et hovedkirke-underdomene) utelater parameteren helt. Endepunktene som videresender den er sidetreet (`/content/pages/:id/tree`), den offentlige sidelisten som brukes av sitemapen (`/content/pages/public/:id`), globale stiler (`/content/globalStyles/church/:id`), navigasjonslenker (`/content/links/church/:id`), og den frittstående bunnblokken (`/content/blocks/public/footer/:id`). På den normale rendringsveien kommer bunnteksten inn i sidetreet (seksjoner merket `zone: "siteFooter"`), allerede hentet med `siteId`, så det finnes ikke noe ikke-avgrenset bunnhull.

Medlemsportalen (B1App `mobile`) står bevisst utenfor dette: `loadChurchAppearance.ts` løser kirken via `churches/lookup`, men leser kirkevide `/settings/public/{id}` og videresender aldri `siteId` — portalen er kirkevid i v1 (se nedenfor).

## Flere nettsteder per kirke

### Datamodell

Den nye tabellen `membership.sites` er bevisst liten:

| Kolonne | Type | Merknader |
|--------|------|-----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Eiende kirke |
| `name` | `varchar(255)` | Visningsnavn (f.eks. «Español», «Youth») |
| `subDomain` | `varchar(45)` | **Unik indeks** — globalt navnerom (under) |

Nettstedsavgrensning er da én enkelt ikke-nullbar kolonne lagt til innholds- og domenetabellene:

| Tabell (modul) | Kolonne | `''` betyr |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domenet serverer hovednettstedet |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hovednettstedet — og på **`blocks`** betyr `''` i tillegg *delt på tvers av alle nettsteder* |

To migreringer legger til alt dette (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Fordi kolonnen har standarden `''`, beholder hver eksisterende rad dagens oppførsel uten noen backfill.

**Globalt underdomenenavnerom.** `sites.subDomain` deler *ett* navnerom med `churches.subDomain` — et nettstedsunderdomene kan aldri kollidere med et kirkeunderdomene eller et annet nettsteds. Dette håndheves på **begge** lagringsveier: `SiteController.save` avviser en slug som treffer enten `churches` eller `sites`, og `ChurchController.validateSave` gjør det samme den andre veien. En unik indeks på `sites.subDomain` støtter det på databasenivå.

**Sideunikhet** utvidet fra `(churchId, url)` til `(churchId, siteId, url)`, slik at to nettsteder i én kirke hver kan eie sin egen `/about`.

### Innhold per nettsted, med reserver

Hvert nettstedsavgrenset innhold **liste/tre**-endepunkt tar en valgfri `?siteId=` (fraværende ⇒ `''` = hoved): sidetre/liste/offentlig, blokkliste/etter type/bunn, lenker (anonym / filtrert / alle), og globale stiler. Seksjoner og elementer er *ikke* avgrenset direkte — de arves gjennom sin foreldreside eller -blokk.

To løsningskjeder gjør det interessante arbeidet:

- **Globale stiler — `nettsted → hoved → standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnerer nettstedets egen rad; hvis et sekundært nettsted ikke har en, returnerer den **hovedradens (`''`) rad som den er** (og beholder hovedradens `id`/`siteId`, som klienten bruker til copy-on-write); hvis det heller ikke finnes en hoved, returnerer `GlobalStyleController` en hardkodet standardpalett/-skrifter.
- **Bunnblokken — nettstedsspesifikk vinner, delt faller tilbake.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnerer både den delte (`''`) *og* de nettstedsspesifikke radene; resolveren velger nettstedets egen bunn hvis den finnes, ellers den delte. Den samme logikken kjører både i `TreeHelper.insertBlocks` (sidetreet) og i det frittstående endepunktet `/content/blocks/public/footer/:churchId`.

### Kaskade ved sletting av nettsted

`SiteController.delete` (avgrenset til membership-tillatelsen Settings→Edit) river et sekundært nettsted i tre steg:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskaderer alt innhold nettstedet eier: dets **sider** → deres seksjoner, elementer, `pageHistory` og `posts`; dets egne **blokker** → deres seksjoner, elementer og `pageHistory`; dets **lenker** og **globalStyles**. En vakt nekter å kjøre for `''` — hoved-/delt-sentinelen kaskaderes aldri.
2. `DomainRepo.clearSiteId` **tilordner nytt** nettstedets domener tilbake til hovednettstedet (`siteId → ''`) i stedet for å slette dem, slik at et egendefinert domene overlever en sletting av nettstedet.
3. `sites`-raden slettes, og Caddy-rutene synkroniseres på nytt (best-effort).

### B1Admin-flate

| Evne | Hvor | Mekanisme |
|-----------|-----------|-----------|
| Nettstedsbytter | `useSiteSelection` + `SiteSwitcher` (tom = «Main Website») | Leser en `?site=`-URL-parameter og videresender den som `?siteId=` til ContentApi-kall. Finnes på de tre nettsteds-**listeområdene** — **Pages**, **Blocks**, **Appearance** — men *ikke* side-/blokkeditorene, som bærer `siteId` på posten |
| Opprett/slett nettsted | `SitesDialog`, åpnet fra byttemenyens «Manage websites…» | `POST /membership/sites` / `DELETE /membership/sites/:id` (navn + subDomain). Avgrenset til membership-tillatelsen Settings→Edit (`Permissions.settings.edit` på serveren; `Permissions.membershipApi.settings.edit` i B1Admin). **Bare opprett/slett — det finnes ingen omdøpings-UI i v1** |
| Tildeling av nettsted per domene | `DomainSettingsEdit` under Settings→Domains | En nettstedsnedtrekksliste per rad sender `siteId` per domene til `/membership/domains`. Kolonnen skjules hvis API-et ikke returnerer nettsteder (eldre backend) |
| Copy-on-write for stiler | `StylesManager.prepareForSave` | Når den innlastede globale stilraden har en `siteId` som ikke samsvarer med det valgte nettstedet (dvs. API-et returnerte den arvede hovedraden som reserve), dropper den hovedradens `id` og stempler gjeldende `siteId`, og tvinger en **innsetting** av en ny nettstedsspesifikk rad i stedet for å overskrive hovedraden. Den samme forgreningen ved mismatch gjelder for nettstedets bunnblokk |

:::info
**Det som forblir kirkevidt i v1 (et bevisst avgrensningsvalg, ikke en datamodellgrense):** **bloggen** (`BlogPage` har ingen bytter og laster `/posts` uten `siteId`), **nettstedswidgetene** (kunngjøringsbanneret + launcheren), **omdirigeringer**, **logoen / GA4 / kirkeinnstillingene**, og **medlemsportalen** (B1App mobile). Merk at dette *ikke* er «all Utseende» — et sekundært nettsteds globale stiler (palett, skrifter, typografi, avstand, navigasjon, egendefinert CSS) **er** per nettsted via copy-on-write-stien over; bare banner-/launcher-/omdirigerings-/logo-delpanelene på Utseende-siden forblir kirkevidt.
:::

## Egne domener: Caddy-kanten (statisk konfigurasjonsplan)

:::info
**Retningen revidert 2026-07-02.** En tidligere plan om å flytte egendefinert domenehosting til Vercel-administrerte domener ble **kansellert**, og all Vercel-kode for domeneregistrering (`VercelHelper`, dens `vercelToken`/`vercelProjectId`/`vercelTeamId`-miljøvariabler, SSM-parametere og helsesjekker) ble fjernet fra Api-et. Den selvstyrte **Caddy-proxyen på EC2 består** som den permanente egendefinerte domenekanten. Det eneste gjenværende arbeidet er internt: å bytte Caddys *kjøretids*-admin-API-konfigurasjon med en *statisk* konfigurasjon som overlever omstarter.
:::

### Kanten

Hvert egendefinerte kirkedomene peker DNS mot én EC2-maskin — `3.23.251.61`, også tilgjengelig som `proxy.b1.church`. B1Admins skjerm for Settings→Domains instruerer kirker å legge til et apex `A → 3.23.251.61` eller et `CNAME → proxy.b1.church`. Caddy avslutter TLS med et per-domene Let's Encrypt-sertifikat, skriver om `Host`-headeren til domenets `{sub}.b1.church`-oppstrøms, og reverse-proxyer til B1App — som deretter ruter det etter vertsetikett akkurat som et hvilket som helst innebygd underdomene (se [Egendefinerte domener](#custom-domains) ovenfor).

Oppstrømskartleggingen kommer fra `DomainRepo.loadPairs`, hvis dial **COALESCER det tildelte nettstedets underdomene** slik at et domene proxyes til riktig *sekundært* nettsted, og faller tilbake til kirkens hoved:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Rader `www.*` er utelatt fra kartet; Caddy serverer `www.{host}` via en `302`-omdirigering til apexet.

### To anonyme endepunkter mater kanten

`DomainController` eksponerer to uautentiserte, skrivebeskyttede endepunkter som boksen bruker direkte — anonyme av nødvendighet, siden kanten spør dem før noen kirkekontekst finnes:

| Endepunkt | Returnerer | Rolle |
|----------|----------|-------|
| `GET /membership/domains/authorize?domain=` | `200` hvis domenet — eller, for en `www.`-bom, dets nakne apex — finnes i `domains`; `404` ellers (inkludert en tom `domain`) | Caddys **on-demand-TLS `ask`**: misbruksbegrensningen som avgjør om et sertifikat skal utstedes for en innkommende SNI |
| `GET /membership/domains/hostmap` | `text/plain`, én sortert `{domain} {sub}.b1.church`-linje per rutbart domene | Vert→oppstrøms-kartfilen boksen oppfrisker på en timer |

`authorize` gjenbruker `DomainRepo.loadByName` (eksakt vert, deretter en enkelt `www.`→apex-gjentakelse); `hostmap` gjenbruker `loadPairs` — så den er nettstedsbevisst og `www.*`-ekskludert, identisk med proxy-rutene — og fjerner bare `:443`-suffikset.

### Lagring/sletting av domene — ett best-effort-dytt

`DomainController.save` skriver `domains`-radene og gjør deretter ett **best-effort** `CaddyHelper.updateCaddy()`-kall, innpakket i en `try/catch` som logger (`console.error`) og svelger; `delete` gjør det samme (noe som også rettet en tidligere bug med utdatert rute ved sletting), det samme gjør sletting av sekundært nettsted (`SiteController.delete`). `updateCaddy` er selv begrenset av en **10 s** Axios-timeout, så en utilgjengelig eller stoppet Caddy kan aldri gi `500` på en domenelagring — `domains`-tabellen er sannhetskilden.

### Nåværende tilstand — statisk konfigurasjon, ingen kjøretidstilstand

Boksen (en Windows-EC2 bak den permanente Elastic IP-en) kjører Caddy fra en **statisk Caddyfile**: on-demand-TLS der `ask` peker til `/membership/domains/authorize`, pluss en vert→oppstrøms-kartfil oppfrisket hvert 5. minutt fra `/membership/domains/hostmap` av en planlagt oppgave som ender i en elegant `caddy reload`. Konfigurasjonen overlever omstarter uten kjøretidstilstand — ingen «re-priming»-dans — og en ukjent SNI er **TLS-avvist** (ingen sertifikat utstedes for en vert `authorize` avviser), mens en autorisert men ennå ikke kartlagt vert (et helt nytt domene innenfor synkroniseringsvinduet) får en ren 404. Nye domener blir rutbare innen ~5 minutter etter en lagring; sertifikatene deres utstedes ved første treff. Bygg/oppsett, drift og feltprøvde fallgruver: [Caddy-proxy for egendefinerte domener](../deployment/caddy-proxy.md).

### Legacy kjøretids-push — tilbakerulling, venter på sletting

`CaddyHelper` (membership-modulen) kan fortsatt styre Caddy gjennom sitt **admin-API** på `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op når ikke satt; vises under gruppen Integrations i `ServerHealthController`): `updateCaddy()` PATCHer en fullstendig rutematrise, og `initializeCaddy()` + endepunktene `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` bygger en kjøretidskonfigurert server fra bunnen av. Den modusens konfigurasjon lå bare i Caddys minne — den omstart-amnesien denne arkitekturen erstattet. Maskineriet består bare som tilbakerullingsveien og er planlagt slettet når den statiske boksen har vært stabil; det best-effort `updateCaddy()`-dyttet ved lagring/sletting av domene er en harmløs no-op mot den statiske boksen (admin-API-et er bare localhost).

## Relaterte sider

- [Caddy-proxy for egendefinerte domener](../deployment/caddy-proxy.md) — selve kantboksen: oppsett av ny maskin, WinSW-tjeneste, kartsynkroniseringsoppgave og driftsfallgruver
- [Nettstedbygger](./website-builder.md) — sidetreet, rendererne, bloggen, SEO og AI-generering (det som rendres når en forespørsel er løst til en kirke/et nettsted)
- [Content-endepunkter](../api/endpoints/content.md) — REST-flaten for sider, blokker, lenker og globale stiler, alle nå `?siteId=`-bevisste
- [B1App](../web-apps/b1-app.md) — Next.js-appen som er vert for middlewaren og `[sdSlug]`-rutingen
- [Distribusjon av webapper](../deployment/web-apps.md) — hvordan B1App distribueres til Vercel
