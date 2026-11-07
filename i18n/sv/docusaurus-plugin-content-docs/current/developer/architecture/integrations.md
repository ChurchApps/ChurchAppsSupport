---
title: "Integrations- och tilläggsyta"
description: "Karta över alla sätt att ansluta till ChurchApps B1: REST API, API-nycklar, OAuth, webhooks, MCP och innehållsleverantörer, med länkar till varje referens."
---

# Integrations- och tilläggsyta

<div class="article-intro">

Allt som en tredje part kan koppla in sig till går genom ett API och en auktoriseringsmodell. Den här sidan är kartan: den namnger varje integrationsyta, visar hur de hänger ihop och länkar till den detaljerade referensen för var och en. Om du bygger mot B1 är det här du ska börja för att välja rätt ingång och sedan följa länken till sidan som beskriver den på djupet.

</div>

## Ytorna i korthet

Det finns sex sätt in eller ut, och alla delar samma autentiseringslager:

- **[REST API](../api/api-keys.md)** — hela produktytan, som kan anropas med en bearer-token från vilket språk som helst.
- **[API-nycklar](../api/api-keys.md)** — den enklaste autentiseringsuppgiften: en `cak_…`-token kopplad till en person i en församling.
- **[OAuth 2.0 & anslutna appar](../api/connected-apps.md)** — godkännande per församling för appar med flera kunder; utfärdar samma JWT som en användare får.
- **[Webhooks](../api/webhooks.md)** — signerade, hållbart levererade utgående händelser.
- **[MCP-server](../api/mcp.md)** — ett AI-anpassat omslag runt REST API:t på `/mcp`.
- **[Innehållsleverantörer](../freeplay-content-provider.md)** — den inkommande vägen för externa mediebibliotek till FreePlay och B1-apparna.

Allt utom innehållsleverantörer levereras av ett enda monolitiskt API (repositoryt [Api](https://github.com/ChurchApps/Api)) vars moduler monteras under stabila basvägar — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` och `/mcp`.

## Så hänger det ihop

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Tredjepartsapp      │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   Externa innehållskällor (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / enhetsflöde / ingen   ──  B1 är OAuth-*klienten* här  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1-appar        (inkommande innehållsväg)
```

Tre pilar berättar hela historien: en tredje part **anropar in** med en bearer-token (API-nyckel eller OAuth-JWT, även via `/mcp`); API:t **anropar tillbaka** via signerade webhooks; och innehållsleverantörer är den enda **inkommande innehålls**vägen, där B1 självt är OAuth-*klienten* som hämtar media från en extern källa.

## Den delade autentiseringsmodellen

Varje autentiseringsuppgift — en användares inloggnings-JWT, en OAuth-åtkomsttoken eller en API-nyckel — löses upp till **samma `Principal`** och kontrolleras på samma sätt. Det finns ingen separat "integrationsautentisering"; en avgränsad autentiseringsuppgift är helt enkelt oskiljbar från en användare med lägre behörighet.

### JWT-struktur

B1:s åtkomsttokens är HS256-JWT:er som utfärdas i `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Claim-uppsättningen:

| Claim | Betydelse |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Personen bakom token |
| `churchId` | Den enda församling den här token agerar inom — ankaret för all dataavgränsning |
| `personId` | Personposten inom den församlingen |
| `permissions` | Platt array av RBAC-behörighetssträngar (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppmedlemskap / gruppledarskap, för gruppbaserade kontroller |
| `membershipStatus` | Gäst eller medlem, för spärrar i självbetjäning |

En OAuth-åtkomsttoken har exakt samma form som en inloggnings-JWT — den enda skillnaden är att dess `permissions`-array **filtrerades genom de beviljade scopes innan signering** (`getCombinedApiJwt(...)`).

### Avgränsning per församling

`churchId` är en token-claim, inte en förfrågningsparameter, så en autentiseringsuppgift kan aldrig nå över församlingar. Varje repository-fråga filtrerar på anropande användares `churchId`; en API-nyckel eller OAuth-token är bunden till exakt en församling när den skapas.

### Rollbaserade behörigheter vid gränsen

Controllers grindar åtgärder med `au.checkAccess(contentType, action)` mot tokenens `permissions`-array. Scopes är ett **filter, aldrig ett bidrag** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` kopplar varje scope (t.ex. `people:read`, `donations:write`) till de RBAC-par det tillåter, och `filterPermissionsByScopes()` skär detta med personens *aktuella* behörigheter vid varje uppslag. Konsekvenserna:

- Att återkalla en behörighet i B1Admin stänger credentialens åtkomst vid nästa förfrågan — tokens glider aldrig isär från rollen.
- Ett scope kan bara *ta bort* behörigheter, så en avgränsad autentiseringsuppgift kan aldrig höja sig till server- eller domänadministration (de behörigheterna är avsiktligt inte kopplade till något scope).
- API-nycklar bär prefixet `cak_`; `CustomAuthProvider.getUser()` förgrenar på det, hashar hemligheten och löser om ägarens aktuella RBAC vid varje anrop.

Se [API-nycklar → Scopes](../api/api-keys.md#scopes) för hela katalogen.

## Ytreferens

### REST API

Den kompletta produktytan. Varje autentiserad endpoint accepterar antingen en JWT eller en `cak_…`-API-nyckel i headern `Authorization: Bearer` — det finns ingen separat tabell med rutter enbart för nycklar eller enbart för OAuth. Moduler och deras basvägar finns under `Api/src/modules/*`.

### API-nycklar

Ett personligt åtkomsttoken i formatet `cak_<prefix>.<secret>`, skapat under **B1Admin → Settings → Developer → API Keys**. Endast en SHA-256-hash lagras; den råa nyckeln visas en gång. Hanteras på `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Bäst för en enskild församlings egna skript och för kopplingar som Zapier, Make och Google Sheets. → **[API-nycklar](../api/api-keys.md)**

### OAuth 2.0 & anslutna appar

För appar med flera klienter som behöver att varje församling godkänner. Implementerat i `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. Servern stöder tre grant-typer:

- **Authorization Code** — `POST /oauth/authorize` (autentiserad) returnerar en kortlivad kod; `POST /oauth/token` med `grant_type=authorization_code` byter den mot en åtkomst-JWT (≈ 7 dagar) plus en refresh-token (≈ 90 dagar). Publika klienter utan hemlighet måste använda PKCE (endast `S256`): en `code_challenge` vid authorize och motsvarande `code_verifier` vid tokenutbytet.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` utfärdar en `user_code`; användaren godkänner den i B1Admin (`/oauth/device/approve`); enheten frågar `/oauth/token` med device-code-grant. För TV-apparater, kiosker och CLI-verktyg utan webbläsare.
- **Refresh Token** — `grant_type=refresh_token` utfärdar en ny åtkomsttoken; publika klienter utan hemlighet kan utelämna hemligheten.

Publika klienter kan också registrera sig själva med `POST /oauth/register` (RFC 7591 dynamisk klientregistrering); de får ett `client_id` och ingen hemlighet, och deras omdirigerings-URI:er måste vara `https` eller loopback.

En **ansluten app** är församlingsadministratörens vy av en beviljad token, listad och återkallbar under `/membership/oauth/connections`. Controllern är även värd för en OAuth-**relay-session**-brygga (`/oauth/relay/*`) som gör det möjligt för en enhet utan webbläsare att slutföra en inloggning mot en *extern* leverantör. → **[Anslutna appar & OAuth](../api/connected-apps.md)**

### Webhooks

Den enda utgående ytan. En församling prenumererar en publik HTTPS-endpoint på händelser; när en matchande ändring sker berikar `WebhookDispatcher.emit(churchId, event, payload)` payloads som bara innehåller id med visningsnamn (`personName`, `groupName`, `formName` — uppslagen körs först när en prenumeration matchar), registrerar en leverans, och en bakgrundsworker POST:ar en signerad JSON-envelope med återförsök med backoff och omleverans. Motorn finns i `Api/src/shared/webhooks/`, med CRUD per församling under `/membership/webhooks` (`WebhookController.ts`). Ett fält `connectorType` formar om innehållet för Slack och Discord; `mailchimp`-kopplingen går längre och äger hela HTTP-utbytet (metod/URL/autentisering per händelse mot Mailchimps API, med krypterade uppgifter i `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks.md)**

### MCP-server

Ett AI-anpassat omslag på `/mcp` (`Api/src/modules/mcp/`). Tre generiska verktyg — `list_endpoints`, `describe_endpoint` och `api_call` — exponerar hela REST-ytan dynamiskt för vilken MCP-klient som helst. Autentiseringen är samma bearer-token som allt annat. För klienter som loggar in med OAuth (claude.ai-anpassade kopplingar) bär ett 401-svar från `/mcp` en header `WWW-Authenticate` som pekar på `/.well-known/oauth-protected-resource`, och `/.well-known/oauth-authorization-server` annonserar endpoints under `/membership/oauth`, dynamisk registrering, PKCE och B1Admins samtyckessida under `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` återgår in i Express-stacken i samma process, så alla behörighets- och församlingsavgränsningsregler gäller fortfarande. → **[MCP-server](../api/mcp.md)**

### Innehållsleverantörer

Den inkommande innehållsvägen, i det separata paketet `Packages/content-providers` (`@churchapps/content-providers`) snarare än i API:t. Varje leverantör implementerar gränssnittet `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` samt autentiseringshakar — och registrerar sig själv i ett `Map`-register (`src/providers/registry.ts`). Här är **B1 OAuth-klienten**: en leverantör deklarerar en `AuthType` av `none`, `oauth_pkce`, `device_flow` eller `form_login`, och de delade hjälpfunktionerna (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) kör PKCE- eller enhetsflödet på klientsidan mot den externa källan. Elva leverantörer levereras idag — bland annat Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church och B1.church — och matar FreePlay och B1-apparna. → **[FreePlay-innehållsleverantör](../freeplay-content-provider.md)**

**Årsplaner** går via den här vägen. En läroplansutgivare (med `lessons.edit`) underhåller ordnade sekvenser för vecka 1/2/3 i Lessons.church-administrationen (`LessonsApi`-tabellerna `yearPlans` och `yearPlanWeeks`, med valfri `startMonth` och per vecka en `anchor` av `easter` eller `christmas`). `GET /yearPlans/public` på LessonsApi serverar publicerade planer anonymt och fyller i varje veckas program/studie/plats från lektionsträdet. B1Admins **Serving → Plans → Schedule Lesson → Apply Year Plan** använder den endpointen och skriver en DoingApi-plan per inkluderad vecka (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Planer med `startMonth` placerar förankrade veckor mot det valda året (påsk enligt gregoriansk påskberäkning (computus), jul som söndagen på eller närmast före 25 dec) och fyller perioderna mellan dem; planer utan `startMonth` mappar fortfarande vecka N till `startDate + (N−1)×7` dagar. Veckor från externa OLF-leverantörer eller med en ofullständig sökväg hoppas över vid tillämpningen; församlingar redigerar de resulterande planerna precis som vilka andra planer som helst, och FreePlay spelar upp det som finns på planen.

## Sammanfattning

| Yta | Autentiseringsmekanism | Riktning | Var implementerat | Referens |
|---|---|---|---|---|
| REST API | `Bearer` JWT eller `cak_…`-nyckel | Inkommande | `Api/src/modules/*` | [API-nycklar](../api/api-keys.md) |
| API-nycklar | SHA-256-hashad `cak_`-token | Autentiseringsuppgift | `Api/.../membership/controllers/ApiKeyController.ts` | [API-nycklar](../api/api-keys.md) |
| OAuth 2.0 / anslutna appar | Auth-kod (PKCE) · enhet · refresh → JWT; dynamisk klientregistrering | Inkommande | `Api/.../membership/controllers/OAuthController.ts` | [Anslutna appar](../api/connected-apps.md) |
| Webhooks | Hemlighet per hook, HMAC-SHA256-signatur | Utgående | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks.md) |
| MCP-server | `Bearer` JWT, OAuth-JWT (upptäckt via `/.well-known`), eller `cak_…`-nyckel | Inkommande (AI) | `Api/src/modules/mcp/` | [MCP-server](../api/mcp.md) |
| Innehållsleverantörer | Per leverantör: ingen / OAuth PKCE / enhet / formulär | Inkommande innehåll | `Packages/content-providers/` | [Innehållsleverantör](../freeplay-content-provider.md) |

## Färdiga kopplingar

I stället för att alla bygger från grunden levererar ChurchApps kopplingar ovanpå ytorna ovan:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — en webhook-`connectorType` formar om den vanliga envelopen till ett chattmeddelande; konfigureras helt i B1Admin, inget konto hos tredje part behövs.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — en `mailchimp`-connectorType som synkar personer till en Mailchimp-målgrupp och mappar grupp- och listmedlemskap till taggar (`Api/src/shared/webhooks/MailchimpConnector.ts`). Till skillnad från chattkopplingarna gör den egna autentiserade förfrågningar per händelse (upsert/arkivera/tagga) i stället för att POST:a till en URL som församlingen anger; API-nyckeln och målgruppens id lagras krypterade i `webhooks.connectorConfig`. Envägs, endast standardfälten för sammanslagning.
- **[Zapier](/docs/b1-admin/integrations/zapier)** och **[Make](/docs/b1-admin/integrations/make)** — utlöses av webhook-händelser och agerar via REST API:t; de registrerar sin egen webhook när en Zap eller ett scenario aktiveras (kräver en nyckel med `settings:write`). Zapier-appens källkod finns i repositoryt `Integrations` under `zapier/` (Zapier CLI, driftsätts med `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — ett tillägg som autentiserar med API-nyckel och exporterar Personer / Gåvor / Grupper / Närvaro på begäran.
- **[Claude](/docs/b1-admin/integrations/claude)** och **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP-klienter som pekar på `/mcp`.

För din egen kod omsluter **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) allt detta: en typad REST-klient, en OAuth-klient (auth-kod / refresh / enhetsflöde) och en HMAC-verifierare för webhooks med Express-middleware.

## Relaterade sidor

- [API-nycklar](../api/api-keys.md) — den enklaste autentiseringsuppgiften och scope-katalogen
- [Anslutna appar & OAuth](../api/connected-apps.md) — samtyckesflöden för appar med flera klienter
- [Webhooks](../api/webhooks.md) — systemet för utgående händelser
- [MCP-server](../api/mcp.md) — AI-integrationens omslag
- [FreePlay-innehållsleverantör](../freeplay-content-provider.md) — att bli en inkommande innehållskälla
- [Integrationer (slutanvändare)](/docs/b1-admin/integrations/) — installationsguider för färdiga kopplingar
