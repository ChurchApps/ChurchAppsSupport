---
title: "Giving-endpoints"
---

# Giving-endpoints

<div class="article-intro">

Giving-modulen hanterar donationer, fonder, betalningshantering, prenumerationer och relaterade ekonomiska åtgärder. Den stöder flera betalningsgateways (Stripe, PayPal), hanterar engångs- och återkommande donationer, spårar donationsbatcher och tillhandahåller webhook-bearbetning för asynkrona betalningshändelser.

</div>

**Bassökväg:** `/giving`

## Donationer

Bassökväg: `/giving/donations`

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller egen personId | Lista alla donationer. Filtrera med `?batchId=` eller `?personId=`. Med `?personId=` utelämnas gåvor till icke avdragsgilla fonder (som på gåvoutdrag), om inte en anropare med Donations.View lägger till `&includeNonDeductible=1`, vilket B1Admins personpost gör |
| GET | `/:id` | JWT | Donations.View | Hämta en donation med ID |
| GET | `/my` | JWT | — | Hämta den inloggade användarens donationer |
| GET | `/my/summary?year=` | JWT | — | Inloggad användares totala gåvor för ett år (standard är innevarande år): `{ year, total, count, currency, isConverted }`, med summor omräknade till församlingens valuta. Ligger till grund för gåvoförhandsvisningen på medlemmarnas startsida |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Donationer med datum inom intervallet (inklusive). Båda datumen krävs i formatet `YYYY-MM-DD`, annars `400`. B1Admins sidor för gåvoutdrag begär på detta sätt ett kalenderår i taget i stället för hela församlingens historik |
| GET | `/summary` | JWT | Donations.ViewSummary | Hämta donationssammanfattning. Filtrera med `?startDate=&endDate=&type=`. Använd `type=person` för uppdelning per person |
| GET | `/testEmail` | Publik | — | Skicka ett testmejl (utveckling/felsökning) |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Skapa eller uppdatera donationer (batch). Med endast Donations.Enter måste både målbatchen och (vid uppdatering) donationens nuvarande batch vara öppna, och gåvor via betalningsgateway (de med en `transactionId`) kan inte ändras; annars `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit eller Donations.Enter | Ta bort en donation. Endast Donations.Enter: donationen måste finnas i en öppen batch och får inte vara en gåva via betalningsgateway, annars `403` |

### Exempel: Lista donationer per batch

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

### Exempel: Hämta donationssammanfattning

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

## Donationsbatcher

Bassökväg: `/giving/donationbatches`

Utökar `GenericCrudController` med CRUD-rutter: `getById`, `getAll`, `post`, `delete`. Borttagning tar även bort alla donationer i batchen.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary eller Donations.Enter | Lista alla donationsbatcher |
| GET | `/:id` | JWT | Donations.ViewSummary eller Donations.Enter | Hämta en donationsbatch med ID |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Skapa eller uppdatera donationsbatcher. Endast Donations.Enter: uppdatering av en befintlig batch kräver att den är öppen, annars `403 { "error": "This batch is closed." }`. `status` ignoreras här, så att spara en batch inte kan öppna den igen |
| POST | `/:id/close` | JWT | Donations.Edit | Stänger en batch: sätter `status` till `closed`, `closedDate` till nu och `closedBy` till anroparens användar-ID. Returnerar batchen |
| POST | `/:id/reopen` | JWT | Donations.Edit | Öppnar en batch igen: sätter `status` till `open` och rensar `closedDate` och `closedBy`. Returnerar batchen |
| DELETE | `/:id` | JWT | Donations.Edit | Tar bort en batch och alla dess donationer |

Varje batch innehåller `status` (`open` eller `closed`; nya och befintliga batcher är `open`), `closedDate` och `closedBy`. Donations.Edit kan ändra donationer i vilken batch som helst. Donations.Enter (visas som **Enter Donations** i rolleditorn) kan endast lägga till, ändra eller ta bort donationer och fondfördelningar medan batchen är öppen.

## Donera

Bassökväg: `/giving/donate`

Hanterar det publika donationsflödet, inklusive debiteringar, prenumerationer, webhooks och avgiftsberäkningar. Inga grundläggande CRUD-rutter är aktiverade; alla endpoints är anpassade.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Publik | — | Hämta tillgängliga betalningsgateways för en församling (endast publika nycklar) |
| POST | `/client-token` | JWT | — | Generera en klienttoken för initiering av gateway |
| POST | `/create-order` | JWT | — | Skapa en betalningsorder (PayPal-liknande kassa) |
| POST | `/charge` | JWT | — | Bearbeta en engångsdebitering för en donation |
| POST | `/subscribe` | JWT | — | Skapa en återkommande donationsprenumeration |
| POST | `/log` | Publik | — | Logga en donation. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Publik | — | Tar emot webhook-händelser för betalningar (Stripe, PayPal). Kräver `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Spela upp Stripe-händelser för ett datumintervall. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Publik | — | Beräkna transaktionsavgifter. Body: `{ type, provider, gatewayId, amount, currency }`. Kräver `?churchId=` |
| POST | `/captcha-verify` | Publik | — | Verifiera reCAPTCHA-token. Body: `{ token, churchId? }`. Ett mänskligt svar returnerar `{ response: "human", pass }`, där `pass` är ett signerat gästpass för gåvor som gäller i 10 minuter (och endast för `churchId` när ett sådant skickas) |

När API:et körs med `CAPTCHA_ENFORCE=true` måste anrop från gäster (ej inloggade) till `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` och `/giving/paymentmethods/ach-setup-intent-anon` (samt gästanrop till `POST /content/registrations/register` med pris) innehålla `captchaPass` i body, annars returneras 403 `Captcha verification required`. Passet kan återanvändas tills det löper ut, eftersom Stripes gästflöde gör två anrop (lägg till kort och sedan debitering). Anrop från inloggade användare påverkas inte. `CAPTCHA_ENFORCE` är som standard `false`; gästformulären för gåvor i `@churchapps/apphelper` skickar passet automatiskt.

### Exempel: Bearbeta en donationsdebitering

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

### Exempel: Skapa en återkommande prenumeration

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

## Fonder

Bassökväg: `/giving/funds`

Utökar `GenericCrudController` med CRUD-rutter: `getById`, `getAll`, `post`, `delete`. Behörigheten `view` är `null` (ingen behörighet krävs för att visa fonder).

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista alla fonder |
| GET | `/:id` | JWT | — | Hämta en fond med ID |
| GET | `/churchId/:churchId` | Publik | — | Hämta alla fonder för en specifik församling (publik) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Publik | — | Hämta en fonds totala donationer: `{ fundId, totalAmount, donationCount }`. Driver webbplatsbyggarens `campaignProgress`-element |
| POST | `/` | JWT | Donations.Edit | Skapa eller uppdatera fonder |
| DELETE | `/:id` | JWT | Donations.Edit | Ta bort en fond |

## Fonddonationer

Bassökväg: `/giving/funddonations`

Spårar hur enskilda donationer fördelas över fonder. Inga grundläggande CRUD-rutter är aktiverade; alla endpoints är anpassade.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Lista fonddonationer. Filtrera med `?donationId=`, `?personId=`, `?fundId=` eller `?fundName=`. Lägg eventuellt till `?startDate=&endDate=` för filtrering på datum |
| GET | `/:id` | JWT | Donations.View | Hämta en fonddonation med ID |
| GET | `/my` | JWT | — | Hämta den inloggade användarens fonddonationer |
| POST | `/` | JWT | Donations.Edit eller Donations.Enter | Skapa eller uppdatera fonddonationer (batch). Endast Donations.Enter: den överordnade donationen måste finnas i en öppen batch och får inte vara en gåva via betalningsgateway, annars `403` |
| DELETE | `/:id` | JWT | Donations.Edit eller Donations.Enter | Ta bort en fonddonation. Samma regel om öppen batch gäller för Donations.Enter |

## Gateways

Bassökväg: `/giving/gateways`

Hanterar konfigurationer för betalningsgateways (Stripe, PayPal med flera). Inga grundläggande CRUD-rutter är aktiverade; alla endpoints är anpassade. Gateway-hemligheter krypteras i vila.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista alla gateways för församlingen |
| GET | `/:id` | JWT | Settings.Edit | Hämta en gateway med ID |
| GET | `/churchId/:churchId` | Publik | — | Hämta gateways för en församling (endast publika nycklar) |
| GET | `/configured/:churchId` | Publik | — | Kontrollera om en församling har en konfigurerad betalningsgateway |
| POST | `/` | JWT | Settings.Edit | Skapa eller uppdatera gateways (krypterar nycklar, skapar webhooks och produkter) |
| PATCH | `/:id` | JWT | Settings.Edit | Uppdatera en gateway delvis |
| DELETE | `/:id` | JWT | Settings.Edit | Ta bort en gateway (tar även bort dess webhooks) |

### Exempel: Kontrollera gatewaykonfiguration

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Kunder

Bassökväg: `/giving/customers`

Utökar `GenericCrudController` med CRUD-rutter: `getAll`, `delete`. Kopplar personer till deras kundposter hos betalningsgatewayen.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista alla kunder |
| GET | `/:id` | JWT | Donations.ViewSummary eller egen post | Hämta en kund med ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary eller egen post | Hämta gatewayprenumerationer för en kund |
| DELETE | `/:id` | JWT | Donations.Edit | Ta bort en kund |

## Prenumerationer

Bassökväg: `/giving/subscriptions`

Hanterar återkommande donationsprenumerationer. Inga grundläggande CRUD-rutter är aktiverade; alla endpoints är anpassade.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista alla prenumerationer |
| GET | `/:id` | JWT | Donations.ViewSummary | Hämta en prenumeration med ID |
| POST | `/` | JWT | Donations.Edit eller egen prenumeration | Uppdatera prenumerationer hos betalningsgatewayen |
| DELETE | `/:id` | JWT | Donations.Edit eller egen prenumeration | Avbryt en prenumeration och ta bort den från databasen. Body: `{ provider, reason }` |

## Prenumerationsfonder

Bassökväg: `/giving/subscriptionfunds`

Spårar fondfördelningar för återkommande prenumerationer. Inga grundläggande CRUD-rutter är aktiverade; alla endpoints är anpassade.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller egen prenumeration | Lista prenumerationsfonder. Filtrera med `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Hämta en prenumerationsfond med ID |
| DELETE | `/:id` | JWT | Donations.Edit | Ta bort en prenumerationsfond |
| DELETE | `/subscription/:id` | JWT | Donations.Edit eller egen prenumeration | Ta bort alla fonder för en prenumeration |

## Betalningsmetoder

Bassökväg: `/giving/paymentmethods`

Hanterar sparade betalningsmetoder (kort, bankkonton) via betalningsgatewayers API:er. Inga grundläggande CRUD-rutter är aktiverade; alla endpoints är anpassade.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View eller egen personId | Hämta alla sparade betalningsmetoder för en person (kort, bankkonton) |
| POST | `/addcard` | JWT | — | Koppla en kortbetalningsmetod. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit eller egen personId | Uppdatera kortuppgifter. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit eller egen personId | Skapa en Stripe ACH SetupIntent för kopplning av bankkonto. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Publik | — | Skapa en anonym ACH SetupIntent för gåvor från gäster. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit eller egen personId | Lägg till ett bankkonto via token (föråldrad; använd `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit eller egen personId | Uppdatera bankkontouppgifter. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit eller egen kund | Verifiera ett bankkonto med småinsättningar. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit eller egen kund | Ta bort en betalningsmetod (kort eller bankkonto) |

## Händelselogg

Bassökväg: `/giving/eventLog`

Utökar `GenericCrudController` med CRUD-rutter: `getById`, `getAll`, `post`, `delete`. Spårar webhook-händelser från betalningsgatewayer för granskning och deduplicering.

| Metod | Sökväg | Auth | Behörighet | Beskrivning |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista alla händelseloggar |
| GET | `/:id` | JWT | Donations.ViewSummary | Hämta en händelselogg med ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Hämta händelseloggar filtrerade efter händelsetyp |
| POST | `/` | JWT | Donations.Edit | Skapa eller uppdatera händelseloggar |
| DELETE | `/:id` | JWT | Donations.Edit | Ta bort en händelselogg |

## Relaterade sidor

- [Membership Endpoints](./membership) — Personer, församlingar, grupper, roller och behörigheter
- [Authentication & Permissions](./authentication) — Inloggningsflöde, JWT, OAuth, behörighetsmodell
- [Module Structure](../module-structure) — Mönster för kodorganisation
