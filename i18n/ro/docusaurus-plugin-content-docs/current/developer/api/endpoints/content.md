---
title: "Endpoint-uri pentru conținut"
---

# Endpoint-uri pentru conținut

<div class="article-intro">

Modulul Conținut gestionează paginile site-ului web, secțiunile, elementele, blocurile, postările de blog, redirecționările, predicile, listele de redare, serviciile de streaming, evenimentele, calendarele curatoriate, fișierele, galeriile, traducerile Bibliei și căutările de versete, cântecele, aranjamentele, stilurile globale, fotografiile stock și setările. Este cel mai mare modul din API și alimentează CMS-ul, funcțiile de media și streaming, planificarea cultului și funcțiile legate de Biblie din toate aplicațiile ChurchApps.

</div>

**Cale de bază:** `/content`

## Pagini

Cale de bază: `/content/pages`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Încarcă arborele complet al paginii (secțiuni, elemente, blocuri) după URL sau ID. Elimină ID-urile interne atunci când pagina este preluată după URL. Preluările după URL aplică `pages.visibility`: o pagină restricționată returnează `{ restricted: true, visibility }`, cu excepția cazului în care JWT-ul (opțional) îndeplinește condiția de acces |
| GET | `/public/:churchId` | Public | — | Listează paginile publice (`url`, `title`, `metaDescription`); doar cele cu `visibility = everyone` |
| GET | `/:id` | JWT | — | Obține o pagină după ID |
| GET | `/` | JWT | — | Listează toate paginile bisericii |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplică o pagină împreună cu toate secțiunile și elementele |
| POST | `/temp/ai` | JWT | Content.Edit | Salvează o pagină generată de AI (pagina, secțiunile și elementele, într-un singur apel) |
| POST | `/importTree` | JWT | Content.Edit | Creează o pagină dintr-un arbore imbricat (`title`, `url`, `sections[].elements[]…`). Inserează întotdeauna sub biserica apelantului; ID-urile din corpul cererii sunt ignorate. Rândurile trebuie să includă copiii lor `column`. Maximum 30 de secțiuni / 500 de elemente |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează pagini (în lot) |
| DELETE | `/:id` | JWT | Content.Edit | Șterge o pagină |

### Exemplu: Încărcarea arborelui unei pagini

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

## Secțiuni

Cale de bază: `/content/sections`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține o secțiune după ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplică o secțiune sau o convertește într-un bloc reutilizabil |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează secțiuni (în lot). Actualizează automat ordinea de sortare |
| DELETE | `/:id` | JWT | Content.Edit | Șterge o secțiune (actualizează automat ordinea de sortare) |

## Elemente

Cale de bază: `/content/elements`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține un element după ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplică un element împreună cu toți copiii săi |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează elemente (în lot). Gestionează automat coloanele rândurilor și diapozitivele carusel |
| DELETE | `/:id` | JWT | Content.Edit | Șterge un element |

## Blocuri

Cale de bază: `/content/blocks`

Extinde CRUD-ul standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` din clasa de bază, cu permisiunea Content.Edit pentru scriere).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține un bloc după ID |
| GET | `/` | JWT | — | Listează toate blocurile |
| GET | `/:churchId/tree/:id` | Public | — | Încarcă arborele complet al blocului, cu secțiunile și elementele |
| GET | `/blockType/:blockType` | JWT | — | Încarcă blocurile după tip (de exemplu footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Încarcă arborele blocului de subsol pentru o biserică |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează blocuri |
| DELETE | `/:id` | JWT | Content.Edit | Șterge un bloc |

## Linkuri

Cale de bază: `/content/links`

Extinde CRUD-ul standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` din clasa de bază, cu permisiunea Content.Edit pentru scriere).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține un link după ID |
| GET | `/` | JWT | — | Listează toate linkurile. Filtru opțional `?category=`. Se sortează automat după salvare |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Încarcă linkurile filtrate după vizibilitate (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Încarcă linkurile unei biserici după categorie (public) |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează linkuri (în lot). Se sortează automat după categorie |
| DELETE | `/:id` | JWT | Content.Edit | Șterge un link |

## Stiluri globale

Cale de bază: `/content/globalStyles`

Extinde CRUD-ul standard (POST `/`, DELETE `/:id` din clasa de bază, cu permisiunea Content.Edit pentru scriere).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/church/:churchId` | Public | — | Încarcă stilurile globale ale unei biserici (returnează valorile implicite dacă nu sunt setate) |
| GET | `/` | JWT | — | Încarcă stilurile globale ale bisericii autentificate |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează stilurile globale |
| DELETE | `/:id` | JWT | Content.Edit | Șterge stilurile globale |

## Istoricul paginilor

Cale de bază: `/content/pageHistory`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listează intrările de istoric pentru o pagină |
| GET | `/block/:blockId` | JWT | Content.Edit | Listează intrările de istoric pentru un bloc |
| GET | `/:id` | JWT | Content.Edit | Obține o intrare de istoric după ID |
| POST | `/` | JWT | Content.Edit | Salvează un instantaneu al unei pagini/al unui bloc. Periodic, șterge intrările mai vechi de 30 de zile |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurează o pagină/un bloc dintr-un instantaneu din istoric (șterge conținutul curent și îl recreează din instantaneu) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurează dintr-un obiect de instantaneu inclus în cerere. Corp: `{ pageId, blockId, snapshot }` |

## Postări (blog)

Cale de bază: `/content/posts`

Postările de blog sunt rânduri independente: `title`, `slug` (unic pentru fiecare biserică), `excerpt`, `content` (corp în markdown), `authorId`, `photoUrl`, `publishDate`, `category` și `tags`. O postare este publicată după ce `publishDate` este setată și se află în trecut. Endpoint-urile de citire completează fiecare postare cu `authorName`, preluat din `authorId`. Consultați [Arhitectura constructorului de site-uri web](../../architecture/website-builder#blog).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Listează postările publicate, cu paginare (maximum 50 pe pagină) |
| GET | `/public/:churchId/categories` | Public | — | Categoriile distincte din postările publicate |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obține o postare publicată după slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Flux RSS 2.0 cu postările publicate (linkurile sunt construite ca `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obține o postare după ID |
| GET | `/` | JWT | — | Listează toate postările bisericii |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează postări (în lot) |
| DELETE | `/:id` | JWT | Content.Edit | Șterge o postare |

## Redirecționări

Cale de bază: `/content/redirects`

Redirecționări de URL pentru fiecare biserică (`fromPath` → `toPath`), limitate la 200 pentru fiecare biserică. Căile sunt normalizate (scrise cu litere mici, cu slash inițial, fără slash final), iar `fromPath` este unic pentru fiecare biserică. B1App rezolvă aceste redirecționări atunci când ar fi fost o eroare 404 și emite un răspuns HTTP 308.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/public/:churchId?path=` | Public | — | Rezolvă o cale (sau listează toate redirecționările dacă `path` lipsește) |
| GET | `/:id` | JWT | — | Obține o redirecționare după ID |
| GET | `/` | JWT | — | Listează toate redirecționările bisericii |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează redirecționări. Respinge `fromPath = toPath` și aplică limita de 200 de rânduri |
| DELETE | `/:id` | JWT | Content.Edit | Șterge o redirecționare |

## Predici

Cale de bază: `/content/sermons`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/public/freeshowSample` | JWT | — | Obține o structură exemplu de listă de redare FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obține wrapper-ul aplicației TV, cu sursele de predici, lecții și FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Obține o singură predică sub formă de listă de redare pentru TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Obține toate listele de redare/predicile publice sub formă de flux TV |
| GET | `/public/:churchId` | Public | — | Listează toate predicile publice ale unei biserici |
| GET | `/timeline?sermonIds=` | JWT | — | Încarcă datele de cronologie pentru predici |
| GET | `/lookup?videoType=&videoData=` | Public | — | Caută metadatele predicii pe YouTube sau Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generează sugestii de postări pentru rețelele sociale, cu AI, pe baza subtitrărilor predicii |
| GET | `/outline?url=&title=&author=` | JWT | — | Generează, cu AI, un plan de lecție pornind de la un URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importă videoclipuri dintr-un canal YouTube. Entitățile HTML pe care API-ul de căutare YouTube le includ în titluri și descrieri (cum ar fi `&amp;` și `&#39;`) sunt decodificate |
| GET | `/vimeoImport/:channelId` | JWT | — | Importă videoclipuri dintr-un canal Vimeo |
| GET | `/:id` | JWT | — | Obține o predică după ID |
| GET | `/` | JWT | — | Listează toate predicile |
| POST | `/` | JWT | StreamingServices.Edit | Creează sau actualizează predici. Acceptă un tablou sau un singur obiect de predică (returnează întotdeauna un tablou); un corp gol returnează 400. Acceptă încărcarea miniaturii în format base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Șterge o predică |

### Exemplu: Căutarea unei predici YouTube

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

## Liste de redare

Cale de bază: `/content/playlists`

Extinde CRUD-ul standard (GET `/:id`, GET `/`, DELETE `/:id` din clasa de bază, cu permisiunea StreamingServices.Edit pentru scriere).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține o listă de redare după ID |
| GET | `/` | JWT | — | Listează toate listele de redare |
| GET | `/public/:churchId` | Public | — | Listează toate listele de redare publice ale unei biserici |
| POST | `/` | JWT | StreamingServices.Edit | Creează sau actualizează liste de redare (în lot; acceptă încărcarea miniaturii în format base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Șterge o listă de redare |

## Servicii de streaming

Cale de bază: `/content/streamingServices`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obține ID-ul criptat al camerei de chat a gazdei pentru un serviciu |
| GET | `/` | JWT | — | Listează toate serviciile de streaming. Șterge automat serviciile expirate care nu sunt recurente și avansează cele recurente |
| POST | `/` | JWT | StreamingServices.Edit | Creează sau actualizează servicii de streaming (în lot) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Șterge un serviciu de streaming (golește și adresele IP blocate) |

## Evenimente

Cale de bază: `/content/events`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Încarcă evenimentele din cronologie pentru un grup (include datele de excepție, astfel încât aparițiile șterse pot fi omise) |
| GET | `/timeline?eventIds=` | JWT | — | Încarcă evenimentele din cronologie pentru grupurile utilizatorului curent (include datele de excepție) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Abonează-te la evenimente printr-un flux de calendar ICS |
| GET | `/group/:groupId` | JWT | — | Obține evenimentele unui grup (include datele de excepție) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obține evenimentele publice ale unui grup |
| GET | `/public/:churchId/:id` | Public | — | Obține un eveniment pentru pagina sa publică, cu `roomNames` (camerele din rezervările care nu sunt respinse). Returnează `null` pentru evenimentele în așteptare sau respinse și pentru evenimentele private care nu primesc înscrieri |
| GET | `/public/:churchId/:id/ical` | Public | — | Descarcă acel eveniment ca fișier `.ics` (`text/calendar`, cu datele de excepție aplicate). Returnează `404` când evenimentul este ascuns conform acelorași reguli |
| GET | `/:id` | JWT | — | Obține un eveniment după ID |
| POST | `/` | JWT | — | Creează sau actualizează evenimente (în lot) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin sau liderul grupului | Șterge un eveniment și rezervările sale. Liderii grupului evenimentului îl pot șterge, iar solicitantul își poate retrage propria cerere în așteptare |

Înregistrările de eveniment includ `photoUrl` (fotografia evenimentului în format 16:9, afișată pe pagina publică a evenimentului și în plăcile evenimentelor viitoare), `tags` (separate prin virgulă, folosite de filtrul de etichete al elementului Calendar al site-ului web) și `notesViewRole` / `notesPostRole` (`staff` când are valoarea `null`, `leaders` sau `members`), care controlează conversația `eventNote` a evenimentului. Consultați [Controlul accesului la notele grupurilor și evenimentelor](./messaging.md#group-and-event-notes-access-control). Răspunsurile publice pentru evenimentele curatoriate includ, de asemenea, `photoUrl` și `tags` pentru fiecare eveniment.

## Excepții de eveniment

Cale de bază: `/content/eventExceptions`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține o excepție de eveniment după ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin sau liderul grupului | Creează sau actualizează excepții de eveniment (în lot). Liderii pot adăuga excepții doar pentru evenimentele din grupurile pe care le conduc |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin sau liderul grupului | Șterge o excepție de eveniment |

## Calendare curatoriate

Cale de bază: `/content/curatedCalendars`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține un calendar curatoriat după ID |
| GET | `/` | JWT | — | Listează toate calendarele curatoriate |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează calendare curatoriate (în lot) |
| DELETE | `/:id` | JWT | Content.Edit | Șterge un calendar curatoriat |

## Evenimente curatoriate

Cale de bază: `/content/curatedEvents`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obține evenimentele curatoriate ale unui calendar (include detaliile evenimentelor și datele de excepție, dacă nu este setat `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Obține evenimentele curatoriate publice ale unui calendar |
| GET | `/:id` | JWT | — | Obține un eveniment curatoriat după ID |
| GET | `/` | JWT | — | Listează toate evenimentele curatoriate |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează evenimente curatoriate. Acceptă un tablou `eventIds` pentru a adăuga evenimente specifice ale grupurilor |
| DELETE | `/:id` | JWT | Content.Edit | Șterge un eveniment curatoriat |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Elimină un eveniment specific dintr-un calendar curatoriat |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Elimină din calendarul curatoriat toate evenimentele unui grup |

## Fișiere

Cale de bază: `/content/files`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:contentType/:contentId` | JWT | — | Obține fișierele după tipul de conținut și ID-ul conținutului |
| GET | `/` | JWT | — | Listează toate fișierele site-ului web al bisericii |
| GET | `/:id` | JWT | — | Obține un fișier după ID |
| POST | `/` | JWT | Content.Edit* | Încarcă fișiere (base64). *Permis și dacă utilizatorul este membru al grupului care corespunde lui `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obține un URL de încărcare S3 pre-semnat. *Permis și membrilor grupului. Maximum 100 MB pentru fiecare element de conținut |
| DELETE | `/:id` | JWT | Content.Edit* | Șterge un fișier și îl elimină din stocare. *Permis și membrilor grupului |

## Galerie

Cale de bază: `/content/gallery`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/stock/:folder` | Public | — | Listează fotografiile stock dintr-un dosar |
| GET | `/:folder` | JWT | Content.Edit | Listează imaginile din galerie dintr-un dosar |
| POST | `/requestUpload` | JWT | Content.Edit | Obține un URL de încărcare S3 pre-semnat pentru o imagine din galerie |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Șterge o imagine din galerie |

## Biblii

Cale de bază: `/content/bibles`

Toate endpoint-urile Bibliei sunt publice (nu necesită autentificare). Datele sunt preluate din surse externe și stocate local în cache. Cererile către api.bible expiră după 15 secunde; o expirare returnează **504**.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | Public | — | Listează toate traducerile Bibliei (le preia din sursă dacă cache-ul este gol) |
| GET | `/stats?startDate=&endDate=` | Public | — | Obține statisticile de căutare în Biblie pentru un interval de date |
| GET | `/availableTranslations/:source` | Public | — | Listează traducerile disponibile dintr-o sursă (de exemplu api.bible) |
| GET | `/updateTranslations` | Public | — | Sincronizează toate traducerile din toate sursele |
| GET | `/updateTranslations/:source` | Public | — | Sincronizează traducerile dintr-o anumită sursă |
| GET | `/updateCopyrights` | Public | — | Actualizează informațiile de drepturi de autor pentru traducerile care nu le au |
| GET | `/:translationKey/updateCopyright` | Public | — | Actualizează drepturile de autor pentru o anumită traducere |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Caută versete într-o traducere |
| GET | `/:translationKey/books` | Public | — | Obține cărțile unei traduceri (le stochează local în cache) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Obține capitolele unei cărți (le stochează local în cache) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Obține versetele unui capitol (le stochează local în cache) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Obține textul versetelor pentru un interval. Înregistrează căutările. Unele traduceri ocolesc cache-ul din motive de licențiere |

### Exemplu: Obținerea textului unui verset

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

## Cântece

Cale de bază: `/content/songs`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/search?q=` | JWT | — | Caută cântece după interogare |
| GET | `/:id` | JWT | — | Obține un cântec după ID |
| GET | `/` | JWT | Content.Edit | Listează toate cântecele |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează cântece (în lot) |
| POST | `/import` | JWT | — | Importă cântece din FreeShow (în lot) |
| DELETE | `/:id` | JWT | Content.Edit | Șterge un cântec |

## Detalii despre cântece

Cale de bază: `/content/songDetails`

Detaliile despre cântece sunt globale (nu sunt limitate la o biserică). Acestea reprezintă metadatele canonice ale cântecelor, comune tuturor bisericilor.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține detaliile unui cântec după ID (global) |
| GET | `/` | JWT | — | Listează detaliile cântecelor pentru biserică |
| POST | `/create` | JWT | — | Creează detaliile unui cântec pornind de la un ID PraiseCharts (returnează detaliile existente dacă au fost deja create). Preia automat metadatele din PraiseCharts și MusicBrainz |
| POST | `/` | JWT | — | Creează sau actualizează detaliile cântecelor (în lot) |

## Linkuri pentru detaliile cântecelor

Cale de bază: `/content/songDetailLinks`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține un link pentru detaliile unui cântec după ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obține toate linkurile pentru detaliile unui cântec |
| POST | `/` | JWT | — | Creează sau actualizează linkuri pentru detaliile cântecelor (în lot). Preia automat datele MusicBrainz dacă există o legătură |
| DELETE | `/:id` | JWT | — | Șterge un link pentru detaliile unui cântec |

## Aranjamente

Cale de bază: `/content/arrangements`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/:id` | JWT | — | Obține un aranjament după ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obține aranjamentele unui cântec |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obține aranjamentele pentru detaliile unui cântec |
| GET | `/` | JWT | Content.Edit | Listează toate aranjamentele |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează aranjamente (în lot) |
| POST | `/freeShow/missing` | JWT | — | Găsește ID-urile FreeShow care nu există în biserică. Corp: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Șterge un aranjament (șterge și tonalitățile; șterge cântecul dacă nu mai rămân aranjamente) |

## Tonalități de aranjament

Cale de bază: `/content/arrangementKeys`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/presenter/:churchId/:id` | Public | — | Obține tonalitatea aranjamentului, cu datele complete ale cântecului, pentru vizualizarea de prezentare |
| GET | `/:id` | JWT | — | Obține o tonalitate de aranjament după ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obține tonalitățile unui aranjament |
| GET | `/` | JWT | Content.Edit | Listează toate tonalitățile de aranjament |
| POST | `/` | JWT | Content.Edit | Creează sau actualizează tonalități de aranjament (în lot) |
| DELETE | `/:id` | JWT | Content.Edit | Șterge o tonalitate de aranjament |

## Setări

Cale de bază: `/content/settings`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/my` | JWT | — | Obține setările utilizatorului curent |
| GET | `/` | JWT | Settings.Edit | Obține toate setările bisericii |
| GET | `/public/:churchId` | Public | — | Obține setările publice ale unei biserici (returnate ca perechi cheie-valoare) |
| POST | `/my` | JWT | — | Salvează setările la nivel de utilizator (acceptă încărcarea imaginilor în format base64) |
| POST | `/` | JWT | Settings.Edit | Salvează setările la nivel de biserică (acceptă încărcarea imaginilor în format base64) |
| DELETE | `/my/:id` | JWT | — | Șterge o setare a utilizatorului |

## Previzualizare

Cale de bază: `/content/preview`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/data/:key` | Public | — | Încarcă datele de previzualizare pentru streaming ale unei biserici, după cheia subdomeniului (file, linkuri, servicii, predici) |

## Galerie (fotografii stock)

Cale de bază: `/content/stock`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| POST | `/search` | Public | — | Caută fotografii stock pe Pexels. Corp: `{ term: "church" }` |

## PraiseCharts

Cale de bază: `/content/praiseCharts`

Integrare cu PraiseCharts pentru descoperirea cântecelor de cult și descărcarea partiturilor.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/raw/:id` | JWT | — | Obține datele brute din PraiseCharts pentru un cântec |
| GET | `/hasAccount` | JWT | — | Verifică dacă utilizatorul are un cont PraiseCharts asociat |
| GET | `/search?q=` | JWT | — | Caută în catalogul PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obține produsele pentru un cântec (din bibliotecă dacă utilizatorul este autentificat, altfel din catalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obține datele brute ale aranjamentului din bibliotecă |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Descarcă un fișier din PraiseCharts (PDF sau ZIP). Returnează `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Obține URL-ul de autorizare OAuth pentru PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Schimbă verificatorul OAuth pe un token de acces și îl salvează în setările utilizatorului |
| GET | `/library` | JWT | — | Răsfoiește biblioteca PraiseCharts a utilizatorului |

## Suport

Cale de bază: `/content/support`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| POST | `/createAudio` | Public | — | Convertește SSML în audio MP3 folosind AWS Polly. Corp: `{ ssml: "<speak>...</speak>" }` |

## Pagini conexe

- [Arhitectura constructorului de site-uri web](../../architecture/website-builder) -- Cum se integrează paginile, secțiunile, elementele, postările și redirecționările în toate aplicațiile
- [Endpoint-uri pentru membri](./membership) -- Persoane, biserici, grupuri, roluri, permisiuni
- [Endpoint-uri pentru prezență](./attendance) -- Urmărirea serviciilor și a vizitelor
- [Autentificare și permisiuni](./authentication) -- Fluxul de autentificare, JWT, modelul de permisiuni
- [Structura modulelor](../module-structure) -- Modele de organizare a codului
