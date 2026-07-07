---
title: "Superficie di integrazione e estensione"
---

# Superficie di integrazione e estensione

<div class="article-intro">

Tutto ciò in cui una terza parte può inserirsi passa attraverso un'API e un modello di autorizzazione. Questa pagina è la mappa: nomina ogni superficie di integrazione, mostra come si collegano, e si collega al riferimento dettagliato per ognuna. Se stai costruendo contro B1, inizia qui per scegliere la porta giusta, poi segui il collegamento alla pagina che la documenta in profondità.

</div>

## Le superfici a colpo d'occhio

Ci sono sei modi dentro e fuori, e condividono tutti lo stesso strato di auth:

- **[API REST](../api/api-keys)** — l'intera superficie del prodotto, richiamabile con un token bearer da qualsiasi linguaggio.
- **[Chiavi API](../api/api-keys)** — la credenziale più semplice: un token `cak_…` legato a una sola persona in una chiesa.
- **[OAuth 2.0 e app connesse](../api/connected-apps)** — consenso per chiesa per app multi-tenant; emette lo stesso JWT che un utente ottiene.
- **[Webhook](../api/webhooks)** — eventi firmati, durevolmente consegnati in uscita.
- **[Server MCP](../api/mcp)** — un wrapper rivolto all'AI sulla API REST a `/mcp`.
- **[Provider di contenuti](../freeplay-content-provider)** — il percorso in entrata per le librerie di media esterne in FreePlay e le app B1.

Tutto tranne i provider di contenuti è servito da una singola API monolitica (il repository [Api](https://github.com/ChurchApps/Api)) i cui moduli si montano sotto percorsi base stabili — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, e `/mcp`.

## Come si incastra insieme

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  App di terze parti  │   Bearer cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ chiave ─┐                │  │
   │  · CLI / script      │                          │  │   OAuth JWT ┴▶ Principal        │  │
   │  · Client AI (MCP)   │ ─── POST /mcp ──────────▶ │  │   scope filtra → permessi[]  │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Moduli API: /membership /giving     │
             │        JSON POST firmato              │  /attendance /content /messaging …    │
             │   (persona / donazione / gruppo / …)  │                   │                    │
             └──────────── webhook ◀─────────────────┼─ shared/webhook/WebhookDispatcher    │
                     (durevole, HMAC-SHA256 firmato) └───────────────────────────────────────┘

   Fonti di contenuto esterne (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 è il client OAuth qui ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / app B1     (percorso contenuto in entrata)
```

Tre frecce dicono tutta la storia: una terza parte **chiama dentro** con un token bearer (chiave API o OAuth JWT, incluso tramite `/mcp`); l'API **chiama di nuovo fuori** attraverso webhook firmati; e i provider di contenuti sono il percorso **contenuto-in-entrata** dove B1 stesso è il client OAuth che tira i media da una fonte esterna.

## Il modello di autenticazione condiviso

Ogni credenziale — un JWT di accesso utente, un token di accesso OAuth, o una chiave API — si risolve nello **stesso `Principal`** e viene controllata nello stesso modo. Non c'è un percorso di "auth di integrazione" separato; una credenziale con scope è semplicemente indistinguibile da un utente con privilegi inferiori.

### Struttura JWT

I token di accesso B1 sono JWT HS256 coniati in `Api/src/modules/membership/auth/AuthenticatedUser.ts`. L'insieme di claim:

| Claim | Significato |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La persona dietro il token |
| `churchId` | L'unica chiesa in cui questo token agisce — l'ancora per tutti gli scoping dei dati |
| `personId` | Il record della persona dentro quella chiesa |
| `permissions` | Array piatto di stringhe di permesso RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Appartenenza al gruppo / leadership, per controlli scoped del gruppo |
| `membershipStatus` | Guest vs. membro, per gating self-service |

Un token di accesso OAuth ha la stessa forma identica di un JWT di accesso — l'unica differenza è che il suo array `permissions` è stato **filtrato attraverso gli scope assegnati prima di firmare** (`getCombinedApiJwt(...)`).

### Scoping per chiesa

`churchId` è un claim di token, non un parametro di richiesta, così una credenziale non può mai raggiungere oltre le chiese. Ogni query di repository filtra su `churchId` del chiamante; una chiave API o un token OAuth è vincolato a esattamente una chiesa al tempo di coniazione.

### Permessi basati su ruolo al confine

I controller bloccano le azioni con `au.checkAccess(contentType, action)` contro l'array `permissions` del token. Gli scope sono un **filtro, mai una concessione** (`Api/src/shared/auth/Scopes.ts`): il `SCOPE_CATALOG` mappa ogni scope (ad es. `people:read`, `donations:write`) alle coppie RBAC che permette, e `filterPermissionsByScopes()` interseca questo con i permessi *attuali* della persona ad ogni risoluzione. Conseguenze:

- Revocare un permesso in B1Admin taglia l'accesso della credenziale alla richiesta successiva — i token non si separano mai dal ruolo.
- Uno scope può solo *rimuovere* permessi, così una credenziale scoped non può mai elevarsi ad amministrazione server / dominio (questi permessi sono deliberatamente non mappati a nessuno scope).
- Le chiavi API portano un prefisso `cak_`; `CustomAuthProvider.getUser()` si dirama su di esso, ha la password della segreta, e ri-risolve il vivo RBAC della persona proprietaria su ogni chiamata.

Vedi [Chiavi API → Scope](../api/api-keys#scopes) per il catalogo completo.

## Riferimento della superficie

### API REST

La superficie completa del prodotto. Qualsiasi endpoint autenticato accetta un JWT o una chiave API `cak_…` nell'intestazione `Authorization: Bearer` — non c'è una tabella di rotte separata solo per chiave o solo OAuth. I moduli e i loro percorsi base vivono sotto `Api/src/modules/*`.

### Chiavi API

Un token di accesso personale `cak_<prefix>.<secret>`, creato in **B1Admin → Impostazioni → Sviluppatore → Chiavi API**. Solo un hash SHA-256 è memorizzato; la chiave grezza è mostrata una sola volta. Gestita a `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Meglio per script propri di una singola chiesa e per connettori come Zapier, Make, e Google Sheets. → **[Chiavi API](../api/api-keys)**

### OAuth 2.0 e app connesse

Per app multi-tenant che hanno bisogno di consenso di ogni chiesa. Implementato in `Api/src/modules/membership/controllers/OAuthController.ts` sotto `/membership/oauth`. Il server supporta tre concessioni:

- **Codice di autorizzazione** — `POST /oauth/authorize` (autenticato) ritorna un codice di breve durata; `POST /oauth/token` con `grant_type=authorization_code` lo scambia per un accesso JWT (≈ 7 giorni) più un refresh token (≈ 90 giorni).
- **Codice dispositivo** (RFC 8628) — `POST /oauth/device/authorize` emette un `user_code`; l'utente lo approva in B1Admin (`/oauth/device/approve`); il dispositivo chiede `/oauth/token` con la concessione del codice dispositivo. Per TV, chioschi, e CLI senza browser.
- **Refresh token** — `grant_type=refresh_token` conia un nuovo token di accesso; i client pubblici (senza segreto) possono omettere il segreto.

Un'**App connessa** è la vista rivolta all'admin della chiesa di un token concesso, elencata e revocabile a `/membership/oauth/connections`. Il controller ospita anche un bridge di sessione di relay OAuth (`/oauth/relay/*`) che permette a un dispositivo senza browser di completare un sign-in contro un provider *esterno*. → **[App connesse e OAuth](../api/connected-apps)**

### Webhook

L'unica superficie in uscita. Una chiesa sottoscrive un endpoint HTTPS pubblico a eventi; quando si verifica un cambiamento corrispondente, `WebhookDispatcher.emit(churchId, event, payload)` registra una consegna e un worker di background POSTs un envelope JSON firmato con retry/backoff e riconsegna. Engine a `Api/src/shared/webhooks/`, CRUD per chiesa sotto `/membership/webhooks` (`WebhookController.ts`). Un campo `connectorType` ridisegna il corpo per Slack / Discord. → **[Webhook](../api/webhooks)**

### Server MCP

Un wrapper rivolto all'AI a `/mcp` (`Api/src/modules/mcp/`). Tre strumenti generici — `list_endpoints`, `describe_endpoint`, `api_call` — espongono l'intera superficie REST dinamicamente a qualsiasi client MCP. L'auth è lo stesso token bearer come tutto il resto, e `api_call` re-entra lo stack Express in-processo così ogni permesso e regola di scoping della chiesa si applica ancora. → **[Server MCP](../api/mcp)**

### Provider di contenuti

Il percorso contenuto-in-entrata, nel pacchetto separato `Packages/content-providers` (`@churchapps/content-providers`) piuttosto che l'API. Ogni provider implementa l'interfaccia `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, più ganci di auth — e auto-registra in un registro `Map` (`src/providers/registry.ts`). Qui **B1 è il client OAuth**: un provider dichiara un `AuthType` di `none`, `oauth_pkce`, `device_flow`, o `form_login`, e gli helper condivisi (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) eseguono il PKCE lato client / device flow contro la fonte esterna. Undici provider spediscono oggi — inclusi Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, e B1.church — alimentando FreePlay e le app B1. → **[Provider di contenuti FreePlay](../freeplay-content-provider)**

## Riepilogo

| Superficie | Meccanismo di auth | Direzione | Dove implementato | Riferimento |
|---|---|---|---|---|
| API REST | `Bearer` JWT o `cak_…` chiave | In entrata | `Api/src/modules/*` | [Chiavi API](../api/api-keys) |
| Chiavi API | Token `cak_` con hash SHA-256 | Credenziale | `Api/.../membership/controllers/ApiKeyController.ts` | [Chiavi API](../api/api-keys) |
| OAuth 2.0 / App connesse | Codice auth · dispositivo · refresh → JWT | In entrata | `Api/.../membership/controllers/OAuthController.ts` | [App connesse](../api/connected-apps) |
| Webhook | Segreto per-hook, firma HMAC-SHA256 | In uscita | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook](../api/webhooks) |
| Server MCP | `Bearer` JWT o `cak_…` chiave | In entrata (AI) | `Api/src/modules/mcp/` | [Server MCP](../api/mcp) |
| Provider di contenuti | Per-provider: none / OAuth PKCE / dispositivo / modulo | Contenuto in entrata | `Packages/content-providers/` | [Provider di contenuti](../freeplay-content-provider) |

## Connettori precostruiti

Invece che tutti costruiscano da zero, ChurchApps spedisce connettori sulla parte superiore delle superfici sopra:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` di webhook ridisegna l'envelope standard in un messaggio di chat; configurato interamente in B1Admin, nessun account di terze parti.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — trigger su eventi webhook e atto tramite l'API REST; registrano il loro proprio webhook quando uno Zap/scenario si accende (ha bisogno di una chiave con `settings:write`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un add-on autenticato da chiave API che esporta Persone / Donazioni / Gruppi / Frequenza su richiesta.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — client MCP puntati a `/mcp`.

Per il tuo proprio codice, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) avvolge tutto: un client REST tipizzato, un client OAuth (codice auth / refresh / device flow), e un verificatore di webhook HMAC con middleware Express.

## Pagine correlate

- [Chiavi API](../api/api-keys) — la credenziale più semplice e il catalogo degli scope
- [App connesse e OAuth](../api/connected-apps) — flussi di consenso multi-tenant
- [Webhook](../api/webhooks) — il sistema di evento in uscita
- [Server MCP](../api/mcp) — il wrapper di integrazione dell'AI
- [Provider di contenuti FreePlay](../freeplay-content-provider) — diventare una fonte di contenuto in entrata
- [Integrazioni (end-user)](/docs/b1-admin/integrations/) — guide di configurazione di connettore precostruiti
