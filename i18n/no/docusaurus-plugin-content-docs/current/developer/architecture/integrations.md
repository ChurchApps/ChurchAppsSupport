---
title: "Integrasjons- og utvidelsesflate"
---

# Integrasjons- og utvidelsesflate

<div class="article-intro">

Alt en tredjepart kan koble seg til, kjører gjennom ett API og én autorisasjonsmodell. Denne siden er kartet: den navngir hver integrasjonsflate, viser hvordan de henger sammen, og lenker til den detaljerte referansen for hver enkelt. Hvis du bygger mot B1, start her for å velge riktig dør, og følg deretter lenken til siden som dokumenterer den i dybden.

</div>

## Flatene i fugleperspektiv

Det finnes seks veier inn eller ut, og de deler alle det samme autentiseringslaget:

- **[REST API](../api/api-keys)** — hele produktflaten, som kan kalles med en bearer-token fra hvilket som helst språk.
- **[API-nøkler](../api/api-keys)** — den enkleste legitimasjonen: en `cak_…`-token bundet til én person i én kirke.
- **[OAuth 2.0 og tilkoblede apper](../api/connected-apps)** — per-kirke samtykke for multi-tenant-apper; utsteder samme JWT som en bruker får.
- **[Webhooker](../api/webhooks)** — signerte, holdbart leverte utgående hendelser.
- **[MCP-server](../api/mcp)** — en AI-vendt omslagsdel over REST-APIet på `/mcp`.
- **[Innholdsleverandører](../freeplay-content-provider)** — den innkommende stien for eksterne mediebiblioteker inn i FreePlay og B1-appene.

Alt unntatt innholdsleverandører betjenes av ett monolittisk API (repoet [Api](https://github.com/ChurchApps/Api)) hvis moduler monteres under stabile basisstier — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, og `/mcp`.

## Hvordan det henger sammen

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Tredjepartsapp      │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_-nøkkel ─┐                 │  │
   │  · CLI / skript      │                          │  │   OAuth-JWT ┴▶ Principal          │  │
   │  · AI-klient (MCP)   │ ─── POST /mcp ──────────▶ │  │   omfang filtrerer → tillatelser[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API-moduler: /membership /giving     │
             │        signert JSON-POST                │  /attendance /content /messaging …    │
             │   (person / donasjon / gruppe / …)      │                   │                    │
             └──────────── webhooker ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (holdbart, HMAC-SHA256-signert)     └───────────────────────────────────────┘

   Eksterne innholdskilder (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / enhetsflyt / ingen   ──  B1 er OAuth-*klienten* her  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1-apper        (innkommende innholdssti)
```

Tre piler forteller hele historien: en tredjepart **ringer inn** med en bearer-token (API-nøkkel eller OAuth-JWT, inkludert via `/mcp`); APIet **ringer tilbake ut** gjennom signerte webhooker; og innholdsleverandører er den ene **innkommende innholds**-stien der B1 selv er OAuth-*klienten* som henter medier fra en ekstern kilde.

## Den delte autentiseringsmodellen

Hver legitimasjon — en brukers innloggings-JWT, en OAuth-tilgangstoken, eller en API-nøkkel — løses til den **samme `Principal`** og sjekkes på samme måte. Det finnes ingen separat "integrasjons-auth"-sti; en omfangsbegrenset legitimasjon er ganske enkelt umulig å skille fra en bruker med lavere privilegier.

### JWT-struktur

B1-tilgangstokener er HS256-JWT-er utstedt i `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Claim-settet:

| Claim | Betydning |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Personen bak tokenet |
| `churchId` | Den ene kirken dette tokenet virker innenfor — ankeret for all dataomfangsbegrensning |
| `personId` | Personposten inne i den kirken |
| `permissions` | Flat array med RBAC-tillatelsesstrenger (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppemedlemskap / lederskap, for gruppeomfangs-sjekker |
| `membershipStatus` | Gjest vs. medlem, for selvbetjeningssperring |

En OAuth-tilgangstoken er byte-for-byte samme form som en innloggings-JWT — den eneste forskjellen er at dens `permissions`-array ble **filtrert gjennom de innvilgede omfangene før signering** (`getCombinedApiJwt(...)`).

### Per-kirke-omfang

`churchId` er en token-claim, ikke en forespørselsparameter, så en legitimasjon kan aldri nå på tvers av kirker. Hver repository-spørring filtrerer på den innringendes `churchId`; en API-nøkkel eller OAuth-token er bundet til nøyaktig én kirke ved utstedelsestidspunktet.

### Rollebaserte tillatelser ved grensen

Controllere sperrer handlinger med `au.checkAccess(contentType, action)` mot tokenets `permissions`-array. Omfang er et **filter, aldri en tildeling** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` mapper hvert omfang (f.eks. `people:read`, `donations:write`) til RBAC-parene det tillater, og `filterPermissionsByScopes()` krysser det med personens *nåværende* tillatelser ved hver oppløsning. Konsekvenser:

- Å tilbakekalle en tillatelse i B1Admin kutter legitimasjonens tilgang ved neste forespørsel — tokener driver aldri bort fra rollen.
- Et omfang kan bare noensinne *fjerne* tillatelser, så en omfangsbegrenset legitimasjon kan aldri eskalere til server-/domeneadministrasjon (de tillatelsene er bevisst ikke mappet til noe omfang).
- API-nøkler bærer et `cak_`-prefiks; `CustomAuthProvider.getUser()` forgrener på det, hasher hemmeligheten, og løser den eiende personens levende RBAC på nytt ved hvert kall.

Se [API-nøkler → Omfang](../api/api-keys#scopes) for hele katalogen.

## Flatereferanse

### REST API

Den komplette produktflaten. Ethvert autentisert endepunkt godtar enten en JWT eller en `cak_…`-API-nøkkel i `Authorization: Bearer`-headeren — det finnes ingen separat nøkkel-bare eller OAuth-bare rutetabell. Moduler og deres basisstier ligger under `Api/src/modules/*`.

### API-nøkler

En personlig tilgangstoken på formen `cak_<prefiks>.<hemmelighet>`, opprettet i **B1Admin → Innstillinger → Utvikler → API-nøkler**. Bare en SHA-256-hash lagres; den rå nøkkelen vises kun én gang. Administreres på `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Best egnet for en enkelt kirkes egne skript og for koblinger som Zapier, Make, og Google Sheets. → **[API-nøkler](../api/api-keys)**

### OAuth 2.0 og tilkoblede apper

For multi-tenant-apper som trenger samtykke fra hver kirke. Implementert i `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. Serveren støtter tre tildelinger:

- **Autorisasjonskode** — `POST /oauth/authorize` (autentisert) returnerer en kortlevd kode; `POST /oauth/token` med `grant_type=authorization_code` bytter den inn i en tilgangs-JWT (≈ 7 dager) pluss en refresh-token (≈ 90 dager).
- **Enhetskode** (RFC 8628) — `POST /oauth/device/authorize` utsteder en `user_code`; brukeren godkjenner den i B1Admin (`/oauth/device/approve`); enheten avspør `/oauth/token` med enhetskode-tildelingen. For TV-er, kiosker, og CLI-er uten nettleser.
- **Refresh-token** — `grant_type=refresh_token` lager en ny tilgangstoken; offentlige (hemmelighetsløse) klienter kan utelate hemmeligheten.

En **tilkoblet app** er kirkens administratorvendte visning av en innvilget token, listet og kan tilbakekalles på `/membership/oauth/connections`. Controlleren er også vert for en OAuth-**relé-sesjon**-bro (`/oauth/relay/*`) som lar en enhet uten nettleser fullføre en innlogging mot en *ekstern* leverandør. → **[Tilkoblede apper og OAuth](../api/connected-apps)**

### Webhooker

Den eneste utgående flaten. En kirke abonnerer et offentlig HTTPS-endepunkt på hendelser; når en matchende endring inntreffer, beriker `WebhookDispatcher.emit(churchId, event, payload)` id-baserte nyttelaster med visningsnavn (`personName`, `groupName`, `formName` — oppslag kjører bare når et abonnement matcher), registrerer en levering, og en bakgrunnsarbeider POSTer en signert JSON-konvolutt med gjentakelse/backoff og redelivering. Motoren ligger i `Api/src/shared/webhooks/`, per-kirke CRUD under `/membership/webhooks` (`WebhookController.ts`). Et `connectorType`-felt omformer innholdet for Slack / Discord. → **[Webhooker](../api/webhooks)**

### MCP-server

En AI-vendt omslagsdel på `/mcp` (`Api/src/modules/mcp/`). Tre generiske verktøy — `list_endpoints`, `describe_endpoint`, `api_call` — eksponerer hele REST-flaten dynamisk til enhver MCP-klient. Autentisering er den samme bearer-tokenen som alt annet, og `api_call` går inn i Express-stabelen på nytt in-process, slik at hver tillatelses- og kirkeomfangsregel fortsatt gjelder. → **[MCP-server](../api/mcp)**

### Innholdsleverandører

Den innkommende innholdsstien, i den separate pakken `Packages/content-providers` (`@churchapps/content-providers`) i stedet for APIet. Hver leverandør implementerer `IProvider`-grensesnittet (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, pluss autentiseringskroker — og selvregistrerer seg i et `Map`-register (`src/providers/registry.ts`). Her er **B1 OAuth-klienten**: en leverandør deklarerer en `AuthType` på `none`, `oauth_pkce`, `device_flow`, eller `form_login`, og de delte hjelperne (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) kjører den klientsidige PKCE-/enhetsflyten mot den eksterne kilden. Elleve leverandører leveres i dag — inkludert Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, og B1.church — som mater FreePlay og B1-appene. → **[FreePlay-innholdsleverandør](../freeplay-content-provider)**

## Sammendrag

| Flate | Autentiseringsmekanisme | Retning | Hvor implementert | Referanse |
|---|---|---|---|---|
| REST API | `Bearer`-JWT eller `cak_…`-nøkkel | Innkommende | `Api/src/modules/*` | [API-nøkler](../api/api-keys) |
| API-nøkler | SHA-256-hashet `cak_`-token | Legitimasjon | `Api/.../membership/controllers/ApiKeyController.ts` | [API-nøkler](../api/api-keys) |
| OAuth 2.0 / Tilkoblede apper | Autorisasjonskode · enhet · refresh → JWT | Innkommende | `Api/.../membership/controllers/OAuthController.ts` | [Tilkoblede apper](../api/connected-apps) |
| Webhooker | Per-hook-hemmelighet, HMAC-SHA256-signatur | Utgående | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooker](../api/webhooks) |
| MCP-server | `Bearer`-JWT eller `cak_…`-nøkkel | Innkommende (AI) | `Api/src/modules/mcp/` | [MCP-server](../api/mcp) |
| Innholdsleverandører | Per leverandør: ingen / OAuth PKCE / enhet / skjema | Innkommende innhold | `Packages/content-providers/` | [Innholdsleverandør](../freeplay-content-provider) |

## Ferdigbygde koblinger

Fremfor at alle bygger fra bunnen av, leverer ChurchApps koblinger oppå flatene over:

- **[Slack og Discord](/docs/b1-admin/integrations/slack-discord)** — en webhook `connectorType` omformer standardkonvolutten til en chat-melding; konfigureres helt i B1Admin, ingen tredjepartskonto nødvendig.
- **[Zapier](/docs/b1-admin/integrations/zapier)** og **[Make](/docs/b1-admin/integrations/make)** — trigges på webhook-hendelser og handler via REST-APIet; de registrerer sin egen webhook når en Zap/et scenario slås på (krever en nøkkel med `settings:write`). Zapier-appens kildekode ligger i `Integrations`-repoet under `zapier/` (Zapier CLI, distribuert med `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — et API-nøkkel-autentisert tillegg som eksporterer personer / donasjoner / grupper / oppmøte på forespørsel.
- **[Claude](/docs/b1-admin/integrations/claude)** og **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP-klienter pekt mot `/mcp`.

For din egen kode omslutter **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) alt dette: en typet REST-klient, en OAuth-klient (autorisasjonskode / refresh / enhetsflyt), og en HMAC-webhook-verifiserer med Express-middleware.

## Relaterte sider

- [API-nøkler](../api/api-keys) — den enkleste legitimasjonen og omfangskatalogen
- [Tilkoblede apper og OAuth](../api/connected-apps) — flyter for samtykke i multi-tenant-sammenheng
- [Webhooker](../api/webhooks) — det utgående hendelsessystemet
- [MCP-server](../api/mcp) — AI-integrasjonsomslaget
- [FreePlay-innholdsleverandør](../freeplay-content-provider) — å bli en innkommende innholdskilde
- [Integrasjoner (sluttbruker)](/docs/b1-admin/integrations/) — oppsettsveiledninger for ferdigbygde koblinger
