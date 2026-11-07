---
title: "Subsplash"
description: "Subsplash-adományok, új személyek és űrlapválaszok összekötése a B1-gyel Zapier-rel, hogy automatikusan a B1 Admin-ba kerüljenek."
---

# Subsplash

<div class="article-intro">

Ha a gyülekezeted alkalmazásához, adományozáshoz vagy űrlapjaihoz a Subsplash-t használod, de a személyek és adományok nyilvántartására a B1-et szeretnéd használni, a Subsplash Zapier alkalmazása valós időben továbbíthat adományokat, új profilokat és űrlapválaszokat a B1-be. Figyelj arra, hogy a Subsplash Zapier alkalmazása jelenleg **csak eseményindítókat** támogat, a kapcsolat egyirányú (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- Subsplash-fiók olyan csomaggal, amely tartalmazza az **API + Zapier** hozzáférést (ezt a Subsplash ügyfélsikerkezelőjénél ellenőrizheted, mivel ez a csomagtól függ)
- [Zapier](https://zapier.com) fiók
- B1Admin felhasználó **Edit Settings** jogosultsággal

</div>

## Mit köthetsz össze

Az alábbi eseményindítók mind a Subsplash-hez tartoznak. A műveletek a B1-hez tartoznak.

| Subsplash eseményindító | B1 művelet |
|---|---|
| Új adomány | Person keresése → Adomány hozzáadása (ha hiányzik, Person létrehozása) |
| Új adománygéret | Adomány hozzáadása (`notes` = "Pledge: …" értékkel) |
| Új személy létrehozva | Person létrehozása |
| Személy profilja frissítve | (nincs közvetlen B1 művelet – Google Sheets-be naplózás kézi áttekintéshez) |
| Új űrlapválasz | Person létrehozása + (opcionálisan) Group Member hozzáadása az űrlap alapján |

Jelenleg a Subsplash alkalmazása csak Subsplash → B1 irányt támogat.

## Beállítás

### 1. B1 API-kulcs létrehozása

A B1Admin felületen: **Settings → Developer → API Keys → New API Key**. Hatókörök:

- `people:read` – a adományozó megkeresése e-mail-cím alapján
- `people:write` – létrehozás, ha még nem létezik
- `donations:write` – az adomány rögzítése
- (`settings:write` nem szükséges – az eseményindítót itt a Subsplash kezeli, nem a B1.)

### 2. Subsplash csatlakoztatása a Zapierhez

Kövesd a [Subsplash Zapier-integrációs útmutatóját](https://support.subsplash.com/en/articles/9825926-zapier-integration). A Subsplash egy API-tokent ad ki a Subsplash-irányítópultján belül, amellyel a Zapier hitelesíti az eseményindító oldalt.

### 3. A „adomány rögzítése" Zap létrehozása

1. **Eseményindító** – Subsplash: Új adomány
2. **Művelet** – B1.church: Person keresése (e-mail alapján)
3. **Szűrő / Útvonal** – elágazás a „person megtalálva" feltétel szerint:
   - **Megtalálva:** B1.church: Adomány hozzáadása. Összeg, dátum, alap, módszer = "Online" és a Subsplash tranzakcióazonosító a megjegyzésbe (notes).
   - **Nem található:** B1.church: Person létrehozása → B1.church: Adomány hozzáadása (az újonnan létrehozott személy azonosítójával).

Kapcsold be a Zapot. A későbbi Subsplash-adományok másodperceken belül megjelennek a **B1Admin → Donations** alatt.

## Gyakori receptek

### Köszönőüzenet küldése első alkalommal adakozónak

- **Eseményindító** – Subsplash: Új adomány
- **Művelet** – Filter by Zapier: csak akkor folytatódjon, ha ez az adományozó első adománya (használhatsz *Lookup Table* műveletet az adományozó e-mail-címével egy korábbi adakozók Google Sheets-táblázatában, vagy egy Zapier *Paths* lépést az adományozó létrehozási dátuma alapján)
- **Művelet** – Mailchimp / SMTP / SendGrid: köszönőüzenet küldése az első adomány után
- **Művelet** – B1.church: Adomány hozzáadása (a szokásos módon)

### Adománygéretek elkülönítése a rendszeres adakozástól

- **Eseményindító** – Subsplash: Új adománygéret
- **Művelet** – B1.church: Adomány hozzáadása `notes = "Pledge — Subsplash"` értékkel, és egy `Pledges` nevű alappal (a működési alaptól elkülönítve), hogy az adománygéretekről külön jelentést készíthess a **B1Admin → Donations → Summary** alatt.

### Új alkalmazásfelhasználók szinkronizálása B1-személyként

- **Eseményindító** – Subsplash: Új személy létrehozva
- **Művelet** – B1.church: Person létrehozása, név, e-mail és telefonszám kitöltésével. A B1-ben címkézheted az új személyt úgy, hogy hozzáadod egy csoporthoz, például „Subsplash App Users".

## Korlátok és megjegyzések

- **A Subsplash Zapier alkalmazása csak eseményindítókat támogat.** Ha azt szeretnéd, hogy a B1-ben történt változások (pl. új B1-személy) a Subsplash-ben is megjelenjenek, ehhez egy saját hidat kell építened: a B1 Zapier-alkalmazásának eseményindítói egy egyedi *Webhooks by Zapier — POST* művelettel hívják meg a Subsplash REST API-ját. Ez egyedi integráció, nem kész recept.
- **Az API-hozzáférés csomaghoz kötött.** Ha a Zapier-kapcsolat `403 Forbidden` hibával meghiúsul, valószínűleg a Subsplash-csomagod nem tartalmaz API-hozzáférést. Ilyenkor vedd fel a kapcsolatot az ügyfélsikerkezelőddel.
- **Az alapok hozzárendelése kézi.** A Subsplash egy kampány- vagy kategórianevet továbbít, a B1-nek viszont numerikus alapazonosító kell. Vagy rögzítsd az alapot a Zapban, vagy tarts karban egy Zapier *Lookup Table* táblát, amely a Subsplash-kampányokat B1-alapokhoz rendeli.

## Hibaelhárítás

- **Adomány után nem indul el eseményindító** – ellenőrizd a Subsplash Zapier-irányítópultján, hogy a kapcsolat még mindig *Connected* állapotú-e. Ha a Subsplash oldalán az API-token megváltozott, a Zap csendben leáll; csatlakoztasd újra.
- **A B1 *Add Donation* művelete 422 hibával meghiúsul** – leggyakrabban hiányzik vagy ismeretlen a `fundId`. Az alapjaidat a **B1Admin → Donations → Funds** alatt listázhatod, és a pontos azonosítót másold be a Zap lépésébe.
- **Az első adomány kétszer indítja el a műveletet** – a Subsplash néha újraküldi az eseményindítót, ha a Zapier nem kapta meg a visszaigazolást. Adj hozzá egy *Filter by Zapier* szűrőt az adományazonosítóra (a Subsplash ezt elküldi az adatokban), hogy a duplikátumokat kiszűrd.

## Lásd még

- [Donorbox](./donorbox.md) – ugyanaz a receptfelépítés, más adományozási platformmal
- [Zapier (áttekintés)](../zapier.md) – minden Zapier-recept B1-oldala
- [Subsplash Zapier-integrációs útmutató](https://support.subsplash.com/en/articles/9825926-zapier-integration) (a Subsplash dokumentációja)
