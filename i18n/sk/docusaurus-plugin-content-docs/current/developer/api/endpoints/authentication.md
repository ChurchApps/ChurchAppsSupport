---
title: "Autentifikácia a oprávnenia"
description: "Referencia prihlasovania API ChurchApps pomocou JWT, dvojfaktorového prihlasovania, tokov OAuth 2.0 a modelu oprávnení pre vývojárov budujúcich integrácie."
---

# Autentifikácia a oprávnenia

<div class="article-intro">

API ChurchApps používa autentifikáciu založenú na JWT. Používatelia sa prihlásia a dostanú token, ktorý kóduje ich identitu, členstvo v cirkvi a oprávnenia. Táto stránka popisuje postup prihlasovania, model oprávnení a podporu OAuth.

</div>

## Postup prihlásenia

### Štandardné prihlásenie

```
POST /membership/users/login
```

**Autentifikácia:** Verejný

Prijíma jeden z troch typov prihlasovacích údajov:

| Pole | Popis |
|------|-------|
| `email` + `password` | Štandardné prihlásenie e-mailom a heslom |
| `jwt` | Opätovné overenie existujúcim JWT |
| `authGuid` | Jednorazový autentifikačný odkaz (používa sa vovítacích e-mailoch a e-mailoch na obnovenie hesla) |

**Odpoveď:**

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

Pole `token` je JWT, ktorý sa má v nasledujúcich požiadavkách posielať ako `Authorization: Bearer <token>`.

### Prihlásenie dvojfaktorovým overením

Používatelia si môžu zapnúť dvojfaktorové prihlásenie cez aplikáciu autentifikátora (TOTP). Pri týchto používateľoch prihlásenie pomocou `email` + `password`, `authGuid` alebo SSO nevráti token. Namiesto toho vráti výzvu:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Token výzvy je platný 5 minút. Pošlite ho späť na rovnaký endpoint spolu s kódom:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

Pole `mfaCode` môže obsahovať aktuálny 6-miestny kód z autentifikátora alebo jeden z desiatich jednorazových záložných kódov používateľa. Nesprávny kód vráti odpoveď `Invalid code` a opakované neúspešné pokusy sú obmedzené na úrovni účtu. Opätovné prihlásenie pomocou `jwt` sa nikdy nevyžaduje overiť dvojfaktorovo, takže existujúce relácie sa ďalej obnovujú. Objekt `user` v odpovedi na prihlásenie obsahuje položku `mfaEnabled`.

Samoobslužné endpointy (len pre prihláseného používateľa, pod cestou `/membership/users/mfa`):

| Endpoint | Popis |
|----------|-------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Spustí nastavenie; vráti `{ secret, otpauthUrl }` pre QR kód |
| `POST /enable` | Telo `{ code }`; zapne dvojfaktorové overenie a jednorazovo vráti `{ backupCodes }` |
| `POST /disable` | Telo `{ code }` (kód z autentifikátora alebo záložný kód); vypne ho |
| `POST /reset/:userId` | Len Server.Admin; vypne ho pre iného používateľa |

Tajné kľúče sa ukladajú zašifrované a záložné kódy sa ukladajú ako hash. Zapnutie, vypnutie a resetovanie sa zapisujú do auditného záznamu.

### Obsah tokenu

JWT obsahuje:
- `id` — ID používateľa
- `churchId` — Aktuálne vybraná cirkev
- `personId` — Záznam osoby pre vybranú cirkev
- Polia oprávnení pre jednotlivé API

### Výber cirkvi

Používatelia môžu patriť do viacerých cirkví. Odpoveď na prihlásenie obsahuje všetky cirkvi spolu s ich oprávneniami. Pri prepnutí cirkvi klient vygeneruje nový JWT viazaný na inú cirkev z údajov v odpovedi na prihlásenie.

## Registrácia používateľa

### Registrácia nového používateľa

```
POST /membership/users/register
```

**Autentifikácia:** Verejný

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Vytvorí používateľa s dočasným heslom a odošle uvítací e-mail s autentifikačným odkazom. Prvý používateľ zaregistrovaný na novej inštancii automaticky dostane prístup správcu servera.

Prijímajú sa dve voliteľné polia proti botom: `website` (skryté pole typu honeypot, ktoré skutoční používatelia nechajú prázdne) a `fillMs` (čas, počas ktorého bol formulár otvorený, v milisekundách). Ak je pole `website` vyplnené alebo je `fillMs` menší ako 2000, účet sa nevytvorí, no endpoint stále vráti bežne vyzerajúcu odpoveď `200`, aby boti nemohli zistiť, že boli odmietnutí. Klienti, ktorí obe polia vynechajú, sa registrujú bežným spôsobom.

### Registrácia novej cirkvi

```
POST /membership/churches/add
```

**Autentifikácia:** JWT

Po registrácii používateľa zavolajte tento endpoint, aby ste vytvorili cirkev a priradili k nej používateľa.

## Správa hesiel

| Metóda | Cesta | Autentifikácia | Popis |
|--------|-------|----------------|-------|
| POST | `/membership/users/forgot` | Verejný | Odošle e-mail na obnovenie hesla. Telo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Verejný | Nastaví nové heslo pomocou auth GUID z e-mailu na obnovenie. Telo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Zmení heslo aktuálneho používateľa. Telo: `{ "newPassword": "..." }` |

## Model oprávnení

Oprávnenia sú usporiadané podľa modulov a používateľom sa priraďujú cez roly. Každé oprávnenie má **typ obsahu** a **akciu**.

### Prehľad oprávnení

| Sekcia v rozhraní | Typ obsahu | Akcia | Popis |
|----------------|--------------|--------|-------|
| **Dochádzka** | Attendance | Checkin | Prihlásenie členov na bohoslužbách |
| | Attendance | Edit | Úprava záznamov o dochádzke |
| | Services | Edit | Správa bohoslužieb a časov bohoslužieb |
| | Attendance | View | Zobrazenie záznamov o dochádzke |
| | Attendance | View Summary | Zobrazenie súhrnov a prehľadov dochádzky |
| **Dary** | Donations | Edit | Vytváranie a úprava záznamov o daroch |
| | Settings | Edit | Úprava nastavení darovania a platieb |
| | Donations | View Summary | Zobrazenie súhrnných prehľadov darov |
| | Donations | View | Zobrazenie jednotlivých záznamov o daroch |
| **Ľudia a skupiny** | Forms | Admin | Plná správa formulárov |
| | Forms | Edit | Úprava definícií formulárov |
| | Plans | Edit | Úprava plánov bohoslužieb |
| | Group Members | Edit | Pridávanie a odstraňovanie členov skupín |
| | Groups | Edit | Vytváranie a úprava skupín |
| | Households | Edit | Úprava priradenia domácností |
| | People | Edit | Úprava ľubovoľného záznamu osoby |
| | People | Edit Self | Úprava iba vlastného záznamu osoby |
| | Roles | Edit | Správa rolí a priradení používateľov |
| | Group Members | View | Zobrazenie zoznamov členov skupín |
| | People | View Members | Zobrazenie iba členov (nie návštevníkov) |
| | People | View | Zobrazenie všetkých osôb |
| | Roles | View | Zobrazenie rolí a priradení |
| | Settings | Edit | Úprava nastavení cirkvi |
| **Obsah** | Content | Edit | Úprava stránok, sekcií a prvkov |
| | Settings | Edit | Úprava nastavení obsahu |
| | StreamingServices | Edit | Správa konfigurácie streamovacích služieb |
| | Chat | Host | Hostenie a moderovanie chatových relácií |
| **Správy** | Texting | Send | Odosielanie SMS správ |

### Ako sa oprávnenia overujú

V kontroléroch sa oprávnenia overujú metódou `au.checkAccess()`:

```typescript
// Vyžaduje konkrétne oprávnenie
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Alebo v rámci actionWrapper — systém CRUD overuje automaticky
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Správca servera

Oprávnenie `Server.Admin` udeľuje plný prístup do všetkých cirkví. Dostane ho prvý zaregistrovaný používateľ a ďalším ho možno udeliť cez rolu správcu servera.

## OAuth 2.0

API podporuje OAuth 2.0 pre integrácie tretích strán. Sú dostupné dva typy grantov.

### Tok autorizačným kódom

1. **Autorizácia:** `POST /membership/oauth/authorize` (vyžaduje JWT)
   - Telo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, iba `S256`) sú povinné pre verejných klientov bez tajného kľúča
   - Vráti: `{ "code": "...", "state": "..." }`

2. **Výmena kódu za token:** `POST /membership/oauth/token` (Verejný)
   - Telo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Pole `code_verifier` pošlite, ak krok autorizácie používal `code_challenge`; verejní klienti vynechajú `client_secret`. Prijímajú sa telá vo formáte JSON aj form-encoded
   - Vráti: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Obnovenie tokenu:** `POST /membership/oauth/token` (Verejný)
   - Telo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Platnosť prístupových tokenov vyprší po **12 hodinách**.

### Tok so zariadenovým kódom (RFC 8628)

Pre zariadenia bez prehliadača (aplikácie pre TV, kiosky):

1. **Vyžiadanie zariadenového kódu:** `POST /membership/oauth/device/authorize` (Verejný)
   - Telo: `{ "client_id": "...", "scope": "..." }`
   - Vráti: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Používateľ zadá kód** na overovacej adrese URI a schváli alebo zamietne prístup

3. **Dotazovanie sa na token:** `POST /membership/oauth/token` (Verejný)
   - Telo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Kým nie je požiadavka schválená, vracia `authorization_pending`; po schválení vráti prístupový token

### Správa OAuth klientov

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Zoznam všetkých OAuth klientov |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Získanie klienta podľa ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Získanie klienta podľa ID klienta (tajný kľúč je skrytý) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Vytvorenie alebo aktualizácia klienta |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Odstránenie klienta |
| POST | `/membership/oauth/register` | Verejný | — | Dynamická registrácia klienta (RFC 7591) pre verejných klientov, napríklad konektory MCP. Pozri [Prepojené aplikácie](../connected-apps.md#dynamic-client-registration) |

### Endpointy na schvaľovanie zariadení

| Metóda | Cesta | Autentifikácia | Popis |
|--------|-------|----------------|-------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Získanie informácií o čakajúcom zariadenovom kóde pre rozhranie na schválenie |
| POST | `/membership/oauth/device/approve` | JWT | Schválenie autorizácie zariadenia. Telo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Zamietnutie autorizácie zariadenia. Telo: `{ "user_code": "..." }` |

## Verejné a autentifikované endpointy

API používa dve obalové funkcie, ktoré určujú požiadavky na autentifikáciu:

- **`actionWrapper`** — Vyžaduje platný JWT. K dispozícii je objekt autentifikovaného používateľa (`au`) s `churchId`, `userId` a overovaním oprávnení.
- **`actionWrapperAnon`** — Nevyžaduje autentifikáciu. Používa sa na prihlásenie, registráciu, verejné vyhľadávanie obsahu a prijímače webhookov.

V tabuľkách endpointov v tejto dokumentácii sú tieto typy v stĺpci Autentifikácia označené ako **JWT**, respektíve **Verejný**.

## Súvisiace stránky

- [Štruktúra modulov](../module-structure.md) — Ako sú usporiadané kontroléry, repozitáre a modely
- [Lokálne nastavenie](../local-setup.md) — Spustenie API lokálne na vývoj
