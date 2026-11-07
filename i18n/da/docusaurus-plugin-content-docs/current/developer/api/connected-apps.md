---
title: "Forbundne apps og OAuth"
description: "Forbind tredjepartsapps til en kirkes B1-data med OAuth 2.0-samtykke, uden delte adgangskoder eller API-nøgler, og tilbagekald adgang i B1 Admin."
---

# Forbundne apps og OAuth

<div class="article-intro">

B1 API'et understøtter OAuth 2.0, så en tredjepartsapp kan bede hver kirkeadministrator om tilladelse til at få adgang til deres data, uden at kirken nogensinde deler en adgangskode eller API-nøgle. En **forbundet app** er et OAuth-token, som en kirkeadministrator har godkendt. Hvis du tilbagekalder det, afbrydes tredjepartsappens adgang med ét klik. Brug denne fremgangsmåde til multi-tenant SaaS-connectors. Til en integration for én enkelt kirke foretrækkes [API-nøgler](./api-keys.md).

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Et OAuth-**klient** skal være registreret, før kirker kan give den adgang. Det gøres af en B1-serveradministrator eller af klienten selv via [dynamisk registrering](#dynamic-client-registration)
- Alle OAuth-endpoints ligger under Membership-modulet: `/membership/oauth/...`
- Adgangstokens er JWT'er. De indeholder brugerens tilladelser, filtreret efter de tildelte scopes

</div>

## Begreber

| Begreb | Betydning |
|---|---|
| **OAuth-klient** | Selve tredjepartsappen, identificeret ved `client_id` og sikret med `client_secret`. Registreres én gang hos B1 og deles af alle kirker, der installerer den. |
| **Forbundet app** | Et specifikt par af `(klient, kirkeadministrator)`, hvor administratoren har givet klienten adgang. Hver forbundet app er knyttet til et OAuth-opdateringstoken. |
| **Adgangstoken** | Et kortlivet JWT (ca. 7 dage), som klienten bruger til API-kald. Har samme form som et bruger-JWT: `Authorization: Bearer <jwt>`. |
| **Opdateringstoken** | En langlivet, uigennemsigtig streng (ca. 90 dage), som klienten bruger til at udstede nye adgangstokens. |
| **Scope** | Begrænser, hvad adgangstokenet må gøre. Se [scope-kataloget](./api-keys.md#scopes). |

## Godkendelsesflows

B1 understøtter tre OAuth-flows, alle defineret i RFC 6749 og RFC 8628.

### Authorization Code (webapps)

Brug denne, når din app har en serverdel og kan holde `client_secret` hemmeligt.

1. **Godkend**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Offentlige klienter (uden `client_secret`) skal også sende `"code_challenge": "..."` og `"code_challenge_method": "S256"` (PKCE, RFC 7636). Kun `S256` accepteres.

   Svaret er `{ "code": "...", "state": "xyz" }`. Endpointet for autorisationskoden er bevidst et autentificeret POST-kald. Din app henter brugerens B1-JWT (typisk ved at vise en knap i brugerens B1-session) og videresender det som en del af samtykketrinnet.

2. **Byt kode til tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Hvis godkendelsestrinnet sendte en `code_challenge`, skal du medsende den tilhørende `"code_verifier": "..."`. En offentlig klient sender verifikatoren og udelader `client_secret`. Token-endpointet accepterer både JSON og form-kodede (`application/x-www-form-urlencoded`) anmodninger.

   Svaret er token-svaret:

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

3. **Forny**, når adgangstokenet snart udløber:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Opdateringstokenet udløber efter 90 dages inaktivitet. Hvis det er udløbet, skal kirkeadministratoren godkende igen.

### Device Code (TV, kiosker, CLI)

Brug denne, når enheden ikke har en browser. Defineret i RFC 8628.

1. **Anmod om en enhedskode**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Svaret indeholder den kode, brugeren skal indtaste, samt polling-intervallet:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Vis `user_code` og `verification_uri` for brugeren.

3. **Poll** `/membership/oauth/token` med `grant_type=urn:ietf:params:oauth:grant-type:device_code` og `device_code`. Standardsvar:

   | Fejl | Betydning |
   |---|---|
   | `authorization_pending` | Brugeren har ikke godkendt endnu. Fortsæt med at poll med det foreslåede interval |
   | `expired_token` | Enhedskoden er udløbet efter `expires_in`. Start forfra |
   | `access_denied` | Brugeren afviste anmodningen |
   | _(ingen, 200 OK)_ | Godkendt. Indholdet er et `B1TokenResponse` |

4. Når den er godkendt, gemmes `refresh_token`, og `access_token` bruges, indtil det udløber.

B1 SDK'et indeholder `B1OAuthClient.awaitDeviceToken(...)`, som kører polling-løkken for dig med en RFC-kompatibel backoff.

### Opdateringstoken

Kan altid bruges som en selvstændig anmodning, når du har et `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Der returneres et nyt `access_token` og `refresh_token`. **Offentlige klienter** (uden `client_secret`) kan udelade `client_secret` ved fornyelse. Det er nyttigt for mobil- og desktop-OAuth-apps, der ikke kan holde en hemmelighed.

Opdateringstokens roteres, men det gamle kasseres ikke med det samme. Hvis en klient aldrig modtager svaret på fornyelsen (for eksempel et TV, der mistede strøm eller Wi-Fi midt i anmodningen), kan den forsøge igen med det forrige `refresh_token` i op til **7 dage**. Forsøget lykkes kun, så længe erstatningstokenet ikke er blevet brugt endnu. Det ubrugte erstatningstoken fjernes derefter, og der udstedes et nyt par. Når erstatningstokenet selv er blevet fornyet, returnerer det gamle token `invalid_grant`. Hvis en forbindelse tilbagekaldes, tilbagekaldes også de roterede tokens, der stadig er i denne karensperiode. Listen over forbundne apps viser hver forbindelse én gang.

## Token-format

Et adgangstoken er et JWT udstedt af B1 og identisk med det, en bruger får fra `POST /membership/users/login`. Det har samme modulbaserede tilladelsesclaim og samme `checkAccess`-adfærd i alle controllere. **Den eneste forskel** er, at tilladelsesarrayet er filtreret efter de tildelte scopes på udstedelsestidspunktet. Et scoped adgangstoken kan ikke gøre noget, som en tilsvarende scoped API-nøgle ikke kan. Der findes heller ingen særlig "OAuth-vej" i nogen controller. `actionWrapper` ved ikke, om indehaveren er en person, en API-nøgle eller en OAuth-klient.

## Forbundne apps (for brugeren)

Set fra en kirkeadministrators synspunkt er "Forbundne apps" listen over apps, som har fået adgang til deres kirke. Hver række er et aktivt par af `(OAuthClient, OAuthToken)`.

I B1Admin viser **Indstillinger → Udvikler → Forbundne apps**:

- Klientens navn
- De scopes, administratoren godkendte
- Datoen for, hvornår adgangen blev givet
- En **Tilbagekald**-knap

| Metode og sti | Autentificering | Formål |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Listér kaldarens egne aktive forbindelser (sammenkædet med klientens navn og scopes) |
| `DELETE /membership/oauth/connections/:id` | JWT | Tilbagekald en forbindelse via dens OAuth-token-id. Tokenet holder op med at virke ved næste anmodning |

Listen udelader automatisk udløbne tokens.

## Scopes og samtykke

Scope-strengene er det samme katalog som for [API-nøgler](./api-keys.md#scopes). Bedste praksis for klienter:

- **Anmod om de snævreste scopes, der virker.** Kirker lægger mærke til det, hvis du beder om `donations:write`, når du kun har brug for at læse personer.
- **Brug et opdateringstoken og kortlivede adgangstokens.** Langlivede adgangstokens er sværere at tilbagekalde hurtigt.
- **Vis altid de tildelte scopes til brugeren** i din egen brugerflade, så de kan kontrollere, hvad de har godkendt.

## Administration af OAuth-klienter

OAuth-klienter (selve tredjepartsapps) registreres globalt. En fortrolig klient med `client_secret` oprettes af en B1-serveradministrator. Hvis du vil udgive en, skal du kontakte ChurchApps-teamet for at få et par `client_id` og `client_secret` og registrere dine redirect-URI'er. Offentlige klienter, såsom MCP-connectors, kan registrere sig selv (se nedenfor).

Registrerede redirect-URI'er skal præcis matche `redirect_uri` i anmodningen. Et præfiks eller en delvis match afvises.

| Metode og sti | Tilladelse | Beskrivelse |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Listér alle OAuth-klienter |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Hent en klient via dens offentlige id (hemmeligheden skjules) |
| `POST /membership/oauth/clients` | Server.Admin | Opret eller opdatér en klient |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Slet en klient |

### Dynamisk klientregistrering

`POST /membership/oauth/register` (offentlig, RFC 7591) gør det muligt for en klient, f.eks. claude.ai's MCP-connector, at registrere sig selv. Det annonceres i API'ets `/.well-known/oauth-authorization-server`-dokument. Se [MCP-server → OAuth-opdagelse](./mcp.md#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Svaret er 201 med `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) og `token_endpoint_auth_method: "none"`.

- Der udstedes aldrig en hemmelighed, så klienten skal bruge PKCE ved hver godkendelse.
- `redirect_uris` skal være 1–10 `https`-URL'er, eller `http` på `localhost`, `127.0.0.1` eller `[::1]`.
- `client_name` afkortes til 45 tegn (standard "AI assistant").
- Begrænset til 20 registreringer i timen pr. IP-adresse.

På B1Admins samtykkeside får en selvregistreret klient en besked om, at den har registreret sig selv. Den kan aldrig gøre mere, end brugerens egen B1-konto kan, og den kan afbrydes under **Indstillinger → Udvikler → Forbundne apps**.

## SDK-understøttelse

Pakken `@churchapps/integration-sdk` indpakker hvert OAuth-flow med typede hjælpefunktioner: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` og `.awaitDeviceToken()`. Se pakkens README og [Webhooks](./webhooks.md#sdk-support) for et eksempel fra start til slut.
