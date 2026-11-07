---
title: "Routing av webbplatser & flera webbplatser"
---

# Routing av webbplatser & flera webbplatser

<div class="article-intro">

En enskild kyrka kan nu ha fler än en webbplats, och var och en kan finnas på en `*.b1.church`-underdomän eller på en helt anpassad domän som kyrkan äger. Den här sidan beskriver routinglagret *under* byggaren: hur en inkommande förfrågan matchas mot en kyrka **och** mot en specifik webbplats, datamodellen för flera webbplatser (`siteId`-sentinelvärdet som gör att alla befintliga webbplatser fortsätter att renderas oförändrade) och kanten för anpassade domäner, en egenhanterad Caddy-proxy på EC2 som avslutar TLS och skriver om varje kyrkodomän till dess `*.b1.church`-upstream. För vad som faktiskt renderas när en förfrågan har matchats, det vill säga sid-, sektions- och elementträdet, se [Webbplatsbyggaren](./website-builder).

</div>

## Översikt

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

Tre regler gäller i hela det här lagret:

1. **En sentinel håller allt bakåtkompatibelt.** `siteId = ''` är huvudwebbplatsen. Varje sida, block, länk, global stil och domänrad som fanns före den här funktionen har `''` och renderas exakt som tidigare. En *andra* webbplats är helt enkelt en uppsättning rader med ett icke-tomt `siteId`, och varje innehållsendpoint som anropas utan `?siteId=` returnerar huvudwebbplatsen, byte för byte samma förfrågan som tidigare.
2. **Matchningen sker utifrån hostetiketten och konvergerar.** En `*.b1.church`-underdomän routas direkt på sin hostetikett. En anpassad domän skrivs om till sin `{sub}.b1.church`-etikett i Caddy-kanten innan B1App ser den (med ett middleware-databasuppslag som sätter en `x-site`-header som reserv för alla råa anpassade `Host`-värden). Båda vägarna landar på samma `[sdSlug]`-route och samma `churches/lookup`-anrop, så renderingen nedströms blir identisk.
3. **Caddy-kanten är tillståndslös ovanpå en enda källa till sanning.** Anpassade domäner avslutas i en egenhanterad Caddy-proxy på EC2 som skriver om varje domän till sin `{sub}.b1.church`-upstream. När en domän sparas skickas ett enda best-effort-anrop till `CaddyHelper.updateCaddy()`, och Caddy läser dessutom tabellen `domains` direkt (endpointerna `authorize` och `hostmap` nedan). Tabellen är auktoritativ. En onåbar Caddy kan aldrig få en sparning att misslyckas.

## Matchning av webbplats

### `*.b1.church`-underdomäner

`B1App/next.config.mjs` skriver om inkommande förfrågningar utifrån värdnamnet. En värdregel med mönstret `(?<subdomain>.*?)\..*` fångar **första etiketten** i värdnamnet och skriver om `/` och `/:path*` till `/{subdomain}`, det vill säga App Router-segmentet `[sdSlug]`. Alltså blir `grace.b1.church/about` till `/grace/about`.

Inne i `src/app/[sdSlug]/` anropar `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}`. Svaret från `ChurchController.getBySubDomain` har nu två grenar:

| Slug matchar | Svar | Betydelse |
|--------------|------|-----------|
| `churches.subDomain` | `{ id, name, subDomain }` | Huvudwebbplatsen för den kyrkan |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | En **sekundär webbplats**. Kontrollern faller tillbaka till `sites`, slår upp den ägande kyrkan och returnerar den efterfrågade slugen tillsammans med det extra `siteId`-fältet |

Det extra `siteId` är det enda som skiljer en förfrågan till en sekundär webbplats från en till huvudwebbplatsen. Allt annat i flödet är gemensamt.

En slug som inte matchar någon av tabellerna returneras som `{}` med status `200`. `ConfigHelper.load` behandlar ett svar utan `id` som en okänd webbplats och anropar Nexts `notFound()`, så en okänd underdomän får ett riktigt 404 i stället för att alla efterföljande anrop frågar efter `/…/undefined`. Route för byggarsidor bygger också sin trädsökväg med `pageTreePath()` (`src/helpers/pageTreePath.ts`), som URL-kodar slugen. En felaktig slug (snedstreck bakåt, mellanslag) ger därmed 404 i stället för att API:ets `400` visas som ett 500-fel.

### Anpassade domäner

En domän som kyrkan äger avslutas vid **Caddy-kanten** (beskrivs nedan), som skriver om `Host`-headern till webbplatsens `{sub}.b1.church` innan den proxyas till B1App. På den normala vägen tar B1App alltså emot en *intern* `*.b1.church`-värd och matchar den på hostetiketten precis som en inbyggd underdomän. Middleware-databasuppslaget körs aldrig. `src/middleware.ts` körs fortfarande på varje förfrågan, men med ett alltid aktivt jobb och en reservväg:

1. **Alltid**: den **tar bort alla klientlevererade `x-site`-headers**. Den headern är förfalskningsbar omskrivningsindata och litas bara på när middleware självt sätter den. Att ta bort den är middleware:ns egentliga jobb bakom Caddy.
2. **Reserv, endast icke-intern `Host`**: för ett rått anpassat domän-`Host` som når B1App *utan* Caddys omskrivning anropas `GET /membership/domains/public/lookup/{host}`. Om det returnerar en `subDomain` sätts `x-site: {subDomain}.b1.church`. Bakom Caddy är den grenen inaktiv, eftersom `Host` redan är `*.b1.church`.

Interna värdar (`localhost`, `b1.church` och suffixen `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app`) hoppar över uppslaget helt. De matchas redan av omskrivningen på hostetiketten, eller så är de förhandsgransknings- eller driftsättningsvärdar.

Själva uppslaget (`DomainRepo.loadByName`) gör en left join av `domains → churches` och `domains → sites` och returnerar `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`. Det vill säga den tilldelade sekundära webbplatsens underdomän om domänen pekar på en sådan, annars kyrkans. Den matchar först det exakta värdnamnet. Om värdnamnet började med `www.` och missade, görs **ett** nytt försök mot den nakna apex-domänen.

Tillbaka i `next.config.mjs` placeras `x-site`-omskrivningsreglerna **före** de generella värdreglerna, så att de vinner. `x-site: grace.b1.church` ger första etiketten `grace`, alltså `[sdSlug] = grace`, och därifrån är matchningen identisk med underdomänvägen (samma `churches/lookup`, samma `siteId`).

:::info
`x-site`-headern är inte betrodd från utsidan. Middleware tar ovillkorligen bort all inkommande `x-site` innan den eventuellt sätter sin egen, och omskrivningsreglerna ser bara det värde som middleware satt. En klient kan inte tvinga sig in i en annan kyrkas innehåll genom att skicka en header.
:::

Två driftsdetaljer för middleware:

- **Cache.** Varje värds resultat (en träff *eller* en bekräftad miss, aldrig ett nätverksfel) cachas i **10 minuter** i en `Map` i minnet, per serverlös isolat.
- **Matcher.** Matchern inkluderar medvetet igen `/sitemap.xml`, `/robots.txt` och `/manifest.webmanifest`. Dess första mönster exkluderar punktade sökvägar, vilket annars skulle filtrera bort dessa filer. De läggs tillbaka så att en anpassad domäns SEO- och PWA-filer för varje kyrka också får `x-site`-headern.
- **Kanonisk header.** För kyrksidor lägger middleware till en svarsheader `Link: <{proto}://{host}{path}>; rel="canonical"` som anger värdnamnet sidan faktiskt serverades från, antingen underdomänen eller den anpassade domänen (`helpers/canonicalLink.ts`). När en anpassad domän når B1App genom [Caddy-proxyn](../deployment/caddy-proxy) är förfrågans värdnamn `{sub}.b1.church`-underdomänen, så middleware använder i stället besökarens domän från `X-Church-Host`. Det sker dock först efter att `/domains/public/lookup/{host}` har bekräftat att domänen mappar till samma underdomän (`ownsSubdomain()`). Den kanoniska länken, `robots.txt` och `sitemap.xml` anger då den anpassade domänen i stället för `b1.church`-underdomänen. Den hoppas över på icke-kyrkliga värdar (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) och på `/mobile`, `/login`, `/logout` samt de genererade robots-, sitemap- och manifest-filerna.

### Inaktiverad publik webbplats

En kyrka kan aktivera **Disable Public Website** i B1Admin (kyrkonivåinställningen `hidePublicSite = "true"`). Webbplatsen visar då bara sina medlemsriktade rutter:

- **B1App-middleware** slår upp underdomänen (`/membership/churches/lookup` och sedan `/content/settings/public/:churchId`) och omdirigerar anonyma förfrågningar till alla sökvägar utanför tillåtlistan till `/login?returnUrl={path}{query}`. Tillåtlistan (`helpers/publicSite.ts`) består av `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` och manifest-, robots- och sitemap-filerna. Endast bekräftade svar cachas (60 sekunder i produktion, eftersom adminens revalidate-anrop inte kan rensa den per-instans-mappningen. Ingen cache i dev och test). Ett API-fel visar webbplatsen i stället för att låsa ute alla.
- **Inloggade medlemmar ser hela webbplatsen.** En förfrågan med en ej utgången `jwt`-cookie (middleware:ns `hasSession()` avkodar payloadens `exp` utan att verifiera signaturen, vilket är en mjuk spärr och inte åtkomstkontroll) hoppar över omdirigeringen. Efter inloggning återvänder en medlem därför till sidan de bad om och ser de vanliga sidorna, inbyggda sidor (Grupper, Predikningar m.m.) och navigeringen i sidhuvudet. Sidkomponenterna och `Header` kontrollerar inte längre `hidePublicSite` själva.
- **`robots.txt`** nekar allt, precis som på noindex-värdar.
- **API.** `GET /content/pages/public/:churchId` (sitemapens sidlista) returnerar `[]`, så anonyma anropare kan inte lista sidorna.

### Vidarebefordran av `siteId`

`ConfigHelper` lagrar det matchade `siteId` i sitt konfigurationsobjekt per förfrågan (memoiserat med Reacts `cache()`) och lägger till `?siteId=` till de innehållsanrop som den och sidkomponenterna gör. Det sker **villkorligt**: ett tomt `siteId` (en underdomän för en huvudkyrka) utelämnar parametern helt. Endpointerna som vidarebefordrar den är sidträdet (`/content/pages/:id/tree`), den publika sidlistan som används av sitemapen (`/content/pages/public/:id`), globala stilar (`/content/globalStyles/church/:id`), navigationslänkar (`/content/links/church/:id`) och det fristående sidfotsblocket (`/content/blocks/public/footer/:id`). På den normala renderingsvägen kommer sidfoten med i sidträdet (sektioner taggade `zone: "siteFooter"`), redan hämtad med `siteId`, så det finns inget icke-avgränsat hål för sidfoten.

Medlemsportalen (B1App `mobile`) ligger avsiktligt utanför detta. `loadChurchAppearance.ts` matchar kyrkan via `churches/lookup`, men läser kyrkonivåns `/settings/public/{id}` och vidarebefordrar aldrig `siteId`. Portalen är kyrkövergripande i v1 (se nedan).

## Flera webbplatser per kyrka

### Datamodell

Den nya tabellen `membership.sites` är avsiktligt liten:

| Kolumn | Typ | Anmärkning |
|--------|-----|------------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Ägande kyrka |
| `name` | `varchar(255)` | Visningsnamn (t.ex. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unikt index**, globalt namnutrymme (se nedan) |

Webbplatsavgränsningen består sedan av en enda kolumn, utan null, som läggs till i innehålls- och domäntabellerna:

| Tabell (modul) | Kolumn | `''` betyder |
|----------------|--------|--------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domänen betjänar huvudwebbplatsen |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Huvudwebbplatsen. För **`blocks`** betyder `''` dessutom *delat över alla webbplatser* |

Två migreringar lägger till allt detta (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Eftersom kolumnen har standardvärdet `''` behåller varje befintlig rad dagens beteende utan någon backfill.

**Globalt namnutrymme för underdomäner.** `sites.subDomain` delar *ett* namnutrymme med `churches.subDomain`. En webbplatsunderdomän kan aldrig kollidera med en kyrkounderdomän eller med en annan webbplats. Detta tillämpas på **båda** sparvägarna: `SiteController.save` avvisar en slug som finns i antingen `churches` eller `sites`, och `ChurchController.validateSave` gör samma sak åt andra hållet. Ett unikt index på `sites.subDomain` säkrar detta på databasnivå.

**Unikhet för sidor** breddades från `(churchId, url)` till `(churchId, siteId, url)`, så att två webbplatser i samma kyrka kan ha var sin `/about`.

### Innehåll per webbplats, med reserver

Varje innehållsendpoint för lista och träd som är avgränsad till en webbplats tar ett valfritt `?siteId=` (saknas ⇒ `''` = huvudwebbplatsen). Det gäller sidträd, sidlista och publik sidlista, blocklista, block efter typ och sidfot, länkar (anonyma, filtrerade och alla) samt globala stilar. Sektioner och element avgränsas *inte* direkt. De ärver genom sin överordnade sida eller sitt block.

Två upplösningskedjor gör det intressanta arbetet:

- **Globala stilar: `webbplats → huvudwebbplats → standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` returnerar webbplatsens egen rad. Om en sekundär webbplats saknar en returnerar den **huvudradens (`''`) rad som den är** (behåller huvudradens `id`/`siteId`, vilka klienten använder för copy-on-write). Om det inte finns någon huvudrad heller returnerar `GlobalStyleController` en hårdkodad standardpalett och standardtypsnitt.
- **Sidfotsblock: webbplatsspecifikt vinner, delat faller tillbaka.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` returnerar både de delade (`''`) raderna *och* de webbplatsspecifika. Resolvern väljer webbplatsens egen sidfot om den finns, annars den delade. Samma logik körs både i `TreeHelper.insertBlocks` (sidträdet) och i den fristående endpointen `/content/blocks/public/footer/:churchId`.

### Borttagningskaskad för webbplats

`SiteController.delete` (kräver behörigheten Inställningar→Redigera i medlemsmodulen) tar bort en sekundär webbplats i tre steg:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskadraderar allt innehåll som webbplatsen äger: dess **sidor** med deras sektioner, element, `pageHistory` och `posts`, dess egna **block** med deras sektioner, element och `pageHistory`, samt dess **länkar** och **globalStyles**. Ett skydd vägrar köra för `''`. Huvud- eller delat-sentinelvärdet kaskadraderas aldrig.
2. `DomainRepo.clearSiteId` **tilldelar om** webbplatsens domäner tillbaka till huvudwebbplatsen (`siteId → ''`) i stället för att radera dem, så att en anpassad domän överlever borttagningen av en webbplats.
3. Raden i `sites` tas bort och Caddy-rutterna synkroniseras igen (best-effort).

### B1Admin-ytan

| Funktion | Var | Mekanism |
|----------|-----|----------|
| Webbplatsväxlare | `useSiteSelection` + `SiteSwitcher` (tomt = "Main Website") | Läser en URL-parameter `?site=` och vidarebefordrar den som `?siteId=` till ContentApi-anrop. Finns på de tre webbplatslistorna: **Sidor**, **Block** och **Utseende**, men *inte* på sid- och blockredigerarna, som bär `siteId` på posten |
| Skapa och ta bort webbplatser | `SitesDialog`, öppnas från växlarens post "Manage websites…" | `POST /membership/sites` och `DELETE /membership/sites/:id` (namn och subDomain). Kräver behörigheten Inställningar→Redigera i medlemsmodulen (`Permissions.settings.edit` på servern, `Permissions.membershipApi.settings.edit` i B1Admin). **Endast skapa och ta bort. Det finns inget gränssnitt för namnbyte i v1** |
| Tilldelning av webbplats per domän | `DomainSettingsEdit` under Inställningar→Domäner | En webbplatsrullista per rad skickar `siteId` per domän till `/membership/domains`. Kolumnen döljs om API:et inte returnerar några webbplatser (äldre backend) |
| Copy-on-write för stilar | `StylesManager.prepareForSave` | När den inlästa raden för globala stilar har ett `siteId` som inte matchar den valda webbplatsen (dvs. API:et returnerade huvudwebbplatsen som reserv) tas huvudns `id` bort och det aktuella `siteId` sätts. Detta tvingar fram ett **insert** av en ny webbplatsspecifik rad i stället för att skriva över huvudraden. Samma gaffel vid avvikelse gäller för webbplatsens sidfotsblock |

:::info
**Det som förblir kyrkövergripande i v1 (ett medvetet val av avgränsning, inte en begränsning i datamodellen):** **bloggen** (`BlogPage` har ingen växlare och laddar `/posts` utan `siteId`), **webbplatsens widgets** (banderoll för meddelanden och startknapp), **omdirigeringar**, **logotypen, GA4 och kyrkoinställningarna** samt **medlemsportalen** (B1App mobile). Observera att detta *inte* gäller "all Utseende". En sekundär webbplats globala stilar (palett, typsnitt, typografi, avstånd, navigering och egen CSS) **är** per webbplats via copy-on-write-vägen ovan. Det är bara under-panelerna för banderoll, startknapp, omdirigeringar och logotyp på sidan Utseende som förblir kyrkövergripande.
:::

## Anpassade domäner: Caddy-kanten (plan för statisk konfiguration)

:::info
**Riktningen reviderades 2026-07-02.** En tidigare plan att flytta hosting för anpassade domäner till Vercel-hanterade domäner **avbröts**, och all kod för domänregistrering i Vercel (`VercelHelper`, dess miljövariabler `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM-parametrar och hälsoposter) togs bort från API:et. Den egenhanterade **Caddy-proxyn på EC2 finns kvar** som den permanenta kanten för anpassade domäner. Det enda återstående arbetet är internt: att byta ut Caddys *körtidskonfiguration* via admin-API:t mot en *statisk* konfiguration som överlever omstarter.
:::

### Kanten

Varje anpassad kyrkodomän pekar sin DNS mot en EC2-maskin, `3.23.251.61`, som också nås via `proxy.b1.church`. Skärmen Inställningar→Domäner i B1Admin instruerar kyrkor att lägga till en apex-post `A → 3.23.251.61` eller en `CNAME → proxy.b1.church`. Caddy avslutar TLS med ett Let's Encrypt-certifikat per domän, skriver om `Host`-headern till domänens `{sub}.b1.church`-upstream och proxyar vidare till B1App. B1App matchar sedan den på hostetiketten precis som vilken inbyggd underdomän som helst (se [Anpassade domäner](#custom-domains) ovan).

Upstream-mappningen kommer från `DomainRepo.loadPairs`, vars dial **COALESCEar den tilldelade webbplatsens underdomän** så att en domän proxar till rätt *sekundära* webbplats, med reserv till kyrkans huvudwebbplats:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Rader med `www.*` utesluts ur mappningen. Caddy betjänar i stället `www.{host}` med en omdirigering `302` till apex.

### Två anonyma endpoints matar kanten

`DomainController` exponerar två oautentiserade skrivskyddade endpoints som maskinen använder direkt. De är anonyma av nödvändighet, eftersom kanten frågar dem innan någon kyrkokontext finns:

| Endpoint | Returnerar | Roll |
|----------|------------|------|
| `GET /membership/domains/authorize?domain=` | `200` om domänen, eller för en `www.`-miss dess nakna apex, finns i `domains`. Annars `404` (även för en tom `domain`) | Caddys **on-demand-TLS `ask`**: spärren mot missbruk som avgör om ett certifikat ska utfärdas för en inkommande SNI |
| `GET /membership/domains/hostmap` | `text/plain`, en sorterad rad `{domain} {sub}.b1.church` per routbar domän | Filen med värd→upstream-mappning som maskinen uppdaterar med en timer |

`authorize` återanvänder `DomainRepo.loadByName` (exakt värdnamn, sedan ett enda nytt försök med `www.`→apex). `hostmap` återanvänder `loadPairs`, så den är webbplatsmedveten och utesluter `www.*`, precis som proxyrutterna, och tar bara bort suffixet `:443`.

### Spara och ta bort domän: en best-effort-push

`DomainController.save` skriver raderna i `domains` och gör sedan ett **enda best-effort-anrop** till `CaddyHelper.updateCaddy()`, omslutet av ett `try/catch` som loggar (`console.error`) och sväljer felet. `delete` gör samma sak (vilket också åtgärdade en tidigare bugg med inaktuella rutter vid borttagning), liksom borttagning av sekundär webbplats (`SiteController.delete`). `updateCaddy` begränsas i sig av en **10 sekunders** Axios-timeout, så en onåbar eller stoppad Caddy kan aldrig ge ett `500` vid sparning av en domän. Tabellen `domains` är källan till sanning.

### Nuvarande läge: statisk konfiguration, inget körtidstillstånd

Maskinen (en Windows-EC2 bakom den permanenta Elastic IP:n) kör Caddy med en **statisk Caddyfile**. Den har on-demand-TLS med `ask` som pekar på `/membership/domains/authorize`, samt en fil för värd→upstream-mappning som uppdateras var 5:e minut från `/membership/domains/hostmap` av en schemalagd uppgift som avslutas med en mjuk `caddy reload`. Konfigurationen överlever omstarter utan något körtidstillstånd, och det finns ingen omprimningsprocedur. En okänd SNI **avvisas i TLS** (inget certifikat utfärdas för en värd som `authorize` avvisar), medan en auktoriserad men ännu inte mappad värd (en helt ny domän inom synkfönstret) får ett rent 404. Nya domäner blir routbara inom cirka 5 minuter efter en sparning. Deras certifikat utfärdas vid första träffen. Bygg- och installationsinstruktioner, drift och fältprövade fallgropar finns i [Caddy anpassad domänproxy](../deployment/caddy-proxy).

### Körtidspush i äldre läge: reservväg, väntar på borttagning

`CaddyHelper` (membership-modulen) kan fortfarande styra Caddy via sitt **admin-API** på `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`. Ingen åtgärd om de saknas, och det visas under gruppen Integrations i `ServerHealthController`). `updateCaddy()` PATCHar en komplett rutt-array, och `initializeCaddy()` samt endpointerna `GET /membership/domains/caddy/init` och `GET /membership/domains/caddy` bygger upp en körtidskonfigurerad server från början. I det läget fanns konfigurationen bara i Caddys minne. Det var just den omstartsförlusten som den här arkitekturen ersatte. Mekanismen finns kvar enbart som reservväg och är schemalagd för borttagning när den statiska maskinen har varit stabil. Den best-effort-push till `updateCaddy()` som sker vid sparning och borttagning av domän är en ofarlig no-op mot den statiska maskinen, eftersom dess admin-API bara är nåbart från localhost.

## Relaterade sidor

- [Caddy anpassad domänproxy](../deployment/caddy-proxy): själva kantmaskinen. Installation från grunden, WinSW-tjänsten, synkroniseringsuppgiften för mappningen och driftsfallgropar
- [Webbplatsbyggaren](./website-builder): sid-, sektions- och elementträdet, renderare, blogg, SEO och AI-generering (det som renderas när en förfrågan har matchats mot en kyrka och webbplats)
- [Innehållsendpoints](../api/endpoints/content): REST-ytan för sidor, block, länkar och globala stilar, som alla nu är medvetna om `?siteId=`
- [B1App](../web-apps/b1-app): Next.js-appen som innehåller middleware och `[sdSlug]`-routingen
- [Driftsättning av webbappar](../deployment/web-apps): hur B1App driftsätts på Vercel
