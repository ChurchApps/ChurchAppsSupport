---
title: "Connecting Providers and Building Playlists"
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
   - Some providers, such as Dropbox, Google Drive, and OneDrive, open a sign-in popup. If nothing appears, allow popups for admin.freeplay.church.
   - Other providers show a link and a code. Visit the link, enter the code, and approve access. The dialog updates on its own when you're done.
4. When you see **Account linked successfully!**, the provider moves to **Connected**.

Connected providers have three actions:

- **Browse** - Look through the provider's folders
- **Refresh** - Renew the provider's sign-in
- **Unlink** - Disconnect the account

:::info
Provider connections in FreePlay Admin belong to the whole church, not to one person or one TV. Scheduled screens get their files through these connections, so you don't need to sign in to each provider on every TV.
:::

**FreeShow** is listed as **On your church network · each TV finds it itself**. There's nothing to connect for it in FreePlay Admin.

## The Playlists Page

The **Playlists** page lists each playlist with its number of items, its total duration, where it's used (**Default loop** for a group, or the number of schedules), and when it was last updated. Each row has these actions:

- **Present** - Play the playlist full screen in your browser
- **Edit** - Open the playlist editor
- **Duplicate** - Make a copy named "(copy)"

## Creating a Playlist

1. Go to **Playlists** and click **Add playlist**.
2. Enter a **Name**, for example "Welcome loop".
3. Click **Add playlist**. The playlist editor opens.

## Adding Items

The playlist editor shows your playlist's **Items** on the left and **Add from provider** on the right.

1. On the right, choose a provider tab. To add another source, click **Connect another**, which opens the **Providers** page.
2. Click folders to drill in. Use the breadcrumb trail to go back up.
3. Click a file to add it to the end of the playlist. Files already in the playlist are marked as selected.
4. To add everything in the current folder at once, click **Add all**. The button shows how many files aren't in the playlist yet.
5. Click **Save** at the top of the editor.

:::warning
Changes aren't saved until you click **Save**. Click **Cancel** to leave without saving.
:::

## Arranging Items

In the **Items** list on the left:

- **Reorder** - Drag an item by its handle on the left
- **Image timing** - Images show for 10 seconds by default. Change the number of seconds next to an image
- **Videos** - Videos show **Plays to end** and run their full length
- **Remove** - Take an item out of the playlist

The summary at the top shows the number of items and the playlist's total length.

## Renaming, Duplicating, and Deleting

The panel on the left side of the editor shows where the playlist is used. It also has these actions:

- **Present** - Play the playlist in your browser
- **Rename** - Change the playlist's name
- **Duplicate** - Make a copy to edit separately
- **Delete** - Remove the playlist. Schedules that play it fall back to the group's default loop

## Presenting a Playlist in Your Browser

Click **Present** to play the playlist full screen in your browser. This is handy for previewing a playlist, or for running it from a laptop that's connected to a projector. Move the mouse to show the controls bar, then use these keys:

| Key | Action |
|---|---|
| **Space** | Pause or resume |
| **←** / **→** | Previous or next item |
| **F** | Toggle fullscreen |
| **Esc** | Exit |

## Related Articles

- **[Scheduling the Calendar](./scheduling-the-calendar)** - Put your playlist on a screen group's calendar
- **[Managing Screens and Groups](./managing-screens)** - Set a playlist as a group's default loop
- **[Content Providers](../content-providers/)** - Providers you can connect on the TV itself
