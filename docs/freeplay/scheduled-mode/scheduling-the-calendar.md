---
title: "Scheduling the Calendar"
---

# Scheduling the Calendar

<div class="article-intro">

The **Calendar** page in FreePlay Admin controls what each screen group plays and when. Add a schedule for a playlist, a service plan, or a provider folder, and set it to repeat weekly or play one time. When nothing is scheduled, the group's default loop plays.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Create at least one screen group. See [Managing Screens and Groups](./managing-screens#screen-groups)
- [Build a playlist](./building-playlists), or have a plan type set up in B1 Admin

</div>

## Reading the Calendar

1. Go to **Calendar**.
2. Pick a screen group from the tabs along the top. Each tab shows how many schedules the group has.
3. The week view runs from Monday to Sunday, 6 AM to 10 PM. A red line marks the current time.
4. Use the arrows to move to the previous or next week, or click **Today** to come back to this week.

The page subtitle shows the time zone used for the calendar. Schedules follow your church's time zone, which you set in B1 Admin under [Church Information](../../b1-admin/settings/church-settings.md#time-zone). If your church doesn't have a time zone set, FreePlay uses your campus's time zone. The calendar and your TVs use the same time zone, so a block placed at 9:00 AM on the calendar plays at 9:00 AM on the screen, even if your computer is set to a different time zone.

Schedules are color-coded by type. A legend explains the colors:

- **Default loop** - Hatched background, shown behind everything when the group has a default loop
- **Playlist**
- **Service plan**
- **Provider folder**

Each block shows its name, and taller blocks also show the times, whether it repeats (**weekly** or **once**), and what happens when it finishes early.

## Setting the Default Loop

The default loop plays on the group's screens whenever nothing is scheduled.

1. On the **Calendar** page, click **Default loop…** in the header. If a default loop is already set, the button shows **Default loop:** followed by the playlist's name.
2. Choose a **Playlist**, or choose **None — screen goes dark**.
3. Click **Save**.

## Adding a Schedule

There are three ways to start a new schedule:

- Click an empty spot on the calendar. The form opens with that day and half-hour already filled in.
- Click **Add schedule** in the header.
- Choose **Add schedule** from the command palette (**Ctrl+K** or **⌘K**).

Then fill in the form:

1. **Play** - Choose what plays:
   - **Playlists** - Any playlist you've built
   - **Service plans** - A plan type from B1 Admin, marked **(current plan)**. The screen plays whatever plan is current for that plan type each week, including Go Curriculum lessons (customized ones too), which use the Go login linked to the plan type's ministry
   - **Provider folder…** - Opens **Choose a provider folder**. Browse to a folder and click **Use this folder**. To pick a different folder later, click **Change**
2. **Repeats** - Select the days of the week this schedule plays. For a single date instead, turn on **One time** and pick the **Date**.
3. **Start** and **End** - The times the schedule starts and stops.
4. **If it finishes early** - What to do when the content runs out before the end time:
   - **Loop until the end time** - Starts over from the beginning. Good for signage loops, announcements, and countdowns
   - **Teacher paced** - Slides wait for the teacher's remote. The lesson stays up past the end time until the last slide
   - **Play once, then go back to the default loop**
5. For repeating schedules, set **Starts** to the first date. Under **Ends**, choose **Never**, or choose **On date** and enter an **End date**.
6. Click **Save**.

:::info
**Teacher paced** replaced the older "hold the last slide" option. Schedules saved with that option now play as teacher paced.
:::

## Editing or Deleting a Schedule

1. Click the schedule's block on the calendar.
2. Change any field and click **Save**, or click **Delete** to remove the schedule.

## Overlapping Schedules

If two schedules overlap, the form shows a warning: **Overlaps another schedule. The one that starts later wins.** While the later schedule is running, the screens play it. When it ends, they go back to the earlier schedule if it's still running.

## How Screens Pick Up Changes

Paired screens download everything scheduled for the next 7 days, and they check for changes on their own. You don't need to touch the TV after you edit the calendar. To see when a screen has everything it needs, check **Ready through** on the [Screens page](./managing-screens).

## Related Articles

- **[Building Playlists](./building-playlists)** - Create the playlists you schedule
- **[Scheduled Playback on the TV](./scheduled-playback)** - How teacher paced lessons and the remote work on the TV
- **[Managing Screens and Groups](./managing-screens)** - Add groups and check each screen's downloads
