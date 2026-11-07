---
title: "Weboldal-szerkesztő architektúrája"
description: "A B1 weboldal-építő fejlesztői térképe: tartalomfa, megosztott elemkatalógus, megjelenítési folyamat és AI-alapú oldalgenerálás a B1 Adminban és a B1.churchben."
---

# Weboldal-szerkesztő architektúrája

<div class="article-intro">

A B1App által kiszolgált minden gyülekezeti weboldal egy tartalomfából épül fel: oldalak, szakaszok és elemek alkotják, amelyeket a ContentApi tárol, és a B1Admin vizuálisan szerkeszt. Egyetlen közös komponenskönyvtár jeleníti meg a szerkesztő előnézetét és az élő webhelyet, egy elemtípus-katalógus határozza meg, mi jelenhet meg egy oldalon, és egy külön AI-szolgáltatás tud új fát generálni vagy meglévőt átírni. Ez az oldal a teljes rendszert mutatja be: az `@churchapps/helpers` elemszerződését, a megjelenítési folyamatot, a gyülekezeti adatelemeket, a webhely-szintű widgeteket, a blogréteget, a hozzáférés-korlátozott oldalakat, a keresőoptimalizálást (SEO), az AI-generálást és a beszélgetős űrlapokat.

</div>

## Áttekintés

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

A stack mindhárom szabálya:

1. **Egy fa, két megjelenítő.** Az oldal egy `pages → sections → elements` fa, ahol minden csomópont a beállításait egy `answers` JSON-blokkban tárolja. Ugyanazok az apphelper-komponensek jelenítik meg a húzd-és-ejtsd szerkesztőt a B1Admin-ban és a szerveroldalon renderelt nyilvános webhelyet a B1App-ban. Nincs külön „közzétételi formátum".
2. **A szerződés a `@churchapps/helpers` csomagban van.** Az `ElementTypes.ts` az elemtípusok egyetlen katalógusa; a megjelenítők az apphelperben lévő regisztráción keresztül oldódnak fel; a szerkesztőűrlapok a B1Admin-ban élnek. Új elemtípus hozzáadásakor mindhárom helyet módosítani kell, ebben a sorrendben.
3. **A nyilvános webhely névtelen végpontokat olvas.** A B1App-nak szüksége van mindenre, amit más modulok kínálnak: az oldalfára, a beállításokra, a blogbejegyzésekre, az átirányításokra és a gyülekezeti adatvégpontokra. Ezek mind nyilvánosak. A hitelesítés opcionális: a névtelen fa-végponton a JWT csak a csak tagoknak szóló oldalakat nyitja meg, minden más változatlan marad.

## A tartalomfa

A tartalommodul (`Api/src/modules/content`) kezeli a szerkesztő adatait:

| Tábla | Szerep |
|-------|--------|
| `pages` | Egy oldal URL-enként: `url`, `title`, `layout`, továbbá `visibility`/`groupIds` (hozzáférés-korlátozás) és `metaDescription` (SEO) |
| `sections` | Vízszintes sávok egy oldalon (vagy blokkban): háttér, szövegszín, valamint egy `answersJSON`, amely a stílust és a `dividerTop`/`dividerBottom` alakzat-elválasztók beállításait tartalmazza |
| `elements` | Tartalomelemek egy szakaszon belül: `elementType` + `answersJSON`; az elrendezéstípusok (sor, oszlop, körhinta) egymásba ágyazhatók |
| `blocks` | Újrafelhasználható szakasz- és elemcsoportok (láblécblokkok, elemblokkok), amelyeket több oldal is használhat |
| `posts` | Önálló blogbejegyzések (lásd [Blog](#blog)) |
| `redirects` | Gyülekezetenként `fromPath → toPath` párok, legfeljebb 200 (lásd [SEO](#seo-and-discoverability)) |
| `settings` | Kulcs-érték gyülekezeti beállítások; a `public` jelzésű sorok névtelenül érhetők el, és tartalmazzák a widget- és analitikai beállításokat |

Egy URL teljes fáját egyetlen névtelen hívás adja vissza, a `GET /content/pages/:churchId/tree?url=/about`, és ebből renderel szerveroldalon a B1App. A szerkesztői kérések azonosító alapján kérik le az adatokat, és megtartják a belső azonosítókat.

## Az elemszerződés

### A katalógus (`@churchapps/helpers`)

A `Packages/helpers/src/ElementTypes.ts` minden elemtípust `ElementTypeDefinition` formában ír le: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, valamint egy JSON-séma jellegű `answersSchema` a válaszaihoz. A `validateElementAnswers()` szándékosan engedékeny: az ismeretlen típusok és a felesleges kulcsok átengedésre kerülnek, így a régi tartalom nem törik el a katalógus frissítésekor. **Jelenleg 35 típus érhető el:**

| Kategória | Elemtípusok |
|-----------|-------------|
| elrendezés (6) | row, column, box, carousel, whiteSpace, block |
| tartalom (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| média (4) | image, gallery, video, map |
| gyülekezet (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| haladó (2) | rawHTML, iframe |

A `sermons` elem a legszélesebben beállítható gyülekezeti típus: a `layout` válasz a `browse` (a régi, teljes böngésző), a `grid`, a `list` vagy a `featuredLatest` közül választ, a nem `browse` elrendezéseknél pedig a `playlistId`, `itemCount`, `showTitles` és `showDates` finomítja a megjelenítést.

A `rawHTML` elemnek két válasza van: `rawHTML` (jelölés) és `javascript`. Az `innerHTML`-en keresztül beszúrt szkriptek soha nem futnak le, ezért a `RawHTMLElement` a jelölésben szereplő minden `<script>` csomópontot új elemként hoz létre újra. Ezek a nem parser által beszúrt csomópontok megbízhatónak számítanak a CSP `strict-dynamic` szabálya szerint. Ha a `javascript` válasz `<` karakterrel kezdődik (egy szállítói kódrészlet a `<script>` címkéivel együtt), a rendszer jelölésként elemzi, és ugyanígy kezeli. Egyébként egyszerű beágyazott szkriptként fut. A B1Admin jelzi, ha a JavaScript mezőben csupasz URL áll, mert az önmagában egy üres, hatástalan szkriptként futna. A `map` elem nem jelenít meg semmit, és nem tölt be Google Maps szkriptet, ha nincs beállítva Maps API-kulcs.

### Megjelenítők (`@churchapps/apphelper`)

A megjelenítők a `Packages/apphelper/src/website/components/elementTypes/` könyvtárban élnek, típusonként egy-egy komponenssel, és az `ElementRegistry.ts` oldja fel őket. Ez egy kétrétegű táblázat: az `Element.tsx` regisztrálja az alapértelmezett megjelenítőt mind a 35 típushoz (`registerDefaultElementRenderer`), a fogadó alkalmazás pedig futásidőben felülírhatja bármelyiket (`registerElementRenderer`), anélkül hogy a csomagot elágaztatná.

### Szerkesztőűrlapok (B1Admin)

A szerkesztő típusonkénti beállítási űrlapjai a `B1Admin/src/site/admin/elements/` könyvtárban vannak. Az `ElementEdit.tsx` egy külön komponenshez irányítja a kérést (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` …), vagy típusonként egy beágyazott mezőépítőhöz. A katalógus AI-oldali tükre az API MCP-eszköze, a `describe_page_builder` (lásd [MCP-szerver](../api/mcp.md)).

A szerkesztő előnézete ugyanazt a `Theme`-et csatolja, mint az élő webhely. Ez a globális stílusokból állítja be a `--headingFont` és `--bodyFont` CSS-változókat. A B1App ezeket a változókat a `pages.css` fájlon keresztül alkalmazza, amelyet a B1Admin nem tud importálni, ezért a `ContentEditor.tsx` beilleszti az `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) stílust, hogy ezek a `.page` szöveg- és `h1`–`h6` címsorok betűtípusára is érvényesüljenek. Enélkül az előnézet az admin betűtípusával mutatta volna a címeket.

### Szakaszok alakzat-elválasztói

A szakaszokon mindkét szélen lehetnek dekoratív alakzat-elválasztók. A beállítás a szakasz `answersJSON` mezőjében van, `dividerTop` / `dividerBottom` objektumokként: `{ shape, color, height, flip }`, ahol a `shape` értéke `wave, waves, slant, curve, triangle, peaks` közül való. Az apphelper a `SectionDivider` komponenst és a `parseDividerConfig()` segédfüggvényt szállítja. Mindkét alkalmazás szakaszmegjelenítője (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) feldolgozza a válaszokat és csatolja az elválasztót, a B1Admin `SectionEdit.tsx` pedig a választó felületet biztosítja. A csomagok csak az építőelemet adják, a szakasz szintű bekötés a felhasználó alkalmazások feladata.

## Gyülekezeti adatelemek

Három elemtípus élő gyülekezeti adatot jelenít meg, nem szerkesztett tartalmat. A modulok közötti elszigetelés itt is érvényes: mindegyik a saját modulja nyilvános végpontját hívja közvetlenül a böngészőből:

| Elem | Végpont | Megjegyzés |
|------|---------|------------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | A `{ fundId, totalAmount, donationCount }` értéket adja vissza, opcionálisan `?startDate=&endDate=` időszakkal; az elem összeveti a `goalAmount` válasszal |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Csak bekapcsolással**: a csoporton be kell állítani a `publicRoster` jelzőt (alapértelmezetten ki). A kivetítés szándékosan minimális: `personId`, `displayName`, `leader`, fotó; nincs elérhetőségi vagy demográfiai mező |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | A gyülekezethelyek → istentiszteletek → időpontok fáját adja vissza; az apphelper megjelenítője ebből becslés alapján schema.org `Event` JSON-LD-t állít elő (az API csak nyers adatot ad) |

:::warning
A `publicRoster` a `staffGrid` adatvédelmi kapuja. Soha ne bővítsd a nyilvános csoporttag-kivetítést, és ne kerüld meg a jelzőt: a névsor-végpont szándékosan névtelen, és a minimális mezőlista a biztonsági tulajdonság.
:::

### Naptárelem és eseményoldalak

A `calendar` elem válaszai a `calendarType` (`group` | `curated`), a `calendarId`, a `display` (`month`, ez az alapértelmezett, vagy `upcoming`) és a `tag`. A B1App a `src/components/Element.tsx` fájlban a `registerElementRenderer("calendar", …)` hívással felülírja az apphelper megjelenítőjét:

- **`display: "upcoming"`** esetén a B1App `UpcomingEventsElement` komponense jelenik meg: betölti a `GET /content/events/public/group/:churchId/:groupId` vagy a `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId` végpontot, a `buildOccurrences()` (`src/helpers/EventOccurrences.ts`) kibontja az ismétlődéseket (egy eseményből évente egy előfordulás), és az első 12-t fotós csempeként mutatja (`events.photoUrl`, ennek hiányában a cím a téma sötét színén), amelyek a `/events/{id}` oldalra mutatnak. Van egy Feliratkozás menü is a naptár ICS-hírcsatornájához.
- **`display: "month"`** esetén az apphelper `CalendarElement` komponense jelenik meg egy `eventUrl` visszahívással. A `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` kattintásra erre az URL-re navigál, a részletes párbeszédablak helyett (a B1Admin nem ad át `eventUrl`-t, így az admin naptár megtartja a párbeszédablakot).
- **`tag`** mindkét megjelenítést szűri az `EventHelper.hasTag()` (`@churchapps/helpers`) függvénnyel: kis- és nagybetűtől függetlenül egyezik a vesszővel elválasztott `events.tags` mezővel; üresen mindent megjelenít. A curated-naptár összekapcsolása kiválasztja az `e.tags` mezőt, így a curated események is megkapják a címkéiket.

A curated események a `realEventId` alapján linkelnek (`eventPageId()`), így az URL mindig a mögöttes eseményt nevezi meg. A `/{sdSlug}/events/[eventId]` egy külön útvonal (nem a builder-folyamat része): betölti a `GET /content/events/public/:churchId/:id` végpontot, amely `null` értéket ad vissza a függőben lévő vagy elutasított eseményekre, valamint a regisztráció nélküli privát eseményekre, és a nem elutasított teremfoglalásokból hozzáadja a `roomNames` mezőt. Megjeleníti az `EventPageContent` komponenst (fotós fejléc, markdown leírás, Mikor/Hol oldalsáv, **Regisztráció erre az eseményre** gomb, ha a `registrationEnabled` be van kapcsolva, és **Hozzáadás a naptáramhoz** link a `GET /content/events/public/:churchId/:id/ical` végponthoz). A fotót Open Graph-képként használja, a következő előfordulásra pedig `Event` JSON-LD-t ad az `EventPageJsonLd` segítségével. Egy ismeretlen vagy rejtett esemény valódi 404-et ad.

## Webhely-szintű widgetek

Két widget minden nyilvános oldalon megjelenik, és nem a fán belül: az **AnnouncementBanner** (lezárható felső sáv) és a **Launcher** (lebegő műveleti gomb a adakozás, látogatás vagy nézés típusú linkekhez). Mindkét komponens és a `parse*Config()` segédfüggvényeik az apphelperben vannak. A beállítást két nyilvános settings sor adja, a `announcementBanner` és a `launcher` kulcsokkal. Ezeket a B1Admin `SiteWidgetsEdit` komponense írja (a Megjelenés oldalon), a B1App nyilvános elrendezése pedig a `GET /content/settings/public/:churchId` végponton olvassa. Az API ezeket átlátszatlan kulcs-érték párként kezeli; a kulcsnevek a két alkalmazás közötti megállapodás.

## Blog

A blog önálló tartalomtípus, nem az építőoldalak rétege. Egy `posts` sor tartalmazza a teljes bejegyzést: `title`, `slug`, `excerpt`, `content` (markdown törzs), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. A nyilvános felület (mind névtelen, a `PostController`): 

| Útvonal | Cél |
|---------|-----|
| `GET /content/posts/public/:churchId` | Közzétett bejegyzések, szűrhető a `?category=&tag=` paraméterekkel, lapozva |
| `GET /content/posts/public/:churchId/categories` | Különböző kategóriák a közzétett bejegyzések között |
| `GET /content/posts/public/:churchId/slug/:slug` | Egy közzétett bejegyzés |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 hírcsatorna, a gyülekezet nevével címkézve, elemenként kategóriával és a kivonat vagy tartalom leírásával |

Egy bejegyzés akkor „közzétett", ha a `publishDate` be van állítva és elmúlt; a jövőbeli `publishDate` ütemezett bejegyzést jelent (nyilvánosan rejtve, az adminban Ütemezett jelvénnyel). Az olvasó végpontok minden bejegyzést kiegészítenek az `authorName` mezővel, amelyet az `authorId`-ből a membership modul átjárón keresztül oldanak fel. Ha nincs kivonat, a listázó kártyákon, a meta leírásokban és az RSS-ben a formázás nélküli tartalom (~160 karakter) szolgál helyettesítőként. A B1App az `/{sdSlug}/blog` oldalt szolgálja ki szerkesztői listaként (középre igazított fejléc, amely szűréskor az aktív kategória vagy címke nevévé válik, kategória-chip szűrősor, bal oldali bélyegképes bejegyzéssorok szerzővel és kivonattal), az RSS-hírcsatornát alternatív linkként hirdetve. A `/{sdSlug}/blog/[postSlug]` egy külön útvonal (nem a Zone/Section folyamat): középre igazított fejléccel (kategória-kiemelés, cím, szerzői sor, elsődleges színű kiemelővonal), konténer szélességű 16:9 fejlécképpel, a markdown törzzsel ~720 px-es olvasóoszlopban, címkés chipekkel a cikk láblécében, egy `"További ebben: {category}"` kapcsolódó bejegyzések sávval, és `BlogPosting` JSON-LD-vel, benne a szerzővel. Mindkét oldal teljes egészében a téma tokenjeit használja, így minden gyülekezet saját színvilágát örökli. A blog URL-ek bekerülnek a gyülekezetenkénti webhelytérképbe. A B1Admin szerzői felülete (**Site → Blog**) párbeszédablakban szerkeszti a bejegyzéseket: markdown szerkesztő előnézeti kapcsolóval, 16:9-re vágott galériás képválasztó, szerzőválasztó (alapértelmezetten a szerkesztő felhasználó), kategória-automatikus kiegészítés a meglévő kategóriák alapján, duplikált slug-ellenőrzés és közzétételi kapcsoló. A közzétett sorok az élő bejegyzésre mutatnak, az oldal pedig arra emlékezteti az adminisztrátorokat, hogy adjanak hozzá egy `/blog` navigációs linket. A hozzászólásokat külső szolgáltatásokra bízzuk: a gyülekezet szintű nyilvános `blogFooterHtml` beállítás (a Blog oldalon, a **Below Every Post** részben szerkeszthető, és csak a Beállítások→Szerkesztés módban látható) minden bejegyzés alatt megjelenik a B1App `BlogFooterEmbed` komponensében. Ez újra létrehozza a `<script>` címkéket, hogy azok a `'strict-dynamic'` szabály mellett is lefussanak, és sorrendben futtatja őket (egy külső `src` betöltése befejeződik, mielőtt a következő beágyazott szkript lefut), mert a szállítói kódrészletek először betöltenek egy könyvtárat, és csak utána hívják meg.

## Csak tagoknak szóló oldalak

A `pages.visibility` ugyanazt a felsorolást használja, mint a navigációs linkek: `everyone` (alapértelmezett), `visitors`, `members`, `staff`, `team`, `groups` (a `groupIds` mezővel), de **kemény hozzáférés-korlátozásként**, nem navigációs szűrőként (`PageVisibilityHelper.canViewPage`). A folyamat:

1. A névtelen fa-végpont URL-alapú lekérdezéseknél ellenőrzi a láthatóságot. A korlátozott oldalt névtelenül kérők a tartalom helyett `{ restricted: true, visibility }` választ kapnak, így a fa soha nem szivárog ki.
2. A végpont továbbra is elfogadja a JWT-t: a `CustomAuthProvider` minden kérésnél ellenőrzi az `Authorization` fejlécet, a névtelen útvonalakon is, így egy bejelentkezett tag ugyanarra az URL-re irányuló lekérdezése normálisan feloldódik.
3. A B1App a `restricted` válasznál a `RestrictedPage` komponenst jeleníti meg: a tárolt hitelesítő adatokból visszaállítja a munkamenetet, újra lekéri a fát a JWT-vel, és megjeleníti – vagy ha nincs munkamenet, egy bejelentkezési kaput mutat a `returnUrl` paraméterrel.

:::info
A korlátozás finomsága szintenként eltér: a `groups` a token `groupIds` mezőit veti össze az oldal listájával, a `staff` a `membershipStatus` mezőt ellenőrzi, de a `members` és a `team` jelenleg bármely hitelesített felhasználót átenged a gyülekezetből. A `groups` szigorú opciónak tekintendő.
:::

## SEO és felfedezhetőség

Mindez a B1App oldalán történő megjelenítés a ContentApi adatai fölött: az API tárol, az alkalmazás kibocsát.

| Szempont | Működés |
|----------|---------|
| Meta leírások | A `pages.metaDescription` (≤300 karakter) a `MetaHelper.getMetaData()` révén kerül a Next.js `Metadata` objektumba (description + Open Graph) minden builderrel megjelenített útvonalon. A B1Admin oldalbeállításai között van egy AI **Generálás** gomb (lásd lent) |
| Átirányítások | Gyülekezetenkénti `redirects` sorok, amelyeket a `/content/redirects` alatt kezelünk (`content.edit`, 200 soros korlát, normalizált útvonalak). 404 előtt a B1App oldalútvonala feloldja az útvonalat a `GET /content/redirects/public/:churchId` végponton, és Next `permanentRedirect` függvényével HTTP 308-at ad; az egyezés nélküli útvonalak a `notFound()` függvényhez futnak |
| Márkázott 404 | A `not-found.tsx` a `BrandedNotFound` komponenst jeleníti meg a gyülekezet logójával, nevével és témájával, nem általános hibaoldalt. Az ismeretlen `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` és `/volunteer/[planId]` útvonalak valódi 404-et adnak, akárcsak az ismeretlen aldomainek és a hibás oldal-slugok (lásd [Webhelyútvonalak és többwebhelyes működés](./websites.md)) |
| Strukturált adatok | `BlogPosting` JSON-LD a blogbejegyzéseken; `VideoObject` az egyes igehirdetési oldalakon (`/{sdSlug}/sermons/[sermonId]`) és a `sermons` elemet tartalmazó oldalakon; `Event` a naptár-/eseményelemekből az építőoldalakon és minden `/{sdSlug}/events/[eventId]` oldalon (a következő előfordulás, az esemény fotójával `image`-ként); schema.org `Event` a `serviceTimes` elemből |
| Igehirdetési oldalak | Minden nyilvános igehirdetés kapott egy feltérképezhető oldalt a `/sermons/[sermonId]` címen, teljes metaadatokkal: az igehirdetések már nincsenek a kliensoldali böngészőelembe zárva |
| Analitika | A `ga4MeasurementId` nyilvános beállítás (a B1Admin átirányításai mellett kezelve) gyülekezetenként GA4 gtag-et ültet be a `next/script` segítségével. A B1 alkalmazás (`/{sdSlug}/mobile`) is erre az azonosítóra küldi az oldalmegtekintéseket, a ChurchApps saját címkéje mellett, ha az érvényes `G-` azonosító (a GTM-konténer-azonosítók csak a webhelyen maradnak). Minden `gtag('config')` a `display_mode` értéket `installed` vagy `browser` értékkel viszi, a `navigator.standalone` vagy a `(display-mode: standalone)` médialekérdezés alapján (`B1App/src/helpers/mobileAnalytics.ts`) |
| Webhelytérkép és hírcsatornák | A gyülekezetenkénti `sitemap.xml` útvonal tartalmazza az építőoldalakat, a blog URL-eket és a 50 legutóbbi igehirdetési oldalt (a `<lastmod>` mezővel a közzétételi dátumból). Felsorolja a beépített `/sermons`, `/groups` és `/volunteer` oldalakat is, ha van tartalmuk (nyilvános csoportok, szolgálati tervek), kivéve, ha mentett átirányítás helyettesíti az útvonalat. A `/` kimarad, ha a gyülekezetnek nincs kezdőoldala, mert akkor a `/` a tiltott `/mobile` oldalra irányítana. A blogoldal hirdeti az RSS-hírcsatornát |
| Akadálymentesítés | A nyilvános keret minden elrendezési burkolóban egy ugróhivatkozást jelenít meg, amely a `<main id="main-content">` tájékozódási ponthoz vezet |

## AI-generálás (AskApi)

Az oldal- és webhelygenerálás az **AskApi** nevű külön szolgáltatásban fut, a `/website` vezérlő alatt. Ugyanazzal a `CustomAuthProvider` JWT-vel hitelesít, mint minden más, és **tartalom szempontjából állapotmentes**: minden végpont JSON-t ad vissza, a hívó (B1Admin) pedig a ContentApi-n keresztül menti el az eredményt (a `POST /content/pages/importTree` egy hívással létrehoz egy oldalt a teljes beágyazott szakasz- és elemfával; mindig a hívó gyülekezetébe szúr be, és figyelmen kívül hagyja a törzsben lévő azonosítókat).

### Oldalgenerálás (`planPage` → `writePage`)

Az „AI" oldalsablon a B1Admin `AddPageModal` komponensében egy olcsó folyamatot használ (`AskApi/src/helpers/SiteGenHelper.ts`), amely egyetlen szabályra épül: **egyetlen modell sem ad ki építő JSON-t**. Két modell osztja meg a munkát a Vercel AI Gateway-en keresztül (sima HTTP, az SSM kulcs a `/{env}/aiGatewayApiKey` vagy az `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — típusos döntési modell, amely választásokat, pontszámokat és igaz/hamis értékeket ad valószínűségekkel, de szöveget nem tud írni. Sorban kiválasztja az egyes szakaszokat egy rögzített sablonkönyvtárból, pontozza az elrendezéseket, ellenőrzi a szöveg tényeit, és kiválasztja a állományfotókat és ikonokat. A bemenet ~$0,04 millió tokenenként, a kimenet ingyenes, így egy oldalhoz ~90 hívás a centnek is csak a töredéke.
- **Egy kis csevegőmodell (alapértelmezetten a GPT-4.1 mini)** — kitölti a kiválasztott sablonok nevesített, hosszban korlátozott szövegmezőit. Az író egy konstans, felülírható a `SITEGEN_COPY_MODEL` környezeti változóval (bármely csevegőmodell-azonosító az átjárón, pl. `anthropic/claude-haiku-4.5`). Három gyülekezeten végzett vak, egymás melletti összehasonlításban a Claude Haiku 4.5 valamivel melegebben olvasódott, de a GPT-4.1 mini közel állt hozzá, körülbelül négyszer olcsóbb és gyorsabb, ezért ez az alapértelmezett. Egy teljes, mindhárom elrendezést tartalmazó oldal ~1,3 centbe kerül, ennek mintegy 80%-a az író költsége.

| Fázis | Végpont | Mi történik |
|-------|---------|-------------|
| 1 | `POST /website/planPage` | Besorolja az oldal típusát (főoldal, látogatás, rólunk …), majd JEV fordulónkénti valószínűségeiből mintavételez 10 jelölt elrendezést (hős + szakaszszám → minden szakasz → záró elem), kiszűri a duplikátumokat, JEV pontozza mindet illeszkedés/folyamatosság/hiányosságok szerint, és visszaadja a legjobb 3-at egy írási hangnemmel és egy `suggestedStyle` (paletta + betűtípusok) javaslattal. Azok a jelöltek, amelyek eddig ugyanazokat a szakaszokat osztják meg, JEV-nek azonos kérdést tesznek fel, ezért a fordulók prefixük szerint memoizálva vannak. A 6 alatti legjobb pontszám `lowLayoutScore` néven naplózódik – ez a napló a hozzáadandó sablonok listája. ~2 mp |
| 2 | `POST /website/writePage` (jelöltenként egy hívás) | Az író szakaszonként két szakasz szövegét tölti ki hívásonként, párhuzamosan, és öt hős-főcímet ad vissza, amelyek közül JEV választ; JEV ellenőrzi a tényeket minden szakaszban; a hibás, sztereotip kifejezést használó vagy egy korábbi szakaszt újramesélő (4 szavas közös szakaszok, kódban ellenőrizve) szakaszokat párhuzamosan írják át az konkrét okkal; egy kódos tisztítás eltávolítja a sztereotip gyülekezeti weboldal-mondatokat (kivéve, ha a gyülekezet saját leírása használja őket); JEV kiválasztja a fotótémákat, ikonokat és a hős alakzat-elválasztóját, és pontozza az eredményt. Visszaad egy mentésre kész szakaszfát és egy pontszámot. ~6–9 mp |
| 3 | `POST /content/pages/importTree` | A B1Admin csak a legjobb rangú elrendezést írja ki (a második helyezett a tartalék, ha ez a írás meghiúsul), menti, és megnyitja az előnézetet (~10 mp a Mentés után) |

Minden fázis külön kérés, hogy minden hívás az API Gateway 29 másodperces korlátján belül maradjon. A `SiteGenHelper.buildTree` sablonjai rögzített szakasz- és elemfák a katalógusból (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`), és téma-tokenekre hivatkoznak (`var(--accent)`, `var(--lightAccent)` …), így a generált oldalak örökölik a gyülekezet meglévő megjelenési beállításait. Új szakaszsablon hozzáadásakor a szakasz slot-listáját a `SECTIONS` alá, a fáját pedig a `buildTree` alá kell írni; az egységteszt bejárja az összes sablont, és érvényesíti a fát.

**Bemenetek.** A szöveg csak két forrásból állíthat tényeket: amit a felhasználó beírt, és a `churchContext.facts` – ezeket a B1Admin a tervezés előtt gyűjti (a nyilvános istentiszteleti idők és nyilvános csoportnevek, valamint a gyülekezet neve és címe). Ugyanezek a jelzők kapuzzák az adatalapú sablonokat: a `times` az élő `serviceTimes` elemet jeleníti meg, ha a gyülekezet az istentiszteleti időit a B1-ben tartja (különben egy beírt táblázatot), a `groups` és a `countdown` csak akkor kínálkozik, ha van mögötte adat. A JEV-hívások megbízhatatlanul futnak: a duplikált hívás 1,5 másodperc után indul, és az első válasz nyer, mert az átjáró néha megakad, a hívások pedig szinte ingyenesek.

**A témán maradás.** A felhasználó kérése az oldal *témája*, nem a gyülekezet háttérinformációja. A `planPage` besorolja a kérést (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), és az `event` és `topic` oldalaknál az általános gyülekezeti sablonok (lelkipásztori üzenet, igehirdetések, szolgálatok, csoportok, közösségi hatás, heti idők és visszaszámláló, videós hős) nem is kínálkoznak fel, míg a `details` (mikor / hol / mit hozz magaddal) és egy dátum-alapú `eventCountdown` igen. Mindkét bíráló pontozza a témához való illeszkedést. A B1Admin minden `writePage` híváshoz átadja a tervből származó `pageType` értéket.

**Teljes oldalak rövid kérésekből.** Az oldalaknak három–hat középső szakaszuk van, bőséges slot-hosszakkal, bevezető sorral a kártyaszakaszoknál és egy öt kérdéses GYIK-kel; a javító lépés kibővíti azt a szakaszt, amely vékonyan jött vissza. A generálás egy kattintással történik: nincsenek visszakérdezések. Ha a kérés kihagy egy szokásos részletet, amely egy teljes oldalhoz kell (kezdési idő, helyszín, mit hozz magaddal, hogyan jelentkezz), az író egy valószerű, szerény választással tölti ki, amelyet a gyülekezet szerkeszthet. Mivel a szakaszok párhuzamosan íródnak, ezeket a hiányzó részleteket **egyszer** döntjük el, a `planPage`-ben (`assumedDetails`, egy kis íróhívás, amely a elrendezés-mintavétellel párhuzamosan fut), és a `churchContext.assumedDetails` révén minden `writePage` híváshoz visszaadjuk, így az egyik szakasz nem írhat 5:00-t, míg a másik 5:30-at. JEV javít minden szakaszt, amely ellentmond a kérésnek, a gyülekezet nyilvántartásainak vagy az eldöntött részleteknek. Az eldöntött részletek nem jelennek meg a felületen; a gyülekezet úgy nézi át és szerkeszti az oldalt, mint bármely másikat. Néhány dolgot soha nem találunk ki: emberek neveit, telefonszámokat, e-mail- és weboldalcímeket, árakat, statisztikákat, a gyülekezet történetét, emberekhez rendelt idézeteket, és a hét napját egy olyan dátumhoz, amelyhez a kérés nem adott meg napot.

**Vizuális elemek.** A sablonok nem nevezik meg a fotóikat vagy ikonjaikat. Nyitva hagyják a helyeket, és egy általános menet (`visualSlots` → `pickVisuals` → `applyVisuals` a `SiteGenHelper`-ben) bejárja a kész fát, és kitölti mindet: a `auto:photo` jelölésű szakaszhátteret vagy galériabejegyzést, az `auto:icon`-t, a hős `auto:divider` elemét, és jelölés nélkül bármely olyan `textWithPhoto`, `card` vagy `image` elemet, amelynek `photo` mezője üres. JEV a mellette lévő szöveg alapján választ mindegyiket (egy kártya fotóját annak címéből és szövegéből, egy hátteret a szakasz szövegéből), és egy oldalon egy téma sem ismétlődik. Így egy új sablon ingyen kap fotókat. A fotók Pexels-keresési témák, `pexels:<term>` helyőrzőkként, amelyeket a B1Admin a `POST /content/stock/search` végponton old fel; az a kliens, amely nem küld `resolvesPhotos` jelzőt, beépített fejlécképet, egyszínű sávokat és fotó nélküli kártyákat kap. Szándékosan nincsenek portré-témák, és a lelkipásztori sablon nem tartalmaz fotót: egy idegen sztockfotó soha nem helyettesíthet valódi embert. Olyan gyülekezetnél, amelynek még nincsenek oldalai, a B1Admin alkalmazza a `suggestedStyle` értéket a globális stílusokra; a meglévő webhelyek megtartják a megjelenésüket.

### Egyéb végpontok

:::info
A B1Admin `SectionToolbar` átírás gombja és az oldallistán lévő „Webhely generálása" gomb kliensoldalon kommentbe van téve. Az alábbi AskApi végpontok továbbra is válaszolnak; csak ez a felület van elrejtve.
:::

| Végpont | Cél |
|---------|-----|
| `POST /website/generatePageOutline` → `generateSection` | Az eredeti kétlépcsős oldalfolyamat (vázlat, majd szakaszonként egy LLM-hívás, amely elem-JSON-t ad). A költségek miatt a B1Admin a `planPage`/`writePage` változat váltotta le; az API-felhasználóknak megmarad |
| `POST /website/generateSite` | Teljes webhely-generálás. **Tervezetten kétfázisú**: a `planOnly: true` hívás csak a többoldalas tervet adja vissza (egy gyors modellhívás), majd a kliens kéri a teljes tartalmat, így minden kérés a Lambda/API Gateway időkorláton belül marad |
| `POST /website/rewriteSection` | Szerkezetmegőrző átírás: a modell csak a szöveges válaszokat módosíthatja. Az előtte és utána érvényes rekurzív szerkezeti aláírást (azonosítók + típusok + sorrend) összehasonlítja; bármilyen eltérés esetén az eredeti szakaszt adja vissza `fallback: true` jelzéssel, a sérült szerkezet helyett |
| `POST /website/generateAltText` | Látásmodell-hívás legfeljebb 20 képURL-re; tömör alt szöveget ad (≤125 karakter, a „photo of" előtagok eltávolítva) |
| `POST /website/generateMetaDescription` | Egy SEO meta leírás (≤155 karakter) az oldal szöveges tartalmából – a B1Admin oldalbeállításainak Generálás gombjához kötve |

Ezeknek a végpontoknak a promptjai markdown fájlok az `AskApi/config/instructions/` alatt, köztük az elemkatalógus, amelyből a modell generál. Két tervezési elv tartja pontosan az elemkatalógust: a kliens minden kérésben átadja az `availableElementTypes` listát (a prompt csak ebből a listából használhat típusokat – a szerver nem keményen kódolja a teljes készletet), az API MCP `describe_page_builder` eszköze pedig ugyanezt az útmutatót hordozza az [MCP](../api/mcp.md) rendszeren keresztül dolgozó AI-ügynököknek. A modellek Anthropic Claude-modellek az OpenRouteren keresztül – a szakasztartalomhoz 3.5 Haiku (késleltetés miatt), a vázlatokhoz, webhelytervekhez és látáshoz 3.5 Sonnet –, és OpenAI tartalék, ha nincs beállítva OpenRouter-kulcs.

## Beszélgetős űrlapok

A űrlapok (membership modul) beszélgetős módot kaptak, amelyet a connect-card típusú oldalakra terveztek. A `forms` táblán négy oszlop vezérli: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Megjelenítés** — az apphelper `FormSubmissionEdit` komponense átvált a `ConversationalForm` komponensre (egyszerre egy kérdés), ha a `displayMode` értéke `conversational`; a B1App űrlapoldala átadja a módot. A beküldési adatformátum mindkét esetben ugyanaz.
- **Személy automatikus létrehozása** — a `autoCreatePerson` beállításával történő beküldésnél a `ConversationalFormHelper.findOrCreatePerson` e-mail alapján (kis- és nagybetűtől függetlenül) deduplikál, egyébként létrehoz egy háztartást és egy személyt `membershipStatus: "Guest"` állapottal, majd összeköti a beküldést ezzel a személlyel.
- **Utánkövető e-mail** — ha megvan a tárgy és a szöveg, a beküldő egy sablonos e-mailt kap (`{firstName}` / `{churchName}` helyettesítőkkel) a meglévő tranzakciós úton (`TransactionalEmailHelper`), soha nem az értesítési összesítő csatornán. Mindkét mellékhatás nem végzetes: egy hiba sosem veszíti el a beküldést.

A négy mezőt jelenleg az API-n keresztül kell beállítani; a B1Admin űrlapszerkesztő még nem mutatja őket.

## Nyilvános webhely gyorsítótár

A B1App nyilvános megjelenítési útja a gyülekezet-jelölt lekéréseket gyorsítótárazza (`next: { revalidate: 300, tags: [sdSlug] }` éles környezetben; `0` fejlesztésben), így egy élő oldal akár öt percig elavult lehet a ContentApi-írás után. A B1App `POST /api/revalidate/{sdSlug}` végpontja meghívja a `revalidateTag(sdSlug)` függvényt, és ez az egyetlen mód a gyorsítótár idő előtti ürítésére.

Két író éri el:

1. **B1Admin** — a `clearSiteCache()` a `B1Admin/src/site/siteCache.ts` fájlból szerkesztés-mentés után POST kérést küld. Az aktív webhely aldomainjét részesíti előnyben (egy másodlagos webhelynek *annak* a címkéjét kell ürítenie, nem a gyülekezet alapértelmezettjét).
2. **Api** — azok a tartalommódosítások, amelyek nem a B1Admin-on keresztül érkeznek (API-kulcsok, MCP, AI), a tartalomvezérlőkből hívják a `SiteCacheHelper.bump(churchId)` függvényt. A segéd a `SubDomainHelper` segítségével feloldja a gyülekezet aldomainjét, és POST kérést küld a `{b1AppRoot}/api/revalidate/{sd}` címre. A hibákat elnyeli, hogy egy elérhetetlen B1App ne okozhasson mentési hibát.

A gyorsítótárat ürítő vezérlők: oldalak (mentés, törlés, duplikálás, közzététel, elvetés, visszavonás, AI-ideiglenes), szakaszok, elemek, blokkok, linkek, globális stílusok, bejegyzések és átirányítások. A fejlesztői `b1AppRoot` értéke `http://{subdomain}.localtest.me:3301`; a demó és az éles környezet `https://{subdomain}.b1.church`.

## Kapcsolódó oldalak

- [Webhelyútvonalak és többwebhelyes működés](./websites.md) — hogyan oldódik fel egy kérés gyülekezetté/webhellyé, és hogyan irányítódnak az egyéni domainek
- [Tartalmi végpontok](../api/endpoints/content.md) — a teljes REST-felület oldalakhoz, szakaszokhoz, elemekhez, blokkokhoz, bejegyzésekhez, átirányításokhoz és beállításokhoz
- [AppHelper](../shared-libraries/app-helper.md) — az npm-csomag, amely a megjelenítőket, a regisztrációt, az elválasztókat és a widgeteket szállítja
- [MCP-szerver](../api/mcp.md) — beleértve a `describe_page_builder` útmutató eszközt
- [Oldalszerkesztő (végfelhasználói)](/docs/b1-admin/website/page-editor) — a munkatársaknak szóló szerkesztő dokumentáció
