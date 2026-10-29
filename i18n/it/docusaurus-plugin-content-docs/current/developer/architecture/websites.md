---
title: "Routing del sito web e multi-sito"
---

# Routing del sito web e multi-sito

<div class="article-intro">

Una singola chiesa può ora gestire più siti web distinti, e ciascuno può trovarsi su un sottodominio `*.b1.church` oppure su un dominio personalizzato completamente di proprietà della chiesa. Questa pagina descrive il livello di routing che si trova *sotto* il builder: come una richiesta in arrivo viene risolta in una chiesa **e** in un sito specifico, il modello dei dati multi-sito (la sentinella `siteId` che mantiene invariati tutti i siti preesistenti) e l'edge dei domini personalizzati, un proxy Caddy gestito autonomamente su EC2 che termina il TLS e riscrive ogni dominio della chiesa sul proprio upstream `*.b1.church`. Per ciò che viene effettivamente visualizzato una volta risolta una richiesta (l'albero di pagine/sezioni/elementi) vedi [Website Builder](./website-builder).

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

Tre regole valgono per l'intero livello:

1. **Una sentinella mantiene la compatibilità con il passato.** `siteId = ''` indica il sito principale. Ogni pagina, blocco, link, stile globale e riga di dominio esistenti prima di questa funzionalità porta il valore `''` e viene visualizzata esattamente come prima. Un *secondo* sito web è semplicemente un insieme di righe con un `siteId` non vuoto, e qualsiasi endpoint di contenuto chiamato senza `?siteId=` restituisce il sito principale, esattamente la stessa richiesta di prima.
2. **La risoluzione si basa sull'etichetta dell'host e converge.** Un sottodominio `*.b1.church` viene instradato direttamente tramite la sua etichetta dell'host; un dominio personalizzato viene riscritto nella sua etichetta `{sub}.b1.church` al margine Caddy, prima che B1App lo veda (con una ricerca nel database nel middleware che imposta un header `x-site` come ripiego per qualsiasi `Host` personalizzato grezzo). Entrambi i percorsi arrivano alla stessa rotta `[sdSlug]` e alla stessa chiamata `churches/lookup`, quindi il rendering a valle è identico.
3. **Il margine Caddy è senza stato su un'unica fonte di verità.** I domini personalizzati terminano su un proxy Caddy gestito autonomamente su EC2 che riscrive ogni dominio sul proprio upstream `{sub}.b1.church`. Il salvataggio di un dominio attiva un singolo `CaddyHelper.updateCaddy()` di tipo best-effort, e Caddy legge anche direttamente la tabella `domains` (gli endpoint `authorize` e `hostmap` descritti sotto). La tabella è autorevole: un Caddy irraggiungibile non può mai far fallire un salvataggio.

## Risoluzione del sito

### Sottodomini `*.b1.church`

`B1App/next.config.mjs` riscrive le richieste in arrivo in base all'host. Una regola sull'host con il pattern `(?<subdomain>.*?)\..*` cattura la **prima etichetta** dell'host e riscrive `/` e `/:path*` in `/{subdomain}`, cioè il segmento App Router `[sdSlug]`. Quindi `grace.b1.church/about` diventa `/grace/about`.

All'interno di `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chiama `GET /membership/churches/lookup/?subDomain={sdSlug}`. La risposta di `ChurchController.getBySubDomain` ha ora due rami:

| Lo slug corrisponde a | Risposta | Significato |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sito principale di quella chiesa |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sito secondario**: il controller ricorre alla tabella `sites`, risale alla chiesa proprietaria e restituisce lo slug richiesto insieme al `siteId` aggiuntivo |

Quel `siteId` aggiuntivo è l'unica cosa che distingue una richiesta a un sito secondario da una a un sito principale; tutto il resto della pipeline è condiviso.

Uno slug che non corrisponde a nessuna delle due tabelle restituisce `{}` con un `200`. `ConfigHelper.load` tratta una risposta senza `id` come un sito sconosciuto e chiama `notFound()` di Next, così un sottodominio sconosciuto ottiene un vero 404 invece di far chiedere a ogni chiamata successiva un percorso `/…/undefined`. La rotta della pagina del builder costruisce anche il proprio percorso dell'albero con `pageTreePath()` (`src/helpers/pageTreePath.ts`), che codifica lo slug in URL, quindi uno slug malformato (barre rovesciate, spazi) restituisce 404 invece di far emergere come 500 il `400` dell'API.

### Domini personalizzati

Un dominio di proprietà della chiesa termina sull'**edge Caddy** (descritto più avanti), che riscrive l'header `Host` nel `{sub}.b1.church` del sito prima di inoltrare la richiesta a B1App. Quindi, nel percorso normale, B1App riceve un host *interno* `*.b1.church` e lo risolve tramite l'etichetta dell'host esattamente come un sottodominio nativo: la ricerca nel database del middleware non viene mai eseguita. `src/middleware.ts` viene comunque eseguito su ogni richiesta, ma con un compito sempre attivo e un ripiego:

1. **Sempre**: **elimina qualsiasi header `x-site` fornito dal client**. Quell'header è un input di riscrittura falsificabile e viene considerato attendibile solo quando è il middleware stesso a impostarlo; rimuoverlo è il vero compito del middleware dietro Caddy.
2. **Ripiego, solo per un `Host` non interno**: per un `Host` di dominio personalizzato grezzo che raggiunge B1App *senza* la riscrittura di Caddy, chiama `GET /membership/domains/public/lookup/{host}` e, se restituisce un `subDomain`, imposta `x-site: {subDomain}.b1.church`. Dietro Caddy questo ramo è inattivo, perché l'`Host` è già `*.b1.church`.

Gli host interni (`localhost`, `b1.church` e i suffissi `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app`) saltano completamente la ricerca: sono già risolti tramite la riscrittura dell'etichetta dell'host oppure sono host di anteprima/deploy.

La ricerca vera e propria (`DomainRepo.loadByName`) esegue un left join di `domains → churches` e `domains → sites` e restituisce `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`: il sottodominio del sito secondario assegnato, se il dominio ne punta uno, altrimenti quello della chiesa. Cerca prima l'host esatto; se quell'host iniziava con `www.` e non ha trovato corrispondenza, riprova **una sola volta** con il dominio apice nudo.

Tornando a `next.config.mjs`, le regole di riscrittura di `x-site` sono posizionate **prima** delle regole generiche sull'host, quindi hanno la precedenza. `x-site: grace.b1.church` → prima etichetta `grace` → `[sdSlug] = grace`, e da lì la risoluzione è identica al percorso dei sottodomini (stessa `churches/lookup`, stesso `siteId`).

:::info
L'header `x-site` non è affidabile dall'esterno. Il middleware rimuove incondizionatamente qualsiasi `x-site` in arrivo prima di eventualmente impostare il proprio, e le regole di riscrittura vedono solo il valore impostato dal middleware: un client non può forzarsi sui contenuti di un'altra chiesa inviando un header.
:::

Due dettagli operativi del middleware:

- **Cache.** Il risultato di ogni host (un riscontro *oppure* un mancato riscontro confermato, mai un errore di rete) viene memorizzato nella cache per **10 minuti** in una `Map` in memoria, per ogni isolate serverless.
- **Matcher.** Il matcher reinclude deliberatamente `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Il suo primo pattern esclude i percorsi con il punto, che altrimenti scarterebbero questi file; vengono reinseriti così che anche i file SEO/PWA per chiesa di un dominio personalizzato ricevano l'header `x-site`.
- **Header canonico.** Per le pagine della chiesa il middleware aggiunge alla risposta un header `Link: <{proto}://{host}{path}>; rel="canonical"`, che indica l'host da cui la pagina è stata effettivamente servita: sottodominio o dominio personalizzato (`helpers/canonicalLink.ts`). Quando un dominio personalizzato raggiunge B1App tramite il [proxy Caddy](../deployment/caddy-proxy.md), l'host della richiesta è il sottodominio `{sub}.b1.church`, quindi il middleware usa invece il dominio del visitatore dall'header `X-Church-Host`, ma solo dopo che `/domains/public/lookup/{host}` ha confermato che quel dominio corrisponde allo stesso sottodominio (`ownsSubdomain()`). Il link canonico, `robots.txt` e `sitemap.xml` indicano quindi il dominio personalizzato anziché il sottodominio `b1.church`. Viene saltato sugli host che non sono di chiesa (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) e sulle rotte `/mobile`, `/login`, `/logout` e sui file robots/sitemap/manifest generati.

### Sito pubblico disattivato

Una chiesa può attivare **Disabilita sito pubblico** in B1Admin (impostazione dei contenuti a livello di chiesa `hidePublicSite = "true"`). Il sito serve allora solo le rotte riservate ai membri:

- **Il middleware di B1App** cerca il sottodominio (`/membership/churches/lookup` e poi `/content/settings/public/:churchId`) e reindirizza le richieste anonime per qualsiasi percorso fuori dalla lista consentita verso `/login?returnUrl={path}{query}`. La lista consentita (`helpers/publicSite.ts`) comprende `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` e i file manifest/robots/sitemap. Vengono memorizzate nella cache solo le risposte confermate (60 secondi in produzione, perché la chiamata di revalidate dell'amministratore non può svuotare questa mappa per istanza; senza cache in dev/test). Un errore dell'API mostra il sito anziché bloccare tutti.
- **I membri con accesso effettuato vedono il sito completo.** Una richiesta che contiene un cookie `jwt` non scaduto (`hasSession()` del middleware decodifica il campo `exp` del payload senza verificarne la firma: è un controllo debole, non un controllo di accesso) salta il reindirizzamento, quindi dopo il login un membro torna alla pagina richiesta e vede le pagine normali, le pagine integrate (Gruppi, Sermoni, ecc.) e la navigazione dell'intestazione. I componenti delle pagine e `Header` non controllano più essi stessi `hidePublicSite`.
- **`robots.txt`** nega tutto, come avviene sugli host noindex.
- **API.** `GET /content/pages/public/:churchId` (l'elenco delle pagine della sitemap) restituisce `[]`, così i chiamanti anonimi non possono elencare le pagine.

### Propagazione di `siteId`

`ConfigHelper` memorizza il `siteId` risolto nella propria `ConfigurationInterface` per richiesta (memorizzata con `cache()` di React) e aggiunge `?siteId=` alle chiamate di contenuto che esso e i componenti della pagina effettuano, **in modo condizionale**: un `siteId` vuoto (il sottodominio di una chiesa con sito principale) omette del tutto il parametro. Gli endpoint che ricevono la propagazione sono l'albero di pagine (`/content/pages/:id/tree`), l'elenco pubblico delle pagine usato dalla sitemap (`/content/pages/public/:id`), gli stili globali (`/content/globalStyles/church/:id`), i link di navigazione (`/content/links/church/:id`) e il blocco footer autonomo (`/content/blocks/public/footer/:id`). Nel normale percorso di rendering il footer arriva all'interno dell'albero di pagine (sezioni con `zone: "siteFooter"`), già recuperato con `siteId`, quindi non esiste alcuna lacuna di footer senza ambito.

Il portale dei membri (B1App `mobile`) è intenzionalmente escluso da questo meccanismo: `loadChurchAppearance.ts` risolve la chiesa tramite `churches/lookup` ma legge `/settings/public/{id}` a livello di chiesa e non propaga mai `siteId`. Il portale è a livello di chiesa nella v1 (vedi sotto).

## Più siti web per chiesa

### Modello dei dati

La nuova tabella `membership.sites` è volutamente minima:

| Colonna | Tipo | Note |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Chiesa proprietaria |
| `name` | `varchar(255)` | Nome visualizzato (ad es. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Indice univoco**: spazio dei nomi globale (vedi sotto) |

L'ambito del sito si riduce quindi a una sola colonna, non annullabile, aggiunta alle tabelle dei contenuti e dei domini:

| Tabella (modulo) | Colonna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Il dominio serve il sito principale |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sito principale; e su **`blocks`**, `''` significa inoltre *condiviso tra tutti i siti* |

Due migrazioni aggiungono tutto ciò (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Poiché la colonna ha come valore predefinito `''`, ogni riga esistente mantiene il comportamento attuale senza bisogno di alcun riempimento retroattivo.

**Spazio dei nomi globale dei sottodomini.** `sites.subDomain` condivide *un unico* spazio dei nomi con `churches.subDomain`: il sottodominio di un sito non può mai entrare in collisione con quello di una chiesa o di un altro sito. Questo è imposto su **entrambi** i percorsi di salvataggio: `SiteController.save` rifiuta uno slug già usato da `churches` o da `sites`, e `ChurchController.validateSave` fa lo stesso in senso inverso. Un indice univoco su `sites.subDomain` lo garantisce a livello di database.

**L'unicità delle pagine** è stata estesa da `(churchId, url)` a `(churchId, siteId, url)`, così due siti della stessa chiesa possono avere ciascuno la propria pagina `/about`.

### Contenuti per sito, con ripieghi

Ogni endpoint di **elenco/albero** dei contenuti con ambito di sito accetta un `?siteId=` facoltativo (se assente ⇒ `''` = principale): albero / elenco / pubblico delle pagine, elenco / per tipo / footer dei blocchi, link (anonimi / filtrati / tutti) e stili globali. Sezioni ed elementi *non* hanno un ambito diretto: ereditano tramite la pagina o il blocco padre.

Due catene di risoluzione svolgono il lavoro più interessante:

- **Stili globali: `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` restituisce la riga propria del sito; se un sito secondario non ne ha una, restituisce la **riga principale (`''`) così com'è** (mantenendo l'`id`/`siteId` del principale, che il client usa per la copia in scrittura), e se manca anche quella principale, `GlobalStyleController` restituisce una tavolozza di colori/font predefinita fissa nel codice. 
- **Blocco footer: vince quello specifico del sito, altrimenti ricade su quello condiviso.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` restituisce sia le righe condivise (`''`) *sia* quelle specifiche del sito; il risolutore sceglie il footer del sito, se presente, altrimenti quello condiviso. La stessa logica viene eseguita sia in `TreeHelper.insertBlocks` (albero di pagine) sia nell'endpoint autonomo `/content/blocks/public/footer/:churchId`.

### Eliminazione del sito in cascata

`SiteController.delete` (protetto dal permesso Impostazioni→Modifica di membership) elimina un sito secondario in tre passaggi:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` elimina in cascata tutti i contenuti di proprietà del sito: le sue **pagine** → le loro sezioni, elementi, `pageHistory` e `posts`; i suoi **blocchi** → le loro sezioni, elementi e `pageHistory`; i suoi **link** e i suoi **globalStyles**. Una guardia rifiuta di eseguire l'operazione per `''`: il valore sentinella del principale/condiviso non viene mai eliminato in cascata.
2. `DomainRepo.clearSiteId` **riassegna** i domini del sito al principale (`siteId → ''`) anziché eliminarli, così un dominio personalizzato sopravvive all'eliminazione del sito.
3. La riga `sites` viene eliminata e le rotte Caddy vengono risincronizzate (in modo best-effort).

### Superficie di B1Admin

| Funzionalità | Dove | Meccanismo |
|-----------|-------|-----------|
| Selettore del sito | `useSiteSelection` + `SiteSwitcher` (vuoto = "Sito principale") | Legge un parametro URL `?site=` e lo propaga come `?siteId=` nelle chiamate a ContentApi. Presente nelle tre aree **elenco** del sito — **Pagine**, **Blocchi**, **Aspetto** — ma *non* negli editor di pagine/blocchi, che portano `siteId` nel record |
| Creazione/eliminazione dei siti | `SitesDialog`, aperto dalla voce "Gestisci siti web…" del selettore | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Protetto dal permesso Impostazioni→Modifica di membership (`Permissions.settings.edit` lato server; `Permissions.membershipApi.settings.edit` in B1Admin). **Solo creazione/eliminazione: nella v1 non esiste un'interfaccia per rinominare** |
| Assegnazione del sito per dominio | `DomainSettingsEdit` in Impostazioni→Domini | Un menu a tendina del sito per ogni riga invia `siteId` per dominio a `/membership/domains`. La colonna si nasconde se l'API non restituisce siti (backend più vecchio) |
| Stili in copia in scrittura | `StylesManager.prepareForSave` | Quando la riga degli stili globali caricata ha un `siteId` diverso da quello del sito selezionato (cioè l'API ha restituito il principale ereditato come ripiego), elimina l'`id` del principale e applica il `siteId` corrente, forzando un **inserimento** di una nuova riga specifica del sito invece di sovrascrivere il principale. La stessa biforcazione in caso di mancata corrispondenza si applica al blocco footer del sito |

:::info
**Ciò che resta a livello di chiesa nella v1 (una scelta deliberata di ambito, non un limite del modello dei dati):** il **blog** (`BlogPage` non ha selettore e carica `/posts` senza `siteId`), i **widget del sito** (banner degli annunci e launcher), i **reindirizzamenti**, le **impostazioni di logo / GA4 / chiesa** e il **portale dei membri** (B1App mobile). Nota che questo *non* significa "tutto Aspetto": gli stili globali di un sito secondario (tavolozza, font, tipografia, spaziatura, navigazione, CSS personalizzato) **sono** per sito tramite il percorso di copia in scrittura descritto sopra; restano a livello di chiesa solo i sottopannelli banner/launcher/reindirizzamenti/logo della pagina Aspetto.
:::

## Domini personalizzati: edge Caddy (piano di configurazione statica)

:::info
**Indirizzo rivisto il 2026-07-02.** Un piano precedente per spostare l'hosting dei domini personalizzati sui domini gestiti da Vercel è stato **annullato**, e tutto il codice di registrazione dei domini Vercel (`VercelHelper`, le sue variabili d'ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, i parametri SSM e le voci di health) è stato rimosso dall'Api. Il **proxy Caddy gestito autonomamente su EC2 resta** come edge permanente per i domini personalizzati. L'unico lavoro rimanente è interno: sostituire la configurazione di *runtime* dell'API di amministrazione di Caddy con una configurazione *statica* che sopravviva ai riavvii.
:::

### L'edge

Ogni dominio personalizzato di una chiesa punta il DNS a un'unica macchina EC2 — `3.23.251.61`, raggiungibile anche come `proxy.b1.church`. La schermata Impostazioni→Domini di B1Admin indica alle chiese di aggiungere un record apice `A → 3.23.251.61` oppure un `CNAME → proxy.b1.church`. Caddy termina il TLS con un certificato Let's Encrypt per dominio, riscrive l'header `Host` nell'upstream `{sub}.b1.church` del dominio e inoltra la richiesta a B1App, che poi la instrada tramite l'etichetta dell'host come qualsiasi sottodominio nativo (vedi [Domini personalizzati](#domini-personalizzati) sopra).

La mappatura dell'upstream proviene da `DomainRepo.loadPairs`, il cui dial applica **COALESCE al sottodominio del sito assegnato**, così un dominio viene inoltrato al sito *secondario* corretto, con ripiego su quello principale della chiesa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Le righe `www.*` sono escluse dalla mappa; Caddy serve `www.{host}` tramite un reindirizzamento `302` verso l'apice.

### Due endpoint anonimi alimentano l'edge

`DomainController` espone due endpoint di sola lettura non autenticati che la macchina consuma direttamente, anonimi per necessità, dato che l'edge li interroga prima che esista qualunque contesto di chiesa:

| Endpoint | Restituisce | Ruolo |
|----------|----------|------|
| `GET /membership/domains/authorize?domain=` | `200` se il dominio, oppure, per un mancato riscontro `www.`, il suo apice nudo, esiste in `domains`; `404` altrimenti (incluso un `domain` vuoto) | Il **`ask` del TLS on-demand** di Caddy: il controllo anti-abuso che decide se emettere un certificato per un SNI in arrivo |
| `GET /membership/domains/hostmap` | `text/plain`, una riga ordinata `{domain} {sub}.b1.church` per ogni dominio instradabile | Il file di mappa host→upstream che la macchina aggiorna a intervalli regolari |

`authorize` riutilizza `DomainRepo.loadByName` (host esatto, poi un nuovo tentativo unico `www.`→apice); `hostmap` riutilizza `loadPairs`, quindi è consapevole del sito ed esclude `www.*`, identico alle rotte del proxy, e si limita a rimuovere il suffisso `:443`.

### Salvataggio/eliminazione del dominio: un'unica spinta best-effort

`DomainController.save` scrive le righe di `domains` e poi effettua un'unica chiamata `CaddyHelper.updateCaddy()` di tipo best-effort, racchiusa in un `try/catch` che registra (`console.error`) e ignora l'errore; `delete` fa lo stesso (il che ha anche corretto un precedente bug di rotta obsoleta dopo l'eliminazione), così come l'eliminazione di un sito secondario (`SiteController.delete`). `updateCaddy` è a sua volta limitata da un timeout Axios di **10 secondi**, quindi un Caddy irraggiungibile o fermo non può mai far restituire `500` a un salvataggio di dominio: la tabella `domains` è la fonte di verità.

### Stato attuale: configurazione statica, nessuno stato di runtime

La macchina (un'istanza EC2 Windows dietro l'Elastic IP permanente) esegue Caddy con un **Caddyfile statico**: il TLS on-demand il cui `ask` punta a `/membership/domains/authorize`, più un file di mappa host→upstream aggiornato ogni 5 minuti da `/membership/domains/hostmap` tramite un'attività pianificata che termina con un `caddy reload` graduale. La configurazione sopravvive ai riavvii senza alcuno stato di runtime (nessuna procedura di riallineamento), e un SNI sconosciuto viene **rifiutato a livello TLS** (non viene emesso alcun certificato per un host che `authorize` respinge), mentre un host autorizzato ma non ancora mappato (un dominio appena creato all'interno della finestra di sincronizzazione) riceve un 404 pulito. I nuovi domini diventano instradabili entro circa 5 minuti dal salvataggio; i loro certificati vengono emessi alla prima richiesta. Costruzione/configurazione, operazioni e insidie emerse sul campo: [Proxy di dominio personalizzato Caddy](../deployment/caddy-proxy).

### Spinta di runtime legacy: percorso di rollback, in attesa di eliminazione

`CaddyHelper` (modulo membership) può ancora pilotare Caddy tramite la sua **API di amministrazione** su `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; nessuna operazione se non impostati; visibile nel gruppo Integrazioni di `ServerHealthController`): `updateCaddy()` esegue una PATCH di un intero array di rotte, e `initializeCaddy()` più gli endpoint `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ricostruiscono da zero un server configurato a runtime. In quella modalità la configurazione viveva solo nella memoria di Caddy: l'amnesia ai riavvii che questa architettura ha sostituito. Il meccanismo resta solo come percorso di rollback ed è previsto per l'eliminazione una volta che la macchina statica si sarà dimostrata stabile; la spinta `updateCaddy()` best-effort al salvataggio/eliminazione del dominio è un no-op innocuo sulla macchina statica (la sua API di amministrazione accetta solo localhost).

## Pagine correlate

- [Proxy di dominio personalizzato Caddy](../deployment/caddy-proxy): la macchina edge stessa: configurazione di una macchina nuova, servizio WinSW, attività di sincronizzazione della mappa e insidie operative
- [Website Builder](./website-builder): l'albero di pagine/sezioni/elementi, i renderer, il blog, la SEO e la generazione con IA (ciò che viene visualizzato una volta che una richiesta è stata risolta in una chiesa/sito)
- [Endpoint dei contenuti](../api/endpoints/content): la superficie REST per pagine, blocchi, link e stili globali, ora tutti consapevoli di `?siteId=`
- [B1App](../web-apps/b1-app): l'app Next.js che ospita il middleware e il routing `[sdSlug]`
- [Deployment delle web app](../deployment/web-apps): come B1App viene distribuita su Vercel
