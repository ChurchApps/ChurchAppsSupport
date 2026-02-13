---
title: "Stripe Import"
---

# Stripe Import

If you accept online donations through Stripe, the Stripe Import tool lets you pull those transactions into B1 Admin so all of your giving data lives in one place. This is especially useful for catching any transactions that were not automatically synced.

## How It Works

The import process uses a two-step workflow: first you preview what would be imported, then you confirm the import. This dry-run approach lets you review everything before any data is created.

## Importing Transactions

1. In **B1 Admin**, navigate to **Donations > Batches**.
2. Click the **Stripe Import** link at the bottom of the Batches page.
3. Select a **date range** for the transactions you want to import.
4. Click **Preview** to run a dry-run check.

## Reviewing the Preview

The preview displays each transaction from Stripe along with a status indicator:

- **New** -- this transaction has not been imported yet and will be included if you proceed.
- **Already Imported** -- this transaction already exists in B1 Admin and will be skipped.
- **Skipped** -- this transaction was excluded for another reason (e.g., a refund or failed charge).

A summary section at the top shows the total number of transactions in each category and the dollar amounts involved.

:::info
The preview step does not create any records. It is a read-only check so you can verify what will happen before committing.
:::

## Completing the Import

1. Review the preview results and the summary totals.
2. Click **Import Missing** to import all transactions marked as **New**.
3. After the import completes, status chips next to each transaction update to show the result.

## Tips for Using Stripe Import

- Run the import regularly (weekly or monthly) to keep your records current.
- If a transaction shows as **Already Imported**, it means B1 Admin already has a matching record -- no action is needed.
- Use the date range filter to focus on a specific period if you are looking for particular transactions.

:::tip
After importing, visit the [Batches](batches.md) page to verify that the imported donations appear correctly and the totals match what you see in your Stripe dashboard.
:::
