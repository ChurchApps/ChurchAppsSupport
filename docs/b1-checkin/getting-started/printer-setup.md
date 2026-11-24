---
title: "Printer Setup"
description: "Set up a Brother QL or Zebra network label printer for B1 Checkin kiosks: find it on your Wi-Fi or enter its IP address, run a test print, read the diagnostics log, and save the selection."
---

# Printer Setup

<div class="article-intro">

B1 Church Checkin can print name labels and parent pickup slips to a network label printer. Setting up the printer is optional -- you can use the app without a printer for attendance tracking only.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Log in](./logging-in.md) to the B1 Church Checkin app and select your church
- Connect a compatible network label printer to the same Wi-Fi network as the tablet

</div>

## Supported Printers and Labels

The kiosk prints over the local network (Wi-Fi) to two printer families:

- **Brother QL** label printers with network support, such as the QL-1110NWB, QL-1115NWB, QL-820NWB, QL-810W, QL-720NW, QL-710W, and QL-580N.
- **Zebra** label printers with network support.

USB-only and Bluetooth-only printers are not supported; the printer must have an IP address on the same network as the tablet.

B1 Checkin's default label template is sized for **1.1" x 3.5"** labels. If you are using a **Brother QL printer**, you must use **Brother DK-1201** labels (1.1" x 3.5"). Brother printers detect the label size from the physical roll loaded in the printer -- if the roll does not match the template size, the printer will not print. Do not substitute a different size.

[Brother DK-1201 Compatible Labels -- 12 Rolls (Amazon)](https://www.amazon.com/dp/B0716XB6JG?tag=signpresenter-20)

Hardware recommendations are in [Check-In: Recommended Hardware](../../b1-admin/attendance/check-in.md#recommended-hardware).

## Accessing Printer Settings

You can open the **Select a Printer** screen at any time through the **Admin Settings** menu:

1. Tap the **church logo** in the header **seven times** in quick succession (within two seconds).
2. If a kiosk PIN is set, enter the PIN when prompted.
3. On the Admin Settings screen, tap **Change Printer**.

Once a printer is selected, you can also tap the small **printer status dot** at the right edge of the header (PIN required if set) to jump straight to this screen.

:::info
On an iPad, the first scan asks for permission to find devices on the **local network**. Tap **Allow**; without it the scan cannot see any printers.
:::

## Scanning for Printers

When the printer settings screen opens, the app automatically scans your local network for compatible printers. You will see a loading indicator with the message **Scanning for printers...** while the scan is in progress.

Once the scan completes, you will see a list of discovered printers. Each row shows:

- The **printer model** name, for example *Brother QL-820NWB*
- The **IP address** of the printer on your network

A **No Printer** option is always included at the bottom of the list. Tap **Rescan** at the top right to search again, for example after powering a printer on.

If nothing is found, a **No printers found on this network** notice appears above the list and the **Enter IP address** row explains that you can type the printer's address instead.

:::warning
The tablet and the printer must be connected to the same local network for the scan to discover the printer. If your printer does not appear, verify that both devices are on the same Wi-Fi network and that the printer is powered on, or [enter it by IP address](#entering-a-printer-by-ip-address).
:::

## Entering a Printer by IP Address

If the scan doesn't find your printer (some networks block printer discovery), you can add it by its IP address. You can find the address on the printer's network settings printout or its display.

1. Below the printer list, tap **Enter IP address**.
2. Type the printer's **IP address**, for example `192.168.1.50`.
3. Under **Printer model**, tap your model: Brother QL-1110NWB, QL-1115NWB, QL-820NWB, QL-810W, QL-720NW, QL-710W, QL-580N, or Zebra Printer.
4. Tap **Use This Printer**. The button stays disabled until the address is a valid IP address.

The printer is added to the list and selected. Run a [test print](#test-printing), then tap **Save & Restart**. A printer entered this way stays in the list the next time you open printer settings, even though the scan doesn't find it.

:::tip
Give the printer a reserved (static) IP address in your router so the address doesn't change and the kiosk keeps printing.
:::

## Selecting a Printer

1. Tap the printer you want to use. The selected row is highlighted with a checkmark.
2. To print without a physical printer (for testing or attendance-only mode), select **No Printer**.

## Test Printing

Before saving your selection, verify the connection works:

1. Select a printer from the list.
2. Tap **Test Print** at the bottom of the screen.
3. The app saves the selection and sends a small test label. If the printer is connected properly, it prints within a few seconds.

If you tap **Test Print** with **No Printer** selected, the app shows a **No printer selected** alert.

:::tip
Always run a test print after selecting a printer to confirm the connection before your next service.
:::

## Reading the Diagnostics Log

Below the printer list, tap **Diagnostics** to expand the printer log. It lists, newest first, every print job this tablet has attempted -- test prints, family check-ins, QR-scan prints, and check-out reprints -- with how many labels were produced and any status or error the printer driver reported. Tap **Share** to send the log by email or message when working with support, or **Clear** to empty it.

## Saving Your Selection

When you are satisfied with your printer choice:

1. Tap **Save & Restart** at the bottom of the screen.
2. The app saves your printer selection and restarts to apply the settings. It signs back in automatically and returns to the services screen.

Your printer selection is remembered across app restarts and survives logging out. You do not need to set it up again unless you want to change printers.

## The Printer Status Dot

Whenever a printer is selected, a small dot sits at the right edge of the header on every kiosk screen:

- **Green** -- the printer reported that it is ready.
- **Red** -- the printer reported an error or a failed connection.
- **Amber** -- no status yet (for example, the printer has not responded since the app started).

Tap the dot to open printer settings. If labels stop printing, start there; see [Labels Are Not Printing](./troubleshooting.md#labels-are-not-printing).

:::info
If you move the kiosk to a different location or change your network setup, return to the printer settings to scan for printers again and update your selection.
:::

## Next Steps

With your printer configured, you are ready to start checking in. See the [check-in workflow](../check-in/index.md) to learn how the full process works, starting with [selecting a service](../check-in/selecting-service.md). To design your own name tags and pickup slips, see the [Label Designer](../../b1-admin/attendance/labels.md).

## Related Articles

- [Completing Check-In](../check-in/completing-checkin.md#label-printing) -- which labels print and what is on them
- [Troubleshooting and Offline Behavior](./troubleshooting.md)
- [Admin Settings and Kiosk PIN](./admin-settings.md)
