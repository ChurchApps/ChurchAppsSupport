---
title: "Giving Endpoints"
---

# Giving Endpoints

<div class="article-intro">

De Giving module beheert donaties, fondsen, betalingsverwerking, abonnementen en gerelateerde financiële bewerkingen. Het ondersteunt meerdere betalingsgateways (Stripe, PayPal), verwerkt eenmalige en terugkerende donaties, volgt donatiebatches bij en biedt webhook-verwerking voor asynchrone betalingsgebeurtenissen.

</div>

**Base path:** `/giving`

## Donaties

Base path: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View of eigen personId | Alle donaties weergeven. Filteren op `?batchId=` of `?personId=` |
| GET | `/:id` | JWT | Donations.View | Een donatie op ID ophalen |
| GET | `/my` | JWT | — | Donaties van huidige gebruiker ophalen |
| GET | `/summary` | JWT | Donations.ViewSummary | Samenvatting donaties ophalen. Filteren op `?startDate=&endDate=&type=`. Gebruik `type=person` voor verdeling per persoon |
| GET | `/testEmail` | Public | — | Test-e-mail verzenden (ontwikkelings-/debugdoeleinden) |
| POST | `/` | JWT | Donations.Edit | Donaties maken of bijwerken (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Een donatie verwijderen |

### Voorbeeld: Donaties per Batch Weergeven

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

### Voorbeeld: Donatiessamenvatting Ophalen

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

## Donatiebatches

Base path: `/giving/donationbatches`

Breidt `GenericCrudController` uit met CRUD-routes: `getById`, `getAll`, `post`, `delete`. De delete-bewerking verwijdert ook alle donaties in de batch.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle donatiebatches weergeven |
| GET | `/:id` | JWT | Donations.ViewSummary | Een donatiebatch op ID ophalen |
| POST | `/` | JWT | Donations.Edit | Donatiebatches maken of bijwerken |
| DELETE | `/:id` | JWT | Donations.Edit | Een batch en alle donaties ervan verwijderen |

## Donatie

Base path: `/giving/donate`

Verwerkt de openbare donatieflow inclusief kosten, abonnementen, webhooks en kostprijsberekeningen. Geen CRUD-routes; alle endpoints zijn aangepast.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Beschikbare betalingsgateways voor een kerk ophalen (alleen publieke sleutels) |
| POST | `/client-token` | JWT | — | Een clienttoken voor gateway-initialisatie genereren |
| POST | `/create-order` | JWT | — | Een betalingsopdracht maken (PayPal-stijl checkout) |
| POST | `/charge` | JWT | — | Een eenmalige donatiekost verwerken |
| POST | `/subscribe` | JWT | — | Een terugkerende donatie-abonnement maken |
| POST | `/log` | Public | — | Een donatie registreren. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Betalingswebhook-gebeurtenissen ontvangen (Stripe, PayPal). Vereist `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Stripe-gebeurtenissen voor een datumbereik opnieuw afspelen. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Transactiekosten berekenen. Body: `{ type, provider, gatewayId, amount, currency }`. Vereist `?churchId=` |
| POST | `/captcha-verify` | Public | — | reCAPTCHA-token verifiëren. Body: `{ token }` |

### Voorbeeld: Een Donatiekost Verwerken

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

### Voorbeeld: Een Terugkerend Abonnement Maken

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

## Fondsen

Base path: `/giving/funds`

Breidt `GenericCrudController` uit met CRUD-routes: `getById`, `getAll`, `post`, `delete`. De `view`-machtiging is `null` (geen machtiging vereist voor het weergeven van fondsen).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle fondsen weergeven |
| GET | `/:id` | JWT | — | Een fonds op ID ophalen |
| GET | `/churchId/:churchId` | Public | — | Alle fondsen voor een specifieke kerk ophalen (openbaar) |
| POST | `/` | JWT | Donations.Edit | Fondsen maken of bijwerken |
| DELETE | `/:id` | JWT | Donations.Edit | Een fonds verwijderen |

## Fondstransacties

Base path: `/giving/funddonations`

Volgt bij hoe individuele donaties over fondsen worden verdeeld. Geen CRUD-routes; alle endpoints zijn aangepast.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Fondstransacties weergeven. Filteren op `?donationId=`, `?personId=`, `?fundId=`, of `?fundName=`. Optioneel `?startDate=&endDate=` voor datuumfiltering |
| GET | `/:id` | JWT | Donations.View | Een fondstransactie op ID ophalen |
| GET | `/my` | JWT | — | Fondstransacties van huidige gebruiker ophalen |
| POST | `/` | JWT | Donations.Edit | Fondstransacties maken of bijwerken (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Een fondstransactie verwijderen |

## Gateways

Base path: `/giving/gateways`

Beheert betalingsgatewayconfiguraties (Stripe, PayPal, enz.). Geen CRUD-routes; alle endpoints zijn aangepast. Gateway-geheimen worden in rust versleuteld.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle gateways voor de kerk weergeven |
| GET | `/:id` | JWT | Settings.Edit | Een gateway op ID ophalen |
| GET | `/churchId/:churchId` | Public | — | Gateways voor een kerk ophalen (alleen publieke sleutels) |
| GET | `/configured/:churchId` | Public | — | Controleren of een kerk een geconfigureerde betalingsgateway heeft |
| POST | `/` | JWT | Settings.Edit | Gateways maken of bijwerken (versleutelt sleutels, richt webhooks en producten in) |
| PATCH | `/:id` | JWT | Settings.Edit | Een gateway gedeeltelijk bijwerken |
| DELETE | `/:id` | JWT | Settings.Edit | Een gateway verwijderen (verwijdert ook bijbehorende webhooks) |

### Voorbeeld: Gateway-Configuratie Controleren

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Klanten

Base path: `/giving/customers`

Breidt `GenericCrudController` uit met CRUD-routes: `getAll`, `delete`. Koppelt personen aan hun betalingsgateway-klantrecords.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle klanten weergeven |
| GET | `/:id` | JWT | Donations.ViewSummary of eigen record | Een klant op ID ophalen |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary of eigen record | Gateway-abonnementen voor een klant ophalen |
| DELETE | `/:id` | JWT | Donations.Edit | Een klant verwijderen |

## Abonnementen

Base path: `/giving/subscriptions`

Beheert terugkerende donatie-abonnementen. Geen CRUD-routes; alle endpoints zijn aangepast.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle abonnementen weergeven |
| GET | `/:id` | JWT | Donations.ViewSummary | Een abonnement op ID ophalen |
| POST | `/` | JWT | Donations.Edit of eigen abonnement | Abonnementen met de betalingsgateway bijwerken |
| DELETE | `/:id` | JWT | Donations.Edit of eigen abonnement | Een abonnement annuleren en uit database verwijderen. Body: `{ provider, reason }` |

## Abonnementsfondsen

Base path: `/giving/subscriptionfunds`

Volgt fondstoewijzingen voor terugkerende abonnementen bij. Geen CRUD-routes; alle endpoints zijn aangepast.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View of eigen abonnement | Abonnementsfondsen weergeven. Filteren op `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Een abonnementsfonds op ID ophalen |
| DELETE | `/:id` | JWT | Donations.Edit | Een abonnementsfonds verwijderen |
| DELETE | `/subscription/:id` | JWT | Donations.Edit of eigen abonnement | Alle fondsen voor een abonnement verwijderen |

## Betaalmethoden

Base path: `/giving/paymentmethods`

Beheert opgeslagen betaalmethoden (kaarten, bankrekeningen) via betalingsgateway-API's. Geen CRUD-routes; alle endpoints zijn aangepast.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View of eigen personId | Alle opgeslagen betaalmethoden voor een persoon ophalen (kaarten, bankrekeningen) |
| POST | `/addcard` | JWT | — | Een kaartbetaalmethode toevoegen. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit of eigen personId | Kaartgegevens bijwerken. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit of eigen personId | Een Stripe ACH SetupIntent voor bankrekeningkoppeling maken. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Een anonieme ACH SetupIntent voor gastdonaties maken. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit of eigen personId | Een bankrekening via token toevoegen (verouderd; gebruik `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit of eigen personId | Bankrekeninggegevens bijwerken. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit of eigen klant | Een bankrekening verifiëren met micro-deposits. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit of eigen klant | Een betaalmethode verwijderen (kaart of bankrekening) |

## Gebeurtenissenlogboek

Base path: `/giving/eventLog`

Breidt `GenericCrudController` uit met CRUD-routes: `getById`, `getAll`, `post`, `delete`. Volgt betalingsgateway-webhookgebeurtenissen voor auditing en deduplicatie bij.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle logboekitems weergeven |
| GET | `/:id` | JWT | Donations.ViewSummary | Een logboekitem op ID ophalen |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Logboekitems gefilterd op gebeurtenistype |
| POST | `/` | JWT | Donations.Edit | Logboekitems maken of bijwerken |
| DELETE | `/:id` | JWT | Donations.Edit | Een logboekitem verwijderen |

## Gerelateerde Pagina's

- [Membership Endpoints](./membership) — Personen, kerken, groepen, rollen en machtigingen
- [Authentication & Permissions](./authentication) — Loginflow, JWT, OAuth, machtigingsmodel
- [Module Structure](../module-structure) — Codeorganisatiepatronen
