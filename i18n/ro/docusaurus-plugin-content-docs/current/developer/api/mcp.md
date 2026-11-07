---
title: "Server MCP"
description: "Configurați accesul MCP la API-ul B1 pentru ca clienții AI precum Claude Code, Cursor sau Claude Desktop să poată apela endpoint-urile de date ale bisericii, folosind chei API sau autentificare OAuth."
---

# Server MCP

<div class="article-intro">

API-ul B1 include un server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) la calea `/mcp`. Orice client AI compatibil cu MCP (conectori personalizați din claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor sau propriul tău client) se poate conecta la el și poate apela API-ul REST de bază în numele unui utilizator de biserică autentificat. Este un înveliș subțire și generic: trei instrumente generice expun dinamic întreaga suprafață a API-ului, în loc să modeleze manual fiecare endpoint, plus un instrument de ghid de domeniu pentru constructorul de site-uri.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- O [cheie API B1](./api-keys.md) (`cak_…`) cu permisiunile (scopes) pe care trebuie să le aibă clientul, sau un client MCP care se poate autentifica prin OAuth (vezi [Descoperirea OAuth](#oauth-discovery))
- O gazdă API B1 accesibilă: `https://api.churchapps.org` pentru bisericile găzduite sau propria ta instalare
- Un client MCP. Consultă [Claude](/docs/b1-admin/integrations/claude) și [ChatGPT](/docs/b1-admin/integrations/chatgpt) pentru configurarea pentru utilizatorii finali

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspect | Valoare |
|---|---|
| **Cale** | `/mcp` (relativ la gazda API) |
| **Metodă** | Doar `POST`. Cererea/răspunsul și streaming-ul SSE au loc pe același endpoint |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Model de sesiune** | Fără stare (stateless). O instanță nouă de server MCP este construită pentru fiecare cerere, fără ID de sesiune și fără reluare |
| **Autentificare** | Token Bearer. Cheile API `cak_…` și JWT-urile B1 (inclusiv token-urile de acces OAuth) funcționează; rezoluția este aceeași ca la orice alt endpoint autentificat |

O cerere al cărei antet `Authorization` lipsește sau este invalid returnează:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

cu HTTP 401 și un antet `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, pe care clienții compatibili cu OAuth îl urmează pentru a începe autentificarea.

Pe API-ul găzduit (producție și demo), `/mcp` este servit printr-un API Gateway HTTP API, nu prin API-ul REST folosit pentru restul endpoint-urilor. API-ul REST redenumește `WWW-Authenticate` în `x-amzn-remapped-www-authenticate` în răspunsurile proxy Lambda, ceea ce i-a lăsat pe clienți precum ChatGPT cu un 401 gol și fără posibilitatea de a începe autentificarea. API-ul HTTP transmite antetul neschimbat.

## Instrumente

Trei instrumente generice plus un ghid. Modelul folosește `list_endpoints` pentru descoperire, `describe_endpoint` pentru a afla structura unui payload, `api_call` pentru a invoca efectiv API-ul și `describe_page_builder` atunci când sarcina implică conținutul site-ului.

### `list_endpoints`

Returnează inventarul complet al rutelor REST înregistrate, filtrat printr-un subșir opțional și/sau un verb HTTP. Fiecare intrare include numele controller-ului și scopurile cheii API cel mai probabil necesare.

**Intrare:**

| Câmp | Tip | Descriere |
|---|---|---|
| `filter` | string (opțional) | Subșir insensibil la majuscule, comparat cu calea, de exemplu `"people"` |
| `method` | enum (opțional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Ieșire:** un document JSON de forma:

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

Inventarul este construit o singură dată la pornirea API-ului, din tabela de rute activă. Orice poți accesa cu `curl` apare aici.

### `describe_endpoint`

Returnează un rezumat scurt plus, acolo unde există, un corp de cerere și un exemplu de răspuns, scrise manual, pentru un endpoint.

**Intrare:**

| Câmp | Tip | Descriere |
|---|---|---|
| `method` | string | Verbul HTTP |
| `path` | string | Calea completă, așa cum o returnează `list_endpoints` |

**Ieșire:** pentru endpoint-urile cu exemple, un obiect cu `summary`, `requestBody` și `responseSample`. Pentru endpoint-urile fără exemple, un mesaj de rezervă care îi cere modelului să apeleze mai întâi `GET` pentru a vedea structura. Aproximativ o duzină de rute cu trafic mare (persoane, grupuri, donații, prezențe, fonduri) au exemple.

### `api_call`

Invocă endpoint-ul REST ales, în proces, prin același stack de middleware Express ca o cerere HTTP normală. Autentificarea, parsarea corpului, jurnalizarea auditului și izolarea pe biserică se aplică toate.

**Intrare:**

| Câmp | Tip | Descriere |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Calea, inclusiv prefixul modulului, de exemplu `/membership/people` |
| `query` | object (opțional) | Obiect plat cu parametrii din șirul de interogare |
| `body` | orice (opțional) | Corpul JSON al cererii, de obicei un array de obiecte model pentru `POST` |

**Ieșire:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Rezultatul instrumentului este marcat cu `isError: true` pentru orice răspuns cu codul de stare ≥ 400.

### `describe_page_builder`

Singurul instrument non-generic: un ghid static, autonom, pentru construirea paginilor de site prin endpoint-urile `/content/*`. Acesta acoperă modelul de date Pagină → Secțiune → Element, fluxul de creare, fiecare `elementType` cu forma `answersJSON` a sa, setările la nivel de secțiune precum separatoarele de formă `dividerTop`/`dividerBottom` și un exemplu complet, pas cu pas. Nu primește niciun input și reflectă catalogul de elemente întreținut în editorul B1Admin (vezi [Arhitectura constructorului de site-uri](../architecture/website-builder.md)). Agenții trebuie să îl apeleze o singură dată înainte de a crea sau edita conținutul paginilor, apoi să acționeze prin `api_call`.

## Modelul de autentificare

Cererea MCP în sine trece prin `CustomAuthProvider.getUser()`, aceeași cale pe care o folosește fiecare endpoint B1 autentificat. Un token Bearer `cak_…` se rezolvă într-un `Principal` ale cărui permisiuni sunt RBAC-ul curent al persoanei care a emis cheia, **intersectat** cu scopurile acordate cheii. Această intersecție este recalculată la fiecare cerere, deci:

- Eliminarea unui scop dintr-o cheie (ștergând-o și recreând-o) întrerupe accesul la următorul apel.
- Eliminarea unei permisiuni de la persoana de bază din B1Admin întrerupe accesul la următorul apel, chiar dacă cheia încă există.

Pentru invocările `api_call` imbricate, antetul `Authorization` original este copiat pe cererea sintetică, astfel încât `CustomAuthProvider` rulează din nou, iar intersecția scopurilor se reaplică la fiecare apel. Nu există cache pentru token-uri.

## Lista de rute blocate

Un set mic de rute nu este accesibil prin `api_call`, chiar și cu o cheie validă:

| Model | Motiv |
|---|---|
| `/giving/donate/webhook/*` | Endpoint-urile webhook ale furnizorilor așteaptă corpuri brute, cu semnătură verificată, de la Stripe/PayPal, nu de la apelanți generali |
| `/membership/oauth/clients*` | Înregistrarea clienților OAuth este rezervată operatorului |
| `/membership/people/apiEmails` | Protejată de `jwtSecret`-ul operatorului, nu de permisiunile utilizatorului |
| Orice rută care așteaptă `multipart/form-data` | Încărcările de fișiere nu sunt compatibile cu JSON-RPC |

O cale blocată returnează un rezultat de instrument cu `isError: true` și un mesaj descriptiv. Ruta de bază nu este niciodată invocată.

## Limita dimensiunii răspunsului

Fiecare corp de răspuns `api_call` este limitat la **64 KB** de ieșire capturată. Dacă o interogare depășește limita, răspunsul conține `"truncated": true`, iar modelul trebuie să reîncerce cu parametri de interogare mai restrictivi. Aceasta împiedică un singur răspuns de instrument să depășească fereastra de context a clientului.

## Limitarea ratei

Nu există o limită de rată la nivel de aplicație pe `/mcp`. Limitarea este lăsată pe seama concurenței API Gateway / Lambda în producție și a ceea ce impune proxy-ul invers în instalările self-hosted.

## Descoperirea OAuth

Serverul MCP publică metadatele OAuth 2.1, astfel încât clienții care se conectează doar la servere descoperite prin OAuth, în special interfața „Add custom connector” din Claude.ai, pot autentifica un utilizator fără o cheie lipită. `/mcp` este resursa protejată, [furnizorul OAuth](./connected-apps.md) existent de sub `/membership/oauth` este serverul de autorizare, iar pagina `/oauth` din B1Admin este ecranul de consimțământ.

| Endpoint | Scop |
|---|---|
| `GET /.well-known/oauth-protected-resource` (también `/.well-known/oauth-protected-resource/mcp`) | Metadatele resursei protejate (RFC 9728): `resource` este `<api>/mcp`, `authorization_servers` este rădăcina API-ului, iar `scopes_supported` listează fiecare [scop al cheii API](./api-keys.md#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadatele serverului de autorizare (RFC 8414): `authorization_endpoint` este `/oauth` din B1Admin, `token_endpoint` este `/membership/oauth/token`, iar `registration_endpoint` este `/membership/oauth/register` |
| `POST /membership/oauth/register` | Înregistrare dinamică a clientului (RFC 7591) |

Fluxul pe care îl rulează un client precum claude.ai:

1. `POST /mcp` fără token returnează 401, cu antetul `WWW-Authenticate` care indică metadatele resursei protejate.
2. Clientul citește ambele documente de metadate, apoi se înregistrează cu `POST /membership/oauth/register`, trimițând `client_name`, `redirect_uris` și, opțional, `scope`. Fiecare client auto-înregistrat este un client **public**: nu se emite niciun secret, iar răspunsul conține `token_endpoint_auth_method: "none"`. URI-urile de redirecționare trebuie să fie `https`, sau `http` pe o adresă de loopback (`localhost`, `127.0.0.1`, `[::1]`), cu cel mult 10 per client. Înregistrarea este limitată la 20 pe oră per IP.
3. Utilizatorul este trimis la `/oauth` din B1Admin cu `code_challenge` și `code_challenge_method=S256`. Pagina de consimțământ listează fiecare scop cerut în limbaj clar (sau „Everything your B1 account can access” dacă nu s-a cerut niciunul), arată gazda către care utilizatorul va fi trimis înapoi și menționează când aplicația s-a înregistrat singură. Utilizatorul apasă **Allow**.
4. Clientul schimbă codul la `/membership/oauth/token` cu `grant_type=authorization_code` și `code_verifier`-ul său, iar mai târziu reîmprospătează token-ul cu `grant_type=refresh_token`. Corpurile codificate în formular și cele JSON sunt ambele acceptate.
5. Token-ul de acces rezultat este un JWT B1 cu scopuri, folosit ca token Bearer pe `/mcp`.

Reguli PKCE: se acceptă doar `S256`. Un client fără secret trebuie să trimită un `code_challenge` la autorizare și `code_verifier`-ul corespunzător la schimbul de token. Clienții confidențiali (cu secret) pot folosi în continuare doar secretul. URI-urile de redirecționare trebuie să corespundă exact unui URI înregistrat.

Clienții care acceptă un token Bearer static în configurație (Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, cod personalizat) pot continua să folosească în schimb o cheie `cak_…`.

## Dezvoltare locală

Endpoint-ul MCP se montează alături de restul când API-ul rulează local:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

La pornire, linia de log `📡 MCP server ready at /mcp — N routes in inventory` confirmă că inventarul a fost construit.

Testează-l cu MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

În interfața Inspector, indică `http://localhost:8084/mcp` și setează antetul `Authorization` la `Bearer cak_<prefix>.<secret>`. Apelează mai întâi `list_endpoints`; ar trebui să vezi lista completă a rutelor. Apoi, `api_call({ method: "GET", path: "/membership/people" })` ar trebui să returneze persoanele tale de test locale.

## Structura codului

Serverul MCP se află în `src/modules/mcp/` din repo-ul Api. Fișiere importante:

| Fișier | Scop |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; conectează `StreamableHTTPServerTransport` pentru fiecare cerere și trimite provocarea `WWW-Authenticate` la 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Servește documentele de descoperire OAuth din `/.well-known` |
| `McpServer.ts` | Construiește un `Server` MCP și înregistrează cele patru instrumente |
| `RouteInventory.ts` | Parcurge metadatele inversify-express-utils la pornire pentru a enumera rutele |
| `internalDispatch.ts` | `req`/`res` sintetice care reintră în aplicația Express în proces |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Exemple curate de cerere/răspuns pentru endpoint-urile cu trafic mare |

## Înrudite

- [Chei API](./api-keys.md)
- [Webhook-uri](./webhooks.md)
- [Aplicații conectate (OAuth)](./connected-apps.md)
- [Claude: configurare pentru utilizatorii finali](/docs/b1-admin/integrations/claude)
- [ChatGPT: configurare pentru utilizatorii finali](/docs/b1-admin/integrations/chatgpt)
