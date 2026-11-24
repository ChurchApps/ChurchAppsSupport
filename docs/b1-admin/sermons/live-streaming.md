---
title: "Live Stream Times and Setup in B1 Admin"
sidebar_label: "Live Streaming"
description: "Schedule weekly or one-time live stream services, set chat and early video timing, choose what plays, connect a YouTube channel, and troubleshoot embeds in B1 Admin."
---

# Live Streaming

<div class="article-intro">

The Live Stream Times page lets you configure your church's streaming schedule and the viewer experience around each service. Set up recurring weekly services or one-time events, choose when chat opens and closes, start the video early for a countdown, and pick which sermon or live URL plays. The tabs shown beside the stream are set on the separate [Stream Settings](./stream-settings.md) page.

</div>

## Training Video

<YouTube id="tpEY-sEYW6A" title="Setting Up Live Streaming in B1" next="Customizing Your Church's Member App in B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Have your YouTube Channel ID ready if you plan to use automated live streaming
- Add at least one [sermon](./managing-sermons.md) or permanent live URL to use as your stream source

</div>

Live streaming is managed from two pages in the **Sermons** section of the Jump menu: **Live Stream Times** (**/sermons/times**) for your schedule and **Settings** (**/sermons/settings**) for the tabs on your streaming page.

## Managing Services

### Viewing Your Services

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Live Stream Times**.
2. Your services are listed in a table with columns **Service** (the name, with a **Weekly** badge for recurring services), **Time**, **Provider**, and **Duration**. The provider and duration columns are informational: every service shows **YouTube Live** and **60 min**, and neither can be changed in the form; what actually plays is set by the **Sermon** dropdown described below.
3. Hover over a row and click the edit icon to change a service. If you have none yet, the page says "No services yet. Add one to schedule your live stream."

### Adding a Service

1. Click the **Add Service** button at the top of the page. The **Add New Service** form replaces the table.
2. Under **Basic Information**, enter a **Service Name** (for example, "Sunday Morning"). New services start as "Sunday Morning". The name is required.
3. Set the **Service Time** -- choose the date and time your service begins. New services start at 9:00 AM on the coming Sunday, in your computer's time zone. The time is required.
4. Set **Recurs Weekly** to **Yes** (**Weekly**) for regular weekly services, or **No** (**One-time**) for a one-time event.

### Configuring Chat and Video Settings {#configuring-chat-and-video-settings}

5. Under **Chat Settings**, set **Enable Chat - Minutes Before** and **Enable Chat - Minutes After** -- how many minutes before and after the service the chat should be enabled (10 each for a new service). This lets visitors start chatting before service begins and continue afterward. The time next to each box shows when chat opens and closes.
6. Under **Video Settings**, set **Start Video Early** ("Optional: For countdown videos or pre-service content") -- how many minutes early to start the video stream (10 for a new service). The time next to it shows when the video will start. Chat opens that many minutes *before* the early video starts, so the time shown next to the chat's minutes-before setting counts both numbers. For example, a 10:00 service with 15 minutes of chat before and a 5-minute early start opens chat at 9:40.
7. Select what to play from the **Sermon** dropdown:
   - **Latest Sermon** (**Auto**) -- Automatically plays the sermon in your library with the most recent **Publish Date**, so a weekly service always shows the newest message without editing the service.
   - Your [permanent live URLs](#setting-up-your-youtube-live-stream), listed next -- each plays your channel's current live stream from YouTube using your Channel ID. A new one is named **Current Live Service** unless you rename it.
   - Below a divider, any specific sermon you have already saved.
8. Click **Save** to schedule your service, or **Cancel** to close the form. If the name or time is missing, a "Please correct the following errors:" box lists what to fix.

To remove a service, edit it, click **Delete**, and confirm "Are you sure you wish to delete this service?".

:::info
A recurring service rolls forward one week at a time once a service has passed, staying at the same local time when daylight saving time starts or ends. A one-time service is removed from the list automatically about six hours after its start time, so there is nothing to clean up after a special event. You can add as many services as you need; visitors see the next scheduled service time when they visit your streaming page.
:::

:::tip
If the specific sermon a service points to is later deleted, the service falls back to playing the latest sermon rather than showing nothing.
:::

## Streaming Page Settings {#streaming-page-settings}

The tabs shown beside your live stream -- the built-in **Chat** and **Prayer** tabs and your own **External URL** links -- are managed on the **Settings** page under **Sermons**. See [Stream Settings](./stream-settings.md) for adding, reordering, and deleting tabs.

### Previewing Your Stream

On the **Live Stream Times** page, click **View Your Stream** at the top of the page to open your public streaming page (`https://yourchurch.b1.church/stream`) in a new browser tab and see exactly how it looks to visitors, including your logo, service times, and configured tabs. See [Live Streaming (Members)](../../b1-church/content/live-streaming.md) for the viewer's side.

## Setting Up Your YouTube Live Stream

To connect your YouTube channel for automatic live streaming:

1. Go to **Sermons** and click **Add Sermon**, then select **Add Permanent Live URL**. The **Edit Permanent Live Url** form opens.
2. The **Video Provider** defaults to **Current YouTube Live Stream**. Enter your **YouTube Channel ID** (not your channel's URL; click **Get Your Channel Id** for help).
3. The title starts as **Current Live Service**. Change it if you like, add a description, then click **Save**. Permanent live URLs don't have a playlist or publish date, and they are left out of your podcast feed because they point at a live player rather than a media file.
4. In **Live Stream Times**, create a service and select your permanent live URL from the **Sermon** dropdown.

:::tip
To find your YouTube Channel ID, go to YouTube Studio, open **Settings > Channel > Advanced settings**, and copy the **Channel ID** value (it starts with `UC`).
:::

## Customizing Colors and Logo

Your live stream page uses your website's [Appearance](../website/appearance.md) settings:

- The **light accent color** with dark text is used for the header.
- The **dark accent color** with light text is used for the sidebar.
- Your **Light Background Logo** appears on the streaming page. Use an image with a transparent background and a 4:1 aspect ratio.

To change these, go to **Website** then **Appearance** and update your [Color Palette](../website/appearance.md#color-palette) and [Logo](../website/appearance.md#logo-and-branding) settings.

## Adding Streaming Hosts

To give team members access to the host-only chat alongside the public chat:

1. In the Jump menu, choose **Settings > Roles**.
2. Click **Add role** and select **Add Custom Role**.
3. Name the role "Streaming Host" and click **Save**.
4. Click the new role, then search for people in its member list and add them (see [Adding Users to a Role](../settings/roles-permissions.md#adding-users-to-a-role)).
5. Scroll down to **Edit Permissions**, expand the **Content** section, and check **Host Chat**.

When hosts log into the live stream page, a private **Host Chat** tab appears alongside the public chat for staff-only conversation during the broadcast. The ready-made **Content Admin** role already includes **Host Chat** together with **Edit Services** and **Edit Content**.

:::info
For more details on creating roles and managing permissions, see [Roles & Permissions](../settings/roles-permissions.md).
:::

## Troubleshooting

If your automated YouTube live stream is not displaying correctly when using the "Current YouTube Live Stream" option with your Channel ID, try the following:

**Symptoms:**
- The live stream embed shows "Video unavailable"
- The page loads but no video appears
- Direct YouTube embeds work, but the automated channel live stream does not

**Solution:**
Check your YouTube channel for old or upcoming scheduled live streams and delete them:

1. Go to your YouTube Studio.
2. Navigate to **Content** then **Live**.
3. Look for any old scheduled lives or upcoming scheduled streams.
4. Delete these old or scheduled live stream entries.
5. Test your live stream page again.

:::warning
YouTube's automated channel live stream embed can be blocked when there are multiple scheduled or past live stream entries in your channel. Removing these allows YouTube to properly identify and serve your current live stream.
:::

**Additional requirements:**
- Your live stream must be set to **Public** (not Unlisted or Private).
- Embedding must be allowed in your YouTube stream settings.
- Make sure you are using the **Current YouTube Live Stream** provider (with Channel ID), not the **YouTube** provider (with Video ID).

## Related Articles

- [Stream Settings](./stream-settings.md) -- Choose the tabs shown beside your stream
- [Managing Sermons](./managing-sermons.md) -- Add sermons to your library
- [Playlists](./playlists.md) -- Organize sermons into series
- [Live Streaming (Members)](../../b1-church/content/live-streaming.md) -- What viewers see
