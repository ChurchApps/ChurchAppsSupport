---
title: "Giving History and Statements in B1.church"
sidebar_label: "Donation History"
description: "View your past donations, filter by year, and print giving statements for taxes from the Giving page in the B1.church member portal."
---

# Donation History

<div class="article-intro">

When you are logged in, you can view a complete record of your past donations and generate giving statements for tax purposes. Your donation history is available from the **Giving** page of the member portal.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You must be [logged in](../getting-started/logging-in.md) to your B1.church account.
- You need to have made at least one donation. See [Making a Donation](./making-donations.md) to get started.

</div>

## Viewing Your History

1. Log in to your B1.church account.
2. Open the **Giving** page (your church's **Donate** tab), or tap **History** in the **Giving** section of your [Home dashboard](../getting-started/navigating.md#home).
3. Tap **All history** to view your past donations. (The Home **History** link opens this view directly.)

At the top, use the **Years** pills to pick a year (or **All**) and see your total for that period, how many gifts it includes, and how many are still pending. If donations in that period were given in more than one currency, the total is converted to your church currency and a **Converted at current exchange rates** note appears underneath.

Below the total, your donations are grouped by month (with the year added when you are viewing **All**), each showing:

- **Fund** -- Which fund the donation was directed to (for example, General Fund, Building Fund).
- **Date** and **Method** -- When the donation was made and how you paid (for example, "Card - Visa" or "Bank - ACH").
- **Amount** -- The amount of the donation, in the currency it was given.

:::info
Donations that are still being processed show a **Pending** badge under the amount.
:::

If you haven't given yet, the list says "No recent transactions" (and the **Recent Activity** section on the Giving page says "Your donations will appear here once you make your first gift."). Tap **Back to Giving** to return to the Giving page.

## If Your Church Limits Giving History

Your church chooses how much giving history members can see -- see [Giving Statements](../../b1-admin/donations/giving-statements.md#what-members-see-in-b1church):

- **All years** (the default) -- Everything on this page is available.
- **Through a set year** -- Gifts after that year don't appear in your history, totals, or statements, and the Giving page shows that year's total instead of the current year's. Churches often do this to hold back the current year while they finish corrections.
- **Hidden** -- The yearly total, **Recent activity**, **All history**, and **Print Statement** are removed from the Giving page. You can still give and manage your recurring gifts and payment methods.

If you open a statement for a year your church hasn't released, you'll see "This giving statement isn't available. Contact your church for a copy."

Your church may also add a **giving note** -- a short message such as its refund policy. It appears at the top of the Giving page, the give form, and **All history**, and is printed at the bottom of your giving statements.

## If Your Church Doesn't Offer Online Giving

Even if your church hasn't set up online giving, you can still see the gifts it has recorded for you, such as cash and checks. Open the **Giving** page while signed in and you'll see the note "Online giving isn't set up for this church yet. Your recorded gifts and statements are below." Your yearly total, **Recent activity**, **All history**, and **Print Statement** all work as usual. The **Give** button, **Repeat last gift**, and the **Recurring** and **Payment methods** sections are not shown. The **Giving** section on your Home dashboard also shows your total and **History** link, without the **Give** button.

## If Your Church's Statement Year Isn't the Calendar Year

Some churches run their giving year on a fiscal or tax year, such as July to June. When yours does, the years on the Giving page, in **All history**, and on your statements are those statement years. They are shown with both years, such as "2025–2026", and the statement's period line gives the exact dates, for example "Period: Jul 1, 2025 - Jun 30, 2026". Each gift is counted in the statement year it falls in. Your church sets this in B1 Admin (see [Statement Year Start Month](../../b1-admin/donations/giving-statements.md#statement-year-start-month)).

## Exporting and Printing Statements

Tap **Print Statement** at the top of the Giving page to open a printable giving statement covering the current year (or the latest year your church has released) in a new tab. The button appears once you have at least one recorded gift. To print a different year, open **All history**, pick that year, and tap **Print Statement** next to the total (it isn't offered while **All** is selected). The page opens your browser's print dialog on its own; when you close the dialog it goes back to the Giving page.

The statement is centered on the page and starts with your church's logo (when your church has uploaded one), the title "*year* Annual Giving Statement", the period it covers ("Period: Jan 1 - Dec 31" unless your church uses a different statement year), and the date it was issued. Below that are your name, address, mobile phone, and email (with your donor number, if your church has given you one) beside your church's name and address (and its Tax ID, if your church has entered one), a summary with your total contributions and a total for each fund, and a table of every gift with its date, method, fund, and amount. If any of your gifts that year has a memo (the note you typed when giving online, or one your church added), a **Memo** column shows it beside the fund. At the bottom, a note confirms that the statement covers all contributions your church received from you that year, followed by a short disclaimer that the church is a registered non-profit and that no goods or services were provided in exchange for the gifts other than intangible religious benefits. Your church may replace that disclaimer with its own wording. Your church's giving note, if it has one, is printed after that.

Churches outside the United States can choose a country-specific receipt format in B1 Admin. A Canadian statement is titled **Official Receipt for Income Tax Purposes** and adds a receipt number, the church's charity registration number, the date and place of issue, the eligible amount of your gifts, any gifts not eligible for a receipt, and a signature line; an Australian statement is titled **Receipt for Donation** and shows the church's ABN and its deductible gift recipient status.

:::tip
Print your statement early in the new year, before you need it for tax filing, while last year's donations are still fresh in your history.
:::

## Recurring Donations

If you have any scheduled gifts, the **Recurring** section on the Giving page lists each one with its amount and fund ("$50.00 · General Fund") and its interval and payment method ("Every 1 month · Visa ****4242"); "No recurring gifts." when you have none. Tap **Manage** to open **Recurring gifts and payment methods**.

The **Recurring Donations** table there lists each gift's **Start Date**, **Amount** (per fund, with a total), **Interval**, and **Payment Method**, with icons on the right:

- **Pencil** (Stripe only) -- opens **Edit Recurring Donation**, where you can change the **Method** (another saved card or bank account) and the **Frequency**, then **Save** ("Recurring donation updated."). The amount, fund, and start date can't be edited -- cancel the gift and set up a new one instead.
- **Pause** (Stripe only) -- asks "Are you sure you want to pause this recurring donation?" Giving stops until you click the same icon to **resume**; a paused donation is marked **Paused** in the list.
- **Trash** -- asks "Are you sure you want to cancel this recurring donation?" and cancels it ("Recurring donation cancelled.").

Recurring donations through Paystack, Kingdom Funding, or PayPal can only be canceled here, not edited or paused.

:::info
Church staff with giving access can also edit, pause, or cancel your recurring gift and update your payment methods from your record in B1 Admin, so you can ask the office if you get stuck. See [Giving on a Person's Record](../../b1-admin/donations/person-giving.md).
:::

## Managing Payment Methods {#managing-payment-methods}

Tap **Manage** in the **Payment methods** section to open the **Payment Methods** box. Click the **+** icon to **Add Card** or, for churches on Stripe or Kingdom Funding, **Add Bank Account**:

- **Add Card** -- enter the card in **Add New Card** and save ("Card added successfully."). Later, click the pencil next to a card to update its **Expiration Month** and **Expiration Year**.
- **Add Bank Account** (Stripe) -- **Connect Bank Account** signs you in to your bank through Stripe Financial Connections ("Your bank credentials are never shared with us."). Most banks verify instantly; if yours can't, the account is added with a note to check your statement for two small micro-deposits. When they arrive, click **Verify Account** next to the bank account, enter the **First Deposit** and **Second Deposit** amounts, and save ("Bank account verified."). Until then the account can't be used for a gift. The pencil on a bank account lets you correct the **Account Holder Name** and whether the holder is an **Individual** or a **Company**.
- **Delete** -- the trash icon asks "Are you sure you wish to delete this payment method?" and removes it.

Churches on Paystack save a card when you check **Save this card** while giving; churches on PayPal have no saved payment methods to manage.

:::info
You can't delete a card or bank account that one of your recurring gifts is charged to. You'll see "This payment method is used by a recurring gift. Move the gift to another payment method, then delete this one." Edit the recurring gift to use a different payment method (or cancel it), then delete the old one.
:::

## Next Steps

- [Making a Donation](./making-donations.md) -- Learn how to make a one-time or recurring gift
