---
title: "Architettura del Website Builder"
---

# Architettura del Website Builder

<div class="article-intro">

Ogni sito web di chiesa servito da B1App viene renderizzato da un albero di contenuto — pagine, sezioni, elementi — memorizzato nel ContentApi e modificato visivamente in B1Admin. Un'unica libreria di componenti condivisa renderizza sia l'anteprima dell'editor sia il sito live, un unico catalogo di tipi di elemento definisce cosa può apparire su una pagina, e un servizio AI separato può generare o riscrivere quell'albero. Questa pagina mappa l'intero stack: il contratto degli elementi in `@churchapps/helpers`, la pipeline di rendering, gli elementi dati della chiesa, i widget a livello di sito, lo strato blog, le pagine ad accesso riservato, la SEO, la generazione AI, e i moduli conversazionali.

</div>

## Panoramica

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor             │             │  Api — modulo /content (ContentApi)     │
│  ContentEditor · SectionEdit  │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit   │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog       │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        pipeline di rendering condivisa          ▼            (anonimo, JWT rispettato)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — sito pubblico (Next.js)│
               │    ElementTypes.ts (catalogo) │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widget, JSON-LD, sitemap,    │
               │    ElementRegistry, renderer  │   │    redirect, 404 personalizzato │
               │    SectionDivider, widget     │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ elementi dati chiesa
                                                                    ▼
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  AskApi — /website/* (AI)    │             │  /giving/funds/public/…/total           │
│  generateSite · rewriteSection│            │  /membership/groupmembers/public/…      │
│  generateAltText · metaDesc  │             │  /attendance/servicetimes/public/…      │
│  restituisce JSON; B1Admin salva│          └─────────────────────────────────────────┘
└──────────────────────────────┘
```

Tre regole valgono in tutto lo stack:

1. **Un albero, due renderer.** Una pagina è un albero `pages → sections → elements` dove ogni nodo porta le proprie impostazioni come un blob JSON `answers`. Gli stessi componenti apphelper renderizzano l'editor drag-and-drop in B1Admin e il sito pubblico renderizzato lato server in B1App — non esiste alcun "formato di pubblicazione" separato.
2. **Il contratto vive in `@churchapps/helpers`.** `ElementTypes.ts` è l'unico catalogo dei tipi di elemento; i renderer si risolvono tramite un registro in apphelper; i moduli dell'editor vivono in B1Admin. Aggiungere un tipo di elemento significa toccare tutti e tre, in quell'ordine.
3. **Il sito pubblico legge endpoint anonimi.** Tutto ciò di cui B1App ha bisogno — l'albero della pagina, le impostazioni, i post del blog, i redirect, e gli endpoint dati della chiesa in altri moduli — è pubblico. L'autenticazione è opzionale: un JWT sull'endpoint dell'albero anonimo sblocca le pagine riservate ai membri, nient'altro cambia.

## L'albero di contenuto

Il modulo di contenuto (`Api/src/modules/content`) possiede i dati del builder:

| Tabella | Ruolo |
|-------|------|
| `pages` | Una pagina per URL: `url`, `title`, `layout`, più `visibility`/`groupIds` (gating dell'accesso) e `metaDescription` (SEO) |
| `sections` | Bande orizzontali su una pagina (o in un blocco): sfondo, colore del testo, e un `answersJSON` che porta lo stile più le configurazioni di divisore-forma `dividerTop`/`dividerBottom` |
| `elements` | Pezzi di contenuto dentro una sezione: `elementType` + `answersJSON`, annidabili per i tipi di layout (riga/colonna, carosello) |
| `blocks` | Gruppi riutilizzabili di sezioni/elementi (blocchi piè di pagina, blocchi elemento) condivisi tra le pagine |
| `posts` | Post di blog autonomi (vedi [Blog](#blog)) |
| `redirects` | Coppie `fromPath → toPath` per chiesa, limitate a 200 (vedi [SEO](#seo-e-visibilità)) |
| `settings` | Impostazioni chiesa chiave-valore; le righe contrassegnate `public` sono servite in modo anonimo e portano la configurazione widget/analytics |

L'intero albero per un URL torna da un'unica chiamata anonima — `GET /content/pages/:churchId/tree?url=/about` — che è ciò che B1App renderizza lato server. Le richieste dell'editor recuperano invece per id e mantengono gli id interni.

## Il contratto dell'elemento

### Il catalogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definisce ogni tipo di elemento come un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, e uno `answersSchema` in stile JSON-schema per le sue risposte. `validateElementAnswers()` è deliberatamente permissivo — tipi sconosciuti e chiavi extra passano, così il vecchio contenuto non si rompe mai su un aggiornamento del catalogo. **Oggi vengono distribuiti 35 tipi:**

| Categoria | Tipi di elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| contenuto (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| chiesa (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avanzati (2) | rawHTML, iframe |

L'elemento `sermons` è il più configurabile tra i tipi chiesa: una risposta `layout` seleziona `browse` (il browser completo legacy), `grid`, `list`, o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles`, e `showDates` che affinano i layout non-browse.

### Renderer (`@churchapps/apphelper`)

I renderer vivono in `Packages/apphelper/src/website/components/elementTypes/`, un componente per tipo, risolti tramite `ElementRegistry.ts` — una mappa a due livelli dove `Element.tsx` registra il renderer predefinito per tutti e 35 i tipi (`registerDefaultElementRenderer`) e un'app host può sovrascriverne qualsiasi a runtime (`registerElementRenderer`) senza forkare il pacchetto.

### Moduli dell'editor (B1Admin)

I moduli di impostazione per tipo dell'editor vivono in `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` smista verso un componente dedicato (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o un costruttore di campi inline per tipo. Lo specchio rivolto all'AI di questo catalogo è lo strumento MCP `describe_page_builder` dell'API (vedi [Server MCP](../api/mcp)).

### Divisori di forma della sezione

Le sezioni possono portare divisori di forma decorativi su entrambi i bordi. La configurazione vive nell'`answersJSON` della sezione come oggetti `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` con `shape` uno tra `wave, waves, slant, curve, triangle, peaks`. Apphelper distribuisce il componente `SectionDivider` e l'helper `parseDividerConfig()`; i renderer Section di entrambe le app (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analizzano le risposte e montano il divisore, e `SectionEdit.tsx` in B1Admin fornisce l'interfaccia di selezione. I pacchetti distribuiscono solo il blocco costitutivo — il cablaggio a livello di sezione è compito delle app consumatrici.

## Elementi dati della chiesa

Tre tipi di elemento renderizzano dati live della chiesa invece di contenuto redatto. L'isolamento dei moduli si applica comunque — ognuno chiama l'endpoint pubblico del proprio modulo proprietario dal browser:

| Elemento | Endpoint | Note |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Restituisce `{ fundId, totalAmount, donationCount }`, finestra opzionale `?startDate=&endDate=`; l'elemento la confronta con la sua risposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo opt-in**: il gruppo deve avere `publicRoster` impostato (disattivato per default). La proiezione è deliberatamente minima — `personId`, `displayName`, `leader`, foto — nessun campo di contatto o demografico |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Restituisce l'albero campus → servizio → orario; il renderer apphelper emette JSON-LD schema.org `Event` best-effort da esso (l'API restituisce dati semplici) |

:::warning
`publicRoster` è la barriera di privacy per `staffGrid`. Non allargare mai la proiezione pubblica dei membri di gruppo né bypassare il flag — l'endpoint del roster è anonimo per design e l'elenco minimo dei campi è la proprietà di sicurezza.
:::

## Widget a livello di sito

Due widget si renderizzano su ogni pagina pubblica invece che dentro l'albero: **AnnouncementBanner** (barra chiudibile in cima alla pagina) e **Launcher** (hub d'azione fluttuante per link stile dai/visita/guarda). Entrambi i componenti e i loro helper `parse*Config()` sono distribuiti in apphelper. La configurazione è composta da due righe di impostazioni pubbliche — chiavi `announcementBanner` e `launcher` — scritte da `SiteWidgetsEdit` di B1Admin (sulla pagina Aspetto) e lette dal layout pubblico di B1App tramite `GET /content/settings/public/:churchId`. L'API tratta questi come coppie chiave-valore opache; i nomi delle chiavi sono una convenzione tra le due app.

## Blog

Il blog è un tipo di contenuto autonomo, non uno strato sopra le pagine del builder. Una riga `posts` contiene l'intero post: `title`, `slug`, `excerpt`, `content` (corpo in markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Superficie pubblica (tutta anonima, `PostController`):

| Rotta | Scopo |
|-------|---------|
| `GET /content/posts/public/:churchId` | Post pubblicati, filtrabili per `?category=&tag=`, paginati |
| `GET /content/posts/public/:churchId/categories` | Categorie distinte tra i post pubblicati |
| `GET /content/posts/public/:churchId/slug/:slug` | Un post pubblicato |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, intitolato con il nome della chiesa, con categoria per elemento ed excerpt-o-contenuto come descrizione |

Un post è "pubblicato" una volta che `publishDate` è impostata ed è passata; una `publishDate` futura è un post programmato (nascosto pubblicamente, mostrato con un chip Programmato nell'admin). Gli endpoint di lettura arricchiscono ogni post con `authorName`, risolto da `authorId` tramite il gateway del modulo membership. Gli excerpt mancanti ricadono sul contenuto markdown spogliato (~160 caratteri) nelle card di elenco, nelle meta description, e nell'RSS. B1App serve `/{sdSlug}/blog` — un elenco editoriale (intestazione centrata che diventa il nome della categoria/tag attivi quando filtrato, riga di filtro con chip di categoria, righe di post con miniatura a sinistra con firma e excerpt) con il feed RSS pubblicizzato come link alternativo — e `/{sdSlug}/blog/[postSlug]`, una rotta dedicata (non la pipeline Zone/Section) con un'intestazione centrata (kicker di categoria, titolo, firma, riga di accento colore primario), un hero 16:9 a larghezza contenitore, il corpo markdown in una colonna di lettura di ~720px, chip di tag nel footer dell'articolo, una striscia di post correlati `"Altro in {category}"`, e JSON-LD `BlogPosting` che include l'autore. Entrambe le pagine si stilizzano interamente dai token del tema così ereditano la palette di ogni chiesa. Gli URL del blog sono inclusi nella sitemap per chiesa. L'interfaccia di creazione di B1Admin (**Sito → Blog**) modifica i post in una finestra di dialogo: editor markdown con toggle di anteprima, selettore di immagine galleria ritagliata 16:9, selettore di persona autore (predefinito l'utente in modifica), autocompletamento categoria seminato dalle categorie esistenti, validazione slug duplicato, e un interruttore di pubblicazione; le righe pubblicate rimandano al post live, e la pagina invita gli admin ad aggiungere un link di navigazione `/blog`.

## Pagine riservate ai membri

`pages.visibility` riutilizza l'enum dei link di navigazione — `everyone` (predefinito), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`) — ma come una **barriera di accesso rigida**, non un filtro di navigazione (`PageVisibilityHelper.canViewPage`). Il flusso:

1. L'endpoint dell'albero anonimo controlla la visibilità sui recuperi basati su URL. I chiamanti anonimi di una pagina protetta ottengono `{ restricted: true, visibility }` invece del contenuto — l'albero non trapela mai.
2. L'endpoint rispetta comunque un JWT: `CustomAuthProvider` verifica l'header `Authorization` su *ogni* richiesta, incluse le rotte anonime, così il recupero dello stesso URL da parte di un membro autenticato si risolve normalmente.
3. B1App renderizza `RestrictedPage` su una risposta `restricted`: idrata la sessione da credenziali memorizzate, ri-recupera l'albero con il JWT, e lo renderizza — oppure mostra una barriera di login con un `returnUrl` quando non c'è sessione.

:::info
La granularità della barriera varia per livello: `groups` controlla i `groupIds` del token rispetto all'elenco della pagina e `staff` controlla `membershipStatus`, ma `members` e `team` attualmente lasciano passare qualsiasi utente autenticato della chiesa. Considera `groups` come l'opzione rigorosa.
:::

## SEO e visibilità

Tutto questo è rendering lato B1App su dati ContentApi — l'API memorizza, l'app emette:

| Aspetto | Come funziona |
|---------|--------------|
| Meta description | `pages.metaDescription` (≤300 caratteri) fluisce attraverso `MetaHelper.getMetaData()` nei `Metadata` di Next.js (description + Open Graph) su ogni rotta renderizzata dal builder. Le impostazioni pagina di B1Admin includono un pulsante "Genera" con AI (vedi sotto) |
| Redirect | Righe `redirects` per chiesa gestite a `/content/redirects` (`content.edit`, limite di 200 righe, percorsi normalizzati). Su un potenziale 404, la rotta pagina di B1App risolve il percorso contro `GET /content/redirects/public/:churchId` ed emette un HTTP 308 tramite `permanentRedirect` di Next; i percorsi non corrispondenti passano a `notFound()` |
| 404 personalizzato | `not-found.tsx` renderizza `BrandedNotFound` con il logo, il nome, e il tema della chiesa invece di un errore generico |
| Dati strutturati | JSON-LD `BlogPosting` sui post di blog; `VideoObject` sulle pagine per-sermone (`/{sdSlug}/sermons/[sermonId]`) e sulle pagine contenenti un elemento `sermons`; `Event` dagli elementi calendario/evento sulle pagine del builder; `Event` schema.org dall'elemento `serviceTimes` |
| Pagine sermoni | Ogni sermone pubblico ottiene una pagina scansionabile a `/sermons/[sermonId]` con metadata completi — i sermoni non sono più bloccati dentro l'elemento browser lato client |
| Analytics | La chiave di impostazioni pubbliche `ga4MeasurementId` (gestita accanto ai redirect in B1Admin) inietta un gtag GA4 per chiesa tramite `next/script` |
| Sitemap e feed | La rotta `sitemap.xml` per chiesa include le pagine del builder e gli URL del blog; l'elenco del blog pubblicizza il feed RSS |
| Accessibilità | Il chrome pubblico renderizza un link "salta al contenuto" che punta al landmark `<main id="main-content">` in ogni wrapper di layout |

## Generazione AI (AskApi)

La generazione di pagine e siti gira in **AskApi**, un servizio separato, sotto il controller `/website`. Si autentica con lo stesso JWT `CustomAuthProvider` di tutto il resto ed è **senza stato rispetto al contenuto**: ogni endpoint restituisce JSON e il chiamante (B1Admin) persiste il risultato tramite ContentApi (`POST /content/pages/temp/ai` salva un bundle pagina-sezioni-elementi generato in un'unica chiamata).

:::info
A partire dal 2026-07-03, i punti di ingresso di B1Admin a questa pipeline — il template "AI" del sito in `AddPageModal`, il pulsante di riscrittura `SectionToolbar`, e il pulsante "Genera sito" dell'elenco pagine — sono commentati lato client mentre la funzionalità viene rielaborata. Gli endpoint AskApi sotto non sono interessati e rispondono ancora; solo l'interfaccia utente di B1Admin è nascosta.
:::

| Endpoint | Scopo |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Il flusso pagina originale a due passaggi: prima lo schema, poi una chiamata per sezione. Il template pagina "AI" di B1Admin in `AddPageModal` guida questo — schema, poi generazione parallela delle sezioni, poi anteprima |
| `POST /website/generateSite` | Generazione dell'intero sito. **Due fasi per design**: una chiamata `planOnly: true` restituisce solo il piano multi-pagina (una chiamata modello veloce), poi il client richiede il contenuto completo — mantenendo ogni richiesta dentro il timeout di Lambda/API-Gateway |
| `POST /website/rewriteSection` | Riscrittura che preserva la struttura: il modello può cambiare solo le risposte che contengono testo. Una firma di struttura ricorsiva (id + tipi + ordine) viene confrontata prima e dopo; qualsiasi mancata corrispondenza restituisce la sezione originale con `fallback: true` invece di struttura corrotta |
| `POST /website/generateAltText` | Chiamata di visione su fino a 20 URL di immagini; restituisce testo alt conciso (≤125 caratteri, prefissi "photo of" rimossi) |
| `POST /website/generateMetaDescription` | Una meta description SEO (≤155 caratteri) dal contenuto testuale della pagina — collegata al pulsante Genera nelle impostazioni pagina di B1Admin |

I prompt sono file markdown sotto `AskApi/config/instructions/`, incluso il catalogo degli elementi da cui il modello genera. Due scelte di design mantengono il catalogo onesto: il client passa `availableElementTypes` a ogni richiesta (il prompt può usare solo tipi da quell'elenco — il server non fissa mai il set completo nel codice), e lo strumento MCP `describe_page_builder` dell'API porta la stessa guida agli agenti AI che lavorano tramite [MCP](../api/mcp). I modelli sono Anthropic Claude tramite OpenRouter — 3.5 Haiku per il contenuto delle sezioni (latenza), 3.5 Sonnet per schemi, piani del sito, e visione — con un fallback OpenAI quando non è configurata alcuna chiave OpenRouter.

## Moduli conversazionali

I moduli (modulo membership) hanno guadagnato una modalità conversazionale pensata per pagine in stile scheda di contatto. Quattro colonne su `forms` la guidano: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — `FormSubmissionEdit` di apphelper passa al componente `ConversationalForm` (una domanda alla volta) quando `displayMode` è `conversational`; la pagina moduli di B1App passa la modalità. Stesso payload di invio in entrambi i casi.
- **Creazione automatica della persona** — all'invio con `autoCreatePerson` impostato, `ConversationalFormHelper.findOrCreatePerson` deduplica per email (case-insensitive) e altrimenti crea un nucleo familiare + persona con `membershipStatus: "Guest"`, poi collega l'invio a quella persona.
- **Email di follow-up** — quando un soggetto e un corpo sono impostati, chi invia riceve un'email basata su template (con token `{firstName}` / `{churchName}`) tramite il percorso transazionale esistente (`TransactionalEmailHelper`), mai la porta del digest di notifiche. Entrambi gli effetti collaterali non sono fatali: un fallimento non perde mai l'invio.

I quattro campi vengono impostati oggi tramite l'API; l'editor moduli di B1Admin non li espone ancora.

## Pagine correlate

- [Routing del sito web e multi-sito](./websites) — come una richiesta si risolve in una chiesa/sito e come si instradano i domini personalizzati
- [Endpoint di content](../api/endpoints/content) — superficie REST completa per pagine, sezioni, elementi, blocchi, post, redirect, e impostazioni
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che distribuisce i renderer, il registro, i divisori, e i widget
- [Server MCP](../api/mcp) — incluso lo strumento guida `describe_page_builder`
- [Editor pagina (end-user)](/docs/b1-admin/website/page-editor) — la documentazione dell'editor rivolta allo staff
