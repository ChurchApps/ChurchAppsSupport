---
title: "Authentication & Permissions"
description: "Reference for the ChurchApps API's JWT login, sign-in codes, SSO, two-factor sign-in, OAuth 2.0 flows, API keys, and permission model for developers."
---

# Authentication & Permissions

<div class="article-intro">

The ChurchApps API uses JWT-based authentication. Users log in to receive a token that encodes their identity, church membership, and permissions. This page covers the sign-in flows (password, emailed code, single sign-on, two-factor), the permission model, OAuth, the provider relay used by TV apps, and API key management.

</div>

## Login Flow

### Standard Login

```
POST /membership/users/login
```

**Auth:** Public

Accepts one of three credential types:

| Field | Description |
|-------|-------------|
| `email` + `password` | Standard email/password login |
| `jwt` | Re-authenticate with an existing JWT |
| `authGuid` | One-time auth GUID, from `verifyCode`, an invite email link, or `register` when the server has no email configured |

**Response:**

```json
{
  "user": {
    "id": "abc-123",
    "email": "jane@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "jwt": "<user-jwt>"
  },
  "userChurches": [
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
          ],
          "jwt": "<api-jwt>"
        }
      ],
      "jwt": "<church-jwt>"
    }
  ]
}
```

There is no top-level token. Each `userChurches` entry carries a `jwt` scoped to that church; send it as `Authorization: Bearer <jwt>` on subsequent requests. `user.jwt` identifies the user only (no church, no permissions), and each `apis` entry has a `jwt` of its own with the same claims as the church token plus `apiName`. All of them expire after 2 days; `user.jwt` can still be posted back to this endpoint as `jwt` for 30 days after that to get a fresh response.

The example is abbreviated. Each `church` also carries `archivedDate`, its address fields, and a `settings` array holding its logo settings; each group also has `tags`; each permission also has `contentId`; and `apis` can include a `ReportingApi` entry with an empty `permissions` list. A failed login answers `401` with `{ "errors": ["Login failed"] }`, and too many failed attempts answer `429`.

### Two-Factor Sign-In

Users can turn on authenticator-app (TOTP) two-factor sign-in. For those users, an `email` + `password`, `authGuid`, or SSO login does not return a token. It answers with a challenge instead:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

The challenge token is good for 5 minutes. Post it back to the same endpoint with the code:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` can be the current 6-digit authenticator code or one of the user's ten single-use backup codes. A wrong code returns `Invalid code`, and repeated failures are rate limited per account. A `jwt` re-login is never challenged, so existing sessions keep refreshing. The login response does not say whether two-factor sign-in is on; a signed-in user reads that from `GET /status` below.

The endpoints below manage two-factor sign-in. The first four act on the signed-in user's own account; the reset is for server admins.

Base path: `/membership/users/mfa`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/status` | JWT | — | The caller's own status: `{ enabled, backupCodesLeft }` |
| POST | `/setup` | JWT | — | Starts (or restarts) setup; returns `{ secret, otpauthUrl }` for the QR code. Nothing is enforced until `/enable` succeeds. 400 if two-factor sign-in is already on |
| POST | `/enable` | JWT | — | Body: `{ code }`, the current authenticator code for the secret from `/setup`. Turns it on and returns `{ backupCodes }` once. 400 for a wrong code (`Invalid code`) or when no setup is pending (`Start setup again`); 429 after 10 wrong codes in 15 minutes |
| POST | `/disable` | JWT | — | Body: `{ code }` (authenticator or backup code). Turns it off and returns `{ enabled: false }`. 400 `Invalid code`; 429 after 10 wrong codes in 15 minutes, a budget shared with the sign-in challenge |
| POST | `/reset/:userId` | JWT | Server.Admin | Turns it off for another user by deleting that user's two-factor record. No code from that user is needed. Returns `{ enabled: false }` |

Secrets are stored encrypted and backup codes are stored as hashes. Enable, disable, and reset are written to the audit log.

### Email Sign-In Codes

A user can also sign in with a 6-digit code sent to their email address instead of a password. A code is good for 10 minutes and works once. The server must have outgoing email configured.

Base path: `/membership/users`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/requestLoginCode` | Public | — | Email a sign-in code. Body: `{ email }`. Always answers `{ emailed: true }`, so the response does not reveal whether the address has an account. A new code replaces any sign-in or password reset code issued earlier. 400 for an invalid address or when the server has no email configured; 429 after 10 requests for one address in 15 minutes (a budget shared with `/forgot`) |
| POST | `/loginWithCode` | Public | — | Sign in with the code. Body: `{ email, code, appName? }`. Returns the same response as `POST /login`, or the `{ mfaRequired, mfaToken }` challenge when the user has two-factor sign-in on. A wrong, expired, or used code returns 400 `Invalid or expired code`. Each code allows 5 attempts and is then discarded; 429 after 10 failed attempts for one address in 15 minutes (a budget shared with `/verifyCode`) |

A per-IP ceiling of 50 counted attempts in 15 minutes, shared with the other sign-in endpoints, also applies.

### Single Sign-On

Google and Microsoft sign-in run as a browser redirect flow. A provider is offered only when the server has a client ID and secret configured for it.

Base path: `/membership/users/sso`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | Public | — | List the configured providers, for example `["google", "microsoft"]` |
| GET | `/authorize/:provider?returnUrl=` | Public | — | Start sign-in: sets a 10-minute `sso_state` cookie and redirects (302) to the provider's account chooser. `returnUrl` is where the browser ends up afterwards. It must be an `https` URL on `b1.church` or one of its subdomains, or an origin or host the server lists in `SSO_ALLOWED_ORIGINS`; `localhost` is accepted on development servers only. 400 for an unknown or unconfigured provider, or a `returnUrl` that is not allowed |
| GET | `/callback/:provider?code=&state=` | Public | — | Where the provider sends the browser back; clients do not call it directly. Checks the signed `state` (good for 10 minutes) against the cookie, verifies the provider's ID token, and requires an email address the provider has verified, then finds the user with that email or creates one. Redirects (302) to `returnUrl` with the result in the URL fragment: `#jwt=` (a user token good for 10 minutes; post it to `/membership/users/login` as `jwt`), `#mfaToken=` (the two-factor challenge, when the user has it on), or `#loginError=` (a message). 400 when `state` is invalid or expired |

### Token Contents

A church `jwt` encodes:
- `id` — User ID (with `email`, `firstName`, and `lastName`)
- `churchId` — The church the token is scoped to
- `personId` — Person record for that church
- `permissions` — The user's permissions in that church, as one flat list
- `groupIds`, `leaderGroupIds`, and `membershipStatus` — The person's groups, the groups they lead, and their membership status

### Church Selection

Users may belong to multiple churches. The login response has one `userChurches` entry per church, each with its permissions and its own `jwt`. To switch churches, the client sends the `jwt` from that church's entry; it does not generate tokens itself.

## User Registration

### Register a New User

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

Creates a user with a random temporary password and emails a 6-digit verification code that is good for 15 minutes. The client passes that code to `POST /membership/users/verifyCode` to get an `authGuid`, then sets a password with `setPasswordGuid` (see [Password Management](#password-management)). The response is the new user plus `mailConfigured`. When the server has no email configured, no code is sent: the response has `mailConfigured: false` and carries an `authGuid`, good for 15 minutes, to use directly. An address that already has an account returns 400 `user already exists`. The first user registered on a new instance is automatically granted server admin access.

One optional bot-trap field is accepted: `fillMs`, how long the form was open, in milliseconds. If `fillMs` is a number under 2000, no account is created, but the endpoint still returns a normal-looking `200` so bots can't tell they were rejected. Clients that omit it register as usual. There is no honeypot field; a `website` value is ignored.

Registration is limited to 20 requests per IP address per hour. Further requests answer `429`.

### Register a New Church

```
POST /membership/churches/add
```

**Auth:** JWT

After registering a user, call this endpoint to create a church and associate the user with it.

### Check Whether an Email Has an Account

Sign-in and registration forms can ask whether an address already belongs to a user before choosing which step to show.

Base path: `/membership/users`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/checkEmail` | Public | — | Body: `{ email }`. Returns `{ exists, peopleMatches }`: `exists` says whether a user account has that address, and `peopleMatches` is always an empty array. 400 for an invalid address; 429 after 60 calls from one IP in 10 minutes |

## Password Management

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Send a password reset email. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/verifyCode` | Public | Check the 6-digit code from a password reset or registration email (good for 15 minutes). Body: `{ "email": "...", "code": "..." }`. Returns `{ "authGuid": "..." }`, valid for 15 minutes, to pass to `setPasswordGuid`. Sign-in codes are not accepted here. 400 `invalid code` or `code expired`; 429 `too many attempts` on the sixth try at one code, which discards it; 429 after 10 wrong codes for one address in 15 minutes (a budget shared with `loginWithCode`) |
| POST | `/membership/users/setPasswordGuid` | Public | Set a new password using an auth GUID. The GUID comes from `verifyCode` (after a reset or registration code), from the `register` response when the server has no email configured, or from the link in an invite email. Body: `{ "authGuid": "...", "newPassword": "..." }`; `newPassword` must be at least 6 characters (400 otherwise). Returns `{ "success": true, "email": "..." }` and clears the GUID, or `{ "success": false }` (still a 200) when the GUID is unknown or expired |
| POST | `/membership/users/updatePassword` | JWT | Change the current user's password. Body: `{ "currentPassword": "...", "newPassword": "..." }`. Both are required, and `newPassword` must be at least 6 characters (400 otherwise). A wrong `currentPassword` returns 401 `Incorrect password` |

## Permission Model

Permissions are organized by module and assigned to users through roles. Each permission has a **content type** and an **action**.

### Permission Reference

| Display Section | Content Type | Action | Description |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Check in members at services |
| | Attendance | Edit | Edit attendance records |
| | Services | Edit | Manage services and service times |
| | Attendance | View | View attendance records |
| | Attendance | View Summary | View attendance summaries and reports |
| **Donations** | Donations | Edit | Create and edit donation records |
| | Donations | Enter | Add or change donations in batches that are still open; gateway payments stay Edit only |
| | Settings | Edit | Edit giving/payment settings |
| | Donations | View Summary | View donation summary reports |
| | Donations | View | View individual donation records |
| **People and Groups** | Forms | Admin | Full form administration |
| | Forms | Edit | Edit form definitions |
| | Plans | Edit | Edit service plans |
| | Group Members | Edit | Add/remove group members |
| | Groups | Edit | Create and edit groups |
| | Households | Edit | Edit household assignments |
| | People | Edit | Edit any person record |
| | People | Edit Self | Edit only your own person record |
| | Roles | Edit | Manage roles and user assignments |
| | Group Members | View | View group member lists |
| | People | View Members | View members only (not visitors) |
| | People | View Names | View names only; people searches return the basic record |
| | People | View | View all people |
| | People | View Confidential Notes | View confidential notes on a person |
| | Roles | View | View roles and assignments |
| | Settings | Edit | Edit church settings |
| **Content** | Content | Edit | Edit pages, sections, elements |
| | Settings | Edit | Edit content settings |
| | StreamingServices | Edit | Manage streaming service configuration |
| | Chat | Host | Host/moderate chat sessions |
| | Registrations | View | View event registrations and their payments |
| | Registrations | Edit | Manage event registrations: types, selections, coupons, payments, and refunds |
| | Calendars | Admin | Resolve calendar conflicts and approvals; accepted in place of Content Edit on event endpoints |
| **Messaging** | Texting | Send | Send SMS text messages |
| | Messaging | Admin | Messaging administration: delivery logs, and other people's devices and notifications |
| **Tasks** | Tasks | View | View workflows and cards |
| | Tasks | Edit | Edit all cards and tasks |
| | Tasks | Admin | Manage workflows and automations |
| **Lessons** | Schedules | Edit | Edit lesson schedules (Lessons API) |
| | Content | Edit | Edit content (Lessons API) |

### How Permissions Are Checked

Every handler checks its own permissions. `actionWrapper` passes the handler the caller as `au`, and the handler calls `au.checkAccess()` with the permission it needs:

```typescript
@httpPost("/")
public async save(req: express.Request<{}, {}, Campus[]>, res: express.Response): Promise<unknown> {
  return this.actionWrapper(req, res, async (au) => {
    // Require a specific permission
    if (!au.checkAccess(Permissions.settings.edit)) return this.json({}, 401);

    // ...save the campuses, scoped to au.churchId
  });
}
```

There is no generic CRUD layer: each handler calls `checkAccess` for the permission it needs, and the endpoint tables show that permission in the Permission column (`—` when a route needs no particular permission). `checkAccess` returns `true` only when the caller's token carries that content type and action; a failed check normally answers `401` with an empty JSON body.

### Server Admin

The `Server.Admin` permission grants full access across all churches. This is assigned to the first registered user and can be granted to others through the server admin role.

## Server Admin User Tools

Support endpoints for inspecting a user account and signing in as that user. Both answer 401 unless the caller has `Server.Admin`. The user search (`GET /membership/users/search`) is listed under [Membership: Users](./membership.md#users), and the two-factor reset under [Two-Factor Sign-In](#two-factor-sign-in).

Base path: `/membership/users`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/details` | JWT | Server.Admin | Account summary for any user: `{ id, email, firstName, lastName, registrationDate, lastLogin, mfaEnabled, churches }`. Each church is `{ id, name, subDomain, viaMembership, viaRoles }`, where the two flags say whether the user is linked to it by a user-church record, by a role, or both. 404 if the user does not exist |
| GET | `/:id/impersonate` | JWT | Server.Admin | Returns `{ jwt }`, a user token for the target user. It is good for 2 hours and cannot be refreshed once it expires. Post it to `/login` as `jwt` to get that user's login response. Each call is written to the audit log with the admin's user ID and IP address. 404 if the user does not exist |

## OAuth 2.0

The API supports OAuth 2.0 for third-party integrations. Two grant types are available.

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (JWT required)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, `S256` only) are required for public clients with no secret
   - Returns: `{ "code": "...", "state": "..." }`

2. **Exchange code for token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Send `code_verifier` when the authorize step used a `code_challenge`; public clients omit `client_secret`. JSON or form-encoded bodies are accepted
   - Returns: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 604800, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access tokens expire after **7 days** by default (`expires_in` is `604800` seconds). A self-hosted API can change that with the `OAUTH_ACCESS_TOKEN_SECONDS` environment variable. Refresh tokens expire after **90 days**. See [Connected Apps](../connected-apps.md#refresh-token) for how refresh tokens rotate.

### Device Code Flow (RFC 8628)

For devices without a browser (TV apps, kiosks):

1. **Request device code:** `POST /membership/oauth/device/authorize` (Public)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Returns: `{ "device_code": "...", "user_code": "ABCD23", "verification_uri": "https://admin.b1.church/device", "verification_uri_complete": "https://admin.b1.church/device?code=ABCD23", "expires_in": 900, "interval": 5 }`
   - `user_code` is 6 letters and digits with no hyphen. `verification_uri` is the server's B1Admin address followed by `/device`, and `verification_uri_complete` is the same address with the code already filled in

2. **User enters the code** at the verification URI and approves or denies

3. **Poll for token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Returns `authorization_pending` until approved, then returns the access token

### Authorization and Token Endpoints

The endpoints the two flows above use. Errors are answered with status 400 and an OAuth-style body such as `{ "error": "invalid_grant" }`.

Base path: `/membership/oauth`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/authorize` | JWT | — | Issue an authorization code for the signed-in user and the church in their JWT. Body: `{ client_id, redirect_uri, response_type, scope, state?, code_challenge?, code_challenge_method? }`. `redirect_uri` must exactly match one registered for the client, `response_type` must be `code`, and a client with no secret must send an `S256` `code_challenge`. Returns `{ code, state }`; the code works once and expires after 10 minutes. 400 with `invalid_client`, `invalid_redirect_uri`, `unsupported_response_type`, `invalid_request`, or `access_denied` (the caller has no user-church record for that church) |
| POST | `/token` | Public | — | Exchange a grant for tokens. The body (JSON or form-encoded) carries `client_id` and a `grant_type` of `authorization_code` (with `code`, plus `code_verifier` when the code was issued with a challenge), `refresh_token` (with `refresh_token`), or `urn:ietf:params:oauth:grant-type:device_code` (with `device_code`). A client that has a secret must also send `client_secret`, except on the device grant. Returns `{ access_token, token_type, expires_in, created_at, refresh_token, scope }`, plus `plan_type_id` when one was chosen at device approval. 400 with `invalid_client`, `invalid_request`, `invalid_grant`, or `unsupported_grant_type`; on the device grant, `authorization_pending` means keep polling, and `expired_token` or `access_denied` end the flow |
| POST | `/device/authorize` | Public | — | Start the device flow. Body: `{ client_id, scope? }`; `scope` defaults to `content offline_access`. Returns `{ device_code, user_code, verification_uri, verification_uri_complete, expires_in, interval }`: a 6-character `user_code`, `expires_in` of 900 seconds, and a polling `interval` of 5 seconds. 400 `invalid_request` without `client_id`; 400 `invalid_client` for an unknown or self-registered client |

### OAuth Client Management

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | List all OAuth clients |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Get client by ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Get client by client ID (secret redacted) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Create or update a client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Delete a client |
| POST | `/membership/oauth/register` | Public | — | Dynamic client registration (RFC 7591) for public clients such as MCP connectors. See [Connected Apps](../connected-apps.md#dynamic-client-registration) |

### Device Approval Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Get pending device code info for approval UI |
| POST | `/membership/oauth/device/approve` | JWT | Approve a device authorization. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Deny a device authorization. Body: `{ "user_code": "..." }` |

### Connected Apps

The apps a user has authorized, as listed in B1Admin under **Settings → Developer → Connected Apps**. See [Connected Apps & OAuth](../connected-apps.md#connected-apps-user-facing) for the concepts.

Base path: `/membership/oauth`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/connections` | JWT | Settings.Edit | List the caller's own active connections in the current church: `[{ id, clientId, clientName, scopes, createdAt, expiresAt }]`. Expired tokens are left out, and so are rotated tokens kept only for the refresh grace window |
| DELETE | `/connections/:id` | JWT | Settings.Edit | Revoke one of the caller's own connections by its token id. Deletes the stored token and any rotated predecessors still in the refresh grace window, so its refresh token can no longer be used. 404 if the id is unknown; 403 if the token is not the caller's own in the current church |

## Provider Relay

A TV app cannot receive an OAuth redirect, so the API relays sign-in to external content providers (cloud drives, curriculum libraries) on its behalf. The device creates a relay session, sends the user to the provider's sign-in page with the session's `redirectUri` as the redirect URI and the session code as `state`, then polls until the provider has called back. None of these routes takes a B1 login: the session code, the PKCE verifier, or the provider's own token is the credential. A session lasts 15 minutes.

Base path: `/membership/oauth/relay`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/sessions` | Public | — | Create a relay session. Body: `{ provider, codeChallenge? }`: `provider` is the content provider's id, and `codeChallenge` is a PKCE S256 challenge, needed if the device will call `/exchange`. Returns `{ sessionCode, redirectUri, expiresIn, interval }`: an 8-character code, the callback URL to give the provider, 900 seconds, and a polling interval of 5 seconds. 400 `invalid_request` if `provider` is missing or the challenge is malformed |
| GET | `/sessions/:sessionCode` | Public | — | Poll a session. Returns `{ status, expiresIn }` while it is pending. After the provider has called back it returns `{ status: "completed", authCode }` once and deletes the session; the device then exchanges the code with the provider itself. 404 if the code is unknown or expired |
| GET | `/callback?code=&state=` | Public | — | The redirect target the provider sends the user's browser to, with `state` set to the session code. Stores the authorization code on the pending session and shows an HTML confirmation page. A provider `error`, a missing parameter, or a session that is expired or already completed shows an HTML error page instead |
| POST | `/sessions/:sessionCode/exchange` | Public | — | Poll and exchange in one call, for the providers whose client secret the server holds (`onedrive`, `googledrive`). Body: `{ codeVerifier }`, which must match the `codeChallenge` the session was created with. Returns `{ status, expiresIn }` while pending. Once the provider has called back it deletes the session, exchanges the code with the provider, and returns `{ status: "completed", access_token, refresh_token, token_type, expires_in, scope, created_at }`. 404 for an unknown or expired session; 400 `unsupported_provider`, `invalid_request` (malformed verifier, or a session created without a challenge), or `invalid_grant` (the verifier does not match, or the provider refused the code); 500 if the provider's secret is not configured |
| POST | `/refresh` | Public | — | Refresh provider tokens for `onedrive` or `googledrive`. Body: `{ provider, refreshToken }`. Returns `{ access_token, refresh_token, token_type, expires_in, scope, created_at }`; when the provider issues no new refresh token, the one sent in is returned. 400 `unsupported_provider`, `invalid_request`, or `invalid_grant`; 500 if the provider's secret is not configured |
| POST | `/gocurriculum/catalog` | Public | — | Load a Go Curriculum group's private catalog. Body: `{ groupId, accessToken }`, where `accessToken` is the user's Go Curriculum token; it is verified with the provider before anything is returned. 400 `invalid_request` if either field is missing; 404 `not_found` for an invalid login or an unknown group; 429 `too_many_requests` after 300 calls from one IP in an hour |

## API Keys

Endpoints for managing a church's API keys (`cak_` bearer tokens). See [API Keys](../api-keys.md) for the key format, the scope catalog, and how to use a key.

Base path: `/membership/apiKeys`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | List the church's keys, newest first. The stored hash is never returned; each entry has `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, and `createdAt`, plus the `churchId`, `personId`, and `userId` the key is bound to |
| GET | `/scopes` | JWT | Settings.Edit | `{ scopes }`: every scope name a key can be given |
| POST | `/` | JWT | Settings.Edit | Create a key bound to the caller's user, person, and church. Body: `{ name, scopes, expiresAt? }` (one object, not an array). `scopes` is an array or a space- or comma-separated string; leaving it empty gives the key the caller's full permissions. The response is the key record plus `key`, the raw `cak_<prefix>.<secret>` value, which is returned this one time only. 400 for an unknown scope name |
| DELETE | `/:id` | JWT | Settings.Edit | Delete one of the church's keys. Returns `{}` whether or not the id matched a key |

## Public vs Authenticated Endpoints

The API's wrapper functions determine authentication requirements:

- **`actionWrapper`** (and its variant `actionWrapperAuth`) — For routes that expect a JWT. The authenticated user object (`au`) is available with `churchId`, `id`, and permission checks.
- **`actionWrapperAnon`** — No authentication required. Used for login, registration, public content lookups, and webhook receivers.

In the endpoint tables throughout this documentation, these are indicated as **JWT** and **Public** respectively in the Auth column.

## Related Pages

- [API Keys](../api-keys.md) — Key format, scopes, and using a key
- [Connected Apps & OAuth](../connected-apps.md) — OAuth clients, grant flows, refresh tokens, and revoking access
- [MCP Server](../mcp.md) — OAuth discovery and sign-in for MCP clients
- [Module Structure](../module-structure.md) — How controllers, repositories, and models are organized
- [Local Setup](../local-setup.md) — Running the API locally for development
