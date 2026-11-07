---
title: "B1 Mobile"
description: "Spustenie aplikácie B1 Mobile (React Native/Expo) lokálne, nastavenie API endpointov a zostavenie pre Android alebo iOS. Upozornenie: B1 Mobile je zastaraný."
---

# B1 Mobile

<div class="article-intro">

B1 Mobile je primárna mobilná aplikácia ChurchApps určená pre členov cirkvi, vytvorená pomocou React Native a Expo. Umožňuje členom cirkvi prezerať adresáre, využívať služby darovania, prihlasovať sa na účasť, prijímať upozornenia a zapájať sa do života cirkevnej komunity.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte **Node.js** a **Expo CLI** -- pozrite si [Prerequisites](../setup/prerequisites.md)
- Nainštalujte **Android Studio** (pre emulátor Androidu) alebo **Xcode** (pre simulátor iOS)
- Nakonfigurujte cieľ API (demo alebo lokálny) -- pozrite si [Environment Variables](../setup/environment-variables.md)

</div>

## Nastavenie

1. Naklonujte repozitár:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Nainštalujte závislosti:

   ```bash
   cd B1Mobile && npm install
   ```

3. Nakonfigurujte premenné prostredia -- skopírujte vzorový súbor a aktualizujte koncové body API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Spustite vývojový server Expo:

   ```bash
   npm start
   ```

:::tip
Na rýchle testovanie na fyzickom zariadení môžete použiť aplikáciu **Expo Go** bez nastavovania Android Studio alebo Xcode.
:::

## Premenné prostredia

| Premenná | Popis |
|----------|-------------|
| `STAGE` | Fáza prostredia (napr. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Koreňová URL adresa pre doručovanie obsahu |
| `MEMBERSHIP_API` | Koncový bod API členstva |
| `MESSAGING_API` | Koncový bod API správ |
| `ATTENDANCE_API` | Koncový bod API účasti |
| `GIVING_API` | Koncový bod API darovania |
| `DOING_API` | Koncový bod API úloh |
| `CONTENT_API` | Koncový bod API obsahu |
| `LESSONS_ROOT` | Koreňová URL adresa pre obsah lekcií |

## Kľúčové príkazy

| Príkaz | Popis |
|---------|-------------|
| `npm start` | Spustí vývojový server Expo |
| `npm run android` | Spustí na emulátore Androidu |
| `npm run ios` | Spustí na simulátore iOS |
| `npm run test` | Spustí testy (Jest) |

## Produkčné zostavenia

Pred vytvorením produkčného zostavenia aktualizujte čísla verzií vo všetkých týchto súboroch:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Týmto príkazom sa pomocou EAS Build vytvorí binárny súbor pre Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Aktualizácie OTA

Ak chcete nasadiť aktualizáciu cez vzduch (bez prechodu schválením v obchode s aplikáciami):

```bash
npm run update:production
```

:::info
Aktualizácie OTA sú ideálne pre zmeny iba v JavaScripte. Ak upravíte natívny kód alebo závislosti, musíte namiesto toho odoslať úplné zostavenie do obchodu.
:::

## Súvisiace články

- **[Mobile Deployment](../deployment/mobile.md)** -- Kompletný sprievodca zostavovaním, odosielaním a nasadzovaním mobilných aplikácií
- **[Environment Variables](../setup/environment-variables.md)** -- Úplný prehľad konfigurácie prostredia pre mobilnú aplikáciu
