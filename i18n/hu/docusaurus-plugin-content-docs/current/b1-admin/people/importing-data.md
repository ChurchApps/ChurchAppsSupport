---
title: "Adatok importálása"
description: "Meglévő személyek, csoportok, részvételi és adományi adatok átvitele a B1 Admin-ba a B1 Transfer eszközzel, vagy adatmentés exportálása bármikor."
---

# Adatok importálása

<div class="article-intro">

A B1 Transfer eszköz megkönnyíti, hogy meglévő adatait átvigye a B1-be, akár táblázatból kezd ttiszta lappal, akár másik egyházkezelő rendszerből költözik, akár adományi nyilvántartásokat importál. Az adatait bármikor exportálásra vagy biztonsági mentésre is használhatja.

</div>

## Oktatóvideó

<YouTube id="G-VnhzACYIU" title="Gyülekezeti adatbázis importálása a B1-ben" next="Személyek keresése és listák készítése a B1-ben" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szükséges egy aktív B1 Admin fiók, amelynek van hozzáférése a **Beállításokhoz**.
- Az indítás előtt készítse elő az adatait a korábbi rendszeréből, és exportálja azokat.
- Ez az eszköz a kezdeti adatátvitelre szolgál. Ha már régóta használja a B1-et, az újbóli importálás duplikált rekordokat hozhat létre.

</div>

## A Transfer eszköz megnyitása

1. Jelentkezzen be a **B1 Admin** felületre.
2. Nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), bontsa ki a **Beállítások** menüpontot, majd kattintson a **Beállítások** gombra.
3. A bal oldali beállítások menü tetején, a gyülekezete neve alatt kattintson az **Importálás/Exportálás** hivatkozásra.
4. Ez új lapon megnyitja a **B1 Transfer** eszközt a [transfer.b1.church](https://transfer.b1.church) címen.

A transfer eszköz négy lépésen vezeti végig: Forrás, Előnézet, Cél és Futtatás.

---

## 1. lépés - Válassza ki a forrást

Válassza ki, honnan származnak az adatai. Hét lehetőség van:

- **B1 adatbázis** — Közvetlenül a meglévő B1 gyülekezetéből olvassa be az adatokat. Biztonsági mentéshez vagy az adatok másik formátumba alakításához hasznos. Ehhez a lehetőséghez be kell jelentkeznie.
- **B1 importáló zip** — Zip fájl a B1 saját formátumában. Elsősorban korábbi B1 export visszaállítására szolgál. Ha a B1 exportált zip fájlt visszatölti a **B1 adatbázisba**, minden visszaáll, amit az export tartalmazott (lásd: [Adatok exportálása](./exporting-data.md#full-data-export-from-settings)). Ha a fájl nem olvasható, az eszköz hibaüzenetet jelenít meg, és nem kezdi újra a folyamatot.
- **Breeze importáló zip** — A Breeze ChMS-ből exportált fájlokat tartalmazó zip fájl.
- **Planning Center zip** — A Planning Centerből exportált zip vagy CSV fájl.
- **Egyéni CSV / Excel** — Bármely személyi adatokat tartalmazó CSV vagy Excel fájl. A feltöltés után az oszlopokat a B1 mezőihez kell rendelnie, mielőtt az importálás folytatódik.
- **Tithe.ly CSV** — Tithe.ly személyi vagy adományi exportfájl (CSV vagy Excel formátum is elfogadott).
- **CCB / Pushpay CSV** — Church Community Builderből vagy Pushpayből származó személyi vagy adományi export CSV.

A fájlt áthúzhatja a feltöltési területre, vagy kattintva tallózhatja ki.

---

## 1b. lépés - Mezők hozzárendelése (csak Egyéni CSV / Excel esetén)

Ha az **Egyéni CSV / Excel** lehetőséget választotta, a fájl feltöltése után az eszköz az előnézet előtt egy mezőhozzárendelő képernyőt jelenít meg.

A fájl minden oszlopa mintaértékkel együtt szerepel a listában. Minden oszlopnál a legördülő menüvel válassza ki a megfelelő B1 mezőt. Az eszköz automatikusan felismeri a gyakori oszlopneveket, mint például „First Name”, „Email” vagy „Zip Code”, de minden sort ellenőrizzen, és javítsa ki, amit az eszköz kihagyott.

A elérhető B1 mezők többek között:

- Keresztnév, Vezetéknév, Második keresztnév, Becenév, Megjelenített név, Megszólítás/Titulus, Utótag
- E-mail, Otthoni telefon, Mobiltelefon, Munkahelyi telefon
- Cím 1. sor, Cím 2. sor, Város, Megye/Állam, Irányítószám
- Születési dátum, Házassági évforduló, Nem, Családi állapot, Tagsági státusz
- Háztartás/Család neve
- Csoport neve — a személyt névvel rendeli egy csoporthoz
- **Egyéni mező (név alapján)** — az oszlop tartalmát az egyházának egyik [egyéni személyi mezőjébe](../settings/custom-fields.md) menti. Megjelenik a **B1 mező neve** doboz, benne az oszlop fejlécével. Módosítsa a B1-ben szereplő mező pontos nevére (a nagy- és kisbetű nem számít).
- **Űrlapválasz (egyéni mező)** — az oszlop értékét a személy rekordjához csatolt egyéni mezőként menti. Ha ezt a lehetőséget használja, meg kell adnia az űrlap nevét.

A dátumok gyakori formátumokban, például `9/17/1994` alakban is megadhatók, és automatikusan konvertálódnak. Egyéni mezők esetén az Igen/Nem mezők olyan értékeket fogadnak el, mint Yes, No, Y, N, True, False, 1 és 0, a többválasztós mezők pedig a választott szöveget vagy annak értékét.

:::info
A személyi egyéni mezőket a B1 Adminban hozza létre még az importálás előtt. Az importálás befejezése után az **Egyéni mezők** lépés felsorolja azokat az oszlopneveket, amelyek nem egyeznek egyetlen B1 mezővel sem, és megszámolja azokat az értékeket, amelyek nem illenek a mező típusához. Ezeket az értékeket az eszköz kihagyja, a többi importálás pedig teljesen lefut.
:::

Azokat az oszlopokat, amelyeket nem szeretne importálni, állítsa **(Kihagyás)** értékre. A folytatás előtt legalább egy névmezőt (Keresztnév vagy Vezetéknév) hozzá kell rendelnie.

A előnézetre lépéshez kattintson a **Hozzárendelés megerősítése és importálás** gombra.

---

## 2. lépés - Az adatok előnézete

A feltöltés után az eszköz megjeleníti az összes importálandó adat előnézetét. A füleket használva ellenőrizze az egyes adattípusokat:

- **Személyek** — Háztartások szerint csoportosítva, ha vannak fényképek, azokkal együtt.
- **Csoportok** — Campus, szolgálat, időpont és kategória szerint rendezve.
- **Részvétel** — Alkalom dátumai, csoportok és látogatások száma.
- **Adományok** — Kötegek, alapok, adakozók és összegek.
- **Űrlapok** — Űrlapok nevei és tartalomtípusai.

Figyelmesen nézze át, mielőtt továbblép. Ha valami hibásnak tűnik, kattintson a **Újrakezdés** gombra, és javítsa ki a forrásfájlt.

---

## 3. lépés - Válassza ki a célt

Válassza ki, hová szeretné küldeni az adatokat:

- **B1 adatbázis** — Közvetlenül a gyülekezete B1 adatbázisába importál. Ennek kiválasztása után az eszköz megjeleníti a hozzáadandó rekordok végső számát. A megerősítéshez kattintson az **Átvitel indítása** gombra.
- **B1 export zip** — B1 formátumú zip fájlba menti az adatait, amelyet később a **B1 importáló zip** lehetőséggel vissza lehet állítani. Biztonsági mentéshez ideális.
- **Breeze export zip** — Az adatokat Breeze formátumra alakítja.
- **Planning Center zip** — Az adatokat Planning Center formátumra alakítja.

:::warning
A forrás és a cél formátuma nem lehet azonos. Ha egyeznek, az eszköz figyelmeztet, hogy megakadályozza a véletlen duplikálást.
:::

---

## 4. lépés - Futtatás

Az eszköz feldolgozza az átvitelt, és lépésenként mutatja a haladást:

- Campusok, szolgálatok és időpontok
- Személyek
- Fényképek
- Csoportok és csoporttagok
- Adományok
- Részvétel
- Űrlapok, kérdések, válaszok és űrlapbeküldések
- Egyéni mezők (ha egyéni mező oszlopokat rendelt hozzá)
- Tömörítés (csak zip fájl céloknál)

Ha a cél a **B1 adatbázis**, a haladási kártya címe **Importálás folyamatban**, és **Az importálás kész!** (vagy **Az importálás hibákkal fejeződött be**) üzenettel zárul. Zip fájl célok esetén ugyanezek az üzenetek **Exportálás** szót használnak.

:::info
**B1 importáló zip** visszaállításakor azok a rekordok, amelyek olyasmire mutatnak, ami már nincs a fájlban, kimaradnak, és nem állítják le az importálást. Ilyenek: csoporttagságok olyan személyekhez vagy csoportokhoz, amelyek nincsenek a zip fájlban, részvétel törölt csoportokhoz vagy személyekhez, valamint csoportok és törölt szolgálati időpontok közötti kapcsolatok. Azok a részvételi alkalmak, amelyek soha nem kapcsolódtak szolgálati időponthoz, továbbra is visszaállnak. Hasonlóan, exportáláskor azt a fényképet, amelyet nem lehet letölteni vagy beolvasni, az eszköz kihagyja, hogy a **Fényképek** lépés folytatódhasson.
:::

:::warning
Az átvitel futása közben ne zárja be a böngészőt. Várjon, amíg minden lépés befejezettnek nem jelenik meg.
:::

---

## Breeze importáló zip fájl előkészítése

1. A Breezeben lépjen a **Beállítások** menübe, és a bal oldali sávban kattintson az **Exportálás** gombra.
2. Exportáljon három külön fájlt: **Személyek**, **Címkék** és **Hozzájárulások**.
3. Jelölje ki mindhárom fájlt, kattintson jobb gombbal, és tömörítse őket egyetlen zip fájlba.
   - Macen: jelölje ki a fájlokat, kattintson jobb gombbal, és válassza a **Tömörítés** lehetőséget.
   - PC-n: jelölje ki a fájlokat, kattintson jobb gombbal, válassza a **Küldés ide** menüpontot, majd a **Tömörített (zipelt) mappa** lehetőséget.
4. Töltse fel a zip fájlt a **Breeze importáló zip** lehetőséggel az 1. lépésben.

A Breeze-importálás automatikusan átviszi a személyeket, a csoportokat (címkék) és az adományi rekordokat.

---

## Planning Center export előkészítése

1. Jelentkezzen be a Planning Centerbe, és nyissa meg a **People** terméket.
2. A bal oldali sávban kattintson a **Listák** pontra, és hozzon létre egy listát, amely tartalmazza mindazokat, akiket át szeretne vinni. (Ha már van listája a teljes gyülekezetéről, használja azt.)
3. Nyissa meg a listát, és az **exportálás** lehetőséggel töltse le a személyeket **CSV** fájlként. Vegye bele azokat a mezőket, amelyeket meg szeretne tartani — a név, e-mail, telefon, cím, születési dátum, nem és tagsági státusz mind átképeződnek a B1-be.
4. Ha a Planning Center egynél több fájlt ad, jelölje ki mindet, kattintson jobb gombbal, és tömörítse őket egyetlen zip fájlba.
   - Macen: jelölje ki a fájlokat, kattintson jobb gombbal, és válassza a **Tömörítés** lehetőséget.
   - PC-n: jelölje ki a fájlokat, kattintson jobb gombbal, válassza a **Küldés ide** menüpontot, majd a **Tömörített (zipelt) mappa** lehetőséget.
5. Töltse fel a CSV-t vagy a zip fájlt a **Planning Center zip** lehetőséggel az 1. lépésben.

A feltöltés után folytassa az előnézettel, és ellenőrizze, hogy a személyei és háztartásai helyesen jelennek-e meg, mielőtt futtatja az importálást.

---

## Tithe.ly export előkészítése

1. A Tithe.lyban exportálja a **Személyek** adatait CSV vagy Excel fájlként. Ha adományi rekordokat is szeretne átvinni, exportálhat külön **Adakozás** fájlt is.
2. Az eszköz az oszlopnevek alapján automatikusan felismeri, hogy a fájl személyi vagy adományi adatokat tartalmaz-e.
3. Töltse fel a fájlt a **Tithe.ly CSV** lehetőséggel az 1. lépésben.

:::info
A Tithe.ly exportokat egyszerre egy fájllal lehet importálni. Ha külön kell importálnia a személyeket és az adakozási rekordokat, a folyamatot kétszer futtassa le.
:::

---

## CCB vagy Pushpay export előkészítése

1. A Church Community Builderben vagy a Pushpayben exportálja a **Személyek** adatait CSV fájlként. Külön adakozási/hozzájárulási fájlt is exportálhat.
2. Az eszköz az oszlopnevek alapján automatikusan felismeri, hogy a fájl személyi vagy adományi adatokat tartalmaz-e.
3. Töltse fel a fájlt a **CCB / Pushpay CSV** lehetőséggel az 1. lépésben.

---

## Importálás után

Amint az átvitel befejeződött, szánjon néhány percet az adatok ellenőrzésére:

1. Nyissa meg a [Személyek](../people/adding-people.md) oldalt, és nézzen át néhány profilt.
2. Ellenőrizze, hogy a nevek, e-mail címek, telefonszámok és címek helyesen kerültek-e át.
3. Ellenőrizze, hogy a háztartási kapcsolatok megmaradtak-e. Minden személy háztartási szerepe (Fej, Házastárs, Gyermek vagy Egyéb) átkerül, ha a forrásban szerepel: a B1 importáló zipben a **householdRole** oszlop, a Breeze vagy Tithe.ly fájlban a **Family Role**, a CCB / Pushpay fájlban pedig a **Family Position** oszlop. Az olyan szerepek, mint „Head of Household”, „Primary”, „Wife” vagy „Son”, a megfelelő B1 szerepre alakulnak. A Planning Center és az Egyéni CSV / Excel importálásnak nincs szereposzlopa, ezért ezek a személyek **Egyéb** szerepet kapnak. A szerepet a személy háztartásából módosíthatja a [Személyek](../people/adding-people.md#managing-households) oldalon.
4. Tekintse át az importált csoportokat és adományi rekordokat.

Ha problémát talál, a Személyek oldalon szerkesztheti az egyes profilokat. Az átviteli eszközt újra is futtathatja, hogy [exportálja az adatait](exporting-data.md) biztonsági mentésként.
