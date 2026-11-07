---
title: "Első lépések a B1 Admin weboldalával"
sidebar_label: "Kezdeti beállítás"
description: "B1 Admin egyházi weboldalának beállítása: aldomain vagy saját domain, főoldal, márkaszínek és logó, navigáció kialakítása."
---

# Kezdeti beállítás

<div class="article-intro">

Minden B1-fiókhoz jár egy azonnal használható weboldal. Ez az útmutató végigvezeti a templom domainjének beállításán, az oldal megjelenésének testreszabásán, az első oldalak létrehozásán és a navigáció rendezésén.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van egy B1.church-fiókra, amelyhez adminisztrátori hozzáférés tartozik
- Egyéni domain használata esetén készítse elő a DNS-szolgáltatója bejelentkezési adatait (például GoDaddy, Cloudflare vagy AWS)
- A legjobb eredmény érdekében készítse elő a templom logóját átlátszó hátterű PNG formátumban

</div>

## A domain beállítása

A templom automatikusan kap egy aldomaint a B1.church oldalon (például `yourchurch.b1.church`). Saját egyéni domaint is hozzárendelhet a B1 weboldalához.

1. Nyissa meg a **B1.church Admin** felületet az admin.b1.church címen, vagy kattintson a profilja melletti legördülő menüre, és válassza a **Alkalmazásváltás** lehetőséget.
2. Nyissa meg az [Ugrómenüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), bontsa ki a **Beállítások** menüpontot, majd kattintson a **Beállítások** elemre.
3. Nyissa meg a **Templominformációk** szakaszt az aldomain megtekintéséhez. Állítsa be rövid, könnyen felismerhető, szóközöket nem tartalmazó névre.
4. Egyéni domain használatához jelentkezzen be a DNS-szolgáltatójába (például GoDaddy, Cloudflare vagy AWS), és vegyen fel két rekordot:
   - Egy **A rekordot** a gyökérdomainhez, amely a `3.23.251.61` címre mutat
   - Egy **CNAME rekordot** a `www` aldomainhez, amely a `proxy.b1.church` címre mutat
5. Térjen vissza a B1.church Adminhoz, nyissa meg a **Domainek** szakaszt ugyanazon a Beállítások oldalon, adja hozzá egyéni domainjét a listához, majd kattintson a **Hozzáadás**, majd a **Mentés** gombra. Az oldal néhány percen belül elérhető lesz az egyéni domainjén.

:::tip
Ha nem látja a Beállítások lehetőséget, kérje meg azt a személyt, aki a templom fiókját beállította, hogy adja meg Önnek az „Egyházi beállítások szerkesztése” jogosultságot. A részletekért lásd: [Szerepkörök és jogosultságok](../settings/roles-permissions.md).
:::

## Az első oldal létrehozása

1. A B1 Adminban nyissa meg az [Ugrómenüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), bontsa ki a **Weboldal** menüpontot, majd kattintson az **Oldalak** elemre.
2. Kattintson a jobb felső sarokban lévő **Oldal hozzáadása** gombra.
3. Oldaltípusként válassza az **Üres** lehetőséget, és nevezze el „Főoldal”-nak.
4. Kattintson az **Oldalbeállítások** gombra, és a főoldalhoz állítsa be az URL-útvonalat `/`-re (egy perjel, szöveg nélkül). A többi oldal `/oldalnév` formátumot használ.
5. Kattintson a **Tartalom szerkesztése** gombra a munka megkezdéséhez. Minden oldalnak egy **Szakasszal** kell kezdődnie, ez az összes többi elem tárolója.
6. Miután hozzáadott egy szakaszt, kattintson ismét a **Tartalom hozzáadása** gombra, és húzza a szövegeket, képeket, videókat, kártyákat, űrlapokat és egyéb elemeket a szakaszba.

:::info
Az oldalakkal és a navigációval kapcsolatos részletes útmutatóért lásd: [Oldalak kezelése](./managing-pages.md). A vizuális szerkesztő teljes útmutatójáért lásd: [Az oldalszerkesztő használata](./page-editor.md).
:::

## A webhely megjelenésének beállítása

1. Az Ugrómenüben válassza a **Weboldal > Megjelenés** lehetőséget.
2. A **Színpaletta** segítségével állítsa be márkaszíneit az elsődleges, a másodlagos és a kiemelő árnyalatokhoz.
3. A **Betűtípusok** alatt válassza ki a címsor- és a szövegtörzs betűtípusát a betűtípus-böngészőből.
4. A stílusbeállítások **Logó** részénél töltse fel a templom logóját. Adja meg a világos és a sötét háttérhez készült változatot is.
5. Állítsa be az **Oldallábléc** részt a templom elérhetőségeivel és linkjeivel.

:::info
A Megjelenésben végzett módosítások a teljes weboldalra érvényesek. Az egyes beállításokkal kapcsolatos részletes útmutatóért lásd: a [Megjelenés](./appearance.md) oldalt.
:::

## A navigáció beállítása

A navigációs linkek a Weboldal > Oldalak nézetben jelennek meg. Ezek rendezéséhez:

1. Kattintson a **Hozzáadás** gombra új navigációs link létrehozásához, majd mutassa azt az egyik oldalára.
2. Húzással rendezze át a linkeket, vagy ágyazza őket szülőelemek alá.
3. Tekintse meg a weboldalt előnézetben, hogy ellenőrizze, helyesen jelenik-e meg a navigáció.

## Következő lépések

- [Oldalak kezelése](./managing-pages.md) -- Részletesen megtudhatja, hogyan dolgozhat az oldalakkal és a navigációval
- [Megjelenés](./appearance.md) -- Finomhangolhatja a weboldal színeit, betűtípusait és elrendezését
- [Fájlok](./files.md) -- Képeket és dokumentumokat tölthet fel a weboldalához
