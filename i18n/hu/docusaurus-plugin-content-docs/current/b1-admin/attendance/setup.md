---
title: "Jelenlét beállítása"
---

# Jelenlét beállítása

<div class="article-intro">

Mielőtt rögzítheti a jelenlétet, meg kell adnia a B1 Adminban a gyülekezete fizikai helyszíneit, a istentiszteletek időpontjait, és azt, hogy mely csoportok találkoznak az egyes istentiszteleteken. Ez az egyszeri beállítás hozza létre azt a struktúrát, amely a gyülekezete összes jelenléti nyilvántartását és jelentését működteti.

</div>

## Oktatóvideó

<YouTube id="LQPc2gVlXvQ" title="Istentiszteletek és jelenlét beállítása a B1-ben" next="Gyermek-check-in beállítása a B1-ben" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van aktív B1 Admin fiókra a **Istentiszteletek szerkesztése** jelenléti jogosultsággal. A **Beállítás** lehetőség csak azoknak jelenik meg, akiknek ez megvan; pusztán a jelenlét megtekintése nem elég. Ha nem biztos a hozzáférési szintjében, nézze meg a [Szerepkörök és jogosultságok](../people/roles-permissions.md) oldalt.
- Ha csoportokat szeretne istentiszteleti időpontokhoz rendelni, előbb győződjön meg arról, hogy a [csoportjai létrehozása](../groups/creating-groups.md) megtörtént.

</div>

## Alapfogalmak

- **Helyszín** -- fizikai hely, ahol a gyülekezete találkozik (pl. „Főhelyszín”, „Északi helyszín”). A helyszíneket a **Beállítások** alatt kezelheti.
- **Istentisztelet** -- rendszeres összejövetel egy helyszínen (pl. „Vasárnapi istentisztelet”, „Közepesheti”).
- **Istentiszteleti időpont** -- konkrét időpont, amikor egy istentisztelet megtartásra kerül (pl. „9:00”, „11:00”).
- **Ütemezett csoport** -- egy konkrét istentiszteleti időponthoz rendelt csoport. A jelenlét az adott istentisztelet kontextusában kerül nyilvántartásba.
- **Nem ütemezett csoport** -- olyan csoport, amely önállóan vezeti a jelenlétet, és nincs istentiszteleti időponthoz kötve.

## A jelenléti struktúra beállítása

1. Nyissa meg a **B1 Admint**, nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), és bontsa ki a **Személyek** menüpontot.
2. Kattintson a **Jelenlét** lehetőségre, majd a bal oldali oszlopban a **Beállítás** gombra. Megnyílik a **Istentiszteleti struktúra** táblázat, amelynek tetején a helyszínek, az istentiszteleti időpontok, valamint az ütemezett és nem ütemezett csoportok száma látható. Ezek a számok azonnal frissülnek, amint hozzáad, szerkeszt vagy eltávolít valamit a táblázatban.
3. Kattintson a **Helyszínek kezelése** gombra (a **Istentiszteleti struktúra** panel jobb felső sarkában). Ez a **Beállítások → Helyszínek** oldalra visz. Kattintson a **Helyszín hozzáadása** gombra, adja meg a helyszín nevét (a cím és az időzóna opcionális), majd kattintson a **Mentés** gombra.
4. Térjen vissza a **Személyek → Jelenlét** menühöz, és kattintson a **Beállítás** gombra. A helyszíne most már megjelenik a beállítási táblázatban.
5. Kattintson a helyszíne alatti **Istentisztelet** oszlopban lévő **+ gombra**. Adjon meg egy istentisztelet-nevet, például „Vasárnapi istentisztelet”, majd kattintson a **Mentés** gombra.
6. Kattintson az istentisztelet alatti **Időpont** oszlopban lévő **+ gombra**. Adjon meg egy **istentiszteleti időpont** nevet, például „9:00”, opcionálisan töltse ki a [check-in ütemezést](#check-in-utemezes-beallitasa), majd kattintson a **Mentés** gombra. Ismételje meg minden istentiszteleti időpontnál.
7. Ha csoportot szeretne egy istentiszteleti időponthoz kapcsolni, nyissa meg a csoportot a **Személyek > Csoportok** menüből, kattintson a **Szerkesztés** gombra, és használja a **Istentiszteleti időpont hozzáadása** lehetőséget -- lásd a következő szakaszt.

### A jelenlétkövetés bekapcsolása egy csoportnál

Mielőtt egy csoportnál jelenlétet lehet rögzíteni, a **Jelenlét követése** beállítást be kell kapcsolni az adott csoportnál.

1. Az Ugrás menüben válassza a **Személyek > Csoportok** lehetőséget, majd jelölje ki a csoportot.
2. Kattintson a csoport neve alatti **Szerkesztés** gombra.
3. Állítsa a **Jelenlét követése** beállítást **Igen** értékre.
4. Kattintson a **Mentés** gombra.

:::tip
Ha az előző lépésben istentiszteleti időponthoz rendelte a csoportot, használja a csoport szerkesztési képernyőjén található **Istentiszteleti időpont hozzáadása** lehetőséget is, hogy a megfelelő istentiszteletéhez kapcsolja. Így a foglalkozások a megfelelő helyszínhez és időponthoz kapcsolódnak.
:::

:::tip
Ha egy csoport rendes istentisztelet után találkozik -- például egy közepesheti kiscsoport, amely saját jelenlétet vezet --, meghagyhatja nem ütemezett csoportként. A **Csoportjelenlét** jelentésben így is megjelenik majd.
:::

## Check-in ütemezés beállítása

Minden istentiszteleti időponthoz beállítható egy opcionális check-in ütemezés, hogy az [önálló check-in](check-in.md) minden héten automatikusan nyíljon és záródjon. Ütemezés nélkül az adott istentiszteleti időpont check-in lehetősége bármikor elérhető marad (feltéve, hogy a terem más okból nincs lezárva, például mert betelt).

1. A **Beállítás** nézetben kattintson egy istentiszteleti időpont nevére az **Időpont** oszlopban (vagy adjon hozzá újat).
2. A **Check-in ütemezés** alatt válassza ki azt a **Napot**, amelyen az istentiszteleti időpont megtartásra kerül.
3. Állítsa be a **Kezdés időpontját**, és opcionálisan a **Befejezés időpontját**.
4. Adja meg a **Check-in megnyitása (a kezdés előtt, percekben)** értéket -- például a `30` azt jelenti, hogy a check-in fél órával az istentisztelet kezdete előtt nyílik meg.
5. Adja meg a **Check-in lezárása (a befejezés után, percekben)** értéket -- például a `15` azt jelenti, hogy a check-in a befejezési időpont után még 15 percig nyitva marad. Ha nem adott meg befejezési időpontot, ez a kezdési időponttól számítódik. Ha a **Befejezés időpontját** és a **Check-in lezárását** is üresen hagyja, a check-in az adott nap végéig nyitva marad.
6. Kattintson a **Mentés** gombra.

Az ütemezés minden héten ismétlődik, és a szolgálati hely helyi idejében értendő. Ha ennek a helyszínnek nincs beállított időzónája, akkor a gyülekezete [Időzónája](../settings/church-settings.md#time-zone) lesz az irányadó, ezt követi az első olyan helyszín időzónája, amelynél van beállítva, végül pedig a keleti idő (America/New_York). Ha a check-in rossz órakor nyílik meg, ellenőrizze a helyszín **Időzóna** beállítását a [Helyszínek](../settings/campuses.md) oldalon. Az ütemezés eltávolításához állítsa a **Napot** vissza a **Nincs ütemezés** értékre, majd kattintson a **Mentés** gombra. Az ütemezés csak akkor lép életbe, ha a **Nap** és a **Kezdés időpontja** is be van állítva.

Amíg egy istentiszteleti időpont check-in ablaka zárva van:

- Az **önálló check-in a B1.church oldalon** az adott istentiszteleti időpontot **Zárva** állapotban (vagy például **Zárva · nyit: V 9:30** formában) jelzi, és nem választható ki. Ha egy istentisztelet összes időpontja zárva van, a családok azt látják, mikor nyílik meg a check-in, például: „A check-in V 9:30-kor nyílik.”
- A **B1 Checkin kioszk alkalmazás** is **Zárva** állapotban mutatja az istentiszteleti időpontot, és megjeleníti, mikor nyílik meg. Ha egy istentisztelet összes időpontja zárva van, a kioszk azt jelzi, mikor nyílik meg az adott istentisztelet check-inje. Ha valaki már be volt jelentkezve egy zárt istentiszteleti időpontra, a csoportja **Bejelentkezve** állapotban marad. Ha az ablak egy check-in folyamat közben záródik le, a kioszk nem fejezi be a folyamatot, hanem egy **Még nem jelentkezhet be** képernyőt jelenít meg, amely felsorolja az érintett termet, hogy a család másikat válasszon.

Az a háztartás, amely már bejelentkezett egy korábbi istentiszteleti időpontra, a korábbi ablak lezárása után is visszatérhet, és hozzáadhat egy később kezdődő, nyitott istentiszteleti időpontot. Meglévő check-in bejegyzéseik megmaradnak.

:::tip
Állítson be bőkezű nyitási ablakot (például a kezdés előtt 45 perc), hogy a korán érkező családok és önkéntesek is be tudjanak jelentkezni, és rövid zárási ablakot, hogy a későn érkezők is be tudjanak jelentkezni, miután az istentisztelet elkezdődött.
:::

## A beállítás szerkesztése

A beállítást bármikor frissítheti. Jelöljön ki egy helyszínt, istentiszteleti időpontot vagy csoportot, majd kattintson a **Szerkesztés** gombra a részletek módosításához, vagy a **Törlés** gombra az eltávolításhoz.

:::info
Egy istentiszteleti időpont eltávolítása nem törli a korábbi jelenléti adatokat. A történeti adatai akkor is megmaradnak, ha módosítja az ütemezését.
:::

## Mi a következő lépés?

Miután a helyszínei, istentiszteleti időpontjai és csoportjai rendben vannak, készen áll arra, hogy [rögzítse a jelenlétet](recording-attendance.md) kézzel, vagy beállítsa az [önálló check-int](check-in.md) az istentiszteleteihez.
