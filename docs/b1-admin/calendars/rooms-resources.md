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

In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Calendars**, and click **Rooms & Resources** (or go to **/calendars/rooms**). The page has four tabs: **Rooms**, **Resources**, **Blockouts**, and **Templates**. The add button at the top of the page changes to match the selected tab (**Add Room**, **Add Resource**, **Add Blockout**, or **Add Template**), and a **Find** box filters the current list: rooms and resources by name or category, blockouts by what they apply to or their reason, and templates by template name or event title. A line such as *3 of 12 rooms* shows how many match, with a **Clear** button to reset the search and any category filter.

Clicking **Add** opens the form below the list; clicking **Edit** on a row opens it above the list. Every form has **Save** and **Cancel** buttons, and saved items also have **Delete**, which asks you to confirm.

## Rooms

Rooms are physical spaces that can be reserved alongside calendar events — a sanctuary, a fellowship hall, a classroom, etc.

### Adding a Room

1. On the **Rooms** tab, click **Add Room** at the top of the page.
2. Enter a **Room Name**.
3. Optionally set a **Capacity** (maximum number of people) and a **Description**. Both show next to the room when people pick rooms for an event. You can also pick or type a **Category** (for example Sanctuary, Kitchen, or AV). Rooms that share a category are grouped under a heading when people pick rooms for an event, and the category becomes a filter on this page.
4. Set an **Approval Group** if bookings need sign-off. Bookings made by members of that group are approved automatically; anyone else's booking waits as **Pending** until it's approved on the [Approvals](./approvals.md) page, and the group's members get an email about new requests. Leave it on **No approval needed** to approve every booking automatically.
5. Click **Save**.

The Rooms list shows each room's **Room Name**, **Category**, **Capacity**, and **Approval Group**. When any room has a category, a filter chip for each category appears below the tabs with its count, for example *Classroom (6)*, most-used first; click one to show only that category's rooms, and click it again to show them all. Switching tabs clears the category filter. Rooms switched off show an **Inactive** badge next to their name.

### Editing or Deleting a Room

Hover over a room and click **Edit**, make your changes, and click **Save**. Use **Delete** to remove a room permanently.

If a room is closed for a while — a renovation, a season, or no set return date — turn its **Active** switch off and click **Save** instead of deleting it. An inactive room keeps its details and every past booking, but it no longer appears in the room lists when someone schedules an event or requests a room. Turn the switch back on to make it bookable again. A blockout is better when the room is closed for specific dates, because it keeps the room in the list and warns about bookings during those dates.

## Resources

Resources are items that can be booked alongside an event — AV equipment, projectors, chairs, a van, etc.

### Adding a Resource

1. Click the **Resources** tab, then **Add Resource**.
2. Enter a **Resource Name** and optionally a **Description** and **Category**. A category groups the resource under a heading when people pick resources for an event, the same way it does for rooms.
3. Set the **Quantity** you own (for example, 3 projectors). An event books one by default; when a resource has more than one unit, the event editor shows a **Quantity** box so an event can book several, and B1 warns when events at the same time book more than you have.
4. Set an **Approval Group** if someone needs to sign off on resource loans. It works the same way as for rooms.
5. Click **Save**.

The Resources list shows **Resource Name**, **Category**, **Quantity**, and **Approval Group**, with the same category chips as rooms. Edit or delete a resource the same way as a room. A resource also has an **Active** switch: turn it off to take it out of the resource lists without losing its details or past bookings.

## Blockouts

Blockouts prevent rooms or resources from being booked during certain times — for renovations, reserved periods, or maintenance.

### Adding a Blockout

1. Click the **Blockouts** tab, then **Add Blockout**.
2. In **Applies To**, choose a room, a resource, or **All rooms & resources**.
3. Set the **Start** and **End** date/time for the blockout. **Save** stays disabled until the end is after the start.
4. Optionally add a **Reason**. It shows on the [Availability](./availability.md) calendar as *Blocked: reason* (without a reason, the room or resource name is shown instead).
5. Click **Save**.

The Blockouts list shows **Applies To**, **Start**, **End**, and **Reason**. Events that book a blocked-out room or resource show a conflict warning in the event editor, and pending requests for that time show a **Conflicts** badge on the [Approvals](./approvals.md) page. A blockout warns but does not prevent saving.

## Event Templates

Templates let you save a reusable event setup — title, description, length, rooms, and resources — so that events you create often are set up the same way every time.

### Adding a Template

1. Click the **Templates** tab, then **Add Template**.
2. Enter a **Template Name** (shown when picking a template).
3. Fill in the **Event Title**, **Event Description**, and **Duration (minutes)** to use for new events.
4. Optionally tick the **Rooms** and **Resources** to book. Both lists are grouped by category and show only active rooms and resources. Resources are booked one unit each.
5. Click **Save**.

The Templates list shows **Template Name**, **Event Title**, and **Duration (minutes)**.

When creating a new event, pick the template in the event editor's **Template** box to fill in the title, description, rooms, and resources, and to set the end time from the template's duration (set the **Start** first; the duration is ignored for an all-day event). You still choose the event's **Group**, and you can change anything the template filled in before saving. The **Template** box only appears once at least one template exists.

## Related Articles

- [Availability Calendar](./availability.md) — view all bookings at a glance and book rooms or resources directly
- [Calendar Approvals](./approvals.md) — approve or reject room and resource booking requests
- [Creating Calendars](./creating-calendars.md) — set up event calendars
- [Creating Groups](../groups/creating-groups.md) — set up groups that can book rooms and resources
