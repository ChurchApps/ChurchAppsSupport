---
title: "Guide: Set Up Online Giving"
description: "Set up online giving in B1 Admin by creating donation funds, connecting Stripe, and adding a Donate page to your B1.church website for members."
---

# Set Up Online Giving

<div class="article-intro">

Walk through everything needed to accept online donations at your church — from creating donation funds, to connecting Stripe for payment processing, to sharing the giving page with your congregation. By the end, members will be able to give online through your website and mobile app.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- B1 Admin account with admin access — see [Roles & Permissions](../people/roles-permissions.md)
- A Stripe account (create one free at [stripe.com](https://stripe.com) if needed)

</div>

## Step 1: Create Donation Funds

Funds are the categories donors can give to. You need at least one fund before you can accept donations.

Follow the [Funds](../donations/funds.md) guide to set up your giving categories:

1. In the [Jump menu](../introduction.md#getting-around-with-the-jump-menu), choose **Donations > Funds** and click **Add Fund**
2. Create your most common funds (e.g., "General Fund", "Building Fund", "Missions")
3. Check **Tax Deductible** on funds whose gifts belong on year-end giving statements, and leave **Visible to Donors** checked on funds donors should be able to pick online

:::tip
You can add more funds at any time. Start with your most common giving categories.
:::

## Step 2: Connect Stripe

Stripe handles all payment processing. You'll connect your Stripe account to B1 Admin so donations flow into your bank account.

Follow the [Online Giving Setup](../donations/online-giving-setup.md) guide to connect Stripe:

1. Log in to your Stripe dashboard and go to **Developers > API Keys** to find your Publishable Key and Secret Key
2. In B1 Admin, go to **Settings**, click **Edit** in the **Giving** section, and set **Provider** to **Stripe**
3. Paste the Publishable Key into **Public Key** and the Secret Key into **Secret Key**, check the **Currency**, and click **Save**

B1 also supports **Kingdom Funding** and **Paystack** (for churches in Africa) as giving providers — see [Online Giving Setup](../donations/online-giving-setup.md).

:::warning
Stripe shows your Secret Key only once. Copy and save it before leaving the Stripe dashboard. If you lose it, you'll need to generate a new one.
:::

## Step 3: Add a Giving Page to Your Website

Make giving accessible by adding a donation page to your B1 website.

Follow the [Online Giving Setup](../donations/online-giving-setup.md) and [Managing Pages](../website/managing-pages.md) guides to:

1. Add a **Donation** tab to your B1.church site (or a **Donation** element to a page in the website builder)
2. Your giving URL will be: `https://yoursubdomain.b1.church/donate`
3. Members can give without logging in (public page) or log in for saved payment methods and donation history
4. To send donors straight to one fund, click **Giving Link** on that fund under **Donations > Funds** to copy a link (or download a QR code) with the fund and amount preset

## Step 4: Make a Test Donation

Before announcing to your congregation, verify everything works.

1. Make a small test donation to verify the flow works end-to-end
2. Check that the donation appears in B1 Admin under **Donations > Batches**

:::tip
To verify without real charges, you can save Stripe's test keys first, then replace them with your live keys in **Settings > Giving** before announcing to your congregation.
:::

## Step 5: Announce to Your Congregation

Spread the word so members know they can give online.

1. Share the giving URL via your website, email newsletters, bulletins, and social media
2. Members can also give through the [B1 App](../../b1-church/giving/index.md) — the giving feature is built in

:::info
Members who log in can save payment methods, set up recurring donations, and view their giving history. Anonymous giving works too — no login required.
:::

## Step 6: Ongoing Management

Keep your donation records current and generate reports throughout the year.

1. Online gifts are recorded automatically. Use [Stripe Import](../donations/stripe-import.md) to catch any Stripe transactions that didn't sync — click **Preview** to see what's missing, then **Import Missing**
2. [View donation reports](../donations/donation-reports.md) under **Donations > Summary** to track giving trends and totals by fund
3. Check **Donations > Failed Gifts** for recurring gifts whose card was declined, and click **Retry** once the donor updates their payment method
4. [Generate year-end giving statements](../donations/giving-statements.md) for your donors' tax records

:::tip
Run a Stripe Import preview before closing each month so your records match Stripe. See the [Year-End Reports Guide](./year-end-reports.md) for the full year-end process.
:::

## You're Done!

Your church is now accepting online donations. Members can give through your website, the B1 App, or any device with a web browser. All donations are automatically tracked in B1 Admin.

## Related Articles

- [Funds](../donations/funds.md) — create and manage donation categories
- [Batches](../donations/batches.md) — organize donations into groups
- [Recording Donations](../donations/recording-donations.md) — manually enter cash and check donations
- [Stripe Import](../donations/stripe-import.md) — pull online transactions into B1 Admin
- [Donation Reports](../donations/donation-reports.md) — view giving trends and totals
- [Giving Statements](../donations/giving-statements.md) — generate year-end tax statements
- [Making Donations](../../b1-church/giving/making-donations.md) — the member giving experience on B1.church and in the B1 App
