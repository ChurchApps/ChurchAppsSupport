---
title: "Rejestrowanie obecności"
---

# Rejestrowanie obecności

<div class="article-intro">

Gdy ustawisz kampusy, godziny nabożeństw i grupy, możesz ręcznie rejestrować obecność po każdym spotkaniu. B1 Admin organizuje obecność według **sesji** — jedna sesja na grupę i datę spotkania. Tworzysz sesję, zaznaczasz, kto przyszedł, a dane trafiają bezpośrednio do raportów frekwencji.

</div>

## Film szkoleniowy

<YouTube id="gS8h2rhyMys" title="Rejestrowanie i śledzenie obecności w B1" next="Tworzenie planów i planowanie wolontariuszy w B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Przed rozpoczęciem</h4>

- Kampusy, godziny nabożeństw i grupy muszą być skonfigurowane. Jeśli jeszcze tego nie zrobiono, zobacz [Konfiguracja obecności](setup.md).
- Grupy, które chcesz śledzić, muszą mieć włączoną opcję **Śledź obecność**. Szczegóły znajdziesz w [Konfiguracja obecności](setup.md).
- Do zapisywania obecności potrzebne jest uprawnienie **Edycja obecności**. Wolontariusze, którzy mają dla osób tylko uprawnienie **Tylko imiona i nazwiska osób**, mogą mimo to rejestrować obecność — otwierają zajęcia z **Grupy** i widzą członków tylko po imieniu i nazwisku. Zobacz [Tylko imiona i nazwiska osób](../settings/roles-permissions.md#people-names-only).

</div>

## Tworzenie sesji

Sesja oznacza jedno wystąpienie spotkania grupy — na przykład zajęcia dla klasy K–3 w konkretną niedzielę.

1. Otwórz **B1 Admin**, otwórz [menu szybkiego przejścia](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania u góry po lewej), rozwiń **Osoby** i kliknij **Grupy**.
2. Wybierz grupę, dla której chcesz zarejestrować obecność.
3. W sekcji **Sesje** na stronie grupy kliknij **Wszystkie sesje**.
4. Kliknij **Nowy**, aby utworzyć nową sesję.
5. Jeśli grupa jest przypisana do godziny nabożeństwa, wybierz **Termin nabożeństwa**. Jeśli grupa nie ma przypisanego terminu, to pole się nie pojawi.
6. Wybierz **Datę sesji** — może to być dzisiaj, data przeszła lub przyszła.
7. Kliknij **Zapisz**.

### Dodawanie sesji dla wszystkich klas w terminie nabożeństwa

Jeśli w tym samym terminie nabożeństwa spotykają się inne grupy (na przykład wszystkie klasy dla dzieci w niedzielę o 9:00), możesz utworzyć sesje dla nich wszystkich za jednym razem, zamiast odwiedzać każdą grupę osobno.

1. Wykonaj powyższe kroki i wybierz **Termin nabożeństwa**.
2. Zaznacz **Dodaj także dla pozostałych _N_ grup w _terminie nabożeństwa_**. Pole wyboru pokazuje, ile innych grup jest przypisanych do tego terminu. Pojawia się tylko podczas dodawania nowej sesji i gdy co najmniej jedna inna grupa spotyka się o tej porze.
3. Kliknij **Zapisz**.

Sesja zostanie utworzona dla bieżącej grupy oraz dla każdej z pozostałych grup o tej samej dacie i godzinie. Grupy, które mają już sesję na daną datę i termin, zostaną pominięte, więc nie powstaną duplikaty.

:::tip
Możesz tworzyć sesje dla dat minionych, aby nadrobić obecność, której jeszcze nie zarejestrowano, lub tworzyć je wcześniej, aby były gotowe, gdy grupa się spotka.
:::

## Notatki do sesji {#session-notes}

Każda sesja może mieć notatki — podsumowanie omawianego tematu, ogłoszenia lub prośby modlitewne.

1. Podczas dodawania sesji lub po kliknięciu ikony **Edytuj** (ołówek) obok sesji na liście wpisz tekst w polu **Notatki (omawiany temat, ogłoszenia, prośby modlitewne)** pod datą. Pasek narzędzi pozwala dodać pogrubienie, listy i linki.
2. Kliknij **Zapisz**.

Notatki pojawiają się na górze listy obecności w sesji. Są to również notatki ze spotkania, które członkowie grupy czytają w sekcji **Spotkania** na stronie grupy w B1.church. Liderzy grup mogą je tam też pisać i edytować. Zobacz [Szczegóły grupy](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Zaznaczanie obecności

Wybierz sesję, aby zobaczyć listę obecności. Każdy członek grupy jest wymieniony z polem wyboru, posortowany według nazwiska. Osoby już zapisane jako obecne mają zaznaczone pole.

1. Zaznacz pole obok każdej osoby, która przyszła. Użyj **Zaznacz wszystkie** lub **Odznacz wszystkie**, aby zmienić wszystkich naraz.
2. Liczba nad listą (na przykład „12 z 15 obecnych”) aktualizuje się w miarę zaznaczania.
3. Kliknij **Zapisz obecność**. Nic nie zostaje zapisane, dopóki nie klikniesz tego przycisku, a po zakończeniu zapisu pojawi się komunikat potwierdzający. Jeśli spróbujesz zamknąć lub przeładować kartę przeglądarki, gdy zapis jeszcze trwa, przeglądarka najpierw ostrzeże, aby zmiany nie przepadły.

Odznaczenie osoby, która była już zapisana jako obecna, a następnie zapisanie zmian, usuwa ją z sesji.

### Dodawanie gości

Aby zarejestrować osobę, która nie jest członkiem grupy, wyszukaj ją w wyszukiwarce osób obok listy obecności. Jeśli jeszcze nie ma jej w bazie danych, możesz ją utworzyć bezpośrednio z wyszukiwarki. W obu przypadkach osoba zostanie dodana do listy z zaznaczonym polem. Kliknij **Zapisz obecność**, aby ją zarejestrować.

Osoby, które zameldowały się na kiosku, mają znacznik **Wolontariusz** lub **Gość**. Osoby, które nie są członkami grupy, mają znacznik **Gość**.

## Sprawdzanie, które grupy wciąż wymagają wprowadzenia obecności

Gdy w tym samym terminie nabożeństwa odbywa się kilka zajęć, możesz od razu zobaczyć, które z nich nadal wymagają wprowadzenia obecności za daną datę.

1. Otwórz sesję, która ma przypisany termin nabożeństwa.
2. Kliknij **Kto jeszcze wymaga wprowadzenia obecności** na górze listy obecności.
3. Pojawi się okno z listą wszystkich grup przypisanych do tego terminu oraz podsumowaniem, na przykład „5 z 8 grup wprowadzonych”, na górze.

Grupy bez zaznaczonych osób obecnych w tym dniu mają znacznik **Nie wprowadzono** i są wymienione jako pierwsze. Grupy, które mają zarejestrowaną obecność, pokazują **Wprowadzono** wraz z liczbą osób obecnych (na przykład „Wprowadzono (12)”). Kliknij nazwę grupy, aby otworzyć jej sesje z już wybraną sesją na tę samą datę — dzięki temu możesz od razu zarejestrować obecność. Jeśli grupa nie ma jeszcze sesji na tę datę, otworzy się lista jej sesji, abyś mógł ją dodać.

:::tip
Połącz to z opcją **Drukuj wszystkie klasy** oraz [dodawaniem sesji dla wszystkich klas w terminie nabożeństwa](#adding-sessions-for-every-class-in-a-service-time): utwórz sesje, rozdaj listy obecności, a następnie użyj **Kto jeszcze wymaga wprowadzenia obecności**, aby sprawdzić, które listy nie zostały jeszcze wprowadzone.
:::

## Drukowanie listy obecności

Lista obecności to wydruk klasy, który nauczyciele mogą oznaczyć ręcznie i oddać, abyś wprowadził dane później. Każdy arkusz pokazuje logo kościoła (**Logo na jasnym tle** z [Witryna > Wygląd](../website/appearance.md), jeśli je przesłano), a pod nim nazwę kościoła, nazwę klasy, duży wiersz **Data** pod nazwą klasy oraz termin nabożeństwa. Członkowie są wymienieni w dwóch kolumnach (czytaj najpierw lewą kolumnę, potem prawą), dzięki czemu na jednej stronie mieści się więcej nazwisk. Każdy członek ma pola **Obecny** i **Nieobecny**. Są też puste linie dla gości oraz pole **Nauczyciel / Notatki**.

- **Z sesji** — kliknij ikonę drukarki **Drukuj listę obecności** na górze listy obecności w sesji. Arkusz zawiera datę sesji i termin nabożeństwa tej sesji.
- **Wszystkie klasy dla nabożeństwa** — jeśli sesja ma termin nabożeństwa, kliknij **Drukuj wszystkie klasy**, aby wydrukować po jednym arkuszu dla każdej klasy przypisanej do tego terminu. Każda klasa drukuje się na osobnej stronie.
- **Z listy członków** — na stronie grupy kliknij **Wszyscy członkowie**, następnie kliknij ikonę **Drukuj listę obecności** nad listą członków i wybierz **Arkusz obecności**, aby wydrukować arkusz bez daty. W tym samym menu znajduje się układ **Lista kontaktowa**, na którym widać telefon, e-mail i adres każdego członka. Zobacz [Drukowanie listy członków](../groups/group-members.md#printing-the-member-list).

Arkusz otwiera się w nowej karcie, a okno drukowania przeglądarki pojawia się automatycznie.

## Eksportowanie obecności do arkusza kalkulacyjnego

Możesz pobrać zapis sesji jako plik CSV, aby otworzyć go w Excelu, Numbers lub Arkuszach Google.

1. Otwórz sesję, którą chcesz wyeksportować.
2. Kliknij przycisk **Eksportuj** na górze listy obecności.
3. Otwórz pobrany plik w aplikacji arkusza kalkulacyjnego.

Plik zawiera jeden wiersz na członka grupy z jego imieniem i nazwiskiem oraz informacją, czy był obecny, czy nieobecny, a także datę sesji i notatki do sesji.

## Przeglądanie zarejestrowanej obecności

Po zarejestrowaniu sesji dane pojawiają się w raportach frekwencji.

- **Karta Trend obecności** (w sekcji **Wszystkie lata** na stronie Obecność) — pokazuje trendy w całym kościele w czasie. Zobacz [Śledzenie obecności](tracking-attendance.md).
- **Karta Obecność grup** — pokazuje obecność z podziałem na poszczególne grupy. Zobacz [Raporty obecności](../reports/attendance-reports.md#group-attendance).

:::tip
Jeśli sesja, którą właśnie utworzyłeś, nie pojawia się od razu w raportach, sprawdź, czy data sesji mieści się w zakresie dat wybranym w filtrach raportu.
:::
