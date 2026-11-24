---
title: "Troubleshooting and Offline Behavior"
sidebar_label: "Troubleshooting"
description: "Fix common B1 Checkin kiosk problems: no services, failed searches, labels not printing, camera access, lost PINs, and what the kiosk can and cannot do without internet."
---

# Troubleshooting and Offline Behavior

<div class="article-intro">

Most kiosk problems come down to one of three things: the tablet lost its internet connection, the printer is not reachable, or something is not set up yet in B1 Admin. This page lists the messages the kiosk shows, what each one means, and what to do about it.

</div>

## The Kiosk Needs an Internet Connection

B1 Church Checkin talks to the ChurchApps servers for every step: loading services, searching for families, saving check-ins, and texting parents. It does **not** queue check-ins while offline. If the Wi-Fi drops mid-service, families cannot check in until it is back, and nothing they tapped during the outage is recorded.

What the kiosk keeps on the tablet so it can recover gracefully:

- The **sign-in token**, selected church, printer, PIN, and station settings, so it restarts without asking for anything.
- The church **logo, colors, and idle screen** settings, so it still looks right while reconnecting.
- The most recently downloaded **label templates**, so labels still print with your design if the template download fails on a given load.

If the tablet starts without a connection, the splash screen cannot sign in and falls back to the login screen. Restore the connection and reopen the app rather than typing the password again; the saved sign-in is still on the tablet.

## Startup Messages

The splash screen reports what it is doing: **Initializing...**, **Checking for updates...**, **Downloading update...**, **Logging in...**, and **Loading church data...**.

- The app checks for an over-the-air update each time it starts and installs it before continuing. If the check fails (for example, no connection), it carries on with the version already installed.
- If the saved sign-in is no longer valid, the kiosk returns to the [login screen](./logging-in.md).

## Messages on the Kiosk and What to Do

| Message | Where | Cause and fix |
|---|---|---|
| **No check-in access** | Church selection | The account has no church where it holds the **Checkin** or **Edit Attendance** permission. Have an admin add it under **Settings > Roles** -- see [Check-In Kiosk Accounts](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts). Tap **Logout** and sign in again once it is added. |
| **Couldn't load services.** | Services screen | The tablet could not reach the server. Check Wi-Fi and tap **Try again**. |
| **No services set up yet** | Services screen | No services exist in B1 Admin. See the [attendance setup guide](../../b1-admin/attendance/setup.md). |
| **Check-in for this service opens ...** / **Check-in isn't open for this service right now.** | Services screen | Every service time has a [check-in schedule](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) and all windows are closed. Wait, choose another service, or have an admin widen the window. Make sure the tablet's clock and time zone are correct. |
| **Unable to complete search. Please try again.** | Lookup | The search request failed. Check the connection and tap **Try again**. |
| **No Matches Found** | Lookup | No person matches the digits or letters typed. Try the other search mode, or add the family in B1 Admin. First-time visitors can use [Register as guest](../check-in/looking-up-members.md#registering-as-a-guest) if it is enabled. |
| **No household members found** | Household | The person's household loaded empty. Check the person's household in B1 Admin. |
| **No groups available for this time** | Select group | No groups are linked to that service time. See [attendance setup](../../b1-admin/attendance/setup.md). |
| **Can't check in yet** | Check-in complete | A room is full, closed, short on volunteers, or its window closed. Tap **Change Rooms** and pick another. See [Full Rooms and Volunteer Ratios](../check-in/completing-checkin.md#full-rooms-and-volunteer-ratios). |
| **Something didn't go through -- please see a volunteer.** | Check-in complete | The check-in or the label print failed, usually because the connection dropped. The kiosk returns to the lookup screen; look the family up again and check them in once more. Anyone who did get saved shows **Already checked in**. |
| **Couldn't add the guest. Please try again.** | Add guest | The person record could not be saved. Check the connection and tap **Add Guest** again. |
| **No active check-ins match that code.** | Scan / Check out | The code was not found among today's active check-ins. See [Scanning a Phone Check-In Code](../check-in/scanning-codes.md). |
| **No SMS provider configured** | Page parent / Emergency broadcast | The church has no texting provider connected. See [Page-a-Parent and Emergency Broadcast](../../b1-admin/attendance/checkin-safety.md#page-a-parent-and-emergency-broadcast). |

## Labels Are Not Printing

1. Look at the **printer status dot** at the right edge of the header. Green means the printer reported ready, red means it reported an error, and amber means it has not responded yet. No dot at all means **No Printer** is selected on this tablet.
2. Open [printer settings](./printer-setup.md) (tap the dot, or **Change Printer** in [Admin Settings](./admin-settings.md)) and tap **Test Print**. A test label should print within a few seconds.
3. If the test fails:
   - Confirm the printer is powered on and on the **same Wi-Fi network** as the tablet. The kiosk prints over the network, not over USB or Bluetooth.
   - Tap **Rescan**. If the printer is not found, [enter it by IP address](./printer-setup.md#entering-a-printer-by-ip-address). Printers that get a new address from the router each time they power on will stop printing until re-selected, so give the printer a reserved address.
   - Brother QL printers only print when the loaded roll matches the label size, **DK-1201 (1.1" x 3.5")**. A wrong roll fails silently.
   - After changing the selection, tap **Save & Restart**.
4. Expand **Diagnostics** at the bottom of printer settings to see the printer log. It records each print job, how many labels were produced, and any error the printer driver returned. Tap **Share** to send the log to your support contact, or **Clear** to start fresh.

If check-in finished but no labels came out and the family has already walked away, a [manned station](../check-in/checking-out.md#reprinting-labels) can reprint their labels from the check-out screen using the security code.

If a check-in produced **no labels at all** but the printer works, the groups chosen probably do not have **Print Nametag** or **Parent Pickup** turned on. A phone check-in scan then says **You're checked in! No labels needed.** See [Label Printing](../check-in/completing-checkin.md#label-printing).

## Camera Problems

The scanner needs camera access. The first time it opens, the tablet asks for permission; tap **Allow**. If the kiosk shows **Camera access is needed to scan check-in codes.**, tap **Allow Camera**. If that button is missing, the permission was denied permanently -- open the tablet's system settings, find the B1 Checkin app, and allow the camera there.

If the camera is pointing the wrong way, tap the **flip** button in the corner of the camera view. The lookup scanner starts on the **front** camera (for a tablet facing the family); the check-out scanner starts on the **back** camera.

## Forgotten Kiosk PIN

There is no PIN reset inside the app. Clear the app's data or uninstall and reinstall it, then [log in](./logging-in.md) and set it up again. See [Protecting the Kiosk with a PIN](./admin-settings.md#protecting-the-kiosk-with-a-pin).

## The Kiosk Shows the Wrong Service, Church, or Branding

- **Wrong service** -- open [Admin Settings](./admin-settings.md) and tap **Change Service**.
- **Wrong church** -- tap **Logout** in Admin Settings, sign in, and pick the right church.
- **Old logo or colors** -- tap **Change Service** or restart the app so the kiosk reloads the theme. See [When Appearance Changes Take Effect](./kiosk-display.md#when-appearance-changes-take-effect).

## Getting Help

Email [support@churchapps.org](mailto:support@churchapps.org) with the app **version number** (shown at the bottom of the login screen and the Admin Settings screen), the tablet model, the printer model, and a copy of the **Diagnostics** log if the problem involves printing.

## Related Articles

- [Printer Setup](./printer-setup.md)
- [Admin Settings and Kiosk PIN](./admin-settings.md)
- [Completing Check-In](../check-in/completing-checkin.md)
- [Check-In Safety](../../b1-admin/attendance/checkin-safety.md)
