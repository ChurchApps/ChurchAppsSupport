---
title: "Guide: Set Up Children's Ministry Check-In"
---

# Set Up Children's Ministry Check-In

<div class="article-intro">

This guide walks you through everything needed to get a children's check-in system running at your church — from entering families in the database, to configuring age-appropriate groups, to printing name tags on Sunday morning. By the end, parents will be able to check in their kids at a kiosk tablet and receive a matching security tag.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Create your church account at [admin.b1.church](https://admin.b1.church)
- Make sure you have admin access — see [Roles & Permissions](../people/roles-permissions.md) if needed
- Optional: Prepare a CSV file of families if you're migrating from another system

</div>

## Step 1: Add Families to Your Database

Before check-in can work, the system needs to know about your families. Each child needs to be linked to a parent through the household feature.

Follow the [Adding People](../people/adding-people.md) guide to add at least one family. Be sure to:

- Add the parent(s) first
- Add each child
- Link them in the same household using the [household editor](../people/adding-people.md#managing-households)

:::tip
If you have more than a handful of families to add, use the [CSV Import](../people/importing-data.md) tool instead of adding them one by one. You can import your entire directory in minutes.
:::

## Step 2: Create Children's Groups

Groups define the classes kids check into. You'll typically want one group per age range.

Follow the [Creating Groups](../groups/creating-groups.md) guide to create groups like:

- **Nursery** (ages 0–2)
- **Preschool** (ages 3–5)
- **Elementary** (ages 6–10)

You can adjust the names and age ranges to match your ministry structure.

## Step 3: Configure Campuses and Services

Check-in is tied to specific service times. You need at least one campus and one service configured.

Follow the [Attendance Setup](../attendance/setup.md) guide to:

1. Add your campus (e.g., "Main Campus")
2. Add a service (e.g., "Sunday Morning")
3. Set the service time (e.g., "9:00 AM")
4. Assign your children's groups to the service

## Step 4: Set Up the Check-In App

Now connect everything by installing the check-in app on a tablet.

1. Install the **B1 Checkin app** — see the [Check-In](../attendance/check-in.md) article for download links
2. Sign in with your B1 Admin credentials
3. Select your campus and service time

See the full [Check-In](../attendance/check-in.md) article for detailed setup steps.

## Step 5: Get Your Hardware

You need a tablet for the kiosk and optionally a Brother label printer for name tags.

At minimum:
- **One Android or Amazon Fire tablet** — see [recommended tablets](../attendance/check-in.md#recommended-hardware)
- **One Brother label printer** — the QL-1110NWB is recommended for its Bluetooth and WiFi support
- **Brother DK-1201 labels** (1-1/7" x 3-1/2")

:::warning
Only Brother label printers are compatible with the B1 Checkin app. Other printer brands will not work.
:::

## Step 6: Run a Test Check-In

Before Sunday morning, do a test run:

1. Open the B1 Checkin app on your tablet
2. Select your campus and the correct service time
3. Search for one of the families you added
4. Check in a child and verify:
   - The attendance shows up in B1 Admin under **Attendance**
   - If using a printer, a name tag prints correctly

:::tip
Train your welcome team volunteers on the check-in process before launching. A quick 5-minute walkthrough is usually all that's needed.
:::

## You're Done!

Your children's ministry check-in is ready. Parents can search for their family, select their children, and check in at the kiosk. Attendance is automatically recorded in B1 Admin.

## Related Articles

- [Adding People](../people/adding-people.md) — add more families as they visit
- [Creating Groups](../groups/creating-groups.md) — manage your children's groups
- [Attendance Setup](../attendance/setup.md) — configure campuses and services
- [Check-In](../attendance/check-in.md) — detailed check-in app setup and hardware
- [Tracking Attendance](../attendance/tracking-attendance.md) — view check-in reports
