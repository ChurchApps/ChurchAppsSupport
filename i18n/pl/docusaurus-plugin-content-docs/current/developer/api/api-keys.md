---
title: "Klucze API"
---

# Klucze API

<div class="article-intro">

Klucze API (osobiste tokeny dostępu) to najprostszy sposób uwierzytelniania się w API B1 ze skryptu po stronie serwera, z łącznika zewnętrznego (Zapier, Make, Arkusze Google) lub wszędzie tam, gdzie pełny przepływ OAuth byłby zbyt rozbudowany. Klucz jest przypisany do konkretnej osoby w konkretnym kościele i dziedziczy jej uprawnienia, które można dodatkowo zawęzić za pomocą opcjonalnego zestawu zakresów.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Klucze tworzy i zarządza nimi administrator kościoła z uprawnieniem **Edycja ustawień**
- Surowy klucz jest wyświetlany **tylko raz**, w momencie utworzenia — natychmiast zapisz go w bezpiecznym miejscu
- Wszystkie żądania do API muszą używać **HTTPS**

</div>

## Format klucza

Klucz API B1 wygląda następująco:

```
cak_<prefiks>.<sekret>
```

- `cak_` — stały identyfikator (prefiks klucza API, po którym warstwa uwierzytelniania rozpoznaje klucz)
- `<prefiks>` — 8-znakowy publiczny fragment używany do wyszukiwania
- `<sekret>` — 48-znakowy sekret; po stronie serwera przechowywany jest wyłącznie skrót SHA-256

Pełny klucz jest przekazywany do serwera w standardowym nagłówku bearer:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Warstwa uwierzytelniania API kieruje każdy token zaczynający się od `cak_` do ścieżki obsługi kluczy API, haszuje sekret, wyszukuje klucz po prefiksie i ustala aktualne uprawnienia osoby przypisanej do klucza. Dzięki temu odebranie uprawnienia w B1Admin działa już przy następnym żądaniu, a klucz nigdy nie rozjeżdża się z rolą.

## Tworzenie klucza (B1Admin)

1. Zaloguj się do B1Admin jako użytkownik z uprawnieniem **Edycja ustawień**.
2. Otwórz **Ustawienia → Dla deweloperów → Klucze API**.
3. Kliknij **Nowy klucz API**, nadaj mu rozpoznawalną nazwę (np. „Zapier — synchronizacja darowizn”), wybierz zakresy, jakie ma mieć klucz, i kliknij **Zapisz**.
4. Pełny klucz `cak_…` zostanie wyświetlony **jeden raz** w oknie dialogowym. Skopiuj go do konfiguracji swojej integracji, zanim zamkniesz okno — później nie da się go odzyskać. Zawsze możesz utworzyć nowy klucz.

## Zakresy

Zakres **zawęża** to, co może robić klucz — nigdy nie może przyznać uprawnienia, którego nie ma osoba, do której klucz jest przypisany. Brak zakresów oznacza, że klucz ma pełny zestaw uprawnień tej osoby.

| Zakres | Umożliwia |
|---|---|
| `people:read` / `people:write` | Przeglądanie / edycja osób, rodzin i członków grup |
| `groups:read` / `groups:write` | Przeglądanie / edycja grup i ich członkostwa |
| `donations:read` / `donations:write` | Przeglądanie / rejestrowanie darowizn |
| `attendance:read` / `attendance:write` | Przeglądanie / rejestrowanie frekwencji, sesji i meldunków |
| `forms:write` | Zarządzanie formularzami (odczyt jest domyślnie włączony wraz z zapisem) |
| `content:read` / `content:write` | Przeglądanie / edycja treści strony, zgłoszeń i transmisji na żywo |
| `messaging:read` / `messaging:write` | Odczyt wiadomości; zapis umożliwia także wysyłanie SMS-ów |
| `roles:read` / `roles:write` | Przeglądanie / edycja definicji ról |
| `settings:read` / `settings:write` | Przeglądanie / edycja ustawień kościoła (**wymagane** do programowej rejestracji webhooków) |
| `workflows:read` / `workflows:write` | Przeglądanie przepływów pracy i zadań / uruchamianie i edycja przepływów pracy. Uruchomienie przepływu pracy może wysłać e-mail i SMS-y, wywołać webhooki oraz zmienić członkostwo w grupach |
| `offline_access` | Zezwala na długotrwałe tokeny odświeżania (tylko przepływy OAuth — nie ma wpływu na klucze API) |

Zakresy `write` automatycznie obejmują odpowiadający im zakres `read`. Uprawnienia administratora serwera i domeny celowo nie są udostępniane jako zakresy — zawężone poświadczenie nigdy nie może zyskać uprawnień administratora witryny.

:::tip
Jeśli klucza użyjesz do rejestracji webhooków (np. dla integracji Zapier lub Make), klucz potrzebuje uprawnienia `settings:write`. Klucz z samym `people:read` po cichu zwróci błąd 403 przy `POST /membership/webhooks`.
:::

## Używanie klucza

Tak samo jak każdego tokenu bearer — każdy uwierzytelniony punkt końcowy akceptuje klucze API dokładnie tak samo jak tokeny JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Jeśli żądanie korzysta z klucza o niewystarczających zakresach, serwer odpowie **403 Forbidden** w tym samym formacie, co przy każdym innym błędzie braku uprawnień.

## Zarządzanie kluczami przez API

Wszystkie punkty końcowe znajdują się w ścieżce `/membership/apiKeys` modułu Membership i wymagają tokenu JWT (a nie klucza API) od administratora kościoła z uprawnieniem **Edycja ustawień**.

| Metoda i ścieżka | Przeznaczenie |
|---|---|
| `GET /membership/apiKeys` | Lista kluczy kościoła (bez sekretu — tylko `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lista wszystkich dostępnych nazw zakresów — do interfejsu tworzenia klucza |
| `POST /membership/apiKeys` | Utworzenie nowego klucza. Treść: `{ "name": "...", "scopes": ["people:read"] }`. Odpowiedź zawiera surowy klucz `cak_…` **jeden raz**. |
| `DELETE /membership/apiKeys/:id` | Odwołanie klucza — działa od następnego żądania |

Odwołany klucz przestaje działać natychmiast — nie ma okresu łaski.

## Dobre praktyki

- **Jeden klucz na integrację.** Jeśli coś zostanie przejęte, odwołujesz jeden klucz, nie psując pozostałych.
- **Twórz klucze z jak najwęższymi zakresami, które wystarczą.** Eksport do Arkuszy Google potrzebuje tylko `people:read`, a nie `settings:write`.
- **Przypisuj klucz do konta usługowego, a nie do prawdziwego pracownika.** Jeśli pracownik odejdzie, jego dostęp do B1 się kończy — a wraz z nim wszystkie klucze utworzone na jego tożsamość.
- **Przechowuj klucze w menedżerze sekretów** (zmienne środowiskowe dostawcy hostingu, AWS Secrets Manager itp.) — nigdy w systemie kontroli wersji.
- **Rotuj klucze**, jeśli podejrzewasz ujawnienie: utwórz nowy klucz, zaktualizuj integrację, a następnie usuń stary.

## Czym różni się od OAuth

Klucze API sprawdzają się, gdy **Twój kościół jest jedynym, który korzysta z integracji**. W przypadku łącznika, który musi mieć dostęp do wielu kościołów, każdego z wyraźną zgodą — np. aplikacji SaaS współdzielonej w społeczności B1 — zamiast tego użyj [OAuth i połączonych aplikacji](./connected-apps).

| | Klucz API | OAuth |
|---|---|---|
| Kto instaluje | Jeden administrator kościoła | Każdy administrator kościoła autoryzuje aplikację |
| Nagłówek uwierzytelniania | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Czas życia tokenu | Do odwołania | Dostęp ≈ 7 dni, odświeżanie ≈ 90 dni |
| Najlepsze do | Wewnętrznych skryptów, łączników Zapier/Make/Sheets | Wielonajemcowych aplikacji zewnętrznych |
