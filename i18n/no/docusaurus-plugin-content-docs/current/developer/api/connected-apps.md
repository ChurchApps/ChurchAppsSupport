---
title: "Tilkoblede apper og OAuth"
---

# Tilkoblede apper og OAuth

<div class="article-intro">

B1 API-et støtter OAuth 2.0, slik at en tredjepartsapplikasjon kan be hver menighetsadministrator om tillatelse til å få tilgang til dataene deres, uten at menigheten noensinne deler et passord eller en API-nøkkel. En **tilkoblet app** er et OAuth-token som en menighetsadministrator har godkjent. Å tilbakekalle det fjerner tredjepartsappens tilgang med ett klikk. Bruk denne veien for SaaS-koblinger med flere tenanter. For en integrasjon med én menighet foretrekker du [API-nøkler](./api-keys).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En OAuth-**klient** må være registrert før menigheter kan gi den tilgang. Det gjøres av en B1-serveradministrator, eller av klienten selv via [dynamisk registrering](#dynamic-client-registration).
- Alle OAuth-endepunkter ligger under Membership-modulen: `/membership/oauth/...`
- Tilgangstokener er JWT-er. De bærer brukerens tillatelser, filtrert etter de innvilgede omfangene.

</div>

## Begreper

| Begrep | Betydning |
|---|---|
| **OAuth-klient** | Tredjepartsappen selv. Identifisert med `client_id` og sikret med `client_secret`. Registreres én gang hos B1 og deles av alle menigheter som installerer den. |
| **Tilkoblet app** | Et spesifikt par `(klient, menighetsadministrator)` der administratoren har gitt klienten tilgang. Hver tilkoblede app støttes av et OAuth-oppdateringstoken. |
| **Tilgangstoken** | En kortlivet JWT (≈ 7 dager) som klienten bruker til API-kall. Samme form som en bruker-JWT: `Authorization: Bearer <jwt>`. |
| **Oppdateringstoken** | En langlivet, ugjennomsiktig streng (≈ 90 dager) som klienten bruker til å lage nye tilgangstokener. |
| **Omfang** | Begrenser hva tilgangstokenet kan gjøre. Se [omfangskatalogen](./api-keys#scopes). |

## Tilgangsflyter

B1 støtter tre OAuth-flyter, alle definert av RFC 6749 og RFC 8628.

### Authorization Code (webapper)

Bruk denne når appen din har en serverkomponent og kan holde `client_secret` privat.

1. **Autoriser**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Offentlige klienter (uten `client_secret`) må også sende `"code_challenge": "..."` og `"code_challenge_method": "S256"` (PKCE, RFC 7636). Bare `S256` godtas.

   Returnerer `{ "code": "...", "state": "xyz" }`. Autorisasjonskode-endepunktet er med vilje en autentisert POST. Appen din samler inn brukerens B1-JWT (vanligvis ved å vise en knapp i brukerens B1-økt) og videresender den som en del av samtykketrinnet.

2. **Bytt koden mot tokener**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Hvis autoriseringstrinnet sendte en `code_challenge`, må du inkludere den matchende `"code_verifier": "..."`. En offentlig klient sender verifikatoren og utelater `client_secret`. Token-endepunktet godtar JSON- eller form-kodede (`application/x-www-form-urlencoded`) innhold.

   Returnerer token-svaret:

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

3. **Oppdater** når tilgangstokenet snart utløper:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Oppdateringstokenet utløper etter 90 dager uten bruk. Hvis det er utløpt, må menighetsadministratoren autorisere på nytt.

### Device Code (TV-er, kiosker, CLI)

Bruk denne når enheten ikke har en nettleser. Definert av RFC 8628.

1. **Be om en enhetskode**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Returnerer koden for brukeren og polling-intervallet:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Vis `user_code` og `verification_uri` til brukeren.

3. **Poll** `/membership/oauth/token` med `grant_type=urn:ietf:params:oauth:grant-type:device_code` og `device_code`. Standardsvarene er:

   | Feil | Betydning |
   |---|---|
   | `authorization_pending` | Brukeren har ikke godkjent ennå. Fortsett å poll med det foreslåtte intervallet. |
   | `expired_token` | Enhetskoden er forbi `expires_in`. Start på nytt. |
   | `access_denied` | Brukeren avslo forespørselen. |
   | _(ingen, 200 OK)_ | Godkjent. Innholdet er en `B1TokenResponse`. |

4. Når den er godkjent, lagrer du `refresh_token` og bruker `access_token` til det utløper.

B1 SDK-en inkluderer `B1OAuthClient.awaitDeviceToken(...)`, som kjører polling-løkken for deg med fornuftig RFC-kompatibel backoff.

### Oppdateringstoken

Dette er alltid tilgjengelig som en frittstående forespørsel når du har et `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Du får tilbake et nytt `access_token` og `refresh_token`. **Offentlige klienter** (uten `client_secret`) kan utelate `client_secret` ved oppdatering. Det er nyttig for mobil- og skrivebords-OAuth-apper som ikke kan holde en hemmelighet.

Oppdateringstokener roteres, men det gamle kastes ikke med en gang. Hvis en klient aldri mottar svaret på oppdateringen (for eksempel en TV som mistet strøm eller Wi-Fi midt i en forespørsel), kan den prøve på nytt med forrige `refresh_token` i inntil **7 dager**. Forsøket lykkes bare så lenge erstatningstokenet ikke er brukt ennå. Det ubrukte erstatningstokenet droppes deretter, og et nytt par utstedes. Når erstatningen selv er oppdatert, returnerer det gamle tokenet `invalid_grant`. Å tilbakekalle en tilkobling tilbakekaller også roterte tokener som fortsatt er i karensperioden. Listen over tilkoblede apper viser hver tilkobling én gang.

## Tokenform

Et tilgangstoken er en B1-utstedt JWT som er identisk med den en bruker ville fått fra `POST /membership/users/login`. Den har samme modulære tillatelsesclaim og samme `checkAccess`-oppførsel i hver kontroller. **Unntaket** er at tillatelsesarrayen er filtrert gjennom de innvilgede omfangene når tokenet lages. Et omfangsbegrenset tilgangstoken kan ikke gjøre noe som en tilsvarende omfangsbegrenset API-nøkkel ikke kan gjøre. Det finnes heller ingen egen «OAuth-vei» i noen kontroller: `actionWrapper` vet ikke om bæreren er en person, en API-nøkkel eller en OAuth-klient.

## Tilkoblede apper (for brukere)

Fra en menighetsadministrators synspunkt er «Tilkoblede apper» listen over apper som har fått tilgang til menigheten deres. Hver rad er et levende `(OAuthClient, OAuthToken)`-par.

I B1Admin viser **Innstillinger → Utvikler → Tilkoblede apper**:

- Klientens navn
- Omfangene administratoren godkjente
- Datoen tilgangen ble gitt
- En **Tilbakekall**-knapp

| Metode og bane | Autentisering | Formål |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Lister den innloggedes egne aktive tilkoblinger (sammen med klientnavnet og omfangene) |
| `DELETE /membership/oauth/connections/:id` | JWT | Tilbakekaller en tilkobling etter OAuth-token-id. Tokenet slutter å fungere på neste forespørsel. |

Listen ekskluderer utløpte tokener automatisk.

## Omfang og samtykke

Omfangsstrengene er den samme katalogen som [API-nøkler](./api-keys#scopes). Beste praksis for klienter:

- **Be om de smaleste omfangene som fungerer.** Menigheter legger merke til det hvis du ber om `donations:write` når du bare trenger å lese personer.
- **Bruk et oppdateringstoken og kortlivede tilgangstokener.** Langlivede tilgangstokener er vanskeligere å tilbakekalle raskt.
- **Vis alltid de innvilgede omfangene tilbake til brukeren** i ditt eget grensesnitt, slik at de kan bekrefte hva de har samtykket til.

## Administrasjon av OAuth-klienter

OAuth-klienter (tredjepartsappene selv) registreres globalt. En konfidensiell klient med `client_secret` opprettes av en B1-serveradministrator. For å levere en, kontakt ChurchApps-teamet for et `client_id`/`client_secret`-par og registrer omdirigerings-URI-ene dine. Offentlige klienter, som MCP-koblinger, kan registrere seg selv (se nedenfor).

Registrerte omdirigerings-URI-er må samsvare nøyaktig med `redirect_uri` i forespørselen. Et prefiks eller delvis treff avvises.

| Metode og bane | Tillatelse | Beskrivelse |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Lister alle OAuth-klienter |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Henter en klient etter dens offentlige id (hemmeligheten er skjult) |
| `POST /membership/oauth/clients` | Server.Admin | Oppretter eller oppdaterer en klient |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Sletter en klient |

### Dynamisk klientregistrering {#dynamic-client-registration}

`POST /membership/oauth/register` (offentlig, RFC 7591) lar en klient, for eksempel claude.ai sin MCP-kobling, registrere seg selv. Den annonseres i API-ets `/.well-known/oauth-authorization-server`-dokument. Se [MCP-server → OAuth-oppdagelse](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Returnerer 201 med `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) og `token_endpoint_auth_method: "none"`.

- Ingen hemmelighet utstedes, så klienten må bruke PKCE ved hver autorisering.
- `redirect_uris` må være 1–10 `https`-URL-er, eller `http` på `localhost`, `127.0.0.1` eller `[::1]`.
- `client_name` kuttes til 45 tegn (standard er "AI assistant").
- Begrenset til 20 registreringer per time per IP.

På samtykkesiden i B1Admin får en selvregistrert klient en melding om at den registrerte seg selv. Den kan aldri gjøre mer enn brukerens egen B1-konto, og den kan kobles fra under **Innstillinger → Utvikler → Tilkoblede apper**.

## SDK-støtte

Pakken `@churchapps/integration-sdk` pakker inn hver OAuth-flyt med typede hjelpefunksjoner: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` og `.awaitDeviceToken()`. Se pakkens README og [Webhooks](./webhooks#sdk-support) for et eksempel fra ende til ende.
