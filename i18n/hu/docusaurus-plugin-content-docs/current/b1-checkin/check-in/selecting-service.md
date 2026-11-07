---
title: "Szolgálat kiválasztása"
description: "A B1 Checkin szolgáltatások képernyőjén válassza ki a részvétel szolgálatát; ez határozza meg a további lépések időpontjait és csoportjait."
---

# Szolgálat kiválasztása

<div class="article-intro">

Minden check-in első lépése annak kiválasztása, hogy melyik szolgálatra érkezel. A szolgálatok képernyője közvetlenül az alkalmazás betöltése után jelenik meg, és meghatározza, mely szolgálati időpontok és csoportok állnak rendelkezésre a check-in folyamat többi részében.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- [Jelentkezz be](../getting-started/logging-in.md) a B1 Church Checkin alkalmazásba, és válaszd ki a gyülekezetedet
- Győződj meg arról, hogy a gyülekezet adminisztrátora [beállította a szolgálatokat és a szolgálati időpontokat](../../b1-admin/attendance/setup.md) a B1 Adminban

</div>

## Hogyan működik

1. Bejelentkezés után (vagy a visszatérő látogatásoknál az automatikus bejelentkezés után) az alkalmazás megjeleníti a **szolgálatok képernyőt**.
2. Láthatod a gyülekezetedhez beállított összes szolgálat listáját. Minden szolgálat egy kártyaként jelenik meg, amely a szolgálat nevét mutatja (például „Vasárnap délelőtt” vagy „Szerda este”).
3. Koppints arra a szolgálatra, amelyikre érkezel.

Az alkalmazás betölti az adott szolgálathoz tartozó szolgálati időpontokat és csoportokat, majd a [tagkereső képernyőre](./looking-up-members.md) navigál.

## Amikor a check-in nincs nyitva

Ha az adminisztrátorod egy szolgálati időponthoz [check-in ütemezést](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) rendelt, az alkalmazás csak akkor engedi a családoknak az adott szolgálati időpont kiválasztását, ha annak check-in időablaka nyitva van. Azok a szolgálati időpontok, amelyek időablaka jelenleg zárva van, továbbra is megjelennek a [háztartás képernyőn](./household-review.md), de **Lezárva** jelzéssel szerepelnek (például **Lezárva · nyit: V 9:30**), csoportgomb helyett.

Ha a kiválasztott szolgálat összes szolgálati időpontja zárva van, az alkalmazás megmondja, mikor nyit a check-in, például: **„A check-in erre a szolgálatra V 9:30-kor nyit.”** (Ha nem jeleníthető meg nyitási időpont, a következő üzenet jelenik meg: **„A check-in jelenleg nincs nyitva ehhez a szolgálathoz.”**) Koppints a **Vissza** gombra, hogy visszatérj a szolgálatok listájához és másik szolgálatot válassz, vagy várj, amíg az időablak megnyílik, majd próbáld újra.

:::info
A check-in időablakok a szolgálat helyszínének (campus) időzónáját követik. Ha ehhez a helyszínhez nincs időzóna beállítva, a gyülekezeted időzónája használatos. Ha egy szolgálati időpont rossz órakor nyitni látszik, kérd meg az adminisztrátorodat, hogy ellenőrizze az időzónát a helyszín vagy a gyülekezet beállításai között. A háztartás képernyőn a kioszk a táblagép saját óráját is használja a szolgálati időpontok nyitásához és zárásához, ezért győződj meg arról, hogy a táblagép helyes időre és időzónára van állítva.
:::

:::info
A szolgálatokat a gyülekezeted adminisztrátora állítja be a B1 Adminban, az Attendance (Részvétel) részben. Ha nem látod a várt szolgálatot, kérd meg az adminisztrátorodat, hogy ellenőrizze, létrehozták-e a [részvétel beállításában](../../b1-admin/attendance/setup.md).
:::

## Mi történik a háttérben

Amikor kiválasztasz egy szolgálatot, az alkalmazás három dolgot tölt le a szerverről:

- Az adott szolgálathoz tartozó **szolgálati időpontokat** (például egy szolgálatnak lehet 9:00-s és 11:00-s időpontja).
- Az egyes szolgálati időpontokhoz tartozó, elérhető **csoportokat** (például Bölcsőde, Óvoda, Általános iskola).
- A **csoport–szolgálati időpont kapcsolatokat**, amelyek meghatározzák, mely csoportok érhetők el mely időpontokban.

Ezek az adatok helyben gyorsítótárazódnak, így a check-in folyamat többi része gyors és reagálóképes marad.

:::tip
Ha a gyülekezetednél csak egy szolgálat van beállítva, akkor is meg kell koppintanod rajta a folytatáshoz. Az alkalmazás nem választja ki automatikusan az egyetlen szolgálatot.
:::

## Következő lépés

A szolgálat kiválasztása után [telefonszám vagy név alapján kikeresed a családodat](./looking-up-members.md).
