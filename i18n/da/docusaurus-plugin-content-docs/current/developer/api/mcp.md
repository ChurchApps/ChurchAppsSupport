---
title: "MCP-server"
---

# MCP-server

<div class="article-intro">

B1 API'et indeholder en [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-server på `/mcp`. Enhver MCP-kompatibel AI-klient (claude.ai custom connectors, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor eller din egen) kan oprette forbindelse til den og kalde det underliggende REST API på vegne af en godkendt kirkebruger. Det er en tynd, generisk indpakning: tre generiske værktøjer eksponerer hele API-overfladen dynamisk i stedet for at modellere hvert endpoint manuelt, samt ét domæneguide-værktøj til hjemmesidebyggeren.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En [B1 API-nøgle](./api-keys) (`cak_…`) med de scopes, klienten skal have, eller en MCP-klient, der kan logge ind med OAuth (se [OAuth-opdagelse](#oauth-discovery))
- En tilgængelig B1 API-host: `https://api.churchapps.org` for hostede kirker, eller din egen deployment
- En MCP-klient. Se [Claude](/docs/b1-admin/integrations/claude) og [ChatGPT](/docs/b1-admin/integrations/chatgpt) for opsætning til slutbrugere

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspekt | Værdi |
|---|---|
| **Sti** | `/mcp` (relativt til API-hosten) |
| **Metode** | Kun `POST`. Både anmodning/svar og SSE-streaming sker på samme endpoint |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sessionsmodel** | Tilstandsløs. Der bygges en ny MCP-serverinstans for hver anmodning. Ingen session-id, ingen genoptagelse |
| **Godkendelse** | Bearer-token. `cak_…`-API-nøgler og B1 JWT'er (inklusive OAuth-adgangstokens) virker begge. Valideringen er den samme som for andre godkendte endpoints |

En anmodning, hvis `Authorization`-header mangler eller er ugyldig, returnerer:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

med HTTP 401 og en `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`-header, som OAuth-kompatible klienter følger for at starte login.

På den hostede API (produktion og demo) serveres `/mcp` gennem et API Gateway HTTP API i stedet for det REST API, der bruges til de øvrige endpoints. REST API'et omdøber `WWW-Authenticate` til `x-amzn-remapped-www-authenticate` på Lambda proxy-svar. Det efterlod klienter som ChatGPT med et tomt 401-svar og ingen måde at starte login på. HTTP API'et videregiver headeren uændret.

## Værktøjer

Tre generiske værktøjer og én guide. Modellen bruger `list_endpoints` til opdagelse, `describe_endpoint` til at lære et payload-format at kende, `api_call` til faktisk at kalde API'et og `describe_page_builder`, når opgaven drejer sig om webindhold.

### `list_endpoints`

Returnerer hele beholdningen af registrerede REST-ruter, filtreret efter en valgfri delstreng og/eller HTTP-verbum. Hver post indeholder controller-navnet og de API-nøgle-scopes, der sandsynligvis er nødvendige.

**Input:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `filter` | string (valgfri) | Versionsuafhængig delstrengsmatch mod stien, f.eks. `"people"` |
| `method` | enum (valgfri) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** et JSON-dokument i formen

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

Beholdningen bygges én gang ved API-opstart ud fra den aktive rutetabel. Alt, du kan ramme med `curl`, findes her.

### `describe_endpoint`

Returnerer et kort resumé og, hvor det findes, et manuelt kurateret eksempel på anmodningskrop og svar for ét endpoint.

**Input:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | string | HTTP-verbum |
| `path` | string | Fuld sti, som returneret af `list_endpoints` |

**Output:** for kurerede endpoints et eksempel med `summary`, `requestBody` og `responseSample`. For ikke-kurerede endpoints en reservebesked, der instruerer modellen i at kalde `GET` først for at se formen. Omkring et dusin højtrafikerede ruter (personer, grupper, donationer, fremmøde, fonde) er kurerede.

### `api_call`

Kalder det valgte REST-endpoint direkte i processen gennem samme Express-middleware-stak som en normal HTTP-anmodning. Godkendelse, body-parsing, auditlogning og scoping pr. kirke gælder alle.

**Input:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Sti inklusive eventuelt modulpræfiks, f.eks. `/membership/people` |
| `query` | object (valgfri) | Fladt objekt med query-string-parametre |
| `body` | any (valgfri) | JSON-anmodningskrop. Typisk et array af modelobjekter ved `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Værktøjsresultatet markeres med `isError: true` for ethvert svar med status ≥ 400.

### `describe_page_builder`

Det ene ikke-generiske værktøj: en statisk, selvstændig guide til opbygning af websider gennem `/content/*`-endpoints. Den dækker datamodellen Page → Section → Element, oprettelsesforløbet, hver `elementType` med dens `answersJSON`-format, sektionsindstillinger som formdelerne `dividerTop`/`dividerBottom` og et gennemarbejdet eksempel fra start til slut. Værktøjet tager ingen input og spejler elementkataloget, der vedligeholdes i B1Admin-editoren (se [Arkitektur for hjemmesidebyggeren](../architecture/website-builder)). Agenter forventes at kalde det én gang, før de opretter eller redigerer sideindhold, og derefter handle via `api_call`.

## Godkendelsesmodel

Selve MCP-anmodningen kører gennem `CustomAuthProvider.getUser()`, samme sti som alle godkendte B1-endpoints bruger. Et `cak_…`-bearer-token løses til en `Principal`, hvis rettigheder er den udstedende persons aktuelle RBAC, **skåret med** nøglens tildelte scopes. Denne skæring genberegnes ved hver anmodning, så:

- Fjernes et scope fra en nøgle (ved at slette og oprette den igen), mister den adgang ved næste kald.
- Fjernes en rettighed fra den underliggende person i B1Admin, mister nøglen adgang ved næste kald, selv om nøglen stadig findes.

For indlejrede `api_call`-kald kopieres den oprindelige `Authorization`-header over på den syntetiske anmodning. `CustomAuthProvider` kører derfor igen, og skæringen af scopes anvendes pr. kald. Der er ingen caching af tokens.

## Blokeringsliste for stier

Nogle få ruter kan ikke nås via `api_call`, selv med en gyldig nøgle:

| Mønster | Hvorfor |
|---|---|
| `/giving/donate/webhook/*` | Webhook-endpoints fra udbydere forventer rå, signaturverificerede body-data fra Stripe/PayPal, ikke generelle kaldere |
| `/membership/oauth/clients*` | Registrering af OAuth-klienter er kun for operatører |
| `/membership/people/apiEmails` | Beskyttet af operatørens `jwtSecret`, ikke af brugerrettigheder |
| Enhver rute, der forventer `multipart/form-data` | Filuploads er ikke egnet til JSON-RPC |

En blokeret sti returnerer et værktøjsresultat med `isError: true` og en beskrivende besked. Den underliggende rute kaldes aldrig.

## Størrelsesgrænse for svar

Hver `api_call`-svarkrop begrænses til **64 KB** af optaget output. Hvis en forespørgsel overskrider grænsen, indeholder svaret `"truncated": true`, og modellen forventes at prøve igen med snævrere query-parametre. Det forhindrer, at ét værktøjssvar sprænger klientens kontekstvindue.

## Hastighedsbegrænsning

Der er ingen hastighedsbegrænsning på applikationsniveau for `/mcp`. Trafikstyring udskydes til API Gateway/Lambda-samtidighed i produktion og til det, din reverse proxy håndhæver i selvhostede installationer.

## OAuth-opdagelse

MCP-serveren annoncerer OAuth 2.1-metadata, så klienter, der kun forbinder til OAuth-opdagede servere, herunder især Claude.ai's UI "Add custom connector", kan logge en bruger ind uden en indsat nøgle. `/mcp` er den beskyttede ressource, den eksisterende [OAuth-udbyder](./connected-apps) under `/membership/oauth` er autorisationsserveren, og B1Admin-siden `/oauth` er samtykkeskærmen.

| Endpoint | Formål |
|---|---|
| `GET /.well-known/oauth-protected-resource` (også `/.well-known/oauth-protected-resource/mcp`) | Metadata for beskyttet ressource (RFC 9728): `resource` er `<api>/mcp`, `authorization_servers` er API-roden, `scopes_supported` lister alle [API-nøgle-scopes](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadata for autorisationsserver (RFC 8414): `authorization_endpoint` er B1Admin `/oauth`, `token_endpoint` er `/membership/oauth/token`, `registration_endpoint` er `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamisk klientregistrering (RFC 7591) |

Forløbet, en klient som claude.ai gennemfører:

1. `POST /mcp` uden token returnerer 401 med `WWW-Authenticate`-headeren, der peger på metadata for den beskyttede ressource.
2. Klienten læser begge metadatadokumenter og registrerer sig derefter med `POST /membership/oauth/register` og sender `client_name`, `redirect_uris` og eventuelt `scope`. Enhver selvregistreret klient er en **offentlig** klient: der udstedes ingen hemmelighed, og svaret har `token_endpoint_auth_method: "none"`. Redirect-URI'er skal være `https`, eller `http` på en loopback-adresse (`localhost`, `127.0.0.1`, `[::1]`). Der må højst være 10 pr. klient. Registrering er begrænset til 20 pr. time pr. IP.
3. Brugeren sendes til B1Admin `/oauth` med `code_challenge` og `code_challenge_method=S256`. Samtykkesiden lister hvert anmodet scope i almindeligt sprog (eller "Alt, din B1-konto har adgang til", hvis ingen blev anmodet), viser værten brugeren sendes tilbage til og oplyser, når appen har registreret sig selv. Brugeren klikker på **Tillad**.
4. Klienten udveksler koden på `/membership/oauth/token` med `grant_type=authorization_code` og sin `code_verifier`, og fornyer senere med `grant_type=refresh_token`. Både form-kodede og JSON-kroppe accepteres.
5. Det resulterende adgangstoken er et scoped B1 JWT, som bruges som bearer på `/mcp`.

PKCE-regler: Kun `S256` accepteres. En klient uden hemmelighed skal sende en `code_challenge` ved autorisation og den tilsvarende `code_verifier` ved tokenudvekslingen. Fortrolige klienter (med en hemmelighed) må stadig bruge hemmeligheden alene. Redirect-URI'er skal matche en registreret URI nøjagtigt.

Klienter, der accepterer et statisk bearer-token i deres konfiguration (Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, egen kode), kan i stedet blive ved med at bruge en `cak_…`-nøgle.

## Lokal udvikling

MCP-endpointet monteres sammen med alt andet, når API'et kører lokalt:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Ved opstart bekræfter loglinjen `📡 MCP server ready at /mcp — N routes in inventory`, at beholdningen blev bygget.

Test det med MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

I Inspector-brugerfladen peges der på `http://localhost:8084/mcp`, og headeren `Authorization` sættes til `Bearer cak_<prefix>.<secret>`. Kald `list_endpoints` først. Du bør se hele ruteoversigten. Derefter bør `api_call({ method: "GET", path: "/membership/people" })` returnere dine lokale seed-personer.

## Kodestruktur

MCP-serveren findes i `src/modules/mcp/` i Api-repoet. Vigtige filer:

| Fil | Formål |
|---|---|
| `McpController.ts` | `@controller("/mcp")`. Opretter `StreamableHTTPServerTransport` pr. anmodning og sender `WWW-Authenticate`-udfordringen ved 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Serverer `/.well-known`-dokumenterne til OAuth-opdagelse |
| `McpServer.ts` | Bygger en MCP-`Server` og registrerer de fire værktøjer |
| `RouteInventory.ts` | Gennemgår inversify-express-utils-metadata ved opstart for at opliste ruter |
| `internalDispatch.ts` | Syntetiske `req`/`res`, der genindtræder i Express-appen i processen |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kurerede anmodnings- og svareksempler for højtrafikerede endpoints |

## Relateret

- [API-nøgler](./api-keys)
- [Webhooks](./webhooks)
- [Tilsluttede apps (OAuth)](./connected-apps)
- [Claude: opsætning for slutbrugere](/docs/b1-admin/integrations/claude)
- [ChatGPT: opsætning for slutbrugere](/docs/b1-admin/integrations/chatgpt)
