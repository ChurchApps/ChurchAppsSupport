---
title: "Scanning a Phone Check-In Code"
sidebar_label: "Scanning Codes"
description: "Print name tags at a B1 Checkin kiosk for a family that already checked in on their phone by scanning the QR code from the B1 Church app."
---

# Scanning a Phone Check-In Code

<div class="article-intro">

Families who check in from their phone through [B1 Church self check-in](../../b1-church/checkin/self-checkin.md) still need name tags and a pickup slip. Instead of looking themselves up again at the kiosk, they hold the QR code from their phone up to the tablet's camera and the kiosk prints the labels for that check-in.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- The family has completed [self check-in](../../b1-church/checkin/self-checkin.md) in the B1 Church app for today's service and has the **You're checked in!** screen with its QR code open
- The kiosk has a [printer selected](../getting-started/printer-setup.md) -- scanning only prints labels
- The tablet has granted the app camera access (it asks the first time)

</div>

## What the Kiosk Scans

The QR code on the phone's confirmation screen contains the family's **4-character security code** -- the same code that is printed on their name tags and pickup slip. The kiosk looks that code up among today's active check-ins and prints the labels for everyone it covers, exactly as it would have after a kiosk check-in: a name tag for each person in a **Print Nametag** group and one pickup slip when anyone is in a **Parent Pickup** group. The code printed on the labels matches the code on the phone, so pickup works the same way.

Only QR codes are read on the lookup scanner. The printed label barcode can be scanned at [check-out](./checking-out.md) instead.

## Scanning a Code

1. On the [lookup screen](./looking-up-members.md), tap **Scan code** (the QR icon below the keypad).
2. The **Scan Code** screen opens with the camera view and the hint **Hold the QR code from your phone up to the camera**. The **front** camera is used by default so a wall-mounted tablet faces the person; tap the **flip camera** button in the corner of the camera view to switch to the back camera.
3. Hold the phone steady a few inches from the camera. The tablet vibrates when it reads the code.
4. The kiosk shows **Printing your labels...** with the photos and first names of the people it found, then sends the labels to the printer.
5. When printing finishes, a **Labels sent to printer** message appears and the kiosk returns to the lookup screen, ready for the next family.

Tap the **back arrow** at the top of the scan screen at any time to return to the keypad without scanning.

:::info
Scanning never records attendance -- that happened when the family checked in on their phone. It also cannot change their rooms. To move a child to a different group, look the family up by [phone or name](./looking-up-members.md) and check them in again; the kiosk warns that they are **Already Checked In** and lets you **Check In Again** with the new groups.
:::

## Messages You May See

| Message | Meaning |
|---|---|
| **No active check-ins match that code. Check in on your phone first.** | The code is not among today's active check-ins. The family may not have finished self check-in, may have checked in for a different church, or may have already been checked out. Scan again, or look them up by phone or name and check them in at the kiosk. |
| **Couldn't look up that code. Please try again.** | The lookup request failed, usually because the tablet lost its connection. Check Wi-Fi and scan again. |
| **You're checked in! No printer is set up on this station.** | The code was found, but this tablet has **No Printer** selected. Nothing is printed. Select a printer in [printer settings](../getting-started/printer-setup.md) or send the family to a kiosk with a printer. |
| **You're checked in! No labels needed.** | The code was found, but none of the family's groups has **Print Nametag** or **Parent Pickup** turned on, so there is nothing to print. |
| **Camera access is needed to scan check-in codes.** | The app does not have camera permission. Tap **Allow Camera**, or grant it in the tablet's system settings. |

After an error message, the camera stays on so the family can simply try again. The same code is ignored for a few seconds after it is read, so holding the phone in front of the camera does not print the labels twice.

## Starting on the Scanner

If most families at a station check in on their phones, open [Admin Settings](../getting-started/admin-settings.md) and turn on **Start on scanner**. The lookup screen then opens straight to the camera, and after each family's labels print, the kiosk stays on the scanner instead of returning to the keypad.

A family without a phone check-in can still use the keypad: tap the **back arrow** on the scan screen to get to phone and name search. The next time the lookup screen loads (after that family's check-in finishes), the scanner opens again.

The setting is stored on that tablet only, so you can have one scanner-first station next to a normal self-service kiosk.

## Related Articles

- [Self Check-In](../../b1-church/checkin/self-checkin.md) -- how families check in from the B1 Church app
- [Looking Up Members](./looking-up-members.md) -- the keypad and name search
- [Completing Check-In](./completing-checkin.md#label-printing) -- which labels print and why
- [Checking Out & Child Safety](./checking-out.md) -- scanning the printed label at pickup
- [Printer Setup](../getting-started/printer-setup.md)
