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
2. Choose a layout for your section -- options include single column, two columns, three columns, and more.
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
3. Configure the element using the settings panel that appears.

### Reordering Content

Drag sections or elements using the handle icon (six dots) on the left side of each item to reorder them. You can drag elements within a section or move them between sections.

## Styling Your Page

### Section Styles

Click any section to open its style panel. You can set:

- **Background** -- Solid color, gradient, or image
- **Padding** -- Top and bottom spacing inside the section
- **Width** -- Full-width or centered/contained

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

## Saving Your Work

Changes are saved automatically as you work. A status indicator in the toolbar shows whether your changes have been saved. You can also click **Save** at any time to force a save.

## Related Articles

- [Managing Pages](managing-pages) -- Create pages, set URLs, and manage site navigation
- [Appearance](appearance) -- Set site-wide colors, fonts, and branding
- [Files](files) -- Upload images and documents to use in the editor
- [Creating Forms](../forms/creating-forms) -- Build forms you can embed on pages
