---
title: "Tömeges importálás"
description: "Importáljon igehirdetési videókat tömegesen YouTube-csatornából vagy Vimeo-fiókból a B1 Adminba, majd rendezze őket lejátszási listába."
---

# Tömeges importálás

<div class="article-intro">

A Tömeges importálás oldalon gyorsan feltöltheti igehirdetés-könyvtárát YouTube-ról vagy Vimeóról származó videók importálásával. Ez a leggyorsabb módja annak, hogy a meglévő igehirdetés-tartalmait bevigye, ahelyett hogy minden videót egyenként adna hozzá.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége lesz a **contentApi.streamingServices.edit** jogosultságra. Ha nincs hozzáférése, tekintse meg a [Szerepkörök és jogosultságok](../settings/roles-permissions.md) oldalt.
- Hozzon létre legalább egy [lejátszási listát](./playlists.md), amelybe az igehirdetéseket importálhatja
- Legyen kéznél a YouTube-csatorna azonosítója vagy a Vimeo-fiók adatai

</div>

## Importálási forrás kiválasztása

1. A B1 Adminban nyissa meg az [Ugrásmenüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), bontsa ki az **Igehirdetések** menüpontot, majd kattintson az **Igehirdetések** elemre. Kattintson az **Igehirdetés hozzáadása** gombra, és a menüből válassza a **Tömeges importálás** lehetőséget.
2. Az **Importálási forrás kiválasztása** alatt két lehetőséget lát:
   - **YouTube** -- Videók importálása YouTube-csatornáról
   - **Vimeo** -- Videók importálása Vimeo-fiókból
3. Kattintson annak a platformnak a lehetőségére, ahol az igehirdetései találhatók (vagy kattintson a leírás alatti **Importálás YouTube-ról** / **Importálás Vimeo-ról** gombra). Az oldal tetején lévő **Vissza** gombra kattintva térhet vissza a forrásválasztáshoz.

:::tip
Ha videói mindkét platformon megtalálhatók, bármikor visszatérhet és másik forrást választhat.
:::

## Az importálás előtt

Videók importálása előtt legalább egy lejátszási listára van szüksége, amelybe rendezheti őket. Ha még nem hozott létre lejátszási listát:

1. Térjen vissza az **Igehirdetések** oldalra, és keresse meg a **Lejátszási listák** panelt.
2. Kattintson az **Első lejátszási lista létrehozása** gombra, és adja meg a nevet, a leírást, a közzétételi dátumot és a bélyegképet.
3. Kattintson a **Mentés** gombra, majd az **Igehirdetés hozzáadása** gombra kattintva és a **Tömeges importálás** lehetőséget választva térjen vissza a tömeges importáláshoz.

A lejátszási listák létrehozásáról és kezeléséről részletes útmutatót a [Lejátszási listák](./playlists.md) oldalon talál.

## Videók importálása

1. A YouTube vagy a Vimeo kiválasztása után adja meg a **YouTube-csatorna azonosítóját** vagy a **Vimeo-fiók adatait** a megfelelő mezőben.
2. Kattintson a **Lekérés** gombra, hogy lekérje az összes elérhető videót a csatornájáról vagy fiókjából.
3. A lekérés után jelölőnégyzetekkel ellátott listát lát az összes videójáról.
4. Jelölje be az importálni kívánt videók melletti négyzeteket. Kijelölheti az összeset, vagy csak bizonyos videókat is választhat.
5. Opcionálisan engedélyezze az **Új videók automatikus importálása** beállítást, hogy a jövőbeli feltöltések automatikusan bekerüljenek a könyvtárába.
6. Kattintson az **Importálás lejátszási listába** legördülő menüre, és válassza ki, melyik lejátszási listához adja hozzá ezeket a videókat.
7. A tömeges importálás befejezéséhez kattintson az **Importálás** gombra.

A videók minden adatukkal együtt importálódnak, beleértve a címeket, a leírásokat, a dátumokat és a bélyegképeket. A YouTube-címekben és -leírásokban lévő speciális karakterek, például a `&`, az aposztrófok és az idézőjelek úgy jelennek meg, ahogy be vannak írva, nem pedig olyan kódokként, mint a `&amp;`.

:::info
A tömeges importálás ideális kezdéshez, ha másik platformról költözik át. Az egyes igehirdetések későbbi hozzáadásához a [Igehirdetések kezelése](./managing-sermons.md) oldalt használja.
:::

## Következő lépések

- [Igehirdetések kezelése](./managing-sermons.md) -- Az importált igehirdetések adatainak szerkesztése
- [Lejátszási listák](./playlists.md) -- Igehirdetés-sorozatok létrehozása és kezelése
- [Élő közvetítés](./live-streaming.md) -- Élő közvetítés beállítása az istentiszteleteihez
