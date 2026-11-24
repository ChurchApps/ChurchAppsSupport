---
title: "Reports"
description: "Find and run the built-in reports in B1 Admin for birthdays, attendance trends, donation totals, and the audit log, depending on which section you're in."
---

# Reports

<div class="article-intro">

B1 Admin gives you several ways to pull data about your congregation, attendance, and giving. Reporting is built into the relevant sections of the app rather than a single Reports page.

</div>

## Training Video

<YouTube id="vn5SonVe94Q" title="Running Reports in B1" />

## Where to Find Reports

### People
- **[Birthday & Anniversary Lists](./birthday-report.md)** -- Filter by Birth Month or Anniversary Month in **People → Advanced Search** to get a list of upcoming birthdays or anniversaries, or run the **Birthdays by Month** and **Anniversaries by Month** reports by address (see below).

### Attendance
- **[Attendance Reports](./attendance-reports.md)** -- Attendance trends and group attendance data are found in the **Attendance** section.

### Donations
- **[Donation Summary](./donation-summary.md)** -- Giving totals and fund breakdowns are found in the **Donations** section.

### Settings
- **[Audit Log](./audit-log.md)** -- Track all changes and actions across your church management system (found under **Settings → Audit Log**).

## Running a Report by Address

B1's built-in reports open at **admin.b1.church/reports/`<name>`**. They have no entry in the menus, so bookmark the ones you use. Each report page shows the report's title and description, a **Filter Report** panel on the right with the report's dropdowns and dates, and a **Run Report** button; the results appear on the left as a table or chart, with print and **Download Options** where the report offers them. A report only loads for people with the permission it needs.

| Address | Report | Filters | Needs |
|---|---|---|---|
| `/reports/birthdays` | **Birthdays by Month** -- everyone with a birthday in the chosen month | **Month**, **Group** | View People |
| `/reports/anniversaries` | **Anniversaries by Month** -- everyone with an anniversary in the chosen month | **Month**, **Group** | View People |
| `/reports/attendanceTrend` | [Attendance Trend](./attendance-reports.md#attendance-trend) -- visits per week | Campus, Service, Service Time, Group, dates | View Attendance |
| `/reports/headcountTrend` | **Headcount Trend** -- the hand-entered [headcount](../attendance/headcount-entry.md) totals per week, as a line chart and table | Campus, Service, Service Time, Group | View Attendance |
| `/reports/groupAttendance` | [Group Attendance](./attendance-reports.md#group-attendance) -- who attended each group session | Campus, Service, dates | View Attendance |
| `/reports/dailyGroupAttendance` | [Group attendance by day](./attendance-reports.md#daily-group-attendance) -- one group's count per day | Campus, Service, Service Time, Group | View Attendance |
| `/reports/donationSummary` | [Donation Summary](./donation-summary.md) -- giving totals by fund | Fund, dates | View Donation Summaries |
| `/reports/lapsedGivers` | [Lapsed Givers](../donations/donation-reports.md#lapsed-givers) -- people who gave in one period but not since | Period dates | View Donations |

The attendance and giving reports are also reachable from their own sections (**Attendance > All years** and **Donations > Summary**), which is the usual way to run them.

:::info
Report data depends on consistent data entry. Make sure your team is [tracking attendance](../attendance/tracking-attendance.md), [recording donations](../donations/recording-donations.md), and keeping [people records](../people/adding-people.md) up to date for the most accurate results.
:::
