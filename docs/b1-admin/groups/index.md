---
title: "Groups in B1 Admin"
sidebar_label: "Groups"
description: "Set up and organize groups in B1 Admin, including categories, members, calendars, and join requests, with a guide to finding the Groups page."
---

# Groups

<div class="article-intro">

The **Groups** section lets you organize your church members into ministries, small groups, Bible studies, committees, and more. Groups are the backbone of community life at your church, and this section gives you the tools to create, manage, and communicate with every group in one place. Note that **Teams** are separate from Groups — Teams are used for serving and volunteer scheduling.

</div>

## Overview

Groups are organized by **category**. A category is a top-level label such as "Small Groups," "Ministries," or "Committees." Each category can contain multiple groups, making it simple to keep related groups together.

When you open the Groups page, you will see a **Search groups...** box, a row of category buttons, and a table of your groups. Each group shows its category and labels under its name, along with its member count. Type in the search box to find a group by name or category, click **All** or a category name to filter the list (the five largest categories are shown as buttons; the rest are under **More categories**), and click the **Name** or **People** column heading to sort. If your church has more than one [campus](../settings/campuses.md), a second row of buttons lets you show only one campus's groups: click a campus name, or **All campuses** to show them all. A line above the table counts the results (for example, "8 of 24 groups"); click **Clear filters** next to it to show every group again. Click a group's name to open its page -- see [The Group Page](./group-page.md) for a tour.

People with **Edit Groups** also see a **Show archived** button after the categories, which swaps the list for your archived groups with a **Restore** link on each. See [Archiving a Group](./creating-groups.md#archiving-a-group).

The page header has buttons for the rest of the section:

- **Group Health** -- Compare membership and attendance across all groups. See [Groups Health](./groups-health.md). Needs **View Group Members**.
- **pending requests** (for example, "2 pending requests") -- Appears for people with **Edit Group Members** when people are waiting to join a group. See [Group Join Requests](./group-join-requests.md#for-administrators).
- **Share** -- Get a link and QR code for your church's public groups page. See [Sharing a Group Link](./creating-groups.md#sharing-a-group-link).
- **Export** -- Download the list of groups as a CSV file (`groups.csv`). It has one row per group with columns such as **Name**, **Category**, **Campus Id**, **Join Policy**, **Meeting Time**, **Meeting Location**, **Labels**, **Label Count**, **Member Count**, and **Tags**, plus the group's other settings. Needs **Edit Groups**.
- **Add Group** -- Create a group. See [Creating Groups](./creating-groups.md). Needs **Edit Groups**.

:::info
The list only shows regular groups. Serving teams and ministries are managed from [Serving](../serving/index.md), and [confidential groups](./creating-groups.md#configuring-group-settings) are hidden from anyone who is not a member unless they have **View Group Members**, **Edit Groups**, or **View People**.
:::

## What You Can Do

Here is what you can accomplish in the Groups section:

1. **Create and organize groups** -- Add new groups within categories to reflect how your church is structured. See [Creating Groups](./creating-groups.md).

2. **Find your way around a group** -- Each group's page shows its details and status flags, its actions, and summaries of its members, sessions, calendar, forms, notes, and health. See [The Group Page](./group-page.md).

3. **Manage group members** -- Add and remove members, designate leaders, and communicate with your groups. See [Group Members](./group-members.md).

4. **Schedule events** -- Each group can have its own calendar for meetings, events, and recurring activities. See [Group Calendar](./group-calendar.md).

5. **Manage join requests** -- When a group uses the **Request** join policy, review and approve or decline incoming membership requests from people who want to join. See [Group Join Requests](./group-join-requests.md).

6. **Record attendance** -- Groups that track attendance have sessions where you mark who came, print roll sheets, and export the results. See [Recording Attendance](../attendance/recording-attendance.md).

7. **Export group data** -- Download member lists for any group as a CSV file for use in spreadsheets or mailings. See [Group Members](./group-members.md#exporting-group-data) for export instructions.

8. **Check group health** -- See membership growth, churn, and attendance for every group in one table. See [Groups Health](./groups-health.md).

## Who Can Do What

B1 Admin shows each button only to people whose role allows it. In short: **Edit Groups** manages the groups themselves (add, edit, duplicate, archive, delete, export); **View Group Members** and **Edit Group Members** cover seeing and changing who is in a group, approving join requests, and emailing or notifying members; **Edit Attendance** and **View Attendance** cover sessions; and group leaders get leader notes, linked forms, and roster printing for their own groups. The full table is in [The Group Page](./group-page.md#who-can-do-what).

## Getting Started

To access Groups, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin), expand **People**, and click **Groups**. You will see all of your existing groups, which you can filter by category.

:::tip
If you are just getting started, begin by creating a few categories that match your church structure (for example, "Ministries," "Small Groups," "Committees"). Then add individual groups within each category. See [Creating Groups](./creating-groups.md) for a step-by-step walkthrough.
:::

:::info
Group members must first exist in your [People](../people/adding-people.md) directory before they can be added to a group. If you are setting up B1 for the first time, [import your member data](../people/importing-data.md) before creating groups.
:::
