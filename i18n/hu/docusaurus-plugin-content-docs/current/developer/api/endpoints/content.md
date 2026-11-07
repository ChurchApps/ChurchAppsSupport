---
title: "Tartalom végpontjai"
---

# Tartalom végpontjai

<div class="article-intro">

A Tartalom modul kezeli a weboldalak oldalait, szakaszait, elemeit, blokkjait, blogbejegyzéseit, átirányításait, prédikációit, lejátszási listáit, streaming szolgáltatásait, eseményeit, válogatott naptárait, fájljait, galériáit, Biblia-fordításait és igehely-kereséseit, dalait, hangszereléseit, globális stílusait, stock fotóit és beállításait. Ez az API legnagyobb modulja, és az összes ChurchApps alkalmazásban működteti a CMS-t, a média- és streaming-funkciókat, az istentiszteleti tervezést és a Biblia-funkciókat.

</div>

**Alap útvonal:** `/content`

## Oldalak

Alap útvonal: `/content/pages`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:churchId/tree?url=&id=` | Nyilvános | — | Teljes oldalfa betöltése (szakaszok, elemek, blokkok) URL vagy azonosító alapján. URL szerinti lekérésnél eltávolítja a belső azonosítókat. URL szerinti lekéréskor a `pages.visibility` érvényesül: egy korlátozott oldal `{ restricted: true, visibility }` választ ad, kivéve ha a (nem kötelező) JWT teljesíti a korlátozást |
| GET | `/public/:churchId` | Nyilvános | — | Nyilvános oldalak listázása (`url`, `title`, `metaDescription`); csak a `visibility = everyone` értékűek |
| GET | `/:id` | JWT | — | Oldal lekérése azonosító alapján |
| GET | `/` | JWT | — | Az összes gyülekezeti oldal listázása |
| POST | `/duplicate/:id` | JWT | Content.Edit | Oldal duplikálása az összes szakaszával és elemével |
| POST | `/temp/ai` | JWT | Content.Edit | MI által generált oldal mentése (oldal, szakaszok és elemek egy hívásban) |
| POST | `/importTree` | JWT | Content.Edit | Oldal létrehozása egymásba ágyazott fából (`title`, `url`, `sections[].elements[]…`). Mindig a hívó gyülekezetéhez szúrja be; a törzsben lévő azonosítókat figyelmen kívül hagyja. A soroknak tartalmazniuk kell a `column` gyermekelemeiket. Legfeljebb 30 szakasz / 500 elem |
| POST | `/` | JWT | Content.Edit | Oldalak létrehozása vagy frissítése (kötegelve) |
| DELETE | `/:id` | JWT | Content.Edit | Oldal törlése |

### Példa: oldalfa betöltése

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

## Szakaszok

Alap útvonal: `/content/sections`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Szakasz lekérése azonosító alapján |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Szakasz duplikálása, vagy átalakítása újrafelhasználható blokkká |
| POST | `/` | JWT | Content.Edit | Szakaszok létrehozása vagy frissítése (kötegelve). Automatikusan frissíti a rendezési sorrendet |
| DELETE | `/:id` | JWT | Content.Edit | Szakasz törlése (automatikusan frissíti a rendezési sorrendet) |

## Elemek

Alap útvonal: `/content/elements`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Elem lekérése azonosító alapján |
| POST | `/duplicate/:id` | JWT | Content.Edit | Elem duplikálása az összes gyermekelemével |
| POST | `/` | JWT | Content.Edit | Elemek létrehozása vagy frissítése (kötegelve). Automatikusan kezeli a sorok oszlopait és a körhinta diákat |
| DELETE | `/:id` | JWT | Content.Edit | Elem törlése |

## Blokkok

Alap útvonal: `/content/blocks`

A standard CRUD-ot bővíti (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` az alaposztályból, Content.Edit jogosultsággal az íráshoz).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Blokk lekérése azonosító alapján |
| GET | `/` | JWT | — | Az összes blokk listázása |
| GET | `/:churchId/tree/:id` | Nyilvános | — | Teljes blokkfa betöltése szakaszokkal és elemekkel |
| GET | `/blockType/:blockType` | JWT | — | Blokkok betöltése típus szerint (pl. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Nyilvános | — | Gyülekezet lábléc-blokkfájának betöltése |
| POST | `/` | JWT | Content.Edit | Blokkok létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Content.Edit | Blokk törlése |

## Hivatkozások

Alap útvonal: `/content/links`

A standard CRUD-ot bővíti (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` az alaposztályból, Content.Edit jogosultsággal az íráshoz).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hivatkozás lekérése azonosító alapján |
| GET | `/` | JWT | — | Az összes hivatkozás listázása. Opcionális `?category=` szűrő. Mentés után automatikusan rendez |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Hivatkozások betöltése láthatóság szerint szűrve (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Nyilvános | — | Egy gyülekezet hivatkozásainak betöltése kategória szerint (nyilvános) |
| POST | `/` | JWT | Content.Edit | Hivatkozások létrehozása vagy frissítése (kötegelve). Automatikusan kategória szerint rendez |
| DELETE | `/:id` | JWT | Content.Edit | Hivatkozás törlése |

## Globális stílusok

Alap útvonal: `/content/globalStyles`

A standard CRUD-ot bővíti (POST `/`, DELETE `/:id` az alaposztályból, Content.Edit jogosultsággal az íráshoz).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/church/:churchId` | Nyilvános | — | Egy gyülekezet globális stílusainak betöltése (ha nincs beállítva, az alapértelmezetteket adja vissza) |
| GET | `/` | JWT | — | A hitelesített gyülekezet globális stílusainak betöltése |
| POST | `/` | JWT | Content.Edit | Globális stílusok létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Content.Edit | Globális stílusok törlése |

## Oldalelőzmények

Alap útvonal: `/content/pageHistory`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/page/:pageId` | JWT | Content.Edit | Egy oldal előzménybejegyzéseinek listázása |
| GET | `/block/:blockId` | JWT | Content.Edit | Egy blokk előzménybejegyzéseinek listázása |
| GET | `/:id` | JWT | Content.Edit | Előzménybejegyzés lekérése azonosító alapján |
| POST | `/` | JWT | Content.Edit | Oldal- vagy blokkpillanatkép mentése. Időnként törli a 30 napnál régebbi bejegyzéseket |
| POST | `/restore/:id` | JWT | Content.Edit | Oldal vagy blokk visszaállítása egy előzmény-pillanatképből (törli az aktuális tartalmat, és újra létrehozza a pillanatkép alapján) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Visszaállítás beágyazott pillanatkép-objektumból. Törzs: `{ pageId, blockId, snapshot }` |

## Bejegyzések (blog)

Alap útvonal: `/content/posts`

A blogbejegyzések önálló sorok: `title`, `slug` (templomonként egyedi), `excerpt`, `content` (markdown törzs), `authorId`, `photoUrl`, `publishDate`, `category` és `tags`. Egy bejegyzés akkor válik közzétetté, amikor a `publishDate` be van állítva és a múltban van. Az olvasó végpontok minden bejegyzést kiegészítenek az `authorId` alapján feloldott `authorName` mezővel. Lásd: [Weboldalépítő architektúra](../../architecture/website-builder#blog).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Nyilvános | — | Közzétett bejegyzések listázása, lapozva (oldalanként legfeljebb 50) |
| GET | `/public/:churchId/categories` | Nyilvános | — | A közzétett bejegyzések egyedi kategóriái |
| GET | `/public/:churchId/slug/:slug` | Nyilvános | — | Közzétett bejegyzés lekérése slug alapján |
| GET | `/rss/:churchId?siteUrl=` | Nyilvános | — | A közzétett bejegyzések RSS 2.0 hírcsatornája (a linkek `{siteUrl}/blog/{slug}` formában épülnek) |
| GET | `/:id` | JWT | — | Bejegyzés lekérése azonosító alapján |
| GET | `/` | JWT | — | A gyülekezet összes bejegyzésének listázása |
| POST | `/` | JWT | Content.Edit | Bejegyzések létrehozása vagy frissítése (kötegelve) |
| DELETE | `/:id` | JWT | Content.Edit | Bejegyzés törlése |

## Átirányítások

Alap útvonal: `/content/redirects`

Gyülekezetenkénti URL-átirányítások (`fromPath` → `toPath`), gyülekezetenként legfeljebb 200. Az útvonalak normalizálva vannak (kisbetűs, vezető perjellel, záró perjel nélkül), és a `fromPath` gyülekezetenként egyedi. A B1App ezeket a várható 404-es válaszoknál oldja fel, és HTTP 308-at ad vissza.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/public/:churchId?path=` | Nyilvános | — | Útvonal feloldása (ha a `path` nincs megadva, az összes átirányítást listázza) |
| GET | `/:id` | JWT | — | Átirányítás lekérése azonosító alapján |
| GET | `/` | JWT | — | A gyülekezet összes átirányításának listázása |
| POST | `/` | JWT | Content.Edit | Átirányítások létrehozása vagy frissítése. Elutasítja a `fromPath = toPath` esetet, és érvényesíti a 200 soros korlátot |
| DELETE | `/:id` | JWT | Content.Edit | Átirányítás törlése |

## Prédikációk

Alap útvonal: `/content/sermons`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/public/freeshowSample` | JWT | — | Minta FreeShow lejátszási lista szerkezetének lekérése |
| GET | `/public/tvWrapper/:churchId` | JWT | — | TV-alkalmazás burkolójának lekérése prédikáció, lecke és FreeShow forrásokkal |
| GET | `/public/tvFeed/:churchId/:sermonId` | Nyilvános | — | Egyetlen prédikáció lekérése TV-hírcsatorna lejátszási listaként |
| GET | `/public/tvFeed/:churchId` | Nyilvános | — | Az összes nyilvános lejátszási lista/prédikáció lekérése TV-hírcsatornaként |
| GET | `/public/:churchId` | Nyilvános | — | Egy gyülekezet összes nyilvános prédikációjának listázása |
| GET | `/timeline?sermonIds=` | JWT | — | Prédikációk idővonal-adatainak betöltése |
| GET | `/lookup?videoType=&videoData=` | Nyilvános | — | Prédikáció metaadatainak lekérése YouTube-ról vagy Vimeóról |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | MI által generált közösségimédia-bejegyzés-javaslatok készítése a prédikáció feliratai alapján |
| GET | `/outline?url=&title=&author=` | JWT | — | MI által generált leckevázlat készítése URL alapján |
| GET | `/youtubeImport/:channelId` | JWT | — | Videók importálása egy YouTube-csatornáról. A YouTube keresési API-jának címekben és leírásokban szereplő HTML-entitások (például `&amp;` és `&#39;`) dekódolásra kerülnek |
| GET | `/vimeoImport/:channelId` | JWT | — | Videók importálása egy Vimeo-csatornáról |
| GET | `/:id` | JWT | — | Prédikáció lekérése azonosító alapján |
| GET | `/` | JWT | — | Az összes prédikáció listázása |
| POST | `/` | JWT | StreamingServices.Edit | Prédikációk létrehozása vagy frissítése. Elfogad egy tömböt vagy egyetlen prédikáció-objektumot (mindig tömböt ad vissza); üres törzs esetén 400-as választ ad. Támogatja a base64 bélyegkép-feltöltést |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Prédikáció törlése |

### Példa: YouTube-prédikáció keresése

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

## Lejátszási listák

Alap útvonal: `/content/playlists`

A standard CRUD-ot bővíti (GET `/:id`, GET `/`, DELETE `/:id` az alaposztályból, StreamingServices.Edit jogosultsággal az íráshoz).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Lejátszási lista lekérése azonosító alapján |
| GET | `/` | JWT | — | Az összes lejátszási lista listázása |
| GET | `/public/:churchId` | Nyilvános | — | Egy gyülekezet összes nyilvános lejátszási listájának listázása |
| POST | `/` | JWT | StreamingServices.Edit | Lejátszási listák létrehozása vagy frissítése (kötegelve, támogatja a base64 bélyegkép-feltöltést) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Lejátszási lista törlése |

## Streaming szolgáltatások

Alap útvonal: `/content/streamingServices`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Egy szolgáltatás titkosított házigazda-chatszobájának azonosítójának lekérése |
| GET | `/` | JWT | — | Az összes streaming szolgáltatás listázása. Automatikusan törli a lejárt, nem ismétlődő szolgáltatásokat, és továbbviszi az ismétlődőket |
| POST | `/` | JWT | StreamingServices.Edit | Streaming szolgáltatások létrehozása vagy frissítése (kötegelve) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Streaming szolgáltatás törlése (a letiltott IP-címeket is törli) |

## Események

Alap útvonal: `/content/events`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Egy csoport idővonal-eseményeinek betöltése (tartalmazza a kivétel-dátumokat, így a törölt előfordulások kihagyhatók) |
| GET | `/timeline?eventIds=` | JWT | — | Az aktuális felhasználó csoportjainak idővonal-eseményeinek betöltése (tartalmazza a kivétel-dátumokat) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Nyilvános | — | Feliratkozás az eseményekre ICS naptárfeedként |
| GET | `/group/:groupId` | JWT | — | Egy csoport eseményeinek lekérése (tartalmazza a kivétel-dátumokat) |
| GET | `/public/group/:churchId/:groupId` | Nyilvános | — | Egy csoport nyilvános eseményeinek lekérése |
| GET | `/public/:churchId/:id` | Nyilvános | — | Egy esemény lekérése a nyilvános oldalához, a `roomNames` mezővel (az el nem utasított foglalásokból származó termek). Függőben lévő vagy elutasított eseményeknél, valamint a regisztrációt nem fogadó magán eseményeknél `null` értéket ad vissza |
| GET | `/public/:churchId/:id/ical` | Nyilvános | — | Az adott esemény letöltése `.ics` fájlként (`text/calendar`, a kivétel-dátumok alkalmazva). `404`, ha az eseményt ugyanezek a szabályok rejtik el |
| GET | `/:id` | JWT | — | Esemény lekérése azonosító alapján |
| POST | `/` | JWT | — | Események létrehozása vagy frissítése (kötegelve) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin vagy csoportvezető | Esemény és a hozzá tartozó foglalások törlése. Az esemény csoportjának vezetői törölhetik, a kérelmező pedig visszavonhatja a saját függőben lévő kérelmét |

Az eseményrekordok tartalmazzák a `photoUrl` mezőt (a 16:9-es eseményfotó, amely a nyilvános eseményoldalon és a közelgő események kártyáin jelenik meg), a `tags` mezőt (vesszővel elválasztva, a weboldal Naptár elemének címkeszűrője használja), valamint a `notesViewRole` / `notesPostRole` mezőket (`null` esetén `staff`, de lehet `leaders` vagy `members` is), amelyek az esemény `eventNote` beszélgetéséhez való hozzáférést szabályozzák — lásd [Csoport- és eseményjegyzetek hozzáférés-vezérlése](./messaging.md#group-and-event-notes-access-control). A nyilvános válogatott esemény-válaszok is tartalmazzák az egyes események `photoUrl` és `tags` mezőit.

## Eseménykivételek

Alap útvonal: `/content/eventExceptions`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Eseménykivétel lekérése azonosító alapján |
| POST | `/` | JWT | Content.Edit, Calendars.Admin vagy csoportvezető | Eseménykivételek létrehozása vagy frissítése (kötegelve). A vezetők csak az általuk vezetett csoportok eseményeihez adhatnak kivételt |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin vagy csoportvezető | Eseménykivétel törlése |

## Válogatott naptárak

Alap útvonal: `/content/curatedCalendars`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Válogatott naptár lekérése azonosító alapján |
| GET | `/` | JWT | — | Az összes válogatott naptár listázása |
| POST | `/` | JWT | Content.Edit | Válogatott naptárak létrehozása vagy frissítése (kötegelve) |
| DELETE | `/:id` | JWT | Content.Edit | Válogatott naptár törlése |

## Válogatott események

Alap útvonal: `/content/curatedEvents`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Egy naptár válogatott eseményeinek lekérése (tartalmazza az eseményadatokat és a kivétel-dátumokat, ha a `?withoutEvents` nincs megadva) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Nyilvános | — | Egy naptár nyilvános válogatott eseményeinek lekérése |
| GET | `/:id` | JWT | — | Válogatott esemény lekérése azonosító alapján |
| GET | `/` | JWT | — | Az összes válogatott esemény listázása |
| POST | `/` | JWT | Content.Edit | Válogatott események létrehozása vagy frissítése. Az `eventIds` tömb megadásával konkrét csoporteseményeket adhatunk hozzá |
| DELETE | `/:id` | JWT | Content.Edit | Válogatott esemény törlése |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Egy adott esemény eltávolítása egy válogatott naptárból |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Egy csoport összes eseményének eltávolítása egy válogatott naptárból |

## Fájlok

Alap útvonal: `/content/files`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:contentType/:contentId` | JWT | — | Fájlok lekérése tartalomtípus és tartalomazonosító szerint |
| GET | `/` | JWT | — | A gyülekezeti weboldal összes fájljának listázása |
| GET | `/:id` | JWT | — | Fájl lekérése azonosító alapján |
| POST | `/` | JWT | Content.Edit* | Fájlok feltöltése (base64). *Engedélyezett akkor is, ha a felhasználó tagja a `contentId`-nak megfelelő csoportnak |
| POST | `/postUrl` | JWT | Content.Edit* | Előre aláírt S3 feltöltési URL lekérése. *Csoporttagok számára is engedélyezett. Tartalomelemenként legfeljebb 100 MB |
| DELETE | `/:id` | JWT | Content.Edit* | Fájl törlése, és eltávolítása a tárolóból. *Csoporttagok számára is engedélyezett |

## Galéria

Alap útvonal: `/content/gallery`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/stock/:folder` | Nyilvános | — | Stock fotók listázása egy mappában |
| GET | `/:folder` | JWT | Content.Edit | Galéria-képek listázása egy mappában |
| POST | `/requestUpload` | JWT | Content.Edit | Előre aláírt S3 feltöltési URL lekérése galéria-képhez |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Galéria-kép törlése |

## Bibliák

Alap útvonal: `/content/bibles`

Az összes bibliai végpont nyilvános (nincs szükség hitelesítésre). Az adatok külső forrásokból érkeznek, és helyben gyorsítótárazódnak. Az api.bible felé irányuló kérések 15 másodperc után időtúllépést kapnak; az időtúllépés **504**-es választ ad.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/` | Nyilvános | — | Az összes bibliafordítás listázása (ha a gyorsítótár üres, a forrásból tölti le) |
| GET | `/stats?startDate=&endDate=` | Nyilvános | — | Bibliai keresési statisztikák lekérése egy dátumtartományra |
| GET | `/availableTranslations/:source` | Nyilvános | — | Egy forrás elérhető fordításainak listázása (pl. api.bible) |
| GET | `/updateTranslations` | Nyilvános | — | Az összes fordítás szinkronizálása az összes forrásból |
| GET | `/updateTranslations/:source` | Nyilvános | — | Fordítások szinkronizálása egy adott forrásból |
| GET | `/updateCopyrights` | Nyilvános | — | A hiányzó szerzői jogi adatok frissítése a fordításoknál |
| GET | `/:translationKey/updateCopyright` | Nyilvános | — | Egy adott fordítás szerzői jogi adatainak frissítése |
| GET | `/:translationKey/search?query=&limit=` | Nyilvános | — | Versek keresése egy fordításban |
| GET | `/:translationKey/books` | Nyilvános | — | Egy fordítás könyveinek lekérése (helyben gyorsítótáraz) |
| GET | `/:translationKey/:bookKey/chapters` | Nyilvános | — | Egy könyv fejezeteinek lekérése (helyben gyorsítótáraz) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Nyilvános | — | Egy fejezet verseinek lekérése (helyben gyorsítótáraz) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Nyilvános | — | Versszöveg lekérése egy tartományra. Naplózza a kereséseket. Egyes fordítások licencelési okokból megkerülik a gyorsítótárazást |

### Példa: versszöveg lekérése

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

## Dalok

Alap útvonal: `/content/songs`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/search?q=` | JWT | — | Dalok keresése lekérdezés alapján |
| GET | `/:id` | JWT | — | Dal lekérése azonosító alapján |
| GET | `/` | JWT | Content.Edit | Az összes dal listázása |
| POST | `/` | JWT | Content.Edit | Dalok létrehozása vagy frissítése (kötegelve) |
| POST | `/import` | JWT | — | Dalok importálása a FreeShow-ból (kötegelve) |
| DELETE | `/:id` | JWT | Content.Edit | Dal törlése |

## Dalrészletek

Alap útvonal: `/content/songDetails`

A dalrészletek globálisak (nem gyülekezethez kötöttek). Ezek a gyülekezetek között megosztott, egységes dalmetaadatokat képviselik.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Dalrészlet lekérése azonosító alapján (globális) |
| GET | `/` | JWT | — | A gyülekezet dalrészleteinek listázása |
| POST | `/create` | JWT | — | Dalrészlet létrehozása a PraiseCharts-azonosító alapján (ha már létezik, a meglévőt adja vissza). Automatikusan lekéri a metaadatokat a PraiseCharts-ról és a MusicBrainz-ről |
| POST | `/` | JWT | — | Dalrészletek létrehozása vagy frissítése (kötegelve) |

## Dalrészlet-hivatkozások

Alap útvonal: `/content/songDetailLinks`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Dalrészlet-hivatkozás lekérése azonosító alapján |
| GET | `/songDetail/:songDetailId` | JWT | — | Egy dalrészlet összes hivatkozásának lekérése |
| POST | `/` | JWT | — | Dalrészlet-hivatkozások létrehozása vagy frissítése (kötegelve). Összekapcsolás esetén automatikusan lekéri a MusicBrainz adatokat |
| DELETE | `/:id` | JWT | — | Dalrészlet-hivatkozás törlése |

## Hangszerelések

Alap útvonal: `/content/arrangements`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Hangszerelés lekérése azonosító alapján |
| GET | `/song/:songId` | JWT | Content.Edit | Egy dal hangszereléseinek lekérése |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Egy dalrészlet hangszereléseinek lekérése |
| GET | `/` | JWT | Content.Edit | Az összes hangszerelés listázása |
| POST | `/` | JWT | Content.Edit | Hangszerelések létrehozása vagy frissítése (kötegelve) |
| POST | `/freeShow/missing` | JWT | — | Azon FreeShow-azonosítók keresése, amelyek nem léteznek a gyülekezetben. Törzs: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Hangszerelés törlése (a hozzá tartozó hangnemeket is törli; ha nem maradt hangszerelés, a dalt is törli) |

## Hangszerelés-hangnemek

Alap útvonal: `/content/arrangementKeys`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:id` | Nyilvános | — | Hangszerelés-hangnem lekérése a teljes daladatokkal, a előadói nézethez |
| GET | `/:id` | JWT | — | Hangszerelés-hangnem lekérése azonosító alapján |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Egy hangszerelés hangnemeinek lekérése |
| GET | `/` | JWT | Content.Edit | Az összes hangszerelés-hangnem listázása |
| POST | `/` | JWT | Content.Edit | Hangszerelés-hangnemek létrehozása vagy frissítése (kötegelve) |
| DELETE | `/:id` | JWT | Content.Edit | Hangszerelés-hangnem törlése |

## Beállítások

Alap útvonal: `/content/settings`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Az aktuális felhasználó beállításainak lekérése |
| GET | `/` | JWT | Settings.Edit | A gyülekezet összes beállításának lekérése |
| GET | `/public/:churchId` | Nyilvános | — | Egy gyülekezet nyilvános beállításainak lekérése (kulcs-érték párokként) |
| POST | `/my` | JWT | — | Felhasználói szintű beállítások mentése (támogatja a base64 képfeltöltést) |
| POST | `/` | JWT | Settings.Edit | Gyülekezeti szintű beállítások mentése (támogatja a base64 képfeltöltést) |
| DELETE | `/my/:id` | JWT | — | Felhasználói beállítás törlése |

## Előnézet

Alap útvonal: `/content/preview`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/data/:key` | Nyilvános | — | Egy gyülekezet streaming-előnézeti adatainak betöltése aldomain-kulcs alapján (fülek, hivatkozások, szolgáltatások, prédikációk) |

## Galéria (stock fotók)

Alap útvonal: `/content/stock`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| POST | `/search` | Nyilvános | — | Pexels stock fotók keresése. Törzs: `{ term: "church" }` |

## PraiseCharts

Alap útvonal: `/content/praiseCharts`

Integráció a PraiseCharts szolgáltatással az istentiszteleti dalok felfedezéséhez és a kottaletöltésekhez.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/raw/:id` | JWT | — | Egy dal nyers PraiseCharts-adatainak lekérése |
| GET | `/hasAccount` | JWT | — | Annak ellenőrzése, hogy a felhasználónak van-e összekapcsolt PraiseCharts-fiókja |
| GET | `/search?q=` | JWT | — | Keresés a PraiseCharts katalógusában |
| GET | `/products/:id?keys=` | JWT | — | Egy dal termékeinek lekérése (hitelesítettek esetén a könyvtárból, egyébként a katalógusból) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Nyers hangszerelés-adatok lekérése a könyvtárból |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Fájl letöltése a PraiseCharts-ról (PDF vagy ZIP). A `{ redirectUrl }` értéket adja vissza |
| GET | `/authUrl?returnUrl=` | Nyilvános | — | A PraiseCharts OAuth-engedélyezési URL lekérése |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Az OAuth-ellenőrző kód beváltása hozzáférési tokenre, és mentése a felhasználói beállításokba |
| GET | `/library` | JWT | — | A felhasználó PraiseCharts-könyvtárának böngészése |

## Támogatás

Alap útvonal: `/content/support`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| POST | `/createAudio` | Nyilvános | — | SSML konvertálása MP3 hanganyaggá az AWS Polly segítségével. Törzs: `{ ssml: "<speak>...</speak>" }` |

## Kapcsolódó oldalak

- [Weboldalépítő architektúra](../../architecture/website-builder) -- Hogyan illeszkednek egymáshoz az oldalak, szakaszok, elemek, bejegyzések és átirányítások az alkalmazások között
- [Tagsági végpontok](./membership) -- Személyek, gyülekezetek, csoportok, szerepkörök, jogosultságok
- [Részvételi végpontok](./attendance) -- Istentiszteletek és látogatások követése
- [Hitelesítés és jogosultságok](./authentication) -- Bejelentkezési folyamat, JWT, jogosultsági modell
- [Modulstruktúra](../module-structure) -- Kódszervezési minták
