---
title: "Dokumentacja dla deweloperów"
---

# Dokumentacja dla deweloperów

<div class="article-intro">

ChurchApps to zbiór około 20 projektów open source, które razem tworzą kompletną platformę do zarządzania kościołem. Projekty obejmują interfejsy API po stronie serwera, aplikacje internetowe, aplikacje mobilne, aplikację desktopową oraz biblioteki współdzielone — wszystkie napisane w TypeScripcie. Ta sekcja zawiera wszystko, czego potrzebujesz, aby skonfigurować lokalne środowisko programistyczne i zacząć wnosić wkład do projektu.

</div>

## Architektura w skrócie

Projekty są **niezależnymi repozytoriami** (a nie monorepo). Wspólny kod jest publikowany w npm w zakresie `@churchapps/*` i używany jako zwykłe zależności. Dzięki temu możesz pracować nad pojedynczym projektem bez klonowania całego ekosystemu.

Najważniejsze cechy:

- **Język:** TypeScript w całym projekcie
- **Backend:** API oparte na Node.js / Express, wdrażane w AWS Lambda za pomocą Serverless Framework
- **Web:** React 19 (Vite i Next.js), Material-UI 7
- **Mobile:** React Native z Expo
- **Baza danych:** MySQL 8.0, jedna baza danych na moduł API

## Czego dotyczy ta sekcja

- **[Konfiguracja](setup/)** -- Lokalne środowisko programistyczne, wymagania wstępne i konfiguracja
  - [Wymagania wstępne](setup/prerequisites) -- Wymagane narzędzia i oprogramowanie
  - [Przegląd projektów](setup/project-overview) -- Wszystkie projekty w skrócie
  - [Zmienne środowiskowe](setup/environment-variables) -- Konfiguracja plików `.env`
- **[API](api/)** -- Lokalna konfiguracja głównego API, inicjalizacja bazy danych i struktura modułów
- **[Aplikacje internetowe](web-apps/)** -- Uruchamianie B1Admin, B1App i LessonsApp lokalnie
- **[Aplikacje mobilne](mobile/)** -- Budowanie B1Mobile i innych aplikacji Expo
- **[Biblioteki współdzielone](shared-libraries/)** -- Praca z Helpers, ApiHelper i AppHelper
- **[Wdrażanie](deployment/)** -- Wdrażanie API, aplikacji internetowych i mobilnych
- **[Dostawca treści FreePlay](freeplay-content-provider)** -- Integracja Twojej biblioteki lekcji z FreePlay

## Społeczność i zasoby

| Zasób | Link |
|----------|------|
| Organizacja na GitHubie | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Zgłoszenia problemów | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Społeczność na Slacku | [Dołącz do Slacka](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Najszybszym sposobem na rozpoczęcie współpracy jest wybranie aplikacji internetowej (na przykład B1Admin), podłączenie jej do wspólnych **demonstracyjnych API** i rozpoczęcie wprowadzania zmian w warstwie frontendowej. Nie jest wymagana żadna baza danych ani konfiguracja API.
:::
