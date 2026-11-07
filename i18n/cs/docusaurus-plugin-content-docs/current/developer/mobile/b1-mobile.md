---
title: "B1 Mobile"
description: "Spuštění aplikace B1 Mobile (React Native/Expo) lokálně, nastavení koncových bodů API a sestavení pro Android nebo iOS. Pozor: B1 Mobile je zastaralá."
---

# B1 Mobile

<div class="article-intro">

B1 Mobile je primární mobilní aplikace ChurchApps pro členy sboru, vytvořená pomocí React Native a Expo. Umožňuje členům církve prohlížet adresáře, přistupovat k darování, zaznamenávat účast, přijímat oznámení a zapojovat se do církevního společenství.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte **Node.js** a **Expo CLI** -- viz [Předpoklady](../setup/prerequisites.md)
- Nainstalujte **Android Studio** (pro emulátor Androidu) nebo **Xcode** (pro simulátor iOS)
- Nastavte cílové API (demo nebo lokální) -- viz [Proměnné prostředí](../setup/environment-variables.md)

</div>

## Nastavení

1. Naklonujte repozitář:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Nainstalujte závislosti:

   ```bash
   cd B1Mobile && npm install
   ```

3. Nastavte proměnné prostředí -- zkopírujte ukázkový soubor a upravte koncové body API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Spusťte vývojový server Expo:

   ```bash
   npm start
   ```

:::tip
Pro rychlé testování na fyzickém zařízení můžete použít aplikaci **Expo Go**, aniž byste museli nastavovat Android Studio nebo Xcode.
:::

## Proměnné prostředí

| Proměnná | Popis |
|----------|-------------|
| `STAGE` | Fáze prostředí (např. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Kořenová URL pro doručování obsahu |
| `MEMBERSHIP_API` | Koncový bod API členství |
| `MESSAGING_API` | Koncový bod API zpráv |
| `ATTENDANCE_API` | Koncový bod API účasti |
| `GIVING_API` | Koncový bod API darování |
| `DOING_API` | Koncový bod API úkolů |
| `CONTENT_API` | Koncový bod API obsahu |
| `LESSONS_ROOT` | Kořenová URL pro obsah lekcí |

## Klíčové příkazy

| Příkaz | Popis |
|---------|-------------|
| `npm start` | Spustí vývojový server Expo |
| `npm run android` | Spustí na emulátoru Androidu |
| `npm run ios` | Spustí na simulátoru iOS |
| `npm run test` | Spustí testy (Jest) |

## Produkční sestavení

Před vytvořením produkčního sestavení aktualizujte čísla verzí ve všech následujících souborech:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Tím se pomocí EAS Build vytvoří binární soubor pro Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Aktualizace OTA

Chcete-li nasadit aktualizaci přes vzduch (bez procesu kontroly v obchodě s aplikacemi):

```bash
npm run update:production
```

:::info
Aktualizace OTA jsou ideální pro změny pouze v JavaScriptu. Pokud upravíte nativní kód nebo závislosti, musíte místo toho odeslat kompletní sestavení do obchodu.
:::

## Související články

- **[Nasazení mobilní aplikace](../deployment/mobile.md)** -- Kompletní průvodce sestavením, odesláním a nasazením mobilních aplikací
- **[Proměnné prostředí](../setup/environment-variables.md)** -- Úplný přehled konfigurace prostředí pro mobilní aplikaci
