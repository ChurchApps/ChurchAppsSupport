---
title: "Guide: Launch Your Church Website"
description: "Set up a church website in B1 Admin: build your home page, match colors and logo, add key pages, connect a custom domain, and add giving forms."
---

# Launch Your Church Website

<div class="article-intro">

B1.church includes a full website builder at no extra cost. This guide walks you through creating your church website from scratch — setting up your home page, configuring your look and feel, adding key pages, and optionally connecting online giving and event registration forms.

</div>

## Training Video

<YouTube id="aA4UahZpmXg" title="Launching Your Church Website in B1" next="Editing Pages and Navigation in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Before You Begin</h4>

- Have your church logo ready (PNG with transparent background works best)
- Choose 2–3 brand colors for your site
- If using a custom domain (e.g., yourchurch.com), have access to your DNS provider (GoDaddy, Cloudflare, etc.)
- If you want online giving on your site, complete [Online Giving Setup](../donations/online-giving-setup.md) (Stripe) first

</div>

## Step 1: Initial Website Setup

Start by creating your home page and basic site structure.

Follow the [Website Initial Setup](../website/initial-setup.md) guide to:

1. In the [Jump menu](../introduction.md#getting-around-with-the-jump-menu), choose **Website > Pages**
2. Click **Add Page**, choose **Blank**, enter "Home" as the **Page Title**, and click **Save**. In **Page Settings**, set the **URL Path** to `/`
3. Click **Edit Content**, add a **Section**, then add your hero, welcome message, church name and tagline, and other key information

:::tip
Starting from scratch? A [Site Template](../website/managing-pages.md#starting-from-a-site-template) creates a set of ready-made pages (home, about, connect, give, and others) with navigation links already wired up — replace the placeholder content with your own.
:::

## Step 2: Configure Appearance

Set your site's visual identity — colors, fonts, logo, and footer.

Follow the [Appearance](../website/appearance.md) guide to:

1. In the Jump menu, choose **Website > Appearance**
2. Under **Logo**, upload a **Light Background Logo** and a **Dark Background Logo**
3. Under **Color Palette**, set your brand colors and click **Save Palette**, then pick your **Fonts**
4. Use **Navigation** to style the navigation bar and **Site Footer** to build the footer that appears on every page

:::tip
Keep your color palette simple — a primary color plus one accent color is usually enough. The website builder will handle the rest.
:::

## Step 3: Add Content Pages

Build out the pages your visitors need most.

Follow the [Managing Pages](../website/managing-pages.md) guide to create pages like:

- **About** — Your church's story, beliefs, and leadership
- **Sermons** — Link to your [sermon library](../sermons/managing-sermons.md)
- **Events** — Upcoming events and registration
- **Give** — Online giving page (requires [Stripe setup](../donations/online-giving-setup.md))
- **Contact** — Location, service times, and contact info

## Step 4: Connect Your Domain

If you want to use your own domain name (like yourchurch.com) instead of the default B1 URL:

Follow the [Custom Domain](../settings/custom-domain.md) guide to:

1. At your domain provider, add a **CNAME** record for `www` pointing to `proxy.b1.church` (or an **A** record for your root domain pointing to `3.23.251.61`)
2. In the Jump menu, choose **Settings > Settings**, click **Edit** in the **Domains** section, type your domain, and click **Save**

:::info
Set up DNS first: B1 saves the domain right away, but it won't load your site (or get its SSL certificate) until DNS points to B1. DNS changes can take a few minutes to a few hours. The default B1 URL keeps working the whole time.
:::

## Step 5: Add Giving and Forms

Enhance your site with interactive elements:

- **Online Giving** — Add a **Donation** element so members can donate directly from your website. See [Online Giving Setup](../donations/online-giving-setup.md) to configure Stripe first.
- **Registration Forms** — Embed [Stand Alone forms](../forms/creating-forms.md) for event signups, visitor cards, or volunteer applications with the **Form** element. See the [Page Editor](../website/page-editor.md) for how to add elements to any page.

## You're Done!

Your church website is live. Share the URL with your congregation and on social media. You can update content, add new pages, and adjust the appearance at any time from the **Website** section of B1 Admin.

## Related Articles

- [Website Initial Setup](../website/initial-setup.md) — detailed setup walkthrough
- [Managing Pages](../website/managing-pages.md) — add and edit pages
- [Appearance](../website/appearance.md) — colors, logo, and layout
- [Page Editor](../website/page-editor.md) — add sections, text, images, forms, and giving
- [Custom Domain](../settings/custom-domain.md) — use your own web address
- [Managing Files](../website/files.md) — upload images and documents
- [Online Giving Setup](../donations/online-giving-setup.md) — configure Stripe
- [Creating Forms](../forms/creating-forms.md) — build registration and survey forms
