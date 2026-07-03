---
title: "Checking Out & Child Safety"
---

# Checking Out & Child Safety

<div class="article-intro">

Check-out closes the loop on child check-in: a parent presents the security code from their pickup label, the kiosk verifies who is picking up, and the children are checked out. Manned stations also get safety tools — trusted-pickup verification, page-a-parent texts, security-label reprints, and an emergency broadcast.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Check-out is available on stations set to **manned** mode in the kiosk admin settings
- Children must have been [checked in](./completing-checkin) with a printed pickup label carrying the security code
- Paging and emergency broadcasts require your church to have a texting provider connected in B1 Admin

</div>

## Starting a Check-Out

1. On a manned station, tap **Check Out** on the lookup screen.
2. Enter the 4-character **security code** from the family's pickup label. You can type it, use the on-screen keypad, or scan the label's barcode with a USB or Bluetooth scanner — the code submits automatically once all 4 characters are entered.
3. The kiosk shows the children checked in under that code.

## Verifying Who Is Picking Up

The check-out screen asks who is picking the children up:

- **Trusted pickup people** for the household appear as tappable cards with their photo and relationship — tap the person standing in front of you.
- **Household adults** also appear in a photo grid.
- **Other** lets you type a name for someone not on the list.

If a typed name matches someone marked **Not Authorized** for that household, the kiosk blocks the check-out with a warning. A staff member can choose **Override** to proceed anyway — the override is recorded on the attendance record with the person's name.

Once the picker is confirmed, tap check out. The pickup person's name is stored with the attendance record.

:::info
Trusted and not-authorized pickup people are managed by church staff on each person's page in B1 Admin — see [Check-In Safety](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
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

- [Completing Check-In](./completing-checkin) — where security codes and pickup labels come from
- [Check-In Safety](../../b1-admin/attendance/checkin-safety) — configuring capacities, ratios, pickup people, and the texting provider requirement
- [Printer Setup](../getting-started/printer-setup) — label printer configuration
