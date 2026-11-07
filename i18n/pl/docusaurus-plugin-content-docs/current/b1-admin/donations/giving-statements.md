---
title: "Wyciągi z darowizn"
---

# Wyciągi z darowizn

<div class="article-intro">

Na koniec każdego roku Twoi darczyńcy potrzebują podsumowania swoich darowizn podlegających odliczeniu podatkowemu, do własnej dokumentacji. B1 Admin ułatwia wygenerowanie tych wyciągów dla wszystkich darczyńców naraz, co oszczędza wiele godzin pracy ręcznej.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Upewnij się, że Twoje [fundusze](funds.md) są prawidłowo oznaczone jako **Podlegające odliczeniu podatkowemu** -- na wyciągach pojawiają się wyłącznie darowizny na fundusze podlegające odliczeniu
- Upewnij się, że wszystkie darowizny zostały [zarejestrowane](recording-donations.md), a transakcje online zostały [zaimportowane z Stripe](stripe-import.md)

</div>

## Dostęp do wyciągów z darowizn

1. W **B1 Admin** otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń **Darowizny**.
2. Kliknij **Wyciągi z darowizn**. Otworzy się strona **Zbiorcze wyciągi z darowizn**.

## Generowanie wyciągów

1. W panelu **Wybierz rok** wybierz **Rok** z listy rozwijanej. Możesz wybrać bieżący rok lub dowolny z pięciu poprzednich lat.
2. Strona wczytuje wyłącznie darowizny z wybranego roku (od 1 stycznia do 31 grudnia), dzięki czemu otwiera się szybko, nawet jeśli Twój kościół ma wieloletnią historię darowizn. Po wybraniu innego roku podsumowanie odświeża się i pokazuje darowizny z tego roku. Panel **Podsumowanie** poniżej roku zawiera statystyki dla tego roku, w tym:
   - **Łączna liczba darczyńców** -- liczba osób, które złożyły darowizny
   - **Łączna liczba darowizn** -- liczba pojedynczych rekordów darowizn
   - **Łączna kwota** -- łączna wartość wszystkich darowizn

## Pobieranie wyciągów

Panel **Opcje pobierania** daje dwie możliwości przekazania wyciągów darczyńcom:

### Pobierz jako pliki CSV

W sekcji **Pojedyncze pliki CSV** kliknij **Pobierz ZIP**, aby pobrać plik ZIP zawierający osobny plik CSV dla każdego darczyńcy. Jest to przydatne, jeśli chcesz wysyłać wyciągi pocztą e-mail pojedynczo lub zaimportować je do innego systemu.

### Drukuj wszystkie wyciągi

W sekcji **Wydruki wyciągów** kliknij **Drukuj wszystkie** (przycisk pokazuje liczbę wyciągów), aby otworzyć w przeglądarce widok do druku wyciągów wszystkich darczyńców za wybrany rok. Następnie użyj funkcji drukowania przeglądarki, aby wysłać je na drukarkę. Każdy wyciąg zaczyna się na nowej stronie, dzięki czemu są gotowe do złożenia i wysłania, a wyciągi są uporządkowane według nazwiska, a następnie imienia darczyńcy.

Jeśli przesłałeś **Logo na jasnym tle** w sekcji [Strona internetowa > Wygląd](../website/appearance.md), jest ono drukowane wyśrodkowane u góry każdego wyciągu, nad jego tytułem. Dotyczy to zarówno opcji **Drukuj wszystkie**, jak i wydruku wyciągu pojedynczego darczyńcy z jego rekordu.

:::tip
Generuj wyciągi wcześnie w styczniu, dopóki dane są świeże. Przed wygenerowaniem wyciągów sprawdź dwukrotnie, czy Twoje fundusze są prawidłowo oznaczone jako podlegające odliczeniu podatkowemu -- uwzględniane są wyłącznie darowizny na takie fundusze.
:::

:::info
Wyciągi z darowizn obejmują wyłącznie darowizny przypisane do funduszy, dla których włączono ustawienie **Podlegające odliczeniu podatkowemu**. Jeśli fundusz nie jest oznaczony jako podlegający odliczeniu, jego darowizny nie pojawią się na wyciągu. Tym ustawieniem możesz zarządzać na stronie [Fundusze](funds.md).
:::

## Formaty potwierdzeń dla Kanady, Australii i Nowej Zelandii

Kościoły spoza Stanów Zjednoczonych mogą przełączyć wyciąg na oficjalny układ potwierdzenia obowiązujący w ich kraju. Kliknij **Format wyciągu** u góry strony Wyciągi z darowizn (lub przejdź do **Ustawienia** i otwórz sekcję **Darowizny**), a następnie ustaw **Format wyciągu** na **Kanada**, **Australia** lub **Nowa Zelandia**, i uzupełnij pola, które się pojawią: numer rejestracyjny (numer rejestracyjny CRA, ABN lub numer rejestracyjny organizacji charytatywnej w Nowej Zelandii), adres Twojej organizacji, nazwę osoby upoważnionej do podpisywania potwierdzeń oraz, w przypadku Kanady, miasto, w którym wystawiane są potwierdzenia.

Wyciągi zawierają wtedy sformułowania wymagane przez urząd skarbowy (dla Kanady "Official Receipt for Income Tax Purposes" wraz z numerem referencyjnym CRA), numer potwierdzenia w formacie `YEAR-DONORID`, kwotę kwalifikującą się do odliczenia, uwzględniającą wyłącznie fundusze podlegające odliczeniu, oraz osobny wiersz dla darowizn na fundusze niepodlegające odliczeniu. Darczyńcy widzą ten sam blok potwierdzenia, gdy drukują własny wyciąg z B1.church.

## Co członkowie widzą w B1.church

Ta sama sekcja **Darowizny** w ustawieniach kontroluje to, co członkowie widzą na swojej stronie darowizn w B1.church:

- **Historia darowizn członków** określa, które lata mogą oglądać członkowie. Domyślnie wybrane jest **Wszystkie lata**. Opcja **Do 2025** (lub dowolny inny rok) ogranicza widok do tego roku, dzięki czemu członkowie nie mogą przeglądać ani drukować późniejszych lat, dopóki na to nie pozwolisz. Pozwala to wstrzymać bieżący rok, dopóki kończysz korekty i zwroty. Opcja **Ukryte** całkowicie usuwa historię darowizn, sumy roczne i drukowanie wyciągów. Członkowie nadal mogą składać darowizny.
- **Uwaga o darowiznach** to krótka wiadomość wyświetlana na stronie darowizn członka i w jego historii darowizn oraz drukowana na dole każdego wyciągu z darowizn, w tym wyciągów drukowanych na tej stronie. Używaj jej do informacji takich jak polityka zwrotów.

Te ustawienia zmieniają wyłącznie to, co widzą członkowie. Na tej stronie nadal możesz wydrukować wyciąg z dowolnego roku.

## Następne kroki

Jeśli przed wygenerowaniem wyciągów chcesz sprawdzić szczegóły darowizn, odwiedź stronę [Raporty darowizn](donation-reports.md) lub sprawdź poszczególne [partie](batches.md).
