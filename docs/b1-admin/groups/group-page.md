---
title: "The Group Page"
description: "Find your way around a group's page in B1 Admin: its details and status flags, the Edit, Email, Text, Notify, Share, and Duplicate actions, and the Members, Sessions, Calendar, Linked forms, Leader notes, and Health sections."
---

# The Group Page

<div class="article-intro">

Every group in B1 Admin has its own page. The left side shows who the group is and what it has turned on; the right side summarizes its members, attendance sessions, calendar, linked forms, leader notes, and health, each with a link into the full view. This page explains what you will find where, which buttons appear for which permissions, and how serving teams and confidential groups differ.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need at least one group. See [Creating Groups](./creating-groups.md).
- To open the full Groups list you need **Edit Groups**, **View Group Members**, or **View People** (or **View People Names Only** together with **View Attendance** or **Edit Attendance**). Group leaders without those permissions open their groups from **My Groups** on the [Dashboard](../dashboard.md#my-tasks-and-my-groups). See [Roles & Permissions](../people/roles-permissions.md).

</div>

## Opening a Group

Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin), expand **People**, click **Groups**, and click the group's name. Groups also open from **My Groups** on the Dashboard, from the **Groups** section of a person's profile, from the **Rooms** list on the [Attendance](../attendance/index.md) page, and from the [Group Health](./groups-health.md) table. Each group has a web address of the form **/groups/** followed by its ID, so you can bookmark one.

## The Group's Details

The left column is the group's identity:

- The group **photo** (or a generic group icon when none is set), the group's **name**, and its **category**. A serving team shows **Team** here instead of a category.
- The **Meeting Time** in large type and the **Meeting Location** beneath it, when they are filled in.
- The group's **description**, shown as plain text.
- A row of status chips, each with a green check when the setting is on and a grey cross when it is off: **Track Attendance**, **Print Nametag**, **Parent Pickup**, **Discussions**, and **Announcements**. Off states stay visible so you can tell at a glance that a chat feed or check-in option has been turned off.
- The group's **labels**, followed by the **service times** it is assigned to.

All of these come from the group's settings. See [Configuring Group Settings](./creating-groups.md#configuring-group-settings) for what each one means and how to change it.

## Actions

Below the details are the group's actions. B1 Admin only shows the ones your permissions allow:

| Action | What it does | Who sees it |
|--------|--------------|-------------|
| **Edit** | Opens the **Group Details** form, where you can also **Archive** or **Delete** the group. See [Configuring Group Settings](./creating-groups.md#configuring-group-settings). | **Edit Groups** |
| **Email** | Emails every member who has an email address. See [Emailing Group Members](./group-members.md#emailing-group-members). | **Edit Group Members** |
| **Text** | Texts every member with a mobile number who has not opted out. See [Texting Group Members](./group-members.md#texting-group-members). | **Send Text Messages**, and only once a [texting provider](../settings/church-settings.md#texting) is connected |
| **Notify** | Sends a push notification to members using the B1.church app. See [Sending Push Notifications to Group Members](./group-members.md#sending-push-notifications-to-group-members). | **Edit Group Members** |
| **Share** | Shows a link and QR code for the group's page on your B1.church site. See [Sharing a Group Link](./creating-groups.md#sharing-a-group-link). | Everyone, for regular groups that are not confidential or archived |
| **Duplicate** | Copies the group's settings into a new group. See [Duplicating a Group](./creating-groups.md#duplicating-a-group). | **Edit Groups** |

While you are editing the group, the action buttons are hidden until you save or cancel.

## Sections

The right side of the page has one short summary per area. Each summary ends with a link such as **All members** that opens the full view in the same place; click the **Back to** link with the group's name at the top to return to the summaries. (The address bar changes as you move between views, so you can bookmark or share a link straight to a group's member list or sessions.)

### Members

Shows up to six member names as chips, with **Leader** after each leader's name, then a count of members and leaders and, when people are waiting to join, how many requests are pending (for example, "2 pending"). Names are links to person records if you can view people. Click **All members** to open the member list, where you add and remove members, designate leaders, approve join requests, message members, print, and export. See [Group Members](./group-members.md) and [Group Join Requests](./group-join-requests.md).

You need **View Group Members**, **View Attendance**, or **Edit Attendance** to see the names; otherwise only the **All members** link appears.

### Sessions

For groups that track attendance, shows the date of the latest session ("Latest Mar 3, 2026") and how many sessions the group has. Click **All sessions** to open the sessions list and record attendance. See [Recording Attendance](../attendance/recording-attendance.md).

If **Track Attendance** is off, the section says "Turn on attendance tracking to record sessions and check-ins for this group." People with **Edit Groups** can click **Enable Attendance** right there to turn it on without opening the group's settings. See [Turning On Attendance Tracking from the Group Page](../attendance/recording-attendance.md#turning-on-attendance-tracking-from-the-group-page).

### Calendar

Shows the title and date of the group's next event (labeled **Next**), or of its most recent one (**Last**) when nothing is scheduled. Click **All events** to see the group's events and add a season of meetings at once. See [Group Calendar](./group-calendar.md).

### Linked forms

Appears only when at least one Stand Alone form is [linked to the group](../forms/creating-forms.md#linking-a-form-to-a-group), and only for the group's leaders and for people with **Form Admin**. Each form shows **Open** or **Closed**. Form admins can click a form to open it, or **All forms** to go to the Forms page. See [Linked Forms](./group-members.md#linked-forms).

### Leader notes

Appears only if you are a leader of this group. Shows the newest note and how many there are; click **All notes** to read and write notes that only the group's leaders can see. See [Leader Notes](./group-members.md#leader-notes).

### Health

Shows "12 members · 3 joined · 1 left in 90 days". Click **See health** for the group's membership, attendance, age, and gender charts. See [One Group's Health](./groups-health.md#one-groups-health). This section needs **View Group Members**.

## Serving Teams and Ministries

Serving teams and ministries from the [Serving](../serving/index.md) area are stored as groups and open on the same page, but they skip the summaries:

- A **team** opens straight to its member list, followed by a **Block-out dates** card where staff with **Edit Plans** record the dates volunteers can't serve. See [Block-Out Dates](../serving/plans.md#block-out-dates). The identity column shows **Team** instead of a category, and only the **Meeting Location** (no meeting time, description, or status chips). Editing a team offers just its **Group Name** and **Meeting Location**.
- A **ministry** opens straight to its member list.

Teams and ministries don't have Sessions, Calendar, or Health sections, and they are not listed on the main Groups page; manage them from **Serving**.

## Confidential Groups

A group marked **Confidential group** is left off the Groups list and its page redirects to the Dashboard for anyone who is not a member, unless they have **View Group Members**, **Edit Groups**, or **View People**. Members of the group can always open it. See [Configuring Group Settings](./creating-groups.md#configuring-group-settings).

## Who Can Do What

| To do this | You need |
|------------|----------|
| Open the Groups list and group pages | **Edit Groups**, **View Group Members**, or **View People**; or **View People Names Only** with **View Attendance** or **Edit Attendance**; or be a member (for your own groups) |
| Add a group, edit, duplicate, archive, restore, or delete a group, show archived groups, export the groups list, turn on **Enable Attendance** | **Edit Groups** |
| See member names, group health, the pending request count on a group, and print rosters | **View Group Members** (members' names also show to people who can take attendance; leaders can print their own group's roster) |
| Add and remove members, make or remove leaders, approve or decline join requests, email or notify the group, send an in-app message to members, see the **pending requests** button on the Groups page | **Edit Group Members** |
| Text the group | **Send Text Messages** plus a connected texting provider |
| Open a member's profile from the group | **View People** |
| Add sessions and save attendance | **Edit Attendance** |
| See who attended each session and the attendance counts | **View Attendance**, or lead the group |
| Add events for the group in B1 Admin | **Edit Content**, or lead the group |
| Delete a group event in B1 Admin | **Edit Content** |
| Read and write leader notes, see linked forms | Lead the group (linked forms also show to **Form Admin**) |

Permission names are as they appear in the **Edit Permissions** panel. See [Configuring Permissions](../settings/roles-permissions.md#configuring-permissions).

## Related Articles

- [Creating Groups](./creating-groups.md) -- set up a group and its settings
- [Group Members](./group-members.md) -- add members, leaders, and communicate with the group
- [Group Calendar](./group-calendar.md) -- schedule the group's meetings
- [Recording Attendance](../attendance/recording-attendance.md) -- sessions and attendance from the group page
- [Groups Health](./groups-health.md) -- membership and attendance trends
