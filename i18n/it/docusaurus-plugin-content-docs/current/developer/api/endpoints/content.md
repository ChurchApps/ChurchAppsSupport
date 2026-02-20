---
title: "Endpoint Content"
---

# Endpoint Content

<div class="article-intro">

Il modulo Content gestisce le pagine del sito web, le sezioni, gli elementi, i blocchi, le prediche, le playlist, i servizi di streaming, gli eventi, i calendari curati, i file, le gallerie, le traduzioni bibliche e la ricerca dei versetti, i canti, gli arrangiamenti, gli stili globali, le foto stock e le impostazioni. È il modulo più grande dell'API e alimenta il CMS, i media/streaming, la pianificazione del culto e le funzionalità bibliche in tutte le applicazioni ChurchApps.

</div>

**Percorso base:** `/content`

## Pagine

Percorso base: `/content/pages`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:churchId/tree?url=&id=` | Pubblico | — | Carica l'albero completo della pagina (sezioni, elementi, blocchi) per URL o ID. Rimuove gli ID interni quando recuperato per URL |
| GET | `/:id` | JWT | — | Ottieni una pagina per ID |
| GET | `/` | JWT | — | Elenca tutte le pagine della chiesa |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica una pagina con tutte le sezioni e gli elementi |
| POST | `/temp/ai` | JWT | Content.Edit | Salva una pagina generata dall'IA (pagina, sezioni ed elementi in una sola chiamata) |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna pagine (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una pagina |

### Esempio: Carica Albero della Pagina

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

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni una sezione per ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplica una sezione o convertila in un blocco riutilizzabile |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna sezioni (batch). Aggiorna automaticamente l'ordine di ordinamento |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una sezione (aggiorna automaticamente l'ordine di ordinamento) |

## Elementi

Percorso base: `/content/elements`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un elemento per ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica un elemento con tutti i figli |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna elementi (batch). Gestisce automaticamente le colonne delle righe e le slide del carosello |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un elemento |

## Blocchi

Percorso base: `/content/blocks`

Estende il CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un blocco per ID |
| GET | `/` | JWT | — | Elenca tutti i blocchi |
| GET | `/:churchId/tree/:id` | Pubblico | — | Carica l'albero completo del blocco con sezioni ed elementi |
| GET | `/blockType/:blockType` | JWT | — | Carica i blocchi per tipo (es. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Pubblico | — | Carica l'albero del blocco footer per una chiesa |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna blocchi |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un blocco |

## Link

Percorso base: `/content/links`

Estende il CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un link per ID |
| GET | `/` | JWT | — | Elenca tutti i link. Filtro opzionale `?category=`. Ordinamento automatico dopo il salvataggio |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carica i link filtrati per visibilità (tutti, visitatori, membri, staff, gruppi) |
| GET | `/church/:churchId?category=` | Pubblico | — | Carica i link per una chiesa per categoria (pubblico) |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna link (batch). Ordinamento automatico per categoria |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un link |

## Stili Globali

Percorso base: `/content/globalStyles`

Estende il CRUD standard (POST `/`, DELETE `/:id` dalla classe base con permesso Content.Edit per le scritture).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/church/:churchId` | Pubblico | — | Carica gli stili globali per una chiesa (restituisce i valori predefiniti se non impostati) |
| GET | `/` | JWT | — | Carica gli stili globali per la chiesa autenticata |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna gli stili globali |
| DELETE | `/:id` | JWT | Content.Edit | Elimina gli stili globali |

## Cronologia Pagine

Percorso base: `/content/pageHistory`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Elenca le voci della cronologia per una pagina |
| GET | `/block/:blockId` | JWT | Content.Edit | Elenca le voci della cronologia per un blocco |
| GET | `/:id` | JWT | Content.Edit | Ottieni una voce della cronologia per ID |
| POST | `/` | JWT | Content.Edit | Salva un'istantanea della pagina/blocco. Pulisce periodicamente le voci più vecchie di 30 giorni |
| POST | `/restore/:id` | JWT | Content.Edit | Ripristina una pagina/blocco da un'istantanea della cronologia (elimina il contenuto attuale e lo ricrea dall'istantanea) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ripristina da un oggetto istantanea inline. Body: `{ pageId, blockId, snapshot }` |

## Prediche

Percorso base: `/content/sermons`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Ottieni un esempio di struttura playlist FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Ottieni il wrapper dell'app TV con sorgenti prediche, lezioni e FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Pubblico | — | Ottieni una singola predica come playlist del feed TV |
| GET | `/public/tvFeed/:churchId` | Pubblico | — | Ottieni tutte le playlist/prediche pubbliche come feed TV |
| GET | `/public/:churchId` | Pubblico | — | Elenca tutte le prediche pubbliche per una chiesa |
| GET | `/timeline?sermonIds=` | JWT | — | Carica i dati della timeline per le prediche |
| GET | `/lookup?videoType=&videoData=` | Pubblico | — | Cerca i metadati della predica da YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Genera suggerimenti IA per post sui social media dai sottotitoli della predica |
| GET | `/outline?url=&title=&author=` | JWT | — | Genera uno schema di lezione IA da un URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importa video da un canale YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importa video da un canale Vimeo |
| GET | `/:id` | JWT | — | Ottieni una predica per ID |
| GET | `/` | JWT | — | Elenca tutte le prediche |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna prediche (batch, supporta caricamento miniature in base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina una predica |

### Esempio: Cerca una Predica su YouTube

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

Estende il CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` dalla classe base con permesso StreamingServices.Edit per le scritture).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni una playlist per ID |
| GET | `/` | JWT | — | Elenca tutte le playlist |
| GET | `/public/:churchId` | Pubblico | — | Elenca tutte le playlist pubbliche per una chiesa |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna playlist (batch, supporta caricamento miniature in base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina una playlist |

## Servizi di Streaming

Percorso base: `/content/streamingServices`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Ottieni l'ID criptato della chat room dell'host per un servizio |
| GET | `/` | JWT | — | Elenca tutti i servizi di streaming. Pulisce automaticamente i servizi non ricorrenti scaduti e avanza quelli ricorrenti |
| POST | `/` | JWT | StreamingServices.Edit | Crea o aggiorna servizi di streaming (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un servizio di streaming (cancella anche gli IP bloccati) |

## Eventi

Percorso base: `/content/events`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carica gli eventi della timeline per un gruppo |
| GET | `/timeline?eventIds=` | JWT | — | Carica gli eventi della timeline per i gruppi dell'utente corrente |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Pubblico | — | Iscriviti agli eventi come feed calendario ICS |
| GET | `/group/:groupId` | JWT | — | Ottieni gli eventi per un gruppo (include le date di eccezione) |
| GET | `/public/group/:churchId/:groupId` | Pubblico | — | Ottieni gli eventi pubblici per un gruppo |
| GET | `/:id` | JWT | — | Ottieni un evento per ID |
| POST | `/` | JWT | — | Crea o aggiorna eventi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento |

## Eccezioni Eventi

Percorso base: `/content/eventExceptions`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un'eccezione evento per ID |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eccezioni eventi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un'eccezione evento |

## Calendari Curati

Percorso base: `/content/curatedCalendars`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un calendario curato per ID |
| GET | `/` | JWT | — | Elenca tutti i calendari curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna calendari curati (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un calendario curato |

## Eventi Curati

Percorso base: `/content/curatedEvents`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Ottieni gli eventi curati per un calendario (include dettagli evento e date di eccezione a meno che `?withoutEvents` sia impostato) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Pubblico | — | Ottieni gli eventi curati pubblici per un calendario |
| GET | `/:id` | JWT | — | Ottieni un evento curato per ID |
| GET | `/` | JWT | — | Elenca tutti gli eventi curati |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna eventi curati. Supporta l'array `eventIds` per aggiungere eventi specifici del gruppo |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento curato |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Rimuovi un evento specifico da un calendario curato |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Rimuovi tutti gli eventi di un gruppo da un calendario curato |

## File

Percorso base: `/content/files`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Ottieni i file per tipo di contenuto e ID contenuto |
| GET | `/` | JWT | — | Elenca tutti i file per il sito web della chiesa |
| GET | `/:id` | JWT | — | Ottieni un file per ID |
| POST | `/` | JWT | Content.Edit* | Carica file (base64). *Consentito anche se l'utente è membro del gruppo corrispondente a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Ottieni un URL di caricamento S3 pre-firmato. *Consentito anche per i membri del gruppo. Massimo 100MB per elemento di contenuto |
| DELETE | `/:id` | JWT | Content.Edit* | Elimina un file e rimuovilo dallo storage. *Consentito anche per i membri del gruppo |

## Galleria

Percorso base: `/content/gallery`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/stock/:folder` | Pubblico | — | Elenca le foto stock in una cartella |
| GET | `/:folder` | JWT | Content.Edit | Elenca le immagini della galleria in una cartella |
| POST | `/requestUpload` | JWT | Content.Edit | Ottieni un URL di caricamento S3 pre-firmato per un'immagine della galleria |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Elimina un'immagine della galleria |

## Bibbie

Percorso base: `/content/bibles`

Tutti gli endpoint delle Bibbie sono pubblici (nessuna autenticazione richiesta). I dati vengono recuperati da fonti esterne e memorizzati nella cache locale.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | Pubblico | — | Elenca tutte le traduzioni bibliche (recupera dalla fonte se la cache è vuota) |
| GET | `/stats?startDate=&endDate=` | Pubblico | — | Ottieni le statistiche di ricerca biblica per un intervallo di date |
| GET | `/availableTranslations/:source` | Pubblico | — | Elenca le traduzioni disponibili da una fonte (es. api.bible) |
| GET | `/updateTranslations` | Pubblico | — | Sincronizza tutte le traduzioni da tutte le fonti |
| GET | `/updateTranslations/:source` | Pubblico | — | Sincronizza le traduzioni da una fonte specifica |
| GET | `/updateCopyrights` | Pubblico | — | Aggiorna le informazioni sul copyright per le traduzioni che ne sono prive |
| GET | `/:translationKey/updateCopyright` | Pubblico | — | Aggiorna il copyright per una traduzione specifica |
| GET | `/:translationKey/search?query=&limit=` | Pubblico | — | Cerca versetti in una traduzione |
| GET | `/:translationKey/books` | Pubblico | — | Ottieni i libri per una traduzione (memorizzati nella cache locale) |
| GET | `/:translationKey/:bookKey/chapters` | Pubblico | — | Ottieni i capitoli per un libro (memorizzati nella cache locale) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Pubblico | — | Ottieni i versetti per un capitolo (memorizzati nella cache locale) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Pubblico | — | Ottieni il testo dei versetti per un intervallo. Registra le ricerche. Alcune traduzioni bypassano la cache per motivi di licenza |

### Esempio: Ottieni il Testo del Versetto

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

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/search?q=` | JWT | — | Cerca canti per query |
| GET | `/:id` | JWT | — | Ottieni un canto per ID |
| GET | `/` | JWT | Content.Edit | Elenca tutti i canti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna canti (batch) |
| POST | `/import` | JWT | — | Importa canti da FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un canto |

## Dettagli Canto

Percorso base: `/content/songDetails`

I dettagli dei canti sono globali (non legati alla chiesa). Rappresentano i metadati canonici dei canti condivisi tra le chiese.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un dettaglio del canto per ID (globale) |
| GET | `/` | JWT | — | Elenca i dettagli dei canti per la chiesa |
| POST | `/create` | JWT | — | Crea un dettaglio del canto dall'ID PraiseCharts (restituisce quello esistente se già creato). Recupera automaticamente i metadati da PraiseCharts e MusicBrainz |
| POST | `/` | JWT | — | Crea o aggiorna dettagli dei canti (batch) |

## Link Dettagli Canto

Percorso base: `/content/songDetailLinks`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un link dettaglio canto per ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Ottieni tutti i link per un dettaglio del canto |
| POST | `/` | JWT | — | Crea o aggiorna link dettagli canto (batch). Recupera automaticamente i dati MusicBrainz se collegato |
| DELETE | `/:id` | JWT | — | Elimina un link dettaglio canto |

## Arrangiamenti

Percorso base: `/content/arrangements`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un arrangiamento per ID |
| GET | `/song/:songId` | JWT | Content.Edit | Ottieni gli arrangiamenti per un canto |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Ottieni gli arrangiamenti per un dettaglio del canto |
| GET | `/` | JWT | Content.Edit | Elenca tutti gli arrangiamenti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna arrangiamenti (batch) |
| POST | `/freeShow/missing` | JWT | — | Trova gli ID FreeShow che non esistono nella chiesa. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un arrangiamento (elimina anche le chiavi; elimina il canto se non rimangono arrangiamenti) |

## Chiavi Arrangiamento

Percorso base: `/content/arrangementKeys`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/presenter/:churchId/:id` | Pubblico | — | Ottieni la chiave dell'arrangiamento con i dati completi del canto per la vista presentatore |
| GET | `/:id` | JWT | — | Ottieni una chiave dell'arrangiamento per ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Ottieni le chiavi per un arrangiamento |
| GET | `/` | JWT | Content.Edit | Elenca tutte le chiavi degli arrangiamenti |
| POST | `/` | JWT | Content.Edit | Crea o aggiorna chiavi degli arrangiamenti (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una chiave dell'arrangiamento |

## Impostazioni

Percorso base: `/content/settings`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/my` | JWT | — | Ottieni le impostazioni dell'utente corrente |
| GET | `/` | JWT | Settings.Edit | Ottieni tutte le impostazioni per la chiesa |
| GET | `/public/:churchId` | Pubblico | — | Ottieni le impostazioni pubbliche per una chiesa (restituite come coppie chiave-valore) |
| GET | `/imports?playlistId=&channelId=&type=` | JWT | Settings.Edit | Ottieni le impostazioni di importazione automatica (ID canale YouTube/Vimeo) |
| POST | `/my` | JWT | — | Salva le impostazioni a livello utente (supporta caricamento immagini in base64) |
| POST | `/` | JWT | Settings.Edit | Salva le impostazioni a livello chiesa (supporta caricamento immagini in base64) |
| DELETE | `/my/:id` | JWT | — | Elimina un'impostazione utente |

## Anteprima

Percorso base: `/content/preview`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/data/:key` | Pubblico | — | Carica i dati di anteprima streaming per una chiesa per chiave sottodominio (schede, link, servizi, prediche) |

## Galleria (Foto Stock)

Percorso base: `/content/stock`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/search` | Pubblico | — | Cerca foto stock Pexels. Body: `{ term: "church" }` |

## PraiseCharts

Percorso base: `/content/praiseCharts`

Integrazione con PraiseCharts per la scoperta di canti di culto e il download di spartiti.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/raw/:id` | JWT | — | Ottieni i dati grezzi PraiseCharts per un canto |
| GET | `/hasAccount` | JWT | — | Verifica se l'utente ha un account PraiseCharts collegato |
| GET | `/search?q=` | JWT | — | Cerca nel catalogo PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Ottieni i prodotti per un canto (dalla libreria se autenticato, altrimenti dal catalogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Ottieni i dati grezzi dell'arrangiamento dalla libreria |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Scarica un file da PraiseCharts (PDF o ZIP). Restituisce `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Pubblico | — | Ottieni l'URL di autorizzazione OAuth per PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Scambia il verificatore OAuth per il token di accesso e salvalo nelle impostazioni utente |
| GET | `/library` | JWT | — | Sfoglia la libreria PraiseCharts dell'utente |

## Supporto

Percorso base: `/content/support`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/createAudio` | Pubblico | — | Converti SSML in audio MP3 utilizzando AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Pagine Correlate

- [Endpoint Membership](./membership) -- Persone, chiese, gruppi, ruoli, permessi
- [Endpoint Attendance](./attendance) -- Tracciamento servizi e visite
- [Autenticazione e Permessi](./authentication) -- Flusso di login, JWT, modello dei permessi
- [Struttura dei Moduli](../module-structure) -- Pattern di organizzazione del codice
