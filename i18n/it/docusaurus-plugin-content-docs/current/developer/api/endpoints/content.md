---
title: "Endpoint di Contenuto"
---

# Endpoint di Contenuto

<div class="article-intro">

Il modulo Contenuto gestisce pagine web, sezioni, elementi, blocchi, post di blog, reindirizzamenti, sermoni, playlist, servizi di streaming, eventi, calendari curati, file, gallerie, traduzioni bibliche e ricerche di versetti, canzoni, arrangiamenti, stili globali, foto stock e impostazioni. È il modulo più grande dell'API e potenzia il CMS, i media/streaming, la pianificazione del culto e le funzioni bibliche in tutte le applicazioni ChurchApps.

</div>

**Percorso base:** `/content`

## Pagine

Percorso base: `/content/pages`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Pubblico | — | Carica l'albero completo della pagina (sezioni, elementi, blocchi) per URL o ID. Rimuove gli ID interni quando recuperati per URL. Le ricerche basate su URL applicano `pages.visibility` — una pagina controllata restituisce `{ restricted: true, visibility }` a meno che il JWT (facoltativo) non soddisfi il gate |
| GET | `/public/:churchId` | Pubblico | — | Elenca le pagine pubbliche (`url`, `title`, `metaDescription`); solo `visibility = everyone` |
| GET | `/:id` | JWT | — | Ottieni una pagina per ID |
| GET | `/` | JWT | — | Elenca tutte le pagine della chiesa |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica una pagina con tutte le sezioni e gli elementi |
| POST | `/temp/ai` | JWT | Content.Edit | Salva una pagina generata da AI (pagina, sezioni e elementi in una sola chiamata) |
| POST | `/importTree` | JWT | Content.Edit | Crea una pagina da un albero nidificato (`title`, `url`, `sections[].elements[]…`). Inserisce sempre sotto la chiesa del chiamante; gli id nel corpo vengono ignorati. Le righe devono includere i loro `column` figli. Max 30 sezioni / 500 elementi |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna pagine (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una pagina |

### Esempio: Carica Albero Pagina

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
| GET | `/:id` | JWT | — | Ottieni una sezione per ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplica una sezione o convertila in un blocco riutilizzabile |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna sezioni (batch). Aggiorna automaticamente l'ordine di ordinamento |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una sezione (aggiorna automaticamente l'ordine di ordinamento) |

## Elementi

Percorso base: `/content/elements`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un elemento per ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica un elemento con tutti i figli |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna elementi (batch). Gestisce automaticamente le colonne della riga e le diapositive del carosello |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un elemento |

## Blocchi

Percorso base: `/content/blocks`

Estende CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un blocco per ID |
| GET | `/` | JWT | — | Elenca tutti i blocchi |
| GET | `/:churchId/tree/:id` | Pubblico | — | Carica l'albero completo del blocco con sezioni e elementi |
| GET | `/blockType/:blockType` | JWT | — | Carica blocchi per tipo (ad esempio footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Pubblico | — | Carica l'albero dei blocchi di piè di pagina per una chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna blocchi |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un blocco |

## Link

Percorso base: `/content/links`

Estende CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un link per ID |
| GET | `/` | JWT | — | Elenca tutti i link. Filtro facoltativo `?category=`. Ordinamento automatico dopo il salvataggio |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carica link filtrati per visibilità (tutti, visitatori, membri, staff, gruppi) |
| GET | `/church/:churchId?category=` | Pubblico | — | Carica link per una chiesa per categoria (pubblico) |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna link (batch). Ordinamento automatico per categoria |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un link |

## Stili Globali

Percorso base: `/content/globalStyles`

Estende CRUD standard (POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Pubblico | — | Carica stili globali per una chiesa (restituisce impostazioni predefinite se nessuno è impostato) |
| GET | `/` | JWT | — | Carica stili globali per la chiesa autenticata |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna stili globali |
| DELETE | `/:id` | JWT | Content.Edit | Elimina gli stili globali |

## Cronologia Pagina

Percorso base: `/content/pageHistory`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Elenca voci di cronologia per una pagina |
| GET | `/block/:blockId` | JWT | Content.Edit | Elenca voci di cronologia per un blocco |
| GET | `/:id` | JWT | Content.Edit | Ottieni una voce di cronologia per ID |
| POST | `/` | JWT | Content.Edit | Salva un'istantanea di pagina/blocco. Pulisce periodicamente le voci più vecchie di 30 giorni |
| POST | `/restore/:id` | JWT | Content.Edit | Ripristina una pagina/blocco da un'istantanea di cronologia (elimina il contenuto attuale e ricrea dall'istantanea) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ripristina da un oggetto istantanea inline. Corpo: `{ pageId, blockId, snapshot }` |

## Post (Blog)

Percorso base: `/content/posts`

I post di blog sono righe autonome: `title`, `slug` (univoco per chiesa), `excerpt`, `content` (corpo markdown), `authorId`, `photoUrl`, `publishDate`, `category`, e `tags`. Un post viene pubblicato una volta che `publishDate` è impostato e nel passato. Gli endpoint di lettura arricchiscono ogni post con `authorName` risolto da `authorId`. Vedere [Architettura del Generatore di Siti Web](../../architecture/website-builder#blog).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Pubblico | — | Elenca i post pubblicati, paginati (max 50 per pagina) |
| GET | `/public/:churchId/categories` | Pubblico | — | Categorie distinte tra i post pubblicati |
| GET | `/public/:churchId/slug/:slug` | Pubblico | — | Ottieni un post pubblicato per slug |
| GET | `/rss/:churchId?siteUrl=` | Pubblico | — | Feed RSS 2.0 dei post pubblicati (link creati come `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Ottieni un post per ID |
| GET | `/` | JWT | — | Elenca tutti i post della chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna post (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un post |

## Reindirizzamenti

Percorso base: `/content/redirects`

Reindirizzamenti URL per-chiesa (`fromPath` → `toPath`), limitati a 200 per chiesa. I percorsi sono normalizzati (minuscoli, barra iniziale, nessuna barra finale) e `fromPath` è univoco per chiesa. B1App risolve questi su 404 che accadrebbero e emette un HTTP 308.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Pubblico | — | Risolvi un percorso (o elenca tutti i reindirizzamenti quando `path` è omesso) |
| GET | `/:id` | JWT | — | Ottieni un reindirizzamento per ID |
| GET | `/` | JWT | — | Elenca tutti i reindirizzamenti della chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna reindirizzamenti. Rifiuta `fromPath = toPath` e applica il limite di 200 righe |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un reindirizzamento |

## Sermoni

Percorso base: `/content/sermons`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Ottieni una struttura di playlist FreeShow di esempio |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Ottieni il wrapper dell'app TV con fonti di sermone, lezione e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Pubblico | — | Ottieni un singolo sermone come playlist feed TV |
| GET | `/public/tvFeed/:churchId` | Pubblico | — | Ottieni tutte le playlist/sermoni pubblici come feed TV |
| GET | `/public/:churchId` | Pubblico | — | Elenca tutti i sermoni pubblici di una chiesa |
| GET | `/timeline?sermonIds=` | JWT | — | Carica dati della timeline per i sermoni |
| GET | `/lookup?videoType=&videoData=` | Pubblico | — | Cerca metadati del sermone da YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Genera suggerimenti AI di post sui social media dai sottotitoli del sermone |
| GET | `/outline?url=&title=&author=` | JWT | — | Genera un profilo della lezione AI da un URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importa video da un canale YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importa video da un canale Vimeo |
| GET | `/:id` | JWT | — | Ottieni un sermone per ID |
| GET | `/` | JWT | — | Elenca tutti i sermoni |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna sermoni (batch, supporta caricamento di miniature in base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un sermone |

### Esempio: Cerca un Sermone su YouTube

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

Estende CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base con permesso StreamingServices.Edit per le scritture).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni una playlist per ID |
| GET | `/` | JWT | — | Elenca tutte le playlist |
| GET | `/public/:churchId` | Pubblico | — | Elenca tutte le playlist pubbliche di una chiesa |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna playlist (batch, supporta caricamento di miniature in base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina una playlist |

## Servizi di Streaming

Percorso base: `/content/streamingServices`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Ottieni l'ID della chat room host crittografato per un servizio |
| GET | `/` | JWT | — | Elenca tutti i servizi di streaming. Pulisce automaticamente i servizi non ricorrenti scaduti e avanza quelli ricorrenti |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna servizi di streaming (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un servizio di streaming (cancella anche gli IP bloccati) |

## Eventi

Percorso base: `/content/events`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carica eventi della timeline per un gruppo |
| GET | `/timeline?eventIds=` | JWT | — | Carica eventi della timeline per i gruppi dell'utente attuale |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Pubblico | — | Iscriviti agli eventi come feed di calendario ICS |
| GET | `/group/:groupId` | JWT | — | Ottieni eventi per un gruppo (include date di eccezione) |
| GET | `/public/group/:churchId/:groupId` | Pubblico | — | Ottieni eventi pubblici per un gruppo |
| GET | `/:id` | JWT | — | Ottieni un evento per ID |
| POST | `/` | JWT | — | Crea o aggiorna eventi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento |

## Eccezioni agli Eventi

Percorso base: `/content/eventExceptions`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un'eccezione all'evento per ID |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eccezioni agli eventi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un'eccezione all'evento |

## Calendari Curati

Percorso base: `/content/curatedCalendars`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un calendario curato per ID |
| GET | `/` | JWT | — | Elenca tutti i calendari curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna calendari curati (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un calendario curato |

## Eventi Curati

Percorso base: `/content/curatedEvents`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Ottieni eventi curati per un calendario (include dettagli dell'evento e date di eccezione a meno che `?withoutEvents` non sia impostato) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Pubblico | — | Ottieni eventi curati pubblici per un calendario |
| GET | `/:id` | JWT | — | Ottieni un evento curato per ID |
| GET | `/` | JWT | — | Elenca tutti gli eventi curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eventi curati. Supporta l'array `eventIds` per aggiungere eventi di gruppo specifici |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento curato |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Rimuovi un evento specifico da un calendario curato |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Rimuovi tutti gli eventi di un gruppo da un calendario curato |

## File

Percorso base: `/content/files`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Ottieni file per tipo di contenuto e ID di contenuto |
| GET | `/` | JWT | — | Elenca tutti i file del sito web della chiesa |
| GET | `/:id` | JWT | — | Ottieni un file per ID |
| POST | `/` | JWT | Content.Edit* | Carica file (base64). *Consentito anche se l'utente è un membro del gruppo corrispondente a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Ottieni un URL di caricamento pre-firmato S3. *Consentito anche per i membri del gruppo. Max 100MB per elemento di contenuto |
| DELETE | `/:id` | JWT | Content.Edit* | Elimina un file e rimuovi dall'archiviazione. *Consentito anche per i membri del gruppo |

## Galleria

Percorso base: `/content/gallery`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Pubblico | — | Elenca foto stock in una cartella |
| GET | `/:folder` | JWT | Content.Edit | Elenca immagini della galleria in una cartella |
| POST | `/requestUpload` | JWT | Content.Edit | Ottieni un URL di caricamento pre-firmato S3 per un'immagine della galleria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Elimina un'immagine della galleria |

## Bibbie

Percorso base: `/content/bibles`

Tutti gli endpoint della Bibbia sono pubblici (non è richiesta autenticazione). I dati vengono recuperati da fonti esterne e memorizzati nella cache localmente.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | Pubblico | — | Elenca tutte le traduzioni bibliche (recupera dalla fonte se la cache è vuota) |
| GET | `/stats?startDate=&endDate=` | Pubblico | — | Ottieni statistiche di ricerca della Bibbia per un intervallo di date |
| GET | `/availableTranslations/:source` | Pubblico | — | Elenca le traduzioni disponibili da una fonte (ad esempio api.bible) |
| GET | `/updateTranslations` | Pubblico | — | Sincronizza tutte le traduzioni da tutte le fonti |
| GET | `/updateTranslations/:source` | Pubblico | — | Sincronizza le traduzioni da una fonte specifica |
| GET | `/updateCopyrights` | Pubblico | — | Aggiorna le informazioni sul copyright per le traduzioni che mancano |
| GET | `/:translationKey/updateCopyright` | Pubblico | — | Aggiorna il copyright per una traduzione specifica |
| GET | `/:translationKey/search?query=&limit=` | Pubblico | — | Cerca versetti in una traduzione |
| GET | `/:translationKey/books` | Pubblico | — | Ottieni libri per una traduzione (memorizza nella cache localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Pubblico | — | Ottieni capitoli per un libro (memorizza nella cache localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Pubblico | — | Ottieni versetti per un capitolo (memorizza nella cache localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Pubblico | — | Ottieni testo versetto per un intervallo. Registra le ricerche. Alcune traduzioni aggirano la memorizzazione nella cache per motivi di licenza |

### Esempio: Ottieni Testo Versetto

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

## Canzoni

Percorso base: `/content/songs`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Cerca canzoni per query |
| GET | `/:id` | JWT | — | Ottieni una canzone per ID |
| GET | `/` | JWT | Content.Edit | Elenca tutte le canzoni |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna canzoni (batch) |
| POST | `/import` | JWT | — | Importa canzoni da FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una canzone |

## Dettagli Canzone

Percorso base: `/content/songDetails`

I dettagli della canzone sono globali (non delimitati per chiesa). Questi rappresentano metadati canonici condivisi tra le chiese.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un dettaglio della canzone per ID (globale) |
| GET | `/` | JWT | — | Elenca i dettagli della canzone per la chiesa |
| POST | `/create` | JWT | — | Crea un dettaglio della canzone dall'ID PraiseCharts (restituisce quello esistente se già creato). Recupera automaticamente i metadati da PraiseCharts e MusicBrainz |
| POST | `/` | JWT | — | Crea o aggiorna dettagli della canzone (batch) |

## Link Dettagli Canzone

Percorso base: `/content/songDetailLinks`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un link dettagli canzone per ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Ottieni tutti i link per un dettaglio canzone |
| POST | `/` | JWT | — | Crea o aggiorna link dettagli canzone (batch). Recupera automaticamente i dati di MusicBrainz se collegato |
| DELETE | `/:id` | JWT | — | Elimina un link dettagli canzone |

## Arrangiamenti

Percorso base: `/content/arrangements`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un arrangiamento per ID |
| GET | `/song/:songId` | JWT | Content.Edit | Ottieni arrangiamenti per una canzone |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Ottieni arrangiamenti per un dettaglio canzone |
| GET | `/` | JWT | Content.Edit | Elenca tutti gli arrangiamenti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna arrangiamenti (batch) |
| POST | `/freeShow/missing` | JWT | — | Trova gli ID FreeShow che non esistono nella chiesa. Corpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un arrangiamento (elimina anche le chiavi; elimina la canzone se non rimangono arrangiamenti) |

## Chiavi Arrangiamento

Percorso base: `/content/arrangementKeys`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Pubblico | — | Ottieni la chiave di arrangiamento con i dati completi della canzone per la vista del presentatore |
| GET | `/:id` | JWT | — | Ottieni una chiave di arrangiamento per ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Ottieni chiavi per un arrangiamento |
| GET | `/` | JWT | Content.Edit | Elenca tutte le chiavi di arrangiamento |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna chiavi di arrangiamento (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una chiave di arrangiamento |

## Impostazioni

Percorso base: `/content/settings`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ottieni le impostazioni dell'utente attuale |
| GET | `/` | JWT | Settings.Edit | Ottieni tutte le impostazioni per la chiesa |
| GET | `/public/:churchId` | Pubblico | — | Ottieni le impostazioni pubbliche per una chiesa (restituite come coppie chiave-valore) |
| POST | `/my` | JWT | — | Salva le impostazioni a livello di utente (supporta caricamento di immagini in base64) |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni a livello di chiesa (supporta caricamento di immagini in base64) |
| DELETE | `/my/:id` | JWT | — | Elimina un'impostazione utente |

## Anteprima

Percorso base: `/content/preview`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Pubblico | — | Carica i dati di anteprima dello streaming per una chiesa per chiave sottodominio (schede, link, servizi, sermoni) |

## Galleria (Foto Stock)

Percorso base: `/content/stock`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/search` | Pubblico | — | Cerca foto stock Pexels. Corpo: `{ term: "church" }` |

## PraiseCharts

Percorso base: `/content/praiseCharts`

Integrazione con PraiseCharts per la scoperta di canzoni di adorazione e il download di fogli musicali.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Ottieni dati PraiseCharts grezzi per una canzone |
| GET | `/hasAccount` | JWT | — | Verifica se l'utente ha un account PraiseCharts collegato |
| GET | `/search?q=` | JWT | — | Cerca il catalogo PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Ottieni prodotti per una canzone (dalla libreria se autenticato, altrimenti dal catalogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Ottieni dati arrangiamento grezzi dalla libreria |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Scarica un file da PraiseCharts (PDF o ZIP). Restituisce `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Pubblico | — | Ottieni l'URL di autorizzazione OAuth per PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Scambia il verificatore OAuth per il token di accesso e salva le impostazioni utente |
| GET | `/library` | JWT | — | Sfoglia la libreria PraiseCharts dell'utente |

## Supporto

Percorso base: `/content/support`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Pubblico | — | Converti SSML in audio MP3 utilizzando AWS Polly. Corpo: `{ ssml: "<speak>...</speak>" }` |

## Pagine Correlate

- [Architettura del Generatore di Siti Web](../../architecture/website-builder) -- Come le pagine, le sezioni, gli elementi, i post e i reindirizzamenti si adattano tra le app
- [Endpoint di Iscrizione](./membership) -- Persone, chiese, gruppi, ruoli, permessi
- [Endpoint di Frequenza](./attendance) -- Tracciamento del servizio e delle visite
- [Autenticazione e Permessi](./authentication) -- Flusso di accesso, JWT, modello di permessi
- [Struttura Modulo](../module-structure) -- Modelli di organizzazione del codice
