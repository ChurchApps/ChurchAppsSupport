---
title: "Event Reminders"
---

# Event Reminders

<div class="article-intro">

Event reminders automatically notify the right people before an event happens -- for example, "Don't miss it! The healthcare workshop starts tomorrow at 9:00 AM." You configure a reminder once on the event, and B1 sends it out on schedule through push notifications and email. Members can control which reminders they receive from their own [Notification Preferences](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Create the event you want to remind people about (see [Creating Calendars](creating-calendars))
- To reach registered attendees, [enable registration](creating-calendars) on the event
- To reach a whole group, make sure the event belongs to a [group](../groups/creating-groups) with members

</div>

## Setting Up a Reminder

You configure reminders in the **Reminders** section of the event.

- When you **create a new event**, expand the **Reminders** section in the event editor before saving.
- For an **existing event**, open the event's **Registration Details** page (from the **Registrations** section) to add or change its reminder.

1. Turn on **Enable reminders**.
2. Choose **When** to send. Pick up to three timings: **7 days before**, **3 days before**, **1 day before**, and **Day of**.
3. Set the **Time of day** the reminder should go out (default is **9:00 AM**, in your church's local time zone).
4. Choose **Who** should be reminded (see [Who Gets Reminded](#who-gets-reminded) below).
5. Optionally add a **Message**. Leave it blank to use the default wording, or write your own -- you can include `{{eventTitle}}` and it will be replaced with the event's name.
6. Choose the **Channels**: **Push** notification, **Email**, or both.
7. Save the event.

As you make changes, a **live preview** shows roughly how many people will be reminded, how many attendees can't be reached, and the next scheduled send times -- so you can confirm the reminder looks right before you save.

## Who Gets Reminded

The **Who** setting controls who the reminder goes to:

- **Registrants only** -- Everyone registered for the event who is linked to a person record. This is the default when the event has registration enabled, so a reminder for a small registered event never accidentally goes to a whole group.
- **Heads / registrants only** -- One reminder per registration (the person who registered), rather than every family member on the registration.
- **Group members** -- Everyone in the event's group. This is the default when the event does not use registration.
- **Auto** -- Uses registrants when registration is enabled, otherwise the group.

:::info
Guests added by name only (without a linked person record) can't receive a reminder, because there's no account, device, or email to send to. The preview tells you how many attendees fall into this group so there are no surprises. Members who have opted out of communication are also skipped.
:::

## When Reminders Are Sent

- Reminders fire at the **time of day you choose**, in your church's local time zone, on each of the offsets you selected.
- If you **change the event's date or time**, the pending reminders are automatically rescheduled -- you don't need to edit the reminder.
- If you **delete the event** (or cancel a single occurrence of a recurring event), its pending reminders are automatically cancelled.
- Recurring events are handled automatically: each upcoming occurrence gets its own reminder.

:::tip
Reminders are sent **push first, with email as a fallback**. If a member has push notifications enabled, they'll get a push; if not, they'll get an email instead. Members choose which channels they want per notification type in their [Notification Preferences](../../b1-church/getting-started/notification-preferences).
:::

## What Members Can Control

Reminders always respect each member's [Notification Preferences](../../b1-church/getting-started/notification-preferences). A member can:

- Turn **Event Reminders** off for push or email while keeping other notifications on.
- Set **quiet hours** so non-urgent notifications wait until a reasonable time.

You can't override a member's choice to opt out of event reminders -- this keeps B1 compliant with anti-spam rules and keeps members in control of their inbox.

## Serving Reminders

Volunteers scheduled on a plan receive a separate **serving reminder** with the plan details and, when they haven't responded yet, **Accept / Decline** buttons right in the email. Those reminders are configured on the plan type rather than on a calendar event -- see [Sunday Volunteers](../guides/sunday-volunteers) for how volunteer scheduling and reminders work.

## Next Steps

- [Notification Preferences](../../b1-church/getting-started/notification-preferences) -- What members can control
- [Event Registration Guide](../guides/event-registration) -- Set up registration so reminders can reach attendees
- [Creating Calendars](creating-calendars) -- Return to calendar setup
