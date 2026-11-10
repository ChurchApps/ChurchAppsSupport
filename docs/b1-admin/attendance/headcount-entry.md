---
title: "Headcount Entry & Trend"
description: "Enter a total headcount for a service or group in B1 Admin without a named roster, then watch those totals week by week in the Headcount Trend report."
---

# Headcount Entry & Trend

<div class="article-intro">

Headcounts let you record a simple total attendance number -- for a service, a service time, or a group -- without checking in a named roster. Use this when you just need "how many people were here," and pair it with the Headcount Trend report to watch that number over time.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Your campuses, services, and service times must be configured. See [Attendance Setup](setup.md).
- Entering a headcount requires the **Attendance &gt; Edit** permission; viewing the trend report requires **Attendance &gt; View**. See [Roles & Permissions](../settings/roles-permissions.md).

</div>

:::info
Headcounts are a total-only alternative to [Recording Attendance](recording-attendance.md). If you need to know **who** attended -- for example, to follow up with people who haven't been back -- keep using named session attendance in a group's Sessions. Headcounts only store a number.
:::

## Recording a Headcount

1. Open **B1 Admin**, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **People**, and click **Attendance**.
2. Click **Enter headcount** in the left column.
3. Fill in the form:
   - **Service** *(required)*
   - **Service Time** -- leave it on **All service times** to record a total across all of the service's times
   - **Group** -- optional; only groups with Track Attendance enabled are listed. Leave blank for "No group (whole service)."
   - **Date**
   - **Headcount** -- the total number of people present (a whole number, 0 or more)
4. Click **Save**.

The **Recent Headcounts** table beside the form lists your last several entries with their date, service, service time, group, and count. Click a row to load it back into the form if you need to correct or delete it.

## Headcount Trend Report

1. From the same **Attendance** page, click **All years** in the left column, then select the **Headcount Trend** tab.
2. The report runs when the tab opens. To narrow it, choose a **Campus**, **Service**, **Service Time**, or **Group** and click **Run Report**. There is no date filter -- the report covers every week that has a headcount.

The report shows your recorded headcounts summed by week, as both a line chart and a table -- the same report style used by the [Attendance Trend and Group Attendance tabs](tracking-attendance.md). Headcounts entered for the current week also appear under **Headcounts this week** on the main Attendance page.

## Related Pages

- [Recording Attendance](recording-attendance.md) -- named, per-person session attendance
- [Tracking Attendance](tracking-attendance.md) -- attendance and group trend reports
- [Attendance Setup](setup.md) -- configure campuses, services, and service times
