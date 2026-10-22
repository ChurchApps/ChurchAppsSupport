---
title: "MCP-server"
---

# MCP-server {#mcp-server}

<div class="article-intro">

B1 API leveres med en [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-server på `/mcp`. Enhver MCP-kompatibel KI-klient (claude.ai egendefinerte koblinger, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor eller din egen) kan koble til den og kalle det underliggende REST-API-et på vegne av en autentisert menighetsbruker. Det er en tynn, generisk innpakning: tre generiske verktøy eksponerer hele API-flaten dynamisk i stedet for å modellere hvert endepunkt for hånd, pluss ett domeneveiledningsverktøy for nettsidebyggeren.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [B1 API-nøkkel](./api-keys) (`cak_…`) med de scopene klienten skal ha, eller en MCP-klient som kan logge inn med OAuth (se [OAuth-oppdagelse](#oauth-discovery))
- En tilgjengelig B1 API-vert: `https://api.churchapps.org` for hostede menigheter, eller din egen installasjon
- En MCP-klient. Se [Claude](/docs/b1-admin/integrations/claude) og [ChatGPT](/docs/b1-admin/integrations/chatgpt) for oppsett for sluttbrukere

</div>

## Endepunkt {#endpoint}

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspekt | Verdi |
|---|---|
| **Sti** | `/mcp` (relativt til API-verten) |
| **Metode** | Bare `POST` — forespørsel/svar og SSE-strømming skjer begge på samme endepunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Øktmodell** | Tilstandsløs. En ny MCP-serverinstans bygges per forespørsel — ingen økt-ID, ingen gjenopptakelse |
| **Autentisering** | Bearer-token. `cak_…`-API-nøkler og B1-JWT-er (inkludert OAuth-tilgangstokener) fungerer alle; oppslaget er det samme som for ethvert annet autentisert endepunkt |

En forespørsel der `Authorization`-headeren mangler eller er ugyldig, returnerer:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

med HTTP 401 og en `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`-header, som OAuth-kapable klienter følger for å starte innlogging.

## Verktøy {#tools}

Tre generiske verktøy og én veiledning. Modellen bruker `list_endpoints` for oppdagelse, `describe_endpoint` for å lære formen på en nyttelast, `api_call` for å faktisk kalle API-et, og `describe_page_builder` når oppgaven gjelder nettsideinnhold.

### `list_endpoints`

Returnerer hele oversikten over registrerte REST-ruter, filtrert etter en valgfri delstreng og/eller HTTP-verb. Hver oppføring inneholder kontrollerens navn og API-nøkkelscopene som mest sannsynlig trengs.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `filter` | streng (valgfri) | Delstreng uten store/små-bokstav-forskjell som søkes i stien, f.eks. `"people"` |
| `method` | enum (valgfri) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Utdata:** et JSON-dokument på formen

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

Oversikten bygges én gang ved oppstart av API-et fra den levende rutetabellen — alt du kan treffe med `curl`, vises her.

### `describe_endpoint`

Returnerer et kort sammendrag og, der det finnes, en håndlaget eksempel-forespørselskropp og eksempelsvar for ett endepunkt.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | streng | HTTP-verb |
| `path` | streng | Full sti slik `list_endpoints` returnerer den |

**Utdata:** for kuraterte endepunkter, et eksempel med `summary`, `requestBody` og `responseSample`. For ikke-kuraterte endepunkter, en reservemelding som ber modellen kalle `GET` først for å se formen. Rundt et dusin ruter med mye trafikk (personer, grupper, gaver, oppmøte, fond) er kuratert.

### `api_call`

Kaller det valgte REST-endepunktet in-process, gjennom samme Express-middleware-stakk som en vanlig HTTP-forespørsel — autentisering, body-parsing, revisjonslogging og scoping per menighet gjelder alle.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | streng | Sti inkludert eventuelt modulprefiks, f.eks. `/membership/people` |
| `query` | objekt (valgfritt) | Flatt objekt med spørringsparametere |
| `body` | hva som helst (valgfritt) | JSON-forespørselskropp — typisk en matrise av modellobjekter for `POST` |

**Utdata:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Verktøyresultatet markeres med `isError: true` for ethvert svar med status ≥ 400.

### `describe_page_builder`

Det ene ikke-generiske verktøyet: en statisk, selvstendig veiledning for å bygge nettsidesider gjennom `/content/*`-endepunktene — datamodellen Side → Seksjon → Element, opprettingsflyten, hver `elementType` med formen på `answersJSON`, seksjonsinnstillinger som formen på skilledelerne `dividerTop`/`dividerBottom`, og et utarbeidet eksempel fra start til slutt. Det tar ingen inndata og speiler elementkatalogen som vedlikeholdes i B1Admin-redigeringsprogrammet (se [Arkitektur for nettsidebyggeren](../architecture/website-builder)). Agenter forventes å kalle det én gang før de oppretter eller redigerer sideinnhold, og deretter handle via `api_call`.

## Autorisasjonsmodell {#auth-model}

Selve MCP-forespørselen går gjennom `CustomAuthProvider.getUser()` — den samme stien som alle autentiserte B1-endepunkter bruker. Et `cak_…`-bearer-token løses til en `Principal` hvis tillatelser er den utstedende personens nåværende RBAC, **skjæringspunktet** med nøkkelens tildelte scopes. Dette skjæringspunktet beregnes på nytt for hver forespørsel, så:

- Fjerner du et scope fra en nøkkel (ved å slette og opprette den på nytt), kuttes tilgangen ved neste kall.
- Fjerner du en tillatelse fra den underliggende personen i B1Admin, kuttes tilgangen ved neste kall, selv om nøkkelen fortsatt finnes.

For nøstede `api_call`-kall kopieres den opprinnelige `Authorization`-headeren over til det syntetiske forespørselsobjektet, slik at `CustomAuthProvider` kjører på nytt og skjæringspunktet med scopene brukes på nytt for hvert kall. Det finnes ingen tokencaching.

## Blokkeringsliste for stier {#path-blocklist}

Et lite sett med ruter kan ikke nås via `api_call`, selv med en gyldig nøkkel:

| Mønster | Hvorfor |
|---|---|
| `/giving/donate/webhook/*` | Webhook-endepunkter for leverandører forventer rå, signaturverifiserte kropper fra Stripe/PayPal — ikke generelle kallere |
| `/membership/oauth/clients*` | Registrering av OAuth-klienter er bare for operatører |
| `/membership/people/apiEmails` | Beskyttet av operatørens `jwtSecret`, ikke brukertillatelser |
| Enhver rute som forventer `multipart/form-data` | Filopplastinger passer ikke for JSON-RPC |

En blokkert sti returnerer et verktøyresultat med `isError: true` og en beskrivende melding; den underliggende ruten kalles aldri.

## Størrelsesgrense for svar {#response-size-cap}

Hver `api_call`-svarkropp er begrenset til **64 KB** med fanget utdata. Hvis en spørring overskrider grensen, får svaret `"truncated": true`, og modellen forventes å prøve på nytt med smalere spørringsparametere. Dette hindrer at ett enkelt verktøysvar sprenger klientens kontekstvindu.

## Hastighetsbegrensning {#rate-limiting}

Det finnes ingen hastighetsbegrensning på applikasjonsnivå for `/mcp`. Trafikkstyring skjer hos API Gateway / Lambda-samtidighet i produksjon, og hos det som reverse-proxyen din håndhever i egenhostede installasjoner.

## OAuth-oppdagelse {#oauth-discovery}

MCP-serveren annonserer OAuth 2.1-metadata slik at klienter som bare kobler til OAuth-oppdagede servere — særlig Claude.ai sitt «Add custom connector»-grensesnitt — kan logge inn en bruker uten en innlimt nøkkel. `/mcp` er den beskyttede ressursen, den eksisterende [OAuth-leverandøren](./connected-apps) under `/membership/oauth` er autorisasjonsserveren, og B1Admin-siden `/oauth` er samtykkeskjermen.

| Endepunkt | Formål |
|---|---|
| `GET /.well-known/oauth-protected-resource` (også `/.well-known/oauth-protected-resource/mcp`) | Metadata for beskyttet ressurs (RFC 9728): `resource` er `<api>/mcp`, `authorization_servers` er API-roten, `scopes_supported` lister hvert [API-nøkkelscope](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadata for autorisasjonsserver (RFC 8414): `authorization_endpoint` er B1Admin `/oauth`, `token_endpoint` er `/membership/oauth/token`, `registration_endpoint` er `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamisk klientregistrering (RFC 7591) |

Flyten en klient som claude.ai kjører:

1. `POST /mcp` uten token returnerer 401 med `WWW-Authenticate`-headeren som peker til metadataene for den beskyttede ressursen.
2. Klienten leser begge metadatadokumentene og registrerer seg selv med `POST /membership/oauth/register`, og sender `client_name`, `redirect_uris` og eventuelt `scope`. Hver selvregistrert klient er en **offentlig** klient: ingen hemmelighet utstedes, og svaret har `token_endpoint_auth_method: "none"`. Omdirigeringsadresser må være `https`, eller `http` på en loopback-adresse (`localhost`, `127.0.0.1`, `[::1]`); maks 10 per klient. Registrering har en hastighetsgrense på 20 per time per IP.
3. Brukeren sendes til B1Admin `/oauth` med `code_challenge` og `code_challenge_method=S256`. Samtykkesiden lister hvert forespurt scope med vanlig språk (eller «Everything your B1 account can access» når ingen ble forespurt), viser verten brukeren sendes tilbake til, og påpeker når appen registrerte seg selv. Brukeren klikker **Allow**.
4. Klienten bytter koden mot token på `/membership/oauth/token` med `grant_type=authorization_code` og sin `code_verifier`, og fornyer senere med `grant_type=refresh_token`. Skjemakodede og JSON-kropper godtas begge.
5. Det resulterende tilgangstokenet er en scopet B1-JWT, brukt som bearer på `/mcp`.

PKCE-regler: bare `S256` godtas. En klient uten hemmelighet må sende en `code_challenge` ved autorisering og den tilhørende `code_verifier` ved tokenutvekslingen; konfidensielle klienter (med en hemmelighet) kan fortsatt bruke bare hemmeligheten. Omdirigeringsadresser må samsvare nøyaktig med en registrert adresse.

Klienter som godtar et statisk bearer-token i konfigurasjonen sin — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, egen kode — kan fortsette å bruke en `cak_…`-nøkkel i stedet.

## Lokal utvikling {#local-development}

MCP-endepunktet monteres sammen med alt annet når API-et kjører lokalt:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Ved oppstart bekrefter logglinjen `📡 MCP server ready at /mcp — N routes in inventory` at oversikten ble bygget.

Test den med MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

I Inspector-grensesnittet peker du den til `http://localhost:8084/mcp` og setter `Authorization`-headeren til `Bearer cak_<prefix>.<secret>`. Kall `list_endpoints` først; du bør se hele ruteoversikten. Deretter bør `api_call({ method: "GET", path: "/membership/people" })` returnere personene fra dine lokale testdata.

## Kodeoppsett {#code-layout}

MCP-serveren ligger i `src/modules/mcp/` i Api-repositoryet. Viktige filer:

| Fil | Formål |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; kobler `StreamableHTTPServerTransport` per forespørsel og sender `WWW-Authenticate`-utfordringen ved 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Serverer OAuth-oppdagelsesdokumentene under `/.well-known` |
| `McpServer.ts` | Bygger en MCP-`Server` og registrerer de fire verktøyene |
| `RouteInventory.ts` | Går gjennom inversify-express-utils-metadata ved oppstart for å liste opp rutene |
| `internalDispatch.ts` | Syntetiske `req`/`res` som går inn i Express-appen igjen in-process |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuraterte forespørsels- og svareksempler for ruter med mye trafikk |

## Relatert {#related}

- [API-nøkler](./api-keys)
- [Webhooks](./webhooks)
- [Tilkoblede apper (OAuth)](./connected-apps)
- [Claude — oppsett for sluttbrukere](/docs/b1-admin/integrations/claude)
- [ChatGPT — oppsett for sluttbrukere](/docs/b1-admin/integrations/chatgpt)
