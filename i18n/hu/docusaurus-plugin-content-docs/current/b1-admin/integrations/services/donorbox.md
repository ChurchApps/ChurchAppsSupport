---
title: "Donorbox"
description: "Donorbox csatlakoztatása a B1 Admin-hoz Zapier-rel: az online adományokból automatikusan adományrekord és adakozói profil lesz, kézi export nélkül."
---

# Donorbox

<div class="article-intro">

Ha a gyülekezeted adományait Donorbox-on keresztül fogadja, de az embereket és a befizetési kimutatásokat B1-ben kezeli, a Donorbox azonnali Zapier-triggerei segítségével a B1-ben is létrehozhatók a megfelelő adománybejegyzések. Ha az adományozó még nem szerepel a rendszerben, a B1 személyként is létrehozhatja. Nincs szükség kézi egyeztetésre és havi exportra.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Egy [Donorbox](https://donorbox.org) fiók legalább egy kampánnyal
- Egy [Zapier](https://zapier.com) fiók
- Egy B1Admin felhasználó **Edit Settings** (Beállítások szerkesztése) jogosultsággal

</div>

## Mit köthet össze

| Irány | Donorbox-trigger | B1-művelet |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (azonnali) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (ismétlődő) | Find Person → Add Donation (a Plan azonosítóját használja megjegyzésként) |

A Donorbox triggereit **azonnalinak** teszi közzé: egy valódi adomány után másodperceken belül aktiválódnak. Nincs várakozási idő.

## Beállítás

### 1. B1 API-kulcs létrehozása

A B1Admin-ban: **Settings → Developer → API Keys → New API Key**. Hatókörök:

- `people:read` – az adományozó keresése e-mail-cím alapján
- `people:write` – az adományozó létrehozása, ha új
- `donations:write` – az adomány rögzítése

Ebben az irányban a triggereket a Donorbox adja, nem a B1, ezért itt nincs szükség a `settings:write` hatókörre.

### 2. A „adomány rögzítése” Zap létrehozása

1. **Trigger** – Donorbox: New Donation. Csatlakoztassa a Donorbox API-kulcsával (a Donorboxban: *Account → Profile → API Settings*).
2. **Művelet** – B1.church: Find Person. Az adományozó e-mail-címét a triggerből a *Email* keresőmezőhöz rendelje.
3. **Művelet** – Filter by Zapier (opcionális): csak akkor folytassa, ha az adományozó nem található, majd…
4. **Művelet** – B1.church: Create Person. Rendelje hozzá a keresztnevet, a vezetéknevet és az e-mail-címet, hogy az adományozó tagként jöjjön létre, ne csak adománybejegyzésként.
5. **Művelet** – B1.church: Add Donation. Rendelje hozzá:
   - Amount → `data.amount`
   - Donation Date → a trigger adomány dátuma
   - Fund → válassza ki azt a B1-alapot, amely a Donorbox-kampánynak felel meg (a Zapier egy szűrő vagy formázó lépés alapján is válthat alapot)
   - Method → „Online”
   - Notes → a Donorbox tranzakcióazonosító (egyeztetésnél hasznos)

Kapcsolja be a Zapet. A Donorbox-on keresztül érkező következő valódi adomány automatikusan megjelenik a **B1Admin → Donations** oldalon.

## Gyakori receptek

### Egy Zap alaponként

Ha több Donorbox-kampányt futtat, amelyek külön B1-alapokhoz tartoznak, a legtisztább megoldás kampányonként egy Zap, a tetején egy Donorbox *campaign* szűrővel. Így az alaphozzárendelés fixen be van állítva, és kihagyható a keresési lépés.

### A módosított adományok korrekcióként kezelése

A Donorbox *New or Updated Donation* triggere a szerkesztéseknél is aktiválódik. Használjon Zapier *Path* lépést az `event_type` mezőn az elágazáshoz: „new” → Add Donation, „updated” → Find Donation + Update. (Megjegyzés: a B1 Zapier-alkalmazásában jelenleg nincs Update Donation művelet. Egyelőre a „updated” eseményeket egy Slack-csatornába érdemes naplózni kézi áttekintésre.)

### Ismétlődő tervváltozások szinkronizálása Slack-csatornára

- **Trigger** – Donorbox: New or Updated Plan
- **Művelet** – Slack: Send Message a `#donations` csatornára (pl. „Plan changed — Sarah's monthly gift is now $200”)

## Korlátok és megjegyzések

- **Egyeztetés e-mail-cím alapján.** A Donorbox nem osztja meg a B1 személyazonosítóját, ezért az egyetlen tartós összekapcsolási kulcs az e-mail-cím. Ha az adományozó más e-mail-címmel ad, új B1-személy jön létre. A havi egyeztetésnél ezeket érdemes keresni.
- **A visszatérítések nem külön jelennek meg.** A Donorbox ugyanarra az adományra küld státuszfrissítést. A B1 Zapier-alkalmazásában jelenleg nincs *Update Donation* művelet, ezért a biztonságos módszer most az, hogy a visszatérítési eseményeket külön naplózza, és az adományt kézzel módosítja.
- **Először a Donorbox sandbox környezetében teszteljen,** hogy elkerülje a fiktív adományok létrehozását az éles B1-ben. A Donorbox az élesétől külön teszt módú hitelesítő adatokat biztosít.

## Hibaelhárítás

- **„Person not found” figyelmeztetés minden futásnál** – ez rendben van, ha a lépéseket úgy rendezte, hogy a *Create Person* a nem található ágban fusson. Ha a Create Person lépés sem fut le, ellenőrizze, hogy az API-kulcsnak van-e `people:write` hatóköre.
- **Az összeg 100-szorosan nagynak vagy kicsinek tűnik** – a Donorbox egyes adatformátumokban centet, másokban dollárt küld. Szükség esetén használjon *Formatter by Zapier — Numbers* lépést, amely 100-zal oszt.
- **Duplikált adományok egyetlen ajándékból** – a Donorbox mind a *New Donation*, mind az *Updated Donation* eseményt elküldi. Szűrje az eseményeket `event_type = "donation.succeeded"` értékre, vagy hozzon létre két, egymást nem átfedő szűrőjű Zapet.

## Lásd még

- [Zapier (áttekintés)](../zapier.md) – a B1 oldala minden Zapier-receptnek
- [Subsplash](./subsplash.md) – egy másik adományozási platform, Zapier-alkalmazással
- [Mailchimp](./mailchimp.md) – az „új adomány” események összekapcsolása e-mail címkével
