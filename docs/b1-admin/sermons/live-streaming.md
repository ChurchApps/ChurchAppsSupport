---
title: "Live Streaming"
---

# Live Streaming

The Live Stream Times page lets you configure your church's streaming schedule, manage service times, and customize the viewer experience. The page has two main tabs: **Services** for managing your live stream schedule and **Settings** for configuring your streaming page.

## Managing Services

### Adding a Service

1. In the B1 Admin, click **Sermons** in the left sidebar, then click the **Live Stream Times** tab.
2. Click the **Add Service** button to create a new scheduled service.
3. Enter a **Service Name** (for example, "Sunday Morning").
4. Set the **Service Time** -- choose the day and time your service begins.
5. Set **Recurs Weekly** to **Yes** for regular weekly services, or **No** for a one-time event.

### Configuring Chat and Video Settings

6. Under **Chat Settings**, set how many minutes before and after the service the chat should be enabled. This lets visitors start chatting before service begins and continue afterward.
7. Under **Video Settings**, set how early to start the video stream for countdown or pre-service content.
8. Select which sermon to play from the dropdown:
   - **Latest Sermon** -- Automatically plays your most recently added video.
   - **Current Live Service** -- Plays your current live stream from YouTube using your Channel ID.
   - You can also choose any specific sermon you have already saved.
9. Click **Save** to schedule your service.

:::info
Your service will automatically update each week if set to recurring. You can add as many services as you need. Visitors will see the next scheduled service time when they visit your streaming page.
:::

## Streaming Page Settings

Click the **Settings** tab to customize the tabs and links that appear alongside your live stream.

### Adding Tabs

1. Click the **Add** button to add a new tab to your live stream page.
2. Choose from pre-designed tabs (**Chat** or **Prayer**) or add a custom tab with an external URL.
3. For pre-designed tabs, just give it a name in the **Tab Text** box and the setup is complete.
4. For a linked tab, enter the tab name, choose an icon by clicking the icon button, and enter the URL.
5. Your configured tabs will appear on the live streaming page for viewers to access additional resources and interactive features.

### Previewing Your Stream

Click the **View Your Stream** button to see exactly how your live streaming page will look to visitors, including your logo, service times, and configured tabs.

## Setting Up Your YouTube Live Stream

To connect your YouTube channel for automatic live streaming:

1. Go to **Sermons** and click **Add Sermon**, then select **Add Permanent Live URL**.
2. The video provider defaults to **Current YouTube Live Stream**. Enter your **YouTube Channel ID**.
3. Add a title and description, then click **Save**.
4. In **Live Stream Times**, create a service and select your permanent live URL from the sermon dropdown.

:::tip
To find your YouTube Channel ID, go to your YouTube channel's advanced settings and copy the Channel ID value.
:::

## Customizing Colors and Logo

Your live stream page uses your website's appearance settings:

- The **light accent color** with dark text is used for the header.
- The **dark accent color** with light text is used for the sidebar.
- Your **Light Background Logo** appears on the streaming page. Use an image with a transparent background and a 4:1 aspect ratio.

To change these, go to **Website** then **Appearance** and update your [Color Palette](../website/appearance#color-palette) and [Logo](../website/appearance#logo-and-branding) settings.

## Adding Streaming Hosts

To give team members host capabilities (chat moderation, prayer request responses):

1. Go to **Settings** in the left sidebar and click **Roles**.
2. Click the plus button and select **Add Custom Role**.
3. Name the role "Streaming Host" and click **Save**.
4. Click the new role, then click **Add** in the Members section to add people.
5. Scroll down to **Edit Permissions**, expand the **Content** section, and check **Host Chat**.

When hosts log into the live stream page, they will have special capabilities including chat moderation and prayer request management.

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

**Why this happens:** YouTube's automated channel live stream embed can be blocked when there are multiple scheduled or past live stream entries in your channel. Removing these allows YouTube to properly identify and serve your current live stream.

**Additional requirements:**
- Your live stream must be set to **Public** (not Unlisted or Private).
- Embedding must be allowed in your YouTube stream settings.
- Make sure you are using the **Current YouTube Live Stream** provider (with Channel ID), not the **YouTube** provider (with Video ID).

## Next Steps

- [Managing Sermons](managing-sermons) -- Add sermons to your library
- [Playlists](playlists) -- Organize sermons into series
