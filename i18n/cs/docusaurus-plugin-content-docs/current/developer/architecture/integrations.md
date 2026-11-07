---
title: "Integrační a rozšiřující plocha"
---

# Integrační a rozšiřující plocha

<div class="article-intro">

Vše, co se může třetí strana připojit, prochází jedním API a jedním autorizačním modelem. Tato stránka je mapa: pojmenovává každou integrační plochu, ukazuje, jak spolu souvisejí, a odkazuje na podrobnou referenci ke každé z nich. Pokud vytváříte něco nad B1, začněte zde, vyberte správné rozhraní a pokračujte odkazem na stránku, která ho popisuje do hloubky.

</div>

## Přehled ploch

Existuje šest způsobů, jak dovnitř a ven, a všechny sdílejí stejnou autentizační vrstvu:

- **[REST API](../api/api-keys)** — celý produktový povrch, volatelný s bearer tokenem z jakéhokoli jazyka.
- **[API klíče](../api/api-keys)** — nejjednodušší přihlašovací údaj: token `cak_…` vázaný na jednu osobu v jednom sboru.
- **[OAuth 2.0 a propojené aplikace](../api/connected-apps)** — souhlas na úrovni sboru pro vícenájemcové aplikace; vydává stejný JWT, jaký dostane uživatel.
- **[Webhooky](../api/webhooks)** — podepsané, trvale doručované odchozí události.
- **[MCP server](../api/mcp)** — wrapper nad REST API určený pro AI na `/mcp`.
- **[Poskytovatelé obsahu](../freeplay-content-provider)** — příchozí cesta pro externí mediální knihovny do FreePlay a aplikací B1.

Vše kromě poskytovatelů obsahu obsluhuje jediné monolitické API (repozitář [Api](https://github.com/ChurchApps/Api)), jehož moduly jsou připojeny pod stabilními základními cestami — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` a `/mcp`.

## Jak to spolu souvisí

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

Tři šipky vyprávějí celý příběh: třetí strana **volá dovnitř** s bearer tokenem (API klíč nebo OAuth JWT, včetně přes `/mcp`); API **volá zpět ven** přes podepsané webhooky; a poskytovatelé obsahu jsou jedinou **příchozí cestou obsahu**, kde je sám B1 OAuth *klientem* a stahuje média z externího zdroje.

## Sdílený autentizační model

Každý přihlašovací údaj — přihlašovací JWT uživatele, OAuth přístupový token nebo API klíč — se přeloží na **stejný `Principal`** a kontroluje se stejným způsobem. Neexistuje žádná oddělená „integrační autentizace“; omezený přihlašovací údaj je prostě nerozeznatelný od uživatele s nižšími oprávněními.

### Struktura JWT

Přístupové tokeny B1 jsou HS256 JWT vydávané v `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Sada claimů:

| Claim | Význam |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Osoba, ke které token patří |
| `churchId` | Jediný sbor, v jehož rámci tento token jedná — kotva pro veškeré určování rozsahu dat |
| `personId` | Záznam osoby uvnitř daného sboru |
| `permissions` | Plochý pole řetězců oprávnění RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Členství ve skupinách / vedení skupin, pro kontroly v rámci skupiny |
| `membershipStatus` | Host vs. člen, pro řízení samoobsluhy |

OAuth přístupový token má přesně stejný tvar jako přihlašovací JWT — jediný rozdíl je v tom, že jeho pole `permissions` bylo **před podepsáním přefiltrováno přes udělené rozsahy** (`getCombinedApiJwt(...)`).

### Určování rozsahu podle sboru

`churchId` je claim tokenu, nikoli parametr požadavku, takže přihlašovací údaj nikdy nemůže zasáhnout do jiných sborů. Každý dotaz do repozitáře filtruje podle `churchId` volajícího; API klíč nebo OAuth token je vázán přesně na jeden sbor v okamžiku vydání.

### Oprávnění založená na rolích na hranici

Kontrolery omezují akce voláním `au.checkAccess(contentType, action)` proti poli `permissions` tokenu. Rozsahy jsou **filtr, nikoli udělení** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` mapuje každý rozsah (např. `people:read`, `donations:write`) na dvojice RBAC, které povoluje, a `filterPermissionsByScopes()` provádí průnik s *aktuálními* oprávněními osoby při každém ověření. Důsledky:

- Odebrání oprávnění v B1Admin odebere přístup přihlašovacímu údaji při dalším požadavku — tokeny se nikdy neodchylují od role.
- Rozsah může oprávnění pouze *odebírat*, takže omezený přihlašovací údaj nikdy nemůže povýšit na správce serveru nebo domény (tato oprávnění jsou záměrně nenamapována na žádný rozsah).
- API klíče nesou prefix `cak_`; `CustomAuthProvider.getUser()` se podle něj větví, hashuje tajemství a při každém volání znovu načte aktuální oprávnění RBAC vlastnící osoby.

Úplný katalog rozsahů viz [API klíče → Rozsahy](../api/api-keys#scopes).

## Přehled referencí ploch

### REST API

Kompletní produktový povrch. Jakýkoli ověřený endpoint přijímá buď JWT, nebo `cak_…` API klíč v hlavičce `Authorization: Bearer` — neexistuje samostatná tabulka tras pouze pro klíče nebo pouze pro OAuth. Moduly a jejich základní cesty leží pod `Api/src/modules/*`.

### API klíče

Osobní přístupový token `cak_<prefix>.<secret>`, vytvořený v **B1Admin → Nastavení → Vývojář → API klíče**. Ukládá se pouze hash SHA-256; surový klíč se zobrazí jednou. Spravuje se na `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Nejvhodnější pro vlastní skripty jednoho sboru a pro konektory jako Zapier, Make a Google Sheets. → **[API klíče](../api/api-keys)**

### OAuth 2.0 a propojené aplikace

Pro vícenájemcové aplikace, které potřebují souhlas každého sboru. Implementováno v `Api/src/modules/membership/controllers/OAuthController.ts` pod `/membership/oauth`. Server podporuje tři granty:

- **Authorization Code** — `POST /oauth/authorize` (ověřený) vrátí krátkodobý kód; `POST /oauth/token` s `grant_type=authorization_code` jej vymění za přístupový JWT (přibližně 7 dní) a refresh token (přibližně 90 dní). Veřejní klienti bez tajemství musí použít PKCE (pouze `S256`): `code_challenge` při autorizaci a odpovídající `code_verifier` při výměně tokenu.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` vydá `user_code`; uživatel jej schválí v B1Admin (`/oauth/device/approve`); zařízení dotazuje `/oauth/token` s grantem device-code. Určeno pro TV, kiosky a CLI bez prohlížeče.
- **Refresh Token** — `grant_type=refresh_token` vydá nový přístupový token; veřejní klienti bez tajemství mohou tajemství vynechat.

Veřejní klienti se mohou také sami registrovat přes `POST /oauth/register` (dynamická registrace klienta podle RFC 7591); dostanou `client_id` bez tajemství a jejich redirect URI musí být `https` nebo loopback.

**Propojená aplikace** je pohled na udělený token z pohledu správce sboru; seznam a možnost odvolání je na `/membership/oauth/connections`. Kontroler také hostuje most **relay-session** OAuth (`/oauth/relay/*`), který umožňuje zařízení bez prohlížeče dokončit přihlášení proti *externímu* poskytovateli. → **[Propojené aplikace a OAuth](../api/connected-apps)**

### Webhooky

Jediná odchozí plocha. Sbor přihlásí k odběru událostí veřejný HTTPS endpoint; když nastane odpovídající změna, `WebhookDispatcher.emit(churchId, event, payload)` obohatí payloady obsahující pouze ID o zobrazovaná jména (`personName`, `groupName`, `formName` — vyhledávání proběhne jen tehdy, když se odběr shoduje), zaznamená doručení a na pozadí worker odešle podepsanou JSON obálku s opakováním, backoffem a opětovným doručením. Engine je v `Api/src/shared/webhooks/`, CRUD pro každý sbor pod `/membership/webhooks` (`WebhookController.ts`). Pole `connectorType` přetváří tělo pro Slack a Discord; konektor `mailchimp` jde dál a vlastní celou HTTP výměnu (metoda, URL a autentizace pro každou událost vůči API Mailchimpu; přihlašovací údaje jsou šifrované v `webhooks.connectorConfig`). → **[Webhooky](../api/webhooks)**

### MCP server

AI wrapper na `/mcp` (`Api/src/modules/mcp/`). Tři generické nástroje — `list_endpoints`, `describe_endpoint`, `api_call` — dynamicky zpřístupňují celou REST plochu jakémukoli MCP klientovi. Autentizace je stejný bearer token jako u všeho ostatního. Pro klienty, kteří se přihlašují přes OAuth (vlastní konektory claude.ai), nese odpověď 401 z `/mcp` hlavičku `WWW-Authenticate` ukazující na `/.well-known/oauth-protected-resource`, a `/.well-known/oauth-authorization-server` inzeruje endpointy `/membership/oauth`, dynamickou registraci, PKCE a stránku souhlasu B1Admin `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` znovu vstupuje do Express zásobníku in-process, takže se uplatní každé pravidlo oprávnění a určování rozsahu podle sboru. → **[MCP server](../api/mcp)**

### Poskytovatelé obsahu

Příchozí cesta obsahu je v samostatném balíčku `Packages/content-providers` (`@churchapps/content-providers`), nikoli v API. Každý poskytovatel implementuje rozhraní `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` a háčky autentizace — a sám se registruje do registru `Map` (`src/providers/registry.ts`). Zde je **B1 OAuth klientem**: poskytovatel deklaruje `AuthType` jako `none`, `oauth_pkce`, `device_flow` nebo `form_login` a sdílené pomocné funkce (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) provádějí na straně klienta PKCE nebo device flow vůči externímu zdroji. Dnes je dodáváno jedenáct poskytovatelů — včetně Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church a B1.church — které napájejí FreePlay a aplikace B1. → **[FreePlay poskytovatel obsahu](../freeplay-content-provider)**

**Plány na rok** využívají tuto cestu. Autor kurikula (s oprávněním `lessons.edit`) udržuje uspořádané sekvence týdne 1/2/3 v administraci Lessons.church (tabulky `LessonsApi` `yearPlans` a `yearPlanWeeks`, s volitelným `startMonth` a per-týdenní `anchor` `easter` nebo `christmas`). `GET /yearPlans/public` na LessonsApi doručuje živé plány anonymně a u každého týdne doplní program, studii a místo ze stromu lekcí. V **B1Admin → Servírování → Plány → Naplánovat lekci → Použít plán na rok** se tento endpoint použije a zapíše se jeden plán DoingApi na každý zahrnutý týden (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Plány s `startMonth` přiřadí kotvené týdny k vybranému roku (Velikonoce podle gregoriánského výpočtu, Vánoce jako neděle na den nebo před 25. prosincem) a vyplní úseky mezi nimi; plány bez `startMonth` stále mapují týden N na `startDate + (N−1)×7` dní. Týdny z externích poskytovatelů OLF nebo s neúplnou cestou se při aplikaci přeskočí. Sbory plány upravují jako jakékoli jiné a FreePlay přehraje to, co je na plánu.

## Shrnutí

| Plocha | Mechanismus autentizace | Směr | Kde je implementováno | Reference |
|---|---|---|---|---|
| REST API | `Bearer` JWT nebo klíč `cak_…` | Příchozí | `Api/src/modules/*` | [API klíče](../api/api-keys) |
| API klíče | Token `cak_` hashovaný SHA-256 | Přihlašovací údaj | `Api/.../membership/controllers/ApiKeyController.ts` | [API klíče](../api/api-keys) |
| OAuth 2.0 / Propojené aplikace | Auth code (PKCE) · device · refresh → JWT; dynamická registrace klienta | Příchozí | `Api/.../membership/controllers/OAuthController.ts` | [Propojené aplikace](../api/connected-apps) |
| Webhooky | Tajemství pro každý hook, podpis HMAC-SHA256 | Odchozí | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooky](../api/webhooks) |
| MCP server | `Bearer` JWT, OAuth JWT (objevený přes `/.well-known`), nebo klíč `cak_…` | Příchozí (AI) | `Api/src/modules/mcp/` | [MCP server](../api/mcp) |
| Poskytovatelé obsahu | Podle poskytovatele: žádný / OAuth PKCE / device / formulář | Příchozí obsah | `Packages/content-providers/` | [Poskytovatel obsahu](../freeplay-content-provider) |

## Hotové konektory

Místo toho, aby si každý budoval vše od začátku, ChurchApps dodává konektory postavené nad výše uvedenými plochami:

- **[Slack a Discord](/docs/b1-admin/integrations/slack-discord)** — `connectorType` webhooku přetvoří standardní obálku na chatovou zprávu; nastavuje se celé v B1Admin, bez účtu třetí strany.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — `connectorType` `mailchimp`, který synchronizuje osoby do publika Mailchimp a mapuje členství ve skupinách a seznamech na štítky (`Api/src/shared/webhooks/MailchimpConnector.ts`). Na rozdíl od chatových konektorů vydává vlastní ověřené požadavky pro každou událost (upsert, archive, tag) místo POSTu na URL dodanou sborem; API klíč a ID publika jsou šifrované v `webhooks.connectorConfig`. Jednosměrné, pouze standardní slučovací pole.
- **[Zapier](/docs/b1-admin/integrations/zapier)** a **[Make](/docs/b1-admin/integrations/make)** — spouštějí se na události webhooku a jednají přes REST API; když se Zap nebo scénář zapne, registrují si vlastní webhook (potřebují klíč s `settings:write`). Zdrojový kód aplikace Zapier je v repozitáři `Integrations` pod `zapier/` (Zapier CLI, nasazováno příkazem `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — doplněk ověřený API klíčem, který na požádání exportuje Osoby, Dary, Skupiny a Účast.
- **[Claude](/docs/b1-admin/integrations/claude)** a **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP klienti nasměrovaní na `/mcp`.

Pro vlastní kód obaluje **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) to vše: typovaný REST klient, OAuth klient (auth-code, refresh a device flow) a ověřovač webhooků HMAC s middleware pro Express.

## Související stránky

- [API klíče](../api/api-keys) — nejjednodušší přihlašovací údaj a katalog rozsahů
- [Propojené aplikace a OAuth](../api/connected-apps) — toky souhlasu pro vícenájemcové aplikace
- [Webhooky](../api/webhooks) — systém odchozích událostí
- [MCP server](../api/mcp) — AI integrační wrapper
- [FreePlay poskytovatel obsahu](../freeplay-content-provider) — jak se stát příchozím zdrojem obsahu
- [Integrace (pro koncové uživatele)](/docs/b1-admin/integrations/) — průvodci nastavením hotových konektorů
