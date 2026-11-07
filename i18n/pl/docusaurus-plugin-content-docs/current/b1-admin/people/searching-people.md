---
title: "Wyszukiwanie osób"
---

# Wyszukiwanie osób

<div class="article-intro">

Strona **Osoby** wyświetla katalog Twojego kościoła jako przeszukiwalną listę gospodarstw domowych lub jako sortowalną tabelę poszczególnych osób. Możesz szybko znaleźć każdego członka zboru, dostosować, jakie informacje są wyświetlane, i wyeksportować wyniki. Sprawne wyszukiwanie jest niezbędne w codziennej administracji kościoła, na przykład przy kontaktowaniu się z odwiedzającymi, przygotowywaniu list kontaktów i prowadzeniu danych członków.

</div>

## Film szkoleniowy

<YouTube id="7Y-tN9RmnDQ" title="Wyszukiwanie osób i tworzenie list w B1" next="Pola niestandardowe, edycja zbiorcza i eksport w B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz aktywnego konta B1 Admin z uprawnieniami do przeglądania osób. Jeśli nie wiesz, jakie masz uprawnienia, zobacz [Role i uprawnienia](roles-permissions.md).
- Twój katalog kościoła powinien zawierać osoby. Jeśli nikogo jeszcze nie dodano, zobacz [Dodawanie osób](adding-people.md) lub [Importowanie danych](importing-data.md).

</div>

## Gospodarstwa domowe i widoki tabeli

Strona Osoby wyświetla katalog według **gospodarstw domowych**, pogrupowanych alfabetycznie. Każdy wiersz pokazuje zdjęcia gospodarstwa, jego nazwę (na przykład „Rodzina Kowalskich”) oraz imiona i nazwiska wszystkich jego członków. Kliknij gospodarstwo, aby otworzyć profil osoby będącej głową rodziny, lub kliknij imię dowolnego członka, aby otworzyć jego profil. Licznik nad listą pokazuje, ile gospodarstw domowych i osób jest wyświetlanych.

Użyj przełącznika **Widok** nad listą, aby przełączać się między **Gospodarstwa domowe** a **Tabela**. Widok **Tabela** wyświetla jedną osobę w wierszu i to tutaj możesz sortować dane i wybierać kolumny (patrz poniżej). B1 zapamiętuje Twój wybór na tym urządzeniu.

W widoku **Tabela** status członkostwa każdej osoby pojawia się pod jej imieniem i nazwiskiem. Każdy z siedmiu statusów ma własny kolor, taki sam jak na profilu danej osoby. Osoba, której rola w gospodarstwie domowym jest ustawiona na **Dziecko**, ma też etykietę **Dziecko** obok statusu. Aby oznaczyć kogoś jako dziecko, ustaw jego rolę w [panelu gospodarstwa domowego](./adding-people.md#managing-households) na jego profilu.

Domyślnie strona ładuje pierwszą część katalogu. Jeśli masz więcej osób, kliknij **Pokaż wszystkich członków** pod listą, aby załadować wszystkich.

## Szybkie wyszukiwanie

Pole **Znajdź gospodarstwo domowe lub osobę** na górze strony Osoby pozwala wyszukiwać członków na bieżąco:

1. Kliknij **pole wyszukiwania** na górze strony Osoby.
2. Zacznij wpisywać imię lub nazwisko.
3. Wyniki będą filtrowane automatycznie podczas pisania (jest krótkie opóźnienie, około pół sekundy, aby wyszukiwanie nie uruchamiało się przy każdym naciśnięciu klawisza).
4. Lista poniżej zaktualizuje się i pokaże tylko pasujące wyniki.

Kliknij **Wyczyść** (pod polem wyszukiwania), aby zresetować wyszukiwanie i ponownie pokazać cały katalog.

:::tip
Nie musisz naciskać Enter. Wyszukiwanie uruchamia się automatycznie, gdy przestaniesz pisać.
:::

## Sortowanie wyników

W widoku **Tabela** osoby są wyświetlane według nazwiska, a potem imienia. Możesz posortować katalog inaczej, klikając nagłówek dowolnej kolumny:

1. Kliknij **nagłówek kolumny** (na przykład **Imię i nazwisko** lub **E-mail**), aby posortować według tej kolumny.
2. Kliknij ten sam nagłówek ponownie, aby odwrócić kolejność sortowania.

Dzięki temu łatwo znaleźć osoby alfabetycznie, według wieku lub według innej widocznej kolumny.

## Dostosowywanie kolumn

Nie wszystkie informacje muszą być widoczne jednocześnie. Możesz wybrać, które kolumny pojawiają się w tabeli:

1. Kliknij ikonę **Wybierz kolumny** w nagłówku strony Osoby. (Kolumny dotyczą widoku **Tabela**).
2. Zaznacz lub odznacz kolumny, aby je wyświetlić lub ukryć. Dostępne kolumny to:
   - **Zdjęcie**
   - **Imię i nazwisko**
   - **E-mail**
   - **Telefon**
   - **Adres**
   - **Data urodzenia**
   - **Wiek**
   - **Płeć**
   - **Status członkostwa**
   - **Kampus**
   - **Data dodania** -- kiedy utworzono wpis osoby
3. Tabela zaktualizuje się od razu, odzwierciedlając Twój wybór. Kliknij **Gotowe**, aby zamknąć okno **Wybierz kolumny**.

### Wyświetlanie pól niestandardowych jako kolumn

Selektor kolumn ma dwie karty: **Standardowe** zawiera wbudowane kolumny wymienione powyżej, a **Niestandardowe** zawiera [pola niestandardowe](../settings/custom-fields.md) Twojego kościoła oraz pytania z formularzy dotyczących osób. Zaznacz pole niestandardowe na karcie **Niestandardowe**, aby dodać je jako kolumnę. Wartość tego pola dla każdej osoby pojawi się w tabeli. Wartości są pokazywane tak samo jak na profilu osoby: pola Tak/Nie pokazują *Tak* lub *Nie*, pola wielokrotnego wyboru pokazują etykietę opcji, a daty są pokazywane w krótkim formacie. Osoby bez wartości dla tego pola mają pustą komórkę.

## Eksportowanie wyników wyszukiwania

Możesz w dowolnym momencie pobrać bieżące wyniki wyszukiwania jako plik CSV:

1. Zastosuj wybrane wyszukiwanie lub filtry.
2. Kliknij przycisk **Eksportuj** w nagłówku strony Osoby.
3. Plik CSV zostanie pobrany na Twój komputer, gotowy do otwarcia w Excelu, Arkuszach Google lub innym arkuszu kalkulacyjnym.

Więcej szczegółów o eksporcie znajdziesz w [Eksportowanie danych](./exporting-data.md).

:::tip
W bardziej zaawansowanych zapytaniach -- na przykład gdy chcesz znaleźć wszystkich, którzy nie byli na nabożeństwie w ciągu ostatnich trzech miesięcy -- wypróbuj funkcję [Wyszukiwanie AI](./ai-search.md), która pozwala wyszukiwać, zadając pytania zwykłym językiem.
:::

## Wyszukiwanie zaawansowane

Wyszukiwanie zaawansowane pozwala tworzyć precyzyjne filtry, łącząc warunki. Otwórz je, klikając **Zaawansowane** pod polem wyszukiwania na stronie Osoby, a następnie rozwiń kategorię i zaznacz pola, według których chcesz filtrować (możesz kliknąć nazwę pola lub jego pole wyboru). Dla każdego pola wybierz operator i wartość. Kategorie to **Imiona i nazwiska**, **Dane demograficzne**, **Kontakt**, **Członkostwo**, **Aktywność** (darowizny i frekwencja) oraz **Pola niestandardowe**.

Aby znaleźć nowe osoby, otwórz **Członkostwo** i zaznacz **Data dodania**. Domyślnie ustawiony jest warunek **w ciągu ostatnich N dni** z wartością 30, więc jednym kliknięciem znajdziesz wszystkie osoby dodane w ciągu ostatniego miesiąca. Możesz zmienić liczbę dni lub przełączyć się na *równa się / po / przed*, aby wybrać datę. **Data urodzenia** i **Rocznica** także oferują opcję **w ciągu ostatnich N dni**. Data dodania jest zapisywana tylko dla osób utworzonych od końca października 2026 r. Osoby dodane wcześniej nie mają tej daty, więc ten filtr ich nie znajdzie.

Kategoria **Pola niestandardowe** zawiera [pola niestandardowe](../settings/custom-fields.md) Twojego kościoła, czyli pola, które definiujesz w Ustawieniach, aby śledzić własne informacje (na przykład datę wygaśnięcia sprawdzenia w rejestrze karnym). Dostępne operatory zależą od typu pola: pola tekstowe obsługują *zawiera / równa się / zaczyna się od / kończy się na*, pola liczbowe obsługują operatory porównania, pola dat obsługują *równa się / po / przed*, a pola Tak/Nie i wielokrotnego wyboru pozwalają wybrać wartość. Każde pole, według którego można tu filtrować, może zostać zapisane jako aktywna [Lista](./lists.md).

## Zapisywanie wyszukiwań jako list

Po wykonaniu wyszukiwania w nagłówku strony Osoby pojawia się przycisk **Zapisz jako listę**. Kliknij go, aby zapisać bieżące zapytanie pod nazwą i opcjonalną kategorią, dzięki czemu w przyszłych sesjach możesz je natychmiast wczytać. Szczegółowe informacje znajdziesz w [Zapisane listy](./lists.md).
