---
title: "Naptárjóváhagyások"
description: "Függő terem- és eszközfoglalások átnézése a B1 Admin-ban, ütközések ellenőrzése, majd elfogadás vagy elutasítás, opcionálisan az esemény közzétételével."
---

# Naptárjóváhagyások

<div class="article-intro">

A Jóváhagyások oldalon a rendszergazdák áttekinthetik és kezelhetik a függőben lévő terem- és erőforrás-foglalási kérelmeket, valamint azokat a naptáresemény-kéréseket, amelyeket közzététel előtt jóvá kell hagyni.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítson be egy **jóváhagyási csoportot** a termekhez vagy erőforrásokhoz a [Termek és erőforrások](./rooms-resources.md) oldalon
- Szüksége van a **Naptárkezelő** jogosultságra vagy a **content.edit** jogosultságra

</div>

## A Jóváhagyások megnyitása

A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősávot), bontsa ki a **Naptárak** menüpontot, majd kattintson a **Jóváhagyások** elemre. Itt jelennek meg a függőben lévő foglalási kérelmek és a felülvizsgálatra váró események.

## Foglalási kérelmek

Amikor egy csoport eseményt hoz létre, és termet vagy erőforrást igényel, a kérelem a **Terem- és erőforrás-kérelmek** szakaszban jelenik meg. Minden sor a következőket mutatja:

- Az esemény neve és dátuma/időpontja
- Az igényelt terem vagy erőforrás (többegységes erőforrás esetén a mennyiséggel)
- Állapotjelző, amely megmutatja, van-e ütközés

### Ütközésjelzők

Ha a kérelem átfedésben van egy másik foglalással vagy zárolással ugyanarra a teremre vagy erőforrásra, az állapotjelzőn **Ütközés** címke látható; vigye rá az egeret a részletekért. Az átfedés nélküli kérelmeknél **Nincs ütközés** látszik. Mielőtt bármelyiket jóváhagyná, gondosan vizsgálja meg az ütköző kérelmeket.

### Jóváhagyás vagy elutasítás

Kattintson a **Jóváhagyás** vagy az **Elutasítás** gombra bármely foglalási kérelemnél (az elutasításhoz először megerősítés szükséges). A kérelmező csoport értesítést kap a döntésről. A jóváhagyott foglalások az eseményre lezárják az adott termet vagy erőforrást; az elutasított foglalások felszabadítják az időpontot mások számára.

Amikor a **Jóváhagyás** gombra kattint, megnyílik a **Foglalás jóváhagyása** párbeszédpanel, így ugyanebben a lépésben közzé is teheti az eseményt:

1. Jelölje be a **Közzététel a nyilvános naptárban** opciót, hogy az esemény látható legyen a csoportja nyilvános naptárában. Ha nincs bejelölve, a foglalás jóváhagyásra kerül anélkül, hogy az esemény láthatóságát megváltoztatná.
2. Ha a **Közzététel a nyilvános naptárban** be van jelölve, opcionálisan kiválaszthat egy szerkesztett naptárat a **Hozzáadás ehhez a naptárhoz is** listából, hogy az eseményt az egyik [szerkesztett naptárhoz](./curated-calendar.md) is hozzáadja. Ha a **Nincs** értéken hagyja, ezt a lépést kihagyja. (Ez a lehetőség csak akkor jelenik meg, ha rendelkezik a **content.edit** jogosultsággal.)
3. Kattintson a **Jóváhagyás** gombra.

## Függőben lévő események

Ha a naptár munkafolyamata előírja, hogy az események csak jóváhagyás után váljanak nyilvánossá, a függőben lévő események az **Eseménykérelmek** szakaszban jelennek meg. Kattintson a **Jóváhagyás** gombra, hogy az eseményt közzétegye a naptárban, vagy az **Elutasítás** gombra, hogy értesítse a beküldőt, hogy módosításokra van szükség.

:::tip
Állítson be jóváhagyási csoportot egy teremhez a [Termek és erőforrások](./rooms-resources.md) oldalon, ha az adott teremhez jóváhagyás szükséges. Az arra jogosult csoportok az események létrehozásakor igényelhetik a termet, és ezek a kérelmek ide érkeznek.
:::

## Kapcsolódó cikkek

- [Termek, erőforrások és ütemezés](./rooms-resources.md) — foglalható termek és erőforrások beállítása
- [Naptárak létrehozása](./creating-calendars.md) — naptárak és események kezelése
