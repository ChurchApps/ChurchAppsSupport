---
title: "Calendar Approvals"
---

# Calendar Approvals

<div class="article-intro">

The Approvals page is where administrators review and act on pending room and resource booking requests, as well as calendar events that require approval before being published.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Configure rooms or resources with an **Approval Group** in [Rooms & Resources](rooms-resources)
- You need the **Calendars Admin** permission or the **content.edit** permission

</div>

## Opening Approvals

In B1 Admin, go to **Calendars** and select **Approvals**. Pending booking requests and events awaiting review are listed here.

## Booking Requests

When a group creates an event and requests a room or resource, the request appears in the **Room & Resource Requests** panel. Each row shows:

- The room or resource being requested
- The event name and date/time
- The requesting group

### Conflict Indicators

If two requests overlap for the same room or resource, a conflict warning icon appears. Review conflicting requests carefully before approving either one.

### Approving or Rejecting

Click the **✓** (approve) or **✗** (reject) icon on any booking request. The requesting group is notified of the decision. Approved bookings are locked to that room or resource for the event; rejected bookings free the slot for others.

When you click approve, an **Approve booking** dialog opens so you can also publish the event in the same step:

1. Check **Publish to public calendar** to make the event public on its group's calendar. Leave it unchecked to approve the booking without changing the event's visibility.
2. Once **Publish to public calendar** is checked, you can optionally choose a curated calendar from **Also add to calendar** to add the event to one of your [curated calendars](curated-calendar) as well. Leave it set to **None** to skip this. (This option only appears if you have the **content.edit** permission.)
3. Click **Approve**.

## Pending Events

If your calendar workflow requires event approval before events become visible to the public, pending events appear in the **Event Requests** panel. Approve an event to publish it to the calendar, or reject it to notify the submitter that changes are needed.

:::tip
Set up an Approval Group on a room in [Rooms & Resources](rooms-resources) to require approval for that room. Groups with access can then request the room when creating events, and those requests flow into this page.
:::

## Related Articles

- [Rooms, Resources & Scheduling](rooms-resources) — configure bookable rooms and resources
- [Creating Calendars](creating-calendars) — manage calendars and events
