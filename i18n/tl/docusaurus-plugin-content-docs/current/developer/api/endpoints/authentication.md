---
title: "Authentication at Mga Pahintulot"
---

# Authentication at Mga Pahintulot

<div class="article-intro">

Gumagamit ang ChurchApps API ng JWT-based na authentication. Nagla-login ang mga gumagamit upang makatanggap ng token na nag-e-encode ng kanilang pagkakakilanlan, membership sa simbahan, at mga pahintulot. Sinasaklaw ng pahinang ito ang daloy ng auth, modelo ng pahintulot, at suporta sa OAuth.

</div>

## Daloy ng Pag-login

### Karaniwang Pag-login

```
POST /membership/users/login
```

**Auth:** Pampubliko

Tumatanggap ng isa sa tatlong uri ng kredensyal:

| Field | Paglalarawan |
|-------|-------------|
| `email` + `password` | Karaniwang pag-login gamit ang email/password |
| `jwt` | Muling pag-authenticate gamit ang umiiral na JWT |
| `authGuid` | Isang beses na auth link (ginagamit sa mga welcome/reset na email) |

**Tugon:**

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

Ang field na `token` ay isang JWT na dapat ipadala bilang `Authorization: Bearer <token>` sa mga susunod na kahilingan.

### Nilalaman ng Token

Ang JWT ay nag-e-encode ng:
- `id` — ID ng Gumagamit
- `churchId` — Kasalukuyang napiling simbahan
- `personId` — Talaan ng tao para sa napiling simbahan
- Mga array ng pahintulot bawat API

### Pagpili ng Simbahan

Ang mga gumagamit ay maaaring kabilang sa maraming simbahan. Kasama sa tugon ng pag-login ang lahat ng simbahan kasama ang kanilang mga pahintulot. Upang lumipat ng simbahan, ang client ay bumubuo ng bagong JWT na naka-scope sa ibang simbahan mula sa data ng tugon ng pag-login.

## Pagpaparehistro ng Gumagamit

### Magrehistro ng Bagong Gumagamit

```
POST /membership/users/register
```

**Auth:** Pampubliko

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Lumilikha ng gumagamit na may pansamantalang password at nagpapadala ng welcome email na may auth link. Ang unang gumagamit na nagrehistro sa bagong instance ay awtomatikong binibigyan ng server admin access.

### Magrehistro ng Bagong Simbahan

```
POST /membership/churches/add
```

**Auth:** JWT

Pagkatapos magrehistro ng gumagamit, tawagan ang endpoint na ito upang lumikha ng simbahan at iugnay ang gumagamit dito.

## Pamamahala ng Password

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Pampubliko | Magpadala ng email para sa pag-reset ng password. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pampubliko | Magtakda ng bagong password gamit ang auth GUID mula sa reset email. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Baguhin ang password ng kasalukuyang gumagamit. Body: `{ "newPassword": "..." }` |

## Modelo ng Pahintulot

Ang mga pahintulot ay inorganisa ayon sa module at itinatalaga sa mga gumagamit sa pamamagitan ng mga tungkulin. Ang bawat pahintulot ay may **uri ng nilalaman** at isang **aksyon**.

### Sanggunian ng Pahintulot

| Seksyon ng Display | Uri ng Nilalaman | Aksyon | Paglalarawan |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Mag-check in ng mga miyembro sa mga serbisyo |
| | Attendance | Edit | Mag-edit ng mga talaan ng attendance |
| | Services | Edit | Pamahalaan ang mga serbisyo at oras ng serbisyo |
| | Attendance | View | Tingnan ang mga talaan ng attendance |
| | Attendance | View Summary | Tingnan ang mga buod at ulat ng attendance |
| **Mga Donasyon** | Donations | Edit | Lumikha at mag-edit ng mga talaan ng donasyon |
| | Settings | Edit | Mag-edit ng mga setting ng pagbibigay/bayad |
| | Donations | View Summary | Tingnan ang mga buod na ulat ng donasyon |
| | Donations | View | Tingnan ang mga indibidwal na talaan ng donasyon |
| **Mga Tao at Grupo** | Forms | Admin | Buong administrasyon ng form |
| | Forms | Edit | Mag-edit ng mga kahulugan ng form |
| | Plans | Edit | Mag-edit ng mga plano ng serbisyo |
| | Group Members | Edit | Magdagdag/mag-alis ng mga miyembro ng grupo |
| | Groups | Edit | Lumikha at mag-edit ng mga grupo |
| | Households | Edit | Mag-edit ng mga takdang-aralin sa sambahayan |
| | People | Edit | Mag-edit ng anumang talaan ng tao |
| | People | Edit Self | Mag-edit lamang ng sariling talaan ng tao |
| | Roles | Edit | Pamahalaan ang mga tungkulin at takdang-aralin ng gumagamit |
| | Group Members | View | Tingnan ang mga listahan ng miyembro ng grupo |
| | People | View Members | Tingnan lamang ang mga miyembro (hindi mga bisita) |
| | People | View | Tingnan ang lahat ng tao |
| | Roles | View | Tingnan ang mga tungkulin at takdang-aralin |
| | Settings | Edit | Mag-edit ng mga setting ng simbahan |
| **Nilalaman** | Content | Edit | Mag-edit ng mga pahina, seksyon, elemento |
| | Settings | Edit | Mag-edit ng mga setting ng nilalaman |
| | StreamingServices | Edit | Pamahalaan ang configuration ng streaming service |
| | Chat | Host | Mag-host/mag-moderate ng mga sesyon ng chat |
| **Pagmemensahe** | Texting | Send | Magpadala ng mga SMS text message |

### Paano Sinusuri ang mga Pahintulot

Sa mga controller, sinusuri ang mga pahintulot gamit ang `au.checkAccess()` method:

```typescript
// Mangailangan ng partikular na pahintulot
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// O sa loob ng actionWrapper — awtomatikong sinusuri ng CRUD system
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Server Admin

Ang pahintulot na `Server.Admin` ay nagbibigay ng ganap na access sa lahat ng simbahan. Ito ay itinatalaga sa unang nagrehistrong gumagamit at maaaring ibigay sa iba sa pamamagitan ng tungkulin ng server admin.

## OAuth 2.0

Sinusuportahan ng API ang OAuth 2.0 para sa mga third-party na integrasyon. Dalawang uri ng grant ang magagamit.

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (kailangan ng JWT)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Nagbabalik: `{ "code": "...", "state": "..." }`

2. **Ipagpalit ang code para sa token:** `POST /membership/oauth/token` (Pampubliko)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Nagbabalik: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Pampubliko)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Ang mga access token ay nag-e-expire pagkatapos ng **12 oras**.

### Device Code Flow (RFC 8628)

Para sa mga device na walang browser (mga TV app, kiosk):

1. **Humiling ng device code:** `POST /membership/oauth/device/authorize` (Pampubliko)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Nagbabalik: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Ilagay ng gumagamit ang code** sa verification URI at mag-approve o mag-deny

3. **Mag-poll para sa token:** `POST /membership/oauth/token` (Pampubliko)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Nagbabalik ng `authorization_pending` hanggang sa ma-approve, pagkatapos ay nagbabalik ng access token

### Pamamahala ng OAuth Client

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Ilista ang lahat ng OAuth client |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Kunin ang client ayon sa ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Kunin ang client ayon sa client ID (nakatago ang secret) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Lumikha o mag-update ng isang client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Burahin ang isang client |

### Mga Endpoint ng Pag-approve ng Device

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Kunin ang impormasyon ng naghihintay na device code para sa approval UI |
| POST | `/membership/oauth/device/approve` | JWT | Aprubahan ang isang device authorization. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Tanggihan ang isang device authorization. Body: `{ "user_code": "..." }` |

## Mga Pampubliko vs Naka-authenticate na Endpoint

Gumagamit ang API ng dalawang wrapper function na tumutukoy sa mga kinakailangan sa authentication:

- **`actionWrapper`** — Nangangailangan ng valid na JWT. Ang authenticated user object (`au`) ay magagamit na may `churchId`, `userId`, at mga pagsusuri ng pahintulot.
- **`actionWrapperAnon`** — Hindi kailangan ng authentication. Ginagamit para sa pag-login, pagpaparehistro, mga pampublikong paghahanap ng nilalaman, at mga tumatanggap ng webhook.

Sa mga talahanayan ng endpoint sa buong dokumentasyong ito, ang mga ito ay ipinapakita bilang **JWT** at **Pampubliko** ayon sa pagkakabanggit sa kolum ng Auth.

## Mga Kaugnay na Pahina

- [Istraktura ng Module](../module-structure) — Kung paano inorganisa ang mga controller, repository, at modelo
- [Lokal na Pag-setup](../local-setup) — Pagpapatakbo ng API nang lokal para sa development
