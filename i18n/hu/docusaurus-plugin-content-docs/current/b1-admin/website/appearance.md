---
title: "Megjelenés"
---

# Megjelenés

<div class="article-intro">

A Megjelenés oldalon testreszabhatja templomi weboldalának általános megjelenését és hangulatát. A színektől és betűtípusoktól a térközön és az egyéni CSS-ig az oldal minden vizuális elemét egy helyen szabályozhatja.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Végezze el a weboldala [kezdeti beállítását](initial-setup)
- Készüljön fel a templom logójával PNG formátumban, átlátszó háttérrel és 4:1 képarányban
- Ismerje a templom márkaszíneit (hexadecimális értékeit), ha van már stílusútmutatója

</div>

## A megjelenítési beállítások elérése

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), és bontsa ki a **Weboldal** menüpontot.
2. Kattintson a **Megjelenés** elemre.
3. Megnyílik a **Stílusok** oldal. A **Téma, betűtípusok és lábléc** kártya bal oldalán a **Stílusbeállítások** lista, jobb oldalán pedig egy mintaoldal előnézete látható. Alatta található az **Hirdetmények és widgetek** és a **Átirányítások és elemzés** kártya.

## Színpaletta {#color-palette}

1. Kattintson a **Színpaletta** elemre a Stílusbeállítások panelen.
2. Megjelenik az **Alapszínek** (világos, kiemelő és sötét árnyalatok) és a **Szemantikus színek** (Elsődleges, Másodlagos, Sikeres, Figyelmeztető és Hibás) szakasz.
3. Kattintson bármelyik színmintára a színválasztó megnyitásához. Húzza a kijelölőt, vagy adjon meg hexadecimális értéket a szín kiválasztásához.
4. A **Színkombinációk előnézete** megmutatja, hogyan működnek együtt a kiválasztott színek.
5. A **Javasolt paletták** segítségével gyorsan alkalmazhat egy előre megtervezett színsémát.
6. Ha elégedett, kattintson a **Paletta mentése** gombra.

## Tipográfia

1. Kattintson a **Betűtípusok** elemre a Stílusbeállítások panelen.
2. A betűtípus-böngésző megnyitásához kattintson a **Címsor betűtípusa** vagy a **Szövegtörzs betűtípusa** gombra. Kereshet név szerint, vagy böngészhet olyan kategóriák között, mint a Serif, Sans Serif, Dekoratív, Kézírás és Monospace. Választhat a **Népszerű betűtípus-kombinációk** közül is.
3. A betűtípusok alkalmazásához kattintson a **Betűtípusok mentése** gombra.
4. A Címsor 1-től Címsor 4-ig terjedő méretarányainak módosításához kattintson a **Tipográfiai skála** elemre a Stílusbeállítások panelen. A finomhangoláshoz használja a **Típusskála** szorzót, az **Alapméretet** és a **Sorközt** mezőket, majd kattintson a **Tipográfia mentése** gombra.

## Térköz

1. Kattintson a **Térközskála** elemre a Stílusbeállítások panelen.
2. Állítsa be a térközértékeket a Extra kicsi és Extra nagy között. A gyakorlati példák megmutatják, hogyan befolyásolja minden érték az elrendezést.
3. A értékek alkalmazásához a teljes weboldalon kattintson a **Térköz mentése** gombra.

## Logó és márkaarculat {#logo-and-branding}

1. Kattintson a **Logó** elemre a Stílusbeállítások panelen.
2. Töltse fel a **Világos háttérhez való logót** és a **Sötét háttérhez való logót**. A legjobb eredmény érdekében átlátszó hátterű, 4:1 képarányú képeket használjon.
3. Töltsön fel egy **Közösségi média képet** a linkek előnézetéhez, valamint egy **Favicont** a böngészőfül ikonjához.
4. Kattintson a **Módosítások mentése** gombra. A feltöltött képek csak mentés után kerülnek tárolásra, ezért ha mentés előtt próbálja bezárni vagy újratölteni a böngészőlapot, a böngésző figyelmeztet a nem mentett módosításokra.

:::tip
A legjobb eredmény érdekében PNG formátumú, átlátszó hátterű logót használjon. Így az mind a weboldalon, mind a [mobilalkalmazásban](../settings/mobile-app.md) szépen mutat világos és sötét háttéren egyaránt.
:::

## Navigációs stílusok

Testreszabhatja a weboldal navigációs sávjának színeit mind a tömör, mind az átlátszó módhoz:

1. Kattintson a **Navigáció** elemre a Stílusbeállítások panelen.
2. Állítsa be a **Fejléc (tömör)** és a **Fejléc a főkép felett (átlátszó)** színeit.
3. Kattintson a **Navigáció mentése** gombra a navigációs színek alkalmazásához.

A részletes útmutatóért lásd: [Navigációs stílusok](./navigation-styles.md).

## Hirdetmények és widgetek

A weboldal widgetjei az oldal minden lapján megjelennek, a tartalom fölött lebegve:

- **Hirdetménysáv** – Egy bezárható sáv a weboldal tetején időérzékeny üzenetekhez, például közelgő eseményhez vagy istentisztelet-változáshoz.
- **Indító** – Egy lebegő gomb, amely gyors eléréses menüt nyit meg, például az adakozáshoz, a bejelentkezéshez vagy a hírlevél megtekintéséhez vezető linkekkel.

1. Keresse meg a **Hirdetmények és widgetek** kártyát a Stílusbeállítások alatt.
2. Kapcsolja be a kívánt widgeteket, és állítsa be szövegüket, linkjeiket és színeiket.
3. Kattintson a **Mentés** gombra.

## Átirányítások és elemzés

Az **Átirányítások és elemzés** kártya (a Stílusbeállítások alatt) két, egymással nem összefüggő, de gyakran szükséges beállítást tartalmaz:

- **Elemzés** – Adja meg a **GA4 mérési azonosítóját** (formátuma `G-XXXXXXXXXX`), hogy követhesse a weboldalra érkező látogatókat. Ugyanez az azonosító követi a megtekintett oldalakat a templom B1 alkalmazásában is (a tagi portálon, a `/mobile` címen, beleértve a telepített alkalmazást is). Ezek a látogatások `display_mode` értékkel jelennek meg, amely `installed` vagy `browser` lehet, így a Google Analyticsben megkülönböztetheti a telepített alkalmazásból és a böngészőből érkező látogatásokat.
- **Átirányítások** – Egy régi URL-útvonalat új útvonalra irányíthat, így a áthelyezett vagy átnevezett oldalra mutató linkek nem vezetnek 404-es hibára. Adja meg a régi **Forrás** és az új **Cél** útvonalat, majd kattintson a **Mentés** gombra. Az átirányítás elsőbbséget élvez a B1 beépített oldalaival szemben (`/sermons`, `/stream`, `/donate`, `/bible` és `/votd`), így ezt a címet máshová irányíthatja (például a saját igehirdetési oldalára vagy egy YouTube-csatornára). Nem írja felül azt az oldalt, amelyet Ön hozott létre ugyanezen a címen. Ha azt szeretné, hogy az átirányítás érvénybe lépjen, előbb törölje ezt az oldalt.

## Egyéni CSS és JavaScript

1. Kattintson a **CSS és Javascript** elemre a Stílusbeállítások panelen.
2. Adjon hozzá **Egyéni CSS**-t az alapértelmezett stílusok felülírásához, haladó testreszabáshoz.
3. Adjon hozzá **Egyéni HTML**-t követőkódokhoz vagy egyéb szkriptekhez.
4. Használja a **Gyakori JavaScript-példák** szakaszt az olyan részletekhez, mint a Google Analytics integráció.

:::warning
Az egyéni CSS erőteljes, de helytelen használat esetén elronthatja a weboldal elrendezését. A legtöbb templom a beépített szín-, betűtípus- és térközbeállításokkal is elérheti a kívánt megjelenést. Egyéni CSS-t csak akkor használjon, ha jártas a webfejlesztésben.
:::

:::info
A weboldala Tartalombiztonsági szabályzatot (CSP) alkalmaz, amely minden más forrásból származó beágyazott szkriptet letilt. Az itt található **Egyéni HTML** mező és az egyes oldalakon használható [HTML elem](page-editor#using-the-html-element) a megbízható kivételek: az itt mentett kód változtatás nélkül fut, ezért csak megbízható forrásból származó szkripteket illesszen be (például elemzési címkéket, csevegőwidgeteket és hasonló beágyazásokat).
:::

## Stílustémák

Ha gyors kiindulópontra van szüksége, a Színpaletta szakaszban található **Javasolt paletták** előre elkészített témákat kínálnak, amelyek egy kattintással összehangolt színeket állítanak be. Egy téma alkalmazása után bármelyik egyedi beállítást később is finomhangolhatja.

## Következő lépések

- [Oldalak kezelése](managing-pages) – A weboldal oldalainak létrehozása és rendezése
- [Fájlok](files) – Médiatartalmak feltöltése a weboldalához
