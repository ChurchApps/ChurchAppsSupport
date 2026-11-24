---
title: "Stream Settings"
description: "Choose the Content Tabs shown beside your live stream in B1 Admin: the built-in Chat and Prayer tabs plus External URL tabs, with icons, ordering, and deletion."
---

# Stream Settings

<div class="article-intro">

The Stream Settings page controls the **Content Tabs** that appear beside the video on your church's live stream page. Use it to turn on the built-in **Chat** and **Prayer** tabs and to add **External URL** tabs that point viewers to a bulletin, sermon notes, a giving page, or any other link. Tabs appear to viewers in the order you set here.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Services** permission in the **Content** section of your role. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Have the web addresses ready for any links you want to show beside the stream.

</div>

## Opening Stream Settings

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Sermons**, and click **Settings**. You can also go straight to **/sermons/settings**.
2. The page is titled **Stream Settings** ("Choose the tabs shown beside your live stream") and contains one box, **Content Tabs**, listing your tabs in the order viewers see them. Each row shows the tab's icon and **Tab Text**; an External URL tab's name is a link that opens its address in a new browser tab so you can check it.
3. Hover over a row to show its **Move up**, **Move down**, and **Edit** buttons.

If you have not added any tabs yet, the list is empty and the stream page shows only the video and service times.

## Tab Types

Every tab has a **Link Type**:

- **External URL** -- Opens a web address you enter. The dialog explains "External URL will open in a new tab", so viewers keep the stream open while they look at the link. This is the default for a new tab.
- **Chat** -- The built-in live chat. Chat opens and closes around each service according to the **Enable Chat - Minutes Before** and **Enable Chat - Minutes After** settings on the service in [Live Stream Times](./live-streaming.md#configuring-chat-and-video-settings). Hosts with the **Host Chat** permission also get a private **Host Chat** tab; see [Adding Streaming Hosts](./live-streaming.md#adding-streaming-hosts).
- **Prayer** -- The built-in prayer request feature.

Chat and Prayer tabs do not need a URL; any address typed for one is cleared when you save.

## Adding a Tab

1. In the **Content Tabs** box, click **Add**. The **Create New Tab** dialog opens ("Configure streaming sidebar tab settings").
2. Under **Tab Display**, type the label viewers will see in **Tab Text** (for example, "Bulletin" or "Chat"). Click the **Icon** box to open the icon picker and choose an icon; a new tab starts with the link icon.
3. Under **Link Configuration**, choose the **Link Type**: **External URL**, **Chat**, or **Prayer**.
4. For an **External URL** tab, enter the full address (such as `https://example.com`) in the **External URL** box that appears.
5. Click **Save Tab**. The button reads **Saving...** while the tab is stored, then the dialog closes and the new tab appears at the end of the list.

If you leave **Tab Text** empty, the dialog shows "Please enter valid text"; an External URL tab without an address shows "Enter a valid URL". Click **Cancel** (or the close button in the corner) to leave without saving.

:::tip
Give every tab a short, clear label. On narrow screens the stream sidebar has limited room, so one or two words ("Notes", "Give", "Chat") work best.
:::

## Editing a Tab

1. Hover over the tab and click **Edit** (the pencil). The **Edit Tab** dialog opens with the tab's current settings.
2. Change the **Tab Text**, **Icon**, **Link Type**, or **External URL** as needed.
3. Click **Save Tab**.

## Reordering Tabs

Tabs are shown to viewers in the order listed. Hover over a tab and click **Move up** or **Move down** to change its position. The new order is saved right away; there is no separate Save button. The first tab has no **Move up** arrow and the last tab has no **Move down** arrow.

## Deleting a Tab

1. Hover over the tab and click **Edit**.
2. Click **Delete** at the bottom-left of the dialog. The **Delete Tab** window asks "Are you sure you want to delete this tab? This action cannot be undone."
3. Click **Delete** to confirm (the button reads **Deleting...** while it works), or **Cancel** to keep the tab.

:::info
Deleting a Chat or Prayer tab only removes it from the sidebar; it does not delete chat history or change any service's chat settings. You can add the tab again at any time.
:::

## Checking the Result

Open **Live Stream Times** and click **View Your Stream** to open your public stream page (`https://yourchurch.b1.church/stream`) in a new browser tab. Your tabs appear beside the player in the order you set. The member app's **Stream** screen lists the same tabs under the player. See [Live Streaming (Members)](../../b1-church/content/live-streaming.md) for what viewers see.

## Related Articles

- [Live Streaming](./live-streaming.md) -- Schedule services and set chat and early-start times
- [Managing Sermons](./managing-sermons.md) -- Add the sermons and permanent live URLs your services play
- [Appearance](../website/appearance.md) -- The colors and logo your stream page uses
- [Roles & Permissions](../settings/roles-permissions.md) -- Grant **Edit Services** and **Host Chat**
