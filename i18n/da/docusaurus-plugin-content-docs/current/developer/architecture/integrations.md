---
title: "Integrations- og udvidelsesflade"
description: "Oversigt over alle måder at forbinde til ChurchApps B1: REST API, API-nøgler, OAuth, webhooks, MCP og indholdsudbydere, med links til hver reference."
---

# Integrations- og udvidelsesflade

<div class="article-intro">

Alt, hvad en tredjepart kan koble sig på, kører gennem én API og én autorisationsmodel. Denne side er kortet: den navngiver hver integrationsflade, viser hvordan de hænger sammen, og linker til den detaljerede reference for hver enkelt. Hvis du bygger mod B1, så start her for at vælge den rigtige indgang, og følg derefter linket til siden, der dokumenterer den i dybden.

</div>

## Fladerne i overblik

Der er seks måder ind og ud, og de deler alle det samme autorisationslag:

- **[REST API](../api/api-keys.md)** — hele produktfladen, som kan kaldes med et bearer-token fra ethvert sprog.
- **[API-nøgler](../api/api-keys.md)** — den enkleste legitimation: et `cak_…`-token knyttet til én person i én kirke.
- **[OAuth 2.0 og Connected Apps](../api/connected-apps.md)** — samtykke pr. kirke for multi-tenant-apps; udsteder den samme JWT, som en bruger får.
- **[Webhooks](../api/webhooks.md)** — signerede, holdbart leverede udgående hændelser.
- **[MCP-server](../api/mcp.md)** — et AI-orienteret lag oven på REST API'et på `/mcp`.
- **[Indholdsudbydere](../freeplay-content-provider.md)** — den indgående vej for eksterne mediebiblioteker ind i FreePlay og B1-apps.

Alt undtagen indholdsudbydere serveres af en enkelt monolitisk API (repositoriet [Api](https://github.com/ChurchApps/Api)), hvis moduler monteres under faste basisstier — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` og `/mcp`.

## Sådan hænger det sammen

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
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

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Tre pile fortæller hele historien: en tredjepart **kalder ind** med et bearer-token (API-nøgle eller OAuth-JWT, herunder via `/mcp`); API'et **kalder tilbage** gennem signerede webhooks; og indholdsudbydere er den ene **indgående indholds**vej, hvor B1 selv er OAuth-*klienten*, der henter medier fra en ekstern kilde.

## Den fælles autorisationsmodel

Alle former for legitimation — en brugers login-JWT, et OAuth-adgangstoken eller en API-nøgle — bliver løst til den **samme `Principal`** og kontrolleret på samme måde. Der findes ingen særskilt "integrationsautorisation"; en legitimation med begrænsede scopes kan simpelthen ikke skelnes fra en bruger med lavere rettigheder.

### JWT-struktur

B1-adgangstokens er HS256-JWT'er, der udstedes i `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Claim-sættet:

| Claim | Betydning |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Personen bag tokenet |
| `churchId` | Den ene kirke, tokenet handler inden for — ankeret for al dataafgrænsning |
| `personId` | Personposten inden for den kirke |
| `permissions` | Flat liste af RBAC-tilladelsesstrenge (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppemedlemskab/-lederskab, til gruppebaserede kontroller |
| `membershipStatus` | Gæst vs. medlem, til gating af selvbetjening |

Et OAuth-adgangstoken har nøjagtig samme form som et login-JWT — den eneste forskel er, at dets `permissions`-liste blev **filtreret gennem de tildelte scopes, før det blev signeret** (`getCombinedApiJwt(...)`).

### Afgrænsning pr. kirke

`churchId` er en token-claim, ikke en request-parameter, så en legitimation kan aldrig nå på tværs af kirker. Hver repository-forespørgsel filtrerer på kaldərens `churchId`; en API-nøgle eller et OAuth-token er knyttet til præcis én kirke på udstedelsestidspunktet.

### Rollebaserede rettigheder ved grænsefladen

Controllere styrer handlinger med `au.checkAccess(contentType, action)` mod tokenets `permissions`-liste. Scopes er et **filter, aldrig en tildeling** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` knytter hvert scope (f.eks. `people:read`, `donations:write`) til de RBAC-par, det tillader, og `filterPermissionsByScopes()` skærer det med personens *aktuelle* rettigheder ved hver opslag. Konsekvenserne er:

- Hvis man fjerner en rettighed i B1Admin, mister legitimationen adgang ved næste forespørgsel — tokens kommer aldrig ud af trit med rollen.
- Et scope kan kun ever *fjerne* rettigheder, så en legitimation med scopes kan aldrig opnå server- eller domæneadministration (de rettigheder er bevidst ikke knyttet til noget scope).
- API-nøgler har præfikset `cak_`; `CustomAuthProvider.getUser()` forgrener på det, hasher hemmeligheden og slår den ejende persons aktuelle RBAC op igen ved hvert kald.

Se [API-nøgler → Scopes](../api/api-keys.md#scopes) for hele katalogget.

## Fladereference

### REST API

Den komplette produktflade. Ethvert autentificeret endpoint accepterer enten en JWT eller en `cak_…`-API-nøgle i headeren `Authorization: Bearer` — der findes ingen separat rutetabel kun for nøgler eller kun for OAuth. Moduler og deres basisstier ligger under `Api/src/modules/*`.

### API-nøgler

Et personligt adgangstoken i formatet `cak_<prefix>.<secret>`, oprettet under **B1Admin → Indstillinger → Udvikler → API-nøgler**. Kun en SHA-256-hash gemmes; den rå nøgle vises én gang. Administreres på `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Bedst til en enkelt kirkes egne scripts og til connectors som Zapier, Make og Google Sheets. → **[API-nøgler](../api/api-keys.md)**

### OAuth 2.0 og Connected Apps

Til multi-tenant-apps, der kræver, at hver kirke giver samtykke. Implementeret i `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. Serveren understøtter tre grant-typer:

- **Authorization Code** — `POST /oauth/authorize` (autentificeret) returnerer en kortlivet kode; `POST /oauth/token` med `grant_type=authorization_code` veksler den til et adgangs-JWT (≈ 7 dage) samt et refresh-token (≈ 90 dage). Offentlige klienter uden hemmelighed skal bruge PKCE (kun `S256`): en `code_challenge` ved authorize og den tilsvarende `code_verifier` ved token-vekslingen.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` udsteder en `user_code`; brugeren godkender den i B1Admin (`/oauth/device/approve`); enheden poller `/oauth/token` med device-code-grant'en. Til tv'er, kiosker og CLI'er uden browser.
- **Refresh Token** — `grant_type=refresh_token` udsteder et nyt adgangstoken; offentlige klienter uden hemmelighed må udelade den.

Offentlige klienter kan også registrere sig selv via `POST /oauth/register` (RFC 7591 dynamisk klientregistrering); de får et `client_id` uden hemmelighed, og deres redirect-URI'er skal være `https` eller loopback.

En **Connected App** er kirkeadministratorens visning af et givet token, som kan ses og tilbagekaldes under `/membership/oauth/connections`. Controlleren huser også en OAuth **relay-session**-bro (`/oauth/relay/*`), der gør det muligt for en enhed uden browser at fuldføre login hos en *ekstern* udbyder. → **[Connected Apps og OAuth](../api/connected-apps.md)**

### Webhooks

Den eneste udgående flade. En kirke abonnerer et offentligt HTTPS-endpoint på hændelser; når en matchende ændring sker, beriger `WebhookDispatcher.emit(churchId, event, payload)' payloads, der kun indeholder id'er, med visningsnavne (`personName`, `groupName`, `formName` — opslag kører først, når et abonnement matcher), registrerer en levering, og en baggrundsworker sender et signeret JSON-envelope med retry/backoff og genlevering. Motoren ligger i `Api/src/shared/webhooks/`, og CRUD pr. kirke ligger under `/membership/webhooks` (`WebhookController.ts`). Et `connectorType`-felt omformer body'en til Slack / Discord; `mailchimp`-connectoren går længere og ejer hele HTTP-udvekslingen (metode/URL/autentificering pr. hændelse mod Mailchimps API, med krypterede legitimationsoplysninger i `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks.md)**

### MCP-server

Et AI-orienteret lag på `/mcp` (`Api/src/modules/mcp/`). Tre generiske værktøjer — `list_endpoints`, `describe_endpoint` og `api_call` — eksponerer hele REST-fladen dynamisk til enhver MCP-klient. Autentificering er det samme bearer-token som alt andet. For klienter, der logger ind med OAuth (claude.ai custom connectors), indeholder et 401-svar fra `/mcp` en `WWW-Authenticate`-header, der peger på `/.well-known/oauth-protected-resource`, og `/.well-known/oauth-authorization-server` annoncerer `/membership/oauth`-endpoints, dynamisk registrering, PKCE og B1Admins samtykkeside under `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` går ind i Express-stakken igen in-process, så alle regler for rettigheder og kirkeafgrænsning stadig gælder. → **[MCP-server](../api/mcp.md)**

### Indholdsudbydere

Den indgående indholdsvej, i den separate pakke `Packages/content-providers` (`@churchapps/content-providers`) og ikke i API'et. Hver udbyder implementerer `IProvider`-interfacet (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` samt autentificeringshooks — og registrerer sig selv i et `Map`-register (`src/providers/registry.ts`). Her er **B1 OAuth-klienten**: en udbyder deklarerer en `AuthType` på `none`, `oauth_pkce`, `device_flow` eller `form_login`, og de delte hjælpere (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) kører PKCE- eller device-flowet på klientsiden mod den eksterne kilde. Elleve udbydere leveres i dag — herunder Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church og B1.church — og de forsyner FreePlay og B1-apps. → **[FreePlay-indholdsudbyder](../freeplay-content-provider.md)**

**Årsplaner** kører på denne vej. En læseplansudgiver (med `lessons.edit`) vedligeholder ordnede sekvenser af uge 1/2/3 i Lessons.church-administrationen (LessonsApi-tabellerne `yearPlans` og `yearPlanWeeks` med valgfri `startMonth` og pr. uge et `anchor` af `easter` eller `christmas`). `GET /yearPlans/public` på LessonsApi serverer aktive planer anonymt og udfylder hver uges program/studie/sted fra læsetræet. B1Admin's **Serving → Planer → Planlæg lektion → Anvend årsplan** bruger det endpoint og skriver én DoingApi-plan pr. inkluderet uge (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Planer med `startMonth` løser forankrede uger i forhold til det valgte år (påske via gregoriansk computus, juleaften som søndagen på eller før 25. december) og udfylder perioderne imellem; planer uden `startMonth` knytter stadig uge N til `startDate + (N−1)×7` dage. Uger fra eksterne OLF-udbydere eller med en ufuldstændig sti springes over ved anvendelsen; kirker redigerer de resulterende planer som alle andre, og FreePlay afspiller det, der står på planen.

## Oversigt

| Flade | Autentificeringsmekanisme | Retning | Hvor implementeret | Reference |
|---|---|---|---|---|
| REST API | `Bearer` JWT eller `cak_…`-nøgle | Indgående | `Api/src/modules/*` | [API-nøgler](../api/api-keys.md) |
| API-nøgler | SHA-256-hashet `cak_`-token | Legitimation | `Api/.../membership/controllers/ApiKeyController.ts` | [API-nøgler](../api/api-keys.md) |
| OAuth 2.0 / Connected Apps | Auth code (PKCE) · device · refresh → JWT; dynamisk klientregistrering | Indgående | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps.md) |
| Webhooks | Hemmelighed pr. hook, HMAC-SHA256-signatur | Udgående | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks.md) |
| MCP-server | `Bearer` JWT, OAuth JWT (opdaget via `/.well-known`) eller `cak_…`-nøgle | Indgående (AI) | `Api/src/modules/mcp/` | [MCP-server](../api/mcp.md) |
| Indholdsudbydere | Pr. udbyder: ingen / OAuth PKCE / device / formular | Indgående indhold | `Packages/content-providers/` | [Indholdsudbyder](../freeplay-content-provider.md) |

## Færdige connectors

I stedet for at alle bygger fra bunden, leverer ChurchApps connectors oven på fladerne ovenfor:

- **[Slack og Discord](/docs/b1-admin/integrations/slack-discord)** — en webhook-`connectorType` omformer det standardiserede envelope til en chatbesked; konfigureres helt i B1Admin, uden tredjepartskonto.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — en `mailchimp`-connectorType, der synkroniserer personer til en Mailchimp-målgruppe og knytter gruppe-/listemedlemskab til tags (`Api/src/shared/webhooks/MailchimpConnector.ts`). I modsætning til chat-connectorerne sender den sine egne autentificerede forespørgsler pr. hændelse (upsert/arkiver/tag) i stedet for at POST'e til en URL, kirken har angivet; API-nøglen og målgruppe-id'et ligger krypteret i `webhooks.connectorConfig`. Énvejs, kun standardfletningsfelter.
- **[Zapier](/docs/b1-admin/integrations/zapier)** og **[Make](/docs/b1-admin/integrations/make)** — udløses af webhook-hændelser og handler via REST API'et; de registrerer selv en webhook, når en Zap/et scenarie aktiveres (kræver en nøgle med `settings:write`). Zapier-appens kildekode ligger i `Integrations`-repositoriet under `zapier/` (Zapier CLI, udrullet med `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — et tilvalg, der autentificeres med API-nøgle, og som eksporterer Personer / Donationer / Grupper / Fremmøde efter behov.
- **[Claude](/docs/b1-admin/integrations/claude)** og **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP-klienter rettet mod `/mcp`.

Til din egen kode indpakker **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) alt dette: en typet REST-klient, en OAuth-klient (auth-code / refresh / device flow) og en HMAC-webhookverifikator med Express-middleware.

## Relaterede sider

- [API-nøgler](../api/api-keys.md) — den enkleste legitimation og scope-kataloget
- [Connected Apps og OAuth](../api/connected-apps.md) — multi-tenant-samtykkeflows
- [Webhooks](../api/webhooks.md) — det udgående hændelsessystem
- [MCP-server](../api/mcp.md) — AI-integrationslaget
- [FreePlay-indholdsudbyder](../freeplay-content-provider.md) — sådan bliver man en indgående indholdskilde
- [Integrationer (slutbruger)](/docs/b1-admin/integrations/) — opsætningsguider til færdige connectors
