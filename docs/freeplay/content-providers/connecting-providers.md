---
title: "Connecting to Providers"
description: "Connect FreePlay to a content provider on the TV with a QR code, a one-time code, or no sign-in at all, then adjust its Provider Settings or disconnect it."
---

# Connecting to Providers

<div class="article-intro">

Before you can browse content from a provider, you need to connect to it on the TV. Public providers connect with a single press. Providers that hold your own files or a paid curriculum ask you to sign in from your phone or computer, so you never have to type a password with the remote.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install and launch FreePlay -- see [Getting Started](../getting-started/index.md)
- Have your TV remote ready for navigation
- For providers that need a sign-in, have your phone handy and know the account login

</div>

:::tip Setting up B1 Admin + FreePlay together?
Our **<a href="/guides/freeplay-b1admin" target="_blank">step-by-step guide</a>** walks through linking B1 Admin, scheduling a lesson, and connecting FreePlay — all in one place. Open it in a new tab to follow along.
:::

## Browsing Available Providers

1. Open **Settings** at the bottom of the sidebar, then select **Providers** to open the **Content Providers** screen
2. You will see a grid of provider cards, each showing the provider's logo and name
3. Connected providers display a green **Connected** badge below their name
4. Providers that are not yet available show a **Coming Soon** label

How you connect depends on the provider:

| Provider | How it connects |
|---|---|
| **Lessons.church**, **Bible Project**, **Jesus Film Project** | No sign-in. Connects as soon as you select the card |
| **SignPresenter**, **B1.Church** | Scan a QR code or visit a web address, then enter a short code shown on the TV |
| **Dropbox**, **OneDrive**, **GO! Curriculum** | Scan a QR code and sign in to your account on your phone. No code to type |

## Connecting Without Authentication

Lessons.church, Bible Project, and Jesus Film Project don't need a login. Select the card and FreePlay connects immediately, adds the provider to the **Browse** list in the sidebar, and opens its content browser.

## Device Flow Authentication (QR Code)

SignPresenter and B1.Church use a device flow, similar to how you sign in to streaming apps on a TV:

1. Select the provider card on the **Content Providers** screen
2. FreePlay shows a **Connect to** screen with the provider's name, a QR code, and a web address, with the instruction **Scan the QR code with your phone, or visit** the address **and enter the code below**
3. Scan the QR code with your phone, or visit the address on any device
4. Enter the code shown under **Enter this code:** on the TV
5. Complete the sign-in on your phone or computer
6. FreePlay detects the approval and displays **Connected!**, then **Loading your content...**
7. The content browser opens automatically

:::info
A pulsing **Waiting for confirmation** indicator and the line **Check your phone to confirm** show that FreePlay is checking for your approval. **Code expires in N minutes** counts down how long you have. If it runs out, you see **Authentication code expired. Please try again.** Select **Generate New Code** for a fresh one, or **Cancel** to go back.
:::

When you connect **B1.Church**, the approval in B1 Admin can also assign a plan type to this TV. In that case FreePlay opens the plan download screen instead of the browser, and **Today's Plan** appears in the sidebar. See [Playing Today's Plan](../plan-mode/playing-todays-plan.md).

## Phone Sign-In (QR Code Only)

**Dropbox**, **OneDrive**, and **GO! Curriculum** use a QR-code sign-in with no code to type:

1. Select the provider card on the **Content Providers** screen
2. FreePlay shows a **Connect to** screen with the provider's name and a QR code: **Scan the QR code with your phone to authorize access. Your TV will connect automatically once you approve.**
3. Scan the QR code with your phone and sign in to your account with that provider (your Dropbox account, your Microsoft account for OneDrive, or your gocurriculum.com account for GO! Curriculum)
4. Approve access. The TV shows **Connecting...**, then **Connected!**, and opens the content browser

**Code expires in N minutes** shows how long you have to finish signing in. If the sign-in is rejected or runs out, the screen explains what happened (for example **Authorization session expired. Please try again.**) and offers **Try Again**. Select **Cancel** to go back to the **Content Providers** screen.

:::tip
GO! Curriculum only shows the age groups and videos that your Go membership includes. Sign in with the account that holds your church's membership.
:::

## Provider Settings

Selecting a provider card that shows the **Connected** badge opens its **Provider Settings** screen, headed with the provider's logo and name. Each row is a switch you toggle with **Select**:

- **Browse Library** -- *Show this provider's content library in the menu.* Turn it off to hide the provider from the **Browse** list in the sidebar without disconnecting it. This is handy for a provider you only use for announcements. Turn it back on to browse again
- **Auto-Download Today's Lesson** -- *Use this provider as the source of today's lesson and pre-download files.* Only shown for **B1.Church**. See [Playing Today's Plan](../plan-mode/playing-todays-plan.md#connecting-b1church-as-a-provider)
- **Use for Announcements** -- *Pick a folder from this provider to loop from the Announcements menu.* Once a folder is chosen, the row reads **Looping "folder name" — N slides downloaded**. See [Announcements](./announcements.md)
- **Check for Announcement Updates** -- Shown once an announcements folder is chosen. *Download new slides and remove deleted ones. Also runs each time the app starts.* While it runs the row reads **Checking…**, then **Up to date — N slides** or **Could not update**
- **Disconnect** -- Remove the connection. See below

Press **Back** to return to the **Content Providers** screen.

## Disconnecting a Provider

To disconnect from a provider you have already connected:

1. Go to the **Content Providers** screen (**Settings** > **Providers**)
2. Select the provider card that shows the **Connected** badge
3. On the **Provider Settings** screen, select **Disconnect**

FreePlay disconnects right away, with no confirmation step, and returns to the **Content Providers** screen. The provider leaves the **Browse** list in the sidebar. If you were using one of its folders for announcements, those slides are removed as well, and if B1.Church was the source of **Today's Plan**, that stops too.

:::warning
Disconnecting removes the saved sign-in from your device. You will need to sign in again if you want to reconnect later. Content you downloaded from the provider stays under **Settings > Downloads** until you delete it.
:::

:::info
Providers you connect on the TV are only for that TV. If your screens follow a calendar, connect providers once in FreePlay Admin instead and every screen can play from them. See [Connecting Providers and Building Playlists](../scheduled-mode/building-playlists.md#connecting-providers).
:::

## Related Articles

- **[Browsing and Downloading Content](./browsing-content.md)** - Navigate folders and play content after connecting
- **[Announcements](./announcements.md)** - Loop a folder of slides from a connected provider
- **[Content Providers Overview](./index.md)** - See all available providers
