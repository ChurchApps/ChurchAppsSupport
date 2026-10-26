---
title: "Superficie di integrazione ed estensione"
---

# Superficie di integrazione ed estensione

<div class="article-intro">

Tutto ciò a cui una terza parte può collegarsi passa attraverso un'unica API e un unico modello di autorizzazione. Questa pagina è la mappa: elenca ogni superficie di integrazione, mostra come si collegano e rimanda al riferimento dettagliato di ciascuna. Se stai sviluppando su B1, inizia da qui per scegliere la porta giusta, poi segui il collegamento alla pagina che la documenta in dettaglio.

</div>

## Le superfici in sintesi

Ci sono sei modi di entrare o uscire, e condividono tutti lo stesso livello di autenticazione:

- **[REST API](../api/api-keys)** — l'intera superficie del prodotto, richiamabile con un bearer token da qualsiasi linguaggio.
- **[Chiavi API](../api/api-keys)** — la credenziale più semplice: un token `cak_…` legato a una persona in una chiesa.
- **[OAuth 2.0 e App connesse](../api/connected-apps)** — consenso per chiesa per app multi-tenant; emette lo stesso JWT che riceve un utente.
- **[Webhook](../api/webhooks)** — eventi in uscita firmati e consegnati in modo durevole.
- **[Server MCP](../api/mcp)** — un wrapper orientato all'IA sull'API REST, disponibile su `/mcp`.
- **[Provider di contenuti](../freeplay-content-provider)** — il percorso in ingresso per le librerie multimediali esterne verso FreePlay e le app B1.

Tutto tranne i provider di contenuti è servito da un'unica API monolitica (il repository [Api](https://github.com/ChurchApps/Api)) i cui moduli sono montati su percorsi di base stabili — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` e `/mcp`.

## Come si incastra tutto

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

Tre frecce raccontano tutta la storia: una terza parte **chiama dentro** con un bearer token (chiave API o JWT OAuth, anche tramite `/mcp`); l'API **richiama fuori** tramite webhook firmati; e i provider di contenuti sono l'unico percorso di **contenuti in ingresso** in cui B1 stesso è il client OAuth che preleva i media da una fonte esterna.

## Il modello di autenticazione condiviso

Ogni credenziale — il JWT di accesso di un utente, un token di accesso OAuth o una chiave API — si risolve nello **stesso `Principal`** e viene verificata nello stesso modo. Non esiste un percorso di autenticazione "per integrazioni" separato; una credenziale con ambito è semplicemente indistinguibile da un utente con privilegi inferiori.

### Struttura del JWT

I token di accesso di B1 sono JWT HS256 generati in `Api/src/modules/membership/auth/AuthenticatedUser.ts`. L'insieme dei claim:

| Claim | Significato |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La persona a cui appartiene il token |
| `churchId` | L'unica chiesa in cui agisce questo token — il fulcro di tutto l'ambito dei dati |
| `personId` | Il record della persona all'interno di quella chiesa |
| `permissions` | Array piatto di stringhe di permesso RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Appartenenza e guida dei gruppi, per i controlli a livello di gruppo |
| `membershipStatus` | Ospite o membro, per il controllo dei servizi self-service |

Un token di accesso OAuth ha esattamente la stessa forma di un JWT di accesso: l'unica differenza è che il suo array `permissions` è stato **filtrato tramite gli scope concessi prima della firma** (`getCombinedApiJwt(...)`).

### Ambito per chiesa

`churchId` è un claim del token, non un parametro della richiesta, quindi una credenziale non può mai accedere a dati di altre chiese. Ogni query del repository filtra per il `churchId` del chiamante; una chiave API o un token OAuth è legato a esattamente una chiesa al momento della creazione.

### Permessi basati sui ruoli al confine

I controller limitano le azioni con `au.checkAccess(contentType, action)` sull'array `permissions` del token. Gli scope sono un **filtro, mai una concessione** (`Api/src/shared/auth/Scopes.ts`): il `SCOPE_CATALOG` associa ogni scope (ad esempio `people:read`, `donations:write`) alle coppie RBAC che consente, e `filterPermissionsByScopes()` le interseca con i permessi *attuali* della persona a ogni risoluzione. Ne consegue che:

- Revocare un permesso in B1Admin toglie l'accesso alla credenziale alla richiesta successiva — i token non si discostano mai dal ruolo.
- Uno scope può solo *rimuovere* permessi, quindi una credenziale con ambito non può mai ottenere privilegi di amministrazione del server o del dominio (tali permessi sono deliberatamente non associati ad alcuno scope).
- Le chiavi API hanno il prefisso `cak_`; `CustomAuthProvider.getUser()` lo riconosce, calcola l'hash del segreto e risolve di nuovo i permessi RBAC attuali della persona proprietaria a ogni chiamata.

Vedi [Chiavi API → Scope](../api/api-keys#scopes) per il catalogo completo.

## Riferimento delle superfici

### REST API

L'intera superficie del prodotto. Ogni endpoint autenticato accetta sia un JWT sia una chiave API `cak_…` nell'intestazione `Authorization: Bearer` — non esiste una tabella di percorsi dedicata solo alle chiavi o solo a OAuth. I moduli e i loro percorsi di base si trovano in `Api/src/modules/*`.

### Chiavi API

Un token di accesso personale `cak_<prefix>.<secret>`, creato in **B1Admin → Impostazioni → Sviluppatore → Chiavi API**. Viene memorizzato solo un hash SHA-256; la chiave in chiaro viene mostrata una sola volta. Gestito su `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Ideale per gli script di una singola chiesa e per connettori come Zapier, Make e Google Sheets. → **[Chiavi API](../api/api-keys)**

### OAuth 2.0 e App connesse

Per app multi-tenant che richiedono il consenso di ogni chiesa. Implementato in `Api/src/modules/membership/controllers/OAuthController.ts` sotto `/membership/oauth`. Il server supporta tre tipi di concessione:

- **Authorization Code** — `POST /oauth/authorize` (autenticato) restituisce un codice a breve durata; `POST /oauth/token` con `grant_type=authorization_code` lo scambia con un JWT di accesso (≈ 7 giorni) più un refresh token (≈ 90 giorni). I client pubblici (senza segreto) devono usare PKCE (solo `S256`): un `code_challenge` nell'autorizzazione e il `code_verifier` corrispondente nello scambio del token.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` emette un `user_code`; l'utente lo approva in B1Admin (`/oauth/device/approve`); il dispositivo interroga `/oauth/token` con la concessione device-code. Per TV, kiosk e CLI senza browser.
- **Refresh Token** — `grant_type=refresh_token` genera un nuovo token di accesso; i client pubblici (senza segreto) possono omettere il segreto.

I client pubblici possono anche registrarsi da soli con `POST /oauth/register` (registrazione dinamica del client RFC 7591); ricevono un `client_id` senza segreto, e i loro URI di reindirizzamento devono essere `https` o loopback.

Una **App connessa** è la vista, per l'amministratore della chiesa, di un token concesso; è elencata e revocabile in `/membership/oauth/connections`. Il controller ospita anche un ponte di **relay-session** OAuth (`/oauth/relay/*`) che permette a un dispositivo senza browser di completare l'accesso presso un fornitore *esterno*. → **[App connesse e OAuth](../api/connected-apps)**

### Webhook

L'unica superficie in uscita. Una chiesa iscrive un endpoint HTTPS pubblico a degli eventi; quando si verifica una modifica corrispondente, `WebhookDispatcher.emit(churchId, event, payload)` arricchisce i payload con soli id con i nomi visualizzati (`personName`, `groupName`, `formName` — le ricerche vengono eseguite solo quando una sottoscrizione corrisponde), registra una consegna, e un worker in background invia un envelope JSON firmato con ritentativi, backoff e nuova consegna. Il motore si trova in `Api/src/shared/webhooks/`, mentre le operazioni CRUD per chiesa sono sotto `/membership/webhooks` (`WebhookController.ts`). Un campo `connectorType` modifica la forma del corpo per Slack / Discord; il connettore `mailchimp` va oltre e gestisce l'intero scambio HTTP (metodo/URL/autenticazione per evento sull'API di Mailchimp, credenziali cifrate in `webhooks.connectorConfig`). → **[Webhook](../api/webhooks)**

### Server MCP

Un wrapper orientato all'IA su `/mcp` (`Api/src/modules/mcp/`). Tre strumenti generici — `list_endpoints`, `describe_endpoint`, `api_call` — espongono dinamicamente l'intera superficie REST a qualsiasi client MCP. L'autenticazione è lo stesso bearer token di tutto il resto. Per i client che accedono con OAuth (connettori personalizzati di claude.ai), una risposta 401 da `/mcp` include un'intestazione `WWW-Authenticate` che punta a `/.well-known/oauth-protected-resource`, e `/.well-known/oauth-authorization-server` pubblicizza gli endpoint `/membership/oauth`, la registrazione dinamica, PKCE e la pagina di consenso `/oauth` di B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` rientra nello stack Express in-process, così ogni regola di permesso e di ambito per chiesa continua ad applicarsi. → **[Server MCP](../api/mcp)**

### Provider di contenuti

Il percorso dei contenuti in ingresso, nel pacchetto separato `Packages/content-providers` (`@churchapps/content-providers`) anziché nell'API. Ogni provider implementa l'interfaccia `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, più gli hook di autenticazione — e si registra autonomamente in un registro `Map` (`src/providers/registry.ts`). Qui **B1 è il client OAuth**: un provider dichiara un `AuthType` tra `none`, `oauth_pkce`, `device_flow` o `form_login`, e gli helper condivisi (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) eseguono lato client il flusso PKCE / device verso la fonte esterna. Oggi sono disponibili undici provider — tra cui Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church e B1.church — che alimentano FreePlay e le app B1. → **[Provider di contenuti FreePlay](../freeplay-content-provider)**

**I piani annuali** utilizzano questo percorso. Un editore di curricoli (con `lessons.edit`) mantiene sequenze ordinate di settimane 1/2/3 nell'amministrazione di Lessons.church (tabelle `yearPlans` / `yearPlanWeeks` di LessonsApi, con `startMonth` facoltativo e `anchor` per settimana di `easter` / `christmas`); `GET /yearPlans/public` su LessonsApi serve in forma anonima i piani attivi, idratando il programma/studio/luogo di ogni settimana dall'albero delle lezioni. B1Admin, in **Servizio → Piani → Programma lezione → Applica piano annuale**, consuma quell'endpoint e scrive un piano DoingApi per ogni settimana inclusa (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). I piani con `startMonth` risolvono le settimane ancorate rispetto all'anno scelto (Pasqua tramite il computo gregoriano, Natale come la domenica precedente o uguale al 25 dicembre) e riempiono gli intervalli tra di esse; i piani senza `startMonth` associano comunque la settimana N a `startDate + (N−1)×7` giorni. Le settimane provenienti da provider OLF esterni o con un percorso incompleto vengono saltate al momento dell'applicazione; le chiese modificano i piani risultanti come qualsiasi altro, e FreePlay riproduce ciò che è presente nel piano.

## Riepilogo

| Superficie | Meccanismo di autenticazione | Direzione | Dove è implementata | Riferimento |
|---|---|---|---|---|
| REST API | JWT `Bearer` o chiave `cak_…` | In ingresso | `Api/src/modules/*` | [Chiavi API](../api/api-keys) |
| Chiavi API | Token `cak_` con hash SHA-256 | Credenziale | `Api/.../membership/controllers/ApiKeyController.ts` | [Chiavi API](../api/api-keys) |
| OAuth 2.0 / App connesse | Codice di autorizzazione (PKCE) · device · refresh → JWT; registrazione dinamica del client | In ingresso | `Api/.../membership/controllers/OAuthController.ts` | [App connesse](../api/connected-apps) |
| Webhook | Segreto per hook, firma HMAC-SHA256 | In uscita | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook](../api/webhooks) |
| Server MCP | JWT `Bearer`, JWT OAuth (scoperto tramite `/.well-known`), o chiave `cak_…` | In ingresso (IA) | `Api/src/modules/mcp/` | [Server MCP](../api/mcp) |
| Provider di contenuti | Per provider: nessuno / OAuth PKCE / device / form | Contenuti in ingresso | `Packages/content-providers/` | [Provider di contenuti](../freeplay-content-provider) |

## Connettori predefiniti

Invece di costruire tutto da zero, ChurchApps offre connettori pronti sopra le superfici descritte:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` di tipo webhook trasforma l'envelope standard in un messaggio di chat; si configura interamente in B1Admin, senza un account di terze parti.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — un `connectorType` `mailchimp` che sincronizza le persone con un pubblico Mailchimp e associa l'appartenenza a gruppi/liste a dei tag (`Api/src/shared/webhooks/MailchimpConnector.ts`). A differenza dei connettori di chat, invia proprie richieste autenticate per evento (upsert/archiviazione/tag) invece di inviare un POST a un URL fornito dalla chiesa; la chiave API e l'id del pubblico sono conservati cifrati in `webhooks.connectorConfig`. Unidirezionale, solo campi di unione standard.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — si attivano sugli eventi webhook e agiscono tramite la REST API; registrano il proprio webhook quando uno Zap/scenario viene attivato (richiede una chiave con `settings:write`). Il codice sorgente dell'app Zapier si trova nel repository `Integrations` in `zapier/` (Zapier CLI, distribuito con `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un add-on con autenticazione tramite chiave API che esporta Persone / Donazioni / Gruppi / Presenze su richiesta.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — client MCP puntati su `/mcp`.

Per il tuo codice, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) racchiude tutto questo: un client REST tipizzato, un client OAuth (auth-code / refresh / device flow) e un verificatore di webhook HMAC con middleware Express.

## Pagine correlate

- [Chiavi API](../api/api-keys) — la credenziale più semplice e il catalogo degli scope
- [App connesse e OAuth](../api/connected-apps) — flussi di consenso multi-tenant
- [Webhook](../api/webhooks) — il sistema di eventi in uscita
- [Server MCP](../api/mcp) — il wrapper per l'integrazione con l'IA
- [Provider di contenuti FreePlay](../freeplay-content-provider) — diventare una fonte di contenuti in ingresso
- [Integrazioni (per utenti finali)](/docs/b1-admin/integrations/) — guide alla configurazione dei connettori predefiniti
