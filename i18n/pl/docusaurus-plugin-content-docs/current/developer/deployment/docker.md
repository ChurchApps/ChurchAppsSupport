---
title: "Self-Hosting with Docker"
description: "Zainstaluj prywatny stos B1 Admin, portalu członka, API i MySQL na własnym komputerze przez Docker, a potem aktualizuj i twórz kopie zapasowe poleceniem b1."
---

# Self-Hosting with Docker

<div class="article-intro">

Uruchom własną prywatną instancję B1 Admin, portalu członków i strony B1, API oraz bazy danych MySQL na dowolnym komputerze z Dockerem — serwerze domowym, małym VPS lub urządzeniu lokalnym. Jedno polecenie instaluje system, jedno polecenie go aktualizuje, a każda aktualizacja najpierw tworzy kopię zapasową. Jeśli wolisz w ogóle nie zarządzać serwerem, zobacz [Self-Hosting on Railway](./railway-template.md), czyli zarządzaną alternatywę.

</div>

## Szybki start

<div class="prereqs">
<h4>Czego potrzebujesz</h4>

- Maszyny z systemem Linux (lub macOS / Windows z WSL albo Git Bash — pomocnik `b1` jest skryptem bash) z [Docker Engine](https://docs.docker.com/engine/install/) oraz Compose v2 (w zestawie z Docker Desktop)
- Około 2 GB pamięci RAM i 5 GB miejsca na dysku
- W przypadku publicznej strony: nazwa domeny wskazująca na tę maszynę, z dostępnymi portami 80 i 443

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Pomiń `--domain`, aby uruchomić system pod adresem `http://localhost`. Instalator tworzy folder `b1church`, zapisuje plik `.env` z nowo wygenerowanymi sekretami, pobiera gotowe obrazy z GitHub Container Registry i czeka, aż API zgłosi stan „healthy”. Na Twojej maszynie nic nie jest budowane, więc pierwsze uruchomienie zajmie minutę lub dwie.

Po zakończeniu:

1. Otwórz **https://church.example.org/admin** (lub http://localhost/admin) i kliknij **Register**. Pierwsze konto automatycznie otrzymuje uprawnienia administratora serwera.
2. Postępuj zgodnie z podpowiedziami w aplikacji, aby utworzyć pierwszy kościół. Jego strona internetowa i portal członków są dostępne pod adresem **https://church.example.org/** zaraz po jego utworzeniu.

Wszystko działa pod jedną domeną:

| Ścieżka | Usługa |
|---------|--------|
| `/` | B1App — strona internetowa kościoła i portal członków |
| `/admin` | B1Admin — panel dla personelu |
| `/api` | API, przesyłane pliki oraz websocket aktualizacji na żywo |

HTTPS działa automatycznie: dołączony serwer proxy [Caddy](https://caddyserver.com/) uzyskuje i odnawia certyfikat Let's Encrypt dla domeny z pliku `.env`. Udostępnione są tylko porty 80 i 443; baza danych jest dostępna wyłącznie z wnętrza sieci Docker.

## Polecenie `b1`

Instalator umieszcza skrypt `deploy/b1` obok pliku `docker-compose.yml`. Na co dzień to jedyne narzędzie, którego potrzebujesz:

| Polecenie | Co robi |
|-----------|---------|
| `./deploy/b1 upgrade` | Pobiera bieżące wydanie, tworzy kopię zapasową, restartuje system i sprawdza, czy API działa prawidłowo |
| `./deploy/b1 upgrade 2026.10.1` | To samo, ale dla konkretnej wersji |
| `./deploy/b1 backup` | Zapisuje migawkę bazy danych, przesłanych plików i `.env` w `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Przywraca migawkę (API zostaje zatrzymane na czas przywracania) |
| `./deploy/b1 rollback` | Przywraca najnowszą kopię zapasową wraz z wydaniem, w którym została wykonana |
| `./deploy/b1 status` | Zainstalowana wersja i stan kontenerów |
| `./deploy/b1 logs api` | Śledzi logi wybranej usługi |

Wydania są publikowane jako jeden wersjonowany pakiet, dzięki czemu trzy obrazy zawsze do siebie pasują. `B1_VERSION=stable` w pliku `.env` śledzi najnowsze wydanie; ustaw konkretną wersję, aby ją przypiąć. Informacje o wydaniach znajdziesz w sekcji [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Konfiguracja

Wszystkie ustawienia znajdują się w pliku `.env` obok `docker-compose.yml`. Instalator wypełnia wymagane z nich:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Po edycji pliku `.env` zastosuj zmiany poleceniem `docker compose up -d`. Aplikacje webowe ustalają, z którym API się połączyć, na podstawie adresu w przeglądarce, więc zmiana domeny wymaga jedynie aktualizacji `SITE_ADDRESS` i `PUBLIC_URL` oraz restartu — bez ponownego budowania.

:::warning
Chroń plik `.env`. `ENCRYPTION_KEY` zabezpiecza zapisane dane uwierzytelniające bramek płatniczych i pamięci plików; kopia zapasowa bez tego klucza nie pozwoli ich odszyfrować. Z tego powodu `./deploy/b1 backup` zawiera jego kopię.
:::

### Późniejsza zmiana na domenę

Jeśli system zainstalowano na `localhost`, a później chcesz udostępnić go publicznie: skieruj DNS na tę maszynę, ustaw w `.env` wartości `DOMAIN`, `SITE_ADDRESS` (sama domena) oraz `PUBLIC_URL` (`https://` + domena), a następnie uruchom `docker compose up -d`. Caddy pobierze certyfikat przy pierwszym żądaniu.

## E-mail, dary, wiele stron i integracje

Działają dokładnie tak samo jak na Railway — te same zmienne środowiskowe, ustawiane w `.env` zamiast w panelu Railway:

- **[E-mail / SMTP](./railway-template.md#1-email-highly-recommended)** — poradniki konfiguracji dla Resend, Brevo i Gmaila
- **[Wiele stron](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** — nieograniczona liczba kościołów na jednej instancji. `/` obsługuje kościół, którego slug to `DEFAULT_CHURCH_SLUG` (pierwszy kościół to `church`); wskaż dodatkowe domeny na tę maszynę i przypisz je w **Settings → Domains** w B1Admin
- **[Online giving](./railway-template.md#4-online-giving-stripe--paypal)** — konfigurowane osobno dla każdego kościoła w interfejsie administratora
- **[Opcjonalne integracje](./railway-template.md#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Powiadomienia push](#push-notifications)** — `WEB_PUSH_*`; instalator pozostawia te pola puste, więc push jest wyłączony, dopóki ich nie dodasz

Zaproszenia i inne wiadomości wysyłane przez kościół są na instancji self-hosted włączane automatycznie (usługa hostowana blokuje je do ręcznego sprawdzenia, aby chronić reputację nadawcy).

## Powiadomienia push

Powiadomienia push w przeglądarce i w mobilnej wersji webowej pozostają wyłączone, dopóki serwer nie ma pary kluczy VAPID. Instalator jej nie tworzy. Dopóki jej nie dodasz, strona Notifications w mobilnej aplikacji webowej informuje, że push nie jest włączony dla tej strony.

1. Wygeneruj parę kluczy. Potrzebny jest do tego tylko Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Dodaj dwie wartości do `.env`. `WEB_PUSH_SUBJECT` jest opcjonalny i zawiera adres kontaktowy, który widzą usługi push:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Zastosuj zmiany:

   ```bash
   docker compose up -d
   ```

4. Aby to potwierdzić, otwórz **Server Admin → Server Health** w B1Admin. Oba klucze Web Push powinny być oznaczone jako skonfigurowane. Członkowie mogą wtedy włączyć powiadomienia w mobilnej aplikacji webowej.

:::warning
Gdy członkowie już się zarejestrowali, nie zmieniaj kluczy. Ich zmiana unieważnia wszystkie istniejące subskrypcje, a każde urządzenie musi zarejestrować się ponownie.
:::

## Dane, kopie zapasowe i przechowywanie plików

Wszystkie dane przechowywane są w trzech nazwanych wolumenach Docker:

| Wolumen | Zawartość |
|---------|-----------|
| `b1church_mysql-data` | Wszystkie schematy bazy danych |
| `b1church_api-content` | Przesłane pliki — zdjęcia, dokumenty, obrazy strony |
| `b1church_caddy-data` | Certyfikaty TLS |

`./deploy/b1 backup` zapisuje spójną migawkę dwóch pierwszych wolumenów oraz pliku `.env` w `backups/<timestamp>/`. Zaplanuj jej wykonywanie w cronie i kopiuj folder w miejsce poza tą maszyną:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

W przypadku dużych bibliotek multimediów możesz przełączyć przechowywanie plików na S3 — ustaw `FILE_STORE=S3` oraz zmienne `AWS_*` opisane w sekcji [File Storage w poradniku Railway](./railway-template.md#5-file-storage). Kopie zapasowe bazy danych nie obejmują obiektów S3; włącz tam wersjonowanie bucketu.

## Aktualizacja

```bash
./deploy/b1 upgrade
```

Kolejno: pobiera wydanie, tworzy kopię zapasową, odtwarza kontenery, uruchamia oczekujące migracje bazy danych podczas startu API i czeka na wynik sprawdzenia stanu API. Jeśli cokolwiek się nie powiedzie, proces zostaje zatrzymany, a system podpowiada uruchomienie `./deploy/b1 rollback`, które przywraca tę kopię zapasową i poprzednie wydanie. Migracje działają tylko w jedną stronę, więc cofnięcie zmian zawsze oznacza przywrócenie migawki.

Aktualizacja z pliku compose z wersji beta (tego, który budował obrazy ze źródeł) przebiega tak samo, gdy masz już plik `.env`: domyślnie używał hasła `MYSQL_ROOT_PASSWORD=churchapps`, więc umieść je w `.env` razem z `PUBLIC_URL` i `SITE_ADDRESS`, zastąp `docker-compose.yml` oraz `deploy/` aktualnymi plikami i uruchom `./deploy/b1 upgrade`.

## Budowanie ze źródeł

Deweloperzy mogą budować obrazy lokalnie zamiast je pobierać:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` i `B1APP_CONTEXT` w pliku `.env` wskazują buildom lokalne kopie repozytoriów (np. `../Api`) lub referencję git.

## Rozwiązywanie problemów

| Objaw | Prawdopodobna przyczyna | Rozwiązanie |
|-------|-------------------------|-------------|
| Kontener `api` ciągle się restartuje | błąd migracji lub nieprawidłowe hasło do bazy danych | `./deploy/b1 logs api` — migracja wypisze, który moduł zawiódł |
| `api` zapisuje w logu „ENCRYPTION_KEY must be exactly 32 characters” | klucz w `.env` został ręcznie zmieniony lub obcięty | przywróć oryginalny 32-znakowy klucz (wygeneruj nowy tylko wtedy, gdy nie są jeszcze zapisane żadne dane uwierzytelniające) |
| Przeglądarka pokazuje ostrzeżenie o certyfikacie | DNS jeszcze nie wskazuje na tę maszynę lub porty 80/443 są zablokowane | popraw DNS lub zaporę; Caddy ponawia próbę samodzielnie |
| `/` pokazuje panel zamiast strony kościoła | brak kościoła lub `DEFAULT_CHURCH_SLUG` nie pasuje | utwórz kościół lub ustaw slug w **Settings → Church** |
| „Check your email”, ale e-mail nie przychodzi | `MAIL_SYSTEM=SMTP` z błędnymi danymi logowania | popraw dane logowania lub usuń `MAIL_SYSTEM`, aby wyłączyć e-mail |
| Mobilna aplikacja webowa informuje, że powiadomienia push nie są włączone | brak kluczy VAPID na serwerze | dodaj je zgodnie z opisem w sekcji [Powiadomienia push](#push-notifications) |
| Czat / funkcje na żywo nie działają | websocket blokowany przez inny serwer proxy przed systemem | gniazdo działa pod `/api/` na tym samym porcie; zezwól na nagłówki `Upgrade` |
| `install` odmawia działania: „database volume already exists” | pozostałości po wcześniejszej instalacji | `docker compose down -v`, aby wyczyścić, lub utwórz `.env` i użyj `upgrade` |

Nadal masz problem? Otwórz zgłoszenie pod adresem [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues), dołączając wynik `./deploy/b1 logs`.

## Powiązane artykuły

- **[Self-Hosting on Railway](./railway-template.md)** — zarządzana alternatywa hostingowa oraz wspólne poradniki konfiguracji po wdrożeniu
- **[Initial Setup](../../getting-started/initial-setup.md)** — pierwsze kroki po utworzeniu kościoła
- **[Local API Setup](../api/local-setup.md)** — uruchamianie stosu bezpośrednio na potrzeby programowania
