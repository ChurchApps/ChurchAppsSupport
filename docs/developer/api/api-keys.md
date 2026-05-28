---
title: "API Keys"
---

# API Keys

<div class="article-intro">

API keys (personal access tokens) are the simplest way to authenticate against the B1 API from a server-side script, a third-party connector (Zapier, Make, Google Sheets), or anywhere a full OAuth flow is overkill. A key is bound to a specific person in a specific church and inherits that person's permissions, narrowed by an optional set of scopes.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A church admin with the **Edit Settings** permission creates and manages keys
- The raw key is shown **once** at creation — store it somewhere safe immediately
- All API requests must use **HTTPS**

</div>

## Key Format

A B1 API key looks like:

```
cak_<prefix>.<secret>
```

- `cak_` — fixed identifier (the API key prefix the auth layer matches on)
- `<prefix>` — 8-character public lookup segment
- `<secret>` — 48-character secret; only a SHA-256 hash is stored server-side

The full key is presented to the server in the standard bearer header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

The API auth layer routes any token starting with `cak_` to the API-key path, hashes the secret, looks it up by prefix, and resolves the key's person's current permissions — so revoking a permission in B1Admin takes effect on the very next request, and the key never drifts out of sync with the role.

## Creating a Key (B1Admin)

1. Sign in to B1Admin as a user with **Edit Settings**.
2. Open **Settings → Developer → API Keys**.
3. Click **New API Key**, give it a recognisable name (e.g. "Zapier — donations sync"), select the scopes the key should have, and **Save**.
4. The full `cak_…` key is shown **once** in a dialog. Copy it into your integration's config before closing — there is no way to retrieve it later. You can always create a new key.

## Scopes

A scope **narrows** what a key can do — it can never grant a permission the underlying person does not have. Empty / no scopes means the key carries the person's full permission set.

| Scope | Allows |
|---|---|
| `people:read` / `people:write` | View / edit people, households, group members |
| `groups:read` / `groups:write` | View / edit groups and their membership |
| `donations:read` / `donations:write` | View / record donations |
| `attendance:read` / `attendance:write` | View / record attendance, sessions, check-ins |
| `forms:write` | Manage forms (read access is implicit in write) |
| `content:read` / `content:write` | View / edit website content, registrations, streaming |
| `messaging:read` / `messaging:write` | Read messaging; write also allows sending SMS |
| `roles:read` / `roles:write` | View / edit role definitions |
| `settings:read` / `settings:write` | View / edit church settings (**required** to register webhooks programmatically) |
| `offline_access` | Allow long-lived refresh tokens (OAuth flows only — has no effect on API keys) |

`write` scopes implicitly include the matching `read`. Server- and domain-admin permissions are deliberately not exposed as scopes — a scoped credential can never elevate to site administration.

:::tip
If you'll use the key to register webhooks (e.g. for a Zapier or Make integration), the key needs `settings:write`. A `people:read`-only key silently 403s on `POST /membership/webhooks`.
:::

## Using a Key

Same as any bearer token — every authenticated endpoint accepts API keys exactly as it accepts JWTs:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

A request whose key has insufficient scopes responds **403 Forbidden** with the same shape any permission-denied error uses.

## Managing Keys via the API

All endpoints are under the Membership module's `/membership/apiKeys` path and require a JWT (not an API key) from a church admin with **Edit Settings**.

| Method & Path | Purpose |
|---|---|
| `GET /membership/apiKeys` | List the church's keys (no secret — only `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | List of all available scope names — for a key-creation UI |
| `POST /membership/apiKeys` | Create a new key. Body: `{ "name": "...", "scopes": ["people:read"] }`. The response includes the raw `cak_…` key **once**. |
| `DELETE /membership/apiKeys/:id` | Revoke a key — takes effect on the next request |

A revoked key is gone immediately — there is no grace period.

## Best Practices

- **One key per integration.** If something is compromised you revoke a single key without breaking the others.
- **Mint the narrowest scopes that work.** A Google Sheets export needs only `people:read`, not `settings:write`.
- **Bind the key to a service account, not a real staff member.** If a staff member leaves, their B1 access ends — and so do any keys minted under their identity.
- **Store keys in a secret manager** (your hosting provider's environment variables, AWS Secrets Manager, etc.) — never in source control.
- **Rotate keys** if you suspect exposure: create a new key, update the integration, then delete the old one.

## How It Differs from OAuth

API keys are appropriate when **your church is the only one using the integration**. For a connector that needs to access many churches with each one's explicit consent — like a SaaS app shared across the B1 community — use [OAuth and Connected Apps](./connected-apps) instead.

| | API key | OAuth |
|---|---|---|
| Who installs it | One church admin | Each church admin authorizes the app |
| Auth header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Token lifetime | Until revoked | Access ≈ 7 days, refresh ≈ 90 days |
| Best for | Internal scripts, Zapier/Make/Sheets connectors | Multi-tenant third-party apps |
