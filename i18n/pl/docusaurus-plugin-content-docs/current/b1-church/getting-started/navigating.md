---
title: "Nawigacja po B1App"
---

# Nawigacja po B1App

<div class="article-intro">

Portal członka w B1.church to aplikacja internetowa zoptymalizowana pod telefony, dostępna pod adresem `/mobile`. Działa w każdej przeglądarce i można ją dodać do ekranu głównego. Ta strona opisuje panel Strona główna, dolny pasek kart, stronę Więcej oraz stronę Ja.

</div>

## Film wprowadzający

<YouTube id="8XKRZvvAbXg" title="Wycieczka po aplikacji dla członków B1.church" next="Wycieczka po B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Aby zobaczyć swoje dane osobowe, musisz [się zalogować](./logging-in.md). Osoby niezalogowane mogą nadal przeglądać publiczne treści, a tam, gdzie funkcja wymaga konta, pojawi się przycisk **Zaloguj się**.

</div>

## Strona główna {#home}

Otwarcie `https://yourchurchname.b1.church/mobile` przenosi do panelu **Strona główna** pod adresem `/mobile/dashboard`. To strona startowa portalu członka. Zaczyna się od powitania („Dzień dobry”, „Dzień dobry po południu” lub „Dobry wieczór”, wraz z twoim imieniem) i dzisiejszej daty, a następnie wyświetla sekcje, które pojawiają się tylko wtedy, gdy są potrzebne:

- **Kafelki ze zdjęciami** -- zakładki, do których kościół przypisał zdjęcie (w tym Werset dnia), pojawiają się jako kafelki pod nazwą kościoła. W zależności od ustawień kościoła są układane w siatkę dwukolumnową, w poziomy rząd, który można przesuwać palcem (może też przesuwać się samodzielnie), lub w listę z małą miniaturą obok każdej nazwy. Zobacz [Kafelki na ekranie głównym](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Każda zakładka ze zdjęciem pojawia się tutaj, nawet jeśli ma też miejsce na dolnym pasku kart.
- **Najnowsze kazanie** -- najnowsze kazanie w kościele, z linkiem **Wszystkie kazania**
- **Werset dnia** -- dzisiejszy werset; dotknij go, aby otworzyć pełną stronę [Werset dnia](../content/verse-of-the-day.md)
- **Służysz** -- twoje najbliższe przydziały służby, z linkiem **Wszystkie plany**. Jeśli któryś przydział wymaga jeszcze twojej odpowiedzi, pojawia się najpierw, z odznaką **Wymaga odpowiedzi** oraz przyciskami **Akceptuj** i **Odrzuć**, dzięki czemu możesz odpowiedzieć bezpośrednio na stronie głównej (**Odrzuć** najpierw poprosi o potwierdzenie). W przeciwnym razie twoje najbliższe przydziały mają odznakę **Zaakceptowano** lub **Potwierdzono**. Dotknij przydziału, aby otworzyć jego plan.
- **Twoje grupy** -- do trzech z twoich grup wraz z godziną i miejscem spotkań oraz link **Wszystkie grupy**
- **Nadchodzące wydarzenia** -- po zalogowaniu: najbliższe trzy wydarzenia z grup, do których należysz, każde z datą i godziną (oraz miniaturą, jeśli wydarzenie ma zdjęcie). Dotknij wydarzenia, aby otworzyć listę wydarzeń jego grupy. Dotknij **Wszystkie nadchodzące wydarzenia**, aby otworzyć pełną listę na [stronie Ja](./me-page.md#upcoming), która zawiera także twoje przydziały służby i rejestracje.
- **Moja obecność** i **Moje formularze** -- jeśli kościół je włączy: liczba twoich wizyt w ciągu ostatnich 90 dni wraz z dwiema ostatnimi wizytami oraz dwa ostatnie przesłane formularze, z linkami do pełnych list. Te sekcje zawsze pojawiają się też na [stronie Ja](./me-page.md) -- zobacz [Sekcje ekranu głównego](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Dary** -- ile przekazałeś w tym roku (\"Przekazano w\" bieżący rok), przycisk **Przekaż** (widoczny tylko wtedy, gdy kościół oferuje dary online) oraz link **Historia** do [historii darowizn](../giving/donation-history.md). Sekcja jest ukryta, jeśli kościół ograniczył historię darów członków do wcześniejszego roku lub ją ukrył; wtedy narzędzie do darów kościoła pojawia się jako przycisk w sekcji **Więcej z** poniżej.
- **Więcej z** *twojego kościoła* -- przyciski do pozostałych narzędzi włączonych przez kościół, które nie znajdują się już na dolnym pasku kart ani powyżej. Te, z których korzystasz najczęściej, są wyświetlane na początku.

Sekcje służby, grup, obecności, formularzy i darów pojawiają się tylko wtedy, gdy jesteś zalogowany, kościół włączył dane narzędzie i jest coś do pokazania -- na przykład nadchodzący przydział lub przynajmniej jedna grupa. Na komputerze strona główna jest ułożona w dwóch kolumnach.

Jeśli nie jesteś zalogowany, zamiast powitania strona główna wyświetla nagłówek **Witamy**, krótką zachętę („Zaloguj się, aby zobaczyć swoje grupy, dary i nie tylko.”) oraz przycisk **Zaloguj się**. Zachęta pojawia się nawet wtedy, gdy kościół nie skonfigurował jeszcze niczego innego na stronie głównej. Kościół może zmienić jej treść lub ją ukryć -- zobacz [Ustawienia aplikacji mobilnej](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Gdy jest ukryta, nadal możesz się zalogować ze strony **Więcej** lub **Ja**.

## Dolny pasek kart

Na telefonie u dołu ekranu znajduje się stały pasek kart:

- **Strona główna** -- zawsze pierwsza karta
- Do trzech kart skonfigurowanych przez kościół
- **Więcej** -- otwiera stronę Więcej

Wbudowane ekrany (takie jak Grupy, Dary lub Plany) otrzymują miejsca na pasku jako pierwsze; wolne miejsca przypadają niestandardowym stronom kościoła. Linki do zewnętrznych stron internetowych oraz Werset dnia nigdy nie dostają karty na pasku. Jeśli kościół skonfigurował więcej kart, niż się mieści, pozostałe nie znikają: pojawiają się na stronie **Więcej** oraz w sekcji **Więcej z** na stronie głównej. Kolejność kart ustawiają administratorzy kościoła w B1 Admin, w sekcji **Mobile → Nawigacja**.

## Na komputerze

Na szerszym ekranie, na przykład komputerze lub dużym tablecie, dolny pasek kart zastępuje nagłówek u góry ekranu w kolorze kościoła. Zawiera logo kościoła (lub jego nazwę, jeśli logo nie zostało ustawione; kliknięcie przenosi na stronę główną), **Strona główna**, do pięciu kart skonfigurowanych przez kościół oraz **Więcej**, a po prawej stronie dzwonek i zdjęcie profilowe. Po otwarciu ekranu szczegółów nad treścią strony pojawia się link **Wstecz**.

## Strona Więcej

Dotknięcie **Więcej** otwiera stronę Więcej pod adresem `/mobile/more`. Zawiera ona:

- Twoje imię i zdjęcie wraz z linkiem **Edytuj profil** -- zobacz [Edytowanie profilu](./editing-your-profile.md)
- Wszystkie karty skonfigurowane przez kościół, w kolejności, pod nazwą kościoła. Linki do zewnętrznych stron otwierają się w nowej karcie przeglądarki.
- Sekcję **Konto** zawierającą:
  - **Ja** -- twoja osobista strona (tylko po zalogowaniu)
  - **Wygląd** -- przełączanie między **Trybem jasnym** a **Trybem ciemnym**
  - **Portal administracyjny** -- widoczny tylko wtedy, gdy masz uprawnienia administratora w kościele; otwiera B1 Admin w nowej karcie
  - **Zainstaluj aplikację** -- otwiera [instrukcje instalacji](./installing-pwa.md) pod adresem `/mobile/install` (ukryte po zainstalowaniu aplikacji)
- **Wyloguj się** lub przycisk **Zaloguj się**, jeśli nie jesteś zalogowany
- Nazwę kościoła oraz link do polityki prywatności

## Pasek aplikacji

Na telefonie pasek u góry każdego ekranu pokazuje:

- Logo kościoła (lub jego nazwę, jeśli kościół nie wgrał logo) na stronie głównej i innych głównych ekranach albo strzałkę wstecz, gdy jesteś na ekranie szczegółów. Tytuł ekranu pojawia się na samej górze strony.
- Ikonę **dzwonka** do powiadomień i wiadomości, z licznikiem nieprzeczytanych elementów -- zobacz [Powiadomienia i wiadomości](#notifications-and-messages) poniżej
- Twoje **zdjęcie profilowe**, które otwiera profil pod adresem `/mobile/profileEdit` -- zobacz [Edytowanie profilu](./editing-your-profile.md)

Dzwonek i zdjęcie profilowe pojawiają się tylko po zalogowaniu.

## Powiadomienia i wiadomości

Dotknięcie dzwonka otwiera panel z dwiema sekcjami:

- **Wiadomości** -- twoje ostatnie prywatne rozmowy wraz z linkiem **Nowa wiadomość**, aby rozpocząć nową
- **Powiadomienia** -- twoje ostatnie powiadomienia, z odznaką **Nowe** przy nieprzeczytanych. Dotknij powiadomienia, aby przejść do grupy, planu lub rozmowy, z której pochodzi.

Każda sekcja pokazuje liczbę nieprzeczytanych elementów. Dotknij **Zobacz wszystkie** na dole, aby otworzyć pełną skrzynkę pod adresem `/mobile/notifications`.

## Strony z sekcjami

Strony szczegółów -- grupa, plan, twoja strona Ja, ekrany Planów i Darów -- są ułożone jako jedna strona z sekcjami zamiast kart. Każda sekcja pokazuje krótki podgląd, a link w nagłówku sekcji (na przykład **Wszyscy członkowie**, **Wszystkie wydarzenia** lub **Pełny porządek nabożeństwa**) otwiera pełną listę. Link **Wróć do** u góry tego widoku przenosi z powrotem na stronę, z której przyszedłeś.

## Strona Ja

**Ja** (`/mobile/me`) to twoje osobiste centrum. Pokazuje twoje imię i zdjęcie wraz z przyciskami **Edytuj profil** i **Ustawienia** ([preferencje powiadomień](./notification-preferences.md)), a następnie to, co nadchodzi: przydziały służby, rejestracje na wydarzenia i wydarzenia grup. Dalej znajdują się twoje gospodarstwo domowe, grupy, [dary](../giving/) w tym roku, przesłane formularze, historia obecności, [rejestracje](../events/my-registrations.md) oraz ostatnie powiadomienia i wiadomości. Szczegóły znajdziesz w artykule [Strona Ja](./me-page).

Jeśli nie jesteś zalogowany, zamiast tego strona Ja pokazuje przycisk **Zaloguj się**.

## Instalacja na ekranie głównym

Portal członka jest Progresywną Aplikacją Internetową (PWA). Odwiedź `/mobile/install` (lub wybierz **Zainstaluj aplikację** na stronie Więcej), aby zobaczyć instrukcje krok po kroku dla swojego urządzenia. Po zainstalowaniu aplikacja otwiera się z ekranu głównego na pełnym ekranie, bez paska przeglądarki. Zobacz [Instalacja jako aplikacja (PWA)](./installing-pwa.md).

## Publiczna strona internetowa kościoła

Poza portalem członka publiczna strona internetowa kościoła ma własną nawigację w nagłówku, z linkami ustawionymi przez administratorów -- na przykład [kazania](../content/sermons.md), [Biblia](../content/bible.md), [transmisje na żywo](../content/live-streaming.md) oraz publiczna lista grup. Na telefonie te linki znajdują się za ikoną hamburgera w prawym górnym rogu nagłówka.

:::info
Karty i narzędzia, które widzisz, zależą od kościoła. Administratorzy decydują, które sekcje są widoczne dla członków, w B1 Admin. Jeśli nie widzisz opisanej tu funkcji, być może kościół jej nie włączył.
:::
