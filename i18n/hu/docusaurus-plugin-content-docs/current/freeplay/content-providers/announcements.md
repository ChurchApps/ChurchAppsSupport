---
title: "Hirdetések"
description: "Diák mappájának ciklikus lejátszása a FreePlay TV-n előcsarnoki vagy órai hirdetésekhez: mappa kiválasztása, szinkron tartása, befejezés után kikapcsolás."
---

# Hirdetések

<div class="article-intro">

A FreePlay képes körbeforgatni egy hirdetési diákat tartalmazó mappát a TV-jén, például az előcsarnokban vagy az óra kezdete előtt. Az egyik csatlakoztatott tartalomszolgáltatójából kiválasztasz egy mappát, a FreePlay letölti a diákat az eszközre, és megjelenik egy **Hirdetések** elem az oldalsávban, így bármikor elindíthatod a körbeforgatást.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- [Csatlakozzon egy tartalomszolgáltatóhoz](./connecting-providers.md), amely tartalmazza a hirdetési diákat, például a Dropboxot vagy a OneDrive-ot
- Helyezze a körbeforgatni kívánt képeket vagy videókat egy mappába abban a szolgáltatóban

</div>

## A hirdetési mappa kiválasztása

1. Nyissa meg a **Beállításokat** az oldalsáv alján, majd válassza a **Szolgáltatók** lehetőséget
2. Válassza ki a csatlakoztatott szolgáltatót, amely a diákat tartalmazza (a **Csatlakoztatva** jelvényt mutatja), hogy megnyissa a **Szolgáltató beállításait**
3. Válassza a **Használat hirdetésekhez** lehetőséget
4. Megnyílik a **Hirdetési mappa kiválasztása** böngésző. Lépkedjen a mappák között, amíg eléri azt, amelyikben a diák vannak, majd válassza ki ezt a mappát (vagy annak bármelyik fájlját)
5. A FreePlay letölti a diákat, és visszatér a **Szolgáltató beállításaihoz**, ahol a sor most ezt mutatja: **Lejátszás: "*mappa neve*" -- *szám* dia letöltve**

Egyszerre csak egy mappa használható hirdetésekhez. Ha másik szolgáltatóból választ mappát, az korábbit felülírja.

## Hirdetések lejátszása

Amint a diák letöltésre kerültek, a **Hirdetések** elem megjelenik az oldalsáv tetején (a **Mai terv** alatt, ha a TV megjeleníti azt). Válassza ki a körbeforgatás elindításához.

- A képek 15 másodpercig maradnak a képernyőn, hacsak a szolgáltató nem ad a fájlnak saját időtartamot
- A videók a végéig lejátszódnak, mielőtt a következő diára lépnének
- Az utolsó dia után a körbeforgatás elölről kezdődik
- Ha a mappában csak egyetlen videó van, az a helyén ismétlődik

A körbeforgatás az eszközön mentett fájlokból játszódik le, így internetkapcsolat nélkül is működik. Ugyanazokat a távvezérlő-funkciókat használhatja, mint bármely más tartalomnál -- lásd: [Tartalom lejátszása](./playing-content.md).

## A diák frissítése

A FreePlay minden alkalommal ellenőrzi a hirdetési mappát, amikor az alkalmazás elindul, letölti az új diákat, és eltávolítja azokat a diákat, amelyeket töröltek a mappából.

Ha azonnal ellenőrizni szeretné, nyissa meg a szolgáltató **Szolgáltató beállításait**, és válassza a **Hirdetésfrissítések keresése** lehetőséget. A sor az **Naprakész** állapotot és a diák számát mutatja, amikor az ellenőrzés befejeződött.

:::info
Ha a FreePlay nem éri el a szolgáltatót, vagy a mappa üresen érkezik vissza, a már meglévő diákat játssza tovább. Ha teljesen abba szeretné hagyni a hirdetések használatát, kapcsolja ki őket az alábbiak szerint.
:::

:::warning
Az a dia, amelyet ugyanazzal a fájlnévvel új verzióra cserélnek, nem töltődik le újra. Egy dia módosításához adja hozzá új fájlként, és törölje a régit.
:::

## A hirdetések kikapcsolása

Nyissa meg a szolgáltató **Szolgáltató beállításait**, és válassza ismét a **Használat hirdetésekhez** lehetőséget. A FreePlay abbahagyja a mappa használatát, törli a letöltött diákat az eszközről, és eltávolítja a **Hirdetések** elemet az oldalsávból.

A szolgáltató leválasztása szintén kikapcsolja az onnan származó hirdetéseket.

## Kapcsolódó cikkek

- **[Csatlakozás szolgáltatókhoz](./connecting-providers.md)** - Csatlakoztassa a szolgáltatót, amely a diákat tartalmazza
- **[Tartalmak böngészése és letöltése](./browsing-content.md)** - Böngésszen a szolgáltató mappái között, és játsszon le tartalmat igény szerint
- **[Tartalom lejátszása](./playing-content.md)** - A lejátszó vezérlői a TV távvezérlőjéhez
