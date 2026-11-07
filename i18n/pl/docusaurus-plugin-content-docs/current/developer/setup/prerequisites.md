---
title: "Wymagania wstępne"
---

# Wymagania wstępne

<div class="article-intro">

Potrzebne narzędzia zależą od tego, nad którymi projektami planujesz pracować. Ta strona zawiera listę całego wymaganego oprogramowania, uporządkowaną według obszarów programistycznych – od wymagań ogólnych po specyficzne zestawy narzędzi dla poszczególnych platform.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zapoznaj się z [Przeglądem projektów](./project-overview), aby ustalić, nad którymi projektami chcesz pracować
- Na komputerze deweloperskim potrzebujesz uprawnień administratora do instalacji oprogramowania

</div>

## Wszystkie projekty

Są one wymagane niezależnie od tego, nad którym projektem pracujesz:

| Narzędzie | Wersja | Uwagi |
|------|---------|-------|
| **Node.js** | 20+ | Wersja 22+ wymagana dla B1App i LessonsApp (Next.js 16); 24+ wymagana dla Api |
| **npm** | Dołączony do Node.js | Używany jako menedżer pakietów we wszystkich projektach |
| **Git** | Najnowsza | Każdy projekt jest oddzielnym repozytorium |

:::tip
Aby łatwo przełączać się między wersjami Node, użyj menedżera wersji, takiego jak [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) lub [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Rozwój API backendu

Jeśli planujesz uruchamiać API lokalnie (zamiast korzystać z demonstracyjnych API):

| Narzędzie | Wersja | Uwagi |
|------|---------|-------|
| **MySQL** | 8.0+ | Każdy moduł API korzysta z własnej bazy danych |

Do działania podstawowego API potrzebujesz sześciu baz danych: `membership`, `attendance`, `content`, `giving`, `messaging` i `doing`. API zawiera skrypty inicjalizujące schemat – zobacz przewodnik [Lokalna konfiguracja API](../api/local-setup).

## Rozwój aplikacji mobilnych

Dla B1Mobile, B1Checkin, LessonsScreen lub innych aplikacji React Native / Expo:

| Narzędzie | Wersja | Uwagi |
|------|---------|-------|
| **Expo CLI** | Najnowsza | Instalacja globalna: `npm install -g expo-cli` |
| **Android Studio** | Najnowsza | Wymagane do tworzenia aplikacji na Androida (zawiera Android SDK) |
| **Xcode** | Najnowsza | Wymagane do tworzenia aplikacji na iOS (tylko macOS) |

:::info
Do szybkiego testowania na fizycznym urządzeniu możesz użyć aplikacji Expo Go, bez Android Studio i Xcode. Jednak budowanie wersji produkcyjnych wymaga natywnych zestawów narzędzi.
:::

## Rozwój FreeShow (aplikacja desktopowa)

FreeShow wymaga dodatkowych zależności do budowania natywnego, ponieważ kompiluje natywne moduły Node (takie jak `canvas`):

### Wszystkie platformy

| Narzędzie | Wersja | Uwagi |
|------|---------|-------|
| **Python** | 3.12 | Wymagany przez `node-gyp` do kompilacji modułów natywnych |
| **setuptools** | Najnowsza | Instalacja przez `pip install setuptools` |

### Windows

| Narzędzie | Uwagi |
|------|-------|
| **Visual Studio** | Wystarczy edycja Community |
| **Obciążenie „Tworzenie aplikacji pulpitu za pomocą C++”** | Wybierz podczas instalacji Visual Studio |
| **Windows 10 SDK** | Zawarte w obciążeniu C++; upewnij się, że jest zaznaczone |

Narzędzia do budowania Visual Studio możesz zainstalować z wiersza poleceń:

```bash
npm install --global windows-build-tools
```

Możesz też zainstalować Visual Studio Community i wybrać podczas instalacji obciążenie „Tworzenie aplikacji pulpitu za pomocą C++”.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Zazwyczaj wystarczają narzędzia wiersza poleceń Xcode:

```bash
xcode-select --install
```

## Weryfikacja instalacji

Uruchom te polecenia, aby potwierdzić, że wszystko jest zainstalowane:

```bash
node --version    # Powinno wyświetlić v20.x.x lub wyższą
npm --version     # Powinno wyświetlić 10.x.x lub wyższą
git --version     # Powinno wyświetlić git version 2.x.x
mysql --version   # Potrzebne tylko do lokalnego rozwoju API
```

## Kolejne kroki

- **[Przegląd projektów](./project-overview)** -- Zobacz wszystkie projekty i ich zastosowanie
- **[Zmienne środowiskowe](./environment-variables)** -- Skonfiguruj pliki `.env`
