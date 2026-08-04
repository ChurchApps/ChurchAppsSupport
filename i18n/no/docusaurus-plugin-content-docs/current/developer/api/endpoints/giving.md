---
title: "Gave-endepunkter"
---

# Gave-endepunkter

<div class="article-intro">

Giving-modulen administrerer donasjoner, fond, betalingsbehandling, abonnementer og relaterte finansielle operasjoner. Den støtter flere betalingsgatewayer (Stripe, PayPal), håndterer engangs- og gjentakende donasjoner, sporer donasjonsbatcher, og tilbyr webhook-behandling for asynkrone betalingshendelser.

</div>

**Basissti:** `/giving`

## Donasjoner

Basissti: `/giving/donations`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller egen personId | List alle donasjoner. Filtrer med `?batchId=` eller `?personId=` |
| GET | `/:id` | JWT | Donations.View | Hent en donasjon etter ID |
| GET | `/my` | JWT | — | Hent gjeldende brukers donasjoner |
| GET | `/summary` | JWT | Donations.ViewSummary | Hent donasjonssammendrag. Filtrer med `?startDate=&endDate=&type=`. Bruk `type=person` for oppdeling per person |
| GET | `/testEmail` | Public | — | Send en test-e-post (utvikling/feilsøking) |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater donasjoner (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en donasjon |

### Eksempel: List donasjoner etter batch

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

### Eksempel: Hent donasjonssammendrag

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

## Donasjonsbatcher

Basissti: `/giving/donationbatches`

Utvider `GenericCrudController` med CRUD-rutene: `getById`, `getAll`, `post`, `delete`. Slette-operasjonen fjerner også alle donasjoner innenfor batchen.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle donasjonsbatcher |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent en donasjonsbatch etter ID |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater donasjonsbatcher |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en batch og alle dens donasjoner |

## Gi (Donate)

Basissti: `/giving/donate`

Håndterer den offentlige donasjonsflyten, inkludert belastninger, abonnementer, webhooks og avgiftsberegninger. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Hent tilgjengelige betalingsgatewayer for en kirke (kun offentlige nøkler) |
| POST | `/client-token` | JWT | — | Generer et klienttoken for gateway-initialisering |
| POST | `/create-order` | JWT | — | Opprett en betalingsordre (PayPal-stil kasse) |
| POST | `/charge` | JWT | — | Behandle en engangs-donasjonsbelastning |
| POST | `/subscribe` | JWT | — | Opprett et gjentakende donasjonsabonnement |
| POST | `/log` | Public | — | Logg en donasjon. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Motta betalings-webhook-hendelser (Stripe, PayPal). Krever `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Spill av Stripe-hendelser på nytt for et datointervall. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Beregn transaksjonsavgifter. Body: `{ type, provider, gatewayId, amount, currency }`. Krever `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verifiser reCAPTCHA-token. Body: `{ token }` |

### Eksempel: Behandle en donasjonsbelastning

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

### Eksempel: Opprett et gjentakende abonnement

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

## Fond

Basissti: `/giving/funds`

Utvider `GenericCrudController` med CRUD-rutene: `getById`, `getAll`, `post`, `delete`. `view`-tillatelsen er `null` (ingen tillatelse kreves for å se fond).

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle fond |
| GET | `/:id` | JWT | — | Hent et fond etter ID |
| GET | `/churchId/:churchId` | Public | — | Hent alle fond for en bestemt kirke (offentlig) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Hent et fonds donasjonssum: `{ fundId, totalAmount, donationCount }`. Driver nettstedbyggerens `campaignProgress`-element |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater fond |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et fond |

## Fond-donasjoner

Basissti: `/giving/funddonations`

Sporer hvordan individuelle donasjoner fordeles på tvers av fond. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | List fond-donasjoner. Filtrer med `?donationId=`, `?personId=`, `?fundId=`, eller `?fundName=`. Legg eventuelt til `?startDate=&endDate=` for datofiltrering |
| GET | `/:id` | JWT | Donations.View | Hent en fond-donasjon etter ID |
| GET | `/my` | JWT | — | Hent gjeldende brukers fond-donasjoner |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater fond-donasjoner (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en fond-donasjon |

## Gatewayer

Basissti: `/giving/gateways`

Administrerer konfigurasjoner for betalingsgatewayer (Stripe, PayPal osv.). Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte. Gateway-hemmeligheter er kryptert ved lagring.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gatewayer for kirken |
| GET | `/:id` | JWT | Settings.Edit | Hent en gateway etter ID |
| GET | `/churchId/:churchId` | Public | — | Hent gatewayer for en kirke (kun offentlige nøkler) |
| GET | `/configured/:churchId` | Public | — | Sjekk om en kirke har en konfigurert betalingsgateway |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater gatewayer (krypterer nøkler, tilrettelegger webhooks og produkter) |
| PATCH | `/:id` | JWT | Settings.Edit | Delvis oppdater en gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Slett en gateway (fjerner også dens webhooks) |

### Eksempel: Sjekk gateway-konfigurasjon

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Kunder

Basissti: `/giving/customers`

Utvider `GenericCrudController` med CRUD-rutene: `getAll`, `delete`. Kobler personer til deres betalingsgateway-kundeoppføringer.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle kunder |
| GET | `/:id` | JWT | Donations.ViewSummary eller egen oppføring | Hent en kunde etter ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary eller egen oppføring | Hent gateway-abonnementer for en kunde |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en kunde |

## Abonnementer

Basissti: `/giving/subscriptions`

Administrerer gjentakende donasjonsabonnementer. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle abonnementer |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent et abonnement etter ID |
| POST | `/` | JWT | Donations.Edit eller eget abonnement | Oppdater abonnementer med betalingsgatewayen |
| DELETE | `/:id` | JWT | Donations.Edit eller eget abonnement | Kanseller et abonnement og fjern fra databasen. Body: `{ provider, reason }` |

## Abonnementsfond

Basissti: `/giving/subscriptionfunds`

Sporer fondsfordelinger for gjentakende abonnementer. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller eget abonnement | List abonnementsfond. Filtrer med `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent et abonnementsfond etter ID |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et abonnementsfond |
| DELETE | `/subscription/:id` | JWT | Donations.Edit eller eget abonnement | Slett alle fond for et abonnement |

## Betalingsmetoder

Basissti: `/giving/paymentmethods`

Administrerer lagrede betalingsmetoder (kort, bankkontoer) via betalingsgateway-APIer. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View eller egen personId | Hent alle lagrede betalingsmetoder for en person (kort, bankkontoer) |
| POST | `/addcard` | JWT | — | Legg til en kortbetalingsmetode. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit eller egen personId | Oppdater kortdetaljer. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit eller egen personId | Opprett en Stripe ACH SetupIntent for banktilkobling. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Opprett en anonym ACH SetupIntent for gjestedonasjoner. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit eller egen personId | Legg til en bankkonto via token (avviklet; bruk `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit eller egen personId | Oppdater bankkontodetaljer. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit eller egen kunde | Verifiser en bankkonto med mikroinnskudd. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit eller egen kunde | Slett en betalingsmetode (kort eller bankkonto) |

## Hendelseslogg

Basissti: `/giving/eventLog`

Utvider `GenericCrudController` med CRUD-rutene: `getById`, `getAll`, `post`, `delete`. Sporer betalingsgateway-webhook-hendelser for revisjon og deduplisering.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle hendelseslogger |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent en hendelseslogg etter ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Hent hendelseslogger filtrert etter hendelsestype |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater hendelseslogger |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en hendelseslogg |

## Relaterte sider

- [Medlemskaps-endepunkter](./membership) — Personer, kirker, grupper, roller og tillatelser
- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
