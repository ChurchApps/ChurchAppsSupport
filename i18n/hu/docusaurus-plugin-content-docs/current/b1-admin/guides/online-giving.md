---
title: "Útmutató: Online adományozás beállítása"
---

# Online adományozás beállítása

<div class="article-intro">

Ebben az útmutatóban végigvesszük mindazt, ami ahhoz szükséges, hogy a gyülekezete online adományokat fogadhasson: az adományalapok létrehozásától a Stripe fizetésfeldolgozás csatlakoztatásán át az adományozási oldal megosztásáig a gyülekezettel. A végére a tagok a weboldalukon és a mobilalkalmazáson keresztül is tudnak majd adakozni.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- B1 Admin fiók adminisztrátori hozzáféréssel – lásd: [Szerepkörök és jogosultságok](../people/roles-permissions.md)
- Stripe-fiók (szükség esetén ingyenesen létrehozható a [stripe.com](https://stripe.com) oldalon)

</div>

## 1. lépés: Adományalapok létrehozása

Az alapok azok a kategóriák, amelyekre az adományozók adakozhatnak. Legalább egy alapra van szükség ahhoz, hogy adományokat fogadhasson.

Kövesse az [Alapok](../donations/funds.md) útmutatóban leírtakat az adományozási kategóriák beállításához:

1. Hozza létre a leggyakoribb alapokat (például „Általános alap”, „Épületalap”, „Misszió”)
2. Jelölje meg megfelelően az adókedvezményre jogosult alapokat – ez befolyásolja az évvégi adománykimutatásokat

:::tip
Később bármikor hozzáadhat további alapokat. Kezdje a leggyakoribb adományozási kategóriákkal.
:::

## 2. lépés: Stripe csatlakoztatása

A Stripe kezeli a teljes fizetésfeldolgozást. Stripe-fiókját a B1 Adminhoz kell csatlakoztatnia, hogy az adományok a gyülekezet bankszámlájára érkezzenek.

Kövesse az [Online adományozás beállítása](../donations/online-giving-setup.md) útmutatót a Stripe csatlakoztatásához:

1. Jelentkezzen be a Stripe irányítópultjára, és szerezze meg a nyilvános kulcsot (Publishable Key) és a titkos kulcsot (Secret Key)
2. A B1 Adminban lépjen a Beállítások menübe, és adja meg mindkét kulcsot

:::warning
A Stripe a titkos kulcsot csak egyszer jeleníti meg. Másolja ki és mentse el, mielőtt elhagyja a Stripe irányítópultját. Ha elveszíti, új kulcsot kell generálnia.
:::

## 3. lépés: Adományozási oldal hozzáadása a weboldalhoz

Tegye könnyen elérhetővé az adakozást azzal, hogy adományozási oldalt ad a B1 weboldalához.

Kövesse az [Online adományozás beállítása](../donations/online-giving-setup.md) és az [Oldalak kezelése](../website/managing-pages.md) útmutatókat, hogy:

1. Adjon hozzá egy „Adakozás” fület a B1.church oldalán
2. Az adományozási webcím ez lesz: `https://yoursubdomain.b1.church/donate`
3. A tagok bejelentkezés nélkül is adakozhatnak (nyilvános oldal), vagy bejelentkezhetnek a mentett fizetési módokhoz és az adománytörténethez

## 4. lépés: Próbaadomány küldése

Mielőtt bejelentené a gyülekezetnek, ellenőrizze, hogy minden működik.

1. Küldjön egy kis összegű próbaadományt, hogy ellenőrizze a teljes folyamatot
2. Ellenőrizze, hogy az adomány megjelenik-e a B1 Adminban, az Adományok alatt

:::tip
Ha valós terhelés nélkül szeretné ellenőrizni a működést, először használja a Stripe tesztmódját, majd a gyülekezet értesítése előtt váltson éles módra.
:::

## 5. lépés: Bejelentés a gyülekezetnek

Hírdesse meg, hogy a tagok tudjanak online adakozni.

1. Ossza meg az adományozási webcímet a weboldalán, e-mail hírlevelekben, hirdetőlapokon és a közösségi médiában
2. A tagok a [B1 Mobile alkalmazáson](../../b1-mobile/giving/) keresztül is adakozhatnak – az adományozási funkció beépítve megtalálható

:::info
A bejelentkezett tagok menthetik fizetési módjaikat, beállíthatnak ismétlődő adományokat, és megtekinthetik adománytörténetüket. Bejelentkezés nélküli, névtelen adakozásra is van lehetőség.
:::

## 6. lépés: Folyamatos kezelés

Tartsa naprakészen az adományi nyilvántartásokat, és az év során készítsen jelentéseket.

1. [Importálja a Stripe-tranzakciókat](../donations/stripe-import.md) rendszeresen (hetente vagy havonta), hogy a nyilvántartások naprakészek maradjanak
2. [Tekintse meg az adományjelentéseket](../donations/donation-reports.md), hogy nyomon kövesse az adakozási tendenciákat és az alapok szerinti összegeket
3. [Készítsen évvégi adománykimutatásokat](../donations/giving-statements.md) az adományozók adóügyi nyilvántartásához

:::tip
Legalább havonta futtassa a Stripe-importot, hogy a nyilvántartások naprakészek maradjanak. Az évvégi teljes folyamatért lásd: [Évvégi jelentések útmutató](./year-end-reports.md).
:::

## Kész!

A gyülekezete mostantól fogad online adományokat. A tagok a weboldalon, a B1 Mobile alkalmazáson vagy bármely webböngészővel rendelkező eszközön adakozhatnak. Minden adomány automatikusan rögzítésre kerül a B1 Adminban.

## Kapcsolódó cikkek

- [Alapok](../donations/funds.md) – adományozási kategóriák létrehozása és kezelése
- [Kötegek](../donations/batches.md) – adományok csoportokba rendezése
- [Adományok rögzítése](../donations/recording-donations.md) – készpénzes és csekkes adományok kézi rögzítése
- [Stripe-import](../donations/stripe-import.md) – online tranzakciók behúzása a B1 Adminba
- [Adományjelentések](../donations/donation-reports.md) – adakozási tendenciák és összegek megtekintése
- [Adománykimutatások](../donations/giving-statements.md) – évvégi adóügyi kimutatások készítése
- [Adakozás (webes)](../../b1-church/giving/making-donations.md) – a tagok adakozási élménye
- [Adakozás (mobil)](../../b1-mobile/giving/making-donations.md) – adakozás a mobilalkalmazásból
