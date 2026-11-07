---
title: "Zatwierdzanie kalendarza"
---

# Zatwierdzanie kalendarza

<div class="article-intro">

Strona Zatwierdzenia to miejsce, w którym administratorzy przeglądają oczekujące żądania rezerwacji sal i zasobów oraz wydarzenia kalendarza wymagające zatwierdzenia przed publikacją, i podejmują decyzje w ich sprawie.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj sale lub zasoby z **grupą zatwierdzającą** w sekcji [Sale i zasoby](rooms-resources)
- Potrzebujesz uprawnienia **Administrator kalendarzy** lub uprawnienia **content.edit**

</div>

## Otwieranie zatwierdzeń

W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pole wyszukiwania w lewym górnym rogu), rozwiń **Kalendarze** i kliknij **Zatwierdzenia**. Tutaj są wyświetlane oczekujące żądania rezerwacji oraz wydarzenia czekające na przegląd.

## Żądania rezerwacji

Gdy grupa tworzy wydarzenie i prosi o salę lub zasób, żądanie pojawia się w sekcji **Żądania sal i zasobów**. Każdy wiersz pokazuje:

- Nazwę wydarzenia oraz datę i godzinę
- Salę lub zasób, o który wnioskowano (wraz z liczbą sztuk w przypadku zasobów wielosztukowych)
- Znacznik statusu informujący, czy żądanie ma konflikty

### Wskaźniki konfliktów

Jeśli żądanie nakłada się na inną rezerwację lub blokadę tej samej sali bądź zasobu, jego status pokazuje znacznik **Konflikty**; najedź na niego kursorem, aby zobaczyć szczegóły. Żądania bez nakładania się mają status **Brak konfliktów**. Przed zatwierdzeniem któregokolwiek z konfliktujących żądań sprawdź je dokładnie.

### Zatwierdzanie lub odrzucanie

Kliknij **Zatwierdź** lub **Odrzuć** przy dowolnym żądaniu rezerwacji (odrzucenie wymaga wcześniejszego potwierdzenia). Grupa składająca żądanie zostaje powiadomiona o decyzji. Zatwierdzone rezerwacje blokują daną salę lub zasób na czas wydarzenia; odrzucone rezerwacje zwalniają termin dla innych.

Gdy klikniesz **Zatwierdź**, otworzy się okno **Zatwierdź rezerwację**, w którym możesz od razu opublikować wydarzenie:

1. Zaznacz **Opublikuj w kalendarzu publicznym**, aby wydarzenie było widoczne w kalendarzu jego grupy. Pozostaw pole niezaznaczone, aby zatwierdzić rezerwację bez zmiany widoczności wydarzenia.
2. Gdy zaznaczysz **Opublikuj w kalendarzu publicznym**, możesz opcjonalnie wybrać kalendarz kuratorski z listy **Dodaj również do kalendarza**, aby dodać wydarzenie także do jednego z [kalendarzy kuratorskich](curated-calendar). Pozostaw ustawienie **Brak**, jeśli nie chcesz tego robić. (Ta opcja pojawia się tylko wtedy, gdy masz uprawnienie **content.edit**).
3. Kliknij **Zatwierdź**.

## Oczekujące wydarzenia

Jeśli w Twoim procesie pracy z kalendarzem wydarzenia muszą być zatwierdzone, zanim staną się widoczne dla opinii publicznej, oczekujące wydarzenia pojawiają się w sekcji **Żądania wydarzeń**. Kliknij **Zatwierdź**, aby opublikować wydarzenie w kalendarzu, lub **Odrzuć**, aby powiadomić osobę zgłaszającą, że potrzebne są zmiany.

:::tip
Ustaw grupę zatwierdzającą dla sali w sekcji [Sale i zasoby](rooms-resources), aby wymagać zatwierdzenia rezerwacji tej sali. Grupy z dostępem mogą wtedy prosić o salę podczas tworzenia wydarzeń, a takie żądania trafią na tę stronę.
:::

## Powiązane artykuły

- [Sale, zasoby i planowanie](rooms-resources) — konfigurowanie sal i zasobów do rezerwacji
- [Tworzenie kalendarzy](creating-calendars) — zarządzanie kalendarzami i wydarzeniami
