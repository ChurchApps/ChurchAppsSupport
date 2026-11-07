---
title: "Server MCP"
description: "Nastavte přístup MCP k API B1, aby AI klienti jako Claude Code, Cursor nebo Claude Desktop mohli volat endpointy dat církve pomocí API klíčů nebo OAuth."
---

# Server MCP

<div class="article-intro">

B1 API obsahuje server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) na adrese `/mcp`. Libovolný AI klient, který podporuje MCP (vlastní konektory claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor nebo váš vlastní), se k němu může připojit a volat podkladové REST API jménem ověřeného uživatele církve. Jde o tenký, obecný obal: tři obecné nástroje zpřístupňují celé API dynamicky, místo aby se každý endpoint modeloval ručně, a navíc je tu jeden doménový průvodce nástroji pro tvorbu webu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- [Klíč B1 API](./api-keys.md) (`cak_…`) s oprávněními, která klient potřebuje, nebo MCP klient, který se umí přihlásit přes OAuth (viz [zjišťování OAuth](#oauth-discovery))
- Dostupná adresa hostitele B1 API: `https://api.churchapps.org` pro hostované církve, nebo vaše vlastní nasazení
- MCP klient. Nastavení pro koncové uživatele najdete v článcích [Claude](/docs/b1-admin/integrations/claude) a [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Koncový bod

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Vlastnost | Hodnota |
|---|---|
| **Cesta** | `/mcp` (relativně vůči hostiteli API) |
| **Metoda** | pouze `POST`. Požadavek i odpověď, stejně jako streamování SSE, probíhají na stejném koncovém bodě |
| **Přenos** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Model relace** | Bezstavový. Pro každý požadavek se vytváří nová instance serveru MCP. Bez ID relace a bez obnovování |
| **Ověření** | Bearer token. Fungují klíče API `cak_…` i JWT B1 (včetně přístupových tokenů OAuth). Řešení je stejné jako u jakéhokoli jiného ověřeného endpointu |

Požadavek, jehož hlavička `Authorization` chybí nebo je neplatná, vrátí:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

se stavovým kódem HTTP 401 a hlavičkou `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. Podle ní klienti s podporou OAuth zahájí přihlášení.

Na hostovaném API (produkce a demo) je `/mcp` obsluhován přes API Gateway HTTP API, nikoli přes REST API, které se používá pro ostatní endpointy. REST API na odpovědích Lambda proxy přejmenovává `WWW-Authenticate` na `x-amzn-remapped-www-authenticate`. Klienti jako ChatGPT tak dostávali holé 401 bez možnosti zahájit přihlášení. HTTP API hlavičku předává beze změny.

## Nástroje

Tři obecné nástroje a jeden průvodce. Model používá `list_endpoints` k objevování, `describe_endpoint` ke zjištění tvaru payloadu, `api_call` ke skutečnému volání API a `describe_page_builder`, když úloha souvisí s obsahem webu.

### `list_endpoints`

Vrací úplný přehled registrovaných REST tras, filtrovaný volitelným podřetězcem a/nebo HTTP metodou. Každá položka obsahuje název kontroleru a oprávnění API klíče, která jsou nejpravděpodobněji potřeba.

**Vstup:**

| Pole | Typ | Popis |
|---|---|---|
| `filter` | string (volitelné) | Podřetězec nezávislý na velikosti písmen, porovnávaný s cestou, např. `"people"` |
| `method` | výčet (volitelné) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Výstup:** dokument JSON ve tvaru

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

Inventář se sestavuje jednou při spuštění API z živé tabulky tras. Cokoli, na co lze zavolat přes `curl`, se zde objeví.

### `describe_endpoint`

Vrací stručný popis a tam, kde existuje, ručně připravené tělo požadavku a ukázku odpovědi pro jeden endpoint.

**Vstup:**

| Pole | Typ | Popis |
|---|---|---|
| `method` | string | HTTP metoda |
| `path` | string | Úplná cesta, jak ji vrací `list_endpoints` |

**Výstup:** u kurátorovaných endpointů příklad s `summary`, `requestBody` a `responseSample`. U nekurátorovaných endpointů zprávu, která modelu doporučí nejprve zavolat `GET`, aby zjistil tvar. Kurátorováno je asi tucet nejvytíženějších tras (lidé, skupiny, dary, docházka a fondy).

### `api_call`

Volá zvolený REST endpoint přímo v procesu, prostřednictvím stejného zásobníku middleware Express jako běžný HTTP požadavek. Uplatňuje se ověření, zpracování těla, auditní logování i omezení na jednotlivé církve.

**Vstup:**

| Pole | Typ | Popis |
|---|---|---|
| `method` | výčet | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Cesta včetně případného prefixu modulu, např. `/membership/people` |
| `query` | objekt (volitelné) | Ploché pole parametrů řetězce dotazu |
| `body` | any (volitelné) | JSON tělo požadavku, typicky pole objektů modelu pro `POST` |

**Výstup:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Výsledek nástroje je označen `isError: true` u každé odpovědi se stavem ≥ 400.

### `describe_page_builder`

Jediný nástroj, který není obecný: statický, samostatný průvodce tvorbou webových stránek přes endpointy `/content/*`. Obsahuje datový model Stránka → Sekce → Prvek, pracovní postup vytváření, každý `elementType` s tvarem `answersJSON`, nastavení na úrovni sekce (například dělicí tvary `dividerTop` a `dividerBottom`) a ucelený příklad od začátku do konce. Nemá žádné vstupy a zrcadlí katalog prvků spravovaný v editoru B1Admin (viz [Architektura tvorby webu](../architecture/website-builder.md)). Agenti by jej měli zavolat jednou před vytvářením nebo úpravou obsahu stránky a poté jednat přes `api_call`.

## Model ověřování

Samotný požadavek MCP prochází přes `CustomAuthProvider.getUser()`, tedy stejnou cestou, kterou používá každý ověřený endpoint B1. Bearer `cak_…` se převede na `Principal`, jehož oprávnění jsou aktuální RBAC osoby, která klíč vydala, **zkombinovaná** (průnik) s oprávněními, která klíč dostal. Tento průnik se přepočítává při každém požadavku, takže:

- Odebrání oprávnění z klíče (smazáním a novým vytvořením) ukončí přístup při dalším volání.
- Odebrání oprávnění podkladové osobě v B1Admin ukončí přístup při dalším volání, i když klíč stále existuje.

U vnořených volání `api_call` se původní hlavička `Authorization` zkopíruje na syntetický požadavek. `CustomAuthProvider` tak proběhne znovu a průnik oprávnění se uplatní pro každé volání. Tokeny se nekešují.

## Seznam blokovaných cest

Několik tras není dostupných přes `api_call`, ani s platným klíčem:

| Vzor | Důvod |
|---|---|
| `/giving/donate/webhook/*` | Koncové body webhooků poskytovatelů očekávají nezpracovaná těla ověřená podpisem od Stripe nebo PayPal, nikoli běžné volající |
| `/membership/oauth/clients*` | Registrace klientů OAuth je vyhrazena pro provozovatele |
| `/membership/people/apiEmails` | Chráněno provozovatelským `jwtSecret`, nikoli uživatelskými oprávněními |
| Každá trasa očekávající `multipart/form-data` | Nahrávání souborů se nehodí pro JSON-RPC |

Blokovaná cesta vrátí výsledek nástroje s `isError: true` a popisnou zprávou. Podkladová trasa se nikdy nevolá.

## Limit velikosti odpovědi

Tělo každé odpovědi `api_call` je omezeno na **64 KB** zachyceného výstupu. Pokud dotaz tento limit překročí, odpověď obsahuje `"truncated": true` a model by měl dotaz zopakovat s užšími parametry. Tím se zabrání tomu, aby jediná odpověď nástroje zaplnila kontextové okno klienta.

## Omezení rychlosti

Na `/mcp` není žádné omezení rychlosti na úrovni aplikace. V produkci se omezování řídí souběžností API Gateway a Lambda, u vlastních nasazení tím, co vynucuje váš reverzní proxy server.

## Zjišťování OAuth

Server MCP zveřejňuje metadata OAuth 2.1, aby se klienti, kteří se připojují jen k serverům zjištěným přes OAuth (zejména dialog „Add custom connector“ v claude.ai), mohli přihlásit uživatele bez vloženého klíče. `/mcp` je chráněný zdroj, [poskytovatel OAuth](./connected-apps.md) pod `/membership/oauth` je jeho autorizační server a stránka `/oauth` v B1Admin je souhlasová obrazovka.

| Endpoint | Účel |
|---|---|
| `GET /.well-known/oauth-protected-resource` (také `/.well-known/oauth-protected-resource/mcp`) | Metadata chráněného zdroje (RFC 9728): `resource` je `<api>/mcp`, `authorization_servers` je kořen API a `scopes_supported` obsahuje každé [oprávnění API klíče](./api-keys.md#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadata autorizačního serveru (RFC 8414): `authorization_endpoint` je `/oauth` v B1Admin, `token_endpoint` je `/membership/oauth/token` a `registration_endpoint` je `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamická registrace klienta (RFC 7591) |

Postup, který provádí klient jako claude.ai:

1. `POST /mcp` bez tokenu vrátí 401 s hlavičkou `WWW-Authenticate`, která odkazuje na metadata chráněného zdroje.
2. Klient načte oba dokumenty metadat a poté se zaregistruje přes `POST /membership/oauth/register`. Odešle `client_name`, `redirect_uris` a volitelně `scope`. Každý samostatně registrovaný klient je **veřejný** klient: nevydává se žádný tajný klíč a odpověď obsahuje `token_endpoint_auth_method: "none"`. Přesměrovací URI musí být `https`, nebo `http` na loopback adrese (`localhost`, `127.0.0.1`, `[::1]`). Na klienta jich smí být nejvýše 10. Registrace je omezena na 20 za hodinu z jedné IP adresy.
3. Uživatel je odeslán na `/oauth` v B1Admin s `code_challenge` a `code_challenge_method=S256`. Souhlasová stránka uvádí každé požadované oprávnění srozumitelným jazykem (nebo „Vše, k čemu má váš účet B1 přístup“, pokud nebylo vyžádáno žádné), ukazuje hostitele, na kterého bude uživatel přesměrován, a upozorňuje, když se aplikace zaregistrovala sama. Uživatel klikne na **Povolit**.
4. Klient vymění kód na `/membership/oauth/token` s `grant_type=authorization_code` a svým `code_verifier`. Později token obnovuje pomocí `grant_type=refresh_token`. Přijímají se těla kódovaná formulářem i JSON.
5. Výsledný přístupový token je omezené JWT B1, které se použije jako bearer na `/mcp`.

Pravidla PKCE: přijímá se pouze `S256`. Klient bez tajného klíče musí při autorizaci odeslat `code_challenge` a při výměně tokenu odpovídající `code_verifier`. Důvěrní klienti (s tajným klíčem) mohou použít samotný tajný klíč. Přesměrovací URI musí přesně odpovídat registrovanému URI.

Klienti, kteří v konfiguraci přijímají statický bearer token (Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor nebo vlastní kód), mohou místo toho dál používat klíč `cak_…`.

## Místní vývoj

Koncový bod MCP se připojuje spolu s ostatními částmi, když API běží lokálně:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Při spuštění potvrzuje řádek logu `📡 MCP server ready at /mcp — N routes in inventory`, že inventář byl sestaven.

Otestujte jej pomocí MCP Inspectoru:

```bash
npx @modelcontextprotocol/inspector
```

V rozhraní Inspectoru nastavte adresu `http://localhost:8084/mcp` a hlavičku `Authorization` na `Bearer cak_<prefix>.<secret>`. Nejprve zavolejte `list_endpoints`. Měli byste vidět úplný seznam tras. Poté by `api_call({ method: "GET", path: "/membership/people" })` měl vrátit lokální testovací osoby.

## Rozložení kódu

Server MCP je v `src/modules/mcp/` v repozitáři Api. Důležité soubory:

| Soubor | Účel |
|---|---|
| `McpController.ts` | `@controller("/mcp")`. Připojuje `StreamableHTTPServerTransport` pro každý požadavek a při 401 posílá výzvu `WWW-Authenticate` |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Poskytuje dokumenty OAuth pro zjišťování v `/.well-known` |
| `McpServer.ts` | Vytváří MCP `Server` a registruje čtyři nástroje |
| `RouteInventory.ts` | Při spuštění prochází metadata inversify-express-utils a vyjmenovává trasy |
| `internalDispatch.ts` | Syntetické `req`/`res`, které znovu vstupují do aplikace Express v procesu |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kurátorované ukázky požadavků a odpovědí pro nejvytíženější endpointy |

## Související

- [Klíče API](./api-keys.md)
- [Webhooky](./webhooks.md)
- [Připojené aplikace (OAuth)](./connected-apps.md)
- [Claude: nastavení pro koncové uživatele](/docs/b1-admin/integrations/claude)
- [ChatGPT: nastavení pro koncové uživatele](/docs/b1-admin/integrations/chatgpt)
