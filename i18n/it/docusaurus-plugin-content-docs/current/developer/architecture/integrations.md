---
title: "Superficie di integrazione ed estensione"
---

# Superficie di integrazione ed estensione {#integration--extension-surface}

<div class="article-intro">

Tutto ciò a cui una terza parte può collegarsi passa attraverso un'unica API e un unico modello di autorizzazione. Questa pagina è la mappa: elenca ogni superficie di integrazione, mostra come si collegano e rimanda alla documentazione dettagliata di ciascuna. Se stai costruendo qualcosa su B1, parti da qui per scegliere la porta giusta, poi segui il link alla pagina che la documenta in profondità.

</div>

## Le superfici in sintesi {#the-surfaces-at-a-glance}

Ci sono sei modi di entrare o uscire, e condividono tutti lo stesso livello di autenticazione:

- **[REST API](../api/api-keys)** — l'intera superficie del prodotto, richiamabile con un bearer token da qualsiasi linguaggio.
- **[Chiavi API](../api/api-keys)** — la credenziale più semplice: un token `cak_…` legato a una persona in una chiesa.
- **[OAuth 2.0 e App connesse](../api/connected-apps)** — consenso per chiesa per app multi-tenant; emette lo stesso JWT che riceve un utente.
- **[Webhook](../api/webhooks)** — eventi in uscita firmati e consegnati in modo durevole.
- **[Server MCP](../api/mcp)** — un wrapper rivolto all'AI sull'API REST, su `/mcp`.
- **[Provider di contenuti](../freeplay-content-provider)** — il percorso in ingresso per le librerie multimediali esterne verso FreePlay e le app B1.

Tutto tranne i provider di contenuti è servito da un'unica API monolitica (il repository [Api](https://github.com/ChurchApps/Api)) i cui moduli sono montati sotto percorsi base stabili — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` e `/mcp`.

## Come si integra tutto {#how-it-fits-together}

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

Tre frecce raccontano l'intera storia: una terza parte **chiama in ingresso** con un bearer token (chiave API o JWT OAuth, anche tramite `/mcp`); l'API **richiama in uscita** tramite webhook firmati; e i provider di contenuti sono l'unico percorso di **contenuto in ingresso**, dove B1 stesso è il client OAuth che preleva i media da una fonte esterna.

## Il modello di autenticazione condiviso {#the-shared-auth-model}

Ogni credenziale — un JWT di accesso dell'utente, un token di accesso OAuth o una chiave API — viene risolta nello **stesso `Principal`** e verificata allo stesso modo. Non esiste un percorso di autenticazione separato per le integrazioni; una credenziale limitata è semplicemente indistinguibile da un utente con meno privilegi.

### Struttura del JWT {#jwt-structure}

I token di accesso B1 sono JWT HS256 generati in `Api/src/modules/membership/auth/AuthenticatedUser.ts`. L'insieme di claim:

| Claim | Significato |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La persona dietro il token |
| `churchId` | L'unica chiesa in cui agisce questo token — il punto di ancoraggio di tutto l'isolamento dei dati |
| `personId` | Il record della persona all'interno di quella chiesa |
| `permissions` | Array piatto di stringhe di permesso RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Appartenenza e leadership dei gruppi, per i controlli a livello di gruppo |
| `membershipStatus` | Ospite o membro, per il controllo dei servizi self-service |

Un token di accesso OAuth ha esattamente la stessa forma di un JWT di login — l'unica differenza è che il suo array `permissions` è stato **filtrato tramite gli scope concessi prima della firma** (`getCombinedApiJwt(...)`).

### Isolamento per chiesa {#per-church-scoping}

`churchId` è un claim del token, non un parametro della richiesta, quindi una credenziale non può mai accedere a dati di altre chiese. Ogni query del repository filtra sul `churchId` del chiamante; una chiave API o un token OAuth è legato a esattamente una chiesa al momento della creazione.

### Permessi basati sui ruoli al confine {#role-based-permissions-at-the-boundary}

I controller limitano le azioni con `au.checkAccess(contentType, action)` sull'array `permissions` del token. Gli scope sono un **filtro, mai una concessione** (`Api/src/shared/auth/Scopes.ts`): il `SCOPE_CATALOG` associa ogni scope (ad esempio `people:read`, `donations:write`) alle coppie RBAC che consente, e `filterPermissionsByScopes()` interseca questo con i permessi **attuali** della persona a ogni risoluzione. Ne derivano:

- Revocare un permesso in B1Admin toglie l'accesso alla credenziale alla richiesta successiva — i token non si discostano mai dal ruolo.
- Uno scope può solo *rimuovere* permessi, quindi una credenziale limitata non può mai elevarsi ad amministrazione del server o del dominio (quei permessi sono deliberatamente non mappati a nessuno scope).
- Le chiavi API portano il prefisso `cak_`; `CustomAuthProvider.getUser()` lo riconosce, calcola l'hash del segreto e ririsolve l'RBAC attuale della persona proprietaria a ogni chiamata.

Vedi [Chiavi API → Scope](../api/api-keys#scopes) per il catalogo completo.

## Riferimento delle superfici {#surface-reference}

### REST API {#rest-api}

L'intera superficie del prodotto. Ogni endpoint autenticato accetta un JWT oppure una chiave API `cak_…` nell'header `Authorization: Bearer` — non esiste una tabella di rotte separata solo per chiavi o solo per OAuth. I moduli e i rispettivi percorsi base si trovano sotto `Api/src/modules/*`.

### Chiavi API {#api-keys}

Un token personale `cak_<prefix>.<secret>`, creato in **B1Admin → Impostazioni → Sviluppatore → Chiavi API**. Viene memorizzato solo un hash SHA-256; la chiave grezza viene mostrata una sola volta. Gestita in `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Ideale per gli script di una singola chiesa e per connettori come Zapier, Make e Google Sheets. → **[Chiavi API](../api/api-keys)**

### OAuth 2.0 e App connesse {#oauth-20--connected-apps}

Per le app multi-tenant che richiedono il consenso di ogni chiesa. Implementato in `Api/src/modules/membership/controllers/OAuthController.ts` sotto `/membership/oauth`. Il server supporta tre grant:

- **Authorization Code** — `POST /oauth/authorize` (autenticato) restituisce un codice di breve durata; `POST /oauth/token` con `grant_type=authorization_code` lo scambia con un JWT di accesso (≈ 7 giorni) più un refresh token (≈ 90 giorni). I client pubblici (senza segreto) devono usare PKCE (solo `S256`): un `code_challenge` nell'autorizzazione e il `code_verifier` corrispondente nello scambio del token.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` emette un `user_code`; l'utente lo approva in B1Admin (`/oauth/device/approve`); il dispositivo interroga `/oauth/token` con il grant device-code. Per TV, chioschi e CLI senza browser.
- **Refresh Token** — `grant_type=refresh_token` genera un nuovo token di accesso; i client pubblici (senza segreto) possono omettere il segreto.

I client pubblici possono anche registrarsi da soli con `POST /oauth/register` (registrazione dinamica del client RFC 7591); ricevono un `client_id` senza segreto, e i loro URI di reindirizzamento devono essere `https` o di loopback.

Una **App connessa** è la vista, rivolta all'amministratore della chiesa, di un token concesso; è elencata e revocabile in `/membership/oauth/connections`. Il controller ospita anche un ponte OAuth di **relay-session** (`/oauth/relay/*`) che permette a un dispositivo senza browser di completare l'accesso presso un provider *esterno*. → **[App connesse e OAuth](../api/connected-apps)**

### Webhook {#webhooks}

L'unica superficie in uscita. Una chiesa iscrive un endpoint HTTPS pubblico a degli eventi; quando si verifica una modifica corrispondente, `WebhookDispatcher.emit(churchId, event, payload)` arricchisce i payload con solo ID con i nomi visualizzati (`personName`, `groupName`, `formName` — le ricerche avvengono solo quando una iscrizione corrisponde), registra una consegna, e un worker in background invia un envelope JSON firmato con retry/backoff e riconsegna. Motore in `Api/src/shared/webhooks/`, CRUD per chiesa sotto `/membership/webhooks` (`WebhookController.ts`). Un campo `connectorType` rimodella il body per Slack / Discord; il connettore `mailchimp` va oltre e gestisce l'intero scambio HTTP (metodo/URL/autenticazione per evento sull'API di Mailchimp, credenziali cifrate in `webhooks.connectorConfig`). → **[Webhook](../api/webhooks)**

### Server MCP {#mcp-server}

Un wrapper rivolto all'AI su `/mcp` (`Api/src/modules/mcp/`). Tre strumenti generici — `list_endpoints`, `describe_endpoint`, `api_call` — espongono dinamicamente l'intera superficie REST a qualsiasi client MCP. L'autenticazione è lo stesso bearer token di tutto il resto. Per i client che accedono con OAuth (connettori personalizzati di claude.ai), una risposta 401 da `/mcp` contiene un header `WWW-Authenticate` che punta a `/.well-known/oauth-protected-resource`, e `/.well-known/oauth-authorization-server` pubblicizza gli endpoint `/membership/oauth`, la registrazione dinamica, PKCE e la pagina di consenso `/oauth` di B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` rientra nello stack Express in-process così ogni regola di permesso e di isolamento per chiesa continua ad applicarsi. → **[Server MCP](../api/mcp)**

### Provider di contenuti {#content-providers}

Il percorso dei contenuti in ingresso, nel pacchetto separato `Packages/content-providers` (`@churchapps/content-providers`) invece che nell'API. Ogni provider implementa l'interfaccia `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, più gli hook di autenticazione — e si registra automaticamente in una `Map` di registro (`src/providers/registry.ts`). Qui **B1 è il client OAuth**: un provider dichiara un `AuthType` tra `none`, `oauth_pkce`, `device_flow` o `form_login`, e gli helper condivisi (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) eseguono lato client il flusso PKCE / device contro la fonte esterna. Oggi sono distribuiti undici provider — tra cui Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church e B1.church — che alimentano FreePlay e le app B1. → **[Provider di contenuti FreePlay](../freeplay-content-provider)**

**I piani annuali** viaggiano su questo percorso. Un editore di materiale didattico (con `lessons.edit`) mantiene sequenze ordinate di settimane 1/2/3 nell'amministrazione di Lessons.church (tabelle `yearPlans` / `yearPlanWeeks` di `LessonsApi`, con `startMonth` facoltativo e `anchor` per settimana di `easter` / `christmas`); `GET /yearPlans/public` su LessonsApi serve in modo anonimo i piani attivi, idratando il programma/studio/luogo di ogni settimana dall'albero delle lezioni. **Pianificazione → Piani → Pianifica lezione → Applica piano annuale** di B1Admin consuma quell'endpoint e scrive un piano DoingApi per ogni settimana inclusa (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). I piani con `startMonth` risolvono le settimane ancorate rispetto all'anno scelto (Pasqua tramite il computo gregoriano, Natale come la domenica precedente o uguale al 25 dicembre) e riempiono gli intervalli tra di esse; i piani senza `startMonth` mappano comunque la settimana N su `startDate + (N−1)×7` giorni. Le settimane provenienti da provider OLF esterni o con un percorso incompleto vengono saltate al momento dell'applicazione; le chiese modificano i piani risultanti come qualsiasi altro, e FreePlay riproduce ciò che è nel piano.

## Riepilogo {#summary}

| Superficie | Meccanismo di autenticazione | Direzione | Dove è implementata | Riferimento |
|---|---|---|---|---|
| REST API | `Bearer` JWT o chiave `cak_…` | In ingresso | `Api/src/modules/*` | [Chiavi API](../api/api-keys) |
| Chiavi API | Token `cak_` con hash SHA-256 | Credenziale | `Api/.../membership/controllers/ApiKeyController.ts` | [Chiavi API](../api/api-keys) |
| OAuth 2.0 / App connesse | Codice di autorizzazione (PKCE) · device · refresh → JWT; registrazione dinamica del client | In ingresso | `Api/.../membership/controllers/OAuthController.ts` | [App connesse](../api/connected-apps) |
| Webhook | Segreto per hook, firma HMAC-SHA256 | In uscita | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook](../api/webhooks) |
| Server MCP | `Bearer` JWT, JWT OAuth (scoperto tramite `/.well-known`), o chiave `cak_…` | In ingresso (AI) | `Api/src/modules/mcp/` | [Server MCP](../api/mcp) |
| Provider di contenuti | Per provider: nessuno / OAuth PKCE / device / form | Contenuto in ingresso | `Packages/content-providers/` | [Provider di contenuti](../freeplay-content-provider) |

## Connettori predefiniti {#prebuilt-connectors}

Invece di far costruire tutto da zero, ChurchApps offre connettori costruiti sulle superfici descritte sopra:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` di tipo webhook rimodella l'envelope standard in un messaggio di chat; configurato interamente in B1Admin, senza account di terze parti.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — un `connectorType` `mailchimp` che sincronizza le persone con un pubblico Mailchimp e associa l'appartenenza a gruppi/liste a tag (`Api/src/shared/webhooks/MailchimpConnector.ts`). A differenza dei connettori di chat, invia le proprie richieste autenticate per ogni evento (upsert/archive/tag) invece di inviare POST a un URL fornito dalla chiesa; la chiave API e l'ID del pubblico sono salvati cifrati in `webhooks.connectorConfig`. Unidirezionale, solo campi di unione standard.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — si attivano sugli eventi dei webhook e agiscono tramite l'API REST; registrano il proprio webhook quando uno Zap/scenario viene attivato (richiede una chiave con `settings:write`). Il codice sorgente dell'app Zapier si trova nel repository `Integrations` sotto `zapier/` (CLI di Zapier, distribuita con `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un add-on autenticato con chiave API che esporta Persone / Donazioni / Gruppi / Presenze su richiesta.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — client MCP puntati su `/mcp`.

Per il proprio codice, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) racchiude tutto questo: un client REST tipizzato, un client OAuth (codice di autorizzazione / refresh / device flow) e un verificatore di webhook HMAC con middleware Express.

## Pagine correlate {#related-pages}

- [Chiavi API](../api/api-keys) — la credenziale più semplice e il catalogo degli scope
- [App connesse e OAuth](../api/connected-apps) — flussi di consenso multi-tenant
- [Webhook](../api/webhooks) — il sistema di eventi in uscita
- [Server MCP](../api/mcp) — il wrapper di integrazione con l'AI
- [Provider di contenuti FreePlay](../freeplay-content-provider) — diventare una fonte di contenuti in ingresso
- [Integrazioni (per l'utente finale)](/docs/b1-admin/integrations/) — guide di configurazione dei connettori predefiniti
