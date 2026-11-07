---
title: "Architektúra tvorby webových stránok"
description: "Vývojárska mapa tvorcu webov B1: strom obsahu, spoločný katalóg prvkov, renderovací proces a generovanie stránok pomocou AI v B1 Admin a B1.church."
---

# Architektúra tvorby webových stránok

<div class="article-intro">

Každá webová stránka cirkvi obsluhovaná B1App sa vykresľuje z obsahového stromu — stránok, sekcií, prvkov — uloženého v ContentApi a upravovaného vizuálne v B1Admin. Jedna spoločná knižnica komponentov vykresľuje náhľad editora aj živú stránku, jeden katalóg typov prvkov definuje, čo sa môže objaviť na stránke, a samostatná služba AI dokáže tento strom vygenerovať alebo prepísať. Táto stránka mapuje celý zásobník: kontrakt prvkov v `@churchapps/helpers`, vykresľovací reťazec, prvky cirkevných dát, celostránkové widgety, blogovú vrstvu, stránky s prístupovým obmedzením, SEO, generovanie pomocou AI a konverzačné formuláre.

</div>

## Prehľad

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

Tri pravidlá platia naprieč celým zásobníkom:

1. **Jeden strom, dva vykresľovače.** Stránka je strom `pages → sections → elements`, v ktorom každý uzol nesie svoje nastavenia ako JSON blob `answers`. Rovnaké komponenty apphelper vykresľujú editor s presúvaním prvkov (drag-and-drop) v B1Admin aj serverovo vykresľovanú verejnú stránku v B1App — neexistuje žiadny samostatný „formát publikovania“.
2. **Kontrakt sa nachádza v `@churchapps/helpers`.** `ElementTypes.ts` je jediný katalóg typov prvkov; vykresľovače sa vyhľadávajú cez register v apphelper; formuláre editora sa nachádzajú v B1Admin. Pridanie typu prvku znamená zásah do všetkých troch miest, v tomto poradí.
3. **Verejná stránka číta anonymné koncové body.** Všetko, čo B1App potrebuje — strom stránok, nastavenia, blogové príspevky, presmerovania a koncové body s cirkevnými dátami v ostatných moduloch — je verejné. Autentifikácia je voliteľná: JWT na anonymnom koncovom bode stromu odomkne stránky určené len pre členov, nič iné sa nemení.

## Obsahový strom

Modul obsahu (`Api/src/modules/content`) spravuje dáta tvorcu stránok:

| Tabuľka | Úloha |
|-------|------|
| `pages` | Jedna stránka pre každú URL: `url`, `title`, `layout`, a navyše `visibility`/`groupIds` (obmedzenie prístupu) a `metaDescription` (SEO) |
| `sections` | Horizontálne pásy na stránke (alebo v bloku): pozadie, farba textu a `answersJSON`, ktorý obsahuje štýlovanie a konfigurácie tvarových oddeľovačov `dividerTop`/`dividerBottom` |
| `elements` | Obsahové časti v rámci sekcie: `elementType` + `answersJSON`, pri typoch rozloženia (riadok/stĺpec, kolotoč) možno vnárať |
| `blocks` | Opakovane použiteľné skupiny sekcií/prvkov (bloky päty, blokové prvky) zdieľané medzi stránkami |
| `posts` | Samostatné blogové príspevky (pozri [Blog](#blog)) |
| `redirects` | Páry `fromPath → toPath` pre každú cirkev, s limitom 200 (pozri [SEO](#seo-and-discoverability)) |
| `settings` | Nastavenia cirkvi vo formáte kľúč–hodnota; riadky označené `public` sa poskytujú anonymne a obsahujú konfiguráciu widgetov/analytiky |

Celý strom pre jednu URL sa vráti jediným anonymným volaním — `GET /content/pages/:churchId/tree?url=/about` — a z neho B1App serverovo vykresľuje stránku. Požiadavky editora namiesto toho načítavajú podľa ID a ponechávajú interné ID.

## Kontrakt prvkov

### Katalóg (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definuje každý typ prvku ako `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` a `answersSchema` v štýle JSON schémy pre jeho odpovede. `validateElementAnswers()` je zámerne zhovievavá — neznáme typy a nadbytočné kľúče prejdú, takže starý obsah sa pri aktualizácii katalógu nerozbije. **Dnes sa dodáva 35 typov:**

| Kategória | Typy prvkov |
|----------|---------------|
| rozloženie (6) | row, column, box, carousel, whiteSpace, block |
| obsah (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| médiá (4) | image, gallery, video, map |
| cirkev (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| pokročilé (2) | rawHTML, iframe |

Prvok `sermons` je najkonfigurovateľnejší z cirkevných typov: odpoveď `layout` vyberá `browse` (starý úplný prehliadač), `grid`, `list` alebo `featuredLatest`, pričom `playlistId`, `itemCount`, `showTitles` a `showDates` spresňujú rozloženia iné ako browse.

Prvok `rawHTML` má dve odpovede: `rawHTML` (značkovanie) a `javascript`. Skripty vložené cez `innerHTML` sa nikdy nespustia, preto `RawHTMLElement` znovu vytvorí každý uzol `<script>` v značkovaní ako nový prvok. Tieto uzly, ktoré nevkladá parser, sa považujú za dôveryhodné podľa `strict-dynamic` v CSP. Odpoveď `javascript`, ktorá začína znakom `<` (vendorový úryvok vložený aj so značkami `<script>`), sa spracuje ako značkovanie a dostane rovnaké zaobchádzanie. Inak sa spustí ako bežný inline skript. B1Admin upozorní na holú URL v poli JavaScript, keďže samotná URL sa spustí ako skript, ktorý nič nerobí. Prvok `map` nič nevykreslí a nenačíta žiadny skript Google Maps, ak nie je nakonfigurovaný kľúč Maps API.

### Vykresľovače (`@churchapps/apphelper`)

Vykresľovače sa nachádzajú v `Packages/apphelper/src/website/components/elementTypes/`, jeden komponent na typ, a vyhľadávajú sa cez `ElementRegistry.ts` — dvojvrstvová mapa, kde `Element.tsx` registruje predvolený vykresľovač pre všetkých 35 typov (`registerDefaultElementRenderer`) a hostiteľská aplikácia môže ktorýkoľvek z nich prepísať za behu (`registerElementRenderer`) bez vytvorenia vlastnej kópie balíka.

### Formuláre editora (B1Admin)

Formuláre nastavení editora pre jednotlivé typy sa nachádzajú v `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` odošle požiadavku na vyhradený komponent (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) alebo na vložený zostavovač polí pre každý typ. Zrkadlo tohto katalógu určené pre AI je nástroj MCP `describe_page_builder` v API (pozri [MCP Server](../api/mcp.md)).

Náhľad editora pripája rovnakú `Theme` ako živá stránka, ktorá nastavuje premenné CSS `--headingFont` / `--bodyFont` z globálnych štýlov cirkvi. B1App tieto premenné uplatňuje cez `pages.css`, ktorý B1Admin nemôže importovať, preto `ContentEditor.tsx` vkladá `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`), aby ich uplatnil na text `.page` a na `h1`–`h6`. Bez toho náhľad zobrazoval nadpisy písmom administrácie.

### Tvarové oddeľovače sekcií

Sekcie môžu na ktoromkoľvek okraji niesť dekoratívne tvarové oddeľovače. Konfigurácia je uložená v `answersJSON` sekcie ako objekty `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }`, pričom `shape` je jedno z: `wave, waves, slant, curve, triangle, peaks`. Apphelper dodáva komponent `SectionDivider` a pomocnú funkciu `parseDividerConfig()`; vykresľovače sekcií oboch aplikácií (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) spracúvajú odpovede a pripájajú oddeľovač, a `SectionEdit.tsx` v B1Admin poskytuje výberové rozhranie. Balíky dodávajú len stavebný blok — prepojenie na úrovni sekcie je úlohou aplikácií, ktoré ich používajú.

## Prvky s cirkevnými dátami

Tri typy prvkov vykresľujú živé cirkevné dáta namiesto vytvoreného obsahu. Izolácia modulov platí aj tak — každý z nich volá verejný koncový bod svojho vlastného modulu z prehliadača:

| Prvok | Koncový bod | Poznámky |
|---------|---------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Vracia `{ fundId, totalAmount, donationCount }`, voliteľne v časovom okne `?startDate=&endDate=`; prvok to porovnáva s odpoveďou `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Iba na základe súhlasu**: skupina musí mať nastavené `publicRoster` (predvolene vypnuté). Projekcia je zámerne minimálna — `personId`, `displayName`, `leader`, fotografia — bez kontaktných ani demografických polí |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Vracia strom kampus → bohoslužba → čas; vykresľovač apphelper z neho vytvára JSON-LD typu `Event` podľa schema.org v rámci možností (API vracia prosté dáta) |

:::warning
`publicRoster` je ochrana súkromia pre `staffGrid`. Nikdy nerozširujte verejnú projekciu členov skupiny ani neobchádzajte tento príznak — koncový bod zoznamu je návrhovo anonymný a minimálny zoznam polí je bezpečnostnou vlastnosťou.
:::

### Prvok kalendára a stránky udalostí

Odpovede prvku `calendar` sú `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, predvolene, alebo `upcoming`) a `tag`. B1App prepisuje vykresľovač apphelper v `src/components/Element.tsx` pomocou `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** vykresľuje komponent `UpcomingEventsElement` z B1App: načítava `GET /content/events/public/group/:churchId/:groupId` alebo `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, rozvíja opakovania pomocou `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, jeden výskyt na udalosť v rámci roka) a prvých 12 zobrazuje ako fotodlaždice (`events.photoUrl`, ak nie je fotografia, použije sa názov na tmavej farbe témy), ktoré odkazujú na `/events/{id}`, s ponukou Odoberať pre kanál ICS kalendára.
- **`display: "month"`** vykresľuje `CalendarElement` z apphelper s callbackom `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` potom pri kliknutí prejdú na túto URL namiesto otvorenia dialógu s podrobnosťami (B1Admin neposkytuje `eventUrl`, takže administrátorský kalendár si zachováva dialóg).
- **`tag`** filtruje oba zobrazenia pomocou `EventHelper.hasTag()` (`@churchapps/helpers`): porovnanie bez ohľadu na veľkosť písmen oproti `events.tags` oddeleným čiarkami; prázdna hodnota zobrazí všetko. Spojenie kurátorovaného kalendára vyberá `e.tags`, aby kurátorované udalosti tieto značky niesli.

Kurátorované udalosti odkazujú cez `realEventId` (`eventPageId()`), takže URL vždy označuje podkladovú udalosť. `/{sdSlug}/events/[eventId]` je vyhradená trasa (nie súčasť procesu tvorby stránok): načítava `GET /content/events/public/:churchId/:id` — ktorý vracia `null` pre čakajúce a zamietnuté udalosti a pre súkromné udalosti bez registrácie a z nezamietnutých rezervácií miestností pridáva `roomNames` — vykresľuje `EventPageContent` (fotografický hlavný obrázok, popis v markdowne, bočný panel Kedy/Kde, **Registrovať sa na túto udalosť**, keď je `registrationEnabled`, a odkaz **Pridať do môjho kalendára** na `GET /content/events/public/:churchId/:id/ical`), použije fotografiu ako obrázok Open Graph a cez `EventPageJsonLd` vydáva JSON-LD typu `Event` pre najbližší výskyt. Neznáma alebo skrytá udalosť vráti skutočnú chybu 404.

## Widgety pre celú stránku

Dva widgety sa vykresľujú na každej verejnej stránke, a nie vnútri stromu: **AnnouncementBanner** (lišta v hornej časti stránky, ktorú možno zavrieť) a **Launcher** (plávajúce centrum akcií pre odkazy typu „Dať“, „Navštíviť“, „Sledovať“). Oba komponenty aj ich pomocné funkcie `parse*Config()` sa dodávajú v apphelper. Konfigurácia sú dva riadky verejných nastavení — kľúče `announcementBanner` a `launcher` — zapisované komponentom `SiteWidgetsEdit` v B1Admin (na stránke Vzhľad) a čítané verejným rozložením B1App cez `GET /content/settings/public/:churchId`. API s týmito dvojicami narába ako s nepriehľadnými pármi kľúč–hodnota; názvy kľúčov sú dohoda medzi oboma aplikáciami.

## Blog

Blog je samostatný typ obsahu, nie vrstva nad stránkami tvorcu. Riadok `posts` obsahuje celý príspevok: `title`, `slug`, `excerpt`, `content` (telo v markdowne), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Verejný povrch (všetko anonymné, `PostController`):

| Trasa | Účel |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publikované príspevky, filtrovateľné podľa `?category=&tag=`, stránkované |
| `GET /content/posts/public/:churchId/categories` | Rozličné kategórie naprieč publikovanými príspevkami |
| `GET /content/posts/public/:churchId/slug/:slug` | Jeden publikovaný príspevok |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 kanál s názvom cirkvi, s kategóriou pre každú položku a popisom z úryvku alebo z obsahu |

Príspevok je „publikovaný“, keď je nastavený `publishDate` a tento dátum už nastal; budúci `publishDate` znamená naplánovaný príspevok (verejne skrytý, v administrácii zobrazený s čipom Naplánované). Koncové body na čítanie obohacujú každý príspevok o `authorName`, ktorý sa získava z `authorId` cez bránu modulu členstva. Chýbajúci úryvok sa v zoznamových kartách, popisoch meta a v RSS nahrádza obsahom bez markdownu (~160 znakov). B1App poskytuje `/{sdSlug}/blog` — redakčný zoznam (stredová hlavička, ktorá sa pri filtrovaní zmení na názov aktívnej kategórie/značky, riadok filtrov vo forme čipov kategórií, riadky príspevkov s miniatúrou vľavo, autorom a úryvkami), pričom kanál RSS je uvedený ako alternatívny odkaz — a `/{sdSlug}/blog/[postSlug]`, vyhradenú trasu (nie proces Zone/Section) so stredovou hlavičkou (kategória nad nadpisom, nadpis, autor, akcentová čiara v primárnej farbe), hlavným obrázkom 16:9 v šírke kontajnera, telom v markdowne v čítacom stĺpci široko okolo 720 px, značkami v pätičke článku, pásom súvisiacich príspevkov „Viac v kategórii `{category}`“ a JSON-LD typu `BlogPosting` vrátane autora. Obe stránky štýlujú výhradne cez tokeny témy, takže preberajú farebnú paletu každej cirkvi. URL blogu sú zahrnuté do mapy stránok (sitemap) každej cirkvi. Autorské rozhranie B1Admin (**Web → Blog**) upravuje príspevky v dialógu: editor markdownu s prepínačom náhľadu, výber obrázka z galérie orezaného na 16:9, výber autora osoby (predvolene upravujúci používateľ), automatické dopĺňanie kategórií z existujúcich kategórií, overovanie duplicitných slugov a prepínač publikovania; publikované riadky odkazujú na živý príspevok a stránka pripomína administrátorom, aby pridali navigačný odkaz `/blog`. Komentáre zostávajú na službách tretích strán: celocirkevné verejné nastavenie obsahu `blogFooterHtml` (upravuje sa v časti **Pod každým príspevkom** na stránke Blog, zobrazuje sa len cez Nastavenia→Upraviť) sa pod každým príspevkom vykresľuje komponentom `BlogFooterEmbed` z B1App, ktorý znovu vytvára značky `<script>`, aby sa spustili pri `'strict-dynamic'`, a spúšťa ich v poradí (externý `src` sa dokončí načítať skôr, než sa spustí ďalší inline skript), keďže vendorové úryvky najprv načítajú knižnicu a až potom ju volajú.

## Stránky len pre členov

`pages.visibility` znovu používa výčet odkazov v navigácii — `everyone` (predvolené), `visitors`, `members`, `staff`, `team`, `groups` (s `groupIds`) — ale ako **prísnu prístupovú bránu**, nie ako filter navigácie (`PageVisibilityHelper.canViewPage`). Postup je tento:

1. Anonymný koncový bod stromu kontroluje viditeľnosť pri načítaniach podľa URL. Anonymní volajúci zabezpečenej stránky dostanú namiesto obsahu `{ restricted: true, visibility }` — strom nikdy nevyteká.
2. Koncový bod stále rešpektuje JWT: `CustomAuthProvider` overuje hlavičku `Authorization` pri *každej* požiadavke vrátane anonymných trás, takže načítanie rovnakej URL prihláseným členom sa vyrieši bežným spôsobom.
3. B1App vykreslí `RestrictedPage` pri odpovedi `restricted`: obnoví reláciu z uložených prihlasovacích údajov, znovu načíta strom s JWT a vykreslí ho — alebo, ak relácia neexistuje, zobrazí prihlasovaciu bránu s `returnUrl`.

:::info
Granularita brány sa líši podľa úrovne: `groups` porovnáva `groupIds` z tokenu so zoznamom stránky a `staff` kontroluje `membershipStatus`, no `members` a `team` momentálne prepustia každého overeného používateľa cirkvi. Ako prísnu možnosť berte `groups`.
:::

## SEO a zjaviteľnosť

Všetko toto je vykresľovanie na strane B1App nad dátami ContentApi — API ukladá, aplikácia vydáva:

| Oblasť | Ako to funguje |
|---------|--------------|
| Meta popisy | `pages.metaDescription` (≤300 znakov) prechádza cez `MetaHelper.getMetaData()` do `Metadata` Next.js (popis + Open Graph) na každej trase vykreslenej tvorcom stránok. Nastavenia stránky v B1Admin obsahujú tlačidlo AI „Generovať“ (pozri nižšie) |
| Presmerovania | Riadky `redirects` pre každú cirkev spravované na `/content/redirects` (`content.edit`, limit 200 riadkov, normalizované cesty). Pri stave, ktorý by inak skončil chybou 404, trasa stránky B1App vyhľadá cestu v `GET /content/redirects/public/:churchId` a cez `permanentRedirect` z Next vydá HTTP 308; nezhodné cesty prejdú na `notFound()` |
| Stránka 404 so značkou | `not-found.tsx` vykreslí `BrandedNotFound` s logom cirkvi, jej názvom a témou namiesto všeobecnej chyby. Neznáme cesty `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` a `/volunteer/[planId]` vracajú skutočnú chybu 404, rovnako ako neznáme subdomény a chybne utvorené slugy stránok (pozri [Smerovanie webových stránok a viac lokalít](./websites.md)) |
| Štruktúrované dáta | JSON-LD `BlogPosting` na blogových príspevkoch; `VideoObject` na stránkach jednotlivých kázní (`/{sdSlug}/sermons/[sermonId]`) a na stránkach obsahujúcich prvok `sermons`; `Event` z prvkov kalendára/udalostí na stránkach tvorcu a na každej stránke `/{sdSlug}/events/[eventId]` (najbližší výskyt, s fotografiou udalosti ako `image`); schema.org `Event` z prvku `serviceTimes` |
| Stránky kázní | Každá verejná kázeň dostane prehľadávateľnú stránku na `/sermons/[sermonId]` s úplnými metaúdajmi — kázne už nie sú uzamknuté vo vnútri prehliadača na strane klienta |
| Analytika | Verejné nastavenie `ga4MeasurementId` (spravované vedľa presmerovaní v B1Admin) vkladá gtag GA4 pre každú cirkev cez `next/script`. Aplikácia B1 (`/{sdSlug}/mobile`) posiela zobrazenia svojich stránok na toto ID spolu so značkou ChurchApps, ak ide o platné ID `G-` (ID kontajnerov GTM zostávajú len pre webové stránky). Každé `gtag('config')` nesie `display_mode` s hodnotou `installed` alebo `browser`, podľa `navigator.standalone` alebo mediálneho dotazu `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Mapa stránok a kanály | Trasa `sitemap.xml` pre každú cirkev zahŕňa stránky tvorcu, URL blogu a 50 najnovších stránok kázní (s `<lastmod>` z dátumu publikovania každej kázne). Uvádza tiež vstavané stránky `/sermons`, `/groups` a `/volunteer`, ak majú obsah (verejné skupiny, plány zápisu), pokiaľ uložené presmerovanie túto cestu nenahradí. `/` sa vynechá, ak cirkev nemá domovskú stránku, lebo `/` potom presmeruje na nepovolenú `/mobile`. Zoznam blogu uvádza kanál RSS |
| Prístupnosť | Verejné rozhranie vykreslí v každom obale rozloženia odkaz na preskočenie, ktorý smeruje na orientačný bod `<main id="main-content">` |

## Generovanie pomocou AI (AskApi)

Generovanie stránok a webov prebieha v **AskApi**, samostatnej službe, pod kontrolérom `/website`. Overuje sa rovnakým JWT `CustomAuthProvider` ako všetko ostatné a je **bezstavová vzhľadom na obsah**: každý koncový bod vracia JSON a volajúci (B1Admin) výsledok ukladá cez ContentApi (`POST /content/pages/importTree` vytvorí stránku s celým vnoreným stromom sekcií/prvkov v jednom volaní; vždy vkladá pod cirkev volajúceho a ignoruje ID v tele požiadavky).

### Generovanie stránok (`planPage` → `writePage`)

Šablóna stránky „AI“ v `AddPageModal` z B1Admin používa lacný postup (`AskApi/src/helpers/SiteGenHelper.ts`) postavený na jednom pravidle: **žiadny model nikdy nevytvára JSON tvorcu**. Dva modely si prácu rozdeľujú cez bránu Vercel AI Gateway (obyčajné HTTP, kľúč SSM `/{env}/aiGatewayApiKey` alebo `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — model typovaných rozhodnutí, ktorý vracia voľby, skóre a logické hodnoty s pravdepodobnosťami, ale nedokáže písať text. Postupne vyberá každú sekciu zo pevnej knižnice šablón, hodnotí rozloženia, overuje fakty v texte a vyberá fotografie zo zásob a ikony. Vstup stojí približne 0,04 USD za milión tokenov a výstup je zadarmo, takže ~90 volaní na stránku stojí zlomok centu.
- **Malý konverzačný model (predvolene GPT-4.1 mini)** — dopĺňa pomenované textové polia vybraných šablón s obmedzenou dĺžkou. Pisateľ je jedna konštanta, ktorú možno prepísať premennou prostredia `SITEGEN_COPY_MODEL` (ľubovoľné ID konverzačného modelu na bráne, napr. `anthropic/claude-haiku-4.5`). Pri slepom porovnaní vedľa seba na troch cirkvách znel Claude Haiku 4.5 o niečo srdečnejšie, no GPT-4.1 mini bol blízko, zhruba štyrikrát lacnejší a rýchlejší, preto je predvolený. Celá stránka so všetkými tromi rozloženiami stojí približne 1,3 centa, z toho asi 80 % pisateľ.

| Fáza | Koncový bod | Čo sa deje |
|-------|----------|-----------|
| 1 | `POST /website/planPage` | Zaradí typ stránky (domov, návšteva, o nás…), potom vyberie 10 kandidátnych rozložení podľa pravdepodobností JEV pre jednotlivé kolá (hlavný blok + počet sekcií → každá sekcia → záver), odstráni duplicity, nechá JEV ohodnotiť každé z hľadísk vhodnosti, plynulosti a medzier, a vráti tri najlepšie spolu so štýlom písania a `suggestedStyle` (paleta + písma). Kandidáti, ktorí majú zatiaľ rovnaké sekcie, kladú JEV rovnakú otázku, takže kolá sa ukladajú do vyrovnávacej pamäte podľa spoločnej predpony. Najlepšie skóre pod 6 sa zaznamenáva ako `lowLayoutScore` — tento záznam je zoznam šablón, ktoré stojí za to pridať. ~2 s |
| 2 | `POST /website/writePage` (jedno volanie na kandidáta) | Pisateľ dopĺňa texty slotov po dvoch sekciách na volanie, paralelne, a vracia päť nadpisov hlavného bloku, z ktorých JEV vyberá; JEV overuje fakty v každej sekcii; sekcie, ktoré neprejdú, používajú štandardnú frázu alebo opakujú niečo z predchádzajúcej sekcie (spoločné 4-slovné úseky, kontrolované v kóde), sa paralelne prepisujú s uvedením konkrétneho dôvodu; čistenie kódom vyradí vety so štandardnými frázami webov cirkví (pokiaľ ich opis cirkvi sám nepoužíva); JEV vyberá námety fotografií, ikony a tvarový oddeľovač hlavného bloku a ohodnotí výsledok. Vracia strom sekcií pripravený na uloženie a skóre. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin zapíše len najlepšie hodnotené rozloženie (druhé v poradí je záložné, ak zápis zlyhá), uloží ho a otvorí náhľad (~10 s po uložení) |

Každá fáza je samostatná požiadavka, aby každé volanie zostalo v limite 29 sekúnd brány API Gateway. Šablóny v `SiteGenHelper.buildTree` sú pevné stromy sekcií a prvkov z katalógu (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) a odkazujú na tokeny témy (`var(--accent)`, `var(--lightAccent)`…), takže vygenerované stránky preberajú existujúce nastavenia vzhľadu cirkvi. Pridanie šablóny sekcie znamená pridať jej zoznam slotov do `SECTIONS` a jej strom do `buildTree`; jednotkový test prejde každú šablónu a overí strom.

**Vstupy.** Text môže uvádzať len fakty z dvoch zdrojov: to, čo používateľ napísal, a `churchContext.facts` — záznamy, ktoré B1Admin zbiera pred plánovaním (verejné časy bohoslužieb a názvy verejných skupín, plus názov cirkvi a adresa). Rovnaké príznaky riadia šablóny založené na dátach: `times` vykreslí živý prvok `serviceTimes`, keď cirkev udržuje časy bohoslužieb v B1 (inak napísanú tabuľku), `groups` a `countdown` sa ponúkajú len vtedy, keď za nimi sú dáta. Volania JEV sa zabezpečujú duplikátom — duplikát sa spustí po 1,5 s a rozhodne prvá odpoveď — pretože brána občas stojí a volania sú takmer zadarmo.

**Zostať pri téme.** Výzva používateľa je *témou stránky*, nie pozadím o cirkvi. `planPage` zaraďuje požiadavku (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`) a pre stránky `event` a `topic` sa všeobecné šablóny cirkvi (poznámka pastora, kázne, služby, skupiny, dopad na komunitu, týždenné časy a odpočítavanie, úvodné video) ani neponúkajú, zatiaľ čo `details` (kedy / kde / čo priniesť) a dátový `eventCountdown` áno. Obaja posudzovatelia hodnotia, či obsah zostáva v téme. B1Admin posiela `pageType` z plánu do každého volania `writePage`.

**Úplné stránky z krátkych požiadaviek.** Stránky majú tri až šesť stredných sekcií, štedré dĺžky slotov, úvodný riadok pri kartových sekciách a päťotázkové FAQ; opravný prechod rozšíri každú sekciu, ktorá sa vráti chudobná. Generovanie je jedno kliknutie: nekladú sa spätné otázky. Ak požiadavka vynechá bežný detail, ktorý úplná stránka potrebuje (čas začiatku, miestnosť, čo priniesť, ako sa prihlásiť), pisateľ doplní pravdepodobnú, skromnú voľbu, ktorú môže cirkev upraviť. Keďže sekcie sa píšu paralelne, tieto medzery sa rozhodnú **raz**, v `planPage` (`assumedDetails`, jedno malé volanie pisateľa, ktoré beží súbežne s výberom rozložení), a odovzdajú sa späť do každého volania `writePage` cez `churchContext.assumedDetails`, takže jedna sekcia nemôže uvádzať 5:00, kým iná 5:30. JEV opraví každú sekciu, ktorá je v rozpore s požiadavkou, záznamami cirkvi alebo týmito rozhodnutými detailmi. Rozhodnuté detaily sa v používateľskom rozhraní nezobrazujú; cirkev stránku preskúma a upraví ako každú inú. Niektoré veci sa nikdy nevymýšľajú: mená osôb, telefónne čísla, e-mailové a webové adresy, ceny, štatistiky, história cirkvi, citáty pripisované osobám a deň v týždni pre dátum, ktorý požiadavka neuvádza.

**Vizuály.** Šablóny nikdy nepomenúvajú svoje fotografie ani ikony. Nechávajú sloty otvorené a jeden všeobecný prechod (`visualSlots` → `pickVisuals` → `applyVisuals` v `SiteGenHelper`) prejde hotový strom a vyplní každý z nich: pozadie sekcie alebo položku galérie označenú `auto:photo`, `auto:icon`, `auto:divider` hlavného bloku a bez akejkoľvek značky aj každý prvok `textWithPhoto`, `card` alebo `image`, ktorého `photo` je prázdne. JEV vyberá každý z nich podľa textu vedľa neho (fotografiu karty podľa nadpisu a textu danej karty; pozadie podľa textu sekcie), pričom sa na stránke žiadny námet neopakuje. Nová šablóna preto dostane fotografie zadarmo. Fotografie sú hľadané námety pre Pexels vydávané ako zástupné symboly `pexels:<term>`, ktoré B1Admin rieši cez `POST /content/stock/search`; klient, ktorý neposiela `resolvesPhotos`, dostane namiesto toho vstavaný hlavný obrázok, ploché farebné pásy a karty bez fotografií. Zámerne sa nepoužívajú námety portrétov a šablóna pastora nemá fotografiu: cudzí človek zo zásob nikdy nesmie zastupovať skutočnú osobu. Pre cirkev, ktorá zatiaľ nemá žiadne stránky, B1Admin uplatní `suggestedStyle` na globálne štýly; existujúce weby si zachovajú svoj vzhľad.

### Ďalšie koncové body

:::info
Tlačidlo prepísania v `SectionToolbar` a tlačidlo „Generovať web“ v zozname stránok v B1Admin zostávajú na strane klienta zakomentované. Koncové body AskApi nižšie stále odpovedajú; skryté je len toto používateľské rozhranie.
:::

| Koncový bod | Účel |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Pôvodný dvojkrokový postup tvorby stránky (osnova, potom jedno volanie LLM na sekciu vydávajúce JSON prvkov). V B1Admin ho kvôli nákladom nahradili `planPage`/`writePage`; ponechaný pre spotrebiteľov API |
| `POST /website/generateSite` | Generovanie celého webu. **Návrhovo dvojfázové**: volanie s `planOnly: true` vráti len plán viacerých stránok (jedno rýchle volanie modelu), potom klient vyžiada úplný obsah — takže každá požiadavka zostáva v časovom limite Lambda/API Gateway |
| `POST /website/rewriteSection` | Prepísanie so zachovaním štruktúry: model smie meniť len odpovede obsahujúce text. Rekurzívny podpis štruktúry (ID + typy + poradie) sa porovnáva pred a po; akákoľvek nezhoda vráti pôvodnú sekciu s `fallback: true` namiesto poškodenej štruktúry |
| `POST /website/generateAltText` | Volanie s obrazovou analýzou nad až 20 URL obrázkov; vracia stručný alternatívny text (≤125 znakov, predpony „fotografia“ sa odstránia) |
| `POST /website/generateMetaDescription` | Jeden SEO meta popis (≤155 znakov) z textového obsahu stránky — napojený na tlačidlo Generovať v nastaveniach stránky v B1Admin |

Výzvy pre tieto koncové body sú súbory markdown v `AskApi/config/instructions/`, vrátane katalógu prvkov, z ktorého model generuje. Dva návrhové body udržujú katalóg poctivý: klient posiela `availableElementTypes` pri každej požiadavke (výzva smie používať len typy z tohto zoznamu — server nikdy nepevne nekóduje úplnú sadu) a nástroj MCP `describe_page_builder` v API nesie rovnaký sprievodca pre AI agentov pracujúcich cez [MCP](../api/mcp.md). Modely sú Anthropic Claude cez OpenRouter — 3.5 Haiku pre obsah sekcií (latencia), 3.5 Sonnet pre osnovy, plány webov a obrazovú analýzu — so záložným OpenAI, keď nie je nakonfigurovaný kľúč OpenRouter.

## Konverzačné formuláre

Formuláre (modul členstva) získali konverzačný režim určený pre stránky v štýle kontaktných kariet. Riadenie zabezpečujú štyri stĺpce v `forms`: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Vykresľovanie** — `FormSubmissionEdit` z apphelper prepne na komponent `ConversationalForm` (jedna otázka naraz), keď je `displayMode` `conversational`; formulárová stránka B1App režim odovzdáva ďalej. Obsah odoslania je v oboch prípadoch rovnaký.
- **Automatické vytvorenie osoby** — pri odoslaní s nastaveným `autoCreatePerson` `ConversationalFormHelper.findOrCreatePerson` odstráni duplicity podľa e-mailu (bez ohľadu na veľkosť písmen) a inak vytvorí domácnosť + osobu s `membershipStatus: "Guest"`, potom odoslanie prepojí s touto osobou.
- **Následný e-mail** — keď je nastavený predmet a text, odosielateľ dostane e-mail podľa šablóny (so značkami `{firstName}` / `{churchName}`) cez existujúcu transakčnú cestu (`TransactionalEmailHelper`), nikdy cez súhrnný kanál oznámení. Oba vedľajšie účinky sú nekritické: zlyhanie nikdy nestratí odoslanie.

Štyri polia sa dnes nastavujú cez API; editor formulárov v B1Admin ich zatiaľ nesprístupňuje.

## Vyrovnávacia pamäť verejnej stránky

Verejná cesta vykresľovania B1App ukladá do vyrovnávacej pamäte načítania označené cirkvou (`next: { revalidate: 300, tags: [sdSlug] }` v produkcii; `0` vo vývoji), takže živá stránka môže po zápise do ContentApi zostať zastaraná až päť minút. `POST /api/revalidate/{sdSlug}` v B1App volá `revalidateTag(sdSlug)` a je jediným spôsobom, ako túto vyrovnávaciu pamäť vyradiť skôr.

Do nej zapisujú dve strany:

1. **B1Admin** — `clearSiteCache()` v `B1Admin/src/site/siteCache.ts` odošle POST po uložení v editore. Uprednostňuje subdoménu aktívnej lokality (sekundárna lokalita musí vyradiť *tú* značku, nie predvolenú značku cirkvi).
2. **Api** — Zmeny obsahu, ktoré neprechádzajú cez B1Admin (kľúče API, MCP, AI), spúšťajú `SiteCacheHelper.bump(churchId)` z kontrolérov obsahu. Pomocník rozpozná subdoménu cirkvi cez `SubDomainHelper` a odošle POST na `{b1AppRoot}/api/revalidate/{sd}`. Chyby sa potláčajú, aby nedostupná B1App nemohla zlyhať uloženie.

Kontroléry, ktoré vykonávajú bump: stránky (uloženie, vymazanie, duplikovanie, publikovanie, zahodenie, zrušenie publikovania, dočasná AI), sekcie, prvky, bloky, odkazy, globálne štýly, príspevky a presmerovania. `b1AppRoot` vo vývoji je `http://{subdomain}.localtest.me:3301`; demo/produkcia používa `https://{subdomain}.b1.church`.

## Súvisiace stránky

- [Smerovanie webových stránok a viac lokalít](./websites.md) — ako sa požiadavka prekladá na cirkev/lokalitu a ako sa smerujú vlastné domény
- [Koncové body obsahu](../api/endpoints/content.md) — úplný REST povrch pre stránky, sekcie, prvky, bloky, príspevky, presmerovania a nastavenia
- [AppHelper](../shared-libraries/app-helper.md) — balík npm, ktorý dodáva vykresľovače, register, oddeľovače a widgety
- [MCP Server](../api/mcp.md) — vrátane nástroja-sprievodcu `describe_page_builder`
- [Editor stránok (pre koncových používateľov)](/docs/b1-admin/website/page-editor) — dokumentácia editora pre zamestnancov
