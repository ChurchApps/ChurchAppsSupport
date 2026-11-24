---
title: "Open Lesson Format Tools"
description: "Use the Lessons.church OLF and OLL builders to write, upload, preview, print, and download Open Lesson Format venue feeds and Open Lesson List catalogs."
---

# Open Lesson Format Tools

<div class="article-intro">

Lessons.church includes two browser tools for working with the Open Lesson Format without writing JSON by hand. The **Open Lesson Format Builder** edits a single venue feed (one lesson's sections and actions), and the **Open Lesson List Builder** edits a provider catalog of programs, studies, lessons, and venue links. Churches also reach the OLF builder when they click **Preview / Print** on a schedule or **Export to OLF** on a lesson.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Read the [Open Lesson Format](./open-lesson-format.md) specification so the field names are familiar
- Log in to Lessons.church; the tools live at `lessons.church/tools/olf` and `lessons.church/tools/oll`

</div>

## Open Lesson Format Builder

Open `https://lessons.church/tools/olf`. The page has three boxes.

### Venue Details

Enter the header fields of the feed: **Program Name**, **Study Name**, **Lesson Name**, **Lesson Image** (a URL), **Lesson Description** (markdown), and **Venue Name**.

### Sections

1. Click **+ Section**, enter a **Name**, and click **Save**.
2. On the section row, click **+ Action**. In the action form:
   - Choose the **Action Type**: **Say**, **Do**, **Play**, or **Note**.
   - Optionally enter a **Role (Optional)** such as "Leader". The feed records the role on the first action where it changes.
   - For Say, Do, and Note, write the content in the markdown editor. For Play, enter a **Display Name** and add files.
   - For Play actions, click **Add File** and fill in **Name**, **URL** (the direct file link), and under **Video Details** the optional **Thumbnail**, **Stream URL** (a Vimeo or YouTube link to play in the browser), **Loop Video**, and **Seconds** (the duration, hidden when looping). Save the file and repeat for a slideshow.
3. Click **Save** on the action. It appears under the section with its type, content preview, and file count.
4. Use the up and down arrows to reorder sections and actions. Click a section or action name to edit or delete it.

### OLF File

- **Upload** -- Load an existing `.json` feed from your computer into the builder.
- **Download** -- Save the current feed as `olf.json`.
- **Print Preview** -- Open the same print dialog churches use, with **Lessons.church**, **Color Coded**, and **Script** formats.
- **Play Media** -- Run every Play action's files through Presenter Mode to check that URLs work.

The JSON for the current feed is shown below the buttons and updates as you edit.

### Loading a feed by URL

Add `?feedUrl=` followed by an encoded feed URL to open a hosted feed directly, for example `https://lessons.church/tools/olf?feedUrl=https%3A%2F%2Fapi.lessons.church%2Fvenues%2Fpublic%2Ffeed%2FVENUE_ID`. This is what the **Export to OLF** item in a lesson's **Share** menu and the **Preview / Print** button on a schedule do. Editing the loaded feed does not change the source; download it to keep your changes.

## Open Lesson List Builder

Open `https://lessons.church/tools/oll` to build the catalog that an external provider publishes at its API URL.

1. Click **+ Program** and enter the **Id**, **Name**, **Image**, and **Description** (markdown). Ids must be unique within your catalog and stable over time, because churches' schedules store them.
2. On the program row, click **+ Study** and fill in the same four fields.
3. On the study row, click **+ Lesson**. Besides **Id**, **Name**, **Image**, and **Description**, a lesson has the **Parent take-home** fields: **Bottom line**, **Verse**, **Question**, and **Optional note** (markdown). Leave them empty if you have nothing for parents.
4. On the lesson row, click **+ Venue** and enter the venue's **Id**, **Name**, and **API Url**, the address that returns that venue's OLF feed.
5. Reorder any level with the arrows; click a name to edit or delete it.
6. Under **OLL File**, click **Download** to save `lessons.json`, or **Upload** to continue editing a saved catalog. `?feedUrl=` works here too.

Host the downloaded file at a public URL and give that URL to churches as the provider's **API URL** (see [Third-Party Providers](./third-party-providers.md)).

:::warning
Both tools work entirely in your browser. Nothing is saved to Lessons.church; reloading the page discards unsaved work, so download often.
:::

## Related Articles

- [Open Lesson Format](./open-lesson-format.md) -- Field-by-field specification
- [Third-Party Providers](./third-party-providers.md) -- How a church adds your catalog
- [Volunteer Guides](../presenting/volunteer-guides.md) -- The print formats in Print Preview
