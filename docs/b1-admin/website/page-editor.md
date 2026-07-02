---
title: "Using the Page Editor"
---

# Using the Page Editor

<div class="article-intro">

The B1 page editor is a visual drag-and-drop builder that lets you design your church website pages without writing any code. You can add sections and content blocks, customize styles, preview your work, and undo changes -- all from within your browser.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Complete [Initial Setup](initial-setup) to get your website configured
- Create at least one page in [Managing Pages](managing-pages)
- You need the **content.edit** permission to access the editor

</div>

## Opening the Editor

1. In B1 Admin, click **Website** in the left menu.
2. Find the page you want to edit in the Pages table and click **Edit**.

The editor opens in full-screen mode. The left panel shows your page structure and available content elements; the center area shows a live preview of your page.

:::info
The editor always displays in light mode, regardless of your B1 Admin theme setting. This ensures the preview accurately matches how your page will look to website visitors.
:::

## Page Structure: Sections and Elements

Every page is built from two levels:

- **Sections** -- The top-level containers that divide your page into horizontal bands (for example, a hero section, a content block, or a footer strip). Every page must have at least one section before you can add content.
- **Elements** -- The individual content pieces placed inside a section, such as text, images, buttons, cards, forms, and calendars.

### Adding a Section

1. Click **Add Section** (or the **+** button at the top of the left panel).
2. Choose how to start:
   - **From a template** — browse the section template gallery organized by category (Hero, About, Services, Giving, etc.) and click one to insert it as a fully styled, pre-filled section. You can customize everything after it is added.
   - **Blank section** — choose a column layout (single, two columns, three columns, etc.) and build from scratch.
3. The new section appears in the preview. Click it to select it and configure its background color, padding, and other style options.

### Adding Elements to a Section

1. Click inside a section in the preview to select it.
2. Click **Add Content** and choose an element type from the list:
   - **Text** -- Headings, paragraphs, and rich text
   - **Image** -- Upload or link to a photo
   - **Button** -- A clickable call-to-action link
   - **Card** -- An image with a title and description
   - **Form** -- Embed a [form](../forms/creating-forms) directly on the page
   - **Calendar** -- Display an event calendar
   - **FAQ** -- Accordion-style question and answer blocks
   - **Video** -- Embed a video by URL
   - **Groups Browser** -- A filterable directory of all church groups with optional search, category filter, and label filter
   - **Icon Feature** -- An icon with a title and short description, for feature or ministry highlights
   - **Gallery** -- A multi-photo grid or masonry layout
   - **Testimonial** -- One or more quotes with author name, role, and photo
   - **Social Icons** -- Linked icons for your church's social media profiles
   - **Countdown** -- A timer counting down to a date or a weekly service time
   - **Stats** -- A row of large numbers with labels (members, years, campuses)
   - **Campaign Progress** -- A live progress bar for a giving campaign, showing the total raised toward a fund goal
   - **Staff Grid** -- Photo cards for the members of a group; the group must have its **public roster** option turned on
   - **Service Times** -- Your campuses' service schedule, pulled automatically from attendance setup
   - **Sermons** -- Your sermon library, as a full browser or a grid, list, or featured-latest layout
3. Configure the element using the settings panel that appears.

### Reordering Content

Drag sections or elements using the handle icon (six dots) on the left side of each item to reorder them. You can drag elements within a section or move them between sections.

## Styling Your Page

### Section Styles

Click any section to open its style panel. You can set:

- **Background** -- Solid color, gradient, or image. When using an image background, a **Focal Point** picker lets you click to set which part of the image stays centered as the section scales, and an **Overlay** color option lets you add a semi-transparent tint over the image to improve text legibility.
- **Padding** -- Top and bottom spacing inside the section
- **Width** -- Full-width or centered/contained
- **Dividers** -- Decorative shape dividers (wave, slant, curve, triangle, and more) on the top or bottom edge of the section, with color, height, and flip options

### Element Styles

Click any element to open its style panel. Common options include font size, color, alignment, margin, and padding. For images, you can set alt text and link targets.

### Custom CSS

For advanced styling, each section and element has a **Custom CSS** field where you can write your own CSS rules. These are scoped to that element, so they will not unintentionally affect the rest of the page.

:::tip
If you need to apply styles across your entire site -- such as a custom font or global color -- use the [Appearance](appearance) settings instead of custom CSS on individual pages.
:::

## Previewing Your Page

Use the preview controls in the toolbar to check how your page looks at different screen sizes:

- **Desktop** -- Full-width browser view
- **Mobile** -- Narrow phone-sized view

Click **Preview** to open a live version of the page in a new browser tab, exactly as visitors will see it.

## Undoing Changes

The editor tracks your editing history automatically. Use the toolbar buttons or keyboard shortcuts to navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Revert your last action
- **Redo** (Ctrl+Y / Cmd+Y) -- Re-apply an undone action

You can also restore the page to an earlier snapshot. Click **History** in the toolbar to see a list of saved snapshots with descriptions, and click any entry to restore to that point.

:::warning
Restoring a snapshot replaces your current page content with the snapshot version. This cannot be undone with the standard undo button. Save a snapshot of your current state before restoring an old one if you want to keep the option to return.
:::

## Saving and Publishing

Changes are saved automatically as you work. A status indicator in the toolbar shows whether your changes have been saved.

### Draft and published state

Pages can have a **published** state, which controls when visitors see your changes. The toolbar displays a status chip showing the current state:

- **Live on Save** -- The page does not use a publish workflow. Every saved change goes live immediately. This is the default for new pages.
- **Unpublished Changes** -- The page has been published before, but you have made changes since the last publish. Visitors still see the previously published version.
- **Published** -- The page is live and your saved content matches what visitors see.

To publish your changes, click the **Publish** button in the toolbar. The page becomes live immediately.

To revert to the last published version without affecting what visitors see, open the overflow menu (⋮) and click **Discard Changes**.

To take a page offline entirely, open the overflow menu and click **Unpublish**. Visitors will no longer see that page until you publish it again.

:::tip
Use the draft/publish workflow when you want to prepare a page -- for example, for an upcoming event -- and only make it live at the right moment. Build and preview the page, then click Publish when you are ready.
:::

## Related Articles

- [Managing Pages](managing-pages) -- Create pages, set URLs, and manage site navigation
- [Appearance](appearance) -- Set site-wide colors, fonts, and branding
- [Files](files) -- Upload images and documents to use in the editor
- [Creating Forms](../forms/creating-forms) -- Build forms you can embed on pages
