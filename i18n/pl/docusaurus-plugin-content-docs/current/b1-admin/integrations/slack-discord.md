---
title: "Slack i Discord"
---

# Slack i Discord

<div class="article-intro">

Publikuj czytelne powiadomienia z B1 bezpośrednio na kanał Slack lub Discord: o nowych osobach, darowiznach, zapisach do grup, zgłoszeniach z formularzy, wydarzeniach z kalendarza i nie tylko. Nie potrzebujesz konta u zewnętrznego dostawcy ani Zapa do utrzymania. B1 przekształca zdarzenia w wiadomości czatu i sam wysyła je na adres webhooka kanału.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia **Edycja ustawień** w B1Admin
- Administrator w Twoim obszarze roboczym Slack lub na serwerze Discord, który utworzy przychodzący webhook (Incoming Webhook) dla kanału
- Zdecyduj, na którym kanale chcesz otrzymywać powiadomienia (możesz użyć tego samego kanału dla kilku typów zdarzeń albo podzielić je między kanały)

</div>

## Jak to działa

B1 ma wbudowany **typ łącznika** dla platform czatu. Gdy utworzysz webhook o typie **Slack** lub **Discord**, silnik webhooków nadal wykonuje zwykłe wysyłanie, ponawianie i podpisywanie nagłówków, ale treść wysyłanego żądania jest przekształcana z typowej koperty B1 `{event,churchId,data}` na krótką wiadomość `{text}` (Slack) lub `{content}` (Discord), jakiej oczekują te usługi.

Poza istniejącym przepływem wychodzących webhooków B1 nie łączy się ze Slackiem w imieniu poszczególnych kościołów. Nie ma tu nic nowego do hostowania ani dodatkowych kosztów.

## Slack krok po kroku

### 1. Uzyskaj adres URL przychodzącego webhooka Slack

1. Otwórz [api.slack.com/apps](https://api.slack.com/apps) w obszarze roboczym Slack, w którym chcesz otrzymywać powiadomienia.
2. Kliknij **Create New App → From scratch**, nadaj aplikacji nazwę, na przykład „B1 Notifications", i wybierz obszar roboczy.
3. W lewym menu wybierz **Incoming Webhooks** i przełącz **Activate Incoming Webhooks** na *On*.
4. Kliknij **Add New Webhook to Workspace**, wybierz kanał (np. `#donations`), a następnie kliknij **Allow**.
5. Slack przeniesie Cię z powrotem na stronę z nowym **Webhook URL**, który wygląda jak `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Skopiuj go. To jedyna informacja, jakiej B1 potrzebuje.

:::caution
Traktuj adres webhooka Slack jak sekret. Każdy, kto go zna, może publikować dowolne wiadomości na kanale. Jeśli go przypadkowo ujawnisz, wygeneruj go ponownie na stronie aplikacji Slack (ponowne wygenerowanie tylko zmienia adres URL; zaktualizuj ustawienia w B1, aby pasowały).
:::

### 2. Połącz w B1Admin

1. W B1Admin przejdź do **Ustawienia → Deweloper → Webhooki**.
2. Kliknij **Nowy webhook**.
3. Wypełnij pola:
   - **Nazwa**: coś czytelnego, np. „Darowizny → #donations". Widzi to tylko Twój zespół.
   - **Typ łącznika**: wybierz **Slack**.
   - **Adres docelowy (Payload URL)**: wklej adres Slack z kroku 1.
   - **Zdarzenia**: zaznacz zdarzenia, które mają trafiać jako wiadomości. Dla kanału darowizn wystarczy `donation.created`. Dla kanału #people spróbuj `person.created` i `group.member.added`.
4. Kliknij **Zapisz**. Pojawi się okno „Signing Secret". Dla Slacka możesz je zignorować (Slack nie weryfikuje podpisów B1) i je zamknąć.

### 3. Przetestuj

Otwórz ponownie webhook z listy i kliknij **Wyślij zdarzenie testowe**. W ciągu sekundy lub dwóch w kanale Slack powinna pojawić się wiadomość w rodzaju

> 💝 Nowa darowizna: 50,00 $

a na tym samym ekranie w tabeli **Ostatnie dostarczenia** pojawi się nowy wiersz ze statusem `succeeded`. Gotowe.

## Discord krok po kroku

### 1. Uzyskaj adres URL webhooka Discord

1. Na serwerze Discord najedź na kanał, na który chcesz otrzymywać powiadomienia, i kliknij **⚙ koło zębate** (Edytuj kanał).
2. Otwórz **Integracje → Webhooki → Nowy webhook**.
3. Nadaj mu nazwę i (opcjonalnie) awatar, a następnie kliknij **Kopiuj URL webhooka**. Adres wygląda jak `https://discord.com/api/webhooks/123…/abc…`.

### 2. Połącz w B1Admin

Przebieg jest taki sam jak dla Slacka, z tą różnicą, że **Typ łącznika** ustawiasz na **Discord**. Wklej adres Discord w polu **Adres docelowy (Payload URL)** i zapisz.

:::tip
**Nie** musisz dopisywać `/slack` na końcu adresu Discord. B1 wysyła ładunki w formacie natywnym dla Discorda, `{content}`, a nie w formacie zgodnym ze Slackiem. Wklej po prostu adres, który podał Discord.
:::

### 3. Przetestuj

Użyj tego samego przycisku **Wyślij zdarzenie testowe**. Discord pokaże wiadomość w wybranym kanale, a dziennik dostarczeń zmieni status na `succeeded`.

## Jak wyglądają wiadomości

| Zdarzenie | Przykładowa wiadomość |
|---|---|
| `person.created` | 👤 Dodano nową osobę: Jordan Rivera |
| `person.updated` | 👤 Zaktualizowano osobę: Jordan Rivera |
| `group.created` | 👥 Utworzono nową grupę: Wtorkowe studium Biblii |
| `group.member.added` | ➕ Ktoś został dodany do grupy |
| `donation.created` | 💝 Nowa darowizna: 50,00 $ |
| `donation.updated` | 💝 Zaktualizowano darowiznę: 75,00 $ |
| `attendance.recorded` | ✅ Zarejestrowano obecność |
| `form.submission.created` | 📝 Otrzymano nowe zgłoszenie z formularza |
| `event.created` | 📅 Nowe wydarzenie: Nabożeństwo wielkanocne |

Pełna lista znajduje się w [katalogu zdarzeń webhooków](/docs/developer/api/webhooks#event-catalog). Każde z tych zdarzeń może zostać przekierowane do Slacka lub Discorda.

## Jeden kanał na temat

Nie musisz wrzucać wszystkich zdarzeń do jednego miejsca. Większość kościołów konfiguruje kilka webhooków:

- Kanał **#donations**, który nasłuchuje tylko `donation.created`
- Kanał **#new-people** dla `person.created` i `group.member.added`
- Kanał **#admin-alerts** dla rzadziej pojawiających się zdarzeń, takich jak `form.submission.created`

Liczba webhooków na kościół nie jest ograniczona. Każdy działa niezależnie. Usunięcie lub wyłączenie jednego z nich nie wpływa na pozostałe.

## Sprawdzanie dostarczeń

Tabela **Ostatnie dostarczenia** w edytorze webhooka pokazuje ostatnie 50 prób. Kliknij wiersz, aby zobaczyć dokładny ładunek, który został wysłany, oraz odpowiedź, którą otrzymano. W przypadku łącznika Slack ładunek ma postać `{"text":"💝 Nowa darowizna: 50,00 $"}`, a nie surową kopertę `{event,churchId,...}`, ponieważ B1 przekształca ją przed wysłaniem.

Jeśli coś się nie powiodło (czerwona odznaka `failed` lub `exhausted`), okno pokaże kod statusu HTTP i treść odpowiedzi, dzięki czemu zobaczysz dokładnie, co Slack lub Discord odrzucił. Zwykle jest to błąd przy kopiowaniu adresu URL.

## Rozwiązywanie problemów

- **Wiadomość się nie pojawia, a status dostarczenia to `400`**: zwykle typ łącznika jest ustawiony na **Standard**, mimo że adres to adres Slacka lub Discorda. Slack i Discord odrzucają surową kopertę. Przełącz listę na **Slack** lub **Discord** i wyślij test ponownie.
- **Webhook został automatycznie wyłączony**: po 3 kolejnych nieudanych dostarczeniach B1 wyłącza webhook. Popraw adres (lub wygeneruj go ponownie w Slacku lub Discordzie) i ponownie włącz **Aktywny**.
- **Wiadomość dotarła, ale brakuje w niej szczegółów**: każda platforma czatu ogranicza rozmiar wiadomości. Wiadomości B1 są z założenia jednowierszowe. Jeśli potrzebujesz bogatszych powiadomień, użyj [Zapier](./zapier) lub [Make](./make), aby złożyć pełniejszą wiadomość Slack za pomocą ich akcji Slack.

## Późniejsza zmiana typu łącznika

Typ łącznika możesz zmienić w istniejącym webhooku. Zmiana zadziała przy następnym dostarczeniu. Jeśli przełączysz typ ze Slacka na Standard, wskaż adres URL własnego punktu końcowego HTTPS. Ten sam sekret podpisu (został wydany przy tworzeniu webhooka) będzie wtedy można zweryfikować w surowej kopercie.

## Zobacz także

- [Zapier](./zapier): wieloetapowe przepływy uruchamiane zdarzeniami B1
- [Make](./make): wizualny kreator scenariuszy
- [Webhooki (dokumentacja dla deweloperów)](/docs/developer/api/webhooks): pełny format ładunku i podpisu, jeśli kiedykolwiek skierujesz webhook na własny serwer
