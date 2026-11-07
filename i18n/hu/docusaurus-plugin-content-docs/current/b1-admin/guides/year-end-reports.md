---
title: "Útmutató: Éves adományozási jelentések készítése"
description: "Az év adományrekordjainak lezárása a B1 Admin-ban, alapok adóbeállításainak ellenőrzése, és adólevonható adománykimutatások készítése minden adakozónak."
---

# Éves adományozási jelentések készítése

<div class="article-intro">

Ez a útmutató végigvezeti az éves folyamaton: az adományi nyilvántartások lezárása, az alapok adóbeállításainak ellenőrzése, valamint minden adományozónak szóló, adólevonható adományigazolás elkészítése. Ezt általában januárban végzik az előző naptári évre vonatkozóan.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- B1 Admin-fiók pénzügyi hozzáféréssel
- Az év során rögzített adományok (online a Stripe-on keresztül és/vagy kézzel bevitt adatok)
- Hozzáférés a Stripe-fiókjához, ha online adományokat fogad

</div>

## 1. lépés: Az utolsó Stripe-tranzakciók importálása

Győződjön meg arról, hogy az év végi összes online adomány szerepel a rendszerben.

Kövesse a [Stripe-import](../donations/stripe-import.md) útmutatót, hogy:

1. Megnyissa az Adományok > Stripe-import menüpontot
2. Kiválasszon egy dátumtartományt, amely az év végét lefedi (pl. december 1. – december 31.)
3. Először kattintson az Előnézet gombra az áttekintéshez, majd a Hiányzók importálása gombra a véglegesítéshez

:::warning
Ezt az importálást a kimutatások készítése előtt futtassa. Az az összes tranzakció, amelyet nem importált, nem fog megjelenni az adományozói igazolásokon.
:::

## 2. lépés: Az adománykimutatások áttekintése

Ellenőrizze, hogy a nyilvántartások pontosak-e, mielőtt elkészítené az igazolásokat.

Kövesse az [Adománykimutatások](../donations/donation-reports.md) útmutatót, hogy:

1. Ellenőrizze az éves összesítő oldalt
2. Áttekintse az alapok szerinti összegeket, és hasonlítsa össze őket a banki kivonatokkal, hogy felfedezze az esetleges eltéréseket
3. Szükség esetén kattintson egyes tételekre, hogy ellenőrizze az adományozói részleteket

## 3. lépés: Az alapok adóstátuszának ellenőrzése

Győződjön meg arról, hogy minden alap adólevonhatósági beállítása helyes, hogy az igazolások pontosak legyenek.

Kövesse a [Alapok](../donations/funds.md) útmutatót, hogy:

1. Megnyisson minden alapot, és ellenőrizze, hogy az adólevonhatósági beállítás helyes-e

:::info
Csak az adólevonhatónak megjelölt alapokba érkezett adományok jelennek meg az adományozói igazolásokon. Ha egy alapnak adólevonhatónak kellene lennie, de nincs annak megjelölve, frissítse, mielőtt elkészíti az igazolásokat.
:::

## 4. lépés: Adományozói igazolások készítése

Készítse el a hivatalos adományozói igazolásokat.

Kövesse a [Adományozói igazolások](../donations/giving-statements.md) útmutatót, hogy:

1. Lépjen a **Adományok > Adományozói igazolások** menüpontra
2. Válassza ki az évet a legördülő menüből, és tekintse át az összesítő statisztikákat
3. Válassza ki a letöltési módot:
   - **ZIP letöltése** — egyedi CSV-fájlok, adományozónként egy
   - **Összes nyomtatása** — nyomtatható nézet, minden igazolás új oldalon, a tetején az Ön egyházi logójával (ha feltöltött egyet)

:::tip
Készítse el az igazolásokat januárban, amíg az adatok frissek. Így lesz ideje megoldani az esetleges problémákat, mielőtt postázza őket.
:::

## 5. lépés: Eljuttatás az adományozókhoz

Juttassa el az igazolásokat az adományozókhoz.

1. Nyomtassa ki és postázza az igazolásokat, vagy küldje el az egyes CSV-fájlokat e-mailben az adományozóknak
2. A tagok a [B1.church](../../b1-church/giving/donation-history.md) oldalon és a [B1 Mobile alkalmazásban](../../b1-church/giving/donation-history.md) is megtekinthetik saját adománytörténetüket, és nyomtathatnak igazolásokat

## Készen van!

Az éves adományozási jelentései elkészültek. Az adományozók megkapták adólevonható igazolásaikat, az Ön pénzügyi nyilvántartásai pedig lezárultak az évre.

## Kapcsolódó cikkek

- [Stripe-import](../donations/stripe-import.md) — online tranzakciók importálása
- [Adománykimutatások](../donations/donation-reports.md) — adományozási trendek és összegek megtekintése
- [Alapok](../donations/funds.md) — alapok és adólevonhatósági beállítások kezelése
- [Adományozói igazolások](../donations/giving-statements.md) — éves igazolások készítése
- [Adományok rögzítése](../donations/recording-donations.md) — készpénzes és csekkes adományok kézi rögzítése
- [Adománytörténet (web)](../../b1-church/giving/donation-history.md) — a tagok önkiszolgáló nézete
- [Online adakozás beállítása útmutató](./online-giving.md) — a Stripe és az adakozás kezdeti beállítása
