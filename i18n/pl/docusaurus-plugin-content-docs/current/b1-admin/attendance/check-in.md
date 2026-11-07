---
title: "Samodzielne meldowanie w B1 Checkin i B1 Admin"
sidebar_label: "Zameldowanie"
description: "Skonfiguruj samodzielne meldowanie na nabożeństwa w B1 Checkin: urządzenia, konta kiosków, harmonogramy, branding i rejestrację gości kodem QR."
---

# Zameldowanie

<div class="article-intro">

B1 Admin obsługuje samodzielne zameldowanie na nabożeństwach za pośrednictwem towarzyszącej aplikacji **B1 Checkin**. Członkowie wspólnoty mogą zameldować siebie i swoje rodziny przy kioskach lub na dedykowanych urządzeniach po przybyciu, co przyspiesza cały proces i zmniejsza obciążenie wolontariuszy. Każde zameldowanie jest automatycznie zapisywane jako obecność.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Twoje kampusy, godziny nabożeństw i grupy muszą być skonfigurowane w [Konfiguracji obecności](setup.md).
- Potrzebujesz [osób w bazie danych](../people/adding-people.md) z [gospodarstwami domowymi](../people/adding-people.md#managing-households), aby rodziny mogły meldować się razem.
- Będziesz potrzebować tabletu i opcjonalnie drukarki etykiet Brother (zobacz [zalecany sprzęt](#recommended-hardware) poniżej).

</div>

## Jak to działa

Aplikacja B1 Checkin łączy się z konfiguracją obecności w B1 Admin. Gdy członek wspólnoty się melduje, jego obecność jest automatycznie zapisywana przy właściwym kampusie, godzinie nabożeństwa i grupie. Nie musisz ręcznie wprowadzać obecności osób, które korzystają z systemu zameldowania.

## Konfiguracja zameldowania

1. **Najpierw skonfiguruj strukturę obecności.** W B1 Admin przejdź do **Ludzie > Obecność** i kliknij **Konfiguracja**, aby upewnić się, że kampusy, godziny nabożeństw i grupy są ustawione. Aplikacja zameldowania opiera się na tej konfiguracji. Opcjonalnie przypisz każdej godzinie nabożeństwa [harmonogram zameldowania](setup.md#setting-a-check-in-schedule), dzięki czemu zameldowanie będzie się automatycznie otwierać i zamykać co tydzień. Harmonogramy używają strefy czasowej kampusu, do którego należy nabożeństwo, lub strefy czasowej Twojego kościoła, jeśli kampus nie ma ustawionej strefy. Kiosk oznacza godziny nabożeństw, których okno jest zamknięte, jako **Zamknięte**, i informuje rodziny, kiedy zameldowanie się otworzy. Szczegóły znajdziesz w [Konfiguracji obecności](setup.md).
2. **Zainstaluj aplikację B1 Checkin** na urządzeniach, których zamierzasz używać. Aplikacja jest dostępna na następujących platformach:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablety Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablety Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Zaloguj się w aplikacji B1 Checkin** przy użyciu konta z uprawnieniem **Zameldowanie** do obecności (lub **Edycja obecności**). Zobacz [Konta kiosków zameldowania](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Wybierz kampus i godzinę nabożeństwa** dla bieżącego spotkania.
5. Członkowie mogą teraz wyszukać swoje imię na urządzeniu i się zameldować.

:::tip
Umieść urządzenia do zameldowania w widocznych, łatwo dostępnych miejscach, takich jak wejścia do holu lub stoliki powitalne. Krótka zapowiedź podczas nabożeństw pomaga członkom wspólnoty dowiedzieć się, że ta opcja istnieje.
:::

:::tip
Jeśli Twój kościół ma wiele kampusów, musisz powtórzyć konfigurację dla każdego kampusu w [Konfiguracji obecności](setup.md). Każde urządzenie do zameldowania może być skonfigurowane dla innego kampusu.
:::

## Zalecany sprzęt

**Tablety** — każdy z poniższych dobrze sprawdza się z aplikacją:

- **Kompaktowy:** Samsung Galaxy Tab A7 Lite 8.7"
- **Duży ekran:** Samsung Galaxy Tab A8 10.5"
- **Budżetowy:** Amazon Fire HD 10

**Drukarki** — zameldowanie współpracuje z drukarkami etykiet Brother do drukowania plakietek z imionami:

- **Najlepsza:** Brother QL-1110NWB (obsługuje wiele tabletów przez Bluetooth i WiFi)
- **Dobra:** Brother QL-810W (obsługuje wiele tabletów przez WiFi)
- **Budżetowa:** Brother QL-1100 (tylko WiFi)

**Etykiety:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Tylko drukarki etykiet Brother są kompatybilne z aplikacją B1 Checkin. Drukarki innych marek nie będą działać przy drukowaniu plakietek.
:::

:::info
Postępuj zgodnie z instrukcją konfiguracji drukarki, aby podłączyć ją do tej samej sieci WiFi co tablet. Sterowniki i przewodniki konfiguracji drukarek Brother znajdziesz na [stronie wsparcia Brother](https://support.brother.com).
:::

## Dostosowywanie wyglądu kiosku

Możesz dostosować wygląd aplikacji B1 Checkin do identyfikacji wizualnej Twojego kościoła. W B1 Admin przejdź do **Mobilne > B1 CheckIn** i użyj karty **Motyw kiosku**, aby skonfigurować:

### Kolory

Dostosuj osiem ustawień kolorów do identyfikacji wizualnej kościoła:

- **Główny** i **Kontrast głównego** -- Główny kolor marki i jego kolor tekstu.
- **Drugorzędny** i **Kontrast drugorzędnego** -- Kolor akcentu i jego kolor tekstu.
- **Tło nagłówka** i **Tło podnagłówka** -- Kolory obszarów nagłówka kiosku.
- **Tło przycisków** i **Tekst przycisków** -- Kolory przycisków interaktywnych.

### Obraz tła

Prześlij opcjonalny obraz tła dla ekranów powitalnych i wyszukiwania w kiosku. Zalecany rozmiar to 1920x1080 pikseli.

### Ekran bezczynności / wygaszacz

Skonfiguruj wygaszacz ekranu, który uruchamia się po okresie bezczynności:

1. Włącz lub wyłącz ekran bezczynności.
2. Ustaw **limit czasu** (ile sekund bezczynności, zanim uruchomi się wygaszacz; minimum 10 sekund).
3. Dodaj jeden lub więcej **slajdów** -- każdy slajd ma obraz i czas wyświetlania (minimum 3 sekundy).

:::tip
Używaj ekranu bezczynności do wyświetlania ogłoszeń, nadchodzących wydarzeń lub wiadomości powitalnych, gdy kiosk nie jest aktywnie używany.
:::

## Rejestracja gości przez kod QR

Kiosk zameldowania może wyświetlać kod QR, który goście skanują, aby samodzielnie zarejestrować siebie i swoją rodzinę na własnym telefonie. Przyspiesza to proces zameldowania pierwszych gości.

Gdy gość zeskanuje kod QR, trafia na [stronę rejestracji gości](../../b1-church/checkin/guest-registration.md), gdzie wpisuje imiona członków swojej rodziny i inne dane, o które zdecydujesz się poprosić. Wolontariusz może następnie wyszukać go na kiosku i go zameldować.

### Włączanie rejestracji gości przez QR

Aby włączyć wyświetlanie kodu QR:

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń **Mobilne**.
2. Kliknij **B1 CheckIn**.
3. Przełącz **Rejestracja gości QR** na włączone i kliknij **Zapisz**.

:::note
To ustawienie znajduje się w **Mobilne > B1 CheckIn** (na tej samej stronie co karta **Motyw kiosku**), a nie w sekcji Obecność. Akcja **Kiosk** na stronie Obecność ma łącze do tej strony.
:::

Gdy przełącznik jest włączony, pozostałe opcje poniżej pojawiają się na tej samej karcie **Rejestracja gości QR**. Po zmianie dowolnej z nich kliknij **Zapisz** na karcie.

### Wybór pól formularza

Lista **Pola formularza** określa, o co pyta formularz rejestracji. **Imię** i **Nazwisko** są zawsze w formularzu i zawsze wymagane dla każdego członka rodziny. Dla każdego innego pola włącz **Uwzględnij**, aby dodać je do formularza, a następnie włącz **Wymagane**, jeśli goście muszą je wypełnić. **Wymagane** można włączyć tylko dla uwzględnionego pola, a wyłączenie **Uwzględnij** je czyści.

| Pole | Pytane o | Domyślnie uwzględnione |
|-------|-----------|---------------------|
| **E-mail** | Tylko osobę kontaktową główną | Tak (opcjonalne) |
| **Telefon** | Tylko osobę kontaktową główną | Tak (opcjonalne) |
| **Adres domowy** | Raz dla rodziny -- ulica, adres (linia 2), miasto, stan i kod pocztowy. Gdy pole jest wymagane, wszystko oprócz linii 2 adresu musi być wypełnione. Adres jest zapisywany u każdego członka rodziny. | Nie |
| **Data urodzenia** | Każdego członka rodziny | Nie |
| **Płeć** | Każdego członka rodziny | Nie |
| **Stan cywilny** | Tylko osobę kontaktową główną | Nie |
| **Klasa** | Każdego członka rodziny (od przedszkola do 12. klasy lub Absolwent) | Nie |
| **Komentarze** | Raz, w polu pod członkami rodziny (do 1000 znaków) | Nie |

Wyłączone pola nigdy nie są zapisywane, nawet jeśli ktoś przesłał je do rejestracji w inny sposób. Komentarze są zapisywane jako notatka w rekordzie osoby kontaktowej głównej (oznaczona jako „Rejestracja gościa”), dzięki czemu możesz je przeczytać w sekcji **Notatki** jej profilu.

### Dodawanie gości do grupy

Użyj **Dodaj nowych gości do grupy**, aby automatycznie przypisać wszystkie osoby, które się zarejestrują, do jednej z Twoich grup — na przykład grupy „Nowi” lub grupy na wydarzenie w tym tygodniu. Wybierz **Brak** (domyślnie), aby pominąć tę opcję. Goście nigdy nie widzą ani nie wybierają grupy; jest ona ustawiana tylko tutaj. Zmieniaj ją przed każdym wydarzeniem, abyś mógł razem śledzić gości danego wydarzenia.

### Rejestrowanie obecności

Gdy wybrana jest grupa, pojawia się przełącznik **Również zapisz obecność**. Włącz go, aby oznaczyć gości jako obecnych w momencie rejestracji, dzięki czemu nie musisz meldować ich osobno.

Obecność jest zapisywana tylko wtedy, gdy rejestracja odbywa się w jednej z **zaplanowanych** godzin nabożeństw wybranej grupy:

- Grupa musi być powiązana z co najmniej jedną godziną nabożeństwa, a te godziny muszą mieć [harmonogram zameldowania](setup.md#setting-a-check-in-schedule) (**Dzień** i **Godzinę rozpoczęcia**).
- „W trakcie” oznacza okno zameldowania danej godziny nabożeństwa — od liczby minut **Otwarcie zameldowania** przed rozpoczęciem do liczby minut **Zamknięcie zameldowania** po zakończeniu (lub po rozpoczęciu, jeśli nie ustawiono godziny zakończenia; jeśli nie ma ani godziny zakończenia, ani minut zamknięcia, to do końca tego dnia), w tej samej strefie czasowej, której używa harmonogram zameldowania.
- Każdy członek rodziny jest oznaczany jako obecny w grupie dla każdej z jej godzin nabożeństw, które są otwarte w tym momencie, z dzisiejszą datą.
- Rejestracje w innym czasie lub dla grupy, której godziny nabożeństw nie mają harmonogramu, są dodawane do grupy, ale nie są liczone jako obecność.

### Zdjęcie nagłówka

W sekcji **Zdjęcie nagłówka** kliknij **Zmień zdjęcie**, aby wybrać lub przesłać obraz (przycięty do proporcji 16:9), który ma być wyświetlany u góry strony rejestracji zamiast domyślnej ikony. Kliknij **Usuń**, aby wrócić do ikony.

### Udostępnianie linku do rejestracji

Po włączeniu rejestracji gości przez QR na dole karty pojawia się sekcja **Udostępnij kod QR rejestracji**. Daje ona dwa sposoby, aby przekierować gości do formularza rejestracji poza kodem QR na kiosku:

- **Kopiuj link** — kopiuje adres URL rejestracji, abyś mógł wkleić go na stronę internetową kościoła, do wiadomości e-mail lub gdziekolwiek online.
- **Pobierz PNG** — pobiera kod QR jako obraz, który możesz wydrukować na ulotkach, w biuletynach lub na szyldach.

:::tip
Dodaj link do rejestracji na stronę internetową kościoła, np. na podstronę „Zaplanuj wizytę” lub „Jestem nowy”, aby goście mogli się zarejestrować jeszcze przed przybyciem.
:::

### Co się dzieje po rejestracji gościa

B1 najpierw szuka osób, które są już w **Ludziach**. Członek rodziny jest dopasowany do istniejącej osoby, gdy dokładnie jedna osoba ma takie samo imię i ten sam e-mail lub numer telefonu. Dziecko wpisane bez e-maila ani telefonu jest dopasowywane po imieniu w obrębie dopasowanego gospodarstwa domowego. Dopasowane osoby są używane ponownie bez zmian — rejestracja nigdy nie zmienia ich danych ani statusu członkostwa — a każda nowa osoba dołącza do dopasowanego gospodarstwa domowego.

Gdy nikt nie pasuje, rejestracja tworzy nowe gospodarstwo domowe nazwane od nazwiska osoby kontaktowej głównej, z rekordem osoby dla każdego członka rodziny. Wszystkie nowe osoby są dodawane do **Ludzi** ze statusem członkostwa **Odwiedzający**, a osoba kontaktowa główna jako głowa gospodarstwa domowego.

Zarówno dopasowane, jak i nowe osoby są dodawane do wybranej przez Ciebie grupy (jeśli jeszcze w niej nie są) i mają zapisywaną obecność, gdy ta opcja jest włączona. Komentarze są zapisywane jako notatka u osoby kontaktowej głównej.

Aby automatycznie śledzić kontakt, dodaj [wyzwalacz przepływu pracy](../serving/workflows.md#triggers), np. **Osoba · Utworzona** z warunkiem *Status członkostwa to Odwiedzający*, lub **Grupa · Członek dołączył** dla wybranej przez Ciebie grupy.

## Co jest zapisywane

Każde zameldowanie tworzy rekord obecności w B1 Admin. Te rekordy możesz zobaczyć na stronie [Obecność](tracking-attendance.md) oraz w [sesjach każdej grupy](../groups/group-members.md), tak jak w przypadku obecności wprowadzonej ręcznie. Nie ma różnicy w sposobie wyświetlania danych — obie metody zasilają te same raporty.
