---
title: "Koncové body obsahu"
description: "Referenční přehled endpointů Content API ChurchApps: stránky webu, blogy, přesměrování, kázání, události, soubory, Bible a písně v B1 Admin."
---

# Koncové body obsahu

<div class="article-intro">

Modul Content spravuje webové stránky, sekce, prvky, bloky, blogové příspěvky, přesměrování, kázání, playlisty, streamovací služby, události, kurátorské kalendáře, soubory, galerie, překlady Bible a vyhledávání veršů, písně, aranžmá, globální styly, stock fotografie a nastavení. Je to největší modul v API a pohání CMS, média a streamování, plánování bohoslužeb a funkce Bible ve všech aplikacích ChurchApps.

</div>

**Základní cesta:** `/content`

## Stránky

Základní cesta: `/content/pages`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:churchId/tree?url=&id=` | Veřejné | — | Načte celý strom stránky (sekce, prvky, bloky) podle URL nebo ID. Při načtení podle URL odstraní interní ID. Načítání podle URL vynucuje `pages.visibility` — stránka s omezením vrátí `{ restricted: true, visibility }`, pokud (volitelný) JWT nesplňuje podmínku |
| GET | `/public/:churchId` | Veřejné | — | Seznam veřejných stránek (`url`, `title`, `metaDescription`); pouze `visibility = everyone` |
| GET | `/:id` | JWT | — | Načte stránku podle ID |
| GET | `/` | JWT | — | Seznam všech stránek církve |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplikuje stránku se všemi sekcemi a prvky |
| POST | `/temp/ai` | JWT | Content.Edit | Uloží stránku vygenerovanou pomocí AI (stránka, sekce a prvky v jednom volání) |
| POST | `/importTree` | JWT | Content.Edit | Vytvoří stránku z vnořeného stromu (`title`, `url`, `sections[].elements[]…`). Vždy vkládá pod církev volajícího; ID v těle požadavku jsou ignorována. Řádky musí obsahovat své podřízené položky `column`. Maximum 30 sekcí / 500 prvků |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje stránky (dávkově) |
| DELETE | `/:id` | JWT | Content.Edit | Smaže stránku |

### Příklad: Načtení stromu stránky

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Sekce

Základní cesta: `/content/sections`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá sekci podle ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplikuje sekci nebo ji převede na znovupoužitelný blok |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje sekce (dávkově). Automaticky aktualizuje pořadí řazení |
| DELETE | `/:id` | JWT | Content.Edit | Smaže sekci (automaticky aktualizuje pořadí řazení) |

## Prvky

Základní cesta: `/content/elements`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá prvek podle ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplikuje prvek se všemi podřízenými položkami |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje prvky (dávkově). Automaticky spravuje sloupce řádků a snímky karuselu |
| DELETE | `/:id` | JWT | Content.Edit | Smaže prvek |

## Bloky

Základní cesta: `/content/blocks`

Rozšiřuje standardní CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` ze základní třídy s oprávněním Content.Edit pro zápis).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá blok podle ID |
| GET | `/` | JWT | — | Seznam všech bloků |
| GET | `/:churchId/tree/:id` | Veřejné | — | Načte celý strom bloku se sekcemi a prvky |
| GET | `/blockType/:blockType` | JWT | — | Načte bloky podle typu (např. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Veřejné | — | Načte strom bloku zápatí pro církev |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje bloky |
| DELETE | `/:id` | JWT | Content.Edit | Smaže blok |

## Odkazy

Základní cesta: `/content/links`

Rozšiřuje standardní CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` ze základní třídy s oprávněním Content.Edit pro zápis).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá odkaz podle ID |
| GET | `/` | JWT | — | Seznam všech odkazů. Volitelný filtr `?category=`. Po uložení se automaticky seřadí |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Načte odkazy filtrované podle viditelnosti (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Veřejné | — | Načte odkazy církve podle kategorie (veřejné) |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje odkazy (dávkově). Automaticky řadí podle kategorie |
| DELETE | `/:id` | JWT | Content.Edit | Smaže odkaz |

## Globální styly

Základní cesta: `/content/globalStyles`

Rozšiřuje standardní CRUD (POST `/`, DELETE `/:id` ze základní třídy s oprávněním Content.Edit pro zápis).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/church/:churchId` | Veřejné | — | Načte globální styly církve (pokud nejsou nastaveny, vrátí výchozí hodnoty) |
| GET | `/` | JWT | — | Načte globální styly pro ověřenou církev |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje globální styly |
| DELETE | `/:id` | JWT | Content.Edit | Smaže globální styly |

## Historie stránky

Základní cesta: `/content/pageHistory`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/page/:pageId` | JWT | Content.Edit | Seznam záznamů historie pro stránku |
| GET | `/block/:blockId` | JWT | Content.Edit | Seznam záznamů historie pro blok |
| GET | `/:id` | JWT | Content.Edit | Získá záznam historie podle ID |
| POST | `/` | JWT | Content.Edit | Uloží snímek stránky/bloku. Pravidelně odstraňuje záznamy starší než 30 dní |
| POST | `/restore/:id` | JWT | Content.Edit | Obnoví stránku/blok ze snímku historie (smaže aktuální obsah a znovu jej vytvoří ze snímku) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Obnoví ze vloženého objektu snímku. Tělo: `{ pageId, blockId, snapshot }` |

## Příspěvky (blog)

Základní cesta: `/content/posts`

Blogové příspěvky jsou samostatné řádky: `title`, `slug` (jedinečný v rámci církve), `excerpt`, `content` (tělo v markdownu), `authorId`, `photoUrl`, `publishDate`, `category` a `tags`. Příspěvek je publikován, jakmile je nastaveno `publishDate` a je v minulosti. Čtecí koncové body obohacují každý příspěvek o `authorName` získané z `authorId`. Viz [Architektura tvorby webu](../../architecture/website-builder.md#blog).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Veřejné | — | Seznam publikovaných příspěvků s stránkováním (maximálně 50 na stránku) |
| GET | `/public/:churchId/categories` | Veřejné | — | Různé kategorie napříč publikovanými příspěvky |
| GET | `/public/:churchId/slug/:slug` | Veřejné | — | Získá publikovaný příspěvek podle slugu |
| GET | `/rss/:churchId?siteUrl=` | Veřejné | — | Kanál RSS 2.0 publikovaných příspěvků (odkazy sestavené jako `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Získá příspěvek podle ID |
| GET | `/` | JWT | — | Seznam všech příspěvků církve |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje příspěvky (dávkově) |
| DELETE | `/:id` | JWT | Content.Edit | Smaže příspěvek |

## Přesměrování

Základní cesta: `/content/redirects`

Přesměrování URL pro jednotlivé církve (`fromPath` → `toPath`), omezená na 200 na církev. Cesty jsou normalizovány (malá písmena, úvodní lomítko, bez koncového lomítka) a `fromPath` je v rámci církve jedinečný. B1App je vyhodnocuje při požadavcích, které by skončily chybou 404, a vrací HTTP 308.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/public/:churchId?path=` | Veřejné | — | Vyhodnotí cestu (nebo vypíše všechna přesměrování, pokud je `path` vynechán) |
| GET | `/:id` | JWT | — | Získá přesměrování podle ID |
| GET | `/` | JWT | — | Seznam všech přesměrování církve |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje přesměrování. Odmítá `fromPath = toPath` a vynucuje limit 200 řádků |
| DELETE | `/:id` | JWT | Content.Edit | Smaže přesměrování |

## Kázání

Základní cesta: `/content/sermons`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/public/freeshowSample` | JWT | — | Získá ukázkovou strukturu playlistu FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Získá obal aplikace TV se zdroji kázání, lekcí a FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Veřejné | — | Získá jedno kázání jako playlist kanálu TV |
| GET | `/public/tvFeed/:churchId` | Veřejné | — | Získá všechny veřejné playlisty/kázání jako kanál TV |
| GET | `/public/:churchId` | Veřejné | — | Seznam všech veřejných kázání církve |
| GET | `/timeline?sermonIds=` | JWT | — | Načte data časové osy pro kázání |
| GET | `/lookup?videoType=&videoData=` | Veřejné | — | Vyhledá metadata kázání na YouTube nebo Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Vygeneruje pomocí AI návrhy příspěvků na sociální sítě z titulků kázání |
| GET | `/outline?url=&title=&author=` | JWT | — | Vygeneruje pomocí AI osnovu lekce z URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importuje videa z kanálu YouTube. HTML entity, které API vyhledávání YouTube vkládá do názvů a popisů (například `&amp;` a `&#39;`), jsou dekódovány |
| GET | `/vimeoImport/:channelId` | JWT | — | Importuje videa z kanálu Vimeo |
| GET | `/:id` | JWT | — | Získá kázání podle ID |
| GET | `/` | JWT | — | Seznam všech kázání |
| POST | `/` | JWT | StreamingServices.Edit | Vytvoří nebo aktualizuje kázání. Přijímá pole nebo jeden objekt kázání (vždy vrací pole); prázdné tělo vrací 400. Podporuje nahrání miniatury v base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Smaže kázání |

### Příklad: Vyhledání kázání na YouTube

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Playlisty

Základní cesta: `/content/playlists`

Rozšiřuje standardní CRUD (GET `/:id`, GET `/`, DELETE `/:id` ze základní třídy s oprávněním StreamingServices.Edit pro zápis).

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá playlist podle ID |
| GET | `/` | JWT | — | Seznam všech playlistů |
| GET | `/public/:churchId` | Veřejné | — | Seznam všech veřejných playlistů církve |
| POST | `/` | JWT | StreamingServices.Edit | Vytvoří nebo aktualizuje playlisty (dávkově, podporuje nahrání miniatury v base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Smaže playlist |

## Streamovací služby

Základní cesta: `/content/streamingServices`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Získá zašifrované ID chatovací místnosti hostitele pro službu |
| GET | `/` | JWT | — | Seznam všech streamovacích služeb. Automaticky odstraňuje vypršelé nepravidelné služby a posouvá opakující se služby na další termín |
| POST | `/` | JWT | StreamingServices.Edit | Vytvoří nebo aktualizuje streamovací služby (dávkově) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Smaže streamovací službu (také vymaže blokované IP adresy) |

## Události

Základní cesta: `/content/events`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Načte události časové osy pro skupinu (včetně výjimek z data, takže lze přeskočit smazané výskyty) |
| GET | `/timeline?eventIds=` | JWT | — | Načte události časové osy pro skupiny aktuálního uživatele (včetně výjimek z data) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Veřejné | — | Přihlášení k odběru událostí jako kanálu kalendáře ICS |
| GET | `/group/:groupId` | JWT | — | Získá události skupiny (včetně výjimek z data) |
| GET | `/public/group/:churchId/:groupId` | Veřejné | — | Získá veřejné události skupiny |
| GET | `/public/:churchId/:id` | Veřejné | — | Získá jednu událost pro její veřejnou stránku, s `roomNames` (místnosti z rezervací, které nebyly zamítnuty). Vrací `null` u čekajících nebo zamítnutých událostí a u soukromých událostí, které nepřijímají registrace |
| GET | `/public/:churchId/:id/ical` | Veřejné | — | Stáhne tuto jedinou událost jako soubor `.ics` (`text/calendar`, výjimky z data použity). `404`, pokud je událost skrytá podle stejných pravidel |
| GET | `/:id` | JWT | — | Získá událost podle ID |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje události (dávkově) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, nebo vedoucí skupiny | Smaže událost a její rezervace. Vedoucí skupiny události ji mohou smazat a žadatel může zrušit svou vlastní čekající žádost |

Záznamy událostí obsahují `photoUrl` (fotografii události v poměru 16:9, zobrazovanou na veřejné stránce události a v dlaždicích nadcházejících událostí), `tags` (oddělené čárkami, používané filtrem štítků prvku Kalendář webu) a `notesViewRole` / `notesPostRole` (`staff` pokud `null`, `leaders` nebo `members`), které řídí přístup ke konverzaci `eventNote` události. Viz [Řízení přístupu k poznámkám skupiny a události](./messaging.md#group-and-event-notes-access-control). Odpovědi veřejných kurátorských událostí rovněž obsahují `photoUrl` a `tags` každé události.

## Výjimky událostí

Základní cesta: `/content/eventExceptions`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá výjimku události podle ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, nebo vedoucí skupiny | Vytvoří nebo aktualizuje výjimky událostí (dávkově). Vedoucí mohou přidávat výjimky pouze pro události ve skupinách, které vedou |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, nebo vedoucí skupiny | Smaže výjimku události |

## Kurátorské kalendáře

Základní cesta: `/content/curatedCalendars`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá kurátorský kalendář podle ID |
| GET | `/` | JWT | — | Seznam všech kurátorských kalendářů |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje kurátorské kalendáře (dávkově) |
| DELETE | `/:id` | JWT | Content.Edit | Smaže kurátorský kalendář |

## Kurátorské události

Základní cesta: `/content/curatedEvents`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Získá kurátorské události kalendáře (včetně podrobností o událostech a dat výjimek, pokud není nastaveno `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Veřejné | — | Získá veřejné kurátorské události kalendáře |
| GET | `/:id` | JWT | — | Získá kurátorskou událost podle ID |
| GET | `/` | JWT | — | Seznam všech kurátorských událostí |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje kurátorské události. Podporuje pole `eventIds` pro přidání konkrétních událostí skupiny |
| DELETE | `/:id` | JWT | Content.Edit | Smaže kurátorskou událost |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Odebere konkrétní událost z kurátorského kalendáře |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Odebere všechny události skupiny z kurátorského kalendáře |

## Soubory

Základní cesta: `/content/files`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:contentType/:contentId` | JWT | — | Získá soubory podle typu obsahu a ID obsahu |
| GET | `/` | JWT | — | Seznam všech souborů pro webové stránky církve |
| GET | `/:id` | JWT | — | Získá soubor podle ID |
| POST | `/` | JWT | Content.Edit* | Nahraje soubory (base64). *Povoleno také, pokud je uživatel členem skupiny odpovídající `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Získá předem podepsanou URL pro nahrání na S3. *Povoleno také členům skupiny. Maximum 100 MB na položku obsahu |
| DELETE | `/:id` | JWT | Content.Edit* | Smaže soubor a odstraní jej z úložiště. *Povoleno také členům skupiny |

## Galerie

Základní cesta: `/content/gallery`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/stock/:folder` | Veřejné | — | Seznam stock fotografií ve složce |
| GET | `/:folder` | JWT | Content.Edit | Seznam obrázků galerie ve složce |
| POST | `/requestUpload` | JWT | Content.Edit | Získá předem podepsanou URL pro nahrání obrázku do galerie na S3 |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Smaže obrázek z galerie |

## Bible

Základní cesta: `/content/bibles`

Všechny koncové body Bible jsou veřejné (není vyžadováno ověření). Data se načítají z externích zdrojů a ukládají se lokálně do mezipaměti. Požadavky na api.bible vypršejí po 15 sekundách; vypršení vrátí **504**.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | Veřejné | — | Seznam všech překladů Bible (načte ze zdroje, pokud je mezipaměť prázdná) |
| GET | `/stats?startDate=&endDate=` | Veřejné | — | Získá statistiky vyhledávání v Bibli pro časové období |
| GET | `/availableTranslations/:source` | Veřejné | — | Seznam dostupných překladů ze zdroje (např. api.bible) |
| GET | `/updateTranslations` | Veřejné | — | Synchronizuje všechny překlady ze všech zdrojů |
| GET | `/updateTranslations/:source` | Veřejné | — | Synchronizuje překlady z konkrétního zdroje |
| GET | `/updateCopyrights` | Veřejné | — | Aktualizuje informace o autorských právech u překladů, které je postrádají |
| GET | `/:translationKey/updateCopyright` | Veřejné | — | Aktualizuje autorská práva pro konkrétní překlad |
| GET | `/:translationKey/search?query=&limit=` | Veřejné | — | Vyhledá verše v překladu |
| GET | `/:translationKey/books` | Veřejné | — | Získá knihy pro překlad (ukládá lokálně do mezipaměti) |
| GET | `/:translationKey/:bookKey/chapters` | Veřejné | — | Získá kapitoly knihy (ukládá lokálně do mezipaměti) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Veřejné | — | Získá verše kapitoly (ukládá lokálně do mezipaměti) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Veřejné | — | Získá text veršů pro rozsah. Zaznamenává vyhledávání. Některé překlady obcházejí mezipaměť kvůli licencování |

### Příklad: Získání textu verše

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Písně

Základní cesta: `/content/songs`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/search?q=` | JWT | — | Vyhledá písně podle dotazu |
| GET | `/:id` | JWT | — | Získá píseň podle ID |
| GET | `/` | JWT | Content.Edit | Seznam všech písní |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje písně (dávkově) |
| POST | `/import` | JWT | — | Importuje písně z FreeShow (dávkově) |
| DELETE | `/:id` | JWT | Content.Edit | Smaže píseň |

## Podrobnosti o písních

Základní cesta: `/content/songDetails`

Podrobnosti o písních jsou globální (nejsou vázány na církev). Představují kanonická metadata písní sdílená mezi církvemi.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá podrobnosti písně podle ID (globální) |
| GET | `/` | JWT | — | Seznam podrobností písní pro církev |
| POST | `/create` | JWT | — | Vytvoří podrobnosti písně z ID PraiseCharts (pokud již existují, vrátí je). Automaticky načte metadata z PraiseCharts a MusicBrainz |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje podrobnosti písní (dávkově) |

## Odkazy na podrobnosti písní

Základní cesta: `/content/songDetailLinks`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá odkaz na podrobnosti písně podle ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Získá všechny odkazy pro podrobnosti písně |
| POST | `/` | JWT | — | Vytvoří nebo aktualizuje odkazy na podrobnosti písní (dávkově). Pokud je propojeno, automaticky načte data z MusicBrainz |
| DELETE | `/:id` | JWT | — | Smaže odkaz na podrobnosti písně |

## Aranžmá

Základní cesta: `/content/arrangements`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/:id` | JWT | — | Získá aranžmá podle ID |
| GET | `/song/:songId` | JWT | Content.Edit | Získá aranžmá pro píseň |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Získá aranžmá pro podrobnosti písně |
| GET | `/` | JWT | Content.Edit | Seznam všech aranžmá |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje aranžmá (dávkově) |
| POST | `/freeShow/missing` | JWT | — | Najde ID FreeShow, která v církvi neexistují. Tělo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Smaže aranžmá (také smaže tóniny; smaže píseň, pokud nezůstanou žádná aranžmá) |

## Tóniny aranžmá

Základní cesta: `/content/arrangementKeys`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/presenter/:churchId/:id` | Veřejné | — | Získá tóninu aranžmá s úplnými daty písně pro zobrazení prezentujícímu |
| GET | `/:id` | JWT | — | Získá tóninu aranžmá podle ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Získá tóniny pro aranžmá |
| GET | `/` | JWT | Content.Edit | Seznam všech tónin aranžmá |
| POST | `/` | JWT | Content.Edit | Vytvoří nebo aktualizuje tóniny aranžmá (dávkově) |
| DELETE | `/:id` | JWT | Content.Edit | Smaže tóninu aranžmá |

## Nastavení

Základní cesta: `/content/settings`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/my` | JWT | — | Získá nastavení aktuálního uživatele |
| GET | `/` | JWT | Settings.Edit | Získá všechna nastavení církve |
| GET | `/public/:churchId` | Veřejné | — | Získá veřejná nastavení církve (vrácená jako dvojice klíč–hodnota) |
| POST | `/my` | JWT | — | Uloží nastavení na úrovni uživatele (podporuje nahrání obrázku v base64) |
| POST | `/` | JWT | Settings.Edit | Uloží nastavení na úrovni církve (podporuje nahrání obrázku v base64) |
| DELETE | `/my/:id` | JWT | — | Smaže uživatelské nastavení |

## Náhled

Základní cesta: `/content/preview`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/data/:key` | Veřejné | — | Načte data náhledu streamování pro církev podle klíče subdomény (karty, odkazy, služby, kázání) |

## Galerie (stock fotografie)

Základní cesta: `/content/stock`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| POST | `/search` | Veřejné | — | Vyhledá stock fotografie na Pexels. Tělo: `{ term: "church" }` |

## PraiseCharts

Základní cesta: `/content/praiseCharts`

Integrace s PraiseCharts pro objevování chval a stahování notových zápisů.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/raw/:id` | JWT | — | Získá surová data PraiseCharts pro píseň |
| GET | `/hasAccount` | JWT | — | Zkontroluje, zda má uživatel propojený účet PraiseCharts |
| GET | `/search?q=` | JWT | — | Vyhledá v katalogu PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Získá produkty pro píseň (z knihovny, pokud je uživatel ověřen, jinak z katalogu) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Získá surová data aranžmá z knihovny |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Stáhne soubor z PraiseCharts (PDF nebo ZIP). Vrací `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Veřejné | — | Získá URL pro autorizaci OAuth pro PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Vymění ověřovatele OAuth za přístupový token a uloží jej do nastavení uživatele |
| GET | `/library` | JWT | — | Procházení knihovny PraiseCharts uživatele |

## Podpora

Základní cesta: `/content/support`

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| POST | `/createAudio` | Veřejné | — | Převede SSML na audio MP3 pomocí AWS Polly. Tělo: `{ ssml: "<speak>...</speak>" }` |

## Související stránky

- [Architektura tvorby webu](../../architecture/website-builder.md) -- Jak stránky, sekce, prvky, příspěvky a přesměrování do sebe zapadají napříč aplikacemi
- [Koncové body členství](./membership.md) -- Lidé, církve, skupiny, role, oprávnění
- [Koncové body docházky](./attendance.md) -- Sledování služeb a návštěv
- [Ověřování a oprávnění](./authentication.md) -- Přihlašovací tok, JWT, model oprávnění
- [Struktura modulu](../module-structure.md) -- Vzory organizace kódu
