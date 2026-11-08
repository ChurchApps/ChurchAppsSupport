---
title: "Објављивање мобилних апликација"
description: "Водич кроз израду Android и iOS издања Expo апликација, као што је B1 Checkin, слање у продавнице апликација и објављивање OTA ажурирања помоћу EAS-а."
---

# Објављивање мобилних апликација

<div class="article-intro">

ChurchApps-ове Expo мобилне апликације, као што је B1 Checkin, граде се помоћу **Expo EAS Build** или локалне Gradle изградње и дистрибуирају кроз продавнице апликација. Ова страница описује изградњу, слање и објављивање ажурирања путем ваздуха (OTA) за Android и iOS, на примеру апликације B1 Checkin.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Поставите апликацију локално -- погледајте [Мобилне апликације](../mobile/index.md#local-setup)
- Инсталирајте и подесите [EAS CLI](https://docs.expo.dev/eas/)
- Имајте приступ Google Play Console-у (Android) и/или Apple App Store Connect-у (iOS)

</div>

## Изградња

### Android

Android издања се граде локално и потписују release keystore-ом из EAS-а. Преузмите га једном помоћу `npx eas-cli credentials -p android` (изаберите **credentials.json: Download credentials from EAS**), а затим покрените:

```bash
yarn build:android
```

Google Play пакет се упisuje у `android/app/build/outputs/bundle/release/app-release.aab`. Да бисте уместо тога градили на EAS-у, покрените `yarn build:android:eas`.

### iOS

iOS изградње се увек извршавају на EAS-у:

```bash
yarn build:ios
```

## Слање у продавнице апликација

### Android -- Google Play Store

Отпремите AAB фајл кроз Play Console или га пошаљите помоћу EAS-а:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Пошаљите iOS изградњу директно преко EAS-а:

```bash
eas submit --platform ios
```

## OTA ажурирања

За измене само у JavaScript-у које не захтевају преглед у продавници апликација, користите ажурирања путем ваздуха (OTA):

```bash
yarn update
```

Ово користи EAS Update за слање измена корисницима директно, без слања кроз целу продавницу апликација.

:::tip
OTA ажурирања су знатно бржа од издања у продавницама -- измене могу стићи до корисника за неколико минута, а не за неколико дана. Користите их за исправке грешака, измене текста и мање измене корисничког интерфејса које не укључују измене нативног кода.
:::

## Бројеви верзија

Пре креирања издања за продавницу, бројеве верзија треба ажурирати у више фајлова:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` и `versionCode`)

Број iOS изградње аутоматски повећава EAS.

:::warning
Заборављање ажурирања бројева верзија у свим фајловима ће довести до грешака у изградњи или одбијања у продавници апликација. Двапут проверите сваки фајл наведен изнад пре покретања производне изградње.
:::

## Повезани чланци

- **[Мобилне апликације](../mobile/index.md)** -- Локални водич за подешавање и развој
- **[Објављивање API-ја](./apis.md)** -- Постављање серверских API-ја
- **[Објављивање веб апликација](./web-apps.md)** -- Постављање frontend веб апликација
