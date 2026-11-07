---
title: "Koncové body darovania"
---

# Koncové body darovania

<div class="article-intro">

Modul Dary spravuje dary, fondy, spracovanie platieb, predplatné a súvisiace finančné operácie. Podporuje viacero platobných brán (Stripe, PayPal), spracováva jednorazové aj opakujúce sa dary, sleduje dávky darov a zabezpečuje spracovanie webhookov pre asynchrónne udalosti platieb.

</div>

**Základná cesta:** `/giving`

## Dary

Základná cesta: `/giving/donations`

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Donations.View alebo vlastné personId | Zobrazí všetky dary. Filtrujte pomocou `?batchId=` alebo `?personId=`. Pri `?personId=` sa dary do fondov, ktoré nie sú odpočítateľné, vynechajú (ako na výpisoch darov), pokiaľ volajúci s oprávnením Donations.View nepridá `&includeNonDeductible=1`, čo robí záznam osoby v B1Admin |
| GET | `/:id` | JWT | Donations.View | Získa dar podľa ID |
| GET | `/my` | JWT | — | Získa dary aktuálneho používateľa |
| GET | `/my/summary?year=` | JWT | — | Celková suma darov aktuálneho používateľa za rok (predvolene aktuálny rok): `{ year, total, count, currency, isConverted }`, so sumami prepočítanými na menu cirkvi. Slúži na náhľad darov na domovskej stránke člena |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Dary s dátumom v zadanom rozsahu (vrátane). Oba dátumy sú povinné vo formáte `YYYY-MM-DD`, inak `400`. Stránky výpisov darov v B1Admin takto požadujú jeden kalendárny rok namiesto celej histórie cirkvi |
| GET | `/summary` | JWT | Donations.ViewSummary | Získa súhrn darov. Filtrujte pomocou `?startDate=&endDate=&type=`. Použite `type=person` pre rozpis podľa osôb |
| GET | `/testEmail` | Verejné | — | Odošle testovací e-mail (vývoj/ladenie) |
| POST | `/` | JWT | Donations.Edit alebo Donations.Enter | Vytvorí alebo aktualizuje dary (dávku). Ak má volajúci iba Donations.Enter, cieľová dávka a pri aktualizácii aktuálna dávka daru musia byť otvorené, a dary z brány (tie s `transactionId`) nie je možné meniť; inak `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit alebo Donations.Enter | Vymaže dar. Iba Donations.Enter: dar musí byť v otvorenej dávke a nesmie byť darom z brány, inak `403` |

### Príklad: Zoznam darov podľa dávky

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

### Príklad: Získanie súhrnu darov

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

## Dávky darov

Základná cesta: `/giving/donationbatches`

Rozširuje `GenericCrudController` s CRUD trasami: `getById`, `getAll`, `post`, `delete`. Operácia delete tiež odstráni všetky dary v dávke.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Donations.ViewSummary alebo Donations.Enter | Zobrazí všetky dávky darov |
| GET | `/:id` | JWT | Donations.ViewSummary alebo Donations.Enter | Získa dávku darov podľa ID |
| POST | `/` | JWT | Donations.Edit alebo Donations.Enter | Vytvorí alebo aktualizuje dávky darov. Iba Donations.Enter: aktualizácia existujúcej dávky vyžaduje, aby bola otvorená, inak `403 { "error": "This batch is closed." }`. Hodnota `status` sa tu ignoruje, takže uloženie dávky ju nemôže znovu otvoriť |
| POST | `/:id/close` | JWT | Donations.Edit | Uzavrie dávku: nastaví `status` na `closed`, `closedDate` na aktuálny čas a `closedBy` na ID používateľa volajúceho. Vráti dávku |
| POST | `/:id/reopen` | JWT | Donations.Edit | Znovu otvorí dávku: nastaví `status` na `open` a vymaže `closedDate` a `closedBy`. Vráti dávku |
| DELETE | `/:id` | JWT | Donations.Edit | Vymaže dávku a všetky jej dary |

Každá dávka obsahuje `status` (`open` alebo `closed`; nové aj existujúce dávky sú `open`), `closedDate` a `closedBy`. Donations.Edit môže meniť dary v ľubovoľnej dávke. Donations.Enter (v editore rolí zobrazené ako **Zadávať dary**) môže pridávať, meniť alebo mazať dary a rozdelenia do fondov iba vtedy, keď je ich dávka otvorená.

## Darovanie

Základná cesta: `/giving/donate`

Spracúva verejný tok darovania vrátane platieb, predplatného, webhookov a výpočtov poplatkov. Nie sú povolené žiadne základné CRUD trasy; všetky koncové body sú vlastné.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/gateways/:churchId` | Verejné | — | Získa dostupné platobné brány pre cirkev (iba verejné kľúče) |
| POST | `/client-token` | JWT | — | Vygeneruje klientsky token na inicializáciu brány |
| POST | `/create-order` | JWT | — | Vytvorí platobnú objednávku (pokladňa v štýle PayPal) |
| POST | `/charge` | JWT | — | Spracuje jednorazovú platbu daru |
| POST | `/subscribe` | JWT | — | Vytvorí opakujúce sa predplatné darov |
| POST | `/log` | Verejné | — | Zaznamená dar. Telo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Verejné | — | Prijíma webhook udalosti platieb (Stripe, PayPal). Vyžaduje `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Znovu prehrá udalosti Stripe za zadaný rozsah dátumov. Telo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Verejné | — | Vypočíta poplatky za transakcie. Telo: `{ type, provider, gatewayId, amount, currency }`. Vyžaduje `?churchId=` |
| POST | `/captcha-verify` | Verejné | — | Overí token reCAPTCHA. Telo: `{ token, churchId? }`. Odpoveď človeka vráti `{ response: "human", pass }`, pričom `pass` je podpísaný hosťovský prístup na darovanie platný 10 minút (a iba pre `churchId`, ak je odoslané) |

Keď API beží s `CAPTCHA_ENFORCE=true`, hosťovské (neprihlásené) volania na `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` a `/giving/paymentmethods/ach-setup-intent-anon` (a hosťovské volania `POST /content/registrations/register` s cenou) musia obsahovať `captchaPass` v tele, inak vrátia 403 `Captcha verification required`. Prístup možno znovu použiť až do vypršania platnosti, pretože hosťovský tok Stripe robí dve volania (pridanie karty a potom platba). Volania prihlásených používateľov nie sú ovplyvnené. `CAPTCHA_ENFORCE` je predvolene `false`; formuláre hosťovského darovania v `@churchapps/apphelper` posielajú prístup automaticky.

### Príklad: Spracovanie platby daru

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

### Príklad: Vytvorenie opakujúceho sa predplatného

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

## Fondy

Základná cesta: `/giving/funds`

Rozširuje `GenericCrudController` s CRUD trasami: `getById`, `getAll`, `post`, `delete`. Oprávnenie `view` je `null` (na zobrazenie fondov nie je potrebné žiadne oprávnenie).

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky fondy |
| GET | `/:id` | JWT | — | Získa fond podľa ID |
| GET | `/churchId/:churchId` | Verejné | — | Získa všetky fondy konkrétnej cirkvi (verejné) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Verejné | — | Získa celkovú sumu darov fondu: `{ fundId, totalAmount, donationCount }`. Poháňa prvok `campaignProgress` tvorcu webu |
| POST | `/` | JWT | Donations.Edit | Vytvorí alebo aktualizuje fondy |
| DELETE | `/:id` | JWT | Donations.Edit | Vymaže fond |

## Dary do fondov

Základná cesta: `/giving/funddonations`

Sleduje, ako sa jednotlivé dary rozdeľujú do fondov. Nie sú povolené žiadne základné CRUD trasy; všetky koncové body sú vlastné.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Donations.View | Zobrazí dary do fondov. Filtrujte pomocou `?donationId=`, `?personId=`, `?fundId=` alebo `?fundName=`. Voliteľne pridajte `?startDate=&endDate=` na filtrovanie podľa dátumu |
| GET | `/:id` | JWT | Donations.View | Získa dar do fondu podľa ID |
| GET | `/my` | JWT | — | Získa dary do fondov aktuálneho používateľa |
| POST | `/` | JWT | Donations.Edit alebo Donations.Enter | Vytvorí alebo aktualizuje dary do fondov (dávku). Iba Donations.Enter: nadradený dar musí byť v otvorenej dávke a nesmie byť darom z brány, inak `403` |
| DELETE | `/:id` | JWT | Donations.Edit alebo Donations.Enter | Vymaže dar do fondu. Pre Donations.Enter platí rovnaké pravidlo otvorenej dávky |

## Brány

Základná cesta: `/giving/gateways`

Spravuje konfigurácie platobných brán (Stripe, PayPal atď.). Nie sú povolené žiadne základné CRUD trasy; všetky koncové body sú vlastné. Tajomstvá brány sú šifrované v kľude.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | — | Zobrazí všetky brány cirkvi |
| GET | `/:id` | JWT | Settings.Edit | Získa bránu podľa ID |
| GET | `/churchId/:churchId` | Verejné | — | Získa brány cirkvi (iba verejné kľúče) |
| GET | `/configured/:churchId` | Verejné | — | Skontroluje, či má cirkev nakonfigurovanú platobnú bránu |
| POST | `/` | JWT | Settings.Edit | Vytvorí alebo aktualizuje brány (šifruje kľúče, zriaďuje webhooky a produkty) |
| PATCH | `/:id` | JWT | Settings.Edit | Čiastočne aktualizuje bránu |
| DELETE | `/:id` | JWT | Settings.Edit | Vymaže bránu (odstráni aj jej webhooky) |

### Príklad: Kontrola konfigurácie brány

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Zákazníci

Základná cesta: `/giving/customers`

Rozširuje `GenericCrudController` s CRUD trasami: `getAll`, `delete`. Prepája osoby s ich záznamami zákazníkov v platobnej bráne.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Donations.ViewSummary | Zobrazí všetkých zákazníkov |
| GET | `/:id` | JWT | Donations.ViewSummary alebo vlastný záznam | Získa zákazníka podľa ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary alebo vlastný záznam | Získa predplatné brány pre zákazníka |
| DELETE | `/:id` | JWT | Donations.Edit | Vymaže zákazníka |

## Predplatné

Základná cesta: `/giving/subscriptions`

Spravuje opakujúce sa predplatné darov. Nie sú povolené žiadne základné CRUD trasy; všetky koncové body sú vlastné.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Donations.ViewSummary | Zobrazí všetky predplatné |
| GET | `/:id` | JWT | Donations.ViewSummary | Získa predplatné podľa ID |
| POST | `/` | JWT | Donations.Edit alebo vlastné predplatné | Aktualizuje predplatné v platobnej bráne |
| DELETE | `/:id` | JWT | Donations.Edit alebo vlastné predplatné | Zruší predplatné a odstráni ho z databázy. Telo: `{ provider, reason }` |

## Fondy predplatného

Základná cesta: `/giving/subscriptionfunds`

Sleduje rozdelenie fondov pre opakujúce sa predplatné. Nie sú povolené žiadne základné CRUD trasy; všetky koncové body sú vlastné.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Donations.View alebo vlastné predplatné | Zobrazí fondy predplatného. Filtrujte pomocou `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Získa fond predplatného podľa ID |
| DELETE | `/:id` | JWT | Donations.Edit | Vymaže fond predplatného |
| DELETE | `/subscription/:id` | JWT | Donations.Edit alebo vlastné predplatné | Vymaže všetky fondy predplatného |

## Platobné metódy

Základná cesta: `/giving/paymentmethods`

Spravuje uložené platobné metódy (karty, bankové účty) prostredníctvom API platobných brán. Nie sú povolené žiadne základné CRUD trasy; všetky koncové body sú vlastné.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/personid/:id` | JWT | Donations.View alebo vlastné personId | Získa všetky uložené platobné metódy osoby (karty, bankové účty) |
| POST | `/addcard` | JWT | — | Pripojí platobnú metódu kartou. Telo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit alebo vlastné personId | Aktualizuje údaje karty. Telo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit alebo vlastné personId | Vytvorí Stripe ACH SetupIntent na prepojenie bankového účtu. Telo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Verejné | — | Vytvorí anonymný ACH SetupIntent pre hosťovské dary. Telo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit alebo vlastné personId | Pridá bankový účet pomocou tokenu (zastaraný; použite `ach-setup-intent`). Telo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit alebo vlastné personId | Aktualizuje údaje bankového účtu. Telo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit alebo vlastný zákazník | Overí bankový účet mikrovkladmi. Telo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit alebo vlastný zákazník | Vymaže platobnú metódu (kartu alebo bankový účet) |

## Záznam udalostí

Základná cesta: `/giving/eventLog`

Rozširuje `GenericCrudController` s CRUD trasami: `getById`, `getAll`, `post`, `delete`. Sleduje webhook udalosti platobnej brány na účely auditu a odstraňovania duplikátov.

| Metóda | Cesta | Autentifikácia | Oprávnenie | Popis |
|--------|-------|----------------|------------|-------|
| GET | `/` | JWT | Donations.ViewSummary | Zobrazí všetky záznamy udalostí |
| GET | `/:id` | JWT | Donations.ViewSummary | Získa záznam udalosti podľa ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Získa záznamy udalostí filtrované podľa typu udalosti |
| POST | `/` | JWT | Donations.Edit | Vytvorí alebo aktualizuje záznamy udalostí |
| DELETE | `/:id` | JWT | Donations.Edit | Vymaže záznam udalosti |

## Súvisiace stránky

- [Koncové body členstva](./membership) — Osoby, cirkvi, skupiny, roly a oprávnenia
- [Autentifikácia a oprávnenia](./authentication) — Prihlasovací tok, JWT, OAuth, model oprávnení
- [Štruktúra modulu](../module-structure) — Vzory organizácie kódu
