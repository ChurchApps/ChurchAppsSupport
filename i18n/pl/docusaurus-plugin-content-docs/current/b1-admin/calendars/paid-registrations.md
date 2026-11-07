---
title: "Płatne rejestracje"
description: "Skonfiguruj płatne zapisy na wydarzenia w B1 Admin: typy uczestników z cenami, dodatki, kody rabatowe, listy rezerwowe i płatności przez dostawcę."
---

# Płatne rejestracje

<div class="article-intro">

Rejestracja na wydarzenie może być czymś więcej niż prostym policzeniem uczestników. Możesz określić typy uczestników z cenami (np. dorosły i dziecko), zaoferować opcjonalne dodatki z własnymi cenami i ilościami, tworzyć kody rabatowe oraz pobierać płatności przy rejestracji za pośrednictwem istniejącego u Ciebie dostawcy datków w kościele. Gdy wydarzenie się zapełni, opcjonalna lista oczekujących utrzymuje zainteresowanych członków w kolejce i automatycznie awansuje ich, gdy zwolni się miejsce.

</div>

## Film szkoleniowy

<YouTube id="eGSZv24Dlzk" title="Rejestracja na wydarzenia i płatne wydarzenia w B1" next="Uruchamianie strony kościoła w B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Najpierw włącz rejestrację na wydarzeniu — zobacz [Tworzenie kalendarzy](./creating-calendars.md#enabling-event-registration)
- Aby zbierać płatności online, Twój kościół musi mieć [skonfigurowane online datki](../donations/online-giving-setup.md) (Stripe, PayPal lub Kingdom Funding). Bezpłatne wydarzenia nie wymagają konfiguracji datków. Bez datków online płatne rejestracje nadal działają, ale osoby płacą bezpośrednio kościołowi — zobacz [Kościoły bez datków online](#churches-without-online-giving).

</div>

## Otwieranie ustawień rejestracji

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), wybierz **Kalendarze > Rejestracje** i otwórz swoje wydarzenie (lub otwórz wydarzenie z jego kalendarza).
2. Karta **Ustawienia rejestracji** pokazuje podstawy — **Włącz rejestrację**, **Pojemność**, **Rejestracja otwiera się/zamyka się**, **Tagi** i **Pytania rejestracyjne**.
3. Poniżej podstaw znajdują się trzy akordeony: **Typy uczestników**, **Wybory** i **Kody rabatowe**.

## Typy uczestników

Typy uczestników pozwalają pobierać różne ceny od różnych kategorii uczestników i ograniczać liczbę miejsc dla każdego typu osobno.

1. Rozwiń akordeon **Typy uczestników** i kliknij **Dodaj typ**.
2. Wpisz **Nazwę** (np. „Dorosły”, „Dziecko”, „Student”).
3. Ustaw **Cenę**. Wpisz 0 dla typu bezpłatnego.
4. Opcjonalnie ustaw **Pojemność** tylko dla tego typu (np. tylko 20 miejsc dla dzieci). Pozostaw puste, jeśli nie chcesz limitu dla typu.
5. Kliknij **Zapisz**.

Podczas rejestracji każdy uczestnik wybiera typ; typy wyprzedane są oznaczone jako **Wyprzedane** i nie można ich wybrać. Lista uczestników pokazuje typ każdego uczestnika oraz bieżące liczniki dla poszczególnych typów.

## Wybory

Wybory to opcjonalne płatne dodatki — koszulki, plany posiłków, dopłaty za zajęcia.

1. Rozwiń akordeon **Wybory** i kliknij **Dodaj wybór**.
2. Wpisz **Nazwę**, opcjonalny **Opis** oraz **Cenę** (0 wyświetla się jako „Bezpłatne”).
3. Opcjonalnie ustaw **Pojemność** (łączna liczba dostępnych sztuk we wszystkich rejestracjach) oraz **Maks. ilość** (największa liczba sztuk, jaką może zamówić jedna rejestracja).
4. Kliknij **Zapisz**.

Osoby rejestrujące się wybierają ilości podczas zapisu, a sumy są odejmowane od pojemności, dzięki czemu nigdy nie sprzedasz więcej, niż masz.

## Kody rabatowe

1. Rozwiń akordeon **Kody rabatowe** i kliknij **Dodaj kod rabatowy**.
2. Wpisz **Kod**, który będą wpisywać osoby rejestrujące się.
3. Wybierz **Typ** — **Procent** lub **Kwota** — i podaj jego **Wartość**.
4. Opcjonalnie ogranicz kod datą **Początku** / **Końca**, **Min. liczbą członków** (minimalna liczba uczestników w rejestracji) oraz **Maks. liczbą użyć**.
5. Kliknij **Zapisz**.

Każdy kod pokazuje licznik **Użycia**, dzięki czemu widzisz, jak często został wykorzystany. Osoby rejestrujące się natychmiast otrzymują informację zwrotną po zastosowaniu kodu — w tym jasne komunikaty, gdy kod wygasł, jeszcze się nie rozpoczął lub wymaga większej liczby uczestników.

## Lista oczekujących

Włącz opcję **Włącz listę oczekujących** w karcie Ustawienia rejestracji. Gdy wydarzenie osiągnie pojemność:

- Nowe osoby rejestrujące się otrzymują miejsce na liście oczekujących zamiast odmowy. Wypełniają ten sam formularz (płatność jest pomijana, dopóki są na liście oczekujących).
- Gdy ktoś zrezygnuje, najstarsza rejestracja z listy oczekujących jest **automatycznie awansowana** i otrzymuje e-mail informujący, że zwolniło się miejsce. Jeśli ma do zapłaty saldo, e-mail zawiera link do [Moich rejestracji](../../b1-church/events/my-registrations.md) na stronie B1 Twojego kościoła, gdzie może dokonać płatności.
- Możesz ręcznie awansować osobę w dowolnym momencie, używając działania **Awansuj** w wierszu z listy oczekujących — przydatne po zwiększeniu pojemności wydarzenia.

:::info
Awansowane rejestracje pozostają *oczekujące*, dopóki saldo nie zostanie opłacone; opłacenie (lub brak kwoty do zapłaty) je potwierdza.
:::

## Lista uczestników rejestracji

Otwórz wydarzenie ze strony Rejestracje, aby zobaczyć wszystkie rejestracje. Tytuł karty pokazuje, ile rejestracji zajmuje miejsca w ramach pojemności (np. *Rejestracje (18 / 20)*). Liczą się tylko rejestracje oczekujące i potwierdzone; gdy są osoby na liście oczekujących, tytuł zawiera ich liczbę (np. *· 3 na liście oczekujących*), a ta sama liczba pojawia się pod paskiem pojemności. Tabela pokazuje **Nazwę**, **Członków**, **Typ** (typ każdego uczestnika), **Opłacono / Razem** (z ostrzeżeniem o saldzie, gdy nadal są należności), **Status** i **Datę**, a nad tabelą — liczniki dla poszczególnych typów.

- Kliknij ikonę szczegółów w wierszu, aby otworzyć okno **Szczegóły rejestracji** — członkowie, wybory, opłacono/saldo oraz tabela **Płatności** z każdą wpłatą (kwota, metoda, data).
- **Eksportuj CSV** pobiera pełną listę z kolumnami: członkowie, typy uczestników, wybory, opłacono/razem/saldo, status oraz jedna kolumna na każde pytanie rejestracyjne.
- **Dodaj uczestnika** rejestruje zapis offline lub telefoniczny dla dowolnej osoby z Twojego kościoła. Wybierz osobę i, w przypadku płatnego wydarzenia, jej typ uczestnika. Jej karta nie zostaje obciążona: płatna rejestracja zapisuje się jako **oczekująca** z pełną kwotą jako saldem do zapłaty. Jeśli Twój kościół ma datki online, osoba może zapłacić z poziomu [Moich rejestracji](../../b1-church/events/my-registrations.md); w przeciwnym razie pobierz płatność osobiście. Aby dodawać uczestników, potrzebujesz uprawnienia Edycja rejestracji.

:::info
Zwroty nie są realizowane w B1. Jeśli musisz zwrócić pieniądze za anulowaną płatną rejestrację, wykonaj zwrot w panelu swojego dostawcy datków (np. Stripe).
:::

## Jak działają płatności

Płatności przechodzą przez tę samą bramkę datków, której Twój kościół już używa do datków — dane karty trafiają bezpośrednio do dostawcy i nigdy nie przechodzą przez serwery B1. Ceny są zawsze obliczane na serwerze na podstawie skonfigurowanych typów, wyborów i kodów rabatowych, więc osoba rejestrująca się nie może zmienić sumy. Zalogowani członkowie mogą płacić zapisaną kartą. Goście wpisują dane karty podczas płatności i muszą zaznaczyć pole **Nie jestem robotem** przed opłaceniem.

### Kościoły bez datków online

Jeśli Twój kościół nie ma skonfigurowanego dostawcy datków, płatne wydarzenia nadal mogą przyjmować rejestracje. Krok płatności informuje osoby rejestrujące się, że płatność online nie jest dostępna i że mogą zapłacić bezpośrednio kościołowi, a przycisk **Zarejestruj i zapłać później** zapisuje rejestrację. Rejestracja zapisuje się jako **oczekująca** z pełną kwotą jako saldem do zapłaty i pojawia się na liście uczestników z ostrzeżeniem o saldzie. Pobierz pieniądze w taki sposób, w jaki Twój kościół zwykle to robi.

:::info
B1 nie ma sposobu, by oznaczyć płatność offline jako otrzymaną. Saldo do zapłaty pozostaje na liście uczestników i na karcie [Moich rejestracji](../../b1-church/events/my-registrations.md) osoby rejestrującej się także po pobraniu pieniędzy, dlatego prowadź własną ewidencję, kto zapłacił.
:::

## Powiązane artykuły

- [Tworzenie kalendarzy](./creating-calendars.md#enabling-event-registration) — włączanie rejestracji i podstawowych ustawień
- [Konfiguracja datków online](../donations/online-giving-setup.md) — konfiguracja bramki płatniczej używanej przy płatnościach
- [Rejestracja na wydarzenia](../../b1-church/events/registering.md) — co widzą członkowie podczas zapisu
- [Moje rejestracje](../../b1-church/events/my-registrations.md) — jak członkowie płacą saldo i edytują rejestracje
