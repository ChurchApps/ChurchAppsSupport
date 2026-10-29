---
title: "Architettura del Website Builder"
---

# Architettura del Website Builder

<div class="article-intro">

Ogni sito web di chiesa servito da B1App viene generato da un albero di contenuti — pagine, sezioni, elementi — memorizzato in ContentApi e modificato visivamente in B1Admin. Una libreria di componenti condivisa renderizza sia l'anteprima dell'editor sia il sito live, un catalogo di tipi di elemento definisce cosa può comparire in una pagina, e un servizio AI separato può generare o riscrivere quell'albero. Questa pagina descrive l'intero stack: il contratto degli elementi in `@churchapps/helpers`, la pipeline di rendering, gli elementi con dati della chiesa, i widget a livello di sito, il livello blog, le pagine con accesso limitato, la SEO, la generazione AI e i moduli conversazionali.

</div>

## Panoramica

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Tre regole valgono per l'intero stack:

1. **Un albero, due renderer.** Una pagina è un albero `pages → sections → elements` in cui ogni nodo porta le proprie impostazioni in un blob JSON `answers`. Gli stessi componenti apphelper renderizzano l'editor drag-and-drop in B1Admin e il sito pubblico lato server in B1App — non esiste un "formato di pubblicazione" separato.
2. **Il contratto vive in `@churchapps/helpers`.** `ElementTypes.ts` è l'unico catalogo dei tipi di elemento; i renderer si risolvono tramite un registro in apphelper; i form di modifica si trovano in B1Admin. Aggiungere un tipo di elemento significa intervenire su tutti e tre, in questo ordine.
3. **Il sito pubblico legge endpoint anonimi.** Tutto ciò di cui B1App ha bisogno — l'albero delle pagine, le impostazioni, gli articoli del blog, i redirect e gli endpoint dei dati della chiesa negli altri moduli — è pubblico. L'autenticazione è facoltativa: un JWT sull'endpoint anonimo dell'albero sblocca le pagine riservate ai membri, senza modificare nient'altro.

## L'albero dei contenuti

Il modulo content (`Api/src/modules/content`) gestisce i dati del builder:

| Tabella | Ruolo |
|-------|------|
| `pages` | Una pagina per URL: `url`, `title`, `layout`, più `visibility`/`groupIds` (accesso limitato) e `metaDescription` (SEO) |
| `sections` | Fasce orizzontali in una pagina (o in un blocco): sfondo, colore del testo e un `answersJSON` che contiene lo stile più le configurazioni delle forme `dividerTop`/`dividerBottom` |
| `elements` | Contenuti all'interno di una sezione: `elementType` + `answersJSON`, annidabili per i tipi di layout (riga/colonna, carosello) |
| `blocks` | Gruppi riutilizzabili di sezioni/elementi (blocchi di piè di pagina, blocchi di elementi) condivisi tra le pagine |
| `posts` | Articoli di blog autonomi (vedi [Blog](#blog)) |
| `redirects` | Coppie `fromPath → toPath` per chiesa, con un limite di 200 (vedi [SEO](#seo-e-reperibilità)) |
| `settings` | Impostazioni della chiesa in formato chiave-valore; le righe contrassegnate `public` sono servite anonimamente e contengono la configurazione dei widget e delle analitiche |

L'intero albero di un URL torna da un'unica chiamata anonima — `GET /content/pages/:churchId/tree?url=/about` — ed è da qui che B1App esegue il rendering lato server. Le richieste dell'editor recuperano invece per id e mantengono gli id interni.

## Il contratto degli elementi

### Il catalogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definisce ogni tipo di elemento come un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` e un `answersSchema` in stile JSON-schema per le sue risposte. `validateElementAnswers()` è volutamente tollerante — tipi sconosciuti e chiavi extra vengono accettati, così i contenuti vecchi non si rompono quando il catalogo viene aggiornato. **Oggi sono disponibili 35 tipi:**

| Categoria | Tipi di elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| contenuto (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| chiesa (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avanzato (2) | rawHTML, iframe |

L'elemento `sermons` è il più configurabile tra quelli della chiesa: una risposta `layout` seleziona `browse` (il vecchio browser a tutta pagina), `grid`, `list` o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles` e `showDates` che rifiniscono i layout diversi da browse.

L'elemento `rawHTML` ha due risposte: `rawHTML` (markup) e `javascript`. Gli script inseriti tramite `innerHTML` non vengono mai eseguiti, quindi `RawHTMLElement` ricrea come nuovo elemento ogni nodo `<script>` del markup. Questi nodi non inseriti dal parser sono considerati attendibili sotto `strict-dynamic` della CSP. Una risposta `javascript` che inizia con `<` (uno snippet di un fornitore incollato con i suoi tag `<script>`) viene interpretata come markup e riceve lo stesso trattamento. Altrimenti viene eseguita come semplice script inline. B1Admin segnala un URL nudo nella casella JavaScript, perché un URL isolato viene eseguito come script senza effetto. L'elemento `map` non renderizza nulla e non carica alcuno script di Google Maps quando non è configurata alcuna chiave API di Maps.

### Renderer (`@churchapps/apphelper`)

I renderer si trovano in `Packages/apphelper/src/website/components/elementTypes/`, un componente per tipo, risolti tramite `ElementRegistry.ts` — una mappa a due livelli in cui `Element.tsx` registra il renderer predefinito per tutti i 35 tipi (`registerDefaultElementRenderer`) e una app host può sovrascriverne qualsiasi a runtime (`registerElementRenderer`) senza fare fork del pacchetto.

### Form di modifica (B1Admin)

I form delle impostazioni per tipo dell'editor si trovano in `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` smista verso un componente dedicato (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) oppure verso un costruttore di campi inline per tipo. La versione di questo catalogo destinata all'AI è lo strumento MCP `describe_page_builder` dell'API (vedi [Server MCP](../api/mcp)).

L'anteprima dell'editor monta lo stesso `Theme` del sito live, che imposta le variabili CSS `--headingFont` / `--bodyFont` dagli stili globali della chiesa. B1App applica queste variabili tramite `pages.css`, che B1Admin non può importare; quindi `ContentEditor.tsx` inietta `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) per applicarle al testo del corpo `.page` e agli `h1`–`h6`. Senza di essa, l'anteprima mostrava i titoli con il font dell'amministrazione.

### Separatori di forma delle sezioni

Le sezioni possono avere separatori di forma decorativi su entrambi i bordi. La configurazione risiede nel `answersJSON` della sezione sotto forma di oggetti `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` con `shape` uno tra `wave, waves, slant, curve, triangle, peaks`. Apphelper fornisce il componente `SectionDivider` e l'helper `parseDividerConfig()`; i renderer Section di entrambe le app (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) leggono le risposte e montano il separatore, e `SectionEdit.tsx` in B1Admin fornisce l'interfaccia di selezione. I pacchetti forniscono solo il blocco di base — il collegamento a livello di sezione spetta alle app che li utilizzano.

## Elementi con dati della chiesa

Tre tipi di elemento visualizzano dati reali della chiesa invece di contenuti scritti a mano. L'isolamento dei moduli resta valido — ciascuno chiama dal browser l'endpoint pubblico del proprio modulo:

| Elemento | Endpoint | Note |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Restituisce `{ fundId, totalAmount, donationCount }`, con una finestra facoltativa `?startDate=&endDate=`; l'elemento lo confronta con la risposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo su scelta esplicita**: il gruppo deve avere `publicRoster` attivo (predefinito disattivato). La proiezione è volutamente minima — `personId`, `displayName`, `leader`, foto — senza campi di contatto o dati demografici |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Restituisce l'albero sede → servizio → orario; il renderer di apphelper emette a titolo indicativo JSON-LD `Event` di schema.org a partire da esso (l'API restituisce dati semplici) |

:::warning
`publicRoster` è il controllo sulla privacy per `staffGrid`. Non ampliare mai la proiezione pubblica dei membri del gruppo né aggirare il flag — l'endpoint dell'elenco è anonimo per progetto, e l'elenco ristretto dei campi è la proprietà che garantisce la sicurezza.
:::

### Elemento calendario e pagine degli eventi

Le risposte dell'elemento `calendar` sono `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, predefinito, oppure `upcoming`) e `tag`. B1App sovrascrive il renderer di apphelper in `src/components/Element.tsx` con `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** mostra `UpcomingEventsElement` di B1App: carica `GET /content/events/public/group/:churchId/:groupId` oppure `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, espande le ricorrenze con `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, una occorrenza per evento entro un anno) e mostra le prime 12 come riquadri fotografici (`events.photoUrl`, con ripiego sul titolo sul colore scuro del tema) che rimandano a `/events/{id}`, con un menu Iscriviti per il feed ICS del calendario.
- **`display: "month"`** mostra il `CalendarElement` di apphelper con una callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` poi navigano a quell'URL al clic, invece di aprire la finestra di dettaglio (B1Admin non passa `eventUrl`, quindi il calendario amministrativo mantiene la sua finestra).
- **`tag`** filtra entrambe le visualizzazioni con `EventHelper.hasTag()` (`@churchapps/helpers`): una corrispondenza senza distinzione tra maiuscole e minuscole con `events.tags` separati da virgola; se vuoto mostra tutto. La join del calendario curato seleziona `e.tags`, così gli eventi curati li riportano.

Gli eventi curati rimandano tramite `realEventId` (`eventPageId()`), quindi l'URL indica sempre l'evento sottostante. `/{sdSlug}/events/[eventId]` è una rotta dedicata (non la pipeline del builder): carica `GET /content/events/public/:churchId/:id` — che restituisce `null` per eventi in attesa o rifiutati e per eventi privati senza registrazione, e aggiunge `roomNames` dalle prenotazioni di sale non rifiutate — mostra `EventPageContent` (immagine di copertina, descrizione in markdown, riquadro laterale Quando/Dove, **Registrati a questo evento** quando `registrationEnabled` è attivo, e un link **Aggiungi al mio calendario** verso `GET /content/events/public/:churchId/:id/ical`), usa la foto come immagine Open Graph ed emette JSON-LD `Event` per la prossima occorrenza tramite `EventPageJsonLd`. Un evento sconosciuto o nascosto restituisce un vero 404.

## Widget a livello di sito

Due widget vengono mostrati in ogni pagina pubblica, al di fuori dell'albero: **AnnouncementBanner** (barra in cima alla pagina chiudibile) e **Launcher** (hub di azioni flottante per link in stile dona/visita/guarda). Entrambi i componenti e i rispettivi helper `parse*Config()` sono forniti da apphelper. La configurazione è costituita da due righe di impostazioni pubbliche, con chiavi `announcementBanner` e `launcher`, scritte dalla `SiteWidgetsEdit` di B1Admin (nella pagina Aspetto) e lette dal layout pubblico di B1App tramite `GET /content/settings/public/:churchId`. L'API tratta queste chiavi come coppie chiave-valore opache; i nomi delle chiavi sono una convenzione condivisa tra le due app.

## Blog

Il blog è un tipo di contenuto autonomo, non uno strato sopra le pagine del builder. Una riga `posts` contiene l'intero articolo: `title`, `slug`, `excerpt`, `content` (corpo in markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Superficie pubblica (tutta anonima, `PostController`):

| Rotta | Scopo |
|-------|------|
| `GET /content/posts/public/:churchId` | Articoli pubblicati, filtrabili con `?category=&tag=`, paginati |
| `GET /content/posts/public/:churchId/categories` | Categorie distinte tra gli articoli pubblicati |
| `GET /content/posts/public/:churchId/slug/:slug` | Un singolo articolo pubblicato |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, intitolato con il nome della chiesa, con categoria per voce e descrizione con estratto o contenuto |

Un articolo è "pubblicato" quando `publishDate` è impostata ed è passata; una `publishDate` futura indica un articolo programmato (nascosto al pubblico, mostrato con un chip Programmato nell'amministrazione). Gli endpoint di lettura arricchiscono ogni articolo con `authorName`, risolto da `authorId` tramite il gateway del modulo membership. Gli estratti mancanti ricadono sul contenuto markdown senza formattazione (circa 160 caratteri) nelle schede di elenco, nelle meta description e nell'RSS. B1App serve `/{sdSlug}/blog` — un elenco editoriale (intestazione centrata che diventa il nome della categoria/tag attivo quando è filtrato, riga di chip di categoria, righe di articolo con miniatura a sinistra, firma e estratto), con il feed RSS pubblicizzato come link alternativo — e `/{sdSlug}/blog/[postSlug]`, una rotta dedicata (non la pipeline Zone/Section) con intestazione centrata (etichetta della categoria, titolo, firma, filetto con il colore primario), un'immagine di copertina 16:9 alla larghezza del contenitore, il corpo markdown in una colonna di lettura di circa 720px, chip dei tag nel piè di articolo, una striscia "Altro in {category}" con articoli correlati, e JSON-LD `BlogPosting` che include l'autore. Entrambe le pagine si stilizzano interamente con i token del tema, così ereditano la tavolozza di ciascuna chiesa. Gli URL del blog sono inclusi nella sitemap per chiesa. L'interfaccia di creazione di B1Admin (**Sito → Blog**) modifica gli articoli in una finestra di dialogo: editor markdown con interruttore di anteprima, selettore immagini dalla galleria ritagliate 16:9, selettore persona per l'autore (predefinito sull'utente che modifica), completamento automatico delle categorie basato sulle categorie esistenti, validazione di slug duplicati e un interruttore di pubblicazione; le righe pubblicate rimandano all'articolo live, e la pagina invita gli amministratori ad aggiungere un link di navigazione `/blog`. I commenti sono affidati a servizi di terze parti: un'impostazione pubblica di contenuto a livello di chiesa, `blogFooterHtml` (modificata in **Sotto ogni articolo** nella pagina Blog, visibile solo con Impostazioni→Modifica), viene renderizzata sotto ogni articolo dal componente `BlogFooterEmbed` di B1App, che ricrea i tag `<script>` così da eseguirli sotto `'strict-dynamic'` e li esegue in ordine (un `src` esterno termina il caricamento prima che parta lo script inline successivo), poiché gli snippet dei fornitori caricano una libreria e poi la invocano.

## Pagine riservate ai membri

`pages.visibility` riutilizza l'enum dei link di navigazione — `everyone` (predefinito), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`) — ma come **barriera di accesso rigida**, non come filtro di navigazione (`PageVisibilityHelper.canViewPage`). Il flusso:

1. L'endpoint anonimo dell'albero verifica la visibilità sulle richieste basate su URL. I chiamanti anonimi di una pagina protetta ricevono `{ restricted: true, visibility }` al posto del contenuto — l'albero non trapela mai.
2. L'endpoint rispetta comunque un JWT: `CustomAuthProvider` verifica l'header `Authorization` su *ogni* richiesta, comprese le rotte anonime, quindi la richiesta di un membro autenticato per lo stesso URL viene risolta normalmente.
3. B1App renderizza `RestrictedPage` su una risposta `restricted`: reidrata la sessione dalle credenziali salvate, richiede di nuovo l'albero con il JWT e lo mostra — oppure mostra una barriera di accesso con un `returnUrl` quando non esiste una sessione.

:::info
La granularità della barriera varia tra i livelli: `groups` confronta i `groupIds` del token con l'elenco della pagina e `staff` controlla `membershipStatus`, mentre `members` e `team` al momento accettano qualsiasi utente autenticato della chiesa. Considera `groups` come l'opzione restrittiva.
:::

## SEO e reperibilità

Tutto questo è rendering lato B1App sui dati di ContentApi — l'API memorizza, l'app emette:

| Aspetto | Funzionamento |
|---------|--------------|
| Meta description | `pages.metaDescription` (≤300 caratteri) passa da `MetaHelper.getMetaData()` nel `Metadata` di Next.js (description + Open Graph) su ogni rotta renderizzata dal builder. Le impostazioni della pagina in B1Admin includono un pulsante "Genera" basato su AI (vedi sotto) |
| Redirect | Righe `redirects` per chiesa gestite in `/content/redirects` (`content.edit`, limite di 200 righe, percorsi normalizzati). In caso di un possibile 404, la rotta di pagina di B1App risolve il percorso su `GET /content/redirects/public/:churchId` ed emette un HTTP 308 tramite `permanentRedirect` di Next; i percorsi non corrispondenti passano a `notFound()` |
| 404 brandizzata | `not-found.tsx` mostra `BrandedNotFound` con il logo, il nome e il tema della chiesa invece di un errore generico. I percorsi sconosciuti `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` e `/volunteer/[planId]` restituiscono un vero 404, così come i sottodomini sconosciuti e gli slug di pagina malformati (vedi [Routing del sito web e multi-sito](./websites)) |
| Dati strutturati | JSON-LD `BlogPosting` sugli articoli del blog; `VideoObject` sulle pagine dei singoli sermoni (`/{sdSlug}/sermons/[sermonId]`) e sulle pagine che contengono un elemento `sermons`; `Event` dagli elementi calendario/evento nelle pagine del builder e su ogni pagina `/{sdSlug}/events/[eventId]` (prossima occorrenza, con la foto dell'evento come `image`); `Event` di schema.org dall'elemento `serviceTimes` |
| Pagine dei sermoni | Ogni sermone pubblico ha una pagina scansionabile in `/sermons/[sermonId]` con metadati completi — i sermoni non sono più bloccati all'interno del browser lato client |
| Analitiche | La chiave di impostazione pubblica `ga4MeasurementId` (gestita accanto ai redirect in B1Admin) inietta un gtag GA4 per chiesa tramite `next/script`. L'app B1 (`/{sdSlug}/mobile`) invia anch'essa le visualizzazioni di pagina a quell'ID, insieme al tag di ChurchApps, quando è un ID `G-` valido (gli ID dei contenitori GTM restano solo per il sito web). Ogni `gtag('config')` porta un `display_mode` pari a `installed` o `browser`, in base a `navigator.standalone` o alla media query `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap e feed | La rotta `sitemap.xml` per chiesa include le pagine del builder, gli URL del blog e le 50 pagine dei sermoni più recenti (con `<lastmod>` dalla data di pubblicazione di ogni sermone). Elenca anche le pagine integrate `/sermons`, `/groups` e `/volunteer` quando hanno contenuto (gruppi pubblici, piani di iscrizione), a meno che un redirect salvato non sostituisca quel percorso. `/` viene omessa quando la chiesa non ha una home page, perché `/` in quel caso reindirizza a `/mobile`, che è escluso. L'elenco del blog pubblicizza il feed RSS |
| Accessibilità | La parte pubblica dell'interfaccia mostra un link di salto che punta al landmark `<main id="main-content">` in ogni wrapper di layout |

## Generazione AI (AskApi)

La generazione di pagine e siti viene eseguita in **AskApi**, un servizio separato, sotto il controller `/website`. Si autentica con lo stesso JWT di `CustomAuthProvider` usato da tutto il resto ed è **senza stato rispetto ai contenuti**: ogni endpoint restituisce JSON e il chiamante (B1Admin) salva il risultato tramite ContentApi (`POST /content/pages/importTree` crea una pagina con l'intero albero annidato di sezioni/elementi in un'unica chiamata; inserisce sempre sotto la chiesa del chiamante e ignora gli id presenti nel corpo).

### Generazione della pagina (`planPage` → `writePage`)

Il modello di pagina "AI" in `AddPageModal` di B1Admin usa una pipeline a basso costo (`AskApi/src/helpers/SiteGenHelper.ts`) fondata su una regola: **nessun modello emette JSON del builder**. Due modelli dividono il lavoro tramite il Vercel AI Gateway (HTTP semplice, chiave SSM `/{env}/aiGatewayApiKey` oppure `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — un modello di decisione tipizzata che restituisce scelte, punteggi e booleani con probabilità, ma non può scrivere testo. Sceglie una sezione alla volta da una libreria fissa di modelli, valuta i layout, verifica i fatti dei testi e sceglie le foto di repertorio e le icone. Il costo dell'input è circa 0,04 dollari per milione di token e l'output è gratuito, quindi circa 90 chiamate per pagina costano una frazione di centesimo.
- **Un piccolo modello di chat (GPT-4.1 mini per impostazione predefinita)** — riempie gli slot di testo con nome e lunghezza massima dei modelli scelti. Lo scrittore è una costante, sovrascrivibile con la variabile d'ambiente `SITEGEN_COPY_MODEL` (qualsiasi id di modello di chat sul gateway, ad esempio `anthropic/claude-haiku-4.5`). In un confronto alla cieca su tre chiese, Claude Haiku 4.5 è risultato leggermente più caloroso, ma GPT-4.1 mini era vicino, circa quattro volte più economico e più veloce, quindi è il predefinito. Una pagina completa con tutti e tre i layout costa circa 1,3 centesimi, di cui circa l'80% è dello scrittore.

| Fase | Endpoint | Cosa succede |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classifica il tipo di pagina (home, visita, chi siamo…), poi campiona 10 layout candidati dalle probabilità per turno di JEV (eroe + numero di sezioni → ogni sezione → chiusura), elimina i duplicati, fa valutare a JEV ciascuno per adeguatezza/flusso/lacune, e restituisce i primi 3 più una voce di scrittura e un `suggestedStyle` (tavolozza + font). I candidati che condividono finora le stesse sezioni pongono a JEV una domanda identica, quindi i turni sono memorizzati in cache per prefisso. Un punteggio migliore inferiore a 6 viene registrato come `lowLayoutScore` — quel log è l'elenco dei modelli da aggiungere. ~2 s |
| 2 | `POST /website/writePage` (una chiamata per candidato) | Lo scrittore riempie il testo degli slot due sezioni per chiamata, in parallelo, e restituisce cinque titoli principali tra cui JEV sceglie; JEV verifica i fatti di ogni sezione; le sezioni che non superano il controllo, usano una frase fatta o ripetono una sezione precedente (sequenze condivise di 4 parole, verificate nel codice) vengono riscritte in parallelo con il motivo specifico; uno scrub nel codice elimina le frasi con formule ricorrenti dei siti di chiesa (a meno che la descrizione della chiesa stessa le usi); JEV sceglie soggetti fotografici, icone e il separatore di forma dell'eroe, e valuta il risultato. Restituisce un albero di sezioni pronto da salvare e un punteggio. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin scrive solo il layout migliore in classifica (il secondo è un ripiego se quella scrittura fallisce), lo salva e apre l'anteprima (~10 s dopo Salva) |

Ogni fase è una richiesta a sé, così ogni chiamata resta entro il limite di 29 secondi dell'API Gateway. I modelli in `SiteGenHelper.buildTree` sono alberi fissi di sezioni ed elementi della libreria (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) e fanno riferimento ai token del tema (`var(--accent)`, `var(--lightAccent)`…), così le pagine generate ereditano le impostazioni di aspetto già presenti nella chiesa. Aggiungere un modello di sezione significa aggiungere la sua lista di slot a `SECTIONS` e il suo albero a `buildTree`; il test unitario percorre ogni modello e ne valida l'albero.

**Input.** Il testo può affermare fatti solo da due fonti: ciò che l'utente ha digitato e `churchContext.facts` — registrazioni raccolte da B1Admin prima della pianificazione (orari di servizio pubblici e nomi pubblici dei gruppi, più il nome e l'indirizzo della chiesa). Gli stessi flag regolano i modelli basati sui dati: `times` mostra l'elemento `serviceTimes` dal vivo quando la chiesa gestisce gli orari di servizio in B1 (altrimenti una tabella digitata), mentre `groups` e `countdown` vengono proposti solo quando c'è dato dietro di loro. Le chiamate a JEV sono coperte da una seconda richiesta: un duplicato parte dopo 1,5 secondi e vince la prima risposta, perché il gateway a volte si blocca e le chiamate costano quasi nulla.

**Restare sull'argomento.** Il prompt dell'utente è l'*argomento della pagina*, non un'informazione di sfondo sulla chiesa. `planPage` classifica la richiesta (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), e per le pagine `event` e `topic` i modelli generici della chiesa (nota del pastore, sermoni, ministeri, gruppi, impatto sulla comunità, orari settimanali e conto alla rovescia, eroe video) non vengono nemmeno proposti, mentre vengono proposti `details` (quando / dove / cosa portare) e un `eventCountdown` con la data. Entrambi i giudici valutano la pertinenza. B1Admin passa `pageType` dal piano a ogni chiamata `writePage`.

**Pagine complete da richieste brevi.** Le pagine hanno da tre a sei sezioni centrali, lunghezze generose degli slot, una riga introduttiva nelle sezioni a schede e un FAQ di cinque domande, e il passaggio di riparazione espande ogni sezione che risulta troppo scarna. La generazione richiede un solo clic: non ci sono domande di approfondimento. Quando la richiesta omette un dettaglio ordinario ma necessario per una pagina completa (un orario di inizio, una sala, cosa portare, come iscriversi), lo scrittore lo completa con una scelta plausibile e misurata, che la chiesa può modificare. Poiché le sezioni vengono scritte in parallelo, questi vuoti vengono decisi **una sola volta**, in `planPage` (`assumedDetails`, una piccola chiamata allo scrittore che gira insieme al campionamento dei layout), e vengono ripassati a ogni chiamata `writePage` tramite `churchContext.assumedDetails`, così una sezione non può dire 5:00 mentre un'altra dice 5:30. JEV corregge ogni sezione che contraddice la richiesta, le registrazioni della chiesa o questi dettagli decisi. I dettagli decisi non vengono mostrati nell'interfaccia; la chiesa rivede e modifica la pagina come qualsiasi altra. Alcune cose non vengono mai inventate: nomi di persone, numeri di telefono, indirizzi email e web, prezzi, statistiche, la storia della chiesa, citazioni attribuite a persone, e il giorno della settimana per una data che la richiesta non ne indicava uno.

**Elementi visivi.** I modelli non indicano mai le loro foto o icone. Lasciano slot aperti, e un unico passaggio generico (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) percorre l'albero finito e li riempie tutti: lo sfondo di una sezione o una voce di galleria contrassegnata `auto:photo`, un `auto:icon`, il `auto:divider` dell'eroe e, senza alcun contrassegno, qualsiasi elemento `textWithPhoto`, `card` o `image` il cui `photo` è vuoto. JEV sceglie ciascuno in base al testo accanto (la foto di una scheda dal titolo e dal testo della scheda; uno sfondo dal testo della sezione), senza ripetere un soggetto in una stessa pagina. Un nuovo modello riceve quindi foto gratuitamente. Le foto sono termini di ricerca di Pexels emessi come segnaposto `pexels:<term>` che B1Admin risolve tramite `POST /content/stock/search`; un client che non invia `resolvesPhotos` riceve un'immagine di copertina integrata, fasce di colore piatto e schede senza foto. Di proposito non ci sono soggetti ritratto, e il modello del pastore non contiene foto: un estraneo di repertorio non deve mai sostituire una persona reale. Per una chiesa che non ha ancora pagine, B1Admin applica `suggestedStyle` agli stili globali; i siti esistenti conservano il loro aspetto.

### Altri endpoint

:::info
Il pulsante di riscrittura di `SectionToolbar` e il pulsante "Genera sito" nell'elenco delle pagine di B1Admin restano commentati lato client. Gli endpoint di AskApi qui sotto continuano a rispondere; è nascosta solo l'interfaccia.
:::

| Endpoint | Scopo |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Il flusso originale in due passaggi (struttura, poi una chiamata LLM per sezione che emette JSON degli elementi). Sostituito in B1Admin da `planPage`/`writePage` per motivi di costo; mantenuto per i consumatori dell'API |
| `POST /website/generateSite` | Generazione dell'intero sito. **In due fasi per progetto**: una chiamata con `planOnly: true` restituisce solo il piano multipagina (una chiamata rapida al modello), poi il client richiede il contenuto completo — mantenendo ogni richiesta entro il timeout di Lambda/API Gateway |
| `POST /website/rewriteSection` | Riscrittura che preserva la struttura: il modello può modificare solo le risposte contenenti testo. Una firma strutturale ricorsiva (id + tipi + ordine) viene confrontata prima e dopo; qualsiasi discrepanza restituisce la sezione originale con `fallback: true` invece di una struttura corrotta |
| `POST /website/generateAltText` | Chiamata di visione su fino a 20 URL di immagini; restituisce un testo alternativo conciso (≤125 caratteri, senza prefissi "foto di") |
| `POST /website/generateMetaDescription` | Una meta description SEO (≤155 caratteri) dal testo della pagina — collegata al pulsante Genera nelle impostazioni della pagina di B1Admin |

I prompt di questi endpoint sono file markdown sotto `AskApi/config/instructions/`, incluso il catalogo degli elementi da cui il modello genera. Due scelte di progettazione mantengono onesto il catalogo: il client passa `availableElementTypes` in ogni richiesta (il prompt può usare solo tipi presenti in quella lista — il server non codifica mai l'insieme completo), e lo strumento MCP `describe_page_builder` dell'API contiene la stessa guida per gli agenti AI che lavorano tramite [MCP](../api/mcp). I modelli sono Anthropic Claude tramite OpenRouter — 3.5 Haiku per il contenuto delle sezioni (latenza), 3.5 Sonnet per le strutture, i piani del sito e la visione — con un ripiego su OpenAI quando non è configurata alcuna chiave OpenRouter.

## Moduli conversazionali

I moduli (modulo membership) hanno acquisito una modalità conversazionale pensata per pagine in stile connect card. Quattro colonne della tabella `forms` la regolano: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — `FormSubmissionEdit` di apphelper passa al componente `ConversationalForm` (una domanda alla volta) quando `displayMode` è `conversational`; la pagina del modulo di B1App trasmette la modalità. Il payload dell'invio è lo stesso in entrambi i casi.
- **Creazione automatica della persona** — all'invio con `autoCreatePerson` attivo, `ConversationalFormHelper.findOrCreatePerson` elimina i duplicati per email (senza distinzione tra maiuscole e minuscole) e altrimenti crea un nucleo + una persona con `membershipStatus: "Guest"`, quindi collega l'invio a quella persona.
- **Email di follow-up** — quando sono impostati oggetto e corpo, chi ha inviato riceve un'email basata su modello (con i token `{firstName}` / `{churchName}`) attraverso il percorso transazionale esistente (`TransactionalEmailHelper`), mai dal canale del riepilogo delle notifiche. Entrambi gli effetti collaterali non sono fatali: un errore non fa mai perdere l'invio.

I quattro campi oggi si impostano tramite l'API; l'editor dei moduli di B1Admin non li espone ancora.

## Cache del sito pubblico

Il percorso di rendering pubblico di B1App mette in cache le richieste con tag di chiesa (`next: { revalidate: 300, tags: [sdSlug] }` in produzione; `0` in sviluppo), quindi una pagina attiva può restare obsoleta per fino a cinque minuti dopo una scrittura in ContentApi. `POST /api/revalidate/{sdSlug}` su B1App chiama `revalidateTag(sdSlug)` ed è l'unico modo per svuotare anticipatamente quella cache.

Due componenti vi scrivono:

1. **B1Admin** — `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` esegue una POST dopo i salvataggi dell'editor. Preferisce il sottodominio del sito attivo (un sito secondario deve invalidare *quel* tag, non quello della chiesa predefinita).
2. **Api** — le modifiche ai contenuti che non passano da B1Admin (chiavi API, MCP, AI) attivano `SiteCacheHelper.bump(churchId)` dai controller dei contenuti. L'helper risolve il sottodominio della chiesa tramite `SubDomainHelper` ed esegue una POST verso `{b1AppRoot}/api/revalidate/{sd}`. Gli errori vengono ignorati, così un B1App non raggiungibile non può far fallire un salvataggio.

I controller che eseguono il bump sono: pagine (salvataggio, eliminazione, duplicazione, pubblicazione, scarto, annullamento della pubblicazione, bozza AI), sezioni, elementi, blocchi, link, stili globali, articoli e redirect. In sviluppo `b1AppRoot` è `http://{subdomain}.localtest.me:3301`; demo e produzione usano `https://{subdomain}.b1.church`.

## Pagine correlate

- [Routing del sito web e multi-sito](./websites) — come una richiesta si risolve in una chiesa/sito e come i domini personalizzati vengono instradati
- [Endpoint Content](../api/endpoints/content) — superficie REST completa per pagine, sezioni, elementi, blocchi, articoli, redirect e impostazioni
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che fornisce i renderer, il registro, i separatori e i widget
- [Server MCP](../api/mcp) — incluso lo strumento guida `describe_page_builder`
- [Editor di pagine (utente finale)](/docs/b1-admin/website/page-editor) — la documentazione dell'editor per lo staff
