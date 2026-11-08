---
title: "Útmutató: Eseményregisztráció beállítása"
description: "Eseményregisztrációs űrlap beállítása a B1 Adminban, résztvevői adatok és opcionális fizetések gyűjtéséhez, beágyazása a gyülekezeti weboldalra, valamint a jelentkezések nyomon követése."
---

# Eseményregisztráció beállítása

<div class="article-intro">

Hozzon létre eseményregisztrációs űrlapot, gyűjtsön be résztvevői adatokat és opcionális fizetéseket, ágyazza be a gyülekezeti weboldalába, és kezelje a beérkező jelentkezéseket. Az útmutató végére lesz egy megosztható regisztrációs oldala bármilyen gyülekezeti eseményhez.

</div>

:::info
**Kétféle módon kezelheti az eseményregisztrációt:** Ez az útmutató a **űrlap alapú regisztrációt** mutatja be, amely teljes kontrollt ad az egyéni mezők és a fizetésgyűjtés felett. Egyszerűbb eseményeknél, ahol csak azt kell nyomon követnie, ki jelentkezett, használja a **natív eseményregisztrációt**, amely a naptárba van beépítve. A beállítási útmutatót lásd: [Naptárak létrehozása](../calendars/creating-calendars.md#enabling-event-registration). A natív regisztráció lehetővé teszi, hogy a tagok közvetlenül a [B1.church vagy a B1 alkalmazás](../../b1-church/events/registering.md) segítségével jelentkezzenek, kapacitáskövetéssel, dátumablakokkal és e-mailes visszaigazolásokkal.
:::

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- B1 Admin-fiók adminisztrátori jogosultsággal
- Fizetések gyűjtéséhez: először be kell állítani a [Stripe-ot](../donations/online-giving-setup.md)

</div>

## 1. lépés: Önálló űrlap létrehozása

Az önálló űrlapoknak saját nyilvános URL-címük van, amelyet bárki elérhet, ami ideálissá teszi eseményregisztrációhoz.

A következőket a [Űrlapok létrehozása](../forms/creating-forms.md) útmutató szerint végezze el:

1. Lépjen az Űrlapok menüpontra, és kattintson az Űrlap hozzáadása gombra
2. Válassza az „Önálló” típust – ez ad az űrlapnak saját nyilvános URL-címet
3. Nevezze el az eseményről (pl. „Férfi-hétvége regisztráció”, „VBS jelentkezés”)

## 2. lépés: Kérdések hozzáadása

Állítsa össze azokat a mezőket, amelyeket a jelentkezőktől gyűjteni szeretne.

A kérdések hozzáadásához kövesse a [Űrlapok létrehozása](../forms/creating-forms.md#adding-questions) útmutatót:

1. Lépjen a Kérdések fülre, és adjon hozzá mezőket a szükséges információkhoz: név, e-mail, telefonszám, étkezési korlátozások, pólóméret, vészhelyzeti kapcsolattartó stb.
2. Étkezési preferenciák vagy foglalkozásválasztások esetén használja a Többválasztós típust

:::warning
A fizetési mezőtípushoz szükséges a Stripe beállítása. Ha még nincs beállítva az online adakozás, fizetési mezők hozzáadása előtt tekintse meg az [Online adakozás beállítása](../donations/online-giving-setup.md) útmutatót.
:::

## 3. lépés: Az űrlap beállításainak konfigurálása

Szabályozza, mikor és hogyan érhető el a regisztrációs űrlap.

1. Állítsa be az elérhetőségi dátumokat, ha a regisztráció csak korlátozott ideig lehet nyitva
2. Másolja ki a nyilvános URL-címet – ezt közvetlenül megoszthatja
3. Adjon hozzá űrlap-tagokat Adminisztrátor vagy Csak megtekintés szerepkörrel, hogy segítsenek a beérkező jelentkezések kezelésében

## 4. lépés: Beágyazás a weboldalba

Tegye könnyen megtalálhatóvá a regisztrációs űrlapot úgy, hogy hozzáadja a gyülekezeti weboldalához.

A következőket a [Oldalak kezelése](../website/managing-pages.md) útmutató szerint végezze el:

1. A B1 weboldal-szerkesztőben adjon hozzá új szakaszt egy oldalhoz, és válassza ki az Űrlap elemet
2. Válassza ki a listából a regisztrációs űrlapot

:::tip
Ossza meg az önálló URL-címet e-mailben, közösségi médiában és a gyülekezeti hírlevelekben is – minél több helyen látszik, annál több jelentkezést kap.
:::

## 5. lépés: Jelentkezések kezelése

Kövesse nyomon a beérkező regisztrációkat, és szükség esetén exportálja az adatokat.

A következőket a [Jelentkezések kezelése](../forms/managing-submissions.md) útmutató szerint végezze el:

1. Tekintse át a beérkező válaszokat a Jelentkezések fülön
2. Exportálja CSV formátumba táblázatkezelőkhöz, létszámkövetéshez vagy az eseményszervezőkkel való megosztáshoz

## Készen van!

Az eseményregisztrációja élesben van. Ossza meg a linket, ágyazza be a weboldalába, és kövesse nyomon a jelentkezéseket a B1 Adminból. Az esemény végeztével exportálja a végső listát a nyilvántartásához.

## Kapcsolódó cikkek

- [Űrlapok létrehozása](../forms/creating-forms.md) — űrlapok építése különböző mezőtípusokkal
- [Jelentkezések kezelése](../forms/managing-submissions.md) — űrlapválaszok áttekintése és exportálása
- [Oldalak kezelése](../website/managing-pages.md) — űrlapok beágyazása a weboldalba
- [Online adakozás beállítása](../donations/online-giving-setup.md) — fizetési mezőkhöz szükséges
