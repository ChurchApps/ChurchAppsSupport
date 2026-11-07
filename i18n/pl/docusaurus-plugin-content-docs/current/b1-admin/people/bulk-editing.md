---
title: "Zbiorcza edycja osób"
---

# Zbiorcza edycja osób

<div class="article-intro">
Zbiorcza edycja pozwala zaktualizować wiele osób naraz, co oszczędza czas, gdy ta sama zmiana dotyczy wielu osób. Możesz zmienić status członkostwa, stan cywilny, płeć, preferencje rezygnacji z komunikacji oraz przynależność do grup w jednej operacji.
</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnień do zarządzania danymi osób. Szczegóły znajdziesz w artykule [Role i uprawnienia](./roles-permissions.md).
- Osoby, które chcesz edytować, powinny być już dodane lub zaimportowane. W razie potrzeby zobacz [Dodawanie osób](./adding-people.md).
</div>

## Wybieranie osób do zbiorczej edycji

1. Przejdź do sekcji **Osoby** w B1 Admin
2. Użyj wyszukiwarki lub filtrów, aby znaleźć osoby, które chcesz zaktualizować
3. Zaznacz pola wyboru, aby wybrać osoby
   - W widoku **Gospodarstwa domowe** zaznaczenie gospodarstwa wybiera wszystkie osoby, które do niego należą
   - W widoku **Tabela** (przełączanym przyciskiem **Wyświetl jako**) możesz wybierać osoby pojedynczo
   - Możesz też użyć pola wyboru nad listą, aby zaznaczyć wszystkie widoczne osoby
4. Gdy wybierzesz co najmniej jedną osobę, pasek nad listą pokaże liczbę zaznaczonych osób oraz przyciski **Wyczyść zaznaczenie** i **Działania**

:::tip
Jeśli musisz zaktualizować dużą grupę osób na podstawie określonych kryteriów, najpierw zawęź listę za pomocą funkcji [Wyszukiwanie AI](./ai-search.md) lub filtrów, a następnie zaznacz wszystkie pasujące osoby.
:::

## Dostępne działania zbiorcze

Menu **Działania** oferuje kilka opcji:

### Aktualizacja statusu członkostwa

Zmień status członkostwa wszystkich zaznaczonych osób:

1. Kliknij **Działania** → **Ustaw status członkostwa**
2. Wybierz nowy status:
   - **Odwiedzający** -- Osoby odwiedzające zbór po raz pierwszy lub okazjonalnie
   - **Gość** -- Goście, na przykład rodziny zarejestrowane na kiosku zameldowania
   - **Regularny uczestnik** -- Częsti uczestnicy, którzy nie są członkami
   - **Członek** -- Oficjalni członkowie zboru
   - **Pracownik** -- Pracownicy zboru
   - **Nieaktywny** -- Osoby, które nie uczęszczają już do zboru
   - **Zmarły** -- Osoby, które odeszły
3. Wybierz tryb aktualizacji:
   - **Nadpisz wszystkie** -- Zastąp obecny status u wszystkich zaznaczonych osób
   - **Aktualizuj tylko puste** -- Ustaw status tylko u osób, które go nie mają
4. Kliknij **Aktualizuj**

### Aktualizacja stanu cywilnego

Zbiorczo zmień stan cywilny:

1. Kliknij **Działania** → **Ustaw stan cywilny**
2. Wybierz nowy stan:
   - **Nieznany**
   - **Stan wolny**
   - **W związku małżeńskim**
   - **Po rozwodzie**
   - **Po śmierci małżonka**
3. Wybierz, czy nadpisać istniejące wartości, czy aktualizować tylko puste pola
4. Kliknij **Aktualizuj**

### Aktualizacja płci

Zmień informację o płci u wielu osób:

1. Kliknij **Działania** → **Ustaw płeć**
2. Wybierz wartość:
   - **Nieokreślona**
   - **Mężczyzna**
   - **Kobieta**
3. Wybierz tryb aktualizacji (nadpisz wszystkie lub tylko puste)
4. Kliknij **Aktualizuj**

### Aktualizacja statusu rezygnacji z komunikacji

Określ, czy osoby zrezygnowały z komunikacji:

1. Kliknij **Działania** → **Ustaw rezygnację z katalogu**
2. Wybierz:
   - **Nie** -- Zezwól na komunikację (usuń rezygnację)
   - **Tak** -- Zablokuj komunikację (ustaw rezygnację)
3. Wybierz tryb aktualizacji
4. Kliknij **Aktualizuj**

:::warning
Zachowaj ostrożność, zmieniając status rezygnacji. Osoby, które wyraźnie zrezygnowały z komunikacji, nie powinny otrzymywać wiadomości, chyba że ponownie wyraziły zgodę.
:::

### Ustaw pole niestandardowe

Ustaw wartość Tak/Nie w [polu niestandardowym](../settings/custom-fields.md) dla wszystkich zaznaczonych osób naraz:

1. Kliknij **Działania** → **Ustaw pole niestandardowe**.
2. Wybierz pole niestandardowe Tak/Nie, które chcesz ustawić.
3. Wybierz wartość do zastosowania (**Tak** lub **Nie**).
4. Kliknij **Aktualizuj**.

:::info
Dla tego działania zbiorczego dostępne są tylko pola niestandardowe Tak/Nie. Aby ustawić inne typy pól, edytuj każdą osobę osobno.
:::

### Dodaj do grupy

Dodaj wszystkie zaznaczone osoby do jednej lub kilku grup:

1. Kliknij **Działania** → **Dodaj do grupy**
2. Wyszukaj i wybierz grupę (lub grupy), do których chcesz dodać osoby
3. Możesz wybrać kilka grup, aby dodać osoby do wszystkich z nich
4. Kliknij **Dodaj do grup**

Każda osoba zostanie dodana jako zwykły członek wybranej grupy (lub grup). Później, w razie potrzeby, możesz awansować poszczególne osoby na liderów grupy na stronie [Członkowie grupy](../groups/group-members.md).

### Usuń z grupy

Usuń wszystkie zaznaczone osoby z jednej lub kilku grup:

1. Kliknij **Działania** → **Usuń z grupy**
2. Wyszukaj i wybierz grupę (lub grupy), z których chcesz usunąć osoby
3. Możesz wybrać kilka grup
4. Kliknij **Usuń z grup**

:::info
To działanie tylko usuwa osoby z wybranych grup. Nie usuwa rekordów osób.
:::

### Usuń osoby

Trwale usuń zaznaczone osoby z bazy danych zboru:

1. Kliknij **Działania** → **Usuń**
2. Okno **Usuń wybrane osoby** poprosi o potwierdzenie, ile osób zostanie usuniętych
3. Kliknij **Usuń**

:::danger
Usunięcia osób nie można cofnąć. Zostaną usunięte wszystkie ich dane, w tym:
- Dane osobowe
- Przynależność do grup
- Rekordy frekwencji
- Historia darowizn
- Zgłoszenia z formularzy

Używaj tego działania tylko wtedy, gdy na pewno chcesz usunąć te osoby z systemu.
:::

## Wyniki zbiorczej edycji

Po wykonaniu działania zbiorczego zobaczysz podsumowanie zawierające:

- **Łącznie zaznaczonych** -- Liczba osób objętych operacją
- **Pomyślnie zaktualizowane** -- Liczba zmienionych rekordów
- **Niepowodzenia** -- Rekordy, których nie udało się zaktualizować (jeśli dotyczy)
- **Bez zmian** -- Rekordy, które nie wymagały zmian (na przykład w trybie „aktualizuj tylko puste”)

Jeśli jakieś aktualizacje się nie powiodły, zobaczysz szczegóły błędów wyjaśniające przyczynę.

## Dobre praktyki

- **Zacznij od małych kroków** -- Najpierw przetestuj operacje zbiorcze na kilku rekordach, aby upewnić się, że wprowadzasz właściwe zmiany
- **Używaj filtrów** -- Przed zaznaczeniem osób zawęź listę za pomocą filtrów lub wyszukiwania AI, aby aktualizować tylko odpowiednie osoby
- **Sprawdź zaznaczenie dwukrotnie** -- Przejrzyj zaznaczone osoby przed zastosowaniem zmian zbiorczych
- **Używaj trybu „aktualizuj tylko puste”** -- Gdy chcesz uzupełnić brakujące dane bez nadpisywania istniejących informacji
- **Dokumentuj większe zmiany** -- Zapisuj notatki o zbiorczych aktualizacjach, aby móc do nich wrócić w razie potrzeby
- **Informuj zespół** -- Powiadom innych administratorów, gdy wprowadzasz duże zmiany zbiorcze

## Typowe przypadki użycia

### Aktualizacja nowych członków

Po zajęciach dla przyszłych członków zmień status wszystkich uczestników na Członek:

1. Wyszukaj osoby, które uczestniczyły w zajęciach
2. Zaznacz je wszystkie
3. Użyj **Działania** → **Ustaw status członkostwa** → **Członek**

### Organizowanie małych grup

Dodaj kilka osób do nowej grupy domowej:

1. Wyszukaj osoby, które chcesz włączyć do grupy
2. Zaznacz je
3. Użyj **Działania** → **Dodaj do grupy** i wybierz grupę domową

### Porządkowanie danych

Uzupełnij brakujący stan cywilny u małżeństw:

1. Filtruj osoby, które są w związku małżeńskim (korzystając z informacji o gospodarstwie domowym)
2. Zaznacz osoby z pustym stanem cywilnym
3. Użyj **Działania** → **Ustaw stan cywilny** → **W związku małżeńskim** → **Aktualizuj tylko puste**

## Powiązane artykuły

- [Wyszukiwanie osób](./searching-people.md) -- Znajdź osoby do edycji
- [Wyszukiwanie AI](./ai-search.md) -- Używaj języka naturalnego, aby znaleźć określone grupy osób
- [Członkowie grupy](../groups/group-members.md) -- Zarządzaj przynależnością do grup
- [Eksport danych](./exporting-data.md) -- Wyeksportuj dane osób przed zbiorczymi zmianami
