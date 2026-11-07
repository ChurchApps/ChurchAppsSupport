---
title: "Blogbejegyzések írása a weboldalához a B1 Adminban"
sidebar_label: "Blog"
description: "Írjon, ütemezzen és tegyen közzé blogbejegyzéseket egyházi weboldalán a B1 Adminban: kivonatok, kategóriák, címkék, fejléckép és kommentbeágyazás."
---

# Blog

<div class="article-intro">

A Blog oldal lehetővé teszi, hogy híreket, frissítéseket és áhítatokat tegyen közzé a gyülekezeti weboldalán. A bejegyzések kártyás listában jelennek meg a `/blog` oldalon, saját URL-jükön, valamint egy RSS-hírcsatornában, amelyet más eszközök (például Zapier) figyelhetnek az új bejegyzésekért.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Végezze el a weboldal [kezdeti beállítását](./initial-setup.md)
- Ha azt szeretné, hogy a látogatók a menüből is megtalálják a blogot, adjon hozzá navigációs hivatkozást a `/blog` oldalhoz a [Oldalak kezelése](./managing-pages.md) részben

</div>

## A blog elérése

1. A B1 Adminban nyissa meg a [Ugrás menü](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), és bontsa ki a **Weboldal** pontot.
2. Kattintson a **Blog** elemre.
3. A Blog oldalon minden bejegyzés szerepel, az állapotával és a közzétételi dátumával együtt.

## Bejegyzés hozzáadása

1. Kattintson a jobb felső sarokban lévő **Bejegyzés hozzáadása** gombra.
2. Adjon meg egy **Címet**. Az URL-barát **Webcímet** (slug) a rendszer automatikusan generálja, ahogy gépel. Ha más címet szeretne, közvetlenül szerkesztheti.
3. Adjon hozzá egy **Kivonatot** – ez egy rövid összefoglaló, amely a bejegyzések listájában, a meta leírásokban és az RSS-hírcsatornában jelenik meg. Ha üresen hagyja, a rendszer automatikusan generál egyet a bejegyzés tartalmának elejéből.
4. Írja meg a bejegyzés szövegét a **Tartalom** szerkesztőben, Markdown formátumban. Kattintson a **Előnézet** gombra, hogy lássa, hogyan fog kinézni a formázott bejegyzés.
5. Válasszon egy **Kategóriát** (válasszon egy meglévőt, vagy írjon be újat), és opcionálisan adjon meg vesszővel elválasztott **Címkéket**.
6. Kattintson a **Kép kiválasztása** gombra, hogy egy fotót válasszon a [Fájlok](./files.md) galériájából, vagy töltsön fel újat. A feltöltött fotók a beépített kivágóeszközben nyílnak meg, amely 16:9 arányra van rögzítve, így bármelyik fotót úgy igazíthatja, hogy illeszkedjen a bejegyzés fejlécéhez és a kártyákhoz.
7. Állítsa be a **Szerzőt** – alapértelmezés szerint Ön van beállítva, de az adatbázisában bármely személyt kereshet és kiválaszthat.
8. Kapcsolja be a **Közzétéve** opciót, és állítson be egy **Közzététel dátumát**, amikor készen áll arra, hogy a bejegyzés nyilvánossá váljon. Ha kikapcsolva hagyja, a bejegyzés piszkozatként marad mentve.

:::tip
Állítson be a jövőben lévő **Közzététel dátumát**, hogy ütemezze a bejegyzést. Addig rejtve marad a látogatók elől, és a Blog listában a **Ütemezve** címke jelenik meg, amíg el nem érkezik ez a dátum.
:::

## Bejegyzések állapotai

A listában minden bejegyzés az alábbi három állapot egyikét mutatja:

- **Piszkozat** – Nincs közzétéve. Csak az adminisztrációs felületen látható.
- **Ütemezve** – A Közzétéve opció be van kapcsolva, de a közzététel dátuma a jövőben van.
- **Közzétéve** – Élőben látható a weboldalán, és szerepel az RSS-hírcsatornában.

## Bejegyzések szerkesztése, előnézete és törlése

- Kattintson egy bejegyzés melletti **Szerkesztés** gombra a módosításokhoz.
- Kattintson a **Megtekintés a weboldalon** gombra (a közzétett bejegyzéseknél látható), hogy az élő bejegyzést új lapon nyissa meg a weboldalon.
- Kattintson a **Törlés** gombra a bejegyzés végleges eltávolításához.

## Hogyan látják a látogatók a blogot

A közzétett bejegyzések a `{yoursite}/blog` címen jelennek meg, oldalanként 10 bejegyzéssel. A **Régebbi**/**Újabb** hivatkozásokkal lapozhat az archívumban. Emellett van kategória szűrő, valamint minden bejegyzés szerzője és fotója is látható. A címkék kattintható elemekként is megjelennek, így a látogatók ugyanúgy szűrhetik a listát címke szerint. Az egyes bejegyzések a `{yoursite}/blog/{slug}` címen érhetők el, és tartalmaznak az azonos kategóriából származó kapcsolódó bejegyzéseket. A blog oldal RSS-hírcsatornát is közzétesz, amelyet a hírolvasók és automatizálási eszközök, például a Zapier automatikusan felismernek.

:::info
A blogbejegyzések külön tartalomtípust alkotnak a normál weboldal-oldalaktól – nem a [oldalszerkesztőben](./page-editor.md) készülnek, és nem jelennek meg az Oldalak listájában. Ez gyorsabbá és az íráson összpontosítóbbá teszi a blogbejegyzések készítését.
:::

## Megjegyzések hozzáadása a bejegyzések alá

A B1 nem tárolja maga a blog-hozzászólásokat, de hozzáadhat egy hozzászólás-szolgáltatást. Bármi mást is elhelyezhet minden bejegyzés alatt, például hírlevél-feliratkozási űrlapot vagy adományozási gombot.

1. Regisztráljon egy hozzászólás-szolgáltatásnál, például a [Hyvor Talk](https://talk.hyvor.com), a [FastComments](https://fastcomments.com) vagy a [Disqus](https://disqus.com) szolgáltatásánál, és másolja ki a beágyazási kódját.
2. A Blog oldalon görgessen le a **Minden bejegyzés alatt** részhez.
3. Illessze be a beágyazási kódot, majd kattintson a **Mentés** gombra.

A kód minden közzétett bejegyzés tartalma alatt megjelenik. A hozzászólás-szolgáltatás kezeli a moderálást és a spamszűrést, ezért rendszeresen ellenőrizze az irányítópultját.

:::tip
Törölje a mezőben lévő szöveget, majd kattintson a **Mentés** gombra, hogy eltávolítsa a kódot minden bejegyzésből. Ezt a mezőt csak azok láthatják, akik módosíthatják a gyülekezeti beállításokat.
:::

## Következő lépések

- [Oldalak kezelése](./managing-pages.md) – Navigációs hivatkozás hozzáadása a blogjához
- [Fájlok](./files.md) – Fotók feltöltése a bejegyzéseihez
- [Zapier integráció](../integrations/zapier.md) – Automatizálások indítása új bejegyzések közzétételekor
