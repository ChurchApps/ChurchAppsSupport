---
title: "Konfiguracja frekwencji"
---

# Konfiguracja frekwencji

<div class="article-intro">

Zanim zaczniesz śledzić frekwencję, musisz poinformować B1 Admin o fizycznych lokalizacjach kościoła, o tym, kiedy odbywają się nabożeństwa i które grupy spotykają się podczas każdego z nich. Ta jednorazowa konfiguracja tworzy strukturę, na której opierają się wszystkie funkcje śledzenia i raportowania frekwencji w Twoim kościele.

</div>

## Film szkoleniowy

<YouTube id="LQPc2gVlXvQ" title="Konfigurowanie nabożeństw i frekwencji w B1" next="Konfiguracja odprawy dzieci w B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz aktywnego konta B1 Admin z uprawnieniem do frekwencji **Edycja nabożeństw**. Opcja **Konfiguracja** pojawia się tylko u osób, które je mają; sama możliwość przeglądania frekwencji nie wystarcza. Jeśli nie wiesz, jaki masz poziom dostępu, zobacz [Role i uprawnienia](../people/roles-permissions.md).
- Jeśli planujesz przypisać grupy do godzin nabożeństw, najpierw upewnij się, że Twoje [grupy zostały utworzone](../groups/creating-groups.md).

</div>

## Podstawowe pojęcia

- **Kampus** — fizyczna lokalizacja, w której spotyka się Twój kościół (np. „Główny kampus”, „Północny kampus”). Kampusami zarządza się w sekcji **Ustawienia**.
- **Nabożeństwo** — cykliczne spotkanie w kampusie (np. „Niedzielne nabożeństwo”, „Spotkanie w środę”).
- **Godzina nabożeństwa** — konkretna godzina, o której odbywa się nabożeństwo (np. „9:00”, „11:00”).
- **Grupa zaplanowana** — grupa przypisana do określonej godziny nabożeństwa. Frekwencja jest śledzona w kontekście tego nabożeństwa.
- **Grupa niezaplanowana** — grupa, która śledzi frekwencję samodzielnie, bez powiązania z godziną nabożeństwa.

## Konfigurowanie struktury frekwencji

1. Otwórz **B1 Admin**, otwórz [menu szybkiego przejścia](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń **Ludzie**.
2. Kliknij **Frekwencja**, a następnie kliknij **Konfiguracja** w lewej kolumnie. Otworzy się tabela **Struktura nabożeństw**, a u góry zobaczysz liczbę kampusów, godzin nabożeństw oraz grup zaplanowanych i niezaplanowanych. Liczniki aktualizują się od razu po dodaniu, edycji lub usunięciu czegoś w tabeli.
3. Kliknij **Zarządzaj kampusami** (w prawym górnym rogu panelu **Struktura nabożeństw**). Przejdziesz do **Ustawienia → Kampusy**. Kliknij **Dodaj kampus**, wpisz nazwę swojej lokalizacji (adres i strefa czasowa są opcjonalne), a następnie kliknij **Zapisz**.
4. Wróć do **Ludzie → Frekwencja** i kliknij **Konfiguracja**. Twój kampus pojawi się teraz w tabeli konfiguracji.
5. Kliknij przycisk **+** w kolumnie **Nabożeństwo** pod swoim kampusem. Wpisz nazwę nabożeństwa, na przykład „Niedzielne nabożeństwo”, i kliknij **Zapisz**.
6. Kliknij przycisk **+** w kolumnie **Godzina** pod nabożeństwem. Wpisz nazwę **godziny nabożeństwa**, na przykład „9:00”, opcjonalnie uzupełnij [harmonogram odprawy](#ustawianie-harmonogramu-odprawy), a następnie kliknij **Zapisz**. Powtórz te czynności dla każdej godziny nabożeństwa.
7. Aby połączyć grupę z godziną nabożeństwa, otwórz grupę z **Ludzie > Grupy**, kliknij **Edytuj** i użyj opcji **Dodaj godzinę nabożeństwa** — zobacz następną sekcję.

### Włączanie śledzenia frekwencji w grupie

Zanim będzie można zapisywać frekwencję w grupie, trzeba włączyć dla niej opcję Śledzenie frekwencji.

1. W menu szybkiego przejścia wybierz **Ludzie > Grupy** i zaznacz grupę.
2. Kliknij przycisk **Edytuj** pod nazwą grupy.
3. Ustaw **Śledzenie frekwencji** na **Tak**.
4. Kliknij **Zapisz**.

:::tip
Jeśli w poprzednim kroku przypisano grupę do godziny nabożeństwa, użyj także opcji **Dodaj godzinę nabożeństwa** na ekranie edycji grupy, aby połączyć ją z odpowiednim nabożeństwem. Dzięki temu sesje będą powiązane z właściwym kampusem i godziną.
:::

:::tip
Jeśli grupa spotyka się poza regularnym nabożeństwem — na przykład mała grupa w środku tygodnia, która sama śledzi frekwencję — możesz pozostawić ją jako grupę niezaplanowaną. Nadal będzie się pojawiać w raporcie **Frekwencja grup**.
:::

## Ustawianie harmonogramu odprawy

Każda godzina nabożeństwa może mieć opcjonalny harmonogram odprawy, dzięki czemu [samodzielna odprawa](check-in.md) otwiera się i zamyka automatycznie w każdym tygodniu. Bez harmonogramu odprawa dla danej godziny nabożeństwa jest dostępna w dowolnym czasie (o ile sala nie jest zamknięta z innych powodów, na przykład z powodu braku miejsc).

1. Na widoku **Konfiguracja** kliknij nazwę godziny nabożeństwa w kolumnie **Godzina** (lub dodaj nową).
2. W sekcji **Harmonogram odprawy** wybierz **Dzień** tygodnia, w którym odbywa się dana godzina nabożeństwa.
3. Ustaw **Godzinę rozpoczęcia** oraz, opcjonalnie, **Godzinę zakończenia**.
4. Wpisz **Otwarcie odprawy (minut przed rozpoczęciem)** — na przykład `30` otworzy odprawę pół godziny przed rozpoczęciem nabożeństwa.
5. Wpisz **Zamknięcie odprawy (minut po zakończeniu)** — na przykład `15` utrzyma odprawę otwartą przez 15 minut po godzinie zakończenia. Jeśli nie ustawiono godziny zakończenia, czas liczy się od godziny rozpoczęcia. Jeśli pozostawisz puste pola **Godzina zakończenia** i **Zamknięcie odprawy**, odprawa będzie otwarta do końca tego dnia.
6. Kliknij **Zapisz**.

Harmonogram powtarza się co tydzień i jest liczony w strefie czasowej kampusu, do którego należy nabożeństwo. Jeśli kampus nie ma ustawionej strefy czasowej, używana jest [strefa czasowa](../settings/church-settings.md#time-zone) Twojego kościoła, następnie strefa czasowa pierwszego kampusu, który ją ma, a na końcu czas wschodnioamerykański (America/New_York). Jeśli odprawa otwiera się o niewłaściwej godzinie, sprawdź **Strefę czasową** kampusu w sekcji [Kampusy](../settings/campuses.md). Aby usunąć harmonogram, ustaw **Dzień** z powrotem na **Brak harmonogramu** i kliknij **Zapisz**. Harmonogram zaczyna działać dopiero wtedy, gdy ustawione są zarówno **Dzień**, jak i **Godzina rozpoczęcia**.

Gdy okno odprawy danej godziny nabożeństwa jest zamknięte:

- **Samodzielna odprawa na B1.church** pokazuje tę godzinę nabożeństwa jako **Zamknięte** (lub na przykład **Zamknięte · otwiera się niedz. 9:30**) i nie można jej wybrać. Jeśli żadna z godzin danego nabożeństwa nie jest otwarta, rodziny widzą, kiedy odprawa się otworzy, na przykład „Odprawa otwiera się niedz. 9:30”.
- **Aplikacja kiosku B1 Checkin** również pokazuje godzinę nabożeństwa jako **Zamknięte** wraz z informacją, kiedy się otworzy. Jeśli wszystkie godziny danego nabożeństwa są zamknięte, kiosk informuje, kiedy otworzy się odprawa na to nabożeństwo. Osoba, która już się odprawiła na zamkniętą godzinę nabożeństwa, zobaczy swoją grupę ze statusem **Odprawiony**. Jeśli okno zamknie się w trakcie odprawy, kiosk jej nie dokończy i wyświetli ekran **Nie można jeszcze się odprawić**, z listą dotkniętej sali, aby rodzina mogła wybrać inną.

Rodzina, która odprawiła się już na wcześniejszą godzinę nabożeństwa, nadal może wrócić i dodać późniejszą, otwartą godzinę nabożeństwa, nawet po zamknięciu wcześniejszego okna. Jej dotychczasowe odprawy zostają zachowane.

:::tip
Ustaw szerokie okno otwarcia (na przykład 45 minut przed rozpoczęciem), aby osoby przychodzące wcześnie i wolontariusze mogli się odprawić, oraz krótkie okno zamknięcia, aby spóźnieni mogli się odprawić po rozpoczęciu nabożeństwa.
:::

## Edycja konfiguracji

Konfigurację możesz zaktualizować w dowolnym momencie. Zaznacz kampus, godzinę nabożeństwa lub grupę i kliknij **Edytuj**, aby zmienić jej szczegóły, albo **Usuń**, aby ją usunąć.

:::info
Usunięcie godziny nabożeństwa nie kasuje wcześniejszych danych o frekwencji. Historia pozostaje zachowana, nawet jeśli zmienisz harmonogram.
:::

## Co dalej

Gdy kampusy, godziny nabożeństw i grupy są już skonfigurowane, możesz przystąpić do [rejestrowania frekwencji](recording-attendance.md) ręcznie lub skonfigurować [samodzielną odprawę](check-in.md) dla swoich nabożeństw.
