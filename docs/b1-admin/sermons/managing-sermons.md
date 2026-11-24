---
title: "Managing Sermons"
description: "Manage your sermon library in B1 Admin: add sermons from YouTube, Vimeo, or Facebook, fetch their details, schedule publish dates, attach podcast audio, and move or delete sermons in bulk."
---

# Managing Sermons

<div class="article-intro">

The Sermons page displays your entire sermon library. From here you can add new sermons, edit existing entries, organize your content by playlist, and copy your podcast feed address. Each sermon can link to video hosted on YouTube, Vimeo, or Facebook (or a custom embed URL) and carry an audio file for your podcast.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Create at least one [playlist](./playlists.md) to organize your sermons into
- Have your video IDs or URLs ready from YouTube, Vimeo, or Facebook

</div>

## Viewing Your Sermon Library

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Sermons**. The page is also available at **/sermons**.
2. The Sermons page shows your sermon entries in a table with each sermon's **Playlist** (or **No Playlist**), title (**Sermon**), and **Publish Date**, newest first, with a count such as "11 of 11 sermons". Type in the **Search sermons by title or playlist...** box to filter the list; the count updates to show how many match, and "No sermons found" appears when nothing does. Your playlists are listed in a **Playlists** panel beside the table, with the **Podcast Feed** panel below it.
3. Hover over a sermon row and click **Edit** to view or edit its details.

When your library is empty the table shows "No sermons yet" with an **Add First Sermon** button that opens the same form as **Add Sermon**.

## Adding a Sermon

1. Click the **Add Sermon** button in the top right corner and select **Add Sermon** from the dropdown. An **Edit Sermon** form opens above the list, with the title **New Sermon**, **YouTube** as the provider, and a duration of 90 minutes filled in for you.
2. Select a **Playlist** to assign the sermon to (or leave it at **None**).
3. Choose your **Video Provider** -- **YouTube**, **Vimeo**, **Facebook**, or **Custom Embed Url**. We recommend YouTube as it works best with the B1 system.
4. Enter the video's **YouTube ID**, **Vimeo ID**, **Sermon ID** (Facebook), or **Sermon Embed Url**. For YouTube, Vimeo, and Facebook you can paste the whole video link and B1 keeps just the ID:
   - YouTube: `youtube.com/watch?v=...`, `youtu.be/...`, `youtube.com/embed/...`, and YouTube Studio `studio.youtube.com/video/.../edit` links all work. The ID is the string after `v=`.
   - Vimeo: `vimeo.com/123456789` or `player.vimeo.com/video/123456789`.
   - Facebook: `facebook.com/video.php?v=123456789`.
   - **Custom Embed Url** takes the full address of an embeddable player and uses it as-is.
5. For YouTube and Vimeo, click **Fetch** beside the ID box to import the sermon details automatically: the title, description, publish date, duration, and thumbnail. If the details can't be loaded, "Couldn't fetch that video's details. Check the ID, or fill them in yourself." appears. Facebook and custom URLs have no Fetch button; fill the details in yourself.
6. Make any changes you want (see [Sermon Details](#sermon-details)) and click **Save**. The form closes and the sermon appears in the list.

:::tip
You can also add a permanent live stream URL by selecting **Add Permanent Live URL** from the **Add Sermon** dropdown. This creates a persistent connection to your YouTube channel's live stream using your Channel ID. See [Setting Up Your YouTube Live Stream](./live-streaming.md#setting-up-your-youtube-live-stream).
:::

## Editing a Sermon

1. Click **Edit** on any sermon row in your library to open its details above the list. Permanent live URLs open an **Edit Permanent Live Url** form instead, which has no playlist or publish date.
2. Update the title, date, description, thumbnail, duration, media links, or audio file as needed.
3. Click **Save** to apply your changes, or **Cancel** to close the form.

To remove a sermon, open it, click **Delete**, and confirm "Are you sure you wish to delete this sermon?".

### Adding a Sermon to Another Playlist

To list the same sermon in a second playlist (for example, a sermon that belongs to both a series and a "Best Of" collection), open the sermon, click **Add to another playlist**, pick the playlist from the dropdown that appears (the sermon's current playlist is not offered), and click **Add**. This saves a copy of the sermon in that playlist, so later edits to one copy do not change the other.

## Deleting Several Sermons at Once {#deleting-several-sermons-at-once}

To clean up your library in one pass -- for example, after a bulk import brought in videos you don't want -- select the sermons and delete them together:

1. Check the box at the start of each sermon row you want to remove. To select every sermon in the list, check the box in the header row. If you typed in the search box first, it selects only the sermons the search is showing.
2. Click **Delete Selected** above the table. The button shows how many sermons are selected, for example **Delete Selected (3)**.
3. In the **Delete selected sermons** window, check the count and click **Delete** to confirm, or **Cancel** to keep them.

A selection can mix sermons from different playlists and sermons with **No Playlist**. Changing the search text clears the selection. While you have a sermon or playlist open for editing, the checkboxes are turned off.

If some sermons can't be deleted, "Some sermons could not be deleted. Please try again." appears and those sermons stay selected, so you can click **Delete Selected** again to retry.

:::warning
Deleting sermons can't be undone. Permanent live URLs have no checkbox and can't be bulk deleted; open one with **Edit** to remove it.
:::

## Moving Several Sermons to a Playlist {#moving-several-sermons-to-a-playlist}

To reorganize your library in one pass -- for example, after a bulk import or when you split a long series in two -- select the sermons and move them together:

1. Check the box at the start of each sermon row you want to move, or check the box in the header row to select every sermon in the list. To work with one playlist's sermons, type the playlist's name in the search box first; the list then shows just that playlist's sermons.
2. Click **Move to Playlist** above the table. The button shows how many sermons are selected, for example **Move to Playlist (3)**.
3. Pick a playlist from the menu. To take the sermons out of their playlist, pick **No Playlist**.

A message such as "Moved 3 sermons to Easter Services" confirms the move, the **Playlist** column updates, and the selection clears. If the move fails, "Some sermons could not be moved. Please try again." appears and the sermons stay selected so you can try again. Permanent live URLs have no checkbox and can't be moved this way.

## Sermon Details

Each sermon entry can include:

- **Playlist** -- The series the sermon belongs to, or **None**. A sermon keeps its place in the library if you later delete its playlist; it then shows **No Playlist**.
- **Video Provider** and video ID -- Where the sermon video is hosted: YouTube, Vimeo, Facebook, or a custom embed URL.
- **Publish Date** -- Controls when the sermon is visible. A sermon whose publish date is today or earlier (or that has no date) appears on your website, in the member app, and in the podcast feed right away; a sermon with a future publish date is hidden everywhere except B1 Admin until that date arrives, which is how you schedule a sermon in advance. Sermons without a date show **Not scheduled** in the list and sort to the bottom.
- **Total Sermon Duration** -- The sermon's length, entered as **Minutes** and **Seconds**. **Fetch** fills it in for YouTube and Vimeo videos; sermons brought in by a YouTube bulk import have no duration until you set one. The member app shows the duration beside the sermon, and podcast apps use it as the episode length.
- **Thumbnail** -- A preview image shown in your sermon library, on your website, and in the app. Click the image to crop or replace it; the editor keeps a 16:9 shape and saves a 640x360 image. A sermon without a thumbnail uses its playlist's thumbnail instead.
- **Title** -- The sermon name displayed to visitors.
- **Description** -- A summary of the sermon content.
- **Audio File URL (for podcast)** -- A direct link to **one** MP3 or M4A file for this sermon. This is not the place for a podcast feed address; a feed pasted here will not play. To bring in a whole podcast, use [Bulk Import](./bulk-import.md#importing-podcast-episodes). Either paste a URL or, once the sermon has been saved, click **Upload Audio** to upload an MP3 or M4A file (up to 25 MB) and fill the box in automatically, then click **Save**. Sermons with this field (or a direct video file link) set are included in your [podcast feed](./podcast-feed.md), and members see **Listen** and **Download audio** on them in the app.

## Linking to the Latest Sermon

Your church website has a link that always opens your newest sermon: `/sermons/latest` (for example, `https://yourchurch.b1.church/sermons/latest`). It goes to the public sermon with the most recent **Publish Date**, so you can put it in a navigation menu, a newsletter, or an email signature once and never update it. If there are no sermons, it opens the Sermons page. See [Sermons](../../b1-church/content/sermons.md#browsing-sermons-on-the-website) for what visitors see.

## Your Podcast Feed {#your-podcast-feed}

Once at least one sermon has an audio or video file attached, B1 Admin generates a podcast RSS feed for your church automatically -- there's nothing to turn on. Find it in the **Podcast Feed** panel beside the sermon list (below the **Playlists** panel): click the copy icon to copy the feed URL, then submit that URL to Apple Podcasts, Spotify, or any other podcast directory. For what the feed contains, where its title and artwork come from, and how to submit it, see [Podcast Feed](./podcast-feed.md).

:::info
Sermons that only link to an embedded player (like a YouTube or Vimeo video ID) won't appear in the podcast feed -- podcast apps need a direct, downloadable media file. Add an **Audio File URL** to include a sermon.
:::

## Scheduling a Sermon for Live Stream

After adding a sermon, you can have it play on your live stream page at a service time:

1. In the Jump menu, choose **Sermons > Live Stream Times**.
2. Add or edit a service and, under **Video Settings**, select your sermon from the **Sermon** dropdown. Leave it at **Latest Sermon** to always play the sermon with the most recent **Publish Date** instead.
3. The sermon plays at the scheduled service time (or earlier, if **Start Video Early** is set). See [Live Streaming](./live-streaming.md).

:::info
For importing multiple sermons at once instead of adding them one by one, use the [Bulk Import](./bulk-import.md) tool to pull videos directly from your YouTube or Vimeo channel, or episodes from a podcast feed.
:::

## Related Articles

- [Playlists](./playlists.md) -- Organize sermons into series
- [Podcast Feed](./podcast-feed.md) -- Publish your sermons as a podcast
- [Live Streaming](./live-streaming.md) -- Configure your streaming schedule
- [Bulk Import](./bulk-import.md) -- Import multiple sermons at once
- [Sermons (Members)](../../b1-church/content/sermons.md) -- How members watch and listen
