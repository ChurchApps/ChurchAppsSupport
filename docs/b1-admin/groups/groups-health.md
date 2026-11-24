---
title: "Groups Health"
description: "Check group health in B1 Admin with a 90-day table of members, joins, departures, churn, and average attendance to spot groups needing follow-up."
---

# Groups Health

<div class="article-intro">

The Groups Health dashboard gives you a bird's-eye view of how all your groups are doing — membership trends, attendance averages, and growth or attrition over the past 90 days — all in a single sortable table.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need at least a few groups with members to see meaningful data. See [Creating Groups](./creating-groups.md).
- You need **View Group Members** to open Group Health. The **Avg Attendance** column and a group's **Attendance Trend** chart also need **View Attendance Summary**; without it they show a dash. See [Roles & Permissions](../people/roles-permissions.md).
- Attendance data is pulled from recorded sessions. See the [Attendance](../attendance/index.md) section.

</div>

## Opening Groups Health

In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **People**, click **Groups**, and then click the **Group Health** button in the page header. The dashboard loads a table with one row per group.

## Columns

| Column | What it shows |
|--------|--------------|
| **Name** | The group name, linked to the group detail page |
| **Category** | The group's category |
| **Members** | Current active member count |
| **Joined (90d)** | Members who joined in the last 90 days |
| **Left (90d)** | Members who left in the last 90 days |
| **Churn (90d)** | The members who left in the last 90 days as a percentage of the group's size 90 days ago (today's members, minus those who joined, plus those who left), to one decimal place. A group of 20 that lost 2 shows 10%. |
| **Avg Attendance** | The average number of people recorded present per session over the last 13 weeks, to one decimal place, or "-" if the group had no sessions in that time (or you lack **View Attendance Summary**) |
| **Avg Age** | Average age of members with a birth date on file, rounded to a whole year, or "-" if none have one |
| **Female** / **Male** | How many members are female and male |

Only regular groups are listed; serving teams and ministries are left out. The table starts sorted by name. Click any column header to sort the table by that column. Click again to reverse the sort direction. Click **Groups** at the top of the page to go back to the Groups list.

## One Group's Health

Each group's own page has a **Health** section with a one-line summary (members, joined, and left in the last 90 days). Click **See health** to open the group's health view: its **Members**, **Joined (90d)**, **Left (90d)**, and **Churn (90d)** numbers, a **Membership Changes (12 months)** column chart of people **Joined** and **Left** each month, an **Attendance Trend** line chart of weekly attendance for groups that track attendance, and **Age** and **Gender** charts of its members. Charts with nothing to show say "No data". The section and view appear for people with **View Group Members**; see [The Group Page](./group-page.md#health).

## Using Health Data

- **High churn + low joins** — a group that is shrinking and not replacing lost members. Worth a conversation with the group leader.
- **High joins + low attendance** — people are signing up but not showing up. Consider engagement follow-up.
- **High average attendance** — a healthy, active group. Potential model for other groups.

:::tip
Clicking a group name takes you directly to the group's detail page where you can review individual members, attendance records, and calendar events.
:::

## Related Articles

- [Creating Groups](./creating-groups.md) — set up groups
- [Group Members](./group-members.md) — manage group membership
- [Tracking Attendance](../attendance/tracking-attendance.md) — record attendance sessions that feed this dashboard
