---
title: "Scheduled Playback on the TV"
description: "A paired FreePlay TV downloads the week ahead and plays by the clock, even offline. Covers the info panel, remote buttons, and pinning a playlist."
---

# Scheduled Playback on the TV

<div class="article-intro">

Once a TV is paired to a calendar, FreePlay runs it for you. It downloads the week ahead, switches content at the scheduled times, and keeps playing from its own storage if the internet goes out. A teacher or volunteer can still pause, skip, and jump around with the TV remote.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Pair the TV to a calendar](./pairing-a-screen.md)
- [Put something on the calendar](./scheduling-the-calendar.md), or set a default loop for the screen's group

</div>

## What the TV Does on Its Own

- **Opens straight to the schedule** - When a paired TV starts FreePlay, it goes directly to the scheduled player
- **Downloads ahead** - FreePlay downloads every file scheduled for the next 7 days, plus the default loop, and plays from those downloads. The default loop and the next three days come first
- **Plays by the clock** - At each scheduled start time the screen switches to that content. When nothing is scheduled, it plays the group's default loop
- **Checks for changes** - FreePlay checks FreePlay Admin for calendar changes about every 10 minutes while it plays, and again whenever the app starts. It downloads anything new and deletes files that are no longer on the calendar
- **Skips what isn't there yet** - An item whose file hasn't finished downloading is skipped until it arrives
- **Fixes bad files** - If a downloaded file won't play, FreePlay takes it out of rotation and downloads it again
- **Reports back** - After each check the TV tells FreePlay Admin what it's playing, how much is downloaded, and how much storage is free, which is what the **Screens** page shows

A TV stops downloading when less than about 300 MB of storage is free. See [Downloads and Storage](../getting-started/downloads-and-storage.md).

Before the first files arrive, the screen shows **Loading schedule...** or **Downloading X of Y files**. If nothing is scheduled and the group has no default loop, it shows **Nothing is scheduled right now**.

## The Info Panel

Press **Select** on the remote to open the info panel. It closes on its own after about 8 seconds, or press **Back** to close it sooner. The panel shows:

- **Top right** - **Ready through** followed by a date when everything up to that date is downloaded, or **Downloading** while files are still coming in. Below that, **N of M files downloaded** and a progress bar
- **Bottom left** - The name of what's playing (or **Default loop**), **item X of Y**, and **next:** the title and time of what's coming up
- **Last checked** - A line such as **Manifest #12 · last checked 3 min ago**, which tells you when FreePlay last checked for schedule changes

The panel also has three buttons:

- **Pin This Playlist** - Keep the current content playing in a loop and ignore the calendar. Select **Unpin Playlist** to go back to the schedule. A pinned TV also stops checking the clock, so unpin it when you're done
- **Browse Content** - Leave the scheduled player and open the library of your first connected provider, or the **Content Providers** screen if none is connected
- **Settings** - Open FreePlay settings, where you can [unpair or pair to a different calendar](./pairing-a-screen.md#changing-or-unpairing-from-the-tv)

Playback keeps going behind the panel.

:::tip
To go back to the schedule after browsing, press **Back** on the remote from the **Content Providers** screen, or open **Settings**, select **Pair to a calendar**, and choose **Back to schedule**. A paired TV also returns to the scheduled player whenever FreePlay comes back to the foreground, and it always opens to the scheduled player.
:::

## Remote Controls

| Remote Button | Action |
|---|---|
| **Select** | Open the info panel |
| **Play/Pause** | Pause or resume. A play icon shows while paused |
| **Right arrow** | Next slide or video |
| **Left arrow** | Previous slide or video |
| **Up arrow** | Open the slide overview to jump to any slide |
| **Fast Forward** | Jump ahead 10 seconds in a video |
| **Rewind** | Jump back 10 seconds in a video |
| **Back** | Close the slide overview or info panel, or open the info panel |

Next and previous stay within the content that's playing now. They only wrap around from the last item to the first when the schedule is set to loop. Fast Forward and Rewind only work during a video. They do nothing on a slide.

### Jumping to a Slide

Press **Up** to open the slide overview. It shows every item in the current playlist or lesson, with the one on screen marked **NOW PLAYING**. Move to the one you want and press **Select** to jump straight to it, or press **Back** to close it. Items whose files haven't downloaded yet can't be jumped to. The item on screen starts again from the beginning when the overview closes.

## Teacher Paced Lessons

When a schedule is set to **Teacher paced**, image slides don't move on by themselves. The teacher moves forward with the **Right arrow**. A video plays to the end and then moves on to the next item.

A teacher paced lesson stays on screen past its scheduled end time until the teacher reaches the last slide and it finishes. Then the screen moves on to whatever is scheduled next. This keeps a class that runs long from being cut off in the middle of the lesson.

## Presenting from a Browser

You can also play a screen's calendar in a web browser. In FreePlay Admin, open the screen from the **Screens** page and click **Present in browser**, or click **Present** in the screen's row. The browser follows that screen's calendar the same way the TV does: it switches content at the scheduled times, loops or plays once as the schedule says, and falls back to the group's default loop. Teacher paced lessons wait for the **→** key, and the bar reads **Holding last slide** when the last one is reached.

Move the mouse to show the controls bar. It reads **Following Lobby left's calendar · next:** with the next schedule's name and time, and names the item on screen as **2 of 8 — title**. It hides again after a few seconds. Use **Space** to pause, **←** / **→** to skip, **F** for fullscreen, and **Esc** to exit. Streaming over the internet, the browser doesn't download ahead the way the TV does, so it needs a connection the whole time.

## Related Articles

- **[Scheduling the Calendar](./scheduling-the-calendar.md)** - Set what plays and what happens when it finishes early
- **[Managing Screens and Groups](./managing-screens.md)** - Check each screen's downloads from FreePlay Admin
- **[Downloads and Storage](../getting-started/downloads-and-storage.md)** - How FreePlay frees space when a TV fills up
- **[Playing Content](../content-providers/playing-content.md)** - Player controls when you play content yourself
