---
title: "MCP-server"
---

# MCP-server

<div class="article-intro">

B1 API leverer en [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-server på `/mcp`. Enhver MCP-klar AI-klient -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor eller din egen -- kan koble til den og kalle den underliggende REST API-en på vegne av en autentisert kirkbruker. Det er en tynnvegg, generisk wrapper: tre generiske verktøy eksponerer hele API-overflaten dynamisk i stedet for å håndmodelere hvert endepunkt, pluss ett domenevedleggverktøy for nettstedsbyggeren.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [B1 API-nøkkel](./api-keys) (`cak_…`) med omfangene klienten skal ha
- En nåbar B1 API-vert -- `https://api.churchapps.org` for vertsede kirker, eller din egen distribusjon
- En MCP-klient. Se [Claude](/docs/b1-admin/integrations/claude) og [ChatGPT](/docs/b1-admin/integrations/chatgpt) for sluttbrukeroppsett

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
| **Sti** | `/mcp` (relativ til API-verten) |
| **Metode** | `POST` bare -- request/response og SSE-streaming skjer begge på samme endepunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Øktsmodell** | Stateless. En frisk MCP-serverinstans bygges per forespørsel -- ingen økts-id, ingen gjenopptakelse |
| **Auth** | Bærertoken. `cak_…` API-nøkler og B1 JWT-er fungerer begge; oppløsning er det samme som ethvert annet autentisert endepunkt |

En forespørsel hvis `Authorization`-header mangler eller er ugyldig returnerer:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

med HTTP 401.

## Verktøy

Tre generiske verktøy pluss en veileder. Modellen bruker `list_endpoints` for oppdagelse, `describe_endpoint` for å lære en nyttelastform, `api_call` for å faktisk påkalle API-en, og `describe_page_builder` når oppgaven innebærer nettstedinnhold.

### `list_endpoints`

Returnerer hele lageret med registrerte REST-ruter, filtrert etter en valgfritt delstreng og/eller HTTP-verb. Hver oppføring inkluderer kontroller-navnet og API-nøkkelomfangene som mest sannsynlig er nødvendige.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `filter` | string (valgfritt) | Skille-uavhengig delsrengtilpasset mot stien, f.eks. `"people"` |
| `method` | enum (valgfritt) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Utdata:** et JSON-dokument i form

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

Lageret bygges en gang ved API-oppstart fra live-rutetabellen -- alt du kan treffe med `curl` vises her.

### `describe_endpoint`

Returnerer et kort sammendrag pluss, der tilgjengelig, en håndkurert forespørselskropp og responseksempel for ett endepunkt.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | string | HTTP-verb |
| `path` | string | Full sti som returnert av `list_endpoints` |

**Utdata:** for kuraterte endepunkter, et eksempel med `summary`, `requestBody` og `responseSample`. For ikke-kuraterte endepunkter, en fallback-melding som instruerer modellen til å kalle `GET` først for å se formen. Omtrent et dusin høy-trafikk-ruter (mennesker, grupper, donasjoner, oppmøte, midler) er kuratert.

### `api_call`

Påkaller det valgte REST-endepunktet, in-process, gjennom samme Express middleware-stakk som en normal HTTP-forespørsel -- auth, body parsing, revisjonslogging og per-kirke-omfang gjelder alle.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Sti inkludert enhver modulprefieks, f.eks. `/membership/people` |
| `query` | object (valgfritt) | Flat objekt med spørringsstringparametere |
| `body` | any (valgfritt) | JSON forespørselskropp -- typisk en array av modelobjekter for `POST` |

**Utdata:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Verktøyresultat er merket `isError: true` for enhver respons med status ≥ 400.

### `describe_page_builder`

Det ene ikke-generiske verktøyet: en statisk, selvstendig veileder til bygging av nettstedssider gjennom `/content/*`-endepunktene -- side → seksjon → element-datamodellen, opprettingsarbeidsflyten, hvert `elementType` med sin `answersJSON`-form, seksjonnivåinnstillinger som `dividerTop`/`dividerBottom`-form-deler, og et arbeids-end-to-end-eksempel. Det tar ingen inndata og speiler elementkatalogen som vedlikeholdes i B1Admin-redigeringsprogrammet (se [Nettstedsbyggerarkitektur](../architecture/website-builder)). Agenter forventes å kalle den en gang før opprettelse eller redigering av sidinnhold, deretter handle via `api_call`.

## Auth-modell

MCP-forespørselen selv kjøres gjennom `CustomAuthProvider.getUser()` -- samme sti hver autentisert B1-endepunkt bruker. En `cak_…` bærer oppløst til en `Principal` hvis tillatelser er det utstedende personen sin nåværende RBAC, **krysset** med nøkkelen tildelte omfang. Dette krysset beregnes på nytt på hver forespørsel, så:

- Fjerning av et omfang fra en nøkkel (ved sletting og gjenoppretting) kutter tilgang på neste anrop.
- Fjerning av en tillatelse fra den underliggende personen i B1Admin kutter tilgang på neste anrop, selv om nøkkelen fortsatt eksisterer.

For nestede `api_call`-påkallinger, kopieres den opprinnelige `Authorization`-headeren til den syntetiske forespørselen, så `CustomAuthProvider` kjøres igjen og omfangsersatsen gjentas per anrop. Det finnes ingen tokencaching.

## Stiblokkering

Et lite sett med ruter er ikke nåbar via `api_call`, selv med en gyldig nøkkel:

| Mønster | Hvorfor |
|---|---|
| `/giving/donate/webhook/*` | Leverandør-webhook-endepunkter forventer rå, signatur-verifiserte kropper fra Stripe/PayPal -- ikke generelle oppringere |
| `/membership/oauth/clients*` | OAuth-klientregistrering er kun for operatør |
| `/membership/people/apiEmails` | Gated av operatør `jwtSecret`, ikke brukerrettighetene |
| Enhver rute som forventer `multipart/form-data` | Filopplastinger er ikke JSON-RPC-vennlige |

En blokkert sti returnerer en `isError: true`-verktøyresultat med en beskrivende melding; den underliggende ruten påkalles aldri.

## Responsestørrelsesbegrensning

Hvert `api_call`-responskropp begrenses til **64 KB** med fanget utdata. Hvis en spørring overskrider grensen, inneholder responsen `"truncated": true` og modellen forventes å prøve på nytt med smalere spørringsparametere. Dette hindrer en enkelt verktøyrespons fra å sprenge klientens kontekstvindu.

## Hastighetsgrensing

Det er ingen applikasjonnivå-hastighetsgrense på `/mcp`. Gassdempingen utsettes til API Gateway / Lambda-samtidighet i produksjon, og til det som din omvendtproxy håndhever i selvvertede distribusjonene.

## OAuth-oppdagelse

MCP-serveren annonserer **ikke** OAuth 2.1-metadata (`/.well-known/oauth-authorization-server`, dynamisk klientregistrering, PKCE-flyt). Klienter som krever OAuth-oppdaget MCP-servere -- spesielt Claude.ai's "Legg til egendefinert kobling"-brukergrensesnitt og ChatGPT's "Connectors"-funksjon -- kan ikke koble til uten denne overflaten.

Klienter som aksepterer en statisk bærertoken i konfigurasjonen sin -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, egendefinert kode -- fungerer i dag. Den eksisterende [OAuthController](/docs/developer/api/connected-apps) utsteder allerede tokens via autorisasjonskode + PKCE for tredjepart-apper; en MCP-spec-samsvarende oppdagingslag på toppen av den ville lukke gapet.

## Lokal utvikling

MCP-endepunktet monteres sammen med alt annet når API-en kjøres lokalt:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Ved oppstart bekrefter logglinja `📡 MCP server ready at /mcp — N routes in inventory` at lageret ble bygget.

Teste det med MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

I Inspector-brukergrensesnittet, pek det på `http://localhost:8084/mcp` og sett `Authorization`-headeren til `Bearer cak_<prefix>.<secret>`. Kall `list_endpoints` først; du bør se hele rutelista. Deretter `api_call({ method: "GET", path: "/membership/people" })` bør returnere dine lokale frølitt personer.

## Kodelayout

MCP-serveren bor på `src/modules/mcp/` i Api-depotet. Merkbare filer:

| Fil | Formål |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; wirer `StreamableHTTPServerTransport` per forespørsel |
| `McpServer.ts` | Bygger en MCP `Server`, registrerer de fire verktøyene |
| `RouteInventory.ts` | Går inversify-express-utils-metadata ved oppstart for å telle opp ruter |
| `internalDispatch.ts` | Syntetisk `req`/`res` som gjenenter Express-appen in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuraterte forespørsel/response-prøver for høy-trafikk-endepunkter |

## Relatert

- [API-nøkler](./api-keys)
- [Webhooks](./webhooks)
- [Tilkoblede apper (OAuth)](./connected-apps)
- [Claude -- sluttbrukeroppsett](/docs/b1-admin/integrations/claude)
- [ChatGPT -- sluttbrukeroppsett](/docs/b1-admin/integrations/chatgpt)
