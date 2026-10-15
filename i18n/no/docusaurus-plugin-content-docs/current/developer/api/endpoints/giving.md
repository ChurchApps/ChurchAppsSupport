---
title: "Giving-endepunkter"
---

# Giving-endepunkter

<div class="article-intro">

Giving-modulen håndterer gaver, fond, betalingsbehandling, abonnementer og relaterte økonomiske operasjoner. Den støtter flere betalingsgatewayer (Stripe, PayPal), håndterer engangsgaver og gjentakende gaver, sporer gavebatcher og tilbyr behandling av webhooks for asynkrone betalingshendelser.

</div>

**Basisbane:** `/giving`

## Gaver

Basisbane: `/giving/donations`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller egen personId | Liste over alle gaver. Filtrer med `?batchId=` eller `?personId=`. Med `?personId=` utelates gaver til ikke-fradragsberettigede fond (som på giverbekreftelser), med mindre en innringer med Donations.View legger til `&includeNonDeductible=1`, noe B1Admins personregistrering gjør |
| GET | `/:id` | JWT | Donations.View | Hent en gave etter ID |
| GET | `/my` | JWT | — | Hent gjeldende brukers gaver |
| GET | `/my/summary?year=` | JWT | — | Gjeldende brukers gavesum for et år (standard inneværende år): `{ year, total, count, currency, isConverted }`, med summene konvertert til kirkens valuta. Støtter gaveforhåndsvisningen på medlemmets startside |
| GET | `/summary` | JWT | Donations.ViewSummary | Hent gavesammendrag. Filtrer med `?startDate=&endDate=&type=`. Bruk `type=person` for oppdeling per person |
| GET | `/testEmail` | Offentlig | — | Send en testepost (utvikling/feilsøking) |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater gaver (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en gave |

### Eksempel: Liste over gaver etter batch

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

### Eksempel: Hent gavesammendrag

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

Basisbane: `/giving/donationbatches`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Slettingen fjerner også alle gaver i batchen.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liste over alle gavebatcher |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent en gavebatch etter ID |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater gavebatcher |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en batch og alle dens gaver |

## Gi

Basisbane: `/giving/donate`

Håndterer den offentlige gaveflyten, inkludert belastninger, abonnementer, webhooks og gebyrberegninger. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Offentlig | — | Hent tilgjengelige betalingsgatewayer for en kirke (kun offentlige nøkler) |
| POST | `/client-token` | JWT | — | Generer et klienttoken for initialisering av gatewayen |
| POST | `/create-order` | JWT | — | Opprett en betalingsordre (PayPal-stil kassasystem) |
| POST | `/charge` | JWT | — | Behandle en engangsbelastning for gave |
| POST | `/subscribe` | JWT | — | Opprett et abonnement for gjentakende gaver |
| POST | `/log` | Offentlig | — | Logg en gave. Forespørsel: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Offentlig | — | Motta hendelser fra betalingswebhooks (Stripe, PayPal). Krever `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Spill av Stripe-hendelser for et datointervall. Forespørsel: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Offentlig | — | Beregn transaksjonsgebyrer. Forespørsel: `{ type, provider, gatewayId, amount, currency }`. Krever `?churchId=` |
| POST | `/captcha-verify` | Offentlig | — | Verifiser reCAPTCHA-token. Forespørsel: `{ token }` |

### Eksempel: Behandle en belastning for gave

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

### Eksempel: Opprette et gjentakende abonnement

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

Basisbane: `/giving/funds`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. `view`-tillatelsen er `null` (ingen tillatelse kreves for å se fond).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle fond |
| GET | `/:id` | JWT | — | Hent et fond etter ID |
| GET | `/churchId/:churchId` | Offentlig | — | Hent alle fond for en bestemt kirke (offentlig) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Offentlig | — | Hent totalsummen for gaver til et fond: `{ fundId, totalAmount, donationCount }`. Brukes av `campaignProgress`-elementet i nettstedsbyggeren |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater fond |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et fond |

## Fondgaver

Basisbane: `/giving/funddonations`

Sporer hvordan enkeltgaver fordeles på fond. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Liste over fondgaver. Filtrer med `?donationId=`, `?personId=`, `?fundId=` eller `?fundName=`. Valgfritt kan du legge til `?startDate=&endDate=` for datofiltrering |
| GET | `/:id` | JWT | Donations.View | Hent en fondgave etter ID |
| GET | `/my` | JWT | — | Hent gjeldende brukers fondgaver |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater fondgaver (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en fondgave |

## Gatewayer

Basisbane: `/giving/gateways`

Administrerer konfigurasjoner for betalingsgatewayer (Stripe, PayPal osv.). Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte. Hemmeligheter for gatewayer er kryptert i hvile.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle gatewayer for kirken |
| GET | `/:id` | JWT | Settings.Edit | Hent en gateway etter ID |
| GET | `/churchId/:churchId` | Offentlig | — | Hent gatewayer for en kirke (kun offentlige nøkler) |
| GET | `/configured/:churchId` | Offentlig | — | Sjekk om en kirke har en konfigurert betalingsgateway |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater gatewayer (krypterer nøkler, oppretter webhooks og produkter) |
| PATCH | `/:id` | JWT | Settings.Edit | Oppdater en gateway delvis |
| DELETE | `/:id` | JWT | Settings.Edit | Slett en gateway (fjerner også dens webhooks) |

### Eksempel: Sjekke gatewaykonfigurasjon

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Kunder

Basisbane: `/giving/customers`

Utvider `GenericCrudController` med CRUD-ruter: `getAll`, `delete`. Kobler personer til deres kunderegistreringer hos betalingsgatewayen.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liste over alle kunder |
| GET | `/:id` | JWT | Donations.ViewSummary eller egen registrering | Hent en kunde etter ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary eller egen registrering | Hent gatewayabonnementer for en kunde |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en kunde |

## Abonnementer

Basisbane: `/giving/subscriptions`

Administrerer gjentakende gaveabonnementer. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liste over alle abonnementer |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent et abonnement etter ID |
| POST | `/` | JWT | Donations.Edit eller eget abonnement | Oppdater abonnementer hos betalingsgatewayen |
| DELETE | `/:id` | JWT | Donations.Edit eller eget abonnement | Avslutt et abonnement og fjern det fra databasen. Forespørsel: `{ provider, reason }` |

## Fond for abonnementer

Basisbane: `/giving/subscriptionfunds`

Sporer fondfordelinger for gjentakende abonnementer. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller eget abonnement | Liste over abonnementsfond. Filtrer med `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent et abonnementsfond etter ID |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et abonnementsfond |
| DELETE | `/subscription/:id` | JWT | Donations.Edit eller eget abonnement | Slett alle fond for et abonnement |

## Betalingsmetoder

Basisbane: `/giving/paymentmethods`

Administrerer lagrede betalingsmetoder (kort, bankkontoer) via API-er for betalingsgatewayer. Ingen grunnleggende CRUD-ruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View eller egen personId | Hent alle lagrede betalingsmetoder for en person (kort, bankkontoer) |
| POST | `/addcard` | JWT | — | Legg til en kortbetalingsmetode. Forespørsel: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit eller egen personId | Oppdater kortdetaljer. Forespørsel: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit eller egen personId | Opprett en Stripe ACH SetupIntent for kobling av bankkonto. Forespørsel: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Offentlig | — | Opprett en anonym ACH SetupIntent for gjestegaver. Forespørsel: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit eller egen personId | Legg til en bankkonto via token (utgått; bruk `ach-setup-intent`). Forespørsel: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit eller egen personId | Oppdater bankkontodetaljer. Forespørsel: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit eller egen kunde | Verifiser en bankkonto med småbeløp. Forespørsel: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit eller egen kunde | Slett en betalingsmetode (kort eller bankkonto) |

## Hendelseslogg

Basisbane: `/giving/eventLog`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Sporer hendelser fra betalingsgatewayers webhooks for revisjon og deduplisering.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liste over alle hendelseslogger |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent en hendelseslogg etter ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Hent hendelseslogger filtrert på hendelsestype |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater hendelseslogger |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en hendelseslogg |

## Relaterte sider

- [Membership-endepunkter](./membership) — Personer, kirker, grupper, roller og tillatelser
- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
