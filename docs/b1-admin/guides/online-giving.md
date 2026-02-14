---
title: "Guide: Set Up Online Giving"
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

1. Create your most common funds (e.g., "General Fund", "Building Fund", "Missions")
2. Mark tax-deductible funds appropriately — this affects year-end giving statements

:::tip
You can add more funds at any time. Start with your most common giving categories.
:::

## Step 2: Connect Stripe

Stripe handles all payment processing. You'll connect your Stripe account to B1 Admin so donations flow into your bank account.

Follow the [Online Giving Setup](../donations/online-giving-setup.md) guide to connect Stripe:

1. Log in to your Stripe dashboard and retrieve your Publishable Key and Secret Key
2. In B1 Admin, go to Settings and enter both keys

:::warning
Stripe shows your Secret Key only once. Copy and save it before leaving the Stripe dashboard. If you lose it, you'll need to generate a new one.
:::

## Step 3: Add a Giving Page to Your Website

Make giving accessible by adding a donation page to your B1 website.

Follow the [Online Giving Setup](../donations/online-giving-setup.md) and [Managing Pages](../website/managing-pages.md) guides to:

1. Add a "Donate" tab to your B1.church site
2. Your giving URL will be: `https://yoursubdomain.b1.church/donate`
3. Members can give without logging in (public page) or log in for saved payment methods and donation history

## Step 4: Make a Test Donation

Before announcing to your congregation, verify everything works.

1. Make a small test donation to verify the flow works end-to-end
2. Check that the donation appears in B1 Admin under Donations

:::tip
Use Stripe's test mode first if you want to verify without real charges, then switch to live mode before announcing to your congregation.
:::

## Step 5: Announce to Your Congregation

Spread the word so members know they can give online.

1. Share the giving URL via your website, email newsletters, bulletins, and social media
2. Members can also give through the [B1 Mobile app](../../b1-mobile/giving/) — the giving feature is built in

:::info
Members who log in can save payment methods, set up recurring donations, and view their giving history. Anonymous giving works too — no login required.
:::

## Step 6: Ongoing Management

Keep your donation records current and generate reports throughout the year.

1. [Import Stripe transactions](../donations/stripe-import.md) regularly (weekly or monthly) to keep your records current
2. [View donation reports](../donations/donation-reports.md) to track giving trends and totals by fund
3. [Generate year-end giving statements](../donations/giving-statements.md) for your donors' tax records

:::tip
Run Stripe imports at least monthly so your records stay up to date. See the [Year-End Reports Guide](./year-end-reports.md) for the full year-end process.
:::

## You're Done!

Your church is now accepting online donations. Members can give through your website, the B1 Mobile app, or any device with a web browser. All donations are automatically tracked in B1 Admin.

## Related Articles

- [Funds](../donations/funds.md) — create and manage donation categories
- [Batches](../donations/batches.md) — organize donations into groups
- [Recording Donations](../donations/recording-donations.md) — manually enter cash and check donations
- [Stripe Import](../donations/stripe-import.md) — pull online transactions into B1 Admin
- [Donation Reports](../donations/donation-reports.md) — view giving trends and totals
- [Giving Statements](../donations/giving-statements.md) — generate year-end tax statements
- [Making Donations (Web)](../../b1-church/giving/making-donations.md) — the member giving experience
- [Making Donations (Mobile)](../../b1-mobile/giving/making-donations.md) — giving from the mobile app
