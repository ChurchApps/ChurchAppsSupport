---
title: "Bulk Import"
description: "Import sermon videos in bulk from a YouTube channel or Vimeo channel, or podcast episodes from an RSS feed, into B1 Admin, then sort them into a playlist."
---

# Bulk Import

<div class="article-intro">

The Bulk Import page lets you quickly populate your sermon library by importing videos from a YouTube or Vimeo channel, or episodes from a podcast RSS feed. This is the fastest way to bring in your existing sermon content rather than adding each sermon one at a time.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Create at least one [playlist](./playlists.md) to import your sermons into; the import will not run without one
- Have your YouTube Channel ID, Vimeo channel name, or podcast feed address ready

</div>

## Choosing Your Source

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Sermons**. Click **Add Sermon** and choose **Bulk Import** from the menu. The page opens at **/sermons/bulk**.
2. Under **Choose Import Source**, you will see three options:
   - **YouTube** -- "Import videos from your YouTube channel or playlists"
   - **Vimeo** -- "Import videos from your Vimeo account or showcases"
   - **Podcast RSS Feed** -- Import episodes from a podcast feed as audio sermons
3. Click the option for the platform where your sermons are hosted (or click **Import from YouTube**, **Import from Vimeo**, or **Import from Podcast Feed** below its description). Click **Back** at the top of the page to return to the source choice.

:::tip
You can go back and switch sources at any time if you have videos on more than one platform.
:::

## Before You Import

Before importing videos, you need at least one playlist to organize them into. If you have not created any playlists yet:

1. Go back to the **Sermons** page and find the **Playlists** panel.
2. Click **Create First Playlist** and fill in the title, description, publish date, and thumbnail.
3. Click **Save**, then return to Bulk Import by clicking **Add Sermon** and choosing **Bulk Import**.

See [Playlists](./playlists.md) for detailed instructions on creating and managing playlists.

## Importing from YouTube

1. Choose **YouTube** and enter your **YouTube Channel ID** -- the ID that starts with `UC`, such as `UCfiDl90gAfZMkgbeCqX1WiA`. This is not your channel's name, handle, or URL. In YouTube Studio, open **Settings > Channel > Advanced settings** and copy the **Channel ID**.
2. Click **Fetch** (it reads **Fetching...** while it works). B1 reads the channel's videos, newest first, up to the 250 most recent. If the videos can't be loaded or the channel has none, "Couldn't load videos. Check the channel ID and try again." or "No videos were found for this channel." appears.
3. A table lists the videos with an **Import** checkbox and **Title** for each. Check the box next to each video you want to import.
4. Choose a playlist from the **Import Into Playlist** dropdown.
5. Click **Import**. You are returned to the source choice when it finishes, and the sermons appear in your library.

Each imported video becomes a sermon with its title, description, publish date, and thumbnail, linked to YouTube by its video ID. Special characters in titles and descriptions, such as `&`, apostrophes, and quotation marks, come through as written rather than as codes like `&amp;`.

:::note
The YouTube import does not bring in each video's length, so these sermons have no **Total Sermon Duration** until you open them and set one. Use **Fetch** on the sermon's **Edit Sermon** form to fill it in, or type it.
:::

## Importing from Vimeo

1. Choose **Vimeo** and enter your **Vimeo Channel ID**. The import reads a Vimeo *channel*: enter the last part of the channel's address, so for `vimeo.com/channels/staffpicks` type `staffpicks`. Videos that are only in your account or a showcase, and not in a channel, are not found; add them to a channel on Vimeo first.
2. Click **Fetch**. B1 reads every page of the channel, newest first. If the channel can't be loaded or has no videos, a message says so.
3. Check the videos you want under **Import**, choose a playlist from **Import Into Playlist**, and click **Import**.

Each imported video becomes a sermon with its title, description, publish date, thumbnail, and duration, linked to Vimeo by its video ID.

## What to Expect After a Video Import

If you click **Import** without choosing a playlist, "Please select a playlist" appears; without any videos checked, "Check at least one video to import." appears. Click **Cancel** to leave without importing.

The YouTube and Vimeo imports do not check whether a video is already in your library. Running the same import twice creates a second copy of each video you check, so check only the new videos on a repeat run, or remove extra copies afterward with [Delete Selected](./managing-sermons.md#deleting-several-sermons-at-once).

:::info
Bulk import is ideal for getting started when you are migrating from another platform. For adding individual sermons going forward, use the [Managing Sermons](./managing-sermons.md) page instead.
:::

## Importing Podcast Episodes

If your sermons are published as a podcast (Spotify for Podcasters / Anchor, Buzzsprout, Podbean, and so on), you can bring the episodes in as audio sermons.

1. Choose **Podcast RSS Feed** and paste your feed address into **Podcast Feed URL**. Where to find it:
   - **Spotify for Podcasters (Anchor)** -- **Settings** > **Availability** > **RSS distribution**. The address looks like `https://anchor.fm/s/…/podcast/rss`.
   - **Buzzsprout** -- the **RSS Feed** link on your podcast's dashboard.
   - Most other hosts show the RSS feed address in the podcast's settings or distribution page.
2. Click **Fetch**. The podcast's name and artwork appear above a table of its episodes (**Import**, **Title**, **Publish Date**), up to the 200 most recent. If the feed can't be loaded, isn't an RSS podcast feed, or is larger than 5 MB, "Couldn't load the feed. Check the address and try again." appears; a feed whose episodes have no media files shows "No episodes were found in this feed."
3. New episodes are checked for you. Episodes whose audio file is already on a sermon in your library are marked **Already imported** and can't be checked, so nothing is added twice.
4. Uncheck any episodes you don't want, choose a playlist under **Import Into Playlist**, and click **Import**. Without a playlist you see "Please select a playlist"; with nothing checked, "Check at least one episode to import."

Each episode becomes an audio sermon: its title, description, publish date, artwork (the episode's own image, or the show's), and length are copied, and the episode's media file becomes the sermon's **Audio File URL**. The sermon has no video provider. Members see **Listen** and **Download audio** on these sermons in the B1 app, and they are included in your own [podcast feed](./podcast-feed.md).

Importing is a one-time copy, not a live link to the feed. When you publish new episodes, come back and run the import again with the same feed address; only the new episodes are checked.

:::note
The importer takes each episode's attached media file as the sermon's audio and does not convert it. If your podcast's episodes are video files, those messages are better added through YouTube, Vimeo, or [Managing Sermons](./managing-sermons.md) so they play in the video player.
:::

:::tip
Want a list on your website or app that always mirrors your podcast without re-importing? Add the **Podcast** element to a page in the [website page editor](../website/page-editor.md), then add that page as a **Page** tab in your [mobile app](../settings/mobile-app.md).
:::

## Related Articles

- [Managing Sermons](./managing-sermons.md) -- Edit imported sermon details
- [Playlists](./playlists.md) -- Create and manage sermon series
- [Podcast Feed](./podcast-feed.md) -- Publish your sermons as a podcast
- [Live Streaming](./live-streaming.md) -- Set up live streaming for your services
