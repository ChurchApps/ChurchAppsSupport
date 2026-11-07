---
title: "Punkty końcowe treści"
---

# Punkty końcowe treści

<div class="article-intro">

Moduł Content zarządza stronami witryny, sekcjami, elementami, blokami, wpisami na blogu, przekierowaniami, kazaniami, playlistami, usługami streamingowymi, wydarzeniami, kalendarzami kuratorowanymi, plikami, galeriami, tłumaczeniami Biblii i wyszukiwaniem wersetów, pieśniami, aranżacjami, globalnymi stylami, zdjęciami stockowymi oraz ustawieniami. Jest to największy moduł w API. Zasila CMS, funkcje multimediów i streamingu, planowanie nabożeństw oraz funkcje biblijne we wszystkich aplikacjach ChurchApps.

</div>

**Ścieżka bazowa:** `/content`

## Strony

Ścieżka bazowa: `/content/pages`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:churchId/tree?url=&id=` | Publiczne | — | Wczytuje pełne drzewo strony (sekcje, elementy, bloki) według adresu URL lub ID. Usuwa wewnętrzne ID, gdy strona jest pobierana po adresie URL. Pobieranie po adresie URL egzekwuje `pages.visibility`. Strona z ograniczeniem zwraca `{ restricted: true, visibility }`, chyba że (opcjonalny) JWT spełnia warunek |
| GET | `/public/:churchId` | Publiczne | — | Wyświetla publiczne strony (`url`, `title`, `metaDescription`); tylko z `visibility = everyone` |
| GET | `/:id` | JWT | — | Pobiera stronę według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie strony kościoła |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplikuje stronę wraz ze wszystkimi sekcjami i elementami |
| POST | `/temp/ai` | JWT | Content.Edit | Zapisuje stronę wygenerowaną przez AI (strona, sekcje i elementy w jednym wywołaniu) |
| POST | `/importTree` | JWT | Content.Edit | Tworzy stronę z zagnieżdżonego drzewa (`title`, `url`, `sections[].elements[]…`). Zawsze wstawia stronę do kościoła wywołującego; ID w treści są ignorowane. Wiersze muszą zawierać elementy podrzędne `column`. Maksymalnie 30 sekcji / 500 elementów |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje strony (wsadowo) |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa stronę |

### Przykład: wczytywanie drzewa strony

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Sekcje

Ścieżka bazowa: `/content/sections`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera sekcję według ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplikuje sekcję lub przekształca ją w blok wielokrotnego użytku |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje sekcje (wsadowo). Automatycznie aktualizuje kolejność sortowania |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa sekcję (automatycznie aktualizuje kolejność sortowania) |

## Elementy

Ścieżka bazowa: `/content/elements`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera element według ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplikuje element wraz ze wszystkimi elementami podrzędnymi |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje elementy (wsadowo). Automatycznie zarządza kolumnami wierszy i slajdami karuzeli |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa element |

## Bloki

Ścieżka bazowa: `/content/blocks`

Rozszerza standardowy CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` z klasy bazowej, z uprawnieniem Content.Edit do zapisu).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera blok według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie bloki |
| GET | `/:churchId/tree/:id` | Publiczne | — | Wczytuje pełne drzewo bloku z sekcjami i elementami |
| GET | `/blockType/:blockType` | JWT | — | Wczytuje bloki według typu (np. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Publiczne | — | Wczytuje drzewo bloku stopki dla kościoła |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje bloki |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa blok |

## Linki

Ścieżka bazowa: `/content/links`

Rozszerza standardowy CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` z klasy bazowej, z uprawnieniem Content.Edit do zapisu).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera link według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie linki. Opcjonalny filtr `?category=`. Automatycznie sortuje po zapisie |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Wczytuje linki filtrowane według widoczności (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Publiczne | — | Wczytuje linki kościoła według kategorii (publicznie) |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje linki (wsadowo). Automatycznie sortuje według kategorii |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa link |

## Globalne style

Ścieżka bazowa: `/content/globalStyles`

Rozszerza standardowy CRUD (POST `/`, DELETE `/:id` z klasy bazowej, z uprawnieniem Content.Edit do zapisu).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/church/:churchId` | Publiczne | — | Wczytuje globalne style kościoła (zwraca wartości domyślne, jeśli nie ustawiono żadnych) |
| GET | `/` | JWT | — | Wczytuje globalne style uwierzytelnionego kościoła |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje globalne style |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa globalne style |

## Historia stron

Ścieżka bazowa: `/content/pageHistory`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/page/:pageId` | JWT | Content.Edit | Wyświetla wpisy historii dla strony |
| GET | `/block/:blockId` | JWT | Content.Edit | Wyświetla wpisy historii dla bloku |
| GET | `/:id` | JWT | Content.Edit | Pobiera wpis historii według ID |
| POST | `/` | JWT | Content.Edit | Zapisuje migawkę strony/bloku. Okresowo usuwa wpisy starsze niż 30 dni |
| POST | `/restore/:id` | JWT | Content.Edit | Przywraca stronę/blok z migawki historii (usuwa bieżącą zawartość i odtwarza ją z migawki) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Przywraca z migawki przekazanej w treści żądania. Treść: `{ pageId, blockId, snapshot }` |

## Wpisy (blog)

Ścieżka bazowa: `/content/posts`

Wpisy na blogu są samodzielnymi wierszami: `title`, `slug` (unikalny w ramach kościoła), `excerpt`, `content` (treść w formacie markdown), `authorId`, `photoUrl`, `publishDate`, `category` i `tags`. Wpis jest opublikowany, gdy ustawiono `publishDate` i data ta jest w przeszłości. Endpointy odczytu wzbogacają każdy wpis o `authorName` pobrane z `authorId`. Zobacz [Architektura kreatora stron](../../architecture/website-builder#blog).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Publiczne | — | Wyświetla opublikowane wpisy z paginacją (maks. 50 na stronę) |
| GET | `/public/:churchId/categories` | Publiczne | — | Zwraca unikalne kategorie spośród opublikowanych wpisów |
| GET | `/public/:churchId/slug/:slug` | Publiczne | — | Pobiera opublikowany wpis według sluga |
| GET | `/rss/:churchId?siteUrl=` | Publiczne | — | Kanał RSS 2.0 opublikowanych wpisów (linki tworzone jako `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Pobiera wpis według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie wpisy kościoła |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje wpisy (wsadowo) |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa wpis |

## Przekierowania

Ścieżka bazowa: `/content/redirects`

Przekierowania adresów URL dla kościoła (`fromPath` → `toPath`), z limitem 200 na kościół. Ścieżki są normalizowane (małe litery, wiodący ukośnik, bez końcowego ukośnika), a `fromPath` jest unikalny w ramach kościoła. B1App rozwiązuje przekierowania w przypadku błędów 404 i wysyła odpowiedź HTTP 308.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/public/:churchId?path=` | Publiczne | — | Rozwiązuje ścieżkę (lub wyświetla wszystkie przekierowania, gdy pominięto `path`) |
| GET | `/:id` | JWT | — | Pobiera przekierowanie według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie przekierowania kościoła |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje przekierowania. Odrzuca `fromPath = toPath` i egzekwuje limit 200 wierszy |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa przekierowanie |

## Kazania

Ścieżka bazowa: `/content/sermons`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/public/freeshowSample` | JWT | — | Pobiera przykładową strukturę playlisty FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Pobiera opakowanie aplikacji TV ze źródłami kazań, lekcji i FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Publiczne | — | Pobiera pojedyncze kazanie jako playlistę kanału TV |
| GET | `/public/tvFeed/:churchId` | Publiczne | — | Pobiera wszystkie publiczne playlisty i kazania jako kanał TV |
| GET | `/public/:churchId` | Publiczne | — | Wyświetla wszystkie publiczne kazania kościoła |
| GET | `/timeline?sermonIds=` | JWT | — | Wczytuje dane osi czasu dla kazań |
| GET | `/lookup?videoType=&videoData=` | Publiczne | — | Wyszukuje metadane kazania w YouTube lub Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generuje przez AI sugestie postów w mediach społecznościowych na podstawie napisów kazania |
| GET | `/outline?url=&title=&author=` | JWT | — | Generuje przez AI konspekt lekcji na podstawie adresu URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importuje filmy z kanału YouTube. Encje HTML, które API wyszukiwania YouTube umieszcza w tytułach i opisach (np. `&amp;` i `&#39;`), są dekodowane |
| GET | `/vimeoImport/:channelId` | JWT | — | Importuje filmy z kanału Vimeo |
| GET | `/:id` | JWT | — | Pobiera kazanie według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie kazania |
| POST | `/` | JWT | StreamingServices.Edit | Tworzy lub aktualizuje kazania. Akceptuje tablicę lub pojedynczy obiekt kazania (zawsze zwraca tablicę); pusta treść zwraca 400. Obsługuje przesyłanie miniatury w base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Usuwa kazanie |

### Przykład: wyszukiwanie kazania z YouTube

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Playlisty

Ścieżka bazowa: `/content/playlists`

Rozszerza standardowy CRUD (GET `/:id`, GET `/`, DELETE `/:id` z klasy bazowej, z uprawnieniem StreamingServices.Edit do zapisu).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera playlistę według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie playlisty |
| GET | `/public/:churchId` | Publiczne | — | Wyświetla wszystkie publiczne playlisty kościoła |
| POST | `/` | JWT | StreamingServices.Edit | Tworzy lub aktualizuje playlisty (wsadowo, obsługuje przesyłanie miniatur w base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Usuwa playlistę |

## Usługi streamingowe

Ścieżka bazowa: `/content/streamingServices`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Pobiera zaszyfrowany identyfikator pokoju czatu gospodarza dla usługi |
| GET | `/` | JWT | — | Wyświetla wszystkie usługi streamingowe. Automatycznie czyści wygasłe usługi niecykliczne i przesuwa cykliczne |
| POST | `/` | JWT | StreamingServices.Edit | Tworzy lub aktualizuje usługi streamingowe (wsadowo) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Usuwa usługę streamingową (usuwa też zablokowane adresy IP) |

## Wydarzenia

Ścieżka bazowa: `/content/events`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Wczytuje wydarzenia osi czasu dla grupy (zawiera daty wyjątków, dzięki czemu usunięte wystąpienia można pominąć) |
| GET | `/timeline?eventIds=` | JWT | — | Wczytuje wydarzenia osi czasu dla grup bieżącego użytkownika (zawiera daty wyjątków) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Publiczne | — | Subskrybuje wydarzenia jako kanał kalendarza ICS |
| GET | `/group/:groupId` | JWT | — | Pobiera wydarzenia grupy (zawiera daty wyjątków) |
| GET | `/public/group/:churchId/:groupId` | Publiczne | — | Pobiera publiczne wydarzenia grupy |
| GET | `/public/:churchId/:id` | Publiczne | — | Pobiera jedno wydarzenie do jego publicznej strony, wraz z `roomNames` (pokoje z rezerwacji, które nie zostały odrzucone). Zwraca `null` dla wydarzeń oczekujących lub odrzuconych oraz dla prywatnych wydarzeń, które nie przyjmują zapisów |
| GET | `/public/:churchId/:id/ical` | Publiczne | — | Pobiera pojedyncze wydarzenie jako plik `.ics` (`text/calendar`, z zastosowanymi datami wyjątków). Zwraca `404`, gdy wydarzenie jest ukryte według tych samych zasad |
| GET | `/:id` | JWT | — | Pobiera wydarzenie według ID |
| POST | `/` | JWT | — | Tworzy lub aktualizuje wydarzenia (wsadowo) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin lub lider grupy | Usuwa wydarzenie wraz z jego rezerwacjami. Liderzy grupy wydarzenia mogą je usunąć, a osoba składająca wniosek może wycofać własny oczekujący wniosek |

Rekordy wydarzeń zawierają `photoUrl` (zdjęcie wydarzenia w proporcji 16:9, wyświetlane na publicznej stronie wydarzenia i kafelkach nadchodzących wydarzeń), `tags` (oddzielone przecinkami, używane przez filtr tagów elementu Kalendarz witryny) oraz `notesViewRole` / `notesPostRole` (`staff`, gdy `null`, `leaders` lub `members`), które kontrolują konwersację `eventNote` wydarzenia. Zobacz [Kontrola dostępu do notatek grup i wydarzeń](./messaging.md#group-and-event-notes-access-control). Odpowiedzi publicznych wydarzeń kuratorowanych zawierają również `photoUrl` i `tags` każdego wydarzenia.

## Wyjątki wydarzeń

Ścieżka bazowa: `/content/eventExceptions`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera wyjątek wydarzenia według ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin lub lider grupy | Tworzy lub aktualizuje wyjątki wydarzeń (wsadowo). Liderzy mogą dodawać wyjątki tylko do wydarzeń w grupach, którymi kierują |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin lub lider grupy | Usuwa wyjątek wydarzenia |

## Kalendarze kuratorowane

Ścieżka bazowa: `/content/curatedCalendars`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera kalendarz kuratorowany według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie kalendarze kuratorowane |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje kalendarze kuratorowane (wsadowo) |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa kalendarz kuratorowany |

## Wydarzenia kuratorowane

Ścieżka bazowa: `/content/curatedEvents`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Pobiera wydarzenia kuratorowane dla kalendarza (zawiera szczegóły wydarzeń i daty wyjątków, chyba że ustawiono `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Publiczne | — | Pobiera publiczne wydarzenia kuratorowane dla kalendarza |
| GET | `/:id` | JWT | — | Pobiera wydarzenie kuratorowane według ID |
| GET | `/` | JWT | — | Wyświetla wszystkie wydarzenia kuratorowane |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje wydarzenia kuratorowane. Obsługuje tablicę `eventIds`, aby dodać konkretne wydarzenia grupy |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa wydarzenie kuratorowane |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Usuwa konkretne wydarzenie z kalendarza kuratorowanego |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Usuwa wszystkie wydarzenia grupy z kalendarza kuratorowanego |

## Pliki

Ścieżka bazowa: `/content/files`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:contentType/:contentId` | JWT | — | Pobiera pliki według typu treści i ID treści |
| GET | `/` | JWT | — | Wyświetla wszystkie pliki witryny kościoła |
| GET | `/:id` | JWT | — | Pobiera plik według ID |
| POST | `/` | JWT | Content.Edit* | Przesyła pliki (base64). *Dozwolone również, jeśli użytkownik jest członkiem grupy odpowiadającej `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Pobiera podpisany wstępnie adres URL S3 do przesyłania. *Dozwolone również dla członków grupy. Maks. 100 MB na element treści |
| DELETE | `/:id` | JWT | Content.Edit* | Usuwa plik i usuwa go z magazynu. *Dozwolone również dla członków grupy |

## Galeria

Ścieżka bazowa: `/content/gallery`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/stock/:folder` | Publiczne | — | Wyświetla zdjęcia stockowe w folderze |
| GET | `/:folder` | JWT | Content.Edit | Wyświetla obrazy galerii w folderze |
| POST | `/requestUpload` | JWT | Content.Edit | Pobiera podpisany wstępnie adres URL S3 do przesłania obrazu galerii |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Usuwa obraz z galerii |

## Biblie

Ścieżka bazowa: `/content/bibles`

Wszystkie endpointy Biblii są publiczne (nie wymagają uwierzytelniania). Dane są pobierane z zewnętrznych źródeł i buforowane lokalnie. Żądania do api.bible przekraczają limit czasu po 15 sekundach; przekroczenie limitu zwraca **504**.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/` | Publiczne | — | Wyświetla wszystkie tłumaczenia Biblii (pobiera ze źródła, jeśli pamięć podręczna jest pusta) |
| GET | `/stats?startDate=&endDate=` | Publiczne | — | Pobiera statystyki wyszukiwań Biblii dla zakresu dat |
| GET | `/availableTranslations/:source` | Publiczne | — | Wyświetla dostępne tłumaczenia ze źródła (np. api.bible) |
| GET | `/updateTranslations` | Publiczne | — | Synchronizuje wszystkie tłumaczenia ze wszystkich źródeł |
| GET | `/updateTranslations/:source` | Publiczne | — | Synchronizuje tłumaczenia z określonego źródła |
| GET | `/updateCopyrights` | Publiczne | — | Aktualizuje informacje o prawach autorskich dla tłumaczeń, którym ich brakuje |
| GET | `/:translationKey/updateCopyright` | Publiczne | — | Aktualizuje prawa autorskie dla konkretnego tłumaczenia |
| GET | `/:translationKey/search?query=&limit=` | Publiczne | — | Wyszukuje wersety w tłumaczeniu |
| GET | `/:translationKey/books` | Publiczne | — | Pobiera księgi dla tłumaczenia (buforuje lokalnie) |
| GET | `/:translationKey/:bookKey/chapters` | Publiczne | — | Pobiera rozdziały dla księgi (buforuje lokalnie) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Publiczne | — | Pobiera wersety dla rozdziału (buforuje lokalnie) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Publiczne | — | Pobiera tekst wersetów dla zakresu. Rejestruje wyszukiwania. Niektóre tłumaczenia omijają pamięć podręczną ze względu na licencje |

### Przykład: pobieranie tekstu wersetów

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Pieśni

Ścieżka bazowa: `/content/songs`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/search?q=` | JWT | — | Wyszukuje pieśni według zapytania |
| GET | `/:id` | JWT | — | Pobiera pieśń według ID |
| GET | `/` | JWT | Content.Edit | Wyświetla wszystkie pieśni |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje pieśni (wsadowo) |
| POST | `/import` | JWT | — | Importuje pieśni z FreeShow (wsadowo) |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa pieśń |

## Szczegóły pieśni

Ścieżka bazowa: `/content/songDetails`

Szczegóły pieśni są globalne (nie przypisane do kościoła). Reprezentują kanoniczne metadane pieśni udostępniane między kościołami.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera szczegóły pieśni według ID (globalnie) |
| GET | `/` | JWT | — | Wyświetla szczegóły pieśni dla kościoła |
| POST | `/create` | JWT | — | Tworzy szczegóły pieśni na podstawie ID PraiseCharts (zwraca istniejące, jeśli już zostały utworzone). Automatycznie pobiera metadane z PraiseCharts i MusicBrainz |
| POST | `/` | JWT | — | Tworzy lub aktualizuje szczegóły pieśni (wsadowo) |

## Linki szczegółów pieśni

Ścieżka bazowa: `/content/songDetailLinks`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera link szczegółów pieśni według ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Pobiera wszystkie linki dla szczegółów pieśni |
| POST | `/` | JWT | — | Tworzy lub aktualizuje linki szczegółów pieśni (wsadowo). Automatycznie pobiera dane MusicBrainz, jeśli link jest powiązany |
| DELETE | `/:id` | JWT | — | Usuwa link szczegółów pieśni |

## Aranżacje

Ścieżka bazowa: `/content/arrangements`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pobiera aranżację według ID |
| GET | `/song/:songId` | JWT | Content.Edit | Pobiera aranżacje dla pieśni |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Pobiera aranżacje dla szczegółów pieśni |
| GET | `/` | JWT | Content.Edit | Wyświetla wszystkie aranżacje |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje aranżacje (wsadowo) |
| POST | `/freeShow/missing` | JWT | — | Znajduje ID FreeShow, które nie istnieją w kościele. Treść: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa aranżację (usuwa także tonacje; usuwa pieśń, jeśli nie pozostały żadne aranżacje) |

## Tonacje aranżacji

Ścieżka bazowa: `/content/arrangementKeys`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:id` | Publiczne | — | Pobiera tonację aranżacji z pełnymi danymi pieśni do widoku prezentera |
| GET | `/:id` | JWT | — | Pobiera tonację aranżacji według ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Pobiera tonacje dla aranżacji |
| GET | `/` | JWT | Content.Edit | Wyświetla wszystkie tonacje aranżacji |
| POST | `/` | JWT | Content.Edit | Tworzy lub aktualizuje tonacje aranżacji (wsadowo) |
| DELETE | `/:id` | JWT | Content.Edit | Usuwa tonację aranżacji |

## Ustawienia

Ścieżka bazowa: `/content/settings`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Pobiera ustawienia bieżącego użytkownika |
| GET | `/` | JWT | Settings.Edit | Pobiera wszystkie ustawienia kościoła |
| GET | `/public/:churchId` | Publiczne | — | Pobiera publiczne ustawienia kościoła (zwracane jako pary klucz-wartość) |
| POST | `/my` | JWT | — | Zapisuje ustawienia na poziomie użytkownika (obsługuje przesyłanie obrazów w base64) |
| POST | `/` | JWT | Settings.Edit | Zapisuje ustawienia na poziomie kościoła (obsługuje przesyłanie obrazów w base64) |
| DELETE | `/my/:id` | JWT | — | Usuwa ustawienie użytkownika |

## Podgląd

Ścieżka bazowa: `/content/preview`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/data/:key` | Publiczne | — | Wczytuje dane podglądu transmisji dla kościoła według klucza subdomeny (karty, linki, usługi, kazania) |

## Galeria (zdjęcia stockowe)

Ścieżka bazowa: `/content/stock`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| POST | `/search` | Publiczne | — | Wyszukuje zdjęcia stockowe w Pexels. Treść: `{ term: "church" }` |

## PraiseCharts

Ścieżka bazowa: `/content/praiseCharts`

Integracja z PraiseCharts do wyszukiwania pieśni uwielbienia i pobierania nut.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| GET | `/raw/:id` | JWT | — | Pobiera surowe dane PraiseCharts dla pieśni |
| GET | `/hasAccount` | JWT | — | Sprawdza, czy użytkownik ma połączone konto PraiseCharts |
| GET | `/search?q=` | JWT | — | Wyszukuje w katalogu PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Pobiera produkty dla pieśni (z biblioteki, jeśli użytkownik jest uwierzytelniony, w przeciwnym razie z katalogu) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Pobiera surowe dane aranżacji z biblioteki |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Pobiera plik z PraiseCharts (PDF lub ZIP). Zwraca `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Publiczne | — | Pobiera adres URL autoryzacji OAuth dla PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Wymienia weryfikator OAuth na token dostępu i zapisuje go w ustawieniach użytkownika |
| GET | `/library` | JWT | — | Przegląda bibliotekę PraiseCharts użytkownika |

## Wsparcie

Ścieżka bazowa: `/content/support`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|------|------|------|------|
| POST | `/createAudio` | Publiczne | — | Konwertuje SSML na plik audio MP3 za pomocą AWS Polly. Treść: `{ ssml: "<speak>...</speak>" }` |

## Powiązane strony

- [Architektura kreatora stron](../../architecture/website-builder) — Jak strony, sekcje, elementy, wpisy i przekierowania łączą się ze sobą w aplikacjach
- [Punkty końcowe członkostwa](./membership) — Osoby, kościoły, grupy, role, uprawnienia
- [Punkty końcowe frekwencji](./attendance) — Śledzenie nabożeństw i wizyt
- [Uwierzytelnianie i uprawnienia](./authentication) — Przepływ logowania, JWT, model uprawnień
- [Struktura modułów](../module-structure) — Wzorce organizacji kodu
