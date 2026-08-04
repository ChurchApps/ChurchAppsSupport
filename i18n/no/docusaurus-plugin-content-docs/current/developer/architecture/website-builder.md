---
title: "Arkitektur for nettstedbygging"
---

# Arkitektur for nettstedbygging

<div class="article-intro">

Hvert kirkenettsted betjent av B1App gjengis fra et innholdstre — sider, seksjoner, elementer — lagret i ContentApi og redigert visuelt i B1Admin. Ett delt komponentbibliotek gjengir både redaktørens forhåndsvisning og det live nettstedet, én elementtypekatalog definerer hva som kan vises på en side, og en separat AI-tjeneste kan generere eller skrive om det treet. Denne siden kartlegger hele stabelen: elementkontrakten i `@churchapps/helpers`, gjengivelsespipelinen, kirkedata-elementer, nettstedomfattende widgeter, blogglaget, tilgangssperrede sider, SEO, AI-generering, og samtalebaserte skjemaer.

</div>

## Oversikt

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — redaktør          │             │  Api — /content-modul (ContentApi)      │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        delt gjengivelsespipeline                ▼            (anon, JWT respektert)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — offentlig nettsted (Next.js)│
               │    ElementTypes.ts (katalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgeter, JSON-LD, sitemap,  │
               │    ElementRegistry, gjengivere│   │    redirects, merket 404-side   │
               │    SectionDivider, widgeter   │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ kirkedata-elementer
                                                                    ▼
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  AskApi — /website/* (AI)    │             │  /giving/funds/public/…/total           │
│  generateSite · rewriteSection│             │  /membership/groupmembers/public/…      │
│  generateAltText · metaDesc  │             │  /attendance/servicetimes/public/…      │
│  returnerer JSON; B1Admin lagrer│           └─────────────────────────────────────────┘
└──────────────────────────────┘
```

Tre regler gjelder for hele stabelen:

1. **Ett tre, to gjengivere.** En side er et `pages → sections → elements`-tre der hver node bærer sine innstillinger som en `answers`-JSON-blob. De samme apphelper-komponentene gjengir dra-og-slipp-redaktøren i B1Admin og det servergjengitte offentlige nettstedet i B1App — det finnes ikke noe separat "publiseringsformat".
2. **Kontrakten ligger i `@churchapps/helpers`.** `ElementTypes.ts` er den eneste katalogen over elementtyper; gjengivere løses gjennom et register i apphelper; redaktørskjemaer ligger i B1Admin. Å legge til en elementtype betyr å berøre alle tre, i den rekkefølgen.
3. **Det offentlige nettstedet leser anonyme endepunkter.** Alt B1App trenger — sidetreet, innstillinger, blogginnlegg, redirects, og kirkedata-endepunktene i andre moduler — er offentlig. Autentisering er valgfritt: en JWT på det anonyme tre-endepunktet låser opp bare-for-medlemmer-sider, ingenting annet endrer seg.

## Innholdstreet

Content-modulen (`Api/src/modules/content`) eier byggerens data:

| Tabell | Rolle |
|-------|------|
| `pages` | Én side per URL: `url`, `title`, `layout`, pluss `visibility`/`groupIds` (tilgangssperring) og `metaDescription` (SEO) |
| `sections` | Horisontale bånd på en side (eller i en blokk): bakgrunn, tekstfarge, og en `answersJSON` som bærer stil pluss `dividerTop`/`dividerBottom`-konfigurasjoner for formdelere |
| `elements` | Innholdsdeler inne i en seksjon: `elementType` + `answersJSON`, som kan nøstes for layouttyper (rad/kolonne, karusell) |
| `blocks` | Gjenbrukbare seksjons-/elementgrupper (bunntekstblokker, elementblokker) delt på tvers av sider |
| `posts` | Frittstående blogginnlegg (se [Blogg](#blog-posts-over-pages)) |
| `redirects` | Per-kirke `fromPath → toPath`-par, med tak på 200 (se [SEO](#seo-and-discoverability)) |
| `settings` | Nøkkel-verdi-kirkeinnstillinger; rader merket `public` betjenes anonymt og bærer widget-/analysekonfigurasjonen |

Hele treet for én URL kommer tilbake fra ett enkelt anonymt kall — `GET /content/pages/:churchId/tree?url=/about` — som er det B1App server-gjengir fra. Redaktørforespørsler henter etter id i stedet, og beholder interne id-er.

## Elementkontrakten

### Katalogen (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definerer hver elementtype som en `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, og et JSON-skjema-lignende `answersSchema` for dens svar. `validateElementAnswers()` er bevisst overbærende — ukjente typer og ekstra nøkler slipper gjennom, slik at gammelt innhold aldri knekker ved en katalogoppgradering. **35 typer leveres i dag:**

| Kategori | Elementtyper |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons`-elementet er det mest konfigurerbare av kirketypene: et `layout`-svar velger `browse` (den eldre, fulle nettleseren), `grid`, `list`, eller `featuredLatest`, med `playlistId`, `itemCount`, `showTitles`, og `showDates` som forfiner de ikke-browse-layoutene.

### Gjengivere (`@churchapps/apphelper`)

Gjengivere ligger i `Packages/apphelper/src/website/components/elementTypes/`, én komponent per type, løst gjennom `ElementRegistry.ts` — et topunkts kartlag der `Element.tsx` registrerer standardgjengiveren for alle 35 typer (`registerDefaultElementRenderer`), og en vertsapp kan overstyre hvilken som helst av dem ved kjøretid (`registerElementRenderer`) uten å forgrene pakken.

### Redaktørskjemaer (B1Admin)

Redaktørens per-type-innstillingsskjemaer ligger i `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` sender videre til en dedikert komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) eller en innebygd feltbygger per type. Den AI-vendte speilingen av denne katalogen er APIets MCP-verktøy `describe_page_builder` (se [MCP-server](../api/mcp)).

### Formdelere i seksjoner

Seksjoner kan bære dekorative formdelere på begge kanter. Konfigurasjonen ligger i seksjonens `answersJSON` som `dividerTop`/`dividerBottom`-objekter — `{ shape, color, height, flip }` der `shape` er én av `wave, waves, slant, curve, triangle, peaks`. Apphelper leverer `SectionDivider`-komponenten og hjelpefunksjonen `parseDividerConfig()`; begge appers seksjonsgjengivere (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parser svarene og monterer delelinjen, og `SectionEdit.tsx` i B1Admin gir velger-UI-et. Pakkene leverer bare byggeklossen — koblingen på seksjonsnivå er den konsumerende appens jobb.

## Kirkedata-elementer

Tre elementtyper gjengir levende kirkedata i stedet for forfattet innhold. Modulisolasjon gjelder fortsatt — hver av dem kaller den eiende modulens eget offentlige endepunkt fra nettleseren:

| Element | Endepunkt | Notater |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerer `{ fundId, totalAmount, donationCount }`, med valgfritt `?startDate=&endDate=`-vindu; elementet sammenligner det mot sitt `goalAmount`-svar |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Kun opt-in**: gruppen må ha `publicRoster` satt (av som standard). Projeksjonen er bevisst minimal — `personId`, `displayName`, `leader`, foto — ingen kontakt- eller demografiske felt |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerer campus- → tjeneste- → tidstreet; apphelper-gjengiveren sender ut best-mulig-innsats schema.org `Event` JSON-LD fra det (APIet returnerer rene data) |

:::warning
`publicRoster` er personvernsperren for `staffGrid`. Aldri utvid den offentlige gruppemedlem-projeksjonen eller omgå flagget — deltakerlisteendepunktet er anonymt med hensikt, og den minimale feltlisten er sikkerhetsegenskapen.
:::

## Nettstedomfattende widgeter

To widgeter gjengis på hver offentlige side i stedet for inne i treet: **AnnouncementBanner** (avviselig linje øverst på siden) og **Launcher** (flytende handlingshub for gi-/besøk-/se-lignende lenker). Begge komponentene og deres `parse*Config()`-hjelpere leveres i apphelper. Konfigurasjon er to offentlige innstillingsrader — nøklene `announcementBanner` og `launcher` — skrevet av B1Admins `SiteWidgetsEdit` (på Utseende-siden) og lest av B1Apps offentlige layout via `GET /content/settings/public/:churchId`. APIet behandler disse som ugjennomsiktige nøkkel-verdi-par; nøkkelnavnene er en konvensjon mellom de to appene.

## Blogg: innlegg over sider

Bloggen er et tynt metadatalag, ikke et andre innholdssystem. En `posts`-rad (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) peker på en vanlig byggerside via `pageId`; siden holder selve innholdet og redigeres i den vanlige sideredaktøren. Offentlig flate (alt anonymt, `PostController`):

| Rute | Formål |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publiserte innlegg, filtrerbare etter `?category=&tag=`, paginert |
| `GET /content/posts/public/:churchId/slug/:slug` | Ett innleggs metadata |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0-feed |

Et innlegg er "publisert" så snart `publishDate` er satt og har passert. B1App betjener `/{sdSlug}/blog` (liste, med RSS-feeden annonsert som en alternativ lenke) og `/{sdSlug}/blog/[postSlug]`, som henter den støttende sidens tre på `/blog/{slug}` og gjengir det gjennom samme Zone-/Section-pipeline som enhver annen side, og legger til `BlogPosting`-JSON-LD. Blogg-URL-er er inkludert i sitemap per kirke. B1Admins forfatter-UI (**Nettsted → Blogg**) oppretter den støttende siden på `/blog/{slug}` og `posts`-raden sammen.

## Bare-for-medlemmer-sider

`pages.visibility` gjenbruker navigasjonslenkenes enum — `everyone` (standard), `visitors`, `members`, `staff`, `team`, `groups` (med `groupIds`) — men som en **hard tilgangssperre**, ikke et nav-filter (`PageVisibilityHelper.canViewPage`). Flyten:

1. Det anonyme tre-endepunktet sjekker synlighet på URL-baserte henting. Anonyme innringere av en sperret side får `{ restricted: true, visibility }` i stedet for innhold — treet lekker aldri.
2. Endepunktet respekterer likevel en JWT: `CustomAuthProvider` verifiserer `Authorization`-headeren på *hver* forespørsel, inkludert anonyme ruter, slik at et autentisert medlems henting av samme URL løses normalt.
3. B1App gjengir `RestrictedPage` på et `restricted`-svar: den hydrerer sesjonen fra lagret legitimasjon, henter treet på nytt med JWT-en, og gjengir det — eller viser en innloggingssperre med en `returnUrl` når det ikke finnes noen sesjon.

:::info
Sperrens granularitet varierer etter nivå: `groups` sjekker tokenets `groupIds` mot sidens liste, og `staff` sjekker `membershipStatus`, men `members` og `team` slipper for øyeblikket gjennom enhver autentisert bruker av kirken. Behandle `groups` som det strenge alternativet.
:::

## SEO og synlighet

Alt dette er B1App-side gjengivelse over ContentApi-data — APIet lagrer, appen sender ut:

| Bekymring | Hvordan det fungerer |
|---------|--------------|
| Metabeskrivelser | `pages.metaDescription` (≤300 tegn) flyter gjennom `MetaHelper.getMetaData()` inn i Next.js `Metadata` (beskrivelse + Open Graph) på hver byggergjengitt rute. B1Admins sideinnstillinger inkluderer en AI-"Generer"-knapp (se nedenfor) |
| Redirects | Per-kirke `redirects`-rader administrert på `/content/redirects` (`content.edit`, tak på 200 rader, normaliserte stier). Ved en potensiell 404 løser B1Apps side-rute stien mot `GET /content/redirects/public/:churchId` og utsteder en HTTP 308 via Nexts `permanentRedirect`; umatchede stier faller gjennom til `notFound()` |
| Merket 404-side | `not-found.tsx` gjengir `BrandedNotFound` med kirkens logo, navn, og tema i stedet for en generisk feil |
| Strukturerte data | `BlogPosting`-JSON-LD på blogginnlegg; `VideoObject` på per-preken-sidene (`/{sdSlug}/sermons/[sermonId]`) og på sider som inneholder et `sermons`-element; `Event` fra kalender-/arrangementselementer på byggersider; schema.org `Event` fra `serviceTimes`-elementet |
| Preken-sider | Hver offentlig preken får en søkbar side på `/sermons/[sermonId]` med full metadata — prekener er ikke lenger låst inne i det klientsidige nettleserelementet |
| Analyse | Den offentlige innstillingsnøkkelen `ga4MeasurementId` (administrert like ved redirects i B1Admin) injiserer en per-kirke GA4-gtag via `next/script` |
| Sitemap og feeds | Sitemap.xml-ruten per kirke inkluderer byggersider og blogg-URL-er; bloggens liste annonserer RSS-feeden |
| Tilgjengelighet | Det offentlige rammeverket gjengir en hopp-til-innhold-lenke som peker på landemerket `<main id="main-content">` i hver layout-wrapper |

## AI-generering (AskApi)

Side- og nettstedgenerering kjører i **AskApi**, en separat tjeneste, under `/website`-controlleren. Den autentiserer med samme `CustomAuthProvider`-JWT som alt annet og er **stateless med hensyn til innhold**: hvert endepunkt returnerer JSON, og innringeren (B1Admin) lagrer resultatet gjennom ContentApi (`POST /content/pages/temp/ai` lagrer en generert side-seksjoner-elementer-pakke i ett kall).

:::info
Fra og med 2026-07-03 er B1Admins inngangspunkter til denne pipelinen — "AI"-nettstedsmalen i `AddPageModal`, omskrivningsknappen i `SectionToolbar`, og "Generer nettsted"-knappen i sidelisten — kommentert ut klientsidig mens funksjonen omarbeides. AskApi-endepunktene nedenfor er upåvirket og svarer fortsatt; bare B1Admin-UI-et er skjult.
:::

| Endepunkt | Formål |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Den opprinnelige to-stegs sideflyten: disposisjon først, deretter ett kall per seksjon. B1Admins "AI"-sidemal i `AddPageModal` driver dette — disposisjon, deretter parallell seksjonsgenerering, deretter forhåndsvisning |
| `POST /website/generateSite` | Generering av hele nettstedet. **To-fase med hensikt**: et `planOnly: true`-kall returnerer bare den flersidige planen (ett raskt modellkall), deretter ber klienten om fullt innhold — dette holder hver forespørsel innenfor Lambda-/API-Gateway-tidsavbruddet |
| `POST /website/rewriteSection` | Strukturbevarende omskriving: modellen kan bare endre tekstbærende svar. En rekursiv strukturell signatur (id-er + typer + rekkefølge) sammenlignes før og etter; ethvert avvik returnerer den originale seksjonen med `fallback: true` i stedet for korrupt struktur |
| `POST /website/generateAltText` | Synskall over opptil 20 bilde-URL-er; returnerer kortfattet alt-tekst (≤125 tegn, "bilde av"-prefikser fjernet) |
| `POST /website/generateMetaDescription` | Én SEO-metabeskrivelse (≤155 tegn) fra sidens tekstinnhold — koblet til Generer-knappen på B1Admins sideinnstillinger |

Prompter er markdown-filer under `AskApi/config/instructions/`, inkludert elementkatalogen modellen genererer fra. To designpunkter holder katalogen ærlig: klienten sender `availableElementTypes` med hver forespørsel (prompten kan bare bruke typer fra den listen — serveren hardkoder aldri hele settet), og APIets MCP-verktøy `describe_page_builder` bærer samme guide for AI-agenter som jobber gjennom [MCP](../api/mcp). Modellene er Anthropic Claude via OpenRouter — 3.5 Haiku for seksjonsinnhold (latens), 3.5 Sonnet for disposisjoner, nettstedsplaner, og syn — med en OpenAI-fallback når ingen OpenRouter-nøkkel er konfigurert.

## Samtalebaserte skjemaer

Skjemaer (medlemskapsmodulen) fikk en samtalebasert modus rettet mot kontaktkort-lignende sider. Fire kolonner på `forms` styrer det: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Gjengivelse** — apphelpers `FormSubmissionEdit` bytter til `ConversationalForm`-komponenten (ett spørsmål av gangen) når `displayMode` er `conversational`; B1Apps skjemaside sender modusen videre. Samme innsendingsnyttelast begge veier.
- **Auto-opprett person** — ved innsending med `autoCreatePerson` satt, dedupliserer `ConversationalFormHelper.findOrCreatePerson` etter e-post (uten hensyn til store/små bokstaver) og oppretter ellers en husholdning + person med `membershipStatus: "Guest"`, og kobler deretter innsendingen til den personen.
- **Oppfølgings-e-post** — når et emne og en tekst er satt, får innsenderen en e-post fra mal (med `{firstName}` / `{churchName}`-tokener) gjennom den eksisterende transaksjonelle stien (`TransactionalEmailHelper`), aldri gjennom varslingssammendragsdøren. Begge sideeffektene er ikke-fatale: en feil mister aldri innsendingen.

De fire feltene settes via APIet i dag; B1Admin-skjemaredaktøren eksponerer dem ikke ennå.

## Relaterte sider

- [Nettstedruting og multi-nettsted](./websites) — hvordan en forespørsel løses til en kirke/et nettsted, og hvordan egendefinerte domener rutes
- [Content-endepunkter](../api/endpoints/content) — full REST-flate for sider, seksjoner, elementer, blokker, innlegg, redirects, og innstillinger
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer gjengiverne, registeret, delelinjene, og widgetene
- [MCP-server](../api/mcp) — inkludert veiledningsverktøyet `describe_page_builder`
- [Sideredaktør (sluttbruker)](/docs/b1-admin/website/page-editor) — den ansattvendte redaktørdokumentasjonen
