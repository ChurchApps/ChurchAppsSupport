---
title: "Útmutató: Eseményregisztráció beállítása"
description: "Eseményregisztrációs űrlap beállítása a B1 Admin-ban résztvevői adatok és opcionális fizetés gyűjtésére, beágyazás a weboldalba, jelentkezések követése."
---

# Eseményregisztráció beállítása

<div class="article-intro">

Hozzon létre eseményregisztrációs űrlapot, gyűjtse be a résztvevők adatait és a választható fizetéseket, ágyazza be a gyülekezeti weboldalába, és kezelje a beérkező jelentkezéseket. A végére lesz egy megosztható regisztrációs oldala bármilyen gyülekezeti eseményhez.

</div>

:::info
**Kétféleképpen kezelheti az eseményregisztrációt:** Ez az útmutató az **űrlapalapú regisztrációt** ismerteti, amely teljes kontrollt ad az egyéni mezők és a fizetésgyűjtés felett. Egyszerűbb eseményekhez, ahol csak azt kell nyomon követnie, ki jön el, használja a **natív eseményregisztrációt**, amely a naptárba van beépítve -- a beállítási útmutatóért lásd: [Naptárak létrehozása](../calendars/creating-calendars.md#enabling-event-registration). A natív regisztráció lehetővé teszi, hogy a tagok közvetlenül a [B1 weboldalon](../../b1-church/events/registering.md) és a [mobilalkalmazásban](../../b1-church/events/registering.md) jelentkezzenek, kapacitáskövetéssel, dátumablakokkal és e-mailes visszaigazolásokkal.
:::

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- B1 Admin-fiók adminisztrátori hozzáféréssel
- Fizetések gyűjtéséhez: először be kell állítani a [Stripe-ot](../donations/online-giving-setup.md)

</div>

## 1. lépés: Önálló űrlap létrehozása

Az önálló űrlapoknak saját nyilvános URL-címük van, amelyet bárki elérhet -- ez tökéletes eseményregisztrációhoz.

Kövesse a [Űrlapok létrehozása](../forms/creating-forms.md) útmutatót a következőkhöz:

1. Lépjen az Űrlapok menübe, és kattintson az Űrlap hozzáadása gombra
2. Válassza a „Önálló” típust -- ez saját nyilvános URL-t ad az űrlapnak
3. Nevezze el az eseményről (pl. „Férfi hétvége regisztráció”, „VBS jelentkezés”)

## 2. lépés: Kérdések hozzáadása

Állítsa össze azokat a mezőket, amelyeket a jelentkezőktől gyűjteni szeretne.

Kövesse a [Űrlapok létrehozása](../forms/creating-forms.md#adding-questions) útmutatót a kérdések hozzáadásához:

1. Lépjen a Kérdések fülre, és adjon hozzá mezőket a szükséges adatokhoz: név, e-mail, telefonszám, étkezési korlátozások, pólóméret, vészhelyzeti kapcsolattartó stb.
2. Használja a Többszörös választás típust olyan lehetőségekhez, mint az étkezési preferenciák vagy a foglalkozás-választások

:::warning
A Fizetés mezőtípushoz szükséges a Stripe beállítása. Ha még nem állította be az online adakozást, nézze meg az [Online adakozás beállítása](../donations/online-giving-setup.md) útmutatót, mielőtt fizetési mezőket adna hozzá.
:::

## 3. lépés: Űrlap beállításainak konfigurálása

Szabályozza, hogy mikor és hogyan legyen elérhető a regisztrációs űrlap.

1. Állítsa be az elérhetőségi dátumokat, ha a regisztráció csak korlátozott ideig lehet nyitva
2. Másolja ki a nyilvános URL-t -- ezt közvetlenül megoszthatja
3. Adjon hozzá űrlaptagokat Adminisztrátor vagy Csak megtekintés szereppel, hogy segítsenek a beérkező jelentkezések kezelésében

## 4. lépés: Beágyazás a weboldalába

Tegye könnyen megtalálhatóvá a regisztrációs űrlapot azzal, hogy hozzáadja a gyülekezeti weboldalához.

Kövesse a [Oldalak kezelése](../website/managing-pages.md) útmutatót a következőkhöz:

1. A B1 weboldal-szerkesztőben adjon hozzá új szakaszt egy oldalhoz, és válassza az Űrlap elemet
2. Válassza ki a regisztrációs űrlapot a listából

:::tip
Ossza meg az önálló URL-t e-mailben, közösségi médiában és a gyülekezeti hírlevelekben is -- minél több helyen látható, annál több jelentkezést kap.
:::

## 5. lépés: Jelentkezések kezelése

Kövesse nyomon a beérkező regisztrációkat, és szükség esetén exportálja az adatokat.

Kövesse a [Beérkezett válaszok kezelése](../forms/managing-submissions.md) útmutatót a következőkhöz:

1. Tekintse át a beérkező válaszokat a Beküldések fülön
2. Exportálja CSV-fájlba táblázatkezelőkhöz, létszámkövetéshez vagy eseményszervezőkkel való megosztáshoz

## Kész!

Az eseményregisztrációja élesben van. Ossza meg a linket, ágyazza be a weboldalába, és kövesse nyomon a jelentkezéseket a B1 Adminban. Az esemény végeztével exportálja a végleges listát a nyilvántartásához.

## Kapcsolódó cikkek

- [Űrlapok létrehozása](../forms/creating-forms.md) -- űrlapok készítése különböző mezőtípusokkal
- [Beérkezett válaszok kezelése](../forms/managing-submissions.md) -- űrlapválaszok áttekintése és exportálása
- [Oldalak kezelése](../website/managing-pages.md) -- űrlapok beágyazása a weboldalba
- [Online adakozás beállítása](../donations/online-giving-setup.md) -- fizetési mezőkhöz szükséges
