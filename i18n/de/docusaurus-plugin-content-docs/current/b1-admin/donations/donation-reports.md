---
title: Spendenberichte
---

# Donation Reports

<div class="article-intro">

B1 Admin gives you several ways to view and analyze your church's giving data. The giving dashboard on the Donations **Summary** page provides a visual overview with charts and filters, while the Reports section offers a more detailed Donation Summary report. Use these tools to track giving trends, prepare for board meetings, or reconcile your records.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Ensure donations have been [recorded in batches](recording-donations.md) or [imported from Stripe](stripe-import.md)
- Verify that your [funds](funds.md) are set up correctly so donations are properly categorized

</div>

## Giving Dashboard

The giving dashboard is the **Dashboard** tab of the **Summary** page, the first page you see when you open the **Donations** section.

1. Open the **section menu** in the top-left corner and choose **Donations**. The **Summary** page opens on the **Dashboard** tab.
2. Use the **Weekly**, **Monthly**, and **Quarterly** toggle above the report to choose how giving is grouped.
3. In the **Filter Report** panel, set the **Start Date** and **End Date** (by default, the past year through yesterday) and optionally pick a **Fund**, then click **Run Report**. The report runs automatically with the defaults when the page opens.
4. Four **KPI cards** display your giving metrics for the selected range:
   - **Total Giving** -- The total amount donated.
   - **Average Gift** -- The average donation amount.
   - **Unique Donors** -- The number of distinct people who gave.
   - **Total Donations** -- The total number of individual donations.
5. Below the KPIs, a bar chart shows giving per week, month, or quarter, broken out by fund.
6. Click **Download Options** and choose **Summary** to export a CSV of the totals by period and fund, or click the print icon to print the report.

If donations in the period were given in more than one currency, the KPI totals are converted to your church currency and a **Converted at current exchange rates** note appears below the cards. See [Multi-Currency Support](./multi-currency.md#converted-totals) for details.

:::info
The dashboard shows aggregate giving data. It does not include individual donor names. For donor-level details, use the [Batches](batches.md) page.
:::

## Lapsed Givers

The **Lapsed Givers** tab next to the **Dashboard** tab lists people who gave during one period but not since. By default it compares last calendar year with this year to date; change either date range to widen or narrow the search. Each row shows the person, the date of their last gift and their total for the earlier period, and **Download Options > Summary** downloads the list as a CSV for a follow-up mailing or call list.

## Viewing Donor-Level Details

For a breakdown of who gave, how much, and to which fund:

1. Navigate to **Donations > Batches**.
2. Click on a **batch name** to open it.
3. The batch detail page lists each donation with the donor's name, amount, fund, date, and payment method.
4. Click on a **donor's name** to see a breakdown of how many times they donated and how much each time.
5. Click on a **donation ID** to open a side panel with the full details for that individual donation.
6. Click **Download** to export a CSV with all donor and donation information for that batch.

## Donation Summary Report

Donation reporting is built directly into the Donations section -- the Summary page serves as your donation summary report:

1. Open the **section menu** in the top-left corner and choose **Donations** to open the Summary page.
2. On the **Dashboard** tab, set the **Start Date** and **End Date** in the **Filter Report** panel and click **Run Report**.
3. Click **Download Options** and choose **Summary** to export the report as a CSV file.

## Exporting Data

You can export donation data from multiple places:

- **Summary page** -- download a CSV of giving totals by week, month, or quarter and fund
- **Batch detail page** -- download a CSV of individual donations with donor details
- **Funds detail page** -- download donation history for a specific fund

:::tip
For year-end reporting, combine the Summary page export with the [Giving Statements](giving-statements.md) tool to get both aggregate trends and individual donor statements.
:::

## Next Steps

- Generate [Giving Statements](giving-statements.md) for your donors at year-end
- Review individual [batches](batches.md) to verify donation details
- Check [fund](funds.md) detail pages for giving breakdowns by category
