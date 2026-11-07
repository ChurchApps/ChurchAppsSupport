---
title: "Navigációs stílusok"
description: "Tömör és áttetsző weboldal-navigációs sávok színeinek testreszabása a B1 Adminban, beleértve a link-, hover- és aktív állapotokat egyházi weboldalához."
---

# Navigációs stílusok

<div class="article-intro">

Testreszabhatja a gyülekezeti weboldal navigációs sávjának színeit, hogy illeszkedjenek a arculatához. Színeket állíthat be a szilárd hátterű és az átlátszó, oldalra helyezett navigációhoz is, így teljes kontrollt kap afelett, hogyan jelenik meg a navigáció a különböző oldalakon.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szükséges hozzá a gyülekezeti weboldal kezelésének jogosultsága. Részletekért lásd: [Szerepkörök és jogosultságok](../people/roles-permissions.md).
- Készítse elő a márka színeit, beleértve a hexadecimális színkódokat is (pl. #03A9F4).
- Értse meg a szilárd és az átlátszó navigációs stílus közötti különbséget a weboldalán.

</div>

## A navigációs módok megértése

A weboldal navigációja két különböző stílusban jelenhet meg, az oldaltól függően:

- **Szilárd navigáció** -- Háttérszínnel rendelkező navigációs sáv, jellemzően tartalmi oldalakon használva
- **Átlátszó navigáció** -- Az oldal tartalmára ráhelyezett navigáció, jellemzően főképpel vagy teljes képernyős háttérrel rendelkező oldalakon használva

Mindkét módhoz függetlenül állíthat be színeket.

## A navigációs stílusok elérése

1. A B1 Adminban nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), és bontsa ki a **Webhely** pontot
2. Kattintson a **Megjelenés** pontra
3. A **Stílusbeállítások** listában kattintson a **Navigáció** pontra

A **Navigációs stílus** szerkesztőben két kártya található: a **Fejléc (szilárd)** és a **Fejléc a főképen (átlátszó)**.

## A szilárd navigáció beállítása

A szilárd navigáció háttérszínnel jelenik meg a navigációs sáv mögött. Ezek a beállítások a **Fejléc (szilárd)** kártyán találhatók. Testreszabhatja a következőket:

### Háttérszín

1. Kapcsolja be a **Felülírás** kapcsolót a **Háttérszín** mellett
2. Kattintson a színválasztóra
3. Válassza ki a kívánt háttérszínt
4. Az alapértelmezett szín a fehér (#FFFFFF)

### Linkszín

1. Kapcsolja be a **Felülírás** kapcsolót a **Linkszín** mellett
2. Válassza ki a navigációs linkek szövegének színét
3. Ez alapértelmezett állapotban lévő linkekre vonatkozik
4. Az alapértelmezett szín a sötétszürke (#555555)

### Link fölé húzási színe

1. Kapcsolja be a **Felülírás** kapcsolót a **Link fölé húzási színe** mellett
2. Válassza ki azt a színt, amelyre a linkek váltanak, amikor a felhasználó föléjük viszi az egeret
3. Ez vizuális visszajelzést ad a kattintható linkekről
4. Az alapértelmezett szín a világoskék (#03A9F4)

### Aktív szín

1. Kapcsolja be a **Felülírás** kapcsolót az **Aktív link színe** mellett
2. Válassza ki az aktuálisan megnyitott oldal linkjének színét
3. Ez segít a felhasználóknak megtudni, melyik oldalon járnak
4. Az alapértelmezett szín a világoskék (#03A9F4)

## Az átlátszó navigáció beállítása

Az átlátszó navigáció háttér nélkül, közvetlenül az oldal tartalmára kerül. Ezek a beállítások a **Fejléc a főképen (átlátszó)** kártyán találhatók. Testreszabhatja a következőket:

### Linkszín

1. Kapcsolja be a **Felülírás** kapcsolót a **Linkszín** mellett
2. Válasszon olyan színt, amely jól kontrasztol az oldal hátterével
3. Sötét háttér fölött gyakran a fehér vagy a világos színek működnek a legjobban
4. Az alapértelmezett szín a sötétszürke (#555555)

### Link fölé húzási színe

1. Kapcsolja be a **Felülírás** kapcsolót a **Link fölé húzási színe** mellett
2. Válassza ki a fölé húzási állapot színét
3. Ellenőrizze, hogy jól látszik-e az oldal háttere előtt
4. Az alapértelmezett szín a világoskék (#03A9F4)

### Aktív szín

1. Kapcsolja be a **Felülírás** kapcsolót az **Aktív link színe** mellett
2. Válassza ki az aktív oldal jelzésének színét
3. Legyen jól látható, de illeszkedjen a dizájnhoz
4. Az alapértelmezett szín a világoskék (#03A9F4)

:::info
Az átlátszó navigációnak nincs háttérszín-beállítása, mivel közvetlenül az oldal tartalmára kerül.
:::

## A változtatások mentése

1. A színek beállítása után kattintson a **Navigáció mentése** gombra
2. A változtatások azonnal megjelennek az élő weboldalon
3. Látogassa meg a weboldalát, hogy mindkét módban megnézze a navigációt

## Visszaállítás alapértelmezettre

Ha vissza szeretne térni az alapértelmezett színekhez:

1. Kapcsolja ki a **Felülírás** kapcsolókat az egyéni színeknél
2. Kattintson a **Navigáció mentése** gombra
3. A navigáció visszatér az alapértelmezett színsémához

Vagy kattintson a **Mégse** gombra, hogy mentés nélkül vesse el az összes változtatást.

## Ajánlott gyakorlatok

### Színkontraszt

- **Olvashatóság** -- Ügyeljen rá, hogy a linkszínek elegendő kontrasztot adjanak a háttérrel
- **WCAG-megfelelőség** -- Törekedjen legalább 4,5:1 kontrastarányra a akadálymentesség érdekében
- **Mindkét mód tesztelése** -- Nézze meg weboldalát a szilárd és az átlátszó navigációval is

### Márkaegység

- **Használja a márka színeit** -- Illeszkedjenek a logójához és a weboldal témájához
- **Korlátozza a palettát** -- Maradjon 2-3 színnél az egységes megjelenés érdekében
- **Vegye figyelembe a képeket** -- Átlátszó navigáció használata esetén teszteljen tipikus oldalhátterekkel

### Fölé húzási és aktív állapotok

- **Egyértelmű visszajelzés** -- A fölé húzási állapot legyen szembetűnően más, mint az alapértelmezett link
- **Az aktív oldalak megkülönböztetése** -- Használjon jól elkülönülő színt, hogy a felhasználók tudják, hol járnak
- **Simább átmenetek** -- A rendszer automatikusan animálja a színváltozásokat

## Hibaelhárítás

### A színek nem megfelelőek

- **Gyorsítótár törlése** -- A böngésző gyorsítótára régi színeket mutathat
- **Hexadecimális kódok ellenőrzése** -- Győződjön meg róla, hogy érvényes hexadecimális színkódot adott meg
- **Tesztelés különböző hátterekkel** -- A színek az oldaltól függően máshogy nézhetnek ki

### A navigáció nem látható

- **Átlátszó mód** -- Világos képek fölött átlátszó navigáció használatakor a sötét szöveg nehezen olvasható lehet
- **Megoldás** -- Módosítsa a linkszíneket, vagy használjon sötétebb oldalhátteret
- **Alternatíva** -- Adjon a navigációs területhez finom árnyékot vagy háttér-átfedést

## Technikai részletek

A navigációs stílusok JSON formátumban tárolódnak, és CSS-változókkal kerülnek alkalmazásra:

- A változtatások az oldal újraépítése nélkül azonnal érvénybe lépnek
- A színek az összes navigációs elemre kiterjednek
- A felülírások opcionálisak; a be nem állított színek a téma alapértelmezett értékeit használják

## Kapcsolódó cikkek

- [Megjelenés](./appearance.md) -- A weboldal általános megjelenésének és hangulatának testreszabása
- [Oldalak kezelése](./managing-pages.md) -- A weboldal oldalainak létrehozása és rendszerezése
- [Oldalszerkesztő](./page-editor.md) -- Oldalelrendezések és tartalmak tervezése
