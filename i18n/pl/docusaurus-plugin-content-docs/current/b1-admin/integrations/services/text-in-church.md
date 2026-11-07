---
title: "Text In Church"
description: "Połącz B1 Admin z Text In Church przez Zapier: wygeneruj klucz API, zbuduj Zap z karty kontaktowej do B1 i odzwierciedl członkostwo w grupach."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) łączy wysyłanie SMS-ów i automatyczne przepływy wiadomości (drip) z automatyzacjami kart kontaktowych. Jego aplikacja Zapier obsługuje oba kierunki: zdarzenia z B1 mogą uruchamiać przepływ w Text In Church, a wyzwalacze z kart kontaktowych lub nowych kontaktów mogą przekazywać dane z powrotem do B1.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto [Text In Church](https://textinchurch.com) w planie obejmującym integrację z Zapier
- Konto [Zapier](https://zapier.com)
- Użytkownik B1Admin z uprawnieniem **Edit Settings**

</div>

## Co można skonfigurować

| Kierunek | Wyzwalacz | Akcja |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Utwórz/zaktualizuj osobę + dodaj do grupy |
| B1 → Text In Church | B1 `form.submission.created` | Wyślij wiadomość tekstową przez odpowiedni zespół |
| B1 → Text In Church | B1 `group.member.added` | Dodaj do grupy (odzwierciedlenie członkostwa w grupie) |
| Text In Church → B1 | Connect Card Submitted | B1: Utwórz osobę + dodaj członka grupy |
| Text In Church → B1 | Person Created | B1: Utwórz osobę |
| Text In Church → B1 | Person Joined Group | B1: Dodaj członka grupy |

Akcje Text In Church obejmują także *Send Text Message* (wyślij wiadomość tekstową), *Send Voice Broadcast* (wyślij wiadomość głosową do wielu odbiorców), *Create Task* (utwórz zadanie), *Find Person/Group* (znajdź osobę lub grupę) oraz dodawanie i usuwanie członków grup.

## Konfiguracja

### 1. Utwórz klucz API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — wymagane dla Zapów uruchamianych przez B1
- `people:read`, `people:write` — do wyszukiwania lub tworzenia osób
- `groups:write` — do synchronizacji grup
- (Opcjonalnie) `donations:write`, jeśli chcesz wysyłać potwierdzenia darowizn do TIC

### 2. Połącz Text In Church z Zapier

Postępuj zgodnie z [przewodnikiem integracji Text In Church z Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Token API generujesz w panelu TIC.

### 3. Utwórz Zap z karty kontaktowej do B1

Jest to najczęstszy kierunek. Karty kontaktowe wysłane przez TIC automatycznie tworzą nowe osoby w B1.

1. **Wyzwalacz** — Text In Church: Connect Card Submitted.
2. **Akcja** — B1.church: Find Person (według adresu e-mail).
3. **Ścieżka** — rozgałęzienie na znaleziono / nie znaleziono:
   - Nie znaleziono → B1.church: Create Person.
   - Znaleziono → kontynuuj.
4. **Akcja** — B1.church: Add Group Member do grupy „New Contact”.

Włącz Zap. Następna karta kontaktowa wysłana przez TIC automatycznie pojawi się w **B1Admin → People**.

## Typowe przepisy

### Uruchom przepływ podobny do karty kontaktowej z formularza B1

- **Wyzwalacz** — B1.church: New Form Submission (filtr według identyfikatora formularza „I'm new here”)
- **Akcja** — Text In Church: Create/Update Person, mapując odpowiedzi na pytania o e-mail, telefon i imię z formularza
- **Akcja** — Text In Church: Add to Group, gdzie grupa ma przypisany gotowy przepływ powitalny

### Odzwierciedlanie członkostwa w grupie

- **Wyzwalacz** — B1.church: New Group Member, filtrowany według konkretnego `groupId`
- **Akcja** — Text In Church: Add to Group (ta sama osoba, odzwierciedlenie grupy). Jeśli chcesz pełnej synchronizacji, połącz to z Zapem `group.member.removed`.

### Powiadom lidera, gdy ktoś dołączy

- **Wyzwalacz** — B1.church: New Group Member
- **Akcja** — Text In Church: Send Text Message, odbiorca = telefon lidera grupy, treść = `"{first} {last} właśnie dołączył(a) do {group}"`.

## Ograniczenia i uwagi

- **Integracja Zapier w TIC zależy od planu.** Jeśli integracja Zapier jest wyszarzona w panelu TIC, skontaktuj się z pomocą techniczną TIC, aby włączyła ją w Twoim planie.
- **Identyfikatory grup są z TIC, a nie z B1.** Przy odzwierciedlaniu grup musisz gdzieś prowadzić tabelę mapowania (Zapier *Lookup Table* lub wartości wpisane na stałe w każdym Zapie).
- **Wysyłanie wiadomości tekstowych zużywa kredyty.** Każdy Zap wykonujący *Send Text* zmniejsza Twój limit SMS w TIC.

## Rozwiązywanie problemów

- **Wyzwalacz Connect Card nie uruchamia się** — TIC wymaga włączenia przełącznika integracji Zapier. Sprawdź też, czy formularz, którego używasz do testów, jest ustawiony jako „Connect Card”, a nie jako zwykła ankieta.
- **Create Person w B1 kończy się błędem 401** — klucz API jest nieprawidłowy, unieważniony lub nie ma uprawnienia `people:write`. Wygeneruj nowy klucz.
- **Zduplikowane osoby w B1** — TIC wysyła zarówno *Person Created*, jak i *Connect Card Submitted* dla tego samego zdarzenia. Wybierz jedno źródło prawdy i dodaj filtr Zapier (Filter) do drugiego.

## Zobacz także

- [Clearstream](./clearstream.md) — alternatywna platforma SMS o podobnym modelu integracji z Zapier
- [Zapier (przegląd)](../zapier.md) — strona B1 wszystkich przepisów Zapier
- [Przewodnik Text In Church dla Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (dokumentacja TIC)
