---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile to główna aplikacja mobilna ChurchApps przeznaczona dla członków wspólnoty, zbudowana w oparciu o React Native i Expo. Pozwala członkom kościoła przeglądać katalog, korzystać z opcji darowizn, sprawdzać obecność, otrzymywać powiadomienia i uczestniczyć w życiu swojej wspólnoty.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **Node.js** oraz **Expo CLI** -- zobacz [Wymagania wstępne](../setup/prerequisites)
- Zainstaluj **Android Studio** (dla emulatora Android) lub **Xcode** (dla symulatora iOS)
- Skonfiguruj docelowe API (demo lub lokalne) -- zobacz [Zmienne środowiskowe](../setup/environment-variables)

</div>

## Konfiguracja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Zainstaluj zależności:

   ```bash
   cd B1Mobile && npm install
   ```

3. Skonfiguruj zmienne środowiskowe -- skopiuj plik przykładowy i zaktualizuj adresy API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Uruchom serwer deweloperski Expo:

   ```bash
   npm start
   ```

:::tip
Do szybkiego testowania bez konfigurowania Android Studio lub Xcode możesz użyć aplikacji **Expo Go** na urządzeniu fizycznym.
:::

## Zmienne środowiskowe

| Zmienna | Opis |
|----------|-------------|
| `STAGE` | Etap środowiska (np. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Główny adres URL do dostarczania treści |
| `MEMBERSHIP_API` | Punkt końcowy API członkostwa |
| `MESSAGING_API` | Punkt końcowy API wiadomości |
| `ATTENDANCE_API` | Punkt końcowy API obecności |
| `GIVING_API` | Punkt końcowy API darowizn |
| `DOING_API` | Punkt końcowy API zadań |
| `CONTENT_API` | Punkt końcowy API treści |
| `LESSONS_ROOT` | Główny adres URL treści lekcji |

## Najważniejsze polecenia

| Polecenie | Opis |
|---------|-------------|
| `npm start` | Uruchom serwer deweloperski Expo |
| `npm run android` | Uruchom w emulatorze Android |
| `npm run ios` | Uruchom w symulatorze iOS |
| `npm run test` | Uruchom testy (Jest) |

## Kompilacje produkcyjne

Przed utworzeniem kompilacji produkcyjnej zaktualizuj numery wersji we wszystkich poniższych plikach:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Do utworzenia pliku binarnego dla Androida używane jest narzędzie EAS Build.

### iOS

```bash
eas build --platform ios --profile production
```

### Aktualizacje OTA

Aby opublikować aktualizację over-the-air (bez przechodzenia przez weryfikację w sklepie z aplikacjami):

```bash
npm run update:production
```

:::info
Aktualizacje OTA idealnie nadają się do zmian dotyczących wyłącznie JavaScriptu. Jeśli modyfikujesz kod natywny lub zależności, musisz zamiast tego przesłać pełną kompilację do sklepu.
:::

## Powiązane artykuły

- **[Wdrażanie aplikacji mobilnej](../deployment/mobile)** -- Pełny przewodnik po budowaniu, przesyłaniu i wdrażaniu aplikacji mobilnych
- **[Zmienne środowiskowe](../setup/environment-variables)** -- Kompletne omówienie konfiguracji środowiska mobilnego
