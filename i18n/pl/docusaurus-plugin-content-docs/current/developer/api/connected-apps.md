---
title: "Połączone aplikacje i OAuth"
---

# Połączone aplikacje i OAuth

<div class="article-intro">

Interfejs API B1 obsługuje OAuth 2.0, dzięki czemu aplikacja zewnętrzna może poprosić każdego administratora kościoła o zgodę na dostęp do jego danych, bez udostępniania hasła ani klucza API. **Połączona aplikacja** to token OAuth zatwierdzony przez administratora kościoła. Jego unieważnienie odcina dostęp aplikacji zewnętrznej jednym kliknięciem. Tej ścieżki używaj w przypadku łączników SaaS dla wielu najemców. W przypadku integracji z jednym kościołem lepiej użyć [Kluczy API](./api-keys).

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Klient OAuth musi zostać zarejestrowany, zanim kościoły będą mogły mu przyznać dostęp. Zrobi to administrator serwera B1 lub sam klient przez [dynamiczną rejestrację](#dynamic-client-registration)
- Wszystkie punkty końcowe OAuth znajdują się w module Membership: `/membership/oauth/...`
- Tokeny dostępu to JWT. Zawierają uprawnienia użytkownika przefiltrowane według przyznanych zakresów

</div>

## Pojęcia

| Termin | Znaczenie |
|---|---|
| **Klient OAuth** | Sama aplikacja zewnętrzna, identyfikowana przez `client_id` i zabezpieczona przez `client_secret`. Jest zarejestrowana raz w B1 i współdzielona przez wszystkie kościoły, które ją instalują. |
| **Połączona aplikacja** | Konkretna para `(klient, administrator kościoła)`, w której administrator przyznał klientowi dostęp. Każda połączona aplikacja opiera się na tokenie odświeżania OAuth. |
| **Token dostępu** | Krótkotrwały JWT (≈ 7 dni), którego klient używa do wywołań API. Ma ten sam format co JWT użytkownika: `Authorization: Bearer <jwt>`. |
| **Token odświeżania** | Długotrwały, nieprzejrzysty ciąg znaków (≈ 90 dni), którego klient używa do wygenerowania nowych tokenów dostępu. |
| **Zakres** | Ogranicza to, co token dostępu może robić. Zobacz [katalog zakresów](./api-keys#scopes). |

## Przepływy autoryzacji

B1 obsługuje trzy przepływy OAuth, wszystkie zdefiniowane w RFC 6749 i RFC 8628.

### Kod autoryzacji (aplikacje internetowe)

Używaj, gdy Twoja aplikacja ma komponent po stronie serwera i może zachować `client_secret` w tajemnicy.

1. **Autoryzacja**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Klienci publiczni (bez `client_secret`) muszą dodatkowo wysłać `"code_challenge": "..."` oraz `"code_challenge_method": "S256"` (PKCE, RFC 7636). Akceptowana jest tylko wartość `S256`.

   Zwraca `{ "code": "...", "state": "xyz" }`. Punkt końcowy kodu autoryzacji celowo wymaga uwierzytelnionego żądania POST. Twoja aplikacja pobiera JWT użytkownika B1 (zwykle przez przycisk umieszczony w jego sesji B1) i przekazuje go w ramach kroku wyrażenia zgody.

2. **Wymiana kodu na tokeny**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Jeśli krok autoryzacji wysłał `code_challenge`, dołącz pasujący `"code_verifier": "..."`. Klient publiczny wysyła weryfikator i pomija `client_secret`. Punkt końcowy tokenów akceptuje treść w formacie JSON lub zakodowaną w formularzu (`application/x-www-form-urlencoded`).

   Zwraca odpowiedź z tokenami:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Odśwież** token, gdy token dostępu zbliża się do wygaśnięcia:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Token odświeżania wygasa po 90 dniach nieużywania. Jeśli wygasł, administrator kościoła musi ponownie wyrazić zgodę.

### Kod urządzenia (telewizory, kioski, CLI)

Używaj, gdy urządzenie nie ma przeglądarki. Zdefiniowane w RFC 8628.

1. **Zażądaj kodu urządzenia**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Zwraca kod widoczny dla użytkownika oraz interwał odpytywania:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Wyświetl użytkownikowi `user_code` i `verification_uri`.

3. **Odpytuj** `/membership/oauth/token` z `grant_type=urn:ietf:params:oauth:grant-type:device_code` i `device_code`. Standardowe odpowiedzi:

   | Błąd | Znaczenie |
   |---|---|
   | `authorization_pending` | Użytkownik jeszcze nie zatwierdził żądania. Kontynuuj odpytywanie w sugerowanym interwale |
   | `expired_token` | Kod urządzenia przekroczył `expires_in`. Zacznij od nowa |
   | `access_denied` | Użytkownik odrzucił żądanie |
   | _(brak, 200 OK)_ | Zatwierdzono. Treść to `B1TokenResponse` |

4. Po zatwierdzeniu zapisz `refresh_token` i używaj `access_token` do czasu jego wygaśnięcia.

Zestaw B1 SDK zawiera `B1OAuthClient.awaitDeviceToken(...)`, która za Ciebie uruchamia pętlę odpytywania z poprawnym, zgodnym z RFC mechanizmem wydłużania odstępów między próbami (backoff).

### Token odświeżania

Jest zawsze dostępny jako samodzielne żądanie, gdy masz `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Zwracane są nowe `access_token` i `refresh_token`. **Klienci publiczni** (bez `client_secret`) mogą pominąć `client_secret` przy odświeżaniu. Jest to przydatne w przypadku aplikacji OAuth na urządzenia mobilne i komputery, które nie mogą zachować sekretu.

Tokeny odświeżania są rotowane, ale stary token nie zostaje od razu odrzucony. Jeśli klient nigdy nie otrzyma odpowiedzi na odświeżenie (na przykład telewizor, który w trakcie żądania stracił zasilanie lub Wi-Fi), może ponowić próbę ze poprzednim `refresh_token` przez maksymalnie **7 dni**. Ponowienie powiedzie się tylko wtedy, gdy token zastępczy nie został jeszcze użyty. Nieużyty token zastępczy jest wtedy odrzucany i wystawiana jest nowa para tokenów. Gdy sam token zastępczy został już odświeżony, stary token zwraca `invalid_grant`. Unieważnienie połączenia unieważnia też wszystkie rotowane tokeny, które wciąż mieszczą się w tym oknie karencji, a lista połączonych aplikacji pokazuje każde połączenie tylko raz.

## Budowa tokenu

Token dostępu to JWT wydany przez B1, identyczny z tym, który użytkownik otrzymałby z `POST /membership/users/login`. Ma ten sam modularny atrybut uprawnień i to samo zachowanie `checkAccess` w każdym kontrolerze. **Różni się tylko tym**, że tablica uprawnień została przefiltrowana przez przyznane zakresy w chwili wydania. Token dostępu o ograniczonym zakresie nie może zrobić nic, czego nie mógłby zrobić podobnie ograniczony klucz API. W żadnym kontrolerze nie istnieje osobna „ścieżka OAuth”. `actionWrapper` nie wie, czy posiadaczem tokenu jest osoba, klucz API czy klient OAuth.

## Połączone aplikacje (dla użytkowników)

Z perspektywy administratora kościoła „Połączone aplikacje” to lista aplikacji, którym przyznano dostęp do jego kościoła. Każdy wiersz to aktywna para `(OAuthClient, OAuthToken)`.

W B1Admin **Settings → Developer → Connected Apps** pokazuje:

- Nazwę klienta
- Zakresy zatwierdzone przez administratora
- Datę przyznania dostępu
- Przycisk **Revoke**

| Metoda i ścieżka | Uwierzytelnianie | Cel |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Wyświetla aktywne połączenia wywołującego (wraz z nazwą klienta i zakresami) |
| `DELETE /membership/oauth/connections/:id` | JWT | Unieważnia połączenie na podstawie identyfikatora tokenu OAuth. Token przestaje działać przy następnym żądaniu |

Lista automatycznie pomija wygasłe tokeny.

## Zakresy i zgoda

Ciągi zakresów to ten sam katalog co w [kluczach API](./api-keys#scopes). Najlepsze praktyki dla klientów:

- **Żądaj najwęższych zakresów, które wystarczą.** Kościoły zauważą, jeśli poprosisz o `donations:write`, gdy potrzebujesz tylko odczytu danych osób.
- **Używaj tokenu odświeżania i krótkotrwałych tokenów dostępu.** Długotrwałe tokeny dostępu trudniej szybko unieważnić.
- **Zawsze pokazuj przyznane zakresy użytkownikowi** w swoim interfejsie, aby mógł sprawdzić, na co wyraził zgodę.

## Zarządzanie klientami OAuth

Klienci OAuth (same aplikacje zewnętrzne) są rejestrowani globalnie. Klienta poufnego z `client_secret` tworzy administrator serwera B1. Aby wdrożyć taki klient, skontaktuj się z zespołem ChurchApps, aby otrzymać parę `client_id` / `client_secret`, i zarejestruj swoje URI przekierowania. Klienci publiczni, tacy jak łączniki MCP, mogą rejestrować się sami (patrz niżej).

Zarejestrowane URI przekierowania muszą dokładnie odpowiadać `redirect_uri` w żądaniu. Dopasowanie prefiksu lub częściowe dopasowanie jest odrzucane.

| Metoda i ścieżka | Uprawnienie | Opis |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Wyświetla wszystkich klientów OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Pobiera klienta po jego publicznym identyfikatorze (sekret jest ukryty) |
| `POST /membership/oauth/clients` | Server.Admin | Tworzy lub aktualizuje klienta |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Usuwa klienta |

### Dynamiczna rejestracja klienta

`POST /membership/oauth/register` (publiczny, RFC 7591) pozwala klientowi, takiemu jak łącznik MCP claude.ai, zarejestrować się samodzielnie. Punkt końcowy jest ogłaszany w dokumencie `/.well-known/oauth-authorization-server` API. Zobacz [Serwer MCP → Wykrywanie OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Zwraca kod 201 z `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) oraz `token_endpoint_auth_method: "none"`.

- Sekret nigdy nie jest wydawany, więc klient musi używać PKCE przy każdej autoryzacji.
- `redirect_uris` muszą być 1–10 adresami `https` lub adresami `http` na `localhost`, `127.0.0.1` lub `[::1]`.
- `client_name` jest przycinana do 45 znaków (domyślnie "AI assistant").
- Limit wynosi 20 rejestracji na godzinę z jednego adresu IP.

Na stronie zgody w B1Admin samodzielnie zarejestrowany klient wyświetla powiadomienie, że zarejestrował się sam. Taki klient nigdy nie może zrobić więcej, niż może konto B1 samego użytkownika. Można go odłączyć w **Settings → Developer → Connected Apps**.

## Obsługa SDK

Pakiet `@churchapps/integration-sdk` opakowuje każdy przepływ OAuth typowanymi funkcjami pomocniczymi: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` i `.awaitDeviceToken()`. Zobacz README pakietu oraz [Webhooki](./webhooks#sdk-support), gdzie znajduje się kompletny przykład od początku do końca.
