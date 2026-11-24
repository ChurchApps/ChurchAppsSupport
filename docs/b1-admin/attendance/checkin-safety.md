---
title: "Check-In Safety"
description: "Configure child-safety controls in B1 Admin: room capacity, volunteer ratios, trusted pickup lists, and page-a-parent texts for check-in."
---

# Check-In Safety

<div class="article-intro">

B1 includes a set of child-safety controls for check-in: room capacity limits and volunteer-to-child ratios, age and grade guidance at the kiosk, check-in types that distinguish members, guests, and volunteers, and a trusted-pickup list per household that is verified at check-out. This page covers how to configure each safety feature in B1 Admin.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up your [attendance structure](setup.md) and [check-in kiosks](check-in.md)
- Rooms are [groups](../groups/creating-groups.md) linked to service times — the safety settings below live on the group
- Page-a-parent and emergency broadcast require a connected texting provider ([Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md), or Mutual Ministry)

</div>

## Room Capacity and Closing a Room

Each check-in room (group) can enforce its own limits. Open the group, click **Edit** to edit its settings, and find the **Check-In Capacity** section:

- **Capacity** -- The maximum number of people who can be checked in to this room at once. When the room is full, check-in to it is blocked and the kiosk names the full room.
- **Guest Capacity** -- An optional separate cap on how many guests the room can hold.
- **Closed for Check-In** -- Set to **Yes** to stop all check-ins to this room immediately (for example, when a class is cancelled or a room is unavailable). Check-outs still work.

## Volunteer Ratios

The same **Check-In Capacity** section on the group includes staffing rules:

- **Children per Volunteer** -- The maximum number of children each checked-in volunteer can cover (e.g. 5 means one volunteer per five children).
- **Minimum Volunteers** -- The smallest number of volunteers that must be checked in before children can check in to the room.

Volunteers count toward these rules when they check in with the **Volunteer** type at the kiosk (see [Check-In Types](#check-in-types) below).

### Choosing Warn vs. Block

How strictly ratios are enforced is a church-wide setting:

1. In B1 Admin, go to **Settings** and open the **Check-In** section.
2. Set **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- The kiosk shows a warning when a room is over ratio or under its minimum volunteers, and a staff member can confirm to proceed anyway. This is the default.
   - **Block (prevent check-in)** -- Check-in to the room is refused until enough volunteers are checked in.

:::info
Capacity and Closed for Check-In are always hard limits — the warn/block choice applies only to volunteer ratios.
:::

## Check-In Types

Every check-in records whether the person is a **Member**, **Guest**, or **Volunteer**. The type is chosen with chips on the kiosk household screen (Member is the default); on a [manned station](../../b1-checkin/getting-started/admin-settings.md) the volunteer running the kiosk picks it. Types feed the safety rules — volunteers provide ratio coverage, and guests count against the room's Guest Capacity.

## Age and Grade Room Guidance

You can give each room age or grade bounds so the kiosk guides families to appropriate rooms:

- On the group's settings, use the **Age & Grade** section to set the minimum/maximum age (years and months) and/or grade for the room.
- At the kiosk, rooms a child qualifies for are highlighted and rooms they don't are dimmed. A dimmed room can still be chosen with a staff confirmation — the guidance never hard-blocks. The kiosk marks each room **Eligible**, **Outside age range**, or **Closed**; see [Age and Grade Guidance](../../b1-checkin/check-in/group-assignment.md#age-and-grade-guidance).

Grades roll over on your church's **grade promotion date**:

1. In B1 Admin, go to **Settings** and open the **Grade Promotion** section.
2. Set the month and day your church promotes students (for example, August 1). Ages and grades at the kiosk are computed as of the most recent promotion date.

## Trusted and Not-Authorized Pickup People

Each household can carry a list of people who are — or are not — allowed to pick up its children.

1. Open a person's page in **People** and find the **Pickup** card.
2. Click **Add**. Search for an existing person, or add someone not in the system by entering their **Name**, **Relationship**, and a photo.
3. Set the **Status**:
   - **Trusted** -- At check-out, this person appears as a tappable pickup card with their photo, making verified pickup fast.
   - **Not Authorized** -- If someone attempts pickup under this name, the kiosk blocks check-out with a warning. A staff member can override, and the override is recorded on the attendance record.

Click a person's status chip on the card to toggle between Trusted and Not Authorized.

When a pickup person was added from the people search (so they are linked to a person record), their phone number shows under their name on the **Pickup** card: the mobile number, or the home or work number if there is no mobile. Click it to call. People added by name only don't show a phone.

:::tip
Add photos to trusted pickup people whenever possible — the check-out screen shows the photo so volunteers can visually verify the person standing in front of them.
:::

## Page-a-Parent and Emergency Broadcast

Both features send text messages through your church's connected texting provider — there is no built-in SMS service, so one of the supported providers must be configured first.

- **Page a parent** -- From a manned kiosk's check-out screen, staff can text a checked-in child's parents/guardians (for example, "Please come to the nursery").
- **Emergency broadcast** -- From the kiosk's admin settings, staff can text every checked-in household's guardians for the selected service at once. Sending requires typing **EMERGENCY** to confirm.

People who have opted out of texts, or who have no mobile number on file, are skipped automatically — the kiosk reports how many messages were sent and how many were skipped.

See the kiosk-side walkthrough in [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out.md).

## Reviewing Check-Outs

At a manned kiosk station, staff find the family by security code, or by last name or phone number when the pickup label is missing, and can check out some of the children while others stay. Each check-out records the time and who picked the child up. Staff can review this in B1 Admin:

- **Today, by room** -- On the Attendance page, click **Today** beside a room to see who is still there and who has been picked up. See [Seeing Who Is in a Room Today](index.md#seeing-who-is-in-a-room-today).
- **By session or person** -- The session's attendance list and each person's attendance history show **Checked In By**, **Checked Out**, and **Picked Up By**. See [Check-In Details](recording-attendance.md#check-in-details).

## Related Articles

- [Check-In](check-in.md) — kiosk setup and hardware
- [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out.md) — the kiosk check-out, pickup verification, and paging flows
- [Creating Groups](../groups/creating-groups.md) — where room settings live
- [Attendance Setup](setup.md) — services, service times, and room assignments
- [Minimum Age for Private Messages](../settings/mobile-app.md#member-directory--messaging-settings) — blocks new private-message conversations with children while keeping them in the directory
