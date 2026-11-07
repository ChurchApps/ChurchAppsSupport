---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

A B1 Mobile a ChurchApps elsődleges, a gyülekezeti tagok számára készült mobilalkalmazása, amelyet React Native és Expo használatával fejlesztettek. Lehetővé teszi, hogy a gyülekezet tagjai megtekintsék a címtárat, elérjék az adakozási funkciókat, rögzítsék a részvételt, értesítéseket kapjanak, és kapcsolatba léphessenek gyülekezetük közösségével.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Telepítse a **Node.js**-t és az **Expo CLI**-t -- lásd: [Előfeltételek](../setup/prerequisites)
- Telepítse az **Android Studio**-t (Android emulátorhoz) vagy az **Xcode**-ot (iOS szimulátorhoz)
- Állítsa be az API célpontot (demó vagy helyi) -- lásd: [Környezeti változók](../setup/environment-variables)

</div>

## Beállítás

1. Klónozza a tárolót:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Telepítse a függőségeket:

   ```bash
   cd B1Mobile && npm install
   ```

3. Állítsa be a környezeti változókat -- másolja le a mintafájlt, és frissítse az API végpontokat:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Indítsa el az Expo fejlesztői kiszolgálót:

   ```bash
   npm start
   ```

:::tip
Ha gyorsan szeretné tesztelni az alkalmazást, használhatja az **Expo Go** alkalmazást valódi eszközön is, anélkül hogy be kellene állítania az Android Studio-t vagy az Xcode-ot.
:::

## Környezeti változók

| Változó | Leírás |
|----------|-------------|
| `STAGE` | Környezet szintje (pl. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Gyökér URL a tartalomkézbesítéshez |
| `MEMBERSHIP_API` | Tagsági API végpont |
| `MESSAGING_API` | Üzenetküldési API végpont |
| `ATTENDANCE_API` | Részvételi API végpont |
| `GIVING_API` | Adakozási API végpont |
| `DOING_API` | Feladatkezelési (Doing) API végpont |
| `CONTENT_API` | Tartalmi API végpont |
| `LESSONS_ROOT` | Gyökér URL a leckék tartalmához |

## Fontos parancsok

| Parancs | Leírás |
|---------|-------------|
| `npm start` | Expo fejlesztői kiszolgáló indítása |
| `npm run android` | Futtatás Android emulátoron |
| `npm run ios` | Futtatás iOS szimulátoron |
| `npm run test` | Tesztek futtatása (Jest) |

## Éles buildek

Éles build létrehozása előtt frissítse a verziószámokat az alábbi fájlokban:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Ehhez az EAS Build-et használja az Android bináris fájl létrehozásához.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA frissítések

Ha over-the-air (OTA) frissítést szeretne közzétenni (áruházi felülvizsgálat nélkül):

```bash
npm run update:production
```

:::info
Az OTA frissítések ideálisak kizárólag JavaScript-változásokhoz. Ha natív kódot vagy függőségeket módosít, helyette teljes áruházi buildet kell beküldenie.
:::

## Kapcsolódó cikkek

- **[Mobilalkalmazás telepítése](../deployment/mobile)** -- Teljes útmutató a mobilalkalmazások építéséhez, beküldéséhez és telepítéséhez
- **[Környezeti változók](../setup/environment-variables)** -- A mobilalkalmazás környezeti beállításainak teljes referenciája
