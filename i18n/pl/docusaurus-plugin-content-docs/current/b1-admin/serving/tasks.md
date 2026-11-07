---
title: "Zadania"
description: "Twórz, przydzielaj i zamykaj zadania w B1 Admin. Znajdziesz je w Służba > Moja praca, a przypomnienia o terminie pomogą nie przeoczyć żadnych spraw."
---

# Zadania

<div class="article-intro">

Zadania pozwalają przypisywać czynności osobom lub grupom w Twoim kościele. Niezależnie od tego, czy chodzi o jednorazowe zadanie, czy o powtarzający się obowiązek, zadania pomagają śledzić, co trzeba zrobić i kto za to odpowiada, dzięki czemu nic nie zostanie przeoczone.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Upewnij się, że osoby lub [grupy](../groups/creating-groups.md), którym chcesz przypisać zadania, istnieją w B1 Admin
- W [menu Jump](../introduction.md#getting-around-with-the-jump-menu) wybierz **Służba > Moja praca**, aby zobaczyć zadania

</div>

## Przeglądanie zadań

W menu Jump wybierz **Służba > Moja praca** (lub wyszukaj „Moja praca"). Lista **Zadania** pokazuje tytuł każdego zadania, osobę lub grupę, której dotyczy, osobę, do której zostało przypisane, datę otwarcia oraz status. Twoje karty [procesów](./workflows.md) pojawiają się obok niej w sekcji **Moje karty**. Osoby, którym przypisano zadania, mogą także przeglądać swoje karty i otwarte zadania na ekranie **Ja** w aplikacji B1.

Użyj zakładek nad listą, aby przełączać się między zadaniami **Przypisane do mnie**, **Przypisane do moich grup** i **Zlecone przeze mnie**. Każda zakładka pokazuje liczbę zadań, które zawiera.

:::tip
Domyślnie wyświetlane są tylko otwarte zadania. Wybierz **Zamknięte** nad listą, aby zobaczyć zakończone zadania.
:::

## Tworzenie zadania

1. Na stronie **Moja praca** kliknij **Dodaj zadanie**. Otworzy się formularz **Nowe zadanie**.
2. Opcjonalnie kliknij pole **Dotyczy** i wybierz osobę lub grupę, której zadanie dotyczy. Pozostaw pole puste, jeśli jest to zwykłe zadanie niezwiązane z nikim konkretnym, na przykład przypomnienie dla siebie.
3. Kliknij pole **Przypisz do**. W oknie **Wybierz osobę lub grupę** wyszukaj osobę na karcie **Osoba** albo przełącz się na kartę **Grupa**, wyszukaj grupę i wybierz wynik.
4. Wpisz **Tytuł** zadania.
5. Opcjonalnie wybierz **Termin wykonania**.
6. Dodaj **Notatki** ze szczegółami lub instrukcjami dla osoby wykonującej zadanie.
7. Kliknij **Zapisz**.

Zadanie pojawi się na liście zadań i będzie widoczne dla osoby przypisanej na jej pulpicie oraz w aplikacji mobilnej.

## Zarządzanie zadaniem

Kliknij dowolne zadanie, aby otworzyć jego stronę szczegółów. Stamtąd możesz:

- **Zamknąć lub ponownie otworzyć zadanie** -- Kliknij **Zamknij zadanie**, gdy praca zostanie wykonana, lub **Otwórz ponownie**, aby ponownie je otworzyć.
- **Przypisać zadanie ponownie** -- Kliknij **Przypisz**, aby wybrać inną osobę lub grupę.
- **Zmienić, kogo dotyczy** -- Kliknij **Dotyczy**, aby wybrać inną osobę lub grupę, albo wybierz **Brak osoby lub grupy**, aby usunąć przypisanie.
- **Zmienić termin wykonania** -- Wybierz datę w polu **Termin**; zmiana zapisze się po kliknięciu poza pole. (Zadania utworzone w ramach [potwierdzenia przydziału do służby](./workflows.md#serving-assignment-confirmations) pokazują swój termin, ale nie można go tutaj zmienić.)
- **Dodać notatki** -- Publikuj aktualizacje lub szczegóły dla osoby przypisanej w notatkach zadania.
- **Ustawić przypomnienia** -- Zobacz [Przypomnienia o zadaniach](#task-reminders) poniżej.

## Przypomnienia o zadaniach

Zadanie z terminem może przypomnieć osobie przypisanej o zbliżającym się terminie.

1. Na stronie zadania kliknij **Edytuj** obok **Przypomnienia**.
2. Włącz opcję **Wysyłaj przypomnienia dla tego zadania**.
3. W sekcji **Kiedy wysłać przypomnienia?** wybierz do trzech terminów: **7 dni przed**, **3 dni przed**, **1 dzień przed** lub **W dniu terminu**.
4. Ustaw **Godzinę** i opcjonalnie **Wiadomość**.
5. W sekcji **Wyślij przez** wybierz **Powiadomienie push**, **E-mail** oraz, jeśli Twój kościół ma połączonego [dostawcę SMS-ów](../settings/church-settings.md#texting), **SMS**.
6. Kliknij **Zapisz przypomnienia**.

Jeśli zadanie nie ma terminu, B1 ostrzeże Cię, że przypomnienia nie zostaną wysłane, dopóki termin nie zostanie ustawiony w polu **Termin**. Przypomnienia SMS docierają tylko do osób, które włączyły **Wiadomości tekstowe** w [Ustawieniach powiadomień](../../b1-church/getting-started/notification-preferences.md), a każda wiadomość może generować koszty dla Twojego kościoła.

## Cykl życia zadania

1. Nowe zadanie zaczyna się ze statusem **Otwarte**.
2. Osoba przypisana otrzymuje powiadomienie i może przeglądać zadanie ze swojego pulpitu, z **Służba > Moja praca** lub z aplikacji mobilnej.
3. Gdy praca zostanie wykonana, osoba przypisana (lub administrator) klika **Zamknij zadanie**.
4. Zamknięte zadania znikają z domyślnego widoku, ale nadal można je znaleźć, wybierając **Zamknięte** nad listą zadań.

:::info
B1 Admin nie tworzy już zadań cyklicznych według harmonogramu. Do powtarzających się działań kontynuacyjnych z osobami użyj [procesu](./workflows.md) z [wyzwalaczem harmonogramu](./workflows.md#schedule-triggers).
:::

:::tip
Gdy chcesz przeprowadzić wiele osób przez te same etapy, na przykład obsługę nowych odwiedzających lub proces członkostwa, użyj [Procesów](./workflows.md). Procesy zamieniają zadania w karty na tablicy typu „przeciągnij i upuść" z krokami, terminami i kierowaniem.
:::

:::info
Niektóre zadania są tworzone automatycznie przez inne części B1 i otwierają się jako specjalna karta przeglądu zamiast standardowego widoku notatek i przypisania. [Prośby o dołączenie do grupy](../groups/group-join-requests.md#approving-from-the-tasks-page), [prośby o zmianę profilu](../profile/approving-profile-changes.md) oraz [prośby o usunięcie konta](../profile/account-deletion.md) działają właśnie w ten sposób.
:::

## Następne kroki

- Przeprowadź osoby przez wieloetapowy proces za pomocą [Procesów](./workflows.md)
- Użyj [Procesów](./workflows.md), aby automatycznie prowadzić osoby przez powtarzalne procesy
- Używaj zadań razem z [Planami nabożeństw](./plans.md), aby śledzić działania przygotowawcze do nabożeństw
