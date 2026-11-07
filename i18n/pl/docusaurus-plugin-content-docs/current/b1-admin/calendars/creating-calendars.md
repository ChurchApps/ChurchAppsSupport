---
title: "Tworzenie kalendarzy"
description: "Utwórz kalendarz w B1 Admin, połącz grupy lub zaimportuj pliki .ics i zarządzaj wydarzeniami, zapisami i notatkami w jednym miejscu."
---

# Tworzenie kalendarzy

<div class="article-intro">

Tworzenie kalendarza w B1 Admin pozwala zbudować wybrany widok wydarzeń, łącząc jedną lub więcej grup. Wydarzeniami zarządzają liderzy grup w swoich grupach, a kalendarz wyświetla te wydarzenia w jednym miejscu. Administratorzy z uprawnieniami do edycji mogą dodawać lub edytować wydarzenia dla dowolnej grupy. Liderzy grup bez uprawnień administratora mogą zarządzać wyłącznie wydarzeniami grup, którymi kierują.

</div>

## Film szkoleniowy

<YouTube id="Ko3kgsCSLFs" title="Tworzenie kalendarzy, wydarzeń i rezerwacji sal w B1" next="Rejestracja na wydarzenia i płatne wydarzenia w B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Utwórz [grupy](../groups/creating-groups.md), których wydarzenia chcesz uwzględnić w kalendarzu
- Potrzebujesz dostępu administracyjnego do sekcji Kalendarze w B1 Admin

</div>

## Tworzenie nowego kalendarza

1. W B1 Admin otwórz [menu szybkiego przejścia](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń pozycję **Kalendarze** i kliknij **Kalendarze**.
2. Kliknij **Dodaj kalendarz** u góry strony. Formularz nowego kalendarza otworzy się poniżej listy kalendarzy.
3. Wpisz **nazwę** kalendarza (na przykład „Wydarzenia dla młodzieży” lub „Główny kalendarz kościoła”).
4. Opcjonalnie dodaj **opis**, aby Twój zespół wiedział, do czego służy ten kalendarz.
5. Kliknij **Utwórz**, aby zapisać nowy kalendarz.

## Strona szczegółów kalendarza

Po utworzeniu kalendarza kliknij **Zarządzaj wydarzeniami** w jego wierszu, aby otworzyć stronę szczegółów. Strona ma dwa główne obszary:

- **Lewa kolumna** -- Nazwa kalendarza wraz z działaniami (**Nowe wydarzenie**, **Edytuj**, **Importuj .ics** i **Drukuj**), a poniżej lista **Grupy w kalendarzu** pokazująca, które grupy są uwzględnione w tym kalendarzu. Kliknij **Usuń** obok grupy, aby usunąć ją z kalendarza.
- **Główny obszar** -- Widok **Wydarzenia w kalendarzu** z wydarzeniami pobranymi z połączonych grup, a nad nim przyciski **Subskrybuj** i **Dodaj grupę**.

## Łączenie grup

Grupy, które mają wydarzenia w kalendarzu, automatycznie pojawiają się na liście **Grupy w kalendarzu** po lewej stronie strony szczegółów.

1. Kliknij **Dodaj grupę** nad kalendarzem, aby powiązać grupę z kalendarzem.
2. Wybierz grupę z listy rozwijanej. Lista zawiera wszystkie grupy w Twoim kościele, a nie tylko te, do których należysz.
3. Wybierz, czy uwzględnić **wszystkie wydarzenia** z tej grupy, czy tylko **wybrane wydarzenia**.
4. Kliknij **Zapisz**.

Każde wydarzenie pojawia się w kalendarzu tylko raz. Jeśli dodasz całą grupę, wszystkie jej wydarzenia, które wcześniej dodano pojedynczo, zostaną włączone do wpisu grupy, a wybieranie konkretnych wydarzeń z grupy już obecnej w kalendarzu nie doda niczego nowego. Pod **Grupy w kalendarzu** wyświetlane są wyłącznie grupy dodane w całości.

### Importowanie pliku .ics

Kliknij **Importuj .ics**, aby zaimportować wydarzenia z innego kalendarza. Wybierz **Grupę**, do której mają należeć wydarzenia, następnie kliknij **Wybierz plik .ics** lub wklej zawartość pliku, i kliknij **Importuj**. Wydarzenia zostaną utworzone w tej grupie, a grupa zostanie dodana do kalendarza, z którego importowano, dzięki czemu wydarzenia od razu się tam pojawią.

### Usuwanie wydarzenia z kalendarza

Kliknij wydarzenie w kalendarzu, a następnie kliknij **Usuń z kalendarza**. Spowoduje to jedynie usunięcie wydarzenia z tego kalendarza -- samo wydarzenie pozostaje w swojej grupie. Jeśli wydarzenie znajduje się w kalendarzu, ponieważ dodano całą grupę, usunięcie go spowoduje usunięcie wszystkich wydarzeń tej grupy z kalendarza (wydarzenia nadal pozostaną w grupie). Aby trwale usunąć wydarzenie, skasuj je z [kalendarza grupy](../groups/group-calendar.md).

:::tip
Łączenie grup z kalendarzem to wygodny sposób na automatyczne zbieranie wydarzeń. Gdy lider grupy doda wydarzenie do swojej [grupy](../groups/creating-groups.md), może ono trafić do kalendarza całego kościoła bez dodatkowej pracy z Twojej strony.
:::

:::info
Jeśli chcesz utworzyć jeden kalendarz, który pobiera wydarzenia z wielu grup w całym kościele, zobacz [Kalendarz wyselekcjonowany](./curated-calendar.md), aby poznać szybsze rozwiązanie.
:::

## Dodawanie i edycja wydarzeń {#adding-and-editing-events}

Kliknij **Nowe wydarzenie** na stronie szczegółów kalendarza, aby dodać wydarzenie, lub kliknij wydarzenie w kalendarzu, a następnie **Edytuj**, aby je zmienić. Formularz **Nowe wydarzenie** / **Edycja wydarzenia** zawiera następujące pola:

- **Grupa** -- Grupa, do której należy wydarzenie. Jeśli Twój kościół ma szablony wydarzeń, możesz także wybrać **Szablon**, aby wypełnić formularz.
- **Tytuł**
- **Zdjęcie wydarzenia** -- Kliknij **Dodaj zdjęcie** (lub puste pole zdjęcia), aby wybrać lub przesłać obraz, przycięty do szerokiego kształtu 16:9. Kliknij **Zmień zdjęcie**, aby je zastąpić. Zdjęcie wyświetla się na górze strony wydarzenia w Twojej witrynie oraz jako jego kafelek, gdy element Kalendarz pokazuje **Nadchodzące wydarzenia** (zobacz [Wyświetlanie wydarzeń na Twojej stronie](#showing-events-on-your-website)).
- **Opis** -- Wyświetlany na stronie wydarzenia w Twojej witrynie. Obsługiwany jest pogrubiony tekst, listy i łącza.
- **Rozpoczęcie** i **Zakończenie**, **Powtarzanie** oraz **Widoczność** (**Publiczne** lub **Prywatne**).
- **Tagi** -- Etykiety oddzielone przecinkami, na przykład `młodzież, uczniowie`. Element Kalendarz na Twojej stronie może być ustawiony tak, aby pokazywał tylko wydarzenia z określonym tagiem. To to samo pole **Tagi**, które widoczne jest w ustawieniach rejestracji wydarzenia.
- **Kto może zobaczyć notatki** oraz **Kto może dodawać notatki** -- Kto może czytać i dodawać notatki do wydarzenia (zobacz [Notatki do wydarzeń](#event-notes)). Wybierz **Tylko personel** (domyślnie), **Liderzy grupy** (liderzy grupy wydarzenia) lub **Członkowie grupy** (wszyscy w grupie wydarzenia, łącznie z jej liderami).
- **Sale** i **Zasoby** -- Rezerwuj przestrzeń i sprzęt na wydarzenie. Zobacz [Sale, zasoby i planowanie](./rooms-resources.md).

Kliknij **Zapisz**. Jeśli wydarzenie się powtarza, B1 poprosi o potwierdzenie, ponieważ zapisanie zaktualizuje każde wystąpienie w serii.

### Notatki do wydarzeń {#event-notes}

Każde wydarzenie ma własny wątek notatek do planowania i kontynuacji. Kliknij wydarzenie na stronie szczegółów kalendarza; okno dialogowe pokazuje szczegóły wydarzenia, jego przypomnienia oraz **Notatki** poniżej. Wpisz notatkę i opublikuj ją, aby dodać ją do wątku.

Personel z uprawnieniami do edycji treści lub zarządzania kalendarzami może zawsze czytać i dodawać notatki do wydarzeń. Ustawienia **Kto może zobaczyć notatki** oraz **Kto może dodawać notatki** w wydarzeniu decydują, czy liderzy lub członkowie grupy wydarzenia również mogą to robić.

### Wyświetlanie wydarzeń na Twojej stronie {#showing-events-on-your-website}

Aby umieścić kalendarz na swojej stronie internetowej, dodaj element **Kalendarz** do strony i wybierz ten kalendarz. Element może pokazywać kalendarz miesięczny lub siatkę kafelków nadchodzących wydarzeń i może być ograniczony do wydarzeń z jednym tagiem. Odwiedzający, którzy kliknął wydarzenie, otwierają jego własną stronę wydarzenia. Zobacz [Korzystanie z elementu Kalendarz](../website/page-editor.md#using-the-calendar-element).

## Włączanie rejestracji na wydarzenia {#enabling-event-registration}

Możesz włączyć rejestrację na dowolne wydarzenie w kalendarzu, aby członkowie mogli się zapisać przez witrynę B1 lub aplikację mobilną.

1. Kliknij istniejące wydarzenie lub utwórz nowe.
2. W edytorze wydarzenia przełącz opcję **Rejestracja**, aby ją włączyć.
3. Skonfiguruj ustawienia rejestracji:
   - **Pojemność** (opcjonalnie) -- Ustaw maksymalną liczbę zgłoszeń. Pozostaw puste, aby nie ograniczać liczby.
   - **Otwarcie rejestracji** -- Data i godzina, od których rejestracja jest dostępna.
   - **Zamknięcie rejestracji** -- Data i godzina, o których rejestracja się kończy.
   - **Tagi** -- Etykiety oddzielone przecinkami (np. „młodzież, rekolekcje, VBS”), które pomagają kategoryzować wydarzenia z możliwością rejestracji.
   - **Pytania rejestracyjne** -- Opcjonalnie dołącz [formularz](../forms/creating-forms.md), aby osoby zapisujące się odpowiadały na dodatkowe pytania (ograniczenia dietetyczne, rozmiar koszulki, kontakt awaryjny itp.) w ramach zapisu. Wybierz **Brak**, aby pominąć pytania.
   - **Włącz listę oczekujących** -- Gdy wydarzenie się zapełni, pozwól dodatkowym osobom dołączyć do listy oczekujących zamiast odmawiać. Zobacz [Płatne rejestracje](./paid-registrations.md#waitlist).
4. Zapisz wydarzenie.

W przypadku płatnych wydarzeń ta sama strona ustawień pozwala zdefiniować płatne **Typy uczestników**, opcjonalne **Wybory** (dodatki) oraz **Kody rabatowe**, a płatności są realizowane przez dostawcę płatności darowizn Twojego kościoła. Pełny opis znajdziesz w [Płatnych rejestracjach](./paid-registrations.md).

Gdy rejestracja jest włączona, członkowie zobaczą przycisk **Zarejestruj się na to wydarzenie**, kiedy wyświetlą wydarzenie na [witrynie B1](../../b1-church/events/registering.md) lub w [aplikacji mobilnej B1](../../b1-mobile/events/registering.md). Jeśli dołączysz formularz, osoby zapisujące się zobaczą krok **Pytania** podczas rejestracji, a ich odpowiedzi zostaną zapisane wraz ze zgłoszeniem.

:::info
Pytania rejestracyjne działają tylko z formularzami, które **nie** są oznaczone jako Ograniczone. Formularz ograniczony jest automatycznie pomijany podczas rejestracji, zamiast być wyświetlany, dlatego przy dołączaniu pytań do wydarzenia używaj formularza nieograniczonego.
:::

### Zarządzanie rejestracjami

Aby wyświetlać i zarządzać rejestracjami na swoje wydarzenia:

1. W menu szybkiego przejścia wybierz **Kalendarze > Rejestracje**.
2. Zobaczysz tabelę wszystkich wydarzeń z włączoną rejestracją, zawierającą tytuł wydarzenia, datę, bieżącą liczbę rejestracji w porównaniu z pojemnością oraz tagi.
3. Kliknij wydarzenie, aby zobaczyć pełną listę rejestracji, w tym nazwiska, liczbę osób, typy uczestników, status płatności i datę rejestracji.
4. Ze strony szczegółów możesz:
   - **Dodaj uczestnika** -- Ręcznie zarejestruj osobę, która zapisała się offline lub przez telefon.
   - **Anuluj** pojedyncze rejestracje
   - **Usuń** rejestracje na stałe
   - **Przenieś z listy oczekujących** rejestrację, gdy zwolni się miejsce
   - **Eksportuj CSV** -- Pobierz wszystkie rejestracje, w tym typy uczestników, wybory, kwoty płatności i odpowiedzi na pytania

Jeśli do wydarzenia dołączono pytania rejestracyjne, strona szczegółów pokazuje także filtr **Tylko pytania bez odpowiedzi**, który szybko wyszukuje osoby, które jeszcze nie przesłały odpowiedzi, oraz przycisk **Wyświetl odpowiedzi** przy każdej rejestracji z odpowiedziami. Płatne wydarzenia dodają kolumnę **Typ**, kolumnę **Opłacone / Razem**, liczniki dla poszczególnych typów oraz okno szczegółów płatności -- zobacz [Płatne rejestracje](./paid-registrations.md#the-registration-roster).

:::tip
Używaj paska postępu pojemności, aby śledzić, jak szybko wydarzenia się zapełniają. Pasek zmienia kolor na czerwony, gdy wydarzenie osiągnie lub przekroczy pojemność.
:::

## Następne kroki

- [Kalendarz wyselekcjonowany](./curated-calendar.md) -- Utwórz kalendarz, który pobiera wydarzenia z wielu grup
- [Płatne rejestracje](./paid-registrations.md) -- Typy uczestników, dodatki, kody rabatowe, płatności i listy oczekujących
- [Przewodnik rejestracji na wydarzenia](../guides/event-registration.md) -- Przewodnik krok po kroku dotyczący konfiguracji rejestracji na wydarzenia
- [Przegląd kalendarzy](./index.md) -- Powrót do przeglądu kalendarzy
