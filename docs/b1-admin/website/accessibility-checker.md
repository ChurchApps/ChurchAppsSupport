---
title: "Accessibility Checker"
description: "Run the B1 Admin page editor's accessibility check to find missing alt text, low color contrast, heading order problems, and empty links before you publish."
---

# Accessibility Checker

<div class="article-intro">

The page editor includes a built-in accessibility check that looks over your page for the most common problems that keep visitors with screen readers or low vision from using it. It runs on the content in the editor, points you to the section that needs attention, and tells you what to change.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Open a page or block in the [page editor](./page-editor.md)
- You need the **Edit Content** (content.edit) permission

</div>

## Running the Check

1. In the editor toolbar, click the **Check accessibility** icon (the figure with outstretched arms, to the right of **Add Content**). When the page has issues, the icon carries an orange badge with the count and its tooltip reads *N accessibility issues to review*.
2. The **Accessibility** panel opens on the right with the subtitle **Fix these before publishing your page**. The top bar shows the totals as *N errors* and *N warnings*.
3. Issues are grouped under **Whole page** (problems that belong to the page as a whole, such as a missing H1) and then **Section 1**, **Section 2**, and so on in page order. Each issue shows a rule chip -- **Missing Alt Text**, **Low Contrast**, **Heading Order**, or **Empty Link Text** -- and a sentence explaining exactly what to fix.
4. Click the **Show in page** (crosshair) icon next to a section heading to scroll the editor to that section and highlight it.
5. Fix the issue in the section or element's settings and click **Save**. The panel re-checks the page as you work; when nothing is left it shows **No accessibility issues found** with the note *Images have alt text, colors meet contrast minimums, and headings are in order.*

Click the **X** in the panel header to close it. The badge on the toolbar icon keeps showing the current count while you edit.

## What Is Checked

### Missing Alt Text (error)

Alternative text is what a screen reader says in place of a picture. The checker flags:

- An **Image**, **Text with Photo**, or **Card** element that has a photo but an empty **Photo Label**. Message: *Image is missing alt text. Add a description so screen readers can convey it.*
- A **Gallery** photo without **Alt Text**. Message: *Gallery image 2 is missing alt text.* (with the photo's position in the gallery)

To fix it, open the element and describe the picture in a short phrase -- what it shows and why it is there. Testimonial photos are treated as decorative and are not checked.

### Low Contrast (warning)

Text needs enough contrast against its background to be readable. For each section whose **Background** is a specific color (a hex value such as `#336699`, not a palette swatch), the checker compares the section's **Text Color** and **Heading Color** against it. Anything below a 4.5:1 ratio is flagged, for example *Text #EEEEEE on background #FFFFFF has a 1.17:1 contrast ratio, below the 4.5:1 minimum.*

To fix it, open the section's **Colors**, pick a combination from the **Suggested** tab (those pairings are chosen for contrast), or choose a darker or lighter custom color. Sections that use palette swatches or an image background are not checked, so make sure those stay readable yourself -- a dark **Overlay Color** with a higher **Background Opacity** helps text sit on photos.

### Heading Order (warning)

Headings give screen-reader users an outline of the page. The checker reads the headings inside **Text**, **Text with Photo**, and **Card** text and **Expandable** descriptions, in page order, and reports:

- *This page has no H1 heading. Add one top-level heading as the page title.* (listed under **Whole page**)
- *This page has more than one H1 heading. Use a single H1 as the page title.*
- *Heading level jumps from H2 to H4. Increase heading levels one at a time.*

To fix it, open the text element and change the heading style in the rich text toolbar: one **Heading 1** for the page title, **Heading 2** for each main part, **Heading 3** underneath those, and so on. Pages with no headings at all are not flagged.

### Empty Link Text (warning)

A link that has nothing to read is announced only as "link". The checker flags:

- A link in rich text with no text, title, or image alt text inside it. Message: *A link has no readable text. Add text so its purpose is clear.*
- A **Button Link** that has a **URL** but no **Text**. Message: *This button links to /visit but has no text label.* (with the button's URL)
- A **Card** that has a **Link URL** but no **Title** and no text. Message: *This card links to /groups but has no title or text.* (with the card's URL)

To fix it, give the button or card a label that says where it goes ("Plan your visit" rather than "Click here"), or remove the stray link from the text.

:::info
The check covers your page content only. Your navigation bar, footer, and the elements that pull in church data (sermons, groups, calendars) are built to be accessible already. For blocks, open the block in the editor and run the check there.
:::

## Related Articles

- [Using the Page Editor](./page-editor.md) -- Where the check lives and how to edit sections and elements
- [Element Reference](./element-reference.md) -- Where each element's alt text, title, and link fields are
- [Appearance](./appearance.md) -- Choose a site-wide palette with readable combinations
