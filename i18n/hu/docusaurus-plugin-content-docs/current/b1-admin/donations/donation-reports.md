---
title: "Adományjelentések"
description: "Adományösszegek, lemorzsolódó adakozók és tételek részletei a B1 Admin-ban: Donations Summary áttekintő, Lapsed Givers nézet, CSV-exportok."
---

# Adományjelentések

<div class="article-intro">

A B1 Admin többféleképpen is megtekintheti és elemezheti a gyülekezete adatait. A **Összesítés** oldal adományok irányítópultja diagramokkal és szűrőkkel nyújt vizuális áttekintést, a Jelentések szakasz pedig részletesebb Adomány-összesítő jelentést kínál. Ezekkel az eszközökkel nyomon követheti az adakozási tendenciákat, felkészülhet a testületi ülésekre, vagy egyeztetheti a nyilvántartásait.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Győződjön meg róla, hogy az adományokat [kötegekben rögzítették](recording-donations.md), vagy [Stripe-ból importálták](stripe-import.md)
- Ellenőrizze, hogy a [alapjai](funds.md) helyesen vannak-e beállítva, hogy az adományok megfelelően legyenek kategorizálva

</div>

## Adakozási irányítópult

Az adakozási irányítópult az **Összesítés** oldal **Irányítópult** nézete, amely az első oldal, amelyet az **Adományok** szakasz megnyitásakor lát.

1. Nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a B1 Admin bal felső sarkában), bontsa ki az **Adományok** menüpontot, és kattintson az **Összesítés** elemre. Az **Összesítés** oldal az **Irányítópult** nézetben nyílik meg. A jobb felső sarokban lévő **Nézet** kapcsoló az **Irányítópult** és a **Lemorzsolódott adakozók** nézet között vált.
2. A jelentés fölötti **Heti**, **Havi** és **Negyedéves** kapcsolóval választhatja ki, hogyan csoportosuljanak az adományok.
3. A **Jelentés szűrése** panelen állítsa be a **Kezdő dátum** és a **Záró dátum** mezőket (alapértelmezés szerint az elmúlt egy év, a tegnapig), és opcionálisan válasszon egy **Alapot**, majd kattintson a **Jelentés futtatása** gombra. Az oldal megnyitásakor a jelentés automatikusan lefut az alapértelmezett beállításokkal.
4. Négy **KPI-kártya** jeleníti meg az adakozási mutatókat a kiválasztott időszakra:
   - **Összes adomány** -- A teljes összeg, amelyet adtak.
   - **Átlagos adomány** -- Az átlagos adományösszeg.
   - **Egyedi adakozók** -- Azon személyek száma, akik adakoztak.
   - **Adományok száma** -- Az egyedi adományok teljes száma.
5. A KPI-k alatt egy oszlopdiagram mutatja az adakozást hetek, hónapok vagy negyedévek szerint, alaponként bontva.
6. Kattintson a **Letöltési lehetőségek** gombra, és válassza az **Összesítés** lehetőséget, hogy CSV-fájlba exportálja az időszakonkénti és alaponkénti összegeket, vagy kattintson a nyomtatás ikonra a jelentés kinyomtatásához. A gyülekezete logója (a [Weboldal > Megjelenés](../website/appearance.md) oldalon feltöltött **Világos háttérhez való logó**, ha feltöltött egyet) és neve a nyomtatott jelentés tetején, középen jelenik meg. A nyomtatvány sötét szöveget és világos diagramot használ akkor is, ha a B1 Admint sötét módban használja.

Ha az időszakban több pénznemben érkeztek adományok, a KPI-összegek átváltásra kerülnek a gyülekezete pénznemére, és a kártyák alatt megjelenik a **Átváltva az aktuális árfolyamon** megjegyzés. További részletekért lásd a [Többpénznemű támogatás](./multi-currency.md#converted-totals) oldalt.

:::info
Az irányítópult összesített adakozási adatokat mutat. Nem tartalmazza az egyes adakozók neveit. Adakozónkénti részletekért használja a [Kötegek](batches.md) oldalt.
:::

## Lemorzsolódott adakozók

Válassza a **Lemorzsolódott adakozók** lehetőséget a **Nézet** kapcsolónál, hogy listázza azokat a személyeket, akik egy időszakban adakoztak, de azóta nem. Alapértelmezés szerint az előző naptári évet hasonlítja össze az idei évtől napig, de bármelyik dátumtartományt módosíthatja, hogy szélesítse vagy szűkítse a keresést. Minden sor megmutatja a személyt, az utolsó adomány dátumát és a korábbi időszak összegét. A **Letöltési lehetőségek > Összesítés** lehetőséggel CSV-fájlba töltheti le a listát utánkövető levélküldéshez vagy telefonhíváshoz.

## Adakozónkénti részletek megtekintése

Ha meg szeretné nézni, ki mennyit adott és melyik alapra:

1. Lépjen a **Adományok > Kötegek** menüpontra.
2. Kattintson egy **köteg nevére** a megnyitásához.
3. A köteg részletező oldala felsorolja az egyes adományokat a fizetési móddal (és a csekkszámmal vagy a kártya utolsó számjegyeivel), az adakozó nevével, dátumával, megjegyzéseivel és összegével, az oldal alján pedig a végösszeggel.
4. Kattintson a **Szerkesztés** gombra egy adomány sorában, hogy megnyissa az adott adomány teljes részleteit, beleértve az alapját is.
5. Kattintson a lista feletti **Exportálás** gombra, hogy letöltse a köteg összes adakozói és adományi adatát tartalmazó CSV-fájlt.

## Adomány-összesítő jelentés

Az adománybeszámolás közvetlenül az Adományok szakaszba van beépítve: az Összesítés oldal szolgál adomány-összesítő jelentésként:

1. A Ugrás menüben válassza az **Adományok > Összesítés** lehetőséget.
2. Az **Irányítópult** nézetben állítsa be a **Kezdő dátum** és a **Záró dátum** mezőket a **Jelentés szűrése** panelen, majd kattintson a **Jelentés futtatása** gombra.
3. Kattintson a **Letöltési lehetőségek** gombra, és válassza az **Összesítés** lehetőséget a jelentés CSV-fájlként való exportálásához.

## Adatok exportálása

Az adományi adatokat több helyről is exportálhatja:

- **Összesítés oldal** -- CSV letöltése a heti, havi vagy negyedéves és alapok szerinti adomány-összegekről
- **Köteg részletező oldal** -- CSV letöltése az egyes adományokról, az adakozók adataival együtt
- **Alap részletező oldal** -- az adott alap adománytörténetének letöltése

:::tip
Az év végi jelentéshez kombinálja az Összesítés oldalról készült exportot a [Adakozási igazolások](giving-statements.md) eszközzel, hogy egyszerre kapjon összesített tendenciákat és egyéni adakozói igazolásokat.
:::

## Következő lépések

- Készítsen [Adakozási igazolásokat](giving-statements.md) az adakozóinak az év végén
- Tekintse át az egyes [kötegeket](batches.md), hogy ellenőrizze az adományi adatokat
- Nézze meg az [alap](funds.md) részletező oldalait, hogy kategóriánkénti adakozási bontást kapjon
