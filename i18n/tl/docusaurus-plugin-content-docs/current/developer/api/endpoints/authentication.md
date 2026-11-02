---
title: "Authentication at Permissions"
---

# Authentication at Permissions

<div class="article-intro">

Gumagamit ang ChurchApps API ng JWT-based na authentication. Nagla-log in ang mga user para makatanggap ng token na naglalaman ng kanilang pagkakakilanlan, membership sa simbahan, at mga permiso. Sakop ng pahinang ito ang daloy ng auth, modelo ng permiso, at suporta sa OAuth.

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
| `email` + `password` | Karaniwang login gamit ang email/password |
| `jwt` | Muling mag-authenticate gamit ang umiiral na JWT |
| `authGuid` | Isang beses na auth link (ginagamit sa mga welcome at reset email) |

**Response:**

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

Ang field na `token` ay isang JWT na dapat ipadala bilang `Authorization: Bearer <token>` sa mga susunod na request.

### Two-Factor Sign-In {#two-factor-sign-in}

Maaaring i-on ng mga user ang authenticator-app (TOTP) na two-factor sign-in. Para sa mga user na ito, ang login gamit ang `email` + `password`, `authGuid`, o SSO ay hindi nagbabalik ng token. Sa halip, nagbabalik ito ng challenge:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Valid ang challenge token nang 5 minuto. Ibalik ito sa parehong endpoint kasama ang code:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

Maaaring ang `mfaCode` ay ang kasalukuyang 6-digit na authenticator code o isa sa sampung single-use na backup code ng user. Ang maling code ay nagbabalik ng `Invalid code`, at ang paulit-ulit na pagkabigo ay nilimitahan ang rate bawat account. Hindi kailanman hinahamon ang `jwt` re-login, kaya patuloy na nare-refresh ang mga umiiral na session. Dala ng `user` object ng login response ang `mfaEnabled`.

Mga self-service endpoint (naka-sign in na user lang, sa ilalim ng `/membership/users/mfa`):

| Endpoint | Paglalarawan |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Sinisimulan ang setup; nagbabalik ng `{ secret, otpauthUrl }` para sa QR code |
| `POST /enable` | Body `{ code }`; ino-on ito at nagbabalik ng `{ backupCodes }` nang isang beses lang |
| `POST /disable` | Body `{ code }` (authenticator o backup code); ino-off ito |
| `POST /reset/:userId` | Server.Admin lang; ino-off ito para sa ibang user |

Naka-encrypt na naka-store ang mga secret at naka-store bilang hash ang mga backup code. Naitatala sa audit log ang pag-enable, pag-disable, at pag-reset.

### Nilalaman ng Token

Naka-encode sa JWT ang:
- `id` — User ID
- `churchId` — Kasalukuyang napiling simbahan
- `personId` — Person record para sa napiling simbahan
- Mga array ng permiso bawat API

### Pagpili ng Simbahan

Maaaring kabilang ang mga user sa maraming simbahan. Kasama sa login response ang lahat ng simbahan at ang kanilang mga permiso. Para lumipat ng simbahan, gagawa ang client ng bagong JWT na naka-scope sa ibang simbahan mula sa datos ng login response.

## Pagpaparehistro ng User

### Pagrehistro ng Bagong User

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

Gumagawa ng user na may pansamantalang password at nagpapadala ng welcome email na may auth link. Ang unang user na nairehistro sa bagong instance ay awtomatikong binibigyan ng server admin access.

Dalawang opsyonal na bot-trap field ang tinatanggap: `website` (isang nakatagong honeypot field na iniiwang blangko ng totoong user) at `fillMs` (gaano katagal bukas ang form, sa millisecond). Kung napunan ang `website` o mas mababa sa 2000 ang `fillMs`, walang gagawing account, pero nagbabalik pa rin ang endpoint ng normal na mukhang `200` para hindi malaman ng mga bot na tinanggihan sila. Ang mga client na walang dalawang field na ito ay nagpaparehistro nang karaniwan.

### Pagpaparehistro ng Bagong Simbahan

```
POST /membership/churches/add
```

**Auth:** JWT

Pagkatapos magparehistro ng user, tawagan ang endpoint na ito para gumawa ng simbahan at iugnay ang user dito.

## Pamamahala ng Password

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Magpadala ng password reset email. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Magtakda ng bagong password gamit ang auth GUID mula sa reset email. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Palitan ang password ng kasalukuyang user. Body: `{ "newPassword": "..." }` |

## Modelo ng Permiso

Inaayos ang mga permiso ayon sa module at itinatalaga sa mga user sa pamamagitan ng mga role. May **content type** at **action** ang bawat permiso.

### Sanggunian ng Permiso

| Display Section | Content Type | Action | Paglalarawan |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | I-check in ang mga miyembro sa mga serbisyo |
| | Attendance | Edit | I-edit ang mga record ng attendance |
| | Services | Edit | Pamahalaan ang mga serbisyo at oras ng serbisyo |
| | Attendance | View | Tingnan ang mga record ng attendance |
| | Attendance | View Summary | Tingnan ang mga buod at ulat ng attendance |
| **Donations** | Donations | Edit | Gumawa at mag-edit ng mga record ng donasyon |
| | Settings | Edit | I-edit ang mga setting ng giving/bayad |
| | Donations | View Summary | Tingnan ang mga ulat ng buod ng donasyon |
| | Donations | View | Tingnan ang mga indibidwal na record ng donasyon |
| **People and Groups** | Forms | Admin | Buong administrasyon ng form |
| | Forms | Edit | I-edit ang mga kahulugan ng form |
| | Plans | Edit | I-edit ang mga service plan |
| | Group Members | Edit | Magdagdag/mag-alis ng mga miyembro ng grupo |
| | Groups | Edit | Gumawa at mag-edit ng mga grupo |
| | Households | Edit | I-edit ang mga takda ng household |
| | People | Edit | I-edit ang anumang person record |
| | People | Edit Self | I-edit lang ang sarili mong person record |
| | Roles | Edit | Pamahalaan ang mga role at takda ng user |
| | Group Members | View | Tingnan ang mga listahan ng miyembro ng grupo |
| | People | View Members | Tingnan lang ang mga miyembro (hindi ang mga bisita) |
| | People | View | Tingnan ang lahat ng tao |
| | Roles | View | Tingnan ang mga role at takda |
| | Settings | Edit | I-edit ang mga setting ng simbahan |
| **Content** | Content | Edit | I-edit ang mga pahina, seksyon, elemento |
| | Settings | Edit | I-edit ang mga setting ng nilalaman |
| | StreamingServices | Edit | Pamahalaan ang configuration ng streaming service |
| | Chat | Host | I-host/i-moderate ang mga chat session |
| **Messaging** | Texting | Send | Magpadala ng SMS text message |

### Paano Sinusuri ang Mga Permiso

Sa mga controller, sinusuri ang mga permiso gamit ang method na `au.checkAccess()`:

```typescript
// Mangailangan ng partikular na permiso
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

Ang permiso na `Server.Admin` ay nagbibigay ng buong access sa lahat ng simbahan. Itinatalaga ito sa unang nairehistrong user at maaaring ibigay sa iba sa pamamagitan ng server admin role.

## OAuth 2.0

Sinusuportahan ng API ang OAuth 2.0 para sa mga third-party integration. May dalawang grant type na available.

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (kailangan ng JWT)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - Kailangan ang `code_challenge` / `code_challenge_method` (PKCE, `S256` lang) para sa mga public client na walang secret
   - Nagbabalik: `{ "code": "...", "state": "..." }`

2. **Palitan ang code para sa token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Ipadala ang `code_verifier` kapag gumamit ng `code_challenge` ang authorize step; hindi isinasama ng public client ang `client_secret`. Tinatanggap ang JSON o form-encoded na body
   - Nagbabalik: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Nag-e-expire ang access token pagkalipas ng **12 oras**.

### Device Code Flow (RFC 8628)

Para sa mga device na walang browser (TV app, kiosk):

1. **Humiling ng device code:** `POST /membership/oauth/device/authorize` (Public)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Nagbabalik: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Ilalagay ng user ang code** sa verification URI at aaprubahan o tatanggihan ito

3. **I-poll ang token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Nagbabalik ng `authorization_pending` hanggang maaprubahan, pagkatapos ay ibinabalik ang access token

### Pamamahala ng OAuth Client

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Ilista ang lahat ng OAuth client |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Kunin ang client ayon sa ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Kunin ang client ayon sa client ID (natatakpan ang secret) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Gumawa o mag-update ng client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Burahin ang client |
| POST | `/membership/oauth/register` | Public | — | Dynamic client registration (RFC 7591) para sa mga public client gaya ng MCP connector. Tingnan ang [Connected Apps](../connected-apps#dynamic-client-registration) |

### Mga Endpoint ng Pag-apruba ng Device

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Kunin ang impormasyon ng nakabinbing device code para sa approval UI |
| POST | `/membership/oauth/device/approve` | JWT | Aprubahan ang device authorization. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Tanggihan ang device authorization. Body: `{ "user_code": "..." }` |

## Mga Public at Naka-authenticate na Endpoint

Gumagamit ang API ng dalawang wrapper function na nagtatakda ng mga kinakailangan sa authentication:

- **`actionWrapper`** — Nangangailangan ng wastong JWT. Available ang naka-authenticate na user object (`au`) na may `churchId`, `userId`, at mga pagsusuri ng permiso.
- **`actionWrapperAnon`** — Walang kailangang authentication. Ginagamit para sa login, registration, public content lookup, at webhook receiver.

Sa mga endpoint table sa buong dokumentasyong ito, ipinapahiwatig ang mga ito bilang **JWT** at **Public** ayon sa pagkakasunod sa column na Auth.

## Mga Kaugnay na Pahina

- [Module Structure](../module-structure) — Paano inaayos ang mga controller, repository, at model
- [Local Setup](../local-setup) — Pagpapatakbo ng API nang lokal para sa development
