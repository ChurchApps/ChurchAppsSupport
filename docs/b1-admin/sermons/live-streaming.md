---
title: "Live Stream Times and Setup in B1 Admin"
sidebar_label: "Live Streaming"
description: "Schedule weekly or one-time live stream services, set chat and early video timing, connect a YouTube channel, and troubleshoot embeds in B1 Admin."
---

# Live Streaming

<div class="article-intro">

The Live Stream Times page lets you configure your church's streaming schedule, manage service times, and customize the viewer experience. Set up recurring weekly services or one-time events, configure chat and video settings, and control when your stream goes live.

</div>

## Training Video

<YouTube id="tpEY-sEYW6A" title="Setting Up Live Streaming in B1" next="Customizing Your Church's Member App in B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Have your YouTube Channel ID ready if you plan to use automated live streaming
- Add at least one [sermon](./managing-sermons.md) or permanent live URL to use as your stream source

</div>

Live streaming is managed from two pages in the **Sermons** section of the Jump menu: **Live Stream Times** for managing your live stream schedule and **Settings** for configuring the tabs on your streaming page.

## Managing Services

### Adding a Service

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Live Stream Times**.
2. Click the **Add Service** button at the top of the page to create a new scheduled service. Existing services are listed in a table showing each service's name (with a **Weekly** badge for recurring services), time, provider, and duration; hover over a row and click the edit icon to change it.
3. Enter a **Service Name** (for example, "Sunday Morning"). New services start as "Sunday Morning".
4. Set the **Service Time** -- choose the date and time your service begins. New services start at 9:00 AM next Sunday.
5. Set **Recurs Weekly** to **Yes** (**Weekly**) for regular weekly services, or **No** (**One-time**) for a one-time event.

### Configuring Chat and Video Settings

6. Under **Chat Settings**, set **Enable Chat - Minutes Before** and **Enable Chat - Minutes After** -- how many minutes before and after the service the chat should be enabled (10 each for a new service). This lets visitors start chatting before service begins and continue afterward. The time next to each box shows when chat opens and closes.
7. Under **Video Settings**, set **Start Video Early** -- how many minutes early to start the video stream for countdown or pre-service content. Chat opens that many minutes *before* the early video starts, so the time shown next to the chat's minutes-before setting counts both numbers. For example, a 10:00 service with 15 minutes of chat before and a 5-minute early start opens chat at 9:40.
8. Select what to play from the **Sermon** dropdown:
   - **Latest Sermon** (**Auto**) -- Automatically plays your most recently added video.
   - Your [permanent live URLs](#setting-up-your-youtube-live-stream), listed next -- each plays your channel's current live stream from YouTube using your Channel ID. A new one is named **Current Live Service** unless you rename it.
   - Below them, any specific sermon you have already saved.
9. Click **Save** to schedule your service, or **Cancel** to close the form.

To remove a service, edit it, click **Delete**, and confirm.

:::info
Your service will automatically update each week if set to recurring. It stays at the same local time when daylight saving time starts or ends. You can add as many services as you need. Visitors will see the next scheduled service time when they visit your streaming page.
:::

## Streaming Page Settings

To customize the tabs and links that appear alongside your live stream, open the Jump menu, expand **Sermons**, and click **Settings**. The **Stream Settings** page shows your **Content Tabs** list, in the order viewers see them. External link tabs open their link in a new browser tab when you click them.

### Adding Tabs

1. Click the **Add** button to add a new tab to your live stream page. The **Create New Tab** dialog opens.
2. Enter the tab's name in the **Tab Text** box, and choose an **Icon** by clicking the icon button.
3. Choose a **Link Type**: **External URL** for a custom link (the default), or one of the built-in **Chat** or **Prayer** tabs.
4. For an External URL tab, enter the address in the **External URL** box. Chat and Prayer tabs need nothing more.
5. Click **Save Tab**. New tabs are added at the end of the list.

Your configured tabs will appear on the live streaming page for viewers to access additional resources and interactive features.

### Editing, Reordering, and Deleting Tabs

Hover over a tab and use its buttons:

- **Move up** and **Move down** arrows -- Change the order of the tabs.
- **Edit** (pencil) -- Change the tab's text, icon, type, or URL, then click **Save Tab**. To remove the tab, click **Delete** and confirm in the **Delete Tab** dialog.

### Previewing Your Stream

On the **Live Stream Times** page, click **View Your Stream** at the top of the page to see exactly how your live streaming page will look to visitors, including your logo, service times, and configured tabs.

## Setting Up Your YouTube Live Stream

To connect your YouTube channel for automatic live streaming:

1. Go to **Sermons** and click **Add Sermon**, then select **Add Permanent Live URL**. The **Edit Permanent Live Url** form opens.
2. The **Video Provider** defaults to **Current YouTube Live Stream**. Enter your **YouTube Channel ID** (not your channel's URL; click **Get Your Channel Id** for help).
3. The title starts as **Current Live Service**. Change it if you like, add a description, then click **Save**. Permanent live URLs don't have a playlist or publish date.
4. In **Live Stream Times**, create a service and select your permanent live URL from the **Sermon** dropdown.

:::tip
To find your YouTube Channel ID, go to your YouTube channel's advanced settings and copy the Channel ID value.
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

When hosts log into the live stream page, a private **Host Chat** tab appears alongside the public chat for staff-only conversation during the broadcast.

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

## Next Steps

- [Managing Sermons](./managing-sermons.md) -- Add sermons to your library
- [Playlists](./playlists.md) -- Organize sermons into series
