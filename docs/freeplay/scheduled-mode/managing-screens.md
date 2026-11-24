---
title: "Managing Screens and Groups"
description: "Check which FreePlay TVs are online and ready for Sunday, then edit screen settings and set up groups that share one calendar in FreePlay Admin."
---

# Managing Screens and Groups

<div class="article-intro">

The **Screens** page in FreePlay Admin lists every TV paired to your church, with what it's playing now and whether it's ready for Sunday. You also manage **screen groups** here. Screens in the same group share one calendar and one default loop.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Sign in to FreePlay Admin at [admin.freeplay.church](https://admin.freeplay.church)
- [Pair at least one screen](./pairing-a-screen.md)

</div>

## The Screens Page

Across the top, three numbers give you a quick health check:

- **Online now** - Screens that have checked in during the last 15 minutes
- **Ready for Sunday** - How many scheduled screens have everything downloaded through this coming Sunday
- **Needs attention** - Screens that are offline or missing files

The subtitle under the page title sums it up, for example **4 screens in 2 groups · First Church**.

Below that, use **Search screens** to find a screen by label, group, or what it's playing. The filter chips narrow the list to **All**, **Scheduled**, **Manual**, **Needs attention**, or a single group. Switch between **Table** and **Grid** views with the toggle on the right; FreePlay Admin remembers your choice in this browser.

Each screen shows its:

- **Label** - The name you gave it, with the device model and FreePlay version underneath. A screen paired without a label reads **Unnamed screen**
- **Group**
- **Mode** - **Scheduled** or **Manual**
- **Now playing** - What's on screen right now. Manual screens show **Classroom · teacher presses Start**
- **Ready through** - The date the screen has downloaded through. If files didn't download, it shows **N files missing** instead. A new screen shows **Waiting for first sync**, and manual screens show **n/a**
- **Last seen** - When the screen last checked in, for example **3 min ago**. A screen that hasn't checked in for 15 minutes shows **Offline**, and one that never connected shows **Never seen**

Use **Present** (scheduled screens only) to play the screen's calendar in your browser, or **Edit** to change its settings. Click the label to open the screen's own page.

## Viewing a Screen

Click a screen's label to open its page. On the left:

- The screen's label, device model, and FreePlay version, with pills for its group and its mode
- A status line: **Online · last seen 2 min ago**, **Offline · last seen 3 hr ago**, or **N files missing · last seen ...**
- **Present in browser** (scheduled screens only) - Play this screen's calendar full screen in your browser, as it would look on the TV. See [Presenting from a Browser](./scheduled-playback.md#presenting-from-a-browser)
- **Edit** - Change the label, group, or mode
- **More** > **Unpair** - Disconnect the TV. It goes back to showing a pairing code
- **Paired** - The date the TV was paired

The rest of the page has these sections:

- **Now and next** (scheduled screens) - What's playing now and until when, followed by up to six upcoming items from the next 7 days. If nothing is scheduled, it shows the default loop and when the next schedule starts, or **Nothing (screen is dark)**. Click **Open calendar** to jump to this group's calendar
- **Manual mode** (manual screens) - A reminder that someone picks content with the remote, and that **Edit** switches the screen to **Scheduled**
- **Downloads** (scheduled screens) - **Ready through** a date when everything is downloaded, or a table of the files that are missing. A screen that hasn't checked in yet says **This screen hasn't reported its downloads yet**
- **Device** - **Device ID**, **Platform**, **Model**, **App version**, **IP address**, **Polls** (how often the TV checks in), **Storage** (used and free), **Last seen**, and **Mode**
- **Recent** - The latest activity the screen has reported, up to ten entries

:::tip
If a screen shows missing files, make sure it's online and has free storage. The TV downloads missing files on its own the next time it checks in.
:::

## Editing a Screen

1. Click **Edit** next to the screen, or on its page.
2. Change the **Label**, **Group**, or **Mode** (**Scheduled** or **Manual**).
3. Click **Save**.

Moving a screen to another group switches it to that group's calendar. Choosing **Manual** turns the **Group** field off, because a manual screen doesn't follow a calendar. You can also create a group from here with **＋ New group…**.

## Screen Groups

A screen group is a set of screens that play the same thing at the same time, like "Lobby" or "Kids Wing". Every group has its own calendar and can have a **default loop** that plays whenever nothing is scheduled.

To manage groups, click **Groups** at the top of the **Screens** page. The **Screen groups** list shows each group's **Name**, how many **Screens** it has, and its **Default loop** (or **None — screen goes dark**). Click **Screens** to go back.

### Adding a Group

1. On the **Screen groups** view, click **Add group**.
2. Enter a **Name**, for example "Lobby".
3. Choose a **Default loop** playlist, or leave it on **None — screen goes dark**.
4. Click **Save**.

You can also create a group while you pair a screen by choosing **＋ New group…** in the **Group** field.

### Editing or Deleting a Group

1. Click **Edit** next to the group.
2. Change the name or default loop, then click **Save**.
3. To remove the group, click **Delete** and confirm.

:::warning
Deleting a group deletes its schedule too. Screens in that group go dark until you move them to another group.
:::

## Related Articles

- **[Pairing a Screen](./pairing-a-screen.md)** - Add a new TV
- **[Scheduling the Calendar](./scheduling-the-calendar.md)** - Set what each group plays and its default loop
- **[Scheduled Playback on the TV](./scheduled-playback.md)** - What the "Ready through" date means on the TV itself
