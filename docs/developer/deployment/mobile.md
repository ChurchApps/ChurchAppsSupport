---
title: "Mobile Deployment"
description: "Walks through building Android and iOS releases of Expo apps such as B1 Checkin, submitting them to the app stores, and pushing OTA updates with EAS."
---

# Mobile Deployment

<div class="article-intro">

ChurchApps' Expo mobile apps, such as B1 Checkin, are built with **Expo EAS Build** or a local Gradle build and distributed through the app stores. This page covers building, submitting, and pushing over-the-air updates for both Android and iOS, using B1 Checkin as the example.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up the app locally -- see [Mobile Apps](../mobile/index.md#local-setup)
- Install and configure the [EAS CLI](https://docs.expo.dev/eas/)
- Have access to the Google Play Console (Android) and/or Apple App Store Connect (iOS)

</div>

## Building

### Android

Android release builds run locally and are signed with the release keystore from EAS. Download it once with `npx eas-cli credentials -p android` (choose **credentials.json: Download credentials from EAS**), then run:

```bash
yarn build:android
```

The Google Play bundle is written to `android/app/build/outputs/bundle/release/app-release.aab`. To build on EAS instead, run `yarn build:android:eas`.

### iOS

iOS builds always run on EAS:

```bash
yarn build:ios
```

## Submitting to App Stores

### Android -- Google Play Store

Upload the AAB through the Play Console, or submit it with EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Submit the iOS build directly via EAS:

```bash
eas submit --platform ios
```

## OTA Updates

For JavaScript-only changes that do not require app store review, use over-the-air (OTA) updates:

```bash
yarn update
```

This uses EAS Update to push changes directly to users without a full store submission.

:::tip
OTA updates are significantly faster than store builds -- changes can reach users in minutes rather than days. Use them for bug fixes, copy changes, and minor UI updates that do not involve native code changes.
:::

## Version Numbers

Before creating a store build, version numbers must be updated in multiple files:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` and `versionCode`)

The iOS build number is incremented automatically by EAS.

:::warning
Forgetting to update version numbers in all files will cause build failures or app store rejection. Double-check every file listed above before starting a production build.
:::

## Related Articles

- **[Mobile Apps](../mobile/index.md)** -- Local setup and development guide
- **[API Deployment](./apis.md)** -- Deploying the backend APIs
- **[Web App Deployment](./web-apps.md)** -- Deploying the frontend web applications
