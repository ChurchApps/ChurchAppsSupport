---
title: "Lahjoitusrajapinnat"
---

# Lahjoitusrajapinnat

<div class="article-intro">

Lahjoitus-moduuli hallinnoi lahjoituksia, rahastoja, maksujen käsittelyä, tilauksia ja muita talousasioita. Se tukee useita maksuyhdyskäytäviä (Stripe, PayPal), käsittelee kertaluonteisia ja toistuvia lahjoituksia, seuraa lahjoituserien tietoja ja käsittelee webhook-tapahtumia asynkronisille maksutapahtumille.

</div>

**Perus-polku:** `/giving`

## Lahjoitukset

Perus-polku: `/giving/donations`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View tai oma personId | Listaa kaikki lahjoitukset. Suodata `?batchId=`- tai `?personId=`-parametrilla. `?personId=`-parametrilla lahjoituksia rahastoihin, jotka eivät ole vähennyskelpoisia, ei sisällytetä (kuten lahjoitustodistuksissa), ellei Donations.View-oikeuden käyttäjä lisää `&includeNonDeductible=1`-parametria, minkä B1Admin-henkilötietosivu tekee |
| GET | `/:id` | JWT | Donations.View | Hae lahjoitus tunnuksella |
| GET | `/my` | JWT | — | Hae nykyisen käyttäjän lahjoitukset |
| GET | `/my/summary?year=` | JWT | — | Nykyisen käyttäjän lahjoitussumma vuodelta (oletuksena tämä vuosi): `{ year, total, count, currency, isConverted }`. Summat muunnetaan seurakunnan valuuttaan. Tämä tukee lahjoitusten esikatselua jäsenen etusivulla |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Hae aikavälille (mukaan lukien) päivätyt lahjoitukset. Molemmat päivämäärät vaaditaan muodossa `YYYY-MM-DD`, muuten vastauksena on `400`. B1Admin-lahjoitustodistussivut pyytävät yhden kalenterivuoden tiedot tällä tavalla koko seurakunnan historian sijaan |
| GET | `/summary` | JWT | Donations.ViewSummary | Hae lahjoitusyhteenveto. Suodata `?startDate=&endDate=&type=`. Käytä `type=person` saadaksesi erittelyn henkilöittäin |
| GET | `/testEmail` | Julkinen | — | Lähetä testisähköposti (kehitystä ja vianetsintää varten) |
| POST | `/` | JWT | Donations.Edit tai Donations.Enter | Luo tai päivitä lahjoituksia (erä). Pelkällä Donations.Enter-oikeudella sekä kohde-erän että (päivityksessä) lahjoituksen nykyisen erän on oltava auki, eikä yhdyskäytävän kautta tehtyjä lahjoituksia (joilla on `transactionId`) voi muuttaa. Muussa tapauksessa vastauksena on `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit tai Donations.Enter | Poista lahjoitus. Pelkällä Donations.Enter-oikeudella lahjoituksen on oltava avoimessa erässä, eikä se saa olla yhdyskäytävän kautta tehty lahjoitus. Muuten vastauksena on `403` |

### Esimerkki: Listaa lahjoitukset erän mukaan

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

### Esimerkki: Hae lahjoitusyhteenveto

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

## Lahjoituserät

Perus-polku: `/giving/donationbatches`

Laajentaa `GenericCrudController`-luokkaa CRUD-reitityksillä: `getById`, `getAll`, `post`, `delete`. Poisto poistaa myös erään kuuluvat lahjoitukset.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary tai Donations.Enter | Listaa kaikki lahjoituserät |
| GET | `/:id` | JWT | Donations.ViewSummary tai Donations.Enter | Hae lahjoituserä tunnuksella |
| POST | `/` | JWT | Donations.Edit tai Donations.Enter | Luo tai päivitä lahjoituseriä. Pelkällä Donations.Enter-oikeudella olemassa olevan erän päivitys edellyttää, että erä on auki. Muuten vastauksena on `403 { "error": "This batch is closed." }`. `status`-kenttä jätetään tässä huomiotta, joten erän tallentaminen ei voi avata sitä uudelleen |
| POST | `/:id/close` | JWT | Donations.Edit | Sulje erä: asettaa `status`-kentän arvoksi `closed`, `closedDate`-kentän nykyhetkeen ja `closedBy`-kentän kutsujan käyttäjätunnukseksi. Palauttaa erän |
| POST | `/:id/reopen` | JWT | Donations.Edit | Avaa erä uudelleen: asettaa `status`-kentän arvoksi `open` ja tyhjentää `closedDate`- ja `closedBy`-kentät. Palauttaa erän |
| DELETE | `/:id` | JWT | Donations.Edit | Poista erä ja kaikki sen lahjoitukset |

Jokaisessa erässä on `status` (`open` tai `closed`; uudet ja olemassa olevat erät ovat `open`), `closedDate` ja `closedBy`. Donations.Edit-oikeudella voi muuttaa lahjoituksia missä tahansa erässä. Donations.Enter-oikeudella (näkyy roolieditorissa nimellä **Enter Donations**) voi lisätä, muuttaa tai poistaa lahjoituksia ja rahastojakoja vain, kun niiden erä on auki.

## Lahjoita

Perus-polku: `/giving/donate`

Käsittelee julkisen lahjoitusvirran, mukaan lukien veloitukset, tilaukset, webhookit ja kulujen laskennan. Perus-CRUD-reittejä ei ole käytössä, ja kaikki päätepisteet ovat mukautettuja.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Julkinen | — | Hae seurakunnan käytettävissä olevat maksuyhdyskäytävät (vain julkiset avaimet) |
| POST | `/client-token` | JWT | — | Luo asiakastunnus yhdyskäytävän alustamista varten |
| POST | `/create-order` | JWT | — | Luo maksutilaus (PayPal-tyylinen kassa) |
| POST | `/charge` | JWT | — | Käsittele kertaluonteinen lahjoitusveloitus |
| POST | `/subscribe` | JWT | — | Luo toistuva lahjoitustilaus |
| POST | `/log` | Julkinen | — | Kirjaa lahjoitus. Runko: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Julkinen | — | Vastaanota maksun webhook-tapahtumia (Stripe, PayPal). Vaatii `?churchId=`-parametrin |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Toista Stripe-tapahtumat aikavälille. Runko: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Julkinen | — | Laske tapahtumamaksut. Runko: `{ type, provider, gatewayId, amount, currency }`. Vaatii `?churchId=`-parametrin |
| POST | `/captcha-verify` | Julkinen | — | Vahvista reCAPTCHA-tunniste. Runko: `{ token, churchId? }`. Ihmisvastaus palauttaa `{ response: "human", pass }`, missä `pass` on allekirjoitettu vieraslahjoituspassi, joka on voimassa 10 minuuttia (ja vain `churchId`-kentän seurakunnalle, jos se on lähetetty) |

Kun Api käynnistetään `CAPTCHA_ENFORCE=true`-asetuksella, vieraskutsujen (eli kirjautumattomien käyttäjien) pyyntöihin `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` ja `/giving/paymentmethods/ach-setup-intent-anon` sekä maksullisiin vierasrekisteröintipyyntöihin `POST /content/registrations/register` on sisällytettävä `captchaPass` pyyntörunkoon. Muuten vastauksena on 403 `Captcha verification required`. Passia voi käyttää uudelleen, kunnes se vanhenee, koska Stripen vierasvirrassa tehdään kaksi kutsua (kortin lisäys ja veloitus). Kirjautuneiden käyttäjien kutsuihin tämä ei vaikuta. `CAPTCHA_ENFORCE` on oletuksena `false`. `@churchapps/apphelper`-kirjaston vieraslahjoituslomakkeet lähettävät passin automaattisesti.

### Esimerkki: Käsittele lahjoitusveloitus

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

### Esimerkki: Luo toistuva tilaus

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

## Rahastot

Perus-polku: `/giving/funds`

Laajentaa `GenericCrudController`-luokkaa CRUD-reitityksillä: `getById`, `getAll`, `post`, `delete`. `view`-oikeus on `null`, eli rahastojen katseluun ei vaadita oikeutta.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listaa kaikki rahastot |
| GET | `/:id` | JWT | — | Hae rahasto tunnuksella |
| GET | `/churchId/:churchId` | Julkinen | — | Hae kaikki tietyn seurakunnan rahastot (julkinen) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Julkinen | — | Hae rahaston lahjoitussumma: `{ fundId, totalAmount, donationCount }`. Tukee verkkosivurakentajan `campaignProgress`-elementtiä |
| POST | `/` | JWT | Donations.Edit | Luo tai päivitä rahastoja |
| DELETE | `/:id` | JWT | Donations.Edit | Poista rahasto |

## Rahastolahjoitukset

Perus-polku: `/giving/funddonations`

Seuraa, miten yksittäiset lahjoitukset kohdistetaan rahastoihin. Perus-CRUD-reittejä ei ole käytössä, ja kaikki päätepisteet ovat mukautettuja.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Listaa rahastolahjoitukset. Suodata `?donationId=`, `?personId=`, `?fundId=` tai `?fundName=` -parametrilla. Voit lisätä myös `?startDate=&endDate=` päivämääräsuodatukseen |
| GET | `/:id` | JWT | Donations.View | Hae rahastolahjoitus tunnuksella |
| GET | `/my` | JWT | — | Hae nykyisen käyttäjän rahastolahjoitukset |
| POST | `/` | JWT | Donations.Edit tai Donations.Enter | Luo tai päivitä rahastolahjoituksia (erä). Pelkällä Donations.Enter-oikeudella emolahjoituksen on oltava avoimessa erässä eikä yhdyskäytävän kautta tehty lahjoitus. Muuten vastauksena on `403` |
| DELETE | `/:id` | JWT | Donations.Edit tai Donations.Enter | Poista rahastolahjoitus. Sama avoimen erän sääntö koskee Donations.Enter-oikeutta |

## Yhdyskäytävät

Perus-polku: `/giving/gateways`

Hallinnoi maksuyhdyskäytävien asetuksia (Stripe, PayPal jne.). Perus-CRUD-reittejä ei ole käytössä, ja kaikki päätepisteet ovat mukautettuja. Yhdyskäytävien salaisuudet salataan levossa.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listaa seurakunnan kaikki yhdyskäytävät |
| GET | `/:id` | JWT | Settings.Edit | Hae yhdyskäytävä tunnuksella |
| GET | `/churchId/:churchId` | Julkinen | — | Hae seurakunnan yhdyskäytävät (vain julkiset avaimet) |
| GET | `/configured/:churchId` | Julkinen | — | Tarkista, onko seurakunnalla määritetty maksuyhdyskäytävä |
| POST | `/` | JWT | Settings.Edit | Luo tai päivitä yhdyskäytäviä (salaa avaimet, luo webhookit ja tuotteet) |
| PATCH | `/:id` | JWT | Settings.Edit | Päivitä yhdyskäytävä osittain |
| DELETE | `/:id` | JWT | Settings.Edit | Poista yhdyskäytävä (poistaa myös sen webhookit) |

### Esimerkki: Tarkista yhdyskäytävän asetukset

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Asiakkaat

Perus-polku: `/giving/customers`

Laajentaa `GenericCrudController`-luokkaa CRUD-reitityksillä: `getAll`, `delete`. Linkittää henkilöt heidän maksuyhdyskäytävän asiakastietueisiinsa.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listaa kaikki asiakkaat |
| GET | `/:id` | JWT | Donations.ViewSummary tai oma tietue | Hae asiakas tunnuksella |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary tai oma tietue | Hae asiakkaan yhdyskäytävätilaukset |
| DELETE | `/:id` | JWT | Donations.Edit | Poista asiakas |

## Tilaukset

Perus-polku: `/giving/subscriptions`

Hallinnoi toistuvia lahjoitustilauksia. Perus-CRUD-reittejä ei ole käytössä, ja kaikki päätepisteet ovat mukautettuja.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listaa kaikki tilaukset |
| GET | `/:id` | JWT | Donations.ViewSummary | Hae tilaus tunnuksella |
| POST | `/` | JWT | Donations.Edit tai oma tilaus | Päivitä tilauksia maksuyhdyskäytävässä |
| DELETE | `/:id` | JWT | Donations.Edit tai oma tilaus | Peruuta tilaus ja poista se tietokannasta. Runko: `{ provider, reason }` |

## Tilausrahastot

Perus-polku: `/giving/subscriptionfunds`

Seuraa toistuvien tilausten rahastokohdistuksia. Perus-CRUD-reittejä ei ole käytössä, ja kaikki päätepisteet ovat mukautettuja.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View tai oma tilaus | Listaa tilausrahastot. Suodata `?subscriptionId=`-parametrilla |
| GET | `/:id` | JWT | Donations.ViewSummary | Hae tilausrahasto tunnuksella |
| DELETE | `/:id` | JWT | Donations.Edit | Poista tilausrahasto |
| DELETE | `/subscription/:id` | JWT | Donations.Edit tai oma tilaus | Poista kaikki tilauksen rahastot |

## Maksutavat

Perus-polku: `/giving/paymentmethods`

Hallinnoi tallennettuja maksutapoja (kortit, pankkitilit) maksuyhdyskäytävien rajapintojen kautta. Perus-CRUD-reittejä ei ole käytössä, ja kaikki päätepisteet ovat mukautettuja.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View tai oma personId | Hae kaikki henkilön tallennetut maksutavat (kortit, pankkitilit) |
| POST | `/addcard` | JWT | — | Liitä korttimaksutapa. Runko: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit tai oma personId | Päivitä kortin tiedot. Runko: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit tai oma personId | Luo Stripe ACH SetupIntent pankkitilin liittämistä varten. Runko: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Julkinen | — | Luo anonyymi ACH SetupIntent vieraslahjoituksia varten. Runko: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit tai oma personId | Lisää pankkitili tunnuksen kautta (vanhentunut; käytä `ach-setup-intent`-reittiä). Runko: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit tai oma personId | Päivitä pankkitilin tiedot. Runko: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit tai oma asiakastietue | Vahvista pankkitili pienillä tilisiirroilla. Runko: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit tai oma asiakastietue | Poista maksutapa (kortti tai pankkitili) |

## Tapahtumaloki

Perus-polku: `/giving/eventLog`

Laajentaa `GenericCrudController`-luokkaa CRUD-reitityksillä: `getById`, `getAll`, `post`, `delete`. Seuraa maksuyhdyskäytävän webhook-tapahtumia tarkastusta ja kaksoiskappaleiden poistoa varten.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listaa kaikki tapahtumalokit |
| GET | `/:id` | JWT | Donations.ViewSummary | Hae tapahtumaloki tunnuksella |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Hae tapahtumalokit tapahtumatyypin mukaan suodatettuina |
| POST | `/` | JWT | Donations.Edit | Luo tai päivitä tapahtumalokeja |
| DELETE | `/:id` | JWT | Donations.Edit | Poista tapahtumaloki |

## Aiheeseen liittyvät sivut

- [Jäsenyyden päätepisteet](./membership) — Henkilöt, seurakunnat, ryhmät, roolit ja oikeudet
- [Todennus ja käyttöoikeudet](./authentication) — Kirjautumisvirta, JWT, OAuth, käyttöoikeusmalli
- [Moduulin rakenne](../module-structure) — Koodin järjestämisen mallit
