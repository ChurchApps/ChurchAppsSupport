---
title: "Architektura tvůrce webových stránek"
description: "Vývojářský přehled tvorby webu v B1: strom obsahu, katalog sdílených prvků, renderovací proces a generování stránek pomocí AI v B1 Admin a B1.church."
---

# Architektura tvůrce webových stránek

<div class="article-intro">

Každý webový kostela obsluhovaný B1App se vykresluje z obsahového stromu (stránky, sekce, prvky), který je uložen v ContentApi a upravuje se vizuálně v B1Admin. Jedna sdílená knihovna komponent vykresluje náhled editoru i živý web, jeden katalog typů prvků určuje, co se může na stránce objevit, a samostatná služba AI může strom vygenerovat nebo přepsat. Tato stránka mapuje celý zásobník: kontrakt prvků v `@churchapps/helpers`, renderovací pipeline, prvky s daty kostela, celowebové widgety, vrstvu blogu, stránky s přístupovým omezením, SEO, generování pomocí AI a konverzační formuláře.

</div>

## Přehled

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

Napříč celým zásobníkem platí tři pravidla:

1. **Jeden strom, dva renderery.** Stránka je strom `pages → sections → elements`, kde každý uzel nese své nastavení jako JSON blob `answers`. Stejné komponenty apphelperu vykreslují editor typu drag-and-drop v B1Admin i serverově renderovaný veřejný web v B1App. Neexistuje žádný oddělený „publikační formát“.
2. **Kontrakt žije v `@churchapps/helpers`.** `ElementTypes.ts` je jediný katalog typů prvků, renderery se překládají přes registr v apphelperu a formuláře editoru žijí v B1Admin. Přidání typu prvku znamená zasáhnout všechny tři, v tomto pořadí.
3. **Veřejný web čte anonymní endpointy.** Vše, co B1App potřebuje (strom stránky, nastavení, příspěvky blogu, přesměrování a endpointy s daty kostela v ostatních modulech), je veřejné. Autentizace je volitelná: JWT na anonymním endpointu stromu odemkne stránky jen pro členy, nic jiného se nemění.

## Obsahový strom

Modul content (`Api/src/modules/content`) vlastní data tvůrce:

| Tabulka | Role |
|-------|------|
| `pages` | Jedna stránka na URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` (řízení přístupu) a `metaDescription` (SEO) |
| `sections` | Horizontální pásy na stránce (nebo v bloku): pozadí, barva textu a `answersJSON`, který nese styl plus konfiguraci tvarových oddělovačů `dividerTop`/`dividerBottom` |
| `elements` | Obsahové části uvnitř sekce: `elementType` + `answersJSON`, vnořitelné u rozvržení (řádek/sloupec, karusel) |
| `blocks` | Opakovaně použitelné skupiny sekcí a prvků (bloky patičky, blokové prvky) sdílené mezi stránkami |
| `posts` | Samostatné příspěvky blogu (viz [Blog](#blog)) |
| `redirects` | Dvojice `fromPath → toPath` pro každý kostel, omezené na 200 (viz [SEO](#seo-and-discoverability)) |
| `settings` | Páry klíč–hodnota nastavení kostela; řádky označené `public` jsou podávány anonymně a nesou konfiguraci widgetů a analytiky |

Celý strom pro jednu URL se vrátí jedním anonymním voláním, `GET /content/pages/:churchId/tree?url=/about`, a právě z něj B1App vykresluje na serveru. Požadavky editoru místo toho načítají podle id a zachovávají interní id.

## Kontrakt prvků

### Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definuje každý typ prvku jako `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` a `answersSchema` ve stylu JSON schématu pro jeho odpovědi. `validateElementAnswers()` je záměrně shovívavá. Neznámé typy a nadbytečné klíče projdou, takže starý obsah se nerozbije při aktualizaci katalogu. **Dnes je dodáváno 35 typů:**

| Kategorie | Typy prvků |
|----------|---------------|
| rozvržení (6) | row, column, box, carousel, whiteSpace, block |
| obsah (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| média (4) | image, gallery, video, map |
| kostel (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| pokročilé (2) | rawHTML, iframe |

Prvek `sermons` je ze všech typů pro kostel nejkonfigurovatelnější: odpověď `layout` vybírá `browse` (starý úplný prohlížeč), `grid`, `list` nebo `featuredLatest`, přičemž `playlistId`, `itemCount`, `showTitles` a `showDates` upřesňují rozvržení, která nejsou `browse`.

Prvek `rawHTML` má dvě odpovědi: `rawHTML` (značkování) a `javascript`. Skripty vložené přes `innerHTML` se nikdy nespustí, proto `RawHTMLElement` znovu vytvoří každý uzel `<script>` v značkování jako nový prvek. Tyto uzly, které nevkládá parser, jsou důvěryhodné podle `strict-dynamic` v CSP. Odpověď `javascript`, která začíná `<` (fragment dodavatele vložený i se svými značkami `<script>`), se zpracuje jako značkování a dostane stejné zacházení. Jinak běží jako prostý inline skript. B1Admin označí holou URL v poli JavaScript, protože osamocená URL se spustí jako skript bez účinku. Prvek `map` se nevykreslí a nenačte žádný skript Google Maps, pokud není nakonfigurován klíč Maps API.

### Renderery (`@churchapps/apphelper`)

Renderery jsou v `Packages/apphelper/src/website/components/elementTypes/`, jedna komponenta na typ, a překládají se přes `ElementRegistry.ts`. Je to dvouvrstvá mapa: `Element.tsx` registruje výchozí renderer pro všech 35 typů (`registerDefaultElementRenderer`) a hostitelská aplikace může kterýkoli z nich přepsat za běhu (`registerElementRenderer`), bez forkování balíčku.

### Formuláře editoru (B1Admin)

Formuláře nastavení jednotlivých typů v editoru jsou v `B1Admin/src/site/admin/elements/`. `ElementEdit.tsx` předává na vyhrazenou komponentu (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) nebo na vložený tvůrce polí pro každý typ. AI zrcadlo tohoto katalogu je nástroj MCP `describe_page_builder` v API (viz [MCP Server](../api/mcp.md)).

Náhled editoru připojuje stejný `Theme` jako živý web, který z globálních stylů kostela nastavuje CSS proměnné `--headingFont` a `--bodyFont`. B1App aplikuje tyto proměnné přes `pages.css`, který B1Admin nemůže importovat, takže `ContentEditor.tsx` vkládá `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`), aby je použil na text těla `.page` a na `h1`–`h6`. Bez něj náhled zobrazoval nadpisy písmem administrace.

### Tvarové oddělovače sekcí

Sekce mohou na kterékoli hraně nést dekorativní tvarové oddělovače. Konfigurace je v `answersJSON` sekce jako objekty `dividerTop` a `dividerBottom`: `{ shape, color, height, flip }`, kde `shape` je jedno z `wave, waves, slant, curve, triangle, peaks`. Apphelper dodává komponentu `SectionDivider` a pomocnou funkci `parseDividerConfig()`. Renderery sekcí obou aplikací (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parsují odpovědi a připojují oddělovač. `SectionEdit.tsx` v B1Admin poskytuje výběr. Balíčky dodávají jen stavební blok, propojení na úrovni sekce je úkolem aplikací, které je používají.

## Prvky s daty kostela

Tři typy prvků vykreslují živá data kostela místo autorského obsahu. Izolace modulů platí i tak: každý z nich volá veřejný endpoint vlastnícího modulu přímo z prohlížeče.

| Prvek | Endpoint | Poznámky |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Vrací `{ fundId, totalAmount, donationCount }`, volitelně okno `?startDate=&endDate=`. Prvek to porovnává s odpovědí `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Pouze opt-in**: skupina musí mít nastaveno `publicRoster` (výchozí vypnuto). Projekce je záměrně minimální: `personId`, `displayName`, `leader`, fotografie. Bez kontaktních nebo demografických polí |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Vrací strom kampus → služba → čas. Renderer apphelperu z něj vytváří best-effort JSON-LD `Event` podle schema.org (API vrací prosté údaje) |

:::warning
`publicRoster` je bezpečnostní brána pro `staffGrid`. Nikdy nerozšiřujte veřejnou projekci členů skupiny ani neobcházejte příznak. Endpoint seznamu je záměrně anonymní a minimální seznam polí je jeho bezpečnostní vlastnost.
:::

### Prvek kalendáře a stránky událostí

Odpovědi prvku `calendar` jsou `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, výchozí, nebo `upcoming`) a `tag`. B1App přepisuje renderer apphelperu v `src/components/Element.tsx` pomocí `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** vykreslí `UpcomingEventsElement` z B1App. Načítá `GET /content/events/public/group/:churchId/:groupId` nebo `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, rozbaluje opakování pomocí `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, jeden výskyt na událost v rámci roku) a zobrazuje prvních 12 jako fotodlaždice (`events.photoUrl`, jinak název na tmavé barvě motivu) odkazující na `/events/{id}`. Součástí je nabídka Odebírat pro ICS kanál kalendáře.
- **`display: "month"`** vykreslí `CalendarElement` z apphelperu s callbackem `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` pak při kliknutí přejdou na tuto URL místo otevření dialogu s podrobnostmi. B1Admin `eventUrl` nepředává, takže administrační kalendář zachovává dialog.
- **`tag`** filtruje obě zobrazení pomocí `EventHelper.hasTag()` (`@churchapps/helpers`): shoda bez ohledu na velikost písmen s oddělenými čárkami `events.tags`, prázdná hodnota zobrazí vše. Spojení kurátorovaného kalendáře vybírá `e.tags`, aby kurátorované události je nesly.

Kurátorované události odkazují přes `realEventId` (`eventPageId()`), takže URL vždy pojmenovává podkladovou událost. `/{sdSlug}/events/[eventId]` je vyhrazená trasa (ne pipeline tvůrce). Načte `GET /content/events/public/:churchId/:id`, který pro události čekající na schválení nebo zamítnuté a pro soukromé události bez registrace vrací `null`, a přidává `roomNames` z rezervací místností, které nejsou zamítnuté. Vykreslí `EventPageContent` (hero s fotografií, popis v markdownu, postranní panel Kdy/Kde, **Registrovat se na tuto událost**, když je `registrationEnabled`, a odkaz **Přidat do mého kalendáře** na `GET /content/events/public/:churchId/:id/ical`). Fotografii použije jako obrázek Open Graph a přes `EventPageJsonLd` vysílá JSON-LD `Event` pro další výskyt. Neznámá nebo skrytá událost vrátí skutečnou 404.

## Celowebové widgety

Dva widgety se vykreslují na každé veřejné stránce mimo strom: **AnnouncementBanner** (lišta nahoře stránky, kterou lze zavřít) a **Launcher** (plovoucí akční centrum pro odkazy typu dej, navštiv, sleduj). Obě komponenty a jejich pomocné funkce `parse*Config()` jsou v apphelperu. Konfigurace jsou dva veřejné řádky nastavení, s klíči `announcementBanner` a `launcher`. Zapisuje je komponenta `SiteWidgetsEdit` v B1Admin (na stránce Vzhled) a čte veřejný layout B1App přes `GET /content/settings/public/:churchId`. API je bere jako neprůhledné páry klíč–hodnota. Názvy klíčů jsou dohoda mezi oběma aplikacemi.

## Blog

Blog je samostatný typ obsahu, ne vrstva nad stránkami tvůrce. Řádek `posts` drží celý příspěvek: `title`, `slug`, `excerpt`, `content` (tělo v markdownu), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Veřejný povrch (vše anonymní, `PostController`):

| Trasa | Účel |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publikované příspěvky, filtrovatelné přes `?category=&tag=`, stránkované |
| `GET /content/posts/public/:churchId/categories` | Různé kategorie napříč publikovanými příspěvky |
| `GET /content/posts/public/:churchId/slug/:slug` | Jeden publikovaný příspěvek |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 kanál nadepsaný názvem kostela, s kategorií každé položky a popisem jako výňatek, nebo obsah |

Příspěvek je „publikovaný“, jakmile je nastaveno `publishDate` a je v minulosti. Budoucí `publishDate` znamená naplánovaný příspěvek: veřejně skrytý, v administraci zobrazený s čipem „Scheduled“. Koncové body pro čtení obohacují každý příspěvek o `authorName`, které se převede z `authorId` přes bránu modulu membership. Chybějící výňatky se v seznamových kartách, meta popisech a RSS nahradí obsahem bez markdownu (~160 znaků).

B1App podává `/{sdSlug}/blog`, redakční seznam. Má vystředěnou hlavičku, která se při filtrování změní na název aktivní kategorie nebo štítku, řádek filtrů čipů kategorií a řádky příspěvků s miniaturou vlevo, s autory a výňatky. RSS kanál je inzerován jako alternativní odkaz. Dále podává `/{sdSlug}/blog/[postSlug]`, vyhrazenou trasu (ne pipeline Zone/Section), s vystředěnou hlavičkou (štítek kategorie, nadpis, autor, akcentová linka v primární barvě), hero 16:9 o šířce kontejneru, tělo v markdownu v čtecím sloupci o šířce ~720 px, štítky v zápatí článku, pás „Více v `{category}`“ se souvisejícími příspěvky a JSON-LD `BlogPosting` včetně autora. Obě stránky se stylují výhradně z tokenů motivu, takže dědí paletu každého kostela. URL blogu jsou zahrnuty v sitemapě každého kostela.

Autorské rozhraní B1Admin (**Site → Blog**) upravuje příspěvky v dialogu. Obsahuje editor markdownu s přepínačem náhledu, výběr obrázků z galerie s oříznutím 16:9, výběr autora (výchozí je upravující uživatel), automatické doplňování kategorií naplněné ze stávajících kategorií, ověření duplicitního slugu a přepínač publikování. Publikované řádky odkazují na živý příspěvek a stránka upozorňuje správce, aby přidali navigační odkaz `/blog`. Komentáře ponechávají externím službám: celokostelové veřejné nastavení obsahu `blogFooterHtml` (upravované v **Below Every Post** na stránce Blog a zobrazené jen s **Settings→Edit**) se vykresluje pod každým příspěvkem komponentou `BlogFooterEmbed` z B1App. Ta znovu vytváří značky `<script>`, aby se spustily podle `'strict-dynamic'`, a spouští je v pořadí (externí `src` dokončí načítání dříve, než se spustí další inline skript), protože fragmenty dodavatelů nejdřív načtou knihovnu a pak ji zavolají.

## Stránky pouze pro členy

`pages.visibility` znovu používá výčet odkazů navigace: `everyone` (výchozí), `visitors`, `members`, `staff`, `team`, `groups` (s `groupIds`). Jde ale o **tvrdou přístupovou bránu**, ne filtr navigace (`PageVisibilityHelper.canViewPage`). Postup:

1. Anonymní endpoint stromu kontroluje viditelnost u načtení podle URL. Anonymní volající chráněné stránky dostanou `{ restricted: true, visibility }` místo obsahu, takže strom nikdy neprozradí obsah.
2. Endpoint stále respektuje JWT. `CustomAuthProvider` ověřuje hlavičku `Authorization` u *každého* požadavku, včetně anonymních tras, takže načtení stejné URL přihlášeným členem se vyřídí normálně.
3. B1App vykreslí `RestrictedPage` při odpovědi `restricted`. Obnoví relaci z uložených přihlašovacích údajů, znovu načte strom s JWT a vykreslí jej. Pokud relace neexistuje, zobrazí přihlašovací bránu s `returnUrl`.

:::info
Granularita brány se liší podle úrovně. `groups` kontroluje `groupIds` z tokenu oproti seznamu stránky a `staff` kontroluje `membershipStatus`, ale `members` a `team` zatím propustí každého ověřeného uživatele kostela. Berte `groups` jako přísnou možnost.
:::

## SEO a objevitelnost

Vše zde je vykreslování na straně B1App nad daty ContentApi. API ukládá, aplikace vydává:

| Oblast | Jak to funguje |
|---------|--------------|
| Meta popisy | `pages.metaDescription` (≤300 znaků) prochází přes `MetaHelper.getMetaData()` do Next.js `Metadata` (description a Open Graph) na každé trase vykreslené tvůrcem. Nastavení stránky v B1Admin obsahuje tlačítko AI „Generate“ (viz níže) |
| Přesměrování | Záznamy `redirects` pro každý kostel, spravované na `/content/redirects` (`content.edit`, limit 200 řádků, normalizované cesty). U případu 404 trasa stránky B1App přeloží cestu přes `GET /content/redirects/public/:churchId` a vydá HTTP 308 přes `permanentRedirect` v Next. Nenalezené cesty propadnou do `notFound()` |
| Stránka 404 se značkou | `not-found.tsx` vykresluje `BrandedNotFound` s logem kostela, názvem a motivem místo obecné chyby. Neznámé cesty `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` a `/volunteer/[planId]` vrací skutečnou 404, stejně jako neznámé subdomény a chybné slugy stránek (viz [Směrování webu a více webů](./websites.md)) |
| Strukturovaná data | JSON-LD `BlogPosting` u příspěvků blogu. `VideoObject` na stránkách jednotlivých kázání (`/{sdSlug}/sermons/[sermonId]`) a na stránkách obsahujících prvek `sermons`. `Event` z prvků kalendáře a událostí na stránkách tvůrce a na každé stránce `/{sdSlug}/events/[eventId]` (další výskyt, s fotografií události jako `image`). schema.org `Event` z prvku `serviceTimes` |
| Stránky kázání | Každé veřejné kázání dostane procházitelnou stránku na `/sermons/[sermonId]` s úplnými metadaty. Kázání už nejsou uzamčena uvnitř prohlížečového prvku na straně klienta |
| Analytika | Veřejný klíč nastavení `ga4MeasurementId` (spravovaný vedle přesměrování v B1Admin) vkládá gtag GA4 pro každý kostel přes `next/script`. Aplikace B1 (`/{sdSlug}/mobile`) posílá zobrazení stránek také na toto ID vedle vlastní značky ChurchApps, pokud jde o platné ID `G-` (ID kontejnerů GTM zůstávají jen pro web). Každé `gtag('config')` nese `display_mode` s hodnotou `installed` nebo `browser`, podle `navigator.standalone` nebo dotazu média `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemapa a kanály | Trasa `sitemap.xml` pro každý kostel zahrnuje stránky tvůrce, URL blogu a 50 nejnovějších stránek kázání (s `<lastmod>` z data publikování každého kázání). Uvádí také vestavěné stránky `/sermons`, `/groups` a `/volunteer`, pokud mají obsah (veřejné skupiny, plány dobrovolnictví), pokud uložené přesměrování tuto cestu nenahrazuje. `/` se vynechá, když kostel nemá domovskou stránku, protože `/` pak přesměrovává na zakázané `/mobile`. Seznam blogu inzeruje kanál RSS |
| Přístupnost | Veřejný rámec vykresluje odkaz pro přeskočení, který cílí na landmark `<main id="main-content">` v každém obalu layoutu |

## Generování pomocí AI (AskApi)

Generování stránek a webů běží v **AskApi**, samostatné službě pod kontrolérem `/website`. Ověřuje se stejným JWT `CustomAuthProvider` jako vše ostatní a je **bezstavová vůči obsahu**: každý endpoint vrací JSON a volající (B1Admin) výsledek ukládá přes ContentApi. `POST /content/pages/importTree` vytvoří stránku s celým vnořeným stromem sekcí a prvků jedním voláním a vždy vkládá pod kostel volajícího, přičemž ignoruje id v těle požadavku.

### Generování stránek (`planPage` → `writePage`)

Šablona „AI“ stránky v `AddPageModal` v B1Admin používá nízkonákladovou pipeline (`AskApi/src/helpers/SiteGenHelper.ts`) postavenou na jednom pravidle: **žádný model nikdy nevydává JSON tvůrce**. Dva modely si práci rozdělují přes Vercel AI Gateway (prosté HTTP, klíč SSM `/{env}/aiGatewayApiKey` nebo `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) je typově bezpečný rozhodovací model, který vrací volby, skóre a booleany s pravděpodobnostmi, ale neumí psát text. Postupně vybírá každou sekci z pevné knihovny šablon, hodnotí rozvržení, ověřuje fakta v textu a vybírá fotografie ze skladu a ikony. Vstup stojí přibližně 0,04 USD za milion tokenů a výstup je zdarma, takže ~90 volání na stránku stojí zlomek centu.
- **Malý chatovací model (ve výchozím nastavení GPT-4.1 mini)** vyplňuje pojmenované textové sloty s omezenou délkou ve vybraných šablonách. Pisatel je jedna konstanta, přepsatelná proměnnou prostředí `SITEGEN_COPY_MODEL` (jakékoli ID chatovacího modelu na bráně, např. `anthropic/claude-haiku-4.5`). V slepém srovnání vedle sebe u tří kostelů četl Claude Haiku 4.5 o něco vřeleji, ale GPT-4.1 mini byl blízko, zhruba 4× levnější a rychlejší, proto je výchozí. Celá stránka se všemi třemi rozvrženími stojí přibližně 1,3 centu, z toho asi 80 % připadá na pisatele.

| Fáze | Endpoint | Co se děje |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Klasifikuje typ stránky (domů, návštěva, o nás…), pak vybírá 10 kandidátních rozvržení z pravděpodobností JEV pro kolo (hero + počet sekcí → každá sekce → závěr). Odstraňuje duplicity, nechá JEV ohodnotit každé z hlediska vhodnosti, toku a mezer, a vrátí top 3 spolu s hlasem psaní a `suggestedStyle` (paleta a písma). Kandidáti, kteří mají zatím stejné sekce, kladou JEV totožnou otázku, takže kola se memoizují podle prefixu. Nejlepší skóre pod 6 se zapíše jako `lowLayoutScore`. Tento záznam je seznam šablon, které stojí za přidání. ~2 s |
| 2 | `POST /website/writePage` (jedno volání na kandidáta) | Pisatel vyplní textové sloty po dvou sekcích na volání, paralelně, a vrátí pět hlavních nadpisů, mezi nimiž JEV vybírá. JEV ověřuje fakta u každé sekce. Sekce, které neprojdou, používají frázi z klišé nebo opakují dřívější sekci (sdílené čtyřslovné úseky, kontrolované v kódu), se přepisují paralelně s konkrétním důvodem. Čistič kódu odstraní věty s klišé frázemi webů kostelů (pokud je vlastní popis kostela nepoužívá). JEV vybere předměty fotografií, ikony a tvarový oddělovač hera a ohodnotí výsledek. Vrací strom sekcí připravený k uložení a skóre. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin zapíše jen nejlépe hodnocené rozvržení (druhé je záložní, pokud zápis selže), uloží jej a otevře náhled (~10 s po Uložit) |

Každá fáze je vlastní požadavek, aby každé volání zůstalo v limitu 29 sekund API Gateway. Šablony v `SiteGenHelper.buildTree` jsou pevné stromy sekcí a prvků z katalogu (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`). Odkazují na tokeny motivu (`var(--accent)`, `var(--lightAccent)`…), takže vygenerované stránky dědí stávající nastavení vzhledu kostela. Přidání šablony sekce znamená přidat její seznam slotů do `SECTIONS` a její strom do `buildTree`. Jednotkový test projde každou šablonu a ověří strom.

**Vstupy.** Text smí uvádět jen fakta ze dvou zdrojů: co uživatel napsal, a `churchContext.facts`. Druhé jsou záznamy, které B1Admin shromáždí před plánováním: veřejné časy bohoslužeb, názvy veřejných skupin, název kostela a adresa. Stejné příznaky řídí šablony závislé na datech. `times` vykreslí živý prvek `serviceTimes`, pokud kostel drží časy bohoslužeb v B1 (jinak napsanou tabulku). `groups` a `countdown` se nabízejí jen tehdy, když za nimi jsou data. Volání JEV jsou zajištěna proti zpoždění: duplikát se spustí po 1,5 s a vyhrává první odpověď, protože brána občas zadrhne a volání jsou téměř zdarma.

**Zůstat u tématu.** Výzva uživatele je *předmětem stránky*, ne pozadím o kostele. `planPage` klasifikuje požadavek (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). U stránek `event` a `topic` se šablony obecné pro kostel (poznámka pastora, kázání, služby, skupiny, dopad na komunitu, týdenní časy a odpočet, hero s videem) vůbec nenabízejí. Nabízejí se `details` (kdy, kde, co přinést) a datový `eventCountdown`. Oba posuzovatelé hodnotí, zda je obsah k tématu. B1Admin předává `pageType` z plánu do každého volání `writePage`.

**Úplné stránky z krátkých požadavků.** Stránky mají tři až šest prostředních sekcí, štědré délky slotů, úvodní větu u karetních sekcí a pětiotázkové FAQ. Opravný průchod rozšíří každou sekci, která vyjde chudě. Generování je jedno kliknutí, bez doplňujících otázek. Pokud požadavek vynechá běžný detail, který úplná stránka potřebuje (čas začátku, místnost, co přinést, jak se přihlásit), pisatel doplní věrohodnou, skromnou volbu, kterou může kostel upravit. Protože se sekce píší paralelně, tyto mezery se rozhodnou **jednou**, v `planPage` (`assumedDetails`, jedno malé volání pisatele, které běží souběžně s vzorkováním rozvržení). Předají se zpět do každého volání `writePage` přes `churchContext.assumedDetails`, takže jedna sekce nemůže říkat 5:00, zatímco jiná říká 5:30. JEV opraví každou sekci, která odporuje požadavku, záznamům kostela nebo těmto rozhodnutým detailům. Rozhodnuté detaily se v UI nezobrazují. Kostel stránku zkontroluje a upraví jako každou jinou. Některé věci se nikdy nevymýšlejí: jména osob, telefonní čísla, e-mailové a webové adresy, ceny, statistiky, historie kostela, citace připisované osobám a den v týdnu pro datum, na které požadavek den neuvedl.

**Vizuály.** Šablony nikdy nepojmenovávají své fotografie ani ikony. Nechávají sloty otevřené a jeden obecný průchod (`visualSlots` → `pickVisuals` → `applyVisuals` v `SiteGenHelper`) prochází hotový strom a vyplní každý z nich: pozadí sekce nebo položku galerie označenou `auto:photo`, `auto:icon`, tvarový oddělovač hera `auto:divider` a, bez jakéhokoli značení, každý prvek `textWithPhoto`, `card` nebo `image`, jehož `photo` je prázdné. JEV vybírá každou z textu vedle ní (fotografii karty z jejího nadpisu a textu, pozadí z textu sekce), bez opakování jakéhokoli předmětu na stránce. Nová šablona tak dostane fotografie zadarmo. Fotografie jsou hledané výrazy Pexels vydané jako zástupné `pexels:<term>`, které B1Admin přeloží přes `POST /content/stock/search`. Klient, který neposílá `resolvesPhotos`, dostane vestavěný obrázek hera, ploché barevné pásy a karty bez fotografií. Záměrně nejsou žádné portrétní předměty a šablona pastora nemá žádnou fotografii: cizí člověk z fotobanky nesmí nikdy zastupovat skutečnou osobu. Pro kostel bez stránek B1Admin použije `suggestedStyle` na globální styly. Stávající weby si zachovají svůj vzhled.

### Další endpointy

:::info
Tlačítko přepsání v `SectionToolbar` a tlačítko „Generate Site“ v seznamu stránek v B1Admin zůstávají na straně klienta zakomentované. Níže uvedené endpointy AskApi stále odpovídají. Skryté je pouze toto UI.
:::

| Endpoint | Účel |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Původní dvoukrokový postup stránky (osnova, pak jedno volání LLM na sekci vydávající JSON prvků). V B1Admin nahrazen za `planPage`/`writePage` kvůli nákladům, ponechán pro konzumenty API |
| `POST /website/generateSite` | Generování celého webu. **Dvoufázové záměrně**: volání s `planOnly: true` vrátí jen plán více stránek (jedno rychlé volání modelu). Pak klient vyžádá plný obsah, takže každý požadavek zůstane v časovém limitu Lambda a API Gateway |
| `POST /website/rewriteSection` | Přepsání se zachováním struktury: model smí měnit jen odpovědi nesoucí text. Rekurzivní podpis struktury (id, typy, pořadí) se porovná před a po přepsání. Jakákoli neshoda vrátí původní sekci s `fallback: true` místo poškozené struktury |
| `POST /website/generateAltText` | Vizuální volání nad až 20 URL obrázků. Vrací stručný alternativní text (≤125 znaků, předpony „photo of“ odstraněny) |
| `POST /website/generateMetaDescription` | Jeden SEO meta popis (≤155 znaků) z textového obsahu stránky. Napojený na tlačítko Generate v nastavení stránky B1Admin |

Prompty těchto endpointů jsou soubory markdown v `AskApi/config/instructions/`, včetně katalogu prvků, ze kterého model generuje. Dva návrhové body udržují katalog poctivý. Klient posílá `availableElementTypes` u každého požadavku, takže prompt smí používat jen typy z tohoto seznamu. Server nikdy nezadrátuje celou sadu. Nástroj MCP `describe_page_builder` v API nese stejného průvodce pro agenty AI, kteří pracují přes [MCP](../api/mcp.md). Modely jsou Anthropic Claude přes OpenRouter: 3.5 Haiku pro obsah sekcí (kvůli latenci), 3.5 Sonnet pro osnovy, plány webů a vizuály. Záložním je OpenAI, pokud není nakonfigurován klíč OpenRouter.

## Konverzační formuláře

Formuláře (modul membership) získaly konverzační režim zaměřený na stránky typu karty pro spojení. Čtyři sloupce na `forms` ho řídí: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject` a `followUpBody`.

- **Vykreslování**: `FormSubmissionEdit` z apphelperu přepne na komponentu `ConversationalForm` (jedna otázka najednou), když je `displayMode` `conversational`. Stránka formuláře B1App režim předává dál. Odeslání má oběma způsoby stejný obsah.
- **Automatické vytvoření osoby**: při odeslání s nastaveným `autoCreatePerson` `ConversationalFormHelper.findOrCreatePerson` deduplikuje podle e-mailu (bez ohledu na velikost písmen). Jinak vytvoří domácnost a osobu s `membershipStatus: "Guest"` a pak odeslání propojí s touto osobou.
- **Navazující e-mail**: když je nastaven předmět a text, odesílatel dostane šablonovaný e-mail (s žetony `{firstName}` a `{churchName}`) přes stávající transakční cestu (`TransactionalEmailHelper`), nikdy přes digest oznámení. Oba vedlejší efekty jsou nefatální: selhání nikdy neztratí odeslání.

Čtyři pole se dnes nastavují přes API. Editor formulářů v B1Admin je zatím nezpřístupňuje.

## Mezipaměť veřejného webu

Veřejná cesta vykreslování B1App ukládá do mezipaměti načtení označená kostelem (`next: { revalidate: 300, tags: [sdSlug] }` v produkci, `0` ve vývoji). Živá stránka tak může zůstat zastaralá až pět minut po zápisu do ContentApi. `POST /api/revalidate/{sdSlug}` na B1App volá `revalidateTag(sdSlug)` a je jediným způsobem, jak mezipaměť zahodit dříve.

Do ní zapisují dva zapisovatelé:

1. **B1Admin**: `clearSiteCache()` v `B1Admin/src/site/siteCache.ts` odesílá POST po uložení v editoru. Přednostně používá subdoménu aktivního webu. Sekundární web musí zneplatnit *tu* značku, ne výchozí značku kostela.
2. **Api**: úpravy obsahu, které nikdy neprocházejí B1Admin (klíče API, MCP, AI), spouští `SiteCacheHelper.bump(churchId)` z kontrolérů obsahu. Pomocník přes `SubDomainHelper` zjistí subdoménu kostela a odešle POST na `{b1AppRoot}/api/revalidate/{sd}`. Chyby se tiše pohltí, aby nedostupná B1App nemohla shodit uložení.

Kontroléry, které provádějí bump: stránky (uložení, smazání, duplikace, publikace, zahození, zrušení publikace, dočasná AI), sekce, prvky, bloky, odkazy, globální styly, příspěvky a přesměrování. Vývojový `b1AppRoot` je `http://{subdomain}.localtest.me:3301`. Demo a produkce používají `https://{subdomain}.b1.church`.

## Související stránky

- [Směrování webu a více webů](./websites.md) — jak se požadavek přiřadí kostelu nebo webu a jak se směrují vlastní domény
- [Endpointy obsahu](../api/endpoints/content.md) — kompletní REST rozhraní pro stránky, sekce, prvky, bloky, příspěvky, přesměrování a nastavení
- [AppHelper](../shared-libraries/app-helper.md) — balíček npm, který dodává renderery, registr, oddělovače a widgety
- [MCP Server](../api/mcp.md) — včetně nástroje s průvodcem `describe_page_builder`
- [Editor stránek (koncový uživatel)](/docs/b1-admin/website/page-editor) — dokumentace editoru pro zaměstnance
