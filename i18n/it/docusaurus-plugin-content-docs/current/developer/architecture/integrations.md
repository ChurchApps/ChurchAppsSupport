---
title: "Superficie di integrazione ed estensione"
---

# Superficie di integrazione ed estensione

<div class="article-intro">

Tutto ciò a cui una terza parte può collegarsi passa attraverso un'unica API e un unico modello di autorizzazione. Questa pagina è la mappa: nomina ogni superficie di integrazione, mostra come si collegano, e rimanda al riferimento dettagliato per ciascuna. Se stai sviluppando contro B1, inizia qui per scegliere la porta giusta, poi segui il link alla pagina che la documenta in profondità.

</div>

## Le superfici in breve

Ci sono sei modi per entrare o uscire, e tutti condividono lo stesso strato di autenticazione:

- **[API REST](../api/api-keys)** — l'intera superficie del prodotto, richiamabile con un token bearer da qualsiasi linguaggio.
- **[Chiavi API](../api/api-keys)** — la credenziale più semplice: un token `cak_…` legato a una persona in una chiesa.
- **[OAuth 2.0 e App connesse](../api/connected-apps)** — consenso per chiesa per app multi-tenant; emette lo stesso JWT che ottiene un utente.
- **[Webhook](../api/webhooks)** — eventi firmati, consegnati in uscita in modo durevole.
- **[Server MCP](../api/mcp)** — un wrapper rivolto all'AI sopra l'API REST a `/mcp`.
- **[Provider di contenuti](../freeplay-content-provider)** — il percorso in entrata per le librerie multimediali esterne verso FreePlay e le app B1.

Tutto tranne i provider di contenuti è servito da un'unica API monolitica (il repository [Api](https://github.com/ChurchApps/Api)) i cui moduli si montano sotto percorsi base stabili — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, e `/mcp`.

## Come si combina tutto

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  App di terze parti  │   Bearer  cak_… / JWT    │              API B1 (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   chiave cak_ ─┐                 │  │
   │  · CLI / script      │                          │  │   JWT OAuth ┴▶ Principal          │  │
   │  · Client AI (MCP)   │ ─── POST /mcp ──────────▶ │  │   scope filtrano → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Moduli API: /membership /giving      │
             │        POST JSON firmato                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhook ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durevole, firmato HMAC-SHA256)   └───────────────────────────────────────┘

   Fonti di contenuto esterne (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / nessuno   ──  B1 è il *client* OAuth qui  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / app B1        (percorso di contenuto in entrata)
```

Tre frecce raccontano l'intera storia: una terza parte **chiama in entrata** con un token bearer (chiave API o JWT OAuth, anche tramite `/mcp`); l'API **chiama in uscita** tramite webhook firmati; e i provider di contenuti sono l'unico percorso di **contenuto in entrata** dove B1 stesso è il *client* OAuth che recupera media da una fonte esterna.

## Il modello di autenticazione condiviso

Ogni credenziale — il JWT di login di un utente, un token di accesso OAuth, o una chiave API — si risolve nello **stesso `Principal`** ed è verificata allo stesso modo. Non esiste un percorso di "autenticazione per integrazioni" separato; una credenziale con scope è semplicemente indistinguibile da un utente con privilegi inferiori.

### Struttura del JWT

I token di accesso B1 sono JWT HS256 coniati in `Api/src/modules/membership/auth/AuthenticatedUser.ts`. L'insieme di claim:

| Claim | Significato |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La persona dietro il token |
| `churchId` | L'unica chiesa in cui questo token agisce — l'ancora per tutto lo scoping dei dati |
| `personId` | Il record persona all'interno di quella chiesa |
| `permissions` | Array piatto di stringhe di permesso RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Appartenenza/leadership dei gruppi, per controlli scoped sul gruppo |
| `membershipStatus` | Guest vs. membro, per il gating self-service |

Un token di accesso OAuth ha esattamente la stessa forma di un JWT di login — l'unica differenza è che il suo array `permissions` è stato **filtrato attraverso gli scope concessi prima della firma** (`getCombinedApiJwt(...)`).

### Scoping per chiesa

`churchId` è un claim del token, non un parametro della richiesta, quindi una credenziale non può mai raggiungere oltre le chiese. Ogni query di repository filtra sul `churchId` del chiamante; una chiave API o un token OAuth è vincolato esattamente a una chiesa al momento della coniazione.

### Permessi basati sui ruoli al confine

I controller bloccano le azioni con `au.checkAccess(contentType, action)` contro l'array `permissions` del token. Gli scope sono un **filtro, mai una concessione** (`Api/src/shared/auth/Scopes.ts`): il `SCOPE_CATALOG` mappa ogni scope (ad es. `people:read`, `donations:write`) alle coppie RBAC che permette, e `filterPermissionsByScopes()` interseca questo con i permessi *attuali* della persona a ogni risoluzione. Conseguenze:

- Revocare un permesso in B1Admin taglia l'accesso della credenziale alla richiesta successiva — i token non si allontanano mai dal ruolo.
- Uno scope può solo *rimuovere* permessi, quindi una credenziale scoped non può mai elevarsi ad amministrazione server / dominio (questi permessi sono deliberatamente non mappati a nessuno scope).
- Le chiavi API portano un prefisso `cak_`; `CustomAuthProvider.getUser()` si dirama su di esso, esegue l'hash del segreto, e ri-risolve l'RBAC live della persona proprietaria a ogni chiamata.

Vedi [Chiavi API → Scope](../api/api-keys#scopes) per il catalogo completo.

## Riferimento delle superfici

### API REST

La superficie completa del prodotto. Qualsiasi endpoint autenticato accetta sia un JWT che una chiave API `cak_…` nell'header `Authorization: Bearer` — non esiste una tabella di rotte separata solo-chiave o solo-OAuth. I moduli e i loro percorsi base vivono sotto `Api/src/modules/*`.

### Chiavi API

Un token di accesso personale `cak_<prefix>.<secret>`, creato in **B1Admin → Impostazioni → Sviluppatore → Chiavi API**. Viene memorizzato solo un hash SHA-256; la chiave grezza viene mostrata una sola volta. Gestita a `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Ideale per gli script di una singola chiesa e per connettori come Zapier, Make, e Google Sheets. → **[Chiavi API](../api/api-keys)**

### OAuth 2.0 e App connesse

Per app multi-tenant che richiedono il consenso di ogni chiesa. Implementato in `Api/src/modules/membership/controllers/OAuthController.ts` sotto `/membership/oauth`. Il server supporta tre grant:

- **Authorization Code** — `POST /oauth/authorize` (autenticato) restituisce un codice di breve durata; `POST /oauth/token` con `grant_type=authorization_code` lo scambia con un JWT di accesso (≈ 7 giorni) più un refresh token (≈ 90 giorni).
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` emette uno `user_code`; l'utente lo approva in B1Admin (`/oauth/device/approve`); il dispositivo esegue polling su `/oauth/token` con il grant device-code. Per TV, chioschi, e CLI senza browser.
- **Refresh Token** — `grant_type=refresh_token` conia un nuovo token di accesso; i client pubblici (senza segreto) possono omettere il segreto.

Una **App connessa** è la vista rivolta all'admin della chiesa di un token concesso, elencata e revocabile a `/membership/oauth/connections`. Il controller ospita anche un bridge di **relay-session** OAuth (`/oauth/relay/*`) che consente a un dispositivo senza browser di completare un accesso contro un provider *esterno*. → **[App connesse e OAuth](../api/connected-apps)**

### Webhook

L'unica superficie in uscita. Una chiesa sottoscrive un endpoint HTTPS pubblico agli eventi; quando si verifica una modifica corrispondente, `WebhookDispatcher.emit(churchId, event, payload)` arricchisce i payload solo-id con nomi visualizzati (`personName`, `groupName`, `formName` — le ricerche vengono eseguite solo quando una sottoscrizione corrisponde), registra una consegna, e un worker in background invia un envelope JSON firmato con retry/backoff e riconsegna. Motore in `Api/src/shared/webhooks/`, CRUD per chiesa sotto `/membership/webhooks` (`WebhookController.ts`). Un campo `connectorType` rimodella il corpo per Slack / Discord. → **[Webhook](../api/webhooks)**

### Server MCP

Un wrapper rivolto all'AI a `/mcp` (`Api/src/modules/mcp/`). Tre strumenti generici — `list_endpoints`, `describe_endpoint`, `api_call` — espongono l'intera superficie REST dinamicamente a qualsiasi client MCP. L'autenticazione è lo stesso token bearer di tutto il resto, e `api_call` rientra nello stack Express in-processo così ogni regola di permesso e di scoping per chiesa continua ad applicarsi. → **[Server MCP](../api/mcp)**

### Provider di contenuti

Il percorso di contenuto in entrata, nel pacchetto separato `Packages/content-providers` (`@churchapps/content-providers`) piuttosto che nell'API. Ogni provider implementa l'interfaccia `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, più hook di autenticazione — e si auto-registra in un registro `Map` (`src/providers/registry.ts`). Qui **B1 è il client OAuth**: un provider dichiara un `AuthType` tra `none`, `oauth_pkce`, `device_flow`, o `form_login`, e gli helper condivisi (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) eseguono il PKCE lato client / device flow contro la fonte esterna. Undici provider sono attivi oggi — inclusi Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, e B1.church — alimentando FreePlay e le app B1. → **[Provider di contenuti FreePlay](../freeplay-content-provider)**

## Riepilogo

| Superficie | Meccanismo di autenticazione | Direzione | Dove implementato | Riferimento |
|---|---|---|---|---|
| API REST | JWT `Bearer` o chiave `cak_…` | In entrata | `Api/src/modules/*` | [Chiavi API](../api/api-keys) |
| Chiavi API | Token `cak_` con hash SHA-256 | Credenziale | `Api/.../membership/controllers/ApiKeyController.ts` | [Chiavi API](../api/api-keys) |
| OAuth 2.0 / App connesse | Auth code · device · refresh → JWT | In entrata | `Api/.../membership/controllers/OAuthController.ts` | [App connesse](../api/connected-apps) |
| Webhook | Segreto per-hook, firma HMAC-SHA256 | In uscita | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook](../api/webhooks) |
| Server MCP | JWT `Bearer` o chiave `cak_…` | In entrata (AI) | `Api/src/modules/mcp/` | [Server MCP](../api/mcp) |
| Provider di contenuti | Per provider: nessuno / OAuth PKCE / device / form | Contenuto in entrata | `Packages/content-providers/` | [Provider di contenuti](../freeplay-content-provider) |

## Connettori precostruiti

Piuttosto che far costruire tutto da zero a ognuno, ChurchApps distribuisce connettori sopra le superfici qui sopra:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` di webhook rimodella l'envelope standard in un messaggio di chat; configurato interamente in B1Admin, nessun account di terze parti.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — si attivano su eventi webhook e agiscono tramite l'API REST; registrano il proprio webhook quando uno Zap/scenario viene attivato (richiede una chiave con `settings:write`). Il sorgente dell'app Zapier vive nel repository `Integrations` sotto `zapier/` (Zapier CLI, distribuito con `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un componente aggiuntivo autenticato con chiave API che esporta Persone / Donazioni / Gruppi / Presenze su richiesta.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — client MCP puntati a `/mcp`.

Per il tuo codice, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) avvolge tutto: un client REST tipizzato, un client OAuth (auth-code / refresh / device flow), e un verificatore di webhook HMAC con middleware Express.

## Pagine correlate

- [Chiavi API](../api/api-keys) — la credenziale più semplice e il catalogo degli scope
- [App connesse e OAuth](../api/connected-apps) — flussi di consenso multi-tenant
- [Webhook](../api/webhooks) — il sistema di eventi in uscita
- [Server MCP](../api/mcp) — il wrapper di integrazione AI
- [Provider di contenuti FreePlay](../freeplay-content-provider) — diventare una fonte di contenuto in entrata
- [Integrazioni (end-user)](/docs/b1-admin/integrations/) — guide di configurazione dei connettori precostruiti
