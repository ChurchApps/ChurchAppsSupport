---
title: "Getting Started with Your B1 Admin Website"
sidebar_label: "Initial Setup"
description: "Set up your B1 Admin church website: point a subdomain or custom domain, create your home page, pick brand colors and logo, and build navigation."
---

# Initial Setup

<div class="article-intro">

Every B1 account comes with a website ready to go. This guide walks you through setting up your church domain, configuring your site's appearance, creating your first pages, and organizing your navigation.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need a B1.church account with administrative access
- If using a custom domain, have your DNS provider login credentials ready (e.g., GoDaddy, Cloudflare, or AWS)
- Prepare your church logo in PNG format with a transparent background for best results

</div>

## Setting Up Your Domain

Your church automatically receives a subdomain on B1.church (for example, `yourchurch.b1.church`). You can also point your own custom domain to your B1 site.

1. Go to **B1.church Admin** by visiting admin.b1.church or clicking your profile dropdown and choosing **Switch App**.
2. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Settings**, and click **Settings**.
3. Open the **Church Information** section to view your subdomain. Set it to something short and recognizable with no spaces.
4. To use a custom domain, log into your DNS provider (such as GoDaddy, Cloudflare, or AWS) and add two records:
   - An **A record** for your root domain pointing to `3.23.251.61`
   - A **CNAME record** for `www` pointing to `proxy.b1.church`
5. Return to B1.church Admin, open the **Domains** section on the same Settings page, add your custom domain to the list, and click **Add** then **Save**. Your site will be accessible from your custom domain within a few minutes.

:::tip
If you do not see the Settings option, ask the person who set up your church account to grant you the "Edit Church Settings" permission. See [Roles & Permissions](../settings/roles-permissions.md) for details.
:::

## Creating Your First Page

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Website**, and click **Pages**.
2. Click **Add Page** in the top right corner.
3. Choose **Blank** as the page type, enter "Home" as the **Page Title**, and click **Save**.
4. Click **Page Settings** on the new page's row and change the **URL Path** to `/` (a forward slash with no text) for your home page. Other pages use `/page-name`.
5. Click **Edit Content** to start building. Every page must begin with a **Section** -- this is the container for all other elements. Click **Add Content** and drag **Section** onto the page, then pick a ready-made section layout or **Blank Section**.
6. After adding a section, click **Add Content** again to insert text, images, videos, cards, forms, and more by dragging them into your section.

:::info
For detailed instructions on working with pages and navigation, see [Managing Pages](./managing-pages.md). For a full guide to the visual editor, see [Using the Page Editor](./page-editor.md).
:::

## Configuring Site Appearance

1. In the Jump menu, choose **Website > Appearance**.
2. Use the **Color Palette** to set your brand colors -- the base light, accent, and dark shades, plus primary and secondary button colors -- then click **Save Palette**.
3. Under **Fonts**, choose your heading and body fonts from the font browser and click **Save Fonts**.
4. Upload your church logo under **Logo** in the Style Settings. Provide both a light background and dark background version, then click **Save Changes**.
5. Click **Site Footer** to open the footer in the block editor and add your church's contact information and links.

:::info
Changes you make in Appearance apply across your entire website. See the [Appearance](./appearance.md) page for detailed instructions on each setting.
:::

## Setting Up Navigation

Your navigation links appear in the Website Pages view. To organize them:

1. In the **Main Navigation** panel, click **Add**, enter the **Link Text** and the page's path (for example, `/about`) as the **URL**, and click **Save**.
2. Drag and drop links to reorder them or nest them under parent items.
3. Preview your site to confirm the navigation looks correct.

## Next Steps

- [Managing Pages](./managing-pages.md) -- Learn how to work with pages and navigation in detail
- [Appearance](./appearance.md) -- Fine-tune your site's colors, fonts, and layout
- [Files](./files.md) -- Upload images and documents for your website
