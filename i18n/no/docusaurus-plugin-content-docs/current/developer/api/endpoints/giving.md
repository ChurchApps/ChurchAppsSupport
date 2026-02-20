---
title: "Giving-endepunkter"
---

# Giving-endepunkter

<div class="article-intro">

Giving-modulen administrerer gaver, fond, betalingsbehandling, abonnementer og relaterte finansielle operasjoner. Den støtter flere betalingsportaler (Stripe, PayPal), håndterer engangs- og gjentakende gaver, sporer gavebatcher og tilbyr webhook-behandling for asynkrone betalingshendelser.

</div>

**Basissti:** `/giving`

## Gaver

Basissti: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller egen personId | List alle gaver. Filtrer med `?batchId=` eller `?personId=` |
| GET | `/:id` | JWT | Donations.View | Hent en gave etter ID |
| GET | `/my` | JWT | — | Hent gjeldende brukers gaver |
| GET | `/summary` | JWT | Donations.ViewSummary | Hent gaveoppsummering. Filtrer med `?startDate=&endDate=&type=`. Bruk `type=person` for per-person-fordeling |
| GET | `/testEmail` | Public | — | Send en test-e-post (utvikling/feilsøking) |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater gaver (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en gave |

### Eksempel: List gaver etter batch

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

### Eksempel: Hent gaveoppsummering

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

## Gavebatcher

Basissti: `/giving/donationbatches`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Sletteoperasjonen fjerner også alle gaver i batchen.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle gavebatcher |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent en gavebatch etter ID |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater gavebatcher |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en batch og alle dens gaver |

## Gi

Basissti: `/giving/donate`

Håndterer den offentlige gaveflyten inkludert belastninger, abonnementer, webhooks og gebyrberegninger. Ingen basis-CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Hent tilgjengelige betalingsportaler for en kirke (kun offentlige nøkler) |
| POST | `/client-token` | JWT | — | Generer et klienttoken for portal-initialisering |
| POST | `/create-order` | JWT | — | Opprett en betalingsordre (PayPal-stil utsjekking) |
| POST | `/charge` | JWT | — | Behandle en engangsbelastning |
| POST | `/subscribe` | JWT | — | Opprett et gjentakende gaveabonnement |
| POST | `/log` | Public | — | Logg en gave. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Motta betalings-webhook-hendelser (Stripe, PayPal). Krever `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Spill av Stripe-hendelser på nytt for en datoperiode. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Beregn transaksjonsgebyrer. Body: `{ type, provider, gatewayId, amount, currency }`. Krever `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verifiser reCAPTCHA-token. Body: `{ token }` |

### Eksempel: Behandle en gavebelastning

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

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. `view`-tillatelsen er `null` (ingen tillatelse kreves for å se fond).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle fond |
| GET | `/:id` | JWT | — | Hent et fond etter ID |
| GET | `/churchId/:churchId` | Public | — | Hent alle fond for en spesifikk kirke (offentlig) |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater fond |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et fond |

## Fondsgaver

Basissti: `/giving/funddonations`

Sporer hvordan individuelle gaver fordeles på tvers av fond. Ingen basis-CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | List fondsgaver. Filtrer med `?donationId=`, `?personId=`, `?fundId=` eller `?fundName=`. Valgfritt legg til `?startDate=&endDate=` for datofiltrering |
| GET | `/:id` | JWT | Donations.View | Hent en fondsgave etter ID |
| GET | `/my` | JWT | — | Hent gjeldende brukers fondsgaver |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater fondsgaver (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en fondsgave |

## Portaler

Basissti: `/giving/gateways`

Administrerer konfigurasjoner for betalingsportaler (Stripe, PayPal osv.). Ingen basis-CRUD-ruter er aktivert; alle endepunkter er egendefinerte. Portal-hemmeligheter er kryptert i hvile.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle portaler for kirken |
| GET | `/:id` | JWT | Settings.Edit | Hent en portal etter ID |
| GET | `/churchId/:churchId` | Public | — | Hent portaler for en kirke (kun offentlige nøkler) |
| GET | `/configured/:churchId` | Public | — | Sjekk om en kirke har en konfigurert betalingsportal |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater portaler (krypterer nøkler, klargjør webhooks og produkter) |
| PATCH | `/:id` | JWT | Settings.Edit | Delvis oppdatering av en portal |
| DELETE | `/:id` | JWT | Settings.Edit | Slett en portal (fjerner også dens webhooks) |

### Eksempel: Sjekk portalkonfigurasjon

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

Utvider `GenericCrudController` med CRUD-ruter: `getAll`, `delete`. Kobler personer til deres betalingsportal-kundeoppføringer.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle kunder |
| GET | `/:id` | JWT | Donations.ViewSummary eller egen oppføring | Hent en kunde etter ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary eller egen oppføring | Hent portal-abonnementer for en kunde |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en kunde |

## Abonnementer

Basissti: `/giving/subscriptions`

Administrerer gjentakende gaveabonnementer. Ingen basis-CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle abonnementer |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent et abonnement etter ID |
| POST | `/` | JWT | Donations.Edit eller eget abonnement | Oppdater abonnementer med betalingsportalen |
| DELETE | `/:id` | JWT | Donations.Edit eller eget abonnement | Avbryt et abonnement og fjern fra databasen. Body: `{ provider, reason }` |

## Abonnementsfond

Basissti: `/giving/subscriptionfunds`

Sporer fondsfordelinger for gjentakende abonnementer. Ingen basis-CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller eget abonnement | List abonnementsfond. Filtrer med `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent et abonnementsfond etter ID |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et abonnementsfond |
| DELETE | `/subscription/:id` | JWT | Donations.Edit eller eget abonnement | Slett alle fond for et abonnement |

## Betalingsmetoder

Basissti: `/giving/paymentmethods`

Administrerer lagrede betalingsmetoder (kort, bankkontoer) via betalingsportal-API-er. Ingen basis-CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View eller egen personId | Hent alle lagrede betalingsmetoder for en person (kort, bankkontoer) |
| POST | `/addcard` | JWT | — | Legg til en kortbetalingsmetode. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit eller egen personId | Oppdater kortdetaljer. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit eller egen personId | Opprett en Stripe ACH SetupIntent for bankkontotilknytning. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Opprett en anonym ACH SetupIntent for gjestegaver. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit eller egen personId | Legg til en bankkonto via token (utfaset; bruk `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit eller egen personId | Oppdater bankkontodetaljer. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit eller egen kunde | Verifiser en bankkonto med mikroinnskudd. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit eller egen kunde | Slett en betalingsmetode (kort eller bankkonto) |

## Hendelseslogg

Basissti: `/giving/eventLog`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Sporer betalingsportal-webhook-hendelser for revisjon og deduplisering.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle hendelseslogger |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent en hendelseslogg etter ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Hent hendelseslogger filtrert etter hendelsestype |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater hendelseslogger |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en hendelseslogg |

## Relaterte sider

- [Membership-endepunkter](./membership) — Personer, kirker, grupper, roller og tillatelser
- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
