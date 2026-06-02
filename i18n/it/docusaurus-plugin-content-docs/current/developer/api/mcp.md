---
title: "Server MCP"
---

# Server MCP

<div class="article-intro">

L'API B1 fornisce un server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) a `/mcp`. Qualsiasi client consapevole di MCP — Claude Code, Claude Desktop, l'SDK OpenAI Agents, Cursor, o il tuo — può connettersi a esso e chiamare l'API REST sottostante per conto di un utente della chiesa autenticato. È un wrapper sottile e generico: ci sono tre strumenti e espongono l'intera superficie API dinamicamente piuttosto che modellare manualmente ogni endpoint.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Una [chiave API B1](./api-keys) (`cak_…`) con gli ambiti che il client dovrebbe avere
- Un host API B1 raggiungibile — `https://api.churchapps.org` per le chiese ospitate, o la tua implementazione
- Un client MCP. Vedi [Claude](/docs/b1-admin/integrations/claude) e [ChatGPT](/docs/b1-admin/integrations/chatgpt) per la configurazione dell'utente finale

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
| **Metodo** | Solo `POST` — richiesta/risposta e lo streaming SSE avvengono entrambi sullo stesso endpoint |
| **Trasporto** | [HTTP Streamable MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modello di sessione** | Senza stato. Una nuova istanza del server MCP viene costruita per richiesta — nessun id di sessione, nessuna ripresa |
| **Auth** | Token bearer. Sia le chiavi API `cak_…` che i JWT B1 funzionano; la risoluzione è la stessa di qualsiasi altro endpoint autenticato |

Una richiesta la cui intestazione `Authorization` manca o non è valida restituisce:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

con HTTP 401.

## Strumenti

Tre strumenti, tutti generici. Il modello utilizza `list_endpoints` per la scoperta, `describe_endpoint` per imparare una forma di payload, e `api_call` per invocare effettivamente l'API.

### `list_endpoints`

Restituisce l'inventario completo dei percorsi REST registrati, filtrato per una sottostringa opzionale e/o verbo HTTP. Ogni voce include il nome del controller e gli ambiti della chiave API più probabilmente necessari.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `filter` | stringa (opzionale) | Sottostringa senza distinzione tra maiuscole e minuscole abbinata al percorso, ad es. `"people"` |
| `method` | enum (opzionale) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** un documento JSON del form

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

L'inventario viene costruito una volta all'avvio dell'API dalla tabella delle route live — qualsiasi cosa tu possa raggiungere con `curl` appare qui.

### `describe_endpoint`

Restituisce un breve riepilogo più, dove disponibile, un corpo della richiesta curato a mano e un campione di risposta per un endpoint.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `method` | stringa | Verbo HTTP |
| `path` | stringa | Percorso completo come restituito da `list_endpoints` |

**Output:** per gli endpoint curati, un esempio con `summary`, `requestBody` e `responseSample`. Per gli endpoint non curati, un messaggio di fallback che istruisce il modello a chiamare `GET` prima per vedere la forma. Circa una dozzina di route ad alto traffico (persone, gruppi, donazioni, presenza, fondi) sono curate.

### `api_call`

Invoca l'endpoint REST scelto, in-process, attraverso lo stesso stack di middleware Express di una richiesta HTTP normale — autenticazione, analisi del corpo, registrazione di audit e ambito per chiesa si applicano tutti.

**Input:**

| Campo | Tipo | Descrizione |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | stringa | Percorso incluso qualsiasi prefisso di modulo, ad es. `/membership/people` |
| `query` | oggetto (opzionale) | Oggetto piatto di parametri della stringa di query |
| `body` | qualsiasi (opzionale) | Corpo della richiesta JSON — tipicamente un array di oggetti modello per `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Il risultato dello strumento è contrassegnato `isError: true` per qualsiasi risposta con stato ≥ 400.

## Modello di autenticazione

La richiesta MCP stessa viene eseguita attraverso `CustomAuthProvider.getUser()` — lo stesso percorso ogni endpoint B1 autenticato utilizza. Un bearer `cak_…` si risolve in un `Principal` i cui permessi sono l'RBAC attuale della persona emittente, **intersecato** con gli ambiti concessi della chiave. Questa intersezione viene ricalcolata ad ogni richiesta, quindi:

- Rimuovere un ambito da una chiave (eliminandola e ricreandola) taglia l'accesso sulla chiamata successiva.
- Rimuovere un permesso dalla persona sottostante in B1Admin taglia l'accesso sulla chiamata successiva, anche se la chiave esiste ancora.

Per le invocazioni annidate `api_call`, l'intestazione `Authorization` originale viene copiata sulla richiesta sintetica, quindi `CustomAuthProvider` viene eseguita di nuovo e l'intersezione di ambito viene riapplicata per chiamata. Non c'è memorizzazione nella cache del token.

## Elenco blocchi percorso

Una piccola serie di route non è raggiungibile tramite `api_call`, anche con una chiave valida:

| Pattern | Motivo |
|---|---|
| `/giving/donate/webhook/*` | Gli endpoint webhook del provider si aspettano corpi grezzi verificati da firma da Stripe/PayPal — non da chiamanti generali |
| `/membership/oauth/clients*` | La registrazione del client OAuth è solo per operatori |
| `/membership/people/apiEmails` | Controllato dal `jwtSecret` dell'operatore, non dai permessi dell'utente |
| Qualsiasi route che si aspetta `multipart/form-data` | I caricamenti di file non sono JSON-RPC-friendly |

Un percorso bloccato restituisce un risultato dello strumento `isError: true` con un messaggio descrittivo; l'underlying route non viene mai invocata.

## Limite della dimensione della risposta

Ogni corpo della risposta `api_call` è limitato a **64 KB** di output acquisito. Se una query supera il limite, la risposta porta `"truncated": true` e il modello dovrebbe riprovare con parametri di query più ristretti. Questo impedisce a una singola risposta dello strumento di far esplodere la finestra di contesto del client.

## Limitazione della velocità

Non c'è limite di velocità a livello di applicazione su `/mcp`. La limitazione è rinviata a API Gateway / concorrenza Lambda in produzione, e a tutto quello che il tuo reverse proxy applica negli spiegamenti auto-ospitati.

## Scoperta OAuth

Il server MCP **non** pubblica i metadati OAuth 2.1 (`/.well-known/oauth-authorization-server`, registrazione del client dinamico, flusso PKCE). I client che richiedono server MCP scoperti da OAuth — notevolmente l'interfaccia utente "Aggiungi connettore personalizzato" di Claude.ai e la funzionalità "Connettori" di ChatGPT — non possono connettersi senza quella superficie.

I client che accettano un token bearer statico nella loro configurazione — Claude Code, Claude Desktop, SDK OpenAI Agents, Cursor, codice personalizzato — funzionano oggi. L'[OAuthController](/docs/developer/api/connected-apps) esistente già emette token tramite authorization-code + PKCE per app di terze parti; uno strato di scoperta conforme alle specifiche MCP in cima ad esso chiuderebbe il divario.

## Sviluppo locale

L'endpoint MCP si monta insieme a tutto il resto quando l'API viene eseguita localmente:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

All'avvio la riga di log `📡 MCP server ready at /mcp — N routes in inventory` conferma che l'inventario è stato costruito.

Sottoponi a sonda con MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Nell'interfaccia utente dell'Inspector, indirizzalo a `http://localhost:8084/mcp` e impostare l'intestazione `Authorization` su `Bearer cak_<prefix>.<secret>`. Chiama `list_endpoints` per primo; dovresti vedere l'elenco completo delle route. Quindi `api_call({ method: "GET", path: "/membership/people" })` dovrebbe restituire le tue persone di seed locali.

## Layout del codice

Il server MCP risiede a `src/modules/mcp/` nel repo Api. File notevoli:

| File | Scopo |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; cablaggio `StreamableHTTPServerTransport` per richiesta |
| `McpServer.ts` | Costruisce un MCP `Server`, registra i tre strumenti |
| `RouteInventory.ts` | Cammina nei metadati inversify-express-utils all'avvio per enumerare le route |
| `internalDispatch.ts` | Sintetico `req`/`res` che rientra nell'app Express in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts` |
| `examples.ts` | Campioni di richiesta/risposta curati a mano per endpoint ad alto traffico |

## Correlato

- [Chiavi API](./api-keys)
- [Webhook](./webhooks)
- [App connesse (OAuth)](./connected-apps)
- [Claude — configurazione dell'utente finale](/docs/b1-admin/integrations/claude)
- [ChatGPT — configurazione dell'utente finale](/docs/b1-admin/integrations/chatgpt)
