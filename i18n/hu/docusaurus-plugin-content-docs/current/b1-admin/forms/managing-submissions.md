---
title: "Űrlapbeküldések kezelése"
description: "Űrlapbeküldések áttekintése, nyomtatása és átrendelése a B1 Admin-ban, a válaszok megfelelő személyhez juttatása, látogatói kártyák és imakérések követése."
---

# Űrlapbeküldések kezelése

<div class="article-intro">

Amint az űrlap élesítésre kerül, megérkeznek a beküldések. A **Form Submissions** lap segítségével áttekintheti az összes választ, nyomon követheti, ki küldött be választ, és az adatok alapján időben kapcsolatba léphet a gyülekezetével.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- [Hozzon létre egy űrlapot](./creating-forms.md) legalább egy kérdéssel
- Ossza meg az űrlapot a nyilvános URL-jén keresztül, vagy ágyazza be a [weboldalába](../website/managing-pages.md)

</div>

## A beküldések megtekintése

1. Nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a B1 Admin bal felső sarkában), bontsa ki a **People** menüt, majd kattintson a **Forms** elemre.
2. Kattintson arra az űrlapra, amelyet át szeretne nézni.
3. Lépjen a **Form Submissions** lapra.

Megjelenik egy lista az adott űrlapra érkezett összes válaszról. Minden beküldésnél láthatók a válaszadó adatai és a beküldés dátuma, ezt követi az űrlap minden kérdéséhez tartozó oszlop. Ha az űrlapnak sok kérdése van, görgessen oldalirányban a táblázatban a többi oszlop megtekintéséhez.

## Egyes beküldések áttekintése

Kattintson bármelyik beküldésre a teljes részletek megtekintéséhez. Látni fogja a személy által az űrlap minden kérdésére adott összes választ.

Kattintson a beküldés melletti **nyomtatás ikonra**, hogy kinyomtassa az illető kitöltött válaszait. Ez hasznos papíralapú iratokhoz vagy aláírt nyilatkozatokhoz, amelyeket kéznél kell tartania. A nyomtatványon a gyülekezete logója (a **Világos hátterű logó** a [Weboldal > Megjelenés](../website/appearance.md) menüpontból, ha feltöltött egyet) jelenik meg középen a lap tetején, alatta a gyülekezet nevével. A nyomtatványok mindig sötét szövegű, fehér alapú oldalként készülnek, még akkor is, ha sötét módban használja a B1 Admint. Ez különbözik az [üres űrlap nyomtatásától](./creating-forms.md#printing-a-blank-form), mert itt egy személy már beküldött válaszait nyomtatja ki, nem egy üres példányt. Ugyanez a nyomtatás ikon minden olyan helyen megjelenik, ahol beküldés látható, beleértve a [személy profilját](../people/adding-people.md#working-with-forms) is.

## A beküldéshez tartozó személy módosítása

Ha egy beküldés rossz személyhez van rendelve (például két családtag ugyanazt az e-mail-címet használja), áthelyezheti a megfelelő személyhez, vagy leválaszthatja.

1. A **Form Submissions** lapon kattintson a személy neve melletti **Személy módosítása** ikonra (két nyíl). Ugyanez az ikon megjelenik a beküldés mellett a [személy profilján](../people/adding-people.md#working-with-forms) is.
2. A **Személy módosítása** párbeszédablakban keresse meg a megfelelő személyt, majd kattintson a **Áthelyezés ehhez a személyhez** gombra.
3. Vagy kattintson a **Leválasztás (Névtelen)** gombra, hogy a beküldést leválassza bármelyik személyről. Ezután a **Névtelen** megjelöléssel szerepel.

Csak a hozzárendelés változik. A válaszok nem módosulnak, és nem küldünk újra visszaigazoló e-maileket.

:::info
Azokon az űrlapokon, amelyek személyi rekordot hoznak létre, ha valaki a gyülekezete weboldalán bejelentkezve küldi be az űrlapot, a beküldés a saját rekordjához kapcsolódik, még akkor is, ha egy másik személy az adatbázisban ugyanazt az e-mail-címet használja. Amikor [két személyi rekordot egyesít](../people/adding-people.md), az eltávolított személy űrlapbeküldései a megtartott személyhez kerülnek.
:::

## Hogyan érkeznek a beküldések

A beküldések több csatornán keresztül érkezhetnek:

- **Nyilvános URL** -- Ha az űrlapnak van nyilvános URL-je (önálló űrlapok), bárki, akinek megvan a link, küldhet választ. Ossza meg az URL-t e-mailben, közösségi médiában vagy SMS-ben.
- **Weboldalba ágyazva** -- A B1 weboldalába ágyazott űrlapok automatikusan gyűjtik a beküldéseket, amikor a látogatók kitöltik azokat.
- **Belső használat** -- A munkatársak és önkéntesek a B1 Adminon belül közvetlenül, mások nevében is beküldhetnek űrlapokat.

:::tip
Rendszeresen nézze meg a **Form Submissions** lapot az olyan űrlapok esetében, mint a látogatói kártyák vagy az imakérések, hogy időben tudjon reagálni.
:::

## A beküldési adatok felhasználása

Az űrlapokon gyűjtött adatok segíthetnek abban, hogy:

- nyomon kövesse az eseményekre történő regisztrációkat, és ennek megfelelően tervezzen
- kapcsolatba lépjen a látogatókkal vagy új tagokkal
- felmérési visszajelzéseket gyűjtsön a szolgálat tervezéséhez
- kezelje az események vagy programok befizetéseit

:::info
Az **Admin** vagy **Csak megtekintés** szerepkörrel rendelkező űrlaptagok férhetnek hozzá a **Form Submissions** laphoz. A **Form Members** lapon történő szerepkörkezeléssel gondoskodjon arról, hogy a csapat megfelelő tagjai hozzáférjenek a szükséges űrlapokhoz.
:::

:::info
Ha egy önálló űrlap [csoporthoz van kapcsolva](./creating-forms.md#linking-a-form-to-a-group), a csoport vezetői a B1.church csoportoldalukon olvashatják és nyomtathatják annak beküldéseit, anélkül hogy űrlaptagok lennének. A vezetők ott az eseményeik regisztrációs kérdéseire adott válaszokat is megtekinthetik. Lásd: [Csoport részletei](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Ha egy **Stand Alone** (önálló) űrlap személyi rekord létrehozására van beállítva, a meglévő személyhez illeszkedő beküldések a People felület adott személyének oldalán a **Forms** (Űrlapok) részben is megjelennek, nemcsak a People típusú űrlapok esetében.
:::

## Következő lépések

- Ismerje meg, hogyan készíthet és szabhatja testre az űrlapokat az [Űrlapok létrehozása](./creating-forms.md) oldalon
- Adja hozzá az űrlapbeküldések személyeit a [személyzeti névjegyzékhez](../people/adding-people.md), a folyamatos nyomon követés érdekében
- [Kapcsoljon egy űrlapot csoporthoz](./creating-forms.md#linking-a-form-to-a-group), hogy a vezetői elolvashassák a válaszokat, vagy [automatikusan adja hozzá a beküldőket a csoporthoz](./creating-forms.md#automatically-adding-submitters-to-a-group), hogy egy önálló jelentkezési űrlap saját névsort építhessen
