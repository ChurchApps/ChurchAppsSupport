---
title: "Részvételi jelentések"
description: "A B1 Admin három részvételi jelentése (Attendance Trend, Group Attendance, Daily Group Attendance), mindegyik tartalma, futtatási és exportálási lépésekkel."
---

# Részvételi jelentések

<div class="article-intro">

A B1 Admin három részvételi jelentést kínál, amelyek segítenek megérteni, hogyan vesznek részt az emberek a szolgálatain és csoportjaiban. Mindegyik jelentés a részvételi adatok más-más nézetét adja, az átfogó tendenciáktól a napi bontásokig.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Győződjön meg róla, hogy a részvételt következetesen [rögzítik](../attendance/tracking-attendance.md) a szolgálatokhoz és csoportokhoz
- Ellenőrizze, hogy a [csoportok](../groups/creating-groups.md) és a szolgálatok be vannak-e állítva a B1 Adminban
- Szükséges hozzá a megfelelő [jogosultság](../settings/roles-permissions.md) a jelentések eléréséhez

</div>

## Részvételi tendencia

A Részvételi tendencia jelentés azt mutatja, hogyan változik a részvétel az idő előrehaladtával a szolgálatain.

1. Böngészőjében nyissa meg közvetlenül a **admin.b1.church/reports/attendanceTrend** címet (a jelentéseknek nincs bejegyzésük a navigációs menüben, ezért a cím könyvjelzőzése a legegyszerűbb módja a visszatérésnek). Ugyanez a jelentés a Részvétel oldalon is megtalálható: kattintson az **Összes év** gombra, majd válassza a **Részvételi tendencia** fület.
2. Opcionálisan válasszon **kampuszt**, **szolgálatot**, **szolgálati időpontot** vagy **csoportot** az eredmények szűréséhez.
3. Állítsa be a **Kezdő dátumot** és a **Záró dátumot**. Alapértelmezés szerint a jelentés az elmúlt egy évet fedi le, egy évvel ezelőttől a mai napig, és a záró dátum teljes egészében beleszámít. Kattintson a **Jelentés futtatása** gombra.
4. A jelentés hetenkénti oszlopdiagramot és táblázatot jelenít meg a látogatások összesített számáról. Minden hét az adott hét vasárnapjának dátumával van megjelölve, a táblázat **Szolgálati dátumok** oszlopa pedig felsorolja az adott héten részvétellel rendelkező tényleges dátumokat (például „9/27, 9/30”).

Ez a jelentés hasznos olyan minták felismeréséhez, mint a szezonális visszaesések, a növekedési tendenciák vagy a speciális események hatása.

## Csoportos részvétel

A Csoportos részvétel jelentés megmutatja, kik vettek részt az egyes csoportüléseken egy adott dátumtartományban.

1. Böngészőjében nyissa meg közvetlenül a **admin.b1.church/reports/groupAttendance** címet, vagy a Részvétel oldalon kattintson az **Összes év** gombra, és válassza a **Csoportos részvétel** fület.
2. Opcionálisan válasszon **kampuszt** és **szolgálatot**.
3. Állítsa be a **Kezdő dátumot** és a **Záró dátumot**. Alapértelmezés szerint a jelentés az utolsó vasárnaptól a mai napig terjed, a záró dátum teljes egészében beleszámít.
4. Kattintson a **Jelentés futtatása** gombra.

Az eredmények ülésdátum szerint csoportosítva jelennek meg, majd szolgálati időpont, majd csoport szerint, és minden csoport alatt felsorolják a résztvevőket. A szolgálati időpontok, a csoportok és a nevek ábécé szerint vannak rendezve. Minden személy neve mellett a **Bejelentkezve** oszlop mutatja azt az időpontot, amikor a részvételét rögzítették (üres, ha nincs időpont rögzítve), a **Tagsági státusz** oszlop pedig az állapotát, például Tag vagy Látogató. Azok a csoportüléseit is tartalmazza, amelyek nem szolgálati időponthoz kapcsolódnak; ezek szolgálati időpont nélkül jelennek meg.

Táblázatkezelő letöltéséhez kattintson a **Letöltési lehetőségek** gombra, és válassza az **Összefoglaló** lehetőséget. A CSV fájl a következőket tartalmazza:

- Soronként egy tagot minden olyan csoportból, amely a dátumtartományban ülésezett, csoport, majd név szerint rendezve.
- A személy neve és a csoport neve az első oszlopokban.
- Egy-egy oszlop minden dátumozott üléshez, amelyet a szolgálat, a szolgálati időpont és a dátum nevez meg (például „Vasárnap - 9:00 AM (2026-09-27)”), és minden személy mellett **jelen** vagy **hiányzott** jelölés áll. Szolgálati időpont nélküli ülés nevét csak a dátuma adja.

Ezt a jelentést a csoportok részvételének összehasonlítására és azon csoportok azonosítására használja, amelyek növekednek, vagy figyelmet igényelnek.

## Napi csoportos részvétel

A Napi csoportos részvétel jelentés (címe **Csoportos részvétel napok szerint**) napról napra megadja, hány ember vett részt egy csoportban.

1. Böngészőjében nyissa meg közvetlenül a **admin.b1.church/reports/dailyGroupAttendance** címet.
2. A **Kampusz**, **Szolgálat** és **Szolgálati időpont** legördülő menükkel szűkítse a listát, majd válassza ki a megtekinteni kívánt **Csoportot**.
3. Futtassa a jelentést. Ez minden olyan napot felsorol, amikor a csoport ülésezett, a legrégebbitől a legújabbig, a **Dátum** és a aznap rögzített **Résztvevők** számával.

Ez a jelentés részletes információt nyújt, amely segít megérteni a hétről hétre történő ingadozásokat, vagy azonosítani azokat a konkrét napokat, amikor a részvétel szokatlanul magas vagy alacsony volt.

:::tip
Használja a Részvételi tendencia jelentést az átfogó áttekintéshez, a Napi csoportos részvétel jelentést pedig akkor, ha konkrét dátumokat szeretne részletesen megvizsgálni.
:::

## Gyakorlati felhasználás

- **Tervezés** -- Használja a részvételi tendenciákat a közelgő szolgálatok ültetésének, személyzetének és erőforrásainak tervezéséhez.
- **Elérés** -- Korán azonosítsa a csökkenő részvételi mintákat, hogy követni tudja a tagokat.
- **Testületi jelentések** -- Foglalja bele a részvételi adatokat a rendszeres vezetői jelentésekbe, hogy bemutassa a szolgálat egészségi állapotát.
- **Esemény-értékelés** -- Hasonlítsa össze a részvételt a speciális események előtt és után, hogy mérni tudja a hatásukat.

:::warning
A részvételi adatok a csoportok és szolgálatok bejelentkezési folyamatain keresztül rögzítődnek. Ha a részvétel nincs következetesen rögzítve, a jelentések nem fogják pontosan tükrözni a tényleges részvételt. A beállítási útmutatóért lásd: [A részvétel rögzítése](../attendance/tracking-attendance.md).
:::
