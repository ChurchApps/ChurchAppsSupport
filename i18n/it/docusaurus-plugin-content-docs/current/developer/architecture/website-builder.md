---
title: "Architettura del costruttore di siti web"
---

# Architettura del costruttore di siti web

<div class="article-intro">

Ogni sito web di chiesa servito da B1App viene generato da un albero di contenuti -- pagine, sezioni, elementi -- memorizzati in ContentApi e modificati visivamente in B1Admin. Una libreria di componenti condivisa genera sia l'anteprima dell'editor sia il sito pubblico, un catalogo di tipi di elementi definisce cosa può comparire in una pagina, e un servizio IA separato può generare o riscrivere quell'albero. Questa pagina mappa l'intero stack: il contratto degli elementi in `@churchapps/helpers`, la pipeline di rendering, gli elementi con dati della chiesa, i widget a livello di sito, lo strato del blog, le pagine con accesso controllato, la SEO, la generazione con IA e i moduli conversazionali.

</div>

## Panoramica

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — modulo /content (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pagine ─ sezioni ─ elementi   blocchi  │
│  SiteWidgetsEdit · Blog      │             │  articoli   reindirizzamenti  impostazioni · stili │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        pipeline di rendering condivisa          ▼            (anonimo, JWT accettato)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — sito pubblico (Next.js)│
               │    ElementTypes.ts (catalogo) │   │  Zona → Sezione → Elemento      │
               │  @churchapps/apphelper        │   │  + widget, JSON-LD, sitemap,    │
               │    ElementRegistry, renderer  │   │    reindirizzamenti, 404 con    │
               │    SectionDivider, widget     │   │    marchio                      │
               └───────────────────────────────┘   └───────────────┬─────────────────┘
┌──────────────────────────────┐                                   │ elementi con dati della chiesa
│  AskApi — /website/* (IA)    │                                   ▼
│  generateSite · rewriteSection│             ┌─────────────────────────────────────────┐
│  generateAltText · metaDesc  │             │  /giving/funds/public/…/total           │
│  restituisce JSON; B1Admin   │             │  /membership/groupmembers/public/…      │
│  salva                       │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Tre regole valgono per l'intero stack:

1. **Un albero, due renderer.** Una pagina è un albero `pagine → sezioni → elementi` in cui ogni nodo porta le proprie impostazioni come blob JSON `answers`. Gli stessi componenti di apphelper generano l'editor drag-and-drop in B1Admin e il sito pubblico lato server in B1App -- non esiste un "formato di pubblicazione" separato.
2. **Il contratto vive in `@churchapps/helpers`.** `ElementTypes.ts` è l'unico catalogo dei tipi di elemento; i renderer si risolvono tramite un registro in apphelper; i moduli di modifica vivono in B1Admin. Aggiungere un tipo di elemento significa toccare tutti e tre, in quest'ordine.
3. **Il sito pubblico legge endpoint anonimi.** Tutto ciò di cui B1App ha bisogno -- l'albero della pagina, le impostazioni, gli articoli del blog, i reindirizzamenti e gli endpoint dei dati della chiesa negli altri moduli -- è pubblico. L'autenticazione è facoltativa: un JWT sull'endpoint anonimo dell'albero sblocca le pagine riservate ai membri, nient'altro cambia.

## L'albero dei contenuti

Il modulo content (`Api/src/modules/content`) gestisce i dati del costruttore:

| Tabella | Ruolo |
|-------|------|
| `pages` | Una pagina per URL: `url`, `title`, `layout`, più `visibility`/`groupIds` (controllo degli accessi) e `metaDescription` (SEO) |
| `sections` | Fasce orizzontali su una pagina (o in un blocco): sfondo, colore del testo e un `answersJSON` che porta lo stile più le configurazioni `dividerTop`/`dividerBottom` dei separatori di forma |
| `elements` | Pezzi di contenuto all'interno di una sezione: `elementType` + `answersJSON`, annidabili per i tipi di layout (riga/colonna, carosello) |
| `blocks` | Gruppi riutilizzabili di sezioni/elementi (blocchi del piè di pagina, blocchi di elementi) condivisi tra pagine |
| `posts` | Articoli di blog autonomi (vedi [Blog](#blog)) |
| `redirects` | Coppie `fromPath → toPath` per chiesa, limitate a 200 (vedi [SEO](#seo-and-discoverability)) |
| `settings` | Impostazioni della chiesa chiave-valore; le righe contrassegnate `public` sono servite in modo anonimo e contengono la configurazione dei widget e dell'analisi |

L'intero albero per un URL torna da un'unica chiamata anonima -- `GET /content/pages/:churchId/tree?url=/about` -- ed è da lì che B1App genera il rendering lato server. Le richieste dell'editor recuperano invece per id e mantengono gli id interni.

## Il contratto degli elementi

### Il catalogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definisce ogni tipo di elemento come `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` e un `answersSchema` in stile JSON-schema per le sue risposte. `validateElementAnswers()` è volutamente permissiva -- tipi sconosciuti e chiavi extra passano, così i vecchi contenuti non si rompono quando il catalogo viene aggiornato. **Oggi sono distribuiti 35 tipi:**

| Categoria | Tipi di elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

L'elemento `sermons` è il più configurabile tra quelli della chiesa: una risposta `layout` seleziona `browse` (il vecchio browser completo), `grid`, `list` o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles` e `showDates` che raffinano i layout diversi da browse.

L'elemento `rawHTML` ha due risposte: `rawHTML` (markup) e `javascript`. Gli script inseriti tramite `innerHTML` non vengono mai eseguiti, quindi `RawHTMLElement` ricrea ogni nodo `<script>` presente nel markup come nuovo elemento. Questi nodi non inseriti dal parser sono considerati attendibili sotto lo `strict-dynamic` della CSP. Una risposta `javascript` che inizia con `<` (uno snippet di un fornitore incollato con i suoi tag `<script>`) viene analizzata come markup e riceve lo stesso trattamento. Altrimenti viene eseguita come semplice script inline. B1Admin segnala un URL nudo nella casella JavaScript, perché un URL isolato viene eseguito come script senza effetti. L'elemento `map` non genera nulla e non carica alcuno script di Google Maps quando non è configurata una chiave API di Maps.

### Renderer (`@churchapps/apphelper`)

I renderer si trovano in `Packages/apphelper/src/website/components/elementTypes/`, un componente per tipo, risolti tramite `ElementRegistry.ts` -- una mappa a due livelli in cui `Element.tsx` registra il renderer predefinito per tutti i 35 tipi (`registerDefaultElementRenderer`) e un'app host può sovrascriverne qualsiasi tipo a runtime (`registerElementRenderer`) senza fare un fork del pacchetto.

### Moduli di modifica (B1Admin)

I moduli di impostazione per tipo dell'editor si trovano in `B1Admin/src/site/admin/elements/` -- `ElementEdit.tsx` smista verso un componente dedicato (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) oppure verso un costruttore di campi inline per tipo. Lo specchio rivolto all'IA di questo catalogo è lo strumento MCP `describe_page_builder` dell'API (vedi [Server MCP](../api/mcp)).

L'anteprima dell'editor monta lo stesso `Theme` del sito pubblico, che imposta le variabili CSS `--headingFont` / `--bodyFont` a partire dagli stili globali della chiesa. B1App applica queste variabili tramite `pages.css`, che B1Admin non può importare, quindi `ContentEditor.tsx` inietta `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) per applicarle al testo del corpo `.page` e a `h1`–`h6`. Senza di esso, l'anteprima mostrava i titoli con il carattere dell'amministrazione.

### Separatori di forma delle sezioni

Le sezioni possono avere separatori decorativi di forma su entrambi i bordi. La configurazione si trova nel `answersJSON` della sezione come oggetti `dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }` con `shape` uno tra `wave, waves, slant, curve, triangle, peaks`. Apphelper distribuisce il componente `SectionDivider` e l'helper `parseDividerConfig()`; i renderer di Section di entrambe le app (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analizzano le risposte e montano il separatore, e `SectionEdit.tsx` in B1Admin fornisce il selettore. I pacchetti distribuiscono solo il blocco di base -- il collegamento a livello di sezione è compito delle app che li usano.

## Elementi con dati della chiesa

Tre tipi di elemento mostrano dati reali della chiesa invece di contenuti creati a mano. Resta valido l'isolamento dei moduli -- ciascuno chiama l'endpoint pubblico del modulo proprietario direttamente dal browser:

| Elemento | Endpoint | Note |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Restituisce `{ fundId, totalAmount, donationCount }`, con una finestra facoltativa `?startDate=&endDate=`; l'elemento lo confronta con la sua risposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo su adesione**: il gruppo deve avere `publicRoster` impostato (predefinito disattivato). La proiezione è volutamente minima -- `personId`, `displayName`, `leader`, foto -- nessun campo di contatto o demografico |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Restituisce l'albero sedi → culti → orari; il renderer di apphelper emette JSON-LD schema.org `Event` a partire da esso, in modo best-effort (l'API restituisce dati semplici) |

:::warning
`publicRoster` è il controllo di privacy per `staffGrid`. Non ampliare mai la proiezione pubblica dei membri del gruppo né aggirare il flag -- l'endpoint dell'elenco è anonimo per progettazione, e l'elenco minimo dei campi è la proprietà di sicurezza.
:::

### Elemento calendario e pagine degli eventi

Le risposte dell'elemento `calendar` sono `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, il predefinito, oppure `upcoming`) e `tag`. B1App sovrascrive il renderer di apphelper in `src/components/Element.tsx` con `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderizza `UpcomingEventsElement` di B1App: carica `GET /content/events/public/group/:churchId/:groupId` oppure `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, espande le ricorrenze con `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, una occorrenza per evento entro un anno) e mostra i primi 12 come riquadri con foto (`events.photoUrl`, con ripiego sul titolo sul colore scuro del tema) collegati a `/events/{id}`, con un menu Iscriviti per il feed ICS del calendario.
- **`display: "month"`** renderizza il `CalendarElement` di apphelper con una callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` poi navigano a quell'URL al clic invece di aprire la finestra di dettaglio (B1Admin non passa `eventUrl`, quindi il calendario amministrativo mantiene la sua finestra).
- **`tag`** filtra entrambe le visualizzazioni con `EventHelper.hasTag()` (`@churchapps/helpers`): una corrispondenza senza distinzione tra maiuscole e minuscole con `events.tags`, separati da virgola; vuoto mostra tutto. La join del calendario curato seleziona `e.tags` così gli eventi curati portano con sé i tag.

Gli eventi curati si collegano tramite `realEventId` (`eventPageId()`), quindi l'URL indica sempre l'evento sottostante. `/{sdSlug}/events/[eventId]` è una rotta dedicata (non la pipeline del costruttore): carica `GET /content/events/public/:churchId/:id` -- che restituisce `null` per gli eventi in attesa/rifiutati e per gli eventi privati senza iscrizione, e aggiunge `roomNames` dalle prenotazioni di sale non rifiutate -- renderizza `EventPageContent` (foto in apertura, descrizione in markdown, riquadro Quando/Dove, **Iscriviti a questo evento** quando `registrationEnabled`, e un link **Aggiungi al mio calendario** a `GET /content/events/public/:churchId/:id/ical`), usa la foto come immagine Open Graph ed emette `Event` JSON-LD per la prossima occorrenza tramite `EventPageJsonLd`. Un evento sconosciuto o nascosto restituisce un vero 404.

## Widget a livello di sito

Due widget compaiono su ogni pagina pubblica anziché all'interno dell'albero: **AnnouncementBanner** (barra in cima alla pagina chiudibile) e **Launcher** (hub fluttuante di azioni per link tipo dona/visita/guarda). Entrambi i componenti e i rispettivi helper `parse*Config()` sono distribuiti in apphelper. La configurazione è in due righe di impostazioni pubbliche con chiavi `announcementBanner` e `launcher`, scritte da `SiteWidgetsEdit` di B1Admin (nella pagina Aspetto) e lette dal layout pubblico di B1App tramite `GET /content/settings/public/:churchId`. L'API tratta queste come coppie chiave-valore opache; i nomi delle chiavi sono una convenzione tra le due app.

## Blog {#blog}

Il blog è un tipo di contenuto autonomo, non uno strato sopra le pagine del costruttore. Una riga `posts` contiene l'intero articolo: `title`, `slug`, `excerpt`, `content` (corpo in markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. La superficie pubblica (tutta anonima, `PostController`):

| Rotta | Scopo |
|-------|---------|
| `GET /content/posts/public/:churchId` | Articoli pubblicati, filtrabili con `?category=&tag=`, paginati |
| `GET /content/posts/public/:churchId/categories` | Categorie distinte tra gli articoli pubblicati |
| `GET /content/posts/public/:churchId/slug/:slug` | Un singolo articolo pubblicato |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, intitolato con il nome della chiesa, con categoria per elemento e descrizione (estratto oppure contenuto) |

Un articolo è "pubblicato" una volta impostato e passato `publishDate`; una `publishDate` futura indica un articolo programmato (nascosto al pubblico, mostrato con un chip Programmato nell'amministrazione). Gli endpoint di lettura arricchiscono ogni articolo con `authorName`, risolto da `authorId` tramite il gateway del modulo membership. Gli estratti mancanti ricadono sul contenuto markdown ripulito (circa 160 caratteri) nelle schede degli elenchi, nelle meta description e nell'RSS. B1App serve `/{sdSlug}/blog` -- un elenco editoriale (intestazione centrata che diventa il nome della categoria/tag attivo quando filtrato, riga di chip per categoria, righe degli articoli con miniatura a sinistra, firma e estratto) con il feed RSS pubblicizzato come link alternativo -- e `/{sdSlug}/blog/[postSlug]`, una rotta dedicata (non la pipeline Zona/Sezione) con intestazione centrata (etichetta della categoria, titolo, firma, filetto di accento nel colore primario), un'immagine di apertura 16:9 alla larghezza del contenitore, il corpo markdown in una colonna di lettura di circa 720px, chip dei tag nel piè dell'articolo, una fascia `"More in {category}"` con articoli correlati e JSON-LD `BlogPosting` che include l'autore. Entrambe le pagine si stilizzano interamente tramite i token del tema, così ereditano la tavolozza di ogni chiesa. Gli URL del blog sono inclusi nella sitemap per chiesa. L'interfaccia di scrittura di B1Admin (**Sito → Blog**) modifica gli articoli in una finestra: editor markdown con interruttore di anteprima, selettore di immagini della galleria ritagliate 16:9, selettore di persone per l'autore (predefinito: l'utente che modifica), completamento automatico della categoria basato sulle categorie esistenti, validazione degli slug duplicati e un interruttore di pubblicazione; gli articoli pubblicati rimandano al link attivo, e la pagina invita gli amministratori ad aggiungere un link di navigazione `/blog`. I commenti sono lasciati a servizi di terze parti: un'impostazione pubblica della chiesa `blogFooterHtml` (modificata in **Sotto ogni articolo** nella pagina Blog, mostrata solo con Impostazioni→Modifica) viene visualizzata sotto ogni articolo dal `BlogFooterEmbed` di B1App, che ricrea i tag `<script>` così vengono eseguiti sotto `'strict-dynamic'` e li esegue in ordine (un `src` esterno termina il caricamento prima che parta lo script inline successivo), poiché gli snippet dei fornitori caricano una libreria e poi la invocano.

## Pagine riservate ai membri

`pages.visibility` riutilizza l'enum dei link di navigazione -- `everyone` (predefinito), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`) -- ma come **controllo di accesso rigido**, non come filtro di navigazione (`PageVisibilityHelper.canViewPage`). Il flusso:

1. L'endpoint anonimo dell'albero controlla la visibilità sulle richieste basate sull'URL. I chiamanti anonimi di una pagina protetta ricevono `{ restricted: true, visibility }` invece del contenuto -- l'albero non trapela mai.
2. L'endpoint accetta comunque un JWT: `CustomAuthProvider` verifica l'intestazione `Authorization` su *ogni* richiesta, comprese quelle sulle rotte anonime, quindi la richiesta di un membro autenticato allo stesso URL viene risolta normalmente.
3. B1App mostra `RestrictedPage` in risposta a un esito `restricted`: idrata la sessione dalle credenziali memorizzate, richiede di nuovo l'albero con il JWT e lo mostra -- oppure mostra un cancello di accesso con un `returnUrl` quando non c'è una sessione.

:::info
La granularità del controllo varia per livello: `groups` verifica i `groupIds` del token rispetto alla lista della pagina e `staff` verifica `membershipStatus`, ma `members` e `team` al momento accettano qualsiasi utente autenticato della chiesa. Considera `groups` come l'opzione rigorosa.
:::

## SEO e reperibilità {#seo-and-discoverability}

Tutto questo è rendering lato B1App sui dati di ContentApi -- l'API memorizza, l'app emette:

| Aspetto | Funzionamento |
|---------|--------------|
| Meta description | `pages.metaDescription` (≤300 caratteri) passa da `MetaHelper.getMetaData()` alle `Metadata` di Next.js (description + Open Graph) su ogni rotta generata dal costruttore. Le impostazioni di pagina di B1Admin includono un pulsante IA "Genera" (vedi sotto) |
| Reindirizzamenti | Righe `redirects` per chiesa gestite in `/content/redirects` (`content.edit`, limite di 200 righe, percorsi normalizzati). In caso di potenziale 404, la rotta di pagina di B1App risolve il percorso su `GET /content/redirects/public/:churchId` ed emette un HTTP 308 tramite `permanentRedirect` di Next; i percorsi non corrispondenti ricadono su `notFound()` |
| 404 con marchio | `not-found.tsx` renderizza `BrandedNotFound` con il logo, il nome e il tema della chiesa invece di un errore generico. I percorsi sconosciuti `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` e `/volunteer/[planId]` restituiscono un vero 404, così come i sottodomini sconosciuti e gli slug di pagina malformati (vedi [Routing del sito web e multi-sito](./websites)) |
| Dati strutturati | JSON-LD `BlogPosting` sugli articoli del blog; `VideoObject` sulle pagine dei singoli sermoni (`/{sdSlug}/sermons/[sermonId]`) e sulle pagine che contengono un elemento `sermons`; `Event` dagli elementi calendario/evento sulle pagine del costruttore e su ogni pagina `/{sdSlug}/events/[eventId]` (prossima occorrenza, con la foto dell'evento come `image`); `Event` di schema.org dall'elemento `serviceTimes` |
| Pagine dei sermoni | Ogni sermone pubblico ottiene una pagina indicizzabile su `/sermons/[sermonId]` con metadati completi -- i sermoni non sono più chiusi all'interno del browser lato client |
| Analisi | L'impostazione pubblica `ga4MeasurementId` (gestita accanto ai reindirizzamenti in B1Admin) inserisce un gtag GA4 per chiesa tramite `next/script`. L'app B1 (`/{sdSlug}/mobile`) invia anche le sue visualizzazioni di pagina a quell'ID, insieme al tag di ChurchApps, quando si tratta di un ID `G-` valido (gli ID container GTM restano solo per il sito web). Ogni `gtag('config')` porta un `display_mode` di `installed` oppure `browser`, in base a `navigator.standalone` o alla media query `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap e feed | La rotta `sitemap.xml` per chiesa include le pagine del costruttore, gli URL del blog e le 50 pagine dei sermoni più recenti (con `<lastmod>` dalla data di pubblicazione di ciascun sermone). Elenca anche le pagine integrate `/sermons`, `/groups` e `/volunteer` quando hanno contenuto (gruppi pubblici, piani per l'iscrizione), a meno che un reindirizzamento salvato non sostituisca quel percorso. `/` viene escluso quando la chiesa non ha una home page, perché `/` in quel caso reindirizza al non consentito `/mobile`. L'elenco del blog pubblicizza il feed RSS |
| Accessibilità | La struttura pubblica mostra un link di salto che punta al punto di riferimento `<main id="main-content">` in ogni wrapper di layout |

## Generazione con IA (AskApi)

La generazione di pagine e siti avviene in **AskApi**, un servizio separato, sotto il controller `/website`. Si autentica con lo stesso JWT di `CustomAuthProvider` usato per tutto il resto ed è **senza stato rispetto ai contenuti**: ogni endpoint restituisce JSON e il chiamante (B1Admin) salva il risultato tramite ContentApi (`POST /content/pages/importTree` crea una pagina con l'intero albero annidato di sezioni ed elementi in una sola chiamata; inserisce sempre sotto la chiesa del chiamante e ignora gli id nel corpo).

### Generazione delle pagine (`planPage` → `writePage`)

Il modello "IA" di `AddPageModal` di B1Admin usa una pipeline a basso costo (`AskApi/src/helpers/SiteGenHelper.ts`) costruita su una regola: **nessun modello emette mai JSON del costruttore**. Due modelli dividono il lavoro tramite il Vercel AI Gateway (HTTP semplice, chiave SSM `/{env}/aiGatewayApiKey` oppure `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — un modello di decisione tipizzato che restituisce scelte, punteggi e booleani con probabilità, ma non può scrivere testo. Sceglie ogni sezione in sequenza da una libreria di modelli fissa, valuta i layout, verifica i fatti dei testi e sceglie le foto e le icone di repertorio. Il costo dell'input è circa 0,04 $ per milione di token e l'output è gratuito, quindi circa 90 chiamate per pagina costano una frazione di centesimo.
- **Un piccolo modello di chat (GPT-4.1 mini per impostazione predefinita)** — riempie gli slot di testo nominati e con lunghezza limitata dei modelli scelti. Lo scrittore è una costante unica, sovrascrivibile con la variabile d'ambiente `SITEGEN_COPY_MODEL` (qualsiasi id di modello di chat sul gateway, ad esempio `anthropic/claude-haiku-4.5`). In un confronto alla cieca su tre chiese, Claude Haiku 4.5 è risultato leggermente più caloroso, ma GPT-4.1 mini era vicino, circa 4 volte più economico e più veloce, quindi è il predefinito. Una pagina completa con tutti e tre i layout costa circa 1,3 centesimi, di cui circa l'80% è lo scrittore.

| Fase | Endpoint | Cosa succede |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classifica il tipo di pagina (home, visita, chi siamo…), poi campiona 10 layout candidati dalle probabilità per turno di JEV (hero + numero di sezioni → ogni sezione → chiusura), deduplica, fa valutare a JEV ciascuno per adeguatezza/flusso/lacune e restituisce i primi 3 più una voce di scrittura e uno `suggestedStyle` (tavolozza + caratteri). I candidati che condividono le stesse sezioni finora pongono a JEV una domanda identica, quindi i turni sono memorizzati per prefisso. Un miglior punteggio inferiore a 6 viene registrato come `lowLayoutScore` -- quel log è l'arretrato dei modelli da aggiungere. ~2 s |
| 2 | `POST /website/writePage` (una chiamata per candidato) | Lo scrittore riempie il testo degli slot due sezioni per chiamata, in parallelo, e restituisce cinque titoli hero tra cui JEV sceglie; JEV verifica i fatti di ogni sezione; le sezioni che falliscono, usano una frase fatta o ripetono una sezione precedente (sequenze condivise di 4 parole, controllate nel codice) vengono riscritte in parallelo con il motivo specifico; una pulizia del codice elimina le frasi con formule generiche da sito di chiesa (a meno che la descrizione della chiesa stessa non le usi); JEV sceglie i soggetti delle foto, le icone e il separatore di forma dell'hero, e valuta il risultato. Restituisce un albero di sezioni pronto da salvare e un punteggio. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin scrive solo il layout con il punteggio migliore (il secondo è di riserva se quella scrittura fallisce), lo salva e apre l'anteprima (~10 s dopo il Salva) |

Ogni fase è una richiesta distinta, così ogni chiamata resta entro il limite di 29 secondi di API Gateway. I modelli in `SiteGenHelper.buildTree` sono alberi fissi di sezioni ed elementi del catalogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) e fanno riferimento ai token del tema (`var(--accent)`, `var(--lightAccent)`…), così le pagine generate ereditano le impostazioni di aspetto già presenti nella chiesa. Aggiungere un modello di sezione significa aggiungere la sua lista di slot a `SECTIONS` e il suo albero a `buildTree`; il test unitario percorre ogni modello e valida l'albero.

**Input.** Il testo può dichiarare solo fatti provenienti da due fonti: ciò che l'utente ha scritto, e `churchContext.facts` -- i record raccolti da B1Admin prima della pianificazione (orari dei culti pubblici e nomi dei gruppi pubblici, più il nome e l'indirizzo della chiesa). Gli stessi flag regolano i modelli basati sui dati: `times` mostra l'elemento live `serviceTimes` quando la chiesa tiene gli orari dei culti in B1 (altrimenti una tabella scritta a mano), e `groups` e `countdown` vengono offerti solo quando dietro ci sono dei dati. Le chiamate a JEV sono coperte da copertura -- un duplicato parte dopo 1,5 secondi e vince la prima risposta -- perché il gateway a volte si blocca e le chiamate costano quasi nulla.

**Restare sull'argomento.** La richiesta dell'utente è l'*argomento della pagina*, non un contesto generale sulla chiesa. `planPage` classifica la richiesta (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), e per le pagine `event` e `topic` i modelli generali della chiesa (nota del pastore, sermoni, ministeri, gruppi, impatto sulla comunità, orari settimanali e conto alla rovescia, hero con video) non vengono nemmeno proposti, mentre vengono proposti `details` (quando / dove / cosa portare) e un `eventCountdown` con data. Entrambi i giudici valutano se il contenuto resta in tema. B1Admin passa il `pageType` del piano a ogni chiamata di `writePage`.

**Pagine complete da richieste brevi.** Le pagine hanno da tre a sei sezioni centrali, slot di lunghezza generosa, una riga introduttiva nelle sezioni a schede e un FAQ di cinque domande, e la passata di riparazione espande qualsiasi sezione che risulti troppo scarna. La generazione è un solo clic: non ci sono domande di approfondimento. Quando la richiesta omette un dettaglio ordinario necessario a una pagina completa (un orario di inizio, una sala, cosa portare, come iscriversi), lo scrittore lo compila con una scelta plausibile e modesta che la chiesa può modificare. Poiché le sezioni vengono scritte in parallelo, questi vuoti vengono decisi **una sola volta**, in `planPage` (`assumedDetails`, una piccola chiamata allo scrittore che gira insieme al campionamento dei layout), e vengono ripassati in ogni chiamata di `writePage` tramite `churchContext.assumedDetails`, così una sezione non può dire 17:00 mentre un'altra dice 17:30. JEV ripara qualsiasi sezione che contraddica la richiesta, i dati della chiesa o quei dettagli decisi. I dettagli decisi non compaiono nell'interfaccia; la chiesa rivede e modifica la pagina come qualsiasi altra. Alcune cose non vengono mai inventate: nomi di persone, numeri di telefono, indirizzi email e web, prezzi, statistiche, la storia della chiesa, citazioni attribuite a persone e il giorno della settimana per una data che la richiesta non indica.

**Immagini.** I modelli non indicano mai le proprie foto o icone. Lasciano slot aperti, e un unico passaggio generico (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) percorre l'albero completato e riempie ciascuno: uno sfondo di sezione o una voce di galleria marcati `auto:photo`, un `auto:icon`, il `auto:divider` dell'hero e, senza alcun marcatore, qualsiasi elemento `textWithPhoto`, `card` o `image` il cui `photo` è vuoto. JEV sceglie ciascuno in base al testo accanto (la foto di una scheda dal titolo e dal testo di quella scheda; uno sfondo dal testo della sezione), senza che alcun soggetto si ripeta in una pagina. Un nuovo modello riceve quindi foto gratis. Le foto sono soggetti di ricerca Pexels emessi come segnaposto `pexels:<term>` che B1Admin risolve tramite `POST /content/stock/search`; un client che non invia `resolvesPhotos` riceve un'immagine hero integrata, fasce di colore piatto e schede senza foto. Non ci sono volutamente soggetti ritratto, e il modello del pastore non ha alcuna foto: uno sconosciuto di repertorio non deve mai prendere il posto di una persona reale. Per una chiesa senza ancora pagine, B1Admin applica `suggestedStyle` agli stili globali; i siti esistenti mantengono il loro aspetto.

### Altri endpoint

:::info
Il pulsante `SectionToolbar` per riscrivere e il pulsante "Genera sito" nell'elenco delle pagine di B1Admin restano commentati lato client. Gli endpoint di AskApi qui sotto rispondono ancora; è solo quell'interfaccia a essere nascosta.
:::

| Endpoint | Scopo |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Il flusso originale in due passaggi (struttura, poi una chiamata LLM per sezione che emette JSON di elementi). Sostituito in B1Admin da `planPage`/`writePage` per via dei costi; mantenuto per i consumatori dell'API |
| `POST /website/generateSite` | Generazione dell'intero sito. **Due fasi per progettazione**: una chiamata `planOnly: true` restituisce solo il piano multi-pagina (una chiamata veloce al modello), poi il client richiede il contenuto completo -- mantenendo ogni richiesta entro il timeout di Lambda/API Gateway |
| `POST /website/rewriteSection` | Riscrittura che preserva la struttura: il modello può modificare solo le risposte contenenti testo. Una firma strutturale ricorsiva (id + tipi + ordine) viene confrontata prima e dopo; qualsiasi differenza restituisce la sezione originale con `fallback: true` invece di una struttura corrotta |
| `POST /website/generateAltText` | Chiamata di visione su fino a 20 URL di immagini; restituisce un testo alternativo conciso (≤125 caratteri, senza prefissi "foto di") |
| `POST /website/generateMetaDescription` | Una meta description SEO (≤155 caratteri) dal testo della pagina -- collegata al pulsante Genera nelle impostazioni di pagina di B1Admin |

I prompt di questi endpoint sono file markdown in `AskApi/config/instructions/`, incluso il catalogo degli elementi da cui il modello genera. Due scelte di progetto mantengono il catalogo fedele: il client passa `availableElementTypes` a ogni richiesta (il prompt può usare solo i tipi di quella lista -- il server non codifica mai l'insieme completo), e lo strumento MCP `describe_page_builder` dell'API contiene la stessa guida per gli agenti IA che lavorano tramite [MCP](../api/mcp). I modelli sono Anthropic Claude tramite OpenRouter -- 3.5 Haiku per il contenuto delle sezioni (latenza), 3.5 Sonnet per le strutture, i piani del sito e la visione -- con un ripiego su OpenAI quando non è configurata una chiave OpenRouter.

## Moduli conversazionali

I moduli (modulo membership) hanno acquisito una modalità conversazionale pensata per pagine in stile scheda di contatto. Quattro colonne della tabella `forms` la governano: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — il `FormSubmissionEdit` di apphelper passa al componente `ConversationalForm` (una domanda alla volta) quando `displayMode` è `conversational`; la pagina del modulo di B1App passa la modalità. Il payload dell'invio è lo stesso in entrambi i casi.
- **Creazione automatica della persona** — all'invio con `autoCreatePerson` impostato, `ConversationalFormHelper.findOrCreatePerson` deduplica per email (senza distinzione tra maiuscole e minuscole) e altrimenti crea un nucleo e una persona con `membershipStatus: "Guest"`, poi collega l'invio a quella persona.
- **Email di follow-up** — quando sono impostati oggetto e corpo, chi ha inviato riceve un'email da modello (con i token `{firstName}` / `{churchName}`) tramite il normale percorso transazionale (`TransactionalEmailHelper`), mai tramite la porta del riepilogo delle notifiche. Entrambi gli effetti collaterali non sono fatali: un errore non fa mai perdere l'invio.

I quattro campi si impostano oggi tramite API; l'editor dei moduli di B1Admin non li espone ancora.

## Cache del sito pubblico

Il percorso di rendering pubblico di B1App mette in cache le richieste con tag della chiesa (`next: { revalidate: 300, tags: [sdSlug] }` in produzione; `0` in sviluppo), quindi una pagina attiva può restare obsoleta fino a cinque minuti dopo una scrittura su ContentApi. `POST /api/revalidate/{sdSlug}` su B1App chiama `revalidateTag(sdSlug)` ed è l'unico modo per eliminare la cache in anticipo.

Due soggetti la invalidano:

1. **B1Admin** — `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` invia una POST dopo i salvataggi dell'editor. Preferisce il sottodominio del sito attivo (un sito secondario deve invalidare *quel* tag, non quello predefinito della chiesa).
2. **Api** — le mutazioni dei contenuti che non passano da B1Admin (chiavi API, MCP, IA) attivano `SiteCacheHelper.bump(churchId)` dai controller dei contenuti. L'helper risolve il sottodominio della chiesa tramite `SubDomainHelper` e invia una POST a `{b1AppRoot}/api/revalidate/{sd}`. Gli errori vengono ignorati, così un B1App irraggiungibile non può far fallire un salvataggio.

Controller che invalidano: pagine (salvataggio, eliminazione, duplicazione, pubblicazione, scarto, annullamento della pubblicazione, bozza IA), sezioni, elementi, blocchi, link, stili globali, articoli e reindirizzamenti. Il `b1AppRoot` di sviluppo è `http://{subdomain}.localtest.me:3301`; demo/produzione usano `https://{subdomain}.b1.church`.

## Pagine correlate

- [Routing del sito web e multi-sito](./websites) — come una richiesta si risolve in una chiesa/sito e come si instradano i domini personalizzati
- [Endpoint Content](../api/endpoints/content) — superficie REST completa per pagine, sezioni, elementi, blocchi, articoli, reindirizzamenti e impostazioni
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che include renderer, registro, separatori e widget
- [Server MCP](../api/mcp) — incluso lo strumento guida `describe_page_builder`
- [Editor di pagine (per l'utente finale)](/docs/b1-admin/website/page-editor) — la documentazione dell'editor per lo staff
