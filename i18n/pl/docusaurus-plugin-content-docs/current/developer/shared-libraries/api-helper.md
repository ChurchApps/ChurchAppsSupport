---
title: "ApiHelper"
description: "Opis pakietu @churchapps/apihelper używanego przez API ChurchApps na Express: budowanie lokalne, testowanie przez portal Yarn i publikacja z changesets."
---

# ApiHelper

<div class="article-intro">

Pakiet `@churchapps/apihelper` zawiera narzędzia po stronie serwera dla wszystkich interfejsów API ChurchApps opartych na Express.js. Obejmuje klasę bazową kontrolera, uwierzytelnianie JWT, narzędzia bazy danych oraz integracje z AWS, z których korzysta każdy projekt API.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **Node.js** i **Git** -- zobacz [Wymagania wstępne](../setup/prerequisites.md)
- Zapoznaj się z konfiguracją i procesem wydawania [obszaru roboczego Packages](./index.md)
- Ten pakiet zależy od [`@churchapps/helpers`](./helpers.md) (jako zależność peer) i ponownie go eksportuje

</div>

## Co zawiera

- **CustomBaseController** -- klasa bazowa kontrolerów API, oparta na `inversify-express-utils`
- **Auth** -- uwierzytelnianie JWT za pomocą `CustomAuthProvider`, `AuthenticatedUser` i `Principal`
- **Narzędzia bazy danych** -- `DB.query` / `DB.queryOne` oraz klasa `Pool` do zarządzania połączeniami MySQL, a także `MySqlHelper` i `DBCreator` do konfiguracji schematu
- **Integracje z AWS** -- `AwsHelper` do przechowywania plików w S3 oraz odczytu z SSM Parameter Store
- **E-mail** -- `EmailHelper` obsługujący transporty SES i SMTP
- **Ładowanie konfiguracji** -- `EnvironmentBase` odczytuje ciągi połączeń i sekrety ze zmiennych środowiskowych lub z Parameter Store
- **Różne** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Konfiguracja lokalnego środowiska deweloperskiego

Ten pakiet znajduje się w obszarze roboczym [Packages](https://github.com/ChurchApps/Packages), obok pozostałych bibliotek współdzielonych:

1. Sklonuj obszar roboczy:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Zainstaluj zależności w katalogu głównym obszaru roboczego:

   ```bash
   cd Packages && yarn install
   ```

3. Zbuduj pakiet (kompiluje TypeScript do `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Możesz też uruchomić `yarn build` w katalogu głównym, aby zbudować wszystkie pakiety w kolejności zależności.

Aby przetestować zmiany w interfejsie API, który z nich korzysta, użyj tymczasowego portalu Yarn -- zobacz [Lokalne programowanie z aplikacją korzystającą z pakietu](./index.md#local-development-against-a-consuming-app).

## Publikowanie

Wydania przechodzą przez changesets: przy każdej zmianie uruchom `yarn changeset` w katalogu głównym obszaru roboczego, a gdy będziesz gotowy do wydania, uruchom `yarn publish-all`. Pełny opis procesu znajdziesz w [Przeglądzie bibliotek współdzielonych](./index.md#releasing-with-changesets).

:::info
Ten pakiet jest zależnością każdego interfejsu API ChurchApps -- głównego Api, AskApi i LessonsApi. Wprowadzając zmiany, przetestuj je lokalnie na interfejsie API przed publikacją.
:::

## Powiązane artykuły

- **[Helpers](./helpers.md)** -- Podstawowy pakiet narzędziowy, od którego zależy ten pakiet
- **[Struktura modułów](../api/module-structure.md)** -- Jak kontrolery i middleware uwierzytelniania są używane w modułach API
- **[Lokalna konfiguracja API](../api/local-setup.md)** -- Konfiguracja API do lokalnego programowania
