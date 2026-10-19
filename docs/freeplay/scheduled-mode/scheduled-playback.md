---
title: "Scheduled Playback on the TV"
---

# Scheduled Playback on the TV

<div class="article-intro">

Once a TV is paired to a calendar, FreePlay runs it for you. It downloads the week ahead, switches content at the scheduled times, and keeps playing from its own storage if the internet goes out. A teacher or volunteer can still pause, skip, and jump around with the TV remote.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Pair the TV to a calendar](./pairing-a-screen)
- [Put something on the calendar](./scheduling-the-calendar), or set a default loop for the screen's group

</div>

## What the TV Does on Its Own

- **Opens straight to the schedule** - When a paired TV starts FreePlay, it goes directly to the scheduled player
- **Downloads ahead** - FreePlay downloads every file scheduled for the next 7 days, plus the default loop, and plays from those downloads
- **Plays by the clock** - At each scheduled start time the screen switches to that content. When nothing is scheduled, it plays the group's default loop
- **Checks for changes** - FreePlay checks FreePlay Admin for calendar changes regularly and downloads anything new
- **Fixes bad files** - If a downloaded file won't play, FreePlay skips it and downloads it again

Before the first files arrive, the screen shows **Loading schedule...** or **Downloading X of Y files**. If nothing is scheduled and the group has no default loop, it shows **Nothing is scheduled right now**.

## The Info Panel

Press **Select** on the remote to open the info panel. It closes on its own after a few seconds. The panel shows:

- **Top right** - **Ready through** followed by a date when everything up to that date is downloaded, or **Downloading** while files are still coming in. Below that, how many files are downloaded and a progress bar
- **Bottom left** - The name of what's playing (or **Default loop**), which item is on screen, and what's coming up next and when
- **Last checked** - When FreePlay last checked for schedule changes

The panel also has three buttons:

- **Pin This Playlist** - Keep the current content playing in a loop and ignore the calendar. Select **Unpin Playlist** to go back to the schedule
- **Browse Content** - Leave the scheduled player to browse your connected providers
- **Settings** - Open FreePlay settings, where you can [unpair or pair to a different calendar](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
To go back to the schedule after browsing, close and reopen FreePlay. A paired TV always opens to the scheduled player.
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

Press **Up** to open the slide overview. It shows every item in the current playlist or lesson. Move to the one you want and press **Select** to jump straight to it.

## Teacher Paced Lessons

When a schedule is set to **Teacher paced**, image slides don't move on by themselves. The teacher moves forward with the **Right arrow**. A video plays to the end and then moves on to the next item.

A teacher paced lesson stays on screen past its scheduled end time until the teacher reaches the last slide and it finishes. Then the screen moves on to whatever is scheduled next. This keeps a class that runs long from being cut off in the middle of the lesson.

## Presenting from a Browser

You can also play a screen's calendar in a web browser. In FreePlay Admin, open the screen from the **Screens** page and click **Present in browser**. The browser follows that screen's calendar the same way the TV does, and the controls bar shows what's coming up next. Use **Space** to pause, **←** / **→** to skip, **F** for fullscreen, and **Esc** to exit.

## Related Articles

- **[Scheduling the Calendar](./scheduling-the-calendar)** - Set what plays and what happens when it finishes early
- **[Managing Screens and Groups](./managing-screens)** - Check each screen's downloads from FreePlay Admin
- **[Playing Content](../content-providers/playing-content)** - Player controls when you play content yourself
