---
title: "Rozhrania pre integrácie a rozšírenia"
---

# Rozhrania pre integrácie a rozšírenia

<div class="article-intro">

Všetko, čo sa môže pripojiť tretia strana, beží cez jedno API a jeden autorizačný model. Táto stránka je mapou: pomenúva každé integračné rozhranie, ukazuje, ako sa prepájajú, a odkazuje na podrobnú referenciu ku každému z nich. Ak vytvárate niečo pre B1, začnite tu, vyberte si správne rozhranie a potom pokračujte na stránku, ktorá ho podrobne popisuje.

</div>

## Prehľad rozhraní

Existuje šesť spôsobov vstupu alebo výstupu a všetky zdieľajú rovnakú autentifikačnú vrstvu:

- **[REST API](../api/api-keys)** — celý produktový povrch, volateľný s bearer tokenom z ľubovoľného jazyka.
- **[API kľúče](../api/api-keys)** — najjednoduchšie poverenie: token `cak_…` viazaný na jednu osobu v jednom kostole.
- **[OAuth 2.0 a pripojené aplikácie](../api/connected-apps)** — súhlas na úrovni kostola pre multi-tenant aplikácie; vydáva rovnaký JWT, aký dostane prihlásený používateľ.
- **[Webhooky](../api/webhooks)** — podpísané, spoľahlivo doručované odchádzajúce udalosti.
- **[MCP server](../api/mcp)** — AI-orientovaný obal nad REST API na `/mcp`.
- **[Poskytovatelia obsahu](../freeplay-content-provider)** — prichádzajúca cesta pre externé mediálne knižnice do FreePlay a aplikácií B1.

Všetko okrem poskytovateľov obsahu obsluhuje jediné monolitické API (repozitár [Api](https://github.com/ChurchApps/Api)), ktorého moduly sú pripojené pod stabilné základné cesty — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` a `/mcp`.

## Ako to do seba zapadá

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

Tri šípky vystihujú celý príbeh: tretia strana **volá dnu** s bearer tokenom (API kľúč alebo OAuth JWT, aj cez `/mcp`); API **volá späť von** cez podpísané webhooky; a poskytovatelia obsahu sú jedinou cestou **prichádzajúceho obsahu**, kde je samotné B1 OAuth *klientom*, ktorý sťahuje médiá z externého zdroja.

## Spoločný autentifikačný model

Každé poverenie — prihlasovací JWT používateľa, OAuth prístupový token alebo API kľúč — sa preloží na rovnaký **`Principal`** a overuje sa rovnakým spôsobom. Neexistuje žiadna samostatná cesta „integračnej autentifikácie“; obmedzené poverenie je jednoducho nerozoznateľné od používateľa s nižšími oprávneniami.

### Štruktúra JWT

Prístupové tokeny B1 sú HS256 JWT vytvorené v `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Sada claimov:

| Claim | Význam |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Osoba, ktorá stojí za tokenom |
| `churchId` | Jediný kostol, v ktorom tento token pôsobí — kotva pre všetko rozsahovanie dát |
| `personId` | Záznam osoby v rámci daného kostola |
| `permissions` | Plochý zoznam RBAC reťazcov oprávnení (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Členstvo v skupinách / vedenie skupín, pre kontroly na úrovni skupiny |
| `membershipStatus` | Hosť vs. člen, na riadenie prístupu k samoobslužným funkciám |

Prístupový token OAuth má presne rovnaký tvar ako prihlasovací JWT — jediný rozdiel je v tom, že jeho pole `permissions` bolo **pred podpísaním prefiltrované cez udelené rozsahy** (`getCombinedApiJwt(...)`).

### Rozsahovanie na úrovni kostola

`churchId` je claim tokenu, nie parameter požiadavky, takže poverenie nikdy nemôže zasiahnuť do iného kostola. Každý dotaz do repozitára filtruje podľa `churchId` volajúceho; API kľúč alebo OAuth token je pri vytvorení viazaný presne na jeden kostol.

### Oprávnenia založené na rolách na hranici

Kontroléry obmedzujú akcie volaním `au.checkAccess(contentType, action)` voči poľu `permissions` tokenu. Rozsahy sú **filter, nikdy nie udelenie** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` mapuje každý rozsah (napr. `people:read`, `donations:write`) na dvojice RBAC, ktoré povoľuje, a `filterPermissionsByScopes()` ich prekrižuje s *aktuálnymi* oprávneniami osoby pri každom overení. Dôsledky:

- Odobratie oprávnenia v B1Admin preruší prístup poverenia pri nasledujúcej požiadavke — tokeny sa nikdy neodchýlia od roly.
- Rozsah môže iba *odobrať* oprávnenia, takže obmedzené poverenie sa nemôže povýšiť na správu servera alebo domény (tieto oprávnenia sú zámerne nemapované na žiadny rozsah).
- API kľúče nesú prefix `cak_`; `CustomAuthProvider.getUser()` sa podľa neho rozhoduje, zahešuje tajomstvo a pri každom volaní znovu overí aktuálne RBAC vlastníka.

Úplný katalóg rozsahov nájdete v [API kľúče → Rozsahy](../api/api-keys#scopes).

## Referencia rozhraní

### REST API

Úplný produktový povrch. Každý overený endpoint akceptuje buď JWT, alebo `cak_…` API kľúč v hlavičke `Authorization: Bearer` — neexistuje samostatná tabuľka trás len pre kľúče alebo len pre OAuth. Moduly a ich základné cesty sa nachádzajú pod `Api/src/modules/*`.

### API kľúče

Osobný prístupový token `cak_<prefix>.<secret>`, vytvorený v **B1Admin → Settings → Developer → API Keys**. Ukladá sa iba hash SHA-256; surový kľúč sa zobrazí iba raz. Spravuje sa na `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Najlepšie sa hodí pre vlastné skripty jedného kostola a pre konektory ako Zapier, Make a Google Sheets. → **[API kľúče](../api/api-keys)**

### OAuth 2.0 a pripojené aplikácie

Pre multi-tenant aplikácie, ktoré potrebujú súhlas každého kostola. Implementované v `Api/src/modules/membership/controllers/OAuthController.ts` pod `/membership/oauth`. Server podporuje tri typy udelenia:

- **Authorization Code** — `POST /oauth/authorize` (vyžaduje overenie) vráti krátkodobý kód; `POST /oauth/token` s `grant_type=authorization_code` ho vymení za prístupový JWT (≈ 7 dní) a obnovovací token (≈ 90 dní). Verejní klienti bez tajomstva musia používať PKCE (iba `S256`): `code_challenge` pri autorizácii a zodpovedajúci `code_verifier` pri výmene tokenu.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` vydá `user_code`; používateľ ho schváli v B1Admin (`/oauth/device/approve`); zariadenie dopytuje `/oauth/token` s typom udelenia device-code. Určené pre TV, kiosky a CLI bez prehliadača.
- **Refresh Token** — `grant_type=refresh_token` vydá nový prístupový token; verejní klienti bez tajomstva môžu tajomstvo vynechať.

Verejní klienti sa môžu zaregistrovať aj sami cez `POST /oauth/register` (dynamická registrácia klienta podľa RFC 7591); dostanú `client_id` a žiadne tajomstvo a ich presmerovacie URI musia byť `https` alebo loopback.

**Pripojená aplikácia** je pohľad správcu kostola na udelený token; zobrazuje sa a dá sa odvolať na `/membership/oauth/connections`. Kontrolér tiež hostí most **relačnej relácie** OAuth (`/oauth/relay/*`), ktorý umožňuje zariadeniu bez prehliadača dokončiť prihlásenie cez *externého* poskytovateľa. → **[Pripojené aplikácie a OAuth](../api/connected-apps)**

### Webhooky

Jediné odchádzajúce rozhranie. Kostol prihlási verejný HTTPS endpoint na udalosti; keď nastane zodpovedajúca zmena, `WebhookDispatcher.emit(churchId, event, payload)` obohatí payloady obsahujúce iba ID o zobrazované názvy (`personName`, `groupName`, `formName` — vyhľadávania bežia len vtedy, keď sa predplatné zhoduje), zaznamená doručenie a pozadie spracujúci worker odošle podpísanú JSON obálku s opakovaním a backoffom a opätovným doručením. Engine je v `Api/src/shared/webhooks/`, CRUD pre každý kostol pod `/membership/webhooks` (`WebhookController.ts`). Pole `connectorType` tvarovo upraví telo pre Slack / Discord; konektor `mailchimp` ide ďalej a vlastní celú HTTP výmenu (metóda, URL a autentifikácia pre každú udalosť voči API Mailchimpu; poverenia sú šifrované v `webhooks.connectorConfig`). → **[Webhooky](../api/webhooks)**

### MCP server

AI-orientovaný obal na `/mcp` (`Api/src/modules/mcp/`). Tri generické nástroje — `list_endpoints`, `describe_endpoint`, `api_call` — dynamicky sprístupňujú celý REST povrch ľubovoľnému MCP klientovi. Autentifikácia je rovnaký bearer token ako všade inde. Pre klientov, ktorí sa prihlasujú cez OAuth (vlastné konektory claude.ai), odpoveď 401 z `/mcp` nesie hlavičku `WWW-Authenticate` smerujúcu na `/.well-known/oauth-protected-resource`, a `/.well-known/oauth-authorization-server` inzeruje endpointy `/membership/oauth`, dynamickú registráciu, PKCE a súhlasovú stránku B1Admin `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` vstupuje znovu do Express zásobníka v rámci procesu, takže každé pravidlo oprávnení a rozsahovania kostola stále platí. → **[MCP server](../api/mcp)**

### Poskytovatelia obsahu

Cesta prichádzajúceho obsahu je v samostatnom balíku `Packages/content-providers` (`@churchapps/content-providers`), nie v API. Každý poskytovateľ implementuje rozhranie `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` plus autentifikačné háky — a sám sa registruje do registra `Map` (`src/providers/registry.ts`). Tu je **B1 OAuth klientom**: poskytovateľ deklaruje `AuthType` ako `none`, `oauth_pkce`, `device_flow` alebo `form_login` a zdieľané pomocné funkcie (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) na strane klienta vykonávajú PKCE / device flow voči externému zdroju. Dnes sa dodáva jedenásť poskytovateľov — vrátane Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church a B1.church — a napájajú FreePlay a aplikácie B1. → **[Poskytovateľ obsahu FreePlay](../freeplay-content-provider)**

**Plány na rok** bežia touto cestou. Autor kurikula (s oprávnením `lessons.edit`) udržiava usporiadané sekvencie týždeň 1/2/3 v administrácii Lessons.church (tabuľky `LessonsApi` `yearPlans` / `yearPlanWeeks`, s voliteľným `startMonth` a `anchor` pre každý týždeň `easter` / `christmas`); `GET /yearPlans/public` na LessonsApi anonymne poskytuje aktívne plány a každému týždňu doplní program, štúdium a miesto zo stromu lekcií. V B1Admin **Serving → Plans → Schedule Lesson → Apply Year Plan** tento endpoint spotrebúva a zapíše jeden plán DoingApi pre každý zahrnutý týždeň (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Plány s `startMonth` zarovnajú týždne s kotvou na zvolený rok (Veľká noc podľa gregoriánskeho výpočtu, Vianoce ako nedeľa na deň alebo pred 25. decembrom) a vyplnia úseky medzi nimi; plány bez `startMonth` stále mapujú týždeň N na `startDate + (N−1)×7` dní. Týždne z externých poskytovateľov OLF alebo s neúplnou cestou sa pri aplikovaní preskočia; kostoly výsledné plány upravujú ako každé iné a FreePlay prehrá to, čo je na pláne.

## Súhrn

| Rozhranie | Autentifikačný mechanizmus | Smer | Kde je implementované | Referencia |
|---|---|---|---|---|
| REST API | `Bearer` JWT alebo kľúč `cak_…` | Prichádzajúci | `Api/src/modules/*` | [API kľúče](../api/api-keys) |
| API kľúče | Token `cak_` hashovaný SHA-256 | Poverenie | `Api/.../membership/controllers/ApiKeyController.ts` | [API kľúče](../api/api-keys) |
| OAuth 2.0 / Pripojené aplikácie | Auth code (PKCE) · device · refresh → JWT; dynamická registrácia klienta | Prichádzajúci | `Api/.../membership/controllers/OAuthController.ts` | [Pripojené aplikácie](../api/connected-apps) |
| Webhooky | Tajomstvo pre každý hook, podpis HMAC-SHA256 | Odchádzajúci | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooky](../api/webhooks) |
| MCP server | `Bearer` JWT, OAuth JWT (zistený cez `/.well-known`) alebo kľúč `cak_…` | Prichádzajúci (AI) | `Api/src/modules/mcp/` | [MCP server](../api/mcp) |
| Poskytovatelia obsahu | Podľa poskytovateľa: none / OAuth PKCE / device / form | Prichádzajúci obsah | `Packages/content-providers/` | [Poskytovateľ obsahu](../freeplay-content-provider) |

## Hotové konektory

Namiesto toho, aby si každý budoval všetko od nuly, ChurchApps dodáva konektory nad uvedenými rozhraniami:

- **[Slack a Discord](/docs/b1-admin/integrations/slack-discord)** — `connectorType` webhooku prerobí štandardnú obálku na správu do chatu; nastavuje sa úplne v B1Admin, bez účtu u tretej strany.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — `connectorType` `mailchimp`, ktorý synchronizuje osoby do publika Mailchimp a mapuje členstvo v skupinách a zoznamoch na značky (`Api/src/shared/webhooks/MailchimpConnector.ts`). Na rozdiel od chatových konektorov vykonáva vlastné autentifikované požiadavky pri každej udalosti (upsert, archivácia, značkovanie) namiesto POSTovania na URL zadanú kostolom; API kľúč a ID publika sú uložené šifrovane v `webhooks.connectorConfig`. Ide o jednosmerný prenos iba so štandardnými poľami zlúčenia.
- **[Zapier](/docs/b1-admin/integrations/zapier)** a **[Make](/docs/b1-admin/integrations/make)** — spúšťajú sa na udalostiach webhooku a konajú cez REST API; pri zapnutí Zap alebo scenára si registrujú vlastný webhook (potrebujú kľúč s `settings:write`). Zdrojový kód aplikácie Zapier je v repozitári `Integrations` pod `zapier/` (Zapier CLI, nasadzované príkazom `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — doplnok autentifikovaný API kľúčom, ktorý na požiadanie exportuje Ľudí / Dary / Skupiny / Účasť.
- **[Claude](/docs/b1-admin/integrations/claude)** a **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP klienti nasmerovaní na `/mcp`.

Pre vlastný kód **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) to všetko obaľuje: typovaný REST klient, OAuth klient (auth-code / refresh / device flow) a overovač webhookov HMAC s middleware pre Express.

## Súvisiace stránky

- [API kľúče](../api/api-keys) — najjednoduchšie poverenie a katalóg rozsahov
- [Pripojené aplikácie a OAuth](../api/connected-apps) — toky súhlasu pre multi-tenant aplikácie
- [Webhooky](../api/webhooks) — systém odchádzajúcich udalostí
- [MCP server](../api/mcp) — AI integračný obal
- [Poskytovateľ obsahu FreePlay](../freeplay-content-provider) — ako sa stať zdrojom prichádzajúceho obsahu
- [Integrácie (pre koncových používateľov)](/docs/b1-admin/integrations/) — návody na nastavenie hotových konektorov
