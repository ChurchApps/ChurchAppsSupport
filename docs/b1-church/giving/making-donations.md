---
title: "Making Donations in the B1.church Member Portal"
sidebar_label: "Making a Donation"
description: "Make a one-time or recurring gift to your church through B1.church, with or without an account, and review your giving history afterward."
---

# Making a Donation

<div class="article-intro">

There are two ways to make a donation through your church's B1.church site: the public donation page (no login required) and the member donation page (login required). Both use a secure donation form from your church's payment provider (most churches use Stripe).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- For public donations, no account is needed -- just visit your church's **Donate** page.
- For member donations with history tracking and saved payment methods, [log in](../getting-started/logging-in.md) to your account first.

</div>

## Public Donation Page (No Login Required)

Anyone can make a donation without creating an account:

1. Navigate to your church's **Donate** page.
2. The donation form is displayed on the left side of the page. If your church is on Stripe, first pick how you'll pay: **Credit/Debit Card** or **Bank Account (ACH)** (**Bank Account (PAD)** for Canadian churches). Then choose **Make a Donation** for a one-time gift or **Make a Recurring Donation** to give on a schedule, picking the **Frequency** (**Weekly**, **Bi-Weekly**, **Monthly**, **Quarterly**, or **Annually**) and **Start Date**. Bank-account gifts are one-time only, so those buttons disappear when you pick a bank account.
3. Enter your **First Name**, **Last Name**, and **Email**, and complete the **I'm not a robot** check. For a card gift, enter your card details; for a bank account, you'll sign in to your bank through Stripe to connect it ("You'll log in to your bank to authorize the connection. Your credentials are never shared.").
4. Under **Funds**, enter an **Amount** and pick the **Fund**. If your church has added a description for the fund, it appears under it. Click **Add More** to split your gift across several funds, and the red remove icon to take a fund back off.
5. Optionally add a **Memo (optional)**. If your church lets donors cover processing costs, check "I'll generously add" the fee "to cover the transaction fees so you can keep 100% of my donation." The **Total Donation Amount** updates underneath. Some churches add the fee automatically instead and show "Transaction fees of" the amount "are applied."
6. Click **Donate** to complete your donation. A green "Thank you for your donation!" message replaces the form.

For a one-time card gift of at least $0.50, an **Apple Pay** or **Google Pay** button may appear above the card fields when your device supports it, followed by **Or pay with** and the regular fields.

To give without your name on the gift, check **Give anonymously (one-time gifts only)**. The name fields and the recurring option go away.

On the right side of the page, under **Manage Donations**, you will see a link to **Instructions for ACH Payment** if you prefer to give via bank transfer. There is also a **Login** button (and a **Login to manage existing donations** link under the form) if you want to sign in to access additional features like donation history.

The **Giving** screen in the member portal (`/mobile/donate`) shows the same form when you are signed out, headed "Support" your church, with "Already have an account? **Sign in to manage recurring gifts and view history.**" underneath. If your church hasn't connected a payment provider at all, signed-out visitors see "Giving is not yet set up for this church" instead.

:::tip
If you are already logged in when you visit the public donate page, you will be automatically redirected to the member donation page where you have access to your full giving history and saved payment methods. If you followed a giving link, the donation form opens right away, with **Recurring** preselected when the link asked for it.
:::

## Giving Links and QR Codes

Your church may share a link or QR code that opens the giving page with a fund and amount already chosen, or with **Recurring** already selected for a "give monthly" appeal. When the link sets the fund, the other funds are locked and **Add More** is hidden; when it sets the amount, the **Amount** field is locked too -- so you give exactly what the appeal asked for. You can still switch between a one-time and a recurring gift. Signed-in members land on the Give form with the recurring choice carried over; the fund and amount from the link apply to the guest form only.

## Member Donation Page (Logged In)

When you are logged in, the **Giving** page in the member portal shows a **Give** button and a **Print Statement** button at the top, followed by these sections:

- **This year** (titled with the current year) -- Your year-to-date giving total and number of gifts, with an **All history** link. See [Donation History](./donation-history.md) for details.
- **Recurring** -- Your scheduled gifts, with a **Manage** link.
- **Recent Activity** -- Your last three gifts, with a **Repeat last gift** link that opens the donation form.
- **Payment methods** -- Your saved cards and bank accounts (each with its expiry, or the email for a PayPal account), with a **Manage** link to add a card or bank account and to edit or remove saved ones. "No saved payment methods." until you add one.
- A campaign progress card, if your church has an active campaign -- see [Campaign Pledges](#campaign-pledges) below.

**Repeat last gift** only appears once you have given at least once, and the **Give** button only when your church takes gifts online.

To give:

1. Open the giving page from your church's **Donate** tab, from the **Give** button in the **Giving** section of your [Home dashboard](../getting-started/navigating.md#home), or from **History** in the **Giving** section of your [Me page](../getting-started/me-page.md). On the Giving page, tap **Give** to open the donation form.
2. **Make a Donation** (one-time) is selected when the form opens; tap **Make a Recurring Donation** to give on a schedule instead, then pick the **Start Date** and **Frequency**. Tapping the selected choice again folds the form up.
3. Pick your payment method. The **Method** dropdown lists your saved cards and bank accounts (for example "Visa ****4242"). If you have none yet, the card fields appear under **Enter card details** instead -- on Stripe the card is saved to your account automatically, so it is in the dropdown next time; to pay from a bank account on Stripe, add it first under **Payment methods** (see [Managing Payment Methods](./donation-history.md#managing-payment-methods)). Churches on Paystack or Kingdom Funding also offer **Enter new card** in the dropdown, a **Save this card for future donations** checkbox, and a **Use a saved payment method instead** button.
4. Under **Fund**, choose the fund you would like to give to and enter the **Amount** (at least $0.50); click **Add More** to give to more than one fund. A short description of the fund appears under it when your church has added one. The list shows only the funds your church offers to donors, even if you are a staff member who can see other funds in B1 Admin. Add a **Memo (optional)** if you like, and check the box to cover the transaction fee when your church offers it.
5. Click **Preview Donation**. The **Donation Preview** lists your name, the payment method, the donation type, the date (or the start date and frequency for a recurring gift), your memo, each fund and amount, the transaction fee if you are covering it, and the total. Click **Donate** to complete it, or **Cancel** to go back and change something. To leave the form altogether, tap **Back to Giving**.

After your donation is processed, "Thank you for your donation." (or "Recurring donation created. Thank you for your donation.") appears for a few seconds and your donation shows up in your [donation history](./donation-history.md). Churches on PayPal show **PayPal** buttons for one-time gifts here too; after approving in PayPal, choose **Donate** to finish.

If your church hasn't created any funds yet, the form says "No donation funds have been configured for this church. Please contact your administrator."

:::info
If donations you've given were recorded in more than one currency, your year-to-date total and the History total are converted to your church's currency, with a **Converted at current exchange rates** note underneath. Individual donations in your history still show their original currency.
:::

## Payment Methods

Donations are processed securely by the payment provider your church has connected. What you can pay with depends on that provider:

- **Stripe** -- credit or debit card (including Apple Pay and Google Pay for one-time gifts), or a bank account (ACH in the US, pre-authorized debit in Canada).
- **Kingdom Funding** -- credit or debit card, or a bank account (ACH), chosen with the **Card** / **Bank (ACH)** toggle.
- **Paystack** (churches in Africa) -- local cards, mobile money, and bank transfer, in your local currency; payment finishes in a secure Paystack window.
- **PayPal and Venmo** -- churches that already had PayPal set up show **PayPal** and **Venmo** buttons above the card fields for one-time gifts. Recurring gifts use the card fields.

When you are logged in, your payment methods can be saved for future use, making it faster to give next time.

:::info Giving by bank account without signing in
If you give as a guest (without logging in) by bank account, the account has to be verified instantly by signing in to your bank. If it can't be, you'll see "This bank account couldn't be verified instantly. Please give by card, or sign in and add the bank account under your giving profile." Bank accounts that need a few days of verification can only be added after you sign in.
:::

:::warning
If your donation does not go through, double-check your payment details and try again. If the issue persists, contact your church office for assistance.
:::

## Campaign Pledges {#campaign-pledges}

When your church is running a giving campaign, a campaign card appears on the Giving page (and on the public donate page). It shows the campaign's name, dates, and description, a progress bar with the percentage reached, and "*amount* given of *goal* goal • *amount* pledged".

If your church lets members pledge, signed-in members also see a **Make a Pledge** button:

1. Tap **Make a Pledge**. The dialog explains "Pledge an amount you intend to give toward this campaign."
2. Enter your **Pledge Amount** and tap **Save** (or **Cancel**).

The card then shows "You pledged" your amount, how much of it you have given so far, and a status -- **Not started**, **In progress**, **Fulfilled**, or **Beyond pledged**. Tap **Update Pledge** to change the amount. Pledges are a statement of intent; gifts to the campaign's fund count toward them as you give.

## Next Steps

- [Donation History](./donation-history.md) -- View your past donations and print giving statements
