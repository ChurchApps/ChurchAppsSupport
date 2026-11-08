---
title: "Mobile Apps"
description: "Overview of ChurchApps' Expo and React Native mobile apps, B1 Checkin and LessonsScreen, plus local setup steps for their shared Expo toolchain."
---

# Mobile Apps

<div class="article-intro">

ChurchApps mobile apps are built with **React Native** and **Expo**, providing native experiences on Android, iOS, and Android TV. All mobile apps share the same Expo-based toolchain, so if you can build one, you can build them all.

</div>

## Apps

| App | Purpose | Platform |
|-----|---------|----------|
| B1 Checkin | Kiosk app for check-in stations | Android, iOS |
| LessonsScreen | Android TV app for displaying lessons in classrooms | Android TV |

:::info
The member-facing app is the B1 App -- the `/mobile` section of B1App, which members install as a Progressive Web App. It is a web app, not an Expo project; see [Web Apps](../web-apps/index.md) to run it locally.
:::

### B1 Checkin

A purpose-built kiosk application designed for check-in stations at churches. It provides a simple, touch-friendly interface for members to check in children and record attendance at services and events.

### LessonsScreen

An Android TV application that displays lesson content in classrooms. Teachers can push lesson slides, videos, and activities to a TV screen, making it easy to present curriculum material during classes.

## Local Setup

All mobile apps share the same Expo-based toolchain and follow similar setup patterns. Using B1 Checkin as the example:

1. Install **Node.js**, Android Studio (for the Android emulator), and Xcode (for the iOS simulator, macOS only) -- see [Prerequisites](../setup/prerequisites.md).
2. Clone the repository and install dependencies (B1 Checkin uses Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Copy `dotenv.sample.txt` to `.env` and set the stage the app should connect to (`dev` for a local API) -- see [Environment Variables](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Start the Expo dev server with `yarn start`, then run `yarn android` or `yarn ios` to launch the app on an emulator or device.

See [Mobile Deployment](../deployment/mobile.md) for release builds and over-the-air updates.
