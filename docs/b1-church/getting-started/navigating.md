---
title: "Navigating B1App"
---

# Navigating B1App

<div class="article-intro">

The member portal in B1.church is a phone-first web app that lives under `/mobile`. It works in any browser and can be installed on your home screen. This page explains the Home dashboard, the bottom tab bar, the More menu, and the Me page.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need to be [logged in](./logging-in.md) to see your personal information. Signed-out visitors can still browse public content and are offered a **Sign In** button where a feature requires an account.

</div>

## Home

Opening `https://yourchurchname.b1.church/mobile` takes you to the **Home** dashboard at `/mobile/dashboard`. Home is the landing page of the member portal and shows:

- A greeting with your name
- The verse of the day
- A featured card for whatever your church has highlighted
- An **Explore** grid of the tools your church has turned on -- groups, giving, check-in, sermons, plans, and more

Tapping a card in Explore opens that tool. If your church has more tools than fit on the dashboard, the last card is **More**, which opens the full list at `/mobile/more`.

## The Bottom Tab Bar

On a phone, a tab bar is fixed to the bottom of the screen:

- **Home** -- always the first tab
- Up to three of the tabs your church configured
- **More** -- opens the navigation menu

If your church has configured more than three tabs, the rest are not lost: they appear in the **More** menu and on the dashboard's Explore grid. Church administrators set the tab order in B1 Admin under **Mobile → Navigation**.

## The Menu

Tapping **More** opens the navigation menu. On a tablet or desktop the same menu is always visible along the left side of the screen. It contains:

- Your name and photo, with an **Edit Profile** shortcut — see [Editing Your Profile](./editing-your-profile.md)
- **Home** and **Me**
- **Admin** -- only shown if you have administrator permissions at your church; it opens B1 Admin
- Every tab your church configured, in order
- **Install App** -- opens the [install instructions](./installing-pwa.md) at `/mobile/install`
- A light/dark mode toggle
- **Sign In** or **Log Out**
- Your church's name and a link to the privacy policy

## The App Bar

The bar across the top of every screen shows:

- The screen title, or your church's name on Home
- A back arrow when you have drilled into a detail screen
- A **bell** icon for notifications and messages, with a badge for unread items
- Your **profile photo**, which opens your profile at `/mobile/profileEdit` — see [Editing Your Profile](./editing-your-profile.md)

## The Me Page

**Me** (`/mobile/me`) is your personal hub. It lists shortcuts to your profile, [notification preferences](./notification-preferences.md), messages, [giving](../giving/), and [registrations](../events/my-registrations.md), followed by what is coming up for you -- serving assignments, event registrations, and group events -- and your most recent notifications. See [The Me Page](./me-page) for details.

If you are signed out, the Me page shows a **Sign In** button instead.

## Installing to Your Home Screen

The member portal is a Progressive Web App. Visit `/mobile/install` (or choose **Install App** in the menu) for step-by-step instructions for your device. Once installed, it opens full-screen from your home screen without browser chrome. See [Installing as an App (PWA)](./installing-pwa.md).

## Your Church's Public Website

Outside the member portal, your church's public website has its own header navigation with links your administrators configured -- pages like [sermons](../content/sermons.md), the [Bible](../content/bible.md), [live streaming](../content/live-streaming.md), and a public group list. On a phone those links live behind the hamburger icon in the top-right of the header.

:::info
The tabs and tools you see vary by church. Administrators control which sections are visible to members through B1 Admin, so if you do not see a feature described here, your church may not have turned it on.
:::
