---
title: "Slutpunkter för Content"
---

# Slutpunkter för Content

<div class="article-intro">

Modulen Content hanterar webbplatsens sidor, sektioner, element, block, blogginlägg, omdirigeringar, predikningar, spellistor, streamingtjänster, händelser, kuraterade kalendrar, filer, gallerier, bibelöversättningar och versuppslag, sånger, arrangemang, globala stilar, stockfoton och inställningar. Det är den största modulen i API:et och driver CMS:et, media- och streamingfunktionerna, gudstjänstplaneringen och bibelfunktionerna i alla ChurchApps-applikationer.

</div>

**Bassökväg:** `/content`

## Sidor

Bassökväg: `/content/pages`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:churchId/tree?url=&id=` | Offentlig | — | Hämta hela sidträdet (sektioner, element, block) via URL eller ID. Tar bort interna ID:n när hämtningen sker via URL. URL-baserade hämtningar tillämpar `pages.visibility`. En låst sida returnerar `{ restricted: true, visibility }` om inte den (valfria) JWT:n uppfyller villkoret |
| GET | `/public/:churchId` | Offentlig | — | Lista offentliga sidor (`url`, `title`, `metaDescription`). Endast `visibility = everyone` |
| GET | `/:id` | JWT | — | Hämta en sida via ID |
| GET | `/` | JWT | — | Lista alla sidor för kyrkan |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicera en sida med alla sektioner och element |
| POST | `/temp/ai` | JWT | Content.Edit | Spara en AI-genererad sida (sida, sektioner och element i ett anrop) |
| POST | `/importTree` | JWT | Content.Edit | Skapa en sida från ett kapslat träd (`title`, `url`, `sections[].elements[]…`). Infogas alltid under anroparens kyrka. ID:n i brödtexten ignoreras. Rader måste innehålla sina `column`-underordnade. Max 30 sektioner / 500 element |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera sidor (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort en sida |

### Exempel: Hämta sidträd

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

## Sektioner

Bassökväg: `/content/sections`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en sektion via ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicera en sektion eller konvertera den till ett återanvändbart block |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera sektioner (batch). Uppdaterar sorteringsordningen automatiskt |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort en sektion (uppdaterar sorteringsordningen automatiskt) |

## Element

Bassökväg: `/content/elements`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta ett element via ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicera ett element med alla underordnade |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera element (batch). Hanterar radkolumner och karusellbilder automatiskt |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort ett element |

## Block

Bassökväg: `/content/blocks`

Utökar standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` från basklassen, med behörigheten Content.Edit för skrivningar).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta ett block via ID |
| GET | `/` | JWT | — | Lista alla block |
| GET | `/:churchId/tree/:id` | Offentlig | — | Hämta hela blockträdet med sektioner och element |
| GET | `/blockType/:blockType` | JWT | — | Hämta block efter typ (t.ex. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Offentlig | — | Hämta sidfotsblockets träd för en kyrka |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera block |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort ett block |

## Länkar

Bassökväg: `/content/links`

Utökar standard-CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` från basklassen, med behörigheten Content.Edit för skrivningar).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en länk via ID |
| GET | `/` | JWT | — | Lista alla länkar. Valfritt filter `?category=`. Sorteras automatiskt efter sparning |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Hämta länkar filtrerade efter synlighet (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Offentlig | — | Hämta länkar för en kyrka per kategori (offentligt) |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera länkar (batch). Sorteras automatiskt efter kategori |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort en länk |

## Globala stilar

Bassökväg: `/content/globalStyles`

Utökar standard-CRUD (POST `/`, DELETE `/:id` från basklassen, med behörigheten Content.Edit för skrivningar).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/church/:churchId` | Offentlig | — | Hämta globala stilar för en kyrka (returnerar standardvärden om inga är angivna) |
| GET | `/` | JWT | — | Hämta globala stilar för den inloggade kyrkan |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera globala stilar |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort globala stilar |

## Sidhistorik

Bassökväg: `/content/pageHistory`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lista historikposter för en sida |
| GET | `/block/:blockId` | JWT | Content.Edit | Lista historikposter för ett block |
| GET | `/:id` | JWT | Content.Edit | Hämta en historikpost via ID |
| POST | `/` | JWT | Content.Edit | Spara en ögonblicksbild av en sida eller ett block. Rensar periodiskt poster som är äldre än 30 dagar |
| POST | `/restore/:id` | JWT | Content.Edit | Återställ en sida eller ett block från en historik-ögonblicksbild (tar bort det aktuella innehållet och återskapar det från ögonblicksbilden) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Återställ från ett inline-ögonblicksbildsobjekt. Brödtext: `{ pageId, blockId, snapshot }` |

## Inlägg (blogg)

Bassökväg: `/content/posts`

Blogginlägg är fristående rader: `title`, `slug` (unik per kyrka), `excerpt`, `content` (markdown-brödtext), `authorId`, `photoUrl`, `publishDate`, `category` och `tags`. Ett inlägg publiceras när `publishDate` är satt och ligger i det förflutna. Läsanrop berikar varje inlägg med `authorName`, som slås upp från `authorId`. Se [Arkitektur för webbplatsbyggaren](../../architecture/website-builder#blog).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Offentlig | — | Lista publicerade inlägg, sidnumrerade (max 50 per sida) |
| GET | `/public/:churchId/categories` | Offentlig | — | Unika kategorier bland publicerade inlägg |
| GET | `/public/:churchId/slug/:slug` | Offentlig | — | Hämta ett publicerat inlägg via slug |
| GET | `/rss/:churchId?siteUrl=` | Offentlig | — | RSS 2.0-flöde för publicerade inlägg (länkar byggs som `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Hämta ett inlägg via ID |
| GET | `/` | JWT | — | Lista alla inlägg för kyrkan |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera inlägg (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort ett inlägg |

## Omdirigeringar

Bassökväg: `/content/redirects`

Omdirigeringar av URL:er per kyrka (`fromPath` → `toPath`), begränsade till 200 per kyrka. Sökvägar normaliseras (gemener, inledande snedstreck, inget avslutande snedstreck) och `fromPath` är unik per kyrka. B1App löser upp dessa när en 404 annars skulle uppstå och skickar en HTTP 308.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/public/:churchId?path=` | Offentlig | — | Slå upp en sökväg (eller lista alla omdirigeringar när `path` utelämnas) |
| GET | `/:id` | JWT | — | Hämta en omdirigering via ID |
| GET | `/` | JWT | — | Lista alla omdirigeringar för kyrkan |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera omdirigeringar. Avvisar `fromPath = toPath` och upprätthåller gränsen på 200 rader |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort en omdirigering |

## Predikningar

Bassökväg: `/content/sermons`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/public/freeshowSample` | JWT | — | Hämta en exempelstruktur för en FreeShow-spellista |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Hämta TV-appens omslag med predikan, lektions- och FreeShow-källor |
| GET | `/public/tvFeed/:churchId/:sermonId` | Offentlig | — | Hämta en enskild predikan som en TV-flödesspellista |
| GET | `/public/tvFeed/:churchId` | Offentlig | — | Hämta alla offentliga spellistor och predikningar som ett TV-flöde |
| GET | `/public/:churchId` | Offentlig | — | Lista alla offentliga predikningar för en kyrka |
| GET | `/timeline?sermonIds=` | JWT | — | Hämta tidslinjedata för predikningar |
| GET | `/lookup?videoType=&videoData=` | Offentlig | — | Slå upp predikans metadata från YouTube eller Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generera AI-förslag på inlägg för sociala medier utifrån predikans undertexter |
| GET | `/outline?url=&title=&author=` | JWT | — | Generera en AI-genererad lektionsöversikt från en URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importera videor från en YouTube-kanal. HTML-entiteter som YouTubes sök-API lägger i titlar och beskrivningar (till exempel `&amp;` och `&#39;`) avkodas |
| GET | `/vimeoImport/:channelId` | JWT | — | Importera videor från en Vimeo-kanal |
| GET | `/:id` | JWT | — | Hämta en predikan via ID |
| GET | `/` | JWT | — | Lista alla predikningar |
| POST | `/` | JWT | StreamingServices.Edit | Skapa eller uppdatera predikningar. Accepterar en array eller ett enskilt predikanobjekt (returnerar alltid en array). En tom brödtext ger 400. Stöder uppladdning av miniatyrbild i base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Ta bort en predikan |

### Exempel: Slå upp en YouTube-predikan

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

## Spellistor

Bassökväg: `/content/playlists`

Utökar standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` från basklassen, med behörigheten StreamingServices.Edit för skrivningar).

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en spellista via ID |
| GET | `/` | JWT | — | Lista alla spellistor |
| GET | `/public/:churchId` | Offentlig | — | Lista alla offentliga spellistor för en kyrka |
| POST | `/` | JWT | StreamingServices.Edit | Skapa eller uppdatera spellistor (batch, stöder uppladdning av miniatyrbild i base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Ta bort en spellista |

## Streamingtjänster

Bassökväg: `/content/streamingServices`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Hämta det krypterade rum-ID:t för värdchatten för en tjänst |
| GET | `/` | JWT | — | Lista alla streamingtjänster. Rensar automatiskt utgångna icke-återkommande tjänster och flyttar fram återkommande tjänster |
| POST | `/` | JWT | StreamingServices.Edit | Skapa eller uppdatera streamingtjänster (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Ta bort en streamingtjänst (rensar även blockerade IP-adresser) |

## Händelser

Bassökväg: `/content/events`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Hämta tidslinjehändelser för en grupp (inkluderar undantagsdatum, så att borttagna förekomster kan hoppas över) |
| GET | `/timeline?eventIds=` | JWT | — | Hämta tidslinjehändelser för den aktuella användarens grupper (inkluderar undantagsdatum) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Offentlig | — | Prenumerera på händelser som ett ICS-kalenderflöde |
| GET | `/group/:groupId` | JWT | — | Hämta händelser för en grupp (inkluderar undantagsdatum) |
| GET | `/public/group/:churchId/:groupId` | Offentlig | — | Hämta offentliga händelser för en grupp |
| GET | `/public/:churchId/:id` | Offentlig | — | Hämta en händelse för dess offentliga sida, med `roomNames` (rum från bokningar som inte är avvisade). Returnerar `null` för väntande eller avvisade händelser och för privata händelser som inte tar emot anmälningar |
| GET | `/public/:churchId/:id/ical` | Offentlig | — | Ladda ned den enskilda händelsen som en `.ics`-fil (`text/calendar`, undantagsdatum tillämpas). `404` när händelsen är dold enligt samma regler |
| GET | `/:id` | JWT | — | Hämta en händelse via ID |
| POST | `/` | JWT | — | Skapa eller uppdatera händelser (batch) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin eller gruppledare | Ta bort en händelse och dess bokningar. Ledare för händelsens grupp får ta bort den, och en sökande får dra tillbaka sin egen väntande begäran |

Händelseposter innehåller `photoUrl` (händelsefotot i 16:9 som visas på den offentliga händelsesidan och på kommande händelsekort), `tags` (kommaseparerade, används av webbplatsens Calendar-element för taggfiltret) och `notesViewRole` / `notesPostRole` (`staff` när värdet är `null`, `leaders` eller `members`). Dessa styr åtkomsten till händelsens `eventNote`-konversation. Se [Åtkomstkontroll för grupp- och händelseanteckningar](./messaging.md#group-and-event-notes-access-control). Svar för offentliga kuraterade händelser innehåller också varje händelses `photoUrl` och `tags`.

## Händelseundantag

Bassökväg: `/content/eventExceptions`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta ett händelseundantag via ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin eller gruppledare | Skapa eller uppdatera händelseundantag (batch). Ledare får endast lägga till undantag för händelser i grupper de leder |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin eller gruppledare | Ta bort ett händelseundantag |

## Kuraterade kalendrar

Bassökväg: `/content/curatedCalendars`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en kuraterad kalender via ID |
| GET | `/` | JWT | — | Lista alla kuraterade kalendrar |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera kuraterade kalendrar (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort en kuraterad kalender |

## Kuraterade händelser

Bassökväg: `/content/curatedEvents`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Hämta kuraterade händelser för en kalender (inkluderar händelsedetaljer och undantagsdatum om inte `?withoutEvents` anges) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Offentlig | — | Hämta offentliga kuraterade händelser för en kalender |
| GET | `/:id` | JWT | — | Hämta en kuraterad händelse via ID |
| GET | `/` | JWT | — | Lista alla kuraterade händelser |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera kuraterade händelser. Stöder en array `eventIds` för att lägga till specifika grupphändelser |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort en kuraterad händelse |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Ta bort en specifik händelse från en kuraterad kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Ta bort alla händelser för en grupp från en kuraterad kalender |

## Filer

Bassökväg: `/content/files`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:contentType/:contentId` | JWT | — | Hämta filer efter innehållstyp och innehålls-ID |
| GET | `/` | JWT | — | Lista alla filer för kyrkans webbplats |
| GET | `/:id` | JWT | — | Hämta en fil via ID |
| POST | `/` | JWT | Content.Edit* | Ladda upp filer (base64). *Tillåts också om användaren är medlem i gruppen som matchar `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Hämta en försignerad S3-uppladdningslänk. *Tillåts även för gruppmedlemmar. Max 100 MB per innehållsobjekt |
| DELETE | `/:id` | JWT | Content.Edit* | Ta bort en fil och ta bort den från lagringen. *Tillåts även för gruppmedlemmar |

## Galleri

Bassökväg: `/content/gallery`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/stock/:folder` | Offentlig | — | Lista stockfoton i en mapp |
| GET | `/:folder` | JWT | Content.Edit | Lista galleribilder i en mapp |
| POST | `/requestUpload` | JWT | Content.Edit | Hämta en försignerad S3-uppladdningslänk för en galleribild |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Ta bort en galleribild |

## Bibelöversättningar

Bassökväg: `/content/bibles`

Alla bibelslutpunkter är offentliga (ingen autentisering krävs). Data hämtas från externa källor och cachelagras lokalt. Begäranden till api.bible avbryts efter 15 sekunder. En timeout returnerar **504**.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | Offentlig | — | Lista alla bibelöversättningar (hämtar från källan om cachen är tom) |
| GET | `/stats?startDate=&endDate=` | Offentlig | — | Hämta statistik över bibelsökningar för ett datumintervall |
| GET | `/availableTranslations/:source` | Offentlig | — | Lista tillgängliga översättningar från en källa (t.ex. api.bible) |
| GET | `/updateTranslations` | Offentlig | — | Synkronisera alla översättningar från alla källor |
| GET | `/updateTranslations/:source` | Offentlig | — | Synkronisera översättningar från en specifik källa |
| GET | `/updateCopyrights` | Offentlig | — | Uppdatera upphovsrättsinformation för översättningar som saknar den |
| GET | `/:translationKey/updateCopyright` | Offentlig | — | Uppdatera upphovsrätten för en specifik översättning |
| GET | `/:translationKey/search?query=&limit=` | Offentlig | — | Sök verser i en översättning |
| GET | `/:translationKey/books` | Offentlig | — | Hämta böcker för en översättning (cachelagrar lokalt) |
| GET | `/:translationKey/:bookKey/chapters` | Offentlig | — | Hämta kapitel för en bok (cachelagrar lokalt) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Offentlig | — | Hämta verser för ett kapitel (cachelagrar lokalt) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Offentlig | — | Hämta versens text för ett intervall. Loggar uppslag. Vissa översättningar kringgår cachning av licensskäl |

### Exempel: Hämta versens text

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

## Sånger

Bassökväg: `/content/songs`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/search?q=` | JWT | — | Sök sånger med en fråga |
| GET | `/:id` | JWT | — | Hämta en sång via ID |
| GET | `/` | JWT | Content.Edit | Lista alla sånger |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera sånger (batch) |
| POST | `/import` | JWT | — | Importera sånger från FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort en sång |

## Sångdetaljer

Bassökväg: `/content/songDetails`

Sångdetaljer är globala (inte kyrkobundna). De representerar kanoniska sångmetadata som delas mellan kyrkor.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en sångdetalj via ID (global) |
| GET | `/` | JWT | — | Lista sångdetaljer för kyrkan |
| POST | `/create` | JWT | — | Skapa en sångdetalj från ett PraiseCharts-ID (returnerar befintlig om den redan har skapats). Hämtar metadata automatiskt från PraiseCharts och MusicBrainz |
| POST | `/` | JWT | — | Skapa eller uppdatera sångdetaljer (batch) |

## Länkar till sångdetaljer

Bassökväg: `/content/songDetailLinks`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta en länk till en sångdetalj via ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Hämta alla länkar för en sångdetalj |
| POST | `/` | JWT | — | Skapa eller uppdatera länkar till sångdetaljer (batch). Hämtar MusicBrainz-data automatiskt om en länk finns |
| DELETE | `/:id` | JWT | — | Ta bort en länk till en sångdetalj |

## Arrangemang

Bassökväg: `/content/arrangements`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hämta ett arrangemang via ID |
| GET | `/song/:songId` | JWT | Content.Edit | Hämta arrangemang för en sång |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Hämta arrangemang för en sångdetalj |
| GET | `/` | JWT | Content.Edit | Lista alla arrangemang |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera arrangemang (batch) |
| POST | `/freeShow/missing` | JWT | — | Hitta FreeShow-ID:n som inte finns i kyrkan. Brödtext: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort ett arrangemang (tar även bort tangenterna, och tar bort sången om inga arrangemang återstår) |

## Arrangemangstangenter

Bassökväg: `/content/arrangementKeys`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:id` | Offentlig | — | Hämta en arrangemangstangent med fullständiga sångdata för presentatörsvyn |
| GET | `/:id` | JWT | — | Hämta en arrangemangstangent via ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Hämta tangenter för ett arrangemang |
| GET | `/` | JWT | Content.Edit | Lista alla arrangemangstangenter |
| POST | `/` | JWT | Content.Edit | Skapa eller uppdatera arrangemangstangenter (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Ta bort en arrangemangstangent |

## Inställningar

Bassökväg: `/content/settings`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Hämta aktuell användares inställningar |
| GET | `/` | JWT | Settings.Edit | Hämta alla inställningar för kyrkan |
| GET | `/public/:churchId` | Offentlig | — | Hämta offentliga inställningar för en kyrka (returneras som nyckel-värdepar) |
| POST | `/my` | JWT | — | Spara användarnivåinställningar (stöder uppladdning av bild i base64) |
| POST | `/` | JWT | Settings.Edit | Spara kyrkonivåinställningar (stöder uppladdning av bild i base64) |
| DELETE | `/my/:id` | JWT | — | Ta bort en användarinställning |

## Förhandsgranskning

Bassökväg: `/content/preview`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/data/:key` | Offentlig | — | Ladda streamingförhandsgranskningsdata för en kyrka via subdomännyckel (flikar, länkar, tjänster, predikningar) |

## Galleri (stockfoton)

Bassökväg: `/content/stock`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| POST | `/search` | Offentlig | — | Sök bland Pexels stockfoton. Brödtext: `{ term: "church" }` |

## PraiseCharts

Bassökväg: `/content/praiseCharts`

Integration med PraiseCharts för upptäckt av lovsånger och nedladdning av notblad.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/raw/:id` | JWT | — | Hämta rådata från PraiseCharts för en sång |
| GET | `/hasAccount` | JWT | — | Kontrollera om användaren har ett kopplat PraiseCharts-konto |
| GET | `/search?q=` | JWT | — | Sök i PraiseCharts-katalogen |
| GET | `/products/:id?keys=` | JWT | — | Hämta produkter för en sång (från biblioteket om användaren är inloggad, annars från katalogen) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Hämta rådata för arrangemang från biblioteket |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Ladda ned en fil från PraiseCharts (PDF eller ZIP). Returnerar `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Offentlig | — | Hämta OAuth-auktoriseringslänken för PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Byt OAuth-verifieraren mot en åtkomsttoken och spara den i användarinställningarna |
| GET | `/library` | JWT | — | Bläddra i användarens PraiseCharts-bibliotek |

## Support

Bassökväg: `/content/support`

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| POST | `/createAudio` | Offentlig | — | Konvertera SSML till MP3-ljud med AWS Polly. Brödtext: `{ ssml: "<speak>...</speak>" }` |

## Relaterade sidor

- [Arkitektur för webbplatsbyggaren](../../architecture/website-builder) -- Hur sidor, sektioner, element, inlägg och omdirigeringar hänger ihop över apparna
- [Slutpunkter för Membership](./membership) -- Personer, kyrkor, grupper, roller, behörigheter
- [Slutpunkter för Attendance](./attendance) -- Spårning av gudstjänster och besök
- [Autentisering och behörigheter](./authentication) -- Inloggningsflöde, JWT, behörighetsmodell
- [Modulstruktur](../module-structure) -- Mönster för kodorganisation
