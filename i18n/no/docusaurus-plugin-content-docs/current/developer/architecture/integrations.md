---
title: "Integrasjons- og utvidelsesflate"
---

# Integrasjons- og utvidelsesflate

<div class="article-intro">

Alt en tredjepart kan koble seg til, går gjennom ett API og én autorisasjonsmodell. Denne siden er kartet: den nevner hver integrasjonsflate, viser hvordan de henger sammen, og lenker til detaljreferansen for hver av dem. Hvis du bygger mot B1, start her for å velge riktig inngang, og følg deretter lenken til siden som dokumenterer den i dybden.

</div>

## Flatene i korte trekk

Det finnes seks måter inn eller ut på, og de deler alle samme autorisasjonslag:

- **[REST API](../api/api-keys)** — hele produktflaten, kan kalles med et bearer-token fra hvilket som helst språk.
- **[API-nøkler](../api/api-keys)** — den enkleste legitimasjonen: et `cak_…`-token knyttet til én person i én menighet.
- **[OAuth 2.0 og tilkoblede apper](../api/connected-apps)** — samtykke per menighet for flerleietakerapper; utsteder samme JWT som en bruker får.
- **[Webhooks](../api/webhooks)** — signerte, holdbart leverte utgående hendelser.
- **[MCP-server](../api/mcp)** — en AI-vendt innpakning over REST API-et på `/mcp`.
- **[Innholdsleverandører](../freeplay-content-provider)** — den innkommende veien for eksterne mediebiblioteker inn i FreePlay og B1-appene.

Alt unntatt innholdsleverandører betjenes av ett samlet API (repositoriet [Api](https://github.com/ChurchApps/Api)) der modulene monteres under faste basisstier — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` og `/mcp`.

## Slik henger det sammen

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

Tre piler forteller hele historien: en tredjepart **kaller inn** med et bearer-token (API-nøkkel eller OAuth-JWT, også via `/mcp`); API-et **kaller tilbake** gjennom signerte webhooks; og innholdsleverandører er den ene **innkommende innholdsveien** der B1 selv er OAuth-*klienten* som henter medier fra en ekstern kilde.

## Den delte autorisasjonsmodellen

Hver legitimasjon – en brukers innloggings-JWT, et OAuth-tilgangstoken eller en API-nøkkel – løses til samme **`Principal`** og kontrolleres på samme måte. Det finnes ingen egen «integrasjonsautentisering»; en avgrenset legitimasjon er ganske enkelt umulig å skille fra en bruker med lavere privilegier.

### JWT-struktur

B1-tilgangstokener er HS256-JWT-er som utstedes i `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Claim-settet:

| Claim | Betydning |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Personen bak tokenet |
| `churchId` | Den ene menigheten tokenet opererer innenfor — ankeret for all dataavgrensning |
| `personId` | Personposten innenfor den menigheten |
| `permissions` | Flat liste med RBAC-tillatelsesstrenger (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppemedlemskap / gruppelederskap, for gruppebaserte kontroller |
| `membershipStatus` | Gjest kontra medlem, for selvbetjeningsbegrensninger |

Et OAuth-tilgangstoken har nøyaktig samme form som en innloggings-JWT – den eneste forskjellen er at `permissions`-listen ble **filtrert gjennom de innvilgede scopene før signering** (`getCombinedApiJwt(...)`).

### Avgrensning per menighet

`churchId` er et claim i tokenet, ikke en forespørselsparameter, så en legitimasjon kan aldri nå på tvers av menigheter. Hvert repository-søk filtrerer på innringerens `churchId`; en API-nøkkel eller et OAuth-token er knyttet til nøyaktig én menighet når det opprettes.

### Rollebaserte tillatelser ved grensen

Kontrollere begrenser handlinger med `au.checkAccess(contentType, action)` mot tokenets `permissions`-liste. Scopes er et **filter, aldri en tildeling** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` knytter hvert scope (f.eks. `people:read`, `donations:write`) til de RBAC-parene det tillater, og `filterPermissionsByScopes()` skjærer dette med personens *nåværende* tillatelser ved hver oppslag. Konsekvensene:

- Hvis du fjerner en tillatelse i B1Admin, mister legitimasjonen tilgangen ved neste forespørsel – tokener kommer aldri ut av synk med rollen.
- Et scope kan bare *fjerne* tillatelser, så en avgrenset legitimasjon kan aldri heve seg til server- eller domeneadministrasjon (disse tillatelsene er bevisst ikke koblet til noe scope).
- API-nøkler har prefikset `cak_`; `CustomAuthProvider.getUser()` forgrener på det, hasher hemmeligheten og løser opp eierens levende RBAC på nytt ved hvert kall.

Se [API-nøkler → Scopes](../api/api-keys#scopes) for hele katalogen.

## Referanse for flatene

### REST API

Hele produktflaten. Ethvert autentisert endepunkt godtar enten en JWT eller en `cak_…`-API-nøkkel i `Authorization: Bearer`-headeren – det finnes ingen egen tabell med ruter kun for nøkler eller kun for OAuth. Modulene og deres basisstier ligger under `Api/src/modules/*`.

### API-nøkler

Et personlig tilgangstoken `cak_<prefix>.<secret>`, opprettet i **B1Admin → Settings → Developer → API Keys**. Det lagres kun en SHA-256-hash; den rå nøkkelen vises én gang. Administreres på `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Best for en enkelt menighets egne skript og for koblinger som Zapier, Make og Google Sheets. → **[API-nøkler](../api/api-keys)**

### OAuth 2.0 og tilkoblede apper

For flerleietakerapper som trenger samtykke fra hver menighet. Implementert i `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. Serveren støtter tre grant-typer:

- **Authorization Code** — `POST /oauth/authorize` (autentisert) returnerer en kortlevd kode; `POST /oauth/token` med `grant_type=authorization_code` bytter den mot et tilgangs-JWT (≈ 7 dager) og et refresh-token (≈ 90 dager). Offentlige klienter uten hemmelighet må bruke PKCE (kun `S256`): en `code_challenge` ved autorisering og den tilhørende `code_verifier` ved tokenbyttet.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` utsteder en `user_code`; brukeren godkjenner den i B1Admin (`/oauth/device/approve`); enheten spør `/oauth/token` med device-code-grant. For TV-er, kiosker og CLI-verktøy uten nettleser.
- **Refresh Token** — `grant_type=refresh_token` utsteder et nytt tilgangstoken; offentlige klienter uten hemmelighet kan utelate den.

Offentlige klienter kan også registrere seg selv med `POST /oauth/register` (RFC 7591 dynamisk klientregistrering); de får en `client_id` og ingen hemmelighet, og redirect-URI-ene deres må være `https` eller loopback.

En **tilkoblet app** er menighetsadministratorens visning av et gitt token, som listes og kan trekkes tilbake på `/membership/oauth/connections`. Kontrolleren er også vert for en OAuth-**relay-session**-bro (`/oauth/relay/*`) som lar en enhet uten nettleser fullføre innlogging mot en *ekstern* leverandør. → **[Tilkoblede apper og OAuth](../api/connected-apps)**

### Webhooks

Den eneste utgående flaten. En menighet abonnerer et offentlig HTTPS-endepunkt på hendelser; når en tilsvarende endring skjer, beriker `WebhookDispatcher.emit(churchId, event, payload)` nyttelaster som bare har ID-er med visningsnavn (`personName`, `groupName`, `formName` — oppslagene kjøres kun når et abonnement matcher), registrerer en leveranse, og en bakgrunnsprosess sender en signert JSON-konvolutt med retry/backoff og ny levering. Motoren ligger i `Api/src/shared/webhooks/`, og CRUD per menighet under `/membership/webhooks` (`WebhookController.ts`). Et `connectorType`-felt omformer innholdet for Slack / Discord; `mailchimp`-koblingen går lenger og eier hele HTTP-utvekslingen selv (per hendelse metode/URL/autentisering mot Mailchimps API, legitimasjon kryptert i `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP-server

En AI-vendt innpakning på `/mcp` (`Api/src/modules/mcp/`). Tre generiske verktøy — `list_endpoints`, `describe_endpoint` og `api_call` — eksponerer hele REST-flaten dynamisk for enhver MCP-klient. Autentiseringen er samme bearer-token som alt annet. For klienter som logger inn med OAuth (egne connectorer i claude.ai) inneholder et 401-svar fra `/mcp` en `WWW-Authenticate`-header som peker til `/.well-known/oauth-protected-resource`, og `/.well-known/oauth-authorization-server` annonserer `/membership/oauth`-endepunktene, dynamisk registrering, PKCE og samtykkesiden `/oauth` i B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` går inn i Express-stakken på nytt i samme prosess, slik at alle tillatelses- og menighetsavgrensningsregler fortsatt gjelder. → **[MCP-server](../api/mcp)**

### Innholdsleverandører

Den innkommende innholdsveien, i den egne pakken `Packages/content-providers` (`@churchapps/content-providers`) i stedet for i API-et. Hver leverandør implementerer grensesnittet `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` og autentiseringshooks — og registrerer seg selv i et `Map`-register (`src/providers/registry.ts`). Her er **B1 OAuth-klienten**: en leverandør deklarerer en `AuthType` som er `none`, `oauth_pkce`, `device_flow` eller `form_login`, og de delte hjelperne (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) kjører PKCE- eller device-flyten på klientsiden mot den eksterne kilden. Elleve leverandører leveres i dag — blant annet Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church og B1.church — og de mater FreePlay og B1-appene. → **[FreePlay-innholdsleverandør](../freeplay-content-provider)**

**Årsplaner** går over denne veien. En læreplanutgiver (med `lessons.edit`) vedlikeholder ordnede sekvenser for uke 1/2/3 i administrasjonen til Lessons.church (tabellene `yearPlans` / `yearPlanWeeks` i `LessonsApi`, med valgfri `startMonth` og en `anchor` per uke som kan være `easter` / `christmas`); `GET /yearPlans/public` i LessonsApi serverer levende planer anonymt og fyller inn programmet, studiet og stedet for hver uke fra leksjonstreet. B1Admin under **Serving → Plans → Schedule Lesson → Apply Year Plan** bruker dette endepunktet og skriver én DoingApi-plan per inkludert uke (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Planer med `startMonth` løser forankrede uker mot det valgte året (påske etter gregoriansk computus, jul som søndagen på eller før 25. desember) og fyller periodene mellom dem; planer uten `startMonth` kartlegger fortsatt uke N til `startDate + (N−1)×7` dager. Uker fra eksterne OLF-leverandører, eller med en ufullstendig sti, hoppes over ved anvendelse; menigheter redigerer de resulterende planene som alle andre, og FreePlay spiller det som står i planen.

## Oppsummering

| Flate | Autentiseringsmekanisme | Retning | Hvor den implementeres | Referanse |
|---|---|---|---|---|
| REST API | `Bearer` JWT eller `cak_…`-nøkkel | Inn | `Api/src/modules/*` | [API-nøkler](../api/api-keys) |
| API-nøkler | SHA-256-hashet `cak_`-token | Legitimasjon | `Api/.../membership/controllers/ApiKeyController.ts` | [API-nøkler](../api/api-keys) |
| OAuth 2.0 / tilkoblede apper | Auth code (PKCE) · device · refresh → JWT; dynamisk klientregistrering | Inn | `Api/.../membership/controllers/OAuthController.ts` | [Tilkoblede apper](../api/connected-apps) |
| Webhooks | Hemmelighet per hook, HMAC-SHA256-signatur | Ut | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-server | `Bearer` JWT, OAuth-JWT (oppdaget via `/.well-known`), eller `cak_…`-nøkkel | Inn (AI) | `Api/src/modules/mcp/` | [MCP-server](../api/mcp) |
| Innholdsleverandører | Per leverandør: ingen / OAuth PKCE / device / skjema | Innkommende innhold | `Packages/content-providers/` | [Innholdsleverandør](../freeplay-content-provider) |

## Ferdigbygde koblinger

I stedet for at alle bygger fra bunnen av, leverer ChurchApps koblinger oppå flatene ovenfor:

- **[Slack og Discord](/docs/b1-admin/integrations/slack-discord)** — en webhook-`connectorType` omformer den standardiserte konvolutten til en chat-melding; konfigureres helt i B1Admin, uten tredjepartskonto.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — en `mailchimp`-`connectorType` som synkroniserer personer til en Mailchimp-målgruppe og knytter gruppe-/listemedlemskap til tagger (`Api/src/shared/webhooks/MailchimpConnector.ts`). I motsetning til chat-koblingene sender den sine egne autentiserte forespørsler per hendelse (opprett/oppdater, arkiver, tagg) i stedet for å POST-e til en URL oppgitt av menigheten; API-nøkkelen og målgruppe-ID-en lagres kryptert i `webhooks.connectorConfig`. Enveis, kun standardiserte flettefelt.
- **[Zapier](/docs/b1-admin/integrations/zapier)** og **[Make](/docs/b1-admin/integrations/make)** — utløses av webhook-hendelser og handler via REST API-et; de registrerer sin egen webhook når en Zap/scenario slås på (krever en nøkkel med `settings:write`). Kildekoden til Zapier-appen ligger i repositoriet `Integrations` under `zapier/` (Zapier CLI, publisert med `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — et tilleggsprogram med API-nøkkelautentisering som eksporterer Personer / Donasjoner / Grupper / Oppmøte på forespørsel.
- **[Claude](/docs/b1-admin/integrations/claude)** og **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP-klienter som peker til `/mcp`.

For din egen kode pakker **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) alt dette: en typet REST-klient, en OAuth-klient (auth-code / refresh / device-flyt) og en HMAC-webhookverifisering med Express-middleware.

## Relaterte sider

- [API-nøkler](../api/api-keys) — den enkleste legitimasjonen og scope-katalogen
- [Tilkoblede apper og OAuth](../api/connected-apps) — samtykkeflyter for flere leietakere
- [Webhooks](../api/webhooks) — systemet for utgående hendelser
- [MCP-server](../api/mcp) — AI-integrasjonens innpakning
- [FreePlay-innholdsleverandør](../freeplay-content-provider) — å bli en innkommende innholdskilde
- [Integrasjoner (sluttbruker)](/docs/b1-admin/integrations/) — oppsettguider for ferdigbygde koblinger
