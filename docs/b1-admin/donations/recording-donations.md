---
title: "Recording Donations"
---

# Recording Donations

<div class="article-intro">

Recording donations in B1 Admin is done through the Batches system. You create a batch to represent a collection (such as a Sunday offering), then add individual donations to that batch. This keeps your giving records organized and easy to reconcile.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up your [funds](funds.md) so you can assign donations to the correct categories
- Create a [batch](batches.md) to hold the donations you are about to enter
- Make sure the donors are in your [people directory](../people/adding-people.md) so you can look them up when entering gifts
- You need **Edit Donations**, or **Enter Donations** together with **View Donations**, to enter gifts into a batch (see [Who Can Change a Batch](batches.md#who-can-change-a-batch))

</div>

## Creating a Batch and Adding Donations

1. In **B1 Admin**, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Donations**, and click **Batches**.
2. Click **Add Batch** at the top of the page.
3. Enter a name for the batch (e.g., "Sunday Offering - Jan 5") and select the date. Click **Save**.
4. Your new batch appears in the list showing zero donations and $0.00.
5. Click on the **batch name** to open it.

## Entering Individual Donations

1. On the batch detail page, the donation entry panel appears beside the donations list. Under **Select Person or Anonymous**, type the donor's name in the search field to find them, or click **Anonymous**. (Clicking **Add Donation** at the top of the page jumps to this panel.)
2. After selecting a person, the entry form shows fields for **Date**, **Method** (Check, Cash, Card, or In-Kind), **Fund**, **Notes**, **Amount**, and **Check #** (or **Last 4 digits** for card gifts, or **Item** to describe an in-kind gift). Click **Change** next to the donor's name to pick someone else.
3. Fill in the details and click **Add Donation** (or press Enter).
4. The donation is added to the donations list, and the form resets so you can enter the next one.

:::info
If the batch has been [closed](batches.md#closing-and-reopening-a-batch), the entry panel and **Edit** links are hidden for anyone without **Edit Donations**, and a notice at the top of the batch says it is closed. Ask someone with **Edit Donations** to reopen it.
:::

:::tip
You can quickly enter multiple donations in a row without leaving the batch page. The form resets after each entry so you can move through a stack of checks or envelopes efficiently.
:::

## Importing Donations from a CSV File {#importing-donations-from-a-csv-file}

If your donations are already in a spreadsheet -- for example, an export from another giving system or a counting team's tally sheet -- you can import them into a batch instead of typing each one.

1. Open the batch and click **Import CSV** at the top of the page. (The button appears when you can change the batch and your church has at least one [fund](funds.md).)
2. Click **Choose CSV File** and pick your file. The file needs a header row, and the columns can be in any order:
   - **Amount** (required; `Total` also works) -- Currency symbols and commas are ignored, so `$1,250.00` is fine. The amount must be greater than zero.
   - **Date** -- Use a format like `2026-10-25` or `10/25/2026`. If it is blank, the batch date is used.
   - **Fund** -- The fund's name, matched without regard to capitalization. If it is blank, your first fund is used.
   - **Method** -- **Check**, **Cash**, **Card**, or **In-Kind**. If it is blank, **Check** is used.
   - **Check Number** -- The check number (or other payment detail).
   - **Notes**
   - **Email**, **Name**, or **First Name** and **Last Name** -- Used to match the donor to someone in your database. A name written as "Smith, John" is read as "John Smith".
3. Review the preview. Each row shows its line number, the donor from the file, the **Match**, the fund, and the amount:
   - A person's name means the donor was matched. B1 matches by email first, then by exact name, and only when exactly one person fits.
   - **Not found — anonymous** means no single match was found. The gift is imported as anonymous, and "Imported as:" with the donor's name is added to its notes so you can assign it later.
   - A red message such as **Invalid amount**, **Unknown fund**, **Unknown method**, or **Invalid date** means that row will be skipped. Fix the file and choose it again to include it.
4. Click **Import** (the button shows how many rows will be imported). The donations are added to the batch.

:::tip
After importing, use **Edit** on any anonymous donation to pick the right person. The "Imported as:" note tells you who the file said it was from.
:::

## Logging a Gift from a Person's Record

To record a single gift without opening a batch, open the donor's record in **People** and click **Log a gift** (in the giving summary, or on the person's giving view).

1. Set the **Date** and **Amount**.
2. Choose the **Fund** and **Method** (Check, Cash, Card, or In-Kind), and enter the **Check #**, **Last 4 digits**, or **Item** (for in-kind gifts) if needed.
3. Optionally add **Notes**, then click **Save**.

The gift is saved to the batch for that date. If no batch exists for that date yet, one is created for you, named with the date.

## Splitting a Donation Across Multiple Funds

Sometimes a single donor gives to more than one fund in one transaction. To handle this:

1. Below the entry panel, click the **full donation editor** link (or click **Edit** on an existing donation row).
2. In the full editor, add amounts to different funds. The total will automatically calculate from the individual fund amounts.
3. Click **Save** to update the donation.

:::info
Splitting donations across funds is common when a donor writes a single check designated for multiple purposes, such as General Fund and Missions.
:::

## Editing or Removing Donations

To edit a donation, click the **Edit** button on its row in the batch. You can change the date, amount, fund, payment method (Check, Cash, Card, or In-Kind), or any other detail. For an in-kind gift, the editor labels the detail field **Item** so you can describe what was given. Click **Save** when you are done.

:::tip
The line under the batch name at the top of the page updates automatically to show the batch date, the number of gifts, and the combined dollar amount as you add or edit entries. Use this to reconcile against your deposit slip.
:::

## Refunding a Donation

If a donor was charged in error or asks for their money back, you can refund a completed donation directly from its edit screen -- no need to go to your payment gateway's dashboard.

1. Open the donation and click **Edit**.
2. Click the **Refund** button next to Delete at the bottom of the form.
3. Confirm the dialog: "Refund this donation in full through the payment gateway? This cannot be undone."

The donation is refunded in full through the original payment gateway and marked **Refunded** in your donation lists.

:::warning
Refunds are full refunds only -- there is no way to refund a partial amount from B1 Admin. The refund also cannot be undone once confirmed.
:::

:::info
The **Refund** button only appears for donations that were paid online (they have a gateway transaction) and are still in **Complete** status. Manually entered donations (cash, check) do not have a gateway transaction to refund -- edit or delete those instead.
:::

## Next Steps

- Review your entries using [Donation Reports](donation-reports.md) to verify accuracy
- At year-end, generate [Giving Statements](giving-statements.md) for your donors
