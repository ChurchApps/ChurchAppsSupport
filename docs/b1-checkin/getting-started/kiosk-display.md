---
title: "Kiosk Display, Idle Screen, and Language"
sidebar_label: "Display & Language"
description: "How B1 Checkin shows your church logo, colors, background image, and idle screensaver, and which languages the kiosk displays."
---

# Kiosk Display, Idle Screen, and Language

<div class="article-intro">

B1 Church Checkin picks up your church's branding automatically: the logo in the header, the app colors, an optional background image, and an idle screensaver that plays while nobody is using the tablet. These are configured once in B1 Admin and apply to every kiosk. The kiosk's language follows the tablet's language setting.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Log in](./logging-in.md) to the kiosk and select your church
- Branding is set by a church administrator in B1 Admin -- see [Customizing the Kiosk Appearance](../../b1-admin/attendance/check-in.md#customizing-the-kiosk-appearance)

</div>

## Church Logo

Once a church is selected, the header on every screen shows the church's **light logo** from its church settings in B1 Admin. If no logo has been uploaded, the B1 Church Checkin logo is shown instead. The same logo appears on the [idle screen](#idle-screen) and the church list when you [select a church](./logging-in.md#selecting-your-church).

The logo is also the hidden door to [Admin Settings](./admin-settings.md): tap it seven times quickly.

## Colors

The kiosk uses the **light mode** colors of your church's app theme, set in B1 Admin under **Mobile > App Theme** (see [App Theme](../../b1-admin/settings/mobile-app.md#app-theme)):

- The **primary** color fills the header and the main buttons, such as **Check In** and **Search**.
- The **secondary** color is used for accents.
- The primary **contrast** color is used for text on those buttons.

If the church has not set an app theme, the kiosk uses its default blue.

## Background Image

If an administrator has uploaded a kiosk **Background Image**, it appears behind every kiosk screen, softened by a light overlay so text and buttons stay readable. Remove the image in B1 Admin to return to the plain background.

## Idle Screen

The idle screen is a screensaver that plays on the [lookup screen](../check-in/looking-up-members.md) when the kiosk sits untouched.

- It only runs when an administrator has turned on **Enable idle screen** and added at least one slide with an image. Without slides, nothing happens no matter how long the kiosk is idle.
- After the configured **Timeout (seconds)** with no touch on the lookup screen (120 seconds if none is set), the slides fade in full-screen and slowly zoom. Each slide shows for its own **Duration (s)** (10 seconds if none is set), in the order set in B1 Admin, and the show loops.
- The church logo and a pulsing **Tap to check in** prompt appear along the bottom.
- Tap anywhere to dismiss the slides and return to the lookup screen.

The idle screen does not appear on other screens, so a family who walks away mid-check-in leaves their household screen visible. The kiosk does not reset a half-finished check-in on its own; the next family (or a volunteer) can tap the back arrow to return to the lookup screen. The [guest registration form](../check-in/looking-up-members.md#registering-as-a-guest) is the exception: it closes itself after 2 minutes without typing or touching.

:::tip
Use the idle screen for sermon series art, upcoming events, or a "Welcome -- tap to check in" slide. Images are shown full-screen, so landscape images in the tablet's aspect ratio look best.
:::

## When Appearance Changes Take Effect

The kiosk downloads the logo, colors, background, and idle screen settings when it starts and again each time the [services screen](../check-in/selecting-service.md) opens. After changing settings in B1 Admin, open [Admin Settings](./admin-settings.md) on the kiosk and tap **Change Service** (or restart the app) to pick up the change. The last downloaded theme is cached on the tablet, so the kiosk still looks right if it starts without a connection.

## Language

The kiosk displays its screens in the **tablet's language**. There is no language setting inside the app; change it in the tablet's system settings and reopen the app.

Supported languages are Chinese, English, Filipino (Tagalog), French, German, Hindi, Italian, Korean, Norwegian, Portuguese, Russian, and Spanish. A tablet set to any other language shows English.

A few things to know:

- Names, group names, service names, and announcement text come from your B1 Admin data and are shown as entered, whatever the kiosk language.
- Times such as **Closed · opens Sun 9:30 AM** are formatted for the kiosk language.
- On printed labels, the **Check-in Type** text (Member, Guest, Volunteer) and ages under two years (for example "18 mo") are printed in the kiosk language. Conditions in the [Label Designer](../../b1-admin/attendance/labels.md) such as "Check-in Type equals Guest" still match on any kiosk language.

## Orientation

The app runs in **portrait** orientation on both iPad and Android tablets. Mount or stand the tablet upright.

## Related Articles

- [Customizing the Kiosk Appearance](../../b1-admin/attendance/check-in.md#customizing-the-kiosk-appearance) -- the B1 Admin side of these settings
- [Admin Settings and Kiosk PIN](./admin-settings.md) -- per-tablet settings
- [Looking Up Members](../check-in/looking-up-members.md) -- the screen the idle screen runs on
