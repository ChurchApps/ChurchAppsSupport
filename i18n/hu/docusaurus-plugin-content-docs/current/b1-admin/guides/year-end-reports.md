---
title: "Útmutató: Éves adománykimutatások készítése"
description: "A B1 Adminban zárja le az év adományrekordjait, ellenőrizze az alapok adózási beállításait, és készítsen adólevonható adománykimutatásokat minden adakozónak."
---

# Éves adománykimutatások készítése

<div class="article-intro">

Ez az útmutató végigvezeti az év végi folyamaton: lezárja az adományrekordokat, ellenőrzi az alapok beállításait, és adólevonható adománykimutatásokat készít minden adakozónak. Ezt általában januárban végzik el az előző naptári évre vonatkozóan.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- B1 Admin-fiók pénzügyi hozzáféréssel
- Az év során rögzített adományok (online a Stripe-on keresztül és/vagy kézzel bevitt adatok)
- Hozzáférés a Stripe-fiókjához, ha online adományokat fogad

</div>

## 1. lépés: Az utolsó Stripe-tranzakciók importálása

Győződjön meg róla, hogy az év végi online adományok mind szerepelnek a rendszerben.

Kövesse a [Stripe-import](../donations/stripe-import.md) útmutatót, amely lépései:

1. Lépjen a Adományok > Stripe-import menüpontra
2. Válasszon egy év végét lefedő dátumtartományt (pl. december 1. – december 31.)
3. Kattintson először az Előnézet gombra az áttekintéshez, majd a Hiányzók importálása gombra a véglegesítéshez

:::warning
Futtassa ezt az importálást, mielőtt kimutatásokat készít. Ami nincs importálva, nem fog megjelenni az adakozói kimutatásokon.
:::

## 2. lépés: Az adományjelentések áttekintése

Mielőtt kimutatásokat készít, ellenőrizze, hogy a rekordok pontosak-e.

Kövesse az [Adományjelentések](../donations/donation-reports.md) útmutatót, amely lépései:

1. Ellenőrizze az egész évre vonatkozó adományösszesítő oldalt
2. Tekintse át az alapok szerinti összegeket, és hasonlítsa össze őket a banki kivonatokkal, hogy kiszűrje az eltéréseket
3. Szükség esetén kattintson az egyes tételekre, hogy ellenőrizze az adakozók szintű részleteket

## 3. lépés: Az alapok adózási státuszának ellenőrzése

Győződjön meg róla, hogy minden alap adólevonhatósági beállítása helyes, hogy a kimutatások pontosak legyenek.

Kövesse az [Alapok](../donations/funds.md) útmutatót, amely lépése:

1. Nyissa meg az egyes alapokat, és erősítse meg, hogy az adólevonhatósági beállítás helyes

:::info
Csak az adólevonhatónak jelölt alapokba érkezett adományok jelennek meg az adakozói kimutatásokon. Ha egy alapnak adólevonhatónak kellene lennie, de nincs annak megjelölve, frissítse, mielőtt kimutatásokat készít.
:::

## 4. lépés: Adakozói kimutatások készítése

Készítse el a hivatalos adakozói kimutatásokat.

Kövesse a [Adakozói kimutatások](../donations/giving-statements.md) útmutatót, amely lépései:

1. Lépjen az **Adományok > Adakozói kimutatások** menüpontra
2. Válassza ki az évet a legördülő menüből, és tekintse át az összesítő statisztikákat
3. Válassza ki a letöltési módot:
   - **ZIP letöltése** — egyedi CSV-fájlok, adakozónként egy
   - **Összes nyomtatása** — nyomtatható nézet, minden kimutatás új oldalon, a tetején az egyházi logójával (ha feltöltött egyet)

:::tip
Készítse el a kimutatásokat januárban, amíg az adatok frissek. Így lesz ideje javítani az esetleges hibákat, mielőtt postázza őket.
:::

## 5. lépés: Kiküldés az adakozóknak

Juttassa el a kimutatásokat az adakozókhoz.

1. Nyomtassa ki és postázza a kimutatásokat, vagy küldje el az egyes CSV-fájlokat e-mailben az adakozóknak
2. A tagok a [B1.church-on vagy a B1 App-ban](../../b1-church/giving/donation-history.md) is megtekinthetik saját adománytörténetüket, és nyomtathatnak kimutatásokat

## Készen van!

Az éves adománykimutatások elkészültek. Az adakozók megkapták adólevonható kimutatásaikat, a pénzügyi nyilvántartások pedig lezárultak az évre.

## Kapcsolódó cikkek

- [Stripe-import](../donations/stripe-import.md) — online tranzakciók importálása
- [Adományjelentések](../donations/donation-reports.md) — adományi trendek és összegek megtekintése
- [Alapok](../donations/funds.md) — alapok és adólevonhatósági beállítások kezelése
- [Adakozói kimutatások](../donations/giving-statements.md) — éves kimutatások készítése
- [Adományok rögzítése](../donations/recording-donations.md) — készpénzes és csekkes adományok kézi bevitele
- [Adománytörténet (webes)](../../b1-church/giving/donation-history.md) — tagok önkiszolgáló nézete
- [Online adakozás beállítása útmutató](./online-giving.md) — a Stripe és az adakozás kezdeti beállítása
