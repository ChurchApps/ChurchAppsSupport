---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) zapewnia weryfikację przeszłości (background screening) pracowników i wolontariuszy, co jest niemal uniwersalną potrzebą każdego kościoła prowadzącego program dla dzieci lub młodzieży. B1 **nie ma wbudowanej funkcji sprawdzania przeszłości**. Zamawianie sprawdzeń, śledzenie wyników i zgodność z wymogami weryfikacji odbywają się w Checkr, a poniższy przepis tylko łączy zdarzenia w B1 z tą usługą. Checkr nie ma aplikacji dla Zapier, ale [integracja Checkr w Make.com](https://www.make.com/en/integrations/checkr) jest sprawdzona i udostępnia akcje potrzebne do uruchomienia sprawdzenia na podstawie zdarzenia w B1.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto [Checkr](https://checkr.com) z dostępem do API i co najmniej jednym skonfigurowanym pakietem weryfikacji
- Konto [Make](https://www.make.com)
- Użytkownik B1Admin z uprawnieniem **Edycja ustawień**

</div>

## Co można połączyć

Aplikacja Checkr w Make udostępnia 1 wyzwalacz i 6 akcji:

| Kierunek | Wyzwalacz B1 / Make | Akcja |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrowane do grupy wolontariuszy) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook Checkr (zdarzenie zaproszenia / raportu) | B1: aktualizacja rekordu osoby (np. tag „Checkr cleared”) |

Akcje Checkr w Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Dodatkowo 4 moduły wyszukiwania.

## Konfiguracja

### 1. Utwórz klucz API w B1

**Ustawienia → Deweloper → Klucze API → Nowy klucz API**:

- `settings:write` — dla wyzwalacza webhook
- `people:read` — do wyszukania imienia, nazwiska i adresu e-mail osoby przy rozpoczynaniu sprawdzenia
- (Opcjonalnie) `people:write`, jeśli chcesz zapisywać status raportu z powrotem jako pole niestandardowe lub tag

### 2. Zbuduj w Make scenariusz „uruchom sprawdzenie przy zapisie wolontariusza”

1. **Wyzwalacz** — B1.church: Watch Events (`group.member.added`).
2. **Filtr** — kontynuuj tylko wtedy, gdy `data.groupId` odpowiada grupie „Wolontariusze dzieci” (lub odpowiedniej).
3. **Akcja** — B1.church: Find Person (po `data.personId`), aby pobrać e-mail oraz imię i nazwisko.
4. **Akcja** — Checkr: Create Candidate. Zmapuj imię, nazwisko i e-mail z kroku 3.
5. **Akcja** — Checkr: Create Background Check Invitation. Zmapuj identyfikator nowego kandydata z kroku 4 do pola *candidate_id*. Wybierz pakiet weryfikacji (np. `tasker_standard` lub inny dostępny na Twoim koncie).
6. (Opcjonalnie) **Akcja** — Slack: powiadom koordynatora ds. bezpiecznej służby, że rozpoczęto sprawdzenie.

Włącz scenariusz. Nowi wolontariusze w docelowej grupie automatycznie otrzymają zaproszenie Checkr e-mailem. Wypełniają je na telefonie lub laptopie, a Checkr przeprowadza weryfikację.

### 3. (Opcjonalnie) Odbieranie raportu

1. **Wyzwalacz** — Checkr: Watch Events (webhook). Make rejestruje webhook Checkr po włączeniu scenariusza.
2. **Filtr** — kontynuuj tylko wtedy, gdy `event_type = report.completed`.
3. **Akcja** — Checkr: Get Report (użyj identyfikatora raportu z webhooka).
4. **Akcja** — B1.church: Find Person (po adresie e-mail kandydata).
5. **Akcja warunkowa** — Slack / e-mail: powiadom koordynatora o statusie `clear` / `consider` / `suspended`.

Uwaga: B1 obecnie nie ma wbudowanego pola „status weryfikacji przeszłości”. Praktyczne opcje to (a) publikacja wyniku w prywatnym kanale Slack do przeglądu, (b) zapisanie go w arkuszu Google w celach audytu lub (c) dodanie osoby do grupy B1 „Zweryfikowani wolontariusze” po statusie `clear`.

## Typowe przepisy

### Ponowna weryfikacja wolontariuszy co 2 lata

Połącz powyższe z wyzwalaczem harmonogramu w Make:

- **Wyzwalacz** — Make: Schedule (miesięcznie)
- **Akcja** — B1.church: List Group Members dla grupy „Zweryfikowani wolontariusze”
- **Akcja** — Filtr w Make: data weryfikacji starsza niż 22 miesiące
- **Akcja** — Checkr: Create Background Check Invitation (tak samo jak w przepływie początkowym)

### Blokowanie dostępu na etapie 1 do czasu zakończenia weryfikacji

Jeśli Twój kościół używa członkostwa w grupach B1 do kontrolowania dostępu (np. w harmonogramach służby widoczni są tylko członkowie grupy „Zweryfikowani”), trzymaj nowych wolontariuszy w grupie tymczasowej, dopóki zdarzenie Checkr `report.completed` ich nie przeniesie.

## Ograniczenia i uwagi

- **Checkr działa głównie w USA** w przypadku większości pakietów weryfikacji. Kościoły w Australii, Wielkiej Brytanii i Kanadzie będą potrzebować innego rozwiązania.
- **Cennik** jest naliczany za każde sprawdzenie. Każde utworzenie zaproszenia w Make uruchamia prawdziwe sprawdzenie. Najpierw przetestuj w środowisku sandbox lub testowym konta Checkr. Aplikacja Checkr w Make używa danych uwierzytelniających podanych w połączeniu, więc zmiana danych przełącza między sandboxem a środowiskiem produkcyjnym.
- **Dostęp do API Checkr zależy od planu.** Mniejsze konta Checkr mogą mieć plan tylko z interfejsem użytkownika; skontaktuj się z Checkr, aby włączyć API.

## Rozwiązywanie problemów

- **Create Candidate kończy się błędem `403`** — token API Checkr jest tylko do odczytu lub nie ma odpowiednich uprawnień do konta. Wygeneruj go ponownie w panelu Checkr z zakresem zapisu.
- **Zaproszenie nigdy nie dociera** — sprawdź adres e-mail kandydata w kroku 3; B1 może mieć puste pole e-mail dla tej osoby. Dodaj filtr wymagający e-maila przed krokiem Checkr.
- **Wyzwalacz webhook się nie uruchamia** — rejestracja webhooka w Checkr czasem cicho się nie udaje, jeśli Twoje konto Make nie ma płatnego planu obsługującego wychodzące webhooki. Sprawdź na stronie *Webhooks* w panelu Checkr, czy adres URL Make jest na liście.

## Zobacz także

- [Make (przegląd)](../make) — strona B1 dla każdego scenariusza Make
- [Wiadomości mobilne](./mobile-message) — dla dostawców SMS bez aplikacji Zapier, ten sam schemat Webhooks/HTTP co w połączeniu Checkr z Make
- [Dokumentacja API Checkr](https://docs.checkr.com/)
