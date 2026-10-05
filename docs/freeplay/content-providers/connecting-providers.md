---
title: "Connecting to Providers"
---

# Connecting to Providers

<div class="article-intro">

Before you can browse content from a provider, you need to connect to it. Some providers require authentication through a QR code or email login, while others can be connected with a single click.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install and launch FreePlay -- see [Getting Started](../getting-started/)
- Have your TV remote ready for navigation
- For providers requiring login, have your account credentials available

</div>

:::tip Setting up B1 Admin + FreePlay together?
Our **<a href="/guides/freeplay-b1admin" target="_blank">step-by-step guide</a>** walks through linking B1 Admin, scheduling a lesson, and connecting FreePlay — all in one place. Open it in a new tab to follow along.
:::

## Browsing Available Providers

1. Open **Settings** at the bottom of the sidebar, then select **Providers** to open the **Content Providers** screen
2. You will see a grid of provider cards, each showing the provider's logo and name
3. Connected providers display a green **Connected** badge below their name
4. Providers that are not yet available show a **Coming Soon** label

## Connecting Without Authentication

Some providers do not require a login. When you select one of these providers, FreePlay connects immediately and opens the content browser. No credentials are needed.

## Device Flow Authentication (QR Code)

Certain providers use a device flow, similar to how you sign in to streaming apps on a TV:

1. Select the provider card on the **Content Providers** screen
2. FreePlay displays a QR code and a verification URL
3. Scan the QR code with your phone, or visit the displayed URL on any device
4. Enter the user code shown on the TV screen
5. Complete the sign-in process on your phone or computer
6. FreePlay detects the successful login and displays **Connected!**
7. The content browser opens automatically

:::info
A pulsing **Waiting for authorization** indicator shows that FreePlay is checking for your login. The code expires after several minutes, so complete the process promptly.
:::

**Go Curriculum** uses this same QR-code sign-in pattern -- scan the code and log in with your gocurriculum.com account to connect.

## Form Login

Other providers use a traditional email and password login:

1. Select the provider card
2. Enter your **Email** and **Password** using the on-screen keyboard
3. Select the **Sign In** button
4. If your credentials are correct, FreePlay displays **Connected!** and opens the content browser

:::tip
Use the directional pad on your remote to move between the email field, password field, and sign-in button. Press **Select** on a text field to open the on-screen keyboard.
:::

## Finding a Provider on Your Network

**FreeShow** is found on your local network instead of through a sign-in: FreePlay searches the network, lists each computer running FreeShow that it finds, and connects to the one you select (choose **Scan Again** if none appear).

## Provider Settings

Selecting a provider card that shows the **Connected** badge opens its **Provider Settings** screen:

- **Browse Library** -- Show or hide this provider's content library in the sidebar
- **Auto-Download Today's Lesson** -- Use this provider as the source of today's lesson and pre-download its files (only shown for providers that offer a current lesson)
- **Use for Announcements** -- Pick a folder from this provider to loop from the **Announcements** item in the sidebar. See [Announcements](./announcements)
- **Check for Announcement Updates** -- Shown once an announcements folder is chosen; downloads new slides and removes deleted ones
- **Disconnect** -- Remove the connection

## Disconnecting a Provider

To disconnect from a provider you have already connected:

1. Go to the **Content Providers** screen (**Settings** > **Providers**)
2. Select the provider card that shows the **Connected** badge
3. On the **Provider Settings** screen, select **Disconnect**

After disconnecting, the provider's content will no longer appear in your sidebar. If you were using one of its folders for announcements, those slides are removed as well.

:::warning
Disconnecting removes the saved authentication from your device. You will need to sign in again if you want to reconnect later.
:::

## Related Articles

- **[Browsing and Downloading Content](./browsing-content)** - Navigate folders and play content after connecting
- **[Announcements](./announcements)** - Loop a folder of slides from a connected provider
- **[Content Providers Overview](./index.md)** - See all available providers
