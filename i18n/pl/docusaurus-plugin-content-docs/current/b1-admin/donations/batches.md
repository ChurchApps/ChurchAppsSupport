---
title: "Partie darowizn"
description: "Grupuj ofiary w partie w B1 Admin, a następnie zamykaj, drukuj lub eksportuj każdą z nich, aby sumy zgadzały się z wpłatami na konto bankowe."
---

# Partie darowizn

<div class="article-intro">

Partie grupują darowizny w jedną całość, co ułatwia ich śledzenie i uzgadnianie. Typowa partia odpowiada jednej zbiórce, na przykład ofierze niedzielnej lub specjalnemu wydarzeniu. Dzięki partiom łatwiej zachować porządek i sprawdzić, czy zapisy zgadzają się z faktycznymi wpłatami na konto.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Upewnij się, że [fundusze są skonfigurowane](funds.md), aby były dostępne podczas rejestrowania darowizn
- Aby zobaczyć stronę Partie, potrzebujesz uprawnienia **Podgląd podsumowań darowizn**, **Edycja darowizn** lub **Wprowadzanie darowizn** (zob. [Kto może zmieniać partię](#who-can-change-a-batch))

</div>

## Strona Partie

Po przejściu do **Ofiary > Partie** zobaczysz listę swoich partii. Każdy wiersz zawiera:

- **Nazwa** – nazwa, jaką nadano partii
- **Data** – data zbiórki
- **Darowizny** – liczba pojedynczych darowizn w partii
- **Suma** – łączna kwota w złotych
- **Status** – **Otwarta** lub **Zamknięta** (zob. [Zamykanie i ponowne otwieranie partii](#closing-and-reopening-a-batch))

Nad listą przyciski z rokiem pozwalają pokazać tylko partie z wybranego roku lub wszystkie partie (**Wszystkie**). Jednowierszowe podsumowanie pokazuje liczbę partii, liczbę darowizn i łączną kwotę dla wyświetlanych partii.

## Tworzenie nowej partii

1. Kliknij **Dodaj partię** na górze strony.
2. Wpisz opisową nazwę (np. „Ofiara niedzielna - 9 lutego”).
3. Wybierz datę zbiórki.
4. Kliknij **Zapisz**.

Nowa partia pojawi się na liście, gotowa do dodawania darowizn.

## Praca z partiami

- **Wyświetlanie darowizn** – kliknij nazwę partii, aby ją otworzyć i zobaczyć wszystkie zawarte w niej darowizny. Stamtąd możesz dodawać, edytować lub usuwać darowizny albo kliknąć **Importuj CSV**, aby dodać wiele darowizn naraz z arkusza kalkulacyjnego (zob. [Importowanie darowizn z pliku CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Edycja szczegółów partii** – kliknij przycisk **Edytuj** w wierszu partii, aby zmienić jej nazwę lub datę. Tylko osoby z uprawnieniem **Edycja darowizn** mogą usunąć partię.
- **Sortowanie** – użyj nagłówków kolumn, aby sortować partie według nazwy lub daty.
- **Eksport** – kliknij **Eksportuj** na górze strony, aby pobrać wyświetlane partie jako arkusz kalkulacyjny (CSV).
- **Zdarzenia z błędami** – jeśli bramka płatnicza zgłosiła problemy, na górze strony pojawi się przycisk **Zdarzenia z błędami** (z liczbą nierozwiązanych zdarzeń). Kliknij go, aby pokazać lub ukryć listę zdarzeń pod partiami.
- **Import ze Stripe** – kliknij **Importuj brakujące transakcje Stripe** na górze strony, aby otworzyć narzędzie [Import Stripe](stripe-import.md). Przycisk pojawia się tylko wtedy, gdy bramką płatniczą parafii jest Stripe.

## Kto wprowadził darowiznę

Każda darowizna wpisana do partii pokazuje pole **Wprowadzone przez** oraz imię i nazwisko osoby pod nazwiskiem darczyńcy, dzięki czemu wiadomo, kto ją wprowadził, bez używania listy podpisów. B1 zapisuje to automatycznie na podstawie zalogowanego użytkownika, a późniejsza edycja darowizny tego nie zmienia. Darowizny zaimportowane przez **Importuj CSV** pokazują osobę, która uruchomiła import.

Darowizny online, darowizny dodane przez narzędzie [Import Stripe](stripe-import.md) oraz darowizny wprowadzone przed dodaniem tej funkcji w listopadzie 2026 r. nie pokazują nazwiska.

## Zamykanie i ponowne otwieranie partii

Gdy partia zostanie policzona i wpłacona na konto, zamknij ją, aby jej darowizny pozostały dokładnie takie, jakie były w chwili zamknięcia.

1. Otwórz partię.
2. Kliknij **Zamknij partię** na górze strony.

Znacznik statusu obok nazwy partii zmieni się z **Otwarta** na **Zamknięta**, partia pokaże **Zamknięta** w kolumnie **Status** na stronie Partie, a na górze partii pojawi się komunikat informujący, że jest zamknięta. Gdy partia jest zamknięta, osoby z uprawnieniem **Wprowadzanie darowizn** nadal mogą ją przeglądać, ale nie mogą dodawać, edytować ani usuwać jej darowizn, ani zmieniać nazwy czy daty partii.

Aby ponownie wprowadzać zmiany, otwórz partię i kliknij **Otwórz ponownie partię**. Nowe partie zawsze zaczynają jako otwarte.

:::info
Przyciski **Zamknij partię** i **Otwórz ponownie partię** widzą tylko osoby z uprawnieniem **Edycja darowizn**. Mogą one również poprawiać darowizny w zamkniętej partii, jeśli potrzebna jest korekta, bez ponownego otwierania partii.
:::

## Kto może zmieniać partię

Dwa [uprawnienia ról](../settings/roles-permissions.md) pozwalają pracować z partiami:

- **Edycja darowizn** – pełny dostęp: dodawanie i usuwanie partii, zamykanie i ponowne otwieranie ich oraz dodawanie, edycja lub usuwanie dowolnej darowizny, niezależnie od tego, czy partia jest otwarta, czy zamknięta.
- **Wprowadzanie darowizn** – dla zespołów liczących i wolontariuszy wprowadzających ofiary. Mogą dodawać partie oraz dodawać, edytować lub usuwać darowizny, ale tylko wtedy, gdy partia jest otwarta. Nie mogą usuwać partii, zamykać ich ani ponownie otwierać, ani zmieniać darowizn przyjętych przez zbiórkę online.

Osoba z uprawnieniem **Wprowadzanie darowizn**, ale bez **Podgląd podsumowań darowizn**, widzi w menu administracyjnym B1 pozycję **Ofiary**, która prowadzi bezpośrednio do strony Partie. Pozycje **Podsumowanie**, **Fundusze**, **Kampanie** i **Zestawienia darowizn** są przed nią ukryte. Aby otworzyć partię i zobaczyć zawarte w niej darowizny, rola potrzebuje też uprawnienia **Podgląd darowizn**.

:::tip
Typowa konfiguracja to rola „Zespół liczący” z uprawnieniami **Wprowadzanie darowizn** i **Podgląd darowizn** oraz skarbnik z uprawnieniem **Edycja darowizn**, który zamyka każdą partię po uzgodnieniu wpłaty na konto.
:::

## Drukowanie partii

Otwórz partię i kliknij **Drukuj** nad listą darowizn, aby wydrukować kopię papierową dla zespołu liczącego lub do dokumentacji wpłat. Wydruk zawiera:

- Nagłówek parafii – logo (**Logo na jasnym tle** z [Strona internetowa > Wygląd](../website/appearance.md), jeśli je wgrano) z nazwą parafii pod spodem – następnie nazwę partii i jej datę
- Każdą darowiznę w partii wraz z imieniem i nazwiskiem darczyńcy, osobą, która ją wprowadziła, sposobem płatności, uwagami, datą i kwotą (darowizny zwrócone są przekreślone i oznaczone jako zwrot)
- **Sumy cząstkowe funduszy** – łączna kwota przekazana na każdy fundusz w partii
- **Suma partii** – łączna kwota za całą partię

Przycisk **Drukuj** pojawia się dopiero wtedy, gdy partia zawiera co najmniej jedną darowiznę.

### Drukowanie kilku partii naraz

Aby wydrukować wszystkie partie z danego okresu za jednym razem – na przykład wszystkie wpłaty z poprzedniego miesiąca – kliknij **Drukuj** na górze strony **Partie**, obok **Eksportuj**. Otworzy się strona **Drukowanie partii** z polami **Data początkowa** i **Data końcowa**, które odpowiadają partiom na ekranie: od 1 stycznia do 31 grudnia wybranego roku lub od najwcześniejszej do najpóźniejszej daty partii, gdy wybrano **Wszystkie**. Możesz zmienić którąkolwiek z dat, aby wybrać inny zakres.

Każda partia z datą w tym zakresie (łącznie z datami początkową i końcową) zostanie wydrukowana w kolejności dat, po jednej partii na stronę, w tym samym układzie co wydruk pojedynczej partii. Partie bez darowizn są pomijane. Jeśli żadna partia w zakresie nie zawiera darowizn, zobaczysz komunikat „Brak partii z darowiznami w tym zakresie dat.”. Kliknij **Drukuj**, aby otworzyć okno drukowania przeglądarki, lub **Zamknij**, aby wrócić do listy partii.

## Eksport partii do QuickBooks Online

Otwórz partię i kliknij **Eksportuj do QuickBooks**, aby pobrać partię jako zapis dziennika, który QuickBooks Online może zaimportować (**Ustawienia > Importuj dane > Zapisy dziennika**). Plik zawiera jedno obciążenie konta **Środki niezdeponowane** na sumę partii oraz jeden uznanie dla każdego funduszu, z nazwą funduszu jako nazwą konta. Podczas importu QuickBooks poprosi o dopasowanie tych nazw do planu kont, więc nazywaj fundusze tak, jak księgowy nazywa konta przychodów, albo ustaw dopasowanie jednorazowo podczas importu.

:::tip
Nazywaj partie w spójny sposób, aby były łatwe do odnalezienia później. Dodanie daty i rodzaju zbiórki (np. „Niedziela rano - 2025-02-09”) pomoże utrzymać porządek w miarę powiększania się listy.
:::

## Kolejne kroki

Gdy masz już partię, zobacz [Rejestrowanie darowizn](recording-donations.md), aby dowiedzieć się, jak dodawać do niej pojedyncze darowizny. Możesz też [zaimportować transakcje Stripe](stripe-import.md), aby automatycznie tworzyć partie z darowizn online.
