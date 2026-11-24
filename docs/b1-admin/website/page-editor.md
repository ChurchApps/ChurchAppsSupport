---
title: "Using the Page Editor"
description: "Build website pages in the B1 Admin page editor: add sections and elements, style them, preview on mobile, publish drafts, and use undo and edit history."
---

# Using the Page Editor

<div class="article-intro">

The B1 page editor is a visual drag-and-drop builder that lets you design your church website pages without writing any code. You can add sections and content blocks, customize styles, preview your work, and undo changes -- all from within your browser.

</div>

## Training Video

<YouTube id="m2B_JxmfFm4" title="Editing Pages and Navigation in B1" next="Connecting a Custom Domain in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Before You Begin</h4>

- Complete [Initial Setup](./initial-setup.md) to get your website configured
- Create at least one page in [Managing Pages](./managing-pages.md)
- You need the **content.edit** permission to access the editor

</div>

## Opening the Editor

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Website**, and click **Pages**.
2. Find the page you want to edit in the Pages table and click **Edit Content**.

The editor opens in full-screen mode with a live preview of your page. The toolbar across the top has, from left to right:

- **Exit** -- leaves the editor and opens the page's [preview screen](./managing-pages.md#the-page-preview-screen) (or the Blocks list when you are editing a block).
- The **Page** or **Block** label with its name, and for pages a status chip: **Live on save**, **Published**, or **Unpublished changes** (see [Saving and Publishing](#saving-and-publishing)).
- **Undo** and **Redo**, then the save status: **Saving…**, **All changes saved** with how long ago, or **Couldn't save**.
- **Publish** (pages only), the **Desktop** and **Mobile** preview buttons, and **Add Content**.
- The **Check accessibility** icon, which shows a count when the page has issues (see [Accessibility Checker](./accessibility-checker.md)).
- The **More** (⋮) menu with **View history**, **Discard unpublished changes** and **Turn off publishing** (both only on a published page), **Edit site footer** (opens your [footer block](./blocks.md#your-site-footer-is-a-block)), and **Help**.

Click **Add Content** to open the **Add Elements** panel on the left; click a section or element to open its settings on the right.

**Help** opens **Page editor basics**, a short card with tips for adding, editing, and rearranging content, undo and history, and the keyboard shortcuts, plus a **Full documentation** link to this site.

The editor needs a screen at least about 880 pixels wide. On a phone you see a message asking you to open the page on a tablet or computer.

:::info
The editor always displays in light mode, regardless of your B1 Admin theme setting, and uses the heading and body fonts you chose in [Appearance](./appearance.md). This ensures the preview accurately matches how your page will look to website visitors.
:::

## Page Structure: Sections and Elements

Every page is built from two levels:

- **Sections** -- The top-level containers that divide your page into horizontal bands (for example, a hero section, a content block, or a footer strip). Every page must have at least one section before you can add content.
- **Elements** -- The individual content pieces placed inside a section, such as text, images, buttons, cards, forms, and calendars.

### Adding a Section

1. On an empty page, click **Add your first section** in the **This page is empty** box. Otherwise click **Add Content** and drag **Section** onto the page, or hover between two sections and click the **+** (**Add section**) button that appears on the line between them.
2. In the **Choose a Section Layout** dialog, choose how to start:
   - **From a template** -- click a template card to insert it as a fully styled, pre-filled section. Use the chips at the top (**All**, **Hero**, **About**, **Services**, **People**, **Media**, **Giving**, **Call to Action**) to filter by category. The templates are:
     - **Hero** -- **Centered Hero**, **Split Hero**, **Gradient Hero**
     - **About** -- **Welcome**, **About Us**, **Our Story**, **Testimony**
     - **Services** -- **Service Times**, **Find Us**
     - **People** -- **Meet the Team**, **Ministries**, **Browse Groups**, **Group List**, **FAQ**
     - **Media** -- **Latest Sermons**, **Watch Online**
     - **Giving** -- **Giving Banner**, **Ways to Give**
     - **Call to Action** -- **Call to Action**, **Connect**, **Photo Gallery**, **Verse Banner**
   - **Blank Section** -- an empty section to build from scratch. To split it into columns, add a **Row** element inside it.
3. The new section appears in the preview. Click it to select it and configure its background, colors, and other style options.

Hovering over a section shows its toolbar in the top-right corner: a drag handle (**Drag to reorder**), **Section settings**, **Move section up**, **Move section down**, **Duplicate section**, **Try another layout**, and **Delete section**. Double-clicking an empty part of a section also opens its settings.

### Switching a Section's Layout

Already built out a section but want a different structure? Click **Try another layout** on the section's toolbar. The **Switch Section Layout** dialog shows the same template gallery; pick one and your existing headings, text, buttons, and photos are poured into the new arrangement. As the dialog warns, *Extra content that doesn't fit the new layout is dropped. Use undo to restore it.* The button is only offered for sections that have content to carry over, and not for [reusable block](./blocks.md) sections.

### Adding Elements to a Section

1. Click **Add Content** to open the **Add Elements** panel. Use **Search Elements** or the tabs (**All**, **Common**, **Media**, **Church**, **Advanced**, and **Blocks** once you have [reusable blocks](./blocks.md)) to find an element.
2. Drag the element into a section in the preview (a **Drop here to add element** target appears where it can go), or select an element on the page and then click a card to add the new element right after it. Hover over a card to read its one-line description. The elements are (see the [Element Reference](./element-reference.md) for every setting of each one):
   - **Row** -- Splits a section into side-by-side columns
   - **Box** -- Groups elements together in a styled container
   - **Carousel** -- Rotates through a set of full-width slides
   - **White Space** -- Adds empty vertical space
   - **Text** -- Headings, paragraphs, and rich text
   - **Image** -- Upload or link to a photo
   - **Button Link** -- A clickable call-to-action button
   - **Card** -- An image with a title and description
   - **Form** -- Embed a [form](../forms/creating-forms.md) directly on the page. If the form has a [header photo](../forms/creating-forms.md#adding-a-header-photo), it shows above the questions
   - **Calendar** -- Display an event calendar
   - **Expandable** -- Accordion-style question and answer blocks
   - **Video** -- Embed a video by URL
   - **Groups Browser** -- A filterable directory of all church groups with optional search, category filter, and label filter. Its **Layout** can be **Grid** (the default) or **Scrolling (automatic)** -- see [Scrolling layouts](#scrolling-layouts)
   - **Group List** -- Tiles for your public groups, optionally only the groups with a given label. Its **Layout** can be **Grid** (the default; up to three tiles per row) or **Scrolling (automatic)** -- see [Scrolling layouts](#scrolling-layouts)
   - **Icon Feature** -- An icon with a title and short description, for feature or ministry highlights
   - **Gallery** -- A multi-photo grid or masonry layout
   - **Testimonial** -- One or more quotes with author name, role, and photo
   - **Social Icons** -- Linked icons for your church's social media profiles: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo, and Podcast. Fill in a link for each one you want to show; for **WhatsApp**, use a `https://wa.me/` link with your number or a group invite link
   - **Countdown** -- A timer counting down to a date or a weekly service time
   - **Stats** -- A row of large numbers with labels (members, years, campuses)
   - **Campaign Progress** -- A live progress bar for a giving campaign, showing the total raised toward a fund goal
   - **Staff Grid** -- Photo cards for the members of a group; the group must have its **public roster** option turned on
   - **Service Times** -- Your campuses' service schedule, pulled automatically from attendance setup
   - **Sermons** -- Your sermon library, as a full browser or a grid, list, or featured-latest layout
   - **Location** -- An embedded map centered on your church's address
   - **Table** -- A simple grid of rows and columns for tabular content
   - **Text with Photo** -- Text and an image side by side
   - **Logo** -- Your church logo, pulled from [Appearance](./appearance.md)
   - **Stream** -- Your live stream player, embedded directly on the page
   - **Podcast** -- A list of episodes pulled from an external podcast RSS feed URL you provide, with settings for how many episodes to show and whether to display dates and descriptions. Each episode on the live site has an audio player and a **Download** link that saves the episode's audio file under the episode title. This is for featuring any podcast feed on your site; to publish your own sermons as a podcast, see [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed) instead.
   - **Donation** -- A full giving form embedded on the page
   - **Donate Link** -- A button that opens your giving page
   - **HTML** -- Your own raw HTML, for advanced use cases such as embedding a third-party widget (see [Using the HTML element](#using-the-html-element))
   - **Embedded Page** -- Embed another web page by URL in a frame
3. Configure the element using the settings panel that appears.

### Using the HTML element

The **HTML** element has two boxes:

- **HTML Content** -- The markup to show on the page. Any `<script>` tags you include here run on your live site.
- **JavaScript (exclude script tag)** -- Script code that runs when the page loads. You can also paste a vendor's embed snippet here with its `<script>` tags included, and it will run on the live site.

If you paste only a web address (such as an image link) into the JavaScript box, the box turns red with the warning *"This is a web address, not JavaScript."* A bare address in that box does nothing. To show a picture, use an **Image** element or put `<img src="...">` in **HTML Content**.

### Using the Calendar element {#using-the-calendar-element}

The **Calendar** element shows events from one of your calendars:

1. Under **Select**, choose **Group Calendar** (one group's events -- the list shows groups you belong to) or **Curated Calendar** (a calendar you built under **Calendars**; see [Curated Calendar](../calendars/curated-calendar.md)).
2. Under **Select Calendar**, pick the group or calendar.
3. Under **Display**, choose how to show it:
   - **Month calendar** -- A month grid that visitors can page through. Each event is colored by the group it belongs to, so a group's events have the same color on every calendar. B1 picks the colors automatically; there is nothing to set up.
   - **Upcoming events** -- A grid of tiles for the next upcoming events (12 by default; change it with the **Number of Events** setting), with a repeating event shown once on its next date. Each tile shows the event's photo (or its title on your theme's dark color when it has no photo), a date badge, the day and time, and the first line of its description. A **Subscribe** button above the tiles lets visitors copy the calendar's ICS link or download it. A **Layout** setting appears for this display: **Grid** (the default) or **Scrolling (automatic)**, which puts the tiles in a single row that scrolls along by itself (see [Scrolling layouts](#scrolling-layouts)). For a **Curated Calendar**, turn on the **Group badge** setting to show each event's group name in the top-right corner of its tile, in that group's calendar color. Events from archived or confidential groups don't get a badge.
4. To show only some events, type a tag in **Only events tagged** -- for example, `youth`. Only events whose **Tags** include that word appear. Leave it empty to show every event. Tags are set on each event; see [Adding and Editing Events](../calendars/creating-calendars.md#adding-and-editing-events).

In either display, clicking an event opens its own page on your website. The event page shows the event photo, title, date and time, and description, plus a box with **When** (including the repeat pattern for a recurring event) and **Where** (the rooms booked for it). It also has a **Register for this Event** button when registration is turned on, and an **Add to my calendar** link that downloads the event as a calendar file. The page is set up so search engines can show the event's date and details in their results. Event pages from curated calendars shown on your pages (for events in the next six months) are also listed in your site's sitemap, so search engines can find them.

### Scrolling layouts {#scrolling-layouts}

The **Scrolling (automatic)** layout on the **Groups Browser**, **Group List**, and the Calendar element's **Upcoming events** display puts the tiles in one row instead of a grid. On a phone each tile fills the row; on a computer two tiles fit side by side. When there are more tiles than fit, the row:

- Moves forward one tile about every four seconds, carrying on to the first tile again after the last one.
- Pauses while a visitor hovers over, touches, or tabs into it, and picks up again a few seconds later.
- Shows a row of dots underneath, one per tile, with the current tile's dot filled in. Visitors can click a dot to jump to that tile.

On devices set to reduce motion, the row stays still and visitors swipe or scroll it themselves. If all the tiles fit, the row doesn't move and no dots appear.

### Selecting and Arranging Elements

Click an element to select it. A thin outline marks the selection, a small toolbar appears above it with **Duplicate**, **Move up**, **Move down**, and **Delete**, and the element's settings open in the panel on the right. The panel header shows a breadcrumb of where the element sits -- for example **Section > Row > Column > Image** -- and you can click any part of it to jump to that section, row, or column (the panel calls a selected column a **Layout container**). Press **Esc** to deselect.

While an element is selected, you can also drag the small handles on its edges to change its spacing directly on the page: the blue handles set the margin (space outside the element) and the orange handles set the padding (space inside). A tooltip shows the value as you drag.

To reorder, drag sections or elements using the handle icon (six dots) to move them. You can drag elements within a section or move them between sections; while you drag, **Scroll Up** and **Scroll Down** targets appear at the top and bottom of a long page so you can reach the rest of it. Deleting an element or a section asks you to confirm (**Delete element?** / **Delete section?**); either can be undone with **Undo** right afterwards.

### Keyboard Shortcuts

- **Ctrl+Z** / **Cmd+Z** -- Undo; **Ctrl+Shift+Z** (or **Ctrl+Y**) / **Cmd+Shift+Z** -- Redo
- **Delete** or **Backspace** -- delete the selected element (after confirming)
- **Ctrl+D** / **Cmd+D** -- duplicate the selected element
- **Alt+Up** / **Alt+Down** -- move the selected element up or down
- **Esc** -- deselect and close the settings panel

The shortcuts are ignored while you are typing in a text box, so they will not interfere with editing content.

## Styling Your Page

### Section Styles

Click a section (or its **Section settings** button) to open the **Edit Section** panel. You can set:

- **ID** -- an optional anchor name for the section, such as `staff`. Visitors can then jump straight to it with a link like `/about#staff`, and a navigation link can point at it the same way.
- **Current Colors** -- a sample shows the section's current background and text colors. On the **Suggested** tab, click one of the combinations built from your [palette](./appearance.md#color-palette); only pairings with enough contrast are offered, and a matching link color is chosen for you. On the **Custom** tab, set the **Background Type** -- **Color** (a color picker, a row of grays, your palette swatches, or a typed value in **Background**), **Image** (**Select photo** from your gallery), or **Youtube Video** (enter the **Youtube ID**) -- and pick the **Heading Color**, **Text Color**, and **Link Color** from your palette swatches. With an image background, click the picture to set its **Focal Point** (the part kept in view when the image is cropped), and use **Background Opacity** (0 to 1) and **Overlay Color** to tint the image so text stays readable.
- **Visibility** -- **Hide on desktop** or **Hide on mobile**.
- **Styles** -- per-section border, color, font, height, line height, margin, padding, and width overrides for **All**, **Desktop Only**, or **Mobile Only** (see [Styles for One Section or Element](#styles-for-one-section-or-element)).
- **Animations** -- an **On Show Animation** and **On Show Speed** for when the section scrolls into view (the same choices as for elements; see the [Animation group](./element-reference.md#animation-group)).
- **Shape Dividers** -- a **Top Divider** and **Bottom Divider**. Choose a **Shape** (**None**, **Wave**, **Waves**, **Slant**, **Curve**, **Triangle**, or **Peaks**), then its **Color**, **Height** in pixels (default 60), and **Flip Horizontally** to mirror it.

Click **Save** to apply your changes, or **Cancel** to discard them. The panel header also has **Duplicate** (makes a copy of the section below it) and **Convert To**, which copies the section into a new [reusable section block](./blocks.md) after you give the block a name. **Delete** removes the section and everything in it.

A section that is a placed [section block](./blocks.md) shows only a **Block** list for choosing which block to display; edit the block's content from **Website > Blocks**.

### Element Settings

Click any element to open its **Edit Element** panel. Most elements have three groups -- **Content** (the element's own fields), **Style** (spacing, size, border, color, and font overrides), and **Animation** -- plus **Hide on desktop** and **Hide on mobile** switches at the top. Click **Save** to keep your changes. Every element's **Content** fields are listed in the [Element Reference](./element-reference.md).

### Styles for One Section or Element

For finer control, open the **Styles** panel in a section's settings or the **Style** group in an element's settings and click **Add a style** under **All**, **Desktop Only**, or **Mobile Only**. Pick a **Property** (such as **Padding Top**, **Font Size**, **Background Color**, or **Text Shadow**), enter a value, and click **Update**; click an existing style to change or **Delete** it. Each style applies only to that section or element, so it will not affect the rest of the page. The full property list is in the [Element Reference](./element-reference.md#style-group).

:::tip
If you need to apply styles across your entire site -- such as a custom font or global color -- use the [Appearance](./appearance.md) settings instead of custom CSS on individual pages.
:::

## Previewing Your Page

Use the preview controls in the toolbar to check how your page looks at different screen sizes:

- **Desktop** -- Full-width browser view
- **Mobile** -- Narrow phone-sized view

On phones, the columns in a row stack one above the other at full width unless you set a **Mobile Width** for them in the row's settings. Sermon and podcast lists also stack each episode's text under its thumbnail on phones.

To see the live page exactly as visitors will, go back to the Pages list and click the page's path. It opens in a new browser tab.

## Checking Accessibility

Click the **Check accessibility** icon in the toolbar (it shows a count when issues are found) to open the **Accessibility** panel, which lists missing alt text, low color contrast, headings out of order, and links without text, grouped by section with a **Show in page** button for each. See [Accessibility Checker](./accessibility-checker.md) for each rule and how to fix it.

## Undoing Changes

The editor tracks your editing history automatically. Use the toolbar buttons or keyboard shortcuts to navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Revert your last action
- **Redo** (Ctrl+Shift+Z or Ctrl+Y / Cmd+Shift+Z) -- Re-apply an undone action

You can also jump to an earlier point. Open the **More** (⋮) menu in the toolbar and click **View history**. The **Edit History** dialog lists each change with its time, marking where you are now as **(current)**. Click an entry (or its **Restore to this point** button) to put the page back to how it was at that point.

:::info
Changes made after the point you restored stay in the history, so you can use **Redo** or pick a later entry to go forward again. Once you make a new edit, those later entries are replaced by it.
:::

## Saving and Publishing

Moving, duplicating, and deleting sections and elements, dragging spacing handles, and adding content are saved as soon as you do them; changes you make inside a settings panel are saved when you click its **Save** button. The status indicator in the toolbar shows **Saving…** while a save is in progress, **All changes saved** (with how long ago) when everything is stored, or **Couldn't save** if a save failed -- in that case check your connection and try the change again.

### Draft and published state

Pages can have a **published** state, which controls when visitors see your changes. The toolbar displays a status chip showing the current state:

- **Live on save** -- The page does not use a publish workflow. Every saved change goes live immediately. This is the default for new pages.
- **Unpublished changes** -- The page has been published before, but you have made changes since the last publish. Visitors still see the previously published version.
- **Published** -- The page is live and your saved content matches what visitors see.

To publish your changes, click the **Publish** button in the toolbar. The page becomes live immediately.

To revert to the last published version without affecting what visitors see, open the overflow menu (⋮) and click **Discard unpublished changes**.

To stop using the publish workflow, open the overflow menu and click **Turn off publishing**. Edits then go live immediately again.

:::tip
Use the draft/publish workflow when you want to prepare a page -- for example, for an upcoming event -- and only make it live at the right moment. Build and preview the page, then click Publish when you are ready.
:::

## Related Articles

- [Element Reference](./element-reference.md) -- Every element and each of its settings
- [Accessibility Checker](./accessibility-checker.md) -- What the editor checks and how to fix each issue
- [Reusable Blocks](./blocks.md) -- Build content once and place it on many pages
- [Managing Pages](./managing-pages.md) -- Create pages, set URLs, and manage site navigation
- [Appearance](./appearance.md) -- Set site-wide colors, fonts, and branding
- [Files](./files.md) -- Upload images and documents to use in the editor
- [Creating Forms](../forms/creating-forms.md) -- Build forms you can embed on pages
