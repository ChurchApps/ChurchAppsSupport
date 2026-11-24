---
title: "Admin Settings and Kiosk PIN"
sidebar_label: "Admin Settings"
description: "Open the hidden Admin Settings on a B1 Checkin kiosk, protect them with a PIN, switch between self-service and manned station modes, and log the tablet out."
---

# Admin Settings and Kiosk PIN

<div class="article-intro">

Every B1 Church Checkin tablet has a hidden **Admin Settings** screen for the volunteer or staff member who looks after it. From there you change the service or printer, protect the kiosk with a PIN, turn on manned station tools, make the tablet start on the camera scanner, send an emergency broadcast, or log out. These settings live on the tablet itself, so each kiosk can be set up differently.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Log in](./logging-in.md) to the kiosk and select your church
- If a kiosk PIN has already been set, know the PIN -- there is no way to reset it from inside the app

</div>

## Opening Admin Settings

Admin Settings are intentionally hidden so families using the kiosk cannot change its configuration.

1. Tap the **church logo** in the header **seven times** in quick succession. Pause for more than two seconds and the count starts over.
2. If a kiosk PIN is set, the **Enter Admin PIN** window appears. Type the PIN on the number pad and tap **OK**.
3. The **Admin Settings** screen opens.

Tap **Back to Kiosk** at the bottom to return to the screen you came from.

:::tip
When a printer is selected, a small status dot appears at the right edge of the header. Tapping it opens the [printer settings](./printer-setup.md) directly; the PIN prompt appears first if a PIN is set.
:::

## The Admin Settings Options

| Option | What it does |
|---|---|
| **Change Service** | Returns to the [services screen](../check-in/selecting-service.md) so you can pick a different service for this kiosk. |
| **Change Printer** | Opens [printer settings](./printer-setup.md) to scan for, select, and test a label printer. |
| **Set Admin PIN** / **Change Admin PIN** | Creates or changes the PIN that protects Admin Settings. The label reads **Set Admin PIN** until a PIN exists. See [Protecting the Kiosk with a PIN](#protecting-the-kiosk-with-a-pin). |
| **Emergency broadcast** | Texts the guardians of every household checked in to a service. See [Emergency Broadcast](../check-in/checking-out.md#emergency-broadcast). |
| **Manned station mode** | Switch. Adds check-out, paging, reprint, and profile editing to this station. See [Self-Service and Manned Stations](#self-service-and-manned-stations). |
| **Start on scanner** | Switch. Opens the camera scanner instead of the keypad, and returns to it after each check-in. See [Starting on the Scanner](../check-in/scanning-codes.md#starting-on-the-scanner). |
| **Logout** | Signs the tablet out of the kiosk account. See [Logging Out](#logging-out). |

The app version number is shown at the bottom of the screen. Have it handy if you contact support.

## Protecting the Kiosk with a PIN

Without a PIN, anyone who knows the seven-tap gesture can open Admin Settings. A PIN is strongly recommended on any tablet left in a lobby.

### Setting a PIN

1. Open Admin Settings and tap **Set Admin PIN**.
2. Under **Enter a PIN**, type **4 to 6 digits** on the number pad. The six circles above the keypad fill in as you type; the last two are dashed because they are optional. Tap **Continue**. A PIN shorter than four digits shows **PIN must be at least 4 digits**.
3. Under **Confirm your PIN**, type the same digits again and tap **Confirm your PIN**. If the two entries differ, the app shows **PINs do not match. Please try again.** and clears the second entry.

The PIN takes effect immediately. From now on the seven-tap gesture and the header printer dot both ask for it.

### Changing the PIN

1. Open Admin Settings (entering the current PIN) and tap **Change Admin PIN**.
2. Enter the **current PIN** and tap **OK**.
3. Enter the **new PIN** and tap **Continue**, then confirm it.

### Wrong PIN and Lockout

Each wrong entry shows **Incorrect PIN. Please try again.** with the number of attempts remaining. After **three** wrong attempts the keypad locks for **30 seconds** with a countdown and the message **Too many failed attempts. Please wait.** The count resets once the lockout ends or a correct PIN is entered.

:::warning
There is no "forgot PIN" option. The PIN is stored only on the tablet, so if nobody remembers it the only way back into Admin Settings is to clear the app's data or uninstall and reinstall the app, then [log in](./logging-in.md) and set the kiosk up again. Write the PIN down somewhere your check-in team can find it.
:::

### Removing the PIN

The PIN cannot be removed on its own. [Logging out](#logging-out) clears the PIN along with the church selection; after logging back in, the kiosk is unlocked until you set a new PIN.

## Self-Service and Manned Stations

Every kiosk starts in **self-service** mode, where families run the whole check-in themselves. Turning on **Manned station mode** adds tools meant for a station a volunteer is standing at:

- A **Check out** button on the [lookup screen](../check-in/looking-up-members.md), which opens the [check-out flow](../check-in/checking-out.md) with security-code entry, scanning, and name or phone search.
- A **pencil icon** on each household member card for [editing the person's profile](../check-in/household-review.md#editing-a-profile-manned-stations) -- name, birth date, mobile phone, email, and name tag notes.
- **Page parent** and **Reprint labels** buttons on the check-out screen.

The switch applies to this tablet only and is remembered across restarts. Tap the row or the switch to toggle it; the change takes effect the next time the lookup screen is shown.

:::tip
A common setup is one or two self-service kiosks in the lobby plus one manned station at the children's check-in desk for check-out, questions, and lost labels.
:::

## Starting on the Scanner

Turn on **Start on scanner** on a station where most families [check in on their phones](../../b1-church/checkin/self-checkin.md) first and only need labels printed. The lookup screen opens straight to the camera scanner and stays there after each family's labels print. Details are in [Scanning a Phone Check-In Code](../check-in/scanning-codes.md#starting-on-the-scanner).

## Logging Out

1. Open Admin Settings and tap **Logout**.
2. A **Secret Menu** confirmation asks **Are you sure you want to logout?** Tap **Logout** to confirm or **Cancel** to stay signed in.

Logging out removes the saved sign-in, the church selection, and the kiosk PIN, and returns to the [login screen](./logging-in.md). The printer selection, **Manned station mode**, and **Start on scanner** settings stay on the tablet, so after logging back in you do not need to set the printer up again.

:::warning
Only log out when you need to switch accounts or churches. A logged-out kiosk needs the account email, password, and any two-factor code before it can check anyone in.
:::

## What Is Stored on the Tablet

| Item | Where it is set | Cleared by |
|---|---|---|
| Sign-in token (not your password) | [Logging in](./logging-in.md) | Logout |
| Selected church and its logo | Church selection | Logout |
| Kiosk PIN and lock | Admin Settings | Logout |
| Selected printer | [Printer settings](./printer-setup.md) | Choosing **No Printer** |
| Manned station mode, Start on scanner | Admin Settings | Turning the switch off |
| Cached label templates and kiosk theme | Downloaded automatically | Refreshed on each load |

## Related Articles

- [Logging In](./logging-in.md) -- signing in and selecting a church
- [Printer Setup](./printer-setup.md) -- choosing and testing a label printer
- [Checking Out & Child Safety](../check-in/checking-out.md) -- the manned station tools
- [Kiosk Display, Idle Screen, and Language](./kiosk-display.md) -- the church-wide settings this kiosk honors
