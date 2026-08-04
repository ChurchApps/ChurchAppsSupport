---
title: "MCP-server"
---

# MCP-server

<div class="article-intro">

B1-API-et leverer en [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-server på `/mcp`. Enhver MCP-kompatibel AI-klient — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor eller din egen — kan koble til den og kalle det underliggende REST-API-et på vegne av en autentisert kirkebruker. Det er en tynn, generisk innpakning: tre generiske verktøy eksponerer hele API-overflaten dynamisk i stedet for å håndmodellere hvert endepunkt, pluss ett domeneveiledningsverktøy for nettstedsbyggeren.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [B1 API-nøkkel](./api-keys) (`cak_…`) med de omfangene klienten skal ha
- En tilgjengelig B1-API-vert — `https://api.churchapps.org` for verts-baserte kirker, eller din egen distribusjon
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
| **Metode** | Bare `POST` — både request/response og SSE-strømming skjer på samme endepunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Øktmodell** | Tilstandsløs. En ny MCP-serverinstans bygges per forespørsel — ingen økt-ID, ingen gjenopptakelse |
| **Autentisering** | Bærertoken. Både `cak_…`-API-nøkler og B1-JWT-er fungerer; oppløsningen er den samme som for ethvert annet autentisert endepunkt |

En forespørsel der `Authorization`-headeren mangler eller er ugyldig, returnerer:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

med HTTP 401.

## Verktøy

Tre generiske verktøy pluss én veiledning. Modellen bruker `list_endpoints` for oppdagelse, `describe_endpoint` for å lære en nyttelastform, `api_call` for faktisk å kalle API-et, og `describe_page_builder` når oppgaven involverer nettstedsinnhold.

### `list_endpoints`

Returnerer den fullstendige oversikten over registrerte REST-ruter, filtrert etter en valgfri delstreng og/eller HTTP-verb. Hvert element inkluderer kontrollernavnet og de API-nøkkelomfangene som mest sannsynlig er nødvendige.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `filter` | streng (valgfritt) | Delstreng, ikke skiller mellom store/små bokstaver, matchet mot stien, f.eks. `"people"` |
| `method` | enum (valgfritt) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Utdata:** et JSON-dokument av formen

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

Oversikten bygges én gang ved API-oppstart fra den aktive rutetabellen — alt du kan treffe med `curl` vises her.

### `describe_endpoint`

Returnerer et kort sammendrag pluss, der det er tilgjengelig, en håndkuratert eksempel-forespørselskropp og responseksempel for ett endepunkt.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | streng | HTTP-verb |
| `path` | streng | Full sti slik den returneres av `list_endpoints` |

**Utdata:** for kuraterte endepunkter, et eksempel med `summary`, `requestBody` og `responseSample`. For ikke-kuraterte endepunkter, en fallback-melding som instruerer modellen til å kalle `GET` først for å se formen. Omtrent et dusin endepunkter med høy trafikk (personer, grupper, donasjoner, oppmøte, fond) er kuratert.

### `api_call`

Kaller det valgte REST-endepunktet, in-process, gjennom den samme Express-mellomvarestabelen som en vanlig HTTP-forespørsel — autentisering, kroppsparsing, revisjonslogging og per-kirke-omfang gjelder alle.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | streng | Sti inkludert eventuelt modulprefiks, f.eks. `/membership/people` |
| `query` | objekt (valgfritt) | Flatt objekt med spørrestreng-parametere |
| `body` | valgfri (any) | JSON-forespørselskropp — vanligvis et array av modellobjekter for `POST` |

**Utdata:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Verktøyresultatet merkes `isError: true` for enhver respons med status ≥ 400.

### `describe_page_builder`

Det eneste ikke-generiske verktøyet: en statisk, selvstendig veiledning til å bygge nettsteder gjennom `/content/*`-endepunktene — datamodellen side → seksjon → element, opprettelsesarbeidsflyten, hver `elementType` med sin `answersJSON`-form, innstillinger på seksjonsnivå som formdelerne `dividerTop`/`dividerBottom`, og et gjennomarbeidet ende-til-ende-eksempel. Det tar ingen inndata og speiler elementkatalogen som vedlikeholdes i B1Admin-redigeringsprogrammet (se [Nettstedsbyggerarkitektur](../architecture/website-builder)). Agenter forventes å kalle det én gang før de oppretter eller redigerer sideinnhold, og deretter handle via `api_call`.

## Autentiseringsmodell

MCP-forespørselen selv kjøres gjennom `CustomAuthProvider.getUser()` — den samme stien som ethvert autentisert B1-endepunkt bruker. En `cak_…`-bærer løses til en `Principal` hvis tillatelser er den utstedende personens gjeldende RBAC, **kryssgruppet** med nøkkelens tildelte omfang. Dette krysset beregnes på nytt ved hver forespørsel, så:

- Å fjerne et omfang fra en nøkkel (ved å slette og gjenskape den) kutter tilgangen ved neste kall.
- Å fjerne en tillatelse fra den underliggende personen i B1Admin kutter tilgangen ved neste kall, selv om nøkkelen fortsatt finnes.

For nøstede `api_call`-kall kopieres den opprinnelige `Authorization`-headeren over til den syntetiske forespørselen, slik at `CustomAuthProvider` kjøres på nytt og omfangskrysset gjenanvendes for hvert kall. Det finnes ingen token-caching.

## Stiblokkeringsliste

Et lite sett med ruter er ikke tilgjengelige via `api_call`, selv med en gyldig nøkkel:

| Mønster | Hvorfor |
|---|---|
| `/giving/donate/webhook/*` | Leverandørens webhook-endepunkter forventer rå, signaturverifiserte kropper fra Stripe/PayPal — ikke generelle kallere |
| `/membership/oauth/clients*` | OAuth-klientregistrering er kun for operatør |
| `/membership/people/apiEmails` | Beskyttet av operatørens `jwtSecret`, ikke brukertillatelser |
| Enhver rute som forventer `multipart/form-data` | Filopplastinger er ikke JSON-RPC-vennlige |

En blokkert sti returnerer et verktøyresultat med `isError: true` og en beskrivende melding; den underliggende ruten kalles aldri.

## Grense for responsstørrelse

Hver `api_call`-responskropp er begrenset til **64 KB** med fanget utdata. Hvis en spørring overskrider grensen, bærer responsen `"truncated": true`, og modellen forventes å prøve på nytt med snevrere spørreparametere. Dette hindrer at en enkelt verktøyrespons sprenger klientens kontekstvindu.

## Hastighetsbegrensning

Det finnes ingen hastighetsbegrensning på applikasjonsnivå for `/mcp`. Strupingen overlates til API Gateway/Lambda-samtidighet i produksjon, og til det som reverse-proxyen din håndhever i selvhostede distribusjoner.

## OAuth-oppdagelse

MCP-serveren annonserer **ikke** OAuth 2.1-metadata (`/.well-known/oauth-authorization-server`, dynamisk klientregistrering, PKCE-flyt). Klienter som krever OAuth-oppdagbare MCP-servere — særlig Claude.ai sitt «Legg til egendefinert kobling»-grensesnitt og ChatGPTs «Connectors»-funksjon — kan ikke koble til uten den overflaten.

Klienter som godtar et statisk bærertoken i konfigurasjonen sin — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, egendefinert kode — fungerer i dag. Den eksisterende [OAuthController](/docs/developer/api/connected-apps) utsteder allerede tokener via autorisasjonskode + PKCE for tredjepartsapper; et MCP-spesifikasjonskompatibelt oppdagelseslag oppå den ville tette gapet.

## Lokal utvikling

MCP-endepunktet monteres sammen med alt annet når API-et kjøres lokalt:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Ved oppstart bekrefter loggraden `📡 MCP server ready at /mcp — N routes in inventory` at oversikten ble bygget.

Test det med MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

I Inspector-grensesnittet, pek det mot `http://localhost:8084/mcp` og sett `Authorization`-headeren til `Bearer cak_<prefix>.<secret>`. Kall `list_endpoints` først; du bør se hele rutelisten. Deretter bør `api_call({ method: "GET", path: "/membership/people" })` returnere dine lokale seed-personer.

## Kodeoppsett

MCP-serveren ligger i `src/modules/mcp/` i Api-repositoriet. Bemerkelsesverdige filer:

| Fil | Formål |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; kobler `StreamableHTTPServerTransport` per forespørsel |
| `McpServer.ts` | Bygger en MCP `Server`, registrerer de fire verktøyene |
| `RouteInventory.ts` | Går gjennom inversify-express-utils-metadata ved oppstart for å liste opp ruter |
| `internalDispatch.ts` | Syntetisk `req`/`res` som går inn i Express-appen igjen in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuraterte forespørsel-/respons-eksempler for endepunkter med høy trafikk |

## Relatert

- [API-nøkler](./api-keys)
- [Webhooks](./webhooks)
- [Tilkoblede apper (OAuth)](./connected-apps)
- [Claude — sluttbrukeroppsett](/docs/b1-admin/integrations/claude)
- [ChatGPT — sluttbrukeroppsett](/docs/b1-admin/integrations/chatgpt)
