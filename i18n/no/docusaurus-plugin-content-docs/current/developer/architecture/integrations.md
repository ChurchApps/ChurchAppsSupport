---
title: "Integrasjons- og utvidelsesflate"
---

# Integrasjons- og utvidelsesflate {#integration--extension-surface}

<div class="article-intro">

Alt en tredjepart kan koble seg til, går gjennom ett API og én autorisasjonsmodell. Denne siden er kartet: den navngir hver integrasjonsflate, viser hvordan de henger sammen, og lenker til den detaljerte referansen for hver. Hvis du bygger mot B1, start her for å velge riktig dør, og følg deretter lenken til siden som dokumenterer den i dybden.

</div>

## Flatene i korthet {#the-surfaces-at-a-glance}

Det finnes seks måter inn eller ut, og de deler alle det samme autorisasjonslaget:

- **[REST API](../api/api-keys)** — hele produktflaten, kallbar med et bearer-token fra ethvert språk.
- **[API-nøkler](../api/api-keys)** — den enkleste legitimasjonen: et `cak_…`-token bundet til én person i én menighet.
- **[OAuth 2.0 og tilkoblede apper](../api/connected-apps)** — samtykke per menighet for flerleietakerapper; utsteder den samme JWT-en som en bruker får.
- **[Webhooks](../api/webhooks)** — signerte, holdbart leverte utgående hendelser.
- **[MCP-server](../api/mcp)** — et KI-vendt lag over REST-API-et på `/mcp`.
- **[Innholdsleverandører](../freeplay-content-provider)** — den inngående veien for eksterne mediebiblioteker inn i FreePlay og B1-appene.

Alt unntatt innholdsleverandører serveres av ett monolittisk API ([Api](https://github.com/ChurchApps/Api)-repositoryet), der modulene monteres under faste basisstier — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` og `/mcp`.

## Slik henger det sammen {#how-it-fits-together}

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Tredjepartsapp      │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · KI-klient (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API-moduler: /membership /giving     │
             │        signert JSON POST               │  /attendance /content /messaging …    │
             │   (person / gave / gruppe / …)         │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (holdbar, HMAC-SHA256-signert)    └───────────────────────────────────────┘

   Eksterne innholdskilder (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / enhetsflyt / ingen  ──  B1 er OAuth-*klienten* her  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1-apper        (innkommende innholdsvei)
```

Tre piler forteller hele historien: en tredjepart **kaller inn** med et bearer-token (API-nøkkel eller OAuth-JWT, også via `/mcp`); API-et **kaller tilbake ut** gjennom signerte webhooks; og innholdsleverandører er den ene **innkommende innholdsveien** der B1 selv er OAuth-*klienten* som henter medier fra en ekstern kilde.

## Den delte autorisasjonsmodellen {#the-shared-auth-model}

Hver legitimasjon — en brukers innloggings-JWT, et OAuth-tilgangstoken eller en API-nøkkel — løses til **samme `Principal`** og sjekkes på samme måte. Det finnes ingen egen «integrasjonsautentisering»; en scopet legitimasjon er ganske enkelt umulig å skille fra en bruker med lavere privilegier.

### JWT-struktur {#jwt-structure}

B1-tilgangstokener er HS256-JWT-er preget i `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Claim-settet:

| Claim | Betydning |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Personen bak tokenet |
| `churchId` | Den ene menigheten dette tokenet opererer innenfor — ankeret for all dataavgrensing |
| `personId` | Personposten innenfor den menigheten |
| `permissions` | Flat matrise av RBAC-tillatelsesstrenger (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppemedlemskap / gruppelederskap, for gruppeavgrensede sjekker |
| `membershipStatus` | Gjest kontra medlem, for gating av selvbetjening |

Et OAuth-tilgangstoken har nøyaktig samme form som en innloggings-JWT — den eneste forskjellen er at matrisen `permissions` ble **filtrert gjennom de innvilgede scopene før signering** (`getCombinedApiJwt(...)`).

### Scoping per menighet {#per-church-scoping}

`churchId` er et token-claim, ikke en forespørselsparameter, så en legitimasjon kan aldri nå på tvers av menigheter. Hver repository-spørring filtrerer på kallerens `churchId`; en API-nøkkel eller et OAuth-token er bundet til nøyaktig én menighet ved preging.

### Rollebaserte tillatelser ved grensen {#role-based-permissions-at-the-boundary}

Kontrollere gater handlinger med `au.checkAccess(contentType, action)` mot tokenets `permissions`-matrise. Scopes er et **filter, aldri en innvilgelse** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` kobler hvert scope (f.eks. `people:read`, `donations:write`) til RBAC-parene det tillater, og `filterPermissionsByScopes()` skjærer dette med personens *nåværende* tillatelser ved hver oppslag. Konsekvenser:

- Å fjerne en tillatelse i B1Admin kutter legitimasjonens tilgang ved neste forespørsel — tokener drifter aldri fra rollen.
- Et scope kan bare *fjerne* tillatelser, så en scopet legitimasjon kan aldri heve seg til server- eller domeneadministrasjon (de tillatelsene er bevisst umappet mot ethvert scope).
- API-nøkler bærer et `cak_`-prefiks; `CustomAuthProvider.getUser()` forgrener på det, hasher hemmeligheten, og løser eierens levende RBAC på nytt ved hvert kall.

Se [API-nøkler → Scopes](../api/api-keys#scopes) for hele scope-katalogen.

## Flatereferanse {#surface-reference}

### REST API {#rest-api}

Hele produktflaten. Ethvert autentisert endepunkt godtar enten en JWT eller en `cak_…`-API-nøkkel i `Authorization: Bearer`-headeren — det finnes ingen egen rutetabell for bare nøkler eller bare OAuth. Modulene og deres basisstier ligger under `Api/src/modules/*`.

### API-nøkler {#api-keys}

Et `cak_<prefix>.<secret>`-personlig tilgangstoken, opprettet i **B1Admin → Settings → Developer → API Keys**. Bare en SHA-256-hash lagres; den rå nøkkelen vises én gang. Administreres på `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Best for en enkelt menighets egne skript og for koblinger som Zapier, Make og Google Sheets. → **[API-nøkler](../api/api-keys)**

### OAuth 2.0 og tilkoblede apper {#oauth-20--connected-apps}

For flerleietakerapper som trenger at hver menighet samtykker. Implementert i `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. Serveren støtter tre grants:

- **Authorization Code** — `POST /oauth/authorize` (autentisert) returnerer en kortlivet kode; `POST /oauth/token` med `grant_type=authorization_code` veksler den inn til et tilgangs-JWT (≈ 7 dager) pluss et oppfriskningstoken (≈ 90 dager). Offentlige klienter (uten hemmelighet) må bruke PKCE (bare `S256`): en `code_challenge` ved autorisering og den tilhørende `code_verifier` ved tokenvekslingen.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` utsteder en `user_code`; brukeren godkjenner den i B1Admin (`/oauth/device/approve`); enheten spør `/oauth/token` med device-code-granten. For TV-er, kiosker og CLI-verktøy uten nettleser.
- **Refresh Token** — `grant_type=refresh_token` preger et nytt tilgangstoken; offentlige klienter (uten hemmelighet) kan utelate hemmeligheten.

Offentlige klienter kan også registrere seg selv med `POST /oauth/register` (RFC 7591 dynamisk klientregistrering); de får en `client_id` og ingen hemmelighet, og deres omdirigeringsadresser må være `https` eller loopback.

En **tilkoblet app** er menighetsadministratorens visning av et innvilget token, listet og kan trekkes tilbake på `/membership/oauth/connections`. Kontrolleren huser også en OAuth **relay-session**-bro (`/oauth/relay/*`) som lar en enhet uten nettleser fullføre en innlogging mot en *ekstern* leverandør. → **[Tilkoblede apper og OAuth](../api/connected-apps)**

### Webhooks {#webhooks}

Den eneste utgående flaten. En menighet abonnerer et offentlig HTTPS-endepunkt på hendelser; når en tilsvarende endring skjer, beriker `WebhookDispatcher.emit(churchId, event, payload)` nyttelaster som bare har ID-er med visningsnavn (`personName`, `groupName`, `formName` — oppslag kjøres bare når et abonnement matcher), registrerer en leveranse, og en bakgrunnsarbeider sender en signert JSON-konvolutt med retry/backoff og ny levering. Motoren ligger i `Api/src/shared/webhooks/`, med CRUD per menighet under `/membership/webhooks` (`WebhookController.ts`). Et `connectorType`-felt former om innholdet for Slack / Discord; `mailchimp`-kobleren går lenger og eier hele HTTP-utvekslingen selv (per hendelse metode/URL/autentisering mot Mailchimps API, legitimasjon kryptert i `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP-server {#mcp-server}

Et KI-vendt lag på `/mcp` (`Api/src/modules/mcp/`). Tre generiske verktøy — `list_endpoints`, `describe_endpoint`, `api_call` — eksponerer hele REST-flaten dynamisk for enhver MCP-klient. Autentisering er det samme bearer-tokenet som alt annet. For klienter som logger inn med OAuth (claude.ai egendefinerte koblinger) bærer et 401 fra `/mcp` en `WWW-Authenticate`-header som peker til `/.well-known/oauth-protected-resource`, og `/.well-known/oauth-authorization-server` annonserer `/membership/oauth`-endepunktene, dynamisk registrering, PKCE og samtykkesiden `/oauth` i B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` går inn i Express-stakken igjen in-process, slik at alle tillatelses- og menighetsavgrensningsregler fortsatt gjelder. → **[MCP-server](../api/mcp)**

### Innholdsleverandører {#content-providers}

Den innkommende innholdsveien, i den separate pakken `Packages/content-providers` (`@churchapps/content-providers`) i stedet for i API-et. Hver leverandør implementerer `IProvider`-grensesnittet (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, pluss autentiseringskroker — og registrerer seg selv i et `Map`-register (`src/providers/registry.ts`). Her er **B1 OAuth-klienten**: en leverandør deklarerer en `AuthType` på `none`, `oauth_pkce`, `device_flow` eller `form_login`, og de delte hjelperne (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) kjører klientsidens PKCE-/enhetsflyt mot den eksterne kilden. Elleve leverandører leveres i dag — blant dem Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church og B1.church — og de mater FreePlay og B1-appene. → **[FreePlay-innholdsleverandør](../freeplay-content-provider)**

**Årsplaner** bruker denne veien. En læreplanutgiver (med `lessons.edit`) vedlikeholder ordnede sekvenser for uke 1/2/3 i Lessons.church-administrasjonen (`LessonsApi`-tabellene `yearPlans` / `yearPlanWeeks`, med valgfri `startMonth` og en `anchor` per uke av `easter` / `christmas`); `GET /yearPlans/public` på LessonsApi serverer levende planer anonymt, og fyller hver ukes program/studie/sted fra leksjonstreet. B1Admins **Serving → Plans → Schedule Lesson → Apply Year Plan** bruker det endepunktet og skriver én DoingApi-plan per inkludert uke (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Planer med `startMonth` løser forankrede uker mot valgt år (Easter via gregoriansk beregning, Christmas som søndagen på eller før 25. desember) og fyller periodene mellom dem; planer uten `startMonth` kobler fortsatt uke N til `startDate + (N−1)×7` dager. Uker fra eksterne OLF-leverandører eller med en ufullstendig sti hoppes over ved anvendelse; menigheter redigerer de resulterende planene som alle andre, og FreePlay spiller det som står på planen.

## Oppsummering {#summary}

| Flate | Autentiseringsmekanisme | Retning | Der implementert | Referanse |
|---|---|---|---|---|
| REST API | `Bearer` JWT eller `cak_…`-nøkkel | Inn | `Api/src/modules/*` | [API-nøkler](../api/api-keys) |
| API-nøkler | SHA-256-hashet `cak_`-token | Legitimasjon | `Api/.../membership/controllers/ApiKeyController.ts` | [API-nøkler](../api/api-keys) |
| OAuth 2.0 / tilkoblede apper | Autorisasjonskode (PKCE) · enhet · oppfriskning → JWT; dynamisk klientregistrering | Inn | `Api/.../membership/controllers/OAuthController.ts` | [Tilkoblede apper](../api/connected-apps) |
| Webhooks | Hemmelighet per hook, HMAC-SHA256-signatur | Ut | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-server | `Bearer` JWT, OAuth-JWT (oppdaget via `/.well-known`), eller `cak_…`-nøkkel | Inn (KI) | `Api/src/modules/mcp/` | [MCP-server](../api/mcp) |
| Innholdsleverandører | Per leverandør: ingen / OAuth PKCE / enhet / skjema | Inn, innhold | `Packages/content-providers/` | [Innholdsleverandør](../freeplay-content-provider) |

## Ferdige koblinger {#prebuilt-connectors}

I stedet for at alle bygger fra bunnen av, leverer ChurchApps koblinger oppå flatene over:

- **[Slack og Discord](/docs/b1-admin/integrations/slack-discord)** — en webhook-`connectorType` former standardkonvolutten om til en chatmelding; konfigureres helt i B1Admin, uten tredjepartskonto.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — en `mailchimp`-connectorType som synkroniserer personer til en Mailchimp-målgruppe og kobler gruppe-/listemedlemskap til tagger (`Api/src/shared/webhooks/MailchimpConnector.ts`). I motsetning til chat-kobler­ne sender den sine egne autentiserte forespørsler per hendelse (upsert/arkiver/tagg) i stedet for å POST-e til en URL oppgitt av menigheten; API-nøkkelen og målgruppe-ID-en ligger kryptert i `webhooks.connectorConfig`. Enveis, bare standard flettefelter.
- **[Zapier](/docs/b1-admin/integrations/zapier)** og **[Make](/docs/b1-admin/integrations/make)** — utløses av webhook-hendelser og handler via REST API; de registrerer sin egen webhook når en Zap/scenario slås på (krever en nøkkel med `settings:write`). Zapier-appens kildekode ligger i `Integrations`-repositoryet under `zapier/` (Zapier CLI, distribuert med `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — et tillegg med API-nøkkelautentisering som eksporterer Personer / Gaver / Grupper / Oppmøte på forespørsel.
- **[Claude](/docs/b1-admin/integrations/claude)** og **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP-klienter rettet mot `/mcp`.

For din egen kode omslutter **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) alt dette: en typet REST-klient, en OAuth-klient (autorisasjonskode / oppfriskning / enhetsflyt), og en HMAC-webhook-verifikator med Express-mellomvare.

## Relaterte sider {#related-pages}

- [API-nøkler](../api/api-keys) — den enkleste legitimasjonen og scope-katalogen
- [Tilkoblede apper og OAuth](../api/connected-apps) — samtykkeflyter for flere menigheter
- [Webhooks](../api/webhooks) — systemet for utgående hendelser
- [MCP-server](../api/mcp) — KI-integrasjonslaget
- [FreePlay-innholdsleverandør](../freeplay-content-provider) — å bli en innkommende innholdskilde
- [Integrasjoner (sluttbruker)](/docs/b1-admin/integrations/) — oppsettsveiledninger for ferdige koblinger
