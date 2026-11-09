---
title: "Push Notifications"
description: "Send or schedule push notifications to everyone with your church's app or to one group from B1 Admin, then edit, send, cancel, or clear them."
---

# Push Notifications

<div class="article-intro">

The **Push Notifications** page under **Mobile** lets you send a push notification to everyone who uses your church's app, or to the members of one group, right away or at a time you choose. It lists what is scheduled, so you can edit, send, or cancel a notification before it goes out, and shows a history of recent notifications that you can clear.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- To send to **Everyone with the app**, you need permission to edit content. To send to a group, you need permission to edit group members. See [Roles & Permissions](./roles-permissions.md).
- Members receive pushes only after they [install your church's app](../../b1-church/getting-started/installing-pwa.md) and allow notifications.

</div>

## Opening the Page

In B1 Admin, go to **Mobile** and click **Push Notifications**. The page has a **Scheduled** card and a **Recent** card. Times on the page are shown in your church's time zone (or your computer's, if the church has none set), which is named above the Scheduled list.

## Sending or Scheduling a Notification

1. Click **Send Notification**.
2. Pick the **Audience**: **Everyone with the app**, or one of your groups. You only see the choices your permissions allow.
3. B1 shows how many people the push will reach -- for example, *42 of 60 people using the app have push enabled* -- and how many have push turned off. You are left out of your own push.
4. Under **When**, choose **Send now**, or **Schedule for later** and pick a **Send at** date and time in the future.
5. Enter a **Title** (up to 80 characters) and a **Message** (up to 240 characters).
6. Optionally add an **Open link or flyer URL** (an `https` address or an app path such as `/mobile/groups`) for the push to open, and an **Image URL** (an `https` address) to show with it.
7. Click **Send Notification** (or **Schedule Notification**).

For a scheduled push, the people it reaches are checked again when it goes out, so anyone who joins the group or turns on notifications in the meantime is included.

You can also send to a group from the group's own page with **Notify**. See [Sending Push Notifications to Group Members](../groups/group-members.md#sending-push-notifications-to-group-members).

:::tip
When a push has no link, tapping it opens the app's notification list for a church-wide push, or the group's page for a group push.
:::

## Managing Scheduled Notifications

The **Scheduled** card lists each notification waiting to go out, with its **Send at** time, **Audience**, title, and message. For each one you can:

- **Edit** -- change the audience, time, or text, then click **Save Changes**.
- **Send now** -- send it right away instead of waiting.
- **Cancel** -- stop it from being sent. A cancelled notification moves to the Recent card.

A notification that is going out right now shows **Sending** and can't be changed.

## Recent Notifications

The **Recent** card lists notifications that have gone out or stopped, with a **Status** for each:

| Status | Meaning |
|--------|---------|
| **Sent: X of Y** | The push went out. *Y* people could receive it, and *X* got it as a push notification. |
| **Missed (the send time passed)** | The notification was more than 30 minutes late when B1 tried to send it, so it was not sent. |
| **Failed** | Sending failed three times. The error is shown under the status. |
| **Cancelled** | Someone cancelled it before it went out. |

To remove one notification from the list, click **Remove** on its row. To empty the list, click **Clear all** at the top of the card; this removes every sent, failed, and cancelled notification you have permission to manage. Both ask you to confirm, and neither can be undone. Removing a notification does not take it back from people who already got it.

:::info
Members who turned off **Church Announcements** in their [notification preferences](../../b1-church/getting-started/notification-preferences.md) don't get these pushes, whether they are sent to everyone or to a group.
:::

## Related Articles

- [Mobile App Settings](./mobile-app.md)
- [Group Members](../groups/group-members.md)
- [Roles & Permissions](./roles-permissions.md)
- [Notification Preferences](../../b1-church/getting-started/notification-preferences.md)
