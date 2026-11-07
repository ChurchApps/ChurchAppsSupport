---
title: "Korzystanie z edytora stron"
---

# Korzystanie z edytora stron

<div class="article-intro">

Edytor stron B1 to wizualny kreator typu przeciągnij i upuść, który pozwala projektować strony witryny kościoła bez pisania kodu. Możesz dodawać sekcje i bloki treści, dostosowywać style, podglądać swoją pracę i cofać zmiany -- wszystko w przeglądarce.

</div>

## Film szkoleniowy

<YouTube id="m2B_JxmfFm4" title="Edytowanie stron i nawigacji w B1" next="Podłączanie domeny niestandardowej w B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Wykonaj [Wstępną konfigurację](initial-setup), aby skonfigurować swoją witrynę
- Utwórz co najmniej jedną stronę w sekcji [Zarządzanie stronami](managing-pages)
- Aby otworzyć edytor, potrzebujesz uprawnienia **content.edit**

</div>

## Otwieranie edytora

1. W B1 Admin otwórz [menu Przejdź do](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Witryna** i kliknij **Strony**.
2. Znajdź stronę, którą chcesz edytować, w tabeli stron i kliknij **Edytuj treść**.

Edytor otworzy się w trybie pełnoekranowym. Lewy panel pokazuje strukturę strony i dostępne elementy treści, a środkowy obszar -- podgląd strony na żywo.

:::info
Edytor zawsze wyświetla się w jasnym motywie, niezależnie od ustawienia motywu w B1 Admin, i używa czcionek nagłówków oraz tekstu, które wybrano w sekcji [Wygląd](appearance). Dzięki temu podgląd dokładnie odpowiada temu, jak strona będzie wyglądać dla odwiedzających witrynę.
:::

## Struktura strony: sekcje i elementy

Każda strona składa się z dwóch poziomów:

- **Sekcje** -- Najwyższe kontenery, które dzielą stronę na poziome pasy (na przykład sekcja główna, blok treści lub pasek stopki). Zanim dodasz treść, każda strona musi mieć co najmniej jedną sekcję.
- **Elementy** -- Pojedyncze fragmenty treści umieszczone w sekcji, takie jak tekst, obrazy, przyciski, karty, formularze i kalendarze.

### Dodawanie sekcji

1. Kliknij **Dodaj sekcję** (lub przycisk **+** u góry lewego panelu).
2. Wybierz sposób rozpoczęcia:
   - **Z szablonu** -- przeglądaj galerię szablonów sekcji pogrupowanych według kategorii (Sekcja główna, O nas, Usługi, Darowizny itd.) i kliknij wybrany, aby wstawić gotową, w pełni stylizowaną sekcję. Po dodaniu możesz dostosować wszystko.
   - **Pusta sekcja** -- wybierz układ kolumn (jedna, dwie, trzy kolumny itd.) i twórz od podstaw.
3. Nowa sekcja pojawi się w podglądzie. Kliknij ją, aby ją zaznaczyć, i skonfiguruj jej kolor tła, odstępy wewnętrzne oraz inne opcje stylu.

### Zmiana układu sekcji

Masz już gotową sekcję, ale chcesz inną strukturę? Użyj przełącznika układu w tej sekcji, aby zamienić jej układ kolumn na inny z galerii, zachowując dotychczasową treść i elementy.

### Dodawanie elementów do sekcji

1. Kliknij wewnątrz sekcji w podglądzie, aby ją zaznaczyć.
2. Kliknij **Dodaj treść** i wybierz typ elementu z listy:
   - **Tekst** -- Nagłówki, akapity i tekst sformatowany
   - **Obraz** -- Prześlij zdjęcie lub podaj do niego link
   - **Przycisk** -- Klikalny link wzywający do działania
   - **Karta** -- Obraz z tytułem i opisem
   - **Formularz** -- Osadź [formularz](../forms/creating-forms) bezpośrednio na stronie. Jeśli formularz ma [zdjęcie nagłówkowe](../forms/creating-forms.md#adding-a-header-photo), wyświetli się ono nad pytaniami
   - **Kalendarz** -- Wyświetl kalendarz wydarzeń
   - **FAQ** -- Bloki pytań i odpowiedzi w formie akordeonu
   - **Wideo** -- Osadź wideo na podstawie adresu URL
   - **Przeglądarka grup** -- Katalog wszystkich grup kościelnych z opcjonalnym wyszukiwaniem, filtrem kategorii i filtrem etykiet
   - **Wyróżnienie z ikoną** -- Ikona z tytułem i krótkim opisem, do prezentowania cech lub obszarów służby
   - **Galeria** -- Siatka lub układ murowany z wieloma zdjęciami
   - **Opinia** -- Jeden lub więcej cytatów z imieniem autora, rolą i zdjęciem
   - **Ikony mediów społecznościowych** -- Ikony z linkami do profili kościoła w mediach społecznościowych: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo i Podcast. Wpisz link dla każdej platformy, którą chcesz pokazać; w przypadku **WhatsApp** użyj linku `https://wa.me/` z numerem telefonu lub linkiem zaproszenia do grupy
   - **Odliczanie** -- Licznik odliczający czas do daty lub cotygodniowego nabożeństwa
   - **Statystyki** -- Rząd dużych liczb z opisami (członkowie, lata, filie)
   - **Postęp kampanii** -- Pasek postępu na żywo dla kampanii zbiórki, pokazujący łączną kwotę zebraną na cel funduszu
   - **Siatka zespołu** -- Karty ze zdjęciami członków grupy; grupa musi mieć włączoną opcję **publicznej listy**
   - **Godziny nabożeństw** -- Harmonogram nabożeństw w Twoich filiach, pobierany automatycznie z konfiguracji frekwencji
   - **Kazania** -- Biblioteka kazań w pełnym przeglądarce lub w układzie siatki, listy albo wyróżnionego najnowszego
   - **Mapa** -- Osadzona mapa wyśrodkowana na adresie kościoła
   - **Tabela** -- Prosta siatka wierszy i kolumn do danych tabelarycznych
   - **Tekst ze zdjęciem** -- Tekst i obraz obok siebie
   - **Logo** -- Logo kościoła, pobierane z sekcji [Wygląd](appearance)
   - **Transmisja na żywo** -- Odtwarzacz transmisji na żywo, osadzony bezpośrednio na stronie
   - **Podcast** -- Lista odcinków pobrana z zewnętrznego kanału RSS podcastu, którego adres podajesz, z ustawieniami liczby wyświetlanych odcinków oraz tego, czy pokazywać daty i opisy. Każdy odcinek na działającej witrynie ma odtwarzacz audio oraz link **Pobierz**, który zapisuje plik audio odcinka pod tytułem odcinka. Ten element służy do prezentowania dowolnego kanału podcastu na Twojej witrynie; aby opublikować własne kazania jako podcast, zobacz [Zarządzanie kazaniami](../sermons/managing-sermons.md#your-podcast-feed)
   - **Darowizna** -- Przycisk darowizny lub osadzony formularz darowizn
   - **HTML** -- Własny kod HTML do zaawansowanych zastosowań, na przykład osadzenia widgetu innej firmy (zobacz [Korzystanie z elementu HTML](#using-the-html-element))
   - **iFrame** -- Osadź zewnętrzną treść na podstawie adresu URL
3. Skonfiguruj element za pomocą panelu ustawień, który się pojawi.

### Korzystanie z elementu HTML

Element **HTML** ma dwa pola:

- **Zawartość HTML** -- Kod, który ma być wyświetlany na stronie. Wszystkie znaczniki `<script>` umieszczone tutaj będą działać na działającej witrynie.
- **JavaScript (bez znacznika script)** -- Kod skryptu uruchamiany po załadowaniu strony. Możesz też wkleić tutaj fragment osadzenia od dostawcy wraz ze znacznikami `<script>`, a zostanie on uruchomiony na działającej witrynie.

Jeśli wkleisz do pola JavaScript sam adres internetowy (na przykład link do obrazu), pole zmieni kolor na czerwony z ostrzeżeniem *„To jest adres internetowy, a nie JavaScript."* Sam adres w tym polu nic nie robi. Aby wyświetlić obraz, użyj elementu **Obraz** lub wstaw `<img src="...">` do pola **Zawartość HTML**.

### Korzystanie z elementu Kalendarz {#using-the-calendar-element}

Element **Kalendarz** pokazuje wydarzenia z jednego z Twoich kalendarzy:

1. W sekcji **Wybierz** wybierz **Kalendarz grupy** (wydarzenia jednej grupy -- lista pokazuje grupy, do których należysz) lub **Wyselekcjonowany kalendarz** (kalendarz, który utworzyłeś w sekcji **Kalendarze**; zobacz [Wyselekcjonowany kalendarz](../calendars/curated-calendar)).
2. W sekcji **Wybierz kalendarz** wskaż grupę lub kalendarz.
3. W sekcji **Wyświetlanie** wybierz sposób prezentacji:
   - **Kalendarz miesięczny** -- Siatka miesiąca, po której odwiedzający mogą się przełączać.
   - **Nadchodzące wydarzenia** -- Siatka kafelków z kolejnymi 12 wydarzeniami; wydarzenie cykliczne pokazywane jest raz, przy najbliższej dacie. Każdy kafelek pokazuje zdjęcie wydarzenia (lub jego tytuł na ciemnym kolorze motywu, jeśli wydarzenie nie ma zdjęcia), znacznik daty, dzień i godzinę oraz pierwszy wiersz opisu. Przycisk **Subskrybuj** nad kafelkami pozwala odwiedzającym skopiować link ICS kalendarza lub go pobrać. Dla tej opcji pojawia się ustawienie **Układ**: **Siatka** (domyślnie) lub **Przewijanie (automatyczne)**, które układa kafelki w jednym rzędzie przewijanym samoczynnie.
4. Aby pokazać tylko niektóre wydarzenia, wpisz tag w polu **Tylko wydarzenia z tagiem** -- na przykład `młodzież`. Pojawią się tylko wydarzenia, których **Tagi** zawierają to słowo. Pozostaw pole puste, aby pokazać wszystkie wydarzenia. Tagi ustawia się przy każdym wydarzeniu; zobacz [Dodawanie i edytowanie wydarzeń](../calendars/creating-calendars.md#adding-and-editing-events).

W obu trybach kliknięcie wydarzenia otwiera jego własną stronę w Twojej witrynie. Strona wydarzenia pokazuje zdjęcie, tytuł, datę i godzinę oraz opis, a także ramkę z informacjami **Kiedy** (w tym wzorzec powtarzania dla wydarzenia cyklicznego) i **Gdzie** (zarezerwowane sale). Gdy zapisy są włączone, pojawia się też przycisk **Zapisz się na to wydarzenie**, a link **Dodaj do mojego kalendarza** pobiera wydarzenie jako plik kalendarza. Strona jest przygotowana tak, aby wyszukiwarki mogły pokazywać datę i szczegóły wydarzenia w wynikach. Strony wydarzeń z wyselekcjonowanych kalendarzy, wyświetlane na Twoich stronach (dla wydarzeń w ciągu najbliższych sześciu miesięcy), są też umieszczane w mapie witryny, dzięki czemu wyszukiwarki mogą je znaleźć.

### Zmiana kolejności treści

Przeciągaj sekcje lub elementy za uchwyt (sześć kropek) po lewej stronie każdego z nich, aby zmienić ich kolejność. Elementy możesz przeciągać w obrębie sekcji lub przenosić między sekcjami.

## Stylizacja strony

### Style sekcji

Kliknij dowolną sekcję, aby otworzyć jej panel stylów. Możesz ustawić:

- **Tło** -- Jednolity kolor, gradient lub obraz. Przy tle obrazowym wybierz **Punkt ostrości**, klikając w obraz, aby wskazać, która jego część ma pozostać na środku przy skalowaniu sekcji, a opcja **Nakładka** pozwala nałożyć półprzezroczysty kolor na obraz, poprawiając czytelność tekstu.
- **Odstępy wewnętrzne** -- Odstęp górny i dolny wewnątrz sekcji
- **Szerokość** -- Pełna szerokość lub wyśrodkowana/ograniczona
- **Separatory** -- Dekoracyjne kształty przejścia (fala, skos, łuk, trójkąt i inne) na górnej lub dolnej krawędzi sekcji, z ustawieniami koloru, wysokości i odbicia

### Style elementów

Kliknij dowolny element, aby otworzyć jego panel stylów. Typowe opcje to rozmiar czcionki, kolor, wyrównanie, margines i odstępy wewnętrzne. Dla obrazów możesz ustawić tekst alternatywny oraz cel linku.

### Własny CSS

Do zaawansowanego stylowania każda sekcja i każdy element ma pole **Własny CSS**, w którym możesz napisać własne reguły CSS. Działają one tylko w zakresie danego elementu, więc nie wpłyną przypadkowo na resztę strony.

:::tip
Jeśli chcesz zastosować style w całej witrynie -- na przykład własną czcionkę lub globalny kolor -- użyj ustawień [Wygląd](appearance) zamiast własnego CSS na poszczególnych stronach.
:::

## Podgląd strony

Użyj narzędzi podglądu na pasku narzędzi, aby sprawdzić, jak strona wygląda przy różnych rozmiarach ekranu:

- **Komputer** -- Widok przeglądarki na pełną szerokość
- **Telefon** -- Widok w wąskim formacie telefonu

Na telefonach kolumny w wierszu układają się jedna nad drugą na pełnej szerokości, chyba że w ustawieniach wiersza ustawisz dla nich **Szerokość na telefonie**. Listy kazań i podcastów również układają tekst każdego odcinka pod miniaturą na telefonach.

Aby zobaczyć działającą stronę dokładnie tak, jak zobaczą ją odwiedzający, wróć do listy Stron i kliknij ścieżkę strony. Otworzy się ona w nowej karcie przeglądarki.

## Sprawdzanie dostępności

Kliknij ikonę **Dostępność** na pasku narzędzi, aby uruchomić szybkie sprawdzenie najczęstszych problemów -- obrazów bez tekstu alternatywnego, niskiego kontrastu kolorów lub nagłówków w złej kolejności. Każdy problem prowadzi bezpośrednio do elementu, który wymaga uwagi, dzięki czemu możesz go poprawić na miejscu.

## Cofanie zmian

Edytor automatycznie zapisuje historię edycji. Użyj przycisków na pasku narzędzi lub skrótów klawiszowych:

- **Cofnij** (Ctrl+Z / Cmd+Z) -- Cofa ostatnią czynność
- **Ponów** (Ctrl+Shift+Z lub Ctrl+Y / Cmd+Shift+Z) -- Ponawia cofniętą czynność

Możesz też przywrócić stronę do wcześniejszej migawki. Kliknij **Wyświetl historię** na pasku narzędzi, aby zobaczyć listę zapisanych migawek z opisami, a następnie kliknij dowolny wpis, aby przywrócić stan z tego momentu.

:::warning
Przywrócenie migawki zastępuje bieżącą treść strony wersją z migawki. Nie można tego cofnąć standardowym przyciskiem Cofnij. Jeśli chcesz mieć możliwość powrotu, zapisz migawkę bieżącego stanu, zanim przywrócisz starszą.
:::

## Zapisywanie i publikowanie

Zmiany są zapisywane automatycznie w trakcie pracy. Wskaźnik stanu na pasku narzędzi pokazuje, czy Twoje zmiany zostały zapisane.

### Stan roboczy i opublikowany

Strony mogą mieć stan **opublikowany**, który określa, kiedy odwiedzający zobaczą Twoje zmiany. Pasek narzędzi wyświetla znacznik ze stanem strony:

- **Publikowana od razu po zapisaniu** -- Strona nie korzysta z procesu publikacji. Każda zapisana zmiana od razu staje się widoczna. To domyślne ustawienie nowych stron.
- **Niepublikowane zmiany** -- Strona była już wcześniej opublikowana, ale wprowadziłeś zmiany od ostatniej publikacji. Odwiedzający nadal widzą poprzednio opublikowaną wersję.
- **Opublikowana** -- Strona jest na żywo, a zapisana treść odpowiada temu, co widzą odwiedzający.

Aby opublikować zmiany, kliknij przycisk **Opublikuj** na pasku narzędzi. Strona staje się widoczna od razu.

Aby cofnąć zmiany do ostatniej opublikowanej wersji bez wpływu na to, co widzą odwiedzający, otwórz menu rozwijane (⋮) i kliknij **Odrzuć niepublikowane zmiany**.

Aby przestać korzystać z procesu publikacji, otwórz menu rozwijane i kliknij **Wyłącz publikowanie**. Od tej pory edycje znów będą od razu widoczne.

:::tip
Korzystaj z przepływu roboczego i publikacji, gdy chcesz przygotować stronę -- na przykład na nadchodzące wydarzenie -- i udostępnić ją dopiero we właściwym momencie. Zbuduj stronę i sprawdź podgląd, a gdy będziesz gotowy, kliknij Opublikuj.
:::

## Powiązane artykuły

- [Zarządzanie stronami](managing-pages) -- Tworzenie stron, ustawianie adresów URL i zarządzanie nawigacją witryny
- [Wygląd](appearance) -- Ustawianie kolorów, czcionek i wizerunku marki dla całej witryny
- [Pliki](files) -- Przesyłanie obrazów i dokumentów do użycia w edytorze
- [Tworzenie formularzy](../forms/creating-forms) -- Budowanie formularzy, które możesz osadzać na stronach
