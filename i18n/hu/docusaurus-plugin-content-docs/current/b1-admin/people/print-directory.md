---
title: "Névjegyzék nyomtatása"
description: "Háztartásonként csoportosított, nyomtatható tagnévsor generálása a B1 Admin-ból fényképekkel, elérhetőségekkel és születésnapokkal, levélpapír-méretben."
---

# Névjegyzék nyomtatása

<div class="article-intro">

A névjegyzék nyomtatása funkcióval egy formázott, nyomtatható tagjegyzéket készíthet a gyülekezetéhez. A névjegyzék háztartásonként rendezi a tagokat, tartalmazza az elérhetőségeket és a fényképeket, és úgy készül, hogy szabványos A4-es méretű papíron is professzionálisan nézzen ki. *(Megjegyzés: a jelen fordítás a szöveg eredeti, amerikai méretére utal.)*

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van egy aktív B1 Admin fiókra, amellyel megtekintheti a személyeket.
- A névjegyzékben szereplő személyeknél legyenek kitöltve a fényképek és az elérhetőségek, hogy a lehető legjobb eredményt kapja.

</div>

## A névjegyzék nyomtatása megnyitása

1. Lépjen a **Személyek** menüpontra a B1 Adminban.
2. Kattintson a **Névjegyzék nyomtatása** gombra a Személyek oldal fejlécében.
3. A névjegyzék új böngészőlapon nyílik meg, és elkezdi betölteni a névjegyzék adatait.
4. Körülbelül 1,5 másodperc múlva automatikusan megjelenik a böngészője nyomtatási párbeszédablaka.

:::tip
A névjegyzék külön lapon nyílik meg, így a Személyek oldal elhagyása nélkül is nyomtathat. A nyomtatási párbeszédablak megjelenése után a lap automatikusan visszanavigál.
:::

## Mi kerül bele

A névjegyzék a gyülekezet összes **aktív tagját** tartalmazza. Pontosabban:

- Az **Inaktív**, **Látogató** vagy **Elhunyt** tagsági állapotú személyek automatikusan kimaradnak.
- Azok a személyek, akik kérték, hogy ne szerepeljenek a névjegyzékben, szintén kimaradnak.
- A többi személy **háztartások** szerint csoportosítva jelenik meg.

### Csak a keresési eredmények nyomtatása

Ha keresést futtat a Személyek oldalon – gyorskereséssel, a [Részletes keresés](./searching-people.md#advanced-search) funkcióval, a [Mentett listával](./lists.md) vagy az [MI-keresés](./ai-search.md) használatával –, a **Névjegyzék nyomtatása** gomb **Eredmények nyomtatása** feliratra változik. Ennek megnyomásával a teljes gyülekezet helyett csak a keresési eredményekben szereplő személyek névjegyzéke nyomtatódik ki, azonos elrendezésben.

Keresési eredmények nyomtatásakor a fent említett tagsági állapot szerinti szűrő nem érvényesül: a keresett személyek mind szerepelnek, beleértve a látogatókat és az inaktív személyeket is. Azok, akik kérték, hogy ne szerepeljenek a névjegyzékben, így is kimaradnak. A teljes névjegyzék nyomtatásához először törölje a keresést.

## A névjegyzék elrendezése

A nyomtatott névjegyzék két részből áll:

### Borítólap

Az első oldal a következőket tartalmazza:
- A gyülekezet neve
- A „Tagok névjegyzéke” cím
- Az aktuális év
- A gyülekezet helye
- A szereplő háztartások teljes száma

### Tagok listája

A további oldalakon a háztartások vezetéknév szerint, ábécésorrendben szerepelnek. Minden háztartáskártya a következőket tartalmazza:

- **Fényképek** – Minden háztartási tag kör alakú előnézeti képe, alatta a nevével
- **A háztartás megjelenített neve** – Például „A Smith család”, „John & Jane Doe”, vagy egyéni tagok esetén csak a személy neve
- **Cím** – Utca, város, állam és irányítószám
- **Telefon** – Otthoni vagy mobilszám
- **E-mail** – Elsődleges e-mail-cím
- **Születésnapok** – Háztartási tagonként külön dátumként formázva
- **Évforduló** – Ha rögzítve van

A háztartások **ábécé szerinti szakaszokba** vannak rendezve (A, B, C, ...), minden betűcsoport előtt díszes szakaszfejléccel. Minden sorban két háztartáskártya jelenik meg egymás mellett.

## Nyomtatási beállítások

A névjegyzék **Letter** méretű papírra (8,5 × 11 hüvelyk) készül, 0,5 hüvelykes margókkal. Amikor megjelenik a böngésző nyomtatási párbeszédablaka:

- Hagyja a papírméretet **Letter** értéken
- Ha azt szeretné, hogy a szakaszfejlécek a színes formázásukkal nyomtatódjanak, engedélyezze a **Háttérgrafika** (néha „Háttér nyomtatása”) opciót a böngészője nyomtatási beállításai között
- Álló tájolás ajánlott

:::info
A névjegyzék figyelembe veszi a laptöréseket: a háztartáskártyák és a szakaszfejlécek nem törnek oldalak között.
:::

## Kapcsolódó cikkek

- [Személyek keresése](./searching-people.md) – A névjegyzék szűrése nyomtatás előtt
- [Adatok exportálása](./exporting-data.md) – A névjegyzék adatainak exportálása táblázatként
- [Személyek hozzáadása](./adding-people.md) – Tagnyilvántartások hozzáadása vagy frissítése
