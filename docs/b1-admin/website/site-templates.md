---
title: "Site Templates and AI Pages"
description: "Build a B1 church website quickly: create a set of pages from a site template, or describe a page and let AI draft its sections for you to edit."
---

# Site Templates and AI Pages

<div class="article-intro">

You do not have to start every page from a blank section. A **site template** creates a whole starter site -- several pages with ready-made sections and matching navigation links -- in one step. The **AI** page type drafts a single page from a short description of what you want, using what B1 already knows about your church. Both give you normal pages that you then finish in the [page editor](./page-editor.md).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Content** (content.edit) permission
- Fill in your church's name and address under [Church Settings](../settings/church-settings.md) -- templates and the AI use them in the pages they create
- If your church has more than one website, pick the right site in the site switcher first; pages are created on the selected site

</div>

## Starting From a Site Template {#site-templates}

1. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Website**, and click **Pages**.
2. Click **Start From a Template** (beside **Add Page**). The **Start From a Template** dialog lists each template with a small preview of its home page in the template's colors, a one-line description, and how many pages it creates.
3. Click a template to open its detail view. It shows a preview of every page it will build. A page you already have at the same path (for example an existing `/about`) is marked **Already exists** and the note *Pages you already have are left untouched.* appears. Below the previews, *These links will be added to your navigation menu.* lists the navigation links that are new for your site.
4. Click **Create Site**. The dialog reports **Creating Home...**, **Creating About Us...**, and so on while it works; click **Back** to pick a different template or **Cancel** to leave without creating anything.
5. When it finishes, the first page it created opens on its preview screen. Click **Edit Content** to start replacing the placeholder text and pictures.

### What each template creates

Every template builds its pages from the same library of [section templates](./page-editor.md#adding-a-section) (hero, welcome, service times, find us, meet the team, and so on), arranged differently and in a different color scheme. Navigation links marked "link only" point at B1's built-in pages and do not create a custom page.

| Template | Description | Pages created | Navigation links |
|---|---|---|---|
| **Classic** | Traditional serif type and a deep navy palette. | Home, About Us, Plan Your Visit | Home, About, Visit, Sermons (link only), Give (link only) |
| **Simple** | Clean, uncluttered pages that load fast. | Home, About Us | Home, About, Give (link only) |
| **Modern** | Rounded cards and a bright indigo palette. | Home, About Us, Connect | Home, About, Connect, Sermons (link only), Give (link only) |
| **Visitor Focused** | Built around planning a first visit. | Home, Plan Your Visit, About Us | Home, Visit, About, Sermons (link only), Give (link only) |
| **Community** | Warm and green, with groups front and center. | Home, Connect, About Us, Plan Your Visit | Home, Connect, About, Visit, Give (link only) |
| **Media First** | Bold and dark, built around sermons and streaming. | Home, About Us | Home, About, Sermons, Live, Give (all three link only) |
| **Heritage** | Warm neutrals and classic type for an established church. | Home, About Us | Home, About, Sermons (link only), Give (link only) |

The pages are created at `/`, `/about`, `/visit`, and `/connect`. The link-only entries point at `/sermons`, `/donate`, and `/stream`, which B1 generates from your [sermon library](../sermons/managing-sermons.md), [online giving](../donations/online-giving-setup.md), and [live stream](../sermons/live-streaming.md).

:::info
A template applies its colors and fonts only to a site that has never had a color palette saved. Once you have saved your own palette under [Appearance](./appearance.md), applying a template leaves your colors and fonts alone. Templates never overwrite pages you already have, and a navigation link is skipped when you already have one with the same path or the same text.
:::

:::tip
Templates are a starting point, not a lock-in. After applying one you can add, remove, and reorder sections, [switch a section to another layout](./page-editor.md#switching-a-sections-layout), and change every color and font.
:::

## Generating a Page With AI {#ai}

The **AI** page type writes a first draft of one page -- its sections, headings, text, and photos -- from a description you type.

1. On the **Pages** screen, click **Add Page**.
2. Under **Page Type**, click **AI**.
3. Enter the **Page Title**. The page's path is made from the title, as with any other page.
4. In the description box, describe the page you want. The prompt reads: *Describe the page you want. Real details (dates, times, names, who it is for) make it better. Anything you leave out will be filled in with a reasonable guess for you to edit.* The description must be at least 10 characters. The dialog offers three examples:
   - *Create a welcoming homepage with our church name, mission statement, service times, and a donation button*
   - *Build a ministries page showing our youth group, worship team, and community outreach with photos*
   - *Make a contact page with a map to our location, phone number, email form, and social media links*
5. Click **Save**. A progress bar walks through **Gathering church information...**, **Planning your page structure...**, **Generating 5 sections...** (with the number of sections planned), **Creating page sections and elements...**, and **Opening your new page...** while the page is planned and written.
6. The new page opens on its preview screen. Click **Edit Content** to review every section, correct anything the AI guessed, and replace stock photos with your own.

### What the AI uses

Alongside your description, the generator is given your church's name and address, your site's color palette, your service times and groups where you have set them up, and whether photos should be looked up. It plans the page layout first, then writes each section, and fills gaps it cannot know (a pastor's name, a date) with a plausible placeholder that you should check and edit.

If your site has no pages yet when you generate one, the AI also chooses a starting palette and font pair for the site and saves them under [Appearance](./appearance.md). A site that already has pages keeps its existing look.

### If generation fails

The dialog shows the problem above the description box -- for example *Please provide a detailed description (at least 10 characters).*, *Failed to generate page outline*, or *All sections failed to generate. Please try again.* Nothing is created when generation fails; adjust the description and click **Save** again.

:::warning
Read an AI-drafted page carefully before you publish it. It is written to sound finished, so a guessed detail (a time, a name, a phone number) can look right while being wrong. Use **Page Settings** to add a [meta description](./managing-pages.md#page-settings) once the content is final.
:::

## Related Articles

- [Managing Pages](./managing-pages.md) -- Page settings, navigation, and the other page types
- [Using the Page Editor](./page-editor.md) -- Finish the pages a template or the AI created
- [Appearance](./appearance.md) -- Change the colors and fonts a template set
- [Element Reference](./element-reference.md) -- Settings for every element the generated sections contain
