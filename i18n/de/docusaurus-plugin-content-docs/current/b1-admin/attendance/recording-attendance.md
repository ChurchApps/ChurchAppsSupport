---
title: Anwesenheit erfassen
---

# Recording Attendance

<div class="article-intro">

Once your campuses, service times, and groups are set up, you can manually record attendance after each gathering. B1 Admin organizes attendance around **sessions** -- one session per group per meeting date. You create the session, mark who showed up, and the data feeds directly into your attendance reports.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Your campuses, service times, and groups must be configured. See [Attendance Setup](setup.md) if you haven't done this yet.
- The groups you want to track must have **Track Attendance** enabled. See [Attendance Setup](setup.md) for details.

</div>

## Creating a Session

A session represents one occurrence of a group meeting -- for example, your K--3rd grade class on a specific Sunday.

1. Open **B1 Admin**, open the **section menu** in the top-left corner and choose **People**, then click the **Groups** tab.
2. Select the group you want to record attendance for.
3. Click the **Sessions** tab.
4. Click **New** to create a new session.
5. If the group is assigned to a service time, choose the **Service Time**. If it is an unscheduled group, this field will not appear.
6. Select the **Session Date** -- this can be today, a past date, or a future date.
7. Click **Save**.

### Adding Sessions for Every Class in a Service Time

If other groups meet at the same service time (for example, all of your children's classes at Sunday 9:00 AM), you can create their sessions in one step instead of visiting each group.

1. Follow the steps above and choose a **Service Time**.
2. Check **Also add for the other _N_ groups in _service time_**. The checkbox shows how many other groups are assigned to that service time. It only appears when adding a new session and at least one other group meets at that time.
3. Click **Save**.

A session is created for the current group and for each of the other groups on the same date and service time. Groups that already have a session for that date and service time are skipped, so you won't get duplicates.

:::tip
You can create sessions for past dates to catch up on attendance you haven't recorded yet, or create them in advance so they are ready when your group meets.
:::

## Marking Attendance

Select a session to see its attendance list. Every group member is listed with a checkbox, sorted by last name, and anyone already recorded as present is checked.

1. Check the box next to each person who attended. Use **Select All** or **Select None** to change everyone at once.
2. The count above the list (for example, "12 of 15 present") updates as you check boxes.
3. Click **Save Attendance**. Nothing is recorded until you save, and a message confirms when the save is done.

Unchecking someone who was already recorded as present and then saving removes them from the session.

### Adding Visitors

To record someone who is not a member of the group, search for them in the person search beside the attendance list. If they are not in your database yet, you can create them from the search. They are added to the list already checked. Click **Save Attendance** to record them.

People who checked in at a kiosk show a **Volunteer** or **Guest** chip. People who are not group members show a **Guest** chip.

## Printing a Roll Sheet

A roll sheet is a printable class list that teachers can mark by hand and give back to you to enter later. Each sheet shows the church name, the class, a large **Date** line under the class name, and the service time. Members are listed in two columns (read down the left column, then the right) so more names fit on a page, and every member has **Present** and **Absent** boxes. There are blank lines for visitors and a **Teacher / Notes** area.

- **From a session** -- Click the **Print Roll Sheet** (printer) icon at the top of the session's attendance list. The sheet is dated with the session's date.
- **All classes for a service** -- If the session has a service time, click **Print All Classes** to print one sheet per class assigned to that service time. Each class prints on its own page.
- **From the Members tab** -- Click the **Print Roll Sheet** icon above the group's member list to print an undated sheet.

The sheet opens in a new tab and your browser's print dialog appears automatically.

## Exporting Attendance to a Spreadsheet

You can download a record of the session as a CSV file to use in Excel, Numbers, or Google Sheets.

1. Open the session you want to export.
2. Click the **Export** button at the top of the attendance list.
3. Open the downloaded file in your spreadsheet application.

## Viewing Recorded Attendance

After recording sessions, the data appears in your attendance reports.

- **Attendance Trend tab** -- shows church-wide trends over time. See [Tracking Attendance](tracking-attendance.md).
- **Group Attendance tab** -- shows attendance broken down by individual group. See [Attendance Reports](../reports/attendance-reports.md#group-attendance).

:::tip
If a session you just created does not appear in reports right away, make sure the session date falls within the date range selected in the report filters.
:::
