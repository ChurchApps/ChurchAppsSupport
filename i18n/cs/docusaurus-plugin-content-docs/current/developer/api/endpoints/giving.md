---
title: "Koncové body darování"
---

# Koncové body darování

<div class="article-intro">

Modul Darování spravuje dary, fondy, zpracování plateb, předplatná a související finanční operace. Podporuje více platebních bran (Stripe, PayPal), zpracovává jednorázové i opakované dary, sleduje dávky darů a zajišťuje zpracování webhooků pro asynchronní platební události.

</div>

**Základní cesta:** `/giving`

## Dary

Základní cesta: `/giving/donations`

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | Donations.View nebo vlastní personId | Výpis všech darů. Filtrování pomocí `?batchId=` nebo `?personId=`. S `?personId=` se dary do nezdanitelných fondů vynechají (jako na výpisech darů), pokud volající s oprávněním Donations.View nepřidá `&includeNonDeductible=1`, což dělá záznam osoby v B1Admin |
| GET | `/:id` | JWT | Donations.View | Získání daru podle ID |
| GET | `/my` | JWT | — | Získání darů aktuálního uživatele |
| GET | `/my/summary?year=` | JWT | — | Celkový součet darů aktuálního uživatele za rok (výchozí je letošní rok): `{ year, total, count, currency, isConverted }`, přičemž součty jsou převedeny na měnu sboru. Slouží jako přehled darů na domovské stránce člena |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Dary s datem v daném rozsahu (včetně krajních dnů). Obě data jsou povinná ve formátu `YYYY-MM-DD`, jinak `400`. Stránky výpisů darů v B1Admin tímto způsobem požadují jeden kalendářní rok místo celé historie sboru |
| GET | `/summary` | JWT | Donations.ViewSummary | Získání souhrnu darů. Filtrování pomocí `?startDate=&endDate=&type=`. Pro rozpis podle osob použijte `type=person` |
| GET | `/testEmail` | Veřejný | — | Odeslání testovacího e-mailu (vývoj a ladění) |
| POST | `/` | JWT | Donations.Edit nebo Donations.Enter | Vytvoření nebo úprava darů (dávky). Pouze s oprávněním Donations.Enter musí být cílová dávka i (při úpravě) aktuální dávka daru otevřené a dary z brány (ty s `transactionId`) nelze měnit; jinak `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit nebo Donations.Enter | Smazání daru. Pouze Donations.Enter: dar musí být v otevřené dávce a nesmí být darem z brány, jinak `403` |

### Příklad: Výpis darů podle dávky

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

### Příklad: Získání souhrnu darů

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

## Dávky darů

Základní cesta: `/giving/donationbatches`

Rozšiřuje `GenericCrudController` o CRUD trasy: `getById`, `getAll`, `post`, `delete`. Operace smazání odstraní i všechny dary v dávce.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | Donations.ViewSummary nebo Donations.Enter | Výpis všech dávek darů |
| GET | `/:id` | JWT | Donations.ViewSummary nebo Donations.Enter | Získání dávky darů podle ID |
| POST | `/` | JWT | Donations.Edit nebo Donations.Enter | Vytvoření nebo úprava dávek darů. Pouze Donations.Enter: úprava existující dávky vyžaduje, aby byla otevřená, jinak `403 { "error": "This batch is closed." }`. Pole `status` se zde ignoruje, takže uložení dávky ji nemůže znovu otevřít |
| POST | `/:id/close` | JWT | Donations.Edit | Uzavření dávky: nastaví `status` na `closed`, `closedDate` na aktuální čas a `closedBy` na ID uživatele, který akci provedl. Vrací dávku |
| POST | `/:id/reopen` | JWT | Donations.Edit | Znovuotevření dávky: nastaví `status` na `open` a vymaže `closedDate` a `closedBy`. Vrací dávku |
| DELETE | `/:id` | JWT | Donations.Edit | Smazání dávky a všech jejích darů |

Každá dávka obsahuje `status` (`open` nebo `closed`; nové i stávající dávky jsou `open`), `closedDate` a `closedBy`. Donations.Edit může měnit dary v libovolné dávce. Donations.Enter (v editoru rolí zobrazeno jako **Enter Donations**) může přidávat, měnit nebo mazat dary a rozdělení do fondů pouze tehdy, když je jejich dávka otevřená.

## Darovat

Základní cesta: `/giving/donate`

Zajišťuje veřejný tok darování včetně plateb, předplatných, webhooků a výpočtu poplatků. Nejsou povolené žádné základní CRUD trasy; všechny koncové body jsou vlastní.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/gateways/:churchId` | Veřejný | — | Získání dostupných platebních bran pro sbor (pouze veřejné klíče) |
| POST | `/client-token` | JWT | — | Vygenerování klientského tokenu pro inicializaci brány |
| POST | `/create-order` | JWT | — | Vytvoření platební objednávky (checkout ve stylu PayPal) |
| POST | `/charge` | JWT | — | Zpracování jednorázové platby daru |
| POST | `/subscribe` | JWT | — | Vytvoření opakovaného předplatného daru |
| POST | `/log` | Veřejný | — | Zaznamenání daru. Tělo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Veřejný | — | Příjem webhooků platebních událostí (Stripe, PayPal). Vyžaduje `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Znovu přehrát události Stripe za daný rozsah dat. Tělo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Veřejný | — | Výpočet poplatků za transakci. Tělo: `{ type, provider, gatewayId, amount, currency }`. Vyžaduje `?churchId=` |
| POST | `/captcha-verify` | Veřejný | — | Ověření tokenu reCAPTCHA. Tělo: `{ token, churchId? }`. Lidská odpověď vrátí `{ response: "human", pass }`, kde `pass` je podepsaný průchod pro hosty platný 10 minut (a pouze pro `churchId`, pokud je odeslán) |

Pokud API běží s `CAPTCHA_ENFORCE=true`, volání od hostů (nepřihlášených uživatelů) na `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` a `/giving/paymentmethods/ach-setup-intent-anon` (a také na `POST /content/registrations/register` s cenou pro hosty) musí v těle obsahovat `captchaPass`, jinak vrátí 403 `Captcha verification required`. Průchod lze znovu použít až do vypršení platnosti, protože platební tok pro hosty přes Stripe provádí dvě volání (přidání karty a poté platba). Volání přihlášených uživatelů nejsou ovlivněna. `CAPTCHA_ENFORCE` je ve výchozím stavu `false`; formuláře darování pro hosty v `@churchapps/apphelper` průchod odesílají automaticky.

### Příklad: Zpracování jednorázové platby daru

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

### Příklad: Vytvoření opakovaného předplatného

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

Základní cesta: `/giving/funds`

Rozšiřuje `GenericCrudController` o CRUD trasy: `getById`, `getAll`, `post`, `delete`. Oprávnění `view` je `null` (pro zobrazení fondů není vyžadováno žádné oprávnění).

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | — | Výpis všech fondů |
| GET | `/:id` | JWT | — | Získání fondu podle ID |
| GET | `/churchId/:churchId` | Veřejný | — | Získání všech fondů konkrétního sboru (veřejné) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Veřejný | — | Získání součtu darů fondu: `{ fundId, totalAmount, donationCount }`. Pohání prvek `campaignProgress` v tvorbě webu |
| POST | `/` | JWT | Donations.Edit | Vytvoření nebo úprava fondů |
| DELETE | `/:id` | JWT | Donations.Edit | Smazání fondu |

## Rozdělení darů do fondů

Základní cesta: `/giving/funddonations`

Sleduje, jak jsou jednotlivé dary přiřazeny do fondů. Nejsou povolené žádné základní CRUD trasy; všechny koncové body jsou vlastní.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | Donations.View | Výpis rozdělení darů do fondů. Filtrování pomocí `?donationId=`, `?personId=`, `?fundId=` nebo `?fundName=`. Volitelně lze přidat `?startDate=&endDate=` pro filtrování podle data |
| GET | `/:id` | JWT | Donations.View | Získání rozdělení daru podle ID |
| GET | `/my` | JWT | — | Získání rozdělení darů aktuálního uživatele |
| POST | `/` | JWT | Donations.Edit nebo Donations.Enter | Vytvoření nebo úprava rozdělení darů (dávka). Pouze Donations.Enter: nadřazený dar musí být v otevřené dávce a nesmí být darem z brány, jinak `403` |
| DELETE | `/:id` | JWT | Donations.Edit nebo Donations.Enter | Smazání rozdělení daru do fondu. Pro Donations.Enter platí stejné pravidlo otevřené dávky |

## Platební brány

Základní cesta: `/giving/gateways`

Spravuje nastavení platebních bran (Stripe, PayPal apod.). Nejsou povolené žádné základní CRUD trasy; všechny koncové body jsou vlastní. Tajné klíče bran jsou šifrovány v úložišti.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | — | Výpis všech bran pro sbor |
| GET | `/:id` | JWT | Settings.Edit | Získání brány podle ID |
| GET | `/churchId/:churchId` | Veřejný | — | Získání bran pro sbor (pouze veřejné klíče) |
| GET | `/configured/:churchId` | Veřejný | — | Kontrola, zda má sbor nastavenou platební bránu |
| POST | `/` | JWT | Settings.Edit | Vytvoření nebo úprava bran (šifruje klíče, zřizuje webhooky a produkty) |
| PATCH | `/:id` | JWT | Settings.Edit | Částečná úprava brány |
| DELETE | `/:id` | JWT | Settings.Edit | Smazání brány (odstraní také její webhooky) |

### Příklad: Kontrola nastavení brány

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Zákazníci

Základní cesta: `/giving/customers`

Rozšiřuje `GenericCrudController` o CRUD trasy: `getAll`, `delete`. Propojuje osoby s jejich zákaznickými záznamy u platební brány.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | Donations.ViewSummary | Výpis všech zákazníků |
| GET | `/:id` | JWT | Donations.ViewSummary nebo vlastní záznam | Získání zákazníka podle ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary nebo vlastní záznam | Získání předplatných zákazníka u platební brány |
| DELETE | `/:id` | JWT | Donations.Edit | Smazání zákazníka |

## Předplatná

Základní cesta: `/giving/subscriptions`

Spravuje opakovaná předplatná darů. Nejsou povolené žádné základní CRUD trasy; všechny koncové body jsou vlastní.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | Donations.ViewSummary | Výpis všech předplatných |
| GET | `/:id` | JWT | Donations.ViewSummary | Získání předplatného podle ID |
| POST | `/` | JWT | Donations.Edit nebo vlastní předplatné | Aktualizace předplatných u platební brány |
| DELETE | `/:id` | JWT | Donations.Edit nebo vlastní předplatné | Zrušení předplatného a odstranění z databáze. Tělo: `{ provider, reason }` |

## Fondy předplatných

Základní cesta: `/giving/subscriptionfunds`

Sleduje přiřazení fondů u opakovaných předplatných. Nejsou povolené žádné základní CRUD trasy; všechny koncové body jsou vlastní.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | Donations.View nebo vlastní předplatné | Výpis fondů předplatných. Filtrování pomocí `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Získání fondu předplatného podle ID |
| DELETE | `/:id` | JWT | Donations.Edit | Smazání fondu předplatného |
| DELETE | `/subscription/:id` | JWT | Donations.Edit nebo vlastní předplatné | Smazání všech fondů předplatného |

## Platební metody

Základní cesta: `/giving/paymentmethods`

Spravuje uložené platební metody (karty, bankovní účty) prostřednictvím API platebních bran. Nejsou povolené žádné základní CRUD trasy; všechny koncové body jsou vlastní.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/personid/:id` | JWT | Donations.View nebo vlastní personId | Získání všech uložených platebních metod osoby (karty, bankovní účty) |
| POST | `/addcard` | JWT | — | Připojení platební karty. Tělo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit nebo vlastní personId | Aktualizace údajů karty. Tělo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit nebo vlastní personId | Vytvoření Stripe ACH SetupIntent pro propojení bankovního účtu. Tělo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Veřejný | — | Vytvoření anonymního ACH SetupIntent pro dary od hostů. Tělo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit nebo vlastní personId | Přidání bankovního účtu pomocí tokenu (zastaralé; použijte `ach-setup-intent`). Tělo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit nebo vlastní personId | Aktualizace údajů bankovního účtu. Tělo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit nebo vlastní zákazník | Ověření bankovního účtu pomocí malých vkladů. Tělo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit nebo vlastní zákazník | Smazání platební metody (karty nebo bankovního účtu) |

## Protokol událostí

Základní cesta: `/giving/eventLog`

Rozšiřuje `GenericCrudController` o CRUD trasy: `getById`, `getAll`, `post`, `delete`. Eviduje webhooky platebních bran pro audit a odstraňování duplicit.

| Metoda | Cesta | Ověření | Oprávnění | Popis |
|--------|-------|---------|-----------|-------|
| GET | `/` | JWT | Donations.ViewSummary | Výpis všech protokolů událostí |
| GET | `/:id` | JWT | Donations.ViewSummary | Získání protokolu události podle ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Získání protokolů událostí filtrovaných podle typu události |
| POST | `/` | JWT | Donations.Edit | Vytvoření nebo úprava protokolů událostí |
| DELETE | `/:id` | JWT | Donations.Edit | Smazání protokolu události |

## Související stránky

- [Koncové body členství](./membership) — Osoby, sbory, skupiny, role a oprávnění
- [Ověření a oprávnění](./authentication) — Přihlašovací tok, JWT, OAuth, model oprávnění
- [Struktura modulu](../module-structure) — Vzory organizace kódu
