---
title: "Ustawienia aplikacji mobilnej"
---

# Ustawienia aplikacji mobilnej

<div class="article-intro">

Strona Ustawienia aplikacji mobilnej pozwala skonfigurować karty nawigacji, które pojawiają się w **doświadczeniu mobilnym B1.church (PWA)** dla członków Twojego kościoła. Możesz określić, które karty są widoczne, dokąd prowadzą i jak są wyświetlane.

</div>

## Film szkoleniowy

<YouTube id="ydY7WGK16fE" title="Dostosowywanie aplikacji dla członków kościoła w B1" />

:::info Natywna aplikacja B1 Mobile jest wycofywana
Karty skonfigurowane tutaj są dostarczane przez [progresywną aplikację internetową B1.church (PWA)](/docs/b1-church/getting-started/installing-pwa), która zastąpiła natywną aplikację B1 Mobile. Udostępnij członkom stronę instalacji swojego kościoła — `https://yourchurchname.b1.church/mobile/install`. Przeprowadzi ich ona przez proces instalacji aplikacji na urządzeniu, bez konieczności pobierania czegokolwiek ze sklepu App Store ani Google Play.
:::

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia „Edit Church Settings”. Jeśli nie masz dostępu, zobacz [Role i uprawnienia](./roles-permissions.md).
- Najpierw skonfiguruj [Ustawienia kościoła](./church-settings.md), w tym nazwę kościoła i branding

</div>

## Dostęp do ustawień nawigacji

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń pozycję **Mobile**.
2. Kliknij **Navigation** (`/mobile/navigation`).
3. Strona Navigation wyświetli bieżące karty aplikacji.

## Dodawanie nowej karty

1. Kliknij przycisk **Add Tab** u góry strony.
2. Wypełnij szczegóły karty:
   - **Name** -- Etykieta widoczna na karcie (na przykład „Sermons” lub „Give”).
   - **Icon** -- Kliknij selektor ikon, aby wybrać ikonę dla karty.
   - **Image** -- Kliknij **Select Image** (lub **Change Image**), aby dodać karcie zdjęcie. Karty ze zdjęciem pojawiają się na ekranie głównym aplikacji jako kafelki ze zdjęciami -- zobacz [Kafelki ekranu głównego](#home-screen-tiles).
   - **Tab Type** -- Wybierz jedną z opcji, takich jak Bible, Live Stream, Donation, Website i inne.
   - **URL** -- Wpisz adres internetowy, do którego ma prowadzić karta.
   - **Visibility** -- Określ, kto może zobaczyć tę kartę (wszyscy, tylko członkowie itd.). W przypadku karty **Member Directory** ustawienie to określa wyłącznie, kto widzi samą kartę; o tym, kto może otworzyć katalog, decyduje opcja **Show in Directory** na stronie Member portal (zobacz [Ustawienia katalogu członków i wiadomości](#member-directory--messaging-settings)).
3. Kliknij **Save Tab**, aby dodać kartę do aplikacji.

## Edycja istniejącej karty

1. Kliknij dowolną istniejącą kartę na liście **App Tabs**.
2. Zaktualizuj nazwę, ikonę, adres URL, typ lub ustawienia widoczności karty.
3. Kliknij **Save Tab**, aby zastosować zmiany.

## Zmiana kolejności kart

Możesz zmienić kolejność, w jakiej karty pojawiają się w aplikacji mobilnej. Przeciągnij karty na liście, aby je przestawić. Kolejność widoczna na tej stronie odpowiada kolejności, którą zobaczą członkowie w aplikacji.

:::info
Niektóre karty mogą pojawiać się automatycznie, gdy spełnione są określone warunki -- na przykład karta Live Stream może pojawić się, gdy transmisja jest aktywna. Ręcznie dodane karty dają Ci pełną kontrolę nad tym, co członkowie widzą przez cały czas.
:::

:::tip
Zadbaj, aby liczba kart była rozsądna. Dla większości kościołów dobrze sprawdza się od trzech do pięciu kart. Zbyt wiele kart może utrudnić członkom poruszanie się po aplikacji.
:::

## Ustawienia katalogu członków i wiadomości

Pozycja **Member portal** w tej samej sekcji Mobile zawiera ustawienia regulujące katalog członków i prywatne wiadomości w doświadczeniu B1.church:

- **Directory Approval Group** -- Grupa, która przegląda aktualizacje katalogu członków oraz [prośby o usunięcie konta](../profile/account-deletion.md), zanim wejdą w życie.
- **Show in Directory** -- Kto może otworzyć katalog członków i kto jest w nim wymieniony: **Admins Only**, **Members and Above** (domyślnie), **Regular Attendees and Above** lub **Visitors and Above**. Osoby, których status członkostwa jest niższy niż wybrany poziom, nie widzą katalogu i nie są w nim wymienione. Opcja **Admins Only** zamyka katalog dla wszystkich z wyjątkiem personelu z uprawnieniem People &gt; View (sam status członkostwa Staff nie wystarcza). Ta grupa może zawsze otworzyć katalog i zobaczyć wszystkich, niezależnie od tego ustawienia. Goście nigdy nie są uwzględniani, ponieważ każdy, kto zarejestruje się online samodzielnie, zaczyna jako gość.
- **Visibility Preference** -- Ustawia domyślną wartość dla całego kościoła, dla członków, którzy nie wybrali jeszcze własnego ustawienia. Pola **Address**, **Phone Number** i **Email** mają każde własną listę rozwijaną z tymi samymi pięcioma poziomami, dostępnymi wszędzie tam, gdzie konfiguruje się widoczność:
  - **Everyone** -- widoczne dla każdego, także dla anonimowych odwiedzających
  - **Members** -- widoczne tylko dla osób z rekordem Member lub Staff
  - **Groups Only** -- widoczne tylko dla osób, które należą z tą osobą do tej samej grupy, oraz dla personelu
  - **My Group Leaders and Staff** -- widoczne tylko dla liderów grupy, do której należy ta osoba, oraz dla personelu
  - **Staff Only** -- widoczne tylko dla personelu (każdy, kto ma status członkostwa Staff lub uprawnienie People &gt; View) oraz dla samej osoby

  „Personel” w tych poziomach oznacza każdego, kto ma status członkostwa Staff lub uprawnienie People &gt; View. Zmiany dotyczące grup działają od razu: ktoś, kto dołączy do grupy lub zostanie liderem grupy, widzi odpowiednie szczegóły członków tej grupy oznaczone jako **Groups Only** lub **My Group Leaders and Staff**, bez wylogowywania się i ponownego logowania.

  Członkowie mogą nadpisać te wartości domyślne dla własnego rekordu na karcie **Privacy** swojego profilu w PWA B1.church -- zobacz [Edycja profilu](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Zabezpieczenie dzieci. B1 nie otworzy **nowej** rozmowy prywatnej, jeśli którakolwiek z osób nie osiągnęła tego wieku, na podstawie daty urodzenia (jeśli brak daty urodzenia, używana jest rola w gospodarstwie domowym). Osoby poniżej tego wieku pozostają w pełni widoczne w katalogu -- zablokowana jest wyłącznie wiadomość bezpośrednia, **w obu kierunkach**, dla wszystkich, także dla personelu. Rozmowy grupowe i kontaktowanie się z rodzicami dziecka nadal działają. Dostępne opcje to Off, 13, 16 lub 18; domyślnie jest **18**. Istniejące rozmowy nie są objęte tym ustawieniem.

:::tip
Ponieważ sprawdzanie wieku opiera się na datach urodzenia, upewnij się, że w rekordach dzieci z Twojej społeczności wpisano daty urodzenia. To ustawienie należy do tej samej rodziny zabezpieczeń dzieci co [zabezpieczenia meldowania](../attendance/checkin-safety.md).
:::

### Komunikat logowania na ekranie głównym

Odwiedzający, którzy otwierają [ekran główny](/docs/b1-church/getting-started/navigating#home) aplikacji bez logowania, widzą krótki komunikat -- domyślnie *„Zaloguj się, aby zobaczyć swoje grupy, dary i nie tylko.”* -- obok przycisku **Sign In**. Ustawienia **Home screen sign-in prompt** na tej samej stronie Member portal (`/mobile/b1-mobile`) pozwalają go zmienić:

- **Show sign-in prompt on the app home screen** -- Wyłącz tę opcję, aby ukryć zarówno komunikat, jak i przycisk **Sign In** na ekranie głównym. Odwiedzający nadal mogą się zalogować z menu aplikacji.
- **Sign-in prompt text** -- Zastąp domyślne sformułowanie własnym komunikatem (do 150 znaków). Pozostaw pole puste, aby użyć wartości domyślnej. To pole jest nieaktywne, gdy komunikat jest wyłączony.

Kliknij **Save**, aby zastosować zmiany. Komunikat **Saved** potwierdzi zapisanie. Zapisanie odświeża zapisane w pamięci podręcznej ustawienia aplikacji, więc zmiana pojawi się przy następnym załadowaniu ekranu głównego.

### Kafelki ekranu głównego

Karty posiadające zdjęcie (zobacz **Image** w sekcji [Dodawanie nowej karty](#adding-a-new-tab)) pojawiają się na [ekranie głównym](/docs/b1-church/getting-started/navigating#home) aplikacji jako kafelki ze zdjęciami, w sekcji z nagłówkiem zawierającym nazwę Twojego kościoła. Dotyczy to także karty Verse of the Day, jeśli dodasz jej zdjęcie. Karty ze zdjęciami nadal pojawiają się również na pasku kart.

Ustawienie **Home screen tiles** na tej samej stronie Member portal (`/mobile/b1-mobile`) określa układ tych kafelków. Wybierz **Layout**:

- **Grid** -- Dwa kafelki w wierszu (domyślnie). Gdy liczba kafelków jest nieparzysta, pierwszy kafelek zajmuje pełną szerokość.
- **Scrolling row** -- Jeden wiersz kafelków, który członkowie przesuwają w bok.
- **Scrolling (automatic)** -- Ten sam poziomy wiersz, który dodatkowo przesuwa się samoczynnie, przechodząc do kolejnego kafelka mniej więcej co cztery sekundy i wracając na początek po dotarciu do końca. Przesuwanie zatrzymuje się, gdy członek dotknie wiersza, najedzie na niego kursorem lub przejdzie do niego klawiszem Tab, i wznawia się po kilku sekundach. Na urządzeniach z włączonym ograniczeniem animacji wiersz pozostaje nieruchomy i działa jak **Scrolling row**.
- **List** -- Lista z niewielką miniaturą zdjęcia obok nazwy każdej karty.

Kliknij **Save**, aby zastosować zmiany.

### Sekcje ekranu głównego

Zalogowani członkowie zawsze widzą swoją historię obecności i przesłane formularze na [stronie Me](/docs/b1-church/getting-started/me-page). Przełączniki **Home screen sections** na tej samej stronie Member portal (`/mobile/b1-mobile`) mogą pokazywać je również na ekranie głównym:

- **Show My Attendance on Home** -- Dodaje sekcję **My Attendance** z liczbą obecności członka w ciągu ostatnich 90 dni, jego dwiema ostatnimi wizytami oraz linkiem **History** do pełnej listy obecności.
- **Show My Forms on Home** -- Dodaje sekcję **My Forms** z dwoma ostatnimi przesłanymi formularzami członka oraz linkiem **All forms**.

Obie opcje są domyślnie wyłączone. Sekcja pojawia się tylko u zalogowanych członków, którzy mają co najmniej jeden rekord do wyświetlenia. Kliknij **Save**, aby zastosować zmiany.

## Gdzie wyświetlane są te karty

Karty, które tutaj konfigurujesz, są wyświetlane w **PWA B1.church**, którą członkowie instalują z dowolnej strony pod adresem `https://yourchurchname.b1.church`. Zmiany wprowadzone na tej stronie są widoczne przy następnym otwarciu aplikacji przez członka.

Na telefonie dolny pasek kart pokazuje **Home**, do trzech Twoich kart oraz **More**. Na komputerze nagłówek pokazuje do pięciu kart. Wbudowane ekrany (takie jak Sermons, Giving czy Groups) otrzymują miejsca w pierwszej kolejności, a karty **Internal Page** wypełniają wolne miejsca. Karty **External URL** i **Verse of the Day** nigdy nie otrzymują miejsca na pasku. Każda karta, także ta, której zabrakło miejsca, jest wymieniona na stronie **More** w aplikacji. Informacje o tym, co widzą członkowie, znajdziesz w [Nawigacja po B1App](/docs/b1-church/getting-started/navigating). (Karty są także renderowane przez starszą [natywną aplikację B1 Mobile](/docs/b1-mobile/) dla członków, którzy nadal z niej korzystają, ale ta aplikacja jest wycofywana i nie jest już aktualizowana.)

## Następne kroki

- [Ustawienia kościoła](./church-settings.md) -- Konfiguracja informacji o kościele i brandingu
- [Role i uprawnienia](./roles-permissions.md) -- Zarządzanie dostępem dla zespołu
