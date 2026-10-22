---
title: "Tilkoblede apper og OAuth"
---

# Tilkoblede apper og OAuth {#connected-apps--oauth}

<div class="article-intro">

B1 API støtter OAuth 2.0, slik at en tredjepartsapp kan be hver kirkeadministrator om tillatelse til å få tilgang til dataene deres – uten at kirken noensinne deler et passord eller en API-nøkkel. En **tilkoblet app** er et OAuth-token som en kirkeadministrator har godkjent. Å tilbakekalle det avbryter tredjepartsappens tilgang med ett klikk. Bruk denne veien for SaaS-connectorer for flere kirker. For en integrasjon for én kirke foretrekkes [API-nøkler](./api-keys).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En OAuth-**klient** må være registrert før kirker kan gi den tilgang – av en B1-serveradministrator, eller av klienten selv gjennom [dynamisk registrering](#dynamic-client-registration)
- Alle OAuth-endepunkter ligger under Membership-modulen: `/membership/oauth/...`
- Tilgangstokener er JWT-er – de bærer brukerens tillatelser, filtrert etter de innvilgede scopene

</div>

## Begreper {#concepts}

| Begrep | Betydning |
|---|---|
| **OAuth-klient** | Selve tredjepartsappen – identifisert med `client_id`, sikret med `client_secret`. Registreres én gang hos B1 og deles på tvers av alle kirker som installerer den. |
| **Tilkoblet app** | Et spesifikt `(klient, kirkeadministrator)`-par der administratoren har gitt klienten tilgang. Hver tilkoblet app støttes av et oppfriskingstoken. |
| **Tilgangstoken** | En kortlevd JWT (≈ 7 dager) som klienten bruker til API-kall. Samme format som en bruker-JWT – `Authorization: Bearer <jwt>`. |
| **Oppfriskingstoken** | En langlevd, ugjennomsiktig streng (≈ 90 dager) som klienten bruker til å lage nye tilgangstokener. |
| **Scope** | Begrenser hva tilgangstokenet kan gjøre – se [scope-katalogen](./api-keys#scopes). |

## Tildelingsflyter {#grant-flows}

B1 støtter tre OAuth-flyter, alle definert av RFC 6749 og RFC 8628.

### Authorization Code (webapper) {#authorization-code-web-apps}

Bruk når appen din har en serverdel og kan holde `client_secret` privat.

1. **Autoriser**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Offentlige klienter (uten `client_secret`) må også sende `"code_challenge": "..."` og `"code_challenge_method": "S256"` (PKCE, RFC 7636). Bare `S256` aksepteres.

   Returnerer `{ "code": "...", "state": "xyz" }`. Autorisasjonskode-endepunktet er med vilje en autentisert POST – appen din henter brukerens B1-JWT (vanligvis ved å være vert for en knapp i brukerens B1-økt) og sender den videre som en del av samtykkesteget.

2. **Bytt kode mot tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Hvis autoriseringssteget sendte en `code_challenge`, inkluderer du den tilhørende `"code_verifier": "..."`. En offentlig klient sender verifikatoren og utelater `client_secret`. Token-endepunktet godtar JSON- eller form-kodede (`application/x-www-form-urlencoded`) innhold.

   Returnerer token-responsen:

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

3. **Oppfrisk** når tilgangstokenet snart utløper:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Oppfriskingstokenet utløper etter 90 dager uten bruk. Hvis det er utløpt, må kirkeadministratoren autorisere på nytt.

### Device Code (TV-er, kiosker, CLI) {#device-code-tvs-kiosks-cli}

Bruk når enheten ikke har en nettleser. Definert av RFC 8628.

1. **Be om en enhetskode**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Returnerer brukervendt kode og polleintervall:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Vis `user_code` og `verification_uri` til brukeren.

3. **Poll** `/membership/oauth/token` med `grant_type=urn:ietf:params:oauth:grant-type:device_code` og `device_code`. Standardresponser:

   | Feil | Betydning |
   |---|---|
   | `authorization_pending` | Brukeren har ikke godkjent ennå – fortsett å polle med foreslått intervall |
   | `expired_token` | Enhetskoden er forbi `expires_in` – start på nytt |
   | `access_denied` | Brukeren avslo forespørselen |
   | _(ingen – 200 OK)_ | Godkjent – innholdet er en `B1TokenResponse` |

4. Når den er godkjent, lagrer du `refresh_token` og bruker `access_token` til det utløper.

B1 SDK inkluderer `B1OAuthClient.awaitDeviceToken(...)`, som kjører polling-løkken for deg med fornuftig, RFC-kompatibel backoff.

### Refresh Token {#refresh-token}

Alltid tilgjengelig som en frittstående forespørsel når du har en `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Et nytt `access_token` og `refresh_token` returneres. **Offentlige klienter** (uten `client_secret`) kan utelate `client_secret` ved oppfriskning – nyttig for mobil- og desktop-OAuth-apper som ikke kan holde en hemmelighet.

## Tokenformat {#token-shape}

Et tilgangstoken er en B1-utstedt JWT, identisk med den en bruker får fra `POST /membership/users/login` – samme modulære tillatelses-claim, samme `checkAccess`-oppførsel i alle kontrollere – **bortsett fra** at tillatelsesarrayen er filtrert gjennom de innvilgede scopene når tokenet utstedes. Et scopet tilgangstoken kan ikke gjøre noe et tilsvarende scopet API-nøkkel ikke kan, og det finnes ingen egen «OAuth-sti» i noen kontroller: `actionWrapper` vet ikke om innehaveren er en person, en API-nøkkel eller en OAuth-klient.

## Tilkoblede apper (brukervendt) {#connected-apps-user-facing}

Fra en kirkeadministrators synspunkt er «Tilkoblede apper» listen over apper som har fått tilgang til kirken deres. Hver rad er et live `(OAuthClient, OAuthToken)`-par.

I B1Admin viser **Innstillinger → Utvikler → Tilkoblede apper**:

- Klientens navn
- Scopene administratoren godkjente
- Datoen tilgangen ble gitt
- En knapp **Tilbakekall**

| Metode og sti | Autentisering | Formål |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | List innringerens egne aktive tilkoblinger (med klientnavn og scopes) |
| `DELETE /membership/oauth/connections/:id` | JWT | Tilbakekall en tilkobling etter dens OAuth-token-id – tokenet slutter å fungere ved neste forespørsel |

Listen utelater automatisk utløpte tokener.

## Scopes og samtykke {#scopes--consent}

Scope-strengene er samme katalog som [API-nøkler](./api-keys#scopes). Beste praksis for klienter:

- **Be om de smaleste scopene som fungerer.** Kirker legger merke til det hvis du ber om `donations:write` når du bare trenger å lese personer.
- **Bruk et oppfriskingstoken pluss kortlevde tilgangstokener.** Langlevde tilgangstokener er vanskeligere å tilbakekalle raskt.
- **Vis alltid de innvilgede scopene tilbake til brukeren** i ditt eget grensesnitt, slik at de kan verifisere hva de samtykket til.

## Administrasjon av OAuth-klienter {#oauth-client-management}

OAuth-klienter (tredjepartsappene selv) registreres globalt. En konfidensiell klient med `client_secret` lages av en B1-serveradministrator. For å lage en, kontakt ChurchApps-teamet for et `client_id` / `client_secret`-par og registrer redirect-URI-ene dine. Offentlige klienter, som MCP-connectorer, kan registrere seg selv (se nedenfor).

Registrerte redirect-URI-er må samsvare nøyaktig med `redirect_uri` i forespørselen. Et prefiks- eller delvis treff avvises.

| Metode og sti | Tillatelse | Beskrivelse |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | List alle OAuth-klienter |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Hent en klient etter dens offentlige id (hemmelighet skjult) |
| `POST /membership/oauth/clients` | Server.Admin | Opprett eller oppdater en klient |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Slett en klient |

### Dynamisk klientregistrering {#dynamic-client-registration}

`POST /membership/oauth/register` (offentlig, RFC 7591) lar en klient, for eksempel claude.ai sin MCP-connector, registrere seg selv. Det annonseres av API-ets `/.well-known/oauth-authorization-server`-dokument – se [MCP-server → OAuth-oppdagelse](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Returnerer 201 med `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) og `token_endpoint_auth_method: "none"`.

- Det utstedes aldri en hemmelighet, så klienten må bruke PKCE ved hver autorisering.
- `redirect_uris` må være 1–10 `https`-URL-er, eller `http` på `localhost`, `127.0.0.1` eller `[::1]`.
- `client_name` kuttes til 45 tegn (standard «AI assistant»).
- Begrenset til 20 registreringer per time per IP.

På samtykkesiden i B1Admin får en selvregistrert klient et varsel om at den registrerte seg selv. Den kan aldri gjøre mer enn brukerens egen B1-konto, og den kan kobles fra under **Innstillinger → Utvikler → Tilkoblede apper**.

## SDK-støtte {#sdk-support}

`@churchapps/integration-sdk`-pakken pakker inn hver OAuth-flyt med typede hjelpere – `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Se pakkens README og [Webhooks](./webhooks#sdk-support) for et komplett eksempel.
