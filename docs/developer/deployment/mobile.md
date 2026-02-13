# Mobile Deployment

ChurchApps mobile apps are built and deployed using **Expo EAS Build** and distributed through the app stores.

## Building

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Submitting to App Stores

### Android — Google Play Store

After a successful EAS build, the Android binary (AAB) is submitted to the Google Play Store through the Play Console.

### iOS — Apple App Store

Submit the iOS build directly via EAS:

```bash
eas submit --platform ios
```

## OTA Updates

For JavaScript-only changes that do not require app store review, use over-the-air (OTA) updates:

```bash
npm run update:production
```

This uses EAS Update to push changes directly to users without a full store submission.

:::tip
OTA updates are significantly faster than store builds — changes can reach users in minutes rather than days. Use them for bug fixes, copy changes, and minor UI updates that do not involve native code changes.
:::

## Version Numbers

Before creating a store build, version numbers must be updated in multiple files:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Forgetting to update version numbers in all files will cause build failures or app store rejection. Double-check every file listed above before starting a production build.
:::
