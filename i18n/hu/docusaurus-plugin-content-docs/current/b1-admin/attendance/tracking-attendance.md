---
title: "Részvétel követése"
---

# Részvétel követése

<div class="article-intro">

Miután beállította a campusait, istentiszteleti időpontjait és csoportjait, a B1 Admin segítségével könnyen áttekintheti a részvételi adatokat és felismerheti a trendeket. A Részvétel oldal a heti részvétel összefoglalójával nyílik meg, az **Összes év** jelentései pedig két fő nézetet kínálnak: a **Részvételi trend** fület a gyülekezet egész területére kiterjedő trendekhez, a **Csoportos részvétel** fület pedig a csoportszintű részletekhez. Ezekkel az eszközökkel megértheti a növekedési mintákat, felismerheti a csökkenő aktivitást, és adatokra alapozott döntéseket hozhat a gyülekezete számára.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A részvételi struktúrának legalább egy campusból és egy istentiszteleti időpontból kell állnia. Ha még nem tette meg, olvassa el a [Részvétel beállítása](setup.md) oldalt.
- A jelentések csak akkor mutatnak eredményeket, ha már rögzítve vannak részvételi adatok. Az adatok származhatnak [kézi bevitelből](recording-attendance.md) vagy [önellenőrzésből](check-in.md).

</div>

## Részvételi trendek megtekintése

1. Nyissa meg a **B1 Admin** alkalmazást, nyissa meg a [Ugrás menü](../introduction.md#getting-around-with-the-jump-menu) elemet (a bal felső sarokban lévő keresősávot), bontsa ki a **Emberek** menüpontot, majd kattintson a **Részvétel** elemre.
2. Kattintson a bal oldali oszlopban az **Összes év** elemre. Alapértelmezés szerint a **Részvételi trend** fül van kiválasztva.
3. A jelentés automatikusan lefut, amikor a fül megnyílik, és minden hétre megjeleníti a teljes részvételt.

:::tip
Az aktuális hét gyors áttekintéséhez a Részvétel főoldal megmutatja, hány ember van jelen ezen a héten, bontásban termenként (csoportonként), a vendégek számát, valamint egy 13 hetes oszlopdiagramot a bejelentkezésekről. Ehhez nincs szükség jelentésre.
:::

## Az adatok szűrése

A **Jelentés szűrése** mezőben található szűrőkkel szűkítheti az eredményeket, majd kattintson a **Jelentés futtatása** gombra:

- **Campus** – válasszon egy campust, ha csak az adott helyszín részvételét szeretné látni.
- **Istentisztelet** – korlátozza a jelentést egyetlen istentiszteletre.
- **Időpont** – válasszon egy időpontot, ha egy adott alkalomra szeretne részletesebben rászűrni.
- **Csoport** – egyetlen csoport részvételének megjelenítése.
- **Kezdő dátum** és **Záró dátum** – a belefoglalandó dátumtartomány. Alapértelmezés szerint a jelentés az elmúlt évet fedi le, egy évvel ezelőttől a mai napig, a záró dátum pedig teljes egészében benne van.

A jelentés egy oszlopdiagramot és egy táblázatot mutat, amely hetenként a látogatások összesített számát tartalmazza. Minden hét a hét vasárnapjának dátumával van megjelölve. A táblázatban van egy **Alkalmak dátumai** oszlop is, amely felsorolja azokat a konkrét dátumokat abban a hétben, amelyeken volt részvétel (például „9/27, 9/30”). Így láthatja, mikor számít egy hétközi alkalom ugyanabba a hétbe, mint a vasárnapi istentisztelet.

:::info
A jelentések minden alkalommal automatikusan lefutnak, amikor megnyitja a Részvételi trend fület, így mindig a legfrissebb számokat látja, frissítő gomb megnyomása nélkül.
:::

## Csoportos részvétel

A **Csoportos részvétel** fül azt mutatja, ki vett részt az egyes csoportalkalmakon. Ez akkor hasznos, ha egy adott osztályt, szolgálati csapatot vagy kiscsoportot szeretne figyelemmel kísérni, nem pedig az általános istentiszteleti számokat.

1. Az **Összes év** jelentéseknél válassza a **Csoportos részvétel** fület.
2. Opcionálisan válasszon egy **Campust** és egy **Istentiszteletet**.
3. Állítsa be a **Kezdő dátumot** és a **Záró dátumot**. Alapértelmezés szerint a jelentés az előző vasárnaptól a mai napig tart.
4. Kattintson a **Jelentés futtatása** gombra.

Az eredmények alkalom dátuma szerint csoportosulnak, majd istentiszteleti időpont és csoport szerint, a csoportok alatt pedig felsorolják a résztvevőket. Az istentiszteleti időpontok, csoportok és nevek ábécé szerint vannak rendezve, így minden címsor csak egyszer jelenik meg. Minden személy sorában látható egy **Bejelentkezve** oszlop is, amely azt az időpontot mutatja, amikor a részvételét rögzítették (üres, ha nincs időpont az adatok között), valamint egy **Tagsági státusz** oszlop (például Tag vagy Látogató), így egy pillantással felismerheti a vendégeket.

Az adatok letöltéséhez kattintson a **Letöltési beállítások** gombra, és válassza az **Összefoglaló** lehetőséget. A CSV fájlban minden csoporttag egy sort kap, csoport, majd név szerint rendezve, és minden dátumozott alkalomhoz tartozik egy oszlop a megadott tartományban (például „Vasárnap - 9:00 (2026-09-27)”), amely **jelen** vagy **hiányzik** értéket kap.

:::tip
A csoportos részvétel különösen hasznos a [kiscsoport](../groups/creating-groups.md) vezetői számára, akik időről időre nyomon szeretnék követni a csoportjuk aktivitását.
:::

## Tippek a részvételi adatok használatához

- Havonta tekintse át a trendeket, hogy időben felismerje az idényszerű mintázatokat.
- Hasonlítsa össze a campusszintű adatokat, hogy megtudja, mely helyszínek növekednek.
- Használja a csoportszintű jelentéseket, hogy utánakövessen azoknak a [csoportoknak](../groups/group-members.md), ahol csökken a részvétel.
- Kombinálja a részvételi adatokat az [AI-keresés](../people/ai-search.md) eszközzel, hogy megtalálja azokat, akik mostanában nem jártak el.

## Kapcsolódó oldalak

- [Részvétel rögzítése](recording-attendance.md) – részvétel kézi bevitele egy csoportalkalomhoz
- [Létszámbevitel és trend](headcount-entry.md) – egyszerűbb, összesített létszám-alternatíva, saját heti trendgrafikonnal
- [Bejelentkezés](check-in.md) – önellenőrzés beállítása, hogy a részvétel automatikusan rögzüljön
