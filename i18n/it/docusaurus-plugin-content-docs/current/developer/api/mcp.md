---
title: "Server MCP"
---

# Server MCP {#mcp-server}

<div class="article-intro">

L'API B1 include un server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) su `/mcp`. Qualsiasi client AI compatibile con MCP — connettori personalizzati di claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor o un client proprio — può connettersi e chiamare l'API REST sottostante per conto di un utente autenticato della chiesa. È un wrapper leggero e generico: tre strumenti generici espongono dinamicamente l'intera superficie dell'API invece di modellare a mano ogni endpoint, più uno strumento di guida di dominio per il website builder.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Una [chiave API B1](./api-keys) (`cak_…`) con gli scope che il client deve avere, oppure un client MCP che possa accedere con OAuth (vedi [Scoperta OAuth](#oauth-discovery))
- Un host API B1 raggiungibile — `https://api.churchapps.org` per le chiese ospitate, oppure la tua installazione
- Un client MCP. Vedi [Claude](/docs/b1-admin/integrations/claude) e [ChatGPT](/docs/b1-admin/integrations/chatgpt) per la configurazione per gli utenti finali

</div>

## Endpoint {#endpoint}

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspetto | Valore |
|---|---|
| **Percorso** | `/mcp` (relativo all'host API) |
| **Metodo** | Solo `POST` — richiesta/risposta e streaming SSE avvengono sullo stesso endpoint |
| **Trasporto** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modello di sessione** | Senza stato. Un'istanza nuova del server MCP viene creata per ogni richiesta — nessun ID di sessione, nessuna ripresa |
| **Auth** | Bearer token. Le chiavi API `cak_…` e i JWT B1 (inclusi i token di accesso OAuth) funzionano tutti; la risoluzione è la stessa di qualsiasi altro endpoint autenticato |

Una richiesta con header `Authorization` mancante o non valido restituisce:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

con HTTP 401 e un header `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, che i client compatibili con OAuth seguono per avviare l'accesso.

## Strumenti {#tools}

Tre strumenti generici più una guida. Il modello usa `list_endpoints` per la scoperta, `describe_endpoint` per conoscere la forma di un payload, `api_call` per invocare effettivamente l'API e `describe_page_builder` quando il compito riguarda i contenuti del sito.

### `list_endpoints` {#list_endpoints}

Restituisce l'inventario completo delle rotte REST registrate, filtrato per una sottostringa opzionale e/o per verbo HTTP. Ogni voce include il nome del controller e gli scope della chiave API più probabilmente necessari.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `filter` | stringa (facoltativo) | Sottostringa senza distinzione tra maiuscole e minuscole cercata nel percorso, ad esempio `"people"` |
| `method` | enum (facoltativo) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** un documento JSON della forma

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

L'inventario viene costruito una sola volta all'avvio dell'API a partire dalla tabella delle rotte attiva — tutto ciò che puoi raggiungere con `curl` compare qui.

### `describe_endpoint` {#describe_endpoint}

Restituisce un breve riepilogo e, quando disponibili, un corpo di richiesta e un esempio di risposta redatti a mano per un endpoint.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `method` | stringa | Verbo HTTP |
| `path` | stringa | Percorso completo così come restituito da `list_endpoints` |

**Output:** per gli endpoint curati, un esempio con `summary`, `requestBody` e `responseSample`. Per gli endpoint non curati, un messaggio di ripiego che invita il modello a chiamare prima `GET` per vedere la forma. Una dozzina di rotte molto usate (persone, gruppi, donazioni, presenze, fondi) sono curate.

### `api_call` {#api_call}

Invoca l'endpoint REST scelto, in-process, attraverso lo stesso stack di middleware Express di una normale richiesta HTTP — autenticazione, parsing del body, log di audit e limitazione alla chiesa si applicano tutti.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | stringa | Percorso completo, incluso il prefisso del modulo, ad esempio `/membership/people` |
| `query` | oggetto (facoltativo) | Oggetto piatto di parametri della query string |
| `body` | qualsiasi (facoltativo) | Corpo JSON della richiesta — tipicamente un array di oggetti del modello per `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* la risposta JSON del controller */ ]
}
```

Il risultato dello strumento è contrassegnato con `isError: true` per ogni risposta con stato ≥ 400.

### `describe_page_builder` {#describe_page_builder}

L'unico strumento non generico: una guida statica e autonoma per costruire le pagine del sito tramite gli endpoint `/content/*` — il modello dati Pagina → Sezione → Elemento, il flusso di creazione, ogni `elementType` con la forma del suo `answersJSON`, le impostazioni a livello di sezione come le forme dei separatori `dividerTop`/`dividerBottom`, e un esempio completo svolto. Non richiede input e riflette il catalogo degli elementi mantenuto nell'editor B1Admin (vedi [Architettura del Website Builder](../architecture/website-builder)). Gli agenti dovrebbero chiamarlo una volta prima di creare o modificare contenuti di pagina, poi agire tramite `api_call`.

## Modello di autenticazione {#auth-model}

La richiesta MCP passa attraverso `CustomAuthProvider.getUser()` — lo stesso percorso usato da ogni endpoint B1 autenticato. Un bearer `cak_…` viene risolto in un `Principal` i cui permessi sono l'RBAC attuale della persona che ha emesso la chiave, **intersecato** con gli scope concessi alla chiave. Questa intersezione viene ricalcolata a ogni richiesta, quindi:

- Rimuovere uno scope da una chiave (eliminandola e ricreandola) toglie l'accesso alla chiamata successiva.
- Rimuovere un permesso alla persona sottostante in B1Admin toglie l'accesso alla chiamata successiva, anche se la chiave esiste ancora.

Per le chiamate `api_call` annidate, l'header `Authorization` originale viene copiato sulla richiesta sintetica, quindi `CustomAuthProvider` viene eseguito di nuovo e l'intersezione degli scope viene riapplicata a ogni chiamata. Non c'è alcuna cache dei token.

## Lista di blocco dei percorsi {#path-blocklist}

Un piccolo insieme di rotte non è raggiungibile tramite `api_call`, nemmeno con una chiave valida:

| Schema | Motivo |
|--------|--------|
| `/giving/donate/webhook/*` | Gli endpoint webhook dei provider si aspettano corpi grezzi con firma verificata da Stripe/PayPal — non per chiamanti generici |
| `/membership/oauth/clients*` | La registrazione dei client OAuth è riservata agli operatori |
| `/membership/people/apiEmails` | Protetto dal `jwtSecret` dell'operatore, non dai permessi utente |
| Qualsiasi rotta che si aspetta `multipart/form-data` | Il caricamento di file non è compatibile con JSON-RPC |

Un percorso bloccato restituisce un risultato dello strumento con `isError: true` e un messaggio descrittivo; la rotta sottostante non viene mai invocata.

## Limite di dimensione della risposta {#response-size-cap}

Il body della risposta di ogni `api_call` è limitato a **64 KB** di output catturato. Se una query supera il limite, la risposta contiene `"truncated": true` e il modello dovrebbe riprovare con parametri di query più restrittivi. Questo impedisce che una singola risposta dello strumento saturi la finestra di contesto del client.

## Limitazione della frequenza {#rate-limiting}

Su `/mcp` non esiste un limite di frequenza a livello applicativo. In produzione la limitazione è demandata alla concorrenza di API Gateway / Lambda, mentre nelle installazioni self-hosted è affidata a ciò che impone il tuo reverse proxy.

## Scoperta OAuth {#oauth-discovery}

Il server MCP pubblica i metadati OAuth 2.1 affinché i client che si connettono solo a server scoperti tramite OAuth — in particolare la UI "Aggiungi connettore personalizzato" di Claude.ai — possano far accedere un utente senza una chiave incollata. `/mcp` è la risorsa protetta, il [provider OAuth](./connected-apps) esistente sotto `/membership/oauth` è il suo server di autorizzazione, e la pagina `/oauth` di B1Admin è la schermata di consenso.

| Endpoint | Scopo |
|---|---|
| `GET /.well-known/oauth-protected-resource` (anche `/.well-known/oauth-protected-resource/mcp`) | Metadati della risorsa protetta (RFC 9728): `resource` è `<api>/mcp`, `authorization_servers` è la radice dell'API, `scopes_supported` elenca ogni [scope della chiave API](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadati del server di autorizzazione (RFC 8414): `authorization_endpoint` è `/oauth` di B1Admin, `token_endpoint` è `/membership/oauth/token`, `registration_endpoint` è `/membership/oauth/register` |
| `POST /membership/oauth/register` | Registrazione dinamica del client (RFC 7591) |

Il flusso eseguito da un client come claude.ai:

1. `POST /mcp` senza token restituisce 401 con l'header `WWW-Authenticate` che punta ai metadati della risorsa protetta.
2. Il client legge entrambi i documenti di metadati, poi si registra con `POST /membership/oauth/register`, inviando `client_name`, `redirect_uris` e facoltativamente `scope`. Ogni client che si registra da solo è un client **pubblico**: non viene emesso alcun segreto e la risposta contiene `token_endpoint_auth_method: "none"`. Gli URI di reindirizzamento devono essere `https`, oppure `http` su un indirizzo di loopback (`localhost`, `127.0.0.1`, `[::1]`); al massimo 10 per client. La registrazione è limitata a 20 all'ora per IP.
3. L'utente viene inviato alla pagina `/oauth` di B1Admin con `code_challenge` e `code_challenge_method=S256`. La pagina di consenso elenca ogni scope richiesto in linguaggio semplice (oppure "Tutto ciò a cui il tuo account B1 può accedere" se non ne è stato richiesto nessuno), mostra l'host a cui l'utente verrà rimandato e segnala quando l'app si è registrata da sola. L'utente clicca **Consenti**.
4. Il client scambia il codice all'endpoint `/membership/oauth/token` con `grant_type=authorization_code` e il proprio `code_verifier`, e in seguito aggiorna il token con `grant_type=refresh_token`. Sono accettati sia corpi codificati come form sia corpi JSON.
5. Il token di accesso risultante è un JWT B1 limitato agli scope, usato come bearer su `/mcp`.

Regole PKCE: viene accettato solo `S256`. Un client senza segreto deve inviare un `code_challenge` nell'autorizzazione e il `code_verifier` corrispondente nello scambio del token; i client riservati (con un segreto) possono usare anche solo il segreto. Gli URI di reindirizzamento devono corrispondere esattamente a un URI registrato.

I client che accettano un bearer token statico nella loro configurazione — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, codice personalizzato — possono continuare a usare una chiave `cak_…`.

## Sviluppo locale {#local-development}

L'endpoint MCP viene montato insieme a tutto il resto quando l'API gira in locale:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

All'avvio, la riga di log `📡 MCP server ready at /mcp — N routes in inventory` conferma che l'inventario è stato costruito.

Verificalo con MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Nell'interfaccia di Inspector, puntalo a `http://localhost:8084/mcp` e imposta l'header `Authorization` su `Bearer cak_<prefix>.<secret>`. Chiama prima `list_endpoints`; dovresti vedere l'elenco completo delle rotte. Poi `api_call({ method: "GET", path: "/membership/people" })` dovrebbe restituire le persone di esempio del tuo ambiente locale.

## Struttura del codice {#code-layout}

Il server MCP si trova in `src/modules/mcp/` nel repository Api. File principali:

| File | Scopo |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; collega un `StreamableHTTPServerTransport` per ogni richiesta e invia la sfida `WWW-Authenticate` in caso di 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Serve i documenti di scoperta OAuth `/.well-known` |
| `McpServer.ts` | Costruisce un `Server` MCP e registra i quattro strumenti |
| `RouteInventory.ts` | Analizza i metadati di inversify-express-utils all'avvio per enumerare le rotte |
| `internalDispatch.ts` | `req`/`res` sintetici che rientrano nell'app Express in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Esempi curati di richiesta/risposta per gli endpoint molto usati |

## Correlati {#related}

- [Chiavi API](./api-keys)
- [Webhook](./webhooks)
- [App connesse (OAuth)](./connected-apps)
- [Claude — configurazione per l'utente finale](/docs/b1-admin/integrations/claude)
- [ChatGPT — configurazione per l'utente finale](/docs/b1-admin/integrations/chatgpt)
