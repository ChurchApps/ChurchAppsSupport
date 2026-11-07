---
title: "Koncové body obsahu"
description: "Referencia koncových bodov Content API ChurchApps: webové stránky, blogové príspevky, presmerovania, kázne, udalosti, súbory, vyhľadávanie v Biblii a piesne v B1 Admin."
---

# Koncové body obsahu

<div class="article-intro">

Modul Content spravuje webové stránky, sekcie, prvky, bloky, blogové príspevky, presmerovania, kázne, playlisty, streamovacie služby, udalosti, kurátorované kalendáre, súbory, galérie, biblické preklady a vyhľadávanie veršov, piesne, aranžmány, globálne štýly, stock fotografie a nastavenia. Je to najväčší modul v API a poháňa CMS, funkcie médií a streamovania, plánovanie bohoslužieb a biblické funkcie vo všetkých aplikáciách ChurchApps.

</div>

**Základná cesta:** `/content`

## Stránky

Základná cesta: `/content/pages`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:churchId/tree?url=&id=` | Verejné | — | Načíta celý strom stránky (sekcie, prvky, bloky) podľa URL alebo ID. Pri načítaní podľa URL odstráni interné ID. Načítania podľa URL vynucujú `pages.visibility` — stránka s obmedzeným prístupom vráti `{ restricted: true, visibility }`, pokiaľ (voliteľný) JWT nespĺňa podmienku prístupu |
| GET | `/public/:churchId` | Verejné | — | Zoznam verejných stránok (`url`, `title`, `metaDescription`); iba s `visibility = everyone` |
| GET | `/:id` | JWT | — | Získa stránku podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých stránok cirkvi |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplikuje stránku so všetkými sekciami a prvkami |
| POST | `/temp/ai` | JWT | Content.Edit | Uloží stránku vygenerovanú AI (stránku, sekcie a prvky jedným volaním) |
| POST | `/importTree` | JWT | Content.Edit | Vytvorí stránku z vnoreného stromu (`title`, `url`, `sections[].elements[]…`). Vždy vkladá pod cirkev volajúceho; ID v tele požiadavky sa ignorujú. Riadky musia obsahovať svoje podriadené prvky `column`. Maximum 30 sekcií / 500 prvkov |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje stránky (dávkovo) |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže stránku |

### Príklad: Načítanie stromu stránky

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

## Sekcie

Základná cesta: `/content/sections`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa sekciu podľa ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplikuje sekciu alebo ju prevedie na opakovane použiteľný blok |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje sekcie (dávkovo). Automaticky aktualizuje poradie |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže sekciu (automaticky aktualizuje poradie) |

## Prvky

Základná cesta: `/content/elements`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa prvok podľa ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplikuje prvok so všetkými podriadenými prvkami |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje prvky (dávkovo). Automaticky spravuje stĺpce riadkov a snímky kolotoča |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže prvok |

## Bloky

Základná cesta: `/content/blocks`

Rozširuje štandardné CRUD operácie (GET `/:id`, GET `/`, POST `/`, DELETE `/:id`) zo základnej triedy, pri zápisoch s oprávnením Content.Edit.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa blok podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých blokov |
| GET | `/:churchId/tree/:id` | Verejné | — | Načíta celý strom bloku so sekciami a prvkami |
| GET | `/blockType/:blockType` | JWT | — | Načíta bloky podľa typu (napr. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Verejné | — | Načíta strom pätičkového bloku pre cirkev |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje bloky |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže blok |

## Odkazy

Základná cesta: `/content/links`

Rozširuje štandardné CRUD operácie (GET `/:id`, GET `/`, POST `/`, DELETE `/:id`) zo základnej triedy, pri zápisoch s oprávnením Content.Edit.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa odkaz podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých odkazov. Voliteľný filter `?category=`. Po uložení sa automaticky zoradí |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Načíta odkazy filtrované podľa viditeľnosti (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Verejné | — | Načíta odkazy cirkvi podľa kategórie (verejné) |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje odkazy (dávkovo). Automaticky zoradí podľa kategórie |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže odkaz |

## Globálne štýly

Základná cesta: `/content/globalStyles`

Rozširuje štandardné CRUD operácie (POST `/`, DELETE `/:id`) zo základnej triedy, pri zápisoch s oprávnením Content.Edit.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/church/:churchId` | Verejné | — | Načíta globálne štýly cirkvi (ak nie sú nastavené, vráti predvolené hodnoty) |
| GET | `/` | JWT | — | Načíta globálne štýly overenej cirkvi |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje globálne štýly |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže globálne štýly |

## História stránky

Základná cesta: `/content/pageHistory`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/page/:pageId` | JWT | Content.Edit | Zoznam záznamov histórie stránky |
| GET | `/block/:blockId` | JWT | Content.Edit | Zoznam záznamov histórie bloku |
| GET | `/:id` | JWT | Content.Edit | Získa záznam histórie podľa ID |
| POST | `/` | JWT | Content.Edit | Uloží snímku stránky/bloku. Pravidelne odstraňuje záznamy staršie ako 30 dní |
| POST | `/restore/:id` | JWT | Content.Edit | Obnoví stránku/blok zo snímky histórie (vymaže aktuálny obsah a znovu ho vytvorí zo snímky) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Obnoví zo snímky vloženej priamo v požiadavke. Telo: `{ pageId, blockId, snapshot }` |

## Príspevky (blog)

Základná cesta: `/content/posts`

Blogové príspevky sú samostatné záznamy: `title`, `slug` (jedinečný v rámci cirkvi), `excerpt`, `content` (telo v Markdown), `authorId`, `photoUrl`, `publishDate`, `category` a `tags`. Príspevok je zverejnený, keď je nastavený `publishDate` a tento dátum je v minulosti. Čítacie koncové body obohacujú každý príspevok o `authorName`, ktoré sa získa z `authorId`. Pozri [Architektúra tvorby webstránok](../../architecture/website-builder.md#blog).

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Verejné | — | Zoznam zverejnených príspevkov, stránkovaný (najviac 50 na stránku) |
| GET | `/public/:churchId/categories` | Verejné | — | Rôzne kategórie zverejnených príspevkov |
| GET | `/public/:churchId/slug/:slug` | Verejné | — | Získa zverejnený príspevok podľa slugu |
| GET | `/rss/:churchId?siteUrl=` | Verejné | — | RSS 2.0 kanál zverejnených príspevkov (odkazy sa vytvárajú ako `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Získa príspevok podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých príspevkov cirkvi |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje príspevky (dávkovo) |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže príspevok |

## Presmerovania

Základná cesta: `/content/redirects`

URL presmerovania pre jednotlivé cirkvi (`fromPath` → `toPath`), najviac 200 na cirkev. Cesty sa normalizujú (malé písmená, úvodné lomítko, bez koncového lomítka) a `fromPath` je jedinečný v rámci cirkvi. B1App ich spracuje pri odpovediach 404 a vydá HTTP 308.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/public/:churchId?path=` | Verejné | — | Preloží cestu (alebo vypíše všetky presmerovania, ak sa `path` vynechá) |
| GET | `/:id` | JWT | — | Získa presmerovanie podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých presmerovaní cirkvi |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje presmerovania. Odmietne `fromPath = toPath` a dodržiava limit 200 riadkov |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže presmerovanie |

## Kázne

Základná cesta: `/content/sermons`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/public/freeshowSample` | JWT | — | Získa vzorovú štruktúru playlistu FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Získa obal aplikácie pre TV so zdrojmi kázní, lekcií a FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Verejné | — | Získa jednu kázeň ako playlist TV kanála |
| GET | `/public/tvFeed/:churchId` | Verejné | — | Získa všetky verejné playlisty/kázne ako TV kanál |
| GET | `/public/:churchId` | Verejné | — | Zoznam všetkých verejných kázní cirkvi |
| GET | `/timeline?sermonIds=` | JWT | — | Načíta údaje časovej osi pre kázne |
| GET | `/lookup?videoType=&videoData=` | Verejné | — | Vyhľadá metadáta kázne z YouTube alebo Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Vygeneruje AI návrhy príspevkov pre sociálne siete z titulkov kázne |
| GET | `/outline?url=&title=&author=` | JWT | — | Vygeneruje AI osnovu lekcie z URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importuje videá z kanála YouTube. HTML entity, ktoré API vyhľadávania YouTube uvádza v názvoch a popisoch (napríklad `&amp;` a `&#39;`), sa dekódujú |
| GET | `/vimeoImport/:channelId` | JWT | — | Importuje videá z kanála Vimeo |
| GET | `/:id` | JWT | — | Získa kázeň podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých kázní |
| POST | `/` | JWT | StreamingServices.Edit | Vytvorí alebo aktualizuje kázne. Prijíma pole alebo jeden objekt kázne (vždy vracia pole); prázdne telo vráti 400. Podporuje nahratie náhľadu v base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Vymaže kázeň |

### Príklad: Vyhľadanie kázne na YouTube

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

Základná cesta: `/content/playlists`

Rozširuje štandardné CRUD operácie (GET `/:id`, GET `/`, DELETE `/:id`) zo základnej triedy, pri zápisoch s oprávnením StreamingServices.Edit.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa playlist podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých playlistov |
| GET | `/public/:churchId` | Verejné | — | Zoznam všetkých verejných playlistov cirkvi |
| POST | `/` | JWT | StreamingServices.Edit | Vytvorí alebo aktualizuje playlisty (dávkovo, podporuje nahratie náhľadu v base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Vymaže playlist |

## Streamovacie služby

Základná cesta: `/content/streamingServices`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Získa zašifrované ID chatovej miestnosti hostiteľa pre službu |
| GET | `/` | JWT | — | Zoznam všetkých streamovacích služieb. Automaticky odstráni expirované jednorazové služby a posúva opakujúce sa služby |
| POST | `/` | JWT | StreamingServices.Edit | Vytvorí alebo aktualizuje streamovacie služby (dávkovo) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Vymaže streamovaciu službu (zároveň vymaže blokované IP adresy) |

## Udalosti

Základná cesta: `/content/events`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Načíta udalosti časovej osi pre skupinu (zahŕňa výnimočné dátumy, takže sa dajú preskočiť vymazané výskyty) |
| GET | `/timeline?eventIds=` | JWT | — | Načíta udalosti časovej osi pre skupiny aktuálneho používateľa (zahŕňa výnimočné dátumy) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Verejné | — | Prihlási sa na odber udalostí ako kanál kalendára ICS |
| GET | `/group/:groupId` | JWT | — | Získa udalosti skupiny (zahŕňa výnimočné dátumy) |
| GET | `/public/group/:churchId/:groupId` | Verejné | — | Získa verejné udalosti skupiny |
| GET | `/public/:churchId/:id` | Verejné | — | Získa jednu udalosť pre jej verejnú stránku s `roomNames` (miestnosti z rezervácií, ktoré neboli zamietnuté). Pre čakajúce alebo zamietnuté udalosti a pre súkromné udalosti, ktoré neprijímajú registrácie, vráti `null` |
| GET | `/public/:churchId/:id/ical` | Verejné | — | Stiahne túto jednu udalosť ako súbor `.ics` (`text/calendar`, s uplatnenými výnimočnými dátumami). `404`, ak je udalosť skrytá podľa rovnakých pravidiel |
| GET | `/:id` | JWT | — | Získa udalosť podľa ID |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje udalosti (dávkovo) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin alebo vedúci skupiny | Vymaže udalosť a jej rezervácie. Vedúci skupiny udalosti ju môžu vymazať a žiadateľ môže stiahnuť vlastnú čakajúcu žiadosť |

Záznamy udalostí obsahujú `photoUrl` (fotografia udalosti v pomere 16:9, zobrazená na verejnej stránke udalosti a v dlaždiciach nadchádzajúcich udalostí), `tags` (oddelené čiarkami, používa ich filter značiek prvku Kalendár na webe) a `notesViewRole` / `notesPostRole` (`staff`, ak je hodnota `null`, `leaders` alebo `members`), ktoré riadia prístup ku konverzácii `eventNote` udalosti — pozri [Riadenie prístupu k poznámkam skupiny a udalosti](./messaging.md#group-and-event-notes-access-control). Odpovede verejných kurátorovaných udalostí obsahujú aj `photoUrl` a `tags` každej udalosti.

## Výnimky udalostí

Základná cesta: `/content/eventExceptions`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa výnimku udalosti podľa ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin alebo vedúci skupiny | Vytvorí alebo aktualizuje výnimky udalostí (dávkovo). Vedúci môžu pridávať výnimky iba pre udalosti v skupinách, ktoré vedú |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin alebo vedúci skupiny | Vymaže výnimku udalosti |

## Kurátorované kalendáre

Základná cesta: `/content/curatedCalendars`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa kurátorovaný kalendár podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých kurátorovaných kalendárov |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje kurátorované kalendáre (dávkovo) |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže kurátorovaný kalendár |

## Kurátorované udalosti

Základná cesta: `/content/curatedEvents`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Získa kurátorované udalosti kalendára (zahŕňa podrobnosti o udalostiach a výnimočné dátumy, pokiaľ nie je nastavené `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Verejné | — | Získa verejné kurátorované udalosti kalendára |
| GET | `/:id` | JWT | — | Získa kurátorovanú udalosť podľa ID |
| GET | `/` | JWT | — | Zoznam všetkých kurátorovaných udalostí |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje kurátorované udalosti. Podporuje pole `eventIds` na pridanie konkrétnych udalostí skupiny |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže kurátorovanú udalosť |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Odstráni konkrétnu udalosť z kurátorovaného kalendára |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Odstráni všetky udalosti skupiny z kurátorovaného kalendára |

## Súbory

Základná cesta: `/content/files`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:contentType/:contentId` | JWT | — | Získa súbory podľa typu obsahu a ID obsahu |
| GET | `/` | JWT | — | Zoznam všetkých súborov webstránky cirkvi |
| GET | `/:id` | JWT | — | Získa súbor podľa ID |
| POST | `/` | JWT | Content.Edit* | Nahrá súbory (base64). *Povolené aj vtedy, ak je používateľ členom skupiny zodpovedajúcej `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Získa podpísanú URL na nahratie do S3. *Povolené aj pre členov skupiny. Najviac 100 MB na jednu položku obsahu |
| DELETE | `/:id` | JWT | Content.Edit* | Vymaže súbor a odstráni ho z úložiska. *Povolené aj pre členov skupiny |

## Galéria

Základná cesta: `/content/gallery`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/stock/:folder` | Verejné | — | Zoznam stock fotografií v priečinku |
| GET | `/:folder` | JWT | Content.Edit | Zoznam obrázkov galérie v priečinku |
| POST | `/requestUpload` | JWT | Content.Edit | Získa podpísanú URL na nahratie obrázka do galérie do S3 |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Vymaže obrázok z galérie |

## Biblie

Základná cesta: `/content/bibles`

Všetky biblické koncové body sú verejné (nevyžadujú overenie). Údaje sa načítavajú z externých zdrojov a ukladajú sa lokálne do vyrovnávacej pamäte. Požiadavky na api.bible vypršia po 15 sekundách; vypršanie vráti **504**.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | Verejné | — | Zoznam všetkých biblických prekladov (ak je vyrovnávacia pamäť prázdna, načíta ich zo zdroja) |
| GET | `/stats?startDate=&endDate=` | Verejné | — | Získa štatistiky vyhľadávania v Biblii za dátumový rozsah |
| GET | `/availableTranslations/:source` | Verejné | — | Zoznam dostupných prekladov zo zdroja (napr. api.bible) |
| GET | `/updateTranslations` | Verejné | — | Synchronizuje všetky preklady zo všetkých zdrojov |
| GET | `/updateTranslations/:source` | Verejné | — | Synchronizuje preklady z konkrétneho zdroja |
| GET | `/updateCopyrights` | Verejné | — | Aktualizuje informácie o autorských právach pre preklady, ktoré ich nemajú |
| GET | `/:translationKey/updateCopyright` | Verejné | — | Aktualizuje autorské práva pre konkrétny preklad |
| GET | `/:translationKey/search?query=&limit=` | Verejné | — | Vyhľadá verše v preklade |
| GET | `/:translationKey/books` | Verejné | — | Získa knihy prekladu (ukladá do lokálnej vyrovnávacej pamäte) |
| GET | `/:translationKey/:bookKey/chapters` | Verejné | — | Získa kapitoly knihy (ukladá lokálne) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Verejné | — | Získa verše kapitoly (ukladá lokálne) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Verejné | — | Získa text veršov v rozsahu. Zaznamenáva vyhľadávania. Niektoré preklady obchádzajú vyrovnávaciu pamäť z dôvodu licencie |

### Príklad: Získanie textu veršov

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

## Piesne

Základná cesta: `/content/songs`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/search?q=` | JWT | — | Vyhľadá piesne podľa dotazu |
| GET | `/:id` | JWT | — | Získa pieseň podľa ID |
| GET | `/` | JWT | Content.Edit | Zoznam všetkých piesní |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje piesne (dávkovo) |
| POST | `/import` | JWT | — | Importuje piesne z FreeShow (dávkovo) |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže pieseň |

## Podrobnosti o piesňach

Základná cesta: `/content/songDetails`

Podrobnosti o piesňach sú globálne (nie sú viazané na cirkev). Predstavujú kanonické metadáta piesní zdieľané medzi cirkvami.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa podrobnosti o piesni podľa ID (globálne) |
| GET | `/` | JWT | — | Zoznam podrobností o piesňach pre cirkev |
| POST | `/create` | JWT | — | Vytvorí podrobnosti o piesni z ID PraiseCharts (ak už existujú, vráti ich). Automaticky načíta metadáta z PraiseCharts a MusicBrainz |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje podrobnosti o piesňach (dávkovo) |

## Odkazy podrobností o piesňach

Základná cesta: `/content/songDetailLinks`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa odkaz podrobností o piesni podľa ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Získa všetky odkazy podrobností o piesni |
| POST | `/` | JWT | — | Vytvorí alebo aktualizuje odkazy podrobností o piesni (dávkovo). Ak je odkaz prepojený, automaticky načíta údaje z MusicBrainz |
| DELETE | `/:id` | JWT | — | Vymaže odkaz podrobností o piesni |

## Aranžmány

Základná cesta: `/content/arrangements`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/:id` | JWT | — | Získa aranžmán podľa ID |
| GET | `/song/:songId` | JWT | Content.Edit | Získa aranžmány piesne |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Získa aranžmány podrobností o piesni |
| GET | `/` | JWT | Content.Edit | Zoznam všetkých aranžmánov |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje aranžmány (dávkovo) |
| POST | `/freeShow/missing` | JWT | — | Nájde ID FreeShow, ktoré v cirkvi neexistujú. Telo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže aranžmán (zároveň vymaže kľúče; vymaže pieseň, ak nezostanú žiadne aranžmány) |

## Kľúče aranžmánov

Základná cesta: `/content/arrangementKeys`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/presenter/:churchId/:id` | Verejné | — | Získa kľúč aranžmánu s úplnými údajmi o piesni pre zobrazenie prezentujúcim |
| GET | `/:id` | JWT | — | Získa kľúč aranžmánu podľa ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Získa kľúče aranžmánu |
| GET | `/` | JWT | Content.Edit | Zoznam všetkých kľúčov aranžmánov |
| POST | `/` | JWT | Content.Edit | Vytvorí alebo aktualizuje kľúče aranžmánov (dávkovo) |
| DELETE | `/:id` | JWT | Content.Edit | Vymaže kľúč aranžmánu |

## Nastavenia

Základná cesta: `/content/settings`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/my` | JWT | — | Získa nastavenia aktuálneho používateľa |
| GET | `/` | JWT | Settings.Edit | Získa všetky nastavenia cirkvi |
| GET | `/public/:churchId` | Verejné | — | Získa verejné nastavenia cirkvi (vrátené ako dvojice kľúč – hodnota) |
| POST | `/my` | JWT | — | Uloží nastavenia na úrovni používateľa (podporuje nahratie obrázka v base64) |
| POST | `/` | JWT | Settings.Edit | Uloží nastavenia na úrovni cirkvi (podporuje nahratie obrázka v base64) |
| DELETE | `/my/:id` | JWT | — | Vymaže nastavenie používateľa |

## Náhľad

Základná cesta: `/content/preview`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/data/:key` | Verejné | — | Načíta údaje o náhľade streamovania pre cirkev podľa kľúča subdomény (karty, odkazy, služby, kázne) |

## Galéria (stock fotografie)

Základná cesta: `/content/stock`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| POST | `/search` | Verejné | — | Vyhľadá stock fotografie na Pexels. Telo: `{ term: "church" }` |

## PraiseCharts

Základná cesta: `/content/praiseCharts`

Integrácia s PraiseCharts na objavovanie piesní na bohoslužby a sťahovanie notových zápisov.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/raw/:id` | JWT | — | Získa nespracované údaje PraiseCharts o piesni |
| GET | `/hasAccount` | JWT | — | Skontroluje, či má používateľ prepojený účet PraiseCharts |
| GET | `/search?q=` | JWT | — | Vyhľadá v katalógu PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Získa produkty k piesni (z knižnice, ak je používateľ overený, inak z katalógu) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Získa nespracované údaje aranžmánu z knižnice |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Stiahne súbor z PraiseCharts (PDF alebo ZIP). Vracia `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Verejné | — | Získa autorizačnú URL OAuth pre PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Vymení overovací kód OAuth za prístupový token a uloží ho do nastavení používateľa |
| GET | `/library` | JWT | — | Prechádza knižnicu PraiseCharts používateľa |

## Podpora

Základná cesta: `/content/support`

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| POST | `/createAudio` | Verejné | — | Prevedie SSML na zvuk MP3 pomocou AWS Polly. Telo: `{ ssml: "<speak>...</speak>" }` |

## Súvisiace stránky

- [Architektúra tvorby webstránok](../../architecture/website-builder.md) -- Ako stránky, sekcie, prvky, príspevky a presmerovania spolu súvisia naprieč aplikáciami
- [Koncové body členstva](./membership.md) -- Ľudia, cirkvi, skupiny, roly, oprávnenia
- [Koncové body dochádzky](./attendance.md) -- Sledovanie služieb a návštev
- [Overenie a oprávnenia](./authentication.md) -- Tok prihlásenia, JWT, model oprávnení
- [Štruktúra modulov](../module-structure.md) -- Vzory organizácie kódu
