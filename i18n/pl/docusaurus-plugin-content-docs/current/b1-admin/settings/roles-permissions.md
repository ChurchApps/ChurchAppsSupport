---
title: "Role i uprawnienia"
description: "Skonfiguruj role w B1 Admin, by kontrolować, co personel i wolontariusze mogą widzieć i zmieniać: od darowizn i frekwencji po osoby i grupy."
---

# Role i uprawnienia

<div class="article-intro">

Role pozwalają kontrolować, do czego różni użytkownicy mają dostęp w Twoim koncie ChurchApps. Możesz tworzyć niestandardowe role dla personelu, wolontariuszy i innych członków zespołu, każdą z własnym poziomem dostępu, aby chronić swoje dane.

</div>

## Film szkoleniowy

<YouTube id="ZzCIkinVMnE" title="Role, uprawnienia i zapraszanie zespołu w B1" next="Konfigurowanie usług i obecności w B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz dostępu Domain Admin lub roli z uprawnieniem do zarządzania rolami
- Przygotuj listę członków zespołu i obszarów, do których potrzebują dostępu
- Zapoznaj się z dostępnymi kategoriami uprawnień poniżej, aby zaplanować role

</div>

## Dostęp do ról

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń **Settings**.
2. Kliknij **Roles**.
3. Strona Roles wyświetla wszystkie role zdefiniowane dla Twojego kościoła. Kolumna **Members** pokazuje, ilu użytkowników jest w każdej roli, a wiersz **(Everyone)** pokazuje **All users**.

## Omówienie strony Roles

Strona Roles jest podzielona na dwa panele:

- **Lewa strona** -- pokazuje listę członków przypisanych do wybranej roli.
- **Prawa strona** -- wyświetla ustawienia uprawnień, które możesz skonfigurować dla tej roli.

Kliknij nazwę dowolnej roli, aby wyświetlić i zarządzać jej członkami oraz uprawnieniami.

## Dodawanie użytkowników do roli

1. Wybierz rolę, do której chcesz dodać członków.
2. Użyj **pola wyszukiwania** po lewej stronie, aby znaleźć osobę, którą chcesz dodać.
3. Wybierz osobę z wyników wyszukiwania.
4. Zostanie ona natychmiast dodana do roli.

## Usuwanie użytkowników z roli

1. Wybierz rolę zawierającą użytkownika, którego chcesz usunąć.
2. Znajdź osobę na liście członków po lewej stronie.
3. Kliknij **przycisk usuwania** obok jej nazwiska.

## Konfigurowanie uprawnień

Każda rola może mieć przyznany dostęp do określonych obszarów B1 Admin. W panelu **Edit Permissions** uprawnienia są pogrupowane w sekcje, które możesz rozwinąć, takie jak **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups** i **Tasks**. Wpisz tekst w polu **Filter permissions**, aby wyświetlić tylko pasujące uprawnienia.

Zaznacz lub odznacz uprawnienie, aby przyznać je roli lub je odebrać. Nagłówek każdej sekcji pokazuje, ile jej uprawnień ma dana rola, na przykład **2 of 5**, a liczba aktualizuje się w miarę zaznaczania i odznaczania pól.

### Uprawnienia Donations

Sekcja **Donations** zawiera następujące uprawnienia:

- **View Donation Summaries** -- dostęp do sekcji Donations, w tym do stron Summary, Batches, Funds, Campaigns i Giving Statements.
- **View Donations** -- dostęp do poszczególnych darowizn, na przykład datków zawartych w partii.
- **Edit Donations** -- pełna kontrola: dodawanie, edycja i usuwanie darowizn oraz partii, a także [zamykanie i ponowne otwieranie partii](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- dodawanie partii oraz wprowadzanie, edycja lub usuwanie darowizn, ale tylko w partiach, które są nadal otwarte. Osoby posiadające wyłącznie to uprawnienie nie mogą usuwać partii, zamykać ich ani ponownie otwierać, ani zmieniać datków, które wpłynęły przez internetowe dawanie.
- **Edit Settings** -- zarządzanie ustawieniami darowizn.

Osoba z uprawnieniem **Enter Donations**, ale bez **View Donation Summaries**, widzi w sekcji **Donations** tylko stronę **Batches**. Przypisz zespołowi liczącemu zarówno **Enter Donations**, jak i **View Donations**, aby mógł otworzyć partię i zobaczyć wprowadzone datki. Szczegóły znajdziesz w sekcji [Who Can Change a Batch](../donations/batches.md#who-can-change-a-batch).

### Tylko imiona i nazwiska osób

Sekcja **People and Groups** zawiera uprawnienie **View People Names Only**. Używaj go dla wolontariuszy, którzy potrzebują wyszukiwać osoby po imieniu i nazwisku -- na przykład, aby wybrać kogoś w polu wyszukiwania -- bez dostępu do pełnego katalogu. Samo to uprawnienie pozwala osobie:

- Wyszukiwać osoby po imieniu i nazwisku oraz widzieć listę ostatnio dodanych osób, ale widzi tylko imię i nazwisko każdej osoby, jej zdjęcie i status członkostwa
- Nie może wyszukiwać po adresie e-mail, widzieć danych kontaktowych ani otwierać katalogu **People**

Połącz **View People Names Only** z **View Attendance** lub **Edit Attendance** dla wolontariuszy prowadzących obecność na zajęciach. Wtedy **People** w ich menu otwiera **Groups**, gdzie mogą otworzyć listę **All groups** i zobaczyć imiona członków oraz sesje każdej klasy. Z uprawnieniem **Edit Attendance** mogą także [rejestrować obecność](../attendance/recording-attendance.md) i dodawać odwiedzających, wyszukując ich po imieniu i nazwisku. Imiona i nazwiska nie są linkami do kart osób, a grupy poufne pozostają ukryte, chyba że wolontariusz jest ich członkiem.

B1 Admin ukrywa linki i przyciski wymagające uprawnień, których rola nie ma. Na przykład lista **All groups** jest dostępna tylko dla osób, które mogą edytować grupy, przeglądać członków grup lub osoby, albo które mają **View People Names Only** razem z **View Attendance** lub **Edit Attendance** (pozostałe są odsyłane na Dashboard). Konfiguracja obecności pojawia się tylko przy uprawnieniu **Edit Services**, a przycisk **Email** grupy -- tylko u osób z **Edit Group Members** (uprawnieniem potrzebnym do wysyłania e-maili do grupy). Drukowanie listy grupy wymaga **View Group Members** lub prowadzenia tej grupy, a usunięcie wydarzenia z kalendarza wymaga **Edit Content** (lub wycofania własnej oczekującej prośby).

### Konta kiosków Check-In

Konto, które loguje się do kiosku [B1 Checkin](../../b1-checkin/getting-started/logging-in.md), potrzebuje uprawnienia **Checkin** w sekcji **Attendance** (lub **Edit Attendance**). Z samym uprawnieniem **Checkin** kiosk może wyszukiwać rodziny po imieniu i nazwisku lub numerze telefonu, meldować je i wymeldowywać oraz pokazywać, kto może odebrać dziecko, bez dostępu do katalogu People.

Uprawnienie Checkin nie jest już przyznawane przez wiersz **(Everyone)**. Przynależność do roli z innymi uprawnieniami nie pozwala nikomu obsługiwać kiosku. Dodaj **Checkin** do roli, na przykład "Wolontariusze Check-In", i umieść w niej konta kiosków.

:::warning
**Domain Admins** mają pełny dostęp do wszystkich obszarów Twojego konta ChurchApps. Ich uprawnień nie można zmieniać ani ograniczać. Używaj tej roli wyłącznie dla najbardziej zaufanych administratorów.
:::

:::tip
Twórz konkretne role, na przykład "Skarbnik" z dostępem tylko do **Donations**, "Zespół liczący" z **Enter Donations** i **View Donations** albo "Wolontariusz Check-In" z dostępem tylko do **Attendance**. Zgodnie z zasadą najmniejszych uprawnień chroni to Twoje dane. Więcej o tym, jak ChurchApps chroni Twoje informacje, znajdziesz w artykule [Bezpieczeństwo danych](./data-security.md).
:::
