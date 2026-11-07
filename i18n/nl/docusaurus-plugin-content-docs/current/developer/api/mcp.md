---
title: "MCP-server"
description: "Stel MCP-toegang tot de B1 API in, zodat AI-clients als Claude Code, Cursor of Claude Desktop met API-sleutels of OAuth kerkgegevens kunnen opvragen."
---

# MCP-server

<div class="article-intro">

De B1 API bevat een [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-server op `/mcp`. Elke MCP-compatibele AI-client — aangepaste connectors in claude.ai, Claude Code, Claude Desktop, de OpenAI Agents SDK, Cursor of een eigen implementatie — kan hiermee verbinding maken en de onderliggende REST API aanroepen namens een geauthenticeerde kerkgebruiker. Het is een dunne, generieke wrapper: drie generieke tools geven dynamisch toegang tot het volledige API-oppervlak, in plaats van elk eindpunt afzonderlijk te modelleren, plus één domeingidstool voor de websitebouwer.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Een [B1 API-sleutel](./api-keys.md) (`cak_…`) met de bereiken die de client nodig heeft, of een MCP-client die kan inloggen via OAuth (zie [OAuth-detectie](#oauth-discovery))
- Een bereikbare B1 API-host — `https://api.churchapps.org` voor gehoste kerken, of uw eigen implementatie
- Een MCP-client. Zie [Claude](/docs/b1-admin/integrations/claude) en [ChatGPT](/docs/b1-admin/integrations/chatgpt) voor de installatie door eindgebruikers

</div>

## Eindpunt

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspect | Waarde |
|---|---|
| **Pad** | `/mcp` (ten opzichte van de API-host) |
| **Methode** | Alleen `POST` — verzoek/antwoord en SSE-streaming verlopen via hetzelfde eindpunt |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Sessiemodel** | Stateless. Per verzoek wordt een nieuwe MCP-serverinstantie gebouwd — geen sessie-id, geen hervatting |
| **Authenticatie** | Bearer-token. `cak_…`-API-sleutels en B1 JWT's (inclusief OAuth-toegangstokens) werken allemaal; de afhandeling is hetzelfde als bij elk ander geauthenticeerd eindpunt |

Een verzoek waarvan de `Authorization`-header ontbreekt of ongeldig is, retourneert:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

met HTTP 401 en een `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`-header, die OAuth-compatibele clients volgen om met inloggen te beginnen.

Op de gehoste API (productie en demo) wordt `/mcp` aangeboden via een API Gateway HTTP API in plaats van de REST API die voor de overige eindpunten wordt gebruikt. De REST API hernoemt `WWW-Authenticate` naar `x-amzn-remapped-www-authenticate` bij Lambda-proxyantwoorden. Hierdoor kregen clients zoals ChatGPT alleen een kale 401 zonder manier om met inloggen te beginnen. De HTTP API geeft de header ongewijzigd door.

## Tools

Drie generieke tools en één gids. Het model gebruikt `list_endpoints` voor de detectie, `describe_endpoint` om een payloadstructuur te leren kennen, `api_call` om de API daadwerkelijk aan te roepen, en `describe_page_builder` wanneer de taak websiteinhoud betreft.

### `list_endpoints`

Retourneert de volledige inventaris van geregistreerde REST-routes, gefilterd op een optionele deelreeks en/of HTTP-werkwoord. Elk item bevat de naam van de controller en de API-sleutelbereiken die waarschijnlijk nodig zijn.

**Invoer:**

| Veld | Type | Beschrijving |
|---|---|---|
| `filter` | string (optioneel) | Hoofdletterongevoelige deelreeks die wordt vergeleken met het pad, bijvoorbeeld `"people"` |
| `method` | enum (optioneel) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Uitvoer:** een JSON-document in de volgende vorm:

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

De inventaris wordt één keer opgebouwd bij het opstarten van de API, op basis van de actieve routetabel. Alles wat u met `curl` kunt bereiken, verschijnt hier.

### `describe_endpoint`

Retourneert een korte samenvatting en, indien beschikbaar, een handmatig samengestelde voorbeeldaanvraag en -respons voor één eindpunt.

**Invoer:**

| Veld | Type | Beschrijving |
|---|---|---|
| `method` | string | HTTP-werkwoord |
| `path` | string | Volledig pad zoals geretourneerd door `list_endpoints` |

**Uitvoer:** voor samengestelde eindpunten een voorbeeld met `summary`, `requestBody` en `responseSample`. Voor niet-samengestelde eindpunten een terugvalbericht dat het model opdraagt eerst `GET` aan te roepen om de structuur te zien. Ongeveer een dozijn veelgebruikte routes (personen, groepen, donaties, aanwezigheid, fondsen) zijn samengesteld.

### `api_call`

Roept het gekozen REST-eindpunt aan, in-process, via dezelfde Express-middlewarestack als een normaal HTTP-verzoek. Authenticatie, het verwerken van de body, auditlogging en scoping per kerk zijn allemaal van toepassing.

**Invoer:**

| Veld | Type | Beschrijving |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Pad inclusief eventuele modulevoorvoegsel, bijvoorbeeld `/membership/people` |
| `query` | object (optioneel) | Platte object met queryparameters |
| `body` | any (optioneel) | JSON-aanvraagbody — meestal een array van modelobjecten bij `POST` |

**Uitvoer:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Het toolresultaat is gemarkeerd met `isError: true` bij elk antwoord met status ≥ 400.

### `describe_page_builder`

De enige niet-generieke tool: een statische, op zichzelf staande gids voor het bouwen van websitepagina's via de `/content/*`-eindpunten — het Pagina → Sectie → Element-datamodel, de werkwijze voor het aanmaken, elk `elementType` met de structuur van `answersJSON`, instellingen op sectieniveau zoals de `dividerTop`/`dividerBottom`-vormscheidingslijnen, en een uitgewerkt voorbeeld van begin tot eind. Hij heeft geen invoer nodig en spiegelt de elementcatalogus die wordt onderhouden in de B1Admin-editor (zie [Architectuur van de websitebouwer](../architecture/website-builder.md)). Agents worden geacht deze tool één keer aan te roepen voordat ze paginacontent maken of bewerken, en vervolgens via `api_call* te handelen.

## Auth-model

Het MCP-verzoek zelf verloopt via `CustomAuthProvider.getUser()` — hetzelfde pad dat elk geauthenticeerd B1-eindpunt gebruikt. Een `cak_…`-bearer wordt omgezet in een `Principal` waarvan de rechten de actuele RBAC van de persoon die de sleutel heeft uitgegeven zijn, **gecombineerd** met de aan de sleutel toegekende bereiken. Deze combinatie wordt bij elk verzoek opnieuw berekend, dus:

- Het verwijderen van een bereik van een sleutel (door deze te verwijderen en opnieuw aan te maken) beperkt de toegang bij de volgende aanroep.
- Het verwijderen van een recht van de onderliggende persoon in B1Admin beperkt de toegang bij de volgende aanroep, zelfs als de sleutel nog bestaat.

Bij geneste `api_call`-aanroepen wordt de oorspronkelijke `Authorization`-header naar het synthetische verzoek gekopieerd, zodat `CustomAuthProvider` opnieuw wordt uitgevoerd en de combinatie van bereiken per aanroep opnieuw wordt toegepast. Er vindt geen tokencaching plaats.

## Padblokkering

Een kleine set routes is niet bereikbaar via `api_call`, zelfs niet met een geldige sleutel:

| Patroon | Reden |
|---|---|
| `/giving/donate/webhook/*` | Webhook-eindpunten van providers verwachten onbewerkte, handtekeninggecontroleerde bodies van Stripe/PayPal — niet van algemene aanroepers |
| `/membership/oauth/clients*` | Registratie van OAuth-clients is alleen voor beheerders |
| `/membership/people/apiEmails` | Beveiligd door het beheerders-`jwtSecret`, niet door gebruikersrechten |
| Elke route die `multipart/form-data` verwacht | Bestandsuploads zijn niet geschikt voor JSON-RPC |

Een geblokkeerd pad retourneert een `isError: true`-toolresultaat met een beschrijvende melding; de onderliggende route wordt nooit aangeroepen.

## Limiet voor de antwoordgrootte

De body van elk `api_call`-antwoord is beperkt tot **64 KB** aan vastgelegde uitvoer. Als een query de limiet overschrijdt, bevat het antwoord `"truncated": true` en wordt van het model verwacht dat het opnieuw probeert met smallere queryparameters. Zo kan één toolantwoord het contextvenster van de client niet overbelasten.

## Snelheidsbeperking

Er is geen toepassingsbrede snelheidsbeperking voor `/mcp`. Throttling wordt in productie uitgesteld tot API Gateway / Lambda-concurrency, en in zelfgehoste implementaties tot wat uw reverse proxy afdwingt.

## OAuth-detectie

De MCP-server adverteert OAuth 2.1-metadata, zodat clients die alleen verbinding maken met via OAuth gevonden servers — met name de dialoog "Aangepaste connector toevoegen" van Claude.ai — een gebruiker kunnen laten inloggen zonder een geplakte sleutel. `/mcp` is de beschermde resource, de bestaande [OAuth-provider](./connected-apps.md) onder `/membership/oauth` is de autorisatieserver, en de pagina `/oauth` van B1Admin is het toestemmingsscherm.

| Eindpunt | Doel |
|---|---|
| `GET /.well-known/oauth-protected-resource` (ook `/.well-known/oauth-protected-resource/mcp`) | Metadata van de beschermde resource (RFC 9728): `resource` is `<api>/mcp`, `authorization_servers` is de API-root, `scopes_supported` somt elk [API-sleutelbereik](./api-keys.md#scopes) op |
| `GET /.well-known/oauth-authorization-server` | Metadata van de autorisatieserver (RFC 8414): `authorization_endpoint` is B1Admin `/oauth`, `token_endpoint` is `/membership/oauth/token`, `registration_endpoint` is `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamische clientregistratie (RFC 7591) |

De stroom die een client zoals claude.ai doorloopt:

1. `POST /mcp` zonder token retourneert 401 met de `WWW-Authenticate`-header die naar de metadata van de beschermde resource verwijst.
2. De client leest beide metadatadocumenten en registreert zichzelf vervolgens via `POST /membership/oauth/register`, met `client_name`, `redirect_uris` en optioneel `scope`. Elke zelf-geregistreerde client is een **publieke** client: er wordt geen geheim uitgegeven en het antwoord bevat `token_endpoint_auth_method: "none"`. Redirect-URI's moeten `https` zijn, of `http` op een loopbackadres (`localhost`, `127.0.0.1`, `[::1]`); maximaal 10 per client. Registratie is beperkt tot 20 per uur per IP-adres.
3. De gebruiker wordt naar B1Admin `/oauth` gestuurd met `code_challenge` en `code_challenge_method=S256`. De toestemmingspagina somt elk gevraagd bereik in gewone taal op (of "Alles waartoe uw B1-account toegang heeft" wanneer er geen zijn aangevraagd), toont de host waarnaar de gebruiker wordt teruggestuurd, en meldt wanneer de app zichzelf heeft geregistreerd. De gebruiker klikt op **Toestaan**.
4. De client wisselt de code in bij `/membership/oauth/token` met `grant_type=authorization_code` en zijn `code_verifier`, en vernieuwt later met `grant_type=refresh_token`. Zowel form-gecodeerde als JSON-bodies worden geaccepteerd.
5. Het resulterende toegangstoken is een B1 JWT met beperkte bereiken, en wordt als bearer op `/mcp` gebruikt.

PKCE-regels: alleen `S256` wordt geaccepteerd. Een client zonder geheim moet een `code_challenge` meesturen bij de autorisatie en de bijbehorende `code_verifier` bij de tokenuitwisseling; vertrouwelijke clients (met een geheim) mogen nog steeds alleen het geheim gebruiken. Redirect-URI's moeten exact overeenkomen met een geregistreerde URI.

Clients die in hun configuratie een statisch bearer-token accepteren — Claude Code, Claude Desktop, de OpenAI Agents SDK, Cursor, eigen code — kunnen in plaats daarvan een `cak_…`-sleutel blijven gebruiken.

## Lokale ontwikkeling

Het MCP-eindpunt wordt naast alle andere onderdelen geactiveerd wanneer de API lokaal draait:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Bij het opstarten bevestigt de logregel `📡 MCP server ready at /mcp — N routes in inventory` dat de inventaris is opgebouwd.

Test het met de MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Richt de Inspector-UI op `http://localhost:8084/mcp` en stel de `Authorization`-header in op `Bearer cak_<prefix>.<secret>`. Roep eerst `list_endpoints` aan; u zou de volledige routelijst moeten zien. Daarna zou `api_call({ method: "GET", path: "/membership/people" })` uw lokale testpersonen moeten retourneren.

## Indeling van de code

De MCP-server staat in `src/modules/mcp/` in de Api-repository. Belangrijke bestanden:

| Bestand | Doel |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; koppelt per verzoek een `StreamableHTTPServerTransport` en stuurt de `WWW-Authenticate`-uitdaging bij een 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Levert de `/.well-known`-documenten voor OAuth-detectie |
| `McpServer.ts` | Bouwt een MCP-`Server` en registreert de vier tools |
| `RouteInventory.ts` | Doorloopt de metadata van inversify-express-utils bij het opstarten om routes op te sommen |
| `internalDispatch.ts` | Synthetische `req`/`res` die in-process opnieuw de Express-app binnengaan |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Samengestelde aanvraag- en antwoordvoorbeelden voor veelgebruikte eindpunten |

## Gerelateerd

- [API-sleutels](./api-keys.md)
- [Webhooks](./webhooks.md)
- [Gekoppelde apps (OAuth)](./connected-apps.md)
- [Claude — installatie voor eindgebruikers](/docs/b1-admin/integrations/claude)
- [ChatGPT — installatie voor eindgebruikers](/docs/b1-admin/integrations/chatgpt)
