---
title: "Kalendarz dostępności"
description: "Skonfiguruj sale i sprzęt w B1 Admin, rezerwuj je w kalendarzu, dodaj bufory czasowe i obsłuż rezerwacje cykliczne oraz wymagające zatwierdzenia."
---

# Kalendarz dostępności

<div class="article-intro">

Kalendarz dostępności daje ogólny widok wszystkich rezerwacji sal i zasobów w Twoim kościele. Stąd możesz zobaczyć, co jest zaplanowane, wychwycić konflikty, zanim do nich dojdzie, i zarezerwować salę lub zasób na dowolne wydarzenie bezpośrednio.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj co najmniej jedną [salę lub zasób](./rooms-resources.md) w sekcji Pokoje i zasoby
- Potrzebujesz uprawnień do edycji w sekcji Kalendarze w B1 Admin

</div>

## Otwieranie kalendarza dostępności

W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Kalendarze** i kliknij **Dostępność**.

## Odczytywanie kalendarza

Kalendarz domyślnie wyświetla bieżący miesiąc. Możesz przechodzić do przodu i do tyłu za pomocą strzałek u góry lub przełączać się między widokami miesiąca, tygodnia i dnia.

Każde wydarzenie jest oznaczone kolorem zgodnie ze statusem rezerwacji:

| Kolor | Znaczenie |
|-------|-----------|
| Zielony | Zatwierdzona |
| Pomarańczowy | Oczekuje na zatwierdzenie |
| Szary | Zablokowana (niedostępna) |

Po najechaniu kursorem na wydarzenie pojawia się jego tytuł oraz sala lub zasób, do którego jest przypisane.

## Filtrowanie według sali lub zasobu

Użyj listy rozwijanej **Sala / Zasób** w lewym górnym rogu, aby zawęzić kalendarz do jednej sali lub zasobu. Wybierz **Wszystkie sale i zasoby**, aby wrócić do pełnego widoku.

## Rezerwowanie sali lub zasobu

1. Kliknij przycisk **Zarezerwuj** u góry strony.
2. W otwartym oknie wypełnij szczegóły wydarzenia:
   - **Tytuł** — nazwa wydarzenia
   - **Początek** i **Koniec** — data i godzina
   - **Widoczność** — Publiczne lub Prywatne
   - **Sale** — wybierz jedną lub więcej sal do zarezerwowania
   - **Zasoby** — wybierz jeden lub więcej zasobów do zarezerwowania
3. Opcjonalnie ustaw czas **Przygotowania** i **Sprzątania** (w minutach). Dodają one bufor przed i po rezerwacji, dzięki czemu przestrzeń jest zarezerwowana na przygotowanie i sprzątanie, mimo że godziny początku i końca wydarzenia pozostają bez zmian.
4. Aby powtarzać rezerwację, zaznacz **Powtarzaj** i skonfiguruj cykliczność:
   - **Powtarzaj co** -- ustaw interwał (na przykład co 2 tygodnie).
   - **Częstotliwość** -- Codziennie, Co tydzień lub Co miesiąc. Opcja Co tydzień pozwala wybrać konkretne dni tygodnia; opcja Co miesiąc pozwala wybrać stały dzień miesiąca lub wzorzec względny, np. „drugi wtorek”.
   - **Kończy się** -- Nigdy, w określonym dniu lub po ustalonej liczbie powtórzeń.
5. Aby określić niestandardowe okno rezerwacji (inne niż początek i koniec wydarzenia), przełącz opcję **Niestandardowe okno rezerwacji** i wpisz godziny początku i końca okna. Użyj tej opcji, gdy sala musi być dostępna poza godzinami wydarzenia.
6. Kliknij **Zapisz**, aby wysłać rezerwację.

:::info
Jeśli dla sali lub zasobu skonfigurowano **Grupę zatwierdzającą**, rezerwacja pojawi się jako **Oczekująca**, dopóki lider tej grupy jej nie zatwierdzi. Proces zatwierdzania opisano w artykule [Zatwierdzanie w kalendarzu](./approvals.md).
:::

:::tip
Kalendarz podświetli wszelkie konflikty przed zapisaniem. Jeśli zobaczysz ostrzeżenie o konflikcie, zmień godziny lub wybierz inną salę.
:::

## Powiązane artykuły

- [Pokoje, zasoby i planowanie](./rooms-resources.md) — konfigurowanie miejsc i sprzętu do rezerwacji
- [Zatwierdzanie w kalendarzu](./approvals.md) — zatwierdzanie lub odrzucanie próśb o rezerwację
- [Tworzenie kalendarzy](./creating-calendars.md) — zarządzanie kalendarzami wydarzeń
