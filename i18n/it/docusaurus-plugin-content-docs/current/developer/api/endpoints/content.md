---
title: "Endpoint Content"
---

# Endpoint Content

<div class="article-intro">

Il modulo Content gestisce le pagine del sito web, le sezioni, gli elementi, i blocchi, gli articoli del blog, i reindirizzamenti, i sermoni, le playlist, i servizi di streaming, gli eventi, i calendari curati, i file, le gallerie, le traduzioni bibliche e le ricerche di versetti, i canti, gli arrangiamenti, gli stili globali, le foto stock e le impostazioni. È il modulo più grande dell'API e alimenta il CMS, i media/streaming, la pianificazione del culto e le funzionalità bibliche in tutte le applicazioni di ChurchApps.

</div>

**Percorso base:** `/content`

## Pages

Percorso base: `/content/pages`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Carica l'albero completo della pagina (sezioni, elementi, blocchi) per URL o ID. Rimuove gli ID interni quando recuperato per URL. I recuperi basati su URL applicano `pages.visibility` — una pagina con accesso limitato restituisce `{ restricted: true, visibility }` a meno che il JWT (opzionale) non soddisfi la condizione |
| GET | `/public/:churchId` | Public | — | Elenca le pagine pubbliche (`url`, `title`, `metaDescription`); solo `visibility = everyone` |
| GET | `/:id` | JWT | — | Ottiene una pagina per ID |
| GET | `/` | JWT | — | Elenca tutte le pagine della chiesa |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica una pagina con tutte le sezioni e gli elementi |
| POST | `/temp/ai` | JWT | Content.Edit | Salva una pagina generata dall'IA (pagina, sezioni ed elementi in un'unica chiamata) |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna pagine (batch) |
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

## Sections

Percorso base: `/content/sections`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene una sezione per ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplica una sezione o la converte in un blocco riutilizzabile |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna sezioni (batch). Aggiorna automaticamente l'ordine di ordinamento |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una sezione (aggiorna automaticamente l'ordine di ordinamento) |

## Elements

Percorso base: `/content/elements`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un elemento per ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica un elemento con tutti i figli |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna elementi (batch). Gestisce automaticamente le colonne di riga e le slide del carosello |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un elemento |

## Blocks

Percorso base: `/content/blocks`

Estende il CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un blocco per ID |
| GET | `/` | JWT | — | Elenca tutti i blocchi |
| GET | `/:churchId/tree/:id` | Public | — | Carica l'albero completo del blocco con sezioni ed elementi |
| GET | `/blockType/:blockType` | JWT | — | Carica i blocchi per tipo (ad es. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Carica l'albero del blocco footer per una chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna blocchi |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un blocco |

## Links

Percorso base: `/content/links`

Estende il CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un link per ID |
| GET | `/` | JWT | — | Elenca tutti i link. Filtro opzionale `?category=`. Ordina automaticamente dopo il salvataggio |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carica i link filtrati per visibilità (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Carica i link di una chiesa per categoria (pubblico) |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna link (batch). Ordina automaticamente per categoria |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un link |

## Global Styles

Percorso base: `/content/globalStyles`

Estende il CRUD standard (POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Carica gli stili globali di una chiesa (restituisce i valori predefiniti se non impostati) |
| GET | `/` | JWT | — | Carica gli stili globali per la chiesa autenticata |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna gli stili globali |
| DELETE | `/:id` | JWT | Content.Edit | Elimina gli stili globali |

## Page History

Percorso base: `/content/pageHistory`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Elenca le voci di cronologia per una pagina |
| GET | `/block/:blockId` | JWT | Content.Edit | Elenca le voci di cronologia per un blocco |
| GET | `/:id` | JWT | Content.Edit | Ottiene una voce di cronologia per ID |
| POST | `/` | JWT | Content.Edit | Salva uno snapshot di pagina/blocco. Ripulisce periodicamente le voci più vecchie di 30 giorni |
| POST | `/restore/:id` | JWT | Content.Edit | Ripristina una pagina/blocco da uno snapshot di cronologia (elimina il contenuto attuale e lo ricrea dallo snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ripristina da un oggetto snapshot inline. Corpo: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Percorso base: `/content/posts`

Gli articoli del blog sono righe autonome: `title`, `slug` (univoco per chiesa), `excerpt`, `content` (corpo in markdown), `authorId`, `photoUrl`, `publishDate`, `category` e `tags`. Un articolo è pubblicato una volta che `publishDate` è impostato ed è nel passato. Gli endpoint di lettura arricchiscono ogni articolo con `authorName` risolto da `authorId`. Vedi [Architettura del Website Builder](../../architecture/website-builder#blog).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Elenca gli articoli pubblicati, paginati (massimo 50 per pagina) |
| GET | `/public/:churchId/categories` | Public | — | Categorie distinte tra gli articoli pubblicati |
| GET | `/public/:churchId/slug/:slug` | Public | — | Ottiene un articolo pubblicato per slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Feed RSS 2.0 degli articoli pubblicati (link costruiti come `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Ottiene un articolo per ID |
| GET | `/` | JWT | — | Elenca tutti gli articoli della chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna articoli (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un articolo |

## Redirects

Percorso base: `/content/redirects`

Reindirizzamenti URL per chiesa (`fromPath` → `toPath`), limitati a 200 per chiesa. I percorsi sono normalizzati (minuscolo, slash iniziale, nessuno slash finale) e `fromPath` è univoco per chiesa. B1App risolve questi reindirizzamenti sui potenziali 404 ed emette un HTTP 308.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Risolve un percorso (o elenca tutti i reindirizzamenti quando `path` è omesso) |
| GET | `/:id` | JWT | — | Ottiene un reindirizzamento per ID |
| GET | `/` | JWT | — | Elenca tutti i reindirizzamenti della chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna reindirizzamenti. Rifiuta `fromPath = toPath` e applica il limite di 200 righe |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un reindirizzamento |

## Sermons

Percorso base: `/content/sermons`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Ottiene una struttura di esempio di playlist FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Ottiene il wrapper dell'app TV con sorgenti sermoni, lezioni e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Ottiene un singolo sermone come playlist per feed TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Ottiene tutte le playlist/sermoni pubblici come feed TV |
| GET | `/public/:churchId` | Public | — | Elenca tutti i sermoni pubblici di una chiesa |
| GET | `/timeline?sermonIds=` | JWT | — | Carica i dati della timeline per i sermoni |
| GET | `/lookup?videoType=&videoData=` | Public | — | Cerca i metadati del sermone da YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Genera suggerimenti IA per post sui social media dai sottotitoli del sermone |
| GET | `/outline?url=&title=&author=` | JWT | — | Genera uno schema di lezione IA da un URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importa video da un canale YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importa video da un canale Vimeo |
| GET | `/:id` | JWT | — | Ottiene un sermone per ID |
| GET | `/` | JWT | — | Elenca tutti i sermoni |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna sermoni (batch, supporta il caricamento di miniature in base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un sermone |

### Esempio: cercare un sermone su YouTube

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

## Playlists

Percorso base: `/content/playlists`

Estende il CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base con permesso StreamingServices.Edit per le scritture).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene una playlist per ID |
| GET | `/` | JWT | — | Elenca tutte le playlist |
| GET | `/public/:churchId` | Public | — | Elenca tutte le playlist pubbliche di una chiesa |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna playlist (batch, supporta il caricamento di miniature in base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina una playlist |

## Streaming Services

Percorso base: `/content/streamingServices`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Ottiene l'ID della stanza di chat host criptata per un servizio |
| GET | `/` | JWT | — | Elenca tutti i servizi di streaming. Ripulisce automaticamente i servizi non ricorrenti scaduti e fa avanzare quelli ricorrenti |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna servizi di streaming (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un servizio di streaming (rimuove anche gli IP bloccati) |

## Events

Percorso base: `/content/events`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carica gli eventi della timeline per un gruppo |
| GET | `/timeline?eventIds=` | JWT | — | Carica gli eventi della timeline per i gruppi dell'utente corrente |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Iscriviti agli eventi come feed calendario ICS |
| GET | `/group/:groupId` | JWT | — | Ottiene gli eventi per un gruppo (include le date di eccezione) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Ottiene gli eventi pubblici per un gruppo |
| GET | `/:id` | JWT | — | Ottiene un evento per ID |
| POST | `/` | JWT | — | Crea o aggiorna eventi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento |

## Event Exceptions

Percorso base: `/content/eventExceptions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un'eccezione evento per ID |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eccezioni evento (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un'eccezione evento |

## Curated Calendars

Percorso base: `/content/curatedCalendars`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un calendario curato per ID |
| GET | `/` | JWT | — | Elenca tutti i calendari curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna calendari curati (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un calendario curato |

## Curated Events

Percorso base: `/content/curatedEvents`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Ottiene gli eventi curati per un calendario (include i dettagli degli eventi e le date di eccezione a meno che non sia impostato `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Ottiene gli eventi curati pubblici per un calendario |
| GET | `/:id` | JWT | — | Ottiene un evento curato per ID |
| GET | `/` | JWT | — | Elenca tutti gli eventi curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eventi curati. Supporta un array `eventIds` per aggiungere eventi di gruppo specifici |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento curato |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Rimuove un evento specifico da un calendario curato |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Rimuove tutti gli eventi di un gruppo da un calendario curato |

## Files

Percorso base: `/content/files`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Ottiene i file per tipo di contenuto e ID contenuto |
| GET | `/` | JWT | — | Elenca tutti i file del sito web della chiesa |
| GET | `/:id` | JWT | — | Ottiene un file per ID |
| POST | `/` | JWT | Content.Edit* | Carica file (base64). *Consentito anche se l'utente è membro del gruppo corrispondente a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Ottiene un URL di caricamento S3 pre-firmato. *Consentito anche per i membri del gruppo. Massimo 100 MB per elemento di contenuto |
| DELETE | `/:id` | JWT | Content.Edit* | Elimina un file e lo rimuove dallo storage. *Consentito anche per i membri del gruppo |

## Gallery

Percorso base: `/content/gallery`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Elenca le foto stock in una cartella |
| GET | `/:folder` | JWT | Content.Edit | Elenca le immagini della galleria in una cartella |
| POST | `/requestUpload` | JWT | Content.Edit | Ottiene un URL di caricamento S3 pre-firmato per un'immagine della galleria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Elimina un'immagine della galleria |

## Bibles

Percorso base: `/content/bibles`

Tutti gli endpoint biblici sono pubblici (non richiedono autenticazione). I dati vengono recuperati da fonti esterne e memorizzati nella cache localmente.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Elenca tutte le traduzioni bibliche (recupera dalla fonte se la cache è vuota) |
| GET | `/stats?startDate=&endDate=` | Public | — | Ottiene le statistiche di ricerca biblica per un intervallo di date |
| GET | `/availableTranslations/:source` | Public | — | Elenca le traduzioni disponibili da una fonte (ad es. api.bible) |
| GET | `/updateTranslations` | Public | — | Sincronizza tutte le traduzioni da tutte le fonti |
| GET | `/updateTranslations/:source` | Public | — | Sincronizza le traduzioni da una fonte specifica |
| GET | `/updateCopyrights` | Public | — | Aggiorna le informazioni sul copyright per le traduzioni che ne sono prive |
| GET | `/:translationKey/updateCopyright` | Public | — | Aggiorna il copyright per una traduzione specifica |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Cerca versetti in una traduzione |
| GET | `/:translationKey/books` | Public | — | Ottiene i libri di una traduzione (memorizza nella cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Ottiene i capitoli di un libro (memorizza nella cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Ottiene i versetti di un capitolo (memorizza nella cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Ottiene il testo dei versetti per un intervallo. Registra le ricerche. Alcune traduzioni bypassano la cache per motivi di licenza |

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

## Songs

Percorso base: `/content/songs`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Cerca canti per query |
| GET | `/:id` | JWT | — | Ottiene un canto per ID |
| GET | `/` | JWT | Content.Edit | Elenca tutti i canti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna canti (batch) |
| POST | `/import` | JWT | — | Importa canti da FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un canto |

## Song Details

Percorso base: `/content/songDetails`

I dettagli dei canti sono globali (non ambitati per chiesa). Rappresentano metadati canonici dei canti condivisi tra le chiese.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un dettaglio canto per ID (globale) |
| GET | `/` | JWT | — | Elenca i dettagli dei canti per la chiesa |
| POST | `/create` | JWT | — | Crea un dettaglio canto da un ID PraiseCharts (restituisce quello esistente se già creato). Recupera automaticamente i metadati da PraiseCharts e MusicBrainz |
| POST | `/` | JWT | — | Crea o aggiorna dettagli dei canti (batch) |

## Song Detail Links

Percorso base: `/content/songDetailLinks`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un link di dettaglio canto per ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Ottiene tutti i link per un dettaglio canto |
| POST | `/` | JWT | — | Crea o aggiorna link di dettaglio canto (batch). Recupera automaticamente i dati MusicBrainz se collegato |
| DELETE | `/:id` | JWT | — | Elimina un link di dettaglio canto |

## Arrangements

Percorso base: `/content/arrangements`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un arrangiamento per ID |
| GET | `/song/:songId` | JWT | Content.Edit | Ottiene gli arrangiamenti per un canto |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Ottiene gli arrangiamenti per un dettaglio canto |
| GET | `/` | JWT | Content.Edit | Elenca tutti gli arrangiamenti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna arrangiamenti (batch) |
| POST | `/freeShow/missing` | JWT | — | Trova gli ID FreeShow che non esistono nella chiesa. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un arrangiamento (elimina anche le tonalità; elimina il canto se non restano arrangiamenti) |

## Arrangement Keys

Percorso base: `/content/arrangementKeys`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Ottiene la tonalità dell'arrangiamento con i dati completi del canto per la vista presentatore |
| GET | `/:id` | JWT | — | Ottiene una tonalità di arrangiamento per ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Ottiene le tonalità per un arrangiamento |
| GET | `/` | JWT | Content.Edit | Elenca tutte le tonalità di arrangiamento |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna tonalità di arrangiamento (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una tonalità di arrangiamento |

## Settings

Percorso base: `/content/settings`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ottiene le impostazioni dell'utente corrente |
| GET | `/` | JWT | Settings.Edit | Ottiene tutte le impostazioni della chiesa |
| GET | `/public/:churchId` | Public | — | Ottiene le impostazioni pubbliche di una chiesa (restituite come coppie chiave-valore) |
| POST | `/my` | JWT | — | Salva le impostazioni a livello utente (supporta il caricamento di immagini in base64) |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni a livello chiesa (supporta il caricamento di immagini in base64) |
| DELETE | `/my/:id` | JWT | — | Elimina un'impostazione utente |

## Preview

Percorso base: `/content/preview`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Carica i dati di anteprima streaming per una chiesa in base alla chiave del sottodominio (schede, link, servizi, sermoni) |

## Gallery (Stock Photos)

Percorso base: `/content/stock`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Cerca foto stock su Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Percorso base: `/content/praiseCharts`

Integrazione con PraiseCharts per la scoperta di canti di lode e il download di spartiti.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Ottiene i dati grezzi PraiseCharts per un canto |
| GET | `/hasAccount` | JWT | — | Verifica se l'utente ha un account PraiseCharts collegato |
| GET | `/search?q=` | JWT | — | Cerca nel catalogo PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Ottiene i prodotti per un canto (dalla libreria se autenticato, altrimenti dal catalogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Ottiene i dati grezzi dell'arrangiamento dalla libreria |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Scarica un file da PraiseCharts (PDF o ZIP). Restituisce `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Ottiene l'URL di autorizzazione OAuth per PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Scambia il verificatore OAuth per un token di accesso e lo salva nelle impostazioni utente |
| GET | `/library` | JWT | — | Sfoglia la libreria PraiseCharts dell'utente |

## Support

Percorso base: `/content/support`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Converte SSML in audio MP3 usando AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Pagine correlate

- [Architettura del Website Builder](../../architecture/website-builder) -- Come si combinano pagine, sezioni, elementi, articoli e reindirizzamenti tra le applicazioni
- [Endpoint Membership](./membership) -- Persone, chiese, gruppi, ruoli, permessi
- [Endpoint Attendance](./attendance) -- Tracciamento di servizi e visite
- [Autenticazione e permessi](./authentication) -- Flusso di login, JWT, modello dei permessi
- [Struttura dei moduli](../module-structure) -- Pattern di organizzazione del codice
