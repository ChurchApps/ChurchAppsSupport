---
title: "Uwierzytelnianie i uprawnienia"
---

# Uwierzytelnianie i uprawnienia

<div class="article-intro">

API ChurchApps używa uwierzytelniania opartego na JWT. Użytkownicy logują się, aby otrzymać token, który zawiera ich tożsamość, przynależność do kościoła i uprawnienia. Ta strona opisuje przebieg uwierzytelniania, model uprawnień oraz obsługę OAuth.

</div>

## Przebieg logowania

### Standardowe logowanie

```
POST /membership/users/login
```

**Uwierzytelnianie:** Publiczny

Akceptuje jeden z trzech typów poświadczeń:

| Pole | Opis |
|-------|-------------|
| `email` + `password` | Standardowe logowanie e-mailem i hasłem |
| `jwt` | Ponowne uwierzytelnienie istniejącym JWT |
| `authGuid` | Jednorazowy link uwierzytelniający (używany w e-mailach powitalnych i resetowania hasła) |

**Odpowiedź:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

Pole `token` to JWT, który należy wysyłać w nagłówku `Authorization: Bearer <token>` w kolejnych żądaniach.

### Logowanie dwuskładnikowe

Użytkownicy mogą włączyć logowanie dwuskładnikowe oparte na aplikacji uwierzytelniającej (TOTP). W przypadku tych użytkowników logowanie przez `email` + `password`, `authGuid` lub SSO nie zwraca tokenu. Zamiast tego odpowiedź zawiera wyzwanie:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Token wyzwania jest ważny przez 5 minut. Wyślij go ponownie na ten sam endpoint wraz z kodem:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` może być aktualnym 6-cyfrowym kodem z aplikacji uwierzytelniającej lub jednym z dziesięciu jednorazowych kodów zapasowych użytkownika. Błędny kod zwraca `Invalid code`, a powtarzające się niepowodzenia są ograniczane w czasie dla każdego konta. Ponowne logowanie przez `jwt` nigdy nie wymaga wyzwania, dzięki czemu istniejące sesje są nadal odświeżane. Obiekt `user` w odpowiedzi logowania zawiera pole `mfaEnabled`.

Endpointy samoobsługowe (tylko dla zalogowanego użytkownika, w ścieżce `/membership/users/mfa`):

| Endpoint | Opis |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Rozpoczyna konfigurację; zwraca `{ secret, otpauthUrl }` dla kodu QR |
| `POST /enable` | Treść `{ code }`; włącza funkcję i jednorazowo zwraca `{ backupCodes }` |
| `POST /disable` | Treść `{ code }` (kod z aplikacji lub kod zapasowy); wyłącza funkcję |
| `POST /reset/:userId` | Tylko Server.Admin; wyłącza funkcję dla innego użytkownika |

Sekrety są przechowywane w formie zaszyfrowanej, a kody zapasowe jako skróty (hashe). Włączenie, wyłączenie i reset są zapisywane w dzienniku audytu.

### Zawartość tokenu

JWT zawiera:
- `id` — identyfikator użytkownika
- `churchId` — aktualnie wybrany kościół
- `personId` — rekord osoby dla wybranego kościoła
- Tablice uprawnień dla każdego API

### Wybór kościoła

Użytkownik może należeć do wielu kościołów. Odpowiedź logowania zawiera wszystkie kościoły wraz z uprawnieniami. Aby zmienić kościół, klient generuje nowy JWT ograniczony do innego kościoła, na podstawie danych z odpowiedzi logowania.

## Rejestracja użytkownika

### Rejestracja nowego użytkownika

```
POST /membership/users/register
```

**Uwierzytelnianie:** Publiczny

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Tworzy użytkownika z tymczasowym hasłem i wysyła e-mail powitalny z linkiem uwierzytelniającym. Pierwszy użytkownik zarejestrowany w nowej instancji automatycznie otrzymuje dostęp administratora serwera.

Akceptowane są dwa opcjonalne pola zabezpieczające przed botami: `website` (ukryte pole-pułapka, które prawdziwi użytkownicy pozostawiają puste) oraz `fillMs` (czas, przez jaki formularz był otwarty, w milisekundach). Jeśli pole `website` zostanie wypełnione lub `fillMs` będzie mniejsze niż 2000, konto nie zostanie utworzone, ale endpoint nadal zwróci normalnie wyglądającą odpowiedź `200`, dzięki czemu boty nie będą mogły stwierdzić, że zostały odrzucone. Klienci pomijający oba pola są rejestrowani w zwykły sposób.

### Rejestracja nowego kościoła

```
POST /membership/churches/add
```

**Uwierzytelnianie:** JWT

Po zarejestrowaniu użytkownika wywołaj ten endpoint, aby utworzyć kościół i powiązać z nim użytkownika.

## Zarządzanie hasłami

| Metoda | Ścieżka | Uwierzytelnianie | Opis |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Publiczny | Wysyła e-mail z resetem hasła. Treść: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Publiczny | Ustawia nowe hasło przy użyciu GUID-a uwierzytelniającego z e-maila resetującego. Treść: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Zmienia hasło bieżącego użytkownika. Treść: `{ "newPassword": "..." }` |

## Model uprawnień

Uprawnienia są pogrupowane według modułów i przypisywane użytkownikom przez role. Każde uprawnienie ma **typ zawartości** i **akcję**.

### Opis uprawnień

| Sekcja wyświetlana | Typ zawartości | Akcja | Opis |
|----------------|--------------|--------|-------------|
| **Frekwencja** | Attendance | Checkin | Zamelduj członków na nabożeństwach |
| | Attendance | Edit | Edytuj rekordy frekwencji |
| | Services | Edit | Zarządzaj nabożeństwami i godzinami nabożeństw |
| | Attendance | View | Przeglądaj rekordy frekwencji |
| | Attendance | View Summary | Przeglądaj podsumowania frekwencji i raporty |
| **Darowizny** | Donations | Edit | Twórz i edytuj rekordy darowizn |
| | Settings | Edit | Edytuj ustawienia dawania i płatności |
| | Donations | View Summary | Przeglądaj raporty podsumowujące darowizny |
| | Donations | View | Przeglądaj poszczególne rekordy darowizn |
| **Osoby i grupy** | Forms | Admin | Pełne zarządzanie formularzami |
| | Forms | Edit | Edytuj definicje formularzy |
| | Plans | Edit | Edytuj plany nabożeństw |
| | Group Members | Edit | Dodawaj i usuwaj członków grup |
| | Groups | Edit | Twórz i edytuj grupy |
| | Households | Edit | Edytuj przypisania do gospodarstw domowych |
| | People | Edit | Edytuj dowolny rekord osoby |
| | People | Edit Self | Edytuj tylko własny rekord osoby |
| | Roles | Edit | Zarządzaj rolami i przypisaniami użytkowników |
| | Group Members | View | Przeglądaj listy członków grup |
| | People | View Members | Przeglądaj tylko członków (nie odwiedzających) |
| | People | View | Przeglądaj wszystkie osoby |
| | Roles | View | Przeglądaj role i przypisania |
| | Settings | Edit | Edytuj ustawienia kościoła |
| **Treści** | Content | Edit | Edytuj strony, sekcje i elementy |
| | Settings | Edit | Edytuj ustawienia treści |
| | StreamingServices | Edit | Zarządzaj konfiguracją usług streamingowych |
| | Chat | Host | Prowadź i moderuj sesje czatu |
| **Wiadomości** | Texting | Send | Wysyłaj wiadomości SMS |

### Jak sprawdzane są uprawnienia

W kontrolerach uprawnienia są sprawdzane metodą `au.checkAccess()`:

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Server Admin

Uprawnienie `Server.Admin` przyznaje pełny dostęp do wszystkich kościołów. Jest przypisywane pierwszemu zarejestrowanemu użytkownikowi i może zostać nadane innym przez rolę administratora serwera.

## OAuth 2.0

API obsługuje OAuth 2.0 dla integracji zewnętrznych. Dostępne są dwa typy przyznawania uprawnień (grant types).

### Przepływ kodu autoryzacji

1. **Autoryzacja:** `POST /membership/oauth/authorize` (wymagany JWT)
   - Treść: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, wyłącznie `S256`) są wymagane dla klientów publicznych bez sekretu
   - Zwraca: `{ "code": "...", "state": "..." }`

2. **Wymiana kodu na token:** `POST /membership/oauth/token` (Publiczny)
   - Treść: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Wyślij `code_verifier`, jeśli w kroku autoryzacji użyto `code_challenge`; klienci publiczni pomijają `client_secret`. Akceptowane są treści w formacie JSON lub form-encoded
   - Zwraca: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Odświeżenie tokenu:** `POST /membership/oauth/token` (Publiczny)
   - Treść: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Tokeny dostępu wygasają po **12 godzinach**.

### Przepływ kodu urządzenia (RFC 8628)

Dla urządzeń bez przeglądarki (aplikacje telewizyjne, kioski):

1. **Żądanie kodu urządzenia:** `POST /membership/oauth/device/authorize` (Publiczny)
   - Treść: `{ "client_id": "...", "scope": "..." }`
   - Zwraca: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Użytkownik wpisuje kod** pod adresem weryfikacji i zatwierdza lub odrzuca żądanie

3. **Odpytywanie o token:** `POST /membership/oauth/token` (Publiczny)
   - Treść: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Zwraca `authorization_pending`, dopóki żądanie nie zostanie zatwierdzone, a następnie zwraca token dostępu

### Zarządzanie klientami OAuth

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Wyświetl wszystkich klientów OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Pobierz klienta po ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Pobierz klienta po identyfikatorze klienta (sekret ukryty) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Utwórz lub zaktualizuj klienta |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Usuń klienta |
| POST | `/membership/oauth/register` | Publiczny | — | Dynamiczna rejestracja klienta (RFC 7591) dla klientów publicznych, takich jak konektory MCP. Zobacz [Połączone aplikacje](../connected-apps#dynamic-client-registration) |

### Endpointy zatwierdzania urządzeń

| Metoda | Ścieżka | Uwierzytelnianie | Opis |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Pobierz informacje o oczekującym kodzie urządzenia dla interfejsu zatwierdzania |
| POST | `/membership/oauth/device/approve` | JWT | Zatwierdź autoryzację urządzenia. Treść: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Odrzuć autoryzację urządzenia. Treść: `{ "user_code": "..." }` |

## Endpointy publiczne i uwierzytelnione

API używa dwóch funkcji opakowujących, które określają wymagania uwierzytelniania:

- **`actionWrapper`** — wymaga prawidłowego JWT. Obiekt uwierzytelnionego użytkownika (`au`) jest dostępny wraz z `churchId`, `userId` i sprawdzaniem uprawnień.
- **`actionWrapperAnon`** — nie wymaga uwierzytelniania. Używany do logowania, rejestracji, publicznego wyszukiwania treści i odbiorników webhooków.

W tabelach endpointów w tej dokumentacji są one oznaczone odpowiednio jako **JWT** i **Publiczny** w kolumnie Uwierzytelnianie.

## Powiązane strony

- [Struktura modułów](../module-structure) — Jak organizowane są kontrolery, repozytoria i modele
- [Lokalna konfiguracja](../local-setup) — Uruchamianie API lokalnie na potrzeby programowania
