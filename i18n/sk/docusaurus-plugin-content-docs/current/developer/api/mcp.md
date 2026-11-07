---
title: "Server MCP"
---

# Server MCP

<div class="article-intro">

B1 API obsahuje server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) na adrese `/mcp`. Ktorýkoľvek klient AI, ktorý podporuje MCP (vlastné konektory claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor alebo váš vlastný), sa k nemu môže pripojiť a volať základné REST API v mene overeného používateľa cirkvi. Ide o tenký, všeobecný obal: tri všeobecné nástroje sprístupňujú celé API dynamicky, namiesto ručného modelovania každého koncového bodu, a jeden doménový nástroj s príručkou slúži na tvorbu webových stránok.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- [Kľúč B1 API](./api-keys) (`cak_…`) s rozsahmi, ktoré má klient mať, alebo klient MCP, ktorý sa dokáže prihlásiť cez OAuth (pozri [Zisťovanie OAuth](#oauth-discovery))
- Dostupný hostiteľ B1 API — `https://api.churchapps.org` pre hostované cirkvi alebo vaše vlastné nasadenie
- Klient MCP. Nastavenie pre koncových používateľov nájdete v častiach [Claude](/docs/b1-admin/integrations/claude) a [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Koncový bod

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspekt | Hodnota |
|---|---|
| **Cesta** | `/mcp` (relatívne k hostiteľovi API) |
| **Metóda** | Iba `POST` — požiadavka/odpoveď aj streamovanie SSE prebiehajú na tom istom koncovom bode |
| **Prenos** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Model relácie** | Bezstavový. Pre každú požiadavku sa vytvorí novú inštancia servera MCP — bez ID relácie a bez obnovenia |
| **Autentifikácia** | Bearer token. Fungujú kľúče API `cak_…` aj tokeny B1 JWT (vrátane prístupových tokenov OAuth); spracovanie je rovnaké ako pri ktoromkoľvek inom overenom koncovom bode |

Požiadavka, ktorej hlavička `Authorization` chýba alebo je neplatná, vráti:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

s HTTP stavom 401 a hlavičkou `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. Klienti s podporou OAuth ju použijú na spustenie prihlásenia.

Na hostovanom API (produkčnom a demo) sa `/mcp` obsluhuje cez HTTP API brány API Gateway, nie cez REST API, ktoré sa používa pre ostatné koncové body. REST API pri odpovediach proxy Lambda premenuje `WWW-Authenticate` na `x-amzn-remapped-www-authenticate`, takže klienti ako ChatGPT dostávali holú odpoveď 401 bez možnosti spustiť prihlásenie. HTTP API túto hlavičku prepúšťa bez zmeny.

## Nástroje

Tri všeobecné nástroje a jedna príručka. Model používa `list_endpoints` na zisťovanie, `describe_endpoint` na zistenie tvaru údajov, `api_call` na samotné volanie API a `describe_page_builder`, keď úloha súvisí s obsahom webovej stránky.

### `list_endpoints`

Vráti úplný zoznam registrovaných tras REST, filtrovaný voliteľným podreťazcom a/alebo HTTP slovesom. Každý záznam obsahuje názov kontroléra a rozsahy kľúčov API, ktoré sú pravdepodobne potrebné.

**Vstup:**

| Pole | Typ | Popis |
|---|---|---|
| `filter` | reťazec (voliteľné) | Podreťazec bez ohľadu na veľkosť písmen, porovnávaný s cestou, napr. `"people"` |
| `method` | výber (voliteľné) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Výstup:** dokument JSON v tvare

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

Zoznam sa vytvorí raz pri spustení API z aktuálnej tabuľky trás. Čokoľvek, na čo môžete zavolať pomocou `curl`, sa v ňom objaví.

### `describe_endpoint`

Vráti stručný opis a tam, kde je k dispozícii, ručne pripravené telo požiadavky a vzorovú odpoveď pre jeden koncový bod.

**Vstup:**

| Pole | Typ | Popis |
|---|---|---|
| `method` | reťazec | HTTP sloveso |
| `path` | reťazec | Úplná cesta tak, ako ju vrátil `list_endpoints` |

**Výstup:** pri pripravených koncových bodoch príklad so `summary`, `requestBody` a `responseSample`. Pri koncových bodoch bez prípravy správu o náhrade, ktorá modelu odporúča najprv zavolať `GET`, aby zistil tvar údajov. Približne tucet najpoužívanejších trás (ľudia, skupiny, dary, účasť, fondy) je pripravených.

### `api_call`

Volá zvolený koncový bod REST priamo v procese cez rovnaký zásobník middleware Express ako bežná požiadavka HTTP. Uplatňuje sa overenie, spracovanie tela požiadavky, auditovanie a obmedzenie na cirkev.

**Vstup:**

| Pole | Typ | Popis |
|---|---|---|
| `method` | výber | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | reťazec | Cesta vrátane prípadného prefixu modulu, napr. `/membership/people` |
| `query` | objekt (voliteľné) | Plochý objekt parametrov reťazca dotazu |
| `body` | ľubovoľný (voliteľné) | Telo požiadavky JSON — pri `POST` zvyčajne pole objektov modelu |

**Výstup:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Výsledok nástroja je označený `isError: true` pri každej odpovedi so stavom ≥ 400.

### `describe_page_builder`

Jediný nástroj, ktorý nie je všeobecný: statická, samostatná príručka na tvorbu webových stránok cez koncové body `/content/*` — dátový model Stránka → Sekcia → Prvok, pracovný postup vytvárania, každý `elementType` s tvarom `answersJSON`, nastavenia na úrovni sekcie, ako sú tvarové oddeľovače `dividerTop`/`dividerBottom`, a príklad od začiatku do konca. Nemá žiadny vstup a zrkadlí katalóg prvkov udržiavaný v editore B1Admin (pozri [Architektúra tvorby webových stránok](../architecture/website-builder)). Agenti by ho mali zavolať raz pred vytváraním alebo úpravou obsahu stránky a potom konať cez `api_call`.

## Model autentifikácie

Samotná požiadavka MCP prebieha cez `CustomAuthProvider.getUser()` — rovnakou cestou, akou prechádza každý overený koncový bod B1. Bearer `cak_…` sa premení na `Principal`, ktorého oprávnenia sú aktuálne RBAC vydavateľa osoby, **prienikom** s udelenými rozsahmi kľúča. Tento prienik sa prepočítava pri každej požiadavke, takže:

- Odstránenie rozsahu z kľúča (vymazaním a novým vytvorením) ukončí prístup pri ďalšom volaní.
- Odobratie oprávnenia základnej osobe v B1Admin ukončí prístup pri ďalšom volaní, aj keď kľúč stále existuje.

Pri vnorených volaniach `api_call` sa pôvodná hlavička `Authorization` skopíruje do syntetickej požiadavky, takže `CustomAuthProvider` beží znova a prienik rozsahov sa pri každom volaní uplatní znova. Tokeny sa neukladajú do vyrovnávacej pamäte.

## Zoznam blokovaných ciest

Malá skupina tras nie je dostupná cez `api_call`, ani s platným kľúčom:

| Vzor | Dôvod |
|---|---|
| `/giving/donate/webhook/*` | Koncové body webhookov poskytovateľov očakávajú nespracované, podpisom overené telá zo Stripe/PayPal — nie pre bežných volajúcich |
| `/membership/oauth/clients*` | Registrácia klientov OAuth je vyhradená pre prevádzkovateľa |
| `/membership/people/apiEmails` | Chránené prevádzkovateľským `jwtSecret`, nie oprávneniami používateľa |
| Akákoľvek trasa, ktorá očakáva `multipart/form-data` | Nahrávanie súborov nie je vhodné pre JSON-RPC |

Blokovaná cesta vráti výsledok nástroja s `isError: true` a popisnou správou; podkladová trasa sa nikdy nevolá.

## Limit veľkosti odpovede

Telo každej odpovede `api_call` je obmedzené na **64 KB** zachyteného výstupu. Ak dotaz tento limit prekročí, odpoveď obsahuje `"truncated": true` a model má požiadavku zopakovať s užšími parametrami dotazu. Tým sa zabráni, aby jediná odpoveď nástroja zaplnila kontextové okno klienta.

## Obmedzenie počtu požiadaviek

Pre `/mcp` neexistuje obmedzenie počtu požiadaviek na úrovni aplikácie. Regulácia sa v produkcii prenecháva súbežnosti API Gateway / Lambda, a pri vlastných nasadeniach tomu, čo presadzuje váš reverzný proxy server.

## Zisťovanie OAuth

Server MCP zverejňuje metadáta OAuth 2.1, aby klienti, ktorí sa pripájajú len na servery zistené cez OAuth — najmä dialóg „Add custom connector“ v claude.ai —, dokázali používateľa prihlásiť bez vloženého kľúča. `/mcp` je chránený zdroj, existujúci [poskytovateľ OAuth](./connected-apps) pod `/membership/oauth` je jeho autorizačný server a stránka `/oauth` v B1Admin je obrazovka súhlasu.

| Koncový bod | Účel |
|---|---|
| `GET /.well-known/oauth-protected-resource` (tiež `/.well-known/oauth-protected-resource/mcp`) | Metadáta chráneného zdroja (RFC 9728): `resource` je `<api>/mcp`, `authorization_servers` je koreň API, `scopes_supported` obsahuje každý [rozsah kľúča API](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadáta autorizačného servera (RFC 8414): `authorization_endpoint` je `/oauth` v B1Admin, `token_endpoint` je `/membership/oauth/token`, `registration_endpoint` je `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamická registrácia klienta (RFC 7591) |

Postup, ktorý vykoná klient ako claude.ai:

1. `POST /mcp` bez tokenu vráti 401 s hlavičkou `WWW-Authenticate`, ktorá ukazuje na metadáta chráneného zdroja.
2. Klient prečíta oba dokumenty s metadátami, potom sa zaregistruje cez `POST /membership/oauth/register`, pričom odošle `client_name`, `redirect_uris` a voliteľne `scope`. Každý klient registrovaný sám sebou je **verejný** klient: nevydáva sa žiadne tajomstvo a odpoveď obsahuje `token_endpoint_auth_method: "none"`. URI presmerovania musia byť `https`, alebo `http` na loopback adrese (`localhost`, `127.0.0.1`, `[::1]`); najviac 10 na klienta. Registrácia je obmedzená na 20 za hodinu na IP adresu.
3. Používateľ je presmerovaný na `/oauth` v B1Admin s `code_challenge` a `code_challenge_method=S256`. Stránka súhlasu uvádza každý požadovaný rozsah zrozumiteľným jazykom (alebo „Všetko, na čo má váš účet B1 prístup“, ak nebol požadovaný žiadny), zobrazuje hostiteľa, na ktorý bude používateľ presmerovaný, a upozorní, keď sa aplikácia zaregistrovala sama. Používateľ klikne na **Povoliť**.
4. Klient vymení kód na `/membership/oauth/token` pomocou `grant_type=authorization_code` a svojho `code_verifier`; neskôr obnoví token pomocou `grant_type=refresh_token`. Prijímajú sa tela kódované formulárom aj JSON.
5. Výsledný prístupový token je rozsahovo obmedzený B1 JWT a používa sa ako bearer na `/mcp`.

Pravidlá PKCE: prijíma sa iba `S256`. Klient bez tajomstva musí pri autorizácii odoslať `code_challenge` a pri výmene tokenu zodpovedajúci `code_verifier`; dôverní klienti (s tajomstvom) môžu použiť samotné tajomstvo. URI presmerovania sa musia presne zhodovať s registrovaným URI.

Klienti, ktorí v konfigurácii akceptujú statický bearer token — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, vlastný kód —, môžu namiesto toho naďalej používať kľúč `cak_…`.

## Lokálny vývoj

Koncový bod MCP sa pripája spolu s ostatnými časťami, keď sa API spúšťa lokálne:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Pri spustení potvrdí riadok denníka `📡 MCP server ready at /mcp — N routes in inventory`, že zoznam bol vytvorený.

Otestujte ho pomocou MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

V rozhraní Inspector nastavte adresu `http://localhost:8084/mcp` a hlavičku `Authorization` na `Bearer cak_<prefix>.<secret>`. Najprv zavolajte `list_endpoints`; mali by ste vidieť úplný zoznam trás. Potom by `api_call({ method: "GET", path: "/membership/people" })` mal vrátiť vaše lokálne testovacie osoby.

## Rozloženie kódu

Server MCP sa nachádza v `src/modules/mcp/` v repozitári Api. Dôležité súbory:

| Súbor | Účel |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; pre každú požiadavku pripája `StreamableHTTPServerTransport` a pri odpovedi 401 posiela výzvu `WWW-Authenticate` |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Poskytuje dokumenty na zisťovanie OAuth v `/.well-known` |
| `McpServer.ts` | Vytvorí MCP `Server` a zaregistruje štyri nástroje |
| `RouteInventory.ts` | Pri spustení prechádza metadáta inversify-express-utils a vypisuje trasy |
| `internalDispatch.ts` | Syntetické `req`/`res`, ktoré znova vstupuje do aplikácie Express v rámci procesu |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Pripravené vzorky požiadaviek a odpovedí pre najpoužívanejšie koncové body |

## Súvisiace

- [Kľúče API](./api-keys)
- [Webhooky](./webhooks)
- [Pripojené aplikácie (OAuth)](./connected-apps)
- [Claude — nastavenie pre koncových používateľov](/docs/b1-admin/integrations/claude)
- [ChatGPT — nastavenie pre koncových používateľov](/docs/b1-admin/integrations/chatgpt)
