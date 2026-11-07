---
title: "Arkitektur för webbplatsbyggaren"
---

# Arkitektur för webbplatsbyggaren

<div class="article-intro">

Varje kyrkowebbplats som serveras av B1App renderas från ett innehållsträd (sidor, sektioner, element) som lagras i ContentApi och redigeras visuellt i B1Admin. Ett delat komponentbibliotek renderar både redigerarens förhandsvisning och den publika webbplatsen, en elementtypskatalog definierar vad som kan finnas på en sida, och en separat AI-tjänst kan generera eller skriva om trädet. Den här sidan beskriver hela stacken: elementkontraktet i `@churchapps/helpers`, renderingspipelinen, kyrkodataelement, widgets för hela webbplatsen, bloggskiktet, sidor med åtkomstkontroll, SEO, AI-generering och konversationsformulär.

</div>

## Översikt

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

Tre regler gäller genom hela stacken:

1. **Ett träd, två renderare.** En sida är ett `pages → sections → elements`-träd där varje nod bär sina inställningar som en `answers`-JSON-blob. Samma apphelper-komponenter renderar drag-and-drop-redigeraren i B1Admin och den serverrenderade publika webbplatsen i B1App. Det finns inget separat "publiceringsformat".
2. **Kontraktet finns i `@churchapps/helpers`.** `ElementTypes.ts` är den enda katalogen över elementtyper, renderare slås upp via ett register i apphelper och redigeringsformulär finns i B1Admin. Att lägga till en elementtyp innebär att man berör alla tre, i den ordningen.
3. **Den publika webbplatsen läser anonyma endpoints.** Allt B1App behöver (sidträdet, inställningar, blogginlägg, omdirigeringar och kyrkodata-endpoints i andra moduler) är publikt. Autentisering är valfri: en JWT på den anonyma trädendpointen låser upp sidor för medlemmar, men inget annat ändras.

## Innehållsträdet

Innehållsmodulen (`Api/src/modules/content`) äger byggarens data:

| Tabell | Roll |
|--------|------|
| `pages` | En sida per URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (åtkomstkontroll) och `metaDescription` (SEO) |
| `sections` | Horisontella band på en sida (eller i ett block): bakgrund, textfärg och en `answersJSON` som bär stilen plus formkonfigurationerna `dividerTop`/`dividerBottom` |
| `elements` | Innehållsdelar i en sektion: `elementType` + `answersJSON`, med kapslingsmöjlighet för layouttyper (rad/kolumn, karusell) |
| `blocks` | Återanvändbara grupper av sektioner/element (sidfotsblock, elementblock) som delas mellan sidor |
| `posts` | Fristående blogginlägg (se [Blogg](#blog)) |
| `redirects` | Per kyrka: `fromPath → toPath`-par, begränsat till 200 (se [SEO](#seo-and-discoverability)) |
| `settings` | Nyckel-värde-inställningar för kyrkan; rader markerade `public` serveras anonymt och innehåller widget- och analyskonfigurationen |

Hela trädet för en URL returneras från ett enda anonymt anrop: `GET /content/pages/:churchId/tree?url=/about`. Det är därifrån B1App serverrenderar. Redigeringsanrop hämtar i stället med id och behåller de interna id:na.

## Elementkontraktet

### Katalogen (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definierar varje elementtyp som en `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` och en `answersSchema` i JSON-schema-stil för dess svar. `validateElementAnswers()` är medvetet tolerant: okända typer och extra nycklar godkänns, så att gammalt innehåll aldrig går sönder vid en uppgradering av katalogen. **35 typer levereras idag:**

| Kategori | Elementtyper |
|----------|--------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Elementet `sermons` är det mest konfigurerbara av kyrkotyperna: svaret `layout` väljer `browse` (den äldre fullständiga webbläsaren), `grid`, `list` eller `featuredLatest`, och `playlistId`, `itemCount`, `showTitles` och `showDates` förfinar de layouter som inte är `browse`.

Elementet `rawHTML` har två svar: `rawHTML` (markup) och `javascript`. Skript som infogas via `innerHTML` körs aldrig, så `RawHTMLElement` skapar om varje `<script>`-nod i markupen som ett nytt element. Dessa noder som inte infogats av parsern betraktas som betrodda under CSP:ns `strict-dynamic`. Ett `javascript`-svar som börjar med `<` (ett leverantörsutdrag inklistrat med sina `<script>`-taggar) tolkas som markup och behandlas på samma sätt. Annars körs det som ett vanligt inline-skript. B1Admin flaggar en nakad URL i JavaScript-rutan, eftersom en ensam URL körs som ett skript utan effekt. Elementet `map` renderar ingenting och laddar inget Google Maps-skript när ingen Maps API-nyckel är konfigurerad.

### Renderare (`@churchapps/apphelper`)

Renderarna finns i `Packages/apphelper/src/website/components/elementTypes/`, en komponent per typ, och löses upp via `ElementRegistry.ts`. Det är en karta med två lager: `Element.tsx` registrerar standardrenderaren för alla 35 typer (`registerDefaultElementRenderer`), och en värdapp kan åsidosätta vilken som helst av dem vid körning (`registerElementRenderer`) utan att forka paketet.

### Redigeringsformulär (B1Admin)

Redigerarens inställningsformulär för varje typ finns i `B1Admin/src/site/admin/elements/`. `ElementEdit.tsx` skickar vidare till en dedikerad komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` och så vidare) eller till en inline-fältbyggare per typ. AI-motsvarigheten till den här katalogen är API:ets MCP-verktyg `describe_page_builder` (se [MCP-server](../api/mcp)).

Redigerarens förhandsvisning monterar samma `Theme` som den publika webbplatsen, vilket sätter CSS-variablerna `--headingFont` och `--bodyFont` från kyrkans globala stilar. B1App tillämpar de variablerna via `pages.css`, som B1Admin inte kan importera. Därför injicerar `ContentEditor.tsx` `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) för att tillämpa dem på brödtexten i `.page` och på `h1`–`h6`. Utan den visade förhandsvisningen rubriker i adminteckensnittet.

### Formdelare för sektioner

Sektioner kan ha dekorativa formdelare på någon av kanterna. Konfigurationen ligger i sektionens `answersJSON` som objekten `dividerTop` / `dividerBottom`: `{ shape, color, height, flip }`, där `shape` är en av `wave, waves, slant, curve, triangle, peaks`. Apphelper levererar komponenten `SectionDivider` och hjälpfunktionen `parseDividerConfig()`. Båda apparnas Section-renderare (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) tolkar svaren och monterar delaren, och `SectionEdit.tsx` i B1Admin tillhandahåller väljargränssnittet. Paketen levererar bara byggstenen. Kopplingen på sektionsnivå är de konsumerande apparnas ansvar.

## Kyrkodataelement

Tre elementtyper renderar levande kyrkodata i stället för skapat innehåll. Modulisoleringen gäller fortfarande: var och en anropar den ägande modulens egna publika endpoint direkt från webbläsaren:

| Element | Endpoint | Anteckningar |
|---------|----------|--------------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerar `{ fundId, totalAmount, donationCount }`, med valfritt tidsfönster `?startDate=&endDate=`. Elementet jämför värdet med sitt svar `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Endast aktivt val**: gruppen måste ha `publicRoster` satt (standard av). Projektionen är medvetet minimal: `personId`, `displayName`, `leader` och foto. Inga kontakt- eller demografiska fält |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerar trädet campus → gudstjänst → tid. Apphelper-renderaren skapar utifrån det ett best-effort-JSON-LD av schema.org-typen `Event` (API:et returnerar ren data) |

:::warning
`publicRoster` är integritetsspärren för `staffGrid`. Utöka aldrig den publika projektionen av gruppmedlemmar och kringgå aldrig flaggan. Roster-endpointen är anonym by design, och den minimala fältlistan är säkerhetsegenskapen.
:::

### Kalenderelementet och händelsesidor

Kalenderelementets svar är `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, standard, eller `upcoming`) och `tag`. B1App åsidosätter apphelper-renderaren i `src/components/Element.tsx` med `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderar B1Apps `UpcomingEventsElement`. Den hämtar `GET /content/events/public/group/:churchId/:groupId` eller `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, expanderar återkommande händelser med `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, en förekomst per händelse inom ett år) och visar de första 12 som fotobrickor (`events.photoUrl`, med titeln på temats mörka färg som reserv) som länkar till `/events/{id}`. Det finns också en menyn Prenumerera för kalenderns ICS-flöde.
- **`display: "month"`** renderar apphelpers `CalendarElement` med en callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navigerar sedan till den URL:en vid klick i stället för att öppna detaljdialogen. B1Admin skickar ingen `eventUrl`, så admin-kalendern behåller sin dialog.
- **`tag`** filtrerar båda visningarna med `EventHelper.hasTag()` (`@churchapps/helpers`): en skiftlägesoberoende matchning mot den kommaseparerade `events.tags`. Tomt värde visar allt. Kopplingen för kuraterade kalendrar väljer `e.tags`, så att kuraterade händelser bär dem.

Kuraterade händelser länkar via `realEventId` (`eventPageId()`), så URL:en anger alltid den underliggande händelsen. `/{sdSlug}/events/[eventId]` är en dedikerad rutt (inte byggarens pipeline). Den hämtar `GET /content/events/public/:churchId/:id`, som returnerar `null` för väntande och avvisade händelser och för privata händelser utan registrering, och lägger till `roomNames` från bokningar av rum som inte är avvisade. Sidan renderar `EventPageContent` (fotohero, beskrivning i markdown, sidopanel för När/Var, **Registrera dig för detta evenemang** när `registrationEnabled` är satt och en länk **Lägg till i min kalender** till `GET /content/events/public/:churchId/:id/ical`). Den använder fotot som Open Graph-bild och skickar ut `Event`-JSON-LD för nästa förekomst via `EventPageJsonLd`. En okänd eller dold händelse ger en riktig 404.

## Widgets för hela webbplatsen

Två widgets renderas på varje publik sida, utanför trädet: **AnnouncementBanner** (en avfärdbar banderoll överst på sidan) och **Launcher** (en flytande åtgärdshubb för länkar av typen ge/besök/titta). Båda komponenterna och deras hjälpfunktioner `parse*Config()` levereras i apphelper. Konfigurationen ligger i två publika inställningsrader med nycklarna `announcementBanner` och `launcher`. De skrivs av B1Admins `SiteWidgetsEdit` (på sidan Utseende) och läses av B1Apps publika layout via `GET /content/settings/public/:churchId`. API:et behandlar dessa som ogenomskinliga nyckel-värde-par. Nyckelnamnen är en överenskommelse mellan de två apparna.

## Blogg

Bloggen är en fristående innehållstyp, inte ett lager ovanpå byggarens sidor. En rad i `posts` innehåller hela inlägget: `title`, `slug`, `excerpt`, `content` (brödtext i markdown), `authorId`, `photoUrl`, `publishDate`, `category` och `tags`. Den publika ytan (alla anonyma, `PostController`):

| Rutt | Syfte |
|------|-------|
| `GET /content/posts/public/:churchId` | Publicerade inlägg, filtrerbara med `?category=&tag=`, sidnumrerade |
| `GET /content/posts/public/:churchId/categories` | Unika kategorier bland publicerade inlägg |
| `GET /content/posts/public/:churchId/slug/:slug` | Ett publicerat inlägg |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0-flöde, med kyrkans namn som titel och per objekt en kategori och ingress eller innehåll som beskrivning |

Ett inlägg är "publicerat" när `publishDate` är satt och har passerat. Ett framtida `publishDate` gör inlägget schemalagt (dolt publikt, visas med en etikett Schemalagd i adminvyn). Läs-endpoints berikar varje inlägg med `authorName`, som löses upp från `authorId` via membership-modulens gateway. Saknas ingress faller listkort, metabeskrivningar och RSS tillbaka på innehållet utan markdown (cirka 160 tecken). B1App serverar `/{sdSlug}/blog`, en redaktionell listvy (centrerad rubrik som blir namnet på aktiv kategori eller tagg när filter är satt, en rad med kategorichips som filter, inläggsrader med miniatyrbild till vänster, signaturer och ingresser), med RSS-flödet annonserat som alternativ länk. Vidare finns `/{sdSlug}/blog/[postSlug]`, en dedikerad rutt (inte pipelinen Zone/Section), med centrerad rubrik (kategorinyckel, titel, signatur, accentlinje i primärfärgen), en 16:9-hero i containerns bredd, brödtexten i markdown i en läskolumn på cirka 720 px, taggchips i artikelns sidfot, en remsa **Mer i `{category}`** med relaterade inlägg och `BlogPosting`-JSON-LD som inkluderar författaren. Båda sidorna styrs helt av temats tokens, så de ärver varje kyrkas färgpalett. Bloggadresserna ingår i kyrkans sitemap. B1Admins gränssnitt för skapande (**Webbplats → Blogg**) redigerar inlägg i en dialog: markdown-redigerare med förhandsvisningsväxling, bildväljare för galleriet med beskärning till 16:9, personväljare för författare (standard är användaren som redigerar), autokomplettering av kategorier med befintliga kategorier, validering av dubbla slugar och en publiceringsknapp. Publicerade rader länkar ut till det levande inlägget, och sidan påminner administratörer om att lägga till en `/blog`-länk i navigeringen. Kommentarer överlåts till tredjepartstjänster: en kyrkovid publik innehållsinställning `blogFooterHtml` (redigeras under **Under varje inlägg** på bloggsidan och visas bara med Inställningar→Redigera) renderas under varje inlägg av B1Apps `BlogFooterEmbed`. Den återskapar `<script>`-taggarna så att de körs under `'strict-dynamic'` och kör dem i ordning (en extern `src` slutar laddas innan nästa inline-skript körs), eftersom leverantörsutdrag laddar ett bibliotek och sedan anropar det.

## Sidor för medlemmar

`pages.visibility` återanvänder navigationslänkarnas enum: `everyone` (standard), `visitors`, `members`, `staff`, `team`, `groups` (med `groupIds`). Det är dock en **hård åtkomstspärr**, inte ett navigationsfilter (`PageVisibilityHelper.canViewPage`). Flödet:

1. Den anonyma trädendpointen kontrollerar synlighet vid hämtningar via URL. Anonyma anropare av en spärrad sida får `{ restricted: true, visibility }` i stället för innehåll. Trädet läcker aldrig.
2. Endpointen respekterar fortfarande en JWT: `CustomAuthProvider` verifierar `Authorization`-headern vid *varje* anrop, även på anonyma rutter. Så en inloggad medlems hämtning av samma URL löses normalt.
3. B1App renderar `RestrictedPage` vid ett `restricted`-svar. Den hydrerar sessionen från sparade uppgifter, hämtar trädet på nytt med JWT och renderar det, eller visar en inloggningsspärr med en `returnUrl` när det inte finns någon session.

:::info
Spärrens detaljnivå varierar mellan nivåerna: `groups` kontrollerar tokenens `groupIds` mot sidans lista och `staff` kontrollerar `membershipStatus`. Men `members` och `team` godkänner för närvarande varje inloggad användare i kyrkan. Behandla `groups` som det strikta alternativet.
:::

## SEO och sökbarhet

Allt detta är rendering på B1App-sidan över ContentApi-data. API:et lagrar, appen skickar ut:

| Område | Så fungerar det |
|--------|-----------------|
| Metabeskrivningar | `pages.metaDescription` (≤300 tecken) går via `MetaHelper.getMetaData()` till Next.js `Metadata` (description + Open Graph) på varje rutt som byggaren renderar. Sidinställningarna i B1Admin har en AI-knapp **Generera** (se nedan) |
| Omdirigeringar | Rader i `redirects` per kyrka hanteras på `/content/redirects` (`content.edit`, gräns på 200 rader, normaliserade sökvägar). Vid en väntad 404 slår B1Apps sidrutt upp sökvägen mot `GET /content/redirects/public/:churchId` och skickar en HTTP 308 via Next:s `permanentRedirect`. Omatchade sökvägar faller igenom till `notFound()` |
| Varumärkt 404 | `not-found.tsx` renderar `BrandedNotFound` med kyrkans logotyp, namn och tema i stället för ett generiskt fel. Okända sökvägar `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` och `/volunteer/[planId]` ger en riktig 404, liksom okända subdomäner och felaktiga sidslugar (se [Webbplatsrouting och flera webbplatser](./websites)) |
| Strukturerad data | `BlogPosting`-JSON-LD på blogginlägg. `VideoObject` på varje sidas predikosida (`/{sdSlug}/sermons/[sermonId]`) och på sidor som innehåller ett element `sermons`. `Event` från kalender- och händelseelement på byggarens sidor och på varje sida `/{sdSlug}/events/[eventId]` (nästa förekomst, med händelsens foto som `image`). schema.org-`Event` från elementet `serviceTimes` |
| Predikosidor | Varje publik predikan får en sökbar sida på `/sermons/[sermonId]` med fullständiga metadata. Predikningar är inte längre inlåsta i det klientsidiga webbläsarelementet |
| Analys | Den publika inställningsnyckeln `ga4MeasurementId` (hanteras bredvid omdirigeringar i B1Admin) injicerar en gtag för GA4 per kyrka via `next/script`. B1-appen (`/{sdSlug}/mobile`) skickar också sina sidvisningar till det ID:t, tillsammans med ChurchApps egen tagg, när det är ett giltigt `G-`-ID (GTM-containerns ID:n gäller bara webbplatsen). Varje `gtag('config')` bär ett `display_mode` med värdet `installed` eller `browser`, baserat på `navigator.standalone` eller mediafrågan `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap och flöden | Rutten `sitemap.xml` per kyrka innehåller byggarens sidor, bloggadresser och de 50 senaste predikosidorna (med `<lastmod>` från varje predikans publiceringsdatum). Den listar också de inbyggda sidorna `/sermons`, `/groups` och `/volunteer` när de har innehåll (publika grupper, anmälningsplaner), om inte en sparad omdirigering ersätter sökvägen. `/` utelämnas när kyrkan saknar startsida, eftersom `/` då omdirigerar till det otillåtna `/mobile`. Bloggens listvy annonserar RSS-flödet |
| Tillgänglighet | Den publika ramen renderar en hoppa-till-länk som pekar på landmärket `<main id="main-content">` i varje layoutomslag |

## AI-generering (AskApi)

Generering av sidor och webbplatser körs i **AskApi**, en separat tjänst under kontrollern `/website`. Den autentiserar med samma `CustomAuthProvider`-JWT som allt annat och är **tillståndslös med avseende på innehåll**: varje endpoint returnerar JSON, och anroparen (B1Admin) sparar resultatet via ContentApi. `POST /content/pages/importTree` skapar en sida med hela det nästlade sektions- och elementträdet i ett anrop. Den infogar alltid under anroparens kyrka och ignorerar id:n i body.

### Sidgenerering (`planPage` → `writePage`)

Mallen "AI" i B1Admins `AddPageModal` använder en lågkostnadspipeline (`AskApi/src/helpers/SiteGenHelper.ts`) som bygger på en regel: **ingen modell skriver builder-JSON**. Två modeller delar upp arbetet via Vercel AI Gateway (vanlig HTTP, SSM-nyckel `/{env}/aiGatewayApiKey` eller `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) är en typad beslutsmodell som returnerar val, poäng och booleska värden med sannolikheter men inte kan skriva text. Den väljer varje sektion i tur och ordning från ett fast mallbibliotek, poängsätter layouter, faktagranskar text och väljer stockfoton och ikoner. Indata kostar cirka 0,04 dollar per miljon tokens och utdata är gratis, så cirka 90 anrop per sida kostar en bråkdel av en cent.
- **En liten chattmodell (GPT-4.1 mini som standard)** fyller i de namngivna textplatserna med begränsad längd i de valda mallarna. Skrivaren är en konstant som kan åsidosättas med miljövariabeln `SITEGEN_COPY_MODEL` (valfritt chattmodell-ID på gatewayen, till exempel `anthropic/claude-haiku-4.5`). I en blind jämförelse sida vid sida för tre kyrkor lät Claude Haiku 4.5 något varmare, men GPT-4.1 mini låg nära, cirka 4 gånger billigare och snabbare, så den är standard. En komplett sida med alla tre layouter kostar cirka 1,3 cent, varav cirka 80 % går till skrivaren.

| Fas | Endpoint | Vad som händer |
|-----|----------|----------------|
| 1 | `POST /website/planPage` | Klassificerar sidtypen (startsida, besök, om oss …) och samplar sedan 10 kandidatlayouter från JEV:s sannolikheter per runda (hjälte + antal sektioner → varje sektion → avslutning). Dubbletter tas bort, JEV poängsätter varje kandidat för passform, flöde och luckor, och returnerar de tre bästa plus en skrivröst och en `suggestedStyle` (palett + teckensnitt). Kandidater som delar samma sektioner hittills ställer JEV en identisk fråga, så rundor memoizeras efter prefix. En bästa poäng under 6 loggas som `lowLayoutScore`. Den loggen är backlogg över mallar som är värda att lägga till. Cirka 2 s |
| 2 | `POST /website/writePage` (ett anrop per kandidat) | Skrivaren fyller i platsernas text två sektioner per anrop, parallellt, och returnerar fem rubriker för hjälten som JEV väljer mellan. JEV faktagranskar varje sektion. Sektioner som misslyckas, använder en klyscha eller återberättar en tidigare sektion (delade fyrordsföljder, kontrolleras i kod) skrivs om parallellt med den specifika anledningen. En kodrensning tar bort meningar med standardfraser från kyrkosidor (om inte kyrkans egen beskrivning använder dem). JEV väljer fotomotiv, ikoner och hjältens formdelare och poängsätter resultatet. Returnerar ett färdigt sektionsträd att spara samt en poäng. Cirka 6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin skriver bara den bäst rankade layouten (tvåan är reserv om skrivningen misslyckas), sparar den och öppnar förhandsvisningen (cirka 10 s efter Spara) |

Varje fas är en egen begäran, så att varje anrop håller sig inom API Gateways gräns på 29 sekunder. Mallar i `SiteGenHelper.buildTree` är fasta sektions- och elementträd från katalogen (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) och refererar till temats tokens (`var(--accent)`, `var(--lightAccent)` …). Därför ärver genererade sidor kyrkans befintliga utseendeinställningar. Att lägga till en sektionsmall innebär att lägga till dess lista över platser i `SECTIONS` och dess träd i `buildTree`. Enhetstestet går igenom varje mall och validerar trädet.

**Indata.** Text får bara uppge fakta från två källor: det användaren skrev och `churchContext.facts`. Det senare är poster som B1Admin samlar in före planeringen (publika gudstjänsttider och namn på publika grupper, samt kyrkans namn och adress). Samma flaggor styr datadrivna mallar: `times` renderar det levande elementet `serviceTimes` när kyrkan håller sina gudstjänsttider i B1 (annars en skriven tabell), och `groups` och `countdown` erbjuds bara när det finns data bakom dem. JEV-anropen är säkrade: en dubblett skickas efter 1,5 s och det första svaret vinner, eftersom gatewayen ibland stannar upp och anropen nästan är gratis.

**Att hålla sig till ämnet.** Användarens prompt är *ämnet för sidan*, inte bakgrund om kyrkan. `planPage` klassificerar begäran (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). För sidor av typen `event` och `topic` erbjuds inte ens de allmänna kyrkomallarna (pastorsnotis, predikningar, verksamheter, grupper, samhällspåverkan, veckotider och nedräkning, videohjälte). I stället erbjuds `details` (när / var / vad man tar med) och en datumbaserad `eventCountdown`. Båda domarna poängsätter hur väl innehållet håller sig till ämnet. B1Admin skickar `pageType` från planen i varje `writePage`-anrop.

**Kompletta sidor från korta begäranden.** Sidor har tre till sex mellersektioner, generösa teckenlängder, en inledningsrad på kortsektioner och en FAQ med fem frågor. Reparationssteget expanderar varje sektion som kommer tillbaka tunn. Genereringen sker med ett klick: det finns inga uppföljningsfrågor. Om begäran saknar en vanlig detalj som en komplett sida behöver (starttid, sal, vad man tar med, hur man anmäler sig), fyller skrivaren i ett rimligt, blygsamt val som kyrkan kan redigera. Eftersom sektionerna skrivs parallellt beslutas dessa luckor **en gång**, i `planPage` (`assumedDetails`, ett litet anrop till skrivaren som körs parallellt med layoutsamplingen), och skickas tillbaka till varje `writePage`-anrop via `churchContext.assumedDetails`. Därmed kan en sektion inte säga 17.00 medan en annan säger 17.30. JEV reparerar varje sektion som motsäger begäran, kyrkans uppgifter eller de beslutade detaljerna. De beslutade detaljerna visas inte i gränssnittet. Kyrkan granskar och redigerar sidan som vanligt. Vissa saker hittar aldrig på: namn på personer, telefonnummer, e-postadresser och webbadresser, priser, statistik, kyrkans historia, citat tillskrivna personer och veckodag för ett datum som begäran inte angav någon veckodag för.

**Visuellt material.** Mallar namnger aldrig sina foton eller ikoner. De lämnar platser öppna, och ett generiskt pass (`visualSlots` → `pickVisuals` → `applyVisuals` i `SiteGenHelper`) går igenom det färdiga trädet och fyller i varje plats: en sektionsbakgrund eller ett galleriobjekt markerat `auto:photo`, en `auto:icon`, hjältens `auto:divider` och, utan någon markering alls, varje element `textWithPhoto`, `card` eller `image` vars `photo` är tomt. JEV väljer varje bild utifrån texten bredvid den (ett kortfoto utifrån kortets titel och text, en bakgrund utifrån sektionens text), och inget motiv upprepas på en sida. En ny mall får därför foton gratis. Foton är Pexels-sökord som skickas ut som platshållare `pexels:<term>`, och B1Admin löser dem via `POST /content/stock/search`. En klient som inte skickar `resolvesPhotos` får i stället en inbyggd hjältebild, enfärgade band och kort utan foto. Det finns medvetet inga porträttmotiv, och pastorsmallen har inget foto: en bild av en okänd person får aldrig ersätta en verklig person. För en kyrka utan sidor ännu tillämpar B1Admin `suggestedStyle` på de globala stilarna. Befintliga webbplatser behåller sitt utseende.

### Andra endpoints

:::info
Knappen för omskrivning i `SectionToolbar` och knappen **Generera webbplats** i sidlistan i B1Admin är fortfarande utkommenterade på klientsidan. AskApi-endpoints nedan svarar fortfarande. Det är bara det gränssnittet som är dolt.
:::

| Endpoint | Syfte |
|----------|-------|
| `POST /website/generatePageOutline` → `generateSection` | Det ursprungliga tvåstegsflödet för sidor (disposition, sedan ett LLM-anrop per sektion som ger elementets JSON). Ersatt i B1Admin av `planPage`/`writePage` på grund av kostnaden, behållen för API-konsumenter |
| `POST /website/generateSite` | Generering av hela webbplatsen. **Tvåfas by design**: ett anrop med `planOnly: true` returnerar bara planen för flera sidor (ett snabbt modellanrop), varefter klienten begär fullt innehåll. Så håller sig varje begäran inom tidsgränsen för Lambda/API Gateway |
| `POST /website/rewriteSection` | Omskrivning som bevarar strukturen: modellen får bara ändra svar som innehåller text. En rekursiv strukturignatur (id:n + typer + ordning) jämförs före och efter. Vid avvikelse returneras den ursprungliga sektionen med `fallback: true` i stället för skadad struktur |
| `POST /website/generateAltText` | Visionsanrop över upp till 20 bild-URL:er. Returnerar kort alternativtext (≤125 tecken), med prefixet "photo of" borttaget |
| `POST /website/generateMetaDescription` | En SEO-metabeskrivning (≤155 tecken) utifrån sidans textinnehåll. Kopplad till knappen Generera i B1Admins sidinställningar |

Prompterna för dessa endpoints är markdown-filer under `AskApi/config/instructions/`, inklusive elementkatalogen som modellen genererar utifrån. Två designbeslut håller katalogen ärlig. Klienten skickar `availableElementTypes` i varje begäran (prompten får bara använda typer från den listan, och servern hårdkodar aldrig hela uppsättningen). Dessutom bär API:ets MCP-verktyg `describe_page_builder` samma guide för AI-agenter som arbetar via [MCP](../api/mcp). Modellerna är Anthropic Claude via OpenRouter: 3.5 Haiku för sektionsinnehåll (låg latens), 3.5 Sonnet för dispositioner, webbplatsplaner och vision. Det finns en OpenAI-reserv när ingen OpenRouter-nyckel är konfigurerad.

## Konversationsformulär

Formulär (membership-modulen) fick ett konversationsläge avsett för sidor i stil med anslagskort. Fyra kolumner i `forms` styr det: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject` och `followUpBody`.

- **Rendering**: apphelpers `FormSubmissionEdit` byter till komponenten `ConversationalForm` (en fråga i taget) när `displayMode` är `conversational`. B1Apps formulärsida skickar vidare läget. Nyttolasten vid inskickning är densamma i båda fallen.
- **Automatiskt skapad person**: vid inskickning med `autoCreatePerson` satt dedupliceras via e-post (oberoende av skiftläge) med `ConversationalFormHelper.findOrCreatePerson`. Annars skapas ett hushåll och en person med `membershipStatus: "Guest"`, och inskickningen kopplas till den personen.
- **Uppföljningsmejl**: när ämne och text är satta får den som skickat in en mall med mejl (med platshållarna `{firstName}` / `{churchName}`) via den befintliga transaktionsvägen (`TransactionalEmailHelper`), aldrig via notisdigesten. Båda bieffekterna är icke-fatala: ett misslyckande förlorar aldrig inskickningen.

De fyra fälten sätts via API:et idag. B1Admins redigerare för formulär exponerar dem ännu inte.

## Cache för den publika webbplatsen

B1Apps publika renderingsväg cachar hämtningar taggade med kyrkan (`next: { revalidate: 300, tags: [sdSlug] }` i produktion och `0` i utveckling), så en levande sida kan vara inaktuell i upp till fem minuter efter en skrivning till ContentApi. `POST /api/revalidate/{sdSlug}` på B1App anropar `revalidateTag(sdSlug)` och är det enda sättet att tömma cachen i förtid.

Två skrivare träffar den:

1. **B1Admin**: `clearSiteCache()` i `B1Admin/src/site/siteCache.ts` skickar ett POST efter sparningar i redigeraren. Den föredrar den aktiva webbplatsens subdomän (en sekundär webbplats måste tömma *den* taggen, inte kyrkans standardtagg).
2. **Api**: innehållsändringar som aldrig går via B1Admin (API-nycklar, MCP, AI) utlöser `SiteCacheHelper.bump(churchId)` från innehållskontrollerna. Hjälparen slår upp kyrkans subdomän via `SubDomainHelper` och skickar ett POST till `{b1AppRoot}/api/revalidate/{sd}`. Fel sväljs, så att en oåtkomlig B1App aldrig kan få en sparning att misslyckas.

Kontrollerna som gör bump: sidor (spara, ta bort, duplicera, publicera, kasta, avpublicera, AI-temp), sektioner, element, block, länkar, globala stilar, inlägg och omdirigeringar. Utveckling använder `b1AppRoot` `http://{subdomain}.localtest.me:3301`. Demo och produktion använder `https://{subdomain}.b1.church`.

## Relaterade sidor

- [Webbplatsrouting och flera webbplatser](./websites): hur en begäran löses till en kyrka/webbplats och hur egna domäner routas
- [Endpoints för innehåll](../api/endpoints/content): hela REST-ytan för sidor, sektioner, element, block, inlägg, omdirigeringar och inställningar
- [AppHelper](../shared-libraries/app-helper): npm-paketet som levererar renderarna, registret, delarna och widgets
- [MCP-server](../api/mcp): inklusive verktyget guide `describe_page_builder`
- [Sidredigeraren (för slutanvändare)](/docs/b1-admin/website/page-editor): dokumentationen för personalens redigerare
