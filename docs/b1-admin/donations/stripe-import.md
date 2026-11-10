---
title: "Stripe Import"
description: "Pull Stripe donations into B1 Admin with a preview-first import that marks each charge as new, already imported, or skipped before you commit."
---

# Stripe Import

<div class="article-intro">

If you accept online donations through Stripe, the Stripe Import tool lets you pull those transactions into B1 Admin so all of your giving data lives in one place. This is especially useful for catching any transactions that were not automatically synced.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Complete the [Online Giving Setup](online-giving-setup.md) to connect your Stripe account to B1 Admin. The **Stripe Import** menu item and the Batches page button only appear when your church's giving gateway is Stripe, and only for people who can edit donations
- Verify that you have donations in your Stripe dashboard for the date range you want to import

</div>

## How It Works

The import process uses a two-step workflow: first you preview what would be imported, then you confirm the import. This dry-run approach lets you review everything before any data is created.

## Importing Transactions

1. In **B1 Admin**, navigate to **Donations > Stripe Import**. (You can also click **Import missing Stripe transactions** at the top of the **Batches** page.)
2. The **Import Stripe Transactions** page opens.
3. Under **Select Date Range**, set the **Start Date** and **End Date** for the transactions you want to import. The range starts on January 1 of this year through today.
4. Click **Preview** to run a dry-run check. **Import Missing** stays disabled until a preview finds new transactions, and changing either date clears the preview so you preview the new range first.

## Reviewing the Preview

The preview lists each Stripe event with its **Event ID**, **Type**, **Amount**, **Date**, and a **Status**:

- **New** -- this transaction has not been imported yet and will be included if you proceed.
- **Already Imported** -- this transaction already exists in B1 Admin and will be skipped.
- **Skipped** -- this transaction was excluded for another reason (e.g., a refund or failed charge).

A summary at the top shows the **Total** number of events and how many are **New**, **Already Imported**, and **Skipped**. If any event could not be read, an **Errors** count appears and the event's row shows the message in the **Notes** column.

:::info
The preview step does not create any records. It is a read-only check so you can verify what will happen before committing.
:::

## Completing the Import

1. Review the preview results and the summary totals.
2. Click **Import Missing** to import all transactions marked as **New**.
3. After the import completes, the list becomes **Import Results**: each transaction that was added shows **Imported**, and the summary adds an **Imported** count.

## Tips for Using Stripe Import

- Run the import regularly (weekly or monthly) to keep your records current.
- If a transaction shows as **Already Imported**, it means B1 Admin already has a matching record -- no action is needed.
- Use the date range filter to focus on a specific period if you are looking for particular transactions.

:::tip
After importing, visit the [Batches](batches.md) page to verify that the imported donations appear correctly and the totals match what you see in your Stripe dashboard.
:::

## Next Steps

- Check [Donation Reports](donation-reports.md) to review the imported transactions alongside your other giving data
- Ensure imported donations are assigned to the correct [funds](funds.md) for accurate [giving statements](giving-statements.md)
