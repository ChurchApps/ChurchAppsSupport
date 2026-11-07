---
title: "Plany nabożeństw"
description: "Planuj wolontariuszy w B1 Admin: twórz plany według dat, kopiuj je z wcześniejszych tygodni, przypisuj zespół do stanowisk i ustawiaj terminy zapisów oraz przypomnienia."
---

# Plany nabożeństw

<div class="article-intro">

Plany nabożeństw porządkują, kto i kiedy służy. Każdy plan jest powiązany z konkretną datą i służbą, dzięki czemu łatwiej koordynować zespoły wolontariuszy z tygodnia na tydzień i zadbać o to, by każde nabożeństwo miało pełną obsadę.

</div>

## Film szkoleniowy

<YouTube id="47DstBXKl74" title="Tworzenie planów i planowanie wolontariuszy w B1" next="Tworzenie porządku nabożeństwa i biblioteki pieśni w B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj swoje służby i zespoły w sekcji Serving
- Upewnij się, że wolontariusze zostali dodani do Twojego [katalogu osób](../people/adding-people.md) i przypisani do zespołów

</div>

## Dostęp do planów

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Serving** i kliknij **Plans**.
2. Wybierz **zakładkę służby** u góry strony.
3. Kliknij **typ planu**, aby zobaczyć listę planów tego typu. Użyj **Upcoming** i **Past** nad listą, aby przełączać się między planami przyszłymi a wcześniejszymi. **Upcoming** pokazuje plany od dzisiaj, zaczynając od najbliższych, z planami bez daty na końcu. **Past** pokazuje tylko wcześniejsze plany, zaczynając od najnowszych.
4. Kliknij konkretny plan, aby go otworzyć.

Na każdej stronie planu znajdują się linki powrotne do jego typu oraz do **Plans}, dzięki czemu możesz wrócić wyżej bez użycia przycisku wstecz w przeglądarce.

:::info
Do zarządzania planami nie jest wymagany pełny dostęp administratora. Każdy, kto jest członkiem służby, może przejść do sekcji Serving i tworzyć, edytować oraz planować plany dla swojej służby bez uprawnienia Plans Edit. Redaktorzy z rolą Plans Edit mogą zarządzać planami we wszystkich służbach.
:::

## Tworzenie planu

1. Na stronie typu planu kliknij u góry **New Plan**.
2. Nadaj planowi nazwę lub użyj daty jako nazwy. Wybierz **datę** nabożeństwa.
3. Jeśli Twoja służba ma [szablony](./plan-templates.md), możesz wybrać jeden w polu **Start from template**, aby jednym krokiem uzupełnić porządek nabożeństwa, stanowiska i notatki.
4. W przeciwnym razie, jeśli chcesz skopiować poprzedni plan, użyj **Copy from Previous Plan**, aby wybrać **Positions Only** lub **Positions and Assignments**. Jeśli nie chcesz kopiować, wybierz **Nothing**. Możesz też zaznaczyć **Copy Order of Service**. Po skopiowaniu z poprzedniego planu nowy plan zachowuje także jego **Notes**, **Signup Deadline**, ustawienie **Show volunteer names on signup page** oraz ustawienie automatycznej zamiany, dzięki czemu nie musisz wpisywać ich co tydzień od nowa. Każdą z tych wartości możesz zmienić w ustawieniach nowego planu.
5. Aby od razu utworzyć kilka planów podczas kopiowania, wybierz **Repeat every** oraz **Frequency** (Day, Week lub Month), a następnie wpisz **Number of plans** (do 12). Przy Month opcja **On** pozwala zachować ten sam dzień miesiąca lub ten sam dzień tygodnia, na przykład drugą sobotę. B1 wyświetla daty przed zapisaniem i tworzy jeden plan dla każdej daty, każdy skopiowany z poprzedniego. Jeśli plan nosi nazwę według daty, każdy nowy plan otrzymuje nazwę od własnej daty.
6. Opcjonalnie ustaw **Signup Deadline (hours before service)**. Nowy plan zaczyna z terminem z poprzedniego planu, który możesz tu zmienić. Pozostaw pole puste, jeśli nie chcesz terminu. Zobacz [Ustawienia planu](#plan-settings), aby dowiedzieć się, jak liczony jest termin.
7. Zapisz plan. Możesz teraz przypisywać członków zespołu i budować [porządek nabożeństwa](./service-order.md).

:::tip
Ustawienia powtarzania są dostępne tylko podczas kopiowania czegoś z poprzedniego planu (stanowisk, przypisań lub porządku nabożeństwa).
:::

## Strona szczegółów planu

Po otwarciu planu u góry wyświetlają się jego nazwa, służba, typ planu i data nabożeństwa, wraz z przyciskami **Edit** i **Print**. Poniżej wszystko znajduje się na jednej stronie:

- **[Porządek nabożeństwa](./service-order.md)** -- Ułóż porządek nabożeństwa z elementami takimi jak pieśni uwielbienia, modlitwy, ogłoszenia i kazanie.
- **Serving Team Assignments** -- Zarządzaj członkami zespołu przypisanymi do tego planu. Możesz dodawać osoby z istniejących zespołów i sprawdzać, kto potwierdził udział, a kto wciąż czeka na odpowiedź. Linki nad stanowiskami pozwalają otworzyć **Notes** i **Times** planu.

## Przypisywanie członków zespołu

1. Otwórz plan i przewiń do sekcji **Serving Team Assignments**.
2. Kliknij **Add Position**. Wypełnij informacje w formularzu dodawania stanowiska. W polu nazwy kategorii wpisz dowolną kategorię. Jeśli chcesz, aby stanowisko mógł objąć każdy z Twojego kościoła (a nie tylko członkowie jednego zespołu), pozostaw **Volunteer Group** ustawione na **None**.
3. Kliknij **People Needed** i wybierz wolontariuszy do objęcia tego stanowiska. Jeśli stanowisko ma **Volunteer Group**, wybierasz spośród członków tej grupy. Jeśli jej Volunteer Group ma wartość **None**, możesz zamiast tego wyszukać dowolną osobę w swoim kościele.
4. Dodaj członków z listy swojego zespołu, klikając **Add**.
5. Przypisani członkowie pojawią się pod swoim zespołem wraz ze statusem przypisania.
6. Kliknij notify volunteers, aby ich powiadomić w aplikacji B1 lub e-mailem. Jeśli plan korzysta z [przepływu potwierdzeń](#plan-settings), powiadomienie uruchamia też kartę przepływu, która śledzi każde zgłoszenie, aż wolontariusz odpowie.

Każde stanowisko pokazuje licznik (na przykład „2/3"), dzięki czemu od razu widzisz, ile miejsc jest obsadzonych. Pod nagłówkiem **Serving Team Assignments** podsumowanie („X z Y stanowisk obsadzonych") pokazuje ogólną obsadę planu oraz liczbę wciąż potrzebnych osób. Po obsadzeniu wszystkich stanowisk pojawia się napis **Fully staffed**.

:::tip
Przed utworzeniem planów skonfiguruj swoje zespoły w ustawieniach służby. Dzięki temu będziesz mieć gotową pulę wolontariuszy do przypisywania.
:::

### Kopiowanie stanowisk do pustego planu

Jeśli plan nie ma jeszcze żadnych stanowisk, a istnieje wcześniejszy plan tego samego typu, w sekcji **Serving Team Assignments** pojawi się link **Copy from Previous Plan**. Wybierz **Positions Only** lub **Positions and Assignments**, aby uzupełnić otwarty plan stanowiskami (i wolontariuszami) z poprzedniego planu. Kopia trafia do bieżącego planu; nie tworzy drugiego planu na tę samą datę.

## Ustawienia planu

Każdy plan ma dodatkowe ustawienia, które możesz skonfigurować, klikając **Edit** obok planu na liście typów planów lub przycisk **Edit** u góry strony planu. Kliknij **Done** (lub nazwę planu), aby wrócić do planu. Obejmują one:

- **Signup Deadline (hours before service)** — liczba godzin przed nabożeństwem, po których zapisy wolontariuszy są zamykane. Godziny odlicza się wstecz od pierwszego czasu **Service** w planie (próby i inne terminy są pomijane, chyba że plan nie ma nic innego). Na przykład 2-godzinny termin przy nabożeństwie o 10:00 zamyka zapisy o 8:00 tego ranka. Jeśli plan nie ma żadnych godzin, termin liczy się od 9:00 w dniu nabożeństwa, według strefy czasowej Twojego kościoła. Po jego upływie wolontariusze nie mogą się zapisać ani wypisać. Wpisz liczbę ujemną, aby zapisy były otwarte także po rozpoczęciu nabożeństwa. Pozostaw pole puste lub je wyczyść, jeśli nie chcesz terminu.
- **Confirmation workflow** — wybierz [przepływ potwierdzeń przydziału w służbie](./workflows.md#serving-assignment-confirmations), aby śledzić prośby o służbę w tym planie za pośrednictwem e-maila i SMS-ów, aż każdy wolontariusz zaakceptuje lub odrzuci przydział. Gdy klikniesz **Notify** wolontariuszy w opublikowanym planie, każde nowe zgłoszenie otrzymuje własną kartę na tablicy tego przepływu, a nad linkiem powiadomienia pojawia się notatka: *„New requests use the confirmation workflow."* Pozostaw ustawienie **Use existing assignment notifications**, aby zachować zwykłe powiadomienia. Na liście pojawiają się tylko aktywne przepływy potwierdzeń; najpierw utwórz jeden w sekcji **Serving > Workflows**.
- **Show volunteer names on signup page** — po zaznaczeniu zalogowani wolontariusze widzą, kto jest już zapisany na każde stanowisko na stronie zapisów B1.church. Imiona nigdy nie są pokazywane odwiedzającym, którzy nie są zalogowani.
- **Penciled in** — ukrywa przydziały przed wolontariuszami, dopóki nie będziesz gotowy opublikować harmonogramu.
- **Automatically schedule a replacement when a volunteer declines** — po zaznaczeniu, jeśli przypisany wolontariusz odrzuci swoje stanowisko, B1 automatycznie skontaktuje się z następną dostępną osobą z listy zespołu i zapyta, czy może służyć. Proces trwa, aż ktoś zaakceptuje, dzięki czemu stanowiska pozostają obsadzone bez ręcznego przypominania.

:::tip
Na stronie zapisów członków otwarte stanowiska każdego planu są wymienione najpierw według kategorii, a potem według nazwy. Członkowie widzą każdy nadchodzący tydzień z wolnymi stanowiskami, chyba że włączysz opcję **Show only the next week of each plan type** w [Ustawienia > Volunteer Signup](../settings/church-settings.md#volunteer-signup).
:::

## Przypomnienia dla wolontariuszy {#volunteer-reminders}

B1 może automatycznie przypominać wolontariuszom o nabożeństwach, na które są zaplanowani, dzięki czemu nie musisz co tydzień ścigać swojego zespołu. Przypomnienia trafiają do **wszystkich zaplanowanych osób** — zarówno tych, którzy potwierdzili, jak i tych, którzy jeszcze nie odpowiedzieli. Wyjątkiem jest prośba wysłana przez [przepływ potwierdzeń](./workflows.md#serving-assignment-confirmations): taki wolontariusz otrzymuje przypomnienia dopiero po zaakceptowaniu, ponieważ do tego czasu przepływ sam śledzi odpowiedź. Każdy e-mail z przypomnieniem zawiera stanowisko (stanowiska) wolontariusza, datę nabożeństwa, notatki planu i Twoją własną wiadomość.

Czas i treść przypomnień ustawia się osobno dla każdego **typu planu**, dzięki czemu każdy rodzaj nabożeństwa może mieć własny harmonogram.

1. W sekcji **Serving** wybierz służbę, do której należy typ planu.
2. Na liście **Plan Types** kliknij **Edit** obok typu planu.
3. Rozwiń sekcję **Reminders** i włącz **Send reminders for plans of this type**.
4. W polu **When should reminders go out?** wybierz do trzech terminów: **7 days before**, **3 days before**, **2 days before**, **1 day before** lub **Day of**.
5. Ustaw **Time of Day**, o której mają zostać wysłane przypomnienia.
6. Opcjonalnie dodaj **Message**. Pozostaw pole puste, aby użyć domyślnej treści przypomnienia.
7. W polu **Send By** wybierz **Push**, **Email** i — jeśli Twój kościół ma połączonego [dostawcę SMS-ów](../settings/church-settings.md#texting) — **Text**.
8. Kliknij **Save Reminders**.

Przypomnienia są wyłączone dla typu planu, dopóki ich nie włączysz.

:::tip
Wolontariusze, którzy jeszcze nie potwierdzili udziału, widzą w e-mailu z przypomnieniem przyciski **Accept** i **Decline**, dzięki czemu mogą odpowiedzieć bez logowania.
:::

### Przypomnienia SMS

Opcja **Text** pojawia się tylko wtedy, gdy Twój kościół ma połączonego dostawcę SMS-ów. SMS-y są wysyłane przez dostawcę usług SMS Twojego kościoła, a każda wiadomość może kosztować kościół. Wolontariusz otrzymuje przypomnienie SMS tylko wtedy, gdy ma włączoną opcję **Text messages** w [Preferencjach powiadomień](../../b1-church/getting-started/notification-preferences.md) oraz numer komórkowy w swoim profilu. Każdy SMS zaczyna się od nazwy Twojego kościoła, mieści się w jednej wiadomości tekstowej i kończy się zdaniem „Reply STOP to opt out." Osoby odpowiadające STOP przestają otrzymywać SMS-y od Twojego kościoła. Aby odpowiedzi STOP dotarły do B1, wklej **Inbound (STOP) webhook URL** z [ustawień SMS-ów](../settings/church-settings.md#texting) do pola webhooka wiadomości przychodzących u swojego dostawcy.

Aby od razu wysłać SMS-y do wszystkich zaplanowanych osób w określonym zakresie dat, użyj **Text Volunteers** w [Przeglądzie planów](./plans-overview.md#texting-everyone-scheduled).

:::info
Każde przypomnienie jest wysyłane tylko raz. Przypomnienia SMS są wysyłane oprócz powiadomień push i e-mail, a nie zamiast nich.
:::

## Powiązanie grup z typem planu

Poniżej listy planów na stronie typu planu sekcja **Associated Groups** pozwala określić, które grupy mogą widzieć plany tego typu w swoim portalu członka. Jest to szybki sposób, aby przekazać nadchodzące nabożeństwa właściwym zespołom bez nadawania im dostępu administratora.

1. Na stronie typu planu kliknij **Associated Groups** u góry strony (lub przewiń do tej sekcji).
2. Kliknij **Add Group** i wybierz grupę z listy rozwijanej.
3. W kolumnie **Shows** wybierz, czy członkowie tej grupy mają widzieć **Past plans only**, **Upcoming plans only**, czy **Past and upcoming plans** dla tego typu planu.
4. Powtórz, aby powiązać kolejne grupy, lub kliknij ikonę kosza, aby usunąć grupę.

:::info
W wyborze pojawiają się tylko grupy oznaczone jako **Standard**. Członkowie powiązanej grupy automatycznie widzą plany tego typu na stronie grupy w portalu członka B1, w ograniczonym przez Ciebie zakresie dat.
:::

Jeśli plany to lekcje Lessons.church, członkowie powiązanej grupy widzą też kartę **This week's lesson** na stronie grupy (temat, werset i pytanie dla rodziców). Powiąż tutaj grupę rodziców i ustaw filtr na **Past plans only**, aby dzisiejsza lekcja była uwzględniona. Zespoły wolontariuszy zwykle używają **Upcoming plans only** lub **Past and upcoming plans**.

## Drukowanie planów

Plan możesz wydrukować, aby rozdać go zespołowi. Otwórz plan i kliknij **Print** u góry strony, aby wygenerować wersję do druku, zawierającą przydziały i porządek nabożeństwa. Na górze wydruku widnieje logo Twojego kościoła (**Light Background Logo** z sekcji [Strona internetowa > Wygląd](../website/appearance.md), jeśli je przesłałeś), a pod nim nazwa kościoła oraz nazwa planu, dzięki czemu luźne kartki łatwo rozpoznać. Jest to przydatne do rozdawania na próbach lub wywieszania we wspólnej przestrzeni.

Wydruk pomija elementy, które byłyby puste. Jeśli nikt nie jest przypisany, nie ma pola zespołu, a porządek nabożeństwa zajmuje pełną szerokość strony. Jeśli żadne elementy nie mają długości, kolumna **Length** jest pominięta, a jeśli plan nie ma godzin nabożeństw ani długości, pomijana jest też kolumna **Time**. Aby usunąć czarny pasek nagłówka **Service Order** z datą nabożeństwa, odznacz **Show Service Order heading** u góry strony wydruku; B1 Admin zapamięta Twój wybór w tej przeglądarce.

:::info
Plany są uporządkowane według służb. Przed utworzeniem lub wyświetleniem planów upewnij się, że jesteś na właściwej zakładce służby.
:::

## Następne kroki

- Użyj [Przeglądu planów](./plans-overview.md), aby zobaczyć wszystkie nadchodzące przydziały z kilku tygodni w jednej siatce, wychwycić nieobsadzone stanowiska i przypisywać wolontariuszy bezpośrednio z siatki
- Zapisz strukturę planu jako [Szablon planu](./plan-templates.md), aby jednym kliknięciem zastosować ją w przyszłych planach
- Zbuduj [Porządek nabożeństwa](./service-order.md) z pieśniami, czytaniami i innymi elementami
- Dodawaj [pieśni](./songs.md) z biblioteki bezpośrednio do porządku nabożeństwa
- Użyj [Zadań](./tasks.md), aby przypisywać członkom zespołu działania do wykonania
- Wyświetlaj bieżące treści lekcji na telewizorze w holu za pomocą [Digital Signage](./digital-signage.md)
