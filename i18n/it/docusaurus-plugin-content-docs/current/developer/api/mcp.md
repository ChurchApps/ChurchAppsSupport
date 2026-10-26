---
title: "Server MCP"
---

# Server MCP

<div class="article-intro">

L'API B1 include un server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) disponibile su `/mcp`. Qualsiasi client AI compatibile con MCP -- i connettori personalizzati di claude.ai, Claude Code, Claude Desktop, l'OpenAI Agents SDK, Cursor o un client proprio -- può connettersi e chiamare l'API REST sottostante per conto di un utente autenticato della chiesa. È un wrapper sottile e generico: tre strumenti generici espongono dinamicamente l'intera superficie dell'API, invece di modellare a mano ogni endpoint, più uno strumento guida di dominio per il costruttore di siti web.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Una [chiave API B1](./api-keys) (`cak_…`) con gli ambiti che il client deve avere, oppure un client MCP in grado di accedere tramite OAuth (vedi [Scoperta OAuth](#oauth-discovery))
- Un host API B1 raggiungibile -- `https://api.churchapps.org` per le chiese ospitate, oppure la tua installazione
- Un client MCP. Vedi [Claude](/docs/b1-admin/integrations/claude) e [ChatGPT](/docs/b1-admin/integrations/chatgpt) per la configurazione lato utente finale

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspetto | Valore |
|---|---|
| **Percorso** | `/mcp` (relativo all'host API) |
| **Metodo** | Solo `POST` -- richiesta/risposta e streaming SSE avvengono sullo stesso endpoint |
| **Trasporto** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modello di sessione** | Senza stato. Viene creata una nuova istanza del server MCP per ogni richiesta -- nessun ID di sessione, nessuna ripresa |
| **Autenticazione** | Bearer token. Le chiavi API `cak_…` e i JWT B1 (inclusi i token di accesso OAuth) funzionano tutti; la risoluzione è la stessa di qualsiasi altro endpoint autenticato |

Una richiesta con header `Authorization` mancante o non valido restituisce:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

con HTTP 401 e un header `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, che i client con supporto OAuth seguono per avviare l'accesso.

Sull'API ospitata (produzione e demo), `/mcp` viene servito tramite un API Gateway HTTP API anziché tramite la REST API usata per gli altri endpoint. La REST API rinomina `WWW-Authenticate` in `x-amzn-remapped-www-authenticate` nelle risposte proxy di Lambda, il che lasciava client come ChatGPT con un 401 senza indicazioni su come avviare l'accesso; l'HTTP API trasmette l'header senza modifiche.

## Strumenti

Tre strumenti generici più una guida. Il modello usa `list_endpoints` per la scoperta, `describe_endpoint` per conoscere la forma di un payload, `api_call` per invocare effettivamente l'API e `describe_page_builder` quando il compito riguarda i contenuti del sito.

### `list_endpoints`

Restituisce l'inventario completo delle rotte REST registrate, filtrato da una sottostringa facoltativa e/o dal verbo HTTP. Ogni voce include il nome del controller e gli ambiti delle chiavi API più probabilmente necessari.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `filter` | string (facoltativo) | Sottostringa senza distinzione tra maiuscole e minuscole, confrontata con il percorso, es. `"people"` |
| `method` | enum (facoltativo) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** un documento JSON di questa forma

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

L'inventario viene costruito una sola volta all'avvio dell'API a partire dalla tabella delle rotte in esecuzione -- tutto ciò che puoi raggiungere con `curl` compare qui.

### `describe_endpoint`

Restituisce un breve riepilogo e, dove disponibili, un esempio di corpo della richiesta e di risposta predisposto manualmente per un endpoint.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `method` | string | Verbo HTTP |
| `path` | string | Percorso completo come restituito da `list_endpoints` |

**Output:** per gli endpoint con esempio, un esempio con `summary`, `requestBody` e `responseSample`. Per gli endpoint senza esempio, un messaggio di ripiego che invita il modello a chiamare prima `GET` per vedere la forma dei dati. Circa una dozzina di rotte molto usate (persone, gruppi, donazioni, presenze, fondi) hanno un esempio predisposto.

### `api_call`

Invoca l'endpoint REST scelto, in-process, attraverso lo stesso stack di middleware Express di una normale richiesta HTTP -- autenticazione, parsing del corpo, log di audit e ambito per chiesa si applicano tutti.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Percorso incluso il prefisso del modulo, es. `/membership/people` |
| `query` | object (facoltativo) | Oggetto piatto di parametri della query string |
| `body` | any (facoltativo) | Corpo JSON della richiesta -- tipicamente un array di oggetti del modello per `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Il risultato dello strumento è contrassegnato con `isError: true` per qualsiasi risposta con stato ≥ 400.

### `describe_page_builder`

L'unico strumento non generico: una guida statica e autosufficiente per costruire pagine del sito tramite gli endpoint `/content/*` -- il modello dati Page → Section → Element, il flusso di creazione, ogni `elementType` con la forma del suo `answersJSON`, le impostazioni a livello di sezione come i divisori di forma `dividerTop`/`dividerBottom`, e un esempio completo svolto. Non richiede input e riflette il catalogo degli elementi mantenuto nell'editor di B1Admin (vedi [Architettura del costruttore di siti](../architecture/website-builder)). Gli agenti dovrebbero chiamarlo una volta prima di creare o modificare i contenuti di una pagina, e poi agire tramite `api_call`.

## Modello di autorizzazione

La richiesta MCP stessa passa attraverso `CustomAuthProvider.getUser()` -- lo stesso percorso usato da ogni endpoint B1 autenticato. Un bearer `cak_…` viene risolto in un `Principal` i cui permessi sono l'RBAC corrente della persona che ha emesso la chiave, **intersecato** con gli ambiti concessi alla chiave. Questa intersezione viene ricalcolata a ogni richiesta, quindi:

- Rimuovere un ambito da una chiave (eliminandola e ricreandola) interrompe l'accesso alla chiamata successiva.
- Rimuovere un permesso dalla persona sottostante in B1Admin interrompe l'accesso alla chiamata successiva, anche se la chiave esiste ancora.

Per le chiamate `api_call` annidate, l'header `Authorization` originale viene copiato sulla richiesta sintetica, quindi `CustomAuthProvider` viene eseguito di nuovo e l'intersezione degli ambiti viene riapplicata a ogni chiamata. Non c'è alcuna cache dei token.

## Blocchi di percorso

Un piccolo insieme di rotte non è raggiungibile tramite `api_call`, anche con una chiave valida:

| Schema | Motivo |
|---|---|
| `/giving/donate/webhook/*` | Gli endpoint webhook dei provider si aspettano corpi grezzi con firma verificata da Stripe/PayPal -- non per chiamanti generici |
| `/membership/oauth/clients*` | La registrazione dei client OAuth è riservata agli operatori |
| `/membership/people/apiEmails` | Protetto dal `jwtSecret` dell'operatore, non dai permessi utente |
| Qualsiasi rotta che si aspetta `multipart/form-data` | I caricamenti di file non sono compatibili con JSON-RPC |

Un percorso bloccato restituisce un risultato dello strumento con `isError: true` e un messaggio descrittivo; la rotta sottostante non viene mai invocata.

## Limite di dimensione della risposta

Il corpo di ogni risposta `api_call` è limitato a **64 KB** di output catturato. Se una query supera il limite, la risposta contiene `"truncated": true` e il modello dovrebbe riprovare con parametri di query più restrittivi. Questo evita che una singola risposta dello strumento saturi la finestra di contesto del client.

## Limitazione della frequenza

Non esiste un limite di frequenza a livello applicativo su `/mcp`. La limitazione è demandata ad API Gateway / alla concorrenza di Lambda in produzione, e al reverse proxy in caso di installazioni self-hosted.

## Scoperta OAuth

Il server MCP pubblica i metadati OAuth 2.1, così che i client che si connettono solo a server scoperti tramite OAuth -- in particolare l'interfaccia "Add custom connector" di claude.ai -- possano far accedere un utente senza una chiave incollata. `/mcp` è la risorsa protetta, il [provider OAuth](./connected-apps) sotto `/membership/oauth` è il suo server di autorizzazione, e la pagina `/oauth` di B1Admin è la schermata di consenso.

| Endpoint | Scopo |
|---|---|
| `GET /.well-known/oauth-protected-resource` (anche `/.well-known/oauth-protected-resource/mcp`) | Metadati della risorsa protetta (RFC 9728): `resource` è `<api>/mcp`, `authorization_servers` è la radice dell'API, `scopes_supported` elenca ogni [ambito della chiave API](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadati del server di autorizzazione (RFC 8414): `authorization_endpoint` è `/oauth` di B1Admin, `token_endpoint` è `/membership/oauth/token`, `registration_endpoint` è `/membership/oauth/register` |
| `POST /membership/oauth/register` | Registrazione dinamica del client (RFC 7591) |

Il flusso eseguito da un client come claude.ai:

1. `POST /mcp` senza token restituisce 401 con l'header `WWW-Authenticate` che punta ai metadati della risorsa protetta.
2. Il client legge entrambi i documenti di metadati, quindi si registra con `POST /membership/oauth/register`, inviando `client_name`, `redirect_uris` e, facoltativamente, `scope`. Ogni client registrato autonomamente è un client **pubblico**: non viene emesso alcun segreto e la risposta contiene `token_endpoint_auth_method: "none"`. Gli URI di reindirizzamento devono essere `https`, oppure `http` su un indirizzo di loopback (`localhost`, `127.0.0.1`, `[::1]`); al massimo 10 per client. La registrazione è limitata a 20 all'ora per IP.
3. L'utente viene inviato alla pagina `/oauth` di B1Admin con `code_challenge` e `code_challenge_method=S256`. La pagina di consenso elenca in linguaggio semplice ogni ambito richiesto (oppure "Everything your B1 account can access" se non ne è stato richiesto nessuno), mostra l'host a cui l'utente verrà rimandato e segnala quando l'app si è registrata da sola. L'utente clicca **Allow**.
4. Il client scambia il codice presso `/membership/oauth/token` con `grant_type=authorization_code` e il suo `code_verifier`, e in seguito aggiorna il token con `grant_type=refresh_token`. Sono accettati sia i corpi form-encoded sia quelli JSON.
5. Il token di accesso risultante è un JWT B1 con ambito limitato, usato come bearer su `/mcp`.

Regole PKCE: viene accettato solo `S256`. Un client senza segreto deve inviare un `code_challenge` nell'autorizzazione e il `code_verifier` corrispondente nello scambio del token; i client confidenziali (con un segreto) possono usare anche il solo segreto. Gli URI di reindirizzamento devono corrispondere esattamente a un URI registrato.

I client che accettano un bearer token statico nella loro configurazione -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, codice personalizzato -- possono continuare a usare una chiave `cak_…`.

## Sviluppo locale

L'endpoint MCP viene montato insieme a tutto il resto quando l'API viene eseguita in locale:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

All'avvio, la riga di log `📡 MCP server ready at /mcp — N routes in inventory` conferma che l'inventario è stato costruito.

Per verificarlo, usa l'MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Nell'interfaccia dell'Inspector, punta a `http://localhost:8084/mcp` e imposta l'header `Authorization` su `Bearer cak_<prefix>.<secret>`. Chiama prima `list_endpoints`; dovresti vedere l'elenco completo delle rotte. Poi `api_call({ method: "GET", path: "/membership/people" })` dovrebbe restituire le persone di esempio del tuo ambiente locale.

## Struttura del codice

Il server MCP si trova in `src/modules/mcp/` nel repository Api. File principali:

| File | Scopo |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; collega un `StreamableHTTPServerTransport` per ogni richiesta e invia la sfida `WWW-Authenticate` su 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Serve i documenti di scoperta OAuth in `/.well-known` |
| `McpServer.ts` | Costruisce un `Server` MCP e registra i quattro strumenti |
| `RouteInventory.ts` | Analizza i metadati di inversify-express-utils all'avvio per elencare le rotte |
| `internalDispatch.ts` | `req`/`res` sintetici che rientrano nell'app Express in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Esempi predisposti di richiesta/risposta per gli endpoint più usati |

## Correlati

- [Chiavi API](./api-keys)
- [Webhook](./webhooks)
- [App collegate (OAuth)](./connected-apps)
- [Claude — configurazione per l'utente finale](/docs/b1-admin/integrations/claude)
- [ChatGPT — configurazione per l'utente finale](/docs/b1-admin/integrations/chatgpt)
