---
title: "Dodawanie osób"
---

# Dodawanie osób

<div class="article-intro">

Sekcja Osoby to podstawa B1 Admin, czyli baza danych członków Twojego kościoła. Wszystkie pozostałe funkcje (grupy, frekwencja, darowizny, formularze) są powiązane z rekordami osób. Ten przewodnik pokazuje, jak dodać kogoś do bazy danych, edytować jego dane i łączyć członków rodziny w gospodarstwa domowe.

</div>

## Film szkoleniowy

<YouTube id="NTL1UDQpx8s" title="Dodawanie osób i gospodarstw domowych w B1" next="Importowanie bazy danych osób w B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz aktywnego konta B1 Admin z uprawnieniami do zarządzania osobami. Jeśli nie wiesz, jakie masz uprawnienia, zobacz [Role i uprawnienia](roles-permissions.md).
- Jeśli dodajesz więcej niż kilka osób, rozważ użycie narzędzia [import CSV](importing-data.md).

</div>

## Dodawanie osoby

1. Przejdź do panelu administracyjnego B1.church.
2. Otwórz [menu Skocz do](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Osoby** i kliknij **Osoby**.
3. Kliknij przycisk **Dodaj osobę** w nagłówku strony. Strona przewinie się do formularza **Dodaj nową osobę** pod listą.
4. Wpisz **imię**, **nazwisko** i **adres e-mail** osoby, a następnie kliknij **Dodaj**.

Otworzy się strona profilu osoby, gdzie możesz dodać więcej szczegółów.

:::tip
Jeśli przechodzisz z innego systemu zarządzania kościołem, funkcja [Importuj dane](importing-data.md) pozwala przenieść całą listę osób z pliku CSV. Jest to znacznie szybsze niż dodawanie osób pojedynczo.
:::

### Ostrzeżenia o duplikatach

Jeśli adres e-mail (lub, przy tworzeniu osoby z pełnego formularza edycji, numer telefonu albo zgodne imię, nazwisko i data urodzenia) pasuje do osoby już istniejącej w bazie, przed zapisaniem nowego rekordu pojawi się okno **Możliwy duplikat**. Wyświetla ono każdą pasującą osobę wraz z jej adresem e-mail, telefonem i datą urodzenia, abyś mógł je porównać.

- Kliknij **Użyj istniejącej** obok dopasowania, aby zamiast tworzyć nowy rekord użyć rekordu tej osoby.
- Kliknij **Utwórz mimo to**, aby dodać nową osobę, mimo że znaleziono możliwe dopasowanie.

Sprawdzanie duplikatów dotyczy tylko tworzenia nowej osoby. Edycja istniejącego rekordu nigdy go nie uruchamia. Funkcja zapobiega jedynie powstawaniu nowych duplikatów; nie scala dwóch rekordów, które już istnieją.

## Edycja danych

1. Na stronie profilu osoby kliknij przycisk **Edytuj** pod jej danymi kontaktowymi, po lewej stronie.
2. W formularzu **Dane osobowe** uzupełnij dodatkowe informacje, takie jak **Tytuł** (wybierz z listy Mr, Mrs, Miss, Ms, Dr, Prof, Rev lub Pastor albo wpisz własny, do 10 znaków), drugie imię, status członkostwa (**Odwiedzający**, **Gość**, **Regularny uczestnik**, **Członek**, **Personel**, **Nieaktywny** lub **Zmarły**), daty, adres, numery telefonów oraz (dla dzieci i uczniów) klasę i szkołę.
3. Kliknij **Zapisz**, aby zachować dane osobowe.

Po lewej stronie profilu widoczne są zdjęcie osoby, imię i nazwisko, status członkostwa, dane kontaktowe, wartości [pól niestandardowych](../settings/custom-fields.md) oraz gospodarstwo domowe. Pod gospodarstwem domowym znajduje się **Dodano**, czyli data utworzenia rekordu (wyłącznie dla osób dodanych od końca października 2026 r.). Kliknij zdjęcie, aby je zmienić. Pod przyciskiem **Edytuj** znajduje się kilka dodatkowych działań: **Przepływ pracy** (dodanie osoby do [przepływu pracy](../serving/workflows.md)), **Scal**, **Eksportuj** i **Eksportuj dane**.

Pozostała część profilu zawiera podsumowanie dla każdego rodzaju powiązanych informacji:

- **Frekwencja** — pokazuje, w których z ostatnich kilku tygodni osoba była obecna, oraz jej ostatnie wizyty. Kliknij **Wszystkie lata**, aby zobaczyć pełną historię wizyt, obejmującą kampus, nabożeństwo, godzinę nabożeństwa, grupę oraz kolumnę **Zameldowano** z czasem zameldowania na kiosku (wizyty bez zameldowania na kiosku mają myślnik). Możesz też kliknąć **Drukuj**, aby wydrukować historię (wydruk ma logo i nazwę kościoła wyśrodkowane u góry, nad imieniem i nazwiskiem osoby). Aby zobaczyć trendy dla całego kościoła, a nie historię jednej osoby, zobacz [Śledzenie frekwencji](../attendance/tracking-attendance.md).
- **Darowizny** — pokazuje tegoroczne ofiary, w tym ofiary na fundusze, które nie podlegają odliczeniu. Kliknij **Wszystkie lata**, aby zobaczyć pełną [historię darowizn](../donations/recording-donations.md), albo **Zapisz ofiarę**, aby zarejestrować nową. Jeśli Twój kościół włączył [Prywatność darowizn](../settings/church-settings.md#giving-privacy), kwoty pozostają ukryte, dopóki nie klikniesz **Pokaż darowizny**.
- **Grupy** — wyświetla [członkostwa w grupach](../groups/group-members.md) osoby, wraz z datą **Dołączył(a)** dla każdej grupy, jeśli jest ona zapisana.
- **Notatki** — pokazuje ostatnie notatki o osobie (opieka duszpasterska, działania następcze itp.). Kliknij **Wszystkie notatki**, aby czytać i dodawać notatki. Każda notatka pokazuje, kto ją napisał oraz datę i godzinę dodania. Aby zobaczyć ostatnie notatki wszystkich osób naraz, skorzystaj ze strony [Notatki](./notes.md).
- **Formularze** — wyświetla formularze osoby oraz informację, czy każdy z nich został wypełniony (zobacz poniżej [Praca z formularzami](#working-with-forms)).

Gdy otworzysz któryś z tych pełnych widoków, kliknij link **Wróć do** z imieniem i nazwiskiem osoby u góry, aby wrócić do profilu.

## Wysyłanie wiadomości do osoby

Jeśli osoba ma zapisany adres e-mail, pod jej danymi kontaktowymi po lewej stronie profilu pojawi się przycisk **E-mail**.

1. Na profilu osoby kliknij **E-mail**.
2. Otworzy się okno **E-mail** z imieniem i nazwiskiem osoby w tytule, pokazujące pole **Wysyłane do** z adresem osoby.
3. Opcjonalnie wybierz zapisany szablon z pola **Wczytaj szablon (opcjonalnie)**.
4. Wpisz **Temat** i napisz wiadomość.
5. Kliknij **Wyślij e-mail**.

Aby napisać wiadomość w swoim programie pocztowym, kliknij **Otwórz w mojej aplikacji e-mail**.

:::info
Wysyłanie z B1 podlega tym samym zatwierdzeniom i dziennym limitom co e-mail do grup. Jeśli Twój kościół nie został jeszcze zatwierdzony, okno poprosi o złożenie wniosku o weryfikację. W międzyczasie nadal możesz kliknąć **Otwórz w mojej aplikacji e-mail**. Zobacz [Włączanie e-maili do grup dla Twojego kościoła](../groups/group-members.md#turning-on-group-email-for-your-church). Użytkownicy bez uprawnień do edycji członków grup po kliknięciu **E-mail** od razu przechodzą do swojej aplikacji pocztowej.
:::

## Praca z formularzami

Możesz wypełniać własne formularze bezpośrednio z profilu osoby. Są to formularze definiowane przez użytkownika, które możesz zbudować, postępując zgodnie z przewodnikiem [Tworzenie formularzy](../forms/creating-forms.md).

1. Na profilu osoby znajdź sekcję **Formularze**. Wyświetla ona każdy formularz wraz z informacją, czy został **Wysłany**, czy **Nie wysłano**.
2. Kliknij nazwę formularza, aby go otworzyć (lub kliknij **Wszystkie formularze**, aby zobaczyć pełną listę).
3. Kliknij **ikonę edycji** (ołówek) przy formularzu, uzupełnij szczegóły i kliknij **Zapisz**.

Gdy formularz zostanie wysłany, kliknij **ikonę drukowania** obok niego, aby wydrukować wypełnione odpowiedzi tej osoby. Gdy osoba ma jedno zgłoszenie danego formularza, formularz pokazuje **Wysłano** z datą nad odpowiedziami.

Jeśli zgłoszenie trafiło do niewłaściwej osoby, kliknij ikonę **Zmień osobę** (dwie strzałki) obok niego, aby przenieść je do kogoś innego lub odłączyć. Zobacz [Zmiana osoby przypisanej do zgłoszenia](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formularze powiązane z profilem osoby używają typu formularza **Osoby**. Jeśli potrzebujesz samodzielnego formularza (np. do rejestracji na wydarzenie), zobacz opcję [Formularz samodzielny](../forms/creating-forms.md) w przewodniku po formularzach.
:::

:::tip
Jeśli chcesz śledzić tylko jedną lub dwie dodatkowe informacje o osobach, takie jak data, liczba czy odpowiedź tak/nie, użyj [Pól niestandardowych](../settings/custom-fields.md) zamiast formularza. Są szybsze w uzupełnianiu i można po nich wyszukiwać bezpośrednio w Zaawansowanym wyszukiwaniu.
:::

## Zarządzanie gospodarstwami domowymi {#managing-households}

Gospodarstwa domowe pozwalają łączyć członków rodziny. Jest to szczególnie przydatne przy [meldowaniu](../attendance/check-in.md), gdzie rodzic może zameldować wszystkie swoje dzieci jednocześnie.

1. Na profilu osoby kliknij **Edytuj** obok nagłówka **Gospodarstwo domowe** po lewej stronie.
2. Otworzy się edytor gospodarstwa domowego. Wybierz **rolę w gospodarstwie domowym** dla bieżącej osoby (np. Głowa rodziny, Małżonek, Dziecko, Inna).
3. Kliknij ikonę **Dodaj**, aby dodać kolejnego członka gospodarstwa domowego.
4. W sekcji **Dodaj członka gospodarstwa domowego** wpisz imię i nazwisko osoby w polu wyszukiwania i naciśnij **Enter** albo kliknij ikonę lupy. (Zanim zaczniesz pisać, widoczna jest krótka lista **Ostatnie osoby**.)
5. Gdy osoba pojawi się w wynikach, kliknij jej imię i nazwisko lub ikonę dodawania obok niej.
6. Wybierz jej rolę w gospodarstwie domowym i kliknij **Zapisz**, aby zakończyć konfigurację gospodarstwa domowego.
