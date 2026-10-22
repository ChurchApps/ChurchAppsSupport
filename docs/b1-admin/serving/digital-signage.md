---
title: "Digital Signage"
---

# Digital Signage

<div class="article-intro">

Send your lesson content to a lobby or hallway TV using a digital signage feed. Each plan type gets a feed URL that always plays the current plan's content, so there's nothing to update week to week. If your TVs run FreePlay, you can schedule the plan type on them in FreePlay Admin instead.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up a [plan type](./plans.md) with [Lessons.church](../../b1-church/content/lessons.md) or other lesson content scheduled
- Have a [SignPresenter](https://www.signpresenter.com) account and a device set up to display it, or a TV running [FreePlay](../../freeplay/)

</div>

## Getting the Feed URL

1. Go to **Serving**, select the ministry containing your plan type, and click the plan type to open it.
2. Click **Digital Signage** (the TV icon) at the top of the plan type page.
3. In the **Digital Signage Feed** dialog, click the copy button next to **Feed Url**.

:::info
The feed URL is tied to the plan type, not a single plan. It automatically tracks whichever plan is scheduled as current for that plan type, so you only need to set it up once.
:::

## Connecting to SignPresenter

The feed is built to work with [SignPresenter](https://www.signpresenter.com), a third-party digital signage app. Paste the copied URL into SignPresenter as an external feed to display your current lesson content on a connected screen.

For step-by-step setup inside SignPresenter, see [SignPresenter's Lessons.church guide](https://support.signpresenter.com/topics/lessons-dot-church.html). The dialog also links to these instructions.

## Using FreePlay TVs Instead

If your screens run [FreePlay](../../freeplay/), you don't need the feed URL. The **Digital Signage Feed** dialog links to **admin.freeplay.church/calendar**, where you can schedule this plan type on your FreePlay TVs:

1. Click the **admin.freeplay.church/calendar** link in the dialog. FreePlay Admin uses the same login as B1 Admin.
2. Pick the screen group for your TVs and click **Add schedule**.
3. Under **Play**, choose your plan type from **Service plans**. It's marked **(current plan)**.
4. Set the days and times, then click **Save**.

The TVs play whatever plan is current for that plan type each week, at the times you set. This works with Go Curriculum lessons too, including plans you've customized. FreePlay signs in with the Go Curriculum account linked to the ministry under **Content Providers** (see [Scheduling Lessons](./scheduling-lessons.md)), or the church's Go Curriculum connection if the ministry has none. See [Scheduling the Calendar](../../freeplay/scheduled-mode/scheduling-the-calendar) for all the options, and [Pairing a Screen](../../freeplay/scheduled-mode/pairing-a-screen) to add a TV.

:::note
The feed URL doesn't include Go Curriculum media, because that content needs your church's Go Curriculum login. To show a Go Curriculum lesson on a lobby or classroom TV, use FreePlay.
:::

## Next Steps

- Manage the plans that feed this signage display on the [Plans](./plans.md) page
- Schedule content with [Lessons.church](./scheduling-lessons.md)
- Put FreePlay TVs on a calendar with [Scheduled Mode](../../freeplay/scheduled-mode/)
