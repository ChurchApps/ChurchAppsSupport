---
title: "Managing Sermons"
description: "Manage your sermon library in B1 Admin: add sermons from YouTube, Vimeo, or Facebook, edit details, and get a podcast feed for your church."
---

# Managing Sermons

<div class="article-intro">

The Sermons page displays your entire sermon library. From here you can add new sermons, edit existing entries, and organize your content by playlist. Each sermon can link to video or audio hosted on YouTube, Vimeo, Facebook, or a custom URL.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Create at least one [playlist](./playlists.md) to organize your sermons into
- Have your video IDs or URLs ready from YouTube, Vimeo, or Facebook

</div>

## Viewing Your Sermon Library

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Sermons**.
2. The Sermons page shows your sermon entries in a table with each sermon's **Playlist**, title (**Sermon**), and **Publish Date**, newest first, with a count such as "11 of 11 sermons". Type in the **Search sermons by title or playlist...** box to filter the list. Your playlists are listed in a **Playlists** panel beside the table, with the **Podcast Feed** panel below it.
3. Hover over a sermon row and click **Edit** to view or edit its details.

## Adding a Sermon

1. Click the **Add Sermon** button in the top right corner and select **Add Sermon** from the dropdown. An **Edit Sermon** form opens above the list.
2. Select a **Playlist** to assign the sermon to (or leave it at **None**).
3. Choose your **Video Provider** -- **YouTube**, **Vimeo**, **Facebook**, or **Custom Embed Url**. We recommend YouTube as it works best with the B1 system.
4. Enter the video's **YouTube ID**, **Vimeo ID**, **Sermon ID** (Facebook), or **Sermon Embed Url**. You can paste the whole video link; B1 keeps just the ID. For YouTube, the video ID is the string of characters after `v=` in the YouTube URL.
5. For YouTube and Vimeo, click **Fetch** to import the sermon details automatically, including the publish date, duration, title, description, and thumbnail. If the details can't be loaded, a message says so and you can fill them in yourself.
6. Make any changes you want and click **Save**.

:::tip
You can also add a permanent live stream URL by selecting **Add Permanent Live URL** from the **Add Sermon** dropdown. This creates a persistent connection to your YouTube channel's live stream using your Channel ID. See [Live Streaming](./live-streaming.md) for more details.
:::

## Editing a Sermon

1. Click **Edit** on any sermon row in your library to open its details.
2. Update the title, date, description, thumbnail, duration, or media links as needed.
3. Click **Save** to apply your changes, or **Cancel** to close the form.

To remove a sermon, open it, click **Delete**, and confirm.

### Adding a Sermon to Another Playlist

To list the same sermon in a second playlist (for example, a sermon that belongs to both a series and a "Best Of" collection), open the sermon, click **Add to another playlist**, pick the playlist, and click **Add**. This saves a copy of the sermon in that playlist.

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

## Sermon Details

Each sermon entry can include:

- **Playlist** -- The series the sermon belongs to
- **Video Provider** and video ID -- Where the sermon video is hosted: YouTube, Vimeo, Facebook, or a custom embed URL
- **Publish Date** -- The date the sermon is published; sermons without one show **Not scheduled** in the list
- **Total Sermon Duration** -- The sermon's length in minutes and seconds
- **Thumbnail** -- A preview image shown in your sermon library. Click the image to crop or replace it (16:9). A sermon without a thumbnail uses its playlist's thumbnail on your website and in the member app.
- **Title** -- The sermon name displayed to visitors
- **Description** -- A summary of the sermon content
- **Audio File URL (for podcast)** -- A direct link to **one** MP3/M4A file for this sermon. This is not the place for a podcast feed address; a feed pasted here will not play. To bring in a whole podcast, use [Bulk Import](./bulk-import.md#importing-podcast-episodes). Either paste a URL or, once the sermon has been saved, click **Upload Audio** to upload a file and fill it in automatically. Only sermons with this field (or a direct video file link) set are included in your podcast feed.

## Linking to the Latest Sermon

Your church website has a link that always opens your newest sermon: `/sermons/latest` (for example, `https://yourchurch.b1.church/sermons/latest`). It goes to the public sermon with the most recent **Publish Date**, so you can put it in a navigation menu, a newsletter, or an email signature once and never update it. If there are no sermons, it opens the Sermons page. See [Sermons](../../b1-church/content/sermons.md#browsing-sermons-on-the-website) for what visitors see.

## Your Podcast Feed

Once at least one sermon has an audio or video file attached, B1 Admin generates a podcast RSS feed for your church automatically -- there's nothing to turn on. Find it in the **Podcast Feed** panel beside the sermon list (below the **Playlists** panel): click the copy icon to copy the feed URL, then submit that URL to Apple Podcasts, Spotify, or any other podcast directory.

:::info
Sermons that only link to an embedded player (like a YouTube or Vimeo video ID) won't appear in the podcast feed -- podcast apps need a direct, downloadable media file. Add an **Audio File URL** to include a sermon.
:::

## Scheduling a Sermon for Live Stream

After adding a sermon, you can schedule it for broadcast on your live stream page:

1. In the Jump menu, choose **Sermons > Live Stream Times**.
2. Edit a service and under **Video Settings**, select your sermon from the **Sermon** dropdown.
3. The sermon will play at the scheduled service time.

:::info
For importing multiple sermons at once instead of adding them one by one, use the [Bulk Import](./bulk-import.md) tool to pull videos directly from your YouTube or Vimeo account.
:::

## Next Steps

- [Playlists](./playlists.md) -- Organize sermons into series
- [Live Streaming](./live-streaming.md) -- Configure your streaming schedule
- [Bulk Import](./bulk-import.md) -- Import multiple sermons at once
