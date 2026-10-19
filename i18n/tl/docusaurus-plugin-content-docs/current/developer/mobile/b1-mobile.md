---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

Ang B1 Mobile ang pangunahing mobile app para sa mga miyembro ng ChurchApps, na binuo gamit ang React Native at Expo. Pinapayagan nitong tingnan ng mga miyembro ng simbahan ang mga direktoryo, i-access ang giving, tingnan ang attendance, tumanggap ng notification, at makipag-ugnayan sa komunidad ng simbahan nila.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js** at **Expo CLI** -- tingnan ang [Prerequisites](../setup/prerequisites)
- I-install ang **Android Studio** (para sa Android emulator) o **Xcode** (para sa iOS simulator)
- I-configure ang iyong API target (demo o local) -- tingnan ang [Environment Variables](../setup/environment-variables)

</div>

## Setup

1. I-clone ang repository:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. I-install ang mga dependency:

   ```bash
   cd B1Mobile && npm install
   ```

3. I-configure ang mga environment variable -- kopyahin ang sample file at i-update ang mga API endpoint:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Simulan ang Expo dev server:

   ```bash
   npm start
   ```

:::tip
Maaari mong gamitin ang app na **Expo Go** sa totoong device para sa mabilisang pagsubok nang hindi nagse-setup ng Android Studio o Xcode.
:::

## Mga Environment Variable

| Variable | Paglalarawan |
|----------|-------------|
| `STAGE` | Yugto ng environment (hal. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Root URL para sa paghahatid ng content |
| `MEMBERSHIP_API` | Membership API endpoint |
| `MESSAGING_API` | Messaging API endpoint |
| `ATTENDANCE_API` | Attendance API endpoint |
| `GIVING_API` | Giving API endpoint |
| `DOING_API` | Doing API endpoint |
| `CONTENT_API` | Content API endpoint |
| `LESSONS_ROOT` | Root URL para sa lessons content |

## Mga Key Command

| Command | Paglalarawan |
|---------|-------------|
| `npm start` | Ilunsad ang Expo dev server |
| `npm run android` | Patakbuhin sa Android emulator |
| `npm run ios` | Patakbuhin sa iOS simulator |
| `npm run test` | Patakbuhin ang mga test (Jest) |

## Mga Production Build

Bago gumawa ng production build, i-update ang mga version number sa lahat ng sumusunod na file:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Gumagamit ito ng EAS Build para gumawa ng Android binary.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA Update

Para magpadala ng over-the-air update (nang hindi dumadaan sa app store review):

```bash
npm run update:production
```

:::info
Ang mga OTA update ay mainam para sa mga pagbabago lamang sa JavaScript. Kung babaguhin mo ang native code o mga dependency, kailangan mong magsumite ng buong store build.
:::

## Mga Kaugnay na Artikulo

- **[Mobile Deployment](../deployment/mobile)** -- Buong gabay sa pag-build, pagsusumite, at pag-deploy ng mga mobile app
- **[Environment Variables](../setup/environment-variables)** -- Kumpletong reference para sa configuration ng mobile environment
