---
title: "Śledzenie frekwencji"
---

# Śledzenie frekwencji

<div class="article-intro">

Gdy kampusy, godziny nabożeństw i grupy są już skonfigurowane, B1 Admin ułatwia przeglądanie danych o frekwencji i wychwytywanie trendów. Strona Frekwencja otwiera się na podsumowaniu frekwencji z bieżącego tygodnia, a jej raporty **Wszystkie lata** oferują dwa główne widoki: zakładkę **Trend frekwencji** z trendami dla całego kościoła oraz zakładkę **Frekwencja w grupach** ze szczegółami dotyczącymi grup. Dzięki tym narzędziom możesz zrozumieć wzorce wzrostu, zidentyfikować spadek zaangażowania i podejmować decyzje oparte na danych dla swojego kościoła.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Struktura frekwencji musi być skonfigurowana co najmniej z jednym kampusem i jedną godziną nabożeństwa. Jeśli jeszcze tego nie zrobiono, zobacz [Konfiguracja frekwencji](setup.md).
- Dane o frekwencji muszą być zarejestrowane, zanim raporty zaczną pokazywać wyniki. Dane mogą pochodzić z [ręcznego wprowadzania](recording-attendance.md) lub [samodzielnego zameldowania](check-in.md).

</div>

## Przeglądanie trendów frekwencji

1. Otwórz **B1 Admin**, otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Ludzie** i kliknij **Frekwencja**.
2. Kliknij **Wszystkie lata** w lewej kolumnie. Domyślnie wybrana jest zakładka **Trend frekwencji**.
3. Raport uruchamia się automatycznie po otwarciu zakładki i pokazuje łączną frekwencję dla każdego tygodnia.

:::tip
Aby szybko sprawdzić bieżący tydzień, główna strona Frekwencja pokazuje, ile osób jest w tym tygodniu na sali, podział według pomieszczeń (grup), liczbę gości oraz 13-tygodniowy wykres słupkowy zameldowań. Nie trzeba do tego żadnego raportu.
:::

## Filtrowanie danych

Użyj filtrów w polu **Filtruj raport**, aby zawęzić wyniki, a następnie kliknij **Uruchom raport**:

- **Kampus** -- wybierz kampus, aby zobaczyć frekwencję tylko w tej lokalizacji.
- **Nabożeństwo** -- ogranicz raport do jednego nabożeństwa.
- **Godzina nabożeństwa** -- wybierz godzinę nabożeństwa, aby przyjrzeć się konkretnemu spotkaniu.
- **Grupa** -- pokaż frekwencję jednej grupy.
- **Data początkowa** i **Data końcowa** -- zakres dat do uwzględnienia. Domyślnie raport obejmuje ostatni rok, od roku temu do dzisiaj, a data końcowa jest uwzględniona w całości.

Raport pokazuje wykres słupkowy i tabelę łącznych wizyt w każdym tygodniu. Każdy tydzień jest opisany datą niedzieli tego tygodnia. Tabela zawiera także kolumnę **Daty sesji** z rzeczywistymi datami w danym tygodniu, w których odnotowano frekwencję (na przykład "9/27, 9/30"). Dzięki temu widać, kiedy spotkanie w środku tygodnia jest liczone w tym samym tygodniu co niedziela.

:::info
Raporty uruchamiają się automatycznie za każdym razem, gdy otwierasz zakładkę Trend frekwencji, więc zawsze zobaczysz aktualne dane bez potrzeby klikania przycisku odświeżania.
:::

## Frekwencja w grupach

Zakładka **Frekwencja w grupach** pokazuje, kto uczestniczył w każdym spotkaniu grupy. Jest to przydatne, gdy chcesz monitorować konkretną klasę, zespół służby lub mała grupę, zamiast patrzeć na ogólne liczby z nabożeństw.

1. W raportach **Wszystkie lata** wybierz zakładkę **Frekwencja w grupach**.
2. Opcjonalnie wybierz **Kampus** i **Nabożeństwo**.
3. Ustaw **Data początkowa** i **Data końcowa**. Domyślnie raport obejmuje okres od ostatniej niedzieli do dzisiaj.
4. Kliknij **Uruchom raport**.

Wyniki są grupowane według daty sesji, a następnie według godziny nabożeństwa i grupy. Osoby, które uczestniczyły, są wymienione pod każdą grupą. Godziny nabożeństw, grupy i nazwiska są sortowane alfabetycznie, dzięki czemu każdy nagłówek pojawia się tylko raz. W wierszu każdej osoby widoczna jest także kolumna **Zameldowany** z godziną zarejestrowania frekwencji (puste, jeśli brak zapisanej godziny) oraz kolumna **Status członkostwa** (na przykład Członek lub Gość), dzięki której od razu zauważysz gości.

Aby pobrać dane, kliknij **Opcje pobierania** i wybierz **Podsumowanie**. Plik CSV zawiera jeden wiersz na członka grupy, posortowany według grupy, a następnie według nazwiska, oraz kolumnę dla każdej sesji z datą w wybranym zakresie (na przykład "niedziela - 9:00 AM (2026-09-27)"), oznaczoną jako **obecny** lub **nieobecny**.

:::tip
Frekwencja w grupach jest szczególnie cenna dla [liderów małych grup](../groups/creating-groups.md), którzy chcą śledzić zaangażowanie w swojej grupie w czasie.
:::

## Wskazówki dotyczące korzystania z danych o frekwencji

- Przeglądaj trendy co miesiąc, aby wcześnie wychwycić wzorce sezonowe.
- Porównuj dane na poziomie kampusów, aby zrozumieć, które lokalizacje się rozwijają.
- Korzystaj z raportów na poziomie grup, aby kontaktować się z [grupami](../groups/group-members.md), w których frekwencja spada.
- Połącz wnioski o frekwencji z narzędziem [Wyszukiwanie AI](../people/ai-search.md), aby znaleźć osoby, które ostatnio nie przychodziły.

## Powiązane strony

- [Rejestrowanie frekwencji](recording-attendance.md) -- ręczne wprowadzanie frekwencji na spotkaniu grupy
- [Wprowadzanie liczby uczestników i trend](headcount-entry.md) -- prostsza alternatywa oparta na łącznej liczbie, z własnym tygodniowym wykresem trendu
- [Zameldowanie](check-in.md) -- konfiguracja samodzielnego zameldowania, aby frekwencja była rejestrowana automatycznie
