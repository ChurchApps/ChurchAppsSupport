---
title: "Online Giving Setup"
---

# Online Giving Setup

B1 Admin integrates with **Stripe** and **PayPal** so your members can give online through your B1.church site. Once configured, online donations automatically appear in your donation records alongside manually entered gifts.

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

:::note
Your Stripe Secret Key is only shown once. Copy it to a secure location before navigating away from the Stripe dashboard.
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

## Donation Notifications

Stripe sends an email notification each time a donation is received. To change the notification email address, go to the Stripe dashboard, click your profile in the top right, choose **Profile**, and update your email address.

## Processing Fee Options

You can configure your giving page to let donors optionally cover processing fees so your church receives the full donation amount. This setting is managed in your church settings within B1 Admin.

:::tip
After setup, make a small test donation to confirm everything is working before announcing online giving to your congregation.
:::
