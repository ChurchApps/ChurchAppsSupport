---
title: "Donation Batches"
---

# Donation Batches

<div class="article-intro">

Batches group your donations together for easier tracking and reconciliation. A typical batch represents a single collection, such as a Sunday offering or a special event. Using batches helps you stay organized and makes it simple to verify that your records match the actual deposits.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Make sure you have [set up your funds](funds.md) so they are available when recording donations
- You will need access to the **Donations** section in B1 Admin

</div>

## The Batches Page

When you navigate to **Donations > Batches**, you will see a list of your batches. Each row displays:

- **Name** -- the label you gave the batch
- **Date** -- the date of the collection
- **Donations** -- the number of individual donations in the batch
- **Total** -- the combined dollar amount

Above the list, year buttons let you show only the batches from one year, or **All** batches. A one-line summary shows the number of batches, the number of gifts, and the total amount for the batches shown.

## Creating a New Batch

1. Click **Add Batch** at the top of the page.
2. Enter a descriptive name (e.g., "Sunday Offering - Feb 9").
3. Select the date of the collection.
4. Click **Save**.

Your new batch appears in the list, ready for you to add donations.

## Working with Batches

- **View donations** -- click a batch name to open it and see all the individual donations it contains. From there you can add, edit, or remove donations.
- **Edit batch details** -- click the **Edit** button on a batch row to change its name or date.
- **Sort** -- use the column headers to sort batches by name or date.
- **Export** -- click **Export** at the top of the page to download the batches shown as a spreadsheet (CSV).
- **Failed events** -- if your payment gateway has reported problems, a **Failed events** button (with the number of unresolved events) appears at the top of the page. Click it to show or hide the list of events below the batches.
- **Import from Stripe** -- click **Import missing Stripe transactions** at the top of the page to open the [Stripe Import](stripe-import.md) tool.

## Printing a Batch

Open a batch and click **Print** above the donations list to print a paper copy for your counting team or deposit records. The printout includes:

- Your church's name, the batch name, and the batch date
- Every donation in the batch, with the donor's name, method, notes, date, and amount (refunded gifts are crossed out and marked as refunded)
- **Fund Subtotals** -- the total given to each fund in the batch
- **Batch Total** -- the combined amount for the whole batch

The **Print** button only appears once the batch has at least one donation.

### Printing Several Batches at Once

To print every batch from a period in one go -- for example, all of last month's deposits -- click **Print** at the top of the **Batches** page, next to **Export**. The **Print Batches** page opens with a **Start Date** and **End Date** that default to the last 30 days. Change either date to choose a different range.

Every batch dated within the range (including the start and end dates) prints in date order, one batch per page, using the same layout as a single-batch printout. Batches with no donations are left out, and if none of the batches in the range have donations you will see "No batches with donations in this date range." Click **Print** to open your browser's print dialog, or **Close** to return to the batch list.

## Exporting a Batch to QuickBooks Online

Open a batch and click **Export for QuickBooks** to download the batch as a journal entry that QuickBooks Online can import (**Settings > Import Data > Journal Entries**). The file contains one debit to **Undeposited Funds** for the batch total and one credit per fund, using each fund's name as the account name. QuickBooks asks you to match those names to your chart of accounts during import, so name your funds the way your bookkeeper names the income accounts, or map them once on import.

:::tip
Name your batches consistently so they are easy to find later. Including the date and collection type (e.g., "Sunday AM - 2025-02-09") keeps your list organized as it grows.
:::

## Next Steps

Once you have a batch, see [Recording Donations](recording-donations.md) to learn how to add individual donations to it. You can also [import Stripe transactions](stripe-import.md) to automatically create batches from online giving.
