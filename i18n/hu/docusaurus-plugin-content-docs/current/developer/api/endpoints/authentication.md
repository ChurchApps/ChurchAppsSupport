---
title: "Hitelesítés és jogosultságok"
---

# Hitelesítés és jogosultságok

<div class="article-intro">

A ChurchApps API JWT-alapú hitelesítést használ. A felhasználók bejelentkezéskor olyan tokent kapnak, amely azonosítja őket, tartalmazza a gyülekezeti tagságukat és a jogosultságaikat. Ez az oldal a hitelesítési folyamatot, a jogosultsági modellt és az OAuth-támogatást ismerteti.

</div>

## Bejelentkezési folyamat

### Standard bejelentkezés

```
POST /membership/users/login
```

**Hitelesítés:** Nyilvános

Három hitelesítő adattípus fogadható el:

| Mező | Leírás |
|-------|-------------|
| `email` + `password` | Standard e-mail és jelszavas bejelentkezés |
| `jwt` | Újrahitelesítés meglévő JWT-vel |
| `authGuid` | Egyszer használható hitelesítési link (üdvözlő és jelszó-visszaállító e-mailekben használatos) |

**Válasz:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

A `token` mező egy JWT, amelyet a későbbi kérésekben `Authorization: Bearer <token>` formában kell elküldeni.

### Kétlépcsős bejelentkezés

A felhasználók bekapcsolhatják a hitelesítő alkalmazással (TOTP) működő kétlépcsős bejelentkezést. Ezeknél a felhasználóknál az `email` + `password`, az `authGuid` vagy az SSO-bejelentkezés nem ad vissza tokent. Ehelyett egy kihívást küld:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

A kihívás-token 5 percig érvényes. A kóddal együtt ugyanarra a végpontra kell visszaküldeni:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

Az `mfaCode` lehet a hitelesítő alkalmazás aktuális, 6 jegyű kódja, vagy a felhasználó tíz egyszer használható tartalék kódjának egyike. Hibás kód esetén az `Invalid code` választ kapjuk, a sikertelen próbálkozások száma pedig fiókonként korlátozott. A `jwt`-vel történő újrabejelentkezést nem kell kétlépcsősen igazolni, így a meglévő munkamenetek továbbra is megújulnak. A bejelentkezési válasz `user` objektuma tartalmazza az `mfaEnabled` mezőt.

Önkiszolgáló végpontok (csak bejelentkezett felhasználó számára, a `/membership/users/mfa` alatt):

| Végpont | Leírás |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Megkezdi a beállítást; a QR-kódhoz `{ secret, otpauthUrl }` értéket ad vissza |
| `POST /enable` | Törzs: `{ code }`; bekapcsolja, és a `{ backupCodes }` értéket egyszer adja vissza |
| `POST /disable` | Törzs: `{ code }` (hitelesítő vagy tartalék kód); kikapcsolja |
| `POST /reset/:userId` | Csak Server.Admin; más felhasználó számára kikapcsolja |

A titkos kulcsok titkosítva, a tartalék kódok pedig kivonatként tárolódnak. A bekapcsolás, kikapcsolás és visszaállítás bekerül a naplózási (audit) naplóba.

### A token tartalma

A JWT a következőket kódolja:
- `id` — Felhasználói azonosító
- `churchId` — Az aktuálisan kiválasztott gyülekezet
- `personId` — A kiválasztott gyülekezetbeli személyrekord
- API-nként külön jogosultsági tömbök

### Gyülekezet kiválasztása

A felhasználók több gyülekezetnek is tagjai lehetnek. A bejelentkezési válasz tartalmazza az összes gyülekezetet a hozzájuk tartozó jogosultságokkal. A gyülekezetváltáshoz a kliens a bejelentkezési válasz adataiból egy másik gyülekezetre szabott új JWT-t generál.

## Felhasználói regisztráció

### Új felhasználó regisztrálása

```
POST /membership/users/register
```

**Hitelesítés:** Nyilvános

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Létrehoz egy felhasználót ideiglenes jelszóval, és üdvözlő e-mailt küld hitelesítési linkkel. Egy új példányon az első regisztrált felhasználó automatikusan szerveradminisztrátori jogosultságot kap.

Két opcionális botcsapda-mező fogadható el: a `website` (rejtett csalimező, amelyet a valódi felhasználók üresen hagynak) és a `fillMs` (az űrlap megnyitva tartásának ideje ezredmásodpercben). Ha a `website` mező ki van töltve, vagy a `fillMs` 2000 alatt van, nem jön létre fiók, de a végpont továbbra is szokványos `200` választ ad, hogy a botok ne tudják meg, hogy elutasították őket. Azok a kliensek, amelyek egyik mezőt sem küldik el, a szokásos módon regisztrálnak.

### Új gyülekezet regisztrálása

```
POST /membership/churches/add
```

**Hitelesítés:** JWT

A felhasználó regisztrálása után hívja meg ezt a végpontot, hogy létrehozzon egy gyülekezetet, és hozzárendelje hozzá a felhasználót.

## Jelszókezelés

| Módszer | Útvonal | Hitelesítés | Leírás |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Nyilvános | Jelszó-visszaállító e-mail küldése. Törzs: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Nyilvános | Új jelszó beállítása a visszaállító e-mailben kapott hitelesítési GUID-del. Törzs: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Az aktuális felhasználó jelszavának megváltoztatása. Törzs: `{ "newPassword": "..." }` |

## Jogosultsági modell

A jogosultságok modulok szerint vannak csoportosítva, és szerepkörökön keresztül rendelhetők a felhasználókhoz. Minden jogosultságnak van **tartalomtípusa** és **művelete**.

### Jogosultsági referencia

| Megjelenítési szakasz | Tartalomtípus | Művelet | Leírás |
|----------------|--------------|--------|-------------|
| **Részvétel** | Attendance | Checkin | Tagok bejelentkeztetése istentiszteleteken |
| | Attendance | Edit | Részvételi nyilvántartások szerkesztése |
| | Services | Edit | Istentiszteletek és időpontok kezelése |
| | Attendance | View | Részvételi nyilvántartások megtekintése |
| | Attendance | View Summary | Részvételi összesítők és jelentések megtekintése |
| **Adományok** | Donations | Edit | Adománynyilvántartások létrehozása és szerkesztése |
| | Settings | Edit | Adakozási/fizetési beállítások szerkesztése |
| | Donations | View Summary | Adományösszesítő jelentések megtekintése |
| | Donations | View | Egyedi adománynyilvántartások megtekintése |
| **Emberek és csoportok** | Forms | Admin | Űrlapok teljes körű adminisztrációja |
| | Forms | Edit | Űrlapdefiníciók szerkesztése |
| | Plans | Edit | Istentiszteleti tervek szerkesztése |
| | Group Members | Edit | Csoporttagok hozzáadása/eltávolítása |
| | Groups | Edit | Csoportok létrehozása és szerkesztése |
| | Households | Edit | Háztartás-hozzárendelések szerkesztése |
| | People | Edit | Bármely személyrekord szerkesztése |
| | People | Edit Self | Csak a saját személyrekord szerkesztése |
| | Roles | Edit | Szerepkörök és felhasználói hozzárendelések kezelése |
| | Group Members | View | Csoporttag-listák megtekintése |
| | People | View Members | Csak tagok megtekintése (nem látogatók) |
| | People | View | Minden személy megtekintése |
| | Roles | View | Szerepkörök és hozzárendelések megtekintése |
| | Settings | Edit | Gyülekezeti beállítások szerkesztése |
| **Tartalom** | Content | Edit | Oldalak, szakaszok és elemek szerkesztése |
| | Settings | Edit | Tartalmi beállítások szerkesztése |
| | StreamingServices | Edit | Közvetítési szolgáltatások konfigurációjának kezelése |
| | Chat | Host | Csevegési munkamenetek házigazdázása/moderálása |
| **Üzenetküldés** | Texting | Send | SMS-szöveges üzenetek küldése |

### Hogyan ellenőrzik a jogosultságokat

A vezérlőkben a jogosultságok ellenőrzése az `au.checkAccess()` metódussal történik:

```typescript
// Adott jogosultság megkövetelése
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Vagy actionWrapperen belül — a CRUD-rendszer automatikusan ellenőriz
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Szerveradminisztrátor

A `Server.Admin` jogosultság teljes hozzáférést biztosít minden gyülekezethez. Ez az első regisztrált felhasználónak kerül kiosztásra, és a szerveradmin szerepkörön keresztül másoknak is megadható.

## OAuth 2.0

Az API harmadik féltől származó integrációkhoz támogatja az OAuth 2.0-t. Két engedélyezési típus érhető el.

### Engedélyezési kódos folyamat

1. **Engedélyezés:** `POST /membership/oauth/authorize` (JWT szükséges)
   - Törzs: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - A `code_challenge` / `code_challenge_method` (PKCE, csak `S256`) kötelező a titok nélküli nyilvános kliensek számára
   - Visszaad: `{ "code": "...", "state": "..." }`

2. **Kód cseréje tokenre:** `POST /membership/oauth/token` (Nyilvános)
   - Törzs: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Küldje el a `code_verifier` mezőt, ha az engedélyezési lépésben `code_challenge` szerepelt; a nyilvános kliensek nem küldik a `client_secret` mezőt. JSON vagy űrlapkódolt törzs is elfogadott
   - Visszaad: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Token megújítása:** `POST /membership/oauth/token` (Nyilvános)
   - Törzs: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

A hozzáférési tokenek **12 óra** múlva lejárnak.

### Eszközkódos folyamat (RFC 8628)

Böngésző nélküli eszközökhöz (TV-alkalmazások, kioszkok):

1. **Eszközkód kérése:** `POST /membership/oauth/device/authorize` (Nyilvános)
   - Törzs: `{ "client_id": "...", "scope": "..." }`
   - Visszaad: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **A felhasználó beírja a kódot** az ellenőrző URI-n, majd jóváhagyja vagy elutasítja

3. **Token lekérdezése:** `POST /membership/oauth/token` (Nyilvános)
   - Törzs: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Amíg a kérést nem hagyják jóvá, `authorization_pending` választ ad, jóváhagyás után visszaadja a hozzáférési tokent

### OAuth-kliensek kezelése

| Módszer | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Összes OAuth-kliens listázása |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Kliens lekérése azonosító alapján |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Kliens lekérése kliensazonosító alapján (a titok elrejtve) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Kliens létrehozása vagy frissítése |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Kliens törlése |
| POST | `/membership/oauth/register` | Nyilvános | — | Dinamikus kliensregisztráció (RFC 7591) olyan nyilvános kliensek számára, mint az MCP-csatlakozók. Lásd: [Csatlakoztatott alkalmazások](../connected-apps#dynamic-client-registration) |

### Eszközjóváhagyási végpontok

| Módszer | Útvonal | Hitelesítés | Leírás |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | A függőben lévő eszközkód adatainak lekérése a jóváhagyó felülethez |
| POST | `/membership/oauth/device/approve` | JWT | Eszközhitelesítés jóváhagyása. Törzs: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Eszközhitelesítés elutasítása. Törzs: `{ "user_code": "..." }` |

## Nyilvános és hitelesített végpontok

Az API két burkoló függvényt használ, amelyek meghatározzák a hitelesítési követelményeket:

- **`actionWrapper`** — Érvényes JWT-t kíván meg. A hitelesített felhasználói objektum (`au`) elérhető a `churchId`, a `userId` és a jogosultság-ellenőrzések révén.
- **`actionWrapperAnon`** — Nem kíván hitelesítést. Bejelentkezéshez, regisztrációhoz, nyilvános tartalomkereséshez és webhook-fogadókhoz használatos.

A dokumentáció végponttáblázataiban ezeket a Hitelesítés oszlopban **JWT**, illetve **Nyilvános** jelöléssel tüntetjük fel.

## Kapcsolódó oldalak

- [Modulstruktúra](../module-structure) — A vezérlők, adattárak és modellek felépítése
- [Helyi telepítés](../local-setup) — Az API helyi futtatása fejlesztéshez
