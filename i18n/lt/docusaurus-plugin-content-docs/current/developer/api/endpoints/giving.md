---
title: "Aukojimų galutiniai taškai"
description: "Giving API nuoroda: aukos, partijos, tarpininkai, prenumeratos ir mokėjimo būdai, su autentifikacijos ir leidimų taisyklėmis."
---

# Aukojimų galutiniai taškai

<div class="article-intro">

Aukojimų modulis valdo aukas, fondus, mokėjimų apdorojimą, prenumeratas ir kitas su finansais susijusias operacijas. Jis palaiko kelis mokėjimo vartus (Stripe, PayPal), tvarko vienkartines ir pasikartojančias aukas, seka aukų partijas ir apdoroja webhook įvykius, kurie ateina asinchroniškai.

</div>

**Pagrindinis kelias:** `/giving`

## Aukos

Pagrindinis kelias: `/giving/donations`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View arba savo personId | Gauti visas aukas. Filtruokite pagal `?batchId=` arba `?personId=`. Su `?personId=` dovanos į neatskaitomus fondus neįtraukiamos (kaip ir aukojimo ataskaitose), nebent Donations.View vartotojas prideda `&includeNonDeductible=1`, ką daro B1Admin asmens įrašas |
| GET | `/:id` | JWT | Donations.View | Gauti aukę pagal ID |
| GET | `/my` | JWT | — | Gauti dabartinio vartotojo aukas |
| GET | `/my/summary?year=` | JWT | — | Dabartinio vartotojo aukų suma per metus (pagal numatytuosius – šiuos metus): `{ year, total, count, currency, isConverted }`, sumos konvertuojamos į bažnyčios valiutą. Maitina aukojimo peržiūrą narių pagrindiniame puslapyje |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Aukos, datuotos nurodytame intervale (įskaitant). Abi datos privalomos formatu `YYYY-MM-DD`, kitaip `400`. B1Admin aukojimo ataskaitų puslapiai šiuo būdu prašo vienų kalendorinių metų, o ne visos bažnyčios istorijos |
| GET | `/summary` | JWT | Donations.ViewSummary | Gauti aukų suvestinę. Filtruokite pagal `?startDate=&endDate=&type=`. Naudokite `type=person` detalizacijai pagal asmenį |
| GET | `/testEmail` | Viešas | — | Siųsti bandomąjį el. laišką (kūrimui ir derinimui) |
| POST | `/` | JWT | Donations.Edit arba Donations.Enter | Sukurti arba atnaujinti aukas (partijoje). Tik su Donations.Enter: tiek paskirtoji partija, tiek (atnaujinant) dabartinė aukos partija turi būti atvira, o vartų dovanų (turinčių `transactionId`) keisti negalima; kitu atveju `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit arba Donations.Enter | Ištrinti aukę. Tik Donations.Enter: auka turi būti atviroje partijoje ir nebūti vartų dovana, kitaip `403` |

### Pavyzdys: aukų sąrašas pagal partiją

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

### Pavyzdys: aukų suvestinė

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

## Aukų partijos

Pagrindinis kelias: `/giving/donationbatches`

Plėčia `GenericCrudController` su CRUD maršrutais: `getById`, `getAll`, `post`, `delete`. Ištrinant partiją, pašalinamos ir visos jos aukos.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary arba Donations.Enter | Sąrašas visų aukų partijų |
| GET | `/:id` | JWT | Donations.ViewSummary arba Donations.Enter | Gauti aukų partiją pagal ID |
| POST | `/` | JWT | Donations.Edit arba Donations.Enter | Sukurti arba atnaujinti aukų partijas. Tik su Donations.Enter: esamos partijos atnaujinimui ji turi būti atvira, kitaip `403 { "error": "This batch is closed." }`. `status` čia ignoruojamas, todėl partijos išsaugojimas negali jos atidaryti iš naujo |
| POST | `/:id/close` | JWT | Donations.Edit | Uždaryti partiją: nustato `status` į `closed`, `closedDate` – į dabartinį laiką, o `closedBy` – į vartotojo ID. Grąžina partiją |
| POST | `/:id/reopen` | JWT | Donations.Edit | Iš naujo atidaryti partiją: nustato `status` į `open` ir išvalo `closedDate` bei `closedBy`. Grąžina partiją |
| DELETE | `/:id` | JWT | Donations.Edit | Ištrinti partiją ir visas jos aukas |

Kiekviena partija turi `status` (`open` arba `closed`; naujos ir jau esančios partijos yra `open`), `closedDate` ir `closedBy`. Donations.Edit gali keisti aukas bet kurioje partijoje; Donations.Enter (vaidmenų redaktoriuje rodomas kaip **Enter Donations**) gali pridėti, keisti ar ištrinti aukas ir fondų paskirstymus tik tada, kai partija atvira.

## Aukojimas

Pagrindinis kelias: `/giving/donate`

Tvarko viešąjį aukojimo srautą, įskaitant mokėjimus, prenumeratas, webhook įvykius ir mokesčių skaičiavimus. Bazinių CRUD maršrutų nėra; visi galutiniai taškai yra pasirinktiniai.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Viešas | — | Gauti bažnyčiai prieinamus mokėjimo vartus (tik viešus raktus) |
| POST | `/client-token` | JWT | — | Sugeneruoti kliento žetoną mokėjimo vartams inicijuoti |
| POST | `/create-order` | JWT | — | Sukurti mokėjimo užsakymą (PayPal tipo apmokėjimas) |
| POST | `/charge` | JWT | — | Apdoroti vienkartinę aukos įmoką |
| POST | `/subscribe` | JWT | — | Sukurti pasikartojančios aukos prenumeratą |
| POST | `/log` | Viešas | — | Įrašyti auką. Turinys: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Viešas | — | Priimti mokėjimo webhook įvykius (Stripe, PayPal). Reikalingas `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Pakartotinai atkurti Stripe įvykius nurodytam datų intervalui. Turinys: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Viešas | — | Apskaičiuoti transakcijų mokesčius. Turinys: `{ type, provider, gatewayId, amount, currency }`. Reikalingas `?churchId=` |
| POST | `/captcha-verify` | Viešas | — | Patikrinti reCAPTCHA žetoną. Turinys: `{ token, churchId? }`. Žmogaus atsakymas grąžina `{ response: "human", pass }`, kur `pass` yra pasirašytas svečio aukojimo leidimas, galiojantis 10 minučių (ir tik `churchId`, jei jis nurodytas) |

Kai Api veikia su `CAPTCHA_ENFORCE=true`, svečių (neprisijungusių) vartotojų užklausos į `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` ir `/giving/paymentmethods/ach-setup-intent-anon` (taip pat svečių `POST /content/registrations/register` užklausos su kaina) turi į turinį įtraukti `captchaPass`, kitaip grąžinamas 403 `Captcha verification required`. Leidimą galima naudoti pakartotinai, kol jis nesibaigė, nes Stripe svečių srautas atlieka du kvietimus (pirmiausia pridėti kortelę, paskui apmokėti). Prisijungusių vartotojų užklausos neveikia. `CAPTCHA_ENFORCE` pagal numatytuosius yra `false`; `@churchapps/apphelper` svečių aukojimo formos leidimą siunčia automatiškai.

### Pavyzdys: apdoroti aukos įmoką

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

### Pavyzdys: sukurti pasikartojančią prenumeratą

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

## Fondai

Pagrindinis kelias: `/giving/funds`

Plėčia `GenericCrudController` su CRUD maršrutais: `getById`, `getAll`, `post`, `delete`. `view` leidimas yra `null` (fondų peržiūrai leidimo nereikia).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Sąrašas visų fondų |
| GET | `/:id` | JWT | — | Gauti fondą pagal ID |
| GET | `/churchId/:churchId` | Viešas | — | Gauti visus konkrečios bažnyčios fondus (viešai) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Viešas | — | Gauti fondo aukų sumą: `{ fundId, totalAmount, donationCount }`. Maitina svetainės kūrėjo `campaignProgress` elementą |
| POST | `/` | JWT | Donations.Edit | Sukurti arba atnaujinti fondus |
| DELETE | `/:id` | JWT | Donations.Edit | Ištrinti fondą |

## Fondų aukos

Pagrindinis kelias: `/giving/funddonations`

Seka, kaip atskiros aukos paskirstomos tarp fondų. Bazinių CRUD maršrutų nėra; visi galutiniai taškai yra pasirinktiniai.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Sąrašas fondų aukų. Filtruokite pagal `?donationId=`, `?personId=`, `?fundId=` arba `?fundName=`. Pasirinktinai pridėkite `?startDate=&endDate=` datų filtravimui |
| GET | `/:id` | JWT | Donations.View | Gauti fondo auką pagal ID |
| GET | `/my` | JWT | — | Gauti dabartinio vartotojo fondų aukas |
| POST | `/` | JWT | Donations.Edit arba Donations.Enter | Sukurti arba atnaujinti fondų aukas (partijoje). Tik Donations.Enter: pagrindinė auka turi būti atviroje partijoje ir nebūti vartų dovana, kitaip `403` |
| DELETE | `/:id` | JWT | Donations.Edit arba Donations.Enter | Ištrinti fondo auką. Donations.Enter taikoma ta pati atviros partijos taisyklė |

## Mokėjimo vartai

Pagrindinis kelias: `/giving/gateways`

Valdo mokėjimo vartų konfigūracijas (Stripe, PayPal ir kt.). Bazinių CRUD maršrutų nėra; visi galutiniai taškai yra pasirinktiniai. Mokėjimo vartų slaptažodžiai saugomi užšifruoti.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Sąrašas visų bažnyčios mokėjimo vartų |
| GET | `/:id` | JWT | Settings.Edit | Gauti mokėjimo vartus pagal ID |
| GET | `/churchId/:churchId` | Viešas | — | Gauti bažnyčios mokėjimo vartus (tik viešus raktus) |
| GET | `/configured/:churchId` | Viešas | — | Patikrinti, ar bažnyčiai sukonfigūruoti mokėjimo vartai |
| POST | `/` | JWT | Settings.Edit | Sukurti arba atnaujinti mokėjimo vartus (šifruoja raktus, paruošia webhook ir produktus) |
| PATCH | `/:id` | JWT | Settings.Edit | Iš dalies atnaujinti mokėjimo vartus |
| DELETE | `/:id` | JWT | Settings.Edit | Ištrinti mokėjimo vartus (taip pat pašalina jų webhook) |

### Pavyzdys: patikrinti mokėjimo vartų konfigūraciją

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Klientai

Pagrindinis kelias: `/giving/customers`

Plėčia `GenericCrudController` su CRUD maršrutais: `getAll`, `delete`. Sieja asmenis su jų įrašais mokėjimo vartuose.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Sąrašas visų klientų |
| GET | `/:id` | JWT | Donations.ViewSummary arba savo įrašas | Gauti klientą pagal ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary arba savo įrašas | Gauti kliento prenumeratas mokėjimo vartuose |
| DELETE | `/:id` | JWT | Donations.Edit | Ištrinti klientą |

## Prenumeratos

Pagrindinis kelias: `/giving/subscriptions`

Valdo pasikartojančių aukų prenumeratas. Bazinių CRUD maršrutų nėra; visi galutiniai taškai yra pasirinktiniai.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Sąrašas visų prenumeratų |
| GET | `/:id` | JWT | Donations.ViewSummary | Gauti prenumeratą pagal ID |
| POST | `/` | JWT | Donations.Edit arba savo prenumerata | Atnaujinti prenumeratas mokėjimo vartuose |
| DELETE | `/:id` | JWT | Donations.Edit arba savo prenumerata | Atšaukti prenumeratą ir pašalinti ją iš duomenų bazės. Turinys: `{ provider, reason }` |

## Prenumeratų fondai

Pagrindinis kelias: `/giving/subscriptionfunds`

Seka fondų paskirstymus pasikartojančioms prenumeratoms. Bazinių CRUD maršrutų nėra; visi galutiniai taškai yra pasirinktiniai.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View arba savo prenumerata | Sąrašas prenumeratų fondų. Filtruokite pagal `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Gauti prenumeratos fondą pagal ID |
| DELETE | `/:id` | JWT | Donations.Edit | Ištrinti prenumeratos fondą |
| DELETE | `/subscription/:id` | JWT | Donations.Edit arba savo prenumerata | Ištrinti visus prenumeratos fondus |

## Mokėjimo būdai

Pagrindinis kelias: `/giving/paymentmethods`

Valdo išsaugotus mokėjimo būdus (kortelės, banko sąskaitos) per mokėjimo vartų API. Bazinių CRUD maršrutų nėra; visi galutiniai taškai yra pasirinktiniai.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View arba savo personId | Gauti visus asmens išsaugotus mokėjimo būdus (kortelės, banko sąskaitos) |
| POST | `/addcard` | JWT | — | Pridėti kortelės mokėjimo būdą. Turinys: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit arba savo personId | Atnaujinti kortelės duomenis. Turinys: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit arba savo personId | Sukurti Stripe ACH SetupIntent banko sąskaitos susiejimui. Turinys: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Viešas | — | Sukurti anonimišką ACH SetupIntent svečių aukoms. Turinys: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit arba savo personId | Pridėti banko sąskaitą per žetoną (nebenaudojama; naudokite `ach-setup-intent`). Turinys: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit arba savo personId | Atnaujinti banko sąskaitos duomenis. Turinys: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit arba savo klientas | Patvirtinti banko sąskaitą mikro indėliais. Turinys: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit arba savo klientas | Ištrinti mokėjimo būdą (kortelę ar banko sąskaitą) |

## Įvykių žurnalas

Pagrindinis kelias: `/giving/eventLog`

Plėčia `GenericCrudController` su CRUD maršrutais: `getById`, `getAll`, `post`, `delete`. Seka mokėjimo vartų webhook įvykius auditui ir dublikatų pašalinimui.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Sąrašas visų įvykių įrašų |
| GET | `/:id` | JWT | Donations.ViewSummary | Gauti įvykio įrašą pagal ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Gauti įvykių įrašus, filtruotus pagal įvykio tipą |
| POST | `/` | JWT | Donations.Edit | Sukurti arba atnaujinti įvykių įrašus |
| DELETE | `/:id` | JWT | Donations.Edit | Ištrinti įvykio įrašą |

## Susiję puslapiai

- [Narystės galutiniai taškai](./membership.md) – asmenys, bažnyčios, grupės, vaidmenys ir leidimai
- [Autentifikacija ir leidimai](./authentication.md) – prisijungimo srautas, JWT, OAuth, leidimų modelis
- [Modulio struktūra](../module-structure.md) – kodo organizavimo modeliai
