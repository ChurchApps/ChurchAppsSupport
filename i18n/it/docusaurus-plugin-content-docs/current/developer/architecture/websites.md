---
title: "Routing del sito web e multi-sito"
---

# Routing del sito web e multi-sito

<div class="article-intro">

Una singola chiesa può ora servire più di un sito web distinto, e ognuno può vivere su un sottodominio `*.b1.church` o su un dominio completamente personalizzato di proprietà della chiesa. Questa pagina mappa lo strato di routing che si trova *sotto* il builder: come una richiesta in arrivo si risolve in una chiesa **e** in un sito specifico, il modello dati multi-sito (il sentinel `siteId` che mantiene invariato il rendering di ogni sito preesistente), e il bordo per i domini personalizzati — un proxy Caddy autogestito su EC2 che termina il TLS e riscrive ogni dominio della chiesa sul suo upstream `*.b1.church`. Per ciò che effettivamente si renderizza una volta risolta una richiesta — l'albero pagina/sezione/elemento — vedi [Website Builder](./website-builder).

</div>

## Panoramica

```
   grace.b1.church              www.gracechurch.org  (dominio personalizzato)
   (sottodominio b1.church)                │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Bordo Caddy — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • termina il TLS (certificato LE per dominio) │
          │             │  • riscrive Host → {sub}.b1.church        │
          │             │  • reverse-proxy verso B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • sempre: elimina qualsiasi x-site fornito dal client       │
   │  • Host *.b1.church interno ⇒ la ricerca domini resta inerte │
   │  • Host personalizzato grezzo (bypassa Caddy) ⇒ ricerca → imposta x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → prima etichetta dell'host → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   passa ?siteId= a ogni chiamata di contenuto:   │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  salvataggio/eliminazione dominio (B1Admin Impostazioni→Domini → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (protetto, non-fatale, timeout 10s)
  Caddy legge esso stesso la tabella dei domini tramite due endpoint anonimi:
        GET /membership/domains/authorize  — `ask` TLS su richiesta (200 conosciuto / 404 sconosciuto)
        GET /membership/domains/hostmap    — mappa host→{sub}.b1.church (aggiornamento ogni 5 min)
```

Tre regole valgono in questo strato:

1. **Un sentinel mantiene tutto retrocompatibile.** `siteId = ''` è il sito primario. Ogni pagina, blocco, link, stile globale, e riga di dominio esistente prima di questa funzionalità porta `''` e si renderizza esattamente come prima. Un *secondo* sito web è semplicemente un insieme di righe con un `siteId` non vuoto, e qualsiasi endpoint di contenuto chiamato senza `?siteId=` restituisce il sito primario — byte per byte la vecchia richiesta.
2. **La risoluzione è basata sull'etichetta host e converge.** Un sottodominio `*.b1.church` instrada direttamente in base alla sua etichetta host; un dominio personalizzato viene riscritto sulla sua etichetta `{sub}.b1.church` al bordo Caddy prima che B1App lo veda (con una ricerca DB nel middleware che imposta un header `x-site` come fallback per qualsiasi `Host` personalizzato grezzo). Entrambi i rami atterrano sulla stessa rotta `[sdSlug]` e la stessa chiamata `churches/lookup`, quindi il rendering a valle è identico.
3. **Il bordo Caddy è senza stato su un'unica fonte di verità.** I domini personalizzati terminano su un proxy Caddy autogestito su EC2 che riscrive ogni dominio sul suo upstream `{sub}.b1.church`. Il salvataggio di un dominio attiva un unico `CaddyHelper.updateCaddy()` best-effort, e Caddy legge anche direttamente la tabella `domains` (gli endpoint `authorize` e `hostmap` sotto). La tabella è autorevole — un Caddy irraggiungibile non può mai far fallire un salvataggio.

## Risoluzione del sito

### Sottodomini `*.b1.church`

`B1App/next.config.mjs` riscrive le richieste in arrivo in base all'host. Una regola host con il pattern `(?<subdomain>.*?)\..*` cattura la **prima etichetta** dell'host e riscrive `/` e `/:path*` in `/{subdomain}` — il segmento App-Router `[sdSlug]`. Così `grace.b1.church/about` diventa `/grace/about`.

Dentro `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) chiama `GET /membership/churches/lookup/?subDomain={sdSlug}`. La risposta di `ChurchController.getBySubDomain` ora ha due rami:

| Lo slug corrisponde a | Risposta | Significato |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sito primario di quella chiesa |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sito secondario** — il controller ripiega su `sites`, risolve la chiesa proprietaria, e restituisce lo slug interrogato più l'extra `siteId` |

Quel `siteId` extra è l'unica cosa che distingue una richiesta di sito secondario da una primaria; tutto il resto nella pipeline è condiviso.

### Domini personalizzati

Un dominio di proprietà della chiesa termina al **bordo Caddy** (descritto sotto), che riscrive l'header `Host` sul `{sub}.b1.church` del sito prima del proxy verso B1App. Quindi nel percorso normale B1App riceve un host *interno* `*.b1.church` e lo risolve per etichetta host esattamente come un sottodominio nativo — la ricerca DB del middleware non scatta mai. `src/middleware.ts` gira comunque su ogni richiesta, ma con un compito sempre attivo e un fallback:

1. **Sempre** — **elimina qualsiasi header `x-site` fornito dal client**. Quell'header è un input di riscrittura falsificabile ed è affidabile solo quando è il middleware stesso a impostarlo; rimuoverlo è il vero compito del middleware dietro Caddy.
2. **Fallback, solo per `Host` non interno** — per un `Host` di dominio personalizzato grezzo che raggiunge B1App *senza* la riscrittura di Caddy, chiama `GET /membership/domains/public/lookup/{host}` e, se restituisce un `subDomain`, imposta `x-site: {subDomain}.b1.church`. Dietro Caddy questo ramo è inerte perché l'`Host` è già `*.b1.church`.

Gli host interni — `localhost`, `b1.church`, e i suffissi `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — saltano completamente la ricerca (sono già risolti dalla riscrittura per etichetta host, oppure sono host di anteprima/distribuzione).

La ricerca stessa (`DomainRepo.loadByName`) esegue un left join `domains → churches` e `domains → sites` e restituisce `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — il sottodominio del sito secondario assegnato se il dominio punta a uno, altrimenti quello della chiesa. Corrisponde prima l'host esatto; se quell'host iniziava con `www.` e la corrispondenza è fallita, riprova **una volta** contro l'apex nudo.

Tornando a `next.config.mjs`, le regole di riscrittura `x-site` sono posizionate **prima** delle regole host generiche, così vincono. `x-site: grace.b1.church` → prima etichetta `grace` → `[sdSlug] = grace`, e da lì la risoluzione è identica al percorso del sottodominio (stessa `churches/lookup`, stesso `siteId`).

:::info
L'header `x-site` non è affidabile dall'esterno. Il middleware rimuove incondizionatamente qualsiasi `x-site` in arrivo prima di eventualmente impostare il proprio, e le regole di riscrittura vedono sempre e solo il valore impostato dal middleware — un client non può forzarsi sul contenuto di un'altra chiesa inviando un header.
:::

Due dettagli operativi sul middleware:

- **Cache.** Il risultato di ogni host (un successo *o* un fallimento confermato — mai un errore di rete) viene messo in cache per **10 minuti** in una `Map` in memoria, per ogni isolato serverless.
- **Matcher.** Il matcher reintroduce deliberatamente `/sitemap.xml`, `/robots.txt`, e `/manifest.webmanifest`. Il suo primo pattern esclude i percorsi con punto, che altrimenti li scarterebbero; vengono riaggiunti così anche i file SEO/PWA per chiesa di un dominio personalizzato ricevono l'header `x-site`.

### Passaggio del `siteId`

`ConfigHelper` memorizza il `siteId` risolto sul suo `ConfigurationInterface` per richiesta (memoizzato con `cache()` di React) e aggiunge `?siteId=` alle chiamate di contenuto che effettua lui stesso e i componenti pagina — **condizionatamente**: un `siteId` vuoto (un sottodominio di chiesa primaria) omette del tutto il parametro. Gli endpoint interessati sono l'albero della pagina (`/content/pages/:id/tree`), l'elenco pagine pubbliche usato dalla sitemap (`/content/pages/public/:id`), gli stili globali (`/content/globalStyles/church/:id`), i link di navigazione (`/content/links/church/:id`), e il blocco piè di pagina autonomo (`/content/blocks/public/footer/:id`). Nel percorso di rendering normale il piè di pagina arriva dentro l'albero pagina (sezioni contrassegnate `zone: "siteFooter"`), già recuperato con `siteId`, quindi non c'è alcuna lacuna di piè di pagina non scoped.

Il portale membri (B1App `mobile`) resta intenzionalmente fuori da questo: `loadChurchAppearance.ts` risolve la chiesa tramite `churches/lookup` ma legge le impostazioni per chiesa `/settings/public/{id}` e non passa mai `siteId` — il portale è a livello di chiesa nella v1 (vedi sotto).

## Più siti web per chiesa

### Modello dati

La nuova tabella `membership.sites` è deliberatamente minuscola:

| Colonna | Tipo | Note |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Chiesa proprietaria |
| `name` | `varchar(255)` | Nome visualizzato (ad es. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Indice univoco** — namespace globale (sotto) |

Lo scoping del sito è quindi una singola colonna non-null aggiunta alle tabelle di contenuto e dominio:

| Tabella (modulo) | Colonna | Cosa significa `''` |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Il dominio serve il sito primario |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sito primario — e su **`blocks`**, `''` significa inoltre *condiviso tra tutti i siti* |

Due migrazioni aggiungono tutto questo (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Poiché la colonna ha come default `''`, ogni riga esistente mantiene il comportamento odierno senza alcun backfill.

**Namespace globale dei sottodomini.** `sites.subDomain` condivide *un unico* namespace con `churches.subDomain` — un sottodominio di sito non può mai collidere con un sottodominio di chiesa o con il sottodominio di un altro sito. Questo è applicato su **entrambi** i percorsi di salvataggio: `SiteController.save` rifiuta uno slug che colpisce sia `churches` sia `sites`, e `ChurchController.validateSave` fa lo stesso al contrario. Un indice univoco su `sites.subDomain` lo supporta a livello di database.

**L'unicità delle pagine** è stata ampliata da `(churchId, url)` a `(churchId, siteId, url)`, così due siti di una chiesa possono ciascuno possedere il proprio `/about`.

### Contenuto per sito, con fallback

Ogni endpoint di contenuto **list/tree** scoped per sito accetta un `?siteId=` opzionale (assente ⇒ `''` = primario): albero/elenco/pubblico delle pagine, elenco/per-tipo/piè di pagina dei blocchi, link (anonimo / filtrato / tutti), e stili globali. Le sezioni e gli elementi *non* sono scoped direttamente — ereditano attraverso la loro pagina o blocco genitore.

Due catene di risoluzione fanno il lavoro interessante:

- **Stili globali — `sito → primario → predefinito`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` restituisce la riga del sito stesso; se un sito secondario non ne ha nessuna, restituisce la riga **primaria (`''`) così com'è** (mantenendo l'`id`/`siteId` del primario, che il client usa per il copy-on-write); se non esiste nemmeno un primario, `GlobalStyleController` restituisce una palette/font predefiniti hard-coded.
- **Blocco piè di pagina — vince quello specifico del sito, ricade su quello condiviso.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` restituisce sia le righe condivise (`''`) *sia* quelle specifiche del sito; il risolutore sceglie il piè di pagina del sito se presente, altrimenti quello condiviso. La stessa logica gira sia in `TreeHelper.insertBlocks` (albero pagina) sia nell'endpoint autonomo `/content/blocks/public/footer/:churchId`.

### Cascata di eliminazione del sito

`SiteController.delete` (protetto sul permesso membership Settings→Edit) smantella un sito secondario in tre passaggi:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` fa una cascata su tutto il contenuto posseduto dal sito: le sue **pagine** → le loro sezioni, elementi, `pageHistory`, e `posts`; i suoi **blocchi** → le loro sezioni, elementi, e `pageHistory`; i suoi **link** e **stili globali**. Un guard rifiuta di eseguire per `''` — il sentinel primario/condiviso non viene mai messo in cascata.
2. `DomainRepo.clearSiteId` **riassegna** i domini del sito al primario (`siteId → ''`) invece di eliminarli, così un dominio personalizzato sopravvive all'eliminazione di un sito.
3. La riga `sites` viene eliminata e le rotte Caddy vengono ri-sincronizzate (best-effort).

### Superficie B1Admin

| Funzionalità | Dove | Meccanismo |
|-----------|-------|-----------|
| Selettore di sito | `useSiteSelection` + `SiteSwitcher` (vuoto = "Sito principale") | Legge un parametro URL `?site=` e lo passa come `?siteId=` alle chiamate ContentApi. Presente sulle tre aree Site **list** — **Pagine**, **Blocchi**, **Aspetto** — ma *non* negli editor pagina/blocco, che portano `siteId` sul record |
| Creazione/eliminazione siti | `SitesDialog`, aperta dalla voce "Gestisci siti web…" del selettore | `POST /membership/sites` / `DELETE /membership/sites/:id` (nome + subDomain). Protetto sul permesso membership Settings→Edit (`Permissions.settings.edit` lato server; `Permissions.membershipApi.settings.edit` in B1Admin). **Solo creazione/eliminazione — non c'è interfaccia di rinomina nella v1** |
| Assegnazione sito per dominio | `DomainSettingsEdit` sotto Impostazioni→Domini | Un menu a tendina del sito per riga invia `siteId` per dominio a `/membership/domains`. La colonna si nasconde se l'API non restituisce siti (backend più vecchio) |
| Stili copy-on-write | `StylesManager.prepareForSave` | Quando il `siteId` della riga stile globale caricata non corrisponde al sito selezionato (cioè l'API ha restituito il primario ereditato come fallback), scarta l'`id` del primario e imposta il `siteId` attuale, forzando un **inserimento** di una nuova riga specifica del sito invece di sovrascrivere il primario. La stessa logica fork-on-mismatch si applica al piè di pagina del sito |

:::info
**Cosa rimane a livello di chiesa nella v1 (una scelta di scoping deliberata, non un limite del modello dati):** il **blog** (`BlogPage` non ha un selettore e carica `/posts` senza `siteId`), i **widget di sito** (banner annunci + launcher), i **redirect**, il **logo / GA4 / impostazioni della chiesa**, e il **portale membri** (B1App mobile). Nota che questo *non* è "tutto l'Aspetto" — gli stili globali di un sito secondario (palette, font, tipografia, spaziatura, navigazione, CSS personalizzato) **sono** per sito tramite il percorso copy-on-write sopra; solo i sotto-pannelli banner/launcher/redirect/logo della pagina Aspetto restano a livello di chiesa.
:::

## Domini personalizzati: bordo Caddy (piano di configurazione statica)

:::info
**Direzione rivista il 2026-07-02.** Un piano precedente di spostare l'hosting dei domini personalizzati su domini gestiti da Vercel è stato **annullato**, e tutto il codice di registrazione domini Vercel (`VercelHelper`, le sue variabili d'ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, i parametri SSM, e le voci di salute) è stato rimosso dall'Api. Il proxy Caddy autogestito su EC2 **rimane** come bordo permanente per i domini personalizzati. L'unico lavoro rimanente è interno: sostituire la configurazione dell'API admin *a runtime* di Caddy con una configurazione *statica* che sopravviva ai riavvii.
:::

### Il bordo

Ogni dominio di chiesa personalizzato punta il DNS a un'unica macchina EC2 — `3.23.251.61`, raggiungibile anche come `proxy.b1.church`. La schermata Impostazioni→Domini di B1Admin istruisce le chiese ad aggiungere un apex `A → 3.23.251.61` o un `CNAME → proxy.b1.church`. Caddy termina il TLS con un certificato Let's Encrypt per dominio, riscrive l'header `Host` sull'upstream `{sub}.b1.church` del dominio, e fa reverse-proxy verso B1App — che poi lo instrada per etichetta host come qualsiasi sottodominio nativo (vedi [Domini personalizzati](#domini-personalizzati) sopra).

La mappatura upstream proviene da `DomainRepo.loadPairs`, il cui dial **applica COALESCE al sottodominio del sito assegnato** così un dominio fa proxy al *secondario* corretto, ricadendo sul primario della chiesa:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Le righe `www.*` sono escluse dalla mappa; Caddy serve `www.{host}` tramite un redirect `302` all'apex.

### Due endpoint anonimi alimentano il bordo

`DomainController` espone due endpoint non autenticati e in sola lettura che la macchina consuma direttamente — anonimi per necessità, poiché il bordo li interroga prima che esista qualsiasi contesto di chiesa:

| Endpoint | Restituisce | Ruolo |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` se il dominio — o, per un mancato `www.`, il suo apex nudo — esiste in `domains`; `404` altrimenti (incluso un `domain` vuoto) | Il gate **`ask` TLS su richiesta** di Caddy: il controllo anti-abuso che decide se emettere un certificato per un SNI in arrivo |
| `GET /membership/domains/hostmap` | `text/plain`, una riga ordinata `{domain} {sub}.b1.church` per dominio instradabile | Il file di mappatura host→upstream che la macchina aggiorna su un timer |

`authorize` riutilizza `DomainRepo.loadByName` (host esatto, poi un unico retry `www.`→apex); `hostmap` riutilizza `loadPairs` — quindi è consapevole del sito ed esclude `www.*`, identico alle rotte del proxy — e semplicemente rimuove il suffisso `:443`.

### Salvataggio/eliminazione dominio — un unico invio best-effort

`DomainController.save` scrive le righe `domains` e poi effettua una singola chiamata **best-effort** `CaddyHelper.updateCaddy()`, avvolta in un `try/catch` che registra (`console.error`) e ignora l'errore; `delete` fa lo stesso (il che ha anche corretto un precedente bug di rotta obsoleta all'eliminazione), come anche l'eliminazione di un sito secondario (`SiteController.delete`). `updateCaddy` è a sua volta limitato da un timeout Axios di **10s**, così un Caddy irraggiungibile o fermo non può mai restituire `500` su un salvataggio di dominio — la tabella `domains` è la fonte di verità.

### Stato attuale — configurazione statica, nessuno stato a runtime

La macchina (EC2 Windows dietro l'Elastic IP permanente) esegue Caddy da un **Caddyfile statico**: TLS su richiesta il cui `ask` punta a `/membership/domains/authorize`, più un file di mappatura host→upstream aggiornato ogni 5 minuti da `/membership/domains/hostmap` tramite un'attività pianificata che termina con un `caddy reload` elegante. La configurazione sopravvive ai riavvii con zero stato a runtime — nessuna danza di ri-inizializzazione — e un SNI sconosciuto viene **rifiutato a livello TLS** (nessun certificato viene coniato per un host che `authorize` rifiuta), mentre un host autorizzato-ma-non-ancora-mappato (un dominio nuovissimo dentro la finestra di sincronizzazione) riceve un pulito 404. I nuovi domini diventano instradabili entro ~5 minuti da un salvataggio; i loro certificati vengono coniati al primo accesso. Build/setup, operazioni, e trabocchetti verificati sul campo: [Proxy Caddy per domini personalizzati](../deployment/caddy-proxy).

### Push runtime legacy — percorso di rollback, in attesa di eliminazione

`CaddyHelper` (modulo membership) può ancora guidare Caddy tramite la sua **API admin** a `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op quando non impostato; mostrato sotto il gruppo Integrazioni di `ServerHealthController`): `updateCaddy()` esegue PATCH su un array completo di rotte, e `initializeCaddy()` + gli endpoint `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` ricostruiscono da zero un server configurato a runtime. La configurazione di quella modalità viveva solo nella memoria di Caddy — l'amnesia da riavvio che questa architettura ha sostituito. Il macchinario rimane solo come percorso di rollback ed è programmato per l'eliminazione una volta che la macchina statica sarà stata stabile; l'invio best-effort di `updateCaddy()` su salvataggio/eliminazione dominio è un no-op innocuo contro la macchina statica (la sua API admin è solo locale).

## Pagine correlate

- [Proxy Caddy per domini personalizzati](../deployment/caddy-proxy) — la macchina di bordo stessa: setup da zero, servizio WinSW, attività di sincronizzazione mappa, e trabocchetti operativi
- [Website Builder](./website-builder) — l'albero pagina/sezione/elemento, i renderer, il blog, la SEO, e la generazione AI (ciò che si renderizza una volta che una richiesta si è risolta in una chiesa/sito)
- [Endpoint di content](../api/endpoints/content) — la superficie REST per pagine, blocchi, link, e stili globali, tutta ora consapevole di `?siteId=`
- [B1App](../web-apps/b1-app) — l'app Next.js che ospita il middleware e il routing `[sdSlug]`
- [Distribuzione delle app web](../deployment/web-apps) — come B1App viene distribuita su Vercel
