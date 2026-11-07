---
title: "Adományozási végpontok"
description: "Referencia a ChurchApps Giving API-végpontjaihoz: adományok, kötegek, átjárók, előfizetések és fizetési módok, hitelesítési és jogosultsági szabályokkal a B1 Adminhoz integrálódó fejlesztők számára."
---

# Adományozási végpontok

<div class="article-intro">

Az Adományozási modul az adományokat, alapokat, a fizetésfeldolgozást, az előfizetéseket és a kapcsolódó pénzügyi műveleteket kezeli. Több fizetési átjárót támogat (Stripe, PayPal), kezeli az egyszeri és ismétlődő adományokat, nyomon követi az adománykötegeket, és webhook-feldolgozást biztosít az aszinkron fizetési eseményekhez.

</div>

**Alapútvonal:** `/giving`

## Adományok

Alapútvonal: `/giving/donations`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View vagy saját personId | Az összes adomány listázása. Szűrés `?batchId=` vagy `?personId=` paraméterrel. A `?personId=` használatakor a nem levonható alapokra adott ajándékok kimaradnak (ahogy az adókimutatásokon is), kivéve ha a Donations.View jogosultságú hívó hozzáadja az `&includeNonDeductible=1` paramétert, amit a B1Admin személyi rekordja megtesz |
| GET | `/:id` | JWT | Donations.View | Adomány lekérése azonosító alapján |
| GET | `/my` | JWT | — | Az aktuális felhasználó adományainak lekérése |
| GET | `/my/summary?year=` | JWT | — | Az aktuális felhasználó éves adományösszege (alapértelmezés: az idei év): `{ year, total, count, currency, isConverted }`, az összegek az egyház pénznemére átszámítva. A tagok kezdőlapján látható adománynézetet táplálja |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | A megadott tartományba (a határokat is beleértve) eső adományok. Mindkét dátum kötelező, `ÉÉÉÉ-HH-NN` formátumban, különben `400`. A B1Admin adókimutatás oldalai ezzel a módszerrel egy naptári évet kérnek le az egyház teljes előzményei helyett |
| GET | `/summary` | JWT | Donations.ViewSummary | Adomány-összesítő lekérése. Szűrés `?startDate=&endDate=&type=` paraméterekkel. A `type=person` értékkel személyenkénti bontás kérhető |
| GET | `/testEmail` | Nyilvános | — | Teszt-e-mail küldése (fejlesztéshez és hibakereséshez) |
| POST | `/` | JWT | Donations.Edit vagy Donations.Enter | Adományok (köteg) létrehozása vagy frissítése. Csak Donations.Enter esetén a célkötegnek, és frissítésnél az adomány jelenlegi kötegének is nyitottnak kell lennie. Átjárón keresztül érkezett ajándékok (amelyekhez `transactionId` tartozik) nem módosíthatók. Egyébként `403 { "error": "This batch is closed." }` a válasz |
| DELETE | `/:id` | JWT | Donations.Edit vagy Donations.Enter | Adomány törlése. Csak Donations.Enter esetén: az adománynak nyitott kötegben kell lennie, és nem lehet átjárós ajándék, különben `403` |

### Példa: Adományok listázása köteg szerint

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

### Példa: Adomány-összesítő lekérése

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

## Adománykötegek

Alapútvonal: `/giving/donationbatches`

A `GenericCrudController` osztályt bővíti a következő CRUD útvonalakkal: `getById`, `getAll`, `post`, `delete`. A törlési művelet a kötegen belüli összes adományt is eltávolítja.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary vagy Donations.Enter | Az összes adománykköteg listázása |
| GET | `/:id` | JWT | Donations.ViewSummary vagy Donations.Enter | Adománykötegek lekérése azonosító alapján |
| POST | `/` | JWT | Donations.Edit vagy Donations.Enter | Adománykötegek létrehozása vagy frissítése. Csak Donations.Enter esetén: a meglévő köteg frissítéséhez annak nyitottnak kell lennie, különben `403 { "error": "This batch is closed." }`. A `status` mezőt itt a rendszer figyelmen kívül hagyja, így a köteg mentésével nem lehet újra megnyitni |
| POST | `/:id/close` | JWT | Donations.Edit | Köteg lezárása: a `status` értékét `closed`-ra, a `closedDate` értékét az aktuális időpontra, a `closedBy` értékét pedig a hívó felhasználó azonosítójára állítja. A köteget adja vissza |
| POST | `/:id/reopen` | JWT | Donations.Edit | Köteg újranyitása: a `status` értékét `open`-re állítja, és törli a `closedDate` és `closedBy` mezőket. A köteget adja vissza |
| DELETE | `/:id` | JWT | Donations.Edit | A köteg és az összes hozzá tartozó adomány törlése |

Minden köteg tartalmazza a `status` (`open` vagy `closed`; az új és a korábbi kötegek `open` állapotúak), a `closedDate` és a `closedBy` mezőket. A Donations.Edit bármely köteg adományait módosíthatja. A Donations.Enter jogosultság (a szerepkör-szerkesztőben **Adományok rögzítése** néven jelenik meg) csak nyitott köteg adományait és alapmegosztásait tudja hozzáadni, módosítani vagy törölni.

## Adakozás

Alapútvonal: `/giving/donate`

Kezeli a nyilvános adakozási folyamatot: terheléseket, előfizetéseket, webhookokat és díjszámítást. Alapértelmezett CRUD útvonalak nincsenek engedélyezve; minden végpont egyedi.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Nyilvános | — | Az egyház elérhető fizetési átjáróinak lekérése (csak nyilvános kulcsok) |
| POST | `/client-token` | JWT | — | Kliens-token generálása az átjáró inicializálásához |
| POST | `/create-order` | JWT | — | Fizetési megrendelés létrehozása (PayPal-stílusú fizetés) |
| POST | `/charge` | JWT | — | Egyszeri adomány terhelésének feldolgozása |
| POST | `/subscribe` | JWT | — | Ismétlődő adományozási előfizetés létrehozása |
| POST | `/log` | Nyilvános | — | Adomány naplózása. Törzs: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Nyilvános | — | Fizetési webhook-események fogadása (Stripe, PayPal). A `?churchId=` megadása kötelező |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Stripe-események újrajátszása egy dátumtartományra. Törzs: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Nyilvános | — | Tranzakciós díjak kiszámítása. Törzs: `{ type, provider, gatewayId, amount, currency }`. A `?churchId=` megadása kötelező |
| POST | `/captcha-verify` | Nyilvános | — | reCAPTCHA-token ellenőrzése. Törzs: `{ token, churchId? }`. Emberi válasz esetén `{ response: "human", pass }` érkezik, ahol a `pass` egy aláírt vendég-adakozási engedély, amely 10 percig érvényes (és csak a megadott `churchId`-ra vonatkozik, ha az el lett küldve) |

Ha az Api `CAPTCHA_ENFORCE=true` beállítással fut, a nem bejelentkezett (vendég) hívásoknak a `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` és `/giving/paymentmethods/ach-setup-intent-anon` végpontokon (valamint a vendégek díjköteles `POST /content/registrations/register` hívásainak) a kérés törzsében tartalmazniuk kell a `captchaPass` értéket, különben `403 Captcha verification required` hibát kapnak. Az engedély a lejáratáig többször felhasználható, mert a Stripe-os vendégfolyamat két hívást tesz (kártya hozzáadása, majd terhelés). A bejelentkezett hívásokat nem érinti. A `CAPTCHA_ENFORCE` alapértelmezett értéke `false`; a `@churchapps/apphelper` vendég-adakozási űrlapjai automatikusan elküldik az engedélyt.

### Példa: Adomány terhelésének feldolgozása

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

### Példa: Ismétlődő előfizetés létrehozása

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

## Alapok

Alapútvonal: `/giving/funds`

A `GenericCrudController` osztályt bővíti a következő CRUD útvonalakkal: `getById`, `getAll`, `post`, `delete`. A `view` jogosultság `null`, vagyis az alapok megtekintéséhez nincs szükség jogosultságra.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Az összes alap listázása |
| GET | `/:id` | JWT | — | Alap lekérése azonosító alapján |
| GET | `/churchId/:churchId` | Nyilvános | — | Egy adott egyház összes alapjának lekérése (nyilvános) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Nyilvános | — | Egy alap adományösszegének lekérése: `{ fundId, totalAmount, donationCount }`. A weboldal-szerkesztő `campaignProgress` elemét táplálja |
| POST | `/` | JWT | Donations.Edit | Alapok létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Donations.Edit | Alap törlése |

## Alapadományok

Alapútvonal: `/giving/funddonations`

Azt követi nyomon, hogyan oszlanak meg az egyes adományok az alapok között. Alapértelmezett CRUD útvonalak nincsenek engedélyezve; minden végpont egyedi.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Alapadományok listázása. Szűrés `?donationId=`, `?personId=`, `?fundId=` vagy `?fundName=` paraméterrel. Opcionálisan dátumszűrés: `?startDate=&endDate=` |
| GET | `/:id` | JWT | Donations.View | Alapadomány lekérése azonosító alapján |
| GET | `/my` | JWT | — | Az aktuális felhasználó alapadományainak lekérése |
| POST | `/` | JWT | Donations.Edit vagy Donations.Enter | Alapadományok (köteg) létrehozása vagy frissítése. Csak Donations.Enter esetén: a szülő adománynak nyitott kötegben kell lennie, és nem lehet átjárós ajándék, különben `403` |
| DELETE | `/:id` | JWT | Donations.Edit vagy Donations.Enter | Alapadomány törlése. Donations.Enter esetén ugyanez a nyitott köteg szabály érvényes |

## Átjárók

Alapútvonal: `/giving/gateways`

Fizetési átjáró-konfigurációkat kezel (Stripe, PayPal stb.). Alapértelmezett CRUD útvonalak nincsenek engedélyezve; minden végpont egyedi. Az átjárók titkos kulcsai nyugalmi állapotban titkosítva vannak.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Az egyház összes átjárójának listázása |
| GET | `/:id` | JWT | Settings.Edit | Átjáró lekérése azonosító alapján |
| GET | `/churchId/:churchId` | Nyilvános | — | Egy egyház átjáróinak lekérése (csak nyilvános kulcsok) |
| GET | `/configured/:churchId` | Nyilvános | — | Ellenőrzi, hogy az egyházhoz van-e beállított fizetési átjáró |
| POST | `/` | JWT | Settings.Edit | Átjárók létrehozása vagy frissítése (titkosítja a kulcsokat, webhookokat és termékeket hoz létre) |
| PATCH | `/:id` | JWT | Settings.Edit | Átjáró részleges frissítése |
| DELETE | `/:id` | JWT | Settings.Edit | Átjáró törlése (a hozzá tartozó webhookokat is eltávolítja) |

### Példa: Átjáró-konfiguráció ellenőrzése

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Ügyfelek

Alapútvonal: `/giving/customers`

A `GenericCrudController` osztályt bővíti a következő CRUD útvonalakkal: `getAll`, `delete`. A személyeket összekapcsolja a fizetési átjáró ügyfélrekordjaival.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Az összes ügyfél listázása |
| GET | `/:id` | JWT | Donations.ViewSummary vagy saját rekord | Ügyfél lekérése azonosító alapján |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary vagy saját rekord | Egy ügyfél átjáró-előfizetéseinek lekérése |
| DELETE | `/:id` | JWT | Donations.Edit | Ügyfél törlése |

## Előfizetések

Alapútvonal: `/giving/subscriptions`

Az ismétlődő adományozási előfizetéseket kezeli. Alapértelmezett CRUD útvonalak nincsenek engedélyezve; minden végpont egyedi.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Az összes előfizetés listázása |
| GET | `/:id` | JWT | Donations.ViewSummary | Előfizetés lekérése azonosító alapján |
| POST | `/` | JWT | Donations.Edit vagy saját előfizetés | Előfizetések frissítése a fizetési átjáróval |
| DELETE | `/:id` | JWT | Donations.Edit vagy saját előfizetés | Előfizetés lemondása és eltávolítása az adatbázisból. Törzs: `{ provider, reason }` |

## Előfizetési alapok

Alapútvonal: `/giving/subscriptionfunds`

Az ismétlődő előfizetések alaphozzárendeléseit követi nyomon. Alapértelmezett CRUD útvonalak nincsenek engedélyezve; minden végpont egyedi.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View vagy saját előfizetés | Előfizetési alapok listázása. Szűrés `?subscriptionId=` paraméterrel |
| GET | `/:id` | JWT | Donations.ViewSummary | Előfizetési alap lekérése azonosító alapján |
| DELETE | `/:id` | JWT | Donations.Edit | Előfizetési alap törlése |
| DELETE | `/subscription/:id` | JWT | Donations.Edit vagy saját előfizetés | Egy előfizetés összes alapjának törlése |

## Fizetési módok

Alapútvonal: `/giving/paymentmethods`

Tárolt fizetési módokat (kártyákat, bankszámlákat) kezel a fizetési átjárók API-jain keresztül. Alapértelmezett CRUD útvonalak nincsenek engedélyezve; minden végpont egyedi.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View vagy saját personId | Egy személy összes tárolt fizetési módjának lekérése (kártyák, bankszámlák) |
| POST | `/addcard` | JWT | — | Kártya fizetési módjának csatolása. Törzs: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit vagy saját personId | Kártyaadatok frissítése. Törzs: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit vagy saját personId | Stripe ACH SetupIntent létrehozása banki összekapcsoláshoz. Törzs: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Nyilvános | — | Anonim ACH SetupIntent létrehozása vendég-adományokhoz. Törzs: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit vagy saját personId | Bankszámla hozzáadása tokenen keresztül (elavult; helyette használja az `ach-setup-intent` végpontot). Törzs: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit vagy saját personId | Bankszámla adatainak frissítése. Törzs: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit vagy saját ügyfél | Bankszámla ellenőrzése apró összegű visszautalásokkal (micro-deposits). Törzs: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit vagy saját ügyfél | Fizetési mód (kártya vagy bankszámla) törlése |

## Eseménynapló

Alapútvonal: `/giving/eventLog`

A `GenericCrudController` osztályt bővíti a következő CRUD útvonalakkal: `getById`, `getAll`, `post`, `delete`. A fizetési átjáró webhook-eseményeit naplózza ellenőrzés és duplikációszűrés céljából.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Az összes eseménynapló listázása |
| GET | `/:id` | JWT | Donations.ViewSummary | Eseménynapló lekérése azonosító alapján |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Eseménynaplók lekérése eseménytípus szerint szűrve |
| POST | `/` | JWT | Donations.Edit | Eseménynaplók létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Donations.Edit | Eseménynapló törlése |

## Kapcsolódó oldalak

- [Tagsági végpontok](./membership.md) — Személyek, egyházak, csoportok, szerepkörök és jogosultságok
- [Hitelesítés és jogosultságok](./authentication.md) — Bejelentkezési folyamat, JWT, OAuth, jogosultsági modell
- [Modulszerkezet](../module-structure.md) — Kódszervezési minták
