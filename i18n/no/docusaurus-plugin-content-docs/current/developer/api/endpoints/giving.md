---
title: "Giving-endepunkter"
---

# Giving-endepunkter

<div class="article-intro">

Giving-modulen administrerer gaver, fond, betalingsbehandling, abonnementer og relaterte økonomiske operasjoner. Den støtter flere betalingsgatewayer (Stripe, PayPal), håndterer engangs- og gjentakende gaver, følger gavepartier, og tilbyr webhook-behandling for asynkrone betalingshendelser.

</div>

**Basissti:** `/giving`

## Gaver

Basissti: `/giving/donations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller egen personId | List alle gaver. Filtrer med `?batchId=` eller `?personId=`. Med `?personId=` utelates gaver til ikke-fradragsberettigede fond (som på gaveoversikter) med mindre en innringer med Donations.View legger til `&includeNonDeductible=1`, noe B1Admins personpost gjør |
| GET | `/:id` | JWT | Donations.View | Hent en gave etter ID |
| GET | `/my` | JWT | — | Hent gjeldende brukers gaver |
| GET | `/my/summary?year=` | JWT | — | Gjeldende brukers gavesum for et år (standard er inneværende år): `{ year, total, count, currency, isConverted }`, med summer konvertert til kirkens valuta. Støtter gaveforhåndsvisningen på hjemmesiden for medlemmer |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Gaver datert innenfor intervallet (inklusiv). Begge datoene er påkrevd som `YYYY-MM-DD`, ellers `400`. B1Admins sider for gaveoversikter ber om ett kalenderår på denne måten i stedet for kirkens fulle historikk |
| GET | `/summary` | JWT | Donations.ViewSummary | Hent gavesammendrag. Filtrer med `?startDate=&endDate=&type=`. Bruk `type=person` for oppdeling per person |
| GET | `/testEmail` | Offentlig | — | Send en test-e-post (utvikling/feilsøking) |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Opprett eller oppdater gaver (parti). Med kun Donations.Enter må både målpartiet og (ved oppdatering) gavens nåværende parti være åpne, og gatewaygaver (de med en `transactionId`) kan ikke endres; ellers `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit eller Donations.Enter | Slett en gave. Kun Donations.Enter: gaven må ligge i et åpent parti og ikke være en gatewaygave, ellers `403` |

### Eksempel: liste gaver for et parti

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

### Eksempel: hent gavesammendrag

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

## Gavepartier

Basissti: `/giving/donationbatches`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Slettingen fjerner også alle gaver i partiet.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary eller Donations.Enter | List alle gavepartier |
| GET | `/:id` | JWT | Donations.ViewSummary eller Donations.Enter | Hent et gaveparti etter ID |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Opprett eller oppdater gavepartier. Kun Donations.Enter: oppdatering av et eksisterende parti krever at det er åpent, ellers `403 { "error": "This batch is closed." }`. `status` ignoreres her, så lagring av et parti kan ikke gjenåpne det |
| POST | `/:id/close` | JWT | Donations.Edit | Lukk et parti: setter `status` til `closed`, `closedDate` til nå, og `closedBy` til innringerens bruker-ID. Returnerer partiet |
| POST | `/:id/reopen` | JWT | Donations.Edit | Gjenåpne et parti: setter `status` til `open` og fjerner `closedDate` og `closedBy`. Returnerer partiet |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et parti og alle dets gaver |

Hvert parti inkluderer `status` (`open` eller `closed`; nye og eksisterende parti er `open`), `closedDate` og `closedBy`. Donations.Edit kan endre gaver i alle parti; Donations.Enter (vist som **Registrer gaver** i rolleredigeringen) kan bare legge til, endre eller slette gaver og fondsfordelinger mens partiet er åpent.

## Donate

Basissti: `/giving/donate`

Håndterer den offentlige gaveflyten, inkludert belastninger, abonnementer, webhooks og gebyrberegninger. Ingen CRUD-basisruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Offentlig | — | Hent tilgjengelige betalingsgatewayer for en kirke (kun offentlige nøkler) |
| POST | `/client-token` | JWT | — | Generer et klienttoken for initialisering av gatewayen |
| POST | `/create-order` | JWT | — | Opprett en betalingsordre (PayPal-lignende utsjekk) |
| POST | `/charge` | JWT | — | Behandle en engangsbelastning for gave |
| POST | `/subscribe` | JWT | — | Opprett et gjentakende gaveabonnement |
| POST | `/log` | Offentlig | — | Logg en gave. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Offentlig | — | Motta betalings-webhook-hendelser (Stripe, PayPal). Krever `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Spill av Stripe-hendelser for et datointervall. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Offentlig | — | Beregn transaksjonsgebyrer. Body: `{ type, provider, gatewayId, amount, currency }`. Krever `?churchId=` |
| POST | `/captcha-verify` | Offentlig | — | Verifiser reCAPTCHA-token. Body: `{ token, churchId? }`. Et menneskelig svar returnerer `{ response: "human", pass }`, der `pass` er et signert gjestegivingspass som gjelder i 10 minutter (og bare for `churchId` når en sendes) |

Når API-et kjører med `CAPTCHA_ENFORCE=true`, må gjestekall (ikke innloggede) til `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` og `/giving/paymentmethods/ach-setup-intent-anon` inkludere den `captchaPass` i body, ellers returnerer de 403 `Captcha verification required`. Passet kan gjenbrukes til det utløper, fordi Stripe-gjesteflyten gjør to kall (legg til kort, deretter belastning). Innloggede kall påvirkes ikke. `CAPTCHA_ENFORCE` er som standard `false`; gjestegiveskjemaene i `@churchapps/apphelper` sender passet automatisk.

### Eksempel: behandle en gavebelastning

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

### Eksempel: opprett et gjentakende abonnement

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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle fond |
| GET | `/:id` | JWT | — | Hent et fond etter ID |
| GET | `/churchId/:churchId` | Offentlig | — | Hent alle fond for en bestemt kirke (offentlig) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Offentlig | — | Hent et fonds gavesum: `{ fundId, totalAmount, donationCount }`. Driver elementet `campaignProgress` i nettsidebyggeren |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater fond |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et fond |

## Fondsgaver

Basissti: `/giving/funddonations`

Sporer hvordan enkeltgaver fordeles på fond. Ingen CRUD-basisruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | List fondsgaver. Filtrer med `?donationId=`, `?personId=`, `?fundId=` eller `?fundName=`. Legg eventuelt til `?startDate=&endDate=` for datofiltrering |
| GET | `/:id` | JWT | Donations.View | Hent en fondsgave etter ID |
| GET | `/my` | JWT | — | Hent gjeldende brukers fondsgaver |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Opprett eller oppdater fondsgaver (parti). Kun Donations.Enter: den overordnede gaven må ligge i et åpent parti og ikke være en gatewaygave, ellers `403` |
| DELETE | `/:id` | JWT | Donations.Edit eller Donations.Enter | Slett en fondsgave. Samme regel for åpent parti for Donations.Enter |

## Gatewayer

Basissti: `/giving/gateways`

Administrerer konfigurasjoner for betalingsgatewayer (Stripe, PayPal osv.). Ingen CRUD-basisruter er aktivert; alle endepunkter er egendefinerte. Hemmeligheter for gatewayer lagres kryptert i hvile.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gatewayer for kirken |
| GET | `/:id` | JWT | Settings.Edit | Hent en gateway etter ID |
| GET | `/churchId/:churchId` | Offentlig | — | Hent gatewayer for en kirke (kun offentlige nøkler) |
| GET | `/configured/:churchId` | Offentlig | — | Sjekk om en kirke har en konfigurert betalingsgateway |
| POST | `/` | JWT | Settings.Edit | Opprett eller oppdater gatewayer (krypterer nøkler, klargjør webhooks og produkter) |
| PATCH | `/:id` | JWT | Settings.Edit | Oppdater en gateway delvis |
| DELETE | `/:id` | JWT | Settings.Edit | Slett en gateway (fjerner også dens webhooks) |

### Eksempel: sjekk gatewaykonfigurasjon

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

Utvider `GenericCrudController` med CRUD-ruter: `getAll`, `delete`. Kobler personer til deres kunneposter hos betalingsgatewayen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle kunder |
| GET | `/:id` | JWT | Donations.ViewSummary eller egen post | Hent en kunde etter ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary eller egen post | Hent gatewayabonnementer for en kunde |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en kunde |

## Abonnementer

Basissti: `/giving/subscriptions`

Administrerer gjentakende gaveabonnementer. Ingen CRUD-basisruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle abonnementer |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent et abonnement etter ID |
| POST | `/` | JWT | Donations.Edit eller eget abonnement | Oppdater abonnementer hos betalingsgatewayen |
| DELETE | `/:id` | JWT | Donations.Edit eller eget abonnement | Avslutt et abonnement og fjern det fra databasen. Body: `{ provider, reason }` |

## Abonnementsfond

Basissti: `/giving/subscriptionfunds`

Sporer fondsfordelinger for gjentakende abonnementer. Ingen CRUD-basisruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller eget abonnement | List abonnementsfond. Filtrer med `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent et abonnementsfond etter ID |
| DELETE | `/:id` | JWT | Donations.Edit | Slett et abonnementsfond |
| DELETE | `/subscription/:id` | JWT | Donations.Edit eller eget abonnement | Slett alle fond for et abonnement |

## Betalingsmetoder

Basissti: `/giving/paymentmethods`

Administrerer lagrede betalingsmetoder (kort, bankkontoer) via betalingsgatewayens API-er. Ingen CRUD-basisruter er aktivert; alle endepunkter er egendefinerte.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View eller egen personId | Hent alle lagrede betalingsmetoder for en person (kort, bankkontoer) |
| POST | `/addcard` | JWT | — | Legg til en kortbetalingsmetode. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit eller egen personId | Oppdater kortdetaljer. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit eller egen personId | Opprett en Stripe ACH SetupIntent for kobling av bankkonto. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Offentlig | — | Opprett en anonym ACH SetupIntent for gjestegaver. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit eller egen personId | Legg til en bankkonto via token (utgått; bruk `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit eller egen personId | Oppdater bankkontodetaljer. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit eller egen kunde | Verifiser en bankkonto med småbeløp. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit eller egen kunde | Slett en betalingsmetode (kort eller bankkonto) |

## Hendelseslogg

Basissti: `/giving/eventLog`

Utvider `GenericCrudController` med CRUD-ruter: `getById`, `getAll`, `post`, `delete`. Sporer webhook-hendelser fra betalingsgatewayer for revisjon og deduplisering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | List alle hendelseslogger |
| GET | `/:id` | JWT | Donations.ViewSummary | Hent en hendelseslogg etter ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Hent hendelseslogger filtrert etter hendelsestype |
| POST | `/` | JWT | Donations.Edit | Opprett eller oppdater hendelseslogger |
| DELETE | `/:id` | JWT | Donations.Edit | Slett en hendelseslogg |

## Relaterte sider

- [Membership-endepunkter](./membership) — personer, kirker, grupper, roller og tillatelser
- [Autentisering og tillatelser](./authentication) — innloggingsflyt, JWT, OAuth, tillatelsesmodell
- [Modulstruktur](../module-structure) — mønstre for kodeorganisering
