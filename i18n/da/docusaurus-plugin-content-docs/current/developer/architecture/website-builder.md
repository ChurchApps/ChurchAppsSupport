---
title: "Arkitektur for hjemmesidebyggeren"
---

# Arkitektur for hjemmesidebyggeren

<div class="article-intro">

Hver kirkehjemmeside, der leveres af B1App, gengives fra et indholdstræ, som består af sider, sektioner og elementer. Træet er gemt i ContentApi og redigeres visuelt i B1Admin. Ét fælles komponentbibliotek gengiver både redigeringsforhåndsvisningen og den live side, en katalog over elementtyper definerer, hvad der kan vises på en side, og en separat AI-tjeneste kan generere eller omskrive træet. Denne side gennemgår hele stakken: elementkontrakten i `@churchapps/helpers`, gengivelsespipelinen, kirkedata-elementer, widgets på hele siden, blog-laget, adgangsstyrede sider, SEO, AI-generering og samtalebaserede formularer.

</div>

## Oversigt

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        fælles gengivelsespipeline               ▼            (anon, JWT honored)
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

Tre regler gælder på tværs af stakken:

1. **Ét træ, to renderere.** En side er et træ af `pages → sections → elements`, hvor hver node bærer sine indstillinger som en `answers`-JSON-blob. De samme apphelper-komponenter gengiver det træk-og-slip-baserede redigeringsværktøj i B1Admin og den serverrenderede offentlige side i B1App. Der findes intet separat "publiceringsformat".
2. **Kontrakten findes i `@churchapps/helpers`.** `ElementTypes.ts` er den eneste katalog over elementtyper. Renderere slås op gennem et register i apphelper, og redigeringsformularer findes i B1Admin. Tilføjelse af en elementtype kræver ændringer i alle tre, i denne rækkefølge.
3. **Den offentlige side læser anonyme endpoints.** Alt, B1App har brug for, er offentligt: sidetræet, indstillinger, blogindlæg, omdirigeringer og kirkedata-endpoints i andre moduler. Login er valgfrit. Et JWT på det anonyme træ-endpoint åbner sider kun for medlemmer, men intet andet ændrer sig.

## Indholdstræet

Indholdsmodulet (`Api/src/modules/content`) ejer byggerens data:

| Tabel | Rolle |
|-------|-------|
| `pages` | Én side pr. URL: `url`, `title`, `layout` samt `visibility`/`groupIds` (adgangsstyring) og `metaDescription` (SEO) |
| `sections` | Vandrette bånd på en side (eller i en blok): baggrund, tekstfarve og en `answersJSON`, der bærer styling samt konfigurationerne `dividerTop`/`dividerBottom` for formdelere |
| `elements` | Indholdsdele i en sektion: `elementType` + `answersJSON`, kan indlejres for layouttyper (række/kolonne, karrusel) |
| `blocks` | Genbrugelige grupper af sektioner/elementer (sidefodsblokke, elementblokke), der deles på tværs af sider |
| `posts` | Selvstændige blogindlæg (se [Blog](#blog)) |
| `redirects` | Kirkespecifikke par `fromPath → toPath`, begrænset til 200 (se [SEO](#seo-and-discoverability)) |
| `settings` | Nøgle-værdi-indstillinger for kirken. Rækker markeret `public` serveres anonymt og indeholder widget- og analysekonfigurationen |

Hele træet for én URL hentes i ét anonymt kald: `GET /content/pages/:churchId/tree?url=/about`. Det er dette, B1App server-renderer ud fra. Redigeringsanmodninger henter i stedet efter id og beholder interne id'er.

## Elementkontrakten

### Katalogen (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definerer hver elementtype som en `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` og en `answersSchema` i JSON-schema-stil for dens svar. `validateElementAnswers()` er bevidst tolerant. Ukendte typer og ekstra nøgler slipper igennem, så ældre indhold aldrig går i stykker ved en opgradering af kataloget. **35 typer leveres i dag:**

| Kategori | Elementtyper |
|----------|--------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons`-elementet er det mest konfigurerbare af kirketyperne. Et `layout`-svar vælger `browse` (den gamle fulde browser), `grid`, `list` eller `featuredLatest`, og `playlistId`, `itemCount`, `showTitles` og `showDates` finjusterer de layouts, der ikke er `browse`.

`rawHTML`-elementet har to svar: `rawHTML` (markup) og `javascript`. Scripts indsat via `innerHTML` køres aldrig, så `RawHTMLElement` genskaber hver `<script>`-node i markup som et nyt element. Disse noder, der ikke er indsat af parseren, er tillid til under CSP'ens `strict-dynamic`. Et `javascript`-svar, der starter med `<` (et leverandørudsnit indsat med sine `<script>`-tags), parses som markup og behandles på samme måde. Ellers køres det som et almindeligt inline-script. B1Admin markerer en blot URL i JavaScript-feltet, fordi en enkelt URL kører som et script uden effekt. `map`-elementet gengiver intet og indlæser ikke noget Google Maps-script, når der ikke er konfigureret en Maps API-nøgle.

### Renderere (`@churchapps/apphelper`)

Renderere ligger i `Packages/apphelper/src/website/components/elementTypes/`, én komponent pr. type, og de slås op via `ElementRegistry.ts`. Det er et kort i to lag: `Element.tsx` registrerer standardrendereren for alle 35 typer (`registerDefaultElementRenderer`), og en værtsapp kan overskrive enhver af dem under kørsel (`registerElementRenderer`) uden at forke pakken.

### Redigeringsformularer (B1Admin)

Editorens indstillingsformularer pr. type ligger i `B1Admin/src/site/admin/elements/`. `ElementEdit.tsx` sender videre til en dedikeret komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` …) eller til en inline feltbygger for hver type. Den AI-vendte spejling af kataloget er API'ens MCP-værktøj `describe_page_builder` (se [MCP Server](../api/mcp)).

Editorens forhåndsvisning monterer det samme `Theme` som den live side. Det sætter CSS-variablerne `--headingFont` / `--bodyFont` ud fra kirkens globale stilarter. B1App anvender disse variabler via `pages.css`, som B1Admin ikke kan importere. Derfor injicerer `ContentEditor.tsx` `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) for at anvende dem på brødteksten i `.page` samt `h1`–`h6`. Uden den viste forhåndsvisningen overskrifter i admin-skrifttypen.

### Sektionsformdelere

Sektioner kan have dekorative formdelere på begge kanter. Konfigurationen ligger i sektionens `answersJSON` som objekterne `dividerTop` / `dividerBottom`: `{ shape, color, height, flip }`, hvor `shape` er en af `wave, waves, slant, curve, triangle, peaks`. Apphelper leverer komponenten `SectionDivider` og hjælpefunktionen `parseDividerConfig()`. Begge apps' sektionsrenderere (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) læser svarene og monterer formdeleren, og `SectionEdit.tsx` i B1Admin leverer vælgerens brugerflade. Pakkerne leverer kun byggeklodsen. Den sektionsniveau-forbindelse er de forbrugende apps' ansvar.

## Kirkedata-elementer

Tre elementtyper viser levende kirkedata i stedet for skrevet indhold. Modulisolering gælder stadig. Hver af dem kalder det ejende moduls egne offentlige endpoint direkte fra browseren:

| Element | Endpoint | Noter |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerer `{ fundId, totalAmount, donationCount }` med et valgfrit `?startDate=&endDate=`-vindue. Elementet sammenligner det med sit `goalAmount`-svar |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Kun opt-in**: gruppen skal have `publicRoster` sat (standard er fra). Projektionen er bevidst minimal: `personId`, `displayName`, `leader`, foto. Ingen kontakt- eller demografiske felter |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerer træet campus → gudstjeneste → tidspunkt. Apphelper-rendereren udsender ud fra det schema.org `Event` JSON-LD efter bedste evne (API'et returnerer rene data) |

:::warning
`publicRoster` er privatlivsporten for `staffGrid`. Udvid aldrig den offentlige projektion af gruppemedlemmer, og omgå aldrig flaget. Roster-endpointet er bevidst anonymt, og den minimale feltliste er sikkerhedsegenskaben.
:::

### Kalenderelementet og begivenhedssider

`calendar`-elementets svar er `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, standard, eller `upcoming`) og `tag`. B1App overskriver apphelper-rendereren i `src/components/Element.tsx` med `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** gengiver B1Apps `UpcomingEventsElement`. Den henter `GET /content/events/public/group/:churchId/:groupId` eller `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, udvider gentagelser med `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, én forekomst pr. begivenhed inden for et år) og viser de første 12 som fototiles (`events.photoUrl`, og ellers titlen på temaets mørke farve). Hver tile linker til `/events/{id}`, og der er en Abonnér-menu til kalenderens ICS-feed.
- **`display: "month"`** gengiver apphelpers `CalendarElement` med en `eventUrl`-callback. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigerer derefter til den URL ved klik i stedet for at åbne detaljedialogen. B1Admin sender ingen `eventUrl`, så admin-kalenderen beholder sin dialog.
- **`tag`** filtrerer begge visninger med `EventHelper.hasTag()` (`@churchapps/helpers`). Det er en matchning uden hensyn til store og små bogstaver mod den kommaseparerede `events.tags`. Tomt betyder, at alt vises. Sammenføjningen til kuraterede kalendere vælger `e.tags`, så kuraterede begivenheder har dem med.

Kuraterede begivenheder linker via `realEventId` (`eventPageId()`), så URL'en altid peger på den underliggende begivenhed. `/{sdSlug}/events/[eventId]` er en dedikeret rute (ikke builder-pipelinen). Den henter `GET /content/events/public/:churchId/:id`, som returnerer `null` for begivenheder under behandling eller afvist, og for private begivenheder uden tilmelding. Den tilføjer `roomNames` fra lokalebookinger, der ikke er afviste. Siden gengiver `EventPageContent` (fotohero, markdown-beskrivelse, When/Where-sidepanel, **Register for this Event**, når `registrationEnabled` er sat, og linket **Add to my calendar** til `GET /content/events/public/:churchId/:id/ical`). Den bruger fotoet som Open Graph-billede og udsender `Event` JSON-LD for den næste forekomst via `EventPageJsonLd`. En ukendt eller skjult begivenhed giver et rigtigt 404.

## Widgets på hele siden

To widgets vises på hver offentlig side i stedet for inde i træet: **AnnouncementBanner** (en lukbar bjælke øverst på siden) og **Launcher** (en svævende handlingshub til links i stil med give/visit/watch). Begge komponenter og deres `parse*Config()`-hjælpefunktioner leveres i apphelper. Konfigurationen består af to offentlige indstillingsrækker med nøglerne `announcementBanner` og `launcher`. De skrives af B1Admins `SiteWidgetsEdit` (på siden Appearance) og læses af B1Apps offentlige layout via `GET /content/settings/public/:churchId`. API'et behandler dem som uigennemsigtige nøgle-værdi-par. Nøglenavnene er en konvention mellem de to apps.

## Blog

Bloggen er en selvstændig indholdstype og ikke et lag oven på builder-sider. En `posts`-række indeholder hele indlægget: `title`, `slug`, `excerpt`, `content` (markdown-brødtekst), `authorId`, `photoUrl`, `publishDate`, `category` og `tags`. Den offentlige flade (alle anonyme, `PostController`):

| Rute | Formål |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publicerede indlæg, filtrerbare med `?category=&tag=`, med paginering |
| `GET /content/posts/public/:churchId/categories` | Forskellige kategorier på tværs af publicerede indlæg |
| `GET /content/posts/public/:churchId/slug/:slug` | Ét publiceret indlæg |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0-feed med kirkens navn som titel, og pr. element en kategori samt en beskrivelse, der er uddraget eller indholdet |

Et indlæg er "publiceret", når `publishDate` er sat og passeret. En fremtidig `publishDate` er et planlagt indlæg. Det skjules offentligt og vises med et Scheduled-mærke i admin. Læse-endpoints beriger hvert indlæg med `authorName`, som slås op fra `authorId` via membership-modulets gateway. Manglende uddrag falder tilbage til markdown-indhold uden formatering (ca. 160 tegn) i listekort, metabeskrivelser og RSS. B1App serverer `/{sdSlug}/blog`, en redaktionel liste (en centreret overskrift, der bliver til det aktive kategori- eller tagnavn ved filtrering, en række kategori-chips, indlægsrækker med miniature til venstre, forfatterangivelse og uddrag). RSS-feedet annonceres som et alternativt link. Der er også `/{sdSlug}/blog/[postSlug]`, en dedikeret rute (ikke Zone/Section-pipelinen), med en centreret overskrift (kategori som kicker, titel, forfatterangivelse og en accentstreg i primærfarven), en 16:9-hero i containerens bredde, markdown-brødteksten i en læsekolonne på ca. 720 px, tag-chips i artiklens fodnote, et stykke `"Flere i {category}"`-relaterede indlæg og `BlogPosting` JSON-LD inklusive forfatteren. Begge sider er udelukkende stylet med temamærker, så de arver hver kirkes farvepalet. Bloggens URL'er medtages i kirkens sitemap. B1Admins forfatterflade (**Site → Blog**) redigerer indlæg i en dialog: markdown-editor med forhåndsvisningsskifte, galleri-billedvælger beskåret til 16:9, forfattervælger (standard er brugeren, der redigerer), kategoriautofuldførelse med de eksisterende kategorier, validering af dubletter i slug og en publiceringskontakt. Publicerede rækker linker ud til det live indlæg, og siden minder admins om at tilføje et `/blog`-navigationslink. Kommentarer overlades til tredjepartstjenester. En kirkebred offentlig indstilling `blogFooterHtml` (redigeres under **Below Every Post** på Blog-siden og vises kun med Settings→Edit) gengives under hvert indlæg af B1Apps `BlogFooterEmbed`. Den genskaber `<script>`-tags, så de kører under `'strict-dynamic'`, og den kører dem i rækkefølge. En ekstern `src` bliver færdigindlæst, før det næste inline-script kører. Det er nødvendigt, fordi leverandørudsnit indlæser et bibliotek og derefter kalder det.

## Sider kun for medlemmer

`pages.visibility` genbruger enum'en fra navigationslinks: `everyone` (standard), `visitors`, `members`, `staff`, `team`, `groups` (med `groupIds`). Men den fungerer som en **hård adgangsport** og ikke som et navfilter (`PageVisibilityHelper.canViewPage`). Forløbet:

1. Det anonyme træ-endpoint tjekker synlighed ved hentninger baseret på URL. Anonyme kald til en låst side får `{ restricted: true, visibility }` i stedet for indhold. Træet lækker aldrig.
2. Endpointet respekterer stadig et JWT. `CustomAuthProvider` verificerer `Authorization`-headeren ved *hver* anmodning, også på anonyme ruter. Et autentificeret medlems hentning af samme URL løses derfor normalt.
3. B1App gengiver `RestrictedPage` ved et `restricted`-svar. Den genopretter sessionen fra gemte legitimationsoplysninger, henter træet igen med JWT'et og gengiver det. Hvis der ikke er nogen session, vises en loginport med en `returnUrl`.

:::info
Gatens granularitet varierer efter niveau. `groups` kontrollerer tokenets `groupIds` mod sidens liste, og `staff` kontrollerer `membershipStatus`. Men `members` og `team` lader i øjeblikket enhver godkendt bruger fra kirken igennem. Behandl `groups` som den strenge mulighed.
:::

## SEO og synlighed

Alt dette er B1App-side gengivelse over ContentApi-data. API'et gemmer, og appen udsender:

| Emne | Sådan virker det |
|---------|--------------|
| Metabeskrivelser | `pages.metaDescription` (≤300 tegn) løber gennem `MetaHelper.getMetaData()` ind i Next.js' `Metadata` (description + Open Graph) på hver rute gengivet af builderen. Sideindstillingerne i B1Admin har en AI-knap "Generate" (se nedenfor) |
| Omdirigeringer | Kirkespecifikke `redirects`-rækker styres på `/content/redirects` (`content.edit`, grænse på 200 rækker, normaliserede stier). Ved en sti, der ville give 404, slår B1Apps siderute stien op mod `GET /content/redirects/public/:churchId` og udsender en HTTP 308 via Next's `permanentRedirect`. Stier uden match går videre til `notFound()` |
| Brandet 404 | `not-found.tsx` gengiver `BrandedNotFound` med kirkens logo, navn og tema i stedet for en generisk fejl. Ukendte stier `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` og `/volunteer/[planId]` giver et rigtigt 404, ligesom ukendte subdomæner og misdannede sidesnegle (se [Website Routing & Multi-Site](./websites)) |
| Strukturerede data | `BlogPosting` JSON-LD på blogindlæg. `VideoObject` på de enkelte prædikensider (`/{sdSlug}/sermons/[sermonId]`) og på sider med et `sermons`-element. `Event` fra kalender-/begivenhedselementer på builder-sider og på hver `/{sdSlug}/events/[eventId]`-side (næste forekomst, med begivenhedens foto som `image`). schema.org `Event` fra `serviceTimes`-elementet |
| Prædikensider | Hver offentlig prædiken får en side, der kan crawles, på `/sermons/[sermonId]` med fulde metadata. Prædikener er ikke længere låst inde i den klientside-browser-element |
| Analyse | Den offentlige indstillingsnøgle `ga4MeasurementId` (styret ved siden af omdirigeringer i B1Admin) indsætter et kirkespecifikt GA4 gtag via `next/script`. B1-appen (`/{sdSlug}/mobile`) sender også sine sidevisninger til det ID sammen med ChurchApps' egen tag, når det er et gyldigt `G-`-ID. GTM-containerID'er forbliver kun til websitet. Hvert `gtag('config')` har en `display_mode` på enten `installed` eller `browser`, baseret på `navigator.standalone` eller medieforespørgslen `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap og feeds | Kirkens `sitemap.xml`-rute medtager builder-sider, blog-URL'er og de 50 seneste prædikensider (med `<lastmod>` fra hver prædikens udgivelsesdato). Den lister også de indbyggede sider `/sermons`, `/groups` og `/volunteer`, når de har indhold (offentlige grupper, tilmeldingsplaner), medmindre en gemt omdirigering erstatter stien. `/` udelades, når kirken ikke har en forside, fordi `/` så omdirigerer til den udelukkede `/mobile`. Blog-oversigten annoncerer RSS-feedet |
| Tilgængelighed | Den offentlige ramme viser et springlink til landmærket `<main id="main-content">` i hver layout-wrapper |

## AI-generering (AskApi)

Side- og sitegenerering kører i **AskApi**, en separat tjeneste under `/website`-controlleren. Den autentificerer med det samme `CustomAuthProvider`-JWT som alt andet og er **tilstandsløs med hensyn til indhold**. Hvert endpoint returnerer JSON, og kalderen (B1Admin) gemmer resultatet via ContentApi. `POST /content/pages/importTree` opretter en side med hele dens indlejrede sektion- og elementtræ i ét kald. Det indsætter altid under kalderens kirke og ignorerer id'er i body'en.

### Sidegenerering (`planPage` → `writePage`)

AI-sideskabelonen i B1Admins `AddPageModal` bruger en billig pipeline (`AskApi/src/helpers/SiteGenHelper.ts`), bygget på én regel: **ingen model udsender builder-JSON**. To modeller deler arbejdet gennem Vercel AI Gateway (almindelig HTTP, SSM-nøglen `/{env}/aiGatewayApiKey` eller `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) er en typet beslutningsmodel. Den returnerer valg, scorer og booleske værdier med sandsynligheder, men kan ikke skrive tekst. Den vælger hver sektion i rækkefølge fra et fast skabelonbibliotek, scorer layouts, faktatjekker tekst og vælger stockfotos og ikoner. Input koster ca. 0,04 USD pr. million tokens, og output er gratis. Derfor koster ca. 90 kald pr. side en brøkdel af en cent.
- **En lille chatmodel (GPT-4.1 mini som standard)** udfylder de navngivne tekstfelter med længdebegrænsning i de valgte skabeloner. Skriveren er en fast konstant, som kan overskrives med miljøvariablen `SITEGEN_COPY_MODEL` (ethvert chatmodel-ID på gatewayen, fx `anthropic/claude-haiku-4.5`). I et blindt side-om-side-forsøg på tre kirker læste Claude Haiku 4.5 en smule varmere. GPT-4.1 mini var dog tæt på, ca. fire gange billigere og hurtigere, og er derfor standard. En hel side med alle tre layouts koster ca. 1,3 cent, hvoraf ca. 80 % går til skriveren.

| Fase | Endpoint | Hvad sker der |
|-------|----------|-------|
| 1 | `POST /website/planPage` | Klassificerer sidetypen (home, visit, about …) og udtrækker derefter 10 kandidatlayouts fra JEV's sandsynligheder pr. runde (hero + antal sektioner → hver sektion → afslutning). Dubletter fjernes, og JEV scorer hver for pasform, flow og huller. Den returnerer de tre bedste samt en skrivestil og en `suggestedStyle` (palet + skrifttyper). Kandidater, der deler de samme sektioner indtil nu, stiller JEV et identisk spørgsmål, så runder huskes efter præfiks. En bedste score under 6 logges som `lowLayoutScore`. Den log er baglogget over skabeloner, det er værd at tilføje. ~2 s |
| 2 | `POST /website/writePage` (ét kald pr. kandidat) | Skriveren udfylder feltteksterne to sektioner pr. kald, parallelt, og returnerer fem hero-overskrifter, som JEV vælger imellem. JEV faktatjekker hver sektion. Sektioner, der fejler, bruger en standardfrase eller gentager en tidligere sektion (delte sekvenser på 4 ord, kontrolleret i koden), omskrives parallelt med den konkrete årsag. En kodeoprydning fjerner sætninger med standardfraser fra kirkesider (medmindre kirkens egen beskrivelse bruger dem). JEV vælger fotomotiver, ikoner og heltens formdeler og scorer resultatet. Den returnerer et klar-til-gem sektionstræ og en score. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin skriver kun det højest rangerede layout (næstbedste er reserve, hvis skrivningen fejler), gemmer det og åbner forhåndsvisningen (ca. 10 s efter Gem) |

Hver fase er sin egen anmodning, så hvert kald holder sig inden for API Gateways grænse på 29 sekunder. Skabelonerne i `SiteGenHelper.buildTree` er faste sektion- og elementtræer fra katalogen (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`). De refererer til temamærker (`var(--accent)`, `var(--lightAccent)` …), så genererede sider arver kirkens eksisterende udseende. At tilføje en sektionsskabelon betyder at tilføje dens feltliste til `SECTIONS` og dens træ til `buildTree`. Enhedstesten gennemløber hver skabelon og validerer træet.

**Input.** Tekst må kun angive fakta fra to kilder: det brugeren har skrevet, og `churchContext.facts`. Det er poster, som B1Admin indsamler før planlægningen: offentlige gudstjenestetider, offentlige gruppenavne samt kirkens navn og adresse. De samme flag styrer datadrevne skabeloner. `times` gengiver det live `serviceTimes`-element, når kirken holder sine gudstjenestetider i B1 (ellers en skrevet tabel). `groups` og `countdown` tilbydes kun, når der er data bag dem. JEV-kald er afdækkede: et duplikat sendes efter 1,5 s, og det første svar vinder, fordi gatewayen en gang imellem hænger, og kaldene er næsten gratis.

**Holde sig til emnet.** Brugerens prompt er *sidens emne* og ikke baggrund om kirken. `planPage` klassificerer anmodningen (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). For `event`- og `topic`-sider tilbydes de almindelige kirkeskabeloner (pastornote, prædikener, arbejdsgrene, grupper, samfundspåvirkning, ugentlige tider og nedtælling, videohero) slet ikke. I stedet tilbydes `details` (hvornår / hvor / hvad man skal medbringe) og en datonedtælling `eventCountdown`. Begge dommere scorer, om indholdet er på emnet. B1Admin sender `pageType` fra planen med i hvert `writePage`-kald.

**Fulde sider ud fra korte anmodninger.** Sider har tre til seks midtersektioner, rummelige feltlængder, en introlinje på kortsektioner og en FAQ med fem spørgsmål. Reparationstrinnet udvider enhver sektion, der kommer tilbage tynd. Generering sker med ét klik. Der er ingen opfølgende spørgsmål. Hvis anmodningen udelader en almindelig detalje, som en fuldstændig side har brug for (et starttidspunkt, et lokale, hvad man skal medbringe, hvordan man tilmelder sig), udfylder skriveren det med et plausibelt, beskedent valg, som kirken kan redigere. Fordi sektionerne skrives parallelt, afgøres disse huller **én gang** i `planPage` (`assumedDetails`, et lille skrivekald, der kører sammen med layoutudtrækningen). De sendes tilbage i hvert `writePage`-kald via `churchContext.assumedDetails`, så én sektion ikke kan sige 5:00, mens en anden siger 5:30. JEV reparerer enhver sektion, der strider mod anmodningen, kirkens optegnelser eller de afgjorte detaljer. De afgjorte detaljer vises ikke i brugerfladen. Kirken gennemgår og redigerer siden som enhver anden. Nogle ting opfindes aldrig: navne på personer, telefonnumre, e-mail- og webadresser, priser, statistik, kirkens historie, citater tilskrevet personer og en ugedag for en dato, anmodningen ikke angav en for.

**Visuelle elementer.** Skabeloner navngiver aldrig deres fotos eller ikoner. De efterlader åbne pladser, og ét generelt trin (`visualSlots` → `pickVisuals` → `applyVisuals` i `SiteGenHelper`) gennemløber det færdige træ og udfylder hver plads. Det gælder en sektionsbaggrund eller et galleriindgang markeret `auto:photo`, et `auto:icon`, heltens `auto:divider` og, uden markør overhovedet, et hvilket som helst `textWithPhoto`-, `card`- eller `image`-element, hvis `photo` er tomt. JEV vælger hver ud fra teksten ved siden af (et kort' foto ud fra kortets titel og tekst, en baggrund ud fra sektionens tekst), og intet motiv gentages på en side. En ny skabelon får derfor fotos gratis. Fotos er Pexels-søgemotiver, der udsendes som `pexels:<term>`-pladsholdere, som B1Admin løser via `POST /content/stock/search`. En klient, der ikke sender `resolvesPhotos`, får i stedet et indbygget heltebillede, flade farvebånd og kort uden foto. Der er bevidst ingen portrætmotiver, og pastorskabelonen har intet foto. En tilfældig fremmed på et stockfoto må aldrig stå for en rigtig person. For en kirke uden sider endnu anvender B1Admin `suggestedStyle` på de globale stilarter. Eksisterende sider beholder deres udseende.

### Andre endpoints

:::info
Knappen `SectionToolbar` til omskrivning og knappen "Generate Site" på sidelisten i B1Admin er stadig udkommenteret på klientsiden. AskApi-endpoints nedenfor svarer stadig. Kun brugerfladen er skjult.
:::

| Endpoint | Formål |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Det oprindelige to-trins sideforløb (oversigt, derefter ét LLM-kald pr. sektion, som udsender element-JSON). Erstattet i B1Admin af `planPage`/`writePage` på grund af omkostninger. Beholdt til API-forbrugere |
| `POST /website/generateSite` | Generering af hele siden. **Tofaset ved design**: et `planOnly: true`-kald returnerer kun den flersidede plan (ét hurtigt modelkald). Derefter anmoder klienten om det fulde indhold. Det holder hver anmodning inden for Lambda/API Gateway-timeouten |
| `POST /website/rewriteSection` | Omskrivning, der bevarer strukturen. Modellen må kun ændre tekstbærende svar. En rekursiv strukturssignatur (id'er + typer + rækkefølge) sammenlignes før og efter. Enhver uoverensstemmelse returnerer den oprindelige sektion med `fallback: true` i stedet for en beskadiget struktur |
| `POST /website/generateAltText` | Vision-kald over op til 20 billed-URL'er. Returnerer kort alt-tekst (≤125 tegn, med præfikser som "photo of" fjernet) |
| `POST /website/generateMetaDescription` | Én SEO-metabeskrivelse (≤155 tegn) ud fra sidens tekstindhold. Forbundet med knappen Generate i B1Admins sideindstillinger |

Prompts til disse endpoints er markdown-filer under `AskApi/config/instructions/`. De inkluderer elementkataloget, som modellen genererer ud fra. To designpunkter holder kataloget ærligt. Klienten sender `availableElementTypes` med hver anmodning. Prompten må kun bruge typer fra listen, og serveren hardcoder aldrig det fulde sæt. API'ets MCP-værktøj `describe_page_builder` indeholder den samme vejledning til AI-agenter, der arbejder via [MCP](../api/mcp). Modellerne er Anthropic Claude via OpenRouter: 3.5 Haiku til sektionsindhold (latens) og 3.5 Sonnet til oversigter, sideplaner og vision. Der er en OpenAI-reserve, når der ikke er konfigureret en OpenRouter-nøgle.

## Samtalebaserede formularer

Formularer (membership-modulet) har fået en samtalebaseret tilstand, rettet mod sider i stil med forbindelseskort. Fire kolonner på `forms` styrer den: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject` og `followUpBody`.

- **Gengivelse** – apphelpers `FormSubmissionEdit` skifter til komponenten `ConversationalForm` (ét spørgsmål ad gangen), når `displayMode` er `conversational`. B1Apps formularside videregiver tilstanden. Indsendelsens nyttelast er den samme i begge tilfælde.
- **Automatisk oprettelse af person** – ved indsendelse med `autoCreatePerson` sat, deduplikerer `ConversationalFormHelper.findOrCreatePerson` på e-mail (uden hensyn til store og små bogstaver). Ellers opretter den en husstand og en person med `membershipStatus: "Guest"` og knytter derefter indsendelsen til personen.
- **Opfølgende e-mail** – når et emne og en brødtekst er sat, får indsenderen en skabelonbaseret e-mail (med `{firstName}` / `{churchName}`-markører) via den eksisterende transaktionelle sti (`TransactionalEmailHelper`), aldrig via notifikationsdigest-kanalen. Begge bivirkninger er ikke-fatale. En fejl mister aldrig indsendelsen.

De fire felter sættes i dag via API'et. B1Admins formularredigering eksponerer dem endnu ikke.

## Cache for den offentlige side

B1Apps offentlige gengivelsessti cacher kirkemærkede hentninger (`next: { revalidate: 300, tags: [sdSlug] }` i produktion og `0` i udvikling). Derfor kan en live side være forældet i op til fem minutter efter en skrivning til ContentApi. `POST /api/revalidate/{sdSlug}` på B1App kalder `revalidateTag(sdSlug)` og er den eneste måde at fjerne cachen tidligere.

To skrivere rammer den:

1. **B1Admin** – `clearSiteCache()` i `B1Admin/src/site/siteCache.ts` sender et POST efter redigeringsgemninger. Den foretrækker den aktive sides subdomæne. En sekundær side skal rydde *dét* tag og ikke kirkens standardtag.
2. **Api** – indholdsændringer, der aldrig går gennem B1Admin (API-nøgler, MCP, AI), udløser `SiteCacheHelper.bump(churchId)` fra indholdscontrollerne. Hjælperen finder kirkens subdomæne via `SubDomainHelper` og sender et POST til `{b1AppRoot}/api/revalidate/{sd}`. Fejl sluges, så en utilgængelig B1App aldrig kan få en gemning til at fejle.

Controllere, der udløser bump: sider (gem, slet, dupliker, publicér, kassér, afpublicér, AI-midlertidig), sektioner, elementer, blokke, links, globale stilarter, indlæg og omdirigeringer. Lokal `b1AppRoot` er `http://{subdomain}.localtest.me:3301`. Demo og produktion bruger `https://{subdomain}.b1.church`.

## Relaterede sider

- [Website Routing & Multi-Site](./websites) — hvordan en anmodning finder kirke/side, og hvordan egne domæner routes
- [Content Endpoints](../api/endpoints/content) — den fulde REST-flade for sider, sektioner, elementer, blokke, indlæg, omdirigeringer og indstillinger
- [AppHelper](../shared-libraries/app-helper) — npm-pakken, der leverer renderere, register, formdelere og widgets
- [MCP Server](../api/mcp) — inklusive vejledningsværktøjet `describe_page_builder`
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — dokumentationen til medarbejdereditoren
