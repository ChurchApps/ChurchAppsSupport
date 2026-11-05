---
title: "Push Notifications"
---

# Push Notifications

<div class="article-intro">

The **Push Notifications** page lets you send a push notification to everyone who uses your church's B1.church app, or to one group, either right away or at a time you schedule. It also lists the notifications waiting to go out, so you can edit, send, or cancel them, and shows how recent ones were delivered.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- To send to **Everyone with the app**, you need the **Edit Content** permission. To send to a group, you need **Edit Group Members**. With either one, the **Push Notifications** page appears under **Mobile**. See [Roles & Permissions](./roles-permissions.md).
- Notifications only reach members who have installed the [B1.church app](/docs/b1-church/getting-started/installing-pwa) and allowed notifications.

</div>

## Opening the Page

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Mobile**.
2. Click **Push Notifications** (`/mobile/notifications`).

All times on the page are shown in your church's time zone (or your browser's, if the church has none set). The page says which one it is using, for example *"Times are in America/Chicago."*

## Sending or Scheduling a Notification

1. Click **Send Notification** at the top of the page.
2. Under **Audience**, choose **Everyone with the app** or one of your groups.
3. Fill in the notification:
   - **Title** *(required)* -- A short summary, up to 80 characters.
   - **Message** *(required)* -- The notification body, up to 240 characters.
   - **Open link or flyer URL** *(optional)* -- A relative app path (for example, `/mobile/groups`) or a full `https://` URL that opens when the notification is tapped. Without a link, a church-wide notification opens the member's notification list, and a group notification opens that group.
   - **Image URL** *(optional)* -- An `https://` image shown with the notification on supported devices.
4. Under **When**, choose **Send now**, or **Schedule for later** and pick a **Send at** date and time. The time must be in the future.
5. Click **Send Notification** (or **Schedule Notification** for a scheduled one).

A preview in the dialog shows how the notification will look and how many people can receive it. A notification sent now needs at least one reachable person. A scheduled one can be saved even when nobody is reachable yet, because the recipients are checked again when it goes out.

After scheduling, the dialog confirms the send time and reminds you that you can see, edit, or cancel it under **Mobile > Push Notifications**.

:::tip
You can also send or schedule a notification to one group from that group's page with its **Notify** button. See [Sending Push Notifications to Group Members](../groups/group-members.md#sending-push-notifications-to-group-members).
:::

## Managing Scheduled Notifications

The **Scheduled** card lists notifications waiting to go out, with their **Send at** time, **Audience**, and **Notification** text. Each one has three actions:

- **Edit** -- Change the title, message, link, image, or send time. The audience can't be changed; cancel the notification and create a new one instead.
- **Send now** -- Send it right away instead of waiting. Confirm with **Send now**.
- **Cancel** -- Stop it from going out. Confirm with **Cancel notification**.

When nothing is waiting, the card says *"Nothing is scheduled."*

## Reviewing Recent Notifications

The **Recent** card lists notifications that have been sent or stopped, with their **Sent at** time, **Audience**, **Notification** text, and **Status**:

- **Sent: X of Y** -- How many of the people in the audience it reached.
- **Failed** -- Sending failed, with the error. B1 tries a failed send up to three times before marking it failed.
- **Cancelled** -- Someone cancelled it before it went out.
- **Missed (the send time passed)** -- It could not go out within 30 minutes of its send time, so it was skipped rather than sent late.

## Who Receives a Notification

- **Everyone with the app** reaches every person in your church who has installed the B1.church app with notifications allowed, except the person who sent it.
- A group notification reaches the group's members who have the app with notifications allowed.
- Members who turned push off for **Church Announcements** in their [Notification Preferences](/docs/b1-church/getting-started/notification-preferences) don't get church-wide notifications.

## Related Articles

- [Sending Push Notifications to Group Members](../groups/group-members.md#sending-push-notifications-to-group-members)
- [Mobile App Settings](./mobile-app.md)
- [Event Reminders](../calendars/event-reminders.md)
- [Notification Preferences](/docs/b1-church/getting-started/notification-preferences)
