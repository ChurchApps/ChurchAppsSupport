---
title: "Availability Calendar"
description: "Set up bookable rooms and equipment in B1 Admin, then book them on the calendar, add setup/teardown buffers, and handle recurring or approval-required bookings."
---

# Availability Calendar

<div class="article-intro">

The Availability Calendar gives you a bird's-eye view of all room and resource bookings across your church. From here you can see what is scheduled, spot conflicts before they happen, and book a room or resource for any event directly.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up at least one [room or resource](./rooms-resources.md) in the Rooms & Resources section
- You need the **Edit Content** permission

</div>

## Opening the Availability Calendar

In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Calendars**, and click **Availability**.

## Reading the Calendar

The calendar displays the current month by default. Use **Today**, **Back**, and **Next** at the top to move around, and **Month**, **Week**, **Day**, or **Agenda** to change the view.

Each booking is color-coded by status:

| Color | Meaning |
|-------|---------|
| Green | Approved |
| Orange | Pending approval |
| Grey | Blocked out (not available), shown as *Blocked: reason* |

Each booking reads as the event title followed by the rooms and resources it uses, for example *Youth Night — Fellowship Hall — Projector*. The block drawn on the calendar includes any setup and teardown minutes or custom reservation window, so it can be longer than the event itself. Hover over a booking to see the full text. Click a booking to open its event in the editor (blockouts can't be clicked; edit them under [Blockouts](./rooms-resources.md#blockouts)). The calendar covers bookings from one month ago to one year ahead.

## Filtering by Room or Resource

Use the **Room / Resource** dropdown at the top left to narrow the calendar to a single room or resource. Blockouts for other rooms and resources are hidden too, while blockouts that apply to **All rooms & resources** stay. Select **All rooms & resources** to return to the full view.

The filter also feeds the **Book** button: with a room or resource selected, **Book** opens the **New Event** dialog with that room or resource already ticked.

## Exporting Bookings to a Spreadsheet {#exporting-bookings}

Click **Export** at the top of the page to download a CSV file of the bookings in the current view, for a facilities team or custodial schedule.

1. Pick the view and dates you want with **Month**, **Week**, **Day**, or **Agenda** and **Back** / **Next**.
2. Optionally pick one room or resource in **Room / Resource**.
3. Click **Export**.

The file has one row per booking on each date in view, sorted by start time, with these columns: **Event**, **Room / Resource**, **Quantity** (for resources), **Start** and **End** (the event's own times), **Setup (min)** and **Teardown (min)**, **Status** (**Approved** or **Pending**), and **Requested by**. A booking with a custom reservation window leaves the setup and teardown columns blank. Repeating bookings get a row for each date. Blockouts are not included. The **Export** button only appears when there is at least one booking in view.

## Booking a Room or Resource

1. Click the **Book** button at the top of the page.
2. The **New Event** dialog opens -- the same editor used on a calendar (see [Adding and Editing Events](./creating-calendars.md#adding-and-editing-events)). Fill in the event details:
   - **Group** *(required)* — the group the event belongs to. If you have [templates](./rooms-resources.md#event-templates), you can also pick a **Template** to fill in the rest.
   - **Title** *(required)*
   - **Start** and **End** date/time *(required; End must be after Start)*
   - **Visibility** — Public or Private
   - **Rooms** — select one or more rooms to reserve; each shows its seats and description
   - **Resources** — select one or more resources to reserve. For a resource you own several of, a **Quantity** box appears (for example *3 available*) so you can book more than one.
3. Once a room or resource is selected, you can set **Setup (min before)** and **Teardown (min after)**. These pad the booking on both ends so the space is reserved for setup and cleanup, even though the event start/end times stay the same.
4. To repeat the booking, set the **Start** first, then check **Repeats** and configure the recurrence:
   - **Interval** -- how often it repeats (for example, 2 with **Week** for every 2 weeks).
   - **Frequency** -- **Day**, **Week**, or **Month**. Weekly lets you pick specific day(s) of the week; Monthly lets you pick **Monthly on day** *N* or a relative pattern such as **Monthly on the** *second Tuesday*.
   - **Ends** -- **Never**, **On** a specific **End Date**, or **After** a set number of **Occurrences**.

   See [Repeating Events](./creating-calendars.md#repeating-events) for the details. Every date of the series is checked for conflicts.
5. To specify a custom booking window (different from the event start/end), turn on **Custom reservation window** and enter **Reserve from** and **Reserve until**. This replaces the setup and teardown minutes. Use it when a room needs to be accessible outside the event's listed hours.
6. Click **Save** to submit the booking.

:::info
If the room or resource has an **Approval Group** configured, the booking will appear as **Pending** until it's approved on the Approvals page -- unless you're a member of that group, in which case it's approved right away. See [Calendar Approvals](./approvals.md) for the approval workflow.
:::

:::tip
The editor shows a warning before you save if a room or resource is already booked or blocked out at that time. If you see a conflict warning, adjust your times or choose a different room.
:::

## Related Articles

- [Rooms, Resources & Scheduling](./rooms-resources.md) — set up bookable spaces and equipment
- [Calendar Approvals](./approvals.md) — approve or deny booking requests
- [Creating Calendars](./creating-calendars.md) — manage event calendars
