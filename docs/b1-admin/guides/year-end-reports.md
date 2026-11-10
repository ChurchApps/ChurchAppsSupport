---
title: "Guide: Generate Year-End Giving Reports"
description: "In B1 Admin, finish the year's donation records, check fund tax settings, and generate tax-deductible giving statements for every donor."
---

# Generate Year-End Giving Reports

<div class="article-intro">

Walk through the year-end process of finalizing your donation records, verifying fund settings, and generating tax-deductible giving statements for every donor. This is typically done in early January for the previous calendar year.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- B1 Admin account with financial access
- Donations recorded throughout the year (online via Stripe and/or manually entered)
- Access to your Stripe account if you accept online donations

</div>

## Step 1: Import Final Stripe Transactions

Make sure all online donations from the end of the year are in your system.

Follow the [Stripe Import](../donations/stripe-import.md) guide to:

1. In the [Jump menu](../introduction.md#getting-around-with-the-jump-menu), choose **Donations > Stripe Import** (it appears only when your giving provider is Stripe)
2. Set the **Start Date** and **End Date** to cover the end of the year (e.g., December 1 - December 31)
3. Click **Preview** first to review, then **Import Missing** to finalize

:::warning
Run this import before generating statements. Any transactions you haven't imported won't appear on donor statements.
:::

## Step 2: Review Donation Reports

Verify your records are accurate before generating statements.

Follow the [Donation Reports](../donations/donation-reports.md) guide to:

1. In the Jump menu, choose **Donations > Summary**, set the **Start Date** and **End Date** in **Filter Report** to the full year, and click **Run Report**
2. Review totals by fund and compare against your bank statements to catch any discrepancies. Click **Download Options** and choose **Summary** for a CSV
3. Open individual batches under **Donations > Batches** to verify donor-level details if needed

## Step 3: Verify Fund Tax Status

Ensure each fund's tax-deductible setting is correct so statements are accurate.

Follow the [Funds](../donations/funds.md) guide to:

1. In the Jump menu, choose **Donations > Funds** and check each fund's **Tax Status**
2. Click **Edit** on a fund to change its **Tax Deductible** setting

:::info
Only donations to funds marked as tax-deductible will appear on giving statements. If a fund should be tax-deductible but isn't marked that way, update it before generating statements.
:::

## Step 4: Generate Giving Statements

Create the official giving statements for your donors.

Follow the [Giving Statements](../donations/giving-statements.md) guide to:

1. In the Jump menu, choose **Donations > Giving Statements**
2. Select the **Year** and review the summary statistics. Churches in Canada, Australia, or New Zealand can click **Statement format** to switch to their country's official receipt layout
3. Choose your download method:
   - **Download ZIP** — individual CSV files, one per donor
   - **Print All** — printable view with each statement on a new page, with your church logo at the top (if you've uploaded one)

:::tip
Generate statements early in January while records are fresh. This gives you time to catch any issues before mailing them out.
:::

## Step 5: Distribute to Donors

Get the statements into your donors' hands.

1. Print and mail statements, or email individual CSVs to donors
2. Members can also view their own giving history and print statements on [B1.church or in the B1 App](../../b1-church/giving/donation-history.md)

## You're Done!

Your year-end giving reports are complete. Donors have their tax-deductible statements, and your financial records are finalized for the year.

## Related Articles

- [Stripe Import](../donations/stripe-import.md) — import online transactions
- [Donation Reports](../donations/donation-reports.md) — view giving trends and totals
- [Funds](../donations/funds.md) — manage funds and tax-deductible settings
- [Giving Statements](../donations/giving-statements.md) — generate year-end statements
- [Recording Donations](../donations/recording-donations.md) — manually enter cash/check donations
- [Donation History (Web)](../../b1-church/giving/donation-history.md) — member self-service view
- [Set Up Online Giving Guide](./online-giving.md) — initial Stripe and giving setup
