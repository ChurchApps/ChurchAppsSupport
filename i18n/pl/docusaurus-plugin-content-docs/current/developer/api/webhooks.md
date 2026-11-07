---
title: "Webhooki"
---

# Webhooki

<div class="article-intro">

Webhooki umożliwiają kościołowi przesyłanie powiadomień w czasie rzeczywistym do narzędzi zewnętrznych — platform automatyzacji (Zapier, Make, n8n), systemów CRM, programów księgowych lub dowolnej usługi, która przyjmuje żądania HTTP POST. Gdy osoba, grupa lub gospodarstwo domowe zmienia się w B1, B1 wysyła podpisany ładunek JSON na każdy adres URL zasubskrybowany do tego zdarzenia.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Administrator kościoła z uprawnieniem **Edycja ustawień kościoła** rejestruje i zarządza webhookami
- Twój endpoint odbiorczy musi być dostępny przez **HTTPS** pod publicznym adresem
- Miej sposób bezpiecznego przechowywania sekretu podpisu — jest wyświetlany tylko raz

</div>

## Przegląd

Webhooki działają wyłącznie w jedną stronę: to B1 wywołuje Twój endpoint, a Ty nie wywołujesz B1. Każdy webhook to subskrypcja przypisana do kościoła, składająca się z adresu docelowego URL, sekretu podpisu i listy zasubskrybowanych zdarzeń.

Dostarczanie korzysta z **trwałej kolejki wychodzącej** (outbox): gdy wystąpi zasubskrybowane zdarzenie, B1 zapisuje wiersz dostawy, a proces działający w tle wysyła żądanie POST w ciągu około minuty. Nieudane dostawy są ponawiane z wykładniczym opóźnieniem. Nic nie przepada, nawet jeśli dostawa jest powolna lub Twój endpoint chwilowo nie działa.

## Rejestrowanie webhooka

### W B1Admin

Przejdź do **Ustawienia → Dla deweloperów → Webhooki → Nowy webhook**. Wpisz nazwę, adres URL do przesyłania danych i wybierz zdarzenia, które chcesz subskrybować. Po zapisaniu **sekret podpisu zostanie wyświetlony tylko raz** — natychmiast go skopiuj i zapisz w swojej integracji. Nie będzie pokazany ponownie (możesz go później zmienić, ale nie odzyskasz oryginału).

### Przez API

Wszystkie endpointy znajdują się pod ścieżką bazową modułu Membership `/membership/webhooks` i wymagają tokenu JWT administratora kościoła z uprawnieniem `Settings / Edit` **lub [klucza API](./api-keys) utworzonego z zakresem `settings:write`**. Te same trasy akceptują oba sposoby. Dzięki temu Zapier i Make mogą rejestrować webhooki w imieniu kościoła po włączeniu Zapa lub scenariusza.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

Odpowiedź na żądanie utworzenia — i **wyłącznie** ta odpowiedź — zawiera pole `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Metoda i ścieżka | Cel |
|---|---|
| `GET /membership/webhooks` | Lista webhooków kościoła (bez sekretu) |
| `GET /membership/webhooks/events` | Katalog poprawnych nazw zdarzeń |
| `GET /membership/webhooks/:id` | Wczytanie jednego webhooka |
| `POST /membership/webhooks` | Utworzenie (bez `id`) lub aktualizacja (z `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Zmiana sekretu podpisu; zwraca nową wartość jednorazowo |
| `DELETE /membership/webhooks/:id` | Usunięcie webhooka |
| `GET /membership/webhooks/:id/deliveries` | Ostatnie próby dostarczenia dla webhooka |
| `GET /membership/webhooks/deliveries/:deliveryId` | Pełny ładunek i odpowiedź dla jednej dostawy |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Ponowne umieszczenie dostawy w kolejce |

## Katalog zdarzeń

Nazwy zdarzeń mają postać `{entity}.{action}`. Aktualną listę pobierzesz z `GET /membership/webhooks/events`.

| Zdarzenie | Uruchamia się, gdy |
|---|---|
| `person.created` | Dodano osobę |
| `person.updated` | Zmieniono rekord osoby |
| `person.destroyed` | Usunięto osobę |
| `household.created` | Dodano gospodarstwo domowe |
| `household.updated` | Zmieniono gospodarstwo domowe |
| `household.destroyed` | Usunięto gospodarstwo domowe |
| `group.created` | Dodano grupę |
| `group.updated` | Zmieniono grupę |
| `group.destroyed` | Usunięto grupę |
| `group.member.added` | Osoba została dodana do grupy |
| `group.member.removed` | Osoba została usunięta z grupy |
| `donation.created` | Zarejestrowano darowiznę — ręcznie, online lub przy przejściu ze stanu oczekującego na zakończony |
| `donation.updated` | Edytowano rekord darowizny |
| `attendance.recorded` | Zarejestrowano wizytę (ręcznie lub przez zameldowanie) |
| `session.created` | Utworzono nową sesję frekwencji (ręcznie lub automatycznie przy pierwszym zameldowaniu) |
| `form.submission.created` | Wysłano formularz |
| `event.created` | Dodano wydarzenie w kalendarzu |
| `event.updated` | Edytowano wydarzenie w kalendarzu |
| `event.destroyed` | Usunięto wydarzenie w kalendarzu |

## Format ładunku

Każda dostawa to żądanie HTTP `POST` z treścią w formacie JSON i następującymi nagłówkami:

| Nagłówek | Opis |
|---|---|
| `Content-Type` | Zawsze `application/json` |
| `X-B1-Event` | Nazwa zdarzenia, np. `person.created` |
| `X-B1-Delivery-Id` | Unikalny identyfikator tej próby dostarczenia — służy do eliminowania duplikatów |
| `X-B1-Signature` | Podpis HMAC-SHA256 surowej treści (patrz poniżej) |
| `X-B1-Timestamp` | Czas wysłania żądania w sekundach od epoki Unix |
| `User-Agent` | `B1-Webhooks/1.0` |

Treść opakowuje zmieniony zasób w prostą kopertę:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

W przypadku zdarzeń `*.destroyed` pole `data` zawiera tylko `id` i `churchId` usuniętego rekordu.

Zdarzenia, których ładunki odwołują się do innych rekordów po identyfikatorze, zawierają także czytelne nazwy, ustalane w momencie dostarczenia: `personName` i `groupName` w zdarzeniach członkostwa w grupie, `personName` w zdarzeniach frekwencji, darowizn i członkostwa na listach, `groupName` w `session.created` oraz `formName` (a także `personName`, jeśli zgłoszenie jest powiązane z osobą) w `form.submission.created`.

## Typy łączników

Domyślnym formatem dostawy jest powyższa koperta JSON — `connectorType: "standard"`. W przypadku [Slacka i Discorda](/docs/b1-admin/integrations/slack-discord) ten sam silnik webhooków wysyła zamiast tego wiadomość w formacie czatu, którą te usługi akceptują bezpośrednio:

| `connectorType` | Wysyłana treść | Kiedy używać |
|---|---|---|
| `"standard"` (domyślny) | Podpisana koperta `{event, churchId, occurredAt, data}` | Tworzysz własną integrację lub kierujesz dane do Zapiera / Make / własnego serwera |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Wysyłasz bezpośrednio na adres URL Slack Incoming Webhook |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Wysyłasz bezpośrednio na adres URL webhooka kanału Discord |
| `"mailchimp"` | brak — łącznik sam wywołuje API Mailchimpa | Chcesz [synchronizację odbiorców](/docs/b1-admin/integrations/services/mailchimp) bez adresu URL do hostowania |

Typ łącznika ustawiasz w liście rozwijanej **Typ łącznika** w edytorze webhooka lub przez pole `connectorType` w treści `POST /membership/webhooks`. Podpisany nagłówek `X-B1-Signature` jest nadal wysyłany przy dostawach do Slacka i Discorda (ignorują go bez szkody), więc późniejsze przełączenie webhooka z powrotem na `standard` nie wymaga ponownego podpisywania.

Slack i Discord to czysta zmiana kształtu treści — silnik nadal wysyła żądanie POST na adres URL podany przez kościół. `mailchimp` to pierwszy łącznik, który sam obsługuje wymianę HTTP: dla każdego zdarzenia wysyła uwierzytelnione żądania upsert/archive/tag do API Mailchimpa (`MailchimpConnector.deliver`), a jego dane logowania (`{apiKey, audienceId}`) są przechowywane zaszyfrowane algorytmem AES w `webhooks.connectorConfig` i są dostępne wyłącznie do zapisu przez API. Webhooki Mailchimpa akceptują tylko zdarzenia dotyczące osób, członków grup i członków list; trasa zapisu weryfikuje klucz i odbiorców w Mailchimpie, zanim zaakceptuje konfigurację. Wiersze dostaw zawierają standardową kopertę, dzięki czemu dziennik dostaw pokazuje, co B1 otrzymało, wraz z odpowiedzią Mailchimpa. Sytuacje bez mapowania (osoba bez adresu e-mail, zdarzenie bez mapowania) są oznaczane jako zakończone sukcesem z treścią odpowiedzi `Skipped:`, zamiast zużywać ponowne próby.

## Dostawy testowe

Każdy edytor webhooka ma przycisk **Wyślij zdarzenie testowe** — odpowiadające mu wywołanie API to `POST /membership/webhooks/:id/test`. Trasa testowa buduje syntetyczny ładunek dla pierwszego zasubskrybowanego zdarzenia, wysyła go synchronicznie przez prawdziwą ścieżkę dostarczania z podpisem (a w przypadku Slacka i Discorda także przez `formatForConnector`) i zwraca wynikowy wiersz dostawy, w tym `responseStatus` i `responseBody`. Użyj jej, aby potwierdzić łączność i obsługę podpisu, zanim włączysz prawdziwą integrację. Dla webhooków `mailchimp` test zamiast tego weryfikuje zapisane dane logowania w API Mailchimpa (syntetyczne zdarzenie zapisałoby fikcyjnego subskrybenta w prawdziwej liście odbiorców kościoła) i zwraca wynik w formacie dostawy, bez tworzenia wiersza.

## Weryfikacja podpisów

Zawsze sprawdzaj `X-B1-Signature`, zanim zaufasz ładunkowi. Podpis to `sha256=`, po którym następuje szesnastkowy HMAC-SHA256 **surowej treści żądania**, klucz stanowi Twój sekret podpisu. Oblicz go na bajtach, które otrzymałeś — nie serializuj ponownie sparsowanego JSON-a.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

Odrzucaj każde żądanie, którego podpis nie pasuje. Opcjonalnie odrzucaj też żądania, których `X-B1-Timestamp` jest starszy niż kilka minut, aby ograniczyć okno ataku z powtórzeniem (replay).

## Obsługa w SDK

W przypadku Node.js pakiet `@churchapps/integration-sdk` zawiera typowany weryfikator oraz middleware dla Express, który za Ciebie obsługuje przechwycenie surowej treści, sprawdzenie podpisu i parsowanie koperty:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK udostępnia także `WebhookVerifier.verify(secret, rawBody, signatureHeader)` dla środowisk innych niż Express (funkcje serverless, Fastify itp.). Szczegóły znajdziesz w pakiecie na npm.

## Dostarczanie i ponowne próby

Twój endpoint powinien jak najszybciej odpowiedzieć statusem `2xx` — najlepiej po umieszczeniu pracy w kolejce, a nie po jej wykonaniu. Każda odpowiedź inna niż `2xx`, błąd połączenia lub odpowiedź wolniejsza niż **10 sekund** jest traktowana jako nieudana dostawa.

Nieudane dostawy są ponawiane z wykładniczym opóźnieniem — **16 prób w ciągu około 5 dni**. Odstęp rośnie od 1 minuty, przez godziny, aż do przerw trzydniowych przy ostatnich próbach. Po szesnastej nieudanej próbie dostawa otrzymuje status `exhausted` i zostaje porzucona.

Dostawa działa w modelu **co najmniej raz** (at-least-once): dostawa może dotrzeć więcej niż jeden raz (na przykład gdy Twój endpoint zadziała, ale odpowiedź zostanie zgubiona). Używaj nagłówka `X-B1-Delivery-Id` do eliminowania duplikatów — przetwarzaj każdy identyfikator tylko raz, a powtórki traktuj jako operacje bez skutku.

### Automatyczne wyłączanie

Jeśli webhook wygeneruje **trzy kolejne dostawy o statusie exhausted**, B1 wyłączy go automatycznie. Napraw swój endpoint, a następnie ponownie włącz webhook w B1Admin (lub przez `POST /membership/webhooks` z `"active": true`).

## Przeglądanie i ponowne wysyłanie

Edytor webhooka w B1Admin pokazuje tabelę **Ostatnie dostawy** — zdarzenie, status, liczbę prób, kod odpowiedzi i znacznik czasu. Wybranie wiersza pokazuje pełny wysłany ładunek i otrzymaną odpowiedź.

Użyj opcji **Wyślij ponownie**, aby ponownie umieścić w kolejce dowolną wcześniejszą dostawę z jej oryginalnym ładunkiem — przydatne po naprawieniu błędu w endpoincie lub do uzupełnienia zdarzeń, które Twój endpoint pominął, gdy był niedostępny.

## Wymagania dotyczące adresu URL

Ponieważ adresy URL webhooków podaje kościół, B1 stosuje zabezpieczenia przed fałszowaniem żądań po stronie serwera (SSRF). Adres URL webhooka zostaje odrzucony — zarówno przy rejestracji, jak i ponownie sprawdzany przed każdą dostawą — jeśli:

- nie używa protokołu **`https`**
- wskazuje na `localhost`, nazwę hosta `.local` / `.internal`, lub
- rozwiązuje się do adresu IP **prywatnego, loopback, link-local lub metadanych chmury**

Twój endpoint musi być publicznie dostępną usługą HTTPS.
