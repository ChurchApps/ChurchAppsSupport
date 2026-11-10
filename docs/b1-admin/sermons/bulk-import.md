---
title: "Bulk Import"
description: "Import sermon videos in bulk from a YouTube channel or Vimeo account into B1 Admin, then sort them into a playlist."
---

# Bulk Import

<div class="article-intro">

The Bulk Import page lets you quickly populate your sermon library by importing videos from YouTube or Vimeo. This is the fastest way to bring in your existing sermon content rather than adding each video one at a time.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Create at least one [playlist](./playlists.md) to import your sermons into
- Have your YouTube Channel ID or Vimeo account information ready

</div>

## Choosing Your Source

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Sermons**. Click **Add Sermon** and choose **Bulk Import** from the menu.
2. Under **Choose Import Source**, you will see two options:
   - **YouTube** -- Import videos from a YouTube channel
   - **Vimeo** -- Import videos from a Vimeo account
3. Click the option for the platform where your sermons are hosted (or click **Import from YouTube** / **Import from Vimeo** below its description). Click **Back** at the top of the page to return to the source choice.

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

## Next Steps

- [Managing Sermons](./managing-sermons.md) -- Edit imported sermon details
- [Playlists](./playlists.md) -- Create and manage sermon series
- [Live Streaming](./live-streaming.md) -- Set up live streaming for your services
