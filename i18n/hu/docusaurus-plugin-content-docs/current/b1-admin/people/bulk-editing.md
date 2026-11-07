---
title: "Személyek tömeges szerkesztése"
---

# Személyek tömeges szerkesztése

<div class="article-intro">
A tömeges szerkesztéssel egyszerre több személyt frissíthet, így időt takaríthat meg, ha sok embernél ugyanazt a módosítást kell elvégeznie. Egyetlen művelettel frissítheti a tagsági státuszt, a családi állapotot, a nemet, a közlemény-leiratkozási beállításokat és a csoporttagságokat.
</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Szüksége van jogosultságra a személyadatok kezeléséhez. A részletekért lásd: [Szerepkörök és jogosultságok](./roles-permissions.md).
- Már hozzá kell adnia vagy importálnia kell azokat a személyeket, akiket szerkeszteni szeretne. Ha szükséges, lásd: [Személyek hozzáadása](./adding-people.md).
</div>

## Személyek kijelölése tömeges szerkesztéshez

1. Lépjen a B1 Adminban a **Személyek** menüpontra
2. A keresés vagy a szűrők segítségével keresse meg a frissíteni kívánt személyeket
3. Jelölje be a négyzeteket a személyek kijelöléséhez
   - A **Háztartások** nézetben egy háztartás bejelölésével az összes benne lévő személy kijelölésre kerül
   - A **Táblázat** nézetben (a **Nézet** kapcsolóval váltva) egyenként is kijelölheti a személyeket
   - Vagy a lista fölötti jelölőnégyzettel jelölheti ki az összes látható személyt
4. Miután legalább egy személyt kijelölt, a lista feletti sáv megjeleníti a kijelölt személyek számát, valamint a **Kijelölés törlése** gombot és a **Műveletek** gombot

:::tip
Ha nagyobb csoport adatait kell frissítenie meghatározott szempontok alapján, használja az [AI-keresést](./ai-search.md) vagy a szűrőket a lista szűkítéséhez, majd jelölje ki az összes találatot.
:::

## Elérhető tömeges műveletek

A **Műveletek** menü több lehetőséget kínál:

### Tagsági státusz frissítése

Frissítse a tagsági státuszt az összes kijelölt személy esetében:

1. Kattintson a **Műveletek** → **Tagsági státusz beállítása** lehetőségre
2. Válassza ki az új státuszt:
   - **Látogató** -- Első alkalommal vagy alkalmanként érkező résztvevők
   - **Vendég** -- Vendégek, például a becsekkoló kiosztónál regisztrált családok
   - **Rendszeres résztvevő** -- Gyakori résztvevők, akik nem tagok
   - **Tag** -- Hivatalos gyülekezeti tagok
   - **Munkatárs** -- Gyülekezeti munkatársak
   - **Inaktív** -- Azok, akik már nem járnak rendszeresen
   - **Elhunyt** -- Az elhunyt személyek
3. Válassza ki a frissítési módot:
   - **Összes felülírása** -- Az összes kijelölt személy jelenlegi státuszának lecserélése
   - **Csak az üresek frissítése** -- Csak azoknak a személyeknek állítja be a státuszt, akiknek nincs
4. Kattintson a **Frissítés** gombra

### Családi állapot frissítése

Családi állapot tömeges frissítése:

1. Kattintson a **Műveletek** → **Családi állapot beállítása** lehetőségre
2. Válassza ki az új állapotot:
   - **Ismeretlen**
   - **Egyedülálló**
   - **Házas**
   - **Elvált**
   - **Özvegy**
3. Döntse el, hogy felülírja-e a meglévő értékeket, vagy csak az üres mezőket frissíti
4. Kattintson a **Frissítés** gombra

### Nem frissítése

Több személy nemére vonatkozó adatok frissítése:

1. Kattintson a **Műveletek** → **Nem beállítása** lehetőségre
2. Válassza ki az értéket:
   - **Nincs megadva**
   - **Férfi**
   - **Nő**
3. Válassza ki a frissítési módot (összes felülírása vagy csak az üresek)
4. Kattintson a **Frissítés** gombra

### Közlemény-leiratkozási állapot frissítése

Szabályozza, hogy a személyek leiratkoztak-e a kommunikációról:

1. Kattintson a **Műveletek** → **Közlemény-leiratkozás beállítása** lehetőségre
2. Válassza ki:
   - **Nem** -- Kommunikáció engedélyezése (leiratkozás eltávolítása)
   - **Igen** -- Kommunikáció letiltása (leiratkozás beállítása)
3. Válassza ki a frissítési módot
4. Kattintson a **Frissítés** gombra

:::warning
Legyen óvatos a leiratkozási állapot módosításakor. Azok a személyek, akik kifejezetten leiratkoztak, nem kaphatnak kommunikációt, hacsak nem adtak új hozzájárulást.
:::

### Egyéni mező beállítása

Állítson be egy Igen/Nem [egyéni mezőt](../settings/custom-fields.md) egyszerre az összes kijelölt személy számára:

1. Kattintson a **Műveletek** → **Egyéni mező beállítása** lehetőségre.
2. Válassza ki azt az Igen/Nem egyéni mezőt, amelyet be szeretne állítani.
3. Válassza ki az alkalmazandó értéket (**Igen** vagy **Nem**).
4. Kattintson a **Frissítés** gombra.

:::info
Ehhez a tömeges művelethez csak Igen/Nem típusú egyéni mezők érhetők el. Más típusú mezők beállításához szerkessze az egyes személyeket külön-külön.
:::

### Hozzáadás csoporthoz

Az összes kijelölt személy hozzáadása egy vagy több csoporthoz:

1. Kattintson a **Műveletek** → **Hozzáadás csoporthoz** lehetőségre
2. Keressen rá és válassza ki azt a csoportot vagy csoportokat, amelyekhez hozzá szeretné adni a személyeket
3. Több csoportot is kiválaszthat, így a személyeket mindegyikhez hozzáadhatja
4. Kattintson a **Hozzáadás a csoportokhoz** gombra

Minden személy a kiválasztott csoport(ok) rendes tagjaként kerül hozzáadásra. Később, ha szükséges, a [Csoporttagok](../groups/group-members.md) oldalon csoportvezetővé is előléptetheti őket.

### Eltávolítás csoportból

Az összes kijelölt személy eltávolítása egy vagy több csoportból:

1. Kattintson a **Műveletek** → **Eltávolítás csoportból** lehetőségre
2. Keressen rá és válassza ki azt a csoportot vagy csoportokat, amelyekből el szeretné távolítani a személyeket
3. Több csoportot is kiválaszthat
4. Kattintson az **Eltávolítás a csoportokból** gombra

:::info
Ez a művelet csak a megadott csoportokból távolítja el a személyeket. Nem törli a személyek nyilvántartását.
:::

### Személyek törlése

Állandóan törölje a kijelölt személyeket a gyülekezet adatbázisából:

1. Kattintson a **Műveletek** → **Törlés** lehetőségre
2. A **Kijelölt személyek törlése** párbeszédablakban meg kell erősítenie, hány személyt töröl
3. Kattintson a **Törlés** gombra

:::danger
A személyek törlése végleges, és nem vonható vissza. Ezzel minden adatuk eltávolításra kerül, beleértve:
- Személyes adatok
- Csoporttagságok
- Részvételi adatok
- Adományozási előzmények
- Űrlapbeküldések

Ezt a műveletet csak akkor használja, ha teljesen biztos abban, hogy el akarja távolítani ezeket a személyeket a rendszerből.
:::

## Tömeges szerkesztés eredményei

Egy tömeges művelet befejezése után összefoglalót lát, amely a következőket tartalmazza:

- **Összes kijelölt** -- Hány személy szerepelt a műveletben
- **Sikeresen frissítve** -- Hány rekord módosult
- **Sikertelen** -- Azok a rekordok, amelyeket nem sikerült frissíteni (ha van ilyen)
- **Változatlan** -- Azok a rekordok, amelyek nem igényeltek módosítást (például az „csak az üresek frissítése” mód használatakor)

Ha bármely frissítés sikertelen volt, a hibák részletei megjelennek, amelyek elmagyarázzák az okot.

## Ajánlott gyakorlatok

- **Kezdje kicsiben** -- Először néhány rekordon teszteljen tömeges műveleteket, hogy megbizonyosodjon arról, a megfelelő módosításokat végzi-e
- **Használjon szűrőket** -- A kijelölés előtt szűkítse a listát szűrőkkel vagy AI-keresés segítségével, hogy csak a megfelelő személyeket frissítse
- **Ellenőrizze kétszer a kijelöléseket** -- A tömeges módosítások alkalmazása előtt nézze át a kijelölt személyeket
- **Használja az „csak az üresek frissítése” módot** -- Ha hiányzó adatokat szeretne kitölteni anélkül, hogy a meglévő információkat felülírná
- **Dokumentálja a nagyobb változtatásokat** -- Vezessen jegyzeteket a tömeges frissítésekről, hogy később vissza tudjon rájuk nézni
- **Egyeztessen a csapatával** -- Tájékoztassa a többi adminisztrátort, ha nagyobb tömeges módosításokat végez

## Gyakori felhasználási esetek

### Új tagok frissítése

Egy tagsági óra után állítsa be az összes résztvevő státuszát Tag-ra:

1. Keresse meg az óra résztvevőit
2. Jelölje ki mindegyiküket
3. Használja a **Műveletek** → **Tagsági státusz beállítása** → **Tag** lehetőséget

### Kiscsoportok szervezése

Több személy hozzáadása egy új kiscsoporthoz:

1. Keresse meg azokat a személyeket, akiket a csoportban szeretne
2. Jelölje ki őket
3. Használja a **Műveletek** → **Hozzáadás csoporthoz** lehetőséget, és válassza ki a kiscsoportot

### Adatok rendezése

Hiányzó családi állapot kitöltése házaspárok esetén:

1. Szűrjön a házas személyekre (háztartási információk alapján)
2. Válassza ki azokat, akiknél a családi állapot üres
3. Használja a **Műveletek** → **Családi állapot beállítása** → **Házas** → **Csak az üresek frissítése** lehetőséget

## Kapcsolódó cikkek

- [Személyek keresése](./searching-people.md) -- Személyek megkeresése szerkesztéshez
- [AI-keresés](./ai-search.md) -- Természetes nyelvű keresés meghatározott személycsoportok megtalálásához
- [Csoporttagok](../groups/group-members.md) -- Csoporttagság kezelése
- [Adatok exportálása](./exporting-data.md) -- Személyadatok exportálása tömeges módosítások előtt
