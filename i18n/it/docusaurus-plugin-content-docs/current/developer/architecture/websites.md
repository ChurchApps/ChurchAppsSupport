---
title: "Instradamento di Siti Web e Multi-Sito"
---

# Instradamento di Siti Web e Multi-Sito

<div class="article-intro">

Una singola chiesa può ora servire più di un sito web distinto, e ognuno può trovarsi su un sottodominio `*.b1.church` o su un dominio completamente personalizzato di proprietà della chiesa. Questa pagina mappa lo strato di routing che si trova *sotto* il builder: come una richiesta in arrivo si risolve in una chiesa **e** in un sito specifico, il modello di dati multi-sito (il sentinella `siteId` che mantiene ogni sito pre-esistente invariato), e il bordo di dominio personalizzato — un proxy Caddy auto-gestito su EC2 che termina TLS e riscrive ogni dominio di chiesa sul suo upstream `*.b1.church`. Per quello che effettivamente si rende una volta che una richiesta si è risolta — l'albero pagina/sezione/elemento — vedi [Website Builder](./website-builder).

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

Tre regole si mantengono attraverso questo strato:

1. **Un sentinella mantiene tutto compatibile all'indietro.** `siteId = ''` è il sito primario. Ogni riga di pagina, blocco, collegamento, stile globale e dominio che esisteva prima di questa funzione porta `''` e si rende esattamente come faceva. Un *secondo* sito web è semplicemente un insieme di righe con un `siteId` non vuoto, e qualsiasi endpoint di contenuto chiamato senza `?siteId=` restituisce il sito primario — byte-per-byte la vecchia richiesta.
2. **La risoluzione è basata su host-label e converge.** Un sottodominio `*.b1.church` instrada con la sua etichetta host direttamente; un dominio personalizzato viene riscritto su sua etichetta `{sub}.b1.church` al bordo Caddy prima che B1App lo veda (con una ricerca DB middleware che timbra un header `x-site` come fallback per qualsiasi `Host` personalizzato greggio). Entrambi i rami atterrano sulla stessa rotta `[sdSlug]` e la stessa chiamata `churches/lookup`, quindi il rendering downstream è identico.
3. **Il bordo Caddy è stateless su un'unica fonte di verità.** I domini personalizzati terminano a un proxy Caddy auto-gestito su EC2 che riscrive ogni dominio sul suo upstream `{sub}.b1.church`. Un save di dominio attiva una singola `CaddyHelper.updateCaddy()` best-effort, e Caddy legge anche la tabella `domains` direttamente (gli endpoint `authorize` e `hostmap` sotto). La tabella è autorevole — un Caddy irraggiungibile non può mai far fallire un save.

## Risoluzione del sito

### Sottodomini `*.b1.church`

`B1App/next.config.mjs` riscrive le richieste in arrivo per host. Una regola host con il modello `(?<subdomain>.*?)\..*` cattura l'**etichetta prima** dell'host e riscrive `/` e `/:path*` in `/{subdomain}` — il segmento App-Router `[sdSlug]`. Quindi `grace.b1.church/about` diventa `/grace/about`.

All'interno di `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chiama `GET /membership/churches/lookup/?subDomain={sdSlug}`. La risposta `ChurchController.getBySubDomain` ha ora due rami:

| Lo slug corrisponde | Risposta | Significato |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sito primario di quella chiesa |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sito secondario** — il controller ritorna a `sites`, risolve la chiesa proprietaria e echeggia lo slug interrogato più l'extra `siteId` |

Questo extra `siteId` è l'unica cosa che distingue una richiesta di sito secondario da uno primario; tutto il resto nella pipeline è condiviso.

### Domini personalizzati

Un dominio di proprietà della chiesa termina al **bordo Caddy** (dettagliato di seguito), che riscrive l'header `Host` al `{sub}.b1.church` del sito prima di eseguire il proxy a B1App. Quindi sul percorso normale B1App riceve un host `*.b1.church` *interno* e lo risolve per etichetta host esattamente come un sottodominio nativo — la ricerca DB middleware non viene mai attivata. `src/middleware.ts` viene comunque eseguito su ogni richiesta, ma con un lavoro sempre attivo e un fallback:

1. **Sempre** — **cancella qualsiasi header `x-site` fornito dal client**. Quell'header è input di riscrittura spoofabile ed è affidato solo quando il middleware stesso lo imposta; rimuoverlo è il vero lavoro del middleware dietro Caddy.
2. **Fallback, solo `Host` non interno** — per un `Host` di dominio personalizzato grezzo che raggiunge B1App *senza* la riscrittura di Caddy, chiama `GET /membership/domains/public/lookup/{host}` e, se restituisce un `subDomain`, imposta `x-site: {subDomain}.b1.church`. Dietro Caddy questo ramo è inerte perché l'`Host` è già `*.b1.church`.

Gli host interni — `localhost`, `b1.church` e i suffissi `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — saltano completamente la ricerca (sono già risolti dalla riscrittura etichetta host, o sono host di anteprima/distribuzione).

La ricerca stessa (`DomainRepo.loadByName`) left-join `domains → churches` e `domains → sites` e restituisce `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — il sottodominio del sito secondario assegnato se il dominio punta a uno, altrimenti quello della chiesa. Corrisponde all'host esatto per primo; se quell'host iniziava con `www.` e mancava, riprova **una volta** contro l'apice nudo.

Di nuovo in `next.config.mjs`, le regole di riscrittura `x-site` sono collocate **avanti** alle regole host generiche, quindi vincono. `x-site: grace.b1.church` → prima etichetta `grace` → `[sdSlug] = grace`, e da lì la risoluzione è identica al percorso del sottodominio (stessa `churches/lookup`, stesso `siteId`).

:::info
L'header `x-site` non è affidabile da fuori. Il middleware spoglia incondizionatamente qualsiasi `x-site` in arrivo prima di facoltativamente impostare il proprio, e le regole di riscrittura vedono solo il valore impostato dal middleware — un client non può forzarsi nei contenuti di un'altra chiesa inviando un header.
:::

Due dettagli operativi sul middleware:

- **Cache.** Il risultato di ogni host (un hit *o* un miss confermato — mai un errore di rete) è memorizzato nella cache per **10 minuti** in una `Map` in memoria, per isolato serverless.
- **Matcher.** Il matcher deliberatamente ri-include `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`. Il suo primo modello esclude i percorsi punteggiati, che altrimenti farebbero cadere quei file; vengono aggiunti di nuovo in modo che il SEO/PWA file per Chiesa di un dominio personalizzato riceva anche l'header `x-site`.
- **Header canonico.** Per le pagine chiesa il middleware aggiunge un'intestazione di risposta `Link: <{proto}://{host}{path}>; rel="canonical"` denominando l'host da cui la pagina è stata effettivamente servita — sottodominio o dominio personalizzato (`helpers/canonicalLink.ts`). Viene saltato su host non chiesa (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) e su `/mobile`, `/login`, `/logout` e i file robots/sitemap/manifest generati.

### Sito web pubblico disabilitato

Una chiesa può attivare **Disabilita Sito Web Pubblico** in B1Admin (impostazione di contenuto a livello chiesa `hidePublicSite = "true"`). Il sito quindi serve solo i suoi percorsi rivolti ai membri:

- **Middleware B1App** cerca il sottodominio (`/membership/churches/lookup` quindi `/content/settings/public/:churchId`) e reindirizza le richieste anonime per qualsiasi percorso fuori dalla lista di permessi a `/login?returnUrl={path}{query}`. La lista di permessi (`helpers/publicSite.ts`) è `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` e i file manifest/robots/sitemap. Solo le risposte confermate sono memorizzate nella cache (60 secondi in produzione, poiché la chiamata revalidate dell'admin non può cancellare questa mappa per istanza; non memorizzata nella cache in dev/test). Un errore API serve il sito piuttosto che bloccare tutti.
- **I membri connessi vedono il sito completo.** Una richiesta che porta un cookie `jwt` non scaduto (il middleware `hasSession()` decodifica l'`exp` del payload senza verificare la firma -- questo è un soft gate, non il controllo di accesso) salta il redirect, quindi dopo aver effettuato l'accesso un membro torna alla pagina che ha chiesto e vede le pagine normali, le pagine incorporate (Gruppi, Sermoni, ecc.) e la navigazione dell'header. I componenti della pagina e l'`Header` non controllano più `hidePublicSite` stessi.
- **`robots.txt`** disallows tutto, come su host noindex.
- **API.** `GET /content/pages/public/:churchId` (l'elenco di pagine della sitemap) restituisce `[]`, quindi i chiamanti anonimi non possono elencare le pagine.

### Threading di `siteId`

`ConfigHelper` memorizza il `siteId` risolto sulla sua `ConfigurationInterface` per richiesta (memoizzato con React `cache()`) e aggiunge `?siteId=` alle chiamate di contenuto che effettua e ai componenti della pagina — **condizionatamente**: un `siteId` vuoto (un sottodominio di chiesa primaria) omette completamente il parametro. Gli endpoint thread sono l'albero della pagina (`/content/pages/:id/tree`), l'elenco della pagina pubblica utilizzato dalla sitemap (`/content/pages/public/:id`), gli stili globali (`/content/globalStyles/church/:id`), i link di nav (`/content/links/church/:id`) e il blocco footer autonomo (`/content/blocks/public/footer/:id`). Sul percorso di rendering normale il footer arriva all'interno dell'albero della pagina (sezioni contrassegnate `zone: "siteFooter"`), già recuperate con `siteId`, quindi non c'è lacuna di footer senza scope.

Il portale dei membri (B1App `mobile`) intenzionalmente siede fuori da questo: `loadChurchAppearance.ts` risolve la chiesa tramite `churches/lookup` ma legge `/settings/public/{id}` a livello di chiesa e non fa mai il thread di `siteId` — il portale è a livello di chiesa in v1 (vedi sotto).

## Più siti web per chiesa

### Modello di dati

La nuova tabella `membership.sites` è deliberatamente minuscola:

| Colonna | Tipo | Note |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Chiesa proprietaria |
| `name` | `varchar(255)` | Nome visualizzato (ad es. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Indice univoco** — spazio dei nomi globale (sotto) |

Lo scoping del sito è quindi una singola colonna nullable-free aggiunta alle tabelle di contenuto e dominio:

| Tabella (modulo) | Colonna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Il dominio serve il sito primario |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sito primario — e su **`blocks`**, `''` inoltre significa *condiviso tra tutti i siti* |

Due migrazioni aggiungono tutto questo (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Poiché la colonna è predefinita a `''`, ogni riga esistente mantiene il comportamento odierno senza backfill.

**Spazio dei nomi di sottodominio globale.** `sites.subDomain` condivide *uno* spazio dei nomi con `churches.subDomain` — un sottodominio di sito non può mai collisionare con un sottodominio di chiesa o un altro sito. Questo è applicato su **entrambi** i percorsi di salvataggio: `SiteController.save` rifiuta uno slug che colpisce `churches` o `sites`, e `ChurchController.validateSave` fa lo stesso al contrario. Un indice univoco su `sites.subDomain` lo sostiene al livello del database.

**Unicità pagine** ampliata da `(churchId, url)` a `(churchId, siteId, url)`, quindi due siti di una chiesa possono ognuno possedere il loro `/about`.

### Contenuto per sito, con fallback

Ogni endpoint di elenco/albero di contenuto con scope del sito accetta un `?siteId=` facoltativo (assente ⇒ `''` = primario): albero/elenco/pubblico di pagine, elenco/per-tipo/footer di blocchi, link (anon / filtrato / tutto), e stili globali. Le sezioni e gli elementi *non* sono scoped direttamente — ereditano tramite la loro pagina o blocco padre.

Due catene di risoluzione fanno il lavoro interessante:

- **Stili globali — `sito → primario → predefinito`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` restituisce la riga del sito; se un sito secondario non ne ha nessuno, restituisce la riga **primaria (`''`) così com'è** (mantenendo l'`id`/`siteId` primario, che il client usa per copy-on-write); se non c'è nemmeno il primario, `GlobalStyleController` restituisce una tavolozza/caratteri predefiniti hard-coded.
- **Blocco footer — il specifico del sito vince, il condiviso ritorna.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` restituisce le righe *condivise* (`''`) *e* specifiche del sito; il risolvente raccoglie il footer del sito se presente, altrimenti quello condiviso. La stessa logica viene eseguita sia in `TreeHelper.insertBlocks` (albero della pagina) che nell'endpoint autonomo `/content/blocks/public/footer/:churchId`.

### Cascata di eliminazione del sito

`SiteController.delete` (gated sulla permissione Settings→Edit di membership) demolisce un sito secondario in tre passaggi:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` cascata tutto il contenuto che il sito possiede: le sue **pagine** → loro sezioni, elementi, `pageHistory` e `posts`; i suoi propri **blocchi** → loro sezioni, elementi e `pageHistory`; i suoi **link** e **globalStyles**. Una guardia rifiuta di correre per `''` — il sentinella primario/condiviso non è mai a cascata.
2. `DomainRepo.clearSiteId` **rassegna** i domini del sito indietro al primario (`siteId → ''`) piuttosto che eliminarli, quindi un dominio personalizzato sopravvive a un'eliminazione del sito.
3. La riga `sites` viene eliminata e i percorsi Caddy vengono ri-sincronizzati (best-effort).

### Superficie B1Admin

| Capacità | Dove | Meccanismo |
|-----------|-------|-----------|
| Selettore di sito | `useSiteSelection` + `SiteSwitcher` (vuoto = "Main Website") | Legge un parametro URL `?site=` e lo filetta come `?siteId=` nelle chiamate ContentApi. Presente sulle tre aree **list** del sito — **Pages**, **Blocks**, **Appearance** — ma *non* negli editor pagina/blocco, che portano `siteId` sul record |
| Creazione/eliminazione siti | `SitesDialog`, aperto dall'ingresso "Manage websites…" del selettore | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). Gated sulla permissione Settings→Edit di membership (`Permissions.settings.edit` lato server; `Permissions.membershipApi.settings.edit` in B1Admin). **Solo creazione/eliminazione — non c'è UI di rinomina in v1** |
| Assegnazione sito per dominio | `DomainSettingsEdit` sotto Settings→Domains | Un dropdown di sito per riga posta `siteId` per dominio a `/membership/domains`. La colonna si nasconde se l'API non restituisce siti (backend più vecchio) |
| Stili copy-on-write | `StylesManager.prepareForSave` | Quando la riga di stile globale caricata `siteId` non corrisponde al sito selezionato (vale a dire che l'API ha restituito il primario ereditato come fallback), abbassa l'`id` del primario e timbra il `siteId` corrente, forzando un **insert** di una nuova riga specifica del sito invece di sovrascrivere il primario. Lo stesso fork-on-mismatch si applica al blocco footer del sito |

:::info
**Quello che rimane a livello di chiesa in v1 (una scelta di scoping deliberata, non un limite del modello di dati):** il **blog** (`BlogPage` non ha selettore e carica `/posts` senza `siteId`), i **widget del sito** (banner di annuncio + launcher), **reindirizzamenti**, il **logo / GA4 / impostazioni chiesa**, e il **portale dei membri** (B1App mobile). Nota che questo *non* è "tutto di Appearance" — gli stili globali di un sito secondario (tavolozza, caratteri, tipografia, spaziatura, nav, CSS personalizzato) **sono** per sito tramite il percorso copy-on-write sopra; solo i sub-pannelli di banner/launcher/reindirizzamenti/logo della pagina Appearance rimangono a livello di chiesa.
:::

## Domini personalizzati: Bordo Caddy (piano di config statico)

:::info
**Direzione rivista 2026-07-02.** Un piano precedente per spostare l'hosting di dominio personalizzato su domini gestiti da Vercel era **cancellato**, e tutto il codice di registrazione di dominio Vercel (`VercelHelper`, le sue variabili env `vercelToken`/`vercelProjectId`/`vercelTeamId`, parametri SSM e voci di salute) è stato rimosso dall'Api. Il proxy Caddy auto-gestito su EC2 **rimane** come bordo di dominio personalizzato permanente. L'unico lavoro rimanente è interno: scambiare la configurazione di admin-API *runtime* di Caddy per una *statica* che sopravvive ai riavvi.
:::

### Il bordo

Ogni dominio di chiesa personalizzato punta DNS a una casella EC2 — `3.23.251.61`, raggiungibile anche come `proxy.b1.church`. Lo schermo Settings→Domains di B1Admin istruisce le chiese ad aggiungere un apex `A → 3.23.251.61` o un `CNAME → proxy.b1.church`. Caddy termina TLS con un cert Let's Encrypt per dominio, riscrive l'header `Host` all'upstream `{sub}.b1.church` del dominio, e reverse-proxies a B1App — che poi lo instrada per etichetta host come qualsiasi sottodominio nativo (vedi [Domini personalizzati](#custom-domains) sopra).

La mappatura upstream proviene da `DomainRepo.loadPairs`, il cui dial **COALESCE il sottodominio del sito assegnato** in modo che un dominio faccia proxy al sito *secondario* corretto, ricadendo al primario della chiesa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Le righe `www.*` sono escluse dalla mappa; Caddy serve `www.{host}` tramite un reindirizzamento `302` all'apex.

### Due endpoint anonimi alimentano il bordo

`DomainController` espone due endpoint non autenticati e di sola lettura che la casella consuma direttamente — anonimi per necessità, poiché il bordo li interroga prima che esista qualsiasi contesto di chiesa:

| Endpoint | Restituisce | Ruolo |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` se il dominio — o, per un miss `www.`, il suo apice nudo — esiste in `domains`; `404` altrimenti (incluso un `domain` vuoto) | L'**ask** TLS on-demand di Caddy: il controllo dell'abuso che decide se emettere un cert per un SNI in arrivo |
| `GET /membership/domains/hostmap` | `text/plain`, un `{domain} {sub}.b1.church` smistato per riga per dominio instradabile | Il file di mappa host→upstream che la casella aggiorna su un timer |

`authorize` riusa `DomainRepo.loadByName` (host esatto, poi un singolo retry `www.`→apex); `hostmap` riusa `loadPairs` — quindi è consapevole del sito ed esclusa `www.*`, identica ai percorsi proxy — e semplicemente spoglia il suffisso `:443`.

### Save/eliminazione dominio — una singola push best-effort

`DomainController.save` scrive le righe `domains` e poi effettua una chiamata **singola best-effort** `CaddyHelper.updateCaddy()`, avvolta in un `try/catch` che registra (`console.error`) e inghiotte; `delete` fa lo stesso (che ha anche risolto un bug di percorso stale-on-delete precedente), così come l'eliminazione del sito secondario (`SiteController.delete`). `updateCaddy` stesso è limitato da un timeout Axios **10s**, quindi un Caddy irraggiungibile o fermato non può mai `500` un save di dominio — la tabella `domains` è la fonte di verità.

### Stato attuale — config statico, nessuno stato runtime

La casella (EC2 Windows dietro l'Elastic IP permanente) esegue Caddy da un **Caddyfile statico**: TLS on-demand il cui `ask` punta a `/membership/domains/authorize`, più un file di mappa host→upstream aggiornato ogni 5 minuti da `/membership/domains/hostmap` da un'attività pianificata che termina con un `caddy reload` gentile. Config sopravvive ai riavvi con zero stato runtime — nessuna danza di re-priming — e un SNI sconosciuto **rifiuta TLS** (nessun cert viene coniato per un host che `authorize` rifiuta), mentre un host autorizzato-ma-non-ancora-mappato (un nuovo dominio all'interno della finestra di sincronizzazione) ottiene un pulito 404. I nuovi domini diventano instradabili entro ~5 minuti di un save; i loro certificati vengono coniati al primo hit. Build/setup, operazioni e gotchas testati sul campo: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Push runtime legacy — percorso di rollback, in attesa di eliminazione

`CaddyHelper` (modulo membership) può ancora guidare Caddy tramite il suo **admin API** a `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op quando non impostato; esposto sotto il gruppo Integrazioni di `ServerHealthController`): `updateCaddy()` PATCHes un array completo di percorsi, e `initializeCaddy()` + gli endpoint `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ricostruiscono un server configurato per runtime da zero. La config di quella modalità viveva solo nella memoria di Caddy — l'amnesia del riavvio che questa architettura ha sostituito. La macchineria rimane solo come percorso di rollback ed è programmata per l'eliminazione una volta che la casella statica è stata stabile; la push `updateCaddy()` best-effort su dominio save/delete è un harmless no-op contro la casella statica (il suo admin API è solo localhost).

## Pagine Correlate

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — la casella edge stessa: fresh-box setup, servizio WinSW, task di sincronizzazione mappa, e gotchas operativi
- [Website Builder](./website-builder) — l'albero pagina/sezione/elemento, renderer, blog, SEO e generazione AI (cosa si rende una volta che una richiesta si è risolta in una chiesa/sito)
- [Content Endpoints](../api/endpoints/content) — la superficie REST per pagine, blocchi, link e stili globali, tutti ora `?siteId=`-aware
- [B1App](../web-apps/b1-app) — l'app Next.js che ospita il middleware e il routing `[sdSlug]`
- [Web App Deployment](../deployment/web-apps) — come B1App viene distribuito a Vercel
