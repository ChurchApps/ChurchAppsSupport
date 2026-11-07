---
title: "Baza danych"
---

# Baza danych

<div class="article-intro">

Interfejs API ChurchApps wykorzystuje architekturę **baza danych dla każdego modułu**. Każdy z sześciu modułów danych ma własną bazę MySQL z niezależną pulą połączeń, co zapewnia wyraźne granice danych i jednocześnie utrzymuje wszystko w ramach jednego wdrożenia.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **MySQL 8.0+** -- zobacz [Wymagania wstępne](../setup/prerequisites)
- Skonfiguruj ciągi połączenia z bazą danych w pliku `.env` -- zobacz [Zmienne środowiskowe](../setup/environment-variables)

</div>

## Przegląd architektury

```
Api
├── membership_db   ← Osoby, grupy, uprawnienia
├── attendance_db   ← Nabożeństwa, sesje, rekordy
├── content_db      ← Strony, sekcje, elementy
├── giving_db       ← Darowizny, fundusze, płatności
├── messaging_db    ← Rozmowy, powiadomienia
└── doing_db        ← Zadania, plany, przydziały
```

### Kluczowe decyzje projektowe

- **Jedna baza danych na moduł** -- Każdy moduł utrzymuje własną bazę MySQL z dedykowaną pulą połączeń (zarządzaną przez `KyselyPool`). Dzięki temu moduły są niezależne od siebie i mogą rozwijać schemat niezależnie.
- **Wyłączna własność** -- Tabele modułu są odczytywane i zapisywane wyłącznie przez kod tego modułu. Gdy inny moduł potrzebuje tych danych, wywołuje bramę (gateway) modułu będącego właścicielem, zamiast samodzielnie odpytywać jego tabele -- zobacz [Komunikacja między modułami](./module-structure#cross-module-communication).
- **Wzorzec repozytorium bez ORM** -- Ccały dostęp do danych odbywa się przez klasy repozytoriów, które budują typowane zapytania SQL za pomocą kreatora zapytań Kysely, opartego na schemacie modułu. Daje to pełną kontrolę nad wydajnością i zachowaniem zapytań.
- **Wielodostępność w fazie projektowania** -- Każde zapytanie jest ograniczone przez `churchId`. Wszystkie tabele zawierają kolumnę `churchId`, a warstwa repozytoriów automatycznie wymusza izolację danych między kościołami.

## Ciągi połączeń

Połączenie z bazą danych każdego modułu jest konfigurowane w pliku `.env` przy użyciu standardowego formatu ciągu połączenia MySQL:

```
mysql://user:password@host:port/database
```

Na przykład lokalna konfiguracja deweloperska może wyglądać następująco:

Każdy moduł odczytuje swoje połączenie ze zmiennej środowiskowej o nazwie `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
W środowisku produkcyjnym ciągi połączeń są przechowywane w AWS SSM Parameter Store i odczytywane przez klasę `Environment` podczas uruchamiania.
:::

## Skrypty schematu

Schematy tabel są zdefiniowane jako migracje Kysely w katalogu `tools/migrations/`, uporządkowane według modułów:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migracje definiują tworzenie tabel, indeksy i zmiany schematu. Katalog `tools/dbScripts/` zawiera dane demonstracyjne i startowe, które można załadować na istniejący schemat.

## Inicjalizacja bazy danych

### Inicjalizacja wszystkich baz danych

```bash
npm run initdb
```

Polecenie tworzy wszystkie sześć baz danych i uruchamia migracje dla każdej z nich.

### Inicjalizacja pojedynczego modułu

```bash
npm run initdb -- --module=membership
```

:::tip
Podczas pracy nad konkretnym modułem możesz ponownie zainicjalizować wyłącznie bazę danych tego modułu, bez wpływu na pozostałe.
:::

## Wzorzec dostępu do danych

Repozytoria budują zapytania za pomocą kreatora zapytań Kysely, opartego na typowanym schemacie bazy danych modułu, pobieranym przez funkcję `getDb()` tego modułu. Typowa metoda repozytorium wygląda następująco:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repozytoria uzyskuje się za pomocą `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Zawsze uwzględniaj `churchId` w zapytaniach, aby zachować izolację między kościołami. Nigdy nie wykonuj zapytań obejmujących dane wielu kościołów, chyba że masz do tego konkretny, autoryzowany powód.
:::

## Odwołania między modułami

Ponieważ dane każdego modułu znajdują się w osobnej bazie danych, nie istnieją klucze obce ani złączenia SQL między granicami modułów. Rekord powiązany z danymi innego modułu przechowuje identyfikator tamtego rekordu -- na przykład darowizna w bazie giving zawiera `personId` osoby z bazy membership -- a wszelkie łączenie danych z różnych modułów odbywa się w kodie aplikacji.

To ograniczenie sprawia, że granice modułów są rzeczywiste: każdy schemat może ewoluować niezależnie, baza danych modułu może zostać przeniesiona na własny serwer, a moduł może nawet zostać wydzielony jako samodzielna usługa bez rozplątywania wspólnych tabel i zapytań między bazami.

## Powiązane artykuły

- **[Struktura modułu](./module-structure)** -- Jak kontrolery i repozytoria są zorganizowane w każdym module
- **[Konfiguracja lokalnego API](./local-setup)** -- Pełny, krok po kroku przewodnik konfiguracji
