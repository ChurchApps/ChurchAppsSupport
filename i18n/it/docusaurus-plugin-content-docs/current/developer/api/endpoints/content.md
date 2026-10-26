---
title: "Endpoint dei contenuti"
---

# Endpoint dei contenuti

<div class="article-intro">

Il modulo Contenuti gestisce pagine del sito web, sezioni, elementi, blocchi, articoli del blog, reindirizzamenti, predicazioni, playlist, servizi di streaming, eventi, calendari curati, file, gallerie, traduzioni bibliche e ricerche di versetti, canti, arrangiamenti, stili globali, foto stock e impostazioni. È il modulo più grande dell'API e alimenta il CMS, i contenuti multimediali e di streaming, la pianificazione del culto e le funzionalità bibliche in tutte le applicazioni di ChurchApps.

</div>

**Percorso base:** `/content`

## Pagine

Percorso base: `/content/pages`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Pubblico | — | Carica l'albero completo della pagina (sezioni, elementi, blocchi) tramite URL o ID. Rimuove gli ID interni quando viene richiesta tramite URL. Le richieste basate su URL applicano `pages.visibility` — una pagina con restrizioni restituisce `{ restricted: true, visibility }` a meno che il JWT (facoltativo) soddisfi la restrizione |
| GET | `/public/:churchId` | Pubblico | — | Elenca le pagine pubbliche (`url`, `title`, `metaDescription`); solo con `visibility = everyone` |
| GET | `/:id` | JWT | — | Ottiene una pagina tramite ID |
| GET | `/` | JWT | — | Elenca tutte le pagine della chiesa |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica una pagina con tutte le sezioni e gli elementi |
| POST | `/temp/ai` | JWT | Content.Edit | Salva una pagina generata dall'IA (pagina, sezioni ed elementi in un'unica chiamata) |
| POST | `/importTree` | JWT | Content.Edit | Crea una pagina da un albero annidato (`title`, `url`, `sections[].elements[]…`). Inserisce sempre sotto la chiesa del chiamante; gli ID nel corpo vengono ignorati. Le righe devono includere i figli `column`. Massimo 30 sezioni / 500 elementi |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna pagine (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una pagina |

### Esempio: caricare l'albero della pagina

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

## Sezioni

Percorso base: `/content/sections`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene una sezione tramite ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplica una sezione o la converte in un blocco riutilizzabile |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna sezioni (in batch). Aggiorna automaticamente l'ordine di visualizzazione |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una sezione (aggiorna automaticamente l'ordine di visualizzazione) |

## Elementi

Percorso base: `/content/elements`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un elemento tramite ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica un elemento con tutti i figli |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna elementi (in batch). Gestisce automaticamente le colonne delle righe e le diapositive dei carousel |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un elemento |

## Blocchi

Percorso base: `/content/blocks`

Estende il CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con il permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un blocco tramite ID |
| GET | `/` | JWT | — | Elenca tutti i blocchi |
| GET | `/:churchId/tree/:id` | Pubblico | — | Carica l'albero completo del blocco con sezioni ed elementi |
| GET | `/blockType/:blockType` | JWT | — | Carica i blocchi per tipo (ad es. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Pubblico | — | Carica l'albero del blocco footer di una chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna blocchi |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un blocco |

## Link

Percorso base: `/content/links`

Estende il CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con il permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un link tramite ID |
| GET | `/` | JWT | — | Elenca tutti i link. Filtro facoltativo `?category=`. Ordina automaticamente dopo il salvataggio |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carica i link filtrati per visibilità (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Pubblico | — | Carica i link di una chiesa per categoria (pubblico) |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna link (in batch). Ordina automaticamente per categoria |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un link |

## Stili globali

Percorso base: `/content/globalStyles`

Estende il CRUD standard (POST `/`, DELETE `/:id` dalla classe base con il permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Pubblico | — | Carica gli stili globali di una chiesa (restituisce i valori predefiniti se non ne sono impostati) |
| GET | `/` | JWT | — | Carica gli stili globali della chiesa autenticata |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna stili globali |
| DELETE | `/:id` | JWT | Content.Edit | Elimina stili globali |

## Cronologia delle pagine

Percorso base: `/content/pageHistory`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Elenca le voci di cronologia di una pagina |
| GET | `/block/:blockId` | JWT | Content.Edit | Elenca le voci di cronologia di un blocco |
| GET | `/:id` | JWT | Content.Edit | Ottiene una voce di cronologia tramite ID |
| POST | `/` | JWT | Content.Edit | Salva uno snapshot di pagina/blocco. Periodicamente elimina le voci più vecchie di 30 giorni |
| POST | `/restore/:id` | JWT | Content.Edit | Ripristina una pagina/blocco da uno snapshot della cronologia (elimina il contenuto attuale e lo ricrea dallo snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ripristina da un oggetto snapshot incluso. Corpo: `{ pageId, blockId, snapshot }` |

## Articoli (Blog)

Percorso base: `/content/posts`

Gli articoli del blog sono righe autonome: `title`, `slug` (univoco per chiesa), `excerpt`, `content` (corpo in markdown), `authorId`, `photoUrl`, `publishDate`, `category` e `tags`. Un articolo è pubblicato una volta impostato `publishDate` con una data passata. Gli endpoint di lettura arricchiscono ogni articolo con `authorName`, ricavato da `authorId`. Vedi [Architettura del website builder](../../architecture/website-builder#blog).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Pubblico | — | Elenca gli articoli pubblicati, con paginazione (massimo 50 per pagina) |
| GET | `/public/:churchId/categories` | Pubblico | — | Categorie distinte tra gli articoli pubblicati |
| GET | `/public/:churchId/slug/:slug` | Pubblico | — | Ottiene un articolo pubblicato tramite slug |
| GET | `/rss/:churchId?siteUrl=` | Pubblico | — | Feed RSS 2.0 degli articoli pubblicati (i link sono costruiti come `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Ottiene un articolo tramite ID |
| GET | `/` | JWT | — | Elenca tutti gli articoli della chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna articoli (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un articolo |

## Reindirizzamenti

Percorso base: `/content/redirects`

Reindirizzamenti di URL per chiesa (`fromPath` → `toPath`), limitati a 200 per chiesa. I percorsi sono normalizzati (in minuscolo, con barra iniziale, senza barra finale) e `fromPath` è univoco per chiesa. B1App li risolve quando si verificherebbe un 404 e restituisce un HTTP 308.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Pubblico | — | Risolve un percorso (oppure elenca tutti i reindirizzamenti se `path` è omesso) |
| GET | `/:id` | JWT | — | Ottiene un reindirizzamento tramite ID |
| GET | `/` | JWT | — | Elenca tutti i reindirizzamenti della chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna reindirizzamenti. Rifiuta `fromPath = toPath` e applica il limite di 200 righe |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un reindirizzamento |

## Predicazioni

Percorso base: `/content/sermons`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Ottiene un esempio di struttura di playlist FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Ottiene il wrapper dell'app TV con le sorgenti predicazione, lezione e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Pubblico | — | Ottiene una singola predicazione come playlist per il feed TV |
| GET | `/public/tvFeed/:churchId` | Pubblico | — | Ottiene tutte le playlist/predicazioni pubbliche come feed TV |
| GET | `/public/:churchId` | Pubblico | — | Elenca tutte le predicazioni pubbliche di una chiesa |
| GET | `/timeline?sermonIds=` | JWT | — | Carica i dati della timeline per le predicazioni |
| GET | `/lookup?videoType=&videoData=` | Pubblico | — | Cerca i metadati della predicazione su YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Genera suggerimenti di post per i social media con IA a partire dai sottotitoli della predicazione |
| GET | `/outline?url=&title=&author=` | JWT | — | Genera uno schema di lezione con IA a partire da un URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importa video da un canale YouTube. Le entità HTML che l'API di ricerca di YouTube inserisce nei titoli e nelle descrizioni (come `&amp;` e `&#39;`) vengono decodificate |
| GET | `/vimeoImport/:channelId` | JWT | — | Importa video da un canale Vimeo |
| GET | `/:id` | JWT | — | Ottiene una predicazione tramite ID |
| GET | `/` | JWT | — | Elenca tutte le predicazioni |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna predicazioni. Accetta un array o un singolo oggetto predicazione (restituisce sempre un array); un corpo vuoto restituisce 400. Supporta il caricamento di miniature in base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina una predicazione |

### Esempio: cercare una predicazione su YouTube

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

## Playlist

Percorso base: `/content/playlists`

Estende il CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base con il permesso StreamingServices.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene una playlist tramite ID |
| GET | `/` | JWT | — | Elenca tutte le playlist |
| GET | `/public/:churchId` | Pubblico | — | Elenca tutte le playlist pubbliche di una chiesa |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna playlist (in batch, supporta il caricamento di miniature in base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina una playlist |

## Servizi di streaming

Percorso base: `/content/streamingServices`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Ottiene l'ID della stanza di chat dell'host cifrato per un servizio |
| GET | `/` | JWT | — | Elenca tutti i servizi di streaming. Elimina automaticamente i servizi scaduti non ricorrenti e fa avanzare quelli ricorrenti |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna servizi di streaming (in batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un servizio di streaming (cancella anche gli IP bloccati) |

## Eventi

Percorso base: `/content/events`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carica gli eventi della timeline per un gruppo (include le date di eccezione, così le occorrenze eliminate possono essere saltate) |
| GET | `/timeline?eventIds=` | JWT | — | Carica gli eventi della timeline per i gruppi dell'utente corrente (include le date di eccezione) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Pubblico | — | Iscriviti agli eventi come feed di calendario ICS |
| GET | `/group/:groupId` | JWT | — | Ottiene gli eventi di un gruppo (include le date di eccezione) |
| GET | `/public/group/:churchId/:groupId` | Pubblico | — | Ottiene gli eventi pubblici di un gruppo |
| GET | `/public/:churchId/:id` | Pubblico | — | Ottiene un evento per la sua pagina pubblica, con `roomNames` (sale delle prenotazioni non rifiutate). Restituisce `null` per eventi in attesa o rifiutati e per eventi privati che non accettano iscrizioni |
| GET | `/public/:churchId/:id/ical` | Pubblico | — | Scarica il singolo evento come file `.ics` (`text/calendar`, con le date di eccezione applicate). Restituisce `404` quando l'evento è nascosto secondo le stesse regole |
| GET | `/:id` | JWT | — | Ottiene un evento tramite ID |
| POST | `/` | JWT | — | Crea o aggiorna eventi (in batch) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, o leader del gruppo | Elimina un evento e le sue prenotazioni. I leader del gruppo dell'evento possono eliminarlo, e chi ha fatto la richiesta può ritirare la propria richiesta in attesa |

I record degli eventi includono `photoUrl` (la foto dell'evento 16:9 mostrata nella pagina pubblica dell'evento e nei riquadri degli eventi imminenti), `tags` (separati da virgole, usati dal filtro per tag dell'elemento Calendar del sito web) e `notesViewRole` / `notesPostRole` (`staff` quando è `null`, `leaders` oppure `members`), che regolano la conversazione `eventNote` dell'evento — vedi [Controllo di accesso alle note di gruppo ed evento](./messaging.md#group-and-event-notes-access-control). Anche le risposte degli eventi curati pubblici includono `photoUrl` e `tags` di ciascun evento.

## Eccezioni agli eventi

Percorso base: `/content/eventExceptions`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un'eccezione di evento tramite ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, o leader del gruppo | Crea o aggiorna eccezioni di eventi (in batch). I leader possono aggiungere eccezioni solo per gli eventi dei gruppi che guidano |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, o leader del gruppo | Elimina un'eccezione di evento |

## Calendari curati

Percorso base: `/content/curatedCalendars`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un calendario curato tramite ID |
| GET | `/` | JWT | — | Elenca tutti i calendari curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna calendari curati (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un calendario curato |

## Eventi curati

Percorso base: `/content/curatedEvents`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Ottiene gli eventi curati di un calendario (include i dettagli degli eventi e le date di eccezione, a meno che non sia impostato `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Pubblico | — | Ottiene gli eventi curati pubblici di un calendario |
| GET | `/:id` | JWT | — | Ottiene un evento curato tramite ID |
| GET | `/` | JWT | — | Elenca tutti gli eventi curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eventi curati. Supporta un array `eventIds` per aggiungere eventi specifici di gruppo |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento curato |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Rimuove un evento specifico da un calendario curato |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Rimuove tutti gli eventi di un gruppo da un calendario curato |

## File

Percorso base: `/content/files`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Ottiene i file per tipo di contenuto e ID del contenuto |
| GET | `/` | JWT | — | Elenca tutti i file del sito web della chiesa |
| GET | `/:id` | JWT | — | Ottiene un file tramite ID |
| POST | `/` | JWT | Content.Edit* | Carica file (base64). *Consentito anche se l'utente è membro del gruppo corrispondente a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Ottiene un URL di caricamento S3 pre-firmato. *Consentito anche ai membri del gruppo. Massimo 100MB per elemento di contenuto |
| DELETE | `/:id` | JWT | Content.Edit* | Elimina un file e lo rimuove dall'archiviazione. *Consentito anche ai membri del gruppo |

## Galleria

Percorso base: `/content/gallery`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Pubblico | — | Elenca le foto stock di una cartella |
| GET | `/:folder` | JWT | Content.Edit | Elenca le immagini della galleria in una cartella |
| POST | `/requestUpload` | JWT | Content.Edit | Ottiene un URL di caricamento S3 pre-firmato per un'immagine della galleria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Elimina un'immagine della galleria |

## Bibbie

Percorso base: `/content/bibles`

Tutti gli endpoint della Bibbia sono pubblici (non richiedono autenticazione). I dati vengono recuperati da fonti esterne e memorizzati nella cache locale. Le richieste ad api.bible scadono dopo 15 secondi; un timeout restituisce **504**.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | Pubblico | — | Elenca tutte le traduzioni della Bibbia (le recupera dalla fonte se la cache è vuota) |
| GET | `/stats?startDate=&endDate=` | Pubblico | — | Ottiene le statistiche delle ricerche bibliche per un intervallo di date |
| GET | `/availableTranslations/:source` | Pubblico | — | Elenca le traduzioni disponibili da una fonte (ad es. api.bible) |
| GET | `/updateTranslations` | Pubblico | — | Sincronizza tutte le traduzioni da tutte le fonti |
| GET | `/updateTranslations/:source` | Pubblico | — | Sincronizza le traduzioni da una fonte specifica |
| GET | `/updateCopyrights` | Pubblico | — | Aggiorna le informazioni sul copyright per le traduzioni che ne sono prive |
| GET | `/:translationKey/updateCopyright` | Pubblico | — | Aggiorna il copyright di una specifica traduzione |
| GET | `/:translationKey/search?query=&limit=` | Pubblico | — | Cerca versetti in una traduzione |
| GET | `/:translationKey/books` | Pubblico | — | Ottiene i libri di una traduzione (con cache locale) |
| GET | `/:translationKey/:bookKey/chapters` | Pubblico | — | Ottiene i capitoli di un libro (con cache locale) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Pubblico | — | Ottiene i versetti di un capitolo (con cache locale) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Pubblico | — | Ottiene il testo dei versetti di un intervallo. Registra le ricerche. Alcune traduzioni escludono la cache per motivi di licenza |

### Esempio: ottenere il testo dei versetti

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

## Canti

Percorso base: `/content/songs`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Cerca canti per query |
| GET | `/:id` | JWT | — | Ottiene un canto tramite ID |
| GET | `/` | JWT | Content.Edit | Elenca tutti i canti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna canti (in batch) |
| POST | `/import` | JWT | — | Importa canti da FreeShow (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un canto |

## Dettagli dei canti

Percorso base: `/content/songDetails`

I dettagli dei canti sono globali (non limitati alla chiesa). Rappresentano i metadati canonici dei canti condivisi tra le chiese.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene i dettagli di un canto tramite ID (globale) |
| GET | `/` | JWT | — | Elenca i dettagli dei canti della chiesa |
| POST | `/create` | JWT | — | Crea i dettagli di un canto a partire dall'ID PraiseCharts (restituisce quelli esistenti se già creati). Recupera automaticamente i metadati da PraiseCharts e MusicBrainz |
| POST | `/` | JWT | — | Crea o aggiorna i dettagli dei canti (in batch) |

## Link dei dettagli dei canti

Percorso base: `/content/songDetailLinks`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un link di dettaglio canto tramite ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Ottiene tutti i link di un dettaglio canto |
| POST | `/` | JWT | — | Crea o aggiorna link di dettagli dei canti (in batch). Recupera automaticamente i dati di MusicBrainz se collegato |
| DELETE | `/:id` | JWT | — | Elimina un link di dettaglio canto |

## Arrangiamenti

Percorso base: `/content/arrangements`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un arrangiamento tramite ID |
| GET | `/song/:songId` | JWT | Content.Edit | Ottiene gli arrangiamenti di un canto |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Ottiene gli arrangiamenti di un dettaglio canto |
| GET | `/` | JWT | Content.Edit | Elenca tutti gli arrangiamenti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna arrangiamenti (in batch) |
| POST | `/freeShow/missing` | JWT | — | Trova gli ID FreeShow che non esistono nella chiesa. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un arrangiamento (elimina anche le tonalità; elimina il canto se non restano arrangiamenti) |

## Tonalità degli arrangiamenti

Percorso base: `/content/arrangementKeys`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Pubblico | — | Ottiene la tonalità di un arrangiamento con i dati completi del canto per la vista presentatore |
| GET | `/:id` | JWT | — | Ottiene una tonalità di arrangiamento tramite ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Ottiene le tonalità di un arrangiamento |
| GET | `/` | JWT | Content.Edit | Elenca tutte le tonalità degli arrangiamenti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna tonalità di arrangiamenti (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una tonalità di arrangiamento |

## Impostazioni

Percorso base: `/content/settings`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ottiene le impostazioni dell'utente corrente |
| GET | `/` | JWT | Settings.Edit | Ottiene tutte le impostazioni della chiesa |
| GET | `/public/:churchId` | Pubblico | — | Ottiene le impostazioni pubbliche di una chiesa (restituite come coppie chiave-valore) |
| POST | `/my` | JWT | — | Salva le impostazioni a livello utente (supporta il caricamento di immagini in base64) |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni a livello chiesa (supporta il caricamento di immagini in base64) |
| DELETE | `/my/:id` | JWT | — | Elimina un'impostazione utente |

## Anteprima

Percorso base: `/content/preview`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Pubblico | — | Carica i dati di anteprima dello streaming per una chiesa tramite la chiave del sottodominio (schede, link, servizi, predicazioni) |

## Galleria (foto stock)

Percorso base: `/content/stock`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/search` | Pubblico | — | Cerca foto stock su Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Percorso base: `/content/praiseCharts`

Integrazione con PraiseCharts per la scoperta di canti di lode e il download degli spartiti.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Ottiene i dati grezzi di PraiseCharts per un canto |
| GET | `/hasAccount` | JWT | — | Verifica se l'utente ha un account PraiseCharts collegato |
| GET | `/search?q=` | JWT | — | Cerca nel catalogo PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Ottiene i prodotti di un canto (dalla libreria se autenticato, altrimenti dal catalogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Ottiene i dati grezzi dell'arrangiamento dalla libreria |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Scarica un file da PraiseCharts (PDF o ZIP). Restituisce `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Pubblico | — | Ottiene l'URL di autorizzazione OAuth per PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Scambia il verificatore OAuth con un token di accesso e lo salva nelle impostazioni utente |
| GET | `/library` | JWT | — | Sfoglia la libreria PraiseCharts dell'utente |

## Supporto

Percorso base: `/content/support`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Pubblico | — | Converte SSML in audio MP3 con AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Pagine correlate

- [Architettura del website builder](../../architecture/website-builder) -- Come pagine, sezioni, elementi, articoli e reindirizzamenti si integrano tra le applicazioni
- [Endpoint di Membership](./membership) -- Persone, chiese, gruppi, ruoli, permessi
- [Endpoint di Presenze](./attendance) -- Monitoraggio dei servizi e delle visite
- [Autenticazione e permessi](./authentication) -- Flusso di accesso, JWT, modello dei permessi
- [Struttura del modulo](../module-structure) -- Schemi di organizzazione del codice
