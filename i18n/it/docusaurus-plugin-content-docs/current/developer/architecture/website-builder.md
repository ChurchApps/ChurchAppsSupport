---
title: "Architettura del Website Builder"
---

# Architettura del Website Builder

<div class="article-intro">

Ogni sito web della chiesa servito da B1App è reso da un albero di contenuti — pagine, sezioni, elementi — memorizzati in ContentApi e modificati visivamente in B1Admin. Una libreria di componenti condivisa rende sia l'anteprima dell'editor che il sito live, un catalogo di tipi di elementi definisce cosa può apparire su una pagina, e un servizio AI separato può generare o riscrivere quell'albero. Questa pagina mappa l'intero stack: il contratto degli elementi in `@churchapps/helpers`, la pipeline di rendering, elementi church-data, widget a livello di sito, il layer di blog, pagine ad accesso limitato, SEO, generazione AI e form conversazionali.

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

Tre regole valgono in tutto lo stack:

1. **Un albero, due renderer.** Una pagina è un albero `pages → sections → elements` dove ogni nodo porta le sue impostazioni come un blob JSON `answers`. Gli stessi componenti apphelper rendono sia l'editor drag-and-drop in B1Admin che il sito reso dal server in B1App — non c'è un "formato di pubblicazione" separato.
2. **Il contratto vive in `@churchapps/helpers`.** `ElementTypes.ts` è il catalogo singolo di tipi di elementi; i renderer si risolvono attraverso un registro in apphelper; i moduli dell'editor vivono in B1Admin. Aggiungere un tipo di elemento significa toccare tutti e tre, in quell'ordine.
3. **Il sito pubblico legge endpoint anonimi.** Tutto ciò di cui B1App ha bisogno — l'albero della pagina, le impostazioni, i post del blog, i reindirizzamenti e gli endpoint church-data in altri moduli — è pubblico. L'autenticazione è facoltativa: un JWT sull'endpoint dell'albero anonimo sblocca le pagine solo per i membri, nient'altro cambia.

## L'albero di contenuti

Il modulo di contenuto (`Api/src/modules/content`) possiede i dati del builder:

| Tabella | Ruolo |
|-------|------|
| `pages` | Una pagina per URL: `url`, `title`, `layout`, più `visibility`/`groupIds` (access gating) e `metaDescription` (SEO) |
| `sections` | Bande orizzontali su una pagina (o in un blocco): sfondo, colore del testo e un `answersJSON` che porta lo stile più le configurazioni di shape-divider `dividerTop`/`dividerBottom` |
| `elements` | Elementi di contenuto all'interno di una sezione: `elementType` + `answersJSON`, annidabili per i tipi di layout (row/column, carousel) |
| `blocks` | Gruppi di sezione/elemento riutilizzabili (blocchi footer, blocchi elementi) condivisi tra le pagine |
| `posts` | Post di blog autonomi (vedi [Blog](#blog)) |
| `redirects` | Per-chiesa coppie `fromPath → toPath`, limitate a 200 (vedi [SEO](#seo-and-discoverability)) |
| `settings` | Impostazioni chiesa chiave-valore; le righe contrassegnate `public` vengono servite anonimamente e portano la configurazione del widget/analytics |

L'intero albero per un URL torna da una singola chiamata anonima — `GET /content/pages/:churchId/tree?url=/about` — da cui B1App rende il server. Le richieste dell'editor recuperano per id invece e mantengono gli id interni.

## Il contratto degli elementi

### Il catalogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definisce ogni tipo di elemento come un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, e uno schema JSON-style `answersSchema` per le sue risposte. `validateElementAnswers()` è deliberatamente indulgente — i tipi sconosciuti e le chiavi extra passano, quindi il contenuto vecchio non si rompe mai su un aggiornamento del catalogo. **35 tipi vengono spediti oggi:**

| Categoria | Tipi di elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

L'elemento `sermons` è il più configurabile dei tipi chiesa: una risposta `layout` seleziona `browse` (il legacy full browser), `grid`, `list`, o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles` e `showDates` che raffinano i layout non-browse.

### Renderer (`@churchapps/apphelper`)

I renderer vivono in `Packages/apphelper/src/website/components/elementTypes/`, un componente per tipo, risolto attraverso `ElementRegistry.ts` — una mappa a due livelli dove `Element.tsx` registra il renderer predefinito per tutti i 35 tipi (`registerDefaultElementRenderer`) e un'app host può sovrascrivere qualsiasi di essi in fase di esecuzione (`registerElementRenderer`) senza fare un fork del pacchetto.

### Moduli dell'editor (B1Admin)

I moduli delle impostazioni per-tipo dell'editor vivono in `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` invia a un componente dedicato (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o un costruttore di campi inline per tipo. Lo specchio rivolto all'AI di questo catalogo è lo strumento MCP `describe_page_builder` dell'API (vedi [MCP Server](../api/mcp)).

### Divisori di forma della sezione

Le sezioni possono portare divisori di forma decorativi su entrambi i bordi. La configurazione vive nel `answersJSON` della sezione come oggetti `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` con `shape` uno di `wave, waves, slant, curve, triangle, peaks`. Apphelper spedisce il componente `SectionDivider` e l'helper `parseDividerConfig()`; i renderer Section di entrambe le app (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analizzano le risposte e montano il divisore, e `SectionEdit.tsx` in B1Admin fornisce l'interfaccia del selettore. I pacchetti spediscono solo il blocco di costruzione — il cablaggio a livello di sezione è il lavoro delle app che le consumano.

## Elementi church-data

Tre tipi di elemento rendono dati live della chiesa piuttosto che contenuto creato. L'isolamento dei moduli si applica ancora — ognuno chiama l'endpoint pubblico del modulo possidente dal browser:

| Elemento | Endpoint | Note |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Restituisce `{ fundId, totalAmount, donationCount }`, optional `?startDate=&endDate=` window; l'elemento lo confronta con la sua risposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo opt-in**: il gruppo deve avere `publicRoster` impostato (predefinito disattivato). La proiezione è deliberatamente minima — `personId`, `displayName`, `leader`, photo — nessun campo di contatto o demografico |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Restituisce l'albero campus → service → time; il renderer apphelper emette schema.org `Event` JSON-LD al massimo sforzo (l'API restituisce dati semplici) |

:::warning
`publicRoster` è il gate della privacy per `staffGrid`. Non allargare mai la proiezione pubblica del membro del gruppo o bypassare il flag — l'endpoint del roster è anonimo per progettazione e l'elenco di campi minimo è la proprietà di sicurezza.
:::

## Widget a livello di sito

Due widget rendono su ogni pagina pubblica piuttosto che dentro l'albero: **AnnouncementBanner** (barra dismissibile in alto) e **Launcher** (hub di azione flottante per link di give/visit/watch-style). Sia i componenti che i loro helper `parse*Config()` si spediscono in apphelper. La configurazione è due righe di impostazioni pubbliche — chiavi `announcementBanner` e `launcher` — scritti da `SiteWidgetsEdit` di B1Admin (sulla pagina Appearance) e letti dal layout pubblico di B1App via `GET /content/settings/public/:churchId`. L'API tratta questi come coppie chiave-valore opache; i nomi delle chiavi sono una convenzione tra le due app.

## Blog

Il blog è un tipo di contenuto autonomo, non un layer sopra le pagine del builder. Una riga `posts` tiene l'intero post: `title`, `slug`, `excerpt`, `content` (corpo markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Superficie pubblica (tutto anonimo, `PostController`):

| Route | Scopo |
|-------|---------|
| `GET /content/posts/public/:churchId` | Post pubblicati, filtrabili per `?category=&tag=`, impaginati |
| `GET /content/posts/public/:churchId/categories` | Categorie distinte tra i post pubblicati |
| `GET /content/posts/public/:churchId/slug/:slug` | Un post pubblicato |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, intitolato con il nome della chiesa, con categoria per elemento e descrizione dell'estratto o contenuto |

Un post è "pubblicato" una volta che `publishDate` è impostato e nel passato; un `publishDate` futuro è un post pianificato (nascosto pubblicamente, mostrato con un chip Scheduled in admin). Gli endpoint di lettura arricchiscono ogni post con `authorName`, risolto da `authorId` attraverso il gateway del modulo di iscrizione. Gli estratti mancanti tornano al contenuto markdown spogliato (~160 chars) nelle schede di elenco, meta descrizioni e RSS. B1App serve `/{sdSlug}/blog` — un elenco editoriale (intestazione centrata che diventa il nome della categoria attiva/tag quando filtrato, riga filtro chip categoria, righe post thumbnail-left con byline ed estratti) con il feed RSS pubblicizzato come link alternativo — e `/{sdSlug}/blog/[postSlug]`, un percorso dedicato (non la pipeline Zone/Section) con un'intestazione centrata (kicker categoria, titolo, byline, regola accento colore primario), un eroe 16:9 alla larghezza del contenitore, il corpo markdown in una colonna di lettura ~720px, chip tag nel footer dell'articolo, una striscia di post correlati "More in {category}", e JSON-LD `BlogPosting` includendo l'autore. Entrambe le pagine si stilizzano interamente da token di tema quindi ereditano la tavolozza di ogni chiesa. Gli URL del blog sono inclusi nella sitemap per chiesa. L'interfaccia utente di authoring di B1Admin (**Site → Blog**) modifica i post in una finestra di dialogo: editor markdown con toggle di anteprima, selettore immagine di galleria ritagliata 16:9, selettore persona autore (predefinito all'utente in modifica), autocomplete categoria seminato dalle categorie esistenti, convalida slug duplicato, e toggle di pubblicazione; le righe pubblicate collegano al post live, e la pagina spinge gli admin ad aggiungere un link di navigazione `/blog`.

## Pagine solo per i membri

`pages.visibility` riusa l'enum dei link di navigazione — `everyone` (predefinito), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`) — ma come **hard access gate**, non un filtro nav (`PageVisibilityHelper.canViewPage`). Il flusso:

1. L'endpoint dell'albero anonimo controlla la visibilità sui recuperi basati su URL. I chiamanti anonimi di una pagina gated ottengono `{ restricted: true, visibility }` invece di contenuto — l'albero non trapela mai.
2. L'endpoint ancora onora un JWT: `CustomAuthProvider` verifica l'header `Authorization` su *every* request, incluse le route anonime, quindi il recupero di un membro autenticato dello stesso URL si risolve normalmente.
3. B1App rende `RestrictedPage` su una risposta `restricted`: idrata la sessione dalle credenziali memorizzate, ri-recupera l'albero con il JWT, e lo rende — o mostra un gate di login con un `returnUrl` quando non c'è sessione.

:::info
La granularità del gate varia per livello: `groups` controlla il `groupIds` del token contro l'elenco della pagina e `staff` controlla `membershipStatus`, ma `members` e `team` attualmente passano qualsiasi utente autenticato della chiesa. Tratta `groups` come l'opzione rigorosa.
:::

## SEO e discoveribilità

Tutto questo è rendering B1App-side sopra i dati ContentApi — l'API memorizza, l'app emette:

| Concern | Come funziona |
|---------|--------------|
| Meta descrizioni | `pages.metaDescription` (≤300 chars) scorre attraverso `MetaHelper.getMetaData()` nei metadati Next.js `Metadata` (description + Open Graph) su ogni route resa dal builder. Le impostazioni della pagina di B1Admin includono un pulsante AI "Generate" (vedi sotto) |
| Reindirizzamenti | Righe `redirects` per chiesa gestite a `/content/redirects` (`content.edit`, limite 200 righe, percorsi normalizzati). Su un 404 altrimenti, il percorso della pagina di B1App risolve il percorso rispetto a `GET /content/redirects/public/:churchId` e emette un HTTP 308 tramite il `permanentRedirect` di Next; i percorsi non abbinati passano a `notFound()` |
| 404 marchiato | `not-found.tsx` rende `BrandedNotFound` con il logo della chiesa, il nome e il tema invece di un errore generico |
| Dati strutturati | `BlogPosting` JSON-LD sui post del blog; `VideoObject` sulle pagine per-sermon (`/{sdSlug}/sermons/[sermonId]`) e sulle pagine che contengono un elemento `sermons`; `Event` dagli elementi calendario/evento sulle pagine del builder; schema.org `Event` dall'elemento `serviceTimes` |
| Pagine sermone | Ogni sermone pubblico ottiene una pagina crawlabile a `/sermons/[sermonId]` con metadati completi — i sermoni non sono più bloccati all'interno dell'elemento del browser lato client |
| Analytics | La chiave delle impostazioni pubbliche `ga4MeasurementId` (gestita accanto ai reindirizzamenti in B1Admin) inietta un gtag GA4 per chiesa tramite `next/script` |
| Sitemap & feed | La rotta `sitemap.xml` per chiesa include le pagine del builder e gli URL del blog; l'elenco del blog pubblicizza il feed RSS |
| Accessibilità | Il chrome pubblico rende un link skip targeting il landmark `<main id="main-content">` in ogni wrapper di layout |

## Generazione AI (AskApi)

La generazione di pagine e siti viene eseguita in **AskApi**, un servizio separato, sotto il controller `/website`. Si autentica con lo stesso JWT `CustomAuthProvider` di tutto il resto ed è **stateless rispetto ai contenuti**: ogni endpoint restituisce JSON e il chiamante (B1Admin) persiste il risultato attraverso ContentApi (`POST /content/pages/importTree` crea una pagina con il suo intero albero annidato sezione/elemento in una chiamata; inserisce sempre sotto la chiesa del chiamante e ignora gli id nel corpo).

### Generazione pagina (`planPage` → `writePage`)

Il modello di pagina "AI" nel `AddPageModal` di B1Admin utilizza una pipeline a basso costo (`AskApi/src/helpers/SiteGenHelper.ts`) costruita su una regola: **nessun modello emette mai JSON del builder**. Due modelli dividono il lavoro attraverso il Vercel AI Gateway (plain HTTP, chiave SSM `/{env}/aiGatewayApiKey` o `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — un modello decisionale tipizzato che restituisce scelte, punteggi e booleani con probabilità ma non può scrivere testo. Sceglie ogni sezione a turno da una libreria di template fisso, punteggia layout, verifica i fatti della copia e sceglie foto stock e icone. I costi di input sono circa $0,04 per milione di token e l'output è gratuito, quindi ~90 chiamate per pagina costano una frazione di centesimo.
- **Un piccolo modello di chat (GPT-4.1 mini per impostazione predefinita)** — riempie gli slot di testo denominati e con limite di lunghezza dei template scelti. Lo scrittore è uno costante, sovrascrivibile con la variabile di ambiente `SITEGEN_COPY_MODEL` (qualsiasi ID del modello di chat sul gateway, ad es. `anthropic/claude-haiku-4.5`). In un test side-by-side accecato su tre chiese Claude Haiku 4.5 leggeva leggermente più caldo, ma GPT-4.1 mini era vicino, circa 4x più economico e veloce, quindi è l'impostazione predefinita. Una pagina completa con tutti e tre i layout costa circa 1,3 centesimi, circa l'80% di esso lo scrittore.

| Fase | Endpoint | Cosa succede |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Classifica il tipo di pagina (home, visit, about…), quindi campiona 10 candidati di layout dalle probabilità per-round di JEV (hero + section count → each section → closer), de-duplica, ha JEV score ciascuno per fit/flow/gaps, e restituisce i 3 migliori più una voce di scrittura e uno `suggestedStyle` (tavolozza + font). I candidati che condividono le stesse sezioni finora chiedono a JEV una domanda identica, quindi i round sono memorizzati per prefisso. Un punteggio migliore sotto 6 è registrato come `lowLayoutScore` — quel log è il backlog di template che valga la pena aggiungere. ~2s |
| 2 | `POST /website/writePage` (una chiamata per candidato) | Lo scrittore riempie la copia dello slot due sezioni per chiamata, in parallelo, e restituisce cinque headline di eroe che JEV sceglie tra; JEV fact-checks ogni sezione; le sezioni che falliscono, usano una frase stock, o ri-raccontano una sezione precedente (run condiviso di 4 parole, controllato nel codice) vengono riscritti in parallelo con il motivo specifico; un scrub del codice rilascia le frasi con frasi di sito chiesa stock (a meno che la descrizione della chiesa non le usi); JEV sceglie soggetti foto, icone e il divisore di forma dell'eroe, e punteggia il risultato. Restituisce un albero di sezione pronto per il salvataggio e un punteggio. ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin scrive solo il layout di migliore classificazione (il finalista è un fallback se quel scritto fallisce), lo salva e apre l'anteprima (~10s dopo Save) |

Ogni fase è la sua richiesta quindi ogni chiamata rimane dentro il limite di 29 secondi del API Gateway. I template in `SiteGenHelper.buildTree` sono alberi di sezione + elemento fissi dal catalogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) e fanno riferimento a token di tema (`var(--accent)`, `var(--lightAccent)`…), quindi le pagine generate ereditano le impostazioni di apparenza esistenti della chiesa. Aggiungere un template di sezione significa aggiungere il suo elenco di slot a `SECTIONS` e il suo albero a `buildTree`; il test unitario cammina su ogni template e convalida l'albero.

**Ingressi.** La copia può solo indicare fatti da due fonti: quello che l'utente ha digitato, e `churchContext.facts` — record B1Admin raccoglie prima della pianificazione (orari di servizio pubblici e nomi di gruppi pubblici, più nome e indirizzo della chiesa). Gli stessi flag controllano i template supportati da dati: `times` rende l'elemento `serviceTimes` live quando la chiesa conserva gli orari di servizio in B1 (una tabella tipizzata altrimenti), `groups` e `countdown` vengono offerti solo quando ci sono dati dietro di essi. Le chiamate JEV sono coperte — una duplicazione si attiva dopo 1,5s e la prima risposta vince — perché il gateway occasionalmente si interrompe e le chiamate sono quasi gratis.

**Stare sull'argomento.** Il prompt dell'utente è il *subject della pagina*, non lo sfondo sulla chiesa. `planPage` classifica la richiesta (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), e per le pagine `event` e `topic` i template della chiesa generale (pastor note, sermons, ministries, groups, community impact, weekly times and countdown, video hero) non vengono nemmeno offerti, mentre `details` (when / where / what to bring) e un `eventCountdown` della data lo sono. Entrambi i giudici valutano l'on-topic-ness. B1Admin passa `pageType` dal piano in ogni chiamata `writePage`.

**Pagine complete da richieste brevi.** Le pagine hanno tre a sei sezioni medie, lunghezze di slot generose, una riga di introduzione sulle sezioni di carte e una FAQ a cinque domande, e il passo di riparazione espande qualsiasi sezione che torna sottile. La generazione è un clic: non ci sono domande di follow-up. Dove la richiesta lascia fuori un dettaglio ordinario una pagina completa ha bisogno (un'ora di inizio, una stanza, cosa portare, come iscriversi), lo scrittore la riempie con una scelta modesta e plausibile perché la chiesa editi. Poiché le sezioni vengono scritte in parallelo, quei gap vengono decisi **once**, in `planPage` (`assumedDetails`, una piccola chiamata scrittore che si esegue accanto al campionamento del layout), e viene ripassato in ogni chiamata `writePage` attraverso `churchContext.assumedDetails`, quindi una sezione non può dire 5:00 mentre un'altra dice 5:30. JEV ripara qualsiasi sezione che contraddice la richiesta, i record della chiesa o quei dettagli decisi. I dettagli decisi non sono surfaced nell'interfaccia utente; la chiesa rivede e modifica la pagina come qualsiasi altra. Alcune cose non vengono mai composte: nomi di persone, numeri di telefono, indirizzi email e web, prezzi, statistiche, la storia della chiesa, citazioni attribuite a persone, e un giorno della settimana per una data la richiesta non ha dato uno per.

**Visivi.** I template non nominano mai le loro foto o icone. Lasciano slot aperti, e un passo generico (`visualSlots` → `pickVisuals` → `applyVisuals` in `SiteGenHelper`) cammina l'albero finito e riempie ognuno: uno sfondo di sezione o una voce di galleria contrassegnata `auto:photo`, un `auto:icon`, il `auto:divider` dell'eroe, e, senza marker di sorta, qualsiasi elemento `textWithPhoto`, `card` o `image` il cui `photo` è vuoto. JEV sceglie ognuno dal testo accanto (una foto di una carta dal titolo e dal testo di quella carta; uno sfondo dalla copia della sezione), senza soggetto ripetuto su una pagina. Un nuovo template quindi ottiene foto gratuitamente. Le foto sono soggetti di ricerca Pexels emessi come placeholder `pexels:<term>` che B1Admin risolve attraverso `POST /content/stock/search`; un client che non invia `resolvesPhotos` ottiene un'immagine eroe integrata, bande a colori piatti e carte senza foto invece. Non ci sono deliberatamente soggetti di ritratto e il template del pastore non porta foto: uno straniero stock non deve mai stare al posto di una vera persona. Per una chiesa senza pagine ancora, B1Admin applica `suggestedStyle` agli stili globali; i siti esistenti mantengono il loro look.

### Altri endpoint

:::info
Il pulsante rewrite di `SectionToolbar` e il pulsante "Generate Site" dell'elenco pagine in B1Admin rimangono commentati lato client. Gli endpoint di AskApi di seguito ancora rispondono; solo quell'interfaccia utente è nascosta.
:::

| Endpoint | Scopo |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Il flusso originale della pagina due-step (outline, quindi una chiamata LLM per sezione che emette JSON elemento). Sostituito in B1Admin da `planPage`/`writePage` perché il costo; mantenuto per i consumer dell'API |
| `POST /website/generateSite` | Generazione sito intero. **Fase due per progettazione**: una chiamata `planOnly: true` restituisce solo il piano multi-pagina (una chiamata del modello veloce), poi il client richiede il contenuto completo — mantenendo ogni richiesta dentro il timeout Lambda/API-Gateway |
| `POST /website/rewriteSection` | Riscrittura di struttura-preservante: il modello può solo cambiare risposte che sopportano il testo. Una firma di struttura ricorsiva (ids + types + order) viene confrontata prima e dopo; qualsiasi mismatch restituisce la sezione originale con `fallback: true` invece di una struttura corrotta |
| `POST /website/generateAltText` | Chiamata visione su fino a 20 URL di immagine; restituisce testo alt conciso (≤125 chars, prefissi "photo of" spogliati) |
| `POST /website/generateMetaDescription` | Una meta descrizione SEO (≤155 chars) dal contenuto di testo della pagina — cablato al pulsante Generate nelle impostazioni della pagina di B1Admin |

I prompt per questi endpoint sono file markdown sotto `AskApi/config/instructions/`, incluso il catalogo di elemento che il modello genera da. Due punti di progettazione mantengono il catalogo onesto: il client passa `availableElementTypes` su ogni richiesta (il prompt può solo usare i tipi da quell'elenco — il server non hardcode mai l'insieme completo), e lo strumento MCP `describe_page_builder` dell'API porta la stessa guida per gli agenti AI che lavorano attraverso [MCP](../api/mcp). I modelli sono Anthropic Claude via OpenRouter — 3.5 Haiku per il contenuto della sezione (latenza), 3.5 Sonnet per outline, piani del sito e visione — con un fallback OpenAI quando non è configurata alcuna chiave OpenRouter.

## Form conversazionali

I form (modulo membership) hanno guadagnato una modalità conversazionale rivolta alle pagine in stile connect-card. Quattro colonne su `forms` lo guidano: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — il `FormSubmissionEdit` di apphelper passa al componente `ConversationalForm` (una domanda alla volta) quando `displayMode` è `conversational`; la pagina del form di B1App passa la modalità attraverso. Lo stesso payload di sottomissione in entrambi i casi.
- **Auto-create person** — sulla sottomissione con `autoCreatePerson` impostato, `ConversationalFormHelper.findOrCreatePerson` deduplica per email (case-insensitive) e altrimenti crea una famiglia + persona con `membershipStatus: "Guest"`, quindi collega la sottomissione a quella persona.
- **Follow-up email** — quando un soggetto e un corpo sono impostati, il mittente riceve un'email templateizzata (con token `{firstName}` / `{churchName}`) attraverso il percorso transazionale esistente (`TransactionalEmailHelper`), mai la porta della digest di notifica. Entrambi gli effetti collaterali sono non-fatali: un fallimento non perde mai la sottomissione.

I quattro campi sono impostati tramite l'API oggi; l'editor del form di B1Admin non li espone ancora.

## Cache di sito pubblico

Il percorso di rendering pubblico di B1App memorizza i recuperi etichettati chiesa (`next: { revalidate: 300, tags: [sdSlug] }` in produzione; `0` in dev) quindi una pagina live può rimanere stantia per fino a cinque minuti dopo una scrittura ContentApi. `POST /api/revalidate/{sdSlug}` su B1App chiama `revalidateTag(sdSlug)` e è l'unico modo per far cadere quella cache presto.

Due scrittori lo colpiscono:

1. **B1Admin** — `clearSiteCache()` in `B1Admin/src/site/siteCache.ts` POSTs dopo i salvataggi dell'editor. Preferisce il sottodominio del sito attivo (un sito secondario deve far saltare *that* tag, non il predefinito della chiesa).
2. **Api** — Mutazioni di contenuto che non passano mai per B1Admin (chiavi API, MCP, AI) fuoco `SiteCacheHelper.bump(churchId)` dai controller di contenuto. L'helper risolve il sottodominio della chiesa tramite `SubDomainHelper` e POSTs `{b1AppRoot}/api/revalidate/{sd}`. I fallimenti vengono ingoiati così un B1App irraggiungibile non può fallire un salvataggio.

Controller che colpiscono: pages (save, delete, duplicate, publish, discard, unpublish, AI temp), sections, elements, blocks, links, global styles, posts, and redirects. Dev `b1AppRoot` è `http://{subdomain}.localtest.me:3301`; demo/staging/prod usano `https://{subdomain}.b1.church`.

## Pagine Correlate

- [Website Routing & Multi-Site](./websites) — come una richiesta si risolve in una chiesa/sito e come i domini personalizzati si instradano
- [Content Endpoints](../api/endpoints/content) — superficie REST completa per pagine, sezioni, elementi, blocchi, post, reindirizzamenti e impostazioni
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che spedisce i renderer, il registro, i divisori e i widget
- [MCP Server](../api/mcp) — incluso lo strumento guida `describe_page_builder`
- [Page Editor (end-user)](/docs/b1-admin/website/page-editor) — la documentazione dell'editor rivolta al personale
