---
title: "MCP-server"
---

# MCP-server

<div class="article-intro">

B1 API leveres med en [MCP-server (Model Context Protocol)](https://modelcontextprotocol.io) på `/mcp`. Enhver MCP-kompatibel KI-klient (egne tilkoblinger i claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor eller din egen) kan koble til den og kalle det underliggende REST-API-et på vegne av en autentisert kirkebruker. Den er en tynn, generisk innpakning: tre generiske verktøy eksponerer hele API-flaten dynamisk i stedet for å modellere hvert endepunkt for hånd, pluss ett domeneguideverktøy for nettsidebyggeren.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [B1 API-nøkkel](./api-keys) (`cak_…`) med de omfangene klienten skal ha, eller en MCP-klient som kan logge inn med OAuth (se [OAuth-oppdagelse](#oauth-discovery))
- En tilgjengelig B1 API-vert: `https://api.churchapps.org` for hostede kirker, eller din egen distribusjon
- En MCP-klient. Se [Claude](/docs/b1-admin/integrations/claude) og [ChatGPT](/docs/b1-admin/integrations/chatgpt) for oppsett for sluttbrukere

</div>

## Endepunkt

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspekt | Verdi |
|---|---|
| **Sti** | `/mcp` (i forhold til API-verten) |
| **Metode** | Kun `POST` -- forespørsel/svar og SSE-strømming skjer på samme endepunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Øktmodell** | Tilstandsløs. En ny MCP-serverinstans bygges per forespørsel -- ingen økt-ID, ingen gjenopptakelse |
| **Autentisering** | Bearer-token. `cak_…`-API-nøkler og B1-JWT-er (inkludert OAuth-tilgangstokener) fungerer alle; oppslaget er det samme som for ethvert annet autentisert endepunkt |

En forespørsel der `Authorization`-headeren mangler eller er ugyldig, returnerer:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

med HTTP 401 og headeren `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. OAuth-kompatible klienter følger den for å starte innlogging.

På den hostede API-en (produksjon og demo) serveres `/mcp` gjennom en API Gateway HTTP API i stedet for REST-API-et som brukes for resten av endepunktene. REST-API-et gir nytt navn til `WWW-Authenticate` til `x-amzn-remapped-www-authenticate` i Lambda-proxysvar, noe som gjorde at klienter som ChatGPT fikk et tomt 401 uten måte å starte innlogging på. HTTP-API-et sender headeren videre uendret.

## Verktøy

Tre generiske verktøy og én guide. Modellen bruker `list_endpoints` for å finne endepunkter, `describe_endpoint` for å lære formen på en nyttelast, `api_call` for å faktisk kalle API-et, og `describe_page_builder` når oppgaven gjelder nettsideinnhold.

### `list_endpoints`

Returnerer hele beholdningen av registrerte REST-ruter, filtrert etter en valgfri delstreng og/eller HTTP-verb. Hver oppføring inneholder kontrollernavnet og de API-nøkkelomfangene som mest sannsynlig trengs.

**Input:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `filter` | string (valgfri) | Delstreng som ikke skiller store og små bokstaver, sammenlignes mot stien, f.eks. `"people"` |
| `method` | enum (valgfri) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** et JSON-dokument på formen

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

Beholdningen bygges én gang ved oppstart av API-et, fra den levende rutetabellen. Alt du kan treffe med `curl`, vises her.

### `describe_endpoint`

Returnerer et kort sammendrag og, der det finnes, en håndlaget eksempel-forespørselskropp og et eksempel på svar for ett endepunkt.

**Input:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | string | HTTP-verb |
| `path` | string | Full sti slik `list_endpoints` returnerer den |

**Output:** for kuraterte endepunkter et eksempel med `summary`, `requestBody` og `responseSample`. For ikke-kuraterte endepunkter en reservemelding som ber modellen kalle `GET` først for å se formen. Omtrent et dusin høytrafikkruter (personer, grupper, gaver, oppmøte, fond) er kuratert.

### `api_call`

Kaller det valgte REST-endepunktet, i prosessen, gjennom samme Express-middleware-stakk som en vanlig HTTP-forespørsel. Autentisering, parsing av body, revisjonslogging og avgrensning til kirke gjelder alle.

**Input:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Sti inkludert eventuelt modulprefiks, f.eks. `/membership/people` |
| `query` | object (valgfri) | Flatt objekt med parametere i query-strengen |
| `body` | any (valgfri) | JSON-forespørselskropp -- vanligvis en matrise med modellobjekter for `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Verktøyresultatet er merket `isError: true` for ethvert svar med status ≥ 400.

### `describe_page_builder`

Det eneste ikke-generiske verktøyet: en statisk, selvstendig guide for å bygge nettsider gjennom `/content/*`-endepunktene -- datamodellen Page → Section → Element, opprettelsesflyten, hver `elementType` med formen på `answersJSON`, innstillinger på seksjonsnivå som formskilletegnene `dividerTop`/`dividerBottom`, og et utfylt eksempel fra start til slutt. Det tar ingen input og speiler elementkatalogen som vedlikeholdes i redigeringsprogrammet i B1Admin (se [Arkitektur for nettsidebyggeren](../architecture/website-builder)). Agenter forventes å kalle det én gang før de oppretter eller redigerer sideinnhold, og deretter handle via `api_call`.

## Autentiseringsmodell

Selve MCP-forespørselen går gjennom `CustomAuthProvider.getUser()` -- samme sti som alle autentiserte B1-endepunkter bruker. Et `cak_…`-bearer-token oppløses til en `Principal` der tillatelsene er den utstedende personens gjeldende RBAC, **skjært** mot nøkkelens tildelte omfang. Denne skjæringen beregnes på nytt for hver forespørsel, så:

- Å fjerne et omfang fra en nøkkel (ved å slette og opprette den på nytt) stenger tilgangen ved neste kall.
- Å fjerne en tillatelse fra den underliggende personen i B1Admin stenger tilgangen ved neste kall, selv om nøkkelen fortsatt finnes.

For nestede `api_call`-kall kopieres den opprinnelige `Authorization`-headeren over til den syntetiske forespørselen, slik at `CustomAuthProvider` kjører igjen og skjæringen av omfang brukes på nytt for hvert kall. Det finnes ingen mellomlagring av tokener.

## Blokkeringsliste for stier

Noen få ruter kan ikke nås via `api_call`, selv med en gyldig nøkkel:

| Mønster | Hvorfor |
|---|---|
| `/giving/donate/webhook/*` | Webhook-endepunkter for leverandører forventer rå, signaturverifiserte kropper fra Stripe/PayPal -- ikke generelle kallere |
| `/membership/oauth/clients*` | Registrering av OAuth-klienter er forbeholdt operatører |
| `/membership/people/apiEmails` | Låst av operatørens `jwtSecret`, ikke brukertillatelser |
| Enhver rute som forventer `multipart/form-data` | Filopplastinger passer ikke for JSON-RPC |

En blokkert sti gir et `isError: true`-verktøyresultat med en beskrivende melding; den underliggende ruten kalles aldri.

## Størrelsesgrense for svar

Hver `api_call`-svarkropp er begrenset til **64 KB** fanget utdata. Hvis en spørring overskrider grensen, får svaret `"truncated": true`, og modellen forventes å prøve på nytt med smalere query-parametere. Dette hindrer at et enkelt verktøysvar sprenger klientens kontekstvindu.

## Hastighetsbegrensning

Det finnes ingen hastighetsbegrensning på applikasjonsnivå for `/mcp`. Begrensning overlates til API Gateway / Lambda-samtidighet i produksjon, og til det din reverse proxy håndhever i selvdrevne distribusjoner.

## OAuth-oppdagelse {#oauth-discovery}

MCP-serveren annonserer OAuth 2.1-metadata, slik at klienter som bare kobler til OAuth-oppdagede servere -- særlig dialogen «Add custom connector» i Claude.ai -- kan logge en bruker inn uten en innlimt nøkkel. `/mcp` er den beskyttede ressursen, den eksisterende [OAuth-leverandøren](./connected-apps) under `/membership/oauth` er autorisasjonsserveren, og siden `/oauth` i B1Admin er samtykkeskjermen.

| Endepunkt | Formål |
|---|---|
| `GET /.well-known/oauth-protected-resource` (også `/.well-known/oauth-protected-resource/mcp`) | Metadata for beskyttet ressurs (RFC 9728): `resource` er `<api>/mcp`, `authorization_servers` er API-roten, `scopes_supported` lister alle [API-nøkkelomfang](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadata for autorisasjonsserver (RFC 8414): `authorization_endpoint` er B1Admin `/oauth`, `token_endpoint` er `/membership/oauth/token`, `registration_endpoint` er `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamisk klientregistrering (RFC 7591) |

Flyten som en klient som claude.ai kjører:

1. `POST /mcp` uten token gir 401 med headeren `WWW-Authenticate` som peker på metadata for den beskyttede ressursen.
2. Klienten leser begge metadatadokumentene, og registrerer seg deretter med `POST /membership/oauth/register`, og sender `client_name`, `redirect_uris` og eventuelt `scope`. Hver selvregistrert klient er en **offentlig** klient: ingen hemmelighet utstedes, og svaret har `token_endpoint_auth_method: "none"`. Redirect-URI-er må være `https`, eller `http` på en loopback-adresse (`localhost`, `127.0.0.1`, `[::1]`); høyst 10 per klient. Registrering er begrenset til 20 per time per IP.
3. Brukeren sendes til B1Admin `/oauth` med `code_challenge` og `code_challenge_method=S256`. Samtykkesiden lister hvert forespurt omfang med vanlig språk (eller «Everything your B1 account can access» når ingen ble forespurt), viser verten brukeren sendes tilbake til, og sier fra når appen registrerte seg selv. Brukeren klikker **Allow**.
4. Klienten bytter koden inn mot `/membership/oauth/token` med `grant_type=authorization_code` og sin `code_verifier`, og fornyer senere med `grant_type=refresh_token`. Skjemakodede og JSON-kropper godtas begge.
5. Det resulterende tilgangstokenet er en B1-JWT med omfang, og brukes som bearer på `/mcp`.

PKCE-regler: bare `S256` godtas. En klient uten hemmelighet må sende en `code_challenge` ved autorisering og den tilhørende `code_verifier` ved tokenutvekslingen; konfidensielle klienter (med en hemmelighet) kan fortsatt bruke bare hemmeligheten. Redirect-URI-er må samsvare nøyaktig med en registrert URI.

Klienter som godtar et statisk bearer-token i konfigurasjonen sin -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, egen kode -- kan fortsatt bruke en `cak_…`-nøkkel i stedet.

## Lokal utvikling

MCP-endepunktet monteres sammen med alt annet når API-et kjører lokalt:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Ved oppstart bekrefter logglinjen `📡 MCP server ready at /mcp — N routes in inventory` at beholdningen er bygget.

Test den med MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

I Inspector-grensesnittet peker du den til `http://localhost:8084/mcp` og setter headeren `Authorization` til `Bearer cak_<prefix>.<secret>`. Kall `list_endpoints` først; du bør se hele rutelisten. Deretter bør `api_call({ method: "GET", path: "/membership/people" })` returnere de lokale testpersonene dine.

## Kodestruktur

MCP-serveren ligger i `src/modules/mcp/` i Api-repoet. Sentrale filer:

| Fil | Formål |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; kobler `StreamableHTTPServerTransport` per forespørsel og sender `WWW-Authenticate`-utfordringen ved 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Serverer OAuth-oppdagelsesdokumentene under `/.well-known` |
| `McpServer.ts` | Bygger en MCP-`Server` og registrerer de fire verktøyene |
| `RouteInventory.ts` | Går gjennom inversify-express-utils-metadata ved oppstart for å liste opp rutene |
| `internalDispatch.ts` | Syntetiske `req`/`res` som går inn i Express-appen igjen, i prosessen |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuraterte forespørsels- og svareksempler for høytrafikkendepunkter |

## Relatert

- [API-nøkler](./api-keys)
- [Webhooks](./webhooks)
- [Tilkoblede apper (OAuth)](./connected-apps)
- [Claude — oppsett for sluttbrukere](/docs/b1-admin/integrations/claude)
- [ChatGPT — oppsett for sluttbrukere](/docs/b1-admin/integrations/chatgpt)
