---
title: "Nettsted bygging arkitektur"
---

# Nettsted bygging arkitektur

<div class="article-intro">

Hver kirke nettsted som betjenes av B1App blir gjengivet fra ein innhold tre — sider, seksjoner, elementer — lagret i ContentApi og redigert visuelt i B1Admin. En delt komponent bibliotek gjengivelse både redigerer forhåndsvisning og det live nettsted, ein element-type katalog definerer hva som kan vises på en side, og en separat AI tjeneste kan generere eller skrive om den tre. Denne siden kartlegger hele stabelen: element kontrakten i `@churchapps/helpers`, gjengive rørledningen, kirke-data elementer, nettsted-bredt widgets, blogg laget, tilgang-gated sider, SEO, AI generering, og samtalende former.

</div>

## Oversikt

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — redaktør          │             │  Api — /content modul (ContentApi)      │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        delt gjengive rørledning                 ▼            (anon, JWT honert)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — offentlig nettsted (Next.js)│
               │    ElementTypes.ts (katalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, gjengivere│   │    redirects, merket 404        │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ kirke-data elementer
                                                                    ▼
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  AskApi — /website/* (AI)    │             │  /giving/funds/public/…/total           │
│  generateSite · rewriteSection│             │  /membership/groupmembers/public/…      │
│  generateAltText · metaDesc  │             │  /attendance/servicetimes/public/…      │
│  returnerer JSON; B1Admin lagrer│           └─────────────────────────────────────────┘
└──────────────────────────────┘
```

Tre regler holder på tvers av stabelen:

1. **En tre, to gjengivere.** En side er en `pages → sections → elements` tre hvor hver knute bærer sin innstillinger som en `answers` JSON blob. Samme apphelper komponenter gjengive drag-og-drop redaktør i B1Admin og server-gjengivet offentlig nettsted i B1App — det er nei separat "publiser format".
2. **Kontrakten lever i `@churchapps/helpers`.** `ElementTypes.ts` er den eneste katalog av element typer; gjengivere løse gjennom ein registrering i apphelper; redaktør former lever i B1Admin. Legger til ein element type betyr å berøre alle tre, i den rekkefølgen.
3. **Det offentlig nettsted leser anonym endepunkter.** Alt B1App trenger — side tre, innstillinger, blogg poster, redirects, og kirke-data endepunkter i andre moduler — er offentlig. Auth er valgfri: ein JWT på anonym tre endepunkt låse opp bare-medlemmer sider, ingenting annet endrer.

## Innhold tre

Innhold modulen (`Api/src/modules/content`) eier bygger data:

| Tabell | Rolle |
|-------|------|
| `pages` | En side per URL: `url`, `title`, `layout`, pluss `visibility`/`groupIds` (tilgang gating) og `metaDescription` (SEO) |
| `sections` | Horisontale bånd på en side (eller i ein blokk): bakgrunn, tekst farge, og en `answersJSON` som bærer stil pluss `dividerTop`/`dividerBottom` form-divider configs |
| `elements` | Innhold stykker innsiden ein seksjon: `elementType` + `answersJSON`, nestbar for layout typer (rad/kolonne, karusell) |
| `blocks` | Gjenbrukbar seksjonen/element grupper (footer blokker, element blokker) delt på tvers av sider |
| `posts` | Blog metadata over ein vanlig bygger side (se [Blogg](#blog-posts-over-pages)) |
| `redirects` | Per-kirke `fromPath → toPath` par, tappet på 200 (se [SEO](#seo-and-discoverability)) |
| `settings` | Nøkkel-verdi kirke innstillinger; rader merket `public` blir betjent anonym og bærer widget/analyser konfig |

Hele tre for en URL kommer tilbake fra ein eneste anonym kall — `GET /content/pages/:churchId/tree?url=/about` — som er hva B1App server-gjengivelse fra. Redaktør forespørsler henter etter id i stedet og beholde interne ids.

## Element kontrakten

### Katalogen (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definerer hver element type som ein `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, og ein JSON-skjema-stil `answersSchema` for sin svar. `validateElementAnswers()` er bevisst sjenerøs — ukjent typer og ekstra nøkler pass, så gammel innhold aldri bryte på ein katalog oppgradering. **35 typer lever i dag:**

| Kategori | Element typer |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons` element er mest konfig av kirke typen: ein `layout` svar velg `browse` (eldre full nettleser), `grid`, `list`, eller `featuredLatest`, med `playlistId`, `itemCount`, `showTitles`, og `showDates` raffinering ikke-browse layout.

### Gjengivere (`@churchapps/apphelper`)

Gjengivere lever i `Packages/apphelper/src/website/components/elementTypes/`, ein komponent per type, løst gjennom `ElementRegistry.ts` — ein to-lag kart hvor `Element.tsx` registrering standard gjengivelse for alle 35 typer (`registerDefaultElementRenderer`) og ein vert app kan overstyring noe av dem på kjøretid (`registerElementRenderer`) uten å forgrening pakken.

### Redaktør former (B1Admin)

Den redaktør per-type innstillinger former lever i `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` dispatch til dedikert komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) eller inline felt byggeren per type. Den AI-vendt speil av denne katalog er API MCP `describe_page_builder` verktøy (se [MCP server](../api/mcp)).

### Seksjonen form delere

Seksjoner kan bærer dekorative form delere på enten kant. Konfig lever i seksjonen `answersJSON` som `dividerTop` / `dividerBottom` objekter — `{ shape, color, height, flip }` med `shape` ein av `wave, waves, slant, curve, triangle, peaks`. Apphelper lever `SectionDivider` komponent og `parseDividerConfig()` hjelper; begge app seksjonen gjengivere (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parse svarene og montering deleren, og `SectionEdit.tsx` i B1Admin gir velger UI. Pakkene bare lever byggesteinen — seksjonen-nivå ledningen er den konsumer app sitt jobb.

## Kirke-data elementer

Tre element typer gjengive live kirke data snarere enn forfattet innhold. Modul isolasjon fortsatt anvend — hver ein kall den eier modul sitt eget offentlig endepunkt fra nettleseren:

| Element | Endepunkt | Noter |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerer `{ fundId, totalAmount, donationCount }`, valgfri `?startDate=&endDate=` vindu; element sammenligner det mot sin `goalAmount` svar |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in bare**: gruppen må ha `publicRoster` satt (standard av). Den projeksjon er bevisst minimal — `personId`, `displayName`, `leader`, foto — nei kontakt eller demografisk felt |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerer campus → tjeneste → tid tre; apphelper gjengivelse sender best-effort skjema.org `Event` JSON-LD fra det (API returnerer tåkelig data) |

:::warning
`publicRoster` er privaty port for `staffGrid`. Aldri vidde den offentlig gruppe-medlem projeksjon eller omgå flagg — roster endepunkt er anonym ved design og minimal felt liste er sikkerhet eiendom.
:::

## Nettsted-bredt widgets

To widgets gjengivelse på hver offentlig side snarere enn innsiden tre: **AnnouncementBanner** (avvisbar topp-av-side bar) og **Launcher** (flytende handling hub for gi/besøk/se-stil lenker). Begge komponenter og deres `parse*Config()` hjelpere lever i apphelper. Konfig er to offentlig innstillinger rader — nøkler `announcementBanner` og `launcher` — skrevet av B1Admin `SiteWidgetsEdit` (på utseende side) og lest av B1App offentlig layout via `GET /content/settings/public/:churchId`. API behandle disse som ugjennomsiktig nøkkel-verdi par; nøkkel navn er ein konvensjon mellom de to apper.

## Blogg: poster over sider

Bloggen er ein tynt metadata lag, ikke en andre innhold system. Ein `posts` rad (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) peker på ein vanlig bygger side via `pageId`; siden holder kroppen og blir redigert i normal side redaktør. Offentlig flate (alle anonym, `PostController`):

| Rute | Formål |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publisert poster, filtrerbar etter `?category=&tag=`, paginer |
| `GET /content/posts/public/:churchId/slug/:slug` | Ein post metadata |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 feed |

Ein post er "publisert" en gang `publishDate` er satt og fortid. B1App betjening `/{sdSlug}/blog` (liste, med RSS feed annonsert som ein alternativ lenke) og `/{sdSlug}/blog/[postSlug]`, som henter støtt side tre på `/blog/{slug}` og gjengive det gjennom samme Zone/Section rørledning som noe som helst annen side, legger til `BlogPosting` JSON-LD. Blogg URLer er inkludert i per-kirke sitemap. B1Admin forfattelse UI (**Nettsted → Blogg**) oppretter støtt side på `/blog/{slug}` og `posts` rad sammen.

## Bare-medlemmer sider

`pages.visibility` gjenbruk navigasjonen-lenker oppregnelse — `everyone` (standard), `visitors`, `members`, `staff`, `team`, `groups` (med `groupIds`) — men som ein **hard tilgang port**, ikke ein nav filter (`PageVisibilityHelper.canViewPage`). Flyten:

1. Anonym tre endepunkt sjekk synlighet på URL-basert hent. Anonym kallere av ein gated side få `{ restricted: true, visibility }` i stedet for innhold — tre aldri lekk.
2. Endepunkt fortsatt honert ein JWT: `CustomAuthProvider` verifiserer `Authorization` header på *hver* forespørsel, inkludert anonym ruter, så ein autentisert medlem sin hent av samme URL løse normalt.
3. B1App gjengive `RestrictedPage` på ein `restricted` respons: det hydrat sesjon fra lagret kredentialene, re-hent tre med JWT, og gjengive det — eller vise login port med ein `returnUrl` når det er nei sesjon.

:::info
Porta granularitet variere av nivå: `groups` sjekk token `groupIds` mot side liste og `staff` sjekk `membershipStatus`, men `members` og `team` for tiden pass noe som helst autentisert bruker av kirken. Behandle `groups` som streng alternativ.
:::

## SEO og oppdagbarhet

Alt av dette er B1App-side gjengive over ContentApi data — API lagrer, app sender:

| Bekymring | Hvordan det fungerer |
|---------|--------------|
| Meta beskrivelser | `pages.metaDescription` (≤300 tegn) flyter gjennom `MetaHelper.getMetaData()` inn i Next.js `Metadata` (beskrivelse + Open Graph) på hver bygger-gjengive rute. B1Admin side innstillinger inkludert AI "Generere" knapp (se nedenfor) |
| Redirects | Per-kirke `redirects` rader administrert på `/content/redirects` (`content.edit`, 200-rad tak, normalisert veier). På ein ville-verre-404, B1App side rute løse veien mot `GET /content/redirects/public/:churchId` og utsted ein HTTP 308 via Next `permanentRedirect`; umatchet veier fall gjennom til `notFound()` |
| Merket 404 | `not-found.tsx` gjengive `BrandedNotFound` med kirken logo, navn, og tema i stedet for ein generisk feil |
| Strukturert data | `BlogPosting` JSON-LD på blogg poster; `VideoObject` på per-preken sider (`/{sdSlug}/sermons/[sermonId]`) og på sider som inkludert ein `sermons` element; `Event` fra kalender/arrangement elementer på bygger sider; skjema.org `Event` fra `serviceTimes` element |
| Preken sider | Hver offentlig preken få ein søkbar side på `/sermons/[sermonId]` med full metadata — prekener er ikke lenger låst innsiden klient-side nettleser element |
| Analyser | Det offentlig innstillinger nøkkel `ga4MeasurementId` (administrert neste til redirects i B1Admin) injiserer en per-kirke GA4 gtag via `next/script` |
| Sitemap og feeds | Den per-kirke `sitemap.xml` rute inkludert bygger sider og blogg URLer; blogg liste annonserer RSS feed |
| Tilgjengelighet | Den offentlig krom gjengive ein hopp lenke målretting `<main id="main-content">` landemerke i hver layout omslag |

## AI generering (AskApi)

Side og nettsted generering kjør i **AskApi**, ein separat tjeneste, under `/website` kontrolleren. Det autentiserer med samme `CustomAuthProvider` JWT som alt annet og er **stateless med respekt til innhold**: hver endepunkt returnerer JSON og innringeren (B1Admin) vedvarer resultat gjennom ContentApi (`POST /content/pages/temp/ai` lagrer ein generert side-seksjoner-elementer bunt i ein kall).

:::info
Siden 2026-07-03, B1Admin innsettepunkter til denne rørledningen — nettsted "AI" mal i `AddPageModal`, `SectionToolbar` skrive knapp, og siden-liste "Generere nettsted" knapp — er kommentert ut klient-side mens funksjon er omarbeidet. AskApi endepunkter nedenfor er upåvirket og fortsatt responder; bare B1Admin UI er skjult.
:::

| Endepunkt | Formål |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Den original to-trinn side flyt: skisse først, så ein kall per seksjonen. B1Admin "AI" side mal i `AddPageModal` driver dette — skisse, så parallell seksjon generering, så forhåndsvisning |
| `POST /website/generateSite` | Helt-nettsted generering. **To-fase ved design**: en `planOnly: true` kall returnerer bare multi-side plan (ein rask modell kall), så klienten forespør full innhold — holde hver forespørsel innsiden Lambda/API-Gateway timeout |
| `POST /website/rewriteSection` | Struktur-bevarende skrive: modellen kan bare endre tekst-bærende svar. Ein rekursiv struktur signatur (ids + typer + rekkefølge) blir sammenlignet før og etter; noe som helst uoverensstemmelse returnerer den original seksjonen med `fallback: true` i stedet for korrupt struktur |
| `POST /website/generateAltText` | Visjonen kall over opptil 20 bilde URLer; returnerer kortfattet alt tekst (≤125 tegn, "foto av" prefiks fjernet) |
| `POST /website/generateMetaDescription` | Ein SEO meta beskrivelse (≤155 tegn) fra side tekst innhold — ledning til Generere knapp på B1Admin side innstillinger |

Spørsmål er markdown filer under `AskApi/config/instructions/`, inkludert element katalog modellen genererer fra. To design poeng holder katalog ærlig: klienten går `availableElementTypes` på hver forespørsel (spørsmål kan bare bruk typer fra at liste — serveren aldri hardcodes hele sett), og API MCP `describe_page_builder` verktøy bærer samme guide for AI agenter arbeiding gjennom [MCP](../api/mcp). Modeller er Anthropic Claude via OpenRouter — 3.5 Haiku for seksjon innhold (latens), 3.5 Sonnet for skisse, nettsted planer, og visjonen — med en OpenAI tilbakefall når ingen OpenRouter nøkkel er konfigurert.

## Samtalende former

Former (medlemskaps modul) vunnet ein samtalende modus rettet på koblet-kort-stil sider. Fire kolonner på `forms` kjør det: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Gjengivelse** — apphelper `FormSubmissionEdit` bryter til `ConversationalForm` komponent (en spørsmål på en gangen) når `displayMode` er `conversational`; B1App forma side går modus gjennom. Samme innsending last begge måter.
- **Auto-opprett person** — på innsending med `autoCreatePerson` sett, `ConversationalFormHelper.findOrCreatePerson` dedup etter e-post (kasse-insensitiv) og ellers oppretter ein husholdning + person med `membershipStatus: "Guest"`, så lenke innsending til den person.
- **Oppfølging e-post** — når ein emne og kropp er satt, innsender få ein mal e-post (med `{firstName}` / `{churchName}` tokens) gjennom eksisterende transaksjonell sti (`TransactionalEmailHelper`), aldri varsling oppsummering dør. Begge side-virkning er ikke-fatal: ein feil aldri miste innsending.

De fire feltene er sett via API i dag; B1Admin forma redaktør gjør ikke avslør dem ennå.

## Relaterte sider

- [Nettsted ruting og multi-nettsted](./websites) — hvordan ein forespørsel løse til kirke/nettsted og hvordan tilpasset domener rute
- [Innhold endepunkter](../api/endpoints/content) — full REST flate for sider, seksjoner, elementer, blokker, poster, redirects, og innstillinger
- [AppHelper](../shared-libraries/app-helper) — npm pakken som lever gjengivere, registrering, delere, og widgets
- [MCP server](../api/mcp) — inkludert `describe_page_builder` guide verktøy
- [Side redaktør (sluttbruker)](/docs/b1-admin/website/page-editor) — stab-vendt redaktør dokumentasjon
