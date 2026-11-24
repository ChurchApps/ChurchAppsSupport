---
title: "Managing Registrations"
description: "Use the Registrations pages in B1 Admin to find events taking sign-ups, read the roster, filter it, add attendees, view answers, export a CSV, share the event link, and cancel, restore, promote, or delete registrations."
---

# Managing Registrations

<div class="article-intro">

Once registration is turned on for an event, the **Registrations** pages in B1 Admin are where you watch sign-ups come in and work the roster. The list page shows every event that takes registrations with how full it is; an event's own page shows each registration with its people, attendee types, payments, and status, plus the actions you need on event day and in the weeks before it.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Turn on registration for at least one event -- see [Enabling Event Registration](./creating-calendars.md#enabling-event-registration)
- You need the **Edit Content** permission to open the Registrations pages. To see the roster you also need **View Registrations**, and to change anything on it (add attendees, cancel, restore, promote, delete, record payments, send balance reminders, or edit attendee types, selections, and discount codes) you need **Edit Registrations**. All three are in the **Content** section of [Roles & Permissions](../settings/roles-permissions.md). A leader of the event's group can read the roster without **View Registrations**.

</div>

## The Registrations List

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Calendars**, and click **Registrations** (or go to **/registrations**).
2. The **Event Registrations** page lists every event with registration enabled in a table with **Event**, **Date**, **Registrations**, and **Tags** columns. The **Registrations** column shows the count of registrations, or a `count / capacity` bar when the event has a **Capacity**; the bar turns red at or over capacity.
3. Click **Upcoming** (the default, soonest first) or **Past** (most recent first) to switch lists. An event moves to **Past** once it has ended; a repeating event stays upcoming while it has another date ahead. The line above the table says how many events are shown.
4. Type in **Search events** to filter by title or tag, and click **Clear** to reset it.
5. Click an event's name to open its registration page.

The **Turn on registration** button at the top (and the **Calendars** link beside it) takes you to your calendars, because registration is switched on from the event itself: click the event on a calendar and choose **Manage Registrations**. If no event has registration yet, the page says "No events have registration enabled yet." with the same shortcut.

## The Event's Registration Page

The event's page (**/registrations/** followed by the event id) has two areas.

The **left column** shows the event's title and date and these controls:

- **Edit settings** -- Opens the **Registration Settings** card in place of the roster. This is where you turn registration on or off and set capacity, dates, questions, and prices; see [Enabling Event Registration](./creating-calendars.md#enabling-event-registration) and [Paid Registrations](./paid-registrations.md). Click **Registrations** (or the back link) to return to the roster.
- **Event Registrations** -- Goes back to the list page.
- A **registered** tally that counts **people**: the registrant plus everyone on each pending or confirmed registration, so a family of four counts as four. With a **Capacity** it reads `people / capacity` with a progress bar that turns red when full. If anyone is waitlisted, a line shows the count, for example *3 waitlisted*.
- The event's **Tags**, when it has any.
- The event's **Reminders** section, where you can set up and send [event reminders](./event-reminders.md) without opening the event editor.

The **main area** is the **Registrations** card. Its title counts **registrations** against the capacity, for example *Registrations (18 / 20)*, because capacity limits registrations rather than people. Only pending and confirmed registrations count; when people are waitlisted the title adds *· 3 waitlisted*.

## Reading the Roster

Each row is one registration:

| Column | Meaning |
|--------|---------|
| **Name** | Everyone on the registration, separated by commas. A registration whose people could not be loaded shows **Unknown**. |
| **Members** | How many people are on the registration. |
| **Type** | The [attendee types](./paid-registrations.md#attendee-types) of the people on it, if the event uses them. |
| **Paid / Total** | For paid events, what has been paid against the total, with the outstanding balance in a warning badge when money is still owed. |
| **Status** | **Confirmed**, **Pending** (holds a spot but still owes money), **Waitlisted**, or **Cancelled**. A waitlisted registration also shows its place in line, for example *#2*. |
| **Date** | The day the registration was made. |

When the event has attendee types, chips above the table show how many active attendees have each type, for example *Adult: 14* and *Child: 9*.

### Filtering

Filter chips above the table narrow the list. Click a chip to turn it on and click it again to turn it off; you can combine them.

- **Confirmed**, **Pending**, **Waitlisted**, and **Cancelled** -- Show one status. A chip appears only when at least one registration has that status.
- One chip per attendee type -- Shown when the event has more than one type. Shows registrations with at least one attendee of that type.
- **Balance due** -- Shows registrations that still owe money. Shown only when someone owes.
- **Unanswered questions only** -- Shown when the event has **Registration Questions**. Shows registrations that have not answered yet.

If nothing matches, the roster says "No registrations match these filters."

## Roster Actions

The buttons at the top of the **Registrations** card:

- **Send Balance Reminder** -- Appears when anyone owes money. Emails every pending or confirmed registrant with a balance. See [Sending Balance Reminders](./paid-registrations.md#sending-balance-reminders).
- **Add Attendee** -- Registers someone who signed up offline or over the phone. On an event with attendee types, pick the **Type** first (the page says "Select an attendee type to continue." until you do), then search for the person and click them. Their registration is saved right away: free events as **Confirmed**, paid events as **Pending** with the full amount as a balance due (nothing is charged). If the event is full, the person is **Waitlisted** when the event has a waitlist (and emailed about it); otherwise you see "This event is at capacity." A person who is already on another active registration for the event cannot be added again.
- **Share** -- Opens the event's public link and QR code so people outside your database can register. See [Sharing an Event's Link](./creating-calendars.md#sharing-an-event-link).
- **Export CSV** -- Downloads a file named `registrations-` plus the event title. Each row has **Name**, **Members**, **Attendee Types**, **Selections** (with quantities), **Paid**, **Total**, **Balance**, **Status**, **Date**, and one column per registration question. Only the registrations currently shown are exported, so set your filters first. Guests who registered without a person record are listed as **Guest**.

The icons at the end of each row (hover to see their names):

- **Registration Details** -- Opens a dialog with the people on the registration and their types, the selections with quantities and prices, **Paid** and **Balance**, a **Payments** table, and the registrant's answers when the event has questions. From here you can **Edit** the registration, **Record Payment**, **Record Refund**, or **Refund** an online payment -- see [Editing a Registration](./paid-registrations.md#editing-a-registration) and [Recording Payments and Refunds](./paid-registrations.md#recording-payments-and-refunds).
- **View Answers** -- Shown when the event has **Registration Questions** and this registration answered them. Opens the submitted form.
- **Promote** -- Shown on waitlisted rows. Confirm "Promote this waitlisted registrant to confirmed?" to give them a spot. The person is emailed that a spot opened; if they owe money they stay **Pending** until it is paid. If the event is still full you see "No spot available to promote" -- raise the **Capacity** first.
- **Cancel Registration** -- Asks "Cancel this registration?" and marks it **Cancelled**. The registrant gets a cancellation email, the spot is released, and if the event has a waitlist the next person in line is promoted automatically. Payments stay on record.
- **Restore** -- Shown instead of Cancel on a cancelled row. The registration becomes **Pending** if it still owes money or **Confirmed** if it does not. B1 refuses, with a message, when the event is now at capacity, an attendee type on it is full, its discount code has no uses left, or the person has registered again on another registration since.
- **Delete** -- Asks "Permanently delete this registration?" and removes it for good. A registration with any payments cannot be deleted: B1 shows "This registration has payments, so it can't be deleted. Cancel it instead to keep the payment records." Deleting also frees a spot for the waitlist.

:::tip
On event day, filter by **Confirmed** and **Pending** and use **Export CSV** for a check-in sheet, or keep this page open and use **Add Attendee** for walk-ups.
:::

## Related Articles

- [Enabling Event Registration](./creating-calendars.md#enabling-event-registration) -- turn registration on and set capacity, dates, questions, and the confirmation message
- [Paid Registrations](./paid-registrations.md) -- attendee types, selections, discount codes, payments, refunds, and balance reminders
- [Event Reminders](./event-reminders.md) -- remind registrants before the event
- [Registering for Events](../../b1-church/events/registering.md) -- what members see when they sign up
- [My Registrations](../../b1-church/events/my-registrations.md) -- how members pay balances and cancel
