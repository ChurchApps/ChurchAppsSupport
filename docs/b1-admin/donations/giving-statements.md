---
title: "Giving Statements"
---

# Giving Statements

<div class="article-intro">

At the end of each year, your donors need a summary of their tax-deductible giving for their records. B1 Admin makes it easy to generate these statements for all donors at once, saving you hours of manual work.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Verify that your [funds](funds.md) are correctly marked as **Tax Deductible** -- only donations to tax-deductible funds appear on statements
- Ensure all donations have been [recorded](recording-donations.md) and any online transactions have been [imported from Stripe](stripe-import.md)

</div>

## Accessing Giving Statements

1. In **B1 Admin**, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Donations**.
2. Click **Giving Statements**. The **Batch Giving Statements** page opens.

## Generating Statements

1. In the **Select Year** panel, choose the **Year** from the dropdown. You can choose the current year or any of the five previous years.
2. The page loads only the donations dated in that year (January 1 through December 31), so it opens quickly even if your church has many years of giving history. When you pick a different year, the summary refreshes with that year's donations. The **Summary** panel below the year shows statistics for that year, including:
   - **Total Donors** -- the number of people who gave
   - **Total Donations** -- the number of individual donation records
   - **Total Amount** -- the combined dollar amount of all giving

## Downloading Statements

The **Download Options** panel gives you two options for getting statements to your donors:

### Download as CSV Files

Under **Individual CSV Files**, click **Download ZIP** to download a ZIP file containing an individual CSV file for each donor. This is useful if you want to email statements individually or import them into another system.

### Print All Statements

Under **Printable Statements**, click **Print All** (the button shows the number of statements) to open a printable view of every donor's statement for the selected year in your browser. From there, use your browser's print function to send them to a printer. Each statement starts on a new page so they are ready to fold and mail, and the statements are in order by the donor's last name, then first name.

If you have uploaded a **Light Background Logo** under [Website > Appearance](../website/appearance.md), it prints centered at the top of each statement, above the statement title. This applies to both **Print All** and a single donor's statement printed from their record.

:::tip
Run your statements early in January while your records are fresh. Double-check that your funds are correctly marked as tax-deductible before generating statements -- only donations to tax-deductible funds are included.
:::

:::info
Giving statements only include donations assigned to funds that have the **Tax Deductible** setting enabled. If a fund is not marked as tax-deductible, its donations will not appear on the statement. You can manage this setting on the [Funds](funds.md) page.
:::

## Receipt Formats for Canada, Australia and New Zealand

Churches outside the United States can switch the statement to their country's official receipt layout. Click **Statement format** at the top of the Giving Statements page (or go to **Settings** and open the **Giving** section), and set **Statement Format** to **Canada**, **Australia** or **New Zealand**, then fill in the fields that appear: your registration number (CRA registration number, ABN, or NZ charity registration number), your organization's address, the name of the person authorized to sign receipts, and for Canada the city where receipts are issued.

Statements then carry the wording your tax authority expects (for Canada, "Official Receipt for Income Tax Purposes" with the CRA reference), a receipt number in the form `YEAR-DONORID`, the eligible amount counted from tax-deductible funds only, and a separate line for any gifts to non-deductible funds. Donors see the same receipt block when they print their own statement from B1.church.

## What Members See in B1.church

The same **Giving** settings section controls what members see on their own giving page in B1.church:

- **Member Giving History** picks which years members can see. **All years** is the default. **Through 2025** (or any other year) stops at that year, so members can't view or print a later year until you allow it. Use this to hold back the current year while you finish corrections and refunds. **Hidden** removes giving history, yearly totals and statement printing completely. Members can still give.
- **Giving Note** is a short message shown on the member's giving page and giving history, and printed at the bottom of every giving statement, including the statements you print here. Use it for things like your refund policy.

These settings only change what members see. You can still print any year from this page.

## Next Steps

If you need to review donation details before generating statements, visit the [Donation Reports](donation-reports.md) page or check individual [batches](batches.md).
