---
title: "Completing Check-In"
description: "Finish a family's kiosk check-in in B1 Checkin, covering room limits, label printing, pickup security codes, and what the app does next."
---

# Completing Check-In

<div class="article-intro">

Once you have reviewed your household and made any needed group assignments, you are ready to finalize the check-in. This is the last step in the kiosk workflow -- the app submits attendance, prints labels, and resets for the next family.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Review your household](./household-review.md) on the household review screen
- [Assign groups](./group-assignment.md) to any family members who need to check into a specific class or program
- Optionally [add any guests](./adding-guests.md) who are visiting with your family

</div>

## How to Check In

1. From the **household review screen**, tap **Check In** at the bottom of the screen. The button shows how many people are selected, for example **Check In -- 3**.
2. The app submits the attendance data to the server and shows the **Done** step: a green checkmark, **You're all set!**, **Have a great service.**, and the photos and first names of everyone checked in.

That is all it takes. Your family's attendance has been recorded.

If anyone you selected already checked in for this service today, an **Already Checked In** window appears first and names them. Tap **Check In Again** to save their new group choices, or **Cancel** to go back to the household screen.

## Full Rooms and Volunteer Ratios

If your church has configured [safety limits](../../b1-admin/attendance/checkin-safety.md) on its rooms, the server checks them before saving:

- If a selected room is **full or closed**, check-in does not go through and the app names the room so you can pick a different one.
- If the service time has a [check-in schedule](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) and its check-in window isn't open right now, check-in into that service time's rooms is also refused. The **Can't check in yet** screen lists the room with the reason "check-in isn't open right now"; tap **Change Rooms** to pick a different service time or group. (Service times that are already closed are shown as **Closed** on the [household screen](./household-review.md) and can't be picked, so you'll usually only see this if a window closes partway through a check-in.)
- A household that checked in for an earlier service time can come back later and add an open service time, even after the earlier window has closed. Their existing check-ins are kept and don't cause the new check-in to be refused.
- If a children's room is **short on volunteers** for its ratio, what happens depends on how your church configured [ratio enforcement](../../b1-admin/attendance/checkin-safety.md#choosing-warn-vs-block). With **Warn**, a **Volunteer ratio warning** window says which room is below its ratio; tap **Check In Anyway** to proceed or **Change Rooms** to go back. With **Block**, the room is listed on the **Can't check in yet** screen as "needs another volunteer".

Nothing is recorded while a check-in is refused, so you can change rooms and try again without creating duplicates.

## Label Printing

If a network printer is configured, the app automatically prints labels after check-in. The success screen shows **Printing your name tags...** while it works and **Name tags printed** when the labels have been sent to the printer.

- **Name labels** are printed for each person who is assigned to a group that has the **Print Nametag** setting enabled. Name labels include the person's name, their group assignment, and allergy/notes information if any is on file.
- **Parent pickup slips** are printed when any checked-in person is in a group that has the **Parent Pickup** setting enabled. People checked in as a **Volunteer** are skipped, so a childcare worker serving in a Parent Pickup room does not get a pickup slip. The pickup slip lists the children, their group assignments, and a unique **4-character security code**.

:::info
The same security code appears on both the child's name label and the parent's pickup slip. At pickup time, volunteers match the codes to verify that the right adult is picking up each child.
:::

The security code is generated fresh for each check-in and uses only consonants and digits (vowels are excluded to avoid forming inappropriate words).

If your church designs its own nametags in the [Label Designer](../../b1-admin/attendance/labels.md), they can also print the child's **Age**, **Grade**, and **Birth Date**, their **Check-in Type** (Member, Guest, or Volunteer), and the name and phone number of the adult who checked them in.

:::warning
If labels do not print, open the Admin Settings by tapping the **church logo** seven times, then tap **Change Printer** to verify the printer connection. See [Printer Setup](../getting-started/printer-setup.md) for troubleshooting steps.
:::

## Attendance Milestones

The server keeps count of how many weeks in a row each person has attended the service. When someone reaches a multiple of five -- 5, 10, 15 weeks and so on -- the success screen celebrates with confetti and a **Weeks in a Row!** banner, and stays up a little longer so the family sees it. Nothing needs to be configured; it happens automatically.

## If Something Goes Wrong

If the check-in or the label print fails -- usually because the tablet lost its connection -- the success screen shows **Something didn't go through -- please see a volunteer.** and returns to the lookup screen. Nothing was recorded for anyone who was not saved, so look the family up again and check them in once more; anyone who did get saved shows **Already checked in** on the household screen. See [Troubleshooting and Offline Behavior](../getting-started/troubleshooting.md).

## What Happens After Check-In

- If a printer is configured, the app prints all labels and then automatically returns to the **lookup screen**, ready for the next family.
- If no printer is configured, the app returns to the **lookup screen** automatically as well.

Either way, the success screen stays up for at least 6 seconds from when it appears (8 seconds when it is celebrating someone's attendance milestone), so families can see that check-in worked. If printing takes longer than that, the app returns about a second and a half after printing finishes.

A **Returning to start...** progress bar at the bottom shows when the kiosk will reset. You do not need to tap anything to get back to the lookup screen -- the app handles the transition automatically. Once the screen has been up for a moment, you can tap it to return right away; a tap in the first second and a half is ignored, so a quick double tap on **Check-in** does not skip it.

:::tip
The app resets completely after each check-in, so there is no risk of one family seeing another family's information.
:::

## What Gets Recorded

When you tap **Check-in**, the app sends the following to the server for each household member who has a group assignment:

- The **person** being checked in
- The **service** they are attending
- The **service time** and **group** they are assigned to
- Their **check-in type** (Member, Guest, or Volunteer) from the household screen
- **Who checked the family in** -- the person whose name or phone number was looked up, when that person is clearly an adult (not marked as a child in the household, and 18 or older by birth date, or the household's head or spouse when no birth date is on file). If a child's name was searched, no one is recorded.

The check-in time is recorded too. Staff see these details, along with the check-out time and who picked the child up, on the session's attendance list in B1 Admin. See [Check-In Details](../../b1-admin/attendance/recording-attendance.md#check-in-details).

This data appears in B1 Admin under the Attendance section, where your church administrators can view and manage attendance records. See the [check-in administration guide](../../b1-admin/attendance/check-in.md) for details.

## Related Articles

- [Reviewing Your Household](./household-review.md)
- [Checking Out & Child Safety](./checking-out.md) -- using the security code at pickup
- [Scanning a Phone Check-In Code](./scanning-codes.md) -- printing labels for a phone check-in
- [Check-In Safety](../../b1-admin/attendance/checkin-safety.md) -- capacities, ratios, and check-in types in B1 Admin
- [Label Designer](../../b1-admin/attendance/labels.md)
