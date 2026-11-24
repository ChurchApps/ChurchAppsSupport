---
title: "Podcast Feed"
description: "Publish your sermons as a podcast from B1 Admin: find your feed URL, add audio files to sermons, learn what the feed includes, and submit it to Apple Podcasts or Spotify."
---

# Podcast Feed

<div class="article-intro">

B1 Admin generates a podcast RSS feed for your church automatically. Any sermon that has a direct audio or video file attached becomes an episode, so members can follow your sermons in Apple Podcasts, Spotify, or any other podcast app. There is nothing to turn on; you only need to attach audio to your sermons and hand the feed address to the directories you want to be listed in.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- At least one sermon with an **Audio File URL** (or a direct `.mp3`, `.m4a`, or `.mp4` file link). A feed with no episodes is rejected by most directories.
- Upload your **Light Background Logo** in [Appearance](../website/appearance.md#logo-and-branding); it is used as the podcast artwork.

</div>

## Finding Your Feed URL

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Sermons**.
2. In the right-hand column, below the **Playlists** panel, find the **Podcast Feed** panel. It shows your feed address, which ends in `/sermons/rss/` followed by your church's ID, and the hint "Submit this URL to Apple Podcasts / Spotify. Only sermons with an audio or video file are included."
3. Click the copy icon beside the address. "Podcast feed URL copied" confirms it is on your clipboard.

The feed is public and needs no login, so you can paste it into any podcast app to preview it before submitting it anywhere.

## Which Sermons Are Included

The feed is built from your public sermon library each time a podcast app requests it, so it is always current. A sermon becomes an episode when:

- It has an **Audio File URL**, or its video link is a direct media file ending in `.mp3`, `.m4a`, or `.mp4`. Sermons that only embed a YouTube, Vimeo, or Facebook player are left out, because podcast apps need a downloadable file.
- Its **Publish Date** is today or earlier, or it has no publish date. A sermon scheduled for a future date joins the feed on that date.

Each episode carries the sermon's **Title**, **Description**, **Publish Date**, **Total Sermon Duration** (shown as the episode length), and **Thumbnail** (as the episode artwork). Episodes are listed newest first.

:::info
Permanent live URLs point at a live player rather than a file, so they are left out of the feed.
:::

## Feed Title and Artwork

The podcast's title and author are your church's name as set in [Church Settings](../settings/church-settings.md). The show artwork is your **Light Background Logo** from **Website > Appearance**; podcast directories expect square artwork of at least 1400x1400 pixels, so a wide logo may be rejected or cropped by some directories. The feed is published in English and in the **Religion & Spirituality > Christianity** category.

## Adding Audio to a Sermon

There are three ways to get a playable file onto a sermon:

- **Paste a link.** Open the sermon with **Edit** and paste a direct link to one MP3 or M4A file into **Audio File URL (for podcast)**, then click **Save**. The link must point at the file itself (it usually ends in `.mp3` or `.m4a`), not at a podcast page or a feed address. See [Sermon Details](./managing-sermons.md#sermon-details).
- **Upload a file.** Open a sermon that has already been saved, click **Upload Audio** under the **Audio File URL** box, choose an MP3 or M4A file (up to 25 MB), and the URL is filled in for you. Click **Save**.
- **Import an existing podcast.** If your sermons are already published as a podcast elsewhere, choose **Add Sermon > Bulk Import > Podcast RSS Feed** to bring the episodes in as audio sermons in one pass. See [Importing Podcast Episodes](./bulk-import.md#importing-podcast-episodes).

A sermon can have both a video (for your website and app) and an audio file (for the feed); the feed uses the audio file.

## Submitting Your Feed

Each directory asks you for the feed address once and then checks it on its own schedule for new episodes.

1. **Apple Podcasts** -- Sign in to Apple Podcasts Connect, add a new show with an RSS feed, and paste your feed URL. Apple reviews new shows before listing them.
2. **Spotify** -- In Spotify for Podcasters, choose to add a podcast you already host and paste your feed URL; you confirm ownership by email.
3. **Other apps and directories** (Amazon Music, Pocket Casts, Overcast, and so on) -- Each has an "add a podcast by RSS" option that accepts the same URL.

After you are listed, new sermons appear in each app once it next reads your feed, typically within a few hours of the sermon's publish date.

:::tip
Fill in **Total Sermon Duration** and a square-ish **Thumbnail** on each sermon before publishing. Podcast apps show the duration in their episode lists and use the thumbnail as episode art.
:::

## Podcast Feed, Podcast Import, and the Podcast Element

B1 has three podcast features that are easy to mix up:

- **Podcast Feed** (this page) publishes *your* sermons *out* to podcast apps.
- **Podcast RSS Feed import** in [Bulk Import](./bulk-import.md#importing-podcast-episodes) copies episodes from a podcast you already run *into* your sermon library as audio sermons.
- The **Podcast** element in the [website page editor](../website/page-editor.md) displays episodes from any external feed on a page of your website, without adding them to your library.

## Related Articles

- [Managing Sermons](./managing-sermons.md) -- Add sermons and attach audio files
- [Bulk Import](./bulk-import.md) -- Import an existing podcast's episodes
- [Appearance](../website/appearance.md) -- Upload the logo used as podcast artwork
- [Sermons (Members)](../../b1-church/content/sermons.md) -- How members listen to audio sermons in the app
