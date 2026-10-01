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
2. Open **Settings**, then click **Server Admin** in the Settings menu. (You can also go straight to `admin.b1.church/admin`.)
3. The Server Admin panel has sections for Churches, Users, Impersonate User, Background Jobs, Commons, Usage Trends, Translation Lookups, Server Health, and Database Migrations

## User Impersonation

The impersonation feature allows server admins to log in as another user for support and troubleshooting purposes. This is useful when investigating user-reported issues or helping churches configure their systems.

### How to Impersonate a User

1. Open the **Impersonate User** section of the Server Admin panel
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

## Commons Moderation

Commons is the shared moderation queue for user-submitted content across products — WorshipCommons songs, Lessons.church lessons, FreeShow templates, and B1 website builder templates all flow through the same queue instead of separate per-product review tools.

### Accessing Commons

1. Navigate to the **Commons** tab in the Server Admin panel.
2. You will see three sub-tabs: **Queue**, **Reports**, and **Assets**.

A limited **music editor** role can also see the Queue tab, but is blocked from approving submissions that change a song's rights or licensing.

### Queue

The Queue lists every pending submission across all products, filterable by product and asset type. Each row shows whether the submission is a new asset, an edit by its original author, or an edit by a third party, along with the submitter's approval track record and how long the submission has been waiting (flagged once it passes 72 hours).

Click **Review** to open a drawer with field-level diffs, file previews, and an embedded read-only preview of the item. Use the **a**/**r** keyboard shortcuts to approve or reject, and **j**/**k** to move to the next or previous submission without leaving the drawer. Rejecting requires selecting a reason (for example quality, duplicate, licensing, ccli, ai, or off-topic) and a note.

### Reports

The Reports tab handles copyright and policy/quality reports filed against already-published assets, split into separate Copyright and Policy & Other queues plus a Resolved history. Claim a report to start working it, then resolve it with a resolution (upheld, dismissed, or duplicate) and an action (none, unpublish, or remove).

### Assets

The Assets tab is a searchable browser of published content with actions to **Feature** an asset (highlights it on the product's home page), **Unpublish**/**Republish** it, or **Remove** it (with a copyright or policy reason).

For songs specifically, this is also where a song becomes **Sunday-ready** and eligible to appear in a church's B1 Admin song search: a reviewer opens the asset and marks each published key as **Listened** once they've listened through it and confirmed the score, chords, and slides are all present. A song only becomes Sunday-ready once every key is checked off.

:::info
Commons moderation is staff-only — individual churches never see this queue. The one place an individual church's B1 Admin touches Commons data is the "WorshipCommons — free" section of the [song search](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), which only surfaces songs that have already been through this review process.
:::

See the [Content Commons architecture](/docs/developer/architecture/commons) page for the underlying data model and submission lifecycle.

## Group Email Approval

Churches cannot send church-written email (group email, form follow-ups, workflow emails, and account invites) until a server admin approves them. This keeps bot-registered churches from using the shared ChurchApps sending address for spam.

1. Open the **Churches** tab in the Server Admin panel.
2. Each church shows a **Group Email** chip: **Approved** (green) or **Not approved** (outlined).
3. Click the chip and confirm to approve the church, or to revoke an approval.

Church staff ask for approval with the **Request review** button in B1 Admin's Send Email dialog. The request is emailed to the support address and lists the church's name, ID, registration date, location, and who asked. A church can send one request per week. See [Church-authored email limits](/docs/developer/architecture/notifications#church-authored-email-limits) for the daily allowance and the automatic pause on bounces and complaints.

## Database Migrations

Deploys do not change the database. The hosted databases only accept connections from inside the Api's network, so after a release that adds a migration, a server admin applies it from the **Database Migrations** tab. (Self-hosted Docker installs still run migrations automatically when the Api container starts.)

The tab shows the current environment and one row per module (membership, attendance, giving, and so on) with its status, the number of applied and pending migrations, and the last one applied.

- **Run Pending Migrations** applies every pending migration, one module at a time, in order. It stops at the first failure and shows what was applied for each module.
- A module marked **No history** has a database that predates migration tracking. It is never run automatically, because that would replay old data migrations over live tables. Click **Check Schema** on that module instead. The Api compares the tables, columns, and indexes each migration creates with the live database and marks each migration **Already applied**, **Missing**, **Partly applied**, or **Data only**. Nothing is changed by the check.
- In the check results, **Record as Already Applied** writes the detected migrations into the migration history without running them (after a confirmation). Everything up to the last **Already applied** migration is recorded, including **Data only** ones in that range; **Missing** ones stay pending and can then be run normally with **Run Pending Migrations**.
- A **Partly applied** migration blocks recording. If the migration is safe to run again (read it first), tick **Re-run** so it stays pending and runs again from the top.

The Server Admin panel and the CLI (`yarn migrate:up`) use the same Kysely migrator and `kysely_migration` table, so they always agree on what has been applied. The backing endpoints are `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, and `POST .../:module/baseline`, all Server.Admin only.

## Related Pages

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Permission model and JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — User and church management API
- [Audit Log](/docs/b1-admin/reports/audit-log) — View activity logs for a church
- [Content Commons Architecture](/docs/developer/architecture/commons) — Shared asset model and moderation lifecycle
