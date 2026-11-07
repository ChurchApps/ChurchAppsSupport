---
title: "Punkty integracji i rozszerzeń"
---

# Punkty integracji i rozszerzeń

<div class="article-intro">

Wszystko, co zewnętrzna strona może podłączyć, działa przez jedno API i jeden model autoryzacji. Ta strona jest mapą: wymienia wszystkie punkty integracji, pokazuje, jak się ze sobą łączą, i linkuje do szczegółowej dokumentacji każdego z nich. Jeśli tworzysz coś dla B1, zacznij tutaj, aby wybrać właściwe wejście, a następnie przejdź do strony, która opisuje je szczegółowo.

</div>

## Przegląd powierzchni

Jest sześć sposobów wejścia i wyjścia, a wszystkie korzystają z tej samej warstwy autoryzacji:

- **[REST API](../api/api-keys)** — cała powierzchnia produktu, dostępna z dowolnego języka za pomocą tokena bearer.
- **[Klucze API](../api/api-keys)** — najprostsze poświadczenie: token `cak_…` powiązany z jedną osobą w jednym kościele.
- **[OAuth 2.0 i połączone aplikacje](../api/connected-apps)** — zgoda wydawana przez każdy kościół osobno, dla aplikacji wielodostępnych; wydaje ten sam JWT, który dostaje użytkownik.
- **[Webhooki](../api/webhooks)** — podpisane zdarzenia wychodzące, dostarczane w sposób trwały.
- **[Serwer MCP](../api/mcp)** — warstwa dla AI nad REST API, pod adresem `/mcp`.
- **[Dostawcy treści](../freeplay-content-provider)** — ścieżka przychodząca dla zewnętrznych bibliotek mediów do FreePlay i aplikacji B1.

Wszystko oprócz dostawców treści obsługuje jedno monolityczne API (repozytorium [Api](https://github.com/ChurchApps/Api)), którego moduły są montowane pod stałymi ścieżkami bazowymi: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` i `/mcp`.

## Jak to wszystko się łączy

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Aplikacja zewn.     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · serwer / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Arkusze Google    │                          │  │   klucz cak_ ─┐                  │  │
   │  · CLI / skrypty     │                          │  │   JWT OAuth  ┴▶ Principal        │  │
   │  · klient AI (MCP)   │ ─── POST /mcp ──────────▶ │  │   zakresy filtrują → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Moduły API: /membership /giving      │
             │        podpisany JSON POST             │  /attendance /content /messaging …    │
             │   (osoba / dar / grupa / …)            │                   │                    │
             └──────────── webhooki ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (trwałe, podpisane HMAC-SHA256)  └───────────────────────────────────────┘

   Zewnętrzne źródła treści (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / przepływ urządzenia / brak  ──  tu B1 jest klientem OAuth  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / aplikacje B1      (ścieżka treści przychodzącej)
```

Trzy strzałki opowiadają całą historię: strona trzecia **wywołuje** API z tokenem bearer (kluczem API lub JWT OAuth, również przez `/mcp`); API **wywołuje zwrotnie** przez podpisane webhooki; a dostawcy treści to jedyna ścieżka **przychodzącej treści**, w której sam B1 jest klientem OAuth pobierającym media z zewnętrznego źródła.

## Wspólny model autoryzacji

Każde poświadczenie (JWT logowania użytkownika, token dostępu OAuth lub klucz API) rozwiązuje się do **tego samego `Principal`** i jest sprawdzane w ten sam sposób. Nie ma osobnej ścieżki „autoryzacji integracji”: poświadczenie o ograniczonym zakresie jest po prostu nie do odróżnienia od użytkownika o niższych uprawnieniach.

### Struktura JWT

Tokeny dostępu B1 to JWT HS256 wystawiane w `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Zestaw claimów:

| Claim | Znaczenie |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Osoba stojąca za tokenem |
| `churchId` | Jedyny kościół, w którym działa ten token; punkt zakotwiczenia dla całego zakresu danych |
| `personId` | Rekord osoby w tym kościele |
| `permissions` | Płaska tablica ciągów uprawnień RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Członkostwo w grupach i ich prowadzenie, do sprawdzeń na poziomie grupy |
| `membershipStatus` | Gość czy członek, do kontroli samoobsługi |

Token dostępu OAuth ma dokładnie taki sam kształt jak JWT logowania. Jedyna różnica polega na tym, że jego tablica `permissions` została **przefiltrowana przez przyznane zakresy przed podpisaniem** (`getCombinedApiJwt(...)`).

### Zakres per kościół

`churchId` jest claimem tokena, a nie parametrem żądania, więc poświadczenie nigdy nie może sięgnąć do danych innego kościoła. Każde zapytanie do repozytorium filtruje po `churchId` wywołującego; klucz API lub token OAuth jest powiązany z dokładnie jednym kościołem w chwili wystawienia.

### Uprawnienia oparte na rolach na granicy API

Kontrolery sprawdzają działania za pomocą `au.checkAccess(contentType, action)` względem tablicy `permissions` tokena. Zakresy są **filtrem, nigdy nie przyznają uprawnień** (`Api/src/shared/auth/Scopes.ts`). `SCOPE_CATALOG` mapuje każdy zakres (np. `people:read`, `donations:write`) na pary RBAC, które dopuszcza, a `filterPermissionsByScopes()` za każdym razem, gdy poświadczenie jest rozwiązywane, przecina je z *aktualnymi* uprawnieniami osoby. Z tego wynika:

- Odebranie uprawnienia w B1Admin odcina dostęp poświadczenia przy następnym żądaniu; tokeny nigdy nie rozjeżdżają się z rolą.
- Zakres może jedynie *usuwać* uprawnienia, więc poświadczenie o ograniczonym zakresie nigdy nie może podnieść uprawnień do administracji serwerem lub domeną (te uprawnienia celowo nie są mapowane na żaden zakres).
- Klucze API mają prefiks `cak_`; `CustomAuthProvider.getUser()` rozpoznaje go, haszuje sekret i przy każdym wywołaniu ponownie rozwiązuje aktualne uprawnienia RBAC właściciela.

Pełny katalog zakresów znajdziesz w [Klucze API → Zakresy](../api/api-keys#scopes).

## Przegląd powierzchni API

### REST API

Pełna powierzchnia produktu. Każdy uwierzytelniony endpoint akceptuje w nagłówku `Authorization: Bearer` albo JWT, albo klucz API `cak_…`. Nie istnieje osobna tabela tras tylko dla kluczy ani tylko dla OAuth. Moduły i ich ścieżki bazowe znajdują się w `Api/src/modules/*`.

### Klucze API

Osobisty token dostępu `cak_<prefix>.<secret>`, tworzony w **B1Admin → Settings → Developer → API Keys**. Przechowywany jest wyłącznie hash SHA-256; surowy klucz jest pokazywany tylko raz. Zarządzany pod `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Najlepszy do własnych skryptów jednego kościoła oraz do konektorów takich jak Zapier, Make i Arkusze Google. → **[Klucze API](../api/api-keys)**

### OAuth 2.0 i połączone aplikacje

Dla aplikacji wielodostępnych, którym każdy kościół musi wyrazić zgodę. Zaimplementowane w `Api/src/modules/membership/controllers/OAuthController.ts` pod `/membership/oauth`. Serwer obsługuje trzy typy grantów:

- **Authorization Code**: `POST /oauth/authorize` (wymaga uwierzytelnienia) zwraca krótkotrwały kod; `POST /oauth/token` z `grant_type=authorization_code` wymienia go na JWT dostępu (ok. 7 dni) i token odświeżania (ok. 90 dni). Klienci publiczni (bez sekretu) muszą używać PKCE (wyłącznie `S256`): `code_challenge` przy autoryzacji i pasujący `code_verifier` przy wymianie tokena.
- **Device Code** (RFC 8628): `POST /oauth/device/authorize` wystawia `user_code`; użytkownik zatwierdza go w B1Admin (`/oauth/device/approve`); urządzenie odpytuje `/oauth/token` z grantem device-code. Przeznaczone dla telewizorów, kiosków i CLI bez przeglądarki.
- **Refresh Token**: `grant_type=refresh_token` wystawia nowy token dostępu; klienci publiczni (bez sekretu) mogą pominąć sekret.

Klienci publiczni mogą też samodzielnie się zarejestrować przez `POST /oauth/register` (dynamiczna rejestracja klienta, RFC 7591). Otrzymują `client_id` bez sekretu, a ich URI przekierowania muszą używać `https` lub adresu pętli zwrotnej (loopback).

**Połączona aplikacja** to widok przyznanego tokena z perspektywy administratora kościoła; jest wyświetlana i może być cofnięta pod `/membership/oauth/connections`. Kontroler obsługuje też most sesji relay OAuth (`/oauth/relay/*`), który pozwala urządzeniu bez przeglądarki dokończyć logowanie u *zewnętrznego* dostawcy. → **[Połączone aplikacje i OAuth](../api/connected-apps)**

### Webhooki

Jedyna powierzchnia wychodząca. Kościół subskrybuje publiczny endpoint HTTPS dla zdarzeń. Gdy zajdzie pasująca zmiana, `WebhookDispatcher.emit(churchId, event, payload)` uzupełnia payloady zawierające tylko identyfikatory o nazwy wyświetlane (`personName`, `groupName`, `formName`; wyszukiwania wykonywane są tylko wtedy, gdy pasuje subskrypcja), zapisuje dostarczenie, a w tle worker wysyła podpisany envelope JSON, z ponawianiem i opóźnieniem (backoff). Silnik znajduje się w `Api/src/shared/webhooks/`, a zarządzanie webhookami dla kościoła pod `/membership/webhooks` (`WebhookController.ts`). Pole `connectorType` przekształca treść dla Slacka i Discorda; konektor `mailchimp` idzie dalej i sam obsługuje całą wymianę HTTP (metoda, URL i uwierzytelnienie dla każdego zdarzenia przez API Mailchimp; poświadczenia są szyfrowane w `webhooks.connectorConfig`). → **[Webhooki](../api/webhooks)**

### Serwer MCP

Warstwa dla AI pod `/mcp` (`Api/src/modules/mcp/`). Trzy ogólne narzędzia: `list_endpoints`, `describe_endpoint` i `api_call` udostępniają dynamicznie całą powierzchnię REST każdemu klientowi MCP. Uwierzytelnianie jest takie samo jak dla wszystkiego innego: token bearer. Dla klientów logujących się przez OAuth (niestandardowe konektory claude.ai) odpowiedź 401 z `/mcp` zawiera nagłówek `WWW-Authenticate` wskazujący na `/.well-known/oauth-protected-resource`, a `/.well-known/oauth-authorization-server` ogłasza endpointy `/membership/oauth`, dynamiczną rejestrację, PKCE oraz stronę zgody B1Admin pod `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` ponownie wchodzi do stosu Express w tym samym procesie, dzięki czemu wszystkie reguły uprawnień i zakresu kościoła nadal obowiązują. → **[Serwer MCP](../api/mcp)**

### Dostawcy treści

Ścieżka treści przychodzącej, zaimplementowana w osobnym pakiecie `Packages/content-providers` (`@churchapps/content-providers`), a nie w API. Każdy dostawca implementuje interfejs `IProvider` (`src/interfaces.ts`): `browse`, `getPlaylist`, `getInstructions` oraz hooki uwierzytelniania, i sam rejestruje się w rejestrze typu `Map` (`src/providers/registry.ts`). Tutaj **B1 jest klientem OAuth**: dostawca deklaruje `AuthType` jako `none`, `oauth_pkce`, `device_flow` lub `form_login`, a wspólne pomocniki (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) przeprowadzają po stronie klienta PKCE lub przepływ urządzenia względem zewnętrznego źródła. Obecnie dostępnych jest jedenastu dostawców, m.in. Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church i B1.church; zasilają oni FreePlay i aplikacje B1. → **[Dostawca treści FreePlay](../freeplay-content-provider)**

**Plany roczne** korzystają z tej ścieżki. Wydawca materiałów (z uprawnieniem `lessons.edit`) utrzymuje uporządkowane sekwencje tygodni 1/2/3 w panelu administracyjnym Lessons.church (tabele `yearPlans` i `yearPlanWeeks` w `LessonsApi`, z opcjonalnym `startMonth` oraz `anchor` dla każdego tygodnia: `easter` lub `christmas`). `GET /yearPlans/public` w LessonsApi udostępnia aktywne plany anonimowo, uzupełniając program, studium i miejsce każdego tygodnia z drzewa lekcji. Sekcja **Serving → Plans → Schedule Lesson → Apply Year Plan** w B1Admin korzysta z tego endpointu i zapisuje jeden plan DoingApi na każdy uwzględniony tydzień (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Plany z `startMonth` rozwiązują kotwiczone tygodnie względem wybranego roku (Wielkanoc według algorytmu Gaussa, Boże Narodzenie jako niedziela przypadająca 25 grudnia lub wcześniej) i wypełniają przedziały między nimi; plany bez `startMonth` nadal przypisują tydzień N do `startDate + (N−1)×7` dni. Tygodnie z zewnętrznych dostawców OLF lub z niepełną ścieżką są pomijane w chwili zastosowania; kościoły edytują powstałe plany jak każde inne, a FreePlay odtwarza to, co znajduje się w planie.

## Podsumowanie

| Powierzchnia | Mechanizm uwierzytelniania | Kierunek | Miejsce implementacji | Dokumentacja |
|---|---|---|---|---|
| REST API | JWT `Bearer` lub klucz `cak_…` | Przychodzący | `Api/src/modules/*` | [Klucze API](../api/api-keys) |
| Klucze API | Token `cak_` z hashem SHA-256 | Poświadczenie | `Api/.../membership/controllers/ApiKeyController.ts` | [Klucze API](../api/api-keys) |
| OAuth 2.0 / połączone aplikacje | Kod autoryzacji (PKCE) · urządzenie · odświeżanie → JWT; dynamiczna rejestracja klienta | Przychodzący | `Api/.../membership/controllers/OAuthController.ts` | [Połączone aplikacje](../api/connected-apps) |
| Webhooki | Sekret per hook, podpis HMAC-SHA256 | Wychodzący | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooki](../api/webhooks) |
| Serwer MCP | JWT `Bearer`, JWT OAuth (odkrywany przez `/.well-known`) lub klucz `cak_…` | Przychodzący (AI) | `Api/src/modules/mcp/` | [Serwer MCP](../api/mcp) |
| Dostawcy treści | Zależnie od dostawcy: brak / OAuth PKCE / urządzenie / formularz | Przychodzące treści | `Packages/content-providers/` | [Dostawca treści](../freeplay-content-provider) |

## Gotowe konektory

Zamiast budować wszystko od zera, ChurchApps dostarcza konektory działające na powyższych powierzchniach:

- **[Slack i Discord](/docs/b1-admin/integrations/slack-discord)**: typ konektora `webhook` przekształca standardowy envelope w wiadomość czatu; konfigurowany w całości w B1Admin, bez konta u zewnętrznego dostawcy.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)**: typ konektora `mailchimp` synchronizuje osoby z listą odbiorców Mailchimp i mapuje członkostwo w grupach i listach na tagi (`Api/src/shared/webhooks/MailchimpConnector.ts`). W przeciwieństwie do konektorów czatu sam wysyła uwierzytelnione żądania dla każdego zdarzenia (upsert, archiwizacja, tagowanie), zamiast wysyłać POST na URL podany przez kościół. Klucz API i identyfikator listy są przechowywane zaszyfrowane w `webhooks.connectorConfig`. Synchronizacja jest jednokierunkowa i obejmuje wyłącznie standardowe pola scalania.
- **[Zapier](/docs/b1-admin/integrations/zapier)** i **[Make](/docs/b1-admin/integrations/make)**: uruchamiają się na zdarzeniach webhooków i działają przez REST API. Po włączeniu Zap lub scenariusza rejestrują własny webhook (wymagany klucz z uprawnieniem `settings:write`). Kod źródłowy aplikacji Zapier znajduje się w repozytorium `Integrations`, w katalogu `zapier/` (CLI Zapier, wdrażane poleceniem `zapier push`).
- **[Arkusze Google](/docs/b1-admin/integrations/google-sheets)**: dodatek uwierzytelniany kluczem API, który na żądanie eksportuje dane osób, darowizn, grup i obecności.
- **[Claude](/docs/b1-admin/integrations/claude)** i **[ChatGPT](/docs/b1-admin/integrations/chatgpt)**: klienci MCP wskazujący na `/mcp`.

Do własnego kodu pakiet **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) opakowuje to wszystko: typowany klient REST, klient OAuth (kod autoryzacji, odświeżanie, przepływ urządzenia) oraz weryfikator webhooków HMAC z middleware dla Express.

## Powiązane strony

- [Klucze API](../api/api-keys): najprostsze poświadczenie i katalog zakresów
- [Połączone aplikacje i OAuth](../api/connected-apps): przepływy zgody dla aplikacji wielodostępnych
- [Webhooki](../api/webhooks): system zdarzeń wychodzących
- [Serwer MCP](../api/mcp): warstwa integracji z AI
- [Dostawca treści FreePlay](../freeplay-content-provider): jak zostać źródłem treści przychodzącej
- [Integracje (dla użytkowników końcowych)](/docs/b1-admin/integrations/): przewodniki konfiguracji gotowych konektorów
