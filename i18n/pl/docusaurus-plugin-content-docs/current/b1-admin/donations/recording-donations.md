---
title: "Rejestrowanie darowizn"
description: "Rejestruj darowizny w B1 Admin: utwórz partię i wpisuj wpłaty pojedynczo, zaimportuj plik CSV lub zapisz jedną darowiznę z profilu darczyńcy."
---

# Rejestrowanie darowizn

<div class="article-intro">

Rejestrowanie darowizn w B1 Admin odbywa się za pomocą systemu partii (Batches). Tworzysz partię, która reprezentuje zbiórkę (np. niedzielną ofiarę), a następnie dodajesz do niej poszczególne darowizny. Dzięki temu zapisy dotyczące datków są uporządkowane i łatwe do uzgodnienia.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj [fundusze](funds.md), aby móc przypisywać darowizny do odpowiednich kategorii
- Utwórz [partię](batches.md), w której umieścisz darowizny, które zamierzasz wprowadzić
- Upewnij się, że darczyńcy znajdują się w [katalogu osób](../people/adding-people.md), abyś mógł ich wyszukać podczas wprowadzania darowizn
- Aby wprowadzać darowizny do partii, potrzebujesz uprawnienia **Edit Donations** lub **Enter Donations** razem z **View Donations** (zob. [Kto może zmieniać partię](batches.md#who-can-change-a-batch))

</div>

## Tworzenie partii i dodawanie darowizn

1. W **B1 Admin** otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Donations** i kliknij **Batches**.
2. Kliknij **Add Batch** na górze strony.
3. Wpisz nazwę partii (np. „Niedzielna ofiara – 5 stycznia”) i wybierz datę. Kliknij **Save**.
4. Nowa partia pojawi się na liście z informacją o zerowej liczbie darowizn i kwocie $0.00.
5. Kliknij **nazwę partii**, aby ją otworzyć.

## Wprowadzanie pojedynczych darowizn

1. Na stronie szczegółów partii obok listy darowizn pojawia się panel wprowadzania. W sekcji **Select Person or Anonymous** wpisz imię i nazwisko darczyńcy w polu wyszukiwania, aby go znaleźć, lub kliknij **Anonymous**. (Kliknięcie **Add Donation** na górze strony przenosi do tego panelu.)
2. Po wybraniu osoby formularz wyświetli pola: **Date**, **Method** (Check, Cash, Card lub In-Kind), **Fund**, **Notes**, **Amount** oraz **Check #** (lub **Last 4 digits** w przypadku darowizn kartą albo **Item**, aby opisać dar rzeczowy). Kliknij **Change** obok nazwiska darczyńcy, aby wybrać inną osobę.
3. Uzupełnij dane i kliknij **Add Donation** (lub naciśnij Enter).
4. Darowizna zostanie dodana do listy, a formularz wyczyści się, abyś mógł wprowadzić kolejną.

:::info
Jeśli partia została [zamknięta](batches.md#closing-and-reopening-a-batch), panel wprowadzania oraz linki **Edit** są ukryte dla osób bez uprawnienia **Edit Donations**, a na górze partii pojawia się informacja, że jest zamknięta. Poproś osobę z uprawnieniem **Edit Donations** o ponowne otwarcie partii.
:::

:::tip
Możesz szybko wprowadzić kilka darowizn z rzędu, nie opuszczając strony partii. Formularz czyści się po każdym wpisie, dzięki czemu możesz sprawnie przechodzić przez stos czeków lub kopert.
:::

## Import darowizn z pliku CSV {#importing-donations-from-a-csv-file}

Jeśli Twoje darowizny są już w arkuszu kalkulacyjnym – na przykład jako eksport z innego systemu zbiórek lub zestawienie zespołu liczącego – możesz zaimportować je do partii zamiast wpisywać każdą z osobna.

1. Otwórz partię i kliknij **Import CSV** na górze strony. (Przycisk pojawia się, gdy możesz zmieniać partię i Twój kościół ma co najmniej jeden [fundusz](funds.md).)
2. Kliknij **Choose CSV File** i wybierz plik. Plik musi zawierać wiersz nagłówkowy, a kolumny mogą występować w dowolnej kolejności:
   - **Amount** (wymagane; działa także `Total`) – symbole walut i przecinki są ignorowane, więc `$1,250.00` jest w porządku. Kwota musi być większa od zera.
   - **Date** – użyj formatu takiego jak `2026-10-25` lub `10/25/2026`. Jeśli pole jest puste, zostanie użyta data partii.
   - **Fund** – nazwa funduszu, dopasowywana bez uwzględniania wielkości liter. Jeśli pole jest puste, zostanie użyty Twój pierwszy fundusz.
   - **Method** – **Check**, **Cash**, **Card** lub **In-Kind**. Jeśli pole jest puste, zostanie użyta wartość **Check**.
   - **Check Number** – numer czeku (lub inny szczegół płatności).
   - **Notes**
   - **Email**, **Name** lub **First Name** i **Last Name** – służą do dopasowania darczyńcy do osoby w bazie danych. Zapis „Smith, John” jest odczytywany jako „John Smith”.
3. Sprawdź podgląd. Każdy wiersz pokazuje numer linii, darczyńcę z pliku, **Match**, fundusz i kwotę:
   - Imię i nazwisko osoby oznacza, że darczyńca został dopasowany. B1 najpierw dopasowuje według adresu e-mail, potem według dokładnego imienia i nazwiska, i tylko wtedy, gdy pasuje dokładnie jedna osoba.
   - **Not found — anonymous** oznacza, że nie znaleziono jednoznacznego dopasowania. Darowizna zostanie zaimportowana jako anonimowa, a do jej notatek zostanie dodane pole „Imported as:” z nazwiskiem darczyńcy, abyś mógł przypisać ją później.
   - Czerwony komunikat, np. **Invalid amount**, **Unknown fund**, **Unknown method** lub **Invalid date**, oznacza, że dany wiersz zostanie pominięty. Popraw plik i wybierz go ponownie, aby uwzględnić ten wiersz.
4. Kliknij **Import** (przycisk pokazuje, ile wierszy zostanie zaimportowanych). Darowizny zostaną dodane do partii.

:::tip
Po imporcie użyj **Edit** przy dowolnej anonimowej darowiźnie, aby wybrać właściwą osobę. Notatka „Imported as:” informuje, od kogo według pliku pochodzi darowizna.
:::

## Zapisywanie darowizny z karty osoby

Aby zarejestrować pojedynczą darowiznę bez otwierania partii, otwórz kartę darczyńcy w sekcji **People** i kliknij **Log a gift** (w podsumowaniu darowizn lub w widoku darowizn danej osoby).

1. Ustaw **Date** i **Amount**.
2. Wybierz **Fund** i **Method** (Check, Cash, Card lub In-Kind), a w razie potrzeby wpisz **Check #**, **Last 4 digits** lub **Item** (dla darów rzeczowych).
3. Opcjonalnie dodaj **Notes**, a następnie kliknij **Save**.

Darowizna zostanie zapisana w partii z tą datą. Jeśli dla danej daty nie ma jeszcze partii, zostanie ona utworzona automatycznie i nazwana datą.

## Podział darowizny między wiele funduszy

Czasami jeden darczyńca w jednej transakcji przekazuje środki na kilka funduszy. Aby to obsłużyć:

1. Poniżej panelu wprowadzania kliknij link **full donation editor** (lub kliknij **Edit** w wierszu istniejącej darowizny).
2. W pełnym edytorze dodaj kwoty do różnych funduszy. Suma zostanie obliczona automatycznie na podstawie kwot poszczególnych funduszy.
3. Kliknij **Save**, aby zaktualizować darowiznę.

:::info
Podział darowizn między fundusze jest częsty, gdy darczyńca wystawia jeden czek przeznaczony na kilka celów, np. Fundusz Ogólny i Misje.
:::

## Edycja i usuwanie darowizn

Aby edytować darowiznę, kliknij przycisk **Edit** w jej wierszu w partii. Możesz zmienić datę, kwotę, fundusz, sposób płatności (Check, Cash, Card lub In-Kind) lub inny szczegół. Dla daru rzeczowego edytor nadaje polu szczegółu etykietę **Item**, abyś mógł opisać, co zostało przekazane. Gdy skończysz, kliknij **Save**.

:::tip
Wiersz pod nazwą partii na górze strony jest automatycznie aktualizowany i pokazuje datę partii, liczbę darowizn oraz łączną kwotę w miarę dodawania lub edycji wpisów. Skorzystaj z tego, aby uzgodnić dane z potwierdzeniem wpłaty.
:::

## Zwrot darowizny

Jeśli darczyńca został obciążony omyłkowo lub prosi o zwrot pieniędzy, możesz zwrócić zakończoną darowiznę bezpośrednio z jej ekranu edycji – nie musisz wchodzić do panelu bramki płatniczej.

1. Otwórz darowiznę i kliknij **Edit**.
2. Kliknij przycisk **Refund** obok przycisku Delete na dole formularza.
3. Potwierdź okno dialogowe: „Refund this donation in full through the payment gateway? This cannot be undone.”

Darowizna zostanie w całości zwrócona przez pierwotną bramkę płatniczą i oznaczona jako **Refunded** na listach darowizn.

:::warning
Zwroty są możliwe wyłącznie w całości – z poziomu B1 Admin nie ma możliwości zwrotu części kwoty. Po potwierdzeniu zwrotu nie można go cofnąć.
:::

:::info
Przycisk **Refund** pojawia się tylko przy darowiznach opłaconych online (mają transakcję w bramce płatniczej) i nadal mających status **Complete**. Darowizny wprowadzone ręcznie (gotówka, czek) nie mają transakcji w bramce, którą można zwrócić – zamiast tego edytuj je lub usuń.
:::

## Drukowanie potwierdzenia dla jednej darowizny

Gdy ktoś przekazuje czek, płaci za wydarzenie lub koszulkę albo gdy odwiedzająca organizacja przynosi darowiznę, możesz wydrukować potwierdzenie dotyczące wyłącznie tej wpłaty, zamiast całej partii lub zbiorczego zestawienia rocznego.

1. Otwórz partię zawierającą darowiznę.
2. Kliknij **Receipt** obok przycisku **Edit** w wierszu darowizny. Możesz też kliknąć **Receipt** na dole formularza Edit Donation.
3. Kliknij **Print** lub **Close**, aby wrócić.

Potwierdzenie ma ten sam układ co zestawienie darowizn: nazwę kościoła i darczyńcę (lub „Anonymous”), datę i sposób wpłaty, każdy fundusz wraz z kwotą, notatkę, Twoją notatkę o darowiznach (Giving Note) oraz oficjalny blok potwierdzenia, jeśli ustawiłeś **Statement format** (zob. [Zestawienia darowizn](giving-statements.md)). Numer potwierdzenia w tym bloku to ID darowizny.

:::info
Sformułowanie „no goods or services” jest drukowane tylko wtedy, gdy każdy fundusz przypisany do darowizny jest oznaczony jako odliczalny od podatku. Jeśli jakakolwiek część darowizny trafiła do funduszu nieodliczalnego, np. opłaty za wydarzenie lub zakupu, potwierdzenie pomija to sformułowanie, aby wyglądało jak płatność, a nie dar charytatywny.
:::

:::tip
Darowizny online otrzymują już automatyczny e-mail z podziękowaniem, więc potwierdzenie jest przydatne głównie dla darowizn wprowadzanych ręcznie.
:::

## Następne kroki

- Sprawdź wpisy za pomocą [Raportów darowizn](donation-reports.md), aby zweryfikować ich poprawność
- Na koniec roku wygeneruj [Zestawienia darowizn](giving-statements.md) dla swoich darczyńców
