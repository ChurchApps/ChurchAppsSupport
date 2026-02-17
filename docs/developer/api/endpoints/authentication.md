---
title: "Authentication & Permissions"
---

# Authentication & Permissions

<div class="article-intro">

The ChurchApps API uses JWT-based authentication. Users log in to receive a token that encodes their identity, church membership, and permissions. This page covers the auth flow, permission model, and OAuth support.

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
| `authGuid` | One-time auth link (used in welcome/reset emails) |

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

The `token` field is a JWT that should be sent as `Authorization: Bearer <token>` on subsequent requests.

### Token Contents

The JWT encodes:
- `id` — User ID
- `churchId` — Currently selected church
- `personId` — Person record for the selected church
- Per-API permission arrays

### Church Selection

Users may belong to multiple churches. The login response includes all churches with their permissions. To switch churches, the client generates a new JWT scoped to a different church from the login response data.

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

Creates a user with a temporary password and sends a welcome email with an auth link. The first user registered on a new instance is automatically granted server admin access.

### Register a New Church

```
POST /membership/churches/add
```

**Auth:** JWT

After registering a user, call this endpoint to create a church and associate the user with it.

## Password Management

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Send a password reset email. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Set a new password using an auth GUID from a reset email. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Change the current user's password. Body: `{ "newPassword": "..." }` |

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
| | People | View | View all people |
| | Roles | View | View roles and assignments |
| | Settings | Edit | Edit church settings |
| **Content** | Content | Edit | Edit pages, sections, elements |
| | Settings | Edit | Edit content settings |
| | StreamingServices | Edit | Manage streaming service configuration |
| | Chat | Host | Host/moderate chat sessions |
| **Messaging** | Texting | Send | Send SMS text messages |

### How Permissions Are Checked

In controllers, permissions are checked using the `au.checkAccess()` method:

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Server Admin

The `Server.Admin` permission grants full access across all churches. This is assigned to the first registered user and can be granted to others through the server admin role.

## OAuth 2.0

The API supports OAuth 2.0 for third-party integrations. Two grant types are available.

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (JWT required)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Returns: `{ "code": "...", "state": "..." }`

2. **Exchange code for token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Returns: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access tokens expire after **12 hours**.

### Device Code Flow (RFC 8628)

For devices without a browser (TV apps, kiosks):

1. **Request device code:** `POST /membership/oauth/device/authorize` (Public)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Returns: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **User enters the code** at the verification URI and approves or denies

3. **Poll for token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Returns `authorization_pending` until approved, then returns the access token

### OAuth Client Management

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | List all OAuth clients |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Get client by ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Get client by client ID (secret redacted) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Create or update a client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Delete a client |

### Device Approval Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Get pending device code info for approval UI |
| POST | `/membership/oauth/device/approve` | JWT | Approve a device authorization. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Deny a device authorization. Body: `{ "user_code": "..." }` |

## Public vs Authenticated Endpoints

The API uses two wrapper functions that determine authentication requirements:

- **`actionWrapper`** — Requires a valid JWT. The authenticated user object (`au`) is available with `churchId`, `userId`, and permission checks.
- **`actionWrapperAnon`** — No authentication required. Used for login, registration, public content lookups, and webhook receivers.

In the endpoint tables throughout this documentation, these are indicated as **JWT** and **Public** respectively in the Auth column.

## Related Pages

- [Module Structure](../module-structure) — How controllers, repositories, and models are organized
- [Local Setup](../local-setup) — Running the API locally for development
