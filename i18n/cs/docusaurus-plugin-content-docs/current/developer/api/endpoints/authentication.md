---
title: "Ověřování a oprávnění"
---

# Ověřování a oprávnění

<div class="article-intro">

API ChurchApps používá ověřování pomocí JWT. Uživatelé se přihlásí a dostanou token, který zakóduje jejich identitu, členství v církvi a oprávnění. Tato stránka popisuje postup ověřování, model oprávnění a podporu OAuth.

</div>

## Postup přihlášení

### Standardní přihlášení

```
POST /membership/users/login
```

**Auth:** Public

Přijímá jeden ze tří typů přihlašovacích údajů:

| Pole | Popis |
|------|-------|
| `email` + `password` | Standardní přihlášení e-mailem a heslem |
| `jwt` | Opětovné ověření existujícím JWT |
| `authGuid` | Jednorázový ověřovací odkaz (používá se v uvítacích e-mailech a e-mailech pro obnovení hesla) |

**Odpověď:**

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

Pole `token` je JWT, které se má v dalších požadavcích posílat jako `Authorization: Bearer <token>`.

### Dvoufázové přihlášení

Uživatelé mohou zapnout dvoufázové přihlášení pomocí aplikace s autentizátorem (TOTP). U těchto uživatelů přihlášení pomocí `email` + `password`, `authGuid` nebo SSO nevrací token. Místo toho vrátí výzvu:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Token výzvy platí 5 minut. Pošlete ho zpět na stejný endpoint spolu s kódem:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

Jako `mfaCode` lze zadat aktuální 6místný kód z autentizátoru nebo jeden z deseti jednorázových záložních kódů uživatele. Při chybném kódu se vrátí `Invalid code` a opakované neúspěšné pokusy jsou omezeny na jeden účet. Opětovné přihlášení pomocí `jwt` výzvou nikdy neprochází, takže stávající relace se dál obnovují. Objekt `user` v odpovědi na přihlášení obsahuje údaj `mfaEnabled`.

Koncové body pro samoobsluhu (pouze pro přihlášeného uživatele, pod `/membership/users/mfa`):

| Endpoint | Popis |
|----------|-------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Spustí nastavení; vrátí `{ secret, otpauthUrl }` pro QR kód |
| `POST /enable` | Tělo `{ code }`; zapne funkci a jednorázově vrátí `{ backupCodes }` |
| `POST /disable` | Tělo `{ code }` (kód z autentizátoru nebo záložní kód); vypne funkci |
| `POST /reset/:userId` | Pouze Server.Admin; vypne funkci pro jiného uživatele |

Tajné klíče se ukládají šifrovaně a záložní kódy se ukládají jako hodnoty hash. Zapnutí, vypnutí a reset se zapisují do auditního protokolu.

### Obsah tokenu

JWT zakóduje:
- `id` — ID uživatele
- `churchId` — aktuálně vybraná církev
- `personId` — záznam osoby pro vybranou církev
- Pole oprávnění pro každé API

### Výběr církve

Uživatelé mohou patřit k více církvím. Odpověď na přihlášení obsahuje všechny církve s jejich oprávněními. Pro přepnutí církve klient vygeneruje nový JWT s rozsahem pro jinou církev z dat odpovědi na přihlášení.

## Registrace uživatele

### Registrace nového uživatele

```
POST /membership/users/register
```

**Auth:** Public

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Vytvoří uživatele s dočasným heslem a odešle uvítací e-mail s ověřovacím odkazem. První uživatel zaregistrovaný na nové instanci automaticky získá přístup správce serveru.

Přijímá dvě volitelná pole proti botům: `website` (skryté pole typu honeypot, které skutečtí uživatelé nechávají prázdné) a `fillMs` (jak dlouho byl formulář otevřen, v milisekundách). Pokud je vyplněno pole `website` nebo je `fillMs` menší než 2000, účet se nevytvoří, ale endpoint přesto vrátí běžně vypadající odpověď `200`, aby boti nepoznali, že byli odmítnuti. Klienti, kteří obě pole vynechají, se registrují běžně.

### Registrace nové církve

```
POST /membership/churches/add
```

**Auth:** JWT

Po registraci uživatele zavolejte tento endpoint, který vytvoří církev a přiřadí k ní uživatele.

## Správa hesel

| Metoda | Cesta | Auth | Popis |
|--------|-------|------|-------|
| POST | `/membership/users/forgot` | Public | Odešle e-mail pro obnovení hesla. Tělo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Nastaví nové heslo pomocí ověřovacího GUID z e-mailu pro obnovení. Tělo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Změní heslo aktuálního uživatele. Tělo: `{ "newPassword": "..." }` |

## Model oprávnění

Oprávnění jsou seskupena podle modulu a uživatelům se přiřazují prostřednictvím rolí. Každé oprávnění má **typ obsahu** a **akci**.

### Přehled oprávnění

| Sekce v rozhraní | Typ obsahu | Akce | Popis |
|------------------|------------|------|-------|
| **Attendance** | Attendance | Checkin | Přihlašovat členy na bohoslužby |
| | Attendance | Edit | Upravovat záznamy docházky |
| | Services | Edit | Spravovat bohoslužby a jejich časy |
| | Attendance | View | Zobrazovat záznamy docházky |
| | Attendance | View Summary | Zobrazovat souhrny a přehledy docházky |
| **Donations** | Donations | Edit | Vytvářet a upravovat záznamy darů |
| | Settings | Edit | Upravovat nastavení darování a plateb |
| | Donations | View Summary | Zobrazovat souhrnné přehledy darů |
| | Donations | View | Zobrazovat jednotlivé záznamy darů |
| **People and Groups** | Forms | Admin | Plná správa formulářů |
| | Forms | Edit | Upravovat definice formulářů |
| | Plans | Edit | Upravovat plány bohoslužeb |
| | Group Members | Edit | Přidávat a odebírat členy skupin |
| | Groups | Edit | Vytvářet a upravovat skupiny |
| | Households | Edit | Upravovat přiřazení domácností |
| | People | Edit | Upravovat libovolný záznam osoby |
| | People | Edit Self | Upravovat pouze vlastní záznam osoby |
| | Roles | Edit | Spravovat role a přiřazení uživatelů |
| | Group Members | View | Zobrazovat seznamy členů skupin |
| | People | View Members | Zobrazovat pouze členy (ne návštěvníky) |
| | People | View | Zobrazovat všechny osoby |
| | Roles | View | Zobrazovat role a přiřazení |
| | Settings | Edit | Upravovat nastavení církve |
| **Content** | Content | Edit | Upravovat stránky, sekce a prvky |
| | Settings | Edit | Upravovat nastavení obsahu |
| | StreamingServices | Edit | Spravovat konfiguraci streamovaných bohoslužeb |
| | Chat | Host | Hostit a moderovat chatové relace |
| **Messaging** | Texting | Send | Odesílat SMS zprávy |

### Jak se oprávnění kontrolují

V controllerech se oprávnění kontrolují pomocí metody `au.checkAccess()`:

```typescript
// Vyžadovat konkrétní oprávnění
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Nebo uvnitř actionWrapper — systém CRUD kontroluje automaticky
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Správce serveru

Oprávnění `Server.Admin` uděluje plný přístup napříč všemi církvemi. Získá ho první zaregistrovaný uživatel a může být uděleno i dalším prostřednictvím role správce serveru.

## OAuth 2.0

API podporuje OAuth 2.0 pro integrace třetích stran. Jsou k dispozici dva typy grantů.

### Tok s autorizačním kódem

1. **Autorizace:** `POST /membership/oauth/authorize` (vyžaduje JWT)
   - Tělo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, pouze `S256`) jsou povinné pro veřejné klienty bez tajného klíče
   - Vrací: `{ "code": "...", "state": "..." }`

2. **Výměna kódu za token:** `POST /membership/oauth/token` (Public)
   - Tělo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Pokud krok autorizace použil `code_challenge`, pošlete `code_verifier`; veřejní klienti vynechají `client_secret`. Přijímají se těla ve formátu JSON i form-encoded
   - Vrací: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Obnovení tokenu:** `POST /membership/oauth/token` (Public)
   - Tělo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Přístupové tokeny vyprší po **12 hodinách**.

### Tok s kódem zařízení (RFC 8628)

Pro zařízení bez prohlížeče (aplikace pro TV, kiosky):

1. **Požádání o kód zařízení:** `POST /membership/oauth/device/authorize` (Public)
   - Tělo: `{ "client_id": "...", "scope": "..." }`
   - Vrací: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Uživatel zadá kód** na ověřovací adrese URI a schválí nebo zamítne požadavek

3. **Dotazování na token:** `POST /membership/oauth/token` (Public)
   - Tělo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Dokud není požadavek schválen, vrací `authorization_pending`; po schválení vrátí přístupový token

### Správa klientů OAuth

| Metoda | Cesta | Auth | Oprávnění | Popis |
|--------|-------|------|-----------|-------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Vypíše všechny klienty OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Získá klienta podle ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Získá klienta podle ID klienta (tajný klíč je skrytý) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Vytvoří nebo aktualizuje klienta |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Smaže klienta |
| POST | `/membership/oauth/register` | Public | — | Dynamická registrace klienta (RFC 7591) pro veřejné klienty, například konektory MCP. Viz [Připojené aplikace](../connected-apps#dynamic-client-registration) |

### Koncové body pro schvalování zařízení

| Metoda | Cesta | Auth | Popis |
|--------|-------|------|-------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Získá informace o čekajícím kódu zařízení pro rozhraní schvalování |
| POST | `/membership/oauth/device/approve` | JWT | Schválí autorizaci zařízení. Tělo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Zamítne autorizaci zařízení. Tělo: `{ "user_code": "..." }` |

## Veřejné a ověřené koncové body

API používá dvě obalovací funkce, které určují požadavky na ověření:

- **`actionWrapper`** — Vyžaduje platný JWT. K dispozici je objekt ověřeného uživatele (`au`) s `churchId`, `userId` a kontrolami oprávnění.
- **`actionWrapperAnon`** — Ověření se nevyžaduje. Používá se pro přihlášení, registraci, veřejné vyhledávání obsahu a přijímače webhooků.

V tabulkách koncových bodů v této dokumentaci jsou tyto typy v sloupci Auth označeny jako **JWT**, respektive **Public**.

## Související stránky

- [Struktura modulu](../module-structure) — Jak jsou uspořádány controllery, repozitáře a modely
- [Lokální nastavení](../local-setup) — Spuštění API lokálně pro vývoj
