---
title: "Odtwarzanie zaplanowane na telewizorze"
description: "Sparowany telewizor FreePlay pobiera tydzień z wyprzedzeniem i gra według zegara, także offline. Opis panelu info, przycisków pilota i przypinania playlisty."
---

# Odtwarzanie zaplanowane na telewizorze

<div class="article-intro">

Gdy telewizor zostanie połączony z kalendarzem, FreePlay uruchomi go za Ciebie. Pobiera treści na nadchodzący tydzień, przełącza je o zaplanowanych porach i nadal odtwarza z własnej pamięci, jeśli połączenie z internetem zostanie przerwane. Nauczyciel lub wolontariusz może nadal wstrzymywać, pomijać i przeskakiwać między treściami za pomocą pilota telewizora.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- [Połącz telewizor z kalendarzem](./pairing-a-screen.md)
- [Dodaj coś do kalendarza](./scheduling-the-calendar.md) lub ustaw domyślną pętlę dla grupy, do której należy ekran

</div>

## Co telewizor robi samodzielnie

- **Od razu otwiera harmonogram** - Gdy połączony telewizor uruchamia FreePlay, przechodzi bezpośrednio do odtwarzacza z harmonogramem
- **Pobiera z wyprzedzeniem** - FreePlay pobiera wszystkie pliki zaplanowane na kolejne 7 dni oraz domyślną pętlę i odtwarza treści z pobranych plików
- **Odtwarza zgodnie z zegarem** - O każdej zaplanowanej godzinie rozpoczęcia ekran przełącza się na odpowiednie treści. Gdy nic nie jest zaplanowane, odtwarza domyślną pętlę grupy
- **Sprawdza zmiany** - FreePlay regularnie sprawdza w FreePlay Admin, czy zmieniono kalendarz, i pobiera wszystko, co nowe
- **Naprawia uszkodzone pliki** - Jeśli pobrany plik nie chce się odtworzyć, FreePlay go pomija i pobiera ponownie

Zanim dotrą pierwsze pliki, ekran pokazuje **Ładowanie harmonogramu...** lub **Pobieranie plików: X z Y**. Jeśli nic nie jest zaplanowane, a grupa nie ma domyślnej pętli, wyświetla się komunikat **Nic nie jest teraz zaplanowane**.

## Panel informacyjny

Naciśnij przycisk **Wybierz** na pilocie, aby otworzyć panel informacyjny. Zamyka się sam po kilku sekundach. Panel pokazuje:

- **Prawy górny róg** - **Gotowe do** i datę, do której wszystko jest pobrane, albo **Pobieranie**, gdy pliki wciąż napływają. Poniżej jest liczba pobranych plików i pasek postępu
- **Lewy dolny róg** - Nazwę odtwarzanych treści (lub **Domyślna pętla**), który element jest na ekranie oraz co będzie dalej i o której godzinie
- **Ostatnio sprawdzono** - Kiedy FreePlay ostatnio sprawdzał zmiany w harmonogramie

Panel zawiera także trzy przyciski:

- **Przypnij tę playlistę** - Zapętla bieżące treści i ignoruje kalendarz. Wybierz **Odepnij playlistę**, aby wrócić do harmonogramu
- **Przeglądaj treści** - Opuszcza odtwarzacz z harmonogramem, aby przeglądać podłączonych dostawców
- **Ustawienia** - Otwiera ustawienia FreePlay, gdzie możesz [odłączyć telewizor lub połączyć go z innym kalendarzem](./pairing-a-screen.md#changing-or-unpairing-from-the-tv)

:::tip
Aby wrócić do harmonogramu po przeglądaniu, naciśnij na pilocie przycisk **Wstecz** na ekranie **Dostawcy treści** albo otwórz **Ustawienia**, wybierz **Połącz z kalendarzem** i wybierz **Wróć do harmonogramu**. Połączony telewizor wraca też do odtwarzacza z harmonogramem zawsze, gdy FreePlay wraca na pierwszy plan, a po uruchomieniu zawsze otwiera się w odtwarzaczu z harmonogramem.
:::

## Przyciski pilota

| Przycisk pilota | Działanie |
|---|---|
| **Wybierz** | Otwiera panel informacyjny |
| **Odtwórz/Pauza** | Wstrzymuje lub wznawia odtwarzanie. Podczas pauzy widoczna jest ikona odtwarzania |
| **Strzałka w prawo** | Następny slajd lub film |
| **Strzałka w lewo** | Poprzedni slajd lub film |
| **Strzałka w górę** | Otwiera przegląd slajdów, aby przeskoczyć do dowolnego slajdu |
| **Przewijanie do przodu** | Przewija film o 10 sekund do przodu |
| **Przewijanie do tyłu** | Przewija film o 10 sekund do tyłu |
| **Wstecz** | Zamyka przegląd slajdów lub panel informacyjny albo otwiera panel informacyjny |

Przyciski następny i poprzedni działają tylko w ramach aktualnie odtwarzanych treści. Przechodzą od ostatniego elementu z powrotem do pierwszego tylko wtedy, gdy harmonogram jest ustawiony na zapętlanie. Przewijanie do przodu i do tyłu działa tylko podczas odtwarzania filmu. Na slajdzie nie robią nic.

### Przechodzenie do slajdu

Naciśnij **Górę**, aby otworzyć przegląd slajdów. Pokazuje on wszystkie elementy bieżącej playlisty lub lekcji. Przesuń zaznaczenie na wybrany element i naciśnij **Wybierz**, aby od razu do niego przejść.

## Lekcje prowadzone przez nauczyciela

Gdy harmonogram jest ustawiony na **Tempo nauczyciela**, slajdy graficzne nie przechodzą dalej samodzielnie. Nauczyciel przechodzi do przodu za pomocą **strzałki w prawo**. Film odtwarza się do końca, a potem przechodzi do następnego elementu.

Lekcja prowadzona przez nauczyciela pozostaje na ekranie po zaplanowanym czasie zakończenia, aż nauczyciel dojdzie do ostatniego slajdu i lekcja się zakończy. Dopiero wtedy ekran przechodzi do tego, co jest zaplanowane jako następne. Dzięki temu zajęcia, które się przeciągają, nie zostaną przerwane w połowie lekcji.

## Prezentacja w przeglądarce

Kalendarz ekranu możesz też odtworzyć w przeglądarce internetowej. W FreePlay Admin otwórz ekran na stronie **Ekrany** i kliknij **Prezentuj w przeglądarce**. Przeglądarka podąża za kalendarzem tego ekranu w taki sam sposób jak telewizor, a pasek sterowania pokazuje, co będzie dalej. Użyj **Spacji**, aby wstrzymać, **←** / **→**, aby przeskakiwać, **F**, aby przejść na pełny ekran, i **Esc**, aby wyjść.

## Powiązane artykuły

- **[Planowanie kalendarza](./scheduling-the-calendar.md)** - Ustaw, co ma być odtwarzane i co się stanie, gdy treść zakończy się wcześniej
- **[Zarządzanie ekranami i grupami](./managing-screens.md)** - Sprawdź pobrane pliki każdego ekranu w FreePlay Admin
- **[Odtwarzanie treści](../content-providers/playing-content.md)** - Sterowanie odtwarzaczem, gdy odtwarzasz treści samodzielnie
