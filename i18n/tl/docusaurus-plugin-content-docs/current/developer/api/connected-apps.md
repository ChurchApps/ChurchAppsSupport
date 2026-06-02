---
title: "Connected Apps at OAuth"
---

# Connected Apps at OAuth

<div class="article-intro">

Ang B1 API ay sumusuporta ng OAuth 2.0 upang ang isang third-party application ay maaaring magtanong sa bawat church admin para sa pahintulot upang maka-access ng kanilang data. Ang **Connected App** ay isang OAuth token na aprubado ng church admin. Para sa multi-tenant SaaS connectors, gamitin ang approach na ito. Para sa isang single-church integration, mas pinili ang [API Keys](./api-keys).

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Ang isang OAuth **client** ay dapat na maregister (kasalukuyang ng isang B1 server admin)
- Lahat ng OAuth endpoints ay nabubuhay sa ilalim ng Membership module: `/membership/oauth/...`
- Ang mga access token ay JWTs

</div>

## Mga Konsepto

| Termino | Kahulugan |
|---|---|
| **OAuth client** | Ang third-party app mismo -- kinikilala ng `client_id`, secured ng `client_secret` |
| **Connected App** | Isang partikular na `(client, church-admin)` pares kung saan ang admin ay nagbigay ng access sa client |
| **Access token** | Isang maikling buhay JWT (ang client ay gumagamit para sa API calls) |
| **Refresh token** | Isang mahabang buhay na opaque string (ang client ay gumagamit upang mag-mint ng bagong access token) |
| **Scope** | Naghahangad kung ano ang access token ay maaaring gawin |

## Mga Grant Flow

Ang B1 ay sumusuporta ng tatlong OAuth flows, lahat ay tinukoy ng RFC 6749 + RFC 8628.

### Authorization Code (web apps)

Gamitin kapag ang iyong app ay may isang server-side component at maaaring panatilihin ang `client_secret` na pribado.

1. **Mag-authorize**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

2. **Palitan ang code para sa mga token**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

3. **I-refresh** kapag ang access token ay papalapit nang maging expired:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

### Device Code (TVs, kiosks, CLI)

Gamitin kapag ang device ay walang browser.

1. **Magsikap ng isang device code**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

2. I-display ang `user_code` + `verification_uri` sa user.

3. **Mag-poll** `/membership/oauth/token` hanggang ang user ay nag-approve.

### Refresh Token

Palaging available bilang isang standalone request minsan na mayroon kang `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

## Connected Apps (User-Facing)

Sa B1Admin: **Settings → Developer → Connected Apps** ay nagpapakita ng mga app na ibinigyan ng access.

| Pamamaraan at Path | Auth | Layunin |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Listahan ang mga sariling active connections |
| `DELETE /membership/oauth/connections/:id` | JWT | I-revoke ang isang koneksyon |

## Mga Scope at Pagsang-ayon

Ang mga string ng scope ay pareho ng catalog bilang [API keys](./api-keys#scopes).

Best practices para sa mga client:

- **Humiling ng pinakamaliit na mga scope na gumagana.**
- **Gumamit ng isang refresh token pang short-lived access tokens.**
- **Palaging ipasok ang mga binigyang scope pabalik sa user** sa iyong sariling UI.

## OAuth Client Management

Ang mga OAuth client ay kasalukuyang nagrehistro ng pandaigdig ng isang B1 server admin.

| Pamamaraan at Path | Pahintulot | Paglalarawan |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Listahan ang lahat ng OAuth clients |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Kumuha ng isang client |
| `POST /membership/oauth/clients` | Server.Admin | Lumikha o mag-update ng isang client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Tanggalin ang isang client |

## SDK Support

Ang `@churchapps/integration-sdk` package ay may typed helpers para sa bawat OAuth flow.
