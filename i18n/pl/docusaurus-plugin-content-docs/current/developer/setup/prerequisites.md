---
title: "Wymagania wstępne"
description: "Skonfiguruj Node.js, npm, Git i narzędzia dla poszczególnych platform przed pracą nad projektami ChurchApps, takimi jak B1 Admin, Lessons.church, FreePlay lub API, lokalnie."
---

# Wymagania wstępne

<div class="article-intro">

Potrzebne narzędzia zależą od tego, nad którymi projektami planujesz pracować. Ta strona zawiera listę całego wymaganego oprogramowania, uporządkowaną według obszarów programistycznych: od wymagań uniwersalnych po narzędzia specyficzne dla danej platformy.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zapoznaj się z [Przeglądem projektów](./project-overview.md), aby ustalić, nad którymi projektami chcesz pracować
- Upewnij się, że masz uprawnienia administratora na swoim komputerze, aby móc instalować oprogramowanie

</div>

## Wszystkie projekty

Te narzędzia są wymagane niezależnie od tego, nad którym projektem pracujesz:

| Narzędzie | Wersja | Uwagi |
|-----------|--------|-------|
| **Node.js** | 20+ | Wersja 22+ wymagana dla B1App i LessonsApp (Next.js 16); 24+ wymagana dla Api |
| **npm** | Dołączony do Node.js | Używany jako menedżer pakietów we wszystkich projektach |
| **Git** | Najnowsza | Każdy projekt znajduje się w osobnym repozytorium |

:::tip
Aby łatwo przełączać się między wersjami Node, użyj menedżera wersji Node, takiego jak [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) lub [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Rozwój backendu API

Jeśli planujesz uruchamiać API lokalnie (zamiast korzystać z demonstracyjnych API):

| Narzędzie | Wersja | Uwagi |
|-----------|--------|-------|
| **MySQL** | 8.0+ | Każdy moduł API korzysta z własnej bazy danych |

Do działania podstawowego API potrzebujesz sześciu baz danych: `membership`, `attendance`, `content`, `giving`, `messaging` i `doing`. API zawiera skrypty inicjalizujące schemat -- zobacz przewodnik [Lokalna konfiguracja API](../api/local-setup.md).

## Rozwój aplikacji mobilnych

Dla B1Checkin, LessonsScreen lub innych aplikacji React Native / Expo:

| Narzędzie | Wersja | Uwagi |
|-----------|--------|-------|
| **Expo CLI** | Najnowsza | Instalacja globalna: `npm install -g expo-cli` |
| **Android Studio** | Najnowsza | Wymagane do tworzenia aplikacji na Androida (zawiera Android SDK) |
| **Xcode** | Najnowsza | Wymagane do tworzenia aplikacji na iOS (tylko macOS) |

:::info
Do szybkich testów na urządzeniu fizycznym możesz użyć aplikacji Expo Go, bez Android Studio i Xcode. Jednak budowanie produkcyjnych plików binarnych wymaga natywnych narzędzi.
:::

## Rozwój FreeShow (aplikacja desktopowa)

FreeShow wymaga dodatkowych zależności do kompilacji natywnej, ponieważ kompiluje natywne moduły Node (takie jak `canvas`):

### Wszystkie platformy

| Narzędzie | Wersja | Uwagi |
|-----------|--------|-------|
| **Python** | 3.12 | Wymagany przez `node-gyp` do kompilacji modułów natywnych |
| **setuptools** | Najnowsza | Instalacja przez `pip install setuptools` |

### Windows

| Narzędzie | Uwagi |
|-----------|-------|
| **Visual Studio** | Wystarczy wersja Community |
| **Obciążenie „Desktop development with C++”** | Wybierz podczas instalacji Visual Studio |
| **Windows 10 SDK** | Dołączony do obciążenia C++; upewnij się, że jest zaznaczony |

Narzędzia do kompilacji Visual Studio możesz zainstalować z wiersza poleceń:

```bash
npm install --global windows-build-tools
```

Możesz też zainstalować Visual Studio Community i podczas instalacji wybrać obciążenie „Desktop development with C++”.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Zazwyczaj wystarczają narzędzia wiersza poleceń Xcode:

```bash
xcode-select --install
```

## Sprawdź instalację

Uruchom te polecenia, aby upewnić się, że wszystko jest zainstalowane:

```bash
node --version    # Powinno wyświetlić v20.x.x lub wyższą
npm --version     # Powinno wyświetlić 10.x.x lub wyższą
git --version     # Powinno wyświetlić git version 2.x.x
mysql --version   # Potrzebne tylko do lokalnego rozwoju API
```

## Następne kroki

- **[Przegląd projektów](./project-overview.md)** -- Zobacz wszystkie projekty i ich funkcje
- **[Zmienne środowiskowe](./environment-variables.md)** -- Skonfiguruj swoje pliki `.env`
