---
title: "MCP Server"
---

# MCP Server

<div class="article-intro">

I-B1 API ihamba ne-server ye-[MCP (Model Context Protocol)](https://modelcontextprotocol.io) ku-`/mcp`. Nome ngusiphi client we-AI locondzisisa i-MCP — Claude Code, Claude Desktop, i-OpenAI Agents SDK, Cursor, nobe lowakho — angaxhuma kuyo futsi abite i-REST API lengephansi egameni lemsebentisi welibandla lotivakalisiwe. Yi-wrapper lecinane, lejikelele: emathulusi lamatsatfu lajikelele akhipha lonkhe luhla lwe-API ngendlela leshintjashintjako kunekufanekisa i-endpoint ngayinye ngesandla, kanjalo nelilinye ithulusi lemhlahlandlela wecondza kwesigaba se-website builder.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- [Sikhiya se-B1 API](./api-keys) (`cak_…`) lesinema-scope lokufanele client abe nawo
- I-host ye-B1 API lefinyeleleka — `https://api.churchapps.org` kumabandla la-hosted, nobe deployment yakho ngokwakho
- I-MCP client. Buka [Claude](/docs/b1-admin/integrations/claude) ne-[ChatGPT](/docs/b1-admin/integrations/chatgpt) kuhlelwa kwemsebentisi wekugcina

</div>

## I-Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Sici | Linani |
|---|---|
| **Umkhondvo** | `/mcp` (kuhambisana ne-host ye-API) |
| **Inchubo** | `POST` kuphela — sicelo/mphendvulo kanye ne-SSE streaming kokubili kwenteka ku-endpoint lefanako |
| **Kutfutfusa** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Simo se-session** | Akukho simo lesigcinwe. I-instance lensha ye-MCP server yakhiwa sicelo ngasinye — akukho session id, akukho kuchubeka |
| **Kutivakalisa** | Bearer token. Tikhiya te-API te-`cak_…` kanye nema-JWT e-B1 kokubili kuyasebenta; kusombululwa kufana nanome ngusiphi i-endpoint lesitivakalisiwe |

Sicelo lesingenayo i-header ye-`Authorization` nobe lengafanele sibuyisela:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

nge-HTTP 401.

## Emathulusi

Emathulusi lamatsatfu lajikelele kanye nelilinye lomhlahlandlela. I-model isebentisa i-`list_endpoints` kutfola, i-`describe_endpoint` kufundza umumo we-payload, i-`api_call` kuhlaba i-API ngempela, kanye ne-`describe_page_builder` nangabe umsebenti ufaka kucuketfwe kwewebhusayithi.

### `list_endpoints`

Ibuyisela luhla logcwele lwemikhondvo ye-REST lebhaliswe, kucengiwe nge-substring lekhetsekile kanye/nobe indlela ye-HTTP. Singeniso ngasinye sifaka ligama le-controller kanye nema-scope etikhiya te-API lokungenteka adzingeke kakhulu.

**Kungeniso:**

| Insimu | Luhlobo | Incazelo |
|---|---|---|
| `filter` | string (kungakhetsi) | Substring lengakhalisi bukhulu betinhlamvu, ilinganiswa nemkhondvo, sibonelo `"people"` |
| `method` | enum (kungakhetsi) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Kuphuma:** libhalo le-JSON lelinjenge:

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

Luhla lwakhiwa kanye ekucaleni kwe-API kusuka etafuleni lemikhondvo lephilako — nome ngutfoni longayifikela nge-`curl` kuvela lapha.

### `describe_endpoint`

Ibuyisela sifingqo lesifisha kanye, nangabe kukhona, umtimba wesicelo losanhlobo nesibonelo semphendvulo se-endpoint linye.

**Kungeniso:**

| Insimu | Luhlobo | Incazelo |
|---|---|---|
| `method` | string | Indlela ye-HTTP |
| `path` | string | Umkhondvo logcwele njengobe ubuyiselwa yi-`list_endpoints` |

**Kuphuma:** ku-endpoint letisiwe, sibonelo esine-`summary`, `requestBody`, kanye ne-`responseSample`. Ku-endpoint letingakalungiswa, umlayeto wekusiza lokhomba i-model kubita i-`GET` kucala kuze ibone sifanekiso. Cishe emikhondvo lesi-12 lehamba kakhulu (bantfu, emacembu, eminikelo, kubakhona, tikhwama) yalungiselelwe.

### `api_call`

Ihlaba i-endpoint yeREST lekhetsiwe, ngekhatsi kwenchubo, ngekhatsi kwe-stack yefanako ye-Express middleware njengesicelo lesivamile se-HTTP — kutivakalisa, kuhlatiya umtimba, kubhalwa kwe-audit, kanye nekuncishiswa kwelibandla ngalinye konkhe kuyasebenta.

**Kungeniso:**

| Insimu | Luhlobo | Incazelo |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Umkhondvo kufaka nome ngusiphi module prefix, sibonelo `/membership/people` |
| `query` | object (kungakhetsi) | Sitfo lesicinile setiphawuli te-query-string |
| `body` | any (kungakhetsi) | Umtimba wesicelo se-JSON — ngalokuvamile luhla lwetitfo te-model kuma-`POST` |

**Kuphuma:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* imphendvulo ye-JSON ye-controller */ ]
}
```

Umphumela wethulusi uphawulwa nge-`isError: true` kunome ngusiphi imphendvulo lene-status ≥ 400.

### `describe_page_builder`

Lelodwa ithulusi lelingasilo lejikelele: umhlahlandlela lomile, lotimele wekwakha emakhasi ewebhusayithi ngema-endpoint e-`/content/*` — sifanekiso sedatha se-Page → Section → Element, inchubo yekwakha, `elementType` ngayinye ngesimo sayo se-`answersJSON`, tilungiselelo tesigaba njenge-shape dividers te-`dividerTop`/`dividerBottom`, kanye nesibonelo lesisebentako ekucaleni kuya ekugcineni. Ayidzingi kungeniso futsi ifanana neluhla lwema-element logcinwa ku-editor ye-B1Admin (buka [Website Builder Architecture](../architecture/website-builder)). Ema-Agent alindzelekile kubita loku kanye ngaphambi kwekwakha nobe kuhlela kucuketfwe kwelikhasi, bese enta ngesento nge-`api_call`.

## Sifanekiso Sekutivakalisa

Sicelo se-MCP ngokwaso sihamba ngekhatsi kwe-`CustomAuthProvider.getUser()` — indlela lefanako lesetjentiswa yiyo yonkhe i-endpoint ye-B1 letivakalisiwe. I-bearer ye-`cak_…` isombulula kuya ku-`Principal` lonetinsayeya letiyi-RBAC yaleso sikhatsi yemuntfu lokhishe sikhiya, **lehlanganiswe** nema-scope lanikwe sikhiya. Loku kuhlanganiswa kuyabalwa kabusha sicelo ngasinye, ngako:

- Kususa scope kusikhiya (ngekusisula nekusakha kabusha) kunciphisa kufinyelela ecelweni lelilandzelako.
- Kususa imvumo kumuntfu longephansi ku-B1Admin kunciphisa kufinyelela ecelweni lelilandzelako, ngisho nome sikhiya sisekhona.

Kuma-`api_call` labiliwe ngekhatsi, i-header ye-`Authorization` yeveleni ikopishwa ku-sicelo lesenzakalelo, ngako i-`CustomAuthProvider` isebenta futsi kuhlanganiswa kwe-scope kuphindzwe kusebenta sicelo ngasinye. Akukho kugcinwa kwe-token.

## Luhla Lwemikhondvo Levinjelwe

Luhla loluncane lwemikhondvo alufinyeleleki nge-`api_call`, ngisho ngesikhiya lesisebentako:

| Sifanekiso | Kungani |
|---|---|
| `/giving/donate/webhook/*` | Ema-endpoint ewebhook we-provider alindzele imitimba loluhlata, lecinisekiswe ngesayindvo lesuka ku-Stripe/PayPal — hhayi babiti labajikelele |
| `/membership/oauth/clients*` | Kubhaliswa kwe-OAuth client kwemphatsi kuphela |
| `/membership/people/apiEmails` | Kuvinjelwe yi-jwtSecret yemphatsi, hhayi timvumo temsebentisi |
| Nome ngumuphi umkhondvo lolindzele i-`multipart/form-data` | Kuvetwa kwemafayela akusiko kuhambisana ne-JSON-RPC |

Umkhondvo lovinjelwe ubuyisela umphumela wethulusi longe-`isError: true` nemlayeto lochazako; umkhondvo lolungephansi awukaze uhlatjwe.

## Sikhala Sekukhulu Kwemphendvulo

Umtimba wemphendvulo ye-`api_call` ngayinye uvinjelwe ku-**64 KB** yekuphuma lokubanjiwe. Nangabe umbuto wendlula sikhala, imphendvulo itfwele i-`"truncated": true` futsi i-model ilindzeleke kuphindze izame ngeticengo te-query letincane. Loku kugcina imphendvulo yethulusi linye ingacisheli i-context window ye-client.

## Kuncishiswa Kwesivinini

Akukho kuncishiswa kwesivinini kuluhla lwe-app ku-`/mcp`. Kuvimbela kutfunyelwe ku-API Gateway / Lambda concurrency ku-production, futsi kunome ngutfoni lolusetjentiswa yi-reverse proxy yakho kuma-deployment latihlele.

## Kutfolwa Kwe-OAuth

I-MCP server **ayikhutjatisi** i-metadata ye-OAuth 2.1 (`/.well-known/oauth-authorization-server`, kubhaliswa kwe-client lokushintjashintjako, inchubo ye-PKCE). Ema-client ladzinga ema-server e-MCP latfolakala nge-OAuth — ikakhulu i-UI ye-Claude.ai ye-"Add custom connector" kanye nesici se-ChatGPT se-"Connectors" — angeke akhone kuxhuma ngaphandle kwaloko.

Ema-client lemukelako i-static bearer token ku-config yawo — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, khodi yakho ngokwakho — asebenta nyalo. I-[OAuthController](/docs/developer/api/connected-apps) lesikhona seyikhipha ema-token nge-authorization-code + PKCE kuma-app etitsatfu; layela lelihambisana ne-MCP-spec lekutfolwa etulu kwaleyo lingavala lelisikhala.

## Kutfutfuka Endzaweni Yakho

I-endpoint ye-MCP iyanamathela kanye naletinye tonkhe nawusebentisa i-API endzaweni yakho:

```bash
cd Api
npm run dev
# I-Server ilalele ku-http://localhost:8084
```

Ekucaleni umugca we-log 📡 MCP server ready at /mcp — N routes in inventory ucinisekisa kutsi luhla seluakhiwe.

Hlola nge-MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Ku-UI ye-Inspector, khomba ku-`http://localhost:8084/mcp` bese uhlela i-header ye-`Authorization` ibe `Bearer cak_<prefix>.<secret>`. Bita i-`list_endpoints` kucala; kufanele ubone luhla logcwele lwemikhondvo. Bese i-`api_call({ method: "GET", path: "/membership/people" })` kufanele ibuyisele bantfu bakho be-seed lendzaweni yakho.

## Umumo We-Khodi

I-MCP server ihlala ku-`src/modules/mcp/` ku-repository ye-Api. Emafayela lasemcoka:

| Fayela | Injongo |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; ixhuma i-`StreamableHTTPServerTransport` sicelo ngasinye |
| `McpServer.ts` | Yakha i-MCP `Server`, ibhalise emathulusi lamane |
| `RouteInventory.ts` | Ihamba ku-inversify-express-utils metadata ekucaleni kubala imikhondvo |
| `internalDispatch.ts` | I-`req`/`res` yenzakalenzelo lengena kabusha ku-app ye-Express ngekhatsi kwenchubo |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Tibonelo tesicelo/temphendvulo letilungisiwe kuma-endpoint lahamba kakhulu |

## Kuhlobene

- [API Keys](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
- [Claude — kuhlelwa kwemsebentisi wekugcina](/docs/b1-admin/integrations/claude)
- [ChatGPT — kuhlelwa kwemsebentisi wekugcina](/docs/b1-admin/integrations/chatgpt)
