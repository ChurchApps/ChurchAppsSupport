---
title: "Creating Calendars"
description: "Create a calendar in B1 Admin, connect groups or import .ics files, and manage its events, registrations, and notes from one place."
---

# Creating Calendars

<div class="article-intro">

Creating a calendar in B1 Admin lets you build a curated view of events by connecting one or more groups. Events are managed by group leaders within their groups, and your calendar displays those events in one place. Admins with edit access can add or edit events for any group. Non-admin group leaders can only manage events for groups they lead.

</div>

## Training Video

<YouTube id="Ko3kgsCSLFs" title="Creating Calendars, Events, and Room Bookings in B1" next="Event Registration and Paid Events in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up the [groups](../groups/creating-groups.md) whose events you want to include in your calendar
- You need the **Edit Content** permission

</div>

## Creating a New Calendar

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Calendars**, and click **Calendars**.
2. Click **Add Calendar** at the top of the page. The new calendar form opens below the calendar list.
3. Enter a **Calendar Name** (for example, "Youth Ministry Events" or "Main Church Calendar").
4. Click **Create** to save your new calendar.

To rename or delete a calendar later, hover over its row on the Calendars page and click **Edit** (or click **Edit** on the calendar's detail page).

## The Calendar Detail Page

After creating a calendar, click its name (or hover over its row and click **Manage Events**) to open the detail page. This page has two main areas:

- **Left column** -- The calendar's name with its actions (**New Event**, **Edit**, **Import .ics**, and **Print**), a link to any pending approvals, and the **Groups in Calendar** list showing which groups are included in this calendar. Click **Remove** next to a group to take it off the calendar.
- **Main area** -- The **Calendar Events** view showing events pulled in from connected groups, with the **Subscribe** and **Add Group** buttons above it. Use **Today**, **Back**, **Next**, and the **Month**, **Week**, **Day**, and **Agenda** views to move around.

## Connecting Groups

Groups that have events in the calendar automatically appear in the **Groups in Calendar** list on the left side of the detail page.

1. Click **Add Group** above the calendar to associate a group with your calendar.
2. Choose the group in **Select a Group**. The list includes every group in your church, not just the groups you belong to.
3. Choose **Add all the events of the group**, or **Add specific events** and click each event you want on the small calendar that appears.
4. Click **Save**.

Each event appears on the calendar only once. If you add a whole group, any of its events you had already added one at a time are folded into the group entry, and picking specific events from a group that is already on the calendar adds nothing new. Only groups added as a whole are listed under **Groups in Calendar**.

### Importing an .ics File

Click **Import .ics** to bring in events from another calendar. Choose the **Group** the events should belong to, then click **Choose .ics file** or paste the file's contents, and click **Import**. The events are created in that group, and the group is added to the calendar you imported from, so the events show up there right away.

### Removing an Event from the Calendar

Click an event on the calendar, then click **Remove from Calendar**. This only takes the event off this calendar -- the event itself stays in its group. If the event is on the calendar because its whole group was added, removing it takes all of that group's events off this calendar (the events still stay in the group). To delete an event for good, delete it from the [group's calendar](../groups/group-calendar.md).

:::tip
Connecting groups to your calendar is a powerful way to automatically aggregate events. When a group leader adds an event to their [group](../groups/creating-groups.md), it can flow into your church-wide calendar without any extra work from you.
:::

:::info
If you want to create a single calendar that pulls events from many groups across your church, see [Curated Calendar](./curated-calendar.md) for a streamlined approach.
:::

## Adding and Editing Events {#adding-and-editing-events}

Click **New Event** on the calendar detail page to add an event, or click an event on the calendar and then click **Edit** to change it. The **New Event** / **Edit Event** form has these fields:

- **Group** -- The group the event belongs to. If your church has event templates, you can also pick a **Template** to fill in the form.
- **Title**
- **Event photo** -- Click **Add Photo** (or the empty photo box) to choose or upload an image, cropped to a wide 16:9 shape. Click **Change Photo** to replace it. The photo is shown at the top of the event's page on your website and as its tile when a Calendar element shows **Upcoming events** (see [Showing Events on Your Website](#showing-events-on-your-website)).
- **Description** -- Shown on the event's page on your website. Bold text, lists, and links are supported.
- **Start** and **End**, **Repeats**, and **Visibility** (**Public** or **Private**).
- **Tags** -- Comma-separated labels, such as `youth, students`. A Calendar element on your website can be set to show only events with a certain tag. This is the same **Tags** field shown in the event's registration settings.
- **Who can view notes** and **Who can post notes** -- Who can read and add to the event's notes (see [Event Notes](#event-notes)). Choose **Staff only** (the default), **Group leaders** (leaders of the event's group), or **Group members** (everyone in the event's group, including its leaders).
- **Rooms** and **Resources** -- Reserve space and equipment for the event. See [Rooms, Resources & Scheduling](./rooms-resources.md). Once one is picked you can also add setup and teardown time or a custom reservation window -- see [Booking a Room or Resource](./availability.md#booking-a-room-or-resource).
- **Reminders** -- Expand this section to send reminders before the event. See [Event Reminders](./event-reminders.md).

**Group**, **Title**, **Start**, and **End** are required, and the end must be after the start. Click **Save**. If the event repeats, B1 asks you to confirm, because saving updates every occurrence in the series. To delete an event, open it in the editor and click **Delete**.

### Event Notes {#event-notes}

Each event has its own notes thread for planning and follow-up. Click an event on the calendar detail page; the dialog shows the event's details, its reminders, and its **Notes** below, with **Edit**, **Manage Registrations**, and **Remove from Calendar** buttons. Type a note and post it to add it to the thread.

Staff with permission to edit content or administer calendars can always read and post event notes. The **Who can view notes** and **Who can post notes** settings on the event decide whether the event group's leaders or members can too.

### Showing Events on Your Website {#showing-events-on-your-website}

To put a calendar on your website, add a **Calendar** element to a page and choose this calendar. The element can show a month calendar or a grid of upcoming-event tiles, and can be limited to events with one tag. Visitors who click an event open its own event page. See [Using the Calendar element](../website/page-editor.md#using-the-calendar-element).

## Enabling Event Registration {#enabling-event-registration}

You can enable registration for any calendar event so members can sign up through the B1 website or mobile app.

1. Click an existing event on the calendar (create it first if needed) and click **Manage Registrations**. The event's registration page opens. (The **Turn on registration** button on the **Registrations** page takes you to your calendars to pick an event.)
2. Click **Edit settings**, then turn on **Enable Registration** in the **Registration Settings** card.
3. Configure the registration settings:
   - **Capacity** (optional) -- Set a maximum number of registrations. Leave blank for unlimited.
   - **Registration Opens** -- The date and time when registration becomes available.
   - **Registration Closes** -- The date and time when registration closes.
   - **Tags** -- Comma-separated labels (e.g., "youth, retreat, vbs") to help categorize registerable events.
   - **Registration Questions** -- Optionally attach a [form](../forms/creating-forms.md) so registrants answer extra questions (dietary restrictions, T-shirt size, emergency contact, etc.) as part of signing up. Choose **None** to skip questions.
   - **Enable Waitlist** -- When the event fills up, let additional registrants join a waitlist instead of being turned away. See [Paid Registrations](./paid-registrations.md#waitlist).
4. Click **Save Settings**.

For paid events, the same settings page lets you define priced **Attendee Types**, optional **Selections** (add-ons), and **Discount Codes**, with payment collected through your church's giving provider. See [Paid Registrations](./paid-registrations.md) for the full walkthrough.

Once registration is enabled, members will see a **Register for this Event** button when they view the event on [B1.church or in the B1 App](../../b1-church/events/registering.md). If you attached a form, registrants see a **Questions** step during registration and their answers are saved with their registration.

:::info
Registration Questions only works with forms that are **not** marked Restricted. A restricted form is skipped automatically during registration rather than shown, so use an unrestricted form when attaching questions to an event.
:::

### Managing Registrations

To view and manage registrations for your events:

1. In the Jump menu, choose **Calendars > Registrations**.
2. You will see a table of all events with registration enabled, showing the event title, date, current registration count vs. capacity, and tags. Type in **Search events** to filter it.
3. Click an event's name to see the full list of registrations, with **Name**, **Members**, **Type**, **Paid / Total**, **Status**, and **Date** columns.
4. From the detail page, you can:
   - **Add Attendee** -- Manually register someone who signed up offline or over the phone.
   - **Cancel Registration** on individual registrations (asks you to confirm)
   - **Delete** registrations permanently (asks you to confirm)
   - **Promote** waitlisted registrations when a spot opens
   - **Export CSV** -- Download all registrations, including attendee types, selections, payment amounts, and question answers

   These row actions are icons at the end of each row; hover over an icon to see its name.

If the event has Registration Questions attached, the detail page also shows an **Unanswered questions only** filter to quickly find registrants who haven't submitted answers yet, and a **View Answers** button on each answered registration to see their responses. Events with attendee types also show per-type counts above the table, and every row has a **Registration Details** dialog with payments -- see [Paid Registrations](./paid-registrations.md#the-registration-roster).

The left side of the detail page shows how many people are registered (the registrant plus everyone on their registration), with a capacity bar, any waitlist count, the event's tags, and its **Reminders**. The **Registrations** card title counts registrations instead, which is what capacity limits -- so a family of four is one registration but four people.

:::tip
Use the capacity progress bar on the Registrations page to monitor how quickly events are filling up. The bar turns red when an event is at or over capacity.
:::

## Next Steps

- [Curated Calendar](./curated-calendar.md) -- Create a calendar that pulls from multiple groups
- [Paid Registrations](./paid-registrations.md) -- Attendee types, add-on selections, discount codes, payments, and waitlists
- [Event Registration Guide](../guides/event-registration.md) -- Step-by-step guide for setting up event registration
- [Calendars Overview](./index.md) -- Return to the calendars overview
