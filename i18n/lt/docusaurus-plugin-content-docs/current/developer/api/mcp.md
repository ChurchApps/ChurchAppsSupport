---
title: "MCP serveris"
---

# MCP serveris

<div class="article-intro">

B1 API pateikia [MCP (Model Context Protocol)](https://modelcontextprotocol.io) serverį adresu `/mcp`. Bet kuris MCP palaikantis DI klientas (claude.ai pasirinktinės jungtys, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor ar jūsų pačių sukurtas) gali prie jo prisijungti ir kviesti pagrindinę REST API jau autentifikuoto bažnyčios vartotojo vardu. Tai plonas, bendras apvalkalas: trys bendri įrankiai dinamiškai atskleidžia visą API paviršių, vietoj to, kad kiekvienas galinis taškas būtų modeliuojamas atskirai, o dar vienas domeno vadovo įrankis skirtas svetainių kūrėjui.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [B1 API raktas](./api-keys) (`cak_…`) su leidimais (scopes), kuriuos klientas turėtų turėti, arba MCP klientas, galintis prisijungti per OAuth (žr. [OAuth aptikimas](#oauth-discovery))
- Pasiekiamas B1 API serveris: `https://api.churchapps.org` bažnyčioms, naudojančioms talpinimą, arba jūsų pačių diegimas
- MCP klientas. Galutinių vartotojų sąrankai žr. [Claude](/docs/b1-admin/integrations/claude) ir [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Galutinis taškas

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspektas | Reikšmė |
|---|---|
| **Kelias** | `/mcp` (santykinis API serverio atžvilgiu) |
| **Metodas** | tik `POST`. Užklausa ir atsakymas, taip pat SSE srautinis perdavimas vyksta tame pačiame galiniame taške |
| **Transportas** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sesijos modelis** | Be būsenos. Kiekvienai užklausai sukuriama nauja MCP serverio instancija. Sesijos ID nėra, tęsimo funkcijos taip pat nėra |
| **Autentifikavimas** | Bearer žetonas. Veikia `cak_…` API raktai ir B1 JWT (įskaitant OAuth prieigos žetonus). Žetonų atpažinimas toks pat kaip ir bet kuriame kitame autentifikuotame galiniame taške |

Užklausa, kurios `Authorization` antraštė trūksta arba yra neteisinga, grąžina:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

su HTTP 401 statusu ir antraštе `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. OAuth palaikantys klientai ją seka, kad pradėtų prisijungimą.

Talpinamame API (produkcijoje ir demonstracinėje aplinkoje) `/mcp` pasiekiamas per API Gateway HTTP API, o ne per REST API, kuris naudojamas kitiems galiniams taškams. REST API Lambda proxy atsakymuose pervadina `WWW-Authenticate` į `x-amzn-remapped-www-authenticate`. Dėl to tokie klientai kaip ChatGPT gaudavo tuščią 401 atsakymą ir negalėjo pradėti prisijungimo. HTTP API šią antraštę perduoda nepakeistą.

## Įrankiai

Trys bendri įrankiai ir vienas vadovas. Modelis naudoja `list_endpoints`, kad atrastų galinius taškus, `describe_endpoint`, kad sužinotų užklausos turinio formą, `api_call`, kad iš tiesų iškviestų API, ir `describe_page_builder`, kai užduotis susijusi su svetainės turiniu.

### `list_endpoints`

Grąžina visą registruotų REST maršrutų sąrašą, filtruojamą pagal pasirinktinį teksto fragmentą ir (arba) HTTP metodą. Kiekviename įraše nurodomas valdiklio pavadinimas ir API raktų leidimai, kurių greičiausiai prireiks.

**Įvestis:**

| Laukas | Tipas | Aprašymas |
|---|---|---|
| `filter` | string (neprivaloma) | Teksto fragmentas, ieškomas kelyje nepriklausomai nuo raidžių dydžio, pvz., `"people"` |
| `method` | enum (neprivaloma) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Išvestis:** JSON dokumentas tokia forma:

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

Sąrašas sudaromas vieną kartą API paleidimo metu iš veikiančios maršrutų lentelės. Viskas, ką galite pasiekti su `curl`, čia atsiranda.

### `describe_endpoint`

Grąžina trumpą santrauką ir, jei yra, rankiniu būdu parengtą užklausos turinio pavyzdį bei atsakymo pavyzdį vienam galiniam taškui.

**Įvestis:**

| Laukas | Tipas | Aprašymas |
|---|---|---|
| `method` | string | HTTP metodas |
| `path` | string | Pilnas kelias, kaip grąžino `list_endpoints` |

**Išvestis:** kuriems galiniams taškams yra parengti pavyzdžiai, grąžinamas pavyzdys su `summary`, `requestBody` ir `responseSample`. Galiniams taškams be pavyzdžio grąžinamas atsarginis pranešimas, nurodantis modeliui pirmiausia iškviesti `GET`, kad pamatytų formą. Parengta apie tuziną dažnai naudojamų maršrutų (asmenys, grupės, aukos, lankomumas, fondai).

### `api_call`

Iškviečia pasirinktą REST galinį tašką vykdymo aplinkoje per tą patį Express tarpinės programinės įrangos sluoksnį, kurį naudoja įprasta HTTP užklausa. Taikomi autentifikavimas, turinio apdorojimas, veiksmų žurnalavimas ir kiekvienos bažnyčios duomenų apribojimai.

**Įvestis:**

| Laukas | Tipas | Aprašymas |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Kelias, įskaitant modulio priešdėlį, pvz., `/membership/people` |
| `query` | object (neprivaloma) | Paprastas objektas su užklausos eilutės parametrais |
| `body` | any (neprivaloma) | JSON užklausos turinys, paprastai modelio objektų masyvas `POST` užklausoms |

**Išvestis:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Įrankio rezultatas pažymimas `isError: true` bet kuriam atsakymui, kurio statusas ≥ 400.

### `describe_page_builder`

Vienintelis neuniversalus įrankis. Tai statinis, savarankiškas vadovas, kaip kurti svetainės puslapius per `/content/*` galinius taškus: Puslapio → Skyriaus → Elemento duomenų modelis, kūrimo eiga, kiekvienas `elementType` su jo `answersJSON` forma, skyriaus lygio nustatymai, pvz., `dividerTop` / `dividerBottom` formos skirtukai, ir pilnas pavyzdys nuo pradžios iki galo. Įvesties jis neturi. Jis atitinka elementų katalogą, kurį palaiko B1Admin redaktorius (žr. [Svetainės kūrėjo architektūrą](../architecture/website-builder)). Tikimasi, kad agentai jį iškvies vieną kartą prieš kurdami ar redaguodami puslapio turinį, o vėliau veiks per `api_call`.

## Autentifikavimo modelis

Pati MCP užklausa eina per `CustomAuthProvider.getUser()`, t. y. tuo pačiu keliu, kuriuo eina kiekvienas autentifikuotas B1 galinis taškas. `cak_…` bearer žetonas išsprendžiamas į `Principal`, kurio leidimai yra išduodančio asmens dabartinės RBAC teisės, **susikertančios** su raktui suteiktais leidimais. Šis susikirtimas perskaičiuojamas kiekvienai užklausai, todėl:

- Pašalinus leidimą iš rakto (ištrinus ir sukūrus jį iš naujo), prieiga nutrūksta kitai užklausai.
- Pašalinus teisę iš pagrindinio asmens B1Admin, prieiga nutrūksta kitai užklausai, net jei raktas vis dar egzistuoja.

Įdėtiniams `api_call` kvietimams pradinė `Authorization` antraštė nukopijuojama į sintetinę užklausą, todėl `CustomAuthProvider` veikia iš naujo ir leidimų susikirtimas taikomas kiekvienam kvietimui. Žetonai nekešuojami.

## Kelių sąrašas

Kai kurie maršrutai nepasiekiami per `api_call`, net ir su galiojančiu raktu:

| Šablonas | Kodėl |
|---|---|
| `/giving/donate/webhook/*` | Teikėjų webhook galiniai taškai laukia neapdorotų, parašu patikrintų turinių iš Stripe / PayPal, o ne iš bendrų klientų |
| `/membership/oauth/clients*` | OAuth kliento registracija skirta tik operatoriui |
| `/membership/people/apiEmails` | Apribota operatoriaus `jwtSecret`, o ne vartotojo leidimais |
| Bet koks maršrutas, kuris tikisi `multipart/form-data` | Failų įkėlimas nėra patogus JSON-RPC |

Užblokuotas kelias grąžina `isError: true` įrankio rezultatą su aprašomuoju pranešimu. Pagrindinis maršrutas niekada nėra iškviečiamas.

## Atsakymo dydžio riba

Kiekvieno `api_call` atsakymo turinys apribojamas iki **64 KB** užfiksuotos išvesties. Jei užklausa viršija šią ribą, atsakyme pateikiamas `"truncated": true`, o modelio tikimasi bandyti dar kartą su siauresniais užklausos parametrais. Tai neleidžia vienam įrankio atsakymui išsprogdinti kliento konteksto lango.

## Užklausų ribojimas

Programos lygmens užklausų ribojimo `/mcp` nėra. Produkcijoje srauto valdymas atidedamas API Gateway / Lambda vienu metu vykdomų užduočių ribai, o savarankiškai talpinamuose diegimuose – tam, ką jūsų atvirkštinis tarpinis serveris (reverse proxy) nustato.

## OAuth aptikimas

MCP serveris skelbia OAuth 2.1 metaduomenis, kad klientai, kurie jungiasi tik prie OAuth aptiktų serverių, visų pirma claude.ai vartotojo sąsajos „Add custom connector“, galėtų prisijungti vartotoją be įklijuoto rakto. `/mcp` yra apsaugotas išteklius, esamas [OAuth teikėjas](./connected-apps) kelyje `/membership/oauth` yra jo autorizacijos serveris, o B1Admin puslapis `/oauth` yra sutikimo ekranas.

| Galinis taškas | Paskirtis |
|---|---|
| `GET /.well-known/oauth-protected-resource` (taip pat `/.well-known/oauth-protected-resource/mcp`) | Apsaugoto išteklių metaduomenys (RFC 9728): `resource` yra `<api>/mcp`, `authorization_servers` yra API šaknis, `scopes_supported` išvardija visus [API raktų leidimus](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Autorizacijos serverio metaduomenys (RFC 8414): `authorization_endpoint` yra B1Admin `/oauth`, `token_endpoint` yra `/membership/oauth/token`, `registration_endpoint` yra `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dinaminė kliento registracija (RFC 7591) |

Procesas, kurį vykdo claude.ai ar panašus klientas:

1. `POST /mcp` be žetono grąžina 401 su `WWW-Authenticate` antrašte, nukreipiančia į apsaugoto išteklių metaduomenis.
2. Klientas nuskaito abu metaduomenų dokumentus, tada registruojasi per `POST /membership/oauth/register`, siųsdamas `client_name`, `redirect_uris` ir pasirinktinai `scope`. Kiekvienas savarankiškai užregistruotas klientas yra **viešas** klientas: paslaptis neišduodama, o atsakyme yra `token_endpoint_auth_method: "none"`. Nukreipimo URI turi būti `https`, arba `http` tik loopback adresui (`localhost`, `127.0.0.1`, `[::1]`). Vienam klientui leidžiama ne daugiau kaip 10 URI. Registracija ribojama 20 kartų per valandą vienam IP.
3. Vartotojas nukreipiamas į B1Admin `/oauth` su `code_challenge` ir `code_challenge_method=S256`. Sutikimo puslapyje paprasta kalba išvardijamas kiekvienas prašomas leidimas (arba „Viskas, ką gali pasiekti jūsų B1 paskyra“, jei leidimų neprašyta), nurodomas serveris, į kurį vartotojas bus grąžintas, ir pažymima, kai programa užsiregistravo pati. Vartotojas spusteli **Leisti**.
4. Klientas iškeičia kodą į `/membership/oauth/token` su `grant_type=authorization_code` ir savo `code_verifier`, o vėliau atnaujina žetoną su `grant_type=refresh_token`. Priimami tiek formos koduoti, tiek JSON turiniai.
5. Gautas prieigos žetonas yra apribotas B1 JWT, naudojamas kaip bearer žetonas `/mcp`.

PKCE taisyklės: priimamas tik `S256`. Klientas be paslapties turi pateikti `code_challenge` autorizacijos metu ir atitinkamą `code_verifier` keičiant žetoną. Konfidencialūs klientai (su paslaptimi) gali naudoti vien paslaptį. Nukreipimo URI turi visiškai sutapti su registruotu URI.

Klientai, kurie savo konfigūracijoje priima statinį bearer žetoną (Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, pasirinktinis kodas), gali toliau naudoti `cak_…` raktą.

## Vietinė plėtra

MCP galinis taškas įdiegiamas kartu su visa kita, kai API paleidžiamas lokaliai:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Paleidimo metu žurnalo eilutė `📡 MCP server ready at /mcp — N routes in inventory` patvirtina, kad sąrašas sudarytas.

Patikrinkite su MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Inspector vartotojo sąsajoje nurodykite `http://localhost:8084/mcp` ir nustatykite `Authorization` antraštę į `Bearer cak_<prefix>.<secret>`. Pirmiausia iškvieskite `list_endpoints`. Turėtumėte pamatyti visą maršrutų sąrašą. Tada `api_call({ method: "GET", path: "/membership/people" })` turėtų grąžinti jūsų lokalius pradinius asmenis.

## Kodo struktūra

MCP serveris yra `src/modules/mcp/` kataloge Api saugykloje. Svarbiausi failai:

| Failas | Paskirtis |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; kiekvienai užklausai prijungia `StreamableHTTPServerTransport` ir 401 atveju siunčia `WWW-Authenticate` iššūkį |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Teikia `/.well-known` OAuth aptikimo dokumentus |
| `McpServer.ts` | Sukuria MCP `Server` ir užregistruoja keturis įrankius |
| `RouteInventory.ts` | Paleidimo metu nuskaito inversify-express-utils metaduomenis, kad išvardytų maršrutus |
| `internalDispatch.ts` | Sintetiniai `req` / `res`, kurie vykdymo aplinkoje vėl įeina į Express programą |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Parengti užklausų ir atsakymų pavyzdžiai dažnai naudojamiems galiniams taškams |

## Susiję

- [API raktai](./api-keys)
- [Webhook](./webhooks)
- [Susietos programos (OAuth)](./connected-apps)
- [Claude: galutinio vartotojo sąranka](/docs/b1-admin/integrations/claude)
- [ChatGPT: galutinio vartotojo sąranka](/docs/b1-admin/integrations/chatgpt)
