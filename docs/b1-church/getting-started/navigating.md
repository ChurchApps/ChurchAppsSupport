---
title: "Navigating B1App"
---

# Navigating B1App

<div class="article-intro">

The member portal in B1.church is a phone-first web app that lives under `/mobile`. It works in any browser and can be installed on your home screen. This page explains the Home dashboard, the bottom tab bar, the More page, and the Me page.

</div>

## Tour Video

<YouTube id="8XKRZvvAbXg" title="A Tour of the B1.church Member App" next="A Tour of B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Before You Begin</h4>

- You need to be [logged in](./logging-in.md) to see your personal information. Signed-out visitors can still browse public content and are offered a **Sign In** button where a feature requires an account.

</div>

## Home {#home}

Opening `https://yourchurchname.b1.church/mobile` takes you to the **Home** dashboard at `/mobile/dashboard`. Home is the landing page of the member portal. It starts with a greeting ("Good morning", "Good afternoon", or "Good evening" with your first name) and today's date, followed by sections that only appear when they apply:

- **Photo tiles** -- tabs your church gave a photo (including Verse of the Day) appear as photo tiles under your church's name. Depending on your church's choice they are laid out as a two-column grid, a row you swipe sideways, or a list with a small thumbnail beside each name -- see [Home Screen Tiles](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Every photo tab appears here, even one that also has a slot in the tab bar.
- **Latest sermon** -- your church's newest sermon, with an **All sermons** link
- **Verse of the Day** -- today's verse; tap it to open the full [Verse of the Day](../content/verse-of-the-day.md) page
- **You're serving** -- your next upcoming serving assignments, with an **All plans** link. If any assignment still needs your answer, those are shown first with a **Needs reply** badge and **Accept** / **Decline** buttons so you can respond right from Home (**Decline** asks you to confirm first); otherwise your next assignments show an **Accepted** or **Confirmed** badge. Tap an assignment to open its plan.
- **Your groups** -- up to three of your groups with their meeting time and location, and an **All groups** link
- **Upcoming events** -- when you are signed in, the next three upcoming events from the groups you belong to, each with its date and time (and a thumbnail if the event has a photo). Tap an event to open its group's events. Tap **All upcoming events** to open the full upcoming list on your [Me page](./me-page.md#upcoming), which also includes your serving assignments and registrations.
- **Giving** -- how much you have given this year ("Given in" the current year), a **Give** button, and a **History** link to your [donation history](../giving/donation-history.md). Hidden if your church has limited members' giving history to an earlier year or hidden it, in which case your church's giving tool shows as a button under **More from** instead
- **More from** *your church* -- buttons for the rest of the tools your church has turned on that are not already in the tab bar or shown above. The ones you use most move to the front.

The serving, groups, and giving sections only appear when you are signed in, your church has that tool turned on, and you have something to show -- for example, an upcoming assignment or at least one group. On a computer, Home is laid out in two columns.

If you are signed out, Home shows a **Welcome** heading in place of the greeting, with a short prompt ("Sign in to see your groups, giving, and more.") and a **Sign In** button. The prompt shows even when your church hasn't set up anything else for Home yet. Your church can reword this prompt or hide it -- see [Mobile App Settings](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). When it is hidden, you can still sign in from the **More** page or the **Me** page.

## The Bottom Tab Bar

On a phone, a tab bar is fixed to the bottom of the screen:

- **Home** -- always the first tab
- Up to three of the tabs your church configured
- **More** -- opens the More page

Built-in screens (such as Groups, Giving, or Plans) get the tab slots first; any slots left over go to your church's custom pages. Only links to outside websites and the Verse of the Day are never given a tab. If your church has configured more tabs than fit, the rest are not lost: they appear on the **More** page and in the **More from** section on Home. Church administrators set the tab order in B1 Admin under **Mobile → Navigation**.

## On a Computer

On a wider screen, such as a computer or a large tablet, the bottom tab bar is replaced by a header across the top of the screen in your church's color. It shows your church's logo, or its name if no logo is set (click it to return to Home), **Home**, up to five of the tabs your church configured, and **More**, with the bell and your profile photo on the right. When you open a detail screen, a **Back** link appears above the page content.

## The More Page

Tapping **More** opens the More page at `/mobile/more`. It contains:

- Your name and photo, with an **Edit Profile** link — see [Editing Your Profile](./editing-your-profile.md)
- Every tab your church configured, in order, under your church's name. Links to outside websites open in a new browser tab.
- An **Account** section with:
  - **Me** -- your personal page (signed in only)
  - **Appearance** -- switch between **Light Mode** and **Dark Mode**
  - **Admin Portal** -- only shown if you have administrator permissions at your church; it opens B1 Admin in a new tab
  - **Install App** -- opens the [install instructions](./installing-pwa.md) at `/mobile/install` (hidden once the app is installed)
- **Sign out**, or a **Sign In** button if you are signed out
- Your church's name and a link to the privacy policy

## The App Bar

On a phone, the bar across the top of every screen shows:

- Your church's logo (or its name, if your church hasn't uploaded a logo) on Home and the other main screens, or a back arrow when you have drilled into a detail screen. The screen's title appears at the top of the page itself.
- A **bell** icon for notifications and messages, with a badge for unread items -- see [Notifications and Messages](#notifications-and-messages) below
- Your **profile photo**, which opens your profile at `/mobile/profileEdit` — see [Editing Your Profile](./editing-your-profile.md)

The bell and profile photo only appear when you are signed in.

## Notifications and Messages

Tapping the bell opens a panel with two sections:

- **Messages** -- your most recent private conversations, with a **New message** link to start one
- **Notifications** -- your most recent notifications, with a **New** badge on unread ones. Tap a notification to go to the group, plan, or conversation it came from.

Each section shows how many unread items it has. Tap **See all** at the bottom to open your full inbox at `/mobile/notifications`.

## Pages With Sections

Detail pages -- a group, a plan, your Me page, the Plans and Giving screens -- are laid out as one page of sections instead of tabs. Each section shows a short preview, and a link in the section's header (such as **All members**, **All events**, or **Full service order**) opens the full list. A **Back to** link at the top of that view returns you to the page you came from.

## The Me Page

**Me** (`/mobile/me`) is your personal hub. It shows your name and photo with **Edit Profile** and **Settings** ([notification preferences](./notification-preferences.md)) buttons, then what is coming up for you -- serving assignments, event registrations, and group events -- followed by your household, your groups, your [giving](../giving/) this year, the forms you've submitted, your attendance history, your [registrations](../events/my-registrations.md), and your recent notifications and messages. See [The Me Page](./me-page) for details.

If you are signed out, the Me page shows a **Sign In** button instead.

## Installing to Your Home Screen

The member portal is a Progressive Web App. Visit `/mobile/install` (or choose **Install App** on the More page) for step-by-step instructions for your device. Once installed, it opens full-screen from your home screen without browser chrome. See [Installing as an App (PWA)](./installing-pwa.md).

## Your Church's Public Website

Outside the member portal, your church's public website has its own header navigation with links your administrators configured -- pages like [sermons](../content/sermons.md), the [Bible](../content/bible.md), [live streaming](../content/live-streaming.md), and a public group list. On a phone those links live behind the hamburger icon in the top-right of the header.

:::info
The tabs and tools you see vary by church. Administrators control which sections are visible to members through B1 Admin, so if you do not see a feature described here, your church may not have turned it on.
:::
