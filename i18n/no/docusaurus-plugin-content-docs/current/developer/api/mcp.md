---
title: "MCP-server"
---

# MCP-server

<div class="article-intro">

B1 API leverer en [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-server på `/mcp`. Enhver MCP-klar AI-klient -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, eller dine egne -- kan koble til den og kalle den underliggende REST API på vegne av en autentisert kirkebruker. Det er et tynt, generisk innpakning: det er tre verktøy, og de eksponerer hele API-overflaten dynamisk i stedet for å håndmodellere hvert sluttpunkt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [B1 API-nøkkel](./api-keys) (`cak_…`) med omfangene klienten skal ha
- Et nåbart B1 API-vertsnavn -- `https://api.churchapps.org` for vertskirker, eller din egen distribusjon
- En MCP-klient. Se [Claude](/docs/b1-admin/integrations/claude) og [ChatGPT](/docs/b1-admin/integrations/chatgpt) for sluttbruker-oppsett

</div>

## Sluttpunkt

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspekt | Verdi |
|---|---|
| **Vei** | `/mcp` (relativt til API-verten) |
| **Metode** | `POST` bare -- forespørsel/respons og SSE streaming skjer begge på samme sluttpunkt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sesjon-modell** | Tilstandsløs. En frisk MCP-server-instans bygges per forespørsel -- ingen sesjon-id, ingen gjenopptakelse |
| **Auth** | Bærer token. `cak_…` API-nøkler og B1 JWTs begge fungerer; oppløsning er det samme som noe annet autentisert sluttpunkt |

En forespørsel hvis `Authorization`-hode mangler eller er ugyldig returnerer:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

med HTTP 401.

## Verktøy

Tre verktøy, alle generiske. Modellen bruker `list_endpoints` for oppdagelse, `describe_endpoint` for å lære nyttelast-form, og `api_call` for å faktisk påkalle API-en.

### `list_endpoints`

Returnerer hele beholdningen av registrerte REST-ruter, filtrert etter et valgfritt understreng og/eller HTTP-verb. Hver oppføring inkluderer kontroller-navn og API-nøkkelomfang mest sannsynlig trengt.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `filter` | streng (valgfritt) | Case-insensitive understreng samsvart mot banen, f.eks. `"people"` |
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

Beholdningen bygges en gang ved API-oppstart fra direkte-ruttetabellen -- noe du kan treffe med `curl` vises her.

### `describe_endpoint`

Returnerer en kort sammenfatning pluss, hvor tilgjengelig, et håndkurert forespørselsformat og responseksempel for ett sluttpunkt.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | streng | HTTP-verb |
| `path` | streng | Full vei som returnert av `list_endpoints` |

**Utdata:** for kuraterte sluttpunkter, et eksempel med `summary`, `requestBody`, og `responseSample`. For ikke-kuraterte sluttpunkter, en fallback-melding som instruerer modellen å kalle `GET` først for å se formen. Omtrent ett dusin høytrafikkruter (mennesker, grupper, donasjoner, frammøte, fond) er kuraterte.

### `api_call`

Påkaller det valgte REST-sluttpunktet, in-prosess, gjennom samme Express-meldings-stabel som en normal HTTP-forespørsel -- auth, kropp-analyse, revisjonslogging og per-kirke-omfang alle gjør alle.

**Inndata:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | streng | Vei inkludert enhver modulprefikks, f.eks. `/membership/people` |
| `query` | objekt (valgfritt) | Flatt objekt av strengeparametere |
| `body` | noe (valgfritt) | JSON forespørsel-kropp -- typisk en matrise av modellobjekter for `POST` |

**Utdata:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Verktøy-resultat er merket `isError: true` for enhver respons med status >= 400.

## Auth-modell

MCP-forespørselen selv kjøres gjennom `CustomAuthProvider.getUser()` -- samme vei hver autentisert B1-sluttpunkt bruker. En `cak_…` bærer løses til en `Principal` hvis tillatelser er utstedelsespersonens gjeldende RBAC, **krysset** med nøkkels innvilgede omfang. Dette krysset blir omberegnet på hver forespørsel, så:

- Å fjerne et omfang fra en nøkkel (ved å slette og gjenopprett den) kutter tilgangen på neste kall.
- Å fjerne en tillatelse fra den underliggende personen i B1Admin kutter tilgangen på neste kall, selv om nøkkelen fortsatt eksisterer.

For nestede `api_call`-påkallinger kopieres den opprinnelige `Authorization`-hodet til den syntetiske forespørselen, så `CustomAuthProvider` kjøres igjen og omfang-krysset re-brukes per kall. Det er ingen tokencaching.

## Vei-blokkering

Et lite sett av ruter er ikke nåbare via `api_call`, selv med en gyldig nøkkel:

| Mønster | Hvorfor |
|---|---|
| `/giving/donate/webhook/*` | Leverandør-webhook-sluttpunkter forventer rå, signatur-verifiserte kropper fra Stripe/PayPal -- ikke generelle anropere |
| `/membership/oauth/clients*` | OAuth-klient-registrering er operatør-bare |
| `/membership/people/apiEmails` | Utesperret av operatøren `jwtSecret`, ikke bruker-tillatelser |
| Enhver rute som forventer `multipart/form-data` | Filast-opp er ikke JSON-RPC-venlig |

En blokkert vei returnerer et `isError: true` verktøy-resultat med en beskrivende melding; den underliggende ruten blir aldri påkalt.

## Respons-størrelse-begrenset

Hver `api_call` respons-kropp er begrenset til **64 KB** av tatt utgang. Hvis en spørring overskrider grensen, bærer responsen `"truncated": true` og modellen forventes å prøve igjen med smalere spørring-parametre. Dette holder en enkelt verktøy-respons fra å blåse ut klientens kontekstvindu.

## Hastighetsbegrensning

Det er ingen applikasjons-nivå hastighetsbegrensning på `/mcp`. Dremling utsettes til API Gateway / Lambda-samtidighet i produksjon, og til hva som helst din omvendte fullmakt håndhever i selvvert-distribusjoner.

## Lokal utvikling

MCP-sluttpunktet monteres sammen med alt annet når API-en kjøres lokalt:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Ved oppstart bekrefter log-linja `📡 MCP server ready at /mcp — N routes in inventory` at beholdningen ble bygget.

Prøv det med MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

I Inspector UI peker du den på `http://localhost:8084/mcp` og setter `Authorization`-hodet til `Bearer cak_<prefix>.<secret>`. Kall `list_endpoints` først; du burde se full rutelist. Så `api_call({ method: "GET", path: "/membership/people" })` burde returnere dine lokale frø-mennesker.
