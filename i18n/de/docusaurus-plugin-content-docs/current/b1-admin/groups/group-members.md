---
title: Gruppenmitglieder
---

# Group Members

<div class="article-intro">

Once you have created a group, the next step is adding members. From a group's detail page you can search for people, add them to the group, assign leaders, send messages, and export the member list. Managing group membership is essential for coordinating small groups, committees, and classes.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need at least one group set up in B1 Admin. See [Creating Groups](creating-groups.md) if you haven't created one yet.
- The people you want to add must already exist in your [People](../people/adding-people.md) directory.

</div>

## Adding Members to a Group

1. Navigate to the **Groups** page and click on the group you want to manage.
2. Click the **Members** tab.
3. In the search box, type the name of the person you want to add.
4. Click **Add** next to the person's name in the search results.
5. The person now appears in the group member list.

:::tip
Leave the search box blank and click **Search** to browse through your entire directory. This is helpful if you are not sure of the exact spelling of someone's name.
:::

## Designating Group Leaders

Group leaders have special privileges -- they can edit the [group calendar](group-calendar.md), manage events, and help coordinate the group.

1. In the group member list, find the person you want to make a leader.
2. Click the **green key icon** next to their name.
3. The person is now designated as a group leader.

To remove leader status, click the green key icon again.

:::info
Any group member can view the group calendar and events, but only leaders can add or edit calendar events.
:::

## Sending Messages to Group Members

You can communicate with all members of a group directly from B1 Admin:

1. From the group detail page, look for the messaging area.
2. Type your message in the text box.
3. Click **Send**.

Your message will be delivered to all members of the group.

## Emailing Group Members

You can send formatted emails to all members of a group:

1. From the group detail page, click the **email icon**.
2. The Send Email dialog opens, showing how many members will receive the email and how many have no email address on file.
3. Optionally select an **email template** from the dropdown, or compose a message from scratch. Click **Manage Templates** to create or edit templates.
4. Enter a **subject line**. You can insert merge fields by clicking the field chips: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Compose the **email body** using the HTML editor. The same merge fields are available here.
6. Click **Send**.
7. A summary shows how many emails were sent successfully and how many members were skipped (no email on file).

:::tip
Create reusable email templates for recurring communications like weekly updates, event announcements, or prayer requests. Templates save time and ensure consistent messaging.
:::

### Turning On Group Email for Your Church

All churches on B1 send email from the same address, so they share one sending reputation. To keep everyone's email out of spam folders, the ChurchApps team reviews each church once before it can send group email.

If your church has not been reviewed yet, the Send Email dialog shows **Group email needs a quick review** instead of the message editor:

1. Click **Request review**. The ChurchApps support team is notified.
2. The dialog changes to **Review requested**. You can close it.
3. Group email is usually turned on within one business day. Open the Send Email dialog again after that to send your message.

Until your church is approved, B1 also does not send [form follow-up emails](../forms/creating-forms.md#sending-a-follow-up-email) or the **Send email** step in [workflows](../serving/workflows.md).

:::info Sending limits
After approval, a church can send up to 150 church-written emails a day. The limit grows as your church builds a clean sending history, up to 2,000 a day. If recent messages bounced or were marked as spam, group email pauses and the dialog asks you to contact support. If a send would go over your daily limit, B1 does not send it and shows an error.
:::

## Exporting Group Data

To download the group member list as a file:

1. From the group detail page, click the **download icon**.
2. A CSV file containing the group's member information will download to your computer.

To print a sign-in sheet for a class instead, use **Print Roll Sheet** -- see [Printing a Roll Sheet](../attendance/recording-attendance.md#printing-a-roll-sheet).

A CSV export is useful for importing data into other tools, or keeping offline records. For more export options, see [Exporting Data](../people/exporting-data.md).

## Sending Push Notifications to Group Members

You can send a push notification directly to all group members who have the B1.church app installed on their device with push notifications enabled.

1. From the group detail page, click the **bell icon** in the header toolbar (next to the email and text icons -- the text icon appears once a [texting provider](../settings/church-settings.md#texting) is connected).
2. A dialog opens showing how many of your group's members have push enabled.
3. Fill in the notification details:
   - **Title** *(required)* -- A short summary, up to 80 characters.
   - **Message** *(required)* -- The notification body, up to 240 characters.
   - **Open link or flyer URL** *(optional)* -- A relative app path (for example, `/mobile/groups`) or a full `https://` URL that the notification opens when tapped.
   - **Image URL** *(optional)* -- An `https://` URL to an image that appears alongside the notification on supported devices.
4. A live preview shows how the notification will appear on the device.
5. Click **Send Notification**.

:::info
Push notifications are delivered only to group members who have the B1.church PWA installed and have not disabled push notifications. Members without a registered push device or with push turned off are counted as skipped, and the send summary shows how many were reached versus skipped.
:::

:::tip
After sending, the dialog shows how many notifications were queued successfully. If most members are showing as skipped, remind them to visit their B1.church site, install it as a home-screen app, and allow notifications when prompted.
:::

## Removing Members

To remove someone from a group, locate their name in the member list and click the **remove** button next to their entry.

:::info
Removing a person from a group does not delete them from your church directory. They will still appear in the [People](../people/adding-people.md) section and can be re-added to the group at any time.
:::
