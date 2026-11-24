---
title: "Troubleshooting FreePlay"
description: "Fix common FreePlay TV app problems: an Offline screen, a video that won't play, an expired pairing or sign-in code, an empty folder, or a TV that lost its schedule."
---

# Troubleshooting FreePlay

<div class="article-intro">

Most FreePlay problems come down to the internet connection, an expired code, or a file that didn't download. This page lists the messages you might see on the TV, what each one means, and what to do about it.

</div>

## The TV Says "Offline: Internet access is currently unavailable"

This screen appears in [Plan Mode](../plan-mode/index.md) when FreePlay can't reach the internet to load the current plan, or when loading takes more than a few seconds.

- If the plan was downloaded earlier, the screen says **You can still play what was downloaded in advance.** Press **Start** to play it from storage.
- If nothing has been downloaded, it says **Nothing has been downloaded for offline play yet. Please check your connection and try again.** Reconnect the TV to Wi-Fi, then press **Back** to return to the **Content Providers** screen and open **Today's Plan** again.

:::tip
Download the week's content while the building has a good connection. Everything you download plays without internet on Sunday. See [Downloads and Storage](./downloads-and-storage.md).
:::

## "Video failed to load" or "Image failed to load"

During playback, a file that won't open shows this message with **Skipping to next item...** for a few seconds, then FreePlay moves on by itself. A video that hasn't started within 15 seconds is treated the same way.

- **A downloaded image that fails** is deleted from storage so the next download fetches a fresh copy. Download the lesson again from its provider.
- **A streamed video that fails** usually means a slow connection. Download the content instead of streaming it.
- **On a TV paired to a calendar**, FreePlay takes the bad file out of rotation and downloads it again on its own.

## "Playback failed - Press back to return"

The player hit an error it couldn't recover from. Press **Back** to leave the player, then open the content again. If the same item fails every time, delete the download from **Settings > Downloads** and download it again.

## "The plan could not be loaded"

In Plan Mode, this means the TV is paired but there's no plan to show. The screen adds **Make sure a plan is scheduled for this plan type.** Create or schedule a plan for that plan type in B1 Admin, then press **Try Again**.

## A Pairing Code or Sign-In Code Expired

- **Pair this screen** codes last 15 minutes. FreePlay shows a new code on its own when the old one runs out, and you can select **Generate New Code** at any time. Always enter the code the TV is showing right now. See [Pairing a Screen](../scheduled-mode/pairing-a-screen.md).
- **Provider sign-in codes** also expire. The **Connect to** screen shows **Code expires in N minutes**. If it runs out, you see **Authentication code expired. Please try again.** Select **Generate New Code** or **Try Again**. See [Connecting to Providers](../content-providers/connecting-providers.md).
- **Failed to generate pairing code** means the TV couldn't reach the internet. Check the connection and select **Try Again**.

## "That code didn't match a TV" in FreePlay Admin

The four letters you typed don't match any TV that's waiting to pair. Check the code on the screen, and make sure it hasn't expired. If the TV has already moved on to a new code, use that one.

## "No content available" in a Folder

The folder is empty, or the provider returned nothing. The screen suggests **Try Different Folder**. Press **Back** to go up a level and pick another folder. If a provider that needs a sign-in shows empty folders everywhere, disconnect it and sign in again from **Settings > Providers**.

:::info
**GO! Curriculum** only lists the age groups and videos your Go membership includes. A login with no membership sees an empty library. Small Group guides are text-only and are left out on the TV.
:::

## A Provider Card Says "Coming Soon"

That provider isn't available in this version of FreePlay yet. Selecting it only shows a **Coming Soon** message.

## A Paired TV Shows "Nothing is scheduled right now"

The TV is paired to a calendar, but nothing is scheduled for this moment and the screen group has no default loop. Add a schedule or set a default loop in FreePlay Admin. See [Scheduling the Calendar](../scheduled-mode/scheduling-the-calendar.md). The TV picks up the change within about 10 minutes, or right away if you restart FreePlay.

## A Paired TV Is Stuck on "Downloading X of Y files"

The TV hasn't finished downloading the content it needs. Make sure it's online and has free storage. If FreePlay Admin shows **N files missing** for the screen, see [Downloads and Storage](./downloads-and-storage.md) for how low storage stops downloads.

## A Paired TV Went Back to Showing a Pairing Code

Someone unpaired the screen in FreePlay Admin, or its pairing was removed. Pair it again from the **Screens** page. See [Pairing a Screen](../scheduled-mode/pairing-a-screen.md).

## FreePlay Opened to the Wrong Screen

- A TV paired to a calendar always opens to the scheduled player, and returns to it whenever FreePlay comes back to the foreground. To browse content instead, press **Select** in the player and choose **Browse Content**. See [Scheduled Playback on the TV](../scheduled-mode/scheduled-playback.md)
- A TV that isn't paired opens to the first connected provider's library, or to the **Content Providers** screen when nothing is connected

## Finding Your FreePlay Version

Support may ask which version of FreePlay a TV is running. Open **Settings > Providers**. The version is shown at the top right of the **Content Providers** screen, for example **v1.5.1**. In Plan Mode, the plan download screen shows it as well. For a TV paired to a calendar, FreePlay Admin lists **App version** in the screen's **Device** section.

## Related Articles

- **[Getting Started](./index.md)** - Installation and remote controls
- **[Downloads and Storage](./downloads-and-storage.md)** - Manage what's saved on the TV
- **[Connecting to Providers](../content-providers/connecting-providers.md)** - Sign in to a provider again
