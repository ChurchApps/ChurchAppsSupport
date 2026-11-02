---
title: "Arkitektur for nettstedbyggeren"
---

# Arkitektur for nettstedbyggeren

<div class="article-intro">

Hver kirkeside som serveres av B1App, rendres fra et innholdstre — sider, seksjoner, elementer — som lagres i ContentApi og redigeres visuelt i B1Admin. Ett delt komponentbibliotek rendrer både forhåndsvisningen i editoren og det live nettstedet, én katalog over elementtyper definerer hva som kan vises på en side, og en egen AI-tjeneste kan generere eller skrive om det treet. Denne siden kartlegger hele stacken: elementkontrakten i `@churchapps/helpers`, rendringspipelinen, kirkedata-elementer, widgets for hele nettstedet, bloggskiktet, sider med tilgangsstyring, SEO, AI-generering og samtaleskjemaer.

</div>

## Oversikt

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content-modulen (ContentApi)    │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        delt rendringspipeline                   ▼            (anonym, JWT respekteres)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — offentlig side (Next.js)│
               │    ElementTypes.ts (katalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderere │   │    omdirigeringer, merket 404   │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ kirkedata-elementer
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returnerer JSON; B1Admin lagrer │         │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Tre regler gjelder på tvers av stacken:

1. **Ett tre, to rendrere.** En side er et `pages → sections → elements`-tre der hver node bærer sine innstillinger som en `answers`-JSON-blob. De samme apphelper-komponentene rendrer dra-og-slipp-editoren i B1Admin og det serverrendrede offentlige nettstedet i B1App — det finnes ikke noe eget «publiseringsformat».
2. **Kontrakten ligger i `@churchapps/helpers`.** `ElementTypes.ts` er den ene katalogen over elementtyper; renderere slås opp gjennom et register i apphelper; redigeringsskjemaene ligger i B1Admin. Å legge til en elementtype berører alle tre, i den rekkefølgen.
3. **Det offentlige nettstedet leser anonyme endepunkter.** Alt B1App trenger — sidetreet, innstillinger, blogginnlegg, omdirigeringer og kirkedata-endepunktene i andre moduler — er offentlig. Autentisering er valgfri: et JWT på det anonyme tre-endepunktet låser opp sider for bare medlemmer, og ingenting annet endres.

## Innholdstreet

Content-modulen (`Api/src/modules/content`) eier byggerens data:

| Tabell | Rolle |
|-------|-------|
| `pages` | Én side per URL: `url`, `title`, `layout`, pluss `visibility`/`groupIds` (tilgangsstyring) og `metaDescription` (SEO) |
| `sections` | Horisontale bånd på en side (eller i en blokk): bakgrunn, tekstfarge, og en `answersJSON` som bærer styling pluss formdeleren-konfigurasjonene `dividerTop`/`dividerBottom` |
| `elements` | Innholdsbiter inne i en seksjon: `elementType` + `answersJSON`, kan nestes for layouttyper (rad/kolonne, karusell) |
| `blocks` | Gjenbrukbare grupper av seksjoner/elementer (bunnblokker, elementblokker) delt mellom sider |
| `posts` | Frittstående blogginnlegg (se [Blogg](#blog)) |
| `redirects` | Per-kirke-par `fromPath → toPath`, begrenset til 200 (se [SEO](#seo-and-discoverability)) |
| `settings` | Nøkkelverdi-kirkeinnstillinger; rader merket `public` serveres anonymt og bærer widget-/analyse-konfigurasjonen |

Hele treet for én URL kommer tilbake fra ett enkelt anonymt kall — `GET /content/pages/:churchId/tree?url=/about` — som er det B1App server-renderer fra. Redigeringsforespørsler henter i stedet etter ID og beholder interne ID-er.

## Elementkontrakten

### Katalogen (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definerer hver elementtype som en `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` og en `answersSchema` i JSON-schema-stil for svarene. `validateElementAnswers()` er bevisst mild — ukjente typer og ekstra nøkler slipper gjennom, så gammelt innhold aldri brytes ved en oppgradering av katalogen. **35 typer leveres i dag:**

| Kategori | Elementtyper |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Elementet `sermons` er det mest konfigurerbare av kirketypene: et `layout`-svar velger `browse` (den eldre fullvisningen), `grid`, `list` eller `featuredLatest`, med `playlistId`, `itemCount`, `showTitles` og `showDates` som finjusterer de ikke-bla-layoutene.

Elementet `rawHTML` har to svar: `rawHTML` (markup) og `javascript`. Skript satt inn gjennom `innerHTML` kjøres aldri, så `RawHTMLElement` gjenskaper hver `<script>`-node i markupen som et nytt element. Disse nodene som ikke er satt inn av parseren, er betrodd under CSP-ens `strict-dynamic`. Et `javascript`-svar som starter med `<` (et leverandørutdrag limt inn med sine `<script>`-tagger) parses som markup og får samme behandling. Ellers kjøres det som et vanlig inline-skript. B1Admin flagger en bar URL i JavaScript-boksen, siden en enkelt URL kjøres som et skript uten virkning. Elementet `map` rendrer ingenting, og laster ikke noe Google Maps-skript, når ingen Maps API-nøkkel er konfigurert.

### Rendere (`@churchapps/apphelper`)

Rendererne ligger i `Packages/apphelper/src/website/components/elementTypes/`, én komponent per type, og slås opp gjennom `ElementRegistry.ts` — et kart i to lag der `Element.tsx` registrerer standardrendereren for alle 35 typene (`registerDefaultElementRenderer`), og en vertsapp kan overstyre hvilken som helst av dem under kjøring (`registerElementRenderer`) uten å forke pakken.

### Redigeringsskjemaer (B1Admin)

Editorens innstillingsskjemaer per type ligger i `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` sender videre til en dedikert komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) eller en innebygd feltbygger per type. Den KI-vendte speilingen av denne katalogen er API-ets MCP-verktøy `describe_page_builder` (se [MCP-server](../api/mcp)).

### Formdeler for seksjoner

Seksjoner kan bære dekorative formdelere på begge kanter. Konfigurasjonen ligger i seksjonens `answersJSON` som `dividerTop` / `dividerBottom`-objekter — `{ shape, color, height, flip }` der `shape` er én av `wave, waves, slant, curve, triangle, peaks`. Apphelper leverer komponenten `SectionDivider` og hjelperen `parseDividerConfig()`; begge apper sine Section-renderere (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parser svarene og monterer delelementet, og `SectionEdit.tsx` i B1Admin tilbyr velgergrensesnittet. Pakkene leverer bare byggeklossen — kobling på seksjonsnivå er de konsumerende appenes jobb.

## Kirkedata-elementer

Tre elementtyper rendrer levende kirkedata i stedet for skrevet innhold. Modulisolasjon gjelder fortsatt — hver kaller den eide modulens egne offentlige endepunkt fra nettleseren:

| Element | Endepunkt | Merknader |
|---------|----------|-----------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerer `{ fundId, totalAmount, donationCount }`, valgfritt vindu `?startDate=&endDate=`; elementet sammenligner det med svaret `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Kun opt-in**: gruppen må ha `publicRoster` satt (standard av). Projeksjonen er bevisst minimal — `personId`, `displayName`, `leader`, bilde — ingen kontakt- eller demografiske felt |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerer treet kirkested → gudstjeneste → tid; apphelper-rendereren sender ut best-effort schema.org `Event` JSON-LD fra det (API-et returnerer ren data) |

:::warning
`publicRoster` er personvernsporten for `staffGrid`. Utvid aldri den offentlige projeksjonen av gruppemedlemmer, og omgå aldri flagget — rosterendepunktet er anonymt med vilje, og den minimale feltlisten er sikkerhetsegenskapen.
:::

### Kalenderelementet og arrangementssider

Svarene for elementet `calendar` er `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, standard, eller `upcoming`), og `tag`. B1App overstyrer apphelper-rendereren i `src/components/Element.tsx` med `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** rendrer B1Apps `UpcomingEventsElement`: den laster `GET /content/events/public/group/:churchId/:groupId` eller `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, utvider gjentakelser med `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, én forekomst per arrangement innen et år), og viser de første 12 som bildeflis (`events.photoUrl`, med tittelen på temaets mørke farge som reserve) som lenker til `/events/{id}`, med en Subscribe-meny for kalenderens ICS-feed.
- **`display: "month"`** rendrer apphelpers `CalendarElement` med en `eventUrl`-callback. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigerer deretter til den URL-en ved klikk i stedet for å åpne detaljdialogen (B1Admin sender ingen `eventUrl`, så admin-kalenderen beholder dialogen).
- **`tag`** filtrerer begge visningene med `EventHelper.hasTag()` (`@churchapps/helpers`): en match uten hensyn til store/små bokstaver mot den kommaseparerte `events.tags`; tom viser alt. Den kuraterte kalender-sammenkoblingen velger `e.tags`, slik at kuraterte arrangementer bærer dem.

Kuraterte arrangementer lenker med `realEventId` (`eventPageId()`), så URL-en navngir alltid det underliggende arrangementet. `/{sdSlug}/events/[eventId]` er en dedikert rute (ikke byggerpipelinen): den laster `GET /content/events/public/:churchId/:id` — som returnerer `null` for ventende/avviste arrangementer og for private arrangementer uten påmelding, og legger til `roomNames` fra ikke-avviste romreservasjoner — rendrer `EventPageContent` (fotohelt, markdown-beskrivelse, When/Where-sidefelt, **Meld deg på dette arrangementet** når `registrationEnabled`, og en lenke **Legg til i min kalender** til `GET /content/events/public/:churchId/:id/ical`), bruker bildet som Open Graph-bilde, og sender ut `Event` JSON-LD for neste forekomst via `EventPageJsonLd`. Et ukjent eller skjult arrangement gir en ekte 404.

## Widgets for hele nettstedet

To widgets vises på hver offentlig side utenfor treet: **AnnouncementBanner** (et avvisbart bånd øverst på siden) og **Launcher** (en flytende handlingshub for lenker av typen gi/besøk/se). Begge komponentene og deres `parse*Config()`-hjelpere leveres i apphelper. Konfigurasjonen er to offentlige innstillingsrader — nøklene `announcementBanner` og `launcher` — skrevet av B1Admins `SiteWidgetsEdit` (på Utseende-siden) og lest av B1Apps offentlige layout via `GET /content/settings/public/:churchId`. API-et behandler dem som ugjennomsiktige nøkkelverdi-par; nøkkelnavnene er en konvensjon mellom de to appene.

## Blogg {#blog}

Bloggen er en frittstående innholdstype, ikke et lag over byggersider. En `posts`-rad holder hele innlegget: `title`, `slug`, `excerpt`, `content` (markdown-brødtekst), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Offentlig flate (alt anonymt, `PostController`):

| Rute | Formål |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publiserte innlegg, filtrerbare med `?category=&tag=`, paginert |
| `GET /content/posts/public/:churchId/categories` | Distinkte kategorier på tvers av publiserte innlegg |
| `GET /content/posts/public/:churchId/slug/:slug` | Ett publisert innlegg |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0-feed, med kirkenavnet som tittel, og per element kategori og utdrag-eller-innhold som beskrivelse |

Et innlegg er «publisert» når `publishDate` er satt og passert; en fremtidig `publishDate` er et planlagt innlegg (skjult offentlig, vist med en brikke Scheduled i admin). Leseendepunktene beriker hvert innlegg med `authorName`, løst fra `authorId` gjennom membership-modulens gateway. Manglende utdrag faller tilbake til markdown-innhold uten formatering (~160 tegn) i listekort, metabeskrivelser og RSS. B1App serverer `/{sdSlug}/blog` — en redaksjonell liste (en sentrert topptekst som blir det aktive kategori-/emnenavnet når den er filtrert, en filterrad med kategoribrikker, innleggsrader med miniatyrbilde til venstre med signaturer og utdrag) med RSS-feeden annonsert som en alternativ lenke — og `/{sdSlug}/blog/[postSlug]`, en dedikert rute (ikke Zone/Section-pipelinen) med sentrert topptekst (kategoriovertekst, tittel, signatur, aksentstrek i primærfargen), en 16:9-helt i containerbredde, markdown-brødteksten i en lesekolonne på ~720 px, emnebrikker i artikkelens bunn, en stripe `"More in {category}"` med relaterte innlegg, og `BlogPosting` JSON-LD som inkluderer forfatteren. Begge sidene henter helt fra temaets tokens, slik at de arver hver kirkes palett. Blogg-URL-er tas med i kirkens sitemap. B1Admins forfatterverktøy (**Site → Blog**) redigerer innlegg i en dialog: markdown-editor med forhåndsvisningsbryter, bildevelger i galleriet beskåret til 16:9, forfattervelger for personer (standard er redigerende bruker), autofullføring av kategorier fra eksisterende kategorier, validering av duplikatslugger, og en publiseringsbryter; publiserte rader lenker til det live innlegget, og siden minner admin om å legge til en navigasjonslenke til `/blog`. Kommentarer overlates til tredjepartstjenester: en kirkevid offentlig innholdsinnstilling `blogFooterHtml` (redigert under **Below Every Post** på Blogg-siden, vist bare med Settings→Edit) rendres under hvert innlegg av B1Apps `BlogFooterEmbed`, som gjenskaper `<script>`-taggene slik at de kjører under `'strict-dynamic'`, og kjører dem i rekkefølge (en ekstern `src` blir ferdig lastet før neste inline-skript kjører), siden leverandørskript laster et bibliotek og deretter kaller det.

## Sider for bare medlemmer

`pages.visibility` gjenbruker navigasjonslenkenes enum — `everyone` (standard), `visitors`, `members`, `staff`, `team`, `groups` (med `groupIds`) — men som en **hard tilgangsport**, ikke et navigasjonsfilter (`PageVisibilityHelper.canViewPage`). Flyten:

1. Det anonyme tre-endepunktet sjekker synlighet på URL-baserte henting. Anonyme kall til en låst side får `{ restricted: true, visibility }` i stedet for innhold — treet lekker aldri.
2. Endepunktet respekterer fortsatt et JWT: `CustomAuthProvider` verifiserer `Authorization`-headeren på *hver* forespørsel, også på anonyme ruter, slik at en innlogget medlems henting av samme URL løses normalt.
3. B1App rendrer `RestrictedPage` ved et `restricted`-svar: den henter økten fra lagrede påloggingsopplysninger, henter treet på nytt med JWT-et og rendrer det — eller viser en innloggingsport med en `returnUrl` når det ikke finnes noen økt.

:::info
Granulariteten på porten varierer etter nivå: `groups` sjekker tokenets `groupIds` mot sidens liste, og `staff` sjekker `membershipStatus`, men `members` og `team` slipper for øyeblikket gjennom enhver autentisert bruker i kirken. Behandle `groups` som det strenge alternativet.
:::

## SEO og synlighet i søk {#seo-and-discoverability}

Alt dette er gjengivelse på B1App-siden over ContentApi-data — API-et lagrer, appen sender ut:

| Hensyn | Hvordan det fungerer |
|---------|--------------|
| Metabeskrivelser | `pages.metaDescription` (≤300 tegn) flyter gjennom `MetaHelper.getMetaData()` inn i Next.js `Metadata` (description + Open Graph) på hver byggerrendret rute. B1Admins sideinnstillinger har en AI-knapp **Generate** (se nedenfor) |
| Omdirigeringer | Rader `redirects` per kirke, administrert på `/content/redirects` (`content.edit`, grense på 200 rader, normaliserte stier). Ved en mulig 404 slår B1Apps siderute stien opp mot `GET /content/redirects/public/:churchId` og sender en HTTP 308 via Nexts `permanentRedirect`; ukjente stier faller gjennom til `notFound()` |
| Merket 404 | `not-found.tsx` rendrer `BrandedNotFound` med kirkens logo, navn og tema i stedet for en generisk feil. Ukjente stier `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` og `/volunteer/[planId]` gir en ekte 404, det samme gjelder ukjente underdomener og ugyldige sideslugger (se [Nettstedsruting og flere nettsteder](./websites)) |
| Strukturerte data | `BlogPosting` JSON-LD på blogginnlegg; `VideoObject` på sidene for hver preken (`/{sdSlug}/sermons/[sermonId]`) og på sider som inneholder et `sermons`-element; `Event` fra kalender-/arrangementselementer på byggersider og på hver `/{sdSlug}/events/[eventId]`-side (neste forekomst, med arrangementsbildet som `image`); schema.org `Event` fra elementet `serviceTimes` |
| Prekensider | Hver offentlig preken får en gjennomsøkbar side på `/sermons/[sermonId]` med full metadata — prekener er ikke lenger låst inne i den klientsidige nettleserelementet |
| Analyse | Den offentlige innstillingsnøkkelen `ga4MeasurementId` (administrert ved siden av omdirigeringer i B1Admin) injiserer en per-kirke GA4 gtag via `next/script`. B1-appen (`/{sdSlug}/mobile`) sender også sine sidevisninger til den IDen, ved siden av ChurchApps' egen tagg, når det er en gyldig `G-`-ID (GTM-container-ID-er forblir bare for nettstedet). Hver `gtag('config')` bærer en `display_mode` på `installed` eller `browser`, basert på `navigator.standalone` eller medieforespørselen `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap og feeder | Ruten `sitemap.xml` per kirke tar med byggersider, bloggadresser og de 50 nyeste prekensidene (med `<lastmod>` fra hver preken sin publiseringsdato). Den lister også de innebygde sidene `/sermons`, `/groups` og `/volunteer` når de har innhold (offentlige grupper, påmeldingsplaner), med mindre en lagret omdirigering erstatter den stien. `/` utelates når kirken ikke har en forside, siden `/` da omdirigerer til det ikke-tillatte `/mobile`. Bloggoversikten annonserer RSS-feeden |
| Tilgjengelighet | Det offentlige skallet rendrer en hoppelenke som peker på `<main id="main-content">`-landemerket i hver layout-wrapper |

## AI-generering (AskApi)

Side- og nettstedsgenerering kjører i **AskApi**, en egen tjeneste, under `/website`-kontrolleren. Den autentiserer med samme `CustomAuthProvider`-JWT som alt annet, og er **tilstandsløs med hensyn til innhold**: hvert endepunkt returnerer JSON, og kalleren (B1Admin) lagrer resultatet gjennom ContentApi (`POST /content/pages/importTree` oppretter en side med hele det nestede seksjons- og elementtreet i ett kall; det setter alltid inn under kallerens kirke og ignorerer ID-er i body).

### Sidegenerering (`planPage` → `writePage`)

«AI»-malen i B1Admins `AddPageModal` bruker en rimelig pipeline (`AskApi/src/helpers/SiteGenHelper.ts`) bygget på én regel: **ingen modell sender ut byggerens JSON**. To modeller deler arbeidet gjennom Vercel AI Gateway (vanlig HTTP, SSM-nøkkel `/{env}/aiGatewayApiKey` eller `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — en typesikker beslutningsmodell som returnerer valg, poengsummer og booleske verdier med sannsynligheter, men ikke kan skrive tekst. Den velger hver seksjon i rekkefølge fra et fast malbibliotek, scorer layouter, faktasjekker tekst, og velger stockbilder og ikoner. Input koster omtrent 0,04 USD per million tokens og output er gratis, så ~90 kall per side koster en brøkdel av en cent.
- **En liten chat-modell (GPT-4.1 mini som standard)** — fyller de navngitte, lengdebegrensede tekstslottene i de valgte malene. Skriveren er én konstant, som kan overstyres med miljøvariabelen `SITEGEN_COPY_MODEL` (en hvilken som helst chat-modell-ID på gatewayen, f.eks. `anthropic/claude-haiku-4.5`). I en blindsammenligning på tre kirker leste Claude Haiku 4.5 litt varmere, men GPT-4.1 mini var nær, omtrent 4 ganger billigere og raskere, så den er standard. En full side med alle tre layoutene koster omtrent 1,3 cent, rundt 80 % av det skriveren.

| Fase | Endepunkt | Hva skjer |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Klassifiserer sidetypen (hjem, besøk, om oss…), samler deretter 10 kandidatlayouter fra JEVs sannsynligheter per runde (helt + antall seksjoner → hver seksjon → avslutning), fjerner duplikater, lar JEV score hver for passform/flyt/hull, og returnerer de 3 beste pluss en skrivestemme og et `suggestedStyle` (palett + skrifter). Kandidater som deler de samme seksjonene så langt, stiller JEV et identisk spørsmål, så runder memoiseres etter prefiks. En beste score under 6 logges som `lowLayoutScore` — den loggen er etterslepet av maler som er verdt å legge til. ~2 s |
| 2 | `POST /website/writePage` (ett kall per kandidat) | Skriveren fyller slotteksten to seksjoner per kall, parallelt, og returnerer fem hodeoverskrifter som JEV velger mellom; JEV faktasjekker hver seksjon; seksjoner som mislykkes, bruker en standardfrase, eller gjenforteller en tidligere seksjon (delte 4-ords-sekvenser, sjekket i kode) skrives om parallelt med den spesifikke grunnen; et kodeopprydningspass dropper setninger med standardfraser fra kirkesider (med mindre kirkens egen beskrivelse bruker dem); JEV velger fotoemner, ikoner og heltens formdeler, og scorer resultatet. Returnerer et ferdig lagringsklart seksjonstre og en score. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin skriver bare den best rangerte layouten (nummer to er en reserve hvis den skrivingen mislykkes), lagrer og åpner forhåndsvisningen (~10 s etter Lagre) |

Hver fase er sin egen forespørsel slik at hvert kall holder seg innenfor API Gateways grense på 29 sekunder. Maler i `SiteGenHelper.buildTree` er faste seksjons- og elementtrær fra katalogen (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) og refererer til temaets tokens (`var(--accent)`, `var(--lightAccent)` …), slik at genererte sider arver kirkens eksisterende utseendeinnstillinger. Å legge til en seksjonsmal betyr å legge til slotlisten i `SECTIONS` og treet i `buildTree`; enhetstesten går gjennom hver mal og validerer treet.

**Inndata.** Tekst kan bare angi fakta fra to kilder: det brukeren skrev, og `churchContext.facts` — poster B1Admin samler inn før planleggingen (offentlige gudstjenestetider og offentlige gruppenavn, pluss kirkens navn og adresse). De samme flaggene styrer datadrevne maler: `times` rendrer det levende elementet `serviceTimes` når kirken holder gudstjenestetider i B1 (en skrevet tabell ellers), og `groups` og `countdown` tilbys bare når det finnes data bak dem. JEV-kall er avdekket — et duplikat avfyres etter 1,5 s og det første svaret vinner — fordi gatewayen av og til stopper opp, og kallene er nesten gratis.

**Holde seg til temaet.** Brukerens melding er *temaet for siden*, ikke bakgrunn om kirken. `planPage` klassifiserer forespørselen (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), og for `event`- og `topic`-sider tilbys ikke de generelle kirkemalene (pastornotat, prekener, tjenester, grupper, samfunnspåvirkning, ukentlige tider og nedtelling, videohelt) engang, mens `details` (når / hvor / hva du tar med) og en dato-`eventCountdown` tilbys. Begge dommerne scorer på om det holder seg til temaet. B1Admin sender `pageType` fra planen inn i hvert `writePage`-kall.

**Fullstendige sider fra korte forespørsler.** Sider har tre til seks midtseksjoner, romslige slotlengder, en innledende linje på kortseksjoner og en FAQ med fem spørsmål, og reparasjonspasset utvider enhver seksjon som kommer tilbake tynn. Generering skjer med ett klikk: det finnes ingen oppfølgingsspørsmål. Der forespørselen utelater en vanlig detalj en komplett side trenger (et starttidspunkt, et rom, hva man tar med, hvordan man melder seg på), fyller skriveren inn et plausibelt, beskjedent valg som kirken kan redigere. Fordi seksjoner skrives parallelt, avgjøres disse hullene **én gang**, i `planPage` (`assumedDetails`, ett lite skrivekall som kjører side om side med layoutsamplingen), og sendes tilbake inn i hvert `writePage`-kall gjennom `churchContext.assumedDetails`, slik at én seksjon ikke kan si 17:00 mens en annen sier 17:30. JEV reparerer enhver seksjon som motsier forespørselen, kirkens poster eller de avgjorte detaljene. De avgjorte detaljene vises ikke i UI-et; kirken gjennomgår og redigerer siden som alle andre. Noen ting oppfinnes aldri: navn på personer, telefonnumre, e-post- og nettadresser, priser, statistikk, kirkens historie, sitater tilskrevet personer, og en ukedag for en dato forespørselen ikke ga en for.

**Visuelt.** Maler navngir aldri sine bilder eller ikoner. De lar slotter stå åpne, og ett generisk pass (`visualSlots` → `pickVisuals` → `applyVisuals` i `SiteGenHelper`) går gjennom det ferdige treet og fyller hver enkelt: en seksjonsbakgrunn eller galleri-oppføring merket `auto:photo`, et `auto:icon`, heltens `auto:divider`, og, uten noen markør i det hele tatt, enhver `textWithPhoto`-, `card`- eller `image`-element der `photo` er tomt. JEV velger hver enkelt ut fra teksten ved siden av (et kort sitt bilde fra kortets tittel og tekst; en bakgrunn fra seksjonens tekst), uten at noe motiv gjentas på en side. En ny mal får derfor bilder gratis. Bilder er Pexels-søkemotiver sendt ut som `pexels:<term>`-plassholdere som B1Admin løser gjennom `POST /content/stock/search`; en klient som ikke sender `resolvesPhotos` får et innebygd heltebilde, flate fargede bånd og kort uten bilder i stedet. Det finnes med vilje ingen portrettmotiver, og pastormalen har ikke noe bilde: en stockfremmed må aldri stå i stedet for en ekte person. For en kirke uten sider ennå, bruker B1Admin `suggestedStyle` på de globale stilene; eksisterende nettsteder beholder utseendet sitt.

### Andre endepunkter

:::info
`SectionToolbar`-knappen for omskriving og knappen **Generate Site** på sidelisten i B1Admin er fortsatt kommentert ut på klientsiden. AskApi-endepunktene nedenfor svarer fortsatt; bare den UI-en er skjult.
:::

| Endepunkt | Formål |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Den opprinnelige todelte sideflyten (disposisjon, deretter ett LLM-kall per seksjon som sender ut element-JSON). Erstattet i B1Admin av `planPage`/`writePage` på grunn av kostnad; beholdt for API-forbrukere |
| `POST /website/generateSite` | Generering av hele nettstedet. **Tofaset med vilje**: et `planOnly: true`-kall returnerer bare den flersiders planen (ett raskt modellkall), og klienten ber deretter om fullt innhold — slik at hver forespørsel holder seg innenfor tidsgrensen for Lambda/API Gateway |
| `POST /website/rewriteSection` | Omskriving som bevarer strukturen: modellen kan bare endre tekstbærende svar. En rekursiv strukturssignatur (ID-er + typer + rekkefølge) sammenlignes før og etter; enhver feil gir den opprinnelige seksjonen tilbake med `fallback: true` i stedet for ødelagt struktur |
| `POST /website/generateAltText` | Visjonskall over opptil 20 bilde-URL-er; returnerer kort alternativ tekst (≤125 tegn, med ledende «photo of»-prefikser fjernet) |
| `POST /website/generateMetaDescription` | Én SEO-metabeskrivelse (≤155 tegn) fra sidens tekstinnhold — koblet til Generate-knappen i B1Admins sideinnstillinger |

Prompter for disse endepunktene er markdown-filer under `AskApi/config/instructions/`, inkludert elementkatalogen modellen genererer fra. To designvalg holder katalogen ærlig: klienten sender `availableElementTypes` med hver forespørsel (prompten kan bare bruke typer fra den listen — serveren hardkoder aldri hele settet), og API-ets MCP-verktøy `describe_page_builder` bærer den samme veiledningen for KI-agenter som jobber gjennom [MCP](../api/mcp). Modellene er Anthropic Claude via OpenRouter — 3.5 Haiku for seksjonsinnhold (latens), 3.5 Sonnet for disposisjoner, nettstedsplaner og visjon — med en OpenAI-reserve når ingen OpenRouter-nøkkel er konfigurert.

## Samtaleskjemaer

Skjemaer (membership-modulen) fikk en samtalemodus rettet mot sider i stil med kontaktkort. Fire kolonner på `forms` styrer den: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — apphelpers `FormSubmissionEdit` bytter til komponenten `ConversationalForm` (ett spørsmål om gangen) når `displayMode` er `conversational`; B1Apps skjemaside sender modusen videre. Samme innsendingsnyttelast begge veier.
- **Automatisk opprettelse av person** — ved innsending med `autoCreatePerson` satt, dedupliserer `ConversationalFormHelper.findOrCreatePerson` på e-post (uten hensyn til store/små bokstaver) og oppretter ellers en husstand + person med `membershipStatus: "Guest"`, og knytter deretter innsendingen til den personen.
- **Oppfølgings-e-post** — når et emne og en brødtekst er satt, får innsenderen en malbasert e-post (med `{firstName}` / `{churchName}`-merker) gjennom den eksisterende transaksjonsveien (`TransactionalEmailHelper`), aldri gjennom varselsdigest-døren. Begge bieffektene er ikke-fatale: en feil mister aldri innsendingen.

De fire feltene settes via API-et i dag; B1Admins skjemaeditor eksponerer dem ikke ennå.

## Cache for det offentlige nettstedet

B1Apps offentlige rendringssti cacher kirkemerkede henting (`next: { revalidate: 300, tags: [sdSlug] }` i produksjon; `0` i utvikling), slik at en live side kan forbli utdatert i inntil fem minutter etter en ContentApi-skriving. `POST /api/revalidate/{sdSlug}` i B1App kaller `revalidateTag(sdSlug)` og er den eneste måten å tømme cachen tidlig på.

To skrivere treffer den:

1. **B1Admin** — `clearSiteCache()` i `B1Admin/src/site/siteCache.ts` poster etter lagringer i editoren. Den foretrekker det aktive nettstedets underdomene (et sekundært nettsted må tømme *den* taggen, ikke kirkens standard).
2. **Api** — innholdsendringer som aldri går gjennom B1Admin (API-nøkler, MCP, AI) utløser `SiteCacheHelper.bump(churchId)` fra innholdskontrollerne. Hjelperen løser kirkens underdomene via `SubDomainHelper` og poster til `{b1AppRoot}/api/revalidate/{sd}`. Feil svelges, slik at en utilgjengelig B1App aldri kan feile en lagring.

Kontrollere som bumper: sider (lagre, slette, duplisere, publisere, forkaste, avpublisere, AI-midlertidig), seksjoner, elementer, blokker, lenker, globale stiler, innlegg og omdirigeringer. Dev-`b1AppRoot` er `http://{subdomain}.localtest.me:3301`; demo/prod bruker `https://{subdomain}.b1.church`.

## Relaterte sider

- [Nettstedsruting og flere nettsteder](./websites) — hvordan en forespørsel løses til en kirke/et nettsted, og hvordan egne domener rutes
- [Content-endepunkter](../api/endpoints/content) — full REST-flate for sider, seksjoner, elementer, blokker, innlegg, omdirigeringer og innstillinger
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer rendererne, registeret, formdelerne og widgetene
- [MCP-server](../api/mcp) — inkludert verktøyveiledningen `describe_page_builder`
- [Sideeditor (sluttbruker)](/docs/b1-admin/website/page-editor) — dokumentasjonen for editoren for ansatte
