---
title: "MCP-szerver"
---

# MCP-szerver

<div class="article-intro">

A B1 API a `/mcp` útvonalon [MCP (Model Context Protocol)](https://modelcontextprotocol.io) szervert kínál. Bármely MCP-kompatibilis AI-kliens — a claude.ai egyéni összekötői, a Claude Code, a Claude Desktop, az OpenAI Agents SDK, a Cursor vagy saját kliens — csatlakozhat hozzá, és meghívhatja a mögöttes REST API-t egy hitelesített egyházi felhasználó nevében. Ez egy vékony, általános burkoló: három általános eszköz teszi elérhetővé a teljes API-felületet dinamikusan ahelyett, hogy minden végpontot külön modellezne, plusz egy domain-útmutató eszköz a weboldal-szerkesztőhöz.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Egy [B1 API-kulcs](./api-keys) (`cak_…`) a kliens számára szükséges hatókörökkel, vagy egy MCP-kliens, amely OAuth-tal tud bejelentkezni (lásd [OAuth-felfedezés](#oauth-discovery))
- Egy elérhető B1 API-kiszolgáló — `https://api.churchapps.org` hosztolt egyházak számára, vagy saját telepítés
- Egy MCP-kliens. A végfelhasználói beállításhoz lásd [Claude](/docs/b1-admin/integrations/claude) és [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Végpont

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Szempont | Érték |
|---|---|
| **Útvonal** | `/mcp` (az API-kiszolgálóhoz képest) |
| **Metódus** | Csak `POST` — a kérés-válasz és az SSE-streamelés is ugyanazon a végponton történik |
| **Átvitel** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Munkamenet-modell** | Állapotmentes. Minden kéréshez új MCP-szerverpéldány készül — nincs munkamenet-azonosító, nincs folytatás |
| **Hitelesítés** | Bearer-token. A `cak_…` API-kulcsok és a B1 JWT-k (beleértve az OAuth hozzáférési tokeneket is) egyaránt működnek; a feloldás ugyanaz, mint bármely más hitelesített végpontnál |

Az a kérés, amelynek `Authorization` fejléce hiányzik vagy érvénytelen, a következőt adja vissza:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

HTTP 401 státusszal és `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"` fejléccel, amelyet az OAuth-képes kliensek követnek a bejelentkezés megkezdéséhez.

Az éles és a demó API-n a `/mcp` végpontot egy API Gateway HTTP API szolgálja ki, nem pedig azt a REST API-t, amelyen a többi végpont fut. A REST API a `WWW-Authenticate` fejlécet `x-amzn-remapped-www-authenticate` névre nevezi át a Lambda proxy-válaszokon, ami miatt az olyan kliensek, mint a ChatGPT, csupasz 401-et kaptak, és nem tudták elindítani a bejelentkezést. A HTTP API a fejlécet változatlanul továbbítja.

## Eszközök

Három általános eszköz és egy útmutató. A modell a `list_endpoints` eszközt a felfedezéshez használja, a `describe_endpoint` eszközt egy payload szerkezetének megismeréséhez, az `api_call` eszközt az API tényleges meghívásához, a `describe_page_builder` eszközt pedig akkor, ha a feladat weboldal-tartalommal kapcsolatos.

### `list_endpoints`

Visszaadja a regisztrált REST-útvonalak teljes listáját, opcionális részsztring- és/vagy HTTP-metódus-szűrővel. Minden bejegyzés tartalmazza a vezérlő nevét és a valószínűleg szükséges API-kulcs-hatóköröket.

**Bemenet:**

| Mező | Típus | Leírás |
|---|---|---|
| `filter` | string (opcionális) | Kisbetű-érzéketlen részsztring, amelyet az útvonalhoz illesztünk, pl. `"people"` |
| `method` | felsorolás (opcionális) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Kimenet:** JSON-dokumentum a következő formában:

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

A bejegyzések listáját az API indításakor egyszer építi fel az élő útvonaltáblából. Minden, amit `curl`-lel elérsz, itt megjelenik.

### `describe_endpoint`

Rövid összefoglalót ad, valamint — ha elérhető — egy kézzel összeállított kérés-törzset és válaszmintát egy végponthoz.

**Bemenet:**

| Mező | Típus | Leírás |
|---|---|---|
| `method` | string | HTTP-metódus |
| `path` | string | Teljes útvonal, ahogy a `list_endpoints` visszaadja |

**Kimenet:** kurált végpontok esetén egy példa a `summary`, `requestBody` és `responseSample` mezőkkel. Nem kurált végpontok esetén egy tartalék üzenet, amely utasítja a modellt, hogy előbb küldjön `GET` kérést az alak megismeréséhez. Körülbelül tucatnyi nagy forgalmú útvonal (személyek, csoportok, adományok, részvétel, alapok) kurált.

### `api_call`

Meghívja a kiválasztott REST-végpontot, folyamatban (in-process), ugyanazon az Express middleware-verem segítségével, mint egy normál HTTP-kérés. Érvényesül a hitelesítés, a törzs feldolgozása, az auditnaplózás és a gyülekezetenkénti hatókör-korlátozás.

**Bemenet:**

| Mező | Típus | Leírás |
|---|---|---|
| `method` | felsorolás | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Útvonal, beleértve bármely modulprefixet, pl. `/membership/people` |
| `query` | object (opcionális) | Lapos objektum query-string paraméterekkel |
| `body` | any (opcionális) | JSON kérés-törzs — jellemzően modellobjektumok tömbje `POST` esetén |

**Kimenet:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Az eszköz-eredmény `isError: true` jelölést kap minden 400-as vagy magasabb státuszú válasznál.

### `describe_page_builder`

Az egyetlen nem általános eszköz: egy statikus, önálló útmutató a weboldalak építéséhez a `/content/*` végpontokon keresztül. Tartalmazza a Page → Section → Element adatmodellt, a létrehozási munkafolyamatot, minden `elementType`-ot az `answersJSON` alakjával, a szekciószintű beállításokat (például a `dividerTop`/`dividerBottom` alakú elválasztókat), és egy kidolgozott, végpontok közötti példát. Bemenet nélkül működik, és a B1Admin szerkesztőben karbantartott elem-katalógust tükrözi (lásd [Weboldal-szerkesztő architektúra](../architecture/website-builder)). Az ügynököknek érdemes egyszer meghívniuk, mielőtt oldaltartalmat hoznának létre vagy szerkesztenének, és utána az `api_call` eszközön keresztül hajtaniuk végre a műveleteket.

## Hitelesítési modell

Maga az MCP-kérés a `CustomAuthProvider.getUser()` útvonalon fut — ugyanazon az úton, amelyen minden hitelesített B1-végpont. Egy `cak_…` bearer-token egy `Principal`-lá oldódik fel, amelynek jogosultságai a kiállító személy aktuális RBAC-jogosultságai, **metszve** a kulcshoz rendelt hatókörökkel. Ez a metszet minden kérésnél újraszámításra kerül, így:

- Ha egy hatókört eltávolítunk egy kulcsból (törlés és újralétrehozás útján), a hozzáférés a következő hívásnál megszűnik.
- Ha a B1Adminban eltávolítunk egy jogosultságot a mögöttes személytől, a hozzáférés a következő hívásnál megszűnik, még akkor is, ha a kulcs továbbra is létezik.

Egymásba ágyazott `api_call` hívásoknál az eredeti `Authorization` fejléc átmásolódik a szintetikus kérésre, így a `CustomAuthProvider` újra lefut, és a hatókör-metszet hívásonként újra alkalmazódik. Nincs tokengyorsítótárazás.

## Útvonal-tiltólista

Néhány útvonal nem érhető el `api_call` hívással, még érvényes kulccsal sem:

| Minta | Ok |
|---|---|
| `/giving/donate/webhook/*` | A szolgáltatói webhook-végpontok nyers, aláírás-ellenőrzött törzseket várnak a Stripe/PayPal részéről, nem általános hívóktól |
| `/membership/oauth/clients*` | Az OAuth-kliensek regisztrálása csak üzemeltetői jogosultsággal lehetséges |
| `/membership/people/apiEmails` | Az üzemeltetői `jwtSecret` védi, nem a felhasználói jogosultságok |
| Bármely `multipart/form-data`-t váró útvonal | A fájlfeltöltések nem illeszkednek a JSON-RPC-alapú működéshez |

Egy tiltott útvonal leíró üzenettel tér vissza `isError: true` eszköz-eredményként; a mögöttes útvonal soha nem hívódik meg.

## Válaszméret-korlát

Minden `api_call` válasz törzse legfeljebb **64 KB** rögzített kimenetre van korlátozva. Ha egy lekérdezés meghaladja a korlátot, a válasz `"truncated": true` értéket kap, és a modellnek szűkebb query-paraméterekkel kell újrapróbálkoznia. Ez megakadályozza, hogy egyetlen eszköz-válasz szétfeszítse a kliens kontextusablakát.

## Sebességkorlátozás

Az `/mcp` végponton nincs alkalmazásszintű sebességkorlát. Az éles környezetben a fojtást az API Gateway / Lambda párhuzamossági szintre bízzuk, a saját üzemeltetésű telepítéseknél pedig arra, amit a fordított proxy (reverse proxy) érvényesít.

## OAuth-felfedezés

Az MCP-szerver OAuth 2.1 metaadatokat hirdet, hogy azok a kliensek, amelyek csak OAuth-felfedezéssel rendelkező szerverekhez csatlakoznak — különösen a Claude.ai „Add custom connector” felülete —, beillesztett kulcs nélkül be tudják jelentkeztetni a felhasználót. Az `/mcp` a védett erőforrás, a `/membership/oauth` alatti [OAuth-szolgáltató](./connected-apps) az engedélyezési szerver, a B1Admin `/oauth` oldala pedig a hozzájáruló képernyő.

| Végpont | Cél |
|---|---|
| `GET /.well-known/oauth-protected-resource` (valamint `/.well-known/oauth-protected-resource/mcp`) | Védett erőforrás metaadatai (RFC 9728): a `resource` értéke `<api>/mcp`, az `authorization_servers` az API gyökere, a `scopes_supported` pedig felsorolja az összes [API-kulcs-hatókört](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Engedélyezési szerver metaadatai (RFC 8414): az `authorization_endpoint` a B1Admin `/oauth`, a `token_endpoint` a `/membership/oauth/token`, a `registration_endpoint` a `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dinamikus kliensregisztráció (RFC 7591) |

A folyamat, amelyet egy olyan kliens, mint a claude.ai végrehajt:

1. A `POST /mcp` token nélkül 401-es választ ad, a `WWW-Authenticate` fejléccel, amely a védett erőforrás metaadataira mutat.
2. A kliens beolvassa mindkét metaadat-dokumentumot, majd regisztrálja magát a `POST /membership/oauth/register` végponton, elküldve a `client_name` és `redirect_uris` mezőket, és opcionálisan a `scope` mezőt. Minden önregisztrált kliens **nyilvános** (public) kliens: nem kap titkot, a válasz pedig `token_endpoint_auth_method: "none"` értéket tartalmaz. Az átirányítási URI-knak `https`-nek kell lenniük, vagy `http`-nek loopback-címen (`localhost`, `127.0.0.1`, `[::1]`); kliensenként legfeljebb 10. A regisztráció IP-címenként óránként 20-ra van korlátozva.
3. A felhasználó a B1Admin `/oauth` oldalra kerül a `code_challenge` és `code_challenge_method=S256` paraméterekkel. A hozzájárulási oldal közérthető nyelven felsorolja az egyes kért hatóköröket (vagy „Everything your B1 account can access”, ha nem kértek semmit), megmutatja azt a gazdagépet, ahová a felhasználó visszairányításra kerül, és jelzi, ha az alkalmazás önmaga regisztrálta magát. A felhasználó az **Allow** gombra kattint.
4. A kliens a kódot a `/membership/oauth/token` végponton váltja be a `grant_type=authorization_code` és a saját `code_verifier` értékével, később pedig `grant_type=refresh_token`-nel frissít. Mind a form-kódolt, mind a JSON törzs elfogadott.
5. Az így kapott hozzáférési token egy hatókörű B1 JWT, amelyet bearer-tokenként használnak az `/mcp` végponton.

PKCE-szabályok: csak `S256` fogadható el. Titok nélküli kliensnek `code_challenge`-et kell küldenie az engedélyezésnél, és a megfelelő `code_verifier`-t a token-cserénél. A bizalmas (titkot használó) kliensek továbbra is használhatják csak a titkot. Az átirányítási URI-knak pontosan egyezniük kell egy regisztrált URI-val.

Azok a kliensek, amelyek statikus bearer-tokent fogadnak el a konfigurációjukban — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, egyéni kód —, továbbra is használhatnak `cak_…` kulcsot.

## Helyi fejlesztés

Az MCP-végpont a többi végponttal együtt csatlakozik, amikor az API helyben fut:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Az indításkor megjelenő `📡 MCP server ready at /mcp — N routes in inventory` naplósor megerősíti, hogy a lista felépült.

Ellenőrizd az MCP Inspectorral:

```bash
npx @modelcontextprotocol/inspector
```

Az Inspector felületén állítsd be a `http://localhost:8084/mcp` címet, és az `Authorization` fejlécet `Bearer cak_<prefix>.<secret>` értékre. Először hívd meg a `list_endpoints` eszközt; meg kell kapnod a teljes útvonallistát. Ezután az `api_call({ method: "GET", path: "/membership/people" })` hívásnak vissza kell adnia a helyi seed-személyeidet.

## Kódszerkezet

Az MCP-szerver az Api repó `src/modules/mcp/` könyvtárában található. Fontosabb fájlok:

| Fájl | Cél |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; minden kéréshez `StreamableHTTPServerTransport`-ot köt be, és a 401-es válaszon elküldi a `WWW-Authenticate` kihívást |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Kiszolgálja a `/.well-known` OAuth-felfedezési dokumentumokat |
| `McpServer.ts` | Felépíti az MCP `Server` példányt, és regisztrálja a négy eszközt |
| `RouteInventory.ts` | Indításkor bejárja az inversify-express-utils metaadatait az útvonalak felsorolásához |
| `internalDispatch.ts` | Szintetikus `req`/`res` objektumok, amelyek folyamatban visszalépnek az Express-alkalmazásba |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kurált kérés- és válaszminták a nagy forgalmú végpontokhoz |

## Kapcsolódó

- [API-kulcsok](./api-keys)
- [Webhookok](./webhooks)
- [Összekapcsolt alkalmazások (OAuth)](./connected-apps)
- [Claude — végfelhasználói beállítás](/docs/b1-admin/integrations/claude)
- [ChatGPT — végfelhasználói beállítás](/docs/b1-admin/integrations/chatgpt)
