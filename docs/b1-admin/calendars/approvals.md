---
title: "Calendar Approvals"
description: "Review pending room and resource booking requests in B1 Admin, check for conflicts, approve or reject them, and look back at past decisions under History."
---

# Calendar Approvals

<div class="article-intro">

The Approvals page is where administrators review and act on pending room and resource booking requests, as well as calendar events that require approval before being published.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Configure rooms or resources with an **Approval Group** in [Rooms & Resources](./rooms-resources.md)
- You need the **Calendars Admin** permission or the **content.edit** permission

</div>

## Opening Approvals

In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Calendars**, and click **Approvals**. Pending booking requests and events awaiting review are listed here. Use the **Pending** and **History** buttons at the top to switch between requests that still need a decision and ones that have already been decided.

## Booking Requests

When a group creates an event and requests a room or resource, the request appears in the **Room & Resource Requests** section. Each row shows:

- The event name and date/time
- The room or resource being requested (with the quantity for multi-unit resources)
- **Requested by**, the person who asked for it, linked to their record
- A status badge showing whether the request has conflicts

### Conflict Indicators

If a request overlaps another booking or blockout for the same room or resource, its status shows a **Conflicts** badge; hover over it to see the details. Requests without overlaps show **No conflicts**. Review conflicting requests carefully before approving either one.

### Approving or Rejecting

Click **Approve** or **Reject** on any booking request (rejecting asks you to confirm first). The requester is notified of the decision. Approved bookings are locked to that room or resource for the event; rejected bookings free the slot for others.

When you click **Approve**, an **Approve booking** dialog opens so you can also publish the event in the same step:

1. Check **Publish to public calendar** to make the event public on its group's calendar. Leave it unchecked to approve the booking without changing the event's visibility.
2. Once **Publish to public calendar** is checked, you can optionally choose a curated calendar from **Also add to calendar** to add the event to one of your [curated calendars](./curated-calendar.md) as well. Leave it set to **None** to skip this. (This option only appears if you have the **content.edit** permission.)
3. Click **Approve**.

## Pending Events

If your calendar workflow requires event approval before events become visible to the public, pending events appear in the **Event Requests** section. Click **Approve** to publish an event to the calendar, or **Reject** to notify the submitter that changes are needed.

:::tip
Set up an Approval Group on a room in [Rooms & Resources](./rooms-resources.md) to require approval for that room. Groups with access can then request the room when creating events, and those requests flow into this page.
:::

## History

Approved and rejected requests stay on the page. Click **History** at the top of Approvals to see them; click **Pending** to go back to the open requests.

- **Room & Resource Requests** lists each decided booking with the event, the room or resource, **Requested by**, an **Approved** or **Rejected** badge, and **Decided**, which shows who made the decision and on what date. The most recently decided requests are listed first.
- **Event Requests** lists each decided event with its description, **Requested by**, and an **Approved** or **Rejected** badge. Who decided an event request, and when, is not recorded, so that column is not shown for events.

Click a name under **Requested by** to open that person's record.

## Related Articles

- [Rooms, Resources & Scheduling](./rooms-resources.md) — configure bookable rooms and resources
- [Creating Calendars](./creating-calendars.md) — manage calendars and events
