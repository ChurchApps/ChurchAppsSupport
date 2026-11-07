---
title: "Punkty końcowe wiadomości"
---

# Punkty końcowe wiadomości

<div class="article-intro">

Moduł Wiadomości zarządza rozmowami w czasie rzeczywistym, wiadomościami czatu, powiadomieniami push, dostarczaniem SMS-ów i e-maili, połączeniami WebSocket, wiadomościami prywatnymi, rejestracją urządzeń oraz dostawcami wiadomości tekstowych. Zapewnia warstwę komunikacji wykorzystywaną we wszystkich aplikacjach ChurchApps, zarówno w czacie transmisji na żywo, jak i w powiadomieniach asynchronicznych.

</div>

**Ścieżka bazowa:** `/messaging`

## Rozmowy

Ścieżka bazowa: `/messaging/conversations`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/timeline/ids?ids=` | JWT | — | Wczytuje rozmowy według identyfikatorów oddzielonych przecinkami, wraz z pierwszą i ostatnią wiadomością |
| GET | `/messages/:contentType/:contentId` | JWT | — | Wczytuje rozmowy dla treści ze stronicowanymi wiadomościami (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Pobiera rozmowy typu post dla grup bieżącego użytkownika |
| GET | `/posts/group/:groupId` | JWT | — | Pobiera rozmowy typu post dla wskazanej grupy |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Najnowsze notatki ze wszystkich rekordów na stronie Notatek w B1 Admin. `section` to `people`, `groups`, `events` lub `workflows` (w innym przypadku błąd 400); `limit` domyślnie wynosi 25 (maks. 100); `before` to kursor z poprzedniej strony. Każda notatka nadal podlega regule swojego typu (uprawnienie People Edit / poufne notatki, liderzy grupy, osoby przeglądające wydarzenia, osoby przeglądające karty procesów), więc wywołujący widzi tylko notatki, które mógłby otworzyć. Tekst notatki jest skracany do 300 znaków |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Pobiera lub tworzy bieżącą rozmowę dla treści (automatycznie odszyfrowuje contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Wczytuje rozmowy według typu treści i identyfikatora |
| GET | `/:churchId/:id` | Public | — | Wczytuje pojedynczą rozmowę według identyfikatora |
| POST | `/` | JWT | — | Tworzy lub aktualizuje rozmowy (zbiorczo) |
| POST | `/start` | JWT | — | Rozpoczyna nową rozmowę z początkowym komentarzem |
| DELETE | `/:churchId/:id` | JWT | — | Usuwa rozmowę |

### Kontrola dostępu do notatek o osobie

Rozmowy z `contentType: "person"` (karta Notatki na rekordzie osoby) lub `contentType: "personConfidential"` (sekcja Poufne notatki) są chronione przy każdej ścieżce odczytu i zapisu, w tym przy wyżej wymienionych trasach publicznych, które dla tych typów treści zwracają `401`. `person` wymaga uprawnienia MembershipApi **People / Edit**, a `personConfidential` wymaga uprawnienia **People / View Confidential Notes**. Dla kluczy API o ograniczonym zakresie `people:write` obejmuje obie czynności (użytkownik powiązany z kluczem nadal musi posiadać bazowe uprawnienie roli).

### Kontrola dostępu do notatek grupowych i wydarzeń {#group-and-event-notes-access-control}

Dwa kolejne typy notatek są chronione w ten sam sposób, przy każdej ścieżce odczytu i zapisu (w tym przy trasach publicznych powyżej), i nigdy nie są otwarte na anonimowe publikowanie:

- **`groupNote`** (`contentId` = identyfikator grupy) -- kanał **Notatki liderów** w grupie. Tylko liderzy tej grupy (`leaderGroupIds` w JWT) mogą je czytać lub dodawać. Żadne uprawnienie personelu nie daje dostępu, w tym `content.edit` i uprawnienia związane z członkostwem w grupie.
- **`eventNote`** (`contentId` = identyfikator wydarzenia) -- notatki przypisane do wydarzenia w kalendarzu. Personel z uprawnieniem `content.edit` lub **Calendars / Admin** może zawsze czytać i dodawać notatki. W pozostałych przypadkach dostęp zależy od pól wydarzenia `notesViewRole` (odczyt) i `notesPostRole` (dodawanie): `staff` (domyślna wartość, używana, gdy pole ma wartość `null`) nie daje dostępu nikomu innemu, `leaders` daje dostęp liderom grupy wydarzenia, a `members` daje dostęp członkom i liderom grupy wydarzenia. Wydarzenie bez `groupId` jest dostępne wyłącznie dla personelu.

### Kontrola dostępu do notatek na karcie procesu

Rozmowy z `contentType: "workflowCard"` (notatki na karcie procesu, gdzie `contentId` to identyfikator zadania karty) mogą być odczytywane i edytowane wyłącznie przez osobę, która może otworzyć tę kartę: użytkownika z uprawnieniem DoingApi **Tasks / View** albo osobę lub grupę, do której karta jest przypisana, przez którą została utworzona lub której dotyczy. Wszyscy pozostali otrzymują `401` przy każdej ścieżce odczytu, w tym przy wyżej wymienionych trasach publicznych. Rozmowa karty jest dołączana przez samą kartę za pomocą `POST /doing/tasks/:id/conversation` (treść `{ "conversationId": "..." }`; wygrywa pierwsza dołączona rozmowa). Mogą to wywołać edytujący kartę oraz jej przypisany wykonawca.

### Przykład: rozpoczęcie rozmowy

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Wiadomości

Ścieżka bazowa: `/messaging/messages`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/conversation/:conversationId` | JWT | — | Wczytuje wszystkie wiadomości w rozmowie |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Wczytuje wszystkie wiadomości w rozmowie (publiczne nadrabianie dla czatu na żywo) |
| GET | `/:churchId/:id` | Public | — | Wczytuje pojedynczą wiadomość według identyfikatora |
| POST | `/` | JWT | — | Zapisuje wiadomości (zbiorczo). Wysyła aktualizacje w czasie rzeczywistym i uruchamia powiadomienia. Aby zaktualizować istniejącą wiadomość, trzeba być jej autorem lub posiadać uprawnienie `content.edit`; zapisany autor nigdy nie może zostać zmieniony |
| POST | `/send` | Public | — | Wysyła wiadomości (zbiorczo, publicznie). Wysyła aktualizacje w czasie rzeczywistym przez WebSocket i uruchamia powiadomienia |
| POST | `/setCallout` | JWT | — | (przestarzałe) Rozgłasza wyróżnioną wiadomość w czasie rzeczywistym. Brak aktywnego klienta; czat transmisji na żywo nie wyświetla już wyróżnień |
| DELETE | `/:churchId/:id` | JWT | — | Usuwa wiadomość i rozgłasza usunięcie w czasie rzeczywistym. Zobacz [Moderacja wiadomości](#message-moderation) |

### Moderacja wiadomości

Usunięcie wiadomości jest dozwolone dla:

- autora wiadomości;
- personelu z uprawnieniem `content.edit` (w całym kościele);
- **liderów grup** -- w przypadku rozmów o `contentType` równym `group` lub `groupAnnouncement`, gdy `contentId` jest grupą, którą prowadzą (`leaderGroupIds` w JWT).

Rozmowy dotyczące notatek o osobie (`person` / `personConfidential`) nigdy nie podlegają moderacji przez liderów -- obowiązują dla nich uprawnienia do notatek (`people.edit`, `people.viewConfidentialNotes`).

Liderzy mogą tylko usuwać wiadomości, nie edytować ich: przepisywanie cudzej wiadomości pozostaje ograniczone do autora i personelu z uprawnieniem `content.edit`.

### Przykład: wysyłanie wiadomości

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Wiadomości prywatne

Ścieżka bazowa: `/messaging/privatemessages`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Wczytuje wszystkie wiadomości prywatne bieżącego użytkownika (zawiera ostatnią wiadomość w każdej rozmowie i oznacza wszystkie jako przeczytane) |
| GET | `/existing/:personId` | JWT | — | Znajduje istniejącą prywatną rozmowę z wybraną osobą |
| GET | `/:id` | JWT | — | Wczytuje wiadomość prywatną według identyfikatora (usuwa powiadomienie, jeśli jest adresowana do bieżącego użytkownika) |
| POST | `/` | JWT | — | Wysyła wiadomości prywatne (zbiorczo). Wysyła powiadomienie push do odbiorcy |

## Powiadomienia

Ścieżka bazowa: `/messaging/notifications`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/unreadCount` | JWT | — | Pobiera liczbę nieprzeczytanych powiadomień dla bieżącego użytkownika |
| GET | `/my` | JWT | — | Wczytuje wszystkie powiadomienia bieżącego użytkownika (oznacza wszystkie jako przeczytane) |
| GET | `/tmpEmail` | Public | — | Uruchamia dzienny e-mailowy przegląd powiadomień (endpoint debugowania/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Wczytuje powiadomienia wskazanej osoby |
| GET | `/:churchId/:id` | JWT | — | Wczytuje powiadomienie według identyfikatora |
| POST | `/` | JWT | — | Tworzy lub aktualizuje powiadomienia (zbiorczo) |
| POST | `/create` | JWT | — | Tworzy powiadomienia dla wielu osób. Treść: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Oznacza wszystkie powiadomienia wskazanej osoby jako przeczytane |
| POST | `/sendTest` | JWT | — | Wysyła testowe powiadomienie push. Treść: `{ personId, title }` |
| POST | `/ping` | Public | — | Tworzy powiadomienie z zewnętrznego wyzwalacza. Treść: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Usuwa powiadomienie |

### Przykład: tworzenie powiadomień

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Preferencje powiadomień

Ścieżka bazowa: `/messaging/notificationpreferences`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/categories` | JWT | — | Wyświetla kategorie powiadomień wraz z ich domyślnymi i dozwolonymi kanałami |
| GET | `/my` | JWT | — | Wczytuje preferencje powiadomień bieżącego użytkownika (jeśli nie istnieją, tworzy ustawienia domyślne) |
| POST | `/` | JWT | — | Zapisuje preferencje bieżącego użytkownika. Treść: dowolne z pól `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, a także opcjonalne `overrides: [{ categoryKey, channel, optedIn }]` (kanałem może być `push`, `email`, `in_app` lub `sms`; kategorie zablokowane są ignorowane). `allowSms` to zgoda członka na przypomnienia tekstowe. Nadal akceptowana jest starsza forma treści w postaci tablicy wierszy |

## Połączenia

Ścieżka bazowa: `/messaging/connections`

Zarządza połączeniami WebSocket i czasu rzeczywistego dla czatu, rozmów grupowych, wiadomości prywatnych i transmisji na żywo. Pełny opis protokołu znajduje się w [Architekturze czasu rzeczywistego](../../realtime).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/:churchId/:conversationId` | Public | — | Wczytuje wszystkie połączenia w rozmowie |
| POST | `/` | Public | — | Rejestruje połączenia (zbiorczo). Uruchamia rozgłoszenie frekwencji w rozmowie. Elementy treści: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Aktualizuje wyświetlaną nazwę połączenia według identyfikatora gniazda. Treść: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Usuwa połączenie z rozmowy. Uruchamia rozgłoszenie frekwencji |
| POST | `/tmpSendAlert` | Public | — | Wysyła alert powiadomienia do połączeń wskazanej osoby. Treść: `{ churchId, personId }` |

## Urządzenia

Ścieżka bazowa: `/messaging/devices`

Zarządza rejestracją urządzeń na potrzeby powiadomień push oraz parowania treści (np. aplikacja Lessons na telewizorach).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| POST | `/enroll` | JWT | — | Rejestruje lub aktualizuje urządzenie (rejestracja push w aplikacji mobilnej). Dopasowanie odbywa się według tokenu FCM lub identyfikatora urządzenia |
| POST | `/enrollAnon` | Public | — | Rejestruje anonimowe urządzenie i generuje 4-znakowy kod parowania |
| POST | `/` | Public | — | Zapisuje urządzenia (zbiorczo) |
| GET | `/pair/:pairingCode` | JWT | — | Paruje urządzenie za pomocą jego kodu parowania. Opcjonalnie `?contentType=&contentId=`, aby przypisać treść |
| GET | `/status/:deviceId` | Public | — | Sprawdza status parowania urządzenia |
| GET | `/:churchId` | JWT | — | Wczytuje wszystkie urządzenia kościoła |
| GET | `/:churchId/person/:personId` | JWT | — | Wczytuje wszystkie urządzenia wskazanej osoby |
| GET | `/:churchId/:id` | JWT | — | Wczytuje urządzenie według identyfikatora |
| DELETE | `/:churchId/:id` | JWT | — | Usuwa urządzenie |

### Przykład: rejestracja urządzenia

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Treści urządzeń

Ścieżka bazowa: `/messaging/devicecontents`

Zarządza przypisaniem treści do sparowanych urządzeń (np. która lekcja jest wyświetlana na telewizorze).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/deviceId/:deviceId` | JWT | — | Wczytuje przypisania treści dla urządzenia |
| POST | `/` | JWT | — | Zapisuje przypisania treści urządzeń (zbiorczo) |
| DELETE | `/:id` | JWT | — | Usuwa przypisanie treści urządzenia |

## Wiadomości tekstowe

Ścieżka bazowa: `/messaging/texting`

Zarządza dostawcami SMS-ów, grupowym wysyłaniem wiadomości tekstowych oraz śledzeniem dostarczenia.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/providers` | JWT | — | Wczytuje dostawców wiadomości tekstowych kościoła (dane uwierzytelniające są maskowane) |
| GET | `/status` | JWT | — | `{ enabled }` -- czy kościół ma włączonego dostawcę wiadomości tekstowych. Dostępne dla każdego zalogowanego użytkownika kościoła; używane do wyświetlania opcji **Text** tylko wtedy, gdy można wysyłać wiadomości |
| GET | `/inboundUrl` | JWT | `texting.send` lub `settings.edit` | `{ url }` -- adres webhooka przychodzących wiadomości (STOP) kościoła, który należy wkleić u dostawcy |
| POST | `/inbound/:churchId/:token` | Public | — | Webhook przychodzących wiadomości od dostawcy. `token` to HMAC identyfikatora kościoła. Odpowiedź, która jest dokładnie słowem kluczowym rezygnacji (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), oznacza wszystkie pasujące osoby jako `optedOut` i wyłącza ich `allowSms`. Zwraca `{ optedOut: <count> }`; inne odpowiedzi zwracają `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Podgląd odbiorców wiadomości grupowej (liczba kwalifikujących się, zrezygnowanych i osób bez numeru telefonu) |
| GET | `/sent` | JWT | — | Wczytuje wszystkie rekordy wysłanych wiadomości tekstowych kościoła |
| GET | `/sent/:id/details` | JWT | — | Wczytuje wysłaną wiadomość tekstową wraz z dziennikami dostarczenia dla każdego odbiorcy |
| POST | `/providers` | JWT | — | Zapisuje dostawców wiadomości tekstowych (zbiorczo). Szyfruje dane uwierzytelniające API |
| POST | `/send` | JWT | — | Wysyła SMS do wszystkich kwalifikujących się członków grupy. Treść: `{ groupId, message }`. Pola scalania (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) są rozwiązywane dla każdego odbiorcy |
| POST | `/sendPerson` | JWT | — | Wysyła SMS do pojedynczej osoby. Treść: `{ personId, phoneNumber, message }`. Pola scalania są rozwiązywane, a w dzienniku zapisywany jest już rozwiązany tekst |
| DELETE | `/providers/:id` | JWT | — | Usuwa dostawcę wiadomości tekstowych |

### Przykład: wysyłanie wiadomości grupowej

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Szablony e-maili

Ścieżka bazowa: `/messaging/emailTemplates`

Zarządza wielokrotnego użytku szablonami e-maili oraz wysyłaniem e-maili z szablonu do grup.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Wczytuje wszystkie szablony e-maili kościoła |
| GET | `/:id` | JWT | — | Wczytuje pojedynczy szablon e-maila według identyfikatora |
| GET | `/sendStatus` | JWT | `groupMembers.edit` lub `tasks.admin` | Status e-maili grupowych kościoła: `{ approved, paused, remaining, requested }`. Okno Send Email w B1Admin oraz działanie procesu **Send email** korzystają z niego, aby ostrzec, gdy e-mail nie zostanie wysłany |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Prosi zespół wsparcia o zatwierdzenie kościoła do e-maili grupowych (najwyżej raz na tydzień dla kościoła) |
| GET | `/preview/:groupId` | JWT | — | Podgląd dostarczenia e-maila do grupy (liczba kwalifikujących się odbiorców, członkowie bez adresu e-mail) |
| POST | `/` | JWT | — | Tworzy lub aktualizuje szablony e-maili (zbiorczo) |
| POST | `/send` | JWT | — | Wysyła e-mail z szablonu do wszystkich członków grupy. Treść: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Usuwa szablon e-maila |

### Przykład: wysyłanie e-maila do grupy

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Obsługiwane pola scalania:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Zablokowane adresy IP

Ścieżka bazowa: `/messaging/blockedips`

(przestarzałe) Blokowanie adresów IP dla czatu transmisji na żywo. Klient B1App nie wywołuje już `POST /` -- blokowanie IP zostało usunięte podczas migracji do jednolitego dostarczania. Trasa `/clear` jest nadal wywoływana między serwerami przez `StreamingServiceController` po zapisaniu usług transmisji.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| POST | `/` | JWT | — | (przestarzałe) Zapisuje zablokowane adresy IP (zbiorczo). Brak aktywnego klienta |
| POST | `/clear` | JWT | — | Usuwa wszystkie zablokowane adresy IP dla wskazanych usług. Treść: `[{ serviceId, churchId }]` |

## Dzienniki dostarczenia

Ścieżka bazowa: `/messaging/deliverylogs`

Śledzi status dostarczenia wysłanych wiadomości (SMS, powiadomienia push, e-mail).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | Wczytuje dzienniki dostarczenia według typu treści i identyfikatora |
| GET | `/person/:personId` | JWT | — | Wczytuje dzienniki dostarczenia dla osoby. Opcjonalne filtry `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Wczytuje ostatnie dzienniki dostarczenia dla kościoła. Opcjonalne `?limit=` (domyślnie 100) |
| GET | `/:id` | JWT | — | Wczytuje dziennik dostarczenia według identyfikatora |

## Powiązane strony

- [Architektura czasu rzeczywistego](../../realtime) -- protokół WebSocket, subskrypcje pokoi i wspólna platforma dostarczania
- [Powiadomienia push w przeglądarce](../../web-push) -- rejestracja i dostarczanie powiadomień push w przeglądarce
- [Punkty końcowe członkostwa](./membership) -- osoby, grupy, role i podstawowa tożsamość
- [Punkty końcowe frekwencji](./attendance) -- śledzenie nabożeństw i wizyt
- [Uwierzytelnianie i uprawnienia](./authentication) -- przepływ logowania, JWT, OAuth, model uprawnień
- [Struktura modułu](../module-structure) -- wzorce organizacji kodu
