---
title: "Integrasjon og utvidelsesoverflate"
---

# Integrasjon og utvidelsesoverflate

<div class="article-intro">

Alt en tredjemann kan koble til kjører gjennom ett API og en autorisasjonsmodell. Denne siden er kartet: det navngir hver integrasjonsoverflate, viser hvordan de koblet sammen, og lenker til den detaljerte referansen for hver. Hvis du bygger mot B1, start her for å velge riktig dør, og følg deretter lenken til siden som dokumenterer det i dybden.

</div>

## Overflatene på et blikk

Det er seks veier inn eller ut, og de deler alle samme autentiseringslag:

- **[REST API](../api/api-keys)** — hele produktoverflaten, brukbar med et bearer token fra hvilket som helst språk.
- **[API-nøkler](../api/api-keys)** — den enkleste legitimasjonen: en `cak_…`-token bundet til én person i en kirke.
- **[OAuth 2.0 & tilkoblede apper](../api/connected-apps)** — per-kirke samtykke for multidel-apper; utsteder samme JWT som en bruker får.
- **[Webhooks](../api/webhooks)** — signerte, holdbart-leverte utgående hendelser.
- **[MCP-server](../api/mcp)** — en AI-vendt omhygging over REST-API-et på `/mcp`.
- **[Innholdsleverandører](../freeplay-content-provider)** — inngangsstien for eksterne mediebiblioteker inn i FreePlay og B1-appene.

Alt unntatt innholdsleverandører blir betjent av et enkelt monolitisk API (depotet [Api](https://github.com/ChurchApps/Api)) hvis moduler monteres under stabil basisbaner — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, og `/mcp`.

## Hvordan det passer sammen

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Tredjeapplikasjon   │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ nøkkel ─┐                │  │
   │  · CLI / skript      │                          │  │   OAuth JWT ┴▶ Rektor          │  │
   │  · AI-klient (MCP)   │ ─── POST /mcp ──────────▶ │  │   omfang filter → tillatelser[]│  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API-moduler: /membership /giving     │
             │        signert JSON POST              │  /attendance /content /messaging …    │
             │   (person / gave / gruppe / …)        │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ delt/webhooks/WebhookDispatcher     │
                     (vedvarende, HMAC-SHA256 signert) └───────────────────────────────────────┘

   Eksterne innholdskilder (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / enhetflow / ingen   ──  B1 er OAuth *klienten* her  ──▶
             ▼
   Pakker/innholdsleverandører   ──▶   FreePlay / B1-apper        (inngangsinnholdssti)
```

Tre piler forteller hele historien: en tredjepart **ringer inn** med en bearer token (API-nøkkel eller OAuth JWT, inkludert via `/mcp`); API-et **ringer ut** gjennom signerte webhooks; og innholdsleverandører er den ene **inngangsinnhold**-stien hvor B1 selv er OAuth *klienten* som trekker media fra en ekstern kilde.

## Delt autorisasjonsmodell

Hver legitimasjon — en brukers innloggings-JWT, en OAuth-tilgangtoken eller en API-nøkkel — løser til den samme **`Principal`** og kontrolleres på samme måte. Det er ingen separat "integrerjonsauth"-sti; en omfangsbegrenset legitimasjon er enkelt uadskillelig fra en lavere-privilegerte bruker.

### JWT-struktur

B1-tilgangstokener er HS256-JWTer mynt i `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Kravsettet:

| Krav | Betydning |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Personen bak tokenen |
| `churchId` | Den enkle kirken denne tokenen virker innenfor — ankeret for all datasporing |
| `personId` | Personposten inne i den kirken |
| `permissions` | Flat matrise med RBAC perm-strenger (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppemedlemskap / ledelse, for gruppeomfattet kontroller |
| `membershipStatus` | Gjest vs. medlem, for selvbetjening-gating |

En OAuth-tilgangtoken er byte-for-byte samme form som en innloggings-JWT — den eneste forskjellen er at dens `permissions`-matrise ble **filtrert gjennom de tildelte omfangene før signering** (`getCombinedApiJwt(...)`).

### Per-kirke sporing

`churchId` er et tokenkrav, ikke en forespørselsparameter, så en legitimasjon kan aldri nå på tvers av kirker. Hvert depotspørsmål filtrerer på oppringerens `churchId`; en API-nøkkel eller OAuth-token er bundet til nøyaktig en kirke på myntet tid.

### Rollbaserte tillatelser ved grensen

Kontroller port-handlinger med `au.checkAccess(contentType, action)` mot tokenens `permissions`-matrise. Omfang er et **filter, aldri en tillatelse** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` kartlegger hvert omfang (f.eks. `people:read`, `donations:write`) til RBAC-parene det tillater, og `filterPermissionsByScopes()` krysser det med personens *nåværende* tillatelser på hvert oppløsning. Konsekvenser:

- Tilbakekalling av en tillatelse i B1Admin kutter legitimasjonens tilgang på neste forespørsel — tokener flyter aldri fra rollen.
- Et omfang kan bare *fjerne* tillatelser, så en omfangs-begrenset legitimasjon kan aldri heve seg til server / domenadministrasjon (disse tillatelsene er bevisst umappet til omfang).
- API-nøkler bærer en `cak_`-prefiks; `CustomAuthProvider.getUser()` forgrener på den, hasher hemmeligheten, og oppløser på nytt eierens live RBAC på hvert anrop.

Se [API-nøkler → Omfang](../api/api-keys#scopes) for den fullstendige katalogen.

## Overflatereferanse

### REST API

Den komplette produktoverflaten. Alle autentiserte slutpunkter aksepterer enten en JWT eller en `cak_…`-API-nøkkel i `Authorization: Bearer`-overskriften — det er ingen separat nøkkel-bare eller OAuth-bare ruttetabell. Moduler og basisbaner lever under `Api/src/modules/*`.

### API-nøkler

En `cak_<prefix>.<secret>`-personlig tilgangstoken, opprettet i **B1Admin → Innstillinger → Utvikler → API-nøkler**. Bare en SHA-256-hash blir lagret; den råe nøkkelen vises en gang. Administrert på `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Beste for en enkeltkirkes egne skripter og for konnektorer som Zapier, Make og Google Sheets. → **[API-nøkler](../api/api-keys)**

### OAuth 2.0 og tilkoblede apper

For multidel-apper som trenger hver kirkens samtykke. Implementert i `Api/src/modules/membership/controllers/OAuthController.ts` under `/membership/oauth`. Serveren støtter tre tillatelser:

- **Autorisasjonskode** — `POST /oauth/authorize` (autentisert) returnerer en kortlivet kode; `POST /oauth/token` med `grant_type=authorization_code` bytter den mot en tilgangsjwt (≈ 7 dager) pluss en oppfriskningstoken (≈ 90 dager).
- **Enhetskode** (RFC 8628) — `POST /oauth/device/authorize` utsteder en `user_code`; brukeren godkjenner den i B1Admin (`/oauth/device/approve`); enheten sender `/ oauth/token` med enhetskodegodkjenningen. For TV-er, kiosker og CLI-er uten nettleser.
- **Oppfriskningstoken** — `grant_type=refresh_token` myntner en ny tilgangstoken; offentlige (hemmelighetsløse) klienter kan utelate hemmeligheten.

En **tilkoblet app** er kirkadministrator-møtesynet av en tildelt token, oppført og tilbakekallbart på `/membership/oauth/connections`. Kontrolleren er også vert for en OAuth **relay-sesjon**-bru (`/oauth/relay/*`) som lar en nettleserløs enhet fullføre en innlogging mot en *ekstern* leverandør. → **[Tilkoblede apper og OAuth](../api/connected-apps)**

### Webhooks

Den eneste utgångoverflaten. En kirke abonnerer på en offentlig HTTPS-slutpunkt til hendelser; når en samsvarte endring oppstår, `WebhookDispatcher.emit(churchId, event, payload)` rikstofferer id-kun payloads med visningsnavn (`personName`, `groupName`, `formName` — oppslag kjøres bare når et abonnement samsvarer), registrerer en levering, og en bakgrunnsarbeider POSTer en signert JSON-konvolutt med retry/backoff og genlevering. Motor på `Api/src/shared/webhooks/`, per-kirke CRUD under `/membership/webhooks` (`WebhookController.ts`). Et `connectorType`-felt omformer kroppen for Slack / Discord; `mailchimp`-koblingen går videre og eier hele HTTP-utvekslingen (per-hendelse metode/URL/auth mot Mailchimp-API-et, legitimasjon kryptert i `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP-server

En AI-vendt omhygging på `/mcp` (`Api/src/modules/mcp/`). Tre generiske verktøy — `list_endpoints`, `describe_endpoint`, `api_call` — eksponerer hele REST-overflaten dynamisk til en hvilken som helst MCP-klient. Auth er samme bearer token som alt annet, og `api_call` re-enterer Express-stabelen in-process slik at alle tillatelser og kirke-sporing-regler fortsatt gjelder. → **[MCP-server](../api/mcp)**

### Innholdsleverandører

Inngangsinnholdsstien, i separat pakken `Packages/content-providers` (`@churchapps/content-providers`) snarere enn API-et. Hver leverandør implementerer `IProvider`-grensesnittet (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, pluss auth-hooker — og selv-registrerer inn i et `Map`-register (`src/providers/registry.ts`). Her **B1 er OAuth-klienten**: en leverandør erklærer en `AuthType` på `none`, `oauth_pkce`, `device_flow` eller `form_login`, og delt hjelpere (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) kjør klient-siden PKCE / enhetflow mot den eksterne kilden. Elleve leverandører sendes i dag — inkludert Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church og B1.church — fôring FreePlay og B1-appene. → **[FreePlay-innholdsleverandør](../freeplay-content-provider)**

## Sammendrag

| Overflate | Autentiseringsmekanisme | Retning | Hvor implementert | Referanse |
|---|---|---|---|---|
| REST API | `Bearer` JWT eller `cak_…` nøkkel | Inngang | `Api/src/modules/*` | [API-nøkler](../api/api-keys) |
| API-nøkler | SHA-256-hashet `cak_`-token | Legitimasjon | `Api/.../membership/controllers/ApiKeyController.ts` | [API-nøkler](../api/api-keys) |
| OAuth 2.0 / tilkoblede apper | Auth kode · enhet · oppfrisk → JWT | Inngang | `Api/.../membership/controllers/OAuthController.ts` | [Tilkoblede apper](../api/connected-apps) |
| Webhooks | Per-hook hemmelighet, HMAC-SHA256 signatur | Utgang | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-server | `Bearer` JWT eller `cak_…` nøkkel | Inngang (AI) | `Api/src/modules/mcp/` | [MCP-server](../api/mcp) |
| Innholdsleverandører | Per-leverandør: ingen / OAuth PKCE / enhet / form | Inngangsinnhold | `Packages/content-providers/` | [Innholdsleverandør](../freeplay-content-provider) |

## Forhåndsbygde konnektorer

I stedet for at alle bygger fra bunnen av, sendes ChurchApps konnektorer på toppen av overflatene ovenfor:

- **[Slack og Discord](/docs/b1-admin/integrations/slack-discord)** — en webhook `connectorType` omformer standardkonvolutten til en chats-melding; konfigurert helt i B1Admin, ingen tredjepart-konto.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — en `mailchimp` connectorType som synkroniserer mennesker inn i en Mailchimp-publikum og kartlegger gruppe-/listemedlemskap til tagger (`Api/src/shared/webhooks/MailchimpConnector.ts`). I motsetning til chattekonnektorene utsteder den sine egne autentiserte forespørsler per hendelse (upsert/arkiv/tag) i stedet for å POSTe til en kirkefylkt URL; API-nøkkelen og publikum-idén lever kryptert i `webhooks.connectorConfig`. Enveisrettet, bare standardflettfelt.
- **[Zapier](/docs/b1-admin/integrations/zapier)** og **[Make](/docs/b1-admin/integrations/make)** — utløst på webhook-hendelser og virke via REST-API-et; de registrerer sin egen webhook når en Zap/scenario slås på (trenger en nøkkel med `settings:write`). Zapier-appens kilde lever i `Integrations`-depotet under `zapier/` (Zapier CLI, distribuert med `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — en API-nøkkel-autentisert tillegg som eksporterer personer / gaver / grupper / oppmøte på forespørsel.
- **[Claude](/docs/b1-admin/integrations/claude)** og **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP-klienter pekt på `/mcp`.

For din egen kode, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) omhygger alt: en typet REST-klient, en OAuth-klient (auth-kode / oppfrisk / enhetflow) og en HMAC webhook-verifikator med Express-middleware.

## Relaterte sider

- [API-nøkler](../api/api-keys) — den enkleste legitimasjonen og omfangkatalogen
- [Tilkoblede apper og OAuth](../api/connected-apps) — flertennant-samtykkeflyter
- [Webhooks](../api/webhooks) — utgåengelsessystemet
- [MCP-server](../api/mcp) — AI-integreringsomhyggingen
- [FreePlay-innholdsleverandør](../freeplay-content-provider) — blive en inngangsinnholdskilde
- [Integrasjoner (sluttbruker)](/docs/b1-admin/integrations/) — forhåndsbyggede konnektøroppsettveiledninger
