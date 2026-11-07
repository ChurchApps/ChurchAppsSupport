---
title: "Zapier"
description: "Połącz B1 Admin z Zapier, aby uruchamiać automatyzacje dla nowych osób, darowizn i członków grup oraz zapisywać rekordy z powrotem w B1 bez programowania."
---

# Zapier

<div class="article-intro">

Oficjalna aplikacja B1.church w Zapier pozwala Zapowi reagować na zdarzenia w Twoim kościele (nowa osoba, nowa darowizna, nowy członek grupy itd.) i zapisywać rekordy z powrotem w B1. Bez kodowania i bez infrastruktury. Konfigurujesz wszystko w edytorze Zapier typu „przeciągnij i upuść”, wklejasz klucz API i włączasz Zap.

</div>

:::caution Oczekiwanie na zatwierdzenie przez Zapier
Aplikacja B1.church jest gotowa i działa, ale wciąż czeka na weryfikację przez Zapier, zanim pojawi się publicznie w katalogu aplikacji edytora Zap. Do momentu zatwierdzenia z niej mogą korzystać tylko zaproszone konta. Poniższy opis dotyczy sposobu działania po zatwierdzeniu.
:::

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto [Zapier](https://zapier.com) (darmowy plan wystarczy do kilku Zapów)
- Administrator kościoła z uprawnieniem **Edytowanie ustawień** w B1Admin (utworzysz klucz API)
- Pomysł na to, co chcesz zrobić, np. „gdy w B1 zostanie dodana osoba, dodaj ją do mojej listy w Mailchimp”

</div>

## Wyzwalacze i akcje

| Typ | Co robi | Zdarzenie / punkt końcowy B1 |
|---|---|---|
| **Wyzwalacz** | Nowa osoba | `person.created` |
| **Wyzwalacz** | Zaktualizowana osoba | `person.updated` |
| **Wyzwalacz** | Nowa darowizna | `donation.created` |
| **Wyzwalacz** | Nowy członek grupy | `group.member.added` |
| **Wyzwalacz** | Nowe zgłoszenie formularza | `form.submission.created` |
| **Akcja** | Utwórz osobę | dodaje nową osobę |
| **Akcja** | Dodaj darowiznę | zapisuje darowiznę |
| **Akcja** | Dodaj członka grupy | dodaje osobę do grupy |
| **Akcja** | Znajdź osobę | wyszukuje osobę po identyfikatorze, e-mailu lub nazwisku; jeśli nikt nie pasuje, zadanie kończy się błędem |

Łącz je dowolnie z którąkolwiek z ponad 7000 obsługiwanych przez Zapier aplikacji.

## Konfiguracja

### 1. Utwórz klucz API B1

1. W B1Admin przejdź do **Ustawienia → Deweloper → Klucze API**.
2. Kliknij **Nowy klucz API**, nadaj mu nazwę, np. „Zapier”, i wybierz zakresy potrzebne Zapowi.
3. **Ważne:** wyzwalacze Zapier rejestrują w Twoim imieniu webhook po włączeniu Zapa, a to wymaga zakresu **`settings:write`**. Zawsze dodawaj `settings:write`, jeśli którykolwiek z Twoich Zapów używa wyzwalacza B1.
4. Nadaj też zakresy potrzebne akcjom. Na przykład akcja „Dodaj darowiznę” wymaga `donations:write`, a „Utwórz osobę” wymaga `people:write`.
5. Zapisz. Pełny klucz `cak_…` zostanie pokazany **tylko raz**, więc go skopiuj.

### 2. Połącz Zapier z B1

1. W Zapier utwórz nowy Zap.
2. Gdy po raz pierwszy wybierzesz wyzwalacz lub akcję B1, Zapier poprosi o **zalogowanie się do B1.church**.
3. Wklej klucz API z kroku 1 i kliknij **Tak, kontynuuj**. Zapier sprawdzi go względem Twojego kościoła.

Połączenie jest zapisywane w Zapier i wykorzystywane przez każdy Zap na Twoim koncie.

### 3. Zbuduj Zap

Wybierz wyzwalacz, a następnie dodaj jeden lub więcej kroków akcji. Przykłady znajdziesz poniżej.

## Typowe scenariusze

### Dodawanie nowych osób z B1 do Mailchimp

- **Wyzwalacz** — B1: Nowa osoba
- **Akcja** — Mailchimp: Dodaj/zaktualizuj subskrybenta. Zmapuj pola B1 `name__first`, `name__last` i `contactInfo__email` na pola Mailchimp: Imię, Nazwisko i E-mail.

### Publikowanie darowizn na kanale Slack z bogatszą kartą niż wbudowany łącznik

- **Wyzwalacz** — B1: Nowa darowizna
- **Akcja** — Slack: Wyślij wiadomość na kanał. Utwórz dowolny układ — przyciski, załączniki itp. — którego nie obsługuje wbudowany [łącznik Slack](./slack-discord.md).

### Dodawanie nowych członków grupy do grupy Google

- **Wyzwalacz** — B1: Nowy członek grupy (filtrowany do konkretnego `groupId`)
- **Akcja** — Filtr Zapier: kontynuuj tylko wtedy, gdy grupa B1 to ta, która Cię interesuje
- **Akcja** — B1: Znajdź osobę (użyj `personId` z wyzwalacza, aby pobrać e-mail)
- **Akcja** — Grupy Google: Dodaj członka

### Przekazywanie zgłoszeń formularzy do narzędzia do zarządzania projektami

- **Wyzwalacz** — B1: Nowe zgłoszenie formularza
- **Akcja** — Notion / Linear / Asana / Trello: Utwórz stronę / zgłoszenie / zadanie

## Jak działają wyzwalacze

Wyzwalacze to **REST hooks**, a nie odpytywanie. Zapier nie sprawdza B1 co 15 minut. Gdy włączasz Zap, Zapier prosi B1 o zarejestrowanie webhooka wskazującego na prywatny adres URL Zapier. Gdy zdarzenie zajdzie, B1 wysyła jego treść do Zapier, a Twój Zap uruchamia się **w ciągu kilku sekund**. Gdy wyłączysz Zap, Zapier prosi B1 o usunięcie webhooka, dzięki czemu nie zostają osierocone subskrypcje.

Oznacza to, że wyzwalacz uruchamia się tylko dla zdarzeń, które zajdą **po** włączeniu Zapa. Nie ma uzupełniania wstecznego: włączenie Zapa nie odtwarza wczorajszych darowizn.

## Ograniczenia i uwagi

- **Wiele Zapów z tym samym wyzwalaczem** rejestruje każdy własny webhook B1. Nie ma to wpływu na działanie, ale warto wiedzieć o tym, jeśli w **Ustawienia → Deweloper → Webhooki** widzisz trzy identyczne wiersze „Zapier — donation.created”.
- **Dane testowe podczas konfiguracji Zap**: gdy budujesz Zap, Zapier prosi o przykładowe dane do mapowania pól. Jeśli w B1 istnieje najnowsze pasujące zdarzenie, Zapier je pobierze. W przeciwnym razie użyje syntetycznej próbki z definicji aplikacji.
- **Błędy akcji pojawiają się jako błędy Zap** w historii zadań Zapier. Typowa przyczyna to klucz API bez odpowiedniego zakresu (np. akcja „Dodaj darowiznę” wymaga `donations:write`). Wygeneruj klucz ponownie z właściwymi zakresami i połącz go ponownie w Zapier.
- **Limity wywołań API wychodzących**: każde wywołanie API B1 wykonane przez akcję liczy się do limitu zadań Zapier, a nie do czegokolwiek po stronie B1.

## Rozwiązywanie problemów

- **„Uwierzytelnianie nie powiodło się”** podczas łączenia: klucz API jest błędny, unieważniony lub nie ma zakresów potrzebnych Zapowi. Wygeneruj go ponownie w B1Admin z co najmniej `settings:write` oraz zakresami zasobów, których dotyczy Zap, a następnie zaktualizuj połączenie.
- **Wyzwalacz nigdy się nie uruchamia**: sprawdź, czy webhook został zarejestrowany. W B1Admin w **Ustawienia → Deweloper → Webhooki** powinien pojawić się wiersz o nazwie „Zapier — &lt;zdarzenie&gt;”. Jeśli go nie ma, klucz API prawdopodobnie nie miał `settings:write` w momencie włączania Zapa. Popraw klucz, wyłącz Zap i włącz go ponownie.
- **Wyzwalacz uruchamia się dwukrotnie**: Zapier czasem ponownie dostarcza zdarzenie, jeśli potwierdzenie zostało zgubione. Jeśli potrzebujesz ścisłej deduplikacji, użyj kroku „Filtr Zapier” na unikalnym identyfikatorze (np. `id` osoby).

## Zobacz także

- [Make](./make.md) — ten sam schemat, inna platforma
- [Slack i Discord](./slack-discord.md) — prostsze powiadomienia czatowe bez Zapier
- [Webhooki (dokumentacja dla deweloperów)](/docs/developer/api/webhooks)
