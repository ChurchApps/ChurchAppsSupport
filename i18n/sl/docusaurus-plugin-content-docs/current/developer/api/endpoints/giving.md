---
title: "Končne točke za darovanja"
---

# Končne točke za darovanja

<div class="article-intro">

Modul Darovanja upravlja darovanja, sklade, obdelavo plačil, naročnine in sorodne finančne operacije. Podpira več plačilnih prehodov (Stripe, PayPal), obdeluje enkratna in ponavljajoča se darovanja, spremlja serije darovanj ter obdeluje webhooke za asinhrone dogodke plačil.

</div>

**Osnovna pot:** `/giving`

## Darovanja

Osnovna pot: `/giving/donations`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Donations.View ali lasten personId | Seznam vseh darovanj. Filtriranje s `?batchId=` ali `?personId=`. Pri `?personId=` so darila za sklade, ki niso davčno odbitni, izpuščena (kot na izpiskih darovanj), razen če klic z Donations.View doda `&includeNonDeductible=1`, kar naredi zapis osebe v B1Admin |
| GET | `/:id` | JWT | Donations.View | Pridobi darovanje po ID-ju |
| GET | `/my` | JWT | — | Pridobi darovanja trenutnega uporabnika |
| GET | `/my/summary?year=` | JWT | — | Skupni znesek darovanj trenutnega uporabnika za leto (privzeto letos): `{ year, total, count, currency, isConverted }`. Zneski so pretvorjeni v valuto cerkve. Podatke uporablja predogled darovanj na domači strani člana |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Darovanja z datumom znotraj obdobja (vključno). Oba datuma sta obvezna v obliki `YYYY-MM-DD`, sicer `400`. Strani za izpiske darovanj v B1Admin na ta način zahtevajo eno koledarsko leto namesto celotne zgodovine cerkve |
| GET | `/summary` | JWT | Donations.ViewSummary | Pridobi povzetek darovanj. Filtriranje s `?startDate=&endDate=&type=`. Uporabite `type=person` za razčlenitev po osebah |
| GET | `/testEmail` | Javno | — | Pošlji testno e-poštno sporočilo (razvoj/odpravljanje napak) |
| POST | `/` | JWT | Donations.Edit ali Donations.Enter | Ustvari ali posodobi darovanja (serija). Samo z Donations.Enter morata biti ciljna serija in (pri posodobitvi) trenutna serija darovanja odprti, darila prek plačilnega prehoda (tista s `transactionId`) pa ni mogoče spreminjati; sicer `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit ali Donations.Enter | Izbriši darovanje. Samo Donations.Enter: darovanje mora biti v odprti seriji in ne sme biti darilo prek plačilnega prehoda, sicer `403` |

### Primer: seznam darovanj po seriji

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

### Primer: pridobitev povzetka darovanj

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

## Serije darovanj

Osnovna pot: `/giving/donationbatches`

Razširja `GenericCrudController` s potmi CRUD: `getById`, `getAll`, `post`, `delete`. Operacija brisanja odstrani tudi vsa darovanja v seriji.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Donations.ViewSummary ali Donations.Enter | Seznam vseh serij darovanj |
| GET | `/:id` | JWT | Donations.ViewSummary ali Donations.Enter | Pridobi serijo darovanj po ID-ju |
| POST | `/` | JWT | Donations.Edit ali Donations.Enter | Ustvari ali posodobi serije darovanj. Samo Donations.Enter: posodobitev obstoječe serije zahteva, da je odprta, sicer `403 { "error": "This batch is closed." }`. `status` se tu prezre, zato shranjevanje serije serije ni mogoče znova odpreti |
| POST | `/:id/close` | JWT | Donations.Edit | Zapri serijo: nastavi `status` na `closed`, `closedDate` na trenutni čas in `closedBy` na ID uporabnika, ki kliče. Vrne serijo |
| POST | `/:id/reopen` | JWT | Donations.Edit | Znova odpri serijo: nastavi `status` na `open` ter počisti `closedDate` in `closedBy`. Vrne serijo |
| DELETE | `/:id` | JWT | Donations.Edit | Izbriši serijo in vsa njena darovanja |

Vsaka serija vključuje `status` (`open` ali `closed`; nove in obstoječe serije so `open`), `closedDate` in `closedBy`. Donations.Edit lahko spreminja darovanja v katerikoli seriji. Donations.Enter (v urejevalniku vlog prikazano kot **Enter Donations**) lahko dodaja, spreminja ali briše darovanja in delitve skladov samo, dokler je njihova serija odprta.

## Darovanje

Osnovna pot: `/giving/donate`

Obravnava javni tok darovanja, vključno z bremenitvami, naročninami, webhooki in izračuni provizij. Osnovne poti CRUD niso omogočene; vse končne točke so po meri.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/gateways/:churchId` | Javno | — | Pridobi razpoložljive plačilne prehode za cerkev (samo javni ključi) |
| POST | `/client-token` | JWT | — | Ustvari odjemalski žeton za inicializacijo plačilnega prehoda |
| POST | `/create-order` | JWT | — | Ustvari plačilno naročilo (plačilo v slogu PayPal) |
| POST | `/charge` | JWT | — | Obdelaj enkratno bremenitev za darovanje |
| POST | `/subscribe` | JWT | — | Ustvari ponavljajočo se naročnino na darovanje |
| POST | `/log` | Javno | — | Zabeleži darovanje. Telo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Javno | — | Prejmi dogodke webhooka plačila (Stripe, PayPal). Zahteva `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Ponovno predvaja Stripe dogodke za obdobje. Telo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Javno | — | Izračunaj provizije transakcij. Telo: `{ type, provider, gatewayId, amount, currency }`. Zahteva `?churchId=` |
| POST | `/captcha-verify` | Javno | — | Preveri žeton reCAPTCHA. Telo: `{ token, churchId? }`. Človeški odgovor vrne `{ response: "human", pass }`, kjer je `pass` podpisana prepustnica za darovanje gosta, veljavna 10 minut (in samo za `churchId`, če je poslan) |

Ko API teče z `CAPTCHA_ENFORCE=true`, morajo klici gostov (uporabnikov, ki niso prijavljeni) na `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` in `/giving/paymentmethods/ach-setup-intent-anon` (ter klici `POST /content/registrations/register` z gosti in cenami) v telesu zahtevka vsebovati `captchaPass`, sicer vrnejo 403 `Captcha verification required`. Prepustnico je mogoče uporabiti do poteka, ker tok darovanja za goste s kartico izvede dva klica (dodaj kartico, nato bremenitev). Klici prijavljenih uporabnikov niso prizadeti. `CAPTCHA_ENFORCE` je privzeto `false`; obrazci za darovanje gostov v `@churchapps/apphelper` prepustnico pošljejo samodejno.

### Primer: obdelava bremenitve za darovanje

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

### Primer: ustvarjanje ponavljajoče se naročnine

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

## Skladi

Osnovna pot: `/giving/funds`

Razširja `GenericCrudController` s potmi CRUD: `getById`, `getAll`, `post`, `delete`. Dovoljenje `view` je `null` (za ogled skladov ni potrebno dovoljenje).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | — | Seznam vseh skladov |
| GET | `/:id` | JWT | — | Pridobi sklad po ID-ju |
| GET | `/churchId/:churchId` | Javno | — | Pridobi vse sklade za določeno cerkev (javno) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Javno | — | Pridobi skupni znesek darovanj za sklad: `{ fundId, totalAmount, donationCount }`. Poganja element `campaignProgress` v gradniku spletnih strani |
| POST | `/` | JWT | Donations.Edit | Ustvari ali posodobi sklade |
| DELETE | `/:id` | JWT | Donations.Edit | Izbriši sklad |

## Darovanja skladov

Osnovna pot: `/giving/funddonations`

Spremlja, kako so posamezna darovanja razporejena med sklade. Osnovne poti CRUD niso omogočene; vse končne točke so po meri.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Donations.View | Seznam darovanj skladov. Filtriranje s `?donationId=`, `?personId=`, `?fundId=` ali `?fundName=`. Neobvezno dodajte `?startDate=&endDate=` za filtriranje po datumu |
| GET | `/:id` | JWT | Donations.View | Pridobi darovanje sklada po ID-ju |
| GET | `/my` | JWT | — | Pridobi darovanja skladov trenutnega uporabnika |
| POST | `/` | JWT | Donations.Edit ali Donations.Enter | Ustvari ali posodobi darovanja skladov (serija). Samo Donations.Enter: nadrejeno darovanje mora biti v odprti seriji in ne sme biti darilo prek plačilnega prehoda, sicer `403` |
| DELETE | `/:id` | JWT | Donations.Edit ali Donations.Enter | Izbriši darovanje sklada. Enako pravilo odprte serije velja za Donations.Enter |

## Plačilni prehodi

Osnovna pot: `/giving/gateways`

Upravlja nastavitve plačilnih prehodov (Stripe, PayPal itd.). Osnovne poti CRUD niso omogočene; vse končne točke so po meri. Skrivnosti prehodov so šifrirane v mirovanju.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | — | Seznam vseh prehodov za cerkev |
| GET | `/:id` | JWT | Settings.Edit | Pridobi prehod po ID-ju |
| GET | `/churchId/:churchId` | Javno | — | Pridobi prehode za cerkev (samo javni ključi) |
| GET | `/configured/:churchId` | Javno | — | Preveri, ali ima cerkev nastavljen plačilni prehod |
| POST | `/` | JWT | Settings.Edit | Ustvari ali posodobi prehode (šifrira ključe, vzpostavi webhooke in izdelke) |
| PATCH | `/:id` | JWT | Settings.Edit | Delno posodobi prehod |
| DELETE | `/:id` | JWT | Settings.Edit | Izbriši prehod (odstrani tudi njegove webhooke) |

### Primer: preverjanje nastavitve plačilnega prehoda

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Stranke

Osnovna pot: `/giving/customers`

Razširja `GenericCrudController` s potmi CRUD: `getAll`, `delete`. Poveže osebe z njihovimi zapisi stranke pri plačilnem prehodu.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Donations.ViewSummary | Seznam vseh strank |
| GET | `/:id` | JWT | Donations.ViewSummary ali lasten zapis | Pridobi stranko po ID-ju |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ali lasten zapis | Pridobi naročnine prehoda za stranko |
| DELETE | `/:id` | JWT | Donations.Edit | Izbriši stranko |

## Naročnine

Osnovna pot: `/giving/subscriptions`

Upravlja ponavljajoče se naročnine na darovanja. Osnovne poti CRUD niso omogočene; vse končne točke so po meri.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Donations.ViewSummary | Seznam vseh naročnin |
| GET | `/:id` | JWT | Donations.ViewSummary | Pridobi naročnino po ID-ju |
| POST | `/` | JWT | Donations.Edit ali lastna naročnina | Posodobi naročnine pri plačilnem prehodu |
| DELETE | `/:id` | JWT | Donations.Edit ali lastna naročnina | Prekliči naročnino in jo odstrani iz baze. Telo: `{ provider, reason }` |

## Skladi naročnin

Osnovna pot: `/giving/subscriptionfunds`

Spremlja dodelitve skladov za ponavljajoče se naročnine. Osnovne poti CRUD niso omogočene; vse končne točke so po meri.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Donations.View ali lastna naročnina | Seznam skladov naročnin. Filtriranje s `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Pridobi sklad naročnine po ID-ju |
| DELETE | `/:id` | JWT | Donations.Edit | Izbriši sklad naročnine |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ali lastna naročnina | Izbriši vse sklade za naročnino |

## Plačilna sredstva

Osnovna pot: `/giving/paymentmethods`

Upravlja shranjena plačilna sredstva (kartice, bančne račune) prek API-jev plačilnih prehodov. Osnovne poti CRUD niso omogočene; vse končne točke so po meri.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/personid/:id` | JWT | Donations.View ali lasten personId | Pridobi vsa shranjena plačilna sredstva za osebo (kartice, bančne račune) |
| POST | `/addcard` | JWT | — | Pripni plačilno sredstvo s kartico. Telo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ali lasten personId | Posodobi podatke o kartici. Telo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ali lasten personId | Ustvari Stripe ACH SetupIntent za povezavo bančnega računa. Telo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Javno | — | Ustvari anonimni ACH SetupIntent za darovanja gostov. Telo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ali lasten personId | Dodaj bančni račun prek žetona (zastarelo; uporabite `ach-setup-intent`). Telo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ali lasten personId | Posodobi podatke o bančnem računu. Telo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ali lastna stranka | Preveri bančni račun z mikronakazili. Telo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ali lastna stranka | Izbriši plačilno sredstvo (kartico ali bančni račun) |

## Dnevnik dogodkov

Osnovna pot: `/giving/eventLog`

Razširja `GenericCrudController` s potmi CRUD: `getById`, `getAll`, `post`, `delete`. Spremlja webhook dogodke plačilnih prehodov za revizijo in odpravljanje podvojenih obdelav.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Donations.ViewSummary | Seznam vseh dnevnikov dogodkov |
| GET | `/:id` | JWT | Donations.ViewSummary | Pridobi dnevnik dogodkov po ID-ju |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Pridobi dnevnike dogodkov, filtrirane po vrsti dogodka |
| POST | `/` | JWT | Donations.Edit | Ustvari ali posodobi dnevnike dogodkov |
| DELETE | `/:id` | JWT | Donations.Edit | Izbriši dnevnik dogodkov |

## Sorodne strani

- [Končne točke za člane](./membership) — Osebe, cerkve, skupine, vloge in dovoljenja
- [Avtentikacija in dovoljenja](./authentication) — Potek prijave, JWT, OAuth, model dovoljenj
- [Struktura modula](../module-structure) — Vzorci organizacije kode
