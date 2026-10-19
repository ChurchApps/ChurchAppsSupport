---
title: "Architettura del Website Builder"
---

# Architettura del Website Builder

<div class="article-intro">

Ogni sito di chiesa servito da B1App viene generato a partire da un albero di contenuti -- pagine, sezioni, elementi -- memorizzato in ContentApi e modificato visivamente in B1Admin. Un'unica libreria di componenti condivisa genera sia l'anteprima dell'editor sia il sito live, un catalogo di tipi di elementi definisce cosa può comparire in una pagina, e un servizio IA separato può generare o riscrivere quell'albero. Questa pagina illustra l'intero stack: il contratto degli elementi in `@churchapps/helpers`, la pipeline di rendering, gli elementi dei dati della chiesa, i widget a livello di sito, il livello del blog, le pagine con accesso limitato, la SEO, la generazione tramite IA e i moduli conversazionali.

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

Tre regole valgono per tutto lo stack:

1. **Un albero, due renderer.** Una pagina è un albero `pages → sections → elements` in cui ogni nodo porta le proprie impostazioni come blob JSON `answers`. Gli stessi componenti di apphelper generano l'editor drag-and-drop in B1Admin e il sito pubblico renderizzato lato server in B1App -- non esiste un "formato di pubblicazione" separato.
2. **Il contratto vive in `@churchapps/helpers`.** `ElementTypes.ts` è il catalogo unico dei tipi di elementi; i renderer si risolvono tramite un registro in apphelper; i moduli di modifica vivono in B1Admin. Aggiungere un tipo di elemento significa intervenire su tutti e tre, in quest'ordine.
3. **Il sito pubblico legge endpoint anonimi.** Tutto ciò di cui B1App ha bisogno -- l'albero delle pagine, le impostazioni, gli articoli del blog, i reindirizzamenti e gli endpoint dei dati della chiesa negli altri moduli -- è pubblico. L'autenticazione è facoltativa: un JWT sull'endpoint anonimo dell'albero sblocca le pagine riservate ai membri, nient'altro cambia.

## L'albero dei contenuti

Il modulo content (`Api/src/modules/content`) possiede i dati del builder:

| Tabella | Ruolo |
|-------|------|
| `pages` | Una pagina per URL: `url`, `title`, `layout`, più `visibility`/`groupIds` (accesso limitato) e `metaDescription` (SEO) |
| `sections` | Fasce orizzontali in una pagina (o in un blocco): sfondo, colore del testo e un `answersJSON` che contiene lo stile più le configurazioni dei separatori di forma `dividerTop`/`dividerBottom` |
| `elements` | Pezzi di contenuto all'interno di una sezione: `elementType` + `answersJSON`, annidabili per i tipi di layout (riga/colonna, carosello) |
| `blocks` | Gruppi riutilizzabili di sezioni/elementi (blocchi di piè di pagina, blocchi di elementi) condivisi tra più pagine |
| `posts` | Articoli di blog autonomi (vedere [Blog](#blog)) |
| `redirects` | Coppie `fromPath → toPath` per chiesa, limitate a 200 (vedere [SEO](#seo-and-discoverability)) |
| `settings` | Impostazioni della chiesa in formato chiave-valore; le righe contrassegnate `public` vengono servite in modo anonimo e contengono la configurazione dei widget e dell'analisi |

L'intero albero per un URL torna con una singola chiamata anonima -- `GET /content/pages/:churchId/tree?url=/about` -- ed è da qui che B1App esegue il rendering lato server. Le richieste dell'editor recuperano invece per id e mantengono gli id interni.

## Il contratto degli elementi

### Il catalogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definisce ogni tipo di elemento come un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` e un `answersSchema` in stile JSON-schema per le sue risposte. `validateElementAnswers()` è volutamente permissiva -- tipi sconosciuti e chiavi in più passano, così i vecchi contenuti non si rompono quando il catalogo viene aggiornato. **Oggi sono disponibili 35 tipi:**

| Categoria | Tipi di elementi |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| contenuto (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| chiesa (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avanzato (2) | rawHTML, iframe |

L'elemento `sermons` è il più configurabile tra quelli di tipo chiesa: una risposta `layout` seleziona `browse` (il vecchio browser a schermo intero), `grid`, `list` o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles` e `showDates` che rifiniscono i layout diversi da browse.

L'elemento `rawHTML` ha due risposte: `rawHTML` (markup) e `javascript`. Gli script inseriti tramite `innerHTML` non vengono mai eseguiti, quindi `RawHTMLElement` ricrea ogni nodo `<script>` presente nel markup come elemento nuovo. Questi nodi non inseriti dal parser sono considerati attendibili secondo `strict-dynamic` della CSP. Una risposta `javascript` che inizia con `<` (uno snippet di un fornitore incollato con i suoi tag `<script>`) viene interpretata come markup e riceve lo stesso trattamento. Altrimenti viene eseguita come semplice script inline. B1Admin segnala un URL nudo nella casella JavaScript, perché un URL isolato viene eseguito come script senza effetto. L'elemento `map` non genera nulla e non carica lo script di Google Maps quando non è configurata una chiave API di Maps.

### Renderer (`@churchapps/apphelper`)

I renderer si trovano in `Packages/apphelper/src/website/components/elementTypes/`, un componente per tipo, e si risolvono tramite `ElementRegistry.ts` -- una mappa a due livelli in cui `Element.tsx` registra il renderer predefinito per tutti i 35 tipi (`registerDefaultElementRenderer`) e un'app ospite può sostituirne qualsiasi a runtime (`registerElementRenderer`) senza fare un fork del pacchetto.

### Moduli di modifica (B1Admin)

I moduli di impostazione per tipo dell'editor si trovano in `B1Admin/src/site/admin/elements/` -- `ElementEdit.tsx` smista a un componente dedicato (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) oppure a un costruttore di campi inline per ciascun tipo. La versione del catalogo destinata all'IA è lo strumento MCP `describe_page_builder` dell'API (vedere [Server MCP](../api/mcp)).

L'anteprima dell'editor monta lo stesso `Theme` del sito live, che imposta le variabili CSS `--headingFont` / `--bodyFont` a partire dagli stili globali della chiesa. B1App applica quelle variabili tramite `pages.css`, che B1Admin non può importare, quindi `ContentEditor.tsx` inietta `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) per applicarle al testo del corpo `.page` e a `h1`–`h6`. Senza di esso, l'anteprima mostrava i titoli con il font dell'amministrazione.

### Separatori di forma delle sezioni

Le sezioni possono avere separatori decorativi di forma su entrambi i bordi. La configurazione si trova nel `answersJSON` della sezione come oggetti `dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }`, con `shape` uno tra `wave, waves, slant, curve, triangle, peaks`. Apphelper fornisce il componente `SectionDivider` e l'helper `parseDividerConfig()`; i renderer Section di entrambe le app (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) leggono le risposte e montano il separatore, e `SectionEdit.tsx` in B1Admin fornisce il selettore. I pacchetti forniscono solo il blocco di base -- il collegamento a livello di sezione è compito delle app che li usano.

## Elementi dei dati della chiesa

Tre tipi di elementi mostrano dati della chiesa in tempo reale anziché contenuti creati a mano. L'isolamento dei moduli resta valido -- ciascuno chiama dal browser l'endpoint pubblico del modulo proprietario:

| Elemento | Endpoint | Note |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Restituisce `{ fundId, totalAmount, donationCount }`, con una finestra facoltativa `?startDate=&endDate=`; l'elemento lo confronta con la sua risposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo su scelta esplicita**: il gruppo deve avere `publicRoster` impostato (predefinito disattivato). La proiezione è volutamente minima -- `personId`, `displayName`, `leader`, foto -- senza campi di contatto o demografici |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Restituisce l'albero campus → culto → orario; il renderer di apphelper genera in modo indicativo JSON-LD schema.org `Event` a partire da esso (l'API restituisce solo dati semplici) |

:::warning
`publicRoster` è il cancello di riservatezza per `staffGrid`. Non ampliate mai la proiezione pubblica dei membri del gruppo e non aggirate il flag -- l'endpoint dell'elenco è anonimo per progettazione, e l'elenco minimo dei campi è la garanzia di sicurezza.
:::

### Elemento calendario e pagine degli eventi

Le risposte dell'elemento `calendar` sono `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, il predefinito, oppure `upcoming`) e `tag`. B1App sostituisce il renderer di apphelper in `src/components/Element.tsx` con `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** genera `UpcomingEventsElement` di B1App: carica `GET /content/events/public/group/:churchId/:groupId` oppure `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, espande le ricorrenze con `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, una occorrenza per evento entro un anno) e mostra le prime 12 come riquadri con foto (`events.photoUrl`, con ripiego sul titolo sul colore scuro del tema) collegati a `/events/{id}`, con un menu Iscriviti per il feed ICS del calendario.
- **`display: "month"`** genera `CalendarElement` di apphelper con un callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` poi navigano a quell'URL al clic invece di aprire la finestra di dettaglio (B1Admin non passa `eventUrl`, quindi il calendario dell'amministrazione mantiene la sua finestra).
- **`tag`** filtra entrambe le visualizzazioni con `EventHelper.hasTag()` (`@churchapps/helpers`): una corrispondenza senza distinzione tra maiuscole e minuscole con `events.tags`, separati da virgole; se vuoto mostra tutto. La query del calendario curato seleziona `e.tags` così che gli eventi curati portino con sé i tag.

Gli eventi curati puntano tramite `realEventId` (`eventPageId()`), quindi l'URL indica sempre l'evento sottostante. `/{sdSlug}/events/[eventId]` è una rotta dedicata (non la pipeline del builder): carica `GET /content/events/public/:churchId/:id` -- che restituisce `null` per gli eventi in attesa o rifiutati e per gli eventi privati senza iscrizione, e aggiunge `roomNames` dalle prenotazioni di sale non rifiutate -- genera `EventPageContent` (immagine principale con foto, descrizione in markdown, barra laterale Quando/Dove, **Iscriviti a questo evento** quando `registrationEnabled` è attivo, e un link **Aggiungi al mio calendario** a `GET /content/events/public/:churchId/:id/ical`), usa la foto come immagine Open Graph ed emette JSON-LD `Event` per la prossima occorrenza tramite `EventPageJsonLd`. Un evento sconosciuto o nascosto restituisce un vero 404.

## Widget a livello di sito

Due widget compaiono in ogni pagina pubblica, fuori dall'albero: **AnnouncementBanner** (barra in alto nella pagina, chiudibile) e **Launcher** (hub fluttuante di azioni per link tipo dona/visita/guarda). Entrambi i componenti e i loro helper `parse*Config()` sono forniti da apphelper. La configurazione è costituita da due righe di impostazioni pubbliche -- con chiavi `announcementBanner` e `launcher` -- scritte dal modulo `SiteWidgetsEdit` di B1Admin (nella pagina Aspetto) e lette dal layout pubblico di B1App tramite `GET /content/settings/public/:churchId`. L'API tratta queste come coppie chiave-valore opache; i nomi delle chiavi sono una convenzione tra le due app.

## Blog

Il blog è un tipo di contenuto autonomo, non uno strato sopra le pagine del builder. Una riga di `posts` contiene l'intero articolo: `title`, `slug`, `excerpt`, `content` (corpo in markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. La superficie pubblica (tutta anonima, `PostController`):

| Rotta | Scopo |
|-------|---------|
| `GET /content/posts/public/:churchId` | Articoli pubblicati, filtrabili con `?category=&tag=`, paginati |
| `GET /content/posts/public/:churchId/categories` | Categorie distinte tra gli articoli pubblicati |
| `GET /content/posts/public/:churchId/slug/:slug` | Un articolo pubblicato |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, intitolato con il nome della chiesa, con categoria per voce e descrizione con estratto o contenuto |

Un articolo è "pubblicato" quando `publishDate` è impostata e già passata; una `publishDate` futura indica un articolo programmato (nascosto al pubblico, mostrato con un chip Programmato nell'amministrazione). Gli endpoint di lettura arricchiscono ogni articolo con `authorName`, risolto da `authorId` tramite il gateway del modulo membership. Gli estratti mancanti ripiegano sul contenuto markdown senza sintassi (~160 caratteri) nelle schede di elenco, nelle meta description e nel feed RSS. B1App serve `/{sdSlug}/blog` -- un elenco editoriale (intestazione centrata che diventa il nome della categoria/tag attivo quando filtrato, riga di chip per categoria, righe di articolo con miniatura a sinistra, firme ed estratti) con il feed RSS indicato come link alternativo -- e `/{sdSlug}/blog/[postSlug]`, una rotta dedicata (non la pipeline Zone/Section), con intestazione centrata (etichetta della categoria, titolo, firma, filetto di accento nel colore primario), un'immagine 16:9 alla larghezza del contenitore, il corpo markdown in una colonna di lettura di circa 720px, chip dei tag nel piè di articolo, una striscia `"More in {category}"` con articoli correlati e JSON-LD `BlogPosting` che include l'autore. Entrambe le pagine si stilizzano interamente tramite i token del tema, così ereditano la tavolozza di ciascuna chiesa. Gli URL del blog sono inclusi nella sitemap di ciascuna chiesa. L'interfaccia di scrittura di B1Admin (**Sito → Blog**) modifica gli articoli in una finestra di dialogo: editor markdown con interruttore di anteprima, selettore immagini della galleria ritagliate 16:9, selettore persona per l'autore (predefinito sull'utente che modifica), completamento automatico delle categorie a partire da quelle esistenti, validazione degli slug duplicati e un interruttore di pubblicazione; le righe pubblicate rimandano all'articolo dal vivo, e la pagina invita gli amministratori ad aggiungere un link `/blog` alla navigazione.

## Pagine riservate ai membri

`pages.visibility` riutilizza l'enumerazione dei link di navigazione -- `everyone` (predefinito), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`) -- ma come **cancello di accesso rigido**, non come filtro della navigazione (`PageVisibilityHelper.canViewPage`). Il flusso:

1. L'endpoint anonimo dell'albero verifica la visibilità sulle richieste basate sull'URL. I chiamanti anonimi di una pagina riservata ricevono `{ restricted: true, visibility }` invece dei contenuti -- l'albero non trapela mai.
2. L'endpoint continua a rispettare un JWT: `CustomAuthProvider` verifica l'intestazione `Authorization` in *ogni* richiesta, comprese le rotte anonime, quindi la richiesta di un membro autenticato per lo stesso URL viene risolta normalmente.
3. B1App mostra `RestrictedPage` su una risposta `restricted`: reidrata la sessione dalle credenziali salvate, richiede di nuovo l'albero con il JWT e lo mostra -- oppure mostra una schermata di accesso con un `returnUrl` quando non c'è una sessione.

:::info
La granularità del cancello varia a seconda del livello: `groups` verifica i `groupIds` del token rispetto alla lista della pagina e `staff` verifica il `membershipStatus`, ma `members` e `team` attualmente lasciano passare qualsiasi utente autenticato della chiesa. Considerate `groups` come l'opzione più rigorosa.
:::

## SEO e reperibilità {#seo-and-discoverability}

Tutto questo è il rendering lato B1App sui dati di ContentApi -- l'API memorizza, l'app emette:

| Aspetto | Come funziona |
|--------------|--------------|
| Meta description | `pages.metaDescription` (≤300 caratteri) passa attraverso `MetaHelper.getMetaData()` nei `Metadata` di Next.js (description + Open Graph) su ogni rotta generata dal builder. Le impostazioni di pagina di B1Admin includono un pulsante IA "Genera" (vedere sotto) |
| Reindirizzamenti | Righe `redirects` per chiesa gestite in `/content/redirects` (`content.edit`, limite di 200 righe, percorsi normalizzati). Su un possibile 404, la rotta di pagina di B1App risolve il percorso tramite `GET /content/redirects/public/:churchId` ed emette un HTTP 308 con `permanentRedirect` di Next; i percorsi non corrispondenti proseguono verso `notFound()` |
| 404 con branding | `not-found.tsx` mostra `BrandedNotFound` con il logo, il nome e il tema della chiesa invece di un errore generico. I percorsi sconosciuti `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` e `/volunteer/[planId]` restituiscono un vero 404, così come i sottodomini sconosciuti e gli slug di pagina malformati (vedere [Instradamento dei siti web e multi-sito](./websites)) |
| Dati strutturati | JSON-LD `BlogPosting` sugli articoli del blog; `VideoObject` sulle pagine dei singoli sermoni (`/{sdSlug}/sermons/[sermonId]`) e sulle pagine che contengono un elemento `sermons`; `Event` dagli elementi calendario/evento nelle pagine del builder e su ogni pagina `/{sdSlug}/events/[eventId]` (prossima occorrenza, con la foto dell'evento come `image`); `Event` schema.org dall'elemento `serviceTimes` |
| Pagine dei sermoni | Ogni sermone pubblico ha una pagina scansionabile a `/sermons/[sermonId]` con metadati completi -- i sermoni non sono più chiusi dentro il browser lato client |
| Analisi | La chiave di impostazione pubblica `ga4MeasurementId` (gestita accanto ai reindirizzamenti in B1Admin) inserisce un gtag GA4 per chiesa tramite `next/script`. L'app B1 (`/{sdSlug}/mobile`) invia anche le sue visualizzazioni di pagina a quell'ID, insieme al tag di ChurchApps, quando è un ID `G-` valido (gli ID dei contenitori GTM restano solo per il sito web). Ogni `gtag('config')` riporta un `display_mode` pari a `installed` o `browser`, in base a `navigator.standalone` o alla media query `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap e feed | La rotta `sitemap.xml` di ciascuna chiesa include le pagine del builder, gli URL del blog e le 50 pagine dei sermoni più recenti (con `<lastmod>` dalla data di pubblicazione di ciascun sermone). Elenca anche le pagine integrate `/sermons`, `/groups` e `/volunteer` quando hanno contenuti (gruppi pubblici, piani di iscrizione), a meno che un reindirizzamento salvato non sostituisca quel percorso. `/` viene omessa quando la chiesa non ha una home page, perché `/` in quel caso reindirizza al percorso `/mobile` non consentito. L'elenco del blog pubblicizza il feed RSS |
| Accessibilità | La struttura pubblica genera un link di salto che punta al landmark `<main id="main-content">` in ogni wrapper di layout |

## Generazione tramite IA (AskApi)

La generazione di pagine e siti avviene in **AskApi**, un servizio separato, sotto il controller `/website`. Si autentica con lo stesso JWT `CustomAuthProvider` di tutto il resto ed è **senza stato rispetto ai contenuti**: ogni endpoint restituisce JSON e il chiamante (B1Admin) salva il risultato tramite ContentApi (`POST /content/pages/importTree` crea una pagina con il suo intero albero annidato di sezioni/elementi in una sola chiamata; inserisce sempre sotto la chiesa del chiamante e ignora gli id nel corpo).

### Generazione di pagine (`planPage` → `writePage`)

Il modello di pagina "IA" nel `AddPageModal` di B1Admin usa una pipeline a basso costo (`AskApi/src/helpers/SiteGenHelper.ts`) fondata su una regola: **nessun modello emette mai JSON del builder**. Due modelli si dividono il lavoro tramite il Vercel AI Gateway (HTTP semplice, chiave SSM `/{env}/aiGatewayApiKey` oppure `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) -- un modello di decisione tipizzato che restituisce scelte, punteggi e booleani con probabilità, ma non sa scrivere testo. Sceglie ogni sezione in sequenza da una libreria fissa di modelli, valuta i layout, verifica i fatti del testo e sceglie le foto e le icone di archivio. Il costo dell'input è circa 0,04 $ per milione di token e l'output è gratuito, quindi ~90 chiamate per pagina costano una frazione di centesimo.
- **Un piccolo modello di chat (GPT-4.1 mini per impostazione predefinita)** -- riempie gli slot di testo nominati e limitati nella lunghezza dei modelli scelti. Lo scrittore è una costante unica, sovrascrivibile con la variabile d'ambiente `SITEGEN_COPY_MODEL` (qualsiasi ID di modello di chat sul gateway, ad esempio `anthropic/claude-haiku-4.5`). In un confronto affiancato alla cieca su tre chiese, Claude Haiku 4.5 risultava leggermente più caloroso, ma GPT-4.1 mini era vicino, circa 4 volte più economico e più veloce, quindi è il predefinito. Una pagina completa con tutti e tre i layout costa circa 1,3 centesimi, di cui circa l'80% per lo scrittore.

| Fase | Endpoint | Cosa succede |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classifica il tipo di pagina (home, visita, chi siamo…), poi campiona 10 layout candidati dalle probabilità per turno di JEV (eroe + numero di sezioni → ogni sezione → chiusura), elimina i duplicati, fa valutare a JEV ciascuno per adeguatezza/flusso/lacune, e restituisce i primi 3 più una voce di scrittura e uno `suggestedStyle` (tavolozza + font). I candidati che condividono le stesse sezioni finora pongono a JEV una domanda identica, quindi i turni sono memorizzati per prefisso. Un punteggio migliore sotto 6 viene registrato come `lowLayoutScore` -- quel registro è l'arretrato dei modelli da aggiungere. ~2s |
| 2 | `POST /website/writePage` (una chiamata per candidato) | Lo scrittore riempie il testo degli slot due sezioni per chiamata, in parallelo, e restituisce cinque titoli dell'eroe tra cui JEV sceglie; JEV verifica i fatti di ogni sezione; le sezioni che falliscono, usano una frase fatta o ripetono una sezione precedente (sequenze condivise di 4 parole, verificate nel codice) vengono riscritte in parallelo con il motivo specifico; un pulizia nel codice elimina le frasi con formule ricorrenti dei siti di chiesa (salvo che la descrizione della chiesa le usi); JEV sceglie i soggetti delle foto, le icone e il separatore di forma dell'eroe, e valuta il risultato. Restituisce un albero di sezioni pronto da salvare e un punteggio. ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin scrive solo il layout migliore in classifica (il secondo è un ripiego se quella scrittura fallisce), lo salva e apre l'anteprima (~10s dopo Salva) |

Ogni fase è una richiesta a sé, così ogni chiamata resta entro il limite di 29 secondi di API Gateway. I modelli in `SiteGenHelper.buildTree` sono alberi fissi di sezioni ed elementi presi dal catalogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) e fanno riferimento ai token del tema (`var(--accent)`, `var(--lightAccent)`…), così le pagine generate ereditano le impostazioni di aspetto esistenti della chiesa. Aggiungere un modello di sezione significa aggiungere la sua lista di slot a `SECTIONS` e il suo albero a `buildTree`; il test unitario attraversa ogni modello e ne valida l'albero.

**Input.** Il testo può affermare solo fatti provenienti da due fonti: ciò che l'utente ha digitato e `churchContext.facts` -- registrazioni che B1Admin raccoglie prima della pianificazione (orari pubblici dei culti e nomi pubblici dei gruppi, più il nome e l'indirizzo della chiesa). Gli stessi flag regolano i modelli basati sui dati: `times` mostra l'elemento `serviceTimes` dal vivo quando la chiesa tiene gli orari dei culti in B1 (altrimenti una tabella scritta), `groups` e `countdown` sono offerti solo quando ci sono dati dietro di loro. Le chiamate a JEV sono coperte da copertura (un duplicato parte dopo 1,5s e vince la prima risposta) perché il gateway a volte si blocca e le chiamate costano quasi nulla.

**Restare sull'argomento.** Il prompt dell'utente è l'*argomento della pagina*, non un contesto generale sulla chiesa. `planPage` classifica la richiesta (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), e per le pagine `event` e `topic` i modelli generali della chiesa (nota del pastore, sermoni, ministeri, gruppi, impatto sulla comunità, orari settimanali e conto alla rovescia, eroe con video) non vengono nemmeno proposti, mentre vengono offerti `details` (quando / dove / cosa portare) e un `eventCountdown` con la data. Entrambi i giudici valutano la pertinenza all'argomento. B1Admin passa il `pageType` dal piano in ogni chiamata a `writePage`.

**Pagine complete da richieste brevi.** Le pagine hanno da tre a sei sezioni centrali, lunghezze generose degli slot, una riga introduttiva nelle sezioni a schede e una FAQ di cinque domande, e il passaggio di riparazione espande ogni sezione che torna troppo scarna. La generazione è a un clic: non ci sono domande di approfondimento. Quando la richiesta omette un dettaglio ordinario di cui una pagina completa ha bisogno (un orario di inizio, una sala, cosa portare, come iscriversi), lo scrittore lo completa con una scelta plausibile e misurata, che la chiesa può modificare. Poiché le sezioni vengono scritte in parallelo, quei vuoti vengono decisi **una sola volta**, in `planPage` (`assumedDetails`, una piccola chiamata allo scrittore che gira in parallelo al campionamento dei layout), e vengono ripassati in ogni chiamata a `writePage` tramite `churchContext.assumedDetails`, così una sezione non può dire le 5:00 mentre un'altra dice le 5:30. JEV ripara qualsiasi sezione che contraddice la richiesta, i registri della chiesa o quei dettagli decisi. I dettagli decisi non vengono mostrati nell'interfaccia; la chiesa rivede e modifica la pagina come qualsiasi altra. Alcune cose non vengono mai inventate: nomi di persone, numeri di telefono, indirizzi email e web, prezzi, statistiche, la storia della chiesa, citazioni attribuite a persone, e il giorno della settimana per una data che la richiesta non indicava.

**Immagini.** I modelli non nominano mai le loro foto o icone. Lasciano aperti degli slot, e un unico passaggio generico (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) percorre l'albero finito e riempie ciascuno: uno sfondo di sezione o una voce di galleria contrassegnata `auto:photo`, un `auto:icon`, il `auto:divider` dell'eroe e, senza alcun contrassegno, qualsiasi elemento `textWithPhoto`, `card` o `image` il cui `photo` sia vuoto. JEV sceglie ciascuna dal testo accanto (la foto di una scheda dal suo titolo e dal suo testo; uno sfondo dal testo della sezione), senza ripetere un soggetto in una pagina. Un nuovo modello riceve quindi foto gratis. Le foto sono soggetti di ricerca Pexels emessi come segnaposto `pexels:<term>` che B1Admin risolve tramite `POST /content/stock/search`; un client che non invia `resolvesPhotos` riceve invece un'immagine eroe integrata, fasce di colore piatte e schede senza foto. Di proposito non ci sono soggetti di ritratti e il modello del pastore non ha alcuna foto: uno sconosciuto d'archivio non deve mai sostituire una persona reale. Per una chiesa senza pagine, B1Admin applica `suggestedStyle` agli stili globali; i siti esistenti mantengono il loro aspetto.

### Altri endpoint

:::info
Il pulsante di riscrittura di `SectionToolbar` e il pulsante "Genera sito" nell'elenco delle pagine di B1Admin restano commentati lato client. Gli endpoint di AskApi qui sotto rispondono ancora; è solo l'interfaccia a essere nascosta.
:::

| Endpoint | Scopo |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Il flusso originale di pagina in due passaggi (struttura, poi una chiamata LLM per sezione che emette JSON degli elementi). Sostituito in B1Admin da `planPage`/`writePage` per via dei costi; mantenuto per i consumatori dell'API |
| `POST /website/generateSite` | Generazione dell'intero sito. **In due fasi per progettazione**: una chiamata con `planOnly: true` restituisce solo il piano multipagina (una chiamata rapida al modello), poi il client richiede il contenuto completo -- mantenendo ogni richiesta entro il timeout di Lambda/API Gateway |
| `POST /website/rewriteSection` | Riscrittura che preserva la struttura: il modello può modificare solo le risposte contenenti testo. Una firma ricorsiva della struttura (id + tipi + ordine) viene confrontata prima e dopo; qualsiasi discrepanza restituisce la sezione originale con `fallback: true` invece di una struttura corrotta |
| `POST /website/generateAltText` | Chiamata di visione su fino a 20 URL di immagini; restituisce un testo alternativo conciso (≤125 caratteri, senza prefissi "foto di") |
| `POST /website/generateMetaDescription` | Una meta description SEO (≤155 caratteri) dal contenuto testuale della pagina -- collegata al pulsante Genera nelle impostazioni di pagina di B1Admin |

I prompt per questi endpoint sono file markdown in `AskApi/config/instructions/`, incluso il catalogo degli elementi da cui il modello genera. Due scelte progettuali mantengono onesto il catalogo: il client passa `availableElementTypes` in ogni richiesta (il prompt può usare solo tipi presenti in quella lista -- il server non fissa mai l'insieme completo), e lo strumento MCP `describe_page_builder` dell'API riporta la stessa guida per gli agenti IA che lavorano tramite [MCP](../api/mcp). I modelli sono Anthropic Claude tramite OpenRouter -- 3.5 Haiku per il contenuto delle sezioni (latenza), 3.5 Sonnet per le strutture, i piani dei siti e la visione -- con un ripiego su OpenAI quando non è configurata una chiave OpenRouter.

## Moduli conversazionali

I moduli (modulo membership) hanno acquisito una modalità conversazionale pensata per le pagine in stile scheda di contatto. Quattro colonne di `forms` la governano: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** -- `FormSubmissionEdit` di apphelper passa al componente `ConversationalForm` (una domanda alla volta) quando `displayMode` è `conversational`; la pagina del modulo di B1App trasmette la modalità. Il payload dell'invio è lo stesso in entrambi i casi.
- **Creazione automatica della persona** -- all'invio con `autoCreatePerson` attivo, `ConversationalFormHelper.findOrCreatePerson` elimina i duplicati tramite email (senza distinguere maiuscole e minuscole) e altrimenti crea un nucleo familiare e una persona con `membershipStatus: "Guest"`, poi collega l'invio a quella persona.
- **Email di follow-up** -- quando sono impostati un oggetto e un corpo, chi ha inviato riceve un'email basata su modello (con i token `{firstName}` / `{churchName}`) tramite il percorso transazionale esistente (`TransactionalEmailHelper`), mai dal canale del riepilogo delle notifiche. Entrambi gli effetti collaterali non sono fatali: un errore non fa mai perdere l'invio.

I quattro campi oggi si impostano tramite API; l'editor dei moduli di B1Admin non li espone ancora.

## Cache del sito pubblico

Il percorso di rendering pubblico di B1App memorizza nella cache le richieste delle chiese con tag (`next: { revalidate: 300, tags: [sdSlug] }` in produzione; `0` in sviluppo), quindi una pagina live può restare obsoleta fino a cinque minuti dopo una scrittura su ContentApi. `POST /api/revalidate/{sdSlug}` su B1App chiama `revalidateTag(sdSlug)` ed è l'unico modo per svuotare anticipatamente la cache.

Due componenti la attivano:

1. **B1Admin** -- `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` esegue una POST dopo i salvataggi dell'editor. Preferisce il sottodominio del sito attivo (un sito secondario deve invalidare *quel* tag, non quello predefinito della chiesa).
2. **Api** -- le mutazioni dei contenuti che non passano da B1Admin (chiavi API, MCP, IA) attivano `SiteCacheHelper.bump(churchId)` dai controller dei contenuti. L'helper risolve il sottodominio della chiesa tramite `SubDomainHelper` e invia una POST a `{b1AppRoot}/api/revalidate/{sd}`. Gli errori vengono ignorati, così un B1App irraggiungibile non può far fallire un salvataggio.

I controller che attivano l'invalidazione: pagine (salvataggio, eliminazione, duplicazione, pubblicazione, scarto, ritiro dalla pubblicazione, bozza IA temporanea), sezioni, elementi, blocchi, link, stili globali, articoli e reindirizzamenti. Il valore `b1AppRoot` in sviluppo è `http://{subdomain}.localtest.me:3301`; demo e produzione usano `https://{subdomain}.b1.church`.

## Pagine correlate

- [Instradamento dei siti web e multi-sito](./websites) -- come una richiesta si risolve in una chiesa/sito e come i domini personalizzati vengono instradati
- [Endpoint dei contenuti](../api/endpoints/content) -- l'intera superficie REST per pagine, sezioni, elementi, blocchi, articoli, reindirizzamenti e impostazioni
- [AppHelper](../shared-libraries/app-helper) -- il pacchetto npm che fornisce renderer, registro, separatori e widget
- [Server MCP](../api/mcp) -- incluso lo strumento guida `describe_page_builder`
- [Editor di pagina (utente finale)](/docs/b1-admin/website/page-editor) -- la documentazione dell'editor per il personale
