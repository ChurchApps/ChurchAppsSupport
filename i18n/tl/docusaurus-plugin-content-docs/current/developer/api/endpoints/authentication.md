---
title: "Authentication at Mga Pahintulot"
---

# Authentication at Mga Pahintulot

<div class="article-intro">

Gumagamit ang ChurchApps API ng JWT-based na authentication. Nag-log in ang mga user para makatanggap ng token na naglalaman ng kanilang pagkakakilanlan, pagiging miyembro sa simbahan, at mga pahintulot. Tinatalakay ng pahinang ito ang daloy ng auth, ang modelo ng pahintulot, at ang suporta sa OAuth.

</div>

## Daloy ng Login

### Karaniwang Login

```
POST /membership/users/login
```

**Auth:** Public

Tumatanggap ng isa sa tatlong uri ng kredensyal:

| Field | Paglalarawan |
|-------|-------------|
| `email` + `password` | Karaniwang login gamit ang email at password |
| `jwt` | Mag-authenticate muli gamit ang umiiral nang JWT |
| `authGuid` | Isang beses na auth link (ginagamit sa mga welcome at reset email) |

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

Ang field na `token` ay isang JWT na dapat ipadala bilang `Authorization: Bearer <token>` sa mga kasunod na request.

### Nilalaman ng Token

Ini-encode ng JWT ang:
- `id` — ID ng user
- `churchId` — Kasalukuyang piniling simbahan
- `personId` — Record ng tao para sa napiling simbahan
- Mga array ng pahintulot bawat API

### Pagpili ng Simbahan

Maaaring kabilang ang mga user sa maraming simbahan. Kasama sa tugon ng login ang lahat ng simbahan at ang kanilang mga pahintulot. Para magpalipat ng simbahan, gagawa ang client ng bagong JWT na nakasaklaw sa ibang simbahan mula sa datos ng tugon ng login.

## Pagpaparehistro ng User

### Magrehistro ng Bagong User

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

Gumagawa ng user na may pansamantalang password at nagpapadala ng welcome email na may auth link. Ang unang user na nairehistro sa bagong instance ay awtomatikong binibigyan ng access bilang server admin.

Dalawang opsyonal na bot-trap field ang tinatanggap: `website` (isang nakatagong honeypot field na iniiwan ng totoong user na walang laman) at `fillMs` (gaano katagal bukas ang form, sa milliseconds). Kapag may laman ang `website` o mas mababa sa 2000 ang `fillMs`, walang gagawing account, pero nagbabalik pa rin ang endpoint ng karaniwang `200` para hindi malaman ng mga bot na tinanggihan sila. Ang mga client na hindi nagpapadala ng dalawang field na ito ay nakakarehistro nang normal.

### Magrehistro ng Bagong Simbahan

```
POST /membership/churches/add
```

**Auth:** JWT

Pagkatapos magrehistro ng user, tawagin ang endpoint na ito para gumawa ng simbahan at iugnay ang user dito.

## Pamamahala ng Password

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Magpadala ng email para sa pag-reset ng password. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Magtakda ng bagong password gamit ang auth GUID mula sa reset email. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Palitan ang password ng kasalukuyang user. Body: `{ "newPassword": "..." }` |

## Modelo ng Pahintulot

Nakaayos ang mga pahintulot ayon sa module at itinatalaga sa mga user sa pamamagitan ng mga tungkulin. Ang bawat pahintulot ay may **content type** at isang **action**.

### Sanggunian ng Pahintulot

| Seksyon sa Display | Content Type | Action | Paglalarawan |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | I-check in ang mga miyembro sa mga serbisyo |
| | Attendance | Edit | I-edit ang mga attendance record |
| | Services | Edit | Pamahalaan ang mga serbisyo at oras ng serbisyo |
| | Attendance | View | Tingnan ang mga attendance record |
| | Attendance | View Summary | Tingnan ang mga buod at ulat ng attendance |
| **Donations** | Donations | Edit | Gumawa at mag-edit ng mga donation record |
| | Settings | Edit | I-edit ang mga setting ng pagbibigay/pagbabayad |
| | Donations | View Summary | Tingnan ang mga ulat ng buod ng donasyon |
| | Donations | View | Tingnan ang mga indibidwal na donation record |
| **People and Groups** | Forms | Admin | Buong pamamahala ng form |
| | Forms | Edit | I-edit ang mga kahulugan ng form |
| | Plans | Edit | I-edit ang mga plano ng serbisyo |
| | Group Members | Edit | Magdagdag/mag-alis ng miyembro ng grupo |
| | Groups | Edit | Gumawa at mag-edit ng mga grupo |
| | Households | Edit | I-edit ang mga takdang sambahayan |
| | People | Edit | I-edit ang anumang record ng tao |
| | People | Edit Self | I-edit ang sarili mong record ng tao lamang |
| | Roles | Edit | Pamahalaan ang mga tungkulin at takdang user |
| | Group Members | View | Tingnan ang mga listahan ng miyembro ng grupo |
| | People | View Members | Tingnan ang mga miyembro lamang (hindi mga bisita) |
| | People | View | Tingnan ang lahat ng tao |
| | Roles | View | Tingnan ang mga tungkulin at takdang |
| | Settings | Edit | I-edit ang mga setting ng simbahan |
| **Content** | Content | Edit | I-edit ang mga pahina, seksyon, elemento |
| | Settings | Edit | I-edit ang mga setting ng nilalaman |
| | StreamingServices | Edit | Pamahalaan ang configuration ng streaming service |
| | Chat | Host | I-host/i-moderate ang mga chat session |
| **Messaging** | Texting | Send | Magpadala ng SMS text message |

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

Ang pahintulot na `Server.Admin` ay nagbibigay ng buong access sa lahat ng simbahan. Ito ay itinatalaga sa unang nairehistrong user at maaaring ibigay sa iba sa pamamagitan ng server admin role.

## OAuth 2.0

Sinusuportahan ng API ang OAuth 2.0 para sa mga third-party integration. May dalawang grant type na available.

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (kailangan ang JWT)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - Ang `code_challenge` / `code_challenge_method` (PKCE, `S256` lamang) ay kinakailangan para sa mga public client na walang secret
   - Nagbabalik ng: `{ "code": "...", "state": "..." }`

2. **Palitan ang code ng token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Ipadala ang `code_verifier` kapag may `code_challenge` ang hakbang ng authorize; hindi isinasama ng mga public client ang `client_secret`. Tinatanggap ang JSON o form-encoded na body
   - Nagbabalik ng: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **I-refresh ang token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Nag-e-expire ang mga access token pagkalipas ng **12 oras**.

### Device Code Flow (RFC 8628)

Para sa mga device na walang browser (mga TV app, kiosk):

1. **Humiling ng device code:** `POST /membership/oauth/device/authorize` (Public)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Nagbabalik ng: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Ilalagay ng user ang code** sa verification URI at aaprubahan o tatanggihan ito

3. **Mag-poll para sa token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Nagbabalik ng `authorization_pending` hanggang maaprubahan, at saka ibinabalik ang access token

### Pamamahala ng OAuth Client

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Ilista ang lahat ng OAuth client |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Kunin ang client ayon sa ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Kunin ang client ayon sa client ID (nakatago ang secret) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Gumawa o mag-update ng client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Burahin ang isang client |
| POST | `/membership/oauth/register` | Public | — | Dynamic client registration (RFC 7591) para sa mga public client gaya ng MCP connector. Tingnan ang [Connected Apps](../connected-apps#dynamic-client-registration) |

### Mga Endpoint ng Pag-apruba ng Device

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Kunin ang impormasyon ng nakabinbing device code para sa UI ng pag-apruba |
| POST | `/membership/oauth/device/approve` | JWT | Aprubahan ang isang device authorization. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Tanggihan ang isang device authorization. Body: `{ "user_code": "..." }` |

## Mga Public vs. Naka-authenticate na Endpoint

Gumagamit ang API ng dalawang wrapper function na nagtatakda ng mga kinakailangan sa authentication:

- **`actionWrapper`** — Nangangailangan ng balidong JWT. Available ang naka-authenticate na user object (`au`) na may `churchId`, `userId`, at mga pagsusuri ng pahintulot.
- **`actionWrapperAnon`** — Walang kinakailangang authentication. Ginagamit para sa login, pagpaparehistro, mga public na paghahanap ng content, at mga webhook receiver.

Sa mga talahanayan ng endpoint sa buong dokumentasyong ito, ang mga ito ay ipinapakita bilang **JWT** at **Public** sa column na Auth.

## Mga Kaugnay na Pahina

- [Module Structure](../module-structure) — Paano inaayos ang mga controller, repository, at model
- [Local Setup](../local-setup) — Pagpapatakbo ng API nang lokal para sa development
