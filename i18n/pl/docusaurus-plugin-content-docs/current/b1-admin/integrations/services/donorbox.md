---
title: "Donorbox"
description: "Połącz Donorbox z B1 Admin przez Zapier, aby darowizny online automatycznie tworzyły rekordy darowizn i profile darczyńców, bez ręcznego eksportu."
---

# Donorbox

<div class="article-intro">

Jeśli Twój kościół przyjmuje darowizny przez Donorbox, ale śledzi osoby i wyciągi w B1, możesz sprawić, by natychmiastowe wyzwalacze Zapier z Donorbox tworzyły odpowiadające im rekordy darowizn w B1, a także tworzyły darczyńcę jako osobę w B1, jeśli jeszcze nie istnieje. Bez ręcznego uzgadniania i bez comiesięcznego eksportu.

</div>

<div class="prereqs">
<h4>Przed rozpoczęciem</h4>

- Konto [Donorbox](https://donorbox.org) z co najmniej jedną kampanią
- Konto [Zapier](https://zapier.com)
- Użytkownik B1Admin z uprawnieniem **Edycja ustawień**

</div>

## Co można skonfigurować

| Kierunek | Wyzwalacz Donorbox | Akcja B1 |
|---|---|---|
| Donorbox → B1 | Nowa lub zaktualizowana darowizna (natychmiastowy) | Znajdź osobę → Dodaj darowiznę |
| Donorbox → B1 | Nowy lub zaktualizowany darczyńca | Utwórz osobę |
| Donorbox → B1 | Nowy lub zaktualizowany plan (cykliczny) | Znajdź osobę → Dodaj darowiznę (użyj identyfikatora planu jako notatki) |

Donorbox publikuje wyzwalacze jako **natychmiastowe**. Uruchamiają się w ciągu kilku sekund od rzeczywistej darowizny, bez opóźnienia wynikającego z odpytywania.

## Konfiguracja

### 1. Wygeneruj klucz API B1

W B1Admin: **Ustawienia → Deweloper → Klucze API → Nowy klucz API**. Zakresy:

- `people:read` — do wyszukania darczyńcy po adresie e-mail
- `people:write` — do utworzenia go, jeśli jest nowy
- `donations:write` — do zarejestrowania darowizny

Wyzwalacze w tym kierunku należą do Donorbox, a nie do B1, więc nie potrzebujesz tutaj zakresu `settings:write`.

### 2. Zbuduj Zap „rejestruj darowiznę"

1. **Wyzwalacz** — Donorbox: New Donation. Połącz kluczem API Donorbox (w Donorbox: *Konto → Profil → Ustawienia API*).
2. **Akcja** — B1.church: Find Person. Zmapuj adres e-mail darczyńcy z wyzwalacza na pole wyszukiwania *Email*.
3. **Akcja** — Filter by Zapier (opcjonalnie): kontynuuj tylko wtedy, gdy darczyńca nie został znaleziony, a następnie…
4. **Akcja** — B1.church: Create Person. Zmapuj imię, nazwisko i e-mail, tak aby darczyńca został dodany jako członek, a nie tylko jako rekord darowizny.
5. **Akcja** — B1.church: Add Donation. Zmapuj:
   - Kwota → `data.amount`
   - Data darowizny → data darowizny z wyzwalacza
   - Fundusz → wybierz fundusz B1, który odpowiada kampanii Donorbox (Zapier pozwala przełączać fundusze na podstawie filtra lub kroku Formatter)
   - Metoda → „Online"
   - Notatki → identyfikator transakcji Donorbox (przydatny przy uzgadnianiu)

Włącz Zap. Następna płatność na żywo przez Donorbox trafi automatycznie do **B1Admin → Darowizny**.

## Typowe przepisy

### Jeden Zap na fundusz

Jeśli prowadzisz wiele kampanii Donorbox przypisanych do osobnych funduszy B1, najczystszym układem jest jeden Zap na kampanię z filtrem *campaign* Donorbox na początku. Dzięki temu mapowanie funduszu jest ustalone na stałe i pomijasz krok wyszukiwania.

### Traktuj zaktualizowane darowizny jako korekty

Zdarzenie *New or Updated Donation* w Donorbox uruchamia się także przy edycjach. Użyj kroku Zapier *Path* na polu `event_type`, aby rozdzielić ścieżki: „new" → Add Donation, „updated" → Find Donation + Update. Uwaga: aplikacja Zapier B1 nie ma obecnie akcji Update Donation, więc na razie zapisuj zdarzenia „updated" do kanału Slack do ręcznego przeglądu.

### Synchronizuj zmiany planów cyklicznych z kanałem Slack

- **Wyzwalacz** — Donorbox: New or Updated Plan
- **Akcja** — Slack: Send Message do `#donations` (np. „Plan zmieniony — miesięczna darowizna Sarah wynosi teraz 200 USD")

## Ograniczenia i uwagi

- **Dopasuj darczyńców po adresie e-mail.** Donorbox nie udostępnia identyfikatora osoby z B1. Jedynym trwałym kluczem łączenia jest adres e-mail. Darczyńcy, którzy przekazują darowizny pod innym adresem e-mail, utworzą nową osobę w B1, dlatego comiesięczne uzgadnianie powinno ich wyszukiwać.
- **Zwroty nie są udostępniane osobno.** Donorbox wysyła aktualizację statusu dla tej samej darowizny. Aplikacja Zapier B1 nie ma obecnie akcji *Update Donation*, więc bezpieczny wzorzec na dziś to rejestrowanie zdarzeń zwrotów poza systemem i ręczne korygowanie darowizny.
- **Najpierw przetestuj w piaskownicy Donorbox**, aby nie tworzyć fałszywych darowizn w produkcyjnym B1. Donorbox udostępnia dane uwierzytelniające trybu testowego, oddzielne od danych produkcyjnych.

## Rozwiązywanie problemów

- **Ostrzeżenie „Person not found" przy każdym uruchomieniu** — to normalne, jeśli kroki są ułożone tak, że *Create Person* uruchamia się w gałęzi „nie znaleziono". Jeśli krok Create Person również się nie uruchamia, sprawdź, czy klucz API ma uprawnienie `people:write`.
- **Kwota darowizny wygląda 100 razy za duża lub za mała** — Donorbox w niektórych wariantach danych wysyła wartości w groszach, a w innych w jednostkach głównych. W razie potrzeby użyj kroku *Formatter by Zapier — Numbers*, aby podzielić wartość przez 100.
- **Zduplikowane darowizny z jednej wpłaty** — Donorbox wysyła zarówno *New Donation*, jak i *Updated Donation*. Przefiltruj do `event_type = "donation.succeeded"` albo zbuduj dwa Zapy o nienakładających się filtrach.

## Zobacz także

- [Zapier (przegląd)](../zapier.md) — strona B1 każdego przepisu Zapier
- [Subsplash](./subsplash.md) — inna platforma darowizn z aplikacją Zapier
- [Mailchimp](./mailchimp.md) — połącz „nową darowiznę" z tagiem e-mail
