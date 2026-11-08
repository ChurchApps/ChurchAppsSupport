---
title: "Wdrażanie aplikacji mobilnych"
description: "Przewodnik po budowaniu wersji Android i iOS aplikacji Expo, takich jak B1 Checkin, przesyłaniu ich do sklepów z aplikacjami oraz wysyłaniu aktualizacji OTA za pomocą EAS."
---

# Wdrażanie aplikacji mobilnych

<div class="article-intro">

Aplikacje mobilne ChurchApps oparte na Expo, takie jak B1 Checkin, są budowane za pomocą **Expo EAS Build** lub lokalnego budowania Gradle i dystrybuowane przez sklepy z aplikacjami. Ta strona opisuje budowanie, przesyłanie i wysyłanie aktualizacji OTA (over-the-air) dla systemów Android i iOS na przykładzie B1 Checkin.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj aplikację lokalnie -- zobacz [Aplikacje mobilne](../mobile/index.md#local-setup)
- Zainstaluj i skonfiguruj [EAS CLI](https://docs.expo.dev/eas/)
- Upewnij się, że masz dostęp do Google Play Console (Android) i/lub Apple App Store Connect (iOS)

</div>

## Budowanie

### Android

Wersje release dla Androida są budowane lokalnie i podpisywane kluczem release pobranym z EAS. Pobierz go raz za pomocą polecenia `npx eas-cli credentials -p android` (wybierz **credentials.json: Download credentials from EAS**), a następnie uruchom:

```bash
yarn build:android
```

Pakiet Google Play zostanie zapisany w `android/app/build/outputs/bundle/release/app-release.aab`. Aby zamiast tego zbudować aplikację w EAS, uruchom `yarn build:android:eas`.

### iOS

Wersje iOS są zawsze budowane w EAS:

```bash
yarn build:ios
```

## Przesyłanie do sklepów z aplikacjami

### Android -- Sklep Google Play

Prześlij plik AAB przez Play Console lub wyślij go za pomocą EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Prześlij wersję iOS bezpośrednio przez EAS:

```bash
eas submit --platform ios
```

## Aktualizacje OTA

W przypadku zmian dotyczących wyłącznie JavaScriptu, które nie wymagają weryfikacji w sklepie z aplikacjami, skorzystaj z aktualizacji OTA (over-the-air):

```bash
yarn update
```

Polecenie to wykorzystuje EAS Update, aby wysłać zmiany bezpośrednio do użytkowników, bez pełnego przesyłania do sklepu.

:::tip
Aktualizacje OTA są znacznie szybsze niż wersje sklepowe -- zmiany mogą dotrzeć do użytkowników w ciągu minut, a nie dni. Używaj ich do poprawek błędów, zmian tekstów i drobnych zmian w interfejsie, które nie obejmują kodu natywnego.
:::

## Numery wersji

Przed utworzeniem wersji sklepowej należy zaktualizować numery wersji w kilku plikach:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` i `versionCode`)

Numer kompilacji iOS jest zwiększany automatycznie przez EAS.

:::warning
Pominięcie aktualizacji numerów wersji we wszystkich plikach spowoduje błędy budowania lub odrzucenie aplikacji przez sklep. Przed rozpoczęciem produkcyjnego budowania dokładnie sprawdź każdy z wymienionych powyżej plików.
:::

## Powiązane artykuły

- **[Aplikacje mobilne](../mobile/index.md)** -- Lokalna konfiguracja i przewodnik po programowaniu
- **[Wdrażanie API](./apis.md)** -- Wdrażanie backendowych API
- **[Wdrażanie aplikacji webowych](./web-apps.md)** -- Wdrażanie frontendowych aplikacji webowych
