---
title: "Creating Groups"
description: "Set up a new group in B1 Admin, from choosing a category and naming it to configuring join policy, labels, messaging, and attendance settings."
---

# Creating Groups

<div class="article-intro">

Creating a group in B1 Admin is straightforward. You will set up a category, name your group, and then configure its settings. Groups help you organize your church into meaningful units like small groups, committees, and classes.

</div>

## Training Video

<YouTube id="uG93pXVreNo" title="Creating Groups and Adding Members in B1" next="Group Join Requests and Group Calendars in B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Before You Begin</h4>

- You need an active B1 Admin account with permission to manage groups. See [Roles & Permissions](../people/roles-permissions.md) if you're unsure about your access level.
- Decide on a category structure for your groups (for example, "Small Groups," "Ministries," "Committees"). Categories help keep related groups organized.

</div>

## Adding a New Group

1. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin), expand **People**, and click **Groups**.
2. Click **Add Group** in the page header. A **New Group** form opens below the list. Enter a **Category Name**. Categories help you organize related groups together (for example, "Small Groups," "Ministries," or "Committees"). If a category already exists, you can select it from the list.
3. Enter the group's **Name**.
4. Click **Add** (or **Cancel** to close the form). Your new group will appear in the list, with its category shown under its name.

## Configuring Group Settings

Once your group is created, you can fill in additional details:

1. Click on the **group name** in the list to open it.
2. Click the **Edit** button on the left side of the group page, below the group's details. The **Group Details** form opens.
3. Configure the following options:
   - **Category Name** and **Group Name** -- Change the group's category or rename it.
   - **Meeting Time** and **Meeting Location** -- When and where the group typically meets (for example, "Wednesdays at 7 PM" in "Room 204").
   - **Description** -- A brief summary of what the group is about, written in the formatting editor. This is visible to members.
   - **Photo** -- Click the photo box or **Add Photo** to pick or upload an image for the group.
   - **Slug** -- The short key name used in the group's web address on your church site.
   - **Labels** -- Assign one or more descriptive labels to the group (for example, "In-Person", "Online", "New Members Welcome"). Labels are freeform tags you define; check all that apply, or click **Add New Label** to create one. Labels can be used to filter groups in the Groups Browser website element.
   - **Campus** -- The campus the group belongs to, if your church has more than one.
   - **Enrollment** -- Choose who can join this group:
     - **Open (members can join immediately)** -- Anyone can join without approval
     - **Request to Join (leader approval required)** -- People must submit a join request that requires approval (see [Group Join Requests](./group-join-requests.md))
     - **Closed (admin-add only)** -- Members must be added manually by leaders or administrators
   - **Discussions** -- Turns the group's chat feed on or off, where any member can post. On (**Yes**) by default.
   - **Announcements** -- Turns on a second, leader-only chat feed -- members can read and react, but only leaders can post. On (**Yes**) by default.
   - **Show roster on website** -- Set to **Yes** to list the group's members on its page on your church website.
   - **Confidential group** -- Hide this group and its roster from public pages, the group finder, and non-members. Use this for sensitive groups like recovery or counseling ministries; only the group's members and church staff can see it.
4. For classes and children's rooms, the form also has these sections:
   - **Age & Grade** -- **Minimum Age** and **Maximum Age** (in years and months) and **Minimum Grade** and **Maximum Grade**, used to suggest the right room at check-in. Leave them blank (or **No limit**) for no limit. See [Check-In Safety](../attendance/checkin-safety.md#age-and-grade-room-guidance).
   - **Check-In Capacity** -- **Capacity**, **Guest Capacity**, **Children per Volunteer**, **Minimum Volunteers**, and **Closed for Check-In**. See [Check-In Safety](../attendance/checkin-safety.md#room-capacity-and-closing-a-room).
   - **Attendance** -- **Track Attendance** (set to **Yes** to record [attendance](../attendance/tracking-attendance.md) for this group), **Attendance Reminder Emails** (reminds the group's leaders when one of the group's calendar events took place yesterday but no attendance was recorded), **Parent Pickup**, and **Print Nametag** (check-in options for children's groups).
   - **Service Times (optional)** -- Pick a service time in **Add Service Time** and click the plus button to associate the group with it; click the remove icon next to a service time to take it off. See [Attendance Setup](../attendance/setup.md) for details on service times.
5. Click **Save** to apply your changes, or **Cancel** to close the form without saving.

The left side of the group page shows the group's category, meeting time and location, description, labels, and service times, plus check marks for **Track Attendance**, **Print Nametag**, **Parent Pickup**, **Discussions**, and **Announcements** so you can see at a glance which are turned on.

:::tip
Adding a clear description and meeting time helps members know what to expect when they join a group.
:::

:::info
Turning off both Discussions and Announcements removes the Messages tab from the group entirely in the member portal. Turning off just one hides its tab; members are moved to whichever feed is still on. Existing messages are kept either way -- the toggles only control new posting.
:::

## Duplicating a Group

Starting a new session of a recurring class or ministry? Instead of re-entering all the settings, duplicate an existing group:

1. Open the group and click **Duplicate** (below the **Edit** button on the left side of the group page).
2. Confirm the duplication.

The copy carries over the original's settings -- category, description, photo, meeting time/location, enrollment, labels, campus, chat feeds, confidentiality, age and grade limits, check-in capacity, and attendance options -- but **not** its members or service times. The new group opens right away; it is named after the original with " (Copy)" appended, so rename it from the group settings.

## Archiving a Group

When a group is no longer active but you want to keep its history instead of deleting it:

1. Open the group and click **Edit** to edit its settings.
2. Click **Archive** and confirm.

Archived groups drop off the main Groups list. To find one again, click the **Show archived** button next to the category buttons at the top of the Groups page, then click **Restore** next to the group and confirm to bring it back.

:::info
Archiving a group does not delete its members, attendance history, or calendar events -- it only hides the group from the default list until you restore it.
:::

## Deleting a Group

To remove a group permanently, open it, click **Edit**, click **Delete** at the bottom of the **Group Details** form, and confirm. Deleting can't be undone -- if you might need the group's history later, [archive](#archiving-a-group) it instead.

## Next Steps

After creating and configuring your group, you are ready to:

- **Add members** -- Search for people and add them to the group. Use the star icon (**Make Leader**) to designate group leaders. See [Group Members](./group-members.md).
- **Set up a calendar** -- Create events and recurring meetings for the group. See [Group Calendar](./group-calendar.md).
- **Communicate** -- Email, text, or send a push notification to the group's members from the group page. See [Group Members](./group-members.md#emailing-group-members).
- **Export data** -- Click **Export** above the group's member list to download it. To download the whole list of groups, click **Export** in the header of the Groups page.

:::info
Every group belongs to a category, and the main Groups page lets you filter the list by category. You can always rearrange or rename categories as your church grows.
:::
