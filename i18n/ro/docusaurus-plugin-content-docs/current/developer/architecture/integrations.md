---
title: "Suprafața de integrare și extindere"
description: "Harta tuturor modurilor de a vă conecta la ChurchApps B1: REST API, chei API, OAuth, webhook-uri, MCP și furnizori de conținut, cu linkuri către fiecare referință."
---

# Suprafața de integrare și extindere

<div class="article-intro">

Orice poate fi conectat de o terță parte funcționează printr-o singură API și un singur model de autorizare. Această pagină este harta: numește fiecare suprafață de integrare, arată cum se conectează între ele și trimite la documentația detaliată pentru fiecare. Dacă dezvolți pentru B1, începe aici ca să alegi ușa potrivită, apoi urmează linkul către pagina care o documentează în detaliu.

</div>

## Suprafețele, pe scurt

Există șase moduri de intrare sau ieșire, iar toate folosesc același strat de autentificare:

- **[REST API](../api/api-keys.md)** — întreaga suprafață a produsului, accesibilă cu un token bearer din orice limbaj de programare.
- **[Chei API](../api/api-keys.md)** — cea mai simplă credențială: un token `cak_…` legat de o persoană dintr-o singură biserică.
- **[OAuth 2.0 și aplicații conectate](../api/connected-apps.md)** — consimțământ pe biserică pentru aplicații multi-tenant; emite același JWT pe care îl primește un utilizator.
- **[Webhook-uri](../api/webhooks.md)** — evenimente de ieșire semnate, livrate durabil.
- **[Server MCP](../api/mcp.md)** — un strat destinat inteligenței artificiale peste REST API, disponibil la `/mcp`.
- **[Furnizori de conținut](../freeplay-content-provider.md)** — calea de intrare pentru bibliotecile media externe în FreePlay și în aplicațiile B1.

Tot ce nu ține de furnizorii de conținut este servit de o singură API monolitică (repository-ul [Api](https://github.com/ChurchApps/Api)), ale cărei module sunt montate sub căi de bază stabile: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` și `/mcp`.

## Cum se îmbină totul

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Aplicație terță     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cheie cak_ ─┐                  │  │
   │  · CLI / scripturi   │                          │  │   JWT OAuth   ┴▶ Principal       │  │
   │  · client AI (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopuri filtrează → permissions[] │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Module API: /membership /giving      │
             │        POST JSON semnat                │  /attendance /content /messaging …    │
             │   (persoană / donație / grup / …)      │                   │                    │
             └──────────── webhook-uri ◀──────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durabile, semnate HMAC-SHA256)  └───────────────────────────────────────┘

   Surse externe de conținut (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / fără autentificare  ──  aici B1 este clientul OAuth  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / aplicații B1        (calea conținutului de intrare)
```

Trei săgeți spun toată povestea: o terță parte **apelează** cu un token bearer (cheie API sau JWT OAuth, inclusiv prin `/mcp`); API-ul **apelează înapoi** prin webhook-uri semnate; iar furnizorii de conținut sunt singura cale de **conținut de intrare**, unde B1 însuși este clientul OAuth care trage media dintr-o sursă externă.

## Modelul comun de autentificare

Orice credențială (JWT-ul de autentificare al unui utilizator, un token de acces OAuth sau o cheie API) se rezolvă în același **`Principal`** și este verificată în același fel. Nu există o cale separată de „autentificare pentru integrări”; o credențială cu scopuri nu se deosebește de un utilizator cu privilegii mai reduse.

### Structura JWT

Tokenurile de acces B1 sunt JWT-uri HS256 emise în `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Setul de revendicări (claims):

| Revendicare | Semnificație |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Persoana din spatele tokenului |
| `churchId` | Singura biserică în care acționează tokenul — ancora pentru toată delimitarea datelor |
| `personId` | Înregistrarea persoanei din acea biserică |
| `permissions` | Array plat de șiruri de permisiuni RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Apartenența și conducerea grupurilor, pentru verificări la nivel de grup |
| `membershipStatus` | Oaspete sau membru, pentru restricționarea serviciilor self-service |

Un token de acces OAuth are exact aceeași formă ca un JWT de autentificare. Singura diferență este că array-ul său `permissions` a fost **filtrat prin scopurile acordate înainte de semnare** (`getCombinedApiJwt(...)`).

### Delimitarea pe biserică

`churchId` este o revendicare a tokenului, nu un parametru al cererii, deci o credențială nu poate ajunge niciodată în alte biserici. Fiecare interogare din repository filtrează după `churchId` al apelantului. O cheie API sau un token OAuth este legat de exact o biserică în momentul emiterii.

### Permisiuni pe bază de roluri, la graniță

Controllerele restricționează acțiunile cu `au.checkAccess(contentType, action)`, verificând array-ul `permissions` al tokenului. Scopurile sunt un **filtru, niciodată o acordare** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` asociază fiecărui scop (de exemplu `people:read`, `donations:write`) perechile RBAC pe care le permite, iar `filterPermissionsByScopes()` intersectează aceste perechi cu permisiunile *actuale* ale persoanei, la fiecare rezolvare. Consecințele:

- Revocarea unei permisiuni în B1Admin îi taie credențialei accesul la următoarea cerere. Tokenurile nu se abat niciodată de la rolul din care provin.
- Un scop poate doar să *elimine* permisiuni, deci o credențială cu scopuri nu poate ajunge la administrarea serverului sau a domeniului (aceste permisiuni nu sunt asociate intenționat cu niciun scop).
- Cheile API au prefixul `cak_`. `CustomAuthProvider.getUser()` verifică acest prefix, face hash pe secret și reface rezolvarea RBAC-ului live al persoanei proprietare la fiecare apel.

Pentru catalogul complet de scopuri, vezi [Chei API → Scopuri](../api/api-keys.md#scopes).

## Referința suprafețelor

### REST API

Suprafața completă a produsului. Orice endpoint autentificat acceptă fie un JWT, fie o cheie API `cak_…` în antetul `Authorization: Bearer`. Nu există un tabel separat de rute doar pentru chei sau doar pentru OAuth. Modulele și căile lor de bază se află sub `Api/src/modules/*`.

### Chei API

Un token personal de acces `cak_<prefix>.<secret>`, creat în **B1Admin → Settings → Developer → API Keys**. Se stochează doar un hash SHA-256; cheia brută se afișează o singură dată. Se gestionează la `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Este cel mai potrivit pentru scripturile unei singure biserici și pentru conectori precum Zapier, Make și Google Sheets. → **[Chei API](../api/api-keys.md)**

### OAuth 2.0 și aplicații conectate

Pentru aplicații multi-tenant, care trebuie ca fiecare biserică să își dea acordul. Implementat în `Api/src/modules/membership/controllers/OAuthController.ts`, sub `/membership/oauth`. Serverul acceptă trei tipuri de acordare (grants):

- **Authorization Code**: `POST /oauth/authorize` (autentificat) returnează un cod de scurtă durată. `POST /oauth/token` cu `grant_type=authorization_code` îl schimbă pe un JWT de acces (≈ 7 zile) și pe un refresh token (≈ 90 de zile). Clienții publici (fără secret) trebuie să folosească PKCE (doar `S256`): un `code_challenge` la autorizare și `code_verifier` corespunzător la schimbul de token.
- **Device Code** (RFC 8628): `POST /oauth/device/authorize` emite un `user_code`. Utilizatorul îl aprobă în B1Admin (`/oauth/device/approve`), iar dispozitivul interoghează `/oauth/token` cu grant-ul device code. Este pentru televizoare, chioșcuri și CLI-uri fără browser.
- **Refresh Token**: `grant_type=refresh_token` emite un nou token de acces. Clienții publici (fără secret) pot omite secretul.

Clienții publici se pot înregistra singuri cu `POST /oauth/register` (înregistrare dinamică de client, RFC 7591). Primesc un `client_id` fără secret, iar URI-urile lor de redirecționare trebuie să fie `https` sau loopback.

O **aplicație conectată** este vizualizarea tokenului acordat, din perspectiva administratorului bisericii. Aceasta este listată și poate fi revocată la `/membership/oauth/connections`. Controllerul găzduiește și puntea de sesiune de releu OAuth (`/oauth/relay/*`), care permite unui dispozitiv fără browser să finalizeze autentificarea la un furnizor *extern*. → **[Aplicații conectate și OAuth](../api/connected-apps.md)**

### Webhook-uri

Singura suprafață de ieșire. O biserică abonează un endpoint HTTPS public la evenimente. Când apare o modificare relevantă, `WebhookDispatcher.emit(churchId, event, payload)` completează payload-urile care conțin doar ID-uri cu nume afișabile (`personName`, `groupName`, `formName`; căutările se fac doar dacă există un abonament potrivit), înregistrează o livrare, iar un worker în fundal trimite prin POST un envelope JSON semnat, cu reîncercări, backoff și redeliverare. Motorul se află în `Api/src/shared/webhooks/`, iar operațiunile CRUD pentru fiecare biserică sunt sub `/membership/webhooks` (`WebhookController.ts`). Câmpul `connectorType` modifică structura corpului pentru Slack și Discord. Conectorul `mailchimp` merge mai departe și gestionează întreaga conversație HTTP (metodă, URL și autentificare pentru fiecare eveniment, prin API-ul Mailchimp; credențialele sunt criptate în `webhooks.connectorConfig`). → **[Webhook-uri](../api/webhooks.md)**

### Server MCP

Un strat destinat inteligenței artificiale, disponibil la `/mcp` (`Api/src/modules/mcp/`). Trei instrumente generice (`list_endpoints`, `describe_endpoint`, `api_call`) expun dinamic întreaga suprafață REST oricărui client MCP. Autentificarea este același token bearer ca pentru orice altceva. Pentru clienții care se autentifică prin OAuth (conectori personalizați din claude.ai), un răspuns 401 de la `/mcp` include un antet `WWW-Authenticate` care indică spre `/.well-known/oauth-protected-resource`. Endpoint-ul `/.well-known/oauth-authorization-server` anunță endpoint-urile `/membership/oauth`, înregistrarea dinamică, PKCE și pagina de consimțământ `/oauth` din B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` reintră în stack-ul Express în același proces, astfel încât fiecare regulă de permisiuni și de delimitare pe biserică rămâne aplicată. → **[Server MCP](../api/mcp.md)**

### Furnizori de conținut

Calea conținutului de intrare, în pachetul separat `Packages/content-providers` (`@churchapps/content-providers`), nu în API. Fiecare furnizor implementează interfața `IProvider` (`src/interfaces.ts`), adică `browse`, `getPlaylist`, `getInstructions` și hook-urile de autentificare, și se înregistrează singur într-un `Map` de registru (`src/providers/registry.ts`). Aici **B1 este clientul OAuth**: un furnizor declară un `AuthType` de `none`, `oauth_pkce`, `device_flow` sau `form_login`, iar helperele comune (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) rulează fluxurile PKCE și device flow pe partea de client față de sursa externă. Astăzi există unsprezece furnizori, inclusiv Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church și B1.church, care alimentează FreePlay și aplicațiile B1. → **[Furnizor de conținut FreePlay](../freeplay-content-provider.md)**

**Planurile anuale** folosesc această cale. Un editor de curriculum (cu `lessons.edit`) menține secvențe ordonate de săptămâna 1, 2 și 3 în administrarea Lessons.church (tabelele `yearPlans` și `yearPlanWeeks` din `LessonsApi`, cu `startMonth` opțional și `anchor` pe săptămână, `easter` sau `christmas`). `GET /yearPlans/public` din LessonsApi servește anonim planurile active, completând programul, studiul și locul fiecărei săptămâni din arborele lecțiilor. **Serving → Plans → Schedule Lesson → Apply Year Plan** din B1Admin consumă acest endpoint și scrie câte un plan DoingApi pentru fiecare săptămână inclusă (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Planurile cu `startMonth` rezolvă săptămânile ancorate față de anul ales (Paștele prin calculul gregorian, Crăciunul ca duminica din ziua de 25 decembrie sau cea dinaintea acesteia) și completează intervalele dintre ele. Planurile fără `startMonth` asociază în continuare săptămâna N cu `startDate + (N−1)×7` zile. Săptămânile din furnizorii externi OLF sau cele cu o cale incompletă sunt omise la aplicare. Bisericile editează planurile rezultate ca pe orice alt plan, iar FreePlay redă ce se află în plan.

## Sumar

| Suprafață | Mecanism de autentificare | Direcție | Unde este implementat | Referință |
|---|---|---|---|---|
| REST API | JWT `Bearer` sau cheie `cak_…` | Intrare | `Api/src/modules/*` | [Chei API](../api/api-keys.md) |
| Chei API | Token `cak_` cu hash SHA-256 | Credențial | `Api/.../membership/controllers/ApiKeyController.ts` | [Chei API](../api/api-keys.md) |
| OAuth 2.0 / Aplicații conectate | Cod de autorizare (PKCE) · device · refresh → JWT; înregistrare dinamică de client | Intrare | `Api/.../membership/controllers/OAuthController.ts` | [Aplicații conectate](../api/connected-apps.md) |
| Webhook-uri | Secret per hook, semnătură HMAC-SHA256 | Ieșire | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook-uri](../api/webhooks.md) |
| Server MCP | JWT `Bearer`, JWT OAuth (descoperit prin `/.well-known`) sau cheie `cak_…` | Intrare (AI) | `Api/src/modules/mcp/` | [Server MCP](../api/mcp.md) |
| Furnizori de conținut | Per furnizor: fără autentificare / OAuth PKCE / device / formular | Conținut de intrare | `Packages/content-providers/` | [Furnizor de conținut](../freeplay-content-provider.md) |

## Conectori gata făcuți

În loc ca fiecare să construiască totul de la zero, ChurchApps oferă conectori peste suprafețele de mai sus:

- **[Slack și Discord](/docs/b1-admin/integrations/slack-discord)**: un `connectorType` de tip webhook transformă envelope-ul standard într-un mesaj de chat. Se configurează complet în B1Admin, fără un cont terț.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)**: un `connectorType` `mailchimp` care sincronizează persoanele într-o audiență Mailchimp și mapează apartenența la grupuri și liste la etichete (`Api/src/shared/webhooks/MailchimpConnector.ts`). Spre deosebire de conectorii de chat, trimite propriile cereri autentificate pentru fiecare eveniment (upsert, arhivare, etichetare), în loc să trimită POST către un URL furnizat de biserică. Cheia API și ID-ul audienței sunt stocate criptat în `webhooks.connectorConfig`. Sincronizarea este unidirecțională și folosește doar câmpurile standard de îmbinare.
- **[Zapier](/docs/b1-admin/integrations/zapier)** și **[Make](/docs/b1-admin/integrations/make)**: se declanșează la evenimente de webhook și acționează prin REST API. Își înregistrează propriul webhook când un Zap sau un scenariu este activat (necesită o cheie cu `settings:write`). Codul sursă al aplicației Zapier se află în repository-ul `Integrations`, în `zapier/` (CLI-ul Zapier, implementat cu `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)**: un add-on autentificat cu cheie API, care exportă la cerere persoane, donații, grupuri și prezențe.
- **[Claude](/docs/b1-admin/integrations/claude)** și **[ChatGPT](/docs/b1-admin/integrations/chatgpt)**: clienți MCP care indică spre `/mcp`.

Pentru propriul cod, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) împachetează tot acest lucru: un client REST tipizat, un client OAuth (cod de autorizare, reîmprospătare și device flow) și un verificator de webhook-uri HMAC cu middleware pentru Express.

## Pagini conexe

- [Chei API](../api/api-keys.md): cea mai simplă credențială și catalogul de scopuri
- [Aplicații conectate și OAuth](../api/connected-apps.md): fluxuri de consimțământ multi-tenant
- [Webhook-uri](../api/webhooks.md): sistemul de evenimente de ieșire
- [Server MCP](../api/mcp.md): stratul de integrare cu inteligența artificială
- [Furnizor de conținut FreePlay](../freeplay-content-provider.md): cum devii o sursă de conținut de intrare
- [Integrări (pentru utilizatori finali)](/docs/b1-admin/integrations/): ghiduri de configurare a conectorilor gata făcuți
