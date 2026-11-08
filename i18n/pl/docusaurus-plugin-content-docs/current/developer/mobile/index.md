---
title: "Mobilne aplikacje"
description: "Przegląd aplikacji mobilnych ChurchApps opartych na Expo i React Native: B1 Checkin oraz LessonsScreen, wraz z lokalną konfiguracją wspólnego zestawu narzędzi Expo."
---

# Mobilne aplikacje

<div class="article-intro">

Mobilne aplikacje ChurchApps są zbudowane w oparciu o **React Native** i **Expo**, zapewniając natywne doświadczenie na systemach Android, iOS i Android TV. Wszystkie aplikacje mobilne korzystają z tego samego zestawu narzędzi opartego na Expo, więc jeśli potrafisz zbudować jedną z nich, poradzisz sobie ze wszystkimi.

</div>

## Aplikacje

| Aplikacja | Przeznaczenie | Platforma |
|-----|---------|----------|
| B1 Checkin | Aplikacja kioskowa dla stanowisk zameldowania | Android, iOS |
| LessonsScreen | Aplikacja na Android TV do wyświetlania lekcji w salach | Android TV |

:::info
Aplikacją dla członków jest B1 App -- sekcja `/mobile` w B1App, którą członkowie instalują jako Progressive Web App. Jest to aplikacja internetowa, a nie projekt Expo; aby uruchomić ją lokalnie, zobacz [Aplikacje internetowe](../web-apps/index.md).
:::

### B1 Checkin

Aplikacja kioskowa stworzona z myślą o stanowiskach zameldowania w kościołach. Zapewnia prosty, przyjazny dotykowi interfejs, dzięki któremu członkowie mogą zameldować dzieci i rejestrować obecność na nabożeństwach i wydarzeniach.

### LessonsScreen

Aplikacja na Android TV, która wyświetla treści lekcji w salach. Nauczyciele mogą przesyłać slajdy z lekcjami, filmy i ćwiczenia na ekran telewizora, co ułatwia prezentowanie materiału programowego podczas zajęć.

## Konfiguracja lokalna

Wszystkie aplikacje mobilne korzystają z tego samego zestawu narzędzi opartego na Expo i mają podobne schematy konfiguracji. Na przykładzie B1 Checkin:

1. Zainstaluj **Node.js**, Android Studio (dla emulatora Androida) oraz Xcode (dla symulatora iOS, tylko na macOS) -- zobacz [Wymagania wstępne](../setup/prerequisites.md).
2. Sklonuj repozytorium i zainstaluj zależności (B1 Checkin używa Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Skopiuj `dotenv.sample.txt` do `.env` i ustaw środowisko, z którym aplikacja ma się łączyć (`dev` dla lokalnego API) -- zobacz [Zmienne środowiskowe](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Uruchom serwer deweloperski Expo poleceniem `yarn start`, a następnie wykonaj `yarn android` lub `yarn ios`, aby uruchomić aplikację na emulatorze lub urządzeniu.

Informacje o wersjach produkcyjnych i aktualizacjach over-the-air znajdziesz w [Wdrażanie aplikacji mobilnych](../deployment/mobile.md).
