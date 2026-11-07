---
title: "Nasazení mobilní aplikace"
---

# Nasazení mobilní aplikace

<div class="article-intro">

Mobilní aplikace ChurchApps se sestavují a nasazují pomocí **Expo EAS Build** a distribuují se přes obchody s aplikacemi. Tato stránka popisuje sestavení, odeslání a nasazení aktualizací OTA (over-the-air) pro Android i iOS.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte mobilní aplikaci lokálně – viz [B1 Mobile](../mobile/b1-mobile)
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

U změn pouze v JavaScriptu, které nevyžadují kontrolu v obchodě s aplikacemi, použijte aktualizace over-the-air (OTA):

```bash
npm run update:production
```

Tento postup používá EAS Update k odeslání změn přímo uživatelům bez úplného odeslání do obchodu.

:::tip
Aktualizace OTA jsou výrazně rychlejší než sestavení pro obchody – změny se mohou k uživatelům dostat během několika minut místo dnů. Používejte je pro opravy chyb, úpravy textů a drobné změny uživatelského rozhraní, které nezasahují do nativního kódu.
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

- **[B1 Mobile](../mobile/b1-mobile)** – Průvodce lokálním nastavením a vývojem
- **[Nasazení API](./apis)** – Nasazení backendových API
- **[Nasazení webových aplikací](./web-apps)** – Nasazení frontendových webových aplikací
