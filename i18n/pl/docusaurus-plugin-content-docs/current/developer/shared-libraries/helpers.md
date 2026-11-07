---
title: "Pomocnicze funkcje"
description: "Pakiet @churchapps/helpers dla deweloperów: funkcje, aplikacje z niego korzystające, lokalne budowanie w workspace Packages i publikacja przez changesets."
---

# Pomocnicze funkcje

<div class="article-intro">

Pakiet `@churchapps/helpers` zawiera podstawowe narzędzia wykorzystywane we wszystkich projektach ChurchApps, zarówno po stronie frontendu, jak i backendu. Jest niezależny od frameworka i zawiera typowe funkcje pomocnicze, takie jak `DateHelper`, `ApiHelper` i `CurrencyHelper`, a także wspólne interfejsy TypeScript, które stanowią kontrakt danych między aplikacjami a interfejsami API.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **Node.js** i **Git** -- zobacz [Wymagania wstępne](../setup/prerequisites.md)
- Zapoznaj się z konfiguracją [obszaru roboczego Packages](./index.md) oraz procesem wydawania wersji

</div>

## Kto z tego korzysta

Każde API ChurchApps (główne Api, AskApi i LessonsApi) oraz każdy frontend webowy (B1Admin, B1App, B1Transfer, LessonsApp) bezpośrednio zależy od tego pakietu. Frontendy otrzymują także wiele jego eksportów (`ApiHelper`, `DateHelper`, `UserHelper` i inne interfejsy) przekazywanych dalej przez [`@churchapps/apphelper`](./app-helper.md). Pozostałe wspólne pakiety deklarują go jako zależność peer, dzięki czemu każda aplikacja używa dokładnie jednej kopii.

## Konfiguracja lokalnego środowiska programistycznego

Ten pakiet znajduje się w obszarze roboczym [Packages](https://github.com/ChurchApps/Packages) obok pozostałych bibliotek współdzielonych:

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
   yarn workspace @churchapps/helpers build
   ```

   Alternatywnie uruchom `yarn build` w katalogu głównym, aby zbudować wszystkie pakiety w kolejności zależności.

Aby przetestować zmiany w projekcie korzystającym z pakietu, użyj tymczasowego portalu Yarn -- zobacz [Lokalne programowanie z aplikacją korzystającą z pakietu](./index.md#local-development-against-a-consuming-app).

## Publikowanie

Wydania przebiegają za pośrednictwem changesets, a nie ręcznego podnoszenia wersji:

1. Uruchom `yarn changeset` w katalogu głównym obszaru roboczego i wybierz `@churchapps/helpers` oraz odpowiedni rodzaj zmiany wersji; zatwierdź wygenerowany plik changeset razem ze swoją zmianą.
2. Gdy będziesz gotowy do wydania, uruchom `yarn publish-all` w katalogu głównym -- polecenie podnosi wersje, zapisuje CHANGELOG, buduje pakiety w kolejności zależności i publikuje je w npm.

Nowe wspólne interfejsy umieszczaj w `helpers/src/interfaces/` i eksportuj je przez główny plik barrel pakietu. Katalog typów elementów kreatora stron (`ElementTypes.ts` -- 35 typów wraz ze schematami odpowiedzi) również znajduje się tutaj; jest to kontrakt współdzielony przez renderery apphelper, formularze edytora w B1Admin oraz podpowiedzi generowania AI (zobacz [Architektura kreatora stron](../architecture/website-builder.md)).

:::warning
Ponieważ ten pakiet jest używany przez wszystkie projekty ChurchApps, zmiany tutaj mają szeroki wpływ. Wydanie `helpers` automatycznie podnosi wersje `apihelper` i `apphelper`, aby ich zakresy zależności pozostały aktualne. Przed publikacją przetestuj zmiany za pomocą portalu Yarn przynajmniej w jednym korzystającym API i jednej korzystającej aplikacji webowej.
:::

## Powiązane artykuły

- **[ApiHelper](./api-helper.md)** -- Narzędzia po stronie serwera, które zależą od tego pakietu
- **[AppHelper](./app-helper.md)** -- Komponenty React, które zależą od tego pakietu
- **[Przegląd bibliotek współdzielonych](./index.md)** -- Konfiguracja obszaru roboczego, proces wydawania i przepływ lokalnych linków
