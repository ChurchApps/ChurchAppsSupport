---
title: "Make"
description: "Połącz B1 Admin z Make, aby automatyzować procesy: utwórz klucz API, skonfiguruj wyzwalacz i akcje B1.church oraz rozwiąż typowe błędy."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (dawniej Integromat) to wizualna platforma do automatyzacji przepływów pracy. Pod względem idei przypomina Zapier, ale oferuje bardziej elastyczną logikę i niższy koszt przy dużej skali. Oficjalna aplikacja B1.church dla Make pozwala tworzyć „scenariusze", które natychmiast reagują na zdarzenia w B1 i zapisują rekordy z powrotem w B1.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto w [Make](https://www.make.com) (bezpłatny plan wystarcza do małych przepływów pracy)
- Administrator kościoła z uprawnieniem **Edit Settings** w B1Admin
- Ogólny pomysł na scenariusz, który chcesz zbudować

</div>

## Moduły

| Typ | Co robi | Zdarzenie lub endpoint B1 |
|---|---|---|
| **Instant Trigger** | Watch Events | dowolne subskrybowane zdarzenie B1 (`person.created`, `donation.created`, …) |
| **Action** | Create Person | dodaje nową osobę |
| **Action** | Add Donation | rejestruje darowiznę |
| **Action** | Add Group Member | dodaje osobę do grupy |
| **Search** | Search People | wyszukuje osoby po imieniu, nazwisku lub adresie e-mail |

Natychmiastowy wyzwalacz pozwala wybrać zdarzenie, na które ma reagować. Każdy scenariusz zawiera jeden moduł wyzwalacza, skonfigurowany dla konkretnego zdarzenia.

## Konfiguracja

### 1. Utwórz klucz API B1

1. W B1Admin przejdź do **Settings → Developer → API Keys**.
2. Kliknij **New API Key**, nazwij klucz „Make" i przyznaj potrzebne zakresy uprawnień.
3. **Dodaj `settings:write`**, jeśli którykolwiek ze scenariuszy korzysta z natychmiastowego wyzwalacza. Make rejestruje webhook w Twoim imieniu, gdy scenariusz zostaje włączony.
4. Przyznaj też zakresy wymagane przez moduły akcji (np. `donations:write` dla modułu Add Donation).
5. Zapisz klucz i skopiuj klucz `cak_…`.

### 2. Połącz aplikację

1. W Make utwórz nowy scenariusz i przeciągnij na kanwę moduł wyzwalacza **B1.church**.
2. Po wyświetleniu monitu wybierz **Create a connection**. Wklej klucz API w pole *API Key* i pozostaw pole *API Base URL* bez zmian, czyli `https://api.churchapps.org` (chyba że testujesz na środowisku przejściowym).
3. Kliknij **Save**. Make sprawdzi klucz, odczytując profil Twojego kościoła.

Połączenie jest zapisywane na Twoim koncie Make i może być używane w różnych scenariuszach.

### 3. Skonfiguruj wyzwalacz

1. Otwórz ustawienia modułu **Watch Events**.
2. Wybierz zdarzenie, na przykład `donation.created`.
3. Zapisz zmiany. Make wygeneruje unikalny adres URL webhooka i zapisze go wewnętrznie.

### 4. Dodaj kolejne moduły

Na kanwę możesz przeciągnąć dowolny z setek modułów aplikacji dostępnych w Make, np. Mailchimp, Arkusze Google, Slack, HubSpot albo własny endpoint HTTP. Przenieś dane wyjściowe wyzwalacza (`event`, `churchId`, `data.id`, `data.amount`, …) do odpowiednich pól wejściowych. Moduły flatten, iterator, router i aggregator w Make pozwalają budować rozgałęzienia i przepływy równoległe, które w Zapier byłyby trudne do zrealizowania.

### 5. Włącz scenariusz

Przełącz opcję **Active** w nagłówku scenariusza. Make wywołuje `POST /membership/webhooks` w B1, aby zarejestrować adres URL. Od tej chwili każde pasujące zdarzenie w B1 trafia do scenariusza w czasie rzeczywistym.

Wyłączenie scenariusza wywołuje `DELETE /membership/webhooks/{id}`, dzięki czemu nie pozostają osierocone subskrypcje.

## Typowe przepisy

### Synchronizacja darowizn do arkusza Google na potrzeby przeglądu finansowego

- **Wyzwalacz** — B1: Watch Events (`donation.created`)
- **Akcja** — Arkusze Google: Add a Row. Zmapuj `data.donationDate`, `data.amount`, `data.personId`, `data.method` i `data.batchId` na kolumny arkusza.

### Warunkowe powiadomienie na Slacku w zależności od kwoty darowizny

- **Wyzwalacz** — B1: Watch Events (`donation.created`)
- **Router**:
  - Gałąź A — Filter: `data.amount >= 1000` → Slack: wyślij wiadomość do `#major-gifts`
  - Gałąź B — pozostałe przypadki → Slack: wyślij wiadomość do `#donations`

### Nowa osoba → CRM + e-mail powitalny + Slack

- **Wyzwalacz** — B1: Watch Events (`person.created`)
- **Akcja** — HubSpot: Create Contact
- **Akcja** — Mailgun: Send Welcome Email
- **Akcja** — Slack: powiadom `#new-people` (równolegle, za pomocą routera Make)

## Jak działa natychmiastowy wyzwalacz

Natychmiastowy wyzwalacz opiera się na webhookach, a nie na odpytywaniu. Po aktywacji Make wywołuje `POST /membership/webhooks` z wygenerowanym przez siebie adresem URL i wybranym zdarzeniem. Gdy zdarzenie wystąpi w B1, system wysyła ładunek na adres URL Make, a scenariusz uruchamia się w ciągu kilku sekund. Dezaktywacja scenariusza usuwa webhook.

Wyzwalacz uruchamia się tylko dla zdarzeń, które wystąpią **podczas aktywności scenariusza**. Nie ma mechanizmu uzupełniania zaległych zdarzeń.

## Ograniczenia i uwagi

- **Jedno zdarzenie na moduł Watch Events.** Aby nasłuchiwać kilku zdarzeń w jednym scenariuszu, dodaj wiele modułów wyzwalacza w osobnych scenariuszach (lub użyj jednego modułu z połączoną listą zdarzeń, patrz poniżej).
- **Weryfikacja podpisu nie jest udostępniona.** Make nie przekazuje nagłówka `X-B1-Signature` do scenariusza. Granicę zaufania stanowi nieodgadniony, unikalny dla scenariusza adres URL webhooka Make. Jest to typowa praktyka w Make. Jeśli potrzebujesz jawnej weryfikacji podpisu, zbuduj własną integrację za pomocą [SDK](/docs/developer/api/webhooks#sdk-support).
- **Liczba operacji** — każde wywołanie API z modułu akcji zużywa limit operacji w Make. Po stronie B1 nie wpływa to na nic.

## Rozwiązywanie problemów

- **Test połączenia kończy się niepowodzeniem** — najczęściej przyczyną jest literówka w kluczu API. Skopiuj klucz ponownie z B1Admin. Pełny klucz jest pokazywany tylko raz. Jeśli go zgubiłeś, utwórz nowy klucz.
- **Moduł wyzwalacza się nie aktywuje** — sprawdź **Settings → Developer → Webhooks** w B1Admin. Jeśli po aktywacji scenariusza nie widzisz wiersza „Make — &lt;event&gt;", klucz nie ma uprawnienia `settings:write`. Zaktualizuj klucz i aktywuj scenariusz ponownie.
- **Akcja zwraca `403 Forbidden`** — klucz API nie ma zakresu wymaganego dla danego endpointu. Na przykład Add Donation wymaga `donations:write`. Zaktualizuj klucz w B1Admin i wykonaj test ponownie.

## Dostosowywanie aplikacji

Aplikacja B1.church dla Make jest open source. Definicje JSON znajdują się w repozytorium `B1Integrations/Make/`. Jeśli potrzebujesz modułu, którego jeszcze nie ma (np. nowej akcji dla endpointu, którego nie obsługujemy), otwórz zgłoszenie (issue) lub pull request w tym repozytorium.

## Zobacz także

- [Zapier](./zapier.md) — ten sam wzorzec z prostszym interfejsem i większym katalogiem aplikacji
- [Slack & Discord](./slack-discord.md) — wbudowane powiadomienia czatu bez Make
- [Webhooki (dokumentacja dla deweloperów)](/docs/developer/api/webhooks)
