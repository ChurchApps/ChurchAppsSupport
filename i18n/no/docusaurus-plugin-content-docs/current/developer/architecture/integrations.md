---
title: "Integrasjon og utvidelse flate"
---

# Integrasjon og utvidelse flate

<div class="article-intro">

Alt en tredjeparte kan koble seg til kjører gjennom ett API og ett autorisasjons modell. Denne siden er kartet: den navngir hver integrasjon flate, viser hvordan de kobler seg, og lenker til den detaljert referanse for hver. Hvis du bygger mot B1, start her for å velge rett dør, så følge lenken til siden som dokumenterer det i dybde.

</div>

## Flatene på et blikk

Det er seks måter inn eller ut, og de deler samme auth lag:

- **[REST API](../api/api-keys)** — hele produkt flate, kallbar med en bearer token fra noe som helst språk.
- **[API nøkler](../api/api-keys)** — den enkleste kredensial: en `cak_…` token bund til en person i en kirke.
- **[OAuth 2.0 & Tilkoblede apper](../api/connected-apps)** — per-kirke samtykke for multi-leiande apper; utferdiger samme JWT en bruker får.
- **[Webhooks](../api/webhooks)** — signert, varigt-levert utgående hendelser.
- **[MCP server](../api/mcp)** — en AI-vendt omslag over REST API på `/mcp`.
- **[Innhold leverandørers](../freeplay-content-provider)** — inngangen sti for eksterne media biblioteker inn i FreePlay og B1 appene.

Alt unntatt innhold leverandørers leveres av en enkelt monolittisk API (den [Api](https://github.com/ChurchApps/Api) depo) hvis moduler monteringer under stabil basis veier — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, og `/mcp`.

## Hvordan det passer sammen

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Tredjeparte app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ nøkkel ─┐                │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Rektor           │  │
   │  · AI klient (MCP)   │ ─── POST /mcp ──────────▶ │  │   omfang filter → tillatelser[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API moduler: /membership /giving     │
             │        signert JSON POST                │  /attendance /content /messaging …    │
             │   (person / donasjon / gruppe / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ delt/webhooks/WebhookDispatcher      │
                     (varigt, HMAC-SHA256 signert)     └───────────────────────────────────────┘

   Eksterne innhold kilder (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / enhet flyt / ingen   ──  B1 er OAuth *klient* her ──▶
             ▼
   Pakker/innhold-leverandørers   ──▶   FreePlay / B1 apper        (inngangen innhold sti)
```

Tre piler forteller hele historien: en tredjeparte **ringer inn** med en bearer token (API nøkkel eller OAuth JWT, inkludert via `/mcp`); API **ringer tilbake ut** gjennom signert webhooks; og innhold leverandørers er det eneste **inngang-innhold** sti hvor B1 selv er OAuth *klient* som drar media fra en ekstern kilde.

## Den delte autentiseringsmodellen

Hver kredensial — en bruker pålogging JWT, en OAuth tilgang token, eller en API nøkkel — løse til samme **`Rektor`** og blir sjekket samme måte. Det er nei separat "integrasjon auth" sti; en omfattet kredensial er ganske enkelt uutskillig fra en lavere-privilegert bruker.

### JWT struktur

B1 tilgang tokens er HS256 JWTs laget i `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Det krav sett:

| Krav | Betydning |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Personen bak token |
| `churchId` | Den enkelte kirke denne token handler innsiden — ankeret for alle data omfang |
| `personId` | Person posten innsiden den kirken |
| `permissions` | Flat rekke av RBAC perm-strenger (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppe medlemskap / ledelse, for gruppe-omfattet sjekk |
| `membershipStatus` | Gjest vs. medlem, for selvbetjent porta |

En OAuth tilgang token er byte-for-byte samme form som en pålogging JWT — den eneste forskjellen er at sin `permissions` rekke ble **filtrert gjennom de tillatt omfang før signering** (`getCombinedApiJwt(...)`).

### Per-kirke omfang

`churchId` er en token krav, ikke en forespørsel parameter, så en kredensial kan aldri nå tvers kirker. Hver depot forespørsel filter på innringer `churchId`; en API nøkkel eller OAuth token er bund til nøyaktig en kirke på laget tid.

### Roll-basert tillatelser ved grensen

Kontrollere porta handlinger med `au.checkAccess(contentType, action)` mot token `permissions` rekke. Omfang er en **filter, aldri en tildeling** (`Api/src/shared/auth/Scopes.ts`): den `SCOPE_CATALOG` kart hver omfang (f.eks. `people:read`, `donations:write`) til RBAC par det tillater, og `filterPermissionsByScopes()` krysser det med personen sin *nåværende* tillatelser på hver løse. Følger:

- Tilbakekalling en tillatelse i B1Admin kutt kredensial tilgang på neste forespørsel — tokens aldri glir fra rolle.
- En omfang kan bare *fjerne* tillatelser, så en omfattet kredensial kan aldri eskalere til server / domene administrasjon (de tillatelser er bevisst umapped til noe som helst omfang).
- API nøkler bærer en `cak_` prefiks; `CustomAuthProvider.getUser()` grener på det, hashing hemmeligheten, og re-løse den eier persons live RBAC på hver kall.

Se [API nøkler → omfang](../api/api-keys#scopes) for hele katalog.

## Flate referanse

### REST API

Det fullførte produkt flate. Noe som helst autentisert endepunkt godtar enten ein JWT eller en `cak_…` API nøkkel i den `Authorization: Bearer` header — det er nei separat nøkkel-bare eller OAuth-bare rute tabell. Moduler og deres basis veier lever under `Api/src/modules/*`.

### API nøkler

En `cak_<prefiks>.<hemmelighet>` personlig tilgang token, opprettet i **B1Admin → Innstillinger → Utvikler → API nøkler**. Bare en SHA-256 hash lagres; den rå nøkkelen vises en gang. Administrert på `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Best for en enkelt kirkes egne script og for koblinger som Zapier, Make, og Google Sheets. → **[API nøkler](../api/api-keys)**

### OAuth 2.0 & Tilkoblede apper

For multi-leiande apper som trenger hver kirke til samtykke. Implementert i `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. Serveren støtter tre tilskudd:

- **Autorisasjons kode** — `POST /oauth/authorize` (autentisert) returnerer en kort-levde kode; `POST /oauth/token` med `grant_type=authorization_code` veksler det for en tilgang JWT (≈ 7 dager) pluss en refresh token (≈ 90 dager).
- **Enhet kode** (RFC 8628) — `POST /oauth/device/authorize` utferdiger en `user_code`; brukeren godkjenner det i B1Admin (`/oauth/device/approve`); enheten avspeiling `/oauth/token` med enhet-kode tilskudd. For TVer, kiosker, og CLIer uten nettleser.
- **Refresh token** — `grant_type=refresh_token` lager en ny tilgang token; offentlig (hemmelighet-mindre) klienter kan utelate hemmeligheten.

En **Tilkoblet app** er kirke-admin-vendt syn av en tillatt token, notert og ankortbar på `/membership/oauth/connections`. Kontrolleren også vert en OAuth **relé-sesjon** bru (`/oauth/relay/*`) som lar en nettleser-mindre enhet fullføre ein pålogging mot en *ekstern* leverandør. → **[Tilkoblede apper og OAuth](../api/connected-apps)**

### Webhooks

Det eneste utgående flate. En kirke abonnement en offentlig HTTPS endepunkt til hendelser; når en matchende endring oppstår, `WebhookDispatcher.emit(churchId, event, payload)` registrer en leveringen og en bakgrunn arbeider POSTs en signert JSON konvolutt med omprøving/tilbakefall og gjenlevering. Motor på `Api/src/shared/webhooks/`, per-kirke CRUD under `/membership/webhooks` (`WebhookController.ts`). En `connectorType` felt omform kroppen for Slack / Discord. → **[Webhooks](../api/webhooks)**

### MCP server

En AI-vendt omslag på `/mcp` (`Api/src/modules/mcp/`). Tre generisk verktøyer — `list_endpoints`, `describe_endpoint`, `api_call` — avslører hele REST flate dynamisk til noe som helst MCP klient. Auth er samme bearer token som alt annet, og `api_call` re-enter Express stabel i-prosess så hver tillatelse og kirke-omfang regel fortsatt påfører. → **[MCP server](../api/mcp)**

### Innhold leverandørers

Inngangen-innhold sti, i den separate pakke `Packages/content-providers` (`@churchapps/content-providers`) snarere enn API. Hver leverandør implementerer `IProvider` grensesnitt (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, pluss auth kroken — og selv-registrerer inn i en `Map` registrering (`src/providers/registry.ts`). Her **B1 er OAuth klient**: en leverandør erklærer en `AuthType` av `none`, `oauth_pkce`, `device_flow`, eller `form_login`, og de delte hjelpemidler (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) kjør klient-side PKCE / enhet flyt mot den eksterne kilde. Elleve leverandørers liv i dag — inkludert Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, og B1.church — fôring FreePlay og B1 apper. → **[FreePlay innhold leverandør](../freeplay-content-provider)**

## Sammendrag

| Flate | Auth mekanisme | Retning | Hvor implementert | Referanse |
|---|---|---|---|---|
| REST API | `Bearer` JWT eller `cak_…` nøkkel | Inngang | `Api/src/modules/*` | [API nøkler](../api/api-keys) |
| API nøkler | SHA-256-hashed `cak_` token | Kredensial | `Api/.../membership/controllers/ApiKeyController.ts` | [API nøkler](../api/api-keys) |
| OAuth 2.0 / Tilkoblede apper | Auth kode · enhet · refresh → JWT | Inngang | `Api/.../membership/controllers/OAuthController.ts` | [Tilkoblede apper](../api/connected-apps) |
| Webhooks | Per-krok hemmelighet, HMAC-SHA256 signatur | Utgang | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT eller `cak_…` nøkkel | Inngang (AI) | `Api/src/modules/mcp/` | [MCP server](../api/mcp) |
| Innhold leverandørers | Per-leverandør: ingen / OAuth PKCE / enhet / forma | Inngang innhold | `Packages/content-providers/` | [Innhold leverandør](../freeplay-content-provider) |

## Forpakket koblinger

Snarere enn alle bygger fra bunnen, ChurchApps lever koblinger på topp av flatene over:

- **[Slack og Discord](/docs/b1-admin/integrations/slack-discord)** — en webhook `connectorType` omform standard konvolutt inn i en chat melding; konfigurert helt i B1Admin, nei tredjeparte konto.
- **[Zapier](/docs/b1-admin/integrations/zapier)** og **[Make](/docs/b1-admin/integrations/make)** — trigger på webhook hendelser og handl via REST API; de registrerer sin eget webhook når en Zap/scenario slår på (trenger en nøkkel med `settings:write`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — ein API-nøkkel-autentisert tillegg som eksporterer personer / Donasjoner / Grupper / Oppmøte på etterspørsel.
- **[Claude](/docs/b1-admin/integrations/claude)** og **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP klienter pekte på `/mcp`.

For dine egne kode, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) omslag alt det: en skrevet REST klient, en OAuth klient (auth-kode / refresh / enhet flyt), og en HMAC webhook verifiserer med Express middlewar.

## Relaterte sider

- [API nøkler](../api/api-keys) — den enkleste kredensial og omfang katalog
- [Tilkoblede apper og OAuth](../api/connected-apps) — multi-leiande samtykke flyter
- [Webhooks](../api/webhooks) — det utgående hendelse system
- [MCP server](../api/mcp) — AI integrasjon omslag
- [FreePlay innhold leverandør](../freeplay-content-provider) — bli en inngang innhold kilde
- [Integrasjoner (sluttbruker)](/docs/b1-admin/integrations/) — forpakket koblings oppsett guider
