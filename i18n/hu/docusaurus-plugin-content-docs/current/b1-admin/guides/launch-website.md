---
title: "Útmutató: Indítsa el gyülekezete weboldalát"
description: "Gyülekezeti weboldal beállítása a B1 Admin-ban: főoldal, színek és logó, fontos oldalak, saját domain csatlakoztatása és adományozási űrlapok."
---

# Indítsa el gyülekezete weboldalát

<div class="article-intro">

A B1.church egy teljes értékű weboldal-szerkesztőt tartalmaz külön költség nélkül. Ez az útmutató lépésről lépésre végigvezeti Önt a gyülekezeti weboldal létrehozásán a semmiből: a kezdőlap beállításán, a megjelenés testreszabásán, a fontosabb oldalak hozzáadásán, és opcionálisan az online adakozás és eseményregisztrációs űrlapok csatlakoztatásán.

</div>

## Képzési videó

<YouTube id="aA4UahZpmXg" title="Gyülekezeti weboldal indítása a B1-ben" next="Oldalak szerkesztése és navigáció a B1-ben" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Készítse elő gyülekezete logóját (átlátszó hátterű PNG a legjobb)
- Válasszon 2–3 márkaszínt a weboldalához
- Ha saját domaint használ (pl. yourchurch.com), legyen hozzáférése a DNS-szolgáltatójához (GoDaddy, Cloudflare stb.)
- Ha szeretne online adakozást a weboldalán, először végezze el az [Online adakozás beállítása](../donations/online-giving-setup.md) (Stripe) lépéseit

</div>

## 1. lépés: Weboldal kezdeti beállítása

Kezdje a kezdőlap és az alapvető oldalszerkezet létrehozásával.

Kövesse a [Weboldal kezdeti beállítása](../website/initial-setup.md) útmutatót, hogy:

1. Lépjen a **Weboldal** menüpontra a B1 Adminban
2. Hozzon létre kezdőlapot hero szekcióval, üdvözlő üzenettel és a legfontosabb információkkal
3. Adja meg gyülekezete nevét és szlogenjét

## 2. lépés: Megjelenés beállítása

Állítsa be weboldala vizuális arculatát: színeket, betűtípusokat, logót és láblécet.

Kövesse a [Megjelenés](../website/appearance.md) útmutatót, hogy:

1. Töltse fel gyülekezete logóját
2. Állítsa be az elsődleges és a kiemelő színt
3. Konfigurálja a navigációs sávot és a láblécet
4. Tekintse meg előnézetben a változtatásokat

:::tip
Tartsa egyszerűen a színpalettát: általában egy elsődleges szín és egy kiemelő szín elegendő. A weboldal-szerkesztő a többit elintézi.
:::

## 3. lépés: Tartalmi oldalak hozzáadása

Készítse el azokat az oldalakat, amelyekre látogatóinak a legnagyobb szüksége van.

Kövesse a [Oldalak kezelése](../website/managing-pages.md) útmutatót olyan oldalak létrehozásához, mint:

- **Rólunk**: Gyülekezete története, hitvallása és vezetése
- **Igehirdetések**: Link a [igehirdetés-könyvtárhoz](../sermons/managing-sermons.md)
- **Események**: Közelgő események és regisztráció
- **Adakozás**: Online adakozási oldal (a [Stripe beállítást](../donations/online-giving-setup.md) igényli)
- **Kapcsolat**: Helyszín, istentiszteleti idők és elérhetőségek

## 4. lépés: Domain csatlakoztatása

Ha a saját domainnevét szeretné használni (például yourchurch.com) az alapértelmezett B1 cím helyett:

1. Lépjen a **Beállítások** menüpontra a B1 Adminban, és nyissa meg a **Domainek** szekciót
2. Adja meg saját domainjét
3. Frissítse a DNS-rekordokat a domain-szolgáltatójánál, hogy a B1-re mutassanak

:::info
A DNS-változások akár 48 óráig is eltarthatnak, mire érvényesülnek. Előfordulhat, hogy weboldala a saját domainjén nem érhető el azonnal. Az alapértelmezett B1 cím ez idő alatt továbbra is működik.
:::

## 5. lépés: Adakozás és űrlapok hozzáadása

Bővítse weboldalát interaktív elemekkel:

- **Online adakozás**: Adakozási szekció hozzáadása, hogy a tagok közvetlenül a weboldalról adakozhassanak. A Stripe beállításához lásd: [Online adakozás beállítása](../donations/online-giving-setup.md).
- **Regisztrációs űrlapok**: Beágyazott [önálló űrlapok](../forms/creating-forms.md) eseményjelentkezésekhez, látogatói kártyákhoz vagy önkéntes jelentkezésekhez. Arról, hogyan adhat űrlapelemet bármely oldalhoz, lásd: [Oldalak kezelése](../website/managing-pages.md).

## Készen van!

Gyülekezeti weboldala élő. Ossza meg a címet gyülekezetével és a közösségi médiában. A tartalmat bármikor frissítheti, új oldalakat adhat hozzá, és módosíthatja a megjelenést a B1 Admin irányítópultjáról.

## Kapcsolódó cikkek

- [Weboldal kezdeti beállítása](../website/initial-setup.md): részletes beállítási útmutató
- [Oldalak kezelése](../website/managing-pages.md): oldalak hozzáadása és szerkesztése
- [Megjelenés](../website/appearance.md): színek, logó és elrendezés
- [Fájlok kezelése](../website/files.md): képek és dokumentumok feltöltése
- [Online adakozás beállítása](../donations/online-giving-setup.md): Stripe konfigurálása
- [Űrlapok létrehozása](../forms/creating-forms.md): regisztrációs és felmérő űrlapok készítése
