---
title: "Playing Today's Plan"
description: "Use the Today's Plan screen on a FreePlay TV: download the current service plan, press Start Plan, know how it refreshes, and turn Plan Mode off when you're done."
---

# Playing Today's Plan

<div class="article-intro">

Once a TV follows a plan type from B1 Admin, a **Today's Plan** item sits at the top of the sidebar. It opens the plan download screen, where FreePlay fetches the current plan's media and a volunteer presses **Start Plan** when class begins. This page covers that screen, how the plan stays up to date, and how to stop following a plan.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Pair the TV to a plan type in B1 Admin. See [Pairing Your Device](./device-pairing.md)
- Make sure a plan is scheduled for that plan type in B1 Admin

</div>

## The Today's Plan Screen

Select **Today's Plan** at the top of the sidebar. FreePlay loads the current plan for the TV's plan type and shows:

- The plan's cover image, when it has one
- The plan **title** (or **Service Plan** if it has none) and its **service date**
- **Downloading Item X of Y** while the plan's files are being saved to the TV
- The **Start Plan** button once every file is downloaded
- The FreePlay version number in small print below

The sidebar is hidden while this screen is open so the plan fills the TV. Press **Back** to open it.

:::tip
FreePlay also downloads the current plan in the background each time the app starts, so the files are usually ready before you open **Today's Plan**.
:::

## Starting Playback

1. Wait for **Start Plan** to appear.
2. Press **Select** on your remote.
3. The player opens with the plan's items in order. Use the remote as described in [Playing Content](../content-providers/playing-content.md). Press **Up** to jump to any item, and **Back** to return to the plan download screen.

## How the Plan Stays Current

- While the **Today's Plan** screen is open, FreePlay re-checks the plan every hour and downloads anything that changed.
- Each week, when B1 Admin has a new current plan for the plan type, the TV picks it up on its own. Nobody needs to re-pair the TV.
- Downloaded plans are also listed under **Settings > Downloads**, so you can replay a plan or delete it. See [Downloads and Storage](../getting-started/downloads-and-storage.md).

## If the Plan Won't Load

- **The plan could not be loaded** with **Make sure a plan is scheduled for this plan type** means B1 Admin has no current plan for that plan type. Schedule one, then select **Try Again**.
- **Offline: Internet access is currently unavailable** means the TV can't reach the internet. If the plan was downloaded earlier, press **Start** to play it anyway. See [Troubleshooting FreePlay](../getting-started/troubleshooting.md#the-tv-says-offline-internet-access-is-currently-unavailable).

## Connecting B1.Church as a Provider

The B1.Church content provider offers the same current plan without the pairing-code flow:

1. Open **Settings > Providers** and select **B1.Church**.
2. Follow the **Connect to B1.Church** steps on screen (scan the QR code or visit the address shown, and enter the code). See [Connecting to Providers](../content-providers/connecting-providers.md#device-flow-authentication-qr-code).
3. If the approval in B1 Admin also assigns a plan type to this TV, FreePlay shows **Connected!** and opens the plan download screen. **Today's Plan** appears in the sidebar from then on.

Once B1.Church is connected, its **Provider Settings** screen has an **Auto-Download Today's Lesson** switch (*Use this provider as the source of today's lesson and pre-download files*). Turning it on makes B1.Church the source of **Today's Plan** and downloads the current plan right away. This switch is only shown for B1.Church, because it's the only provider on the TV that can supply a plan.

## Turning Plan Mode Off

There is no unpair button for Plan Mode on the TV; the **Pair to a calendar** row in **Settings** keeps reading **Not paired** while the TV follows a plan. To stop following a plan:

- **In B1 Admin**, remove the screen from **Profile > Devices**. The TV stops receiving plans for that plan type.
- **On the TV**, if B1.Church is connected as a provider, open **Settings > Providers > B1.Church** and turn off **Auto-Download Today's Lesson**. FreePlay forgets the current plan and **Today's Plan** leaves the sidebar.
- **Pair the TV to a calendar instead.** A TV paired to a calendar always opens to the scheduled player. See [Pairing a Screen](../scheduled-mode/pairing-a-screen.md).

## Related Articles

- **[Pairing Your Device](./device-pairing.md)** - Pair the TV to a plan type with the four-letter code
- **[Playing Content](../content-providers/playing-content.md)** - Remote controls during playback
- **[Scheduling the Calendar](../scheduled-mode/scheduling-the-calendar.md)** - Play the current plan at a set time with no one pressing Start
