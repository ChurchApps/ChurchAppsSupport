---
title: "Browsing Sermons on Your B1.church Website"
sidebar_label: "Sermons"
description: "Browse and watch recorded sermons from your church library on the B1.church site, grouped into series or playlists. No login needed."
---

# Sermons

<div class="article-intro">

The Sermons page lets you browse and watch recorded sermons from your church. Your church's sermon library is displayed using the appearance and layout your church has configured, so the look and feel will match your church's branding.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- No login is required to view sermons. The Sermons page is publicly accessible.
- Your church must have added sermon content through their admin portal.

</div>

## Browsing Sermons on the Website

1. Navigate to the **Sermons** page from your church's site navigation.
2. The page opens on **Playlists**: a card for each of your church's sermon series, with its picture and title.
3. Click a playlist to see the sermons in it, each with its picture and title.
4. Click a sermon to play it on the page (a sermon that has no video link opens its details without a player).

The buttons above the list (**Playlists**, then the playlist's name, then the sermon's title) take you back a step. Your church can choose other layouts for its sermons page -- a grid or list of sermons, or the latest sermon featured at the top -- with a **Back** button after you play one. Sermons may be video hosted on platforms like YouTube, Vimeo, or Facebook.

Each sermon also has its own page at `/sermons/` followed by the sermon's ID, which you can share or bookmark. It shows the video (or an audio player for an audio-only sermon), the series name, the title, the date, and the description. Below the player, **Share** sends the page's address ("Link copied to clipboard" if your device can't share), and a sermon with an **Audio File URL** also shows **Download audio**, which saves the audio file under the sermon's title.

To always reach the newest sermon, use `/sermons/latest` on your church's site (for example, `https://yourchurch.b1.church/sermons/latest`). It opens the page of the sermon with the most recent publish date, so the same link stays current every week. If your church has no sermons yet, it opens the Sermons page instead.

A sermon without its own picture shows its series (playlist) picture instead, on its page, in link previews when the page is shared, and in the member portal.

:::info Podcast feed
Your church's sermons are also published as a podcast (RSS) feed. Podcast apps and feed readers can find it from any sermon's page. Staff set it up under [Podcast Feed](../../b1-admin/sermons/podcast-feed.md).
:::

## Sermons in the Member Portal

The **Sermons** screen in the member portal (`/mobile/sermons`) is laid out as one page of sections:

- **Watch latest** at the top opens the newest sermon. While your church is live, it becomes **Watch Live** and opens the [live stream](./live-streaming.md).
- **Latest** -- the newest sermon with its picture, series, date, and length.
- **Live** -- shown when a stream is live or starts within the next 24 hours, with the next service time. Tap it to open the stream.
- **Live** rows show the service's sermon description with a red **Live** badge while it is live, or "Next service ·" and the time otherwise.
- **Recent** -- the next three sermons. Tap **All sermons** to see every sermon, filter by year with the year pills (shown when there is more than one year; **All** clears the filter), or search titles and descriptions across all years ("No sermons match your search." when nothing does).
- **Series** -- your church's three newest series with how many sermons each has. Tap **All series** for the full list, or tap a series to open it: the series page shows how many sermons it has and lists its sermons newest first, so the latest one is at the top. **Play from start** opens the series' first (oldest) sermon, so you can still follow a teaching series in order.

Tap a sermon to open it. The series name under the title is a link to the series. Tap the picture or **Watch Sermon** to play it, **Share** to send the video's own link (or the page's address for an audio-only sermon -- "Link copied to clipboard" if your device can't share), or **Open Link** to open the video on its own site (disabled when there is no video link). A sermon with an **Audio File URL** also shows **Listen**, which plays the audio right in the app, and **Download audio**, which saves the episode to your phone; audio-only sermons are marked **Audio** in sermon lists. If your church publishes its sermons as a podcast, an admin can bring the episodes in as audio sermons with [Bulk Import](../../b1-admin/sermons/bulk-import.md#importing-podcast-episodes), so the podcast plays right in the Sermons tab. Playing the video stops the audio and vice versa. Below are an **About** section with the description and an **In this series** list of up to three other sermons from the series, with an **All in series** link.

:::tip
If you are looking for a live broadcast rather than a recorded sermon, check the [Live Streaming](./live-streaming.md) page instead.
:::

## Availability

The Sermons page is available when your church has added sermon content through their admin portal. If you do not see a **Sermons** link in your church's navigation, your church may not have this feature configured yet. Contact your church administrator for more information.
