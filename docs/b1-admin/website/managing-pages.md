---
title: "Managing Pages"
description: "Create, edit, and organize pages and navigation in B1 Admin's Website Pages view, including page settings, redirects, and site templates."
---

# Managing Pages

<div class="article-intro">

The Website Pages view is your central hub for creating, editing, and organizing all the pages on your church website. You can manage both your page content and your site's navigation from this single screen.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Complete the [Initial Setup](./initial-setup.md) to configure your domain and basic site settings
- Have your content and images ready. Use the [Files](./files.md) manager to upload media assets first.
- Use a computer or tablet. The Website Pages view and the page editor need a screen at least about 880 pixels wide; on a phone you see a message asking you to switch to a larger screen.

</div>

:::info
If your church has more than one website (for example, separate sites per campus), use the site switcher at the top of the Website Pages view to jump between them. Each site has its own pages, navigation, and [appearance](./appearance.md) settings. See [Multiple Websites](#multiple-websites) below.
:::

## Understanding Page Types

The **Pages** table lists every page on your site by **Path** and **Title**. There are two kinds of pages:

- **Generated** -- Pages that were automatically created by the system based on your church's data (for example, a Groups page, a Sermons page, or an individual page for each sermon in your library). These pages show a **Generated** badge and update themselves as your data changes.
- **Custom** -- Pages that you created yourself with your own content and layout.

You can convert any auto-generated page into a custom page if you want full control over its content and design. Click **Convert** next to the generated page and click **Confirm**. The **New Page** dialog opens; give the page a title and click **Save**. Your new custom page takes over the generated page's path, and you can then build it in the [page editor](./page-editor.md).

## Adding and Editing Pages

1. Click the **Add Page** button at the top right of the Website Pages view.
2. Choose a page type and enter a **Page Title**, then click **Save**. **Blank** starts an empty page; **Sermons**, **About Us**, **Donate**, and **Location** fill in a suggested title for that kind of page; **AI** builds a first draft of the page from a short description you type. The page's path is made from its title (for example, "Our Team" becomes `/our-team`), and you can change it later in **Page Settings**.
3. Click **Edit Content** next to any page to open the [page editor](./page-editor.md), where you can add sections, text, images, and other elements.
4. Click **Page Settings** next to a page to update the page title, URL path, and other metadata.
5. Click a page's path in the **Path** column to open the live page in a new tab and see exactly how it will look to visitors.

:::tip
For your home page, set the URL path to just `/`. For all other pages, use a descriptive path like `/about` or `/contact`.
:::

### Page Settings

Open **Page Settings** on any page to configure:

- **Page Title** -- The page name.
- **Layout** -- **Header & Footer** (your site's navigation bar and footer around the page, the default) or **Clean Centered Content** (just the page content, in a centered card on a light gray background, with no navigation bar or footer -- handy for a simple sign-up or landing page).
- **URL Path** -- The page's address on your site. Click the pencil to change it, then click **Check** to make sure the path is valid and not already in use.
- **Visibility** -- Choose who can see the page: **Everyone**, **Logged-in Users**, **Members & Staff**, **Staff Only**, **Team Members**, or **Specific Groups** (then tick the groups). This is a quick way to gate a private page (like a staff resource page) without a separate password. Visitors who aren't signed in see "This page is for church members" with a **Login** button; signed-in people the page isn't shared with see "You don't have access to this page." Gated pages are left out of your sitemap.
- **Meta Description** -- A short summary shown in search engine results and social media link previews. Aim for about 155 characters, or click **Generate with AI** to draft one from the page's content.

The dialog also has a **Duplicate** button, which makes a copy of the page and all of its content, and a **Delete** button, which permanently deletes the page.

:::tip
To send an old address to a page (for example, after you rename `/about-us` to `/about`), add a redirect under **Redirects & analytics** in [Appearance](./appearance.md#redirects--analytics).
:::

## Managing Navigation

The **Main Navigation** panel on the right side of the Website Pages view displays your navigation links. These links control the menu that visitors see on your website.

1. Click **Add** to create a new navigation link. You can point it to any page on your site or to an external URL.
2. To reorder links, drag and drop them into the order you want. You can also nest links under a parent item to create dropdown menus.
3. Click any link to open its **Link Settings**, where you can change its text, URL, or parent page.
4. To remove a link from the navigation, open its **Link Settings** and click **Delete**.

:::info
Removing a navigation link does not delete the page itself. The page still exists and can be accessed directly by its URL -- it simply will not appear in the menu.
:::

## Site-Wide Switches

Below the links in the **Main Navigation** panel are two switches that apply to your whole church website:

- **Show Login** -- Shows a **Login** button in your website's navigation bar.
- **Disable Public Website** -- Turns off your public website. Use it if your church uses B1 only for its member portal, giving, and registrations, and keeps its main website somewhere else.

### What Disabling the Public Website Does

When **Disable Public Website** is on:

- Every public page, including the home page and your custom pages, sends visitors who aren't signed in to the login screen. After they sign in, they go back to the page they asked for.
- Signed-in members see the full website as usual, including your navigation and the built-in **Generated** pages (such as Groups and Sermons). Generated pages no longer appear in the Pages table.
- Search engines are told not to index the site. The sitemap is empty and `robots.txt` blocks all crawling.

These links keep working, so members and guests can still reach them:

- Login and logout
- The member portal (everything under `/mobile`)
- [Event registration](../guides/event-registration.md) links and guest registration

A warning appears under the switch while the public website is off. Turn the switch off again to bring your pages back. Nothing is deleted while the site is disabled.

:::info
This setting applies to your whole church. If you have more than one site, it turns off all of them, not only the one selected in the site switcher.
:::

## Tips for Organizing Your Site

- Keep your top-level navigation to five or six items so visitors can find things quickly.
- Use nested links for related sub-pages (for example, an "About" dropdown with "Our Team," "Beliefs," and "History").
- Review your navigation on a phone to make sure it works well on smaller screens.
- Give pages clear, descriptive names that help visitors understand what they will find.

:::tip
You can add [forms](../forms/creating-forms.md) to your pages to collect registrations, prayer requests, or other information from visitors.
:::

## Starting from a Site Template

If you are building your site from scratch, you can bootstrap it using a **Site Template** instead of creating pages one at a time. A site template creates a set of pre-built pages — home, about, connect, give, and others — with placeholder content and navigation links already wired up.

1. On the Pages screen, click the **Start From a Template** button (beside the **Add Page** button).
2. Browse the available templates (such as **Classic**, **Modern**, **Community**, and **Visitor Focused**) and click one to preview its pages and the navigation links it adds.
3. When you find one you like, click **Create Site**.
4. Pages that do not already exist are created and added to your navigation. Pages you already have are marked **Already exists** and left as-is. The first new page then opens so you can look it over.

After applying a template, open each page in the [page editor](./page-editor.md) to replace the placeholder text and images with your church's real content.

:::info
A template only sets colors and fonts on a site that has never had a color palette saved. Once you have chosen your own palette, applying a template leaves your colors and fonts alone -- those stay under [Appearance](./appearance.md).
:::

## Multiple Websites {#multiple-websites}

A church can run more than one website from the same account -- for example, one per campus or a separate site for a school.

1. On the Pages screen, open the site switcher (it shows **Main Website** at first) and choose **Manage websites…**.
2. In the **Websites** dialog, enter a **Name** and a **Subdomain** (lowercase letters and numbers only -- it becomes `{subdomain}.b1.church`) and click **Add Website**.
3. Pick the new site in the site switcher to build its pages, navigation, blocks, and appearance.

To remove a site, open **Manage websites…** and click **Delete** next to it. Its pages, navigation, and appearance are permanently deleted, and any custom domains it had move to the main website.

## Image Lightbox

When visitors click on an image on your website, it opens in a full-screen lightbox overlay. This lets people view photos at a larger size without leaving the page. No configuration is required — the lightbox is enabled automatically for images in your page content.

## Next Steps

- [Initial Setup](./initial-setup.md) -- First-time setup instructions
- [Using the Page Editor](./page-editor.md) -- Learn how to build and style page content
- [Appearance](./appearance.md) -- Customize your site's visual theme
- [Files](./files.md) -- Upload and manage media assets for your pages
