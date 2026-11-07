---
title: "Architektura kreatora stron"
description: "Mapa dla deweloperów kreatora stron B1: drzewo treści, wspólny katalog elementów, potok renderowania i generowanie stron przez AI w B1 Admin i B1.church."
---

# Architektura kreatora stron

<div class="article-intro">

Każda strona internetowa kościoła obsługiwana przez B1App jest renderowana z drzewa treści (stron, sekcji i elementów) przechowywanego w ContentApi i edytowanego wizualnie w B1Admin. Jedna wspólna biblioteka komponentów renderuje zarówno podgląd edytora, jak i działającą witrynę, jeden katalog typów elementów określa, co może pojawić się na stronie, a osobna usługa AI może wygenerować lub przepisać to drzewo. Ta strona opisuje cały stos: kontrakt elementów w `@churchapps/helpers`, potok renderowania, elementy danych kościoła, widżety dla całej witryny, warstwę bloga, strony z ograniczonym dostępem, SEO, generowanie treści przez AI oraz formularze konwersacyjne.

</div>

## Przegląd

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Trzy zasady obowiązują w całym stosie:

1. **Jedno drzewo, dwa renderery.** Strona to drzewo `pages → sections → elements`, w którym każdy węzeł przechowuje swoje ustawienia jako blob JSON `answers`. Te same komponenty apphelper renderują edytor typu „przeciągnij i upuść” w B1Admin oraz renderowaną po stronie serwera witrynę publiczną w B1App. Nie istnieje osobny „format publikacji”.
2. **Kontrakt znajduje się w `@churchapps/helpers`.** `ElementTypes.ts` to jedyny katalog typów elementów, renderery są rozwiązywane przez rejestr w apphelper, a formularze edytora znajdują się w B1Admin. Dodanie typu elementu wymaga zmian we wszystkich trzech miejscach, w tej kolejności.
3. **Witryna publiczna odczytuje anonimowe endpointy.** Wszystko, czego potrzebuje B1App (drzewo strony, ustawienia, wpisy bloga, przekierowania oraz endpointy danych kościoła w innych modułach), jest publiczne. Uwierzytelnianie jest opcjonalne: JWT przesłany do anonimowego endpointu drzewa odblokowuje strony przeznaczone tylko dla członków, a nic poza tym się nie zmienia.

## Drzewo treści

Moduł treści (`Api/src/modules/content`) zarządza danymi kreatora:

| Tabela | Rola |
|-------|------|
| `pages` | Jedna strona na adres URL: `url`, `title`, `layout`, a także `visibility`/`groupIds` (ograniczenie dostępu) oraz `metaDescription` (SEO) |
| `sections` | Poziome pasy na stronie (lub w bloku): tło, kolor tekstu oraz `answersJSON`, który zawiera style i konfiguracje dzielników kształtu `dividerTop`/`dividerBottom` |
| `elements` | Fragmenty treści wewnątrz sekcji: `elementType` + `answersJSON`, mogą być zagnieżdżane w typach układu (wiersz/kolumna, karuzela) |
| `blocks` | Wielokrotnego użytku grupy sekcji/elementów (bloki stopki, bloki elementów) współdzielone między stronami |
| `posts` | Samodzielne wpisy blogowe (zob. [Blog](#blog)) |
| `redirects` | Pary `fromPath → toPath` przypisane do kościoła, maksymalnie 200 (zob. [SEO](#seo-and-discoverability)) |
| `settings` | Ustawienia kościoła w formie par klucz-wartość; wiersze oznaczone jako `public` są udostępniane anonimowo i zawierają konfigurację widżetów oraz analityki |

Całe drzewo dla jednego adresu URL zwracane jest jednym anonimowym wywołaniem, `GET /content/pages/:churchId/tree?url=/about`, i to z niego B1App renderuje stronę po stronie serwera. Żądania edytora pobierają dane po identyfikatorze i zachowują wewnętrzne identyfikatory.

## Kontrakt elementów

### Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` definiuje każdy typ elementu jako `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` oraz `answersSchema` w stylu JSON Schema dla jego odpowiedzi. Funkcja `validateElementAnswers()` jest celowo łagodna: nieznane typy i dodatkowe klucze przechodzą walidację, dzięki czemu stara treść nie przestaje działać po aktualizacji katalogu. **Obecnie dostępne jest 35 typów:**

| Kategoria | Typy elementów |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

Element `sermons` to najbardziej konfigurowalny z typów kościelnych: odpowiedź `layout` wybiera `browse` (dawna pełna przeglądarka), `grid`, `list` lub `featuredLatest`, a `playlistId`, `itemCount`, `showTitles` i `showDates` doprecyzowują układy inne niż `browse`.

Element `rawHTML` ma dwie odpowiedzi: `rawHTML` (znaczniki) i `javascript`. Skrypty wstawiane przez `innerHTML` nigdy się nie wykonują, dlatego `RawHTMLElement` odtwarza każdy węzeł `<script>` w znacznikach jako nowy element. Te węzły, niewstawiane przez parser, są traktowane jako zaufane w ramach dyrektywy `strict-dynamic` polityki CSP. Odpowiedź `javascript`, która zaczyna się od `<` (fragment dostawcy wklejony razem z tagami `<script>`), jest parsowana jako znaczniki i traktowana w ten sam sposób. W przeciwnym razie uruchamiana jest jako zwykły skrypt inline. B1Admin oznacza gołe adresy URL w polu JavaScript, ponieważ sam adres URL uruchomiony jako skrypt nie robi nic. Element `map` nie renderuje niczego i nie ładuje skryptu Google Maps, jeśli nie skonfigurowano klucza API Map.

### Renderery (`@churchapps/apphelper`)

Renderery znajdują się w `Packages/apphelper/src/website/components/elementTypes/`, po jednym komponencie na typ, i są rozwiązywane przez `ElementRegistry.ts`. Jest to dwuwarstwowa mapa: `Element.tsx` rejestruje domyślny renderer dla wszystkich 35 typów (`registerDefaultElementRenderer`), a aplikacja hosta może nadpisać dowolny z nich w czasie działania (`registerElementRenderer`) bez forkowania pakietu.

### Formularze edytora (B1Admin)

Formularze ustawień poszczególnych typów w edytorze znajdują się w `B1Admin/src/site/admin/elements/`. `ElementEdit.tsx` przekazuje obsługę do dedykowanego komponentu (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` itd.) lub do wbudowanego konstruktora pól dla danego typu. Odpowiednik tego katalogu skierowany do AI to narzędzie MCP `describe_page_builder` w API (zob. [MCP Server](../api/mcp.md)).

Podgląd edytora montuje ten sam `Theme` co działająca witryna, który ustawia zmienne CSS `--headingFont` / `--bodyFont` na podstawie globalnych stylów kościoła. B1App stosuje te zmienne przez `pages.css`, którego B1Admin nie może zaimportować, dlatego `ContentEditor.tsx` wstrzykuje `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`), aby zastosować je do tekstu `.page` oraz nagłówków `h1`–`h6`. Bez tego podgląd wyświetlał nagłówki czcionką z panelu administracyjnego.

### Dzielniki kształtów sekcji

Sekcje mogą mieć dekoracyjne dzielniki kształtów na obu krawędziach. Konfiguracja znajduje się w `answersJSON` sekcji jako obiekty `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }`, gdzie `shape` to jedna z wartości: `wave, waves, slant, curve, triangle, peaks`. Apphelper dostarcza komponent `SectionDivider` oraz funkcję pomocniczą `parseDividerConfig()`. Renderery sekcji obu aplikacji (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) parsują odpowiedzi i montują dzielnik, a `SectionEdit.tsx` w B1Admin udostępnia interfejs wyboru. Pakiety dostarczają tylko element składowy; podłączenie na poziomie sekcji należy do aplikacji korzystających z tych pakietów.

## Elementy danych kościoła

Trzy typy elementów wyświetlają aktualne dane kościoła, a nie treści tworzone ręcznie. Izolacja modułów nadal obowiązuje: każdy z nich wywołuje publiczny endpoint swojego modułu bezpośrednio z przeglądarki.

| Element | Endpoint | Uwagi |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Zwraca `{ fundId, totalAmount, donationCount }`, opcjonalnie z oknem `?startDate=&endDate=`; element porównuje wynik z odpowiedzią `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Tylko na zasadzie dobrowolnego udziału**: grupa musi mieć ustawioną flagę `publicRoster` (domyślnie wyłączona). Projekcja jest celowo minimalna: `personId`, `displayName`, `leader`, zdjęcie. Brak pól kontaktowych i demograficznych |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Zwraca drzewo kampus → nabożeństwo → godzina; renderer apphelper na jego podstawie generuje JSON-LD `Event` ze schema.org w formie „best effort” (API zwraca dane surowe) |

:::warning
`publicRoster` to bramka prywatności dla `staffGrid`. Nigdy nie poszerzaj publicznej projekcji członków grupy ani nie omijaj tej flagi. Endpoint listy członków jest z założenia anonimowy, a minimalna lista pól stanowi jego zabezpieczenie.
:::

### Element kalendarza i strony wydarzeń

Odpowiedzi elementu `calendar` to: `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, wartość domyślna, lub `upcoming`) oraz `tag`. B1App nadpisuje renderer apphelper w `src/components/Element.tsx` za pomocą `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderuje komponent `UpcomingEventsElement` z B1App. Pobiera on dane z `GET /content/events/public/group/:churchId/:groupId` lub `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, rozwija cykliczność za pomocą `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, jedno wystąpienie na wydarzenie w ciągu roku) i wyświetla pierwsze 12 jako kafelki ze zdjęciami (`events.photoUrl`, a w razie braku tytuł na ciemnym kolorze motywu). Kafelki prowadzą do `/events/{id}`, a menu Subskrybuj udostępnia kanał ICS kalendarza.
- **`display: "month"`** renderuje `CalendarElement` z apphelper z callbackiem `eventUrl`. Komponenty `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` po kliknięciu przechodzą pod ten adres URL, zamiast otwierać okno szczegółów (B1Admin nie przekazuje `eventUrl`, więc kalendarz w panelu zachowuje okno dialogowe).
- **`tag`** filtruje oba widoki za pomocą `EventHelper.hasTag()` (`@churchapps/helpers`): dopasowanie bez rozróżniania wielkości liter do rozdzielonej przecinkami listy `events.tags`; pusta wartość oznacza brak filtrowania. Złączenie kalendarza kuratorskiego wybiera `e.tags`, dzięki czemu wydarzenia kuratorskie również je posiadają.

Wydarzenia kuratorskie są linkowane przez `realEventId` (`eventPageId()`), więc adres URL zawsze wskazuje na rzeczywiste wydarzenie. `/{sdSlug}/events/[eventId]` to dedykowana trasa (nie potok kreatora): pobiera dane z `GET /content/events/public/:churchId/:id`, który zwraca `null` dla wydarzeń oczekujących lub odrzuconych oraz dla prywatnych wydarzeń bez rejestracji, a także dodaje `roomNames` z rezerwacji sal o statusie innym niż odrzucony. Renderuje `EventPageContent` (nagłówek ze zdjęciem, opis w markdown, panel boczny Kiedy/Gdzie, przycisk **Zarejestruj się na to wydarzenie**, gdy `registrationEnabled`, oraz link **Dodaj do mojego kalendarza** prowadzący do `GET /content/events/public/:churchId/:id/ical`). Zdjęcie służy jako obraz Open Graph, a dla najbliższego wystąpienia emitowany jest JSON-LD `Event` przez `EventPageJsonLd`. Nieznane lub ukryte wydarzenie zwraca prawdziwy kod 404.

## Widżety dla całej witryny

Dwa widżety wyświetlają się na każdej publicznej stronie, a nie wewnątrz drzewa: **AnnouncementBanner** (pasek u góry strony, który można zamknąć) oraz **Launcher** (pływający panel szybkich działań dla linków typu dai, odwiedź, oglądaj). Oba komponenty i ich funkcje `parse*Config()` znajdują się w apphelper. Konfiguracja to dwa wiersze publicznych ustawień o kluczach `announcementBanner` i `launcher`. Zapisuje je `SiteWidgetsEdit` w B1Admin (na stronie Wygląd), a odczytuje publiczny layout B1App przez `GET /content/settings/public/:churchId`. API traktuje je jako nieprzezroczyste pary klucz-wartość; nazwy kluczy to konwencja uzgodniona między obiema aplikacjami.

## Blog

Blog to samodzielny typ treści, a nie warstwa nad stronami kreatora. Wiersz `posts` przechowuje cały wpis: `title`, `slug`, `excerpt`, `content` (treść w markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Publiczna powierzchnia (wszystkie anonimowe, `PostController`):

| Trasa | Cel |
|-------|-----|
| `GET /content/posts/public/:churchId` | Opublikowane wpisy, z filtrowaniem `?category=&tag=` i stronicowaniem |
| `GET /content/posts/public/:churchId/categories` | Unikalne kategorie spośród opublikowanych wpisów |
| `GET /content/posts/public/:churchId/slug/:slug` | Jeden opublikowany wpis |
| `GET /content/posts/rss/:churchId?siteUrl=` | Kanał RSS 2.0 z tytułem zawierającym nazwę kościoła, z kategorią każdego elementu oraz opisem, którym jest zajawka lub treść |

Wpis jest „opublikowany”, gdy ustawiono `publishDate` i jej data już minęła. Przyszła `publishDate` oznacza wpis zaplanowany (ukryty publicznie, w panelu oznaczony etykietą Zaplanowany). Endpointy odczytu wzbogacają każdy wpis o `authorName`, rozwiązywane z `authorId` przez bramkę modułu członkostwa. Brakującą zajawkę zastępuje treść w markdown z usuniętymi znacznikami (około 160 znaków) na kartach listy, w metaopisach i w RSS. B1App udostępnia `/{sdSlug}/blog`, czyli listę w stylu redakcyjnym (wyśrodkowany nagłówek, który po filtrowaniu staje się nazwą aktywnej kategorii lub tagu, wiersz z filtrami kategorii w formie chipów, wiersze wpisów z miniaturą po lewej, autorem i zajawką), z kanałem RSS ogłoszonym jako link alternatywny. Udostępnia też `/{sdSlug}/blog/[postSlug]`, dedykowaną trasę (nie potok Zone/Section), z wyśrodkowanym nagłówkiem (nadtytuł kategorii, tytuł, autor, akcent w kolorze głównym), zdjęciem 16:9 o szerokości kontenera, treścią w markdown w kolumnie czytania o szerokości około 720 px, chipami tagów w stopce artykułu, paskiem `"More in {category}"` z powiązanymi wpisami oraz JSON-LD `BlogPosting` zawierającym autora. Obie strony korzystają wyłącznie z tokenów motywu, dzięki czemu dziedziczą paletę każdego kościoła. Adresy URL bloga są uwzględnione w mapie witryny (sitemap) danego kościoła. Interfejs autorski B1Admin (**Witryna → Blog**) edytuje wpisy w oknie dialogowym: edytor markdown z przełącznikiem podglądu, wybór obrazu z galerii przycinanego do 16:9, wybór autora (domyślnie edytujący użytkownik), autouzupełnianie kategorii na podstawie istniejących kategorii, walidacja zduplikowanych slugów oraz przełącznik publikacji. Opublikowane wiersze prowadzą do żywego wpisu, a strona przypomina administratorom o dodaniu linku `/blog` do nawigacji. Komentarze pozostawiono usługom zewnętrznym: ustawienie treściowe dla całego kościoła `blogFooterHtml` (edytowane w sekcji **Pod każdym wpisem** na stronie Blog, widocznej tylko z Ustawienia→Edytuj) jest renderowane pod każdym wpisem przez `BlogFooterEmbed` w B1App. Komponent ten odtwarza tagi `<script>`, dzięki czemu wykonują się w ramach `'strict-dynamic'`, i uruchamia je po kolei (zewnętrzny `src` kończy ładowanie, zanim uruchomi się kolejny skrypt inline), ponieważ fragmenty dostawców najpierw ładują bibliotekę, a dopiero potem ją wywołują.

## Strony tylko dla członków

`pages.visibility` wykorzystuje ten sam wyliczeniowy zbiór co linki nawigacyjne: `everyone` (domyślnie), `visitors`, `members`, `staff`, `team`, `groups` (z `groupIds`). Działa jednak jako **twarda bramka dostępu**, a nie filtr nawigacji (`PageVisibilityHelper.canViewPage`). Przebieg:

1. Anonimowy endpoint drzewa sprawdza widoczność przy pobieraniu opartym na adresie URL. Anonimowi wywołujący chronionej strony otrzymują `{ restricted: true, visibility }` zamiast treści, więc drzewo nigdy nie wycieka.
2. Endpoint nadal honoruje JWT: `CustomAuthProvider` weryfikuje nagłówek `Authorization` przy *każdym* żądaniu, także na trasach anonimowych, więc pobranie tego samego adresu przez uwierzytelnionego członka działa normalnie.
3. B1App renderuje `RestrictedPage` po odpowiedzi `restricted`: przywraca sesję z zapisanych danych uwierzytelniających, ponownie pobiera drzewo z JWT i je renderuje, albo — gdy sesji brak — wyświetla bramkę logowania z `returnUrl`.

:::info
Szczegółowość bramki różni się w zależności od poziomu: `groups` sprawdza `groupIds` z tokenu względem listy strony, a `staff` sprawdza `membershipStatus`, natomiast `members` i `team` obecnie przepuszczają każdego uwierzytelnionego użytkownika danego kościoła. Traktuj `groups` jako opcję ścisłą.
:::

## SEO i wykrywalność

Wszystko to jest renderowane przez B1App na podstawie danych ContentApi: API przechowuje dane, a aplikacja je emituje.

| Zagadnienie | Jak to działa |
|---------|--------------|
| Metaopisy | `pages.metaDescription` (≤300 znaków) trafia przez `MetaHelper.getMetaData()` do `Metadata` Next.js (description + Open Graph) na każdej trasie renderowanej przez kreator. Ustawienia strony w B1Admin zawierają przycisk AI „Generuj” (zob. poniżej) |
| Przekierowania | Wiersze `redirects` przypisane do kościoła, zarządzane pod adresem `/content/redirects` (`content.edit`, limit 200 wierszy, znormalizowane ścieżki). Gdy ścieżka kończyłaby się błędem 404, trasa strony B1App rozwiązuje ją przez `GET /content/redirects/public/:churchId` i zwraca HTTP 308 za pomocą `permanentRedirect` z Next. Ścieżki bez dopasowania przechodzą do `notFound()` |
| Markowa strona 404 | `not-found.tsx` renderuje `BrandedNotFound` z logo kościoła, jego nazwą i motywem, zamiast ogólnego błędu. Nieznane ścieżki `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` i `/volunteer/[planId]` zwracają prawdziwy kod 404, podobnie jak nieznane subdomeny i nieprawidłowe slugi stron (zob. [Routing witryn i wiele witryn](./websites.md)) |
| Dane strukturalne | JSON-LD `BlogPosting` dla wpisów blogowych; `VideoObject` na stronach pojedynczych kazań (`/{sdSlug}/sermons/[sermonId]`) oraz na stronach zawierających element `sermons`; `Event` z elementów kalendarza i wydarzeń na stronach kreatora oraz na każdej stronie `/{sdSlug}/events/[eventId]` (najbliższe wystąpienie, ze zdjęciem wydarzenia jako `image`); `Event` ze schema.org z elementu `serviceTimes` |
| Strony kazań | Każde publiczne kazanie ma indeksowalną stronę pod adresem `/sermons/[sermonId]` z pełnymi metadanymi. Kazania nie są już zamknięte wewnątrz przeglądarki działającej po stronie klienta |
| Analityka | Publiczny klucz ustawień `ga4MeasurementId` (zarządzany obok przekierowań w B1Admin) wstrzykuje dla danego kościoła gtag GA4 przez `next/script`. Aplikacja B1 (`/{sdSlug}/mobile`) wysyła również wyświetlenia stron na ten identyfikator, obok własnego tagu ChurchApps, o ile jest on poprawnym identyfikatorem `G-` (identyfikatory kontenerów GTM pozostają wyłącznie w witrynach). Każde wywołanie `gtag('config')` zawiera `display_mode` o wartości `installed` lub `browser`, na podstawie `navigator.standalone` lub zapytania o media `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Mapa witryny i kanały | Trasa `sitemap.xml` dla danego kościoła obejmuje strony kreatora, adresy blogów oraz 50 najnowszych stron kazań (z `<lastmod>` pochodzącym z daty publikacji każdego kazania). Uwzględnia też wbudowane strony `/sermons`, `/groups` i `/volunteer`, gdy mają treść (publiczne grupy, plany zgłoszeń), chyba że zapisane przekierowanie zastępuje tę ścieżkę. `/` jest pomijane, gdy kościół nie ma strony głównej, ponieważ `/` przekierowuje wtedy na niedozwoloną ścieżkę `/mobile`. Lista blogów ogłasza kanał RSS |
| Dostępność | Publiczny element interfejsu renderuje link pomijający (skip link), który wskazuje na punkt orientacyjny `<main id="main-content">` w każdym opakowaniu layoutu |

## Generowanie treści przez AI (AskApi)

Generowanie stron i witryn działa w **AskApi**, osobnej usłudze, pod kontrolerem `/website`. Uwierzytelnia się tym samym JWT `CustomAuthProvider` co wszystkie pozostałe usługi i jest **bezstanowa względem treści**: każdy endpoint zwraca JSON, a wywołujący (B1Admin) zapisuje wynik przez ContentApi (`POST /content/pages/importTree` tworzy stronę z pełnym zagnieżdżonym drzewem sekcji i elementów jednym wywołaniem; zawsze wstawia ją w ramach kościoła wywołującego i ignoruje identyfikatory w treści żądania).

### Generowanie strony (`planPage` → `writePage`)

Szablon „AI” w `AddPageModal` w B1Admin korzysta z tanich potoków (`AskApi/src/helpers/SiteGenHelper.ts`), opartych na jednej zasadzie: **żaden model nie generuje JSON kreatora**. Dwa modele dzielą pracę przez Vercel AI Gateway (zwykłe HTTP, klucz SSM `/{env}/aiGatewayApiKey` lub `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — typowany model decyzyjny, który zwraca wybory, oceny i wartości logiczne z prawdopodobieństwami, ale nie potrafi pisać tekstu. Wybiera kolejno każdą sekcję z ustalonej biblioteki szablonów, ocenia układy, sprawdza fakty w tekstach oraz dobiera zdjęcia stockowe i ikony. Koszt wejścia wynosi około 0,04 USD za milion tokenów, a wyjście jest bezpłatne, więc około 90 wywołań na stronę kosztuje ułamek centa.
- **Mały model czatu (domyślnie GPT-4.1 mini)** — wypełnia nazwane, ograniczone długością sloty tekstowe wybranych szablonów. Model pisarski to jedna stała, którą można nadpisać zmienną środowiskową `SITEGEN_COPY_MODEL` (dowolny identyfikator modelu czatu dostępny w gatewayu, np. `anthropic/claude-haiku-4.5`). W porównaniu w ciemno na trzech kościołach Claude Haiku 4.5 brzmiał nieco cieplej, ale GPT-4.1 mini był blisko, około cztery razy taniej i szybciej, dlatego jest domyślny. Pełna strona ze wszystkimi trzema układami kosztuje około 1,3 centa, z czego około 80% przypada na model pisarski.

| Faza | Endpoint | Co się dzieje |
|-------|----------|---------------|
| 1 | `POST /website/planPage` | Klasyfikuje typ strony (strona główna, odwiedziny, o nas…), następnie losuje 10 kandydackich układów z prawdopodobieństw JEV dla każdej rundy (hero + liczba sekcji → każda sekcja → zakończenie), usuwa duplikaty, pozwala JEV ocenić każdy z nich pod kątem dopasowania, przepływu i luk, i zwraca 3 najlepsze wraz z głosem pisarskim oraz `suggestedStyle` (paleta + czcionki). Kandydaci mający te same sekcje do danego momentu zadają JEV identyczne pytanie, dlatego rundy są zapamiętywane według prefiksu. Najlepszy wynik poniżej 6 jest zapisywany w logu jako `lowLayoutScore`. Ten log to lista szablonów wartych dodania. Około 2 s |
| 2 | `POST /website/writePage` (jedno wywołanie na kandydata) | Model pisarski wypełnia tekst slotów po dwie sekcje na wywołanie, równolegle, i zwraca pięć nagłówków hero, spośród których wybiera JEV. JEV sprawdza fakty w każdej sekcji. Sekcje, które nie przeszły weryfikacji, zawierają frazę szablonową lub powtarzają wcześniejszą sekcję (wspólne ciągi czterech słów, sprawdzane w kodzie), są przepisywane równolegle z podaniem konkretnego powodu. Skrypt czyszczący w kodzie usuwa zdania zawierające szablonowe sformułowania ze stron kościołów (chyba że własny opis kościoła ich używa). JEV wybiera tematy zdjęć, ikony i dzielnik kształtu hero, a następnie ocenia wynik. Zwraca gotowe do zapisu drzewo sekcji oraz wynik. Około 6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin zapisuje tylko układ o najwyższej pozycji (drugi w kolejności jest awaryjny, gdyby zapis się nie powiódł), zapisuje go i otwiera podgląd (około 10 s po kliknięciu Zapisz) |

Każda faza to osobne żądanie, dzięki czemu każde wywołanie mieści się w limicie 29 sekund API Gateway. Szablony w `SiteGenHelper.buildTree` to ustalone drzewa sekcji i elementów z katalogu (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) i odwołują się do tokenów motywu (`var(--accent)`, `var(--lightAccent)`…), dzięki czemu wygenerowane strony dziedziczą istniejący wygląd kościoła. Dodanie szablonu sekcji wymaga dodania listy jej slotów do `SECTIONS` oraz drzewa do `buildTree`. Test jednostkowy przechodzi po każdym szablonie i waliduje drzewo.

**Dane wejściowe.** Tekst może podawać jako fakty wyłącznie informacje z dwóch źródeł: tego, co wpisał użytkownik, oraz `churchContext.facts`, czyli rekordów zebranych przez B1Admin przed planowaniem (publiczne godziny nabożeństw, publiczne nazwy grup, a także nazwa i adres kościoła). Te same flagi decydują o szablonach opartych na danych: `times` renderuje aktualny element `serviceTimes`, gdy kościół prowadzi godziny nabożeństw w B1 (w przeciwnym razie wstawiana jest statyczna tabela), a `groups` i `countdown` są oferowane tylko wtedy, gdy istnieją za nimi dane. Wywołania JEV są zabezpieczane hedgingiem: po 1,5 s uruchamiane jest duplikat, a wygrywa pierwsza odpowiedź, ponieważ brama czasem się zawiesza, a wywołania są prawie darmowe.

**Pozostawanie przy temacie.** Polecenie użytkownika jest *tematem strony*, a nie tłem dotyczącym kościoła. `planPage` klasyfikuje żądanie (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). Dla stron typu `event` i `topic` ogólne szablony kościelne (notatka od pastora, kazania, służby, grupy, wpływ na społeczność, godziny nabożeństw z odliczaniem i wideo hero) nie są nawet oferowane, natomiast oferowane są `details` (kiedy / gdzie / co zabrać) oraz `eventCountdown` z datą. Obaj sędziowie oceniają trafność tematyczną. B1Admin przekazuje `pageType` z planu do każdego wywołania `writePage`.

**Pełne strony z krótkich żądań.** Strony mają od trzech do sześciu sekcji środkowych, dość długie sloty, wprowadzenie w sekcjach kart oraz FAQ z pięcioma pytaniami. Etap naprawczy rozszerza każdą sekcję, która wróciła zbyt krótka. Generowanie odbywa się jednym kliknięciem: nie ma pytań uzupełniających. Jeśli żądanie pomija zwykły szczegół potrzebny w pełnej stronie (godzinę rozpoczęcia, salę, co zabrać, jak się zapisać), model pisarski uzupełnia go wiarygodnym, skromnym wyborem, który kościół może edytować. Ponieważ sekcje są pisane równolegle, te luki są rozstrzygane **raz**, w `planPage` (`assumedDetails`, jedno małe wywołanie modelu pisarskiego działające równolegle z losowaniem układów), a następnie przekazywane do każdego wywołania `writePage` przez `churchContext.assumedDetails`. Dzięki temu jedna sekcja nie może podać 5:00, a inna 5:30. JEV naprawia każdą sekcję, która przeczy żądaniu, rekordom kościoła lub ustalonym szczegółom. Ustalone szczegóły nie są pokazywane w interfejsie; kościół przegląda i edytuje stronę jak każdą inną. Niektórych rzeczy nigdy nie wymyśla się: imion osób, numerów telefonów, adresów e-mail i internetowych, cen, statystyk, historii kościoła, cytatów przypisywanych konkretnym osobom ani dnia tygodnia dla daty, której żądanie nie określało.

**Wizualizacje.** Szablony nie nazywają swoich zdjęć ani ikon. Pozostawiają wolne sloty, a jeden ogólny przebieg (`visualSlots` → `pickVisuals` → `applyVisuals` w `SiteGenHelper`) przechodzi przez gotowe drzewo i wypełnia każdy z nich: tło sekcji lub wpis galerii oznaczony `auto:photo`, `auto:icon`, dzielnik `auto:divider` hero oraz, bez żadnego znacznika, każdy element `textWithPhoto`, `card` lub `image`, którego `photo` jest pusty. JEV wybiera każde zdjęcie na podstawie przylegającego tekstu (zdjęcie karty na podstawie jej tytułu i treści, tło na podstawie tekstu sekcji), a na jednej stronie temat się nie powtarza. Nowy szablon dostaje więc zdjęcia bez dodatkowej pracy. Zdjęcia to tematy wyszukiwania Pexels, emitowane jako symbole zastępcze `pexels:<term>`, które B1Admin rozwiązuje przez `POST /content/stock/search`. Klient, który nie wysyła `resolvesPhotos`, otrzymuje wbudowany obraz hero, płaskie kolorowe pasy i karty bez zdjęć. Celowo nie ma tematów portretowych, a szablon pastora nie zawiera zdjęcia: obcy człowiek z banku zdjęć nigdy nie może zastępować prawdziwej osoby. Dla kościoła bez żadnych stron B1Admin stosuje `suggestedStyle` do globalnych stylów; istniejące witryny zachowują swój wygląd.

### Pozostałe endpointy

:::info
Przycisk przepisania w `SectionToolbar` oraz przycisk „Generuj witrynę” na liście stron w B1Admin pozostają po stronie klienta zakomentowane. Poniższe endpointy AskApi nadal odpowiadają; ukryty jest tylko ten interfejs.
:::

| Endpoint | Cel |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Oryginalny dwuetapowy przepływ strony (zarys, a następnie jedno wywołanie LLM na sekcję zwracające JSON elementów). Zastąpiony w B1Admin przez `planPage`/`writePage` ze względu na koszty; pozostawiony dla konsumentów API |
| `POST /website/generateSite` | Generowanie całej witryny. **Dwufazowe z założenia**: wywołanie `planOnly: true` zwraca tylko plan wielu stron (jedno szybkie wywołanie modelu), a następnie klient żąda pełnej treści, dzięki czemu każde żądanie mieści się w limicie czasu Lambda/API Gateway |
| `POST /website/rewriteSection` | Przepisanie zachowujące strukturę: model może zmienić wyłącznie odpowiedzi zawierające tekst. Rekurencyjna sygnatura struktury (identyfikatory + typy + kolejność) jest porównywana przed i po; każda niezgodność zwraca oryginalną sekcję z `fallback: true`, zamiast uszkodzonej struktury |
| `POST /website/generateAltText` | Wywołanie wizyjne dla do 20 adresów URL obrazów; zwraca zwięzły tekst alternatywny (≤125 znaków), z usuniętymi prefiksami „zdjęcie przedstawiające” |
| `POST /website/generateMetaDescription` | Jeden metaopis SEO (≤155 znaków) na podstawie tekstu strony. Podłączony do przycisku Generuj w ustawieniach strony B1Admin |

Prompty dla tych endpointów to pliki markdown w `AskApi/config/instructions/`, w tym katalog elementów, z którego generuje model. Dwie zasady projektowe utrzymują ten katalog rzetelnym: klient przekazuje `availableElementTypes` przy każdym żądaniu (prompt może używać wyłącznie typów z tej listy, a serwer nigdy nie wpisuje na sztywno pełnego zestawu), a narzędzie MCP `describe_page_builder` w API zawiera ten sam przewodnik dla agentów AI pracujących przez [MCP](../api/mcp.md). Modelami są Anthropic Claude przez OpenRouter: 3.5 Haiku do treści sekcji (ze względu na opóźnienia), 3.5 Sonnet do zarysów, planów witryn i wizji, z zapasowym OpenAI, gdy nie skonfigurowano klucza OpenRouter.

## Formularze konwersacyjne

Formularze (moduł członkostwa) otrzymały tryb konwersacyjny, przeznaczony dla stron w stylu kart kontaktowych. Cztery kolumny w `forms` sterują nim: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderowanie** — `FormSubmissionEdit` z apphelper przełącza się na komponent `ConversationalForm` (jedno pytanie naraz), gdy `displayMode` ma wartość `conversational`. Strona formularza w B1App przekazuje ten tryb dalej. Ładunek zgłoszenia jest taki sam w obu trybach.
- **Automatyczne tworzenie osoby** — przy zgłoszeniu z ustawionym `autoCreatePerson` `ConversationalFormHelper.findOrCreatePerson` deduplikuje po adresie e-mail (bez rozróżniania wielkości liter), a w przeciwnym razie tworzy gospodarstwo domowe i osobę o `membershipStatus: "Guest"`, po czym łączy zgłoszenie z tą osobą.
- **E-mail z podziękowaniem** — gdy ustawiono temat i treść, zgłaszający otrzymuje szablonowy e-mail (z tokenami `{firstName}` / `{churchName}`) przez istniejącą ścieżkę transakcyjną (`TransactionalEmailHelper`), nigdy przez cykliczny przegląd powiadomień. Oba efekty uboczne są niekrytyczne: błąd nigdy nie powoduje utraty zgłoszenia.

Te cztery pola są obecnie ustawiane przez API; edytor formularzy w B1Admin ich jeszcze nie udostępnia.

## Pamięć podręczna witryny publicznej

Publiczna ścieżka renderowania B1App buforuje pobierania oznaczone kościołem (`next: { revalidate: 300, tags: [sdSlug] }` na produkcji; `0` w środowisku deweloperskim), dzięki czemu strona na żywo może pozostać nieaktualna przez maksymalnie pięć minut po zapisie w ContentApi. `POST /api/revalidate/{sdSlug}` w B1App wywołuje `revalidateTag(sdSlug)` i jest jedynym sposobem na wcześniejsze opróżnienie tej pamięci podręcznej.

Dwa miejsca w systemie z niego korzystają:

1. **B1Admin** — `clearSiteCache()` w `B1Admin/src/site/siteCache.ts` wysyła POST po zapisach w edytorze. Preferuje subdomenę aktywnej witryny (witryna dodatkowa musi unieważnić *swój* tag, a nie domyślny tag kościoła).
2. **Api** — zmiany treści, które nie przechodzą przez B1Admin (klucze API, MCP, AI), wywołują `SiteCacheHelper.bump(churchId)` z kontrolerów treści. Helper rozwiązuje subdomenę kościoła przez `SubDomainHelper` i wysyła POST do `{b1AppRoot}/api/revalidate/{sd}`. Błędy są ignorowane, dzięki czemu nieosiągalna aplikacja B1App nie może spowodować niepowodzenia zapisu.

Kontrolery wykonujące `bump`: strony (zapis, usunięcie, duplikowanie, publikacja, odrzucenie, cofnięcie publikacji, tymczasowe AI), sekcje, elementy, bloki, linki, globalne style, wpisy oraz przekierowania. Deweloperski `b1AppRoot` to `http://{subdomain}.localtest.me:3301`, a wersje demo i produkcyjne używają `https://{subdomain}.b1.church`.

## Powiązane strony

- [Routing witryn i wiele witryn](./websites.md) — jak żądanie trafia do kościoła/witryny i jak działa routing domen niestandardowych
- [Endpointy treści](../api/endpoints/content.md) — pełny interfejs REST dla stron, sekcji, elementów, bloków, wpisów, przekierowań i ustawień
- [AppHelper](../shared-libraries/app-helper.md) — pakiet npm zawierający renderery, rejestr, dzielniki i widżety
- [MCP Server](../api/mcp.md) — w tym narzędzie-przewodnik `describe_page_builder`
- [Edytor stron (dla użytkowników)](/docs/b1-admin/website/page-editor) — dokumentacja edytora dla personelu
