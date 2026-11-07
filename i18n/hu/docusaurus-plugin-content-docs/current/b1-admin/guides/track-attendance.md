---
title: "Útmutató: Gyülekezeti látogatottság nyomon követése"
---

# Gyülekezeti látogatottság nyomon követése

<div class="article-intro">

Állítsa be a látogatottság nyomon követését az istentiszteletekhez és csoportokhoz: a telephelyek és istentiszteleti időpontok beállításától kezdve a részvétel kézi rögzítésén vagy az önkiszolgáló bejelentkező alkalmazáson át a trendek megtekintéséig a jelentésekben. A végére teljes képe lesz arról, hogy ki és mikor vesz részt.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Adminisztrátori hozzáféréssel rendelkező B1 Admin fiók
- [Az Ön névjegyzékéhez adott személyek](../people/adding-people.md)
- [Létrehozott csoportok](../groups/creating-groups.md) azokhoz a szolgálatokhoz, amelyeket nyomon szeretne követni

</div>

## 1. lépés: Telephelyek és istentiszteletek beállítása

Határozza meg, hol és mikor gyűlekezik a gyülekezete.

Kövesse a [Látogatottság beállítása](../attendance/setup.md) útmutatót, hogy:

1. Hozzáadja a telephelyét (pl. „Fő telephely”)
2. Hozzáadja az istentiszteleti időpontokat (pl. „Vasárnap 9:00”, „Vasárnap 11:00”, „Szerda 19:00”)
3. Minden istentiszteleti időponthoz csoportokat rendel, hogy meghatározza, mely osztályok és szolgálatok tartoznak az adott alkalomhoz

## 2. lépés: A csoportok látogatottság-követésének engedélyezése

Kapcsolja be a látogatottság követését a figyelni kívánt csoportokhoz.

Kövesse a [Csoportok létrehozása](../groups/creating-groups.md) útmutatót, hogy:

1. Szerkessze az egyes követni kívánt csoportokat, és kapcsolja be a „Látogatottság követése” opciót
2. Társítsa a csoportokat istentiszteleti időpontokhoz, hogy a látogatottság a megfelelő alkalomhoz legyen rögzítve

:::info
Nem minden csoportnak szüksége van látogatottság-követésre. Engedélyezze azokhoz a csoportokhoz, ahol nyomon szeretné követni a részvételt: gyermekórák, kiscsoportok, vasárnapi iskola stb.
:::

## 3. lépés: A látogatottság kézi rögzítése

Jelölje be, ki vett részt az egyes istentiszteleteken és csoportokban.

Kövesse a [Látogatottság rögzítése](../attendance/recording-attendance.md) útmutatót, hogy:

1. Megnyit egy csoportot, a **Alkalmak** szakaszában kattint az **Összes alkalom** gombra, majd új alkalmat ad hozzá a dátumhoz és istentiszteleti időponthoz. Jelölje be a **Hozzáadás a többi csoportnak is** opciót, hogy egyszerre hozzon létre alkalmakat az adott istentiszteleti időponthoz tartozó összes osztálynak.
2. Jelölje be, ki vett részt az egyes csoportokban

:::tip
A kézi követés kiválóan működik felnőtt istentiszteleteknél, kiscsoportoknál, és minden olyan helyzetben, ahol a bejelentkező kiosk nem praktikus.
:::

## 4. lépés: Önbejelentkezés beállítása (opcionális)

Lehetővé teszi a tagok számára, hogy táblagépes kiosztól önmaguk jelentkezzenek be.

Kövesse a [Bejelentkezés](../attendance/check-in.md) útmutatót, hogy:

1. Telepítse a B1 Checkin alkalmazást egy táblagépre az önkiszolgáló bejelentkezéshez
2. A tagok keressenek rá a nevükre, és jelentkezzenek be saját maguk és családtagjaik számára
3. A bejelentkezési rekordok a kézzel rögzítettek mellett jelennek meg, az adatokban nincs különbség

:::info
A teljes gyermekszolgálati beállításhoz, beleértve a hardvert és a nyomtató konfigurációját, lásd a [Gyermekbejelentkezési útmutatót](./childrens-checkin.md).
:::

## 5. lépés: Látogatottsági jelentések megtekintése

Tekintse át a részvétel átfogó képét a gyülekezetben.

Kövesse a [Látogatottsági jelentések](../reports/attendance-reports.md) útmutatót. Három jelentésnézet érhető el:

1. **Látogatottsági trend** — a látogatottság alakulása időben, a növekedés vagy csökkenés felismeréséhez
2. **Csoportos látogatottság** — ki vett részt az egyes csoportalkalmakon a megadott dátumtartományban, CSV letöltési lehetőséggel
3. **Napi csoportos látogatottság** — napi bontás a részletes elemzéshez

:::info
A jelentések a kézzel rögzített és az önbejelentkezéses látogatottságot egyaránt tartalmazzák. Az adatok megjelenése nem különbözik — mindkét módszer ugyanabba a jelentésbe kerül.
:::

## Kész!

A látogatottság-követés be van állítva. Akár kézzel rögzíti a látogatottságot, akár a bejelentkező alkalmazást használja, akár mindkettőt — minden adat ugyanabba a jelentésbe kerül, így világos képe lesz a gyülekezete részvételéről.

## Kapcsolódó cikkek

- [Látogatottság beállítása](../attendance/setup.md) — telephelyek és istentiszteletek konfigurálása
- [Látogatottság rögzítése](../attendance/recording-attendance.md) — látogatottság kézi rögzítése
- [Látogatottság nyomon követése](../attendance/tracking-attendance.md) — látogatottsági trendek áttekintése
- [Bejelentkezés](../attendance/check-in.md) — önkiszolgáló bejelentkező alkalmazás
- [Csoportok létrehozása](../groups/creating-groups.md) — csoportok beállítása látogatottság-követéssel
- [Látogatottsági jelentések](../reports/attendance-reports.md) — látogatottsági trendek megtekintése
- [Gyermekbejelentkezési útmutató](./childrens-checkin.md) — a teljes gyermekszolgálati bejelentkezés beállítása
