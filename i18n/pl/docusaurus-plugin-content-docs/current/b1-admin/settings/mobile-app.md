---
title: "Ustawienia aplikacji mobilnej"
description: "Konfiguruj karty nawigacji, kafelki ekranu głównego, komunikat logowania oraz ustawienia prywatności katalogu członków w aplikacji B1.church dla członków, w B1 Admin."
---

# Ustawienia aplikacji mobilnej

<div class="article-intro">

Strona Ustawienia aplikacji mobilnej pozwala skonfigurować karty nawigacji, które pojawiają się w **doświadczeniu mobilnym B1.church (PWA)** dla członków Twojego kościoła. Decydujesz, które karty są widoczne, dokąd prowadzą i jak są wyświetlane.

</div>

## Film szkoleniowy

<YouTube id="ydY7WGK16fE" title="Dostosowywanie aplikacji dla członków kościoła w B1" />

:::info
Karty skonfigurowane tutaj pojawiają się w aplikacji B1 App, którą członkowie mogą [zainstalować jako Progresywną Aplikację Webową (PWA)](../../b1-church/getting-started/installing-pwa.md). Udostępnij członkom stronę instalacji swojego kościoła — `https://yourchurchname.b1.church/mobile/install`. Przeprowadzi ich ona przez instalację aplikacji na urządzeniu, bez potrzeby pobierania z App Store ani Google Play.
:::

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia „Edycja ustawień kościoła”. Jeśli nie masz dostępu, zobacz [Role i uprawnienia](./roles-permissions.md).
- Najpierw skonfiguruj [Ustawienia kościoła](./church-settings.md), w tym nazwę kościoła i branding

</div>

## Dostęp do ustawień nawigacji

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń **Mobile**.
2. Kliknij **Navigation** (`/mobile/navigation`).
3. Strona Navigation wyświetla bieżące karty aplikacji.

## Dodawanie nowej karty

1. Kliknij przycisk **Add Tab** u góry strony.
2. Uzupełnij dane karty:
   - **Name** — etykieta wyświetlana na karcie (na przykład „Kazania” lub „Ofiary”).
   - **Icon** — kliknij selektor ikon, aby wybrać ikonę dla karty.
   - **Image** — kliknij **Select Image** (lub **Change Image**), aby dodać zdjęcie do karty. Karty ze zdjęciem pojawiają się na ekranie głównym aplikacji jako kafelki ze zdjęciami — zobacz [Kafelki ekranu głównego](#home-screen-tiles).
   - **Tab Type** — wybierz spośród opcji, takich jak Bible, Live Stream, Donation, Website i inne.
   - **URL** — wpisz adres internetowy, do którego ma prowadzić karta.
   - **Visibility** — określ, kto może zobaczyć tę kartę (wszyscy, tylko członkowie itd.). Dla karty **Member Directory** ustawienie to określa jedynie, kto widzi samą kartę; kto może otworzyć katalog, ustawiane jest opcją **Show in Directory** na stronie Member portal (zobacz [Ustawienia katalogu członków i wiadomości](#member-directory--messaging-settings)).
3. Kliknij **Save Tab**, aby dodać ją do aplikacji.

## Edycja istniejącej karty

1. Kliknij dowolną istniejącą kartę na liście **App Tabs**.
2. Zaktualizuj nazwę, ikonę, URL, typ lub ustawienia widoczności karty.
3. Kliknij **Save Tab**, aby zastosować zmiany.

## Zmiana kolejności kart

Możesz zmienić kolejność, w jakiej karty pojawiają się w aplikacji mobilnej. Przeciągnij i upuść karty na liście, aby je przestawić. Kolejność widoczna na tej stronie odpowiada kolejności, jaką zobaczą członkowie w aplikacji.

:::info
Niektóre karty mogą pojawiać się automatycznie, gdy spełnione są określone warunki — na przykład karta Live Stream może pojawić się, gdy transmisja jest aktywna. Ręcznie dodane karty dają Ci pełną kontrolę nad tym, co członkowie widzą przez cały czas.
:::

:::tip
Ogranicz liczbę kart. Dla większości kościołów dobrze sprawdzają się od trzech do pięciu kart. Zbyt wiele kart może utrudnić członkom nawigację.
:::

## Ustawienia katalogu członków i wiadomości

Pozycja **Member portal** w tej samej sekcji Mobile zawiera ustawienia regulujące katalog członków i prywatne wiadomości w doświadczeniu B1.church:

- **Directory Approval Group** — grupa, która sprawdza aktualizacje katalogu członków oraz [prośby o usunięcie konta](../profile/account-deletion.md), zanim wejdą w życie.
- **Show in Directory** — kto może otworzyć katalog członków i kto jest w nim wymieniony: **Admins Only**, **Members and Above** (domyślnie), **Regular Attendees and Above** albo **Visitors and Above**. Osoby o statusie członkostwa niższym niż wybrany poziom nie widzą katalogu i nie są w nim wymienione. **Admins Only** zamyka katalog dla wszystkich poza personelem z uprawnieniem People > View (sam status Staff nie wystarcza); ci pracownicy mogą zawsze otworzyć katalog i zobaczyć wszystkich, niezależnie od tego ustawienia. Goście nigdy nie są uwzględniani, ponieważ każda osoba zarejestrowana samodzielnie online zaczyna jako gość.
- **Visibility Preference** — ustawia domyślną wartość dla całego kościoła, dla członków, którzy nie wybrali jeszcze własnego ustawienia. **Address**, **Phone Number** i **Email** mają każde własną listę rozwijaną z tymi samymi pięcioma poziomami, dostępnymi wszędzie, gdzie konfiguruje się widoczność:
  - **Everyone** — widoczne dla każdego, także anonimowych odwiedzających
  - **Members** — widoczne tylko dla osób z rekordem Member lub Staff
  - **Groups Only** — widoczne tylko dla osób, które należą do wspólnej grupy z tą osobą, oraz dla personelu
  - **My Group Leaders and Staff** — widoczne tylko dla liderów grupy, do której należy ta osoba, oraz dla personelu
  - **Staff Only** — widoczne tylko dla personelu (każdy, kto ma status członkostwa Staff lub uprawnienie People > View) oraz dla samej osoby

  „Personel” na tych poziomach oznacza każdego, kto ma status członkostwa Staff lub uprawnienie People > View. Zmiany grup działają od razu: ktoś, kto dołączy do grupy lub zostanie liderem grupy, widzi odpowiednie szczegóły **Groups Only** lub **My Group Leaders and Staff** członków tej grupy, bez konieczności wylogowania się i ponownego logowania.

  Członkowie mogą zastąpić te domyślne ustawienia dla własnego rekordu na karcie **Privacy** swojego profilu w PWA B1.church — zobacz [Edycja profilu](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** — zabezpieczenie dzieci. B1 nie otworzy **nowej** prywatnej rozmowy, jeśli którakolwiek z osób jest poniżej tego wieku, na podstawie daty urodzenia (gdy data urodzenia nie jest zapisana, używana jest rola w gospodarstwie domowym). Osoby poniżej tego wieku pozostają w pełni widoczne w katalogu — blokowane jest wyłącznie bezpośrednie przesyłanie wiadomości, **w obu kierunkach**, dla wszystkich, także dla personelu. Rozmowy grupowe i wiadomości do rodziców dziecka nadal działają. Dostępne opcje to Off, 13, 16 lub 18; domyślnie jest **18**. Istniejące rozmowy nie są zmieniane.

:::tip
Ponieważ sprawdzanie wieku opiera się na datach urodzenia, upewnij się, że daty urodzenia dzieci w Twojej społeczności są uzupełnione. To ustawienie należy do tej samej rodziny zabezpieczeń dla dzieci co [zabezpieczenia zameldowania](../attendance/checkin-safety.md).
:::

### Komunikat logowania na ekranie głównym

Odwiedzający, którzy otwierają [ekran główny](/docs/b1-church/getting-started/navigating#home) aplikacji bez zalogowania, widzą krótki komunikat — domyślnie *„Zaloguj się, aby zobaczyć swoje grupy, ofiary i więcej.”* — obok przycisku **Sign In**. Ustawienia **Home screen sign-in prompt** na tej samej stronie Member portal (`/mobile/b1-mobile`) pozwalają go zmienić:

- **Show sign-in prompt on the app home screen** — wyłącz, aby ukryć zarówno komunikat, jak i przycisk **Sign In** na ekranie głównym. Odwiedzający nadal mogą się zalogować z menu aplikacji.
- **Sign-in prompt text** — zastąp domyślne sformułowanie własnym tekstem (do 150 znaków). Pozostaw puste, aby użyć domyślnego. To pole jest nieaktywne, gdy komunikat jest wyłączony.

Kliknij **Save**, aby zastosować zmiany. Komunikat **Saved** potwierdzi zapis. Zapisanie odświeża zapamiętane w pamięci podręcznej ustawienia aplikacji, dzięki czemu zmiana będzie widoczna przy następnym załadowaniu ekranu głównego.

### Kafelki ekranu głównego

Karty, które mają zdjęcie (zobacz **Image** w sekcji [Dodawanie nowej karty](#adding-a-new-tab)), pojawiają się na [ekranie głównym](/docs/b1-church/getting-started/navigating#home) aplikacji jako kafelki ze zdjęciami, w sekcji z nazwą Twojego kościoła. Dotyczy to także karty Verse of the Day, jeśli dodasz jej zdjęcie. Karty ze zdjęciem nadal pojawiają się również na pasku kart.

Ustawienie **Home screen tiles** na tej samej stronie Member portal (`/mobile/b1-mobile`) określa układ tych kafelków. Wybierz **Layout**:

- **Grid** — dwa kafelki w wierszu (domyślnie). Gdy liczba kafelków jest nieparzysta, pierwszy kafelek zajmuje pełną szerokość.
- **Scrolling row** — jeden wiersz kafelków, który członkowie przesuwają w bok.
- **Scrolling (automatic)** — ten sam poziomy wiersz, ale przesuwa się sam, o jeden kafelek mniej więcej co cztery sekundy, a po ostatnim kafelku wraca do pierwszego. Zatrzymuje się, gdy członek dotknie wiersza, najedzie na niego kursorem lub przejdzie do niego klawiaturą, i wznawia po kilku sekundach. Na urządzeniach z włączonym ograniczeniem ruchu wiersz stoi w miejscu i działa jak **Scrolling row**.
- **List** — lista z małą miniaturą zdjęcia obok nazwy każdej karty.

W obu układach przewijanych, gdy kafelków jest więcej, niż mieści się na ekranie, pod kafelkami pojawia się rząd kropek — po jednej na kafelek, a kropka bieżącego kafelka jest wypełniona. Członkowie mogą dotknąć kropki, aby przejść do danego kafelka.

Kliknij **Save**, aby zastosować zmiany.

### Sekcje ekranu głównego

Zalogowani członkowie zawsze widzą swoją historię obecności i wysłane formularze na [stronie Me](/docs/b1-church/getting-started/me-page). Przełączniki **Home screen sections** na tej samej stronie Member portal (`/mobile/b1-mobile`) mogą pokazać je także na ekranie głównym:

- **Show My Attendance on Home** — dodaje sekcję **My Attendance** z liczbą obecności członka w ciągu ostatnich 90 dni, jego dwiema ostatnimi wizytami oraz linkiem **History** do pełnej listy obecności.
- **Show My Forms on Home** — dodaje sekcję **My Forms** z dwoma ostatnimi zgłoszeniami formularzy członka i linkiem **All forms**.

Obie opcje są domyślnie wyłączone. Sekcja pojawia się tylko u zalogowanych członków, którzy mają co najmniej jeden rekord do wyświetlenia. Kliknij **Save**, aby zastosować zmiany.

## Gdzie pojawiają się te karty

Karty skonfigurowane tutaj są wyświetlane w **PWA B1.church**, którą członkowie instalują z dowolnej strony pod adresem `https://yourchurchname.b1.church`. Zmiany wprowadzone na tej stronie są widoczne przy następnym otwarciu aplikacji przez członka.

Na telefonie dolny pasek kart pokazuje **Home**, do trzech Twoich kart oraz **More**; na komputerze nagłówek pokazuje do pięciu kart. Wbudowane ekrany (takie jak Sermons, Giving czy Groups) otrzymują miejsca w pierwszej kolejności, a karty **Internal Page** wypełniają wolne miejsca. Karty **External URL** i **Verse of the Day** nigdy nie zajmują miejsca na pasku. Każda karta, także ta, która się nie mieści, jest wymieniona na stronie **More** w aplikacji.

Wyjątkiem są karty umieszczone wewnątrz karty **Folder** — pojawiają się one wyłącznie na ekranie folderu, który członkowie otwierają, dotykając folder. Ekran ten pokazuje karty jako kafelki ze zdjęciami, gdy każda z nich ma obraz, a w przeciwnym razie jako listę. Folder, który nie zawiera kart widocznych dla danego członka, jest przed nim ukryty. Zobacz [Karty folderów](../../b1-church/getting-started/navigating.md#folder-tabs). Informacje o tym, co widzą członkowie, znajdziesz w [Nawigacja w B1App](../../b1-church/getting-started/navigating.md).

## Następne kroki

- [Ustawienia kościoła](./church-settings.md) — konfiguracja informacji o kościele i brandingu
- [Role i uprawnienia](./roles-permissions.md) — zarządzanie dostępem dla zespołu
