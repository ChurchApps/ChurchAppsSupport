---
title: "Kutivakalisa & Timvumo"
---

# Kutivakalisa & Timvumo

<div class="article-intro">

I-ChurchApps API isebentisa kutivakalisa lokusekelwe yi-JWT. Bantfu bangena kutfola token lekhipha buni bawo, buhlengwa belibandla, kanye netimvumo. Lelikhasi likhomba inchubo yekutivakalisa, sifanekiso semvumo, kanye nekusekelwa kwe-OAuth.

</div>

## Inchubo Yekungena

### Kungena Lokuvamile

```
POST /membership/users/login
```

**Kutivakalisa:** Ngeyeveleni

Yamukela lolunye lwaletinhlobo letintsatfu tefakazi:

| Insimu | Incazelo |
|-------|-------------|
| `email` + `password` | Kungena lokuvamile nge-imeyili/liphasiwedi |
| `jwt` | Tivakalise kabusha nge-JWT lesele ikhona |
| `authGuid` | Umkhondvo wekungena wekanyekanye (osetjentiswa ku-imeyili yekwemukela/yekusetjwa kabusha) |

**Imphendvulo:**

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

Insimu ye-`token` yi-JWT lekufanele itfunyelwe njenge-`Authorization: Bearer <token>` kuticelo letilandzelako.

### Kucuketfwe Kwe-Token

I-JWT ikhipha:
- `id` — I-ID yemsebentisi
- `churchId` — Libandla lelikhethiwe njengamanje
- `personId` — Umbhalo womuntfu welibandla lelikhethiwe
- Luhla lwetimvumo ngayinye ye-API

### Kukhetsa Libandla

Bantfu bangaba kulamabandla lamanyenti. Imphendvulo yekungena ifaka onkhe emabandla netimvumo tawo. Kushintja emabandla, i-client yakha i-JWT lensha lekhitwe kulelinye libandla kusuka kudatha yemphendvulo yekungena.

## Kubhaliswa Kwemsebentisi

### Bhalisa Umsebentisi Lomusha

```
POST /membership/users/register
```

**Kutivakalisa:** Ngeyeveleni

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Yakha umsebentisi ngephasiwedi yesikhashana futsi itfumela i-imeyili yekwemukela lene-umkhondvo wekungena. Umsebentisi wekucala lobhaliswe ku-instance lensha unikwa ngekutentekela kufinyelela kwe-server admin.

### Bhalisa Libandla Lelisha

```
POST /membership/churches/add
```

**Kutivakalisa:** JWT

Ngemuva kwekubhalisa umsebentisi, bita le-endpoint kwakha libandla nekuhlanganisa umsebentisi nalo.

## Kuphatsa Liphasiwedi

| Inchubo | Umkhondvo | Kutivakalisa | Incazelo |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Ngeyeveleni | Tfumela i-imeyili yekusetja liphasiwedi kabusha. Umtimba: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Ngeyeveleni | Setja liphasiwedi lelisha kusetjentiswa i-auth GUID lesuka ku-imeyili yekusetja kabusha. Umtimba: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Shintja liphasiwedi lemsebentisi wanyalo. Umtimba: `{ "newPassword": "..." }` |

## Sifanekiso Semvumo

Timvumo tihlelwe nge-module futsi tinikwe basebentisi ngema-role. Imvumo ngayinye inayo **luhlobo lwekucuketfwe** kanye ne**sento**.

### Luhla Lwetimvumo

| Sigaba Sekubonisa | Luhlobo Lwekucuketfwe | Sento | Incazelo |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Ngenisa emalunga enkhonzweni |
| | Attendance | Edit | Hlela imibhalo yekubakhona |
| | Services | Edit | Phatsa ema-service nemasikhatsi awo |
| | Attendance | View | Buka imibhalo yekubakhona |
| | Attendance | View Summary | Buka sifingqo netincwadzi tekubakhona |
| **Donations** | Donations | Edit | Akha futsi uhlele imibhalo yeminikelo |
| | Settings | Edit | Hlela tilungiselelo teminikelo/tinkhokhelo |
| | Donations | View Summary | Buka tincwadzi tesifingqo seminikelo |
| | Donations | View | Buka imibhalo yeminikelo yakamunye |
| **People and Groups** | Forms | Admin | Kuphatsa lokugcwele kwemafomu |
| | Forms | Edit | Hlela ticazelo temafomu |
| | Plans | Edit | Hlela ema-plan e-service |
| | Group Members | Edit | Engeta/susa emalunga elicembu |
| | Groups | Edit | Akha futsi uhlele emacembu |
| | Households | Edit | Hlela kwabelwa emakhaya |
| | People | Edit | Hlela nome ngimuphi umbhalo womuntfu |
| | People | Edit Self | Hlela kuphela umbhalo wakho |
| | Roles | Edit | Phatsa ema-role kanye nekwabelwa kwabasebentisi |
| | Group Members | View | Buka luhla lwemalunga elicembu |
| | People | View Members | Buka emalunga kuphela (hhayi tivakashi) |
| | People | View | Buka bonkhe bantfu |
| | Roles | View | Buka ema-role nekwabelwa |
| | Settings | Edit | Hlela tilungiselelo telibandla |
| **Content** | Content | Edit | Hlela emakhasi, tigaba, ema-element |
| | Settings | Edit | Hlela tilungiselelo tekucuketfwe |
| | StreamingServices | Edit | Phatsa kuhlelwa kwe-service yekusakaza |
| | Chat | Host | Phatsa/lawula ticgawu te-chat |
| **Messaging** | Texting | Send | Tfumela imilayeto ye-SMS |

### Indlela Timvumo Letihlolwa Ngayo

Ku-ema-controller, timvumo tihlolwa kusetjentiswa indlela le-`au.checkAccess()`:

```typescript
// Dzinga imvumo lekhetsekile
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Nobe ngekhatsi kwe-actionWrapper — layela le-CRUD liyahlola ngekutentekela
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Server Admin

Imvumo ye-`Server.Admin` iniketa kufinyelela lokugcwele kuwo wonkhe emabandla. Loku kunikwa umsebentisi wekucala lobhaliswe futsi kunganiketwa labanye ngendlela ye-role ye-server admin.

## OAuth 2.0

I-API isekela i-OAuth 2.0 kuhlanganiswa kwelucezu lwesitsatfu. Tinhlobo letimbili te-grant tiyatfolakala.

### Inchubo Ye-Authorization Code

1. **Authorize:** `POST /membership/oauth/authorize` (JWT iyadzingeka)
   - Umtimba: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Kubuya: `{ "code": "...", "state": "..." }`

2. **Shintjanisa code ibe token:** `POST /membership/oauth/token` (Ngeyeveleni)
   - Umtimba: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Kubuya: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Ngeyeveleni)
   - Umtimba: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Ema-Access token ayaphela ngemuva **kwemahora langu-12**.

### Inchubo Ye-Device Code (RFC 8628)

Kuma-divayisi langenayo i-browser (ema-app e-TV, ema-kiosk):

1. **Cela device code:** `POST /membership/oauth/device/authorize` (Ngeyeveleni)
   - Umtimba: `{ "client_id": "...", "scope": "..." }`
   - Kubuya: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Umsebentisi ufaka code** ku-verification URL bese uyavuma nobe uyala

3. **Polla kutfola token:** `POST /membership/oauth/token` (Ngeyeveleni)
   - Umtimba: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Ibuyisela `authorization_pending` kuze kuvunywe, bese ibuyisela i-access token

### Kuphatsa I-OAuth Client

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Bala tonkhe ema-OAuth client |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Tfola client nge-ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Tfola client nge-client ID (imfihlo iyafihlwa) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Akha nobe buyeketa client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Sula client |

### Ema-Endpoint Ekuvuma Kwe-Device

| Inchubo | Umkhondvo | Kutivakalisa | Incazelo |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Tfola imininingwane ye-device code lelindzele kwe-UI yekuvuma |
| POST | `/membership/oauth/device/approve` | JWT | Vuma kutivakalisa kwe-device. Umtimba: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Yala kutivakalisa kwe-device. Umtimba: `{ "user_code": "..." }` |

## Ema-Endpoint Eveleni Kanye Naletivakalisiwe

I-API isebentisa ema-function lamabili e-wrapper lachaza tidzingo tekutivakalisa:

- **`actionWrapper`** — Idzinga i-JWT lesebentako. Sitfo semsebentisi lotivakalisiwe (`au`) siyatfolakala ne-`churchId`, `userId`, kanye nekuhlolwa kwemvumo.
- **`actionWrapperAnon`** — Akukho kutivakalisa lokudzingekako. Kusetjentiswa kukungena, kubhaliswa, kufuna kucuketfwe kwelibandla, kanye nabemukeli bewebhook.

Kuletafula tema-endpoint kulo lonkhe lombhalo, loku kukhonjiswa kutsi **JWT** kanye ne**Ngeyeveleni** ekholomeni yeKutivakalisa.

## Emakhasi Lahlobene

- [Module Structure](../module-structure) — Kuhlelwa kwema-controller, ema-repository, kanye nema-model
- [Local Setup](../local-setup) — Kusebentisa i-API endzaweni yakho kutfutfuka
