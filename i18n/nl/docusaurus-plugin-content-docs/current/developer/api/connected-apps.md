---
title: "Verbonden apps & OAuth"
---

# Verbonden apps & OAuth

<div class="article-intro">

De B1 API ondersteunt OAuth 2.0, zodat een applicatie van derden elke kerkbeheerder om toestemming kan vragen om toegang tot hun gegevens te krijgen, zonder dat de kerk ooit een wachtwoord of API-sleutel hoeft te delen. Een **Connected App** is een OAuth-token dat een kerkbeheerder heeft goedgekeurd; het intrekken ervan beëindigt de toegang van de app van derden met één klik. Gebruik deze route voor multi-tenant SaaS-connectors. Voor een integratie met één kerk heeft [API-sleutels](./api-keys) de voorkeur.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een OAuth-**client** moet geregistreerd zijn voordat kerken er toegang toe kunnen verlenen, door een B1-serverbeheerder of door de client zelf via [dynamische registratie](#dynamic-client-registration)
- Alle OAuth-endpoints bevinden zich onder de Membership-module: `/membership/oauth/...`
- Toegangstokens zijn JWT's; ze bevatten de rechten van de gebruiker, gefilterd op de verleende scopes

</div>

## Concepten

| Term | Betekenis |
|---|---|
| **OAuth client** | De app van de derde partij zelf, geïdentificeerd door `client_id` en beveiligd door `client_secret`. Eenmalig geregistreerd bij B1 en gedeeld met alle kerken die de app installeren. |
| **Connected App** | Een specifiek `(client, kerkbeheerder)`-paar waarbij de beheerder toegang aan de client heeft verleend. Elke Connected App wordt ondersteund door een OAuth-refreshtoken. |
| **Access token** | Een kortlevende JWT (≈ 7 dagen) die de client gebruikt voor API-aanroepen. Dezelfde vorm als een gebruikers-JWT: `Authorization: Bearer <jwt>`. |
| **Refresh token** | Een langlevende ondoorzichtige string (≈ 90 dagen) die de client gebruikt om nieuwe toegangstokens aan te maken. |
| **Scope** | Beperkt wat het toegangstoken kan doen. Zie de [scopecatalogus](./api-keys#scopes). |

## Autorisatiestromen

B1 ondersteunt drie OAuth-stromen, allemaal gedefinieerd door RFC 6749 en RFC 8628.

### Authorization Code (webapps)

Gebruik dit wanneer je app een server-side onderdeel heeft en `client_secret` privé kan houden.

1. **Autoriseren**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Publieke clients (zonder `client_secret`) moeten ook `"code_challenge": "..."` en `"code_challenge_method": "S256"` meesturen (PKCE, RFC 7636). Alleen `S256` wordt geaccepteerd.

   Retourneert `{ "code": "...", "state": "xyz" }`. Het autorisatiecode-endpoint is bewust een geauthenticeerde POST: je app verzamelt de B1-JWT van de gebruiker (meestal via een knop in de B1-sessie van de gebruiker) en stuurt die mee als onderdeel van de toestemmingsstap.

2. **Code inwisselen voor tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Als de autorisatiestap een `code_challenge` heeft verstuurd, voeg dan de bijbehorende `"code_verifier": "..."` toe. Een publieke client stuurt de verifier mee en laat `client_secret` weg. Het token-endpoint accepteert JSON- of formulier-gecodeerde (`application/x-www-form-urlencoded`) body's.

   Retourneert het tokenantwoord:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Vernieuwen** wanneer het toegangstoken bijna verloopt:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Het refreshtoken verloopt na 90 dagen zonder gebruik. Als het verlopen is, moet de kerkbeheerder opnieuw autoriseren.

### Device Code (tv's, kiosken, CLI)

Gebruik dit wanneer het apparaat geen browser heeft. Gedefinieerd door RFC 8628.

1. **Een apparaatcode aanvragen**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Retourneert de voor de gebruiker zichtbare code en het pollinginterval:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Toon `user_code` en `verification_uri` aan de gebruiker.

3. **Poll** `/membership/oauth/token` met `grant_type=urn:ietf:params:oauth:grant-type:device_code` en de `device_code`. Standaardantwoorden:

   | Fout | Betekenis |
   |---|---|
   | `authorization_pending` | De gebruiker heeft nog niet goedgekeurd. Blijf pollen met het voorgestelde interval. |
   | `expired_token` | De apparaatcode is na `expires_in` verlopen. Begin opnieuw. |
   | `access_denied` | De gebruiker heeft het verzoek geweigerd. |
   | _(geen, 200 OK)_ | Goedgekeurd. De body is een `B1TokenResponse`. |

4. Zodra het verzoek is goedgekeurd, sla je de `refresh_token` op en gebruik je het `access_token` totdat het verloopt.

De B1 SDK bevat `B1OAuthClient.awaitDeviceToken(...)`, dat de polling-lus voor je uitvoert met een RFC-conforme backoff.

### Refreshtoken

Dit is altijd beschikbaar als op zichzelf staand verzoek zodra je een `refresh_token` hebt:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Er komen een nieuw `access_token` en een nieuw `refresh_token` terug. **Publieke clients** (zonder `client_secret`) kunnen `client_secret` bij het vernieuwen weglaten. Dit is handig voor mobiele en desktop-OAuth-apps die geen geheim kunnen bewaren.

Refreshtokens worden geroteerd, maar het oude token wordt niet meteen weggegooid. Als een client het refreshantwoord nooit ontvangt (bijvoorbeeld omdat een tv tijdens het verzoek zonder stroom of wifi kwam te zitten), kan hij het opnieuw proberen met het vorige `refresh_token`, gedurende maximaal **7 dagen**. De poging slaagt alleen zolang het vervangende token nog niet is gebruikt. Het ongebruikte vervangende token wordt dan verwijderd en er wordt een nieuw paar uitgegeven. Zodra het vervangende token zelf is vernieuwd, geeft het oude token `invalid_grant`. Het intrekken van een verbinding trekt ook alle geroteerde tokens in die graceperiode in. De lijst met verbonden apps toont elke verbinding één keer.

## Tokenvorm

Een toegangstoken is een door B1 uitgegeven JWT, identiek aan het token dat een gebruiker krijgt van `POST /membership/users/login`. Het heeft dezelfde modulaire rechtenclaim en `checkAccess` gedraagt zich in elke controller hetzelfde. **Het verschil** is dat de permissies-array bij het aanmaken is gefilterd op de verleende scopes. Een beperkt toegangstoken kan niets wat een vergelijkbaar beperkte API-sleutel niet kan, en er is geen apart "OAuth-pad" in enige controller. `actionWrapper` weet niet of de drager een persoon, een API-sleutel of een OAuth-client is.

## Connected Apps (voor gebruikers)

Vanuit het perspectief van een kerkbeheerder is "Connected Apps" de lijst met apps die toegang tot hun kerk hebben gekregen. Elke rij is een actief `(OAuthClient, OAuthToken)`-paar.

In B1Admin toont **Settings → Developer → Connected Apps**:

- De naam van de client
- De scopes die de beheerder heeft goedgekeurd
- De datum waarop de toegang is verleend
- Een knop **Revoke**

| Methode en pad | Auth | Doel |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Lijst van de eigen actieve verbindingen van de aanroeper (met clientnaam en scopes) |
| `DELETE /membership/oauth/connections/:id` | JWT | Een verbinding intrekken via het OAuth-token-id. Het token werkt niet meer vanaf het volgende verzoek. |

De lijst sluit verlopen tokens automatisch uit.

## Scopes en toestemming

De scopestrings vormen dezelfde catalogus als bij [API-sleutels](./api-keys#scopes). Best practices voor clients:

- **Vraag de smalste scopes die werken.** Kerken merken het als je `donations:write` vraagt terwijl je alleen mensen wilt lezen.
- **Gebruik een refreshtoken met kortlevende toegangstokens.** Langlevende toegangstokens zijn moeilijker snel in te trekken.
- **Toon altijd de verleende scopes aan de gebruiker** in je eigen interface, zodat hij kan controleren waarmee hij heeft ingestemd.

## Beheer van OAuth-clients

OAuth-clients (de apps van derden zelf) worden globaal geregistreerd. Een vertrouwelijke client met een `client_secret` wordt aangemaakt door een B1-serverbeheerder. Om er een te laten aanmaken, neem je contact op met het ChurchApps-team voor een `client_id`- en `client_secret`-paar, en registreer je je redirect-URI's. Publieke clients zoals MCP-connectors kunnen zichzelf registreren (zie hieronder).

Geregistreerde redirect-URI's moeten exact overeenkomen met de `redirect_uri` in het verzoek. Een prefix- of gedeeltelijke overeenkomst wordt geweigerd.

| Methode en pad | Recht | Beschrijving |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Alle OAuth-clients weergeven |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Een client ophalen via zijn publieke id (secret geredigeerd) |
| `POST /membership/oauth/clients` | Server.Admin | Een client aanmaken of bijwerken |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Een client verwijderen |

### Dynamische clientregistratie

`POST /membership/oauth/register` (publiek, RFC 7591) laat een client, zoals de MCP-connector van claude.ai, zichzelf registreren. Dit wordt geadverteerd in het document `/.well-known/oauth-authorization-server` van de API. Zie [MCP-server → OAuth-discovery](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Retourneert 201 met `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) en `token_endpoint_auth_method: "none"`.

- Er wordt nooit een geheim uitgegeven, dus de client moet bij elke autorisatie PKCE gebruiken.
- `redirect_uris` moeten 1 tot 10 `https`-URL's zijn, of `http`-URL's op `localhost`, `127.0.0.1` of `[::1]`.
- `client_name` wordt ingekort tot 45 tekens (standaard "AI assistant").
- Beperkt tot 20 registraties per uur per IP-adres.

Op de toestemmingspagina van B1Admin krijgt een zelf-geregistreerde client een melding dat de app zichzelf heeft geregistreerd. De melding vermeldt dat de app nooit meer kan doen dan het eigen B1-account van de gebruiker, en dat de verbinding kan worden verbroken onder **Settings → Developer → Connected Apps**.

## SDK-ondersteuning

Het pakket `@churchapps/integration-sdk` omhult elke OAuth-stroom met getypeerde helpers: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` en `.awaitDeviceToken()`. Zie de README van het pakket en [Webhooks](./webhooks#sdk-support) voor een volledig voorbeeld.
