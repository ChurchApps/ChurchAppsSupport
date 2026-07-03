---
title: "Creating Calendars"
---

# Creating Calendars

<div class="article-intro">

Creating a calendar in B1 Admin lets you build a curated view of events by connecting one or more groups. Events are managed by group leaders within their groups, and your calendar displays those events in one place. Even a domain admin cannot add or edit events directly in the calendar section unless they are a leader of the group the events belong to.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up the [groups](../groups/creating-groups.md) whose events you want to include in your calendar
- You need administrative access to the Calendars section in B1 Admin

</div>

## Creating a New Calendar

1. In the B1 Admin, navigate to **Website**, then to the **Calendars** section.
2. Click **Add Calendar**.
3. Enter a **name** for your calendar (for example, "Youth Ministry Events" or "Main Church Calendar").
4. Add an optional **description** to help your team understand what this calendar is for.
5. Click **Create** to save your new calendar.

## The Calendar Detail Page

After creating a calendar, click on it to open the detail page. This page has two main areas:

- **Left column** -- A view of the calendar showing events pulled in from connected groups.
- **Right column** -- The associated groups list. This is where you manage which groups are included in this calendar.

## Connecting Groups

Groups that have events in the calendar automatically appear in the groups list on the right side of the detail page.

1. Click **Add** in the groups section to associate a group with your calendar.
2. Select the group from the dropdown.
3. Choose whether to include **all events** from that group or only **specific events**.
4. Click **Save**.

:::tip
Connecting groups to your calendar is a powerful way to automatically aggregate events. When a group leader adds an event to their [group](../groups/creating-groups.md), it can flow into your church-wide calendar without any extra work from you.
:::

:::info
If you want to create a single calendar that pulls events from many groups across your church, see [Curated Calendar](curated-calendar) for a streamlined approach.
:::

## Enabling Event Registration

You can enable registration for any calendar event so members can sign up through the B1 website or mobile app.

1. Click on an existing event or create a new one.
2. In the event editor, toggle **Registration** to enable it.
3. Configure the registration settings:
   - **Capacity** (optional) -- Set a maximum number of registrations. Leave blank for unlimited.
   - **Registration Opens** -- The date and time when registration becomes available.
   - **Registration Closes** -- The date and time when registration closes.
   - **Tags** -- Comma-separated labels (e.g., "youth, retreat, vbs") to help categorize registerable events.
   - **Registration Questions** -- Optionally attach a [form](../forms/creating-forms.md) so registrants answer extra questions (dietary restrictions, T-shirt size, emergency contact, etc.) as part of signing up. Choose **None** to skip questions.
   - **Enable Waitlist** -- When the event fills up, let additional registrants join a waitlist instead of being turned away. See [Paid Registrations](paid-registrations#waitlist).
4. Save the event.

For paid events, the same settings page lets you define priced **Attendee Types**, optional **Selections** (add-ons), and **Discount Codes**, with payment collected through your church's giving provider. See [Paid Registrations](paid-registrations) for the full walkthrough.

Once registration is enabled, members will see a **Register for this Event** button when they view the event on the [B1 website](../../b1-church/events/registering) or [B1 Mobile app](../../b1-mobile/events/registering). If you attached a form, registrants see a **Questions** step during registration and their answers are saved with their registration.

:::info
Registration Questions only works with forms that are **not** marked Restricted. A restricted form is skipped automatically during registration rather than shown, so use an unrestricted form when attaching questions to an event.
:::

### Managing Registrations

To view and manage registrations for your events:

1. Navigate to the **Registrations** page in B1 Admin.
2. You will see a table of all events with registration enabled, showing the event title, date, current registration count vs. capacity, and tags.
3. Click on an event to see the full list of registrations, including names, member count, attendee types, payment status, and registration date.
4. From the detail page, you can:
   - **Add Attendee** -- Manually register someone who signed up offline or over the phone.
   - **Cancel** individual registrations
   - **Delete** registrations permanently
   - **Promote** waitlisted registrations when a spot opens
   - **Export CSV** -- Download all registrations, including attendee types, selections, payment amounts, and question answers

If the event has Registration Questions attached, the detail page also shows an **Unanswered questions only** filter to quickly find registrants who haven't submitted answers yet, and a **View Answers** button on each answered registration to see their responses. Paid events add a **Type** column, a **Paid / Total** column, per-type counts, and a payments detail dialog -- see [Paid Registrations](paid-registrations#the-registration-roster).

:::tip
Use the capacity progress bar to monitor how quickly events are filling up. The bar turns red when an event is at or over capacity.
:::

## Next Steps

- [Curated Calendar](curated-calendar) -- Create a calendar that pulls from multiple groups
- [Paid Registrations](paid-registrations) -- Attendee types, add-on selections, discount codes, payments, and waitlists
- [Event Registration Guide](../guides/event-registration) -- Step-by-step guide for setting up event registration
- [Calendars Overview](./) -- Return to the calendars overview
