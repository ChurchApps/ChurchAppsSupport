---
title: "Managing Programs"
description: "Create and edit curriculum programs in Lessons.church admin: image, live status, slug, descriptions, about section, trailer, categories, files, stats, and cache."
---

# Managing Programs

<div class="article-intro">

Programs are the top-level containers for curriculum in Lessons.church. A program represents an entire curriculum series -- for example, "Ark Kids" or "Youth Foundations." This guide covers creating, editing, and organizing programs in the admin area.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Have admin permissions for Lessons.church (see the [Administration overview](./index.md))
- Prepare a program name, descriptions, and a 16:9 thumbnail image

</div>

## Creating a Program

1. Open **Admin**. The **Program Management** page opens on **Programs**.
2. Click **Add Program** in the page header (or the **+** icon at the top of the **Programs** column).
3. Fill in the **Add Program** form in the right panel:
   - **Program Image** -- Click the image box, click **Upload**, choose a picture, adjust the 16:9 crop, and click **Update**. The cropped image is saved at 1280x720 when you save the program.
   - **Live** -- **No** keeps the program hidden from the public site while you build it; switch to **Yes** to publish.
   - **Program Name** -- Required. The display name (e.g., "Ark Kids").
   - **URL Slug** -- A URL-friendly identifier (e.g., "ark-kids"). The **Program URL** preview below shows the resulting address.
   - **One-Line Description** -- The short summary shown in listings and on the home page band.
   - **Description** -- The full description shown above the studies on the program page. Markdown is supported.
   - **About Section** -- Information about the provider. It appears under **About** in the sidebar of every lesson in the program.
   - **Video Embed URL** -- An embed address such as `https://www.youtube.com/embed/...` or `https://player.vimeo.com/video/...`. When set, the program page shows a **Watch Trailer** button.
4. Click **Save**.

Your new program appears in the **Programs** column and, once it is live and has live studies and lessons, on the public site.

## Editing a Program

1. Click the program in the **Programs** column. Its **Edit Program** form opens in the panel.
2. Update any of the fields and click **Save**, or **Cancel** to discard changes.
3. To remove the program, click the **Delete program** (trash can) button and confirm. A program that still has studies or files cannot be removed; delete those first.

## Organizing Studies Within a Program

With a program selected, the middle column lists its studies as cards with their lesson counts. Click **Add Study** to create one, or click a card to expand its lessons and edit it. See [Managing Studies](./managing-studies.md) for details.

## Study Categories

If your program has many studies, group them into **categories** that appear as tabs on the public program page. Click **Edit Categories** in the **Edit Program** header to open the categories page. See [Study Categories](./study-categories.md).

## Program-Level Files

Click the **Files** tab in the program's panel to attach bundles, resources, and external videos that apply to the whole program -- a scope-and-sequence document, a volunteer handbook, or a countdown video every lesson plays. Any venue in the program can use them. See [Managing Files and Media](./managing-files.md).

## Statistics

Click the **View Stats** icon beside **Add Study** to open the program's download statistics. See [Statistics](./statistics.md).

## Clearing the Cache

Public pages are cached for up to an hour. Saving a program clears the cache automatically; if a change still is not showing, click **Clear Cache** in the page header. A message confirms **Cache cleared**.

:::tip
Choose a descriptive program name and write a clear one-line description. This is the first thing churches see when browsing the curriculum library, so a good summary helps them decide if the program is right for their needs.
:::

## Related Articles

- [Study Categories](./study-categories.md) -- Group studies into tabs
- [Managing Studies](./managing-studies.md) -- Add studies to the program
- [Managing Files and Media](./managing-files.md) -- Program-level files
