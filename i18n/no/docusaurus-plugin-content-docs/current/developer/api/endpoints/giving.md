---
title: "Giving-endepunkter"
---

# Giving-endepunkter

<div class="article-intro">

Giving-modulen håndterer gaver, fond, betalingsbehandling, abonnementer og relaterte økonomiske operasjoner. Den støtter flere betalingsleverandører (Stripe, PayPal), håndterer engangsgaver og gjentakende gaver, sporer gavebatcher og tilbyr webhook-behandling for asynkrone betalingshendelser.

</div>

**Basissti:** `/giving`

## Gaver

Basissti: `/giving/donations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Donations.View eller egen personId | Lister alle gaver. Filtrer med `?batchId=` eller `?personId=`. Med `?personId=` utelates gaver til ikke-fradragsberettigede fond (slik som på giverutskrifter), med mindre en bruker med Donations.View legger til `&includeNonDeductible=1`, noe B1Admins personpost gjør |
| GET | `/:id` | JWT | Donations.View | Henter en gave etter ID |
| GET | `/my` | JWT | — | Henter gjeldende brukers gaver |
| GET | `/my/summary?year=` | JWT | — | Gjeldende brukers totale gaver for et år (standard er inneværende år): `{ year, total, count, currency, isConverted }`, med beløp omregnet til kirkens valuta. Brukes av giveroversikten på medlemmets startside |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Gaver datert innenfor perioden (inklusive). Begge datoene er påkrevd i formatet `YYYY-MM-DD`, ellers `400`. B1Admins giverutskriftssider ber om ett kalenderår på denne måten i stedet for hele kirkens historikk |
| GET | `/summary` | JWT | Donations.ViewSummary | Henter gavesammendrag. Filtrer med `?startDate=&endDate=&type=`. Bruk `type=person` for en oppdeling per person |
| GET | `/testEmail` | Offentlig | — | Sender en test-e-post (utvikling/feilsøking) |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Oppretter eller oppdaterer gaver (batch). Med kun Donations.Enter må både målbatchen og (ved oppdatering) gavens nåværende batch være åpne, og gatewaygaver (de med en `transactionId`) kan ikke endres; ellers `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit eller Donations.Enter | Sletter en gave. Kun Donations.Enter: gaven må ligge i en åpen batch og ikke være en gatewaygave, ellers `403` |

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

## Gavebatcher {#donation-batches}

Basissti: `/giving/donationbatches`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Slettingen fjerner også alle gaver i batchen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary eller Donations.Enter | Lister alle gavebatcher |
| GET | `/:id` | JWT | Donations.ViewSummary eller Donations.Enter | Henter en gavebatch etter ID |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Oppretter eller oppdaterer gavebatcher. Kun Donations.Enter: oppdatering av en eksisterende batch krever at den er åpen, ellers `403 { "error": "This batch is closed." }`. `status` ignoreres her, så lagring av en batch kan ikke åpne den igjen |
| POST | `/:id/close` | JWT | Donations.Edit | Lukker en batch: setter `status` til `closed`, `closedDate` til nå og `closedBy` til den innloggede brukerens ID. Returnerer batchen |
| POST | `/:id/reopen` | JWT | Donations.Edit | Åpner en batch igjen: setter `status` til `open` og fjerner `closedDate` og `closedBy`. Returnerer batchen |
| DELETE | `/:id` | JWT | Donations.Edit | Sletter en batch og alle dens gaver |

Hver batch inneholder `status` (`open` eller `closed`; nye og eksisterende batcher er `open`), `closedDate` og `closedBy`. Donations.Edit kan endre gaver i alle batcher; Donations.Enter (vist som **Registrer gaver** i rolleredigeringen) kan bare legge til, endre eller slette gaver og fordelinger på fond mens batchen er åpen.

## Gi (Donate)

Basissti: `/giving/donate`

Håndterer den offentlige giveflyten, inkludert belastninger, abonnementer, webhooks og gebyrberegninger. Ingen basis-CRUD-ruter er aktivert; alle endepunktene er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/gateways/:churchId` | Offentlig | — | Henter tilgjengelige betalingsgatewayer for en kirke (kun offentlige nøkler) |
| POST | `/client-token` | JWT | — | Genererer et klienttoken for initialisering av gateway |
| POST | `/create-order` | JWT | — | Oppretter en betalingsordre (PayPal-lignende utsjekking) |
| POST | `/charge` | JWT | — | Behandler en engangsgave |
| POST | `/subscribe` | JWT | — | Oppretter et gjentakende gaveabonnement |
| POST | `/log` | Offentlig | — | Logger en gave. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Offentlig | — | Mottar webhook-hendelser fra betalinger (Stripe, PayPal). Krever `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Spiller av Stripe-hendelser på nytt for en datoperiode. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Offentlig | — | Beregner transaksjonsgebyrer. Body: `{ type, provider, gatewayId, amount, currency }`. Krever `?churchId=` |
| POST | `/captcha-verify` | Offentlig | — | Verifiserer reCAPTCHA-token. Body: `{ token }` |

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

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Tillatelsen `view` er `null` (ingen tillatelse kreves for å se fond).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Lister alle fond |
| GET | `/:id` | JWT | — | Henter et fond etter ID |
| GET | `/churchId/:churchId` | Offentlig | — | Henter alle fond for en bestemt kirke (offentlig) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Offentlig | — | Henter et fonds totale gavebeløp: `{ fundId, totalAmount, donationCount }`. Brukes av `campaignProgress`-elementet i nettstedsbyggeren |
| POST | `/` | JWT | Donations.Edit | Oppretter eller oppdaterer fond |
| DELETE | `/:id` | JWT | Donations.Edit | Sletter et fond |

## Fondgaver

Basissti: `/giving/funddonations`

Sporer hvordan enkeltgaver fordeles på fond. Ingen basis-CRUD-ruter er aktivert; alle endepunktene er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Donations.View | Lister fondgaver. Filtrer med `?donationId=`, `?personId=`, `?fundId=` eller `?fundName=`. Legg eventuelt til `?startDate=&endDate=` for datofiltrering |
| GET | `/:id` | JWT | Donations.View | Henter en fondgave etter ID |
| GET | `/my` | JWT | — | Henter gjeldende brukers fondgaver |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Oppretter eller oppdaterer fondgaver (batch). Kun Donations.Enter: den overordnede gaven må ligge i en åpen batch og ikke være en gatewaygave, ellers `403` |
| DELETE | `/:id` | JWT | Donations.Edit eller Donations.Enter | Sletter en fondgave. Samme regel for åpen batch gjelder for Donations.Enter |

## Gatewayer

Basissti: `/giving/gateways`

Administrerer konfigurasjoner for betalingsgatewayer (Stripe, PayPal osv.). Ingen basis-CRUD-ruter er aktivert; alle endepunktene er egendefinerte. Gateway-hemmeligheter er kryptert i lagring.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | — | Lister alle gatewayer for kirken |
| GET | `/:id` | JWT | Settings.Edit | Henter en gateway etter ID |
| GET | `/churchId/:churchId` | Offentlig | — | Henter gatewayer for en kirke (kun offentlige nøkler) |
| GET | `/configured/:churchId` | Offentlig | — | Sjekker om en kirke har en konfigurert betalingsgateway |
| POST | `/` | JWT | Settings.Edit | Oppretter eller oppdaterer gatewayer (krypterer nøkler, oppretter webhooks og produkter) |
| PATCH | `/:id` | JWT | Settings.Edit | Oppdaterer en gateway delvis |
| DELETE | `/:id` | JWT | Settings.Edit | Sletter en gateway (fjerner også dens webhooks) |

### Eksempel: Sjekk gatewaykonfigurasjon

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

Utvider `GenericCrudController` med CRUD-ruter: `getAll`, `delete`. Kobler personer til deres kunderegistreringer hos betalingsgatewayen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister alle kunder |
| GET | `/:id` | JWT | Donations.ViewSummary eller egen post | Henter en kunde etter ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary eller egen post | Henter gateway-abonnementer for en kunde |
| DELETE | `/:id` | JWT | Donations.Edit | Sletter en kunde |

## Abonnementer

Basissti: `/giving/subscriptions`

Administrerer gjentakende gaveabonnementer. Ingen basis-CRUD-ruter er aktivert; alle endepunktene er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister alle abonnementer |
| GET | `/:id` | JWT | Donations.ViewSummary | Henter et abonnement etter ID |
| POST | `/` | JWT | Donations.Edit eller eget abonnement | Oppdaterer abonnementer hos betalingsgatewayen |
| DELETE | `/:id` | JWT | Donations.Edit eller eget abonnement | Avslutter et abonnement og fjerner det fra databasen. Body: `{ provider, reason }` |

## Abonnementsfond

Basissti: `/giving/subscriptionfunds`

Sporer fondfordelinger for gjentakende abonnementer. Ingen basis-CRUD-ruter er aktivert; alle endepunktene er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Donations.View eller eget abonnement | Lister abonnementsfond. Filtrer med `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Henter et abonnementsfond etter ID |
| DELETE | `/:id` | JWT | Donations.Edit | Sletter et abonnementsfond |
| DELETE | `/subscription/:id` | JWT | Donations.Edit eller eget abonnement | Sletter alle fond for et abonnement |

## Betalingsmetoder

Basissti: `/giving/paymentmethods`

Administrerer lagrede betalingsmetoder (kort, bankkontoer) via betalingsgatewayens API-er. Ingen basis-CRUD-ruter er aktivert; alle endepunktene er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View eller egen personId | Henter alle lagrede betalingsmetoder for en person (kort, bankkontoer) |
| POST | `/addcard` | JWT | — | Legger til en kortbetalingsmetode. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit eller egen personId | Oppdaterer kortdetaljer. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit eller egen personId | Oppretter en Stripe ACH SetupIntent for kobling av bankkonto. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Offentlig | — | Oppretter en anonym ACH SetupIntent for gjestegaver. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit eller egen personId | Legger til en bankkonto via token (utgått; bruk `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit eller egen personId | Oppdaterer bankkontodetaljer. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit eller egen kunde | Verifiserer en bankkonto med småbeløp. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit eller egen kunde | Sletter en betalingsmetode (kort eller bankkonto) |

## Hendelseslogg

Basissti: `/giving/eventLog`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Sporer webhook-hendelser fra betalingsgatewayer for revisjon og deduplisering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|-----|---------------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister alle hendelseslogger |
| GET | `/:id` | JWT | Donations.ViewSummary | Henter en hendelseslogg etter ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Henter hendelseslogger filtrert på hendelsestype |
| POST | `/` | JWT | Donations.Edit | Oppretter eller oppdaterer hendelseslogger |
| DELETE | `/:id` | JWT | Donations.Edit | Sletter en hendelseslogg |

## Relaterte sider

- [Membership-endepunkter](./membership) — Personer, kirker, grupper, roller og tillatelser
- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
