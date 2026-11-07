---
title: "Csatlakoztatott alkalmazások és OAuth"
---

# Csatlakoztatott alkalmazások és OAuth

<div class="article-intro">

A B1 API támogatja az OAuth 2.0-t, így egy harmadik féltől származó alkalmazás minden gyülekezeti adminisztrátortól engedélyt kérhet az adataihoz való hozzáférésre, anélkül hogy a gyülekezet valaha jelszót vagy API-kulcsot osztana meg. A **csatlakoztatott alkalmazás** (Connected App) egy olyan OAuth-token, amelyet a gyülekezeti adminisztrátor jóváhagyott; visszavonása egyetlen kattintással megszünteti a harmadik féltől származó alkalmazás hozzáférését. Ezt az utat többbérlős SaaS-összekötőkhöz használja. Egyetlen gyülekezetet érintő integráció esetén inkább az [API-kulcsokat](./api-keys) részesítse előnyben.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Egy OAuth **klienst** kell regisztrálni, mielőtt a gyülekezetek hozzáférést adhatnának neki. Ezt vagy egy B1 szerveradminisztrátor végzi el, vagy maga a kliens a [dinamikus regisztráción](#dynamic-client-registration) keresztül
- Minden OAuth-végpont a Membership modul alatt érhető el: `/membership/oauth/...`
- A hozzáférési tokenek JWT-k. A felhasználó jogosultságait tartalmazzák, a megadott hatókörökre szűrve

</div>

## Fogalmak

| Fogalom | Jelentés |
|---|---|
| **OAuth-kliens** | Maga a harmadik féltől származó alkalmazás. A `client_id` azonosítja, a `client_secret` védi. Egyszer regisztrálják a B1-nél, és minden olyan gyülekezet használhatja, amely telepíti. |
| **Csatlakoztatott alkalmazás** | Egy konkrét `(kliens, gyülekezeti adminisztrátor)` pár, ahol az adminisztrátor hozzáférést adott a kliensnek. Minden csatlakoztatott alkalmazást egy OAuth-frissítő token támaszt alá. |
| **Hozzáférési token** | Rövid élettartamú JWT (≈ 7 nap), amelyet a kliens API-hívásokhoz használ. Felépítése megegyezik a felhasználói JWT-vel: `Authorization: Bearer <jwt>`. |
| **Frissítő token** | Hosszú élettartamú, átlátszatlan karakterlánc (≈ 90 nap), amellyel a kliens új hozzáférési tokeneket állít elő. |
| **Hatókör** | Szűkíti, mit tehet a hozzáférési token. Lásd a [hatókörjegyzéket](./api-keys#scopes). |

## Engedélyezési folyamatok

A B1 három OAuth-folyamatot támogat, mindegyiket az RFC 6749 és az RFC 8628 határozza meg.

### Authorization Code (webalkalmazások)

Akkor használja, ha az alkalmazásnak van szerveroldali összetevője, és képes a `client_secret`-et titokban tartani.

1. **Engedélyezés**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   A nyilvános kliensek (`client_secret` nélkül) kötelezően küldjék el a `"code_challenge": "..."` és a `"code_challenge_method": "S256"` mezőket is (PKCE, RFC 7636). Csak az `S256` fogadható el.

   A válasz `{ "code": "...", "state": "xyz" }`. Az engedélyezési kód végpontja szándékosan hitelesített POST-kérés. Az alkalmazás összegyűjti a felhasználó B1 JWT-jét (jellemzően egy gombon keresztül, amelyet a felhasználó B1-munkamenetében helyeznek el), és a hozzájárulási lépés részeként továbbítja.

2. **Kód cseréje tokenekre**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Ha az engedélyezési lépés `code_challenge`-et küldött, adja meg a hozzá tartozó `"code_verifier": "..."` értéket is. A nyilvános kliens a verifikálót küldi, a `client_secret`-et pedig elhagyja. A tokenvégpont JSON vagy űrlapkódolt (`application/x-www-form-urlencoded`) törzset fogad el.

   A tokenválasz:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Frissítés**, amikor a hozzáférési token lejárni készül:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   A frissítő token 90 nap használaton kívüli állapot után lejár. Ha lejárt, a gyülekezeti adminisztrátornak újra engedélyeznie kell.

### Device Code (TV-k, kioszkok, CLI)

Akkor használja, ha az eszköznek nincs böngészője. Az RFC 8628 határozza meg.

1. **Eszközkód kérése**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   A válasz tartalmazza a felhasználónak megjelenítendő kódot és a lekérdezési intervallumot:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Jelenítse meg a `user_code`-ot és a `verification_uri`-t a felhasználónak.

3. **Lekérdezés** a `/membership/oauth/token` végponton a `grant_type=urn:ietf:params:oauth:grant-type:device_code` és a `device_code` paraméterekkel. Szabványos válaszok:

   | Hiba | Jelentés |
   |---|---|
   | `authorization_pending` | A felhasználó még nem hagyta jóvá. A javasolt intervallumonként folytassa a lekérdezést |
   | `expired_token` | Az eszközkód túllépte az `expires_in` értéket. Kezdje elölről |
   | `access_denied` | A felhasználó megtagadta a kérést |
   | _(nincs, 200 OK)_ | Jóváhagyva. A törzs egy `B1TokenResponse` |

4. Jóváhagyás után tárolja a `refresh_token`-t, és használja az `access_token`-t, amíg az le nem jár.

A B1 SDK tartalmazza a `B1OAuthClient.awaitDeviceToken(...)` metódust, amely az RFC-nek megfelelő, észszerű visszalépési stratégiával (backoff) elvégzi helyette a lekérdezési ciklust.

### Frissítő token

Ha már birtokol egy `refresh_token`-t, ez önálló kérésként mindig rendelkezésre áll:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Új `access_token` és `refresh_token` érkezik vissza. A **nyilvános kliensek** (`client_secret` nélkül) frissítéskor elhagyhatják a `client_secret`-et. Ez hasznos mobil- vagy asztali OAuth-alkalmazásoknál, amelyek nem tudnak titkot megőrizni.

A frissítő tokenek rotálnak, de a régit nem dobják el azonnal. Ha egy kliens nem kapja meg a frissítési választ (például egy TV, amely a kérés közben áramtalanná vagy Wi-Fi nélkülivé vált), akár **7 napon** keresztül újrapróbálkozhat az előző `refresh_token`-nel. Az újrapróbálkozás csak addig sikeres, amíg a helyettesítő token nincs használatban. Ekkor a fel nem használt helyettesítő eldobásra kerül, és új pár áll ki. Ha a helyettesítőt már maga is frissítették, a régi token `invalid_grant` hibát ad vissza. A kapcsolat visszavonása a még türelmi időszakban lévő, rotált tokeneket is visszavonja, és a csatlakoztatott alkalmazások listája minden kapcsolatot egyszer mutat.

## A token felépítése

A hozzáférési token ugyanolyan, a B1 által kiállított JWT, mint amit a felhasználó a `POST /membership/users/login` végponton kap. Ugyanaz a moduláris jogosultsági claim, és ugyanaz a `checkAccess` viselkedés minden vezérlőben. **Az egyetlen különbség**, hogy a jogosultsági tömböt a kiadáskor a megadott hatókörök szűrik. Egy hatókörökkel korlátozott hozzáférési token nem tehet olyat, amit egy hasonlóan korlátozott API-kulcs nem tehetne, és nincs külön „OAuth-útvonal” egyik vezérlőben sem. Az `actionWrapper` nem tudja, hogy a bearer személy, API-kulcs vagy OAuth-kliens.

## Csatlakoztatott alkalmazások (felhasználói nézet)

A gyülekezeti adminisztrátor szemszögéből a „Connected Apps” azoknak az alkalmazásoknak a listája, amelyek hozzáférést kaptak a gyülekezetükhöz. Minden sor egy élő `(OAuthClient, OAuthToken)` pár.

A B1Adminban a **Settings → Developer → Connected Apps** menüpont a következőket mutatja:

- A kliens neve
- Az adminisztrátor által jóváhagyott hatókörök
- A hozzáférés megadásának dátuma
- Egy **Revoke** gomb

| Metódus és útvonal | Hitelesítés | Cél |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | A hívó saját aktív kapcsolatainak listázása (a kliens nevével és hatóköreivel együtt) |
| `DELETE /membership/oauth/connections/:id` | JWT | Kapcsolat visszavonása az OAuth-token azonosítójával. A token a következő kéréstől nem fog működni |

A lista automatikusan kihagyja a lejárt tokeneket.

## Hatókörök és hozzájárulás

A hatókör-karakterláncok ugyanazt a katalógust használják, mint az [API-kulcsok](./api-keys#scopes). Ajánlott gyakorlatok a kliensek számára:

- **Kérje a legszűkebb, működő hatóköröket.** A gyülekezetek észreveszik, ha `donations:write` jogot kér, miközben csak embereket kell olvasnia.
- **Használjon frissítő tokent és rövid élettartamú hozzáférési tokeneket.** A hosszú élettartamú hozzáférési tokeneket nehezebb gyorsan visszavonni.
- **Mindig mutassa meg a felhasználónak a megadott hatóköröket** a saját felületén, hogy ellenőrizhessék, mihez járultak hozzá.

## OAuth-kliensek kezelése

Az OAuth-kliensek (maguk a harmadik féltől származó alkalmazások) globálisan regisztráltak. A `client_secret`-tel rendelkező bizalmas klienst egy B1 szerveradminisztrátor hozza létre. Ha szeretne egyet szállítani, vegye fel a kapcsolatot a ChurchApps csapattal a `client_id` / `client_secret` pár beszerzése érdekében, és regisztrálja az átirányítási URI-jait. A nyilvános kliensek, például az MCP-összekötők, maguk is regisztrálhatnak (lásd lent).

A regisztrált átirányítási URI-knak pontosan egyezniük kell a kérésben szereplő `redirect_uri`-val. A prefix- vagy részleges egyezést a rendszer elutasítja.

| Metódus és útvonal | Jogosultság | Leírás |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Összes OAuth-kliens listázása |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Kliens lekérése nyilvános azonosítója alapján (a titok elrejtve) |
| `POST /membership/oauth/clients` | Server.Admin | Kliens létrehozása vagy frissítése |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Kliens törlése |

### Dinamikus kliensregisztráció

A `POST /membership/oauth/register` (nyilvános, RFC 7591) lehetővé teszi, hogy egy kliens, például a claude.ai MCP-összekötője, maga regisztrálja magát. Ezt az API `/.well-known/oauth-authorization-server` dokumentuma hirdeti. Lásd [MCP-szerver → OAuth-felfedezés](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

A válasz 201-es állapotkóddal érkezik, és tartalmazza a `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) és `token_endpoint_auth_method: "none"` mezőket.

- Titok soha nem kerül kiadásra, ezért a kliensnek minden engedélyezésnél PKCE-t kell használnia.
- A `redirect_uris` 1–10 `https` URL lehet, vagy `http`, ha `localhost`, `127.0.0.1` vagy `[::1]`.
- A `client_name` 45 karakterre lesz csonkolva (alapértelmezett: "AI assistant").
- IP-címenként óránként legfeljebb 20 regisztráció engedélyezett.

A B1Admin hozzájárulási oldalán az önregisztrált kliens értesítést kap arról, hogy önmagát regisztrálta. Soha nem tud többet tenni, mint a felhasználó saját B1-fiókja, és a kapcsolata a **Settings → Developer → Connected Apps** menüpontban bontható.

## SDK-támogatás

Az `@churchapps/integration-sdk` csomag minden OAuth-folyamatot típusos segédfüggvényekkel csomagol: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. A csomag README-jét és a [Webhookok](./webhooks#sdk-support) oldalt nézze meg egy végponttól végpontig tartó példáért.
