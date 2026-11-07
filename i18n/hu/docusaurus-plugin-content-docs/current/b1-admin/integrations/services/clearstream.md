---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Küldjön [Clearstream](https://clearstream.io) SMS-üzenetet bármely B1-esemény hatására – új személy, új adomány, űrlapbeküldés vagy naptárfrissítés –, és a válaszokat B1-rekordokként húzhatja vissza. A Clearstream Zapier-alkalmazása mindkét irányt lefedi, így az egész összekapcsolás egy recept, nem egyedi kód.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Egy [Clearstream](https://clearstream.io) fiók legalább egy listával és SMS-keretgel
- Egy [Zapier](https://zapier.com) fiók
- Egy B1Admin felhasználó **Edit Settings** jogosultsággal

</div>

## Mit köthet össze

| Irány | Trigger | Művelet |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (pl. értesítés a pénzügyi csapatnak) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (pl. imakérési csapat) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; címkézés a beküldött kulcsszóval |

A Clearstream Zapier-műveletei: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Beállítás

### 1. B1 API-kulcs létrehozása

**Settings → Developer → API Keys → New API Key**:

- `settings:write` – szükséges ahhoz, hogy a B1 regisztrálja a trigger webhookot
- `people:read` – az eseményből származó személy adatainak lekéréséhez (`personId` → név/telefon/e-mail)
- (Opcionális) `people:write`, ha a Clearstream-válaszokból B1-névjegyeket szeretne létrehozni

### 2. A „szöveg új adományról” Zap létrehozása

1. **Trigger** – B1.church: New Donation
2. **Művelet** – B1.church: Find Person (az adomány `personId`-je)
3. **Művelet** – Clearstream: Send Text to Number. A címzetthez használja a 2. lépésben talált személy telefonszámát, majd írja meg az üzenetet (`"Köszönjük az adományát, {first}! …"`).

Kapcsolja be a Zap-ot. A B1 aktiváláskor regisztrálja az adomány-webhookot; a **Settings → Developer → Webhooks** oldalon meg fog jelenni a `Zapier — donation.created` sor.

### 3. (Opcionális) Válaszok visszaküldése B1-rekordokként

1. **Trigger** – Clearstream: New Incoming Text
2. **Művelet** – Szűrés a Zapier-ben a kulcsszóra – pl. csak akkor folytatja, ha az üzenet szövege `PRAY` szóval kezdődik
3. **Művelet** – B1.church: Find Person (telefonszám alapján)
4. **Művelet** – Szűrő / Elágazás – ha nem található, hozza létre; mindkét esetben mentse el az üzenet szövegét valahová (Slack, Google Sheet vagy B1-űrlapbeküldés a Webhooks by Zapier segítségével).

## Gyakori receptek

### Önkéntes csapat riasztása

- **Trigger** – B1.church: New Form Submission (a imakérési űrlap azonosítójára szűrve)
- **Művelet** – Clearstream: Send Text to List, ahol a lista az ügyeletes lelkigondozói csapat. Az üzenet szövege: `New prayer request: {data.questions.0.answer}`.

### Első alkalommal érkező vendégek utánkövetési sorozata

- **Trigger** – B1.church: New Person, szűrve a „First-time visitor” B1-személycímkére
- **Művelet** – Clearstream: Add Subscriber to Automated Workflow. Rendelje hozzá a munkafolyamat azonosítóját egy előre elkészített 7 napos SMS-sorozathoz.

### Kulcsszóval vezérelt csoportcsatlakozás

- **Trigger** – Clearstream: New Incoming Text (szűrés a `MENS` kulcsszóra)
- **Művelet** – B1.church: Find Person (telefonszám alapján); ha nem található → Create Person
- **Művelet** – B1.church: Add Group Member a Férfi Szolgálat csoporthoz

## Korlátok és megjegyzések

- **A Clearstream az SMS-eket üzenetenként méri.** Minden Send Text művelet egy vagy több kreditet fogyaszt a hossztól és a címzettek számától függően – ellenőrizze csomagja keretét.
- **A *Send Text to Number* műveletnél a telefonszámnak E.164 formátumúnak kell lennie** (pl. `+15555550199`). A B1 személyi rekord azt tárolja, amit megadtak; ha nem tudja garantálni a formátumot, használjon *Formatter by Zapier — Numbers → Format Phone Number* lépést.
- **A B1 oldaláról nincs szükség fejlécre** – a Clearstream hitelesítése teljes egészében a Zapier-kapcsolaton belül történik.

## Hibaelhárítás

- **A trigger soha nem indul el** – A Zap bekapcsolása után a `Settings → Developer → Webhooks` oldalon meg kell jelennie egy `Zapier — <event>` sornak. Ha nem, a B1 API-kulcsból hiányzik a `settings:write` jogosultság. Hozzon létre új kulcsot, és csatlakoztassa újra.
- **A Clearstream „Invalid phone number” hibát ad** – A címzett mező nem E.164 formátumú. Adjon hozzá egy Format Phone Number lépést.
- **A Send Text to List `403` hibával meghiúsul** – A Clearstream API-felhasználónak nincs jogosultsága az adott listához, vagy a lista azonosítója hibás. A lista azonosítói a Clearstream listarészletek oldalán láthatók.

## Lásd még

- [Text In Church](./text-in-church) – alternatív SMS-platform, hasonló felépítéssel
- [Mobile Message](./mobile-message) – az USA-n kívüli gyülekezeteknek
- [Zapier (áttekintés)](../zapier) – a Zapier-receptek B1 oldala
- [Clearstream API docs](https://api-docs.clearstream.io/) – a Zapier-alkalmazáson túlmutató egyedi integrációkhoz
