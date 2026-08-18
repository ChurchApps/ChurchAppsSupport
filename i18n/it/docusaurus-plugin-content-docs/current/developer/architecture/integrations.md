---
title: "Superficie di integrazione ed estensione"
---

# Superficie di integrazione ed estensione

<div class="article-intro">

Tutto ciò in cui una terza parte può collegarsi funziona attraverso una sola API e un unico modello di autorizzazione. Questa pagina è la mappa: nomina ogni superficie di integrazione, mostra come si collegano e si collega al riferimento dettagliato per ciascuna. Se stai costruendo contro B1, inizia qui per scegliere la giusta porta, quindi segui il link alla pagina che la documenta in profondità.

</div>

## Le superfici a colpo d'occhio

Ci sono sei modi di entrare o uscire, e condividono tutti lo stesso livello di auth:

- **[API REST](../api/api-keys)** — l'intera superficie del prodotto, richiamabile con un token portatore da qualsiasi linguaggio.
- **[Chiavi API](../api/api-keys)** — la credenziale più semplice: un token `cak_…` legato a una persona in una chiesa.
- **[OAuth 2.0 e app connesse](../api/connected-apps)** — consenso per chiesa per app multi-tenant; emette lo stesso JWT che un utente riceve.
- **[Webhook](../api/webhooks)** — eventi in uscita firmati e consegnati durevolmente.
- **[Server MCP](../api/mcp)** — un wrapper rivolto verso l'IA sull'API REST su `/mcp`.
- **[Provider di contenuti](../freeplay-content-provider)** — il percorso di ingresso per le librerie di media esterne in FreePlay e nelle app B1.

Tutto tranne i provider di contenuti è servito da un'unica API monolitica (il repository [Api](https://github.com/ChurchApps/Api)) i cui moduli sono montati sotto percorsi base stabili — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, e `/mcp`.

## Come si incastra

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Tre frecce raccontano tutta la storia: una terza parte **chiama dentro** con un token portatore (chiave API o JWT OAuth, incluso via `/mcp`); l'API **chiama fuori** tramite webhook firmati; e i provider di contenuti sono il unico percorso di **contenuto in ingresso** dove B1 stesso è il client OAuth che estrae media da una fonte esterna.

## Il modello di autenticazione condiviso

Ogni credenziale — un JWT di login di un utente, un token di accesso OAuth o una chiave API — si risolve nello **stesso `Principal`** e viene controllata nello stesso modo. Non c'è un percorso "auth di integrazione" separato; una credenziale con scope è semplicemente indistinguibile da un utente con meno privilegi.

### Struttura JWT

I token di accesso B1 sono JWT HS256 coniati in `Api/src/modules/membership/auth/AuthenticatedUser.ts`. L'insieme di reclami:

| Reclamo | Significato |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La persona dietro il token |
| `churchId` | L'unica chiesa a cui questo token agisce — l'ancora per tutto il data scoping |
| `personId` | Il record di persona dentro quella chiesa |
| `permissions` | Array piatto di stringhe di permesso RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Iscrizione ai gruppi / leadership, per controlli a livello di gruppo |
| `membershipStatus` | Guest vs. membro, per il gating self-service |

Un token di accesso OAuth è byte per byte la stessa forma di un JWT di login — l'unica differenza è che il suo array `permissions` è stato **filtrato attraverso gli scope concessi prima della firma** (`getCombinedApiJwt(...)`).

### Scoping per chiesa

`churchId` è un reclamo di token, non un parametro di richiesta, così una credenziale non può mai raggiungere chiese. Ogni query di repository filtra sul `churchId` del chiamante; una chiave API o token OAuth è legata esattamente a una chiesa al momento del conio.

### Permessi basati su ruoli al confine

I controller recintano le azioni con `au.checkAccess(contentType, action)` rispetto all'array `permissions` del token. Gli scope sono un **filtro, mai una concessione** (`Api/src/shared/auth/Scopes.ts`): il `SCOPE_CATALOG` mappa ogni scope (ad es. `people:read`, `donations:write`) alla coppia RBAC che permette, e `filterPermissionsByScopes()` interseca quello con i permessi *attuali* della persona ad ogni risoluzione. Conseguenze:

- Revocare un permesso in B1Admin taglia l'accesso della credenziale alla prossima richiesta — i token non derivano mai dal ruolo.
- Uno scope può solo *rimuovere* permessi, così una credenziale con scope non può mai elevarsi all'amministrazione del server / dominio (questi permessi sono deliberatamente non mappati a nessuno scope).
- Le chiavi API portano un prefisso `cak_`; `CustomAuthProvider.getUser()` si ramifica su di esso, esegue l'hash del segreto e risolve di nuovo il vivo RBAC della persona proprietaria ad ogni chiamata.

Vedi [Chiavi API → Scope](../api/api-keys#scopes) per il catalogo completo.

## Riferimento della superficie

### API REST

L'intera superficie del prodotto. Qualsiasi endpoint autenticato accetta sia un JWT che una chiave API `cak_…` nell'intestazione `Authorization: Bearer` — non c'è una tabella di route separata solo per chiave o solo per OAuth. I moduli e i loro percorsi base vivono sotto `Api/src/modules/*`.

### Chiavi API

Un token di accesso personale `cak_<prefix>.<secret>`, creato in **B1Admin → Impostazioni → Sviluppatore → Chiavi API**. Solo un hash SHA-256 è memorizzato; la chiave grezza è mostrata una volta. Gestito in `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Il migliore per gli script della propria chiesa e per connettori come Zapier, Make e Google Sheets. → **[Chiavi API](../api/api-keys)**

### OAuth 2.0 e app connesse

Per app multi-tenant che hanno bisogno che ogni chiesa consenta. Implementato in `Api/src/modules/membership/controllers/OAuthController.ts` sotto `/membership/oauth`. Il server supporta tre concessioni:

- **Codice di autorizzazione** — `POST /oauth/authorize` (autenticato) restituisce un codice di breve durata; `POST /oauth/token` con `grant_type=authorization_code` lo scambia per un JWT di accesso (≈ 7 giorni) più un refresh token (≈ 90 giorni).
- **Codice dispositivo** (RFC 8628) — `POST /oauth/device/authorize` emette un `user_code`; l'utente lo approva in B1Admin (`/oauth/device/approve`); il dispositivo esegue il polling `/oauth/token` con la concessione di codice dispositivo. Per TV, chioschi e CLI senza browser.
- **Refresh Token** — `grant_type=refresh_token` conia un nuovo token di accesso; i client pubblici (senza segreto) possono omettere il segreto.

Un'**App connessa** è la vista rivolta all'amministratore della chiesa di un token concesso, elencato e revocabile su `/membership/oauth/connections`. Il controller ospita anche un ponte di **sessione relay** OAuth (`/oauth/relay/*`) che consente a un dispositivo senza browser di completare un sign-in rispetto a un provider *esterno*. → **[App connesse e OAuth](../api/connected-apps)**

### Webhook

L'unica superficie in uscita. Una chiesa sottoscrive un endpoint HTTPS pubblico a eventi; quando si verifica un cambiamento corrispondente, `WebhookDispatcher.emit(churchId, event, payload)` arricchisce i payload solo id con nomi visualizzati (`personName`, `groupName`, `formName` — le ricerche vengono eseguite solo una volta che una sottoscrizione corrisponde), registra una consegna e un worker in background POST un involucro JSON firmato con riprovazione/backoff e riconsegna. Motore in `Api/src/shared/webhooks/`, CRUD per chiesa sotto `/membership/webhooks` (`WebhookController.ts`). Un campo `connectorType` rimodella il corpo per Slack / Discord; il connettore `mailchimp` va più lontano e possiede lo scambio HTTP completo (per metodo di evento/URL/auth rispetto all'API di Mailchimp, credenziali crittografate in `webhooks.connectorConfig`). → **[Webhook](../api/webhooks)**

### Server MCP

Un wrapper rivolto verso l'IA su `/mcp` (`Api/src/modules/mcp/`). Tre strumenti generici — `list_endpoints`, `describe_endpoint`, `api_call` — espongono dinamicamente l'intera superficie REST a qualsiasi client MCP. L'auth è lo stesso token portatore di tutto il resto, e `api_call` ri-entra nello stack Express in-process così ogni permesso e regola di scoping della chiesa si applicano ancora. → **[Server MCP](../api/mcp)**

### Provider di contenuti

Il percorso di contenuto in ingresso, nel pacchetto separato `Packages/content-providers` (`@churchapps/content-providers`) piuttosto che nell'API. Ogni provider implementa l'interfaccia `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, più hook di auth — e si auto-registra in un registro `Map` (`src/providers/registry.ts`). Qui **B1 è il client OAuth**: un provider dichiara un `AuthType` di `none`, `oauth_pkce`, `device_flow`, o `form_login`, e gli helper condivisi (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) eseguono il client-side PKCE / device flow rispetto alla fonte esterna. Undici provider spediscono oggi — inclusi Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church e B1.church — alimentando FreePlay e le app B1. → **[Provider di contenuti FreePlay](../freeplay-content-provider)**

## Riepilogo

| Superficie | Meccanismo di autenticazione | Direzione | Dove implementato | Riferimento |
|---|---|---|---|---|
| API REST | JWT `Bearer` o chiave `cak_…` | In ingresso | `Api/src/modules/*` | [Chiavi API](../api/api-keys) |
| Chiavi API | Token `cak_` con hash SHA-256 | Credenziale | `Api/.../membership/controllers/ApiKeyController.ts` | [Chiavi API](../api/api-keys) |
| OAuth 2.0 / App connesse | Codice di autenticazione · dispositivo · refresh → JWT | In ingresso | `Api/.../membership/controllers/OAuthController.ts` | [App connesse](../api/connected-apps) |
| Webhook | Segreto per hook, firma HMAC-SHA256 | In uscita | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook](../api/webhooks) |
| Server MCP | JWT `Bearer` o chiave `cak_…` | In ingresso (IA) | `Api/src/modules/mcp/` | [Server MCP](../api/mcp) |
| Provider di contenuti | Per provider: nessuno / OAuth PKCE / dispositivo / modulo | Contenuto in ingresso | `Packages/content-providers/` | [Provider di contenuti](../freeplay-content-provider) |

## Connettori precostruiti

Piuttosto che costruire tutti da zero, ChurchApps spedisce connettori sopra le superfici sopra:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — un webhook `connectorType` rimodella l'involucro standard in un messaggio di chat; configurato interamente in B1Admin, nessun account di terze parti.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — un tipo di connettore `mailchimp` che sincronizza le persone in un pubblico Mailchimp e mappa l'appartenenza a gruppo/lista ai tag (`Api/src/shared/webhooks/MailchimpConnector.ts`). A differenza dei connettori di chat emette le sue richieste autenticate per evento (upsert/archive/tag) invece di POST a un URL fornito dalla chiesa; la chiave API e l'id del pubblico vivono crittografati in `webhooks.connectorConfig`. Unidirezionale, solo campi di merge standard.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — si attivano su eventi webhook e agiscono tramite l'API REST; registrano il loro webhook quando uno Zap/scenario si attiva (ha bisogno di una chiave con `settings:write`). Il codice sorgente dell'app Zapier vive nel repository `Integrations` sotto `zapier/` (Zapier CLI, distribuito con `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un componente aggiuntivo autenticato con chiave API che esporta Persone / Donazioni / Gruppi / Partecipazione su richiesta.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — client MCP puntati su `/mcp`.

Per il tuo codice, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) avvolge tutto: un client REST tipizzato, un client OAuth (codice di autenticazione / refresh / device flow), e un verificatore webhook HMAC con middleware Express.

## Pagine correlate

- [Chiavi API](../api/api-keys) — la credenziale più semplice e il catalogo degli scope
- [App connesse e OAuth](../api/connected-apps) — flussi di consenso multi-tenant
- [Webhook](../api/webhooks) — il sistema di eventi in uscita
- [Server MCP](../api/mcp) — il wrapper di integrazione AI
- [Provider di contenuti FreePlay](../freeplay-content-provider) — diventare una fonte di contenuto in ingresso
- [Integrazioni (per l'utente)](/docs/b1-admin/integrations/) — guide di setup del connettore precostruito
