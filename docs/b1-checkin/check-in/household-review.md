---
title: "Reviewing Your Household"
description: "Review your household in B1 Checkin after picking a person, then assign groups for each service time and mark guests or volunteers before checking in."
---

# Reviewing Your Household

<div class="article-intro">

After you select a person from the search results, the app loads your entire household and displays it on the household review screen. This is the central hub of the check-in process where you can see everyone in your family and manage their group assignments before checking in.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Select a service](./selecting-service.md) from the services screen
- [Look up a member](./looking-up-members.md) and select them from the search results

</div>

## Check-In Announcement {#check-in-announcement}

If your church has set a check-in announcement, an **Announcement** window appears first, before the household screen. Read the message and tap **OK** to continue. Each family sees it once; it doesn't come back when you return to this screen after adding a guest or changing rooms. Church staff set the message in B1 Admin; see [Check-In Announcement](../../b1-admin/attendance/check-in.md#check-in-announcement).

## Viewing Household Members

The screen is titled **Who's checking in?** with a **Find / Select / Done** step indicator above it; you are on the **Select** step. Each household member appears as a card. Members whose membership status is **Deceased** are left off the list; inactive members still show, since they may be returning. Each card has:

- Their **photo** (or a placeholder icon if no photo is on file)
- Their **display name**
- A **summary of their current group assignments** (shown as small chips below the name when the card is collapsed)
- An **Already checked in** badge if they have already checked in for this service today
- A yellow **warning badge** showing their **name tag notes** (allergies or other alerts) when any are on file
- A **pencil icon** on [manned stations](../getting-started/admin-settings.md#self-service-and-manned-stations) for [editing the person's profile](#editing-a-profile-manned-stations)
- An **expand/collapse arrow** on the right side

A card gets a colored bar along its left edge once the person has at least one group selected. If the household loads with nobody in it, the screen shows **No household members found**.

## Expanding a Member

Tap a member's card to expand it. If the person has name tag notes, they are repeated in a yellow alert at the top of the expanded card. Below that you will see a row for each **service time** within the selected service, earliest first. Service times are ordered by their scheduled day and start time when one is set, otherwise by the time in their name (so "9:00 AM" comes before "10:30 AM"); service times with no time in their name come last, alphabetically. Each row shows:

- The **service time name** (for example, "9:00 AM" or "11:00 AM")
- The **groups offered** at that service time, listed below the name (for example, "Nursery, Preschool, Adult Bible Class"), so you can see which classes are available before you choose
- A **button** showing the currently assigned group, or "Select Group" if no group has been assigned yet

If a service time has a [check-in schedule](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) and its window is closed right now, the row shows **Closed** instead of a button -- with the next opening time when there is one, such as **Closed · opens Sun 9:30 AM**. If the person is already checked in to that service time, the row shows their group with a check mark instead (for example, **Kids Room 1 · Checked in**), so you can see where they are even though the window has closed.

Tap the group button to go to the [group selection screen](./group-assignment.md) where you can choose or change the group for that person and service time.

The expanded card also shows **Member**, **Guest**, and **Volunteer** chips. Tap one to set how this person is checking in. Member is the default, except that someone who checked in as a **Volunteer** last time starts on **Volunteer**, so regular volunteers don't have to change it each week. A guest you just added starts on **Guest**. The type matters for children's rooms: volunteers count toward the room's volunteer-to-child ratio, and guests count against any guest capacity your church has set.

Tap the member's card again to collapse it.

## Editing a Profile (Manned Stations) {#editing-a-profile-manned-stations}

On a station in [manned station mode](../getting-started/admin-settings.md#self-service-and-manned-stations), each member card has a **pencil icon**. A volunteer can tap it to fix a record on the spot without opening B1 Admin:

1. Tap the **pencil** on the member's card. The **Edit Profile** window loads the person's current details.
2. Change any of **First Name**, **Last Name**, **Birth Date** (entered as `YYYY-MM-DD`), **Mobile Phone**, **Email**, or **Name Tag Notes**.
3. Tap **Save**. **Save** stays disabled until both names are filled in. Tap **Cancel** to close without saving.

Only those fields are changed; everything else on the person's record is left alone. A corrected birth date immediately affects the [age guidance](./group-assignment.md#age-and-grade-guidance) and printed age, and name tag notes print on the labels. If the record cannot be loaded or saved, the window shows **Couldn't load this person. Please try again.** or **Couldn't save. Please try again.**

:::tip
Name Tag Notes is the place for allergies and medical alerts. They show as a warning badge on the household screen and print on the child's name tag and the pickup slip.
:::

:::tip
You do not need to assign every family member to a group. Adults who are attending the main worship service can be left without a group assignment. Only assign groups for members who need to be checked into a specific class or program.
:::

## Navigating from This Screen

From the household review screen, you have three options:

- **Expand a member** and tap a service time button to [assign or change a group](./group-assignment.md).
- **Tap Add a Guest** below the member list to [add a guest](./adding-guests.md) to your household.
- **Tap Check In** at the bottom of the screen to [complete the check-in](./completing-checkin.md). The button shows how many people are selected -- for example **Check In -- 3** -- and stays disabled with the hint **Choose a group for at least one person** until someone has a group.

Tap the **back arrow** next to the title to return to the lookup screen and start over with another family.

:::info
Any group assignments from a previous check-in to the same service are pre-loaded automatically. If your children attend the same groups each week, you may not need to change anything -- just review and check in.
:::

## Next Steps

- [Assign groups](./group-assignment.md) to family members who need to check into a specific class or program.
- [Add a guest](./adding-guests.md) if someone is visiting with your family.
- [Complete check-in](./completing-checkin.md) when everyone's assignments look correct.
