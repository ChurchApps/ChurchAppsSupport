---
title: "Element Reference"
description: "Every element in the B1 Admin page editor with each of its settings: layout, text, media, church data, giving, forms, calendars, and advanced embeds."
---

# Element Reference

<div class="article-intro">

Elements are the building blocks you drop into a section in the [page editor](./page-editor.md). This page lists every element in the **Add Elements** panel and each setting in its **Content** group, so you know what each field does before you fill it in. The **Style** and **Animation** groups are the same for most elements and are described once at the end.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Content** (content.edit) permission to open the editor
- Read [Using the Page Editor](./page-editor.md) first for how to add, select, move, and style elements
- Upload the photos and documents you plan to use under [Files](./files.md); the **Select Photo** buttons below open the same gallery

</div>

## How Element Settings Work

Click an element to select it: a floating toolbar appears above it and its settings open in the panel on the right (double-clicking opens the settings too). The panel has:

- **Visibility:** switches at the top -- **Hide on desktop** and **Hide on mobile** -- which hide the element on that screen size only.
- **Content** -- the element's own fields, listed below for each element.
- **Style** -- per-element spacing, size, border, color, and font overrides (see [Style group](#style-group)).
- **Animation** -- an effect that plays when the element scrolls into view (see [Animation group](#animation-group)).

Click **Save** at the bottom of the panel to keep your changes, or **Cancel** to throw them away. **Delete** removes the element; the **Duplicate** link in the panel header makes a copy right after it. If you click a different element while the panel has unsaved changes, the editor asks **Discard changes?** -- choose **Keep editing** or **Discard**.

Fields marked "rich text" open a formatting toolbar for headings, bold and italic text, lists, links, and alignment. Everything you type there is saved as HTML.

:::info
The **Add Elements** panel sorts elements into tabs: **Common** (layout and content elements), **Media**, **Church** (elements that pull data from the rest of B1), and **Advanced**. **All** shows everything, and a **Blocks** tab appears once you have at least one [reusable block](./blocks.md). The headings below follow those tabs.
:::

## Common: Layout Elements

### Row

Splits a section into side-by-side columns. Drop other elements into each column.

- **Common Options** -- **Halves** (two equal columns), **Thirds**, **Quarters**, or **Custom**.
- **Custom** -- a table with one row per column. Each column's **Width** is in twelfths of the page (**1 - 1/12th** through **12 - Full**). Click **Add Column** or **Remove** to change the number of columns. The widths must add up to 12; the table shows **Total: 12/12** in green when they do and the row cannot be saved until they do.
- **Preview** -- a colored bar showing the resulting column widths.
- **Show Mobile Sizes** -- opens the **Customize Mobile Layout** table, with a **Mobile Width** for each column (**12 - whole** by default, so columns stack on phones). Mobile widths do not need to add up to 12; for example two columns set to 6 sit side by side on a phone.
- **Show Mobile Order** -- opens the **Customize Mobile Order** table, where you give each column its **Mobile Order** position so, for example, a photo column shows above its text on phones even though it is on the right on desktop.

Changing the number of columns adds or removes columns on the page; the contents of a removed column are deleted.

### Box

A styled container that groups other elements. Drop elements into the box.

- **Rounded Corners** -- rounds the box's corners.
- **Translucent** -- makes the box background partly transparent so the section behind shows through.
- In the **Style** group, a box also has the same **Current Colors** picker as a section: a **Suggested** tab of palette pairings, and a **Custom** tab with **Background Type** (**Color**, **Image**, or **Youtube Video**), **Heading Color**, **Text Color**, and **Link Color**. With an image background you can also click the picture to set its **Focal Point**, and set a **Background Opacity** and **Overlay Color**. See [Section Styles](./page-editor.md#section-styles) for what each of these does.

### Carousel

Rotates through a set of full-width slides. Each slide is a container: use the dots under the carousel in the editor to switch to a slide, then drop elements into it.

- **Height (px)** -- the carousel height (default 250).
- **Slides** -- how many slides to have. Raising the number adds empty slides; lowering it deletes the last slides and their contents.
- **Animation** -- **Fade** or **Slide** between slides.
- **Autoplay** -- advance automatically. When it is on, set the **Slide Interval (seconds)** (default 4).

### White Space

An empty spacer.

- **Height (px)** -- how tall the gap is (default 25).

## Common: Content Elements

### Text

A block of formatted text.

- **Text Alignment** -- **Left**, **Center**, or **Right**.
- The rich text editor for the content itself. Use the heading styles here for your page headings; the [accessibility checker](./accessibility-checker.md) looks at these headings when it checks heading order.

### Text with Photo

Text beside (or above or below) an image.

- **Select Photo** -- choose a picture from your gallery or upload one.
- **Photo Label** -- the image's alternative text, read by screen readers and shown if the picture cannot load. Required by the accessibility checker whenever a photo is set.
- **Photo Position** -- **Left**, **Right**, **Top**, or **Bottom** of the text.
- **Text Alignment** -- **Left**, **Center**, or **Right**.
- The rich text editor for the text.

### Card

A titled card with an image, text, and an optional link.

- **Select Photo** and **Photo Label** -- the card's picture and its alternative text.
- **Link URL (optional)** -- where the photo and title link to. The accessibility checker warns if a card has a link but no title or text.
- **Title Alignment** -- alignment of the title (defaults to center).
- **Title** -- the card heading.
- **Text Alignment** and the rich text editor for the card body.

### Expandable

A question that expands to show its answer, for FAQ-style content. Add one Expandable per question.

- **Heading Type** -- **Heading** shows the title as a small heading with an arrow; **Link** shows it as a centered link.
- **Title** -- the question or label visitors click.
- The rich text editor for the answer.
- **Icon Color** -- the color of the expand arrow.

### Icon Feature

An icon with a short headline and description, for highlighting ministries or features.

- **Choose Icon** -- opens the icon picker.
- **Title** -- the headline.
- The rich text editor for the description.
- **Icon Color**.
- **Icon Size** -- **Small**, **Medium**, or **Large**.
- **Text Alignment**.

### Testimonial

One or more quotes with attribution.

- **Display Mode** -- **Show All** lists every quote; **Rotate** shows one at a time and fades to the next every few seconds (it stays still for visitors who have asked their device to reduce motion).
- **Quotes** -- click **Add Quote** for each one and fill in **Select Photo** (optional), **Quote**, **Author**, and **Role** (for example "Member since 2015"). Use the trash icon to remove a quote.

### Social Icons

Linked icons for your church's social profiles. Only the networks you fill in are shown.

- **Facebook**, **Instagram**, **WhatsApp**, **YouTube**, **X**, **TikTok**, **Vimeo**, **Podcast** -- a link for each. For **WhatsApp**, use a `https://wa.me/` link with your number or a group invite link.
- **Icon Style** -- **Filled** (colored circle with a white icon) or **Outlined** (bordered circle).
- **Size** -- **Small**, **Medium**, or **Large**.
- **Alignment** -- **Left**, **Center**, or **Right**.
- **Color** -- the circle (filled) or icon and border (outlined) color.

### Countdown

A timer counting down to a date or to your next weekly service.

- **Mode** -- **Weekly Service** counts down to the next occurrence of a **Day of Week** and **Time** (default Sunday 10:00) in the visitor's local time, then starts over for the following week about an hour after the service begins. **Specific Date** counts down to a **Target Date** and time.
- **Title** -- an optional heading above the timer.
- **Completed Text** -- shown when the time arrives (default "Starting now!").
- **Show Days** and **Show Hours** -- untick to hide those tiles and count only in the smaller units.

### Stats

A row of large numbers with labels.

- **Columns** -- 2, 3, or 4 per row.
- **Stats** -- click **Add Stat** for each number and fill in **Prefix** (for example `$`), **Value**, **Suffix** (for example `+` or `%`), and **Label** (for example "Members").

### Table

Rows and columns of simple data.

- **Rows** and **Columns** -- the grid size. Type a number and press Enter or click away to resize; new cells start empty and removed cells are deleted.
- **First Row is Header** -- **Yes** styles the first row as column headings.
- **Text formatting** -- **Yes** lets you format cells (bold, links, lists). Click a cell to open its editor and **Done** to close it. **No** gives plain text boxes.
- **Size** -- **Medium** or **Small** row height.
- The grid of cells below the settings is where you type the contents.

### Button Link

A call-to-action button.

- **Text** -- the button label. The accessibility checker warns if the button has a URL but no text.
- **URL** -- where it goes (a page path like `/visit` or a full address).
- **Variant** -- **Contained** (solid) or **Outlined**.
- **Color** -- **Primary**, **Secondary**, **Error**, **Warning**, **Info**, or **Success**, taken from your [palette's semantic colors](./appearance.md#color-palette).
- **Open in new tab**.
- **Full Width** -- stretch the button across its column.

## Media

### Image

A single picture, optionally linked.

- **Select Photo** -- choose from your gallery or upload.
- **Photo Label** -- the alternative text. Required by the accessibility checker.
- **Link URL (optional)** -- make the picture a link.
- **Open link in new tab**.
- **Do not resize image** -- show the picture at its natural size instead of scaling it to fit the column.
- **Enable Lightbox** -- clicking the picture opens it full-screen. This is turned off automatically while a **Link URL** is set.
- **Image Alignment** -- **Left**, **Center**, or **Right**.

### Video

An embedded video player.

- **Type** -- **YouTube** or **Vimeo**.
- **ID** -- the video's ID only, not the whole address. For YouTube it is the part after `watch?v=` (for example `dQw4w9WgXcQ`); for Vimeo it is the number after `vimeo.com/`.

### Gallery

A grid of photos.

- **Layout** -- **Grid** (photos keep their shape), **Masonry** (a staggered column layout), **Square** (every photo cropped square), or **Wide** (every photo cropped to a wide rectangle).
- **Columns** -- 2, 3, or 4.
- **Spacing** -- **Small**, **Medium**, or **Large** gaps.
- **Photos** -- click **Add Photo**, then **Select Image** (or paste an **Image URL**), and fill in **Alt Text** and an optional **Caption**. The accessibility checker flags gallery photos without alt text. Use the trash icon to remove a photo.

### Location

A map centered on an address.

- **Address** -- the place to geocode and center on (for example `City Hall, New York, NY`).
- **Label** -- a marker label such as your church name; the marker only shows when this is set.
- **Zoom Level** -- a slider from 8 (city) to 20 (building); the slider starts at 15.

## Church

### Logo

Your church logo from [Appearance](./appearance.md#logo-and-branding). There is nothing to upload here.

- **Link URL (optional)** -- where the logo links to, such as `/`.

### Sermons

Your sermon library.

- **Layout** -- **Browse (playlists)** is the full interactive browser (playlist, then sermon, then video). **Grid** and **List** show a flat set of sermons, and **Featured Latest** shows one large card for your newest sermon.
- For **Grid**, **List**, and **Featured Latest**: **Playlist** limits the sermons to one [playlist](../sermons/playlists.md) (**All Playlists** by default); **Number of Sermons** (grid and list only, default 6); **Show Titles** and **Show Dates**.

### Podcast

Episodes from a podcast feed, each with an audio player and a **Download** link.

- **Podcast RSS Feed URL** -- the feed address from Apple Podcasts, Spotify for Creators, Buzzsprout, or similar. Nothing shows until this is set.
- **Episodes to show** -- default 10.
- **Show Dates** and **Show Descriptions**.

This element is for featuring any podcast on your site. To publish your own sermons as a podcast, see [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed).

### Stream

Your [live stream](../sermons/live-streaming.md) player.

- **Mode** -- **Video Only**, or **Video and Interaction** to include chat beside the video.
- **Offline Content** -- what to show when you are not live: **Next Service Time** (a countdown to the next service), **Hide** (nothing), or **Block** (a [reusable block](./blocks.md) you choose from the **Block** list that appears).

### Donation

A full giving form on the page. Requires [online giving](../donations/online-giving-setup.md) to be set up.

- **Gift Options** -- **Allow single (one-time) gifts** and **Allow recurring gifts**. Untick one to offer only the other.
- **Fund Options** -- **Show fund selector to donors**; **Limit to specific funds** (pick the [funds](../donations/funds.md) donors may choose from; leave empty to allow all); **Default fund** (preselected when the page loads). Hide the fund selector and set a default fund to send every gift from this page to one fund.

### Donate Link

Buttons that open your giving page with an amount and fund already chosen.

- **Url** -- the page that holds your **Donation** element, usually `/donate`.
- **Text** -- the heading above the buttons (default "DONATE NOW").
- **Funds** -- the fund each button gives to.
- **Donation Amounts** -- type an **Amount** and click **Add** for each suggested amount, up to five. Click the x on a chip to remove it.

### Form

Embeds one of your [forms](../forms/creating-forms.md).

- **Select** -- the form to show. Only standalone forms appear (forms attached to people or groups are left out). If you have none yet, the panel links to **Create a new form**. If the form has a [header photo](../forms/creating-forms.md#adding-a-header-photo), it shows above the questions.

### Calendar

Events from a group calendar or a curated calendar. See [Using the Calendar element](./page-editor.md#using-the-calendar-element) for the full walkthrough.

- **Select** -- **Group Calendar** or **Curated Calendar**, then **Select Calendar**.
- **Display** -- **Month calendar** or **Upcoming events**.
- For **Upcoming events**: **Layout** (**Grid** or **Scrolling (automatic)**), **Number of Events** (default 12), and, for a curated calendar, **Group badge** (**Hidden** or **Show the group on each event**).
- **Only events tagged** -- show only events carrying this tag; leave empty to show every event.

### Group List

Tiles for your public groups.

- **Label** -- show only groups with this label (for example `Small Groups`); leave empty for all public groups.
- **Layout** -- **Grid** or **Scrolling (automatic)** (see [Scrolling layouts](./page-editor.md#scrolling-layouts)).

### Groups Browser

A searchable, filterable directory of your groups.

- **Heading (optional)** -- shown above the filter row, for example "Find a Group".
- **Pre-filter category (optional)** -- restrict the directory to one category; this also hides the category dropdown.
- **Pre-filter label (optional)** -- restrict it to groups with one label (**Any label** by default).
- **Show search box** and **Show category dropdown** -- **Yes** or **No**.
- **Layout** -- **Grid** or **Scrolling (automatic)**.

### Campaign Progress

A live progress bar for a giving goal.

- **Fund** -- the fund whose gifts count toward the goal.
- **Goal Amount** -- the target. The percentage only shows when a goal is set.
- **Title** -- optional heading.
- **Start Date** and **End Date** -- only count gifts inside this window; leave empty to count everything.
- **Show Amounts** -- untick to show only the percentage, without the raised and goal amounts.
- **Donate URL** -- adds a **Give** button under the bar that opens this address.

### Staff Grid

Photo cards for the members of a group.

- **Group** -- the group to show. Its **Show roster on website** setting must be **Yes** (see [Configuring Group Settings](../groups/creating-groups.md#configuring-group-settings)); otherwise nothing is shown.
- **Columns** -- 2, 3, or 4.
- **Show Roles** -- show each leader's role chip.

### Service Times

Your campuses' service schedule, from your attendance setup.

- **Title** -- the heading (default "Service Times").
- **Show Campus** -- untick to hide campus names, for example for a single-campus church.

## Advanced

### HTML

Your own markup, for third-party widgets and embeds.

- **HTML Content** -- the markup to render. Any `<script>` tags here run on the live site.
- **JavaScript (exclude script tag)** -- script code that runs when the page loads. See [Using the HTML element](./page-editor.md#using-the-html-element) for the warning that appears if you paste a bare web address here.

### Embedded Page

Another web page shown in a frame.

- **Source** -- the page's full address.
- **Height (px)** -- the frame height (default 1000).

## Blocks

A **Block** element is a [reusable block](./blocks.md) placed on a page. Its only setting is **Block**, the block to show. Edit the block itself from **Website > Blocks** to change what appears everywhere it is used.

## Style Group {#style-group}

The **Style** group lets you override the look of one element without touching the rest of the site. Styles are listed under three platforms -- **All**, **Desktop Only**, and **Mobile Only** -- and you click **Add a style** under the platform you want. Each style is one **Property** and a value; click an existing style to change it, and use **Delete** in the style form to remove it.

The properties offered depend on the element. The full list is:

| Property | Value |
|---|---|
| **Border Color**, **Background Color**, **Color** | A color from the picker |
| **Border Radius**, **Border Width** | Pixels |
| **Border Style** | none, solid, dotted, dashed, double, groove, ridge, inset, outset |
| **Font Family** | A font name, such as `Roboto` |
| **Font Size**, **Line Height** | Pixels |
| **Font Style** | normal or italic |
| **Height**, **Width**, **Min Width**, **Min Height**, **Max Width**, **Max Height** | Pixels |
| **Margin**, **Margin Top**, **Margin Right**, **Margin Bottom**, **Margin Left** | Pixels of space outside the element |
| **Padding**, **Padding Top**, **Padding Right**, **Padding Bottom**, **Padding Left** | Pixels of space inside the element |
| **Text Shadow** | **Offset X - px**, **Offset Y - px**, **Blur Radius - px**, and a color (set the blur to 0 to remove the shadow) |

Text-type elements (Text, Icon Feature, Social Icons) offer only font, color, spacing, and text shadow; layout and media elements offer size and border options too. **Donate Link** offers border styles only.

:::tip
You can also drag an element's margins and paddings directly on the page. Select the element and drag the blue (margin) or orange (padding) handles on its edges; the value snaps to the spacing steps (xs, sm, md, lg, xl, xxl) and a tooltip shows the step and its pixels. For site-wide changes, use [Appearance](./appearance.md) rather than styling elements one by one.
:::

## Animation Group {#animation-group}

- **On Show Animation** -- **None**, **Slide Left**, **Slide Right**, **Slide Up**, **Slide Down**, **Fade In**, **Grow**, **Shrink**, **Pulse**, **Colorize**, or **Focus**. The effect plays when the element scrolls into view.
- **On Show Speed** -- **Slow**, **Normal**, or **Fast**.

Click **Update** in the animation form to apply it, then **Save** the element.

## Related Articles

- [Using the Page Editor](./page-editor.md) -- Add, move, and style sections and elements
- [Reusable Blocks](./blocks.md) -- Build content once and place it on many pages
- [Accessibility Checker](./accessibility-checker.md) -- What the editor checks before you publish
- [Files](./files.md) -- Upload the photos and documents your elements use
