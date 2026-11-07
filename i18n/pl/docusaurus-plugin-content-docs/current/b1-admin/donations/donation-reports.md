---
title: "Raporty dotyczące darowizn"
description: "Przeglądaj sumy darowizn, odejścia darczyńców i szczegóły partii w B1 Admin dzięki pulpitowi Donations Summary, widokowi Lapsed Givers i eksportom CSV."
---

# Raporty dotyczące darowizn

<div class="article-intro">

B1 Admin daje kilka sposobów przeglądania i analizowania danych o darowiznach w Twoim kościele. Panel darowizn na stronie **Podsumowanie** w sekcji Darowizny przedstawia wizualny przegląd z wykresami i filtrami, a sekcja Raporty oferuje bardziej szczegółowy raport Podsumowanie darowizn. Skorzystaj z tych narzędzi, aby śledzić trendy w darowiznach, przygotować się do posiedzeń rady lub uzgodnić swoje zapisy.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Upewnij się, że darowizny zostały [zapisane w partiach](recording-donations.md) lub [zaimportowane z Stripe](stripe-import.md)
- Sprawdź, czy [fundusze](funds.md) są poprawnie skonfigurowane, aby darowizny były właściwie kategoryzowane

</div>

## Panel darowizn

Panel darowizn to widok **Pulpit** strony **Podsumowanie**, pierwszej strony, jaką widzisz po otwarciu sekcji **Darowizny**.

1. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pole wyszukiwania w lewym górnym rogu B1 Admin), rozwiń **Darowizny** i kliknij **Podsumowanie**. Strona **Podsumowanie** otworzy się w widoku **Pulpit**. Przełącznik **Widok** w prawym górnym rogu przełącza między **Pulpit** a **Darczyńcy, którzy przestali dawać**.
2. Użyj przełączników **Tygodniowo**, **Miesięcznie** i **Kwartalnie** nad raportem, aby wybrać sposób grupowania darowizn.
3. W panelu **Filtruj raport** ustaw **Data początkowa** i **Data końcowa** (domyślnie od roku temu do wczoraj) i opcjonalnie wybierz **Fundusz**, a następnie kliknij **Uruchom raport**. Raport uruchamia się automatycznie z domyślnymi ustawieniami po otwarciu strony.
4. Cztery **karty wskaźników KPI** pokazują wskaźniki darowizn dla wybranego zakresu:
   - **Łączne darowizny** -- Łączna kwota przekazana.
   - **Średnia darowizna** -- Średnia kwota darowizny.
   - **Unikalni darczyńcy** -- Liczba różnych osób, które przekazały darowiznę.
   - **Łączna liczba darowizn** -- Łączna liczba pojedynczych darowizn.
5. Poniżej wskaźników wykres słupkowy pokazuje darowizny w ujęciu tygodniowym, miesięcznym lub kwartalnym, z podziałem na fundusze.
6. Kliknij **Opcje pobierania** i wybierz **Podsumowanie**, aby wyeksportować plik CSV z sumami według okresu i funduszu, albo kliknij ikonę drukowania, aby wydrukować raport. Logo Twojego kościoła (**logo na jasne tło** z [Witryna > Wygląd](../website/appearance.md), jeśli je wgrałeś) oraz nazwa pojawiają się wyśrodkowane u góry wydrukowanego raportu. Wydruk używa ciemnego tekstu i jasnego wykresu, nawet jeśli korzystasz z B1 Admin w trybie ciemnym.

Jeśli darowizny z danego okresu zostały przekazane w więcej niż jednej walucie, sumy KPI są przeliczane na walutę Twojego kościoła, a pod kartami pojawia się notatka **Przeliczono według bieżących kursów wymiany**. Szczegóły znajdziesz w [Obsługa wielu walut](./multi-currency.md#converted-totals).

:::info
Panel pokazuje zbiorcze dane o darowiznach. Nie zawiera nazwisk poszczególnych darczyńców. Aby zobaczyć szczegóły na poziomie darczyńcy, skorzystaj ze strony [Partie](batches.md).
:::

## Darczyńcy, którzy przestali dawać

Wybierz **Darczyńcy, którzy przestali dawać** w przełączniku **Widok**, aby wyświetlić listę osób, które dawały w jednym okresie, ale nie dały od tamtej pory. Domyślnie porównuje ono ubiegły rok kalendarzowy z bieżącym rokiem do dnia dzisiejszego; zmień którykolwiek z zakresów dat, aby rozszerzyć lub zawęzić wyszukiwanie. Każdy wiersz pokazuje osobę, datę jej ostatniej darowizny oraz jej sumę z wcześniejszego okresu, a **Opcje pobierania > Podsumowanie** pobiera listę jako plik CSV do wykorzystania przy mailingu lub liście telefonów do dalszych kontaktów.

## Szczegóły darowizn na poziomie darczyńcy

Aby zobaczyć, kto dał, ile i na jaki fundusz:

1. Przejdź do **Darowizny > Partie**.
2. Kliknij **nazwę partii**, aby ją otworzyć.
3. Strona szczegółów partii wymienia każdą darowiznę wraz ze sposobem płatności (i numerem czeku lub ostatnimi cyframi karty), nazwiskiem darczyńcy, datą, notatkami i kwotą, a na dole znajduje się suma.
4. Kliknij **Edytuj** w wierszu darowizny, aby otworzyć pełne szczegóły tej pojedynczej darowizny, w tym jej fundusz.
5. Kliknij **Eksportuj** nad listą, aby pobrać plik CSV ze wszystkimi danymi darczyńców i darowizn z tej partii.

## Raport podsumowujący darowizny

Raportowanie darowizn jest wbudowane bezpośrednio w sekcję Darowizny -- strona Podsumowanie pełni rolę raportu podsumowującego darowizny:

1. W menu Jump wybierz **Darowizny > Podsumowanie**.
2. W widoku **Pulpit** ustaw **Data początkowa** i **Data końcowa** w panelu **Filtruj raport** i kliknij **Uruchom raport**.
3. Kliknij **Opcje pobierania** i wybierz **Podsumowanie**, aby wyeksportować raport jako plik CSV.

## Eksport danych

Dane o darowiznach możesz eksportować z kilku miejsc:

- **Strona Podsumowanie** -- pobierz plik CSV z sumami darowizn według tygodnia, miesiąca lub kwartału oraz funduszu
- **Strona szczegółów partii** -- pobierz plik CSV z poszczególnymi darowiznami wraz z danymi darczyńców
- **Strona szczegółów funduszu** -- pobierz historię darowizn dla danego funduszu

:::tip
Na potrzeby raportowania rocznego połącz eksport ze strony Podsumowanie z narzędziem [Zaświadczenia o darowiznach](giving-statements.md), aby uzyskać zarówno zbiorcze trendy, jak i zaświadczenia dla poszczególnych darczyńców.
:::

## Następne kroki

- Wygeneruj [Zaświadczenia o darowiznach](giving-statements.md) dla swoich darczyńców na koniec roku
- Przejrzyj poszczególne [partie](batches.md), aby zweryfikować szczegóły darowizn
- Sprawdź strony szczegółów [funduszy](funds.md), aby zobaczyć podział darowizn według kategorii
