---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Wyślij wiadomość tekstową [Clearstream](https://clearstream.io) z dowolnego wydarzenia w B1, na przykład po dodaniu nowej osoby, nowej darowizny, przesłaniu formularza lub aktualizacji kalendarza, a odpowiedzi zapisuj z powrotem jako rekordy w B1. Aplikacja Clearstream w Zapier obsługuje oba kierunki, więc całe połączenie to gotowy przepis, a nie własny kod.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto [Clearstream](https://clearstream.io) z co najmniej jedną listą i pulą wiadomości SMS
- Konto [Zapier](https://zapier.com)
- Użytkownik B1Admin z uprawnieniem **Edit Settings**

</div>

## Co możesz skonfigurować

| Kierunek | Wyzwalacz | Akcja |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (np. powiadomienie zespołu finansowego) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to List (np. zespół modlitewny, do którego trafia zgłoszenie) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; oznacz słowem kluczowym, które osoba wysłała |

Akcje Clearstream w Zapier: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Konfiguracja

### 1. Utwórz klucz API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — wymagane, aby B1 mogło zarejestrować webhook wyzwalacza
- `people:read` — potrzebne do wyszukania osoby z wydarzenia (`personId` → imię i nazwisko/telefon/e-mail)
- (Opcjonalnie) `people:write`, jeśli odpowiedzi z Clearstream mają tworzyć kontakty w B1

### 2. Zbuduj Zap „wiadomość przy nowej darowiźnie”

1. **Wyzwalacz** — B1.church: New Donation
2. **Akcja** — B1.church: Find Person (`personId` z darowizny)
3. **Akcja** — Clearstream: Send Text to Number. Jako odbiorcę podaj numer telefonu osoby z kroku 2 i ułóż treść wiadomości, np. `"Thanks for your gift, {first}! …"`.

Włącz Zap. B1 rejestruje webhook darowizn po aktywacji; w **Settings → Developer → Webhooks** pojawi się wpis `Zapier — donation.created`.

### 3. (Opcjonalnie) Przekazuj odpowiedzi z powrotem jako rekordy B1

1. **Wyzwalacz** — Clearstream: New Incoming Text
2. **Akcja** — Filter by Zapier na podstawie słowa kluczowego, np. kontynuuj tylko wtedy, gdy treść wiadomości zaczyna się od `PRAY`
3. **Akcja** — B1.church: Find Person (według telefonu)
4. **Akcja** — Filter / Path: jeśli osoby nie ma, utwórz ją; w obu przypadkach zapisz treść wiadomości w wybranym miejscu (Slack, arkusz Google lub zgłoszenie formularza B1 przez Webhooks by Zapier).

## Częste przepisy

### Powiadamianie zespołu dyżurnego

- **Wyzwalacz** — B1.church: New Form Submission (filtrowany według identyfikatora formularza próśb modlitewnych)
- **Akcja** — Clearstream: Send Text to List, gdzie listą jest Twój dyżurny zespół duszpasterski. Treść ułóż jako `New prayer request: {data.questions.0.answer}`.

### Sekwencja działań wobec osoby odwiedzającej kościół po raz pierwszy

- **Wyzwalacz** — B1.church: New Person, filtrowany według tagu osoby w B1 „First-time visitor”
- **Akcja** — Clearstream: Add Subscriber to Automated Workflow. Przypisz identyfikator przepływu do gotowej 7-dniowej serii wiadomości.

### Dołączanie do grupy na podstawie słowa kluczowego

- **Wyzwalacz** — Clearstream: New Incoming Text (filtr na słowo kluczowe `MENS`)
- **Akcja** — B1.church: Find Person (według telefonu); jeśli nie znaleziono → Create Person
- **Akcja** — B1.church: Add Group Member, dodaj osobę do grupy Men's Ministry

## Ograniczenia i uwagi

- **Clearstream rozlicza SMS-y za wiadomość.** Każda akcja Send Text zużywa jeden lub więcej kredytów, zależnie od długości i liczby odbiorców. Sprawdź limit swojego planu.
- **Numer telefonu musi być w formacie E.164** (np. `+15555550199`) dla akcji *Send Text to Number*. Rekord osoby w B1 przechowuje to, co zostało wpisane; jeśli nie masz pewności co do formatu, użyj kroku *Formatter by Zapier — Numbers → Format Phone Number*.
- **Po stronie B1 nie jest wymagany żaden nagłówek** — uwierzytelnianie Clearstream działa wyłącznie w połączeniu Clearstream w Zapier.

## Rozwiązywanie problemów

- **Wyzwalacz nigdy się nie uruchamia** — w `Settings → Developer → Webhooks` po włączeniu Zap powinien pojawić się wiersz `Zapier — <event>`. Jeśli go nie ma, w kluczu API B1 brakuje uprawnienia `settings:write`. Utwórz klucz ponownie i połącz go od nowa.
- **Clearstream zwraca „Invalid phone number”** — pole odbiorcy nie jest w formacie E.164. Dodaj krok Format Phone Number.
- **Send Text to List kończy się błędem `403`** — użytkownik API Clearstream nie ma uprawnień do tej listy albo identyfikator listy jest błędny. Identyfikatory list są widoczne na stronie szczegółów listy w Clearstream.

## Zobacz także

- [Text In Church](./text-in-church) — alternatywna platforma SMS o podobnym sposobie konfiguracji
- [Mobile Message](./mobile-message) — dla kościołów spoza USA
- [Zapier (przegląd)](../zapier) — strona B1 wszystkich przepisów Zapier
- [Dokumentacja API Clearstream](https://api-docs.clearstream.io/) — dla własnych integracji wykraczających poza aplikację Zapier
