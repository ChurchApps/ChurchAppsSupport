---
title: "Website Routing e multi-sito"
---

# Website Routing e multi-sito

<div class="article-intro">

Una sola chiesa può ora servire più di un sito web distinto, e ognuno può vivere su un subdominio `*.b1.church` o su un dominio completamente personalizzato di proprietà della chiesa. Questa pagina mappa il livello di routing che si siede *sotto* il builder: come una richiesta in arrivo si risolve in una chiesa **e** in un sito specifico, il modello di dati multi-sito (il sentinel `siteId` che mantiene ogni rendering di sito pre-esistente invariato), e il bordo di dominio personalizzato — un proxy Caddy auto-gestito su EC2 che termina TLS e riscrive ogni dominio della chiesa sul suo upstream `*.b1.church`. Per quello che effettivamente renderizza una volta che una richiesta si è risolta — l'albero di pagina/sezione/elemento — vedi [Website Builder](./website-builder).

</div>

## Panoramica

```
   grace.b1.church              www.gracechurch.org  (dominio personalizzato)
   (subdominio b1.church)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Bordo Caddy — EC2 3.23.251.61             │
          │             │             (proxy.b1.church)             │
          │             │  • termina TLS (cert LE per dominio)      │
          │             │  • riscrive Host → {sub}.b1.church        │
          │             │  • reverse-proxy a B1App                  │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • sempre: elimina qualsiasi x-site fornito dal client      │
   │  • Host *.b1.church interno ⇒ la ricerca di domini rimane inert
   │  • Host personalizzato raw (bypassing Caddy) ⇒ ricerca → impostare x-site
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → etichetta host prima → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   thread ?siteId= in ogni content call:          │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Impostazioni→Domini → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatale, timeout 10s)
  Caddy legge la tabella dei domini stessa tramite due endpoint anonimi:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 conosciuto / 404 sconosciuto)
        GET /membership/domains/hostmap    — mappa host→{sub}.b1.church (refresh 5 min)
```

Tre regole si mantengono in questo strato:

1. **Un sentinel mantiene tutto indietro compatibile.** `siteId = ''` è il sito primario. Ogni pagina, blocco, link, stile globale, e riga di dominio che esisteva prima di questa funzione porta `''` e renderizza esattamente come faceva. Un *secondo* sito web è semplicemente un insieme di righe con un `siteId` non-vuoto, e qualsiasi endpoint di contenuto chiamato senza `?siteId=` ritorna il sito primario — byte-per-byte la vecchia richiesta.
2. **La risoluzione è host-label-basata e converge.** Un subdominio `*.b1.church` instrada per la sua etichetta host direttamente; un dominio personalizzato viene riscritto alla sua etichetta `{sub}.b1.church` al bordo Caddy prima che B1App lo veda (con una ricerca DB di middleware che timbra un'intestazione `x-site` come fallback per qualsiasi `Host` personalizzato raw). Entrambi i rami atterrano sulla stessa rotta `[sdSlug]` e la stessa chiamata `churches/lookup`, quindi il rendering a valle è identico.
3. **Il bordo Caddy è senza stato su un'unica fonte di verità.** I domini personalizzati terminano su un proxy Caddy auto-gestito su EC2 che riscrive ogni dominio sul suo upstream `{sub}.b1.church`. Un salvataggio di dominio attiva un unico `CaddyHelper.updateCaddy()` best-effort, e Caddy legge anche la tabella `domains` direttamente (gli endpoint `authorize` e `hostmap` sotto). La tabella è autorevole — un Caddy non raggiungibile non può mai fallire un salvataggio.

## Risoluzione del sito

### Subdomini `*.b1.church`

`B1App/next.config.mjs` riscrive le richieste in arrivo per host. Una regola host con il modello `(?<subdomain>.*?)\..*` cattura l'**etichetta prima** dell'host e riscrive `/` e `/:path*` in `/{subdomain}` — il segmento App-Router `[sdSlug]`. Quindi `grace.b1.church/about` diventa `/grace/about`.

Dentro `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chiama `GET /membership/churches/lookup/?subDomain={sdSlug}`. La risposta di `ChurchController.getBySubDomain` ora ha due rami:

| Slug corrisponde | Risposta | Significato |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sito primario di quella chiesa |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sito secondario** — il controller ritorna a `sites`, risolve la chiesa proprietaria, ed echeggia lo slug interrogato più l'extra `siteId` |

Quel `siteId` extra è l'unica cosa che distingue una richiesta di sito secondario da una primaria; tutto il resto nella pipeline è condiviso.

### Domini personalizzati

Un dominio di proprietà della chiesa termina al **bordo Caddy** (dettagliato sotto), che riscrive l'intestazione `Host` al `{sub}.b1.church` del sito prima di proxy a B1App. Quindi nel percorso normale B1App riceve un host *interno* `*.b1.church` e lo risolve per etichetta host esattamente come un subdominio nativo — la ricerca DB del middleware non scatta mai. `src/middleware.ts` comunque esegue su ogni richiesta, ma con un lavoro sempre attivo e un fallback:

1. **Sempre** — **elimina qualsiasi intestazione `x-site` fornita dal client**. Quell'intestazione è input di riscrittura spoofable ed è solo mai trudata quando il middleware stesso la imposta; spogliarla è il vero lavoro del middleware dietro Caddy.
2. **Fallback, Host non-interno solo** — per un `Host` di dominio personalizzato raw che raggiunge B1App *senza* la riscrittura di Caddy, chiama `GET /membership/domains/public/lookup/{host}` e, se ritorna un `subDomain`, imposta `x-site: {subDomain}.b1.church`. Dietro Caddy questo ramo è inert perché l'`Host` è già `*.b1.church`.

Gli host interni — `localhost`, `b1.church`, e i suffissi `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — saltano interamente la ricerca (sono già risolti dalla riscrittura di etichetta host, o sono host di anteprima/distribuzione).

La ricerca stessa (`DomainRepo.loadByName`) lascia-unisce `domains → churches` e `domains → sites` e ritorna `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — il subdominio del sito secondario assegnato se il dominio punta a uno, altrimenti quello della chiesa. Corrisponde esattamente all'host per primo; se quell'host ha iniziato con `www.` e ha mancato, riprova **una volta** contro l'apex nudo.

Di ritorno in `next.config.mjs`, le regole di riscrittura `x-site` sono piazzate **davanti a** alle regole host generiche, così vincono. `x-site: grace.b1.church` → etichetta prima `grace` → `[sdSlug] = grace`, e da lì la risoluzione è identica al percorso del subdominio (stessa `churches/lookup`, stesso `siteId`).

:::info
L'intestazione `x-site` non è trudata dall'esterno. Il middleware incondizionatamente spoglia qualsiasi `x-site` in arrivo prima di opzionalmente impostare il suo proprio, e le regole di riscrittura solo mai vedono il valore impostato dal middleware — un client non può forzare se stesso sul contenuto di un'altra chiesa inviando un'intestazione.
:::

Due dettagli operativi sul middleware:

- **Cache.** Il risultato di ogni host (un hit *o* una mancanza confermata — mai un errore di rete) è memorizzato nella cache per **10 minuti** in una `Map` in-memoria, per isolate senza server.
- **Matcher.** Il matcher deliberatamente ri-include `/sitemap.xml`, `/robots.txt`, e `/manifest.webmanifest`. Il suo primo modello esclude i percorsi punteggiati, che altrimenti li perderebbero; sono aggiunti di nuovo così i file per-chiesa SEO/PWA di un dominio personalizzato anche ricevono l'intestazione `x-site`.

### Threading `siteId`

`ConfigHelper` memorizza il `siteId` risolto sulla sua per-richiesta `ConfigurationInterface` (memoizzato con React `cache()`) e aggiunge `?siteId=` alle chiamate di contenuto che fa e che i componenti di pagina fanno — **condizionatamente**: un `siteId` vuoto (un subdominio di chiesa primaria) omette completamente il parametro. Gli endpoint con thread sono l'albero di pagina (`/content/pages/:id/tree`), la lista di pagina pubblica usata dalla sitemap (`/content/pages/public/:id`), stili globali (`/content/globalStyles/church/:id`), link nav (`/content/links/church/:id`), e il blocco di piè di pagina standalone (`/content/blocks/public/footer/:id`). Nel percorso di render normale il piè di pagina arriva dentro l'albero di pagina (sezioni contrassegnate `zone: "siteFooter"`), già recuperato con `siteId`, quindi non c'è gap di piè di pagina non-scoped.

Il portale dei membri (B1App `mobile`) intenzionalmente rimane fuori: `loadChurchAppearance.ts` risolve la chiesa tramite `churches/lookup` ma legge le impostazioni per-chiesa `/settings/public/{id}` e mai fa thread a `siteId` — il portale è chiesa-wide nella v1 (vedi sotto).

## Siti web multipli per chiesa

### Modello di dati

La nuova tabella `membership.sites` è deliberatamente minuscola:

| Colonna | Tipo | Note |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Chiesa proprietaria |
| `name` | `varchar(255)` | Nome visualizzazione (ad es. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Indice univoco** — namespace globale (sotto) |

Lo scoping del sito è quindi una singola colonna aggiunta a nullable-free alle tabelle di contenuto e dominio:

| Tabella (modulo) | Colonna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Il dominio serve il sito primario |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sito primario — e su **`blocks`**, `''` inoltre significa *condiviso tra tutti i siti* |

Due migrazioni aggiungono tutto questo (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Perché la colonna defautizza a `''`, ogni riga esistente mantiene il comportamento di oggi senza backfill.

**Namespace subdominio globale.** `sites.subDomain` condivide *uno* namespace con `churches.subDomain` — un subdominio del sito non può mai scontrare con un subdominio di chiesa o un altro subdominio di sito. Questo è applicato su **entrambi** i percorsi di salvataggio: `SiteController.save` rifiuta uno slug che colpisce `churches` o `sites`, e `ChurchController.validateSave` fa lo stesso al contrario. Un indice univoco su `sites.subDomain` lo supporta al livello del database.

**Unicità di pagine** allargata da `(churchId, url)` a `(churchId, siteId, url)`, così due siti di una chiesa possono ciascuno possiede il proprio `/about`.

### Contenuto per-sito, con fallback

Ogni endpoint di contenuto scoped dal sito **list/tree** accetta un opzionale `?siteId=` (assente ⇒ `''` = primario): albero/lista/pubblico di pagine, lista/per-tipo/piè di pagina di blocchi, link (anonimo / filtrato / tutto), e stili globali. Sezioni e elementi *non* sono scoped direttamente — ereditano attraverso la loro pagina parente o blocco.

Due catene di risoluzione fanno il lavoro interessante:

- **Stili globali — `site → primario → predefinito`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` ritorna la riga del sito stesso; se un sito secondario non ne ha nessuno, ritorna la riga **primaria (`''`) come-is** (mantenendo il `id`/`siteId` del primario, che il client usa per copy-on-write); se non c'è nemmeno un primario, `GlobalStyleController` ritorna una palette/font hard-coded predefinita.
- **Blocco piè di pagina — site-specific vince, shared ritorna indietro.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` ritorna il condiviso (`''`) *e* righe site-specific; il resolver sceglie il piè di pagina del sito se presente, altrimenti quello condiviso. La stessa logica esegue sia in `TreeHelper.insertBlocks` (albero di pagina) che nell'endpoint standalone `/content/blocks/public/footer/:churchId`.

### Cascata di eliminazione del sito

`SiteController.delete` (controllato su `Permissions.settings.edit`) abbatte un sito secondario in tre passaggi:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` cascata tutto il contenuto che il sito possiede: le sue **pagine** → le loro sezioni, elementi, `pageHistory`, e `posts`; i suoi **blocchi** → le loro sezioni, elementi, e `pageHistory`; i suoi **link** e **stili globali**. Una protezione rifiuta di eseguire per `''` — il sentinel primario/condiviso non è mai cascato.
2. `DomainRepo.clearSiteId` **riassegna** i domini del sito indietro al primario (`siteId → ''`) piuttosto che eliminarli, così un dominio personalizzato sopravvive a un'eliminazione di sito.
3. La riga `sites` è eliminata e le rotte Caddy sono ri-sincronizzate (best-effort).

### Superficie B1Admin

| Capacità | Dove | Meccanismo |
|-----------|-------|-----------|
| Selettore sito | `useSiteSelection` + `SiteSwitcher` (vuoto = "Sito principale") | Legge un parametro URL `?site=` e lo fa thread come `?siteId=` in ContentApi chiama. Presente sulle tre aree Site **list** — **Pagine**, **Blocchi**, **Aspetto** — ma *non* gli editor di pagina/blocco, che portano `siteId` sul record |
| Creare/eliminare siti | `SitesDialog`, aperto dall'entry "Manage websites…" del selettore | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Controllato su `Permissions.settings.edit` (lato server; `Permissions.membershipApi.settings.edit` in B1Admin). **Solo creare/eliminare — non c'è UI di ridenominazione nella v1** |
| Assegnazione sito per-dominio | `DomainSettingsEdit` sotto Impostazioni→Domini | Un dropdown per-riga del sito posta `siteId` per dominio a `/membership/domains`. La colonna si nasconde se l'API non ritorna siti (backend più vecchio) |
| Stili copy-on-write | `StylesManager.prepareForSave` | Quando la riga stile globale caricata's `siteId` non corrisponde al sito selezionato (cioè l'API ha ritornato il primario ereditato come fallback), elide il `id` del primario e timbra il `siteId` attuale, forzando un **insert** di una nuova riga site-specific invece di sovrascrivere il primario. Lo stesso fork-on-mismatch si applica al blocco piè di pagina del sito |

:::info
**Cosa rimane chiesa-wide nella v1 (una scelta di scoping deliberata, non un limite di modello di dati):** il **blog** (`BlogPage` non ha selettore e carica `/posts` con nessun `siteId`), i **widget di sito** (banner di avviso + launcher), i **reindirizzamenti**, il **logo / GA4 / impostazioni della chiesa**, e il **portale dei membri** (B1App mobile). Notare questo è *non* "tutto dell'Aspetto" — gli stili globali di un sito secondario (palette, font, tipografia, spaziatura, nav, CSS personalizzato) **sono** per-sito tramite il percorso copy-on-write sopra; solo i sotto-pannelli banner/launcher/redirects/logo della pagina Aspetto rimangono chiesa-wide.
:::

## Domini personalizzati: bordo Caddy (piano config statico)

:::info
**Direzione rivista 2026-07-02.** Un precedente piano di spostare l'hosting di dominio personalizzato su domini gestiti da Vercel è stato **cancellato**, e tutto il codice di registrazione del dominio Vercel (`VercelHelper`, le sue variabili di ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, parametri SSM, e voci di salute) è stato rimosso dall'Api. Il proxy Caddy auto-gestito su EC2 **rimane** come bordo permanente di dominio personalizzato. L'unico lavoro rimanente è interno: scambiare la configurazione `admin-API` *runtime* di Caddy per una configurazione *statica* che sopravviva ai riavvii.
:::

### Il bordo

Ogni dominio di chiesa personalizzato punta DNS a una scatola EC2 — `3.23.251.61`, anche raggiungibile come `proxy.b1.church`. La schermata Settings→Domains di B1Admin istruisce le chiese ad aggiungere un apex `A → 3.23.251.61` o un `CNAME → proxy.b1.church`. Caddy termina TLS con un cert Let's Encrypt per-dominio, riscrive l'intestazione `Host` al upstream `{sub}.b1.church` del dominio, e reverse-proxy a B1App — che poi lo instrada per etichetta host come qualsiasi subdominio nativo (vedi [Domini personalizzati](#domini-personalizzati) sopra).

Il mapping upstream proviene da `DomainRepo.loadPairs`, il cui dial **COALESCE il subdominio del sito assegnato** così un dominio proxy al sito *secondario* corretto, ritornando indietro al primario della chiesa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Le righe `www.*` sono escluse dalla mappa; Caddy serve `www.{host}` tramite un reindirizzamento `302` all'apex.

### Due endpoint anonimi alimentano il bordo

`DomainController` espone due endpoint non autenticati, read-only che la scatola consuma direttamente — anonimi per necessità, poiché il bordo li chiama prima che qualsiasi contesto di chiesa esista:

| Endpoint | Ritorna | Ruolo |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` se il dominio — o, per una mancanza `www.`, il suo apex nudo — esiste in `domains`; `404` altrimenti (incluso un `domain` vuoto) | **TLS su richiesta `ask`** di Caddy: il controllo dell'abuso che decide se emettere un cert per un SNI in arrivo |
| `GET /membership/domains/hostmap` | `text/plain`, una riga ordinata `{domain} {sub}.b1.church` per dominio rutabile | Il file mappa host→upstream che la scatola aggiorna su un timer |

`authorize` riusa `DomainRepo.loadByName` (host esatto, poi un singolo retry `www.`→apex); `hostmap` riusa `loadPairs` — così è site-aware e `www.*`-esclusa, identica alle rotte del proxy — e semplicemente spoglia il suffisso `:443`.

### Salvataggio/eliminazione dominio — un push best-effort singolo

`DomainController.save` scrive le righe `domains` e poi fa una singola chiamata `CaddyHelper.updateCaddy()` **best-effort**, avvolta in un `try/catch` che registra (`console.error`) e inghiotte; `delete` fa lo stesso (che ha anche risolto un bug precedente stale-route-on-delete), così fa l'eliminazione del sito secondario (`SiteController.delete`). `updateCaddy` è lui stesso limitato da un timeout Axios di **10s**, così un Caddy non raggiungibile o fermo non può mai `500` un salvataggio di dominio — la tabella `domains` è la fonte di verità.

### Stato attuale — config statico, nessuno stato runtime

La scatola (EC2 Windows dietro l'Elastic IP permanente) esegue Caddy da un **Caddyfile statico**: TLS su richiesta il cui `ask` punta a `/membership/domains/authorize`, più un file mappa host→upstream aggiornato ogni 5 minuti da `/membership/domains/hostmap` da un compito programmato che finisce in un `caddy reload` elegante. La config sopravvive ai riavvii con zero stato runtime — nessun ballo di ri-priming — e un SNI sconosciuto è **TLS-rifiutato** (nessun cert è coniato per un host che `authorize` rifiuta), mentre un host autorizzato-ma-non-ancora-mappato (un dominio brand-nuovo dentro la finestra di sincronizzazione) ottiene un 404 pulito. I nuovi domini diventano rutabili entro ~5 minuti da un salvataggio; i loro certificati sono coniati al primo colpo. Build/setup, operazioni, e gotcha field-testati: [Proxy di dominio personalizzato Caddy](../deployment/caddy-proxy).

### Push runtime legacy — percorso di rollback, in sospeso di eliminazione

`CaddyHelper` (modulo di appartenenza) può ancora guidare Caddy attraverso il suo **admin API** a `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op quando non impostato; affiorato sotto il gruppo Integrazioni di `ServerHealthController`): `updateCaddy()` PATCH un array di rotte completo, e `initializeCaddy()` + gli endpoint `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ricostruiscono un server configurato-runtime da zero. Il config di quel modo ha vissuto solo in memoria di Caddy — l'amnesia del riavvio che questa architettura ha sostituito. Il macchinario rimane solo come il percorso di rollback ed è programmato per eliminazione una volta che la scatola statica è stata stabile; il push `updateCaddy()` best-effort su dominio salva/elimina è un no-op inoffensivo contro la scatola statica (il suo admin API è solo localhost).

## Pagine correlate

- [Proxy di dominio personalizzato Caddy](../deployment/caddy-proxy) — la scatola di bordo stessa: setup di scatola fresca, servizio WinSW, compito di sincronizzazione di mappa, e gotcha operativi
- [Website Builder](./website-builder) — l'albero di pagina/sezione/elemento, renderer, blog, SEO, e generazione AI (quello che renderizza una volta che una richiesta si è risolta in una chiesa/sito)
- [Endpoint di contenuto](../api/endpoints/content) — la superficie REST per pagine, blocchi, link, e stili globali, tutto ora `?siteId=`-consapevole
- [B1App](../web-apps/b1-app) — l'app Next.js che ospita il middleware e il routing `[sdSlug]`
- [Distribuzione dell'app web](../deployment/web-apps) — come B1App è distribuito a Vercel
