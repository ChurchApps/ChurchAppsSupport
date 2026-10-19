---
title: "Endpoint Content"
---

# Endpoint Content

<div class="article-intro">

Il modulo Content gestisce pagine del sito web, sezioni, elementi, blocchi, post del blog, reindirizzamenti, predicazioni, playlist, servizi di streaming, eventi, calendari curati, file, gallerie, traduzioni bibliche e ricerche di versetti, canti, arrangiamenti, stili globali, foto di archivio e impostazioni. È il modulo più grande dell'API e alimenta il CMS, le funzioni multimediali e di streaming, la pianificazione del culto e le funzioni bibliche di tutte le applicazioni ChurchApps.

</div>

**Percorso base:** `/content`

## Pagine

Percorso base: `/content/pages`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:churchId/tree?url=&id=` | Pubblico | — | Carica l'intero albero della pagina (sezioni, elementi, blocchi) tramite URL o ID. Rimuove gli ID interni quando recuperato tramite URL. Le richieste basate su URL applicano `pages.visibility` — una pagina con restrizioni restituisce `{ restricted: true, visibility }` a meno che il JWT (facoltativo) non soddisfi la condizione |
| GET | `/public/:churchId` | Pubblico | — | Elenca le pagine pubbliche (`url`, `title`, `metaDescription`); solo con `visibility = everyone` |
| GET | `/:id` | JWT | — | Ottieni una pagina tramite ID |
| GET | `/` | JWT | — | Elenca tutte le pagine della chiesa |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica una pagina con tutte le sezioni e gli elementi |
| POST | `/temp/ai` | JWT | Content.Edit | Salva una pagina generata dall'IA (pagina, sezioni ed elementi in un'unica chiamata) |
| POST | `/importTree` | JWT | Content.Edit | Crea una pagina da un albero annidato (`title`, `url`, `sections[].elements[]…`). Inserisce sempre sotto la chiesa del chiamante; gli ID nel corpo vengono ignorati. Le righe devono includere i loro figli `column`. Massimo 30 sezioni / 500 elementi |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna pagine (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una pagina |

### Esempio: caricare l'albero di una pagina

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
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni una sezione tramite ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplica una sezione oppure la converte in un blocco riutilizzabile |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna sezioni (in batch). Aggiorna automaticamente l'ordinamento |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una sezione (aggiorna automaticamente l'ordinamento) |

## Elementi

Percorso base: `/content/elements`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un elemento tramite ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica un elemento con tutti i figli |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna elementi (in batch). Gestisce automaticamente le colonne delle righe e le slide del carosello |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un elemento |

## Blocchi

Percorso base: `/content/blocks`

Estende il CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con il permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un blocco tramite ID |
| GET | `/` | JWT | — | Elenca tutti i blocchi |
| GET | `/:churchId/tree/:id` | Pubblico | — | Carica l'intero albero del blocco con sezioni ed elementi |
| GET | `/blockType/:blockType` | JWT | — | Carica i blocchi per tipo (ad es. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Pubblico | — | Carica l'albero del blocco footer di una chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna blocchi |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un blocco |

## Link

Percorso base: `/content/links`

Estende il CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con il permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un link tramite ID |
| GET | `/` | JWT | — | Elenca tutti i link. Filtro facoltativo `?category=`. Si ordina automaticamente dopo il salvataggio |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carica i link filtrati per visibilità (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Pubblico | — | Carica i link di una chiesa per categoria (pubblico) |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna link (in batch). Si ordina automaticamente per categoria |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un link |

## Stili globali

Percorso base: `/content/globalStyles`

Estende il CRUD standard (POST `/`, DELETE `/:id` dalla classe base con il permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/church/:churchId` | Pubblico | — | Carica gli stili globali di una chiesa (restituisce i valori predefiniti se non ne sono impostati) |
| GET | `/` | JWT | — | Carica gli stili globali della chiesa autenticata |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna gli stili globali |
| DELETE | `/:id` | JWT | Content.Edit | Elimina gli stili globali |

## Cronologia delle pagine

Percorso base: `/content/pageHistory`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Elenca le voci della cronologia di una pagina |
| GET | `/block/:blockId` | JWT | Content.Edit | Elenca le voci della cronologia di un blocco |
| GET | `/:id` | JWT | Content.Edit | Ottieni una voce della cronologia tramite ID |
| POST | `/` | JWT | Content.Edit | Salva un'istantanea di pagina/blocco. Periodicamente elimina le voci più vecchie di 30 giorni |
| POST | `/restore/:id` | JWT | Content.Edit | Ripristina una pagina/blocco da un'istantanea della cronologia (elimina il contenuto attuale e lo ricrea dall'istantanea) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ripristina da un oggetto istantanea incluso nel corpo. Corpo: `{ pageId, blockId, snapshot }` |

## Post (Blog)

Percorso base: `/content/posts`

I post del blog sono righe autonome: `title`, `slug` (unico per chiesa), `excerpt`, `content` (corpo in markdown), `authorId`, `photoUrl`, `publishDate`, `category` e `tags`. Un post è pubblicato una volta impostato `publishDate` e con una data passata. Gli endpoint di lettura arricchiscono ogni post con `authorName` ricavato da `authorId`. Vedi [Architettura del costruttore di siti web](../../architecture/website-builder#blog).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Pubblico | — | Elenca i post pubblicati, con paginazione (massimo 50 per pagina) |
| GET | `/public/:churchId/categories` | Pubblico | — | Categorie distinte tra i post pubblicati |
| GET | `/public/:churchId/slug/:slug` | Pubblico | — | Ottieni un post pubblicato tramite slug |
| GET | `/rss/:churchId?siteUrl=` | Pubblico | — | Feed RSS 2.0 dei post pubblicati (i link sono costruiti come `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Ottieni un post tramite ID |
| GET | `/` | JWT | — | Elenca tutti i post della chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna post (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un post |

## Reindirizzamenti

Percorso base: `/content/redirects`

Reindirizzamenti di URL per chiesa (`fromPath` → `toPath`), limitati a 200 per chiesa. I percorsi sono normalizzati (in minuscolo, con barra iniziale, senza barra finale) e `fromPath` è unico per chiesa. B1App li risolve quando si verificherebbe un 404 ed emette un HTTP 308.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/public/:churchId?path=` | Pubblico | — | Risolvi un percorso (oppure elenca tutti i reindirizzamenti se `path` è omesso) |
| GET | `/:id` | JWT | — | Ottieni un reindirizzamento tramite ID |
| GET | `/` | JWT | — | Elenca tutti i reindirizzamenti della chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna reindirizzamenti. Rifiuta `fromPath = toPath` e applica il limite di 200 righe |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un reindirizzamento |

## Predicazioni

Percorso base: `/content/sermons`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Ottieni una struttura di esempio di playlist FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Ottieni il wrapper dell'app TV con le sorgenti predicazione, lezione e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Pubblico | — | Ottieni una singola predicazione come playlist di feed TV |
| GET | `/public/tvFeed/:churchId` | Pubblico | — | Ottieni tutte le playlist/predicazioni pubbliche come feed TV |
| GET | `/public/:churchId` | Pubblico | — | Elenca tutte le predicazioni pubbliche di una chiesa |
| GET | `/timeline?sermonIds=` | JWT | — | Carica i dati della timeline per le predicazioni |
| GET | `/lookup?videoType=&videoData=` | Pubblico | — | Cerca i metadati di una predicazione da YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Genera con l'IA suggerimenti di post per i social media dai sottotitoli della predicazione |
| GET | `/outline?url=&title=&author=` | JWT | — | Genera con l'IA una scaletta della lezione da un URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importa video da un canale YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importa video da un canale Vimeo |
| GET | `/:id` | JWT | — | Ottieni una predicazione tramite ID |
| GET | `/` | JWT | — | Elenca tutte le predicazioni |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna predicazioni (in batch, supporta il caricamento di miniature in base64) |
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
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni una playlist tramite ID |
| GET | `/` | JWT | — | Elenca tutte le playlist |
| GET | `/public/:churchId` | Pubblico | — | Elenca tutte le playlist pubbliche di una chiesa |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna playlist (in batch, supporta il caricamento di miniature in base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina una playlist |

## Servizi di streaming

Percorso base: `/content/streamingServices`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Ottieni l'ID criptato della stanza chat dell'host per un servizio |
| GET | `/` | JWT | — | Elenca tutti i servizi di streaming. Pulisce automaticamente i servizi scaduti non ricorrenti e avanza quelli ricorrenti |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna servizi di streaming (in batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un servizio di streaming (cancella anche gli IP bloccati) |

## Eventi

Percorso base: `/content/events`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carica gli eventi della timeline per un gruppo |
| GET | `/timeline?eventIds=` | JWT | — | Carica gli eventi della timeline per i gruppi dell'utente corrente |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Pubblico | — | Iscriviti agli eventi come feed di calendario ICS |
| GET | `/group/:groupId` | JWT | — | Ottieni gli eventi di un gruppo (include le date di eccezione) |
| GET | `/public/group/:churchId/:groupId` | Pubblico | — | Ottieni gli eventi pubblici di un gruppo |
| GET | `/public/:churchId/:id` | Pubblico | — | Ottieni un evento per la sua pagina pubblica, con `roomNames` (sale dalle prenotazioni non rifiutate). Restituisce `null` per eventi in attesa o rifiutati e per eventi privati che non accettano iscrizioni |
| GET | `/public/:churchId/:id/ical` | Pubblico | — | Scarica quel singolo evento come file `.ics` (`text/calendar`, con le date di eccezione applicate). `404` quando l'evento è nascosto dalle stesse regole |
| GET | `/:id` | JWT | — | Ottieni un evento tramite ID |
| POST | `/` | JWT | — | Crea o aggiorna eventi (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento |

I record degli eventi includono `photoUrl` (la foto dell'evento in formato 16:9 mostrata nella pagina pubblica dell'evento e nelle card dei prossimi eventi), `tags` (separati da virgola, usati dal filtro per tag dell'elemento Calendario del sito web) e `notesViewRole` / `notesPostRole` (`staff` quando `null`, `leaders` o `members`), che regolano la conversazione `eventNote` dell'evento -- vedi [Controllo di accesso alle note di gruppo ed evento](./messaging.md#group-and-event-notes-access-control). Le risposte degli eventi curati pubblici includono anche `photoUrl` e `tags` di ciascun evento.

## Eccezioni degli eventi

Percorso base: `/content/eventExceptions`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un'eccezione di evento tramite ID |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eccezioni di evento (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un'eccezione di evento |

## Calendari curati

Percorso base: `/content/curatedCalendars`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un calendario curato tramite ID |
| GET | `/` | JWT | — | Elenca tutti i calendari curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna calendari curati (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un calendario curato |

## Eventi curati

Percorso base: `/content/curatedEvents`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Ottieni gli eventi curati di un calendario (include i dettagli degli eventi e le date di eccezione, a meno che non sia impostato `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Pubblico | — | Ottieni gli eventi curati pubblici di un calendario |
| GET | `/:id` | JWT | — | Ottieni un evento curato tramite ID |
| GET | `/` | JWT | — | Elenca tutti gli eventi curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eventi curati. Supporta l'array `eventIds` per aggiungere specifici eventi di gruppo |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento curato |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Rimuovi un evento specifico da un calendario curato |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Rimuovi tutti gli eventi di un gruppo da un calendario curato |

## File

Percorso base: `/content/files`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Ottieni i file per tipo di contenuto e ID del contenuto |
| GET | `/` | JWT | — | Elenca tutti i file del sito web della chiesa |
| GET | `/:id` | JWT | — | Ottieni un file tramite ID |
| POST | `/` | JWT | Content.Edit* | Carica file (in base64). *Consentito anche se l'utente è membro del gruppo corrispondente a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Ottieni un URL di caricamento S3 pre-firmato. *Consentito anche ai membri del gruppo. Massimo 100MB per elemento di contenuto |
| DELETE | `/:id` | JWT | Content.Edit* | Elimina un file e rimuovilo dall'archiviazione. *Consentito anche ai membri del gruppo |

## Galleria

Percorso base: `/content/gallery`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/stock/:folder` | Pubblico | — | Elenca le foto di archivio in una cartella |
| GET | `/:folder` | JWT | Content.Edit | Elenca le immagini della galleria in una cartella |
| POST | `/requestUpload` | JWT | Content.Edit | Ottieni un URL di caricamento S3 pre-firmato per un'immagine della galleria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Elimina un'immagine della galleria |

## Bibbie

Percorso base: `/content/bibles`

Tutti gli endpoint biblici sono pubblici (non richiedono autenticazione). I dati vengono recuperati da fonti esterne e memorizzati in cache localmente.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | Pubblico | — | Elenca tutte le traduzioni bibliche (le recupera dalla fonte se la cache è vuota) |
| GET | `/stats?startDate=&endDate=` | Pubblico | — | Ottieni le statistiche di ricerca biblica per un intervallo di date |
| GET | `/availableTranslations/:source` | Pubblico | — | Elenca le traduzioni disponibili da una fonte (ad es. api.bible) |
| GET | `/updateTranslations` | Pubblico | — | Sincronizza tutte le traduzioni da tutte le fonti |
| GET | `/updateTranslations/:source` | Pubblico | — | Sincronizza le traduzioni da una fonte specifica |
| GET | `/updateCopyrights` | Pubblico | — | Aggiorna le informazioni sul copyright per le traduzioni che ne sono prive |
| GET | `/:translationKey/updateCopyright` | Pubblico | — | Aggiorna il copyright di una traduzione specifica |
| GET | `/:translationKey/search?query=&limit=` | Pubblico | — | Cerca versetti in una traduzione |
| GET | `/:translationKey/books` | Pubblico | — | Ottieni i libri di una traduzione (memorizza in cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Pubblico | — | Ottieni i capitoli di un libro (memorizza in cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Pubblico | — | Ottieni i versetti di un capitolo (memorizza in cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Pubblico | — | Ottieni il testo di un intervallo di versetti. Registra le ricerche. Alcune traduzioni bypassano la cache per motivi di licenza |

### Esempio: ottenere il testo di un versetto

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
|--------|----------|----------------|----------|-------------|
| GET | `/search?q=` | JWT | — | Cerca canti tramite una query |
| GET | `/:id` | JWT | — | Ottieni un canto tramite ID |
| GET | `/` | JWT | Content.Edit | Elenca tutti i canti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna canti (in batch) |
| POST | `/import` | JWT | — | Importa canti da FreeShow (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un canto |

## Dettagli dei canti

Percorso base: `/content/songDetails`

I dettagli dei canti sono globali (non limitati alla chiesa). Rappresentano i metadati canonici dei canti condivisi tra le chiese.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un dettaglio di canto tramite ID (globale) |
| GET | `/` | JWT | — | Elenca i dettagli dei canti per la chiesa |
| POST | `/create` | JWT | — | Crea un dettaglio di canto a partire da un ID PraiseCharts (restituisce quello esistente se già creato). Recupera automaticamente i metadati da PraiseCharts e MusicBrainz |
| POST | `/` | JWT | — | Crea o aggiorna i dettagli dei canti (in batch) |

## Collegamenti dei dettagli dei canti

Percorso base: `/content/songDetailLinks`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un collegamento di dettaglio canto tramite ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Ottieni tutti i collegamenti di un dettaglio di canto |
| POST | `/` | JWT | — | Crea o aggiorna collegamenti di dettagli dei canti (in batch). Recupera automaticamente i dati da MusicBrainz se collegati |
| DELETE | `/:id` | JWT | — | Elimina un collegamento di dettaglio canto |

## Arrangiamenti

Percorso base: `/content/arrangements`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un arrangiamento tramite ID |
| GET | `/song/:songId` | JWT | Content.Edit | Ottieni gli arrangiamenti di un canto |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Ottieni gli arrangiamenti di un dettaglio di canto |
| GET | `/` | JWT | Content.Edit | Elenca tutti gli arrangiamenti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna arrangiamenti (in batch) |
| POST | `/freeShow/missing` | JWT | — | Trova gli ID FreeShow che non esistono nella chiesa. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un arrangiamento (elimina anche le tonalità; elimina il canto se non restano arrangiamenti) |

## Tonalità degli arrangiamenti

Percorso base: `/content/arrangementKeys`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/presenter/:churchId/:id` | Pubblico | — | Ottieni la tonalità dell'arrangiamento con i dati completi del canto per la vista presentatore |
| GET | `/:id` | JWT | — | Ottieni una tonalità di arrangiamento tramite ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Ottieni le tonalità di un arrangiamento |
| GET | `/` | JWT | Content.Edit | Elenca tutte le tonalità degli arrangiamenti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna tonalità di arrangiamento (in batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una tonalità di arrangiamento |

## Impostazioni

Percorso base: `/content/settings`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/my` | JWT | — | Ottieni le impostazioni dell'utente corrente |
| GET | `/` | JWT | Settings.Edit | Ottieni tutte le impostazioni della chiesa |
| GET | `/public/:churchId` | Pubblico | — | Ottieni le impostazioni pubbliche di una chiesa (restituite come coppie chiave-valore) |
| POST | `/my` | JWT | — | Salva le impostazioni a livello utente (supporta il caricamento di immagini in base64) |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni a livello chiesa (supporta il caricamento di immagini in base64) |
| DELETE | `/my/:id` | JWT | — | Elimina un'impostazione utente |

## Anteprima

Percorso base: `/content/preview`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/data/:key` | Pubblico | — | Carica i dati di anteprima dello streaming di una chiesa tramite la chiave del sottodominio (schede, link, servizi, predicazioni) |

## Galleria (foto di archivio)

Percorso base: `/content/stock`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/search` | Pubblico | — | Cerca foto di archivio su Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Percorso base: `/content/praiseCharts`

Integrazione con PraiseCharts per la scoperta di canti di lode e il download di spartiti.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/raw/:id` | JWT | — | Ottieni i dati grezzi di PraiseCharts per un canto |
| GET | `/hasAccount` | JWT | — | Verifica se l'utente ha un account PraiseCharts collegato |
| GET | `/search?q=` | JWT | — | Cerca nel catalogo PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Ottieni i prodotti per un canto (dalla libreria se autenticato, altrimenti dal catalogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Ottieni i dati grezzi dell'arrangiamento dalla libreria |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Scarica un file da PraiseCharts (PDF o ZIP). Restituisce `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Pubblico | — | Ottieni l'URL di autorizzazione OAuth per PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Scambia il verificatore OAuth con un token di accesso e salvalo nelle impostazioni utente |
| GET | `/library` | JWT | — | Sfoglia la libreria PraiseCharts dell'utente |

## Supporto

Percorso base: `/content/support`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/createAudio` | Pubblico | — | Converte SSML in audio MP3 usando AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Pagine correlate

- [Architettura del costruttore di siti web](../../architecture/website-builder) -- Come pagine, sezioni, elementi, post e reindirizzamenti si integrano tra le app
- [Endpoint Membership](./membership) -- Persone, chiese, gruppi, ruoli, permessi
- [Endpoint Attendance](./attendance) -- Tracciamento di servizi e visite
- [Autenticazione e permessi](./authentication) -- Flusso di accesso, JWT, modello dei permessi
- [Struttura dei moduli](../module-structure) -- Schemi di organizzazione del codice
