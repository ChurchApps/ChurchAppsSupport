---
title: "Rooms, Resources & Scheduling"
description: "Set up rooms, equipment, blockouts, and event templates in B1 Admin so groups can request bookings and you can approve them to avoid double-booking."
---

# Rooms, Resources & Scheduling

<div class="article-intro">

Rooms and Resources let you track your church's bookable spaces and equipment. When a group or team wants to use a room or borrow a resource for an event, they can request it through B1 — and you can approve or deny those requests to prevent double-booking.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Content** permission
- Set up [groups](../groups/creating-groups.md) whose members will be submitting booking requests

</div>

## Opening Rooms & Resources

In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Calendars**, and click **Rooms & Resources**. The page has four tabs: **Rooms**, **Resources**, **Blockouts**, and **Templates**. The add button at the top of the page changes to match the selected tab, and a **Find** box lets you filter the current list.

## Rooms

Rooms are physical spaces that can be reserved alongside calendar events — a sanctuary, a fellowship hall, a classroom, etc.

### Adding a Room

1. On the **Rooms** tab, click **Add Room** at the top of the page.
2. Enter a **Room Name**.
3. Optionally set a **Capacity** (maximum number of people) and a **Description**. Both show next to the room when people pick rooms for an event.
4. Set an **Approval Group** if bookings need sign-off. Bookings made by members of that group are approved automatically; anyone else's booking waits as **Pending** until it's approved on the [Approvals](./approvals.md) page, and the group's members get an email about new requests. Leave it on **No approval needed** to approve every booking automatically.
5. Click **Save**.

The Rooms list shows each room's **Room Name**, **Capacity**, and **Approval Group**.

### Editing or Deleting a Room

Hover over a room and click **Edit**, make your changes, and click **Save**. Use **Delete** to remove a room permanently.

## Resources

Resources are items that can be booked alongside an event — AV equipment, projectors, chairs, a van, etc.

### Adding a Resource

1. Click the **Resources** tab, then **Add Resource**.
2. Enter a **Resource Name** and optionally a **Description**.
3. Set the **Quantity** you own (for example, 3 projectors). Each event books one, and B1 warns when more events at the same time book it than you have.
4. Set an **Approval Group** if someone needs to sign off on resource loans. It works the same way as for rooms.
5. Click **Save**.

Edit or delete a resource the same way as a room.

## Blockouts

Blockouts prevent rooms or resources from being booked during certain times — for renovations, reserved periods, or maintenance.

### Adding a Blockout

1. Click the **Blockouts** tab, then **Add Blockout**.
2. In **Applies To**, choose a room, a resource, or **All rooms & resources**.
3. Set the **Start** and **End** date/time for the blockout.
4. Optionally add a **Reason**. It shows on the [Availability](./availability.md) calendar as *Blocked: reason*.
5. Click **Save**.

Events that book a blocked-out room or resource show a conflict warning in the event editor.

## Event Templates

Templates let you save a reusable event setup — title, description, length, rooms, and resources — so that events you create often are set up the same way every time.

### Adding a Template

1. Click the **Templates** tab, then **Add Template**.
2. Enter a **Template Name** (shown when picking a template).
3. Fill in the **Event Title**, **Event Description**, and **Duration (minutes)** to use for new events.
4. Optionally pick the **Rooms** and **Resources** to book.
5. Click **Save**.

When creating a new event, pick the template in the event editor's **Template** box to fill in the title, description, rooms, and resources, and to set the end time from the template's duration (set the **Start** first). You still choose the event's **Group**. The **Template** box only appears once at least one template exists.

## Related Articles

- [Availability Calendar](./availability.md) — view all bookings at a glance and book rooms or resources directly
- [Calendar Approvals](./approvals.md) — approve or reject room and resource booking requests
- [Creating Calendars](./creating-calendars.md) — set up event calendars
- [Creating Groups](../groups/creating-groups.md) — set up groups that can book rooms and resources
