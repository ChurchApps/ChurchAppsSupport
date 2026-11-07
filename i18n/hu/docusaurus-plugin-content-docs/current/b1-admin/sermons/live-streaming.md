---
title: "Élő közvetítés időpontjai és beállítása a B1 Adminban"
sidebar_label: "Canlı közvetítés"
description: "Heti vagy egyszeri élő közvetítések ütemezése, chat- és korai videóidőzítés, YouTube-csatorna összekötése és beágyazási hibák elhárítása a B1 Adminban."
---

# Canlı közvetítés

<div class="article-intro">

A Live Stream Times oldal lehetővé teszi, hogy beállítsa gyülekezete közvetítési menetrendjét, kezelje az istentiszteleti időpontokat, és testreszabja a nézői élményt. Állítson be ismétlődő heti istentiszteleteket vagy egyszeri eseményeket, konfigurálja a csevegés és a videó beállításait, és szabályozza, mikor élesedik a közvetítés.

</div>

## Oktatóvideó

<YouTube id="tpEY-sEYW6A" title="Canlı közvetítés beállítása a B1-ben" next="Gyülekezete tagi alkalmazásának testreszabása a B1-ben" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége lesz a **contentApi.streamingServices.edit** jogosultságra. Ha nincs hozzáférése, tekintse meg a [Szerepkörök és jogosultságok](../settings/roles-permissions.md) oldalt.
- Készüljön fel a YouTube-csatornája azonosítójával, ha automatikus élő közvetítést szeretne használni
- Adjon hozzá legalább egy [igehirdetést](./managing-sermons.md) vagy állandó élő URL-t a közvetítés forrásaként

</div>

Az élő közvetítést a Jump menü **Igehirdetések** szakaszának két oldaláról kezelheti: a **Live Stream Times** oldalon kezelheti az élő közvetítés menetrendjét, a **Beállítások** oldalon pedig a közvetítési oldal füleit konfigurálhatja.

## Istentiszteletek kezelése

### Istentisztelet hozzáadása

1. A B1 Adminban nyissa meg a [Jump menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), bontsa ki az **Igehirdetések** menüpontot, majd kattintson a **Live Stream Times** elemre.
2. Az oldal tetején kattintson az **Istentisztelet hozzáadása** gombra, hogy új, ütemezett istentiszteletet hozzon létre. A meglévő istentiszteletek táblázatban jelennek meg, ahol az egyes istentiszteletek neve, időpontja, szolgáltatója és időtartama látható; a sor szerkesztés ikonjára kattintva módosíthatja őket.
3. Adja meg a **Szolgáltatás neve** mezőt (például „Vasárnap délelőtt”).
4. Állítsa be a **Szolgáltatás időpontja** mezőt – válassza ki azt a napot és időpontot, amikor az istentisztelet kezdődik.
5. Állítsa a **Heti ismétlődés** beállítást **Igen**-re a rendszeres heti istentiszteleteknél, vagy **Nem**-re egyszeri eseménynél.

### Csevegés és videó beállításainak konfigurálása

6. A **Csevegés beállításai** alatt adja meg, hány perccel az istentisztelet előtt és után legyen engedélyezve a csevegés. Így a látogatók már az istentisztelet előtt elkezdhetnek csevegni, és az után is folytathatják.
7. A **Videó beállításai** alatt adja meg, mennyivel korábban induljon a videós közvetítés a visszaszámláláshoz vagy az istentisztelet előtti tartalomhoz. A csevegés ennyi perccel *a korai videó kezdete előtt* nyílik meg, ezért a csevegés perc-beállítása melletti időpont mindkét értéket figyelembe veszi. Például egy 10:00-s istentisztelet, 15 perccel az előtt tartó csevegéssel és 5 perces korai kezdéssel 9:40-kor nyitja meg a csevegést.
8. A legördülő menüből válassza ki, melyik igehirdetést játssza le:
   - **Legutóbbi igehirdetés** – automatikusan a legutóbb hozzáadott videót játssza le.
   - **Jelenlegi élő istentisztelet** – a YouTube-ról, a csatornaazonosítója alapján játssza le az aktuális élő közvetítést.
   - Kiválaszthat bármely már mentett konkrét igehirdetést is.
9. Kattintson a **Mentés** gombra az istentisztelet ütemezéséhez.

:::info
Ha az istentisztelet ismétlődőre van állítva, az automatikusan minden héten frissül. A helyi idő megmarad a nyári időszámítás kezdetekor és végén is. Annyi istentiszteletet adhat hozzá, amennyire szüksége van. A látogatók a közvetítési oldal meglátogatásakor a következő ütemezett istentisztelet időpontját fogják látni.
:::

## A közvetítési oldal beállításai

Az élő közvetítés mellett megjelenő fülek és hivatkozások testreszabásához nyissa meg a Jump menüt, bontsa ki az **Igehirdetések** menüpontot, majd kattintson a **Beállítások** elemre. A **Közvetítés beállításai** oldalon láthatja a **Tartalmi fülek** listáját.

### Fülek hozzáadása

1. Kattintson a **Hozzáadás** gombra, hogy új fület adjon az élő közvetítési oldalhoz.
2. Válasszon **Hivatkozás típusát**: **Külső URL** egyéni hivatkozáshoz, vagy az előre elkészített **Csevegés** vagy **Imádság** fülek egyikét.
3. A Csevegés fülnél csak adjon nevet a **Fül szövege** mezőben, és a beállítás kész.
4. Hivatkozásos fülnél adja meg a fül nevét, válasszon ikont az ikongombra kattintva, majd írja be az URL-t.
5. A beállított fülek megjelennek az élő közvetítési oldalon, hogy a nézők elérhessék a további forrásokat és interaktív funkciókat.

### A közvetítés előnézete

A **Live Stream Times** oldalon kattintson az oldal tetején lévő **Közvetítés megtekintése** gombra, hogy pontosan lássa, hogyan jelenik meg az élő közvetítési oldal a látogatók számára, beleértve a logóját, az istentiszteleti időpontokat és a beállított füleket.

## A YouTube-os élő közvetítés beállítása

A YouTube-csatorna automatikus élő közvetítéshez való csatlakoztatásához:

1. Lépjen az **Igehirdetések** menübe, kattintson az **Igehirdetés hozzáadása** gombra, majd válassza az **Állandó élő URL hozzáadása** lehetőséget.
2. A videószolgáltató alapértelmezetten a **Jelenlegi YouTube-os élő közvetítés**. Adja meg a **YouTube-csatorna azonosítóját**.
3. Adjon címet és leírást, majd kattintson a **Mentés** gombra.
4. A **Live Stream Times** oldalon hozzon létre egy istentiszteletet, és az igehirdetés legördülő menüjéből válassza ki az állandó élő URL-t.

:::tip
A YouTube-csatornája azonosítójának megkereséséhez lépjen a YouTube-csatornája speciális beállításaihoz, és másolja ki a Csatornaazonosító értékét.
:::

## Színek és logó testreszabása

Az élő közvetítési oldal a webhely [Megjelenés](../website/appearance.md) beállításait használja:

- A fejlécben a **világos kiemelőszín** sötét szöveggel jelenik meg.
- Az oldalsávban a **sötét kiemelőszín** világos szöveggel jelenik meg.
- A **Világos háttérhez használt logó** megjelenik a közvetítési oldalon. Átlátszó hátterű, 4:1 képarányú képet használjon.

Ezek megváltoztatásához lépjen a **Webhely**, majd a **Megjelenés** menübe, és frissítse a [Színpaletta](../website/appearance.md#color-palette) és a [Logó](../website/appearance.md#logo-and-branding) beállításait.

## Közvetítő munkatársak hozzáadása

Ahhoz, hogy csapattagok a nyilvános csevegés mellett a csak házigazdáknak szóló csevegéshez is hozzáférjenek:

1. A Jump menüben válassza a **Beállítások > Szerepkörök** lehetőséget.
2. Kattintson a plusz gombra, majd válassza az **Egyéni szerepkör hozzáadása** lehetőséget.
3. Nevezze el a szerepkört „Közvetítő házigazda”-nak, majd kattintson a **Mentés** gombra.
4. Kattintson az új szerepkörre, majd a Tagok szakaszban az **Hozzáadás** gombra, hogy embereket vegyen fel.
5. Görgessen le a **Jogosultságok szerkesztése** részhez, bontsa ki a **Tartalom** szakaszt, és jelölje be a **Házigazda-csevegés** opciót.

Amikor a házigazdák bejelentkeznek az élő közvetítési oldalra, a nyilvános csevegés mellett megjelenik egy privát **Házigazda-csevegés** fül, ahol a közvetítés alatt csak a munkatársak beszélgethetnek.

:::info
A szerepkörök létrehozásáról és a jogosultságok kezeléséről részletesebben a [Szerepkörök és jogosultságok](../settings/roles-permissions.md) oldalon olvashat.
:::

## Hibaelhárítás

Ha az automatikus YouTube-os élő közvetítés nem jelenik meg megfelelően a „Jelenlegi YouTube-os élő közvetítés” beállítással és a csatornaazonosítóval, próbálja ki a következőket:

**Tünetek:**
- Az élő közvetítés beágyazott lejátszóján a „Videó nem elérhető” üzenet jelenik meg
- Az oldal betöltődik, de nem jelenik meg videó
- A közvetlen YouTube-beágyazások működnek, de az automatikus csatornás élő közvetítés nem

**Megoldás:**
Nézze át a YouTube-csatornáját a régi vagy a jövőbeli ütemezett élő közvetítések szempontjából, és törölje őket:

1. Lépjen a YouTube Stúdióba.
2. Navigáljon a **Tartalom**, majd a **Élő** menüpontra.
3. Keresse meg a régi ütemezett élő közvetítéseket vagy a közelgő ütemezett közvetítéseket.
4. Törölje ezeket a régi vagy ütemezett élő közvetítési bejegyzéseket.
5. Tesztelje újra az élő közvetítési oldalt.

:::warning
A YouTube automatikus csatornás élő közvetítésének beágyazását blokkolhatja, ha a csatornán több ütemezett vagy korábbi élő közvetítési bejegyzés található. Ezek eltávolítása lehetővé teszi, hogy a YouTube azonosítsa és megjelenítse az aktuális élő közvetítést.
:::

**További követelmények:**
- Az élő közvetítésnek **Nyilvános** láthatóságúnak kell lennie (nem Listázatlan vagy Privát).
- A beágyazást engedélyezni kell a YouTube-közvetítési beállításaiban.
- Ellenőrizze, hogy a **Jelenlegi YouTube-os élő közvetítés** szolgáltatót használja (csatornaazonosítóval), és ne a **YouTube** szolgáltatót (videóazonosítóval).

## Következő lépések

- [Igehirdetések kezelése](./managing-sermons.md) – Igehirdetések hozzáadása a könyvtárához
- [Lejátszási listák](./playlists.md) – Igehirdetések rendezése sorozatokba
