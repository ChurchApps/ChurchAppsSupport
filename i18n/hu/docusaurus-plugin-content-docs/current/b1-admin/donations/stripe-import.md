---
title: "Stripe-importálás"
description: "Stripe-adományok importálása a B1 Admin-ba előzetes nézettel, amely minden tételt új, már importált vagy kihagyott állapottal jelöl a véglegesítés előtt."
---

# Stripe-importálás

<div class="article-intro">

Ha online adományokat fogadsz a Stripe-on keresztül, a Stripe-importálás eszközzel ezeket a tranzakciókat átemelheted a B1 Adminba, így az összes adományozási adatod egy helyen lesz. Ez különösen hasznos azoknak a tranzakcióknak a megtalálásához, amelyek nem szinkronizálódtak automatikusan.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- Végezd el az [Online adományozás beállítása](online-giving-setup.md) lépéseit, hogy a Stripe-fiókod csatlakozzon a B1 Adminhoz. A **Stripe-importálás** menüpont és a Kötegek oldalon megjelenő gomb csak akkor látszik, ha a gyülekezeted adománykezelő átjárója a Stripe, és csak azoknak a személyeknek, akik szerkeszthetik az adományokat
- Ellenőrizd, hogy vannak-e adományok a Stripe irányítópultodon a kívánt importálási időszakra

</div>

## Hogyan működik

Az importálás két lépésből áll: először előnézetben megtekintheted, mit importálna a rendszer, majd megerősíted az importálást. Ez a próbafuttatásos megközelítés lehetővé teszi, hogy mindent átnézz, mielőtt bármilyen adat létrejönne.

## Tranzakciók importálása

1. A **B1 Adminban** nyisd meg a **Adományok > Stripe-importálás** menüpontot. (A **Hiányzó Stripe-tranzakciók importálása** gombra is kattinthatsz a **Kötegek** oldal tetején.)
2. Megnyílik a **Stripe-importálás** oldal.
3. Válassz ki egy **dátumtartományt** azokhoz a tranzakciókhoz, amelyeket importálni szeretnél.
4. Kattints az **Előnézet** gombra a próbafuttatás elindításához.

## Az előnézet áttekintése

Az előnézet minden Stripe-tranzakciót megjelenít egy állapotjelzővel együtt:

- **Új** – ez a tranzakció még nincs importálva, és ha folytatod, bekerül az importálásba.
- **Már importálva** – ez a tranzakció már létezik a B1 Adminban, ezért kihagyásra kerül.
- **Kihagyva** – ez a tranzakció más okból lett kizárva (például visszatérítés vagy sikertelen terhelés).

Az oldal tetején lévő összefoglaló szakasz megmutatja az egyes kategóriákba tartozó tranzakciók számát és az érintett összegeket.

:::info
Az előnézeti lépés nem hoz létre semmilyen rekordot. Ez csak olvasható ellenőrzés, hogy a folytatás előtt megnézhesd, mi fog történni.
:::

## Az importálás befejezése

1. Tekintsd át az előnézet eredményeit és az összesítő összegeket.
2. Kattints az **Hiányzók importálása** gombra, hogy importáld az összes **Új** jelölésű tranzakciót.
3. Az importálás befejezése után az egyes tranzakciók melletti állapotjelzők frissülnek, és megmutatják az eredményt.

## Tippek a Stripe-importálás használatához

- Rendszeresen (hetente vagy havonta) futtasd az importálást, hogy a nyilvántartásod naprakész maradjon.
- Ha egy tranzakció **Már importálva** állapotban szerepel, az azt jelenti, hogy a B1 Adminban már van hozzá tartozó rekord, ezért nincs teendő.
- Ha egy adott időszak tranzakcióit keresed, használd a dátumtartomány-szűrőt, hogy arra az időszakra szűkíthesd a találatokat.

:::tip
Az importálás után nyisd meg a [Kötegek](batches.md) oldalt, hogy ellenőrizd, a behozott adományok megfelelően jelennek-e meg, és az összegek egyeznek-e a Stripe irányítópultodon láthatókkal.
:::

## További lépések

- Tekintsd meg a [Adomány-jelentések](donation-reports.md) oldalt, hogy az importált tranzakciókat a többi adományozási adatoddal együtt áttekinthesd
- Győződj meg arról, hogy az importált adományok a megfelelő [alapokhoz](funds.md) vannak rendelve, hogy a [adománykimutatások](giving-statements.md) pontosak legyenek
