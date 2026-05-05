---
title: "Server Administration"
---

# Server Administration

<div class="article-intro">

Server administration features in ChurchApps are available only to users with the **Server.Admin** permission. These tools are used for platform operations, support, and troubleshooting across all churches in the system.

</div>

:::warning Access Restricted
The features described on this page require **Server.Admin** permission and are not available to regular church administrators. They are intended for platform operators and support staff only.
:::

## Accessing Server Admin

Users with Server.Admin permission can access the server admin panel from B1 Admin:

1. Log in to [admin.b1.church](https://admin.b1.church)
2. Click the **Admin** tab in the main navigation
3. The Server Admin panel includes tabs for managing churches, users, and system operations

## User Impersonation

The impersonation feature allows server admins to log in as another user for support and troubleshooting purposes. This is useful when investigating user-reported issues or helping churches configure their systems.

### How to Impersonate a User

1. Navigate to the **Impersonate** tab in the Server Admin panel
2. Enter the user's name or email address in the search field
3. Click **Search** or press Enter
4. From the search results, click on the user you want to impersonate
5. Confirm the impersonation in the dialog that appears
6. You will be logged in as that user and redirected to their account

### Important Notes

- Impersonation creates a new session with the target user's permissions and church access
- Your original admin session ends when you impersonate another user
- All actions taken while impersonated are logged in the audit trail
- To return to your admin account, log out and log back in with your credentials
- Use impersonation only when necessary for support purposes and always inform users when accessing their accounts for support

### API Endpoint

The impersonation feature is backed by the `/users/:userId/impersonate` endpoint in the Membership API. See [Membership Endpoints](/docs/developer/api/endpoints/membership#users) for technical details.

### Security Considerations

- Impersonation requires Server.Admin permission - this permission should be granted sparingly and only to trusted platform operators
- All impersonation events are logged with the admin user ID and target user ID
- Churches are not notified when impersonation occurs, so establish clear policies for when and how this feature should be used
- Consider documenting impersonation events in your support ticket system for accountability

## Related Pages

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Permission model and JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — User and church management API
- [Audit Log](/docs/b1-admin/reports/audit-log) — View activity logs for a church
