---
title: "Routing del sito web e multi-sito"
---

# Routing del sito web e multi-sito

<div class="article-intro">

Una singola chiesa può ora servire più siti web distinti, e ciascuno può trovarsi su un sottodominio `*.b1.church` oppure su un dominio personalizzato interamente gestito dalla chiesa. Questa pagina mappa il livello di routing che sta *sotto* il costruttore: come una richiesta in arrivo si risolve in una chiesa **e** in un sito specifico, il modello dei dati multi-sito (la sentinella `siteId` che mantiene invariati tutti i siti preesistenti) e il bordo dei domini personalizzati -- un proxy Caddy gestito autonomamente su EC2 che termina il TLS e riscrive ogni dominio della chiesa verso il suo upstream `*.b1.church`. Per ciò che viene effettivamente renderizzato una volta risolta la richiesta -- l'albero di pagine/sezioni/elementi -- vedi [Costruttore di siti web](./website-builder).

</div>

## Panoramica

```
   grace.b1.church              www.gracechurch.org  (dominio personalizzato)
   (sottodominio b1.church)               │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Bordo Caddy — EC2 3.23.251.61             │
          │             │             (proxy.b1.church)             │
          │             │  • termina il TLS (certificato LE per dominio) │
          │             │  • riscrive Host → {sub}.b1.church        │
          │             │  • reverse-proxy verso B1App              │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • sempre: elimina qualsiasi x-site fornito dal client (anti-spoofing) │
   │  • Host interno *.b1.church ⇒ la ricerca nei domini resta inattiva │
   │  • Host personalizzato grezzo (senza Caddy) ⇒ ricerca → imposta x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → prima etichetta dell'host → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   inoltra ?siteId= in ogni chiamata ai contenuti: │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  salvataggio/eliminazione dominio (B1Admin Impostazioni→Domini → POST /membership/domains)
        └─ CaddyHelper.updateCaddy() best-effort  (incapsulato, non fatale, timeout 10s)
  Caddy legge da solo la tabella dei domini tramite due endpoint anonimi:
        GET /membership/domains/authorize  — `ask` per il TLS on-demand (200 noto / 404 sconosciuto)
        GET /membership/domains/hostmap    — mappa host→{sub}.b1.church (aggiornamento ogni 5 minuti)
```

Tre regole valgono per questo livello:

1. **Una sentinella mantiene la compatibilità.** `siteId = ''` è il sito principale. Ogni pagina, blocco, link, stile globale e riga di dominio che esisteva prima di questa funzione porta `''` e viene renderizzato esattamente come prima. Un *secondo* sito web è semplicemente un insieme di righe con un `siteId` non vuoto, e qualsiasi endpoint dei contenuti chiamato senza `?siteId=` restituisce il sito principale -- byte per byte la vecchia richiesta.
2. **La risoluzione si basa sull'etichetta dell'host e converge.** Un sottodominio `*.b1.church` viene instradato direttamente tramite la sua etichetta dell'host; un dominio personalizzato viene riscritto nella sua etichetta `{sub}.b1.church` al bordo Caddy prima che B1App lo veda (con una ricerca nel database del middleware che imposta un header `x-site` come ripiego per qualsiasi `Host` personalizzato grezzo). Entrambi i percorsi arrivano sulla stessa rotta `[sdSlug]` e sulla stessa chiamata `churches/lookup`, quindi il rendering a valle è identico.
3. **Il bordo Caddy è senza stato su un'unica fonte di verità.** I domini personalizzati terminano su un proxy Caddy gestito autonomamente su EC2 che riscrive ogni dominio verso il suo upstream `{sub}.b1.church`. Un salvataggio del dominio attiva un singolo `CaddyHelper.updateCaddy()` best-effort, e Caddy legge anche direttamente la tabella `domains` (gli endpoint `authorize` e `hostmap` sotto). La tabella è autorevole -- un Caddy irraggiungibile non può mai far fallire un salvataggio.

## Risoluzione del sito

### Sottodomini `*.b1.church`

`B1App/next.config.mjs` riscrive le richieste in arrivo in base all'host. Una regola di host con il pattern `(?<subdomain>.*?)\..*` cattura la **prima etichetta** dell'host e riscrive `/` e `/:path*` in `/{subdomain}` -- il segmento App Router `[sdSlug]`. Quindi `grace.b1.church/about` diventa `/grace/about`.

All'interno di `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chiama `GET /membership/churches/lookup/?subDomain={sdSlug}`. La risposta di `ChurchController.getBySubDomain` ha ora due rami:

| Lo slug corrisponde a | Risposta | Significato |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sito principale di quella chiesa |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sito secondario** -- il controller ricade su `sites`, risale alla chiesa proprietaria e restituisce lo slug richiesto più il `siteId` aggiuntivo |

Quel `siteId` aggiuntivo è l'unica cosa che distingue una richiesta a un sito secondario da una a quello principale; tutto il resto della pipeline è condiviso.

Uno slug che non corrisponde a nessuna delle due tabelle torna come `{}` con un `200`. `ConfigHelper.load` tratta una risposta senza `id` come un sito sconosciuto e chiama `notFound()` di Next, così un sottodominio sconosciuto ottiene un vero 404 invece di ogni chiamata successiva che chiede `/…/undefined`. La rotta della pagina del costruttore costruisce anche il percorso dell'albero con `pageTreePath()` (`src/helpers/pageTreePath.ts`), che codifica lo slug in URL, quindi uno slug malformato (barre rovesciate, spazi) restituisce 404 invece di mostrare il `400` dell'API come un 500.

### Domini personalizzati {#custom-domains}

Un dominio di proprietà della chiesa termina sul **bordo Caddy** (descritto più avanti), che riscrive l'header `Host` nel `{sub}.b1.church` del sito prima di passare la richiesta a B1App. Quindi, nel percorso normale, B1App riceve un host *interno* `*.b1.church` e lo risolve tramite l'etichetta dell'host esattamente come un sottodominio nativo -- la ricerca nel database del middleware non si attiva mai. `src/middleware.ts` viene comunque eseguito su ogni richiesta, ma con un compito sempre attivo e uno di ripiego:

1. **Sempre** -- **elimina qualsiasi header `x-site` fornito dal client**. Quell'header è un input di riscrittura falsificabile e viene considerato attendibile solo quando il middleware stesso lo imposta; eliminarlo è il vero compito del middleware dietro Caddy.
2. **Ripiego, solo per `Host` non interni** -- per un `Host` di dominio personalizzato grezzo che raggiunge B1App *senza* la riscrittura di Caddy, chiama `GET /membership/domains/public/lookup/{host}` e, se quella restituisce un `subDomain`, imposta `x-site: {subDomain}.b1.church`. Dietro Caddy questo ramo è inattivo perché l'`Host` è già `*.b1.church`.

Gli host interni -- `localhost`, `b1.church` e i suffissi `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` -- saltano del tutto la ricerca (sono già risolti dalla riscrittura dell'etichetta dell'host, oppure sono host di anteprima/deploy).

La ricerca vera e propria (`DomainRepo.loadByName`) esegue un left join di `domains → churches` e `domains → sites` e restituisce `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` -- il sottodominio del sito secondario assegnato se il dominio punta a uno, altrimenti quello della chiesa. Cerca prima l'host esatto; se quell'host iniziava con `www.` e non trova nulla, riprova **una sola volta** sull'apice nudo.

In `next.config.mjs`, le regole di riscrittura `x-site` sono posizionate **prima** delle regole generiche sull'host, quindi hanno la precedenza. `x-site: grace.b1.church` → prima etichetta `grace` → `[sdSlug] = grace`, e da lì la risoluzione è identica al percorso del sottodominio (stessa `churches/lookup`, stesso `siteId`).

:::info
L'header `x-site` non è attendibile dall'esterno. Il middleware elimina incondizionatamente qualsiasi `x-site` in ingresso prima di impostare eventualmente il proprio, e le regole di riscrittura vedono solo il valore impostato dal middleware -- un client non può forzarsi sui contenuti di un'altra chiesa inviando un header.
:::

Due dettagli operativi sul middleware:

- **Cache.** Il risultato di ogni host (un successo *oppure* un miss confermato -- mai un errore di rete) viene memorizzato per **10 minuti** in una `Map` in memoria, per isolate serverless.
- **Matcher.** Il matcher reinclude deliberatamente `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Il suo primo pattern esclude i percorsi con il punto, che altrimenti scarterebbero quei file; vengono aggiunti di nuovo così anche i file SEO/PWA per chiesa di un dominio personalizzato ricevono l'header `x-site`.
- **Header canonico.** Per le pagine della chiesa il middleware aggiunge alla risposta un header `Link: <{proto}://{host}{path}>; rel="canonical"` che indica l'host da cui la pagina è stata effettivamente servita -- sottodominio o dominio personalizzato (`helpers/canonicalLink.ts`). Quando un dominio personalizzato raggiunge B1App tramite il [proxy Caddy](../deployment/caddy-proxy), l'host della richiesta è il sottodominio `{sub}.b1.church`, quindi il middleware usa invece il dominio del visitatore da `X-Church-Host` -- ma solo dopo che `/domains/public/lookup/{host}` conferma che quel dominio corrisponde allo stesso sottodominio (`ownsSubdomain()`). Il link canonico, `robots.txt` e `sitemap.xml` indicano poi il dominio personalizzato anziché il sottodominio `b1.church`. Viene saltato sugli host non di chiesa (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) e su `/mobile`, `/login`, `/logout` e sui file generati robots/sitemap/manifest.

### Sito pubblico disattivato

Una chiesa può attivare **Disattiva sito pubblico** in B1Admin (impostazione dei contenuti a livello di chiesa `hidePublicSite = "true"`). Il sito serve quindi solo le rotte rivolte ai membri:

- **Il middleware di B1App** cerca il sottodominio (`/membership/churches/lookup` poi `/content/settings/public/:churchId`) e reindirizza le richieste anonime per qualsiasi percorso fuori dalla lista consentita verso `/login?returnUrl={path}{query}`. La lista consentita (`helpers/publicSite.ts`) è `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` e i file manifest/robots/sitemap. Vengono messe in cache solo le risposte confermate (60 secondi in produzione, perché la chiamata di revalidate dell'amministratore non può svuotare questa mappa per istanza; senza cache in sviluppo/test). Un errore dell'API serve il sito invece di chiudere fuori tutti.
- **I membri connessi vedono il sito completo.** Una richiesta che porta un cookie `jwt` non scaduto (`hasSession()` del middleware decodifica il `exp` del payload senza verificare la firma -- è un controllo debole, non un controllo di accesso) salta il reindirizzamento, quindi dopo l'accesso un membro torna alla pagina richiesta e vede le pagine normali, le pagine integrate (Gruppi, Sermoni, ecc.) e la navigazione dell'intestazione. I componenti di pagina e `Header` non controllano più da soli `hidePublicSite`.
- **`robots.txt`** vieta tutto, come sugli host noindex.
- **API.** `GET /content/pages/public/:churchId` (l'elenco pagine della sitemap) restituisce `[]`, quindi i chiamanti anonimi non possono elencare le pagine.

### Propagazione di `siteId`

`ConfigHelper` memorizza il `siteId` risolto nella sua `ConfigurationInterface` per richiesta (memorizzata con la funzione `cache()` di React) e aggiunge `?siteId=` alle chiamate ai contenuti che fa e a quelle che fanno i componenti di pagina -- **in modo condizionale**: un `siteId` vuoto (sottodominio di una chiesa principale) omette del tutto il parametro. Gli endpoint che propagano il valore sono l'albero della pagina (`/content/pages/:id/tree`), l'elenco pubblico delle pagine usato dalla sitemap (`/content/pages/public/:id`), gli stili globali (`/content/globalStyles/church/:id`), i link di navigazione (`/content/links/church/:id`) e il blocco autonomo del piè di pagina (`/content/blocks/public/footer/:id`). Nel normale percorso di rendering il piè di pagina arriva dentro l'albero della pagina (sezioni marcate `zone: "siteFooter"`), già recuperato con `siteId`, quindi non c'è alcun vuoto non circoscritto per il footer.

Il portale dei membri (B1App `mobile`) resta volutamente al di fuori di questo: `loadChurchAppearance.ts` risolve la chiesa tramite `churches/lookup` ma legge `/settings/public/{id}` a livello di chiesa e non propaga mai `siteId` -- il portale è a livello di chiesa nella v1 (vedi sotto).

## Più siti web per chiesa

### Modello dei dati

La nuova tabella `membership.sites` è volutamente minima:

| Colonna | Tipo | Note |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Chiesa proprietaria |
| `name` | `varchar(255)` | Nome visualizzato (ad es. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Indice univoco** — spazio dei nomi globale (vedi sotto) |

Il limitare a un sito è poi una singola colonna non nullabile aggiunta alle tabelle dei contenuti e dei domini:

| Tabella (modulo) | Colonna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Il dominio serve il sito principale |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sito principale — e su **`blocks`**, `''` significa inoltre *condiviso tra tutti i siti* |

Due migrazioni aggiungono tutto questo (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Poiché la colonna ha come predefinito `''`, ogni riga esistente mantiene il comportamento attuale senza alcun backfill.

**Spazio dei nomi globale dei sottodomini.** `sites.subDomain` condivide *un unico* spazio dei nomi con `churches.subDomain` -- uno slug di sito secondario non può mai collidere con quello di una chiesa o di un altro sito. È applicato su **entrambi** i percorsi di salvataggio: `SiteController.save` rifiuta uno slug che corrisponde a `churches` oppure a `sites`, e `ChurchController.validateSave` fa lo stesso al contrario. Un indice univoco su `sites.subDomain` lo garantisce a livello di database.

**Unicità delle pagine** allargata da `(churchId, url)` a `(churchId, siteId, url)`, così due siti di una stessa chiesa possono avere ciascuno il proprio `/about`.

### Contenuti per sito, con ripieghi

Ogni endpoint di **lista/albero** dei contenuti legato a un sito accetta un `?siteId=` facoltativo (assente ⇒ `''` = principale): lista/albero/pubblico delle pagine, lista/per-tipo/footer dei blocchi, link (anonimi / filtrati / tutti) e stili globali. Sezioni ed elementi *non* sono direttamente legati a un sito -- ereditano tramite la loro pagina o il loro blocco padre.

Due catene di risoluzione fanno il lavoro interessante:

- **Stili globali — `sito → principale → predefinito`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` restituisce la riga propria del sito; se un sito secondario non ne ha una, restituisce la **riga principale (`''`) così com'è** (mantenendo `id`/`siteId` del principale, che il client usa per il copy-on-write); se non esiste neppure un principale, `GlobalStyleController` restituisce una tavolozza/caratteri predefiniti codificati nel sorgente.
- **Blocco del piè di pagina — vince quello specifico del sito, quello condiviso fa da ripiego.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` restituisce le righe condivise (`''`) *e* quelle specifiche del sito; il resolver sceglie il piè di pagina del sito se presente, altrimenti quello condiviso. La stessa logica viene eseguita sia in `TreeHelper.insertBlocks` (albero della pagina) sia nell'endpoint autonomo `/content/blocks/public/footer/:churchId`.

### Eliminazione a cascata del sito

`SiteController.delete` (protetto dal permesso Impostazioni→Modifica di membership) smantella un sito secondario in tre passaggi:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` elimina a cascata tutti i contenuti che il sito possiede: le sue **pagine** → le loro sezioni, elementi, `pageHistory` e `posts`; i suoi **blocchi** → le loro sezioni, elementi e `pageHistory`; i suoi **link** e i suoi **globalStyles**. Una guardia rifiuta di eseguire per `''` -- la sentinella principale/condivisa non viene mai eliminata a cascata.
2. `DomainRepo.clearSiteId` **riassegna** i domini del sito al principale (`siteId → ''`) anziché eliminarli, così un dominio personalizzato sopravvive all'eliminazione di un sito.
3. La riga `sites` viene eliminata e le rotte di Caddy vengono risincronizzate (best-effort).

### Superficie di B1Admin

| Funzione | Dove | Meccanismo |
|-----------|-----------|-----------|
| Selettore del sito | `useSiteSelection` + `SiteSwitcher` (vuoto = "Sito principale") | Legge un parametro URL `?site=` e lo inoltra come `?siteId=` nelle chiamate a ContentApi. Presente nelle tre aree **elenco** del Sito -- **Pagine**, **Blocchi**, **Aspetto** -- ma *non* negli editor di pagina/blocco, che portano il `siteId` nel record |
| Creazione/eliminazione dei siti | `SitesDialog`, aperto dalla voce "Gestisci siti web…" del selettore | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Protetto dal permesso Impostazioni→Modifica di membership (`Permissions.settings.edit` lato server; `Permissions.membershipApi.settings.edit` in B1Admin). **Solo creazione/eliminazione -- nella v1 non esiste un'interfaccia per rinominare** |
| Assegnazione del sito per dominio | `DomainSettingsEdit` in Impostazioni→Domini | Un menu a tendina per sito in ogni riga invia `siteId` per dominio a `/membership/domains`. La colonna si nasconde se l'API non restituisce siti (backend più vecchio) |
| Stili in copy-on-write | `StylesManager.prepareForSave` | Quando la riga di stile globale caricata ha un `siteId` diverso dal sito selezionato (cioè l'API ha restituito il principale ereditato come ripiego), elimina l'`id` del principale e imposta il `siteId` corrente, forzando un **inserimento** di una nuova riga specifica del sito invece di sovrascrivere il principale. Lo stesso meccanismo di biforcazione in caso di mancata corrispondenza vale per il blocco del piè di pagina del sito |

:::info
**Ciò che resta a livello di chiesa nella v1 (una scelta di ambito deliberata, non un limite del modello dei dati):** il **blog** (`BlogPage` non ha un selettore e carica `/posts` senza `siteId`), i **widget del sito** (banner degli annunci + launcher), i **reindirizzamenti**, il **logo / GA4 / impostazioni della chiesa** e il **portale dei membri** (B1App mobile). Nota che questo *non* significa "tutto Aspetto" -- gli stili globali di un sito secondario (tavolozza, caratteri, tipografia, spaziatura, navigazione, CSS personalizzato) **sono** specifici per sito tramite il percorso copy-on-write descritto sopra; restano a livello di chiesa solo i sottopannelli banner/launcher/reindirizzamenti/logo della pagina Aspetto.
:::

## Domini personalizzati: bordo Caddy (piano a configurazione statica)

:::info
**Direzione rivista il 2026-07-02.** Un piano precedente per spostare l'hosting dei domini personalizzati sui domini gestiti da Vercel è stato **annullato**, e tutto il codice di registrazione dei domini di Vercel (`VercelHelper`, le sue variabili d'ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, i parametri SSM e le voci di stato) è stato rimosso dall'Api. Il **proxy Caddy gestito autonomamente su EC2 resta** come bordo permanente per i domini personalizzati. L'unico lavoro rimasto è interno: sostituire la configurazione *runtime* dell'API di amministrazione di Caddy con una configurazione *statica* che sopravviva ai riavvii.
:::

### Il bordo

Ogni dominio personalizzato di una chiesa punta il DNS a un unico server EC2 -- `3.23.251.61`, raggiungibile anche come `proxy.b1.church`. La schermata Impostazioni→Domini di B1Admin indica alle chiese di aggiungere un `A` sull'apice → `3.23.251.61` oppure un `CNAME` → `proxy.b1.church`. Caddy termina il TLS con un certificato Let's Encrypt per dominio, riscrive l'header `Host` nell'upstream `{sub}.b1.church` del dominio e fa reverse-proxy verso B1App -- che poi lo instrada tramite l'etichetta dell'host come qualsiasi sottodominio nativo (vedi [Domini personalizzati](#custom-domains) sopra).

La mappatura dell'upstream viene da `DomainRepo.loadPairs`, il cui dial applica **COALESCE al sottodominio del sito assegnato** così un dominio fa proxy verso il giusto *sito secondario*, ricadendo su quello principale della chiesa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Le righe `www.*` sono escluse dalla mappa; Caddy serve `www.{host}` tramite un redirect `302` verso l'apice.

### Due endpoint anonimi alimentano il bordo

`DomainController` espone due endpoint non autenticati e in sola lettura che il server consuma direttamente -- anonimi per necessità, dato che il bordo li interroga prima che esista qualsiasi contesto della chiesa:

| Endpoint | Restituisce | Ruolo |
|----------|----------|------|
| `GET /membership/domains/authorize?domain=` | `200` se il dominio -- oppure, per un miss `www.`, il suo apice nudo -- esiste in `domains`; `404` altrimenti (incluso un `domain` vuoto) | Il **`ask` del TLS on-demand** di Caddy: il controllo anti-abuso che decide se emettere un certificato per un SNI in arrivo |
| `GET /membership/domains/hostmap` | `text/plain`, una riga ordinata `{domain} {sub}.b1.church` per ogni dominio instradabile | Il file mappa host→upstream che il server aggiorna con un timer |

`authorize` riusa `DomainRepo.loadByName` (host esatto, poi un singolo tentativo `www.`→apice); `hostmap` riusa `loadPairs` -- quindi è consapevole dei siti e esclude i `www.*`, identico alle rotte proxy -- e si limita a rimuovere il suffisso `:443`.

### Salvataggio/eliminazione del dominio -- un'unica spinta best-effort

`DomainController.save` scrive le righe `domains` e poi fa un'**unica chiamata best-effort** a `CaddyHelper.updateCaddy()`, incapsulata in un `try/catch` che registra (`console.error`) e ignora l'errore; `delete` fa lo stesso (il che ha anche corretto un precedente bug di rotta obsoleta in eliminazione), così come l'eliminazione del sito secondario (`SiteController.delete`). `updateCaddy` è a sua volta limitato da un timeout di **10 secondi** di Axios, quindi un Caddy irraggiungibile o fermo non può far restituire un `500` al salvataggio di un dominio -- la tabella `domains` è la fonte di verità.

### Stato attuale -- configurazione statica, nessuno stato runtime

Il server (un'istanza Windows EC2 dietro l'Elastic IP permanente) esegue Caddy da un **Caddyfile statico**: TLS on-demand il cui `ask` punta a `/membership/domains/authorize`, più un file mappa host→upstream aggiornato ogni 5 minuti da `/membership/domains/hostmap` da un'attività pianificata che termina con un `caddy reload` in modo graduale. La configurazione sopravvive ai riavvii senza alcuno stato runtime -- nessuna procedura di riattivazione manuale -- e un SNI sconosciuto viene **rifiutato a livello TLS** (non viene emesso alcun certificato per un host che `authorize` respinge), mentre un host autorizzato ma non ancora mappato (un dominio appena creato nella finestra di sincronizzazione) riceve un 404 pulito. I nuovi domini diventano instradabili entro circa 5 minuti da un salvataggio; i certificati vengono emessi al primo accesso. Costruzione/configurazione, operatività e trappole verificate sul campo: [Proxy Caddy per domini personalizzati](../deployment/caddy-proxy).

### Percorso legacy di spinta a runtime -- percorso di rollback, in attesa di eliminazione

`CaddyHelper` (modulo membership) può ancora pilotare Caddy tramite la sua **API di amministrazione** su `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; nessuna operazione se non impostati; esposto nel gruppo Integrazioni di `ServerHealthController`): `updateCaddy()` esegue una PATCH di un intero array di rotte, e `initializeCaddy()` + gli endpoint `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ricostruiscono da zero un server configurato a runtime. La configurazione di quella modalità viveva solo nella memoria di Caddy -- l'amnesia da riavvio che questa architettura ha sostituito. Il meccanismo resta solo come percorso di rollback ed è previsto per l'eliminazione una volta che il server statico si sarà stabilizzato; la spinta best-effort `updateCaddy()` al salvataggio/eliminazione del dominio è un'operazione innocua (no-op) sul server statico, perché la sua API di amministrazione accetta solo connessioni in localhost.

## Pagine correlate

- [Proxy Caddy per domini personalizzati](../deployment/caddy-proxy) — il server del bordo stesso: installazione da zero, servizio WinSW, attività di sincronizzazione della mappa e trappole operative
- [Costruttore di siti web](./website-builder) — l'albero di pagine/sezioni/elementi, i renderer, il blog, la SEO e la generazione con IA (ciò che viene renderizzato una volta che una richiesta si è risolta in una chiesa/sito)
- [Endpoint Content](../api/endpoints/content) — la superficie REST per pagine, blocchi, link e stili globali, tutti ora consapevoli di `?siteId=`
- [B1App](../web-apps/b1-app) — l'app Next.js che ospita il middleware e il routing `[sdSlug]`
- [Distribuzione delle web app](../deployment/web-apps) — come viene distribuito B1App su Vercel
