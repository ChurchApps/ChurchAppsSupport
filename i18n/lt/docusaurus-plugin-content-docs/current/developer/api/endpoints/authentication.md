---
title: "Autentifikavimas ir leidimai"
---

# Autentifikavimas ir leidimai

<div class="article-intro">

ChurchApps API naudoja JWT pagrindu veikiantį autentifikavimą. Vartotojas prisijungia ir gauna prieigos raktą (token), kuriame užkoduota jo tapatybė, bažnyčios narystė ir leidimai. Šiame puslapyje aprašoma prisijungimo eiga, leidimų modelis ir OAuth palaikymas.

</div>

## Prisijungimo eiga

### Standartinis prisijungimas

```
POST /membership/users/login
```

**Auth:** Viešas

Priimami vienas iš trijų prisijungimo duomenų tipų:

| Laukas | Aprašymas |
|-------|-------------|
| `email` + `password` | Standartinis prisijungimas el. paštu ir slaptažodžiu |
| `jwt` | Pakartotinis autentifikavimas su esamu JWT |
| `authGuid` | Vienkartinė autentifikavimo nuoroda (naudojama sveikinimo ir slaptažodžio atstatymo laiškuose) |

**Atsakymas:**

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

Laukas `token` yra JWT, kuris vėlesnėse užklausose turi būti siunčiamas kaip `Authorization: Bearer <token>`.

### Dviejų veiksnių prisijungimas

Vartotojai gali įjungti dviejų veiksnių prisijungimą per autentifikatoriaus programėlę (TOTP). Tokiems vartotojams prisijungimas su `email` + `password`, `authGuid` ar SSO negrąžina prieigos rakto. Vietoj jo atsakoma užduotimi (challenge):

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Užduoties raktas galioja 5 minutes. Jį su kodu reikia vėl atsiųsti į tą patį galutinį tašką:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` gali būti dabartinis 6 skaitmenų autentifikatoriaus kodas arba vienas iš dešimties vienkartinių atsarginių vartotojo kodų. Neteisingas kodas grąžina `Invalid code`, o pakartotinės klaidos ribojamos kiekvienai paskyrai. Prisijungimas iš naujo su `jwt` niekada nereikalauja patvirtinimo, todėl esamos sesijos ir toliau atnaujinamos. Prisijungimo atsakymo objekte `user` yra laukas `mfaEnabled`.

Savitarnos galutiniai taškai (tik prisijungusiam vartotojui, pagal `/membership/users/mfa`):

| Galutinis taškas | Aprašymas |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Pradeda nustatymą; grąžina `{ secret, otpauthUrl }` QR kodui |
| `POST /enable` | Turinys `{ code }`; įjungia ir vieną kartą grąžina `{ backupCodes }` |
| `POST /disable` | Turinys `{ code }` (autentifikatoriaus arba atsarginis kodas); išjungia |
| `POST /reset/:userId` | Tik Server.Admin; išjungia kitam vartotojui |

Slaptieji raktai saugomi užšifruoti, o atsarginiai kodai – kaip maišos reikšmės. Įjungimas, išjungimas ir atstatymas įrašomi į audito žurnalą.

### Prieigos rakto turinys

JWT užkoduoja:
- `id` — vartotojo ID
- `churchId` — šiuo metu pasirinkta bažnyčia
- `personId` — asmens įrašas pasirinktoje bažnyčioje
- kiekvieno API leidimų masyvus

### Bažnyčios pasirinkimas

Vartotojai gali priklausyti kelioms bažnyčioms. Prisijungimo atsakyme pateikiamos visos bažnyčios su jų leidimais. Norėdamas perjungti bažnyčią, klientas sugeneruoja naują JWT, kuris apribotas kita bažnyčia, remdamasis prisijungimo atsakymo duomenimis.

## Vartotojo registracija

### Naujo vartotojo registravimas

```
POST /membership/users/register
```

**Auth:** Viešas

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Sukuriamas vartotojas su laikinu slaptažodžiu ir išsiunčiamas sveikinimo laiškas su autentifikavimo nuoroda. Pirmajam vartotojui, užregistruotam naujame serveryje, automatiškai suteikiama serverio administratoriaus prieiga.

Priimami du neprivalomi laukai, skirti apsisaugoti nuo botų: `website` (paslėptas apgavystės laukas, kurį tikri vartotojai palieka tuščią) ir `fillMs` (kiek milisekundžių forma buvo atidaryta). Jei `website` užpildytas arba `fillMs` mažesnis nei 2000, paskyra nesukuriama, bet galutinis taškas vis tiek grąžina įprastą `200` atsakymą, kad botai negalėtų atpažinti atmetimo. Klientai, kurie abiejų laukų nepateikia, registruojami įprastai.

### Naujos bažnyčios registravimas

```
POST /membership/churches/add
```

**Auth:** JWT

Užregistravus vartotoją, kviečiamas šis galutinis taškas, kad būtų sukurta bažnyčia ir ji susieta su vartotoju.

## Slaptažodžio valdymas

| Metodas | Kelias | Auth | Aprašymas |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Viešas | Išsiųsti slaptažodžio atstatymo laišką. Turinys: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Viešas | Nustatyti naują slaptažodį naudojant autentifikavimo GUID iš atstatymo laiško. Turinys: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Pakeisti dabartinio vartotojo slaptažodį. Turinys: `{ "newPassword": "..." }` |

## Leidimų modelis

Leidimai suskirstyti pagal modulius ir priskiriami vartotojams per vaidmenis. Kiekvienas leidimas turi **turinio tipą** ir **veiksmą**.

### Leidimų žinynas

| Rodomas skyrius | Turinio tipas | Veiksmas | Aprašymas |
|----------------|--------------|--------|-------------|
| **Lankomumas** | Lankomumas | Registruoti | Registruoti narius į pamaldas |
| | Lankomumas | Redaguoti | Redaguoti lankomumo įrašus |
| | Paslaugos | Redaguoti | Tvarkyti paslaugas ir pamaldų laikus |
| | Lankomumas | Peržiūrėti | Peržiūrėti lankomumo įrašus |
| | Lankomumas | Peržiūrėti santrauką | Peržiūrėti lankomumo santraukas ir ataskaitas |
| **Aukos** | Aukos | Redaguoti | Kurti ir redaguoti aukų įrašus |
| | Nustatymai | Redaguoti | Redaguoti aukojimo ir mokėjimo nustatymus |
| | Aukos | Peržiūrėti santrauką | Peržiūrėti aukų santraukos ataskaitas |
| | Aukos | Peržiūrėti | Peržiūrėti atskirus aukų įrašus |
| **Žmonės ir grupės** | Formos | Administravimas | Visiškas formų administravimas |
| | Formos | Redaguoti | Redaguoti formų apibrėžimus |
| | Planai | Redaguoti | Redaguoti paslaugų planus |
| | Grupių nariai | Redaguoti | Pridėti į grupes ar šalinti iš jų narius |
| | Grupės | Redaguoti | Kurti ir redaguoti grupes |
| | Namų ūkiai | Redaguoti | Redaguoti namų ūkių priskyrimus |
| | Asmenys | Redaguoti | Redaguoti bet kurį asmens įrašą |
| | Asmenys | Redaguoti savo | Redaguoti tik savo asmens įrašą |
| | Vaidmenys | Redaguoti | Tvarkyti vaidmenis ir vartotojų priskyrimus |
| | Grupių nariai | Peržiūrėti | Peržiūrėti grupių narių sąrašus |
| | Asmenys | Peržiūrėti narius | Peržiūrėti tik narius (ne svečius) |
| | Asmenys | Peržiūrėti | Peržiūrėti visus asmenis |
| | Vaidmenys | Peržiūrėti | Peržiūrėti vaidmenis ir priskyrimus |
| | Nustatymai | Redaguoti | Redaguoti bažnyčios nustatymus |
| **Turinys** | Turinys | Redaguoti | Redaguoti puslapius, skyrius, elementus |
| | Nustatymai | Redaguoti | Redaguoti turinio nustatymus |
| | Transliacijų paslaugos | Redaguoti | Tvarkyti transliacijų paslaugos konfigūraciją |
| | Pokalbis | Vesti | Vesti ir moderuoti pokalbių sesijas |
| **Žinutės** | Tekstinės žinutės | Siųsti | Siųsti SMS tekstines žinutes |

### Kaip tikrinami leidimai

Valdikliuose leidimai tikrinami naudojant `au.checkAccess()` metodą:

```typescript
// Reikalauti konkretaus leidimo
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Arba actionWrapper viduje – CRUD sistema tikrina automatiškai
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Serverio administratorius

Leidimas `Server.Admin` suteikia visišką prieigą prie visų bažnyčių. Jis priskiriamas pirmajam užregistruotam vartotojui ir gali būti suteiktas kitiems per serverio administratoriaus vaidmenį.

## OAuth 2.0

API palaiko OAuth 2.0 trečiųjų šalių integracijoms. Galima naudoti du suteikimo tipus.

### Autorizavimo kodo eiga

1. **Autorizavimas:** `POST /membership/oauth/authorize` (reikalingas JWT)
   - Turinys: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, tik `S256`) privalomi viešiems klientams be slapto rakto
   - Grąžina: `{ "code": "...", "state": "..." }`

2. **Kodo keitimas į prieigos raktą:** `POST /membership/oauth/token` (Viešas)
   - Turinys: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Siųskite `code_verifier`, jei autorizavimo žingsnyje buvo naudotas `code_challenge`; viešieji klientai praleidžia `client_secret`. Priimami JSON arba formos koduoti turiniai
   - Grąžina: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Prieigos rakto atnaujinimas:** `POST /membership/oauth/token` (Viešas)
   - Turinys: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Prieigos raktai galioja **12 valandų**.

### Įrenginio kodo eiga (RFC 8628)

Įrenginiams be naršyklės (TV programėlės, savitarnos terminalai):

1. **Įrenginio kodo užklausa:** `POST /membership/oauth/device/authorize` (Viešas)
   - Turinys: `{ "client_id": "...", "scope": "..." }`
   - Grąžina: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Vartotojas įveda kodą** patvirtinimo adresu ir patvirtina arba atmeta prašymą

3. **Prieigos raktui tikrinti:** `POST /membership/oauth/token` (Viešas)
   - Turinys: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Kol prašymas nepatvirtintas, grąžina `authorization_pending`; patvirtinus – grąžina prieigos raktą

### OAuth klientų valdymas

| Metodas | Kelias | Auth | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Parodyti visus OAuth klientus |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Gauti klientą pagal ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Gauti klientą pagal kliento ID (slaptas raktas paslėptas) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Sukurti arba atnaujinti klientą |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Ištrinti klientą |
| POST | `/membership/oauth/register` | Viešas | — | Dinaminė kliento registracija (RFC 7591) viešiems klientams, pavyzdžiui, MCP jungtims. Žr. [Susietos programėlės](../connected-apps#dynamic-client-registration) |

### Įrenginio patvirtinimo galutiniai taškai

| Metodas | Kelias | Auth | Aprašymas |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Gauti laukiančio įrenginio kodo informaciją patvirtinimo sąsajai |
| POST | `/membership/oauth/device/approve` | JWT | Patvirtinti įrenginio autorizavimą. Turinys: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Atmesti įrenginio autorizavimą. Turinys: `{ "user_code": "..." }` |

## Viešieji ir autentifikuoti galutiniai taškai

API naudoja dvi apvalkalo funkcijas, kurios nustato autentifikavimo reikalavimus:

- **`actionWrapper`** — reikalauja galiojančio JWT. Autentifikuotas vartotojo objektas (`au`) pasiekiamas su `churchId`, `userId` ir leidimų tikrinimu.
- **`actionWrapperAnon`** — autentifikavimo nereikia. Naudojama prisijungimui, registracijai, viešam turinio paieškai ir webhook gavėjams.

Šios dokumentacijos galutinių taškų lentelėse tai nurodoma stulpelyje Auth kaip atitinkamai **JWT** ir **Viešas**.

## Susiję puslapiai

- [Modulio struktūra](../module-structure) — kaip organizuojami valdikliai, saugyklos ir modeliai
- [Vietinė sąranka](../local-setup) — API paleidimas vietoje kūrimui
