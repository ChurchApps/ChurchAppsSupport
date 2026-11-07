---
title: "Avtentikacija in dovoljenja"
---

# Avtentikacija in dovoljenja

<div class="article-intro">

API ChurchApps uporablja avtentikacijo na osnovi JWT. Uporabniki se prijavijo in prejmejo žeton, ki zapisuje njihovo identiteto, članstvo v cerkvi in dovoljenja. Ta stran opisuje potek avtentikacije, model dovoljenj in podporo za OAuth.

</div>

## Potek prijave

### Standardna prijava

```
POST /membership/users/login
```

**Avtentikacija:** Javno

Sprejme eno od treh vrst poverilnic:

| Polje | Opis |
|-------|------|
| `email` + `password` | Standardna prijava z e-poštnim naslovom in geslom |
| `jwt` | Ponovna avtentikacija z obstoječim JWT |
| `authGuid` | Enkratna povezava za overjanje (uporablja se v e-poštnih sporočilih za dobrodošlico in ponastavitev) |

**Odgovor:**

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

Polje `token` je JWT, ki ga je treba pri naslednjih zahtevah poslati kot `Authorization: Bearer <token>`.

### Dvostopenjska prijava

Uporabniki lahko vklopijo dvostopenjsko prijavo z aplikacijo za overjanje (TOTP). Za te uporabnike prijava z `email` + `password`, `authGuid` ali SSO ne vrne žetona. Namesto tega vrne izziv:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Žeton izziva velja 5 minut. Pošljite ga nazaj na isti naslov skupaj s kodo:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

Polje `mfaCode` lahko vsebuje trenutno 6-mestno kodo iz aplikacije za overjanje ali eno od uporabnikovih desetih enkratnih rezervnih kod. Napačna koda vrne `Invalid code`, ponavljajoče se neuspešne poskuse pa se omejuje na ravni računa. Ponovna prijava z `jwt` izziva nikoli ne zahteva, zato obstoječe seje še naprej ostajajo veljavne. Objekt `user` v odgovoru na prijavo vsebuje polje `mfaEnabled`.

Krajevne storitve za samostojno upravljanje (samo za prijavljenega uporabnika, pod `/membership/users/mfa`):

| Konec | Opis |
|-------|------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Začne nastavitev; vrne `{ secret, otpauthUrl }` za QR kodo |
| `POST /enable` | Telo `{ code }`; vklopi dvostopenjsko prijavo in enkrat vrne `{ backupCodes }` |
| `POST /disable` | Telo `{ code }` (koda iz aplikacije ali rezervna koda); izklopi prijavo |
| `POST /reset/:userId` | Samo Server.Admin; izklopi prijavo za drugega uporabnika |

Skrivni ključi so shranjeni šifrirano, rezervne kode pa kot zgoščene vrednosti. Vklop, izklop in ponastavitev se zapišejo v revizijski dnevnik.

### Vsebina žetona

JWT vsebuje:
- `id` — ID uporabnika
- `churchId` — trenutno izbrana cerkev
- `personId` — zapis osebe v izbrani cerkvi
- Polja dovoljenj za posamezen API

### Izbira cerkve

Uporabniki so lahko člani več cerkva. Odgovor na prijavo vsebuje vse cerkve z njihovimi dovoljenji. Za preklop med cerkvama odjemalec iz podatkov odgovora na prijavo ustvari nov JWT, vezan na drugo cerkev.

## Registracija uporabnikov

### Registracija novega uporabnika

```
POST /membership/users/register
```

**Avtentikacija:** Javno

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Ustvari uporabnika z začasnim geslom in pošlje e-poštno sporočilo za dobrodošlico s povezavo za overjanje. Prvi uporabnik, registriran na novi namestitvi, samodejno dobi dostop skrbnika strežnika.

Sprejeti sta dve neobvezni polji proti robotom: `website` (skrito polje, ki ga pravi uporabniki pustijo prazno) in `fillMs` (koliko milisekund je bil obrazec odprt). Če je polje `website` izpolnjeno ali je `fillMs` manjši od 2000, račun ni ustvarjen, vendar končna točka še vedno vrne običajen odgovor `200`, da roboti ne morejo ugotoviti, da so bili zavrnjeni. Odjemalci, ki obe polji izpustijo, se registrirajo običajno.

### Registracija nove cerkve

```
POST /membership/churches/add
```

**Avtentikacija:** JWT

Po registraciji uporabnika pokličite to končno točko, da ustvarite cerkev in jo povežete z uporabnikom.

## Upravljanje gesel

| Metoda | Pot | Avtentikacija | Opis |
|--------|-----|---------------|------|
| POST | `/membership/users/forgot` | Javno | Pošlje e-poštno sporočilo za ponastavitev gesla. Telo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Javno | Nastavi novo geslo z uporabo overitvenega GUID iz e-poštnega sporočila za ponastavitev. Telo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Spremeni geslo trenutnega uporabnika. Telo: `{ "newPassword": "..." }` |

## Model dovoljenj

Dovoljenja so razvrščena po modulih in uporabnikom dodeljena prek vlog. Vsako dovoljenje ima **vrsto vsebine** in **dejanje**.

### Pregled dovoljenj

| Prikazan razdelek | Vrsta vsebine | Dejanje | Opis |
|-------------------|---------------|---------|------|
| **Udeležba** | Attendance | Checkin | Prijava članov na bogoslužja |
| | Attendance | Edit | Urejanje zapisov o udeležbi |
| | Services | Edit | Upravljanje bogoslužij in časov bogoslužij |
| | Attendance | View | Ogled zapisov o udeležbi |
| | Attendance | View Summary | Ogled povzetkov in poročil o udeležbi |
| **Darovi** | Donations | Edit | Ustvarjanje in urejanje zapisov o darovih |
| | Settings | Edit | Urejanje nastavitev darovanja in plačil |
| | Donations | View Summary | Ogled povzetkov darov |
| | Donations | View | Ogled posameznih zapisov o darovih |
| **Osebe in skupine** | Forms | Admin | Popolno upravljanje obrazcev |
| | Forms | Edit | Urejanje definicij obrazcev |
| | Plans | Edit | Urejanje načrtov bogoslužij |
| | Group Members | Edit | Dodajanje in odstranjevanje članov skupin |
| | Groups | Edit | Ustvarjanje in urejanje skupin |
| | Households | Edit | Urejanje dodelitev gospodinjstev |
| | People | Edit | Urejanje katerega koli zapisa osebe |
| | People | Edit Self | Urejanje samo lastnega zapisa osebe |
| | Roles | Edit | Upravljanje vlog in dodelitev uporabnikom |
| | Group Members | View | Ogled seznamov članov skupin |
| | People | View Members | Ogled samo članov (ne obiskovalcev) |
| | People | View | Ogled vseh oseb |
| | Roles | View | Ogled vlog in dodelitev |
| | Settings | Edit | Urejanje nastavitev cerkve |
| **Vsebina** | Content | Edit | Urejanje strani, razdelkov in elementov |
| | Settings | Edit | Urejanje nastavitev vsebine |
| | StreamingServices | Edit | Upravljanje konfiguracije pretočnih storitev |
| | Chat | Host | Gostitev in moderiranje kramljalnih sej |
| **Sporočanje** | Texting | Send | Pošiljanje SMS sporočil |

### Preverjanje dovoljenj

V krmilnikih se dovoljenja preverjajo z metodo `au.checkAccess()`:

```typescript
// Zahtevaj določeno dovoljenje
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Ali znotraj actionWrapper — sistem CRUD preveri samodejno
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Skrbnik strežnika

Dovoljenje `Server.Admin` omogoča poln dostop do vseh cerkva. Dodeli se prvemu registriranemu uporabniku, drugim pa se lahko dodeli prek vloge skrbnika strežnika.

## OAuth 2.0

API podpira OAuth 2.0 za integracije tretjih oseb. Na voljo sta dva tipa odobritev.

### Tok z avtorizacijsko kodo

1. **Avtorizacija:** `POST /membership/oauth/authorize` (zahtevan JWT)
   - Telo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, samo `S256`) sta obvezna za javne odjemalce brez skrivnosti
   - Vrne: `{ "code": "...", "state": "..." }`

2. **Zamenjava kode za žeton:** `POST /membership/oauth/token` (Javno)
   - Telo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Pošljite `code_verifier`, če je bil v koraku avtorizacije uporabljen `code_challenge`; javni odjemalci izpustijo `client_secret`. Sprejeta so telesa v formatu JSON ali kodirana z obrazcem
   - Vrne: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Osvežitev žetona:** `POST /membership/oauth/token` (Javno)
   - Telo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Dostopni žetoni potečejo po **12 urah**.

### Tok s kodo za napravo (RFC 8628)

Za naprave brez brskalnika (aplikacije za televizorje, kiosk računalniki):

1. **Zahtevaj kodo naprave:** `POST /membership/oauth/device/authorize` (Javno)
   - Telo: `{ "client_id": "...", "scope": "..." }`
   - Vrne: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Uporabnik vnese kodo** na naslovu za preverjanje in odobri ali zavrne zahtevo

3. **Poizvedba za žeton:** `POST /membership/oauth/token` (Javno)
   - Telo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Dokler zahteva ni odobrena, vrne `authorization_pending`; nato vrne dostopni žeton

### Upravljanje odjemalcev OAuth

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Seznam vseh odjemalcev OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Pridobi odjemalca po ID-ju |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Pridobi odjemalca po ID-ju odjemalca (skrivnost je skrita) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Ustvari ali posodobi odjemalca |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Izbriše odjemalca |
| POST | `/membership/oauth/register` | Javno | — | Dinamična registracija odjemalca (RFC 7591) za javne odjemalce, kot so konektorji MCP. Glejte [Povezane aplikacije](../connected-apps#dynamic-client-registration) |

### Končne točke za odobritev naprav

| Metoda | Pot | Avtentikacija | Opis |
|--------|-----|---------------|------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Pridobi podatke o čakajoči kodi naprave za vmesnik za odobritev |
| POST | `/membership/oauth/device/approve` | JWT | Odobri avtorizacijo naprave. Telo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Zavrni avtorizacijo naprave. Telo: `{ "user_code": "..." }` |

## Javne in overjene končne točke

API uporablja dve ovojni funkciji, ki določata zahteve za avtentikacijo:

- **`actionWrapper`** — zahteva veljaven JWT. Overjeni objekt uporabnika (`au`) je na voljo z `churchId`, `userId` in preverjanji dovoljenj.
- **`actionWrapperAnon`** — ne zahteva avtentikacije. Uporablja se za prijavo, registracijo, javne poizvedbe po vsebini in sprejemnike webhookov.

V tabelah končnih točk v tej dokumentaciji so te oznake v stolpcu Avtentikacija označene kot **JWT** oziroma **Javno**.

## Sorodne strani

- [Struktura modulov](../module-structure) — Kako so organizirani krmilniki, repozitoriji in modeli
- [Lokalna namestitev](../local-setup) — Zagon API-ja lokalno za razvoj
