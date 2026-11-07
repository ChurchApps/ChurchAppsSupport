---
title: "Przepływy pracy"
description: "Twórz tablice w stylu Kanban w B1 Admin, by prowadzić osoby przez kolejne kroki za pomocą automatycznych e-maili, SMS-ów i wyzwalaczy dodających osoby."
---

# Przepływy pracy

<div class="article-intro">

Przepływy pracy prowadzą osoby przez kolejne etapy na wizualnej tablicy. Każda osoba staje się kartą, która przechodzi od jednego etapu do następnego: od kontaktu z nowym gościem, przez proces członkostwa, po podziękowanie dla osoby, która po raz pierwszy złożyła ofiarę, i wszystko inne, gdzie trzeba śledzić wiele osób przez te same etapy. Etap może poprosić wolontariusza o wykonanie czynności (zadzwonić, porozmawiać) **oraz** samodzielnie uruchomić zautomatyzowane działania, takie jak wysłanie e-maila lub SMS-a, odczekanie kilku dni czy dodanie osoby do grupy. Dzięki temu przepływy pracy obsługują zarówno ręczny kontakt, jak i rutynowe zadania wokół niego. Przepływy pracy rozszerzają [Zadania](./tasks.md) o tablicę Kanban z przeciąganiem, tak aby nikt i nic nie umknęło uwadze.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Upewnij się, że osoby, które chcesz śledzić, istnieją w B1 Admin
- Zapoznaj się z tym, jak działają [Zadania](./tasks.md), ponieważ każda karta na tablicy jest zadaniem
- Aby użyć działania **Wyślij e-mail**, najpierw utwórz szablony e-maili, które chcesz wysyłać (zarządza się nimi w **Ustawienia → Szablony e-maili**)
- Aby użyć działania **Wyślij SMS**, najpierw połącz [dostawcę wiadomości tekstowych](../settings/church-settings.md#texting)
- Potrzebne będą odpowiednie uprawnienia do Zadań. Wyświetlanie, edycja kart i zarządzanie przepływami pracy to osobne poziomy uprawnień (zobacz [Role i uprawnienia](../settings/roles-permissions.md))

</div>

## Przeglądanie przepływów pracy

Otwórz [menu skoków](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu B1 Admin), rozwiń **Służba** i kliknij **Przepływy pracy**. Twoje przepływy pracy są wyświetlone w tabeli, która pokazuje ich **Kategorię** i **Status** (**Aktywny** lub **Nieaktywny**). Jeśli używasz kategorii, karty nad listą pozwalają filtrować ją według kategorii. Kliknij dowolny przepływ pracy, aby otworzyć jego tablicę.

## Tworzenie przepływu pracy

1. Na stronie Przepływy pracy kliknij **Dodaj przepływ pracy**.
2. Wybierz sposób rozpoczęcia:
   - **Pusty przepływ pracy** -- zacznij od zera i zbuduj własne etapy.
   - **Z szablonu** -- zacznij od gotowego zestawu etapów, które możesz edytować. Wbudowane szablony to:
     - **Obsługa nowego odwiedzającego** -- Wyślij e-mail powitalny → Telefon osobisty → Zaproś na kolejny etap → Połączony
     - **Zajęcia dla kandydatów na członków** -- Wyraź zainteresowanie → Zapisz się na zajęcia → Uczestnicz w zajęciach → Zakończ członkostwo
     - **Podziękowanie dla osoby, która po raz pierwszy złożyła ofiarę** -- Wyślij list z podziękowaniem → Podziel się wpływem ofiary → Zarządzany
     - **Potwierdzenie przydziału do służby** -- Wyślij prośbę i czekaj na odpowiedź → Zadzwoń do wolontariusza w sprawie bez odpowiedzi (zobacz [Potwierdzenia przydziałów do służby](#serving-assignment-confirmations))

   Utworzenie etapów szablonu może chwilę potrwać. Podczas tego przycisk **Dodaj przepływ pracy** pokazuje **Tworzenie...** i nie można go kliknąć ponownie, więc nie powstanie duplikat. Jeśli coś pójdzie nie tak, strona wyświetli komunikat *„Nie udało się utworzyć przepływu pracy. Spróbuj ponownie."*
3. Nadaj przepływowi pracy **Nazwę**.
4. Opcjonalnie przypisz **Kategorię**, aby pogrupować powiązane przepływy pracy. Nową kategorię możesz utworzyć bezpośrednio z listy rozwijanej.
   W przypadku pustego przepływu pracy wybierasz również jego **Cel przepływu pracy**: **Kontakt z osobami** (typowy przypadek) lub **Potwierdzenie przydziału do służby**. Celu nie można zmienić po utworzeniu przepływu pracy.
5. Pozostaw przepływ pracy **Aktywny**, aby można było dodawać do niego osoby, lub ustaw **Nieaktywny**, aby ukryć go na listach dodawania do przepływu pracy.
6. Kliknij **Zapisz**.

:::tip
Użyj przycisku **Duplikuj** na liście Przepływów pracy, aby skopiować istniejący przepływ pracy -- wraz z etapami, zautomatyzowanymi działaniami i trasowaniem -- jako punkt wyjścia dla nowego.
:::

## Budowanie tablicy z etapami

Każda tablica przepływu pracy składa się z **etapów**, pokazanych jako kolumny od lewej do prawej. Otwórz przepływ pracy i użyj **Dodaj etap**, aby utworzyć każdy etap swojego procesu.

Podczas dodawania lub edycji etapu możesz skonfigurować:

- **Nazwa etapu** -- nagłówek kolumny (na przykład „Telefon powitalny" lub „Oczekiwanie na rejestrację").
- **Termin (w dniach)** -- automatycznie ustawia termin wykonania, gdy karta trafia na ten etap. Karty po terminie są oznaczone jako **Zaległe**.
- **Domyślny wykonawca** -- osoba lub grupa, do której nowe karty na tym etapie są automatycznie przypisywane. Gdy domyślnym wykonawcą jest osoba, otrzymuje powiadomienie, że karta została jej przypisana.
- **Zautomatyzowane działania** -- czynności, które system wykonuje samodzielnie, gdy karta trafia na etap (zobacz poniżej).
- **Trasowanie** -- dokąd karta trafia po opuszczeniu etapu (zobacz [Trasowanie](#routing-cards-with-outcomes-and-conditions)).

Przeciągnij kolumny etapów w kolejności odpowiadającej Twojemu procesowi. Kolejność określa także domyślną ścieżkę, którą przechodzi karta, gdy żadne inne trasowanie nie ma zastosowania.

:::info
Najpierw zapisz nowy etap. Zautomatyzowane działania i trasowanie są przypisane do etapu, więc edytor odblokowuje te sekcje dopiero po jego istnieniu.
:::

## Zautomatyzowane działania

Każdy etap może zawierać listę **zautomatyzowanych działań**, które uruchamiają się same w chwili, gdy karta **wchodzi** na etap -- zanim ktokolwiek się nią zajmie. Dzięki temu etap zarówno zachęca wolontariusza do działania, jak i przejmuje rutynowe zadania związane z kontaktem.

W edytorze etapu otwórz **Zautomatyzowane działania**, kliknij **Dodaj działanie**, wybierz typ i wypełnij jego ustawienia. Dodaj tyle działań, ile potrzebujesz; wykonywane są **od góry do dołu, po kolei**. Kliknij **Zapisz** przy etapie, aby zapisać etap i wszystkie jego działania razem. Usunięcie działania ikoną kosza jest skuteczne od razu.

| Działanie | Co robi |
|---|---|
| **Wyślij e-mail** | Wysyła osobie wybrany szablon e-maila. Możesz zmienić temat wiadomości. |
| **Wyślij SMS** | Wysyła osobie wiadomość, którą napiszesz, za pośrednictwem [dostawcy wiadomości tekstowych](../settings/church-settings.md#texting) Twojego kościoła. |
| **Czekaj** | Wstrzymuje kartę na określoną liczbę dni przed kontynuacją (zobacz poniżej). |
| **Dodaj do grupy** | Dodaje osobę do wybranej [grupy](../groups/index.md). |
| **Usuń z grupy** | Usuwa osobę z wybranej grupy. |
| **Zapisz obecność** | Oznacza osobę jako obecną na trwającym nabożeństwie grupy (zobacz poniżej). |
| **Dodaj do przepływu pracy** | Rozpoczyna dla osoby inny przepływ pracy -- przydatne do przekazywania między procesami. |
| **Dodaj notatkę** | Zapisuje notatkę w historii karty. |
| **Ustaw pole** | Aktualizuje pole w danych osoby: Status członkostwa, Stan cywilny, Płeć, Miasto, Województwo lub Kod pocztowy. |
| **Webhook** | Wysyła szczegóły karty na zewnętrzny adres internetowy (URL), który podasz, w celu połączenia z innymi systemami. |
| **Utwórz zadanie** | Tworzy [zadanie](./tasks.md) z tytułem i opisem, które wpiszesz, przypisane do wybranej osoby. |
| **Powiadom osobę** | Wysyła wybranemu członkowi personelu lub wolontariuszowi e-mail i powiadomienie B1 o karcie (zobacz poniżej). |

Po zakończeniu wszystkich działań etapu karta **pozostaje na tym etapie**, aby osoba mogła nad nią pracować -- chyba że etap ma automatyczne trasowanie, które przenosi ją dalej (zobacz [Etapy w pełni zautomatyzowane](#fully-automated-steps)).

:::info
Zautomatyzowane działania uruchamiają się tylko wtedy, gdy karta trafia na etap w zwykły sposób -- gdy jest po raz pierwszy dodana, gdy wynik lub automatyczne trasowanie ją tam przenosi albo gdy zakończy się Czekanie. **Nie** uruchamiają się ponownie, gdy członek personelu ręcznie przeciągnie kartę na etap lub odeśle ją z powrotem, dzięki czemu osoba nie dostanie tego samego e-maila dwa razy.
:::

### Wysyłanie e-maila

Wybierz **Wyślij e-mail**, wybierz jeden z szablonów e-maili i opcjonalnie wpisz własny temat. Gdy karta wejdzie na etap, osoba automatycznie otrzyma ten e-mail. (Jeśli osoba nie ma zapisanego adresu e-mail, etap po prostu pomija to działanie). [Pola scalania](../settings/email-templates.md#merge-fields) w szablonie, takie jak `{{firstName}}`, są uzupełniane danymi danej osoby.

Gdy e-mail zostanie wysłany, w historii karty pojawia się wpis **E-mail wysłany**. Jeśli nie można go wysłać -- na przykład dlatego, że e-mail Twojego kościoła nie został jeszcze zatwierdzony lub osiągnięto dzienny limit -- żaden wpis „E-mail wysłany" nie zostaje dodany.

:::info
E-maile z przepływów pracy są wysyłane dopiero po zatwierdzeniu Twojego kościoła do wysyłania e-maili grupowych, i wliczają się do dziennego limitu e-maili kościoła. Zobacz [Włączanie e-maili grupowych dla kościoła](../groups/group-members.md#turning-on-group-email-for-your-church). Działanie **Wyślij e-mail** ostrzega w edytorze etapu, gdy te e-maile nie zostaną wysłane: *„E-mail Twojego kościoła nie został jeszcze zatwierdzony..."*, jeśli zatwierdzenie jest w toku, lub *„E-mail Twojego kościoła jest wstrzymany..."*, jeśli ostatnie wiadomości zostały odrzucone lub zgłoszone jako spam.
:::

### Zapisywanie obecności

Wybierz **Zapisz obecność** i kliknij **Wybierz grupę**, aby wskazać grupę, dla której ma zostać zapisana obecność. Gdy działanie się uruchomi, osoba zostaje oznaczona jako obecna na trwającym nabożeństwie tej grupy -- tak samo, jakby się zameldowała. Jest to przydatne w połączeniu z wyzwalaczem, który dodaje osoby do przepływu pracy w miarę ich przybycia, dzięki czemu są liczone bez osobnego meldowania.

- Obecność jest mierzona w chwili **utworzenia** karty, więc **Czekaj** wcześniej w przepływie pracy nie przesunie jej poza nabożeństwo.
- Liczą się tylko terminy nabożeństw z dniem i godziną rozpoczęcia. Jeśli w tym momencie żaden termin nabożeństwa grupy nie trwa, nic nie zostaje zapisane, a w historii karty pojawia się notatka **Brak zaplanowanego nabożeństwa w toku -- obecność nie została zapisana**.
- Gdy obecność zostanie zapisana, w historii karty pojawia się wpis **Zapisano obecność**, a po nim nazwa grupy. Ponowne uruchomienie działania dla tego samego nabożeństwa nie liczy osoby drugi raz.

### Powiadamianie osoby

Wybierz **Powiadom osobę**, kliknij **Wybierz osobę** i opcjonalnie wpisz **Wiadomość**. Gdy karta wejdzie na etap, ta osoba otrzyma e-mail i powiadomienie B1 zawierające imię i nazwisko osoby z karty, nazwy przepływu pracy i etapu, Twoją wiadomość oraz link do otwarcia karty. Użyj tego, aby dać członkowi personelu lub liderowi służby znać o sprawie -- na przykład: *„Powiadom pastora, gdy ktoś trafi na etap Rozmowa o członkostwie."* W historii karty zapisuje się wpis **Powiadomiono**, a po nim imię i nazwisko osoby.

### Wysyłanie SMS-a

Wybierz **Wyślij SMS** i wpisz **Treść SMS-a** (do 1600 znaków). Gdy karta wejdzie na etap, osoba otrzyma ten SMS na telefon komórkowy. Aby spersonalizować wiadomość, kliknij jeden z przycisków pod polem wiadomości -- **Imię**, **Nazwisko**, **Wyświetlana nazwa** lub **Nazwa kościoła** -- aby wstawić w miejscu kursora `{{firstName}}`, `{{lastName}}`, `{{displayName}}` lub `{{churchName}}`. Każde z tych pól zostaje uzupełnione danymi osoby w chwili wysłania SMS-a.

- Jeśli osoba nie ma zapisanego numeru telefonu komórkowego, SMS nie zostaje wysłany, a w historii karty pojawia się wpis **Pominięto SMS: brak telefonu komórkowego**.
- Jeśli osoba zrezygnowała z wiadomości, SMS nie zostaje wysłany, a w historii karty pojawia się wpis **Pominięto SMS: zrezygnowano**.
- Gdy SMS zostanie wysłany, w historii karty pojawia się wpis **Wysłano SMS**. Jeśli wysyłka się nie powiedzie -- na przykład dlatego, że nie połączono dostawcy wiadomości tekstowych lub Twojemu kościołowi skończyły się środki na SMS-y -- błąd zostaje zapisany w historii karty, a pozostałe działania etapu nadal się wykonują.

:::warning
SMS-y są wysyłane przez własnego [dostawcę wiadomości tekstowych](../settings/church-settings.md#texting) Twojego kościoła. Jeśli żaden dostawca nie jest połączony, edytor działań ostrzega *„Nie skonfigurowano dostawcy wiadomości tekstowych"* i SMS-y nie zostaną wysłane.
:::

### Czekanie kilka dni (sekwencje rozłożone w czasie)

Działanie **Czekaj** wstrzymuje kartę na liczbę dni, którą ustawisz. Podczas czekania karta jest oznaczona jako **Uśpiona**. B1 sprawdza zakończone oczekiwania co 30 minut, więc karta wznawia pracę w ciągu około pół godziny od zakończenia czekania. Gdy czekanie się skończy:

1. Wykonują się wszystkie **pozostałe działania na tym samym etapie** -- dzięki temu możesz zbudować sekwencję rozłożoną w czasie, np. **Wyślij e-mail → Czekaj 3 dni → Wyślij e-mail z przypomnieniem**.
2. Następnie, jeśli etap ma automatyczne trasowanie, karta przechodzi dalej; w przeciwnym razie pozostaje na etapie, aby osoba mogła się nią zająć.

:::tip
**Czekaj** na samym początku etapu to prosty sposób na „wstrzymanie" karty, zanim trafi do wolontariusza -- na przykład: *Czekaj 7 dni, a następnie trener się odezwie.*
:::

## Dodawanie osób jako kart

Osoby można umieścić na tablicy na kilka sposobów:

- **Z tablicy** -- kliknij **Dodaj kartę** na dole kolumny etapu i wybierz osobę. Możesz też wybrać grupę, a każdy jej członek zostanie dodany jako karta.
- **Z profilu osoby** -- użyj **Dodaj do przepływu pracy** na stronie osoby, aby umieścić ją w przepływie pracy.
- **Z wyszukiwania osób** -- zaznacz wiele osób i użyj zbiorczego działania **Dodaj do przepływu pracy**, aby dodać je wszystkie naraz.
- **Automatycznie za pomocą wyzwalacza** -- dodawaj osoby, gdy coś się wydarzy, np. po wysłaniu formularza lub pierwszej ofiarze (zobacz [Wyzwalacze](#triggers) poniżej).

Dodanie kogoś ręcznie lub za pomocą działania etapu **Dodaj do przepływu pracy** nigdy nie daje tej osobie drugiej otwartej karty w tym samym przepływie pracy. Jeśli osoba ma już otwartą kartę, zostaje pominięta (przy dodawaniu zbiorowym nowe karty dostają tylko osoby, które jeszcze ich nie mają). Gdy karta zostanie zamknięta, możesz dodać osobę ponownie. Wyzwalacze stosują zamiast tego własne ustawienie **Tylko raz na osobę**.

## Praca z tablicą

Otwórz przepływ pracy, aby zobaczyć jego tablicę. Każda karta pokazuje imię i nazwisko osoby, osobę, do której jest przypisana, oraz znacznik terminu lub statusu (**Zaległe** lub **Uśpiona**). Kolumna etapu pokazuje też małe odznaki dla zautomatyzowanych działań, które wykonuje, oraz adnotacje dotyczące jego trasowania, dając szybki przegląd tego, jak karty się przemieszczają.

- **Przesunięcie karty** -- przeciągnij kartę z jednej kolumny do następnej, gdy osoba przechodzi dalej.
- **Otwarcie karty** -- kliknij dwukrotnie kartę (lub kliknij ją pojedynczo), aby otworzyć jej panel szczegółów, gdzie możesz zmienić etap, przypisać ją ponownie, dodać notatki i przejrzeć, co już się wydarzyło.

Z panelu karty możesz:

- **Przypisać** kartę do innej osoby lub grupy.
- **Uśpić** kartę na 1 dzień, 3 dni lub 1 tydzień, aby tymczasowo ukryć jej termin.
- **Cofnąć** do poprzedniego etapu albo **Pominąć** i przejść do następnego.
- **Przypięcie przypisania** -- zachowaj tego samego właściciela karty, nawet gdy przechodzi między etapami. Domyślnie przeniesienie karty na nowy etap przypisuje ją domyślnemu wykonawcy tego etapu; przypięcie zachowuje odpowiedzialność obecnej osoby przez cały czas.
- **Zakończyć** kartę, albo wybrać przycisk **Wynik**, jeśli na etapie skonfigurowano wyniki (zobacz [Trasowanie](#routing-cards-with-outcomes-and-conditions)).
- **Usuń kartę** -- zdejmij kartę z tablicy bez jej zakończenia, np. gdy ktoś został dodany omyłkowo. Po potwierdzeniu karta zostaje zamknięta i usunięta z list wszystkich. Nie uruchamiają się żadne wyniki, trasy ani działania etapu, a jej historia zostaje zachowana z wpisem **Usunięto**. W przypadku karty [potwierdzenia przydziału do służby](#serving-assignment-confirmations) jej usunięcie zamyka prośbę w ten sam sposób.
- **Dodaj notatki** i przeglądaj **Aktywność** karty -- dziennik zautomatyzowanych działań, które się wykonały (wysłane e-maile, czekania itd.), z datą i godziną każdego z nich.

W przypadku karty dotyczącej osoby panel pokazuje też jej numer telefonu komórkowego i e-mail jako linki, w które można kliknąć, aby zadzwonić lub napisać, oraz link **Zobacz profil**, jeśli masz uprawnienia do przeglądania osób. Osoba, do której przypisano kartę, widzi telefon i e-mail nawet bez dostępu do Osób.

Notatki są zapisywane razem z kartą. Każdy, kto może otworzyć kartę -- w tym osoba lub grupa, do której jest przypisana -- może czytać notatki i dodawać własne. Osoby, które nie mogą otworzyć karty, nie widzą jej notatek.

### Działania zbiorcze

Zaznacz pola wyboru przy wielu kartach, aby wykonać na nich działania razem. Aby zaznaczyć wszystkie karty na etapie naraz, zaznacz pole **Zaznacz wszystkie** w nagłówku kolumny tego etapu; ponowne zaznaczenie je odznacza. Pojawia się pasek narzędzi, który pozwala **Zakończyć**, **Uśpić**, **Przypisać** (przypisać ponownie) lub **Przenieść do…** inny etap dla wszystkich zaznaczonych kart naraz.

## Trasowanie kart za pomocą wyników i warunków

Trasowanie określa, dokąd trafia karta po opuszczeniu etapu. Otwórz edytor etapu, aby skonfigurować dwa rodzaje trasowania.

### Przyciski wyników

Wyniki to przyciski wyświetlane w panelu karty, gdy kończysz kartę na danym etapie. Zamiast pojedynczego przycisku **Zakończ** możesz zaoferować wybory, takie jak „Dołączył do grupy" czy „Brak zainteresowania". Każdy wynik może:

- Przenieść kartę na **inny etap** w tym przepływie pracy,
- **Przekazać kartę** do zupełnie innego przepływu pracy, lub
- **Zamknąć** kartę.

Dzięki temu jedna decyzja może skierować osobę na różne ścieżki.

### Automatyczne trasowanie (warunkowe)

Automatyczne trasy przenoszą kartę dalej **w chwili wejścia na etap** (i po zakończeniu jego zautomatyzowanych działań), bez niczyjego kliknięcia, jeśli osoba spełnia zestaw warunków. Dodaj trasę, wybierz etap docelowy i zdefiniuj jeden lub więcej **warunków** (na przykład kampus, wiek lub status członkostwa osoby). Pola tekstowe można dopasować dokładnie lub za pomocą **zawiera**, **zaczyna się od** albo **kończy się na**. Trasa bez warunków pasuje do wszystkich.

Warunki dat (Dzisiejsza data, Data urodzenia lub Rocznica) mogą porównywać pełną datę lub tylko jej część -- dzień tygodnia, **Dzień miesiąca**, **Miesiąc** albo liczbę upływających lat. W przypadku Daty urodzenia lub Rocznicy osoby **Dzień miesiąca** oferuje względną opcję **Dzisiaj**, więc warunek w rodzaju *Data urodzenia · Dzień miesiąca = Dzisiaj* pasuje do osób, których urodziny przypadają dzisiaj. **Miesiąc** oferuje **Poprzedni miesiąc**, **Bieżący miesiąc** i **Następny miesiąc**. Takie względne wartości są wyliczane według strefy czasowej Twojego kościoła, więc zgadzają się z kalendarzowym dniem kościoła, a nie z czasem serwera.

Grupa warunków **Ofiary** zawiera **Dawniej regularny ofiarodawca**, która znajduje osoby, które kiedyś regularnie dawały, a potem przestały. Ustaw trzy liczby: *Dawał co najmniej* **3** *razy w ciągu ostatnich* **12** *tygodni, a potem nic w ciągu ostatnich* **3** *tygodni* (to wartości domyślne). Tygodnie są liczone wstecz od dzisiaj według strefy czasowej Twojego kościoła, a zwrócona ofiara się nie liczy. Jest najbardziej przydatna w [wyzwalaczu harmonogramu](#schedule-triggers) -- na przykład cotygodniowa reguła, która dodaje dawnych ofiarodawców do tablicy opieki duszpasterskiej. Warunek bierze pod uwagę wyłącznie daty ofiar, nigdy kwoty, a karty i alerty nigdy nie pokazują kwot. Ponieważ ujawnia, kto przestał dawać, tę opcję widzą i mogą ją dodawać, zmieniać lub usuwać tylko osoby, które mogą przeglądać ofiary.

Jeśli warunków trasy nie da się sprawdzić z jakiegoś powodu, trasa jest traktowana jako niepasująca. Karta pozostaje na etapie (albo podąża inną trasą, która pasuje), zamiast utknąć.

:::info
Na tablicy każda kolumna etapu pokazuje małe adnotacje opisujące jego trasowanie -- na przykład etykietę wyniku albo „jeśli pasuje" i strzałkę do etapu lub przepływu pracy docelowego.
:::

## Etapy w pełni zautomatyzowane

Możesz sprawić, by etap działał całkowicie samodzielnie, bez niczyjej pracy. Dodaj etapowi jego **zautomatyzowane działania** i dodaj **automatyczną trasę** (bez warunków) wskazującą na następny etap. Gdy karta wejdzie, działania się wykonają, a trasa natychmiast ją przesunie -- karta przejdzie przez etap bez zatrzymania.

:::tip
Połącz to z **Czekaj**: *Wyślij e-mail powitalny → Czekaj 3 dni → automatycznie przejdź do etapu „Telefon osobisty".* E-mail i czas są obsługiwane za Ciebie, a wolontariusz widzi kartę dopiero wtedy, gdy nadchodzi czas na osobisty kontakt.
:::

## Wyzwalacze

Wyzwalacze automatycznie dodają osoby do przepływu pracy, gdy coś się wydarzy, więc nigdy nie musisz dodawać kart ręcznie. Na tablicy przepływu pracy kliknij kartę **Wyzwalacze**, a następnie **Dodaj wyzwalacz**. Są dwa rodzaje:

### Wyzwalacze zdarzeniowe

Uruchamiają się, gdy tylko rekord zmieni się w B1. Wybierz zdarzenie, a następnie opcjonalnie dodaj **warunki**, aby dodawać tylko pasujące osoby:

- **Osoba · Utworzona / Zaktualizowana** -- np. dodaj każdego, czyj status zmienia się na *Odwiedzający* lub *Gość* (status nadawany osobom, które same się zarejestrowały).
- **Ofiara · Utworzona** -- np. dodaj pierwszą lub dużą ofiarę do przepływu podziękowań (dopasuj według kwoty, funduszu lub metody).
- **Grupa · Członek dołączył** / **Grupa · Utworzona**.
- **Formularz · Wysłany** -- dodaj każdego, kto wyśle wybrany formularz (świetne dla karty „Jestem nowy" lub „Połącz się").

### Wyzwalacze harmonogramu

Działają cyklicznie -- codziennie, co tydzień, co miesiąc lub co roku -- względem zestawu warunków. Używaj ich do kontaktów zależnych od czasu, np. *wszyscy, których urodziny przypadają dziś* (Data urodzenia · Dzień miesiąca = **Dzisiaj**, z miesiącem dopasowanym do **Bieżący miesiąc**) lub *miesięcznego* sprawdzenia. Nawet bez **Tylko raz na osobę** wyzwalacz harmonogramu nie doda tej samej osoby ponownie w obrębie jednego okresu powtarzania (dnia, tygodnia, miesiąca lub roku, zgodnie z częstotliwością uruchamiania).

Dla każdego wyzwalacza możesz też ustawić:

- **Etap początkowy**, na którym ląduje nowa karta (domyślnie pierwszy etap).
- **Tylko raz na osobę** -- aby ta sama osoba nie została dodana do przepływu pracy przez wyzwalacz dwa razy. Przy włączonej tej opcji każdy, kto ma już kartę w tym przepływie pracy, zostaje pominięty.
  - **Dodaj ponownie po zamknięciu karty** -- pojawia się, gdy włączona jest opcja **Tylko raz na osobę**. Zaznacz ją, aby wyzwalacz mógł dodać osobę ponownie, gdy jej wcześniejsza karta w tym przepływie pracy zostanie zamknięta. Osoba nigdy nie może jednocześnie mieć dwóch otwartych kart w tym przepływie. Używaj tego w przypadku zdarzeń, które mogą się powtarzać, np. powracającego gościa lub procesu corocznego.
- **Aktywny** -- włącza lub wyłącza wyzwalacz bez jego usuwania.

:::tip
Połącz wyzwalacz **Formularz · Wysłany** z szablonem **Obsługa nowego odwiedzającego**, aby zamienić formularz „Karta kontaktowa" lub „Jestem nowy" w automatyczny proces kontaktu.
:::

## Potwierdzenia przydziałów do służby

Specjalny rodzaj przepływu pracy może śledzić [prośby o służbę](./plans.md#assigning-team-members), aż każdy wolontariusz zaakceptuje lub odrzuci przydział. Zamiast osób każda karta na tej tablicy śledzi **jeden przydział** -- jedną osobę na jednym stanowisku w jednym planie. Dwie role lub dwa nabożeństwa dla tej samej osoby mają osobne karty. Jest to opcjonalne: nic nie zmienia się w planie, dopóki nie wybierzesz przepływu pracy potwierdzeń w jego ustawieniach.

### Konfiguracja

1. Na stronie Przepływy pracy kliknij **Dodaj przepływ pracy** i wybierz szablon **Potwierdzenie przydziału do służby**. (Lub zacznij od **Pustego przepływu pracy** i ustaw jego **Cel przepływu pracy** na **Potwierdzenie przydziału do służby**). Tworzenie z szablonu wymaga uprawnienia do wysyłania SMS-ów, ponieważ zawiera etap SMS-a.
2. Przejrzyj etapy. Szablon zaczyna się od:
   - **Wyślij prośbę i czekaj na odpowiedź** -- wysyła prośbę o służbę e-mailem i SMS-em, czeka 2 dni, wysyła e-mail z przypomnieniem, czeka jeszcze 1 dzień, a następnie automatycznie przenosi kartę dalej.
   - **Zadzwoń do wolontariusza w sprawie bez odpowiedzi** -- etap, na którym osoba dzwoni do wolontariusza, z terminem za 1 dzień. Ustaw **Domyślnego wykonawcę** na tym etapie. Jeśli go nie ma, karta trafia do lidera służby, a jeśli go nie ma, do zespołu służby.
3. Edytuj czekania, wiadomości i etapy, aby pasowały do Twojego kościoła.
4. Otwórz [ustawienia planu](./plans.md#plan-settings) i wybierz ten przepływ pracy w polu **Przepływ pracy potwierdzenia**.

Te przepływy pracy używają działania **Wyślij prośbę o służbę** zamiast **Wyślij e-mail** i **Wyślij SMS**. Wybierz **E-mail** lub **Wiadomość tekstową** i opcjonalnie napisz **Treść prośby**. Prośba zawsze zawiera rolę, plan, datę nabożeństwa i link do odpowiedzi; w swojej wiadomości możesz użyć `{{planName}}`, `{{positionName}}` i `{{serviceDate}}`. Pozostaw treść pustą, aby użyć domyślnej prośby. Obowiązują preferencje powiadomień wolontariuszy, zgoda na SMS-y, Twój dostawca wiadomości tekstowych i zatwierdzenie e-maila przez kościół, a każda pominięta lub zablokowana próba jest zapisywana na karcie. Działania **Wyślij e-mail**, **Wyślij SMS** i **Dodaj do przepływu pracy** nie są dostępne na tych tablicach.

Zakładka **Wyzwalacze** w przepływie pracy potwierdzeń wyjaśnia, jak karty są uruchamiane, zamiast oferować wyzwalacze, a te przepływy pracy nie pojawiają się na listach **Dodaj do przepływu pracy** dla osób.

### Jak karty są uruchamiane i zamykane

- Karty zaczynają się od chwili, gdy **powiadomisz** wolontariuszy w opublikowanym planie (zobacz [Powiadamianie wolontariuszy](./plan-validation.md#notifying-volunteers)). Każdy nowy, bez odpowiedzi przydział otrzymuje jedną kartę. Zapisywanie, publikowanie, kopiowanie lub automatyczne uzupełnianie planu nikogo sam z siebie nie kontaktuje, a plany w wersji roboczej nie wysyłają niczego.
- Wolontariusze nadal otrzymują zwykły alert w aplikacji. Kontakt e-mailem i SMS-em, który następuje po nim, pochodzi z przepływu pracy.
- Gdy wolontariusz **zaakceptuje lub odrzuci**, jego karta zamyka się automatycznie, wraz z powiązanymi zadaniami kontynuacji.
- Panel karty pokazuje stanowisko, datę nabożeństwa i link do planu. Zamiast **Zakończ** przycisk brzmi **Zapisz kontakt wykonany**. Kliknięcie go zapisuje, że ktoś się odezwał, ale karta pozostaje otwarta i przypisana (oznaczona jako **Oczekiwanie na odpowiedź**), dopóki wolontariusz nie odpowie lub nie minie termin odpowiedzi.
- Termin odpowiedzi to koniec ostatniego terminu nabożeństwa, w którym zespół stanowiska służy. Jeśli plan nie ma pasujących terminów, jest to koniec dnia nabożeństwa. Jeśli nikt nie odpowie do tego czasu, karta zamyka się ze statusem **Minął termin odpowiedzi**, a do obecnego właściciela karty lub lidera służby trafia zadanie **Sprawdź prośbę o służbę bez odpowiedzi**, aby ktoś zdecydował, jak obsadzić miejsce. Przydział pozostaje **Niepotwierdzony**.
- Usunięcie przydziału, zmiana osoby, stanowiska lub daty planu, przywrócenie planu do wersji roboczej albo przełączenie planu na inny przepływ pracy potwierdzeń zamyka kartę. Zamkniętej karty nigdy nie otwiera ponownie kolejne **Powiadom**; aby wysłać nową prośbę, dodaj nowy przydział.

:::info
W przypadku próśb wysłanych przez przepływ pracy potwierdzeń [przypomnienia dla wolontariuszy](./plans.md#volunteer-reminders) trafiają wyłącznie do wolontariuszy, którzy **zaakceptowali**, dzięki czemu osoby czekające na odpowiedź nie dostają przypomnień ponad kontakty z przepływu pracy.
:::

## Moje karty

Wolontariusze i personel nie muszą przeglądać każdej tablicy, aby znaleźć swoją pracę. Lista **Moje karty** na stronie **Moja praca** pokazuje każdą kartę przypisaną bieżącemu użytkownikowi we wszystkich przepływach pracy. Aby tam trafić, kliknij **Moje karty** na górze strony Przepływy pracy lub otwórz **Służba > Moja praca** w menu skoków. Kliknięcie karty otwiera jej panel szczegółów bezpośrednio na stronie Moja praca, gdzie możesz nad nią pracować lub ją usunąć bez opuszczania strony. Jeśli możesz przeglądać przepływy pracy, panel zawiera też link **Otwórz tablicę przepływu pracy** do tablicy, do której należy karta.

## Raporty

Otwórz przepływ pracy i kliknij **Raporty**, aby zobaczyć analizy tego przepływu:

- **Zaległe** -- liczba kart po terminie.
- **Karty na etap** -- ile kart znajduje się obecnie na każdym etapie, pokazane jako wykres kolumnowy.
- **Zakończone (30 dni)** -- przepustowość w ciągu ostatnich 30 dni, pokazana jako wykres liniowy.

Użyj ich, aby wykryć wąskie gardła -- na przykład etap, na którym karty się piętrzą i nigdy nie przechodzą dalej.

## Powiązane artykuły

- [Zadania](./tasks.md) -- pojedyncze pozycje do wykonania, na których opierają się karty przepływu pracy
- [Formularze](../forms/index.md) -- twórz formularze, które mogą uruchamiać przepływy pracy
- [Grupy](../groups/index.md) -- grupy, do których może dodawać osoby działanie „Dodaj do grupy"
- [Plany nabożeństw](./plans.md) -- wybierz przepływ pracy potwierdzeń dla próśb o służbę w planie
- [Role i uprawnienia](../settings/roles-permissions.md) -- kontroluj, kto może przeglądać, edytować i zarządzać przepływami pracy
