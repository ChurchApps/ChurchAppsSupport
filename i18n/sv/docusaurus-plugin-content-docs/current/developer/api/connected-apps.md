---
title: "Anslutna appar och OAuth"
description: "Anslut tredjepartsappar till en församlings B1-data med OAuth 2.0-samtycke, utan delade lösenord eller API-nycklar, och återkalla åtkomst när som helst i B1 Admin-inställningarna."
---

# Anslutna appar och OAuth

<div class="article-intro">

B1 API:et stöder OAuth 2.0, så att en tredjepartsapp kan be varje kyrkadministratör om tillstånd att komma åt deras data, utan att kyrkan någonsin behöver dela ett lösenord eller en API-nyckel. En **ansluten app** är en OAuth-token som en kyrkadministratör har godkänt. Om man återkallar den bryts tredjepartsappens åtkomst med ett klick. Använd den här vägen för multi-tenant SaaS-kopplingar. För en integration med en enskild kyrka rekommenderas i stället [API-nycklar](./api-keys.md).

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- En OAuth-**klient** måste vara registrerad innan kyrkor kan ge den åtkomst, antingen av en B1-serveradministratör eller av klienten själv via [dynamisk registrering](#dynamic-client-registration)
- Alla OAuth-endpoints finns under modulen Membership: `/membership/oauth/...`
- Åtkomsttokens är JWT:er. De innehåller användarens behörigheter, filtrerade efter de beviljade scopes

</div>

## Begrepp

| Begrepp | Betydelse |
|---|---|
| **OAuth-klient** | Tredjepartsappen själv. Identifieras med `client_id` och skyddas med `client_secret`. Registreras en gång hos B1 och delas mellan alla kyrkor som installerar den. |
| **Ansluten app** | Ett specifikt par `(klient, kyrkadministratör)` där administratören har gett klienten åtkomst. Varje ansluten app stöds av en OAuth-uppdateringstoken. |
| **Åtkomsttoken** | En kortlivad JWT (≈ 7 dagar) som klienten använder för API-anrop. Samma form som en användar-JWT: `Authorization: Bearer <jwt>`. |
| **Uppdateringstoken** | En långlivad ogenomskinlig sträng (≈ 90 dagar) som klienten använder för att skapa nya åtkomsttokens. |
| **Scope** | Begränsar vad åtkomsttoken kan göra. Se [scope-katalogen](./api-keys.md#scopes). |

## Grant-flöden

B1 stöder tre OAuth-flöden, alla definierade av RFC 6749 och RFC 8628.

### Authorization Code (webbappar)

Används när din app har en serverdel och kan hålla `client_secret` privat.

1. **Auktorisera**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Publika klienter (utan `client_secret`) måste dessutom skicka `"code_challenge": "..."` och `"code_challenge_method": "S256"` (PKCE, RFC 7636). Endast `S256` accepteras.

   Returnerar `{ "code": "...", "state": "xyz" }`. Endpointen för authorization code är medvetet en autentiserad POST. Din app hämtar användarens B1-JWT (vanligtvis genom att visa en knapp i användarens B1-session) och skickar den vidare som en del av samtyckessteget.

2. **Byt kod mot tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Om auktoriseringssteget skickade en `code_challenge` ska du inkludera motsvarande `"code_verifier": "..."`. En publik klient skickar verifieraren och utelämnar `client_secret`. Token-endpointen accepterar JSON- eller formulärkodade (`application/x-www-form-urlencoded`) bodies.

   Returnerar tokensvaret:

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

3. **Uppdatera** när åtkomsttoken snart går ut:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Uppdateringstoken löper ut efter 90 dagars oanvändning. Om den har gått ut måste kyrkadministratören auktorisera på nytt.

### Device Code (TV-skärmar, kiosker, CLI)

Används när enheten saknar webbläsare. Definieras av RFC 8628.

1. **Begär en device code**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Returnerar koden som visas för användaren och pollingintervallet:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Visa `user_code` och `verification_uri` för användaren.

3. **Polla** `/membership/oauth/token` med `grant_type=urn:ietf:params:oauth:grant-type:device_code` och `device_code`. Standardsvar:

   | Fel | Betydelse |
   |---|---|
   | `authorization_pending` | Användaren har inte godkänt ännu. Fortsätt polla med det föreslagna intervallet. |
   | `expired_token` | Device code har passerat `expires_in`. Börja om. |
   | `access_denied` | Användaren nekade begäran. |
   | _(inget, 200 OK)_ | Godkänd. Innehållet är ett `B1TokenResponse`. |

4. När den är godkänd sparar du `refresh_token` och använder `access_token` tills den går ut.

B1 SDK:t innehåller `B1OAuthClient.awaitDeviceToken(...)`, som kör pollingloopen åt dig med RFC-kompatibel backoff.

### Uppdateringstoken

Alltid tillgänglig som en fristående begäran när du har en `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Nya `access_token` och `refresh_token` returneras. **Publika klienter** (utan `client_secret`) kan utelämna `client_secret` vid uppdatering. Det är användbart för mobil- och skrivbordsappar som inte kan hålla en hemlighet.

Uppdateringstokens roteras, men den gamla kasseras inte direkt. Om en klient aldrig tar emot uppdateringssvaret (till exempel en TV som tappade ström eller Wi-Fi mitt i begäran) kan den försöka igen med föregående `refresh_token` i upp till **7 dagar**. Återförsöket lyckas bara så länge ersättningstokenen inte har använts. Den oanvända ersättningen tas då bort och ett nytt par utfärdas. När ersättningen i sin tur har uppdaterats ger den gamla tokenen `invalid_grant`. Att återkalla en anslutning återkallar också alla roterade tokens som fortfarande finns i det tidsfönstret, och listan över anslutna appar visar varje anslutning en gång.

## Tokenform

En åtkomsttoken är en B1-utfärdad JWT, identisk med den en användare får från `POST /membership/users/login`. Den har samma modulbaserade behörighetsanspråk och samma `checkAccess`-beteende i varje controller. **Skillnaden** är att behörighetsarrayen har filtrerats genom de beviljade scopes när tokenen skapades. En scopad åtkomsttoken kan inte göra något som en lika scopad API-nyckel inte kan, och det finns ingen separat "OAuth-väg" i någon controller. `actionWrapper` vet inte om innehavaren är en person, en API-nyckel eller en OAuth-klient.

## Anslutna appar (för användare)

Ur en kyrkadministratörs perspektiv är "Anslutna appar" listan över appar som har fått åtkomst till deras kyrka. Varje rad är ett aktivt par `(OAuthClient, OAuthToken)`.

I B1Admin visar **Inställningar → Utvecklare → Anslutna appar**:

- Klientens namn
- De scopes administratören godkände
- Datumet när åtkomsten beviljades
- En knapp **Återkalla**

| Metod och sökväg | Autentisering | Syfte |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Lista anropandes egna aktiva anslutningar (med klientens namn och scopes) |
| `DELETE /membership/oauth/connections/:id` | JWT | Återkalla en anslutning med dess OAuth-token-id. Tokenen slutar fungera vid nästa begäran. |

Listan exkluderar automatiskt utgångna tokens.

## Scopes och samtycke

Scope-strängarna är samma katalog som [API-nycklar](./api-keys.md#scopes). Bästa praxis för klienter:

- **Begär de snävaste scopes som fungerar.** Kyrkor märker det om du ber om `donations:write` när du bara behöver läsa personer.
- **Använd en uppdateringstoken tillsammans med kortlivade åtkomsttokens.** Långlivade åtkomsttokens är svårare att återkalla snabbt.
- **Visa alltid de beviljade scopes för användaren** i ditt eget gränssnitt, så att de kan kontrollera vad de har godkänt.

## Hantering av OAuth-klienter

OAuth-klienter (tredjepartsapparna själva) registreras globalt. En konfidentiell klient med `client_secret` skapas av en B1-serveradministratör. För att få en sådan, kontakta ChurchApps-teamet för ett par `client_id` och `client_secret` och registrera dina redirect-URI:er. Publika klienter, till exempel MCP-kopplingar, kan registrera sig själva (se nedan).

Registrerade redirect-URI:er måste exakt matcha `redirect_uri` i begäran. En prefix- eller delmatchning avvisas.

| Metod och sökväg | Behörighet | Beskrivning |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Lista alla OAuth-klienter |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Hämta en klient med dess publika id (hemligheten är dold) |
| `POST /membership/oauth/clients` | Server.Admin | Skapa eller uppdatera en klient |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Ta bort en klient |

### Dynamisk klientregistrering

`POST /membership/oauth/register` (publik, RFC 7591) låter en klient, till exempel claude.ai:s MCP-koppling, registrera sig själv. Den annonseras i API:ets dokument `/.well-known/oauth-authorization-server`. Se [MCP-server → OAuth-discovery](./mcp.md#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Returnerar 201 med `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) och `token_endpoint_auth_method: "none"`.

- Ingen hemlighet utfärdas, så klienten måste använda PKCE vid varje auktorisering.
- `redirect_uris` måste vara 1–10 `https`-URL:er, eller `http` på `localhost`, `127.0.0.1` eller `[::1]`.
- `client_name` trimmas till 45 tecken (standardvärdet är "AI assistant").
- Begränsat till 20 registreringar per timme och IP-adress.

På samtyckessidan i B1Admin får en självregistrerad klient en notis om att den har registrerat sig själv. Den meddelar också att den aldrig kan göra mer än användarens egna B1-konto och att den kan kopplas bort under **Inställningar → Utvecklare → Anslutna appar**.

## SDK-stöd

Paketet `@churchapps/integration-sdk` omsluter varje OAuth-flöde med typade hjälpfunktioner: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` och `.awaitDeviceToken()`. Se paketets README och [Webhooks](./webhooks.md#sdk-support) för ett komplett exempel.
