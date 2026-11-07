---
title: "Nasazení mobilní aplikace"
description: "Postup sestavení verzí Android a iOS aplikace B1 Mobile pomocí Expo EAS, jejich odeslání do obchodů s aplikacemi a nahrání OTA aktualizací."
---

# Nasazení mobilní aplikace

<div class="article-intro">

Mobilní aplikace ChurchApps se sestavují a nasazují pomocí **Expo EAS Build** a distribuují se přes obchody s aplikacemi. Tato stránka popisuje sestavení, odeslání a nasazení aktualizací přes vzduch (OTA) pro Android i iOS.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte mobilní aplikaci lokálně – viz [B1 Mobile](../mobile/b1-mobile.md)
- Nainstalujte a nakonfigurujte [EAS CLI](https://docs.expo.dev/eas/)
- Mějte přístup ke Google Play Console (Android) a/nebo Apple App Store Connect (iOS)

</div>

## Sestavení

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Odeslání do obchodů s aplikacemi

### Android – Google Play Store

Po úspěšném sestavení EAS se binární soubor pro Android (AAB) odešle do Google Play Store prostřednictvím Play Console.

### iOS – Apple App Store

Sestavení pro iOS odešlete přímo přes EAS:

```bash
eas submit --platform ios
```

## Aktualizace OTA

U změn pouze v JavaScriptu, které nevyžadují schválení v obchodě s aplikacemi, použijte aktualizace přes vzduch (OTA):

```bash
npm run update:production
```

Tím EAS Update odešle změny přímo uživatelům bez úplného odeslání do obchodu.

:::tip
Aktualizace OTA jsou výrazně rychlejší než sestavení pro obchody – změny se mohou k uživatelům dostat během několika minut místo dnů. Používejte je pro opravy chyb, změny textů a drobné úpravy uživatelského rozhraní, které nezasahují do nativního kódu.
:::

## Čísla verzí

Před vytvořením sestavení pro obchod je nutné aktualizovat čísla verzí v několika souborech:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Pokud nezaktualizujete čísla verzí ve všech souborech, sestavení selže nebo aplikaci obchod zamítne. Před zahájením produkčního sestavení si každý výše uvedený soubor pečlivě zkontrolujte.
:::

## Související články

- **[B1 Mobile](../mobile/b1-mobile.md)** – Průvodce místním nastavením a vývojem
- **[Nasazení API](./apis.md)** – Nasazení backendových API
- **[Nasazení webových aplikací](./web-apps.md)** – Nasazení frontendových webových aplikací
