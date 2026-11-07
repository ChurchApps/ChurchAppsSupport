---
title: "Adatok exportálása"
---

# Adatok exportálása

<div class="article-intro">

A B1 Admin lehetővé teszi, hogy exportálja egyházi adatait, így táblázatkezelőben használhatja őket, megoszthatja a csapatával, vagy biztonsági mentést készíthet belőlük. Akár a nevek és e-mail-címek gyors listájára, akár a teljes adatbázis exportjára van szüksége, több lehetőség közül választhat.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Aktív B1 Admin fiókra van szüksége, amely jogosult az exportálni kívánt adatok megtekintésére. Ha nem biztos a hozzáférési szintjében, olvassa el a [Szerepkörök és jogosultságok](roles-permissions.md) oldalt.
- Teljes adatbázis-exporthoz a **Beállítások** területhez kell hozzáférnie.

</div>

## Exportálás a Személyek oldalról

A névjegyzékét a leggyorsabban a **Személyek** oldalról exportálhatja:

1. Nyissa meg a [Gyors navigáció menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a B1 Admin bal felső sarkában), bontsa ki a **Személyek** menüpontot, majd kattintson a **Személyek** lehetőségre.
2. A keresősáv vagy a szűrők segítségével szűkítse le az exportálni kívánt eredményeket (vagy hagyja szűrés nélkül, ha mindenkit exportálni szeretne). A szűrésre vonatkozó tippekért lásd: [Személyek keresése](searching-people.md).
3. Kattintson a **Exportálás** gombra a Személyek oldal fejlécében.
4. Egy CSV-fájl töltődik le a számítógépére az aktuális eredményekben szereplő személyekkel, beleértve a nevüket, elérhetőségeiket, címüket és egyéb általános mezőiket.

:::tip
Az export az aktuális eredményekben szereplő összes személyt tartalmazza. Először futtasson keresést, töltsön be egy [Mentett listát](./lists.md), vagy használja a **Speciális** keresést, hogy csak a szükséges személyeket exportálja.
:::

## Teljes adatexport a Beállításokból

Az összes B1-adat (nem csak a személyek) teljes exportjához használja a Beállítások exporteszközét:

1. A Gyors navigáció menüben válassza a **Beállítások > Beállítások** lehetőséget.
2. Kattintson a **Import/Export** hivatkozásra az egyháza neve alatt, a bal oldali beállítások menü tetején.
3. Az **Adatforrás** legördülő menüben válassza a **B1 Adatbázis** lehetőséget.
4. Tekintse át az adatok előnézetét, majd kattintson a **Tovább a célhelyhez** gombra.
5. Célhelyként válassza a **B1 Export Zip** lehetőséget.
6. Figyelje az exportálás folyamatát, amíg minden elem zöld pipát nem mutat.
7. Az exportfájl automatikusan letöltődik. Keresse a `B1Export` fájlt a letöltések mappájában.
8. Csomagolja ki a fájlt, hogy hozzáférjen az egyes CSV-fájlokhoz (például `people.csv`), amelyeket Excelben, Google Táblázatokban vagy a Numbers programban nyithat meg.

:::info
A B1 Export Zip az egyházi adatainak teljes biztonsági mentése. Tartalmazza:

- a személyeket (fényképekkel) és a háztartásokat, beleértve a háztartási átvételi kapcsolattartókat
- a gyülekezeti helyszíneket, istentiszteleteket és istentiszteleti időpontokat
- a csoportokat és a csoporttagokat
- az alapokat és az adományokat, beleértve azokat is, amelyek több alap között oszlanak meg
- a részvételi adatokat
- az űrlapokat, kérdéseket, beküldéseket és válaszokat
- az egyéni mezőket és azok értékeit
- a mentett személylistákat

Ha egy személy fényképe nem tölthető le vagy nem olvasható be az exportálás során, a fénykép kimarad, és az exportálás fénykép nélkül folytatódik.

A visszaállításhoz válassza forrásként a **B1 Import Zip** lehetőséget, célként pedig a **B1 Adatbázis** lehetőséget (lásd: [Adatok importálása](./importing-data.md)). A háztartások, átvételi kapcsolattartók és mentett listák a személyekkel együtt épülnek újra. A mentett listák szűrői a visszaállított csoportokra, alapokra, helyszínekre és egyéni mezőkre mutatnak.
:::

## Csoportadatok exportálása

Egyes csoportok tagsági listáit is exportálhatja. A **Csoportok** oldalon nyisson meg egy csoportot, és kattintson a **letöltés ikonra**, hogy exportálja a csoport tagjainak listáját. További részletekért lásd: [Csoporttagok](../groups/group-members.md).

:::info
Az exportált CSV-fájlok minden jelentős táblázatkezelő alkalmazással működnek, többek között a Microsoft Excellel, a Google Táblázatokkal és az Apple Numbers programmal.
:::
