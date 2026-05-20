---
title: "Connected Apps & OAuth"
---

# Connected Apps & OAuth

<div class="article-intro">

The B1 API supports OAuth 2.0 so a third-party application can ask each church admin for permission to access their data — without the church ever sharing a password or API key. A **Connected App** is an OAuth token a church admin has approved; revoking it severs the third-party app's access in one click. Use this path for multi-tenant SaaS connectors. For a single-church integration prefer [API Keys](./api-keys).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- An OAuth **client** must be registered (currently by a B1 server admin) before churches can grant it access
- All OAuth endpoints live under the Membership module: `/membership/oauth/...`
- Access tokens are JWTs — they carry the user's permissions filtered by the granted scopes

</div>

## Concepts

| Term | Meaning |
|---|---|
| **OAuth client** | The third-party app itself — identified by `client_id`, secured by `client_secret`. Registered once with B1, shared across all churches that install it. |
| **Connected App** | A specific `(client, church-admin)` pair where the admin has granted the client access. Each Connected App is backed by an OAuth refresh token. |
| **Access token** | A short-lived JWT (≈ 7 days) the client uses for API calls. Same shape as a user JWT — `Authorization: Bearer <jwt>`. |
| **Refresh token** | A long-lived opaque string (≈ 90 days) the client uses to mint new access tokens. |
| **Scope** | Narrows what the access token can do — see the [scope catalog](./api-keys#scopes). |

## Grant Flows

B1 supports three OAuth flows, all defined by RFC 6749 + RFC 8628.

### Authorization Code (web apps)

Use when your app has a server-side component and can keep `client_secret` private.

1. **Authorize**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Returns `{ "code": "...", "state": "xyz" }`. The authorization-code endpoint is intentionally an authenticated POST — your app collects the user's B1 JWT (typically by hosting a button in the user's B1 session) and forwards it as part of the consent step.

2. **Exchange code for tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Returns the token response:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Refresh** when the access token is about to expire:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   The refresh token expires after 90 days of disuse; if it's expired the church admin re-authorizes.

### Device Code (TVs, kiosks, CLI)

Use when the device has no browser. Defined by RFC 8628.

1. **Request a device code**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Returns the user-facing code and the polling interval:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Display `user_code` + `verification_uri` to the user.

3. **Poll** `/membership/oauth/token` with `grant_type=urn:ietf:params:oauth:grant-type:device_code` and the `device_code`. Standard responses:

   | Error | Meaning |
   |---|---|
   | `authorization_pending` | User hasn't approved yet — keep polling at the suggested interval |
   | `expired_token` | Device code is past `expires_in` — start over |
   | `access_denied` | User denied the request |
   | _(none — 200 OK)_ | Approved — the body is a `B1TokenResponse` |

4. Once approved, store the `refresh_token` and use the `access_token` until it expires.

The B1 SDK includes `B1OAuthClient.awaitDeviceToken(...)` that runs the polling loop for you with sane RFC-compliant backoff.

### Refresh Token

Always available as a standalone request once you hold a `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

A new `access_token` and `refresh_token` come back. **Public clients** (no `client_secret`) can omit `client_secret` on refresh — useful for mobile/desktop OAuth apps that can't keep a secret.

## Token Shape

An access token is a B1-issued JWT identical to one a user would get from `POST /membership/users/login` — same modular permission claim, same `checkAccess` behavior in every controller — **except** the permissions array has been filtered through the granted scopes at mint time. A scoped access token cannot do anything a similarly-scoped API key cannot, and there is no separate "OAuth path" in any controller; `actionWrapper` is unaware whether the bearer is a person, an API key, or an OAuth client.

## Connected Apps (User-Facing)

From a church admin's point of view, "Connected Apps" is the list of apps that have been granted access to their church. Each row is a live `(OAuthClient, OAuthToken)` pair.

In B1Admin: **Settings → Developer → Connected Apps** shows:

- The client's name
- The scopes the admin approved
- The date access was granted
- A **Revoke** button

| Method & Path | Auth | Purpose |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | List the caller's own active connections (joined with the client name + scopes) |
| `DELETE /membership/oauth/connections/:id` | JWT | Revoke a connection by its OAuth-token id — the token stops working on the next request |

The list excludes expired tokens automatically.

## Scopes & Consent

The scope strings are the same catalog as [API keys](./api-keys#scopes). Best practices for clients:

- **Request the narrowest scopes that work.** Churches notice if you ask for `donations:write` when you only need to read people.
- **Use a refresh token plus short-lived access tokens.** Long-lived access tokens are harder to revoke quickly.
- **Always present the granted scopes back to the user** in your own UI so they can verify what they consented to.

## OAuth Client Management

OAuth clients (the third-party apps themselves) are currently registered globally by a B1 server admin. Per-church self-registration is on the roadmap — until then, to ship a public connector you contact the ChurchApps team to mint a `client_id` / `client_secret` pair and register your redirect URIs.

| Method & Path | Permission | Description |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | List all OAuth clients |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Get a client by its public id (secret redacted) |
| `POST /membership/oauth/clients` | Server.Admin | Create or update a client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Delete a client |

## SDK Support

The `@churchapps/integration-sdk` package wraps every OAuth flow with typed helpers — `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. See the package README and [Webhooks](./webhooks#sdk-support) for an end-to-end example.
