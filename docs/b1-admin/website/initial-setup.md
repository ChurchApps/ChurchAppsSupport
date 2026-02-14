---
title: "Initial Setup"
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
2. Click **Dashboard** in the left sidebar, then select **Settings** from the dropdown menu.
3. Click **Manage** to view your subdomain. Set it to something short and recognizable with no spaces.
4. To use a custom domain, log into your DNS provider (such as GoDaddy, Cloudflare, or AWS) and add two records:
   - An **A record** for your root domain pointing to `3.23.251.61`
   - A **CNAME record** for `www` pointing to `proxy.b1.church`
5. Return to B1.church Admin, add your custom domain to the list, and click **Add** then **Save**. Your site will be accessible from your custom domain within a few minutes.

:::tip
If you do not see the Settings option, ask the person who set up your church account to grant you the "Edit Church Settings" permission. See [Roles & Permissions](../settings/roles-permissions.md) for details.
:::

## Creating Your First Page

1. In the B1 Admin, click **Website** in the left menu to open the Website Pages view.
2. Click **Add Page** in the top right corner.
3. Choose **Blank** as the page type and name it "Home."
4. Click **Page Settings** and set the URL path to `/` (a forward slash with no text) for your home page. Other pages use `/page-name`.
5. Click **Edit Content** to start building. Every page must begin with a **Section** -- this is the container for all other elements.
6. After adding a section, click **Add Content** again to insert text, images, videos, cards, forms, and more by dragging them into your section.

:::info
For detailed instructions on working with pages, navigation, and page types, see [Managing Pages](managing-pages).
:::

## Configuring Site Appearance

1. From the Website Pages view, click the **Appearance** tab at the top.
2. Use the **Color Palette** to set your brand colors for primary, secondary, and accent tones.
3. Under **Typography Settings**, choose your heading and body fonts from the font browser.
4. Upload your church logo under **Logo** in the Style Settings. Provide both a light background and dark background version.
5. Configure your **Site Footer** with your church's contact information and links.

:::info
Changes you make in Appearance apply across your entire website. See the [Appearance](appearance) page for detailed instructions on each setting.
:::

## Setting Up Navigation

Your navigation links appear in the left sidebar of the Website Pages view. To organize them:

1. Click **Add** to create a new navigation link and point it to one of your pages.
2. Drag and drop links to reorder them or nest them under parent items.
3. Preview your site to confirm the navigation looks correct.

## Next Steps

- [Managing Pages](managing-pages) -- Learn how to work with pages and navigation in detail
- [Appearance](appearance) -- Fine-tune your site's colors, fonts, and layout
- [Files](files) -- Upload images and documents for your website
