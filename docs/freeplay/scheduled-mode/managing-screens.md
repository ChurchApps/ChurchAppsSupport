---
title: "Managing Screens and Groups"
---

# Managing Screens and Groups

<div class="article-intro">

The **Screens** page in FreePlay Admin lists every TV paired to your church, with what it's playing now and whether it's ready for Sunday. You also manage **screen groups** here. Screens in the same group share one calendar and one default loop.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Sign in to FreePlay Admin at [admin.freeplay.church](https://admin.freeplay.church)
- [Pair at least one screen](./pairing-a-screen)

</div>

## The Screens Page

Across the top, three numbers give you a quick health check:

- **Online now** - Screens that have checked in during the last 15 minutes
- **Ready for Sunday** - How many scheduled screens have everything downloaded through this coming Sunday
- **Needs attention** - Screens that are offline or missing files

Below that, use **Search screens** to find a screen by label, group, or what it's playing. The filter chips narrow the list to **All**, **Scheduled**, **Manual**, **Needs attention**, or a single group. Switch between **Table** and **Grid** views with the toggle on the right.

Each screen shows its:

- **Label** and device model
- **Group**
- **Mode** - **Scheduled** or **Manual**
- **Now playing** - What's on screen right now. Manual screens show **Classroom · teacher presses Start**
- **Ready through** - The date the screen has downloaded through. If files didn't download, it shows **N files missing** instead. A new screen shows **Waiting for first sync**
- **Last seen** - When the screen last checked in. A screen that hasn't checked in for a while shows **Offline**, and one that never connected shows **Never seen**

Use **Present** to play the screen's calendar in your browser, or **Edit** to change its settings.

## Viewing a Screen

Click a screen's label to open its page. On the left:

- **Present in browser** - Play this screen's calendar full screen in your browser, as it would look on the TV. See [Presenting from a Browser](./scheduled-playback#presenting-from-a-browser)
- **Edit** - Change the label, group, or mode
- **More** > **Unpair** - Disconnect the TV. It goes back to showing a pairing code

The rest of the page has these sections:

- **Now and next** - What's playing now and until when, followed by everything scheduled for the next 7 days. Click **Open calendar** to jump to this group's calendar
- **Downloads** - **Ready through** a date when everything is downloaded, or a list of the files that are missing
- **Device** - Device ID, platform, model, FreePlay app version, IP address, storage used and free, last seen, and mode
- **Recent** - The latest activity the screen has reported

:::tip
If a screen shows missing files, make sure it's online and has free storage. The TV downloads missing files on its own the next time it checks in.
:::

## Editing a Screen

1. Click **Edit** next to the screen, or on its page.
2. Change the **Label**, **Group**, or **Mode** (**Scheduled** or **Manual**).
3. Click **Save**.

Moving a screen to another group switches it to that group's calendar.

## Screen Groups

A screen group is a set of screens that play the same thing at the same time, like "Lobby" or "Kids Wing". Every group has its own calendar and can have a **default loop** that plays whenever nothing is scheduled.

To manage groups, click **Groups** at the top of the **Screens** page. The **Screen groups** list shows each group's name, how many screens it has, and its default loop. Click **Screens** to go back.

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

- **[Pairing a Screen](./pairing-a-screen)** - Add a new TV
- **[Scheduling the Calendar](./scheduling-the-calendar)** - Set what each group plays and its default loop
- **[Scheduled Playback on the TV](./scheduled-playback)** - What the "Ready through" date means on the TV itself
