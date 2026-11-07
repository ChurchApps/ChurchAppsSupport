---
title: "Punkty końcowe frekwencji"
description: "Dokumentacja API obecności w B1 Admin i B1 Checkin: kampusy, nabożeństwa, godziny, sesje, wizyty, reguły zameldowania i punkty końcowe eksportu."
---

# Punkty końcowe frekwencji

<div class="article-intro">

Moduł frekwencji zarządza lokalizacjami kampusów, nabożeństwami, godzinami nabożeństw, sesjami frekwencji, wizytami i sesjami wizyt. Zapewnia infrastrukturę do śledzenia, kto uczestniczył w którym nabożeństwie lub spotkaniu grupy, obsługuje procesy zameldowania i oferuje raportowanie trendów oraz podsumowań frekwencji.

</div>

**Ścieżka bazowa:** `/attendance`

## Kampusy

Ścieżka bazowa: `/attendance/campuses`

Standardowy kontroler CRUD (dziedziczy po GenericCrudController). Udostępnia trasy `getById`, `getAll`, `post` i `delete` z klasy bazowej CRUD.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Wyświetla wszystkie kampusy kościoła |
| GET | `/:id` | JWT | — | Pobiera kampus według ID |
| POST | `/` | JWT | Services.Edit | Tworzy lub aktualizuje kampusy |
| DELETE | `/:id` | JWT | Services.Edit | Usuwa kampus |

## Nabożeństwa

Ścieżka bazowa: `/attendance/services`

Dziedziczy po GenericCrudController z trasami CRUD `getById`, `getAll`, `post` i `delete`. Punkty końcowe `getAll` (`GET /`) i `search` są nadpisane niestandardowymi implementacjami.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Wyświetla wszystkie nabożeństwa (zawiera informacje o kampusie) |
| GET | `/:id` | JWT | — | Pobiera nabożeństwo według ID |
| GET | `/search?campusId=` | JWT | — | Wyszukuje nabożeństwa według ID kampusu |
| POST | `/` | JWT | Services.Edit | Tworzy lub aktualizuje nabożeństwa |
| DELETE | `/:id` | JWT | Services.Edit | Usuwa nabożeństwo |

### Przykład: wyszukiwanie nabożeństw według kampusu

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Godziny nabożeństw

Ścieżka bazowa: `/attendance/servicetimes`

Dziedziczy po GenericCrudController z trasami CRUD `getById`, `post` i `delete`. Punkty końcowe `getAll` i `search` są niestandardowymi implementacjami.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Wyświetla wszystkie godziny nabożeństw. Filtruj za pomocą `?serviceId=`. Dodaj `?include=groups`, aby dołączyć dane grup. Każdy wiersz zawiera obliczaną wartość logiczną `checkinOpen` (`false` tylko wtedy, gdy godzina nabożeństwa ma harmonogram zameldowania, którego okno jest w tej chwili zamknięte). Okno jest mierzone w strefie czasowej kampusu nabożeństwa, następnie w strefie czasowej kościoła, potem w strefie pierwszego kampusu, który ją ma, a na końcu w `America/New_York` |
| GET | `/:id` | JWT | — | Pobiera godzinę nabożeństwa według ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Wyszukuje godziny nabożeństw według kampusu i nabożeństwa |
| GET | `/public/:churchId` | Publiczny | — | Pobiera drzewo kampus → nabożeństwo → godzina dla kościoła. Zasila element `serviceTimes` kreatora strony internetowej |
| POST | `/` | JWT | Services.Edit | Tworzy lub aktualizuje godziny nabożeństw. Opcjonalne pola harmonogramu: `dayOfWeek` (0 = niedziela … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (przed rozpoczęciem), `checkinCloseMinutes` (po zakończeniu). Zameldowanie jest ograniczone czasowo tylko wtedy, gdy ustawiono zarówno `dayOfWeek`, jak i `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Usuwa godzinę nabożeństwa |

## Godziny nabożeństw grup

Ścieżka bazowa: `/attendance/groupservicetimes`

Łączy grupy z konkretnymi godzinami nabożeństw.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Wyświetla wszystkie powiązania grup z godzinami nabożeństw. Filtruj za pomocą `?groupId=`, aby otrzymać powiązania wraz z nazwami nabożeństw |
| GET | `/:id` | JWT | — | Pobiera powiązanie grupy z godziną nabożeństwa według ID |
| POST | `/` | JWT | Services.Edit | Tworzy lub aktualizuje powiązania grup z godzinami nabożeństw |
| DELETE | `/:id` | JWT | Services.Edit | Usuwa powiązanie grupy z godziną nabożeństwa |

## Rekordy frekwencji

Ścieżka bazowa: `/attendance/attendancerecords`

Udostępnia widoki zagregowanych danych frekwencji tylko do odczytu, do raportowania i wyświetlania.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Attendance.View | Wczytuje rekordy frekwencji osoby. Wymaga `?personId=` |
| GET | `/my` | JWT | — | Zakres własny: rekordy frekwencji zalogowanego członka z ostatnich 12 miesięcy, od najnowszych. Zwraca `401`, jeśli użytkownik nie jest powiązany z osobą. Zasila sekcję **Moja frekwencja** na stronie B1 Me |
| GET | `/tree` | JWT | — | Wczytuje pełne drzewo frekwencji (kampusy, nabożeństwa, godziny nabożeństw, grupy) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Wczytuje dane trendów frekwencji z opcjonalnymi filtrami |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Wczytuje frekwencję grup dla nabożeństwa w danym tygodniu |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Dla każdej grupy przypisanej do godziny nabożeństwa zwraca `{ groupId, sessionId, attendanceCount }` dla danej daty (`date` w formacie `YYYY-MM-DD`; `sessionId` ma wartość null, jeśli grupa nie ma sesji). Zasila okno dialogowe **Kto jeszcze potrzebuje frekwencji** w B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Wyszukuje rekordy frekwencji z filtrami (kampus, nabożeństwo, godzina nabożeństwa, grupa, zakres dat) |

### Przykład: trend frekwencji

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Sesje

Ścieżka bazowa: `/attendance/sessions`

Dziedziczy po GenericCrudController z trasami CRUD `getById` i `delete`. Punkty końcowe `getAll` i `save` są niestandardowymi implementacjami, które pozwalają również liderom grup zarządzać sesjami swoich grup.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Attendance.View lub Lider grupy | Wyświetla wszystkie sesje. Filtruj za pomocą `?groupId=` (zawiera nazwy). Liderzy grup mogą przeglądać sesje swoich grup |
| GET | `/:id` | JWT | Attendance.View | Pobiera sesję według ID |
| POST | `/` | JWT | Attendance.Edit lub Lider grupy | Tworzy lub aktualizuje sesje. Liderzy grup mogą zapisywać sesje dla swoich grup |
| DELETE | `/:id` | JWT | Attendance.Edit | Usuwa sesję |

## Wizyty

Ścieżka bazowa: `/attendance/visits`

Zarządza pojedynczymi rekordami wizyt (osoba uczestnicząca w określonym dniu) i zapewnia proces zameldowania.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Attendance.View | Wyświetla wszystkie wizyty. Filtruj za pomocą `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Pobiera wizytę według ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View lub Attendance.Checkin | Wczytuje dane zameldowania osób na nabożeństwie. Zwraca wizyty z sesjami wizyt z ostatniej zarejestrowanej daty |
| POST | `/` | JWT | Attendance.Edit | Tworzy lub aktualizuje wizyty |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit lub Attendance.Checkin | Przesyła dane zameldowania. Tworzy lub aktualizuje wizyty i sesje wizyt, usuwa nieaktualne rekordy |
| DELETE | `/:id` | JWT | Attendance.Edit | Usuwa wizytę |

### Przykład: proces zameldowania

**Krok 1 — wczytaj istniejące dane zameldowania:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Krok 2 — prześlij zameldowanie:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

Jeśli docelowa godzina nabożeństwa ma harmonogram zameldowania, a jej okno jest zamknięte (mierzone w tej samej kolejności stref czasowych, z pierwszeństwem kampusu, co w `checkinOpen`), nic nie zostaje zapisane, a odpowiedź ma postać `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Naruszenia pojemności i proporcji wolontariuszy również zwracają 409 (`error: "capacity"` lub `"ratio"`). Sesje, które osoba już ma na dzisiaj (ponownie wysyłane przy każdym zameldowaniu), pomijają sprawdzenie okna, dzięki czemu gospodarstwo domowe może dodać otwartą godzinę nabożeństwa po zamknięciu okna wcześniejszej.

## Sesje wizyt

Ścieżka bazowa: `/attendance/visitsessions`

Zarządza powiązaniem wizyt z sesjami (na którą konkretną sesję osoba uczestniczyła podczas wizyty). Udostępnia także szybki punkt końcowy rejestrowania oraz punkt końcowy pobierania i eksportu.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Attendance.View lub Lider grupy | Wyświetla sesje wizyt. Filtruj za pomocą `?sessionId=`. Liderzy grup mogą przeglądać sesje wizyt swoich grup |
| GET | `/:id` | JWT | Attendance.View | Pobiera sesję wizyty według ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Pobiera frekwencję dla sesji (zwraca imiona i nazwiska osób ze statusem obecności lub nieobecności) |
| POST | `/` | JWT | Attendance.Edit | Tworzy lub aktualizuje sesje wizyt |
| POST | `/log` | JWT | Attendance.Edit lub Lider grupy | Szybko rejestruje frekwencję osoby na sesji. Automatycznie tworzy wizytę, jeśli to potrzebne. Liderzy grup mogą rejestrować frekwencję dla swoich grup |
| DELETE | `/:id` | JWT | Attendance.Edit | Usuwa sesję wizyty według ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit lub Lider grupy | Usuwa osobę z sesji. Usuwa sesję wizyty oraz wizytę nadrzędną, jeśli nie pozostały żadne sesje. Liderzy grup mogą usuwać frekwencję dla swoich grup |

### Przykład: szybkie rejestrowanie frekwencji

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Przykład: pobieranie frekwencji sesji

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Serie obecności

Ścieżka bazowa: `/attendance/streaks`

Śledzi serie obecności poszczególnych osób, czyli kolejne tygodnie, w których dana osoba uczestniczyła. Przydatne do wskaźników zaangażowania i gamifikacji.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/person/:personId` | JWT | — | Wczytuje serie obecności osoby |

## Powiązane strony

- [Punkty końcowe członkostwa](./membership.md) — osoby, grupy, role i zarządzanie kościołem
- [Uwierzytelnianie i uprawnienia](./authentication.md) — proces logowania, JWT, model uprawnień
- [Struktura modułów](../module-structure.md) — wzorce organizacji kodu
