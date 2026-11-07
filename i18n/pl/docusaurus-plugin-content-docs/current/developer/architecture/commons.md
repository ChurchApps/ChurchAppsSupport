---
title: "Content Commons"
---

# Content Commons — wspólna biblioteka zasobów i moderacja

Treści przesyłane przez użytkowników i udostępniane w różnych produktach (piosenki WorshipCommons, lekcje Lessons.church, szablony FreeShow, szablony stron B1) przechodzą przez jedną kolejkę moderacji, a nie przez osobny proces weryfikacji dla każdego produktu. Ta strona opisuje cykl życia zgłoszeń i zatwierdzeń, wspólny model danych zasobów oraz miejsce, w którym działa moderacja.

## Główny szkielet zasobów

Każdy element Commons, niezależnie od produktu, przechowują dwie tabele:

- **`assets`**: publiczny wiersz tożsamości. `status`: `pending` | `published` | `unpublished` | `removed`. Dane specyficzne dla danego typu (szczegóły piosenki, autorzy) znajdują się w tabelach pomocniczych połączonych przez `assetId`.
- **`assetFiles`**: każdy plik dołączony do zasobu (audio, obrazy, dokumenty). Zastępuje starsze kolumny `path` i `files` (oddzielone przecinkami) w poszczególnych tabelach treści.
- **`submissions`**: jednostka moderacji. Cykl życia: `draft → pending → approved | rejected | withdrawn`. Zgłoszenie może dotyczyć zupełnie nowego zasobu lub edycji istniejącego, opublikowanego zasobu (przez oryginalnego autora lub osobę trzecią).

Zatwierdzenie zgłoszenia uruchamia hook publikacji zależny od produktu (`Api/src/modules/commons/helpers/publishHooks/`, np. `song.ts`), który przekształca zgłoszenie w rekordy danego produktu.

## Przebieg zgłoszenia

`CommonsSubmissionController` (`Api/src/modules/commons/`) to interfejs API przeznaczony dla użytkowników końcowych: pozwala utworzyć szkic, uzyskać podpisany adres do przesyłania i dołączyć pliki, wysłać zgłoszenie do weryfikacji lub je wycofać. Jego rzeczywistymi klientami są zewnętrzne strony producentów (serwis WorshipCommons, Lessons.church, FreeShow, galeria szablonów stron B1), a nie B1Admin.

## Wykorzystanie po stronie kościoła

Poza moderacją B1Admin odczytuje też bezpośrednio dane z głównego szkieletu Commons. Wyszukiwanie w **Serving → Songs → „Add Song”** wysyła zapytanie `GET /songs?sundayReady=true` równolegle z istniejącą zewnętrzną bazą piosenek. Wyświetla ono opublikowane piosenki WorshipCommons, które personel oznaczył jako gotowe na niedzielę (zobacz bramkę odsłuchu poniżej), wraz z odznaką licencji. Po wybraniu piosenki nowy `SongDetail` zostaje powiązany z jej źródłem przez `songDetailLinks`. Jest to jedyna ścieżka, w której B1Admin pojedynczego kościoła ma bezpośredni dostęp do danych Commons, bez udziału narzędzi Server Admin dostępnych wyłącznie dla personelu. Opis dla kościołów znajduje się w sekcji [Darmowe piosenki z WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) dokumentacji wsparcia.

## Kolejka moderacji

Kolejka znajduje się w **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`) i jest chroniona uprawnieniem `Permissions.server.admin`, tym samym, które chroni Churches, Impersonate i Jobs na tej stronie. Jest to wewnętrzne narzędzie wyłącznie dla personelu ChurchApps, a nie coś, co widzą poszczególne kościoły.

Trzy podkarty:

- **Queue**: wszystkie oczekujące zgłoszenia ze wszystkich produktów, z możliwością filtrowania według produktu lub typu zasobu. Każdy wiersz pokazuje odznakę: nowy zasób, edycja przez autora lub edycja przez osobę trzecią, historię zatwierdzeń osoby zgłaszającej, podsumowanie zmian w polach i plikach oraz wiek zgłoszenia (oznaczany po 72 godzinach). Przycisk **Review** otwiera panel z różnicami na poziomie pól, podglądem plików i osadzonym, tylko do odczytu podglądem produktu. Przyciski Approve i Reject obsługują skróty klawiszowe: j/k do nawigacji, a/r do wykonania akcji.
- **Reports**: zgłoszenia dotyczące praw autorskich oraz zasad i jakości opublikowanych zasobów, podzielone na dwie kolejki oraz historię rozwiązanych spraw. Członek personelu przejmuje zgłoszenie, a następnie je rozstrzyga, wybierając rozwiązanie (uwzględnione/odrzucone/duplikat) i działanie (brak/wycofanie z publikacji/usunięcie).
- **Assets**: przeszukiwana przeglądarka opublikowanych treści z działaniami dla każdego zasobu: wyróżnienie, wycofanie lub ponowne opublikowanie albo usunięcie (z powodem: prawa autorskie/zasady). W przypadku piosenek **bramka odsłuchu** w tym miejscu decyduje o tym, czy piosenka staje się „gotowa na niedzielę”. Personel oznacza ją po odsłuchaniu każdej opublikowanej tonacji i potwierdzeniu, że nuty, akordy i slajdy są kompletne.

Każdy punkt końcowy pod `/commons/admin/*` (`CommonsAdminController.ts`) niezależnie ponownie sprawdza uprawnienie server-admin.

:::info
Ten projekt celowo przewiduje jedną kolejkę: wewnętrzny interfejs moderacji `/admin` w WorshipCommons został wycofany, a zgłoszenia wszystkich produktów są kierowane do narzędzi Server Admin w B1Admin.
:::

## Obszary

Api (moduł commons), B1Admin (Server Admin) oraz zewnętrzne strony producentów: WorshipCommons, Lessons.church, FreeShow, szablony kreatora stron B1.
