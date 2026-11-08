---
title: "Dokumentacja deweloperska"
description: "Znajdź drogę w dokumentacji deweloperskiej ChurchApps: lokalna konfiguracja, przewodniki po API i aplikacjach webowych, wspólne biblioteki, budowanie aplikacji mobilnych i wdrażanie projektów open-source."
---

# Dokumentacja deweloperska

<div class="article-intro">

ChurchApps to zbiór około 20 projektów open-source, które razem tworzą kompletną platformę do zarządzania kościołem. Projekty obejmują interfejsy API backendu, aplikacje webowe, aplikacje mobilne, aplikację desktopową oraz wspólne biblioteki -- wszystkie napisane w TypeScript. Ta sekcja zawiera wszystko, czego potrzebujesz, aby skonfigurować lokalne środowisko programistyczne i zacząć wnosić wkład w projekt.

</div>

## Architektura w skrócie

Projekty są **niezależnymi repozytoriami** (a nie monorepo). Wspólny kod jest publikowany w npm w zakresie `@churchapps/*` i używany jako zwykłe zależności. Oznacza to, że możesz pracować nad pojedynczym projektem bez klonowania całego ekosystemu.

Kluczowe cechy:

- **Język:** TypeScript w całym projekcie
- **Backend:** API oparte na Node.js / Express, wdrażane na AWS Lambda za pomocą Serverless Framework
- **Web:** React 19 (Vite i Next.js), Material-UI 7
- **Mobile:** React Native z Expo
- **Baza danych:** MySQL 8.0, jedna baza danych na moduł API

## Czego dotyczy ta sekcja

- **[Konfiguracja](./setup/index.md)** -- Lokalne środowisko programistyczne, wymagania wstępne i konfiguracja
  - [Wymagania wstępne](./setup/prerequisites.md) -- Wymagane narzędzia i oprogramowanie
  - [Przegląd projektu](./setup/project-overview.md) -- Wszystkie projekty w skrócie
  - [Zmienne środowiskowe](./setup/environment-variables.md) -- Konfiguracja plików `.env`
- **[API](./api/index.md)** -- Lokalna konfiguracja głównego API, inicjalizacja bazy danych i struktura modułów
- **[Aplikacje webowe](./web-apps/index.md)** -- Uruchamianie B1Admin, B1App i LessonsApp lokalnie
- **[Aplikacje mobilne](./mobile/index.md)** -- Budowanie B1Checkin i innych aplikacji Expo
- **[Wspólne biblioteki](./shared-libraries/index.md)** -- Praca z Helpers, ApiHelper i AppHelper
- **[Wdrażanie](./deployment/index.md)** -- Wdrażanie API, aplikacji webowych i mobilnych
- **[Dostawca treści FreePlay](./freeplay-content-provider.md)** -- Integracja Twojej biblioteki lekcji z FreePlay

## Społeczność i zasoby

| Zasób | Link |
|----------|------|
| Organizacja GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Zgłoszenia problemów | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Społeczność na Slacku | [Dołącz do Slacka](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Najszybszy sposób na rozpoczęcie współpracy to wybranie aplikacji webowej (np. B1Admin), podłączenie jej do wspólnych **demonstracyjnych API** i rozpoczęcie wprowadzania zmian we frontendzie. Nie jest wymagana żadna konfiguracja bazy danych ani API.
:::
