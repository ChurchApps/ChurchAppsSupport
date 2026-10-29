---
title: "Arkitektur for nettsidebyggeren"
---

# Arkitektur for nettsidebyggeren

<div class="article-intro">

Hver kirkeside som serveres av B1App, rendres fra et innholdstre — sider, seksjoner, elementer — som lagres i ContentApi og redigeres visuelt i B1Admin. Ett delt komponentbibliotek rendrer både redigeringsforhåndsvisningen og den levende siden, én elementtype-katalog definerer hva som kan vises på en side, og en egen AI-tjeneste kan generere eller skrive om det treet. Denne siden kartlegger hele stakken: elementkontrakten i `@churchapps/helpers`, rendringsrørledningen, kirkedata-elementer, widgeter for hele nettstedet, bloggsjiktet, sider med tilgangsstyring, SEO, AI-generering og samtaleskjemaer.

</div>

## Oversikt

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

Tre regler gjelder gjennom hele stakken:

1. **Ett tre, to rendrere.** En side er et `pages → sections → elements`-tre der hver node bærer sine innstillinger som en `answers`-JSON-blob. De samme apphelper-komponentene rendrer dra-og-slipp-redigeringen i B1Admin og den serverrendrede offentlige siden i B1App — det finnes ikke noe eget «publiseringsformat».
2. **Kontrakten bor i `@churchapps/helpers`.** `ElementTypes.ts` er den ene katalogen over elementtyper; rendrerere løses gjennom et register i apphelper; redigeringsskjemaer bor i B1Admin. Å legge til en elementtype betyr å røre alle tre, i den rekkefølgen.
3. **Den offentlige siden leser anonyme endepunkter.** Alt B1App trenger — sidetreet, innstillinger, bloggposter, omdirigeringer og kirkedata-endepunktene i andre moduler — er offentlig. Autentisering er valgfri: et JWT på det anonyme tre-endepunktet låser opp sider kun for medlemmer, men ingenting annet endres.

## Innholdstreet

Content-modulen (`Api/src/modules/content`) eier byggerens data:

| Tabell | Rolle |
|-------|-------|
| `pages` | En side per URL: `url`, `title`, `layout`, pluss `visibility`/`groupIds` (tilgangsstyring) og `metaDescription` (SEO) |
| `sections` | Horisontale bånd på en side (eller i en blokk): bakgrunn, tekstfarge, og en `answersJSON` som bærer styling pluss formkonfigurasjonene `dividerTop`/`dividerBottom` |
| `elements` | Innholdsbiter i en seksjon: `elementType` + `answersJSON`, kan nestes for layouttyper (rad/kolonne, karusell) |
| `blocks` | Gjenbrukbare seksjons-/elementgrupper (bunntekstblokker, elementblokker) delt på tvers av sider |
| `posts` | Frittstående bloggposter (se [Blogg](#blog)) |
| `redirects` | Per-kirke-par `fromPath → toPath`, begrenset til 200 (se [SEO](#seo-and-discoverability)) |
| `settings` | Nøkkelverdi-kirkeinnstillinger; rader merket `public` serveres anonymt og bærer widget-/analyse-konfigurasjonen |

Hele treet for én URL kommer tilbake fra ett anonymt kall — `GET /content/pages/:churchId/tree?url=/about` — og det er det B1App server-renderer fra. Redigeringsforespørsler henter i stedet etter ID og beholder interne ID-er.

## Elementkontrakten

### Katalogen (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definerer hver elementtype som en `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, og en `answersSchema` i JSON-schema-stil for svarene. `validateElementAnswers()` er bevisst tolerant — ukjente typer og ekstra nøkler slipper gjennom, så gammelt innhold aldri brekker ved en katalogoppgradering. **35 typer leveres i dag:**

| Kategori | Elementtyper |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons`-elementet er det mest konfigurerbare av kirketypene: et `layout`-svar velger `browse` (den gamle fullstendige leseren), `grid`, `list` eller `featuredLatest`, der `playlistId`, `itemCount`, `showTitles` og `showDates` finjusterer layoutene som ikke er `browse`.

`rawHTML`-elementet har to svar: `rawHTML` (markup) og `javascript`. Skript satt inn gjennom `innerHTML` kjøres aldri, så `RawHTMLElement` gjenskaper hver `<script>`-node i markupen som et nytt element. Disse nodene som ikke er satt inn av parseren er klarert under CSP-en `strict-dynamic`. Et `javascript`-svar som starter med `<` (et leverandørutdrag limt inn med sine `<script>`-tagger) parses som markup og får samme behandling. Ellers kjører det som et vanlig inline-skript. B1Admin markerer en bar URL i JavaScript-boksen, siden en alene-URL kjører som et tomt skript. `map`-elementet rendrer ingenting, og laster ikke noe Google Maps-skript, når ingen Maps API-nøkkel er konfigurert.

### Rendrere (`@churchapps/apphelper`)

Rendrere ligger i `Packages/apphelper/src/website/components/elementTypes/`, én komponent per type, løst gjennom `ElementRegistry.ts` — et todelt kart der `Element.tsx` registrerer standardrenderen for alle 35 typene (`registerDefaultElementRenderer`), og en vertsapp kan overstyre hvilken som helst av dem under kjøring (`registerElementRenderer`) uten å forke pakken.

### Redigeringsskjemaer (B1Admin)

Editorens innstillingsskjemaer per type ligger i `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` sender til en dedikert komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) eller en innebygd feltbygger per type. Den AI-vendte speilingen av denne katalogen er API-ets MCP-verktøy `describe_page_builder` (se [MCP-server](../api/mcp)).

Redigeringsforhåndsvisningen monterer det samme `Theme` som den levende siden, som setter CSS-variablene `--headingFont` / `--bodyFont` fra kirkens globale stiler. B1App bruker disse variablene gjennom `pages.css`, som B1Admin ikke kan importere, så `ContentEditor.tsx` injiserer `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) for å anvende dem på `.page`-brødteksten og `h1`–`h6`. Uten den viste forhåndsvisningen overskrifter i admin-fonten.

### Seksjonsformdelere

Seksjoner kan bære dekorative formdelere på begge kanter. Konfigurasjonen ligger i seksjonens `answersJSON` som `dividerTop` / `dividerBottom`-objekter — `{ shape, color, height, flip }` der `shape` er en av `wave, waves, slant, curve, triangle, peaks`. Apphelper leverer komponenten `SectionDivider` og hjelperen `parseDividerConfig()`; begge apps' seksjonsrendrere (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parser svarene og monterer deleren, og `SectionEdit.tsx` i B1Admin leverer velgeren. Pakkene leverer bare byggeklossen — seksjonsnivå-koblingen er de konsumerende appenes jobb.

## Kirkedata-elementer

Tre elementtyper rendrer levende kirkedata i stedet for skrevet innhold. Modulisolasjon gjelder fortsatt — hver kaller den eide modulens egne offentlige endepunkt fra nettleseren:

| Element | Endepunkt | Merknader |
|---------|-----------|-----------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerer `{ fundId, totalAmount, donationCount }`, valgfritt `?startDate=&endDate=`-vindu; elementet sammenligner det med sitt `goalAmount`-svar |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Kun opt-in**: gruppen må ha `publicRoster` satt (standard av). Projeksjonen er bevisst minimal — `personId`, `displayName`, `leader`, bilde — ingen kontakt- eller demografifelt |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerer treet kampus → tjeneste → tid; apphelper-rendereren sender ut best-effort schema.org `Event` JSON-LD fra det (API-et returnerer ren data) |

:::warning
`publicRoster` er personvernporten for `staffGrid`. Utvid aldri den offentlige gruppemedlemsprojeksjonen og omgå aldri flagget — rosterendepunktet er anonymt med vilje, og den minimale feltlisten er sikkerhetsegenskapen.
:::

### Kalenderelementet og arrangementssider

`calendar`-elementets svar er `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, standard, eller `upcoming`), og `tag`. B1App overstyrer apphelper-rendereren i `src/components/Element.tsx` med `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** rendrer B1Apps `UpcomingEventsElement`: den laster `GET /content/events/public/group/:churchId/:groupId` eller `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, utvider gjentakelser med `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, én forekomst per hendelse innen et år), og viser de første 12 som bildeflater (`events.photoUrl`, med tittelen som reserve på temaets mørke farge) som lenker til `/events/{id}`, med en Abonner-meny for kalenderens ICS-feed.
- **`display: "month"`** rendrer apphelpers `CalendarElement` med en `eventUrl`-callback. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigerer da til den URL-en ved klikk i stedet for å åpne detaljdialogen (B1Admin sender ingen `eventUrl`, så admin-kalenderen beholder dialogen).
- **`tag`** filtrerer begge visningene med `EventHelper.hasTag()` (`@churchapps/helpers`): en matching uten hensyn til store/små bokstaver mot den kommaseparerte `events.tags`; tom viser alt. Den kuraterte kalenderjoinen velger `e.tags`, slik at kuraterte hendelser bærer dem.

Kuraterte hendelser lenker med `realEventId` (`eventPageId()`), så URL-en navngir alltid den underliggende hendelsen. `/{sdSlug}/events/[eventId]` er en dedikert rute (ikke byggerrørledningen): den laster `GET /content/events/public/:churchId/:id` — som returnerer `null` for ventende/avviste hendelser og for private hendelser uten påmelding, og legger til `roomNames` fra ikke-avviste romreservasjoner — rendrer `EventPageContent` (bildeheltekst, markdown-beskrivelse, Når/Hvor-sidekolonne, **Meld deg på dette arrangementet** når `registrationEnabled`, og en **Legg til i min kalender**-lenke til `GET /content/events/public/:churchId/:id/ical`), bruker bildet som Open Graph-bilde, og sender ut `Event` JSON-LD for neste forekomst via `EventPageJsonLd`. En ukjent eller skjult hendelse returnerer en ekte 404.

## Widgeter for hele nettstedet

To widgeter rendres på hver offentlig side i stedet for inne i treet: **AnnouncementBanner** (lukkbar topplinje) og **Launcher** (flytende handlingsnav for lenker av typen gi/besøk/se). Begge komponentene og deres `parse*Config()`-hjelpere leveres i apphelper. Konfigurasjonen er to offentlige innstillingsrader — nøklene `announcementBanner` og `launcher` — skrevet av B1Admins `SiteWidgetsEdit` (på Utseende-siden) og lest av B1Apps offentlige layout via `GET /content/settings/public/:churchId`. API-et behandler disse som ugjennomsiktige nøkkelverdi-par; nøkkelnavnene er en konvensjon mellom de to appene.

## Blogg

Bloggen er en frittstående innholdstype, ikke et lag over byggersider. En `posts`-rad holder hele innlegget: `title`, `slug`, `excerpt`, `content` (markdown-brødtekst), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Offentlig flate (alt anonymt, `PostController`):

| Rute | Formål |
|-------|--------|
| `GET /content/posts/public/:churchId` | Publiserte innlegg, filtrerbart med `?category=&tag=`, paginert |
| `GET /content/posts/public/:churchId/categories` | Distinkte kategorier på tvers av publiserte innlegg |
| `GET /content/posts/public/:churchId/slug/:slug` | Ett publisert innlegg |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0-feed, med kirkens navn som tittel, og per element kategori og utdrag-eller-innhold-beskrivelse |

Et innlegg er «publisert» når `publishDate` er satt og passert; en fremtidig `publishDate` er et planlagt innlegg (skjult offentlig, vist med en Planlagt-brikke i admin). Leseendepunkter beriker hvert innlegg med `authorName`, løst fra `authorId` gjennom membership-modulens gateway. Manglende utdrag faller tilbake til markdown-innhold uten formatering (~160 tegn) i listekort, metabeskrivelser og RSS. B1App serverer `/{sdSlug}/blog` — en redaksjonell liste (sentrert topptekst som blir navnet på aktiv kategori/emneord når det filtreres, kategoribrikkerad, innleggsrader med miniatyrbilde til venstre med bylines og utdrag) med RSS-feeden annonsert som alternativ lenke — og `/{sdSlug}/blog/[postSlug]`, en dedikert rute (ikke Zone/Section-rørledningen) med sentrert topptekst (kategori-kicker, tittel, byline, aksentlinje i primærfarge), et 16:9-heltebilde i containerbredde, markdown-brødteksten i en ~720 px lesekolonne, emneordsbrikker i artikkelfoten, en `"More in {category}"`-stripe med relaterte innlegg, og `BlogPosting` JSON-LD inkludert forfatteren. Begge sidene styler helt fra temaets tokens, så de arver hver kirkes palett. Bloggadresser inkluderes i kirkens sitemap. B1Admins forfatterverktøy (**Side → Blogg**) redigerer innlegg i en dialog: markdown-editor med forhåndsvisningsbryter, galleribildevelger med 16:9-beskjæring, forfattervelger for personer (standard er redigeringsbrukeren), kategoriautofullføring hentet fra eksisterende kategorier, validering av dupliserte slugger, og en publiseringsbryter; publiserte rader lenker ut til det levende innlegget, og siden minner administratorer om å legge til en navigasjonslenke til `/blog`. Kommentarer overlates til tredjepartstjenester: en kirkedekkende offentlig innholdsinnstilling `blogFooterHtml` (redigert under **Under hvert innlegg** på Blogg-siden, og vist bare med Innstillinger→Rediger) gjengis under hvert innlegg av B1Apps `BlogFooterEmbed`, som gjenskaper `<script>`-taggene slik at de kjører under `'strict-dynamic'` og kjører dem i rekkefølge (en ekstern `src` blir ferdig lastet før neste inline-skript kjører), siden leverandørsnutter laster et bibliotek og deretter kaller det.

## Sider for kun medlemmer

`pages.visibility` gjenbruker enummet for navigasjonslenker — `everyone` (standard), `visitors`, `members`, `staff`, `team`, `groups` (med `groupIds`) — men som en **hard tilgangsport**, ikke et navigasjonsfilter (`PageVisibilityHelper.canViewPage`). Flyten:

1. Det anonyme tre-endepunktet sjekker synlighet på URL-baserte hentinger. Anonyme kallere av en låst side får `{ restricted: true, visibility }` i stedet for innhold — treet lekker aldri.
2. Endepunktet respekterer fortsatt et JWT: `CustomAuthProvider` verifiserer `Authorization`-headeren på *hver* forespørsel, inkludert anonyme ruter, så et innlogget medlems henting av samme URL løses normalt.
3. B1App rendrer `RestrictedPage` på et `restricted`-svar: den henter økten fra lagrede påloggingsopplysninger, henter treet på nytt med JWT-et, og rendrer det — eller viser en innloggingsport med en `returnUrl` når det ikke finnes en økt.

:::info
Granulariteten på porten varierer etter nivå: `groups` sjekker tokenets `groupIds` mot sidens liste, og `staff` sjekker `membershipStatus`, men `members` og `team` slipper for øyeblikket gjennom enhver innlogget bruker i kirken. Behandle `groups` som det strenge alternativet.
:::

## SEO og synlighet

Alt dette er B1App-rendring over ContentApi-data — API-et lagrer, appen sender ut:

| Hensyn | Slik fungerer det |
|---------|--------------|
| Metabeskrivelser | `pages.metaDescription` (≤300 tegn) flyter gjennom `MetaHelper.getMetaData()` inn i Next.js' `Metadata` (description + Open Graph) på hver byggerrendret rute. B1Admins sideinnstillinger har en AI-knapp **Generer** (se under) |
| Omdirigeringer | Rader i `redirects` per kirke, administrert på `/content/redirects` (`content.edit`, 200-radersgrense, normaliserte stier). Ved en mulig 404 slår B1Apps siderute stien opp mot `GET /content/redirects/public/:churchId` og sender en HTTP 308 via Nexts `permanentRedirect`; umatchede stier faller gjennom til `notFound()` |
| Merket 404 | `not-found.tsx` rendrer `BrandedNotFound` med kirkens logo, navn og tema i stedet for en generisk feil. Ukjente `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` og `/volunteer/[planId]`-stier returnerer en ekte 404, og det samme gjelder ukjente underdomener og ugyldige sideslugger (se [Nettstedsruting og flere nettsteder](./websites)) |
| Strukturerte data | `BlogPosting` JSON-LD på bloggposter; `VideoObject` på per-taler-sidene (`/{sdSlug}/sermons/[sermonId]`) og på sider som inneholder et `sermons`-element; `Event` fra kalender-/hendelseselementer på byggersider og på hver `/{sdSlug}/events/[eventId]`-side (neste forekomst, med arrangementsbildet som `image`); schema.org `Event` fra `serviceTimes`-elementet |
| Talersider | Hver offentlig tale får en crawlbar side på `/sermons/[sermonId]` med full metadata — taler er ikke lenger låst inne i det klientsidige leserelementet |
| Analyse | Den offentlige innstillingsnøkkelen `ga4MeasurementId` (administrert ved siden av omdirigeringer i B1Admin) injiserer en kirkespesifikk GA4-gtag via `next/script`. B1-appen (`/{sdSlug}/mobile`) sender også sine sidevisninger til den ID-en, ved siden av ChurchApps' egen tagg, når den er en gyldig `G-`-ID (GTM-containerID-er forblir kun for nettstedet). Hver `gtag('config')` bærer en `display_mode` på `installed` eller `browser`, basert på `navigator.standalone` eller medieforespørselen `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap og feeder | Den kirkespesifikke `sitemap.xml`-ruten inkluderer byggersider, bloggadresser og de 50 siste talersidene (med `<lastmod>` fra hver tales publiseringsdato). Den lister også de innebygde sidene `/sermons`, `/groups` og `/volunteer` når de har innhold (offentlige grupper, påmeldingsplaner), med mindre en lagret omdirigering erstatter stien. `/` utelates når kirken ikke har en hjemmeside, siden `/` da omdirigerer til den utelatte `/mobile`. Bloggoversikten annonserer RSS-feeden |
| Tilgjengelighet | Den offentlige rammen rendrer en hoppelenke mot `<main id="main-content">`-landemerket i hver layout-wrapper |

## AI-generering (AskApi)

Side- og nettstedsgenerering kjører i **AskApi**, en egen tjeneste, under `/website`-kontrolleren. Den autentiserer med samme `CustomAuthProvider`-JWT som alt annet og er **tilstandsløs med hensyn til innhold**: hvert endepunkt returnerer JSON, og kalleren (B1Admin) lagrer resultatet gjennom ContentApi (`POST /content/pages/importTree` oppretter en side med hele det nestede seksjons- og elementtreet i ett kall; den setter alltid inn under kallerens kirke og ignorerer ID-er i body).

### Sidegenerering (`planPage` → `writePage`)

«AI»-sidemalen i B1Admins `AddPageModal` bruker en billig rørledning (`AskApi/src/helpers/SiteGenHelper.ts`) bygget på én regel: **ingen modell sender ut byggerens JSON**. To modeller deler arbeidet gjennom Vercel AI Gateway (vanlig HTTP, SSM-nøkkel `/{env}/aiGatewayApiKey` eller `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — en typesikker beslutningsmodell som returnerer valg, poengsum og booleans med sannsynligheter, men ikke kan skrive tekst. Den velger hver seksjon etter tur fra et fast malbibliotek, poengsetter layouter, faktasjekker tekst, og velger lagerbilder og ikoner. Input koster omtrent $0,04 per million tokens og output er gratis, så ~90 kall per side koster en brøkdel av en cent.
- **En liten chat-modell (GPT-4.1 mini som standard)** — fyller de navngitte, lengdebegrensede tekstplassene i de valgte malene. Skriveren er én konstant, som kan overstyres med miljøvariabelen `SITEGEN_COPY_MODEL` (en hvilken som helst chat-modell-ID på gatewayen, f.eks. `anthropic/claude-haiku-4.5`). I en blind side-ved-side-test på tre kirker leste Claude Haiku 4.5 litt varmere, men GPT-4.1 mini var nær, omtrent 4 ganger billigere og raskere, så den er standard. En full side med alle tre layoutene koster omtrent 1,3 cent, hvorav rundt 80 % er skriveren.

| Fase | Endepunkt | Hva skjer |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Klassifiserer sidetypen (hjem, besøk, om…), og samler så 10 kandidatlayouter fra JEVs sannsynligheter per runde (helt + antall seksjoner → hver seksjon → avslutning), fjerner duplikater, får JEV til å poengsette hver for passform/flyt/hull, og returnerer de 3 beste pluss en skrivestemme og en `suggestedStyle` (palett + fonter). Kandidater som deler de samme seksjonene så langt stiller JEV et identisk spørsmål, så runder memoiseres etter prefiks. En beste poengsum under 6 logges som `lowLayoutScore` — den loggen er etterslepet av maler verdt å legge til. ~2 s |
| 2 | `POST /website/writePage` (ett kall per kandidat) | Skriveren fyller slottekstene to seksjoner per kall, parallelt, og returnerer fem hovedoverskrifter som JEV velger mellom; JEV faktasjekker hver seksjon; seksjoner som feiler, bruker en standardfrase, eller gjenforteller en tidligere seksjon (delte 4-ords-sekvenser, sjekket i kode) skrives om parallelt med den spesifikke grunnen; et kodeskrubb fjerner setninger med standardfraser for kirkesider (med mindre kirkens egen beskrivelse bruker dem); JEV velger fotomotiver, ikoner og heltens formdeler, og poengsetter resultatet. Returnerer et ferdig-å-lagre seksjonstre og en poengsum. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin skriver bare den best rangerte layouten (nummer to er en reserve hvis den skrivingen mislykkes), lagrer den og åpner forhåndsvisningen (~10 s etter Lagre) |

Hver fase er sin egen forespørsel, slik at hvert kall holder seg innenfor API Gateways grense på 29 sekunder. Maler i `SiteGenHelper.buildTree` er faste seksjons- og elementtrær fra katalogen (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) og refererer temaets tokens (`var(--accent)`, `var(--lightAccent)`…), så genererte sider arver kirkens eksisterende utseendeinnstillinger. Å legge til en seksjonsmal betyr å legge dens sliste til `SECTIONS` og dens tre til `buildTree`; enhetstesten går gjennom hver mal og validerer treet.

**Innput.** Tekst kan bare angi fakta fra to kilder: det brukeren skrev, og `churchContext.facts` — poster B1Admin samler inn før planlegging (offentlige gudstjenestetider og offentlige gruppenavn, pluss kirkens navn og adresse). De samme flaggene styrer datadrevne maler: `times` rendrer det levende `serviceTimes`-elementet når kirken holder gudstjenestetider i B1 (en skrevet tabell ellers), og `groups` og `countdown` tilbys bare når det finnes data bak dem. JEV-kall er sikret — et duplikat avfyres etter 1,5 s, og det første svaret vinner — fordi gatewayen av og til stopper, og kallene er nesten gratis.

**Holde seg til emnet.** Brukerens ledetekst er *emnet for siden*, ikke bakgrunn om kirken. `planPage` klassifiserer forespørselen (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), og for `event`- og `topic`-sider tilbys ikke de generelle kirkemalene (pastornotat, taler, tjenester, grupper, samfunnspåvirkning, ukentlige tider og nedtelling, videoheltedel) i det hele tatt, mens `details` (når / hvor / hva å ta med) og en dato-`eventCountdown` tilbys. Begge dommerne poengsetter om innholdet er på emnet. B1Admin sender `pageType` fra planen inn i hvert `writePage`-kall.

**Fullstendige sider fra korte forespørsler.** Sider har tre til seks midtseksjoner, romslige slottlengder, en innledende linje på kortseksjoner og en FAQ med fem spørsmål, og reparasjonspasset utvider en seksjon som kommer tilbake tynn. Generering er ett klikk: det finnes ingen oppfølgingsspørsmål. Der forespørselen utelater en vanlig detalj en komplett side trenger (et starttidspunkt, et rom, hva man tar med, hvordan man melder seg på), fyller skriveren inn et plausibelt, beskjedent valg for kirken å redigere. Fordi seksjoner skrives parallelt, avgjøres disse hullene **én gang**, i `planPage` (`assumedDetails`, ett lite skrivekall som kjører side om side med layoutsamplingen), og sendes tilbake inn i hvert `writePage`-kall gjennom `churchContext.assumedDetails`, slik at én seksjon ikke kan si 17:00 mens en annen sier 17:30. JEV reparerer enhver seksjon som motsier forespørselen, kirkens poster eller de avgjorte detaljene. De avgjorte detaljene vises ikke i brukergrensesnittet; kirken gjennomgår og redigerer siden som enhver annen. Noen ting oppdiktes aldri: navn på personer, telefonnumre, e-post- og nettadresser, priser, statistikk, kirkens historie, sitater tilskrevet personer, og en ukedag for en dato forespørselen ikke ga en for.

**Visuelle elementer.** Maler navngir aldri sine bilder eller ikoner. De lar slotter stå åpne, og ett generisk pass (`visualSlots` → `pickVisuals` → `applyVisuals` i `SiteGenHelper`) går gjennom det ferdige treet og fyller hver enkelt: en seksjonsbakgrunn eller galleriføring merket `auto:photo`, et `auto:icon`, heltens `auto:divider`, og, uten noen markør i det hele tatt, enhver `textWithPhoto`-, `card`- eller `image`-element hvis `photo` er tom. JEV velger hver ut fra teksten ved siden av (et kortbilde fra det kortets tittel og tekst; en bakgrunn fra seksjonens tekst), uten at et motiv gjentas på en side. En ny mal får derfor bilder gratis. Bilder er Pexels-søkemotiver sendt ut som `pexels:<term>`-plassholdere som B1Admin løser gjennom `POST /content/stock/search`; en klient som ikke sender `resolvesPhotos` får et innebygd heltebilde, flate fargede bånd og kort uten bilder i stedet. Det finnes bevisst ingen portrettmotiver, og pastormalen har ikke noe bilde: en lagerfigur må aldri stå i stedet for en ekte person. For en kirke uten sider ennå, bruker B1Admin `suggestedStyle` på de globale stilene; eksisterende nettsteder beholder sitt utseende.

### Andre endepunkter

:::info
`SectionToolbar`-omskrivingsknappen og knappen **Generer nettsted** på sidelisten i B1Admin er fortsatt kommentert ut på klientsiden. AskApi-endepunktene nedenfor svarer fortsatt; det er bare det brukergrensesnittet som er skjult.
:::

| Endepunkt | Formål |
|----------|--------|
| `POST /website/generatePageOutline` → `generateSection` | Den opprinnelige to-trinns sideflyten (disposisjon, deretter ett LLM-kall per seksjon som sender ut elementjson). Erstattet i B1Admin av `planPage`/`writePage` av kostnadshensyn; beholdt for API-forbrukere |
| `POST /website/generateSite` | Generering av hele nettstedet. **To-fase med vilje**: et `planOnly: true`-kall returnerer bare den flersidige planen (ett raskt modellkall), og klienten ber deretter om fullt innhold — slik at hver forespørsel holder seg innenfor Lambda/API Gateway-tidsavbruddet |
| `POST /website/rewriteSection` | Struktur-bevarende omskriving: modellen kan bare endre tekstbærende svar. En rekursiv strukturssignatur (ID-er + typer + rekkefølge) sammenlignes før og etter; enhver feil returnerer den opprinnelige seksjonen med `fallback: true` i stedet for ødelagt struktur |
| `POST /website/generateAltText` | Visjonskall over opptil 20 bilde-URL-er; returnerer kort alt-tekst (≤125 tegn, prefikset «photo of» fjernet) |
| `POST /website/generateMetaDescription` | Én SEO-metabeskrivelse (≤155 tegn) fra sidens tekstinnhold — koblet til Generer-knappen i B1Admins sideinnstillinger |

Ledetekstene for disse endepunktene er markdown-filer under `AskApi/config/instructions/`, inkludert elementkatalogen modellen genererer fra. To designvalg holder katalogen ærlig: klienten sender `availableElementTypes` med hver forespørsel (ledeteksten kan bare bruke typer fra den listen — serveren hardkoder aldri hele settet), og API-ets MCP-verktøy `describe_page_builder` bærer samme veiledning for AI-agenter som jobber gjennom [MCP](../api/mcp). Modellene er Anthropic Claude via OpenRouter — 3.5 Haiku for seksjonsinnhold (latens), 3.5 Sonnet for disposisjoner, nettstedsplaner og visjon — med en OpenAI-reserve når ingen OpenRouter-nøkkel er konfigurert.

## Samtaleskjemaer

Skjemaer (membership-modulen) fikk en samtalemodus rettet mot sider i stil med kontaktkort. Fire kolonner på `forms` styrer den: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendring** — apphelpers `FormSubmissionEdit` bytter til komponenten `ConversationalForm` (ett spørsmål om gangen) når `displayMode` er `conversational`; B1Apps skjemaside sender modusen videre. Samme innsendingsnyttelast uansett.
- **Automatisk opprettelse av person** — ved innsending med `autoCreatePerson` satt, dedupliserer `ConversationalFormHelper.findOrCreatePerson` etter e-post (uten hensyn til store/små bokstaver) og oppretter ellers en husstand + person med `membershipStatus: "Guest"`, og knytter innsendingen til den personen.
- **Oppfølgings-e-post** — når et emne og en brødtekst er satt, får avsenderen en malbasert e-post (med `{firstName}` / `{churchName}`-tokens) gjennom den eksisterende transaksjonsveien (`TransactionalEmailHelper`), aldri gjennom varselsoppsummeringen. Begge bivirkningene er ikke-fatale: en feil mister aldri innsendingen.

De fire feltene settes via API-et i dag; B1Admins skjemaredigerer eksponerer dem ikke ennå.

## Hurtigbuffer for den offentlige siden

B1Apps offentlige rendringsvei cacher kirkemerkede hentinger (`next: { revalidate: 300, tags: [sdSlug] }` i produksjon; `0` i utvikling), så en levende side kan være utdatert i inntil fem minutter etter en ContentApi-skriving. `POST /api/revalidate/{sdSlug}` på B1App kaller `revalidateTag(sdSlug)` og er den eneste måten å fjerne den cachen tidlig på.

To skrivere treffer den:

1. **B1Admin** — `clearSiteCache()` i `B1Admin/src/site/siteCache.ts` sender POST etter redigerings-lagringer. Den foretrekker det aktive nettstedets underdomene (et sekundært nettsted må ugyldiggjøre *den* taggen, ikke kirkens standard).
2. **Api** — innholdsmutasjoner som aldri går gjennom B1Admin (API-nøkler, MCP, AI) utløser `SiteCacheHelper.bump(churchId)` fra innholdskontrollerne. Hjelperen løser kirkens underdomene via `SubDomainHelper` og sender POST til `{b1AppRoot}/api/revalidate/{sd}`. Feil svelges, slik at et utilgjengelig B1App ikke kan mislykkes en lagring.

Kontrollere som bumper: sider (lagre, slett, dupliser, publiser, forkast, avpubliser, AI-midlertidig), seksjoner, elementer, blokker, lenker, globale stiler, poster og omdirigeringer. Dev `b1AppRoot` er `http://{subdomain}.localtest.me:3301`; demo/prod bruker `https://{subdomain}.b1.church`.

## Relaterte sider

- [Nettstedsruting og flere nettsteder](./websites) — hvordan en forespørsel løses til en kirke/et nettsted, og hvordan egne domener rutes
- [Innholdsendepunkter](../api/endpoints/content) — fullstendig REST-flate for sider, seksjoner, elementer, blokker, poster, omdirigeringer og innstillinger
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer rendrerne, registeret, skilleelementene og widgetene
- [MCP-server](../api/mcp) — inkludert verktøyveiledningen `describe_page_builder`
- [Sidebygger (sluttbruker)](/docs/b1-admin/website/page-editor) — dokumentasjonen for redigeringsverktøyet for ansatte
