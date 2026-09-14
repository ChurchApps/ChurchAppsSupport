---
title: "Headcount Entry & Trend"
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
Headcounts are a total-only alternative to [Recording Attendance](recording-attendance.md). If you need to know **who** attended -- for example, to follow up with people who haven't been back -- keep using named session attendance on a group's Sessions tab. Headcounts only store a number.
:::

## Recording a Headcount

1. Open **B1 Admin**, open the **section menu** in the top-left corner and choose **People**, then click the **Attendance** tab.
2. Select the **Headcounts** sub-tab.
3. Fill in the form:
   - **Service** *(required)*
   - **Service Time** -- leave blank to record a total across all service times
   - **Group** -- optional; only groups with Track Attendance enabled are listed. Leave blank for "No group (whole service)."
   - **Date**
   - **Headcount** -- the total number of people present
4. Click **Save**.

The **Recent Headcounts** table on the right lists your last several entries with their date, service, service time, group, and count. Click a row to load it back into the form if you need to correct or delete it.

## Headcount Trend Report

1. From the same **Attendance** tab, select the **Headcount Trend** sub-tab.
2. Use the **Campus**, **Service**, **Service Time**, and **Group** filters to narrow the report.

The report shows your recorded headcounts summed by week, as both a line chart and a table -- the same report style used by the [Attendance and Groups trend tabs](tracking-attendance.md).

## Related Pages

- [Recording Attendance](recording-attendance.md) -- named, per-person session attendance
- [Tracking Attendance](tracking-attendance.md) -- attendance and group trend reports
- [Attendance Setup](setup.md) -- configure campuses, services, and service times
