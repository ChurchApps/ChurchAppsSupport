---
title: "Dokončení přihlášení"
description: "Dokončete přihlášení rodiny na kiosku v B1 Checkin, včetně limitů místností, tisku štítků, bezpečnostních kódů pro vyzvednutí a toho, co aplikace udělá dál."
---

Chyba: tento soubor je polský, ne český. Níže je správný překlad do polštiny.

---
title: "Finalizacja zameldowania"
description: "Dokończ zameldowanie rodziny na kiosku w B1 Checkin, obejmuje limity pomieszczeń, drukowanie etykiet, kody bezpieczeństwa do odbioru dzieci i to, co aplikacja robi dalej."
---

# Finalizacja zameldowania

<div class="article-intro">

Gdy sprawdzisz swoje gospodarstwo domowe i przypiszesz grupy, jeśli jest to potrzebne, możesz zakończyć zameldowanie. To ostatni krok w przepływie na kiosku — aplikacja zapisuje frekwencję, drukuje etykiety i resetuje się dla następnej rodziny.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- [Sprawdź swoje gospodarstwo domowe](./household-review.md) na ekranie przeglądu gospodarstwa domowego
- [Przypisz grupy](./group-assignment.md) członkom rodziny, którzy mają zameldować się w konkretnej klasie lub programie
- Opcjonalnie [dodaj gości](./adding-guests.md), którzy odwiedzają wraz z twoją rodziną

</div>

## Jak się zameldować

1. Na **ekranie przeglądu gospodarstwa domowego** dotknij przycisku **Zamelduj** u dołu ekranu.
2. Aplikacja wysyła dane o frekwencji na serwer i pokazuje **ekran sukcesu** z zieloną ikoną wyboru oraz powitalną wiadomością.

To wszystko. Frekwencja twojej rodziny została zapisana.

Jeśli ktoś z wybranych osób już zameldował się na dzisiejsze nabożeństwo, najpierw pojawi się okno **Już zameldowany**, które podaje ich imiona. Dotknij **Zamelduj ponownie**, aby zapisać nowe wybory grup, lub **Anuluj**, aby wrócić do ekranu gospodarstwa domowego.

## Pełne pomieszczenia i proporcje wolontariuszy

Jeśli twój kościół ustawił [limity bezpieczeństwa](../../b1-admin/attendance/checkin-safety.md) dla swoich pomieszczeń, serwer sprawdza je przed zapisem:

- Jeśli wybrane pomieszczenie jest **pełne lub zamknięte**, zameldowanie nie zostaje zakończone, a aplikacja podaje nazwę pomieszczenia, abyś mógł wybrać inne.
- Jeśli pora nabożeństwa ma [harmonogram zameldowania](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), a okno zameldowania nie jest obecnie otwarte, zameldowanie do pomieszczeń tej pory również zostaje odrzucone. Ekran **Nie można jeszcze się zameldować** wyświetla pomieszczenie z powodem „zameldowanie nie jest obecnie otwarte”; dotknij **Zmień pomieszczenia**, aby wybrać inną porę nabożeństwa lub grupę. (Pory nabożeństw, które są już zamknięte, są oznaczone jako **Zamknięte** na [ekranie gospodarstwa domowego](./household-review.md) i nie można ich wybrać, więc zwykle zobaczysz ten komunikat tylko wtedy, gdy okno zamknie się w trakcie zameldowania).
- Gospodarstwo domowe, które zameldowało się na wcześniejszą porę nabożeństwa, może wrócić później i dodać otwartą porę, nawet po zamknięciu wcześniejszego okna. Ich dotychczasowe zameldowania są zachowane i nie powodują odrzucenia nowego zameldowania.
- Jeśli w pomieszczeniu dla dzieci **brakuje wolontariuszy** do ustalonej proporcji, aplikacja albo wyświetli ostrzeżenie, które członek personelu może potwierdzić, aby kontynuować, albo całkowicie zablokuje zameldowanie — w zależności od tego, jak twój kościół skonfigurował egzekwowanie proporcji.

## Drukowanie etykiet

Jeśli skonfigurowano drukarkę sieciową, aplikacja automatycznie drukuje etykiety po zameldowaniu:

- **Etykiety z imionami** są drukowane dla każdej osoby przypisanej do grupy, w której włączono ustawienie **Drukuj identyfikator**. Etykiety zawierają imię i nazwisko osoby, przypisaną grupę oraz informacje o alergiach lub uwagach, jeśli takie są zapisane.
- **Kwitki do odbioru dziecka** są drukowane, gdy zameldowana osoba należy do grupy z włączonym ustawieniem **Odbiór przez rodzica**. Osoby zameldowane jako **Wolontariusz** są pomijane, więc opiekun dzieci obsługujący pomieszczenie z odbiorem przez rodzica nie otrzymuje kwitka. Kwitek zawiera listę dzieci, ich przypisane grupy oraz unikalny **4-znakowy kod bezpieczeństwa**.

:::info
Ten sam kod bezpieczeństwa pojawia się zarówno na etykiecie dziecka, jak i na kwitku rodzica. Podczas odbioru wolontariusze porównują kody, aby sprawdzić, czy dane dziecko odbiera właściwy dorosły.
:::

Kod bezpieczeństwa jest generowany od nowa przy każdym zameldowaniu i zawiera wyłącznie spółgłoski oraz cyfry (samogłoski są wykluczone, aby nie tworzyć niestosownych słów).

:::warning
Jeśli etykiety nie są drukowane, otwórz Ustawienia administratora, dotykając **logo kościoła** siedem razy, a następnie dotknij **Zmień drukarkę**, aby sprawdzić połączenie z drukarką. Kroki rozwiązywania problemów znajdziesz w [Konfiguracja drukarki](../getting-started/printer-setup.md).
:::

## Co dzieje się po zameldowaniu

- Jeśli drukarka jest skonfigurowana, aplikacja drukuje wszystkie etykiety, a następnie automatycznie wraca do **ekranu wyszukiwania**, gotowa dla następnej rodziny.
- Jeśli drukarka nie jest skonfigurowana, aplikacja również automatycznie wraca do **ekranu wyszukiwania**.

W obu przypadkach ekran sukcesu pozostaje widoczny przez co najmniej 6 sekund od chwili pojawienia się (8 sekund, gdy świętuje osiągnięcie kamienia milowego frekwencji), aby rodziny mogły zobaczyć, że zameldowanie się powiodło. Jeśli drukowanie trwa dłużej, aplikacja wraca około półtorej sekundy po zakończeniu drukowania.

Nie musisz nic dotykać, aby wrócić do ekranu wyszukiwania — aplikacja obsługuje przejście automatycznie. Gdy ekran wyświetla się przez chwilę, możesz go dotknąć, aby wrócić od razu; dotknięcie w pierwszej półtorej sekundy jest ignorowane, więc szybkie podwójne dotknięcie przycisku **Zamelduj** nie spowoduje pominięcia ekranu.

:::tip
Aplikacja resetuje się całkowicie po każdym zameldowaniu, więc nie ma ryzyka, że jedna rodzina zobaczy informacje innej rodziny.
:::

## Co zostaje zapisane

Gdy dotkniesz **Zamelduj**, aplikacja wysyła na serwer następujące dane dla każdego członka gospodarstwa domowego, który ma przypisaną grupę:

- **Osobę**, która się melduje
- **Nabożeństwo**, na które przychodzi
- **Porę nabożeństwa** i **grupę**, do których jest przypisana

Te dane pojawiają się w B1 Admin w sekcji Frekwencja, gdzie administratorzy kościoła mogą przeglądać i zarządzać rekordami frekwencji. Szczegóły znajdziesz w [przewodniku administracyjnym zameldowania](../../b1-admin/attendance/check-in.md).
