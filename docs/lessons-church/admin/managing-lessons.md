---
title: "Managing Lessons"
description: "Create a lesson in Lessons.church admin with its name, title, slug, description, parent take-home copy, and trailer, then add the venues that hold its content."
---

# Managing Lessons

<div class="article-intro">

Lessons are the individual teaching sessions within a study. Each lesson represents what happens during a single class meeting. This guide covers the lesson's details and venues; the sections, roles, and actions inside a venue are covered in [Building Venue Content](./sections-roles-actions.md).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Create a program](./managing-programs.md) and [add a study](./managing-studies.md) to it
- Have admin permissions for Lessons.church (see the [Administration overview](./index.md))

</div>

## Creating a Lesson

1. Open **Admin**, click the program, and click the study card to expand its lessons.
2. Click **Add lesson to this study**.
3. Fill in the **Add Lesson** form:
   - **Lesson Image** -- Click the box to upload and crop a 16:9 thumbnail.
   - **Live** -- **No** hides the lesson from the public site; **Yes** publishes it.
   - **Order** -- Position within the study.
   - **Lesson Name** -- Required. The short label, usually "Lesson 1", "Lesson 2", and so on.
   - **Title** -- The descriptive title, such as "Jesus Feeds 5,000". Lesson cards show both.
   - **URL Slug** -- Type a slug and click **Check** before saving. The full lesson address is shown once checked.
   - **Description** -- Catalog copy for teachers browsing lessons.church. Shown on the lesson card and under the title on the lesson page.
   - **Parent take-home** -- See below.
   - **Video Embed URL** -- Optional trailer embed address.
4. Click **Save**. The lesson appears in the study's list; click it again to add venues.

## Parent Take-Home

Each lesson has an optional **Parent take-home** group of fields under Description. These are what parents see on their B1 group after class and on the classroom's public page. They are not a second lesson description.

| Field | Purpose |
|---|---|
| **Bottom line** | One sentence. "God keeps His promises." |
| **Verse** | Memory verse reference and short text. |
| **Question** | One car-ride question parents can ask without a PDF. |
| **Optional note** | Extra (prayer prompt, family activity). Markdown. Hidden when empty. |

Bottom line and one question matter more than an overview. Leave all four empty if you have nothing for parents that week; nothing is shown.

Do not put parent copy in **Description**. Description is catalog copy for teachers.

## Editing or Deleting a Lesson

Click the lesson row to open **Edit Lesson**, change any field, and click **Save**. To remove a lesson, click the **Delete lesson** (trash can) button and confirm.

## Understanding the Lesson Structure

Each lesson is organized into several layers:

- **Venues** -- Different versions of the lesson for different age groups or settings. For example, you might have a "Preschool" venue and an "Elementary" venue for the same lesson. Churches pick a venue when they schedule.
- **Sections** -- The segments within a venue, such as "Welcome", "Video", "Bible Story", and "Activity". Sections control the flow of the class time.
- **Roles and Actions** -- Within each section, you assign roles (for example, "Leader" or "Small Group Leader") and give each role specific actions.

## Adding a Venue

1. Open the lesson and click the **Venues** tab in its panel. (The tab is available once the lesson has been saved.)
2. Click **Add Venue**.
3. Enter the **Order** and a **Venue Name** (e.g., "Preschool" or "Elementary"), then click **Save**.
4. The venue appears in the **Venues** list. Click the **Edit Venue** (pencil) icon to rename, reorder, or delete it, or click the venue name to open its structure page and start adding sections. See [Building Venue Content](./sections-roles-actions.md).

## Lesson-Level Files

Click the **Files** tab to attach the week's media and printables -- the teaching video, slides, an activity sheet, or a coloring page. Files attached here are offered to this lesson's Play and Download actions under the **Lesson** group. See [Managing Files and Media](./managing-files.md).

:::tip
Build your lesson from the volunteer's perspective. Step through the sections and actions in order and ask yourself whether a first-time volunteer could follow along without any other preparation.
:::

## Related Articles

- [Building Venue Content](./sections-roles-actions.md) -- Fill a venue with sections, roles, and actions
- [Managing Files and Media](./managing-files.md) -- Upload the lesson's videos and printables
- [Managing Studies](./managing-studies.md) -- Organize lessons into study groups
- [Statistics](./statistics.md) -- Track how your lessons are being used
