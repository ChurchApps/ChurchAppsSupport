---
title: "Endpointy Doing"
description: "Dokumentacja Doing API, obsługującego plany służby, przydziały wolontariuszy, zadania i automatyzacje w B1 Admin, ze ścieżkami, autoryzacją i uprawnieniami."
---

# Endpointy Doing

<div class="article-intro">

Moduł Doing zarządza planowaniem nabożeństw, grafikami wolontariuszy, zarządzaniem zadaniami i automatyzacjami. Udostępnia narzędzia do tworzenia planów nabożeństw z godzinami i pozycjami, przypisywania wolontariuszy, zarządzania datami niedostępności, budowania elementów porządku nabożeństwa, łączenia z zewnętrznymi dostawcami treści oraz konfigurowania zautomatyzowanych przepływów pracy z warunkami i akcjami.

</div>

**Ścieżka bazowa:** `/doing`

## Plany

Ścieżka bazowa: `/doing/plans`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich planów kościoła |
| GET | `/:id` | JWT | — | Pobiera plan według ID |
| GET | `/ids?ids=` | JWT | — | Pobiera wiele planów według ID oddzielonych przecinkami |
| GET | `/types/:planTypeId` | JWT | — | Pobiera plany według typu planu |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + edycja służby | Podgląd zestawienia, które **Wyślij SMS do wolontariuszy** wysyła w danym okresie: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` dla wolontariuszy przypisanych w zakresie dat (jedna osoba jeden raz; pomijane są osoby, które zrezygnowały z SMS-ów, oraz brakujące numery; współdzielone numery są deduplikowane; limit 200) |
| GET | `/presenter` | JWT | — | Pobiera plany na najbliższe 7 dni (widok prezentera) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Edycja służby | Aktywne przepływy potwierdzania przydziałów (`workflowType = "assignmentConfirmation"`), które plan może wybrać: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Publiczne | — | Pobiera bieżący plan dla typu planu |
| GET | `/public/signup/:churchId` | Publiczne | — | Plany otwarte na samodzielne zapisy, od najbliższego. Każdy zawiera pozycje do samodzielnych zapisów (sortowane według `categoryName`, a następnie `name`, wraz z `filledCount` przydziałów Accepted/Unconfirmed) oraz terminy. Bez nazwisk wolontariuszy. Gdy ustawienie kościoła `volunteerSignupNextOnly` ma wartość `"true"`, zwracany jest tylko pierwszy plan każdego typu. Każdy `plan` zawiera obliczone pole `signupDeadline` (znacznik czasu ISO lub `null`): `signupDeadlineHours` przed najwcześniejszym terminem typu `service` w planie (jeśli nie ma terminu nabożeństwa, to dowolny terminy z godziną; jeśli plan nie ma terminów, to 9:00 w strefie czasowej kościoła w dniu `serviceDate`) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` dla pozycji planu z samodzielnymi zapisami (wyświetlane nazwy osób z przydziałami Accepted/Unconfirmed). Zwraca `[]`, chyba że w planie włączono `showVolunteerNames` |
| POST | `/` | JWT | — | Tworzy lub aktualizuje plany (przyjmuje pojedynczy obiekt lub tablicę). Ustaw `confirmationWorkflowId`, aby włączyć plan do przepływu potwierdzania przydziałów, lub `null`, aby zrezygnować z niego w kolejnych żądaniach. Wyślij `signupDeadlineHours: null`, aby usunąć termin; pominięcie pola zachowuje zapisaną wartość |
| POST | `/copy/:id` | JWT | Edycja służby | Kopiuje plan wraz z pozycjami, terminami, przydziałami i elementami porządku nabożeństwa. Treść zawiera `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) oraz `copyServiceOrder` (wartość logiczna). Bez `targetPlanId` tworzony jest nowy plan, a `notes`, `signupDeadlineHours`, `showVolunteerNames` i `autoReplaceOnDecline` są przenoszone z planu źródłowego, chyba że treść żądania podaje ich wartości. Z `targetPlanId` kopia wypełnia istniejący plan (wywołujący musi mieć prawo do jego edycji). Opcja **Powtarzaj co tydzień** w B1Admin wywołuje tę operację raz w tygodniu, za każdym razem kopiując z planu utworzonego tydzień wcześniej |
| POST | `/textRange` | JWT | `texting.send` + edycja służby | Wysyła SMS-a do każdego wolontariusza przypisanego w zakresie dat przez dostawcę SMS kościoła. Treść: `{ startDate, endDate, ministryId, planTypeId?, message }` (wiadomość do 1600 znaków; pola scalania są rozwiązywane dla każdego odbiorcy). Zwraca liczby z podglądu oraz `recipientCount`, `successCount`, `failCount` i `error` (`no_provider` lub `insufficient_credits`), gdy wysyłanie zostanie przerwane wcześniej |
| POST | `/:id/issueRequests` | JWT | Edycja planu | Wysyła nowe przydziały planu w statusie Unconfirmed, o których nie powiadomiono, przez jego przepływ potwierdzania: oznacza każdy jako powiadomiony i uruchamia jedną kartę przepływu na przydział. Pusta treść; zwraca `{ issued }`. Kończy się błędem, jeśli plan nie jest opublikowany (nie jest `prepared`), nie ma aktywnego `confirmationWorkflowId` z co najmniej jednym krokiem lub minął termin odpowiedzi |
| POST | `/autofill/:id` | JWT | — | Automatycznie wypełnia przydziały wolontariuszy dla planu. Treść: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Usuwa plan oraz wszystkie powiązane terminy, przydziały, pozycje i elementy planu |

### Przykład: kopiowanie planu

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Typy planów

Ścieżka bazowa: `/doing/planTypes`

Rozszerza bazową klasę CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — bez sprawdzania uprawnień).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich typów planów |
| GET | `/:id` | JWT | — | Pobiera typ planu według ID |
| GET | `/ids?ids=` | JWT | — | Pobiera wiele typów planów według ID oddzielonych przecinkami |
| GET | `/ministryId/:ministryId` | JWT | — | Pobiera typy planów dla służby |
| POST | `/` | JWT | — | Tworzy lub aktualizuje typy planów |
| DELETE | `/:id` | JWT | — | Usuwa typ planu |

## Elementy planu

Ścieżka bazowa: `/doing/planItems`

Zarządza elementami porządku nabożeństwa (nagłówkami, sekcjami, pieśniami itp.) uporządkowanymi w strukturę drzewa nadrzędny–podrzędny.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | — | Pobiera element planu według ID |
| GET | `/ids?ids=` | JWT | — | Pobiera wiele elementów planu według ID oddzielonych przecinkami |
| GET | `/plan/:planId` | JWT | — | Pobiera wszystkie elementy planu (zwraca strukturę drzewa) |
| GET | `/presenter/:churchId/:planId` | Publiczne | — | Pobiera elementy planu do widoku prezentera (zwraca strukturę drzewa) |
| POST | `/` | JWT | — | Tworzy lub aktualizuje elementy planu |
| POST | `/sort` | JWT | — | Aktualizuje kolejność elementu planu (sortuje ponownie elementy na tym samym poziomie) |
| DELETE | `/:id` | JWT | — | Usuwa element planu |

## Kanał planu

Ścieżka bazowa: `/doing/planFeed`

Udostępnia kanały elementów planu dla prezentera. Jeśli nie istnieją żadne elementy planu, kanał jest automatycznie wypełniany z kanału miejsca Lessons.church przy użyciu `contentId` planu.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/presenter/:churchId/:planId` | Publiczne | — | Pobiera kanał planu dla prezentera (automatycznie wypełnia się z kanału miejsca, gdy jest pusty) |

## Pozycje

Ścieżka bazowa: `/doing/positions`

Rozszerza bazową klasę CRUD (GET `/:id`, POST `/`, DELETE `/:id` — bez sprawdzania uprawnień).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | — | Pobiera pozycję według ID |
| GET | `/ids?ids=` | JWT | — | Pobiera wiele pozycji według ID oddzielonych przecinkami |
| GET | `/plan/ids?planIds=` | JWT | — | Pobiera pozycje dla wielu planów według ID planów oddzielonych przecinkami |
| GET | `/plan/:planId` | JWT | — | Pobiera wszystkie pozycje planu |
| POST | `/` | JWT | — | Tworzy lub aktualizuje pozycje |
| DELETE | `/:id` | JWT | — | Usuwa pozycję |

## Terminy

Ścieżka bazowa: `/doing/times`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/all` | JWT | — | Lista wszystkich terminów kościoła |
| GET | `/:id` | JWT | — | Pobiera termin według ID |
| GET | `/plans?planIds=` | JWT | — | Pobiera terminy dla wielu planów według ID planów oddzielonych przecinkami |
| GET | `/plan/:planId` | JWT | — | Pobiera wszystkie terminy planu |
| POST | `/` | JWT | — | Tworzy lub aktualizuje terminy |
| DELETE | `/:id` | JWT | — | Usuwa termin |

## Przydziały

Ścieżka bazowa: `/doing/assignments`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/my` | JWT | — | Pobiera przydziały bieżącego użytkownika |
| GET | `/my/upcoming` | JWT | — | Do 20 przydziałów bieżącego użytkownika w planach od wczoraj wzwyż, od najbliższego (pomijane są plany wstępnie zarezerwowane, czyli `prepared`): `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Zasila podgląd służby na stronie głównej członka |
| GET | `/:id` | JWT | — | Pobiera przydział według ID |
| GET | `/plan/ids?planIds=` | JWT | — | Pobiera przydziały dla wielu planów według ID planów oddzielonych przecinkami |
| GET | `/plan/:planId` | JWT | — | Pobiera wszystkie przydziały planu |
| POST | `/` | JWT | — | Tworzy lub aktualizuje przydziały (domyślnie status to „Unconfirmed”) |
| POST | `/accept/:id` | JWT | — | Akceptuje przydział (tylko przypisana osoba) |
| POST | `/decline/:id` | JWT | — | Odrzuca przydział (tylko przypisana osoba) |
| POST | `/signup` | JWT | — | Samodzielny zapis na pozycję. Treść: `{ positionId }`. Pozycja musi zezwalać na samodzielne zapisy i mieć wolne miejsce; tworzy przydział Accepted. Odrzucane komunikatem „Signup deadline has passed”, gdy minął termin zapisów planu (liczony wstecz od pierwszego terminu nabożeństwa, jak wyżej) |
| DELETE | `/signup/:id` | JWT | — | Usuwa własny samodzielny zapis. Po terminie zapisów planu odrzucane komunikatem „Removal deadline has passed” |
| DELETE | `/:id` | JWT | — | Usuwa przydział |

### Przykład: akceptacja przydziału

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Daty niedostępności

Ścieżka bazowa: `/doing/blockoutDates`

Rozszerza bazową klasę CRUD (GET `/:id`, DELETE `/:id` — bez sprawdzania uprawnień).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | — | Pobiera datę niedostępności według ID |
| GET | `/ids?ids=` | JWT | — | Pobiera wiele dat niedostępności według ID oddzielonych przecinkami |
| GET | `/my` | JWT | — | Pobiera daty niedostępności bieżącego użytkownika |
| GET | `/upcoming` | JWT | — | Pobiera wszystkie nadchodzące daty niedostępności kościoła |
| POST | `/` | JWT | — | Tworzy lub aktualizuje daty niedostępności (jeśli nie podano `personId`, domyślnie przyjmowany jest bieżący użytkownik) |
| DELETE | `/:id` | JWT | — | Usuwa datę niedostępności |

## Zadania

Ścieżka bazowa: `/doing/tasks`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Pobiera otwarte zadania bieżącego użytkownika |
| GET | `/:id` | JWT | — | Pobiera zadanie według ID |
| GET | `/:id/contact` | JWT | Może wyświetlić kartę | Dane kontaktowe osoby, której dotyczy karta przepływu: `{ personId, displayName, mobilePhone, email }`. Pozwala przypisanemu dzwoniącemu bez dostępu do modułu Ludzie skontaktować się z tą osobą |
| GET | `/closed` | JWT | — | Pobiera zamknięte zadania bieżącego użytkownika |
| GET | `/timeline?taskIds=` | JWT | — | Pobiera dane osi czasu zadań według ID zadań oddzielonych przecinkami |
| GET | `/directoryUpdate/:personId` | JWT | — | Pobiera zadanie aktualizacji katalogu dla osoby |
| POST | `/` | JWT | — | Tworzy lub aktualizuje zadania. Dodaj `?type=directoryUpdate`, aby obsługiwać zadania aktualizacji katalogu (zdjęcia są wysyłane automatycznie) |
| POST | `/:id/conversation` | JWT | `tasks.edit` lub przypisany do karty | Dołącza do karty rozmowę z notatkami. Treść: `{ conversationId }`. Pierwsza dołączona rozmowa obowiązuje; kolejne wywołania zwracają kartę bez zmian |
| POST | `/loadForGroups` | JWT | — | Wczytuje zadania dla określonych grup. Treść: `{ groupIds: [], status: "Open" }` |

## Automatyzacje

Ścieżka bazowa: `/doing/automations`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich automatyzacji kościoła |
| GET | `/:id` | JWT | — | Pobiera automatyzację według ID |
| GET | `/check` | Publiczne | — | Uruchamia sprawdzenie wszystkich automatyzacji |
| POST | `/` | JWT | — | Tworzy lub aktualizuje automatyzacje |
| DELETE | `/:id` | JWT | — | Usuwa automatyzację |

## Akcje

Ścieżka bazowa: `/doing/actions`

Akcje określają, co dzieje się po uruchomieniu automatyzacji.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | — | Pobiera akcję według ID |
| GET | `/automation/:id` | JWT | — | Pobiera wszystkie akcje automatyzacji |
| POST | `/` | JWT | — | Tworzy lub aktualizuje akcje |
| DELETE | `/:id` | JWT | — | Usuwa akcję |

## Warunki

Ścieżka bazowa: `/doing/conditions`

Warunki określają kryteria uruchamiające automatyzację.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | — | Pobiera warunek według ID |
| GET | `/automation/:id` | JWT | — | Pobiera wszystkie warunki automatyzacji |
| POST | `/` | JWT | — | Tworzy lub aktualizuje warunki |
| DELETE | `/:id` | JWT | — | Usuwa warunek |

## Spójniki

Ścieżka bazowa: `/doing/conjunctions`

Spójniki łączą wiele warunków w automatyzacji (logika I/LUB).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | — | Pobiera spójnik według ID |
| GET | `/automation/:id` | JWT | — | Pobiera wszystkie spójniki automatyzacji |
| POST | `/` | JWT | — | Tworzy lub aktualizuje spójniki |
| DELETE | `/:id` | JWT | — | Usuwa spójnik |

## Uwierzytelnienia dostawców treści

Ścieżka bazowa: `/doing/contentProviderAuths`

Rozszerza bazową klasę CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — bez sprawdzania uprawnień).

Zarządza rekordami uwierzytelniania OAuth dla zewnętrznych dostawców treści (np. integracji z oprogramowaniem prezentacyjnym).

`accessToken` i `refreshToken` są szyfrowane w spoczynku za pomocą `EncryptionHelper` i odszyfrowywane przy odczycie, dzięki czemu API nadal zwraca tokeny w postaci jawnej. Rekordy zapisane przed wprowadzeniem szyfrowania zawierają tekst jawny (który nigdy nie zawiera znaku `|`); są zwracane bez zmian i szyfrowane przy następnym zapisie.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich uwierzytelnień dostawców treści |
| GET | `/:id` | JWT | — | Pobiera uwierzytelnienie dostawcy treści według ID |
| GET | `/ids?ids=` | JWT | — | Pobiera wiele uwierzytelnień dostawców treści według ID oddzielonych przecinkami |
| GET | `/ministry/:ministryId` | JWT | — | Pobiera wszystkie uwierzytelnienia dostawców treści dla służby |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Pobiera rekord uwierzytelnienia dla określonej służby i dostawcy |
| POST | `/` | JWT | — | Tworzy lub aktualizuje uwierzytelnienia dostawców treści |
| DELETE | `/:id` | JWT | — | Usuwa uwierzytelnienie dostawcy treści |

## Proxy dostawcy

Ścieżka bazowa: `/doing/providerProxy`

Przekazuje żądania do zewnętrznych dostawców treści (np. ProPresenter, EasyWorship). Automatycznie obsługuje odświeżanie tokenów po ich wygaśnięciu.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| POST | `/browse` | JWT | — | Przeglądanie plików dostawcy treści. Treść: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Pobiera prezentacje od dostawcy treści. Treść: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Pobiera listę odtwarzania od dostawcy treści. Treść: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Pobiera instrukcje dla elementu treści. Treść: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Pobiera rozszerzone instrukcje dla elementu treści. Treść: `{ ministryId, providerId, path }` |

## Powiązane strony

- [Endpointy członkostwa](./membership.md) — Osoby, grupy, role i uprawnienia
- [Endpointy frekwencji](./attendance.md) — Śledzenie nabożeństw i odwiedzin
- [Struktura modułów](../module-structure.md) — Wzorce organizacji kodu
