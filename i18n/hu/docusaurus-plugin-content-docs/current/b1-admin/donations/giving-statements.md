---
title: "Adománykimutatások"
---

# Adománykimutatások

<div class="article-intro">

Minden év végén adományozóinak szüksége van adólevonható adományaik összesítésére, hogy megőrizhessék a nyilvántartásaikban. A B1 Admin lehetővé teszi, hogy ezeket a kimutatásokat egyszerre, az összes adományozó számára elkészítse, így órákat spórolhat meg a kézi munkával.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Ellenőrizze, hogy az [alapok](funds.md) helyesen vannak-e megjelölve **adólevonhatóként** – a kimutatásokon csak az adólevonható alapokba tett adományok szerepelnek
- Győződjön meg róla, hogy minden adomány [rögzítve](recording-donations.md) van, és az online tranzakciók be lettek [importálva a Stripe-ból](stripe-import.md)

</div>

## Adománykimutatások megnyitása

1. A **B1 Adminban** nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősávot), és bontsa ki az **Adományok** menüpontot.
2. Kattintson az **Adománykimutatások** menüpontra. Megnyílik a **Kötegelt adománykimutatások** oldal.

## Kimutatások létrehozása

1. Az **Év kiválasztása** panelen válassza ki az **Évet** a legördülő menüből. Az aktuális évet vagy az azt megelőző öt év bármelyikét választhatja.
2. Az oldal csak az adott évre (január 1-jétől december 31-ig) dátumozott adományokat tölti be, így akkor is gyorsan megnyílik, ha egyházának sok éves adománytörténete van. Ha másik évet választ, az összesítés az adott év adományaival frissül. Az év alatt található **Összesítés** panel az adott évre vonatkozó statisztikákat mutatja, többek között:
   - **Összes adományozó** – az adakozó személyek száma
   - **Összes adomány** – az egyedi adományrekordok száma
   - **Összeg** – az összes adomány együttes összege

## Kimutatások letöltése

A **Letöltési lehetőségek** panel két lehetőséget kínál a kimutatások adományozóihoz juttatására:

### Letöltés CSV-fájlként

Az **Egyedi CSV-fájlok** alatt kattintson a **ZIP letöltése** gombra, hogy letöltse azt a ZIP-fájlt, amely minden adományozóhoz külön CSV-fájlt tartalmaz. Ez akkor hasznos, ha a kimutatásokat egyenként szeretné e-mailben elküldeni, vagy egy másik rendszerbe importálni.

### Összes kimutatás nyomtatása

A **Nyomtatható kimutatások** alatt kattintson az **Összes nyomtatása** gombra (a gombon a kimutatások száma látható), hogy megnyissa a kiválasztott év minden adományozói kimutatásának nyomtatható nézetét a böngészőben. Innen a böngésző nyomtatási funkciójával küldheti őket nyomtatóra. Minden kimutatás új oldalon kezdődik, így azok készen állnak a behajtogatásra és postázásra. A kimutatások az adományozó vezetékneve, majd keresztneve szerint vannak sorba rendezve.

Ha a [Webhely > Megjelenés](../website/appearance.md) menüpontban feltöltött egy **Világos háttérhez való logót**, az minden kimutatás tetején, a kimutatás címe fölött, középre igazítva jelenik meg. Ez vonatkozik mind az **Összes nyomtatása** funkcióra, mind pedig egy adományozó kimutatására, amelyet az adott adományozó rekordjából nyomtat.

:::tip
Készítse el kimutatásait január elején, amíg a nyilvántartások frissek. Kimutatások készítése előtt ellenőrizze még egyszer, hogy az alapok helyesen vannak-e adólevonhatóként megjelölve – csak az adólevonható alapokba tartozó adományok szerepelnek a kimutatásokon.
:::

:::info
Az adománykimutatásokon csak azok az adományok szerepelnek, amelyek olyan alapokhoz vannak rendelve, ahol az **Adólevonható** beállítás engedélyezve van. Ha egy alap nincs adólevonhatóként megjelölve, annak adományai nem jelennek meg a kimutatáson. Ezt a beállítást az [Alapok](funds.md) oldalon kezelheti.
:::

## Kanadai, ausztrál és új-zélandi nyugtaformátumok

Az Egyesült Államokon kívüli egyházak át tudják állítani a kimutatást országuk hivatalos nyugtaelrendezésére. Kattintson a **Kimutatás formátuma** gombra az Adománykimutatások oldal tetején (vagy lépjen a **Beállítások** menübe, és nyissa meg az **Adományok** szakaszt), állítsa a **Kimutatás formátuma** beállítást **Kanada**, **Ausztrália** vagy **Új-Zéland** értékre, majd töltse ki a megjelenő mezőket: nyilvántartási számát (CRA-nyilvántartási szám, ABN vagy új-zélandi jótékonysági nyilvántartási szám), egyházának címét, a nyugták aláírására jogosult személy nevét, Kanada esetében pedig azt a várost, ahol a nyugtákat kiállítják.

A kimutatások ezután az adóhatóság által elvárt szöveget tartalmazzák (Kanada esetén a „Hivatalos nyugta jövedelemadózási célokra” CRA-hivatkozással), a `YEAR-DONORID` formátumú nyugtaszámot, az adólevonható alapokból számított elszámolható összeget, valamint külön sort a nem adólevonható alapokba tett adományokról. Az adományozók ugyanazt a nyugtablokkot látják, amikor a B1.churchből saját kimutatásukat nyomtatják.

## Amit a tagok látnak a B1.churchben

Ugyanaz az **Adományok** beállítási szakasz szabályozza, hogy a tagok mit látnak a B1.churchben lévő saját adományoldalukon:

- A **Tagok adománytörténete** határozza meg, mely években láthatják a tagok az adataikat. Az alapértelmezett érték az **Összes év**. A **2025-ig** (vagy bármely más év) beállítás eddig az évig engedi a hozzáférést, így a tagok nem tekinthetnek meg vagy nyomtathatnak későbbi évet, amíg Ön nem engedélyezi. Ezt használja az aktuális év visszatartására, amíg befejezi a javításokat és visszatérítéseket. A **Rejtett** beállítás teljesen eltávolítja az adománytörténetet, az éves összesítéseket és a kimutatás-nyomtatást. A tagok továbbra is adakozhatnak.
- Az **Adományozási megjegyzés** egy rövid üzenet, amely a tag adományoldalán és adománytörténetében jelenik meg, és minden adománykimutatás alján kinyomtatásra kerül, beleértve az itt nyomtatott kimutatásokat is. Ezt olyan dolgokhoz használja, mint például a visszatérítési szabályzat.

Ezek a beállítások csak azt változtatják meg, amit a tagok látnak. Ezen az oldalon továbbra is kinyomtathatja bármely év kimutatását.

## Következő lépések

Ha az adománykimutatások készítése előtt szeretné áttekinteni az adomány részleteit, látogasson el az [Adatjelentések](donation-reports.md) oldalra, vagy nézze meg az egyes [kötegeket](batches.md).
