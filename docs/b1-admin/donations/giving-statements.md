---
title: "Giving Statements"
description: "Create year-end giving statements for every donor in B1 Admin, then download them as CSV files or print them for mailing with tax-deductible totals."
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

1. In the **Select Year** panel, choose the **Year** from the dropdown. You can choose the current year or any of the five previous years. If your statement year doesn't start in January (see [Statement Year Start Month](#statement-year-start-month)), each option shows the full period, such as "July 2025 – June 2026".
2. The page loads only the donations dated in that statement year (January 1 through December 31 unless you have changed the start month), so it opens quickly even if your church has many years of giving history. When you pick a different year, the summary refreshes with that year's donations. The **Summary** panel below the year shows statistics for that year, counting the same gifts the statements include (gifts made only to non-deductible funds are left out):
   - **Total Donors** -- the number of people who gave
   - **Total Donations** -- the number of individual donation records
   - **Total Amount** -- the combined amount of their giving

## Downloading Statements

The **Download Options** panel gives you two options for getting statements to your donors:

### Download as CSV Files

Under **Individual CSV Files**, click **Download ZIP** (the button shows the number of files) to download a ZIP file containing an individual CSV file for each donor. This is useful if you want to email statements individually or import them into another system.

### Print All Statements

Under **Printable Statements**, click **Print All** (the button shows the number of statements) to open a printable view of every donor's statement for the selected year in your browser. From there, use your browser's print function to send them to a printer. Each statement starts on a new page so they are ready to fold and mail, and the statements are in order by the donor's last name, then first name.

If you have uploaded a **Light Background Logo** under [Website > Appearance](../website/appearance.md), it prints centered at the top of each statement, above the statement title. This applies to **Print All**, a single donor's statement printed from their record, and the statements members print themselves from the **Giving** page of B1.church.

:::tip
Run your statements early in January while your records are fresh. Double-check that your funds are correctly marked as tax-deductible before generating statements -- only donations to tax-deductible funds are included.
:::

:::info
Giving statements only include donations assigned to funds that have the **Tax Deductible** setting enabled. If a fund is not marked as tax-deductible, its donations will not appear on the statement. You can manage this setting on the [Funds](funds.md) page.
:::

## Statement Settings {#statement-settings}

Click **Statement format** at the top of the Giving Statements page, or go to **Settings** and click edit on the **Giving** section. The statement fields are under **Fees & statements**. Click **Save** when you are done. These settings apply to **Print All**, a single donor's statement printed from their record, one-gift receipts, and the statements members print from B1.church.

### Tax ID and Organization Address

On the **Standard** format, fill in **Tax ID** (your EIN or other tax number) and **Organization Address** to print them on every statement and receipt:

- The **Organization Address** replaces the church address from your church profile in the Organization box at the top of the statement. Leave it blank to keep using the church profile address.
- The **Tax ID** prints under the address as "Tax ID: ..." Leave it blank and no Tax ID line is printed.

For the Canada, Australia, and New Zealand formats, the same box is labeled with your country's registration number and both values print in the official receipt block instead (see below).

### Tax Disclaimer

Every statement ends with a standard sentence saying your church is a registered non-profit and that no goods or services were given in exchange for the gifts other than intangible religious benefits. To use your own wording, type it in **Tax Disclaimer**. Your text replaces the standard sentence on statements and receipts. Type `{churchName}` where you want your church's name filled in. Leave the box blank to keep the standard wording.

The disclaimer prints as plain text, and line breaks are kept. On a one-gift receipt it follows the same rule as the standard sentence: it is left off when any part of the gift went to a fund that is not tax-deductible.

### Statement Year Start Month {#statement-year-start-month}

If your tax or fiscal year doesn't follow the calendar, set **Statement Year Starts In** to its first month, for example **July** for a July to June year. It starts on **January**, and churches that leave it there see no change.

With another month chosen:

- A statement year is named by the year it starts in. With a July start, "2025" covers July 1, 2025 to June 30, 2026, and is shown as "2025–2026".
- The statement title reads "2025–2026 Annual Giving Statement" and the period line shows the exact dates, such as "Period: Jul 1, 2025 - Jun 30, 2026".
- The **Year** list on this page, the year buttons on a person's giving view in **People**, the **Member Giving History** list, and members' history and statements in B1.church all use these statement years.

One-gift receipts are not affected, since they cover a single gift.

## Donor Numbers on Statements

If a person has a **Donor Number** on their [person record](../people/adding-people.md), it prints under their name and address as "Donor Number: ..." on their statement, in **Print All**, and on one-gift receipts. Members see it on the statements they print from B1.church too. People without a donor number print as before.

## Gift Memos on Statements

Each statement lists every gift with its date, method, fund, and amount. When at least one gift on a statement has a **Memo**, a **Memo** column is added after the fund so the donor can see what each gift was for. Statements with no memos keep the four-column layout. A gift's **Notes** are internal and never appear on a statement. The CSV files in the ZIP include the memo as their last column.

To put a purpose on the statement, enter it as the gift's **Memo** when [recording the donation](recording-donations.md), or give it its own [fund](funds.md) if you want it totaled separately.

## Receipt Formats for Canada, Australia and New Zealand

Churches outside the United States can switch the statement to their country's official receipt layout. Open the [statement settings](#statement-settings) and set **Statement Format** (which starts on **Standard**) to **Canada - CRA official receipt**, **Australia** or **New Zealand**, then fill in the fields for that format: your registration number (**CRA Registration Number**, **ABN**, or **NZ Charity Registration Number**), **Organization Address**, **Authorized Signatory Name**, and for Canada the **City of Issue**. Click **Save**.

Statements then carry the wording your tax authority expects (for Canada, "Official Receipt for Income Tax Purposes" with the CRA reference), a receipt number in the form `YEAR-DONORID`, the eligible amount counted from tax-deductible funds only, and a separate line for any gifts to non-deductible funds. Donors see the same receipt block when they print their own statement from B1.church.

## What Members See in B1.church

The same **Giving** settings section controls what members see on their own giving page in B1.church:

- **Member Giving History** picks which years members can see. **All years** is the default. **Through 2025** (or any other year, shown as **Through 2025–2026** when your [statement year](#statement-year-start-month) doesn't start in January) stops at that year, so members can't view or print a later year until you allow it. Use this to hold back the current year while you finish corrections and refunds. **Hidden** removes giving history, yearly totals and statement printing completely. Members can still give.
- **Giving Note** is a short message shown on the member's giving page and giving history, and printed at the bottom of every giving statement, including the statements you print here. Use it for things like your refund policy.

These settings only change what members see. You can still print any year from this page.

## Next Steps

If you need to review donation details before generating statements, visit the [Donation Reports](donation-reports.md) page or check individual [batches](batches.md).
