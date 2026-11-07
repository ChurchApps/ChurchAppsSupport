---
title: "MCP-server"
description: "Konfigurera MCP-åtkomst till B1 API så att AI-klienter som Claude Code, Cursor eller Claude Desktop kan anropa församlingsdataendpoints med API-nycklar eller OAuth-inloggning."
---

# MCP-server

<div class="article-intro">

B1 API:et innehåller en [MCP-server](https://modelcontextprotocol.io) (Model Context Protocol) på `/mcp`. Alla MCP-kompatibla AI-klienter, som claude.ai-anpassade konnektorer, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor eller en egen lösning, kan ansluta till den och anropa det underliggande REST API:et för en autentiserad kyrkanvändare. Det är ett tunt, generiskt omslag: tre generiska verktyg exponerar hela API-ytan dynamiskt i stället för att modellera varje endpoint för hand, plus ett domänspecifikt guideverktyg för webbplatsbyggaren.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- En [B1 API-nyckel](./api-keys.md) (`cak_…`) med de behörigheter (scopes) som klienten ska ha, eller en MCP-klient som kan logga in med OAuth (se [OAuth-identifiering](#oauth-discovery))
- En nåbar B1 API-värd. `https://api.churchapps.org` för hostade kyrkor, eller din egen driftsättning
- En MCP-klient. Se [Claude](/docs/b1-admin/integrations/claude) och [ChatGPT](/docs/b1-admin/integrations/chatgpt) för installation för slutanvändare

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Egenskap | Värde |
|---|---|
| **Sökväg** | `/mcp` (relativt till API-värden) |
| **Metod** | Endast `POST`. Både förfrågan/svar och SSE-strömning sker på samma endpoint |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sessionsmodell** | Tillståndslös. En ny MCP-serverinstans byggs för varje förfrågan. Inget session-id och ingen återupptagning |
| **Autentisering** | Bearer-token. `cak_…`-API-nycklar och B1-JWT:er (inklusive OAuth-åtkomsttokens) fungerar båda. Hanteringen är densamma som för alla andra autentiserade endpoints |

En förfrågan där `Authorization`-huvudet saknas eller är ogiltigt returnerar:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

med HTTP 401 och ett huvud `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. OAuth-kapabla klienter följer detta för att starta inloggningen.

På det hostade API:et (produktion och demo) betjänas `/mcp` via ett API Gateway HTTP API, i stället för det REST API som används för övriga endpoints. REST API:et byter namn på `WWW-Authenticate` till `x-amzn-remapped-www-authenticate` i Lambda-proxysvar, vilket gjorde att klienter som ChatGPT fick ett nakalt 401-svar utan sätt att starta inloggningen. HTTP API:et skickar huvudet oförändrat vidare.

## Verktyg

Tre generiska verktyg och en guide. Modellen använder `list_endpoints` för att upptäcka endpoints, `describe_endpoint` för att lära sig en nyttolasts form, `api_call` för att faktiskt anropa API:et och `describe_page_builder` när uppgiften gäller webbplatsens innehåll.

### `list_endpoints`

Returnerar hela inventariet av registrerade REST-rutter, filtrerat med en valfri delsträng och/eller HTTP-verb. Varje post innehåller kontrollernamnet och de API-nyckelbehörigheter (scopes) som sannolikt behövs.

**Indata:**

| Fält | Typ | Beskrivning |
|---|---|---|
| `filter` | sträng (valfri) | Skiftlägesoberoende delsträng som matchas mot sökvägen, t.ex. `"people"` |
| `method` | enum (valfri) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Utdata:** ett JSON-dokument i formen

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

Inventariet byggs en gång vid API-start från den levande ruttabellen. Allt som går att anropa med `curl` finns med här.

### `describe_endpoint`

Returnerar en kort sammanfattning och, där det finns, en handskriven exempelbegäran och exempelsvar för en endpoint.

**Indata:**

| Fält | Typ | Beskrivning |
|---|---|---|
| `method` | sträng | HTTP-verb |
| `path` | sträng | Fullständig sökväg som returneras av `list_endpoints` |

**Utdata:** för kuraterade endpoints ett exempel med `summary`, `requestBody` och `responseSample`. För ej kuraterade endpoints ett reservmeddelande som instruerar modellen att först anropa `GET` för att se formen. Ungefär ett dussin högtrafikerade rutter (personer, grupper, gåvor, närvaro, fonder) är kuraterade.

### `api_call`

Anropar valt REST-endpoint, i processen, genom samma Express-middleware-stack som en vanlig HTTP-förfrågan. Autentisering, innehållsbearbetning, granskningsloggning och scoping per kyrka tillämpas alla.

**Indata:**

| Fält | Typ | Beskrivning |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | sträng | Sökväg inklusive eventuellt modulprefix, t.ex. `/membership/people` |
| `query` | objekt (valfri) | Platt objekt med frågesträngsparametrar |
| `body` | valfri typ | JSON-förfrågans innehåll, vanligtvis en array med modellobjekt för `POST` |

**Utdata:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Verktygsresultatet markeras med `isError: true` för alla svar med status ≥ 400.

### `describe_page_builder`

Det enda icke-generiska verktyget: en statisk, självständig guide för att bygga webbplatssidor via `/content/*`-endpoints. Den beskriver datamodellen Page → Section → Element, skapandeflödet, varje `elementType` med dess `answersJSON`-form, sektionsinställningar som formdelarna `dividerTop`/`dividerBottom`, samt ett fullständigt exempel från början till slut. Verktyget tar inga indata och speglar elementkatalogen som underhålls i B1Admin-editorn (se [Arkitektur för webbplatsbyggaren](../architecture/website-builder.md)). Agenter förväntas anropa det en gång innan de skapar eller redigerar sidinnehåll, och agera sedan via `api_call`.

## Autentiseringsmodell

Själva MCP-förfrågan körs genom `CustomAuthProvider.getUser()`, samma väg som alla autentiserade B1-endpoints använder. En `cak_…`-bearer löses till en `Principal` vars behörigheter är den utfärdande personens aktuella RBAC, **intersekterad** med nyckelns beviljade scopes. Denna intersektion beräknas om vid varje förfrågan, vilket innebär att:

- Att ta bort ett scope från en nyckel (genom att radera och skapa om den) stoppar åtkomsten vid nästa anrop.
- Att ta bort en behörighet från den underliggande personen i B1Admin stoppar åtkomsten vid nästa anrop, även om nyckeln fortfarande finns.

För nästlade `api_call`-anrop kopieras det ursprungliga `Authorization`-huvudet till den syntetiska förfrågan, så `CustomAuthProvider` körs igen och scope-intersektionen tillämpas på nytt för varje anrop. Ingen tokencachning sker.

## Blockerad sökvägslista

Ett litet antal rutter kan inte nås via `api_call`, även med en giltig nyckel:

| Mönster | Varför |
|---|---|
| `/giving/donate/webhook/*` | Webhook-endpoints för leverantörer förväntar sig råa, signaturverifierade innehåll från Stripe/PayPal, inte från allmänna anropare |
| `/membership/oauth/clients*` | OAuth-klientregistrering är endast för operatörer |
| `/membership/people/apiEmails` | Skyddad av operatörens `jwtSecret`, inte av användarbehörigheter |
| Alla rutter som förväntar sig `multipart/form-data` | Filuppladdningar är inte anpassade för JSON-RPC |

En blockerad sökväg returnerar ett verktygsresultat med `isError: true` och ett beskrivande meddelande. Den underliggande rutten anropas aldrig.

## Storleksgräns för svar

Varje `api_call`-svar begränsas till **64 KB** fångad utdata. Om en fråga överskrider gränsen innehåller svaret `"truncated": true`, och modellen förväntas försöka igen med smalare frågeparametrar. Detta förhindrar att ett enskilt verktygssvar spränger klientens kontextfönster.

## Hastighetsbegränsning

Det finns ingen applikationsnivå-hastighetsbegränsning på `/mcp`. Trafikbegränsning skjuts upp till API Gateway och Lambda-samtidighet i produktion, och till det din reverse proxy tillämpar i egenhostade driftsättningar.

## OAuth-identifiering

MCP-servern annonserar OAuth 2.1-metadata, så att klienter som endast ansluter till OAuth-identifierade servrar, framför allt claude.ai:s gränssnitt "Add custom connector", kan logga in en användare utan en inklistrad nyckel. `/mcp` är den skyddade resursen, den befintliga [OAuth-leverantören](./connected-apps.md) under `/membership/oauth` är dess auktoriseringsserver, och B1Admin-sidan `/oauth` är samtyckesskärmen.

| Endpoint | Syfte |
|---|---|
| `GET /.well-known/oauth-protected-resource` (även `/.well-known/oauth-protected-resource/mcp`) | Metadata för skyddad resurs (RFC 9728): `resource` är `<api>/mcp`, `authorization_servers` är API:ets rot, `scopes_supported` listar alla [API-nyckelscopes](./api-keys.md#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadata för auktoriseringsserver (RFC 8414): `authorization_endpoint` är B1Admin `/oauth`, `token_endpoint` är `/membership/oauth/token`, `registration_endpoint` är `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamisk klientregistrering (RFC 7591) |

Flödet som en klient som claude.ai kör:

1. `POST /mcp` utan token returnerar 401 med huvudet `WWW-Authenticate` som pekar på metadata för den skyddade resursen.
2. Klienten läser båda metadatadokumenten och registrerar sig sedan med `POST /membership/oauth/register`, och skickar `client_name`, `redirect_uris` och eventuellt `scope`. Varje självregistrerad klient är en **publik** klient: ingen hemlighet utfärdas och svaret har `token_endpoint_auth_method: "none"`. Omdirigeringsadresser måste vara `https`, eller `http` på en loopback-adress (`localhost`, `127.0.0.1`, `[::1]`). Högst 10 per klient. Registreringen är hastighetsbegränsad till 20 per timme och IP-adress.
3. Användaren skickas till B1Admin `/oauth` med `code_challenge` och `code_challenge_method=S256`. Samtyckessidan listar varje begärt scope på klartext (eller "Allt ditt B1-konto kan komma åt" när inga begärts), visar värden användaren skickas tillbaka till, och anger när appen registrerade sig själv. Användaren klickar på **Tillåt**.
4. Klienten växlar koden mot `/membership/oauth/token` med `grant_type=authorization_code` och sin `code_verifier`, och förnyar senare med `grant_type=refresh_token`. Formulärkodade och JSON-innehåll accepteras båda.
5. Den resulterande åtkomsttoken är en scoped B1-JWT, som används som bearer mot `/mcp`.

PKCE-regler: endast `S256` accepteras. En klient utan hemlighet måste skicka en `code_challenge` vid auktorisering och motsvarande `code_verifier` vid tokenutbytet. Konfidentiella klienter (med en hemlighet) får fortfarande använda enbart hemligheten. Omdirigeringsadresser måste matcha en registrerad adress exakt.

Klienter som accepterar en statisk bearer-token i sin konfiguration, som Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor och egen kod, kan fortsätta använda en `cak_…`-nyckel i stället.

## Lokal utveckling

MCP-endpointen monteras tillsammans med allt annat när API:et körs lokalt:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Vid start bekräftar loggraden `📡 MCP server ready at /mcp — N routes in inventory` att inventariet har byggts.

Testa den med MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

I Inspector-gränssnittet pekar du på `http://localhost:8084/mcp` och sätter `Authorization`-huvudet till `Bearer cak_<prefix>.<secret>`. Anropa `list_endpoints` först. Du bör se hela ruttlistan. Därefter bör `api_call({ method: "GET", path: "/membership/people" })` returnera dina lokala exempelpersoner.

## Kodstruktur

MCP-servern finns i `src/modules/mcp/` i Api-repot. Viktiga filer:

| Fil | Syfte |
|---|---|
| `McpController.ts` | `@controller("/mcp")`. Kopplar `StreamableHTTPServerTransport` per förfrågan och skickar utmaningen `WWW-Authenticate` vid 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Serverar OAuth-identifieringsdokumenten under `/.well-known` |
| `McpServer.ts` | Bygger en MCP-`Server` och registrerar de fyra verktygen |
| `RouteInventory.ts` | Går igenom inversify-express-utils metadata vid start för att räkna upp rutter |
| `internalDispatch.ts` | Syntetiska `req`/`res` som återgår in i Express-appen i processen |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuraterade exempel på förfrågningar och svar för högtrafikerade endpoints |

## Relaterat

- [API-nycklar](./api-keys.md)
- [Webhooks](./webhooks.md)
- [Anslutna appar (OAuth)](./connected-apps.md)
- [Claude: installation för slutanvändare](/docs/b1-admin/integrations/claude)
- [ChatGPT: installation för slutanvändare](/docs/b1-admin/integrations/chatgpt)
