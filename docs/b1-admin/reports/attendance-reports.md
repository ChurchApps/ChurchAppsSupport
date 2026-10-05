---
title: "Attendance Reports"
---

# Attendance Reports

<div class="article-intro">

B1 Admin provides three attendance reports to help you understand how people are engaging with your services and groups. Each report offers a different perspective on your attendance data, from high-level trends to daily breakdowns.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Make sure attendance is being [tracked consistently](../attendance/tracking-attendance.md) for your services and groups
- Ensure your [groups](../groups/creating-groups.md) and services are configured in B1 Admin
- You need the appropriate [permissions](../settings/roles-permissions.md) to access reports

</div>

## Attendance Trend

The Attendance Trend report shows how attendance changes over time for your services.

1. Go directly to **admin.b1.church/reports/attendanceTrend** in your browser (reports have no entry in the navigation menu — bookmarking the address is the easiest way to get back to it). The same report is also on the **Attendance Trend** tab of the Attendance page.
2. Optionally select a **Campus**, **Service**, **Service Time**, or **Group** to filter the results.
3. Set the **Start Date** and **End Date**. By default the report covers the past year, from one year ago through today, and the end date is included in full. Click **Run Report**.
4. The report displays a bar chart and table of total visits per week. Each week is labeled with the date of that week's Sunday, and the table's **Session Dates** column lists the actual dates in that week that had attendance (for example, "9/27, 9/30").

This report is useful for spotting patterns like seasonal dips, growth trends, or the impact of special events.

## Group Attendance

The Group Attendance report shows who attended each group session in a date range.

1. Go directly to **admin.b1.church/reports/groupAttendance** in your browser, or open the **Group Attendance** tab of the Attendance page.
2. Optionally select a **Campus** and **Service**.
3. Set the **Start Date** and **End Date**. By default the report covers last Sunday through today, and the end date is included in full.
4. Click **Run Report**.

The results are grouped by session date, then service time, then group, with the people who attended listed under each group. Service times, groups, and names are sorted alphabetically. Next to each person's name, the **Checked In** column shows the time their attendance was recorded (blank when no time is on file) and the **Membership Status** column shows their status, such as Member or Visitor.

To download a spreadsheet, click **Download Options** and choose **Summary**. The CSV has:

- One row per member of each group that met in the date range, sorted by group and then name.
- The person's name and group name in the first columns.
- One column per dated session, named with the service, service time, and date (for example, "Sunday - 9:00 AM (2026-09-27)"), with each person marked **present** or **absent**.

Use this report to compare attendance across groups and identify which groups are growing or need attention.

## Daily Group Attendance

The Daily Group Attendance report provides a day-by-day breakdown of attendance data for your groups.

1. Go directly to **admin.b1.church/reports/dailyGroupAttendance** in your browser.
2. Set the **date range** for the report.
3. Select the **group(s)** you want to review.
4. The report shows attendance numbers for each individual day within the range.

This report gives you granular detail, which is helpful for understanding week-to-week variation or identifying specific days with unusually high or low attendance.

:::tip
Use the Attendance Trend report for a high-level overview and the Daily Group Attendance report when you need to drill into specific dates.
:::

## Practical Uses

- **Planning** -- Use attendance trends to plan seating, staffing, and resources for upcoming services.
- **Outreach** -- Identify declining attendance patterns early so you can follow up with members.
- **Board reports** -- Include attendance data in your regular leadership reports to show ministry health.
- **Event evaluation** -- Compare attendance before and after special events to measure their impact.

:::warning
Attendance data is recorded through your group and service check-in processes. If attendance is not being tracked consistently, your reports will not accurately reflect actual participation. See [Tracking Attendance](../attendance/tracking-attendance.md) for setup instructions.
:::
