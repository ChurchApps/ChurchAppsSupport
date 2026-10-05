---
title: "Nettstedsruting og flere nettsteder"
---

# Nettstedsruting og flere nettsteder

<div class="article-intro">

En enkelt kirke kan nå drive mer enn ett eget nettsted, og hvert av dem kan ligge på et `*.b1.church`-underdomene eller på et helt egendefinert domene eid av kirken. Denne siden kartlegger rutingslaget som ligger *under* byggeren: hvordan en innkommende forespørsel løses til en kirke **og** til et bestemt nettsted, datamodellen for flere nettsteder (`siteId`-sentinelen som sørger for at alle eksisterende nettsteder vises uendret), og kanten for egendefinerte domener – en selvdrevet Caddy-proxy på EC2 som terminerer TLS og omskriver hvert kirkedomene til dets `*.b1.church`-oppstrøm. For hva som faktisk vises når en forespørsel er løst – side-/seksjons-/elementtreet – se [Nettstedsbygger](./website-builder).

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

Tre regler gjelder på tvers av dette laget:

1. **En sentinel holder alt bakoverkompatibelt.** `siteId = ''` er hovednettstedet. Hver side, blokk, lenke, global stil og domenerad som fantes før denne funksjonen, har `''` og vises nøyaktig som før. Et *andre* nettsted er rett og slett et sett rader med en `siteId` som ikke er tom, og ethvert innholdsendepunkt som kalles uten `?siteId=`, returnerer hovednettstedet – byte for byte den gamle forespørselen.
2. **Løsningen er basert på vertsnavnets etikett og konvergerer.** Et `*.b1.church`-underdomene rutes direkte etter vertsetiketten; et egendefinert domene omskrives til sin `{sub}.b1.church`-etikett i Caddy-kanten før B1App ser det (med et DB-oppslag i middleware som setter en `x-site`-header som reserveløsning for enhver rå egendefinert `Host`). Begge veier ender på samme `[sdSlug]`-rute og samme `churches/lookup`-kall, så den videre visningen er identisk.
3. **Caddy-kanten er tilstandsløs over én sannhetskilde.** Egendefinerte domener termineres ved en selvdrevet Caddy-proxy på EC2 som omskriver hvert domene til sin `{sub}.b1.church`-oppstrøm. Lagring av et domene utløser ett enkelt `CaddyHelper.updateCaddy()`-kall etter beste evne, og Caddy leser også `domains`-tabellen direkte (endepunktene `authorize` og `hostmap` nedenfor). Tabellen er autoritativ – en Caddy som ikke svarer, kan aldri få en lagring til å feile.

## Nettstedsoppslag

### `*.b1.church`-underdomener

`B1App/next.config.mjs` omskriver innkommende forespørsler etter vert. En vertsregel med mønsteret `(?<subdomain>.*?)\..*` fanger **første etikett** i verten og omskriver `/` og `/:path*` til `/{subdomain}` – App Router-segmentet `[sdSlug]`. Så `grace.b1.church/about` blir `/grace/about`.

Inne i `src/app/[sdSlug]/` kaller `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}`. Svaret fra `ChurchController.getBySubDomain` har nå to grener:

| Slug samsvarer med | Svar | Betydning |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hovednettstedet til den kirken |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Et **sekundært nettsted** – kontrolleren faller tilbake til `sites`, finner eierkirken og gjentar den etterspurte sluggen pluss den ekstra `siteId` |

Den ekstra `siteId` er det eneste som skiller en forespørsel til et sekundært nettsted fra en til hovednettstedet; alt annet i løypa er delt.

### Egendefinerte domener

Et domene eid av kirken termineres ved **Caddy-kanten** (beskrevet nedenfor), som omskriver `Host`-headeren til nettstedets `{sub}.b1.church` før den sender videre til B1App. På den vanlige stien mottar derfor B1App en *intern* `*.b1.church`-vert og løser den etter vertsetiketten akkurat som et vanlig underdomene – DB-oppslaget i middleware utløses aldri. `src/middleware.ts` kjører likevel på hver forespørsel, men med én alltid-på-oppgave og én reserveløsning:

1. **Alltid** – den **sletter enhver `x-site`-header levert av klienten**. Den headeren er omskrivingsinndata som kan forfalskes, og stoles bare på når middleware selv har satt den; å fjerne den er middlewarens egentlige jobb bak Caddy.
2. **Reserveløsning, bare for `Host` som ikke er intern** – for en rå egendefinert domene-`Host` som når B1App *uten* Caddys omskriving, kaller den `GET /membership/domains/public/lookup/{host}` og setter `x-site: {subDomain}.b1.church` hvis det returnerer en `subDomain`. Bak Caddy er denne grenen inaktiv fordi `Host` allerede er `*.b1.church`.

Interne verter – `localhost`, `b1.church` og endelsene `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` – hopper over oppslaget helt (de løses allerede av omskrivingen etter vertsetikett, eller er forhåndsvisnings-/utrullingsverter).

Selve oppslaget (`DomainRepo.loadByName`) left-joiner `domains → churches` og `domains → sites` og returnerer `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` – underdomenet til det tildelte sekundære nettstedet hvis domenet peker på et, ellers kirkens. Det matcher nøyaktig vert først; hvis verten begynte med `www.` og ikke ga treff, prøver det **én gang** til mot det bare apex-domenet.

Tilbake i `next.config.mjs` plasseres omskrivingsreglene for `x-site` **foran** de generelle vertsreglene, så de vinner. `x-site: grace.b1.church` → første etikett `grace` → `[sdSlug] = grace`, og derfra er oppslaget identisk med underdomenestien (samme `churches/lookup`, samme `siteId`).

:::info
`x-site`-headeren er ikke pålitelig utenfra. Middleware fjerner betingelsesløst enhver innkommende `x-site` før den eventuelt setter sin egen, og omskrivingsreglene ser bare verdien som middleware har satt – en klient kan ikke tvinge seg selv inn på en annen kirkes innhold ved å sende en header.
:::

To driftsdetaljer om middleware:

- **Hurtigbuffer.** Resultatet for hver vert (et treff *eller* en bekreftet bom – aldri en nettverksfeil) bufres i **10 minutter** i et `Map` i minnet, per serverløs isolat.
- **Matcher.** Matcheren tar med vilje inn igjen `/sitemap.xml`, `/robots.txt` og `/manifest.webmanifest`. Det første mønsteret ekskluderer stier med punktum, noe som ellers ville felt ut disse filene; de legges til igjen slik at et egendefinert doménes SEO-/PWA-filer per kirke også får `x-site`-headeren.
- **Kanonisk header.** For kirkesider legger middleware til en `Link: <{proto}://{host}{path}>; rel="canonical"`-responsheader som angir verten siden faktisk ble levert fra – underdomene eller egendefinert domene (`helpers/canonicalLink.ts`). Den hoppes over på verter som ikke tilhører kirker (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) og på `/mobile`, `/login`, `/logout` og de genererte robots-/sitemap-/manifest-filene.

### Deaktivert offentlig nettsted

En kirke kan slå på **Disable Public Website** i B1Admin (innholdsinnstilling på kirkenivå `hidePublicSite = "true"`). Nettstedet serverer da bare rutene for medlemmer:

- **B1App-middleware** slår opp underdomenet (`/membership/churches/lookup` deretter `/content/settings/public/:churchId`) og omdirigerer anonyme forespørsler til enhver sti utenfor tillatelseslisten til `/login?returnUrl={path}{query}`. Tillatelseslisten (`helpers/publicSite.ts`) er `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` og manifest-/robots-/sitemap-filene. Bare bekreftede svar bufres (60 sekunder i produksjon, siden administratorens revalidate-kall ikke kan tømme dette kartet per instans; ubufret i dev/test). En API-feil serverer nettstedet i stedet for å låse alle ute.
- **Innloggede medlemmer ser hele nettstedet.** En forespørsel med en `jwt`-informasjonskapsel som ikke er utløpt (middlewares `hasSession()` dekoder `exp` i nyttelasten uten å verifisere signaturen -- dette er en myk port, ikke tilgangskontroll) hopper over omdirigeringen, slik at et medlem etter innlogging kommer tilbake til siden vedkommende ba om og ser de vanlige sidene, de innebygde sidene (grupper, prekener osv.) og toppnavigasjonen. Sidekomponentene og `Header` sjekker ikke lenger `hidePublicSite` selv.
- **`robots.txt`** forbyr alt, som på noindex-verter.
- **API.** `GET /content/pages/public/:churchId` (sitemapets sideliste) returnerer `[]`, slik at anonyme kallere ikke kan liste sidene.

### Videreføring av `siteId`

`ConfigHelper` lagrer den løste `siteId` på sitt `ConfigurationInterface` per forespørsel (memoisert med React `cache()`) og legger til `?siteId=` på innholdskallene den og sidekomponentene gjør – **betinget**: en tom `siteId` (et underdomene for hovedkirken) utelater parameteren helt. De berørte endepunktene er sidetreet (`/content/pages/:id/tree`), den offentlige sidelisten som brukes av sitemapet (`/content/pages/public/:id`), globale stiler (`/content/globalStyles/church/:id`), navigasjonslenker (`/content/links/church/:id`) og den frittstående bunntekstblokken (`/content/blocks/public/footer/:id`). På den vanlige visningsstien kommer bunnteksten inne i sidetreet (seksjoner merket `zone: "siteFooter"`), allerede hentet med `siteId`, så det finnes ikke noe hull med bunntekst uten omfang.

Medlemsportalen (B1App `mobile`) ligger med vilje utenfor dette: `loadChurchAppearance.ts` løser kirken via `churches/lookup`, men leser `/settings/public/{id}` på kirkenivå og viderefører aldri `siteId` – portalen gjelder hele kirken i v1 (se nedenfor).

## Flere nettsteder per kirke

### Datamodell

Den nye tabellen `membership.sites` er med vilje liten:

| Kolonne | Type | Merknader |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Eierkirke |
| `name` | `varchar(255)` | Visningsnavn (f.eks. «Español», «Ungdom») |
| `subDomain` | `varchar(45)` | **Unik indeks** – globalt navnerom (se under) |

Nettstedsavgrensning skjer så via én enkelt kolonne som ikke kan være null, lagt til innholds- og domenetabellene:

| Tabell (modul) | Kolonne | `''` betyr |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domenet serverer hovednettstedet |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hovednettstedet – og på **`blocks`** betyr `''` i tillegg *delt på tvers av alle nettsteder* |

To migreringer legger til alt dette (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Fordi kolonnen har standardverdien `''`, beholder hver eksisterende rad dagens oppførsel uten etterfylling.

**Globalt underdomene-navnerom.** `sites.subDomain` deler *ett* navnerom med `churches.subDomain` – et nettsteds underdomene kan aldri kollidere med en kirkes underdomene eller et annet nettsteds. Dette håndheves på **begge** lagringsstiene: `SiteController.save` avviser en slug som treffer enten `churches` eller `sites`, og `ChurchController.validateSave` gjør det samme motsatt vei. En unik indeks på `sites.subDomain` støtter det på databasenivå.

**Unikhet for sider** ble utvidet fra `(churchId, url)` til `(churchId, siteId, url)`, slik at to nettsteder hos samme kirke kan ha hver sin `/about`.

### Innhold per nettsted, med reserveløsninger

Hvert innholdsendepunkt for **liste/tre** som er avgrenset til nettsted, tar en valgfri `?siteId=` (fraværende ⇒ `''` = hovednettstedet): sidetre / liste / offentlig, blokkliste / etter type / bunntekst, lenker (anonym / filtrert / alle) og globale stiler. Seksjoner og elementer er *ikke* avgrenset direkte – de arver gjennom sin overordnede side eller blokk.

To oppslagskjeder gjør det interessante arbeidet:

- **Globale stiler – `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnerer nettstedets egen rad; hvis et sekundært nettsted ikke har noen, returnerer den **hovedraden (`''`) som den er** (beholder hovedradens `id`/`siteId`, som klienten bruker til copy-on-write); hvis det heller ikke finnes noen hovedrad, returnerer `GlobalStyleController` en hardkodet standardpalett og standardskrifter.
- **Bunntekstblokk – nettstedsspesifikk vinner, delt er reserve.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnerer de delte (`''`) *og* de nettstedsspesifikke radene; oppsløseren velger nettstedets egen bunntekst hvis den finnes, ellers den delte. Den samme logikken kjøres både i `TreeHelper.insertBlocks` (sidetreet) og i det frittstående endepunktet `/content/blocks/public/footer/:churchId`.

### Kaskade ved sletting av nettsted

`SiteController.delete` (styrt av tillatelsen Settings→Edit i membership) river et sekundært nettsted ned i tre trinn:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskaderer alt innhold nettstedet eier: **sidene** → deres seksjoner, elementer, `pageHistory` og `posts`; nettstedets egne **blokker** → deres seksjoner, elementer og `pageHistory`; dets **lenker** og **globalStyles**. En vern nekter å kjøre for `''` – sentinelen for hoved/delt kaskaderes aldri.
2. `DomainRepo.clearSiteId` **tilordner** nettstedets domener tilbake til hovednettstedet (`siteId → ''`) i stedet for å slette dem, slik at et egendefinert domene overlever at et nettsted slettes.
3. `sites`-raden slettes og Caddy-rutene synkroniseres på nytt (etter beste evne).

### B1Admin-flaten

| Funksjon | Hvor | Mekanisme |
|-----------|-------|-----------|
| Nettstedsbytter | `useSiteSelection` + `SiteSwitcher` (tom = «Main Website») | Leser en `?site=`-URL-parameter og viderefører den som `?siteId=` i ContentApi-kall. Finnes på de tre **liste**-områdene for nettsted – **Pages**, **Blocks**, **Appearance** – men *ikke* i side-/blokkredigererne, som bærer `siteId` på posten |
| Opprette/slette nettsteder | `SitesDialog`, åpnet fra «Manage websites…» i bytteren | `POST /membership/sites` / `DELETE /membership/sites/:id` (navn + subDomain). Styrt av tillatelsen Settings→Edit i membership (`Permissions.settings.edit` på serversiden; `Permissions.membershipApi.settings.edit` i B1Admin). **Bare opprette/slette – det finnes ikke noe grensesnitt for å endre navn i v1** |
| Nettstedstildeling per domene | `DomainSettingsEdit` under Settings→Domains | En nedtrekksliste for nettsted per rad sender `siteId` per domene til `/membership/domains`. Kolonnen skjules hvis API-et ikke returnerer noen nettsteder (eldre backend) |
| Copy-on-write for stiler | `StylesManager.prepareForSave` | Når `siteId` på den innlastede raden for globale stiler ikke samsvarer med det valgte nettstedet (dvs. API-et returnerte den arvede hovedraden som reserve), fjerner den hovedradens `id` og setter inn gjeldende `siteId`, noe som tvinger en **innsetting** av en ny nettstedsspesifikk rad i stedet for å overskrive hovedraden. Den samme forgreningen ved avvik gjelder bunntekstblokken for nettstedet |

:::info
**Hva som forblir felles for hele kirken i v1 (et bevisst avgrensningsvalg, ikke en grense i datamodellen):** **bloggen** (`BlogPage` har ingen bytter og laster `/posts` uten `siteId`), **nettstedswidgetene** (kunngjøringsbanner + startprogram), **omdirigeringer**, **logo / GA4 / kirkeinnstillinger** og **medlemsportalen** (B1App mobile). Merk at dette *ikke* er «hele Appearance» – et sekundært nettsteds globale stiler (palett, skrifter, typografi, avstand, navigasjon, egendefinert CSS) er **per nettsted** via copy-on-write-stien ovenfor; bare underpanelene for banner/startprogram/omdirigeringer/logo på Appearance-siden forblir felles for hele kirken.
:::

## Egendefinerte domener: Caddy-kanten (plan for statisk konfigurasjon)

:::info
**Retningen ble endret 2026-07-02.** En tidligere plan om å flytte hosting av egendefinerte domener til Vercel-administrerte domener ble **avlyst**, og all Vercel-kode for domeneregistrering (`VercelHelper`, miljøvariablene `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM-parametere og helseoppføringer) ble fjernet fra Api. Den selvdrevne **Caddy-proxyen på EC2 beholdes** som den permanente kanten for egendefinerte domener. Det eneste gjenstående arbeidet er internt: å bytte Caddys *kjøretids*-admin-API-konfigurasjon mot en *statisk* konfigurasjon som overlever omstarter.
:::

### Kanten

Hvert egendefinerte kirkedomene peker DNS mot én EC2-maskin – `3.23.251.61`, også tilgjengelig som `proxy.b1.church`. B1Admins skjerm Settings→Domains ber kirkene legge til en apex-`A → 3.23.251.61` eller en `CNAME → proxy.b1.church`. Caddy terminerer TLS med et Let's Encrypt-sertifikat per domene, omskriver `Host`-headeren til domenets `{sub}.b1.church`-oppstrøm og sender videre til B1App – som deretter ruter det etter vertsetikett som ethvert vanlig underdomene (se [Egendefinerte domener](#custom-domains) ovenfor).

Oppstrømskartleggingen kommer fra `DomainRepo.loadPairs`, hvis dial **COALESCE-r det tildelte nettstedets underdomene**, slik at et domene proxyes til riktig *sekundært* nettsted og faller tilbake til kirkens hovednettsted:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*`-rader er utelatt fra kartet; Caddy serverer i stedet `www.{host}` via en `302`-omdirigering til apex.

### To anonyme endepunkter mater kanten

`DomainController` eksponerer to uautentiserte, skrivebeskyttede endepunkter som maskinen bruker direkte – anonyme av nødvendighet, siden kanten spør dem før noen kirkekontekst finnes:

| Endepunkt | Returnerer | Rolle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` hvis domenet – eller, ved bom på `www.`, det bare apex-domenet – finnes i `domains`; ellers `404` (også for et tomt `domain`) | Caddys **on-demand-TLS `ask`**: misbrukskontrollen som avgjør om det skal utstedes et sertifikat for en innkommende SNI |
| `GET /membership/domains/hostmap` | `text/plain`, én sortert linje `{domain} {sub}.b1.church` per rutbart domene | Kartfilen vert→oppstrøm som maskinen oppdaterer etter en timer |

`authorize` gjenbruker `DomainRepo.loadByName` (nøyaktig vert, så ett nytt forsøk `www.`→apex); `hostmap` gjenbruker `loadPairs` – så det tar hensyn til nettsted og utelater `www.*`, identisk med proxy-rutene – og fjerner bare `:443`-endelsen.

### Lagre/slette domene – ett push etter beste evne

`DomainController.save` skriver `domains`-radene og gjør deretter **ett enkelt** kall til `CaddyHelper.updateCaddy()` etter beste evne, pakket i en `try/catch` som logger (`console.error`) og svelger feilen; `delete` gjør det samme (noe som også rettet en tidligere feil med gammel rute etter sletting), det samme gjør sletting av sekundære nettsteder (`SiteController.delete`). `updateCaddy` er selv begrenset av en Axios-timeout på **10 s**, så en Caddy som ikke kan nås eller er stoppet, kan aldri gi `500` ved lagring av et domene – `domains`-tabellen er sannhetskilden.

### Nåværende tilstand – statisk konfigurasjon, ingen kjøretidstilstand

Maskinen (Windows EC2 bak den permanente Elastic IP-en) kjører Caddy fra en **statisk Caddyfile**: on-demand TLS der `ask` peker på `/membership/domains/authorize`, pluss en kartfil vert→oppstrøm som oppdateres hvert 5. minutt fra `/membership/domains/hostmap` av en planlagt oppgave som ender i en skånsom `caddy reload`. Konfigurasjonen overlever omstarter uten noen kjøretidstilstand – ingen ny forhåndsinitialisering – og en ukjent SNI blir **nektet i TLS** (ingen sertifikat utstedes for en vert som `authorize` avviser), mens en autorisert, men ennå ikke kartlagt vert (et splitter nytt domene innenfor synkroniseringsvinduet) får en ren 404. Nye domener blir rutbare innen ca. 5 minutter etter lagring; sertifikatene utstedes ved første treff. Bygging/oppsett, drift og feltprøvde fallgruver: [Caddy-proxy for egendefinerte domener](../deployment/caddy-proxy).

### Eldre push ved kjøretid – reservevei, venter på sletting

`CaddyHelper` (membership-modulen) kan fortsatt styre Caddy via **admin-API-et** på `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; gjør ingenting når de ikke er satt; vises under gruppen Integrations i `ServerHealthController`): `updateCaddy()` PATCH-er en full rutearray, og `initializeCaddy()` + endepunktene `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` bygger en kjøretidskonfigurert server opp fra bunnen av. Konfigurasjonen i den modusen levde bare i Caddys minne – omstartsamnesien som denne arkitekturen erstattet. Maskineriet blir stående utelukkende som reservevei og er planlagt slettet når den statiske maskinen har vært stabil; `updateCaddy()`-pushet etter beste evne ved lagring/sletting av domener er en harmløs no-op mot den statiske maskinen (dens admin-API er bare tilgjengelig lokalt).

## Relaterte sider

- [Caddy-proxy for egendefinerte domener](../deployment/caddy-proxy) – selve kantmaskinen: oppsett av ny maskin, WinSW-tjeneste, oppgave for kartsynkronisering og driftsmessige fallgruver
- [Nettstedsbygger](./website-builder) – side-/seksjons-/elementtreet, renderere, blogg, SEO og AI-generering (hva som vises når en forespørsel er løst til en kirke/et nettsted)
- [Innholdsendepunkter](../api/endpoints/content) – REST-flaten for sider, blokker, lenker og globale stiler, alle nå `?siteId=`-bevisste
- [B1App](../web-apps/b1-app) – Next.js-appen som huser middleware og `[sdSlug]`-rutingen
- [Utrulling av webapper](../deployment/web-apps) – hvordan B1App rulles ut til Vercel
