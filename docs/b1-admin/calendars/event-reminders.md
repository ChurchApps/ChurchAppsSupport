---
title: "Event Reminders"
description: "Set up event reminders in B1 Admin for push, email, and text, choosing timing, recipients, and a custom message so people get notified on time."
---

# Event Reminders

<div class="article-intro">

Event reminders automatically notify the right people before an event happens -- for example, "Don't miss it! The healthcare workshop starts tomorrow at 9:00 AM." You configure a reminder once on the event, and B1 sends it out on schedule through push notifications, email, and, if your church has texting set up, text messages. Members can control which reminders they receive from their own [Notification Preferences](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Create the event you want to remind people about (see [Creating Calendars](./creating-calendars.md))
- To reach registered attendees, [enable registration](./creating-calendars.md) on the event
- To reach a whole group, make sure the event belongs to a [group](../groups/creating-groups.md) with members

</div>

## Setting Up a Reminder

You configure reminders in the **Reminders** section of the event. Expand it to see the settings.

- When you **create a new event**, expand the **Reminders** section at the bottom of the **New Event** editor; the reminder is saved when you save the event.
- For an **existing event**, use the **Reminders** section in any of these places, and click the **Save** button inside the section: the dialog that opens when you click the event on a calendar, the **Edit Event** editor, or the event's registration page (**Calendars > Registrations**, then the event).

1. Turn on **Enable reminders**.
2. Choose **When (up to 3)** to send: **7 days before**, **3 days before**, **1 day before**, and **Day of**. **1 day before** starts out picked. Once three are picked, the others are disabled and the section says "Maximum of 3 times selected" until you unpick one. **Save** is disabled while no time is picked.
3. Set the **Time of day** the reminder should go out (default is **9:00 AM**, in your church's [time zone](../settings/church-settings.md#time-zone)).
4. Choose **Who** should be reminded (see [Who Gets Reminded](#who-gets-reminded) below).
5. Optionally add a **Message (optional)**. Leave it blank to use the default wording, or write your own -- you can include `{{eventTitle}}` and it will be replaced with the event's name.
6. Choose the **Channels**: **Push** notification and **Email** (both on by default), and, if your church has a [texting provider](../settings/church-settings.md#texting) connected, **Text**.
7. Click **Save** (or save the new event).

To stop reminders for an event, turn off **Enable reminders** and save.

On an event that's already saved, a **live preview** shows roughly how many people will be reminded (*~24 people will be reminded*), how many attendees can't be reached (*2 unlinked attendees*), and the next scheduled send times (*Next: Mar 3, 9:00 AM, Mar 9, 9:00 AM*) as you make changes -- so you can confirm the reminder looks right before you save. A brand-new event has no preview until it's been saved.

### Sending a Reminder Right Away {#send-now}

Next to **Save** on a saved event is a **Send now** button. It sends the reminder immediately to everyone the **Who** setting covers, using the channels you picked -- handy for a last-minute change or a reminder you forgot to schedule. **Send now** is only available once the reminder has been saved with **Enable reminders** on; save your changes first so the message and recipients are current. Afterwards a line reports the result, for example *Sent to 24 people*, or with the **Text** channel on, *Sent to 24 people · 20 texted, 4 skipped* followed by why texts were skipped. Sending now does not change the scheduled reminders, which still go out at their set times.

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
With both **Push** and **Email** checked, each reminder is delivered as a push notification to the member's signed-in devices and as an email at the same time -- the email is not held back for people whose push fails. Members choose which channels actually reach them, per notification type, in their [Notification Preferences](../../b1-church/getting-started/notification-preferences.md), so someone who has turned off email for event reminders only gets the push.
:::

## Text Reminders

The **Text** channel only appears when your church has a texting provider connected. Texts go out through your church's texting provider, and each text may cost your church. They are sent in addition to any push or email reminder, and only to people who:

- Turned on **Text messages** in their [Notification Preferences](../../b1-church/getting-started/notification-preferences.md), and
- Have a mobile number on their profile.

Staff with permission to send texts can turn **Text reminders** on for a person from that person's [record](../people/adding-people.md#text-reminders), on the line under their mobile number. When you click **Send now** on a reminder that includes **Text**, B1 shows how many people were texted and how many were skipped, for example *Sent to 2 people · 1 texted, 1 skipped*.

Each text starts with your church's name, is kept to a single text message, and ends with "Reply STOP to opt out." Anyone who replies STOP stops receiving texts from your church. For STOP replies to reach B1, paste the **Inbound (STOP) webhook URL** from your [texting settings](../settings/church-settings.md#texting) into your provider's inbound message webhook.

## What Members Can Control

Reminders always respect each member's [Notification Preferences](../../b1-church/getting-started/notification-preferences.md). A member can:

- Turn **Event Reminders** off for push, email, or text while keeping other notifications on.
- Turn text reminders on or off with **Text messages**.
- Set **quiet hours** so non-urgent notifications wait until a reasonable time.

You can't override a member's choice to opt out of event reminders -- this keeps B1 compliant with anti-spam rules and keeps members in control of their inbox.

## Serving Reminders

Volunteers scheduled on a plan receive a separate **serving reminder** with the plan details and, when they haven't responded yet, **Accept / Decline** buttons right in the email. Those reminders are configured on the plan type rather than on a calendar event, and can also go out by text -- see [Volunteer Reminders](../serving/plans.md#volunteer-reminders) and [Sunday Volunteers](../guides/sunday-volunteers.md) for how volunteer scheduling and reminders work.

## Next Steps

- [Notification Preferences](../../b1-church/getting-started/notification-preferences.md) -- What members can control
- [Managing Registrations](./managing-registrations.md) -- The registration page where reminders can also be set
- [Event Registration Guide](../guides/event-registration.md) -- Set up registration so reminders can reach attendees
- [Creating Calendars](./creating-calendars.md) -- Return to calendar setup
