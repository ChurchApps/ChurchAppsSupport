---
title: "Audit Log"
---

# Audit Log

<div class="article-intro">

The audit log tracks all significant actions and changes across your church management system. Use it to review login activity, track who made changes to people records, monitor permission updates, and maintain accountability across your team.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- B1 Admin account with server admin access
- Navigate to **Settings** to find the Audit Log

</div>

## Viewing the Audit Log

1. Go to **Settings** in B1 Admin.
2. Select **Audit Log**.
3. The log displays recent entries in a table with the following columns:
   - **Date** -- When the action occurred.
   - **Category** -- The type of action (color-coded for quick scanning).
   - **Action** -- What was done (e.g., create, update, delete, login_success).
   - **Entity** -- The type and ID of the record that was affected.
   - **IP Address** -- The IP address of the user who performed the action.
   - **Details** -- A summary of the specific changes made.

## Filtering the Log

Use the filters at the top of the page to narrow down the results:

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

Each category is color-coded for quick identification:

- **Login** -- Blue chip. Tracks successful and failed login attempts.
- **People** -- Purple chip. Tracks person record creates, updates, and deletes.
- **Permissions** -- Red chip. Tracks when access rights are granted or revoked.
- **Donations** -- Green chip. Tracks donation record changes.
- **Groups** -- Gray chip. Tracks group management operations.
- **Forms** -- Orange chip. Tracks form submission activity.
- **Settings** -- Yellow chip. Tracks configuration changes.

## Exporting the Log

When log entries are displayed, a **CSV download** button appears. Click it to export the current filtered results to a spreadsheet for offline review or record-keeping.

## Pagination

Use the pagination controls at the bottom of the table to navigate through results. You can display 25, 50, or 100 entries per page.

:::info
Audit log entries are automatically retained for one year. Entries older than 365 days are removed to keep the system performant.
:::

:::tip
Review the audit log regularly, especially after onboarding new team members or making significant configuration changes. It helps identify unexpected activity early.
:::

## Related Articles

- [Roles & Permissions](../settings/roles-permissions) -- Manage who has access to what
- [Data Security](../settings/data-security) -- Understand how your data is protected
- [Reports Overview](./index.md) -- See all available reports
