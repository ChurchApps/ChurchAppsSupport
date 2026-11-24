---
title: "Ministries, Teams, and Plan Types"
description: "Set up the Serving area in B1 Admin: create ministries, add serving teams and leaders, create and edit plan types, and link content providers before you build your first plan."
---

# Ministries, Teams, and Plan Types

<div class="article-intro">

Everything in Serving hangs off three building blocks. A **ministry** is a department such as Worship or Kids; it owns its plan types, teams, and content providers. A **serving team** is a group of volunteers inside a ministry that positions can be filled from. A **plan type** is a recurring kind of service inside a ministry, such as "Sunday 9 AM" or "Elementary", and holds the plans themselves. Set these up once and every week's plan builds on them.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Add your volunteers to the [people directory](../people/adding-people.md)
- To create ministries and teams you need the **Edit Groups** permission (see [Roles & Permissions](../settings/roles-permissions.md)); ministries and teams are groups behind the scenes
- To create plan types you need either the **Plans Edit** permission or membership in the ministry

</div>

## The Serving Page

Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin), expand **Serving**, and click **Plans**. The page is organized by ministry:

- Your ministries appear as tabs across the top. Click a tab to work in that ministry; its name becomes the page title.
- If you are an admin, the **Mine** / **All** switch decides which tabs you see. **Mine** shows the ministries you belong to plus any ministry with no members yet; **All** shows every ministry. If you choose a ministry you are not a member of and switch back to **Mine**, the page tells you *"Your ministries are hidden because you're not a member. Choose "All" above to see them."*
- When your church has more than six ministries, a **Find a ministry** box appears so you can filter the tabs by name.
- The selected ministry shows three cards: **Plan Types** and **Serving Teams** side by side, and **Content Providers** underneath.

Staff who are not admins see only the ministries they belong to. They can still create plan types and plans and manage the serving team for those ministries without the Plans Edit permission.

## Creating a Ministry

1. On the Serving page, click **Add Ministry** at the top right. The **New Ministry** form opens below the tabs.
2. Enter a **Name** (for example, "Worship" or "Children's Ministry").
3. Click **Add**.

You are added as a member of the new ministry automatically, so it appears under **Mine** right away. The **Add Ministry** button is only shown to people with the **Edit Groups** permission.

### Editing a Ministry and Its Leaders

Click **Edit Ministry** at the top of the Serving page to open the ministry's group page. A ministry is a group with the *ministry* tag, so you manage it like any other group:

- Add or remove the staff and volunteers who belong to it under **Members** (see [Group Members](../groups/group-members.md)). Members of a ministry can manage its plans in B1 Admin.
- Click the star (**Make Leader**) next to a member to mark them as a leader. Ministry leaders are who B1 notifies when a volunteer accepts or declines an assignment, when a scheduled lesson could not be trimmed as expected, and when [leader gap alerts](./plans.md#leader-gap-alerts) go out. A [Serving Assignment Confirmation](./workflows.md#serving-assignment-confirmations) call step with no default assignee also falls back to the ministry's leader.
- Use the group's **Edit** button to rename the ministry or delete it.

## Creating Serving Teams

Serving teams are the pools of volunteers that positions draw from. A team belongs to one ministry.

1. Select the ministry's tab on the Serving page.
2. In the **Serving Teams** card, click **Create Serving Team** (or **New Serving Team** once the ministry has at least one team). The **New Team** form opens.
3. Enter a **Name** (for example, "Vocals", "Sound & Media", or "Greeters") and click **Add**.

The card lists each team with its number of **Members**. Click a team's name to open it. A team's page shows two things:

- **Members** -- search for people and add them, remove them, or mark them as leaders with the star (**Make Leader**). See [Group Members](../groups/group-members.md).
- **Block-out dates** -- the dates members have said they can't serve, with **Add block-out** for staff to record a date on a volunteer's behalf. See [Block-Out Dates](./plans.md#block-out-dates).

When you add a position to a plan, you pick one of these teams as its **Volunteer Group**. Only that team's members are offered in the **Assign Position** dialog and used by **Auto Assign**, so keep the teams small and specific (one for vocalists, one for sound, and so on) rather than one big "Worship" team.

:::tip
A team can be used by positions in any plan type of its ministry, so you only need one "Sound & Media" team even if you run a 9 AM and an 11 AM plan type.
:::

## Creating a Plan Type

A plan type groups the plans of one recurring service. Reminders, leader alerts, templates, associated groups, the signage feed, and the lesson trim are all set per plan type.

1. Select the ministry's tab on the Serving page.
2. In the **Plan Types** card, click **Create Plan Type** (or **Add Plan Type** once one exists). The **Add Plan Type** dialog opens.
3. Enter the **Plan Type Name** -- the name of the service, such as "Sunday Morning", "Wednesday Youth", or "Elementary".
4. Click **Save**.

The plan type now appears in the card with two links: **Overview** opens the [Plans Overview](./plans-overview.md) grid for it, and **Edit** reopens the dialog. Click the plan type's name to open its page.

### The Plan Type Page

The plan type page lists its plans and is where most week-to-week work starts. Across the top:

- **Plans** returns to the Serving page.
- **Overview** opens the [Plans Overview](./plans-overview.md) for this plan type.
- **Associated Groups** jumps to the section where you choose which groups see these plans in the member app (see [Associating Groups with a Plan Type](./plans.md#associating-groups-with-a-plan-type)).
- **Digital Signage** opens the feed dialog for lobby TVs (see [Digital Signage](./digital-signage.md)).
- **New Plan** starts a plan (see [Creating a Plan](./plans.md#creating-a-plan)).

Above the plan list, **Schedule Lesson** opens the lesson menu (**Schedule Lesson**, **Bulk Schedule**, **Apply Year Plan**; see [Scheduling Lessons](./scheduling-lessons.md)) and **Templates** opens the [plan templates](./plan-templates.md) for the ministry. Switch between **Upcoming** and **Past** plans with the pills above the table. Each row shows the plan's **Name**, **Service date**, and whether it has a **Service Order**, with an **Edit** link that opens the plan's settings.

### Editing or Deleting a Plan Type

1. In the **Plan Types** card, click **Edit** next to the plan type. The **Edit Plan Type** dialog opens.
2. Change the **Plan Type Name** if needed.
3. If a [lesson trim](./scheduling-lessons.md#keeping-only-part-of-every-lesson) has been saved for this plan type, a line such as *"Lesson trim: 4 parts kept, saved from Oct 5 (Oct 1, 2026)"* appears under the name with a **Clear** link that removes it.
4. Expand **Reminders** to set up [volunteer reminders](./plans.md#volunteer-reminders) and [leader gap alerts](./plans.md#leader-gap-alerts) for plans of this type, and click **Save Reminders** inside that section.
5. Click **Save** to keep your changes, or **Delete** to remove the plan type after confirming.

:::warning
Deleting a plan type does not delete its plans one by one, but those plans are no longer listed anywhere in Serving, and any signage feed or FreePlay schedule pointed at the plan type stops finding a current plan. Move or delete the plans you still need first.
:::

## Linking Content Providers

The **Content Providers** card at the bottom of the ministry's Serving page connects curriculum and file sources -- Lessons.church, GO! Curriculum, SignPresenter, The Bible Project, Jesus Film Project, Dropbox, Google Drive, and OneDrive -- so lessons and files can be scheduled into this ministry's plans. Click **Link New Provider** to connect one. Linking is per ministry, so a Youth ministry and a Kids ministry each link their own accounts. See [Scheduling Lessons](./scheduling-lessons.md#link-your-lessonschurch-account) for the step-by-step and for what the **Refresh** and **Unlink** buttons do.

## Who Can Do What

| Task | Needs |
|---|---|
| Add a ministry, add a team, rename or delete either, change members and leaders | **Edit Groups** permission |
| Add, edit, or delete a plan type; create and edit plans, positions, assignments, times, and the order of service | **Plans Edit** permission, or membership in the plan's ministry |
| Record block-out dates for a volunteer on the team page | **Plans Edit** permission |
| Use the Plans Overview's editing tools (assign from the grid, Auto-schedule, Email or Text Volunteers) | **Plans Edit** permission (ministry members without it see the grid read-only) |
| Link or unlink a content provider | Access to the ministry's Serving page |

## Related Articles

- [Service Plans](./plans.md) -- create plans and assign your teams to positions
- [Plans Overview](./plans-overview.md) -- see a plan type's staffing across many weeks
- [Scheduling Lessons](./scheduling-lessons.md) -- link providers and schedule curriculum into a plan type
- [Group Members](../groups/group-members.md) -- add people to ministries and teams
- [Roles & Permissions](../settings/roles-permissions.md) -- grant Edit Groups and Plans Edit
