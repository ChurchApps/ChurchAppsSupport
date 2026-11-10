---
title: "Audit Log"
description: "Review the audit log in B1 Admin to see who logged in, edited people records, or changed permissions, and export filtered entries to CSV."
---

# Audit Log

<div class="article-intro">

The audit log tracks all significant actions and changes across your church management system. Use it to review login activity, track who made changes to people records, monitor permission updates, and maintain accountability across your team.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A role with the **Edit Church Settings** permission (in the **Content** section of a role's permissions; the same permission that opens **Settings**). See [Roles & Permissions](../settings/roles-permissions.md).

</div>

## Viewing the Audit Log

1. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin) and expand **Settings**.
2. Click **Audit Log**.
3. The log displays recent entries in a table with the following columns:
   - **Date** -- When the action occurred.
   - **Module** -- The part of B1 the change was made in (for example, membership or giving).
   - **Category** -- The type of record or action (color-coded for quick scanning).
   - **Action** -- What was done (e.g., Donation Saved, Login Success, Note Updated).
   - **Entity** -- The type and ID of the record that was affected.
   - **IP Address** -- The IP address of the user who performed the action.
4. Click the arrow at the start of a row to see its details: a table of each changed field with its **Old Value** and **New Value**, or the **Deleted Record** for a delete.

## Filtering the Log

Use the filters at the top of the page to narrow down the results:

- **Module** -- Filter by area: **All Modules**, **People**, **Giving**, **Attendance**, **Messaging**, **Content**, **Serving**, or **Lessons**.
- **Category** -- Filter by action type:
  - **All Categories** -- Show everything.
  - **Login** -- Login successes and failures.
  - **People** -- Creating, updating, or deleting person records.
  - **Permissions** -- Permission grants and revocations.
  - **Donations** -- Donation record changes.
  - **Groups** -- Group management actions.
  - **Forms** -- Form submission activity.
  - **Settings** -- Configuration changes.
- **Start Date** -- Show entries from this date forward.
- **End Date** -- Show entries up to this date.

Click **Search** after setting your filters to update the results.

## Understanding Categories

Each entry's category is shown as a chip, color-coded for quick identification:

- **login** -- Blue chip. Tracks successful and failed login attempts.
- **person** -- Blue chip. Tracks person record creates, updates, and deletes.
- **permission** -- Red chip. Tracks when access rights are granted or revoked.
- **donation** -- Green chip. Tracks donation record changes.
- **form** -- Orange chip. Tracks form submission activity.
- **group**, **settings**, and other categories (such as **userchurch**) -- Gray chip.

## Note History on People and Groups

If you can open the audit log, you also see a trace of changed notes right where the notes live, on a person's or group's **Notes** tab:

1. An edited note shows **(edited · view history)** next to its date. Click it to open the audit log filtered to that person's or group's note history.
2. A deleted note leaves a greyed **Deleted note** marker in its place, showing who wrote it, when it was posted, and when it was deleted. Click **View history** to open the same filtered log.
3. In the filtered log, expand a **Note Updated** or **Note Deleted** entry to see the old text and the account that made the change. Click **Show all** to clear the filter.
4. In the **Entity** column, the ID of a person or group note links back to that person's or group's notes.

Staff who cannot open the audit log see the notes list without these markers.

## Exporting the Log

When log entries are displayed, an **Export CSV** button appears at the top of the page. Click it to export the current filtered results to a spreadsheet for offline review or record-keeping.

## Pagination

Use the pagination controls at the bottom of the table to navigate through results. You can display 25, 50 (the default), or 100 entries per page.

:::info
Audit log entries are automatically retained for one year. Entries older than 365 days are removed to keep the system performant.
:::

:::tip
Review the audit log regularly, especially after onboarding new team members or making significant configuration changes. It helps identify unexpected activity early.
:::

## Related Articles

- [Roles & Permissions](../settings/roles-permissions.md) -- Manage who has access to what
- [Data Security](../settings/data-security.md) -- Understand how your data is protected
- [Reports Overview](./index.md) -- See all available reports
