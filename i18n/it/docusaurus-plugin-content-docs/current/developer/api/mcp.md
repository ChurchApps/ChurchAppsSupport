---
title: "MCP Server"
---

# MCP Server

<div class="article-intro">

L'API B1 offre un server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) all'indirizzo `/mcp`. Qualsiasi client AI compatibile con MCP — Claude Code, Claude Desktop, l'OpenAI Agents SDK, Cursor, o uno realizzato da te — può connettersi e chiamare l'API REST sottostante per conto di un utente della chiesa autenticato. È un wrapper sottile e generico: tre strumenti generici espongono dinamicamente l'intera superficie dell'API invece di modellare a mano ogni endpoint, più uno strumento guida di dominio per il website builder.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Una [chiave API B1](./api-keys) (`cak_…`) con gli ambiti che il client dovrebbe avere
- Un host API B1 raggiungibile — `https://api.churchapps.org` per le chiese ospitate, oppure il tuo deployment
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
| **Path** | `/mcp` (relativo all'host API) |
| **Method** | solo `POST` — richiesta/risposta e streaming SSE avvengono entrambi sullo stesso endpoint |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Session model** | Stateless. Per ogni richiesta viene costruita una nuova istanza del server MCP — nessun id di sessione, nessuna ripresa |
| **Auth** | Token bearer. Sia le chiavi API `cak_…` sia i JWT B1 funzionano; la risoluzione è la stessa di qualsiasi altro endpoint autenticato |

Una richiesta la cui intestazione `Authorization` è mancante o non valida restituisce:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

con HTTP 401.

## Strumenti

Tre strumenti generici più una guida. Il modello usa `list_endpoints` per la scoperta, `describe_endpoint` per apprendere la forma di un payload, `api_call` per invocare effettivamente l'API, e `describe_page_builder` quando l'attività riguarda i contenuti del sito web.

### `list_endpoints`

Restituisce l'inventario completo delle rotte REST registrate, filtrato per una sottostringa facoltativa e/o un verbo HTTP. Ogni voce include il nome del controller e gli ambiti di chiave API più probabilmente necessari.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `filter` | string (optional) | Sottostringa case-insensitive confrontata con il percorso, ad es. `"people"` |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

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

L'inventario viene costruito una sola volta all'avvio dell'API a partire dalla tabella delle rotte live — tutto ciò che puoi raggiungere con `curl` compare qui.

### `describe_endpoint`

Restituisce un breve riepilogo più, dove disponibile, un corpo di richiesta e un esempio di risposta curati a mano per un endpoint.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `method` | string | Verbo HTTP |
| `path` | string | Percorso completo come restituito da `list_endpoints` |

**Output:** per gli endpoint curati, un esempio con `summary`, `requestBody` e `responseSample`. Per gli endpoint non curati, un messaggio di fallback che istruisce il modello a chiamare prima `GET` per vedere la forma. Circa una dozzina di rotte ad alto traffico (persone, gruppi, donazioni, presenze, fondi) sono curate.

### `api_call`

Invoca l'endpoint REST scelto, in-process, attraverso lo stesso stack di middleware Express di una normale richiesta HTTP — autenticazione, parsing del corpo, audit logging e scoping per chiesa si applicano tutti.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Percorso incluso qualsiasi prefisso di modulo, ad es. `/membership/people` |
| `query` | object (optional) | Oggetto piatto di parametri della query string |
| `body` | any (optional) | Corpo della richiesta JSON — tipicamente un array di oggetti modello per `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Il risultato dello strumento è contrassegnato come `isError: true` per qualsiasi risposta con stato ≥ 400.

### `describe_page_builder`

L'unico strumento non generico: una guida statica e autonoma per la costruzione di pagine web attraverso gli endpoint `/content/*` — il modello dati Page → Section → Element, il flusso di creazione, ogni `elementType` con la sua forma di `answersJSON`, impostazioni a livello di sezione come i divisori a forma `dividerTop`/`dividerBottom`, e un esempio completo end-to-end. Non richiede input e rispecchia il catalogo degli elementi mantenuto nell'editor di B1Admin (vedi [Architettura del Website Builder](../architecture/website-builder)). Ci si aspetta che gli agenti lo chiamino una volta prima di creare o modificare i contenuti della pagina, e poi agiscano tramite `api_call`.

## Modello di autenticazione

La richiesta MCP stessa passa attraverso `CustomAuthProvider.getUser()` — lo stesso percorso usato da ogni endpoint B1 autenticato. Un bearer `cak_…` si risolve in un `Principal` i cui permessi sono l'RBAC attuale della persona emittente, **intersecato** con gli ambiti concessi dalla chiave. Questa intersezione viene ricalcolata ad ogni richiesta, quindi:

- Rimuovere un ambito da una chiave (eliminandola e ricreandola) taglia l'accesso alla chiamata successiva.
- Rimuovere un permesso dalla persona sottostante in B1Admin taglia l'accesso alla chiamata successiva, anche se la chiave esiste ancora.

Per le invocazioni annidate di `api_call`, l'intestazione `Authorization` originale viene copiata sulla richiesta sintetica, così `CustomAuthProvider` viene eseguito di nuovo e l'intersezione degli ambiti viene riapplicata per ogni chiamata. Non c'è caching dei token.

## Blocklist dei percorsi

Un piccolo insieme di rotte non è raggiungibile tramite `api_call`, nemmeno con una chiave valida:

| Pattern | Motivo |
|---|---|
| `/giving/donate/webhook/*` | Gli endpoint webhook dei provider si aspettano corpi grezzi, verificati tramite firma, da Stripe/PayPal — non da chiamanti generici |
| `/membership/oauth/clients*` | La registrazione dei client OAuth è riservata all'operatore |
| `/membership/people/apiEmails` | Protetto dal `jwtSecret` dell'operatore, non dai permessi dell'utente |
| Qualsiasi rotta che si aspetta `multipart/form-data` | Il caricamento di file non è compatibile con JSON-RPC |

Un percorso bloccato restituisce un risultato dello strumento `isError: true` con un messaggio descrittivo; la rotta sottostante non viene mai invocata.

## Limite alla dimensione della risposta

Ogni corpo di risposta di `api_call` è limitato a **64 KB** di output catturato. Se una query supera il limite, la risposta porta `"truncated": true` e ci si aspetta che il modello riprovi con parametri di query più ristretti. Questo evita che una singola risposta dello strumento saturi la finestra di contesto del client.

## Limitazione della frequenza

Non c'è un limite di frequenza a livello applicativo su `/mcp`. Il throttling è demandato alla concorrenza di API Gateway / Lambda in produzione, e a qualunque cosa applichi il tuo reverse proxy nei deployment self-hosted.

## Scoperta OAuth

Il server MCP **non** annuncia metadati OAuth 2.1 (`/.well-known/oauth-authorization-server`, registrazione dinamica dei client, flusso PKCE). I client che richiedono server MCP scopribili tramite OAuth — in particolare l'interfaccia "Add custom connector" di Claude.ai e la funzione "Connectors" di ChatGPT — non possono connettersi senza quella superficie.

I client che accettano un token bearer statico nella loro configurazione — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, codice personalizzato — funzionano già oggi. L'[OAuthController](/docs/developer/api/connected-apps) esistente emette già token tramite authorization-code + PKCE per app di terze parti; un livello di scoperta conforme alla specifica MCP costruito sopra di esso colmerebbe il divario.

## Sviluppo locale

L'endpoint MCP si monta insieme a tutto il resto quando l'API viene eseguita localmente:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

All'avvio, la riga di log `📡 MCP server ready at /mcp — N routes in inventory` conferma che l'inventario è stato costruito.

Verificalo con l'MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Nell'interfaccia dell'Inspector, puntalo a `http://localhost:8084/mcp` e imposta l'intestazione `Authorization` su `Bearer cak_<prefix>.<secret>`. Chiama prima `list_endpoints`; dovresti vedere l'elenco completo delle rotte. Poi `api_call({ method: "GET", path: "/membership/people" })` dovrebbe restituire le tue persone seed locali.

## Struttura del codice

Il server MCP si trova in `src/modules/mcp/` nel repository Api. File degni di nota:

| File | Scopo |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; collega `StreamableHTTPServerTransport` per ogni richiesta |
| `McpServer.ts` | Costruisce un `Server` MCP, registra i quattro strumenti |
| `RouteInventory.ts` | Attraversa i metadati di inversify-express-utils all'avvio per enumerare le rotte |
| `internalDispatch.ts` | `req`/`res` sintetici che rientrano nell'app Express in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Esempi curati di richiesta/risposta per gli endpoint ad alto traffico |

## Correlati

- [Chiavi API](./api-keys)
- [Webhook](./webhooks)
- [App connesse (OAuth)](./connected-apps)
- [Claude — configurazione lato utente finale](/docs/b1-admin/integrations/claude)
- [ChatGPT — configurazione lato utente finale](/docs/b1-admin/integrations/chatgpt)
