---
title: "Integrációs és bővítési felület"
description: "Térkép minden módról, ahogyan a ChurchApps B1-hez csatlakozhatsz: REST API, API-kulcsok, OAuth, webhookok, MCP és tartalomszolgáltatók, hivatkozásokkal az egyes referenciákhoz."
---

# Integrációs és bővítési felület

<div class="article-intro">

Minden, amit harmadik fél csatlakoztathat, egyetlen API-n és egyetlen jogosultsági modellen keresztül működik. Ez az oldal térkép: megnevezi az összes integrációs felületet, bemutatja, hogyan kapcsolódnak egymáshoz, és mindegyikhez a részletes leírásra hivatkozik. Ha B1-re fejlesztesz, itt kezdj, válaszd ki a megfelelő bejáratot, majd kövesd a hivatkozást a részletesen dokumentált oldalra.

</div>

## A felületek áttekintése

Hat bejárat van be és ki, és mindegyik ugyanazt a hitelesítési réteget használja:

- **[REST API](../api/api-keys.md)** — a teljes termékfelület, amely bármely nyelvről hívható bearer tokennel.
- **[API-kulcsok](../api/api-keys.md)** — a legegyszerűbb hitelesítő adat: egy `cak_…` token, amely egy személyhez és egy gyülekezethez kötött.
- **[OAuth 2.0 és csatlakoztatott alkalmazások](../api/connected-apps.md)** — gyülekezetenkénti hozzájárulás többbérlős alkalmazásokhoz; ugyanazt a JWT-t adja ki, mint amit a felhasználó kap.
- **[Webhookok](../api/webhooks.md)** — aláírt, tartósan kézbesített kimenő események.
- **[MCP-szerver](../api/mcp.md)** — AI-barát burkoló a REST API fölött a `/mcp` útvonalon.
- **[Tartalomszolgáltatók](../freeplay-content-provider.md)** — a külső médiatárak bejövő útja a FreePlay-be és a B1 alkalmazásokba.

A tartalomszolgáltatók kivételével minden egyetlen monolitikus API-n keresztül érhető el (az [Api](https://github.com/ChurchApps/Api) tárolóban), amelynek moduljai stabil alap útvonalak alatt csatlakoznak: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` és `/mcp`.

## Hogyan illeszkedik össze

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

Három nyíl mondja el a teljes történetet: egy harmadik fél egy bearer tokennel **hív be** (API-kulcs vagy OAuth JWT, többek között a `/mcp` útvonalon keresztül); az API aláírt webhookokon keresztül **visszahív**; a tartalomszolgáltatók pedig az egyetlen **bejövő tartalmi** útvonal, ahol maga a B1 az OAuth *kliens*, amely médiát húz le egy külső forrásból.

## A közös hitelesítési modell

Minden hitelesítő adat (a felhasználó bejelentkezési JWT-je, egy OAuth hozzáférési token vagy egy API-kulcs) ugyanarra a **`Principal`**-ra oldódik fel, és ugyanúgy ellenőrződik. Nincs külön „integrációs hitelesítési” út; egy hatókörrel korlátozott hitelesítő adat egyszerűen megkülönböztethetetlen egy alacsonyabb jogosultságú felhasználótól.

### JWT szerkezete

A B1 hozzáférési tokenjei HS256 JWT-k, amelyeket az `Api/src/modules/membership/auth/AuthenticatedUser.ts` állít ki. A claim-készlet:

| Claim | Jelentés |
|---|---|
| `id`, `email`, `firstName`, `lastName` | A tokent birtokló személy |
| `churchId` | Az egyetlen gyülekezet, amelyen belül ez a token működik; minden adatkezelés alapja |
| `personId` | A személy rekordja abban a gyülekezetben |
| `permissions` | Lapos RBAC jogosultsági karakterlánc-tömb (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Csoporttagság és csoportvezetés, csoport-hatókörű ellenőrzésekhez |
| `membershipStatus` | Vendég vagy tag, az önkiszolgáló korlátozásokhoz |

Az OAuth hozzáférési token bájtra pontosan ugyanolyan alakú, mint a bejelentkezési JWT. Az egyetlen különbség, hogy a `permissions` tömböt a kiállítás előtt a megadott hatókörökön **szűrték** (`getCombinedApiJwt(...)`).

### Gyülekezetenkénti hatókör

A `churchId` token-claim, nem kérésparaméter, így egy hitelesítő adat soha nem érhet el más gyülekezeteket. Minden tárolólekérdezés a hívó `churchId`-jára szűr; egy API-kulcs vagy OAuth token a kiállításkor pontosan egy gyülekezethez kötődik.

### Szerepalapú jogosultságok a határon

A vezérlők a `au.checkAccess(contentType, action)` hívással kapuznak a token `permissions` tömbjével szemben. A hatókörök **szűrők, sosem jogosultságadók** (`Api/src/shared/auth/Scopes.ts`): a `SCOPE_CATALOG` minden hatókört (pl. `people:read`, `donations:write`) a megengedett RBAC párokhoz rendel, a `filterPermissionsByScopes()` pedig ezt metszi a személy minden feloldáskor **aktuális** jogosultságaival. Ennek következményei:

- A B1Admin-ban visszavont jogosultság a következő kérésnél megszünteti a hitelesítő adat hozzáférését; a tokenek soha nem térnek el a szerepkörtől.
- Egy hatókör csak jogosultságokat **távolíthat el**, így a hatókörrel korlátozott hitelesítő adat nem emelkedhet szerver- vagy domain-adminisztrátori szintre (ezek a jogosultságok szándékosan nincsenek hatókörhöz rendelve).
- Az API-kulcsok `cak_` előtaggal rendelkeznek; a `CustomAuthProvider.getUser()` ezt ellenőrzi, hashelja a titkot, és minden hívásnál újra feloldja a tulajdonos személy aktuális RBAC-jogosultságait.

A teljes katalógusért lásd: [API-kulcsok → Hatókörök](../api/api-keys.md#scopes).

## Felületi referencia

### REST API

A teljes termékfelület. Bármely hitelesített végpont elfogad JWT-t vagy `cak_…` API-kulcsot az `Authorization: Bearer` fejlécben. Nincs külön csak-kulcsos vagy csak-OAuth útvonaltábla. A modulok és alap útvonalaik az `Api/src/modules/*` alatt találhatók.

### API-kulcsok

Egy `cak_<prefix>.<secret>` személyes hozzáférési token, amelyet a **B1Admin → Settings → Developer → API Keys** menüpontban lehet létrehozni. Csak egy SHA-256 hash tárolódik; a nyers kulcs egyszer jelenik meg. Kezelése a `/membership/apiKeys` alatt történik (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Egy gyülekezet saját szkriptjeihez, illetve olyan összekötőkhöz legjobb, mint a Zapier, a Make és a Google Sheets. → **[API-kulcsok](../api/api-keys.md)**

### OAuth 2.0 és csatlakoztatott alkalmazások

Többbérlős alkalmazásokhoz, amelyeknek minden gyülekezet hozzájárulására szükségük van. A `Api/src/modules/membership/controllers/OAuthController.ts` fájlban valósul meg a `/membership/oauth` alatt. A szerver három engedélyezési típust támogat:

- **Authorization Code**: a `POST /oauth/authorize` (hitelesítve) rövid életű kódot ad vissza; a `POST /oauth/token` a `grant_type=authorization_code` paraméterrel ezt egy hozzáférési JWT-re (kb. 7 nap) és egy frissítő tokenre (kb. 90 nap) váltja. A nyilvános (titok nélküli) kliensnek PKCE-t kell használnia (kizárólag `S256`): egy `code_challenge` az authorize hívásnál, és a megfelelő `code_verifier` a token-cseréhez.
- **Device Code** (RFC 8628): a `POST /oauth/device/authorize` egy `user_code`-ot ad ki; a felhasználó ezt a B1Admin-ban hagyja jóvá (`/oauth/device/approve`); az eszköz az `/oauth/token` végpontot kérdezi le az eszközkód-engedéllyel. TV-khez, kioszkokhoz és böngésző nélküli CLI-khez való.
- **Frissítő token**: a `grant_type=refresh_token` új hozzáférési tokent ad ki; a nyilvános (titok nélküli) kliensek elhagyhatják a titkot.

A nyilvános kliensek a `POST /oauth/register` végponton (RFC 7591 dinamikus kliensregisztráció) maguk is regisztrálhatják magukat. Ilyenkor `client_id`-t kapnak titok nélkül, átirányítási URI-jaiknak pedig `https` vagy loopback típusúnak kell lenniük.

A **csatlakoztatott alkalmazás** a gyülekezeti adminisztrátor számára látható nézete egy megadott tokennek; a `/membership/oauth/connections` alatt listázható és visszavonható. A vezérlő egy OAuth **relay-session** hidat is tartalmaz (`/oauth/relay/*`), amely lehetővé teszi, hogy egy böngésző nélküli eszköz egy *külső* szolgáltatónál fejezze be a bejelentkezést. → **[Csatlakoztatott alkalmazások és OAuth](../api/connected-apps.md)**

### Webhookok

Az egyetlen kimenő felület. Egy gyülekezet nyilvános HTTPS-végpontot iratkoztat fel eseményekre. Amikor egyező változás történik, a `WebhookDispatcher.emit(churchId, event, payload)` az csak azonosítót tartalmazó adatokat megjelenítendő nevekkel egészíti ki (`personName`, `groupName`, `formName`; a keresések csak akkor futnak, ha egy feliratkozás egyezik). Rögzít egy kézbesítést, a háttérfolyamat pedig aláírt JSON-borítékot küld POST-tal, újrapróbálkozással és visszalépéssel (backoff). A motor a `Api/src/shared/webhooks/` alatt van, a gyülekezetenkénti CRUD a `/membership/webhooks` alatt (`WebhookController.ts`). A `connectorType` mező átformálja a törzset Slack- és Discord-üzenetekhez. A `mailchimp` összekötő tovább megy: a teljes HTTP-cserét maga kezeli (eseményenkénti metódus, URL és hitelesítés a Mailchimp API-ja felé; a hitelesítő adatok titkosítva a `webhooks.connectorConfig` mezőben). → **[Webhookok](../api/webhooks.md)**

### MCP-szerver

Egy AI-barát burkoló a `/mcp` alatt (`Api/src/modules/mcp/`). Három általános eszköz (`list_endpoints`, `describe_endpoint`, `api_call`) dinamikusan teszi elérhetővé a teljes REST-felületet bármely MCP-kliens számára. A hitelesítés ugyanaz a bearer token, mint mindenhol máshol. Az OAuth-tal bejelentkező kliensek (claude.ai egyedi összekötők) számára a `/mcp` 401-es válasza `WWW-Authenticate` fejlécet tartalmaz, amely a `/.well-known/oauth-protected-resource` címre mutat. A `/.well-known/oauth-authorization-server` hirdeti a `/membership/oauth` végpontokat, a dinamikus regisztrációt, a PKCE-t és a B1Admin `/oauth` hozzájárulási oldalt (`WellKnownController.ts`, `OAuthMetadata.ts`). Az `api_call` folyamatban újra belép az Express-verembe, így minden jogosultsági és gyülekezeti hatókör-szabály továbbra is érvényes. → **[MCP-szerver](../api/mcp.md)**

### Tartalomszolgáltatók

A bejövő tartalmi út a külön `Packages/content-providers` csomagban van (`@churchapps/content-providers`), nem az API-ban. Minden szolgáltató megvalósítja az `IProvider` interfészt (`src/interfaces.ts`): `browse`, `getPlaylist`, `getInstructions`, valamint hitelesítési horgok. Saját magát egy `Map` regisztrációs táblába (`src/providers/registry.ts`) jegyzi be. Itt a **B1 az OAuth-kliens**: a szolgáltató `AuthType` típust deklarál (`none`, `oauth_pkce`, `device_flow` vagy `form_login`), a megosztott segédek (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) pedig kliensoldali PKCE- vagy eszközfolyamatot futtatnak a külső forrással. Jelenleg tizenegy szolgáltató érhető el, köztük a Planning Center, a Dropbox, a Life.Church, a CBN, a BibleProject, a Jesus Film, a Lessons.church és a B1.church. Ezek a FreePlay-nek és a B1 alkalmazásoknak szolgáltatnak tartalmat. → **[FreePlay tartalomszolgáltató](../freeplay-content-provider.md)**

**Évtervek** erre az útvonalra épülnek. Egy tananyag-kiadó (`lessons.edit` jogosultsággal) a Lessons.church adminisztrációjában tart fenn rendezett 1., 2. és 3. heti sorozatokat (a `LessonsApi` `yearPlans` és `yearPlanWeeks` táblái, opcionális `startMonth` mezővel és heti `anchor` értékkel: `easter` vagy `christmas`). A LessonsApi `GET /yearPlans/public` végpontja névtelenül szolgálja ki az élő terveket, és minden hét program-, tanulmány- és helyszíninformációját a leckefából tölti fel. A B1Admin **Serving → Plans → Schedule Lesson → Apply Year Plan** menüpontja ezt a végpontot használja, és minden szerepeltetett hétre egy DoingApi-tervet ír (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). A `startMonth` mezővel rendelkező tervek a horgonyzott heteket a kiválasztott évhez igazítják (húsvét a gregorián számítással, karácsony az év december 25-ét megelőző vagy arra eső vasárnapja), és kitöltik a köztük lévő időszakokat. A `startMonth` nélküli tervek továbbra is az N. hetet `startDate + (N−1)×7` napraképezik le. A külső OLF-szolgáltatók heteit, illetve a hiányos útvonallal rendelkezőket az alkalmazáskor kihagyja a rendszer. A gyülekezetek a létrejövő terveket úgy szerkeszthetik, mint bármely mást, a FreePlay pedig azt játssza le, ami a tervben van.

## Összefoglalás

| Felület | Hitelesítési mechanizmus | Irány | Megvalósítás helye | Referencia |
|---|---|---|---|---|
| REST API | `Bearer` JWT vagy `cak_…` kulcs | Bejövő | `Api/src/modules/*` | [API-kulcsok](../api/api-keys.md) |
| API-kulcsok | SHA-256-tal hashelt `cak_` token | Hitelesítő adat | `Api/.../membership/controllers/ApiKeyController.ts` | [API-kulcsok](../api/api-keys.md) |
| OAuth 2.0 / csatlakoztatott alkalmazások | Engedélyezési kód (PKCE) · eszköz · frissítés → JWT; dinamikus kliensregisztráció | Bejövő | `Api/.../membership/controllers/OAuthController.ts` | [Csatlakoztatott alkalmazások](../api/connected-apps.md) |
| Webhookok | Hookonkénti titok, HMAC-SHA256 aláírás | Kimenő | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhookok](../api/webhooks.md) |
| MCP-szerver | `Bearer` JWT, OAuth JWT (`/.well-known` útján felfedezve) vagy `cak_…` kulcs | Bejövő (AI) | `Api/src/modules/mcp/` | [MCP-szerver](../api/mcp.md) |
| Tartalomszolgáltatók | Szolgáltatónként: nincs / OAuth PKCE / eszköz / űrlap | Bejövő tartalom | `Packages/content-providers/` | [Tartalomszolgáltató](../freeplay-content-provider.md) |

## Előre elkészített összekötők

Ahelyett, hogy mindenki nulláról építene, a ChurchApps összekötőket szállít a fenti felületekre:

- **[Slack és Discord](/docs/b1-admin/integrations/slack-discord)** — a webhook `connectorType` a szabványos borítékot csevegőüzenetté alakítja. Teljes egészében a B1Admin-ban konfigurálható, harmadik féltől származó fiók nélkül.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — a `mailchimp` connectorType személyeket szinkronizál egy Mailchimp-közönségbe, és a csoport- és listatagságot címkékre képezi (`Api/src/shared/webhooks/MailchimpConnector.ts`). A chat-összekötőkkel ellentétben minden eseményhez saját hitelesített kéréseket küld (feltöltés, archiválás, címkézés), nem pedig a gyülekezet által megadott URL-re POST-ol. Az API-kulcs és a közönség-azonosító titkosítva a `webhooks.connectorConfig` mezőben tárolódik. Egyirányú, csak a szabványos összevonási mezőket használja.
- **[Zapier](/docs/b1-admin/integrations/zapier)** és **[Make](/docs/b1-admin/integrations/make)**: webhook-eseményekre indulnak, és a REST API-n keresztül cselekszenek. Amikor egy Zap vagy forgatókönyv bekapcsol, saját webhookot regisztrálnak (`settings:write` jogosultságú kulcs szükséges). A Zapier-alkalmazás forráskódja az `Integrations` tároló `zapier/` mappájában található (Zapier CLI, telepítés `zapier push` paranccsal).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)**: API-kulccsal hitelesített bővítmény, amely igény szerint exportálja a Személyeket, Adományokat, Csoportokat és Részvételt.
- **[Claude](/docs/b1-admin/integrations/claude)** és **[ChatGPT](/docs/b1-admin/integrations/chatgpt)**: a `/mcp` végpontra mutató MCP-kliensek.

Saját kódodhoz a **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) mindezt becsomagolja: egy típusos REST-klienst, egy OAuth-klienst (engedélyezési kód, frissítés, eszközfolyamat) és egy HMAC webhook-ellenőrzőt Express middleware-rel.

## Kapcsolódó oldalak

- [API-kulcsok](../api/api-keys.md): a legegyszerűbb hitelesítő adat és a hatókör-katalógus
- [Csatlakoztatott alkalmazások és OAuth](../api/connected-apps.md): többbérlős hozzájárulási folyamatok
- [Webhookok](../api/webhooks.md): a kimenő eseményrendszer
- [MCP-szerver](../api/mcp.md): az AI-integrációs burkoló
- [FreePlay tartalomszolgáltató](../freeplay-content-provider.md): bejövő tartalmi forrássá válás
- [Integrációk (végfelhasználó)](/docs/b1-admin/integrations/): előre elkészített összekötők beállítási útmutatói
