---
title: "Webstedsrouting og multi-site"
---

# Webstedsrouting og multi-site

<div class="article-intro">

En enkelt kirke kan nu drive mere end ét særskilt websted, og hvert af dem kan ligge på et `*.b1.church`-underdomæne eller på et fuldt tilpasset domæne, som kirken selv ejer. Denne side beskriver routinglaget, der ligger *under* builderen: hvordan en indkommende anmodning bliver til både en kirke **og** et bestemt websted, den multi-site datamodel (`siteId`-sentinelværdien, der sikrer, at alle eksisterende websteder fortsat vises uændret), og custom-domain-kanten, en selvstyret Caddy-proxy på EC2, der afslutter TLS og omskriver hvert kirkedomæne til sin `*.b1.church`-upstream. Hvad der faktisk vises, når en anmodning er løst, altså side-, sektion- og elementtræet, se [Website Builder](./website-builder).

</div>

## Oversigt

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

Tre regler gælder for hele dette lag:

1. **En sentinelværdi sikrer bagudkompatibilitet.** `siteId = ''` er hovedwebstedet. Alle sider, blokke, links, globale stilarter og domænerækker, der fandtes før denne funktion, har `''` og vises præcis, som de gjorde før. Et *andet* websted er blot et sæt rækker med en ikke-tom `siteId`, og ethvert indholdsendepunkt, der kaldes uden `?siteId=`, returnerer hovedwebstedet, byte for byte den gamle anmodning.
2. **Opløsningen er baseret på værtsnavnets første led og konvergerer.** Et `*.b1.church`-underdomæne routes direkte ud fra sit værtsnavnsled. Et custom domain omskrives til sit `{sub}.b1.church`-led ved Caddy-kanten, før B1App ser det (med et middleware-databaseopslag, der sætter en `x-site`-header som reserveløsning for enhver rå custom `Host`). Begge veje ender på den samme `[sdSlug]`-route og det samme `churches/lookup`-kald, så den efterfølgende rendering er identisk.
3. **Caddy-kanten er stateless over én enkelt sandhedskilde.** Custom domains afsluttes på en selvstyret Caddy-proxy på EC2, der omskriver hvert domæne til sin `{sub}.b1.church`-upstream. Et domænesave udløser ét enkelt best-effort-kald til `CaddyHelper.updateCaddy()`, og Caddy læser også selv `domains`-tabellen direkte (endepunkterne `authorize` og `hostmap` nedenfor). Tabellen er autoritativ, så en utilgængelig Caddy kan aldrig få et save til at fejle.

## Webstedsopløsning

### `*.b1.church`-underdomæner

`B1App/next.config.mjs` omskriver indkommende anmodninger ud fra værten. En host-regel med mønsteret `(?<subdomain>.*?)\..*` fanger **det første led** af værten og omskriver `/` og `/:path*` til `/{subdomain}`, altså App Router-segmentet `[sdSlug]`. Så bliver `grace.b1.church/about` til `/grace/about`.

Inde i `src/app/[sdSlug]/` kalder `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}`. Svaret fra `ChurchController.getBySubDomain` har nu to grene:

| Slug matcher | Svar | Betydning |
|--------------|------|-----------|
| `churches.subDomain` | `{ id, name, subDomain }` | Kirkens hovedwebsted |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Et **sekundært websted**. Controlleren falder tilbage til `sites`, finder den ejende kirke og returnerer det forespurgte slug samt det ekstra `siteId` |

Det ekstra `siteId` er det eneste, der adskiller en anmodning til et sekundært websted fra en til hovedwebstedet. Alt andet i pipelinen er fælles.

Et slug, der ikke matcher nogen af tabellerne, returneres som `{}` med `200`. `ConfigHelper.load` behandler et svar uden `id` som et ukendt websted og kalder Nexts `notFound()`, så et ukendt underdomæne får en rigtig 404 i stedet for, at alle efterfølgende kald spørger efter `/…/undefined`. Route for byggersiden opbygger også sin træsti med `pageTreePath()` (`src/helpers/pageTreePath.ts`), som URL-encoder slug'et. Et misdannet slug (backslashes, mellemrum) giver derfor 404 i stedet for at lade API'ens `400` blive til en 500.

### Custom domains

Et kirkeejet domæne afsluttes ved **Caddy-kanten** (se nedenfor), som omskriver `Host`-headeren til webstedets `{sub}.b1.church`, før anmodningen proxyes til B1App. På den normale vej modtager B1App altså en *intern* `*.b1.church`-værtsnavn og løser det ud fra værtsnavnets led, præcis som et almindeligt underdomæne. Middleware-databaseopslaget udløses aldrig. `src/middleware.ts` kører stadig på hver anmodning, men med én altid aktiv opgave og én reserveløsning:

1. **Altid**: Den **sletter enhver klientleveret `x-site`-header**. Headeren er omskrivningsinput, som kan forfalskes, og den stoles kun på, når middleware selv har sat den. At fjerne den er middleware'ens egentlige opgave bag Caddy.
2. **Reserveløsning, kun ikke-intern `Host`**: For en rå custom-domain-`Host`, der når B1App *uden* Caddys omskrivning, kaldes `GET /membership/domains/public/lookup/{host}`. Hvis det returnerer en `subDomain`, sættes `x-site: {subDomain}.b1.church`. Bag Caddy er denne gren inaktiv, fordi `Host` allerede er `*.b1.church`.

Interne værter (`localhost`, `b1.church` og suffikserne `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app`) springer opslaget over helt. De er allerede løst af omskrivningen på værtsnavnets led, eller også er de preview- eller deploy-værter.

Selve opslaget (`DomainRepo.loadByName`) laver en left join fra `domains → churches` og `domains → sites` og returnerer `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`. Det vil sige det tildelte sekundære websteds underdomæne, hvis domænet peger på et, ellers kirkens. Det matcher først det præcise værtsnavn. Hvis værtsnavnet startede med `www.` og ikke gav et hit, forsøges der **én gang** igen mod det nøgne apex-domæne.

Tilbage i `next.config.mjs` placeres `x-site`-omskrivningsreglerne **foran** de generelle host-regler, så de har forrang. `x-site: grace.b1.church` → første led `grace` → `[sdSlug] = grace`, og derfra er opløsningen identisk med underdomænevejen (samme `churches/lookup`, samme `siteId`).

:::info
`x-site`-headeren er utrusted udefra. Middleware fjerner ubetinget enhver indgående `x-site`, før den eventuelt sætter sin egen, og omskrivningsreglerne ser kun den værdi, middleware har sat. En klient kan ikke tvinge sig ind i en anden kirkes indhold ved at sende en header.
:::

To driftsdetaljer om middleware:

- **Cache.** Hver værts resultat (et hit *eller* en bekræftet miss, aldrig en netværksfejl) caches i **10 minutter** i en in-memory `Map`, pr. serverless-isolate.
- **Matcher.** Matcheren inkluderer bevidst igen `/sitemap.xml`, `/robots.txt` og `/manifest.webmanifest`. Dens første mønster udelukker stiers med punktum, hvilket ellers ville droppe disse filer. De tilføjes igen, så et custom domains kirke-specifikke SEO- og PWA-filer også modtager `x-site`-headeren.
- **Kanonisk header.** For kirkesider tilføjer middleware en `Link: <{proto}://{host}{path}>; rel="canonical"`-svarheader, som angiver den vært siden faktisk blev serveret fra, enten underdomænet eller custom domain (`helpers/canonicalLink.ts`). Når et custom domain når B1App gennem [Caddy-proxyen](../deployment/caddy-proxy), er anmodningens vært `{sub}.b1.church`-underdomænet. Middleware bruger derfor besøgerens domæne fra `X-Church-Host` i stedet, men kun efter at `/domains/public/lookup/{host}` bekræfter, at domænet peger på samme underdomæne (`ownsSubdomain()`). Den kanoniske link, `robots.txt` og `sitemap.xml` peger derefter på custom domain i stedet for `b1.church`-underdomænet. Det springes over på ikke-kirkelige værter (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) og på `/mobile`, `/login`, `/logout` samt de genererede robots-, sitemap- og manifestfiler.

### Deaktiveret offentlig hjemmeside

En kirke kan slå **Deaktiver offentlig hjemmeside** til i B1Admin (indstillingen på kirkeniveau `hidePublicSite = "true"`). Webstedet viser så kun de ruter, der er til medlemmer:

- **B1App-middleware** slår underdomænet op (`/membership/churches/lookup` og derefter `/content/settings/public/:churchId`) og omdirigerer anonyme anmodninger til alle stier uden for tilladelseslisten til `/login?returnUrl={path}{query}`. Tilladelseslisten (`helpers/publicSite.ts`) er `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` og manifest-, robots- og sitemap-filerne. Kun bekræftede svar caches (60 sekunder i produktion, fordi adminens revalidate-kald ikke kan rydde denne per-instans-map. I dev/test caches der ikke). En API-fejl viser webstedet i stedet for at låse alle ude.
- **Indloggede medlemmer ser hele webstedet.** En anmodning med en ikke-udløbet `jwt`-cookie (middleware'ens `hasSession()` afkoder payloadens `exp` uden at verificere signaturen. Det er en blød port, ikke adgangskontrol) springer omdirigeringen over. Efter login vender et medlem derfor tilbage til den side, de bad om, og ser de normale sider, indbyggede sider (Grupper, Prædikener osv.) og headernavigationen. Sidekomponenterne og `Header` kontrollerer ikke længere selv `hidePublicSite`.
- **`robots.txt`** forbyder alt, ligesom på noindex-værter.
- **API.** `GET /content/pages/public/:churchId` (sitemaps sideliste) returnerer `[]`, så anonyme kaldere ikke kan liste siderne.

### Videregivelse af `siteId`

`ConfigHelper` gemmer det opløste `siteId` i sin per-anmodnings `ConfigurationInterface` (memoized med React `cache()`) og tilføjer `?siteId=` til de indholdskald, den og sidekomponenterne foretager. Det sker **betinget**: et tomt `siteId` (et underdomæne for hovedkirken) udelader parameteren helt. De endepunkter, der får `siteId` med, er sidetræet (`/content/pages/:id/tree`), den offentlige sideliste til sitemapet (`/content/pages/public/:id`), globale stilarter (`/content/globalStyles/church/:id`), navigationslinks (`/content/links/church/:id`) og den selvstændige footerblok (`/content/blocks/public/footer/:id`). På den normale renderingsvej kommer footeren med i sidetræet (sektioner markeret `zone: "siteFooter"`), som allerede hentes med `siteId`. Der er derfor ingen footer-hul uden scope.

Medlemsportalen (B1App `mobile`) er bevidst udenfor dette. `loadChurchAppearance.ts` finder kirken via `churches/lookup`, men læser indstillinger på kirkeniveau fra `/settings/public/{id}` og videregiver aldrig `siteId`. Portalen er kirkedækkende i v1 (se nedenfor).

## Flere websteder pr. kirke

### Datamodel

Den nye tabel `membership.sites` er bevidst lille:

| Kolonne | Type | Noter |
|---------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Ejende kirke |
| `name` | `varchar(255)` | Visningsnavn (f.eks. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unikt indeks**, globalt namespace (se nedenfor) |

Webstedsscoping er derefter én enkelt kolonne uden null-værdier, tilføjet til indholds- og domænetabellerne:

| Tabel (modul) | Kolonne | `''` betyder |
|---------------|---------|--------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domænet serverer hovedwebstedet |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hovedwebstedet. På **`blocks`** betyder `''` desuden *delt på tværs af alle websteder* |

To migreringer tilføjer alt dette (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Fordi kolonnen har standardværdien `''`, beholder alle eksisterende rækker deres nuværende adfærd uden backfill.

**Globalt underdomænenamespace.** `sites.subDomain` deler *ét* namespace med `churches.subDomain`. Et websteds underdomæne kan aldrig kollidere med et kirkeunderdomæne eller et andet websteds. Det håndhæves på **begge** save-veje. `SiteController.save` afviser et slug, der rammer enten `churches` eller `sites`, og `ChurchController.validateSave` gør det samme i omvendt retning. Et unikt indeks på `sites.subDomain` sikrer det på databaseniveau.

**Unikhed for sider** er udvidet fra `(churchId, url)` til `(churchId, siteId, url)`, så to websteder under samme kirke hver kan eje deres egen `/about`.

### Indhold pr. websted med reserveløsninger

Alle indholdsendepunkter til lister og træer med webstedsscope tager et valgfrit `?siteId=` (fraværende ⇒ `''` = hovedwebstedet): sidetræ, sideliste og offentlige sider, blokkelister, blokke efter type og footer, links (anonyme, filtrerede og alle) og globale stilarter. Sektioner og elementer er *ikke* scoped direkte. De arver fra deres forældreside eller -blok.

To opløsningskæder gør det interessante arbejde:

- **Globale stilarter: `websted → hoved → standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnerer webstedets egen række. Hvis et sekundært websted ikke har en, returneres **hovedrækken (`''`) som den er** (den beholder hovedets `id`/`siteId`, som klienten bruger til copy-on-write). Hvis der heller ikke er en hovedrække, returnerer `GlobalStyleController` en hårdkodet standardpalet og -skrifttyper.
- **Footerblok: webstedsspecifik vinder, delt falder tilbage.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnerer både de delte (`''`) og de webstedsspecifikke rækker. Resolveren vælger webstedets egen footer, hvis den findes, ellers den delte. Den samme logik kører både i `TreeHelper.insertBlocks` (sidetræet) og i det selvstændige endepunkt `/content/blocks/public/footer/:churchId`.

### Kaskade ved sletning af websted

`SiteController.delete` (styret af tilladelsen Indstillinger→Rediger i medlemsmodulet) fjerner et sekundært websted i tre trin:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskade-sletter alt indhold, webstedet ejer: dets **sider** → deres sektioner, elementer, `pageHistory` og `posts`. Dets egne **blokke** → deres sektioner, elementer og `pageHistory`. Dets **links** og **globalStyles**. En vagt nægter at køre for `''`. Hovedwebstedets/den delte sentinel kaskade-slettes aldrig.
2. `DomainRepo.clearSiteId` **tildeler** webstedets domæner tilbage til hovedwebstedet (`siteId → ''`) i stedet for at slette dem, så et custom domain overlever sletningen af et websted.
3. Rækken i `sites` slettes, og Caddy-rutes synkroniseres igen (best-effort).

### B1Admin-flade

| Funktion | Hvor | Mekanisme |
|----------|------|-----------|
| Webstedsskifter | `useSiteSelection` + `SiteSwitcher` (tom = "Hovedwebsted") | Læser URL-parameteren `?site=` og videregiver den som `?siteId=` i ContentApi-kald. Findes på de tre webstedslister: **Sider**, **Blokke** og **Udseende**, men *ikke* i side- og blokeditorerne, som har `siteId` på posten selv |
| Oprettelse/sletning af websteder | `SitesDialog`, åbnet fra skifterens "Administrer websteder…"-punkt | `POST /membership/sites` / `DELETE /membership/sites/:id` (navn + subDomain). Styret af tilladelsen Indstillinger→Rediger i medlemsmodulet (`Permissions.settings.edit` på serversiden, `Permissions.membershipApi.settings.edit` i B1Admin). **Kun oprettelse og sletning. Der findes ingen omdøbningsfunktion i v1** |
| Tildeling af websted pr. domæne | `DomainSettingsEdit` under Indstillinger→Domæner | En webstedsdropdown pr. række sender `siteId` pr. domæne til `/membership/domains`. Kolonnen skjules, hvis API'en ikke returnerer nogen websteder (ældre backend) |
| Copy-on-write for stilarter | `StylesManager.prepareForSave` | Når den indlæste række for globale stilarter har et `siteId`, der ikke matcher det valgte websted (dvs. API'en returnerede hovedwebstedet som reserve), fjerner den hovedets `id` og sætter det aktuelle `siteId`. Det tvinger en **indsættelse** af en ny webstedsspecifik række i stedet for at overskrive hovedet. Den samme gaffel-ved-uoverensstemmelse gælder for webstedets footerblok |

:::info
**Det der forbliver kirkedækkende i v1 (et bevidst valg af scope, ikke en begrænsning i datamodellen):** **bloggen** (`BlogPage` har ingen skifter og henter `/posts` uden `siteId`), **webstedswidgets** (annonceringsbanner og launcher), **omdirigeringer**, **logo/GA4/kirkeindstillinger** og **medlemsportalen** (B1App mobile). Bemærk, at dette *ikke* er "hele Udseende". Et sekundært websteds globale stilarter (palet, skrifttyper, typografi, afstand, navigation, brugerdefineret CSS) **er** pr. websted via copy-on-write-vejen ovenfor. Kun under-panelerne for banner, launcher, omdirigeringer og logo på siden Udseende forbliver kirkedækkende.
:::

## Custom domains: Caddy-kanten (statisk konfigurationsplan)

:::info
**Retningen ændret 2026-07-02.** En tidligere plan om at flytte hosting af custom domains til Vercel-administrerede domæner blev **annulleret**. Al kode til domæneregistrering hos Vercel (`VercelHelper`, dens miljøvariabler `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM-parametre og healthtjek) blev fjernet fra API'en. Den selvstyrede **Caddy-proxy på EC2 forbliver** som den permanente custom domain-kant. Det eneste resterende arbejde er internt: at udskifte Caddys *kørende* admin-API-konfiguration med en *statisk* konfiguration, der overlever genstarter.
:::

### Kanten

Hvert custom kirkedomæne peger DNS på én EC2-maskine: `3.23.251.61`, også tilgængelig som `proxy.b1.church`. B1Admins skærm Indstillinger→Domæner instruerer kirker i at tilføje en apex-`A → 3.23.251.61` eller en `CNAME → proxy.b1.church`. Caddy afslutter TLS med et Let's Encrypt-certifikat pr. domæne, omskriver `Host`-headeren til domænets `{sub}.b1.church`-upstream og proxyer til B1App. B1App router det derefter ud fra værtsnavnets led, ligesom et almindeligt underdomæne (se [Custom domains](#custom-domains) ovenfor).

Upstream-mapningen kommer fra `DomainRepo.loadPairs`. Dens dial bruger COALESCE på det tildelte websteds underdomæne, så et domæne proxyer til det korrekte *sekundære* websted og falder tilbage til kirkens hovedwebsted:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Rækker med `www.*` udelukkes fra mapningen. Caddy serverer `www.{host}` via en `302`-omdirigering til apex i stedet.

### To anonyme endepunkter forsyner kanten

`DomainController` eksponerer to uautentificerede, skrivebeskyttede endepunkter, som maskinen bruger direkte. De er anonyme af nødvendighed, fordi kanten forespørger dem, før der findes nogen kirkekontekst:

| Endepunkt | Returnerer | Rolle |
|-----------|------------|-------|
| `GET /membership/domains/authorize?domain=` | `200`, hvis domænet, eller for en `www.`-miss dets nøgne apex, findes i `domains`. Ellers `404` (også for et tomt `domain`) | Caddys **on-demand-TLS `ask`**: misbrugskontrollen, der afgør, om der skal udstedes et certifikat for en indkommende SNI |
| `GET /membership/domains/hostmap` | `text/plain` med én sorteret linje `{domain} {sub}.b1.church` pr. routbart domæne | Værts→upstream-mapfilen, som maskinen opdaterer på en timer |

`authorize` genbruger `DomainRepo.loadByName` (præcis vært, derefter ét forsøg uden `www.`). `hostmap` genbruger `loadPairs`, så den er webstedsbevidst og udelukker `www.*`, ligesom proxy-rutene, og den fjerner blot `:443`-suffikset.

### Gem/slet domæne: ét best-effort-push

`DomainController.save` skriver rækkerne i `domains` og foretager derefter ét **best-effort**-kald til `CaddyHelper.updateCaddy()`, pakket ind i en `try/catch`, der logger (`console.error`) og sluger fejlen. `delete` gør det samme (hvilket også rettede en tidligere fejl med forældede ruter ved sletning), og det gør sletning af sekundære websteder (`SiteController.delete`). `updateCaddy` er i sig selv begrænset af en **10 sekunders** Axios-timeout, så en utilgængelig eller stoppet Caddy aldrig kan give en `500` ved gem af et domæne. Tabellen `domains` er sandhedskilden.

### Nuværende tilstand: statisk konfiguration, ingen runtime-tilstand

Maskinen (en Windows EC2 bag den permanente Elastic IP) kører Caddy med en **statisk Caddyfile**. Den har on-demand TLS, hvor `ask` peger på `/membership/domains/authorize`, samt en værts→upstream-mapfil, som opdateres hvert 5. minut fra `/membership/domains/hostmap` af en planlagt opgave, der slutter med en elegant `caddy reload`. Konfigurationen overlever genstarter uden nogen runtime-tilstand, og der er ingen dans med at genprimere. En ukendt SNI bliver **TLS-afvist** (der udstedes intet certifikat til en vært, som `authorize` afviser), mens en autoriseret, men endnu ikke mappet vært (et helt nyt domæne inden for synkroniseringsvinduet) får et rent 404. Nye domæner kan routes inden for ca. 5 minutter efter et save. Deres certifikater udstedes ved første besøg. Opsætning, drift og gotchas fra praksis: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legacy runtime-push: rollback-vej, afventer sletning

`CaddyHelper` (membership-modulet) kan stadig styre Caddy gennem sit **admin-API** på `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`. Ingen handling, hvis de ikke er sat. Vises under integrationsgruppen i `ServerHealthController`). `updateCaddy()` sender en PATCH med et komplet routes-array, og `initializeCaddy()` samt endepunkterne `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` genopbygger en runtime-konfigureret server fra bunden. Konfigurationen i den tilstand lå kun i Caddys hukommelse, altså den genstarts-hukommelsestab, som denne arkitektur erstattede. Maskineriet findes kun som rollback-vej og er planlagt slettet, når den statiske maskine har været stabil. Det best-effort `updateCaddy()`-push ved gem/sletning af domæne er en harmløs no-op mod den statiske maskine, fordi dens admin-API kun er tilgængeligt på localhost.

## Relaterede sider

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy): selve kantmaskinen: opsætning af en frisk maskine, WinSW-tjenesten, synkroniseringsopgaven for kortet og driftsgotchas
- [Website Builder](./website-builder): sidernes, sektionernes og elementernes træ, renderere, blog, SEO og AI-generering (det der vises, når en anmodning er løst til en kirke/et websted)
- [Content Endpoints](../api/endpoints/content): REST-fladen for sider, blokke, links og globale stilarter, som nu alle er `?siteId=`-bevidste
- [B1App](../web-apps/b1-app): Next.js-appen, der huser middleware og `[sdSlug]`-routingen
- [Web App Deployment](../deployment/web-apps): hvordan B1App deployes til Vercel
