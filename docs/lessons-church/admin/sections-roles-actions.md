---
title: "Building Venue Content"
description: "Add sections, roles, and Say, Do, Play, Download, Note, or Add-on actions to a Lessons.church venue, copy sections between venues, and attach media to Play actions."
---

# Building Venue Content

<div class="article-intro">

A venue is one age-group version of a lesson, and its content is a tree of sections, roles, and actions. This page is where you write the actual lesson: what the leader says, what the kids do, which video plays. It opens from the **Venues** tab of a lesson in **Program Management**.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Create the lesson](./managing-lessons.md) and add at least one venue to it
- Upload any videos, slides, or printables the lesson will use under the **Files** tab first, so they are available to pick when you add Play actions (see [Managing Files and Media](./managing-files.md))

</div>

## Opening the Venue Page

1. In **Admin**, select the program, click the study, and click the lesson to open its panel.
2. Click the **Venues** tab and click the venue name.
3. The page title shows the lesson and venue (for example, "Lesson 1: Elementary"). The **Lesson Structure** box lists sections, with their roles indented beneath and each role's actions beneath that.

Click any section, role, or action to open its edit form above the tree.

## How the Pieces Fit

- **Section** -- A block of class time such as "Welcome", "Worship", "Bible Story", or "Small Group". Sections appear as cards on the lesson page and as tabs in the B1 app.
- **Role** -- Who is acting within a section, such as "Leader", "Host", or "Small Group Leader". Roles group the actions beneath them and set their order. Role names are not printed on the public lesson page or in the B1 app; churches see them on the **Customize Lesson** page, where they can remove a whole role's actions at once. Make the first words of a Say or Do action clear about who acts when it matters.
- **Action** -- One instruction. Its **Action Type** controls how it is shown and whether it carries media.

Each level has an **Order** number. Lower numbers come first. New items get the next number automatically.

## Adding a Section

1. Click the **+** button in the page header and choose **Create New Section**.
2. Fill in the **Create Section** form:
   - **Order** -- Position among the venue's sections.
   - **Section Name** -- Required. Keep it short; it becomes a tab label on phones.
   - **Materials Needed** -- Optional. Shown as **Materials:** under the section name so volunteers can gather supplies.
3. Click **Save**. A **Create Role** form opens right away for the new section.

To edit a section later, click its name in the tree. The edit form has the same fields plus a delete (trash can) button.

## Copying a Section from Another Venue

If the preschool venue needs the same "Worship" block as the elementary venue, copy it instead of retyping it.

1. Click the **+** button in the header and choose **Copy Existing Section**.
2. In **Copy Section From**, choose the source **Venue** (another venue of this lesson) and the **Section** to copy.
3. Click **Copy Section**. The section, its roles, and its actions are duplicated into this venue.

## Adding a Role

1. Click the **Add Role** (+) icon on a section row, or save a new section.
2. Enter the **Order** and **Role Name** (for example, "Leader").
3. Click **Save**. A **Create Action** form opens for the new role.

Roles are per section. A lesson that has a "Leader" in every section has one Leader role in each.

## Adding Actions

1. Click the **Add Action** (+) icon on a role row.
2. Choose the **Action Type**:

   | Type | What volunteers see | Content |
   |---|---|---|
   | **Say** | A speech-bubble style script to read or paraphrase | Markdown text |
   | **Do** | An instruction or activity | Markdown text |
   | **Note** | Background or a reminder, not read aloud | Markdown text |
   | **Play** | A clickable media item that opens a video or slide, and a slide in Presenter Mode | A file picked from **Resource** |
   | **Download** | Nothing inside the section; the bundle that holds the file is offered in the venue's **Downloads** list | A file picked from **Resource** |
   | **Add-on** | Plays like a Play action | An item from the shared [Add-ons](./managing-add-ons.md) library |

3. For **Say**, **Do**, and **Note**, type the content in the markdown editor. Content is required.
4. For **Play** and **Download**, pick a **Resource**. The list is grouped under **Lesson**, **Study**, and **Program** and includes both uploaded resources and external (Vimeo) videos. If the resource has assets (individual slides), an **Asset** dropdown appears; choose one slide or leave it on **All** to play every asset in order. The action's display text is filled in from the resource name; you can change it.
5. For **Add-on**, choose the **Add-on**. Its name becomes the display text.
6. Click **Save**. Another **Create Action** form opens so you can keep adding to the same role; click **Cancel** when you are done.

:::tip
Lessons.church converts actions to lowercase types (`say`, `do`, `note`, `play`) in the public feed, and Add-on actions become `play`. Download actions do not appear in the section at all; they only feed the Downloads list.
:::

## Reordering and Deleting

- Change the **Order** field on any item and save to move it. Numbers do not have to be consecutive.
- Open an item and click the delete (trash can) button to remove it. Deleting a section removes its roles and actions.

## Publishing Changes

Public lesson pages are cached. After editing, click **Clear Cache** in the page header so the change shows on lessons.church right away. Saving an item also clears the cache for you.

## Related Articles

- [Managing Lessons](./managing-lessons.md) -- Lesson details and venues
- [Managing Files and Media](./managing-files.md) -- Upload the files that Play and Download actions use
- [Managing Add-ons](./managing-add-ons.md) -- Shared worship songs and games for Add-on actions
- [Viewing Lessons](../browsing/viewing-lessons.md) -- How the finished venue looks to a church
