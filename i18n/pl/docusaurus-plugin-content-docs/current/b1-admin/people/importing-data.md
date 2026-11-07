---
title: "Importowanie danych"
---

# Importowanie danych

<div class="article-intro">

Narzędzie B1 Transfer ułatwia przeniesienie istniejących danych do B1, niezależnie od tego, czy zaczynasz od zera z arkusza kalkulacyjnego, migrujesz z innej platformy do zarządzania kościołem, czy importujesz rekordy darowizn. Można go też użyć do wyeksportowania lub wykonania kopii zapasowej danych w dowolnym momencie.

</div>

## Film szkoleniowy

<YouTube id="G-VnhzACYIU" title="Importowanie bazy danych osób w B1" next="Wyszukiwanie osób i tworzenie list w B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz aktywnego konta B1 Admin z dostępem do **Ustawień**.
- Przed rozpoczęciem przygotuj dane wyeksportowane z poprzedniego systemu.
- To narzędzie jest przeznaczone do wstępnej migracji danych. Jeśli od dłuższego czasu korzystasz już z B1, ponowny import może utworzyć zduplikowane rekordy.

</div>

## Dostęp do narzędzia Transfer

1. Zaloguj się do **B1 Admin**.
2. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Ustawienia** i kliknij **Ustawienia**.
3. Kliknij link **Import/Export** pod nazwą swojego kościoła w lewym menu ustawień.
4. Otworzy się narzędzie **B1 Transfer** w nowej karcie pod adresem [transfer.b1.church](https://transfer.b1.church).

Narzędzie prowadzi przez cztery kroki: Źródło, Podgląd, Miejsce docelowe i Uruchomienie.

---

## Krok 1 - Wybierz źródło

Wybierz, skąd pochodzą dane. Dostępnych jest siedem opcji:

- **Baza danych B1** — Pobiera dane bezpośrednio z istniejącego kościoła w B1. Przydatne do wykonania kopii zapasowej lub przekonwertowania danych do innego formatu. Aby skorzystać z tej opcji, musisz być zalogowany.
- **Plik ZIP importu B1** — Plik zip w formacie samego B1. Służy przede wszystkim do przywracania wcześniejszego eksportu z B1. Załadowanie pliku ZIP eksportu B1 do **Bazy danych B1** przywraca wszystko, co zawiera eksport (zobacz [Eksportowanie danych](./exporting-data.md#full-data-export-from-settings)). Jeśli plik nie może zostać odczytany, narzędzie wyświetla błąd zamiast rozpocząć od nowa.
- **Plik ZIP importu Breeze** — Plik zip zawierający wyeksportowane pliki z Breeze ChMS.
- **Plik ZIP Planning Center** — Plik zip lub CSV wyeksportowany z Planning Center.
- **Własny CSV / Excel** — Dowolny plik CSV lub Excel zawierający dane osób. Po przesłaniu pliku przypiszesz kolumny do pól B1, zanim import będzie kontynuowany.
- **CSV z Tithe.ly** — Plik eksportu osób lub darowizn z Tithe.ly (akceptowany format CSV lub Excel).
- **CSV z CCB / Pushpay** — Eksport osób lub darowizn w formacie CSV z Church Community Builder lub Pushpay.

Plik możesz przeciągnąć i upuścić w obszarze przesyłania albo kliknąć, aby wybrać go z dysku.

---

## Krok 1b - Przypisz pola (tylko Własny CSV / Excel)

Jeśli wybrano **Własny CSV / Excel**, po przesłaniu pliku narzędzie wyświetli ekran przypisywania pól, zanim przejdziesz do podglądu.

Każda kolumna z pliku jest wymieniona obok przykładowej wartości. Dla każdej kolumny użyj listy rozwijanej, aby wybrać odpowiadające pole B1. Narzędzie automatycznie rozpozna popularne nazwy kolumn, takie jak „First Name”, „Email” lub „Zip Code”, ale powinieneś przejrzeć każdy wiersz i poprawić wszystko, co zostało pominięte.

Dostępne pola B1 obejmują:

- First Name (imię), Last Name (nazwisko), Middle Name (drugie imię), Nickname (pseudonim), Display Name (nazwa wyświetlana), Title/Prefix (tytuł/prefiks), Suffix (sufiks)
- Email, Home Phone (telefon domowy), Mobile Phone (telefon komórkowy), Work Phone (telefon służbowy)
- Address Line 1 (adres, wiersz 1), Address Line 2 (adres, wiersz 2), City (miasto), State (województwo/stan), Zip Code (kod pocztowy)
- Birth Date (data urodzenia), Anniversary (rocznica), Gender (płeć), Marital Status (stan cywilny), Membership Status (status członkostwa)
- Household/Family Name (nazwa gospodarstwa domowego/rodziny)
- Group Name — przypisuje osobę do grupy na podstawie nazwy
- **Custom Field (match by name)** — zapisuje kolumnę w jednym z [niestandardowych pól osób](../settings/custom-fields.md) Twojego kościoła. Pojawi się pole **B1 field name**, wypełnione nagłówkiem kolumny. Zmień je na nazwę pola dokładnie tak, jak jest zapisana w B1 (wielkość liter nie ma znaczenia).
- **Form Answer (custom field)** — zapisuje wartość z tej kolumny jako niestandardowe pole przypisane do rekordu osoby. Jeśli wybierzesz tę opcję, zostaniesz poproszony o nadanie nazwy formularzowi.

Daty mogą być w popularnych formatach, takich jak `9/17/1994`, i są konwertowane automatycznie. Dla pól niestandardowych pola Tak/Nie akceptują wartości takie jak Yes, No, Y, N, True, False, 1 i 0, a pola wyboru wielokrotnego akceptują tekst wyboru lub jego wartość.

:::info
Utwórz niestandardowe pola osób w B1 Admin przed importem. Po zakończeniu importu krok **Pola niestandardowe** wyświetla nazwy kolumn, które nie pasują do żadnego pola B1, i liczy wartości, które nie pasują do typu pola. Te wartości są pomijane, a reszta importu zostaje ukończona.
:::

Kolumny, których nie chcesz importować, można ustawić na **(Pomiń)**. Przed kontynuowaniem trzeba przypisać co najmniej jedno pole nazwy (First Name lub Last Name).

Kliknij **Potwierdź przypisanie i importuj**, aby przejść do podglądu.

---

## Krok 2 - Podgląd danych

Po przesłaniu pliku narzędzie wyświetla podgląd wszystkiego, co zostanie zaimportowane. Użyj kart, aby przejrzeć każdy typ danych:

- **Osoby** — Wyświetlane według gospodarstw domowych, ze zdjęciami, jeśli zostały dołączone.
- **Grupy** — Uporządkowane według kampusu, nabożeństwa, godziny i kategorii.
- **Frekwencja** — Daty sesji, grupy i liczba wizyt.
- **Darowizny** — Partie, fundusze, darczyńcy i kwoty.
- **Formularze** — Nazwy formularzy i typy treści.

Przejrzyj to uważnie przed kontynuacją. Jeśli coś wygląda nieprawidłowo, kliknij **Zacznij od nowa** i popraw plik źródłowy.

---

## Krok 3 - Wybierz miejsce docelowe

Wybierz, dokąd mają trafić dane:

- **Baza danych B1** — Importuje bezpośrednio do bazy danych Twojego kościoła w B1. Po wybraniu tej opcji narzędzie pokaże końcową liczbę rekordów do dodania. Kliknij **Rozpocznij transfer**, aby potwierdzić.
- **Plik ZIP eksportu B1** — Pobiera dane jako plik zip w formacie B1, który można później przywrócić za pomocą **Pliku ZIP importu B1**. Dobre do kopii zapasowych.
- **Plik ZIP eksportu Breeze** — Konwertuje dane do formatu Breeze.
- **Plik ZIP Planning Center** — Konwertuje dane do formatu Planning Center.

:::warning
Źródło i miejsce docelowe nie mogą być w tym samym formacie. Jeśli są takie same, narzędzie wyświetli ostrzeżenie, aby zapobiec przypadkowemu zduplikowaniu danych.
:::

---

## Krok 4 - Uruchomienie

Narzędzie przetwarza transfer i pokazuje postęp dla każdego kroku:

- Kampusy, nabożeństwa i godziny
- Osoby
- Zdjęcia
- Grupy i członkowie grup
- Darowizny
- Frekwencja
- Formularze, pytania, odpowiedzi i zgłoszenia formularzy
- Pola niestandardowe (gdy przypisano kolumny pól niestandardowych)
- Kompresja (tylko dla miejsc docelowych w postaci plików zip)

Gdy miejscem docelowym jest **Baza danych B1**, karta postępu nosi tytuł **Postęp importu** i kończy się komunikatem **Import zakończony!** (lub **Import zakończony z błędami**). Dla miejsc docelowych w postaci plików zip te same komunikaty zawierają słowo **Eksport**.

:::info
Podczas przywracania **Pliku ZIP importu B1** rekordy wskazujące na coś, czego nie ma już w pliku, są pomijane zamiast zatrzymywać import. Dotyczy to członkostw w grupach osób lub grup, których nie ma w pliku zip, frekwencji dla usuniętych grup lub osób oraz powiązań między grupami a usuniętymi godzinami nabożeństw. Sesje frekwencji, które nigdy nie były powiązane z godziną nabożeństwa, są nadal przywracane. Podobnie, podczas eksportu zdjęcie, którego nie można pobrać lub odczytać, zostaje pominięte, aby krok **Zdjęcia** mógł kontynuować działanie.
:::

:::warning
Nie zamykaj przeglądarki, dopóki transfer trwa. Poczekaj, aż wszystkie kroki będą oznaczone jako ukończone.
:::

---

## Przygotowanie pliku ZIP importu Breeze

1. W Breeze przejdź do **Ustawień** i kliknij **Eksport** w lewym pasku bocznym.
2. Wyeksportuj trzy osobne pliki: **People**, **Tags** i **Contributions**.
3. Zaznacz wszystkie trzy pliki, kliknij prawym przyciskiem myszy i spakuj je do jednego pliku zip.
   - Na Macu: zaznacz pliki, kliknij prawym przyciskiem myszy i wybierz **Kompresuj**.
   - Na PC: zaznacz pliki, kliknij prawym przyciskiem myszy, wybierz **Wyślij do**, a następnie **Folder skompresowany (zip)**.
4. Prześlij plik zip za pomocą opcji **Plik ZIP importu Breeze** w Kroku 1.

Import z Breeze automatycznie przenosi osoby, grupy (tagi) i rekordy darowizn.

---

## Przygotowanie eksportu z Planning Center

1. Zaloguj się do Planning Center i otwórz produkt **People**.
2. W lewym pasku bocznym kliknij **Lists** i utwórz listę obejmującą wszystkich, których chcesz przenieść. (Jeśli masz już listę całej zboru, użyj jej.)
3. Otwórz listę i użyj opcji **export**, aby pobrać osoby jako plik **CSV**. Uwzględnij pola, które chcesz zachować — imię i nazwisko, e-mail, telefon, adres, datę urodzenia, płeć i status członkostwa zostaną przeniesione do B1.
4. Jeśli Planning Center udostępnia więcej niż jeden plik, zaznacz wszystkie, kliknij prawym przyciskiem myszy i spakuj je do jednego pliku zip.
   - Na Macu: zaznacz pliki, kliknij prawym przyciskiem myszy i wybierz **Kompresuj**.
   - Na PC: zaznacz pliki, kliknij prawym przyciskiem myszy, wybierz **Wyślij do**, a następnie **Folder skompresowany (zip)**.
5. Prześlij plik CSV lub zip za pomocą opcji **Plik ZIP Planning Center** w Kroku 1.

Po przesłaniu przejdź do podglądu i sprawdź, czy osoby oraz gospodarstwa domowe wyglądają poprawnie, zanim uruchomisz import.

---

## Przygotowanie eksportu z Tithe.ly

1. W Tithe.ly wyeksportuj dane **People** jako plik CSV lub Excel. Jeśli chcesz zaimportować rekordy darowizn, możesz też wyeksportować osobny plik **Giving**.
2. Narzędzie automatycznie rozpozna, czy plik zawiera dane osób, czy darowizn, na podstawie nazw kolumn.
3. Prześlij plik za pomocą opcji **CSV z Tithe.ly** w Kroku 1.

:::info
Eksporty z Tithe.ly można importować po jednym pliku. Jeśli musisz zaimportować osobno osoby i darowizny, uruchom proces dwukrotnie.
:::

---

## Przygotowanie eksportu z CCB lub Pushpay

1. W Church Community Builder lub Pushpay wyeksportuj dane **People** jako plik CSV. Możesz też wyeksportować osobny plik z darowiznami lub wkładami.
2. Narzędzie automatycznie rozpozna, czy plik zawiera dane osób, czy darowizn, na podstawie nazw kolumn.
3. Prześlij plik za pomocą opcji **CSV z CCB / Pushpay** w Kroku 1.

---

## Po imporcie

Gdy transfer się zakończy, poświęć kilka minut na sprawdzenie danych:

1. Przejrzyj stronę [Osoby](../people/adding-people.md) i sprawdź kilka profili losowo.
2. Upewnij się, że imiona, adresy e-mail, numery telefonów i adresy zostały poprawnie przeniesione.
3. Sprawdź, czy powiązania w gospodarstwach domowych są zachowane. Rola każdej osoby w gospodarstwie domowym (Head, Spouse, Child lub Other) jest przenoszona, jeśli źródło ją zawiera: kolumna **householdRole** w pliku ZIP importu B1, **Family Role** w Breeze lub Tithe.ly oraz **Family Position** w CCB / Pushpay. Role takie jak „Head of Household”, „Primary”, „Wife” lub „Son” są konwertowane na odpowiadającą rolę w B1. Importy z Planning Center oraz Własnego CSV / Excel nie zawierają kolumny ról, więc tym osobom przypisywana jest rola **Other**; możesz zmienić rolę w gospodarstwie domowym osoby na stronie [Osoby](../people/adding-people.md#managing-households).
4. Przejrzyj zaimportowane grupy i rekordy darowizn.

Jeśli zauważysz problemy, możesz edytować poszczególne profile na stronie Osoby. Możesz też ponownie uruchomić narzędzie Transfer, aby [wyeksportować dane](exporting-data.md) jako kopię zapasową.
