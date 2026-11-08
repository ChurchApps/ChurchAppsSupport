---
title: "Útmutató: Online adakozás beállítása"
description: "Online adakozás beállítása a B1 Adminban: adományozási alapok létrehozása, Stripe csatlakoztatása, és adakozási oldal hozzáadása a B1.church webhelyhez a tagok számára."
---

# Online adakozás beállítása

<div class="article-intro">

Végigvezetjük mindazokon a lépéseken, amelyek szükségesek ahhoz, hogy gyülekezetében online adományokat fogadhasson: az adományozási alapok létrehozásától a Stripe fizetésfeldolgozáshoz való csatlakoztatáson át az adakozási oldal megosztásáig a gyülekezet tagjaival. Mire végez, a tagok a webhelyén és a mobilalkalmazáson keresztül is tudnak majd adakozni.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- B1 Admin fiók adminisztrátori jogosultsággal — lásd: [Szerepkörök és jogosultságok](../people/roles-permissions.md)
- Stripe-fiók (szükség esetén ingyenesen létrehozható a [stripe.com](https://stripe.com) oldalon)

</div>

## 1. lépés: Adományozási alapok létrehozása

Az alapok azok a kategóriák, amelyekre az adakozók adhatnak. Legalább egy alapra van szükség ahhoz, hogy adományokat fogadhasson.

Kövesse az [Alapok](../donations/funds.md) útmutatót az adakozási kategóriák beállításához:

1. Hozza létre a leggyakoribb alapokat (pl. „Általános alap”, „Épületalap”, „Misszió”)
2. Jelölje meg megfelelően az adókedvezményre jogosult alapokat, mert ez befolyásolja az éves adakozási igazolásokat

:::tip
Később is hozzáadhat újabb alapokat. Kezdje a leggyakoribb adakozási kategóriákkal.
:::

## 2. lépés: Stripe csatlakoztatása

A Stripe kezeli az összes fizetési műveletet. Ehhez kapcsolja össze Stripe-fiókját a B1 Adminnal, hogy az adományok a bankszámlájára érkezzenek.

Kövesse az [Online adakozás beállítása](../donations/online-giving-setup.md) útmutatót a Stripe csatlakoztatásához:

1. Jelentkezzen be a Stripe irányítópultjára, és szerezze meg a nyilvános kulcsát (Publishable Key) és a titkos kulcsát (Secret Key)
2. A B1 Adminban lépjen a Beállítások menüpontra, és adja meg mindkét kulcsot

:::warning
A Stripe a titkos kulcsot csak egyszer jeleníti meg. Másolja ki és mentse el, mielőtt elhagyja a Stripe irányítópultját. Ha elveszíti, új kulcsot kell generálnia.
:::

## 3. lépés: Adakozási oldal hozzáadása a webhelyhez

Tegye elérhetővé az adakozást azzal, hogy adakozási oldalt ad hozzá B1 webhelyéhez.

Kövesse az [Online adakozás beállítása](../donations/online-giving-setup.md) és az [Oldalak kezelése](../website/managing-pages.md) útmutatót, hogy:

1. Adjon hozzá egy „Adakozás” lapot a B1.church webhelyéhez
2. Az adakozási cím ez lesz: `https://yoursubdomain.b1.church/donate`
3. A tagok bejelentkezés nélkül is adakozhatnak (nyilvános oldal), vagy bejelentkezhetnek a mentett fizetési módjaikért és adománytörténetükért

## 4. lépés: Próbaadomány küldése

Mielőtt bejelentené gyülekezetének, ellenőrizze, hogy minden működik.

1. Küldjön egy kis próbaadományt, hogy ellenőrizze a folyamat működését az elejétől a végéig
2. Ellenőrizze, hogy az adomány megjelenik-e a B1 Adminban, az Adományok alatt

:::tip
Ha valódi terhelés nélkül szeretné ellenőrizni a működést, először használja a Stripe teszt módját, majd a gyülekezetnek történő bejelentés előtt váltson élő módra.
:::

## 5. lépés: Bejelentés a gyülekezetnek

Terjessze el a hírt, hogy a tagok tudják, online is adakozhatnak.

1. Ossza meg az adakozási címet a webhelyén, e-mail hírlevelekben, a gyülekezeti hírlevelekben és a közösségi médiában
2. A tagok a [B1 App](../../b1-church/giving/index.md) alkalmazáson keresztül is adakozhatnak, mert az adakozási funkció beépítve van

:::info
A bejelentkezett tagok menthetnek fizetési módokat, beállíthatnak ismétlődő adományokat, és megtekinthetik adakozási előzményeiket. Névtelen adakozásra is van lehetőség, bejelentkezés nélkül.
:::

## 6. lépés: Folyamatos kezelés

Tartsa naprakészen az adományi nyilvántartásait, és készítsen jelentéseket az év folyamán.

1. [Importálja a Stripe-tranzakciókat](../donations/stripe-import.md) rendszeresen (hetente vagy havonta), hogy a nyilvántartás naprakész maradjon
2. [Tekintse meg az adománystatisztikákat](../donations/donation-reports.md), hogy nyomon kövesse az adakozási trendeket és az alapok szerinti összegeket
3. [Készítsen éves adakozási igazolásokat](../donations/giving-statements.md) az adakozók adóügyi nyilvántartásához

:::tip
Legalább havonta futtasson Stripe-importálást, hogy a nyilvántartás naprakész maradjon. Az éves teljes folyamatért lásd az [Éves jelentések útmutatót](./year-end-reports.md).
:::

## Készen van!

Gyülekezete mostantól online is fogad adományokat. A tagok a webhelyen, a B1 App alkalmazáson keresztül vagy bármely böngészővel rendelkező eszközön adakozhatnak. Minden adomány automatikusan nyilvántartásba kerül a B1 Adminban.

## Kapcsolódó cikkek

- [Alapok](../donations/funds.md): adakozási kategóriák létrehozása és kezelése
- [Kötegek](../donations/batches.md): adományok csoportokba rendezése
- [Adományok rögzítése](../donations/recording-donations.md): készpénzes és csekkes adományok kézi bevitele
- [Stripe-import](../donations/stripe-import.md): online tranzakciók átvétele a B1 Adminba
- [Adománystatisztikák](../donations/donation-reports.md): adakozási trendek és összegek megtekintése
- [Adakozási igazolások](../donations/giving-statements.md): éves adóügyi igazolások készítése
- [Adakozás](../../b1-church/giving/making-donations.md): a tagok adakozási élménye a B1.church webhelyen és a B1 App alkalmazásban
