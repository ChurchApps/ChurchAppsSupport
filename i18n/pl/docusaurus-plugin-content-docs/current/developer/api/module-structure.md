---
title: "Struktura modułu"
---

# Struktura modułu

<div class="article-intro">

Każdy moduł API ma spójną wewnętrzną strukturę, na którą składają się kontrolery, repozytoria, modele i funkcje pomocnicze. Zrozumienie tego układu ułatwia poruszanie się po bazie kodu i dodawanie nowych funkcji do dowolnego modułu.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj API lokalnie -- zob. [Lokalna konfiguracja API](./local-setup)
- Zapoznaj się z architekturą [bazy danych](./database), aby zrozumieć warstwę dostępu do danych

</div>

## Układ katalogów

Moduły znajdują się w katalogu `src/modules/{name}/`. Typowy moduł zawiera cztery katalogi:

```
src/modules/{name}/
├── controllers/    ← Procedury obsługi tras (punkty końcowe Express)
├── repositories/   ← Warstwa dostępu do danych (typowane zapytania SQL)
├── models/         ← Interfejsy i typy TypeScript
└── helpers/        ← Logika biznesowa specyficzna dla modułu
```

Przykład, moduł membership:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Sześć podstawowych modułów danych -- membership, attendance, content, giving, messaging i doing -- ma ten sam układ. Kilka wyspecjalizowanych modułów (na przykład reporting, który obsługuje raporty obejmujące wiele modułów i nie posiada własnych danych) znajduje się obok nich w katalogu `src/modules/`.

## Jedna aplikacja, wiele modułów

API jest **monolitem modularnym**: moduły wyznaczają granice organizacji kodu i własności danych, a nie oddzielne usługi. Podczas uruchamiania kontrolery każdego modułu są rejestrowane w jednym kontenerze wstrzykiwania zależności, za jedną aplikacją Express, dzięki czemu całe API jest budowane, uruchamiane i wdrażane jako jedna jednostka -- opisane poniżej funkcje wdrożeniowe są punktami wejścia do tej samej aplikacji.

Trasy każdego modułu znajdują się pod prefiksem URL odpowiadającym nazwie modułu:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Dzięki temu powierzchnia API każdego modułu jest samodzielna, a klienci nadal komunikują się z jednym hostem.

## Kontrolery

Kontrolery definiują trasy API dla modułu. Każdy moduł ma własny kontroler bazowy (na przykład `MembershipBaseController`), który rozszerza współdzielony `BaseController` -- sam oparty na `CustomBaseController` z `@churchapps/apihelper`. Trasy są rejestrowane za pomocą dekoratorów Inversify.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = kontekst uwierzytelnionego użytkownika
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` uwierzytelnia żądanie i wypełnia `this.repos` repozytoriami modułu, zanim wykona Twoją akcję.

### Dekoratory tras

| Dekorator | Metoda HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Dekorator `@controller("/base")` ustawia ścieżkę bazową dla wszystkich tras w kontrolerze.

## Repozytoria

Repozytoria obsługują wszystkie operacje na bazie danych. Nie ma tu ORM -- zapytania są pisane za pomocą konstruktora zapytań Kysely, typowanego względem schematu bazy danych modułu. Plik `db/index.ts` każdego modułu udostępnia funkcję `getDb()`, która zwraca typowaną instancję Kysely dla tego modułu.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Wewnątrz kontrolera repozytoria modułu są dostępne jako `this.repos`. Poza kontrolerami uzyskuje się je przez `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Komunikacja między modułami

Każdy moduł posiada własną bazę danych (zob. [Baza danych](./database)), a moduł nigdy nie wysyła zapytań bezpośrednio do tabel innego modułu. Gdy jeden moduł potrzebuje danych należących do innego -- na przykład moduł doing pobierający osoby z membership -- korzysta z **bramy** (gateway) modułu będącego właścicielem danych, znajdującej się w `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Każda brama (`MembershipModuleGateway`, `GivingModuleGateway` itd.) jest interfejsem TypeScript określającym dokładnie, jakie operacje moduł udostępnia reszcie API. Interfejs jest kontraktem: obecne implementacje odczytują bazę danych modułu właściciela w tym samym procesie, ale ponieważ wywołujący zależą wyłącznie od interfejsu, implementację można podmienić -- na przykład na taką, która wykonuje wywołania HTTP -- gdyby moduł został kiedyś wydzielony do osobnej usługi.

:::info
Jeśli potrzebne dane znajdują się w innym module, a jego brama nie udostępnia dla nich operacji, rozszerz interfejs bramy zamiast sięgać do repozytoriów lub bazy danych innego modułu.
:::

## Uwierzytelnianie i autoryzacja

### Uwierzytelnianie JWT

Wszystkie żądania są uwierzytelniane za pomocą tokenów JWT obsługiwanych przez `CustomAuthProvider`. Token jest weryfikowany automatycznie, a kontekst uwierzytelnionego użytkownika (`au`) jest dostępny w każdej akcji kontrolera.

### Sprawdzanie uprawnień

Użyj `au.checkAccess()`, aby sprawdzić, czy bieżący użytkownik ma wymagane uprawnienie. Uprawnienia są predefiniowanymi stałymi łączącymi typ treści z akcją:

```typescript
au.checkAccess(Permissions.people.view);    // Dostęp do odczytu
au.checkAccess(Permissions.people.edit);    // Dostęp do zapisu
```

Jeśli użytkownik nie ma wymaganego uprawnienia, automatycznie zwracana jest odpowiedź z błędem.

:::warning
Zawsze wywołuj `au.checkAccess()` przed wykonaniem jakichkolwiek operacji na danych. Nigdy nie pomijaj sprawdzania uprawnień, nawet w punktach końcowych wyglądających na tylko do odczytu.
:::

## Konfiguracja środowiska

Klasa `Environment` obsługuje konfigurację w różnych środowiskach:

- **Lokalne programowanie:** Odczyt z pliku `.env` w katalogu głównym projektu
- **Środowiska wdrożone:** Odczyt z AWS SSM Parameter Store

```typescript
// Dostęp do zmiennych środowiskowych
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Ta abstrakcja oznacza, że Twój kod nie musi wiedzieć, skąd pochodzi konfiguracja.

## Funkcje Lambda

Po wdrożeniu w AWS API działa jako sześć funkcji Lambda:

| Funkcja | Przeznaczenie |
|----------|---------|
| `web` | Obsługuje wszystkie żądania HTTP REST API |
| `socket` | Zarządza połączeniami WebSocket dla funkcji działających w czasie rzeczywistym |
| `timer15Min` | Uruchamiana co 30 minut w celu wysyłania powiadomień e-mail (nazwa jest historyczna) |
| `timerMidnight` | Uruchamiana codziennie w celu wysyłania e-maili z podsumowaniami i prac konserwacyjnych |
| `timerScheduledTasks` | Uruchamiana codziennie w celu przetwarzania zaplanowanych automatyzacji i zaległych przepływów pracy |
| `timerWebhooks` | Uruchamiana co minutę w celu dostarczania zakolejkowanych webhooków wychodzących |

:::info
Lokalnie funkcja `web` działa na porcie 8084, a funkcja `socket` na porcie 8087. Funkcje timerów można uruchamiać ręcznie podczas programowania.
:::

## Powiązane artykuły

- **[Baza danych](./database)** -- Ciągi połączeń, skrypty schematu i wzorce dostępu do danych
- **[Lokalna konfiguracja API](./local-setup)** -- Pełny przewodnik konfiguracji krok po kroku
- **[ApiHelper](../shared-libraries/api-helper)** -- Współdzielona biblioteka udostępniająca `CustomBaseController` i middleware uwierzytelniania
