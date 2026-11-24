---
title: "Managing Files and Media"
description: "Upload videos, slides, and printables to a Lessons.church program, study, or lesson using bundles, resources, variants, assets, and external Vimeo videos."
---

# Managing Files and Media

<div class="article-intro">

Every video, slide deck, and printable a lesson uses lives in the **Files** tab of a program, study, or lesson. Files are organized into bundles (the zip a church downloads), resources (one logical item such as "Lesson 1 Video"), and the variants and assets that hold the actual files. This guide explains the structure and how to upload at each level.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Have admin permissions for Lessons.church (see the [Administration overview](./index.md))
- Have the files ready: MP4 or WebM for video, JPEG or PNG for slides, PDF for printables

</div>

## Opening the Files Tab

1. In **Admin**, select a program in the left column. To work at the study or lesson level, click the study card or the lesson row.
2. In the right panel, click the **Files** tab. The heading reads the item's name followed by **Files** (for example, "Lesson 1 Files").

Files attached at the program level are available to every lesson in the program; study-level files to every lesson in the study. Attach a file at the lowest level that makes sense.

## How Files Are Organized

- **Bundle** -- A named group of resources, for example "Lesson 1 Media" or "Printables". Lessons.church builds one zip file per bundle, and that zip is what appears in the venue's **Downloads** list on the lesson page.
- **Resource** -- One item within a bundle, such as "Countdown Video" or "Memory Verse Slides". Play and Download actions point at resources.
- **Variant** -- A downloadable version of a resource, such as the full-resolution MP4 or the PDF. Variants are offered for download and used by the player when there are no assets.
- **Asset** -- A single slide or clip used only by the player. A resource with several image assets plays as a slideshow in [Presenter Mode](../presenting/presenter-mode.md); a Play action can target one asset or **All** of them.
- **External Video** -- A Vimeo video referenced by ID instead of uploaded. Lessons.church streams it and keeps download links fresh.

## Adding a Bundle

1. Click the **+** icon in the Files header (**Add Bundle or External Video**) and choose **Add Bundle**.
2. Enter a **Bundle Name** and click **Save**.

The bundle appears under **Bundles** with a status line: **No zip yet** until it has files, **Rebuild queued** while the zip is being generated, and **Zip ready** with when it was built, its size, and a **Download** link once done.

## Adding a Resource

1. Expand a bundle and click its **Add Resource** (+) icon.
2. Choose the **Bundle** (you can move a resource to another bundle at this level or above), enter a **Resource Name**, and set **Looping Video** to **Yes** only for background loops that should repeat until the leader moves on.
3. Click **Save**. The resource appears inside the bundle.

## Adding Variants and Assets

Expand a resource and click its **Add Variant or Asset** (+) icon. The menu offers:

- **Add Variant (for download/player)** -- Opens **Edit Variant**. Enter a **Variant Name** (for example, "PDF" or "1080p"), set **Hidden** to **Yes** if the file should be used by the player but not listed for download, click **Choose File**, pick the file, and click **Save**. The upload progress bar runs, then the variant is saved.
- **Add Asset (for player only)** -- Opens **Edit Asset**. Enter the **Order** and **Asset Name**, choose the file, and save. The form reopens so you can add the next slide; click **Cancel** when finished.
- **Bulk Add Asset** -- Opens **Bulk Add Assets**. Click **Choose Files**, select many images at once, and click **Save**. Each file becomes an asset named after its filename, numbered after any existing assets.

Click a variant or asset name to rename it, replace its file, or delete it.

:::tip
For a slide deck, export the slides as numbered JPEGs and use **Bulk Add Asset**. Lessons.church sorts them by the order you selected, so name them 01, 02, 03 before uploading.
:::

## Adding an External Video

1. Click the **+** icon in the Files header and choose **Add External Video (Beta)**.
2. Enter a **Video Name**, leave **Provider** on **Vimeo**, paste the Vimeo **Video Id** (the number in the video's URL), and set **Looping Video** if it should repeat.
3. Click **Save**. The video appears under **External Videos** and can be chosen as a **Resource** for Play actions, where it streams from Vimeo.

## Rebuilding a Zip

The zip for a bundle is rebuilt in the background when its files change. If a church reports a stale download, click the bundle's **Rebuild Zip** (refresh) icon. A message confirms the rebuild was queued; it usually finishes within a few minutes.

## Deleting

Open a bundle, resource, variant, or asset and use its delete button. Deleting a bundle or resource removes everything inside it, so the confirmation warns you before it proceeds.

## Related Articles

- [Building Venue Content](./sections-roles-actions.md) -- Point Play and Download actions at these resources
- [Downloads and Materials](../presenting/downloads.md) -- How churches see the bundles you publish
- [Managing Add-ons](./managing-add-ons.md) -- Media shared across every program
