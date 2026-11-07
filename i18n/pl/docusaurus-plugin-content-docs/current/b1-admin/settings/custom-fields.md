---
title: "Pola niestandardowe"
description: "Definiuj w B1 Admin pola niestandardowe, np. daty ważności zaświadczeń o niekaralności lub rozmiary koszulek, i wyszukuj oraz filtruj osoby po tych polach."
---

# Pola niestandardowe

<div class="article-intro">

**Pola niestandardowe** pozwalają śledzić własne informacje w rekordzie każdej osoby, czyli rzeczy, do których B1 nie ma gotowego pola, na przykład datę wygaśnięcia sprawdzenia w rejestrze karnym, rozmiar koszulki albo status kursu chrztu. Pole definiujesz raz w Ustawieniach, a następnie wpisujesz wartość w profilu każdej osoby i możesz według niej wyszukiwać lub tworzyć listy. To zastępuje dawne obejście, polegające na tworzeniu formularza dla osób tylko po to, by zapisać jedną dodatkową informację.

</div>

## Film szkoleniowy

<YouTube id="yUfDEbp2HQ4" title="Pola niestandardowe, edycja zbiorcza i eksport w B1" next="Tworzenie grup i dodawanie członków w B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia **edycji** dla sekcji **Osoby**, aby definiować pola i wypełniać wartości, oraz dostępu do obszaru **Ustawienia**. Każdy, kto ma uprawnienie do **przeglądania** osób, może zobaczyć te wartości. Zobacz [Role i uprawnienia](./roles-permissions.md).
- Przed rozpoczęciem zdecyduj, co chcesz śledzić i który typ pola najlepiej pasuje (tekst, liczba, data, odpowiedź tak/nie lub lista wyboru).

</div>

## Otwieranie pól niestandardowych

W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), wybierz **Ustawienia > Ustawienia** i kliknij **Pola niestandardowe** na liście po lewej stronie, aby przewinąć do sekcji **Pola niestandardowe**. Możesz też przejść bezpośrednio pod adres **/settings/custom-fields**. Zobaczysz listę wszystkich zdefiniowanych pól wraz z ich **Nazwą** i **Typem pola**. Jeśli nie utworzono jeszcze żadnego pola, panel wyświetla komunikat *„Nie dodano jeszcze żadnych pól niestandardowych."*

## Dodawanie pola

1. Kliknij **Dodaj pole**.
2. W edytorze, który otworzy się po prawej stronie, wpisz **Nazwę**. To etykieta, którą zobaczą pracownicy w profilach osób i w wyszukiwarce (na przykład *Data wygaśnięcia sprawdzenia w rejestrze karnym*).
3. Wybierz **Typ pola**:
   - **Pole tekstowe**: krótki tekst dowolnej treści.
   - **Liczba całkowita**: liczby bez części dziesiętnej (na przykład liczba osób).
   - **Liczba dziesiętna**: liczby, które mogą zawierać część dziesiętną.
   - **Data**: data w kalendarzu.
   - **Tak/Nie**: prosta odpowiedź tak lub nie.
   - **Wybór z listy**: lista wyboru. Po wybraniu tego typu pojawia się **edytor opcji**, w którym dodajesz każdą opcję, jaką mogą wybrać osoby.
4. Kliknij **Zapisz**.

Pole jest teraz dostępne w profilu każdej osoby.

:::info
Typy pól są takie same jak w [pytaniach w formularzach](../forms/creating-forms.md), dzięki czemu wartości zachowują się spójnie w całym B1.
:::

## Edytowanie pola

Kliknij dowolny wiersz pola na liście, aby ponownie otworzyć je w edytorze. Zmień nazwę, typ lub opcje i kliknij **Zapisz**.

:::warning
Zmiana **typu pola**, które ma już zapisane wartości (na przykład z Pola tekstowego na Datę), może spowodować, że wcześniej wpisane wartości nie będą już pasować do nowego typu. Zmieniaj typy ostrożnie, gdy pracownicy zaczną już wypełniać to pole.
:::

## Usuwanie pola

Otwórz pole do edycji i kliknij **Usuń**. Zostaniesz poproszony o potwierdzenie: *„Czy na pewno chcesz usunąć to pole niestandardowe? Zapisane w nim wartości również zostaną usunięte."* Usunięcie pola trwale usuwa je **wraz z każdą zapisaną dla niego wartością** u wszystkich osób. Tej operacji nie można cofnąć.

## Wypełnianie wartości w profilu osoby

Gdy istnieje co najmniej jedno pole niestandardowe, jego wartości znajdują się obok wbudowanych danych w rekordzie każdej osoby. Wartości widzisz wraz z danymi kontaktowymi osoby po lewej stronie profilu, a edytujesz je w tym samym formularzu, którego używasz do pozostałych informacji o osobie. Dopóki nie zdefiniujesz pierwszego pola, nic dodatkowego się nie pojawi.

1. Otwórz rekord osoby w sekcji **Osoby**.
2. Kliknij przycisk **Edytuj** po lewej stronie profilu, pod danymi kontaktowymi osoby.
3. Przewiń do obszaru **Pola niestandardowe** na dole formularza edycji i wpisz wartość dla każdego pola. Każde pole pokazuje element wprowadzania odpowiadający jego typowi: wybór daty dla pól typu Data, listę rozwijaną tak/nie dla pól Tak/Nie, listę wyboru dla Wyboru z listy i tak dalej.
4. Kliknij **Zapisz**. Wartości pól niestandardowych zapisują się razem z pozostałymi danymi osoby.

Po powrocie do profilu każde pole z wartością pojawia się pod danymi kontaktowymi osoby w formacie *Nazwa pola: wartość* (odpowiedzi Tak/Nie wyświetlają się jako *Tak* lub *Nie*, a w polach Wyboru z listy widoczna jest etykieta wybranej opcji). Puste pola są po prostu ukryte. Aby usunąć wartość, edytuj osobę, wyczyść pole i zapisz. Pusta wartość jest usuwana z rekordu, a nie zapisywana jako pusta.

:::tip
Klasyczny przykład to bezpieczeństwo wolontariuszy: utwórz pole **Data** o nazwie *Data wygaśnięcia sprawdzenia w rejestrze karnym*, wpisz datę dla każdego wolontariusza, a następnie utwórz [zapisaną listę](../people/lists.md), która wskaże osoby, których data już minęła.
:::

## Wyszukiwanie i tworzenie list na podstawie pól niestandardowych

Pola niestandardowe w pełni obsługują wyszukiwanie:

1. Na stronie **Osoby** otwórz [Wyszukiwanie zaawansowane](../people/searching-people.md).
2. Rozwiń kategorię **Pola niestandardowe**.
3. Zaznacz pole, według którego chcesz filtrować, wybierz operator i wpisz wartość. Dostępne operatory zależą od typu pola:
   - **Pole tekstowe**: zawiera, jest równe, zaczyna się od, kończy się na.
   - **Liczba całkowita / Liczba dziesiętna**: równa się, większa niż, większa lub równa, mniejsza niż, mniejsza lub równa.
   - **Data**: równa się, po (późniejsza niż), przed (wcześniejsza niż).
   - **Tak/Nie**: równa się Tak lub Nie.
   - **Wybór z listy**: równa się jednej z opcji lub zawiera jedną z opcji.

Dowolne wyszukiwanie oparte na polu niestandardowym możesz zapisać jako [listę](../people/lists.md). Listy są zapytaniami na żywo, więc lista utworzona dla *Data wygaśnięcia sprawdzenia w rejestrze karnym jest przed dzisiejszą datą* ponownie sprawdza każdą osobę za każdym razem, gdy ją otworzysz. Nie musisz jej ręcznie aktualizować.

## Wyświetlanie pola niestandardowego jako kolumny

Aby od razu zobaczyć wartości pola dla wszystkich osób, dodaj je jako kolumnę na stronie **Osoby**. Przełącz **Wyświetl jako** na **Tabela**, kliknij ikonę **Wybierz kolumny** w nagłówku strony, przejdź do zakładki **Niestandardowe** i zaznacz pole. Wartość każdej osoby pojawi się w osobnej kolumnie obok kolumn wbudowanych. Zobacz [Wyświetlanie pól niestandardowych jako kolumn](../people/searching-people.md#showing-custom-fields-as-columns).

## Co się dzieje podczas scalania

Gdy [scalasz dwa rekordy osób](../people/adding-people.md), wartości pól niestandardowych przenoszą się automatycznie. Osoba, którą zachowujesz, zachowuje swoje wartości. W przypadku każdego pola, w którym wartość miała tylko usuwana osoba, ta wartość zostaje skopiowana, dzięki czemu żadna informacja nie przepada.

## Powiązane artykuły

- [Wyszukiwanie osób](../people/searching-people.md): wyszukiwanie zaawansowane, w tym kategoria Pola niestandardowe oraz wyświetlanie pól jako kolumn
- [Zapisane listy](../people/lists.md): zapisywanie wyszukiwania opartego na polu niestandardowym i ponowne uruchamianie go na żywo
- [Role i uprawnienia](./roles-permissions.md): kto może definiować pola i edytować wartości
- [Tworzenie formularzy](../forms/creating-forms.md): do zbierania danych w wielu pytaniach, gdy pełny formularz lepiej pasuje niż pojedyncze pola
