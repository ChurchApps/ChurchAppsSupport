---
title: "Attendance Setup"
---

# Attendance Setup

<div class="article-intro">

Before you can track attendance, you need to tell B1 Admin about your church's physical locations, when services happen, and which groups meet at each service. This one-time setup creates the structure that powers all attendance tracking and reporting across your church.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need an active B1 Admin account with permission to manage attendance. See [Roles & Permissions](../people/roles-permissions.md) if you're unsure about your access level.
- If you plan to assign groups to service times, make sure your [groups are created](../groups/creating-groups.md) first.

</div>

## Key Concepts

- **Campus** -- a physical location where your church meets (e.g., "Main Campus," "North Campus"). Campuses are managed under **Settings**.
- **Service** -- a recurring gathering at a campus (e.g., "Sunday Service," "Midweek").
- **Service Time** -- a specific time a service happens (e.g., "9:00 AM," "11:00 AM").
- **Scheduled Group** -- a group assigned to a specific service time. Attendance is tracked in the context of that service.
- **Unscheduled Group** -- a group that tracks attendance on its own, without being tied to a service time.

## Setting Up Your Attendance Structure

1. Open **B1 Admin**, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), and expand **People**.
2. Click **Attendance**, then click **Setup** in the left column. The **Service structure** table opens, with counts of your campuses, service times, and scheduled and unscheduled groups across the top.
3. Click **Manage Campuses** (top right of the **Service structure** panel). This takes you to **Settings → Campuses**. Click **Add Campus**, enter the name of your location (address and time zone are optional), and click **Save**.
4. Return to **People → Attendance** and click **Setup**. Your campus now appears in the setup table.
5. Click the **+ button in the Service column** under your campus. Enter a service name such as "Sunday Service" and click **Save**.
6. Click the **+ button in the Time column** under the service. Enter a **Service Time** name such as "9:00 AM", optionally fill in the [check-in schedule](#setting-a-check-in-schedule), and click **Save**. Repeat for each service time.
7. To connect a group to a service time, open the group from **People > Groups**, click **Edit**, and use **Add Service Time** — see the next section.

### Enabling Track Attendance on a Group

Before a group can have attendance recorded, Track Attendance must be turned on for that group.

1. In the Jump menu, choose **People > Groups** and select the group.
2. Click the **Edit** button below the group's name.
3. Set **Track Attendance** to **Yes**.
4. Click **Save**.

:::tip
If you assigned the group to a service time in the previous step, also use the **Add Service Time** option on the group's edit screen to link it to the correct service. This ensures sessions are connected to the right campus and time.
:::

:::tip
If a group meets outside of a regular service -- like a midweek small group that tracks its own attendance -- you can leave it as an unscheduled group. It will still appear in the **Group Attendance** report for attendance reporting.
:::

## Setting a Check-in Schedule

Each service time can have an optional check-in schedule so that [self check-in](check-in.md) opens and closes on its own each week. Without a schedule, check-in for that service time stays available at any time (as long as the room isn't closed for other reasons, such as being full).

1. On the **Setup** view, click a service time's name in the **Time** column (or add a new one).
2. Under **Check-in Schedule**, choose the **Day** of the week the service time meets.
3. Set the **Start Time** and, optionally, the **End Time**.
4. Enter **Open check-in (minutes before start)** -- for example, `30` opens check-in half an hour before the service starts.
5. Enter **Close check-in (minutes after end)** -- for example, `15` keeps check-in open for 15 minutes after the end time. If you didn't set an end time, this is counted from the start time.
6. Click **Save**.

The schedule uses your church's local time and repeats every week. To remove a schedule, set **Day** back to **No schedule** and click **Save**. A schedule only takes effect when both a **Day** and a **Start Time** are set.

While a service time's check-in window is closed:

- **Self check-in on B1.church** hides that service time. If none of a service's times are open, families see "Check-in isn't open for this service right now."
- **The B1 Checkin kiosk app** won't complete a check-in into that service time's groups; the kiosk shows a **Can't check in yet** screen listing the affected room so the family can choose a different one.

:::tip
Set a generous open window (for example, 45 minutes before start) so early-arriving families and volunteers can check in, and a short close window so latecomers can still check in once the service has started.
:::

## Editing Your Setup

You can update your setup at any time. Select a campus, service time, or group and click **Edit** to change its details, or **Delete** to remove it.

:::info
Removing a service time does not delete past attendance records. Your historical data is preserved even if you change your schedule.
:::

## What's Next

Once your campuses, service times, and groups are in place, you are ready to start [recording attendance](recording-attendance.md) manually or set up [self check-in](check-in.md) for your services.
