---
title: "Punkty końcowe modułu Membership"
description: "Dokumentacja Membership API ChurchApps: osoby, gospodarstwa, grupy, role, formularze i ustawienia, z zasadami autoryzacji i uprawnień."
---

# Punkty końcowe modułu Membership

<div class="article-intro">

Moduł Membership zarządza osobami, kościołami, grupami, gospodarstwami domowymi, rolami, uprawnieniami, formularzami i ustawieniami. Jest największym modułem i zapewnia podstawową warstwę tożsamości i autoryzacji dla wszystkich pozostałych modułów.

</div>

**Ścieżka bazowa:** `/membership`

## Osoby

Ścieżka bazowa: `/membership/people`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | People.View lub Member | Lista wszystkich osób w kościele |
| GET | `/:id` | JWT | People.View lub własny rekord | Pobranie osoby po ID (zawiera zgłoszenia formularzy) |
| GET | `/ids?ids=` | JWT | People.View, Member lub People.ViewNames | Pobranie wielu osób po identyfikatorach oddzielonych przecinkami. Wywołujący z People.ViewNames bez People.View otrzymują model podstawowy, a osoby, które zrezygnowały z widoczności, są pomijane (poza wywołującym) |
| GET | `/basic?ids=` | JWT | — | Pobranie podstawowych informacji (samo imię i nazwisko) dla wielu osób |
| GET | `/names?ids=` | JWT | Dowolne uprawnienie kościelne | `[{ id, name: { display, first, last }, photo }]`, posortowane według nazwiska, a następnie imienia, dla identyfikatorów oddzielonych przecinkami, do których wywołujący ma dostęp. Dzięki temu role bez People.View (darowizny, frekwencja) mogą wyświetlać nazwy osób. Bez wyszukiwania i bez filtrowania katalogu |
| POST | `/names` | JWT | Dowolne uprawnienie kościelne | Tak samo jak `GET /names`. Treść: `{ peopleIds }` (lub `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member lub People.ViewNames | Ostatnio dodane osoby. Wywołujący z People.ViewNames bez People.View (nawet członkowie z dostępem do katalogu) otrzymują model podstawowy (`id`, `name.display`, `photo`, `membershipStatus`), a osoby, które zrezygnowały z widoczności, są pomijane |
| GET | `/guest-register/options?churchId=` | Publiczne | — | Lista kontrolna rejestracji gościa przez kod QR: zwraca `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, gdzie każda wartość to `"off"`, `"optional"` lub `"required"` (odczytywane z publicznego ustawienia `guestRegistrationFields`; brakujące lub błędne wartości przechodzą na domyślne: e-mail i telefon opcjonalne, reszta wyłączona). Wymaga `enableQRGuestRegistration`, chyba że żądanie zawiera pasujący token witryny lub kościoła; ograniczenie liczby żądań (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member lub People.ViewNames | Wyszukiwanie osób po nazwisku lub e-mailu (do 100, posortowane według nazwiska, a następnie imienia). Wywołujący z People.ViewNames bez People.View (nawet członkowie z dostępem do katalogu) otrzymują wyniki wyszukiwania po nazwisku w modelu podstawowym; wyszukiwanie po `email` zwraca `[]` |
| GET | `/search/phone?number=` | JWT | People.View lub Member | Wyszukiwanie po numerze telefonu |
| GET | `/search/group?groupId=` | JWT | People.View lub Member | Pobranie osób w określonej grupie |
| GET | `/household/:householdId` | JWT | — | Pobranie wszystkich osób w gospodarstwie domowym |
| GET | `/attendance` | JWT | People.Edit | Wczytanie uczestników z filtrami (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Wczytanie danych osi czasu dla osób i grup |
| GET | `/directory/:id` | JWT | — | Pobranie osoby do widoku katalogu (uwzględnia preferencje widoczności) |
| GET | `/claim/:churchId` | JWT | — | Przypisanie rekordu osoby do bieżącego użytkownika w kościele |
| POST | `/` | JWT | People.Edit lub EditSelf | Tworzenie lub aktualizacja osób (wsadowo) |
| POST | `/search` | JWT | People.View, Member lub People.ViewNames | Wyszukiwanie osób (wariant POST). Treść: `{ term }` lub `{ email }`; obowiązują te same zasady dotyczące samych nazw co w `GET /search` |
| POST | `/advancedSearch` | JWT | People.View lub Member | Wyszukiwanie z wieloma warunkami (wiek, birthMonth, membershipStatus itd.). Treść jest tablicą warunków; pusta treść oznacza brak warunków, a każda inna treść, która nie jest tablicą, zwraca 400 |
| POST | `/loadOrCreate` | Publiczne | — | Znalezienie lub utworzenie osoby na podstawie e-maila. Treść: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Publiczne | — | Rejestracja gościa przez kod QR. Treść: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 członków; email/phone/maritalStatus dotyczą tylko pierwszego członka). Pola wyłączone przez kościół są pomijane; brakujące wymagane lub nieprawidłowe wartości zwracają 400. Najpierw ponownie wykorzystywane są istniejące osoby: członek pasuje, gdy dokładnie jedna nieusunięta osoba ma to samo imię (bez rozróżniania wielkości liter) oraz ten sam e-mail lub te same cyfry telefonu (domowy, służbowy lub komórkowy); członek bez e-maila i telefonu pasuje po imieniu w dopasowanym gospodarstwie domowym. Dopasowane osoby nigdy nie są edytowane. Niedopasowani członkowie dołączają do dopasowanego gospodarstwa domowego lub, jeśli go nie ma, tworzą nowe (nazwane od nazwiska pierwszego członka), ze statusem `membershipStatus: "Visitor"` i wspólnym `address`. Zapisuje `comments` jako notatkę przy pierwszym członku, dodaje wszystkich do prywatnej grupy `guestRegistrationGroupId`, jeśli jest ustawiona, i — gdy `guestRegistrationRecordAttendance` ma wartość `"true"` — rejestruje frekwencję na zaplanowanych terminach nabożeństw tej grupy, których okno zameldowania jest obecnie otwarte. Zwraca `{ householdId, people: [{ id, name }] }`, powtarzając przesłane nazwy zamiast zapisanych. Te same zasady dotyczące zgody/tokenu i ograniczenia liczby żądań jak w wywołaniu options |
| POST | `/household/:householdId` | JWT | People.Edit | Aktualizacja przypisań członków gospodarstwa domowego |
| POST | `/public/email` | Publiczne | — | Wysłanie e-maila do osoby. Treść: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Wewnętrzne | — | Wczytanie adresów e-mail osób po identyfikatorach (komunikacja serwer-serwer, wymaga jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Usunięcie osoby |

### Przykład: wyszukiwanie osób

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Przykład: utworzenie osoby

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Użytkownicy

Ścieżka bazowa: `/membership/users`

Informacje o punktach końcowych logowania, rejestracji i zarządzania hasłami znajdziesz w sekcji [Uwierzytelnianie i uprawnienia](./authentication.md).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| POST | `/login` | Publiczne | — | Logowanie (e-mail/hasło, odświeżenie JWT lub authGuid) |
| POST | `/register` | Publiczne | — | Rejestracja nowego użytkownika |
| POST | `/forgot` | Publiczne | — | Wysłanie e-maila z resetem hasła |
| POST | `/setPasswordGuid` | Publiczne | — | Ustawienie hasła za pomocą GUID uwierzytelnienia z linku w e-mailu |
| POST | `/verifyCredentials` | Publiczne | — | Weryfikacja e-maila/hasła i zwrócenie powiązanych kościołów |
| POST | `/loadOrCreate` | JWT | — | Znalezienie lub utworzenie użytkownika na podstawie e-maila/userId |
| POST | `/setDisplayName` | JWT | — | Aktualizacja imienia i nazwiska użytkownika |
| POST | `/updateEmail` | JWT | — | Zmiana adresu e-mail użytkownika |
| POST | `/updatePassword` | JWT | — | Zmiana hasła użytkownika (min. 6 znaków) |
| POST | `/updateOptedOut` | JWT | — | Ustawienie statusu rezygnacji z widoczności dla osoby |
| POST | `/sendInviteEmail` | JWT | People.Edit | Wysłanie zaproszenia e-mailem do osoby w tym kościele (`email`, `personName`, `contextName`). Przycisk ma napis **Sign Up** dla osoby bez konta, a **Log In** dla istniejącego użytkownika. Użytkownik, który nigdy się nie logował, zamiast tego otrzymuje link **Set Your Password**, który wygasa po 7 dniach. Jest to stały szablon, więc nie wlicza się do dziennego limitu e-maili kościoła |
| GET | `/search?term=` | JWT | Server.Admin | Wyszukiwanie wszystkich użytkowników po nazwisku/e-mailu |
| DELETE | `/` | JWT | — | Usunięcie konta bieżącego użytkownika |

## Kościoły

Ścieżka bazowa: `/membership/churches`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Wczytanie wszystkich kościołów bieżącego użytkownika |
| GET | `/:id` | JWT | — | Pobranie kościoła po ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Pobranie użytkownika-administratora domeny dla kościoła |
| GET | `/:id/impersonate` | JWT | Server.Admin | Podszywanie się pod kościół (tylko administrator serwera) |
| GET | `/all?term=` | JWT | Server.Admin | Wyszukiwanie wszystkich kościołów (administrator) |
| GET | `/search/?name=` | Publiczne | — | Wyszukiwanie kościołów po nazwie |
| GET | `/lookup/?subDomain=&id=` | Publiczne | — | Wyszukanie kościoła po subdomenie lub ID |
| POST | `/` | JWT | Settings.Edit | Aktualizacja danych kościoła |
| POST | `/add` | JWT | — | Rejestracja nowego kościoła. Wymagane pola: name, address1, city, state, zip, country |
| POST | `/search` | Publiczne | — | Wyszukiwanie kościołów po nazwie (wariant POST) |
| POST | `/select` | JWT | — | Wybór/przełączenie na kościół. Treść: `{ churchId }` lub `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archiwizacja lub przywrócenie kościoła z archiwum |
| POST | `/byIds` | Publiczne | — | Wczytanie wielu kościołów po identyfikatorach |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Usunięcie kościołów nieaktywnych przez 7 i więcej dni |

## Grupy

Ścieżka bazowa: `/membership/groups`

Rozszerza standardowe operacje CRUD (GET `/`, GET `/:id` z klasy bazowej).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich grup |
| GET | `/:id` | JWT | — | Pobranie grupy po ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Wyszukiwanie grup według filtrów nabożeństw |
| GET | `/my` | JWT | — | Pobranie grup bieżącego użytkownika |
| GET | `/my/:tag` | JWT | — | Pobranie grup bieżącego użytkownika filtrowanych według tagu |
| GET | `/tag/:tag` | JWT | — | Pobranie wszystkich grup z określonym tagiem |
| GET | `/public/:churchId/:id` | Publiczne | — | Pobranie publicznej grupy po kościele i ID |
| GET | `/public/:churchId/tag/:tag` | Publiczne | — | Pobranie publicznych grup po tagu |
| GET | `/public/:churchId/label?label=` | Publiczne | — | Pobranie publicznych grup po etykiecie |
| GET | `/public/:churchId/slug/:slug` | Publiczne | — | Pobranie publicznej grupy po slugu |
| POST | `/` | JWT | Groups.Edit | Tworzenie lub aktualizacja grup (automatycznie generuje slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Usunięcie grupy (dla grup służbowych usuwa także zespoły podrzędne) |

## Członkowie grup

Ścieżka bazowa: `/membership/groupmembers`

Rozszerza standardowe operacje CRUD (GET `/:id`, DELETE `/:id` z klasy bazowej).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | GroupMembers.View | Pobranie członka grupy po ID |
| GET | `/` | JWT | GroupMembers.View* | Lista członków grup. Filtrowanie przez `?groupId=`, `?groupIds=` lub `?personId=`. *Dozwolone także, gdy użytkownik należy do grupy lub zapytuje o własny personId, oraz dla `?groupId=` dowolnej niepoufnej grupy, gdy użytkownik ma Attendance.View lub Attendance.Edit (dla nich uwzględniani są członkowie poniżej 13 roku życia) |
| GET | `/my` | JWT | — | Pobranie członkostw w grupach bieżącego użytkownika |
| GET | `/basic/:groupId` | JWT | — | Pobranie podstawowej listy członków grupy |
| GET | `/public/leaders/:churchId/:groupId` | Publiczne | — | Pobranie liderów grupy (publiczne) |
| GET | `/public/:churchId/:groupId` | Publiczne | — | Pobranie publicznego składu grupy (minimalne pola: `personId`, `displayName`, `leader`, zdjęcie). Tylko gdy grupa włączy opcję `publicRoster`; zasila element `staffGrid` kreatora stron |
| POST | `/` | JWT | GroupMembers.Edit | Dodanie lub aktualizacja członków grupy |
| DELETE | `/:id` | JWT | GroupMembers.View | Usunięcie członka grupy |

## Gospodarstwa domowe

Ścieżka bazowa: `/membership/households`

Standardowy kontroler CRUD.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich gospodarstw domowych |
| GET | `/:id` | JWT | — | Pobranie gospodarstwa domowego po ID |
| POST | `/` | JWT | People.Edit | Tworzenie lub aktualizacja gospodarstw domowych |
| DELETE | `/:id` | JWT | People.Edit | Usunięcie gospodarstwa domowego |

## Role

Ścieżka bazowa: `/membership/roles`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | Roles.View | Pobranie roli po ID |
| GET | `/church/:churchId` | JWT | Roles.View | Pobranie wszystkich ról kościoła. Każda rola zawiera `memberCount`, czyli liczbę różnych użytkowników w niej |
| POST | `/` | JWT | Roles.Edit | Tworzenie lub aktualizacja ról |
| DELETE | `/:id` | JWT | Roles.Edit | Usunięcie roli (usuwa także jej uprawnienia i członków) |

## Członkowie ról

Ścieżka bazowa: `/membership/rolemembers`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/roles/:id` | JWT | Roles.View | Pobranie członków roli. Dodaj `?include=users`, aby uwzględnić dane użytkowników |
| POST | `/` | JWT | Roles.Edit | Dodanie członków do roli (tworzy użytkownika, jeśli e-mail nie istnieje) |
| DELETE | `/:id` | JWT | Roles.View | Usunięcie członka roli |
| DELETE | `/self/:churchId/:userId` | JWT | — | Usunięcie siebie z kościoła |

## Uprawnienia ról

Ścieżka bazowa: `/membership/rolepermissions`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/roles/:id` | JWT | Roles.View | Pobranie uprawnień roli (użyj `null` jako ID dla roli "Everyone") |
| POST | `/` | JWT | Roles.Edit | Tworzenie lub aktualizacja uprawnień roli |
| DELETE | `/:id` | JWT | Roles.Edit | Usunięcie uprawnienia roli |

## Uprawnienia

Ścieżka bazowa: `/membership/permissions`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Pobranie pełnej listy dostępnych uprawnień |

Każdy wpis zawiera `apiName`, `section` (typ treści), `action` oraz etykiety `displaySection` i `displayAction`, które wyświetla edytor ról w B1Admin. Ostatnio dodane: `MembershipApi` / `People` / `View Names` (**View People Names Only**, w sekcji People and Groups) oraz `GivingApi` / `Donations` / `Enter` (**Enter Donations**, w sekcji Donations; zob. [Partie darowizn](./giving.md#donation-batches)).

## Formularze

Ścieżka bazowa: `/membership/forms`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Forms.Admin lub Forms.Edit | Lista wszystkich formularzy (administrator widzi wszystkie; edytorzy widzą przypisane oraz formularze spoza członkostwa) |
| GET | `/:id` | JWT | Dostęp do formularza | Pobranie formularza po ID |
| GET | `/archived` | JWT | Forms.Admin lub Forms.Edit | Lista zarchiwizowanych formularzy |
| GET | `/group/:groupId` | JWT | Członek grupy, lider grupy lub Forms.Admin | Samodzielne formularze powiązane z grupą (`forms.groupId`), bez zarchiwizowanych, posortowane według nazwy. Zwraca `id`, `name`, `description` oraz `open` (w oknie dostępności). Członkowie widzą tylko otwarte formularze; liderzy i administratorzy formularzy widzą także zamknięte. Zasila powiązane formularze na stronie grupy |
| GET | `/standalone/:id?churchId=` | JWT | — | Pobranie samodzielnego formularza (formularze z ograniczeniami wymagają uwierzytelnienia) |
| POST | `/` | JWT | Forms.Admin lub Forms.Edit | Tworzenie lub aktualizacja formularzy. Samodzielne formularze przyjmują opcjonalne `photoUrl` (zdjęcie nagłówka wyświetlane nad formularzem) oraz `groupId` (powiązana grupa) |
| DELETE | `/:id` | JWT | Dostęp do formularza | Usunięcie formularza |

## Zgłoszenia formularzy

Ścieżka bazowa: `/membership/formsubmissions`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Forms.Admin lub Forms.Edit | Lista zgłoszeń. Filtrowanie przez `?personId=` lub `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Zakres własny: do 50 zgłoszeń samodzielnych formularzy (nie formularzy osób), które zalogowany członek przesłał lub które są powiązane z jego osobą (`contentType` `person`, `contentId` = jego ID osoby — na przykład po zmianie osoby przez administratora), od najnowszego, każde z `form.name`. `include` dołącza pytania formularza i odpowiedzi ze zgłoszenia. Zwraca `401`, jeśli użytkownik nie jest powiązany z osobą. Zasila sekcję **My Forms** na stronie B1 Me |
| GET | `/group/:groupId` | JWT | Lider grupy | Odpowiedzi dla liderów grupy: jeden wpis dla każdego powiązanego formularza i każdego wydarzenia grupy z formularzem zapisu, z polami `form`, `event` (`id`, `title`, `start`; tylko dla wpisów wydarzeń), `questions` oraz `submissions` (z `answers` i `personName`, `null` dla anonimowych) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit lub dostęp do podglądu | Pobranie zgłoszenia po ID. Dodaj `?include=form,questions,answers`. Liderzy grupy powiązanej z formularzem oraz liderzy grupy, do której należy zapis na wydarzenie, mogą je także odczytać |
| GET | `/formId/:formId` | JWT | Dostęp do formularza (podgląd) | Pobranie wszystkich zgłoszeń formularza (zawiera form, questions, answers). Liderzy grupy powiązanej z formularzem mają dostęp do podglądu |
| POST | `/` | JWT | — | Przesłanie odpowiedzi na formularz (obsługuje formularze z ograniczeniami i bez, wysyła powiadomienia e-mail). Gdy formularz ma `autoCreatePerson`, znajduje lub tworzy osobę-gościa na podstawie e-maila i łączy ją ze zgłoszeniem; gdy formularz ma także `groupId`, dodaje tę osobę do grupy; gdy ustawiono `followUpSubject`/`followUpBody`, wysyła do zgłaszającego e-mail uzupełniający na podstawie szablonu. Chyba że wywołujący może zarządzać formularzem, `submittedBy` jest zawsze ustawiane na osobę zalogowanego członka (lub pozostaje puste dla zgłoszeń anonimowych) |
| DELETE | `/:id` | JWT | Forms.Admin lub Forms.Edit | Usunięcie zgłoszenia wraz z jego odpowiedziami |

## Pytania

Ścieżka bazowa: `/membership/questions`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Dostęp do formularza | Lista pytań formularza. Wymaga `?formId=` |
| GET | `/:id` | JWT | Dostęp do formularza | Pobranie pytania po ID |
| GET | `/unrestricted?formId=` | JWT | — | Pobranie pytań formularza bez ograniczeń |
| GET | `/sort/:id/up` | JWT | — | Przesunięcie pytania wyżej w kolejności |
| GET | `/sort/:id/down` | JWT | — | Przesunięcie pytania niżej w kolejności |
| POST | `/` | JWT | Dostęp do formularza | Tworzenie lub aktualizacja pytań (automatycznie przypisuje kolejność) |
| DELETE | `/:id?formId=` | JWT | Dostęp do formularza | Usunięcie pytania |

## Odpowiedzi

Ścieżka bazowa: `/membership/answers`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Forms.Admin lub Forms.Edit | Lista odpowiedzi. Filtrowanie przez `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin lub Forms.Edit | Tworzenie lub aktualizacja odpowiedzi |

## Uprawnienia członków

Ścieżka bazowa: `/membership/memberpermissions`

Kontroluje dostęp poszczególnych członków do konkretnych formularzy.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:id` | JWT | Dostęp do formularza | Pobranie uprawnienia członka po ID |
| GET | `/member/:id` | JWT | Dostęp do formularza | Pobranie wszystkich uprawnień do formularzy dla członka |
| GET | `/form/:id` | JWT | Dostęp do formularza | Pobranie wszystkich uprawnień członków dla formularza |
| GET | `/form/:id/my` | JWT | Dostęp do formularza | Pobranie uprawnienia bieżącego użytkownika do formularza |
| POST | `/` | JWT | Dostęp do formularza | Tworzenie lub aktualizacja uprawnień członka |
| DELETE | `/:id?formId=` | JWT | Dostęp do formularza | Usunięcie uprawnienia członka |
| DELETE | `/member/:id?formId=` | JWT | Dostęp do formularza | Usunięcie wszystkich uprawnień członka do formularza |

## Ustawienia

Ścieżka bazowa: `/membership/settings`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Settings.Edit | Pobranie wszystkich ustawień kościoła |
| GET | `/public/:churchId` | Publiczne | — | Pobranie publicznych ustawień kościoła |
| POST | `/` | JWT | Settings.Edit | Zapisanie ustawień (obsługuje przesyłanie obrazów w base64) |

## Domeny

Ścieżka bazowa: `/membership/domains`

Rozszerza standardowe operacje CRUD (GET `/:id`, GET `/`, DELETE `/:id` z klasy bazowej).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich domen |
| GET | `/:id` | JWT | — | Pobranie domeny po ID |
| GET | `/lookup/:domainName` | JWT | — | Wyszukanie domeny po nazwie |
| GET | `/public/lookup/:domainName` | Publiczne | — | Publiczne wyszukiwanie domeny po nazwie |
| GET | `/health/check` | Publiczne | — | Uruchomienie kontroli stanu dla niesprawdzonych domen |
| POST | `/` | JWT | Settings.Edit | Tworzenie lub aktualizacja domen (wyzwala aktualizację Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Usunięcie domeny |

## Powiązanie użytkownika z kościołem

Ścieżka bazowa: `/membership/userchurch`

Zarządza powiązaniem między użytkownikami a kościołami.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/userid/:userId` | JWT | — | Pobranie rekordu użytkownik-kościół po ID użytkownika |
| GET | `/personid/:personId` | JWT | — | Pobranie e-maila powiązanego użytkownika osoby |
| GET | `/user/:userId` | JWT | Server.Admin | Wczytanie wszystkich kościołów użytkownika |
| POST | `/` | JWT | — | Utworzenie powiązania użytkownik-kościół |
| PATCH | `/:userId` | JWT | — | Aktualizacja czasu ostatniego dostępu i zapis dostępu do dziennika |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Usunięcie rekordu użytkownik-kościół |

## Preferencje widoczności

Ścieżka bazowa: `/membership/visibilityPreferences`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/my` | JWT | — | Pobranie preferencji widoczności bieżącego użytkownika |
| POST | `/` | JWT | — | Zapisanie preferencji widoczności (widoczność adresu, telefonu, e-maila) |

## Zapytania

Ścieżka bazowa: `/membership/query`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| POST | `/members` | JWT | — | Wyszukiwanie członków w języku naturalnym za pomocą AI. Treść: `{ text, subDomain, siteUrl }` |

## Błędy po stronie klienta

Ścieżka bazowa: `/membership/clientErrors`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| POST | `/` | JWT | — | Zapisanie błędu po stronie klienta |

## Powiązane strony

- [Uwierzytelnianie i uprawnienia](./authentication.md) — przepływ logowania, JWT, OAuth, model uprawnień
- [Punkty końcowe frekwencji](./attendance.md) — śledzenie nabożeństw i wizyt
- [Struktura modułów](../module-structure.md) — wzorce organizacji kodu
