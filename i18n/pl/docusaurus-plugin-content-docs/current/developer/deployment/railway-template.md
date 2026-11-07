---
title: "Self-Hosting on Railway"
description: "Wdróż prywatną instancję ChurchApps na Railway w około 15 minut, potem skonfiguruj e-mail, domeny, routing wielu kościołów, dary i pliki w B1 Admin i B1App."
---

# Self-Hosting on Railway

<div class="article-intro">

ChurchApps udostępnia szablon [Railway](https://railway.com) do wdrożenia jednym kliknięciem, który daje Twojemu kościołowi własną prywatną instancję B1 Admin, portalu członków B1, API oraz bazy danych MySQL — wszystko działa na infrastrukturze, którą posiadasz i opłacasz bezpośrednio. Ten przewodnik pozwoli Ci uruchomić system w około 15 minut, a następnie przeprowadzi Cię przez konfigurację po wdrożeniu, którą większość kościołów prędzej czy później chce wykonać.

</div>

## Szybki start

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Kliknij przycisk **Deploy on Railway** powyżej.
2. Zaloguj się do Railway (lub utwórz darmowe konto) i dodaj metodę płatności.
3. Kliknij **Deploy**, nic nie zmieniając — każda zmienna ma rozsądną wartość domyślną.
4. Poczekaj 5–10 minut, aż cztery usługi zaświecą się na zielono.
5. Otwórz adres URL usługi **B1Admin**, kliknij **Register** i utwórz swoje konto. Pierwsze konto automatycznie otrzymuje uprawnienia administratora serwera.
6. Postępuj zgodnie z podpowiedziami w aplikacji, aby utworzyć pierwszy kościół.

To wszystko. Masz teraz w pełni działającą instancję ChurchApps. Wszystko poniżej jest opcjonalnym dopracowaniem.

:::tip
Wdrożenie jest obecnie w wersji **beta**. Jeśli napotkasz coś, czego nie opisuje ta dokumentacja, prosimy o zgłoszenie problemu na stronie [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues), dołączając logi wdrożenia.
:::

<div class="prereqs">
<h4>Czego potrzebujesz</h4>

- Darmowe konto [Railway](https://railway.com)
- Kartę kredytową zapisaną w Railway (ok. 15–25 USD miesięcznie dla małej wspólnoty; zobacz [Koszty](#costs))
- Około 15 minut na pierwsze wdrożenie
- *Opcjonalnie, ale zdecydowanie zalecane w dalszej kolejności:* dane logowania SMTP oraz własną domenę

</div>

## Co zostanie wdrożone

Szablon uruchamia cztery usługi w jednym projekcie Railway:

| Usługa | Przeznaczenie | Adres URL po wdrożeniu |
|---------|---------|------------------|
| **MySQL** | Przechowuje wszystkie dane (jedna instancja, wiele schematów) | tylko wewnętrznie |
| **Api** | Zaplecze dla członkostwa, treści, darowizn, frekwencji itd. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Aplikacja webowa dla personelu i administratorów | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Aplikacja webowa dla członków i strona internetowa kościoła | `https://b1app-<id>.up.railway.app` |

Schematy bazy danych są tworzone automatycznie przy pierwszym uruchomieniu przez migrację startową API.

## Konfiguracja przy pierwszym uruchomieniu

Skoro system już działa, oto rzeczy, które większość kościołów konfiguruje jako następne, w przybliżonej kolejności ważności.

### 1. E-mail (zdecydowanie zalecane)

Bez poczty e-mail członkowie nadal mogą się rejestrować i korzystać z systemu, ale **nie mogą zresetować zapomnianych haseł** — musi to zrobić za nich administrator. Konfiguracja SMTP zajmuje około 5 minut.

W panelu Railway otwórz usługę **Api** → **Variables** i dodaj:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<host Twojego dostawcy>
SMTP_USER=<Twoja nazwa użytkownika>
SMTP_PASS=<Twoje hasło lub klucz API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Warto poznać trzech dostawców:

#### Resend — najprostsza darmowa opcja (100 e-maili dziennie)

1. Zarejestruj się na [resend.com](https://resend.com).
2. Zweryfikuj domenę nadawcy (albo na początek użyj testowego nadawcy `onboarding@resend.dev`).
3. Utwórz klucz API.
4. Ustaw `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — darmowy do użytku osobistego (ok. 500 dziennie)

1. Włącz uwierzytelnianie dwuskładnikowe na koncie Google.
2. Utwórz [hasło aplikacji](https://myaccount.google.com/apppasswords).
3. Ustaw `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=twoj-adres@gmail.com`, `SMTP_PASS=<16-znakowe hasło aplikacji>`.

#### AWS SES — najtańsza opcja przy dużej skali

1. Zweryfikuj domenę nadawcy w AWS.
2. Wyjdź z piaskownicy SES, jeśli będziesz wysyłać na niezweryfikowane adresy.
3. Utwórz dane logowania SMTP w **SES → SMTP Settings → Create credentials**.
4. Ustaw `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<hasło SMTP SES>`.

Po zapisaniu zmiennych usługa Api zostanie automatycznie ponownie wdrożona. Sprawdź działanie, inicjując reset hasła na koncie testowym.

:::warning
Jeśli ustawisz `MAIL_SYSTEM=SMTP` z błędnymi danymi logowania, rejestracja będzie wyglądać na udaną, ale e-mail weryfikacyjny nigdy nie dotrze. Popraw dane logowania albo usuń `MAIL_SYSTEM`, aby przełączyć system z powrotem w tryb bez poczty e-mail.
:::

### 2. Własne domeny

Domyślne adresy `*.up.railway.app` działają, ale większość kościołów chce mieć własne.

Dla każdej usługi webowej (B1Admin i B1App):

1. Otwórz usługę w Railway → **Settings** → **Networking**.
2. Kliknij **+ Custom Domain** i wpisz nazwę hosta:
   - `admin.yourchurch.org` dla B1Admin
   - `app.yourchurch.org` (lub `www`) dla B1App
3. Dodaj rekord CNAME, który pokazuje Railway, u swojego dostawcy DNS.
4. Poczekaj kilka minut, aż DNS się propaguje. Railway automatycznie wygeneruje certyfikat TLS.

Następnie zaktualizuj zmienne usługi **Api**, aby linki w e-mailach wskazywały na nowe domeny:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

A w usłudze **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (jeśli ustawiasz też własną domenę API)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Token `{subdomain}` jest dosłowny — w czasie działania zostanie zastąpiony poddomeną każdego kościoła (zobacz Wiele witryn poniżej).

### 3. Wiele witryn (kilka kościołów na jednej instancji)

ChurchApps jest z założenia wielodostępne — jedno wdrożenie może obsługiwać dowolną liczbę kościołów, z których każdy ma własnych ludzi, grupy i witrynę. Nowe kościoły dodaje się wyłącznie przez interfejs administratora; nie są potrzebne żadne zmiany infrastruktury.

#### Dodawanie kolejnych kościołów

1. W **B1 Admin** przejdź do **Settings → Manage Church → Switch Church → Create New**.
2. Każdy kościół ma unikalny **identyfikator poddomeny** (np. `firstchurch`, `gracecommunity`).
3. Nowy kościół otrzymuje własne dane, członków, witrynę i ustawienia darowizn, w pełni odizolowane od pozostałych kościołów na tej instancji.

#### Kierowanie każdego kościoła pod własny adres URL

Istnieją dwa sposoby publicznego udostępniania kościołów:

| Wzorzec | Przykład | Konfiguracja |
|---------|---------|-------|
| **Oparty na ścieżce** (działa od razu) | `app.yourchurch.org/firstchurch` | Bez dodatkowej konfiguracji |
| **Oparty na poddomenie** (czystsze adresy) | `firstchurch.yourchurch.org` | Wildcard DNS + wildcard custom domain |

Dla routingu **opartego na poddomenach** w Railway:

1. U swojego dostawcy DNS utwórz wildcard CNAME: `*.yourchurch.org → <cel b1app w Railway>`.
2. W Railway, w usłudze B1App → **Settings → Networking**, dodaj `*.yourchurch.org` jako własną domenę.
3. W usłudze **B1Admin** ustaw `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Po ponownym wdrożeniu witryna każdego kościoła będzie automatycznie dostępna pod adresem `<ich-poddomena>.yourchurch.org`.

:::info
Wildcardowe własne domeny wymagają płatnego planu Railway. Routing oparty na ścieżce działa w każdym planie i jest funkcjonalnie identyczny — tyle że mniej ładny w pasku adresu.
:::

### 4. Darowizny online (Stripe / PayPal)

Darowizny konfiguruje się **dla każdego kościoła osobno w interfejsie administratora**, a nie przez zmienne środowiskowe — dzięki temu każdy kościół może używać własnego konta sprzedawcy.

1. Pobierz dane deweloperskie z [Stripe](https://dashboard.stripe.com/) (Developers → API keys) lub [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. W B1 Admin przejdź do **Settings → Giving Settings**.
3. Wybierz dostawcę, wklej klucze publiczny i sekretny oraz skonfiguruj sposób naliczania opłat.
4. Opcjonalnie dodaj `GOOGLE_RECAPTCHA_SECRET_KEY` do usługi **Api** w Railway, aby chronić publiczne formularze darowizn przed botami.

### 5. Przechowywanie plików

Szablon udostępnia **trwały wolumen 1 GB** podłączony do usługi Api, na zdjęcia członków, pliki kazań i przesłane dokumenty.

Aby go powiększyć: otwórz usługę Api → **Volumes** → dostosuj suwak rozmiaru.

W większych wdrożeniach (100+ GB lub wiele równoczesnych przesłań) przełącz się na S3, ustawiając w usłudze **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<twój-bucket>
AWS_ACCESS_KEY_ID=<klucz>
AWS_SECRET_ACCESS_KEY=<sekret>
AWS_REGION=us-east-2
```

Istniejące pliki na wolumenie nie migrują automatycznie — skopiuj je do bucketu, zanim zmienisz tę zmienną.

### 6. Opcjonalne integracje funkcji

Odblokowują one konkretne funkcje i można je dodać później w panelu Railway. Ustaw je w usłudze **Api**.

| Zmienna | Funkcja, którą włącza |
|----------|--------------------|
| `OPENAI_API_KEY` *lub* `OPENROUTER_API_KEY` | Wyszukiwanie i sugestie treści wspomagane AI |
| `YOUTUBE_API_KEY` | Wyszukiwanie i osadzanie kazań z YouTube |
| `PEXELS_KEY` | Wybór zdjęć stockowych w kreatorze witryny |
| `VIMEO_TOKEN` | Obsługa kazań z Vimeo |
| `API_BIBLE_KEY` | Wyszukiwanie wersetów Biblii w lekcjach i treściach |
| `YOUVERSION_API_KEY` | Integracja z YouVersion Bible |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Powiadomienia push w przeglądarce ([wygeneruj parę kluczy VAPID](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Opcjonalna synchronizacja z CRM dla nowych rejestracji |

## Aktualizacje

Każda usługa jest połączona z odpowiednim repozytorium GitHub. Wysłanie zmian do `main` w `ChurchApps/Api`, `ChurchApps/B1Admin` lub `ChurchApps/B1App` uruchamia automatyczne ponowne wdrożenie.

Aby przypiąć konkretną wersję, zmień ustawienie **Branch** każdej usługi na tag lub gałąź wydania. To zalecana konfiguracja dla środowiska produkcyjnego — automatyczne wdrażanie z `main` oznacza, że trafią do Ciebie także prace w toku.

## Koszty

Typowe widełki dla małego kościoła (poniżej 200 członków, niewielki ruch):

| Składnik | Mniej więcej miesięcznie |
|-----------|---------------------|
| Railway — opłata podstawowa | 5 USD |
| Wtyczka MySQL | 5 USD + ok. 1 USD za przechowywanie |
| 3 usługi webowe — moc obliczeniowa | 3–10 USD łącznie |
| Wolumen 1 GB | 0,25 USD |
| **Razem** | **ok. 15–25 USD miesięcznie** |

Koszty rosną liniowo wraz z ruchem, przesyłaniem zdjęć i rozmiarem bazy danych. Aktualne zużycie Railway widzisz w zakładce **Usage** projektu — ustaw tam limity wydatków, aby ograniczyć ryzyko.

## Rozwiązywanie problemów

| Objaw | Prawdopodobna przyczyna | Rozwiązanie |
|---------|--------------|-----|
| Build kończy się błędem `EBUSY: rmdir '/app/node_modules/.cache'` | Konflikt montowania cache Nixpacks | Ustaw `NIXPACKS_NO_CACHE=true` w danej usłudze |
| Build B1Admin kończy się błędem `Missing: @types/...` | Niezsynchronizowany `package-lock.json` | Pobierz najnowszą wersję `main` |
| Wdrożenie Api zawiesza się na „Deploying" | Kontrola stanu (healthcheck) nie przechodzi — `/health` nie zwraca 200 | Sprawdź logi wdrożenia; zwykle brakuje wymaganej zmiennej środowiskowej |
| B1Admin pokazuje „check your email", ale e-mail nie dociera | `MAIL_SYSTEM=SMTP` ustawione, ale dane logowania brakują lub są błędne | Popraw dane logowania albo usuń `MAIL_SYSTEM`, aby wyłączyć pocztę e-mail |
| Logowanie przekierowuje na `api.churchapps.org` | `REACT_APP_STAGE` ma wartość `prod` | Ustaw `REACT_APP_STAGE=custom` w usłudze B1Admin |
| Wszystkie kościoły z poddomenami pokazują tę samą treść | `REACT_APP_B1_WEBSITE_URL` nie zawiera tokenu `{subdomain}` | Ustaw np. `https://{subdomain}.yourchurch.org` |
| Własna domena pokazuje „Application not found" | DNS jeszcze się nie propagował lub certyfikat Railway oczekuje | Poczekaj 5 minut; sprawdź DNS poleceniem `dig admin.yourchurch.org` |

Jeśli napotkasz coś, czego nie ma na tej liście, zgłoś problem na stronie [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues), dołączając logi wdrożenia.

## Powiązane artykuły

- **[Self-Hosting with Docker](./docker.md)** — Ten sam stos na własnym sprzęcie lub VPS
- **[Initial Setup](../../getting-started/initial-setup.md)** — Pierwsze kroki po utworzeniu kościoła
- **[Website Initial Setup](../../b1-admin/website/initial-setup.md)** — Konfiguracja publicznej witryny kościoła
- **[Giving Settings](../../b1-admin/donations/online-giving-setup.md)** — Podłączenie Stripe lub PayPal
- **[Local API Setup](../api/local-setup.md)** — Uruchamianie stosu lokalnie do rozwoju
- **[API Deployment (AWS)](./apis.md)** — Jak wdrażany jest oficjalny SaaS ChurchApps
