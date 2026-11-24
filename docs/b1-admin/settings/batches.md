---
title: "Batches"
description: "Review the bulk imports and bulk people actions run in B1 Admin, see which records each one touched, and undo a batch within 30 days."
---

# Batches

<div class="article-intro">

Every bulk change in B1 Admin is recorded as a **batch**: an import from the B1 Transfer tool, a bulk update or bulk delete of people, or adding and removing many group members at once. The **Batches** page lists them, shows exactly which records each one touched, and lets you undo a batch that went wrong, restoring the affected records to how they were before.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Church Settings** permission (in the **Content** section of a role's permissions). It opens the **Settings** menu, including **Batches**. See [Roles & Permissions](./roles-permissions.md).
- These are not donation batches. Offering and deposit batches live under **Donations > Batches**; see [Donation Batches](../donations/batches.md).

</div>

## Opening the Batches Page

1. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin) and expand **Settings**.
2. Click **Batches**. You can also go straight there at **/settings/batches**, or type "batch jobs" or "bulk edits" in the Jump menu search.

The page is titled **Batches** with the subtitle *Review and undo bulk imports and actions*. It lists the 500 most recent batches, newest first. Until a bulk action or import has run, it reads **No batches found**.

## What Creates a Batch

| Where | What you did | Batch label | Source |
|---|---|---|---|
| [B1 Transfer](../people/importing-data.md) | Imported people, groups, donations, attendance, or forms into your **B1 Database** | *Import from `<source>` `<date>`* (for example, *Import from Breeze 11/24/2026*) | `import` |
| [People bulk actions](../people/bulk-editing.md) | **Set Membership Status**, **Set Marital Status**, **Set Gender**, **Set Directory Opt-Out**, or **Set Campus** | *Bulk update N people* | `bulk-update` |
| [People bulk actions](../people/bulk-editing.md) | **Delete** selected people | *Bulk delete N people* | `bulk-delete` |
| [People bulk actions](../people/bulk-editing.md) | **Add to Group** | *Add N group members* | `bulk-add` |
| [People bulk actions](../people/bulk-editing.md) | **Remove from Group** | *Remove N group members* | `bulk-remove` |

Bulk **Set Custom Field** and **Add to Workflow** do not create a batch, and neither do changes you make to one record at a time. Those show up in the [Audit Log](../reports/audit-log.md) as ordinary entries.

:::info
An import is only recorded as a batch when the transfer tool can reach B1 at the start of the import. If it cannot, the import still runs, but it will not appear here and cannot be undone from this page.
:::

## Reading the List

Each row shows:

- **Label** -- what the batch did, as listed above.
- **Source** -- `import`, `bulk-update`, `bulk-delete`, `bulk-add`, or `bulk-remove`.
- **Status** -- **open** while the action is still running, **completed** once it finished, **undone** after a successful undo, **partial** when an undo restored some records but skipped or failed others, or **failed**.
- **Items** -- how many records the batch touched.
- **Created** -- the date and time it ran.
- **Creator** -- the ID of the user account that ran it.
- **Actions** -- **View Results**, and **Undo** for batches whose status is **completed**.

## Viewing What a Batch Changed

Click **View Results** on a row. The **Batch Results** dialog lists every audit entry the batch wrote, one line per record, with the **Date**, **Action** (such as *Person Saved* or *Group Member Deleted*), **Entity Type**, and **Entity ID**. If the batch wrote nothing, the dialog reads **No records in this batch**. Click **Close** when you are done.

To see the old and new values for one of those records, open the [Audit Log](../reports/audit-log.md) and expand the matching entry.

## Undoing a Batch

Undo puts every record the batch touched back to the way it was just before the batch ran: records the batch created are deleted, records it changed get their earlier values back, and records it deleted are restored.

1. On the batch's row, click **Undo**. It is only offered for batches with the status **completed**, and only within **30 days** of when the batch ran.
2. Read the warning: *Records modified since this batch was created will be skipped. This cannot be reversed.* The dialog then asks *Undo batch "`<label>`"? This will restore affected records to their state before the batch.*
3. Click **Undo**. The button reads **Undoing...** while it works; leave the dialog open until it finishes.

When it finishes, the dialog reports what happened:

- **Restored N record(s).** -- shown in green when everything was put back, or amber when something was skipped or failed.
- **Skipped (N)** -- records that someone edited after the batch ran. B1 leaves these alone so the undo does not overwrite the newer change. Each one is listed by entity type and ID so you can review it by hand.
- **Failed (N)** -- records B1 could not restore, with the reason. The usual causes are an audit entry whose details were too large to keep (it shows *truncated snapshot*; the Audit Log marks these *Details were truncated and this entry cannot be undone*) or a record type that cannot be rolled back.

Click **Close**. The batch's status changes to **undone** when everything was restored, or **partial** when anything was skipped or failed. Each restored record also gets its own *undone* entry in the Audit Log, so the undo itself is traceable.

:::warning
Undo is itself permanent: there is no "redo". Use **View Results** first to confirm the batch is the one you mean, and remember that a record anyone has touched since the batch is skipped rather than restored.
:::

:::tip
After a large import that came in wrong (duplicate people, the wrong membership status, a mis-mapped column), undo the import batch here, fix the source file, and run the import again, rather than deleting the people by hand. For people who came in twice from separate imports, use [Possible Duplicates](../people/searching-people.md#possible-duplicates) instead.
:::

## Related Articles

- [Audit Log](../reports/audit-log.md) -- the full change history each batch entry comes from
- [Bulk Editing People](../people/bulk-editing.md) -- the actions that create bulk-update, bulk-delete, bulk-add, and bulk-remove batches
- [Importing Data](../people/importing-data.md) -- the B1 Transfer imports that create import batches
- [Donation Batches](../donations/batches.md) -- offering batches under Donations, which are a different thing
