---
title: "Projektant etykiet zameldowania"
description: "Dostosuj szablony identyfikatorów i kwitków odbioru drukowanych przy meldowaniu w B1 Admin, w tym pola, pozycjonowanie oraz warunki dla urodzin i uwag."
---

# Projektant etykiet zameldowania

<div class="article-intro">

Projektant etykiet pozwala tworzyć i dostosowywać szablony plakietek z imieniem oraz kwitków odbioru, które drukują się przy meldowaniu dzieci. Możesz dokładnie określić, jakie informacje pojawiają się na każdej etykiecie, gdzie są umieszczone i jak wyglądają.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj [Frekwencję](./setup.md) i ustaw co najmniej jedną porę nabożeństwa z włączonym zameldowaniem
- Skonfiguruj [Zameldowanie](./check-in.md), aby etykiety były drukowane
- Potrzebujesz uprawnień administratora w sekcji Frekwencja

</div>

## Otwieranie projektanta etykiet

W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Mobile** i kliknij **B1 CheckIn**. Następnie kliknij przycisk **Design Labels** na karcie Check-in Labels. Zobaczysz listę zapisanych szablonów etykiet, podzieloną na typy: **Nametag** (plakietka) i **Pickup Slip** (kwitek odbioru).

## Typy etykiet

- **Nametag** (plakietka) — drukowana i przypinana do dziecka. Zwykle zawiera imię dziecka, jego grupę/sesję oraz kod bezpieczeństwa.
- **Pickup Slip** (kwitek odbioru) — wydawany rodzicowi lub opiekunowi. Zwykle zawiera kod bezpieczeństwa oraz listę dzieci, które zostały zameldowane.

B1 udostępnia domyślnie szablon plakietki i kwitka odbioru, dopasowane do standardowych termicznych etykiet o wymiarach 3,5 × 1,1 cala.

## Tworzenie szablonu etykiety

1. Kliknij **Add** i wybierz punkt wyjścia z menu: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** lub **Blank** (pusty).
2. Nowy szablon otworzy się w edytorze etykiet.

### Edytor etykiet

Edytor pokazuje przeskalowany podgląd etykiety w skonfigurowanym rozmiarze. W lewym panelu możesz ustawić:

- **Name** — nazwa szablonu (tylko do Twojej wiadomości)
- **Label Type** — Nametag (plakietka) lub Pickup Slip (kwitek odbioru)
- **Width / Height** — szerokość i wysokość etykiety w calach

### Dodawanie bloków

Etykieta składa się z bloków — pojedynczych elementów treści umieszczonych na polu etykiety. Kliknij **Add Block**, aby wstawić nowy blok, i wybierz jego typ:

- **Field** (pole) — pobiera wartość danych w momencie druku:
  - `person.displayName` — pełne imię i nazwisko osoby
  - `sessions` — nabożeństwo lub grupa, do której osoba się zameldowała
  - `securityCode` — losowo wygenerowany kod bezpieczeństwa do odbioru
  - `children` — lista dzieci (dla kwitków odbioru)
  - `person.nametagNotes` — ewentualne uwagi specjalne w karcie osoby
  - `person.isBirthdayWeek` — wartość true, jeśli urodziny osoby (miesiąc i dzień) przypadają nie więcej niż 3 dni przed lub po dacie zameldowania
  - `campus` — nazwa kampusu
- **Text** (tekst) — tekst statyczny, który wpisujesz (np. nagłówki, opisy lub instrukcje)
- **Barcode** (kod kreskowy) — kod kreskowy zawierający kod bezpieczeństwa

### Ustawianie położenia bloków

Każdy blok ma pola **X**, **Y**, **Width** (szerokość) i **Height** (wysokość), wyrażone w procentach pola etykiety (0–100). Dostosuj je, aby precyzyjnie ustawić treść. Możesz też ustawić:

- **Font Size** (rozmiar czcionki) — wielkość tekstu w punktach
- **Bold** (pogrubienie) — przełącznik pogrubienia tekstu
- **Align** (wyrównanie) — wyrównanie tekstu do lewej, do środka lub do prawej
- **Condition** (warunek) — opcjonalne ukrycie bloku, jeśli pole jest puste (na przykład wyświetlanie `person.nametagNotes` tylko wtedy, gdy ma wartość). Działa to także z `person.isBirthdayWeek`, dzięki czemu grafika lub tekst urodzinowy pojawią się tylko na plakietkach dzieci, których urodziny przypadają kilka dni przed lub po zameldowaniu lub w ich pobliżu.

### Zapisywanie

Kliknij **Save**, aby zapisać szablon. Zaktualizowany szablon zostanie użyty przy następnym drukowaniu etykiet w B1 Checkin.

## Zmiana kolejności szablonów

Jeśli masz kilka szablonów plakietek lub kwitków odbioru, B1 Checkin domyślnie użyje pierwszego szablonu z listy. Aby zmienić kolejność, przeciągnij szablony.

## Usuwanie szablonu

Kliknij ikonę usuwania w wierszu wybranego szablonu i potwierdź. Usunięcie ostatniego szablonu danego typu przywraca domyślny wbudowany szablon.

:::tip
Po edycji szablonu wydrukuj próbną etykietę, aby upewnić się, że układ wygląda poprawnie, zanim rozpocznie się kolejne nabożeństwo.
:::

## Powiązane artykuły

- [Konfiguracja zameldowania](./setup.md) — konfiguracja nabożeństw i grup na potrzeby zameldowania
- [Przeprowadzanie zameldowania](./check-in.md) — proces zameldowania dla rodzin
- [Pierwsze kroki z B1 Checkin](../../b1-checkin/getting-started/index.md) — aplikacja kiosku Checkin
