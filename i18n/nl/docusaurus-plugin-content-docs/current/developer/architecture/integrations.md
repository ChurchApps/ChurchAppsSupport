---
title: "Integratie- en uitbreidingsoppervlak"
---

# Integratie- en uitbreidingsoppervlak

<div class="article-intro">

Alles waarmee een derde partij kan koppelen, loopt via één API en één autorisatiemodel. Deze pagina is de kaart: ze benoemt elk integratieoppervlak, laat zien hoe ze samenhangen, en linkt naar de gedetailleerde referentie van elk oppervlak. Als je met B1 bouwt, begin hier om de juiste ingang te kiezen en volg dan de link naar de pagina die dat in detail beschrijft.

</div>

## Overzicht van de oppervlakken

Er zijn zes manieren om binnen of buiten te komen, en ze delen allemaal dezelfde authenticatielaag:

- **[REST API](../api/api-keys)** — het volledige productoppervlak, aan te roepen met een bearer-token vanuit elke taal.
- **[API-sleutels](../api/api-keys)** — de eenvoudigste credential: een `cak_…`-token gekoppeld aan één persoon in één kerk.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — toestemming per kerk voor multi-tenant apps; geeft dezelfde JWT uit die een gebruiker krijgt.
- **[Webhooks](../api/webhooks)** — ondertekende, duurzaam afgeleverde uitgaande gebeurtenissen.
- **[MCP-server](../api/mcp)** — een AI-gerichte wrapper rond de REST API op `/mcp`.
- **[Content providers](../freeplay-content-provider)** — het inkomende pad voor externe mediabibliotheken naar FreePlay en de B1-apps.

Alles behalve content providers wordt geleverd door één monolithische API (de [Api](https://github.com/ChurchApps/Api)-repository), waarvan de modules onder vaste basispaden zijn gemount: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` en `/mcp`.

## Hoe het samenwerkt

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  App van derden     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS    │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make    │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets    │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts    │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI-client (MCP)  │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API-modules: /membership /giving     │
             │        ondertekende JSON POST          │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (duurzaam, HMAC-SHA256 ondertekend) └───────────────────────────────────────┘

   Externe contentbronnen (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / geen   ──  B1 is hier de OAuth *client*  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1-apps        (inkomend contentpad)
```

Drie pijlen vertellen het hele verhaal: een derde partij **roept binnen** met een bearer-token (API-sleutel of OAuth-JWT, ook via `/mcp`); de API **roept terug** via ondertekende webhooks; en content providers vormen het enige **inkomende-content**-pad, waarbij B1 zelf de OAuth-*client* is die media ophaalt uit een externe bron.

## Het gedeelde autorisatiemodel

Elke credential — een login-JWT van een gebruiker, een OAuth-accesstoken of een API-sleutel — wordt omgezet naar **dezelfde `Principal`** en op dezelfde manier gecontroleerd. Er is geen apart pad voor "integratie-authenticatie"; een beperkte credential is simpelweg niet te onderscheiden van een gebruiker met lagere rechten.

### JWT-structuur

B1-accesstokens zijn HS256-JWT's die worden aangemaakt in `Api/src/modules/membership/auth/AuthenticatedUser.ts`. De claimset:

| Claim | Betekenis |
|---|---|
| `id`, `email`, `firstName`, `lastName` | De persoon achter het token |
| `churchId` | De enkele kerk waarbinnen dit token handelt — het anker voor alle gegevensscoping |
| `personId` | Het persoonsrecord binnen die kerk |
| `permissions` | Platte array van RBAC-permissiestrings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Groepslidmaatschap en -leiderschap, voor groepsgebonden controles |
| `membershipStatus` | Gast versus lid, voor de poortwachter van zelfbediening |

Een OAuth-accesstoken heeft exact dezelfde vorm als een login-JWT. Het enige verschil is dat de `permissions`-array vóór het ondertekenen is **gefilterd op de verleende scopes** (`getCombinedApiJwt(...)`).

### Scoping per kerk

`churchId` is een claim in het token, geen requestparameter, dus een credential kan nooit over kerken heen reiken. Elke repository-query filtert op de `churchId` van de aanroeper; een API-sleutel of OAuth-token is op het moment van aanmaken aan precies één kerk gebonden.

### Rolgebaseerde rechten aan de grens

Controllers beperken acties met `au.checkAccess(contentType, action)` tegen de `permissions`-array van het token. Scopes zijn een **filter, nooit een toekenning** (`Api/src/shared/auth/Scopes.ts`): de `SCOPE_CATALOG` koppelt elke scope (bijvoorbeeld `people:read`, `donations:write`) aan de RBAC-paren die hij toestaat, en `filterPermissionsByScopes()` snijdt dat met de *huidige* rechten van de persoon bij elke resolutie. Dat heeft de volgende gevolgen:

- Het intrekken van een recht in B1Admin beperkt de toegang van de credential bij het volgende verzoek — tokens lopen nooit uit de pas met de rol.
- Een scope kan rechten alleen *verwijderen*, dus een beperkte credential kan nooit uitgroeien tot server- of domeinbeheerder (die rechten zijn bewust niet aan een scope gekoppeld).
- API-sleutels hebben het voorvoegsel `cak_`; `CustomAuthProvider.getUser()` herkent dat, hasht het geheim en herberekent bij elke aanroep de actuele RBAC van de eigenaar.

Zie [API-sleutels → Scopes](../api/api-keys#scopes) voor de volledige catalogus.

## Referentie per oppervlak

### REST API

Het volledige productoppervlak. Elk geauthenticeerd eindpunt accepteert een JWT of een `cak_…`-API-sleutel in de `Authorization: Bearer`-header — er is geen aparte routetabel alleen voor sleutels of alleen voor OAuth. Modules en hun basispaden staan onder `Api/src/modules/*`.

### API-sleutels

Een persoonlijk toegangstoken `cak_<prefix>.<secret>`, aangemaakt in **B1Admin → Settings → Developer → API Keys**. Alleen een SHA-256-hash wordt opgeslagen; de ruwe sleutel wordt één keer getoond. Beheerd op `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Het best geschikt voor de eigen scripts van één kerk en voor connectors zoals Zapier, Make en Google Sheets. → **[API-sleutels](../api/api-keys)**

### OAuth 2.0 & Connected Apps

Voor multi-tenant apps die toestemming van elke kerk nodig hebben. Geïmplementeerd in `Api/src/modules/membership/controllers/OAuthController.ts` onder `/membership/oauth`. De server ondersteunt drie grants:

- **Authorization Code** — `POST /oauth/authorize` (geauthenticeerd) geeft een kortlevende code terug; `POST /oauth/token` met `grant_type=authorization_code` wisselt die in voor een toegangs-JWT (≈ 7 dagen) plus een refresh-token (≈ 90 dagen). Publieke (geheimloze) clients moeten PKCE gebruiken (alleen `S256`): een `code_challenge` bij autorisatie en de bijbehorende `code_verifier` bij het uitwisselen van de token.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` geeft een `user_code` uit; de gebruiker keurt die goed in B1Admin (`/oauth/device/approve`); het apparaat pollt `/oauth/token` met de device-code-grant. Bedoeld voor tv's, kiosken en CLI's zonder browser.
- **Refresh Token** — `grant_type=refresh_token` geeft een nieuw accesstoken uit; publieke (geheimloze) clients mogen het geheim weglaten.

Publieke clients kunnen zichzelf ook registreren met `POST /oauth/register` (RFC 7591 dynamische clientregistratie); ze krijgen een `client_id` zonder geheim, en hun redirect-URI's moeten `https` of loopback zijn.

Een **Connected App** is de weergave voor kerkbeheerders van een verleend token; die staat op `/membership/oauth/connections` en kan daar worden ingetrokken. De controller host ook een OAuth **relay-session**-brug (`/oauth/relay/*`) waarmee een apparaat zonder browser een aanmelding kan afronden bij een *externe* provider. → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

Het enige uitgaande oppervlak. Een kerk abonneert een openbaar HTTPS-eindpunt op gebeurtenissen; wanneer een overeenkomende wijziging plaatsvindt, verrijkt `WebhookDispatcher.emit(churchId, event, payload)` payloads met alleen-id's met weergavenamen (`personName`, `groupName`, `formName` — opzoekingen worden pas uitgevoerd zodra een abonnement overeenkomt), registreert een aflevering, en een achtergrondworker POST een ondertekende JSON-envelop met retry/backoff en opnieuw afleveren. Engine op `Api/src/shared/webhooks/`, CRUD per kerk onder `/membership/webhooks` (`WebhookController.ts`). Een `connectorType`-veld vormt de body om voor Slack / Discord; de `mailchimp`-connector gaat verder en beheert de volledige HTTP-uitwisseling zelf (method/URL/auth per gebeurtenis tegen de Mailchimp-API, credentials versleuteld in `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP-server

Een AI-gerichte wrapper op `/mcp` (`Api/src/modules/mcp/`). Drie generieke tools — `list_endpoints`, `describe_endpoint` en `api_call` — stellen het volledige REST-oppervlak dynamisch beschikbaar voor elke MCP-client. Authenticatie verloopt met hetzelfde bearer-token als al het andere. Voor clients die met OAuth aanmelden (claude.ai custom connectors) bevat een 401 van `/mcp` een `WWW-Authenticate`-header die verwijst naar `/.well-known/oauth-protected-resource`, en `/.well-known/oauth-authorization-server` maakt de `/membership/oauth`-eindpunten bekend, de dynamische registratie, PKCE en de B1Admin-toestemmingspagina `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` gaat in-process opnieuw de Express-stack in, zodat elke rechten- en kerkscopingregel nog steeds geldt. → **[MCP-server](../api/mcp)**

### Content providers

Het inkomende contentpad, in het aparte pakket `Packages/content-providers` (`@churchapps/content-providers`) in plaats van in de API. Elke provider implementeert de `IProvider`-interface (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` plus auth-hooks — en registreert zichzelf in een `Map`-register (`src/providers/registry.ts`). Hier is **B1 de OAuth-client**: een provider declareert een `AuthType` van `none`, `oauth_pkce`, `device_flow` of `form_login`, en de gedeelde hulpfuncties (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) voeren aan clientzijde de PKCE- of device-flow uit tegen de externe bron. Momenteel worden er elf providers geleverd — waaronder Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church en B1.church — die content aanleveren aan FreePlay en de B1-apps. → **[FreePlay Content Provider](../freeplay-content-provider)**

**Jaarplannen** lopen via dit pad. Een curriculumuitgever (met `lessons.edit`) onderhoudt geordende reeksen van week 1/2/3 in de Lessons.church-beheeromgeving (`LessonsApi`-tabellen `yearPlans` / `yearPlanWeeks`, met optionele `startMonth` en per week een `anchor` van `easter` / `christmas`); `GET /yearPlans/public` op LessonsApi levert actieve plannen anoniem, waarbij het programma, de studie en de locatie van elke week worden gevuld vanuit de lessenboom. Het onderdeel **Serving → Plans → Schedule Lesson → Apply Year Plan** van B1Admin gebruikt dat eindpunt en schrijft voor elke meegenomen week één DoingApi-plan weg (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Plannen met `startMonth` koppelen verankerde weken aan het gekozen jaar (Pasen via de gregoriaanse computus, Kerstmis als de zondag op of vóór 25 december) en vullen de periodes daartussen; plannen zonder `startMonth` koppelen week N nog steeds aan `startDate + (N−1)×7` dagen. Weken van externe OLF-providers of met een onvolledig pad worden bij het toepassen overgeslagen; kerken bewerken de resulterende plannen net als andere plannen, en FreePlay speelt af wat er op het plan staat.

## Samenvatting

| Oppervlak | Authenticatiemechanisme | Richting | Waar geïmplementeerd | Referentie |
|---|---|---|---|---|
| REST API | `Bearer` JWT of `cak_…`-sleutel | Inkomend | `Api/src/modules/*` | [API-sleutels](../api/api-keys) |
| API-sleutels | SHA-256-gehashte `cak_`-token | Credential | `Api/.../membership/controllers/ApiKeyController.ts` | [API-sleutels](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth code (PKCE) · device · refresh → JWT; dynamische clientregistratie | Inkomend | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Geheim per hook, HMAC-SHA256-handtekening | Uitgaand | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-server | `Bearer` JWT, OAuth-JWT (ontdekt via `/.well-known`), of `cak_…`-sleutel | Inkomend (AI) | `Api/src/modules/mcp/` | [MCP-server](../api/mcp) |
| Content providers | Per provider: geen / OAuth PKCE / device / formulier | Inkomende content | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## Kant-en-klare connectors

In plaats van dat iedereen alles zelf bouwt, levert ChurchApps connectors bovenop de hierboven genoemde oppervlakken:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — een webhook-`connectorType` vormt de standaardenvelop om tot een chatbericht; volledig ingesteld in B1Admin, zonder account bij een derde partij.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — een `mailchimp`-connectorType dat personen synchroniseert naar een Mailchimp-doelgroep en groeps- en lijstlidmaatschap koppelt aan tags (`Api/src/shared/webhooks/MailchimpConnector.ts`). In tegenstelling tot de chatconnectors doet deze zelf de geauthenticeerde verzoeken per gebeurtenis (upsert/archiveren/taggen) in plaats van te POSTen naar een door de kerk opgegeven URL; de API-sleutel en het doelgroep-id staan versleuteld in `webhooks.connectorConfig`. Eenrichtingsverkeer, alleen standaard samenvoegvelden.
- **[Zapier](/docs/b1-admin/integrations/zapier)** en **[Make](/docs/b1-admin/integrations/make)** — reageren op webhookgebeurtenissen en handelen via de REST API; ze registreren hun eigen webhook zodra een Zap of scenario wordt ingeschakeld (vereist een sleutel met `settings:write`). De broncode van de Zapier-app staat in de `Integrations`-repository onder `zapier/` (Zapier CLI, uitgerold met `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — een add-on met API-sleutelauthenticatie die on demand Personen / Giften / Groepen / Aanwezigheid exporteert.
- **[Claude](/docs/b1-admin/integrations/claude)** en **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP-clients die naar `/mcp` wijzen.

Voor je eigen code wikkelt **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) dit alles in: een getypeerde REST-client, een OAuth-client (auth-code / refresh / device flow) en een HMAC-webhookverifier met Express-middleware.

## Gerelateerde pagina's

- [API-sleutels](../api/api-keys) — de eenvoudigste credential en de scopecatalogus
- [Connected Apps & OAuth](../api/connected-apps) — toestemmingsflows voor multi-tenant apps
- [Webhooks](../api/webhooks) — het uitgaande gebeurtenissysteem
- [MCP-server](../api/mcp) — de AI-integratiewrapper
- [FreePlay Content Provider](../freeplay-content-provider) — worden tot inkomende contentbron
- [Integraties (eindgebruiker)](/docs/b1-admin/integrations/) — installatiehandleidingen voor kant-en-klare connectors
