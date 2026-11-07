---
title: "Csoportos csatlakozási kérelmek"
---

# Csoportos csatlakozási kérelmek

<div class="article-intro">

Ha egy csoport jóváhagyáshoz kötött csatlakozási szabályzatot kap, az emberek csatlakozási kérelmet küldhetnek. A csoportvezetők és az adminisztrátorok áttekintik ezeket a kérelmeket, és jóváhagyják vagy elutasítják őket. Így a gyülekezet irányíthatja a csoporttagságot, miközben könnyű kifejezni a csatlakozási szándékot.

</div>

## Oktatóvideó

<YouTube id="1vj-suCiIsE" title="Csoportos csatlakozási kérelmek és csoportnaptárak a B1-ben" next="Istentiszteletek és részvétel beállítása a B1-ben" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van a csoportok kezelésére vonatkozó jogosultságra, vagy az adott csoport vezetőjének kell lennie. A részletekért lásd: [Szerepkörök és jogosultságok](../people/roles-permissions.md).
- A csoport csatlakozási szabályzatát **Kérelem** (jóváhagyás szükséges) értékre kell állítani. A csatlakozási szabályzatok beállításáról lásd: [Csoportok létrehozása](./creating-groups.md).

</div>

## A csatlakozási szabályzatok megértése

A csoportoknak három különböző csatlakozási szabályzata lehet:

- **Nyitott** -- Bárki azonnal csatlakozhat, jóváhagyás nélkül
- **Kérelem** -- Az emberek csatlakozási kérelmet küldenek, amelyhez jóváhagyás szükséges
- **Zárt** -- Senki sem kérelmezhet csatlakozást (a tagokat kézzel kell hozzáadni)

Ha a csoport a **Kérelem** szabályzatot használja, minden csatlakozási próbálkozás az ezen az oldalon ismertetett jóváhagyási folyamaton megy keresztül.

## Függőben lévő kérelmek megtekintése

### Csoportvezetőknek

1. A B1 Adminban nyissa meg a [Jump menüt](../introduction.md#getting-around-with-the-jump-menu), és válassza a **People > Groups** lehetőséget
2. Kattintson a csoport nevére
3. A **Members** szakasz megmutatja, hány kérelem vár feldolgozásra. Kattintson az **All members** gombra -- az adott csoport függőben lévő kérelmei a tagok listájának tetején jelennek meg

### Adminisztrátoroknak

A csoportkezelési jogosultsággal rendelkező adminisztrátorok az összes csoport függőben lévő kérelmeit megtekinthetik:

1. A Jump menüben válassza a **People > Groups** lehetőséget
2. Kattintson az oldal fejlécében található **pending requests** gombra (például: „3 pending requests"). Ez csak akkor jelenik meg, ha vannak várakozó kérelmek.
3. Tekintse át az összes függőben lévő kérelmet a gyülekezetben

## Csatlakozási kérelem áttekintése

Minden csatlakozási kérelem a következőket mutatja:

- **A személy neve és fotója** -- Az a személy, aki csatlakozni szeretne
- **Opcionális üzenet** -- Személyes üzenet arról, miért szeretne csatlakozni (ha megadta)
- **Kérelem dátuma** -- Amikor a kérelem beérkezett

A kérelem áttekintéséhez:

1. Olvassa el a személy üzenetét, ha megadott egyet
2. Szükség esetén kattintson a személy nevére, hogy megtekintse a profilját
3. Döntse el, hogy jóváhagyja vagy elutasítja-e a kérelmet

## Kérelem jóváhagyása

1. Kattintson a **Approve** gombra a csatlakozási kérelemnél
2. A személy azonnal a csoport tagjaként kerül be
3. A kérelmező értesítést kap arról, hogy a kérelmét jóváhagyták
4. A kérelem jóváhagyottként jelölődik a rendszerben

:::tip
Ha jóváhagy egy kérelmet, a személy rendes csoporttaggá válik. Később, szükség esetén, a [Csoporttagok](./group-members.md) oldalon csoportvezetővé is előléptetheti.
:::

## Kérelem elutasítása

1. Kattintson a **Decline** gombra a csatlakozási kérelemnél
2. Opcionálisan adjon meg indoklást az elutasításhoz (legfeljebb 500 karakter)
3. Kattintson a **Confirm** gombra
4. A kérelmező értesítést kap az elutasítás indoklásával (ha megadott egyet)
5. A kérelem elutasítottként jelölődik

:::info
Az elutasítás indoklásának megadása segít a személynek megérteni, miért nem hagyták jóvá a kérelmét, és ösztönözheti arra, hogy később újra próbálkozzon, vagy más csoportokat keressen.
:::

## Jóváhagyás a feladatok oldalon

Minden csatlakozási kérelem egy feladatot is létrehoz a **Serving &rarr; My Work** alatt, „*Személy* csatlakozási kérelmet küldött a *Csoporthoz*." címmel. A feladat a csoport vezetőinek van kiosztva. Ha a csoportnak még nincs vezetője, a feladat azoknak a munkatársaknak kerül, akiknek van **Group Members &gt; Edit** jogosultságuk, vagy ha senkinek nincs ilyen jogosultsága, a gyülekezet domain-adminisztrátorainak. Az így feladatot kapó munkatársak és adminisztrátorok értesítést is kapnak, amely közvetlenül a feladathoz vezet.

A feladat megnyitásakor látszik a kérelmező neve, a csoport, valamint az opcionális üzenet, és a feladatkártyán közvetlenül megtalálhatók a **Approve** és **Decline** gombok (az Decline gomb ugyanazt az opcionális indoklás mezőt nyitja meg, mint ahogy fentebb le van írva). Így a vezetők értesítésen keresztül is intézkedhetnek a kérelmekben, anélkül hogy megnyitnák a csoport tagjainak listáját.

Ha a kérelmet bármelyik helyen eldöntik -- a csoport tagjai között vagy a csoport feladatkártyáján --, az mindenhol lezárul, így a vezetők sosem látnak elavult feladatot olyan kérelemhez, amelyet valaki már kezelt.

## Értesítések

A csatlakozási kérelmek rendszere automatikusan küld értesítéseket:

- **Amikor kérelem érkezik** -- Minden csoportvezető értesítést kap. Ha a csoportnak nincs vezetője, a feladathoz rendelt munkatársak vagy adminisztrátorok kapnak értesítést (lásd fentebb).
- **Amikor a kérelmet jóváhagyják** -- A kérelmező visszaigazolást kap
- **Amikor a kérelmet elutasítják** -- A kérelmező értesítést kap az esetleges elutasítási indoklással együtt

Az értesítések a felhasználó értesítési központjában jelennek meg a B1.church oldalon és a mobilalkalmazásban. A B1 Admin értesítési harangjában egy csatlakozási kérelem értesítésére kattintva (vagy annak **View Details** gombjára) a csoport a gyülekezete B1.church oldalán nyílik meg új lapon.

## Kérelmek kezelése a tag oldaláról

Az emberek a B1.church oldalon kezelhetik saját csatlakozási kérelmeiket:

- Megtekinthetik a függőben lévő kérelmeik állapotát a csoport részletező oldalán
- Visszavonhatnak egy függőben lévő kérelmet, ha meggondolják magukat
- Láthatják, hogy a kérelmüket jóváhagyták vagy elutasították

## Ajánlott gyakorlatok

- **Reagáljon gyorsan** -- Próbálja 24-48 órán belül áttekinteni a kérelmeket, hogy az emberek ne várakozzanak feleslegesen
- **Legyen világos az elutasítási indoklásban** -- Segítsen megérteni a következő lépéseket vagy alternatív lehetőségeket
- **Nézze meg a profilokat** -- Tekintse át a személy profilját, hogy lássa, alkalmas-e a csoportra
- **Közölje az elvárásokat** -- Gondoskodjon róla, hogy a csoport leírása egyértelműen megmondja, kinek szól a csoport

## Kapcsolódó cikkek

- [Csoportok létrehozása](./creating-groups.md) -- Megtudhatja, hogyan hozhat létre csoportokat és állíthatja be a csatlakozási szabályzatokat
- [Csoporttagok](./group-members.md) -- Meglévő csoporttagok kezelése
- [Csoportnaptár](./group-calendar.md) -- Csoportos találkozók és események ütemezése
