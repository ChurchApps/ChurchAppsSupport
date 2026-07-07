---
title: "Architettura Website Builder"
---

# Architettura Website Builder

<div class="article-intro">

Ogni sito web della chiesa servito da B1App viene renderizzato da un albero di contenuto — pagine, sezioni, elementi — memorizzato nel ContentApi e modificato visivamente in B1Admin. Una libreria di componenti condivisa renderizza sia l'anteprima dell'editor che il sito dal vivo, un catalogo di tipo di elemento definisce cosa può apparire su una pagina, e un servizio AI separato può generare o riscrivere quell'albero. Questa pagina mappa l'intero stack: il contratto di elemento in `@churchapps/helpers`, la pipeline di rendering, elementi di dati della chiesa, widget a livello di sito, lo strato blog, pagine protette da accesso, SEO, generazione AI, e moduli conversazionali.

</div>

## Panoramica

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — modulo /content (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pagine ─ sezioni ─ elementi  blocchi   │
│  SiteWidgetsEdit · Blog      │             │  post   reindirizzamenti   impostazioni │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        pipeline di rendering condiviso          ▼            (anonimo, JWT onorato)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — sito pubblico (Next.js)│
               │    ElementTypes.ts (catalogo) │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widget, JSON-LD, sitemap,    │
               │    ElementRegistry, renderer  │   │    reindirizzamenti, 404 brand  │
               │    SectionDivider, widget     │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ elementi dati chiesa
                                                                   ▼
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  AskApi — /website/* (AI)    │             │  /giving/funds/public/…/total           │
│  generateSite · rewriteSection│            │  /membership/groupmembers/public/…      │
│  generateAltText · metaDesc  │             │  /attendance/servicetimes/public/…      │
│  ritorna JSON; B1Admin salva │             └─────────────────────────────────────────┘
└──────────────────────────────┘
```

Tre regole si mantengono in tutto lo stack:

1. **Un albero, due renderer.** Una pagina è un albero `pages → sections → elements` dove ogni nodo porta le sue impostazioni come un blob JSON `answers`. Gli stessi componenti apphelper renderizzano l'editor drag-and-drop in B1Admin e il sito pubblico server-rendered in B1App — non c'è nessun "formato di pubblicazione" separato.
2. **Il contratto vive in `@churchapps/helpers`.** `ElementTypes.ts` è l'unico catalogo di tipi di elemento; i renderer si risolvono attraverso un registro in apphelper; le forme dell'editor vivono in B1Admin. Aggiungere un tipo di elemento significa toccare tutti e tre, in quell'ordine.
3. **Il sito pubblico legge endpoint anonimi.** Tutto ciò di cui B1App ha bisogno — l'albero di pagina, impostazioni, post di blog, reindirizzamenti, e endpoint di dati della chiesa in altri moduli — è pubblico. L'auth è opzionale: un JWT sull'endpoint dell'albero anonimo sblocca le pagine dei soli membri, nient'altro cambia.

## L'albero di contenuto

Il modulo di contenuto (`Api/src/modules/content`) possiede i dati del builder:

| Tabella | Ruolo |
|-------|------|
| `pages` | Una pagina per URL: `url`, `title`, `layout`, più `visibility`/`groupIds` (gating di accesso) e `metaDescription` (SEO) |
| `sections` | Bande orizzontali su una pagina (o in un blocco): sfondo, colore del testo, e un `answersJSON` che porta lo stile più le configurazioni di shape-divider `dividerTop`/`dividerBottom` |
| `elements` | Pezzi di contenuto dentro una sezione: `elementType` + `answersJSON`, annidabili per tipi di layout (riga/colonna, carosello) |
| `blocks` | Gruppi di sezione/elemento riusabili (blocchi di piè di pagina, blocchi di elemento) condivisi tra pagine |
| `posts` | Metadata di blog su una pagina del builder regolare (vedi [Blog](#blog-post-su-pagine)) |
| `redirects` | Coppie per-chiesa `fromPath → toPath`, limitate a 200 (vedi [SEO](#seo-e-discoveribilità)) |
| `settings` | Impostazioni di chiesa key-value; le righe contrassegnate `public` vengono servite anonimamente e portano la configurazione widget/analytics |

L'intero albero per un URL torna da una singola chiamata anonima — `GET /content/pages/:churchId/tree?url=/about` — che è quello che B1App server-renderizza. Le richieste dell'editor recuperano per id invece e mantengono id interni.

## Il contratto dell'elemento

### Il catalogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definisce ogni tipo di elemento come un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, e uno `answersSchema` in stile JSON-schema per le sue risposte. `validateElementAnswers()` è deliberatamente indulgente — i tipi sconosciuti e i tasti extra passano, così il vecchio contenuto non si rompe mai su un aggiornamento del catalogo. **35 tipi spediscono oggi:**

| Categoria | Tipi di elemento |
|----------|---------------|
| layout (6) | riga, colonna, scatola, carosello, whitespace, blocco |
| contenuto (11) | testo, testoConFoto, scheda, faq, iconFeature, testimonianza, iconeSociali, conto alla rovescia, statistiche, tabella, buttonLink |
| media (4) | immagine, galleria, video, mappa |
| chiesa (12) | logo, sermoni, trasmissione, donazione, donazioneLinkk, modulo, calendario, listaGruppi, gruppi, progressoCampagna, gridStaff, orariServizi |
| avanzati (2) | htmlGrezzo, iframe |

L'elemento `sermons` è il più configurabile dei tipi di chiesa: una risposta `layout` seleziona `browse` (il browser completo legacy), `grid`, `list`, o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles`, e `showDates` che affinano i layout non-browse.

### Renderer (`@churchapps/apphelper`)

I renderer vivono in `Packages/apphelper/src/website/components/elementTypes/`, un componente per tipo, risolti attraverso `ElementRegistry.ts` — una mappa a due livelli dove `Element.tsx` registra il renderer predefinito per tutti e 35 i tipi (`registerDefaultElementRenderer`) e un'app host può sovrascrivere qualsiasi di essi al runtime (`registerElementRenderer`) senza forkare il pacchetto.

### Forme dell'editor (B1Admin)

Le forme di impostazioni per-tipo dell'editor vivono in `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` invia a un componente dedicato (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o un builder di campo inline per tipo. Lo specchio rivolto all'AI di questo catalogo è lo strumento MCP `describe_page_builder` dell'API (vedi [Server MCP](../api/mcp)).

### Divisori di forma della sezione

Le sezioni possono portare divisori di forma decorativi su entrambi i bordi. La configurazione vive nel `answersJSON` della sezione come oggetti `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` con `shape` uno di `wave, waves, slant, curve, triangle, peaks`. Apphelper spedisce il componente `SectionDivider` e l'aiutante `parseDividerConfig()`; i renderer Section di entrambe le app (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analizzano le risposte e montano il divisore, e `SectionEdit.tsx` in B1Admin fornisce l'UI del selettore. I pacchetti spediscono solo il blocco di costruzione — il cablaggio a livello di sezione è il compito delle app consumatrici.

## Elementi di dati della chiesa

Tre tipi di elemento renderizzano dati della chiesa dal vivo piuttosto che contenuto redatto. L'isolamento del modulo si applica ancora — ognuno chiama il proprio endpoint pubblico del modulo proprietario dal browser:

| Elemento | Endpoint | Note |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Ritorna `{ fundId, totalAmount, donationCount }`, finestra opzionale `?startDate=&endDate=`; l'elemento lo confronta con la sua risposta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo opt-in**: il gruppo deve avere `publicRoster` impostato (predefinito spento). La proiezione è deliberatamente minima — `personId`, `displayName`, `leader`, foto — nessun contatto o campo demografico |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Ritorna l'albero campus → servizio → tempo; il renderer apphelper emette JSON-LD schema.org `Event` best-effort da esso (l'API ritorna dati semplici) |

:::warning
`publicRoster` è il gate di privacy per `staffGrid`. Non allargare mai la proiezione di membro di gruppo pubblico o bypassare il flag — l'endpoint del roster è anonimo per design e l'elenco di campi minimo è la proprietà di sicurezza.
:::

## Widget a livello di sito

Due widget renderizzano su ogni pagina pubblica piuttosto che dentro l'albero: **AnnouncementBanner** (barra superiore della pagina chiudibile) e **Launcher** (hub di azione fluttuante per link stile dai/visita/guarda). Entrambi i componenti e i loro aiutanti `parse*Config()` spediscono in apphelper. La configurazione è due righe di impostazioni pubbliche — chiavi `announcementBanner` e `launcher` — scritti da `SiteWidgetsEdit` di B1Admin (nella pagina Aspetto) e letti dal layout pubblico di B1App tramite `GET /content/settings/public/:churchId`. L'API tratta questi come coppie key-value opache; i nomi delle chiavi sono una convenzione tra le due app.

## Blog: post su pagine

Il blog è uno strato di metadata sottile, non un secondo sistema di contenuto. Una riga `posts` (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) punta a una pagina del builder regolare tramite `pageId`; la pagina tiene il corpo e viene modificato nell'editor di pagina normale. Superficie pubblica (tutto anonimo, `PostController`):

| Rotta | Scopo |
|-------|---------|
| `GET /content/posts/public/:churchId` | Post pubblicati, filtrabili per `?category=&tag=`, paginati |
| `GET /content/posts/public/:churchId/slug/:slug` | Metadata di un post |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0 |

Un post è "pubblicato" una volta che `publishDate` è impostato e passato. B1App serve `/{sdSlug}/blog` (elenco, con il feed RSS pubblicizzato come collegamento alternativo) e `/{sdSlug}/blog/[postSlug]`, che recupera l'albero di pagina di supporto a `/blog/{slug}` e lo renderizza attraverso la stessa pipeline Zone/Section come qualsiasi altra pagina, aggiungendo JSON-LD `BlogPosting`. Gli URL del blog sono inclusi nella sitemap per-chiesa. L'UI di creazione di B1Admin (**Sito → Blog**) crea la pagina di supporto a `/blog/{slug}` e la riga `posts` insieme.

## Pagine riservate ai soli membri

`pages.visibility` riusa l'enum di link di navigazione — `everyone` (predefinito), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`) — ma come un **gate di accesso duro**, non un filtro di nav (`PageVisibilityHelper.canViewPage`). Il flusso:

1. L'endpoint dell'albero anonimo controlla la visibilità su recuperi basati su URL. I chiamanti anonimi di una pagina gated ottengono `{ restricted: true, visibility }` invece del contenuto — l'albero non perde mai.
2. L'endpoint comunque onora un JWT: `CustomAuthProvider` verifica l'intestazione `Authorization` su *ogni* richiesta, incluse rotte anonime, così il recupero di un membro autenticato dello stesso URL si risolve normalmente.
3. B1App renderizza `RestrictedPage` su una risposta `restricted`: idrata la sessione da credenziali memorizzate, ri-recupera l'albero con il JWT, e lo renderizza — o mostra un gate di accesso con un `returnUrl` quando non c'è sessione.

:::info
La granularità del gate varia per livello: `groups` controlla i `groupIds` del token rispetto all'elenco della pagina e `staff` controlla `membershipStatus`, ma `members` e `team` attualmente passano qualsiasi utente autenticato della chiesa. Tratta `groups` come l'opzione rigorosa.
:::

## SEO e discoveribilità

Tutto questo è rendering B1App-side su dati ContentApi — l'API memorizza, l'app emette:

| Preoccupazione | Come funziona |
|---------|--------------|
| Meta descrizioni | `pages.metaDescription` (≤300 caratteri) fluisce attraverso `MetaHelper.getMetaData()` nel Next.js `Metadata` (descrizione + Open Graph) su ogni rotta renderizzata dal builder. Le impostazioni della pagina di B1Admin includono un pulsante "Genera" AI (vedi sotto) |
| Reindirizzamenti | Righe per-chiesa `redirects` gestite a `/content/redirects` (`content.edit`, limite 200 righe, percorsi normalizzati). Su un 404 che altrimenti, il route della pagina di B1App risolve il percorso rispetto a `GET /content/redirects/public/:churchId` ed emette un HTTP 308 tramite Next's `permanentRedirect`; i percorsi non abbinati passano attraverso `notFound()` |
| 404 branded | `not-found.tsx` renderizza `BrandedNotFound` con il logo, nome, e tema della chiesa invece di un errore generico |
| Dati strutturati | JSON-LD `BlogPosting` su post di blog; `VideoObject` sulle pagine per-sermone (`/{sdSlug}/sermons/[sermonId]`) e su pagine che contengono un elemento `sermons`; `Event` da elementi calendario/evento su pagine del builder; `Event` schema.org dall'elemento `serviceTimes` |
| Pagine di sermoni | Ogni sermone pubblico riceve una pagina crawlabile a `/sermons/[sermonId]` con metadata completo — i sermoni non sono più bloccati dentro l'elemento browser lato client |
| Analytics | La chiave di impostazioni pubbliche `ga4MeasurementId` (gestita accanto ai reindirizzamenti in B1Admin) inietta un gtag GA4 per-chiesa tramite `next/script` |
| Sitemap e feed | La rotta per-chiesa `sitemap.xml` include pagine del builder e URL di blog; l'elenco di blog pubblicizza il feed RSS |
| Accessibilità | Il chrome pubblico renderizza un skip link che prende di mira il landmark `<main id="main-content">` in ogni wrapper di layout |

## Generazione AI (AskApi)

La generazione di pagina e sito esegue in **AskApi**, un servizio separato, sotto il controller `/website`. Si autentica con lo stesso JWT di `CustomAuthProvider` come tutto il resto ed è **senza stato per quanto riguarda il contenuto**: ogni endpoint ritorna JSON e il chiamante (B1Admin) persiste il risultato attraverso ContentApi (`POST /content/pages/temp/ai` salva un bundle di pagina-sezioni-elementi generato in una chiamata).

:::info
A partire da 2026-07-03, i punti di ingresso di B1Admin a questa pipeline — il modello "AI" del sito in `AddPageModal`, il pulsante di riscrittura `SectionToolbar`, e il pulsante "Genera sito" della lista pagine — sono commentati client-side mentre la funzione viene rielaborata. Gli endpoint AskApi sotto non sono interessati e rispondono ancora; solo l'interfaccia utente di B1Admin è nascosta.
:::

| Endpoint | Scopo |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Il flusso di pagina originale a due step: contorno per primo, poi una chiamata per sezione. Il modello "AI" della pagina di B1Admin in `AddPageModal` guida questo — contorno, poi generazione di sezione parallela, poi anteprima |
| `POST /website/generateSite` | Generazione di intero sito. **Due fasi per design**: una chiamata `planOnly: true` ritorna solo il piano multi-pagina (una chiamata di modello veloce), poi il client richiede contenuto completo — mantenendo ogni richiesta dentro il timeout Lambda/API-Gateway |
| `POST /website/rewriteSection` | Riscrittura che preserva la struttura: il modello può solo cambiare le risposte che portano testo. Una firma di struttura ricorsiva (id + tipi + ordine) viene confrontata prima e dopo; qualsiasi mancata corrispondenza ritorna la sezione originale con `fallback: true` invece di struttura corrotta |
| `POST /website/generateAltText` | Chiamata visione su fino a 20 URL di immagini; ritorna testo alt conciso (≤125 caratteri, prefissi "foto di" spogliati) |
| `POST /website/generateMetaDescription` | Una meta descrizione SEO (≤155 caratteri) dal contenuto di testo della pagina — cablata al pulsante Genera sulle impostazioni della pagina di B1Admin |

I prompt sono file markdown sotto `AskApi/config/instructions/`, incluso il catalogo di elementi da cui il modello genera. Due punti di design mantengono il catalogo onesto: il client passa `availableElementTypes` su ogni richiesta (il prompt può solo usare tipi da quell'elenco — il server non hardcoda mai l'intero set), e lo strumento MCP `describe_page_builder` dell'API porta la stessa guida per gli agenti AI che lavorano attraverso [MCP](../api/mcp). I modelli sono Anthropic Claude tramite OpenRouter — 3.5 Haiku per il contenuto della sezione (latenza), 3.5 Sonnet per contorni, piani del sito, e visione — con un fallback OpenAI quando nessuna chiave OpenRouter è configurata.

## Moduli conversazionali

I moduli (modulo di appartenenza) hanno guadagnato una modalità conversazionale rivolta alle pagine in stile scheda di connessione. Quattro colonne su `forms` lo guidano: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Rendering** — lo `FormSubmissionEdit` di apphelper passa al componente `ConversationalForm` (una domanda alla volta) quando `displayMode` è `conversational`; il modulo pagina di B1App passa la modalità. Lo stesso payload di sottomissione ogni modo.
- **Auto-crea persona** — su sottomissione con `autoCreatePerson` impostato, `ConversationalFormHelper.findOrCreatePerson` deduplica per email (case-insensitive) e altrimenti crea un nucleo + persona con `membershipStatus: "Guest"`, poi collega la sottomissione a quella persona.
- **Email di follow-up** — quando un soggetto e corpo sono impostati, il sottomittente ottiene un'email templata (con token `{firstName}` / `{churchName}`) attraverso il percorso transazionale esistente (`TransactionalEmailHelper`), mai la porta del digest di notificazione. Entrambi gli effetti collaterali sono non-fatali: un fallimento non perde mai la sottomissione.

I quattro campi sono impostati tramite l'API oggi; l'editor di modulo di B1Admin non li espone ancora.

## Pagine correlate

- [Website Routing e multi-sito](./websites) — come una richiesta si risolve in una chiesa/sito e come gli indirizzi personalizzati si indirizzano
- [Endpoint di contenuto](../api/endpoints/content) — superficie REST completa per pagine, sezioni, elementi, blocchi, post, reindirizzamenti, e impostazioni
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che spedisce i renderer, il registro, i divisori, e i widget
- [Server MCP](../api/mcp) — incluso lo strumento guida `describe_page_builder`
- [Editor di pagina (end-user)](/docs/b1-admin/website/page-editor) — la documentazione dell'editor rivolta allo staff
