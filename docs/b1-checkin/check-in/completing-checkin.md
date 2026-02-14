---
title: "Completing Check-In"
---

# Completing Check-In

<div class="article-intro">

Once you have reviewed your household and made any needed group assignments, you are ready to finalize the check-in. This is the last step in the kiosk workflow -- the app submits attendance, prints labels, and resets for the next family.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Review your household](./household-review) on the household review screen
- [Assign groups](./group-assignment) to any family members who need to check into a specific class or program
- Optionally [add any guests](./adding-guests) who are visiting with your family

</div>

## How to Check In

1. From the **household review screen**, tap the **Check-in** button at the bottom of the screen.
2. The app submits the attendance data to the server and shows a **success screen** with a green checkmark and a welcome message.

That is all it takes. Your family's attendance has been recorded.

## Label Printing

If a network printer is configured, the app automatically prints labels after check-in:

- **Name labels** are printed for each person who is assigned to a group that has the **Print Nametag** setting enabled. Name labels include the person's name, their group assignment, and allergy/notes information if any is on file.
- **Parent pickup slips** are printed when any checked-in person is in a group that has the **Parent Pickup** setting enabled. The pickup slip lists the children, their group assignments, and a unique **4-character security code**.

:::info
The same security code appears on both the child's name label and the parent's pickup slip. At pickup time, volunteers match the codes to verify that the right adult is picking up each child.
:::

The security code is generated fresh for each check-in and uses only consonants and digits (vowels are excluded to avoid forming inappropriate words).

:::warning
If labels do not print, check the printer status bar at the top of the screen. You can tap it to access printer settings and verify the connection. See [Printer Setup](../getting-started/printer-setup) for troubleshooting steps.
:::

## What Happens After Check-In

- If a printer is configured, the app prints all labels and then automatically returns to the **lookup screen**, ready for the next family.
- If no printer is configured, the success screen displays for a few seconds and then automatically returns to the **lookup screen**.

You do not need to tap anything to get back to the lookup screen -- the app handles the transition automatically.

:::tip
The app resets completely after each check-in, so there is no risk of one family seeing another family's information.
:::

## What Gets Recorded

When you tap **Check-in**, the app sends the following to the server for each household member who has a group assignment:

- The **person** being checked in
- The **service** they are attending
- The **service time** and **group** they are assigned to

This data appears in B1 Admin under the Attendance section, where your church administrators can view and manage attendance records. See the [check-in administration guide](../../b1-admin/attendance/check-in.md) for details.
