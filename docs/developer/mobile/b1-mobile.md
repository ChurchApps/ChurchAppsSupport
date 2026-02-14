---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile is the primary member-facing mobile app for ChurchApps, built with React Native and Expo. It allows church members to view directories, access giving, check attendance, receive notifications, and interact with their church community.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js** and **Expo CLI** -- see [Prerequisites](../setup/prerequisites)
- Install **Android Studio** (for Android emulator) or **Xcode** (for iOS simulator)
- Configure your API target (staging or local) -- see [Environment Variables](../setup/environment-variables)

</div>

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Install dependencies:

   ```bash
   cd B1Mobile && npm install
   ```

3. Configure environment variables -- copy the sample file and update the API endpoints:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Start the Expo dev server:

   ```bash
   npm start
   ```

:::tip
You can use the **Expo Go** app on a physical device for quick testing without setting up Android Studio or Xcode.
:::

## Environment Variables

| Variable | Description |
|----------|-------------|
| `STAGE` | Environment stage (e.g., `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Root URL for content delivery |
| `MEMBERSHIP_API` | Membership API endpoint |
| `MESSAGING_API` | Messaging API endpoint |
| `ATTENDANCE_API` | Attendance API endpoint |
| `GIVING_API` | Giving API endpoint |
| `DOING_API` | Doing API endpoint |
| `CONTENT_API` | Content API endpoint |
| `LESSONS_ROOT` | Root URL for lessons content |

## Key Commands

| Command | Description |
|---------|-------------|
| `npm start` | Launch Expo dev server |
| `npm run android` | Run on Android emulator |
| `npm run ios` | Run on iOS simulator |
| `npm run test` | Run tests (Jest) |

## Production Builds

Before creating a production build, update version numbers in all of the following files:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

This uses EAS Build to create the Android binary.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA Updates

To push an over-the-air update (without going through app store review):

```bash
npm run update:production
```

:::info
OTA updates are ideal for JavaScript-only changes. If you modify native code or dependencies, you must submit a full store build instead.
:::

## Related Articles

- **[Mobile Deployment](../deployment/mobile)** -- Full guide to building, submitting, and deploying mobile apps
- **[Environment Variables](../setup/environment-variables)** -- Complete reference for mobile environment configuration
