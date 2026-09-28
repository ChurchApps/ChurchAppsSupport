---
title: "Arkitektur for nettstedbygger"
---

# Arkitektur for nettstedbygger

<div class="article-intro">

Hvert kirkenettsted som betjenes av B1App blir gjengitt fra et innholdstre — sider, seksjoner, elementer — lagret i ContentApi og redigert visuelt i B1Admin. Ett delt komponentbibliotek gjengir både editorforhåndsvisningen og det aktive nettstedet, en katalog med elementtyper definerer hva som kan vises på en side, og en separat AI-tjeneste kan generere eller omskrive dette treet. Denne siden kartlegger hele stacken: elementkontrakten i `@churchapps/helpers`, gjengivelsespipeline, kirkedata-elementer, nettstedwide-widgets, blogglaget, tilgangsstengede sider, SEO, AI-generering og samtaleslutter.

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

Tre regler holder seg gjennom hele stacken:

1. **Ett tre, to gjengivere.** En side er et `pages → sections → elements`-tre der hver node bærer innstillingene sine som en `answers` JSON-blob. De samme apphelper-komponentene gjengir både drag-and-drop-editoren i B1Admin og det servergjengitt offentlige nettstedet i B1App — det finnes ingen separat «publikasjonsformat».
2. **Kontrakten lever i `@churchapps/helpers`.** `ElementTypes.ts` er den eneste katalogen over elementtyper; gjengivere løses gjennom et register i apphelper; editorskjemaer lever i B1Admin. Hvis du legger til en elementtype, må du berøre alle tre, i den rekkefølgen.
3. **Det offentlige nettstedet leser anonyme endepunkter.** Alt som B1App trenger — sidetræet, innstillingene, blogginnleggene, omdirigeringene og kirkedataendepunktene i andre moduler — er offentlig. Godkjenning er valgfri: en JWT på det anonyme trepunktets endepunkt låser opp sider kun for medlemmer, ingenting annet endres.

## Innholdstre

Innholdsmodulen (`Api/src/modules/content`) eier byggerens data:

| Tabell | Rolle |
|-------|------|
| `pages` | Én side per URL: `url`, `title`, `layout`, pluss `visibility`/`groupIds` (tilgangsperre) og `metaDescription` (SEO) |
| `sections` | Horisontale bånd på en side (eller i en blokk): bakgrunn, tekstfarge og en `answersJSON` som bærer styling pluss `dividerTop`/`dividerBottom` formdelerinnstillinger |
| `elements` | Innholdsbiter innenfor en seksjon: `elementType` + `answersJSON`, nestelbar for layouttyper (rad/kolonne, karusell) |
| `blocks` | Gjenbrukbare seksjon-/elementgrupper (foterblokkker, elementblokkker) delt på tvers av sider |
| `posts` | Frittstående blogginnlegg (se [Blog](#blog)) |
| `redirects` | Per-kirke `fromPath → toPath`-par, begrenset til 200 (se [SEO](#seo-and-discoverability)) |
| `settings` | Nøkkel-verdi-kirkeinnstillinger; rader flagget `public` serveres anonymt og bærer widget-/analyseinnstillingen |

Hele treet for en URL kommer tilbake fra ett enkelt anonymt kall — `GET /content/pages/:churchId/tree?url=/about` — dette er hva B1App servergjengir fra. Editorkall henter etter id i stedet og beholder interne ids.

## Elementkontrakten

### Katalogen (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definerer hver elementtype som en `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, og et JSON-schema-stil `answersSchema` for svarene sine. `validateElementAnswers()` er bevisst tilgivende — ukjente typer og ekstra nøkler passerer, så gammelt innhold brytes aldri ved en katalogoppgradering. **35 typer sendes i dag:**

| Kategori | Elementtyper |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons`-elementet er det mest konfigurerbare av kirketype-typene: et `layout`-svar velger `browse` (den gamle fulle nettleseren), `grid`, `list` eller `featuredLatest`, med `playlistId`, `itemCount`, `showTitles` og `showDates` som foredles på ikke-browse-layoutene.

### Gjengivere (`@churchapps/apphelper`)

Gjengivere lever i `Packages/apphelper/src/website/components/elementTypes/`, en komponent per type, løst gjennom `ElementRegistry.ts` — et to-lags kart der `Element.tsx` registrerer standardgjengiver for alle 35 typer (`registerDefaultElementRenderer`) og en vertapplikasjon kan overstyre hvilken som helst av dem under kjøring (`registerElementRenderer`) uten å forgrene pakken.

### Editorskjemaer (B1Admin)

Editorens per-type innstillingsskjemaer lever i `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` sender til en dedikert komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) eller en inline-feltbygger per type. AI-vendt speilingen av denne katalogen er API-ens MCP `describe_page_builder`-verktøy (se [MCP Server](../api/mcp)).

### Seksjonsformdeler

Seksjoner kan bære dekorative formdeler på hver kant. Innstillingen lever i seksjonens `answersJSON` som `dividerTop` / `dividerBottom` objekter — `{ shape, color, height, flip }` med `shape` en av `wave, waves, slant, curve, triangle, peaks`. Apphelper sender `SectionDivider`-komponenten og `parseDividerConfig()`-helperen; begge appenes seksjonsgjengiver (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analyserer svarene og monterer deleren, og `SectionEdit.tsx` i B1Admin gir plukker-UI. Pakkene sender bare byggeklossene — seksjonnivået-ledningen er forbruksappenes arbeid.

## Kirkedata-elementer

Tre elementtyper gjengir live kirkedata i stedet for forfatterinnhold. Modulisolasjon gjelder fortsatt — hver kalles eiermodulens eget offentlige endepunkt fra nettleseren:

| Element | Endepunkt | Merknader |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerer `{ fundId, totalAmount, donationCount }`, valgfritt `?startDate=&endDate=`-vindu; elementet sammenligner det med sitt `goalAmount`-svar |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Kun valg**: gruppen må ha `publicRoster` satt (standard av). Projeksjonen er bevisst minimal — `personId`, `displayName`, `leader`, foto — ingen kontakt- eller demografifelter |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerer campus → service → tidstreet; apphelper-gjengiver sender beste innsats schema.org `Event` JSON-LD fra det (API-en returnerer rene data) |

:::warning
`publicRoster` er privatlivsporten for `staffGrid`. Utvid aldri den offentlige gruppemedlemprosjeksjonen eller omgå flagget — godkjenningsendepunktet er anonymt ved design og minimumfeltlisten er sikkerhetsegenskap.
:::

## Nettstedinterne widgets

To widgets gjengis på alle offentlige sider i stedet for innenfor treet: **AnnouncementBanner** (avvisbar toppsidestolpe) og **Launcher** (flytende handlingsknutepunkt for gi/besøk/watch-stilkoblinger). Både komponenter og deres `parse*Config()`-hjelper sendes i apphelper. Innstillinger er to offentlige innstillingsrader — nøkler `announcementBanner` og `launcher` — skrevet av B1Admin's `SiteWidgetsEdit` (på Appearance-siden) og lest av B1App's offentlige layout via `GET /content/settings/public/:churchId`. API-en behandler disse som ugjennomsiktig nøkkel-verdi-par; nøkkelnavn er en konvensjon mellom de to appene.

## Blogg

Bloggen er en frittstående innholdstype, ikke et lag over byggesider. En `posts`-rad holder hele innlegget: `title`, `slug`, `excerpt`, `content` (markdown-kropp), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Offentlig overflate (alle anonyme, `PostController`):

| Rute | Hensikt |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publiserte innlegg, filtrerbar etter `?category=&tag=`, paginert |
| `GET /content/posts/public/:churchId/categories` | Ulike kategorier på tvers av publiserte innlegg |
| `GET /content/posts/public/:churchId/slug/:slug` | Ett publisert innlegg |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0-feed, titlet med kirkens navn, med per-gjenstand kategori og utdrag-eller-innhold-beskrivelse |

Et innlegg er «publisert» når `publishDate` er satt og forbi; en fremtidig `publishDate` er et planlagt innlegg (skjult offentlig, vist med en Scheduled-brikke i admin). Leseendepunkter beriker hvert innlegg med `authorName`, løst fra `authorId` gjennom gatewaymodulen for medlemskap. Manglende utdrag faller tilbake til strippet-markdown-innhold (~160 tegn) i listekort, metabeskrivelser og RSS. B1App serverer `/{sdSlug}/blog` — en redaksjonell liste (sentrert overskrift som blir det aktive kategori-/merkenavn når filtrert, kategori-brikke-filterrad, miniatyrbilde-venstre innlegg-rader med byline og utdrag) med RSS-feeden reklamert som en alternativ kobling — og `/{sdSlug}/blog/[postSlug]`, en dedikert rute (ikke Zone/Section-pipeline) med sentrert overskrift (kategori-sparrer, tittel, byline, primær-farge-aksent-regel), en 16:9-helt ved containerbredde, markdown-kroppens i en ~720px-lesningskolonne, merkebrikker i artikkel-fotere, en `"More in {category}"`-relatert-innlegg-stripe, og `BlogPosting` JSON-LD inkludert forfatteren. Begge sider stil helt fra tematokener slik at de arver hver kirkes palett. Blogg-URLer er inkludert i per-kirke sitemap. B1Admin's forfattergrensesnitt (**Site → Blog**) redigerer innlegg i en dialog: markdown-editor med forhåndsvisningsomkoblinger, 16:9-beskjæret galleribildevalg, forfatter-person-valg (standard til redigeringsbrukeren), kategori-autofullfør frøt fra eksisterende kategorier, duplikat-slug-validering, og publiser-toggle; publiserte rader lenker ut til direkte innlegg, og siden oppfordrer administratorer til å legge til en `/blog`-navigasjonskoblingn.

## Sider kun for medlemmer

`pages.visibility` gjenbruker navigasjonslinkingsopptellingen — `everyone` (standard), `visitors`, `members`, `staff`, `team`, `groups` (med `groupIds`) — men som en **hard tilgangsport**, ikke et navfilter (`PageVisibilityHelper.canViewPage`). Flyten:

1. Det anonyme trepunktets endepunkt sjekker synlighet på URL-baserte hentinger. Anonyme oppringere av en portfast side får `{ restricted: true, visibility }` i stedet for innhold — treet lekker aldri.
2. Endepunktet ærer fortsatt en JWT: `CustomAuthProvider` verifiserer `Authorization`-hodet på *alle* forespørsler, inkludert anonyme ruter, slik at en godkjent medlems henting av samme URL løses normalt.
3. B1App gjengir `RestrictedPage` på ett `restricted` respons: den hydrerer økten fra lagrede legitimasjon, omhenter treet med JWT, og gjengir det — eller viser et innloggingatstengingsporter med en `returnUrl` når det ikke er noen økt.

:::info
Portens granularitet varierer etter nivå: `groups` sjekker tokens `groupIds` mot sidens liste og `staff` sjekker `membershipStatus`, men `members` og `team` godtar for tiden enhver godkjent bruker av kirken. Behandle `groups` som det strenge alternativet.
:::

## SEO og oppdagelse

Alt av dette er B1App-sidet gjengiving over ContentApi-data — API-en lagrer, appen sender:

| Bekymring | Hvordan det fungerer |
|---------|--------------|
| Metabeskrivelser | `pages.metaDescription` (≤300 tegn) flyter gjennom `MetaHelper.getMetaData()` til Next.js `Metadata` (beskrivelse + Open Graph) på hvert byggergjengitt rute. B1Admin's sidesinnstillinger inkluderer en AI «Generate»-knapp (se nedenfor) |
| Omdirigeringer | Per-kirke `redirects`-rader administrert på `/content/redirects` (`content.edit`, 200-radgrense, normaliserte baner). På en ville-være 404, B1App's siderute løser banen mot `GET /content/redirects/public/:churchId` og utsteder en HTTP 308 via Next's `permanentRedirect`; uskarpe baner faller gjennom til `notFound()` |
| Merkeblasert 404 | `not-found.tsx` gjengir `BrandedNotFound` med kirkens logo, navn og tema i stedet for en generisk feil |
| Strukturert data | `BlogPosting` JSON-LD på blogginnlegg; `VideoObject` på per-preken sider (`/{sdSlug}/sermons/[sermonId]`) og på sider som inneholder et `sermons`-element; `Event` fra kalender-/hendelseelementer på byggesider; schema.org `Event` fra `serviceTimes`-elementet |
| Prekesider | Hvert offentlig preken får en søkbar side på `/sermons/[sermonId]` med full metadata — prekener er ikke lenger låst inne i elementet på klientsiden |
| Analyser | Den offentlige innstillingsnøkkelen `ga4MeasurementId` (administrert ved siden av omdirigeringer i B1Admin) injiserer en per-kirke GA4 gtag via `next/script` |
| Sitemap og feeds | Per-kirke `sitemap.xml`-ruten inkluderer byggesider og blogg-URLer; blogglisten reklamerer RSS-feeden |
| Tilgjengelighet | Det offentlige kromen gjengir en hoppekobbling som målretter `<main id="main-content">`-landemerkene i hver layout-wrapper |

## AI-generering (AskApi)

Side- og nettstedgenerering kjøres i **AskApi**, en separat tjeneste, under `/website`-kontrolleren. Den godkjenner seg med den samme `CustomAuthProvider` JWT som alt annet og er **stateless med hensyn til innhold**: hvert endepunkt returnerer JSON og oppringeren (B1Admin) oppveier resultatet gjennom ContentApi (`POST /content/pages/importTree` lager en side med sitt fulle nestet seksjon-/element-tre i ett kall; det setter alltid inn under oppringerens kirke og ignorerer ids i kroppen).

### Sidegenerering (`planPage` → `writePage`)

AI-sidemalen i B1Admin's `AddPageModal` bruker en lavkost-pipeline (`AskApi/src/helpers/SiteGenHelper.ts`) bygget på en regel: **ingen modell utsteder noen gang bygger-JSON**. To modeller deler arbeidet gjennom Vercel AI Gateway (plain HTTP, SSM nøkkel `/{env}/aiGatewayApiKey` eller `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — en maskinmodell for typet avgjørelse som returnerer valg, poeng og boolske verdier med sannsynligheter men kan ikke skrive tekst. Den velger hver seksjon etter tur fra et fast malbibliotek, poenggi layout, faktakontroller kopi, og velger lagerbilder og ikoner. Inndata koster cirka $0,04 per million tokens og utdatae er gratis, så ~90 kall per side koster en brøkdel av en cent.
- **En liten chat-modell (GPT-4.1 mini som standard)** — fyller de navngitte, lengde-begrenset tekstsporingene til de valgte malene. Skriveren er en konstant, kan overstyres med `SITEGEN_COPY_MODEL`-miljøvariabelen (hvilken som helst chat-modell-id på gatewayen, f.eks. `anthropic/claude-haiku-4.5`). I en blind side-ved-side på tre kirker leste Claude Haiku 4.5 litt varmere, men GPT-4.1 mini var nær, grovt 4x billigere og raskere, så det er standarden. En full side med alle tre layouter koster omkring 1,3 cent, omkring 80% av den skriveren.

| Fase | Endepunkt | Hva som skjer |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Klassifiserer sidetype (hjem, besøk, om…), prøver deretter 10 kandidatlayout fra JEVs per-rundesannsynligheter (helt + seksjonsantall → hver seksjon → nærmere), dedupliker, lar JEV skår hver for passform/flyt/hull, og returnerer toppen 3 pluss en skrivestemme og en `suggestedStyle` (palett + skrifter). Kandidater som deler de samme seksjoner så langt ber JEV et identisk spørsmål, slik at rundenr huskes etter forord. En beste score under 6 er logget som `lowLayoutScore` — denne loggen er ordresamlingen av maler verdt å legge til. ~2s |
| 2 | `POST /website/writePage` (ett kall per kandidat) | Skriveren fyller seksjons-kopi to seksjoner per kall, parallelt, og returnerer fem helt overskrifter som JEV velger mellom; JEV faktakontroller hver seksjon; seksjoner som mislykkes, bruker en lagerfrase, eller gjenteller en tidligere seksjon (delt 4-ord kjørt, sjekket i kode) blir omskrevet parallelt med den spesifikke grunnen; en kodeskrub slipper setninger med lagerkirkesteder (med mindre kirkens egen beskrivelse bruker dem); JEV velger bildeemner, ikoner og helt sin formdeler, og poenggi resultatet. Returnerer et klart-til-lagring-seksjons-tre og en poengsum. ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin skriver bare det best-rangerte layoutet (løperen er en reserve hvis det skrivet mislykkes), lagrer det og åpner forhåndsvisningen (~10s etter Lagre) |

Hver fase er sin egen forespørsel slik at hvert kall blir innenfor API Gateway 29-sekunder-grense. Maler i `SiteGenHelper.buildTree` er faste seksjon + elementtrær fra katalogen (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) og referance tematokener (`var(--accent)`, `var(--lightAccent)`…), slik at genererte sider arver kirkens eksisterende utseendeinnstelinger. Hvis du legger til en seksjonsmal, legger du til sporingslisten i `SECTIONS` og sitt tre til `buildTree`; enhetstesten går gjennom hver mal og validerer treet.

**Innspill.** Kopi kan bare angi fakta fra to kilder: hva brukeren skrev, og `churchContext.facts` — records B1Admin samler før planlegging (offentlige servicetider og offentlige gruppenavn, pluss kirkens navn og adresse). De samme flaggene porter databakstøttet maler: `times` gjengir det live `serviceTimes`-elementet når kirken holder servicetider i B1 (en tastet tabell ellers), `groups` og `countdown` tilbys bare når det er data bak dem. JEV-kall beskyttes — en duplikat fyrer etter 1,5s og det første svar seirer — fordi gatewayen noen ganger staller og kallene er nesten gratis.

**Bli på emnet.** Brukerens prompt er *tema for siden*, ikke bakgrunn om kirken. `planPage` klassifiserer forespørselen (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), og for `event` og `topic`-sider tilbys ikke de generelle-kirkemaler (pastor-notat, prekener, ministerier, grupper, samfunnspåvirkning, ukentlige tider og nedtelling, videohelt), mens `details` (når / hvor / hva du skal ta med) og en dato `eventCountdown` er. Begge dommere poenggi på-tema-ness. B1Admin passerer `pageType` fra planen inn i hvert `writePage`-kall.

**Hele sider fra korte forespørsler.** Sider har tre til seks mellom-seksjoner, sjenerøse sporingstørrelser, en intro-linje på kort-seksjoner og en fem-spørsmål FAQ, og reparasjonen passerer utvider enhver seksjon som kommer tilbake tynn. Generering er en klikk: det er ingen oppfølgingsspørsmål. Hvor forespørselen utelater en ordinær detalj et komplett nettsider trenger (starttid, rom, hva du skal ta med, hvordan du registrerer deg), fyller skriveren den med et plausibelt, beskjedent valg for kirken å redigere. Fordi seksjoner skrives parallelt, disse gapene er bestemt **én gang**, i `planPage` (`assumedDetails`, ett liten skriver-kall som kjøres ved siden av layout-sampling), og passeres tilbake inn i hvert `writePage`-kall gjennom `churchContext.assumedDetails`, så en seksjon kan ikke si 5:00 mens en annen sier 5:30. JEV reparerer enhver seksjon som motsier forespørselen, kirkens poster eller de besluttede detaljer. De bestemte detaljer er ikke surfet i brukergrensesnittet; kirken ser gjennom og redigerer siden som alle andre. Noen ting er aldri erfinnfinner: navn på mennesker, telefonnumre, e-post og nettsider, priser, statistikk, kirkens historie, sitater tilskrevet mennesker, og en dag i uken for en dato forespørselen ikke ga en for.

**Visuelt.** Maler nevner aldri bildene eller ikonene deres. De lar sporingene være åpne, og ett generisk pass (`visualSlots` → `pickVisuals` → `applyVisuals` i `SiteGenHelper`) går gjennom det ferdige treet og fyller hvert: en seksjonsbackgrunn eller gallerinngang merket `auto:photo`, en `auto:icon`, helt sin `auto:divider`, og, uten markør i det hele tatt, noen `textWithPhoto`, `card` eller `image`-element hvis `photo` er tomt. JEV velger hver fra teksten ved siden av den (et korts foto fra det kortets tittel og tekst; en bakgrunn fra seksjonens kopi), uten emne gjentatt på en side. En ny mal får derfor bilder for fri. Bilder er Pexels-søkemner som sendes som `pexels:<term>`-plassholdere som B1Admin løser gjennom `POST /content/stock/search`; en klient som ikke sender `resolvesPhotos` får et innebygd helt bilde, flate fargede bånd og foto-mindre kort i stedet. Det er bevisst ingen portrettemner og pastor-malen bærer ingen foto: en lagerstranging må aldri stå i stedet for en virkelig person. For en kirke uten sider ennå, bruker B1Admin `suggestedStyle` på global-stilene; eksisterende nettsted beholder sitt utsyn.

### Andre endepunkter

:::info
`SectionToolbar`-omskrivningsknappen og sidene-listen «Generate Site»-knappen i B1Admin forblir kommentert ut klientsiden. AskApi-endepunktene nedenfor responderer fortsatt; bare det brukergrensesnittet er skjult.
:::

| Endepunkt | Hensikt |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Det opprinnelige to-trinns-sideslyten (utkast, deretter ett LLM-kall per seksjon som utsteder element-JSON). Erstattet i B1Admin av `planPage`/`writePage` fordi kostnader; holdt for API-forbrukere |
| `POST /website/generateSite` | Hele-nettsteds-generering. **To-fase etter design**: ett `planOnly: true`-kall returnerer bare multisideplanen (ett raskt modell-kall), derefter ber klienten for fullstending innhold — som holder hver forespørsel innenfor Lambda/API-Gateway timeout |
| `POST /website/rewriteSection` | Strukturbevaring omskriving: modellen kan bare endre tekstbærende svar. En rekursiv struktursignatur (ids + typer + rekkefølge) blir sammenlignet før og etter; enhver uoverensstemmelse returnerer den opprinnelige seksjonen med `fallback: true` i stedet for korrupt struktur |
| `POST /website/generateAltText` | Visjonkall over opptil 20 bilde-URLer; returnerer konsise alt-tekst (≤125 tegn, «photo of»-prefikser fjernet) |
| `POST /website/generateMetaDescription` | Én SEO-metabeskrivelse (≤155 tegn) fra siden sitt tekstinnhold — ledning til Generate-knappen på B1Admin's sidesinnstillinger |

Ledetekster for disse endepunktene er markdown-filer under `AskApi/config/instructions/`, inkludert element-katalogen modellen genererer fra. To designpunkter holder katalogen ærlig: klienten passerer `availableElementTypes` på hvert kall (ledeteksten kan bare bruke typer fra den listen — serveren hardkoder aldri det fullstendige settet), og API's MCP `describe_page_builder`-verktøy fører den samme veiledningen for AI-agenter som arbeider gjennom [MCP](../api/mcp). Modeller er Anthropic Claude via OpenRouter — 3.5 Haiku for seksjonsinnhold (latens), 3.5 Sonnet for utkast, nettstedplaner, og visjon — med en OpenAI-fallback når ingen OpenRouter-nøkkel er innstilt.

## Samtaleslutter

Skjemaer (medlemskapsmodul) fikk en samtalemodus rettet mot connect-card-stilsider. Fire kolonner på `forms` driver den: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Gjengivelse** — apphelper's `FormSubmissionEdit` byter til `ConversationalForm`-komponenten (ett spørsmål på en gang) når `displayMode` er `conversational`; B1App's skjemaside passerer modi gjennom. Same submission-nyttelast på begge måtene.
- **Auto-lag person** — på innlevering med `autoCreatePerson` satt, `ConversationalFormHelper.findOrCreatePerson` dedupliserer e-post (ikke-sensitiv) og ellers lager en husstands + person med `membershipStatus: "Guest"`, så lenker innleveringen til den personen.
- **Oppfølging-e-post** — når en emne og kropp er satt, få innleggeren en mallagt e-post (med `{firstName}` / `{churchName}`-tokener) gjennom den eksisterende transaksjonelle stien (`TransactionalEmailHelper`), aldri meldingen melding-dør. Begge bivirkninger er ikke-fatal: en feil mister aldri innleveringen.

De fire feltene er sett via API i dag; B1Admin-skjemaredigeringsprogram eksponerer dem ikke ennå.

## Offentlig-nettsted-cache

B1App's offentlig gjengir-bane cacher kirke-taggede hentinger (`next: { revalidate: 300, tags: [sdSlug] }` i produksjon; `0` i dev) slik at en aktiv side kan bli stale i opptil fem minutter etter et ContentApi-skrift. `POST /api/revalidate/{sdSlug}` på B1App ringer `revalidateTag(sdSlug)` og er den eneste måten å slippe det cache tidlig.

To skrivere rammer det:

1. **B1Admin** — `clearSiteCache()` i `B1Admin/src/site/siteCache.ts` POST-er etter editor-lagre. Det foretrekker den aktive nettstedets underdomene (et sekundært nettsted må sprenge *det* merke, ikke kirkens standard).
2. **Api** — Innholdsendringer som aldri passerer B1Admin (API-nøkler, MCP, AI) avfyrer `SiteCacheHelper.bump(churchId)` fra innholdskontrollerne. Hjelpen løser kirkens underdomene via `SubDomainHelper` og POST `{b1AppRoot}/api/revalidate/{sd}`. Feil blir svelget så et uoppnåelig B1App kan ikke mislykkes en lagre.

Kontrollere som bump: sider (lagre, slette, duplisere, publisere, kassere, avpublisere, AI temp), seksjoner, elementer, blokkker, koblinger, global-stilene, innlegg og omdirigeringer. Dev `b1AppRoot` er `http://{subdomain}.localtest.me:3301`; demo/staging/prod bruker `https://{subdomain}.b1.church`.

## Relaterte sider

- [Website Routing & Multi-Site](./websites) — hvordan en forespørsel løser til en kirke/nettsted og hvordan egne domenene rute
- [Content Endpoints](../api/endpoints/content) — full REST overflate for sider, seksjoner, elementer, blokkker, innlegg, omdirigeringer og innstillinger
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som sender gjengiver, register, deler og widgets
- [MCP Server](../api/mcp) — inkludert `describe_page_builder` veiledningsverktøy
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — dokumentasjonen for personal-vendt editor
