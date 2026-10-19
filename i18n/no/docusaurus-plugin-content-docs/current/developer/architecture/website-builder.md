---
title: "Arkitektur for nettstedsbyggeren"
---

# Arkitektur for nettstedsbyggeren

<div class="article-intro">

Alle menighetsnettsteder som serveres av B1App, gjengis fra et innholdstre — sider, seksjoner, elementer — som er lagret i ContentApi og redigeres visuelt i B1Admin. Ett felles komponentbibliotek gjengir både redigeringsforhåndsvisningen og det live nettstedet, en katalog over elementtyper definerer hva som kan vises på en side, og en egen AI-tjeneste kan generere eller skrive om innholdstreet. Denne siden beskriver hele stacken: elementkontrakten i `@churchapps/helpers`, gjengivelsesflyten, kirkedataelementer, widgeter for hele nettstedet, bloggdelen, tilgangsstyrte sider, SEO, AI-generering og samtalebaserte skjemaer.

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

Tre regler gjelder på tvers av hele stacken:

1. **Ett tre, to gjengivere.** En side er et `pages → sections → elements`-tre der hver node bærer innstillingene sine som en `answers`-JSON-blob. De samme apphelper-komponentene gjengir dra-og-slipp-editoren i B1Admin og det serverrenderte offentlige nettstedet i B1App — det finnes ikke noe eget "publiseringsformat".
2. **Kontrakten ligger i `@churchapps/helpers`.** `ElementTypes.ts` er den eneste katalogen over elementtyper; gjengivere slås opp gjennom et register i apphelper; redigeringsskjemaer ligger i B1Admin. Å legge til en elementtype betyr å endre alle tre, i den rekkefølgen.
3. **Det offentlige nettstedet leser anonyme endepunkter.** Alt B1App trenger — sidetreet, innstillinger, blogginnlegg, omdirigeringer og kirkedata-endepunktene i andre moduler — er offentlig. Autentisering er valgfritt: en JWT på det anonyme trekendepunktet låser opp sider kun for medlemmer, men ellers endrer ingenting seg.

## Innholdstreet

Innholdsmodulen (`Api/src/modules/content`) eier byggerens data:

| Tabell | Rolle |
|-------|------|
| `pages` | Én side per URL: `url`, `title`, `layout`, samt `visibility`/`groupIds` (tilgangsstyring) og `metaDescription` (SEO) |
| `sections` | Horisontale bånd på en side (eller i en blokk): bakgrunn, tekstfarge og en `answersJSON` som inneholder styling og `dividerTop`/`dividerBottom`-konfigurasjonene for formdelere |
| `elements` | Innholdsbiter inne i en seksjon: `elementType` + `answersJSON`, og kan settes inn i hverandre for layouttyper (rad/kolonne, karusell) |
| `blocks` | Gjenbrukbare grupper av seksjoner/elementer (bunntekstblokker, elementblokker) som deles mellom sider |
| `posts` | Frittstående blogginnlegg (se [Blogg](#blog)) |
| `redirects` | Par av `fromPath → toPath` per menighet, begrenset til 200 (se [SEO](#seo-and-discoverability)) |
| `settings` | Nøkkel-verdi-innstillinger for menigheten; rader merket `public` serveres anonymt og inneholder widget- og analysekonfigurasjonen |

Hele treet for én URL hentes i ett enkelt anonymt kall — `GET /content/pages/:churchId/tree?url=/about` — og det er dette B1App serverrenderer fra. Forespørsler i editoren henter i stedet på id og beholder interne id-er.

## Elementkontrakten

### Katalogen (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definerer hver elementtype som en `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` og et JSON-schema-lignende `answersSchema` for svarene. `validateElementAnswers()` er bevisst tolerant — ukjente typer og ekstra nøkler slipper gjennom, slik at eldre innhold aldri brytes ved en oppgradering av katalogen. **35 typer leveres i dag:**

| Kategori | Elementtyper |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons`-elementet er det mest konfigurerbare av kirketypene: svaret `layout` velger mellom `browse` (den eldre fullstendige nettleseren), `grid`, `list` eller `featuredLatest`, der `playlistId`, `itemCount`, `showTitles` og `showDates` finjusterer layoutene som ikke er `browse`.

`rawHTML`-elementet har to svar: `rawHTML` (markup) og `javascript`. Skript som settes inn via `innerHTML` kjøres aldri, så `RawHTMLElement` oppretter på nytt hver `<script>`-node i markupen som et nytt element. Disse nodene, som ikke er satt inn av parseren, er klarert under CSP-en `strict-dynamic`. Et `javascript`-svar som begynner med `<` (et leverandørutdrag limt inn med sine `<script>`-tagger) tolkes som markup og behandles på samme måte. Ellers kjøres det som et vanlig inline-skript. B1Admin markerer en ren URL i JavaScript-feltet, fordi en enkelt URL kjøres som et skript uten virkning. `map`-elementet gjengir ingenting, og laster ikke noe Google Maps-skript, når ingen Maps API-nøkkel er konfigurert.

### Gjengivere (`@churchapps/apphelper`)

Gjengiverne ligger i `Packages/apphelper/src/website/components/elementTypes/`, én komponent per type, og slås opp gjennom `ElementRegistry.ts` — et kart i to lag der `Element.tsx` registrerer standardgjengiveren for alle 35 typene (`registerDefaultElementRenderer`), og en vertsapp kan overstyre hvilken som helst av dem under kjøring (`registerElementRenderer`) uten å forke pakken.

### Redigeringsskjemaer (B1Admin)

Redigeringsskjemaene for innstillinger per type ligger i `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` sender videre til en egen komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) eller en innebygd feltbygger per type. Den KI-vendte speilingen av denne katalogen er API-ets MCP-verktøy `describe_page_builder` (se [MCP-server](../api/mcp)).

Forhåndsvisningen i editoren monterer det samme `Theme` som det live nettstedet, som setter CSS-variablene `--headingFont` / `--bodyFont` fra menighetens globale stiler. B1App bruker disse variablene via `pages.css`, som B1Admin ikke kan importere, så `ContentEditor.tsx` injiserer `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) for å bruke dem på brødtekst i `.page` og `h1`–`h6`. Uten den viste forhåndsvisningen overskrifter i administrasjonsfonten.

### Formdelere for seksjoner

Seksjoner kan ha dekorative formdelere på begge kanter. Konfigurasjonen ligger i seksjonens `answersJSON` som objektene `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` der `shape` er én av `wave, waves, slant, curve, triangle, peaks`. Apphelper leverer komponenten `SectionDivider` og hjelpefunksjonen `parseDividerConfig()`; begge appenes Section-gjengivere (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) leser svarene og monterer deleren, og `SectionEdit.tsx` i B1Admin gir velgergrensesnittet. Pakkene leverer bare byggeklossen — koblingen på seksjonsnivå er de konsumerende appenes ansvar.

## Kirkedataelementer

Tre elementtyper gjengir levende kirkedata i stedet for skrevet innhold. Modulisolasjon gjelder fortsatt — hvert av dem kaller den eiende modulens egne offentlige endepunkt direkte fra nettleseren:

| Element | Endepunkt | Merknader |
|---------|----------|-----------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerer `{ fundId, totalAmount, donationCount }`, med valgfritt tidsvindu `?startDate=&endDate=`; elementet sammenligner det med svaret `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Kun ved valg**: gruppen må ha `publicRoster` satt (standard av). Projeksjonen er bevisst minimal — `personId`, `displayName`, `leader`, bilde — uten kontakt- eller demografiske felt |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerer treet campus → gudstjeneste → tid; apphelper-gjengiveren lager etter beste evne schema.org `Event` JSON-LD ut fra det (API-et returnerer rene data) |

:::warning
`publicRoster` er personvernsporten for `staffGrid`. Utvid aldri den offentlige projeksjonen av gruppemedlemmer, og omgå aldri flagget — rosterendepunktet er anonymt med vilje, og den minimale feltlisten er sikkerhetsegenskapen.
:::

### Kalenderelementet og arrangementssider

Svarene til `calendar`-elementet er `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, standard, eller `upcoming`) og `tag`. B1App overstyrer apphelper-gjengiveren i `src/components/Element.tsx` med `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** gjengir B1Apps `UpcomingEventsElement`: den laster `GET /content/events/public/group/:churchId/:groupId` eller `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, utvider gjentakelser med `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, én forekomst per arrangement innenfor ett år), og viser de første 12 som bildeflater (`events.photoUrl`, med tittelen på temaets mørke farge som reserve) som lenker til `/events/{id}`, med en Abonner-meny for kalenderens ICS-feed.
- **`display: "month"`** gjengir apphelpers `CalendarElement` med en `eventUrl`-callback. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigerer da til den URL-en ved klikk i stedet for å åpne detaljdialogen (B1Admin sender ingen `eventUrl`, så admin-kalenderen beholder dialogen).
- **`tag`** filtrerer begge visningene med `EventHelper.hasTag()` (`@churchapps/helpers`): en store/små-bokstav-uavhengig treff mot den kommaseparerte `events.tags`; tom viser alt. Sammenkoblingen av kuraterte kalendere velger `e.tags`, slik at kuraterte arrangementer har dem.

Kuraterte arrangementer lenker med `realEventId` (`eventPageId()`), så URL-en navngir alltid det underliggende arrangementet. `/{sdSlug}/events/[eventId]` er en egen rute (ikke byggerflyten): den laster `GET /content/events/public/:churchId/:id` — som returnerer `null` for ventende/avviste arrangementer og for private arrangementer uten påmelding, og legger til `roomNames` fra ikke-avviste romreservasjoner — gjengir `EventPageContent` (bildeoverskrift, beskrivelse i markdown, sidefelt med Når/Hvor, **Meld deg på dette arrangementet** når `registrationEnabled` er satt, og en lenke **Legg til i min kalender** til `GET /content/events/public/:churchId/:id/ical`), bruker bildet som Open Graph-bilde, og sender ut `Event` JSON-LD for neste forekomst via `EventPageJsonLd`. Et ukjent eller skjult arrangement gir en ekte 404.

## Widgeter for hele nettstedet

To widgeter vises på hver offentlig side i stedet for inne i treet: **AnnouncementBanner** (et lukkbart banner øverst på siden) og **Launcher** (en flytende handlingsmeny for lenker til gi/besøk/se-type). Begge komponentene og deres `parse*Config()`-hjelpefunksjoner leveres i apphelper. Konfigurasjonen er to offentlige innstillingsrader — nøklene `announcementBanner` og `launcher` — skrevet av B1Admins `SiteWidgetsEdit` (på siden Utseende) og lest av B1Apps offentlige layout via `GET /content/settings/public/:churchId`. API-et behandler disse som ugjennomsiktige nøkkel-verdi-par; nøkkelnavnene er en konvensjon mellom de to appene.

## Blogg {#blog}

Bloggen er en frittstående innholdstype, ikke et lag over byggersider. En `posts`-rad holder hele innlegget: `title`, `slug`, `excerpt`, `content` (markdown-brødtekst), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Offentlig flate (alt anonymt, `PostController`):

| Rute | Formål |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publiserte innlegg, filtrerbare med `?category=&tag=`, paginert |
| `GET /content/posts/public/:churchId/categories` | Ulike kategorier på tvers av publiserte innlegg |
| `GET /content/posts/public/:churchId/slug/:slug` | Ett publisert innlegg |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0-feed, med tittel etter menighetens navn, og med kategori og utdrag-eller-innhold som beskrivelse per element |

Et innlegg er "publisert" når `publishDate` er satt og har passert; en fremtidig `publishDate` er et planlagt innlegg (skjult offentlig, vist med en Planlagt-brikke i admin). Lesendepunktene beriker hvert innlegg med `authorName`, slått opp fra `authorId` gjennom membership-modulens gateway. Manglende utdrag faller tilbake til markdown-innholdet uten formatering (~160 tegn) i listekort, metabeskrivelser og RSS. B1App serverer `/{sdSlug}/blog` — en redaksjonell liste (midtstilt overskrift som blir navnet på den aktive kategorien/taggen når det filtreres, en rad med kategori-brikker som filter, innleggsrader med miniatyrbilde til venstre med byline og utdrag) med RSS-feeden annonsert som alternativ lenke — og `/{sdSlug}/blog/[postSlug]`, en egen rute (ikke Zone/Section-flyten) med midtstilt overskrift (kategoriovertekst, tittel, byline, aksentstrek i primærfarge), et 16:9-bilde i full containerbredde, brødteksten i markdown i en lesekolonne på ~720 px, tagg-brikker i artikkelens bunn, en stripe med `"Mer i {category}"`-relaterte innlegg, og `BlogPosting` JSON-LD inkludert forfatteren. Begge sidene styles utelukkende fra temaets tokens, slik at de arver hver menighets palett. Blogg-URL-er er med i menighetens sitemap. B1Admins forfatterverktøy (**Nettsted → Blogg**) redigerer innlegg i en dialog: markdown-editor med forhåndsvisningsbryter, bildevelger for galleri med 16:9-beskjæring, forfatter-velger for personer (standard er brukeren som redigerer), autofullføring av kategorier basert på eksisterende kategorier, validering av dupliserte slugger og en publiseringsbryter; publiserte rader lenker ut til det live innlegget, og siden minner administratorer om å legge til en `/blog`-navigasjonslenke.

## Sider kun for medlemmer

`pages.visibility` gjenbruker enumet for navigasjonslenker — `everyone` (standard), `visitors`, `members`, `staff`, `team`, `groups` (med `groupIds`) — men som en **hard tilgangsport**, ikke et navigasjonsfilter (`PageVisibilityHelper.canViewPage`). Flyten:

1. Det anonyme trekendepunktet sjekker synlighet på URL-baserte hentinger. Anonyme kallere av en låst side får `{ restricted: true, visibility }` i stedet for innhold — treet lekker aldri.
2. Endepunktet respekterer fortsatt en JWT: `CustomAuthProvider` verifiserer `Authorization`-headeren på *hver* forespørsel, også på anonyme ruter, så et autentisert medlems henting av samme URL løses normalt.
3. B1App gjengir `RestrictedPage` på et `restricted`-svar: den gjenoppretter økten fra lagrede legitimasjonsdata, henter treet på nytt med JWT-en og gjengir det — eller viser en innloggingsport med en `returnUrl` når det ikke finnes noen økt.

:::info
Porten har ulik granularitet på ulike nivåer: `groups` sjekker tokenets `groupIds` mot sidens liste og `staff` sjekker `membershipStatus`, men `members` og `team` slipper for øyeblikket gjennom enhver autentisert bruker i menigheten. Behandle `groups` som det strenge alternativet.
:::

## SEO og synlighet {#seo-and-discoverability}

Alt dette er gjengivelse på B1App-siden over ContentApi-data — API-et lagrer, appen sender ut:

| Tema | Slik fungerer det |
|---------|--------------|
| Metabeskrivelser | `pages.metaDescription` (≤300 tegn) går via `MetaHelper.getMetaData()` inn i Next.js `Metadata` (description + Open Graph) på hver builder-gjengitt rute. Sideinnstillingene i B1Admin har en KI-knapp **Generer** (se nedenfor) |
| Omdirigeringer | Omdirigeringsrader per menighet som administreres på `/content/redirects` (`content.edit`, grense på 200 rader, normaliserte stier). Ved en potensiell 404 slår B1Apps sideroute opp stien mot `GET /content/redirects/public/:churchId` og sender en HTTP 308 via Nexts `permanentRedirect`; stier uten treff faller videre til `notFound()` |
| Merket 404-side | `not-found.tsx` gjengir `BrandedNotFound` med menighetens logo, navn og tema i stedet for en generisk feilside. Ukjente `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` og `/volunteer/[planId]`-stier gir en ekte 404, det samme gjelder ukjente underdomener og ugyldige sideslugger (se [Nettstedsruting og flere nettsteder](./websites)) |
| Strukturerte data | `BlogPosting` JSON-LD på blogginnlegg; `VideoObject` på de enkelte preken-sidene (`/{sdSlug}/sermons/[sermonId]`) og på sider som inneholder et `sermons`-element; `Event` fra kalender-/arrangementselementer på byggersider og på hver `/{sdSlug}/events/[eventId]`-side (neste forekomst, med arrangementets bilde som `image`); schema.org `Event` fra `serviceTimes`-elementet |
| Preken-sider | Hver offentlig preken får en søkbar side på `/sermons/[sermonId]` med full metadata — preken er ikke lenger låst inne i den klientbaserte nettleserkomponenten |
| Analyse | Den offentlige innstillingsnøkkelen `ga4MeasurementId` (administreres ved siden av omdirigeringer i B1Admin) injiserer en GA4 gtag per menighet via `next/script`. B1-appen (`/{sdSlug}/mobile`) sender også sidevisninger til den ID-en, ved siden av ChurchApps' egen tagg, når den er en gyldig `G-`-ID (GTM-container-ID-er forblir bare for nettstedet). Hvert `gtag('config')`-kall har en `display_mode` på `installed` eller `browser`, basert på `navigator.standalone` eller medieforespørselen `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap og feeder | Ruten for menighetens `sitemap.xml` tar med byggersider, blogg-URL-er og de 50 nyeste preken-sidene (med `<lastmod>` fra hver prekens publiseringsdato). Den lister også de innebygde sidene `/sermons`, `/groups` og `/volunteer` når de har innhold (offentlige grupper, påmeldingsplaner), med mindre en lagret omdirigering erstatter stien. `/` utelates når menigheten ikke har en hjemmeside, fordi `/` da omdirigerer til det ikke-tillatte `/mobile`. Bloggoversikten annonserer RSS-feeden |
| Tilgjengelighet | Det offentlige skallet gjengir en hoppelenke til `<main id="main-content">`-landemerket i hver layout-wrapper |

## KI-generering (AskApi)

Generering av sider og nettsteder kjøres i **AskApi**, en egen tjeneste, under `/website`-kontrolleren. Den autentiserer med samme `CustomAuthProvider`-JWT som alt annet og er **tilstandsløs med hensyn til innhold**: hvert endepunkt returnerer JSON, og kalleren (B1Admin) lagrer resultatet gjennom ContentApi (`POST /content/pages/importTree` oppretter en side med hele det nestede seksjons- og elementtreet i ett kall; det setter alltid inn under kallerens menighet og ignorerer id-er i innholdet).

### Sidegenerering (`planPage` → `writePage`)

KI-malen "AI" i B1Admins `AddPageModal` bruker en rimelig pipeline (`AskApi/src/helpers/SiteGenHelper.ts`) bygget på én regel: **ingen modell sender ut builder-JSON**. To modeller deler arbeidet via Vercel AI Gateway (vanlig HTTP, SSM-nøkkel `/{env}/aiGatewayApiKey` eller `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — en typet beslutningsmodell som returnerer valg, poeng og boolske verdier med sannsynligheter, men ikke kan skrive tekst. Den velger hver seksjon etter tur fra et fast malbibliotek, poengsetter layouter, faktasjekker tekst og velger stockbilder og ikoner. Input koster omtrent 0,04 USD per million tokens og output er gratis, så ~90 kall per side koster en brøkdel av en cent.
- **En liten chat-modell (GPT-4.1 mini som standard)** — fyller ut de navngitte, lengdebegrensede tekstfeltene i de valgte malene. Skriveren er én konstant, som kan overstyres med miljøvariabelen `SITEGEN_COPY_MODEL` (en hvilken som helst chat-modell-ID på gatewayen, f.eks. `anthropic/claude-haiku-4.5`). I en blindsammenligning av tre menigheter leste Claude Haiku 4.5 litt varmere, men GPT-4.1 mini lå tett, omtrent 4 ganger billigere og raskere, så den er standard. En full side med alle tre layoutene koster omtrent 1,3 cent, rundt 80 % av det går til skriveren.

| Fase | Endepunkt | Hva skjer |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Klassifiserer sidetypen (hjem, besøk, om …), trekker deretter 10 kandidatlayouter fra JEVs sannsynligheter per runde (helt + antall seksjoner → hver seksjon → avslutning), fjerner duplikater, lar JEV poengsette hver for passform/flyt/hull, og returnerer de 3 beste pluss en skrivestemme og en `suggestedStyle` (palett + fonter). Kandidater som deler de samme seksjonene så langt, stiller JEV det identiske spørsmålet, så runder huskes etter prefiks. En beste poengsum under 6 logges som `lowLayoutScore` — den loggen er etterslepet av maler som er verdt å legge til. ~2 s |
| 2 | `POST /website/writePage` (ett kall per kandidat) | Skriveren fyller ut feltteksten to seksjoner per kall, parallelt, og returnerer fem hovedoverskrifter som JEV velger mellom; JEV faktasjekker hver seksjon; seksjoner som feiler, bruker en standardfrase, eller gjentar en tidligere seksjon (delte 4-ords sekvenser, sjekket i kode) skrives om parallelt med den spesifikke årsaken; en kodebasert opprydding fjerner setninger med standardfraser fra kirkesider (med mindre menighetens egen beskrivelse bruker dem); JEV velger fotomotiver, ikoner og heltens formdeler, og poengsetter resultatet. Returnerer et ferdig seksjonstre for lagring og en poengsum. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin skriver bare den best rangerte layouten (den nest beste er reserve hvis skrivingen feiler), lagrer den og åpner forhåndsvisningen (~10 s etter Lagre) |

Hver fase er sitt eget kall, slik at hvert kall holder seg innenfor API Gateways grense på 29 sekunder. Malene i `SiteGenHelper.buildTree` er faste seksjons- og elementtrær fra katalogen (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) og refererer til temategenskaper (`var(--accent)`, `var(--lightAccent)` …), slik at genererte sider arver menighetens eksisterende utseende. Å legge til en seksjonsmal betyr å legge dens feltliste til `SECTIONS` og dens tre til `buildTree`; enhetstesten går gjennom alle malene og validerer treet.

**Input.** Tekst får bare angi fakta fra to kilder: det brukeren skrev, og `churchContext.facts` — poster B1Admin samler inn før planlegging (offentlige gudstjenestetider og navn på offentlige grupper, samt menighetens navn og adresse). De samme flaggene styrer datadrevne maler: `times` gjengir det levende `serviceTimes`-elementet når menigheten har gudstjenestetider i B1 (ellers en skrevet tabell), og `groups` og `countdown` tilbys bare når det finnes data bak dem. JEV-kall er avdekket — et duplikat sendes etter 1,5 s og det første svaret vinner — fordi gatewayen av og til henger, og kallene er nesten gratis.

**Hold deg til emnet.** Brukerens melding er *emnet for siden*, ikke bakgrunn om menigheten. `planPage` klassifiserer forespørselen (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), og for `event`- og `topic`-sider tilbys ikke de generelle menighetsmalene i det hele tatt (pastornotat, prekener, tjenester, grupper, samfunnspåvirkning, ukentlige tider og nedtelling, videohelt), mens `details` (når / hvor / hva du tar med) og en dato-`eventCountdown` tilbys. Begge dommerne poengsetter om innholdet holder seg til emnet. B1Admin sender `pageType` fra planen inn i hvert `writePage`-kall.

**Fullstendige sider fra korte forespørsler.** Sider har tre til seks midtseksjoner, romslige feltlengder, en innledningslinje på kortseksjoner og en FAQ med fem spørsmål, og reparasjonssteget utvider enhver seksjon som kommer tilbake tynn. Generering skjer med ett klikk: det finnes ingen oppfølgingsspørsmål. Der forespørselen utelater en vanlig detalj en komplett side trenger (et starttidspunkt, et rom, hva du tar med, hvordan man melder seg på), fyller skriveren inn et plausibelt, beskjedent valg som menigheten kan redigere. Fordi seksjoner skrives parallelt, avgjøres disse hullene **én gang**, i `planPage` (`assumedDetails`, ett lite skrivekall som kjører sammen med layoututvalget), og sendes tilbake inn i hvert `writePage`-kall gjennom `churchContext.assumedDetails`, slik at én seksjon ikke kan si 5:00 mens en annen sier 5:30. JEV reparerer enhver seksjon som strider mot forespørselen, menighetens registre eller de avgjorte detaljene. De avgjorte detaljene vises ikke i grensesnittet; menigheten gjennomgår og redigerer siden som alle andre. Noe lages aldri opp: navn på personer, telefonnumre, e-post- og nettadresser, priser, statistikk, menighetens historie, sitater tilskrevet personer, og en ukedag for en dato forespørselen ikke oppga en for.

**Visuelle elementer.** Maler navngir aldri sine bilder eller ikoner. De lar plasser stå åpne, og ett generisk pass (`visualSlots` → `pickVisuals` → `applyVisuals` i `SiteGenHelper`) går gjennom det ferdige treet og fyller hver enkelt: en seksjonsbakgrunn eller et gallerielement merket `auto:photo`, et `auto:icon`, heltens `auto:divider`, og — uten noen markør i det hele tatt — ethvert `textWithPhoto`-, `card`- eller `image`-element der `photo` er tom. JEV velger hver enkelt ut fra teksten ved siden av (et korts foto ut fra kortets tittel og tekst; en bakgrunn ut fra seksjonens tekst), uten at et motiv gjentas på en side. En ny mal får derfor bilder gratis. Bilder er Pexels-søkemotiver som sendes ut som `pexels:<term>`-plassholdere, som B1Admin løser gjennom `POST /content/stock/search`; en klient som ikke sender `resolvesPhotos` får i stedet et innebygd heltebilde, flate fargede bånd og kort uten bilde. Det finnes bevisst ingen motiver med portretter, og pastormalen har ikke noe bilde: et stockbilde av en fremmed må aldri stå i stedet for en ekte person. For en menighet uten sider ennå, bruker B1Admin `suggestedStyle` på de globale stilene; eksisterende nettsteder beholder utseendet sitt.

### Andre endepunkter

:::info
Rewrite-knappen i `SectionToolbar` og knappen **Generer nettsted** på sidelisten i B1Admin er fortsatt utkommentert på klientsiden. AskApi-endepunktene nedenfor svarer fortsatt; bare det grensesnittet er skjult.
:::

| Endepunkt | Formål |
|----------|--------|
| `POST /website/generatePageOutline` → `generateSection` | Den opprinnelige todelte sideflyten (oversikt, deretter ett LLM-kall per seksjon som sender ut element-JSON). Erstattet i B1Admin av `planPage`/`writePage` på grunn av kostnad; beholdt for API-forbrukere |
| `POST /website/generateSite` | Generering av hele nettstedet. **Tofaset med vilje**: et `planOnly: true`-kall returnerer bare den flersidige planen (ett raskt modellkall), og klienten ber deretter om fullt innhold — slik at hver forespørsel holder seg innenfor Lambda/API Gateway-tidsgrensen |
| `POST /website/rewriteSection` | Omskriving som bevarer strukturen: modellen får bare endre tekstbærende svar. En rekursiv strukturssignatur (id-er + typer + rekkefølge) sammenlignes før og etter; enhver avvik returnerer den opprinnelige seksjonen med `fallback: true` i stedet for ødelagt struktur |
| `POST /website/generateAltText` | Synkallet over opptil 20 bilde-URL-er; returnerer kort alt-tekst (≤125 tegn, med "photo of"-prefikser fjernet) |
| `POST /website/generateMetaDescription` | Én SEO-metabeskrivelse (≤155 tegn) fra sidens tekstinnhold — koblet til Generer-knappen i B1Admins sideinnstillinger |

Prompter for disse endepunktene er markdown-filer under `AskApi/config/instructions/`, inkludert elementkatalogen modellen genererer fra. To designvalg holder katalogen ærlig: klienten sender `availableElementTypes` med hver forespørsel (prompten får bare bruke typer fra den listen — serveren hardkoder aldri hele settet), og API-ets MCP-verktøy `describe_page_builder` bærer den samme veiledningen for KI-agenter som jobber gjennom [MCP](../api/mcp). Modellene er Anthropic Claude via OpenRouter — 3.5 Haiku for seksjonsinnhold (latens), 3.5 Sonnet for oversikter, nettstedsplaner og syn — med en OpenAI-reserve når ingen OpenRouter-nøkkel er konfigurert.

## Samtalebaserte skjemaer

Skjemaer (membership-modulen) fikk en samtalemodus rettet mot sider i stil med kontaktkort. Fire kolonner på `forms` styrer den: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Gjengivelse** — apphelpers `FormSubmissionEdit` bytter til komponenten `ConversationalForm` (ett spørsmål om gangen) når `displayMode` er `conversational`; B1Apps skjemaside sender modusen videre. Samme innsendingsnyttelast uansett.
- **Automatisk opprettelse av person** — ved innsending med `autoCreatePerson` satt, dedupliserer `ConversationalFormHelper.findOrCreatePerson` på e-post (uten store/små-bokstav-forskjell) og oppretter ellers en husstand + person med `membershipStatus: "Guest"`, og knytter deretter innsendingen til den personen.
- **Oppfølgings-e-post** — når et emne og en tekst er satt, får innsenderen en malbasert e-post (med tokenene `{firstName}` / `{churchName}`) gjennom den eksisterende transaksjonsveien (`TransactionalEmailHelper`), aldri gjennom varselsdigesten. Begge bieffektene er ikke-fatale: en feil mister aldri innsendingen.

De fire feltene settes via API-et i dag; skjemaeditoren i B1Admin viser dem ikke ennå.

## Hurtigbuffer for det offentlige nettstedet

B1Apps offentlige gjengivelsesvei bufrer menighetsmerkede hentinger (`next: { revalidate: 300, tags: [sdSlug] }` i produksjon; `0` i utvikling), slik at en live side kan være utdatert i opptil fem minutter etter en skriving til ContentApi. `POST /api/revalidate/{sdSlug}` på B1App kaller `revalidateTag(sdSlug)` og er den eneste måten å fjerne bufferen tidlig på.

To skrivere treffer den:

1. **B1Admin** — `clearSiteCache()` i `B1Admin/src/site/siteCache.ts` sender POST etter lagringer i editoren. Den foretrekker det aktive nettstedets underdomene (et sekundært nettsted må tømme *den* taggen, ikke menighetens standard).
2. **Api** — innholdsendringer som aldri går gjennom B1Admin (API-nøkler, MCP, KI) utløser `SiteCacheHelper.bump(churchId)` fra innholdskontrollerne. Hjelperen finner menighetens underdomene via `SubDomainHelper` og sender POST til `{b1AppRoot}/api/revalidate/{sd}`. Feil svelges, slik at en utilgjengelig B1App aldri kan få en lagring til å feile.

Kontrollerne som utløser tømming: sider (lagre, slette, duplisere, publisere, forkaste, avpublisere, KI-midlertidig), seksjoner, elementer, blokker, lenker, globale stiler, innlegg og omdirigeringer. Dev-verdien for `b1AppRoot` er `http://{subdomain}.localtest.me:3301`; demo/produksjon bruker `https://{subdomain}.b1.church`.

## Relaterte sider

- [Nettstedsruting og flere nettsteder](./websites) — hvordan en forespørsel løses til en menighet/et nettsted, og hvordan egne domener rutes
- [Innholdsendepunkter](../api/endpoints/content) — hele REST-flaten for sider, seksjoner, elementer, blokker, innlegg, omdirigeringer og innstillinger
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer gjengiverne, registeret, formdelerne og widgetene
- [MCP-server](../api/mcp) — inkludert verktøyet `describe_page_builder`-veiledningen
- [Sideeditor (sluttbruker)](/docs/b1-admin/website/page-editor) — dokumentasjonen for editoren for ansatte
