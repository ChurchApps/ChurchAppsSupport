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
- You need the **Edit Content** permission, or **Resolve Calendar Conflicts & Approvals** (both in the **Content** section of [Roles & Permissions](../settings/roles-permissions.md)). Without **Edit Content**, the **Calendars** menu isn't shown -- open Approvals from the **Dashboard**'s pending-approvals link or the approval email instead.

</div>

## Opening Approvals

In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Calendars**, and click **Approvals**. Pending booking requests and events awaiting review are listed here. Use the **Pending** and **History** buttons at the top to switch between requests that still need a decision and ones that have already been decided.

## Booking Requests

When someone books a room or resource that has an **Approval Group**, and they aren't a member of that group, the request appears in the **Room & Resource Requests** section. (Bookings by members of the Approval Group are approved automatically.) Members of the Approval Group also get an email listing new pending requests, with a link to this page. Each row shows:

- The event name and date/time
- The room or resource being requested (with the quantity for multi-unit resources)
- **Requested by**, the person who asked for it, linked to their record
- A status badge showing whether the request has conflicts

### Conflict Indicators

If a request overlaps another booking or blockout for the same room or resource, its status shows a **Conflicts** badge; hover over it to see the details. Requests without overlaps show **No conflicts**. Review conflicting requests carefully before approving either one.

### Approving or Rejecting

Hover over a booking request and click **Approve** or **Reject** (rejecting asks you to confirm first). The requester is notified of the decision. Approved bookings are locked to that room or resource for the event; rejected bookings free the slot for others.

When you click **Approve**, an **Approve booking** dialog opens so you can also publish the event in the same step:

1. Check **Publish to public calendar** to make the event public on its group's calendar. Leave it unchecked to approve the booking without changing the event's visibility.
2. Once **Publish to public calendar** is checked, you can optionally choose a curated calendar from **Also add to calendar** to add the event to one of your [curated calendars](./curated-calendar.md) as well. Leave it set to **None** to skip this. (This option only appears if you have the **content.edit** permission.)
3. Click **Approve**.

## Pending Events

Events that members request (for example, from **My Requests** in the B1 app) appear in the **Event Requests** section with their date, **Description**, and **Requested by**. Click **Approve** to publish an event to the calendar, or **Reject** to notify the submitter that changes are needed. Click **Edit** to fix the request's details before you decide, or **Delete** to remove it.

Member requests don't belong to a group, so the editor shows **(no group)** in **Group**. You can save your changes without picking a group, or choose one if the event belongs to a ministry. Members can also enter an optional **Location** for events away from the church building, which shows in the editor's **Location** field.

:::tip
Set up an Approval Group on a room in [Rooms & Resources](./rooms-resources.md) to require approval for that room. Groups with access can then request the room when creating events, and those requests flow into this page.
:::

## Writing Your Own Request Instructions {#request-instructions}

The top of the **Request an Event** page in the B1 app says "Staff will approve each room and item." by default. You can replace that line with your own booking guidelines, notice periods, or terms.

1. In the [Jump menu](../introduction.md#getting-around-with-the-jump-menu), expand **Mobile** and click **Member portal** (the **Portal settings** page). You need the **Edit Church Settings** permission.
2. Under **Event request page**, type your text in **Event request instructions** (up to 1,000 characters). Line breaks are kept.
3. Click **Save** at the bottom of the page.

Members see your text at the top of the page the next time they open it. Clear the box and save to go back to the default line. See [Requesting Events & Rooms](../../b1-church/events/requesting-events.md) for what members see.

## Changing Who a Request Is For

If you entered a request on a member's behalf, for example when they called the office, it is listed under your name. Click the swap icon beside the name under **Requested by** (in either section, on **Pending** or **History**), search for the member, and click **Move to this person**. The whole request moves: the event request and every room and resource booking on it. The member then receives the approve or reject notification, sees the request under **My Requests** in the B1 app, and it appears in the requests section of their person record. Moving a request does not change whether it is approved.

## History

Approved and rejected requests stay on the page. Click **History** at the top of Approvals to see them; click **Pending** to go back to the open requests.

- **Room & Resource Requests** lists each decided booking with the event, the room or resource, **Requested by**, an **Approved** or **Rejected** badge, and **Decided**, which shows who made the decision and on what date. The most recently decided requests are listed first.
- **Event Requests** lists each decided event with its description, **Requested by**, an **Approved** or **Rejected** badge, and **Decided**, which shows who made the decision and on what date. Older event requests, decided before B1 started recording this, show a dash instead.

You can change your mind from History: an approved request has a **Reject** action and a rejected one has an **Approve** action. Rejecting an event request you had approved takes it back off the public calendar. Event requests can also be edited or deleted here.

Click a name under **Requested by** to open that person's record.

## Related Articles

- [Rooms, Resources & Scheduling](./rooms-resources.md) — configure bookable rooms and resources
- [Creating Calendars](./creating-calendars.md) — manage calendars and events
- [Requesting Events & Rooms](../../b1-church/events/requesting-events.md) — how members submit requests
