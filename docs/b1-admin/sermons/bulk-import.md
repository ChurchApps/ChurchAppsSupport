---
title: "Bulk Import"
description: "Import sermon videos in bulk from a YouTube channel or Vimeo account, or podcast episodes from an RSS feed, into B1 Admin, then sort them into a playlist."
---

# Bulk Import

<div class="article-intro">

The Bulk Import page lets you quickly populate your sermon library by importing videos from YouTube or Vimeo, or episodes from a podcast RSS feed. This is the fastest way to bring in your existing sermon content rather than adding each sermon one at a time.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Create at least one [playlist](./playlists.md) to import your sermons into
- Have your YouTube Channel ID, Vimeo account information, or podcast feed address ready

</div>

## Choosing Your Source

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Sermons**. Click **Add Sermon** and choose **Bulk Import** from the menu.
2. Under **Choose Import Source**, you will see three options:
   - **YouTube** -- Import videos from a YouTube channel
   - **Vimeo** -- Import videos from a Vimeo account
   - **Podcast RSS Feed** -- Import episodes from a podcast feed as audio sermons
3. Click the option for the platform where your sermons are hosted (or click **Import from YouTube**, **Import from Vimeo**, or **Import from Podcast Feed** below its description). Click **Back** at the top of the page to return to the source choice.

:::tip
You can go back and switch sources at any time if you have videos on both platforms.
:::

## Before You Import

Before importing videos, you need at least one playlist to organize them into. If you have not created any playlists yet:

1. Go back to the **Sermons** page and find the **Playlists** panel.
2. Click **Create First Playlist** and fill in the name, description, publish date, and thumbnail.
3. Click **Save**, then return to Bulk Import by clicking **Add Sermon** and choosing **Bulk Import**.

See [Playlists](./playlists.md) for detailed instructions on creating and managing playlists.

## Importing Videos

1. After selecting YouTube or Vimeo, enter your **YouTube Channel ID** or **Vimeo Channel ID** in the field provided.
2. Click the **Fetch** button to retrieve the videos from your channel. If the videos can't be loaded or the channel has none, a message says so; check the ID and try again.
3. After fetching, you will see a list of your videos, each with a checkbox under **Import**.
4. Check the box next to each video you want to import.
5. Click the **Import Into Playlist** dropdown to choose which playlist these videos should be added to.
6. Click the **Import** button to complete the bulk import. You are returned to the source choice when it finishes.

If you click **Import** without choosing a playlist or checking any videos, B1 asks you to do so first. Click **Cancel** to leave without importing.

Your videos will be imported with all their details, including titles, descriptions, dates, and thumbnails. Special characters in YouTube titles and descriptions, such as `&`, apostrophes, and quotation marks, come through as written rather than as codes like `&amp;`.

:::info
Bulk import is ideal for getting started when you are migrating from another platform. For adding individual sermons going forward, use the [Managing Sermons](./managing-sermons.md) page instead.
:::

## Importing Podcast Episodes

If your sermons are published as a podcast (Spotify for Podcasters / Anchor, Buzzsprout, Podbean, and so on), you can bring the episodes in as audio sermons.

1. Choose **Podcast RSS Feed** and paste your feed address into **Podcast Feed URL**. Where to find it:
   - **Spotify for Podcasters (Anchor)** -- **Settings** > **Availability** > **RSS distribution**. The address looks like `https://anchor.fm/s/…/podcast/rss`.
   - **Buzzsprout** -- the **RSS Feed** link on your podcast's dashboard.
   - Most other hosts show the RSS feed address in the podcast's settings or distribution page.
2. Click **Fetch**. The podcast's name appears above a list of its episodes with their publish dates. If the feed can't be loaded or has no audio episodes, a message says so; check the address and try again.
3. New episodes are checked for you. Episodes that are already in your sermon library are marked **Already imported** and can't be checked, so nothing is added twice.
4. Uncheck any episodes you don't want, choose a playlist under **Import Into Playlist**, and click **Import**.

Each episode becomes an audio sermon with its title, description, date, artwork, and length. Members see **Listen** and **Download audio** on these sermons in the B1 app.

Importing is a one-time copy, not a live link to the feed. When you publish new episodes, come back and run the import again with the same feed address; only the new episodes are checked.

:::note
Only audio is imported. Video podcast episodes are not brought in; add those through YouTube, Vimeo, or [Managing Sermons](./managing-sermons.md).
:::

:::tip
Want a list on your website or app that always mirrors your podcast without re-importing? Add the **Podcast** element to a page in the website builder, then add that page as a **Page** tab in your mobile app.
:::

## Next Steps

- [Managing Sermons](./managing-sermons.md) -- Edit imported sermon details
- [Playlists](./playlists.md) -- Create and manage sermon series
- [Live Streaming](./live-streaming.md) -- Set up live streaming for your services
