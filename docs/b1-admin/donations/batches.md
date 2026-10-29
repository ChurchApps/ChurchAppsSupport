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
- You will need **View Donation Summaries**, **Edit Donations**, or **Enter Donations** permission to see the Batches page (see [Who Can Change a Batch](#who-can-change-a-batch))

</div>

## The Batches Page

When you navigate to **Donations > Batches**, you will see a list of your batches. Each row displays:

- **Name** -- the label you gave the batch
- **Date** -- the date of the collection
- **Donations** -- the number of individual donations in the batch
- **Total** -- the combined dollar amount
- **Status** -- **Open** or **Closed** (see [Closing and Reopening a Batch](#closing-and-reopening-a-batch))

Above the list, year buttons let you show only the batches from one year, or **All** batches. A one-line summary shows the number of batches, the number of gifts, and the total amount for the batches shown.

## Creating a New Batch

1. Click **Add Batch** at the top of the page.
2. Enter a descriptive name (e.g., "Sunday Offering - Feb 9").
3. Select the date of the collection.
4. Click **Save**.

Your new batch appears in the list, ready for you to add donations.

## Working with Batches

- **View donations** -- click a batch name to open it and see all the individual donations it contains. From there you can add, edit, or remove donations, or click **Import CSV** to add many donations at once from a spreadsheet (see [Importing Donations from a CSV File](recording-donations.md#importing-donations-from-a-csv-file)).
- **Edit batch details** -- click the **Edit** button on a batch row to change its name or date. Only people with **Edit Donations** can delete a batch.
- **Sort** -- use the column headers to sort batches by name or date.
- **Export** -- click **Export** at the top of the page to download the batches shown as a spreadsheet (CSV).
- **Failed events** -- if your payment gateway has reported problems, a **Failed events** button (with the number of unresolved events) appears at the top of the page. Click it to show or hide the list of events below the batches.
- **Import from Stripe** -- click **Import missing Stripe transactions** at the top of the page to open the [Stripe Import](stripe-import.md) tool.

## Closing and Reopening a Batch

Once a batch has been counted and deposited, close it so its donations stay exactly as they were when you closed it.

1. Open the batch.
2. Click **Close Batch** at the top of the page.

The status chip next to the batch name changes from **Open** to **Closed**, the batch shows **Closed** in the **Status** column on the Batches page, and a notice at the top of the batch explains that it is closed. While a batch is closed, people with **Enter Donations** can still view it, but they cannot add, edit, or delete its donations or change the batch's name or date.

To make changes again, open the batch and click **Reopen Batch**. New batches always start out open.

:::info
Only people with **Edit Donations** see the **Close Batch** and **Reopen Batch** buttons. They can also still change donations in a closed batch if a correction is needed, without reopening it.
:::

## Who Can Change a Batch

Two [role permissions](../settings/roles-permissions.md) let someone work with batches:

- **Edit Donations** -- full access: add and delete batches, close and reopen them, and add, edit, or delete any donation, whether the batch is open or closed.
- **Enter Donations** -- for counting teams and volunteers who enter offerings. They can add batches and add, edit, or delete donations, but only while the batch is open. They cannot delete batches, close or reopen them, or change gifts that came in through online giving.

Someone with **Enter Donations** but not **View Donation Summaries** sees **Donations** in the B1 Admin menu, which goes straight to the Batches page. **Summary**, **Funds**, **Campaigns**, and **Giving Statements** stay hidden from them. To open a batch and see the donations in it, the role also needs **View Donations**.

:::tip
A common setup is a "Counting Team" role with **Enter Donations** and **View Donations**, and a treasurer with **Edit Donations** who closes each batch after the deposit is reconciled.
:::

## Printing a Batch

Open a batch and click **Print** above the donations list to print a paper copy for your counting team or deposit records. The printout includes:

- Your church's letterhead -- your logo (the **Light Background Logo** from [Website > Appearance](../website/appearance.md), if you've uploaded one) with your church's name beneath it -- then the batch name and the batch date
- Every donation in the batch, with the donor's name, method, notes, date, and amount (refunded gifts are crossed out and marked as refunded)
- **Fund Subtotals** -- the total given to each fund in the batch
- **Batch Total** -- the combined amount for the whole batch

The **Print** button only appears once the batch has at least one donation.

### Printing Several Batches at Once

To print every batch from a period in one go -- for example, all of last month's deposits -- click **Print** at the top of the **Batches** page, next to **Export**. The **Print Batches** page opens with a **Start Date** and **End Date** that match the batches on screen: January 1 through December 31 of the year you picked, or from the earliest to the latest batch date when **All** is selected. Change either date to choose a different range.

Every batch dated within the range (including the start and end dates) prints in date order, one batch per page, using the same layout as a single-batch printout. Batches with no donations are left out, and if none of the batches in the range have donations you will see "No batches with donations in this date range." Click **Print** to open your browser's print dialog, or **Close** to return to the batch list.

## Exporting a Batch to QuickBooks Online

Open a batch and click **Export for QuickBooks** to download the batch as a journal entry that QuickBooks Online can import (**Settings > Import Data > Journal Entries**). The file contains one debit to **Undeposited Funds** for the batch total and one credit per fund, using each fund's name as the account name. QuickBooks asks you to match those names to your chart of accounts during import, so name your funds the way your bookkeeper names the income accounts, or map them once on import.

:::tip
Name your batches consistently so they are easy to find later. Including the date and collection type (e.g., "Sunday AM - 2025-02-09") keeps your list organized as it grows.
:::

## Next Steps

Once you have a batch, see [Recording Donations](recording-donations.md) to learn how to add individual donations to it. You can also [import Stripe transactions](stripe-import.md) to automatically create batches from online giving.
