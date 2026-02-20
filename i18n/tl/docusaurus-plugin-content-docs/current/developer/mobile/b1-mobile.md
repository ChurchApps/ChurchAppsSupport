---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

Ang B1 Mobile ang pangunahing mobile app na nakaharap sa miyembro para sa ChurchApps, na binuo gamit ang React Native at Expo. Pinapayagan nito ang mga miyembro ng simbahan na tingnan ang mga direktoryo, i-access ang pagbibigay, suriin ang attendance, makatanggap ng mga abiso, at makipag-ugnayan sa kanilang komunidad ng simbahan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **Node.js** at **Expo CLI** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- Mag-install ng **Android Studio** (para sa Android emulator) o **Xcode** (para sa iOS simulator)
- I-configure ang iyong API target (staging o lokal) -- tingnan ang [Mga Variable ng Kapaligiran](../setup/environment-variables)

</div>

## Pag-setup

1. I-clone ang repository:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Mag-install ng mga dependency:

   ```bash
   cd B1Mobile && npm install
   ```

3. I-configure ang mga variable ng kapaligiran -- kopyahin ang sample file at i-update ang mga API endpoint:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Simulan ang Expo dev server:

   ```bash
   npm start
   ```

:::tip
Maaari mong gamitin ang **Expo Go** app sa isang pisikal na device para sa mabilis na pagsubok nang hindi kailangang mag-setup ng Android Studio o Xcode.
:::

## Mga Variable ng Kapaligiran

| Variable | Paglalarawan |
|----------|-------------|
| `STAGE` | Yugto ng kapaligiran (hal., `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Root URL para sa content delivery |
| `MEMBERSHIP_API` | Endpoint ng Membership API |
| `MESSAGING_API` | Endpoint ng Messaging API |
| `ATTENDANCE_API` | Endpoint ng Attendance API |
| `GIVING_API` | Endpoint ng Giving API |
| `DOING_API` | Endpoint ng Doing API |
| `CONTENT_API` | Endpoint ng Content API |
| `LESSONS_ROOT` | Root URL para sa nilalaman ng mga aralin |

## Mga Pangunahing Utos

| Utos | Paglalarawan |
|---------|-------------|
| `npm start` | Ilunsad ang Expo dev server |
| `npm run android` | Patakbuhin sa Android emulator |
| `npm run ios` | Patakbuhin sa iOS simulator |
| `npm run test` | Patakbuhin ang mga test (Jest) |

## Mga Production Build

Bago lumikha ng production build, i-update ang mga numero ng bersyon sa lahat ng sumusunod na file:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Gumagamit ito ng EAS Build upang likhain ang Android binary.

### iOS

```bash
eas build --platform ios --profile production
```

### Mga OTA Update

Para mag-push ng over-the-air na update (nang hindi dumadaan sa pagsusuri ng app store):

```bash
npm run update:production
```

:::info
Ang mga OTA update ay angkop para sa mga pagbabagong JavaScript lamang. Kung nagbago ka ng native code o mga dependency, kailangan mong magsumite ng buong store build sa halip.
:::

## Mga Kaugnay na Artikulo

- **[Pag-deploy ng Mobile](../deployment/mobile)** -- Kumpletong gabay sa pagbuo, pagsusumite, at pag-deploy ng mga mobile app
- **[Mga Variable ng Kapaligiran](../setup/environment-variables)** -- Kumpletong sanggunian para sa configuration ng kapaligiran ng mobile
