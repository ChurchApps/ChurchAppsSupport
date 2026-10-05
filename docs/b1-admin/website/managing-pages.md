---
title: "Managing Pages"
---

# Managing Pages

<div class="article-intro">

The Website Pages view is your central hub for creating, editing, and organizing all the pages on your church website. You can manage both your page content and your site's navigation from this single screen.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Complete the [Initial Setup](initial-setup) to configure your domain and basic site settings
- Have your content and images ready. Use the [Files](files) manager to upload media assets first.

</div>

:::info
If your church has more than one website (for example, separate sites per campus), use the site switcher at the top of the Website Pages view to jump between them. Each site has its own pages, navigation, and [appearance](appearance) settings.
:::

## Understanding Page Types

The **Pages** table lists every page on your site along with its status:

- **Generated** -- Pages that were automatically created by the system based on your church's data (for example, a Groups page, a Sermons page, or an individual page for each sermon in your library). These pages update themselves as your data changes.
- **Custom** -- Pages that you created yourself with your own content and layout.

You can convert any auto-generated page into a custom page if you want full control over its content and design.

## Adding and Editing Pages

1. Click the **Add Page** button in the top right corner of the Pages table.
2. Choose a page type (blank or a template) and give it a name.
3. Click **Edit Content** next to any page to open the [page editor](page-editor), where you can add sections, text, images, and other elements.
4. Click **Page Settings** (the gear icon) to update the page title, URL path, and other metadata.
5. Use the **View live page** button to open your page in a new window and see exactly how it will look to visitors.

:::tip
For your home page, set the URL path to just `/`. For all other pages, use a descriptive path like `/about` or `/contact`.
:::

### Page Settings

Open **Page Settings** on any page to configure:

- **Title and URL Path** -- The page name and its address on your site.
- **Visibility** -- Choose who can see the page: everyone, members only, staff only, or members of specific groups. This is a quick way to gate a private page (like a staff resource page) without a separate password.
- **Meta Description** -- A short summary shown in search engine results and social media link previews.
- **Redirects** -- Point an old URL path to this page, so links and bookmarks to a retired page keep working.

## Managing Navigation

The Website Pages view displays your navigation links. These links control the menu that visitors see on your website.

1. Click **Add** to create a new navigation link. You can point it to any page on your site or to an external URL.
2. To reorder links, drag and drop them into the order you want. You can also nest links under a parent item to create dropdown menus.
3. Click the **Edit** icon next to any link to change its label, URL, or position.
4. To remove a link from the navigation, click the **Delete** icon.

:::info
Removing a navigation link does not delete the page itself. The page still exists and can be accessed directly by its URL -- it simply will not appear in the menu.
:::

## Site-Wide Switches

Above **Main Navigation** on the left side of the Website Pages view are two switches that apply to your whole church website:

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
- Review your navigation on mobile by clicking **Mobile Preview** to make sure it works well on smaller screens.
- Give pages clear, descriptive names that help visitors understand what they will find.

:::tip
You can add [forms](../forms/creating-forms.md) to your pages to collect registrations, prayer requests, or other information from visitors.
:::

## Starting from a Site Template

If you are building your site from scratch, you can bootstrap it using a **Site Template** instead of creating pages one at a time. A site template creates a set of pre-built pages — home, about, connect, give, and others — with placeholder content and navigation links already wired up.

1. On the Pages screen, click the **Site Templates** button (beside the **Add Page** button).
2. Browse the available templates and click one to preview its page structure.
3. When you find one you like, click **Apply Template**.
4. Pages that do not already exist are created and added to your navigation. Existing pages are left as-is.

After applying a template, open each page in the [page editor](page-editor) to replace the placeholder text and images with your church's real content.

:::info
Site templates create page structure and navigation. They do not override your site's color scheme or fonts — those are controlled by [Appearance](appearance).
:::

## Image Lightbox

When visitors click on an image on your website, it opens in a full-screen lightbox overlay. This lets people view photos at a larger size without leaving the page. No configuration is required — the lightbox is enabled automatically for images in your page content.

## Next Steps

- [Initial Setup](initial-setup) -- First-time setup instructions
- [Using the Page Editor](page-editor) -- Learn how to build and style page content
- [Appearance](appearance) -- Customize your site's visual theme
- [Files](files) -- Upload and manage media assets for your pages
