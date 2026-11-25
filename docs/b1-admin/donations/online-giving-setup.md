---
title: "Online Giving Setup"
description: "Connect Stripe, Kingdom Funding, or Paystack to B1 Admin so members can give online through your B1.church site and gifts sync to your records."
---

# Online Giving Setup

<div class="article-intro">

B1 Admin integrates with **Stripe**, **Kingdom Funding**, and **Paystack** (for churches in Africa) so your members can give online through your B1.church site. Once configured, online donations automatically appear in your donation records alongside manually entered gifts, keeping everything in one system.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up your [donation funds](funds.md) so donors can designate their gifts
- Create a Stripe account at [stripe.com](https://stripe.com) and activate it (take it out of test mode)
- Have your B1 Admin login credentials ready

</div>

## Setting Up Stripe

1. Create an account at [stripe.com](https://stripe.com) if you do not already have one. Make sure to **activate your account** and take it out of test mode.
2. In Stripe, go to **Developers > API Keys**.
3. Copy your **Publishable Key**.
4. Log in to [B1 Admin](https://admin.b1.church/).
5. Go to **Settings** and open the **Giving** section.
6. Click **Edit** on the **Giving** section.
7. Set the **Provider** to **Stripe**.
8. Paste your Publishable Key into the **Public Key** field.
9. Go back to Stripe and reveal your **Secret Key** (you can only view this once, so save a backup).
10. Paste the Secret Key into the **Secret Key** field and click **Save**.

:::warning
Your Stripe Secret Key is only shown once. Copy it to a secure location before navigating away from the Stripe dashboard. If you lose it, you will need to generate a new key.
:::

## Choosing Your Currency

After selecting Stripe as your provider, a **Currency** dropdown appears alongside your API keys. Pick the currency that matches your Stripe account's settlement currency so donations are charged correctly.

If you haven't saved a currency yet, the dropdown starts on the currency of your church's country from sign-up instead of US dollars. Check it matches your Stripe account before saving.

If your church doesn't take gifts online, leave **Provider** set to **None** and still pick a **Currency** -- the list then includes every currency, with the note "The currency your church records gifts in." Gifts you enter by hand in batches are recorded in that currency, and giving totals are shown in it.

Supported currencies include USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL, and PHP. You can confirm or change your account's default currency in your [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
The currency you select here is used for one-time donations, recurring subscriptions, fee calculations, and donation reports. If you switch currencies later, only new donations and subscriptions will use the new currency — existing recurring gifts continue in the currency they were created with.
:::

:::warning
Make sure your Stripe account is configured to accept the currency you choose. If your Stripe account does not support the selected currency, donations will fail at checkout.
:::

## Apple Pay and Google Pay

Churches on Stripe get Apple Pay and Google Pay buttons on the public giving page automatically. The buttons appear above the card fields for one-time gifts once the donor has chosen a fund and an amount, and only when the donor's browser or device has a wallet set up. Recurring gifts still use the card or bank fields.

Google Pay needs no setup. Apple Pay requires your giving page's domain to be registered with Stripe; B1 registers it the first time the giving page loads on your domain. If the Apple Pay button does not appear on an iPhone, check **Settings > Payment method domains** in your Stripe Dashboard and confirm your `yoursubdomain.b1.church` (or custom) domain is listed and verified.

## Anonymous Gifts

Donors on the public giving page can check **Give anonymously**. An anonymous gift is recorded with no donor attached, still goes to the fund the donor chose, and shows as **Anonymous** in your batches and reports. The donor's email is still required so the receipt can be sent, but no person record is created. Anonymous gifts are one-time only and do not appear on any giving statement.

## Failed Recurring Gifts

When a recurring gift on Stripe fails (an expired or declined card, for example), the failed charge appears under **Donations > Failed Gifts** with the donor, amount, date and the reason the gateway gave. Click **Retry** to attempt the charge again once the donor has updated their payment method.

B1 also emails the donor when the charge fails, and again three and seven days later if it has still not gone through, with a link to update their payment method in B1.church. See [Failed Recurring Gifts](failed-gifts.md) for the page, the emails, and the **Failed events** panel on the Batches page.

:::info
If your church set up Stripe before this feature existed, open **Settings** > **Giving**, click edit, and click **Save** once. That refreshes the Stripe webhook so failed charges are reported to B1.
:::

## Lost Card Disputes (Stripe)

If a donor disputes a card gift with their bank and Stripe reports that the church **lost** the dispute, B1 marks the gift **Refunded**, the same as a refund. It then drops out of giving statements, totals, and reports. Disputes the church wins, or that close any other way, leave the gift as it was.

:::info
If your church set up Stripe before November 2026, open **Settings** > **Giving**, click edit, and click **Save** once. That refreshes the Stripe webhook so B1 is told when a dispute closes.
:::

## Payment Methods Used by a Recurring Gift

A saved card or bank account can't be deleted while one of the donor's active recurring gifts is charged to it. Trying shows: "This payment method is used by a recurring gift. Move the gift to another payment method, then delete this one." This applies to staff managing a donor's payment methods as well as to members. Edit the recurring gift to use another method first, or cancel it, then delete the old method.

This check works for Stripe, Kingdom Funding, and Paystack. For PayPal, B1 can't look up which method a recurring gift uses, so the delete goes ahead as before.

## Adding a Donation Page to Your B1.church Site

1. Go to [b1.church](https://b1.church/) and log in.
2. Click the **Settings** icon.
3. Click **Add Tab**.
4. Choose **Donation** as the type.
5. Enter a name for the tab (e.g., "Give") and click **Save**.
6. Optionally, change the tab icon -- type "Giv" in the icon search for a giving-related icon.

Your donation page is now live. Members can visit it at `yoursubdomain.b1.church/donate`.

## Sharing Your Giving Link

To find your giving URL, go to **B1 Admin** and click the **Settings** icon to see your subdomain. Your donation link follows the format:

`https://yoursubdomain.b1.church/donate`

Share this link on your website, in emails, or in your bulletin so members know where to give online. To put the giving form itself on a website you host outside B1, see [Embedding B1 on Your Own Website](../website/embedding.md).

You can also click **Giving Page Link** at the top of **Donations > Funds** to copy this link or download it as a QR code (**Download PNG**).

### Links With a Preset Fund and Amount

To send donors straight to a specific fund, go to **Donations > Funds** and click **Giving Link** on the fund. Optionally enter an amount, then copy the link. The dialog also shows a QR code for the same link; click **Download PNG** to save it for a bulletin, slide, or poster. When a donor opens the link or scans the code, the fund and amount are already selected on the giving page. The link takes the form:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

The same parameters work in the **Donate Link** element of the website builder.

### Links That Start on a Recurring Gift

Both the **Giving Link** and **Giving Page Link** dialogs have a **Start as a recurring gift** checkbox. Check it and the link (and its QR code) gains `recurring=1`, for example:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25&recurring=1`

The donation form then opens with **Recurring** selected instead of one-time. Donors still see both options and can switch to a one-time gift before they give. Use this for a "Give monthly" button or a QR code on a pledge card.

:::info
Members who are already signed in are sent from `/donate` to their own **Giving** page. The fund, amount, and recurring choice from the link carry over, and the donation form opens ready to fill in.
:::

If a fund has a **Description** (set on the [Funds](funds.md#fund-descriptions-on-the-giving-form) page), it shows under the fund when a donor opens that fund's link.

## Donation Notifications

Stripe sends an email notification each time a donation is received. To change the notification email address, go to the Stripe dashboard, click your profile in the top right, choose **Profile**, and update your email address.

## Donor Emails {#donor-emails}

B1 sends its own emails to the donor, from your church's name and with your **Light Background Logo** at the top, so you do not need a separate receipt process for online gifts:

- **Thank You For Donating** -- sent to the email address on the gift as soon as a one-time gift succeeds or a recurring gift is set up. It lists each **Fund** and **Amount**; when the donor covered the processing fee it adds a **Transaction Fee** line and the **Total**. For a recurring gift it also shows the **Interval** and start date and has a "Modify your subscription here!" link to the donor's Giving page in B1.church. Anonymous donors get it too, since they still enter an email.
- **Your Recurring Donation Needs Attention** and **Your Recurring Donation Was Canceled** -- sent when a recurring charge fails and if Stripe eventually cancels the schedule. See [Failed Recurring Gifts](failed-gifts.md#what-the-donor-receives).

Gifts you record by hand in a batch send no email; print a [receipt](recording-donations.md#printing-a-receipt-for-one-gift) for those if the donor wants one. To thank donors in your own words, use a **Donation · Created** [workflow](../serving/workflows.md#triggers) with an email template.

## Processing Fee Options

Donors always see a checkbox on the giving form offering to cover the processing fee so your church receives the full amount: "I'll generously add ... to cover the transaction fees so you can keep 100% of my donation." To make covering the fee *required* instead of optional, go to **Settings > Giving**, click edit, and turn on the **Transaction Fee** switch next to your keys (its help text reads "Automatically forces users to cover the transaction fees"). The form then shows "Transaction fees of ... are applied." and the fee is always added to the total.

The rates used to work out the fee are under **Fees & statements**: **Flat Rate [ Credit Card ]** and **Transaction Fee [ Credit Card ]** for cards, and for Stripe bank (ACH) gifts in US dollars **Flat Rate [ ACH ]** (a percentage) and **Hard limit [ ACH ]**. They start on your provider's standard rates; change them if your negotiated rates differ, then click **Save**. Every field is described in the [Giving Settings Reference](giving-settings.md#processing-fee-rates).

:::tip
After setup, make a small test donation to confirm everything is working before announcing online giving to your congregation.
:::

## Setting Up Kingdom Funding

Kingdom Funding is a Christian payment processor that supports credit/debit cards and ACH bank transfers. If your church is enrolled with Kingdom Funding, you can connect it as your giving gateway.

:::info
Kingdom Funding integration is currently in beta. Contact your B1 account representative to enable it for your church.
:::

1. Sign up or log in at [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtain your **Tokenization Key** and **Source Key** from the Kingdom Funding dashboard.
3. In B1 Admin, go to **Settings**, open the **Giving** section and click edit.
4. Set the **Provider** to **Kingdom Funding**.
5. Paste the keys into the **Tokenization Key** and **Source Key** fields.
6. Enter the **Webhook Key** (the webhook signing secret from the Kingdom Funding control panel), and copy the webhook URL shown under the provider into your Kingdom Funding settings so Kingdom Funding can notify B1 of completed transactions.
7. Click **Save**.

Once connected, members will see a card/bank toggle on the donation page and can give by credit card or ACH transfer.

## PayPal and Venmo Buttons

PayPal is no longer offered in the **Provider** list for new setups. Churches already connected to **PayPal** get **PayPal** and **Venmo** buttons above the card fields on the giving page for one-time gifts. Donors who click one complete the payment in a PayPal window, and the gift is recorded like any other online donation. Venmo appears only for donors in the United States on devices PayPal considers eligible. Recurring gifts still use the card fields.

## Setting Up Paystack (Africa)

Stripe does not open accounts for churches in Ghana, Nigeria, Kenya, South Africa or Côte d'Ivoire. [Paystack](https://paystack.com) does, and it accepts local cards, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bank transfer and USSD — donors pay in your local currency (GHS, NGN, KES, ZAR, XOF).

1. Register at [paystack.com](https://paystack.com) with your church's business registration certificate and local bank account, and complete Paystack's activation (go-live) review.
2. In the Paystack Dashboard open **Settings → API Keys & Webhooks** and copy the **Public Key** and **Secret Key** (use the live keys, not the test keys).
3. In B1 Admin, go to **Settings**, open the **Giving** section and click edit.
4. Set the **Provider** to **Paystack**, paste the Public Key and Secret Key, and choose your **Currency**.
5. Copy the **webhook URL** shown under the provider, go back to the Paystack Dashboard (**Settings → API Keys & Webhooks**) and paste it into the **Webhook URL** field. This is how recurring gifts and mobile money payments get recorded.
6. Save.

Donors complete their payment in a secure Paystack window and can pick card, mobile money or bank transfer there. Notes:

- **Recurring gifts** need a card; mobile money can't be charged again automatically, so Paystack only allows one-time mobile money gifts.
- Paystack recurring gifts can be cancelled from B1 but not paused or edited — cancel and create a new one to change the amount.
- The **Processing Fee** defaults reflect Paystack's local-card rates for your currency; edit them if your negotiated rates differ.

## Next Steps

- Look up any field in **Settings > Giving** in the [Giving Settings Reference](giving-settings.md)
- Use [Stripe Import](stripe-import.md) to pull online transactions into B1 Admin if they are not syncing automatically
- Check your [Donation Reports](donation-reports.md) to verify that online donations are appearing correctly
- Generate [Giving Statements](giving-statements.md) that include both online and offline donations
