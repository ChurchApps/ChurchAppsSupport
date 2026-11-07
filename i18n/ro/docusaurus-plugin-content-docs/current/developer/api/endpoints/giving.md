---
title: "Puncte finale pentru donații"
description: "Referință pentru endpoint-urile API-ului de donații ChurchApps: donații, loturi, gateway-uri, abonamente și metode de plată, cu reguli de autentificare și permisiuni pentru dezvoltatorii care integrează cu B1 Admin."
---

# Puncte finale pentru donații

<div class="article-intro">

Modulul Donații gestionează donațiile, fondurile, procesarea plăților, abonamentele și operațiunile financiare conexe. Acceptă mai multe gateway-uri de plată (Stripe, PayPal), gestionează donațiile unice și recurente, urmărește lotele de donații și oferă procesarea webhook-urilor pentru evenimentele de plată asincrone.

</div>

**Cale de bază:** `/giving`

## Donații

Cale de bază: `/giving/donations`

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Donations.View sau propriul personId | Listează toate donațiile. Filtrează cu `?batchId=` sau `?personId=`. Cu `?personId=`, cadourile către fonduri nedeductibile sunt excluse (ca pe extrasele de donații), cu excepția cazului în care un apelant cu Donations.View adaugă `&includeNonDeductible=1`, lucru pe care îl face fișa persoanei din B1Admin |
| GET | `/:id` | JWT | Donations.View | Obține o donație după ID |
| GET | `/my` | JWT | — | Obține donațiile utilizatorului curent |
| GET | `/my/summary?year=` | JWT | — | Totalul donațiilor utilizatorului curent pentru un an (implicit anul curent): `{ year, total, count, currency, isConverted }`, cu totalurile convertite în moneda bisericii. Alimentează previzualizarea donațiilor de pe pagina de start a membrului |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Donații datate în intervalul specificat (inclusiv). Ambele date sunt obligatorii, în format `YYYY-MM-DD`, altfel `400`. Paginile de extrase de donații din B1Admin solicită astfel câte un an calendaristic, în loc de întregul istoric al bisericii |
| GET | `/summary` | JWT | Donations.ViewSummary | Obține rezumatul donațiilor. Filtrează cu `?startDate=&endDate=&type=`. Folosește `type=person` pentru defalcarea pe persoane |
| GET | `/testEmail` | Public | — | Trimite un e-mail de test (dezvoltare/depanare) |
| POST | `/` | JWT | Donations.Edit sau Donations.Enter | Creează sau actualizează donații (lot). Doar cu Donations.Enter, atât lotul țintă, cât și (la o actualizare) lotul curent al donației trebuie să fie deschise, iar cadourile prin gateway (cele cu `transactionId`) nu pot fi modificate; altfel `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit sau Donations.Enter | Șterge o donație. Doar Donations.Enter: donația trebuie să fie într-un lot deschis și să nu fie un cadou prin gateway, altfel `403` |

### Exemplu: Listarea donațiilor după lot

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

### Exemplu: Obținerea rezumatului donațiilor

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

## Loturi de donații

Cale de bază: `/giving/donationbatches`

Extinde `GenericCrudController` cu rutele CRUD: `getById`, `getAll`, `post`, `delete`. Operația de ștergere elimină și toate donațiile din lot.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Donations.ViewSummary sau Donations.Enter | Listează toate loturile de donații |
| GET | `/:id` | JWT | Donations.ViewSummary sau Donations.Enter | Obține un lot de donații după ID |
| POST | `/` | JWT | Donations.Edit sau Donations.Enter | Creează sau actualizează loturi de donații. Doar Donations.Enter: actualizarea unui lot existent necesită ca acesta să fie deschis, altfel `403 { "error": "This batch is closed." }`. `status` este ignorat aici, astfel încât salvarea unui lot nu îl poate redeschide |
| POST | `/:id/close` | JWT | Donations.Edit | Închide un lot: setează `status` la `closed`, `closedDate` la momentul curent și `closedBy` la ID-ul utilizatorului apelant. Returnează lotul |
| POST | `/:id/reopen` | JWT | Donations.Edit | Redeschide un lot: setează `status` la `open` și șterge `closedDate` și `closedBy`. Returnează lotul |
| DELETE | `/:id` | JWT | Donations.Edit | Șterge un lot și toate donațiile sale |

Fiecare lot include `status` (`open` sau `closed`; loturile noi și cele existente sunt `open`), `closedDate` și `closedBy`. Donations.Edit poate modifica donațiile din orice lot; Donations.Enter (afișat ca **Introducere donații** în editorul de roluri) poate adăuga, modifica sau șterge donații și împărțiri pe fonduri doar cât timp lotul lor este deschis.

## Donează

Cale de bază: `/giving/donate`

Gestionează fluxul public de donații, inclusiv plățile, abonamentele, webhook-urile și calculul comisioanelor. Nu sunt activate rute CRUD de bază; toate punctele finale sunt personalizate.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/gateways/:churchId` | Public | — | Obține gateway-urile de plată disponibile pentru o biserică (doar cheile publice) |
| POST | `/client-token` | JWT | — | Generează un token client pentru inițializarea gateway-ului |
| POST | `/create-order` | JWT | — | Creează o comandă de plată (checkout în stil PayPal) |
| POST | `/charge` | JWT | — | Procesează o donație unică |
| POST | `/subscribe` | JWT | — | Creează un abonament de donații recurente |
| POST | `/log` | Public | — | Înregistrează o donație. Corp: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Primește evenimentele webhook de plată (Stripe, PayPal). Necesită `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Redă evenimentele Stripe pentru un interval de date. Corp: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calculează comisioanele de tranzacție. Corp: `{ type, provider, gatewayId, amount, currency }`. Necesită `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verifică tokenul reCAPTCHA. Corp: `{ token, churchId? }`. Un răspuns uman returnează `{ response: "human", pass }`, unde `pass` este un pass semnat pentru donații de oaspeți, valabil 10 minute (și doar pentru `churchId`, dacă este trimis unul) |

Când Api rulează cu `CAPTCHA_ENFORCE=true`, apelurile de oaspeți (neautentificați) către `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` și `/giving/paymentmethods/ach-setup-intent-anon` (precum și apelurile `POST /content/registrations/register` cu tarif pentru oaspeți) trebuie să includă `captchaPass` în corp, altfel returnează 403 `Captcha verification required`. Pass-ul poate fi reutilizat până expiră, deoarece fluxul Stripe pentru oaspeți face două apeluri (adăugarea cardului, apoi plata). Apelurile autentificate nu sunt afectate. `CAPTCHA_ENFORCE` are valoarea implicită `false`; formularele de donații pentru oaspeți din `@churchapps/apphelper` trimit pass-ul automat.

### Exemplu: Procesarea unei donații unice

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

### Exemplu: Crearea unui abonament recurent

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

## Fonduri

Cale de bază: `/giving/funds`

Extinde `GenericCrudController` cu rutele CRUD: `getById`, `getAll`, `post`, `delete`. Permisiunea `view` este `null` (nu este necesară nicio permisiune pentru vizualizarea fondurilor).

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | — | Listează toate fondurile |
| GET | `/:id` | JWT | — | Obține un fond după ID |
| GET | `/churchId/:churchId` | Public | — | Obține toate fondurile unei anumite biserici (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Obține totalul donațiilor unui fond: `{ fundId, totalAmount, donationCount }`. Alimentează elementul `campaignProgress` al constructorului de site-uri |
| POST | `/` | JWT | Donations.Edit | Creează sau actualizează fonduri |
| DELETE | `/:id` | JWT | Donations.Edit | Șterge un fond |

## Donații pe fonduri

Cale de bază: `/giving/funddonations`

Urmărește modul în care donațiile individuale sunt alocate pe fonduri. Nu sunt activate rute CRUD de bază; toate punctele finale sunt personalizate.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Donations.View | Listează donațiile pe fonduri. Filtrează cu `?donationId=`, `?personId=`, `?fundId=` sau `?fundName=`. Opțional, adaugă `?startDate=&endDate=` pentru filtrarea după dată |
| GET | `/:id` | JWT | Donations.View | Obține o donație pe fonduri după ID |
| GET | `/my` | JWT | — | Obține donațiile pe fonduri ale utilizatorului curent |
| POST | `/` | JWT | Donations.Edit sau Donations.Enter | Creează sau actualizează donații pe fonduri (lot). Doar Donations.Enter: donația părinte trebuie să fie într-un lot deschis și să nu fie un cadou prin gateway, altfel `403` |
| DELETE | `/:id` | JWT | Donations.Edit sau Donations.Enter | Șterge o donație pe fonduri. Aceeași regulă de lot deschis pentru Donations.Enter |

## Gateway-uri

Cale de bază: `/giving/gateways`

Gestionează configurațiile gateway-urilor de plată (Stripe, PayPal etc.). Nu sunt activate rute CRUD de bază; toate punctele finale sunt personalizate. Secretele gateway-urilor sunt criptate în repaus.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | — | Listează toate gateway-urile bisericii |
| GET | `/:id` | JWT | Settings.Edit | Obține un gateway după ID |
| GET | `/churchId/:churchId` | Public | — | Obține gateway-urile unei biserici (doar cheile publice) |
| GET | `/configured/:churchId` | Public | — | Verifică dacă o biserică are configurat un gateway de plată |
| POST | `/` | JWT | Settings.Edit | Creează sau actualizează gateway-uri (criptează cheile, provizionează webhook-uri și produse) |
| PATCH | `/:id` | JWT | Settings.Edit | Actualizează parțial un gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Șterge un gateway (elimină și webhook-urile sale) |

### Exemplu: Verificarea configurației gateway-ului

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Clienți

Cale de bază: `/giving/customers`

Extinde `GenericCrudController` cu rutele CRUD: `getAll`, `delete`. Leagă persoanele de înregistrările lor de clienți din gateway-ul de plată.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listează toți clienții |
| GET | `/:id` | JWT | Donations.ViewSummary sau propria înregistrare | Obține un client după ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary sau propria înregistrare | Obține abonamentele gateway-ului pentru un client |
| DELETE | `/:id` | JWT | Donations.Edit | Șterge un client |

## Abonamente

Cale de bază: `/giving/subscriptions`

Gestionează abonamentele de donații recurente. Nu sunt activate rute CRUD de bază; toate punctele finale sunt personalizate.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listează toate abonamentele |
| GET | `/:id` | JWT | Donations.ViewSummary | Obține un abonament după ID |
| POST | `/` | JWT | Donations.Edit sau propriul abonament | Actualizează abonamentele cu gateway-ul de plată |
| DELETE | `/:id` | JWT | Donations.Edit sau propriul abonament | Anulează un abonament și îl elimină din baza de date. Corp: `{ provider, reason }` |

## Fonduri pentru abonamente

Cale de bază: `/giving/subscriptionfunds`

Urmărește alocările pe fonduri pentru abonamentele recurente. Nu sunt activate rute CRUD de bază; toate punctele finale sunt personalizate.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Donations.View sau propriul abonament | Listează fondurile abonamentelor. Filtrează cu `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obține un fond al abonamentului după ID |
| DELETE | `/:id` | JWT | Donations.Edit | Șterge un fond al abonamentului |
| DELETE | `/subscription/:id` | JWT | Donations.Edit sau propriul abonament | Șterge toate fondurile unui abonament |

## Metode de plată

Cale de bază: `/giving/paymentmethods`

Gestionează metodele de plată salvate (carduri, conturi bancare) prin API-urile gateway-urilor de plată. Nu sunt activate rute CRUD de bază; toate punctele finale sunt personalizate.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/personid/:id` | JWT | Donations.View sau propriul personId | Obține toate metodele de plată salvate pentru o persoană (carduri, conturi bancare) |
| POST | `/addcard` | JWT | — | Atașează o metodă de plată cu card. Corp: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit sau propriul personId | Actualizează detaliile cardului. Corp: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit sau propriul personId | Creează un SetupIntent ACH Stripe pentru legarea unui cont bancar. Corp: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Creează un SetupIntent ACH anonim pentru donațiile de oaspeți. Corp: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit sau propriul personId | Adaugă un cont bancar prin token (depreciat; utilizați `ach-setup-intent`). Corp: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit sau propriul personId | Actualizează detaliile contului bancar. Corp: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit sau propriul client | Verifică un cont bancar cu micro-depuneri. Corp: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit sau propriul client | Șterge o metodă de plată (card sau cont bancar) |

## Jurnalul de evenimente

Cale de bază: `/giving/eventLog`

Extinde `GenericCrudController` cu rutele CRUD: `getById`, `getAll`, `post`, `delete`. Urmărește evenimentele webhook ale gateway-urilor de plată, pentru audit și deduplicare.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Donations.ViewSummary | Listează toate jurnalele de evenimente |
| GET | `/:id` | JWT | Donations.ViewSummary | Obține un jurnal de evenimente după ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obține jurnalele de evenimente filtrate după tipul evenimentului |
| POST | `/` | JWT | Donations.Edit | Creează sau actualizează jurnale de evenimente |
| DELETE | `/:id` | JWT | Donations.Edit | Șterge un jurnal de evenimente |

## Pagini conexe

- [Puncte finale pentru membri](./membership.md) — Persoane, biserici, grupuri, roluri și permisiuni
- [Autentificare și permisiuni](./authentication.md) — Fluxul de autentificare, JWT, OAuth, modelul de permisiuni
- [Structura modulelor](../module-structure.md) — Modele de organizare a codului
