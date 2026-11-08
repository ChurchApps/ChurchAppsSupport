---
title: "Nasazení mobilní aplikace"
description: "Popisuje sestavení verzí Androidu a iOS pro aplikace Expo, jako je B1 Checkin, jejich odeslání do obchodů s aplikacemi a nasazení aktualizací OTA pomocí EAS."
---

# Nasazení mobilní aplikace

<div class="article-intro">

Mobilní aplikace ChurchApps založené na Expo, například B1 Checkin, se sestavují pomocí **Expo EAS Build** nebo lokálního sestavení Gradle a distribuují se přes obchody s aplikacemi. Tato stránka popisuje sestavení, odeslání a nasazení aktualizací přes vzduch (OTA) pro Android i iOS na příkladu aplikace B1 Checkin.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte aplikaci lokálně – viz [Mobilní aplikace](../mobile/index.md#local-setup)
- Nainstalujte a nakonfigurujte [EAS CLI](https://docs.expo.dev/eas/)
- Mějte přístup do Google Play Console (Android) a/nebo Apple App Store Connect (iOS)

</div>

## Sestavení

### Android

Release verze pro Android se sestavují lokálně a podepisují se release klíčem z EAS. Stáhněte si jej jednou příkazem `npx eas-cli credentials -p android` (zvolte **credentials.json: Download credentials from EAS**) a poté spusťte:

```bash
yarn build:android
```

Balíček pro Google Play se zapíše do souboru `android/app/build/outputs/bundle/release/app-release.aab`. Chcete-li sestavení provést na EAS, spusťte `yarn build:android:eas`.

### iOS

Sestavení pro iOS se vždy provádějí na EAS:

```bash
yarn build:ios
```

## Odeslání do obchodů s aplikacemi

### Android – Google Play Store

Nahrajte soubor AAB přes Play Console, nebo jej odešlete pomocí EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS – Apple App Store

Sestavení pro iOS odešlete přímo přes EAS:

```bash
eas submit --platform ios
```

## Aktualizace OTA

U změn pouze v JavaScriptu, které nevyžadují kontrolu v obchodě s aplikacemi, použijte aktualizace přes vzduch (OTA):

```bash
yarn update
```

Tento příkaz pomocí EAS Update odešle změny přímo uživatelům bez úplného odeslání do obchodu.

:::tip
Aktualizace OTA jsou výrazně rychlejší než sestavení pro obchody – změny se mohou k uživatelům dostat během několika minut místo dnů. Používejte je pro opravy chyb, úpravy textů a drobné změny uživatelského rozhraní, které nezahrnují změny nativního kódu.
:::

## Čísla verzí

Před vytvořením sestavení pro obchod je nutné aktualizovat čísla verzí v několika souborech:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` a `versionCode`)

Číslo sestavení pro iOS zvyšuje EAS automaticky.

:::warning
Pokud zapomenete aktualizovat čísla verzí ve všech souborech, dojde k selhání sestavení nebo k zamítnutí aplikace v obchodě. Před zahájením produkčního sestavení si zkontrolujte každý výše uvedený soubor.
:::

## Související články

- **[Mobilní aplikace](../mobile/index.md)** – Průvodce lokálním nastavením a vývojem
- **[Nasazení API](./apis.md)** – Nasazení backendových API
- **[Nasazení webových aplikací](./web-apps.md)** – Nasazení frontendových webových aplikací
