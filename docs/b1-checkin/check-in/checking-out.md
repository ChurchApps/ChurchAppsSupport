---
title: "Checking Out & Child Safety"
description: "Check children out on a manned B1 Checkin station with security codes, verified pickup people, parent paging, label reprints, and emergency broadcasts."
---

# Checking Out & Child Safety

<div class="article-intro">

Check-out closes the loop on child check-in: a parent presents the security code from their pickup label (or staff look the family up by name or phone), the kiosk verifies who is picking up, and the children are checked out. Manned stations also get safety tools — trusted-pickup verification, page-a-parent texts, security-label reprints, and an emergency broadcast.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Check-out is available on stations set to **manned** mode in the kiosk admin settings
- Children must have been [checked in](./completing-checkin.md) today. A printed pickup label with the security code is the usual way in, but staff can also find the family by name or phone
- Paging and emergency broadcasts require your church to have a texting provider connected in B1 Admin

</div>

## Starting a Check-Out

1. On a manned station, tap **Check Out** on the lookup screen.
2. Enter the 4-character **security code** from the family's pickup label. You can type it, use the on-screen keypad, or scan the label's barcode with a USB or Bluetooth scanner — the code submits automatically once all 4 characters are entered.
   - No scanner? Tap **Scan** below the code field to use the tablet's camera instead. Hold the pickup label's QR code or barcode up to the camera in the **Scan pickup code** window and the code is entered for you. The back camera is used by default; tap the flip button to switch cameras, or tap **Cancel** to go back to typing.
3. The kiosk shows the children checked in under that code.

### Finding a Family Without the Code

If the parent lost the pickup label or checked in without printing one, staff can look the family up instead:

1. On the **Check Out** screen, tap **Search by name**.
2. Enter at least 2 letters of the family's last name and tap **Search**. To use a phone number instead, tap **Use phone number** and enter at least 4 digits.
3. Tap a person in the results. The kiosk finds everyone in that person's household who is checked in today and not yet checked out.

If no one in the household is checked in, the kiosk says "No one in this household is checked in right now." Tap **New search** to try again, or **Enter code instead** to go back to the code keypad.

:::warning
Looking a family up by name skips the security-code match, so follow your church's child-safety procedure, such as checking ID or confirming the person against the household's trusted pickup list, before checking children out this way.
:::

## Choosing Which Children to Check Out

Under **Checking out**, each child appears with a checkbox, and every child starts checked. Uncheck any child who is staying, for example when one parent picks up a toddler while an older sibling stays for a later service. Only the checked children are checked out; the others stay checked in and can be checked out later with the same code.

If you uncheck everyone, the kiosk shows "Select at least one child to check out." and the pickup buttons are disabled until you check at least one child.

## Verifying Who Is Picking Up

The check-out screen asks who is picking the children up:

- **Trusted pickup people** for the household appear as tappable cards with their photo and relationship — tap the person standing in front of you.
- **Household adults** also appear in a photo grid.
- **Other** lets you type a name for someone not on the list.

If a typed name matches someone marked **Not Authorized** for that household, the kiosk blocks the check-out with a warning. A staff member can choose **Override** to proceed anyway — the override is recorded on the attendance record with the person's name.

Tapping a pickup person (or entering a name under **Other** and tapping **Check Out**) checks out the selected children. The check-out time and the pickup person's name are stored with each child's attendance record, and staff can see them in B1 Admin as **Checked Out** and **Picked Up By**. See [Check-In Details](../../b1-admin/attendance/recording-attendance.md#check-in-details).

:::info
Trusted and not-authorized pickup people are managed by church staff on each person's page in B1 Admin — see [Check-In Safety](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Paging a Parent

Need a parent during the service — a diaper change, a crying child? From the check-out screen on a manned station, staff can send a **page**: a text message to the child's parents or guardians through the church's texting provider. Parents who opted out of texts or have no mobile number are skipped, and the kiosk shows how many messages were sent.

## Reprinting Labels

If a nametag or pickup label is lost or damaged, staff on a manned station can **reprint** the family's labels from the check-out screen after entering the security code. The reprint uses the same printer and label templates as the original check-in.

## Emergency Broadcast

In an emergency, staff can text the guardians of **every checked-in child** for the current service at once:

1. Open the kiosk **admin settings** (7 rapid taps on the header logo, plus the PIN if one is set).
2. Tap **Emergency broadcast**.
3. Enter the message, then type **EMERGENCY** in the confirmation field — the **Send broadcast** button stays disabled until you do.
4. The kiosk reports how many phones received the message and how many people were skipped (opted out or no mobile number).

:::warning
The broadcast goes to every checked-in household for the selected service. Use it for genuine emergencies — evacuations, lockdowns, severe weather.
:::

## Related Articles

- [Completing Check-In](./completing-checkin.md) — where security codes and pickup labels come from
- [Check-In Safety](../../b1-admin/attendance/checkin-safety.md) — configuring capacities, ratios, pickup people, and the texting provider requirement
- [Printer Setup](../getting-started/printer-setup.md) — label printer configuration
