---
title: "Online Giving Setup"
---

# Online Giving Setup

<div class="article-intro">

B1 Admin integrates with **Stripe**, **PayPal**, **Kingdom Funding**, and **Paystack** (for churches in Africa) so your members can give online through your B1.church site. Once configured, online donations automatically appear in your donation records alongside manually entered gifts, keeping everything in one system.

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
5. Click **Church** in the top navigation, then click **Edit Church Settings**.
6. Click the edit icon next to **Church Settings**.
7. Scroll down to the **Giving** section.
8. Set the **Provider** to **Stripe**.
9. Paste your Publishable Key into the **Public Key** field.
10. Go back to Stripe and reveal your **Secret Key** (you can only view this once, so save a backup).
11. Paste the Secret Key into the **Secret Key** field and click **Save**.

:::warning
Your Stripe Secret Key is only shown once. Copy it to a secure location before navigating away from the Stripe dashboard. If you lose it, you will need to generate a new key.
:::

## Choosing Your Currency

After selecting Stripe as your provider, a **Currency** dropdown appears alongside your API keys. Pick the currency that matches your Stripe account's settlement currency so donations are charged correctly.

Supported currencies include USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, and BRL. You can confirm or change your account's default currency in your [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

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

B1 also emails the donor when the charge fails, and again three and seven days later if it has still not gone through, with a link to update their payment method in B1.church.

:::info
If your church set up Stripe before this feature existed, open **Church Settings > Giving** and click **Save** once. That refreshes the Stripe webhook so failed charges are reported to B1.
:::

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

Share this link on your website, in emails, or in your bulletin so members know where to give online.

### Links With a Preset Fund and Amount

To send donors straight to a specific fund, go to **Donations > Funds** and click **Giving Link** on the fund. Optionally enter an amount, then copy the link. When a donor opens it, the fund and amount are already selected on the giving page. The link takes the form:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

The same parameters work in the **Donate Link** element of the website builder.

## Donation Notifications

Stripe sends an email notification each time a donation is received. To change the notification email address, go to the Stripe dashboard, click your profile in the top right, choose **Profile**, and update your email address.

## Processing Fee Options

You can configure your giving page to let donors optionally cover processing fees so your church receives the full donation amount. This setting is managed in your church settings within B1 Admin.

:::tip
After setup, make a small test donation to confirm everything is working before announcing online giving to your congregation.
:::

## Setting Up Kingdom Funding

Kingdom Funding is a Christian payment processor that supports credit/debit cards and ACH bank transfers. If your church is enrolled with Kingdom Funding, you can connect it as your giving gateway.

:::info
Kingdom Funding integration is currently in beta. Contact your B1 account representative to enable it for your church.
:::

1. Sign up or log in at [kingdomfunding.org](https://kingdomfunding.org).
2. Obtain your **Security Key** (public) and **Private Key** from the Kingdom Funding merchant portal.
3. In B1 Admin, go to **Settings** and open **Church Settings**.
4. In the **Giving** section, set the **Provider** to **Kingdom Funding**.
5. Paste your Security Key into the **Security Key** field and your Private Key into the **Private Key** field.
6. Set the **Webhook Key** you received from Kingdom Funding, and copy the displayed webhook URL into your Kingdom Funding merchant settings so Kingdom Funding can notify B1 of completed transactions.
7. Save.

Once connected, members will see a card/bank toggle on the donation page and can give by credit card or ACH transfer.

## PayPal and Venmo Buttons

Churches using **PayPal** as their provider get **PayPal** and **Venmo** buttons above the card fields on the giving page for one-time gifts. Donors who click one complete the payment in a PayPal window, and the gift is recorded like any other online donation. Venmo appears only for donors in the United States on devices PayPal considers eligible. Recurring gifts still use the card fields.

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

- Use [Stripe Import](stripe-import.md) to pull online transactions into B1 Admin if they are not syncing automatically
- Check your [Donation Reports](donation-reports.md) to verify that online donations are appearing correctly
- Generate [Giving Statements](giving-statements.md) that include both online and offline donations
