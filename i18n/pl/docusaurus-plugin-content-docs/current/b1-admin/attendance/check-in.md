---
title: "Konfiguracja samoobsługowego check-in z B1 Checkin i B1 Admin"
sidebar_label: "Check-In"
description: "Skonfiguruj samoobsługowe zameldowanie na nabożeństwach za pomocą aplikacji B1 Checkin w B1 Admin, obejmujące urządzenia, konta kiosków, harmonogramy, branding i rejestrację gości przez kod QR."
---

# Check-In

<div class="article-intro">

B1 Admin obsługuje samoobsługowe zameldowanie na nabożeństwach za pośrednictwem towarzyszącej aplikacji **B1 Checkin**. Członkowie zboru mogą sami zameldować siebie i swoje rodziny przy kioskach lub na dedykowanych urządzeniach po przybyciu, co przyspiesza cały proces i zmniejsza obciążenie wolontariuszy. Każde zameldowanie jest automatycznie zapisywane jako obecność.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Twoje zbory lokalne, godziny nabożeństw i grupy muszą być skonfigurowane w [Konfiguracji obecności](setup.md).
- Potrzebujesz [osób w bazie danych](../people/adding-people.md) z ustawionymi [gospodarstwami domowymi](../people/adding-people.md#managing-households), aby rodziny mogły meldować się razem.
- Będziesz potrzebować tabletu i opcjonalnie drukarki etykiet Brother (zobacz [zalecany sprzęt](#recommended-hardware) poniżej).

</div>

## Jak to działa

Aplikacja B1 Checkin łączy się z konfiguracją obecności w B1 Admin. Gdy członek zboru się melduje, jego obecność jest automatycznie zapisywana we właściwym zborze lokalnym, godzinie nabożeństwa i grupie. Nie musisz ręcznie wprowadzać obecności osób korzystających z systemu zameldowania.

## Konfiguracja zameldowania

1. **Najpierw skonfiguruj strukturę obecności.** W B1 Admin przejdź do **Osoby > Obecność** i kliknij **Konfiguracja**, aby upewnić się, że zbory lokalne, godziny nabożeństw i grupy są ustawione. Aplikacja zameldowania opiera się na tej konfiguracji. Opcjonalnie przypisz każdej godzinie nabożeństwa [harmonogram zameldowania](setup.md#setting-a-check-in-schedule), dzięki czemu zameldowanie otwiera się i zamyka automatycznie co tydzień. Harmonogramy używają strefy czasowej zboru lokalnego, do którego należy nabożeństwo, lub strefy czasowej Twojego kościoła, jeśli zbór lokalny nie ma ustawionej strefy. Kiosk wyświetla godziny nabożeństw, których okno jest zamknięte, jako **Zamknięte** i informuje rodziny, kiedy zameldowanie się otworzy. Szczegóły znajdziesz w [Konfiguracji obecności](setup.md).
2. **Zainstaluj aplikację B1 Checkin** na urządzeniach, których zamierzasz użyć. Aplikacja jest dostępna na następujących platformach:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablety Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablety Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Zaloguj się do aplikacji B1 Checkin**, używając konta z uprawnieniem do obecności **Checkin** (lub **Edycja obecności**). Zobacz [Konta kiosków zameldowania](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Wybierz zbór lokalny i godzinę nabożeństwa** dla bieżącego zgromadzenia.
5. Członkowie mogą teraz wyszukać swoje imię na urządzeniu i się zameldować.

:::tip
Umieszczaj urządzenia do zameldowania w widocznych i łatwo dostępnych miejscach, na przykład przy wejściach do holu lub przy stolikach powitalnych. Krótkie ogłoszenie podczas nabożeństw pomaga członkom wiedzieć, że ta opcja jest dostępna.
:::

:::tip
Jeśli Twój kościół ma wiele zborów lokalnych, musisz powtórzyć konfigurację dla każdego z nich w [Konfiguracji obecności](setup.md). Każde urządzenie do zameldowania może być skonfigurowane dla innego zboru lokalnego.
:::

## Zalecany sprzęt

**Tablety** — każdy z poniższych dobrze współpracuje z aplikacją:

- **Kompaktowy:** Samsung Galaxy Tab A7 Lite 8,7"
- **Duży ekran:** Samsung Galaxy Tab A8 10,5"
- **Budżetowy:** Amazon Fire HD 10

**Drukarki** — zameldowania działają z drukarkami etykiet Brother do drukowania plakietek z imionami:

- **Najlepsza:** Brother QL-1110NWB (obsługuje wiele tabletów przez Bluetooth i WiFi)
- **Dobra:** Brother QL-810W (obsługuje wiele tabletów przez WiFi)
- **Budżetowa:** Brother QL-1100 (tylko WiFi)

**Etykiety:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Tylko drukarki etykiet Brother są kompatybilne z aplikacją B1 Checkin. Drukarki innych marek nie będą działać przy drukowaniu plakietek z imionami.
:::

:::info
Postępuj zgodnie z instrukcjami konfiguracji drukarki, aby połączyć ją z tą samą siecią WiFi, do której podłączony jest tablet. Sterowniki drukarek Brother oraz przewodniki konfiguracji znajdziesz na [stronie wsparcia Brother](https://support.brother.com).
:::

## Dostosowywanie wyglądu kiosku

Możesz dostosować wygląd aplikacji B1 Checkin, aby pasował do brandingu Twojego kościoła. W B1 Admin przejdź do **Mobile > B1 CheckIn** i użyj karty **Motyw kiosku**, aby skonfigurować:

### Kolory

Dostosuj osiem ustawień kolorów, aby pasowały do brandingu kościoła:

- **Główny** i **Kontrast główny** — główny kolor marki i kolor jej tekstu.
- **Drugorzędny** i **Kontrast drugorzędny** — kolor akcentu i kolor jego tekstu.
- **Tło nagłówka** i **Tło podnagłówka** — kolory obszarów nagłówka kiosku.
- **Tło przycisku** i **Tekst przycisku** — kolory przycisków interaktywnych.

### Obraz tła

Prześlij opcjonalny obraz tła dla ekranów powitalnego i wyszukiwania w kiosku. Zalecany rozmiar to 1920x1080 pikseli.

### Ekran bezczynności / wygaszacz ekranu

Skonfiguruj wygaszacz ekranu, który uruchomi się po okresie bezczynności:

1. Włącz lub wyłącz ekran bezczynności.
2. Ustaw **limit czasu** (ile sekund bezczynności, zanim wygaszacz się uruchomi; minimum 10 sekund).
3. Dodaj jeden lub więcej **slajdów** — każdy slajd ma obraz i czas wyświetlania (minimum 3 sekundy).

:::tip
Używaj ekranu bezczynności do wyświetlania ogłoszeń, nadchodzących wydarzeń lub wiadomości powitalnych, gdy kiosk nie jest aktywnie używany.
:::

## Rejestracja gości przez kod QR

Kiosk do zameldowania może wyświetlać kod QR, który odwiedzający skanuje, aby samodzielnie zarejestrować siebie i swoją rodzinę na własnym telefonie. Przyspiesza to proces zameldowania w przypadku gości, którzy przychodzą po raz pierwszy.

Gdy gość zeskanuje kod QR, zostanie przekierowany na [stronę rejestracji gości](../../b1-church/checkin/guest-registration.md), gdzie wpisze imiona członków swojej rodziny oraz inne dane, o które zdecydujesz się zapytać. Wolontariusz może następnie wyszukać go na kiosku i zameldować.

### Włączanie rejestracji gości przez kod QR

Aby włączyć wyświetlanie kodu QR:

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń **Mobile**.
2. Kliknij **B1 CheckIn**.
3. Włącz przełącznik **Rejestracja gości QR** i kliknij **Zapisz**.

:::note
To ustawienie znajduje się w **Mobile > B1 CheckIn** (na tej samej stronie co karta **Motyw kiosku**), a nie w sekcji Obecność. Akcja **Kiosk** na stronie Obecność zawiera link do tej strony.
:::

Gdy przełącznik jest włączony, pozostałe opcje poniżej pojawią się na tej samej karcie **Rejestracja gości QR**. Po zmianie dowolnej z nich kliknij **Zapisz** na karcie.

### Wybór pól formularza

Lista **Pola formularza rejestracji** określa, o co pyta formularz rejestracji. **Imię** i **Nazwisko** są zawsze obecne w formularzu i zawsze wymagane dla każdego członka rodziny. Dla każdego innego pola włącz **Uwzględnij**, aby dodać je do formularza, a następnie włącz **Wymagane**, jeśli goście muszą je wypełnić. Opcję **Wymagane** można włączyć tylko dla uwzględnionego pola, a wyłączenie **Uwzględnij** ją czyści.

| Pole | O co pytane | Domyślnie uwzględnione |
|-------|-----------|---------------------|
| **Tytuł** | Każdy członek rodziny, jako lista rozwijana przed imieniem (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Nie |
| **E-mail** | Tylko osoba kontaktowa | Tak (opcjonalnie) |
| **Telefon** | Każdy członek rodziny. Gdy pole jest wymagane, tylko osoba kontaktowa musi je wypełnić. | Tak (opcjonalnie) |
| **Rola w gospodarstwie** | Każdy członek rodziny po osobie kontaktowej — Małżonek, Dziecko lub Inne. Osoba kontaktowa jest głową nowego gospodarstwa. Osoba bez roli jest zapisywana jako Inne. | Tak (opcjonalnie) |
| **Adres zamieszkania** | Raz dla rodziny — ulica, linia adresu 2, miasto, województwo i kod pocztowy. Gdy pole jest wymagane, wszystko oprócz linii adresu 2 musi być wypełnione. Adres jest zapisywany u każdego członka rodziny. | Nie |
| **Data urodzenia** | Każdy członek rodziny | Nie |
| **Płeć** | Każdy członek rodziny | Nie |
| **Stan cywilny** | Tylko osoba kontaktowa | Nie |
| **Klasa** | Każdy członek rodziny (od przedszkola do 12 klasy lub Ukończona szkoła) | Nie |
| **Uwagi** | Raz, w polu pod członkami rodziny (do 1000 znaków) | Nie |

Pola, które wyłączysz, nigdy nie są zapisywane, nawet jeśli ktoś prześle je do rejestracji w inny sposób. Uwagi są zapisywane jako notatka w rekordzie osoby kontaktowej (opublikowana jako „Rejestracja gościa”), dzięki czemu możesz je przeczytać w sekcji **Notatki** jej profilu.

### Dodawanie gości do grupy

Użyj opcji **Dodaj nowych gości do grupy**, aby automatycznie przypisać wszystkich rejestrujących się do jednej z Twoich grup — na przykład grupy „Nowi” lub grupy na wydarzenie w tym tygodniu. Wybierz **Brak** (domyślnie), aby pominąć tę opcję. Goście nigdy nie widzą ani nie wybierają grupy; jest ona ustawiana wyłącznie tutaj. Zmieniaj ją przed każdym wydarzeniem, abyś mógł razem kontynuować kontakt z gośćmi danego wydarzenia.

### Rejestrowanie obecności

Gdy wybrana jest grupa, pojawia się przełącznik **Zapisz również obecność**. Włącz go, aby oznaczyć gości jako obecnych w chwili rejestracji, dzięki czemu nie musisz meldować ich osobno.

Obecność jest zapisywana tylko wtedy, gdy rejestracja odbywa się w jednej z **zaplanowanych** godzin nabożeństw wybranej grupy:

- Grupa musi być powiązana z co najmniej jedną godziną nabożeństwa, a te godziny muszą mieć [harmonogram zameldowania](setup.md#setting-a-check-in-schedule) (**Dzień** i **Godzina rozpoczęcia**).
- „Podczas” oznacza wewnątrz okna zameldowania tej godziny nabożeństwa — od liczby minut **Otwarcie zameldowania** przed rozpoczęciem do liczby minut **Zamknięcie zameldowania** po zakończeniu (albo po rozpoczęciu, jeśli nie ustawiono godziny zakończenia; a jeśli nie ma ani godziny zakończenia, ani minut zamknięcia — do końca tego dnia), w tej samej strefie czasowej, której używa harmonogram zameldowania.
- Każdy członek rodziny jest oznaczany jako obecny w grupie dla każdej z jej godzin nabożeństw, która jest w tym momencie otwarta, na dzisiejszą datę.
- Rejestracje w innym czasie lub dla grupy, której godziny nabożeństw nie mają harmonogramu, są dodawane do grupy, ale nie są liczone jako obecność.

### Zdjęcie nagłówka

W sekcji **Zdjęcie nagłówka** kliknij **Zmień zdjęcie**, aby wybrać lub przesłać obraz (przycięty do proporcji 16:9), który będzie wyświetlany na górze strony rejestracji zamiast domyślnej ikony. Kliknij **Usuń**, aby wrócić do ikony.

### Udostępnianie linku do rejestracji

Po włączeniu rejestracji gości QR na dole karty pojawi się sekcja **Udostępnij kod QR rejestracji**. Daje ona dwa sposoby na dotarcie gości do formularza rejestracji poza kodem QR w kiosku:

- **Kopiuj link** — kopiuje adres URL rejestracji, dzięki czemu możesz wkleić go na stronie internetowej kościoła, w wiadomościach e-mail lub w dowolnym miejscu w sieci.
- **Pobierz PNG** — pobiera kod QR jako obraz, który możesz wydrukować na ulotkach, w biuletynach lub na tablicach informacyjnych.

:::tip
Dodaj link do rejestracji na stronie internetowej kościoła, np. na stronie „Zaplanuj wizytę” lub „Jestem nowy”, aby goście mogli się zarejestrować jeszcze przed przyjściem.
:::

### Co dzieje się po rejestracji gościa

B1 najpierw szuka osób, które już znajdują się w **Osobach**. Członek rodziny jest dopasowywany do istniejącej osoby, gdy dokładnie jedna osoba ma takie samo imię i ten sam e-mail lub telefon. Dziecko wpisane bez e-maila lub telefonu jest dopasowywane po imieniu w obrębie dopasowanego gospodarstwa domowego. Dopasowane osoby są używane ponownie w niezmienionej formie — rejestracja nigdy nie zmienia ich danych ani statusu członkostwa — a każda nowa osoba dołącza do dopasowanego gospodarstwa domowego.

Gdy nikt nie zostanie dopasowany, rejestracja tworzy nowe gospodarstwo domowe, nazwane od nazwiska osoby kontaktowej, z rekordem osoby dla każdego członka rodziny. Wszystkie nowe osoby są dodawane do **Osób** ze statusem członkostwa **Odwiedzający**, a osoba kontaktowa jest głową gospodarstwa domowego.

Zarówno dopasowane, jak i nowe osoby są dodawane do wybranej przez Ciebie grupy (jeśli nie są jeszcze w niej) i mają zapisywaną obecność, gdy ta opcja jest włączona. Uwagi są zapisywane jako notatka u osoby kontaktowej.

Aby automatycznie kontaktować się z nowymi osobami, dodaj [wyzwalacz przepływu pracy](../serving/workflows.md#triggers), na przykład **Osoba · Utworzona** z warunkiem *Status członkostwa to Odwiedzający*, lub **Grupa · Członek dołączył** dla wybranej przez Ciebie grupy.

## Co jest zapisywane

Każde zameldowanie tworzy rekord obecności w B1 Admin. Możesz przeglądać te rekordy na stronie [Obecność](tracking-attendance.md) oraz w [sesjach każdej grupy](../groups/group-members.md), tak samo jak obecność wprowadzoną ręcznie. Dane wyglądają identycznie — obie metody zasilają te same raporty.
