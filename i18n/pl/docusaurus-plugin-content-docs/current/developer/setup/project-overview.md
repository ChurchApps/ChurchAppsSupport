---
title: "Przegląd projektu"
description: "Mapa repozytoriów ChurchApps według kategorii: frameworki, porty, bazy danych i połączenia współdzielonych pakietów @churchapps."
---

# Przegląd projektu

<div class="article-intro">

ChurchApps składa się z około 20 niezależnych repozytoriów, z których każde jest publikowane w [organizacji ChurchApps na GitHubie](https://github.com/ChurchApps). Ta strona zawiera pełny spis wszystkich projektów pogrupowanych według kategorii, wraz z ich frameworkami, portami i powiązaniami.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj [wymagania wstępne](./prerequisites.md) dla kategorii projektów, nad którymi chcesz pracować

</div>

## Backendowe API

Wszystkie API są zbudowane w Node.js, Express i TypeScript i są wdrażane w AWS Lambda za pomocą Serverless Framework.

| Projekt | Przeznaczenie | Port deweloperski | Baza danych |
|---------|---------------|-------------------|-------------|
| **[Api](https://github.com/ChurchApps/Api)** | Główny modularny monolit obejmujący członkostwo, frekwencję, treści, dary, komunikację i zadania | 8084 | Oddzielna baza MySQL dla każdego modułu (łącznie 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend Lessons.church | -- | Pojedyncza baza MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Narzędzie do zapytań AI oparte na OpenAI | -- | -- |

:::info
Główny projekt **Api** jest modularnym monolitem. Każdy moduł (membership, attendance, content, giving, messaging, doing) ma własną bazę danych i jest dostępny pod podścieżką, na przykład `/membership` lub `/giving`. W środowisku produkcyjnym są one udostępniane jako osobne funkcje Lambda za API Gateway.
:::

## Aplikacje webowe

| Projekt | Framework | Port deweloperski | Przeznaczenie |
|---------|-----------|-------------------|---------------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Panel administracyjny kościoła |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Publiczna aplikacja dla członków kościoła |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Narzędzie do importu i eksportu danych |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statyczna | -- | Statyczne strony internetowe kościołów z materiałami informacyjnymi |

## Aplikacje mobilne

Wszystkie aplikacje mobilne korzystają z React Native z Expo.

| Projekt | Przeznaczenie | Kluczowe wersje |
|---------|---------------|-----------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Aplikacja dla członków kościoła na iOS i Androida | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplikacja kiosku do meldowania się | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Wyświetlacz lekcji na Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Odtwarzanie treści (w tym na systemach TV) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilny pilot do FreeShow | Expo |

## Aplikacje desktopowe

| Projekt | Stos technologiczny | Przeznaczenie |
|---------|---------------------|---------------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Oprogramowanie do prezentacji i nabożeństw |

## Biblioteki współdzielone

Współdzielony kod jest publikowany w npm w zakresie `@churchapps` i jest używany jako zwykłe zależności npm przez wyżej wymienione projekty. Wszystkie współdzielone pakiety znajdują się w jednym repozytorium -- [Packages](https://github.com/ChurchApps/Packages) -- zarządzanym jako workspace Yarn i wydawanym za pomocą changesets.

| Pakiet | Przeznaczenie | Używany przez |
|--------|---------------|---------------|
| `@churchapps/helpers` | Podstawowe narzędzia i współdzielone interfejsy TypeScript (DateHelper, ApiHelper, CurrencyHelper itd.) | Wszystkie projekty |
| `@churchapps/apihelper` | Narzędzia serwera Express (uwierzytelnianie, kontrolery bazowe, dostęp do bazy danych, integracje z AWS) | Wszystkie API |
| `@churchapps/apphelper` | Biblioteka komponentów React z podmodułami do logowania, darowizn, formularzy, markdown i tworzenia stron | Wszystkie aplikacje webowe |
| `@churchapps/content-providers` | Abstrakcja dostawców treści zewnętrznych (Lessons.church, Planning Center, Dropbox i inni) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Zestaw narzędzi integracyjnych B1.church: webhooki, klient REST, OAuth | Zewnętrzni twórcy integracji |
| `@churchapps/texting` | Abstrakcja dostawców SMS | Api |

Informacje o konfiguracji workspace i procesie wydawania znajdziesz w sekcji [Biblioteki współdzielone](../shared-libraries/index.md).

## Powiązania między projektami

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Wszystkie aplikacje frontendowe zależą od `@churchapps/helpers`. Aplikacje webowe dodatkowo zależą od pakietów `@churchapps/apphelper`. Wszystkie backendowe API zależą zarówno od `@churchapps/helpers`, jak i `@churchapps/apihelper`.

## Następne kroki

- **[Zmienne środowiskowe](./environment-variables.md)** -- Skonfiguruj pliki `.env`, aby połączyć się z API
- **[Lokalna konfiguracja API](../api/local-setup.md)** -- Skonfiguruj backendowe API lokalnie
