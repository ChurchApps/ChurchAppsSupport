---
title: "Konfiguracja lokalnego API"
description: "Uruchom API ChurchApps lokalnie: sklonuj repozytorium, skonfiguruj sześć baz MySQL modułów, zainicjuj schemat i uruchom serwer dev z przeładowaniem."
---

# Konfiguracja lokalnego API

<div class="article-intro">

Ten przewodnik przeprowadzi Cię przez konfigurację API ChurchApps do lokalnego programowania. Sklonujesz repozytorium, skonfigurujesz połączenia z bazami danych, zainicjalizujesz schemat i uruchomisz serwer deweloperski z automatycznym przeładowaniem.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **Node.js 24+**, **Git** i **MySQL 8.0+** -- zobacz [Wymagania wstępne](../setup/prerequisites.md)
- Utwórz użytkownika MySQL z uprawnieniami do tworzenia baz danych
- Zapoznaj się z dokumentacją [Zmienne środowiskowe](../setup/environment-variables.md) dotyczącą konfiguracji API

</div>

## Konfiguracja krok po kroku

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Zainstaluj zależności

Projekt korzysta z Yarn (blokada uniemożliwia użycie `npm install`):

```bash
cd Api
yarn install
```

### 3. Skonfiguruj zmienne środowiskowe

```bash
cp .env.sample .env
```

Otwórz plik `.env` i skonfiguruj ciągi połączeń z MySQL. Każdy moduł potrzebuje własnego połączenia z bazą danych w następującym formacie:

```
mysql://root:password@localhost:3306/dbname
```

Będziesz potrzebować ciągów połączeń dla wszystkich sześciu baz danych modułów (membership, attendance, content, giving, messaging, doing).

### 4. Zainicjalizuj bazy danych

```bash
npm run initdb
```

To polecenie automatycznie tworzy wszystkie sześć baz danych wraz z ich tabelami.

:::tip
Możesz zainicjalizować bazę danych pojedynczego modułu poleceniem `npm run initdb -- --module=membership` (lub `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Uruchom serwer deweloperski

```bash
npm run dev
```

API uruchamia się z automatycznym przeładowaniem pod adresem [http://localhost:8084](http://localhost:8084).

## Najważniejsze polecenia

| Polecenie | Opis |
|---------|-------------|
| `npm run dev` | Uruchamia serwer deweloperski z automatycznym przeładowaniem (tsx watch) |
| `npm run build` | Czyści katalog, kompiluje TypeScript i kopiuje zasoby |
| `npm run test` | Uruchamia testy w Jest (wraz z raportem pokrycia) |
| `npm run test:watch` | Uruchamia testy w trybie obserwowania zmian |
| `npm run lint` | Uruchamia ESLint z automatyczną poprawą (ESLint jest jedynym narzędziem do formatowania) |

## Wdrażanie

Środowisko staging zostało wycofane. API wdraża się do środowiska demonstracyjnego przy każdym wypchnięciu zmian do `main`, a na produkcję poprzez ręczny workflow **Deploy Prod**, który dodatkowo stosuje oczekujące migracje bazy danych. Szczegóły znajdziesz w artykule [Wdrażanie API](../deployment/apis.md).

## Lokalny rozwój bibliotek

Jeśli potrzebujesz rozwijać wspólną bibliotekę (`@churchapps/helpers` lub `@churchapps/apihelper`) razem z API, zbuduj ją w przestrzeni roboczej [Packages](https://github.com/ChurchApps/Packages) i dodaj tymczasowy portal Yarn w API:

```bash
# W przestrzeni roboczej Packages
yarn build

# W katalogu API
yarn link ../Packages/helpers
# ... testy ...
yarn unlink ../Packages/helpers && yarn install
```

Dzięki temu możesz testować zmiany w bibliotece w połączeniu z API bez publikowania ich w npm. Szczegóły znajdziesz w artykule [Biblioteki współdzielone](../shared-libraries/index.md#local-development-against-a-consuming-app) -- i nigdy nie commituj rozwiązania portalu zapisanego w `package.json` przez polecenie link.

## Powiązane artykuły

- **[Baza danych](./database.md)** -- Zrozumienie architektury z bazą danych dla każdego modułu
- **[Struktura modułu](./module-structure.md)** -- Jak zorganizowane są kontrolery, repozytoria i modele
- **[Biblioteki współdzielone](../shared-libraries/index.md)** -- Praca z `@churchapps/helpers` i `@churchapps/apihelper`
