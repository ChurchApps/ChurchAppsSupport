---
title: "Zmienne środowiskowe"
description: "Konfiguracja pliku .env w projektach ChurchApps: wspólne demo API lub lokalne API oraz zmienne dla B1 Admin, B1.church, B1 Mobile, Lessons.church i innych."
---

# Zmienne środowiskowe

<div class="article-intro">

Każdy projekt ChurchApps korzysta z pliku `.env` do lokalnej konfiguracji. Każdy projekt zawiera przykładowy plik, który kopiujesz i dostosowujesz. Ta strona opisuje zmienne środowiskowe dla interfejsów API, aplikacji webowych i mobilnych, w tym sposób wyboru między demonstracyjnym a lokalnym API.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj [wymagania wstępne](./prerequisites.md) dla swojego projektu
- Sklonuj repozytorium projektu, nad którym chcesz pracować
- Zapoznaj się z [Przeglądem projektu](./project-overview.md), aby dowiedzieć się, których modułów API wymaga Twój projekt

</div>

## Ogólny schemat

1. Poszukaj pliku `dotenv.sample.txt` lub `.env.sample` w głównym katalogu projektu.
2. Skopiuj go do pliku `.env`.
3. W razie potrzeby zmodyfikuj wartości.

```bash
# Przykład dla projektu z plikiem .env.sample
cp .env.sample .env

# Przykład dla projektu z plikiem dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nigdy nie zatwierdzaj plików `.env` w systemie kontroli wersji.** Zawierają one wrażliwe dane, takie jak dane logowania do bazy danych, klucze API i sekrety JWT. Wszystkie projekty ChurchApps mają plik `.env` wpisany w `.gitignore`, mimo to zawsze sprawdź to przed zatwierdzeniem zmian.
:::

## Wybór celu API

Najważniejsza decyzja dotyczy tego, dokąd frontend kieruje wywołania API. Dostępne są dwie opcje:

### Opcja 1: Demonstracyjne API (zalecane do programowania frontendu)

Skorzystaj ze wspólnego środowiska demonstracyjnego. Nie wymaga ono lokalnego API ani konfiguracji bazy danych. Działa na najnowszym kodzie z gałęzi `main`, a jego dane przykładowe są odnawiane co noc.

```bash
# Schemat adresu bazowego
https://api.demo.churchapps.org/{module}

# Przykładowe adresy modułów
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Środowisko staging (`api.staging.churchapps.org`, `api.staging.lessons.church` i powiązane hosty) zostało wycofane. Niektóre przykładowe pliki `.env` mogą nadal zawierać adresy staging; zastąp je wartościami demonstracyjnymi lub lokalnymi pokazanymi na tej stronie. Nie ma wspólnego środowiska nieprodukcyjnego dla Lessons API — jeśli go potrzebujesz, uruchom [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokalnie (nasłuchuje na porcie `8090`).
:::

### Opcja 2: Lokalne API

Uruchom projekt Api na swoim komputerze. Wymaga to MySQL 8.0+ z bazami danych utworzonymi dla każdego modułu. Zobacz przewodnik [Lokalna konfiguracja API](../api/local-setup.md).

```bash
# Schemat adresu bazowego
http://localhost:8084/{module}

# Przykładowe adresy modułów
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Zmienne środowiskowe API

Główny projekt **Api** (`.env.sample`) ma najwięcej opcji konfiguracji. Oto najważniejsze zmienne:

### Ustawienia wspólne

| Zmienna | Opis | Przykład |
|----------|-------------|---------|
| `ENVIRONMENT` | Środowisko uruchomieniowe | `dev` |
| `SERVER_PORT` | Port HTTP lokalnego serwera deweloperskiego | `8084` |
| `ENCRYPTION_KEY` | Klucz szyfrowania 192-bitowy dla danych wrażliwych | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Sekret do podpisywania tokenów JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Miejsce przechowywania przesyłanych plików (`disk` lub `s3`) | `disk` |
| `CORS_ORIGIN` | Dozwolone źródła CORS (`*` dla lokalnego programowania) | `*` |

### Połączenie z bazą danych

Jeden adres bazowy wskazuje API na MySQL. API na jego podstawie wyznacza osobną bazę danych dla każdego modułu (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Zmienna | Przykład |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Zaktualizuj `root:password` swoimi rzeczywistymi danymi logowania do MySQL. Każda baza danych modułu musi istnieć przed uruchomieniem API. Użyj `npm run initdb`, aby utworzyć schemat dla wszystkich modułów, lub `npm run initdb:membership` dla pojedynczego modułu.
:::

### Ustawienia WebSocket

| Zmienna | Opis | Przykład |
|----------|-------------|---------|
| `SOCKET_PORT` | Port serwera WebSocket | `8087` |
| `SOCKET_URL` | Adres URL WebSocket, z którym łączą się klienci | `ws://localhost:8087` |

---

## Zmienne środowiskowe aplikacji webowych

### B1Admin (React + Vite)

Plik przykładowy: `.env.sample`

| Zmienna | Opis | Przykład (demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Nazwa środowiska | `demo` |
| `PORT` | Port serwera deweloperskiego | `3101` |
| `REACT_APP_API_BASE` | Jeden adres bazowy dla wszystkich API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` są dołączane automatycznie) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | Adres URL dostarczania treści | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Identyfikator Google Analytics (opcjonalny) | `UA-123456789-1` |

Przy lokalnym programowaniu API skieruj adres bazowy na swój lokalny zestaw usług:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Plik przykładowy: `.env.sample`

| Zmienna | Opis | Przykład (demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Jeden adres bazowy dla wszystkich API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` są dołączane automatycznie) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Adres URL dostarczania treści | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Identyfikator Google Analytics (opcjonalny) | `UA-123456789-1` |

:::info
Next.js wymaga prefiksu `NEXT_PUBLIC_` dla każdej zmiennej środowiskowej, która ma być dostępna w przeglądarce. Zmienne przeznaczone wyłącznie dla serwera nie potrzebują tego prefiksu.
:::

### LessonsApp (Next.js)

Plik przykładowy: `dotenv.sample.txt`

| Zmienna | Opis | Przykład (lokalne LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Etap środowiska (pozostaw nieustawione lub `dev` do lokalnego programowania) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Adres URL Lessons API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Adres URL dostarczania treści | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Bazowy adres API ChurchApps używany do logowania (uwzględniany tylko wtedy, gdy `STAGE` nie jest ustawione lub ma wartość `dev`) | `https://api.demo.churchapps.org` |

---

## Zmienne środowiskowe aplikacji mobilnych

### B1Mobile (React Native / Expo)

Plik przykładowy: `dotenv.sample.txt`

| Zmienna | Opis | Przykład (demo) |
|----------|-------------|----------------|
| `STAGE` | Nazwa środowiska | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Jeden adres URL dla każdego modułu API ChurchApps (każdy domyślnie wskazuje na środowisko produkcyjne, gdy nie jest ustawiony) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API (osobny host; nie ma wspólnego środowiska nieprodukcyjnego) | `https://api.lessons.church` |
| `CONTENT_ROOT` | Adres URL dostarczania treści | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | Adres URL strony Lessons | `https://lessons.church` |

:::info
Aplikacje mobilne nie używają prefiksu `REACT_APP_` ani `NEXT_PUBLIC_`. Dostęp do zmiennych środowiskowych jest obsługiwany przez konfigurację Expo.
:::

---

## Szybki przegląd: lokalizacje plików przykładowych

| Projekt | Plik przykładowy |
|---------|-----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
