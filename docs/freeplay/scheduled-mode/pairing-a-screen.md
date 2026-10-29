---
title: "Pairing a Screen"
---

# Pairing a Screen

<div class="article-intro">

To put a TV on a calendar, pair it with **FreePlay Admin**. The TV shows a four-letter code. You enter that code at [admin.freeplay.church](https://admin.freeplay.church) and pick the screen group whose calendar it should follow. You only do this once per TV.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install and launch FreePlay on the TV. See [Getting Started](../getting-started/)
- Have a ChurchApps login for your church so you can sign in to FreePlay Admin
- Optionally, [build a playlist](./building-playlists) and [schedule it](./scheduling-the-calendar) first so the TV has something to play right away

</div>

## Showing the Code on the TV

1. On the TV, open **Settings** at the bottom of the sidebar.
2. Select **Pair to a calendar**. The row shows **Not paired** when the TV isn't paired yet.
3. The **Pair this screen** screen shows a QR code and a four-letter pairing code, with the message **Scan with your phone, or go to freeplay.church/pair and enter this code**.
4. Below the code, **Waiting for confirmation** pulses while FreePlay waits for you to finish pairing.

The code lasts 15 minutes, and a countdown below it shows how much time is left. When the time runs out, FreePlay shows a new code on its own. You can also select **Generate New Code** for a fresh one, or **Cancel** to go back to Settings.

## Pairing in FreePlay Admin

1. Scan the QR code with your phone, or go to **freeplay.church/pair** on any computer or phone. Sign in if you're asked to. FreePlay Admin opens the **Pair screen** form with the code already filled in.
   - You can also open the form yourself. Go to **Screens** in FreePlay Admin and click **Pair screen**.
2. Check the **Pairing code**. It's the four letters on the TV.
3. Enter a **Label** so you can tell this TV apart from the others, for example "Lobby left". This is optional.
4. Under **Group**, choose the screen group whose calendar this TV should follow. To start a new one, choose **＋ New group…** and enter a **New group name**.
5. Under **Mode**, leave **Scheduled** selected. The TV will play by the group's calendar on its own.
6. Click **Pair**.

The TV shows **Connected!** and then **Loading your schedule...**. It downloads what's scheduled and starts playing. See [Scheduled Playback on the TV](./scheduled-playback).

:::info
If FreePlay Admin says **That code didn't match a TV**, check the code on the screen. If it has expired, use the new code the TV is showing now.
:::

### Scheduled vs. Manual

The **Mode** setting has two options:

- **Scheduled** - Plays by the group's calendar on its own. Nobody has to press Start.
- **Manual** - Someone picks content with the remote. A manual screen still appears in your **Screens** list, but it doesn't follow a calendar, so the **Group** field is turned off.

You can switch a screen's mode later from **Edit** on the [Screens page](./managing-screens).

## Pairing to a Service Plan Instead

The code on the **Pair this screen** screen also works in B1 Admin. If you enter it there and pick a plan type under **Show Plans For**, the TV follows that plan type in [Plan Mode](../plan-mode/) instead of a calendar. See [Pairing Your Device](../plan-mode/device-pairing).

## Changing or Unpairing from the TV

Once the TV is paired, the **Pair to a calendar** row in **Settings** shows the name of the screen group it follows. Select the row to open the **Paired to** dialog, which has three options:

- **Back to schedule** - Close the dialog and go back to the scheduled player. Nothing about the pairing changes.
- **Unpair** - Stop following a schedule. FreePlay opens the **Content Providers** screen.
- **Pair to a different calendar** - Unpair, then show a new pairing code so you can pair the TV again.

:::warning
Unpairing removes the files FreePlay downloaded for that calendar.
:::

## Unpairing from FreePlay Admin

1. Go to **Screens** and click the screen's label.
2. Click **More**, then **Unpair**.
3. Click **Unpair** again to confirm.

The TV goes back to showing a pairing code. Pair it again whenever you want it back.

## Related Articles

- **[Managing Screens and Groups](./managing-screens)** - Rename a screen, move it to another group, or check its downloads
- **[Scheduling the Calendar](./scheduling-the-calendar)** - Decide what the group's screens play
- **[Choosing a Pairing Mode](../getting-started/pairing-modes)** - Compare Scheduled Mode with Plan Mode and browsing providers yourself
