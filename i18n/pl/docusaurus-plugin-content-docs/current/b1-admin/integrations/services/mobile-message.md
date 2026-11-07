---
title: "Mobile Message"
description: "Połącz zdarzenia B1 Admin z Mobile Message, australijskim API SMS, przez webhooki Zapier lub Make, by wysyłać SMS-y powitalne, o darowiznach i przypomnienia."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) to australijskie API do wysyłania SMS-ów. Jest popularne wśród australijskich kościołów, ponieważ oferuje lokalne numery i konkurencyjne ceny w Australii, a Clearstream i Text In Church są nastawione głównie na rynek amerykański. Mobile Message nie ma obecnie oficjalnej aplikacji Zapier, ale udostępnia publiczne API REST, dzięki czemu w kilka minut można połączyć zdarzenia B1 z wiadomościami Mobile Message za pomocą **Webhooks by Zapier** (lub modułu HTTP w Make).

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto w [Mobile Message](https://mobilemessage.com.au) z zarejestrowanym identyfikatorem nadawcy (Sender ID) oraz danymi dostępowymi do API (nazwa użytkownika i hasło API w sekcji *Account → API Settings*)
- Konto w [Zapier](https://zapier.com) (lub w [Make](https://www.make.com))
- Użytkownik B1Admin z uprawnieniem **Edit Settings**

</div>

## Co można połączyć

API Mobile Message służy do wysyłania SMS-ów. Nie ma w nim wyzwalaczy, są tylko wiadomości wychodzące. Dlatego wszystkie przepisy dotyczą kierunku B1 → SMS:

| Kierunek | Wyzwalacz w B1 | Efekt |
|---|---|---|
| B1 → Mobile Message | `person.created` | Wiadomość powitalna dla nowej osoby |
| B1 → Mobile Message | `donation.created` | Wiadomość z podziękowaniem dla darczyńcy |
| B1 → Mobile Message | `form.submission.created` | Powiadomienie zespołu dyżurnego |
| B1 → Mobile Message | `event.created` | Przypomnienie rozesłane do listy odbiorców |

## Konfiguracja

### 1. Utwórz klucz API w B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — aby webhook wyzwalacza mógł się zarejestrować
- `people:read` — aby odczytać numer telefonu odbiorcy na podstawie `personId`

### 2. Zbuduj Zap z Webhooks by Zapier

1. **Wyzwalacz** — B1.church: wybierz zdarzenie (np. New Donation).
2. **Akcja** — B1.church: Find Person (z użyciem `data.personId`), aby pobrać numer telefonu i imię.
3. **Akcja** — Webhooks by Zapier: **POST**. Skonfiguruj zgodnie z poniższym opisem.

Ustawienia kroku POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier dodaje to automatycznie)
- **Basic Auth** — w polu *Basic Auth* wpisz `<api_username>|<api_password>` (Zapier przekształci to we właściwy nagłówek `Authorization: Basic …`)

Włącz Zap. Aby sprawdzić, czy SMS dociera, wyślij testowy dar w B1Admin.

## Typowe przepisy

### Przypomnienia o wydarzeniach rano

- **Wyzwalacz** — Schedule by Zapier (codziennie, o 7:00)
- **Akcja** — B1.church: Find Events dla dzisiejszej daty (albo krok Find z ustalonym filtrem daty, albo lista dzisiejszych wydarzeń zapisana w Arkuszu Google)
- **Akcja** — Webhooks by Zapier: POST do Mobile Message z listą wydarzeń wysłaną do zarejestrowanej grupy subskrybentów

### Użyj endpointu wsadowego do rozesłania do listy

Endpoint `/v1/messages` w Mobile Message przyjmuje do 10 000 wiadomości w jednym wywołaniu. Aby wysłać wiadomość do grupy z B1:

- **Wyzwalacz** — B1.church: New Form Submission (z filtrem na konkretny formularz)
- **Akcja** — B1.church: List Group Members dla grupy docelowej (przez krok *Webhooks by Zapier — GET* na `/membership/groupmembers?groupId=…`)
- **Akcja** — Formatter by Zapier → Utilities → rozbij odpowiedź na pozycje tablicy `messages`
- **Akcja** — Webhooks by Zapier: wyślij całą tablicę metodą POST do `/v1/messages`

### Alternatywa w Make

Jeśli wolisz Make, dodaj moduł **HTTP — Make a request** po wyzwalaczu B1 Watch Events i skonfiguruj go tak samo (POST, Basic Auth, treść JSON). Informacje o części po stronie B1 znajdziesz w [przeglądzie Make](../make.md).

## Ograniczenia i uwagi

- **Basic Auth to jedyna metoda uwierzytelniania.** Mobile Message wydaje nazwę użytkownika i hasło w panelu. Traktuj oba jako dane poufne.
- **`sender` musi być zarejestrowanym identyfikatorem nadawcy** na Twoim koncie Mobile Message, w przeciwnym razie wysyłka zwróci `400 Invalid sender`. Przepisy australijskie wymagają rejestracji nadawcy.
- **Numery telefonów w Australii** mogą mieć postać `0412345678` (lokalna) lub `+61412345678` (międzynarodowa). API akceptuje oba formaty, ale jeśli wysyłasz również za granicę, warto ujednolicić numery do postaci `+61…`.
- **Maksymalnie 10 000 wiadomości w jednym żądaniu.** Jest to przydatne przy rozsyłaniu zbiorczym, ale pojedyncze wywołanie webhooka z B1 rzadko zawiera tak dużą listę, dlatego endpoint wsadowy warto zostawić dla zaplanowanych, zbiorczych Zapów.

## Rozwiązywanie problemów

- **POST zwraca `401 Unauthorized`** — dane Basic Auth są nieprawidłowe. Skopiuj je ponownie z sekcji *Account → API Settings* w panelu Mobile Message. Pamiętaj, że nazwa użytkownika to domyślnie adres e-mail Twojego konta, a nie osobny klucz API.
- **POST zwraca `400 Invalid sender`** — wartość `sender` nie jest zarejestrowanym identyfikatorem nadawcy na Twoim koncie. Najpierw zarejestruj go w panelu Mobile Message.
- **Wiadomość dociera, ale jest obcięta** — Mobile Message dzieli wiadomości dłuższe niż ok. 160 znaków na kilka części, a opłata naliczana jest za każdą część. Liczbę części znajdziesz w treści odpowiedzi.

## Zobacz także

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — alternatywni dostawcy SMS z natywnymi aplikacjami Zapier (bez kroku Webhooks by Zapier)
- [Zapier (przegląd)](../zapier.md) — strona B1 wszystkich przepisów Zapier
- [Dokumentacja API Mobile Message](https://mobilemessage.com.au/api-documentation)
