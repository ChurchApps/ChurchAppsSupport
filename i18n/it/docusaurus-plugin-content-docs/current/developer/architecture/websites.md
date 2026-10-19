---
title: "Routing dei siti web & Multi-sito"
---

# Routing dei siti web & Multi-sito

<div class="article-intro">

Una singola chiesa può ora gestire più di un sito web distinto, e ognuno può trovarsi su un sottodominio `*.b1.church` oppure su un dominio personalizzato di proprietà della chiesa. Questa pagina descrive il livello di routing che si trova *sotto* il builder: come una richiesta in arrivo viene risolta in una chiesa **e** in un sito specifico, il modello dati multi-sito (la sentinella `siteId` che mantiene il rendering di ogni sito preesistente invariato), e l'edge dei domini personalizzati — un proxy Caddy gestito internamente su EC2 che termina il TLS e riscrive ogni dominio della chiesa sull'upstream `*.b1.church` corrispondente. Per ciò che viene effettivamente visualizzato una volta risolta la richiesta — l'albero di pagine/sezioni/elementi — vedi [Website Builder](./website-builder).

</div>

## Panoramica

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

Tre regole valgono per tutto questo livello:

1. **Una sentinella mantiene tutto retrocompatibile.** `siteId = ''` è il sito primario. Ogni pagina, blocco, link, stile globale e riga di dominio esistenti prima di questa funzionalità porta `''` e viene visualizzato esattamente come prima. Un *secondo* sito web è semplicemente un insieme di righe con un `siteId` non vuoto, e qualsiasi endpoint di contenuto chiamato senza `?siteId=` restituisce il sito primario — esattamente la stessa richiesta di prima, byte per byte.
2. **La risoluzione si basa sull'etichetta dell'host e converge.** Un sottodominio `*.b1.church` viene instradato direttamente tramite la sua etichetta dell'host; un dominio personalizzato viene riscritto sulla sua etichetta `{sub}.b1.church` al livello edge di Caddy prima che B1App lo veda (con una ricerca nel database nel middleware che imposta un header `x-site` come fallback per qualsiasi `Host` personalizzato grezzo). Entrambi i percorsi arrivano allo stesso route `[sdSlug]` e alla stessa chiamata `churches/lookup`, quindi il rendering a valle è identico.
3. **L'edge di Caddy è stateless su un'unica fonte di verità.** I domini personalizzati terminano su un proxy Caddy gestito internamente su EC2 che riscrive ogni dominio sul relativo upstream `{sub}.b1.church`. Il salvataggio di un dominio attiva una singola chiamata `CaddyHelper.updateCaddy()` best-effort, e Caddy legge anche direttamente la tabella `domains` (gli endpoint `authorize` e `hostmap` descritti sotto). La tabella è autorevole — un Caddy irraggiungibile non può mai far fallire un salvataggio.

## Risoluzione del sito

### Sottodomini `*.b1.church`

`B1App/next.config.mjs` riscrive le richieste in arrivo in base all'host. Una regola host con il pattern `(?<subdomain>.*?)\..*` cattura la **prima etichetta** dell'host e riscrive `/` e `/:path*` in `/{subdomain}` — il segmento App-Router `[sdSlug]`. Quindi `grace.b1.church/about` diventa `/grace/about`.

All'interno di `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chiama `GET /membership/churches/lookup/?subDomain={sdSlug}`. La risposta di `ChurchController.getBySubDomain` ora ha due rami:

| Lo slug corrisponde a | Risposta | Significato |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sito primario di quella chiesa |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sito secondario** — il controller ricorre a `sites`, risolve la chiesa proprietaria e restituisce lo slug richiesto insieme al `siteId` aggiuntivo |

Quel `siteId` aggiuntivo è l'unica cosa che distingue una richiesta a un sito secondario da una a un sito primario; tutto il resto della pipeline è condiviso.

Uno slug che non corrisponde a nessuna delle due tabelle restituisce `{}` con un `200`. `ConfigHelper.load` tratta una risposta senza `id` come un sito sconosciuto e chiama `notFound()` di Next, così un sottodominio sconosciuto ottiene un vero 404 invece di far chiedere a ogni chiamata successiva `/…/undefined`. Anche il route della pagina del builder costruisce il suo percorso dell'albero con `pageTreePath()` (`src/helpers/pageTreePath.ts`), che codifica lo slug in URL, quindi uno slug malformato (barre rovesciate, spazi) restituisce 404 invece di far emergere il `400` dell'API come un 500.

### Domini personalizzati {#custom-domains}

Un dominio di proprietà della chiesa termina sull'**edge Caddy** (descritto più avanti), che riscrive l'header `Host` sul `{sub}.b1.church` del sito prima di inoltrare la richiesta a B1App. Quindi, nel percorso normale, B1App riceve un host *interno* `*.b1.church` e lo risolve tramite etichetta dell'host esattamente come un sottodominio nativo — la ricerca nel database del middleware non si attiva mai. `src/middleware.ts` viene comunque eseguito su ogni richiesta, ma con un compito sempre attivo e un fallback:

1. **Sempre** — **elimina qualsiasi header `x-site` fornito dal client**. Quell'header è un input di riscrittura falsificabile e viene considerato attendibile solo quando è il middleware stesso a impostarlo; rimuoverlo è il vero compito del middleware dietro Caddy.
2. **Fallback, solo per `Host` non interni** — per un `Host` di dominio personalizzato grezzo che raggiunge B1App *senza* la riscrittura di Caddy, chiama `GET /membership/domains/public/lookup/{host}` e, se questo restituisce un `subDomain`, imposta `x-site: {subDomain}.b1.church`. Dietro Caddy questo ramo è inattivo perché l'`Host` è già `*.b1.church`.

Gli host interni — `localhost`, `b1.church` e i suffissi `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — saltano completamente la ricerca (sono già risolti dalla riscrittura per etichetta dell'host, oppure sono host di anteprima o di deploy).

La ricerca vera e propria (`DomainRepo.loadByName`) esegue un left join tra `domains → churches` e `domains → sites` e restituisce `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — il sottodominio del sito secondario assegnato se il dominio punta a uno, altrimenti quello della chiesa. Cerca prima l'host esatto; se quell'host iniziava con `www.` e non trova nulla, riprova **una sola volta** con l'apex nudo.

Tornando in `next.config.mjs`, le regole di riscrittura `x-site` sono collocate **prima** delle regole generiche sull'host, quindi hanno la precedenza. `x-site: grace.b1.church` → prima etichetta `grace` → `[sdSlug] = grace`, e da lì la risoluzione è identica al percorso dei sottodomini (stessa `churches/lookup`, stesso `siteId`).

:::info
L'header `x-site` non è attendibile quando arriva dall'esterno. Il middleware rimuove incondizionatamente qualsiasi `x-site` in ingresso prima di eventualmente impostare il proprio, e le regole di riscrittura vedono solo il valore impostato dal middleware — un client non può forzarsi sui contenuti di un'altra chiesa inviando un header.
:::

Due dettagli operativi sul middleware:

- **Cache.** Il risultato di ogni host (un hit *oppure* un miss confermato — mai un errore di rete) viene memorizzato in cache per **10 minuti** in una `Map` in memoria, per ogni isolate serverless.
- **Matcher.** Il matcher reinclude deliberatamente `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Il suo primo pattern esclude i percorsi con il punto, che altrimenti scarterebbe questi file; vengono aggiunti di nuovo così che anche i file SEO/PWA per chiesa di un dominio personalizzato ricevano l'header `x-site`.
- **Header canonico.** Per le pagine della chiesa il middleware aggiunge un header di risposta `Link: <{proto}://{host}{path}>; rel="canonical"` che indica l'host da cui la pagina è stata effettivamente servita — sottodominio o dominio personalizzato (`helpers/canonicalLink.ts`). Viene omesso sugli host non di chiesa (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) e su `/mobile`, `/login`, `/logout` e sui file robots/sitemap/manifest generati.

### Sito pubblico disabilitato

Una chiesa può attivare **Disable Public Website** in B1Admin (impostazione dei contenuti a livello di chiesa `hidePublicSite = "true"`). Il sito serve allora solo le rotte riservate ai membri:

- **Il middleware di B1App** cerca il sottodominio (`/membership/churches/lookup` e poi `/content/settings/public/:churchId`) e reindirizza le richieste anonime per qualsiasi percorso fuori dalla lista consentita verso `/login?returnUrl={path}{query}`. La lista consentita (`helpers/publicSite.ts`) comprende `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` e i file manifest/robots/sitemap. Vengono memorizzate in cache solo le risposte confermate (60 secondi in produzione, perché la chiamata di revalidate dell'amministratore non può svuotare questa mappa per istanza; senza cache in dev/test). Un errore dell'API serve il sito invece di bloccare tutti.
- **I membri autenticati vedono il sito completo.** Una richiesta con un cookie `jwt` non scaduto (la funzione `hasSession()` del middleware decodifica il campo `exp` del payload senza verificare la firma — è un controllo debole, non un controllo di accesso) salta il reindirizzamento, quindi dopo il login un membro torna alla pagina richiesta e vede le pagine normali, le pagine integrate (Gruppi, Sermoni, ecc.) e la navigazione dell'header. I componenti di pagina e `Header` non controllano più `hidePublicSite` da soli.
- **`robots.txt`** vieta tutto, come sugli host noindex.
- **API.** `GET /content/pages/public/:churchId` (l'elenco di pagine della sitemap) restituisce `[]`, così i chiamanti anonimi non possono elencare le pagine.

### Propagazione del `siteId`

`ConfigHelper` memorizza il `siteId` risolto nel suo `ConfigurationInterface` per richiesta (memorizzato con `cache()` di React) e aggiunge `?siteId=` alle chiamate ai contenuti che esso e i componenti di pagina effettuano — **in modo condizionale**: un `siteId` vuoto (un sottodominio della chiesa primaria) omette del tutto il parametro. Gli endpoint che propagano il valore sono l'albero della pagina (`/content/pages/:id/tree`), l'elenco pubblico delle pagine usato dalla sitemap (`/content/pages/public/:id`), gli stili globali (`/content/globalStyles/church/:id`), i link di navigazione (`/content/links/church/:id`) e il blocco footer autonomo (`/content/blocks/public/footer/:id`). Nel normale percorso di rendering il footer arriva dentro l'albero della pagina (sezioni con `zone: "siteFooter"`), già recuperato con `siteId`, quindi non esiste alcuna lacuna di footer non limitato.

Il portale dei membri (B1App `mobile`) è intenzionalmente escluso da tutto questo: `loadChurchAppearance.ts` risolve la chiesa tramite `churches/lookup` ma legge `/settings/public/{id}` a livello di chiesa e non propaga mai `siteId` — il portale è a livello di chiesa nella v1 (vedi sotto).

## Più siti web per chiesa

### Modello dati

La nuova tabella `membership.sites` è volutamente minimale:

| Colonna | Tipo | Note |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Chiesa proprietaria |
| `name` | `varchar(255)` | Nome visualizzato (es. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Indice unico** — namespace globale (vedi sotto) |

La delimitazione per sito è poi affidata a una singola colonna, non nullable, aggiunta alle tabelle dei contenuti e dei domini:

| Tabella (modulo) | Colonna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Il dominio serve il sito primario |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sito primario — e, per **`blocks`**, `''` significa inoltre *condiviso tra tutti i siti* |

Due migrazioni aggiungono tutto questo (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Poiché la colonna ha come default `''`, ogni riga esistente mantiene il comportamento attuale senza alcun backfill.

**Namespace globale dei sottodomini.** `sites.subDomain` condivide *un unico* namespace con `churches.subDomain` — lo slug di un sito non può mai collidere con quello di una chiesa o di un altro sito. Questo è applicato su **entrambi** i percorsi di salvataggio: `SiteController.save` rifiuta uno slug già presente in `churches` o in `sites`, e `ChurchController.validateSave` fa lo stesso in senso inverso. Un indice unico su `sites.subDomain` lo garantisce anche a livello di database.

**L'unicità delle pagine** è stata estesa da `(churchId, url)` a `(churchId, siteId, url)`, così due siti di una stessa chiesa possono avere ciascuno il proprio `/about`.

### Contenuti per sito, con fallback

Ogni endpoint di **lista/albero** dei contenuti delimitato per sito accetta un `?siteId=` opzionale (assente ⇒ `''` = primario): albero / lista / pubblico delle pagine, lista / per tipo / footer dei blocchi, link (anonimi / filtrati / tutti) e stili globali. Sezioni ed elementi *non* sono delimitati direttamente — ereditano dalla pagina o dal blocco padre.

Due catene di risoluzione svolgono il lavoro più interessante:

- **Stili globali — `sito → primario → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` restituisce la riga propria del sito; se un sito secondario non ne ha una, restituisce la **riga primaria (`''`) così com'è** (mantenendo il `id`/`siteId` del primario, che il client usa per il copy-on-write); se non esiste nemmeno un primario, `GlobalStyleController` restituisce una palette/font predefiniti hard-coded.
- **Blocco footer — vince quello del sito, il condiviso fa da fallback.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` restituisce sia le righe condivise (`''`) *sia* quelle specifiche del sito; il resolver sceglie il footer proprio del sito se presente, altrimenti quello condiviso. La stessa logica viene eseguita sia in `TreeHelper.insertBlocks` (albero della pagina) sia nell'endpoint autonomo `/content/blocks/public/footer/:churchId`.

### Cascata di eliminazione del sito

`SiteController.delete` (subordinato al permesso Settings→Edit di membership) elimina un sito secondario in tre passaggi:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` elimina a cascata tutti i contenuti di cui il sito è proprietario: le sue **pagine** → le relative sezioni, elementi, `pageHistory` e `posts`; i suoi **blocchi** → le relative sezioni, elementi e `pageHistory`; i suoi **link** e **globalStyles**. Una guardia rifiuta di eseguire il comando per `''` — la sentinella primaria/condivisa non viene mai eliminata a cascata.
2. `DomainRepo.clearSiteId` **riassegna** i domini del sito al primario (`siteId → ''`) invece di eliminarli, così un dominio personalizzato sopravvive all'eliminazione di un sito.
3. La riga `sites` viene eliminata e le rotte di Caddy vengono risincronizzate (best-effort).

### Superficie di B1Admin

| Funzionalità | Dove | Meccanismo |
|-----------|-------|-----------|
| Selettore del sito | `useSiteSelection` + `SiteSwitcher` (vuoto = "Main Website") | Legge un parametro URL `?site=` e lo propaga come `?siteId=` nelle chiamate a ContentApi. Presente nelle tre aree di **elenco** dei Siti — **Pages**, **Blocks**, **Appearance** — ma *non* negli editor di pagine/blocchi, che portano il `siteId` nel record |
| Creazione/eliminazione dei siti | `SitesDialog`, aperto dalla voce "Manage websites…" del selettore | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Subordinato al permesso Settings→Edit di membership (`Permissions.settings.edit` lato server; `Permissions.membershipApi.settings.edit` in B1Admin). **Solo creazione/eliminazione — nella v1 non esiste un'interfaccia per rinominare** |
| Assegnazione del sito per dominio | `DomainSettingsEdit` in Settings→Domains | Un menu a tendina del sito per riga invia `siteId` per dominio a `/membership/domains`. La colonna si nasconde se l'API non restituisce siti (backend più vecchio) |
| Copy-on-write degli stili | `StylesManager.prepareForSave` | Quando la riga di stili globali caricata ha un `siteId` diverso dal sito selezionato (cioè l'API ha restituito il primario ereditato come fallback), rimuove l'`id` del primario e imposta il `siteId` corrente, forzando un **inserimento** di una nuova riga specifica del sito invece di sovrascrivere il primario. La stessa biforcazione in caso di mancata corrispondenza si applica al blocco footer del sito |

:::info
**Cosa resta a livello di chiesa nella v1 (una scelta di ambito deliberata, non un limite del modello dati):** il **blog** (`BlogPage` non ha un selettore e carica `/posts` senza `siteId`), i **widget del sito** (banner degli annunci + launcher), i **redirect**, il **logo / GA4 / impostazioni della chiesa** e il **portale dei membri** (B1App mobile). Nota che questo *non* significa "tutto Appearance" — gli stili globali di un sito secondario (palette, font, tipografia, spaziature, navigazione, CSS personalizzato) **sono** per sito tramite il percorso copy-on-write descritto sopra; restano a livello di chiesa solo i sotto-pannelli banner/launcher/redirect/logo della pagina Appearance.
:::

## Domini personalizzati: edge Caddy (piano di configurazione statica)

:::info
**Direzione rivista il 2026-07-02.** Un piano precedente per spostare l'hosting dei domini personalizzati su domini gestiti da Vercel è stato **annullato**, e tutto il codice di registrazione dei domini Vercel (`VercelHelper`, le sue variabili d'ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, i parametri SSM e i controlli di salute) è stato rimosso dall'Api. Il proxy **Caddy** gestito internamente su EC2 **resta** come edge permanente per i domini personalizzati. Il lavoro restante è solo interno: sostituire la configurazione a runtime tramite API di amministrazione di Caddy con una configurazione *statica* che sopravviva ai riavvii.
:::

### L'edge

Ogni dominio personalizzato di una chiesa punta il DNS a un'unica macchina EC2 — `3.23.251.61`, raggiungibile anche come `proxy.b1.church`. La schermata Settings→Domains di B1Admin indica alle chiese di aggiungere un record apex `A → 3.23.251.61` oppure un `CNAME → proxy.b1.church`. Caddy termina il TLS con un certificato Let's Encrypt per dominio, riscrive l'header `Host` sull'upstream `{sub}.b1.church` del dominio e inoltra a B1App — che poi lo instrada tramite etichetta dell'host come qualsiasi sottodominio nativo (vedi [Domini personalizzati](#custom-domains) sopra).

La mappatura degli upstream proviene da `DomainRepo.loadPairs`, il cui dial usa **COALESCE sul sottodominio del sito assegnato** così che un dominio venga inoltrato al sito *secondario* corretto, ricadendo sul primario della chiesa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Le righe `www.*` sono escluse dalla mappa; Caddy serve `www.{host}` tramite un redirect `302` verso l'apex.

### Due endpoint anonimi alimentano l'edge

`DomainController` espone due endpoint in sola lettura, non autenticati, che la macchina consuma direttamente — anonimi per necessità, dato che l'edge li interroga prima che esista qualsiasi contesto di chiesa:

| Endpoint | Restituisce | Ruolo |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` se il dominio — o, per un miss `www.`, il suo apex nudo — esiste in `domains`; altrimenti `404` (incluso un `domain` vuoto) | L'**`ask` on-demand-TLS** di Caddy: il controllo anti-abuso che decide se emettere un certificato per un SNI in arrivo |
| `GET /membership/domains/hostmap` | `text/plain`, una riga ordinata `{domain} {sub}.b1.church` per ogni dominio instradabile | Il file di mappa host→upstream che la macchina aggiorna periodicamente |

`authorize` riutilizza `DomainRepo.loadByName` (host esatto, poi un singolo retry `www.`→apex); `hostmap` riutilizza `loadPairs` — quindi è consapevole del sito ed esclude i `www.*`, esattamente come le rotte proxy — e si limita a rimuovere il suffisso `:443`.

### Salvataggio/eliminazione del dominio — un'unica spinta best-effort

`DomainController.save` scrive le righe di `domains` e poi effettua una **singola** chiamata best-effort `CaddyHelper.updateCaddy()`, racchiusa in un `try/catch` che registra (`console.error`) e ignora l'errore; `delete` fa lo stesso (il che ha anche risolto un precedente bug di rotta obsoleta dopo l'eliminazione), così come l'eliminazione di un sito secondario (`SiteController.delete`). `updateCaddy` è a sua volta limitato da un timeout Axios di **10 secondi**, quindi un Caddy irraggiungibile o fermo non può mai restituire un `500` a un salvataggio di dominio — la tabella `domains` è la fonte di verità.

### Stato attuale — configurazione statica, nessuno stato a runtime

La macchina (un'istanza EC2 Windows dietro l'Elastic IP permanente) esegue Caddy da un **Caddyfile statico**: TLS on-demand il cui `ask` punta a `/membership/domains/authorize`, più un file di mappa host→upstream aggiornato ogni 5 minuti da `/membership/domains/hostmap` da un'attività pianificata che termina con un `caddy reload` controllato. La configurazione sopravvive ai riavvii senza alcuno stato a runtime — nessuna procedura di ri-priming — e un SNI sconosciuto viene **rifiutato nel TLS** (non viene emesso alcun certificato per un host che `authorize` respinge), mentre un host autorizzato ma non ancora mappato (un dominio appena creato nella finestra di sincronizzazione) riceve un 404 pulito. I nuovi domini diventano instradabili entro circa 5 minuti dal salvataggio; i loro certificati vengono emessi al primo accesso. Costruzione/configurazione, operazioni e trappole collaudate sul campo: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Spinta a runtime legacy — percorso di rollback, in attesa di eliminazione

`CaddyHelper` (modulo membership) può ancora pilotare Caddy tramite la sua **API di amministrazione** su `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; nessuna operazione se non impostato; esposto sotto il gruppo Integrations di `ServerHealthController`): `updateCaddy()` esegue una PATCH di un intero array di rotte, e `initializeCaddy()` + gli endpoint `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ricostruiscono da zero un server configurato a runtime. In quella modalità la configurazione viveva solo nella memoria di Caddy — l'amnesia ai riavvii che questa architettura ha sostituito. Il meccanismo resta solo come percorso di rollback ed è previsto per l'eliminazione una volta che la macchina statica si sia dimostrata stabile; la spinta best-effort `updateCaddy()` al salvataggio/eliminazione del dominio è un'operazione innocua (no-op) sulla macchina statica (la sua API di amministrazione è accessibile solo da localhost).

## Pagine correlate

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — la macchina edge stessa: configurazione di una nuova macchina, servizio WinSW, attività di sincronizzazione della mappa e trappole operative
- [Website Builder](./website-builder) — l'albero di pagine/sezioni/elementi, i renderer, il blog, la SEO e la generazione con AI (ciò che viene visualizzato una volta che la richiesta è stata risolta in una chiesa/sito)
- [Content Endpoints](../api/endpoints/content) — l'interfaccia REST per pagine, blocchi, link e stili globali, tutti ora consapevoli di `?siteId=`
- [B1App](../web-apps/b1-app) — l'app Next.js che ospita il middleware e il routing `[sdSlug]`
- [Web App Deployment](../deployment/web-apps) — come B1App viene distribuita su Vercel
