---
title: "Punkty końcowe modułu Giving"
---

# Punkty końcowe modułu Giving

<div class="article-intro">

Moduł Giving zarządza darowiznami, funduszami, przetwarzaniem płatności, subskrypcjami i powiązanymi operacjami finansowymi. Obsługuje wiele bramek płatniczych (Stripe, PayPal), obsługuje darowizny jednorazowe i cykliczne, śledzi partie darowizn oraz zapewnia przetwarzanie webhooków dla asynchronicznych zdarzeń płatniczych.

</div>

**Ścieżka bazowa:** `/giving`

## Darowizny

Ścieżka bazowa: `/giving/donations`

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Donations.View lub własny personId | Lista wszystkich darowizn. Filtruj za pomocą `?batchId=` lub `?personId=`. Przy `?personId=` darowizny na fundusze niepodlegające odliczeniu są pomijane (jak na zestawieniach darowizn), chyba że wywołujący z uprawnieniem Donations.View doda `&includeNonDeductible=1`, co robi rekord osoby w B1Admin |
| GET | `/:id` | JWT | Donations.View | Pobierz darowiznę według ID |
| GET | `/my` | JWT | — | Pobierz darowizny bieżącego użytkownika |
| GET | `/my/summary?year=` | JWT | — | Suma darowizn bieżącego użytkownika za rok (domyślnie bieżący rok): `{ year, total, count, currency, isConverted }`, z sumami przeliczonymi na walutę kościoła. Zasila podgląd darowizn na stronie głównej członka |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Darowizny z datą w podanym zakresie (włącznie). Obie daty są wymagane w formacie `RRRR-MM-DD`, w przeciwnym razie `400`. Strony zestawień darowizn w B1Admin pobierają w ten sposób jeden rok kalendarzowy zamiast pełnej historii kościoła |
| GET | `/summary` | JWT | Donations.ViewSummary | Pobierz podsumowanie darowizn. Filtruj za pomocą `?startDate=&endDate=&type=`. Użyj `type=person`, aby uzyskać podział na osoby |
| GET | `/testEmail` | Publiczny | — | Wyślij testowy e-mail (rozwój/debugowanie) |
| POST | `/` | JWT | Donations.Edit lub Donations.Enter | Utwórz lub zaktualizuj darowizny (partia). Przy samym Donations.Enter zarówno docelowa partia, jak i (w przypadku aktualizacji) bieżąca partia darowizny muszą być otwarte, a darowizn z bramki (z `transactionId`) nie można zmieniać; w przeciwnym razie `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit lub Donations.Enter | Usuń darowiznę. Tylko Donations.Enter: darowizna musi znajdować się w otwartej partii i nie może być darowizną z bramki, w przeciwnym razie `403` |

### Przykład: lista darowizn według partii

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Przykład: pobieranie podsumowania darowizn

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Partie darowizn

Ścieżka bazowa: `/giving/donationbatches`

Rozszerza `GenericCrudController` o trasy CRUD: `getById`, `getAll`, `post`, `delete`. Operacja usuwania usuwa także wszystkie darowizny należące do partii.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Donations.ViewSummary lub Donations.Enter | Lista wszystkich partii darowizn |
| GET | `/:id` | JWT | Donations.ViewSummary lub Donations.Enter | Pobierz partię darowizn według ID |
| POST | `/` | JWT | Donations.Edit lub Donations.Enter | Utwórz lub zaktualizuj partie darowizn. Tylko Donations.Enter: aktualizacja istniejącej partii wymaga, aby była otwarta, w przeciwnym razie `403 { "error": "This batch is closed." }`. Pole `status` jest tutaj ignorowane, więc zapisanie partii nie może jej ponownie otworzyć |
| POST | `/:id/close` | JWT | Donations.Edit | Zamknij partię: ustawia `status` na `closed`, `closedDate` na bieżący czas i `closedBy` na identyfikator użytkownika wywołującego. Zwraca partię |
| POST | `/:id/reopen` | JWT | Donations.Edit | Otwórz partię ponownie: ustawia `status` na `open` i czyści `closedDate` oraz `closedBy`. Zwraca partię |
| DELETE | `/:id` | JWT | Donations.Edit | Usuń partię i wszystkie jej darowizny |

Każda partia zawiera `status` (`open` lub `closed`; nowe i istniejące partie mają status `open`), `closedDate` oraz `closedBy`. Donations.Edit może zmieniać darowizny w dowolnej partii. Donations.Enter (w edytorze ról wyświetlane jako **Wprowadzanie darowizn**) może dodawać, zmieniać lub usuwać darowizny i podziały na fundusze tylko wtedy, gdy ich partia jest otwarta.

## Donate

Ścieżka bazowa: `/giving/donate`

Obsługuje publiczny przepływ darowizn, w tym płatności, subskrypcje, webhooki i obliczanie opłat. Nie są włączone żadne bazowe trasy CRUD; wszystkie punkty końcowe są niestandardowe.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/gateways/:churchId` | Publiczny | — | Pobierz dostępne bramki płatnicze dla kościoła (tylko klucze publiczne) |
| POST | `/client-token` | JWT | — | Wygeneruj token klienta do inicjalizacji bramki |
| POST | `/create-order` | JWT | — | Utwórz zamówienie płatnicze (checkout w stylu PayPal) |
| POST | `/charge` | JWT | — | Przetwórz jednorazową płatność darowizny |
| POST | `/subscribe` | JWT | — | Utwórz subskrypcję darowizn cyklicznych |
| POST | `/log` | Publiczny | — | Zapisz darowiznę. Treść: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Publiczny | — | Odbieraj zdarzenia webhooków płatniczych (Stripe, PayPal). Wymaga `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Ponownie przetwórz zdarzenia Stripe z podanego zakresu dat. Treść: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Publiczny | — | Oblicz opłaty transakcyjne. Treść: `{ type, provider, gatewayId, amount, currency }`. Wymaga `?churchId=` |
| POST | `/captcha-verify` | Publiczny | — | Zweryfikuj token reCAPTCHA. Treść: `{ token, churchId? }`. Odpowiedź człowieka zwraca `{ response: "human", pass }`, gdzie `pass` to podpisana przepustka darowizny dla gościa, ważna przez 10 minut (i tylko dla `churchId`, jeśli został wysłany) |

Gdy Api działa z `CAPTCHA_ENFORCE=true`, wywołania od gości (niezalogowanych) do `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` oraz `/giving/paymentmethods/ach-setup-intent-anon` (a także wywołania `POST /content/registrations/register` z cenami od gości) muszą zawierać `captchaPass` w treści żądania; w przeciwnym razie zwracają 403 `Captcha verification required`. Przepustkę można używać ponownie do czasu jej wygaśnięcia, ponieważ przepływ Stripe dla gości wykonuje dwa wywołania (dodanie karty, a następnie płatność). Wywołania od zalogowanych użytkowników nie są objęte tym wymogiem. `CAPTCHA_ENFORCE` domyślnie ma wartość `false`; formularze darowizn dla gości w `@churchapps/apphelper` automatycznie wysyłają przepustkę.

### Przykład: przetwarzanie jednorazowej darowizny

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Przykład: tworzenie subskrypcji cyklicznej

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Fundusze

Ścieżka bazowa: `/giving/funds`

Rozszerza `GenericCrudController` o trasy CRUD: `getById`, `getAll`, `post`, `delete`. Uprawnienie `view` ma wartość `null` (do przeglądania funduszy nie jest wymagane żadne uprawnienie).

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich funduszy |
| GET | `/:id` | JWT | — | Pobierz fundusz według ID |
| GET | `/churchId/:churchId` | Publiczny | — | Pobierz wszystkie fundusze danego kościoła (publicznie) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Publiczny | — | Pobierz sumę darowizn na fundusz: `{ fundId, totalAmount, donationCount }`. Zasila element `campaignProgress` kreatora stron |
| POST | `/` | JWT | Donations.Edit | Utwórz lub zaktualizuj fundusze |
| DELETE | `/:id` | JWT | Donations.Edit | Usuń fundusz |

## Darowizny na fundusze

Ścieżka bazowa: `/giving/funddonations`

Śledzi, jak poszczególne darowizny są przydzielane do funduszy. Nie są włączone żadne bazowe trasy CRUD; wszystkie punkty końcowe są niestandardowe.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Donations.View | Lista darowizn na fundusze. Filtruj za pomocą `?donationId=`, `?personId=`, `?fundId=` lub `?fundName=`. Opcjonalnie dodaj `?startDate=&endDate=`, aby filtrować według daty |
| GET | `/:id` | JWT | Donations.View | Pobierz darowiznę na fundusz według ID |
| GET | `/my` | JWT | — | Pobierz darowizny na fundusze bieżącego użytkownika |
| POST | `/` | JWT | Donations.Edit lub Donations.Enter | Utwórz lub zaktualizuj darowizny na fundusze (partia). Tylko Donations.Enter: nadrzędna darowizna musi znajdować się w otwartej partii i nie może być darowizną z bramki, w przeciwnym razie `403` |
| DELETE | `/:id` | JWT | Donations.Edit lub Donations.Enter | Usuń darowiznę na fundusz. Dla Donations.Enter obowiązuje ta sama zasada otwartej partii |

## Bramki płatnicze

Ścieżka bazowa: `/giving/gateways`

Zarządza konfiguracjami bramek płatniczych (Stripe, PayPal itd.). Nie są włączone żadne bazowe trasy CRUD; wszystkie punkty końcowe są niestandardowe. Sekrety bramek są szyfrowane podczas przechowywania.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | — | Lista wszystkich bramek kościoła |
| GET | `/:id` | JWT | Settings.Edit | Pobierz bramkę według ID |
| GET | `/churchId/:churchId` | Publiczny | — | Pobierz bramki kościoła (tylko klucze publiczne) |
| GET | `/configured/:churchId` | Publiczny | — | Sprawdź, czy kościół ma skonfigurowaną bramkę płatniczą |
| POST | `/` | JWT | Settings.Edit | Utwórz lub zaktualizuj bramki (szyfruje klucze, tworzy webhooki i produkty) |
| PATCH | `/:id` | JWT | Settings.Edit | Częściowo zaktualizuj bramkę |
| DELETE | `/:id` | JWT | Settings.Edit | Usuń bramkę (usuwa także jej webhooki) |

### Przykład: sprawdzanie konfiguracji bramki

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Klienci

Ścieżka bazowa: `/giving/customers`

Rozszerza `GenericCrudController` o trasy CRUD: `getAll`, `delete`. Łączy osoby z ich rekordami klientów w bramce płatniczej.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Donations.ViewSummary | Lista wszystkich klientów |
| GET | `/:id` | JWT | Donations.ViewSummary lub własny rekord | Pobierz klienta według ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary lub własny rekord | Pobierz subskrypcje klienta w bramce |
| DELETE | `/:id` | JWT | Donations.Edit | Usuń klienta |

## Subskrypcje

Ścieżka bazowa: `/giving/subscriptions`

Zarządza subskrypcjami darowizn cyklicznych. Nie są włączone żadne bazowe trasy CRUD; wszystkie punkty końcowe są niestandardowe.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Donations.ViewSummary | Lista wszystkich subskrypcji |
| GET | `/:id` | JWT | Donations.ViewSummary | Pobierz subskrypcję według ID |
| POST | `/` | JWT | Donations.Edit lub własna subskrypcja | Zaktualizuj subskrypcje w bramce płatniczej |
| DELETE | `/:id` | JWT | Donations.Edit lub własna subskrypcja | Anuluj subskrypcję i usuń ją z bazy danych. Treść: `{ provider, reason }` |

## Fundusze subskrypcji

Ścieżka bazowa: `/giving/subscriptionfunds`

Śledzi przydział funduszy dla subskrypcji cyklicznych. Nie są włączone żadne bazowe trasy CRUD; wszystkie punkty końcowe są niestandardowe.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Donations.View lub własna subskrypcja | Lista funduszy subskrypcji. Filtruj za pomocą `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Pobierz fundusz subskrypcji według ID |
| DELETE | `/:id` | JWT | Donations.Edit | Usuń fundusz subskrypcji |
| DELETE | `/subscription/:id` | JWT | Donations.Edit lub własna subskrypcja | Usuń wszystkie fundusze subskrypcji |

## Metody płatności

Ścieżka bazowa: `/giving/paymentmethods`

Zarządza zapisanymi metodami płatności (karty, konta bankowe) za pośrednictwem API bramek płatniczych. Nie są włączone żadne bazowe trasy CRUD; wszystkie punkty końcowe są niestandardowe.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/personid/:id` | JWT | Donations.View lub własny personId | Pobierz wszystkie zapisane metody płatności osoby (karty, konta bankowe) |
| POST | `/addcard` | JWT | — | Dołącz kartę jako metodę płatności. Treść: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit lub własny personId | Zaktualizuj dane karty. Treść: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit lub własny personId | Utwórz Stripe ACH SetupIntent do powiązania konta bankowego. Treść: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Publiczny | — | Utwórz anonimowy ACH SetupIntent dla darowizn od gości. Treść: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit lub własny personId | Dodaj konto bankowe za pomocą tokenu (przestarzałe; użyj `ach-setup-intent`). Treść: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit lub własny personId | Zaktualizuj dane konta bankowego. Treść: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit lub własny klient | Zweryfikuj konto bankowe za pomocą mikropłatności próbnych. Treść: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit lub własny klient | Usuń metodę płatności (kartę lub konto bankowe) |

## Dziennik zdarzeń

Ścieżka bazowa: `/giving/eventLog`

Rozszerza `GenericCrudController` o trasy CRUD: `getById`, `getAll`, `post`, `delete`. Śledzi zdarzenia webhooków bramki płatniczej w celach audytu i deduplikacji.

| Metoda | Ścieżka | Uwierzytelnianie | Uprawnienie | Opis |
|--------|---------|------------------|-------------|------|
| GET | `/` | JWT | Donations.ViewSummary | Lista wszystkich dzienników zdarzeń |
| GET | `/:id` | JWT | Donations.ViewSummary | Pobierz dziennik zdarzeń według ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Pobierz dzienniki zdarzeń filtrowane według typu zdarzenia |
| POST | `/` | JWT | Donations.Edit | Utwórz lub zaktualizuj dzienniki zdarzeń |
| DELETE | `/:id` | JWT | Donations.Edit | Usuń dziennik zdarzeń |

## Powiązane strony

- [Punkty końcowe członkostwa](./membership) — Osoby, kościoły, grupy, role i uprawnienia
- [Uwierzytelnianie i uprawnienia](./authentication) — Przepływ logowania, JWT, OAuth, model uprawnień
- [Struktura modułów](../module-structure) — Wzorce organizacji kodu
