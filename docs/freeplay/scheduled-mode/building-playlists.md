---
title: "Connecting Providers and Building Playlists"
description: "Set up connected content providers in FreePlay Admin, then build, arrange, and preview playlists for scheduled TV screens."
---

# Connecting Providers and Building Playlists

<div class="article-intro">

A playlist is a loop of images and videos that you put on the calendar. In FreePlay Admin you connect your content providers once for the whole church. Then you build playlists by picking files from those providers.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Sign in to FreePlay Admin at [admin.freeplay.church](https://admin.freeplay.church)
- Have the login for any provider account you want to link, such as Dropbox or OneDrive

</div>

## Connecting Providers

The **Providers** page lists your content sources in two sections:

- **Connected** - Providers you can use right now. Public providers that don't need a sign-in, such as Lessons.church and Bible Project, are always listed here as **Public · no sign-in needed**. Linked accounts show **Account linked** and when the link expires.
- **Available** - Providers that need you to sign in before you can use them.

To connect a provider:

1. Go to **Providers**.
2. Find the provider under **Available** and click **Connect**.
3. Sign in to your account with that provider:
   - **Dropbox**, **Google Drive**, **OneDrive**, and **GO! Curriculum** open a sign-in popup. The row says so, for example **Sign in with Google · opens a popup**. If nothing appears, allow popups for admin.freeplay.church. Closing the popup cancels the sign-in.
   - **SignPresenter** and **B1.Church** show a link and a code. Visit the link, enter the code (there's a copy button next to it), and approve access. The dialog says **Waiting for you to authorize...** and updates on its own when you're done.
4. When you see **Account linked successfully!**, the provider moves to **Connected**.

Connected providers have up to three actions:

- **Browse** - Look through the provider's folders in a dialog, the same view you get when adding playlist items
- **Refresh** - Renew the provider's sign-in. Only shown for linked accounts
- **Unlink** - Disconnect the account right away, with no confirmation. Playlists that use its files stay as they are, but screens can't fetch those files until you connect it again

Public providers only have **Browse**, since there's nothing to sign in to.

:::info
Provider connections in FreePlay Admin belong to the whole church, not to one person or one TV. Scheduled screens get their files through these connections, so you don't need to sign in to each provider on every TV.
:::

**FreeShow** is listed as **On your church network · each TV finds it itself**. There's nothing to connect for it in FreePlay Admin.

## The Playlists Page

The **Playlists** page lists each playlist in a table with its **Name**, number of **Items**, total **Duration**, **Used by** (**Default loop · Lobby** for a group, **2 schedules**, or **Not scheduled**), and when it was last **Updated**. Use **Search playlists** to filter the list. Each row has these actions:

- **Present** - Play the playlist full screen in your browser. Only shown when the playlist has items
- **Edit** - Open the playlist editor. Clicking the name does the same
- **Duplicate** - Make a copy named "(copy)" and open it

## Creating a Playlist

1. Go to **Playlists** and click **Add playlist**.
2. Enter a **Name**, for example "Welcome loop".
3. Click **Add playlist**. The playlist editor opens.

## Adding Items

The playlist editor shows your playlist's **Items** on the left and **Add from provider** on the right.

1. On the right, choose a provider tab. Only connected providers are listed. To add another source, click **Connect another**, which opens the **Providers** page.
2. Click folders to drill in. Use the breadcrumb trail to go back up. A folder with nothing in it says **Nothing in this folder.**
3. Click a file to add it to the end of the playlist. Each file card says **Image**, **Video**, or **Audio**, with the length when the provider reports one. Files already in the playlist are marked with a check.
4. To add everything in the current folder at once, click **Add all**. The button shows how many files aren't in the playlist yet, for example **Add all (6)**.
5. Click **Save** at the top of the editor. The summary there reads **Items · 8 · 2:30**.

:::warning
Changes aren't saved until you click **Save**. Click **Cancel** to leave without saving.
:::

## Arranging Items

In the **Items** list on the left:

- **Reorder** - Drag an item by its handle on the left
- **Image timing** - Images show for 10 seconds by default. Change the number of seconds next to an image (1 second is the minimum)
- **Videos** - Videos show **Plays to end** and run their full length, with the length after it when the provider reports one
- **Remove** - Take an item out of the playlist

Each item shows its thumbnail, title, and where it came from, for example **Dropbox · Lobby / welcome.jpg**. The summary at the top shows the number of items and the playlist's total length, counting each video's reported length where there is one.

## Renaming, Duplicating, and Deleting

The panel on the left side of the editor shows a stack of the first three thumbnails, the item count and total length, and where the playlist is used: a **Default loop · Lobby** pill for each group that loops it, and **Used by 2 schedules** or **Not on a schedule yet**, plus when it was last saved. It also has these actions:

- **Present** - Play the playlist in your browser. Turned off while the playlist is empty
- **Rename** - Change the playlist's name. The new name is saved right away
- **Duplicate** - Make a copy to edit separately
- **Delete** - Remove the playlist after you confirm. Schedules that play it fall back to the group's default loop

## Presenting a Playlist in Your Browser

Click **Present** to play the playlist full screen in your browser. This is handy for previewing a playlist, or for running it from a laptop that's connected to a projector. The playlist loops. Move the mouse to show the controls bar, which reads for example **Welcome loop · 2 of 8 — Welcome.jpg** with **Next:** and a progress bar, and hides again after a few seconds. Use these keys:

| Key | Action |
|---|---|
| **Space** | Pause or resume |
| **←** / **→** | Previous or next item |
| **F** | Toggle fullscreen |
| **Esc** | Exit |

## Related Articles

- **[Scheduling the Calendar](./scheduling-the-calendar.md)** - Put your playlist on a screen group's calendar
- **[Managing Screens and Groups](./managing-screens.md)** - Set a playlist as a group's default loop
- **[Content Providers](../content-providers/index.md)** - Providers you can connect on the TV itself
