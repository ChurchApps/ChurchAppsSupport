---
title: "Architectuur van de websitebouwer"
description: "Ontwikkelaarsoverzicht van de B1-websitebouwer: contentboom, gedeelde elementcatalogus, renderpijplijn en AI-paginagenerinin B1 Admin en B1.church."
---

# Architectuur van de websitebouwer

<div class="article-intro">

Elke kerkwebsite die door B1App wordt aangeboden, wordt weergegeven vanuit een inhoudsboom: pagina's, secties en elementen, opgeslagen in de ContentApi en visueel bewerkt in B1Admin. Eén gedeelde componentenbibliotheek rendert zowel de voorvertoning in de editor als de live site. Eén catalogus van elementtypen bepaalt wat op een pagina kan verschijnen, en een afzonderlijke AI-service kan die boom genereren of herschrijven. Deze pagina beschrijft de hele stack: het elementcontract in `@churchapps/helpers`, de renderpijplijn, elementen met kerkgegevens, widgets voor de hele site, de bloglaag, pagina's met toegangsbeperking, SEO, AI-generatie en conversatieformulieren.

</div>

## Overzicht

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Drie regels gelden voor de hele stack:

1. **Eén boom, twee renderers.** Een pagina is een boom van `pages → sections → elements` waarin elk knooppunt zijn instellingen opslaat als een `answers`-JSON-blob. Dezelfde apphelper-componenten renderen de drag-and-drop-editor in B1Admin en de server-gerenderde publieke site in B1App. Er is geen apart "publicatieformaat".
2. **Het contract leeft in `@churchapps/helpers`.** `ElementTypes.ts` is de enige catalogus van elementtypen. Renderers worden opgelost via een register in apphelper en bewerkingsformulieren staan in B1Admin. Een elementtype toevoegen betekent dat je alle drie aanpast, in die volgorde.
3. **De publieke site leest anonieme endpoints.** Alles wat B1App nodig heeft (de paginaboom, instellingen, blogberichten, redirects en de endpoints met kerkgegevens in andere modules) is openbaar. Authenticatie is optioneel: een JWT op het anonieme boom-endpoint ontgrendelt pagina's voor alleen leden, en verder verandert er niets.

## De inhoudsboom

De contentmodule (`Api/src/modules/content`) beheert de gegevens van de bouwer:

| Tabel | Rol |
|-------|-----|
| `pages` | Eén pagina per URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (toegangsbeperking) en `metaDescription` (SEO) |
| `sections` | Horizontale banden op een pagina (of in een blok): achtergrond, tekstkleur en een `answersJSON` met de opmaak plus de configuraties `dividerTop`/`dividerBottom` voor de vormscheiders |
| `elements` | Inhoudsonderdelen binnen een sectie: `elementType` + `answersJSON`, en nestbaar voor layouttypen (rij/kolom, carrousel) |
| `blocks` | Herbruikbare groepen van secties of elementen (voettekstblokken, elementblokken) die over pagina's heen worden gedeeld |
| `posts` | Losse blogberichten (zie [Blog](#blog)) |
| `redirects` | Per kerk een paar `fromPath → toPath`, maximaal 200 (zie [SEO](#seo-and-discoverability)) |
| `settings` | Sleutel-waardeparen met kerkinstellingen. Rijen met de vlag `public` worden anoniem geleverd en bevatten de configuratie van widgets en analytics |

De volledige boom voor één URL komt terug uit één anoniem aanroep: `GET /content/pages/:churchId/tree?url=/about`. Daaruit rendert B1App de server-side pagina. Verzoeken uit de editor halen in plaats daarvan op id op en behouden de interne id's.

## Het elementcontract

### De catalogus (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definieert elk elementtype als een `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` en een `answersSchema` in de stijl van JSON Schema voor de antwoorden. `validateElementAnswers()` is bewust toegeeflijk: onbekende typen en extra sleutels worden geaccepteerd, zodat oude inhoud niet breekt bij een upgrade van de catalogus. **Er worden momenteel 35 typen meegeleverd:**

| Categorie | Elementtypen |
|-----------|--------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| inhoud (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| kerk (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| geavanceerd (2) | rawHTML, iframe |

Het element `sermons` is het meest configureerbare van de kerktypen. Met het antwoord `layout` kies je `browse` (de oude volledige browser), `grid`, `list` of `featuredLatest`. De antwoorden `playlistId`, `itemCount`, `showTitles` en `showDates` verfijnen de layouts die niet `browse` zijn.

Het element `rawHTML` heeft twee antwoorden: `rawHTML` (opmaak) en `javascript`. Scripts die via `innerHTML` worden ingevoegd, worden nooit uitgevoerd. Daarom maakt `RawHTMLElement` elk `<script>`-knooppunt in de opmaak opnieuw aan als nieuw element. Deze niet-parser-ingevoegde knooppunten worden vertrouwd onder de `strict-dynamic` van de CSP. Een antwoord `javascript` dat begint met `<` (een fragment van een leverancier dat met zijn `<script>`-tags is geplakt) wordt als opmaak geparseerd en krijgt dezelfde behandeling. Anders wordt het uitgevoerd als een gewoon inline script. B1Admin markeert een kale URL in het JavaScript-vak, omdat een losse URL als een script zonder effect wordt uitgevoerd. Het element `map` rendert niets en laadt geen Google Maps-script wanneer er geen Maps API-sleutel is geconfigureerd.

### Renderers (`@churchapps/apphelper`)

Renderers staan in `Packages/apphelper/src/website/components/elementTypes/`, met één component per type. Ze worden opgelost via `ElementRegistry.ts`, een kaart met twee lagen. `Element.tsx` registreert de standaardrenderer voor alle 35 typen (`registerDefaultElementRenderer`). Een hostapp kan elk ervan tijdens runtime overschrijven (`registerElementRenderer`) zonder het pakket te forken.

### Bewerkingsformulieren (B1Admin)

De instellingenformulieren per type in de editor staan in `B1Admin/src/site/admin/elements/`. `ElementEdit.tsx` stuurt door naar een eigen component (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) of naar een inline veldbouwer per type. De AI-variant van deze catalogus is de MCP-tool `describe_page_builder` van de API (zie [MCP Server](../api/mcp.md)).

De voorvertoning in de editor gebruikt hetzelfde `Theme` als de live site. Dat stelt de CSS-variabelen `--headingFont` en `--bodyFont` in op basis van de globale stijlen van de kerk. B1App past die variabelen toe via `pages.css`, wat B1Admin niet kan importeren. Daarom injecteert `ContentEditor.tsx` `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) om ze toe te passen op de broodtekst van `.page` en op `h1`–`h6`. Zonder dit toonde de voorvertoning koppen in het lettertype van de beheerder.

### Scheiders met vormen voor secties

Secties kunnen aan beide randen decoratieve vormscheiders hebben. De configuratie staat in de `answersJSON` van de sectie als de objecten `dividerTop` / `dividerBottom`: `{ shape, color, height, flip }`, waarbij `shape` een van `wave, waves, slant, curve, triangle, peaks` is. Apphelper levert het component `SectionDivider` en de helper `parseDividerConfig()`. De Section-renderers van beide apps (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) lezen de antwoorden en plaatsen de scheider. `SectionEdit.tsx` in B1Admin biedt de keuzeknoppen. De pakketten leveren alleen het bouwblok. De koppeling op sectieniveau is de taak van de apps die ze gebruiken.

## Elementen met kerkgegevens

Drie elementtypen tonen live kerkgegevens in plaats van zelf geschreven inhoud. De isolatie van modules blijft gelden: elk van hen roept het eigen publieke endpoint van de bijbehorende module rechtstreeks vanuit de browser aan.

| Element | Endpoint | Opmerkingen |
|---------|----------|-------------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Geeft `{ fundId, totalAmount, donationCount }` terug, optioneel binnen het venster `?startDate=&endDate=`. Het element vergelijkt dit met zijn antwoord `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Alleen opt-in**: de groep moet `publicRoster` ingesteld hebben (standaard uit). De projectie is bewust minimaal: `personId`, `displayName`, `leader`, foto. Er zijn geen contact- of demografische velden |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Geeft de boom campus → dienst → tijd terug. De apphelper-renderer maakt er op basis van best effort schema.org `Event` JSON-LD van (de API levert gewone data) |

:::warning
`publicRoster` is de privacygrens voor `staffGrid`. Verruim de openbare projectie van groepsleden nooit en omzeil de vlag nooit. Het roster-endpoint is ontworpen om anoniem te zijn, en de minimale veldlijst is de veiligheidseigenschap.
:::

### Agenda-element en evenementpagina's

De antwoorden van het element `calendar` zijn `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, de standaard, of `upcoming`) en `tag`. B1App overschrijft de apphelper-renderer in `src/components/Element.tsx` met `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** rendert `UpcomingEventsElement` van B1App. Dit laadt `GET /content/events/public/group/:churchId/:groupId` of `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, breidt herhalingen uit met `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, één voorkomen per evenement binnen een jaar) en toont de eerste 12 als fototegels (`events.photoUrl`, en anders de titel op de donkere kleur van het thema). Die tegels linken naar `/events/{id}`. Er is ook een menu Abonneren voor de ICS-feed van de agenda.
- **`display: "month"`** rendert `CalendarElement` van apphelper met een callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigeren dan bij een klik naar die URL, in plaats van het detailvenster te openen. B1Admin geeft geen `eventUrl` door, dus de agenda in de beheerder behoudt zijn venster.
- **`tag`** filtert beide weergaven met `EventHelper.hasTag()` (`@churchapps/helpers`). Dat is een vergelijking zonder hoofdlettergevoeligheid met de door komma's gescheiden `events.tags`. Een lege waarde toont alles. De join van de gecureerde agenda selecteert `e.tags`, zodat gecureerde evenementen die ook hebben.

Gecureerde evenementen linken via `realEventId` (`eventPageId()`), dus de URL verwijst altijd naar het onderliggende evenement. `/{sdSlug}/events/[eventId]` is een eigen route (niet de builderpijplijn). Die laadt `GET /content/events/public/:churchId/:id`. Dat endpoint geeft `null` terug voor evenementen die in behandeling of afgewezen zijn, en voor privé-evenementen zonder registratie. Het voegt `roomNames` toe uit niet-afgewezen zaalreserveringen. De route rendert `EventPageContent` met een fotobanner, een beschrijving in markdown, een zijbalk Wanneer/Waar, **Registreer voor dit evenement** wanneer `registrationEnabled` aan staat, en een link **Voeg toe aan mijn agenda** naar `GET /content/events/public/:churchId/:id/ical`. De foto wordt gebruikt als Open Graph-afbeelding, en `EventPageJsonLd` zendt `Event` JSON-LD uit voor het volgende voorkomen. Een onbekend of verborgen evenement geeft een echte 404.

## Widgets voor de hele site

Twee widgets worden op elke publieke pagina weergegeven, buiten de boom om: **AnnouncementBanner** (een wegklikbare balk bovenaan de pagina) en **Launcher** (een zwevende actieknop voor links zoals geven, bezoeken of kijken). Beide componenten en hun helpers `parse*Config()` worden meegeleverd in apphelper. De configuratie bestaat uit twee openbare instellingenrijen met de sleutels `announcementBanner` en `launcher`. B1Admin's `SiteWidgetsEdit` (op de pagina Uiterlijk) schrijft ze weg. De publieke layout van B1App leest ze via `GET /content/settings/public/:churchId`. De API behandelt ze als ondoorzichtige sleutel-waardeparen. De sleutelnamen zijn een afspraak tussen de twee apps.

## Blog

De blog is een zelfstandig contenttype en geen laag bovenop pagina's van de bouwer. Een rij in `posts` bevat het hele bericht: `title`, `slug`, `excerpt`, `content` (de hoofdtekst in markdown), `authorId`, `photoUrl`, `publishDate`, `category` en `tags`. Het publieke oppervlak bestaat uit deze routes (alle anoniem, `PostController`):

| Route | Doel |
|-------|------|
| `GET /content/posts/public/:churchId` | Gepubliceerde berichten, filterbaar met `?category=&tag=` en gepagineerd |
| `GET /content/posts/public/:churchId/categories` | Verschillende categorieën van gepubliceerde berichten |
| `GET /content/posts/public/:churchId/slug/:slug` | Eén gepubliceerd bericht |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0-feed, met de kerknaam als titel en per item de categorie en de beschrijving (samenvatting of, als die ontbreekt, de inhoud) |

Een bericht is "gepubliceerd" zodra `publishDate` is ingesteld en in het verleden ligt. Een `publishDate` in de toekomst maakt het een gepland bericht: het is openbaar verborgen en in de beheerder zichtbaar met een chip Gepland. De leeseindpunten verrijken elk bericht met `authorName`, dat via de membership-modulegateway wordt opgezocht vanaf `authorId`. Ontbrekende samenvattingen vallen terug op de inhoud zonder markdown (ongeveer 160 tekens) in overzichtskaarten, metabeschrijvingen en RSS. B1App serveert `/{sdSlug}/blog`, een redactionele lijst. De kop staat gecentreerd en wordt de actieve categorie- of tagnaam wanneer er gefilterd wordt. Er is een rij met categoriechips als filter en berichtrijen met een miniatuur links, auteursregels en samenvattingen. De RSS-feed wordt aangekondigd als alternatieve link. Ook serveert B1App `/{sdSlug}/blog/[postSlug]`, een eigen route (niet de Zone/Section-pijplijn). Die heeft een gecentreerde kop (categorie als kicker, titel, auteursregel, accentlijn in de primaire kleur), een hero van 16:9 op de breedte van de container, de markdown-hoofdtekst in een leeskolom van ongeveer 720px, tagchips in de voettekst van het artikel, een strook `"Meer in {category}"` met gerelateerde berichten, en `BlogPosting` JSON-LD met de auteur. Beide pagina's gebruiken uitsluitend thematokens voor hun opmaak, zodat ze het kleurenpalet van elke kerk overnemen. Blog-URL's staan in de sitemap per kerk.

De auteursinterface van B1Admin (**Site → Blog**) bewerkt berichten in een dialoog. Die bevat een markdown-editor met een schakelaar voor voorvertoning, een afbeeldingskiezer uit de galerij met bijsnijding op 16:9, een personenkiezer voor de auteur (standaard de bewerkende gebruiker), autocompletie voor categorieën op basis van bestaande categorieën, validatie van dubbele slugs en een publicatieschakelaar. Gepubliceerde rijen linken naar het live bericht, en de pagina raadt beheerders aan een navigatielink naar `/blog` toe te voegen. Reacties worden aan externe diensten overgelaten. Een kerkbrede publieke instelling `blogFooterHtml` (bewerkt onder **Onder elk bericht** op de pagina Blog, alleen zichtbaar met Instellingen→Bewerken) wordt onder elk bericht weergegeven door `BlogFooterEmbed` van B1App. Die maakt de `<script>`-tags opnieuw aan zodat ze onder `'strict-dynamic'` worden uitgevoerd, en voert ze in volgorde uit: een externe `src` wordt eerst volledig geladen voordat het volgende inline script draait. Dat is nodig omdat leveranciersfragmenten eerst een bibliotheek laden en die daarna aanroepen.

## Pagina's alleen voor leden

`pages.visibility` gebruikt de opsomming van de navigatielinks: `everyone` (standaard), `visitors`, `members`, `staff`, `team` en `groups` (met `groupIds`). Maar het is een **harde toegangspoort** en geen navigatiefilter (`PageVisibilityHelper.canViewPage`). De stroom werkt zo:

1. Het anonieme boom-endpoint controleert de zichtbaarheid bij ophalen op basis van URL. Anonieme bezoekers van een beperkte pagina krijgen `{ restricted: true, visibility }` in plaats van inhoud. De boom lekt dus nooit.
2. Het endpoint honoreert nog steeds een JWT. `CustomAuthProvider` verifieert de header `Authorization` bij *elk* verzoek, ook op anonieme routes. Het ophalen van dezelfde URL door een ingelogd lid verloopt dus normaal.
3. B1App rendert `RestrictedPage` bij een antwoord `restricted`. Het herstelt de sessie uit opgeslagen inloggegevens, haalt de boom opnieuw op met de JWT en toont die. Als er geen sessie is, toont het een inlogpoort met een `returnUrl`.

:::info
De fijnheid van de poort verschilt per niveau. `groups` controleert de `groupIds` in het token tegen de lijst van de pagina en `staff` controleert `membershipStatus`. `members` en `team` laten echter elke geauthenticeerde gebruiker van de kerk door. Behandel `groups` als de strikte optie.
:::

## SEO en vindbaarheid

Dit alles wordt aan de kant van B1App weergegeven op basis van gegevens van ContentApi. De API slaat op, de app zendt uit:

| Onderwerp | Werking |
|-----------|---------|
| Metabeschrijvingen | `pages.metaDescription` (≤300 tekens) gaat via `MetaHelper.getMetaData()` naar de Next.js `Metadata` (description en Open Graph) op elke route die door de bouwer wordt weergegeven. De paginainstellingen van B1Admin bevatten een AI-knop "Genereren" (zie hieronder) |
| Redirects | Rijen `redirects` per kerk, beheerd op `/content/redirects` (`content.edit`, limiet van 200 rijen, genormaliseerde paden). Bij een pad dat anders een 404 zou geven, zoekt de paginaroute van B1App het pad op via `GET /content/redirects/public/:churchId` en geeft een HTTP 308 via `permanentRedirect` van Next. Paden zonder treffer vallen door naar `notFound()` |
| 404 in huisstijl | `not-found.tsx` rendert `BrandedNotFound` met het logo, de naam en het thema van de kerk, in plaats van een generieke fout. Onbekende paden `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` en `/volunteer/[planId]` geven een echte 404. Dat geldt ook voor onbekende subdomeinen en ongeldige paginaslugs (zie [Websiterouting & meerdere sites](./websites.md)) |
| Gestructureerde gegevens | `BlogPosting` JSON-LD op blogberichten. `VideoObject` op de pagina's per preek (`/{sdSlug}/sermons/[sermonId]`) en op pagina's met een element `sermons`. `Event` uit agenda- en evenementelementen op pagina's van de bouwer en op elke pagina `/{sdSlug}/events/[eventId]` (volgende voorkomen, met de evenementfoto als `image`). schema.org `Event` uit het element `serviceTimes` |
| Preekpagina's | Elke openbare preek krijgt een pagina die zoekmachines kunnen indexeren op `/sermons/[sermonId]`, met volledige metadata. Preken zitten niet langer vast in de browser aan de clientzijde |
| Analytics | De openbare instellingssleutel `ga4MeasurementId` (beheerd naast redirects in B1Admin) voegt een gtag van GA4 per kerk in via `next/script`. De B1-app (`/{sdSlug}/mobile`) stuurt ook zijn paginaweergaven naar dat ID, naast de eigen tag van ChurchApps, zolang het een geldig `G-`-ID is (GTM-containerID's blijven beperkt tot de website). Elke `gtag('config')` bevat een `display_mode` met de waarde `installed` of `browser`, op basis van `navigator.standalone` of de mediaquery `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap en feeds | De route `sitemap.xml` per kerk bevat pagina's van de bouwer, blog-URL's en de 50 recentste preekpagina's (met `<lastmod>` uit de publicatiedatum van elke preek). Ook staan de ingebouwde pagina's `/sermons`, `/groups` en `/volunteer` erin wanneer ze inhoud hebben (openbare groepen, aanmeldplannen), tenzij een opgeslagen redirect dat pad vervangt. `/` ontbreekt wanneer de kerk geen startpagina heeft, omdat `/` dan doorverwijst naar het niet-toegestane `/mobile`. De bloglijst kondigt de RSS-feed aan |
| Toegankelijkheid | De publieke omlijsting toont in elke layoutwrapper een skiplink naar het oriëntatiepunt `<main id="main-content">` |

## AI-generatie (AskApi)

Het genereren van pagina's en sites gebeurt in **AskApi**, een aparte service onder de controller `/website`. Die authenticeert met dezelfde `CustomAuthProvider`-JWT als alles andere en is **stateless voor de inhoud**. Elk endpoint geeft JSON terug, en de aanroeper (B1Admin) slaat het resultaat op via ContentApi. `POST /content/pages/importTree` maakt een pagina met de volledige geneste boom van secties en elementen in één aanroep. Die voegt altijd in onder de kerk van de aanroeper en negeert id's in de body.

### Paginagenerering (`planPage` → `writePage`)

De sjabloon "AI" in `AddPageModal` van B1Admin gebruikt een goedkope pijplijn (`AskApi/src/helpers/SiteGenHelper.ts`) die op één regel rust: **geen enkel model produceert JSON van de bouwer**. Twee modellen verdelen het werk via de Vercel AI Gateway (gewoon HTTP, sleutel in SSM op `/{env}/aiGatewayApiKey` of `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) is een getypeerd beslismodel. Het geeft keuzes, scores en booleans met kansen terug, maar kan geen tekst schrijven. Het kiest elke sectie achtereenvolgens uit een vaste sjabloonbibliotheek, scoort layouts, controleert de feiten in de tekst en kiest stockfoto's en iconen. Invoer kost ongeveer $0,04 per miljoen tokens en uitvoer is gratis. Daardoor kosten ongeveer 90 aanroepen per pagina slechts een fractie van een cent.
- **Een klein chatmodel (standaard GPT-4.1 mini)** vult de benoemde tekstvakken met een maximale lengte in de gekozen sjablonen. De schrijver is één constante, die je kunt overschrijven met de omgevingsvariabele `SITEGEN_COPY_MODEL` (elk chatmodel-ID op de gateway, bijvoorbeeld `anthropic/claude-haiku-4.5`). In een blinde vergelijking naast elkaar bij drie kerken las Claude Haiku 4.5 iets warmer. GPT-4.1 mini kwam echter dicht in de buurt, is ongeveer vier keer goedkoper en sneller, en daarom is het de standaard. Een volledige pagina met alle drie de layouts kost ongeveer 1,3 cent, waarvan ongeveer 80% naar de schrijver gaat.

| Fase | Endpoint | Wat er gebeurt |
|------|----------|----------------|
| 1 | `POST /website/planPage` | Classificeert het paginatype (home, bezoek, over ons…) en trekt daarna 10 kandidaat-layouts uit de kansen per ronde van JEV (hero + aantal secties → elke sectie → afsluiter). Duplicaten worden verwijderd. JEV scoort elke kandidaat op pasvorm, verloop en lacunes. Het resultaat zijn de beste 3, een schrijfstem en een `suggestedStyle` (palet + lettertypen). Kandidaten die tot dan toe dezelfde secties delen, stellen JEV dezelfde vraag, dus rondes worden gememoiseerd op basis van het voorvoegsel. Een beste score lager dan 6 wordt gelogd als `lowLayoutScore`. Die log is de achterstand van sjablonen die het waard zijn om toe te voegen. ~2s |
| 2 | `POST /website/writePage` (één aanroep per kandidaat) | De schrijver vult de tekst van de vakken, twee secties per aanroep en parallel, en geeft vijf koppen voor de hero terug waartussen JEV kiest. JEV controleert de feiten van elke sectie. Secties die falen, een standaardzin gebruiken of een eerdere sectie herhalen (gedeelde reeksen van 4 woorden, in code gecontroleerd), worden parallel herschreven met de specifieke reden. Een codecontrole haalt zinnen met standaardzinnen van kerksites weg, tenzij de eigen beschrijving van de kerk die gebruikt. JEV kiest de onderwerpen van de foto's, de iconen en de vormscheider van de hero, en scoort het resultaat. Er komt een kant-en-klare sectieboom terug om op te slaan, met een score. ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin schrijft alleen de best gerangschikte layout (de nummer twee is een reserve als die schrijfactie mislukt), slaat hem op en opent de voorvertoning (~10s na Opslaan) |

Elke fase is een eigen verzoek, zodat elke aanroep binnen de limiet van 29 seconden van API Gateway blijft. Sjablonen in `SiteGenHelper.buildTree` zijn vaste bomen van secties en elementen uit de catalogus (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`). Ze verwijzen naar thematokens (`var(--accent)`, `var(--lightAccent)`…), zodat gegenereerde pagina's de bestaande uiterlijkinstellingen van de kerk overnemen. Een sectiesjabloon toevoegen betekent de lijst van vakken toevoegen aan `SECTIONS` en de boom toevoegen aan `buildTree`. De unittest doorloopt elk sjabloon en valideert de boom.

**Invoer.** Tekst mag alleen feiten vermelden uit twee bronnen: wat de gebruiker heeft getypt, en `churchContext.facts`. Dat zijn gegevens die B1Admin verzamelt vóór het plannen: openbare dienstijden en openbare groepsnamen, plus de naam en het adres van de kerk. Dezelfde vlaggen bepalen welke sjablonen met gegevens worden aangeboden. `times` toont het live element `serviceTimes` wanneer de kerk haar dienstijden in B1 bijhoudt (anders een getypte tabel). `groups` en `countdown` worden alleen aangeboden wanneer er gegevens achter zitten. JEV-aanroepen zijn afgeschermd: een duplicaat wordt na 1,5 seconde verstuurd en het eerste antwoord wint. Dat is nodig omdat de gateway soms stokt, terwijl de aanroepen vrijwel gratis zijn.

**Bij het onderwerp blijven.** De prompt van de gebruiker is het *onderwerp van de pagina*, niet achtergrond over de kerk. `planPage` classificeert het verzoek als `home`, `visit`, `about`, `ministries`, `give`, `contact`, `event` of `topic`. Voor pagina's van het type `event` en `topic` worden de algemene kerksjablonen (pastorale notitie, preken, bedieningen, groepen, impact in de gemeenschap, weekelijkse tijden en aftelling, video-hero) niet eens aangeboden. Wel komen `details` (wanneer / waar / wat meenemen) en een datumgebonden `eventCountdown` beschikbaar. Beide beoordelaars scoren of het antwoord bij het onderwerp past. B1Admin geeft het `pageType` uit het plan mee aan elke aanroep van `writePage`.

**Volledige pagina's uit korte verzoeken.** Pagina's hebben drie tot zes middelste secties, royale lengtes voor de vakken, een inleidende regel bij kaartsecties en een FAQ van vijf vragen. De herstelstap breidt elke sectie uit die dun terugkomt. Genereren gebeurt met één klik: er zijn geen vervolgvragen. Als het verzoek een gewone detail weglaat die een volledige pagina nodig heeft (een begintijd, een ruimte, wat meenemen, hoe je je aanmeldt), vult de schrijver dat aan met een plausibele, bescheiden keuze die de kerk kan bewerken. Omdat secties parallel worden geschreven, worden die gaten **één keer** beslist, in `planPage` (`assumedDetails`, een kleine schrijfaanroep die naast het samenstellen van layouts loopt). Die beslissingen gaan via `churchContext.assumedDetails` terug naar elke aanroep van `writePage`. Zo kan de ene sectie niet 5:00 zeggen terwijl een andere 5:30 zegt. JEV repareert elke sectie die tegenspreekt wat er gevraagd is, de gegevens van de kerk of die beslissingen. De beslissingen worden niet in de interface getoond. De kerk beoordeelt en bewerkt de pagina zoals elke andere. Sommige dingen worden nooit verzonnen: namen van personen, telefoonnummers, e-mail- en webadressen, prijzen, statistieken, de geschiedenis van de kerk, citaten die aan personen worden toegeschreven, en een dag van de week voor een datum waarvoor het verzoek er geen gaf.

**Beeldmateriaal.** Sjablonen noemen nooit hun foto's of iconen. Ze laten vakken open, en één generieke stap (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) loopt de afgewerkte boom na en vult elk vak in. Dat zijn een achtergrond van een sectie of een galerij-invoer met de markering `auto:photo`, een `auto:icon`, de `auto:divider` van de hero, en, zonder enige markering, elk element `textWithPhoto`, `card` of `image` waarvan `photo` leeg is. JEV kiest elk onderwerp op basis van de tekst ernaast: de foto van een kaart op basis van de titel en tekst van die kaart, een achtergrond op basis van de tekst van de sectie. Een onderwerp wordt niet twee keer op dezelfde pagina gebruikt. Een nieuw sjabloon krijgt daardoor foto's zonder extra werk. Foto's zijn zoektermen van Pexels, uitgestuurd als tijdelijke aanduidingen `pexels:<term>` die B1Admin oplost via `POST /content/stock/search`. Een client die `resolvesPhotos` niet meestuurt, krijgt in plaats daarvan een ingebouwde heldafbeelding, egale gekleurde banden en kaarten zonder foto. Portretonderwerpen zijn bewust uitgesloten, en het pastorale sjabloon bevat geen foto: een stockvreemdeling mag nooit een echt persoon vervangen. Voor een kerk zonder pagina's past B1Admin `suggestedStyle` toe op de globale stijlen. Bestaande sites behouden hun uiterlijk.

### Overige endpoints

:::info
De herschrijfknop `SectionToolbar` en de knop "Site genereren" in de paginalijst van B1Admin blijven aan de clientzijde uitgecommentarieerd. De AskApi-endpoints hieronder werken nog steeds. Alleen die interface is verborgen.
:::

| Endpoint | Doel |
|----------|------|
| `POST /website/generatePageOutline` → `generateSection` | De oorspronkelijke tweestapsstroom voor pagina's (overzicht, daarna één LLM-aanroep per sectie die JSON van elementen uitstuurt). Vervangen in B1Admin door `planPage`/`writePage` vanwege de kosten. Bewaard voor gebruikers van de API |
| `POST /website/generateSite` | Generatie van de hele site. **Bewust in twee fasen**: een aanroep met `planOnly: true` geeft alleen het plan voor meerdere pagina's terug (één snelle modelaanroep). Daarna vraagt de client de volledige inhoud op. Zo blijft elk verzoek binnen de time-out van Lambda/API Gateway |
| `POST /website/rewriteSection` | Herschrijven met behoud van de structuur: het model mag alleen antwoorden met tekst wijzigen. Een recursieve structuursignatuur (id's, typen en volgorde) wordt voor en na vergeleken. Bij elke afwijking wordt de oorspronkelijke sectie teruggegeven met `fallback: true`, in plaats van een beschadigde structuur |
| `POST /website/generateAltText` | Visuele aanroep over maximaal 20 afbeeldings-URL's. Geeft beknopte alternatieve tekst terug (≤125 tekens, voorvoegsels als "photo of" verwijderd) |
| `POST /website/generateMetaDescription` | Eén SEO-metabeschrijving (≤155 tekens) op basis van de tekstinhoud van de pagina. Gekoppeld aan de knop Genereren in de paginainstellingen van B1Admin |

De prompts voor deze endpoints zijn markdownbestanden onder `AskApi/config/instructions/`. Daarbij hoort ook de elementcatalogus waaruit het model genereert. Twee ontwerpkeuzes houden die catalogus eerlijk. De client stuurt bij elk verzoek `availableElementTypes` mee. De prompt mag alleen typen uit die lijst gebruiken. De server bevat de volledige set nooit hardcoded. En de MCP-tool `describe_page_builder` van de API bevat dezelfde gids voor AI-agents die via [MCP](../api/mcp.md) werken. De modellen zijn Anthropic Claude via OpenRouter: 3.5 Haiku voor de inhoud van secties (latentie) en 3.5 Sonnet voor overzichten, sitemplannen en beeldanalyse. Er is een terugvalmodel van OpenAI wanneer er geen OpenRouter-sleutel is geconfigureerd.

## Conversatieformulieren

Formulieren (module membership) hebben een conversatiemodus gekregen, gericht op pagina's in de stijl van een connect card. Vier kolommen in `forms` sturen die modus aan: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject` en `followUpBody`.

- **Weergave**: `FormSubmissionEdit` van apphelper schakelt over naar het component `ConversationalForm` (één vraag tegelijk) wanneer `displayMode` op `conversational` staat. De formulierpagina van B1App geeft de modus door. De inzending heeft in beide gevallen dezelfde payload.
- **Persoon automatisch aanmaken**: bij een inzending met `autoCreatePerson` ingesteld, zoekt `ConversationalFormHelper.findOrCreatePerson` op e-mail (zonder hoofdlettergevoeligheid). Wordt er niets gevonden, dan maakt het een huishouden en een persoon met `membershipStatus: "Guest"` aan, en koppelt het de inzending aan die persoon.
- **Vervolg-e-mail**: wanneer een onderwerp en een tekst zijn ingesteld, krijgt de indiener een e-mail op basis van een sjabloon (met de tokens `{firstName}` / `{churchName}`) via het bestaande transactionele pad (`TransactionalEmailHelper`). Het gaat nooit via de digest van meldingen. Beide neveneffecten zijn niet-fataal: een fout laat de inzending nooit verloren gaan.

De vier velden worden nu via de API ingesteld. De formuliereditor van B1Admin toont ze nog niet.

## Cache van de publieke site

Het renderpad van de publieke site van B1App cachet ophaalacties die met de kerk zijn getagd (`next: { revalidate: 300, tags: [sdSlug] }` in productie, `0` in ontwikkeling). Daardoor kan een live pagina tot vijf minuten verouderd blijven na een schrijfactie in ContentApi. `POST /api/revalidate/{sdSlug}` op B1App roept `revalidateTag(sdSlug)` aan en is de enige manier om die cache eerder te legen.

Twee schrijvers gebruiken deze cache:

1. **B1Admin**: `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` stuurt een POST na het opslaan in de editor. Het geeft de voorkeur aan het subdomein van de actieve site. Een secundaire site moet *die* tag legen, niet de standaard van de kerk.
2. **Api**: wijzigingen aan inhoud die niet via B1Admin lopen (API-sleutels, MCP, AI) roepen `SiteCacheHelper.bump(churchId)` aan vanuit de contentcontrollers. De helper bepaalt het subdomein van de kerk via `SubDomainHelper` en stuurt een POST naar `{b1AppRoot}/api/revalidate/{sd}`. Fouten worden genegeerd, zodat een onbereikbare B1App nooit een opslaan laat mislukken.

De controllers die `bump` aanroepen: pagina's (opslaan, verwijderen, dupliceren, publiceren, weggooien, depubliceren, AI-tijdelijk), secties, elementen, blokken, links, globale stijlen, berichten en redirects. De ontwikkel-`b1AppRoot` is `http://{subdomain}.localtest.me:3301`. Demo en productie gebruiken `https://{subdomain}.b1.church`.

## Gerelateerde pagina's

- [Websiterouting & meerdere sites](./websites.md): hoe een verzoek wordt omgezet naar een kerk/site en hoe eigen domeinen worden doorgestuurd
- [Content-endpoints](../api/endpoints/content.md): de volledige REST-interface voor pagina's, secties, elementen, blokken, berichten, redirects en instellingen
- [AppHelper](../shared-libraries/app-helper.md): het npm-pakket dat de renderers, het register, de scheiders en de widgets levert
- [MCP Server](../api/mcp.md): inclusief de gids-tool `describe_page_builder`
- [Paginaeditor (eindgebruiker)](/docs/b1-admin/website/page-editor): de documentatie van de editor voor medewerkers
