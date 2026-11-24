---
title: "Giving on a Person's Record"
description: "See a donor's full giving history in B1 Admin, print their statement, export it, and manage their recurring gifts and saved payment methods from their person record."
---

# Giving on a Person's Record

<div class="article-intro">

Every person record in B1 Admin has a giving section. It shows what the person (and their household) has given this year, opens into a full ledger of every gift on file, and lets staff print a statement, export the history, give on the donor's behalf, and look after the donor's recurring gifts and saved payment methods -- all without leaving the record.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **View Donations** permission to see giving on a person record at all. **Log a gift** also needs **Edit Donations** (see [Who Can See What](index.md#who-can-see-what))
- Online giving must be [set up](online-giving-setup.md) for the **Give**, **Recurring**, and **Payment methods** tools to do anything; the history, statement, and CSV work for cash and check gifts too

</div>

## The Donations Card

Open a person in **People**. Among the cards on their record is **Donations**. It shows:

- This year's total, followed by "in 2026 · 12 gifts". If the person lives in a household with other people, the total covers every household member and the line adds "whole household".
- A short table of the most recent gifts this year (up to five) with the **Date**, **Fund**, and **Amount**. When more than one household member gave, a **Given by** column names the giver. Below the table, "showing latest 5" tells you when there are more.
- Links to **Log a gift** (if you have **Edit Donations**; see [Logging a Gift from a Person's Record](recording-donations.md#logging-a-gift-from-a-persons-record)), **All years**, and **2026 statement**, which opens this year's statement in the print view.

If nobody in the household has given this year, the card says "No gifts recorded in 2026." (or "No household gifts recorded in 2026.") and, when there is older giving, "Last gift Mar 3, 2025." so you can tell a lapsed donor from someone who has never given.

:::info
If your church turned on [Giving Privacy](../settings/church-settings.md#giving-privacy), the card says "Giving is hidden on person records." and shows a **Show giving** link instead of amounts. Click it to load this person's giving; it hides again when you open another record.
:::

## The Giving View

Click **All years** to open the person's full giving view. A **Back** link at the top returns to the record, and **Log a gift** sits beside it for people with **Edit Donations**.

The **Giving** ledger shows:

- A headline total for the selected year and a summary line such as "14 gifts in 2026 · $8,450.00 since 2019" -- the second figure is everything on file for this person.
- **Year** buttons for every year the person has given, plus the current year and **All years**. The view opens on the current year, or on the most recent year with gifts if there are none this year. If your statement year does not start in January, the buttons use statement years such as **2025–2026** (see [Statement Year Start Month](giving-statements.md#statement-year-start-month)).
- The gifts for that year, one row per fund the gift went to, with **Batch** (a **View batch** link that opens the batch the gift was recorded in), **Date**, **Method** (with the check number or card digits), **Fund**, **Notes**, and **Amount**. Gifts to non-deductible funds are included here, even though they are left off statements.

Beside the headline are the actions:

- **Statement** -- prints the giving statement for the selected year (hidden on **All years**). The statement opens in a print view with **Print** and **Close** buttons and goes back to the record after you print. It is the same layout as [Giving Statements](giving-statements.md#whats-on-a-statement).
- **CSV** -- downloads the gifts shown as `2026_donations.csv` (or `all_donations.csv`) with the columns amount, donationDate, fundName, method, methodDetails, and notes.
- **Give** -- give on the donor's behalf (only shown when a giving provider is connected).
- **Recurring** -- the donor's scheduled gifts.
- **Payment methods** -- the donor's saved cards and bank accounts.

Each of the last three opens in place of the ledger, with a **Giving** back link to return.

## Giving on a Donor's Behalf

Use **Give** when a donor phones in a card gift or asks you to charge a card they have on file.

1. Click **Give**. Choose **Make a Donation** for a one-time gift or **Make a Recurring Donation** for a schedule.
2. Pick a saved payment method, or choose to enter a new card. With the **Save this card for future donations** box checked, the new card is kept on the donor's record for next time.
3. For a recurring gift, set the **Start Date** and **Frequency** (**Weekly**, **Bi-Weekly**, **Monthly**, **Quarterly**, or **Annually**).
4. Under **Fund**, enter the amount for each fund, using **Add More** to split the gift. Only funds marked **Visible to Donors** are offered here, the same as on the giving page.
5. If the donor wants to cover the processing fee, check the box that reads "I'll generously add ... to cover the transaction fees so you can keep 100% of my donation." (If your church forces fees, the form shows "Transaction fees of ... are applied." instead; see [Giving Settings](giving-settings.md#transaction-fee-switch).) **Total Donation Amount** updates as you go.
6. Add any **Notes**, then click **Preview Donation**. The preview lists the donor, **Donation Type**, **Donation Date** or **Starting On**, **Funds**, **Donation Method**, any **Transaction Fee**, and the **Total**. Click **Donate** to charge the card.

The gift is charged through your provider and recorded under the donor like any other online gift, and the donor's email address receives the automatic thank-you email (see [Donor Emails](online-giving-setup.md#donor-emails)).

:::warning
Giving on someone else's behalf needs **Edit Donations**. Without it, B1 records the gift under *your* own person record, not the donor's, even though you opened the form from their page. The amount must be at least 0.50 in your currency.
:::

## Managing a Donor's Recurring Gifts

Click **Recurring** to open **Recurring Donations**. Each scheduled gift shows its **Start Date**, **Amount** (each fund and the **Total**), **Interval** ("Every 1 month", "Every 2 weeks", and so on), and **Payment Method** (card or bank name and last four digits; "Payment method not found." if the method it is charged to has been removed).

The icons on each row depend on your provider:

- **Edit** (pencil) -- shown for Stripe when the donor has at least one saved payment method. The **Edit Recurring Donation** form lets you change the **Method** (which saved card or bank account to charge) and the **Frequency**. Click **Save**, or **Delete** to cancel the gift from here. The amount and funds cannot be changed; to change them, cancel the gift and set up a new one with **Give**.
- **Pause** / **Resume** -- Stripe only. Pausing stops the charges until you resume; a paused gift is marked **Paused**. Both ask you to confirm.
- **Cancel** (trash can) -- available for every provider. Confirm "Are you sure you want to cancel this recurring donation?" and the schedule is cancelled at the provider and removed from the list.

Changing, pausing, or cancelling someone else's recurring gift needs **Edit Donations**. Kingdom Funding and Paystack schedules can be cancelled but not edited or paused. A Stripe schedule that Stripe itself cancels after repeated failed charges disappears from this list too; see [Failed Recurring Gifts](failed-gifts.md).

## Managing a Donor's Payment Methods

Click **Payment methods** to open **Payment Methods**, a list of the donor's saved cards and bank accounts with their last four digits ("No saved payment methods." when there are none). The list only appears when your provider can store payment methods (Stripe, Kingdom Funding, or Paystack); with PayPal the view is empty.

- Click the **+** button and choose **Add Card** or **Add Bank Account** (bank accounts are offered for Stripe and Kingdom Funding). Enter the details in the form that opens and save.
- A bank account added without instant verification shows a **Verify Account** link until the donor's micro-deposit amounts have been entered.
- Click **Edit** (pencil) on a method to update it (Stripe) or to **Delete** it. Deleting asks you to confirm.

The add and edit controls appear for people with the **Edit Settings** permission (and for a person looking at their own record); saving or deleting a method on someone else's behalf also needs **Edit Donations**.

:::info
A card or bank account that one of the donor's active recurring gifts is charged to cannot be deleted. You will see "This payment method is used by a recurring gift. Move the gift to another payment method, then delete this one." Change the recurring gift's **Method** first, or cancel it. For PayPal, B1 cannot look this up and the delete goes ahead.
:::

## Related Articles

- [Recording Donations](recording-donations.md) -- log cash, check, and in-kind gifts, including **Log a gift** from the person record
- [Giving Statements](giving-statements.md) -- year-end statements for every donor, and what a statement contains
- [Failed Recurring Gifts](failed-gifts.md) -- recurring charges the gateway could not collect
- [Online Giving Setup](online-giving-setup.md) -- connect a provider so members can give online
- [Donation History in B1.church](../../b1-church/giving/donation-history.md) -- what the donor sees on their own Giving page
